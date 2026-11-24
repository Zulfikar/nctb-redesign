// A5 in the real player: a phone-wide (or WIDTH) page on :3003 plays factors and primes the way a child would: ring
// the multiples on a chart, the factors in a list (one wrong first), the sieve to 100, factor pairs typed in any order,
// a factor tree (a pair typed the other way round) and a line (one wrong first); every API call answered here.
// Screenshots in shots/a5-*.png.
require("./globals.cjs");
const path = require("path"), fs = require("fs");
const puppeteer = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
const SITE = "http://localhost:3003", CODE = "ZZA5TEST", W = Number(process.env.WIDTH || 390);
const CORS = { "Access-Control-Allow-Origin": SITE, "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" };
const raw = [
  { kind: "nmark", rule: "multiple", n: 2, from: 1, to: 20 },
  { kind: "nmark", rule: "factor", n: 16, nums: ["৪", "৫", "৬", "৭", "৮", "৯", "১২", "১৬"] },
  { kind: "sieve", to: 100 },
  { kind: "fpairs", n: 12 },
  { kind: "ftree", n: 30, ask: "tree" },
  { kind: "ftree", n: 24, ask: "line" },
];
const items = srv.normalizeWorkItems(raw, "work_it_out");
if (items.length !== raw.length) { console.log("the server dropped some:", raw.length - items.length); process.exit(1); }
const data = { id: "x", book: { id: "b", title: "প্রাথমিক গণিত - চতুর্থ শ্রেণি", publicCode: "KZT9KF", read: null }, institute: { name: "eBidyaloy" }, gameLook: { scene: "", timeAware: false }, help: null, edition: "", editions: [], speech: null,
  publicCode: CODE, version: 1, activityType: "work_it_out", activitySubtype: "", title: "গুণিতক ও গুণনীয়ক (A5)", instruction: "হিসাব করে প্রতিটি উত্তর লেখো।", instructionLang: "bn", chapter: "অধ্যায় ১ · সংখ্যা ও স্থানীয় মান", pageRef: "4",
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
  const shot = (n) => page.screenshot({ path: path.join(__dirname, "shots", `a5-${W}-${String(n).padStart(2, "0")}.png`), fullPage: true });
  const main = async () => { const b = await page.$('[data-ab^="main-"]'); if (b) await b.click(); };
  const clickText = async (sel, text) => page.evaluate((s, t) => { const b = [...document.querySelectorAll(s)].find((x) => x.textContent.trim() === t && x.style.visibility !== "hidden" && !x.disabled); if (b) b.click(); return !!b; }, sel, text);
  const typeNum = async (v) => { await page.keyboard.type(String(v)); };
  const tap = async (v) => { await page.click(`[data-num="${v}"]`); await sleep(120); };
  const type = async (v) => { await page.keyboard.type(String(v)); };
  const key = async (k) => { await page.keyboard.press(k); await sleep(120); };
  const steps = [
    // 1: the multiples of 2 on a chart 1–20
    async () => { for (const v of [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]) await tap(v); await shot("1b"); await main(); },
    // 2: the factors of 16, with 6 ringed wrongly first
    async () => { for (const v of [4, 6, 8, 16]) await tap(v); await main(); await sleep(400); await shot("2-miss"); await tap(6); await main(); },
    // 3: the sieve: 1, ring 2, three of its multiples, 3, …, then the count
    async () => {
      await tap(1); await tap(2); await tap(4); await tap(6); await shot("3b"); await tap(8); await sleep(400); await shot("3c");
      await tap(3); await tap(9); await tap(15); await tap(21); await tap(5); await tap(25); await tap(35); await tap(55); await tap(7); await tap(49); await tap(77); await tap(91);
      await sleep(600); await shot("3d"); await type(25); await key("Enter");
    },
    // 4: 12's pairs in another order, one typed the other way round
    async () => { for (const [a, b] of [[3, 4], [12, 1], [2, 6]]) { await type(a); await key("Tab"); await type(b); await key("Tab"); } await shot("4b"); await key("Enter"); },
    // 5: the tree of 30: 15 × 2 (turned round), 3 × 5, then the line in any order
    async () => { await type(15); await key("Tab"); await type(2); await key("Enter"); await shot("5b"); await type(3); await key("Tab"); await type(5); await key("Enter"); await sleep(300); await shot("5c"); for (const v of [5, 3, 2]) { await type(v); await key("Enter"); } },
    // 6: 24 in a line, 2 2 3 3 first (wrong), then right
    async () => { for (const v of [2, 2, 3, 3]) { await type(v); await key("Enter"); } await sleep(400); await shot("6-miss"); for (let k = 0; k < 4; k++) { await type([2, 2, 2, 3][k]); await key("Enter"); } },
  ];
  const MISSED = [1, 5];
  let expectStars = 0;
  for (let k = 0; k < items.length; k++) {
    await sleep(500);
    await shot(`${k + 1}a`);
    await steps[k]();
    if (!MISSED.includes(k)) expectStars++;
    await sleep(300);
    await shot(`${k + 1}z`);
    await sleep(1300);
    if (MISSED.includes(k)) { await main(); await sleep(500); }
  }
  await sleep(800);
  await shot(99);
  const got = await stars();
  console.log(`${W}px: stars ${got} (expected ${expectStars}) · page errors: ${errs.length ? errs.join(" | ") : "none"}`);
  await browser.close();
  process.exit(got === expectStars && !errs.length ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
