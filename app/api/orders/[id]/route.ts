import { NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth/guards";
import { updateServiceOrderStatus, type ServiceOrderStatus } from "@/lib/data/data-service";

type UpdateOrderPayload = {
  status?: ServiceOrderStatus;
};

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN", "OPTICAL_STAFF"]);

  if (user instanceof NextResponse) {
    return user;
  }

  const { id } = await context.params;
  const body = (await request.json()) as UpdateOrderPayload;

  if (!body.status) {
    return NextResponse.json({ error: "Order status is required." }, { status: 400 });
  }

  const order = await updateServiceOrderStatus(id, body.status);

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
