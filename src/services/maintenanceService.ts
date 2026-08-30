import type { MaintenanceTask } from "@/types";
import { maintenanceTasks } from "@/data/maintenance";
import { isDemo, isLive } from "@/config";
import { createCollection } from "@/services/storage";

const collection = createCollection<MaintenanceTask>("maintenance");

export function getMaintenanceTasks(): MaintenanceTask[] {
  return isLive() ? collection.list() : maintenanceTasks;
}

export function getMaintenanceTask(id: string): MaintenanceTask | undefined {
  return isLive() ? collection.get(id) : maintenanceTasks.find((t) => t.id === id);
}

export function createMaintenanceTask(
  data: Omit<MaintenanceTask, "id"> & { id?: string }
): MaintenanceTask {
  if (isDemo()) throw new Error("Demo is read-only");
  return collection.create(data);
}

export function updateMaintenanceTask(
  id: string,
  patch: Partial<MaintenanceTask>
): MaintenanceTask | undefined {
  if (isDemo()) throw new Error("Demo is read-only");
  return collection.update(id, patch);
}

export function removeMaintenanceTask(id: string): void {
  if (isDemo()) throw new Error("Demo is read-only");
  collection.remove(id);
}
