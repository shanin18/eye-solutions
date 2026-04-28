"use client";

import { LayoutDashboard, Package2, ReceiptText, ShieldCheck, Stethoscope, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { AppLink } from "@/components/navigation/navigation-progress";
import type { AppRole } from "@/lib/auth/constants";
import { roleLinks } from "@/lib/auth/role-navigation";
import { cn } from "@/lib/utils";

const roleMeta: Record<AppRole, { title: string; subtitle: string }> = {
  SUPER_ADMIN: {
    title: "Business owner",
    subtitle: "Monitor operations, teams, inventory, and performance."
  },
  ADMIN: {
    title: "Branch manager",
    subtitle: "Keep daily operations, bookings, and stock running smoothly."
  },
  DOCTOR: {
    title: "Doctor workspace",
    subtitle: "Move from queue to examination and prescription with less friction."
  },
  RECEPTIONIST: {
    title: "Front desk",
    subtitle: "Manage bookings, check-ins, and billing from one place."
  },
  OPTICAL_STAFF: {
    title: "Optical service",
    subtitle: "Track products, orders, and payment status in one flow."
  },
  PATIENT: {
    title: "Patient portal",
    subtitle: "Review appointments, prescriptions, and care history quickly."
  }
};

const roleIcons: Record<AppRole, typeof ShieldCheck> = {
  SUPER_ADMIN: ShieldCheck,
  ADMIN: LayoutDashboard,
  DOCTOR: Stethoscope,
  RECEPTIONIST: ReceiptText,
  OPTICAL_STAFF: Package2,
  PATIENT: UserRound
};

type PrivateSidebarNavProps = {
  role: AppRole;
  fullName: string;
};

export function PrivateSidebarNav({ role, fullName }: PrivateSidebarNavProps) {
  const pathname = usePathname();
  const links = roleLinks[role];
  const meta = roleMeta[role];
  const Icon = roleIcons[role];

  return (
    <div className="private-sidebar-card">
      <div className="private-sidebar-identity">
        <div className="private-sidebar-badge">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <p className="eyebrow">{meta.title}</p>
          <h2>{fullName}</h2>
          <p>{meta.subtitle}</p>
        </div>
      </div>

      <nav className="private-sidebar-links" aria-label="Authenticated navigation">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <AppLink className={cn("private-sidebar-link", isActive && "private-sidebar-link-active")} href={link.href} key={link.href}>
              <span>{link.label}</span>
            </AppLink>
          );
        })}
      </nav>
    </div>
  );
}
