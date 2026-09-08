"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useServidor } from "@/features/servidores/use-servidor";
import { formatCurrency, formatDate } from "@/lib/formatters";

type Props = {
  matricula: string;
};

function Field({ label, value, mono = false }: { label: string; value?: string | null; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className={`text-sm text-slate-900 ${mono ? "font-mono" : "font-medium"}`}>
        {value || "—"}
      </dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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
        <Link href="/" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Voltar à listagem
        </Link>
      </div>
    );
  }

  const s = servidor;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-6 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-5">

        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar à listagem
        </Link>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {s.nomeServidor}
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-mono">{s.cpfServidor}</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {s.situacaoServidor}
            </span>
            {s.ehAposentado === "true" || s.ehAposentado === "1" ? (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                Aposentado
              </span>
            ) : null}
          </div>
        </div>

 
        <Section title="Identificação">
          <Field label="Matrícula" value={s.matricula} mono />
          <Field label="Sexo" value={s.sexo} />
          <Field label="Deficiente físico" value={s.deficienteFisico} />
          <Field label="Anos de serviço" value={s.anosServico} />
          <Field label="Data de admissão" value={formatDate(s.dataAdmissao)} />
          <Field label="Período de referência" value={s.periodo || `${s.mesReferencia}/${s.anoExercicio}`} />
        </Section>

        <Section title="Lotação e cargo">
          <Field label="Cargo" value={s.nomeCargo} />
          <Field label="Tipo de cargo" value={s.tipoCargo} />
          <Field label="Situação" value={s.situacaoServidor} />
          <Field label="Regime contratual" value={s.regimeContratual} />
          <Field label="Carga horária" value={s.cargaHorariaServidor} />
          <Field label="Escolaridade mínima" value={s.escolaridadeMinimaCargo} />
          <Field label="Administração" value={s.administracao} />
          <Field label="Poder" value={s.siglaPoder} />
          <Field label="Órgão de lotação" value={s.orgaoLotacao} />
          <Field label="Unidade de trabalho" value={s.nomeUnidadeTrabalho} />
          <Field label="Órgão em disposição" value={s.nomeOrgaoDisposicao} />
          <Field label="CNPJ do órgão" value={s.cnpjOrgao} mono />
        </Section>

        <Section title="Remuneração">
          <Field label="Vantagem fixa" value={formatCurrency(s.vantagemFixa)} />
          <Field label="Vantagem variável" value={formatCurrency(s.vantagemVariavel)} />
          <Field label="Redutor" value={formatCurrency(s.valorRedutor)} />
          <Field label="Bruto" value={formatCurrency(s.valorBruto)} />
          <Field label="Líquido" value={formatCurrency(s.valorLiquido)} />
          <Field label="Faixa de remuneração" value={s.faixaRemuneracao} />
        </Section>

        <Section title="Descontos">
          <Field label="Previdência" value={formatCurrency(s.valorPrevidenciario)} />
          <Field label="Imposto de renda" value={formatCurrency(s.valorIr)} />
          <Field label="Desconto obrigatório" value={formatCurrency(s.descontoObrigatorio)} />
          <Field label="Total de descontos" value={formatCurrency(s.valorDesconto)} />
          <Field label="Descontos (%)" value={s.descontosPercentual ? `${s.descontosPercentual}%` : undefined} />
        </Section>

      </div>
    </div>
  );
}
