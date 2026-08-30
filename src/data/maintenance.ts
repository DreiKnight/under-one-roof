import type { MaintenanceTask } from "@/types";
import { isoOffset } from "./_dates";

export const maintenanceTasks: MaintenanceTask[] = [
  {
    id: "mt-furnace-filter",
    title: "Replace HVAC air filter",
    area: "HVAC",
    nextDue: isoOffset(6),
    frequency: "Quarterly",
    status: "due",
    notes: "20x25x1 filter. Located behind the hallway return vent.",
  },
  {
    id: "mt-smoke",
    title: "Test smoke & CO detectors",
    area: "Safety",
    nextDue: isoOffset(-3),
    frequency: "Quarterly",
    status: "overdue",
    notes: "Three units: kitchen, hallway, both bedrooms.",
  },
  {
    id: "mt-gutters",
    title: "Clean gutters",
    area: "Exterior",
    nextDue: isoOffset(34),
    frequency: "Twice a year",
    status: "scheduled",
  },
  {
    id: "mt-fridge-coils",
    title: "Vacuum refrigerator coils",
    area: "Appliances",
    nextDue: isoOffset(58),
    frequency: "Twice a year",
    status: "scheduled",
  },
  {
    id: "mt-dryer-vent",
    title: "Clear dryer vent & lint trap",
    area: "Safety",
    nextDue: isoOffset(19),
    frequency: "Yearly",
    status: "scheduled",
    notes: "Fire-safety task — don't skip.",
  },
  {
    id: "mt-faucets",
    title: "Check faucets & under-sink for leaks",
    area: "Plumbing",
    nextDue: isoOffset(-12),
    frequency: "Quarterly",
    status: "done",
  },
];
