import { NextResponse } from "next/server";

import { getPublicDashboardSummaries, listDoctors, listProducts, listServices } from "@/lib/data/data-service";

export async function GET() {
  const [summaries, doctors, services, products] = await Promise.all([
    getPublicDashboardSummaries(),
    listDoctors(),
    listServices(),
    listProducts()
  ]);

  return NextResponse.json({
    summaries,
    doctors,
    services,
    products
  });
}
