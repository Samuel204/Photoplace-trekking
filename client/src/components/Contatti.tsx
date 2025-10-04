import {FiMapPin} from "react-icons/fi";
import {FaSquareInstagram} from "react-icons/fa6";
import {MdCamera, MdEmail} from "react-icons/md";
import {ImLinkedin} from "react-icons/im";
import Img1 from "../assets/Posina_1.webp";

export default function Contatti() {

    return (
        <div className="flex flex-col md:flex-row items-center justify-center z-50 min-h-screen md:min-h-screen relative md:fixed md:inset-0 bg-white before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(6,182,212,0.25),transparent_70%)] after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(6,182,212,0.25),transparent_70%)]">
            <div className="md:w-1/2 p-10 lg:px-20">
                <h2 className="flex flex-row items-center mb-5 text-3xl font-bold text-gray-900">
                    Raggiungi i tuoi obiettivi...<MdCamera className="hidden lg:block" />
                </h2>
                <span className="block text-md md:text-lg ld:text-2xl text-black leading-7 lg:leading-10 font-normal md:font-thin -mt-1">
                            Ciao a tutti, io mi chiamo David Babic e sono un appassionato di fotografia.
                            Oltre a pubblicare le foto su Instagram, ho voluto raccontare un po'
                            il background delle mie foto, che emozioni mi trasmettono, cosa significano
                            per me e magari anche qualche dettaglio tecnico sulle foto che faccio.
                            <br/> <br/>
                            Prenditi un po' di tempo per esplorare il blog, leggere qualcosa
                            che ti interessa e sentiti libero di contattarmi per ulteriori informazioni.
                      </span>
            </div>
            <div className="flex-shrink group relative mb-5 md:mb-0 w-full h-[350px] max-w-xs md:w-[450px] md:h-[450px] md:max-w-md bg-gray-100/30  rounded-[32px] p-[3px] shadow-[0_70px_30px_-50px_rgba(96,75,74,0.19)] transition-all duration-500 ease-in-out hover:rounded-tl-[55px]">
                {/* Profile Picture */}
                <div className="absolute w-[calc(100%-6px)] h-[calc(100%-6px)] top-[3px] left-[3px] rounded-[29px] z-[1] border-0 border-gray-900/50 overflow-hidden transition-all duration-500 ease-in-out delay-200 group-hover:w-[100px] group-hover:h-[100px] group-hover:top-[10px] group-hover:left-[10px] group-hover:rounded-full group-hover:z-[3] group-hover:border-[7px] group-hover:shadow-[0_5px_5px_0_rgba(96,75,74,0.19)] group-hover:delay-0">
                    <img src={Img1} alt="David Babic" className="w-full h-full object-cover"/>
                </div>
                {/* Bottom Section */}
                <div className="absolute bottom-[3px] left-[3px] right-[3px] bg-gray-100 top-[80%] rounded-[29px] z-[2] shadow-[0_5px_5px_0_rgba(96,75,74,0.19)_inset] overflow-hidden transition-all duration-500 cubic-bezier(0.645,0.045,0.355,1) group-hover:top-[20%] group-hover:rounded-[80px_29px_29px_29px] group-hover:delay-200">
                    {/* Content */}
                    <div className="absolute bottom-28 left-6 right-6 h-[160px]">
                        <div className="flex items-center justify-center text-center">
                            <h3 className="font-medium text-4xl items-center leading-12">
                                Photoplaces
                                <br/>
                                <span className="text-3xl">David Babic</span>
                            </h3>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                        {/* Social Links */}
                        <div className="flex items-center justify-center gap-3 md:gap-5">
                            <span className="flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 duration-300 transition-colors size-9 size-10">
                                <a  href="mailto:info@davidbabic.com">
                                    <MdEmail  className="size-5 md:size-6 text-gray-900"/>
                                </a>
                            </span>
                            <span className="flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 duration-300 transition-colors size-9 size-10">
                                <a href="https://www.instagram.com/davidbabicc/">
                                    <FaSquareInstagram className="size-5 md:size-6 text-gray-900"/>
                                </a>
                            </span>
                            <span className="flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 duration-300 transition-colors size-9 size-10">
                                <a href="https://www.linkedin.com/in/davidbabicc/">
                                    <ImLinkedin  className="size-4 md:size-5 text-black"/>
                                </a>
                            </span>
                        </div>
                        <button className="flex flex-row items-center justify-center gap-2 bg-white text-gray-900 border-none rounded-[20px] text-sm px-4 md:px-5 py-2 shadow-[0_5px_5px_0_rgba(165,132,130,0.13)] hover:bg-gray-300 duration-300 transition-colors">
                            Italy
                            <FiMapPin className="size-4 text-gray-900"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}