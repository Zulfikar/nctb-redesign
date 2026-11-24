// The shared helpers for the Class 4 activity file (প্রাথমিক গণিত, চতুর্থ শ্রেণি, NCTB 2026; part B, 24 Nov 2026),
// adapted from the Class 3 file's rest/lib.js. Each range's file (pages/pNNN-NNN.js) is `module.exports = (L) => { … }`
// and adds its activities with the functions below; build.js runs them all, checks every activity and writes
// ACTIVITIES-bn.json and README.md; validate.js checks the file with the importer's own code and the server's answers
// against ours. Read BRIEF.md first.
//
// Pages are PRINTED pages (PDF page = printed + 7). Numbers in the items' numeric fields are ASCII; every text a child
// reads (prompts, options, stories, pairs) is written with ASCII digits here and turned into Bangla digits by toBn().
//
// ── Every game round carries our answer ──
//   it(item, want)   want = the answer, in the SERVER's answer format (BRIEF.md lists it for every kind); the book's
//                    printed answer where it prints one (where the book is wrong, the right one, and a note())
//   mine(item, why)  a round whose answer we don't give (a choice of ours: say why); the README lists them
//
// ── Activities (every activity at least 10 questions; a game's fresh problems count) ──
//   wio({ page, slug, title, type, items, fresh, src, notes, askOperation })   every Work It Out engine type
//   mcq({ page, slug, title, questions, src, notes, type })                   questions made with q()
//   q({ prompt, options, answer, why, book, num, emoji })
//   match({ page, slug, title, type, pairs, src })      pairs [[left, right], …] (4–18); number_match | equation_match
//   eq("367*25") → ["৩৬৭ × ২৫", "৯১৭৫"]; words(n) → the number in words (the Class 4 book's: up to কোটি)
//   order({ page, slug, title, items, src })            a Sequence: the items IN THE RIGHT ORDER (3–12)
//   sort({ page, slug, title, categories, items, src }) a Categorize: categories [names], items [[text, index], …]
//   note(text) / cant(text): a line for the README's "choices made" / "what the types can't express"
//   skipPage(page, why): a page with nothing to play (an opener picture only, a page of instructions…)
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const HOME = process.env.HOME;
const W = require(path.join(HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
// the other NCTB math files: never their codes
const OTHER_FILES = ["class2-math-activities/ACTIVITIES-bn.json", "class3-math-activities/ACTIVITIES-bn.json", "class3-math-activities/ACTIVITIES-bn-rest.json",
  "class3-math-activities/ACTIVITIES-bn-update-2026-11-03-pages.json", "class3-math-activities/ACTIVITIES-bn-update-2026-11-14-slice.json"].map((f) => path.join(__dirname, "..", f));

// ───────────────────────────── digits, sums, words ─────────────────────────────
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const toBn = (v) => String(v).replace(/[0-9]/g, (d) => BN_DIGITS[+d]);
const fromBn = (s) => String(s).replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
const N = (s) => String(s).normalize("NFC");
const nfc = (v) => (typeof v === "string" ? v.normalize("NFC") : Array.isArray(v) ? v.map(nfc) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, nfc(x)])) : v);

