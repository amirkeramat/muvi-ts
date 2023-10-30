import React from "react";
import Aside from "./components/Aside";
import Profile from "./components/Profile";
const ProfileSetup =  ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex flex-col  min-h-full">
      <Profile />
      <div className="flex flex-col md:flex-row flex-grow h-full container px-0 ps-2 md:ps-4">
        <Aside />
        {children}
      </div>
    </div>
  );
};

export default ProfileSetup;
