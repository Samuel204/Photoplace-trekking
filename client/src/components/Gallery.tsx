"use client"
import {useTransform, useScroll } from "framer-motion"
import Lenis from '@studio-freight/lenis';
import cloudinary from '../lib/claudinaryConfig.ts';
import {useEffect, useRef, useState} from "react";
import GalleryColumn from "./ui/gallery-column.tsx";

const imageIds = [
    'Photoplace/FotoVarie/FotoVarie_1',
    "Asiago_1",
    "Asiago_2",
    "Asiago_3",
    "Asiago_1",
    "Asiago_2",
    "Asiago_3",
    "Asiago_1",
    "Asiago_2",
    "Asiago_3",
    "Asiago_1",
    "Asiago_2",
    "Asiago_2",
];

export default function Gallery() {

    const [dimension, setDimension] = useState({width:0, height:0});
    const images = imageIds.map(id => cloudinary.image(id));

    const container = useRef(null);
    const {scrollYProgress} = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    const {height} = dimension;
    const y = useTransform(scrollYProgress, [0,1], [0, height * 2])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

    useEffect( () => {
        const lenis = new Lenis()

        const raf = (time: number) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        const resize = () => {
            setDimension({width: window.innerWidth, height: window.innerHeight})
        }

        window.addEventListener("resize", resize)
        requestAnimationFrame(raf);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
        }
    },[])

    return (
        <section className="relative bg-gray-700 lg:pt-24">
            <div className=""></div>
            <div ref={container} className="relative flex p-5 gap-10 h-[175vh] bg-[rgb(45,45,45)] box-border overflow-hidden">
                <GalleryColumn images={[images[0], images[1], images[2]]} y={y} className="-top-[45%]"/>
                <GalleryColumn images={[images[3], images[4], images[5]]} y={y2} className="-top-[95%]"/>
                <GalleryColumn images={[images[6], images[7], images[8]]} y={y3} className="-top-[45%]"/>
                <GalleryColumn images={[images[9], images[10], images[11]]} y={y4} className="-top-[75%]"/>
            </div>
            <div className=""></div>
        </section>
    )
}