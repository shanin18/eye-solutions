import { NextResponse } from "next/server";

import { createEmailVerificationToken } from "@/lib/auth/email-verification";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/db/prisma";
import { sendVerificationEmail } from "@/lib/email/mailer";

type RegisterPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterPayload;

  if (!body.fullName || !body.email || !body.phone || !body.password) {
    return NextResponse.json({ error: "Full name, phone, email, and password are required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (body.password.trim().length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      isEmailVerified: true
    }
  });

  if (existingUser) {
    if (existingUser.isEmailVerified) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const token = await createEmailVerificationToken(existingUser.id, existingUser.email);
    const delivery = await sendVerificationEmail({
      email: existingUser.email,
      fullName: existingUser.fullName,
      token
    });

    return NextResponse.json({
      message: "This account already exists but is not verified yet. We sent a fresh verification link.",
      devVerificationUrl: delivery.mode === "dev-link" ? delivery.verifyUrl : undefined
    });
  }

  const user = await prisma.user.create({
    data: {
      fullName: body.fullName.trim(),
      email,
      phone: body.phone.trim(),
      passwordHash: hashPassword(body.password),
      isEmailVerified: false,
      role: "PATIENT",
      status: "ACTIVE",
      patientProfile: {
        create: {
          fullName: body.fullName.trim(),
          phone: body.phone.trim(),
          email
        }
      }
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true
    }
  });

  const token = await createEmailVerificationToken(user.id, user.email);
  const delivery = await sendVerificationEmail({
    email: user.email,
    fullName: user.fullName,
    token
  });

  return NextResponse.json({
    message: "Account created. Check your email and verify your account before signing in.",
    devVerificationUrl: delivery.mode === "dev-link" ? delivery.verifyUrl : undefined
  }, { status: 201 });
}
