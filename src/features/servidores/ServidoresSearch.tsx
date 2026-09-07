import { Search, Filter } from "lucide-react";
import type { FilterOptions } from "@/types/servidor";

type Props = {
  searchTerm: string;
  showFilters: boolean;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
  totalCount: number;
};

export function ServidoresSearch({
  searchTerm,
  showFilters,
  onSearchChange,
  onToggleFilters,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3 sm:p-4 mb-3 sm:mb-4">
      <div className="flex gap-2 sm:gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5" />
          <input
            type="text"
            placeholder="Buscar por nome, cargo ou órgão..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <button
          onClick={onToggleFilters}
          aria-label="Alternar filtros"
          className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition ${
            showFilters
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Filtros</span>
        </button>
      </div>
    </div>
  );
}
