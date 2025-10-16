import { useState, useEffect } from "react";
import CardEscursioniDetail from "./ui/card-escursioni-detail";
import type { Escursione } from '../lib/types';
import { apiConfig } from "../lib/apiConfig";

interface FormattedEscursione {
    id: number;
    title: string;
    date: string;
    difficulty: "Facile" | "Medio" | "Difficile";
    photoCount: number;
    distance?: string;
    elevation?: string;
    imageUrls: string[];
}

const mapDifficulty = (difficulty: string = ""): "Facile" | "Medio" | "Difficile" => {
    switch (difficulty.trim().toLowerCase()) {
        case "bassa": return "Facile";
        case "media": return "Medio";
        case "alta": return "Difficile";
        default: return "Medio";
    }
};

const formatEscursioni = (
    data: Escursione[],
    imagesMap: Record<number, string[]>
): FormattedEscursione[] =>
    data
        .map(item => ({
            id: item.id,
            title: item.name,
            date: item.date_escursione ? new Date(item.date_escursione).toISOString().split("T")[0] : "Data non disponibile",
            difficulty: mapDifficulty(item.difficulty),
            photoCount: imagesMap[item.id]?.length || 0,
            distance: item.distance_km != null ? String(item.distance_km) : undefined,
            elevation: item.elevation_gain_m != null ? String(item.elevation_gain_m) : undefined,
            imageUrls: imagesMap[item.id] || [],
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function EscursioneRecenti() {
    const [escursioni, setEscursioni] = useState<FormattedEscursione[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEscursioni = async () => {
            try {
                const response = await fetch(apiConfig.endpoints.escursioni.getAll);
                if (!response.ok) throw new Error("Errore nel caricamento dei dati");
                const data: Escursione[] = await response.json();

                const results = await Promise.allSettled(
                    data.map(escursione =>
                        fetch(`${apiConfig.baseUrl}/api/cloudinary-images?escursioneId=${escursione.id}`)
                            .then(res => res.ok ? res.json() : { imageUrls: [] })
                            .catch(() => ({ imageUrls: [] }))
                    )
                );

                const imagesMap: Record<number, string[]> = {};
                data.forEach((escursione, idx) => {
                    const result = results[idx];
                    if (result.status === "fulfilled" && Array.isArray(result.value.imageUrls)) {
                        imagesMap[escursione.id] = result.value.imageUrls;
                    } else {
                        imagesMap[escursione.id] = [];
                    }
                });

                setEscursioni(formatEscursioni(data, imagesMap));
            } catch {
                setError("Si è verificato un errore durante il caricamento dei dati");
            } finally {
                setLoading(false);
            }
        };

        fetchEscursioni();
    }, []);

    if (loading) {
        return <div className="max-w-7xl mx-auto px-4 py-12 text-center">Caricamento in corso...</div>;
    }

    if (error) {
        return <div className="max-w-7xl mx-auto px-4 py-12 text-center text-red-600">{error}</div>;
    }

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Ultime Escursioni</h1>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                {escursioni.slice(0, 4).map((escursione) => (
                    <CardEscursioniDetail
                        key={escursione.id}
                        title={escursione.title}
                        date={escursione.date}
                        difficulty={escursione.difficulty}
                        distance={escursione.distance}
                        elevation={escursione.elevation}
                        imageUrls={escursione.imageUrls}
                    />
                ))}
            </div>
        </div>
    );
}
