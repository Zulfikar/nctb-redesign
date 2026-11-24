#!/usr/bin/env node
// Checks the Class 4 file ACTIVITIES-bn.json (or the file named: node validate.js .check/only-p004-022.json) with the importer's
// own code, the way importBookActivities does it: the file (checkImportFile) and every activity's content
// (importContent). Then every Work It Out game (and the tools on its engine): normalizeWorkItems(items, type) keeps
// every item with its fields as written, marks none for checking, and its answer equals the survey's (the build's
// .check/<name>.wants.json, the BUILD's answers); workItOutConfig keeps every fresh block's settings. The questions, pairs, orders and sorts
// are kept as written. The codes: LS + 6, none twice, none in any other activity file in ~/Downloads. Nothing is
// written anywhere. Run with Node 16.
"use strict";
const fs = require("fs");
const path = require("path");

const BACKEND = process.env.EB_BACKEND || path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend");
global.ebConstants = require(path.join(BACKEND, "src/utils/constants"));
global.ebTimezones = require(path.join(BACKEND, "src/utils/timezones")).GLOBAL_TIMEZONE;
const H = require(path.join(BACKEND, "src/v3/helpers/activity-import.helper.js"));
const W = require(path.join(BACKEND, "src/v3/helpers/work-it-out.helper.js"));
// the server drops a round it can't ask: a game whose rounds come back fewer is reported below
const L = require("./lib");

const FILE = path.resolve(process.argv[2] || path.join(__dirname, "ACTIVITIES-bn.json"));
const WANTS = path.join(__dirname, ".check", `${path.basename(FILE, ".json")}.wants.json`);
const problems = [];
const bad = (at, msg) => problems.push(`${at}: ${msg}`);
const same = (x, y) => JSON.stringify(x) === JSON.stringify(y);
const N = (s) => String(s).normalize("NFC");

// the server's spelling of a sum (plainMath): − × ÷, no commas, one space
const MATH_FIELDS = new Set(["sum", "a", "b", "op", "ops", "total", "terms"]);
const mathText = (s) => String(s).replace(/[*xX✕✖]/g, "×").replace(/[/:]/g, "÷").replace(/[-–—]/g, "−").replace(/[?☐▢□_]+/g, "□").replace(/,/g, "").replace(/\s+/g, " ").trim();
// is everything written in `mine` kept in `theirs`? (fields the server adds are fine; the orders it sorts are fine)
const SORTED = new Set(["notes", "wallet", "stock", "weights"]);
// fields the server spells its own way (a fraction's "৭/৪" kept as n, d; a mixed number, a decimal's text): checked by the answer
const LOOSE = new Set(["a", "fracs", "nums"]);
const FRACTIONISH = new Set(["fshade", "fpick", "fname", "fcut", "fwhole", "fcompare", "fequiv", "fline", "fsame", "fadd", "fgroup", "fmixed", "fsort", "dcompare", "dsum"]);
function kept(mine, theirs, field, kind) {
  if (Array.isArray(mine)) {
    if (!Array.isArray(theirs) || theirs.length !== mine.length) return false;
    const [m, t] = SORTED.has(field) ? [mine.slice().sort((p, q) => q - p), theirs] : [mine, theirs];
    return m.every((v, i) => kept(v, t[i], field, kind));
  }
  if (mine && typeof mine === "object") return !!theirs && typeof theirs === "object" && Object.entries(mine).every(([k, v]) => kept(v, theirs[k], k, kind));
  // a fraction round's "2/5" is a fraction, not a division: the server keeps it as written (24 Nov, found by a helper)
  if (typeof mine === "string" && typeof theirs === "string" && FRACTIONISH.has(kind)) return mine.replace(/\s+/g, "") === theirs.replace(/\s+/g, "");
  if (typeof mine === "string" && (MATH_FIELDS.has(field) || (field === "text" && (kind === "missing" || kind === "expr")))) return mathText(mine) === theirs;
  if (typeof mine === "string" && typeof theirs === "string") return mine.replace(/\s+/g, " ").trim() === theirs;
  return mine === theirs;
}

// ── the file ──
const file = JSON.parse(fs.readFileSync(FILE, "utf8"));
const wants = JSON.parse(fs.readFileSync(WANTS, "utf8"));
for (const p of H.checkImportFile(file)) problems.push(`file: ${p}`);
const b = file.book || {};
if (b.teachLanguage || b.helpLanguage || b.accent) bad("book", "has a language-course field");
if (b.language !== "bn" || b.base !== true || b.edition !== "bn" || b.title !== N("প্রাথমিক গণিত - চতুর্থ শ্রেণি")) bad("book", "title / language / base / edition");
if (!same(b.chapters, L.CONTENTS)) bad("book", "the chapters aren't the book's 11");

// every other activity file's codes (the build's own outputs aside)
function activityFiles(dir, depth) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "node_modules") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory() && depth > 0) { try { out = out.concat(activityFiles(p, depth - 1)); } catch (err) { /* unreadable */ } }
    else if (e.isFile() && /^ACTIVITIES.*\.json$/.test(e.name) && path.resolve(p) !== FILE && path.dirname(path.resolve(p)) !== __dirname) out.push(p);
  }
  return out;
}
const others = activityFiles(path.join(process.env.HOME, "Downloads"), 5);
const taken = new Map();
for (const f of others) { try { for (const a of JSON.parse(fs.readFileSync(f, "utf8")).activities || []) if (a && a.code) taken.set(String(a.code).toUpperCase(), f); } catch (err) { /* not JSON */ } }

