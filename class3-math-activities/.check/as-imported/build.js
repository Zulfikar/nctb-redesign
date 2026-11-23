#!/usr/bin/env node
// প্রাথমিক গণিত, তৃতীয় শ্রেণি (NCTB, 2026 edition), অধ্যায় ৯ ভগ্নাংশ (printed pp.91–106) → an Activity Studio activity
// file (ACTIVITIES-bn.json) and its README.md, for the book /b/GVB5V3 ("প্রাথমিক গণিত - ক্লাস থ্রি"). Run:  node build.js
//
// How it works (the Class 2 file's way: ~/Downloads/class2-math-activities/build.js)
// - Every fraction is typed here with ASCII digits ("3/5"), exactly as the page prints it (page = the PRINTED page
//   number; PDF page = printed page + 6). toBn() writes the Bangla text (stories, questions, matches) in Bangla digits.
// - Fraction Play items carry NO answers: the server works each one out when the file is imported. answerOf() below
//   works every one out here too, only to check that each item can be asked (validate.js compares the server's answers
//   with its own working, the book's printed answers and the survey's).
// - The multiple-choice answers and the matches are COMPUTED; before writing, verify() parses every right option and
//   every pair back from its Bangla text and checks it again. The build stops on any mistake.
// - Codes (LS + 6) come from a hash of each activity's key, so a rebuild keeps them; no code of the Class 2 file
//   (~/Downloads/class2-math-activities/ACTIVITIES-bn.json) is ever used.
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const OUT_JSON = path.join(__dirname, "ACTIVITIES-bn.json");
const OUT_README = path.join(__dirname, "README.md");
const CLASS2_FILE = path.join(process.env.HOME, "Downloads/class2-math-activities/ACTIVITIES-bn.json");

// ───────────────────────────── Bangla digits and fractions ─────────────────────────────
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const toBn = (v) => String(v).replace(/[0-9]/g, (d) => BN_DIGITS[+d]);
const fromBn = (s) => String(s).replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
// "3/5" (or "৩/৫"; "1" = one whole) → { n, d }
function frac(s) {
  const t = fromBn(s).replace(/\s+/g, "");
  if (t === "1") return { n: 1, d: 1 };
  const m = /^(\d+)\/(\d+)$/.exec(t);
  if (!m) throw new Error(`not a fraction: ${s}`);
  return { n: Number(m[1]), d: Number(m[2]) };
}
const fracsIn = (text) => (fromBn(text).match(/\d+\/\d+/g) || []).map(frac);
const cmp = (x, y) => Math.sign(x.n * y.d - y.n * x.d); // −1, 0, 1
const sameFrac = (x, y) => x.n === y.n && x.d === y.d; // as written (never reduced)

// ───────────────────────────── book, chapters, codes ─────────────────────────────
// The book's সূচিপত্র (PDF p.6), every chapter in its order: the importer adds the file's chapter list to the book's
// own (the book has none yet), and that list is the book's reading order, so a later chapter's file keeps its place.
// Every activity here is in chapter ৯. (false: the book gets only "অধ্যায় ৯ · ভগ্নাংশ".)
const ALL_CHAPTERS = true;
const CONTENTS = [
  "সংখ্যা", "যোগ", "বিয়োগ", "যোগ ও বিয়োগের সম্পর্ক", "গুণ", "ভাগ", "গুণ ও ভাগের সম্পর্ক", "যোগ, বিয়োগ, গুণ ও ভাগসংক্রান্ত সমস্যা",
  "ভগ্নাংশ", "বাংলাদেশি মুদ্রা", "পরিমাপ", "জ্যামিতি", "উপাত্ত সংগ্রহ ও বিন্যস্তকরণ",
].map((t, i) => `অধ্যায় ${toBn(i + 1)} · ${t}`);
const CHAPTER = CONTENTS[8]; // "অধ্যায় ৯ · ভগ্নাংশ", printed pp.91–106
const CHAPTERS = ALL_CHAPTERS ? CONTENTS : [CHAPTER];
const FIRST_PAGE = 91, LAST_PAGE = 106;

const CODE_ABC = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // the import alphabet (no I, L, O, 0, 1)
// the Class 2 file's codes are never used (and none of ours twice)
const class2Codes = fs.existsSync(CLASS2_FILE) ? JSON.parse(fs.readFileSync(CLASS2_FILE, "utf8")).activities.map((a) => a.code) : [];
if (!class2Codes.length) console.warn(`(warning: ${CLASS2_FILE} not found; its codes can't be avoided)`);
const usedCodes = new Set(class2Codes);
function codeFor(key) {
  for (let salt = 0; ; salt++) {
    const h = crypto.createHash("sha256").update(`ebidyaloy-class3-math:${key}:${salt}`).digest();
    let c = "LS";
    for (let i = 0; i < 6; i++) c += CODE_ABC[h[i] % CODE_ABC.length];
    if (!usedCodes.has(c)) { usedCodes.add(c); return c; }
  }
}
// a seeded random (mulberry32) for shuffling options: the same key always gives the same order
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

const activities = [];
const perPage = {};
const keyOf = (page, slug) => `m3-p${String(page).padStart(3, "0")}-${slug}`;
function add({ page, slug, type, title, content, notes, pictures, src, configuration }) {
  if (page < FIRST_PAGE || page > LAST_PAGE) throw new Error(`page ${page} is outside the chapter`);
  const key = keyOf(page, slug);
  perPage[page] = (perPage[page] || 0) + 1;
  const qr = `M3-p${page}-${"abcdefghij"[perPage[page] - 1]}`;
  activities.push({
    key, qr, code: codeFor(key), type, title, chapter: CHAPTER, page, configuration: configuration || {}, content,
    guide: { audio: null, pictures: pictures || [], notes: notes || [] }, _src: src || "",
  });
}

// ───────────────────────────── Fraction Play rounds ─────────────────────────────
// The rounds as work-it-out.helper.js reads them (normalizeFractionItem): a shape is "circle" | "bar" | "square", cut
// into d equal parts (d 2–12); a fraction is "n/d" (ASCII), "1" for one whole. Only the fields each round keeps.
const shade = (n, d, shape) => ({ kind: "fshade", n, d, shape });
const pickPic = (n, d, shape) => ({ kind: "fpick", n, d, shape });
const nameIt = (n, d, shape, unit) => ({ kind: "fname", n, d, shape, ...(unit ? { unit } : {}) });
const fromWords = (n, d, first) => ({ kind: "fname", n, d, ask: "words", first }); // "লব ৭, হর ১৩" (first: which the page names first)
const cut = (n, d, shape) => ({ kind: "fcut", n, d, shape });
const compare = (a, b, shape) => ({ kind: "fcompare", a, b, shape });
const equiv = (a, b) => ({ kind: "fequiv", a, b });
const onLine = (n, d, ask, unit) => ({ kind: "fline", n, d, ask, ...(unit ? { unit } : {}) });
const same = (n, d, d2, shape = "bar") => ({ kind: "fsame", n, d, d2, ask: "type", shape }); // n/d = □/d2: type the top
// "3/5+1/5", "1-3/4" → an fadd round; story() adds the story as printed (Bangla digits) and its unit
function sum(expr) {
  const m = /^(1|\d+\/\d+)([+-])(\d+\/\d+)$/.exec(expr.replace(/\s+/g, ""));
  if (!m) throw new Error(`sum ${expr}`);
  return { kind: "fadd", a: m[1], op: m[2] === "-" ? "−" : "+", b: m[3] };
}
const story = (expr, unit, text) => ({ ...sum(expr), text: toBn(text), unit });

// each round's answer by the rules of the brief and the helper (null when it can't be asked). Written here on its own.
const SHAPES = ["circle", "bar", "square"];
const denOk = (d) => Number.isInteger(d) && d >= 2 && d <= 12;
const int = (v) => Number.isInteger(v);
function answerOf(it) {
  const { n, d } = it;
  switch (it.kind) {
    case "fshade": case "fpick": case "fname": case "fcut": {
      if (it.kind === "fname" && it.ask === "words") return int(n) && n >= 1 && int(d) && d >= 2 && d <= 20 && ["n", "d"].includes(it.first) ? [n, d] : null;
      if (!denOk(d) || !int(n) || n < 1 || n > d || !SHAPES.includes(it.shape)) return null;
      return it.kind === "fshade" ? n : it.kind === "fpick" ? `${n}/${d}` : it.kind === "fname" ? [n, d] : [d, n];
    }
    case "fline":
      return denOk(d) && int(n) && n >= 1 && n <= d && ["read", "place"].includes(it.ask) ? (it.ask === "place" ? n : [n, d]) : null;
    case "fequiv": {
      const a = frac(it.a), b = frac(it.b), ok = (f) => f.d >= 2 && f.d <= 30 && f.n >= 1 && f.n <= f.d;
      return ok(a) && ok(b) && !sameFrac(a, b) ? (cmp(a, b) === 0 ? "yes" : "no") : null;
    }
    case "fcompare": {
      const a = frac(it.a), b = frac(it.b), whole = (f) => f.d === 1 && f.n === 1, ok = (f) => whole(f) || (denOk(f.d) && f.n >= 1 && f.n <= f.d);
      return ok(a) && ok(b) && !(whole(a) && whole(b)) && SHAPES.includes(it.shape) ? ["<", "=", ">"][cmp(a, b) + 1] : null;
    }
    case "fsame":
      return denOk(d) && denOk(it.d2) && it.d2 !== d && n >= 1 && n < d && (n * it.d2) % d === 0 && SHAPES.includes(it.shape) ? (n * it.d2) / d : null;
    case "fadd": {
      const b = frac(it.b);
      let a = frac(it.a);
      if (!denOk(b.d) || b.n < 1 || b.n > b.d) return null;
      if (it.a === "1") { if (it.op !== "−") return null; a = { n: b.d, d: b.d }; }
      if (a.d !== b.d || a.n < 1 || a.n > a.d) return null;
      const top = it.op === "+" ? a.n + b.n : a.n - b.n;
      return top >= 0 && top <= 2 * a.d ? [top, a.d] : null;
    }
    default:
      return null;
  }
}

