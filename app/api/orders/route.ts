import { NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth/guards";
import { createInvoice, createServiceOrder, getPatientByEmail, listServiceOrders } from "@/lib/data/data-service";

type CreateOrderPayload = {
  patientEmail?: string;
  patientName?: string;
  items?: string[];
  totalAmount?: number;
  source?: "PRESCRIPTION" | "DIRECT_OPTICAL";
};

export async function GET(request: Request) {
  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN", "OPTICAL_STAFF", "PATIENT"]);

  if (user instanceof NextResponse) {
    return user;
  }

  const { searchParams } = new URL(request.url);
  const patientEmail = user.role === "PATIENT" ? user.email : searchParams.get("patientEmail");

  return NextResponse.json({
    orders: await listServiceOrders(undefined, patientEmail)
  });
}

export async function POST(request: Request) {
  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN", "OPTICAL_STAFF"]);

  if (user instanceof NextResponse) {
    return user;
  }

  const body = (await request.json()) as CreateOrderPayload;
  const fieldErrors: Record<string, string> = {};

  if (!body.patientName?.trim()) fieldErrors.patientName = "Customer or patient name is required.";
  if (!body.items?.length) fieldErrors.items = "At least one service or product item is required.";
  if (typeof body.totalAmount !== "number" || Number.isNaN(body.totalAmount)) fieldErrors.totalAmount = "Total amount is required.";
  if (!body.source) fieldErrors.source = "Order source is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const patient = await getPatientByEmail(body.patientEmail);
  const order = await createServiceOrder({
    patientId: patient?.id,
    patientName: body.patientName!,
    source: body.source!,
    items: body.items!,
    totalAmount: body.totalAmount!
  });

  const invoice = await createInvoice({
    referenceType: "SERVICE_ORDER",
    referenceId: order.id,
    patientId: patient?.id,
    patientName: order.patientName,
    totalAmount: order.totalAmount
  });

  return NextResponse.json({ order, invoice }, { status: 201 });
}
