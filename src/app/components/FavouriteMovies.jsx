import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";
import SingleMovieComponent from "./SingleMovieComponent";
import Link from "next/link";

export default async function FavouriteMovies(params) {
    let favouritemovies = [];
    const querySnapshot1 = await getDocs(
        collection(db, `users/${params.userdocid}/favourite_movies`)
    );
    querySnapshot1.forEach((doc) => {
        favouritemovies.push(doc.id);
    });

    const favmovies = favouritemovies.map((movie) => (
        <SingleMovieComponent movieid={movie}></SingleMovieComponent>
    ));

    return (
        <>
            <h1 className="mt-5">My Favourite Movies</h1>
            {favouritemovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                    {favmovies}
                </div>
            ) : (
                <h4 className="mt-5 text-sm">You do not have any favourite movies. Add them <Link href="movies?page=1" className="text-blue-500 hover:underline">here.</Link></h4>
            )}
        </>
    );
}