// fresh rounds after the page's own: the skill is always written out (the importer keeps a file's configuration as it
// is, and the player reads a fresh block without its skill as sums); den = the largest bottom number
const FRESH_COUNT = 5;
function play({ page, slug, title, items, fresh, src, notes, pictures }) {
  add({ page, slug: `fp-${slug}`, type: "fraction_play", title, content: { items }, configuration: fresh ? { fresh: { skill: fresh.skill, count: FRESH_COUNT, den: fresh.den } } : {}, src, notes, pictures });
}

// ───────────────────────────── multiple choice and matches ─────────────────────────────
// a question: { prompt, options, answer, why } (+ _v for verify()); fixed = the options in the given order
function mcq({ prompt, options, answer, why, fixed, v }) {
  return { prompt: toBn(prompt), options: options.map(toBn), answer: options.map(toBn).indexOf(toBn(answer)), why: toBn(why), _shuffle: !fixed, _v: v || null };
}
// shuffle the movable questions' options (seeded by the activity key); the right answer is never always in one place
function finishQuestions(key, questions) {
  questions.forEach((q, i) => {
    if (!q._shuffle) return;
    const right = q.options[q.answer];
    q.options = shuffled(q.options, rng(`${key}#${i}`));
    q.answer = q.options.indexOf(right);
  });
  const movable = questions.filter((q) => q._shuffle);
  if (movable.length > 1 && new Set(questions.map((q) => q.answer)).size === 1) {
    movable.forEach((q, i) => { if (i % 2) { const j = (q.answer + 1) % q.options.length; [q.options[q.answer], q.options[j]] = [q.options[j], q.options[q.answer]]; q.answer = j; } });
  }
  return { questions };
}
const pair = (left, right, kind) => ({ left: toBn(left), right: toBn(right), _v: { kind } });

