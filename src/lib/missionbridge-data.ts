export type RiskLevel = "Low" | "Medium" | "High";

export interface Nonprofit {
  id: string;
  name: string;
  type: string;
  mission: string;
  population: string;
  programNotes: string;
  painPoints: string;
  staffCapacity: string;
  availableData: string;
  grantOpportunity: string;
  outcomeMetrics: string;
  constraints: string;
}

export const SAMPLE_NONPROFITS: Nonprofit[] = [
  {
    id: "cvyr",
    name: "Central Valley Youth Robotics",
    type: "Youth STEM nonprofit",
    mission:
      "Expand access to applied STEM and robotics for underserved middle-school students across California's Central Valley.",
    population:
      "Approximately 320 students annually, grades 6–8, predominantly first-generation and Title I schools.",
    programNotes:
      "After-school robotics clubs at 7 partner schools. Saturday build days. Annual regional showcase. Mentors are volunteer engineers and high-school alumni.",
    painPoints:
      "Grant writing takes 30+ hours per proposal. Volunteer onboarding is inconsistent. Impact reporting to funders is done by one part-time staffer in spreadsheets.",
    staffCapacity:
      "2 full-time, 1 part-time program coordinator, 40 active volunteers.",
    availableData:
      "Attendance logs, pre/post skill assessments, parent surveys, volunteer hours, regional competition results.",
    grantOpportunity:
      "Regional foundation STEM equity grant, $85,000 over 18 months, due in 6 weeks.",
    outcomeMetrics:
      "82% retention term-over-term, 71% report increased STEM confidence, 58% advance to high-school robotics.",
    constraints:
      "Limited budget for tools. No dedicated dev or data staff. Must keep student PII off any third-party platform.",
  },
  {
    id: "fvhn",
    name: "Fresno Veterans Housing Network",
    type: "Housing & veteran services",
    mission:
      "Prevent and end veteran homelessness through housing navigation, benefits support, and workforce placement.",
    population:
      "Approximately 540 veterans served annually, including 90+ in rapid rehousing.",
    programNotes:
      "Walk-in navigation center, benefits coaching, landlord partnerships, peer support groups, employer pipeline with 14 local employers.",
    painPoints:
      "Case notes pile up. Donor updates are inconsistent. Board reporting is reactive. Staff burnout from documentation load.",
    staffCapacity:
      "9 full-time case managers, 2 supervisors, 1 development lead.",
    availableData:
      "HMIS exports (sanitized), housing placement counts, benefits enrollment counts, employer placement counts.",
    grantOpportunity:
      "Continuum of Care renewal narrative due in 8 weeks; private foundation veteran workforce grant $120k.",
    outcomeMetrics:
      "73% housed within 60 days, 61% retained housing at 12 months, 44% in stable employment at 6 months.",
    constraints:
      "VA-adjacent data sensitivity. No PHI may leave internal systems. Must respect veteran consent and case-note confidentiality.",
  },
  {
    id: "cfac",
    name: "Community Food Access Coalition",
    type: "Food security & nutrition",
    mission:
      "Close the rural nutrition gap through mobile pantry routes and community nutrition referrals.",
    population:
      "Approximately 4,200 households per month across 11 rural ZIP codes.",
    programNotes:
      "3 mobile pantry trucks on weekly routes. Partnerships with 6 clinics for nutrition referrals. SNAP enrollment assistance.",
    painPoints:
      "Volunteer scheduling is manual. Inventory forecasting is guesswork. Monthly funder updates take a full week.",
    staffCapacity:
      "4 full-time, 1 logistics lead, 120 rotating volunteers.",
    availableData:
      "Distribution logs by route, household counts (de-identified), referral conversion, partner clinic feedback.",
    grantOpportunity:
      "USDA-aligned regional foundation grant $200k for mobile route expansion.",
    outcomeMetrics:
      "Households served +28% YoY. 64% of referred households complete a nutrition visit.",
    constraints:
      "Households are de-identified. Do not store names or addresses outside the case management system.",
  },
  {
    id: "rhnp",
    name: "Rural Health Navigation Project",
    type: "Health navigation",
    mission:
      "Reduce rural health access gaps through a multilingual navigation hotline and patient transportation support.",
    population:
      "Approximately 2,800 callers annually across 9 rural counties.",
    programNotes:
      "Bilingual hotline (English/Spanish), ride coordination with 3 transit partners, follow-up wellness checks.",
    painPoints:
      "Call summarization is inconsistent across navigators. SOP for new hires lives in a binder. Outcome storytelling is anecdotal.",
    staffCapacity:
      "6 navigators, 1 clinical advisor, 1 director.",
    availableData:
      "Call logs (no PHI), ride counts, language preferences, county-level outcome surveys.",
    grantOpportunity:
      "State rural health innovation fund, $150k over 24 months.",
    outcomeMetrics:
      "91% of callers receive a referral within 48 hours. 67% report a completed appointment.",
    constraints:
      "Strict no-PHI rule. No diagnoses, medications, or identifying details in any AI workflow.",
  },
  {
    id: "asm",
    name: "After-School STEM Mentors",
    type: "Youth mentorship",
    mission:
      "Connect high-school students with project-based STEM mentors to expand college and career pathways.",
    population:
      "Approximately 180 high-school students annually across 4 partner schools.",
    programNotes:
      "Weekly mentor pods, capstone showcase, college essay support, paid summer internships with 8 partners.",
    painPoints:
      "Mentor matching is slow. Recruitment messaging is generic. Board wants clearer ROI storytelling.",
    staffCapacity:
      "3 full-time, 1 development lead, 60 active mentors.",
    availableData:
      "Mentor/mentee match history, attendance, capstone outcomes, internship placements, college enrollment follow-ups.",
    grantOpportunity:
      "Workforce-pathway grant $95k for internship expansion.",
    outcomeMetrics:
      "88% of seniors enroll in postsecondary, 41% in STEM majors, 92% mentor retention.",
    constraints:
      "Student data is FERPA-adjacent. Do not include names or schools in any AI prompt.",
  },
];

