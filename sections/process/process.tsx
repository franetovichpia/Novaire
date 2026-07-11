"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";

const steps = [
  {
    number: "01",
    title: "Descubrimiento",
    description:
      "Conocemos el negocio, sus necesidades, objetivos y el problema que se busca resolver.",
  },
  {
    number: "02",
    title: "Estrategia",
    description:
      "Definimos alcance, funcionalidades, estructura, tiempos y una propuesta clara.",
  },
  {
    number: "03",
    title: "Diseño",
    description:
      "Creamos la experiencia visual y organizamos cada pantalla antes de comenzar el desarrollo.",
  },
  {
    number: "04",
    title: "Desarrollo",
    description:
      "Construimos la solución, integramos funcionalidades y realizamos pruebas continuas.",
  },
  {
    number: "05",
    title: "Lanzamiento",
    description:
      "Publicamos el proyecto, configuramos los servicios necesarios y acompañamos la puesta en marcha.",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-[#181614] py-28 text-white sm:py-32">
      <Container>
        <div className="[&_h2]:text-white [&_p]:text-white/60 [&_span]:text-[#e39a61]">
          <SectionHeading
            eyebrow="Nuestro proceso"
            title="Una metodología clara para convertir una idea en una solución real."
            description="Trabajamos por etapas, con comunicación constante y decisiones fundamentadas."
          />
        </div>

        <div className="mt-20">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              className="grid gap-6 border-t border-white/15 py-9 md:grid-cols-[0.25fr_0.75fr_1fr] md:items-start"
            >
              <span className="text-sm text-[#e39a61]">{step.number}</span>

              <h3 className="font-display text-3xl font-medium tracking-[-0.04em] text-white">
                {step.title}
              </h3>

              <p className="max-w-xl text-sm leading-7 text-white/55">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}