import { NextResponse } from "next/server";

import { createSessionCookie } from "@/lib/auth/session";
import { findDemoUser } from "@/lib/auth/mock-users";

type LoginPayload = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as LoginPayload;

  if (!body.email || !body.password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = findDemoUser(body.email, body.password);

  if (!user) {
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