// Privacy scan rules
const PII_PATTERNS: { label: string; tone: RiskLevel; test: RegExp }[] = [
  { label: "Email addresses", tone: "High", test: /[\w.+-]+@[\w-]+\.[\w.-]+/g },
  { label: "Phone numbers", tone: "High", test: /(\+?\d[\s.-]?){2,4}\d{3}[\s.-]?\d{4}/g },
  { label: "Street addresses", tone: "High", test: /\b\d{1,5}\s+[A-Z][a-zA-Z]+\s+(St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Ln|Lane|Dr|Drive|Way|Ct|Court)\b/g },
  { label: "Social Security numbers", tone: "High", test: /\b\d{3}-\d{2}-\d{4}\b/g },
  { label: "Dates of birth", tone: "Medium", test: /\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12]\d|3[01])[\/\-](19|20)\d{2}\b/g },
];

const KEYWORD_CATEGORIES: { label: string; tone: RiskLevel; words: string[] }[] = [
  { label: "Health / medical details", tone: "High", words: ["diagnosis", "medication", "prescription", "HIV", "mental health", "PTSD", "depression", "anxiety disorder", "treatment"] },
  { label: "Minor / student identifiers", tone: "High", words: ["student name", "minor", "grade", "school id", "parent name", "guardian"] },
  { label: "Veteran / benefits data", tone: "High", words: ["DD-214", "VA claim", "service-connected", "disability rating", "benefits id"] },
  { label: "Legal / immigration status", tone: "High", words: ["undocumented", "immigration", "asylum", "deportation", "case number", "court date"] },
  { label: "Case notes (narrative)", tone: "Medium", words: ["case note", "client said", "client reported", "intake summary"] },
  { label: "Financial details", tone: "Medium", words: ["bank account", "routing number", "ssn", "income amount", "credit score"] },
  { label: "Personal names", tone: "Medium", words: [] }, // detected separately
];

export interface ScanResult {
  risk: RiskLevel;
  categories: { label: string; tone: RiskLevel; count: number; samples: string[] }[];
  sanitized: string;
  checklist: string[];
  placeholders: { from: string; to: string }[];
  humanReviewRequired: boolean;
}

