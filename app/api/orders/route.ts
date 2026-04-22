import { NextResponse } from "next/server";

import { createInvoice, createServiceOrder, getPatientByEmail, listServiceOrders } from "@/lib/data/demo-store";

type CreateOrderPayload = {
  patientEmail?: string;
  patientName?: string;
  items?: string[];
  totalAmount?: number;
  source?: "PRESCRIPTION" | "DIRECT_OPTICAL";
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientEmail = searchParams.get("patientEmail");

  return NextResponse.json({
    orders: listServiceOrders(undefined, patientEmail)
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateOrderPayload;
  const fieldErrors: Record<string, string> = {};

  if (!body.patientName?.trim()) fieldErrors.patientName = "Customer or patient name is required.";
  if (!body.items?.length) fieldErrors.items = "At least one service or product item is required.";
  if (typeof body.totalAmount !== "number" || Number.isNaN(body.totalAmount)) fieldErrors.totalAmount = "Total amount is required.";
  if (!body.source) fieldErrors.source = "Order source is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const patient = getPatientByEmail(body.patientEmail);
  const order = createServiceOrder({
    patientId: patient?.id,
    patientName: body.patientName!,
    source: body.source!,
    items: body.items!,
    totalAmount: body.totalAmount!
  });

  const invoice = createInvoice({
    referenceType: "SERVICE_ORDER",
    referenceId: order.id,
    patientName: order.patientName,
    totalAmount: order.totalAmount
  });

  return NextResponse.json({ order, invoice }, { status: 201 });
}

