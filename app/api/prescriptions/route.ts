import { NextResponse } from "next/server";

import { createPrescription, listAppointments, listPrescriptions } from "@/lib/data/demo-store";

type CreatePrescriptionPayload = {
  appointmentId?: string;
  diagnosis?: string;
  lensPower?: string;
  medicines?: string;
  advice?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  return NextResponse.json({
    prescriptions: listPrescriptions({
      patientEmail: searchParams.get("patientEmail") ?? undefined,
      doctorId: searchParams.get("doctorId") ?? undefined
    })
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreatePrescriptionPayload;
  const fieldErrors: Record<string, string> = {};

  if (!body.appointmentId?.trim()) fieldErrors.appointmentId = "Appointment selection is required.";
  if (!body.diagnosis?.trim()) fieldErrors.diagnosis = "Diagnosis is required.";
  if (!body.lensPower?.trim()) fieldErrors.lensPower = "Lens power is required.";
  if (!body.medicines?.trim()) fieldErrors.medicines = "Medicines are required.";
  if (!body.advice?.trim()) fieldErrors.advice = "Advice is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const appointment = listAppointments({ appointmentId: body.appointmentId })[0];

  if (!appointment) {
    return NextResponse.json({ error: "Selected appointment was not found." }, { status: 404 });
  }

  const prescription = createPrescription({
    appointmentId: appointment.id,
    patientId: appointment.patientId,
    patientEmail: appointment.patientEmail,
    patientName: appointment.patientName,
    doctorId: appointment.doctorId,
    doctorName: appointment.doctorName,
    diagnosis: body.diagnosis!,
    lensPower: body.lensPower!,
    medicines: body.medicines!,
    advice: body.advice!
  });

  return NextResponse.json({ prescription }, { status: 201 });
}
