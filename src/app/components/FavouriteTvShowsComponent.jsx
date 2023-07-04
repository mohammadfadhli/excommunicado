"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Rating from "./Rating";
import { Button, Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function FavouriteTvShowsComponent(params) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDelete, setIsDelete] = useState();

    useEffect(() => {
        async function getData(favouritetvshows) {
            let favtvshows = [];
            await fetch(
                `../api/getfavouritetvshows?userdocid=${params.userdocid}`
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    favtvshows = data.result;
                });

            console.log(favtvshows);

            let tvshowsres = [];
            for (let i = 0; i < favtvshows.length; i++) {
                await fetch(`../api/tvshow/${favtvshows[i]}`)
                    .then((res) => res.json())
                    .then((data) => {
                        tvshowsres.push(data);
                    });
            }
            setData(tvshowsres);
            setIsLoading(false);
            setIsDelete(false);
        }

        getData(params.favouritetvshows);
    }, [isDelete]);

    useEffect(() => {}, [isDelete]);

    async function removeFromFavourites(userdocid, tvshowid) {
        setIsDelete(true);
        fetch(
            `../api/removetvshowfromfavourites?userdocid=${userdocid}&tvshowid=${tvshowid}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data.result);
            });
    }

    if (!isLoading) {
        console.log(data);
        const res = data.map((tvshow) => (
            <div className="flex flex-col">
                    <Link href={"/tvshow/" + tvshow.data.id} className="contents">
                        <Image
                            className="h-full w-full rounded-xl object-cover shadow-md transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100"
                            src={
                                "https://image.tmdb.org/t/p/w500" +
                                tvshow.data.poster_path
                            }
                            alt="nature image"
                            width={500}
                            height={500}
                        />
                    </Link>
                <div className="py-3">
                    <Link
                        href={"/tvshow/" + tvshow.data.id}
                        className="hover:underline hover:text-blue-500"
                    >
                        <h1 className="text-sm font-semibold truncate">
                            {tvshow.data.name}
                        </h1>
                    </Link>
                    <div className="flex justify-between mt-1">
                        <h1 className="text-sm font-semibold">
                            {/* {params.movieyear.slice(0, 4)} */}
                            {tvshow.data.first_air_date
                                ? tvshow.data.first_air_date.slice(0, 4)
                                : "Unknown"}
                        </h1>
                        <Rating rating={tvshow.data.vote_average}></Rating>
                    </div>
                </div>
                <div>
                <Button
                            color="red"
                            onClick={() =>
                                removeFromFavourites(
                                    params.userdocid,
                                    tvshow.data.id
                                )
                            }
                            fullWidth
                        >
                            Remove
                        </Button>
                </div>
            </div>
        ));

        if (data.length > 0) {
            return (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                    {res}
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

    return (
            <h4 className="text-sm mt-5">Loading TV Shows...</h4>
    );
}
