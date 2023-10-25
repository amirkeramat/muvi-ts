import getHomeData from "@/actions/getHomeData";
import Hero from "./components/Hero";
import Trending from "./components/Trending";
import LatestTrailers from "./components/LatestTrailers";
import Popular from "./components/Popular";

const HomePage = async () => {
  const data = await getHomeData("movie", "now_playing", 1);
  return (
    <div className="min-h-full w-full flex flex-col">
      <div className="container p-0 flex flex-col">
          <Hero data={data}/>
          <Trending/> 
          <LatestTrailers/>   
          <Popular/>
      </div>
    </div>
  );
};

export default HomePage;
