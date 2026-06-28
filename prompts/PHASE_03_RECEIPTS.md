# Phase 03: Receipts

Before starting this phase:
1. Read `FLOW.md`.
2. Read this phase prompt completely.
3. Read the required reference docs listed below.

Implementation agent: Codex
Review agent: Claude Code

---

# Goal

Add local receipt attachment, storage, viewing, and deletion.

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

- Attach receipt files to expenses.
- Copy receipts into app-managed local storage.
- Store receipt metadata in SQLite.
- Open or preview receipts safely.
- Delete receipt records and handle managed files intentionally.
- Show receipt coverage status.

---

# Out Of Scope

- OCR.
- Cloud receipt storage.
- Receipt sharing.
- Encrypted receipt vault.

---

# Implementation Instructions

- Receipts should be copied into managed storage instead of only referencing the original file path.
- Organize receipt files by tax year and month.
- Store original filename, stored filename, file path, file size, and file hash.
- Keep file operations behind Rust/Tauri commands.
- Validate paths before opening or deleting files.

---

# UX Requirements

- Receipt attachment should feel reassuring and low-friction.
- Users should clearly see which expenses have documentation.
- Avoid making users manually manage receipt folders.

---

# Data/Security Requirements

- Never log receipt contents.
- Validate file paths before opening.
- Keep receipt files inside managed app directories.
- Avoid storing unnecessary sensitive data.

---

# Acceptance Criteria

- A user can attach a receipt to an expense.
- Attached receipts survive app restart.
- A user can open/view attached receipts.
- Receipt deletion behavior is clear and safe.
- Receipt coverage is visible in relevant views.

---

# Test/Check Requirements

- Test attach, open, delete, and missing-file scenarios.
- Test path validation.
- Test metadata persistence.
- Run TypeScript and Rust checks.

---

# Codex Completion Requirements

- Summarize files changed.
- Report commands/checks run.
- Create `handoffs/PHASE_03_CLAUDE_HANDOFF.md`.
- Update `markdown/PHASE_LOG.md`.

---

# Claude Handoff Requirements

Ask Claude Code to review:

- File safety.
- Receipt metadata correctness.
- Deletion behavior.
- UX clarity around receipt status.
- Privacy and logging risks.
