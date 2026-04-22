import { NextResponse } from "next/server";

import { updateInvoicePaymentStatus, type InvoicePaymentStatus } from "@/lib/data/demo-store";

type UpdateInvoicePayload = {
  paymentStatus?: InvoicePaymentStatus;
};

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = (await request.json()) as UpdateInvoicePayload;

  if (!body.paymentStatus) {
    return NextResponse.json({ error: "Payment status is required." }, { status: 400 });
  }

  const invoice = updateInvoicePaymentStatus(id, body.paymentStatus);

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
  }

  return NextResponse.json({ invoice });
}
