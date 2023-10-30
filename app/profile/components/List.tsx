"use client";
import { useQuery } from "@tanstack/react-query";
import getUserMediaList from "@/actions/getUserMediaList";
import React, { useState } from "react";
import ProfileCard from "@/components/ui/ProfileCard";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/ui/Pagination";
import deleteUserMedia from "@/actions/deleteUserMedia";
import toast from "react-hot-toast";
import FetchLoader from "@/components/ui/FetchLoader";
import { cn } from "@/libs/utils";

interface ListProps {
  list: string;
}

const List: React.FC<ListProps> = ({ list }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ["userMediaList", list, page],
    () => getUserMediaList(list, page)
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const deleteMediaHandler = async (mediaId: string) => {
    try {
      setLoading(true);
      await deleteUserMedia(list, mediaId).then((res) => {
        if (res === 200) {
          toast.success("the media delete successfully");
          refetch();
        } else {
          toast.error("Somethings went Wrong!");
        }
      });
    } catch (error) {
      toast.error("Somethings went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-full">
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      </div>
    );
  }

  const renderMediaSection = (mediaType: string) => (
    <div className="py-2">
      <h1 className="text-center font-bold text-2xl border-b">
        {mediaType === "movie" ? "Movies" : "TVs"}
      </h1>
      <div className="flex flex-wrap gap-2 justify-center md:justify-normal">
        {data?.results
          .filter((item) => item.mediaType === mediaType)
          .map((item) => (
            <ProfileCard
              data={item}
              key={item.id}
              onClick={deleteMediaHandler}
              loading={loading}
            />
          ))}
      </div>
      {data?.results.filter((item) => item.mediaType === mediaType).length ===
        0 && (
        <div className="flex justify-center items-center py-12">
          <div>No {mediaType === "movie" ? "movies" : "TV shows"} found.</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-full">
      <div className="flex flex-col justify-center gap-y-4 px-2 md:px-6">
        {renderMediaSection("movie")}
        {renderMediaSection("tv")}
        <div className="flex justify-center items-center my-4">
          <Pagination
            totalItems={data?.total_results || 0}
            itemsPerPage={10} // Adjust the itemsPerPage as needed
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <div
        className={cn(
          "fixed top-4 w-44 left-[50%] -translate-x-[50%] bg-zinc-900 h-16 z-50 rounded-xl hidden justify-center items-center text-zinc-50 transition",
          loading && "flex"
        )}
      >
        Working...
        <FetchLoader />
      </div>
    </div>
  );
};

export default List;
