# Phase 04: Dashboard

Before starting this phase:
1. Read `FLOW.md`.
2. Read this phase prompt completely.
3. Read the required reference docs listed below.

Implementation agent: Codex
Review agent: Claude Code

---

# Goal

Build the command center dashboard that gives users an immediate sense of business spending and tax readiness.

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

- Monthly spending overview.
- Recent expenses.
- Receipt health.
- Tax year progress.
- Category summaries.
- Quick add entry point.
- Global search or command entry point if supported by the existing shell.

---

# Out Of Scope

- Full report export generation.
- Bank imports.
- OCR.
- Cloud sync.
- Marketing homepage.

---

# Implementation Instructions

- Use local SQLite data to power dashboard summaries.
- Keep calculations in backend/service layers when they depend on persisted data.
- Keep the UI visually rich without becoming decorative or distracting.
- Optimize for quick scanning.

---

# UX Requirements

- The dashboard should feel like a financial command center.
- Avoid giant tables and accounting-software visual density.
- Use purposeful visualizations, hierarchy, and empty states.
- The user should understand their business spending within seconds.

---

# Data/Security Requirements

- Avoid logging financial summary values.
- Respect local-first language and privacy constraints.
- Handle empty and partial datasets gracefully.

---

# Acceptance Criteria

- Dashboard reflects current local expense data.
- Recent expenses and category summaries are accurate.
- Receipt health is visible.
- Empty states are useful and polished.
- Dashboard remains responsive with realistic local data.

---

# Test/Check Requirements

- Test summary calculations.
- Test empty, partial, and populated states.
- Run TypeScript and Rust checks.
- Manually inspect responsive layout where feasible.

---

# Codex Completion Requirements

- Summarize files changed.
- Report commands/checks run.
- Create `handoffs/PHASE_04_CLAUDE_HANDOFF.md`.
- Update `markdown/PHASE_LOG.md`.

---

# Claude Handoff Requirements

Ask Claude Code to review:

- Summary calculation correctness.
- Dashboard UX quality.
- Empty states.
- Performance risks.
- Any privacy or logging concerns.
