import * as duckdb from "@duckdb/duckdb-wasm";

let connection: any = null;

export async function getConnection() {
  if (connection) return connection;

  const bundle = await duckdb.selectBundle(
    duckdb.getJsDelivrBundles()
  );

  const worker = new Worker(bundle.mainWorker!);

  const db = new duckdb.AsyncDuckDB(
    new duckdb.ConsoleLogger(),
    worker
  );

  await db.instantiate(
    bundle.mainModule,
    bundle.pthreadWorker
  );

  connection = await db.connect();

  return connection;
}