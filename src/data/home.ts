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

// ── Emergency contacts — flat list, each tagged with its property ─────────
export const emergencyContacts: EmergencyContact[] = [
  // home-maple (renter)
  { id: "ec-maple-1", propertyId: "home-maple", label: "Landlord / Property mgr", name: "Hearth Property Group", phone: "(301) 555-0142" },
  { id: "ec-maple-2", propertyId: "home-maple", label: "Water shut-off",          name: "Basement, NW corner",   phone: "—"              },
  { id: "ec-maple-3", propertyId: "home-maple", label: "Electric utility",        name: "Potomac Edison",         phone: "1-888-555-0177" },
  { id: "ec-maple-4", propertyId: "home-maple", label: "Preferred plumber",       name: "Wexler & Sons Plumbing", phone: "(301) 555-0190" },
  { id: "ec-maple-5", propertyId: "home-maple", label: "Renters insurance",       name: "Lemonbrook Insurance",   phone: "1-800-555-0123" },
  // home-elm (homeowner)
  { id: "ec-elm-1", propertyId: "home-elm", label: "Mortgage servicer",   name: "Lakeview Loan Servicing",  phone: "1-800-555-0210" },
  { id: "ec-elm-2", propertyId: "home-elm", label: "Water shut-off",      name: "Utility room, main valve", phone: "—"              },
  { id: "ec-elm-3", propertyId: "home-elm", label: "Electric utility",    name: "Potomac Edison",           phone: "1-888-555-0177" },
  { id: "ec-elm-4", propertyId: "home-elm", label: "HVAC contractor",     name: "Pura Vida HVAC",           phone: "(240) 555-0118" },
  { id: "ec-elm-5", propertyId: "home-elm", label: "Homeowner insurance", name: "Allstate – Policy #HO7712", phone: "1-800-555-0300" },
];
