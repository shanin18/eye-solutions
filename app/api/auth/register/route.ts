import { NextResponse } from "next/server";

import { createSessionCookie } from "@/lib/auth/session";
import { buildRegisteredUser } from "@/lib/auth/mock-users";

type RegisterPayload = {
  fullName?: string;
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterPayload;

  if (!body.fullName || !body.email || !body.password) {
    return NextResponse.json({ error: "Full name, email, and password are required." }, { status: 400 });
  }

  const user = buildRegisteredUser(body.fullName, body.email);
  await createSessionCookie(user);

  return NextResponse.json({
    message: "Registration successful.",
    user
  });
}

