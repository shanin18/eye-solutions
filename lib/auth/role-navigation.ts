import type { Route } from "next";

import type { AppRole } from "@/lib/auth/constants";

export const roleLinks: Record<AppRole, Array<{ href: Route; label: string }>> = {
  SUPER_ADMIN: [
    { href: "/admin", label: "Admin" },
    { href: "/doctor", label: "Doctor" },
    { href: "/reception", label: "Reception" },
    { href: "/optical", label: "Optical" },
    { href: "/patient/dashboard", label: "Patient" }
  ],
  ADMIN: [
    { href: "/admin", label: "Operations" },
    { href: "/reception/appointments", label: "Bookings" },
    { href: "/optical", label: "Optical" }
  ],
  DOCTOR: [{ href: "/doctor", label: "Doctor workspace" }],
  RECEPTIONIST: [
    { href: "/reception", label: "Reception" },
    { href: "/reception/appointments", label: "Appointments" }
  ],
  OPTICAL_STAFF: [{ href: "/optical", label: "Optical" }],
  PATIENT: [
    { href: "/patient/dashboard", label: "Dashboard" },
    { href: "/patient/appointments", label: "Appointments" },
    { href: "/patient/prescriptions", label: "Prescriptions" }
  ]
};
