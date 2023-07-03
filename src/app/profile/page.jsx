import { getServerSession } from "next-auth";
import AccessDenied from "../components/AccessDenied";
import { db } from "../firebase";
import { authOptions } from "../options";
import { collection, query, where, getDocs } from "firebase/firestore";
import FavouriteMovies from "../components/FavouriteMovies";
import FavouriteTvShows from "../components/FavouriteTvShows";

export default async function Page() {
    const session = await getServerSession(authOptions);
    let userdocid = "";

    if (!session) {
        return <AccessDenied></AccessDenied>;
    }

    if (session) {
        const q = query(
            collection(db, "users"),
            where("email", "==", session.user.email)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            userdocid = doc.id;
        });
    }

    return (
        <>
            <div className="container max-w-[1024px] mx-auto p-3">
                <h1 className="font-bold mt-5">{session.user.name}'s Profile</h1>
                <FavouriteMovies userdocid={userdocid}></FavouriteMovies>
                <FavouriteTvShows userdocid={userdocid}></FavouriteTvShows>
            </div>
        </>
    );
}
