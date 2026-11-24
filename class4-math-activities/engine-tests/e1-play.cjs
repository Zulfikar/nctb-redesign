// E1 in the real player (24 Nov 2026, «এসো, গণিত শিখি!» Books #01–#02): a phone-wide (or WIDTH) page on :3003 plays the
// tens board the way a child would: reads a ten-frame, fills one, adds red and blue counters, reads bundles and sticks
// (bundles, loose, in all), makes 28, makes 23 untied first (13 loose: the hint, then ties them: no star), trades a
// block board before reading it, adds 247 + 185 with two trades; then 3 fresh rounds read off the board. Every API call
// answered here. Screenshots in shots/e1-*.png.
require("./globals.cjs");
const path = require("path"), fs = require("fs");
const puppeteer = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
const SITE = "http://localhost:3003", CODE = "ZZE1TEST", W = Number(process.env.WIDTH || 390);
const CORS = { "Access-Control-Allow-Origin": SITE, "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" };
const raw = [
  { kind: "tens", look: "frame", n: 12 },
  { kind: "tens", look: "frame", ask: "make", n: 14 },
  { kind: "tens", look: "frame", ask: "add", a: 4, b: 3 },
  { kind: "tens", look: "sticks", n: 47, parts: true },
  { kind: "tens", look: "sticks", ask: "make", n: 28 },
  { kind: "tens", look: "sticks", ask: "make", n: 23 },
  { kind: "tens", look: "blocks", board: { h: 3, t: 12, o: 4 } },
  { kind: "tens", look: "blocks", ask: "add", a: 247, b: 185 },
];
const items = srv.normalizeWorkItems(raw, "work_it_out");
if (items.length !== raw.length) { console.log("the server dropped some:", raw.length - items.length); process.exit(1); }
const data = { id: "x", book: { id: "b", title: "প্রাথমিক গণিত - চতুর্থ শ্রেণি", publicCode: "KZT9KF", read: null }, institute: { name: "eBidyaloy" }, gameLook: { scene: "", timeAware: false }, help: null, edition: "", editions: [], speech: null,
  publicCode: CODE, version: 1, activityType: "work_it_out", activitySubtype: "", title: "দশের ঘর, আঁটি, ব্লক (E1)", instruction: "হিসাব করে প্রতিটি উত্তর লেখো।", instructionLang: "bn", chapter: "অধ্যায় ১ · সংখ্যা ও স্থানীয় মান", pageRef: "17",
  author: "", publisher: "", locked: false, configuration: { language: "bn", fresh: { count: 3, skill: "tens" } }, content: { items }, instructionAudioUrl: null, access: { prices: {}, buyable: false } };
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
  const shot = (n) => page.screenshot({ path: path.join(__dirname, "shots", `e1-${W}-${String(n).padStart(2, "0")}.png`), fullPage: true });
  const main = async () => { const b = await page.$('[data-ab^="main-"]'); if (b) await b.click(); };
  const click = async (sel, k = 1) => { for (let i = 0; i < k; i++) { await page.click(sel); await sleep(120); } };
  const hint = async () => (await page.$eval('[data-wio="hint"]', (e) => e.textContent).catch(() => "")).trim();
  const digits = (s) => (s.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d)).match(/\d+/g) || []).map(Number);
  const log = (s) => console.log("  " + s);
  const boxes = async (...vs) => { for (const v of vs) { await page.keyboard.type(String(v)); await page.keyboard.press("Enter"); await sleep(150); } };
  const PV = { th: 1000, h: 100, t: 10, o: 1 };
  let expectStars = 0;
  // 1. a frame: 10 and 2
  await sleep(600); await shot("1a"); await boxes(12); expectStars++; await sleep(1500);
  // 2. fill 14 counters
  for (let i = 0; i < 14; i++) await click(`[data-cell="${i}"]`);
  await shot("2b"); await main(); expectStars++; await sleep(1500);
  // 3. 4 red + 3 blue
  await shot("3a"); await boxes(7); expectStars++; await sleep(1500);
  // 4. 4 bundles, 7 loose: 4, 7, 47
  await shot("4a"); await boxes(4, 7, 47); expectStars++; await sleep(1500);
  // 5. make 28
  await click('[data-tb-more="t"]', 2); await click('[data-tb-more="o"]', 8); await shot("5b"); await main(); expectStars++; await sleep(1500);
  // 6. make 23: 1 bundle and 13 loose first (the hint), then tie 10 of them
  await click('[data-tb-more="t"]'); await click('[data-tb-more="o"]', 13); await main(); await sleep(500);
  log(`23 untied → hint: ${await hint()}`); await shot("6b");
  await click('[data-tb-trade="o"]'); await shot("6c"); await main(); await sleep(600); await main(); await sleep(1500);
  // 7. 3 hundreds, 12 tens, 4 ones: trade the tens, then 424
  await shot("7a"); await click('[data-tb-trade="t"]'); await shot("7b"); await boxes(424); expectStars++; await sleep(1500);
  // 8. 247 + 185: trade the ones, then the tens, then 432
  await shot("8a"); await click('[data-tb-trade="o"]'); await click('[data-tb-trade="t"]'); await shot("8b"); await boxes(432); expectStars++; await sleep(1500);
  // 9–11. fresh rounds, read off the board
  for (let k = 9; k <= 11; k++) {
    await shot(`${k}a`);
    const q = await page.$eval('[data-wio="tens"]', (e) => e.parentElement.firstElementChild.textContent);
    const frame = await page.$('svg[data-wio="tens"]');
    if (frame) {
      const on = await page.$$eval('svg[data-wio="tens"] circle', (c) => c.length);
      if (on) { log(`fresh ${k}: ${q.trim()} → ${on}`); await boxes(on); }
      else { const [n] = digits(q); log(`fresh ${k}: ${q.trim()} → fill ${n}`); for (let i = 0; i < n; i++) await click(`[data-cell="${i}"]`); await main(); }
    } else if (await page.$("[data-count]")) {
      const [n] = digits(q), places = await page.$$eval("[data-place]", (e) => e.map((x) => x.dataset.place));
      log(`fresh ${k}: ${q.trim()} → make ${n}`);
      for (const p of places) await click(`[data-tb-more="${p}"]`, Math.floor(n / PV[p]) % 10 + (p === places[0] ? Math.floor(n / PV[p] / 10) * 10 : 0));
      await main();
    } else {
      const cols = await page.$$eval("[data-place]", (e) => e.map((x) => [x.dataset.place, x.querySelectorAll("svg[aria-hidden]").length]));
      const val = cols.reduce((s, [p, c]) => s + c * PV[p], 0), parts = (await page.$eval('[data-wio="card"]', (e) => e.textContent)).includes("খোলা কাঠি;");
      log(`fresh ${k}: ${q.trim()} → ${JSON.stringify(cols)} = ${val}${parts ? " (parts)" : ""}`);
      if (parts) await boxes(cols[0][1], cols[1][1], val); else await boxes(val);
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
