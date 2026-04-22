import { BrandMark } from "@/components/nav/brand-mark";
import { LogoutButton } from "@/components/nav/logout-button";
import { AppLink } from "@/components/navigation/navigation-progress";
import { getSessionUser } from "@/lib/auth/session";

const roleLinks = {
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
} as const;

export async function PrivateHeader() {
  const user = await getSessionUser();
  const links = user ? roleLinks[user.role] : [];

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <BrandMark />

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex flex-col lg:items-end">
            {user ? <p className="text-sm text-muted-foreground">{user.fullName} • {user.role.replace("_", " ")}</p> : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {links.map((link) => (
              <AppLink
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </AppLink>
            ))}
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}

