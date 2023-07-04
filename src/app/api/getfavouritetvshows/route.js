import { db } from "@/app/firebase";
import {
    doc,
    setDoc,
    getDocs,
    collection
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { searchParams } = new URL(request.url);
    const userdocid = searchParams.get("userdocid");
    let favouritemovies = []
    
    try{
        const querySnapshot1 = await getDocs(
            collection(db, `users/${userdocid}/favourite_tv_shows`)
        );
        querySnapshot1.forEach((doc) => {
            favouritemovies.push(doc.id);
        });
    }
    catch(e){
        return NextResponse.json({"result" : "error"});
        
    }
        
    return NextResponse.json({"result" : favouritemovies});
}
