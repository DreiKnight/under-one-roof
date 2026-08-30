// Returns an ISO date string offset from today by `days`. Keeps the mock data
// feeling "live" (things due soon, recently paid, etc.) no matter when the app
// is opened. All mock files build their dates from this helper.

export function isoOffset(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
