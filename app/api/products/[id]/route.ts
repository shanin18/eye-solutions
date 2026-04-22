import { NextResponse } from "next/server";

import { updateProduct } from "@/lib/data/demo-store";

type UpdateProductPayload = {
  name?: string;
  category?: string;
  description?: string;
  price?: number;
  stock?: number;
  threshold?: number;
  isActive?: boolean;
};

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = (await request.json()) as UpdateProductPayload;

  const product = updateProduct(id, body);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product });
}

