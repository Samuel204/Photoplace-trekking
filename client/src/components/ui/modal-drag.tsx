/*Modal logic*/

import {motion, useAnimate, useDragControls} from "framer-motion";
import useMeasure from "react-use-measure";
import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useMotionValue} from "motion/react";

interface ModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode;
}

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
                        className="absolute bottom-0 h-[60vh] md:h-[65vh] w-full bg-white rounded-t-3xl"
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

export default DragCloseModal;