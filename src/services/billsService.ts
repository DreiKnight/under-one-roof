import type { Bill } from "@/types";
import { bills } from "@/data/bills";
import { isDemo, isLive } from "@/config";
import { createCollection } from "@/services/storage";

const collection = createCollection<Bill>("bills");

export function getBills(): Bill[] {
  return isLive() ? collection.list() : bills;
}

export function getBill(id: string): Bill | undefined {
  return isLive() ? collection.get(id) : bills.find((b) => b.id === id);
}

export function createBill(data: Omit<Bill, "id"> & { id?: string }): Bill {
  if (isDemo()) throw new Error("Demo is read-only");
  return collection.create(data);
}

export function updateBill(id: string, patch: Partial<Bill>): Bill | undefined {
  if (isDemo()) throw new Error("Demo is read-only");
  return collection.update(id, patch);
}

export function removeBill(id: string): void {
  if (isDemo()) throw new Error("Demo is read-only");
  collection.remove(id);
}