/** + − × ÷ and brackets on whole numbers (× ÷ first, left to right); "367*25", "৩৬৭ × ২৫"; throws when not whole. */
function calc(expr) {
  const s = fromBn(expr).replace(/−/g, "-").replace(/[×x]/g, "*").replace(/÷/g, "/").replace(/\s+/g, "");
  let i = 0;
  const num = () => {
    if (s[i] === "(") { i++; const v = add(); if (s[i++] !== ")") throw new Error(`calc ${expr}`); return v; }
    const m = /^\d+/.exec(s.slice(i)); if (!m) throw new Error(`calc ${expr}`); i += m[0].length; return Number(m[0]);
  };
  const mul = () => { let v = num(); while (s[i] === "*" || s[i] === "/") { const o = s[i++], r = num(); if (o === "/" && (!r || v % r)) throw new Error(`not whole: ${expr}`); v = o === "*" ? v * r : v / r; } return v; };
  const add = () => { let v = mul(); while (s[i] === "+" || s[i] === "-") { const o = s[i++], r = mul(); v = o === "+" ? v + r : v - r; } return v; };
  const v = add();
  if (i !== s.length || v < 0 || !Number.isSafeInteger(v)) throw new Error(`calc ${expr}`);
  return v;
}
/** "367*25" → "৩৬৭ × ২৫" (the book's signs: − U+2212, ×, ÷). */
const show = (expr) => toBn(fromBn(expr).replace(/\s+/g, "").replace(/-/g, "−").replace(/\*/g, "×").replace(/\//g, "÷").replace(/([+−×÷])/g, " $1 "));
const eq = (expr) => [show(expr), toBn(calc(expr))];

// the Class 4 book's number words, up to কোটি (the game engine's own numberWords: "তিন লক্ষ বারো হাজার আটশত একচল্লিশ";
// system "intl": "three hundred twelve thousand …" is English, not used here)
function words(n) {
  if (!Number.isInteger(n) || n < 1 || n > 99999999) throw new Error(`words ${n}`);
  return N([].concat(W.numberWords(n, "bn")).join(" "));
}
function wordPair(n, printed) {
  if (printed != null && N(printed).replace(/\s+/g, " ") !== words(n)) throw new Error(`words(${n}) = "${words(n)}", the book prints "${printed}"`);
  return [toBn(n), words(n)];
}
// ordinals, as p.14 prints them (CH01-08-PAGES.md §4): [word, short form]
const ORDINALS = [
  ["প্রথম", "১ম"], ["দ্বিতীয়", "২য়"], ["তৃতীয়", "৩য়"], ["চতুর্থ", "৪র্থ"], ["পঞ্চম", "৫ম"], ["ষষ্ঠ", "৬ষ্ঠ"], ["সপ্তম", "৭ম"], ["অষ্টম", "৮ম"], ["নবম", "৯ম"], ["দশম", "১০ম"],
  ["একাদশ", "১১শ"], ["দ্বাদশ", "১২শ"], ["ত্রয়োদশ", "১৩শ"], ["চতুর্দশ", "১৪শ"], ["পঞ্চদশ", "১৫শ"], ["ষোড়শ", "১৬শ"], ["সপ্তদশ", "১৭শ"], ["অষ্টাদশ", "১৮শ"], ["উনবিংশ", "১৯শ"], ["বিংশ", "২০শ"],
].map(([w, s]) => [N(w), N(s)]);

// ───────────────────────────── book, chapters, codes ─────────────────────────────
const CONTENTS = [
  "সংখ্যা ও স্থানীয় মান", "যোগ ও বিয়োগ", "গুণ", "ভাগ", "গাণিতিক বাক্য", "গুণিতক ও গুণনীয়ক", "সাধারণ ভগ্নাংশ", "দশমিক ভগ্নাংশ",
  "পরিমাপ", "জ্যামিতি", "উপাত্ত সংগ্রহ ও বিন্যস্তকরণ",
].map((t, i) => N(`অধ্যায় ${toBn(i + 1)} · ${t}`));
const FIRST_PAGE = [1, 23, 41, 49, 67, 81, 97, 111, 121, 143, 169]; // each chapter's first printed page (its opener)
const LAST_PAGE = 174;
const chapterIndex = (page) => { let c = -1; FIRST_PAGE.forEach((p, i) => { if (page >= p) c = i; }); return c; };
const chapterOf = (page) => CONTENTS[chapterIndex(page)];

const CODE_ABC = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // the import alphabet (no I, L, O, 0, 1)
const codesIn = (file) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")).activities.map((a) => a.code) : []);
const OTHER_CODES = new Set(OTHER_FILES.flatMap(codesIn)); // never these
const usedCodes = new Set(OTHER_CODES);
function codeFor(key) {
  for (let salt = 0; ; salt++) {
    const h = crypto.createHash("sha256").update(`ebidyaloy-class4-math:${key}:${salt}`).digest();
    let c = "LS";
    for (let i = 0; i < 6; i++) c += CODE_ABC[h[i] % CODE_ABC.length];
    if (!usedCodes.has(c)) { usedCodes.add(c); return c; }
  }
}
function rng(seedText) {
  let a = crypto.createHash("sha256").update(seedText).digest().readUInt32LE(0);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffled(list, r) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// ───────────────────────────── activities ─────────────────────────────
const activities = [];
const perPage = {};
const NOTES = [], CANT = [];
let currentModule = "";
const keyOf = (page, slug) => `m4-p${String(page).padStart(3, "0")}-${slug}`;
const fail = (where, msg) => { throw new Error(`${currentModule}: ${where}: ${msg}`); };

function add({ page, slug, type, title, content, configuration, src, notes, pictures }) {
  const where = `p.${page} ${slug}`;
  if (!Number.isInteger(page) || page < 1 || page > LAST_PAGE) fail(where, `page outside 1–${LAST_PAGE}`);
  if (!/^[a-z0-9-]{2,40}$/.test(slug || "")) fail(where, "slug: lower-case letters, digits and hyphens");
  if (!title || /[0-9]/.test(title) || title.length > 80) fail(where, `title "${title}" (Bangla digits, at most 80)`);
  if (!src) fail(where, "src: where on the page it comes from");
  const key = keyOf(page, slug);
  if (activities.some((a) => a.key === key)) fail(where, "the same page and slug twice");
  perPage[page] = (perPage[page] || 0) + 1;
  const qr = `M4-p${page}-${"abcdefghijklmnop"[perPage[page] - 1]}`;
  activities.push({
    key, qr, code: codeFor(key), type, title: N(title), chapter: chapterOf(page), page, configuration: configuration || {}, content,
    guide: { audio: null, pictures: pictures || [], notes: (notes || []).map((n) => N(toBn(n))) }, _src: src, _module: currentModule,
  });
}

// Work It Out and the tools: the items with their survey answers
const WIO_TYPES = ["work_it_out", "find_mistake", "equal_groups", "number_line", "clock_time", "taka_shop", "measure_it", "shape_patterns", "make_shapes", "fraction_play", "units_amounts", "tally_chart", "angles_dots"];
const STORY_FIELDS = ["text", "story"]; // stories a child reads: Bangla digits (not a sum's own text: missing, truth, opbox, expr)
const MATH_TEXT = ["missing", "truth", "opbox", "expr"];
const it = (item, want) => { if (want === undefined) throw new Error(`it(): no answer for ${JSON.stringify(item)} (use mine() for a choice of ours)`); return { ...item, _want: want }; };
const mine = (item, why) => { if (!why) throw new Error(`mine(): say why (${JSON.stringify(item)})`); return { ...item, _mine: why }; };
function wio({ page, slug, title, type = "work_it_out", items, fresh, src, notes, pictures, askOperation }) {
  const where = `p.${page} ${slug}`;
  if (!WIO_TYPES.includes(type)) fail(where, `type ${type}`);
  if (!Array.isArray(items) || items.length < 1 || items.length > 20) fail(where, `${items && items.length} items (1–20)`);
  const out = items.map((x) => {
    if (!x || !x.kind) fail(where, `an item without a kind: ${JSON.stringify(x)}`);
    if (x._want === undefined && !x._mine) fail(where, `item ${JSON.stringify(x)} has no answer: wrap it in it(item, want) or mine(item, why)`);
    const y = { ...x };
    for (const f of STORY_FIELDS) if (typeof y[f] === "string" && (f === "story" || !MATH_TEXT.includes(y.kind))) y[f] = N(toBn(y[f]));
    for (const f of ["unit", "qUnit", "rUnit"]) if (typeof y[f] === "string") y[f] = N(toBn(y[f]));
    if ((y.kind === "tally" || y.kind === "chart") && Array.isArray(y.rows)) y.rows = y.rows.map((r) => ({ ...r, name: N(toBn(r.name)) }));
    if (y.kind === "money" && Array.isArray(y.items)) y.items = y.items.map((s) => ({ ...s, name: N(toBn(s.name)) }));
    return y;
  });
  const configuration = {};
  if (fresh) {
    if (!fresh.skill) fail(where, "fresh needs its skill written out");
    configuration.fresh = { skill: fresh.skill, count: fresh.count || 5, ...fresh };
  }
  if (askOperation === false) configuration.askOperation = false;
  add({ page, slug, type, title, content: { items: out }, configuration, src, notes, pictures });
}

// multiple choice
const LETTERS = ["ক", "খ", "গ", "ঘ", "ঙ"];
function q({ prompt, options, answer, why, book, num, emoji }) {
  if (!prompt || !Array.isArray(options) || options.length < 2 || options.length > 4) throw new Error(`q(): prompt and 2–4 options: ${prompt}`);
  const opts = options.map((o) => N(toBn(o)));
  let idx;
  if (book != null) {
    idx = LETTERS.indexOf(N(book));
    if (idx < 0 || idx >= opts.length) throw new Error(`q(): book letter ${book} (${prompt})`);
    if (answer != null && N(toBn(answer)) !== opts[idx]) throw new Error(`q(): the book's ${book} is "${opts[idx]}", answer says "${answer}" (${prompt})`);
  } else {
    idx = opts.indexOf(N(toBn(answer)));
    if (idx < 0) throw new Error(`q(): the answer "${answer}" isn't an option (${prompt})`);
  }
  if (num != null) {
    const first = (o) => { const m = fromBn(o).replace(/,/g, "").match(/\d+/); return m ? Number(m[0]) : NaN; };
    if (first(opts[idx]) !== num || opts.filter((o) => first(o) === num).length !== 1) throw new Error(`q(): num ${num}: the right option is "${opts[idx]}" (${prompt})`);
  }
  if (!why) throw new Error(`q(): why (${prompt})`);
  const out = { prompt: N(toBn(prompt)), options: opts, answer: idx, why: N(toBn(why)), _shuffle: book == null };
  if (emoji) out.emoji = emoji;
  return out;
}
function mcq({ page, slug, title, questions, src, notes, pictures, type = "mcq" }) {
  const where = `p.${page} ${slug}`;
  if (!["mcq", "rapid_quiz"].includes(type)) fail(where, `type ${type}`);
  if (!Array.isArray(questions) || questions.length < 3 || questions.length > 16) fail(where, `${questions && questions.length} questions (3–16)`);
  const key = keyOf(page, slug);
  const qs = questions.map((x, i) => {
    const y = { ...x, options: x.options.slice() };
    if (y._shuffle) { const right = y.options[y.answer]; y.options = shuffled(y.options, rng(`${key}#${i}`)); y.answer = y.options.indexOf(right); }
    return y;
  });
  // the right answer never always in one place (only the shuffled ones move)
  const movable = qs.filter((x) => x._shuffle);
  if (movable.length > 1 && new Set(qs.map((x) => x.answer)).size === 1) {
    movable.forEach((x, i) => { if (i % 2) { const j = (x.answer + 1) % x.options.length; [x.options[x.answer], x.options[j]] = [x.options[j], x.options[x.answer]]; x.answer = j; } });
  }
  add({ page, slug, type, title, content: { questions: qs }, src, notes, pictures });
}

// matches, orders, sorts
function match({ page, slug, title, type = "number_match", pairs, src, notes }) {
  const where = `p.${page} ${slug}`;
  if (!["number_match", "equation_match"].includes(type)) fail(where, `type ${type}`);
  if (!Array.isArray(pairs) || pairs.length < 4 || pairs.length > 18) fail(where, `${pairs && pairs.length} pairs (4–18; they play in rounds of up to 6)`);
  const out = pairs.map(([l, r]) => ({ left: N(toBn(l)), right: N(toBn(r)) }));
  if (new Set(out.map((p) => p.left)).size !== out.length || new Set(out.map((p) => p.right)).size !== out.length) fail(where, "a left or a right side twice");
  add({ page, slug, type, title, content: { pairs: out }, src, notes });
}
function order({ page, slug, title, items, src, notes, type = "sequence" }) {
  const where = `p.${page} ${slug}`;
  if (!Array.isArray(items) || items.length < 3 || items.length > 12) fail(where, `${items && items.length} items (3–12)`);
  const out = items.map((t) => ({ text: N(toBn(t)) }));
  if (new Set(out.map((x) => x.text)).size !== out.length) fail(where, "an item twice");
  add({ page, slug, type, title, content: { items: out }, src, notes });
}
function sort({ page, slug, title, categories, items, src, notes, type = "categorize" }) {
  const where = `p.${page} ${slug}`;
  if (!Array.isArray(categories) || categories.length < 2 || categories.length > 5) fail(where, "2–5 categories");
  if (!Array.isArray(items) || items.length < 4 || items.length > 20) fail(where, "4–20 items");
  if (items.some(([, c]) => !(c >= 0 && c < categories.length))) fail(where, "an item's category");
  add({
    page, slug, type, title,
    content: { categories: categories.map((c) => ({ name: N(toBn(c)), emoji: "" })), items: items.map(([t, c]) => ({ text: N(toBn(t)), category: c, emoji: "" })) },
    src, notes,
  });
}
const note = (t) => NOTES.push({ module: currentModule, text: N(t) });
const cant = (t) => CANT.push({ module: currentModule, text: N(t) });
const setModule = (m) => { currentModule = m; };
const SKIPS = {};
const skipPage = (page, why) => { if (!why) throw new Error(`skipPage(${page}): say why`); SKIPS[page] = N(why); };

module.exports = {
  toBn, fromBn, N, nfc, calc, show, eq, words, wordPair, ORDINALS, CONTENTS, FIRST_PAGE, LAST_PAGE, chapterOf, chapterIndex,
  it, mine, wio, q, mcq, match, order, sort, note, cant, keyOf, skipPage, W,
  // for build.js
  activities, NOTES, CANT, SKIPS, OTHER_CODES, setModule, WIO_TYPES,
};
