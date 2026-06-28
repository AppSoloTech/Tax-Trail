# Phase 08: Post-MVP

Before starting this phase:
1. Read `FLOW.md`.
2. Read this phase prompt completely.
3. Read the required reference docs listed below.

Implementation agent: Codex
Review agent: Claude Code

---

# Goal

Plan and implement selected post-MVP enhancements only after the local-first MVP is stable.

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

Post-MVP scope must be selected explicitly before implementation. Candidate areas include:

- Natural language expense entry.
- OCR receipt extraction.
- Bank transaction import.
- Mileage tracking.
- Optional local passcode or OS-backed authentication.
- Optional database or backup encryption.
- Advanced theme engine.
- Optional cloud sync architecture.
- Hosted web version planning.

---

# Out Of Scope

- Implementing all candidate features at once.
- Weakening offline behavior.
- Adding telemetry or analytics without explicit product approval.
- Making cloud sync required.

---

# Implementation Instructions

- Treat each post-MVP feature as its own scoped phase or subphase.
- Update documentation before implementation.
- Preserve local-first behavior even if optional hosted features are added.
- Keep user data ownership and exportability central.

---

# UX Requirements

- New features should strengthen the command center feeling.
- Avoid drifting toward cluttered accounting software.
- Keep advanced features discoverable without overwhelming the core workflow.

---

# Data/Security Requirements

- Any cloud or import feature requires a dedicated security review.
- Any encryption feature requires restore and recovery planning.
- Bank import and OCR features must avoid storing credentials or unnecessary sensitive data.

---

# Acceptance Criteria

- A specific post-MVP feature is selected and documented before implementation.
- Scope, risks, and success criteria are clear.
- Local-first MVP behavior remains intact.

---

# Test/Check Requirements

- Define feature-specific tests before implementation.
- Run regression checks for core expense, receipt, report, backup, and release workflows.
- Include privacy/security checks for any feature touching sensitive data.

---

# Codex Completion Requirements

- Summarize selected feature scope.
- Report commands/checks run.
- Create an appropriately named Claude handoff.
- Update `markdown/PHASE_LOG.md`.

---

# Claude Handoff Requirements

Ask Claude Code to review:

- Scope creep.
- Security/privacy risks.
- UX complexity.
- Regression risk.
- Whether the feature preserves local-first principles.
