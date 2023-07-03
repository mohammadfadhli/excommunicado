
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";
import SingleTvShowComponent from "./SingleTvShowComponent";
import Link from "next/link";

export default async function FavouriteTvShows(params) {


    let favouritetvshows = [];
    const querySnapshot1 = await getDocs(
        collection(db, `users/${params.userdocid}/favourite_tv_shows`)
    );
    querySnapshot1.forEach((doc) => {
        favouritetvshows.push(doc.id);
    });

    const favtvshows = favouritetvshows.map((tvshow) => (
        <SingleTvShowComponent tvshowid={tvshow}></SingleTvShowComponent>
    ));

    return (
        <>
            <h1 className="mt-5">My Favourite TV Shows</h1>
            {favouritetvshows.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                    {favtvshows}
                </div>
            ) : (
                <h1 className="mt-5 text-sm">You do not have any favourite TV shows. Add them <Link href="tvshows?page=1" className="text-blue-500 hover:underline">here.</Link></h1>
            )}
        </>
    );
}
