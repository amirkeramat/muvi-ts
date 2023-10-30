import React from "react";
import Aside from "./components/Aside";
const SearchPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full">
      <div className="container h-full flex flex-col md:flex-row flex-grow p-0">
        <Aside />
        {children}
      </div>
    </div>
  );
};

export default SearchPage;
