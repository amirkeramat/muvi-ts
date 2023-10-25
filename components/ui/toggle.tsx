"use client";

import { cn } from "@/libs/utils";
import { useState } from "react";

interface ToggleProps {
  className?: string;
  titles: string[];
  onClick: (title: string) => void;
}

const Toggle: React.FC<ToggleProps> = ({ titles, onClick, className }) => {
  const [isActive, setIsActive] = useState(titles[0]);

  const titleHandler = (title: string) => {
    if (title === "ThisWeek") {
      return `week`;
    } else if (title === "Today") {
      return "day";
    } else if (title === "Movie") {
      return "movie";
    } else if (title === "On Tv") {
      return "tv";
    } else {
      return title;
    }
  };

  return (
    <div className="h-8 flex items-center rounded-xl border border-yellow-500 bg-transparent">
      <div className="flex items-center h-full">
        {titles.map((title) => (
          <button
            className={cn(
              "text-zinc-900 rounded-xl h-full px-2 md:px-8",
              isActive === title && "text-zinc-900 bg-yellow-500",
              className
            )}
            onClick={() => {
              setIsActive(title);
              onClick(titleHandler(title));
            }}
            key={title}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
