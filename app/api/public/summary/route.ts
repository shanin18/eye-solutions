import { NextResponse } from "next/server";

import { dashboardSummaries, doctors, products, services } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    summaries: dashboardSummaries,
    doctors,
    services,
    products
  });
}

