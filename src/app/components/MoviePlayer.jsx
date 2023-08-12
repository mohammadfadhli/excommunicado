export default function MoviePlayer(params) {
    return (
        <>
            <div className="my-5">
                <h1 className="font-bold pb-3">Watch</h1>
                <iframe
                    src={
                        "https://multiembed.mov/?video_id=" +
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
