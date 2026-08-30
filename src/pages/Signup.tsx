import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signUp(name, email, password);
      navigate("/app");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-up failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Your home data stays private and secure."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-evergreen hover:text-evergreen-deep">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Your name" value={name} onChange={setName} placeholder="Alex" autoComplete="name" />
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Create a password"
          autoComplete="new-password"
        />
        {error && (
          <p className="rounded-lg bg-clay/10 px-3 py-2 text-sm text-clay">{error}</p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <ul className="mt-5 space-y-1.5 text-xs text-muted">
        {["Private by design", "Data stored securely per account", "Cancel anytime"].map((t) => (
          <li key={t} className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-evergreen" /> {t}
          </li>
        ))}
      </ul>
    </AuthShell>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-stone bg-paper-raised px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-evergreen"
      />
    </label>
  );
}
