import { useState } from "react";
import { UploadCloud, FileText, Sparkles, Lock, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getDocuments } from "@/services/documentsService";
import { formatDate, classNames } from "@/lib/format";
import type { HomeDocument } from "@/types";

export function Documents() {
  const seed = getDocuments();
  const [docs, setDocs] = useState<HomeDocument[]>(seed);
  const [query, setQuery] = useState("");

  const visible = docs.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));
  const sharedCount = docs.filter((d) => d.aiAnalysisAllowed).length;

  function toggleAi(id: string) {
    setDocs((list) =>
      list.map((d) => (d.id === id ? { ...d, aiAnalysisAllowed: !d.aiAnalysisAllowed } : d))
    );
  }

  return (
    <div>
      <PageHeader
        title="Documents"
        subtitle="Leases, policies, warranties and invoices — kept tidy, findable, and private."
        action={
          <Button>
            <UploadCloud className="h-4 w-4" /> Upload
          </Button>
        }
      />

      {/* AI permission explainer */}
      <Card className="mb-6 flex items-start gap-3 border-evergreen-soft/40 bg-evergreen-wash/60 p-4">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" />
        <div className="text-sm">
          <p className="font-medium text-ink">AI reads only what you allow</p>
          <p className="mt-0.5 text-muted">
            The assistant can summarize a document only when you turn on access for it. You can revoke
            access any time. {sharedCount} of {docs.length} documents are currently shared.
          </p>
        </div>
      </Card>

      {/* Upload dropzone (demo) */}
      <div className="mb-6 rounded-2xl border-2 border-dashed border-stone-deep bg-paper px-6 py-8 text-center">
        <UploadCloud className="mx-auto h-7 w-7 text-evergreen-soft" />
        <p className="mt-2 text-sm font-medium text-ink">Drag files here, or browse</p>
        <p className="mt-1 text-xs text-muted">
          Demo mode — uploads are disabled until secure, private storage is connected.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents"
          className="w-full rounded-xl border border-stone bg-paper-raised py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-muted/60 focus:border-evergreen"
        />
      </div>

      <Card>
        <ul className="divide-y divide-stone">
          {visible.map((d) => (
            <li key={d.id} className="flex items-center gap-4 px-5 py-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper-sunk text-evergreen">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{d.name}</p>
                <p className="text-sm text-muted">
                  {d.kind} · {formatDate(d.uploadedAt)} · {formatSize(d.sizeKb)}
                </p>
              </div>
              <AiToggle on={d.aiAnalysisAllowed} onToggle={() => toggleAi(d.id)} />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function AiToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      className={classNames(
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        on
          ? "border-evergreen-soft/50 bg-evergreen-wash text-evergreen-deep"
          : "border-stone bg-paper text-muted hover:border-stone-deep"
      )}
    >
      {on ? <Sparkles className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
      {on ? "AI access on" : "AI access off"}
    </button>
  );
}

function formatSize(kb: number): string {
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}
