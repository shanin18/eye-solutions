import { NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth/guards";
import { findOrCreatePatient, listPatients } from "@/lib/data/data-service";

type CreatePatientPayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  source?: "ONLINE" | "WALK_IN" | "STAFF";
};

export async function GET(request: Request) {
  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "DOCTOR"]);

  if (user instanceof NextResponse) {
    return user;
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? undefined;

  return NextResponse.json({
    patients: await listPatients(search)
  });
}

export async function POST(request: Request) {
  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"]);

  if (user instanceof NextResponse) {
    return user;
  }

  const body = (await request.json()) as CreatePatientPayload;

  if (!body.fullName || !body.phone) {
    return NextResponse.json({ error: "Full name and phone are required." }, { status: 400 });
  }

  const patient = await findOrCreatePatient({
    fullName: body.fullName,
    phone: body.phone,
    email: body.email,
    source: body.source ?? "STAFF"
  });

  return NextResponse.json({ patient }, { status: 201 });
}
