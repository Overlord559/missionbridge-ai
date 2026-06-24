# Project OS Index — MissionBridge AI

**Router for agents.** Read this file on every serious session, then load only what the task needs.

---

## Mandatory startup

```text
Before editing:
1. Read AGENTS.md
2. Read docs/PROJECT_CONTEXT.md
3. Read this file (docs/PROJECT_OS_INDEX.md)
4. Do not commit/push unless explicitly approved
```

---

## Document map

| File | Purpose |
|------|---------|
| [`AGENTS.md`](../AGENTS.md) | Agent operating contract, hard rules |
| [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) | Product purpose, workflow, deployment |
| [`../README.md`](../README.md) | Setup, build, deploy, portfolio summary |
| [`../PORTFOLIO_CASE_STUDY.md`](../PORTFOLIO_CASE_STUDY.md) | Portfolio copy, resume bullets, LinkedIn draft |

---

## External context (optional)

| Source | Path |
|--------|------|
| Operator Brain index | `C:\dev\operator-brain\BRAIN_INDEX.md` |
| Operator Brain state | `C:\dev\operator-brain\current-state.md` |
| SaaS Factory | `C:\dev\priv-saas-factory\MASTER.md` |

---

## Key source paths

| Area | Path |
|------|------|
| Main app route | `src/routes/index.tsx` |
| Mock data + generators | `src/lib/missionbridge-data.ts` |
| Root layout / meta | `src/routes/__root.tsx` |
| Styles | `src/styles.css` |
| Vite config | `vite.config.ts` |
| Static assets | `public/` |

---

## Screenshot ID checklist

These IDs must exist on visible sections for portfolio capture:

| ID | Section |
|----|---------|
| `screenshot-hero` | Hero |
| `screenshot-intake` | Context intake |
| `screenshot-safety` | Privacy & safety scan |
| `screenshot-use-cases` | AI use cases |
| `screenshot-deliverables` | Mission deliverables |
| `screenshot-plan` | 30-day plan |
| `screenshot-handoff` | Handoff packet |
| `screenshot-mobile` | Footer (mobile-friendly anchor) |

IDs are set via the `Section` component (`id={`screenshot-${id}`}`) and `screenshot-hero` on the hero block.

---

## Validation commands

```bash
cd C:\dev\missionbridge-ai
npm install
npm run dev      # http://localhost:8080 (Lovable default) or Vite port
npm run build    # outputs to dist/client with prerender
npm run preview  # preview production build
npm run lint
```

---

## Deployment notes

- **Target URL:** https://overlord559.github.io/missionbridge-ai/
- **Vite base:** `/missionbridge-ai/` in `vite.config.ts`
- **Prerender:** enabled in `tanstackStart.prerender` for static GitHub Pages
- **Deploy (operator-run only):** `npm run deploy` → publishes `dist/client` via gh-pages
- **Do not run deploy or push** from agent sessions without explicit approval
- Add `public/.nojekyll` so GitHub Pages serves `_`-prefixed assets correctly

---

## Task routing

| Task type | Load |
|-----------|------|
| UI/feature work | PROJECT_CONTEXT + `src/routes/index.tsx` |
| Mock data / generators | `src/lib/missionbridge-data.ts` |
| GitHub Pages / build | this file + `vite.config.ts` + `package.json` |
| Portfolio copy | PORTFOLIO_CASE_STUDY.md + README.md |
| Handoff / new chat | PROJECT_CONTEXT + README |
