import { useState } from "react";
import { Plus, Wrench, Check, Wind, Droplets, Home, ShieldAlert, Refrigerator } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatusPill } from "@/components/ui/StatusPill";
import { getMaintenanceTasks } from "@/services/maintenanceService";
import { formatDate, relativeDays, daysUntil, classNames } from "@/lib/format";
import type { MaintenanceTask } from "@/types";

const areaIcon: Record<MaintenanceTask["area"], React.ReactNode> = {
  HVAC: <Wind className="h-5 w-5" />,
  Plumbing: <Droplets className="h-5 w-5" />,
  Exterior: <Home className="h-5 w-5" />,
  Safety: <ShieldAlert className="h-5 w-5" />,
  Appliances: <Refrigerator className="h-5 w-5" />,
  General: <Wrench className="h-5 w-5" />,
};

export function Maintenance() {
  const seed = getMaintenanceTasks();
  const [tasks, setTasks] = useState<MaintenanceTask[]>(seed);

  const sorted = [...tasks].sort((a, b) => {
    if (a.status === "done" && b.status !== "done") return 1;
    if (b.status === "done" && a.status !== "done") return -1;
    return daysUntil(a.nextDue) - daysUntil(b.nextDue);
  });

  function markDone(id: string) {
    setTasks((list) =>
      list.map((t) => (t.id === id ? { ...t, status: t.status === "done" ? "scheduled" : "done" } : t))
    );
  }

  const openCount = tasks.filter((t) => t.status !== "done").length;

  return (
    <div>
      <PageHeader
        title="Maintenance"
        subtitle="Seasonal upkeep on a gentle schedule — before small things become big ones."
        action={
          <Button>
            <Plus className="h-4 w-4" /> Add a task
          </Button>
        }
      />

      <p className="mb-4 text-sm text-muted">
        {openCount} {openCount === 1 ? "task" : "tasks"} on the calendar
      </p>

      <div className="space-y-3">
        {sorted.map((t) => {
          const done = t.status === "done";
          const overdue = !done && daysUntil(t.nextDue) < 0;
          return (
            <Card key={t.id} className={classNames("p-4", done && "opacity-60")}>
              <div className="flex items-center gap-4">
                <div
                  className={classNames(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    overdue ? "bg-clay-wash text-clay" : "bg-paper-sunk text-evergreen"
                  )}
                >
                  {areaIcon[t.area]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={classNames("font-medium text-ink", done && "line-through")}>
                      {t.title}
                    </p>
                    <Badge tone="neutral">{t.area}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-muted">
                    {t.frequency} · next {formatDate(t.nextDue)}{" "}
                    {!done && <span className={overdue ? "text-clay" : ""}>· {relativeDays(t.nextDue)}</span>}
                  </p>
                  {t.notes && <p className="mt-1 text-xs text-muted">{t.notes}</p>}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <StatusPill status={t.status} />
                  <button
                    onClick={() => markDone(t.id)}
                    className={classNames(
                      "flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                      done
                        ? "text-muted hover:bg-paper-sunk"
                        : "bg-evergreen text-paper hover:bg-evergreen-deep"
                    )}
                  >
                    <Check className="h-3.5 w-3.5" />
                    {done ? "Undo" : "Mark done"}
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
