import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "demo";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-colors disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-evergreen text-paper hover:bg-evergreen-deep shadow-soft",
  secondary: "bg-paper-raised text-ink border border-stone hover:border-stone-deep hover:bg-paper",
  ghost: "text-ink-soft hover:bg-paper-sunk",
  danger: "bg-clay text-paper hover:brightness-95",
  demo:   "bg-honey text-ink hover:bg-honey-deep shadow-soft",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  to?: string;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", to, className, children, ...rest }: Props) {
  const cls = classNames(base, variants[variant], sizes[size], className);
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
