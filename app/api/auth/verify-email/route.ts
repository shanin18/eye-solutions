import { NextResponse } from "next/server";

import { verifyEmailOtp } from "@/lib/auth/email-verification";

type VerifyEmailPayload = {
  email?: string;
  otp?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as VerifyEmailPayload;

  if (!body.email || !body.otp) {
    return NextResponse.json({ error: "Email and verification code are required." }, { status: 400 });
  }

  const result = await verifyEmailOtp(body.email, body.otp);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({
    message: "Email verified. You can now sign in.",
    email: result.email
  });
}
