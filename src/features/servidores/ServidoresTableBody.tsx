import Link from "next/link";
import type { Servidor } from "@/types/servidor";
import { formatCurrency, formatDate } from "@/lib/formatters";

type Props = {
  rows: Servidor[];
};

function servidorHref(matricula: string) {
  return `/servidores/${encodeURIComponent(matricula)}`;
}

export function ServidoresTableBody({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="p-8 sm:p-12 text-center">
        <p className="text-slate-600 font-medium mb-1">Nenhum resultado encontrado</p>
        <p className="text-slate-500 text-sm">Tente ajustar seus filtros de busca</p>
      </div>
    );
  }

  return (
    <>
      <ul className="divide-y divide-slate-200 md:hidden">
        {rows.map((row, index) => (
          <li key={index}>
            <Link
              href={servidorHref(row.matricula)}
              className="block px-4 py-4 space-y-2 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-blue-600 text-sm leading-snug truncate underline-offset-2 hover:underline">
                    {row.nomeServidor}
                  </p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{row.cpfServidor}</p>
                </div>
                <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {row.situacaoServidor}
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-0.5">
                <p className="truncate">
                  <span className="font-medium text-slate-700">Cargo:</span> {row.nomeCargo}
                </p>
                <p className="truncate">
                  <span className="font-medium text-slate-700">Órgão:</span> {row.orgaoLotacao}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-xs text-slate-500">Salário líquido</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatCurrency(row.valorLiquido)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Admissão</p>
                  <p className="text-sm text-slate-700">{formatDate(row.dataAdmissao)}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* ── Desktop: tabela completa ────────────────────────────────── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {[
                ["Servidor", "text-left"],
                ["Cargo", "text-left"],
                ["Órgão", "text-left"],
                ["Situação", "text-left"],
                ["Salário Líquido", "text-right"],
                ["Admissão", "text-right"],
              ].map(([col, align]) => (
                <th
                  key={col}
                  className={`px-6 py-3 text-sm font-semibold text-slate-700 ${align}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <Link
                    href={servidorHref(row.matricula)}
                    className="font-medium text-blue-600 hover:underline underline-offset-2"
                  >
                    {row.nomeServidor}
                  </Link>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{row.cpfServidor}</p>
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
    </>
  );
}
