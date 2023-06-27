import Image from "next/image";
import placeholderimage from "../assets/placeholderimage.png";
import Link from "next/link";
import Rating from "./Rating";

export default function TvGrid(params) {
    const tvshows = params.tvshows;

    function HasPicture(params) {
        if (params.tvsrc != null) {
            return (
                <div className="flex flex-col">
                    <Link href={"/tvshow/" + params.tvid} className="contents">
                        <Image
                            className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 overflow-hidden shadow-md"
                            src={
                                "https://image.tmdb.org/t/p/w342" + params.tvsrc
                            }
                            alt="nature image"
                            width={500}
                            height={500}
                        />
                    </Link>
                    <div className="py-3">
                        <Link
                            href={"/tvshow/" + params.tvid}
                            className="hover:underline hover:text-blue-500"
                        >
                            <h1 className="text-sm font-semibold truncate">
                                {params.tvtitle}
                            </h1>
                        </Link>
                        <div className="flex justify-between mt-1">
                            <h1 className="text-sm font-semibold">
                                {/* {params.tvyear.slice(0, 4)} */}
                                {params.tvyear
                                    ? params.tvyear.slice(0, 4)
                                    : "Unknown"}
                            </h1>
                            <Rating rating={params.vote_average}></Rating>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col">
                    <Link href={"/tvshow/" + params.tvid} className="contents">
                        <Image
                            className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 shadow-md"
                            src={placeholderimage}
                            alt="nature image"
                            width={500}
                            height={500}
                        />
                    </Link>
                    <div className="py-3">
                        <Link
                            href={"/tvshow/" + params.tvid}
                            className="hover:underline hover:text-blue-500"
                        >
                            <h1 className="text-sm font-semibold truncate">
                                {params.tvtitle}
                            </h1>
                        </Link>
                        <div className="flex justify-between mt-1">
                            <h1 className="text-sm font-semibold">
                                {/* {params.tvyear.slice(0, 4)} */}
                                {params.tvyear
                                    ? params.tvyear.slice(0, 4)
                                    : "Unknown"}
                            </h1>
                            <Rating rating={params.vote_average}></Rating>
                        </div>
                    </div>
                </div>
            );
        }
    }

    if (tvshows.length == 0) {
        return (
            <>
                <div className="flex items-center justify-center">
                    <h1>No results found.</h1>
                </div>
            </>
        );
    }

    const tvCards = tvshows.map((tvshow) => (
        <HasPicture
            tvsrc={tvshow.poster_path}
            tvid={tvshow.id}
            tvtitle={tvshow.name}
            tvyear={tvshow.first_air_date}
            vote_average={tvshow.vote_average}
        ></HasPicture>
    ));

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                {tvCards}
            </div>
        </>
    );
}
