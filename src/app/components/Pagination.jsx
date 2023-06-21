"use client";

import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pagination(params) {
    const currentpage = parseInt(params.currentpage);
    const [par, setPar] = useState("");

    useEffect(() => {
        if (params.route == "allmovies") {
            setPar("movies");
        } else if (params.route == "upcomingmovies") {
            setPar("upcoming");
        } else if (params.route == "search") {
            setPar("search");
        } else if (params.route == "tvshows") {
            setPar("tvshows");
        } else if (params.route == "people") {
            setPar("people");
        }
    }, []);

    const next = () => {
        if (currentpage === params.totalpages) return;

        if (params.query) {
            // to cater for user search query
            if (params.genres) {
                window.location.href = `/${par}?query=${encodeURIComponent(
                    params.query
                )}&genres=${genres}&page=${currentpage + 1}`;
            } else {
                window.location.href = `/${par}?query=${encodeURIComponent(
                    params.query
                )}&page=${currentpage + 1}`;
            }
        } else {
            if (params.genres) {
                window.location.href = `/${par}?genres=${params.genres}&page=${
                    currentpage + 1
                }`;
            } else {
                window.location.href = `/${par}?page=${currentpage + 1}`;
            }
        }
    };

    const prev = () => {
        if (currentpage === 1) return;

        if (params.query) {
            // to cater for user search query
            if (params.genres) {
                window.location.href = `/${par}?query=${encodeURIComponent(
                    params.query
                )}&genres=${params.genres}&page=${currentpage - 1}`;
            } else {
                window.location.href = `/${par}?query=${encodeURIComponent(
                    params.query
                )}&page=${currentpage - 1}`;
            }
        } else {
            if (params.genres) {
                window.location.href = `/${par}?genres=${params.genres}&page=${
                    currentpage - 1
                }`;
            } else {
                window.location.href = `/${par}?page=${currentpage - 1}`;
            }
        }
    };

    return (
        <div className="container mx-auto my-5">
            <div className="flex items-center justify-center gap-8">
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="white"
                    onClick={prev}
                    disabled={currentpage === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="white" className="font-normal">
                    Page <strong className="text-white">{currentpage}</strong>{" "}
                    of{" "}
                    <strong className="text-white">{params.totalpages}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="white"
                    onClick={next}
                    disabled={currentpage === params.totalpages}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </div>
        </div>
    );
}
