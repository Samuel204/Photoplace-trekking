import {FloatingNav} from "./ui/floating-navbar.tsx";
import {FiHome} from "react-icons/fi";
import {LuGalleryVerticalEnd, LuLayoutList} from "react-icons/lu";


export default function NavBar() {
    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: <FiHome />,
        },
        {
            name: "Galleria",
            link: "/gallery",
            icon: <LuGalleryVerticalEnd />,
        },
        {
            name: "Escursioni",
            link: "/escursioni",
            icon:  <LuLayoutList />

        },
    ];

    return (
        <div className="relative w-full">
            <FloatingNav navItems={navItems} />
        </div>
    )
}