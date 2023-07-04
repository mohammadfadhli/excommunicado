import { collection, getDocs, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import AccessDenied from "../components/AccessDenied";
import FavouriteMoviesComponent from "../components/FavouriteMoviesComponent";
import { db } from "../firebase";
import { authOptions } from "../options";

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

    // get all favourite movies id
    let favouritemovies = [];
    const querySnapshot1 = await getDocs(
        collection(db, `users/${userdocid}/favourite_movies`)
    );
    querySnapshot1.forEach((doc) => {
        favouritemovies.push(doc.id);
    });

    // get all favourite tvshows id
    let favouritetvshows = [];
    const querySnapshot2 = await getDocs(
        collection(db, `users/${userdocid}/favourite_tv_shows`)
    );
    querySnapshot2.forEach((doc) => {
        favouritetvshows.push(doc.id);
    });

    return (
        <>
            <div className="container max-w-[1024px] mx-auto p-3">
                <h1 className="font-bold text-xl mt-5">{session.user.name}'s Profile</h1>

                <h1 className="mt-5">My Favourite Movies</h1>
                <FavouriteMoviesComponent userdocid={userdocid} favouritemovies={favouritemovies}></FavouriteMoviesComponent>
            </div>
        </>
    );
}
