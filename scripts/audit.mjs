import { chromium } from "playwright-core";
import fs from "node:fs";

const BASE = "http://localhost:3100";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const out = { pages: {}, viewports: [], links: [], form: {}, keyboard: {}, axe: {}, misc: {} };

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

function attach(page, bucket) {
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") bucket.push(m.type() + ": " + m.text().slice(0, 220));
  });
  page.on("pageerror", (e) => bucket.push("pageerror: " + String(e).slice(0, 220)));
  page.on("requestfailed", (r) => bucket.push("reqfailed: " + r.url().slice(0, 160) + " " + (r.failure()?.errorText ?? "")));
  page.on("response", (r) => {
    if (r.status() >= 400) bucket.push("http" + r.status() + ": " + r.url().slice(0, 160));
  });
}

// ---------- pages ----------
const routes = ["/", "/kategorii/b", "/kategorii/bc1", "/kategorii/c-d",
  "/branchi/saryarka-15", "/branchi/turkestan-8-2", "/branchi/sauran-1", "/branchi/satpaeva-13a",
  "/politika-konfidencialnosti", "/does-not-exist-12345"];

for (const route of routes) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const issues = [];
  attach(page, issues);
  let status = 0, title = "", h1 = 0, canonical = "", robots = "";
  try {
    const resp = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
    status = resp?.status() ?? 0;
    await page.waitForTimeout(600);
    title = await page.title();
    h1 = await page.locator("h1").count();
    canonical = await page.locator('link[rel="canonical"]').getAttribute("href").catch(() => null) ?? "";
    robots = await page.locator('meta[name="robots"]').getAttribute("content").catch(() => null) ?? "";
  } catch (e) {
    issues.push("nav: " + String(e).slice(0, 160));
  }
  out.pages[route] = { status, title, h1, canonical, robots, issues: [...new Set(issues)] };
  await ctx.close();
}

// ---------- viewports ----------
for (const w of [320, 360, 375, 390, 412, 430, 768, 1024, 1280, 1440, 1920]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 700 ? 780 : 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const res = await page.evaluate(() => {
    const vw = window.innerWidth;
    const doc = document.documentElement;
    const offenders = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.right > vw + 1 || r.left < -1) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed" || cs.visibility === "hidden" || cs.opacity === "0") return;
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && String(el.className).slice(0, 60)) || "",
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
      }
    });
    return { scrollWidth: doc.scrollWidth, vw, overflow: doc.scrollWidth > vw + 1, offenders: offenders.slice(0, 6) };
  });
  out.viewports.push({ w, ...res });
  await ctx.close();
}

// ---------- links ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  const uniq = [...new Set(hrefs)];
  for (const href of uniq) {
    let status = "skip";
    if (href.startsWith("/")) {
      const r = await page.request.get(BASE + href).catch(() => null);
      status = r ? r.status() : "err";
    }
    out.links.push({ href, status });
  }
  out.misc.anchors = uniq;
  await ctx.close();
}

// ---------- form ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const issues = [];
  attach(page, issues);
  await page.goto(BASE + "/#zapis", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const errCount = async () => page.locator(".field__error").count();
  const errs = async () => page.locator(".field__error").allTextContents();

  await page.locator("#zapis button[type=submit]").click();
  await page.waitForTimeout(200);
  out.form.empty = { errors: await errCount(), texts: await errs(), focused: await page.evaluate(() => document.activeElement?.tagName) };

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.locator('#zapis input[type="text"]').fill(" ");
  await page.locator('#zapis input[type="tel"]').fill("7760009333");
  await page.locator("#zapis input[type=checkbox]").check();
  await page.locator("#zapis button[type=submit]").click();
  await page.waitForTimeout(300);
  out.form.spaceName = { errors: await errCount(), texts: await errs() };

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const phone = page.locator('#zapis input[type="tel"]');
  await phone.fill("abc");
  const v1 = await phone.inputValue();
  await phone.fill("");
  await phone.fill("7760009333");
  const v2 = await phone.inputValue();
  await phone.fill("");
  await phone.fill("87760009333");
  const v3 = await phone.inputValue();
  await phone.fill("");
  await phone.fill("+7 700 000 00 00");
  const v4 = await phone.inputValue();
  out.form.phoneMask = { abc: v1, tenDigits: v2, eightPrefix: v3, pasted: v4 };

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.locator('#zapis input[type="text"]').fill("Тест");
  await page.locator('#zapis input[type="tel"]').fill("7760009333");
  await page.locator("#zapis input[type=checkbox]").check();
  const [popup] = await Promise.all([
    page.waitForEvent("popup", { timeout: 8000 }).catch(() => null),
    page.locator("#zapis button[type=submit]").click(),
  ]);
  await page.waitForTimeout(600);
  out.form.success = {
    visible: await page.locator(".form-success").count(),
    popupUrl: popup ? popup.url().slice(0, 240) : "no-popup",
    href: await page.locator('.form-success a[href*="wa.me"]').getAttribute("href").catch(() => null),
  };
  if (popup) await popup.close();

  const decoded = out.form.success.href ? decodeURIComponent(out.form.success.href.split("text=")[1] ?? "") : "";
  out.form.success.message = decoded;

  await page.locator(".form-success button").click();
  await page.waitForTimeout(300);
  out.form.afterEdit = {
    name: await page.locator('#zapis input[type="text"]').inputValue(),
    phone: await page.locator('#zapis input[type="tel"]').inputValue(),
    consent: await page.locator("#zapis input[type=checkbox]").isChecked(),
  };

  // XSS probe
  await page.locator('#zapis input[type="text"]').fill('<img src=x onerror=alert(1)>');
  await page.locator("#zapis button[type=submit]").click();
  await page.waitForTimeout(500);
  out.form.xss = {
    dialog: false,
    successVisible: await page.locator(".form-success").count(),
  };
  out.form.console = [...new Set(issues)].slice(0, 12);
  await ctx.close();
}

