# Phase 00 Claude Review: Documentation Foundation

Implementation agent: Codex

Review agent: Claude Code

Date: 2026-06-15

Verdict: **Approve with required fixes.** The workflow is well-structured and an agent could follow it without chat context. Two cross-document inconsistencies should be resolved before Phase 01 starts because they will propagate directly into application code. The remaining items are optional polish.

---

# Scope Of This Review

Phase 00 is documentation-only. I reviewed against the Phase 00 prompt and `FLOW.md` rules, and verified every file listed in the handoff exists. I also checked the stable `markdown/*.md` docs because the Phase 00 prompt explicitly puts "clarify the purpose of every `markdown/*.md` file" and "review markdown for broken internal references" in scope, so cross-document correctness is fair game even though those files were not all edited this phase.

What I verified:

- All 9 phase prompts (`PHASE_00`–`PHASE_08`) exist in `prompts/`.
- `handoffs/` and `reviews/` exist with `.gitkeep`.
- `FLOW.md` exists at repo root.
- Every internal doc reference in `FLOW.md` and every prompt resolves to a real file. **No broken references found.**
- Every prompt follows the required header and section structure mandated by `FLOW.md`.
- `markdown/PHASE_LOG.md` carries Phase 00 as `Implemented` and pre-wires the forward links to handoff and review files.

---

# Bugs Or Risks

## R1 (Required) — Product name is inconsistent across docs, and the bad name is baked into a real filesystem path

The product is "Tax Trail" in `FLOW.md`, `README.md`, all prompts, the handoff, and the log. But:

- `markdown/PRODUCT_VISION.md:1` titles the product **"Small Business Expense Tracker."**
- `markdown/ARCHITECTURE.md:106` specifies the data directory as `%APPDATA%/SmallBusinessExpenseTracker/`.

This is not just cosmetic. Phase 01's prompt says "Store local data in platform-appropriate app data directories," and `ARCHITECTURE.md` is a required reference doc for Phase 01. Codex will read `SmallBusinessExpenseTracker` as the source of truth and bake it into the Tauri app identifier and the data directory path. Renaming a data directory after users have data in it is a migration problem, so this is cheapest to fix now, in docs, before any code reads it.

Fix: pick the canonical product name (the repo, FLOW, and all workflow docs say "Tax Trail") and reconcile `PRODUCT_VISION.md` and `ARCHITECTURE.md` to it, including the example data path (e.g. `TaxTrail/` or `Tax Trail/`).

## R2 (Required) — `DATA_MODEL.md` contradicts itself on delete vs. archive, and Phase 02 depends on it

`markdown/DATA_MODEL.md:8-13` states every major entity should have `deleted_at (nullable)` — i.e. soft delete. But:

- The `Expense` entity field list (`DATA_MODEL.md:19-34`) includes neither `deleted_at` nor an `active`/`archived` flag.
- `Category` and `Payment Method` use an `active` flag instead of `deleted_at`.
- `Vendor` and `Receipt` have neither.

Phase 02's prompt simultaneously says "Create, edit, **delete, or archive** expenses" and "Keep user-customizable records **archivable or inactive**." So the schema doc gives three competing models (soft-delete via `deleted_at`, archive via `active`, hard delete) without saying which applies to which entity. Codex will have to guess the Expense deletion model at Phase 02, and a wrong guess means a schema migration later.

Fix: in `DATA_MODEL.md`, state the deletion strategy per entity explicitly — e.g. expenses are soft-deleted (`deleted_at`) and/or archivable, lookup entities (category, payment method, vendor) use `active`. Make the `Expense` field list match. This keeps Phase 02 from inventing the policy.

---

# Missing Requirements

These are gaps in the workflow/prompts, not blockers.

- **M1 (Optional) — Canonical check commands are undefined.** Every implementation prompt says "Run TypeScript and Rust checks," but no doc names the actual commands (e.g. `npm run typecheck`, `cargo test`, `cargo clippy`). That is expected pre-code, but `FLOW.md` or the Phase 01 prompt should state that Phase 01 establishes the canonical check commands and that later phases reference them, so "run the checks" stays unambiguous.
- **M2 (Optional) — `deductible` and `business_purpose` have no owning phase.** `DATA_MODEL.md` gives `Expense` a `deductible` and `business_purpose` field, but no prompt mentions how either is captured, defaulted, or surfaced. Phase 02 is the natural home. Add a line to the Phase 02 prompt so these fields don't get silently dropped.
- **M3 (Optional) — No git/commit discipline in the workflow.** `FLOW.md` describes the implement→handoff→review→fix loop but never says when work is committed. Note that all Phase 00 deliverables are currently untracked (`git status --short` shows `FLOW.md`, `handoffs/`, `markdown/`, `prompts/`, `reviews/` as `??`), so the handoff's "ready to be committed" is accurate but the commit step is not in the documented loop. Consider adding "commit after the phase log is updated" as step 11.

---

# UX Concerns

