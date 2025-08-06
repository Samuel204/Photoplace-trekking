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
}

export default function UltimeEscursioni() {
    const [escursioni, setEscursioni] = useState<FormattedEscursione[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const mapDifficulty = (difficulty: string): "Facile" | "Medio" | "Difficile" => {
        switch (difficulty.toLowerCase()) {
            case "bassa":
                return "Facile";
            case "media":
                return "Medio";
            case "alta":
                return "Difficile";
            default:
                return "Medio";
        }
    };

    const formatEscursioni = (data: Escursione[]): FormattedEscursione[] => {
        return data
            .map(item => ({
                id: item.id,
                title: item.name,
                date: item.date_escursione ? new Date(item.date_escursione).toISOString().split("T")[0] : "Data non disponibile",
                difficulty: mapDifficulty(item.difficulty),
                photoCount: Math.floor(Math.random() * 50) + 10,
                distance: item.distance_km != null ? String(item.distance_km) : undefined,
                elevation: item.elevation_gain_m != null ? String(item.elevation_gain_m) : undefined,
            }))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    useEffect(() => {
        const fetchEscursioni = async () => {
            try {
                const response = await fetch(apiConfig.endpoints.escursioni.getAll);
                if (!response.ok) {
                    throw new Error("Errore nel caricamento dei dati");
                }
                const data = await response.json();
                setEscursioni(formatEscursioni(data));
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
            <div className="grid md:grid-cols-2 gap-8">
                {escursioni.slice(0,4).map((escursione) => (
                    <CardEscursioniDetail
                        key={escursione.id}
                        title={escursione.title}
                        date={escursione.date}
                        difficulty={escursione.difficulty}
                        photoCount={escursione.photoCount}
                        distance={escursione.distance}
                        elevation={escursione.elevation}
                    />
                ))}
            </div>
        </div>
    );
}