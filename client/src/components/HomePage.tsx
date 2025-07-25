"use client";
import { DirectionAwareHover } from "./ui/direction-aware-hover.tsx";

export default function HomePage() {
    const imageUrl =
        "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
            <section className="relative bg-black overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
                    <div className="relative w-full overflow-hidden h-96 lg:h-auto lg:w-5/12">
                        <DirectionAwareHover imageUrl={imageUrl} className="h-full w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0">
                                <div className="p-4 sm:p-6 lg:p-8">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="w-10 h-10 text-emerald-500">
                                            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                                        </svg>
                                        <h2 className="font-bold text-white text-7xl ml-2.5">24</h2>
                                    </div>
                                    <p className="max-w-xs mt-1.5 text-xl text-white">Escursioni documentate su Photoplace</p>
                                </div>
                            </div>
                        </DirectionAwareHover>
                    </div>

                    <div className="relative flex items-center justify-center w-full lg:w-7/12">
                        <div className="absolute bottom-0 right-0 hidden lg:block">
                            <img className="object-contain w-auto h-48" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/curved-lines.png" alt="" />
                        </div>

                        <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
                            <h1 className="text-4xl text-center font-bold text-white sm:text-6xl xl:text-7xl">
                                Photoplace<br />
                                <span className="text-2xl font-normal">Hiking Journal</span>
                            </h1>
                            <p className="mt-8 text-xl text-white text-center">Documenta e rivivi le tue escursioni in montagna attraverso itinerari e fotografie.</p>

                            <div className="grid grid-cols-2 gap-4 mt-14 sm:grid-cols-4">
                                <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-lg">
                                    <div className="p-4 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="w-8 h-8 mx-auto mb-2 text-emerald-400">
                                            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                                        </svg>
                                        <div className="text-2xl font-bold text-white">24</div>
                                        <div className="text-sm text-emerald-200">Escursioni</div>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-lg">
                                    <div className="p-4 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="w-8 h-8 mx-auto mb-2 text-sky-400">
                                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                            <polyline points="16 7 22 7 22 13"></polyline>
                                        </svg>
                                        <div className="text-2xl font-bold text-white">245.7 km</div>
                                        <div className="text-sm text-sky-200">Distanza</div>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-lg">
                                    <div className="p-4 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="w-8 h-8 mx-auto mb-2 text-orange-400">
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        <div className="text-2xl font-bold text-white">12450m</div>
                                        <div className="text-sm text-orange-200">Dislivello</div>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-lg">
                                    <div className="p-4 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="w-8 h-8 mx-auto mb-2 text-purple-400">
                                            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                                            <circle cx="12" cy="13" r="3"></circle>
                                        </svg>
                                        <div className="text-2xl font-bold text-white">1847</div>
                                        <div className="text-sm text-purple-200">Foto</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}