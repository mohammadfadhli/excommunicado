"use client"
import Link from "next/link";
import Image from "next/image";
import Rating from "./Rating";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";

export default function SingleMovieComponent(params) {
    const [moviedata, setMovieData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        async function getData(){
            await fetch(`../api/movie/${params.movieid}`).then((res) => res.json())
            .then((data) => {
              setMovieData(data.data)
              setIsLoading(false)
            })
        }
        getData()
    }, [])

    if(!isLoading)
    {
        return (
            <>
                <div className="flex flex-col">
                    <Link href={"/movie/" + moviedata.id} className="contents">
                        <Image
                            className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 shadow-md"
                            src={
                                "https://image.tmdb.org/t/p/w500" +
                                moviedata.poster_path
                            }
                            alt="nature image"
                            width={500}
                            height={500}
                        />
                    </Link>
                    <div className="py-3">
                        <Link
                            href={"/movie/" + moviedata.id}
                            className="hover:underline hover:text-blue-500"
                        >
                            <h1 className="text-sm font-semibold truncate">
                                {moviedata.title}
                            </h1>
                        </Link>
                        <div className="flex justify-between mt-1">
                            <h1 className="text-sm font-semibold">
                                {/* {params.movieyear.slice(0, 4)} */}
                                {moviedata.release_date
                                    ? moviedata.release_date.slice(0, 4)
                                    : "Unknown"}
                            </h1>
                            <Rating rating={moviedata.vote_average}></Rating>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    
}
