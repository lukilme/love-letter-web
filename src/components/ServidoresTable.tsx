"use client";

import { useState } from "react";
import { useServidores } from "@/features/servidores/use-servidores";
import { useServidoresFilters } from "@/features/servidores/use-servidores-filters";
import { ServidoresSearch } from "@/features/servidores/ServidoresSearch";
import { ServidoresFilters } from "@/features/servidores/ServidoresFilters";
import { ServidoresTableBody } from "@/features/servidores/ServidoresTableBody";
import { ServidoresPagination } from "@/features/servidores/ServidoresPagination";

export default function ServidoresTable() {
  const { data, situacoes, regimes, loading, error } = useServidores();
  const {
    filters,
    currentPage,
    filteredData,
    paginatedData,
    totalPages,
    startIndex,
    handleFilterChange,
    handleResetFilters,
    setCurrentPage,
  } = useServidoresFilters(data);

  const [showFilters, setShowFilters] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-700 font-semibold mb-2">Erro ao carregar dados</p>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Portal de Transparência
          </h1>
          <p className="text-slate-600">
            Dados públicos de servidores —{" "}
            <span className="font-semibold text-slate-700">
              {filteredData.length}
            </span>{" "}
            registro{filteredData.length !== 1 ? "s" : ""} encontrado
            {filteredData.length !== 1 ? "s" : ""}
          </p>
        </div>

        <ServidoresSearch
          searchTerm={filters.searchTerm}
          showFilters={showFilters}
          onSearchChange={(v) => handleFilterChange("searchTerm", v)}
          onToggleFilters={() => setShowFilters((prev) => !prev)}
          totalCount={filteredData.length}
        />

        {showFilters && (
          <ServidoresFilters
            filters={filters}
            situacoes={situacoes}
            regimes={regimes}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        )}

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <ServidoresTableBody rows={paginatedData} />
          {filteredData.length > 0 && (
            <ServidoresPagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              totalCount={filteredData.length}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

      </div>
    </div>
  );
}
