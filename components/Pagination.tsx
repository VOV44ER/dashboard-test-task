import React from "react";

interface Props {
  totalPages: number;
  currentPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  setCurrentPage: (pageNumber: number) => void;
  rangeStart: number;
  rangeEnd: number;
  totalItems: number;
}

const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  handlePreviousPage,
  handleNextPage,
  setCurrentPage,
  rangeStart,
  rangeEnd,
  totalItems,
}) => {
  return (
    <div className="mt-4 flex flex-col items-center gap-3">
      <div className="text-black">{`Showing ${rangeStart} - ${rangeEnd} of ${totalItems}`}</div>
      <div>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 mr-2 bg-green-500 text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`px-3 py-1 mx-1 bg-green-500 text-white rounded ${
                currentPage === pageNumber ? "bg-green-700" : ""
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 ml-2 bg-green-500 text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
