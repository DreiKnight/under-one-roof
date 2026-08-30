import type { ReactNode } from "react";
import { classNames } from "@/lib/format";

type Tone = "neutral" | "evergreen" | "honey" | "clay" | "muted";

const tones: Record<Tone, string> = {
  neutral: "bg-paper-sunk text-ink-soft border-stone",
  evergreen: "bg-evergreen-wash text-evergreen-deep border-evergreen-soft/40",
  honey: "bg-honey-wash text-honey-deep border-honey/40",
  clay: "bg-clay-wash text-clay border-clay/30",
  muted: "bg-paper-sunk text-muted border-stone",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={classNames(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
