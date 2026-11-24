// E9 in the real player (24 Nov 2026, «এসো, গণিত শিখি!» Book #02 p.14): a phone-wide (or WIDTH) page on :3003 rounds
// numbers on the drawn number line the way a child would: to the nearest 10, 100, 1000 (exactly halfway goes up), a
// 5-digit number with its comma, and one wrong first (the hint, then the right answer: no star); then 3 fresh rounds.
// Every API call answered here. Screenshots in shots/e9-*.png.
require("./globals.cjs");
const path = require("path"), fs = require("fs");
const puppeteer = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
const SITE = "http://localhost:3003", CODE = "ZZE9TEST", W = Number(process.env.WIDTH || 390);
const CORS = { "Access-Control-Allow-Origin": SITE, "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" };
const raw = [
  { kind: "round", n: 63, to: 10 },
  { kind: "round", n: 85, to: 10 },
  { kind: "round", n: 347, to: 100 },
  { kind: "round", n: 450, to: 100 },
  { kind: "round", n: 7349, to: 1000 },
  { kind: "round", n: 12500, to: 1000 },
];
const items = srv.normalizeWorkItems(raw, "work_it_out");
if (items.length !== raw.length) { console.log("the server dropped some:", raw.length - items.length); process.exit(1); }
const data = { id: "x", book: { id: "b", title: "প্রাথমিক গণিত - চতুর্থ শ্রেণি", publicCode: "KZT9KF", read: null }, institute: { name: "eBidyaloy" }, gameLook: { scene: "", timeAware: false }, help: null, edition: "", editions: [], speech: null,
  publicCode: CODE, version: 1, activityType: "work_it_out", activitySubtype: "", title: "কাছের দশক, শতক, হাজার (E9)", instruction: "হিসাব করে প্রতিটি উত্তর লেখো।", instructionLang: "bn", chapter: "অধ্যায় ১ · সংখ্যা ও স্থানীয় মান", pageRef: "14",
  author: "", publisher: "", locked: false, configuration: { language: "bn", fresh: { count: 3, skill: "round", roundTo: [10, 100, 1000] } }, content: { items }, instructionAudioUrl: null, access: { prices: {}, buyable: false } };
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
  const shot = (n) => page.screenshot({ path: path.join(__dirname, "shots", `e9-${W}-${String(n).padStart(2, "0")}.png`), fullPage: true });
  const main = async () => { const b = await page.$('[data-ab^="main-"]'); if (b) await b.click(); };
  // the round on screen: read back from the drawn line (its blue number), so the fresh rounds are answered too
  const onScreen = async () => page.evaluate(() => { const s = document.querySelector('[data-wio="round"]'); if (!s) return null; const tx = [...s.querySelectorAll("text")].map((e) => e.textContent.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d)).replace(/,/g, "")); return { lo: Number(tx[0]), mid: Number(tx[1]), hi: Number(tx[2]), n: Number(tx[3]) }; });
  const MISSED = [2];
  let expectStars = 0, k = 0;
  for (; k < raw.length + 3; k++) {
    await sleep(600);
    const r = await onScreen();
    if (!r) break;
    const want = r.n >= r.mid ? r.hi : r.lo, wrong = want === r.hi ? r.lo : r.hi;
    await shot(`${k + 1}a`);
    if (MISSED.includes(k)) {
      await page.keyboard.type(String(wrong)); await page.keyboard.press("Enter"); await sleep(500);
      const hint = await page.$eval('[data-wio="hint"]', (e) => e.textContent).catch(() => "");
      console.log(`  ${r.n} wrong (${wrong}) → hint: ${hint.trim().slice(0, 120)}`);
      await shot(`${k + 1}b`);
      for (let i = 0; i < 8; i++) await page.keyboard.press("Backspace");
      await page.keyboard.type(String(want)); await page.keyboard.press("Enter");
      await sleep(600); await shot(`${k + 1}c`); await main();
    } else {
      expectStars++;
      await page.keyboard.type(String(want)); await page.keyboard.press("Enter");
    }
    console.log(`  round ${k + 1}: ${r.n} (${r.lo}–${r.hi}, half ${r.mid}) → ${want}`);
    await sleep(1400);
  }
  await sleep(800);
  await shot(99);
  const got = await stars();
  console.log(`${W}px: ${k} rounds · stars ${got} (expected ${expectStars}) · page errors: ${errs.length ? errs.join(" | ") : "none"}`);
  await browser.close();
  process.exit(got === expectStars && !errs.length ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
