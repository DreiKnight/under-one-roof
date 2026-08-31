import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { HomeProfile } from "@/types";

export type PropertyFormValues = Omit<HomeProfile, "id">;

const emptyValues: PropertyFormValues = {
  nickname: "",
  type: "Renter",
  address: "",
  members: 1,
  yearMovedIn: new Date().getFullYear(),
};

export function PropertyForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (values: PropertyFormValues) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<PropertyFormValues>(emptyValues);

  function set<K extends keyof PropertyFormValues>(key: K, value: PropertyFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Nickname">
        <input
          required
          value={values.nickname}
          onChange={(e) => set("nickname", e.target.value)}
          placeholder="e.g. Maple Street"
          className={inputCls}
        />
      </Field>

      <Field label="Type">
        <div className="grid grid-cols-2 gap-2">
          {(["Renter", "Homeowner"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set("type", t)}
              className={
                "rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors " +
                (values.type === t
                  ? "border-evergreen bg-evergreen-wash text-evergreen-deep"
                  : "border-stone bg-paper-raised text-ink-soft hover:border-stone-deep")
              }
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Address">
        <input
          required
          value={values.address}
          onChange={(e) => set("address", e.target.value)}
          placeholder="123 Main St, City, ST"
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="People in the home">
          <input
            required
            type="number"
            min="1"
            step="1"
            value={values.members}
            onChange={(e) => set("members", Number(e.target.value))}
            className={inputCls}
          />
        </Field>

        <Field label="Year moved in">
          <input
            required
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            step="1"
            value={values.yearMovedIn}
            onChange={(e) => set("yearMovedIn", Number(e.target.value))}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add property</Button>
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
