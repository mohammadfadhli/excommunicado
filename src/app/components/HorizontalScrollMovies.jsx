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
                    <div className="absolute top-0 right-0">
                        <form>
                            <input
                                type="checkbox"
                                id={movie.id}
                                name={movie.id}
                                value={movie.id}
                            />
                        </form>
                    </div>
                </div>

                <div className="m-0 py-3">
                    <Link
                        href={"/movie/" + movie.id}
                        className="hover:text-blue-500"
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
                        className="hover:text-blue-500"
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
