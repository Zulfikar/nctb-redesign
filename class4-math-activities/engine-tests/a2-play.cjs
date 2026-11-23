// A1 in the real player: a phone-wide (or WIDTH) page on :3003 plays a game of the new big-number rounds, the way a
// child would (one round wrong first), with every API call answered here. Screenshots in shots/a1-*.png.
require("./globals.cjs");
const path = require("path"), fs = require("fs");
const puppeteer = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
const SITE = "http://localhost:3003", CODE = "ZZA2TEST", W = Number(process.env.WIDTH || 390);
const CORS = { "Access-Control-Allow-Origin": SITE, "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" };
const raw = [
  { kind: "sum", a: 535, op: "×", b: 125, layout: "column" },
  { kind: "sum", a: 2468, op: "×", b: 357, layout: "column" },
  { kind: "sum", a: 54, op: "×", b: 72, layout: "column" },
];
const items = srv.normalizeWorkItems(raw, "work_it_out");
if (items.length !== raw.length) { console.log("the server dropped some:", raw.length - items.length); process.exit(1); }
const data = { id: "x", book: { id: "b", title: "প্রাথমিক গণিত - চতুর্থ শ্রেণি", publicCode: "KZT9KF", read: null }, institute: { name: "eBidyaloy" }, gameLook: { scene: "", timeAware: false }, help: null, edition: "", editions: [], speech: null,
  publicCode: CODE, version: 1, activityType: "work_it_out", activitySubtype: "", title: "তিন অঙ্কের গুণক (A2)", instruction: "হিসাব করে প্রতিটি উত্তর লেখো।", instructionLang: "bn", chapter: "অধ্যায় ১ · সংখ্যা ও স্থানীয় মান", pageRef: "4",
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
  const shot = (n) => page.screenshot({ path: path.join(__dirname, "shots", `a2-${W}-${String(n).padStart(2, "0")}.png`), fullPage: true });
  const main = async () => { const b = await page.$('[data-ab^="main-"]'); if (b) await b.click(); };
  const clickText = async (sel, text) => page.evaluate((s, t) => { const b = [...document.querySelectorAll(s)].find((x) => x.textContent.trim() === t && x.style.visibility !== "hidden" && !x.disabled); if (b) b.click(); return !!b; }, sel, text);
  const typeNum = async (v) => { await page.keyboard.type(String(v)); };
  let expectStars = 0;
  for (let k = 0; k < items.length; k++) {
    const it = items[k];
    await sleep(500);
    await shot(k + 1);
    const web = await import(path.join(__dirname, "web/work-it-out.mjs"));
    const cells = web.longMulWork(it.a, it.b).cells;
    for (let q = 0; q < cells.length; q++) {
      if (k === 0 && cells[q].zero && cells[q].row === 2 && !cells[q].col) {
        await page.keyboard.type(String((cells[q].digit + 5) % 10)); await sleep(300);
        const hint = await page.$eval('[data-wio="hint"]', (e) => e.textContent).catch(() => "");
        console.log(`  wrong 0 → hint: ${hint.trim().slice(0, 100)}`);
        await shot(`${k + 1}b`);
      }
      await page.keyboard.type(String(cells[q].digit)); await sleep(60);
      if (k === 0 && q === cells.length - 2) await shot(`${k + 1}c`);
    }
    if (k === 0) { await sleep(500); await main(); } else expectStars++;
    await sleep(1300);
  }
  await sleep(800);
  await shot(99);
  const got = await stars();
  console.log(`${W}px: stars ${got} (expected ${expectStars}) · page errors: ${errs.length ? errs.join(" | ") : "none"}`);
  await browser.close();
  process.exit(got === expectStars && !errs.length ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
