import Link from "next/link";

import { verifyEmailToken } from "@/lib/auth/email-verification";

type VerifyEmailPageProps = {
  searchParams?: Promise<{
    token?: string;
  }>;
};

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = (await searchParams) ?? {};
  const token = params.token?.trim();
  const result = token ? await verifyEmailToken(token) : { ok: false as const, error: "Missing verification token." };

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Email verification</span>
        <h1>{result.ok ? "Your email is verified." : "We could not verify this email."}</h1>
        <p>
          {result.ok
            ? `The address ${result.email} is now active and can sign in with its app password.`
            : result.error}
        </p>
      </div>

      <div className="form-card max-w-[520px]">
        <div className="button-row">
          <Link className="button" href="/login">
            Continue to login
          </Link>
          <Link className="button-secondary" href="/register">
            Back to register
          </Link>
        </div>
      </div>
    </main>
  );
}
