import { NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth/guards";
import { updateAppointmentStatus, type AppointmentStatus } from "@/lib/data/data-service";

type UpdateAppointmentPayload = {
  status?: AppointmentStatus;
};

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "DOCTOR"]);

  if (user instanceof NextResponse) {
    return user;
  }

  const { id } = await context.params;
  const body = (await request.json()) as UpdateAppointmentPayload;

  if (!body.status) {
    return NextResponse.json({ error: "Status is required." }, { status: 400 });
  }

  const appointment = await updateAppointmentStatus(id, body.status);

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
  }

  return NextResponse.json({ appointment });
}
