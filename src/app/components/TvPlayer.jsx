"use client";

import { useState } from "react";
import { Button, Select, Option } from "@material-tailwind/react";

export default function TvPlayer(params) {
    const [season, setSeason] = useState("1");
    const [episode, setEpisode] = useState("1");

    function RenderSeasons(params) {
        var indents = [];
        for (var i = 1; i <= params.s; i++) {
            indents.push(<option value={i} className="rounded">Season {i}</option>);
        }
        return indents;
    }

    function RenderEpisodesButtons(params) {
        var indents = [];
        for (var i = 1; i <= params.s[season - 1].episode_count; i++) {
            indents.push(
                <Button
                    onClick={(e) => handleEpisodeClick(e.target.value)}
                    value={i}
                    size="md"
                    color="blue"
                >
                    Episode {i}
                </Button>
            );
        }
        return indents;
    }

    function handleEpisodeClick(e) {
        setEpisode(e);
    }

    function handleSeasonClick(e) {
        setSeason(e);
        setEpisode("1");
    }

    return (
        <>
                <select
                    name="Season"
                    id="Season"
                    value={season}
                    className="mb-3 h-10 rounded border-r-8 border-transparent px-4 text-sm outline outline-1 outline-transparent bg-black"
                    onChange={(e) => handleSeasonClick(e.target.value)}
                >
                    <RenderSeasons s={params.numofseasons}></RenderSeasons>
                </select>

            <h1 className="font-bold mb-3">Episodes</h1>
            <div className="flex flex-wrap gap-3">
                <RenderEpisodesButtons
                    s={params.seasons}
                ></RenderEpisodesButtons>
            </div>

            <div className="my-5">
                <h1 className="font-bold pb-3">
                    Watch {params.title} Season {season} Episode {episode}
                </h1>
                <iframe
                    src={
                        "https://multiembed.mov/directstream.php?video_id=" +
                        params.id +
                        "&tmdb=1&s=" +
                        season +
                        "&e=" +
                        episode
                    }
                    class="w-full aspect-video"
                    allowFullScreen
                ></iframe>
            </div>
        </>
    );
}
