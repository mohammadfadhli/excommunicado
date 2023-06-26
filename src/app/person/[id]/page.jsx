import Image from "next/image";
import Cast from "@/app/components/Cast.jsx";
import { movie_image_url } from "@/app/tmdb_images/movieImage.js";
import Link from "next/link.js";
import { Button, IconButton } from "../../materialui.jsx";
import DateFormat from "@/app/helper/DateFormat.jsx";
import placeholderimage from "../../assets/placeholderimage.png";
import VideoGallery from "@/app/components/VideoGallery.jsx";
import Recommendations from "@/app/components/Recommendations.jsx";
import PhotoGallery from "@/app/components/PhotoGallery.jsx";
import Crew from "@/app/components/Crew.jsx";

async function getData(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=release_dates`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getImages(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getSocials(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${process.env.TMDB_API_KEY}`
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

function getRating(rating) {
    if (rating != "") {
        return rating.toFixed(1);
    } else {
        return "No Rating";
    }
}

export default async function Page({ params }) {
    const person = await getData(params.id);
    const socials = await getSocials(params.id);

    function HasPicture(params) {
        if (params.personsrc != null) {
            return (
                <Image
                    src={
                        // "https://image.tmdb.org/t/p/w300" + person.profile_path
                        "https://image.tmdb.org/t/p/original" + person.profile_path
                    }
                    className="max-w-full md:w-[300px] sm:max-w-full md:h-full sm:max-h-full w-full h-auto rounded-lg object-cover"
                    width={500}
                    height={500}
                ></Image>
            );
        }

        return (
            <Image
                src={placeholderimage}
                className="max-w-full md:w-[300px] sm:max-w-full md:h-full sm:max-h-full w-full h-auto rounded-lg object-cover"
            ></Image>
        );
    }

    function HasSocials(params) {
        if (
            params.instagram ||
            params.facebook ||
            params.twitter ||
            params.tiktok
        ) {
            return (
                <>
                    <div className="flex gap-3 mt-3">
                        {params.instagram ? (
                            <Link
                                href={`https://www.instagram.com/${params.instagram}`} aria-label="instagram"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    class="bi bi-instagram hover:fill-blue-500"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg>
                            </Link>
                        ) : (
                            <></>
                        )}
                        {params.twitter ? (
                            <Link
                                href={`https://www.twitter.com/${params.twitter}`} aria-label="twitter"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    class="bi bi-twitter hover:fill-blue-500"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                </svg>
                            </Link>
                        ) : (
                            <></>
                        )}
                        {params.facebook ? (
                            <Link
                                href={`https://www.facebook.com/${params.facebook}`} aria-label="facebook"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    class="bi bi-facebook hover:fill-blue-500"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg>
                            </Link>
                        ) : (
                            <></>
                        )}
                        {params.tiktok ? (
                            <Link
                                href={`https://www.tiktok.com/@${params.tiktok}`} aria-label="tiktok"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="white"
                                    class="bi bi-tiktok hover:fill-blue-500"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                                </svg>
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                </>
            );
        }
    }

    return (
        <>
            <figure
                className=""
                style={{ position: "relative", width: "100%", height: 500 }}
            >
                <figcaption className="absolute inset-0 grid h-full w-full place-items-center bg-black/75 p-3">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-semibold">
                            {person.name}
                        </h1>
                    </div>
                </figcaption>
            </figure>

            <div className="container max-w-[1024px] mx-auto p-3">
                <topcard className="flex flex-col md:flex-row mt-5">
                    <div className="shrink-0">
                        <HasPicture
                            personsrc={person.profile_path}
                        ></HasPicture>
                    </div>
                    <div className="flex-auto pt-5 md:p-5">
                        <div className="flex flex-col w-full h-full">
                            <div className="flex gap-1">
                                <h1>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="orange"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </h1>
                                <h1 className="font-bold">
                                    {getRating(person.popularity)}
                                </h1>
                            </div>

                            <h1 className="font-bold mt-3">
                                Name:{" "}
                                <span className="font-semibold">
                                    {person.name}
                                </span>
                            </h1>
                            <h1 className="font-bold mt-3">
                                Gender:{" "}
                                <span className="font-semibold">
                                    {person.gender == 1 ? "Female" : "Male"}
                                </span>
                            </h1>
                            <h1 className="font-bold mt-3">
                                Date of Birth:{" "}
                                <span className="font-semibold">
                                    <DateFormat
                                        release_date={person.birthday}
                                    ></DateFormat>
                                </span>
                            </h1>

                            {person.deathday ? (
                                <h1 className="font-bold mt-3">
                                    Died on:{" "}
                                    <span className="font-semibold">
                                        <DateFormat
                                            release_date={person.deathday}
                                        ></DateFormat>
                                    </span>
                                </h1>
                            ) : (
                                ""
                            )}

                            <h1 className="font-bold mt-3">
                                Place of Birth:{" "}
                                <span className="font-semibold">
                                    {person.place_of_birth ? <>{person.place_of_birth}</> : "Unknown"}
                                </span>
                            </h1>

                            <h1 className="font-bold mt-3">
                                Known for:{" "}
                                <span className="font-semibold">
                                    {person.known_for_department}
                                </span>
                            </h1>

                            <HasSocials
                                instagram={socials.instagram_id}
                                twitter={socials.twitter_id}
                                facebook={socials.facebook_id}
                                tiktok={socials.tiktok_id}
                            ></HasSocials>
                        </div>
                    </div>
                </topcard>

                <h1 className="font-bold mt-5">Biography</h1>
                <p className="mb-5 mt-3 grow text-ellipsis text-base whitespace-pre-line">
                    {person.biography != "" ? person.biography : "No Overview."}
                </p>

                <PhotoGallery
                    id={person.id}
                    type="profiles"
                    req="person"
                ></PhotoGallery>
            </div>
        </>
    );
}
