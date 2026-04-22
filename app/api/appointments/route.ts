import { NextResponse } from "next/server";

import { doctors } from "@/lib/mock-data";
import {
  createAppointment,
  findOrCreatePatient,
  getAvailableDatesForDoctor,
  getAvailableTimeSlots,
  isSlotAvailable,
  listAppointments
} from "@/lib/data/demo-store";

type CreateAppointmentPayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  doctorId?: string;
  serviceType?: string;
  appointmentDate?: string;
  timeSlot?: string;
  bookingSource?: "ONLINE" | "WALK_IN" | "STAFF";
  reason?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get("doctorId") ?? undefined;
  const appointmentDate = searchParams.get("appointmentDate") ?? undefined;

  if (doctorId && appointmentDate) {
    return NextResponse.json({
      doctorId,
      appointmentDate,
      availableTimeSlots: getAvailableTimeSlots(doctorId, appointmentDate)
    });
  }

  if (doctorId) {
    return NextResponse.json({
      doctorId,
      availableDates: getAvailableDatesForDoctor(doctorId)
    });
  }

  return NextResponse.json({
    appointments: listAppointments({
      patientEmail: searchParams.get("patientEmail") ?? undefined,
      doctorId,
      status: searchParams.get("status") ?? undefined
    })
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateAppointmentPayload;

  const fieldErrors: Record<string, string> = {};

  if (!body.fullName?.trim()) fieldErrors.fullName = "Patient name is required.";
  if (!body.phone?.trim()) fieldErrors.phone = "Phone number is required.";
  if (!body.doctorId?.trim()) fieldErrors.doctorId = "Doctor selection is required.";
  if (!body.serviceType?.trim()) fieldErrors.serviceType = "Service type is required.";
  if (!body.appointmentDate?.trim()) fieldErrors.appointmentDate = "Date selection is required.";
  if (!body.timeSlot?.trim()) fieldErrors.timeSlot = "Time slot selection is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const doctor = doctors.find((item) => item.id === body.doctorId);

  if (!doctor) {
    return NextResponse.json({ error: "Selected doctor was not found." }, { status: 404 });
  }

  if (!isSlotAvailable(doctor.id, body.appointmentDate, body.timeSlot)) {
    return NextResponse.json(
      { error: "That date and time slot is already booked. Please choose another available slot." },
      { status: 409 }
    );
  }

  const patient = findOrCreatePatient({
    fullName: body.fullName,
    phone: body.phone,
    email: body.email,
    source: body.bookingSource ?? "ONLINE"
  });

  const appointment = createAppointment({
    patientId: patient.id,
    patientName: patient.fullName,
    patientPhone: patient.phone,
    patientEmail: patient.email,
    doctorId: doctor.id,
    doctorName: doctor.name,
    serviceType: body.serviceType,
    appointmentDate: body.appointmentDate,
    timeSlot: body.timeSlot,
    status: body.bookingSource === "WALK_IN" ? "CHECKED_IN" : "CONFIRMED",
    bookingSource: body.bookingSource ?? "ONLINE",
    reason: body.reason
  });

  return NextResponse.json({ appointment }, { status: 201 });
}
