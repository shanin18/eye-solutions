"use client";

import type { Route } from "next";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useNavigationProgress } from "@/components/navigation/navigation-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { roleRedirectMap } from "@/lib/auth/redirects";

type SessionResponse = {
  message?: string;
  error?: string;
  user?: {
    role: "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "OPTICAL_STAFF" | "PATIENT";
  };
};

export function LoginForm() {
  const router = useRouter();
  const { startNavigation } = useNavigationProgress();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = (await response.json()) as SessionResponse;

      if (!response.ok || !data.user) {
        setError(data.error ?? "Unable to sign in.");
        setIsSubmitting(false);
        return;
      }

      startNavigation();
      router.push(roleRedirectMap[data.user.role] as Route);
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-card max-w-[520px]" onSubmit={handleSubmit}>
      <h3>Sign in</h3>
      <div className="mt-4 grid gap-4">
        <div className="field">
          <label htmlFor="email">Email address</label>
          <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-orange-700">{error}</p> : null}
      {error.toLowerCase().includes("verify your email") ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Need a new code?{" "}
          <Link className="text-primary underline" href={`/verify-email?email=${encodeURIComponent(email)}`}>
            Verify your email
          </Link>
          .
        </p>
      ) : null}

      <div className="button-row">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Signing in..." : "Continue"}
        </Button>
      </div>

      <div className="mt-4 space-y-1 text-sm text-muted-foreground">
        <p>Local development starter accounts:</p>
        <p><code>superadmin@eyeoptics.local / super123</code></p>
        <p><code>reception@eyeoptics.local / reception123</code></p>
        <p><code>optical@eyeoptics.local / optical123</code></p>
        <p><code>patient@eyeoptics.local / patient123</code></p>
        <p><code>doctor@eyeoptics.local / doctor123</code></p>
        <p><code>admin@eyeoptics.local / admin123</code></p>
        <p className="pt-2">New signups must verify their email before they can log in.</p>
      </div>
    </form>
  );
}
