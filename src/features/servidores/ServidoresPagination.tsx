import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 10;

type Props = {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  totalCount: number;
  onPageChange: (page: number) => void;
};

export function ServidoresPagination({
  currentPage,
  totalPages,
  startIndex,
  totalCount,
  onPageChange,
}: Props) {
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  const end = Math.min(startIndex + ITEMS_PER_PAGE, totalCount);

  return (
    <div className="border-t border-slate-200 bg-slate-50 px-4 sm:px-6 py-3 sm:py-4">

      <div className="flex flex-col items-center gap-3 sm:hidden">
        <p className="text-xs text-slate-600">
          <span className="font-semibold">{startIndex + 1}</span>–
          <span className="font-semibold">{end}</span>{" "}
          de <span className="font-semibold">{totalCount}</span>
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </button>
          <span className="text-sm text-slate-600 font-medium">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Próxima
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="hidden sm:flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Mostrando{" "}
          <span className="font-semibold">{startIndex + 1}</span> a{" "}
          <span className="font-semibold">{end}</span>{" "}
          de <span className="font-semibold">{totalCount}</span> registros
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Próxima
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
