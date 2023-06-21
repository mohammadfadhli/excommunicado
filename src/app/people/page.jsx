import Pagination from "../components/Pagination";
import MovieGrid from "../components/MovieGrid";
import { notFound } from "next/navigation";
import PeopleGrid from "../components/PeopleGrid";

async function getData(page) {
    const res = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_API_KEY}&region=${process.env.TMDB_REGION}&page=${page}`
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page({ searchParams }){

    const page = searchParams.page; // get page number from url

    const res = await getData(page);

    if (page > res.total_pages) {
        // if user manually enters a page number that is greater than the total pages, return error
        notFound();
    }

    return (
        <>
            <div className="container max-w-[1024px] mx-auto p-3" id="wrapper">

                <h1 className="font-bold mt-5">People</h1>

                <Pagination
                    totalpages={res.total_pages}
                    currentpage={page}
                    route="people"
                ></Pagination>

                <PeopleGrid people={res.results}></PeopleGrid>

                <Pagination
                    totalpages={res.total_pages}
                    currentpage={page}
                    route="people"
                ></Pagination>
            </div>
        </>
    );

}
