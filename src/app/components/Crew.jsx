import Link from "next/link";

export default function Crew(params) {
    let directors = [];
    let writers = [];
    let producers = [];

    params.credits
        .filter((crew) => crew.job == "Director")
        .map((person) => directors.push(person));

    function AllDirectors(params) {
        const finald = params.directors.map((director, index) => (
            <>
                <Link
                    href={"/person/" + director.id}
                    className="hover:underline text-blue-500"
                >
                    {director.name}

                </Link>
                {index != params.directors.length - 1 ? <>, </> : <></>}
            </>
        ));

        return finald;
    }

    params.credits
        .filter((crew) => crew.job == "Writer")
        .map((person) => writers.push(person));

    function AllWriters(params) {
        const finald = params.writers.map((writer, index) => (
            <>
                <Link
                    href={"/person/" + writer.id}
                    className="hover:underline text-blue-500"
                >
                    {writer.name}
                </Link>
                {index != params.writers.length - 1 ? <>, </> : <></>}
            </>
        ));

        return finald;
    }

    params.credits
        .filter((crew) => crew.job == "Producer")
        .map((person) => producers.push(person));

        function AllProducers(params) {
            const finald = params.producers.map((producer, index) => (
                <>
                    <Link
                        href={"/person/" + producer.id}
                        className="hover:underline text-blue-500"
                    >
                        {producer.name}
                    </Link>
                    {index != params.producers.length - 1 ? <>, </> : <></>}
                </>
            ));
    
            return finald;
        }

    return (
        <>
            {directors.length != 0 ? (
                <>
                    <div className="my-5">
                        <h1 className="font-bold">
                            {directors.length > 1 ? "Directors" : "Director"}
                        </h1>
                        <AllDirectors
                            directors={directors}
                        ></AllDirectors>
                    </div>
                </>
            ) : (
                ""
            )}
            {producers.length != 0 ? (
                <>
                    <div className="my-5">
                        <h1 className="font-bold">
                            {producers.length > 1 ? "Producers" : "Producer"}
                        </h1>
                        <AllProducers
                            producers={producers}
                        ></AllProducers>
                    </div>
                </>
            ) : (
                ""
            )}
            {writers.length != 0 ? (
                <>
                    <div className="my-5">
                        <h1 className="font-bold">
                            {writers.length > 1 ? "Writers" : "Writer"}
                        </h1>
                        <AllWriters
                            writers={writers}
                        ></AllWriters>
                    </div>
                </>
            ) : (
                ""
            )}
        </>
    );
}
