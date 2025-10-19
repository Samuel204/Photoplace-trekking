'use client';

import {useEffect} from 'react';
import ScrollExpandMedia from './ui/scroll-expansion-profile.tsx';
import {MdEmail} from "react-icons/md";
import {FaSquareInstagram} from "react-icons/fa6";
import {ImLinkedin} from "react-icons/im";
import { getCloudinaryImage } from '../lib/cloudinaryUtils';


const AboutMeMediaData = {
    image: {
        src: getCloudinaryImage('Posina_1', { maxWidth: 1280 }).toURL(),
        background: getCloudinaryImage('Asiago_4', { maxWidth: 1920 }).toURL(),
        title: 'Photoplace Trekking Showcase',
        date: 'David Babic',
        about: {
            overview: 'Ciao a tutti, io mi chiamo David Babic e sono un appassionato di fotografia.\n' +
                '      Oltre a pubblicare le foto su Instagram, ho voluto raccontare un po\'\n' +
                '      il background delle mie foto, che emozioni mi trasmettono, cosa significano\n' +
                '      per me e magari anche qualche dettaglio tecnico sulle foto che faccio.\n' +
                '                    \n' +
                '                            ',
            conclusion:
                'Prenditi un po\' di tempo per esplorare il blog, leggere qualcosa\n' +
                'che ti interessa e sentiti libero di contattarmi per ulteriori informazioni.',
        },
    },
};

const AboutMeContent = () => {
    const currentMedia = AboutMeMediaData.image;

    return (
        <div className='max-w-3xl md:max-w-5xl mx-auto  shadow-xs bg-black/10 backdrop-blur-xl py-5 px-5 rounded-lg'>

            <div className="flex flex-row justify-between mb-5">
                <h2 className='text-3xl font-bold text-black'>
                    About Me
                </h2>
                <div className="flex gap-3">
                    <span
                        className="flex items-center justify-center shadow-sm border border-gray-400 rounded-lg duration-300 transition-colors size-10">
                        <a href="mailto:info@davidbabic.com">
                            <MdEmail className="size-5 md:size-6 text-gray-900"/>
                        </a>
                    </span>
                    <span className="flex items-center justify-center shadow-sm border border-gray-400 rounded-lg duration-300 transition-colors size-10">
                        <a href="https://www.instagram.com/davidbabicc/">
                            <FaSquareInstagram className="size-5 md:size-6 text-gray-900"/>
                        </a>
                    </span>
                    <span className="flex items-center justify-center shadow-sm border border-gray-400 rounded-lg duration-300 transition-colors size-10">
                        <a href="https://www.linkedin.com/in/davidbabicc/">
                            <ImLinkedin className="size-4 md:size-5 text-gray-900"/>
                        </a>
                    </span>
                </div>
            </div>
            <p className='text-lg mb-8 text-black '>
                {currentMedia.about.overview}
            </p>
            <p className='text-lg mb-8 text-black text-justify'>
                {currentMedia.about.conclusion}
            </p>
        </div>
    );
};

const ProfileImageExpansion = () => {
    const currentMedia = AboutMeMediaData.image;

    useEffect(() => {
        window.scrollTo(0, 0);
        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, []);

    return (
        <div className='min-h-screen'>
            <ScrollExpandMedia
                mediaSrc={currentMedia.src}
                bgImageSrc={currentMedia.background}
                title={currentMedia.title}
                date={currentMedia.date}
                textBlend
            >
                <AboutMeContent/>
            </ScrollExpandMedia>
        </div>
    );
};

export default ProfileImageExpansion;
