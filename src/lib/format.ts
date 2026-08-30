// Small, dependency-free helpers for formatting money and dates, plus a few
// date utilities the pages share.

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/** Whole days from today to the given ISO date. Negative means in the past. */
export function daysUntil(iso: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(iso + "T00:00:00");
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

/** "in 3 days", "today", "5 days ago" — friendly relative phrasing. */
export function relativeDays(iso: string): string {
  const d = daysUntil(iso);
  if (d === 0) return "today";
  if (d === 1) return "tomorrow";
  if (d === -1) return "yesterday";
  if (d > 1) return `in ${d} days`;
  return `${Math.abs(d)} days ago`;
}

/** Mask all but the city/state of an address while in demo mode. */
export function maskAddress(address: string): string {
  const parts = address.split(",");
  if (parts.length <= 1) return "•••• ••••";
  const tail = parts.slice(1).join(",").trim();
  return `•••• ${parts[0].replace(/\S/g, "•").slice(0, 6)}, ${tail}`;
}

export function classNames(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
