"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Profile from "./components/Profile";
import { useRouter } from "next/navigation";
const ProfilePage = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session?.data?.user?.email) {
      router.push("/register");
    }
  }, [session?.data?.user?.email, router]);
  return (
    <div className="w-full h-full">
      <div className="container p-0 h-full">profile</div>
    </div>
  );
};

export default ProfilePage;
