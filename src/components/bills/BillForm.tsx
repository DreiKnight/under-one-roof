import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { classNames } from "@/lib/format";
import type { Bill, BillCadence, BillStatus } from "@/types";

const categories: Bill["category"][] = ["Utilities", "Housing", "Insurance", "Internet", "Services", "Other"];
const cadences: BillCadence[] = ["monthly", "quarterly", "yearly", "one-time"];
const statuses: BillStatus[] = ["upcoming", "due-soon", "overdue", "paid"];

export type BillFormValues = Omit<Bill, "id">;

const emptyValues: BillFormValues = {
  name: "",
  provider: "",
  category: "Utilities",
  amount: 0,
  dueDate: new Date().toISOString().slice(0, 10),
  cadence: "monthly",
  status: "upcoming",
  autopay: false,
};

export function BillForm({
  initial,
  onSubmit,
  onDelete,
  onCancel,
}: {
  initial?: Bill;
  onSubmit: (values: BillFormValues) => void;
  onDelete?: () => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<BillFormValues>(initial ?? emptyValues);

  function set<K extends keyof BillFormValues>(key: K, value: BillFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Bill name">
        <input
          required
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Electric bill"
          className={inputCls}
        />
      </Field>

      <Field label="Provider">
        <input
          required
          value={values.provider}
          onChange={(e) => set("provider", e.target.value)}
          placeholder="Con Edison"
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Category">
          <select
            value={values.category}
            onChange={(e) => set("category", e.target.value as Bill["category"])}
            className={inputCls}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Amount">
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={values.amount}
            onChange={(e) => set("amount", Number(e.target.value))}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Due date">
          <input
            required
            type="date"
            value={values.dueDate}
            onChange={(e) => set("dueDate", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Cadence">
          <select
            value={values.cadence}
            onChange={(e) => set("cadence", e.target.value as BillCadence)}
            className={inputCls}
          >
            {cadences.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Status">
        <select
          value={values.status}
          onChange={(e) => set("status", e.target.value as BillStatus)}
          className={inputCls}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <label className="flex items-center justify-between rounded-xl border border-stone bg-paper px-3.5 py-2.5">
        <span className="text-sm font-medium text-ink-soft">Autopay</span>
        <Toggle on={values.autopay} onToggle={() => set("autopay", !values.autopay)} />
      </label>

      <div className="flex items-center justify-between gap-3 pt-2">
        <div>
          {onDelete && (
            <Button type="button" variant="danger" size="sm" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{initial ? "Save changes" : "Add bill"}</Button>
        </div>
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

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      className={classNames(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-evergreen" : "bg-stone-deep"
      )}
    >
      <span
        className={classNames(
          "absolute top-0.5 h-5 w-5 rounded-full bg-paper-raised shadow-soft transition-transform",
          on ? "translate-x-[1.4rem]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
