import { chromium } from "playwright-core";

const BASE = "http://localhost:3100";
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

for (const w of [320, 390, 768]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const m = await page.evaluate(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { w: Math.round(r.width), h: Math.round(r.height), font: cs.fontSize, lh: cs.lineHeight };
    };
    const small = [];
    document.querySelectorAll("a, button, input, select, label.chip").forEach((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      if (r.width > 0 && r.height > 0 && r.height < 44) {
        small.push({ tag: el.tagName, cls: String(el.className).slice(0, 40), h: Math.round(r.height), w: Math.round(r.width) });
      }
    });
    return {
      h1: pick("h1"),
      h2: pick(".h2"),
      body: pick("body"),
      heroCta: pick(".hero__cta .btn"),
      input: pick("#zapis input[type=text]"),
      select: pick("#zapis select"),
      submit: pick("#zapis button[type=submit]"),
      sticky: pick(".sticky-cta"),
      smallTargets: small.slice(0, 12),
      smallCount: small.length,
      headerH: Math.round(document.querySelector(".header")?.getBoundingClientRect().height || 0),
    };
  });
  console.log(w, JSON.stringify(m));
  await ctx.close();
}
await browser.close();
