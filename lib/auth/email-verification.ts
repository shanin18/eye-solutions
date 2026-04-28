import { createHash, randomBytes } from "node:crypto";

import { prisma } from "@/lib/db/prisma";

const EMAIL_TOKEN_TTL_MS = 1000 * 60 * 60 * 24;

function hashVerificationToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createEmailVerificationToken(userId: string, email: string) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashVerificationToken(token);
  const expiresAt = new Date(Date.now() + EMAIL_TOKEN_TTL_MS);

  await prisma.verificationToken.deleteMany({
    where: {
      userId,
      consumedAt: null
    }
  });

  await prisma.verificationToken.create({
    data: {
      userId,
      email,
      tokenHash,
      expiresAt
    }
  });

  return token;
}

export async function verifyEmailToken(token: string) {
  const tokenHash = hashVerificationToken(token);

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

  if (!record || record.consumedAt || record.expiresAt.getTime() < Date.now()) {
    return { ok: false as const, error: "This verification link is invalid or has expired." };
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
