interface Props {
    page: number;
    totalPages: number;
  
    onPrevious: () => void;
    onNext: () => void;
  }
  
  export default function Pagination({
    page,
    totalPages,
    onPrevious,
    onNext,
  }: Props) {
    return (
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={onPrevious}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
  
        <span className="flex items-center">
          Page {page + 1} of {totalPages}
        </span>
  
        <button
          onClick={onNext}
          disabled={page + 1 >= totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  }