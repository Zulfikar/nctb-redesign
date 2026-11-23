#!/usr/bin/env node
// Checks ACTIVITIES-bn.json with the importer's own code (the backend's activity-import.helper.js and
// work-it-out.helper.js), the way importBookActivities does it: the file (checkImportFile) and every activity's content
// (importContent, the editor's normalizers). Then, for every Fraction Play activity, normalizeWorkItems(items,
// "fraction_play"): every round kept with all its fields, and the server's answer equal to the one worked out here
// (independently of build.js), to the book's where the book prints one, and to the survey's (FRACTION-PAGES.md) where it
// gives one; and workItOutConfig on every fresh block. The codes: LS + 6, none twice, none of the Class 2 file's (nor of
// any other activity file in ~/Downloads). Nothing is written anywhere. Run with Node 16:  node validate.js
"use strict";
const fs = require("fs");
const path = require("path");

const BACKEND = process.env.EB_BACKEND || path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend");
// the helpers (and the models they load) read these globals at require time
global.ebConstants = require(path.join(BACKEND, "src/utils/constants"));
global.ebTimezones = require(path.join(BACKEND, "src/utils/timezones")).GLOBAL_TIMEZONE;
const H = require(path.join(BACKEND, "src/v3/helpers/activity-import.helper.js"));
const W = require(path.join(BACKEND, "src/v3/helpers/work-it-out.helper.js"));

const FILE = path.join(__dirname, "ACTIVITIES-bn.json");
const CLASS2 = path.join(__dirname, "..", "class2-math-activities/ACTIVITIES-bn.json");
const problems = [];
const bad = (at, msg) => problems.push(`${at}: ${msg}`);
const N = (s) => String(s).normalize("NFC");
const BN = "০১২৩৪৫৬৭৮৯";
const asc = (s) => String(s).replace(/[০-৯]/g, (d) => String(BN.indexOf(d)));
const same = (x, y) => JSON.stringify(x) === JSON.stringify(y);

// ── our own working of a round's answer (the rules of the brief, written here on their own) ──
const F = (s) => (s === "1" ? [1, 1] : s.split("/").map(Number));
function ours(it) {
  switch (it.kind) {
    case "fshade": return it.n;
    case "fpick": return `${it.n}/${it.d}`;
    case "fname": return [it.n, it.d];
    case "fcut": return [it.d, it.n];
    case "fwhole": return [it.d - it.n, it.d];
    case "fline": return it.ask === "place" ? it.n : [it.n, it.d];
    case "fequiv": { const [a, b] = [F(it.a), F(it.b)]; return a[0] * b[1] === b[0] * a[1] ? "yes" : "no"; }
    case "fcompare": { const [a, b] = [F(it.a), F(it.b)]; const l = a[0] * b[1], r = b[0] * a[1]; return l < r ? "<" : l > r ? ">" : "="; }
    case "fsame": return (it.n * it.d2) / it.d;
    case "fadd": { const b = F(it.b), a = it.a === "1" ? [b[1], b[1]] : F(it.a); return [it.op === "+" ? a[0] + b[0] : a[0] - b[0], b[1]]; }
    case "fgroup": return (it.total / it.d) * it.n;
    default: return undefined;
  }
}

