import type { HomeDocument } from "@/types";
import { isoOffset } from "./_dates";

export const documents: HomeDocument[] = [
  { id: "doc-lease", name: "Lease agreement 2024.pdf", kind: "Lease", uploadedAt: isoOffset(-300), sizeKb: 412, aiAnalysisAllowed: true },
  { id: "doc-renters", name: "Renters insurance policy.pdf", kind: "Insurance", uploadedAt: isoOffset(-118), sizeKb: 268, aiAnalysisAllowed: true },
  { id: "doc-deposit", name: "Security deposit receipt.pdf", kind: "Other", uploadedAt: isoOffset(-299), sizeKb: 96, aiAnalysisAllowed: false },
  { id: "doc-fridge", name: "Refrigerator warranty.pdf", kind: "Warranty", uploadedAt: isoOffset(-200), sizeKb: 184, aiAnalysisAllowed: false },
  { id: "doc-hvac-invoice", name: "HVAC service invoice — Mar.pdf", kind: "Invoice", uploadedAt: isoOffset(-92), sizeKb: 142, aiAnalysisAllowed: false },
  { id: "doc-manual-wash", name: "Washer-dryer manual.pdf", kind: "Manual", uploadedAt: isoOffset(-260), sizeKb: 2480, aiAnalysisAllowed: false },
  { id: "doc-movein", name: "Move-in condition photos.zip", kind: "Other", uploadedAt: isoOffset(-300), sizeKb: 8640, aiAnalysisAllowed: false },
];
