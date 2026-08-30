import type { Contract } from "@/types";
import { contracts } from "@/data/contracts";
import { isDemo, isLive } from "@/config";
import { createCollection } from "@/services/storage";

const collection = createCollection<Contract>("contracts");

export function getContracts(): Contract[] {
  return isLive() ? collection.list() : contracts;
}

export function getContract(id: string): Contract | undefined {
  return isLive() ? collection.get(id) : contracts.find((c) => c.id === id);
}

export function createContract(data: Omit<Contract, "id"> & { id?: string }): Contract {
  if (isDemo()) throw new Error("Demo is read-only");
  return collection.create(data);
}

export function updateContract(id: string, patch: Partial<Contract>): Contract | undefined {
  if (isDemo()) throw new Error("Demo is read-only");
  return collection.update(id, patch);
}

export function removeContract(id: string): void {
  if (isDemo()) throw new Error("Demo is read-only");
  collection.remove(id);
}
