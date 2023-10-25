"use client";

import { TrailerData } from "@/types";
import YouTube from "react-youtube";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
interface VideoSliderProps {
  data: TrailerData[];
}

const VideoSlider: React.FC<VideoSliderProps> = ({ data }) => {
  return (
    <div className="h-80 w-full px-1 md:px-12">
      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 1,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 1,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 1,
          },
          1368: {
            slidesPerView: 4,
            spaceBetween: 1,
          },
        }}
        spaceBetween={10}
        modules={[FreeMode]}
        className="mySwiper h-full w-full"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className="w-80">
            <div className="w-full h-72 pb-12">
              <YouTube
                iframeClassName="w-80 h-full"
                className="h-full rounded-xl"
                videoId={item.results.key}
              />
              <div className="flex flex-col space-y-2 items-center justify-center text-zinc-50">
                <Link
                  className="font-semibold text-sm"
                  href={`/${item.media_type}/${item.id}`}
                >
                  {item.name}
                </Link>
                <p className="text-xs">{item.results.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSlider;
