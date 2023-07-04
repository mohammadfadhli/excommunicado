"use client";
import { Button, IconButton } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function DeleteMovieButton(params) {
    const movieid = params.movieid;
    const userdocid = params.userdocid;
    const router = useRouter();

    async function removeFromFavourites(userdocid, movieid) {
        fetch(
            `../api/removefromfavourites?userdocid=${userdocid}&movieid=${movieid}`
        )
        console.log("yes")
        // window.location.reload()
        router.refresh()
    }

    return (
        <IconButton
            onClick={() => removeFromFavourites(userdocid, movieid)}
            color="red"
            className="hover:bg-red-800"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </IconButton>
    );
}
