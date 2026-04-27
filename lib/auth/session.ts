import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE, type AppRole } from "@/lib/auth/constants";
import { prisma } from "@/lib/db/prisma";
import { encodeSessionToken, readSessionToken } from "@/lib/auth/token";

export type SessionUser = {
  id: string;
  fullName: string;
  email: string;
  role: AppRole;
};

export async function getSessionUser() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;

  if (!raw) {
    return null;
  }

  const session = await readSessionToken(raw);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      status: true
    }
  });

  if (!user || user.status !== "ACTIVE") {
    return null;
  }

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role
  } satisfies SessionUser;
}

export async function createSessionCookie(session: SessionUser) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, await encodeSessionToken(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function requireSessionUser(roles?: AppRole[]) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  if (roles && !roles.includes(user.role)) {
    redirect("/");
  }

  return user;
}
