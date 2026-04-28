import { NextResponse } from "next/server";

import { createEmailVerificationOtp } from "@/lib/auth/email-verification";
import { prisma } from "@/lib/db/prisma";
import { sendVerificationEmail } from "@/lib/email/mailer";

type ResendVerificationPayload = {
  email?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ResendVerificationPayload;
  const email = body.email?.trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      fullName: true,
      email: true,
      isEmailVerified: true,
      status: true
    }
  });

  if (!user || user.status !== "ACTIVE") {
    return NextResponse.json({ error: "No active account was found for this email." }, { status: 404 });
  }

  if (user.isEmailVerified) {
    return NextResponse.json({ error: "This email is already verified." }, { status: 409 });
  }

  const verification = await createEmailVerificationOtp(user.id, user.email);
  const delivery = await sendVerificationEmail({
    email: user.email,
    fullName: user.fullName,
    otp: verification.otp
  });

  return NextResponse.json({
    message: "We sent a fresh verification code.",
    email: user.email,
    expiresAt: verification.expiresAt.toISOString(),
    devOtp: delivery.mode === "dev-otp" ? delivery.otp : undefined
  });
}
