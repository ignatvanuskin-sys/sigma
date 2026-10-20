import { chromium } from "playwright-core";
import fs from "node:fs";

const BASE = "http://localhost:3100";
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

const results = {};

// double submit
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const popups = [];
  page.on("popup", (p) => popups.push(p));
  await page.goto(BASE + "/#zapis", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.locator('#zapis input[type="text"]').fill("Дана");
  await page.locator('#zapis input[type="tel"]').fill("7760009333");
  await page.locator("#zapis input[type=checkbox]").check();
  const btn = page.locator("#zapis button[type=submit]");
  await btn.click();
  await btn.click({ force: true, timeout: 2000 }).catch(() => {});
  await page.waitForTimeout(1200);
  results.doubleSubmit = {
    popups: popups.length,
    successShown: await page.locator(".form-success").count(),
    submitStillPresent: await page.locator("#zapis button[type=submit]").count(),
  };
  await ctx.close();
}

// screenshots at 320 / 390
for (const w of [320, 390]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 780 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `qa/edge-hero-${w}.png` });
  await page.goto(BASE + "/#zapis", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.evaluate(() => document.getElementById("zapis")?.scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `qa/edge-form-${w}.png` });
  results["overflow" + w] = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    inner: window.innerWidth,
  }));
  await ctx.close();
}

// no-js
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  const res = await page.evaluate(() => {
    const lead = document.querySelector("#podbor .lead");
    const faq = document.querySelector(".faq__list");
    return {
      leadVisible: lead ? getComputedStyle(lead).opacity : "missing",
      faqVisible: faq ? getComputedStyle(faq).opacity : "missing",
      h1: document.querySelector("h1")?.textContent?.slice(0, 40),
      formInputs: document.querySelectorAll("#zapis input").length,
    };
  });
  results.noJs = res;
  await ctx.close();
}

fs.writeFileSync("qa/edge-results.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
await browser.close();
