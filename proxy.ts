import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Ponto central para lógica de redirecionamento, autenticação e reescrita de rotas.
  // Exemplo: proteger rotas privadas
  // const token = request.cookies.get("session")?.value;
  // if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Executa em todas as rotas exceto assets estáticos e otimizações internas
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