- **U1 (Optional) — `README.md` is a one-line stub.** It contains only `# Tax-Trail`. `FLOW.md` is the real entry point, but a newcomer (or a fresh agent) lands on the README first. A two-line README pointing to `FLOW.md` as the required starting point would close the loop, and it fits Phase 00's "make the workflow clear enough that another agent can follow it without chat context" goal.

(No product-facing UX to review this phase — no app code exists, which matches the prompt's out-of-scope list.)

---

# Security / Privacy Concerns

No issues. The privacy posture is consistent and well-propagated:

- `SECURITY_AND_PRIVACY.md` (no telemetry/analytics/cloud, never log financial details/receipt contents) is reflected in every prompt's Data/Security section.
- Scope guardrails in `FLOW.md:236-248` correctly exclude cloud sync, telemetry, analytics, accounts, bank imports, and OCR from the MVP, matching `PRODUCT_VISION.md`.
- Phase 03/06 correctly call out path validation before opening files and safe archive extraction — the right risks to flag before that code is written.

One forward-looking note (not a fix): Phase 06 allows "Encrypted backup unless explicitly approved" and Phase 08 lists optional encryption. When that lands, `SECURITY_AND_PRIVACY.md:95-97` should be expanded with key-recovery handling, since a lost key on an encrypted local backup is unrecoverable. Flagging now so it isn't forgotten.

---

# Test Gaps

For a docs phase, "tests" are the structural checks in the Phase 00 prompt. All pass: expected files/dirs exist, no broken internal references, prompts conform to the required template. One minor observation:

- **T1 (Optional) — Status lifecycle is not mapped to workflow steps.** `PHASE_LOG.md:21-28` defines six statuses (`Planned`, `In Progress`, `Implemented`, `In Review`, `Review Fixes`, `Complete`) but neither `PHASE_LOG.md` nor `FLOW.md` says which workflow step triggers each transition. "Implemented" vs "In Review" is currently a judgment call. A one-line mapping (e.g. "In Review = handoff handed to Claude Code") makes the ledger self-explanatory and is the kind of detail the handoff asked about ("usable as a project ledger").

---

# Answers To The Handoff's Specific Review Requests

- **Does `FLOW.md` clearly explain how Codex, Claude Code, and the user interact?** Yes. The 10-step Required Phase Workflow plus the Agent Roles section make the three-party loop clear, including who hands artifacts to whom. This is the strongest part of the phase.
- **Are the phase prompts specific enough to guide implementation?** Yes, with the M2 exception. Each prompt has goal, scope in/out, UX, data/security, acceptance criteria, and checks — enough to start without chat context. They are appropriately high-level for a pre-code phase; the only concrete handle that's missing is the actual check commands (M1).
- **Is `PHASE_LOG.md` usable as a project ledger?** Yes. It tracks status, prompt/handoff/review links, checks, and completion per phase. T1 (status-transition mapping) would make it fully self-describing.
- **Does the structure cleanly separate stable docs, prompts, handoffs, and reviews?** Yes. `markdown/` (stable), `prompts/` (reusable), `handoffs/` (Codex output), `reviews/` (Claude output) is a clean separation and `FLOW.md` documents each directory's role.
- **Any required workflow detail missing before app code begins?** The two required items above (R1 product name, R2 deletion model) are the cross-doc decisions worth locking before Phase 01/02 touch them. M1 (check commands) and M3 (commit step) are the workflow gaps; both are optional but cheap.

---

# Required Fixes

1. **R1** — Reconcile the product name to "Tax Trail" across `PRODUCT_VISION.md` and `ARCHITECTURE.md`, including the data-directory example path, before Phase 01 reads `ARCHITECTURE.md`.
2. **R2** — Resolve the delete-vs-archive contradiction in `DATA_MODEL.md` and make the `Expense` field list reflect the chosen deletion strategy, before Phase 02.

---

# Optional Improvements

1. **M1** — State the canonical TypeScript/Rust check commands (defined in Phase 01) so "run the checks" is unambiguous later.
2. **M2** — Give `deductible` / `business_purpose` an owning phase (Phase 02).
3. **M3** — Add a commit step to the `FLOW.md` workflow loop.
4. **U1** — Expand `README.md` to point to `FLOW.md` as the entry point.
5. **T1** — Map each `PHASE_LOG.md` status to the workflow step that triggers it.
6. Minor: `DATA_MODEL.md` `Receipt`, `Settings`, and `Tax Year` entities omit the standard `uuid`/`updated_at`/`deleted_at` fields that the top-of-file Note requires; align or note the intentional exceptions.
7. Minor: `handoffs/.gitkeep` is now redundant alongside the committed `PHASE_00_CLAUDE_HANDOFF.md`; harmless, can be removed.

---

# Recommendation

Phase 00 can move to `Review Fixes` and then `Complete` once **R1** and **R2** are addressed. The optional items can be folded into the relevant later phases rather than blocking Phase 00. The documentation foundation is solid and the review workflow itself is ready to use.
