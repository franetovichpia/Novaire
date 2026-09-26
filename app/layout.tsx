import type { Metadata } from "next";
import { Playfair_Display, Manrope, Space_Grotesk } from "next/font/google";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Stand-in for Novaire's "Evolve Sans" brand typeface, used for project
// names in the portfolio. Swap for the licensed font via next/font/local
// when the font files are available.
const evolveSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-evolve",
});

const themeScript = `
  (function () {
    try {
      var stored = window.localStorage.getItem("novaire-theme");
      var theme = stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      document.documentElement.setAttribute("data-theme", theme);
    } catch (error) {}
  })();
`;

export const metadata: Metadata = {
  title: {
    default: "Novaire Studio | Diseño y desarrollo digital",
    template: "%s | Novaire Studio",
  },
  description:
    "Estudio digital que diseña y desarrolla páginas web, sistemas de gestión y aplicaciones. Agendá una reunión y contanos tu proyecto.",
  keywords: [
    "desarrollo web",
    "landing pages",
    "sistemas de gestión",
    "aplicaciones móviles",
    "agencia digital",
    "estudio de diseño",
    "Novaire",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${playfair.variable} ${manrope.variable} ${evolveSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}