"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useNavigationProgress } from "@/components/navigation/navigation-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SessionResponse = {
  message?: string;
  error?: string;
  user?: {
    role: "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "OPTICAL_STAFF" | "PATIENT";
  };
};

const roleRedirectMap: Record<NonNullable<SessionResponse["user"]>["role"], string> = {
  SUPER_ADMIN: "/admin",
  ADMIN: "/admin",
  DOCTOR: "/doctor",
  RECEPTIONIST: "/reception",
  OPTICAL_STAFF: "/optical",
  PATIENT: "/patient/dashboard"
};

export function LoginForm() {
  const router = useRouter();
  const { startNavigation } = useNavigationProgress();
  const [email, setEmail] = useState("patient@eyeoptics.local");
  const [password, setPassword] = useState("patient123");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

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
    router.push(roleRedirectMap[data.user.role]);
    router.refresh();
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

      <div className="button-row">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Signing in..." : "Continue"}
        </Button>
      </div>

      <div className="mt-4 space-y-1 text-sm text-muted-foreground">
        <p>Demo accounts for this phase:</p>
        <p><code>superadmin@eyeoptics.local / super123</code></p>
        <p><code>reception@eyeoptics.local / reception123</code></p>
        <p><code>optical@eyeoptics.local / optical123</code></p>
        <p><code>patient@eyeoptics.local / patient123</code></p>
        <p><code>doctor@eyeoptics.local / doctor123</code></p>
        <p><code>admin@eyeoptics.local / admin123</code></p>
      </div>
    </form>
  );
}
