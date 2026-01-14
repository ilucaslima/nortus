import {
  FirstPageIcon,
  LastPageIcon,
  NextPageIcon,
  PrevPageIcon,
} from "@/components/ui/Icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  onFirstPage: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  canGoPrev,
  canGoNext,
  onFirstPage,
  onPrevPage,
  onNextPage,
  onLastPage,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <button
        onClick={onFirstPage}
        disabled={!canGoPrev}
        className={`p-1 ${
          canGoPrev
            ? "text-white hover:opacity-80"
            : "text-[#E9E9E9] cursor-not-allowed"
        }`}
      >
        <FirstPageIcon />
      </button>

      <button
        onClick={onPrevPage}
        disabled={!canGoPrev}
        className={`p-1 ${
          canGoPrev
            ? "text-white hover:opacity-80"
            : "text-[#E9E9E9] cursor-not-allowed"
        }`}
      >
        <PrevPageIcon />
      </button>

      <span className="mx-4 text-gray-300 font-montserrat text-sm">
        {currentPage} de {totalPages}
      </span>

      <button
        onClick={onNextPage}
        disabled={!canGoNext}
        className={`p-1 ${
          canGoNext
            ? "text-white hover:opacity-80"
            : "text-[#E9E9E9] cursor-not-allowed"
        }`}
      >
        <NextPageIcon />
      </button>

      <button
        onClick={onLastPage}
        disabled={!canGoNext}
        className={`p-1 ${
          canGoNext
            ? "text-white hover:opacity-80"
            : "text-[#E9E9E9] cursor-not-allowed"
        }`}
      >
        <LastPageIcon />
      </button>
    </div>
  );
}
