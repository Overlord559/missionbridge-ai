# MissionBridge AI — Project Context

**Owner:** Edward Stone  
**Repo:** `C:\dev\missionbridge-ai`  
**Status:** Portfolio demo — GitHub Pages deploy target

---

## Purpose

MissionBridge AI is a **mock-data AI implementation copilot** for nonprofits and mission-driven organizations. It helps teams move from messy program context to privacy-aware AI use cases, mission deliverables, a 30-day plan, and a staff handoff packet — all running locally with rule-based logic.

---

## Portfolio goal

Demonstrate capability for Claude Corps-aligned nonprofit AI work:

- nonprofit workflow analysis
- responsible AI design
- privacy-aware data handling
- AI use-case mapping
- grant and impact communication
- staff enablement
- reusable implementation artifacts

---

## Core workflow

**Context → Safety → Use Cases → Deliverables → Handoff**

1. Paste or load sanitized nonprofit context (or pick a sample org)
2. Run privacy/safety scan — detect sensitive categories, produce sanitized version
3. Generate responsible AI use cases mapped to mission and capacity
4. Generate grant, impact, donor, board, and SOP deliverables
5. Generate a 30-day implementation plan
6. Generate a copy-ready handoff packet

---

## Sample data policy

- All organizations in `src/lib/missionbridge-data.ts` are **synthetic**
- Privacy scan uses local heuristics — not ML or external APIs
- Deliverables and plans are template-driven from sample context
- **Never** paste real client, beneficiary, or grant data into demos

---

## Deployment target

- **GitHub Pages:** https://overlord559.github.io/missionbridge-ai/
- **Base path:** `/missionbridge-ai/`
- **Build:** TanStack Start + Vite with static prerender to `dist/client`
- **Deploy command (operator-run):** `npm run deploy`

---

## Non-goals

- No backend, database, or auth
- No real AI API calls or API keys
- No grant submission integration
- No production SaaS claims
- No fake users, partners, customers, revenue, or grants

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Build | Vite 8 + TanStack Start |
| UI | React 19 |
| Routing | TanStack Router |
| Styling | Tailwind CSS v4 |
| Data | Local mock data + rule-based generators in `src/lib/missionbridge-data.ts` |

---

## Known limitations

- Single-page demo — no multi-user or persistence
- Privacy scan is heuristic, not a compliance audit
- Deliverables are drafts requiring human review before external use
- GitHub Pages serves static prerender — no server-side features at runtime
- Lovable sync may regenerate `src/routeTree.gen.ts` — reconcile before commit if needed

---

## Protected paths

Do not edit without explicit scope: `.git/**`, `node_modules/**`, `.env*`, unrelated repos.
