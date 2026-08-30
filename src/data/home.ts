import type { EmergencyContact, HomeProfile } from "@/types";
import { isoOffset } from "./_dates";

// NOTE: All sample data below is fictional. Under One Roof runs entirely on
// mock data during the MVP — see README "Security model" before connecting any
// real backend or storing real personal information.

// ── Property 1: Renter ────────────────────────────────────────────────────
export const renterProfile: HomeProfile = {
  id: "home-maple",
  nickname: "Maple Street",
  type: "Renter",
  address: "1428 Maple Street, Frederick, MD",
  members: 2,
  yearMovedIn: 2023,
  securityDeposit: 1850,
  moveInDate: isoOffset(-480),
};

// ── Property 2: Homeowner ─────────────────────────────────────────────────
export const ownerProfile: HomeProfile = {
  id: "home-elm",
  nickname: "Elm Ave",
  type: "Homeowner",
  address: "312 Elm Avenue, Frederick, MD",
  members: 3,
  yearMovedIn: 2019,
  purchasePrice: 385000,
  estimatedValue: 442000,
  mortgageBalance: 298400,
};

// ── All properties — drives the switcher ─────────────────────────────────
export const allProperties: HomeProfile[] = [renterProfile, ownerProfile];

// Default active property (first one; in production this comes from user prefs)
export const homeProfile: HomeProfile = renterProfile;

// ── Emergency contacts (keyed by property id) ─────────────────────────────
const renterContacts: EmergencyContact[] = [
  { label: "Landlord / Property mgr", name: "Hearth Property Group",   phone: "(301) 555-0142" },
  { label: "Water shut-off",          name: "Basement, NW corner",     phone: "—"               },
  { label: "Electric utility",        name: "Potomac Edison",           phone: "1-888-555-0177" },
  { label: "Preferred plumber",       name: "Wexler & Sons Plumbing",   phone: "(301) 555-0190" },
  { label: "Renters insurance",       name: "Lemonbrook Insurance",     phone: "1-800-555-0123" },
];

const ownerContacts: EmergencyContact[] = [
  { label: "Mortgage servicer",  name: "Lakeview Loan Servicing",  phone: "1-800-555-0210" },
  { label: "Water shut-off",     name: "Utility room, main valve", phone: "—"               },
  { label: "Electric utility",   name: "Potomac Edison",            phone: "1-888-555-0177" },
  { label: "HVAC contractor",    name: "Pura Vida HVAC",            phone: "(240) 555-0118" },
  { label: "Homeowner insurance",name: "Allstate – Policy #HO7712", phone: "1-800-555-0300" },
];

export const emergencyContactsByProperty: Record<string, EmergencyContact[]> = {
  "home-maple": renterContacts,
  "home-elm":   ownerContacts,
};

// Keep backward-compatible export for pages not yet property-aware
export const emergencyContacts: EmergencyContact[] = renterContacts;
