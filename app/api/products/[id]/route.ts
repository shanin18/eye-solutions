import { NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth/guards";
import { updateProduct } from "@/lib/data/data-service";

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
  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN"]);

  if (user instanceof NextResponse) {
    return user;
  }

  const { id } = await context.params;
  const body = (await request.json()) as UpdateProductPayload;

  const product = await updateProduct(id, body);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product });
}
