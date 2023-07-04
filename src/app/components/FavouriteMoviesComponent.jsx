"use client";
import { Button, Spinner, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Rating from "./Rating";

export default function FavouriteMoviesComponent(params) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDelete, setIsDelete] = useState();

    useEffect(() => {
        async function getData() {
            let favmovies = [];
            await fetch(
                `../api/getfavouritemovies?userdocid=${params.userdocid}`
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    favmovies = data.result;
                });

            console.log(favmovies);

            let moviesres = [];
            for (let i = 0; i < favmovies.length; i++) {
                await fetch(`../api/movie/${favmovies[i]}`)
                    .then((res) => res.json())
                    .then((data) => {
                        moviesres.push(data);
                    });
            }
            setData(moviesres);
            setIsLoading(false);
            setIsDelete(false);
        }

        getData(params.favouritemovies);
    }, [isDelete]);

    useEffect(() => {}, [isDelete]);

    async function removeFromFavourites(userdocid, movieid) {
        setIsDelete(true);
        fetch(
            `../api/removefromfavourites?userdocid=${userdocid}&movieid=${movieid}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data.result);
            });
    }

    if (!isLoading) {
        console.log(data);
        const res = data.map((movie) => (
            <div className="flex flex-col">
                <div className="transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100">
                    <Link href={"/movie/" + movie.data.id} className="contents">
                        <Image
                            className="h-full w-full rounded-xl object-cover shadow-md"
                            src={
                                "https://image.tmdb.org/t/p/w500" +
                                movie.data.poster_path
                            }
                            alt="nature image"
                            width={500}
                            height={500}
                        />
                    </Link>
                </div>
                <div className="py-3">
                    <Link
                        href={"/movie/" + movie.data.id}
                        className="hover:underline hover:text-blue-500"
                    >
                        <h1 className="text-sm font-semibold truncate">
                            {movie.data.title}
                        </h1>
                    </Link>
                    <div className="flex justify-between mt-1">
                        <h1 className="text-sm font-semibold">
                            {/* {params.movieyear.slice(0, 4)} */}
                            {movie.data.release_date
                                ? movie.data.release_date.slice(0, 4)
                                : "Unknown"}
                        </h1>
                        <Rating rating={movie.data.vote_average}></Rating>
                    </div>
                </div>
                <div>
                <Button
                            color="red"
                            onClick={() =>
                                removeFromFavourites(
                                    params.userdocid,
                                    movie.data.id
                                )
                            }
                            fullWidth
                        >
                            Remove
                        </Button>
                </div>
            </div>
        ));

        if (data.length > 0) {
            return (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                    {res}
                </div>
            );
        }

        return (
            <h4 className="mt-5 text-sm">
                You do not have any favourite movies. Add them{" "}
                <Link
                    href="movies?page=1"
                    className="text-blue-500 hover:underline"
                >
                    here.
                </Link>
            </h4>
        );
    }

    return (
            <h4 className="text-sm mt-5">Loading Movies...</h4>
    );
}


