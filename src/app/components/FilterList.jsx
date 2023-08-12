"use client";

import {
    Button,
    Checkbox,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function FilterList(params) {
    const [activeFilter, setActiveFilter] = useState([]);
    const [par, setPar] = useState("");

    useEffect(() => {

        if (params.genres) {
            setActiveFilter(params.genres.split(","));
        }

        if (params.route == "allmovies") {
            setPar("movies");
        } else if (params.route == "upcomingmovies") {
            setPar("upcoming");
        } else if (params.route == "tvshows") {
            setPar("tvshows");
        }
    }, []);

    function handleCheckBox(e) {
        if (e.target.checked) {
            setActiveFilter(
                // Replace the state
                [
                    // with a new array
                    ...activeFilter, // that contains all the old items
                    e.target.value, // and one new item at the end
                ]
            );
        } else {
            setActiveFilter(activeFilter.filter((a) => a !== e.target.value));
        }
    }

    function IsChecked(params) {
        if (activeFilter.includes(params.val)) {
            return (
                <Checkbox
                    ripple={false}
                    id={params.val}
                    containerProps={{ className: "p-0" }}
                    className="hover:before:content-none"
                    value={params.val}
                    onChange={(e) => {
                        handleCheckBox(e);
                    }}
                    checked
                />
            );
        } else {
            return (
                <Checkbox
                    ripple={false}
                    id={params.val}
                    containerProps={{ className: "p-0" }}
                    className="hover:before:content-none"
                    value={params.val}
                    onChange={(e) => {
                        handleCheckBox(e);
                    }}
                />
            );
        }
    }

    function activateFilter() {
        let text = activeFilter.join("%2C");

        if (text) {
            window.location.href = `/${par}?genres=${text}&page=1`;
        } else {
            window.location.href = `/${par}?page=1`;
        }
    }

    function removeFilters() {
        setActiveFilter([]);
        window.location.href = `/${par}?page=1`;
    }

    if (par == "tvshows") {
        return (
            <div className="mt-5">
                <Menu
                    dismiss={{
                        itemPress: false,
                    }}
                    placement="bottom-start"
                >
                    <MenuHandler>
                        <Button
                            variant="gradient"
                            className="flex items-center gap-3"
                            color="blue"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                                />
                            </svg>
                            <h1>Filters</h1>
                        </Button>
                    </MenuHandler>
                    <MenuList className="bg-[#282828] border-none text-white">
                        <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                            <label
                                htmlFor="10759"
                                className="flex cursor-pointer items-center gap-2 p-2"
                            >
                                <IsChecked val="10759"></IsChecked>
                                Action & Adventure
                            </label>
                        </MenuItem>
                        <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                            <label
                                htmlFor="16"
                                className="flex cursor-pointer items-center gap-2 p-2"
                            >
                                <IsChecked val="16"></IsChecked>
                                Animation
                            </label>
                        </MenuItem>
                        <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                            <label
                                htmlFor="35"
                                className="flex cursor-pointer items-center gap-2 p-2"
                            >
                                <IsChecked val="35"></IsChecked>
                                Comedy
                            </label>
                        </MenuItem>
                        <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                            <label
                                htmlFor="80"
                                className="flex cursor-pointer items-center gap-2 p-2"
                            >
                                <IsChecked val="80"></IsChecked>
                                Crime
                            </label>
                        </MenuItem>
                        <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                            <label
                                htmlFor="99"
                                className="flex cursor-pointer items-center gap-2 p-2"
                            >
                                <IsChecked val="99"></IsChecked>
                                Documentary
                            </label>
                        </MenuItem>
                        <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                            <label
                                htmlFor="18"
                                className="flex cursor-pointer items-center gap-2 p-2"
                            >
                                <IsChecked val="18"></IsChecked>
                                Drama
                            </label>
                        </MenuItem>
                        <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                            <label
                                htmlFor="10751"
                                className="flex cursor-pointer items-center gap-2 p-2"
                            >
                                <IsChecked val="10751"></IsChecked>
                                Family
                            </label>
                        </MenuItem>
                        <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                            <label
                                htmlFor="9648"
                                className="flex cursor-pointer items-center gap-2 p-2"
                            >
                                <IsChecked val="9648"></IsChecked>
                                Mystery
                            </label>
                        </MenuItem>
                        <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                            <label
                                htmlFor="10765"
                                className="flex cursor-pointer items-center gap-2 p-2"
                            >
                                <IsChecked val="10765"></IsChecked>
                                Sci-Fi & Fantasy
                            </label>
                        </MenuItem>
                        <hr className="my-3" />
                        <MenuItem className="p-0 focus:bg-transparent active:bg-transparent">
                            <Button
                                color="red"
                                onClick={() => {
                                    removeFilters();
                                }}
                                fullWidth
                            >
                                Remove Filters
                            </Button>
                        </MenuItem>
                        <MenuItem className="p-0 mt-2 focus:bg-transparent active:bg-transparent">
                            <Button
                                color="green"
                                onClick={() => {
                                    activateFilter();
                                }}
                                fullWidth
                            >
                                Filter
                            </Button>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        );
    }

    return (
        <div className="mt-5">
            <Menu
                dismiss={{
                    itemPress: false,
                }}
                placement="bottom-start"
            >
                <MenuHandler>
                    <Button
                        variant="gradient"
                        className="flex items-center gap-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                            />
                        </svg>
                        <h1>Filters</h1>
                    </Button>
                </MenuHandler>
                <MenuList className="bg-[#282828] border-none text-white">
                    <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                        <label
                            htmlFor="28"
                            className="flex cursor-pointer items-center gap-2 p-2"
                        >
                            <IsChecked val="28"></IsChecked>
                            Action
                        </label>
                    </MenuItem>
                    <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                        <label
                            htmlFor="12"
                            className="flex cursor-pointer items-center gap-2 p-2"
                        >
                            <IsChecked val="12"></IsChecked>
                            Adventure
                        </label>
                    </MenuItem>
                    <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                        <label
                            htmlFor="16"
                            className="flex cursor-pointer items-center gap-2 p-2"
                        >
                            <IsChecked val="16"></IsChecked>
                            Animation
                        </label>
                    </MenuItem>
                    <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                        <label
                            htmlFor="35"
                            className="flex cursor-pointer items-center gap-2 p-2"
                        >
                            <IsChecked val="35"></IsChecked>
                            Comedy
                        </label>
                    </MenuItem>
                    <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                        <label
                            htmlFor="80"
                            className="flex cursor-pointer items-center gap-2 p-2"
                        >
                            <IsChecked val="80"></IsChecked>
                            Crime
                        </label>
                    </MenuItem>
                    <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                        <label
                            htmlFor="27"
                            className="flex cursor-pointer items-center gap-2 p-2"
                        >
                            <IsChecked val="27"></IsChecked>
                            Horror
                        </label>
                    </MenuItem>
                    <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                        <label
                            htmlFor="9648"
                            className="flex cursor-pointer items-center gap-2 p-2"
                        >
                            <IsChecked val="9648"></IsChecked>
                            Mystery
                        </label>
                    </MenuItem>
                    <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                        <label
                            htmlFor="878"
                            className="flex cursor-pointer items-center gap-2 p-2"
                        >
                            <IsChecked val="878"></IsChecked>
                            Sci-Fi
                        </label>
                    </MenuItem>
                    <MenuItem className="p-0 focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
                        <label
                            htmlFor="10749"
                            className="flex cursor-pointer items-center gap-2 p-2"
                        >
                            <IsChecked val="10749"></IsChecked>
                            Romance
                        </label>
                    </MenuItem>
                    <hr className="my-3" />
                    <MenuItem className="p-0 focus:bg-transparent active:bg-transparent">
                        <Button
                            color="red"
                            onClick={() => {
                                removeFilters();
                            }}
                            fullWidth
                        >
                            Remove Filters
                        </Button>
                    </MenuItem>
                    <MenuItem className="p-0 mt-2 focus:bg-transparent active:bg-transparent">
                        <Button
                            color="green"
                            onClick={() => {
                                activateFilter();
                            }}
                            fullWidth
                        >
                            Filter
                        </Button>
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}
