import { NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth/guards";
import { updateInvoicePaymentStatus, type InvoicePaymentStatus } from "@/lib/data/data-service";

type UpdateInvoicePayload = {
  paymentStatus?: InvoicePaymentStatus;
};

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "OPTICAL_STAFF"]);

  if (user instanceof NextResponse) {
    return user;
  }

  const { id } = await context.params;
  const body = (await request.json()) as UpdateInvoicePayload;

  if (!body.paymentStatus) {
    return NextResponse.json({ error: "Payment status is required." }, { status: 400 });
  }

  const invoice = await updateInvoicePaymentStatus(id, body.paymentStatus);

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
  }

  return NextResponse.json({ invoice });
}
