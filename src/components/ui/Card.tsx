import type { ReactNode } from "react";
import { classNames } from "@/lib/format";

export function Card({
  children,
  className,
  as: Tag = "div",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  interactive?: boolean;
}) {
  return (
    <Tag
      className={classNames(
        "rounded-2xl border border-stone bg-paper-raised shadow-soft",
        interactive && "transition-shadow hover:shadow-lift",
        className
      )}
    >
      {children}
    </Tag>
  );
}