const seen = { key: new Set(), code: new Set(), qr: new Set() };
const count = (c) => (c.pairs || c.questions || c.items || []).length;
const tally = { wio: 0, items: 0, agree: 0, mine: [], fresh: 0, questions: 0, pairs: 0, other: 0 };
const kinds = {};
for (const a of file.activities) {
  const at = `${a.key} (p.${a.page}, ${a.type})`;
  if (!(a.type in H.IMPORT_TYPES)) bad(at, "type can't be imported");
  if (!H.IMPORT_CODE_RE.test(a.code)) bad(at, `code ${a.code}`);
  if (taken.has(a.code)) bad(at, `code ${a.code} is in ${taken.get(a.code)}`);
  for (const f of ["key", "code", "qr"]) { if (seen[f].has(a[f])) bad(at, `${f} twice`); seen[f].add(a[f]); }
  if (a.chapter !== L.chapterOf(a.page) || !b.chapters.includes(a.chapter)) bad(at, `chapter "${a.chapter}"`);
  const g = H.cleanGuide(a.guide);
  if (!same(g.notes, a.guide.notes) || g.audio !== null) bad(at, "the guide isn't kept as written");
  const r = H.importContent(a.type, a.content);
  if (r.error) { bad(at, r.error); continue; }
  if (count(r.content) !== count(a.content)) bad(at, `${count(a.content)} in, ${count(r.content)} kept`);

  if (a.content.questions) {
    tally.questions += a.content.questions.length;
    r.content.questions.forEach((q, i) => {
      const s = a.content.questions[i];
      if (q.prompt !== s.prompt || q.answer !== s.answer || !same(q.options, s.options) || (q.why || "") !== s.why) bad(at, `question ${i + 1} changed`);
    });
  } else if (a.content.pairs) {
    tally.pairs += a.content.pairs.length;
    r.content.pairs.forEach((p, i) => { const s = a.content.pairs[i]; if (p.left !== s.left || p.right !== s.right) bad(at, `pair ${i + 1} changed`); });
  } else if (L.WIO_TYPES.includes(a.type)) {
    tally.wio++; tally.items += a.content.items.length;
    const w = wants[a.key];
    if (!w || w.items.length !== a.content.items.length) { bad(at, "no answers in the wants file (rebuild)"); continue; }
    const out = W.normalizeWorkItems(a.content.items, a.type);
    if (!same(out, r.content.items)) bad(at, "importContent and normalizeWorkItems differ");
    out.forEach((x, i) => {
      const s = a.content.items[i], want = w.items[i];
      kinds[s.kind] = (kinds[s.kind] || 0) + 1;
      for (const [k, v] of Object.entries(s)) if (!(LOOSE.has(k) && ["fmixed", "fsort", "nmark", "dsum", "dcompare"].includes(s.kind)) && !kept(v, x[k], k, s.kind)) bad(at, `item ${i + 1} (${s.kind}): ${k} ${JSON.stringify(v)} became ${JSON.stringify(x[k])}`);
      if (x.check) bad(at, `item ${i + 1} marked for checking`);
      if (want.mine) { tally.mine.push(`p.${a.page} ${a.title} (${i + 1}) = ${JSON.stringify(x.answer)}: ${want.mine}`); return; }
      if (same(x.answer, want.want)) tally.agree++;
      else bad(at, `item ${i + 1} (${s.kind} ${JSON.stringify(s)}): the server says ${JSON.stringify(x.answer)}, ours ${JSON.stringify(want.want)}`);
    });
    const f = a.configuration && a.configuration.fresh;
    if (f) {
      tally.fresh++;
      const cfg = W.workItOutConfig(a.configuration, a.type).fresh;
      for (const [k, v] of Object.entries(f)) if (cfg[k] !== v) bad(at, `fresh.${k} ${JSON.stringify(v)} became ${JSON.stringify(cfg[k])}`);
      if (!(f.count >= 5 && f.count <= 10)) bad(at, `fresh count ${f.count}`);
    }
  } else {
    tally.other++;
    const ri = r.content.items || [];
    a.content.items.forEach((s, i) => { if (!ri[i] || ri[i].text !== s.text || (s.category != null && ri[i].category !== s.category)) bad(at, `item ${i + 1} changed`); });
  }
}

if (problems.length) { console.log(`${problems.length} problem(s):`); problems.forEach((p) => console.log(`  - ${p}`)); process.exit(1); }
console.log(`OK ${path.basename(FILE)}: ${file.activities.length} activities; checkImportFile and importContent found no problem and kept every question, pair and item as written.`);
console.log(`  Work It Out engine: ${tally.wio} games, ${tally.items} items (${Object.entries(kinds).map(([k, n]) => `${k} ${n}`).join(", ")}); every item kept with its fields, none marked for checking.`);
console.log(`  The server's answers equal ours for ${tally.agree} items; ${tally.mine.length} items without our answer (worked out by the server only):`);
tally.mine.forEach((m) => console.log(`    · ${m}`));
console.log(`  Fresh problems: ${tally.fresh} games; workItOutConfig keeps every setting as written.`);
console.log(`  Questions ${tally.questions}, pairs ${tally.pairs}, orders/sorts ${tally.other}.`);
console.log(`  Codes: ${seen.code.size}, none twice, none of the ${taken.size} codes in the ${others.length} other activity files in ~/Downloads.`);
process.exit(0); // the required models keep handles open
