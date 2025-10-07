"use client";
import { GridBody, DraggableContainer, GridItem } from "./ui/infinite-drag-scroll.tsx";
import { getCloudinaryImage } from "../lib/cloudinaryUtils";
import { AdvancedImage } from "@cloudinary/react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {useEffect} from "react";


const imagePaths = [
    "Asiago_1",
    "Asiago_3",
    "Asolo_5",
    "FotoVarie_2",
    "Asolo_4",
    "Asiago_4",

    "Posina_2",
    "Asolo_1",
    "Asolo_3",
    "Asiago_6",
    "FotoVarie_4",
    "FotoVarie_3",

    "Posina_1",
    "FotoVarie_4",
    "Tonezza_1",
    "Posina_1",
    "Posina_4",
    "Posina_3",
];

const cloudinaryImages = imagePaths.map((path) =>
    getCloudinaryImage(path, {
        maxWidth: 500,
        qualityLevel: "auto",
        isLazy: true,
    })
);

export default function Gallery() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

    useEffect(() => {
        setIsHighQualityLoaded(false);
    }, [selectedIdx]);

    return (
        <div className="bg-[#141414] relative">
            <DraggableContainer variant="masonry">
                <GridBody>
                    {cloudinaryImages.map((image, idx) => (
                        <GridItem
                            key={idx}
                            className="relative h-54 w-40 md:h-96 md:w-64"
                            onClick={() => setSelectedIdx(idx)}
                        >
                            <AdvancedImage
                                cldImg={image}
                                alt={`Landscape ${idx + 1}`}
                                width="500"
                                height="500"
                                className="rounded-lg h-full w-full object-cover flex-shrink-0"
                            />
                        </GridItem>
                    ))}
                </GridBody>
            </DraggableContainer>
            <AnimatePresence>
                {selectedIdx !== null && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedIdx(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Immagine bassa qualità (rimane sotto) */}
                            <AdvancedImage
                                cldImg={cloudinaryImages[selectedIdx]}
                                alt={`Landscape ${selectedIdx + 1}`}
                                width="500"
                                height="500"
                                className={`rounded-lg max-h-[80vh] max-w-[90vw] object-contain transition-opacity duration-500 ${isHighQualityLoaded ? 'opacity-0' : 'opacity-100'}`}
                            />
                            {/* Immagine alta qualità sovrapposta */}
                            <AdvancedImage
                                cldImg={getCloudinaryImage(imagePaths[selectedIdx], {
                                    maxWidth: 1200,
                                    qualityLevel: "auto:best",
                                    isLazy: false,
                                })}
                                alt={`Landscape ${selectedIdx + 1}`}
                                width="500"
                                height="500"
                                onLoad={(e: { currentTarget: { style: { opacity: string; }; }; }) => {
                                    e.currentTarget.style.opacity = "1";
                                    setIsHighQualityLoaded(true);
                                }}
                                className="rounded-lg max-h-[80vh] max-w-[90vw] object-contain absolute inset-0 opacity-0 transition-opacity duration-500"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}