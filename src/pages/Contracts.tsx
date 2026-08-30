import { useState } from "react";
import {
  Plus,
  FileText,
  ChevronDown,
  CalendarClock,
  Repeat,
  Sparkles,
  Bell,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatusPill } from "@/components/ui/StatusPill";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { getContracts } from "@/services/contractsService";
import { formatCurrency, formatDate, relativeDays, daysUntil, classNames } from "@/lib/format";

export function Contracts() {
  const contracts = getContracts();
  const [openId, setOpenId] = useState<string | null>(contracts[0]?.id ?? null);

  const sorted = [...contracts].sort((a, b) => daysUntil(a.endDate) - daysUntil(b.endDate));

  return (
    <div>
      <PageHeader
        title="Contracts & leases"
        subtitle="The fine print, in plain language — with renewal dates surfaced before they sneak up."
        action={
          <Button>
            <Plus className="h-4 w-4" /> Add a contract
          </Button>
        }
      />

      <div className="space-y-4">
        {sorted.map((c) => {
          const open = openId === c.id;
          const d = daysUntil(c.endDate);
          const soon = d >= 0 && d <= 60;
          return (
            <Card key={c.id} interactive>
              <button
                onClick={() => setOpenId(open ? null : c.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper-sunk text-evergreen">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-ink">{c.title}</p>
                    <Badge tone="neutral">{c.kind}</Badge>
                    {c.autoRenews && (
                      <Badge tone="honey">
                        <Repeat className="h-3 w-3" /> Auto-renews
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted">{c.counterparty}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <StatusPill status={c.status} />
                  <p
                    className={classNames(
                      "mt-1 text-xs",
                      soon ? "text-honey-deep" : "text-muted"
                    )}
                  >
                    {c.status === "expired" ? "ended" : `renews ${relativeDays(c.endDate)}`}
                  </p>
                </div>
                <ChevronDown
                  className={classNames(
                    "h-5 w-5 shrink-0 text-muted transition-transform",
                    open && "rotate-180"
                  )}
                />
              </button>

              {open && (
                <div className="border-t border-stone px-5 py-5">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Detail icon={<CalendarClock className="h-4 w-4" />} label="Term">
                      {formatDate(c.startDate)} → {formatDate(c.endDate)}
                    </Detail>
                    {c.monthlyCost != null && (
                      <Detail label="Cost">{formatCurrency(c.monthlyCost)}/mo</Detail>
                    )}
                    {c.noticePeriodDays != null && (
                      <Detail icon={<Bell className="h-4 w-4" />} label="Notice required">
                        {c.noticePeriodDays} days
                      </Detail>
                    )}
                  </div>

                  {c.summary && (
                    <div className="mt-5">
                      <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-ink">
                        <Sparkles className="h-4 w-4 text-evergreen" />
                        Plain-language summary
                      </div>
                      <p className="text-sm leading-relaxed text-ink-soft">{c.summary}</p>
                      <div className="mt-3">
                        <Disclaimer />
                      </div>
                    </div>
                  )}

                  {soon && c.status !== "expired" && (
                    <div className="mt-4 flex items-start gap-2 rounded-xl border border-honey/40 bg-honey-wash px-3.5 py-2.5 text-sm text-honey-deep">
                      <Bell className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        Renews {relativeDays(c.endDate)}. A good moment to review the terms or compare
                        alternatives before it rolls over.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-ink">{children}</p>
    </div>
  );
}
