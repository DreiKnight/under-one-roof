import type { Repair } from "@/types";
import { repairs } from "@/data/repairs";
import { isDemo, isLive } from "@/config";
import { createCollection } from "@/services/storage";

const collection = createCollection<Repair>("repairs");

export function getRepairs(): Repair[] {
  return isLive() ? collection.list() : repairs;
}

export function getRepair(id: string): Repair | undefined {
  return isLive() ? collection.get(id) : repairs.find((r) => r.id === id);
}

export function createRepair(data: Omit<Repair, "id"> & { id?: string }): Repair {
  if (isDemo()) throw new Error("Demo is read-only");
  return collection.create(data);
}

export function updateRepair(id: string, patch: Partial<Repair>): Repair | undefined {
  if (isDemo()) throw new Error("Demo is read-only");
  return collection.update(id, patch);
}

export function removeRepair(id: string): void {
  if (isDemo()) throw new Error("Demo is read-only");
  collection.remove(id);
}
