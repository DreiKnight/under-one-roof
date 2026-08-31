import type { EmergencyContact, HomeProfile } from "@/types";
import { allProperties, emergencyContacts as demoEmergencyContacts } from "@/data/home";
import { isDemo, isLive } from "@/config";
import { createCollection } from "@/services/storage";

// Phase 2: replace collection bodies with Supabase queries scoped to the
// current user (same createCollection swap-in seam every other service uses).
const propertiesCollection = createCollection<HomeProfile>("properties");
const contactsCollection = createCollection<EmergencyContact>("emergency-contacts");

export function getAllProperties(): HomeProfile[] {
  return isLive() ? propertiesCollection.list() : allProperties;
}

/** The first/primary property, if any. Live accounts start with none until
 * the user adds one via createProperty(). */
export function getHomeProfile(): HomeProfile | undefined {
  return getAllProperties()[0];
}

export function createProperty(data: Omit<HomeProfile, "id"> & { id?: string }): HomeProfile {
  if (isDemo()) throw new Error("Demo is read-only");
  return propertiesCollection.create(data);
}

export function updateProperty(id: string, patch: Partial<HomeProfile>): HomeProfile | undefined {
  if (isDemo()) throw new Error("Demo is read-only");
  return propertiesCollection.update(id, patch);
}

export function removeProperty(id: string): void {
  if (isDemo()) throw new Error("Demo is read-only");
  propertiesCollection.remove(id);
}

export function getEmergencyContacts(propertyId?: string): EmergencyContact[] {
  const all = isLive() ? contactsCollection.list() : demoEmergencyContacts;
  return propertyId ? all.filter((c) => c.propertyId === propertyId) : all;
}

export function createEmergencyContact(
  data: Omit<EmergencyContact, "id"> & { id?: string }
): EmergencyContact {
  if (isDemo()) throw new Error("Demo is read-only");
  return contactsCollection.create(data);
}

export function removeEmergencyContact(id: string): void {
  if (isDemo()) throw new Error("Demo is read-only");
  contactsCollection.remove(id);
}
