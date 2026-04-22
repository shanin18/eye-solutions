import { cookies } from "next/headers";

import { SESSION_COOKIE, type AppRole } from "@/lib/auth/constants";

export type SessionUser = {
  id: string;
  fullName: string;
  email: string;
  role: AppRole;
};

function encodeSession(session: SessionUser) {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64");
}

function decodeSession(value: string): SessionUser | null {
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64").toString("utf8")) as SessionUser;
    if (!parsed?.id || !parsed?.email || !parsed?.role) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  return raw ? decodeSession(raw) : null;
}

export async function createSessionCookie(session: SessionUser) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

