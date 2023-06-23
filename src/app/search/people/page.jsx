import Pagination from "@/app/components/Pagination";
import SearchBar from "@/app/components/SearchBar";
import SearchGrid from "@/app/components/SearchGrid";
import { notFound } from 'next/navigation';
import SearchButtonGroup from "@/app/components/ButtonGroup";

async function getPeople(query, page) {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${query}&api_key=${process.env.TMDB_API_KEY}&page=${page}`
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

    const res = await getPeople(userquery, page);

    if (page > res.total_pages || userquery === "undefined" || userquery === "") {
        // if user manually enters a page number that is greater than the total pages, return error
        notFound()
    }

    return (
        <>
            <div className="container max-w-[1024px] mx-auto p-3" id="wrapper">
                <SearchBar query={userquery}></SearchBar>

                <SearchButtonGroup query={searchParams.query} route="search/people"></SearchButtonGroup>

                <div className="container mt-5">
                    <h1 className="font-bold mt-5">
                        Results for: {userquery}
                    </h1>
                </div>

                <Pagination
                    totalpages={res.total_pages}
                    query={searchParams.query}
                    currentpage={page}
                    route="search/people"
                ></Pagination>

                {/* <MovieGrid movies={res.results}></MovieGrid> */}
                <SearchGrid media={res.results} type="people"></SearchGrid>

                <Pagination
                    totalpages={res.total_pages}
                    query={searchParams.query}
                    currentpage={page}
                    route="search/people"
                ></Pagination>
            </div>
        </>
    );
}