export function scanContext(text: string): ScanResult {
  const categories: ScanResult["categories"] = [];
  const placeholders: ScanResult["placeholders"] = [];
  let sanitized = text;
  let maxRisk: RiskLevel = "Low";

  const bumpRisk = (r: RiskLevel) => {
    if (r === "High") maxRisk = "High";
    else if (r === "Medium" && maxRisk !== "High") maxRisk = "Medium";
  };

  for (const p of PII_PATTERNS) {
    const matches = [...text.matchAll(p.test)].map(m => m[0]);
    if (matches.length) {
      bumpRisk(p.tone);
      const replacement = `[${p.label.split(" ")[0].toUpperCase()}_REDACTED]`;
      categories.push({ label: p.label, tone: p.tone, count: matches.length, samples: Array.from(new Set(matches)).slice(0, 2).map(maskSample) });
      placeholders.push({ from: matches[0], to: replacement });
      sanitized = sanitized.replace(p.test, replacement);
    }
  }

  for (const c of KEYWORD_CATEGORIES) {
    if (!c.words.length) continue;
    const found = c.words.filter(w => new RegExp(`\\b${escapeRegex(w)}\\b`, "i").test(text));
    if (found.length) {
      bumpRisk(c.tone);
      categories.push({ label: c.label, tone: c.tone, count: found.length, samples: found.slice(0, 3) });
    }
  }

  // Personal name heuristic: two capitalized words in a row (excluding org/sentence starts roughly)
  const nameMatches = [...text.matchAll(/\b([A-Z][a-z]{2,})\s+([A-Z][a-z]{2,})\b/g)]
    .map(m => m[0])
    .filter(n => !COMMON_BIGRAMS.has(n));
  if (nameMatches.length >= 2) {
    bumpRisk("Medium");
    categories.push({
      label: "Possible personal names",
      tone: "Medium",
      count: nameMatches.length,
      samples: Array.from(new Set(nameMatches)).slice(0, 3).map(maskName),
    });
  }

  const checklist = [
    "Remove all client, patient, student, and veteran names before pasting context.",
    "Replace street addresses with city or region only.",
    "Strip phone numbers, emails, and case IDs.",
    "Aggregate health, legal, and benefits data — never individual records.",
    "Do not paste protected health information, student records, legal case notes, or financial account details.",
    "Confirm a human reviewer signs off before any AI output is shared externally.",
    "Heuristic scan only — may not catch every sensitive field. Not a compliance audit.",
  ];

  return {
    risk: maxRisk,
    categories,
    sanitized,
    checklist,
    placeholders,
    humanReviewRequired: maxRisk !== "Low",
  };
}

function escapeRegex(s: string) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function maskSample(s: string) { return s.length <= 4 ? "•".repeat(s.length) : s.slice(0, 2) + "•".repeat(Math.max(2, s.length - 4)) + s.slice(-2); }
function maskName(s: string) { return s.split(" ").map(w => w[0] + "•".repeat(w.length - 1)).join(" "); }
const COMMON_BIGRAMS = new Set([
  "Central Valley", "Fresno Veterans", "Community Food", "Rural Health", "After School",
  "United States", "New York", "Los Angeles", "San Francisco",
]);

// Use cases generator
export interface UseCase {
  title: string;
  problem: string;
  users: string;
  inputs: string;
  output: string;
  risk: RiskLevel;
  checkpoint: string;
  timeSaved: string;
  difficulty: "Low" | "Medium" | "High";
  firstStep: string;
  tag: string;
}

