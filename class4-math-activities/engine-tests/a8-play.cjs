// A1 in the real player: a phone-wide (or WIDTH) page on :3003 plays a game of the new big-number rounds, the way a
// child would (one round wrong first), with every API call answered here. Screenshots in shots/a1-*.png.
require("./globals.cjs");
const path = require("path"), fs = require("fs");
const puppeteer = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
const SITE = "http://localhost:3003", CODE = "ZZA8TEST", W = Number(process.env.WIDTH || 390);
const CORS = { "Access-Control-Allow-Origin": SITE, "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" };
const raw = [
  { kind: "units3", unit: "h", terms: [[7, 0, 15], [4, 46, 35]], ops: ["−"], layout: "column" },
  { kind: "units3", unit: "h", terms: [[2, 5, 58], [1, 14, 35]], ops: ["+"], layout: "column" },
  { kind: "units3", unit: "m", terms: [[6, 25, 0], [2, 10, 5]], ops: ["+"] },
  { kind: "units", unit: "yr", terms: [[12, 7], [9, 9]], ops: ["+"], text: "লাইজুর বয়স ১২ বছর ৭ মাস এবং মাসুদের বয়স ৯ বছর ৯ মাস। লাইজু এবং মাসুদের বয়সের যোগফল কত?" },
  { kind: "convert", from: [[8, "wk"], [5, "day"]], to: "h" },
  { kind: "convert", from: [[38, "day"]], to: ["wk", "day"] },
];
const items = srv.normalizeWorkItems(raw, "units_amounts");
if (items.length !== raw.length) { console.log("the server dropped some:", raw.length - items.length); process.exit(1); }
const data = { id: "x", book: { id: "b", title: "প্রাথমিক গণিত - চতুর্থ শ্রেণি", publicCode: "KZT9KF", read: null }, institute: { name: "eBidyaloy" }, gameLook: { scene: "", timeAware: false }, help: null, edition: "", editions: [], speech: null,
  publicCode: CODE, version: 1, activityType: "units_amounts", activitySubtype: "", title: "পরিমাপ (A8)", instruction: "হিসাব করে প্রতিটি উত্তর লেখো।", instructionLang: "bn", chapter: "অধ্যায় ১ · সংখ্যা ও স্থানীয় মান", pageRef: "4",
  author: "", publisher: "", locked: false, configuration: { language: "bn" }, content: { items }, instructionAudioUrl: null, access: { prices: {}, buyable: false } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(path.join(__dirname, "shots"), { recursive: true });
  const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new" });
  const page = await browser.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/Text content did not match|ERR_FAILED|404|Failed to load resource|hydrat/i.test(m.text())) errs.push("console: " + m.text().slice(0, 200)); });
  await page.setRequestInterception(true);
  page.on("request", (r) => {
    const u = r.url(), m = r.method();
    if (/googletagmanager|google-analytics|facebook\.(net|com)|doubleclick/.test(u)) return r.abort();
    if (u.includes(":9001/")) {
      if (m === "OPTIONS") return r.respond({ status: 204, headers: { ...CORS, "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS" } });
      if (m === "GET" && new RegExp(`/public/activity/${CODE}(\\?|$)`).test(u)) return r.respond({ status: 200, headers: CORS, body: JSON.stringify({ code: 200, message: "OK", payload: data }) });
      return r.respond({ status: 200, headers: CORS, body: JSON.stringify({ code: 200, message: "OK", payload: null }) });
    }
    return r.continue();
  });
  await page.setViewport({ width: W, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${SITE}/a/${CODE}?lang=bn`, { waitUntil: "networkidle2", timeout: 240000 });
  await page.waitForSelector('[data-wio="card"]', { timeout: 120000 });
  // the stars: the result card's "✓ N সঠিক" (the game look hides the player's own counter)
  const stars = async () => page.evaluate(() => { const m = /([0-9০-৯]+)\s*(সঠিক|correct)/.exec(document.body.innerText); return m ? Number(m[1].replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d))) : -1; });
  const shot = (n) => page.screenshot({ path: path.join(__dirname, "shots", `a8-${W}-${String(n).padStart(2, "0")}.png`), fullPage: true });
  const main = async () => { const b = await page.$('[data-ab^="main-"]'); if (b) await b.click(); };
  const clickText = async (sel, text) => page.evaluate((s, t) => { const b = [...document.querySelectorAll(s)].find((x) => x.textContent.trim() === t && x.style.visibility !== "hidden" && !x.disabled); if (b) b.click(); return !!b; }, sel, text);
  const typeNum = async (v) => { await page.keyboard.type(String(v)); };
  let expectStars = 0;
  for (let k = 0; k < items.length; k++) {
    const it = items[k];
    await sleep(500);
    await shot(k + 1);
    const clickSign = async (v) => page.evaluate((x) => { const b = [...document.querySelectorAll("button")].find((q) => !q.disabled && q.textContent.trim() === x); if (b) b.click(); return !!b; }, v);
    if (it.kind === "units3" && it.layout === "column") {
      // the small unit first; one wrong in the first to see the borrow hint
      for (const q of [2, 1, 0]) {
        if (k === 0 && q === 1) { await typeNum(9); await page.keyboard.press("Enter"); await sleep(300); console.log("  wrong minutes → hint:", (await page.$eval('[data-wio="hint"]', (e) => e.textContent).catch(() => "")).trim()); await shot(`${k + 1}b`); }
        await typeNum(it.answer[q]); await page.keyboard.press("Enter"); await sleep(300);
        if (k === 1 && q === 1) await shot(`${k + 1}b`);
      }
      if (k === 0) { await sleep(400); await main(); } else expectStars++;
    } else if (it.kind === "units" && it.text) {
      expectStars++; await clickSign("+"); await sleep(300); await shot(`${k + 1}b`);
      for (const v of it.answer) { await typeNum(v); await page.keyboard.press("Tab"); }
      await page.keyboard.press("Enter");
    } else {
      expectStars++;
      const ans = Array.isArray(it.answer) ? it.answer : [it.answer];
      for (const v of ans) { await typeNum(v); await page.keyboard.press("Tab"); }
      await page.keyboard.press("Enter");
    }
    await sleep(1300);
  }
  await sleep(800);
  await shot(99);
  const got = await stars();
  console.log(`${W}px: stars ${got} (expected ${expectStars}) · page errors: ${errs.length ? errs.join(" | ") : "none"}`);
  await browser.close();
  process.exit(got === expectStars && !errs.length ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