// ---------- finder presets ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/#podbor", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const pick = async (label) => page.locator(".opt", { hasText: label }).first().click();
  await pick("Категория B");
  await page.waitForTimeout(250);
  await pick("Офлайн");
  await page.waitForTimeout(250);
  await pick("Сарыарка");
  await page.waitForTimeout(300);
  out.misc.finderResult = (await page.locator(".finder__result").innerText().catch(() => "none")).slice(0, 300);
  await page.getByRole("button", { name: /^Записаться/ }).first().click();
  await page.waitForTimeout(700);
  out.misc.preset = {
    category: await page.locator("#zapis select[name=category]").inputValue().catch(() => "n/a"),
    branch: await page.locator("#zapis select[name=branch]").inputValue().catch(() => "n/a"),
    focused: await page.evaluate(() => document.activeElement && (document.activeElement.id || document.activeElement.tagName)),
  };
  await ctx.close();
}

// ---------- keyboard / menu / faq ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.locator('.burger').click();
  await page.waitForTimeout(300);
  const openState = await page.locator(".mobile-menu").evaluate((el) => getComputedStyle(el).visibility);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  out.keyboard.menu = {
    open: openState,
    closedAfterEsc: await page.locator(".mobile-menu").evaluate((el) => getComputedStyle(el).visibility),
    bodyOverflow: await page.evaluate(() => getComputedStyle(document.body).overflow),
  };
  await ctx.close();
}

{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const faqButtons = page.locator(".faq-item__btn");
  const n = await faqButtons.count();
  const states = [];
  for (let i = 0; i < n; i++) {
    await faqButtons.nth(i).click();
    await page.waitForTimeout(120);
    states.push(await faqButtons.nth(i).getAttribute("aria-expanded"));
  }
  for (let i = 0; i < n; i++) {
    await faqButtons.nth(i).click();
    await page.waitForTimeout(120);
  }
  const closed = await page.locator('.faq-item__btn[aria-expanded="true"]').count();
  out.keyboard.faq = { count: n, openedStates: states, stillOpenAfterSecondPass: closed };

  const tabs = [];
  await page.keyboard.press("Tab");
  for (let i = 0; i < 8; i++) {
    tabs.push(await page.evaluate(() => {
      const el = document.activeElement;
      return (el?.tagName || "") + ":" + ((el?.textContent || "").trim().slice(0, 30) || el?.getAttribute("href") || "");
    }));
    await page.keyboard.press("Tab");
  }
  out.keyboard.tabOrder = tabs;
  await ctx.close();
}

// ---------- axe ----------
for (const route of ["/", "/kategorii/b"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  try {
    await page.addScriptTag({ url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js" });
    const res = await page.evaluate(async () => {
      // @ts-ignore
      const r = await window.axe.run(document, { resultTypes: ["violations"] });
      return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, target: v.nodes[0]?.target?.join(" ") }));
    });
    out.axe[route] = res;
  } catch (e) {
    out.axe[route] = "NOT VERIFIED: " + String(e).slice(0, 120);
  }
  await ctx.close();
}

// ---------- misc ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/does-not-exist-12345", { waitUntil: "networkidle" });
  out.misc.notFound = {
    status: 404,
    heading: await page.locator("h1").innerText().catch(() => ""),
    homeLink: await page.locator('a[href="/"]').count(),
    stack: (await page.content()).includes("__NEXT_DATA__") ? "has next data" : "clean",
  };
  await ctx.close();
}

fs.writeFileSync("qa/audit-results.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify({ viewports: out.viewports.map((v) => [v.w, v.overflow, v.offenders.length]), form: Object.keys(out.form), axe: out.axe }, null, 1));
await browser.close();
