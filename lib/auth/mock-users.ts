import type { AppRole } from "@/lib/auth/constants";
import type { SessionUser } from "@/lib/auth/session";

type DemoUser = SessionUser & {
  password: string;
};

export const demoUsers: DemoUser[] = [
  {
    id: "user-super-admin-1",
    fullName: "Farhan Enterprise",
    email: "superadmin@eyeoptics.local",
    password: "super123",
    role: "SUPER_ADMIN"
  },
  {
    id: "user-admin-1",
    fullName: "Amina Siddiqua",
    email: "admin@eyeoptics.local",
    password: "admin123",
    role: "ADMIN"
  },
  {
    id: "user-doctor-1",
    fullName: "Dr. Nadia Rahman",
    email: "doctor@eyeoptics.local",
    password: "doctor123",
    role: "DOCTOR"
  },
  {
    id: "user-reception-1",
    fullName: "Nusrat Jahan",
    email: "reception@eyeoptics.local",
    password: "reception123",
    role: "RECEPTIONIST"
  },
  {
    id: "user-optical-1",
    fullName: "Shuvo Das",
    email: "optical@eyeoptics.local",
    password: "optical123",
    role: "OPTICAL_STAFF"
  },
  {
    id: "user-patient-1",
    fullName: "Sadia Karim",
    email: "patient@eyeoptics.local",
    password: "patient123",
    role: "PATIENT"
  }
];

export function findDemoUser(email: string, password: string) {
  return demoUsers.find((user) => user.email === email && user.password === password) ?? null;
}

export function buildRegisteredUser(fullName: string, email: string, role: AppRole = "PATIENT"): SessionUser {
  return {
    id: `user-${email.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    fullName,
    email,
    role
  };
}
