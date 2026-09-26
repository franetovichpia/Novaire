import { JWT } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TIME_ZONE = "America/Argentina/Buenos_Aires";

type CalendarClient = {
  calendarId: string;
  auth: JWT;
};

function getClient(): CalendarClient | null {
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!email || !key || !calendarId) {
    return null;
  }

  return {
    calendarId,
    auth: new JWT({ email, key, scopes: SCOPES }),
  };
}

function toArgentinaTime(isoString: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(isoString));
}

export async function getBusySlots(date: string): Promise<string[]> {
  const client = getClient();

  if (!client) {
    return [];
  }

  const { token } = await client.auth.getAccessToken();

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/freeBusy",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: `${date}T00:00:00-03:00`,
        timeMax: `${date}T23:59:59-03:00`,
        timeZone: TIME_ZONE,
        items: [{ id: client.calendarId }],
      }),
    },
  );

  if (!response.ok) {
    throw new Error("No se pudo consultar la disponibilidad del calendario.");
  }

  const data = (await response.json()) as {
    calendars?: Record<string, { busy?: { start: string; end: string }[] }>;
  };

  const busy = data.calendars?.[client.calendarId]?.busy ?? [];

  return busy.map((slot) => toArgentinaTime(slot.start));
}

export async function createCalendarEvent({
  summary,
  description,
  date,
  time,
  durationMinutes,
  attendeeEmail,
}: {
  summary: string;
  description: string;
  date: string;
  time: string;
  durationMinutes: number;
  attendeeEmail: string;
}): Promise<void> {
  const client = getClient();

  if (!client) {
    console.warn(
      "Google Calendar no está configurado (faltan variables de entorno). La reunión no se sincronizó.",
    );
    return;
  }

  const [hour, minute] = time.split(":").map(Number);
  const endMinutes = hour * 60 + minute + durationMinutes;
  const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(
    endMinutes % 60,
  ).padStart(2, "0")}`;

  const { token } = await client.auth.getAccessToken();

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      client.calendarId,
    )}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary,
        description,
        start: { dateTime: `${date}T${time}:00-03:00`, timeZone: TIME_ZONE },
        end: { dateTime: `${date}T${endTime}:00-03:00`, timeZone: TIME_ZONE },
        attendees: [{ email: attendeeEmail }],
      }),
    },
  );

  if (!response.ok) {
    console.error("Google Calendar API error", await response.text());
    throw new Error("No se pudo crear el evento en el calendario.");
  }
}
