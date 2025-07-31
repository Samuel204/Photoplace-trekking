"use client"
import { motion } from "framer-motion";
import { CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import type { MotionValue } from "framer-motion";

type GalleryColumnProps = {
    images: CloudinaryImage[];
    y: MotionValue<number> | number;
    className?: string;
}

export default function GalleryColumn({ images, y = 0, className }: GalleryColumnProps) {
    return (
        <motion.div
            className={`relative flex flex-col gap-10 h-full w-[25%] min-w-[250px] ${className}`}
            style={{ y }}
        >
            {images.map((cldImage, i) => {
                return (
                    <div key={i} className="w-full h-full relative rounded-sm overflow-hidden">
                        <AdvancedImage
                            cldImg={cldImage}
                            className="object-cover w-full h-full"
                            alt={`gallery-image-${i}`}
                        />
                    </div>
                )
            })}
        </motion.div>
    );
}