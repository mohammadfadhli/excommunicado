"use client";
import { Button } from "@material-tailwind/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function FavouriteTvButton(params) {
    const [tvinfav, setTvInFav] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(true);
    let userdocid = params.signedinuserdocid;
    let tvshowid = params.tvshowid;

    useEffect(() => {
        async function getData() {
            const docsSnap = await getDocs(
                collection(
                    db,
                    `users/${params.signedinuserdocid}/favourite_tv_shows`
                )
            );
            docsSnap.forEach((doc) => {
                if (doc.id == params.tvshowid) {
                    setTvInFav(true);
                }
            });

            setButtonLoading(false);
        }

        getData();
    }, []);

    async function addToFavourites(userdocid, tvshowid) {
        setTvInFav(true);
        await fetch(
            `../api/addtvshowtofavourites?userdocid=${userdocid}&tvshowid=${tvshowid}`
        )
            .then((res) => res.json())

            .then((data) => {
                console.log(data.result);
            });
    }

    async function removeFromFavourites(userdocid, tvshowid) {
        setTvInFav(false);
        await fetch(
            `../api/removetvshowfromfavourites?userdocid=${userdocid}&tvshowid=${tvshowid}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data.result);
            });
    }

    function CheckButton() {
        if (!buttonLoading) {
            if (tvinfav) {
                return (
                    <Button
                        color="red"
                        onClick={() => removeFromFavourites(userdocid, tvshowid)}
                    >
                        remove from favourites
                    </Button>
                );
            }

            return (
                <Button
                    color="green"
                    onClick={() => addToFavourites(userdocid, tvshowid)}
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
