// A1 in the real player: a phone-wide (or WIDTH) page on :3003 plays a game of the new big-number rounds, the way a
// child would (one round wrong first), with every API call answered here. Screenshots in shots/a1-*.png.
require("./globals.cjs");
const path = require("path"), fs = require("fs");
const puppeteer = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
const SITE = "http://localhost:3003", CODE = "ZZA1TEST", W = Number(process.env.WIDTH || 390);
const CORS = { "Access-Control-Allow-Origin": SITE, "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" };
const raw = [
  { kind: "place", n: 16523912, ask: "value", at: 6 },
  { kind: "place", n: 2455781, ask: "digit", at: 6 },
  { kind: "place", n: 21046091, ask: "words" },
  { kind: "place", n: 43451280, ask: "words", system: "intl" },
  { kind: "place", n: 5660779, ask: "figures" },
  { kind: "place", n: 48641785, ask: "commas" },
  { kind: "place", n: 5215723, ask: "commas", system: "intl" },
  { kind: "place", ask: "cards", cards: [4, 0, 7, 2], want: "smallest" },
  { kind: "place", n: 46127859, ask: "parts" },
  { kind: "missing", text: "□ − 48936 = 49877" },
  { kind: "sum", terms: [258367, 389654, 506734, 625843, 819578], op: "+", layout: "column" },
  { kind: "compare", a: "21046091", b: "21046190" },
];
const items = srv.normalizeWorkItems(raw, "work_it_out");
if (items.length !== raw.length) { console.log("the server dropped some:", raw.length - items.length); process.exit(1); }
const data = { id: "x", book: { id: "b", title: "প্রাথমিক গণিত - চতুর্থ শ্রেণি", publicCode: "KZT9KF", read: null }, institute: { name: "eBidyaloy" }, gameLook: { scene: "", timeAware: false }, help: null, edition: "", editions: [], speech: null,
  publicCode: CODE, version: 1, activityType: "work_it_out", activitySubtype: "", title: "বড়ো সংখ্যা (A1)", instruction: "হিসাব করে প্রতিটি উত্তর লেখো।", instructionLang: "bn", chapter: "অধ্যায় ১ · সংখ্যা ও স্থানীয় মান", pageRef: "4",
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
  const shot = (n) => page.screenshot({ path: path.join(__dirname, "shots", `a1-${W}-${String(n).padStart(2, "0")}.png`), fullPage: true });
  const main = async () => { const b = await page.$('[data-ab^="main-"]'); if (b) await b.click(); };
  const clickText = async (sel, text) => page.evaluate((s, t) => { const b = [...document.querySelectorAll(s)].find((x) => x.textContent.trim() === t && x.style.visibility !== "hidden" && !x.disabled); if (b) b.click(); return !!b; }, sel, text);
  const typeNum = async (v) => { await page.keyboard.type(String(v)); };
  let expectStars = 0;
  for (let k = 0; k < items.length; k++) {
    const it = items[k];
    await sleep(500);
    await shot(k + 1);
    if (it.kind === "place" && it.ask === "words") {
      if (k === 2) {
        // wrong first: the last chunk first → the hint, then cleared and done right (no star)
        await clickText("[data-wio-word]", it.answer[it.answer.length - 1]); await sleep(150); await main(); await sleep(400);
        const hint = await page.$eval('[data-wio="hint"]', (e) => e.textContent).catch(() => "");
        console.log(`  words wrong → hint: ${hint.trim().slice(0, 90)}`);
        await shot(`${k + 1}b`);
        const clear = await page.$('[data-ab^="helper-"]'); if (clear) await clear.click(); await sleep(200);
      } else expectStars++;
      for (const c of it.answer) { const ok = await clickText("[data-wio-word]", c); if (!ok) console.log("  no tile", c); await sleep(120); }
      await main();
      if (k === 2) { await sleep(500); await shot(`${k + 1}c`); await main(); }
    } else if (it.kind === "place" && it.ask === "commas") {
      expectStars++;
      for (const g of it.answer) { await page.click(`[data-wio-gap="${g}"]`); await sleep(100); }
      await shot(`${k + 1}b`);
      await main();
    } else if (it.kind === "place" && it.ask === "cards") {
      expectStars++;
      const used = [];
      for (const d of String(it.answer)) { const i = it.cards.findIndex((c, q) => String(c) === d && !used.includes(q)); used.push(i); await page.click(`[data-wio-card="${i}"]`); await sleep(100); }
      await shot(`${k + 1}b`);
      await main();
    } else if (it.kind === "place" && it.ask === "parts") {
      expectStars++; await typeNum(it.answer.join("")); await page.keyboard.press("Enter");
    } else if (it.kind === "sum" && it.layout === "column") {
      expectStars++; await typeNum(String(it.answer).split("").reverse().join("")); // the ones first
    } else if (it.kind === "compare") {
      expectStars++; await page.keyboard.type(it.answer);
    } else {
      expectStars++; await typeNum(it.answer); await page.keyboard.press("Enter");
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
