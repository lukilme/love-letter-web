"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useServidor } from "@/features/servidores/use-servidor";
import { formatCurrency, formatDate } from "@/lib/formatters";

type Props = {
  matricula: string;
};

type FieldProps = {
  label: string;
  value: string;
  mono?: boolean;
};

function Field({ label, value, mono = false }: FieldProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className={`text-sm text-slate-900 ${mono ? "font-mono" : "font-medium"}`}>
        {value || "—"}
      </dd>
    </div>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
        <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
      </div>
      <dl className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
        {children}
      </dl>
    </section>
  );
}

export function ServidorDetail({ matricula }: Props) {
  const { servidor, loading, error } = useServidor(matricula);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !servidor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <p className="text-red-600 font-medium">{error ?? "Servidor não encontrado"}</p>
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar à listagem
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-6 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-5">

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar à listagem
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {servidor.nomeServidor}
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-mono">{servidor.cpfServidor}</p>
          </div>
          <span className="self-start sm:self-auto flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {servidor.situacaoServidor}
          </span>
        </div>

        <Section title="Vínculo funcional">
          <Field label="Matrícula" value={servidor.matricula} mono />
          <Field label="Cargo" value={servidor.nomeCargo} />
          <Field label="Órgão de lotação" value={servidor.orgaoLotacao} />
          <Field label="Regime contratual" value={servidor.regimeContratual} />
          <Field label="Data de admissão" value={formatDate(servidor.dataAdmissao)} />
        </Section>

        <Section title="Remuneração">
          <Field label="Salário bruto" value={formatCurrency(servidor.valorBruto)} />
          <Field label="Salário líquido" value={formatCurrency(servidor.valorLiquido)} />
        </Section>

      </div>
    </div>
  );
}
