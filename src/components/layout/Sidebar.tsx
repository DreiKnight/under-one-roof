import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Receipt, FileText, FolderArchive,
  Wrench, Hammer, Sparkles, Settings, Key, Home,
  type LucideIcon,
} from "lucide-react";
import { Wordmark } from "@/components/RoofMark";
import { useAuth } from "@/context/AuthContext";
import { useActiveProperty } from "@/context/ActivePropertyContext";
import { maskAddress, classNames } from "@/lib/format";

interface NavItem { to: string; label: string; icon: LucideIcon; }

export const navItems: NavItem[] = [
  { to: "/app",              label: "Dashboard",   icon: LayoutDashboard },
  { to: "/app/bills",        label: "Bills",       icon: Receipt         },
  { to: "/app/contracts",    label: "Contracts",   icon: FileText        },
  { to: "/app/documents",    label: "Documents",   icon: FolderArchive   },
  { to: "/app/maintenance",  label: "Maintenance", icon: Wrench          },
  { to: "/app/repairs",      label: "Repairs",     icon: Hammer          },
  { to: "/app/assistant",    label: "AI Assistant",icon: Sparkles        },
  { to: "/app/settings",     label: "Settings",    icon: Settings        },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { user, signOut }       = useAuth();
  const { activeProperty }      = useActiveProperty();
  const isRenter                = activeProperty?.type === "Renter";

  // Color tokens that flip based on property type
  const accentStrip  = isRenter ? "bg-honey-deep"                     : "bg-evergreen-deep";
  const activeNav    = isRenter ? "bg-honey-wash text-amber-900"       : "bg-evergreen-wash text-evergreen-deep";
  const activeIcon   = isRenter ? "text-amber-700"                     : "text-evergreen";
  const bottomBg     = isRenter ? "bg-honey-wash border border-honey"  : "bg-evergreen-wash border border-evergreen";
  const badgeStyle   = isRenter
    ? "bg-honey-deep text-white text-[10px] font-bold rounded-full px-2 py-0.5"
    : "bg-evergreen-deep text-white text-[10px] font-bold rounded-full px-2 py-0.5";

  return (
    <div className="flex h-full flex-col bg-paper-raised">

      {/* Colored identity strip at the very top */}
      <div className={classNames("h-1.5 w-full rounded-t-none", accentStrip)} />

      {/* Logo */}
      <div className="px-5 py-4">
        <Wordmark />
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/app"}
            onClick={onNavigate}
            className={({ isActive }) =>
              classNames(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? activeNav : "text-ink-soft hover:bg-paper-sunk",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={classNames(
                  "h-[18px] w-[18px]",
                  isActive ? activeIcon : "text-muted",
                )} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: active property + sign out */}
      <div className="border-t border-stone p-3 space-y-2">
        <div className={classNames("rounded-xl px-3 py-3", activeProperty ? bottomBg : "bg-paper-sunk border border-stone")}>
          {activeProperty ? (
            <>
              {/* Property icon + type badge */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={classNames(
                    "flex h-7 w-7 items-center justify-center rounded-lg",
                    isRenter ? "bg-honey/30" : "bg-evergreen/20",
                  )}>
                    {isRenter
                      ? <Key  className="h-3.5 w-3.5 text-amber-700" />
                      : <Home className="h-3.5 w-3.5 text-evergreen-deep" />}
                  </div>
                  <span className={badgeStyle}>
                    {isRenter ? "RENTER" : "OWNER"}
                  </span>
                </div>
              </div>
              {/* Property details */}
              <p className="text-xs font-bold text-ink truncate">{activeProperty.nickname}</p>
              <p className="text-xs text-muted truncate">{maskAddress(activeProperty.address)}</p>
            </>
          ) : (
            <p className="text-xs text-muted">No property yet — add one from the dashboard.</p>
          )}
          <p className="text-xs text-muted mt-1">
            Signed in as <span className="font-medium text-ink">{user?.name ?? "Guest"}</span>
          </p>
        </div>

        <button
          onClick={signOut}
          className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-muted transition-colors hover:bg-paper-sunk hover:text-clay"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
