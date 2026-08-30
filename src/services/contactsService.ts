import type { Contact } from "@/types";
import { contacts } from "@/data/contacts";

// Phase 2: replace the body with a Supabase query scoped to the current user.
export function getContacts(): Contact[] {
  return contacts;
}
