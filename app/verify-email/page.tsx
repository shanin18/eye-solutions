import { VerifyEmailForm } from "@/components/auth/verify-email-form";

type VerifyEmailPageProps = {
  searchParams?: Promise<{
    email?: string;
    expiresAt?: string;
  }>;
};

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = (await searchParams) ?? {};

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Email verification</span>
        <h1>Verify your email with an OTP.</h1>
        <p>Enter the 6-digit code sent to your email address. Codes expire after 10 minutes.</p>
      </div>

      <VerifyEmailForm initialEmail={params.email ?? ""} initialExpiresAt={params.expiresAt ?? ""} />
    </main>
  );
}
