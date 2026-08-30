// Placeholder for the AI assistant data layer.
//
// IMPORTANT: the assistant must NOT call an AI provider directly from the
// browser. When this is implemented, the flow is:
//   browser  ->  server / edge function  ->  AI provider
// so the API key never reaches the client. Only the minimum necessary data is
// sent, and only for documents the user has explicitly allowed. See
// docs/04_TECH_ARCHITECTURE.md and docs/10_SECURITY_PRIVACY.md.

export interface AssistantReply {
  answer: string;
  // Which mock sources a future model would have grounded the answer in.
  usedSources: string[];
}

export function askAssistant(_question: string): AssistantReply {
  return {
    answer:
      "The live assistant isn't connected yet. In a future version this will " +
      "answer from your bills, contracts, documents, and maintenance history — " +
      "and only from documents you've allowed it to read.",
    usedSources: [],
  };
}
