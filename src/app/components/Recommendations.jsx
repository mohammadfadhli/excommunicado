import Link from "next/link";
import Rating from "./Rating.jsx";
import Image from "next/image";
import { movie_image_url } from "../tmdb_images/movieImage";
import placeholderimage from "../assets/placeholderimage.png";

async function getMovieData(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getTvData(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Recommendations(params) {

    let res = ""
    let showcards = ""

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

    if(params.req == "movie")
    {
        res = await getMovieData(params.id)

        showcards = res.results.map((movie) => (
            
                <div className="w-[150px] md:w-[200px]">
                    <div className="m-0 w-[150px] h-[220px] md:h-[300px] md:w-[200px]">
                    <Link href={"/movie/" + movie.id} className="contents">
                        <HasPicture moviesrc={movie.poster_path}></HasPicture>
                        </Link>
                    </div>
                    <div className="m-0 py-3">
                    <Link href={"/movie/" + movie.id} className="hover:underline hover:text-blue-500">
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
    }
    else
    {
        res = await getTvData(params.id)

        showcards = res.results.map((tvshow) => (
            
                <div className="w-[150px] md:w-[200px]">
                    <div className="m-0 w-[150px] h-[220px] md:h-[300px] md:w-[200px]">
                    <Link href={"/tvshow/" + tvshow.id} className="contents">
                        <HasPicture moviesrc={tvshow.poster_path}></HasPicture>
                        </Link>
                    </div>
                    <div className="m-0 py-3">
                    <Link href={"/tvshow/" + tvshow.id} className="hover:underline hover:text-blue-500">
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


    if (showcards != "") {
        return (
            <>
                <div className="my-5">
                    <div className="container mx-auto flex justify-between">
                        <h1 className="font-bold">You May Also Like</h1>
                    </div>

                    <div className="flex flex-nowrap gap-5 pt-3 overflow-x-scroll">
                        {showcards}
                    </div>
                </div>
            </>
        );
    }
}
