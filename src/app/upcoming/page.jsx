import MovieGrid from "../components/MovieGrid";
import FilterList from "../components/FilterList";
import Pagination from "../components/Pagination";
import { notFound } from "next/navigation";

async function getData(genres, page) {
    const d = new Date();

    const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const todaysdate = date.toISOString().split("T")[0];

    const max_date = "2024-12-30";
    const min_date = todaysdate;

    if(genres === undefined){
        genres = "";
    }

    const res = await fetch(
        // `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${min_date}&release_date.lte=${max_date}&api_key=${process.env.TMDB_API_KEY}&region=${process.env.TMDB_REGION}&page=${page}&with_genres=${genres}`
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}&sort_by=primary_release_date.asc&with_release_type=3&api_key=${process.env.TMDB_API_KEY}&page=${page}&with_genres=${genres}&region=${process.env.TMDB_REGION}`
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
                <FilterList genres={genres} route="upcomingmovies"></FilterList>

                <h1 className="font-bold mt-5">Upcoming movies</h1>

                <Pagination
                    totalpages={res.total_pages}
                    currentpage={page}
                    route="upcomingmovies"
                    genres={genres}
                ></Pagination>

                <MovieGrid movies={res.results}></MovieGrid>

                <Pagination
                    totalpages={res.total_pages}
                    currentpage={page}
                    route="upcomingmovies"
                    genres={genres}
                ></Pagination>
            </div>
        </>
    );
}
