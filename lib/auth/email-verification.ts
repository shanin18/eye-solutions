import { createHash, randomInt } from "node:crypto";

import { prisma } from "@/lib/db/prisma";

const EMAIL_OTP_TTL_MS = 1000 * 60 * 10;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeOtp(otp: string) {
  return otp.replace(/\D/g, "");
}

function hashVerificationOtp(email: string, otp: string) {
  return createHash("sha256").update(`${normalizeEmail(email)}:${normalizeOtp(otp)}`).digest("hex");
}

export async function createEmailVerificationOtp(userId: string, email: string) {
  const normalizedEmail = normalizeEmail(email);
  const otp = randomInt(100000, 1000000).toString();
  const tokenHash = hashVerificationOtp(normalizedEmail, otp);
  const expiresAt = new Date(Date.now() + EMAIL_OTP_TTL_MS);

  await prisma.verificationToken.deleteMany({
    where: {
      userId,
      consumedAt: null
    }
  });

  await prisma.verificationToken.create({
    data: {
      userId,
      email: normalizedEmail,
      tokenHash,
      expiresAt
    }
  });

  return {
    otp,
    expiresAt
  };
}

export async function verifyEmailOtp(email: string, otp: string) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedOtp = normalizeOtp(otp);

  if (!normalizedEmail || !/^\d{6}$/.test(normalizedOtp)) {
    return { ok: false as const, error: "Enter the 6-digit verification code." };
  }

  const tokenHash = hashVerificationOtp(normalizedEmail, normalizedOtp);

  const record = await prisma.verificationToken.findUnique({
    where: { tokenHash },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          isEmailVerified: true
        }
      }
    }
  });

  if (
    !record ||
    record.consumedAt ||
    record.expiresAt.getTime() < Date.now() ||
    record.email !== normalizedEmail ||
    record.user.email !== normalizedEmail
  ) {
    return { ok: false as const, error: "This verification code is invalid or has expired." };
  }

  await prisma.$transaction([
    prisma.verificationToken.update({
      where: { id: record.id },
      data: { consumedAt: new Date() }
    }),
    prisma.user.update({
      where: { id: record.userId },
      data: {
        isEmailVerified: true,
        emailVerifiedAt: new Date()
      }
    })
  ]);

  return { ok: true as const, email: record.email };
}
