export default function MoviePlayer(params) {
    return (
        <>
            <div className="my-5">
                <h1 className="font-bold pb-3">Watch {params.title}</h1>
                <iframe
                    // src={
                    //     "https://multiembed.mov/?video_id=" +
                    //     params.id +
                    //     "&tmdb=1"
                    // }
                    // Below is using VIP direct stream
                    src={
                        "https://multiembed.mov/directstream.php?video_id=" +
                        params.id +
                        "&tmdb=1"
                    }
                    class="w-full aspect-video"
                    allowFullScreen
                ></iframe>
            </div>
        </>
    );
}
