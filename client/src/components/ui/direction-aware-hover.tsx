"use client";

import { useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils.tsx";

export const DirectionAwareHover = ({
                                        imageUrl,
                                        children,
                                        childrenClassName,
                                        imageClassName,
                                        className,
                                    }: {
    imageUrl: string;
    children: React.ReactNode | string;
    childrenClassName?: string;
    imageClassName?: string;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [direction, setDirection] = useState<
        "top" | "bottom" | "left" | "right" | string
    >("left");

    const handleMove = (
        clientX: number,
        clientY: number
    ) => {
        if (!ref.current) return;

        const { width: w, height: h, left, top } = ref.current.getBoundingClientRect();
        const x = clientX - left - (w / 2) * (w > h ? h / w : 1);
        const y = clientY - top - (h / 2) * (h > w ? w / h : 1);
        const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

        switch (d) {
            case 0:
                setDirection("top");
                break;
            case 1:
                setDirection("right");
                break;
            case 2:
                setDirection("bottom");
                break;
            case 3:
                setDirection("left");
                break;
            default:
                setDirection("left");
                break;
        }
    };

    const handleMouseEnter = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        setIsHovered(true);
        handleMove(event.clientX, event.clientY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleTouchStart = (
        event: React.TouchEvent<HTMLDivElement>
    ) => {
        if (event.touches.length > 0) {
            setIsHovered(true);
            handleMove(event.touches[0].clientX, event.touches[0].clientY);
        }
    };

    const handleTouchMove = (
        event: React.TouchEvent<HTMLDivElement>
    ) => {
        if (event.touches.length > 0) {
            handleMove(event.touches[0].clientX, event.touches[0].clientY);
        }
    };

    const handleTouchEnd = () => {
        setIsHovered(false);
    };

    return (
        <motion.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={ref}
            className={cn(
                "md:h-[100vh] w-60 h-60 md:w-full bg-transparent overflow-hidden group/card relative",
                className
            )}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    className="relative h-full w-full"
                    initial="initial"
                    animate={isHovered ? direction : "initial"}
                    exit="exit"
                >
                    <motion.div
                        className={cn(
                            "absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-500",
                            isHovered ? "block" : "hidden"
                        )}
                    />
                    <motion.div
                        variants={variants}
                        className="h-full w-full relative bg-gray-50"
                        transition={{
                            duration: 0.2,
                            ease: "easeOut",
                        }}
                    >
                        <img
                            alt="image"
                            className={cn(
                                "h-full w-full object-cover scale-[1.15]",
                                imageClassName
                            )}
                            width="1000"
                            height="1000"
                            src={imageUrl}
                        />
                    </motion.div>
                    <motion.div
                        variants={textVariants}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        className={cn(
                            "text-white absolute bottom-4 left-4 z-40",
                            childrenClassName
                        )}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

const variants = {
    initial: {
        x: 0,
        y: 0,
    },
    exit: {
        x: 0,
        y: 0,
    },
    top: {
        y: 20,
    },
    bottom: {
        y: -20,
    },
    left: {
        x: 20,
    },
    right: {
        x: -20,
    },
};

const textVariants = {
    initial: {
        y: 0,
        x: 0,
        opacity: 0,
    },
    exit: {
        y: 0,
        x: 0,
        opacity: 0,
    },
    top: {
        y: -20,
        opacity: 1,
    },
    bottom: {
        y: 2,
        opacity: 1,
    },
    left: {
        x: -2,
        opacity: 1,
    },
    right: {
        x: 20,
        opacity: 1,
    },
};
