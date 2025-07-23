"use client"
import { motion, useTransform, useScroll } from "framer-motion"
import Lenis from '@studio-freight/lenis';


import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';
import image5 from '../assets/5.jpg';
import image6 from '../assets/6.jpg';
import image7 from '../assets/7.jpg';
import image8 from '../assets/8.jpg';
import image9 from '../assets/9.jpg';
import image10 from '../assets/10.jpg';
import image11 from '../assets/11.jpg';
import image12 from '../assets/12.jpg';
import {useEffect, useRef, useState} from "react";
import type {MotionValue} from "motion";

const images = [
    image1, image2, image3, image4, image5, image6,
    image7, image8, image9, image10, image11, image12
];

export default function Gallery() {

    const [dimension, setDimension] = useState({width:0, height:0});

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
          <div className="h-[100vh]"></div>
          <div ref={container} className="relative flex p-5 gap-10 h-[175vh] bg-[rgb(45,45,45)] box-border overflow-hidden">
              <Column images={[images[0], images[1], images[2]]} y={y} className="-top-[45%]"/>
              <Column images={[images[3], images[4], images[5]]} y={y2} className="-top-[95%]"/>
              <Column images={[images[6], images[7], images[8]]} y={y3} className="-top-[45%]"/>
              <Column images={[images[9], images[10], images[11]]} y={y4} className="-top-[75%]"/>
          </div>
          <div className="h-[100vh]"></div>
      </section>
  )
}

const Column = ({images, y=0, className} : {
    images: string[];
    y: MotionValue<number> | number;
    className?: string;
}) => {
    return (
        <motion.div
            className={`relative flex flex-col gap-10 h-full w-[25%] min-w-[250px] ${className}`}
            style={{y}}
            >
            {images.map((src, i) => {
                    return (
                        <div key={i} className="w-full h-full relative rounded-sm overflow-hidden">
                            <img
                                src={src}
                                alt="image"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )
                })
            }
        </motion.div>
    )
}