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
    <div className="border-r border-gray-300 ">
      <div className="flex flex-col space-y-8 pr-6 w-36 mt-6">
        {routes.map(route=>(
          <Link key={route.path} href={route.path} className={cn(`
            hover:text-yellow-500 transition
          `,
          route.active && "text-yellow-500"
          )}>{route.name}</Link>
        ))}
        <button className="text-sm font-bold text-left" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Aside;
