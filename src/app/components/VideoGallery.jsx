async function getMovieData(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getTvData(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function VideoGallery(params) {
    let res = ""

    if(params.req == "movie")
    {
        res = await getMovieData(params.id);
    }
    else
    {
        res = await getTvData(params.id);
    }

    const kk = res.results
        .filter((movie) => movie.type == "Trailer")
        .map((filteredName) => {
            return filteredName;
        });

    const vids = kk.map((vid) => (
        <>
            <div className="w-[560px] h-[315px] rounded-lg">
                <iframe
                    src={`https://www.youtube.com/embed/${vid.key}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-[560px] h-[315px] rounded-lg"
                ></iframe>
            </div>
        </>
    ));

    if (vids != "") {
        return (
            <>
                <div className="my-5">
                    <h1 className="font-bold">Trailers</h1>
                    <div className="flex flex-nowrap gap-5 overflow-x-scroll py-3">
                        {vids}
                    </div>
                </div>
            </>
        );
    }
}
