"use client";
import { cn } from "@/libs/utils";
import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = generatePageNumbers();

  return (
    <>
      {totalItems > 0 ? (
        <div className="flex flex-wrap items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "px-4 py-2 rounded bg-yellow-500 text-white",
              currentPage === 1 && "bg-gray-300"
            )}
          >
            Previous
          </button>
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded border transition ${
                currentPage === page
                  ? "bg-yellow-500 text-white"
                  : "text-zinc-900 hover:bg-zinc-900 hover:text-yellow-500"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "px-4 py-2 rounded bg-yellow-500 text-white transition",
              currentPage === totalPages && "bg-gray-300"
            )}
          >
            Next
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
