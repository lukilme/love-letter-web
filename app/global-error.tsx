"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white text-center font-sans dark:bg-zinc-950">
        <h2 className="text-xl font-semibold text-red-600">
          Erro crítico na aplicação
        </h2>
        <p className="text-sm text-zinc-500 max-w-sm">
          {error.message ?? "Ocorreu um erro inesperado."}
        </p>
        <button
          onClick={retry}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}
