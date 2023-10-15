"use client";
import { Data } from "@/types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { POSTER_ORIGINAL, BACK_DROP_W300 } from "@/helpers/imageUrls";

interface HeroProps {
  data: Data;
}
const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <div className="h-24 md:h-96 w-full relative">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        className="mySwiper h-96 w-full"
      >
        {data.results.map((item) => (
          <SwiperSlide key={item.id}>
            <Image
              src={`${POSTER_ORIGINAL}${item.backdrop_path}`}
              className="w-full h-96  object-cover  object-center  relative"
              alt={item.title}
              fill
              placeholder="blur"
              blurDataURL={`${BACK_DROP_W300}${item.backdrop_path}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="bg-yellow-800/70 h-full w-full absolute inset-0 z-10" />

      <div className="h-full w-full flex flex-col justify-center space-y-20 ps-12 absolute inset-0 z-20 text-zinc-50">
        <h1 className="font-bold font-mono text-xl md:text-5xl">Welcome.</h1>
        <p className="text-md md:text-4xl font-semibold">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <form action=""></form>
      </div>
    </div>
  );
};

export default Hero;
