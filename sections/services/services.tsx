"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  LayoutDashboard,
  Palette,
  ShoppingBag,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/common/container";

type Service = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  background: string;
  foreground: string;
  muted: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Landing pages",
    description:
      "Sitios estratégicos para presentar servicios, generar confianza y transformar visitas en consultas reales.",
    icon: Code2,
    features: [
      "Diseño personalizado",
      "Responsive",
      "WhatsApp",
      "Formularios",
    ],
    background: "bg-[#1b1816]",
    foreground: "text-white",
    muted: "text-white/55",
  },
  {
    number: "02",
    title: "Sistemas de gestión",
    description:
      "Herramientas internas para organizar clientes, ventas, trámites, stock y procesos cotidianos.",
    icon: LayoutDashboard,
    features: [
      "Dashboard",
      "Usuarios",
      "Reportes",
      "Automatizaciones",
    ],
    background: "bg-[#d77a3b]",
    foreground: "text-white",
    muted: "text-white/70",
  },
  {
    number: "03",
    title: "E-commerce",
    description:
      "Tiendas online modernas y claras, diseñadas para facilitar la compra y administrar productos.",
    icon: ShoppingBag,
    features: ["Catálogo", "Carrito", "Pagos", "Administración"],
    background: "bg-[#ead8c7]",
    foreground: "text-[#1b1816]",
    muted: "text-[#1b1816]/60",
  },
  {
    number: "04",
    title: "Aplicaciones móviles",
    description:
      "Aplicaciones multiplataforma conectadas a servicios cloud y adaptadas a cada negocio.",
    icon: Smartphone,
    features: ["Android", "PWA", "Notificaciones", "Cloud"],
    background: "bg-[#f8f3ed]",
    foreground: "text-[#1b1816]",
    muted: "text-[#756b63]",
  },
  {
    number: "05",
    title: "Diseño digital",
    description:
      "Interfaces funcionales y coherentes que reflejan la identidad y personalidad de cada marca.",
    icon: Palette,
    features: ["UI/UX", "Wireframes", "Prototipos", "Identidad"],
    background: "bg-[#b9a493]",
    foreground: "text-white",
    muted: "text-white/65",
  },
  {
    number: "06",
    title: "Automatizaciones",
    description:
      "Soluciones para reducir tareas repetitivas, mejorar tiempos y simplificar operaciones internas.",
    icon: Workflow,
    features: ["Emails", "Alertas", "Formularios", "Procesos"],
    background: "bg-[#27221f]",
    foreground: "text-white",
    muted: "text-white/55",
  },
];

export function Services() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    const distance = container.clientWidth * 0.55;
    

    container.scrollBy({
      left: direction === "right" ? distance : -distance,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="services"
      className="overflow-hidden bg-secondary/35 py-28 sm:py-32"
    >
      <Container>
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Nuestros servicios
          </span>

          <h2 className="mt-5 font-display text-4xl font-medium leading-tight tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Soluciones digitales que se adaptan a cada etapa de un negocio.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Diseñamos y desarrollamos productos pensados para comunicar,
            vender, organizar y simplificar procesos.
          </p>
        </div>
      </Container>

      <div className="relative mt-16">
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Ver servicios anteriores"
          className="absolute left-3 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:border-primary hover:bg-primary hover:text-primary-foreground md:flex lg:left-8"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Ver siguientes servicios"
          className="absolute right-3 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:border-primary hover:bg-primary hover:text-primary-foreground md:flex lg:right-8"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-5 sm:px-8 md:px-20 lg:px-[max(6rem,calc((100vw-72rem)/2))]"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.05,
                }}
            className={`group relative flex min-h-[430px] w-[78vw] max-w-[360px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[2rem] p-6 sm:w-[350px] sm:p-7 ${service.background} ${service.foreground}`}              >
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-current opacity-10" />

                <div className="absolute -right-7 -top-7 h-32 w-32 rounded-full border border-current opacity-10 transition-transform duration-500 group-hover:scale-125" />

                <div>
                  <div className="flex items-start justify-between">
                    <span className={`text-sm font-medium ${service.muted}`}>
                      {service.number}
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-current/20 bg-white/10 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-14 max-w-[280px] font-display text-3xl font-medium leading-none tracking-[-0.05em] sm:text-4xl">
                    {service.title}
                  </h3>

                  <p className={`mt-6 text-sm leading-7 ${service.muted}`}>
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="mb-7 h-px w-full bg-current opacity-15" />

                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-current/20 px-3 py-1.5 text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <span
                      className={`text-xs uppercase tracking-[0.18em] ${service.muted}`}
                    >
                      Explorar servicio
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-current/20 transition-transform duration-300 group-hover:-rotate-45">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}

          <div className="w-2 shrink-0 sm:w-8" aria-hidden="true" />
        </div>
      </div>

      <Container>
        <div className="mt-2 flex items-center gap-4">
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Deslizá o usá las flechas
          </span>

          <div className="h-px flex-1 bg-border" />

          <ArrowRight className="h-4 w-4 text-primary" />
        </div>
      </Container>
    </section>
  );
}