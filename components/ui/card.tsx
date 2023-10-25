"use client";
import Image from "next/image";
import React, { useState } from "react";
import { POSTER_ORIGINAL } from "@/helpers/imageUrls";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { Media } from "@/types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BsHeart, BsList, BsSaveFill } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";

interface CardProps {
  data: Media;
  mediaType?: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ data, onClick, mediaType }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const session = useSession();
  const {
    id,
    original_name,
    original_title,
    vote_average,
    release_date,
    first_air_date,
    backdrop_path,
    media_type,
  } = data;

  const dateFormatter = () => {
    if (release_date) return format(new Date(release_date!), "MMM dd yyyy");
    else return format(new Date(first_air_date!), "MMM dd yyyy");
  };

  const title = () => {
    if (media_type === "movie" || mediaType) {
      return original_title;
    } else {
      return original_name;
    }
  };

  const actionHandler = async (list: string) => {
    try {
      if (!session?.data?.user?.email) {
        toast.error("you have to logged in first");
      } else {
        const data = {
          title: title(),
          mediaId: id.toString(),
          mediaType: media_type || mediaType,
          userEmail: session?.data?.user?.email,
        };
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
    }
  };

  return (
    <div
      className={cn(
        `h-[22rem] w-40 mt-4 relative transition `,
        modalOpen && "after:absolute "
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="text-xl absolute z-30 outline-none right-2 top-2 bg-zinc-500 h-8 w-8 rounded-full pb-4 focus:outline-none focus-visible:ring-0">
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex justify-between items-center">
              Add to List
              <BsList size={16} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => actionHandler("favoriteList")}
            >
              Favorite
              <DropdownMenuShortcut>
                <BsHeart size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => actionHandler("watchList")}
            >
              WatchList
              <DropdownMenuShortcut>
                <BsSaveFill size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="h-56 w-40 relative rounded-md ">
        <div className="w-8 h-8 flex justify-center items-center rounded-full absolute -bottom-4 left-4 bg-zinc-900 ring-4 text-zinc-50 ring-yellow-500 z-30">
          {vote_average.toFixed(1)}
        </div>
        <Image
          fill
          alt="card-image"
          className="w-full h-full object-cover rounded-md"
          src={`${POSTER_ORIGINAL}/${backdrop_path}`}
        />
        <Link
          className="absolute inset-0 z-20"
          href={`/${media_type || mediaType}/${id}`}
        />
      </div>
      <div className="mt-6 space-y-2 flex flex-col justify-center items-center">
        <h6 className="text-sm font-semibold">{title()}</h6>
        <h5 className="text-xs">{dateFormatter()}</h5>
      </div>
    </div>
  );
};

export default Card;
