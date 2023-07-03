
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";
import SingleTvShowComponent from "./SingleTvShowComponent";

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
            <h1 className="mt-5">Your Favourite Tv Shows</h1>
            {favouritetvshows.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                    {favtvshows}
                </div>
            ) : (
                <h1 className="mt-5">You do not have any favourite tv shows.</h1>
            )}
        </>
    );
}
