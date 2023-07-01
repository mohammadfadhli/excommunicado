import { getServerSession } from "next-auth";
import AccessDenied from "../components/AccessDenied";
import { db } from "../firebase";
import { authOptions } from "../options";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function Page() {
    const session = await getServerSession(authOptions);
    const favouritemovies = [];

    if (!session) {
        return <AccessDenied></AccessDenied>;
    }

    const useremail = session.user.email;

    let userdocid = "";

    const q = query(collection(db, "users"), where("email", "==", useremail));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        userdocid = doc.id;
    });

    // get all favourited movies
    const querySnapshot1 = await getDocs(
        collection(db, `users/${userdocid}/favourite_movies`)
    );
    querySnapshot1.forEach((doc) => {
        favouritemovies.push(doc.id);
    });

    const favmovies = favouritemovies.map((movie) => <li>{movie}</li>);

    return (
        <div className="container max-w-[1024px] mx-auto p-3">
            <h1 className="mt-5">Your Favourited Movies</h1>
            <h1 className="mt-5">{favmovies}</h1>
        </div>
    );
}
