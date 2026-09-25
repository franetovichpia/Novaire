"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Check, Loader2 } from "lucide-react";

import { Container } from "@/components/common/container";

const meetingTypes = [
  "Landing page",
  "Sistema de gestión",
  "E-commerce",
  "Aplicación móvil",
  "Diseño digital",
  "Otro",
];

function nextAvailableDate(): string {
  const date = new Date();

  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }

  return date.toISOString().slice(0, 10);
}

function isWeekend(dateStr: string): boolean {
  const [year, month, day] = dateStr.split("-").map(Number);
  const day_ = new Date(year, month - 1, day).getDay();
  return day_ === 0 || day_ === 6;
}

export function Booking() {
  const [date, setDate] = useState(nextAvailableDate());
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [meetingType, setMeetingType] = useState(meetingTypes[0]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const weekend = useMemo(() => isWeekend(date), [date]);

  useEffect(() => {
    if (isWeekend(date)) {
      return;
    }

    let cancelled = false;

    async function loadSlots() {
      setLoadingSlots(true);
      setSlotsError(null);
      setSelectedTime(null);

      try {
        const response = await fetch(`/api/appointments?date=${date}`);
        const data = await response.json();
        if (cancelled) return;

        if (!response.ok) {
          setSlotsError(data.error ?? "No pudimos cargar los horarios.");
          setSlots([]);
          return;
        }

        setSlots(data.slots ?? []);
      } catch {
        if (!cancelled) {
          setSlotsError("No pudimos cargar los horarios. Intentá nuevamente.");
        }
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    }

    loadSlots();

    return () => {
      cancelled = true;
    };
  }, [date]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedTime) {
      setSubmitError("Elegí un horario disponible.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          meetingType,
          date,
          time: selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error ?? "No pudimos registrar la reunión.");
        return;
      }

      setSuccess(true);
    } catch {
      setSubmitError("No pudimos registrar la reunión. Intentá nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="booking" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute right-0 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-accent/25 blur-[130px]" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft"
        >
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col justify-between bg-[#181614] p-8 text-white sm:p-10">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  <CalendarCheck className="h-3.5 w-3.5" />
                  Turno online
                </span>

                <h2 className="mt-6 font-display text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
                  Agendá una reunión con nosotros.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
                  Elegí día y horario, contanos brevemente tu idea y nos
                  vemos por videollamada para analizar cómo llevarla adelante.
                  Sin costo ni compromiso.
                </p>
              </div>

              <div className="mt-10 space-y-4 border-t border-white/10 pt-6">
                {[
                  "30 minutos, por videollamada",
                  "Lunes a viernes, 9 a 18 hs",
                  "Te confirmamos por email al instante",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 sm:p-10">
              {success ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-[-0.03em]">
                    ¡Reunión agendada!
                  </h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Te esperamos el {date} a las {selectedTime} hs. Te
                    enviamos la confirmación por email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-medium">Fecha</span>
                      <input
                        required
                        type="date"
                        min={minDate}
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        className="h-14 w-full rounded-2xl border border-border bg-background px-4 text-sm"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium">
                        Servicio que te interesa
                      </span>
                      <select
                        value={meetingType}
                        onChange={(event) => setMeetingType(event.target.value)}
                        className="h-14 w-full rounded-2xl border border-border bg-background px-4 text-sm"
                      >
                        {meetingTypes.map((type) => (
                          <option key={type}>{type}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="space-y-3">
                    <span className="text-sm font-medium">
                      Horario disponible
                    </span>

                    {weekend ? (
                      <p className="py-2 text-sm text-muted-foreground">
                        Elegí un día de lunes a viernes.
                      </p>
                    ) : loadingSlots ? (
                      <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Buscando horarios...
                      </div>
                    ) : slotsError ? (
                      <p className="py-2 text-sm text-muted-foreground">
                        {slotsError}
                      </p>
                    ) : slots.length === 0 ? (
                      <p className="py-2 text-sm text-muted-foreground">
                        No quedan horarios ese día. Probá otra fecha.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                              selectedTime === slot
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-foreground hover:border-primary/50"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

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
                      <span className="text-sm font-medium">Teléfono</span>
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="Tu WhatsApp"
                        className="h-14 w-full rounded-2xl border border-border bg-background px-4 text-sm"
                      />
                    </label>
                  </div>

                  <label className="space-y-2">
                    <span className="text-sm font-medium">Email</span>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="h-14 w-full rounded-2xl border border-border bg-background px-4 text-sm"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium">
                      Contanos brevemente tu idea (opcional)
                    </span>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="¿Qué querés desarrollar?"
                      className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm"
                    />
                  </label>

                  {submitError ? (
                    <p className="text-sm text-red-500">{submitError}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-[#b9632f] disabled:opacity-60"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CalendarCheck className="h-4 w-4" />
                    )}
                    Confirmar reunión
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
