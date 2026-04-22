import { NextResponse } from "next/server";

import { findOrCreatePatient, listPatients } from "@/lib/data/demo-store";

type CreatePatientPayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  source?: "ONLINE" | "WALK_IN" | "STAFF";
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? undefined;

  return NextResponse.json({
    patients: listPatients(search)
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreatePatientPayload;

  if (!body.fullName || !body.phone) {
    return NextResponse.json({ error: "Full name and phone are required." }, { status: 400 });
  }

  const patient = findOrCreatePatient({
    fullName: body.fullName,
    phone: body.phone,
    email: body.email,
    source: body.source ?? "STAFF"
  });

  return NextResponse.json({ patient }, { status: 201 });
}

