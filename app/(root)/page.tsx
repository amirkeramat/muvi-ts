import getHomeData from "@/actions/getHomeData";
import Hero from "./components/Hero";
import LatestTrailers from "./components/LatestTrailers";
import HeroSection from "./components/HeroSection";

const HomePage = async () => {
  const data = await getHomeData("movie", "now_playing", 1);
  return (
    <div className="min-h-full w-full flex flex-col">
      <div className="container p-0 flex flex-col">
        <Hero data={data} />
        <HeroSection
          title="Trending"
          listOptions={["Today", "ThisWeek"]}
          initialList="day"
        />
        <LatestTrailers />
        <HeroSection
          title="Popular"
          listOptions={["Movie", "On Tv"]}
          initialList="movie"
        />
      </div>
    </div>
  );
};

export default HomePage;
