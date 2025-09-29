import {FloatingNav} from "./ui/floating-navbar.tsx";
import {FiHome} from "react-icons/fi";
import {LuGalleryVerticalEnd, LuLayoutList} from "react-icons/lu";
import {RxPerson} from "react-icons/rx";


export default function NavBar() {
    const navItems = [
        {
            name: "Home",
            link: "/",
            icon:  <FiHome/>,
        },
        {
            name: "Galleria",
            link: "/gallery",
            icon: <LuGalleryVerticalEnd/>,
        },
        {
            name: "Escursioni",
            link: "/escursioni",
            icon:  <LuLayoutList />

        },
        {
            name: "Me",
            link: "/contatti",
            icon: <RxPerson/>,
        }
    ];

    return (
        <div className="relative w-full flex items-center">
            <FloatingNav navItems={navItems} />
        </div>
    )
}