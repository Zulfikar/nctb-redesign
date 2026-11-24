#!/usr/bin/env node
// প্রাথমিক গণিত, চতুর্থ শ্রেণি (NCTB, 2026 edition): the Activity Studio file for /b/KZT9KF (part B, 24 Nov 2026). At least
// one game on every page that has something to practise, each at least 10 questions (fresh problems counted); the
// book's maths errors corrected (each one a note()). Read BRIEF.md first.
//
//   node build.js                     every range → ACTIVITIES-bn.json + README.md (+ .check/ACTIVITIES-bn.wants.json)
//   node build.js --only p004-022     one range (or several, comma-separated) → .check/only-p004-022.json (no README)
//
// The ranges' activities are in pages/pNNN-NNN.js (module.exports = (L) => { … }, the helpers in lib.js); a page that
// really has nothing to play says so with L.skipPage(page, why). Game rounds carry no answers in the file: the server
// works each one out on import; each round here carries ours, written beside the file in .check/<name>.wants.json, and
// validate.js compares the server's answers with them. Codes (LS + 6) come from a hash of each activity's key, so a
// rebuild keeps them; none is a code of the Class 2 or Class 3 files.
"use strict";
require("./engine-tests/globals.cjs"); // (the server's helpers want the backend's globals)
const fs = require("fs");
const path = require("path");
const L = require("./lib");

const DIR = path.join(__dirname, "pages");
const ALL = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => /^p\d{3}-\d{3}\.js$/.test(f)).map((f) => f.slice(0, -3)).sort() : [];
const arg = process.argv.indexOf("--only");
const only = arg > 0 ? process.argv[arg + 1].split(",") : null;
const modules = (only || ALL).filter((m) => { if (!ALL.includes(m)) throw new Error(`no range pages/${m}.js`); return true; });
for (const m of modules) { L.setModule(m); require(`./pages/${m}`)(L); }

