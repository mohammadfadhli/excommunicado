"use client";

import Image from "next/image";
import Link from "next/link";
import placeholderimage from "../assets/placeholderimage.png";
import Rating from "./Rating";

export default function MoviePage(params) {
    const movies = params.movies;

    function HasPicture(params) {
        if (params.moviesrc != null) {
            return (
                <Image
                    className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 overflow-hidden shadow-md"
                    src={"https://image.tmdb.org/t/p/w342" + params.moviesrc}
                    alt="nature image"
                    width={500}
                    height={500}
                />
            );
        } else {
            return (
                <Image
                    className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 shadow-md"
                    src={placeholderimage}
                    alt="nature image"
                    width={500}
                    height={500}
                />
            );
        }
    }

    if (movies.length == 0) {
        return (
            <>
                <div className="flex items-center justify-center">
                    <h1>No results found.</h1>
                </div>
            </>
        );
    }

    const movieCards = movies.map((movie) => (
        <Link href={"/movie/" + movie.id} className="contents">
            <div className="flex flex-col">
                <HasPicture moviesrc={movie.poster_path}></HasPicture>
                <div className="py-3">
                    <h1 className="text-sm font-semibold truncate">
                        {movie.title}
                    </h1>
                    <div className="flex justify-between mt-1">
                        <h1 className="text-sm font-semibold">
                            {/* {params.movieyear.slice(0, 4)} */}
                            {movie.release_date
                                ? movie.release_date.slice(0, 4)
                                : "Unknown"}
                        </h1>
                        <Rating rating={movie.vote_average}></Rating>
                    </div>
                </div>
            </div>
        </Link>

    ));

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                {movieCards}
            </div>
        </>
    );
}
