import type { Metadata } from "next";
import type { ReactNode } from "react";

import { NavigationProgressProvider } from "@/components/navigation/navigation-progress";

import "./globals.css";

export const metadata: Metadata = {
  title: "Eye Optics SaaS",
  description: "Clinic, patient, inventory, prescription, and optical retail workflows in one platform."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NavigationProgressProvider>{children}</NavigationProgressProvider>
      </body>
    </html>
  );
}
