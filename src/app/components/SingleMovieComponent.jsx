import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import placeholderimage from "../assets/placeholderimage.png";

async function getData(movieid) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieid}?api_key=${process.env.TMDB_API_KEY}&append_to_response=release_dates`,
        { cache: "no-store" }
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function SingleMovieComponent(params) {
    let allmovies = [];

    for (let i = 0; i < params.favouritemovies.length; i++) {
        const res = await getData(params.favouritemovies[i]);
        allmovies.push(res);
    }

    function HasPicture(params) {
        if (params.mediasrc != null) {
            return (
                <Image
                    className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 overflow-hidden shadow-md"
                    src={"https://image.tmdb.org/t/p/w342" + params.mediasrc}
                    alt="nature image"
                    width={500}
                    height={500}
                />
            );
        } else {
            return (
                <Image
                    className="h-full w-full min-h-[254px] rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 shadow-md"
                    src={placeholderimage}
                    alt="nature image"
                    width={500}
                    height={500}
                />
            );
        }
    }

    const allfavmovies = allmovies.map((movie) => (
        <div className="flex flex-col">
            <Link href={"/movie/" + movie.id} className="contents">
                <HasPicture mediasrc={movie.poster_path}></HasPicture>
            </Link>
            <div className="py-3">
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

    if (allmovies.length > 0) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                {allfavmovies}
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
