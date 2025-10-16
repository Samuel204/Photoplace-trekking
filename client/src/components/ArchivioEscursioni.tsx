import { useState, useEffect } from 'react';
import CardEscursioniDetail from './ui/card-escursioni-detail';
import type { Escursione } from '../lib/types';
import { apiConfig } from '../lib/apiConfig';

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

const mapDifficulty = (difficulty: string = ''): "Facile" | "Medio" | "Difficile" => {
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
    data.map(item => ({
        id: item.id,
        title: item.name,
        date: item.date_escursione ? new Date(item.date_escursione).toISOString().split('T')[0] : '',
        difficulty: mapDifficulty(item.difficulty),
        photoCount: imagesMap[item.id]?.length || 0,
        distance: item.distance_km != null ? String(item.distance_km) : undefined,
        elevation: item.elevation_gain_m != null ? String(item.elevation_gain_m) : undefined,
        imageUrls: imagesMap[item.id] || [],
    }));

export default function ArchivioEscursioni() {
    const [escursioni, setEscursioni] = useState<FormattedEscursione[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEscursioni = async () => {
            try {
                const response = await fetch(apiConfig.endpoints.escursioni.getAll);
                if (!response.ok) throw new Error('Errore nel caricamento delle escursioni');
                const escursioniData: Escursione[] = await response.json();

                // Ottimizzazione: recupera tutte le immagini in parallelo e ignora errori singoli
                const results = await Promise.allSettled(
                    escursioniData.map(escursione =>
                        fetch(`${apiConfig.baseUrl}/api/cloudinary-images?escursioneId=${escursione.id}`)
                            .then(res => res.ok ? res.json() : { imageUrls: [] })
                            .catch(() => ({ imageUrls: [] }))
                    )
                );

                const imagesMap: Record<number, string[]> = {};
                escursioniData.forEach((escursione, idx) => {
                    const result = results[idx];
                    if (result.status === 'fulfilled' && Array.isArray(result.value.imageUrls)) {
                        imagesMap[escursione.id] = result.value.imageUrls;
                    } else {
                        imagesMap[escursione.id] = [];
                    }
                });

                setEscursioni(formatEscursioni(escursioniData, imagesMap));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Errore sconosciuto');
            } finally {
                setLoading(false);
            }
        };

        fetchEscursioni();
    }, []);

    if (loading) return <div className="max-w-7xl mx-auto px-4 py-12 text-center">Caricamento in corso...</div>;
    if (error) return <div className="max-w-7xl mx-auto px-4 py-12 text-center text-red-600">Errore: {error}</div>;

    return (
        <div className="min-h-screen mx-auto px-4 lg:px-28 mt-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Archivio Escursioni</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {escursioni.map((escursione) => (
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