// ── the answers the BOOK prints (FRACTION-PAGES.md "Printed") and the survey's own ("Ans"), by round ──
// a round's signature; an answer "1" means "one whole" (the top equals the bottom: 5/5 = ১)
const sig = (it) => ({ fadd: () => `${it.a}${it.op === "+" ? "+" : "-"}${it.b}`, fcompare: () => `${it.a}?${it.b}`, fequiv: () => `${it.a}~${it.b}`, fsame: () => `${it.n}/${it.d}=?/${it.d2}`, fline: () => `line ${it.n}/${it.d}`, fname: () => `name ${it.n}/${it.d}`, fpick: () => `pick ${it.n}/${it.d}`, fshade: () => `shade ${it.n}/${it.d}`, fcut: () => `cut ${it.n}/${it.d}` }[it.kind] || (() => null))();
const BOOK = [
  ["1/2?2/4", "=", "p.97 অনুশীলন ৯ “1/2 ও 2/4 একই”"], ["2/2?4/4", "=", "p.97 অনুশীলন ৯ “2/2 ও 4/4 একই”"],
  ["1/2=?/4", "2/4", "p.98"], ["1/2=?/6", "3/6", "p.98"], ["1/2=?/8", "4/8", "p.98"], ["1/2=?/10", "5/10", "p.98"],
  ["2/3=?/6", "4/6", "p.99 কাজ ৩"], ["2/3=?/9", "6/9", "p.99 কাজ ৩"], ["3/4~9/12", "yes", "p.99 কাজ ৪ ✓"],
  ["2/5+3/5", "5/5", "p.100 কাজ ১ “5/5 = ১”"], ["1-3/4", "1/4", "p.102 কাজ ১"], ["name 2/3", "2/3", "p.95 box “2/3 মিটার”"], ["pick 1/5", "1/5", "p.105 নিজে করি ৪ example"],
  // 3 Nov (at least 10 questions): the pages print these fractions
  ["name 1/2", "1/2", "p.92 box “অর্ধেক 1/2”"], ["name 1/3", "1/3", "p.95 box “1/3 মিটার”"], ["name 3/3", "3/3", "p.96 “3/3 মিটার”"],
  ["name 4/5", "4/5", "p.96 অনুশীলন ৫ (১)"], ["name 1/7", "1/7", "p.96 অনুশীলন ৫ (২)"], ["name 5/8", "5/8", "p.96 অনুশীলন ৫ (৩)"], ["name 7/9", "7/9", "p.96 অনুশীলন ৫ (৪)"],
  ["1/2~2/4", "yes", "p.97 অনুশীলন ৯ “1/2 ও 2/4 একই”"],
];
const SURVEY = [
  // p.100–101
  ["3/5+1/5", "4/5"], ["3/7+2/7", "5/7"], ["1/3+2/3", "3/3"], ["1/4+2/4", "3/4"], ["2/5+2/5", "4/5"], ["3/4+1/4", "4/4"], ["3/7+1/7", "4/7"], ["1/5+4/5", "5/5"],
  ["5/6+1/6", "6/6"], ["3/8+5/8", "8/8"], ["5/7+2/7", "7/7"], ["1/9+8/9", "9/9"], ["4/8+3/8", "7/8"], ["4/9+3/9", "7/9"], ["1/7+3/7", "4/7"], ["1/5+3/5", "4/5"],
  ["5/8+2/8", "7/8"], ["5/10+3/10", "8/10"],
  // p.102–103
  ["4/5-2/5", "2/5"], ["7/8-2/8", "5/8"], ["1-1/2", "1/2"], ["2/3-1/3", "1/3"], ["3/4-1/4", "2/4"], ["1-1/5", "4/5"], ["5/6-3/6", "2/6"], ["4/7-3/7", "1/7"],
  ["1-3/8", "5/8"], ["7/9-2/9", "5/9"], ["7/8-3/8", "4/8"], ["1-4/9", "5/9"], ["8/9-2/9", "6/9"], ["5/9-4/9", "1/9"], ["4/5-3/5", "1/5"], ["5/7-3/7", "2/7"], ["6/11-5/11", "1/11"],
  // p.104 (৭), p.105 নিজে করি ২ (b)
  ["3/8+2/8", "5/8"], ["3/5+3/5", "6/5"],
  // p.106 নিজে করি ৭ (the survey writes the wholes as 1), ৮, ৯–১১
  ["1/3+2/3", "1"], ["3/4+1/4", "1"], ["3/5+1/5", "4/5"], ["1/4+1/4", "2/4"], ["3/5+2/5", "1"], ["1/6+5/6", "1"], ["5/7+1/7", "6/7"], ["2/8+5/8", "7/8"],
  ["4/7+3/7", "1"], ["1/9+5/9", "6/9"], ["5/8+3/8", "1"], ["7/9+1/9", "8/9"],
  ["1-1/3", "2/3"], ["5/6-1/6", "4/6"], ["3/5-1/5", "2/5"], ["1-1/7", "6/7"], ["3/6-2/6", "1/6"], ["5/7-3/7", "2/7"], ["5/8-2/8", "3/8"], ["1-5/8", "3/8"],
  ["8/9-3/9", "5/9"], ["7/8-1/8", "6/8"], ["1-7/9", "2/9"], ["7/9-2/9", "5/9"], ["7/10+3/10", "10/10"], ["4/7-3/7", "1/7"],
  // compare: p.97 অনুশীলন ৭ (৩) (3/5 মিটার is longer), p.99 অনুশীলন ১২, p.105 নিজে করি ২ (d) (১)
  ["2/5?3/5", "<"], ["1/3?2/3", "<"], ["2/5?4/5", "<"], ["7/8?5/8", ">"], ["1?6/7", ">"], ["4/4?1", "="],
  // equivalent or not: p.99 অনুশীলন ১০, কাজ ৪; p.106 নিজে করি ৬; p.105 নিজে করি ২ (c)
  ["2/4~3/6", "yes"], ["3/6~4/8", "yes"], ["3/8~5/10", "no"], ["4/8~5/10", "yes"], ["2/5~3/10", "no"], ["4/6~8/12", "yes"], ["3/5~9/10", "no"],
  ["1/4~4/16", "yes"], ["2/7~6/21", "yes"], ["3/8~6/24", "no"], ["3/8~5/12", "no"], ["1/7~3/21", "yes"], ["4/8~2/4", "yes"],
  // same amount: p.99 অনুশীলন ১১ (2/6, 3/9; 2/8, 3/12), কাজ ৩ (2/3: 8/12), p.105 নিজে করি ৫
  ["1/3=?/6", "2/6"], ["1/3=?/9", "3/9"], ["1/4=?/8", "2/8"], ["1/4=?/12", "3/12"], ["2/3=?/12", "8/12"],
  ["1/2=?/4", "2/4"], ["1/2=?/6", "3/6"], ["1/2=?/8", "4/8"], ["3/4=?/8", "6/8"], ["3/4=?/12", "9/12"], ["2/3=?/6", "4/6"], ["2/3=?/9", "6/9"], ["5/6=?/12", "10/12"],
  // the number line: p.97 অনুশীলন ৭ (১)–(২), ৮
  ["line 1/5", "1/5"], ["line 2/5", "2/5"], ["line 3/5", "3/5"], ["line 4/5", "4/5"], ["line 5/5", "5/5"], ["line 2/7", "2/7"], ["line 5/7", "5/7"],
  // name it: p.95 অনুশীলন ১, p.96 অনুশীলন ৩ (২), ৬, p.105 নিজে করি ২ (a), ৩; pick: নিজে করি ৪'s bars
  ["name 1/4", "1/4"], ["name 1/5", "1/5"], ["name 4/4", "4/4"], ["name 3/5", "3/5"], ["name 5/9", "5/9"], ["name 7/13", "7/13"], ["name 7/11", "7/11"], ["name 9/17", "9/17"], ["name 5/12", "5/12"],
  ["pick 3/4", "3/4"], ["pick 2/3", "2/3"], ["pick 1/6", "1/6"], ["pick 3/5", "3/5"],
  // shade and cut, as the pages ask: p.92 অনুশীলন ২ (1/2), p.93 কাজ ১ (1/4), p.95 অনুশীলন ২ (1/3), p.96 অনুশীলন ৪ (3/5, 7/8);
  // p.91 কাজ ১ and p.92 কাজ ২ (সমান দুই ভাগ), p.93 মূল প্রশ্ন (৪ ভাগ, ১টি), p.95 মূল প্রশ্ন (৩ ভাগ)
  ["shade 1/2", "1/2"], ["shade 1/4", "1/4"], ["shade 1/3", "1/3"], ["shade 3/5", "3/5"], ["shade 7/8", "7/8"], ["cut 1/2", "1/2"], ["cut 1/4", "1/4"], ["cut 1/3", "1/3"],
];
// the only rounds neither the book nor the survey answers (any other round missing from both lists is a mistake here):
// p.91's roti as a pick round (the page discusses it), and three open cells whose bottoms are mine
const UNSURVEYED = ["pick 1/2", "1/3=?/12", "3/5=?/10", "1/6=?/12"];
// does the server's answer `got` of round `it` say what `want` says?
function agrees(it, got, want) {
  switch (it.kind) {
    case "fadd": return want === "1" ? got[0] === got[1] : same(got, F(want));
    case "fsame": { const [n, d] = F(want); return d === it.d2 && got === n; }
    case "fline": case "fname": return same(got, F(want));
    case "fpick": return got === want;
    case "fshade": return same([got, it.d], F(want));
    case "fcut": { const [n, d] = F(want); return same(got, [d, n]); }
    default: return got === want; // compare, equivalent
  }
}

