"use client";
import { Carousel } from "@material-tailwind/react";

export default function CarouselComponent(params) {
    return (
        <>
            <Carousel
                className="rounded-xl mt-5"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-9 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                    activeIndex === i
                                        ? "bg-white w-8"
                                        : "bg-white/50 w-4"
                                }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                {params.items}
            </Carousel>
        </>
    );
}
