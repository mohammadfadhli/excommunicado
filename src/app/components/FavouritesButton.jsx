"use client";
import { Button } from "@material-tailwind/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function FavouritesButton(params) {
    const [movieinfav, setMovieInFav] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(true);
    let userdocid = params.signedinuserdocid;
    let movieid = params.movieid;

    useEffect(() => {
        async function getData() {
            const docsSnap = await getDocs(
                collection(
                    db,
                    `users/${params.signedinuserdocid}/favourite_movies`
                )
            );
            docsSnap.forEach((doc) => {
                if (doc.id == params.movieid) {
                    setMovieInFav(true);
                }
            });

            setButtonLoading(false);
        }

        getData();
    }, []);

    async function addToFavourites(userdocid, movieid) {
        setMovieInFav(true);
        await fetch(
            `../api/addtofavourites?userdocid=${userdocid}&movieid=${movieid}`
        )
            .then((res) => res.json())

            .then((data) => {
                console.log(data.result);
            });
    }

    async function removeFromFavourites(userdocid, movieid) {
        setMovieInFav(false);
        await fetch(
            `../api/removefromfavourites?userdocid=${userdocid}&movieid=${movieid}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data.result);
            });
    }

    function CheckButton() {
        if (!buttonLoading) {
            if (movieinfav) {
                return (
                    <Button
                        color="red"
                        onClick={() => removeFromFavourites(userdocid, movieid)}
                    >
                        remove from favourites
                    </Button>
                );
            }

            return (
                <Button
                    color="green"
                    onClick={() => addToFavourites(userdocid, movieid)}
                >
                    Add to favourites
                </Button>
            );
        }
    }

    return (
        <>
            <CheckButton></CheckButton>
        </>
    );
}