// the book's words for fractions: p.92 অর্ধেক, p.93 এক চতুর্থাংশ (no hyphen), p.95 এক তৃতীয়াংশ (no hyphen) and
// দুই-তৃতীয়াংশ (with one); p.105 "পাঁচ ভাগের তিন ভাগ" (x ভাগের y ভাগ = y/x)
// (verify() compares the built text, which is NFC: য় and ড় are written as two characters there, so every word here is too)
const N = (s) => String(s).normalize("NFC");
const NAMED = Object.fromEntries(Object.entries({ "অর্ধেক": "1/2", "এক চতুর্থাংশ": "1/4", "এক তৃতীয়াংশ": "1/3", "দুই-তৃতীয়াংশ": "2/3" }).map(([k, v]) => [N(k), v]));
const COUNT_WORD = ["", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়"].map(N);
const partsInWords = (f) => `${COUNT_WORD[frac(f).d]} ভাগের ${COUNT_WORD[frac(f).n]} ভাগ`;

// ═════════════════════════════ অধ্যায় ৯ · ভগ্নাংশ (pp.91–106) ═════════════════════════════

// ── p.91–95: cutting into equal parts ──
play({
  page: 91, slug: "cut", title: "সমান ভাগে ভাগ করি",
  items: [
    pickPic(1, 2, "circle"), // p.91 মূল প্রশ্ন: the roti cut fairly (the wrong pictures have unequal parts)
    cut(1, 2, "circle"), cut(1, 2, "square"), // p.91 কাজ ১ (২) circle, (১) square: "সমান দুই টুকরা করি"
    cut(1, 2, "bar"), // p.92 কাজ ২: "কাগজের ফিতাকে সমান দুই ভাগে ভাগ করি"
    cut(1, 4, "square"), // p.93 মূল প্রশ্ন: "একটি কাগজকে ৪টি সমান অংশে ভাগ করা হয়েছে"
    cut(1, 3, "bar"), // p.95 মূল প্রশ্ন: "১ মিটার ফিতাকে সমান ৩ ভাগে ভাগ করি"
  ],
  fresh: { skill: "fcut", den: 4 },
  src: "p.91 মূল প্রশ্ন (রুটি) and কাজ ১ (square, circle), p.92 কাজ ২ (ফিতা), p.93 মূল প্রশ্ন (৪ ভাগ), p.95 মূল প্রশ্ন (১ মিটার, ৩ ভাগ)",
});

// ── p.92–93: shade ½ and ¼ of each shape ──
play({
  page: 93, slug: "shade-half-quarter", title: "১/২ ও ১/৪ অংশ রং করি",
  items: [
    shade(1, 2, "square"), shade(1, 2, "circle"), shade(1, 2, "bar"), // p.92 অনুশীলন ২ (square, circle; triangle, rectangle, pentagon → bar)
    shade(1, 4, "square"), shade(1, 4, "circle"), shade(1, 4, "bar"), // p.93 কাজ ১ (square, ellipse → circle, the two rectangles → bar)
  ],
  fresh: { skill: "fshade", den: 4 },
  src: "p.92 অনুশীলন ২ (1/2: square, circle; the triangle, the rectangle and the pentagon as one bar), p.93 কাজ ১ (1/4: square, ellipse as a circle, the two rectangles as one bar); p.94 অনুশীলন ৪ (draw and shade 1/2 and 1/4) is the same",
});

// ── p.92–94: halves and quarters (what the rounds can't ask: which strip, put together, বড়ো/সমান/ছোটো, Mina) ──
{
  const key = keyOf(94, "half-quarter");
  const WORDS3 = ["বড়ো", "সমান", "ছোটো"]; // p.94 অনুশীলন ২'s choices, in its order
  const word = (a, b) => WORDS3[1 - cmp(frac(a), frac(b))];
  const qs = [
    mcq({ prompt: "ক ফিতাটি সমান ৪ ভাগে ভাগ করা আছে। কোন টুকরাটি ক এর 1/2?", options: ["৩ ভাগ লম্বা টুকরা", "২ ভাগ লম্বা টুকরা", "১ ভাগ লম্বা টুকরা"], answer: `${toBn(4 / 2)} ভাগ লম্বা টুকরা`, fixed: true, why: "ক এর ৪ ভাগের অর্ধেক ২ ভাগ। তাই ২ ভাগ লম্বা টুকরাটি ক এর 1/2।", v: { halfOf: 4 } }),
    mcq({ prompt: "দুইটি 1/2 একত্রে রাখলে কী তৈরি হবে?", options: ["১", "2/4", "২"], answer: "১", why: "দুইটি 1/2 একত্রে রাখলে ১ (পূর্ণ) তৈরি হয়।", v: { together: ["1/2", 2] } }),
    mcq({ prompt: "চারটি 1/4 একত্রে রাখলে কী তৈরি হবে?", options: ["১", "4/16", "৪"], answer: "১", why: "চারটি 1/4 একত্রে রাখলে ১ (পূর্ণ) তৈরি হয়।", v: { together: ["1/4", 4] } }),
    mcq({ prompt: "1/4 হলো 1/2 এর থেকে …", options: WORDS3, answer: word("1/4", "1/2"), fixed: true, why: "চিত্রে 1/4 অংশ 1/2 অংশের অর্ধেক। তাই 1/4 হলো 1/2 এর থেকে ছোটো।", v: { word: ["1/4", "1/2"] } }),
    mcq({ prompt: "1/4 এর দুই টুকরা হলো 1/2 এর থেকে …", options: WORDS3, answer: word("2/4", "1/2"), fixed: true, why: "1/4 এর দুই টুকরা = 2/4, যা 1/2 এর সমান।", v: { word: ["2/4", "1/2"] } }),
    mcq({ prompt: "1/4 এর তিন টুকরা হলো 1/2 এর থেকে …", options: WORDS3, answer: word("3/4", "1/2"), fixed: true, why: "1/4 এর তিন টুকরা = 3/4। 1/2 = 2/4, তাই 3/4 বড়ো।", v: { word: ["3/4", "1/2"] } }),
    // p.94 অনুশীলন ৩ prints "ছোট" (অনুশীলন ২: ছোটো); "ডান পাশের চিত্রের" is left out (no picture)
    mcq({ prompt: "মিনা চিত্রের গাঢ় রং করা অংশ তুলনা করে বলল 1/4 থেকে 1/2 ছোট। মিনার তুলনা কি সঠিক? কেন?", options: ["না, কারণ 1/4 থেকে 1/2 বড়ো", "হ্যাঁ, মিনার তুলনা সঠিক", "না, কারণ 1/4 ও 1/2 সমান"], answer: "না, কারণ 1/4 থেকে 1/2 বড়ো", why: "1/2 অংশ হলো 1/4 এর দুই টুকরার সমান। তাই 1/4 থেকে 1/2 বড়ো; মিনার তুলনা সঠিক নয়।", v: { mina: ["1/4", "1/2"] } }),
  ];
  add({
    page: 94, slug: "half-quarter", type: "mcq", title: "অর্ধেক ও এক চতুর্থাংশ", content: finishQuestions(key, qs),
    src: "p.92 অনুশীলন ১ (which strip is 1/2 of ক) and ৩, p.93 অনুশীলন ১, p.94 অনুশীলন ২ (বড়ো/সমান/ছোটো) and ৩ (মিনা)",
    pictures: [{ item: "প্রশ্ন ১", subject: "পৃষ্ঠা ৯২ অনুশীলন ১: ক ফিতা সমান ৪ ভাগে ভাগ করা; তার নিচে ৩ ভাগ, ২ ভাগ ও ১ ভাগ লম্বা তিনটি টুকরা" }],
  });
}

// ── p.92–96: the book's names for fractions ──
add({
  page: 95, slug: "names", type: "number_match", title: "ভগ্নাংশে প্রকাশ করি · মিলাও",
  content: {
    pairs: [
      pair("1/2", "অর্ধেক", "named"), // p.92 box
      pair("1/4", "এক চতুর্থাংশ", "named"), // p.93 box
      pair("1/3 মিটার", "১ মিটারের এক তৃতীয়াংশ", "named"), // p.95 box
      pair("2/3 মিটার", "১ মিটারের দুই-তৃতীয়াংশ", "named"), // p.95 box
      pair("3/3 মিটার", "১ মিটার", "named"), // p.96: "3/3 মিটার হচ্ছে ১ মিটারের সমতুল্য"
    ],
  },
  src: "p.92, p.93 and p.95 boxes (অর্ধেক, এক চতুর্থাংশ, এক তৃতীয়াংশ, দুই-তৃতীয়াংশ), p.96 (3/3 মিটার = ১ মিটার)",
});

// ── p.95–96: how long is the coloured part (a metre strip), and shade ──
play({
  page: 95, slug: "how-long", title: "রং করা অংশ কত লম্বা? · রং করি",
  items: [
    nameIt(1, 4, "bar", "মিটার"), nameIt(1, 5, "bar", "মিটার"), // p.95 অনুশীলন ১ (১), (২)
    shade(1, 3, "bar"), // p.95 অনুশীলন ২
    nameIt(2, 3, "bar", "মিটার"), // p.95: "এখানে দুইটি 1/3 আছে। কাজেই …" (the box prints 2/3 মিটার)
    nameIt(4, 4, "bar", "মিটার"), // p.96 অনুশীলন ৩ (২) (its (১), 1/5 মিটার, is p.95 অনুশীলন ১ (২) again)
    shade(3, 5, "bar"), shade(7, 8, "bar"), // p.96 অনুশীলন ৪ (১), (২)
  ],
  src: "p.95 অনুশীলন ১–২ and the 2/3 মিটার strip, p.96 অনুশীলন ৩ (২) and ৪",
});

// ── p.96: লব and হর ──
{
  const key = keyOf(96, "numerator-denominator");
  const parts = (f) => mcq({ prompt: `${f} ভগ্নাংশে লব কোনটি এবং হর কোনটি?`, options: [`লব ${frac(f).n}, হর ${frac(f).d}`, `লব ${frac(f).d}, হর ${frac(f).n}`], answer: `লব ${frac(f).n}, হর ${frac(f).d}`, why: `দাগের উপরের সংখ্যা ${frac(f).n} লব, নিচের সংখ্যা ${frac(f).d} হর।`, v: { parts: f } });
  const box = "3/5, 7/8 কে ভগ্নাংশ বলা হয়। এখানে ৩ ও ৭ কে লব বলে এবং ৫ ও ৮ হর বলে।"; // p.96's box, as printed
  const qs = [
    mcq({ prompt: "3/5, 7/8 ভগ্নাংশে ৩ ও ৭ কে কী বলে?", options: ["লব", "হর"], answer: "লব", fixed: true, why: box, v: { role: ["3/5", "7/8", "n"] } }),
    mcq({ prompt: "3/5, 7/8 ভগ্নাংশে ৫ ও ৮ কে কী বলে?", options: ["লব", "হর"], answer: "হর", fixed: true, why: box, v: { role: ["3/5", "7/8", "d"] } }),
    ...["4/5", "1/7", "5/8", "7/9"].map(parts), // p.96 অনুশীলন ৫ (১)–(৪)
  ];
  add({ page: 96, slug: "numerator-denominator", type: "mcq", title: "লব ও হর চিনি", content: finishQuestions(key, qs), src: "p.96 box (৩ ও ৭ লব, ৫ ও ৮ হর) and অনুশীলন ৫ (১)–(৪): 4/5, 1/7, 5/8, 7/9" });
}

// ── p.96–97: the number line from 0 to 1 ──
play({
  page: 97, slug: "number-line", title: "খালিঘরে ভগ্নাংশ লিখি",
  items: [
    onLine(1, 5, "read", "মিটার"), onLine(2, 5, "read", "মিটার"), onLine(3, 5, "read", "মিটার"), onLine(4, 5, "read", "মিটার"), // p.96–97 অনুশীলন ৭ (১)
    onLine(5, 5, "read", "মিটার"), // অনুশীলন ৭ (২) "1/5 এর ৫ টুকরা কোথায়?": the strip reaches ১ মিটার, 5/5
    onLine(2, 7, "read"), onLine(5, 7, "read"), // p.97 অনুশীলন ৮ (7 parts: orange to the 2nd mark, green to the 5th)
  ],
  fresh: { skill: "fline", den: 10 },
  src: "p.96–97 অনুশীলন ৭ (১)–(২) (০ থেকে ১ মিটার, ৫ ভাগ), p.97 অনুশীলন ৮ (০ থেকে ১, ৭ ভাগ)",
  notes: ["অনুশীলন ৭ (২) “1/5 এর ৫ টুকরা কোথায়?”: খেলায় রেখার শেষে (১ মিটার) রং করা অংশটি 5/5 মিটার লেখা হয়।"],
});

// ── p.97–99: equivalent fractions, find the top ──
play({
  page: 98, slug: "equivalents-find", title: "সমতুল ভগ্নাংশ নির্ণয় করি",
  items: [
    same(1, 2, 4), same(1, 2, 6), same(1, 2, 8), same(1, 2, 10), // p.97 কাজ ১ (the wall: 1/2 = □/4, □/□ …), p.97 অনুশীলন ৯, p.98 কাজ ২
    same(1, 3, 6), same(1, 3, 9), same(1, 3, 12), same(1, 4, 8), same(1, 4, 12), // p.99 অনুশীলন ১১ (open: the bottoms are mine)
  ],
  fresh: { skill: "fsame", den: 12 },
  src: "p.97 কাজ ১ (the fraction wall) and অনুশীলন ৯, p.98 কাজ ২ ((1×3)/(2×3) …), p.99 অনুশীলন ১১ (1/3 → 6, 9, 12; 1/4 → 8, 12)",
});

// ── p.99: equivalent or not ──
play({
  page: 99, slug: "equivalent-or-not-1", title: "সমতুল বা সমতুল নয় (১)",
  items: [
    equiv("2/4", "3/6"), equiv("3/6", "4/8"), equiv("3/8", "5/10"), equiv("4/8", "5/10"), // p.99 অনুশীলন ১০
    equiv("3/4", "9/12"), equiv("2/5", "3/10"), equiv("4/6", "8/12"), equiv("3/5", "9/10"), // p.99 কাজ ৪
  ],
  fresh: { skill: "fequiv", den: 12 },
  src: "p.99 অনুশীলন ১০ (৪ জোড়া) and কাজ ৪ (৪ জোড়া; 3/4, 9/12 printed ✓)",
});

// ── p.97–99: compare ──
play({
  page: 99, slug: "compare", title: "ভগ্নাংশ তুলনা করি",
  items: [
    compare("2/5", "3/5", "bar"), // p.97 অনুশীলন ৭ (৩) "কোনটি লম্বা 2/5 মিটার নাকি 3/5 মিটার?"
    compare("1/2", "2/4", "bar"), compare("2/2", "4/4", "bar"), // p.97 অনুশীলন ৯ ("1/2 ও 2/4 একই", "2/2 ও 4/4 একই")
    compare("1/3", "2/3", "circle"), compare("2/5", "4/5", "bar"), compare("7/8", "5/8", "circle"), compare("1", "6/7", "bar"), // p.99 অনুশীলন ১২ (ক)–(ঘ)
  ],
  fresh: { skill: "fcompare", den: 9 },
  src: "p.97 অনুশীলন ৭ (৩) and ৯, p.99 অনুশীলন ১২ (ক)–(ঘ)",
});

// ── p.99: the table of equivalents ──
play({
  page: 99, slug: "equivalents-table", title: "খালিঘরে সমতুল ভগ্নাংশ লিখি",
  items: [
    same(2, 3, 6), same(2, 3, 9), same(2, 3, 12), // row 2/3 (4/6 and 6/9 printed)
    same(3, 4, 8), same(3, 4, 12), same(3, 5, 10), same(1, 6, 12), // rows 3/4, 3/5, 1/6: the cells with a bottom up to 12
  ],
  fresh: { skill: "fsame", den: 12 },
  src: "p.99 কাজ ৩ (2/3 → 6, 9, 12; 3/4 → 8, 12; 3/5 → 10; 1/6 → 12)",
});

// ── p.100–101: adding (the same bottom) ──
const NOTE_WHO = "বইয়ের প্রশ্নে “কে বেশি” জানতে চাওয়া হয়েছে; খেলায় শিশু শুধু “কত বেশি” লেখে।";
play({
  page: 100, slug: "add-stories", title: "ভগ্নাংশের যোগ",
  items: [
    story("3/5+1/5", "অংশ", "রিয়া একটি পাউরুটির 3/5 অংশ পেল। তার ভাই রাফি পাউরুটির 1/5 অংশ পেল। তারা দুইজনে একত্রে পাউরুটির কত অংশ পেল?"), // p.100 মূল প্রশ্ন
    story("2/5+3/5", "ঘণ্টা", "জাহিদের গণিতের বাড়ির কাজ শেষ করতে সময় লাগে 2/5 ঘণ্টা এবং ইংরেজির বাড়ির কাজ করতে সময় লাগে 3/5 ঘণ্টা। এই দুই বিষয়ের বাড়ির কাজ করতে তার কত ঘণ্টা সময় লাগে?"), // p.100 কাজ ১
    sum("3/7+2/7"), // p.101 কাজ ২
    story("1/7+3/7", "অংশ", "একটি বাঁশের 1/7 অংশ লাল ও 3/7 অংশ সবুজ রং করেছি। মোট কত অংশ রং করেছি?"), // p.101 কাজ ৩
    story("1/5+3/5", "মিটার", "রিয়া একটি দোকান থেকে 1/5 মিটার এবং লিয়া 3/5 মিটার রঙিন ফিতা ক্রয় করল। তারা একত্রে মোট কত মিটার ফিতা ক্রয় করল?"), // p.101 অনুশীলন ২
    story("5/8+2/8", "অংশ", "রাফি একটি কেক এর 5/8 অংশ খায় এবং নিধি 2/8 অংশ খায়। তারা একত্রে মোট কত অংশ খায়?"), // p.101 অনুশীলন ৩
    story("5/10+3/10", "কিলোমিটার", "রেজার বাড়ি বিদ্যালয় থেকে 5/10 কিলোমিটার পশ্চিমে এবং মিনার বাড়ি 3/10 কিলোমিটার পূর্বে অবস্থিত। রেজার বাড়ি থেকে মিনার বাড়ির দূরত্ব কত?"), // p.101 অনুশীলন ৪
  ],
  src: "p.100 মূল প্রশ্ন and কাজ ১ (2/5 + 3/5 = 5/5 = ১ printed), p.101 কাজ ২, কাজ ৩, অনুশীলন ২–৪",
});
play({
  page: 101, slug: "add-1", title: "যোগ করি (১)",
  items: ["1/3+2/3", "1/4+2/4", "2/5+2/5", "3/4+1/4", "3/7+1/7", "1/5+4/5", "5/6+1/6", "3/8+5/8", "5/7+2/7", "1/9+8/9", "4/8+3/8", "4/9+3/9"].map(sum),
  src: "p.101 অনুশীলন ১ (১)–(১২)",
});

// ── p.102–103: taking away ──
play({
  page: 102, slug: "sub-stories", title: "ভগ্নাংশের বিয়োগ",
  items: [
    story("4/5-2/5", "মিটার", "রেজার কাছে 4/5 মিটার ফিতা আছে। সে যদি 2/5 মিটার ফিতা মিনাকে দেয়, তাহলে তার কত মিটার ফিতা থাকবে?"), // p.102 মূল প্রশ্ন
    sum("1-3/4"), // p.102 কাজ ১ (১ − 3/4 = 1/4 printed)
    sum("7/8-2/8"), // p.103 কাজ ২
    // p.103 কাজ ৩: "কে বেশি …? কত অংশ বেশি …?"; the third sentence is the book's own working ("… পাই, সিফাত বেশি অংশে …")
    story("5/9-4/9", "অংশ", "সিফাত একটি বাগানের 5/9 অংশে ফুলের চারা লাগিয়েছে। মনিও 4/9 অংশে ফুলের চারা লাগিয়েছে। সিফাত বেশি অংশে ফুলের চারা লাগিয়েছে। কত অংশ বেশি লাগিয়েছে?"),
    story("4/5-3/5", "লিটার", "রিয়ার 4/5 লিটার জুস আছে এবং হিয়ার 3/5 লিটার জুস আছে। হিয়ার থেকে রিয়ার কত লিটার জুস বেশি আছে?"), // p.103 অনুশীলন ২
    story("5/7-3/7", "অংশ", "রনি একটি কেক-এর 3/7 অংশ এবং মনি 5/7 অংশ খায়। রনি অপেক্ষা মনি কত অংশ বেশি খায়?"), // p.103 অনুশীলন ৩
    story("6/11-5/11", "অংশ", "১ মিটার ফিতার 6/11 অংশ নিধি এবং 5/11 অংশ কেয়া নিল। যে বেশি ফিতা নিল, সে কত অংশ বেশি নিল?"), // p.103 অনুশীলন ৪ ("কে বেশি ফিতা নিল এবং কত অংশ বেশি নিল?")
  ],
  src: "p.102 মূল প্রশ্ন and কাজ ১ (১ − 3/4 = 1/4 printed), p.103 কাজ ২, কাজ ৩ and অনুশীলন ২–৪ (কাজ ৩ and অনুশীলন ৪: only “কত বেশি”)",
  notes: [NOTE_WHO],
});
play({
  page: 103, slug: "sub-1", title: "বিয়োগ করি (১)",
  items: ["1-1/2", "2/3-1/3", "3/4-1/4", "1-1/5", "4/5-2/5", "5/6-3/6", "4/7-3/7", "1-3/8", "7/9-2/9", "7/8-3/8", "1-4/9", "8/9-2/9"].map(sum),
  src: "p.103 অনুশীলন ১ (১)–(১২)",
});

// ── p.104: নিজে করি ১, the book's eight multiple-choice questions (its options in its ক–ঘ order) ──
{
  const key = keyOf(104, "tick-right-answer");
  const qs = [
    mcq({ prompt: "চিত্রে একটি আকৃতিকে সমান ৮ ভাগে ভাগ করা হয়েছে; এর ২ ভাগ রং করা। কোনটি চিত্রের খালি অংশ নির্দেশ করে?", options: ["2/8", "5/8", "6/8", "7/8"], answer: `${8 - 2}/8`, fixed: true, why: "৮ ভাগের ২ ভাগ রং করা, তাই খালি অংশ ৮ − ২ = ৬ ভাগ, অর্থাৎ 6/8।", v: { unshaded: "2/8" } }),
    mcq({ prompt: "নিচের কোনটি সঠিক?", options: ["5/9 > 2/9", "5/9 < 2/9", "2/9 > 8/9", "5/9 = 2/9"], answer: "5/9 > 2/9", fixed: true, why: "হর একই, তাই শুধু লব তুলনা করি: ৫ > ২, তাই 5/9 > 2/9।", v: { trueSentence: true } }),
    mcq({ prompt: "8/9 □ 3/9 = 5/9, খালিঘরে নিচের কোন প্রতীক বসবে?", options: ["+", "−", "×", "÷"], answer: "−", fixed: true, why: "8/9 − 3/9 = (৮ − ৩)/৯ = 5/9", v: { sign: ["8/9", "3/9", "5/9"] } }),
    mcq({ prompt: "রিয়া একটি কেকের 1/4 অংশ খেলো। রাইসা কেকটির কত অংশ খেলে রিয়ার সমতুল হবে?", options: ["2/4 অংশ", "2/6 অংশ", "2/8 অংশ", "2/10 অংশ"], answer: "2/8 অংশ", fixed: true, why: "1/4 এর লব ও হরকে ২ দ্বারা গুণ করি: (১ × ২)/(৪ × ২) = 2/8", v: { equivTo: "1/4" } }),
    mcq({ prompt: "নিচের কোনটির ভগ্নাংশগুলো 3/4 এর সমতুল?", options: ["3/8, 6/12, 9/16", "6/8, 9/12, 12/16", "6/8, 8/12, 12/16", "6/8, 9/12, 15/16"], answer: "6/8, 9/12, 12/16", fixed: true, why: "3/4 এর লব ও হরকে ২, ৩ ও ৪ দ্বারা গুণ করলে পাই 6/8, 9/12, 12/16।", v: { allEquivTo: "3/4" } }),
    mcq({ prompt: "নিচের কোন ভগ্নাংশটি ১ এর সমান?", options: ["4/6", "3/5", "3/4", "3/3"], answer: "3/3", fixed: true, why: "লব ও হর সমান হলে ভগ্নাংশটি ১ এর সমান: 3/3 = ১", v: { one: true } }),
    // the book prints "পশ্চিমে এবং এবং মিলির বাড়ি" (a typo): written once
    mcq({ prompt: "বিদ্যালয় থেকে রাশেদের বাড়ি 3/8 কিলোমিটার পশ্চিমে এবং মিলির বাড়ি 2/8 কিলোমিটার পূর্বে অবস্থিত। রাশেদের বাড়ি থেকে মিলির বাড়ির দূরত্ব কত?", options: ["1/8 কিমি", "2/8 কিমি", "3/8 কিমি", "5/8 কিমি"], answer: "5/8 কিমি", fixed: true, why: "বাড়ি দুইটি বিদ্যালয়ের দুই দিকে, তাই যোগ করি: 3/8 + 2/8 = 5/8 কিমি", v: { value: "3/8+2/8" } }),
    mcq({ prompt: "রাসেল 4/5 লিটার পানি পান করল এবং রিয়া 3/5 লিটার পানি পান করল। রিয়া অপেক্ষা রাসেল কত লিটার পানি বেশি পান করল?", options: ["4/5 লিটার", "3/5 লিটার", "2/5 লিটার", "1/5 লিটার"], answer: "1/5 লিটার", fixed: true, why: "4/5 − 3/5 = (৪ − ৩)/৫ = 1/5 লিটার", v: { value: "4/5-3/5" } }),
  ];
  add({
    page: 104, slug: "tick-right-answer", type: "mcq", title: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দিই", content: finishQuestions(key, qs),
    src: "p.104 নিজে করি ১ (১)–(৮), the book's options in its order ((৭): “এবং এবং” written once)",
    pictures: [{ item: "প্রশ্ন ১", subject: "পৃষ্ঠা ১০৪: একটি বর্গ, দুই মধ্যরেখা ও দুই কর্ণ দিয়ে সমান ৮টি ত্রিভুজে ভাগ করা; উপরের বাম দিকে ১টি লাল, নিচের ডান দিকে ১টি নীল" }],
  });
}

// ── p.105: নিজে করি ২ and ৪ (draw lines to match), ৩ (লব and হর given), ৫ (three equivalents each) ──
play({
  page: 105, slug: "match", title: "দাগ টেনে মিল করি",
  items: [
    nameIt(3, 5, "bar"), // নিজে করি ২ (a): 5 triangles in a row, 3 yellow → 3/5 (a bar in 5)
    sum("3/5+3/5"), // (b): two bars in 5, 3 shaded each, "দুইটি একত্রে" → 6/5
    equiv("4/8", "2/4"), // (c): a bar in 8 (4 shaded) and a bar in 4 (2 shaded) → "সমতুল ভগ্নাংশ"
    compare("4/4", "1", "bar"), // (d): a bar in 4, all shaded → ১
    pickPic(3, 4, "bar"), pickPic(1, 5, "bar"), pickPic(2, 3, "bar"), pickPic(1, 6, "bar"), pickPic(3, 5, "bar"), // নিজে করি ৪: each fraction to its bar
  ],
  src: "p.105 নিজে করি ২ (3/5, 6/5, সমতুল ভগ্নাংশ, ১) and নিজে করি ৪ (3/4, 1/5, 2/3, 1/6, 3/5 → their bars; the words are the next match)",
});
add({
  page: 105, slug: "words", type: "number_match", title: "ভগ্নাংশ ও কথায় · মিলাও",
  content: {
    pairs: [
      ...["3/4", "1/5", "2/3", "1/6", "3/5"].map((f) => pair(f, partsInWords(f), "parts")), // নিজে করি ৪ (the book's order)
      pair("1/2", partsInWords("1/2"), "parts"), pair("1/4", partsInWords("1/4"), "parts"), // p.92 and p.93 boxes
    ],
  },
  src: "p.105 নিজে করি ৪ (তিন ভাগের দুই ভাগ … চার ভাগের তিন ভাগ), p.92 (দুই ভাগের এক ভাগ), p.93 (চার ভাগের এক ভাগ)",
});
play({
  page: 105, slug: "from-words", title: "লব ও হর দেওয়া হলো, ভগ্নাংশ লিখি",
  items: [
    fromWords(5, 9, "d"), // p.96 অনুশীলন ৬ "একটি ভগ্নাংশ লিখি যার হর ৯ এবং লব ৫"
    fromWords(7, 13, "n"), fromWords(7, 11, "d"), fromWords(9, 17, "n"), fromWords(5, 12, "d"), // p.105 নিজে করি ৩ (১)–(৪)
  ],
  src: "p.96 অনুশীলন ৬ (হর ৯, লব ৫), p.105 নিজে করি ৩ (লব ৭ হর ১৩; হর ১১ লব ৭; লব ৯ হর ১৭; হর ১২ লব ৫)",
});
play({
  page: 105, slug: "three-equivalents", title: "৩টি করে সমতুল ভগ্নাংশ লিখি",
  items: [
    same(1, 2, 4), same(1, 2, 6), same(1, 2, 8), // 1/2
    same(3, 4, 8), same(3, 4, 12), // 3/4 (its third, 12/16, has a bottom over 12)
    same(2, 3, 6), same(2, 3, 9), same(2, 3, 12), // 2/3
    same(5, 6, 12), // 5/6 (15/18, 20/24: bottoms over 12)
  ],
  fresh: { skill: "fsame", den: 12 },
  src: "p.105 নিজে করি ৫ (1/2 → 4, 6, 8; 3/4 → 8, 12; 2/3 → 6, 9, 12; 5/6 → 12)",
});

// ── p.106: নিজে করি ৬–১১ ──
play({
  page: 106, slug: "equivalent-or-not-2", title: "সমতুল বা সমতুল নয় (২)",
  items: [equiv("2/5", "3/10"), equiv("1/4", "4/16"), equiv("2/7", "6/21"), equiv("3/8", "6/24"), equiv("3/8", "5/12"), equiv("1/7", "3/21")],
  fresh: { skill: "fequiv", den: 12 },
  src: "p.106 নিজে করি ৬ (৬ জোড়া)",
});
play({
  page: 106, slug: "add-2", title: "যোগ করি (২)",
  items: ["1/3+2/3", "3/4+1/4", "3/5+1/5", "1/4+1/4", "3/5+2/5", "1/6+5/6", "5/7+1/7", "2/8+5/8", "4/7+3/7", "1/9+5/9", "5/8+3/8", "7/9+1/9"].map(sum),
  fresh: { skill: "fadd", den: 9 },
  src: "p.106 নিজে করি ৭ (১)–(১২)",
});
play({
  page: 106, slug: "sub-2", title: "বিয়োগ করি (২)",
  items: ["1-1/3", "5/6-1/6", "3/5-1/5", "1-1/7", "3/6-2/6", "5/7-3/7", "5/8-2/8", "1-5/8", "8/9-3/9", "7/8-1/8", "1-7/9", "7/9-2/9"].map(sum),
  fresh: { skill: "fadd", den: 9 },
  src: "p.106 নিজে করি ৮ (১)–(১২)",
});
play({
  page: 106, slug: "stories", title: "নিজে করি: যোগ-বিয়োগের গল্প",
  items: [
    story("3/8+2/8", "কিলোমিটার", "বিদ্যালয় থেকে রাশেদের বাড়ি 3/8 কিলোমিটার পশ্চিমে এবং মিলির বাড়ি 2/8 কিলোমিটার পূর্বে অবস্থিত। রাশেদের বাড়ি থেকে মিলির বাড়ির দূরত্ব কত?"), // p.104 নিজে করি ১ (৭)
    story("4/5-3/5", "লিটার", "রাসেল 4/5 লিটার পানি পান করল এবং রিয়া 3/5 লিটার পানি পান করল। রিয়া অপেক্ষা রাসেল কত লিটার পানি বেশি পান করল?"), // p.104 নিজে করি ১ (৮)
    story("7/10+3/10", "কিলোমিটার", "মনির বাড়ি বিদ্যালয় থেকে 7/10 কিলোমিটার উত্তরে এবং ফাহিমের বাড়ি 3/10 কিলোমিটার দক্ষিণে অবস্থিত। মনির বাড়ি থেকে ফাহিমের বাড়ির দূরত্ব কত?"), // নিজে করি ৯
    story("5/7-3/7", "কিলোমিটার", "বিদ্যালয় থেকে সামির বাড়ির দূরত্ব 5/7 কিলোমিটার এবং মিনার বাড়ির দূরত্ব 3/7 কিলোমিটার। বিদ্যালয় থেকে যার বাড়ির দূরত্ব বেশি, তার বাড়ির দূরত্ব কত কিলোমিটার বেশি?"), // নিজে করি ১০ ("কার বাড়ির দূরত্ব বেশি এবং কত কিলোমিটার বেশি?")
    story("4/7-3/7", "অংশ", "একটি কেক-এর 4/7 অংশ রেজাকে এবং 3/7 অংশ রনিকে দেওয়া হলো। রেজাকে রনি অপেক্ষা কত অংশ কেক বেশি দেওয়া হলো?"), // নিজে করি ১১
  ],
  src: "p.104 নিজে করি ১ (৭)–(৮) (the multiple-choice stories, worked out here), p.106 নিজে করি ৯, ১০ (only “কত বেশি”) and ১১",
  notes: [NOTE_WHO],
});

// ───────────────────────────── normalize, check, verify ─────────────────────────────
const nfc = (v) => (typeof v === "string" ? v.normalize("NFC") : Array.isArray(v) ? v.map(nfc) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, nfc(x)])) : v);
// in page order (a page's activities keep the order they were made in)
const built = activities.map(nfc).map((a, i) => [a, i]).sort((x, y) => x[0].page - y[0].page || x[1] - y[1]).map(([a]) => a);
const fail = (a, msg) => { throw new Error(`${a.key} (p.${a.page}): ${msg}`); };
const FIELDS = {
  fshade: ["n", "d", "shape"], fpick: ["n", "d", "shape"], fcut: ["n", "d", "shape"], fname: ["n", "d", "shape", "unit"], fnameWords: ["n", "d", "ask", "first"],
  fline: ["n", "d", "ask", "unit"], fequiv: ["a", "b"], fcompare: ["a", "b", "shape"], fsame: ["n", "d", "d2", "ask", "shape"], fadd: ["a", "op", "b", "text", "unit"],
};
const ASCII_DIGIT = /[0-9]/;

