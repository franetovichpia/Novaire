"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/common/container";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-28">
      <div className="absolute inset-0 -z-20 bg-background" />

      <div className="absolute left-1/2 top-[18%] -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#d98945]/18 blur-[140px]" />

      <div className="absolute -left-20 bottom-16 -z-10 h-72 w-72 rounded-full bg-[#f1c89d]/25 blur-[110px]" />

      <Container className="flex min-h-[calc(100vh-7rem)] flex-col justify-between gap-16 pb-14">
        <div className="pt-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground"
          >
            Estudio digital
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 font-display text-[18vw] font-semibold leading-[0.82] tracking-[-0.085em] text-foreground sm:text-[14vw] lg:text-[11.5vw]"
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
              Creamos experiencias digitales...
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Diseñamos páginas web, sistemas de gestión y aplicaciones
              personalizadas con una estética clara, estratégica y moderna.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-4 lg:items-end"
          >
            <Link
              href="#contact"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition duration-300 hover:-translate-y-0.5 hover:bg-[#b9642f]"
            >
              Contanos tu proyecto
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#projects"
              className="inline-flex w-fit items-center justify-center rounded-full border border-border bg-background/70 px-7 py-4 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              Ver proyectos
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}