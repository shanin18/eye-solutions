"use client";

import type { Route } from "next";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useNavigationProgress } from "@/components/navigation/navigation-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type RegisterResponse = {
  message?: string;
  error?: string;
};

export function RegisterForm() {
  const router = useRouter();
  const { startNavigation } = useNavigationProgress();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fullName, phone, email, password })
    });

    const data = (await response.json()) as RegisterResponse;

    if (!response.ok) {
      setError(data.error ?? "Unable to register.");
      setIsSubmitting(false);
      return;
    }

    startNavigation();
    router.push("/patient/dashboard" as Route);
    router.refresh();
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Create patient account</h3>
      <div className="field-grid mt-4">
        <div className="field">
          <label htmlFor="full-name">Full name</label>
          <Input id="full-name" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Enter full name" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <Input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+880..." />
        </div>
        <div className="field">
          <label htmlFor="reg-email">Email</label>
          <Input id="reg-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" />
        </div>
        <div className="field">
          <label htmlFor="reg-password">Password</label>
          <Input
            id="reg-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create password"
          />
        </div>
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-orange-700">{error}</p> : null}

      <div className="button-row">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating..." : "Register"}
        </Button>
      </div>
    </form>
  );
}