export function generateUseCases(n: Nonprofit | null): UseCase[] {
  const base: UseCase[] = [
    {
      title: "Grant Narrative Drafting Assistant",
      problem: "Grant proposals consume 30+ staff hours per submission and stall on the blank page.",
      users: "Development lead, executive director",
      inputs: "Sanitized program summary, outcome metrics, funder priorities",
      output: "Structured first-draft narrative with problem, program, outcomes, evaluation",
      risk: "Medium",
      checkpoint: "Development lead reviews every draft before submission",
      timeSaved: "~18 hours per proposal",
      difficulty: "Low",
      firstStep: "Start with one foundation grant and a prompt library tuned to the funder.",
      tag: "Fundraising",
    },
    {
      title: "Donor Update Composer",
      problem: "Monthly donor communications slip when staff are stretched thin.",
      users: "Development team, communications staff",
      inputs: "Recent milestones, anonymized impact numbers, upcoming asks",
      output: "Warm, on-brand donor update ready for review",
      risk: "Low",
      checkpoint: "Communications lead approves voice and accuracy",
      timeSaved: "~6 hours per month",
      difficulty: "Low",
      firstStep: "Define a voice-and-tone guide and pin it to every prompt.",
      tag: "Communications",
    },
    {
      title: "Volunteer Onboarding Co-Pilot",
      problem: "Inconsistent volunteer onboarding creates uneven program quality.",
      users: "Volunteer coordinator",
      inputs: "Role description, SOP excerpts, FAQ history",
      output: "Personalized onboarding plan and Q&A explainer",
      risk: "Low",
      checkpoint: "Coordinator reviews before sending to new volunteers",
      timeSaved: "~4 hours per cohort",
      difficulty: "Low",
      firstStep: "Centralize SOPs into a single source of truth document.",
      tag: "Operations",
    },
    {
      title: "Impact Report Builder",
      problem: "Annual and quarterly reports are assembled by hand from scattered spreadsheets.",
      users: "Program director, development lead",
      inputs: "Aggregated outcome metrics, narrative highlights, methodology notes",
      output: "Sectioned impact report with executive summary and outcome narrative",
      risk: "Medium",
      checkpoint: "Program director verifies all numbers against source data",
      timeSaved: "~22 hours per report",
      difficulty: "Medium",
      firstStep: "Stand up a clean metrics sheet before any AI workflow.",
      tag: "Impact",
    },
    {
      title: "Staff SOP Generator",
      problem: "Tribal knowledge lives in long-tenured staff and never gets written down.",
      users: "Program managers",
      inputs: "Interview notes, current workflow walk-through",
      output: "Structured SOP with steps, owners, and decision points",
      risk: "Low",
      checkpoint: "Senior staff signs off; SOPs are versioned",
      timeSaved: "~5 hours per SOP",
      difficulty: "Low",
      firstStep: "Pick one repeatable workflow and document it end-to-end.",
      tag: "Operations",
    },
    {
      title: "Program Intake Triage Helper",
      problem: "Intake forms create a backlog when one navigator is out.",
      users: "Intake navigators",
      inputs: "Structured intake fields only — never free-text client narratives",
      output: "Suggested next-best-action checklist for human review",
      risk: "High",
      checkpoint: "Human navigator must approve every recommendation",
      timeSaved: "~3 minutes per intake",
      difficulty: "Medium",
      firstStep: "Define what fields are allowed in the prompt and lock the rest out.",
      tag: "Programs",
    },
    {
      title: "Case Note Summarizer (Guardrailed)",
      problem: "Case notes accumulate faster than supervisors can review.",
      users: "Supervisors, program directors",
      inputs: "De-identified note excerpts with named-entity removal",
      output: "Themed summary of trends, never individual client stories",
      risk: "High",
      checkpoint: "PII scrubber runs first; supervisor reviews summary",
      timeSaved: "~6 hours per week",
      difficulty: "High",
      firstStep: "Stand up a privacy-scan step before any summarization runs.",
      tag: "Programs",
    },
    {
      title: "Board Brief Generator",
      problem: "Board prep eats a full day every month for the executive director.",
      users: "Executive director, chief of staff",
      inputs: "Operational status, key risks, decision asks",
      output: "One-page board brief with status, risks, and asks",
      risk: "Low",
      checkpoint: "ED reviews before circulation",
      timeSaved: "~5 hours per month",
      difficulty: "Low",
      firstStep: "Standardize the brief template first.",
      tag: "Governance",
    },
    {
      title: "Community Outreach Message Builder",
      problem: "Outreach messaging is generic and doesn't resonate with each community.",
      users: "Outreach team",
      inputs: "Audience profile, program offer, channel constraints",
      output: "Channel-ready messages tuned by audience and language",
      risk: "Low",
      checkpoint: "Outreach lead reviews tone and accuracy",
      timeSaved: "~3 hours per campaign",
      difficulty: "Low",
      firstStep: "Define 2–3 audience archetypes before generating copy.",
      tag: "Communications",
    },
  ];

  if (!n) return base.slice(0, 6);
  // Reorder based on org type
  const priority: Record<string, string[]> = {
    cvyr: ["Grant Narrative Drafting Assistant", "Volunteer Onboarding Co-Pilot", "Impact Report Builder", "Donor Update Composer"],
    fvhn: ["Case Note Summarizer (Guardrailed)", "Grant Narrative Drafting Assistant", "Donor Update Composer", "Board Brief Generator"],
    cfac: ["Impact Report Builder", "Grant Narrative Drafting Assistant", "Community Outreach Message Builder", "Staff SOP Generator"],
    rhnp: ["Staff SOP Generator", "Program Intake Triage Helper", "Impact Report Builder", "Board Brief Generator"],
    asm: ["Community Outreach Message Builder", "Donor Update Composer", "Impact Report Builder", "Volunteer Onboarding Co-Pilot"],
  };
  const ordered = priority[n.id] || [];
  return [
    ...ordered.map(t => base.find(b => b.title === t)!).filter(Boolean),
    ...base.filter(b => !ordered.includes(b.title)),
  ];
}

