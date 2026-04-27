import { NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth/guards";
import { createPrescription, listAppointments, listPrescriptions } from "@/lib/data/data-service";

type CreatePrescriptionPayload = {
  appointmentId?: string;
  leftEyeVision?: string;
  rightEyeVision?: string;
  diagnosis?: string;
  clinicalNotes?: string;
  lensPower?: string;
  medicines?: string;
  recommendations?: string;
  advice?: string;
};

export async function GET(request: Request) {
  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN", "DOCTOR", "PATIENT"]);

  if (user instanceof NextResponse) {
    return user;
  }

  const { searchParams } = new URL(request.url);
  const patientEmail = user.role === "PATIENT" ? user.email : searchParams.get("patientEmail") ?? undefined;
  const doctorId = user.role === "DOCTOR" ? undefined : searchParams.get("doctorId") ?? undefined;

  return NextResponse.json({
    prescriptions: await listPrescriptions({
      patientEmail,
      doctorId
    })
  });
}

export async function POST(request: Request) {
  const user = await requireApiUser(["DOCTOR"]);

  if (user instanceof NextResponse) {
    return user;
  }

  const body = (await request.json()) as CreatePrescriptionPayload;
  const fieldErrors: Record<string, string> = {};

  if (!body.appointmentId?.trim()) fieldErrors.appointmentId = "Appointment selection is required.";
  if (!body.leftEyeVision?.trim()) fieldErrors.leftEyeVision = "Left eye vision is required.";
  if (!body.rightEyeVision?.trim()) fieldErrors.rightEyeVision = "Right eye vision is required.";
  if (!body.diagnosis?.trim()) fieldErrors.diagnosis = "Diagnosis is required.";
  if (!body.clinicalNotes?.trim()) fieldErrors.clinicalNotes = "Clinical notes are required.";
  if (!body.lensPower?.trim()) fieldErrors.lensPower = "Lens power is required.";
  if (!body.medicines?.trim()) fieldErrors.medicines = "Medicines are required.";
  if (!body.recommendations?.trim()) fieldErrors.recommendations = "Recommendations are required.";
  if (!body.advice?.trim()) fieldErrors.advice = "Advice is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const appointment = (await listAppointments({ appointmentId: body.appointmentId }))[0];

  if (!appointment) {
    return NextResponse.json({ error: "Selected appointment was not found." }, { status: 404 });
  }

  const prescription = await createPrescription({
    appointmentId: appointment.id,
    patientId: appointment.patientId,
    patientEmail: appointment.patientEmail,
    patientName: appointment.patientName,
    doctorId: appointment.doctorId,
    doctorName: appointment.doctorName,
    leftEyeVision: body.leftEyeVision!,
    rightEyeVision: body.rightEyeVision!,
    diagnosis: body.diagnosis!,
    clinicalNotes: body.clinicalNotes!,
    lensPower: body.lensPower!,
    medicines: body.medicines!,
    recommendations: body.recommendations!,
    advice: body.advice!
  });

  return NextResponse.json({ prescription }, { status: 201 });
}
