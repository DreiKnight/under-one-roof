import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Wordmark } from "@/components/RoofMark";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { useAuth } from "@/context/AuthContext";
import { useActiveProperty } from "@/context/ActivePropertyContext";
import { classNames } from "@/lib/format";

export function AppLayout() {
  const { user, loading } = useAuth();
  const { activeProperty } = useActiveProperty();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isRenter = activeProperty.type === "Renter";
  const pageBg = isRenter ? "bg-[#FFFDF8]" : "bg-[#F6FAF8]";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-muted">
        Loading your home…
      </div>
    );
  }

  // Protected area — bounce to login if there's no demo session.
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // New signups land in onboarding (a standalone full-screen route) first.
  if (!user.onboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className={classNames("min-h-screen transition-colors duration-300", pageBg)}>
      <DemoBanner />

      <div className="mx-auto flex max-w-[1400px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-stone lg:block">
          <Sidebar />
        </aside>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 border-r border-stone shadow-lift animate-fade-up">
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="absolute right-3 top-3 rounded-lg p-1.5 text-muted hover:bg-paper-sunk"
              >
                <X className="h-5 w-5" />
              </button>
              <Sidebar onNavigate={() => setDrawerOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile top bar */}
          <header className="flex items-center justify-between border-b border-stone bg-paper-raised px-4 py-3 lg:hidden">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="rounded-lg p-1.5 text-ink hover:bg-paper-sunk"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Wordmark className="scale-90" />
            <span className="w-8" />
          </header>

          <main
            className={classNames(
              "flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10",
              "mx-auto w-full max-w-5xl"
            )}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
