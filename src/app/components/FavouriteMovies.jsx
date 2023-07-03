"use client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import SingleMovieComponent from "./SingleMovieComponent";
import { useEffect, useState } from "react";

export default function FavouriteMovies(params) {
    const [favouritemovies, setFavouriteMovies] = useState([]);

    useEffect(() => {
        async function getData() {
            let favouritemovies = [];
            const querySnapshot1 = await getDocs(
                collection(db, `users/${params.userdocid}/favourite_movies`)
            );
            querySnapshot1.forEach((doc) => {
                favouritemovies.push(doc.id);
            });
            setFavouriteMovies(favouritemovies);
        }
        getData();
    }, []);

    const favmovies = favouritemovies.map((movie) => (
        <SingleMovieComponent movieid={movie}></SingleMovieComponent>
    ));

    return (
        <>
            <h1 className="mt-5">Your Favourite Movies</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                {favmovies}
            </div>
        </>
    );
}
