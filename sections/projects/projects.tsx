"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { projects } from "@/data/site";

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Proyectos"
            title="Un portfolio en constante crecimiento."
            description="Cada proyecto combina una necesidad real, una identidad visual propia y una solución pensada para escalar."
          />

          <a
            href="#booking"
            className="inline-flex w-fit items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold"
          >
            Empezar un proyecto
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem]"
            >
              <div
                className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${project.tint}`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    aria-hidden="true"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="scale-125 object-cover opacity-70 saturate-150 blur-2xl transition duration-700 group-hover:scale-[1.35]"
                  />
                ) : null}
              </div>

              <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/15" />

              <div className="relative flex h-full flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/85 backdrop-blur-md">
                    {project.label}
                  </span>

                  <a
                    href="#booking"
                    aria-label={`Consultar por un proyecto similar a ${project.title}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100 group-hover:bg-accent group-hover:text-accent-foreground"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="project-glass rounded-[1.25rem] p-5">
                  <p className="text-xs font-medium text-white/70">
                    {project.category}
                  </p>

                  <h3
                    className="font-evolve mt-2 text-2xl font-medium tracking-[-0.02em] text-accent-glow sm:text-[1.7rem]"
                    style={{ color: "#fff1b5" }}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-xs leading-6 text-white/75">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
