"use client";

import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const routes = [
    { path: "/", name: "Home", active: pathname === "/" },
    { path: "/movies", name: "Movies", active: pathname === "/movies" },
    { path: "/series", name: "Series", active: pathname === "/series" },
  ];

  return (
    <div className="w-full flex justify-center items-center bg-yellow-500">
      <div className="container w-full px-2 sm:px-6 flex items-center justify-between py-4">
        <div className="flex items-center space-x-4 sm:space-x-12 text-zinc-100">
          <Link href="/">
            <Image alt="logo" src="/logo.png" width={48} height={48} />
          </Link>
          {routes.map((route) => (
            <Link
              className={cn(
                `
                text-zinc-100 transition
                hover:text-zinc-900
                `,
                route.active && "text-zinc-900"
              )}
              key={route.name}
              href={route.path}
            >
              {route.name}
            </Link>
          ))}
          {session?.data?.user?.email ? (
            <Link
              className={cn(
                `
                text-zinc-100 transition
                hover:text-zinc-900
                `,
                pathname === "/profile" && "text-zinc-900"
              )}
              href="/profile"
            >
              Profile
            </Link>
          ) : (
            <Link
              className={cn(
                `
                text-zinc-100 transition
                hover:text-zinc-900
                `,
                pathname === "/register" && "text-zinc-900"
              )}
              href="/register"
            >
              Sign in
            </Link>
          )}
        </div>
        {session?.data?.user?.email && (
          <Avatar className="w-12 h-12">
            <AvatarImage src={session?.data?.user?.image || ""} />
            <AvatarFallback>
              <AvatarImage src="/logo.png" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default Navbar;
