"use client"
import { useQuery } from "@tanstack/react-query";
import getFavorite from "@/actions/getFavorite";
import React from "react";

const FavoriteList =  () => {

   const { data, isLoading, isFetching } = useQuery({
     queryKey: ["favoriteList"],
     queryFn: () => getFavorite(),
     keepPreviousData: true,
     staleTime: Infinity,
   });

   console.log(data);
   

  

  return <div>FavoriteList</div>;
};

export default FavoriteList;
