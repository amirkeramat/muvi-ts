"use client";
import Image from "next/image";
import { POSTER_ORIGINAL } from "@/helpers/imageUrls";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { format } from "date-fns";
import { BsTrash3 } from "react-icons/bs";
import { mediaList } from "@/types/index";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface CardProps {
  data: mediaList;
  onClick: (mediaId: string) => void;
  loading:boolean
}

const ProfileCard: React.FC<CardProps> = ({ data, onClick ,loading}) => {
  const {
    mediaType,
    mediaId,
    original_name,
    original_title,
    release_date,
    first_air_date,
    backdrop_path,
    vote_average,
  } = data;

  const dateFormatter = () => {
    if (release_date) return format(new Date(release_date!), "MMM dd yyyy");
    else return format(new Date(first_air_date!), "MMM dd yyyy");
  };

  const title = () => {
    if (mediaType === "movie") {
      return original_title;
    } else {
      return original_name;
    }
  };

  return (
    <div
      className={cn(
        `h-[22rem] w-52 mt-4 relative transition border rounded-md hover:scale-105 cursor-pointer group`
      )}
    >
      <div className="h-56 w-52 relative rounded-md ">
        <div className="w-8 h-8 flex justify-center items-center rounded-full absolute -bottom-4 left-4 bg-zinc-900 ring-4 text-zinc-50 ring-yellow-500 z-30">
          {Number(vote_average).toFixed(1)}
        </div>
        <Image
          fill
          alt="card-image"
          className="w-full h-full object-cover rounded-md"
          src={`${POSTER_ORIGINAL}/${backdrop_path}`}
        />
      </div>
      <div className="mt-6 space-y-2 flex flex-col justify-center items-center">
        <h6 className="text-sm font-semibold">{title()}</h6>
        <h5 className="text-xs">{dateFormatter()}</h5>
      </div>
      <Link
        className="absolute inset-0 z-20"
        href={`/${mediaType}/${mediaId}`}
      />
      <div className="absolute transition  right-2 bottom-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-30">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button disabled={loading} className="bg-rose-100 p-2 rounded-full">
              <BsTrash3 color="red" size={16} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action delete this {mediaType} show from your List!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onClick(mediaId)}
                disabled={loading}
                className={cn("bg-rose-500")}
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

export default ProfileCard;
