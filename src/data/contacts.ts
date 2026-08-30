import type { Contact } from "@/types";

// NOTE: Fictional sample data. See README "Security model".

export const contacts: Contact[] = [
  {
    id: "ct-landlord",
    name: "Hearth Property Group",
    type: "Property manager",
    phone: "(301) 555-0142",
    email: "office@hearth-pg.example",
    rating: 4,
    notes: "Maintenance requests go through the resident portal first.",
  },
  {
    id: "ct-plumber",
    name: "Wexler & Sons Plumbing",
    type: "Plumber",
    phone: "(301) 555-0190",
    rating: 5,
    notes: "Fixed the kitchen disposal — fast, fair price.",
  },
  {
    id: "ct-hvac",
    name: "Pura Vida HVAC",
    type: "HVAC",
    phone: "(240) 555-0118",
    website: "https://pvairmd.example",
    rating: 5,
    notes: "Did the spring AC tune-up. 1-year labor warranty.",
  },
  {
    id: "ct-insurance",
    name: "Lemonbrook Insurance",
    type: "Insurance",
    phone: "1-800-555-0123",
    notes: "Renters policy. Claims line is 24/7.",
  },
];
