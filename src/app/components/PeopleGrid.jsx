import Link from "next/link";
import Image from "next/image";
import placeholderimage from "../assets/placeholderimage.png";

export default function PeopleGrid(params) {
    const people = params.people;

    function HasPicture(params) {
        if (params.personsrc != null) {
            return (
                <div className="flex flex-col">
                    <Link
                        href={"/person/" + params.personid}
                        className="contents"
                    >
                        <Image
                            className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 overflow-hidden shadow-md"
                            src={
                                // "https://image.tmdb.org/t/p/w300" +
                                "https://image.tmdb.org/t/p/original" +
                                params.personsrc
                            }
                            alt="nature image"
                            width={500}
                            height={500}
                        />
                    </Link>
                    <div className="py-3">
                        <Link
                            href={"/person/" + params.personid}
                            className="hover:underline hover:text-blue-500"
                        >
                            <h1 className="text-sm font-semibold truncate">
                                {params.personname}
                            </h1>
                        </Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col">
                    <Link
                        href={"/person/" + params.personid}
                        className="contents"
                    >
                        <Image
                            className="h-full w-full rounded-xl object-cover transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-100 shadow-md"
                            src={placeholderimage}
                            alt="nature image"
                            width={500}
                            height={500}
                        />
                    </Link>
                    <div className="py-3">
                        <Link
                            href={"/person/" + params.personid}
                            className="hover:underline hover:text-blue-500"
                        >
                            <h1 className="text-sm font-semibold truncate">
                                {params.personname}
                            </h1>
                        </Link>
                    </div>
                </div>
            );
        }
    }

    if (people.length == 0) {
        return (
            <>
                <div className="flex items-center justify-center">
                    <h1>No results found.</h1>
                </div>
            </>
        );
    }

    const peopleCards = people.map((person) => (
        <HasPicture
            personsrc={person.profile_path}
            personid={person.id}
            personname={person.name}
        ></HasPicture>
    ));

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 content-stretch">
                {peopleCards}
            </div>
        </>
    );
}
