# Phase 01: App Shell

Before starting this phase:
1. Read `FLOW.md`.
2. Read this phase prompt completely.
3. Read the required reference docs listed below.

Implementation agent: Codex
Review agent: Claude Code

---

# Goal

Create the foundational Tauri, Rust, React, TypeScript, SQLite, and Vite desktop application shell.

---

# Required Reference Docs

- `FLOW.md`
- `markdown/PRODUCT_VISION.md`
- `markdown/PRODUCT_UX_VISION.md`
- `markdown/ARCHITECTURE.md`
- `markdown/DATA_MODEL.md`
- `markdown/SECURITY_AND_PRIVACY.md`
- `markdown/PHASE_LOG.md`

---

# In Scope

- Scaffold the Tauri desktop app.
- Set up React, TypeScript, and Vite.
- Establish the Rust command boundary.
- Initialize SQLite and a migration approach.
- Create app data and receipt directories.
- Build the first app layout and settings surface.
- Prepare local development scripts.

---

# Out Of Scope

- Full expense CRUD.
- Receipt attachment workflow.
- Reports and exports.
- Backup/restore.
- Cloud sync.
- Telemetry or analytics.

---

# Implementation Instructions

- Follow the layer model from `ARCHITECTURE.md`: UI, Tauri commands, service layer, repository layer, SQLite.
- Keep React isolated from direct filesystem and database access.
- Route persistence and filesystem behavior through typed Tauri commands.
- Create a foundation that can support future migrations and tests.
- Keep the first UI polished enough to establish the product tone.

---

# UX Requirements

- The shell should feel fast, calm, and premium.
- Avoid placeholder-heavy screens.
- Include visible local-first trust language where appropriate, such as showing the local data location in settings.
- Do not create a marketing landing page as the main experience.

---

# Data/Security Requirements

- Store local data in platform-appropriate app data directories.
- Do not store sensitive credentials.
- Do not add telemetry, analytics, or network dependencies.
- Avoid logging financial details.

---

# Acceptance Criteria

- App launches in development.
- Tauri, React, TypeScript, Vite, Rust, and SQLite are wired together.
- Database initialization works.
- Settings view can display relevant local app/storage information.
- Basic navigation works.

---

# Test/Check Requirements

- Run TypeScript checks.
- Run Rust checks/tests where available.
- Run the app locally if feasible.
- Confirm generated files are intentional.

---

# Codex Completion Requirements

- Summarize files changed.
- Report commands/checks run.
- Create `handoffs/PHASE_01_CLAUDE_HANDOFF.md`.
- Update `markdown/PHASE_LOG.md`.

---

# Claude Handoff Requirements

Ask Claude Code to review:

- Tauri command boundary.
- App data directory handling.
- SQLite initialization approach.
- UI foundation and local-first messaging.
- Any security or packaging risks.
