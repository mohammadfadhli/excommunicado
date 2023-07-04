import Link from "next/link.js";
import { Typography } from "../materialui.jsx";
import CarouselComponent from "./CarouselComponent.jsx";

async function getData() {
    const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function MovieCarousel() {
    const movies = await getData();

    const carouselDiv = movies.results.slice(0, 5).map((movie) => (
        <Link href={"/movie/" + movie.id}>
        <div className="relative">
            {/* <img
                className="max-h-[500px] max-w-full h-auto w-full object-cover relative"
                src={
                    "https://image.tmdb.org/t/p/original" + movie.backdrop_path
                }
                alt="nature image"
                height="500"
            /> */}
            <img
                className="sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover relative w-full" // to reserve correct space
                src={
                    "https://image.tmdb.org/t/p/original" + movie.backdrop_path
                }
                alt="nature image"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
                <div className="w-3/4 text-center md:w-2/4">
                    <Typography
                        variant="h1"
                        color="white"
                        className="text-2xl md:text-4xl lg:text-5xl"
                    >
                        {movie.title}
                    </Typography>
                    {/* <div className="flex justify-center gap-2">
                        <div className="bg-white p-3 rounded-lg">
                            <div className="flex gap-1 content-center text-base">
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
                                <p className="font-bold">
                                    {movie.vote_average.toFixed(1)}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={"/movie/" + movie.id}
                            className="bg-white p-3 rounded-lg text-base"
                        >
                            <p className="font-bold">More</p>
                        </Link>
                    </div> */}
                </div>
            </div>
        </div>
        </Link>
    ));

    return (
        <>
            {/* <Carousel className="rounded-xl mt-5">{carouselDiv}</Carousel> */}
            <CarouselComponent items={carouselDiv}></CarouselComponent>
        </>
    );
}
