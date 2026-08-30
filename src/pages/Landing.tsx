import {
  Receipt,
  FileText,
  FolderArchive,
  Wrench,
  Hammer,
  Sparkles,
  Lock,
  Bell,
  ArrowRight,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Wordmark, RoofMark } from "@/components/RoofMark";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const features = [
  { icon: Receipt, title: "Bills", body: "Every due date in one place, so nothing slips past you." },
  { icon: FileText, title: "Contracts & leases", body: "Plain-language summaries of the fine print — with renewal dates surfaced early." },
  { icon: FolderArchive, title: "Documents", body: "Leases, policies, warranties and invoices, kept tidy and findable." },
  { icon: Wrench, title: "Maintenance", body: "Seasonal upkeep on a gentle schedule, before small things become big ones." },
  { icon: Hammer, title: "Repairs", body: "A running history of what was fixed, by whom, and what's still under warranty." },
  { icon: Sparkles, title: "AI assistant", body: "Ask about your home and get answers — only from documents you choose to share." },
];

export function Landing() {
  const { enterDemo } = useAuth();
  const navigate = useNavigate();

  function handleTryDemo() {
    enterDemo();
    navigate("/app");
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Wordmark />
        <nav className="flex items-center gap-2">
          <Button to="/login" variant="ghost" size="sm">
            Log in
          </Button>
          <Button to="/signup" size="sm">
            Get started
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-12 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone bg-paper-raised px-3 py-1 text-xs font-medium text-muted">
              <Lock className="h-3 w-3" /> Private by design
            </span>
            <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink text-balance sm:text-6xl">
              Your home finally has a memory.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Bills, leases, documents, maintenance, repairs and renewals — everything your home
              needs, calmly kept under one roof.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button to="/signup" size="lg">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="demo" size="lg" onClick={handleTryDemo}>
                <Play className="h-4 w-4" /> Try the demo
              </Button>
            </div>
            <div className="mt-3">
              <Button to="/login" variant="ghost" size="sm">
                I already have an account
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted">Free to try with sample data. No card, no setup.</p>
          </div>

          {/* Hero visual: a house that "holds" the home's records */}
          <HeroHouse />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink">
            Everything your home needs, in one place
          </h2>
          <p className="mt-2 text-ink-soft">
            No more scattered folders, screenshots, and "where did I put that lease?" moments.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-stone bg-paper-raised p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-evergreen-wash text-evergreen">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-medium text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 rounded-2xl border border-stone bg-paper-raised p-8 sm:grid-cols-3">
          {[
            { icon: Lock, title: "Security first", body: "Your home data is yours. Built to keep private things private." },
            { icon: Bell, title: "Quietly ahead of you", body: "Gentle nudges before renewals, deadlines, and upkeep — never spammy." },
            { icon: Sparkles, title: "AI on your terms", body: "Document analysis only runs on files you explicitly choose to share." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-3">
              <span className="mt-0.5 text-evergreen">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-medium text-ink">{title}</h3>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted">
            <RoofMark className="h-7 w-7" />
            Everything your home needs, under one roof.
          </div>
          <p className="text-xs text-muted">© {new Date().getFullYear()} Under One Roof · Demo build</p>
        </div>
      </footer>
    </div>
  );
}

function HeroHouse() {
  return (
    <div className="relative animate-fade-up">
      <div className="rounded-2xl border border-stone bg-gradient-to-b from-paper-raised to-paper p-8 shadow-lift">
        <svg viewBox="0 0 320 240" className="w-full" fill="none" aria-hidden="true">
          {/* roof */}
          <path
            d="M40 120 L160 36 L280 120"
            stroke="#2F6F5E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 360, animation: "draw-roof 1.1s ease-out both" }}
          />
          {/* walls */}
          <path d="M70 110 V200 H250 V110" stroke="#D6CFC1" strokeWidth="3" strokeLinecap="round" />
          {/* the "records" stacked safely inside */}
          {[
            { y: 130, w: 120, c: "#E7F0EC" },
            { y: 150, w: 150, c: "#FBF1E1" },
            { y: 170, w: 100, c: "#E7F0EC" },
          ].map((r, i) => (
            <rect
              key={i}
              x={90}
              y={r.y}
              width={r.w}
              height="12"
              rx="6"
              fill={r.c}
              className="animate-fade-up"
              style={{ animationDelay: `${0.4 + i * 0.15}s` }}
            />
          ))}
          {/* light on */}
          <circle cx="160" cy="92" r="5" fill="#E0A458" />
          <circle cx="160" cy="92" r="13" fill="#E0A458" fillOpacity="0.2" />
        </svg>
        <div className="mt-2 flex items-center justify-between rounded-xl bg-paper-sunk px-4 py-3 text-sm">
          <span className="font-medium text-ink">Next up</span>
          <span className="text-muted">Rent · due in 4 days</span>
        </div>
      </div>
    </div>
  );
}
