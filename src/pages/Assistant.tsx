import { useState } from "react";
import { Sparkles, Send, FileText, ShieldCheck, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { getDocuments } from "@/services/documentsService";
import { classNames } from "@/lib/format";

interface Msg {
  role: "user" | "assistant";
  text: string;
  showDisclaimer?: boolean;
}

const suggestions = [
  "When is my lease up for renewal?",
  "Summarize my renters insurance policy",
  "What maintenance is overdue?",
  "Which repairs are still under warranty?",
];

export function Assistant() {
  const documents = getDocuments();
  const sharedDocs = documents.filter((d) => d.aiAnalysisAllowed);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: `Hi! I'm your home assistant. Once I'm fully connected, I'll answer questions using only the documents you've chosen to share with me — right now that's ${sharedDocs.length} file${sharedDocs.length === 1 ? "" : "s"}. This is a preview, so my answers below are examples rather than live analysis.`,
    },
  ]);
  const [input, setInput] = useState("");

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const legalish = /lease|contract|insurance|policy|mortgage|warranty|terms/i.test(trimmed);
    setMessages((m) => [
      ...m,
      { role: "user", text: trimmed },
      {
        role: "assistant",
        text: `This is a placeholder response. When the assistant is live, I'll read the documents you've shared (${
          sharedDocs.length ? sharedDocs.map((d) => d.name).join(", ") : "none yet"
        }) and answer in plain language, always pointing back to where in your documents the answer came from.`,
        showDisclaimer: legalish,
      },
    ]);
    setInput("");
  }

  return (
    <div>
      <PageHeader
        title="AI Assistant"
        subtitle="Ask about your home and get clear answers — only from documents you choose to share."
      />

      {/* How it works */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, title: "Permission-based", body: "Reads only documents you switch on." },
          { icon: Info, title: "Transparent", body: "Shows which document each answer came from." },
          { icon: FileText, title: "Not legal advice", body: "Summaries help you understand, not decide." },
        ].map(({ icon: Icon, title, body }) => (
          <Card key={title} className="p-4">
            <Icon className="h-5 w-5 text-evergreen" />
            <p className="mt-2 text-sm font-medium text-ink">{title}</p>
            <p className="text-xs text-muted">{body}</p>
          </Card>
        ))}
      </div>

      <Card className="flex h-[28rem] flex-col">
        {/* messages */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={classNames("flex gap-3", m.role === "user" && "flex-row-reverse")}
            >
              {m.role === "assistant" && (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-evergreen-wash text-evergreen">
                  <Sparkles className="h-4 w-4" />
                </span>
              )}
              <div className={classNames("max-w-[80%]", m.role === "user" && "text-right")}>
                <div
                  className={classNames(
                    "inline-block rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-evergreen text-paper"
                      : "bg-paper-sunk text-ink-soft"
                  )}
                >
                  {m.text}
                </div>
                {m.showDisclaimer && (
                  <div className="mt-2 text-left">
                    <Disclaimer />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* suggestions */}
        <div className="flex flex-wrap gap-2 border-t border-stone px-5 py-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-stone bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-evergreen-soft hover:bg-evergreen-wash"
            >
              {s}
            </button>
          ))}
        </div>

        {/* input */}
        <div className="flex items-center gap-2 border-t border-stone p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask about your home…"
            className="flex-1 rounded-xl border border-stone bg-paper-raised px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-evergreen"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            aria-label="Send"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-evergreen text-paper transition-colors hover:bg-evergreen-deep disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </Card>

      <p className="mt-3 text-center text-xs text-muted">
        Preview only — no live AI is connected, and no document content leaves this demo.
      </p>
    </div>
  );
}
