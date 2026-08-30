import { ShieldCheck, Info } from "lucide-react";
import { isDemo, isLive } from "@/config";

// Always-visible reminder that the app is running on mock data and is not yet
// safe for real personal information. A core product principle: don't invite
// real data before auth, authorization, private storage, and DB security exist.
export function DemoBanner() {
  if (isDemo()) {
    return (
      <div className="flex items-center justify-center gap-2 bg-evergreen-deep px-4 py-1.5 text-center text-xs font-medium text-paper/95">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
        <span>
          Demo mode — sample data only. Please don't enter real addresses, documents, or financial
          details until secure accounts &amp; storage are live.
        </span>
      </div>
    );
  }

  if (isLive()) {
    return (
      <div className="flex items-center justify-center gap-2 border-b border-stone bg-paper-raised px-4 py-1.5 text-center text-xs text-muted">
        <Info className="h-3.5 w-3.5 shrink-0" />
        <span>Test build · your data is saved in this browser only</span>
      </div>
    );
  }

  return null;
}
