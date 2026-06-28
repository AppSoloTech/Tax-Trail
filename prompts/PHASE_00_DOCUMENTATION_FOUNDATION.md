# Phase 00: Documentation Foundation

Before starting this phase:
1. Read `FLOW.md`.
2. Read this phase prompt completely.
3. Read the required reference docs listed below.

Implementation agent: Codex
Review agent: Claude Code

---

# Goal

Establish the documentation workflow and architecture planning foundation before any application code is implemented.

---

# Required Reference Docs

- `FLOW.md`
- `markdown/PRODUCT_VISION.md`
- `markdown/PRODUCT_UX_VISION.md`
- `markdown/ARCHITECTURE.md`
- `markdown/DATA_MODEL.md`
- `markdown/TAX_CATEGORIES.md`
- `markdown/SECURITY_AND_PRIVACY.md`
- `markdown/PHASE_LOG.md`

---

# In Scope

- Create or refine project workflow documentation.
- Clarify the purpose of every `markdown/*.md` file.
- Ensure phase prompts exist for each planned phase.
- Ensure `markdown/PHASE_LOG.md` tracks prompt, handoff, review, checks, and completion status.
- Keep all work documentation-only.

---

# Out Of Scope

- Tauri app scaffolding.
- Rust code.
- React code.
- SQLite migrations.
- Package installation.
- GitHub Actions implementation.

---

# Implementation Instructions

- Keep documentation concise and actionable.
- Use `FLOW.md` as the highest-level project workflow source.
- Keep stable product and architecture docs in `markdown/`.
- Keep implementation prompts in `prompts/`.
- Keep Codex handoffs in `handoffs/`.
- Keep Claude reviews in `reviews/`.
- Make the workflow clear enough that another agent can follow it without chat context.

---

# UX Requirements

- Preserve the product direction: premium productivity tool, not traditional accounting software.
- Make sure future phase prompts reference `PRODUCT_UX_VISION.md` before UI work.

---

# Data/Security Requirements

- Preserve local-first privacy assumptions.
- Do not introduce cloud sync, telemetry, analytics, or account requirements.
- Make sure future phase prompts reference `SECURITY_AND_PRIVACY.md` before file, backup, logging, or network work.

---

# Acceptance Criteria

- `FLOW.md` exists at the repo root.
- `prompts/` contains prompts for phases 00 through 08.
- `handoffs/` and `reviews/` exist and are ready to be committed.
- `markdown/PHASE_LOG.md` functions as a phase ledger.
- No app code has been implemented.

---

# Test/Check Requirements

- Verify the expected files and directories exist.
- Review markdown for broken internal references.
- Run `git status --short` and confirm only intended documentation files changed.

---

# Codex Completion Requirements

- Summarize documentation files created or updated.
- Note that no app code was implemented.
- Create `handoffs/PHASE_00_CLAUDE_HANDOFF.md` if Phase 00 is being submitted for Claude review.
- Update `markdown/PHASE_LOG.md` with Phase 00 progress.

---

# Claude Handoff Requirements

The handoff should ask Claude Code to review:

- Whether the workflow is clear and complete.
- Whether the phase prompts are specific enough for future implementation.
- Whether `FLOW.md` correctly explains document usage.
- Whether `PHASE_LOG.md` is usable as a project ledger.