function checkShape(a) {
  const c = a.content;
  if (ASCII_DIGIT.test(a.title)) fail(a, `title ${a.title}`);
  switch (a.type) {
    case "fraction_play": {
      if (c.items.length < 4 || c.items.length > 12) fail(a, `${c.items.length} items`);
      const seen = new Set();
      for (const it of c.items) {
        const k = JSON.stringify(it);
        if (seen.has(k)) fail(a, `repeated item ${k}`); seen.add(k);
        // only the fields the round keeps (anything else would be dropped by the importer)
        const allowed = FIELDS[it.kind === "fname" && it.ask === "words" ? "fnameWords" : it.kind];
        if (!allowed) fail(a, `kind ${it.kind}`);
        for (const f of Object.keys(it)) if (f !== "kind" && !allowed.includes(f)) fail(a, `${it.kind} has "${f}"`);
        if (it.text != null && (!it.text || it.text.length > 500 || ASCII_DIGIT.test(it.text) || it.text !== it.text.replace(/\s+/g, " ").trim())) fail(a, `story text ${it.text}`);
        if (it.unit != null && (!it.unit || it.unit.length > 24)) fail(a, `unit ${it.unit}`);
      }
      const f = a.configuration.fresh;
      if (f && (Object.keys(f).join() !== "skill,count,den" || !["fraction", ...Object.keys(FIELDS)].includes(f.skill) || f.count !== FRESH_COUNT || !denOk(f.den))) fail(a, "fresh");
      break;
    }
    case "number_match": {
      if (c.pairs.length < 4 || c.pairs.length > 8) fail(a, `${c.pairs.length} pairs`);
      if (new Set(c.pairs.map((p) => p.left)).size !== c.pairs.length) fail(a, "repeated left");
      if (new Set(c.pairs.map((p) => p.right)).size !== c.pairs.length) fail(a, "repeated right");
      if (c.pairs.some((p) => ASCII_DIGIT.test(p.left + p.right))) fail(a, "ASCII digit in a pair");
      break;
    }
    case "mcq": {
      if (c.questions.length < 5 || c.questions.length > 10) fail(a, `${c.questions.length} questions`);
      for (const q of c.questions) {
        if (q.options.length < 2 || q.options.length > 4) fail(a, `options: ${q.prompt}`);
        if (new Set(q.options).size !== q.options.length) fail(a, `repeated option: ${q.prompt}`);
        if (!(q.answer >= 0 && q.answer < q.options.length)) fail(a, `answer: ${q.prompt}`);
        if (q.options.some((o) => o.length > 60)) fail(a, `long option: ${q.prompt}`);
        if (!q.why || q.why.length > 160) fail(a, `why (${(q.why || "").length}): ${q.prompt}`);
        if (ASCII_DIGIT.test(q.prompt + q.options.join("") + q.why)) fail(a, `ASCII digit: ${q.prompt}`);
      }
      if (new Set(c.questions.map((q) => q.answer)).size === 1) fail(a, "the right answer is always in one place");
      break;
    }
    default: fail(a, `type ${a.type}`);
  }
}

