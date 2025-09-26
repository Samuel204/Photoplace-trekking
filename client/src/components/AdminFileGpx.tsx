import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EliminaEscursione from "./ui/elimina-escursione.tsx";
import { apiConfig } from '../lib/apiConfig';

// Tipo per le notifiche toast
type ToastProps = {
    title: string;
    description: string;
    variant?: 'success' | 'destructive';
};

export default function AdminFileGpx() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        difficulty: "Medio",
        gpxFile: null as File | null,
        story: "",
        location: ""
    });

    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.name.endsWith('.gpx')) {
            setFormData(prev => ({ ...prev, gpxFile: file }));
        } else {
            if (file) {
                showToast({
                    title: "Errore",
                    description: "Seleziona un file GPX valido",
                    variant: "destructive",
                });
            }
            setFormData(prev => ({ ...prev, gpxFile: null }));
        }
    };

    const showToast = (toast: ToastProps) => {
        setToasts(prevToasts => [...prevToasts, toast]);

        setTimeout(() => {
            setToasts(prevToasts => prevToasts.filter(t => t !== toast));
        }, 3000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate file selection
        if (!formData.gpxFile) {
            showToast({
                title: "Errore",
                description: "Seleziona un file GPX prima di inviare.",
                variant: "destructive",
            });
            return;
        }

        const { title, description, difficulty, gpxFile } = formData;

        // Prepara FormData
        const payload = new FormData()
        payload.append("title", title)
        payload.append("description", description)
        payload.append("difficulty", difficulty)
        if (gpxFile) {
            payload.append("gpxFile", gpxFile)
        }

        console.log("Payload contents:");
        for (const [key, value] of payload.entries()) {
            console.log(key, value);
        }

        // Invia la richiesta
        await fetch(apiConfig.endpoints.escursioni.create, {
            method: "PUT",
            body: payload

        }).then(res => {
            if(res.ok){

                showToast({
                    title: "Successo",
                    description: "GPX caricato con successo!",
                });

                setFormData({ title: "", description: "", difficulty: "Medio", gpxFile: null, story: "", location: "" });
            }else {
                showToast({
                    title: "Error",
                    description: "Errore caricamento file GPX",
                    variant: "destructive",
                });
            }
        }).catch(error => {
            showToast({
                    title: "Errore",
                    description: "Errore nel caricamento, riprova.",
                });
            console.error(error)
        });

        console.log("Caricamento escursione");
    };


    return (
        <div className="min-h-screen p-4 bg-gray-50">
            <div className="max-w-2xl mx-auto">
                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mb-4 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                            <path d="m12 19-7-7 7-7"/>
                            <path d="M19 12H5"/>
                        </svg>
                        Indietro
                    </button>
                </div>


                {/* Main Card */}
                <div className="rounded-xl border border-gray-300 bg-card text-card-foreground shadow-sm bg-white">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" x2="12" y1="3" y2="15"/>
                            </svg>
                            Carica nuova escursione
                        </h3>
                        <p className="text-sm text-muted-foreground text-gray-500">
                            Aggiungi i dettagli della tua escursione e carica il file GPX
                        </p>
                    </div>

                    <div className="p-6 pt-0">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Hidden inputs */}
                            <input type="number" name='id' value="" hidden/>

                            {/* Title Input */}
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800">
                                    Titolo del luogo
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Es. Sentiero del Monte Bianco"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="flex h-10 w-full rounded-md border border-gray-200 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            {/* Location Textarea */}
                            <div className="space-y-2">
                                <label htmlFor="location" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800">
                                    Posizione
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    placeholder="Es. Monte Bianco, Italia"
                                    value={formData.location || ""}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    className="flex h-10 w-full rounded-md border border-gray-200 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            {/* Location and Story Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Description Textarea */}
                                <div className="space-y-2">
                                    <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800">
                                        Descrizione
                                    </label>
                                    <textarea
                                        id="description"
                                        placeholder="Descrivi la tua escursione, il paesaggio, le difficoltà incontrate..."
                                        rows={4}
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        className="flex w-full rounded-md border border-gray-200 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                                    />
                                </div>

                                {/* Story Textarea */}
                                <div className="space-y-2">
                                    <label htmlFor="story" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800">
                                        Storia
                                    </label>
                                    <textarea
                                        id="story"
                                        placeholder="Racconta la tua esperienza durante l'escursione..."
                                        rows={4}
                                        value={formData.story || ""}
                                        onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
                                        className="flex w-full rounded-md border border-gray-200 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                                    />
                                </div>
                            </div>

                            {/* Difficulty Selector */}
                            <div className="space-y-2">
                                <label htmlFor="difficulty" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800">
                                    Difficoltà
                                </label>
                                <div className="relative">
                                    <select
                                        id="difficulty"
                                        value={formData.difficulty}
                                        onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                                        className="flex h-10 w-full rounded-md border border-gray-200 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-10"
                                    >
                                        <option value="Facile">Facile</option>
                                        <option value="Medio">Medio</option>
                                        <option value="Difficile">Difficile</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400">
                                            <path d="m6 9 6 6 6-6"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* GPX File Input */}
                            <div className="space-y-2">
                                <label htmlFor="gpx-file-input" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800 dark:text-gray-200">
                                    File GPX
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="gpx-file-input" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/20 hover:bg-gray-100 dark:hover:bg-gray-800/40 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                                <polyline points="17 8 12 3 7 8"/>
                                                <line x1="12" x2="12" y1="3" y2="15"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold text-blue-600">Clicca per caricare</span> il file GPX
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Solo file .gpx</p>
                                            {formData.gpxFile && (
                                                <p className="text-sm text-blue-600 dark:text-blue-500 mt-2">
                                                    {formData.gpxFile.name}
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            id="gpx-file-input"
                                            name="gpxFile"
                                            type="file"
                                            accept=".gpx"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Carica escursione
                            </button>
                        </form>
                    </div>
                </div>
                {/*Delete escursione*/}
                <EliminaEscursione
                    showToast={showToast}
                />
            </div>

            {/* Toast Notifications */}
            <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
                {toasts.map((toast, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-y-0 opacity-100 ${
                            toast.variant === 'destructive' ? 'bg-red-600' : 'bg-green-600'
                        }`}
                        style={{animation: 'fadeIn 0.3s ease-out'}}
                    >
                        <strong className="block mb-1">{toast.title}</strong>
                        <p className="text-sm">{toast.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}