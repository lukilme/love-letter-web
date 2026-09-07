import { useEffect, useState } from "react";
import * as duckdb from "@duckdb/duckdb-wasm";
import type { Servidor } from "@/types/servidor";

type UseServidoresResult = {
  data: Servidor[];
  situacoes: string[];
  regimes: string[];
  loading: boolean;
  error: string | null;
};

export function useServidores(): UseServidoresResult {
  const [data, setData] = useState<Servidor[]>([]);
  const [situacoes, setSituacoes] = useState<string[]>([]);
  const [regimes, setRegimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const bundle = {
          mainModule: "/duckdb/duckdb-eh.wasm",
          mainWorker: "/duckdb/duckdb-browser-eh.worker.js",
          pthreadWorker: null,
        };

        const worker = new Worker(bundle.mainWorker, { type: "module" });
        const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
        await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
        const conn = await db.connect();

        const response = await fetch("/data/dados.parquet");
        if (!response.ok) throw new Error("Erro ao carregar arquivo de dados");

        const buffer = await response.arrayBuffer();
        await db.registerFileBuffer("dados.parquet", new Uint8Array(buffer));

        const result = await conn.query(`
          SELECT
            nomeServidor,
            cpfServidor,
            nomeCargo,
            situacaoServidor,
            CAST(valorBruto AS VARCHAR)    AS valorBruto,
            CAST(valorLiquido AS VARCHAR)  AS valorLiquido,
            orgaoLotacao,
            CAST(dataAdmissao AS VARCHAR)  AS dataAdmissao,
            regimeContratual
          FROM read_parquet('dados.parquet')
        `);

        const servidores = result.toArray() as Servidor[];
        setData(servidores);

        setSituacoes(
          Array.from(
            new Set(servidores.map((s) => s.situacaoServidor).filter(Boolean))
          ).sort()
        );
        setRegimes(
          Array.from(
            new Set(servidores.map((s) => s.regimeContratual).filter(Boolean))
          ).sort()
        );

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar dados");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { data, situacoes, regimes, loading, error };
}
