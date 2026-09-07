import type { Servidor } from "@/types/servidor";
import { formatCurrency, formatDate } from "@/lib/formatters";

type Props = {
  rows: Servidor[];
};

export function ServidoresTableBody({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-slate-600 font-medium mb-2">Nenhum resultado encontrado</p>
        <p className="text-slate-500 text-sm">Tente ajustar seus filtros de busca</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {["Servidor", "Cargo", "Órgão", "Situação", "Salário Líquido", "Admissão"].map(
              (col, i) => (
                <th
                  key={col}
                  className={`px-6 py-3 text-sm font-semibold text-slate-700 ${
                    i >= 4 ? "text-right" : "text-left"
                  }`}
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition">
              <td className="px-6 py-4">
                <p className="font-medium text-slate-900">{row.nomeServidor}</p>
                <p className="text-xs text-slate-500 font-mono">{row.cpfServidor}</p>
              </td>
              <td className="px-6 py-4 text-slate-700">{row.nomeCargo}</td>
              <td className="px-6 py-4 text-slate-700 max-w-xs truncate">{row.orgaoLotacao}</td>
              <td className="px-6 py-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {row.situacaoServidor}
                </span>
              </td>
              <td className="px-6 py-4 text-right font-semibold text-slate-900">
                {formatCurrency(row.valorLiquido)}
              </td>
              <td className="px-6 py-4 text-right text-slate-600">
                {formatDate(row.dataAdmissao)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
