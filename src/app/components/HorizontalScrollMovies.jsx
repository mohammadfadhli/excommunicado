import Image from "next/image";
import Link from "next/link";
import { movie_image_url } from "../tmdb_images/movieImage.js";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Avatar,
} from "../materialui.jsx";
import placeholderimage from "../assets/placeholderimage.png";
import Rating from "./Rating.jsx";

async function getData(movietype) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movietype}?api_key=${process.env.TMDB_API_KEY}&region=${process.env.TMDB_REGION}`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function HorizontalScrollMovies(params) {
    const movies = await getData(params.movietype);

    function HasPicture(params) {
        if (params.moviesrc != null) {
            return (
                <Image
                    src={movie_image_url.small + params.moviesrc}
                    width={200}
                    height={300}
                    className="rounded-lg transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 w-full h-full object-cover shadow-md"
                    alt="movie poster"
                ></Image>
            );
        } else {
            return (
                <Image
                    src={placeholderimage}
                    width={200}
                    height={300}
                    className="rounded-lg transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 w-full h-full object-cover shadow-md"
                    alt="movie poster"
                ></Image>
            );
        }
    }

    // const moviesCards = movies.results.map((movie) => (
    //     <Link href={"/movies/" + movie.id} className="contents">

    //         <Image
    //             src={movie_image_url.small + movie.poster_path}
    //             width={200}
    //             height={300}
    //             className="rounded-lg transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100"
    //             style={{ objectFit: "cover", width: "200px" , height: "auto" }}
    //             alt="movie poster"
    //         ></Image>

    //     </Link>
    // ));

    const moviesCards = movies.results.map((movie) => (
        <Link href={"/movie/" + movie.id} className="contents">
            <div className="w-[200px]">
                <div className="m-0 h-[300px] w-[200px]">
                    <HasPicture moviesrc={movie.poster_path}></HasPicture>
                </div>
                <div className="m-0 py-3">
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

    function CheckPath() {
        if (params.movietype == "popular") {
            return (
                <>
                    <Link href={"/movies?page=1"}>
                        <h1 className="font-bold text-base underline hover:text-[#1e88e5]">
                            View all
                        </h1>
                    </Link>
                </>
            );
        }

        return (
            <Link href={"/" + params.movietype + "?page=1"}>
                <h1 className="font-bold text-base underline hover:text-[#1e88e5]">
                    View all
                </h1>
            </Link>
        );
    }

    return (
        <>
            <div className="container mx-auto flex justify-between mt-5">
                <h1 className="font-bold text-xl">
                    {params.movietype == "popular" ? "Popular" : "Upcoming"}{" "}
                    Movies
                    {/* {params.movietype} Movies */}
                </h1>
                <CheckPath></CheckPath>
            </div>

            <div className="flex flex-nowrap gap-5 py-3 overflow-x-scroll">
                {moviesCards}
            </div>
        </>
    );
}
