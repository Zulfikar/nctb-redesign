#!/usr/bin/env node
// প্রাথমিক গণিত, তৃতীয় শ্রেণি (NCTB, 2026 edition), chapters ১–৮ and ১০–১৩ → an Activity Studio activity file
// (ACTIVITIES-bn-rest.json) and its README-rest.md, for the book /b/GVB5V3 ("প্রাথমিক গণিত - ক্লাস থ্রি"). The fraction
// chapter (৯) is ACTIVITIES-bn.json (build.js); the two files are imported one after the other.
//
//   node build-rest.js                 every chapter → ACTIVITIES-bn-rest.json + README-rest.md
//   node build-rest.js --only ch05     one chapter (or ch05,ch06) → .check/only-ch05.json (no README)
//
// The chapters' activities are in rest/chNN.js (helpers: rest/lib.js). Work It Out items carry no answers in the file:
// the server works each one out on import. Each item here carries the survey's answer (CH01-08-PAGES.md,
// CH10-13-PAGES.md), written beside the file in .check/<name>.wants.json, and validate-rest.js compares the server's
// answers with them. Codes (LS + 6) come from a hash of each activity's key, so a rebuild keeps them; none is a code of
// the fraction file or the Class 2 file.
"use strict";
const fs = require("fs");
const path = require("path");
const L = require("./rest/lib");

const ALL = ["ch01", "ch02", "ch03", "ch04", "ch05", "ch06", "ch07", "ch08", "ch10", "ch11", "ch12", "ch13"];
const arg = process.argv.indexOf("--only");
const only = arg > 0 ? process.argv[arg + 1].split(",") : null;
const modules = (only || ALL).filter((m) => {
  if (!ALL.includes(m)) throw new Error(`no chapter ${m}`);
  const f = path.join(__dirname, "rest", `${m}.js`);
  if (fs.existsSync(f)) return true;
  if (only) throw new Error(`rest/${m}.js doesn't exist`);
  console.warn(`(rest/${m}.js not written yet: skipped)`);
  return false;
});
for (const m of modules) {
  L.setModule(m);
  require(`./rest/${m}`)(L);
}

