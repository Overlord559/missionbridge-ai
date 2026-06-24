import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join } from "path";

const outDir = "C:/dev/operator-brain/Edward.website/assets/missionbridge";
const baseUrl = "http://127.0.0.1:4173/missionbridge-ai/";

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({
  path: join(outDir, "missionbridge-ai-hero.png"),
  fullPage: false,
});

await page.getByRole("button", { name: /Load Sample Nonprofit/i }).first().click();
await page.waitForTimeout(600);
await page.getByRole("button", { name: /Analyze & run privacy scan/i }).click();
await page.waitForTimeout(1200);
await page.locator("#screenshot-safety").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({
  path: join(outDir, "missionbridge-ai-preview.png"),
  fullPage: false,
});

await browser.close();
console.log("Screenshots saved to", outDir);
