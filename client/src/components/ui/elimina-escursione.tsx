import { useState, useEffect } from 'react';
import { apiConfig } from '../../lib/apiConfig.ts';

type Escursione = {
    id: string;
    name: string;
};

type EliminaEscursioneProps = {
    onDelete?: () => void;
    showToast: (toast: {
        title: string;
        description: string;
        variant?: 'success' | 'destructive';
    }) => void;
};

export default function EliminaEscursione({ onDelete, showToast }: EliminaEscursioneProps) {
    const [existingEscursioni, setExistingEscursioni] = useState<Escursione[]>([]);
    const [selectedEscursione, setSelectedEscursione] = useState<string>("");

    useEffect(() => {
        fetchEscursioni();
    }, []);

    const fetchEscursioni = async () => {
        try {
            const response = await fetch(apiConfig.endpoints.escursioni.getAll);
            if (response.ok) {
                const data = await response.json();
                setExistingEscursioni(data);
            }
        } catch (error) {
            console.error("Errore nel caricamento delle escursioni:", error);
            showToast({
                title: "Errore",
                description: "Impossibile caricare le escursioni esistenti",
                variant: "destructive",
            });
        }
    };

    const handleDeleteEscursione = async () => {
        if (!selectedEscursione) {
            showToast({
                title: "Errore",
                description: "Seleziona un'escursione da eliminare",
                variant: "destructive",
            });
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            showToast({
                title: "Errore",
                description: "Sessione scaduta, effettua nuovamente il login",
                variant: "destructive",
            });
            return;
        }

        try {
            const deleteUrl = apiConfig.endpoints.escursioni.delete(selectedEscursione);

            const response = await fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                showToast({
                    title: "Successo",
                    description: "Escursione eliminata con successo!",
                    variant: "success"
                });
                setSelectedEscursione("");
                fetchEscursioni();
                if (onDelete) onDelete();
            } else {
                throw new Error("Risposta non valida dal server");
            }
        } catch (error) {
            console.error("Errore nell'eliminazione dell'escursione:", error);
            showToast({
                title: "Errore",
                description: "Errore di connessione al server",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="mt-8 rounded-xl border border-gray-300 bg-card text-card-foreground shadow-sm bg-white">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                    Elimina escursione
                </h3>
                <p className="text-sm text-muted-foreground text-gray-500">
                    Seleziona un'escursione esistente da eliminare
                </p>
            </div>

            <div className="p-6 pt-0">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="select-escursione" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800">
                            Escursioni disponibili
                        </label>
                        <select
                            id="select-escursione"
                            value={selectedEscursione}
                            onChange={(e) => setSelectedEscursione(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 mt-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                            <option value="">Seleziona un'escursione</option>
                            {existingEscursioni.map((escursione) => (
                                <option key={escursione.id} value={escursione.id} className="py-4 hover:bg-gray-200">
                                    {escursione.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    <button
                        onClick={handleDeleteEscursione}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-red-600 text-white hover:bg-red-700"
                        disabled={!selectedEscursione}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                        Elimina escursione selezionata
                    </button>
                </div>
            </div>
        </div>
    );
}