// every answer again, from the Bangla text alone
const fracVal = (s) => frac(s.trim().split(/\s+/)[0]); // "৫/৮ কিমি" → 5/8
function verify(a) {
  const c = a.content;
  if (a.type === "fraction_play") {
    for (const it of c.items) {
      if (answerOf(it) == null) fail(a, `can't be asked: ${JSON.stringify(it)}`);
      if (it.text != null) {
        // the story's two fractions are the round's (the bigger first when taking away)
        const inText = fracsIn(it.text), A = frac(it.a), B = frac(it.b);
        const want = it.a === "1" ? [B] : [A, B];
        if (inText.length !== want.length || !want.every((f) => inText.some((g) => sameFrac(f, g)))) fail(a, `the story's fractions aren't ${it.a}, ${it.b}: ${it.text}`);
        if (it.op === "−" && cmp(A, B) < 0) fail(a, `takes the bigger away: ${it.a} − ${it.b}`);
        if (!it.text.includes(it.unit === "অংশ" ? "অংশ" : it.unit)) fail(a, `the unit ${it.unit} isn't in the story`);
      }
    }
  } else if (a.type === "number_match") {
    for (const p of c.pairs) {
      const k = p._v.kind;
      let ok = false;
      if (k === "parts") { const m = /^(\S+) ভাগের (\S+) ভাগ$/.exec(p.right); ok = !!m && sameFrac(frac(p.left), { n: COUNT_WORD.indexOf(m[2]), d: COUNT_WORD.indexOf(m[1]) }); }
      if (k === "named") {
        const unitL = / মিটার$/.test(p.left), unitR = /মিটার/.test(p.right);
        const left = frac(p.left.replace(/ মিটার$/, ""));
        const name = p.right.replace(/^১ মিটারের /, "");
        const right = name === "১ মিটার" ? { n: 1, d: 1 } : NAMED[name] ? frac(NAMED[name]) : null;
        ok = unitL === unitR && !!right && cmp(left, right) === 0;
      }
      if (!ok) fail(a, `pair ${p.left} ↔ ${p.right}`);
    }
  } else if (a.type === "mcq") {
    for (const q of c.questions) {
      const v = q._v; if (!v) fail(a, `no check: ${q.prompt}`);
      const got = q.options[q.answer];
      const only = (pred) => { if (!pred(got) || q.options.filter(pred).length !== 1) fail(a, `answer of: ${q.prompt}`); };
      const nums = (s) => (fromBn(s).match(/\d+/g) || []).map(Number);
      if (v.halfOf) only((o) => nums(o)[0] * 2 === v.halfOf);
      else if (v.together) { const f = frac(v.together[0]); only((o) => o === toBn(1) && f.n * v.together[1] === f.d); }
      else if (v.word) { const r = cmp(frac(v.word[0]), frac(v.word[1])); only((o) => o === N(r < 0 ? "ছোটো" : r > 0 ? "বড়ো" : "সমান")); }
      else if (v.mina) { const r = cmp(frac(v.mina[1]), frac(v.mina[0])); only((o) => r > 0 && o.startsWith("না") && o.includes(N(`${toBn(v.mina[1])} বড়ো`))); }
      else if (v.role) { const [x, y, w] = v.role.map((s, i) => (i < 2 ? frac(s) : s)); only((o) => o === (w === "n" ? "লব" : "হর") && nums(q.prompt).slice(-2).join() === (w === "n" ? [x.n, y.n] : [x.d, y.d]).join()); }
      else if (v.parts) { const f = frac(v.parts); only((o) => { const m = /^লব (\S+), হর (\S+)$/.exec(o); return !!m && Number(fromBn(m[1])) === f.n && Number(fromBn(m[2])) === f.d; }); }
      else if (v.unshaded) { const f = frac(v.unshaded); only((o) => sameFrac(fracVal(o), { n: f.d - f.n, d: f.d })); }
      else if (v.trueSentence) only((o) => { const m = /^(\S+) ([<>=]) (\S+)$/.exec(o); const r = cmp(frac(m[1]), frac(m[3])); return m[2] === ["<", "=", ">"][r + 1]; });
      else if (v.sign) { const [x, y, z] = v.sign.map(frac); only((o) => (o === "+" ? x.n + y.n === z.n : o === "−" ? x.n - y.n === z.n : false) && x.d === y.d && y.d === z.d); }
      else if (v.equivTo) only((o) => cmp(fracVal(o), frac(v.equivTo)) === 0);
      else if (v.allEquivTo) only((o) => o.split(",").every((s) => cmp(frac(s), frac(v.allEquivTo)) === 0));
      else if (v.one) only((o) => cmp(frac(o), { n: 1, d: 1 }) === 0);
      else if (v.value) { const s = sum(v.value), r = answerOf(s); only((o) => sameFrac(fracVal(o), { n: r[0], d: r[1] })); }
      else fail(a, "unknown check");
    }
  }
}

