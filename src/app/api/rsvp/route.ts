import { promises as fs } from "fs";
import path from "path";

type Attendance = "attending" | "not-attending";

type RSVPPayload = {
  name: string;
  guests: number;
  attendance: Attendance;
};

type RSVP = RSVPPayload & {
  id: string;
  createdAt: string;
};

const filePath = path.join(process.cwd(), "src", "data", "rsvp.json");

export async function POST(request: Request) {
  try {
    const payload: RSVPPayload = await request.json();

    if (!payload.name?.trim()) {
      return Response.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const rsvp: RSVP = {
      id: crypto.randomUUID(),
      name: payload.name.trim(),
      guests: Number(payload.guests),
      attendance: payload.attendance,
      createdAt: new Date().toISOString(),
    };

    let data: RSVP[] = [];

    try {
      const file = await fs.readFile(filePath, "utf-8");
      data = JSON.parse(file);
    } catch {
      data = [];
    }

    data.push(rsvp);

    await fs.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    return Response.json({
      ok: true,
      data: rsvp,
    });
  } catch {
    return Response.json(
      { message: "Failed to save RSVP" },
      { status: 500 }
    );
  }
}

export async function GET() { try { const file = await fs.readFile(filePath, "utf-8"); const data: RSVP[] = JSON.parse(file); return Response.json(data); } catch (error) { console.error("Failed to read RSVP:", error); return Response.json( { message: "Failed to load RSVP" }, { status: 500 } ); } }