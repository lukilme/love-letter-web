import ServidoresTable from "@/components/ServidoresTable";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-semibold text-[var(--color-text)]">
        Love Letter Web
      </h1>
      <ThemeToggle />
      <ServidoresTable/>
    </main>
  );
}