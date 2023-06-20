"use client";
import React, { useEffect, useState } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
    Collapse,
    Input,
} from "@material-tailwind/react";
import Link from "next/link";

export default function Example() {
    const [openNav, setOpenNav] = React.useState(false);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);
    const [placeholdermsg, setPlaceholderMsg] = useState(
        "Search a movie..."
    );

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    useEffect(() => {
        if (error) {
            const toRef = setTimeout(() => {
                setError(false);
                setPlaceholderMsg("Search a movie...");
                clearTimeout(toRef);
            }, 1500);
        }
    }, [error]);

    function searchMovie(e) {
        e.preventDefault();
        // console.log(encodeURIComponent(search.trim()));
        if (search) {
            if (search.trim().length != 0) {
                window.location.href = `/search/?query=${encodeURIComponent(
                    search.trim()
                )}&page=1`;
            } else {
                setSearch("");
                setError(true);
                setPlaceholderMsg("Search is empty!");
            }
        } else {
            setSearch("");
            setError(true);
            setPlaceholderMsg("Search is empty!");
        }
    }

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal"
            >
                <Link href={"/movies?page=1"} className="flex items-center">
                    Movies
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal"
            >
                <Link href={"/upcoming?page=1"} className="flex items-center">
                    Upcoming
                </Link>
            </Typography>
            <div className="relative w-full">

              <form onSubmit={(e) => {
                                searchMovie(e);
                            }}>
                <Input
                    type="text"
                    label={placeholdermsg}
                    className="pr-20"
                    containerProps={{
                        className: "min-w-0",
                    }}
                    color="white"
                    value={search || ""}
                    error={error}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <Button
                  type="submit"
                    size="sm"
                    className="!absolute right-1 top-1 rounded"
                >
                    Search
                </Button>
                </form>
            </div>
        </ul>
    );

    return (
        <>
            <Navbar
                className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-[#282828]"
                blurred={false}
            >
                <div className="flex items-center justify-between text-white">
                    <Typography
                        as="a"
                        href="/"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        Excommunicado
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <Button
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                        >
                            <span>Sign In</span>
                        </Button>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="white"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <Button
                        variant="gradient"
                        size="sm"
                        fullWidth
                        className="mb-2"
                    >
                        <span>Sign In</span>
                    </Button>
                </Collapse>
            </Navbar>
        </>
    );
}