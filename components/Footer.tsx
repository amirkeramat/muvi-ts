import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-yellow-500 dark:bg-zinc-900 border-t border-gray-400 dark:border-gray-100">
      <div className="container mx-auto py-10">
        <p className="text-center text-xs text-black dark:text-white">
          &copy; MUVI, Inc. All rights reserved by{" "}
          <Link
            target="_blank"
            href="https://amirkeramat.ir"
            className="underline underline-offset-4 animate-pulse"
          >
            Amir Keramat
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
