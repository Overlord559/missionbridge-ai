# MissionBridge AI

**AI Implementation Copilot for Nonprofits** — paste or load sanitized program context, scan for privacy risks, map responsible AI use cases, generate mission deliverables, build a 30-day plan, and export a staff handoff packet.

This is a **mock-data portfolio demo**. It does **not** use external AI calls. It does **not** process real nonprofit or client data.

---

## Live demo

**Target URL (after deploy):** https://overlord559.github.io/missionbridge-ai/

**Status:** Built and validated locally. Deploy pending operator approval.

---

## Product summary

MissionBridge AI helps mission-driven teams move through:

**Context → Safety → Use Cases → Deliverables → Handoff**

| Step | What it does |
|------|----------------|
| Context | Paste sanitized notes or load a sample nonprofit |
| Safety | Local privacy scan — categories, risk level, sanitized version |
| Use Cases | Responsible AI briefs with human checkpoints |
| Deliverables | Grant narrative, impact report, board brief, donor update, SOP |
| Plan | 4-week implementation rollout with owners and metrics |
| Handoff | Copy-ready packet — training, prompts, privacy, roadmap |

---

## Features

- Three synthetic sample nonprofits (youth STEM, veterans housing, food access)
- Rule-based privacy scan with do-not-paste checklist
- Nine mapped AI use cases per organization profile
- Six copy-ready deliverable drafts
- 30-day implementation plan with risk controls
- Full handoff packet with prompt library and success metrics
- Portfolio screenshot anchors on every major section

---

## Sample nonprofits

All data is **synthetic** — defined in `src/lib/missionbridge-data.ts`:

1. **Central Valley Youth Robotics** — youth STEM nonprofit
2. **Fresno Veterans Housing Network** — housing & veteran services
3. **Community Food Access Coalition** — food security & nutrition

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Build | [Vite 8](https://vite.dev/) + [TanStack Start](https://tanstack.com/start) |
| UI | [React 19](https://react.dev/) |
| Routing | [TanStack Router](https://tanstack.com/router) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Data | Local mock data + rule-based generators |

**Not included:** backend, database, auth, payments, API keys, external AI calls, grant submission integration.

---

## Responsible AI / privacy note

- All sample organizations and outputs are fictional
- Privacy scan uses local heuristics — not a compliance audit
- Every deliverable is marked as draft / requires staff review
- No data leaves the browser; no external API calls are made
- Do not paste real beneficiary, client, or grant data into this demo

---

## Local setup

```bash
cd C:\dev\missionbridge-ai
npm install
npm run dev
```

Open the URL shown in the terminal (typically http://localhost:8080).

Click **Load Sample Nonprofit**, then walk through Context → Safety → Use Cases → Deliverables → Plan → Handoff.

---

## Build

```bash
npm run build
```

Output: `dist/client/` (static prerender for GitHub Pages).

---

## Preview

```bash
npm run preview
```

---

## Deploy (operator-run)

```bash
npm run build
npm run deploy
```

Publishes `dist/client` to the `gh-pages` branch via [gh-pages](https://www.npmjs.com/package/gh-pages).

Ensure GitHub repo **Settings → Pages → Source** is set to deploy from the `gh-pages` branch.

---

## Lint

```bash
npm run lint
```

Lint is intentionally not enforced in CI yet because the Lovable scaffold currently has non-blocking CRLF prettier noise. Build validation is the deployment gate.

---

## Limitations

- Single-page demo — no persistence or multi-user support
- Privacy scan is illustrative, not legal/compliance advice
- Deliverables require human review before external use
- Static GitHub Pages hosting — no server runtime

---

## Portfolio positioning

MissionBridge AI demonstrates nonprofit workflow analysis, responsible AI design, privacy-aware data handling, use-case mapping, grant/impact communication, and staff enablement — built as a Claude Corps-aligned portfolio artifact.

See [`PORTFOLIO_CASE_STUDY.md`](PORTFOLIO_CASE_STUDY.md) for resume bullets, portfolio card copy, and LinkedIn draft.

---

## Agent docs

- [`AGENTS.md`](AGENTS.md) — agent operating contract
- [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) — product context
- [`docs/PROJECT_OS_INDEX.md`](docs/PROJECT_OS_INDEX.md) — routing index
