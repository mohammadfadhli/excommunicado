"use client";
import { Button } from "@material-tailwind/react";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
    where
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "../firebase";

export default async function FavouritesButton(params) {

    const router = useRouter();

    // const useremail = params.sesh.user.email;
    let useremail = ""
    let userdocid = "";

    if(params.sesh)
    {
        const q = query(
            collection(db, "users"),
            where("email", "==", useremail)
        );
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            userdocid = doc.id;
        });
    }
    


    async function addToFavourites() {
        if (!params.sesh) {
            router.push("/signin");
        } else {
           
            const docRef = doc(
                db,
                "users",
                userdocid,
                "favourite_movies",
                params.movieid.toString()
            );
            await setDoc(docRef, {
                movie_id: params.movieid,
            });

            router.refresh(); // to update server component page after client component state update

        }
    }

    async function removeFromFavourites() {
        if (!params.sesh) {
            router.push("/signin");
        } else {
           
            const docRef = doc(
                db,
                "users",
                userdocid,
                "favourite_movies",
                params.movieid.toString()
            );
            await deleteDoc(docRef);

            router.refresh(); // to update server component page after client component state update

        }
    }

    async function CheckButton(params) {
        let movieinfavourites = false;

        if(params.userdocid)
        {
            const docsSnap = await getDocs(
                collection(db, `users/${params.userdocid}/favourite_movies`)
            );
            docsSnap.forEach((doc) => {
                if (doc.id == params.movieid) {
                    movieinfavourites = true;
                }
            });
        }

        

        if (movieinfavourites) {
            return (
                <Button color="red" onClick={() => removeFromFavourites()}> 
                    Remove from Favourites
                </Button>
            );
        }

        return (
            <Button color="green" onClick={() => addToFavourites()}>
                Add to Favourites
            </Button>
        );
    }

    return (
        <>
            <CheckButton
                movieid={params.movieid}
                userdocid={userdocid}
            ></CheckButton>
        </>
    );
}
