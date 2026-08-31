// Shared domain types for Under One Roof.
// These mirror what a real database schema would eventually hold, so pages and
// mock data stay consistent as the backend gets wired in later.

export type Currency = number; // stored in dollars for the mock layer

export type BillStatus = "upcoming" | "due-soon" | "overdue" | "paid";
export type BillCadence = "monthly" | "quarterly" | "yearly" | "one-time";

export interface Bill {
  id: string;
  name: string;
  provider: string;
  category: "Utilities" | "Housing" | "Insurance" | "Internet" | "Services" | "Other";
  amount: Currency;
  dueDate: string; // ISO date
  cadence: BillCadence;
  status: BillStatus;
  autopay: boolean;
}

export type ContractStatus = "active" | "renewing-soon" | "expired";
export type ContractKind =
  | "Lease"
  | "Mortgage"
  | "Insurance"
  | "Service"
  | "Warranty"
  | "Utility";

export interface Contract {
  id: string;
  title: string;
  counterparty: string;
  kind: ContractKind;
  startDate: string; // ISO
  endDate: string; // ISO (renewal / expiry)
  monthlyCost?: Currency;
  status: ContractStatus;
  autoRenews: boolean;
  // A short, plain-language summary. In production this would be produced by
  // permission-based AI analysis and always shown with a "not legal advice"
  // disclaimer.
  summary?: string;
  noticePeriodDays?: number;
}

export type DocumentKind =
  | "Lease"
  | "Insurance"
  | "Mortgage"
  | "Warranty"
  | "Invoice"
  | "Manual"
  | "ID"
  | "Other";

export interface HomeDocument {
  id: string;
  name: string;
  kind: DocumentKind;
  uploadedAt: string; // ISO
  sizeKb: number;
  // Whether the user has explicitly allowed AI to read this document.
  aiAnalysisAllowed: boolean;
}

export type MaintenanceStatus = "scheduled" | "due" | "overdue" | "done";
export type MaintenanceFrequency =
  | "Monthly"
  | "Quarterly"
  | "Twice a year"
  | "Yearly"
  | "Seasonal";

export interface MaintenanceTask {
  id: string;
  title: string;
  area: "HVAC" | "Plumbing" | "Exterior" | "Safety" | "Appliances" | "General";
  nextDue: string; // ISO
  frequency: MaintenanceFrequency;
  status: MaintenanceStatus;
  notes?: string;
}

export interface Repair {
  id: string;
  title: string;
  area: string;
  vendor: string;
  date: string; // ISO — when the work happened
  cost: Currency;
  warrantyUntil?: string; // ISO
  notes?: string;
}

export interface HomeProfile {
  id: string;           // unique per property — used by the switcher
  nickname: string;
  type: "Renter" | "Homeowner";
  address: string;      // masked in the UI during demo mode
  members: number;
  yearMovedIn: number;
  // Renter-specific
  securityDeposit?: Currency;  // amount held
  moveInDate?: string;         // ISO — for move-out checklist countdown
  // Homeowner-specific
  purchasePrice?: Currency;
  estimatedValue?: Currency;
  mortgageBalance?: Currency;
}

export interface EmergencyContact {
  id: string;
  propertyId: string;
  label: string;
  name: string;
  phone: string;
}

// People & businesses tied to the home (landlord, plumber, insurer, etc.).
// Mirrors the `contacts` table in 05_DATA_MODEL.md.
export type ContactType =
  | "Landlord"
  | "Property manager"
  | "Plumber"
  | "Electrician"
  | "HVAC"
  | "Insurance"
  | "Utility"
  | "Contractor"
  | "Other";

export interface Contact {
  id: string;
  name: string;
  type: ContactType;
  phone?: string;
  email?: string;
  website?: string;
  rating?: number; // 1–5, user's own rating
  notes?: string;
}

// A scheduled nudge derived from a bill, contract, task, etc.
// Mirrors the `reminders` table in 05_DATA_MODEL.md.
export type ReminderType =
  | "bill"
  | "contract"
  | "maintenance"
  | "repair"
  | "document"
  | "custom";
export type ReminderStatus = "pending" | "completed" | "dismissed";
export type RelatedEntityType =
  | "bill"
  | "contract"
  | "maintenance"
  | "repair"
  | "document"
  | "home"
  | "none";

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  dueDate: string; // ISO
  reminderType: ReminderType;
  status: ReminderStatus;
  relatedEntityType?: RelatedEntityType;
  relatedEntityId?: string;
}

// An AI-generated suggestion (negotiation, renewal, safety, cost change…).
// Mirrors the `insights` table in 05_DATA_MODEL.md. These are always framed as
// suggestions, never legal/financial certainty.
export type InsightType =
  | "negotiation"
  | "maintenance"
  | "renewal"
  | "safety"
  | "cost_change"
  | "document"
  | "general";
export type InsightPriority = "low" | "medium" | "high";
export type InsightStatus = "active" | "dismissed" | "completed";

export interface Insight {
  id: string;
  title: string;
  message: string;
  insightType: InsightType;
  priority: InsightPriority;
  status: InsightStatus;
  relatedEntityType?: RelatedEntityType;
  relatedEntityId?: string;
}
