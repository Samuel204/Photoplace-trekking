// client/src/components/UltimeEscursioni.tsx
import { useState, useEffect } from "react";
import CardEscursioniDetail from "./ui/card-escursioni-detail";
import { API_ENDPOINTS } from '../lib/api';

// Tipo per i dati delle escursioni provenienti dall'API
interface Escursione {
    id: number;
    name: string;
    description: string;
    difficulty: string;
}

// Tipo per il formato dei dati che serve alla CardEscursioniDetail
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
            date: new Date().toISOString().split('T')[0],
            difficulty: mapDifficulty(item.difficulty),
            photoCount: Math.floor(Math.random() * 50) + 10,
            distance: "5,2 km", // Placeholder o dati reali dall'API
            elevation: "350 m"  // Placeholder o dati reali dall'API
        }));
    };

    useEffect(() => {
        const fetchEscursioni = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.escursioni.getAll);
                if (!response.ok) {
                    throw new Error("Errore nel caricamento dei dati");
                }
                const data = await response.json();
                setEscursioni(formatEscursioni(data));
                setLoading(false);
            } catch (err) {
                setError("Si è verificato un errore durante il caricamento dei dati");
                setLoading(false);
                console.error("Errore:", err);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Ultime Escursioni</h2>
                <a href="/escursioni" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                    Vedi tutte →
                </a>
            </div>

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