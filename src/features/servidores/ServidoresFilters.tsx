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
    <div className="border-t border-slate-200 pt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-white rounded-b-lg px-4 pb-4 -mt-2 mb-6 shadow-sm border border-t-0 border-slate-200">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Situação</label>
        <select
          value={filters.situacao}
          onChange={(e) => onFilterChange("situacao", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Todas</option>
          {situacoes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Regime</label>
        <select
          value={filters.regime}
          onChange={(e) => onFilterChange("regime", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Todos</option>
          {regimes.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Salário Mín. (R$)</label>
        <input
          type="number"
          placeholder="0"
          value={filters.minSalary}
          onChange={(e) => onFilterChange("minSalary", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Salário Máx. (R$)</label>
        <input
          type="number"
          placeholder="0"
          value={filters.maxSalary}
          onChange={(e) => onFilterChange("maxSalary", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex items-end">
        <button
          onClick={onReset}
          className="w-full px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium transition"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
