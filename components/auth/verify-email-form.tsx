"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type VerifyResponse = {
  message?: string;
  error?: string;
  email?: string;
  expiresAt?: string;
  devOtp?: string;
};

type VerifyEmailFormProps = {
  initialEmail?: string;
  initialExpiresAt?: string;
};

function formatTime(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function VerifyEmailForm({ initialEmail = "", initialExpiresAt = "" }: VerifyEmailFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [expiresAt, setExpiresAt] = useState(initialExpiresAt);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const isEmailLocked = Boolean(initialEmail);
  const expiresAtMs = useMemo(() => {
    const parsed = Date.parse(expiresAt);
    return Number.isNaN(parsed) ? 0 : parsed;
  }, [expiresAt]);

  useEffect(() => {
    if (!email) {
      return;
    }

    const storedOtp = sessionStorage.getItem(`verification-otp:${email}`);

    if (storedOtp) {
      setDevOtp(storedOtp);
    }
  }, [email]);

  useEffect(() => {
    if (!expiresAtMs) {
      setTimeLeft(0);
      return;
    }

    function updateTimeLeft() {
      setTimeLeft(Math.max(0, expiresAtMs - Date.now()));
    }

    updateTimeLeft();
    const interval = window.setInterval(updateTimeLeft, 1000);

    return () => window.clearInterval(interval);
  }, [expiresAtMs]);

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsVerifying(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
      });
      const data = (await response.json()) as VerifyResponse;

      if (!response.ok) {
        setError(data.error ?? "Unable to verify this code.");
        setIsVerifying(false);
        return;
      }

      setMessage(data.message ?? "Email verified. You can now sign in.");
      sessionStorage.removeItem(`verification-otp:${email}`);
      setOtp("");
      router.replace("/login");
      router.refresh();
    } catch {
      setError("Unable to verify right now. Please try again.");
      setIsVerifying(false);
    }
  }

  async function handleResend() {
    setIsResending(true);
    setError("");
    setMessage("");
    setDevOtp("");

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      const data = (await response.json()) as VerifyResponse;

      if (!response.ok) {
        setError(data.error ?? "Unable to resend the code.");
        setIsResending(false);
        return;
      }

      setMessage(data.message ?? "We sent a fresh verification code.");
      setExpiresAt(data.expiresAt ?? "");
      setDevOtp(data.devOtp ?? "");
      if (data.devOtp) {
        sessionStorage.setItem(`verification-otp:${email}`, data.devOtp);
      }
      setIsResending(false);
    } catch {
      setError("Unable to resend right now. Please try again.");
      setIsResending(false);
    }
  }

  return (
    <form className="form-card max-w-[520px]" onSubmit={handleVerify}>
      <h3>Enter verification code</h3>
      <div className="mt-4 grid gap-4">
        <div className="field">
          <label htmlFor="verify-email">Email address</label>
          <Input
            id="verify-email"
            readOnly={isEmailLocked}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={isEmailLocked ? "cursor-not-allowed bg-muted/70 text-muted-foreground" : undefined}
          />
        </div>
        <div className="field">
          <label htmlFor="verify-otp">6-digit code</label>
          <Input
            id="verify-otp"
            inputMode="numeric"
            maxLength={6}
            pattern="[0-9]{6}"
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="123456"
          />
        </div>
      </div>

      {expiresAtMs ? (
        <div className="mt-4 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
          {timeLeft > 0 ? `Code expires in ${formatTime(timeLeft)}.` : "This code has expired. Request a new one."}
        </div>
      ) : null}

      {error ? <p className="mt-4 text-sm font-medium text-orange-700">{error}</p> : null}
      {message ? <p className="mt-4 text-sm font-medium text-primary">{message}</p> : null}
      {devOtp ? <p className="mt-2 text-sm text-muted-foreground">Local development OTP: {devOtp}</p> : null}

      <div className="button-row">
        <Button disabled={isVerifying} type="submit">
          {isVerifying ? "Verifying..." : "Verify email"}
        </Button>
        <Button disabled={isResending || !email} onClick={handleResend} type="button" variant="secondary">
          {isResending ? "Sending..." : "Resend code"}
        </Button>
        <Link className="button-secondary" href="/login">
          Back to login
        </Link>
      </div>
    </form>
  );
}
