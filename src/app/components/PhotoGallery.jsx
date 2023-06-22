import Image from "next/image";

async function getMovieData(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_API_KEY}&language=en`
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
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.TMDB_API_KEY}&language=en`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getPersonData(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.TMDB_API_KEY}&language=en`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function PhotoGallery(params) {

    let images = ""

    if(params.req == "movie")
    {
        images = await getMovieData(params.id)
    }
    else if(params.req == "tvshow")
    {
        images = await getTvData(params.id)
    }
    else if(params.req == "person")
    {
        images = await getPersonData(params.id)
    }

    // const images = await getMovieData(params.id);
    const gallerytype = params.type;

    let carouselImages = "";
    let title = "";

    if (gallerytype == "backdrops") {
        carouselImages = images[gallerytype]
            .slice(0, 5)
            .map((img) => (
                <img
                    src={"https://image.tmdb.org/t/p/original" + img.file_path}
                    className="object-cover rounded-lg"
                ></img>
            ));

        title = "Backdrops";
    } else if(gallerytype == "posters") {
        carouselImages = images[gallerytype]
            .slice(0, 5)
            .map((img) => (
                <img
                    src={"https://image.tmdb.org/t/p/original" + img.file_path}
                    className="object-cover rounded-lg w-[250px]"
                ></img>
            ));

        title = "Posters";
    }
    else if(gallerytype == "profiles")
    {
        carouselImages = images[gallerytype]
            .slice(1, 6)
            .map((img) => (
                <Image
                    src={"https://image.tmdb.org/t/p/w300" + img.file_path}
                    className="object-cover rounded-lg w-[250px] h-[300px]"
                    width={250}
                    height={300}
                ></Image>
            ));

        title = "Profile Pictures";
    }

    if (carouselImages != "") {
        return (
            <>
                <div className="my-5">
                    <h1 className="font-bold">{title}</h1>
                    <div className="flex flex-nowrap gap-5 overflow-x-scroll py-3">
                        {carouselImages}
                    </div>
                </div>
            </>
        );
    }
}
