import { useState } from "react";
import { Plus, Repeat, CreditCard } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatusPill } from "@/components/ui/StatusPill";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { BillForm, type BillFormValues } from "@/components/bills/BillForm";
import { getBills, createBill, updateBill, removeBill } from "@/services/billsService";
import { isDemo } from "@/config";
import { formatCurrency, formatDate, relativeDays, daysUntil, classNames } from "@/lib/format";
import type { Bill, BillStatus } from "@/types";

type Filter = "all" | "due-soon" | "overdue" | "paid";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "due-soon", label: "Due soon" },
  { key: "overdue", label: "Overdue" },
  { key: "paid", label: "Paid" },
];

export function Bills() {
  const demo = isDemo();
  const [bills, setBills] = useState<Bill[]>(getBills());
  const [filter, setFilter] = useState<Filter>("all");
  const [editing, setEditing] = useState<Bill | "new" | null>(null);

  function refresh() {
    setBills(getBills());
  }

  function handleSubmit(values: BillFormValues) {
    if (editing && editing !== "new") {
      updateBill(editing.id, values);
    } else {
      createBill(values);
    }
    refresh();
    setEditing(null);
  }

  function handleDelete() {
    if (editing && editing !== "new") {
      removeBill(editing.id);
      refresh();
    }
    setEditing(null);
  }

  const visible = bills
    .filter((b) => (filter === "all" ? true : matches(b.status, filter)))
    .sort((a, b) => daysUntil(a.dueDate) - daysUntil(b.dueDate));

  const monthlyTotal = bills
    .filter((b) => b.cadence === "monthly")
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div>
      <PageHeader
        title="Bills"
        subtitle="Every due date in one place, so nothing slips past you."
        action={
          <Button
            onClick={() => setEditing("new")}
            disabled={demo}
            title={demo ? "Sign in to add real bills — demo data is read-only" : undefined}
          >
            <Plus className="h-4 w-4" /> Add a bill
          </Button>
        }
      />

      <Card className="mb-6 flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="text-sm text-muted">Recurring monthly</p>
          <p className="font-display text-2xl font-medium text-ink">{formatCurrency(monthlyTotal)}/mo</p>
        </div>
        <div className="flex gap-2 rounded-xl bg-paper-sunk p-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={classNames(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                filter === f.key ? "bg-paper-raised text-ink shadow-soft" : "text-muted hover:text-ink"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Card>

      {visible.length === 0 ? (
        <EmptyState
          icon={<CreditCard className="h-8 w-8" />}
          title="Nothing here"
          description="No bills match this filter right now."
        />
      ) : (
        <Card>
          <ul className="divide-y divide-stone">
            {visible.map((b) => (
              <li
                key={b.id}
                onClick={() => !demo && setEditing(b)}
                className={classNames(
                  "flex items-center gap-4 px-5 py-4",
                  !demo && "cursor-pointer transition-colors hover:bg-paper-sunk"
                )}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper-sunk text-evergreen">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-ink">{b.name}</p>
                    {b.autopay && (
                      <Badge tone="neutral">
                        <Repeat className="h-3 w-3" /> Autopay
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-sm text-muted">
                    {b.provider} · {b.category}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium text-ink">{formatDate(b.dueDate)}</p>
                  <p
                    className={classNames(
                      "text-xs",
                      b.status === "overdue" ? "text-clay" : "text-muted"
                    )}
                  >
                    {b.status === "paid" ? "paid" : relativeDays(b.dueDate)}
                  </p>
                </div>
                <div className="w-24 text-right">
                  <p className="font-display text-lg font-medium text-ink">{formatCurrency(b.amount)}</p>
                  <div className="mt-0.5 flex justify-end">
                    <StatusPill status={b.status} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {demo && (
        <p className="mt-4 text-center text-xs text-muted">
          Demo data is read-only — sign in with a live account to add or edit bills.
        </p>
      )}

      {editing && (
        <Modal title={editing === "new" ? "Add a bill" : "Edit bill"} onClose={() => setEditing(null)}>
          <BillForm
            initial={editing === "new" ? undefined : editing}
            onSubmit={handleSubmit}
            onDelete={editing !== "new" ? handleDelete : undefined}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function matches(status: BillStatus, filter: Filter): boolean {
  if (filter === "due-soon") return status === "due-soon" || status === "upcoming";
  return status === filter;
}
