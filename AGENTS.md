# AGENTS.md — MissionBridge AI

**Audience:** Cursor, Claude, Codex, and other agents working in this repository.

**Project:** MissionBridge AI — portfolio-grade AI implementation copilot demo for nonprofits and mission-driven organizations.

---

## Source of truth (this repo)

1. **`src/`** — runtime behavior wins
2. **Repo-local Project OS** — `AGENTS.md`, `docs/PROJECT_OS_INDEX.md`, `docs/PROJECT_CONTEXT.md`
3. **Operator Brain** — external execution cockpit (`C:\dev\operator-brain`)
4. **SaaS Factory** — reusable patterns (`C:\dev\priv-saas-factory`)

If docs conflict with code, **code wins**.

---

## Operating rules

- **No backend** — frontend-only demo
- **No API keys** — no OpenAI, Claude, Anthropic, Supabase, Firebase, or external AI calls
- **No auth, database, or payments**
- **Local mock data only** — all nonprofit context lives in `src/lib/missionbridge-data.ts`
- **No real nonprofit or client data** — synthetic samples only
- **No production deploy** without explicit operator approval
- **No push, commit, or stage** unless Edward explicitly approves
- **Do not fabricate** clients, revenue, contracts, testimonials, grants, or certifications
- **Do not add Claude/Anthropic branding** inside the product name or UI claims

---

## What this repo is

MissionBridge AI demonstrates responsible AI implementation patterns for nonprofit teams:

- sanitized context intake
- privacy and safety scanning
- responsible AI use-case mapping
- grant / impact / donor / board deliverables
- 30-day implementation planning
- copy-ready handoff packets

This is a **standalone portfolio demo**. Not production SaaS.

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
