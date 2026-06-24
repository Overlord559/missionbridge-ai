import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useCallback } from "react";
import {
  ArrowRight, Sparkles, ShieldCheck, FileText, Workflow, PackageCheck,
  Copy, Check, AlertTriangle, ShieldAlert, Loader2, Building2,
  ListChecks, BookOpen, Gauge, ChevronRight, Cpu, Eye,
} from "lucide-react";
import {
  SAMPLE_NONPROFITS, scanContext, generateUseCases, generateDeliverables,
  generatePlan, generateHandoff, type Nonprofit, type ScanResult,
  type UseCase, type Deliverable, type PlanWeek, type HandoffPacket,
} from "@/lib/missionbridge-data";

export const Route = createFileRoute("/")({
  component: MissionBridgeApp,
});

type SectionId = "hero" | "intake" | "safety" | "use-cases" | "deliverables" | "plan" | "handoff";

const STEPS: { id: SectionId; label: string; short: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "intake", label: "Context", short: "01", icon: Building2 },
  { id: "safety", label: "Safety", short: "02", icon: ShieldCheck },
  { id: "use-cases", label: "Use Cases", short: "03", icon: Sparkles },
  { id: "deliverables", label: "Deliverables", short: "04", icon: FileText },
  { id: "plan", label: "30-Day Plan", short: "05", icon: Workflow },
  { id: "handoff", label: "Handoff", short: "06", icon: PackageCheck },
];

function MissionBridgeApp() {
  const [active, setActive] = useState<Nonprofit | null>(null);
  const [contextText, setContextText] = useState("");
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [useCases, setUseCases] = useState<UseCase[] | null>(null);
  const [deliverables, setDeliverables] = useState<Deliverable[] | null>(null);
  const [plan, setPlan] = useState<PlanWeek[] | null>(null);
  const [handoff, setHandoff] = useState<HandoffPacket | null>(null);

  const completed = useMemo(() => {
    const c: Record<SectionId, boolean> = {
      hero: true,
      intake: contextText.trim().length > 60,
      safety: !!scan,
      "use-cases": !!useCases,
      deliverables: !!deliverables,
      plan: !!plan,
      handoff: !!handoff,
    };
    return c;
  }, [contextText, scan, useCases, deliverables, plan, handoff]);

  const loadSample = useCallback((n: Nonprofit) => {
    setActive(n);
    const text = buildContextText(n);
    setContextText(text);
    setScan(null); setUseCases(null); setDeliverables(null); setPlan(null); setHandoff(null);
    setTimeout(() => scrollTo("intake"), 50);
  }, []);

  const runScan = useCallback(() => {
    setScanning(true);
    setTimeout(() => {
      setScan(scanContext(contextText));
      setScanning(false);
      scrollTo("safety");
    }, 700);
  }, [contextText]);

  const buildUseCases = useCallback(() => {
    setUseCases(generateUseCases(active));
    setTimeout(() => scrollTo("use-cases"), 30);
  }, [active]);

  const buildDeliverables = useCallback(() => {
    if (!active) return;
    setDeliverables(generateDeliverables(active));
    setTimeout(() => scrollTo("deliverables"), 30);
  }, [active]);

  const buildPlan = useCallback(() => {
    setPlan(generatePlan(active));
    setTimeout(() => scrollTo("plan"), 30);
  }, [active]);

  const buildHandoff = useCallback(() => {
    setHandoff(generateHandoff(active));
    setTimeout(() => scrollTo("handoff"), 30);
  }, [active]);

  return (
    <div className="min-h-screen text-foreground">
      <TopNav completed={completed} />
      <Hero onLoadSample={() => loadSample(SAMPLE_NONPROFITS[0])} onStart={() => scrollTo("intake")} />
      <ProgressStrip completed={completed} />

      <IntakeSection
        active={active}
        contextText={contextText}
        setContextText={setContextText}
        onLoadSample={loadSample}
        onScan={runScan}
        scanning={scanning}
      />

      <SafetySection scan={scan} onContinue={buildUseCases} />

      <UseCasesSection useCases={useCases} onBuild={buildUseCases} hasContext={contextText.length > 0} onContinue={buildDeliverables} canContinue={!!active} />

      <DeliverablesSection deliverables={deliverables} onBuild={buildDeliverables} canBuild={!!active} onContinue={buildPlan} />

      <PlanSection plan={plan} onBuild={buildPlan} onContinue={buildHandoff} />

      <HandoffSection handoff={handoff} onBuild={buildHandoff} useCasesCount={useCases?.length ?? 0} deliverablesCount={deliverables?.length ?? 0} risk={scan?.risk ?? null} />

      <Footer />
    </div>
  );
}

