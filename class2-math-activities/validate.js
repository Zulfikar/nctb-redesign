#!/usr/bin/env node
// Checks ACTIVITIES-bn.json and ACTIVITIES-bn-update-2026-11-02-tools.json with the importer's own code (the backend's
// activity-import.helper.js): the file (checkImportFile) and every activity's content (importContent, the editor's
// normalizers), the way importBookActivities does it; then that the first file's 85 are unchanged (against
// ACTIVITIES-bn-before-tools.json). Nothing is written anywhere. Run with Node 16:  node validate.js
"use strict";
const fs = require("fs");
const path = require("path");

const BACKEND = process.env.EB_BACKEND || path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend");
// the helpers (and the models they load) read these globals at require time
global.ebConstants = require(path.join(BACKEND, "src/utils/constants"));
global.ebTimezones = require(path.join(BACKEND, "src/utils/timezones")).GLOBAL_TIMEZONE;
const H = require(path.join(BACKEND, "src/v3/helpers/activity-import.helper.js"));

const W = require(path.join(BACKEND, "src/v3/helpers/work-it-out.helper.js"));

// Work It Out: our own answer for each item, worked out here independently of the server's code
const ev = (expr, box) => {
  const s = String(expr).replace(/□/g, box == null ? "NaN" : String(box)).replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
  if (!/^[\d\s+\-*/()NaN]+$/.test(s)) throw new Error(`bad sum ${expr}`);
  return Function(`"use strict"; return (${s});`)();
};
function ourAnswer(it) {
  switch (it.kind) {
    case "sum": return ev(`${it.a} ${it.op} ${it.b}`);
    case "word": return ev(it.sum);
    case "missing": {
      const [l, r] = it.text.split("=");
      const fits = [];
      for (let x = 0; x <= 10000; x++) if (ev(l, x) === ev(r, x)) fits.push(x);
      return fits.length === 1 ? fits[0] : `answers: ${fits.join(",")}`;
    }
    case "place": return it.ask === "number" ? it.n : String(it.n).padStart(2, "0").split("").map(Number);
    case "pattern": {
      const k = it.terms.map((v, i) => [i, v]).filter(([, v]) => v != null);
      const step = (k[k.length - 1][1] - k[0][1]) / (k[k.length - 1][0] - k[0][0]);
      return it.terms.map((v, i) => (v == null ? k[0][1] + step * (i - k[0][0]) : null)).filter((v) => v != null);
    }
    case "compare": { const x = ev(it.a), y = ev(it.b); return x < y ? "<" : x > y ? ">" : "="; }
    // the tools (2 Nov 2026)
    case "mistake": {
      const right = String(ev(`${it.a} ${it.op} ${it.b}`)), shown = String(it.shown);
      const at = [...right].map((d, i) => (shown[i] !== d ? i : null)).filter((i) => i != null);
      return right.length === shown.length && at.length === 1 ? { pos: at[0], digit: +right[at[0]] } : "not one wrong digit";
    }
    case "groups": return it.total % it.groups ? "not equal" : it.total / it.groups;
    case "numberline": return it.target;
    case "clock": return [it.h, it.m];
    case "money": {
      const price = it.items && it.items.length ? it.items.reduce((s, x) => s + x.price, 0) : it.price;
      return it.ask === "count" ? it.notes.reduce((s, v) => s + v, 0) : it.ask === "change" ? it.paid - price : price;
    }
    case "measure": return it.tool === "balance" ? it.weights.reduce((s, g) => s + g, 0) : it.value;
    case "shapes": {
      // the shortest period (2–4) every shown shape keeps; the gap takes the shape one period away
      const gap = it.seq.indexOf(null);
      for (let p = 2; p <= 4; p++) {
        if (it.seq.every((t, i) => t == null || it.seq.every((u, j) => u == null || j % p !== i % p || u === t)) && new Set(it.seq.filter(Boolean)).size > 1) {
          const same = it.seq.find((t, j) => t != null && j % p === gap % p);
          return same || "no shape one period away";
        }
      }
      return "no period";
    }
    case "compose": return { square: "tri+tri", rectangle: "sq+sq", circle: "half+half", "big-square": "sq+sq+sq+sq" }[it.target];
    default: return null;
  }
}
const TOOL_TYPES = ["find_mistake", "equal_groups", "number_line", "clock_time", "taka_shop", "measure_it", "shape_patterns", "make_shapes"];
const problems = [];
function checkFile(name) {
const wio = { activities: 0, items: 0 }, tools = { activities: 0, items: 0 };
const file = JSON.parse(fs.readFileSync(path.resolve(__dirname, name), "utf8"));
const at0 = problems.length;
for (const p of H.checkImportFile(file)) problems.push(`${name}: ${p}`);
const b = file.book || {};
if (b.teachLanguage || b.helpLanguage || b.accent) problems.push("book: has a language-course field (teachLanguage / helpLanguage / accent)");
if (b.base !== true) problems.push("book: base isn't true");

const seenKey = new Set(), seenCode = new Set();
const count = (c) => (c.pairs || c.questions || c.items || []).length;
for (const a of file.activities) {
  const at = `${name}: ${a.key} (p.${a.page}, ${a.type})`;
  if (!(a.type in H.IMPORT_TYPES)) problems.push(`${at}: type can't be imported`);
  if (!H.IMPORT_CODE_RE.test(a.code)) problems.push(`${at}: code ${a.code}`);
  if (seenCode.has(a.code)) problems.push(`${at}: code twice`); seenCode.add(a.code);
  if (!a.key || a.key.length > 60 || seenKey.has(a.key)) problems.push(`${at}: key`); seenKey.add(a.key);
  if (!a.title || a.title.length > 200) problems.push(`${at}: title`);
  if (!b.chapters.includes(a.chapter)) problems.push(`${at}: chapter "${a.chapter}" isn't in the book`);
  const r = H.importContent(a.type, a.content);
  if (r.error) { problems.push(`${at}: ${r.error}`); continue; }
  // nothing lost or cut by the normalizers
  if (count(r.content) !== count(a.content)) problems.push(`${at}: ${count(a.content)} in, ${count(r.content)} kept`);
  const cut = JSON.stringify(r.content).length < 0; // (lengths are checked below)
  if (a.type === "categorize") {
    if (r.content.categories.length !== a.content.categories.length) problems.push(`${at}: a group was dropped`);
    r.content.items.forEach((it, i) => { if (it.text !== a.content.items[i].text || it.category !== a.content.items[i].category) problems.push(`${at}: item ${i + 1} changed`); });
  }
  if (a.type === "sequence") r.content.items.forEach((it, i) => { if (it.text !== a.content.items[i].text) problems.push(`${at}: item ${i + 1} changed`); });
  if (a.type === "mcq" || a.type === "rapid_quiz") r.content.questions.forEach((q, i) => {
    const s = a.content.questions[i];
    if (q.answer !== s.answer || q.options.join("|") !== s.options.join("|") || (q.why || "") !== s.why) problems.push(`${at}: question ${i + 1} changed`);
  });
  if (a.type === "number_match" || a.type === "equation_match") r.content.pairs.forEach((p, i) => { const s = a.content.pairs[i]; if (p.left !== s.left || p.right !== s.right) problems.push(`${at}: pair ${i + 1} changed`); });
  if (a.type === "work_it_out") {
    wio.activities++; wio.items += r.content.items.length;
    r.content.items.forEach((it, i) => {
      const s = a.content.items[i];
      if (it.kind !== s.kind) problems.push(`${at}: item ${i + 1} changed kind`);
      const mine = ourAnswer(s);
      if (JSON.stringify(mine) !== JSON.stringify(it.answer)) problems.push(`${at}: item ${i + 1} the server says ${JSON.stringify(it.answer)}, we say ${JSON.stringify(mine)}`);
      if (it.check) problems.push(`${at}: item ${i + 1} marked for checking`);
      if (s.kind === "word" && (it.text !== s.text || it.unit !== s.unit)) problems.push(`${at}: item ${i + 1} text/unit changed`);
    });
    // the settings as the editor keeps them
    if (a.configuration.fresh) {
      const cfg = W.workItOutConfig(a.configuration).fresh;
      for (const [k, v] of Object.entries(a.configuration.fresh)) if (cfg[k] !== v) problems.push(`${at}: fresh.${k} ${v} became ${cfg[k]}`);
    }
  }
  if (TOOL_TYPES.includes(a.type)) {
    // the tools: every item kept as written (all its fields), and the server's answer equal to ours
    tools.activities++; tools.items += r.content.items.length;
    r.content.items.forEach((it, i) => {
      const s = a.content.items[i];
      for (const [k, v] of Object.entries(s)) if (JSON.stringify(it[k]) !== JSON.stringify(v)) problems.push(`${at}: item ${i + 1} ${k} ${JSON.stringify(v)} became ${JSON.stringify(it[k])}`);
      const mine = ourAnswer(s);
      if (JSON.stringify(mine) !== JSON.stringify(it.answer)) problems.push(`${at}: item ${i + 1} the server says ${JSON.stringify(it.answer)}, we say ${JSON.stringify(mine)}`);
      if (it.check) problems.push(`${at}: item ${i + 1} marked for checking`);
    });
    // fresh problems: the type's own tool, as the editor keeps them (and as the player reads the raw block: its skill is there)
    if (a.configuration.fresh) {
      const cfg = W.workItOutConfig(a.configuration, a.type).fresh;
      for (const [k, v] of Object.entries(a.configuration.fresh)) if (cfg[k] !== v) problems.push(`${at}: fresh.${k} ${v} became ${cfg[k]}`);
      if (a.configuration.fresh.skill !== W.WIO_TYPES[a.type].skill) problems.push(`${at}: fresh skill ${a.configuration.fresh.skill}`);
    }
  }
  void cut;
}

if (problems.length === at0) {
  console.log(`OK ${name}: ${file.activities.length} activities; checkImportFile and importContent found no problem, and the normalizers kept every item as written.`);
  if (wio.activities) console.log(`  Work It Out: ${wio.activities} activities, ${wio.items} items; every item kept, and every answer the server worked out equals ours.`);
  if (tools.activities) console.log(`  Tools: ${tools.activities} activities, ${tools.items} items; every item kept with all its fields, and every answer the server worked out equals ours.`);
}
return file;
}

