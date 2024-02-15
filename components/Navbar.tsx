"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  BsHeart,
  BsOption,
  BsPerson,
  BsSave,
  BsSignDeadEnd,
} from "react-icons/bs";

import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const pathname = usePathname();

  const routes = [
    { path: "/", name: "Home" },
    { path: "/media/movies", name: "Movies" },
    { path: "/media/series", name: "Series" },
  ];

  const profileRoutes = [
    { path: "/profile", name: "Profile", icon: <BsPerson size={16} /> },
    {
      path: "/profile/watchList",
      name: "WatchList",
      icon: <BsHeart size={16} />,
    },
    {
      path: "/profile/favoriteList",
      name: "FavoriteList",
      icon: <BsSave size={16} />,
    },
    { path: "/profile/setting", name: "Setting", icon: <BsOption size={16} /> },
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
              className={`text-zinc-100 transition hover:text-zinc-900 ${
                pathname === route.path ? "text-zinc-900" : ""
              }`}
              key={route.path}
              href={route.path}
            >
              {route.name}
            </Link>
          ))}
          {session?.data?.user?.email ? (
            <Link
              className={`text-zinc-100 transition hover:text-zinc-900 ${
                pathname === "/profile/:path*" ? "text-zinc-900" : ""
              }`}
              href="/profile"
            >
              Profile
            </Link>
          ) : (
            <Link
              className={`text-zinc-100 transition hover:text-zinc-900 ${
                pathname === "/register" ? "text-zinc-900" : ""
              }`}
              href="/register"
            >
              Sign in
            </Link>
          )}
        </div>
        {session?.data?.user?.email && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-12 h-12 cursor-pointer">
                <AvatarImage
                  src={session?.data?.user?.image || "/placeholder.jpg"}
                />
                <AvatarFallback>
                  <AvatarImage src="/placeholder.jpg" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              <DropdownMenuGroup>
                {profileRoutes.map((route) => (
                  <DropdownMenuItem key={route.path} className="cursor-pointer">
                    <Link
                      className="flex w-full items-center justify-between"
                      href={route.path}
                    >
                      {route.name}
                      <DropdownMenuShortcut>{route.icon}</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="w-full flex items-center justify-between"
                  >
                    Log out
                    <DropdownMenuShortcut>
                      <BsSignDeadEnd />
                    </DropdownMenuShortcut>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will sign you out!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => signOut()}
                className="bg-rose-500"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Navbar;
