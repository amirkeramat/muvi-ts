"use client";

import getUserData from "@/actions/getUserData";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const ProfilePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(),
  });

  return (
    <div className="w-full h-full">
      <div className="container p-0 h-full">
        <div className="w-full flex justify-center my-4">
          <h1 className="font-bold text-2xl">Your Profile</h1>
        </div>
        <div className="w-full flex flex-wrap">
          <div className="w-full">
            <div className="ms-4 text-yellow-500 border rounded-lg w-40 text-center p-2 bg-zinc-950 font-bold">
              Recently added
            </div>
          </div>
          <div className="border rounded-md  flex flex-col w-full md:flex-1 m-4 shadow-md">
            <h1 className="text-center font-bold border-b  py-2 bg-yellow-500">
              Watch List
            </h1>
            {data?.watchList.slice(0, 10).map((item) => (
              <Link
                className="p-2 border-t hover:bg-yellow-100 transition"
                href={`/${item.mediaType}/${item.mediaId}`}
                key={item.id}
              >
                {item.original_name || item.original_title}
              </Link>
            ))}
          </div>
          <div className="border rounded-md  flex flex-col w-full md:flex-1  m-4 shadow-md">
            <h1 className="text-center font-bold border-b  py-2 bg-yellow-500">
              Favorite List
            </h1>
            {data?.favoriteList.slice(0, 10).map((item) => (
              <Link
                className="p-2 border-t hover:bg-yellow-100 transition"
                href={`/${item.mediaType}/${item.mediaId}`}
                key={item.id}
              >
                {item.original_name || item.original_title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
