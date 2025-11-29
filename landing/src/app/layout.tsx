// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QubitCoin - The Post-Quantum Standard",
  description: "La primera criptomoneda basada en el algoritmo RubikPoW, verdaderamente segura contra amenazas cuánticas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}