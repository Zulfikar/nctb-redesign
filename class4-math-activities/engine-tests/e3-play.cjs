// E3 in the real player (24 Nov 2026, «এসো, গণিত শিখি!» Books #01–#02): a phone-wide (or WIDTH) page on :3003 hops on
// the number line the way a child would: taps the numbers (one wrong tap first, one hop taken back), presses «লাফ দাও»,
// counts the hops to an end, 20 back to 0 in 5s, one answer wrong first (the hint, then right: no star); then 3 fresh
// rounds, answered from the sentence on screen. Every API call answered here. Screenshots in shots/e3-*.png.
require("./globals.cjs");
const path = require("path"), fs = require("fs");
const puppeteer = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
const SITE = "http://localhost:3003", CODE = "ZZE3TEST", W = Number(process.env.WIDTH || 390);
const CORS = { "Access-Control-Allow-Origin": SITE, "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" };
const raw = [
  { kind: "hops", start: 9, n: 4 },
  { kind: "hops", start: 15, n: 6, dir: "-" },
  { kind: "hops", start: 9, end: 14 },
  { kind: "hops", start: 20, step: 5, dir: "-", end: 0 },
  { kind: "hops", start: 12, n: 3 },
];
const items = srv.normalizeWorkItems(raw, "work_it_out");
if (items.length !== raw.length) { console.log("the server dropped some:", raw.length - items.length); process.exit(1); }
const data = { id: "x", book: { id: "b", title: "প্রাথমিক গণিত - চতুর্থ শ্রেণি", publicCode: "KZT9KF", read: null }, institute: { name: "eBidyaloy" }, gameLook: { scene: "", timeAware: false }, help: null, edition: "", editions: [], speech: null,
  publicCode: CODE, version: 1, activityType: "work_it_out", activitySubtype: "", title: "লাফ দিয়ে যোগ-বিয়োগ (E3)", instruction: "হিসাব করে প্রতিটি উত্তর লেখো।", instructionLang: "bn", chapter: "অধ্যায় ১ · সংখ্যা ও স্থানীয় মান", pageRef: "29",
  author: "", publisher: "", locked: false, configuration: { language: "bn", fresh: { count: 3, skill: "hops" } }, content: { items }, instructionAudioUrl: null, access: { prices: {}, buyable: false } };
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
  const shot = (n) => page.screenshot({ path: path.join(__dirname, "shots", `e3-${W}-${String(n).padStart(2, "0")}.png`), fullPage: true });
  const main = async () => { const b = await page.$('[data-ab^="main-"]'); if (b) await b.click(); };
  const tap = async (v) => { await page.click(`[data-hop="${v}"]`); await sleep(350); };
  const hop = async (k) => { for (let i = 0; i < k; i++) { await page.click('[data-wio="hop"]'); await sleep(350); } };
  const landed = async () => page.$$eval('[data-wio="hops"] circle', (c) => c.length - 1);
  const made = async () => page.$eval('[data-wio="hops-made"]', (e) => e.textContent).catch(() => "");
  const answer = async (v) => { await page.keyboard.type(String(v)); await page.keyboard.press("Enter"); };
  // the sentence the box finishes (৯ + ৪ =, ২০ ÷ ৫ =), worked out
  const sentence = async () => page.evaluate(() => { const s = document.querySelector('[data-wio="hops"]'); const sp = s && s.parentElement.lastElementChild.querySelector("span"); return sp ? sp.textContent : ""; });
  const work = (txt) => Function(`return (${txt.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d)).replace(/−/g, "-").replace(/÷/g, "/").replace(/=\s*$/, "")})`)();
  let expectStars = 0;
  const log = (s) => console.log("  " + s);
  // 1. ৯ + ৪: a wrong tap first (17: nothing), then 10 11 12 13, one taken back (tap 12) and hopped again
  await sleep(600); await shot("1a");
  await tap(17); log(`wrong tap: hops ${await landed()}`);
  await tap(10); await tap(11); await tap(12); await tap(13); await tap(12); log(`after a hop back: hops ${await landed()} (${await made()})`);
  await tap(13); await shot("1b"); log(`৯ + ৪: hops ${await landed()} (${await made()}), sentence «${await sentence()}»`);
  await answer(13); expectStars++; await sleep(1400);
  // 2. ১৫ − ৬ with the Hop button
  await shot("2a"); await hop(6); log(`১৫ − ৬: hops ${await landed()}`); await shot("2b"); await answer(9); expectStars++; await sleep(1400);
  // 3. ৯ থেকে ১৪: how many hops (no counter shown)
  await hop(5); log(`৯ → ১৪: counter shown? ${!!(await made())}; sentence «${await sentence()}»`); await shot("3b"); await answer(5); expectStars++; await sleep(1400);
  // 4. ২০ থেকে ৫ করে পিছনে ০ পর্যন্ত
  await tap(15); await tap(10); await tap(5); await tap(0); log(`২০ → ০ in 5s: hops ${await landed()}, sentence «${await sentence()}»`); await shot("4b"); await answer(4); expectStars++; await sleep(1400);
  // 5. ১২ + ৩, wrong first: 14 → the hint, then 15 (no star)
  await answer(14); await sleep(500);
  log(`১২ + ৩ wrong → hint: ${(await page.$eval('[data-wio="hint"]', (e) => e.textContent).catch(() => "")).trim()}`);
  await shot("5b");
  for (let i = 0; i < 4; i++) await page.keyboard.press("Backspace");
  await answer(15); await sleep(600); await main(); await sleep(1400);
  // 6–8. fresh rounds: answered from the sentence
  for (let k = 6; k <= 8; k++) {
    const s = await sentence(); const v = work(s);
    log(`fresh ${k}: ${(await page.$eval('[data-wio="hops"]', (e) => e.parentElement.firstElementChild.textContent)).trim()} «${s}» → ${v}`);
    await shot(`${k}a`); await answer(v); expectStars++; await sleep(1400);
  }
  await sleep(800);
  await shot(99);
  const got = await stars();
  console.log(`${W}px: stars ${got} (expected ${expectStars}) · page errors: ${errs.length ? errs.join(" | ") : "none"}`);
  await browser.close();
  process.exit(got === expectStars && !errs.length ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
