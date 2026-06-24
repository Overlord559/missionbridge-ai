import { chromium } from "playwright";
import { mkdirSync, statSync } from "fs";
import { join } from "path";

const outDir = "C:/dev/operator-brain/Edward.website/assets/missionbridge";
const baseUrls = [
  "http://127.0.0.1:4173/missionbridge-ai/",
  "http://localhost:5173/missionbridge-ai/",
];

const shots = [
  { id: "hero", file: "missionbridge-ai-01-hero.png" },
  { id: "intake", file: "missionbridge-ai-02-intake.png" },
  { id: "safety", file: "missionbridge-ai-03-safety.png" },
  { id: "use-cases", file: "missionbridge-ai-04-use-cases.png" },
  { id: "handoff", file: "missionbridge-ai-05-handoff.png" },
];

mkdirSync(outDir, { recursive: true });

async function captureSection(page, id, file) {
  const el = page.locator(`#screenshot-${id}`);
  await el.waitFor({ state: "visible", timeout: 15000 });
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await el.screenshot({ path: join(outDir, file) });
}

async function openApp(page) {
  let lastError;
  for (const url of baseUrls) {
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForSelector("#screenshot-hero", { timeout: 10000 });
      console.log("Using screenshot source URL:", url);
      return url;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error("Could not open MissionBridge preview URL");
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

const sourceUrl = await openApp(page);
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(800);

await captureSection(page, "hero", shots[0].file);

await page.getByRole("button", { name: /Load Sample Nonprofit/i }).first().click();
await page.waitForTimeout(900);
await captureSection(page, "intake", shots[1].file);

await page.getByRole("button", { name: /Analyze & run privacy scan/i }).click();
await page.waitForSelector("#screenshot-safety .chip", { timeout: 10000 });
await page.waitForTimeout(600);
await captureSection(page, "safety", shots[2].file);

await page.locator("#screenshot-safety").getByRole("button", { name: /Generate AI use cases/i }).click();
await page.waitForSelector("#screenshot-use-cases h3", { timeout: 10000 });
await page.waitForTimeout(700);
await captureSection(page, "use-cases", shots[3].file);

await page.locator("#screenshot-use-cases").getByRole("button", { name: /Generate deliverables/i }).click();
await page.waitForTimeout(700);
await page.locator("#screenshot-deliverables").getByRole("button", { name: /Build 30-day plan/i }).click();
await page.waitForTimeout(700);
await page.locator("#screenshot-plan").getByRole("button", { name: /Build handoff packet/i }).click();
await page.waitForSelector("#screenshot-handoff button", { hasText: /Copy packet/i, timeout: 10000 });
await page.waitForTimeout(700);
await captureSection(page, "handoff", shots[4].file);

await browser.close();

console.log("Screenshots saved to", outDir);
for (const shot of shots) {
  const path = join(outDir, shot.file);
  const { size } = statSync(path);
  console.log(`${shot.file} (${shot.id}) — ${(size / 1024).toFixed(1)} KB`);
}

console.log("Source URL:", sourceUrl);
