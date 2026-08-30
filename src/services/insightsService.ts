import type { Insight } from "@/types";
import { insights } from "@/data/insights";

// Phase 2: insights come from a server-side AI function (never a direct
// browser call) and are stored separately from the source documents.
// See docs/10_SECURITY_PRIVACY.md.
export function getInsights(): Insight[] {
  return insights;
}
