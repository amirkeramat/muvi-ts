"use client";
import Toggle from "@/components/ui/toggle";
import { useQuery } from "@tanstack/react-query";
import getPopular from "@/actions/getPopular";
import { useState } from "react";
import CardSlider from "@/components/ui/CardSlider";
import Loading from "@/components/ui/Loading";
import FetchLoader from "@/components/ui/FetchLoader";

const Popular = () => {
  const [list, setList] = useState("movie");

  const toggleHandler = (title: string) => {
    setList(title);
  };

  const { data, isLoading,isFetching } = useQuery({
    queryKey: ["popular", list],
    queryFn: () => getPopular(list),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  return (
    <div className="mt-6">
      <div className="flex justify-center md:justify-start items-center space-x-2 md:space-x-10">
        <h1 className="font-bold text-2xl  md:ms-12">Popular</h1>
        <Toggle titles={["Movie", "On Tv"]} onClick={toggleHandler} />
        {isFetching && <FetchLoader/>}
      </div>
      <div className="w-full relative h-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-96 w-full">
            <Loading />
          </div>
        ) : (
          <CardSlider data={data!} mediaType={list} />
        )}
      </div>
    </div>
  );
};

export default Popular;
