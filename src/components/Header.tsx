import {FloatingNav} from "./ui/floating-navbar.tsx";


export default function Header() {
    const navItems = [
        {
            name: "Home",
            link: "/",
            //icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Galleria",
            link: "/gallery",
            //icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Escursioni",
            link: "/escursioni",
            /*icon: (
                <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),*/
        },
    ];

    return (
        <div className="relative w-full">
            <FloatingNav navItems={navItems} />
        </div>
    )
}