"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
      <h2 className="text-xl font-semibold text-[var(--color-danger)]">
        Algo deu errado
      </h2>
      <p className="text-sm text-[var(--color-text-muted)] max-w-sm">
        {error.message ?? "Ocorreu um erro inesperado. Tente novamente."}
      </p>
      <button
        onClick={retry}
        className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)]"
      >
        Tentar novamente
      </button>
    </div>
  );
}
