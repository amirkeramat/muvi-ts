"use client";

import Card from "@/components/ui/card";
import Toggle from "@/components/ui/toggle";
import Image from "next/image";

const Trending = () => {
  const toggleHandler = () => {};

  return (
    <div className="h-96 mt-6">
      <div className="flex items-center space-x-10">
        <h1 className="font-bold text-2xl ms-12">Trending</h1>
        <Toggle titles={["Today", "ThisWeek"]} onClick={toggleHandler} />
      </div>
      <div className="relative h-full">
        <Image
          fill
          alt="background"
          src={"/bar.svg"}
          className="w-full h-full absolute inset-0 z-0"
        />
        <div className="flex items-center px-12">
          <Card
            title="Talk to me"
            id={222}
            onClick={() => {}}
            image="628Dep6AxEtDxjZoGP78TsOxYbK.jpg"
            date="2023/2/2"
          />
        </div>
      </div>
    </div>
  );
};

export default Trending;
