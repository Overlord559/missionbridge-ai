# MissionBridge AI — Portfolio Case Study

## Project title

**MissionBridge AI** — AI Implementation Copilot for Nonprofits

## One-line summary

A mock-data portfolio demo that turns sanitized nonprofit program context into privacy-aware AI use cases, mission deliverables, a 30-day plan, and a staff handoff packet — with zero external AI calls.

---

## Problem

Nonprofit and mission-driven teams want to adopt AI responsibly but lack:

- a structured way to sanitize program context before any tool sees it
- mapped use cases tied to mission, capacity, and risk
- grant, board, donor, and impact communication drafts
- a realistic rollout plan staff can actually execute
- a handoff packet that survives after the consultant leaves

Most AI demos skip privacy, governance, and operational follow-through.

---

## Solution

MissionBridge AI is a single-page implementation copilot that walks users through six stages:

1. **Context** — paste or load synthetic nonprofit profiles
2. **Safety** — local privacy scan with risk level, categories, sanitized output
3. **Use Cases** — responsible AI briefs with human checkpoints and difficulty ratings
4. **Deliverables** — grant narrative, impact report, board brief, donor update, volunteer post, SOP
5. **Plan** — 4-week rollout with owners, tasks, metrics, and risk controls
6. **Handoff** — copy-ready packet with training checklist, prompt library, privacy guardrails, and roadmap

Everything runs in the browser with rule-based logic and synthetic data.

---

## Workflow

```
Context → Safety → Use Cases → Deliverables → 30-Day Plan → Handoff
```

---

## Responsible AI / privacy design

- **Mock data only** — three fictional nonprofits, no real client records
- **Local privacy scan** — heuristic detection of sensitive categories (names, IDs, health-adjacent terms)
- **Sanitized output** — redacted version recommended for any downstream use
- **Human review gates** — use cases and deliverables flag required staff sign-off
- **No external AI** — no API keys, no cloud inference, no data exfiltration
- **Clear demo labeling** — badges and footer copy state mock-data / local-demo status

---

## Key features

| Feature | Portfolio proof |
|---------|-----------------|
| Context intake | Nonprofit workflow understanding |
| Privacy scan | Privacy-aware data handling |
| Use case builder | Responsible AI design + risk labeling |
| Deliverable generator | Grant/impact/donor/board communication |
| 30-day plan | Staff enablement + operational thinking |
| Handoff packet | Reusable implementation artifacts |

---

## What it proves for Claude Corps / nonprofit AI work

- Can analyze mission-driven workflows without overpromising AI magic
- Designs privacy-first intake before any "AI" step
- Maps use cases to real nonprofit pain (grants, reporting, volunteer ops)
- Produces stakeholder-ready drafts, not just chat transcripts
- Builds enablement artifacts teams can keep using after deployment
- Ships portfolio-grade UI without fake production claims

---

## Screenshot checklist

Capture these section IDs for portfolio cards:

- [ ] `#screenshot-hero`
- [ ] `#screenshot-intake`
- [ ] `#screenshot-safety`
- [ ] `#screenshot-use-cases`
- [ ] `#screenshot-deliverables`
- [ ] `#screenshot-plan`
- [ ] `#screenshot-handoff`
- [ ] `#screenshot-mobile`

**Suggested flow:** Load "Central Valley Youth Robotics" → run privacy scan → generate use cases → deliverables → plan → handoff.

---

## Portfolio card copy

**MissionBridge AI**

AI implementation copilot for nonprofits — privacy scan, responsible use cases, grant/impact deliverables, 30-day plan, and staff handoff packet. Mock-data demo; no external AI.

**Tags:** React · TypeScript · TanStack · Tailwind · Nonprofit AI · Responsible AI · Privacy · Grant Writing · Portfolio Demo

---

## Resume bullets

- Built **MissionBridge AI**, a portfolio demo copilot that guides nonprofit teams from sanitized context through privacy scanning, AI use-case mapping, deliverable generation, and 30-day implementation handoff — all client-side with synthetic data
- Implemented a **local privacy scan** with risk categorization, sanitized output, and do-not-paste guardrails — no external AI or API dependencies
- Designed a **six-stage workflow** (Context → Safety → Use Cases → Deliverables → Plan → Handoff) with copy-ready grant, board, donor, and SOP drafts for mission-driven organizations
- Shipped a **TanStack Start + React 19** static demo configured for GitHub Pages with prerender, screenshot anchors, and responsible-AI labeling throughout

---

## LinkedIn post draft

I built MissionBridge AI — a portfolio demo for nonprofit teams exploring AI responsibly.

Instead of another chatbot, it walks through what implementation actually requires:

→ Sanitize program context  
→ Scan for privacy risks locally  
→ Map responsible AI use cases  
→ Draft grant, board, and donor materials  
→ Plan a 30-day rollout  
→ Export a staff handoff packet  

All mock data. No external AI calls. No fake production claims.

Built with React, TanStack Start, and Tailwind. Designed to show privacy-first nonprofit AI workflow design — not hype.

Demo: https://overlord559.github.io/missionbridge-ai/

#ResponsibleAI #NonprofitTech #AIImplementation #PortfolioProject

---

## Limitations

- Heuristic privacy scan — not legal or compliance advice
- Template-driven outputs require human editing before external use
- No persistence, auth, or multi-tenant support
- Static GitHub Pages hosting only

---

## Next steps after deployment

1. Operator runs `npm run build && npm run deploy` and enables GitHub Pages from `gh-pages`
2. Capture screenshots using the checklist above
3. Add live URL to portfolio site project card
4. Optional: add GitHub Actions workflow for CI build validation (no auto-deploy without approval)
