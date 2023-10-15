"use client";

import { cn } from "@/libs/utils";
import { useState } from "react";

interface ToggleProps {
  titles: string[];
  onClick: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ titles, onClick }) => {
  const [isActive, setIsActive] = useState(titles[0]);

  return (
    <div className="h-8 flex items-center rounded-xl border">
      <div className="flex items-center h-full">
        {titles.map((title) => (
          <button
            className={cn(
              "text-zinc-900 rounded-xl h-full px-8",
              isActive === title && "text-zinc-900 bg-yellow-500"
            )}
            onClick={() => {
              onClick();
              setIsActive(title);
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
