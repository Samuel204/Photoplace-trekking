import { useState } from "react";
import DragCloseModal from "./modal-drag.tsx";
import EscursioneModalContent from "./escursione-modal-content.tsx";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { TbListDetails } from "react-icons/tb";
import {getCloudinaryImage} from "../../lib/cloudinaryUtils.ts";

interface CardEscursioniDetailProps {
    title: string;
    date: string;
    difficulty: "Facile" | "Medio" | "Difficile";
    distance?: string;
    elevation?: string;
    imageUrls?: string[];
    location?: string;
    duration?: string;
}

export default function CardEscursioniDetail({
                                                 title,
                                                 date,
                                                 difficulty,
                                                 distance,
                                                 elevation,
                                                 imageUrls = [],
                                                 location = "Italia",
                                                 duration = "N/A",
                                             }: CardEscursioniDetailProps) {
    const [open, setOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const defaultImage = getCloudinaryImage('Asiago_2', { maxWidth: 900 }).toURL();
    const finalImageUrls = imageUrls.length > 0 ? imageUrls : [defaultImage];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Facile":
                return "bg-green-400";
            case "Medio":
                return "bg-orange-400";
            case "Difficile":
                return "bg-pink-400";
            default:
                return "bg-gray-400";
        }
    };

    const goTo = (idx: number) => setCurrentImage(idx);
    //const prev = () => setCurrentImage((c) => (c === 0 ? finalImageUrls.length - 1 : c - 1));
    //const next = () => setCurrentImage((c) => (c === finalImageUrls.length - 1 ? 0 : c + 1));

    return (
        <div className="grid place-items-center">
            <div className="bg-white relative rounded-3xl p-4 grid grid-rows-[auto_auto_1fr] w-full h-[490px] max-w-xl">
                {/* Image Carousel Section */}
                <div className="relative h-72">
                    <div className="w-full h-full bg-gradient-to-br from-emerald-200 to-sky-200 rounded-2xl overflow-hidden flex items-center justify-center relative">
                        {finalImageUrls.map((src, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentImage ? "opacity-100 z-20" : "opacity-0 z-10"}`}
                                aria-hidden={idx !== currentImage}
                            >
                                <img
                                    src={src}
                                    alt={title}
                                    loading="lazy"
                                    className="block w-full h-full object-cover absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                />
                            </div>
                        ))}
                        {/* Carousel Indicators */}
                        <div className="absolute z-30 flex -translate-x-1/2 bottom-2 left-1/2 space-x-2">
                            {finalImageUrls.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`w-3 h-3 rounded-full ${idx === currentImage ? "bg-emerald-500" : "bg-gray-300"}`}
                                    aria-current={idx === currentImage}
                                    aria-label={`Slide ${idx + 1}`}
                                    onClick={() => goTo(idx)}
                                    tabIndex={0}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-3 right-3 z-40 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {date}
                    </div>
                </div>

                {/* Title and Action Section */}
                <div className="mt-4 grid grid-cols-[1fr_auto] items-start gap-2">
                    <div className="overflow-hidden">
                        <h2 className="text-xl font-bold text-gray-800 truncate">{title}</h2>
                        <p className="text-sm text-gray-500 truncate">{location}</p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <button
                            className="bg-white shadow-sm rounded-lg px-4 py-2 grid grid-flow-col gap-2 items-center text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                        >
                            <LiaMapMarkedAltSolid className="size-4" />
                        </button>
                        <button
                            className="bg-white shadow-sm rounded-lg px-4 py-2 grid grid-flow-col gap-2 items-center text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                            onClick={() => setOpen(true)}
                        >
                            <TbListDetails className="size-4" />
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="self-end pt-4 border-t-2 border-dashed border-gray-200 grid grid-cols-[1fr_auto] items-end">
                    {/* Left Side: Stats */}
                    <div className="grid gap-3">
                        <div className="grid grid-flow-col gap-4 auto-cols-max">
                            {distance && (
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{distance} km</p>
                                    <p className="text-xs text-gray-500">Distanza</p>
                                </div>
                            )}
                            {elevation && (
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{elevation} m</p>
                                    <p className="text-xs text-gray-500">Dislivello</p>
                                </div>
                            )}
                            {duration && (
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{duration}</p>
                                    <p className="text-xs text-gray-500">Durata</p>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-flow-col gap-4 auto-cols-max items-center">
                            <div>
                                <p className="text-xs text-gray-500">Difficoltà</p>
                                <div className={`w-16 h-1.5 ${getDifficultyColor(difficulty)} rounded-full mt-1`}></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Mini Map */}
                    <div className="w-24 h-16">
                        <svg viewBox="0 0 100 50" className="w-full h-full">
                            <path d="M 5 45 C 20 40, 25 20, 40 25 S 60 30, 75 15 S 95 10, 95 10" stroke="#9ca3af" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="5" cy="45" r="4" fill="#6b7280"/>
                            <circle cx="95" cy="10" r="4" fill="#d1d5db"/>
                        </svg>
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
        </div>
    );
}
