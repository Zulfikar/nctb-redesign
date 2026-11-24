// Opens every activity of a built file in the real player (the :3003 test site, phone width or WIDTH), each with the
// content the server would store (importContent; Work It Out rounds with the server's answers), and reports page
// errors, a blank page or "not found". A screenshot of each in shots/sweep/<code>.png.
//   node engine-tests/sweep.cjs .check/only-p049-066.json [CODE…]
const path = require("path"), fs = require("fs");
const B = path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend");
global.ebConstants = require(path.join(B, "src/utils/constants"));
global.ebTimezones = require(path.join(B, "src/utils/timezones")).GLOBAL_TIMEZONE;
const H = require(path.join(B, "src/v3/helpers/activity-import.helper.js"));
const puppeteer = require(path.join(B, "node_modules/puppeteer-core"));
const SITE = "http://localhost:3003", W = Number(process.env.WIDTH || 390);
const CORS = { "Access-Control-Allow-Origin": SITE, "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" };
const file = JSON.parse(fs.readFileSync(path.resolve(process.argv[2]), "utf8"));
const pickCodes = process.argv.slice(3);
const acts = file.activities.filter((a) => !pickCodes.length || pickCodes.includes(a.code));
const OUT = path.join(__dirname, "shots", "sweep");
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new" });
  let current = null, bad = 0;
  const page = await browser.newPage();
  let errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/Text content did not match|ERR_FAILED|404|Failed to load resource|hydrat|key" prop|unique "key"/i.test(m.text())) errs.push("console: " + m.text().slice(0, 160)); });
  await page.setRequestInterception(true);
  page.on("request", (r) => {
    const u = r.url(), m = r.method();
    if (/googletagmanager|google-analytics|facebook\.(net|com)|doubleclick/.test(u)) return r.abort();
    if (u.includes(":9001/")) {
      if (m === "OPTIONS") return r.respond({ status: 204, headers: { ...CORS, "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS" } });
      if (m === "GET" && current && new RegExp(`/public/activity/${current.publicCode}(\\?|$)`).test(u)) return r.respond({ status: 200, headers: CORS, body: JSON.stringify({ code: 200, message: "OK", payload: current }) });
      return r.respond({ status: 200, headers: CORS, body: JSON.stringify({ code: 200, message: "OK", payload: null }) });
    }
    return r.continue();
  });
  await page.setViewport({ width: W, height: 900, deviceScaleFactor: 1 });
  for (const a of acts) {
    const r = H.importContent(a.type, a.content);
    if (r.error) { console.log(`✗ ${a.code} p.${a.page} ${a.title}: import ${r.error}`); bad++; continue; }
    current = { id: "x", book: { id: "b", title: file.book.title, publicCode: "KZT9KF", read: null }, institute: { name: "eBidyaloy" }, gameLook: { scene: "", timeAware: false }, help: null, edition: "", editions: [], speech: null,
      publicCode: a.code, version: 1, activityType: a.type, activitySubtype: "", title: a.title, instruction: "", instructionLang: "bn", chapter: a.chapter, pageRef: String(a.page),
      author: "", publisher: "", locked: false, configuration: { language: "bn", ...(a.configuration || {}) }, content: r.content, instructionAudioUrl: null, access: { prices: {}, buyable: false } };
    errs = [];
    try { await page.goto(`${SITE}/a/${a.code}?lang=bn`, { waitUntil: "networkidle2", timeout: 240000 }); } catch (e) { errs.push("goto: " + e.message); }
    await sleep(1500);
    const text = await page.evaluate(() => document.body.innerText || "");
    if (/not found|পাওয়া যায়নি|Something went wrong|Unhandled Runtime Error/i.test(text) || text.trim().length < 40) errs.push("page: " + text.slice(0, 80).replace(/\s+/g, " "));
    await page.screenshot({ path: path.join(OUT, `${a.code}.png`) });
    if (errs.length) { bad++; console.log(`✗ ${a.code} p.${a.page} ${a.type} ${a.title}: ${errs.join(" | ")}`); }
  }
  console.log(`${acts.length - bad} of ${acts.length} open with no error (${W}px); screenshots in engine-tests/shots/sweep/`);
  await browser.close();
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
