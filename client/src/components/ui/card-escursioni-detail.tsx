import {useState} from "react";
import DragCloseModal from "./modal-drag.tsx";
import EscursioneModalContent from "./escursione-modal-content.tsx";


interface CardEscursioniDetailProps {
    title: string;
    date: string;
    difficulty: "Facile" | "Medio" | "Difficile";
    photoCount: number;
    distance?: string;
    elevation?: string;
}


export default function CardEscursioniDetail({
                                                 title,
                                                 date,
                                                 difficulty,
                                                 photoCount,
                                                 distance,
                                                 elevation,
                                             }: CardEscursioniDetailProps) {
    const [open, setOpen] = useState(false);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Facile":
                return "border-green-200 text-green-700";
            case "Medio":
                return "border-orange-200 text-orange-700";
            case "Difficile":
                return "border-red-200 text-red-700";
            default:
                return "border-gray-200 text-gray-700";
        }
    };



    return (
        <>
            <div
                className="overflow-hidden rounded-lg bg-white hover:shadow-lg transition-shadow group cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <div className="aspect-video bg-gradient-to-br from-emerald-200 to-sky-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-12 h-12 text-white/80"
                        >
                            <path
                                d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                            <circle cx="12" cy="13" r="3"></circle>
                        </svg>
                    </div>
                    <div
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 absolute top-4 right-4 bg-white/90 text-gray-800 hover:bg-white">
                        {photoCount} foto
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{date}</p>
                    {(distance || elevation) && (
                        <div className="mb-3 text-sm space-y-1">
                            {distance && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Distanza:</span>
                                    <span className="font-medium">{distance} km</span>
                                </div>
                            )}
                            {elevation && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Dislivello:</span>
                                    <span className="font-medium">{elevation} m</span>
                                </div>
                            )}
                        </div>
                    )}
                    <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getDifficultyColor(
                            difficulty
                        )}`}
                    >
                        {difficulty}
                    </div>
                </div>
            </div>

            <DragCloseModal open={open} setOpen={setOpen}>
                <EscursioneModalContent
                    title={title}
                    date={date}
                    difficulty={difficulty}
                    distance={distance}
                    elevation={elevation}
                />
            </DragCloseModal>
        </>
    );
}