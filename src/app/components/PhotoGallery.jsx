async function getData(movieid) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieid}/images?api_key=${process.env.TMDB_API_KEY}&language=en`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function PhotoGallery(params) {
    const images = await getData(params.movieid);
    const gallerytype = params.type

    // const carouselImages = images.backdrops
    //     .slice(0, 5)
    //     .filter((movie) => movie.iso_639_1 != null)
    //     .map((img) => (
    //         <img
    //             src={"https://image.tmdb.org/t/p/original" + img.file_path}
    //             className="object-cover"
    //         ></img>
    //     ));

    let carouselImages = ""
    let title = ""

    if(gallerytype == "backdrops")
    {
        carouselImages = images[gallerytype].slice(0,5).map((img) => (
            <img
                src={"https://image.tmdb.org/t/p/original" + img.file_path}
                className="object-cover rounded-lg"
            ></img>
        ));
        
        title = "Backdrops"
    }
    else
    {
        carouselImages = images[gallerytype].slice(0,5).map((img) => (
            <img
                src={"https://image.tmdb.org/t/p/original" + img.file_path}
                className="object-cover rounded-lg w-[250px]"
            ></img>
        ));

        title = "Posters"
    }
    

    if (carouselImages != "") {
        return (
            <>
                <h1 className="font-bold mt-5">{title}</h1>
                <div className="flex flex-nowrap gap-5 overflow-x-scroll py-3">
                    {carouselImages}                
                </div>
            </>
        );
    }
}
