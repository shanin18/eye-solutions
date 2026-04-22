"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useNavigationProgress } from "@/components/navigation/navigation-progress";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const { startNavigation } = useNavigationProgress();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);
    await fetch("/api/auth/logout", { method: "POST" });
    startNavigation();
    router.push("/login");
    router.refresh();
  }

  return (
    <Button disabled={isSubmitting} onClick={handleLogout} type="button" variant="secondary">
      {isSubmitting ? "Logging out..." : "Logout"}
    </Button>
  );
}
