// Demo vs Live mode — decided at RUNTIME from the current session.
// "Try the demo" sets mode:"demo"; register/login sets mode:"live".
// Services call isDemo()/isLive() to know which data layer to use.

type Session = { mode?: "demo" | "live"; userId?: string };

export function getSession(): Session {
  try {
    return JSON.parse(localStorage.getItem("uor:session") ?? "{}");
  } catch {
    return {};
  }
}

// Default to demo (safe/read-only) if nothing is set.
export const isDemo = () => getSession().mode !== "live";
export const isLive = () => getSession().mode === "live";

// Per-user storage prefix so two accounts on one browser don't collide.
export function userPrefix(): string {
  const { userId } = getSession();
  return userId ? `u_${userId}:` : "";
}
