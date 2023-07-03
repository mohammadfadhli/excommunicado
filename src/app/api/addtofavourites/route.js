import { db } from "@/app/firebase";
import {
    doc,
    setDoc
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { searchParams } = new URL(request.url);
    const userdocid = searchParams.get("userdocid");
    const movieid = searchParams.get("movieid");

    const docRef = doc(
        db,
        "users",
        userdocid,
        "favourite_movies",
        movieid.toString()
    );

    try{
        await setDoc(docRef, {
            movie_id: movieid,
        })
    
    }
    catch(e){
        return NextResponse.json({"result" : "error"});
        
    }
    
    return NextResponse.json({"result" : "added"});
}