// ───────────────────────────── checks ─────────────────────────────
const built = L.nfc(L.activities).map((a, i) => [a, i]).sort((x, y) => x[0].page - y[0].page || x[1] - y[1]).map(([a]) => a);
const fail = (a, msg) => { throw new Error(`${a._module}: ${a.key} (p.${a.page}): ${msg}`); };
const ASCII = /[0-9]/;
const textsOf = (a) => {
  const c = a.content, t = [a.title];
  if (c.questions) c.questions.forEach((q) => t.push(q.prompt, ...q.options, q.why));
  if (c.pairs) c.pairs.forEach((p) => t.push(p.left, p.right));
  if (c.categories) c.categories.forEach((x) => t.push(x.name));
  if (c.items) c.items.forEach((x) => {
    if (x.text && ["word", "units", "divrem", "chart"].includes(x.kind)) t.push(x.text);
    if (!x.kind && x.text) t.push(x.text); // sequence / categorize
    ["unit", "qUnit", "rUnit"].forEach((f) => x[f] && t.push(x[f]));
    if (x.kind === "tally" || x.kind === "chart") x.rows.forEach((r) => t.push(r.name));
    if (x.kind === "money" && x.items) x.items.forEach((s) => t.push(s.name));
  });
  a.guide.notes.forEach((n) => t.push(n));
  return t;
};
// the user (3 Nov): every activity at least 10 questions (a game's fresh problems count; a match's pairs, a sequence's
// or a sort's items each count one)
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
      if (x.text && x.text.length > 500) fail(a, "a story over 500 characters");
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
const name = only ? `only-${only.join("-")}` : "ACTIVITIES-bn-rest";
const OUT = only ? path.join(__dirname, ".check", `${name}.json`) : path.join(__dirname, `${name}.json`);
const WANTS = path.join(__dirname, ".check", `${name}.wants.json`);
fs.mkdirSync(path.join(__dirname, ".check"), { recursive: true });
const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const file = {
  format: "ebidyaloy-activity-import",
  version: 1,
  book: { title: "প্রাথমিক গণিত - ক্লাস থ্রি", edition: "bn", editionName: "বাংলা", language: "bn", base: true, chapters: L.CONTENTS },
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
console.log(`  ${Object.entries(byType).map(([t, x]) => `${t} ${x.n} (${x.items})`).join(", ")}`);

if (only) process.exit(0);

// ───────────────────────────── README-rest.md ─────────────────────────────
const TYPE_NAME = {
  work_it_out: "Work It Out", find_mistake: "Find the Mistake", equal_groups: "Make Equal Groups", number_line: "Number Line", clock_time: "Clock & Time", taka_shop: "Taka Shop",
  measure_it: "Measure It", shape_patterns: "Shape Patterns", make_shapes: "Make a Shape", units_amounts: "Units & Amounts", tally_chart: "Tally & Pictograph", angles_dots: "Angles & Dot Grid",
  mcq: "Multiple Choice", rapid_quiz: "Rapid Quiz", number_match: "Number Match", equation_match: "Equation Match", sequence: "Sequence", categorize: "Categorize",
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
md.push("# প্রাথমিক গণিত, তৃতীয় শ্রেণি · অধ্যায় ১–৮ ও ১০–১৩: Activity Studio file", "");
md.push("`ACTIVITIES-bn-rest.json` is an **eBidyaloy Activity Studio activity file** (format `ebidyaloy-activity-import`, version 1) for chapters ১–৮ and ১০–১৩ of the NCTB textbook *প্রাথমিক গণিত, তৃতীয় শ্রেণি* (2026 edition). Import it into the book **/b/GVB5V3** (“প্রাথমিক গণিত - ক্লাস থ্রি”, id `6ae830fca87df2fa704174bc`; no language course), before or after the fraction file `ACTIVITIES-bn.json` (chapter ৯): both list the same 13 chapters, so the book's reading order is the same whichever comes first. Every activity comes in as a draft, tied to the printed page it practises; its code (`LS…`) is permanent and can be printed in a QR.", "");
md.push(`- **${built.length} activities**, in Bangla with Bangla digits; no voice is needed.`);
md.push(`- Per type: ${Object.entries(byType).map(([t, x]) => `${TYPE_NAME[t] || t} **${x.n}** (${x.items})`).join(" · ")}`);
md.push(`- Per chapter: ${L.CONTENTS.map((c, i) => [c, built.filter((a) => a.chapter === c).length, i]).filter(([, n]) => n).map(([c, n, i]) => `${L.toBn(i + 1)}: ${n}`).join(" · ")}`, "");
md.push("The Work It Out games (and the tools on its engine) carry **no answers**: the server works every one out when the file is imported. Where a page drills one skill, `configuration.fresh` adds 5 new problems of that skill after the page's own (`{ skill, count, … }`, the skill always written out; `more: true` for the tools' Class 3 rounds).", "");
md.push("Printed page = PDF page − 6.", "");
md.push("## Activities", "");
md.push("| Page | Type | Title | Code | QR | Content | From |", "|---:|---|---|---|---|---|---|");
for (const a of built) md.push(`| ${a.page} | ${TYPE_NAME[a.type] || a.type} | ${a.title} | \`${a.code}\` | ${a.qr} | ${itemsOf(a)} | ${a._src} |`);
md.push("", "## Rebuild and check", "");
md.push("```sh", "cd ~/Downloads/class3-math-activities", "source ~/.nvm/nvm.sh && nvm use 16", "node build-rest.js      # writes ACTIVITIES-bn-rest.json and this README", "node validate-rest.js   # the importer's own checks; the server's answers against the survey's", "```", "");
md.push("Each chapter's activities are in `rest/chNN.js` (helpers in `rest/lib.js`). Every Work It Out item there carries the answer the survey gives (`it(item, answer)`); `validate-rest.js` runs the backend's `checkImportFile` and `importContent` on the file, `normalizeWorkItems` on every game (every item kept with its fields, never marked for checking) and compares the server's answer with the survey's. The few items the survey gives no answer for are marked `mine(item, why)` and listed below. The multiple-choice questions from the book keep its options in its ক–ঘ order with the survey's right letter. Codes come from a hash of each activity's key, so a rebuild keeps them; none is a code of the fraction file, the Class 2 file or any other activity file in ~/Downloads.", "");
md.push("Sources: `CH01-08-PAGES.md` and `CH10-13-PAGES.md` (the page-by-page surveys); the plan `PLAN-ITEM7.md`.", "");
const mineList = [];
for (const a of built) if (a.content.items) a.content.items.forEach((x, i) => { if (x._mine) mineList.push(`p.${a.page} ${a.title} (${i + 1}): ${x._mine}`); });
if (mineList.length) { md.push("## Items the survey gives no answer for (worked out here)", ""); mineList.forEach((m) => md.push(`- ${m}`)); md.push(""); }
md.push("## The book's misprints and the choices made", "");
for (const n of L.NOTES) md.push(`- ${n.text}`);
md.push("", "## What the types can't express", "");
for (const n of L.CANT) md.push(`- ${n.text}`);
md.push("");
fs.writeFileSync(path.join(__dirname, "README-rest.md"), md.join("\n"));
console.log("  README-rest.md written");
