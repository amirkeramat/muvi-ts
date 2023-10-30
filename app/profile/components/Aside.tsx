"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";

const Aside = () => {
  const pathname = usePathname();

  const routes = [
    { path: "/profile", name: "Profile", active: pathname === "/profile" },
    {
      path: "/profile/watchList",
      name: "WatchList",
      active: pathname === "/profile/watchList",
    },
    {
      path: "/profile/favoriteList",
      name: "FavoriteList",
      active: pathname === "/profile/favoriteList",
    },
    {
      path: "/profile/setting",
      name: "Setting",
      active: pathname === "/profile/setting",
    },
  ];

  return (
    <div className="border-r border-gray-300 min-h-full">
      <div className="flex flex-row items-center overflow-x-scroll md:overflow-auto scroll-m-2 bg-scroll  w-full py-6 border-b border-yellow-500 px-2 space-x-6 md:w-36  md:flex-col md:space-x-0 md:items-start md:py-0 md:space-y-8 md:pr-6 md:mt-6 md:border-none">
        {routes.map(route=>(
          <Link key={route.path} href={route.path} className={cn(`
            hover:text-yellow-500 transition
          `,
          route.active && "text-yellow-500"
          )}>{route.name}</Link>
        ))}
        <button className="text-sm font-bold text-left whitespace-nowrap" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Aside;
