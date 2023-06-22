import Pagination from "@/app/components/Pagination";
import SearchBar from "@/app/components/SearchBar";
import { notFound } from 'next/navigation';
import MovieGrid from "../components/MovieGrid.jsx";
import SearchGrid from "../components/SearchGrid.jsx";

async function getData(query, page) {
    const res = await fetch(
        // `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}&page=${page}`
        `
        https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${process.env.TMDB_API_KEY}&page=${page}`
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getMovies(query, page) {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}&page=${page}`
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getTvShows(query, page) {
    const res = await fetch(
        // `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}&page=${page}`
        `
        https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${process.env.TMDB_API_KEY}&page=${page}`
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getPeople(query, page) {
    const res = await fetch(
        // `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}&page=${page}`
        `
        https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${process.env.TMDB_API_KEY}&page=${page}`
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page({ searchParams }) {
    const userquery = searchParams.query; // get user query from url

    const page = searchParams.page; // get page number from url

    const res = await getData(userquery, page);
    const movies = await getMovies(userquery, page);
    const tvshows = await getTvShows(userquery, page);
    const people = await getPeople(userquery, page)

    if (page > res.total_pages || userquery === "undefined" || userquery === "") {
        // if user manually enters a page number that is greater than the total pages, return error
        notFound()
    }

    return (
        <>
            <div className="container max-w-[1024px] mx-auto p-3" id="wrapper">
                <SearchBar query={userquery}></SearchBar>

                <div className="container mt-5">
                    <h1 className="font-bold mt-5">
                        Results for: {userquery}
                    </h1>
                </div>

                <Pagination
                    totalpages={res.total_pages}
                    query={searchParams.query}
                    currentpage={page}
                    route="search"
                ></Pagination>

                {/* <MovieGrid movies={res.results}></MovieGrid> */}
                <SearchGrid media={res.results}></SearchGrid>

                <Pagination
                    totalpages={res.total_pages}
                    query={searchParams.query}
                    currentpage={page}
                    route="search"
                ></Pagination>
            </div>
        </>
    );
}
