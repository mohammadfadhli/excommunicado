"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Spinner,
    Button,
    Carousel,
    Typography,
} from "@material-tailwind/react";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";
import placeholderimage from "../assets/placeholderimage.png";
import { movie_image_url } from "../tmdb_images/movieImage";
import FilterList from "./FilterList";
import { notFound } from "next/navigation";
import Rating from "./Rating";

export default function MoviePage(params) {
    const [movieData, setMovieData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const searchParams = useSearchParams();

    const page = searchParams.get("page");
    const genres = searchParams.get("genres");
    console.log(genres);

    useEffect(() => {
        fetch(`/api/${params.type}?page=${page}&genres=${genres}`)
            .then((res) => res.json())
            .then((data) => {
                setMovieData(data);
                setIsLoading(false);
            });
    }, []);

    function HasPicture(params) {
        //check if movie has image src, if not, return placeholder image
        if (params.moviesrc != null) {
            return (
                <Image
                    className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 shadow-md"
                    src={movie_image_url.medium + params.moviesrc}
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

    function MovieCards() {
        let movieCards = "";

        console.log("DDD: " + movieData.data.results);
        if (!movieData.data.results || page > movieData.data.total_pages) {
            // error handling
            notFound(); // show error page when conditions satisfied
        }

        movieCards = movieData.data.results.map((movie) => (
            <Link href={"/movie/" + movie.id} className="contents">
                <div className="flex flex-col">
                    <HasPicture moviesrc={movie.poster_path}></HasPicture>
                    <div className="py-3">
                        <h1 className="text-sm font-semibold truncate">
                            {movie.title}
                        </h1>
                        <div className="flex justify-between mt-1">
                            <h1 className="text-sm font-semibold">
                                {/* {movie.release_date.slice(0, 4)} */}
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

        if (movieCards != "") {
            // if filtered results not empty, return results
            return (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5">
                    {movieCards}
                </div>
            );
        } else {
            // if filtered results empty, return no result
            return <h1 className="text-center">Oops! No movies found.</h1>;
        }
    }

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner className="h-12 w-12 mx-auto mt-5" color="blue" />
            </div>
        ); // show spinner when component is loading
    if (!isLoading) {
        return (
            <div className="container mx-auto mt-5">
                <FilterList genres={genres} route={params.type}></FilterList>
                

                <h1 className="font-bold text-xl mt-5">
                    {params.type == "allmovies" ? "All movies" : "Upcoming movies"}
                    {/* {params.type} Movies */}
                </h1>
                <MovieCards></MovieCards>
                <Pagination
                    totalpages={movieData.data.total_pages}
                    currentpage={page}
                    route={params.type}
                    genres={genres}
                ></Pagination>
            </div>
        );
    }
}
