import { NextRequest } from "next/server";

import {
  argentinaNow,
  getAvailableSlots,
  isWeekday,
  meetingTypes,
} from "@/lib/booking";
import { createCalendarEvent, getBusySlots } from "@/lib/google-calendar";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^\d{2}:\d{2}$/;

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") ?? "";
  const now = argentinaNow();

  if (!datePattern.test(date) || !isWeekday(date) || date < now.date) {
    return Response.json({ error: "La fecha seleccionada no está disponible." }, { status: 400 });
  }

  try {
    const busy = new Set(await getBusySlots(date));
    const slots = getAvailableSlots().filter(
      (slot) => !busy.has(slot) && (date !== now.date || slot > now.time),
    );

    return Response.json({ slots });
  } catch (error) {
    console.error("Error loading appointments", error);
    return Response.json(
      { error: "No pudimos consultar los horarios. Intentá nuevamente." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const meetingType = String(body.meetingType ?? "").trim();
    const message = String(body.message ?? "").trim();
    const date = String(body.date ?? "");
    const time = String(body.time ?? "");
    const now = argentinaNow();

    const validSlot = getAvailableSlots().includes(time);
    const validMeetingType = meetingTypes.includes(
      meetingType as (typeof meetingTypes)[number],
    );

    if (
      name.length < 2 ||
      !email.includes("@") ||
      phone.length < 6 ||
      !validMeetingType ||
      !datePattern.test(date) ||
      !timePattern.test(time) ||
      !isWeekday(date) ||
      !validSlot ||
      date < now.date ||
      (date === now.date && time <= now.time)
    ) {
      return Response.json({ error: "Revisá los datos y el horario elegido." }, { status: 400 });
    }

    const busy = await getBusySlots(date);
    if (busy.includes(time)) {
      return Response.json(
        { error: "Ese horario acaba de reservarse. Elegí otro disponible." },
        { status: 409 },
      );
    }

    await createCalendarEvent({
      summary: `Reunión Novaire · ${name} (${meetingType})`,
      description: [
        `Teléfono: ${phone}`,
        `Servicio: ${meetingType}`,
        message ? `Mensaje: ${message}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      date,
      time,
      durationMinutes: 30,
      attendeeEmail: email,
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment", error);
    return Response.json(
      { error: "No pudimos registrar la reunión. Intentá nuevamente." },
      { status: 500 },
    );
  }
}