function scrollTo(id: string) {
  document.getElementById(`screenshot-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildContextText(n: Nonprofit): string {
  return [
    `Organization: ${n.name}`,
    `Type: ${n.type}`,
    `Mission: ${n.mission}`,
    `Population served: ${n.population}`,
    `Program notes: ${n.programNotes}`,
    `Current pain points: ${n.painPoints}`,
    `Staff capacity: ${n.staffCapacity}`,
    `Available data: ${n.availableData}`,
    `Grant opportunity: ${n.grantOpportunity}`,
    `Outcome metrics: ${n.outcomeMetrics}`,
    `Constraints: ${n.constraints}`,
  ].join("\n\n");
}

/* ───────────────────────── NAV ───────────────────────── */

function TopNav({ completed }: { completed: Record<SectionId, boolean> }) {
  const done = STEPS.filter(s => completed[s.id]).length;
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Logo />
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-impact" />
            <span>Mock-data demo · No external AI calls</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1 text-xs">
          {STEPS.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`px-2.5 py-1.5 rounded-md transition ${completed[s.id] ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <Gauge className="h-3.5 w-3.5" />
            <span className="tabular-nums">{done}/{STEPS.length}</span>
          </div>
          <button className="btn-primary text-xs" onClick={() => scrollTo("intake")}>
            Start
          </button>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-8 w-8 rounded-lg" style={{ background: "var(--gradient-mission)" }}>
        <div className="absolute inset-0 rounded-lg" style={{ boxShadow: "0 0 30px -5px oklch(0.78 0.14 60 / 0.7)" }} />
        <svg viewBox="0 0 32 32" className="absolute inset-0 h-full w-full">
          <path d="M6 22 Q16 8 26 22" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.95" />
          <circle cx="6" cy="22" r="2.2" fill="white" />
          <circle cx="26" cy="22" r="2.2" fill="white" />
          <circle cx="16" cy="13" r="1.8" fill="white" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="text-[15px] font-semibold tracking-tight">MissionBridge <span className="text-mission">AI</span></div>
        <div className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Implementation Copilot</div>
      </div>
    </div>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function Hero({ onLoadSample, onStart }: { onLoadSample: () => void; onStart: () => void }) {
  return (
    <section id="screenshot-hero" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-14 sm:pt-20 pb-12 sm:pb-20 relative">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 chip chip-mission mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              AI Implementation Copilot for Nonprofits
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              From messy mission context to a <span className="italic text-mission">complete</span> AI implementation packet.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              MissionBridge AI helps mission-driven teams turn sanitized program notes, grant requirements, and
              outcome metrics into privacy-aware AI use cases, impact narratives, donor updates, board briefs, and a
              30-day implementation handoff packet.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button className="btn-primary inline-flex items-center gap-2" onClick={onLoadSample}>
                Load Sample Nonprofit <ArrowRight className="h-4 w-4" />
              </button>
              <button className="btn-ghost inline-flex items-center gap-2" onClick={onStart}>
                Start Implementation Brief
              </button>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="chip">Mock Data</span>
              <span className="chip">Local Demo</span>
              <span className="chip"><ShieldCheck className="h-3 w-3 text-impact" /> Privacy-First</span>
              <span className="chip"><Cpu className="h-3 w-3 text-intel" /> No External AI</span>
              <span className="chip"><Eye className="h-3 w-3 text-warn" /> Human Review Required</span>
            </div>
          </div>

          <HeroVisual />
        </div>

        <WorkflowPreview />
      </div>
    </section>
  );
}

function HeroVisual() {
  // SVG bridge network — Context → Safety → Use Cases → Deliverables → Handoff
  const nodes = [
    { x: 60, y: 230, label: "Context", color: "mission" },
    { x: 200, y: 130, label: "Safety", color: "impact" },
    { x: 340, y: 230, label: "Use Cases", color: "intel" },
    { x: 480, y: 130, label: "Deliverables", color: "warn" },
    { x: 620, y: 230, label: "Handoff", color: "mission" },
  ];
  const colorMap: Record<string, string> = {
    mission: "oklch(0.82 0.15 60)",
    impact: "oklch(0.82 0.16 155)",
    intel: "oklch(0.78 0.13 235)",
    warn: "oklch(0.85 0.15 85)",
  };
  return (
    <div className="relative h-[420px] lg:h-[480px] panel-strong overflow-hidden animate-float-slow">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, oklch(0.78 0.14 60 / 0.35), transparent 70%)" }} />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, oklch(0.72 0.13 235 / 0.3), transparent 70%)" }} />

      <svg viewBox="0 0 700 360" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="bridge" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.14 60)" />
            <stop offset="50%" stopColor="oklch(0.78 0.16 155)" />
            <stop offset="100%" stopColor="oklch(0.72 0.13 235)" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>

        {/* arc bridge */}
        <path d="M60 230 Q200 60 340 230 T620 230" stroke="url(#bridge)" strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M60 230 Q200 60 340 230 T620 230" stroke="url(#bridge)" strokeWidth="2" fill="none" filter="url(#glow)" opacity="0.5" />

        {/* connecting dashed network */}
        {nodes.map((n, i) => nodes.slice(i + 1).map((m, j) => (
          <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
            stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" />
        )))}

        {/* moving particles along bridge */}
        <path id="bridgePath" d="M60 230 Q200 60 340 230 T620 230" fill="none" stroke="oklch(1 0 0 / 0.1)" strokeWidth="1" className="animate-dash" />

        {/* nodes */}
        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="22" fill={colorMap[n.color]} opacity="0.18" />
            <circle cx={n.x} cy={n.y} r="10" fill={colorMap[n.color]} className="animate-pulse-node" />
            <circle cx={n.x} cy={n.y} r="4" fill="white" />
            <text x={n.x} y={n.y + 42} textAnchor="middle" fontSize="11" fill="oklch(0.85 0.02 250)" fontFamily="Inter, sans-serif" letterSpacing="0.5">
              {n.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>

      {/* floating cards */}
      <div className="absolute top-5 left-5 glass rounded-lg px-3 py-2 text-[11px] flex items-center gap-2">
        <ShieldCheck className="h-3.5 w-3.5 text-impact" /> Privacy scan · pass
      </div>
      <div className="absolute top-5 right-5 glass rounded-lg px-3 py-2 text-[11px] flex items-center gap-2">
        <Cpu className="h-3.5 w-3.5 text-intel" /> 9 use cases mapped
      </div>
      <div className="absolute bottom-5 left-5 glass rounded-lg px-3 py-2 text-[11px] flex items-center gap-2">
        <FileText className="h-3.5 w-3.5 text-mission" /> Grant draft · ready
      </div>
      <div className="absolute bottom-5 right-5 glass rounded-lg px-3 py-2 text-[11px] flex items-center gap-2">
        <PackageCheck className="h-3.5 w-3.5 text-warn" /> Handoff packet · v1
      </div>
    </div>
  );
}

function WorkflowPreview() {
  return (
    <div className="mt-14 panel-strong p-3 sm:p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {[
          { label: "Context", icon: Building2, tint: "mission" },
          { label: "Safety", icon: ShieldCheck, tint: "impact" },
          { label: "Use Cases", icon: Sparkles, tint: "intel" },
          { label: "Deliverables", icon: FileText, tint: "warn" },
          { label: "Handoff", icon: PackageCheck, tint: "mission" },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-3.5 py-3">
            <div className={`h-9 w-9 shrink-0 rounded-lg grid place-items-center chip-${s.tint}`}>
              <s.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Step {i + 1}</div>
              <div className="text-sm font-medium truncate">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── PROGRESS STRIP ───────────── */

function ProgressStrip({ completed }: { completed: Record<SectionId, boolean> }) {
  const done = STEPS.filter(s => completed[s.id]).length;
  const pct = Math.round((done / STEPS.length) * 100);
  return (
    <div className="sticky top-16 z-30 border-y border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-3 flex items-center gap-4 overflow-x-auto">
        <div className="text-xs text-muted-foreground shrink-0">Implementation</div>
        <div className="flex items-center gap-2 shrink-0">
          {STEPS.map((s) => {
            const isDone = completed[s.id];
            return (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                className={`flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] transition shrink-0
                  ${isDone ? "border-impact/40 bg-impact/10 text-impact" : "border-border text-muted-foreground hover:text-foreground"}`}>
                <span className="font-mono text-[10px] opacity-70">{s.short}</span>
                <span>{s.label}</span>
                {isDone && <Check className="h-3 w-3" />}
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex items-center gap-3 shrink-0">
          <div className="hidden sm:block h-1.5 w-40 rounded-full bg-border overflow-hidden">
            <div className="h-full" style={{ width: `${pct}%`, background: "var(--gradient-mission)" }} />
          </div>
          <span className="text-xs tabular-nums text-muted-foreground">{pct}%</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────── INTAKE ───────────── */

function IntakeSection({
  active, contextText, setContextText, onLoadSample, onScan, scanning,
}: {
  active: Nonprofit | null;
  contextText: string;
  setContextText: (v: string) => void;
  onLoadSample: (n: Nonprofit) => void;
  onScan: () => void;
  scanning: boolean;
}) {
  return (
    <Section id="intake" eyebrow="01 — Context" title="Nonprofit context intake" desc="Paste sanitized program context or load a sample organization. This is the foundation for everything downstream.">
      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="panel-strong p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 shrink-0 rounded-lg chip-mission grid place-items-center">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{active?.name ?? "Untitled organization"}</div>
                <div className="text-xs text-muted-foreground truncate">{active?.type ?? "Add or paste sanitized context to begin"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="chip chip-warn"><AlertTriangle className="h-3 w-3" /> Sanitized data only</span>
            </div>
          </div>

          <textarea
            value={contextText}
            onChange={(e) => setContextText(e.target.value)}
            placeholder="Paste sanitized program context here — mission, population served, program notes, pain points, available data, outcome metrics, constraints..."
            className="mt-5 w-full h-[420px] resize-y rounded-xl bg-background/60 border border-border focus:border-mission/60 focus:outline-none focus:ring-2 focus:ring-mission/20 p-4 text-sm leading-relaxed font-mono text-foreground placeholder:text-muted-foreground/60"
          />

          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs text-muted-foreground">
              {contextText.trim().split(/\s+/).filter(Boolean).length.toLocaleString()} words · {contextText.length.toLocaleString()} chars
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-ghost text-xs" onClick={() => setContextText("")}>Clear</button>
              <button
                className="btn-primary inline-flex items-center gap-2 text-xs disabled:opacity-50"
                disabled={contextText.trim().length < 40 || scanning}
                onClick={onScan}
              >
                {scanning ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Scanning…</> : <>Analyze & run privacy scan <ArrowRight className="h-3.5 w-3.5" /></>}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground px-1">Sample nonprofits</div>
          {SAMPLE_NONPROFITS.map((n) => {
            const isActive = active?.id === n.id;
            return (
              <button
                key={n.id}
                onClick={() => onLoadSample(n)}
                className={`w-full text-left panel p-4 transition group hover:border-border-strong ${isActive ? "ring-1 ring-mission/40 border-mission/40" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{n.name}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{n.type}</div>
                  </div>
                  <ChevronRight className={`h-4 w-4 shrink-0 transition ${isActive ? "text-mission" : "text-muted-foreground group-hover:text-foreground"}`} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">{n.mission}</p>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ───────────── SAFETY ───────────── */

function SafetySection({ scan, onContinue }: { scan: ScanResult | null; onContinue: () => void }) {
  return (
    <Section id="safety" eyebrow="02 — Safety" title="Privacy & safety scan" desc="Detect sensitive data categories, produce a sanitized version, and flag where human review is required before any AI workflow runs.">
      {!scan ? (
        <EmptyState icon={ShieldCheck} title="No scan yet" desc="Run the privacy scan from the intake step to see detected categories, a sanitized context, and the do-not-paste checklist." />
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="panel-strong p-6 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Overall risk</div>
              <RiskBadge level={scan.risk} />
            </div>
            <div className="mt-4 font-display text-5xl tracking-tight">{scan.risk}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              {scan.risk === "Low" && "No high-severity signals detected in the pasted context. Continue with standard responsible-use practices."}
              {scan.risk === "Medium" && "Some sensitive categories detected. Sanitize the flagged items and require human review before any external use."}
              {scan.risk === "High" && "High-sensitivity categories detected. Do not proceed with raw context. Use the sanitized version and require human sign-off."}
            </p>
            {scan.humanReviewRequired && (
              <div className="mt-5 rounded-xl border border-warn/40 bg-warn/10 p-4 text-warn text-xs flex gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                <div><strong className="font-semibold">Human review required.</strong> No AI output may be shared externally until a designated reviewer signs off.</div>
              </div>
            )}

            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-2">Do-not-paste checklist</div>
              <ul className="space-y-1.5 text-sm">
                {scan.checklist.map((c, i) => (
                  <li key={i} className="flex gap-2"><span className="text-muted-foreground">•</span><span>{c}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="panel-strong p-6 lg:col-span-1">
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Detected categories</div>
            <div className="mt-3 space-y-2">
              {scan.categories.length === 0 && <div className="text-sm text-muted-foreground">No sensitive categories detected.</div>}
              {scan.categories.map((c, i) => (
                <div key={i} className="rounded-xl border border-border bg-background/40 p-3.5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{c.label}</div>
                    <RiskBadge level={c.tone} small />
                  </div>
                  <div className="mt-1.5 text-xs text-muted-foreground">{c.count} signal{c.count > 1 ? "s" : ""} found</div>
                  {c.samples.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {c.samples.map((s, j) => (
                        <span key={j} className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-risk/15 text-risk border border-risk/30">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="panel-strong p-6 lg:col-span-1 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Safe-to-use version</div>
              <CopyButton text={scan.sanitized} />
            </div>
            <pre className="mt-3 flex-1 overflow-auto whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-muted-foreground max-h-[420px]">
              {scan.sanitized}
            </pre>
            <button className="btn-primary mt-4 inline-flex items-center justify-center gap-2 text-xs" onClick={onContinue}>
              Generate AI use cases <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}

function RiskBadge({ level, small }: { level: "Low" | "Medium" | "High"; small?: boolean }) {
  const cls = level === "High" ? "chip-risk" : level === "Medium" ? "chip-warn" : "chip-impact";
  return <span className={`chip ${cls} ${small ? "text-[10px] py-0.5 px-2" : ""}`}>{level} risk</span>;
}

/* ───────────── USE CASES ───────────── */

function UseCasesSection({
  useCases, onBuild, onContinue, hasContext, canContinue,
}: { useCases: UseCase[] | null; onBuild: () => void; onContinue: () => void; hasContext: boolean; canContinue: boolean }) {
  return (
    <Section
      id="use-cases"
      eyebrow="03 — Use Cases"
      title="Responsible AI use case builder"
      desc="Each card is a self-contained brief: what it solves, who uses it, what it needs, the risk level, the human checkpoint, and the recommended first step."
      action={
        useCases ? (
          <button className="btn-primary inline-flex items-center gap-2 text-xs" onClick={onContinue} disabled={!canContinue}>
            Generate deliverables <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button className="btn-primary inline-flex items-center gap-2 text-xs" onClick={onBuild} disabled={!hasContext}>
            Build use cases <Sparkles className="h-3.5 w-3.5" />
          </button>
        )
      }
    >
      {!useCases ? (
        <EmptyState icon={Sparkles} title="No use cases yet" desc="Run the privacy scan first, then generate use cases mapped to this organization's mission, pain points, and capacity." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((u, i) => <UseCaseCard key={i} u={u} index={i} />)}
        </div>
      )}
    </Section>
  );
}

function UseCaseCard({ u, index }: { u: UseCase; index: number }) {
  return (
    <div className="panel-strong p-5 flex flex-col">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted-foreground">USE CASE · {String(index + 1).padStart(2, "0")}</span>
        <RiskBadge level={u.risk} small />
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug">{u.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{u.problem}</p>

      <dl className="mt-4 space-y-2 text-xs">
        <DL label="Users" value={u.users} />
        <DL label="Inputs" value={u.inputs} />
        <DL label="Output" value={u.output} />
        <DL label="Human checkpoint" value={u.checkpoint} />
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="chip chip-impact">⏱ {u.timeSaved}</span>
        <span className="chip chip-intel">Difficulty · {u.difficulty}</span>
        <span className="chip">{u.tag}</span>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">First step</div>
        <div className="text-xs mt-1 text-foreground/90">{u.firstStep}</div>
      </div>
    </div>
  );
}

function DL({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground/90">{value}</dd>
    </div>
  );
}

/* ───────────── DELIVERABLES ───────────── */

function DeliverablesSection({
  deliverables, onBuild, canBuild, onContinue,
}: { deliverables: Deliverable[] | null; onBuild: () => void; canBuild: boolean; onContinue: () => void }) {
  const [active, setActive] = useState(0);
  return (
    <Section
      id="deliverables"
      eyebrow="04 — Deliverables"
      title="Mission deliverable generator"
      desc="Polished, copy-ready drafts for the work nonprofit teams spend the most time on. Every output is a starting point — staff review is required."
      action={
        deliverables ? (
          <button className="btn-primary inline-flex items-center gap-2 text-xs" onClick={onContinue}>
            Build 30-day plan <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button className="btn-primary inline-flex items-center gap-2 text-xs" onClick={onBuild} disabled={!canBuild}>
            Generate deliverables <FileText className="h-3.5 w-3.5" />
          </button>
        )
      }
    >
      {!deliverables ? (
        <EmptyState icon={FileText} title="No deliverables yet" desc="Load or select a sample nonprofit, then generate drafts — grant narrative, impact report, board brief, donor update, volunteer post, and SOP." />
      ) : (
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <div className="space-y-2">
            {deliverables.map((d, i) => (
              <button key={d.id} onClick={() => setActive(i)}
                className={`w-full text-left panel p-3.5 transition ${i === active ? "border-mission/50 ring-1 ring-mission/30" : "hover:border-border-strong"}`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium truncate">{d.title}</div>
                  <span className="text-[10px] font-mono text-muted-foreground">{d.type}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{d.blurb}</div>
              </button>
            ))}
          </div>
          <DocumentCard d={deliverables[active]} />
        </div>
      )}
    </Section>
  );
}

function DocumentCard({ d }: { d: Deliverable }) {
  return (
    <div className="doc-card p-7 sm:p-10 relative">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-ivory-foreground/60 font-mono">{d.type} · Draft v1</div>
          <h3 className="font-display text-3xl sm:text-4xl mt-1 leading-tight">{d.title}</h3>
          <p className="text-sm text-ivory-foreground/70 mt-1">{d.blurb}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`chip ${d.status === "Ready for Review" ? "chip-impact" : "chip-warn"}`}>{d.status}</span>
          <CopyButton text={d.body} variant="dark" />
        </div>
      </div>
      <div className="mt-6 border-t border-ivory-foreground/10 pt-6">
        <pre className="whitespace-pre-wrap text-[13.5px] leading-[1.75] font-sans text-ivory-foreground/90">
          {d.body}
        </pre>
      </div>
      <div className="mt-6 pt-4 border-t border-ivory-foreground/10 text-[11px] text-ivory-foreground/55 font-mono flex items-center justify-between gap-2 flex-wrap">
        <span>MissionBridge AI · mock-data demo · not for external use without staff review</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  );
}

/* ───────────── PLAN ───────────── */

function PlanSection({ plan, onBuild, onContinue }: { plan: PlanWeek[] | null; onBuild: () => void; onContinue: () => void }) {
  return (
    <Section
      id="plan"
      eyebrow="05 — Implementation"
      title="30-day AI implementation plan"
      desc="A four-week rollout with owners, tasks, deliverables, success metrics, and risk controls — built for a small team to actually execute."
      action={
        plan ? (
          <button className="btn-primary inline-flex items-center gap-2 text-xs" onClick={onContinue}>
            Build handoff packet <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button className="btn-primary inline-flex items-center gap-2 text-xs" onClick={onBuild}>
            Generate plan <Workflow className="h-3.5 w-3.5" />
          </button>
        )
      }
    >
      {!plan ? (
        <EmptyState icon={Workflow} title="No plan yet" desc="Generate a 30-day plan that maps to this organization's pilot workflow, capacity, and constraints." />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {plan.map((w) => (
            <div key={w.week} className="panel-strong p-5 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 rounded-full opacity-20" style={{ background: "var(--gradient-mission)", filter: "blur(40px)" }} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground">WEEK</span>
                  <span className="font-display text-3xl">{w.week}</span>
                </div>
                <h3 className="mt-1 text-base font-semibold leading-snug">{w.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{w.objective}</p>

                <div className="mt-4 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Owner</div>
                <div className="text-xs">{w.owner}</div>

                <div className="mt-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Tasks</div>
                <ul className="mt-1 space-y-1 text-xs">
                  {w.tasks.map((t, i) => <li key={i} className="flex gap-2"><Check className="h-3 w-3 mt-0.5 text-impact shrink-0" /><span>{t}</span></li>)}
                </ul>

                <div className="mt-4 grid grid-cols-1 gap-2 text-xs">
                  <KV k="Deliverable" v={w.deliverable} tint="mission" />
                  <KV k="Success metric" v={w.successMetric} tint="impact" />
                  <KV k="Risk control" v={w.riskControl} tint="warn" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

function KV({ k, v, tint }: { k: string; v: string; tint: "mission" | "impact" | "warn" }) {
  return (
    <div className={`rounded-lg border border-border bg-background/40 p-2.5`}>
      <div className={`text-[10px] uppercase tracking-[0.14em] text-${tint}`}>{k}</div>
      <div className="text-xs mt-0.5">{v}</div>
    </div>
  );
}

/* ───────────── HANDOFF ───────────── */

function HandoffSection({
  handoff, onBuild, useCasesCount, deliverablesCount, risk,
}: {
  handoff: HandoffPacket | null;
  onBuild: () => void;
  useCasesCount: number;
  deliverablesCount: number;
  risk: "Low" | "Medium" | "High" | null;
}) {
  const fullText = useMemo(() => handoff ? serializeHandoff(handoff) : "", [handoff]);

  return (
    <Section
      id="handoff"
      eyebrow="06 — Handoff"
      title="30-day implementation handoff packet"
      desc="Everything a nonprofit team needs to keep going after the engagement ends — workflow, training, prompts, privacy guardrails, metrics, and what to measure next."
      action={
        handoff ? (
          <CopyButton text={fullText} label="Copy full packet" />
        ) : (
          <button className="btn-primary inline-flex items-center gap-2 text-xs" onClick={onBuild}>
            Build handoff packet <PackageCheck className="h-3.5 w-3.5" />
          </button>
        )
      }
    >
      {!handoff ? (
        <EmptyState icon={PackageCheck} title="No handoff packet yet" desc="Generate a complete packet: recommended workflow, training checklist, prompt library, privacy checklist, roadmap, metrics, and risks." />
      ) : (
        <>
          <MetricsRow useCasesCount={useCasesCount} deliverablesCount={deliverablesCount} risk={risk} />

          <div className="mt-6 grid lg:grid-cols-3 gap-5">
            <HandoffCard title="Recommended AI workflow" icon={Workflow}>
              <p className="text-sm text-muted-foreground leading-relaxed">{handoff.workflow}</p>
            </HandoffCard>

            <HandoffCard title="Staff training checklist" icon={ListChecks}>
              <ul className="space-y-1.5 text-sm">
                {handoff.trainingChecklist.map((t, i) => (
                  <li key={i} className="flex gap-2"><Check className="h-3.5 w-3.5 mt-0.5 text-impact shrink-0" /><span>{t}</span></li>
                ))}
              </ul>
            </HandoffCard>

            <HandoffCard title="Privacy checklist" icon={ShieldCheck}>
              <ul className="space-y-1.5 text-sm">
                {handoff.privacyChecklist.map((t, i) => (
                  <li key={i} className="flex gap-2"><ShieldCheck className="h-3.5 w-3.5 mt-0.5 text-impact shrink-0" /><span>{t}</span></li>
                ))}
              </ul>
            </HandoffCard>

            <HandoffCard title="Prompt library" icon={BookOpen} className="lg:col-span-2">
              <div className="space-y-3">
                {handoff.promptLibrary.map((p, i) => (
                  <div key={i} className="rounded-xl border border-border bg-background/40 p-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-medium">{p.title}</div>
                      <CopyButton text={p.prompt} small />
                    </div>
                    <pre className="mt-2 font-mono text-[11.5px] text-muted-foreground whitespace-pre-wrap leading-relaxed">{p.prompt}</pre>
                  </div>
                ))}
              </div>
            </HandoffCard>

            <HandoffCard title="Implementation roadmap" icon={Workflow}>
              <ol className="space-y-1.5 text-sm">
                {handoff.roadmap.map((r, i) => (
                  <li key={i} className="flex gap-2"><span className="font-mono text-[11px] text-muted-foreground w-4">{i + 1}.</span><span>{r}</span></li>
                ))}
              </ol>
            </HandoffCard>

            <HandoffCard title="Success metrics">
              <ul className="space-y-1.5 text-sm">
                {handoff.metrics.map((m, i) => (
                  <li key={i} className="flex gap-2"><Gauge className="h-3.5 w-3.5 mt-0.5 text-intel shrink-0" /><span>{m}</span></li>
                ))}
              </ul>
            </HandoffCard>

            <HandoffCard title="Risks & mitigations" icon={ShieldAlert} className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-3">
                {handoff.risks.map((r, i) => (
                  <div key={i} className="rounded-xl border border-border bg-background/40 p-3.5">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-risk">Risk</div>
                    <div className="text-sm mt-0.5">{r.risk}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-impact">Mitigation</div>
                    <div className="text-sm mt-0.5 text-muted-foreground">{r.mitigation}</div>
                  </div>
                ))}
              </div>
            </HandoffCard>

            <HandoffCard title="What to measure after 30 days">
              <ul className="space-y-1.5 text-sm">
                {handoff.measure30.map((m, i) => (
                  <li key={i} className="flex gap-2"><Check className="h-3.5 w-3.5 mt-0.5 text-impact shrink-0" /><span>{m}</span></li>
                ))}
              </ul>
            </HandoffCard>

            <HandoffCard title="Next recommended workflows" icon={ArrowRight} className="lg:col-span-2">
              <div className="grid sm:grid-cols-3 gap-3">
                {handoff.nextWorkflows.map((w, i) => (
                  <div key={i} className="rounded-xl border border-border bg-background/40 p-3.5">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Next · 0{i + 2}</div>
                    <div className="text-sm mt-1">{w}</div>
                  </div>
                ))}
              </div>
            </HandoffCard>
          </div>

          <div className="mt-8 panel-strong p-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg chip-mission grid place-items-center"><PackageCheck className="h-5 w-5" /></div>
              <div>
                <div className="text-sm font-medium">Handoff packet · v1</div>
                <div className="text-xs text-muted-foreground">Ready to share with staff. Mock-data demo — no real client data.</div>
              </div>
            </div>
            <CopyButton text={fullText} label="Copy full packet" />
          </div>
        </>
      )}
    </Section>
  );
}

function HandoffCard({ title, icon: Icon, children, className = "" }: { title: string; icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode; className?: string }) {
  return (
    <div className={`panel-strong p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="h-4 w-4 text-mission" />}
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function MetricsRow({ useCasesCount, deliverablesCount, risk }: { useCasesCount: number; deliverablesCount: number; risk: "Low" | "Medium" | "High" | null }) {
  const hoursSaved = useCasesCount * 6 + deliverablesCount * 3;
  const readiness = Math.min(100, 30 + useCasesCount * 5 + deliverablesCount * 7 + (risk === "Low" ? 20 : risk === "Medium" ? 10 : 0));
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
      <Metric label="Use cases generated" value={String(useCasesCount)} tint="intel" />
      <Metric label="Est. hours saved / month" value={`~${hoursSaved}`} tint="impact" />
      <Metric label="Privacy risk level" value={risk ?? "—"} tint={risk === "High" ? "risk" : risk === "Medium" ? "warn" : "impact"} />
      <Metric label="Deliverables generated" value={String(deliverablesCount)} tint="mission" />
      <Metric label="Implementation readiness" value={`${readiness}%`} tint="mission" bar={readiness} />
    </div>
  );
}

function Metric({ label, value, tint, bar }: { label: string; value: string; tint: string; bar?: number }) {
  return (
    <div className="panel-strong p-4">
      <div className={`text-[10px] uppercase tracking-[0.14em] text-${tint}`}>{label}</div>
      <div className="font-display text-3xl mt-1 tracking-tight">{value}</div>
      {bar !== undefined && (
        <div className="mt-2 h-1 rounded-full bg-border overflow-hidden">
          <div className="h-full" style={{ width: `${bar}%`, background: "var(--gradient-mission)" }} />
        </div>
      )}
    </div>
  );
}

function serializeHandoff(h: HandoffPacket): string {
  const lines: string[] = [];
  lines.push("MISSIONBRIDGE AI — 30-DAY IMPLEMENTATION HANDOFF PACKET", "");
  lines.push("RECOMMENDED AI WORKFLOW", h.workflow, "");
  lines.push("STAFF TRAINING CHECKLIST", ...h.trainingChecklist.map(x => "  • " + x), "");
  lines.push("PROMPT LIBRARY");
  h.promptLibrary.forEach(p => lines.push(`  [${p.title}]`, "  " + p.prompt, ""));
  lines.push("PRIVACY CHECKLIST", ...h.privacyChecklist.map(x => "  • " + x), "");
  lines.push("IMPLEMENTATION ROADMAP", ...h.roadmap.map((x, i) => `  ${i + 1}. ${x}`), "");
  lines.push("SUCCESS METRICS", ...h.metrics.map(x => "  • " + x), "");
  lines.push("RISKS & MITIGATIONS", ...h.risks.map(r => `  - Risk: ${r.risk}\n    Mitigation: ${r.mitigation}`), "");
  lines.push("WHAT TO MEASURE AFTER 30 DAYS", ...h.measure30.map(x => "  • " + x), "");
  lines.push("NEXT RECOMMENDED WORKFLOWS", ...h.nextWorkflows.map(x => "  • " + x));
  return lines.join("\n");
}

/* ───────────── PRIMITIVES ───────────── */

function Section({
  id, eyebrow, title, desc, action, children,
}: {
  id: string; eyebrow: string; title: string; desc: string; action?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section id={`screenshot-${id}`} className="relative scroll-mt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 mb-10">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.18em] text-mission font-mono">{eyebrow}</div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05]">{title}</h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">{desc}</p>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}

function EmptyState({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="panel-strong p-12 text-center">
      <div className="mx-auto h-12 w-12 rounded-xl chip-mission grid place-items-center">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">{desc}</p>
    </div>
  );
}

function CopyButton({ text, label = "Copy", small, variant }: { text: string; label?: string; small?: boolean; variant?: "dark" }) {
  const [copied, setCopied] = useState(false);
  const doCopy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const base = small ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs";
  const styles = variant === "dark"
    ? "bg-ivory-foreground/10 hover:bg-ivory-foreground/15 text-ivory-foreground border border-ivory-foreground/15"
    : "bg-background/60 hover:bg-background border border-border-strong text-foreground";
  return (
    <button onClick={doCopy} className={`inline-flex items-center gap-1.5 rounded-md transition ${base} ${styles}`}>
      {copied ? <Check className="h-3 w-3 text-impact" /> : <Copy className="h-3 w-3" />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

function Footer() {
  return (
    <footer id="screenshot-mobile" className="border-t border-border mt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 grid sm:grid-cols-[1.5fr_1fr_1fr] gap-8">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            An AI implementation copilot for nonprofits, civic organizations, schools, community programs, veterans
            organizations, food access groups, and housing nonprofits.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip chip-warn">Mock-data demo</span>
            <span className="chip">No external AI calls</span>
            <span className="chip">No real client data</span>
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Workflow</div>
          <ul className="mt-3 space-y-1.5 text-sm">
            {STEPS.map(s => (
              <li key={s.id}><button onClick={() => scrollTo(s.id)} className="text-muted-foreground hover:text-foreground transition">{s.label}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">About</div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            MissionBridge AI is a portfolio demo. Sample organizations and data are synthetic. Not affiliated with any
            grantmaker, funder, or AI provider.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex items-center justify-between gap-4 text-[11px] text-muted-foreground">
          <div>© MissionBridge AI · Demo build</div>
          <div className="font-mono">v1.0 · mock-data</div>
        </div>
      </div>
    </footer>
  );
}
