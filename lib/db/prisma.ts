import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  __eyeOpticsPrisma__?: PrismaClient;
};

export const prisma =
  globalForPrisma.__eyeOpticsPrisma__ ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__eyeOpticsPrisma__ = prisma;
}
