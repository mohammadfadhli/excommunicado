import { db } from "@/app/firebase";
import {
    deleteDoc,
    doc
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
        await deleteDoc(docRef).then((res) => {
            return "deleted"
        })
    }
    catch(e){
        return NextResponse.json({"result" : "error"});
    }

    return NextResponse.json({"result" : "removed"});
}