// ── the file ──
const file = JSON.parse(fs.readFileSync(FILE, "utf8"));
for (const p of H.checkImportFile(file)) problems.push(`file: ${p}`);
const b = file.book || {};
if (b.teachLanguage || b.helpLanguage || b.accent) bad("book", "has a language-course field (teachLanguage / helpLanguage / accent)");
if (b.language !== "bn" || b.base !== true || b.edition !== "bn") bad("book", "language / base / edition");
if (b.title !== N("প্রাথমিক গণিত - ক্লাস থ্রি")) bad("book", `title ${b.title}`);
if (!Array.isArray(b.chapters) || !b.chapters.includes(N("অধ্যায় ৯ · ভগ্নাংশ"))) bad("book", "chapter ৯ isn't in its chapters");

// the codes of the Class 2 file (must) and of every other activity file in ~/Downloads
function activityFiles(dir, depth) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "node_modules") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory() && depth > 0) { try { out = out.concat(activityFiles(p, depth - 1)); } catch (err) { /* unreadable */ } }
    else if (e.isFile() && /^ACTIVITIES.*\.json$/.test(e.name) && path.resolve(p) !== path.resolve(FILE)) out.push(p);
  }
  return out;
}
const others = activityFiles(path.join(process.env.HOME, "Downloads"), 5);
const taken = new Map(); // code → file
for (const f of others) { try { for (const a of JSON.parse(fs.readFileSync(f, "utf8")).activities || []) if (a && a.code) taken.set(String(a.code).toUpperCase(), f); } catch (err) { /* not JSON */ } }
const class2Codes = new Set(JSON.parse(fs.readFileSync(CLASS2, "utf8")).activities.map((a) => a.code));

