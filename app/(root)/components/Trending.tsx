"use client";
import Toggle from "@/components/ui/toggle";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import getTrending from "@/actions/getTrending";
import { useState } from "react";
import CardSlider from "@/components/ui/CardSlider";
import Loading from "@/components/ui/Loading";
import FetchLoader from "@/components/ui/FetchLoader";

const Trending = () => {
  const [list, setList] = useState("day");

  const toggleHandler = (title: string) => {
    setList(title);
  };

  const { data, isLoading ,isFetching} = useQuery({
    queryKey: ["trending", list],
    queryFn: () => getTrending(list),
    keepPreviousData: true,
    staleTime:Infinity
  });

  return (
    <div className="mt-6">
      <div className="flex justify-center md:justify-start items-center space-x-2 md:space-x-10">
        <h1 className="font-bold text-2xl  md:ms-12">Trending</h1>
        <Toggle titles={["Today", "ThisWeek"]} onClick={toggleHandler} />
        {isFetching && <FetchLoader/>}
      </div>
      <div className="w-full relative h-full">
        <Image
          fill
          alt="background"
          src={"/bar.svg"}
          className="w-full h-full absolute inset-0 z-0"
        />
        {isLoading && <div className="flex justify-center items-center w-full h-[22rem]">
          <Loading/>
          </div>}
        <CardSlider data={data!} />
      </div>
    </div>
  );
};

export default Trending;
