import getHomeData from "@/actions/getHomeData";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BACK_DROP_ORIGINAL, BACK_DROP_W300 } from "@/helpers/imageUrls";
import Image from "next/image";
import Hero from "./components/Hero";
import Trending from "./components/Trending";

const HomePage = async () => {
  const data = await getHomeData("movie", "now_playing", 1);

  return (
    <div className="min-h-full w-full flex flex-col">
      <div className="container p-0 flex flex-col">
          <Hero data={data}/>
          <Trending/>        
      </div>
    </div>
  );
};

export default HomePage;
