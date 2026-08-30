import type { Reminder } from "@/types";
import { reminders } from "@/data/reminders";

// Phase 2: derive reminders from bills/contracts/tasks, or query a table.
export function getReminders(): Reminder[] {
  return reminders;
}
