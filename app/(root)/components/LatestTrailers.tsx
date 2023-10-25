"use client";

import getLatestTrailers from "@/actions/getLatestTrailers";
import FetchLoader from "@/components/ui/FetchLoader";
import Loading from "@/components/ui/Loading";
import VideoSlider from "@/components/ui/VideoSlider";
import Toggle from "@/components/ui/toggle";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
const LatestTrailers = () => {
  const [list, setList] = useState("movie");

  const { data, isLoading ,isFetching} = useQuery({
    queryKey: ["LatestTrailers", list],
    queryFn: () => getLatestTrailers(list),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const toggleHandler = (title: string) => {
    setList(title);
  };

  getLatestTrailers("movie");
  return (
    <div className="w-full mt-2 pb-4  rounded-md bg-zinc-950">
      <div className="flex justify-center md:justify-start items-center space-x-2 md:space-x-10 mt-2 z-10">
        <h1 className="font-bold text-2xl text-zinc-50   md:ms-12">Latest Trailers</h1>
        <Toggle className="text-zinc-50" titles={["Movie", "On Tv"]} onClick={toggleHandler} />
        {isFetching && <FetchLoader/>}
      </div>
      <div className="w-full relative h-full mt-6  bg-[url('/line.svg')] bg-cover bg-no-repeat">
        {isLoading ? (
          <div className="flex justify-center items-center h-80 w-full">
            <Loading color="#ffffff"/>
          </div>
        ) : (
          <div className="mt-4">
            <VideoSlider data={data!} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestTrailers;
