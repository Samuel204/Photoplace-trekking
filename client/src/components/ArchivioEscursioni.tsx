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
}

export default function ArchivoEscursioni() {
    const [escursioni, setEscursioni] = useState<FormattedEscursione[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Mappatura delle difficoltà dal server al formato del client
    const mapDifficulty = (difficulty: string): "Facile" | "Medio" | "Difficile" => {
        switch(difficulty.toLowerCase()) {
            case "bassa": return "Facile";
            case "media": return "Medio";
            case "alta": return "Difficile";
            default: return "Medio";
        }
    };

    // Formatta i dati dell'API nel formato necessario per la card
    const formatEscursioni = (data: Escursione[]): FormattedEscursione[] => {
        return data.map(item => ({
            id: item.id,
            title: item.name,
            // Gestisci il caso in cui date_escursione possa essere null o undefined
            date: item.date_escursione ? new Date(item.date_escursione).toISOString().split('T')[0] : '',
            difficulty: mapDifficulty(item.difficulty),
            photoCount: Math.floor(Math.random() * 50) + 10,
            // Converti i valori numerici in stringhe e gestisci null
            distance: item.distance_km != null ? String(item.distance_km) : undefined,
            elevation: item.elevation_gain_m != null ? String(item.elevation_gain_m) : undefined,
        }));
    };

    useEffect(() => {
        const fetchEscursioni = async () => {
            try {
                const response = await fetch(apiConfig.endpoints.escursioni.getAll);
                if (!response.ok) {
                    throw new Error('Errore nel caricamento delle escursioni');
                }
                const data = await response.json();
                setEscursioni(formatEscursioni(data));
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
        <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Archivio Escursioni</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {escursioni.map((escursione) => (
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