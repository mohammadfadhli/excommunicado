import Image from "next/image";
import Link from "next/link";
import placeholderimage from "../assets/placeholderimage.png";
import { movie_image_url } from "../tmdb_images/movieImage.js";
import Rating from "./Rating.jsx";

async function getData(type) {
    let res = "";

    if (type == "upcoming") {
        const d = new Date();

        const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const todaysdate = date.toISOString().split("T")[0];

        const max_date = "2023-07-30";
        const min_date = todaysdate;
        res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}&sort_by=primary_release_date.asc&with_release_type=3&api_key=${process.env.TMDB_API_KEY}&page=1&region=${process.env.TMDB_REGION}`
        );
    } else {
        // res = await fetch(
        //     `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.TMDB_API_KEY}&region=${process.env.TMDB_REGION}`
        // );
        res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.TMDB_API_KEY}&region=${process.env.TMDB_REGION}&page=1`
        );
    }

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getTvData(type) {
    const res = await fetch(
        `https://api.themoviedb.org/3/${type}/tv/week?api_key=${process.env.TMDB_API_KEY}&region=${process.env.TMDB_REGION}`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function HorizontalScrollMovies(params) {
    let movies = "";
    let showcards = "";
    let res = "";

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

    if (params.req == "movies") {
        res = await getData(params.type);

        showcards = res.results.map((movie) => (
            <div className="w-[150px] md:w-[200px]">
                <div className="m-0 w-[150px] h-[220px] md:h-[300px] md:w-[200px] relative">
                    <Link href={"/movie/" + movie.id} className="contents">
                        <HasPicture moviesrc={movie.poster_path}></HasPicture>
                    </Link>
                    {/* <div className="absolute top-0 right-0">
                        <button id={movie.id} value={movie.id}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="red"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                            </svg>
                        </button>
                    </div> */}
                </div>

                <div className="m-0 py-3">
                    <Link
                        href={"/movie/" + movie.id}
                        className="hover:underline hover:text-blue-500"
                    >
                        <h1 className="text-sm font-semibold truncate">
                            {movie.title}
                        </h1>
                    </Link>
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
        ));
    } else {
        res = await getTvData(params.type);

        showcards = res.results.map((tvshow) => (
            <div className="w-[150px] md:w-[200px]">
                <div className="m-0 w-[150px] h-[220px] md:h-[300px] md:w-[200px]">
                    <Link href={"/tvshow/" + tvshow.id} className="contents">
                        <HasPicture moviesrc={tvshow.poster_path}></HasPicture>
                    </Link>
                </div>
                <div className="m-0 py-3">
                    <Link
                        href={"/tvshow/" + tvshow.id}
                        className="hover:underline hover:text-blue-500"
                    >
                        <h1 className="text-sm font-semibold truncate">
                            {tvshow.name}
                        </h1>
                    </Link>
                    <div className="flex justify-between mt-1">
                        <h1 className="text-sm font-semibold">
                            {/* {params.movieyear.slice(0, 4)} */}
                            {tvshow.first_air_date
                                ? tvshow.first_air_date.slice(0, 4)
                                : "Unknown"}
                        </h1>
                        <Rating rating={tvshow.vote_average}></Rating>
                    </div>
                </div>
            </div>
        ));
    }

    function CheckPath() {
        if (params.type == "popular") {
            return (
                <>
                    <Link
                        href={"/movies?page=1"}
                        className="font-bold text-sm underline hover:text-blue-500"
                    >
                        View all
                    </Link>
                </>
            );
        }

        if (params.type == "upcoming") {
            return (
                <Link
                    href={"/" + params.type + "?page=1"}
                    className="font-bold text-sm underline hover:text-blue-500"
                >
                    View all
                </Link>
            );
        }

        return (
            <Link
                href={"/" + "tvshows" + "?page=1"}
                className="font-bold text-sm underline hover:text-blue-500"
            >
                View all
            </Link>
        );
    }

    return (
        <>
            <div className="my-5 w-full">
                <section className="flex justify-between">
                    <h2 className="font-bold text-base">
                        {params.type == "popular" ? "Popular" : ""}{" "}
                        {params.type == "upcoming" ? "Upcoming" : ""}{" "}
                        {params.type == "trending" ? "Trending" : ""}{" "}
                        {params.req == "movies" ? "Movies" : "TV Shows"}
                    </h2>
                    <CheckPath></CheckPath>
                </section>

                <div className="flex flex-nowrap gap-5 pt-3 overflow-x-scroll">
                    {showcards}
                </div>
            </div>
        </>
    );
}
