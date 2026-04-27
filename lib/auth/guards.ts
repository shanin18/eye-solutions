import { NextResponse } from "next/server";

import type { AppRole } from "@/lib/auth/constants";
import { getSessionUser } from "@/lib/auth/session";

export async function requireApiUser(roles?: AppRole[]) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (roles && !roles.includes(user.role)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  return user;
}
