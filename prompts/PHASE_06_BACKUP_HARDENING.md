# Phase 06: Backup And Hardening

Before starting this phase:
1. Read `FLOW.md`.
2. Read this phase prompt completely.
3. Read the required reference docs listed below.

Implementation agent: Codex
Review agent: Claude Code

---

# Goal

Improve reliability, backup/restore, validation, error handling, and overall app hardening.

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

- Manual backup archive creation.
- Restore from backup.
- Database integrity checks.
- Improved validation.
- Improved error handling.
- Safer file operations.
- UX polish for loading, empty, and failure states.

---

# Out Of Scope

- Automatic cloud backup.
- Cloud sync.
- Encrypted backup unless explicitly approved for this phase.
- Account authentication.

---

# Implementation Instructions

- Backups should include SQLite data and managed receipts.
- Restore should validate archive structure before replacing local data.
- Use clear user-facing error messages.
- Keep technical logs free of financial details.
- Preserve existing user data unless the user explicitly confirms destructive restore behavior.

---

# UX Requirements

- Backup and restore should make users feel in control.
- Error states should be calm, specific, and recoverable.
- Avoid scary or technical language when a user action can fix the issue.

---

# Data/Security Requirements

- Never log receipt contents or financial details.
- Validate backup archive paths to avoid unsafe extraction.
- Keep backups local and user-controlled.
- Avoid telemetry and network calls.

---

# Acceptance Criteria

- A user can create a backup archive.
- A user can restore from a valid backup.
- Invalid backups are rejected safely.
- Common errors produce useful user-facing messages.
- Existing major workflows still pass checks.

---

# Test/Check Requirements

- Test backup creation.
- Test restore success and invalid archive failure.
- Test database integrity checks.
- Test key validation and error states.
- Run TypeScript and Rust checks.

---

# Codex Completion Requirements

- Summarize files changed.
- Report commands/checks run.
- Create `handoffs/PHASE_06_CLAUDE_HANDOFF.md`.
- Update `markdown/PHASE_LOG.md`.

---

# Claude Handoff Requirements

Ask Claude Code to review:

- Backup completeness.
- Restore safety.
- Error handling quality.
- File extraction/path risks.
- Regression risk in existing workflows.
