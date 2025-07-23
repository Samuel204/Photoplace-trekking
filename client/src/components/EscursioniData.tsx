
export default function EscursioniData() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Ultime Escursioni</h2>
                <a href="/escursioni" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                    Vedi tutte →
                </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="overflow-hidden rounded-lg bg-white hover:shadow-lg transition-shadow group">
                    <div
                        className="aspect-video bg-gradient-to-br from-emerald-200 to-sky-200 relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="w-12 h-12 text-white/80">
                                <path
                                    d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                                <circle cx="12" cy="13" r="3"></circle>
                            </svg>
                        </div>
                        <div
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 absolute top-4 right-4 bg-white/90 text-gray-800 hover:bg-white">
                            45 foto
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">Monte Bianco</h3>
                        <p className="text-gray-600 text-sm mb-3">2024-06-15</p>
                        <div
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-red-200 text-red-700">
                            Difficile
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white hover:shadow-lg transition-shadow group">
                    <div
                        className="aspect-video bg-gradient-to-br from-emerald-200 to-sky-200 relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="w-12 h-12 text-white/80">
                                <path
                                    d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                                <circle cx="12" cy="13" r="3"></circle>
                            </svg>
                        </div>
                        <div
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 absolute top-4 right-4 bg-white/90 text-gray-800 hover:bg-white">
                            32 foto
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">Lago di Braies</h3>
                        <p className="text-gray-600 text-sm mb-3">2024-06-10</p>
                        <div
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-green-200 text-green-700">
                            Facile
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white hover:shadow-lg transition-shadow group">
                    <div
                        className="aspect-video bg-gradient-to-br from-emerald-200 to-sky-200 relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="w-12 h-12 text-white/80">
                                <path
                                    d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                                <circle cx="12" cy="13" r="3"></circle>
                            </svg>
                        </div>
                        <div
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 absolute top-4 right-4 bg-white/90 text-gray-800 hover:bg-white">
                            67 foto
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">Dolomiti - Tre Cime</h3>
                        <p className="text-gray-600 text-sm mb-3">2024-06-05</p>
                        <div
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-orange-200 text-orange-700">
                            Medio
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}