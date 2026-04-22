import type { AppRole } from "@/lib/auth/constants";

const roleAccessMap: Record<AppRole, string[]> = {
  SUPER_ADMIN: ["/admin", "/doctor", "/reception", "/optical", "/patient"],
  ADMIN: ["/admin"],
  DOCTOR: ["/doctor"],
  RECEPTIONIST: ["/reception"],
  OPTICAL_STAFF: ["/optical"],
  PATIENT: ["/patient"]
};

export function canAccessPath(role: AppRole, pathname: string) {
  return roleAccessMap[role].some((prefix) => pathname.startsWith(prefix));
}

