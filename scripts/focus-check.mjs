import { chromium } from "playwright-core";

const BASE = "http://localhost:3100";
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

// reset focus to document body, then tab through
await page.evaluate(() => {
  document.activeElement?.blur?.();
  window.scrollTo(0, 0);
});
const order = [];
for (let i = 0; i < 6; i++) {
  await page.keyboard.press("Tab");
  order.push(
    await page.evaluate(() => {
      const el = document.activeElement;
      const cs = el ? getComputedStyle(el) : null;
      return {
        tag: el?.tagName,
        text: (el?.textContent || "").trim().slice(0, 28),
        href: el?.getAttribute?.("href") || "",
        outline: cs ? cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor : "",
        rectTop: el ? Math.round(el.getBoundingClientRect().top) : -1,
      };
    })
  );
}
console.log("TAB_ORDER", JSON.stringify(order, null, 1));

// skip link details
const skip = await page.evaluate(() => {
  const a = document.querySelector('a[href="#main"]');
  if (!a) return "missing";
  const cs = getComputedStyle(a);
  return { text: a.textContent.trim(), position: cs.position, top: cs.top, transform: cs.transform, z: cs.zIndex };
});
console.log("SKIP", JSON.stringify(skip));

// focus after invalid submit
await page.goto(BASE + "/#zapis", { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.locator("#zapis button[type=submit]").click();
await page.waitForTimeout(500);
console.log(
  "AFTER_INVALID_SUBMIT",
  JSON.stringify(
    await page.evaluate(() => ({
      active: document.activeElement?.tagName,
      id: document.activeElement?.id,
      invalidCount: document.querySelectorAll('[aria-invalid="true"]').length,
    }))
  )
);

// phone backspace behaviour
await page.reload({ waitUntil: "networkidle" });
const phone = page.locator('#zapis input[type="tel"]');
await phone.fill("7760009333");
await phone.press("End");
for (let i = 0; i < 3; i++) await phone.press("Backspace");
console.log("PHONE_AFTER_3_BACKSPACE", JSON.stringify(await phone.inputValue()));

// headings order
const headingOrder = await page.evaluate(() =>
  Array.from(document.querySelectorAll("h1,h2,h3")).map((h) => h.tagName + ":" + h.textContent.trim().slice(0, 28))
);
console.log("HEADINGS", JSON.stringify(headingOrder.slice(0, 20)));

await browser.close();
