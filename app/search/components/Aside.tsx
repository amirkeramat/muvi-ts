"use client";
import React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getSearchData from "@/actions/getSerachData";
import { useState } from "react";

import Link from "next/link";
import { cn } from "@/libs/utils";

const Aside = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [query, setQuery] = useState(searchParams.get("query"));

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => getSearchData(query!!, page.toString()),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const routeNames = [
    "tv",
    "movie",
    "collection",
    "company",
    "keyword",
    "person",
  ];

  const routes = routeNames.map((name) => {
    const path = `/search/${name}?query=${query}`;
    return {
      path,
      name,
      active: pathname === `/search/${name}`,
      totalItems: data?.[name].total_results,
    };
  });
  return (
    <div className="border-r pr-10 mt-4 border-gray-300 min-h-full">
      <div className="border rounded-xl shadow-xl w-full overflow-hidden pb-6">
        <div className="h-16 w-full bg-yellow-500">
          <h1 className="text-center pt-4 font-bold text-xl">Search results</h1>
        </div>
        <div className="flex flex-row items-center overflow-x-scroll md:overflow-auto scroll-m-2 bg-scroll  w-full py-6 border-b border-yellow-500 mx-6 space-x-6 md:w-36  md:flex-col md:space-x-0 md:items-start md:py-0 md:space-y-8 md:pr-6 md:mt-6 md:border-none">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                `
            hover:text-yellow-500  transition w-full flex justify-between
          `,
                route.active && "text-yellow-500"
              )}
            >
              <div className="py-1">{route.name}</div>
              <div className="bg-gray-100 text-zinc-500 p-1 rounded-xl text-sm">
                {route.totalItems || 0}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aside;
