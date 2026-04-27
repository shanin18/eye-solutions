import { NextResponse } from "next/server";

import { verifyPassword } from "@/lib/auth/password";
import { createSessionCookie } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

type LoginPayload = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as LoginPayload;

  if (!body.email || !body.password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email.trim().toLowerCase() },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      passwordHash: true,
      status: true
    }
  });

  if (!user || user.status !== "ACTIVE" || !verifyPassword(body.password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  await createSessionCookie({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role
  });

  return NextResponse.json({
    message: "Login successful.",
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
  });
}
