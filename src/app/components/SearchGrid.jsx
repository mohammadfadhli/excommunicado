

import Image from "next/image";
import placeholderimage from "../assets/placeholderimage.png";
import Link from "next/link";
import Rating from "./Rating";

export default function SearchGrid(params) {
    const media = params.media;
    const mediatype = params.type;

    console.log(mediatype)

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

    function CheckType(params) {
        if (params.ctype == "movies") {
            return (
                <>
                    <Link
                        href={"/movie/" + params.media.id}
                        className="contents"
                    >
                        <div className="flex flex-col">
                            <HasPicture
                                mediasrc={params.media.poster_path}
                            ></HasPicture>
                            <div className="py-3">
                                <h1 className="text-sm font-semibold truncate">
                                    {params.media.title}
                                </h1>
                                <div className="flex justify-between mt-1">
                                    <h1 className="text-sm font-semibold">
                                        {/* {params.movieyear.slice(0, 4)} */}
                                        {params.media.release_date
                                            ? params.media.release_date.slice(
                                                  0,
                                                  4
                                              )
                                            : "Unknown"}
                                    </h1>
                                    <Rating
                                        rating={params.media.vote_average}
                                    ></Rating>
                                </div>
                            </div>
                        </div>
                    </Link>
                </>
            );
        }
        else if(params.ctype == "tvshows")
        {
            return (
                <>
                    <Link
                        href={"/tvshow/" + params.media.id}
                        className="contents"
                    >
                        <div className="flex flex-col">
                            <HasPicture
                                mediasrc={params.media.poster_path}
                            ></HasPicture>
                            <div className="py-3">
                                <h1 className="text-sm font-semibold truncate">
                                    {params.media.name}
                                </h1>
                                <div className="flex justify-between mt-1">
                                    <h1 className="text-sm font-semibold">
                                        {/* {params.movieyear.slice(0, 4)} */}
                                        {params.media.release_date
                                            ? params.media.release_date.slice(
                                                  0,
                                                  4
                                              )
                                            : "Unknown"}
                                    </h1>
                                    <Rating
                                        rating={params.media.vote_average}
                                    ></Rating>
                                </div>
                            </div>
                        </div>
                    </Link>
                </>
            );
        }
        else if(params.ctype == "people")
        {
            return (
                <>
                    <Link
                        href={"/person/" + params.media.id}
                        className="contents"
                    >
                        <div className="flex flex-col">
                            <HasPicture
                                mediasrc={params.media.profile_path}
                            ></HasPicture>
                            <div className="py-3">
                                <h1 className="text-sm font-semibold truncate">
                                    {params.media.name}
                                </h1>
                                <div className="flex justify-between mt-1">
                                    <Rating
                                        rating={params.media.popularity}
                                    ></Rating>
                                </div>
                            </div>
                        </div>
                    </Link>
                </>
            );
        }
    }

    if (media.length == 0) {
        return (
            <>
                <div className="flex items-center justify-center">
                    <h1>No results found.</h1>
                </div>
            </>
        );
    }

    const mediaCards = media.map((movie) => (
        <CheckType media={movie} ctype={mediatype}></CheckType>
    ));

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                {mediaCards}
            </div>
        </>
    );
}