const seen = { key: new Set(), code: new Set(), qr: new Set() };
const count = (c) => (c.pairs || c.questions || c.items || []).length;
const tally = { fp: 0, rounds: 0, book: 0, survey: 0, fresh: 0, mcq: 0, pairs: 0 };
const unchecked = [];
const kindsUsed = {};
for (const a of file.activities) {
  const at = `${a.key} (p.${a.page}, ${a.type})`;
  if (!(a.type in H.IMPORT_TYPES)) bad(at, "type can't be imported");
  if (!H.IMPORT_CODE_RE.test(a.code)) bad(at, `code ${a.code}`);
  if (class2Codes.has(a.code)) bad(at, `code ${a.code} is the Class 2 file's`);
  else if (taken.has(a.code)) bad(at, `code ${a.code} is in ${taken.get(a.code)}`);
  for (const f of ["key", "code", "qr"]) { if (seen[f].has(a[f])) bad(at, `${f} twice`); seen[f].add(a[f]); }
  if (!a.key || a.key.length > 60) bad(at, "key");
  if (!a.title || a.title.length > 200) bad(at, "title");
  if (!b.chapters.includes(a.chapter) || a.chapter !== N("অধ্যায় ৯ · ভগ্নাংশ")) bad(at, `chapter "${a.chapter}"`);
  if (!(a.page >= 91 && a.page <= 106)) bad(at, `page ${a.page}`);
  // the guide (what to add by hand): its notes and pictures as written (cleanGuide adds an empty emoji and file to a picture)
  const g = H.cleanGuide(a.guide);
  if (!same(g.notes, a.guide.notes) || g.audio !== null || !same(g.pictures.map(({ item, subject }) => ({ item, subject })), a.guide.pictures)) bad(at, "the guide isn't kept as written");
  const r = H.importContent(a.type, a.content);
  if (r.error) { bad(at, r.error); continue; }
  if (count(r.content) !== count(a.content)) bad(at, `${count(a.content)} in, ${count(r.content)} kept`);

  if (a.type === "mcq") {
    tally.mcq += a.content.questions.length;
    r.content.questions.forEach((q, i) => {
      const s = a.content.questions[i];
      if (q.prompt !== s.prompt || q.answer !== s.answer || q.options.join("|") !== s.options.join("|") || (q.why || "") !== s.why) bad(at, `question ${i + 1} changed`);
    });
    if (r.content.mode !== "mcq") bad(at, `mode ${r.content.mode}`);
  }
  if (a.type === "number_match") {
    tally.pairs += a.content.pairs.length;
    r.content.pairs.forEach((p, i) => { const s = a.content.pairs[i]; if (p.left !== s.left || p.right !== s.right) bad(at, `pair ${i + 1} changed`); });
  }
  if (a.type === "fraction_play") {
    tally.fp++; tally.rounds += a.content.items.length;
    // the importer's items are normalizeWorkItems(items, "fraction_play")'s
    const kept = W.normalizeWorkItems(a.content.items, "fraction_play");
    if (!same(kept, r.content.items)) bad(at, "importContent and normalizeWorkItems differ");
    if (kept.length !== a.content.items.length) bad(at, `${a.content.items.length} rounds in, ${kept.length} kept`);
    kept.forEach((it, i) => {
      const s = a.content.items[i];
      if (!s) return;
      kindsUsed[s.kind] = (kindsUsed[s.kind] || 0) + 1;
      // every field as written
      for (const [k, v] of Object.entries(s)) if (!same(it[k], v)) bad(at, `round ${i + 1} ${k} ${JSON.stringify(v)} became ${JSON.stringify(it[k])}`);
      if (it.check) bad(at, `round ${i + 1} marked for checking`);
      // the server's answer = ours
      const mine = ours(s);
      if (!same(mine, it.answer)) bad(at, `round ${i + 1} (${sig(s) || s.kind}): the server says ${JSON.stringify(it.answer)}, we say ${JSON.stringify(mine)}`);
      // = the book's printed answer, and the survey's
      const k = sig(s);
      const book = BOOK.filter(([x]) => x === k), survey = SURVEY.filter(([x]) => x === k);
      for (const [, want, where] of book) if (agrees(s, it.answer, want)) tally.book++; else bad(at, `round ${i + 1} (${k}): the book prints ${want} (${where}), the server says ${JSON.stringify(it.answer)}`);
      for (const [, want] of survey) if (!agrees(s, it.answer, want)) bad(at, `round ${i + 1} (${k}): the survey says ${want}, the server says ${JSON.stringify(it.answer)}`);
      if (survey.length) tally.survey++;
      if (!book.length && !survey.length) {
        if (UNSURVEYED.includes(k)) unchecked.push(`p.${a.page} ${k}`);
        else bad(at, `round ${i + 1} (${k || s.kind}) is neither in the book's answers nor in the survey's: a typing slip?`);
      }
    });
    // fresh rounds: kept as written (the importer keeps the configuration as it is; the editor's settings normalise to it)
    const f = a.configuration && a.configuration.fresh;
    if (f) {
      tally.fresh++;
      const cfg = W.workItOutConfig(a.configuration, "fraction_play").fresh;
      for (const [k, v] of Object.entries(f)) if (cfg[k] !== v) bad(at, `fresh.${k} ${v} became ${cfg[k]}`);
      if (!f.skill || !W.WIO_TYPES.fraction_play.skills.includes(f.skill)) bad(at, `fresh skill ${f.skill}`);
      if (f.skill !== "fraction" && !a.content.items.some((it) => it.kind === f.skill)) bad(at, `fresh ${f.skill}, but the page's rounds aren't`);
      if (!(f.count >= 5 && f.count <= 10)) bad(at, `fresh count ${f.count}`);
    }
  }
}