// ───────────────────────────── checks ─────────────────────────────
const built = L.nfc(L.activities).map((a, i) => [a, i]).sort((x, y) => x[0].page - y[0].page || x[1] - y[1]).map(([a]) => a);
const fail = (a, msg) => { throw new Error(`${a._module}: ${a.key} (p.${a.page}): ${msg}`); };
const ASCII = /[0-9]/;
const MATH_TEXT = ["missing", "truth", "opbox", "expr"];
const textsOf = (a) => {
  const c = a.content, t = [a.title];
  if (c.questions) c.questions.forEach((q) => t.push(q.prompt, ...q.options, q.why));
  if (c.pairs) c.pairs.forEach((p) => t.push(p.left, p.right));
  if (c.categories) c.categories.forEach((x) => t.push(x.name));
  if (c.items) c.items.forEach((x) => {
    if (typeof x.text === "string" && (!x.kind || !MATH_TEXT.includes(x.kind))) t.push(x.text);
    if (typeof x.story === "string") t.push(x.story);
    ["unit", "qUnit", "rUnit"].forEach((f) => typeof x[f] === "string" && t.push(x[f]));
    if ((x.kind === "tally" || x.kind === "chart") && Array.isArray(x.rows)) x.rows.forEach((r) => t.push(r.name));
    if (x.kind === "money" && x.items) x.items.forEach((s) => t.push(s.name));
  });
  a.guide.notes.forEach((n) => t.push(n));
  return t;
};
const MIN_QUESTIONS = 10;
const questionsOf = (a) => (a.content.items || a.content.pairs || a.content.questions).length + (L.WIO_TYPES.includes(a.type) && a.configuration.fresh ? a.configuration.fresh.count : 0);
const short = built.filter((a) => questionsOf(a) < MIN_QUESTIONS);
if (short.length) throw new Error(`${short.length} activities under ${MIN_QUESTIONS} questions:\n${short.map((a) => `  ${a._module} ${a.key}: ${questionsOf(a)}`).join("\n")}`);
for (const a of built) {
  if (a.chapter !== L.chapterOf(a.page)) fail(a, "chapter");
  for (const t of textsOf(a)) if (ASCII.test(t)) fail(a, `an ASCII digit in "${t}"`);
  const c = a.content;
  if (c.questions) for (const q of c.questions) {
    if (new Set(q.options).size !== q.options.length) fail(a, `an option twice: ${q.prompt}`);
    if (q.options.some((o) => o.length > 60)) fail(a, `an option over 60 characters: ${q.prompt}`);
    if (q.why.length > 160) fail(a, `why over 160 characters (${q.why.length}): ${q.prompt}`);
  }
  if (c.items && L.WIO_TYPES.includes(a.type)) {
    const seen = new Set();
    for (const x of c.items) {
      const k = JSON.stringify(x, (f, v) => (f.startsWith("_") ? undefined : v));
      if (seen.has(k)) fail(a, `an item twice: ${k}`);
      seen.add(k);
      if (typeof x.text === "string" && x.text.length > 500) fail(a, "a story over 500 characters");
    }
  }
}
const keys = new Set(), codes = new Set(), qrs = new Set();
for (const a of built) {
  if (keys.has(a.key) || a.key.length > 60) fail(a, "key"); keys.add(a.key);
  if (codes.has(a.code) || L.OTHER_CODES.has(a.code) || !/^LS[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/.test(a.code)) fail(a, "code"); codes.add(a.code);
  if (qrs.has(a.qr)) fail(a, "qr"); qrs.add(a.qr);
}

// ───────────────────────────── write ─────────────────────────────
const name = only ? `only-${only.join("-")}` : "ACTIVITIES-bn";
const OUT = only ? path.join(__dirname, ".check", `${name}.json`) : path.join(__dirname, `${name}.json`);
const WANTS = path.join(__dirname, ".check", `${name}.wants.json`);
fs.mkdirSync(path.join(__dirname, ".check"), { recursive: true });
const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const file = {
  format: "ebidyaloy-activity-import",
  version: 1,
  book: { title: L.N("প্রাথমিক গণিত - চতুর্থ শ্রেণি"), edition: "bn", editionName: "বাংলা", language: "bn", base: true, chapters: L.CONTENTS },
  activities: built,
};
fs.writeFileSync(OUT, JSON.stringify(file, strip, 2) + "\n");
const wants = {};
for (const a of built) if (a.content.items && L.WIO_TYPES.includes(a.type)) wants[a.key] = { module: a._module, items: a.content.items.map((x) => (x._mine ? { mine: x._mine } : { want: x._want })) };
fs.writeFileSync(WANTS, JSON.stringify(wants, null, 1) + "\n");

const countOf = (a) => (a.content.items || a.content.pairs || a.content.questions).length;
const byType = {};
for (const a of built) { const t = (byType[a.type] = byType[a.type] || { n: 0, items: 0 }); t.n++; t.items += countOf(a); }
console.log(`${built.length} activities (${modules.join(", ")}) → ${path.relative(__dirname, OUT)}`);
const range = only ? only.map((m) => m.slice(1).split("-").map(Number)) : [[1, L.LAST_PAGE]];
const withGame = new Set(built.map((a) => a.page)), noGame = [];
for (const [p0, p1] of range) for (let p = p0; p <= p1; p++) if (!withGame.has(p)) noGame.push(p);
console.log(noGame.length ? `  pages without a game: ${noGame.map((p) => `${p}${L.SKIPS[p] ? "" : "(?)"}`).join(" ")}` : "  every page has a game");
const unexplained = noGame.filter((p) => !L.SKIPS[p]);
if (unexplained.length) console.log(`  ✗ ${unexplained.length} page(s) without a game and without skipPage(): ${unexplained.join(" ")}`);
console.log(`  ${Object.entries(byType).map(([t, x]) => `${t} ${x.n} (${x.items})`).join(", ")}`);
if (only) process.exit(0);

// ───────────────────────────── README.md ─────────────────────────────
const TYPE_NAME = {
  work_it_out: "Work It Out", find_mistake: "Find the Mistake", equal_groups: "Make Equal Groups", number_line: "Number Line", clock_time: "Clock & Time", taka_shop: "Taka Shop",
  measure_it: "Measure It", shape_patterns: "Shape Patterns", make_shapes: "Make a Shape", fraction_play: "Fraction Play", units_amounts: "Units & Amounts", tally_chart: "Tally & Pictograph", angles_dots: "Angles & Dot Grid",
  mcq: "Multiple Choice", rapid_quiz: "Rapid Quiz", number_match: "Number Match", equation_match: "Equation Match", sequence: "Sequence", categorize: "Categorize", true_false: "True / False",
};
const itemsOf = (a) => {
  const c = a.content;
  if (L.WIO_TYPES.includes(a.type)) {
    const k = {};
    c.items.forEach((x) => { const w = x.kind + (x.ask && !["read", "row", "parts", "name"].includes(x.ask) ? ` ${x.ask}` : ""); k[w] = (k[w] || 0) + 1; });
    const f = a.configuration.fresh;
    return `${c.items.length} items (${Object.entries(k).map(([x, n]) => `${n} ${x}`).join(", ")})${f ? ` + ${f.count} fresh ${f.skill}` : ""}`;
  }
  return c.pairs ? `${c.pairs.length} pairs` : c.questions ? `${c.questions.length} questions` : c.categories ? `${c.categories.length} groups, ${c.items.length} items` : `${c.items.length} items`;
};
const md = [];
md.push("# প্রাথমিক গণিত, চতুর্থ শ্রেণি: Activity Studio file", "");
md.push("`ACTIVITIES-bn.json` is an **eBidyaloy Activity Studio activity file** (format `ebidyaloy-activity-import`, version 1) for the NCTB textbook *প্রাথমিক গণিত, চতুর্থ শ্রেণি* (2026 edition), our redesign (`../class4-math-redesign`). Import it into **/b/KZT9KF** («প্রাথমিক গণিত - চতুর্থ শ্রেণি», `6b04312d5fcd48cf553725fd`; no language course; **after the website and server with part A are deployed**: many games use the new rounds). Every activity comes in as a draft, tied to the printed page it practises; its code (`LS…`) is permanent and is printed in the page's QR.", "");
md.push(`- **${built.length} activities** in ${L.CONTENTS.length} chapters, in Bangla with Bangla digits; no voice and no AI pictures.`);
md.push(`- Per type: ${Object.entries(byType).map(([t, x]) => `${TYPE_NAME[t] || t} **${x.n}**`).join(" · ")}`);
md.push(noGame.length ? `- **Pages without a game:** ${noGame.map((p) => `p.${p} (${L.SKIPS[p] || "?"})`).join(" · ")}` : "- **Every page from 1 to 174 has a game.**", "");
md.push("Printed page = PDF page − 7 (printed p.1 is PDF p.8). Game rounds carry **no answers**: the server works every one out on import (`validate.js` checks it equals ours, which is the book's where it prints one).", "");
md.push("## Importing it", "");
md.push("1. **Deploy first** the website and server with part A (the new rounds: long division, factors and primes, mixed numbers, dates, the protractor, lines and triangles…). On a server without them, the import drops those rounds.");
md.push("2. **Check the codes are still free** (read-only): `node tools/codes-live.js` (24 Nov: all 255 free; /b/KZT9KF had 0 activities).");
md.push("3. **Import** into /b/KZT9KF (Activity Studio → the book → Import, as with Class 3). The 11 chapters come with it; every game arrives as a draft.");
md.push("4. **Publish** (per chapter: \"Publish all\"), then **Replace PDF** with `../class4-math-redesign/class4-math-book.pdf` (the one with the page QRs).");
md.push("5. **Android:** the app plays the new rounds only after its port (not done yet); iPhone plays them in its web view.", "");
md.push("## Activities", "", "| Page | Type | Title | Code | QR | Content | From |", "|---:|---|---|---|---|---|---|");
for (const a of built) md.push(`| ${a.page} | ${TYPE_NAME[a.type] || a.type} | ${a.title} | \`${a.code}\` | ${a.qr} | ${itemsOf(a)} | ${String(a._src).replace(/\|/g, "/")} |`);
md.push("", "## Rebuild and check", "", "```sh", "cd ~/Downloads/NCTB-Redesigned/class4-math-activities", "source ~/.nvm/nvm.sh && nvm use 16", "node build.js      # writes ACTIVITIES-bn.json and this README", "node validate.js   # the importer's own checks, the server's answers against ours", "```", "");
if (L.NOTES.length) { md.push("## The book's errors corrected, and choices made", ""); for (const n of L.NOTES) md.push(`- (${n.module}) ${n.text}`); md.push(""); }
if (L.CANT.length) { md.push("## What the game types can't express", ""); for (const n of L.CANT) md.push(`- (${n.module}) ${n.text}`); md.push(""); }
fs.writeFileSync(path.join(__dirname, "README.md"), md.join("\n") + "\n");
console.log("  README.md written");
