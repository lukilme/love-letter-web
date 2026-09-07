import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 – Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
      <h1 className="text-5xl font-bold text-[var(--color-text)]">404</h1>
      <h2 className="text-xl font-semibold text-[var(--color-text)]">
        Página não encontrada
      </h2>
      <p className="text-sm text-[var(--color-text-muted)] max-w-sm">
        O recurso que você está buscando não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)]"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
