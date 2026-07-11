import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Novaire | Diseño y desarrollo digital",
    template: "%s | Novaire",
  },
  description:
    "Diseñamos páginas web, sistemas de gestión y aplicaciones digitales para empresas y emprendimientos.",
  keywords: [
    "desarrollo web",
    "landing pages",
    "sistemas de gestión",
    "aplicaciones móviles",
    "agencia digital",
    "Novaire",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${manrope.variable} antialiased`}
        
      >
        {children}
      </body>
    </html>
  );
}