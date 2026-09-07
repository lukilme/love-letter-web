"use client";

import { useEffect, useState } from "react";
import * as duckdb from "@duckdb/duckdb-wasm";

type Servidor = {
  nomeServidor: string;
  nomeCargo: string;
  valorLiquido: string;
};

export default function ServidoresTable() {

  const [data, setData] = useState<Servidor[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadData() {
        
    }

    async function run() {
      const bundles = duckdb.getJsDelivrBundles();
      const bundle = {
        mainModule: "/duckdb/duckdb-eh.wasm",
        mainWorker: "/duckdb/duckdb-browser-eh.worker.js",
        pthreadWorker: null,
    };

    const worker = new Worker(
        bundle.mainWorker,
        { type: "module" }
    );
    const db = new duckdb.AsyncDuckDB(
        new duckdb.ConsoleLogger(),
        worker
    );

    await db.instantiate(
        bundle.mainModule,
        bundle.pthreadWorker
    );
    console.log("worker criado");
    const conn = await db.connect();

    const response = await fetch("/data/dados.parquet");

    const buffer = await response.arrayBuffer();

    await db.registerFileBuffer(
    "dados.parquet",
    new Uint8Array(buffer)
    );

    const result = await conn.query(`
    SELECT *
    FROM read_parquet('dados.parquet')
    LIMIT 10
    `);

    console.log(result.toArray());
    setData(result.toArray() as Servidor[]);
    }
    console.log("saindo do effect");
    run();
    loadData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Servidor</th>
          <th>Cargo</th>
          <th>Valor Líquido</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.nomeServidor}</td>
            <td>{row.nomeCargo}</td>
            <td>{row.valorLiquido}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}