import {type Dispatch, type ReactNode, type SetStateAction, useState } from "react";
import useMeasure from "react-use-measure";
import { useDragControls, useMotionValue, useAnimate, motion } from "framer-motion";

interface CardEscursioniDetailProps {
    title: string;
    date: string;
    difficulty: "Facile" | "Medio" | "Difficile";
    photoCount: number;
    distance?: string;
    elevation?: string;
}

interface ModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode;
}

/*Modal logic*/
const DragCloseModal = ({ open, setOpen, children }: ModalProps) => {
    const [scope, animate] = useAnimate();
    const [modalRef, { height }] = useMeasure();

    const y = useMotionValue(0);
    const controls = useDragControls();

    const handleClose = async () => {
        animate(scope.current, { opacity: [1, 0] });

        const yStart = typeof y.get() === "number" ? y.get() : 0;

        await animate("#modal", { y: [yStart, height] });

        setOpen(false);
    };

    return (
        <>
            {open && (
                <motion.div
                    ref={scope}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleClose}
                    className="fixed inset-0 z-50 bg-black/50"
                >
                    <motion.div
                        id="modal"
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ ease: "easeInOut" }}
                        className="absolute bottom-0 h-[75vh] w-full bg-white rounded-t-3xl"
                        style={{ y }}
                        drag="y"
                        dragControls={controls}
                        onDragEnd={() => {
                            if (y.get() >= 100) {
                                handleClose();
                            }
                        }}
                        dragListener={false}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.5 }}
                    >
                        <div className="absolute top-0 left-0 right-0 flex justify-center p-4">
                            <button
                                onPointerDown={(e) => controls.start(e)}
                                className="h-2 w-14 bg-gray-300 rounded-full cursor-grab active:cursor-grabbing"
                            ></button>
                        </div>
                        <div className="p-4 pt-12 overflow-y-auto">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

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
                            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                            <circle cx="12" cy="13" r="3"></circle>
                        </svg>
                    </div>
                    <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 absolute top-4 right-4 bg-white/90 text-gray-800 hover:bg-white">
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
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="mt-4 text-gray-600">{date}</p>
                    <p className="mt-2 text-gray-500">Difficoltà: {difficulty}</p>
                    {distance && <p className="mt-2 text-gray-500">Distanza: {distance}</p>}
                    {elevation && <p className="mt-2 text-gray-500">Dislivello: {elevation}</p>}
                </div>
            </DragCloseModal>
        </>
    );
}