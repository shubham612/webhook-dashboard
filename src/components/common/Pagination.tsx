interface PaginationProps {
    currentPage: number;
  
    totalPages: number;
  
    onPageChange: (
      page: number
    ) => void;
  }
  
  export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
  }: PaginationProps) {
    return (
      <div className="flex items-center justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
  
        <span className="text-sm text-gray-600">
          Page {currentPage} of{" "}
          {totalPages}
        </span>
  
        <button
          disabled={
            currentPage >= totalPages
          }
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  }