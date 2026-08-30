import { Plus, Hammer, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getRepairs } from "@/services/repairsService";
import { formatCurrency, formatDate, daysUntil } from "@/lib/format";

export function Repairs() {
  const repairs = getRepairs();
  const sorted = [...repairs].sort((a, b) => (a.date < b.date ? 1 : -1));
  const total = repairs.reduce((sum, r) => sum + r.cost, 0);
  const underWarranty = repairs.filter((r) => r.warrantyUntil && daysUntil(r.warrantyUntil) > 0).length;

  return (
    <div>
      <PageHeader
        title="Repairs"
        subtitle="A running history of what was fixed, by whom, and what's still under warranty."
        action={
          <Button>
            <Plus className="h-4 w-4" /> Log a repair
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm text-muted">Total logged</p>
          <p className="mt-1 font-display text-2xl font-medium text-ink">{formatCurrency(total)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Repairs on record</p>
          <p className="mt-1 font-display text-2xl font-medium text-ink">{repairs.length}</p>
        </Card>
        <Card className="col-span-2 p-5 sm:col-span-1">
          <p className="text-sm text-muted">Under warranty</p>
          <p className="mt-1 font-display text-2xl font-medium text-evergreen-deep">{underWarranty}</p>
        </Card>
      </div>

      {/* Timeline */}
      <ol className="relative space-y-4 border-l border-stone pl-6">
        {sorted.map((r) => {
          const covered = r.warrantyUntil && daysUntil(r.warrantyUntil) > 0;
          return (
            <li key={r.id} className="relative">
              <span className="absolute -left-[1.65rem] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-paper bg-paper-sunk text-muted">
                <Hammer className="h-3.5 w-3.5" />
              </span>
              <Card className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-ink">{r.title}</p>
                      <Badge tone="neutral">{r.area}</Badge>
                      {covered && (
                        <Badge tone="evergreen">
                          <ShieldCheck className="h-3 w-3" /> Warranty to {formatDate(r.warrantyUntil!)}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {r.vendor} · {formatDate(r.date)}
                    </p>
                    {r.notes && <p className="mt-1.5 text-sm text-ink-soft">{r.notes}</p>}
                  </div>
                  <p className="shrink-0 font-display text-lg font-medium text-ink">
                    {formatCurrency(r.cost)}
                  </p>
                </div>
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
