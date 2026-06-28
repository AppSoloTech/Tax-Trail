import {
  CheckCircle2,
  Database,
  FolderArchive,
  Home,
  Loader2,
  RefreshCw,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AppStatus, getAppStatus } from "./tauri";

type View = "overview" | "settings";

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; status: AppStatus }
  | { kind: "error"; message: string };

const navItems: Array<{ id: View; label: string; icon: typeof Home }> = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "settings", label: "Settings", icon: Settings },
];

export function App() {
  const [activeView, setActiveView] = useState<View>("overview");
  const [loadState, setLoadState] = useState<LoadState>({ kind: "loading" });

  const refreshStatus = async () => {
    setLoadState({ kind: "loading" });

    try {
      const status = await getAppStatus();
      setLoadState({ kind: "ready", status });
    } catch (error) {
      setLoadState({
        kind: "error",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  };

  useEffect(() => {
    void refreshStatus();
  }, []);

  const content = useMemo(() => {
    if (loadState.kind === "loading") {
      return <LoadingPanel />;
    }

    if (loadState.kind === "error") {
      return <ErrorPanel message={loadState.message} onRetry={refreshStatus} />;
    }

    return activeView === "overview" ? (
      <Overview status={loadState.status} />
    ) : (
      <SettingsView status={loadState.status} onRefresh={refreshStatus} />
    );
  }, [activeView, loadState]);

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary">
        <div className="brand">
          <div className="brand-mark">TT</div>
          <div>
            <p className="eyebrow">Local first</p>
            <h1>Tax Trail</h1>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                className={`nav-button ${activeView === item.id ? "active" : ""}`}
                key={item.id}
                onClick={() => setActiveView(item.id)}
                type="button"
              >
                <Icon size={18} strokeWidth={2.2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="privacy-note">
          <ShieldCheck size={18} />
          <p>Your data stays on this computer. No accounts, analytics, or sync are enabled.</p>
        </div>
      </aside>

      <main className="main-surface">{content}</main>
    </div>
  );
}

function LoadingPanel() {
  return (
    <section className="center-panel" aria-live="polite">
      <Loader2 className="spin" size={28} />
      <h2>Preparing your local workspace</h2>
      <p>Tax Trail is checking the local database and storage folders.</p>
    </section>
  );
}

function ErrorPanel({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <section className="center-panel error-panel" aria-live="assertive">
      <Database size={30} />
      <h2>Local workspace needs attention</h2>
      <p>{message}</p>
      <button className="primary-button" onClick={onRetry} type="button">
        <RefreshCw size={17} />
        Retry
      </button>
    </section>
  );
}

function Overview({ status }: { status: AppStatus }) {
  return (
    <section className="view-stack">
      <header className="view-header">
        <p className="eyebrow">Desktop shell</p>
        <h2>Your private tax workspace is ready.</h2>
        <p>
          Tax Trail is running as a local desktop app with Rust-managed storage,
          SQLite initialization, and a typed bridge between the interface and the
          operating system.
        </p>
      </header>

      <div className="status-grid">
        <StatusCard
          icon={Database}
          label="SQLite"
          title="Database initialized"
          detail={`${status.appliedMigrations} of ${status.latestMigration} migrations applied`}
          ready={status.databaseReady}
        />
        <StatusCard
          icon={FolderArchive}
          label="Storage"
          title="Receipts folder prepared"
          detail="Managed receipt storage is reserved for the receipts phase."
          ready={status.receiptsReady}
        />
        <StatusCard
          icon={ShieldCheck}
          label="Privacy"
          title="Offline by design"
          detail="No telemetry, analytics, cloud sync, or account services are configured."
          ready
        />
      </div>

      <section className="quiet-band">
        <div>
          <p className="eyebrow">Next foundation</p>
          <h3>Built for careful expansion</h3>
        </div>
        <p>
          The current shell stops at storage, navigation, and settings. Expense
          management, receipt workflows, reports, exports, backup, and sync remain
          outside this phase.
        </p>
      </section>
    </section>
  );
}

function SettingsView({
  status,
  onRefresh,
}: {
  status: AppStatus;
  onRefresh: () => void;
}) {
  return (
    <section className="view-stack">
      <header className="view-header split-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h2>Local storage</h2>
          <p>
            These locations are managed by the desktop shell. They stay on this
            computer unless you choose to move or back them up in a future phase.
          </p>
        </div>
        <button className="secondary-button" onClick={onRefresh} type="button">
          <RefreshCw size={17} />
          Refresh
        </button>
      </header>

      <div className="settings-list">
        <PathRow icon={FolderArchive} label="App data directory" value={status.appDataDir} />
        <PathRow icon={Database} label="SQLite database" value={status.databasePath} />
        <PathRow icon={FolderArchive} label="Receipt directory" value={status.receiptsDir} />
      </div>

      <section className="quiet-band">
        <div>
          <p className="eyebrow">Trust posture</p>
          <h3>Private by default</h3>
        </div>
        <p>
          Tax Trail does not store passwords, tax filing credentials, card CVV values,
          analytics identifiers, or cloud tokens in this shell.
        </p>
      </section>
    </section>
  );
}

function StatusCard({
  detail,
  icon: Icon,
  label,
  ready,
  title,
}: {
  detail: string;
  icon: typeof Database;
  label: string;
  ready: boolean;
  title: string;
}) {
  return (
    <article className="status-card">
      <div className="card-topline">
        <span className="icon-chip">
          <Icon size={19} />
        </span>
        <span className={`status-pill ${ready ? "ready" : "attention"}`}>
          <CheckCircle2 size={14} />
          {ready ? "Ready" : "Check"}
        </span>
      </div>
      <p className="eyebrow">{label}</p>
      <h3>{title}</h3>
      <p>{detail}</p>
    </article>
  );
}

function PathRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FolderArchive;
  label: string;
  value: string;
}) {
  return (
    <article className="path-row">
      <span className="icon-chip">
        <Icon size={19} />
      </span>
      <div>
        <p>{label}</p>
        <code>{value}</code>
      </div>
    </article>
  );
}
