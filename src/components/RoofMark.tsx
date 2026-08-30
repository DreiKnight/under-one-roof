import { Link } from "react-router-dom";
import { classNames } from "@/lib/format";
import { useAuth } from "@/context/AuthContext";

// The signature element of the whole product: a single pitched roofline that
// "holds" everything beneath it. Used as the logo, on auth pages, and as a
// quiet motif. The little honey dot is the "light is on" — the home is awake.

export function RoofMark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={classNames("h-9 w-9", className)}
    >
      <rect x="1" y="1" width="38" height="38" rx="9" className="fill-evergreen" />
      <path
        d="M9 21.5 20 11l11 10.5"
        className="stroke-paper"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={
          animated
            ? { strokeDasharray: 120, animation: "draw-roof 0.9s ease-out both" }
            : undefined
        }
      />
      <path
        d="M12.5 20V28.5h15V20"
        className="stroke-paper"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="24.5" r="1.9" className="fill-honey animate-honey-pulse" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  const { user } = useAuth();
  const dest = user ? "/app" : "/";
  return (
    <Link to={dest} className={classNames("flex items-center gap-2.5", className)}>
      <RoofMark />
      <span className="font-display text-[1.35rem] font-medium tracking-tight text-ink">
        Under One Roof
      </span>
    </Link>
  );
}
