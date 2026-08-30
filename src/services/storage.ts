// Tiny localStorage-backed store for LIVE mode. Live collections start EMPTY
// (new users shouldn't see demo's sample data). Demo mode never touches this —
// it reads the mock arrays directly. Not a backend; data stays on-device.
import { userPrefix } from "@/config";

const NS = "uor:";

function keyFor(key: string): string {
  return NS + userPrefix() + key;
}

function read<T>(key: string): T[] | null {
  try {
    const raw = localStorage.getItem(keyFor(key));
    return raw ? (JSON.parse(raw) as T[]) : null;
  } catch {
    return null;
  }
}
function write<T>(key: string, rows: T[]): void {
  try {
    localStorage.setItem(keyFor(key), JSON.stringify(rows));
  } catch {
    /* ignore quota / serialization errors */
  }
}

export interface HasId {
  id: string;
}

export function createCollection<T extends HasId>(key: string) {
  return {
    list(): T[] {
      return read<T>(key) ?? [];
    },
    get(id: string): T | undefined {
      return (read<T>(key) ?? []).find((r) => r.id === id);
    },
    create(row: Omit<T, "id"> & { id?: string }): T {
      const rows = read<T>(key) ?? [];
      const item = { ...(row as object), id: row.id ?? crypto.randomUUID() } as T;
      rows.push(item);
      write(key, rows);
      return item;
    },
    update(id: string, patch: Partial<T>): T | undefined {
      const rows = read<T>(key) ?? [];
      const i = rows.findIndex((r) => r.id === id);
      if (i === -1) return undefined;
      rows[i] = { ...rows[i], ...patch, id };
      write(key, rows);
      return rows[i];
    },
    remove(id: string): void {
      write(key, (read<T>(key) ?? []).filter((r) => r.id !== id));
    },
    clear(): void {
      write(key, []);
    },
  };
}
