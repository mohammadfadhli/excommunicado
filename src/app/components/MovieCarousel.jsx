import { Carousel, Typography, Button } from "../materialui.jsx";
import Image from "next/image.js";
import Link from "next/link.js";

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
                        className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                        {movie.title}
                    </Typography>
                    <div className="flex justify-center gap-2">
                        <Link href={"/movie/" + movie.id}>
                        <Button color="white" className="">
                            See More
                        </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <>
            <Carousel className="rounded-xl mt-5">{carouselDiv}</Carousel>
        </>
    );
}
