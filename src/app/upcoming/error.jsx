"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Typography } from "@material-tailwind/react";

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="container max-w-[1024px] mx-auto h-screen p-3">
            <div className="flex flex-col w-full h-full text-center justify-center">
                <Typography variant="h4">Oops, Something went wrong!</Typography>
                <button
                    className="mt-3"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
