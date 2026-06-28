# Phase 01: App Shell Claude Handoff

Status: Complete after Claude Code review fixes

---

# Summary

Phase 01 creates the foundational Tax Trail desktop application shell:

- Tauri 2 desktop shell with Rust command boundary.
- React, TypeScript, and Vite frontend.
- SQLite initialization through Rust repository/service layers.
- Platform app data directory creation.
- Managed receipt directory creation without a receipt workflow.
- Overview and settings views with local-first privacy messaging.
- Local development scripts and dependency lockfiles.

No expense management, receipt attachment workflow, reports, exports, backup/restore, cloud sync, telemetry, analytics, or account features were added.

Claude Code reviewed Phase 01 in `reviews/PHASE_01_CLAUDE_REVIEW.md` and approved with two required fixes. Both are resolved:

- R1: generated the standard Tauri icon set and populated `bundle.icon`.
- R2: replaced disabled CSP with a restrictive local policy.

---

# Files Changed

- `.gitignore`
- `package.json`
- `package-lock.json`
- `index.html`
- `tsconfig.json`
- `vite.config.ts`
- `src/main.tsx`
- `src/App.tsx`
- `src/styles.css`
- `src/tauri.ts`
- `src/vite-env.d.ts`
- `src-tauri/Cargo.toml`
- `src-tauri/Cargo.lock`
- `src-tauri/build.rs`
- `src-tauri/tauri.conf.json`
- `src-tauri/capabilities/default.json`
- `src-tauri/icons/*`
- `src-tauri/migrations/0001_app_shell.sql`
- `src-tauri/src/main.rs`
- `src-tauri/src/lib.rs`
- `src-tauri/src/commands.rs`
- `src-tauri/src/errors.rs`
- `src-tauri/src/paths.rs`
- `src-tauri/src/repositories.rs`
- `src-tauri/src/services.rs`
- `markdown/PHASE_LOG.md`
- `handoffs/PHASE_01_CLAUDE_HANDOFF.md`

---

# Architecture Decisions

- React does not access the filesystem or SQLite directly.
- The frontend calls one typed Tauri command, `get_app_status`, through `src/tauri.ts`.
- Rust follows the requested flow: Tauri command -> service -> repository -> SQLite.
- SQLite migration history is tracked in `schema_migrations`.
- The first migration creates only shell-safe tables: `settings` and `app_metadata`.
- A default settings record is created with nullable business fields and no sensitive values.
- App storage paths are resolved through Rust using platform config directories:
  - Linux: `~/.config/taxtrail/`
  - Windows/macOS: `TaxTrail` under the platform config/application support directory
- Receipts are prepared as a managed directory only. No receipt attach/view/delete behavior exists yet.
- `bundle.icon` references generated desktop icons for Linux/Windows/macOS bundle paths.
- CSP is restricted to local app assets plus explicit Tauri IPC access.
- No network, telemetry, analytics, account, or sync code was added.

---

# Checks Run

- `npm install`
- `npm run typecheck`
- `npm run build`
- `npm audit`
- `cd src-tauri && cargo fmt --check`
- `npm run check:rust`
- `cd src-tauri && cargo test`
- `timeout 25s npm run tauri:dev`
- `npm run dev -- --host 127.0.0.1`
- `curl -sS http://127.0.0.1:5173/`
- `npx tauri build --bundles deb,rpm`

Results:

- TypeScript check passed.
- Production Vite build passed.
- NPM audit passed with zero vulnerabilities after updating Vite tooling.
- Rust formatting check passed.
- Rust check passed.
- Rust tests passed, including SQLite migration/settings initialization coverage.
- Tauri dev compiled and attempted to run, but the native GTK window could not initialize in this environment.
- Vite dev serving was verified by fetching `http://127.0.0.1:5173/`.
- DEB/RPM bundle build passed after generating icons and setting CSP.
- Full `npm run tauri:build` built the release binary and created DEB/RPM bundles, then failed on AppImage packaging with `Read-only file system (os error 30)` in this environment.
- `npm audit` could not be rerun after review fixes because registry access was denied by the approval reviewer due dependency metadata exfiltration risk. The prior Phase 01 audit before these config-only fixes reported zero vulnerabilities.

---

# Known Limitations

- Native Tauri window launch could not be fully verified in this environment because GTK initialization failed.
- AppImage packaging could not be completed in this environment because the bundler hit a read-only filesystem error.
- The UI currently contains only overview and settings surfaces.
- The generated icon is a simple Phase 01 placeholder for desktop compilation.
- Settings fields are not editable yet.
- No expense, receipt workflow, report, export, backup, restore, or sync behavior exists.

---

# Review Notes

Claude Code has already reviewed:

- Tauri command boundary and whether the single `get_app_status` command is appropriately scoped.
- App data directory handling against `ARCHITECTURE.md`.
- SQLite initialization, migration tracking, and settings seed approach.
- UI foundation, navigation, and local-first trust messaging.
- Security/privacy posture, especially absence of telemetry, network behavior, credential storage, and sensitive logging.
- Packaging risks around the current Tauri config and generated icon.

Required findings R1 and R2 were addressed. Optional findings were left for later phases unless they become required by future prompts.
