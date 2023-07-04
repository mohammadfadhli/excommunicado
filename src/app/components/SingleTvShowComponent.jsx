import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";

async function getData(tvshowid) {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tvshowid}?api_key=${process.env.TMDB_API_KEY}&append_to_response=release_dates`,
        { cache: "no-store" }
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function SingleTvShowComponent(params) {
    let alltvshows = [];

    for (let i = 0; i < params.favouritetvshows.length; i++) {
        const res = await getData(params.favouritetvshows[i]);
        alltvshows.push(res);
    }

    const allfavtvshows = alltvshows.map((tvshow) => (
        <div className="flex flex-col">
            <Link href={"/tvshow/" + tvshow.id} className="contents">
                <Image
                    className="h-full w-full rounded-xl object-cover shadow-md transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100"
                    src={"https://image.tmdb.org/t/p/w500" + tvshow.poster_path}
                    alt="nature image"
                    width={500}
                    height={500}
                />
            </Link>
            <div className="py-3">
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

    if(alltvshows.length > 0)
    {
        return <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
            {allfavtvshows}
        </div>
    }

    return <h4 className="mt-5 text-sm">You do not have any favourite TV shows. Add them <Link href="tvshows?page=1" className="text-blue-500 hover:underline">here.</Link></h4>
}