// Deliverable generators
export interface Deliverable {
  id: string;
  title: string;
  type: "Grant" | "Impact" | "Board" | "Donor" | "Volunteer" | "SOP";
  blurb: string;
  body: string;
  status: "Draft — Needs Review" | "Ready for Review";
}

export function generateDeliverables(n: Nonprofit): Deliverable[] {
  return [
    {
      id: "grant",
      title: "Grant Narrative Draft",
      type: "Grant",
      blurb: `Foundation narrative aligned to: ${n.grantOpportunity}`,
      status: "Draft — Needs Review",
      body: `PROBLEM STATEMENT
${n.population} faces structural gaps in access and opportunity. ${n.mission} addresses these gaps where they hit hardest — in the day-to-day reality of the communities we serve.

PROGRAM DESCRIPTION
${n.name} operates ${n.programNotes.toLowerCase()} Our model is intentionally local, relationship-driven, and measured.

TARGET POPULATION
${n.population}

OUTCOMES TO DATE
${n.outcomeMetrics}

FUNDING NEED
We are requesting support tied to: ${n.grantOpportunity}. Funds will be deployed against staffing capacity, program delivery, and the measurement infrastructure required to maintain rigor as we scale.

EVALUATION PLAN
We will continue tracking the outcomes already in place (${truncate(n.outcomeMetrics, 120)}) and add a quarterly review cycle that compares cohort outcomes against baseline and reports findings to funders within 30 days of each quarter close.

— Draft generated by MissionBridge AI. Requires staff review, accurate funder framing, and final numbers verified against source data before submission.`,
    },
    {
      id: "impact",
      title: "Impact Report",
      type: "Impact",
      blurb: "Quarterly impact report for board and funders.",
      status: "Draft — Needs Review",
      body: `EXECUTIVE SUMMARY
${n.name} continued to deliver against its mission this quarter: ${n.mission} The program reached ${n.population.toLowerCase()} with consistent quality across all sites.

KEY METRICS
${n.outcomeMetrics}

OUTCOME NARRATIVE
Our model centers ${shortMission(n.mission)}. The metrics above reflect both reach and depth — we are not only serving more people, we are serving them through to outcomes that matter.

COMMUNITY IMPACT
The communities we serve report increased trust and follow-through with partner services. Staff capacity (${n.staffCapacity.toLowerCase()}) continues to be the binding constraint on growth.

NEXT STEPS
1. Close the funding round tied to ${n.grantOpportunity}.
2. Stand up a privacy-aware AI workflow to reduce documentation load.
3. Re-baseline outcome metrics ahead of the next reporting cycle.`,
    },
    {
      id: "board",
      title: "Board Brief",
      type: "Board",
      blurb: "One-page board update for the next governance meeting.",
      status: "Ready for Review",
      body: `CURRENT STATUS
${n.name} is on plan against this quarter's program goals. Headline metric: ${firstSentence(n.outcomeMetrics)}.

OPERATIONAL RISKS
- Staff capacity: ${n.staffCapacity}. Capacity is the binding constraint.
- Documentation load on program staff continues to grow.
- Funding concentration risk tied to: ${n.grantOpportunity}.

FUNDING NEEDS
We are actively pursuing ${n.grantOpportunity}. Diversification is a priority for the next two quarters.

DECISION POINTS FOR THE BOARD
1. Approve the responsible AI pilot scope outlined in the 30-day implementation plan.
2. Endorse the privacy guardrails: no client PII, human review on every output.
3. Authorize a focused capacity investment tied to the highest-leverage AI workflow.`,
    },
    {
      id: "donor",
      title: "Donor Update",
      type: "Donor",
      blurb: "Warm, impact-focused note for the donor list.",
      status: "Ready for Review",
      body: `Dear friend of ${n.name},

This season, your support reached ${shortPopulation(n.population)}. Because of you, ${shortMission(n.mission).toLowerCase()}

Here is what your generosity made possible:
• ${firstSentence(n.outcomeMetrics)}
• Continued, on-the-ground program delivery: ${truncate(n.programNotes, 140)}
• A team that keeps showing up — ${n.staffCapacity.toLowerCase()}

We have one ask this quarter: help us close the gap tied to ${n.grantOpportunity}. Every contribution strengthens the work and protects the people we serve.

With gratitude,
The team at ${n.name}`,
    },
    {
      id: "volunteer",
      title: "Volunteer Recruitment Post",
      type: "Volunteer",
      blurb: "Short, channel-ready volunteer call.",
      status: "Ready for Review",
      body: `${n.name} is looking for volunteers who want to put their skills to work for ${shortPopulation(n.population)}.

What you'll do: support our team across ${truncate(n.programNotes, 120)}

Why it matters: ${shortMission(n.mission)}

Time commitment: flexible, with onboarding provided. No prior experience required — just consistency and care.

Apply or learn more by visiting our volunteer page.`,
    },
    {
      id: "sop",
      title: "Staff SOP — Responsible AI Use",
      type: "SOP",
      blurb: "Operating procedure for any AI-assisted workflow.",
      status: "Ready for Review",
      body: `PURPOSE
Standardize how ${n.name} staff use AI assistants for drafting, summarizing, and planning — without compromising the people we serve.

ALLOWED USE
- Drafting narratives, updates, SOPs, and outreach copy
- Summarizing aggregated, de-identified program data
- Generating internal templates and checklists

NEVER ALLOWED
- Pasting client, patient, student, or veteran names or identifiers
- Pasting case notes, intake narratives, or any individual record
- Using AI output as a final product without human review

WORKFLOW
1. Sanitize context (remove names, addresses, IDs, dates of birth).
2. Run the privacy scan checklist.
3. Generate draft.
4. Human reviewer signs off.
5. File the final version in the system of record.

OWNERSHIP
Program directors own enforcement. Any incident is reported to the executive director within 24 hours.`,
    },
  ];
}

