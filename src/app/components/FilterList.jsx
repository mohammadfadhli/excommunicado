"use client";

import {
    Menu,
    MenuHandler,
    Button,
    MenuList,
    MenuItem,
    Checkbox,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function FilterList(params) {
    const [activeFilter, setActiveFilter] = useState([]);
    const [par, setPar] = useState("")

    useEffect(() => {
        console.log(params.genres);

        if (params.genres) {
            setActiveFilter(params.genres.split(","));
        }

        if(params.route == "allmovies")
        {
            setPar("movies")
        }
        else if(params.route == "upcomingmovies")
        {
            setPar("upcoming")
        }
    }, []);

    function handleCheckBox(e) {
        console.log(e.target.checked);
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

    return (
        <Menu
            dismiss={{
                itemPress: false,
            }}
            placement="bottom-start"
        >
            <MenuHandler>
                <div className="cursor-pointer flex flex-nowrap gap-3">
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
                    <h1>Filter</h1>
                </div>
            </MenuHandler>
            <MenuList>
                <MenuItem className="p-0">
                    <label
                        htmlFor="28"
                        className="flex cursor-pointer items-center gap-2 p-2"
                    >
                        <IsChecked val="28"></IsChecked>
                        Action
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                        htmlFor="12"
                        className="flex cursor-pointer items-center gap-2 p-2"
                    >
                        <IsChecked val="12"></IsChecked>
                        Adventure
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                        htmlFor="16"
                        className="flex cursor-pointer items-center gap-2 p-2"
                    >
                        <IsChecked val="16"></IsChecked>
                        Animation
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                        htmlFor="35"
                        className="flex cursor-pointer items-center gap-2 p-2"
                    >
                        <IsChecked val="35"></IsChecked>
                        Comedy
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                        htmlFor="80"
                        className="flex cursor-pointer items-center gap-2 p-2"
                    >
                        <IsChecked val="80"></IsChecked>
                        Crime
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                        htmlFor="27"
                        className="flex cursor-pointer items-center gap-2 p-2"
                    >
                        <IsChecked val="27"></IsChecked>
                        Horror
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                        htmlFor="9648"
                        className="flex cursor-pointer items-center gap-2 p-2"
                    >
                        <IsChecked val="9648"></IsChecked>
                        Mystery
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                        htmlFor="878"
                        className="flex cursor-pointer items-center gap-2 p-2"
                    >
                        <IsChecked val="878"></IsChecked>
                        Sci-Fi
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                        htmlFor="10749"
                        className="flex cursor-pointer items-center gap-2 p-2"
                    >
                        <IsChecked val="10749"></IsChecked>
                        Romance
                    </label>
                </MenuItem>
                <hr className="my-3" />
                <MenuItem className="p-0">
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
                <MenuItem className="p-0 mt-2">
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
    );
}
