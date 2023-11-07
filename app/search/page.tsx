"use client";
import React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getSearchData from "@/actions/getSerachData";
import { useState } from "react";
import Loading from "@/components/ui/Loading";
import Card from "@/components/ui/card";
import Pagination from "@/components/ui/Pagination";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { actionList } from "@/types";
import FetchLoader from "@/components/ui/FetchLoader";
import { cn } from "@/libs/utils";
const SearchPage = () => {
  const session = useSession();

  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query"));

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => getSearchData(query!!, page.toString()),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const items = data?.multi;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onClickHandler = async (list: string, data: actionList) => {
    try {
      setLoading(true);
      if (!session?.data?.user?.email) {
        toast.error("you have to logged in first");
      } else {
        await axios.post(`/api/userMediaList/${list}`, data).then((res) => {
          if (res.status === 201) {
            toast.error(res.data);
          } else {
            toast.success(`Added to your ${list}`);
          }
        });
      }
    } catch (error: any) {
      toast.error("something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full px-4">
      {isLoading && (
        <div className="h-full w-full flex justify-center items-center">
          <Loading />
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {items?.results.map((item: any) => (
          <Card
            key={item.id}
            data={item}
            onClick={onClickHandler}
          />
        ))}
      </div>
      <div className="flex w-full justify-center items-center my-4">
        <Pagination
          totalItems={items?.total_results || 0}
          itemsPerPage={20} // Adjust the itemsPerPage as needed
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
      <div
        className={cn(
          "fixed top-4 w-44 left-[50%] -translate-x-[50%] bg-zinc-900 h-16 z-50 rounded-xl hidden justify-center items-center text-zinc-50 transition",
          isFetching && "flex"
        )}
      >
        Working...
        <FetchLoader />
      </div>
    </div>
  );
};

export default SearchPage;