function truncate(s: string, n: number) { return s.length <= n ? s : s.slice(0, n - 1) + "…"; }
function firstSentence(s: string) { return s.split(/(?<=\.)\s/)[0] || s; }
function shortMission(s: string) { return s.replace(/\.$/, ""); }
function shortPopulation(s: string) { return s.replace(/^Approximately\s/i, "").replace(/\.$/, ""); }

// 30-day plan
export interface PlanWeek {
  week: number;
  title: string;
  objective: string;
  owner: string;
  tasks: string[];
  deliverable: string;
  successMetric: string;
  riskControl: string;
}

export function generatePlan(n: Nonprofit | null): PlanWeek[] {
  const org = n?.name || "your organization";
  return [
    {
      week: 1,
      title: "Discovery & Workflow Mapping",
      objective: `Map ${org}'s highest-leverage workflows and identify the safest first AI use case.`,
      owner: "Executive director + program director",
      tasks: [
        "Inventory recurring documentation and drafting workflows",
        "Score each workflow on time spent, risk, and reversibility",
        "Select one pilot workflow with low PII exposure",
        "Document the current process end-to-end",
      ],
      deliverable: "Pilot workflow brief with current-state diagram",
      successMetric: "One pilot workflow selected and signed off by ED",
      riskControl: "No production data touched. Discovery only.",
    },
    {
      week: 2,
      title: "Safe Pilot Workflow",
      objective: "Stand up the pilot with privacy guardrails and a human-in-the-loop checkpoint.",
      owner: "Program lead + designated AI champion",
      tasks: [
        "Build sanitized input templates",
        "Wire the privacy scan into the workflow",
        "Create a 5-prompt starter library",
        "Run 3 dry-runs with synthetic data",
      ],
      deliverable: "Working pilot with prompt library v1",
      successMetric: "3 successful dry-runs reviewed by a human",
      riskControl: "Privacy scan is a hard gate. No live client data.",
    },
    {
      week: 3,
      title: "Staff Training & Review Loop",
      objective: "Train the team on responsible use and stand up a weekly review loop.",
      owner: "Program director",
      tasks: [
        "Run a 60-minute training with the responsible-use SOP",
        "Pair each staffer with a buddy for the first 2 outputs",
        "Stand up a weekly 30-minute review of outputs",
        "Document edge cases and update the prompt library",
      ],
      deliverable: "Trained team + signed acknowledgments of the SOP",
      successMetric: "100% of in-scope staff trained and signed off",
      riskControl: "Mandatory human review before any external use.",
    },
    {
      week: 4,
      title: "Measurement & Handoff",
      objective: "Measure outcomes, capture lessons, and hand off to ongoing operations.",
      owner: "Executive director + AI champion",
      tasks: [
        "Measure hours saved against baseline",
        "Survey staff on confidence and friction",
        "Identify the next 2 candidate workflows",
        "Publish the 30-day handoff packet",
      ],
      deliverable: "Handoff packet + go/no-go on workflow #2",
      successMetric: "Documented hours saved and staff confidence delta",
      riskControl: "Quarterly review of the SOP and prompt library.",
    },
  ];
}

