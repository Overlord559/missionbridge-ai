export type ContextMode = "sample" | "sanitized";

export interface LocalDraft {
  contextMode: ContextMode;
  activeNonprofitId: string | null;
  contextText: string;
}

const STORAGE_KEY = "missionbridge-draft-v1";

export function loadLocalDraft(): LocalDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LocalDraft;
    if (typeof parsed.contextText !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveLocalDraft(draft: LocalDraft): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Quota or private browsing — fail silently
  }
}

export function clearLocalDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export const TRUST_NOTE =
  "Use synthetic samples or sanitized real nonprofit context. MissionBridge runs locally in the browser and does not send data to external AI services. Do not paste sensitive client records, protected health information, student records, legal case notes, or personally identifiable information unless properly sanitized.";

export const REVIEW_NOTE =
  "Not a compliance tool. Human review required before using outputs in grants, donor communications, board materials, or operational decisions.";