// ── the multiple choice and the matches against the survey (FRACTION-PAGES.md) ──
const act = (key) => file.activities.find((a) => a.key === key) || {};
const right = (q) => q.options[q.answer];
{
  // p.104 নিজে করি ১: the book's options in its order; the survey's answers গ, ক, খ, গ, খ, ঘ, ঘ, ঘ
  const qs = (act("m3-p104-tick-right-answer").content || {}).questions || [];
  const want = [2, 0, 1, 2, 1, 3, 3, 3];
  if (qs.length !== 10) bad("p.104 নিজে করি ১", `${qs.length} questions (the book's 8 and two more)`);
  qs.slice(0, 8).forEach((q, i) => { if (q.options.length !== 4 || q.answer !== want[i]) bad("p.104 নিজে করি ১", `(${i + 1}) answer ${"কখগঘ"[q.answer]}, the survey ${"কখগঘ"[want[i]]}`); });
  // p.92–94: the survey's answers
  const p94 = (act("m3-p094-half-quarter").content || {}).questions || [];
  const expect94 = [["ক এর", (o) => asc(o).startsWith("2 ")], ["দুইটি", (o) => o === "১"], ["চারটি", (o) => o === "১"], ["তিন টুকরা", (o) => o === N("বড়ো")], ["দুই টুকরা", (o) => o === "সমান"], ["১/৪ হলো", (o) => o === N("ছোটো")], ["মিনা", (o) => o.startsWith("না")]];
  for (const [part, ok] of expect94) { const q = p94.find((x) => x.prompt.includes(N(part))); if (!q || !ok(right(q))) bad("p.94 multiple choice", `“${part}…”: ${q ? right(q) : "missing"}`); }
  // p.96: the লব is the top, the হর the bottom
  for (const q of ((act("m3-p096-numerator-denominator").content || {}).questions || [])) {
    const m = /^(\d+)\/(\d+) ভগ্নাংশে লব/.exec(asc(q.prompt));
    if (m && asc(right(q)) !== N(`লব ${m[1]}, হর ${m[2]}`)) bad("p.96 multiple choice", `${q.prompt}: ${right(q)}`);
    if (!m && !(asc(q.prompt).includes("3 ও 7") ? right(q) === "লব" : asc(q.prompt).includes("5 ও 8") && right(q) === "হর")) bad("p.96 multiple choice", `${q.prompt}: ${right(q)}`);
  }
  // the matches: the book's words for fractions (FRACTION-PAGES.md §3, exact spellings)
  const NAMES = { "১/২": "অর্ধেক", "১/৪": "এক চতুর্থাংশ", "১/৩ মিটার": "১ মিটারের এক তৃতীয়াংশ", "২/৩ মিটার": "১ মিটারের দুই-তৃতীয়াংশ", "৩/৩ মিটার": "১ মিটার",
    "১/৩": "এক তৃতীয়াংশ", "২/৩": "দুই-তৃতীয়াংশ", "১/২ মিটার": "১ মিটারের অর্ধেক", "১/৪ মিটার": "১ মিটারের এক চতুর্থাংশ", "৪/৪": "১" };
  const names = (act("m3-p095-names").content || {}).pairs || [];
  if (names.length !== Object.keys(NAMES).length || names.some((p) => N(NAMES[p.left] || "") !== p.right)) bad("p.95 match", "the names aren't the book's");
  const WORD = { এক: 1, দুই: 2, তিন: 3, চার: 4, পাঁচ: 5, [N("ছয়")]: 6 };
  for (const p of ((act("m3-p105-words").content || {}).pairs || [])) {
    const m = /^(\S+) ভাগের (\S+) ভাগ$/.exec(p.right), [n, d] = asc(p.left).split("/").map(Number);
    if (!m || WORD[m[1]] !== d || WORD[m[2]] !== n) bad("p.105 match", `${p.left} ↔ ${p.right}`);
  }
  // the book's spellings: এক চতুর্থাংশ / এক তৃতীয়াংশ without a hyphen, দুই-তৃতীয়াংশ with one
  const text = JSON.stringify(file.activities);
  for (const wrong of ["এক-চতুর্থাংশ", "এক-তৃতীয়াংশ", "দুই তৃতীয়াংশ"]) if (text.includes(N(wrong))) bad("spelling", `“${wrong}” in the file`);
}

