// middleware.ts - Simplificado para la versión en inglés únicamente
export function middleware(request: Request) {
  // No realizar redirecciones ni manipulaciones basadas en idioma
  return null; // Permitir que la solicitud continúe normalmente
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};