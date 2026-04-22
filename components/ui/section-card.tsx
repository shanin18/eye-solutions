import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SectionCardProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function SectionCard({ title, eyebrow, children }: SectionCardProps) {
  return (
    <Card className="section-card">
      <CardHeader className="pb-4">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <CardTitle className={eyebrow ? "mt-2" : ""}>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
