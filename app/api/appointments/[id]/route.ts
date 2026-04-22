import { NextResponse } from "next/server";

import { updateAppointmentStatus, type AppointmentStatus } from "@/lib/data/demo-store";

type UpdateAppointmentPayload = {
  status?: AppointmentStatus;
};

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = (await request.json()) as UpdateAppointmentPayload;

  if (!body.status) {
    return NextResponse.json({ error: "Status is required." }, { status: 400 });
  }

  const appointment = updateAppointmentStatus(id, body.status);

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
  }

  return NextResponse.json({ appointment });
}
