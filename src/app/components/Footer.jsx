import { Typography } from "../materialui.jsx";
import Link from "next/link.js";

export default function Footer() {
    return (
        <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 p-6 text-center md:justify-between bg-[#282828]">
            <Typography
                as="a"
                href="/"
                className="mr-4 cursor-pointer py-1.5 font-bold hover:text-blue-500"
            >
                &copy; 2023 Excommunicado
            </Typography>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                <Typography
                    as="li"
                    variant="small"
                    color="white"
                    className="p-1 font-normal"
                >
                    <Link
                        href={""}
                        className="flex items-center hover:text-blue-500"
                    >
                        About Us
                    </Link>
                </Typography>
                <Typography
                    as="li"
                    variant="small"
                    color="white"
                    className="p-1 font-normal"
                >
                    <Link
                        href={""}
                        className="flex items-center hover:text-blue-500"
                    >
                        License
                    </Link>
                </Typography>
                <Typography
                    as="li"
                    variant="small"
                    color="white"
                    className="p-1 font-normal"
                >
                    <Link
                        href={""}
                        className="flex items-center hover:text-blue-500"
                    >
                        Contact Us
                    </Link>
                </Typography>
            </ul>
        </footer>
    );
}
