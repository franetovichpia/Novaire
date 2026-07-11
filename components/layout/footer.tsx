import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { navigation, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-[#181614] py-14 text-white">
      <Container>
        <div className="grid gap-14 border-b border-white/15 pb-14 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <Link
              href="/"
              className="font-display text-5xl font-medium tracking-[-0.06em] text-white sm:text-6xl"
            >
              Novaire
            </Link>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/50">
              Diseño y desarrollo de soluciones digitales para empresas,
              profesionales y emprendimientos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                Navegación
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                Contacto
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white"
                >
                  WhatsApp
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white"
                >
                  Email
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href={siteConfig.instagram}
                  className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white"
                >
                  Instagram
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-7 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Novaire. Todos los derechos reservados.
          </p>

          <p>Diseñado y desarrollado por Novaire.</p>
        </div>
      </Container>
    </footer>
  );
}