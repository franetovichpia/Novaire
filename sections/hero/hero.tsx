"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/common/container";

const highlights = [
  "Proyectos entregados a medida",
  "Diseño + desarrollo en un solo equipo",
  "Reunión inicial sin costo",
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-28">
      <div className="absolute inset-0 -z-20 bg-background" />

      <div className="absolute left-1/2 top-[18%] -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#d98945]/18 blur-[140px]" />

      <div className="absolute -left-20 bottom-16 -z-10 h-72 w-72 rounded-full bg-accent/30 blur-[110px]" />

      <Container className="flex min-h-[calc(100vh-7rem)] flex-col justify-between gap-14 pb-14">
        <div className="pt-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-foreground" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Estudio digital
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 font-display text-[17vw] font-semibold leading-[0.82] tracking-[-0.085em] text-foreground sm:text-[13vw] lg:text-[10.5vw]"
          >
            NOVAIRE
          </motion.h1>
        </div>

        <div className="grid gap-10 pb-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="max-w-4xl font-display text-4xl font-medium leading-tight tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
              Tu negocio, con una presencia digital que{" "}
              <span className="text-primary">vende</span>.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Diseñamos y desarrollamos sitios web, sistemas de gestión y
              aplicaciones a medida, pensados para captar clientes desde el
              primer segundo.
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-4 lg:items-end"
          >
            <Link
              href="#booking"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition duration-300 hover:-translate-y-0.5 hover:bg-[#b9642f]"
            >
              Agendar una reunión
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#projects"
              className="inline-flex w-fit items-center justify-center rounded-full border border-border bg-background/70 px-7 py-4 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              Ver portfolio
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