// Handoff packet
export interface HandoffPacket {
  workflow: string;
  trainingChecklist: string[];
  promptLibrary: { title: string; prompt: string }[];
  privacyChecklist: string[];
  roadmap: string[];
  metrics: string[];
  risks: { risk: string; mitigation: string }[];
  measure30: string[];
  nextWorkflows: string[];
}

export function generateHandoff(n: Nonprofit | null): HandoffPacket {
  const org = n?.name || "your organization";
  return {
    workflow: `${org} — Pilot: Grant narrative drafting with privacy-aware inputs and human review`,
    trainingChecklist: [
      "Read the responsible AI SOP end-to-end",
      "Complete the 60-minute hands-on training",
      "Pair with a buddy for your first 2 outputs",
      "Sign the responsible-use acknowledgment",
      "Subscribe to the weekly review session",
    ],
    promptLibrary: [
      { title: "Grant narrative — problem statement", prompt: "Using only the sanitized program summary below, draft a 200-word problem statement aligned to {{funder priorities}}. Do not invent metrics. Flag any missing data with [VERIFY]." },
      { title: "Donor update — monthly", prompt: "Write a warm 250-word donor update using the aggregated milestones below. Reference no individual clients. Keep tone professional, specific, and grateful." },
      { title: "Board brief — one page", prompt: "Produce a one-page board brief with sections: Current Status, Operational Risks, Funding Needs, Decision Points. Use only the inputs provided." },
      { title: "SOP draft", prompt: "From the workflow walkthrough below, draft an SOP with: Purpose, Steps, Owner, Decision Points, Review Cadence." },
      { title: "Volunteer onboarding", prompt: "Generate a 5-day onboarding plan for a new volunteer in the role described below. Reference the SOP and FAQ excerpts only." },
    ],
    privacyChecklist: [
      "No client, patient, student, or veteran names in any prompt",
      "No street addresses, phone numbers, emails, or government IDs",
      "No case notes or intake narratives",
      "No health, legal, or benefits records — aggregated only",
      "Run the privacy scan before every generation",
      "Human reviewer signs off before any external use",
    ],
    roadmap: [
      "Days 1–7: Discovery, scope, and pilot selection",
      "Days 8–14: Pilot workflow + prompt library v1",
      "Days 15–21: Team training, buddy pairing, weekly review",
      "Days 22–30: Measurement, handoff packet, next-workflow decision",
    ],
    metrics: [
      "Hours saved per workflow per week",
      "Number of outputs generated and reviewed",
      "Reviewer edit rate (low = high quality)",
      "Staff confidence score (pre vs post)",
      "Zero privacy incidents",
    ],
    risks: [
      { risk: "Sensitive data leaks into a prompt", mitigation: "Privacy scan as a hard gate; staff training; quarterly audit" },
      { risk: "Output quality drifts over time", mitigation: "Weekly review session; prompt library versioning" },
      { risk: "Over-reliance on AI without human review", mitigation: "Human review is required by SOP; reviewer sign-off logged" },
      { risk: "Funder skepticism about AI use", mitigation: "Transparent disclosure; methodology appendix in any AI-assisted deliverable" },
    ],
    measure30: [
      "Total hours saved against baseline",
      "Staff confidence delta",
      "Reviewer edit rate trend",
      "Backlog reduction on the targeted workflow",
      "Incidents: target zero",
    ],
    nextWorkflows: [
      "Impact report generation against aggregated metrics",
      "Volunteer onboarding co-pilot",
      "Board brief generator",
    ],
  };
}
