"use client";

import { GridBody, DraggableContainer, GridItem } from "./ui/infinite-drag-scroll.tsx";
import { getCloudinaryImage } from "../lib/cloudinaryUtils";
import { AdvancedImage } from "@cloudinary/react";

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
];

const cloudinaryImages = imagePaths.map((path) =>
    getCloudinaryImage(path, {
        maxWidth: 500,
        qualityLevel: "auto",
        isLazy: true,
    })
);

export default function Gallery() {
    return (
        <DraggableContainer variant="masonry">
            <GridBody>
                {cloudinaryImages.map((image, idx) => (
                    <GridItem
                        key={idx}
                        className="relative h-54 w-36 md:h-96 md:w-64"
                    >
                        <AdvancedImage
                            cldImg={image}
                            alt={`Landscape ${idx + 1}`}
                            width="500"
                            height="500"
                            className="rounded-lg h-20 w-20 md:h-80 md:w-72 object-cover flex-shrink-0"
                        />
                    </GridItem>
                ))}
            </GridBody>
        </DraggableContainer>
    );
}