"use client";

import Link from "next/link";

import { ButtonGroup, Button } from "@material-tailwind/react";

export default function SearchButtonGroup(params) {

    return (
        <>
        <div className="flex mt-5">
            {params.route == "search/movies" ? <Link href={`/search/movies?query=${params.query}&page=1`} className="p-2 bg-light-blue-900 rounded-tl-md rounded-bl-md text-sm shadow-md">Movies</Link> : <Link href={`/search/movies?query=${params.query}&page=1`} className="p-2 bg-blue-500 rounded-tl-md rounded-bl-md text-sm shadow-md hover:bg-light-blue-700">Movies</Link> }
            {params.route == "search/tvshows" ? <Link href={`/search/tvshows?query=${params.query}&page=1`} className="p-2 bg-light-blue-900 text-sm border-white border-l border-r shadow-md">TV Shows</Link> : <Link href={`/search/tvshows?query=${params.query}&page=1`} className="p-2 bg-blue-500 text-sm border-white border-l border-r shadow-md hover:bg-light-blue-700">TV Shows</Link> }
            {params.route == "search/people" ? <Link href={`/search/people?query=${params.query}&page=1`} className="p-2 bg-light-blue-900 rounded-tr-md rounded-br-md text-sm shadow-md">People</Link> : <Link href={`/search/people?query=${params.query}&page=1`} className="p-2 bg-blue-500 rounded-tr-md rounded-br-md text-sm shadow-md hover:bg-light-blue-700">People</Link> }

            
            {/* <Link href={`/search/movies?query=${params.query}&page=1`} className="p-2 bg-blue-500 rounded-tl-lg rounded-bl-lg text-sm">Movies</Link> */}
            {/* <Link href={`/search/tvshows?query=${params.query}&page=1`} className="p-2 bg-blue-500 border-l border-r text-sm">TV Shows</Link> */}
            {/* <Link href={`/search/people?query=${params.query}&page=1`} className="p-2 bg-blue-500 rounded-tr-lg rounded-br-lg text-sm">People</Link> */}
        </div>
        </>
    );
}
