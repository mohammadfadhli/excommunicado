"use client";

import Link from "next/link";

import { ButtonGroup, Button } from "@material-tailwind/react";

export default function SearchButtonGroup(params) {

    return (
        <>
        <div className="flex mt-5">
            <Link href={`/search/movies?query=${params.query}&page=1`} className="p-2 bg-blue-500 rounded-tl-lg rounded-bl-lg">Movies</Link>
            <Link href={`/search/tvshows?query=${params.query}&page=1`} className="p-2 bg-blue-500 border-l border-r">TV Shows</Link>
            <Link href={`/search/people?query=${params.query}&page=1`} className="p-2 bg-blue-500 rounded-tr-lg rounded-br-lg ">People</Link>
        </div>
        </>
    );
}
