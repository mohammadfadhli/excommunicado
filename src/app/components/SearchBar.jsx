"use client";

import { useEffect, useState } from "react";
import { Input, Button, Alert } from "../materialui.jsx";

export default function SearchBar(params) {
    const [search, setSearch] = useState(params.query);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            const toRef = setTimeout(() => {
                setError(false);
                clearTimeout(toRef);
            }, 1500);
        }
    }, [error]);

    function searchMovie(e) {
        e.preventDefault();
        // console.log(params.query);
        if (search) {
            if (search.trim().length != 0) {
                window.location.href = `/search/?query=${search.trim()}&page=1`;
            } else {
                setSearch("");
                setError(true);
            }
        } else {
            setSearch("");
            setError(true);
        }
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
                                // value={search}
                                value={search || ""}
                                containerProps={{
                                    className: "min-w-0",
                                }}
                                color="black"
                                error={error}
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
