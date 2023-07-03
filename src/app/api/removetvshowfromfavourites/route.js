import { db } from "@/app/firebase";
import {
    deleteDoc,
    doc
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { searchParams } = new URL(request.url);
    const userdocid = searchParams.get("userdocid");
    const tvshowid = searchParams.get("tvshowid");

    const docRef = doc(
        db,
        "users",
        userdocid,
        "favourite_tv_shows",
        tvshowid.toString()
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
