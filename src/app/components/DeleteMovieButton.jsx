"use client"
import { Button } from "@material-tailwind/react";

export default function DeleteMovieButton(params){

    const movieid = params.movieid;

    function checkMovieId(e){
        console.log(e)
    }

    return <button onClick={() => checkMovieId(movieid)} className="text-sm font-semibold truncate bg-red-700 rounded-lg p-2 mt-3">Remove From Favourites</button>

}