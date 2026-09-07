import type { FilterOptions } from "@/types/servidor";

type Props = {
  filters: FilterOptions;
  situacoes: string[];
  regimes: string[];
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
  onReset: () => void;
};

export function ServidoresFilters({
  filters,
  situacoes,
  regimes,
  onFilterChange,
  onReset,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3 sm:p-4 mb-3 sm:mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <div>
        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
          Situação
        </label>
        <select
          value={filters.situacao}
          onChange={(e) => onFilterChange("situacao", e.target.value)}
          className="w-full px-2 sm:px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Todas</option>
          {situacoes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
          Regime
        </label>
        <select
          value={filters.regime}
          onChange={(e) => onFilterChange("regime", e.target.value)}
          className="w-full px-2 sm:px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Todos</option>
          {regimes.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
          Salário Mín.
        </label>
        <input
          type="number"
          placeholder="0"
          value={filters.minSalary}
          onChange={(e) => onFilterChange("minSalary", e.target.value)}
          className="w-full px-2 sm:px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
          Salário Máx.
        </label>
        <input
          type="number"
          placeholder="0"
          value={filters.maxSalary}
          onChange={(e) => onFilterChange("maxSalary", e.target.value)}
          className="w-full px-2 sm:px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="col-span-2 sm:col-span-1 flex items-end">
        <button
          onClick={onReset}
          className="w-full px-3 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium transition"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}
