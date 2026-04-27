import type { AppRole } from "@/lib/auth/constants";

export type SessionTokenPayload = {
  id: string;
  fullName: string;
  email: string;
  role: AppRole;
  exp: number;
};

function base64UrlEncode(input: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "utf8").toString("base64url");
  }

  return btoa(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(input: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "base64url").toString("utf8");
  }

  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

async function sign(value: string) {
  const secret = process.env.SESSION_SECRET ?? "local-dev-session-secret";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));

  if (typeof Buffer !== "undefined") {
    return Buffer.from(signature).toString("base64url");
  }

  const bytes = Array.from(new Uint8Array(signature));
  const encoded = btoa(String.fromCharCode(...bytes));
  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function encodeSessionToken(payload: Omit<SessionTokenPayload, "exp">) {
  const sessionPayload: SessionTokenPayload = {
    ...payload,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(sessionPayload));
  const signature = await sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function readSessionToken(value: string): Promise<SessionTokenPayload | null> {
  try {
    const [encodedPayload, signature] = value.split(".");

    if (!encodedPayload || !signature) {
      return null;
    }

    if ((await sign(encodedPayload)) !== signature) {
      return null;
    }

    const parsed = JSON.parse(base64UrlDecode(encodedPayload)) as SessionTokenPayload;

    if (!parsed?.id || !parsed?.email || !parsed?.role || !parsed.exp || parsed.exp < Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
