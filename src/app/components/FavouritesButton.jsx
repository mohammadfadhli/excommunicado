"use client";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

export default function FavouritesButton(params) {
    const router = useRouter();

    function addToFavourites() {
        if (!params.sesh) {
            router.push("/signin"); // if not logged in, redirect to signin page
        }
    }

    return (
        <>
            <Button color="green" onClick={() => addToFavourites()}>
                Add to Favourites
            </Button>
        </>
    );
}
