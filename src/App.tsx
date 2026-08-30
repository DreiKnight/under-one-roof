import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";

import { Landing } from "@/pages/Landing";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { Onboarding } from "@/pages/Onboarding";
import { Dashboard } from "@/pages/Dashboard";
import { Bills } from "@/pages/Bills";
import { Contracts } from "@/pages/Contracts";
import { Documents } from "@/pages/Documents";
import { Maintenance } from "@/pages/Maintenance";
import { Repairs } from "@/pages/Repairs";
import { Assistant } from "@/pages/Assistant";
import { Settings } from "@/pages/Settings";
import { NotFound } from "@/pages/NotFound";

/**
 * Guards a standalone (non-AppLayout) route that still requires a session.
 * Used for /onboarding, which renders its own full-screen layout and so
 * should not be nested inside AppLayout's chrome.
 */
function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-muted">
        Loading your home…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Already onboarded? No reason to see onboarding again.
  if (user.onboarded) {
    return <Navigate to="/app" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Standalone, auth-guarded, full-screen */}
      <Route
        path="/onboarding"
        element={
          <RequireAuth>
            <Onboarding />
          </RequireAuth>
        }
      />

      {/* Protected app shell */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bills" element={<Bills />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="documents" element={<Documents />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="repairs" element={<Repairs />} />
        <Route path="assistant" element={<Assistant />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
