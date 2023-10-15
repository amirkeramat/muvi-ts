import React from "react";
import Aside from "./components/Aside";
import Profile from "./components/Profile";

const ProfileSetup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full pt-20">
      <Profile />
      <div className="flex h-full container px-0">
        <Aside />
        {children}
      </div>
    </div>
  );
};

export default ProfileSetup;
