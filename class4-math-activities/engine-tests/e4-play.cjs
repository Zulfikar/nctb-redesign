// E4 in the real player (24 Nov 2026, «এসো, গণিত শিখি!» Books #01–#02): a phone-wide (or WIDTH) page on :3003 plays
// arrays the way a child would: counts 3 rows of 4 (+) and 2 rows of 6 (×), makes 12 in 3 rows on the dot grid, makes 12
// in any rows with one wrong try first (10: the hint, no star), makes 8 in 4 rows; then 3 fresh rounds read off the
// screen. Every API call answered here. Screenshots in shots/e4-*.png.
require("./globals.cjs");
const path = require("path"), fs = require("fs");
const puppeteer = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
const SITE = "http://localhost:3003", CODE = "ZZE4TEST", W = Number(process.env.WIDTH || 390);
const CORS = { "Access-Control-Allow-Origin": SITE, "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" };
const raw = [
  { kind: "array", rows: 3, cols: 4, emoji: "🍓" },
  { kind: "array", rows: 2, cols: 6, sign: "×", emoji: "⭐" },
  { kind: "array", ask: "build", total: 12, rows: 3, emoji: "🌱" },
  { kind: "array", ask: "build", total: 12 },
  { kind: "array", ask: "build", total: 8, rows: 4, emoji: "🌱" },
];
const items = srv.normalizeWorkItems(raw, "work_it_out");
if (items.length !== raw.length) { console.log("the server dropped some:", raw.length - items.length); process.exit(1); }
const data = { id: "x", book: { id: "b", title: "প্রাথমিক গণিত - চতুর্থ শ্রেণি", publicCode: "KZT9KF", read: null }, institute: { name: "eBidyaloy" }, gameLook: { scene: "", timeAware: false }, help: null, edition: "", editions: [], speech: null,
  publicCode: CODE, version: 1, activityType: "work_it_out", activitySubtype: "", title: "সারি-কলাম (E4)", instruction: "হিসাব করে প্রতিটি উত্তর লেখো।", instructionLang: "bn", chapter: "অধ্যায় ১ · সংখ্যা ও স্থানীয় মান", pageRef: "49",
  author: "", publisher: "", locked: false, configuration: { language: "bn", fresh: { count: 3, skill: "array" } }, content: { items }, instructionAudioUrl: null, access: { prices: {}, buyable: false } };
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
  const stars = async () => page.evaluate(() => { const m = /([0-9০-৯]+)\s*(সঠিক|correct)/.exec(document.body.innerText); return m ? Number(m[1].replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d))) : -1; });
  const shot = (n) => page.screenshot({ path: path.join(__dirname, "shots", `e4-${W}-${String(n).padStart(2, "0")}.png`), fullPage: true });
  const main = async () => { const b = await page.$('[data-ab^="main-"]'); if (b) await b.click(); };
  const make = async (r, c) => { await page.click(`[data-arr="${r}x${c}"]`); await sleep(300); };
  const now = async () => page.$eval('[data-wio="array-now"]', (e) => e.textContent).catch(() => "");
  const hint = async () => (await page.$eval('[data-wio="hint"]', (e) => e.textContent).catch(() => "")).trim();
  const digits = (s) => (s.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d)).match(/\d+/g) || []).map(Number);
  const log = (s) => console.log("  " + s);
  // the three boxes, Enter after each (Enter with a box still empty goes on to it)
  const boxes = async (...vs) => { for (const v of vs) { await page.keyboard.type(String(v)); await page.keyboard.press("Enter"); await sleep(150); } };
  let expectStars = 0;
  // 1–2. count: rows, each row, in all
  await sleep(600); await shot("1a"); await boxes(3, 4, 12); await sleep(500); await shot("1b"); expectStars++; await sleep(1300);
  await shot("2a"); await boxes(2, 6, 12); expectStars++; await sleep(1500);
  // 3. 12 in 3 rows
  await make(3, 4); log(`12 in 3 rows: «${await now()}»`); await shot("3a"); await main(); expectStars++; await sleep(1500);
  // 4. 12 in any rows: 2 × 5 first (the hint), then 2 × 6
  await make(2, 5); await main(); await sleep(500); log(`12, made 10 → hint: ${await hint()}`); await shot("4b");
  await make(2, 6); await main(); await sleep(600); await shot("4c"); await main(); await sleep(1500);
  // 5. 8 in 4 rows
  await make(4, 2); await main(); expectStars++; await sleep(1500);
  // 6–8. fresh rounds, read off the screen
  for (let k = 6; k <= 8; k++) {
    await shot(`${k}a`);
    const grid = await page.$('svg[data-wio="array"]');
    if (grid) {
      const q = await page.$eval('svg[data-wio="array"]', (e) => e.parentElement.firstElementChild.textContent);
      const [total, rows] = digits(q);
      const r = rows || [3, 2, 4, 5, 6, 1].find((x) => total % x === 0 && total / x <= 10);
      log(`fresh ${k}: ${q.trim()} → ${r} rows of ${total / r}`);
      await make(r, total / r); await main();
    } else {
      const [r, c] = await page.$eval('[data-wio="array"]', (e) => [e.children.length, e.firstElementChild.children.length]);
      log(`fresh ${k}: count ${r} rows of ${c}`);
      await boxes(r, c, r * c);
    }
    expectStars++; await sleep(1500);
  }
  await sleep(800);
  await shot(99);
  const got = await stars();
  console.log(`${W}px: stars ${got} (expected ${expectStars}) · page errors: ${errs.length ? errs.join(" | ") : "none"}`);
  await browser.close();
  process.exit(got === expectStars && !errs.length ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
