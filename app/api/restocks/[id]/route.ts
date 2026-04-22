import { NextResponse } from "next/server";

import { updateRestockStatus, type RestockStatus } from "@/lib/data/demo-store";

type UpdateRestockPayload = {
  status?: RestockStatus;
};

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = (await request.json()) as UpdateRestockPayload;

  if (!body.status) {
    return NextResponse.json({ error: "Restock status is required." }, { status: 400 });
  }

  const restock = updateRestockStatus(id, body.status);

  if (!restock) {
    return NextResponse.json({ error: "Restock request not found." }, { status: 404 });
  }

  return NextResponse.json({ restock });
}

