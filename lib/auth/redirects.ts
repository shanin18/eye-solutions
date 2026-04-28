import type { Route } from "next";

import type { AppRole } from "@/lib/auth/constants";

export const roleRedirectMap: Record<AppRole, Route> = {
  SUPER_ADMIN: "/admin",
  ADMIN: "/admin",
  DOCTOR: "/doctor",
  RECEPTIONIST: "/reception",
  OPTICAL_STAFF: "/optical",
  PATIENT: "/patient/dashboard"
};

export function getRoleRedirect(role: AppRole) {
  return roleRedirectMap[role];
}
