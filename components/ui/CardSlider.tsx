"use client";

import Card from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Data } from "@/types";

interface CardSliderProps {
  data: Data;
  mediaType?:string
}

const CardSlider: React.FC<CardSliderProps> = ({ data ,mediaType}) => {
  return (
    <div className="w-full px-1 md:px-12">
      <Swiper
        slidesPerView={2}
        breakpoints={{
          480: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 1,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 1,
          },
          1368: {
            slidesPerView: 8,
            spaceBetween: 1,
          },
        }}
        spaceBetween={5}
        className="mySwiper h-full w-full"
      >
        {data?.results.map((item) => (
          <SwiperSlide key={item.id} className="w-40">
            <Card mediaType={mediaType} data={item} onClick={() => {}} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSlider;
