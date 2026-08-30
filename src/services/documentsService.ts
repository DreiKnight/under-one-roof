import type { HomeDocument } from "@/types";
import { documents } from "@/data/documents";
import { isDemo, isLive } from "@/config";
import { createCollection } from "@/services/storage";

// Phase 2: list from a PRIVATE storage bucket via short-lived signed URLs —
// never public links. See docs/10_SECURITY_PRIVACY.md.
const collection = createCollection<HomeDocument>("documents");

export function getDocuments(): HomeDocument[] {
  return isLive() ? collection.list() : documents;
}

export function getDocument(id: string): HomeDocument | undefined {
  return isLive() ? collection.get(id) : documents.find((d) => d.id === id);
}

export function createDocument(data: Omit<HomeDocument, "id"> & { id?: string }): HomeDocument {
  if (isDemo()) throw new Error("Demo is read-only");
  return collection.create(data);
}

export function updateDocument(id: string, patch: Partial<HomeDocument>): HomeDocument | undefined {
  if (isDemo()) throw new Error("Demo is read-only");
  return collection.update(id, patch);
}

export function removeDocument(id: string): void {
  if (isDemo()) throw new Error("Demo is read-only");
  collection.remove(id);
}
