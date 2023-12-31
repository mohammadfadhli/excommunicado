import Image from "next/image";
import placeholderimage from "../assets/placeholderimage.png";
import Link from "next/link";
import Rating from "./Rating";

export default function MovieGrid(params) {
    const movies = params.movies;

    function HasPicture(params) {
        if (params.moviesrc != null) {
            return (
                <div className="flex flex-col">
                    <Link
                        href={"/movie/" + params.movieid}
                        className="contents"
                    >
                        <Image
                            className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 overflow-hidden shadow-md"
                            src={
                                // "https://image.tmdb.org/t/p/w342" +
                                "https://image.tmdb.org/t/p/w500" +
                                params.moviesrc
                            }
                            alt="nature image"
                            width={500}
                            height={500}
                        />
                    </Link>
                    <div className="py-3">
                        <Link
                            href={"/movie/" + params.movieid}
                            className="hover:underline hover:text-blue-500"
                        >
                            <h1 className="text-sm font-semibold truncate">
                                {params.movietitle}
                            </h1>
                        </Link>
                        <div className="flex justify-between mt-1">
                            <h1 className="text-sm font-semibold">
                                {/* {params.movieyear.slice(0, 4)} */}
                                {params.movieyear
                                    ? params.movieyear.slice(0, 4)
                                    : "Unknown"}
                            </h1>
                            <Rating rating={params.vote_average}></Rating>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col">
                    <Link
                        href={"/movie/" + params.movieid}
                        className="contents"
                    >
                        <Image
                            className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 shadow-md"
                            src={placeholderimage}
                            alt="nature image"
                            width={500}
                            height={500}
                        />
                    </Link>
                    <div className="py-3">
                        <Link
                            href={"/movie/" + params.movieid}
                            className="hover:underline hover:text-blue-500"
                        >
                            <h1 className="text-sm font-semibold truncate">
                                {params.movietitle}
                            </h1>
                        </Link>
                        <div className="flex justify-between mt-1">
                            <h1 className="text-sm font-semibold">
                                {/* {params.movieyear.slice(0, 4)} */}
                                {params.movieyear
                                    ? params.movieyear.slice(0, 4)
                                    : "Unknown"}
                            </h1>
                            <Rating rating={params.vote_average}></Rating>
                        </div>
                    </div>
                </div>
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
        <HasPicture
            moviesrc={movie.poster_path}
            movieid={movie.id}
            movietitle={movie.title}
            movieyear={movie.release_date}
            vote_average={movie.vote_average}
        ></HasPicture>
    ));

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                {movieCards}
            </div>
        </>
    );
}
