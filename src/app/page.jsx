import HorizontalScrollMovies from "./components/HorizontalScrollMovies";
import SearchBar from "./components/SearchBar";
import MovieCarousel from "./components/MovieCarousel";

export default async function Home() {
    return (
        <>
            <div className="container max-w-[1024px] mx-auto p-3" id="wrapper">
                <SearchBar></SearchBar>
                <h1 className="font-bold text-xl mt-5">Explore millions of movies.</h1>
                <MovieCarousel></MovieCarousel>
                <HorizontalScrollMovies movietype="popular"></HorizontalScrollMovies>
                <HorizontalScrollMovies movietype="upcoming"></HorizontalScrollMovies>
            </div>
        </>
    );
}