const keys = new Set(), qrs = new Set(), codes = new Set();
for (const a of built) {
  if (keys.has(a.key) || a.key.length > 60) fail(a, "key"); keys.add(a.key);
  if (qrs.has(a.qr)) fail(a, "repeated qr"); qrs.add(a.qr);
  if (!/^LS[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/.test(a.code) || codes.has(a.code) || class2Codes.includes(a.code)) fail(a, "code"); codes.add(a.code);
  checkShape(a);
  verify(a);
}

// ───────────────────────────── write the file and the README ─────────────────────────────
const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const file = {
  format: "ebidyaloy-activity-import",
  version: 1,
  book: { title: "প্রাথমিক গণিত - ক্লাস থ্রি", edition: "bn", editionName: "বাংলা", language: "bn", base: true, chapters: CHAPTERS },
  activities: built,
};
fs.writeFileSync(OUT_JSON, JSON.stringify(file, strip, 2) + "\n");

const TYPE_NAME = { fraction_play: "Fraction Play", mcq: "Multiple Choice", number_match: "Number Match" };
const KIND_NAME = { fshade: "shade", fpick: "pick", fname: "name", fcut: "cut", fwhole: "whole", fcompare: "compare", fequiv: "equivalent?", fline: "number line", fsame: "same amount", fadd: "add/take away", fgroup: "group" };
const roundsOf = (a) => {
  const k = {};
  a.content.items.forEach((it) => { const w = it.kind === "fname" && it.ask === "words" ? "name (লব/হর in words)" : it.kind === "fadd" ? (it.text ? "stories" : it.op === "+" ? "add" : "take away") : KIND_NAME[it.kind]; k[w] = (k[w] || 0) + 1; });
  const f = a.configuration.fresh;
  return `${a.content.items.length} items (${Object.entries(k).map(([x, n]) => `${n} ${x}`).join(", ")})${f ? ` + ${f.count} fresh ${f.skill} (den ${f.den})` : ""}`;
};
const itemsOf = (a) => (a.type === "fraction_play" ? roundsOf(a) : a.content.pairs ? `${a.content.pairs.length} pairs` : `${a.content.questions.length} questions`);
const countOf = (a) => (a.content.items || a.content.pairs || a.content.questions).length;
const srcOf = (a) => activities.find((x) => x.key === a.key)._src;
const row = (a) => `| ${a.page} | ${TYPE_NAME[a.type]} | ${a.title} | \`${a.code}\` | ${a.qr} | ${itemsOf(a)} | ${srcOf(a)} |`;
const byType = Object.keys(TYPE_NAME).map((t) => [t, built.filter((a) => a.type === t)]).filter(([, l]) => l.length);
const kinds = {};
built.filter((a) => a.type === "fraction_play").forEach((a) => a.content.items.forEach((it) => { kinds[it.kind] = (kinds[it.kind] || 0) + 1; }));
const fp = built.filter((a) => a.type === "fraction_play");

const NOTES = [
  "**Chapters:** the book block lists all 13 chapters of the সূচিপত্র (PDF p.6), named as the Class 2 file names them (“অধ্যায় ৯ · ভগ্নাংশ”). Every activity is in chapter ৯. The importer adds the file's chapter list to the book (it has none yet) and that list is the book's reading order, so a later chapter's file keeps its place; a chapter without activities isn't shown on the book page. Set `ALL_CHAPTERS = false` in build.js to give the book only chapter ৯.",
  "**Shapes:** the rounds draw a circle, a bar or a square, always cut into equal parts. p.92 অনুশীলন ২'s five shapes (square, circle, triangle, a rectangle cut on its diagonal, a house-shaped pentagon with no line drawn) are three rounds: square, circle and bar (the triangle, the rectangle and the pentagon). p.93 কাজ ১'s ellipse is a circle; its two rectangles cut into one half and two quarters (a diagonal plus a half-diagonal; a triangle inside a rectangle) are one bar in 4. p.105 নিজে করি ২ (a)'s row of 5 triangles (3 yellow, read at 500 dpi by the survey) is a bar in 5. p.99 অনুশীলন ১২ has no pictures: the circle/bar for each pair is mine.",
  "**p.92 অনুশীলন ৩, p.93 অনুশীলন ১** (“দুইটি 1/2 একত্রে রাখলে □ তৈরি হয়”): the box is read as ১ (a whole); the book doesn't say which word it expects.",
  "**Two-part stories** (“কে বেশি … এবং কত বেশি”) ask only the amount. p.103 কাজ ৩: the story's third sentence is the book's own printed working (“… সিফাত বেশি অংশে ফুলের চারা লাগিয়েছে।”), then “কত অংশ বেশি লাগিয়েছে?”. p.103 অনুশীলন ৪ ends “যে বেশি ফিতা নিল, সে কত অংশ বেশি নিল?” and p.106 নিজে করি ১০ “বিদ্যালয় থেকে যার বাড়ির দূরত্ব বেশি, তার বাড়ির দূরত্ব কত কিলোমিটার বেশি?” (my wording). Both activities say so in their guide note.",
  "**p.104 নিজে করি ১ (৭)** prints “পশ্চিমে এবং এবং মিলির বাড়ি”; the file writes “এবং” once (in the multiple choice and in the story round on p.106).",
  "**p.104 নিজে করি ১ (১)** asks about the picture beside it (a square cut by its two midlines and two diagonals into 8 triangles, 2 coloured). The question says it in words (“চিত্রে একটি আকৃতিকে সমান ৮ ভাগে ভাগ করা হয়েছে; এর ২ ভাগ রং করা।”) and the guide asks for the picture. The other seven are as printed, with the book's options in its ক–ঘ order (answers গ, ক, খ, গ, খ, ঘ, ঘ, ঘ).",
  "**p.94 অনুশীলন ৩** prints “ছোট” (অনুশীলন ২ and the rest of the chapter: ছোটো); the question keeps “ছোট”. “ডান পাশের চিত্রের” is left out (no picture), and “কেন?” is answered by the options (“না, কারণ 1/4 থেকে 1/2 বড়ো”).",
  "**Equivalents (same amount):** a bottom can be at most ১২. Open-ended ones, my bottoms: p.99 অনুশীলন ১১ 1/3 → □/6, □/9, □/12 and 1/4 → □/8, □/12. p.99 কাজ ৩ (seven cells a row) keeps the cells with a bottom up to 12: 2/3 → 6 (4/6 printed), 9 (6/9 printed), 12; 3/4 → 8, 12; 3/5 → 10; 1/6 → 12. p.105 নিজে করি ৫ (“৩টি করে”): 1/2 → 4, 6, 8; 2/3 → 6, 9, 12; 3/4 → 8, 12 (only two); 5/6 → 12 (only one).",
  "**p.97 অনুশীলন ৭ (২)** “1/5 এর ৫ টুকরা কোথায়?” is a *read* round (the coloured part reaches ১ মিটার: 5/5 মিটার), not a *place* round: the player lets a child tap only the inner marks of the line, never 0 or 1 (the server would accept n = d for “place”, but it can't be answered). Its guide note says so.",
  "**p.97 অনুশীলন ৮:** the line has 7 equal parts (8 marks; checked at 200 dpi): orange 2/7, green 5/7.",
  "**p.91 মূল প্রশ্ন** (the roti cut fairly or not) is a *pick* round (1/2 of a circle): the player's wrong pictures include unequal parts. p.91 কাজ ১ folds the square three ways and the circle two ways; each is one *cut* round.",
  "**p.96 অনুশীলন ৩ (১)** (a metre in 5, 1 green) is the same picture as p.95 অনুশীলন ১ (২), so it is one round. The p.95 2/3 মিটার strip (the box prints the answer) is a round too.",
  "**p.105 নিজে করি ২ (d)** (a bar in 4, all shaded; the book's answer ১) is a compare round, 4/4 ○ ১ (=); (b) “দুইটি একত্রে” is 3/5 + 3/5 = 6/5, more than one whole.",
  "**Fresh rounds:** each activity that drills one kind of round adds 5 of that kind after the book's, with its skill written out and `den` the largest bottom (cut/shade ৪, number line ১০, compare ৯, equivalents ১২, add/take away ৯). Fresh *add/take away* rounds mix + and − (and ১ − n/d), so “যোগ করি (১)” (p.101: subtraction comes on p.102) and “বিয়োগ করি (১)” (p.103) have none; only the p.106 review drills get them. The story and mixed activities have none.",
  "**p.104 নিজে করি ১ (৭)–(৮)** are stories with four choices; the p.106 story activity asks them again to be worked out (typed), with নিজে করি ৯–১১.",
  "**Digits:** the questions, matches and stories are in Bangla digits; the rounds' numbers (n, d, \"3/5\") are ASCII, as the importer reads them (the player shows them in Bangla). The book never reduces a fraction (2/4, 6/8, 5/5) and neither do the rounds: 2/5 + 3/5 asks 5/5 (the book: 5/5 = ১).",
];
const CANT = [
  "p.91 কাজ ১: folding the same square three ways (vertical, horizontal, diagonal) and the circle two ways; a cut round cuts each whole once, in equal parts of its own drawing.",
  "p.92 অনুশীলন ২ (3)–(5) and p.93 কাজ ১ (3)–(4): triangles, the pentagon (with no halving line drawn), and wholes cut into unequal-looking parts (1/2 + 1/4 + 1/4) where the child must find the quarter.",
  "p.92 অনুশীলন ১ (which strip is half of ক), p.92–93 “… একত্রে রাখলে □ তৈরি হয়”, p.94 অনুশীলন ২ (the words বড়ো/সমান/ছোটো), অনুশীলন ৩ (true or not, and why) and p.96 অনুশীলন ৫ (mark the লব △ and the হর ○): no round asks these, so they are multiple choice (pp.94, 96).",
  "p.94 অনুশীলন ৪ (draw two shapes, shade 1/2 and 1/4): the p.93 shading rounds stand for it.",
  "p.97 অনুশীলন ৭ (২): placing 5/5 at the end of the line (see above).",
  "p.98 কাজ ২ (1×□)/(2×□) = 4/8 (find the multiplier) and the cross-multiplication boxes of p.98–99 (অনুশীলন ১০: “৪ × ৩ = ১২, ২ × ৬ = ১২”): an equivalent round only asks সমতুল or not; a same-amount round asks the top.",
  "p.99 কাজ ৩'s cells with a bottom over 12 (2/3 → 10/15, 12/18, 14/21, 16/24; 3/4 → 12/16 …; 3/5 → 9/15 …; 1/6 → 3/18 …) and p.105 নিজে করি ৫'s 12/16, 15/18, 20/24.",
  "The scaffolds “রং করেছি 1/7 অংশ + 3/7 অংশ = (□ + □)/□” (p.101 কাজ ৩) and “গাণিতিক বাক্য □/□ − □/□ = (□ − □)/□ = □/□” (p.103 কাজ ৩): a round asks only the answer (and + or − first, for a story).",
  "Two answers to one story (“কে বেশি … এবং কত বেশি”: a name and an amount), p.103 কাজ ৩, অনুশীলন ৪, p.106 নিজে করি ১০.",
  "p.105 নিজে করি ৪'s three columns (fraction ↔ bar ↔ words) are two activities (pick rounds and a match); নিজে করি ২'s four rows are four rounds of different kinds, not lines drawn between columns.",
  "Pictures in multiple choice: p.104 নিজে করি ১ (১) is in words (the guide asks for the picture). The p.100 bread slices and the p.94 rhombuses aren't drawn.",
];

const md = [];
md.push("# প্রাথমিক গণিত, তৃতীয় শ্রেণি · অধ্যায় ৯ ভগ্নাংশ: Activity Studio file", "");
md.push("`ACTIVITIES-bn.json` is an **eBidyaloy Activity Studio activity file** (format `ebidyaloy-activity-import`, version 1) for the fraction chapter of the NCTB textbook *প্রাথমিক গণিত, তৃতীয় শ্রেণি* (2026 edition), printed pp.91–106. Import it into the book **/b/GVB5V3** (“প্রাথমিক গণিত - ক্লাস থ্রি”, 162 pages, id `6ae830fca87df2fa704174bc`; no language course): the file is a Bangla subject book's (`book.language: \"bn\"`, no `teachLanguage`), like the Class 2 file. Every activity comes in as a draft, tied to the printed page it practises; its code (`LS…`) is permanent and can be printed in a QR.", "");
md.push(`- **${built.length} activities**, all in chapter “${CHAPTER}”, in Bangla with Bangla digits; no voice is needed (two multiple-choice questions ask for a picture in their guide).`);
md.push(`- Per type: ${byType.map(([t, l]) => `${TYPE_NAME[t]} **${l.length}** (${l.reduce((s, a) => s + countOf(a), 0)} ${t === "mcq" ? "questions" : t === "number_match" ? "pairs" : "items"})`).join(" · ")}`);
md.push(`- Fraction Play rounds: ${Object.entries(kinds).map(([k, n]) => `${k} **${n}**`).join(" · ")}; ${fp.filter((a) => a.configuration.fresh).length} activities add 5 fresh rounds each.`, "");
md.push("**Fraction Play** (`fraction_play`, on the Work It Out engine) copies the pages' own exercises as rounds: cut, shade, pick and name a picture, write a fraction from its লব and হর, the 0–1 number line, compare (<, =, >), equivalent or not (সমতুল / সমতুল নয়), the same amount (n/d = □/d2), and adding or taking away with the same bottom (the stories as printed, with their unit; the child picks + or − first). The rounds carry **no answers**: the server works every one out when the file is imported. Where a page drills one kind of round, `configuration.fresh` adds 5 new rounds of that kind after the book's (`{ skill, count, den }`, the skill always written out).", "");
md.push("Printed page = PDF page − 6 (printed p.91 is PDF p.97).", "");
md.push("## Activities", "");
md.push("| Page | Type | Title | Code | QR | Content | From |", "|---:|---|---|---|---|---|---|");
for (const a of built) md.push(row(a));
md.push("", "## Rebuild and check", "");
md.push("```sh", "cd ~/Downloads/class3-math-activities", "source ~/.nvm/nvm.sh && nvm use 16", "node build.js      # writes ACTIVITIES-bn.json and this README", "node validate.js   # the importer's own checks, the server's answers against ours, the book's and the survey's", "```", "");
md.push("`build.js` holds every fraction as the page prints it (ASCII digits) and computes every answer; before writing it parses each right option and each pair back from its Bangla text and checks it again, and it stops on any mistake. The codes come from a hash of each activity's key, so a rebuild keeps them (a new activity gets a new code; renaming a key changes its code); none is a code of the Class 2 file. `validate.js` runs the backend's `checkImportFile` and `importContent`, then `normalizeWorkItems(items, \"fraction_play\")` on every Fraction Play activity (every round kept with all its fields, the server's answer equal to ours, to the book's where it prints one and to the survey's; a round that is in neither list fails, but for four listed there: p.91's roti as a pick round and three open cells whose bottoms are mine, so a typing slip can't pass), `workItOutConfig` on every fresh block, and checks the codes against the Class 2 file and the other activity files in ~/Downloads. Nothing is written anywhere.", "");
md.push("Source: `FRACTION-PAGES.md` (the page-by-page survey), checked against the PDF (pp.91–106 at 100 dpi, p.97 অনুশীলন ৮ at 200 dpi) and the সূচিপত্র (PDF p.6).", "");
md.push("## What I wasn't sure of, and choices made", "");
for (const n of NOTES) md.push(`- ${n}`);
md.push("", "## What the types can't express", "");
for (const n of CANT) md.push(`- ${n}`);
md.push("");
fs.writeFileSync(OUT_README, md.join("\n"));

console.log(`${built.length} activities → ${OUT_JSON}`);
console.log(`  types: ${byType.map(([t, l]) => `${t} ${l.length} (${l.reduce((s, a) => s + countOf(a), 0)})`).join(", ")}`);
console.log(`  fraction_play rounds: ${Object.entries(kinds).map(([k, n]) => `${k} ${n}`).join(", ")}`);
for (const a of built) console.log(`  p.${a.page} ${a.qr} ${a.code} ${a.type} "${a.title}": ${itemsOf(a)}`);
