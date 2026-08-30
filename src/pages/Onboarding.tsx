import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Building2, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { RoofMark } from "@/components/RoofMark";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { classNames } from "@/lib/format";

const interests = [
  "Bills & due dates",
  "Lease / mortgage",
  "Maintenance reminders",
  "Repair history",
  "Insurance & warranties",
  "Renewals & renegotiation",
];

export function Onboarding() {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [homeType, setHomeType] = useState<"Renter" | "Homeowner" | null>(null);
  const [picked, setPicked] = useState<string[]>([]);

  function finish() {
    completeOnboarding();
    navigate("/app");
  }

  const steps = [
    // Step 0 — welcome
    <div key="welcome" className="text-center">
      <RoofMark className="mx-auto h-14 w-14" animated />
      <h1 className="mt-5 font-display text-3xl font-medium tracking-tight text-ink">
        Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
      </h1>
      <p className="mx-auto mt-2 max-w-md text-ink-soft">
        Let's set up your home in a couple of quick steps. You can change anything later — and for
        now, everything runs on sample data.
      </p>
      <div className="mx-auto mt-6 flex max-w-sm items-start gap-2 rounded-xl border border-stone bg-paper-sunk px-4 py-3 text-left text-sm text-muted">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-evergreen" />
        We won't ask for real addresses or documents until secure accounts and storage are in place.
      </div>
    </div>,

    // Step 1 — home type
    <div key="type">
      <StepTitle n={1} title="Which sounds like you?" />
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { v: "Renter" as const, icon: Building2, body: "Lease, renters insurance, deposit, landlord contacts." },
          { v: "Homeowner" as const, icon: Home, body: "Mortgage, home insurance, warranties, upkeep." },
        ].map(({ v, icon: Icon, body }) => (
          <button
            key={v}
            onClick={() => setHomeType(v)}
            className={classNames(
              "rounded-2xl border p-5 text-left transition-colors",
              homeType === v
                ? "border-evergreen bg-evergreen-wash"
                : "border-stone bg-paper-raised hover:border-stone-deep"
            )}
          >
            <Icon className={classNames("h-6 w-6", homeType === v ? "text-evergreen" : "text-muted")} />
            <p className="mt-3 font-medium text-ink">{v}</p>
            <p className="mt-1 text-sm text-muted">{body}</p>
          </button>
        ))}
      </div>
    </div>,

    // Step 2 — interests
    <div key="interests">
      <StepTitle n={2} title="What should your home keep track of?" subtitle="Pick a few — this just shapes your dashboard." />
      <div className="flex flex-wrap gap-2">
        {interests.map((label) => {
          const on = picked.includes(label);
          return (
            <button
              key={label}
              onClick={() =>
                setPicked((p) => (on ? p.filter((x) => x !== label) : [...p, label]))
              }
              className={classNames(
                "rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                on
                  ? "border-evergreen bg-evergreen-wash text-evergreen-deep"
                  : "border-stone bg-paper-raised text-ink-soft hover:border-stone-deep"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>,

    // Step 3 — ready
    <div key="ready" className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-evergreen-wash">
        <Home className="h-7 w-7 text-evergreen" />
      </div>
      <h2 className="mt-5 font-display text-3xl font-medium tracking-tight text-ink">
        Your home is ready.
      </h2>
      <p className="mx-auto mt-2 max-w-md text-ink-soft">
        We've loaded a sample {homeType?.toLowerCase() ?? "home"} so you can explore everything Under
        One Roof can do. Take a look around.
      </p>
    </div>,
  ];

  const isLast = step === steps.length - 1;
  const canAdvance = step !== 1 || homeType !== null;

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-6 py-10">
        {/* progress */}
        <div className="mb-10 flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={classNames(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-evergreen" : "bg-stone"
              )}
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-center">{steps[step]}</div>

        <div className="mt-10 flex items-center justify-between">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : (
            <span />
          )}
          {isLast ? (
            <Button size="lg" onClick={finish}>
              Go to dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="lg" disabled={!canAdvance} onClick={() => setStep((s) => s + 1)}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepTitle({ n, title, subtitle }: { n: number; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-evergreen">Step {n}</p>
      <h2 className="mt-1 font-display text-2xl font-medium tracking-tight text-ink">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}
