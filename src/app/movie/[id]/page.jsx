import Image from "next/image";
import Cast from "@/app/components/Cast.jsx";
import { movie_image_url } from "@/app/tmdb_images/movieImage.js";
import Link from "next/link.js";
import { Button } from "../../materialui.jsx";
import DateFormat from "@/app/helper/DateFormat.jsx";
import placeholderimage from "../../assets/placeholderimage.png";
import VideoGallery from "@/app/components/VideoGallery.jsx";
import Recommendations from "@/app/components/Recommendations.jsx";
import PhotoGallery from "@/app/components/PhotoGallery.jsx";
import Crew from "@/app/components/Crew.jsx";

async function getData(movieid) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieid}?api_key=${process.env.TMDB_API_KEY}&append_to_response=release_dates`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getCredits(movieid) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=${process.env.TMDB_API_KEY}`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

function toHoursAndMinutes(totalMinutes) {

    if(totalMinutes != "")
    {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
    
        return `${hours}h ${minutes}m`;
    }

    return "Unknown"
    
}

function getRating(rating) {
    if (rating != "") {
        return rating.toFixed(1);
    } else {
        return "No Rating";
    }
}

export default async function Page({ params }) {
    const movie = await getData(params.id);
    const credits = await getCredits(params.id);

    function HasPicture(params) {
        if (params.moviesrc != null) {
            return (
                <Image
                    src={movie_image_url.large + movie.poster_path}
                    className="max-w-full md:w-[300px] sm:max-w-full md:h-full sm:max-h-full w-full h-auto rounded-lg object-cover"
                    width={500}
                    height={500}
                ></Image>
            );
        }

        return (
            <Image
                src={placeholderimage}
                className="max-w-full md:w-[300px] sm:max-w-full md:h-full sm:max-h-full w-full h-auto rounded-lg object-cover"
            ></Image>
        );
    }

    return (
        <>
            <figure
                className=""
                style={{ position: "relative", width: "100%", height: 500 }}
            >
                <Image
                    src={
                        "https://image.tmdb.org/t/p/original" +
                        movie.backdrop_path
                    }
                    fill={true}
                    className="object-cover object-top"
                ></Image>
                <figcaption className="absolute inset-0 grid h-full w-full place-items-center bg-black/75 p-3">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl text-white">
                            {movie.title}
                        </h1>
                        <h1 className="text-xl md:text-2xl lg:text-3xl text-white mt-3">
                            {movie.tagline}
                        </h1>
                    </div>
                </figcaption>
            </figure>

            <div className="container max-w-[1024px] mx-auto p-3">
                <topcard className="flex flex-col md:flex-row mt-5">
                    <div className="shrink-0">
                        <HasPicture moviesrc={movie.poster_path}></HasPicture>
                    </div>
                    <div className="flex-auto pt-3 md:p-5">
                        <div className="flex flex-col w-full h-full">
                            {/* <h1 className="font-semibold bg-red">
                                Rating: {getRating(movie.vote_average)}
                            </h1> */}
                            <div className="flex gap-1">
                                <h1>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="orange"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </h1>
                                <h1 className="font-bold">{getRating(movie.vote_average)}</h1>
                            </div>

                            <h1 className="font-bold mt-3">
                                Runtime: <span className="font-semibold">{toHoursAndMinutes(movie.runtime)}</span>
                            </h1>
                            <h1 className="font-bold mt-3">
                                Release Date:{" "}
                                <span className="font-semibold">
                                <DateFormat
                                    release_date={movie.release_date}
                                ></DateFormat>
                                </span>
                            </h1>
                            <div className="flex gap-3 mt-3">
                                {movie.genres != "" ? movie.genres.slice(0, 3).map((genre) => (
                                    <div className="bg-blue-700 p-2 rounded-lg text-white text-sm">
                                        {genre.name}
                                    </div>
                                )) : "No Genres"}
                            </div>
                            {movie.homepage ? (
                                <>
                                    <Link
                                        href={movie.homepage}
                                        className="mt-3 hover:text-blue-900"
                                    >
                                        <Button color="green">
                                            Visit Homepage
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <p className="mt-3">No Website</p>
                                </>
                            )}
                            <h1 className="font-bold mt-3">Overview</h1>
                            <p className="mt-3 grow text-ellipsis text-base">
                                {movie.overview != "" ? movie.overview : "No Overview."}
                            </p>
                        </div>
                    </div>
                </topcard>

                <Crew movieid={movie.id} credits={credits.crew}></Crew>

                <Cast movieid={movie.id} credits={credits.cast}></Cast>

                <VideoGallery movieid={movie.id}></VideoGallery>

                <PhotoGallery movieid={movie.id} type="backdrops"></PhotoGallery>

                <PhotoGallery movieid={movie.id} type="posters"></PhotoGallery>

                <Recommendations movieid={movie.id}></Recommendations>
            </div>
        </>
    );
}
