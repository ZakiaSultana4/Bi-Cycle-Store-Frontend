import { ChevronsLeft, ChevronsRight } from "lucide-react";
import React from "react";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPageButtons?: number;
  darkMode?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPageButtons = 5,
  darkMode = false,
}) => {
  if (totalPages === 0) return null;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = startPage + maxPageButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const baseBtn = "px-3 py-1 rounded transition-colors duration-200 inline-flex items-center gap-1 cursor-pointer";

  const prevNextBtn = darkMode
    ? "bg-gray-700 text-white disabled:opacity-50 disabled:text-gray-500 hover:bg-gray-600"
    : "bg-gray-300 text-black disabled:opacity-50 hover:bg-gray-400";

  const pageBtnDefault = darkMode
    ? "bg-gray-800 text-white hover:bg-gray-700"
    : "bg-gray-200 text-black hover:bg-gray-300";

  const pageBtnActive = "bg-teal-500 text-white ";

  const ellipsisClass = darkMode ? "text-white px-2 py-1 " : "text-black px-2 py-1 ";

  return (
    <div className={`flex justify-center py-4 gap-2`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseBtn} ${prevNextBtn}`}
      >
        <ChevronsLeft size={20} />
        Prev
      </button>

      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`${baseBtn} ${
              currentPage === 1 ? pageBtnActive : pageBtnDefault
            }`}
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span className={ellipsisClass}>...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${baseBtn} ${
            page === currentPage ? pageBtnActive : pageBtnDefault
          }`}
        >
          {page}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className={ellipsisClass}>...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`${baseBtn} ${
              currentPage === totalPages ? pageBtnActive : pageBtnDefault
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseBtn} ${prevNextBtn}`}
      >
        Next
         <ChevronsRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
