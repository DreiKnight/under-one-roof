import type { ReactNode } from "react";
import { Card } from "./Card";

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "ink",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  tone?: "ink" | "honey" | "clay" | "evergreen";
}) {
  const valueColor =
    tone === "clay"
      ? "text-clay"
      : tone === "honey"
        ? "text-honey-deep"
        : tone === "evergreen"
          ? "text-evergreen-deep"
          : "text-ink";
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        {icon && <span className="text-evergreen-soft">{icon}</span>}
      </div>
      <p className={`mt-2 font-display text-3xl font-medium tracking-tight ${valueColor}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </Card>
  );
}
