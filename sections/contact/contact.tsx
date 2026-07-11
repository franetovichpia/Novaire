"use client";

import { FormEvent } from "react";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

import { Container } from "@/components/common/container";
import { siteConfig } from "@/data/site";

export function Contact() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const business = formData.get("business");
    const service = formData.get("service");
    const message = formData.get("message");

    const text = encodeURIComponent(
      `Hola, soy ${name}.\n\nNegocio o proyecto: ${business}\nServicio: ${service}\n\n${message}`,
    );

    window.open(`${siteConfig.whatsapp}?text=${text}`, "_blank");
  }

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-32">
      <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />

      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Contacto
            </span>

            <h2 className="mt-5 font-display text-5xl font-medium leading-[1.02] tracking-[-0.055em] sm:text-6xl">
              Contanos qué querés crear.
            </h2>

            <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">
              Compartinos tu idea, necesidad o proyecto. Vamos a analizarlo y
              conversar sobre la mejor forma de convertirlo en una solución
              digital.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="mt-1 font-semibold">Enviar un mensaje</p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="mt-1 font-semibold">{siteConfig.email}</p>
                </div>
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-border bg-card p-7 shadow-soft sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium">Nombre</span>

                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  className="h-14 w-full rounded-2xl border border-border bg-background px-4 text-sm"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">
                  Negocio o proyecto
                </span>

                <input
                  required
                  name="business"
                  type="text"
                  placeholder="Nombre del negocio"
                  className="h-14 w-full rounded-2xl border border-border bg-background px-4 text-sm"
                />
              </label>
            </div>

            <label className="mt-6 block space-y-2">
              <span className="text-sm font-medium">
                Servicio que necesitás
              </span>

              <select
                required
                name="service"
                defaultValue=""
                className="h-14 w-full rounded-2xl border border-border bg-background px-4 text-sm"
              >
                <option value="" disabled>
                  Seleccionar servicio
                </option>

                <option>Landing page</option>
                <option>Sistema de gestión</option>
                <option>E-commerce</option>
                <option>Aplicación móvil</option>
                <option>Diseño digital</option>
                <option>Otro</option>
              </select>
            </label>

            <label className="mt-6 block space-y-2">
              <span className="text-sm font-medium">
                Contanos sobre tu idea
              </span>

              <textarea
                required
                name="message"
                rows={6}
                placeholder="¿Qué necesitás desarrollar?"
                className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm"
              />
            </label>

            <button
              type="submit"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-[#b9632f]"
            >
              Enviar por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              El formulario abrirá WhatsApp con la información ingresada.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}