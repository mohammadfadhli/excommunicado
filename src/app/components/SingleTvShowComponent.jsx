import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";

async function getData(tvshowid) {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tvshowid}?api_key=${process.env.TMDB_API_KEY}&append_to_response=release_dates`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function SingleTvShowComponent(params) {

    const res = await getData(params.tvshowid)

    return (
        <>
            <div className="flex flex-col">
                <Link href={"/tvshow/" + res.id} className="contents">
                    <Image
                        className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 shadow-md"
                        src={
                            "https://image.tmdb.org/t/p/w500" +
                            res.poster_path
                        }
                        alt="nature image"
                        width={500}
                        height={500}
                    />
                </Link>
                <div className="py-3">
                    <Link
                        href={"/tvshow/" + res.id}
                        className="hover:underline hover:text-blue-500"
                    >
                        <h1 className="text-sm font-semibold truncate">
                            {res.name}
                        </h1>
                    </Link>
                    <div className="flex justify-between mt-1">
                        <h1 className="text-sm font-semibold">
                            {/* {params.movieyear.slice(0, 4)} */}
                            {res.first_air_date
                                ? res.first_air_date.slice(0, 4)
                                : "Unknown"}
                        </h1>
                        <Rating rating={res.vote_average}></Rating>
                    </div>
                </div>
            </div>
        </>
    );

}
