import { Badge } from "./Badge";
import type { BillStatus, ContractStatus, MaintenanceStatus } from "@/types";

type AnyStatus = BillStatus | ContractStatus | MaintenanceStatus;

const map: Record<AnyStatus, { label: string; tone: "evergreen" | "honey" | "clay" | "neutral" | "muted" }> = {
  // bills
  upcoming: { label: "Upcoming", tone: "neutral" },
  "due-soon": { label: "Due soon", tone: "honey" },
  overdue: { label: "Overdue", tone: "clay" },
  paid: { label: "Paid", tone: "evergreen" },
  // contracts
  active: { label: "Active", tone: "evergreen" },
  "renewing-soon": { label: "Renewing soon", tone: "honey" },
  expired: { label: "Expired", tone: "muted" },
  // maintenance
  scheduled: { label: "Scheduled", tone: "neutral" },
  due: { label: "Due", tone: "honey" },
  done: { label: "Done", tone: "evergreen" },
};

export function StatusPill({ status }: { status: AnyStatus }) {
  const cfg = map[status];
  return <Badge tone={cfg.tone}>{cfg.label}</Badge>;
}
