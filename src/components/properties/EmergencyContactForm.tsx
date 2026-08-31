import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export interface EmergencyContactFormValues {
  label: string;
  name: string;
  phone: string;
}

const emptyValues: EmergencyContactFormValues = { label: "", name: "", phone: "" };

export function EmergencyContactForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (values: EmergencyContactFormValues) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<EmergencyContactFormValues>(emptyValues);

  function set<K extends keyof EmergencyContactFormValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="What's this for">
        <input
          required
          value={values.label}
          onChange={(e) => set("label", e.target.value)}
          placeholder="e.g. Water shut-off, Preferred plumber"
          className={inputCls}
        />
      </Field>
      <Field label="Name">
        <input
          required
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Wexler & Sons Plumbing"
          className={inputCls}
        />
      </Field>
      <Field label="Phone">
        <input
          required
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="(555) 555-0100"
          className={inputCls}
        />
      </Field>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add contact</Button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-stone bg-paper-raised px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-evergreen";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
