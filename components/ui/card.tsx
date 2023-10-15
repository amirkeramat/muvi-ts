"use client";
import Image from "next/image";
import React, { useState } from "react";
import { POSTER_ORIGINAL } from "@/helpers/imageUrls";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { cn } from "@/libs/utils";
interface CardProps {
  id: number;
  image: string;
  title: string;
  date: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  id,
  image,
  title,
  date,
  onClick,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={cn(`h-80 w-40 mt-4 relative transition `,modalOpen && "after:absolute after:bg-zinc-900/95 after:inset-0 after:content-[''] after:w-40 after:z-50 after:rounded-md")}>
      <div className="h-56 w-40 relative rounded-md ">
        <div className="w-6 h-6 bg-zinc-300 rounded-full flex justify-center items-center absolute right-2 top-2 z-30" onClick={()=>setModalOpen(true)}>
          <BsThreeDots />
        </div>
        <div className="w-8 h-8 flex justify-center items-center rounded-full absolute -bottom-4 left-4 bg-zinc-900 ring-4 text-zinc-50 ring-yellow-500 z-30">
          71
        </div>
        <Image
          fill
          alt="card-image"
          className="w-full h-full object-cover rounded-md"
          src={`${POSTER_ORIGINAL}/${image}`}
        />
        <Link className="absolute inset-0 z-20" href={`/media_type/${id}`} />
      </div>
      <div className="mt-6 flex flex-col justify-center items-center">
        <h6>{title}</h6>
        <h5>{date}</h5>
      </div>
    </div>
  );
};

export default Card;
