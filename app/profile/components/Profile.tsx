"use client";
import getUserData from "@/actions/getUserData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(),
  });

  
  const session = useSession();

  return (
    <div className="w-full h-40 border-b bg-gray-100 flex items-center">
      <div className="container my-2">
        <div className="flex">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={session?.data?.user?.image || "/placeholder.jpg"}
            />
            <AvatarFallback>
              <AvatarImage src="/placeholder.jpg" />
            </AvatarFallback>
          </Avatar>
          <div className="flex p-4">
            <h1>{session?.data?.user?.name}</h1>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
