import type { Reminder } from "@/types";
import { isoOffset } from "./_dates";

// NOTE: Fictional sample data. See README "Security model".

export const reminders: Reminder[] = [
  {
    id: "rm-rent",
    title: "Rent due",
    description: "August rent to Hearth Property Group.",
    dueDate: isoOffset(4),
    reminderType: "bill",
    status: "pending",
    relatedEntityType: "bill",
    relatedEntityId: "bill-rent",
  },
  {
    id: "rm-lease",
    title: "Lease renewal window opens",
    description: "Decide whether to renew or give notice.",
    dueDate: isoOffset(21),
    reminderType: "contract",
    status: "pending",
    relatedEntityType: "contract",
    relatedEntityId: "contract-lease",
  },
  {
    id: "rm-smoke",
    title: "Test smoke detectors",
    dueDate: isoOffset(-3),
    reminderType: "maintenance",
    status: "pending",
    relatedEntityType: "maintenance",
  },
  {
    id: "rm-insurance",
    title: "Renters insurance renews",
    description: "Compare coverage before it auto-renews.",
    dueDate: isoOffset(18),
    reminderType: "contract",
    status: "pending",
    relatedEntityType: "contract",
  },
];
