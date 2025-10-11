import {motion} from "framer-motion";
import React from "react";

interface EscursioneModalContentProps {
    title: string;
    date: string;
    data: Array<{
        label: string;
        value: number;
        icon: React.ReactNode;
    }>;
    distance?: string;
    elevation?: string;
}

export default function EscursioneModalContent({
                                                   title,
                                                   date,
                                                   data,
                                                   distance,
                                                   elevation
                                               }: EscursioneModalContentProps) {
    return (
        <div className="text-center md:px-64">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="mt-3 text-gray-600">{date}</p>
            <div className="grid grid-cols-3 gap-4 md:gap-10 mt-5" aria-label="Weekly analytics chart">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <div className="bg-white p-4 rounded-2xl shadow-xs md:shadow-sm border border-gray-100 space-y-3 z-10 w-full">
                            {/* Top progress bar */}
                            <div className="flex justify-center items-center w-full">
                                <div className="w-16 bg-gray-200 h-1 rounded-full mb-2"/>
                            </div>
                            {/* Value Info */}
                            <div className="flex items-center justify-center space-x-2">
                                <div className="text-sky-500 text-lg">
                                    {item.icon}
                                </div>
                                <p className="text-gray-800">
                                    <span className="font-bold text-xl md:text-2xl">
                                        {item.label === "Distanza" ? Math.round(Number(distance)) : item.label === "Dislivello" ? Number(elevation) : item.value}
                                    </span>
                                    <span className="text-gray-500">{item.label === "Difficoltà" && "%"}
                                        {item.label === "Distanza" && ` km`}
                                        {item.label === "Dislivello" && ` m`}
                                    </span>
                                </p>
                            </div>

                            {/* Bottom progress bar */}
                            <div className={`w-full h-2 rounded-full ${
                                item.label === "Difficoltà"
                                    ? "bg-emerald-100"
                                    : item.label === "Distanza"
                                        ? "bg-sky-100"
                                        : "bg-amber-100"
                            }`}>
                                <motion.div
                                    className={`h-2 rounded-full ${
                                        item.label === "Difficoltà"
                                            ? "bg-emerald-500"
                                            : item.label === "Distanza"
                                                ? "bg-sky-500"
                                                : "bg-amber-500"
                                    }`}
                                    style={{width: `${item.value}%`}}
                                    initial={{width: "0%"}}
                                    animate={{width: `${item.value}%`}}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.1 + 0.2,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                />
                            </div>

                            {/* Label */}
                            <div className="flex items-center justify-center space-x-2 text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M4 6h16M4 12h16m-7 6h7"/>
                                </svg>
                                <span className="font-semibold text-sm">{item.label}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/*<div className="mt-10 py-16 md:py-20 border rounded-2xl">

            </div>*/}
        </div>
    );
}
