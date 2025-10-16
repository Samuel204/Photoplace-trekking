import { useState, useEffect } from "react";
import CardEscursioniDetail from "./ui/card-escursioni-detail";
import type { Escursione } from '../lib/types';
import { apiConfig } from "../lib/apiConfig";
import { formatEscursioni, FormattedEscursione } from '../lib/escursioniUtils.ts';


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
                        duration={escursione.duration}
                    />
                ))}
            </div>
        </div>
    );
}
