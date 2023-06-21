import FilterList from "../components/FilterList";
import Pagination from "../components/Pagination";
import MovieGrid from "../components/MovieGrid";
import { notFound } from "next/navigation";

async function getData(genres, page) {
    const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.TMDB_API_KEY}&region=${process.env.TMDB_REGION}&page=${page}&with_genres=${genres}`
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page({ searchParams }) {
    const genres = searchParams.genres; // get genres from url
    const page = searchParams.page; // get page number from url

    const res = await getData(genres, page);

    if (page > res.total_pages || genres === "undefined" || genres === "") {
        // if user manually enters a page number that is greater than the total pages, return error
        notFound();
    }

    return (
        <>
            <div className="container max-w-[1024px] mx-auto p-3" id="wrapper">
                <FilterList genres={genres} route="allmovies"></FilterList>

                <h1 className="font-bold mt-5">All movies</h1>

                <Pagination
                    totalpages={res.total_pages}
                    currentpage={page}
                    route="allmovies"
                    genres={genres}
                ></Pagination>

                <MovieGrid movies={res.results}></MovieGrid>

                <Pagination
                    totalpages={res.total_pages}
                    currentpage={page}
                    route="allmovies"
                    genres={genres}
                ></Pagination>
            </div>
        </>
    );
}
