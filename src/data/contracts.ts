import type { Contract } from "@/types";
import { isoOffset } from "./_dates";

export const contracts: Contract[] = [
  {
    id: "contract-lease",
    title: "Apartment lease — Maple Street",
    counterparty: "Hearth Property Group",
    kind: "Lease",
    startDate: isoOffset(-300),
    endDate: isoOffset(48),
    monthlyCost: 1850,
    status: "renewing-soon",
    autoRenews: false,
    noticePeriodDays: 60,
    summary:
      "A 12-month residential lease. Rent is due on the 1st with a 5-day grace period. Either party must give 60 days' written notice before the end date; otherwise the lease may convert to month-to-month at a higher rate. A $1,850 security deposit is held and returnable within 45 days of move-out, less documented damages.",
  },
  {
    id: "contract-renters",
    title: "Renters insurance policy",
    counterparty: "Lemonbrook Insurance",
    kind: "Insurance",
    startDate: isoOffset(-120),
    endDate: isoOffset(245),
    monthlyCost: 18.5,
    status: "active",
    autoRenews: true,
    summary:
      "Covers personal property up to $30,000 and personal liability up to $100,000, with a $500 deductible. Renews automatically each year unless cancelled. Worth comparing quotes before renewal — premiums for similar coverage vary widely.",
  },
  {
    id: "contract-internet",
    title: "Internet service agreement",
    counterparty: "Comcast Xfinity",
    kind: "Service",
    startDate: isoOffset(-410),
    endDate: isoOffset(20),
    monthlyCost: 79.99,
    status: "renewing-soon",
    autoRenews: true,
    summary:
      "Promotional rate ends soon, after which the monthly price is scheduled to increase by roughly $25. No early-termination fee remains. This is a common point to call and renegotiate or switch providers.",
  },
  {
    id: "contract-warranty-fridge",
    title: "Refrigerator extended warranty",
    counterparty: "Whirlpool Care+",
    kind: "Warranty",
    startDate: isoOffset(-200),
    endDate: isoOffset(530),
    status: "active",
    autoRenews: false,
    summary:
      "Covers parts and labor for the refrigerator through the end date. Keep the original purchase receipt and the repair history together — both are usually required to make a claim.",
  },
];
