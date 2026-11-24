// A6 in the real player: a phone-wide (or WIDTH) page on :3003 plays Fraction Play's mixed-number rounds the way a
// child would: ৭/৪ as a mixed number (pies), ২ ১/৪ as an improper fraction (bars), ১৩/৫ on a line, ১ ১/৫ tapped on the
// line (one wrong mark first), the improper fractions ringed; every API call answered here. Screenshots shots/a6-*.png.
require("./globals.cjs");
const path = require("path"), fs = require("fs");
const puppeteer = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
const SITE = "http://localhost:3003", CODE = "ZZA6TEST", W = Number(process.env.WIDTH || 390);
const CORS = { "Access-Control-Allow-Origin": SITE, "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" };
const raw = [
  { kind: "fmixed", a: "৭/৪", ask: "tomixed", look: "pie" },
  { kind: "fmixed", a: "২ ১/৪", ask: "toimproper", look: "bar" },
  { kind: "fmixed", a: "13/5", ask: "tomixed", look: "line" },
  { kind: "fmixed", a: "1 1/5", ask: "place" },
  { kind: "fsort", want: "improper", fracs: ["৩/৫", "৩/৪", "৫/৫", "৪/৪", "৭/৫", "৫/৪", "৩/২", "২/৩"] },
];
const items = srv.normalizeWorkItems(raw, "fraction_play");
if (items.length !== raw.length) { console.log("the server dropped some:", raw.length - items.length); process.exit(1); }
const data = { id: "x", book: { id: "b", title: "প্রাথমিক গণিত - চতুর্থ শ্রেণি", publicCode: "KZT9KF", read: null }, institute: { name: "eBidyaloy" }, gameLook: { scene: "", timeAware: false }, help: null, edition: "", editions: [], speech: null,
  publicCode: CODE, version: 1, activityType: "fraction_play", activitySubtype: "", title: "মিশ্র ভগ্নাংশ (A6)", instruction: "হিসাব করে প্রতিটি উত্তর লেখো।", instructionLang: "bn", chapter: "অধ্যায় ১ · সংখ্যা ও স্থানীয় মান", pageRef: "4",
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
  const shot = (n) => page.screenshot({ path: path.join(__dirname, "shots", `a6-${W}-${String(n).padStart(2, "0")}.png`), fullPage: true });
  const main = async () => { const b = await page.$('[data-ab^="main-"]'); if (b) await b.click(); };
  const clickText = async (sel, text) => page.evaluate((s, t) => { const b = [...document.querySelectorAll(s)].find((x) => x.textContent.trim() === t && x.style.visibility !== "hidden" && !x.disabled); if (b) b.click(); return !!b; }, sel, text);
  const typeNum = async (v) => { await page.keyboard.type(String(v)); };
  const tap = async (v) => { await page.click(`[data-num="${v}"]`); await sleep(120); };
  const tick = async (k) => { await page.$eval(`[data-fp-tick="${k}"]`, (el) => el.dispatchEvent(new MouseEvent("click", { bubbles: true }))); await sleep(300); };
  const type = async (v) => { await page.keyboard.type(String(v)); };
  const key = async (k) => { await page.keyboard.press(k); await sleep(120); };
  const steps = [
    async () => { await type(1); await key("Tab"); await type(3); await shot("1b"); await key("Enter"); },
    async () => { await type(9); await shot("2b"); await key("Enter"); },
    async () => { await type(2); await key("Tab"); await type(3); await shot("3b"); await key("Enter"); },
    async () => { await tick(5); await shot("4-miss"); await tick(6); },
    async () => { for (const v of ["5/5", "4/4", "7/5", "5/4", "3/2"]) await tap(v); await shot("5b"); await main(); },
  ];
  const MISSED = [3];
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
