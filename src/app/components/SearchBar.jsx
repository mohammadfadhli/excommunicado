"use client";

import { useState } from "react";
import { Input, Button } from "../materialui.jsx";

export default function SearchBar(params) {
    const [search, setSearch] = useState(params.query);

    function searchMovie(e) {
        e.preventDefault();
        console.log(search);
        // router.push(`/search/?query=${search}&page=1`)
        window.location.href = `/search/?query=${search}&page=1`;
        
    }

    return (
        <>
            <div className="container mx-auto mt-5">
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[500px]">
                        <form
                            onSubmit={(e) => {
                                searchMovie(e);
                            }}
                        >
                            <Input
                                type="text"
                                label="Search for a movie..."
                                className="pr-20"
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                value={search}
                                containerProps={{
                                    className: "min-w-0",
                                }}
                                color="white"
                            />
                            <Button
                                type="submit"
                                size="sm"
                                className="!absolute right-1 top-1 rounded"
                            >
                                Search
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
