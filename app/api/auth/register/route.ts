import { NextResponse } from "next/server";

import { hashPassword } from "@/lib/auth/password";
import { createSessionCookie } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

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

  const email = body.email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      fullName: body.fullName.trim(),
      email,
      phone: body.phone.trim(),
      passwordHash: hashPassword(body.password),
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

  await createSessionCookie(user);

  return NextResponse.json({
    message: "Registration successful.",
    user
  });
}
