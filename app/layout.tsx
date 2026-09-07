import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Love Letter Web",
    template: "%s | Love Letter Web",
  },
  description: "Aplicação Love Letter Web",
};

// Script inline executado antes da hidratação para evitar flash de tema errado.
// dangerouslySetInnerHTML é necessário aqui — não há alternativa para scripts inline no SSR.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (_) {}
})();
`.trim();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-text)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