if (problems.length) { console.log(`${problems.length} problem(s):`); problems.forEach((p) => console.log(`  - ${p}`)); process.exit(1); }
console.log(`OK ACTIVITIES-bn.json: ${file.activities.length} activities; checkImportFile and importContent found no problem, and the normalizers kept every question, pair and round as written.`);
console.log(`  Fraction Play: ${tally.fp} activities, ${tally.rounds} rounds (${Object.entries(kindsUsed).map(([k, n]) => `${k} ${n}`).join(", ")}); normalizeWorkItems(items, "fraction_play") kept every round with all its fields, and every answer the server worked out equals ours.`);
console.log(`  Against the book's printed answers: ${tally.book} rounds agree; against the survey's: ${tally.survey} rounds agree. In neither (worked out here only): ${unchecked.length} (${unchecked.join("; ")}).`);
console.log(`  Fresh rounds: ${tally.fresh} activities; workItOutConfig keeps each one's skill, count and den as written.`);
console.log(`  Multiple choice: ${tally.mcq} questions; matches: ${tally.pairs} pairs; their answers agree with the survey and the book's spellings.`);
console.log(`  Codes: ${seen.code.size}, none twice, none of the Class 2 file's ${class2Codes.size}, nor any of the ${taken.size} codes in the ${others.length} other activity files in ~/Downloads (the Class 2 files among them).`);
process.exit(0); // the required models keep handles open
