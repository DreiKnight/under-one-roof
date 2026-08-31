import { useState } from "react";
import {
  User,
  Home,
  Phone,
  Bell,
  ShieldCheck,
  LogOut,
  Lock,
  Sparkles,
  Plus,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  EmergencyContactForm,
  type EmergencyContactFormValues,
} from "@/components/properties/EmergencyContactForm";
import { useAuth } from "@/context/AuthContext";
import { useActiveProperty } from "@/context/ActivePropertyContext";
import {
  getEmergencyContacts,
  createEmergencyContact,
  removeEmergencyContact,
} from "@/services/homeService";
import { getDocuments } from "@/services/documentsService";
import { isDemo } from "@/config";
import { maskAddress, classNames } from "@/lib/format";
import type { EmergencyContact } from "@/types";

export function Settings() {
  const { user, signOut } = useAuth();
  const { activeProperty } = useActiveProperty();
  const demo = isDemo();
  const [contacts, setContacts] = useState<EmergencyContact[]>(() =>
    activeProperty ? getEmergencyContacts(activeProperty.id) : []
  );
  const [addingContact, setAddingContact] = useState(false);
  const documents = getDocuments();
  const sharedDocs = documents.filter((d) => d.aiAnalysisAllowed).length;

  function refreshContacts() {
    setContacts(activeProperty ? getEmergencyContacts(activeProperty.id) : []);
  }

  function handleAddContact(values: EmergencyContactFormValues) {
    if (!activeProperty) return;
    createEmergencyContact({ ...values, propertyId: activeProperty.id });
    refreshContacts();
    setAddingContact(false);
  }

  function handleRemoveContact(id: string) {
    removeEmergencyContact(id);
    refreshContacts();
  }

  const [prefs, setPrefs] = useState({
    billReminders: true,
    renewalAlerts: true,
    maintenanceNudges: true,
    weeklyDigest: false,
  });

  return (
    <div>
      <PageHeader title="Settings" subtitle="Your profile, your home, and how Under One Roof looks after both." />

      <div className="space-y-6">
        {/* Profile */}
        <Section icon={<User className="h-4 w-4" />} title="Profile">
          <Field label="Name" value={user?.name ?? "—"} />
          <Field label="Email" value={user?.email ?? "—"} />
          <p className="pt-1 text-xs text-muted">
            {demo
              ? "Demo profile — editing is disabled until you sign in with a real account."
              : "Profile editing isn't available yet in this build."}
          </p>
        </Section>

        {/* Home */}
        <Section icon={<Home className="h-4 w-4" />} title="Home details">
          {activeProperty ? (
            <>
              <Field label="Nickname" value={activeProperty.nickname} />
              <Field label="Type" value={activeProperty.type} />
              <Field
                label="Address"
                value={maskAddress(activeProperty.address)}
                hint={demo ? "Masked in demo mode" : undefined}
              />
              <Field label="Members" value={String(activeProperty.members)} />
            </>
          ) : (
            <p className="text-sm text-muted">
              You haven't added a property yet — add one from the Dashboard to see its details here.
            </p>
          )}
        </Section>

        {/* Emergency info */}
        <Section icon={<Phone className="h-4 w-4" />} title="Emergency information">
          <p className="-mt-1 mb-1 text-xs text-muted">
            The things you'll want fast in a pinch — shut-offs, your landlord, trusted vendors.
          </p>
          {!activeProperty ? (
            <p className="text-sm text-muted">Add a property first to keep emergency contacts here.</p>
          ) : (
            <>
              {contacts.length === 0 && (
                <p className="text-sm text-muted">No emergency contacts yet.</p>
              )}
              <ul className="divide-y divide-stone">
                {contacts.map((c) => (
                  <li key={c.id} className="flex items-center justify-between py-2.5">
                    <div>
                      <p className="text-sm font-medium text-ink">{c.name}</p>
                      <p className="text-xs text-muted">{c.label}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted">{c.phone}</span>
                      {!demo && (
                        <button
                          onClick={() => handleRemoveContact(c.id)}
                          aria-label={`Remove ${c.name}`}
                          className="text-muted hover:text-clay"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setAddingContact(true)}
                disabled={demo}
                title={demo ? "Sign in to add real emergency contacts — demo data is read-only" : undefined}
                className="mt-3 flex items-center gap-1.5 text-sm font-medium text-evergreen hover:text-evergreen-deep disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-evergreen"
              >
                <Plus className="h-3.5 w-3.5" /> Add a contact
              </button>
            </>
          )}
        </Section>

        {/* Notifications */}
        <Section icon={<Bell className="h-4 w-4" />} title="Notifications">
          {(
            [
              ["billReminders", "Bill reminders", "A nudge a few days before each due date"],
              ["renewalAlerts", "Renewal alerts", "Heads-up before leases and contracts roll over"],
              ["maintenanceNudges", "Maintenance nudges", "Seasonal upkeep reminders"],
              ["weeklyDigest", "Weekly digest", "One calm summary of the week ahead"],
            ] as const
          ).map(([key, label, hint]) => (
            <div key={key} className="flex items-center justify-between py-2.5">
              <div>
                <p className="text-sm font-medium text-ink">{label}</p>
                <p className="text-xs text-muted">{hint}</p>
              </div>
              <Toggle
                on={prefs[key]}
                onToggle={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
              />
            </div>
          ))}
        </Section>

        {/* Privacy & security */}
        <Section icon={<ShieldCheck className="h-4 w-4" />} title="Privacy & security">
          <div className="space-y-3 text-sm text-ink-soft">
            <p className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-evergreen" />
              <span>
                AI analysis is permission-based. {sharedDocs} document{sharedDocs === 1 ? "" : "s"}{" "}
                currently shared — manage this per file on the Documents page.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-evergreen" />
              <span>
                {demo
                  ? "This build stores only a demo session in your browser. No documents, addresses, or financial details are saved anywhere. Real, encrypted storage comes with accounts."
                  : "You're signed in, but this build still keeps your data in this browser only (not a private server) — treat it as a test build, not permanent storage."}
              </span>
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-honey/40 bg-honey-wash px-3.5 py-3 text-xs leading-relaxed text-honey-deep">
            Before this app is ready for real data, four things need to be in place: secure
            authentication, per-user authorization, private encrypted storage, and database-level
            security rules. Until then, please keep to sample data.
          </div>
        </Section>

        {/* Sign out */}
        <Card className="flex items-center justify-between p-5">
          <div>
            <p className="font-medium text-ink">Sign out</p>
            <p className="text-sm text-muted">
              {demo ? "End this demo session on this device." : "Sign out of your account."}
            </p>
          </div>
          <Button variant="secondary" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </Card>
      </div>

      {addingContact && (
        <Modal title="Add an emergency contact" onClose={() => setAddingContact(false)}>
          <EmergencyContactForm onSubmit={handleAddContact} onCancel={() => setAddingContact(false)} />
        </Modal>
      )}
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-evergreen">{icon}</span>
        <h2 className="font-display text-lg font-medium text-ink">{title}</h2>
      </div>
      <div className="space-y-2.5">{children}</div>
    </Card>
  );
}

function Field({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-stone/60 pb-2.5 last:border-0 last:pb-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-right text-sm font-medium text-ink">
        {value}
        {hint && <span className="ml-2 text-xs font-normal text-muted">({hint})</span>}
      </span>
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      className={classNames(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-evergreen" : "bg-stone-deep"
      )}
    >
      <span
        className={classNames(
          "absolute top-0.5 h-5 w-5 rounded-full bg-paper-raised shadow-soft transition-transform",
          on ? "translate-x-[1.4rem]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
