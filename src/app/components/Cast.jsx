import Image from "next/image";
import profileplaceholderimage from "../assets/profileplaceholderimage.jpeg";
import {
    CardBody
} from "../materialui.jsx";

export default function Cast(params) {
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

    const castCards = params.credits.slice(0, 12).map((person) => (
        <>
            <div className="w-[150px] bg-[#282828] rounded-xl shadow-md">
                <div
                    floated={false}
                    className="m-0 w-[150px] h-[200px] rounded-lg"
                >
                    <HasPicture
                        profilepicture={person.profile_path}
                    ></HasPicture>
                </div>
                <CardBody className="text-center p-3">
                    <h4 className="font-bold mb-2 text-xs text-white">
                        {person.name}
                    </h4>
                    <h4 className="font-medium text-xs text-white">
                        {person.character}
                    </h4>
                </CardBody>
            </div>
        </>
    ));

    if (castCards != "") {
        return (
            <>
                <div className="my-5">
                    <h1 className="font-bold">Main Cast</h1>
                    <div className="flex flex-nowrap gap-5 overflow-x-scroll py-3">
                        {castCards}
                    </div>
                </div>
            </>
        );
    }
}
