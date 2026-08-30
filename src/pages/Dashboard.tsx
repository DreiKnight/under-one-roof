import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ChevronDown, X, Key, Home, Wrench, Hammer,
  Receipt, FileText, ShieldCheck, MapPin, Wifi, Zap, Droplets,
  AlertTriangle, Camera, Package, DollarSign,
  Building2, Star, Clock, CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { getBills } from "@/services/billsService";
import { getContracts } from "@/services/contractsService";
import { getMaintenanceTasks } from "@/services/maintenanceService";
import { getRepairs } from "@/services/repairsService";
import { getAllProperties } from "@/services/homeService";
import { useActiveProperty } from "@/context/ActivePropertyContext";
import {
  formatCurrency, formatDate, daysUntil, relativeDays, maskAddress, classNames,
} from "@/lib/format";
import type { HomeProfile } from "@/types";

type PanelId =
  | "rent" | "attention" | "lease" | "upcoming"
  | "mortgage" | "maintenance" | "equity" | "repairs"
  | null;

// ── Property Switcher ──────────────────────────────────────────────────────
function PropertySwitcher({ properties, active, onChange }: {
  properties: HomeProfile[]; active: HomeProfile; onChange: (p: HomeProfile) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative mb-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 rounded-xl border border-stone bg-paper-raised px-4 py-3 shadow-soft text-left transition-all hover:shadow-lift"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-paper-sunk">
          <Building2 className="h-4 w-4 text-muted" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-xs text-muted">Viewing property</span>
          <span className="block text-sm font-semibold text-ink">{active.nickname}</span>
        </span>
        <Badge tone={active.type === "Renter" ? "honey" : "evergreen"}>{active.type}</Badge>
        <ChevronDown className={classNames("h-4 w-4 text-muted transition-transform shrink-0", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 z-30 rounded-xl border border-stone bg-paper-raised shadow-lift overflow-hidden">
          <p className="px-4 pt-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted">Switch property</p>
          {properties.map(p => (
            <button key={p.id} onClick={() => { onChange(p); setOpen(false); }}
              className={classNames("w-full flex items-center gap-3 px-4 py-3 transition-colors text-left border-t border-stone first:border-0",
                p.id === active.id ? "bg-paper-sunk" : "hover:bg-paper-sunk")}>
              <span className={classNames("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                p.type === "Renter" ? "bg-honey-wash" : "bg-evergreen-wash")}>
                {p.type === "Renter"
                  ? <Key className="h-4 w-4 text-amber-700" />
                  : <Home className="h-4 w-4 text-evergreen-deep" />}
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-ink">{p.nickname}</span>
                  <Badge tone={p.type === "Renter" ? "honey" : "evergreen"}>{p.type}</Badge>
                </span>
                <span className="block text-xs text-muted">{maskAddress(p.address)}</span>
              </span>
              {p.id === active.id && <CheckCircle2 className="h-4 w-4 text-evergreen shrink-0" />}
            </button>
          ))}
          <div className="border-t border-stone px-4 py-3 bg-paper-sunk">
            <button className="flex items-center gap-2 text-sm font-medium text-evergreen hover:text-evergreen-deep transition-colors">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-evergreen font-bold text-base leading-none">+</span>
              Add a property
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Shared pieces ──────────────────────────────────────────────────────────
function ClickCard({ label, value, sub, tone = "default", active, onClick }: {
  label: string; value: string; sub?: string;
  tone?: "default" | "honey" | "clay" | "green";
  active?: boolean; onClick: () => void;
}) {
  return (
    <button onClick={onClick} className={classNames(
      "flex-1 min-w-0 border rounded-xl p-4 text-left transition-all cursor-pointer",
      tone === "honey" ? "bg-honey-wash border-honey"         :
      tone === "clay"  ? "bg-clay-wash border-clay"           :
      tone === "green" ? "bg-evergreen-wash border-evergreen" :
                         "bg-paper-raised border-stone",
      active ? "ring-2 ring-ink/20 shadow-lift" : "shadow-soft hover:shadow-lift",
    )}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">{label}</p>
      <p className="font-display text-2xl font-medium text-ink leading-none">{value}</p>
      {sub && <p className="text-xs text-muted mt-1.5 leading-snug">{sub}</p>}
      <div className="flex items-center gap-1 mt-3">
        <span className="text-[11px] text-muted">Details</span>
        <ChevronRight className={classNames("h-3 w-3 text-muted transition-transform", active && "rotate-90")} />
      </div>
    </button>
  );
}

function DetailPanel({ title, onClose, children }: {
  title: string; onClose: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-stone rounded-2xl bg-paper-raised shadow-lift p-5 animate-fade-up mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-base font-medium text-ink">{title}</h3>
        <button onClick={onClose} className="text-muted hover:text-ink transition-colors"><X className="h-4 w-4" /></button>
      </div>
      {children}
    </div>
  );
}

function PRow({ label, value, meta, urgent }: {
  label: string; value: string; meta?: string; urgent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-stone last:border-0">
      <div><p className="text-sm font-medium text-ink">{label}</p>{meta && <p className="text-xs text-muted mt-0.5">{meta}</p>}</div>
      <p className={classNames("text-sm font-semibold tabular-nums ml-4 text-right", urgent ? "text-clay" : "text-ink")}>{value}</p>
    </div>
  );
}

function GoLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-evergreen hover:text-evergreen-deep transition-colors">
      {label} <ChevronRight className="h-3.5 w-3.5" />
    </Link>
  );
}

// ══════════════════════════════════════════════════════════════
//  RENTER PORTAL — warm honey identity
// ══════════════════════════════════════════════════════════════
function RenterPortal({ home, panel, onPanel, name }: {
  home: HomeProfile; panel: PanelId; onPanel: (id: PanelId) => void; name: string;
}) {
  const bills        = getBills();
  const contracts    = getContracts();
  const repairs      = getRepairs();
  const rentBill     = bills.find(b => b.category === "Housing");
  const overdueBills = bills.filter(b => b.status === "overdue");
  const lease        = contracts.find(c => c.kind === "Lease");
  const leaseDays    = lease ? daysUntil(lease.endDate) : null;
  const upcoming     = bills.filter(b =>
    b.category !== "Housing" && b.status !== "paid" && daysUntil(b.dueDate) <= 45,
  ).sort((a, b) => daysUntil(a.dueDate) - daysUntil(b.dueDate));
  const upTotal      = upcoming.reduce((s, b) => s + b.amount, 0);

  function renderPanel() {
    if (!panel) return null;
    if (panel === "rent" && rentBill) return (
      <DetailPanel title="Rent" onClose={() => onPanel(null)}>
        <PRow label={rentBill.name} value={formatCurrency(rentBill.amount)} meta={rentBill.provider} />
        <PRow label="Due date" value={formatDate(rentBill.dueDate)} meta={relativeDays(rentBill.dueDate)} urgent={rentBill.status === "overdue"} />
        <PRow label="Autopay" value={rentBill.autopay ? "On ✓" : "Off — pay manually"} urgent={!rentBill.autopay} />
        {home.securityDeposit && <PRow label="Security deposit held" value={formatCurrency(home.securityDeposit)} meta="Returnable within 45 days of move-out" />}
        <GoLink to="/app/bills" label="View all bills" />
      </DetailPanel>
    );
    if (panel === "attention") return (
      <DetailPanel title="Needs attention" onClose={() => onPanel(null)}>
        {overdueBills.length === 0
          ? <p className="text-sm text-muted py-1">Nothing overdue. Nice work.</p>
          : overdueBills.map(b => <PRow key={b.id} label={b.name} value={formatCurrency(b.amount)} meta={`${b.provider} · ${relativeDays(b.dueDate)}`} urgent />)
        }
        <GoLink to="/app/bills" label="View all bills" />
      </DetailPanel>
    );
    if (panel === "lease" && lease) {
      const cut = new Date(lease.endDate);
      cut.setDate(cut.getDate() - (lease.noticePeriodDays ?? 60));
      return (
        <DetailPanel title="Lease status" onClose={() => onPanel(null)}>
          <PRow label="Lease ends" value={formatDate(lease.endDate)} meta={`${leaseDays} days remaining`} urgent={(leaseDays ?? 999) < 30} />
          <PRow label="Notice required" value={`${lease.noticePeriodDays ?? 60} days written`} meta={`Give notice by ${formatDate(cut.toISOString().slice(0,10))}`} urgent={daysUntil(cut.toISOString().slice(0,10)) < 14} />
          <PRow label="Auto-renews" value={lease.autoRenews ? "Yes" : "No — must renew"} />
          {home.securityDeposit && <PRow label="Security deposit" value={formatCurrency(home.securityDeposit)} />}
          <GoLink to="/app/contracts" label="View lease" />
        </DetailPanel>
      );
    }
    if (panel === "upcoming") return (
      <DetailPanel title="Upcoming bills" onClose={() => onPanel(null)}>
        {upcoming.map(b => <PRow key={b.id} label={b.name} value={formatCurrency(b.amount)} meta={`${b.provider} · Due ${formatDate(b.dueDate)}`} urgent={b.status === "overdue"} />)}
        {upcoming.length > 0 && (
          <div className="flex items-center justify-between pt-3 mt-1 border-t border-stone">
            <p className="text-xs font-bold text-muted uppercase tracking-wide">Total</p>
            <p className="text-sm font-bold text-ink">{formatCurrency(upTotal)}</p>
          </div>
        )}
        <GoLink to="/app/bills" label="View all bills" />
      </DetailPanel>
    );
    return null;
  }

  return (
    <div>
      {/* ── RENTER HERO — honey identity ── */}
      <div className="rounded-2xl overflow-hidden mb-6 mt-4" style={{background:"linear-gradient(135deg,#C5852F 0%,#E0A458 60%,#edb87a 100%)"}}>
        <div className="px-5 py-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                <Key className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest">Renter Portal</p>
                <p className="text-sm font-bold text-white">{home.nickname}</p>
              </div>
            </div>
            <span className="bg-white/20 border border-white/30 text-white text-xs font-bold rounded-full px-3 py-1">
              RENTER
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-xs">
            <MapPin className="h-3 w-3" />{maskAddress(home.address)}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white/15 rounded-xl px-3 py-2.5">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wide mb-1">Lease ends</p>
              <p className="text-white font-display text-lg font-medium">{lease ? formatDate(lease.endDate) : "—"}</p>
              {leaseDays !== null && <p className="text-white/70 text-xs mt-0.5">{leaseDays} days remaining</p>}
            </div>
            <div className="bg-white/15 rounded-xl px-3 py-2.5">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wide mb-1">Rent</p>
              <p className="text-white font-display text-lg font-medium">{rentBill ? formatCurrency(rentBill.amount) : "—"}</p>
              <p className="text-white/70 text-xs mt-0.5">{rentBill ? relativeDays(rentBill.dueDate) : "No bill"}</p>
            </div>
          </div>
        </div>
        {/* bottom stripe */}
        <div className="px-5 py-2.5 bg-black/10 flex items-center justify-between">
          <p className="text-white/70 text-xs">
            {overdueBills.length > 0 ? `⚠️ ${overdueBills.length} overdue` : "✓ Nothing overdue"}
          </p>
          <p className="text-white/70 text-xs">{home.yearMovedIn && `Since ${home.yearMovedIn}`}</p>
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-5">
        <h1 className="font-display text-2xl font-medium text-ink">
          {name ? `Hey ${name} —` : "Hey there —"} here's your place.
        </h1>
        <p className="mt-1 text-sm text-muted">As a renter, here's what's in your control.</p>
      </div>

      {/* Renter stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-4">
        <ClickCard label="Rent due" value={rentBill ? formatCurrency(rentBill.amount) : "—"}
          sub={rentBill ? relativeDays(rentBill.dueDate) : undefined}
          tone={rentBill?.status === "overdue" ? "clay" : rentBill?.status === "due-soon" ? "honey" : "default"}
          active={panel === "rent"} onClick={() => onPanel("rent")} />
        <ClickCard label="Needs attention"
          value={overdueBills.length > 0 ? `${overdueBills.length} overdue` : "All clear"}
          sub={overdueBills[0] ? `${overdueBills[0].name} — ${formatCurrency(overdueBills[0].amount)}` : "No overdue bills"}
          tone={overdueBills.length > 0 ? "clay" : "green"}
          active={panel === "attention"} onClick={() => onPanel("attention")} />
        <ClickCard label="Lease" value={leaseDays !== null ? `${leaseDays} days` : "—"}
          sub={lease ? `Ends ${formatDate(lease.endDate)}` : undefined}
          tone={(leaseDays ?? 999) <= 60 ? "honey" : "default"}
          active={panel === "lease"} onClick={() => onPanel("lease")} />
        <ClickCard label="Upcoming bills" value={formatCurrency(upTotal)}
          sub={`${upcoming.length} bill${upcoming.length !== 1 ? "s" : ""} · 45 days`}
          active={panel === "upcoming"} onClick={() => onPanel("upcoming")} />
      </div>
      {renderPanel()}

      {/* Renter two-column */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT: Bills + Lease */}
        <div className="space-y-5">
          {/* Bills */}
          <Card className="overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-honey-deep to-honey" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <Receipt className="h-4 w-4 text-amber-700" />
                <h2 className="font-display text-base font-medium text-ink">Your bills</h2>
              </div>
              <p className="text-xs text-muted mb-4">What you owe and when it's due</p>
              <ul className="space-y-2.5">
                {bills.filter(b => b.status !== "paid").slice(0, 5).map(b => (
                  <li key={b.id} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-honey-wash">
                      {b.category === "Internet" ? <Wifi className="h-4 w-4 text-amber-700" /> :
                       b.category === "Utilities" ? <Zap className="h-4 w-4 text-amber-700" /> :
                       b.category === "Housing"   ? <Home className="h-4 w-4 text-amber-700" /> :
                       <Droplets className="h-4 w-4 text-amber-700" />}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-ink truncate">{b.name}</span>
                      <span className="block text-xs text-muted">{b.autopay ? "Autopay ✓" : "Manual"} · {formatDate(b.dueDate)}</span>
                    </span>
                    <div className="text-right shrink-0">
                      <span className={classNames("block text-sm font-semibold tabular-nums", b.status === "overdue" ? "text-clay" : "text-ink")}>{formatCurrency(b.amount)}</span>
                      {b.status === "overdue"  && <span className="text-[10px] text-clay font-bold">OVERDUE</span>}
                      {b.status === "due-soon" && <span className="text-[10px] text-amber-700 font-bold">DUE SOON</span>}
                    </div>
                  </li>
                ))}
              </ul>
              <GoLink to="/app/bills" label="Manage all bills" />
            </div>
          </Card>

          {/* Lease */}
          {lease && (
            <Card className="overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-honey-deep to-honey" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-4 w-4 text-amber-700" />
                  <h2 className="font-display text-base font-medium text-ink">Lease status</h2>
                </div>
                <PRow label="Days remaining" value={String(leaseDays ?? "—")} urgent={(leaseDays ?? 999) < 30} />
                <PRow label="Ends" value={formatDate(lease.endDate)} />
                <PRow label="Notice required" value={`${lease.noticePeriodDays ?? 60} days written`} />
                {home.securityDeposit && <PRow label="Security deposit" value={formatCurrency(home.securityDeposit)} />}
                {(leaseDays ?? 999) <= 90 && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-honey-wash border border-honey px-3 py-2.5">
                    <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                    <p className="text-xs text-ink">Renewal window approaching. Review your lease and decide whether to renew or give notice.</p>
                  </div>
                )}
                <GoLink to="/app/contracts" label="View lease contract" />
              </div>
            </Card>
          )}
        </div>

        {/* RIGHT: Documents + Repairs */}
        <div className="space-y-5">
          <Card className="overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-honey-deep to-honey" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <Camera className="h-4 w-4 text-amber-700" />
                <h2 className="font-display text-base font-medium text-ink">Move-in docs</h2>
              </div>
              <p className="text-xs text-muted mb-4">Protect your security deposit at move-out</p>
              <ul className="space-y-0">
                {[
                  { label: "Move-in photo checklist", done: true,  note: "12 photos saved" },
                  { label: "Lease document",           done: true,  note: "Signed copy uploaded" },
                  { label: "Pre-existing damage log",  done: true,  note: "3 items noted" },
                  { label: "Move-out checklist",        done: false, note: "Complete before leaving" },
                  { label: "Security deposit claim",    done: false, note: "Submit within 48h of move-out" },
                ].map(item => (
                  <li key={item.label} className="flex items-center gap-3 py-2.5 border-b border-stone last:border-0">
                    <span className={classNames("flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                      item.done ? "bg-honey-deep text-white" : "bg-stone text-muted")}>
                      {item.done ? "✓" : "·"}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-ink">{item.label}</span>
                      <span className="block text-xs text-muted">{item.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <GoLink to="/app/documents" label="View all documents" />
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-honey-deep to-honey" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <Hammer className="h-4 w-4 text-amber-700" />
                <h2 className="font-display text-base font-medium text-ink">Your home remembers</h2>
              </div>
              <p className="text-xs text-muted mb-4">Repairs you've documented (report to landlord)</p>
              <ul className="space-y-3">
                {repairs.slice(0,3).map(r => (
                    <li key={r.id} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-honey-wash">
                        <Hammer className="h-3.5 w-3.5 text-amber-700" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink truncate">{r.title}</p>
                        <p className="text-xs text-muted">{r.vendor} · {formatDate(r.date)} · {formatCurrency(r.cost)}</p>
                      </div>
                      {r.warrantyUntil && daysUntil(r.warrantyUntil) > 0 && <Badge tone="honey">Warranty</Badge>}
                    </li>
                  ))}
              </ul>
              <GoLink to="/app/repairs" label="See all repairs" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  HOMEOWNER PORTAL — deep evergreen identity, more features
// ══════════════════════════════════════════════════════════════
function HomeownerPortal({ home, panel, onPanel, name }: {
  home: HomeProfile; panel: PanelId; onPanel: (id: PanelId) => void; name: string;
}) {
  const bills            = getBills();
  const maintenanceTasks = getMaintenanceTasks();
  const repairs          = getRepairs();
  const mortgage         = bills.find(b => b.category === "Housing");
  const overdueTasks     = maintenanceTasks.filter(t => t.status === "overdue");
  const dueTasks         = maintenanceTasks.filter(t => t.status === "due");
  const warranties       = repairs.filter(r => r.warrantyUntil && daysUntil(r.warrantyUntil) > 0);
  const repairTotal      = repairs.reduce((s, r) => s + r.cost, 0);
  const equity           = (home.estimatedValue && home.mortgageBalance) ? home.estimatedValue - home.mortgageBalance : null;
  const equityPct        = (home.estimatedValue && home.mortgageBalance) ? Math.round(((home.estimatedValue - home.mortgageBalance) / home.estimatedValue) * 100) : 0;
  const pendingBills     = bills.filter(b => b.status !== "paid");
  const pendingTotal     = pendingBills.reduce((s, b) => s + b.amount, 0);

  function renderPanel() {
    if (!panel) return null;
    if (panel === "mortgage" && mortgage) return (
      <DetailPanel title="Mortgage" onClose={() => onPanel(null)}>
        <PRow label={mortgage.name} value={formatCurrency(mortgage.amount)} meta={mortgage.provider} />
        <PRow label="Due date" value={formatDate(mortgage.dueDate)} meta={relativeDays(mortgage.dueDate)} urgent={mortgage.status === "overdue"} />
        <PRow label="Autopay" value={mortgage.autopay ? "On ✓" : "Off"} urgent={!mortgage.autopay} />
        {home.mortgageBalance && <PRow label="Remaining balance" value={formatCurrency(home.mortgageBalance)} />}
        <GoLink to="/app/bills" label="View all bills" />
      </DetailPanel>
    );
    if (panel === "maintenance") return (
      <DetailPanel title="Maintenance" onClose={() => onPanel(null)}>
        {[...overdueTasks, ...dueTasks].length === 0
          ? <p className="text-sm text-muted py-1">All tasks on schedule.</p>
          : [...overdueTasks, ...dueTasks].map(t => (
              <PRow key={t.id} label={t.title} value={t.status === "overdue" ? "Overdue" : "Due soon"} meta={`${t.area} · ${relativeDays(t.nextDue)}`} urgent={t.status === "overdue"} />
            ))
        }
        <GoLink to="/app/maintenance" label="View maintenance" />
      </DetailPanel>
    );
    if (panel === "equity" && equity !== null) return (
      <DetailPanel title="Home equity" onClose={() => onPanel(null)}>
        {home.estimatedValue  && <PRow label="Estimated value"  value={formatCurrency(home.estimatedValue)} />}
        {home.mortgageBalance && <PRow label="Mortgage balance" value={formatCurrency(home.mortgageBalance)} />}
        {home.purchasePrice   && <PRow label="Purchase price"   value={formatCurrency(home.purchasePrice)} />}
        <PRow label="Your equity" value={formatCurrency(equity)} />
        <p className="text-xs text-muted italic mt-3">Estimated — consult a real estate professional for a formal appraisal.</p>
      </DetailPanel>
    );
    if (panel === "repairs") return (
      <DetailPanel title="Repair history" onClose={() => onPanel(null)}>
        {repairs.map(r => <PRow key={r.id} label={r.title} value={formatCurrency(r.cost)} meta={`${r.vendor} · ${formatDate(r.date)}`} />)}
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-stone">
          <p className="text-xs font-bold text-muted uppercase tracking-wide">Total invested</p>
          <p className="text-sm font-bold text-ink">{formatCurrency(repairTotal)}</p>
        </div>
        <GoLink to="/app/repairs" label="View all repairs" />
      </DetailPanel>
    );
    return null;
  }

  return (
    <div>
      {/* ── HOMEOWNER HERO — deep evergreen identity ── */}
      <div className="rounded-2xl overflow-hidden mb-6 mt-4" style={{background:"linear-gradient(135deg,#1a4035 0%,#245546 40%,#2F6F5E 100%)"}}>
        <div className="px-5 py-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Homeowner Portal</p>
                <p className="text-sm font-bold text-white">{home.nickname}</p>
              </div>
            </div>
            <span className="bg-white/15 border border-white/25 text-white text-xs font-bold rounded-full px-3 py-1">
              OWNER
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <MapPin className="h-3 w-3" />{maskAddress(home.address)}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="bg-white/10 rounded-xl px-3 py-2.5">
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-wide mb-1">Equity</p>
              <p className="text-white font-display text-base font-medium">{equity !== null ? formatCurrency(equity) : "—"}</p>
              <p className="text-white/60 text-xs mt-0.5">{equityPct}% owned</p>
            </div>
            <div className="bg-white/10 rounded-xl px-3 py-2.5">
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-wide mb-1">Mortgage</p>
              <p className="text-white font-display text-base font-medium">{mortgage ? formatCurrency(mortgage.amount) : "—"}</p>
              <p className="text-white/60 text-xs mt-0.5">{mortgage ? relativeDays(mortgage.dueDate) : "—"}</p>
            </div>
            <div className="bg-white/10 rounded-xl px-3 py-2.5">
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-wide mb-1">Tasks</p>
              <p className="text-white font-display text-base font-medium">{overdueTasks.length + dueTasks.length > 0 ? `${overdueTasks.length + dueTasks.length}` : "Clear"}</p>
              <p className="text-white/60 text-xs mt-0.5">{overdueTasks.length > 0 ? "Overdue" : "Due soon"}</p>
            </div>
          </div>
        </div>
        <div className="px-5 py-2.5 bg-black/20 flex items-center justify-between">
          <p className="text-white/60 text-xs">
            {warranties.length > 0 ? `🛡 ${warranties.length} active warranties` : "No active warranties"}
          </p>
          <p className="text-white/60 text-xs">{home.yearMovedIn && `Owner since ${home.yearMovedIn}`}</p>
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-5">
        <h1 className="font-display text-2xl font-medium text-ink">
          {name ? `Hey ${name} —` : "Hey there —"} your home, your control.
        </h1>
        <p className="mt-1 text-sm text-muted">As an owner, everything here is yours to manage.</p>
      </div>

      {/* Homeowner stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-4">
        <ClickCard label="Mortgage due" value={mortgage ? formatCurrency(mortgage.amount) : "—"}
          sub={mortgage ? relativeDays(mortgage.dueDate) : undefined}
          tone={mortgage?.status === "overdue" ? "clay" : mortgage?.status === "due-soon" ? "honey" : "default"}
          active={panel === "mortgage"} onClick={() => onPanel("mortgage")} />
        <ClickCard label="Maintenance"
          value={(overdueTasks.length + dueTasks.length) > 0 ? `${overdueTasks.length + dueTasks.length} tasks` : "All clear"}
          sub={overdueTasks[0]?.title ?? dueTasks[0]?.title ?? "Schedule on track"}
          tone={overdueTasks.length > 0 ? "clay" : dueTasks.length > 0 ? "honey" : "green"}
          active={panel === "maintenance"} onClick={() => onPanel("maintenance")} />
        <ClickCard label="Home equity" value={equity !== null ? formatCurrency(equity) : "—"}
          sub={home.estimatedValue ? `Est. ${formatCurrency(home.estimatedValue)}` : undefined}
          tone="green"
          active={panel === "equity"} onClick={() => onPanel("equity")} />
        <ClickCard label="Repair spend" value={formatCurrency(repairTotal)}
          sub={`${repairs.length} repairs logged`}
          active={panel === "repairs"} onClick={() => onPanel("repairs")} />
      </div>
      {renderPanel()}

      {/* Homeowner THREE-column layout (more features than renter) */}
      <div className="grid gap-5 lg:grid-cols-3 mb-5">
        {/* Maintenance */}
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-evergreen-deep to-evergreen" />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Wrench className="h-4 w-4 text-evergreen-deep" />
              <h2 className="font-display text-base font-medium text-ink">Maintenance</h2>
            </div>
            <p className="text-xs text-muted mb-4">Keep your home running well</p>
            <ul className="space-y-0">
              {maintenanceTasks.filter(t => t.status !== "done").slice(0,4).map(t => (
                <li key={t.id} className="flex items-center gap-3 py-2.5 border-b border-stone last:border-0">
                  <span className={classNames("h-2 w-2 shrink-0 rounded-full",
                    t.status === "overdue" ? "bg-clay" : t.status === "due" ? "bg-honey" : "bg-evergreen-soft")} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-ink truncate">{t.title}</span>
                    <span className="block text-xs text-muted">{t.area}</span>
                  </span>
                  <span className={classNames("text-xs font-semibold shrink-0",
                    t.status === "overdue" ? "text-clay" : t.status === "due" ? "text-amber-700" : "text-muted")}>
                    {relativeDays(t.nextDue)}
                  </span>
                </li>
              ))}
            </ul>
            <GoLink to="/app/maintenance" label="Full schedule" />
          </div>
        </Card>

        {/* Warranties */}
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-evergreen-deep to-evergreen" />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-4 w-4 text-evergreen-deep" />
              <h2 className="font-display text-base font-medium text-ink">Warranties</h2>
            </div>
            <p className="text-xs text-muted mb-4">What's still covered</p>
            {warranties.length === 0
              ? <p className="text-sm text-muted">No active warranties tracked.</p>
              : <ul className="space-y-3">
                  {warranties.map(r => (
                    <li key={r.id} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-evergreen-wash">
                        <Package className="h-3.5 w-3.5 text-evergreen" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink truncate">{r.title}</p>
                        <p className="text-xs text-muted">{daysUntil(r.warrantyUntil!)}d left</p>
                      </div>
                      <Badge tone="evergreen">Active</Badge>
                    </li>
                  ))}
                </ul>
            }
            <GoLink to="/app/repairs" label="View all" />
          </div>
        </Card>

        {/* Property value */}
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-evergreen-deep to-evergreen" />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-evergreen-deep" />
              <h2 className="font-display text-base font-medium text-ink">Property</h2>
            </div>
            <p className="text-xs text-muted mb-4">Ownership overview</p>
            {home.estimatedValue && (
              <>
                <div className="mb-3">
                  <p className="text-xs text-muted mb-1">Est. value</p>
                  <p className="font-display text-xl font-medium text-ink">{formatCurrency(home.estimatedValue)}</p>
                </div>
                {home.mortgageBalance && (
                  <div className="mb-3">
                    <p className="text-xs text-muted mb-1">Mortgage balance</p>
                    <p className="font-display text-lg font-medium text-evergreen-deep">{formatCurrency(equity ?? 0)} equity</p>
                  </div>
                )}
                <div className="rounded-full bg-stone h-2 overflow-hidden mb-1">
                  <div className="h-full bg-evergreen rounded-full" style={{width:`${equityPct}%`}} />
                </div>
                <p className="text-xs text-muted">{equityPct}% owned</p>
                <p className="text-[10px] text-muted italic mt-1">Estimated — not a formal appraisal</p>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Homeowner bottom two-column */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Monthly costs */}
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-evergreen-deep to-evergreen" />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-evergreen-deep" />
              <h2 className="font-display text-base font-medium text-ink">Monthly costs</h2>
            </div>
            <p className="text-xs text-muted mb-4">Pending this month</p>
            <ul className="space-y-0">
              {pendingBills.sort((a, b) => b.amount - a.amount).slice(0,5).map(b => (
                <li key={b.id} className="flex items-center justify-between py-2.5 border-b border-stone last:border-0">
                  <span className="text-sm font-medium text-ink truncate mr-2">{b.name}</span>
                  <span className={classNames("text-sm font-semibold tabular-nums shrink-0",
                    b.status === "overdue" ? "text-clay" : "text-ink")}>{formatCurrency(b.amount)}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-stone">
              <span className="text-xs font-bold text-muted uppercase tracking-wide">Total pending</span>
              <span className="text-sm font-bold text-ink">{formatCurrency(pendingTotal)}</span>
            </div>
            <GoLink to="/app/bills" label="Manage bills" />
          </div>
        </Card>

        {/* Repair history */}
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-evergreen-deep to-evergreen" />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-evergreen-deep" />
              <h2 className="font-display text-base font-medium text-ink">Repair history</h2>
            </div>
            <p className="text-xs text-muted mb-4">What's been fixed and what it cost</p>
            <ul className="space-y-3">
              {[...repairs].sort((a, b) => a.date < b.date ? 1 : -1).slice(0,3).map(r => (
                <li key={r.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-evergreen-wash">
                    <Hammer className="h-3.5 w-3.5 text-evergreen" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{r.title}</p>
                    <p className="text-xs text-muted">{r.vendor} · {formatDate(r.date)} · {formatCurrency(r.cost)}</p>
                  </div>
                  {r.warrantyUntil && daysUntil(r.warrantyUntil) > 0 && <Badge tone="evergreen">Warranty</Badge>}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone">
              <span className="text-xs text-muted">Total invested in repairs</span>
              <span className="text-sm font-bold text-ink">{formatCurrency(repairTotal)}</span>
            </div>
            <GoLink to="/app/repairs" label="Full history" />
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Main export ─────────────────────────────────────────────────────────────
export function Dashboard() {
  const { user }                                = useAuth();
  const { activeProperty, setActiveProperty }   = useActiveProperty();
  const properties                              = getAllProperties();
  const [panel, setPanel]                       = useState<PanelId>(null);

  function onPanel(id: PanelId) { setPanel(prev => prev === id ? null : id); }
  function switchHome(p: HomeProfile) { setActiveProperty(p); setPanel(null); }
  const name = user?.name?.split(" ")[0] ?? "";

  return (
    <div>
      <PropertySwitcher properties={properties} active={activeProperty} onChange={switchHome} />
      {activeProperty.type === "Renter"
        ? <RenterPortal    home={activeProperty} panel={panel} onPanel={onPanel} name={name} />
        : <HomeownerPortal home={activeProperty} panel={panel} onPanel={onPanel} name={name} />
      }
    </div>
  );
}
