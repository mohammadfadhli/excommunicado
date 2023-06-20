import profileplaceholderimage from "../assets/profileplaceholderimage.jpeg";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Avatar,
} from "../materialui.jsx";
import Image from "next/image";

export default function Crew(params) {
    function HasPicture(params) {
        if (params.profilepicture != null) {
            return (
                <img
                    src={
                        "https://image.tmdb.org/t/p/w300" +
                        params.profilepicture
                    }
                    alt="profile-picture"
                    className="object-cover w-full h-full rounded-lg"
                />
            );
        } else {
            return (
                <Image
                    src={profileplaceholderimage}
                    alt="profile-picture"
                    className="object-cover w-full h-full rounded-lg"
                />
            );
        }
    }

    let directors = [];
    let writers = [];
    let producers = [];

    params.credits
        .filter((crew) => crew.job == "Director")
        .map((person) => directors.push(person.name));

    params.credits
        .filter((crew) => crew.job == "Writer")
        .map((person) => writers.push(person.name));

    params.credits
        .filter((crew) => crew.job == "Producer")
        .map((person) => producers.push(person.name));

    return (
        <>
            { directors.at.length != 0 ? <><h1 className="font-bold mt-5">{directors.length > 1 ? "Directors" : "Director"}</h1>
            <div className="">{directors.join(", ")}</div></> : "" }
            { producers.length != 0 ? <><h1 className="font-bold mt-5">{producers.length > 1 ? "Producers" : "Producer"}</h1>
            <div className="">{producers.join(", ")}</div></> : "" }
            { writers.length != 0 ? <><h1 className="font-bold mt-5">{writers.length > 1 ? "Writers" : "Writer"}</h1>
            <div className="">{writers.join(", ")}</div></> : "" }
        </>
    );
}
