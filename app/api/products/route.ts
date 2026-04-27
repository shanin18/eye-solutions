import { NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth/guards";
import { createProduct, listProducts } from "@/lib/data/data-service";

type CreateProductPayload = {
  name?: string;
  category?: string;
  sku?: string;
  description?: string;
  price?: number;
  stock?: number;
  threshold?: number;
  isActive?: boolean;
};

export async function GET() {
  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN", "OPTICAL_STAFF", "DOCTOR"]);

  if (user instanceof NextResponse) {
    return user;
  }

  return NextResponse.json({ products: await listProducts() });
}

export async function POST(request: Request) {
  const user = await requireApiUser(["SUPER_ADMIN", "ADMIN"]);

  if (user instanceof NextResponse) {
    return user;
  }

  const body = (await request.json()) as CreateProductPayload;
  const fieldErrors: Record<string, string> = {};

  if (!body.name?.trim()) fieldErrors.name = "Product name is required.";
  if (!body.category?.trim()) fieldErrors.category = "Category is required.";
  if (!body.sku?.trim()) fieldErrors.sku = "SKU is required.";
  if (!body.description?.trim()) fieldErrors.description = "Description is required.";
  if (typeof body.price !== "number" || Number.isNaN(body.price)) fieldErrors.price = "Price is required.";
  if (typeof body.stock !== "number" || Number.isNaN(body.stock)) fieldErrors.stock = "Stock is required.";
  if (typeof body.threshold !== "number" || Number.isNaN(body.threshold)) fieldErrors.threshold = "Threshold is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const product = await createProduct({
    name: body.name!,
    category: body.category!,
    sku: body.sku!,
    description: body.description!,
    price: body.price!,
    stock: body.stock!,
    threshold: body.threshold!,
    isActive: body.isActive ?? true
  });

  return NextResponse.json({ product }, { status: 201 });
}
