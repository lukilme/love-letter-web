import { useMemo, useState } from "react";
import type { Servidor, FilterOptions } from "@/types/servidor";
import { EMPTY_FILTERS } from "@/types/servidor";

const ITEMS_PER_PAGE = 20;

type UseServidoresFiltersResult = {
  filters: FilterOptions;
  currentPage: number;
  filteredData: Servidor[];
  paginatedData: Servidor[];
  totalPages: number;
  startIndex: number;
  handleFilterChange: (key: keyof FilterOptions, value: string) => void;
  handleResetFilters: () => void;
  setCurrentPage: (page: number) => void;
};

export function useServidoresFilters(data: Servidor[]): UseServidoresFiltersResult {
  const [filters, setFilters] = useState<FilterOptions>(EMPTY_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    const searchLower = filters.searchTerm.toLowerCase();
    const minSal = filters.minSalary ? parseFloat(filters.minSalary) : Number.MIN_VALUE;
    const maxSal = filters.maxSalary ? parseFloat(filters.maxSalary) : Number.MAX_VALUE;

    return data.filter((s) => {
      const matchesSearch =
        !filters.searchTerm ||
        s.nomeServidor.toLowerCase().includes(searchLower) ||
        s.nomeCargo.toLowerCase().includes(searchLower) ||
        s.orgaoLotacao.toLowerCase().includes(searchLower);

      const matchesSituacao = !filters.situacao || s.situacaoServidor === filters.situacao;
      const matchesRegime = !filters.regime || s.regimeContratual === filters.regime;

      const liquido = parseFloat(
        (s.valorLiquido as unknown as string)?.toString().replace(/[^\d.-]/g, "") || "0"
      );
      const matchesSalary = liquido >= minSal && liquido <= maxSal;

      return matchesSearch && matchesSituacao && matchesRegime && matchesSalary;
    });
  }, [data, filters]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(EMPTY_FILTERS);
    setCurrentPage(1);
  };

  return {
    filters,
    currentPage,
    filteredData,
    paginatedData,
    totalPages,
    startIndex,
    handleFilterChange,
    handleResetFilters,
    setCurrentPage,
  };
}
