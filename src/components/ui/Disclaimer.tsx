import { Scale } from "lucide-react";
import type { ReactNode } from "react";

// Reused wherever AI summarizes a lease, contract, or anything legal/financial.
// Required by the product principles: summaries are NOT legal advice.
export function Disclaimer({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-honey/40 bg-honey-wash px-3.5 py-2.5 text-xs leading-relaxed text-honey-deep">
      <Scale className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <p>
        {children ?? (
          <>
            This is a plain-language summary to help you understand your document — it is{" "}
            <strong className="font-semibold">not legal advice</strong>. For decisions that matter,
            check the original document and consult a qualified professional.
          </>
        )}
      </p>
    </div>
  );
}
