import type { Repair } from "@/types";
import { isoOffset } from "./_dates";

export const repairs: Repair[] = [
  {
    id: "rep-hvac",
    title: "HVAC spring tune-up",
    area: "HVAC",
    vendor: "Pura Vida HVAC",
    date: isoOffset(-92),
    cost: 149,
    warrantyUntil: isoOffset(273),
    notes: "Cleaned condenser, topped refrigerant, replaced capacitor.",
  },
  {
    id: "rep-disposal",
    title: "Garbage disposal replacement",
    area: "Plumbing",
    vendor: "Wexler & Sons Plumbing",
    date: isoOffset(-156),
    cost: 218.5,
    warrantyUntil: isoOffset(574),
    notes: "1/2 HP unit. Old one seized — landlord reimbursed 50%.",
  },
  {
    id: "rep-paint",
    title: "Patch & repaint living room wall",
    area: "Interior",
    vendor: "Self",
    date: isoOffset(-40),
    cost: 36.2,
    notes: "Spackle + 1 qt matched paint. Kept receipt for move-out.",
  },
  {
    id: "rep-window",
    title: "Re-seal drafty bedroom window",
    area: "Exterior",
    vendor: "Self",
    date: isoOffset(-220),
    cost: 14.0,
  },
];
