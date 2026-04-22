export const SESSION_COOKIE = "eye_optics_session";

export const APP_ROLES = ["SUPER_ADMIN", "ADMIN", "DOCTOR", "RECEPTIONIST", "OPTICAL_STAFF", "PATIENT"] as const;

export type AppRole = (typeof APP_ROLES)[number];

