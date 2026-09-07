import { useEffect, useState } from "react";
import * as duckdb from "@duckdb/duckdb-wasm";
import type { Servidor } from "@/types/servidor";

type UseServidorResult = {
  servidor: Servidor | null;
  loading: boolean;
  error: string | null;
};

export function useServidor(matricula: string): UseServidorResult {
  const [servidor, setServidor] = useState<Servidor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matricula) return;

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

        const stmt = await conn.prepare(`
          SELECT
            matricula,
            nomeServidor,
            cpfServidor,
            nomeCargo,
            situacaoServidor,
            CAST(valorBruto   AS VARCHAR) AS valorBruto,
            CAST(valorLiquido AS VARCHAR) AS valorLiquido,
            orgaoLotacao,
            CAST(dataAdmissao AS VARCHAR) AS dataAdmissao,
            regimeContratual
          FROM read_parquet('dados.parquet')
          WHERE matricula = ?
          LIMIT 1
        `);

        const result = await stmt.query(matricula);
        const rows = result.toArray() as Servidor[];

        if (rows.length === 0) {
          setError("Servidor não encontrado");
        } else {
          setServidor(rows[0]);
        }

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar dados");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [matricula]);

  return { servidor, loading, error };
}
