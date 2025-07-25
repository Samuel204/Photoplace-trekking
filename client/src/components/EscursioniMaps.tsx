
export default function EscursioniMaps() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 z-20 mt-10">
            <div className="overflow-hidden rounded-lg bg-white border border-gray-100">
                <div className="p-6">
                    <h3 className="font-semibold tracking-tight flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" className="w-5 h-5 text-emerald-600">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Mappa delle Escursioni
                    </h3>
                </div>
                <div className="p-0">
                    <div
                        className="h-96 bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center">
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="w-16 h-16 mx-auto mb-4 text-emerald-400">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <p className="text-gray-600">Mappa interattiva con tracce GPS</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Qui verrà visualizzata la mappa con tutti i percorsi
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}