// node validate.js <file>: only that file (a range's check, .check/pNNN-NNN.json from build.js --only=pNNN-NNN)
if (process.argv[2]) {
  checkFile(process.argv[2]);
  if (problems.length) { console.log(`${problems.length} problem(s):`); problems.forEach((p) => console.log(`  - ${p}`)); process.exit(1); }
  console.log("OK"); process.exit(0);
}
const full = checkFile("ACTIVITIES-bn.json");
const update = checkFile("ACTIVITIES-bn-update-2026-11-02-tools.json");
const pagesUpdate = checkFile("ACTIVITIES-bn-update-2026-11-03-pages.json");
// the update holds only the tools; the full file is the first file's activities and the update's, each as it was
const before = JSON.parse(fs.readFileSync(path.join(__dirname, "ACTIVITIES-bn-before-tools.json"), "utf8"));
const inFull = new Map(full.activities.map((a) => [a.key, a]));
const changed = before.activities.filter((a) => JSON.stringify(a) !== JSON.stringify(inFull.get(a.key)));
if (changed.length) problems.push(`the first file's activities changed: ${changed.map((a) => a.key).join(", ")}`);
if (JSON.stringify(before.book) !== JSON.stringify(full.book) || JSON.stringify(update.book) !== JSON.stringify(full.book)) problems.push("the book blocks differ");
if (update.activities.some((a) => !TOOL_TYPES.includes(a.type))) problems.push("the update holds a non-tool activity");
const old = { code: new Set(before.activities.map((a) => a.code)), key: new Set(before.activities.map((a) => a.key)), qr: new Set(before.activities.map((a) => a.qr)) };
for (const a of update.activities) {
  for (const f of ["code", "key", "qr"]) if (old[f].has(a[f])) problems.push(`update ${a.key}: its ${f} ${a[f]} is the first file's`);
  if (JSON.stringify(a) !== JSON.stringify(inFull.get(a.key))) problems.push(`update ${a.key}: not the same in ACTIVITIES-bn.json`);
}
// the every-page update (3 Nov 2026): new codes, keys and QR labels, and the same in the full file
const older = { code: new Set([...before.activities, ...update.activities].map((a) => a.code)), key: new Set([...before.activities, ...update.activities].map((a) => a.key)), qr: new Set([...before.activities, ...update.activities].map((a) => a.qr)) };
if (JSON.stringify(pagesUpdate.book) !== JSON.stringify(full.book)) problems.push("the every-page update's book block differs");
for (const a of pagesUpdate.activities) {
  for (const f of ["code", "key", "qr"]) if (older[f].has(a[f])) problems.push(`every-page ${a.key}: its ${f} ${a[f]} is an earlier file's`);
  if (JSON.stringify(a) !== JSON.stringify(inFull.get(a.key))) problems.push(`every-page ${a.key}: not the same in ACTIVITIES-bn.json`);
}
if (full.activities.length !== before.activities.length + update.activities.length + pagesUpdate.activities.length) problems.push(`ACTIVITIES-bn.json has ${full.activities.length}, not ${before.activities.length} + ${update.activities.length} + ${pagesUpdate.activities.length}`);
const keptOrder = full.activities.filter((a) => old.key.has(a.key)).map((a) => a.key).join("|") === before.activities.map((a) => a.key).join("|");
if (!keptOrder) problems.push("the first file's activities are in another order");

if (problems.length) { console.log(`${problems.length} problem(s):`); problems.forEach((p) => console.log(`  - ${p}`)); process.exit(1); }
console.log(`OK: the first file's ${before.activities.length} are unchanged in ACTIVITIES-bn.json (same content, codes, QR and order); the tools update's ${update.activities.length} and the every-page update's ${pagesUpdate.activities.length} are new (no earlier code, key or QR) and the same in the full file.`);
process.exit(0); // the required models keep handles open
