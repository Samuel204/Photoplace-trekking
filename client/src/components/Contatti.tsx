import {TfiEmail} from "react-icons/tfi";
import {FiInstagram, FiMapPin} from "react-icons/fi";
import {CiLinkedin} from "react-icons/ci";

export default function Contatti() {
    return (
        <div className="flex flex-col z-50 min-h-screen mt-14">
            <div className="mx-auto max-w-5xl p-5 md:p-16 text-black font-primary w-full rounded-lg relative overflow-hidden bg-white/30 backdrop-blur-3xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_8px_4px_rgba(255,255,255,0.4)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent after:content-[''] after:absolute after:top-0 after:left-0 after:w-[1px] after:h-full after:bg-gradient-to-b after:from-white/80 after:via-transparent after:to-white/30">
                <div>
                    <h2 className="flex flex-row items-center mb-5 text-3xl font-bold text-dark sm:text-[30px]/[40px]">
                        Raggiungi i tuoi obiettivi...
                    </h2>
                    <p className="mb-5 text-base text-body-color dark:text-dark-6">
                        Ciao a tutti, io mi chiamo David Babic e sono un appassionato di fotografia.
                        Oltre a pubblicare le foto su Instagram, ho voluto raccontare un po'
                        il background delle mie foto, che emozioni mi trasmettono, cosa significano
                        per me e magari anche qualche dettaglio tecnico sulle foto che faccio.
                    </p>
                    <p className="mb-8 text-base text-body-color dark:text-dark-6">
                        Prenditi un po'di tempo per esplorare il blog, leggere qualcosa
                        che ti interessa e sentiti libero di contattarmi propormi una collaborazione.
                    </p>
                </div>
                <h1 className="font-secondary mt-10 mb-8 text-3xl font-black uppercase">
                    Contatti
                </h1>
                <div className="mb-9 flex items-center justify-between border-b border-zinc-600/30 px-3 pb-5">
                    <div>
                        <p className="mb-1.5 text-md">EMAIL</p>
                    </div>
                    <a className="flex flex-row items-center gap-1.5 text-end text-sm uppercase text-zinc-700"
                       href="mailto:info@davidbabic.com"
                    >
                        davidbabic
                        <TfiEmail/>
                    </a>
                </div>

                <div className="mb-9 flex items-center justify-between border-b border-zinc-600/30 px-3 pb-5">
                    <div>
                        <p className="mb-1.5 text-md">INSTAGRAM</p>
                    </div>
                    <a className="flex items-center justify-center gap-1.5 text-end text-sm uppercase text-zinc-700"
                       href="@davidbabicc"
                       target="_blank"
                       rel="noopener noreferrer"
                    >
                        photoplace
                        <FiInstagram className="size-4" />
                    </a>
                </div>
                <div className="mb-9 flex items-center justify-between border-b border-zinc-600/30 px-3 pb-5">
                    <div>
                        <p className="mb-1.5 text-md">LINKEDIN</p>
                    </div>
                    <a className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-700"
                       href="https://www.linkedin.com/in/davidbabicc/"
                       target="_blank"
                       rel="noopener noreferrer"
                    >
                        davidbabic
                        <CiLinkedin className="size-5"/>
                    </a>
                </div>
                <div className="mb-9 flex items-center justify-between border-b border-zinc-600/30 px-3 pb-5">
                    <div>
                        <p className="mb-1.5 text-md">LOCATION</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-700">
                        <p>Italy</p>
                        <FiMapPin/>
                    </div>
                </div>
            </div>
        </div>
    )
}