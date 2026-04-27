import { NextResponse } from "next/server";

import { Prisma } from "@prisma/client";

import { requireApiUser } from "@/lib/auth/guards";
import {
  createAppointment,
  findOrCreatePatient,
  getAvailableDatesForDoctor,
  getAvailableTimeSlots,
  listAppointments,
  listDoctors
} from "@/lib/data/data-service";

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
      availableTimeSlots: await getAvailableTimeSlots(doctorId, appointmentDate)
    });
  }

  if (doctorId) {
    return NextResponse.json({
      doctorId,
      availableDates: await getAvailableDatesForDoctor(doctorId)
    });
  }

  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "DOCTOR"]);

  if (user instanceof NextResponse) {
    return user;
  }

  return NextResponse.json({
    appointments: await listAppointments({
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

  const fullName: string = body.fullName as string;
  const phone: string = body.phone as string;
  const doctorId: string = body.doctorId as string;
  const serviceType: string = body.serviceType as string;
  const appointmentDate: string = body.appointmentDate as string;
  const timeSlot: string = body.timeSlot as string;
  const email = body.email?.trim() || undefined;

  const doctors = await listDoctors();
  const doctor = doctors.find((item) => item.id === doctorId.trim());

  if (!doctor) {
    return NextResponse.json({ error: "Selected doctor was not found." }, { status: 404 });
  }

  const availableTimeSlots = await getAvailableTimeSlots(doctor.id, appointmentDate.trim());

  if (!availableTimeSlots.includes(timeSlot.trim() as (typeof availableTimeSlots)[number])) {
    return NextResponse.json({ error: "Selected time slot is no longer available." }, { status: 409 });
  }

  const patient = await findOrCreatePatient({
    fullName: fullName.trim(),
    phone: phone.trim(),
    email,
    source: body.bookingSource ?? "ONLINE"
  });

  try {
    const appointment = await createAppointment({
      patientId: patient.id,
      patientName: patient.fullName,
      patientPhone: patient.phone,
      patientEmail: patient.email,
      doctorId: doctor.id,
      doctorName: doctor.name,
      serviceType: serviceType.trim(),
      appointmentDate: appointmentDate.trim(),
      timeSlot: timeSlot.trim(),
      status: body.bookingSource === "WALK_IN" ? "CHECKED_IN" : "CONFIRMED",
      bookingSource: body.bookingSource ?? "ONLINE",
      reason: body.reason
    });

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Selected time slot is no longer available." }, { status: 409 });
    }

    throw error;
  }
}
