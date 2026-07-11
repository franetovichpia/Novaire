import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";

const questions = [
  {
    question: "¿Cuánto tarda un proyecto?",
    answer:
      "Depende del alcance. Una landing page puede desarrollarse en pocas semanas, mientras que un sistema de gestión o una aplicación requiere más tiempo de análisis, diseño y desarrollo.",
  },
  {
    question: "¿Trabajan con proyectos personalizados?",
    answer:
      "Sí. Cada propuesta se adapta a las necesidades, objetivos y presupuesto del proyecto. No utilizamos una única solución para todos los negocios.",
  },
  {
    question: "¿Puedo solicitar solo diseño o solo desarrollo?",
    answer:
      "Sí. Podemos trabajar en el proceso completo o participar únicamente en una etapa específica, según lo que necesite el proyecto.",
  },
  {
    question: "¿Incluyen diseño responsive?",
    answer:
      "Sí. Todos los sitios y sistemas se diseñan para funcionar correctamente en computadoras, tablets y dispositivos móviles.",
  },
  {
    question: "¿Ofrecen mantenimiento?",
    answer:
      "Sí. Podemos acordar soporte, mejoras, actualizaciones y mantenimiento luego de la entrega inicial.",
  },
  {
    question: "¿Cómo se inicia un proyecto?",
    answer:
      "El primer paso es una conversación para conocer la idea. Luego preparamos una propuesta con alcance, etapas, tiempos y presupuesto.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-secondary/40 py-28 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Información clara antes de comenzar."
            description="Estas son algunas de las dudas más comunes sobre nuestra forma de trabajo."
          />

          <div className="divide-y divide-border border-y border-border">
            {questions.map((item, index) => (
              <details key={item.question} className="group py-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <span className="text-xs text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-lg font-semibold">
                      {item.question}
                    </h3>
                  </div>

                  <span className="text-2xl font-light transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="ml-10 mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}