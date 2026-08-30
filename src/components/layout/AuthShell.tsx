import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { Wordmark } from "@/components/RoofMark";

// Two-pane auth shell: a calm form on the left, a warm "home" panel on the
// right that carries the roofline signature and the emotional promise.
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form pane */}
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Wordmark />

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-sm text-muted">{footer}</div>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted">
          <ShieldCheck className="h-3.5 w-3.5" />
          Demo sign-in — no real account is created and nothing sensitive is stored.
        </p>
      </div>

      {/* Promise pane */}
      <div className="relative hidden overflow-hidden bg-evergreen-deep lg:block">
        <RoofScene />
        <div className="relative flex h-full flex-col justify-end p-12 text-paper">
          <p className="font-display text-[2rem] font-medium leading-tight tracking-tight text-balance">
            Your home finally has a memory.
          </p>
          <p className="mt-3 max-w-sm text-sm text-paper/70">
            Bills, leases, documents, repairs, renewals — everything your home needs, kept calm and
            in one secure place.
          </p>
        </div>
      </div>
    </div>
  );
}

function RoofScene() {
  // Quiet ambient rooflines receding into the panel — the signature, at scale.
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 600 800"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2F6F5E" />
          <stop offset="1" stopColor="#1B4034" />
        </linearGradient>
      </defs>
      <rect width="600" height="800" fill="url(#glow)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${-50 + i * 30} ${260 + i * 95} L300 ${120 + i * 95} L${650 - i * 30} ${260 + i * 95}`}
          stroke="#FAF7F1"
          strokeOpacity={0.07 + i * 0.015}
          strokeWidth="2"
          fill="none"
        />
      ))}
      <circle cx="300" cy="150" r="3.5" fill="#E0A458" />
      <circle cx="300" cy="150" r="10" fill="#E0A458" fillOpacity="0.18" />
    </svg>
  );
}
