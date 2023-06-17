import MoviePage from "../components/MoviePage";

export default function Page() {
    return (
        <>
            <div className="container max-w-[1024px] mx-auto p-3" id="wrapper">
                <MoviePage type="upcoming"></MoviePage>
            </div>
        </>
    );
}
