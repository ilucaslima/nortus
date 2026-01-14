import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Verificar se a rota é protegida (dashboard)
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Verificar se existe token de autenticação
    const token = request.cookies.get("auth-token");

    if (!token) {
      // Redirecionar para login se não autenticado
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Se já logado e tentando acessar login ou registro, redirecionar para dashboard
  if (
    (request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/registro") &&
    request.cookies.get("auth-token")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/", "/registro"],
};
