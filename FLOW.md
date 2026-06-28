# Tax Trail Project Flow

Version: 0.1

---

# Purpose

This file is the starting point for every phase of Tax Trail development.

Read `FLOW.md` before reading any phase prompt or implementation document.

Tax Trail is a local-first desktop application for small business expense and tax tracking. The product should feel like a personal financial command center: fast, calm, beautiful, private, and useful for tax preparation without becoming traditional accounting software.

---

# Required Phase Workflow

For every phase:

1. Read `FLOW.md`.
2. Read the active phase prompt in `prompts/`.
3. Read only the `markdown/*.md` files referenced by that phase prompt.
4. Implement the phase with Codex.
5. Run the required checks.
6. Have Codex generate a Claude handoff in `handoffs/`.
7. Give the handoff to Claude Code for review.
8. Save Claude Code's review in `reviews/`.
9. Give the review back to Codex.
10. Have Codex address required fixes, rerun checks, and update `markdown/PHASE_LOG.md`.

---

# Agent Roles

## Codex

Codex is the implementation agent.

Responsibilities:

- Read `FLOW.md` and the active phase prompt before making changes.
- Use the referenced documentation as source of truth.
- Implement only the active phase scope.
- Avoid app code before the phase explicitly calls for it.
- Run relevant checks and report results.
- Generate a Claude handoff after each implementation phase.
- Address required Claude review findings.
- Update `markdown/PHASE_LOG.md` after phase progress.

## Claude Code

Claude Code is the review agent.

Responsibilities:

- Review the Codex handoff and changed files.
- Prioritize bugs, security/privacy risks, missing requirements, UX concerns, and test gaps.
- Generate a review file for the user to return to Codex.
- Separate required fixes from optional improvements.

---

# Repository Documents

## `markdown/PRODUCT_VISION.md`

Use this for:

- Product purpose
- Target users
- MVP boundaries
- Long-term direction
- Success criteria

Reference when deciding whether a feature belongs in MVP, future scope, or out of scope.

## `markdown/PRODUCT_UX_VISION.md`

Use this for:

- Experience quality bar
- Visual direction
- Interaction principles
- Dashboard philosophy
- Search and reporting feel

Reference before building or changing UI. The app should feel like premium productivity software, not accounting software.

## `markdown/ARCHITECTURE.md`

Use this for:

- Technology stack
- Tauri, Rust, React, TypeScript, Vite, and SQLite boundaries
- Application layers
- File storage strategy
- Future sync compatibility
- Deployment direction

Reference before adding backend, frontend, persistence, file system, or packaging code.

## `markdown/DATA_MODEL.md`

Use this for:

- SQLite entities
- Entity relationships
- Future sync-compatible identifiers
- Expense, vendor, category, payment method, receipt, tax year, and settings concepts

Reference before changing schema, persistence, migrations, seed data, or TypeScript/Rust data types.

## `markdown/TAX_CATEGORIES.md`

Use this for:

- Default expense category taxonomy
- Category groupings
- Future tax metadata direction

Reference before seeding categories, building category UI, or designing reports.

## `markdown/SECURITY_AND_PRIVACY.md`

Use this for:

- Local-first privacy rules
- Authentication and encryption posture
- Receipt file safety
- Backup expectations
- Logging restrictions
- No telemetry and no analytics

Reference before adding filesystem access, logging, backup, restore, export, or any future network behavior.

## `markdown/PHASE_LOG.md`

Use this for:

- Current project phase status
- Prompt, handoff, and review links
- Checks run
- Completion notes
- Project audit trail

Reference at the beginning and end of every phase.

---

# Phase Prompt Rules

Each phase prompt in `prompts/` must include:

- Goal
- Required reference docs
- In scope
- Out of scope
- Implementation instructions
- UX requirements
- Data/security requirements
- Acceptance criteria
- Test/check requirements
- Codex completion requirements
- Claude handoff requirements

Each phase prompt must begin with:

```md
# Phase XX: Name

Before starting this phase:
1. Read `FLOW.md`.
2. Read this phase prompt completely.
3. Read the required reference docs listed below.

Implementation agent: Codex
Review agent: Claude Code
```

---

# Handoff Rules

At the end of each implementation phase, Codex should create:

```text
handoffs/PHASE_XX_CLAUDE_HANDOFF.md
```

The handoff should include:

- Phase name
- Summary of completed work
- Files changed
- Important architecture decisions
- Tests/checks run
- Known limitations
- Specific review requests for Claude Code

---

# Review Rules

Claude Code should generate:

```text
reviews/PHASE_XX_CLAUDE_REVIEW.md
```

The review should include:

- Bugs or risks
- Missing requirements
- UX concerns
- Security/privacy concerns
- Test gaps
- Required fixes
- Optional improvements

---

# After Review

After the user gives Claude Code's review back to Codex:

1. Codex addresses required fixes.
2. Codex reruns relevant checks.
3. Codex updates the handoff if the implementation changed materially.
4. Codex updates `markdown/PHASE_LOG.md`.
5. The phase can move to `Complete` only after required review fixes are handled.

---

# Scope Guardrails

MVP does not include:

- Cloud sync
- Hosted web app
- User accounts
- Bank imports
- OCR
- Telemetry
- Advertising
- Analytics

Future architecture may prepare for these features, but implementation should not build them until a future phase explicitly calls for them.
