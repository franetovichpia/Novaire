"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";

const projects = [
  {
    title: "La Piccola",
    category: "Aplicación móvil · Gastronomía",
    description:
      "Aplicación para gestionar operaciones de un restaurante, con menú, panel administrativo, reportes y comunicación con clientes.",
    gradient:
      "from-[#f2d0b5] via-[#f7e9dc] to-[#d98a50]",
    label: "Mobile app",
  },
  {
    title: "Sonrisa Odonto",
    category: "Landing page · Salud",
    description:
      "Sitio web profesional para una clínica odontológica, diseñado para presentar servicios y generar nuevas consultas.",
    gradient:
      "from-[#ded9cf] via-[#f7f5ef] to-[#c4b7a5]",
    label: "Landing page",
  },
  {
    title: "ArqStudio",
    category: "Sitio web · Arquitectura",
    description:
      "Experiencia editorial orientada a mostrar proyectos, servicios y la identidad de un estudio de arquitectura.",
    gradient:
      "from-[#d8cec4] via-[#f8f3ee] to-[#a78b74]",
    label: "Portfolio",
  },
  {
    title: "RedLine",
    category: "Plataforma Full Stack · Automovilismo",
    description:
      "Red social con autenticación, publicaciones, comentarios, panel administrativo y aplicación móvil.",
    gradient:
      "from-[#24211f] via-[#57504b] to-[#d1763e]",
    label: "Full Stack",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-28 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Proyectos"
            title="Ideas transformadas en productos digitales concretos."
            description="Cada proyecto combina una necesidad real, una identidad visual clara y una solución pensada para crecer."
          />

          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold"
          >
            Empezar un proyecto
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-16 space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="group grid overflow-hidden rounded-[2rem] border border-border bg-card lg:grid-cols-[1.3fr_0.7fr]"
            >
              <div
                className={`relative min-h-[370px] overflow-hidden bg-gradient-to-br ${project.gradient} sm:min-h-[470px]`}
              >
                <div className="absolute inset-7 rounded-[1.5rem] border border-white/30 bg-white/10 p-5 shadow-2xl backdrop-blur-md sm:inset-10">
                  <div className="flex items-center justify-between border-b border-white/30 pb-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
                      Novaire project
                    </span>

                    <span className="rounded-full bg-white/50 px-3 py-1 text-xs text-black/60 backdrop-blur">
                      {project.label}
                    </span>
                  </div>

                  <div className="flex h-[calc(100%-3rem)] items-center justify-center">
                    <span className="font-display text-5xl font-medium tracking-[-0.06em] text-black/75 sm:text-7xl">
                      {project.title}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                <div>
                  <span className="text-sm text-muted-foreground">
                    {project.category}
                  </span>

                  <h3 className="mt-5 font-display text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                    {project.title}
                  </h3>

                  <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
                  <span className="text-sm text-muted-foreground">
                    Proyecto {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}