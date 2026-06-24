# AGENTS.md — MissionBridge AI

**Audience:** Cursor, Claude, Codex, and other agents working in this repository.

**Project:** MissionBridge AI — local-first AI implementation worksheet for nonprofits and mission-driven organizations.

---

## Source of truth (this repo)

1. **`src/`** — runtime behavior wins
2. **Repo-local Project OS** — `AGENTS.md`, `docs/PROJECT_OS_INDEX.md`, `docs/PROJECT_CONTEXT.md`
3. **Operator Brain** — external execution cockpit (`C:\dev\operator-brain`)
4. **SaaS Factory** — reusable patterns (`C:\dev\priv-saas-factory`)

If docs conflict with code, **code wins**.

---

## Context modes (supported)

MissionBridge AI supports:

- **Included synthetic sample nonprofits** — defined in `src/lib/missionbridge-data.ts`
- **User-provided sanitized real nonprofit/program context** — pasted in the browser intake step

Use synthetic samples or sanitized real nonprofit context. MissionBridge runs locally in the browser and does not send data to external AI services. Do not paste sensitive client records, protected health information, student records, legal case notes, or personally identifiable information unless properly sanitized.

---

## Do not use with (unsupported / prohibited)

MissionBridge AI does **not** support and must **not** be used with:

- unsanitized client records
- sensitive personally identifiable information
- protected health information
- student/minor records
- legal/immigration case notes
- veteran benefits case details
- financial account details

MissionBridge AI is **not a compliance tool**. Privacy scan heuristics may not catch every sensitive field. **Human review is required** before using outputs in grants, donor communications, board materials, or operational decisions.

---

## Operating rules

- **No backend** — browser-local only
- **No auth**
- **No database**
- **No API keys** — no OpenAI, Claude, Anthropic, Supabase, Firebase, or external AI calls
- **No external AI calls** — rule-based local generators only
- **No payments**
- **No production deploy** without explicit operator approval
- **No push, commit, or stage** unless Edward explicitly approves
- **Do not fabricate** clients, revenue, contracts, testimonials, grants, or certifications
- **Do not add Claude/Anthropic branding** inside the product name or UI claims
- **Do not claim compliance guarantees** or that the privacy scan catches everything

---

## What this repo is

MissionBridge AI is a local-first responsible AI implementation worksheet for nonprofit teams:

- sanitized context intake (samples or user-provided)
- privacy and safety scanning (heuristic — not legal/compliance advice)
- responsible AI use-case mapping
- grant / impact / donor / board deliverables
- 30-day implementation planning
- copy-ready handoff packets (copy, download, print)
- browser-local draft persistence (`localStorage`)

This is a **standalone portfolio worksheet**. Not production SaaS.

---

## Validation after code changes

```bash
npm install
npm run dev
npm run build
npm run lint
```

---

## Startup protocol

Before serious edits:

1. Read `docs/PROJECT_OS_INDEX.md`
2. Read `docs/PROJECT_CONTEXT.md`
3. Read `AGENTS.md` (this file)
4. Load only task-specific docs from `docs/`

External context (when available):

- `C:\dev\operator-brain\BRAIN_INDEX.md`
- `C:\dev\operator-brain\current-state.md`

---

## Git safety

- No `git add .`
- Exact-path staging only
- No commit/push unless explicitly approved
- Preserve Lovable-connected branch history — no force push or history rewrite without operator approval

---

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
