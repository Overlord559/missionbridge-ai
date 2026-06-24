import type {
  Deliverable,
  HandoffPacket,
  Nonprofit,
  PlanWeek,
  ScanResult,
  UseCase,
} from "./missionbridge-data";

export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function printTextDocument(title: string, content: string): void {
  const w = window.open("", "_blank", "noopener,noreferrer");
  if (!w) return;
  const escaped = content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
body{font-family:system-ui,-apple-system,sans-serif;max-width:820px;margin:2rem auto;padding:0 1.25rem;line-height:1.55;color:#111}
pre{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:12px;line-height:1.6}
h1{font-size:1.2rem;margin:0 0 1rem;font-weight:600}
@media print{body{margin:0.75in}}
</style></head><body><h1>${title}</h1><pre>${escaped}</pre></body></html>`);
  w.document.close();
  w.focus();
  w.print();
}

export function serializeHandoff(h: HandoffPacket): string {
  const lines: string[] = [];
  lines.push("MISSIONBRIDGE AI — 30-DAY IMPLEMENTATION HANDOFF PACKET", "");
  lines.push("RECOMMENDED AI WORKFLOW", h.workflow, "");
  lines.push("STAFF TRAINING CHECKLIST", ...h.trainingChecklist.map((x) => "  • " + x), "");
  lines.push("PROMPT LIBRARY");
  h.promptLibrary.forEach((p) => lines.push(`  [${p.title}]`, "  " + p.prompt, ""));
  lines.push("PRIVACY CHECKLIST", ...h.privacyChecklist.map((x) => "  • " + x), "");
  lines.push("IMPLEMENTATION ROADMAP", ...h.roadmap.map((x, i) => `  ${i + 1}. ${x}`), "");
  lines.push("SUCCESS METRICS", ...h.metrics.map((x) => "  • " + x), "");
  lines.push("RISKS & MITIGATIONS", ...h.risks.map((r) => `  - Risk: ${r.risk}\n    Mitigation: ${r.mitigation}`), "");
  lines.push("WHAT TO MEASURE AFTER 30 DAYS", ...h.measure30.map((x) => "  • " + x), "");
  lines.push("NEXT RECOMMENDED WORKFLOWS", ...h.nextWorkflows.map((x) => "  • " + x));
  return lines.join("\n");
}

export function serializeImplementationBrief(args: {
  org: Nonprofit | null;
  contextText: string;
  scan: ScanResult | null;
  useCases: UseCase[] | null;
  deliverables: Deliverable[] | null;
  plan: PlanWeek[] | null;
  handoff: HandoffPacket | null;
}): string {
  const lines: string[] = [];
  const orgName = args.org?.name ?? "Organization (custom context)";

  lines.push("MISSIONBRIDGE AI — IMPLEMENTATION BRIEF", "");
  lines.push(`Organization: ${orgName}`, "");
  lines.push("DISCLAIMER", "Local-first worksheet. Not a compliance audit. Human review required before external use.", "");

  lines.push("=== CONTEXT (SANITIZED) ===", args.contextText.trim() || "(empty)", "");

  if (args.scan) {
    lines.push("=== PRIVACY SCAN ===", `Risk level: ${args.scan.risk}`, "");
    if (args.scan.categories.length) {
      lines.push("Detected categories:");
      args.scan.categories.forEach((c) => lines.push(`  • ${c.label} (${c.count})`));
      lines.push("");
    }
    lines.push("Sanitized context:", args.scan.sanitized, "");
    lines.push("Do-not-paste checklist:", ...args.scan.checklist.map((c) => "  • " + c), "");
  }

  if (args.useCases?.length) {
    lines.push("=== AI USE CASES ===");
    args.useCases.forEach((u, i) => {
      lines.push(`${i + 1}. ${u.title} [${u.risk} risk]`, `   Problem: ${u.problem}`, `   Checkpoint: ${u.checkpoint}`, "");
    });
  }

  if (args.deliverables?.length) {
    lines.push("=== DELIVERABLES ===");
    args.deliverables.forEach((d) => {
      lines.push(`--- ${d.title} (${d.type}) ---`, d.body, "");
    });
  }

  if (args.plan?.length) {
    lines.push("=== 30-DAY PLAN ===");
    args.plan.forEach((w) => {
      lines.push(`Week ${w.week}: ${w.title}`, `Objective: ${w.objective}`, `Owner: ${w.owner}`, "Tasks:", ...w.tasks.map((t) => "  • " + t), "");
    });
  }

  if (args.handoff) {
    lines.push("=== HANDOFF PACKET ===", serializeHandoff(args.handoff));
  }

  return lines.join("\n");
}
