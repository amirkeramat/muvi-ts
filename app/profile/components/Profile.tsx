"use client";
import getUserData from "@/actions/getUserData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/Loading";
import { format} from "date-fns";

const Profile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(),
  });

  const imgUrl = data?.image ? data?.image : "/placeholder.jpg";

  const userSignedDate =
    data?.createdAt && format(new Date(data?.createdAt!!), "MMMM yyyy");

  return (
    <div className="w-full  border-b bg-gray-100 flex flex-shrink items-center">
      <div className="container my-2">
        {isLoading && (
          <div className="w-full h-40 flex items-center justify-center">
            <Loading />
          </div>
        )}
        {data && (
          <div className="flex justify-center md:justify-normal flex-wrap">
            <Avatar className="w-32 h-32 my-2">
              <AvatarImage src={imgUrl} />
              <AvatarFallback>
                <AvatarImage src="/placeholder.jpg" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-4 p-4 mx-2">
                <h1 className="text-lg">{data?.name}</h1>
                <p className="text-muted-foreground  text-sm">
                  Member since {userSignedDate}
                </p>
              </div>
              <div className="flex flex-wrap  px-4">
                <div className="flex items-center space-x-2 m-2">
                  <div className="w-16 h-16 rounded-full border ring-2 ring-yellow-500 flex justify-center items-center">
                    {data?.watchList.length}
                  </div>
                  <h2>Watch List</h2>
                </div>
                <div className="flex items-center space-x-2 m-2">
                  <div className="w-16 h-16 rounded-full border ring-2 ring-yellow-500 flex justify-center items-center ">
                    {data?.favoriteList.length}
                  </div>
                  <h2>Favorite List</h2>
                </div>
                <div className="flex items-center space-x-2 m-2">
                  <div className="w-16 h-16 rounded-full border ring-2 ring-yellow-500 flex justify-center items-center ">
                    {data?.reviews.length}
                  </div>
                  <h2>Total reviews</h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
