"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { prismadb } from "@/libs/prismadb";
const Profile = () => {
  const session = useSession();
  return (
    <div className="w-full h-48 border-b bg-gray-100">
      <div className="container my-2">
        <div className="flex">
          <Avatar className="w-32 h-32">
            <AvatarImage src={session?.data?.user?.image || ""} />
            <AvatarFallback>
              <AvatarImage src="/logo.png" />
            </AvatarFallback>
          </Avatar>
          <div className="flex p-4">
            <h1>{session?.data?.user?.name}</h1>
            <div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
