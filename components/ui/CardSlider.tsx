"use client";

import Card from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Data, actionList } from "@/types";

interface CardSliderProps {
  data: Data;
  mediaType?: string;
  onClick: (list: string, data: actionList) => void;
}

const CardSlider: React.FC<CardSliderProps> = ({
  data,
  mediaType,
  onClick,
}) => {
  return (
    <div className="w-full px-6 md:px-12">
      <Swiper
        centeredSlidesBounds={true}
        slidesPerView="auto"
        spaceBetween={15}
        className="mySwiper h-full w-full"
      >
        {data?.results.map((item) => (
          <SwiperSlide key={item.id} className="w-40">
            <Card onClick={onClick} mediaType={mediaType} data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSlider;
