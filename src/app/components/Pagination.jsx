"use client";

import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Pagination(params) {
    const postsPerPage = 20

    const router = useRouter();

    const currentpage = parseInt(params.currentpage);

    const next = () => {
        if (currentpage === params.totalpages) return;

        // router.push(`/search?query=${params.query}&page=${currentpage + 1}`);
        // window.location.href = `/search?query=${params.query}&page=${currentpage + 1}`;

        if(params.query) // to cater for user search query
        {
            if(params.genres)
            {
                window.location.href = `/${params.route}?query=${params.query}&genres=${genres}&page=${currentpage + 1}`;
            }
            else
            {
                window.location.href = `/${params.route}?query=${params.query}&page=${currentpage + 1}`;
            }
            
        }
        else
        {
            if(params.genres)
            {
                window.location.href = `/${params.route}?genres=${params.genres}&page=${currentpage + 1}`;
            }
            else
            {
                window.location.href = `/${params.route}?page=${currentpage + 1}`;
            }
            
        }
    };

    const prev = () => {
        if (currentpage === 1) return;

        // router.push(`/search?query=${params.query}&page=${currentpage - 1}`);
        // window.location.href = `/search?query=${params.query}&page=${currentpage - 1}`

        if(params.query) // to cater for user search query
        {
            if(params.genres)
            {
                window.location.href = `/${params.route}?query=${params.query}&genres=${params.genres}&page=${currentpage - 1}`
            }
            else
            {
                window.location.href = `/${params.route}?query=${params.query}&page=${currentpage - 1}`
            }
            
        }
        else
        {
            if(params.genres)
            {
                window.location.href = `/${params.route}?genres=${params.genres}&page=${currentpage - 1}`
            }
            else
            {
                window.location.href = `/${params.route}?page=${currentpage - 1}`
            }
            
        }
    };

    return (
        <div className="container mx-auto my-5">
            <div className="flex items-center justify-center gap-8">
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="blue-gray"
                    onClick={prev}
                    disabled={currentpage === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page{" "}
                    <strong className="text-blue-gray-900">
                        {currentpage}
                    </strong>{" "}
                    of{" "}
                    <strong className="text-blue-gray-900">
                        {params.totalpages}
                    </strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="blue-gray"
                    onClick={next}
                    disabled={currentpage === params.totalpages}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </div>
        </div>
    );
}
