#!/usr/bin/env node
// প্রাথমিক গণিত, দ্বিতীয় শ্রেণি (NCTB, 2026 edition) → an Activity Studio activity file (ACTIVITIES-bn.json)
// and its README.md; since 2 Nov 2026 also ACTIVITIES-bn-update-2026-11-02-tools.json (the math tools only, to import
// into the book that has the first 85). Run:  node build.js
//
// How it works
// - Every number is typed here with ASCII digits, exactly as the page prints it (page = the PRINTED page number;
//   PDF page = printed page + 9). toBn() writes it in Bangla digits.
// - Every sum, difference, product, comparison, order, group and "next number" is COMPUTED below; no answer is
//   typed by hand. The Bangla number words come from the table on pp.1–6 (WORDS), transcribed from the book.
// - Before writing, verify() parses the Bangla text of every pair, answer, order and group back into numbers and
//   checks it again; the build stops on any mistake. Codes (LS + 6) come from a hash of each activity's key, so a
//   rebuild keeps them.
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const OUT_JSON = path.join(__dirname, "ACTIVITIES-bn.json");
const OUT_UPDATE = path.join(__dirname, "ACTIVITIES-bn-update-2026-11-02-tools.json"); // the tools update only (2 Nov 2026)
const OUT_PAGES = path.join(__dirname, "ACTIVITIES-bn-update-2026-11-03-pages.json"); // the every-page update only (3 Nov 2026)
const OUT_README = path.join(__dirname, "README.md");

// ───────────────────────────── Bangla digits and arithmetic ─────────────────────────────
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const toBn = (v) => String(v).replace(/[0-9]/g, (d) => BN_DIGITS[+d]);
const fromBn = (s) => String(s).replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
const SIGN = { "+": "+", "-": "−", "*": "×" }; // shown signs: plus, minus (U+2212), times (U+00D7)
// "45-23" → "৪৫ − ২৩"
const show = (expr) => toBn(expr.replace(/\s+/g, "").replace(/[+\-*]/g, (o) => ` ${SIGN[o]} `));
// + − × on whole numbers (× first); takes ASCII ("45-23") or the shown Bangla ("৪৫ − ২৩")
function calc(expr) {
  const s = fromBn(expr).replace(/−/g, "-").replace(/×/g, "*").replace(/\s+/g, "");
  if (!/^\d+([+\-*]\d+)*$/.test(s)) throw new Error(`can't evaluate "${expr}"`);
  return s.split(/(?=[+\-])/).reduce((sum, term) => {
    const sign = term[0] === "-" ? -1 : 1;
    return sum + sign * term.replace(/^[+\-]/, "").split("*").reduce((p, f) => p * Number(f), 1);
  }, 0);
}
// the first whole number in a text ("১৩২ টাকা" → 132)
const numIn = (text) => { const m = fromBn(text).match(/\d+/); return m ? Number(m[0]) : NaN; };
const allNums = (text) => (fromBn(text).match(/\d+/g) || []).map(Number);

// ───────────────────────────── the book's words (transcribed) ─────────────────────────────
// pp.1–6: numbers 21–100 in words, exactly as the book spells them (ঊন… with ঊ; চন্দ্রবিন্দু in পঁচিশ, সাঁইত্রিশ…)
const WORDS = {
  21: "একুশ", 22: "বাইশ", 23: "তেইশ", 24: "চব্বিশ", 25: "পঁচিশ", 26: "ছাব্বিশ", 27: "সাতাশ", 28: "আটাশ", 29: "ঊনত্রিশ", 30: "ত্রিশ",
  31: "একত্রিশ", 32: "বত্রিশ", 33: "তেত্রিশ", 34: "চৌত্রিশ", 35: "পঁয়ত্রিশ", 36: "ছত্রিশ", 37: "সাঁইত্রিশ", 38: "আটত্রিশ", 39: "ঊনচল্লিশ", 40: "চল্লিশ",
  41: "একচল্লিশ", 42: "বিয়াল্লিশ", 43: "তেতাল্লিশ", 44: "চুয়াল্লিশ", 45: "পঁয়তাল্লিশ", 46: "ছেচল্লিশ", 47: "সাতচল্লিশ", 48: "আটচল্লিশ", 49: "ঊনপঞ্চাশ", 50: "পঞ্চাশ",
  51: "একান্ন", 52: "বায়ান্ন", 53: "তিপ্পান্ন", 54: "চুয়ান্ন", 55: "পঞ্চান্ন", 56: "ছাপ্পান্ন", 57: "সাতান্ন", 58: "আটান্ন", 59: "ঊনষাট", 60: "ষাট",
  61: "একষট্টি", 62: "বাষট্টি", 63: "তেষট্টি", 64: "চৌষট্টি", 65: "পঁয়ষট্টি", 66: "ছেষট্টি", 67: "সাতষট্টি", 68: "আটষট্টি", 69: "ঊনসত্তর", 70: "সত্তর",
  71: "একাত্তর", 72: "বাহাত্তর", 73: "তিয়াত্তর", 74: "চুয়াত্তর", 75: "পঁচাত্তর", 76: "ছিয়াত্তর", 77: "সাতাত্তর", 78: "আটাত্তর", 79: "ঊনআশি", 80: "আশি",
  81: "একাশি", 82: "বিরাশি", 83: "তিরাশি", 84: "চুরাশি", 85: "পঁচাশি", 86: "ছিয়াশি", 87: "সাতাশি", 88: "আটাশি", 89: "ঊননব্বই", 90: "নব্বই",
  91: "একানব্বই", 92: "বিরানব্বই", 93: "তিরানব্বই", 94: "চুরানব্বই", 95: "পঁচানব্বই", 96: "ছিয়ানব্বই", 97: "সাতানব্বই", 98: "আটানব্বই", 99: "নিরানব্বই", 100: "একশত",
};
// p.13 uses these smaller numbers and hundreds (একশত দশ, নয়শত আট …); p.10 তিনশত পঁয়তাল্লিশ
const SMALL_WORDS = { 8: "আট", 10: "দশ" };
const HUNDREDS = { 1: "একশত", 3: "তিনশত", 5: "পাঁচশত", 6: "ছয়শত", 8: "আটশত", 9: "নয়শত" };
function inWords(n) {
  if (n <= 100) { const w = WORDS[n] || SMALL_WORDS[n]; if (!w) throw new Error(`no word for ${n}`); return w; }
  const h = Math.floor(n / 100), rest = n % 100;
  if (!HUNDREDS[h] || n > 999) throw new Error(`no word for ${n}`);
  return rest ? `${HUNDREDS[h]} ${inWords(rest)}` : HUNDREDS[h];
}
// words → number (for verify): the reverse of the tables above
function fromWords(text) {
  const rev = {}; for (const [n, w] of Object.entries({ ...WORDS, ...SMALL_WORDS })) rev[w] = Number(n);
  const hrev = {}; for (const [h, w] of Object.entries(HUNDREDS)) hrev[w] = Number(h) * 100;
  const parts = text.split(" ");
  if (hrev[parts[0]] != null) return hrev[parts[0]] + (parts.length > 1 ? fromWords(parts.slice(1).join(" ")) : 0);
  if (parts.length !== 1 || rev[text] == null) return NaN;
  return rev[text];
}

// p.34 and p.37: ordinal numbers (ক্রমবাচক সংখ্যা) and their short forms (সংক্ষিপ্ত রূপ; ১ম–৫ম as p.7 prints them)
const ORD = ["প্রথম", "দ্বিতীয়", "তৃতীয়", "চতুর্থ", "পঞ্চম", "ষষ্ঠ", "সপ্তম", "অষ্টম", "নবম", "দশম"];
const ORD_SHORT = ["১ম", "২য়", "৩য়", "৪র্থ", "৫ম", "৬ষ্ঠ", "৭ম", "৮ম", "৯ম", "১০ম"];
// p.17–21: place names
const PLACE = ["একক", "দশক", "শতক", "হাজার"];
// p.119–120: days and months, as the book prints them
const DAYS = ["শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার"]; // the book's circle; we start at শনিবার
const BN_MONTHS = ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];
const EN_MONTHS = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

// ───────────────────────────── book, chapters, codes ─────────────────────────────
const CHAPTERS = [
  "অধ্যায় ১ · সংখ্যা ও স্থানীয় মান", "অধ্যায় ২ · যোগ ও বিয়োগ", "অধ্যায় ৩ · গুণ", "অধ্যায় ৪ · জ্যামিতিক আকৃতি ও প্যাটার্ন",
  "অধ্যায় ৫ · পরিমাপ", "অধ্যায় ৬ · মুদ্রা", "অধ্যায় ৭ · উপাত্ত",
];
// printed pages: ১ 1–39 · ২ 40–72 · ৩ 73–101 · ৪ 102–106 · ৫ 107–120 · ৬ 121–124 · ৭ 125–127
const CHAPTER_FIRST_PAGE = [1, 40, 73, 102, 107, 121, 125];
const chapterOf = (page) => { let c = 0; CHAPTER_FIRST_PAGE.forEach((p, i) => { if (page >= p) c = i; }); return CHAPTERS[c]; };

const CODE_ABC = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // the import alphabet (no I, L, O, 0, 1)
const usedCodes = new Set();
function codeFor(key) {
  for (let salt = 0; ; salt++) {
    const h = crypto.createHash("sha256").update(`ebidyaloy-class2-math:${key}:${salt}`).digest();
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
const keyOf = (page, slug) => `m2-p${String(page).padStart(3, "0")}-${slug}`;
function add({ page, slug, type, title, content, notes, src, configuration }) {
  const key = keyOf(page, slug);
  perPage[page] = (perPage[page] || 0) + 1;
  const qr = `M2-p${page}-${"abcdefghij"[perPage[page] - 1]}`;
  activities.push({
    key, qr, code: codeFor(key), type, title, chapter: chapterOf(page), page, configuration: configuration || {}, content,
    guide: { audio: null, pictures: [], notes: notes || [] }, _src: src || "",
  });
}

// ───────────────────────────── content builders ─────────────────────────────
// Number / Equation Match: rows [{ left, right, _v }]
const pairs = (rows) => ({ pairs: rows });
// Equation Match from the page's exercises (book order), skipping a repeated left or answer, at most n pairs
function eqPairs(exprs, n = 8) {
  const out = [], L = new Set(), R = new Set();
  for (const e of exprs) {
    const left = show(e), right = toBn(calc(e));
    if (L.has(left) || R.has(right)) continue;
    L.add(left); R.add(right); out.push({ left, right, _v: { kind: "eq" } });
    if (out.length === n) break;
  }
  return pairs(out);
}
// place value text (p.20 writes the 0s: "১ শতক ২ দশক ০ একক"; p.21 leaves them out: "১ শতক ৮ একক")
function placeValueText(n, withZeros) {
  const digits = String(n).split("").reverse();
  const parts = [];
  for (let i = digits.length - 1; i >= 0; i--) if (withZeros || digits[i] !== "0") parts.push(`${toBn(digits[i])} ${PLACE[i]}`);
  return parts.join(" ");
}
const fromPlaceValue = (text) => { let n = 0; fromBn(text).replace(/(\d+) (একক|দশক|শতক|হাজার)/g, (_, d, p) => { n += Number(d) * Math.pow(10, PLACE.indexOf(p)); }); return n; };

// a multiple-choice question: { prompt, options, answer, why } (+ _v for verify())
//   answer: the right option's text; others: wrong options (shuffled together), or fixed: all options in a fixed order
function mcq({ prompt, answer, others, fixed, why, v }) {
  const options = fixed ? fixed.slice() : [answer, ...others];
  return { prompt, options, answer: options.indexOf(answer), why, _shuffle: !fixed, _v: v || null };
}
// numeric answers: the right number and three (or two) near ones that a child might write
function numAlts(ans, extra, count) {
  const out = [];
  for (const x of [...extra, ans + 10, ans - 10, ans + 1, ans - 1, ans + 2, ans + 100]) {
    if (Number.isInteger(x) && x >= 0 && x !== ans && !out.includes(x)) out.push(x);
    if (out.length === count) break;
  }
  return out;
}
// a question whose answer is a computed number: expr (ASCII) / div, written with its unit ("২৬টি", "১৩২ টাকা")
function numQ({ prompt, expr, div = 1, unit = "", extra = [], why, count = 3 }) {
  const ans = calc(expr) / div;
  if (!Number.isInteger(ans)) throw new Error(`not whole: ${expr}/${div}`);
  const alts = numAlts(ans, extra.map((e) => (typeof e === "string" ? calc(e) / div : e)), count);
  const txt = (n) => `${toBn(n)}${unit}`;
  return mcq({ prompt, answer: txt(ans), others: alts.map(txt), why: why || `${show(expr)} = ${toBn(calc(expr))}`, v: { expr, div } });
}
// a multiplication story (ch.3): a in each group, b groups → a × b (the book reads ৩ × ৪ as "৩ করে ৪ বার", p.76)
const mulQ = (prompt, a, b, unit) => numQ({
  prompt, expr: `${a}*${b}`, unit, extra: [`${a}+${b}`, `${a}*${b - 1}`, `${a}*${b + 1}`],
  why: `${toBn(a)} কে ${toBn(b)} বার যোগ করি: ${toBn(a)} × ${toBn(b)} = ${toBn(a * b)}`,
});
// shuffle each question's options (seeded by the activity key); make sure the right answer isn't always in one place
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

// ═════════════════════════════ অধ্যায় ১ · সংখ্যা ও স্থানীয় মান (pp.1–39) ═════════════════════════════
const wordPairs = (nums) => pairs(nums.map((n) => ({ left: toBn(n), right: inWords(n), _v: { kind: "words" } })));
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

add({ page: 1, slug: "words-21-28", type: "number_match", title: "সংখ্যা ও কথায় (২১–২৮) · মিলাও", content: wordPairs(range(21, 28)), src: "pp.1–2 table" });
add({ page: 2, slug: "words-29-36", type: "number_match", title: "সংখ্যা ও কথায় (২৯–৩৬) · মিলাও", content: wordPairs(range(29, 36)), src: "pp.2–3 table" });
add({ page: 4, slug: "words-37-44", type: "number_match", title: "সংখ্যা ও কথায় (৩৭–৪৪) · মিলাও", content: wordPairs(range(37, 44)), src: "pp.4–5 table" });
add({ page: 5, slug: "words-45-50", type: "number_match", title: "সংখ্যা ও কথায় (৪৫–৫০) · মিলাও", content: wordPairs(range(45, 50)), src: "pp.5–6 table" });
// p.7 নিজে করি 1: "২৪, ৪৭, ৩২, ৫৯, ৮৭, ৭৫, ৯৩, ৮৯, ৮৬, ৯৯, ১০০" (24, 47, 32 are already in the sets above)
add({ page: 7, slug: "words-51-100", type: "number_match", title: "সংখ্যা ও কথায় (৫১–১০০) · মিলাও", content: wordPairs([59, 87, 75, 93, 89, 86, 99, 100]), src: "p.7 নিজে করি 1 (words from the p.6 table)" });

// p.13 পড়ি ও অঙ্কে লিখি (and p.10's তিনশত পঁয়তাল্লিশ): the book's own words, checked against our composition
const BOOK_3DIGIT = [[345, "তিনশত পঁয়তাল্লিশ"], [110, "একশত দশ"], [349, "তিনশত ঊনপঞ্চাশ"], [585, "পাঁচশত পঁচাশি"], [672, "ছয়শত বাহাত্তর"], [850, "আটশত পঞ্চাশ"], [908, "নয়শত আট"]];
for (const [n, printed] of BOOK_3DIGIT) if (inWords(n) !== printed) throw new Error(`p.13: ${n} → ${inWords(n)} ≠ ${printed}`);
add({ page: 13, slug: "words-hundreds", type: "number_match", title: "তিন অঙ্কের সংখ্যা কথায় · মিলাও", content: wordPairs(BOOK_3DIGIT.map(([n]) => n)), src: "p.13 পড়ি ও অঙ্কে লিখি + p.10" });

// p.16 নিজে করি: বড়ো সংখ্যাটিতে / ছোটো সংখ্যাটিতে গোল দাগ দিই
function compareWhy(a, b, want) {
  const sa = String(a), sb = String(b);
  if (sa.length !== sb.length) throw new Error("compare: different lengths");
  const win = want === "max" ? Math.max(a, b) : Math.min(a, b);
  const same = [];
  for (let i = 0; i < sa.length; i++) {
    const place = PLACE[sa.length - 1 - i];
    if (sa[i] === sb[i]) { same.push(place); continue; }
    const big = Math.max(+sa[i], +sb[i]), small = Math.min(+sa[i], +sb[i]);
    const head = same.length ? `${same.join(" ও ")} স্থানের অঙ্ক সমান। ` : "";
    return `${head}${place} স্থানের ${toBn(small)} থেকে ${toBn(big)} বড়ো। তাই ${toBn(win)} ${want === "max" ? "বড়ো" : "ছোটো"}।`;
  }
  throw new Error("compare: equal numbers");
}
const cmpQ = (a, b, want) => mcq({
  prompt: `কোনটি ${want === "max" ? "বড়ো" : "ছোটো"}: ${toBn(a)} না ${toBn(b)}?`,
  answer: toBn(want === "max" ? Math.max(a, b) : Math.min(a, b)), fixed: [toBn(a), toBn(b), "দুটি সমান"],
  why: compareWhy(a, b, want), v: { cmp: want },
});
{
  const key = keyOf(16, "compare");
  const big = [[85, 57], [524, 348], [634, 670], [423, 428], [823, 540]];
  const small = [[75, 65], [423, 337], [557, 642], [876, 706], [678, 948]];
  add({ page: 16, slug: "compare", type: "mcq", title: "কোনটি বড়ো? কোনটি ছোটো?", content: finishQuestions(key, [...big.map(([a, b]) => cmpQ(a, b, "max")), ...small.map(([a, b]) => cmpQ(a, b, "min"))]), src: "p.16 নিজে করি 1–2" });
}

// p.20 খালিঘর পূরণ করি (with the 0s) and p.21 খালিঘর পূরণ করি (without them)
add({
  page: 20, slug: "place-value", type: "number_match", title: "স্থানীয় মান · মিলাও",
  content: pairs([...[56, 83, 120, 467].map((n) => [n, true]), ...[74, 108, 230, 782].map((n) => [n, false])].map(([n, z]) => ({ left: placeValueText(n, z), right: toBn(n), _v: { kind: "pv" } }))),
  src: "p.20 নিজে করি 1 + p.21 2",
});

// p.21 3: নিচের সংখ্যাগুলোর প্রতিটি অঙ্কের স্থানীয় মান লিখি — "২৪, ৫৬, ৭৩, ৯৮, ১০৫, ৩২৮, ৬৩৯, ৮৪০, ৯৫৭, ১০০০"
{
  const key = keyOf(21, "digit-value");
  const asks = [[24, 2], [56, 6], [73, 3], [98, 9], [105, 1], [328, 2], [639, 3], [840, 8], [957, 7], [1000, 1]]; // [number, the digit asked]
  const qs = asks.map(([n, d]) => {
    const s = String(n), pos = s.length - 1 - s.indexOf(String(d));
    if (s.split(String(d)).length !== 2) throw new Error(`p.21: ${d} isn't once in ${n}`);
    const val = d * Math.pow(10, pos);
    const choices = [d, d * 10, d * 100, ...(pos === 3 ? [d * 1000] : [])].filter((x) => x !== val).map(toBn);
    return mcq({ prompt: `${toBn(n)} সংখ্যায় ${toBn(d)} এর স্থানীয় মান কত?`, answer: toBn(val), others: choices, why: `${toBn(d)} আছে ${PLACE[pos]} স্থানে: ${toBn(d)} ${PLACE[pos]} = ${toBn(val)}`, v: { pv: true } });
  });
  add({ page: 21, slug: "digit-value", type: "mcq", title: "কোন অঙ্কের স্থানীয় মান কত?", content: finishQuestions(key, qs), src: "p.21 3" });
}

// p.24: ছোটো থেকে বড়ো ক্রমানুসারে সাজাই — the worked example (২৩২, ২২৩, ২৩৯) and rows (1)–(2)
add({
  page: 24, slug: "small-to-big", type: "sequence", title: "ছোটো থেকে বড়ো সাজাও",
  content: { items: [232, 223, 239, 432, 328, 540, 529, 517, 549].sort((a, b) => a - b).map((n) => ({ text: toBn(n) })), _v: { order: "asc" } },
  src: "p.24 example + rows (1)–(2)",
});

// p.29 অনুশীলন 1–2: জোড় ও বিজোড় সংখ্যা লিখি
add({
  page: 29, slug: "even-odd", type: "categorize", title: "জোড় না বিজোড়?",
  content: {
    categories: [{ name: "জোড় সংখ্যা", emoji: "" }, { name: "বিজোড় সংখ্যা", emoji: "" }],
    items: [8, 13, 20, 11, 24, 9, 6, 15, 12, 25, 23, 32].map((n) => ({ text: toBn(n), category: n % 2, emoji: "" })),
    _v: { rule: "parity" },
  },
  src: "p.29 অনুশীলন 1 (first six) + 2 (first six)",
});

// pp.30–33 সংখ্যা প্যাটার্ন: পরবর্তী সংখ্যা (the rule is found from the numbers themselves)
function nextOf(seq) {
  const d = seq.slice(1).map((x, i) => x - seq[i]);
  if (d.every((x) => x === d[0])) return { ans: seq[seq.length - 1] + d[0], step: d[0] };
  const dd = d.slice(1).map((x, i) => x - d[i]);
  if (dd.every((x) => x === dd[0])) return { ans: seq[seq.length - 1] + d[d.length - 1] + dd[0], diffs: d, grow: d[d.length - 1] + dd[0] };
  throw new Error(`no rule for ${seq}`);
}
function patternQ(seq) {
  const r = nextOf(seq), last = seq[seq.length - 1];
  const why = r.step != null
    ? (r.step > 0 ? `প্রতিবার ${toBn(r.step)} করে বাড়ছে: ${toBn(last)} + ${toBn(r.step)} = ${toBn(r.ans)}` : `প্রতিবার ${toBn(-r.step)} করে কমছে: ${toBn(last)} − ${toBn(-r.step)} = ${toBn(r.ans)}`)
    : `পার্থক্য ${r.diffs.map(toBn).join(", ")} করে বাড়ছে, তাই এবার ${toBn(r.grow)} বাড়বে: ${toBn(last)} + ${toBn(r.grow)} = ${toBn(r.ans)}`;
  const step = r.step != null ? r.step : r.grow;
  return mcq({ prompt: `পরের সংখ্যাটি কত? ${seq.map(toBn).join(", ")}, …`, answer: toBn(r.ans), others: numAlts(r.ans, [r.ans + step, r.ans - 1, r.ans + 1], 3).map(toBn), why, v: { pattern: "next" } });
}
function gapQ(before, after) { // "৪০, ৪২, ☐, ৪৬"
  const step = before[1] - before[0], ans = before[before.length - 1] + step;
  if (after[0] !== ans + step) throw new Error("gap pattern");
  const shown = [...before.map(toBn), "☐", ...after.map(toBn)].join(", ");
  return mcq({ prompt: `খালি ঘরে কোন সংখ্যা বসবে? ${shown}`, answer: toBn(ans), others: numAlts(ans, [ans + 1, ans - 1, ans + step], 3).map(toBn), why: `প্রতিবার ${toBn(step)} করে বাড়ছে: ${toBn(before[before.length - 1])} + ${toBn(step)} = ${toBn(ans)}`, v: { pattern: "gap" } });
}
{
  const key = keyOf(33, "patterns");
  const qs = [
    patternQ([2, 4, 6, 8]), patternQ([15, 20, 25]), patternQ([21, 19, 17, 15]), // p.30 (1)–(3)
    patternQ([1, 3, 5, 7]), patternQ([2, 3, 5, 8, 12]), gapQ([40, 42], [46]), // p.33 নিজে করি 1
    patternQ([16, 18, 20]), patternQ([37, 39, 41]), // p.33 2
    patternQ([3, 6, 9]), patternQ([15, 13, 11]), // p.33 5
  ];
  add({ page: 33, slug: "patterns", type: "mcq", title: "সংখ্যা প্যাটার্ন: পরের সংখ্যা", content: finishQuestions(key, qs), src: "p.30 + p.33 নিজে করি 1, 2, 5" });
}

// p.34 / p.37 ক্রমবাচক সংখ্যা: সংক্ষিপ্ত রূপ ↔ কথায়
add({ page: 34, slug: "ordinals", type: "number_match", title: "ক্রমবাচক সংখ্যা · মিলাও", content: pairs(range(0, 7).map((i) => ({ left: ORD_SHORT[i], right: ORD[i], _v: { kind: "ord" } }))), src: "p.34 table (১–৫), p.37 table (৬–১০)" });

// pp.34–37: who is where in a line (names of the p.34 animals and p.35 fruits are read from the pictures)
{
  const key = keyOf(37, "ordinals-line");
  const r = rng(`${key}#others`);
  const posQ = (intro, line, sideName, fromEnd, nth, who = "কে") => {
    const seq = fromEnd ? line.slice().reverse() : line;
    const ans = seq[nth - 1];
    const others = shuffled(line.filter((x) => x !== ans), r).slice(0, 3);
    return mcq({ prompt: `${intro} ${sideName} থেকে ${who} ${ORD[nth - 1]}?`, answer: ans, others, why: `${sideName} থেকে গুনলে ${ORD[nth - 1]} হলো ${ans}।` });
  };
  const placeQ = (intro, line, who, sideName, fromEnd) => {
    const seq = fromEnd ? line.slice().reverse() : line;
    const i = seq.indexOf(who);
    const others = [i - 1, i + 1, i + 2].filter((j) => j >= 0 && j < ORD.length).slice(0, 2).map((j) => ORD[j]);
    return mcq({ prompt: `${intro} ${sideName} থেকে ${who} কততম?`, answer: ORD[i], others, why: `${sideName} থেকে গুনলে ${who} ${ORD[i]}।` });
  };
  const ANIMALS = ["হাতি", "ঘোড়া", "বাঘ", "খরগোশ", "মোরগ"]; // p.34, left → right
  const FRUITS = ["আনারস", "আপেল", "আঙুর", "কলা", "তরমুজ"]; // p.35, left → right
  const LINE = ["নাসিমা", "আলী", "সবিতা", "ডেভিড", "তামিম", "আব্দুর রহিম", "আব্দুল করিম", "আলেয়া", "রতন", "জারিয়া"]; // p.37, front → back
  const aIntro = `বাম থেকে ডানে আছে: ${ANIMALS.join(", ")}।`;
  const fIntro = `বাম থেকে ডানে আছে: ${FRUITS.join(", ")}।`;
  const lIntro = `লাইনে সামনে থেকে পিছনে আছে: ${LINE.join(", ")}।`;
  const qs = [
    posQ(aIntro, ANIMALS, "বাম", false, 2), posQ(aIntro, ANIMALS, "ডান", true, 1), posQ(aIntro, ANIMALS, "ডান", true, 3),
    posQ(fIntro, FRUITS, "ডান", true, 4, "কোনটি"),
    posQ(lIntro, LINE, "সামনে", false, 6), posQ(lIntro, LINE, "পিছন", true, 7),
    placeQ(lIntro, LINE, "আলেয়া", "সামনে", false), placeQ(lIntro, LINE, "আলেয়া", "পিছন", true),
    numQ({ prompt: "কয়েকজন শিশু লাইনে দাঁড়িয়ে আছে। সবিতা সামনে থেকে দ্বিতীয় এবং তার পিছনে আরও ৫ জন শিশু আছে। লাইনে কতজন শিশু আছে?", expr: "2+5", unit: " জন", extra: [5, 6], why: "সবিতা পর্যন্ত ২ জন, তার পিছনে ৫ জন: ২ + ৫ = ৭" }),
    numQ({ prompt: "কয়েকজন শিশু লাইনে দাঁড়িয়ে আছে। রাজু সামনে থেকে তৃতীয় এবং পিছন থেকে পঞ্চম। লাইনে কতজন শিশু আছে?", expr: "3+5-1", unit: " জন", extra: ["3+5", 6], why: "দুদিক থেকে গুনলে রাজুকে দুবার গোনা হয়: ৩ + ৫ − ১ = ৭" }),
  ];
  add({ page: 37, slug: "ordinals-line", type: "mcq", title: "কে কোথায়? ক্রমবাচক সংখ্যা", content: finishQuestions(key, qs), src: "p.34 1, p.35 2, p.36 3–4, p.37 5" });
}

// ═════════════════════════════ অধ্যায় ২ · যোগ ও বিয়োগ (pp.40–72) ═════════════════════════════
add({ page: 42, slug: "add-1", type: "equation_match", title: "যোগ করি (১) · মিলাও", content: eqPairs(["32+30", "51+14", "32+22", "50+20", "65+13", "22+36", "72+15", "71+5", "8+60", "35+10"]), src: "p.42 1–2" });
// p.44 (4) prints "৭৮ + ০৮" in columns: written ৭৮ + ৮
add({ page: 44, slug: "add-2", type: "equation_match", title: "যোগ করি (২) · মিলাও", content: eqPairs(["23+18", "45+27", "52+38", "78+8", "26+37", "37+53", "45+45", "47+18", "65+5", "42+29"]), src: "p.44 1 (a repeated answer is skipped)" });
add({ page: 48, slug: "sub-1", type: "equation_match", title: "বিয়োগ করি (১) · মিলাও", content: eqPairs(["45-23", "32-11", "68-12", "79-50", "98-67", "49-10", "66-40", "58-18", "70-30", "38-34"]), src: "p.48 4" });
add({ page: 51, slug: "sub-2", type: "equation_match", title: "বিয়োগ করি (২) · মিলাও", content: eqPairs(["97-59", "71-44", "75-47", "60-53", "70-22", "32-15", "85-47", "64-27", "92-23"]), src: "p.51 1–2 (দশক থেকে ১ দশ নিয়ে, p.50)" });

// p.54 খালি ঘর পূরণ করি, and the stories on pp.52 and 54
function missingQ(template) { // "9+?=16": the box is found by trying every number
  const [lhs, rhs] = template.split("=");
  const fits = range(0, 1000).filter((x) => calc(lhs.replace("?", String(x))) === calc(rhs.replace("?", String(x))));
  if (fits.length !== 1) throw new Error(`p.54: ${template} has ${fits.length} answers`);
  const x = fits[0];
  // the box in place of the number ("?" is shown as a lone ০ first, then that ০ becomes ☐)
  const box = (s) => (s.includes("?") ? show(s.replace("?", "0")).replace(/(^|\s)০(?=\s|$)/, "$1☐") : show(s));
  const shown = `${box(lhs)} = ${box(rhs)}`;
  if ((shown.match(/☐/g) || []).length !== 1) throw new Error(`p.54: box in ${template}`);
  const filled = `${show(lhs.replace("?", String(x)))} = ${show(rhs.replace("?", String(x)))}`;
  return mcq({ prompt: `খালি ঘরে কোন সংখ্যা বসবে? ${shown}`, answer: toBn(x), others: numAlts(x, [x + 1, x - 1, x + 10], 3).map(toBn), why: `${filled}, তাই খালি ঘরে ${toBn(x)} বসবে।`, v: { missing: template } });
}
{
  const key = keyOf(54, "missing-and-stories");
  const qs = [
    missingQ("9+?=16"), missingQ("39-?=31"), missingQ("?+23=34"), missingQ("14+?=35"), missingQ("?-39=45"), missingQ("12+9-?=13"),
    numQ({ prompt: "রুমির ৭৫টি মারবেল আছে এবং রাজুর ৪৯টি মারবেল আছে। রুমি থেকে রাজুর কয়টি মারবেল কম আছে?", expr: "75-49", unit: "টি", extra: ["75+49", "75-49+10"] }),
    numQ({ prompt: "মা ও মেয়ের বয়স একত্রে ৭০ বছর। মেয়ের বয়স ২২ বছর। মায়ের বয়স কত?", expr: "70-22", unit: " বছর", extra: ["70+22"] }),
    numQ({ prompt: "জলিল সাহেব বাজার থেকে ১০০টি লিচু কিনলেন। বাড়িতে এসে ২৫টি মেয়েকে, ২৩টি ছেলেকে দিলেন। তার কাছে কতটি লিচু থাকল?", expr: "100-25-23", unit: "টি", extra: ["100-25", "25+23"] }),
    numQ({ prompt: "কোনো বাক্সে ২৫টি চকলেট ছিল। এর থেকে কয়েকটি চকলেট মিতুকে দেওয়া হলো। বাক্সে ১৭টি চকলেট থাকল। কয়টি চকলেট মিতুকে দেওয়া হয়েছিল?", expr: "25-17", unit: "টি", extra: ["25+17"] }),
  ];
  add({ page: 54, slug: "missing-and-stories", type: "mcq", title: "খালি ঘর ও গল্পের অঙ্ক", content: finishQuestions(key, qs), src: "p.54 1 (1)–(9 of 10), p.52 5 (1)–(2), p.54 3–4" });
}

// pp.55 and 64: adding and taking away tens (rapid)
{
  const key = keyOf(64, "tens-rapid");
  const exprs = ["80+50", "60+60", "50+90", "500+200", "140+20", "50+220", "170-40", "900-220", "390-70", "520-30"];
  const r = rng(`${key}#alts`);
  const qs = exprs.map((e) => {
    const ans = calc(e);
    const alts = shuffled([ans + 10, ans - 10, ans + 100, ans - 100].filter((x) => x >= 0), r).slice(0, 2);
    return mcq({ prompt: `${show(e)} = ?`, answer: toBn(ans), others: alts.map(toBn), why: `${show(e)} = ${toBn(ans)}`, v: { expr: e, div: 1 } });
  });
  add({ page: 64, slug: "tens-rapid", type: "rapid_quiz", title: "দশকের যোগ-বিয়োগ · দ্রুত", content: finishQuestions(key, qs), src: "p.55 যোগ করি + p.64 বিয়োগ করি" });
}

// p.59 যোগ করি 1–2 (p.59 1(3) "৫২৩ + ৬১৪" is more than ১০০০ — left out)
add({ page: 59, slug: "add-3digit", type: "equation_match", title: "তিন অঙ্কের যোগ · মিলাও", content: eqPairs(["526+253", "552+436", "872+127", "672+326", "438+31", "462+3", "953+46", "620+370", "233+355", "438+521", "232+354", "423+241", "555+324"]), src: "p.59 1–2" });
add({ page: 66, slug: "sub-3digit", type: "equation_match", title: "তিন অঙ্কের বিয়োগ · মিলাও", content: eqPairs(["325-13", "527-28", "735-48", "474-81", "829-75", "930-40", "509-25", "729-56", "845-58"]), src: "p.66 1–2" });

// pp.68–72 যোগ ও বিয়োগ সংক্রান্ত সমস্যা
{
  const key = keyOf(71, "word-problems");
  const qs = [
    numQ({ prompt: "শ্যামল ৩৮৫ টাকা নিয়ে বাজারে গেল। সে ২৫৩ টাকা খরচ করল। তার কাছে কত টাকা থাকল?", expr: "385-253", unit: " টাকা", extra: ["385+253"] }),
    numQ({ prompt: "ক্রিকেট খেলায় বাংলাদেশ দল ৩৫৮ রান করেছে এবং শ্রীলঙ্কা দল ৩১২ রান করেছে। বাংলাদেশ দল কত রান বেশি করেছে?", expr: "358-312", unit: " রান", extra: ["358+312", "358-312+10"] }),
    numQ({ prompt: "একটি বিদ্যালয়ে ৫৪২ জন শিক্ষার্থী আছে। ছাত্রীর সংখ্যা ২৯০। ঐ বিদ্যালয়ে ছাত্রের সংখ্যা কত?", expr: "542-290", unit: " জন", extra: ["542+290", "542-290+100"] }),
    numQ({ prompt: "একটি পুকুরে ২০০টি তেলাপিয়া মাছ ছিল এবং ১৬৫টি তেলাপিয়া মাছ বিক্রি করা হলো। পুকুরে আর কতগুলো তেলাপিয়া মাছ রইল?", expr: "200-165", unit: "টি", extra: ["200-165+10", "200-165+100"] }),
    numQ({ prompt: "শাকিবের ৩টি একশ টাকার নোট ছিল, তা থেকে মিনাকে ২২৫ টাকা দিল। শাকিবের কাছে কত টাকা রইল?", expr: "300-225", unit: " টাকা", extra: ["225-100", "300-225+10"], why: "৩টি একশ টাকার নোট = ৩০০ টাকা; ৩০০ − ২২৫ = ৭৫" }),
    numQ({ prompt: "একটি বিদ্যালয়ে ৬২৫ জন শিক্ষার্থী ছিল। বছরের শুরুতে ২৭৫ জন নতুন ভর্তি হলো এবং ৩৫ জন চলে গেল। কতজন শিক্ষার্থী রইল?", expr: "625+275-35", unit: " জন", extra: ["625+275", "625+275+35"] }),
    numQ({ prompt: "ঝুমার ২৫০ টাকা আছে এবং বাবা তাকে আরও ১৫০ টাকা দিলেন। ঝুমা ২৩০ টাকা দিয়ে একটি বই কিনল। তার কাছে আর কত টাকা রইল?", expr: "250+150-230", unit: " টাকা", extra: ["250+150", "250-230"] }),
    numQ({ prompt: "দুটি সংখ্যার যোগফল ৮৪০। এদের একটি সংখ্যা ৫২৭ হলে অপর সংখ্যাটি কত?", expr: "840-527", extra: ["840+527", "840-527+10"] }),
    numQ({ prompt: "সুজন ১০০০ টাকা উপবৃত্তি পেল। সে তা থেকে ৩৫০ টাকা দিয়ে ড্রেস এবং ৪৭৫ টাকা দিয়ে স্কুলের ব্যাগ কিনল। তার নিকট কত টাকা রইল?", expr: "1000-350-475", unit: " টাকা", extra: ["350+475", "1000-350"] }),
    numQ({ prompt: "নিজাম সাহেব ৯৭০ টাকা নিয়ে বাজারে গেলেন। তিনি ৫৫০ টাকা দিয়ে গরুর মাংস এবং ৩৭০ টাকা দিয়ে একটি মুরগি কিনলেন। তার নিকট কত টাকা রইল?", expr: "970-550-370", unit: " টাকা", extra: ["550+370", "970-550"] }),
  ];
  add({ page: 71, slug: "word-problems", type: "mcq", title: "যোগ ও বিয়োগের সমস্যা", content: finishQuestions(key, qs), src: "p.68 2–4, 10, 12; p.71 1–3; p.72 10, 15" });
}

// ═════════════════════════════ অধ্যায় ৩ · গুণ (pp.73–101) ═════════════════════════════
// p.73–80: the plates and benches as repeated addition ↔ গুণ (৩ + ৩ + ৩ + ৩ = ৩ × ৪, p.76); no two with the same product
{
  const groups = [[3, 4], [4, 5], [3, 5], [2, 5], [5, 6], [2, 7]]; // p.76 benches, p.73 fish, p.73 potatoes, p.77 apples, p.80 lychees, p.83 Mina's pages
  const products = groups.map(([a, b]) => a * b);
  if (new Set(products).size !== products.length) throw new Error("p.76: two pairs with the same product");
  add({
    page: 76, slug: "repeated-addition", type: "equation_match", title: "যোগ থেকে গুণ · মিলাও",
    content: pairs(groups.map(([a, b]) => ({ left: show(Array(b).fill(a).join("+")), right: show(`${a}*${b}`), _v: { kind: "eq" } }))),
    src: "p.73, p.76, p.77, p.80, p.83",
  });
}
add({ page: 83, slug: "tables-2-5", type: "equation_match", title: "২ ও ৫ এর নামতা · মিলাও", content: eqPairs(["5*3", "5*7", "5*9", "5*6", "2*4", "2*7", "2*9", "2*6"]), src: "p.80 and p.83 tables" });
function tableRapid(key, exprs) {
  return finishQuestions(key, exprs.map((e) => {
    const [a, b] = e.split("*").map(Number), ans = a * b;
    return mcq({ prompt: `${show(e)} = ?`, answer: toBn(ans), others: [a * (b - 1), a * (b + 1)].map(toBn), why: `${show(e)} = ${toBn(ans)}`, v: { expr: e, div: 1 } });
  }));
}
add({ page: 87, slug: "tables-2-5-rapid", type: "rapid_quiz", title: "নামতা ২–৫ · দ্রুত", content: tableRapid(keyOf(87, "tables-2-5-rapid"), ["3*6", "4*7", "2*8", "5*4", "3*9", "4*6", "5*8", "2*9", "4*9", "3*8"]), src: "pp.80–87 tables of 5, 2, 3, 4" });
add({ page: 93, slug: "tables-6-9", type: "equation_match", title: "৬, ৭, ৮ ও ৯ এর নামতা · মিলাও", content: eqPairs(["6*4", "6*7", "7*3", "7*8", "8*5", "8*9", "9*6", "9*7"]), src: "pp.89–93 tables" });
add({ page: 97, slug: "tables-6-10-rapid", type: "rapid_quiz", title: "নামতা ৬–১০ · দ্রুত", content: tableRapid(keyOf(97, "tables-6-10-rapid"), ["6*8", "7*6", "8*4", "9*3", "10*7", "6*9", "7*7", "8*8", "9*9", "10*5"]), src: "p.97 গুণের নামতা" });

// p.98 গুণের বিনিময় and which numbers make 16, 24, 36, 63, 72; p.95 (১ এর গুণ), p.96 (০ এর গুণ)
function productQ(target, exprs) {
  const right = exprs.filter((e) => calc(e) === target);
  if (right.length !== 1) throw new Error(`p.98: ${target} needs exactly one right option`);
  return mcq({ prompt: `${toBn(target)} কোন দুটি সংখ্যার গুণফল?`, answer: show(right[0]), others: exprs.filter((e) => e !== right[0]).map(show), why: `${show(right[0])} = ${toBn(target)}`, v: { product: target } });
}
{
  const key = keyOf(98, "commutative");
  const qs = [
    numQ({ prompt: "৩ × ৪ = ১২ হলে ৪ × ৩ = কত?", expr: "4*3", extra: ["4+3", "4*4"], why: "সংখ্যা বিনিময় করে গুণ করলে গুণফলের কোনো পরিবর্তন হয় না: ৪ × ৩ = ১২" }),
    productQ(16, ["2*8", "3*5", "4*5", "3*6"]), productQ(24, ["3*8", "5*5", "4*5", "3*7"]), productQ(36, ["4*9", "5*7", "6*5", "4*8"]),
    productQ(63, ["7*9", "8*8", "6*9", "7*8"]), productQ(72, ["8*9", "7*9", "8*8", "6*9"]),
    mcq({ prompt: "কোনো সংখ্যাকে ০ দিয়ে গুণ করলে গুণফল কত হয়?", answer: "০", others: ["১", "সংখ্যাটি নিজেই"], why: "যখন একটি সংখ্যাকে ০ দিয়ে গুণ করা হয়, তখন এর উত্তর সবসময়ই ০ হবে।" }),
    numQ({ prompt: "০ × ২ = কত?", expr: "0*2", extra: ["0+2", 1] }),
    numQ({ prompt: "১ × ৭ = কত?", expr: "1*7", extra: ["1+7", 1] }),
  ];
  add({ page: 98, slug: "commutative", type: "mcq", title: "গুণের বিনিময়, ১ ও ০ এর গুণ", content: finishQuestions(key, qs), src: "p.98 1–2, p.95, p.96" });
}
add({ page: 99, slug: "two-digit", type: "equation_match", title: "দুই অঙ্কের সংখ্যার গুণ · মিলাও", content: eqPairs(["12*4", "14*2", "23*3", "11*7", "32*3", "34*2", "21*4"]), src: "p.99 example + 1" });
{
  const key = keyOf(101, "word-problems");
  const qs = [
    mulQ("৬টি থালায় প্রতিটিতে ৫টি করে লিচু আছে। একত্রে কতগুলো লিচু আছে?", 5, 6, "টি"), // p.80
    mulQ("মিনা প্রতিদিন একটি বইয়ের ২ পৃষ্ঠা পড়ে। সে ৭ দিনে কত পৃষ্ঠা পড়ে?", 2, 7, " পৃষ্ঠা"), // p.83
    mulQ("একটি পরিবারে ৩ জন সদস্য থাকলে এরূপ ৯টি পরিবারে কতজন সদস্য থাকবে?", 3, 9, " জন"), // p.85
    mulQ("১টি বিড়ালের ৪টি পা আছে। ৮টি বিড়ালের মোট কতটি পা আছে?", 4, 8, "টি"), // p.87
    mulQ("বাদলের বাবা এক সপ্তাহে ৫ দিন কাজ করেন। তিনি ৬ সপ্তাহে কতদিন কাজ করেন?", 5, 6, " দিন"), // p.89
    mulQ("৭ দিনে ১ সপ্তাহ। ৮ সপ্তাহে কত দিন?", 7, 8, " দিন"), // p.91
    mulQ("একটি শ্রেণিকক্ষে প্রতিটি দলে ৮ জন করে শিক্ষার্থী আছে। যদি ৯টি দল থাকে, তবে সেখানে কতজন শিক্ষার্থী থাকবে?", 8, 9, " জন"), // p.92
    mulQ("প্রতিটি ঝুড়িতে ৯টি করে রুটি রাখা যায়। এরকম ৭টি ঝুড়িতে কতগুলো রুটি রাখা যায়?", 9, 7, "টি"), // p.93
    mulQ("রাজুর বাবা এক দিনে ৮ ঘণ্টা কাজ করেন। যদি তিনি ৩ দিন কাজ করেন, তবে কত ঘণ্টা কাজ হবে?", 8, 3, " ঘণ্টা"), // p.99
    mulQ("উজ্জ্বল ৪টি বই কিনতে চায়। প্রতিটি বইয়ের দাম ২২ টাকা। বই কিনতে তার কত টাকা লাগবে?", 22, 4, " টাকা"), // p.101
  ];
  add({ page: 101, slug: "word-problems", type: "mcq", title: "গুণের সমস্যা", content: finishQuestions(key, qs), src: "pp.80, 83, 85, 87, 89, 91, 92, 93, 99, 101" });
}

// ═════════════════════════════ অধ্যায় ৪ · জ্যামিতিক আকৃতি ও প্যাটার্ন (pp.102–106) ═════════════════════════════
const SHAPES = ["ত্রিভুজাকার", "চতুর্ভুজাকার", "গোলাকার"]; // p.103: তিনকোনা – ত্রিভুজ, চারকোনা – চতুর্ভুজ, গোলাকৃতি – গোলাকার
const SHAPE_OF = { // what pp.102–104 show or say
  "সমুচা": 0, "পিরামিড": 0,
  "বই": 1, "ম্যাচ বাক্স": 1, "ইট": 1, "পাউরুটি": 1,
  "ফুটবল": 2, "১ টাকার কয়েন": 2, "মার্বেল": 2, "আংটি": 2, "রসগোল্লা": 2, "মোয়া": 2,
};
{
  const EMOJI = { "সমুচা": "🥟", "পিরামিড": "🔺", "বই": "📕", "ম্যাচ বাক্স": "📦", "ইট": "🧱", "পাউরুটি": "🍞", "ফুটবল": "⚽", "১ টাকার কয়েন": "🪙", "মার্বেল": "🔮", "আংটি": "💍", "রসগোল্লা": "⚪", "মোয়া": "🟤" };
  add({
    page: 103, slug: "shapes-sort", type: "categorize", title: "আকৃতি চিনি · সাজাও",
    content: {
      categories: [{ name: "ত্রিভুজাকার (তিনকোনা)", emoji: "🔺" }, { name: "চতুর্ভুজাকার (চারকোনা)", emoji: "🟧" }, { name: "গোলাকার", emoji: "🟢" }],
      items: Object.keys(SHAPE_OF).map((t) => ({ text: t, category: SHAPE_OF[t], emoji: EMOJI[t] })),
    },
    src: "p.102 (ফুটবল, পিরামিড, বই, কয়েন, ম্যাচ বাক্স, মার্বেল), p.103 (আংটি, সমুচা, ইট), p.104 1 (পাউরুটি, রসগোল্লা, মোয়া)",
  });
}
{
  const key = keyOf(104, "shapes-quiz");
  const shapeQ = (prompt, thing, why) => mcq({ prompt, answer: SHAPES[SHAPE_OF[thing]], fixed: SHAPES, why });
  const qs = [
    shapeQ("সমুচার আকৃতি কেমন?", "সমুচা", "সমুচার তিনটি কোনা: ত্রিভুজাকার।"),
    shapeQ("ইটের আকৃতি কেমন?", "ইট", "ইটের পাশগুলো চারকোনা: চতুর্ভুজাকার।"),
    shapeQ("আংটির আকৃতি কেমন?", "আংটি", "আংটি গোল: গোলাকার।"),
    shapeQ("রসগোল্লার আকৃতি কেমন?", "রসগোল্লা", "রসগোল্লা গোল: গোলাকার।"),
    shapeQ("পাউরুটির আকৃতি কেমন?", "পাউরুটি", "পাউরুটির টুকরোর চারটি কোনা: চতুর্ভুজাকার।"),
    shapeQ("১ টাকার কয়েনের আকৃতি কেমন?", "১ টাকার কয়েন", "১ টাকার কয়েন গোলাকৃতি।"),
    shapeQ("ম্যাচ বাক্সের পৃষ্ঠদেশের আকৃতি কেমন?", "ম্যাচ বাক্স", "ম্যাচ বাক্সের পৃষ্ঠদেশ চারকোনা: চতুর্ভুজাকার।"),
    mcq({ prompt: "তিনকোনা আকৃতিকে কী বলে?", answer: SHAPES[0], fixed: SHAPES, why: "তিনকোনা আকৃতি – ত্রিভুজ আকার।" }),
    mcq({ prompt: "চারকোনা আকৃতিকে কী বলে?", answer: SHAPES[1], fixed: SHAPES, why: "চারকোনা আকৃতি – চতুর্ভুজ আকার।" }),
  ];
  add({ page: 104, slug: "shapes-quiz", type: "mcq", title: "কোনটি কোন আকৃতি?", content: finishQuestions(key, qs), src: "pp.102–104" });
}
// p.106 প্যাটার্ন: ○□□□○□□□ and △□□□△□□□ (the book's), and two more made with the same shapes
{
  const key = keyOf(106, "shape-patterns");
  const SYM = { o: "○", s: "□", t: "△" };
  const OPTS = ["○ গোলাকার", "□ চতুর্ভুজাকার", "△ ত্রিভুজাকার"];
  const OPT_OF = { o: OPTS[0], s: OPTS[1], t: OPTS[2] };
  const patQ = (unit, shownCount) => {
    const shown = range(0, shownCount - 1).map((i) => unit[i % unit.length]);
    const next = unit[shownCount % unit.length];
    return mcq({ prompt: `প্যাটার্নে পরের আকৃতি কোনটি? ${shown.map((c) => SYM[c]).join(" ")} …`, answer: OPT_OF[next], fixed: OPTS, why: `${unit.split("").map((c) => SYM[c]).join(" ")} বারবার আসছে, তাই এরপর ${SYM[next]}।` });
  };
  const qs = [patQ("osss", 8), patQ("osss", 6), patQ("tsss", 7), patQ("tsss", 4), patQ("to", 5), patQ("oot", 6)];
  add({ page: 106, slug: "shape-patterns", type: "mcq", title: "প্যাটার্ন: পরেরটি কী?", content: finishQuestions(key, qs), src: "p.106 (the first four); the last two use the same shapes" });
}

// ═════════════════════════════ অধ্যায় ৫ · পরিমাপ (pp.107–120) ═════════════════════════════
{
  const key = keyOf(108, "length");
  const qs = [
    numQ({ prompt: "১ মিটার = কত সেন্টিমিটার?", expr: "100", unit: " সেন্টিমিটার", extra: [10, 1000], why: "১০০ সেন্টিমিটারের সমান ১ মিটার।" }),
    mcq({ prompt: "বড়ো বস্তুর দৈর্ঘ্য পরিমাপের জন্য কোন একক ব্যবহার করি?", answer: "মিটার", others: ["সেন্টিমিটার", "কেজি"], why: "বড়ো বস্তুর দৈর্ঘ্য পরিমাপের জন্য মিটার ব্যবহার করি।" }),
    mcq({ prompt: "ছোটো বস্তুর দৈর্ঘ্য পরিমাপের জন্য কোন একক ব্যবহার করি?", answer: "সেন্টিমিটার", others: ["মিটার", "লিটার"], why: "ছোটো বস্তুর দৈর্ঘ্য পরিমাপের জন্য সেন্টিমিটার ব্যবহার করি।" }),
    mcq({ prompt: "বস্তুর দৈর্ঘ্য পরিমাপ করতে কী ব্যবহার করা হয়?", answer: "স্কেল বা ফিতা", others: ["দাঁড়িপাল্লা", "ঘড়ি"], why: "বস্তুর দৈর্ঘ্য পরিমাপ করতে স্কেল বা ফিতা ব্যবহার করা হয়।" }),
    mcq({ prompt: "স্কেল দিয়ে মাপার সময় বস্তুর এক প্রান্ত স্কেলের কোথায় রাখি?", answer: "শূন্য প্রান্তে", others: ["১ এর দাগে", "স্কেলের মাঝখানে"], why: "বস্তুর যেকোনো প্রান্ত স্কেলের শূন্য প্রান্তে রাখতে হয়।" }),
    mcq({ prompt: "পেনসিলের এক প্রান্ত স্কেলের শূন্যতে, অন্য প্রান্ত ৮ এর সাথে মিলে গেল। পেনসিলের দৈর্ঘ্য কত?", answer: "৮ সেন্টিমিটার", others: ["৮ মিটার", "৯ সেন্টিমিটার"], why: "অন্য প্রান্ত ৮ এর সাথে মিলে যায়, অর্থাৎ পেনসিলের দৈর্ঘ্য ৮ সেন্টিমিটার।" }),
  ];
  add({ page: 108, slug: "length", type: "mcq", title: "দৈর্ঘ্য পরিমাপ", content: finishQuestions(key, qs), src: "pp.107–109" });
}
{
  const key = keyOf(112, "weight");
  const wText = (ws) => ws.map((w) => `${toBn(w)} গ্রাম`).join(" + ");
  const weightQ = (target, combos) => {
    const right = combos.filter((c) => c.reduce((s, w) => s + w, 0) === target);
    if (right.length !== 1) throw new Error(`p.112: ${target} g`);
    return mcq({ prompt: `${toBn(target)} গ্রাম বাটখারার সমান কোনটি?`, answer: wText(right[0]), others: combos.filter((c) => c !== right[0]).map(wText), why: `${wText(right[0])} = ${toBn(target)} গ্রাম`, v: { weights: target } });
  };
  const qs = [
    mcq({ prompt: "ওজন পরিমাপের একক কোনটি?", answer: "কিলোগ্রাম বা কেজি", others: ["মিটার", "লিটার"], why: "ওজন পরিমাপের একক হলো কিলোগ্রাম বা কেজি।" }),
    numQ({ prompt: "১ কেজি = কত গ্রাম?", expr: "1000", unit: " গ্রাম", extra: [100, 10], why: "১ কেজি = ১০০০ গ্রাম" }),
    mcq({ prompt: "কম ওজনের বস্তু মাপতে কোন একক ব্যবহার করা হয়?", answer: "গ্রাম", others: ["কেজি", "সেন্টিমিটার"], why: "কম ওজনের বস্তু মাপতে হলে গ্রাম একক ব্যবহার করা হয়।" }),
    mcq({ prompt: "বস্তুর ওজন পরিমাপ করতে কী ব্যবহার করা হয়?", answer: "দাঁড়িপাল্লা বা ডিজিটাল মাপনী", others: ["স্কেল বা ফিতা", "ঘড়ি"], why: "বস্তুর ওজন পরিমাপ করতে দাঁড়িপাল্লা বা ডিজিটাল মাপনী ব্যবহার করা হয়।" }),
    weightQ(25, [[10, 10, 5], [10, 5, 5], [20, 10]]),
    weightQ(50, [[20, 20, 10], [20, 10, 10], [20, 20, 20]]),
    weightQ(100, [[50, 20, 20, 10], [50, 20, 10], [50, 50, 20]]),
  ];
  add({ page: 112, slug: "weight", type: "mcq", title: "ওজন পরিমাপ", content: finishQuestions(key, qs), src: "pp.111–113 (বাটখারা: p.112, p.113)" });
}
{
  const key = keyOf(116, "liquid");
  const more = [["বালতিতে", 5], ["মাটির পাত্রে", 4]]; // p.116 (2) and (3)
  const bigger = more[0][1] > more[1][1] ? more[0][0] : more[1][0];
  const qs = [
    mcq({ prompt: "তরলের আয়তন পরিমাপে আমরা কোন আন্তর্জাতিক একক ব্যবহার করি?", answer: "লিটার", others: ["কেজি", "মিটার"], why: "তরলের আয়তন পরিমাপে আমরা আন্তর্জাতিক একক লিটার ব্যবহার করি।" }),
    mcq({ prompt: "লিটার নির্দেশ করার জন্য কোন ইংরেজি অক্ষর লিখি?", answer: "L বা l", others: ["K বা k", "M বা m"], why: "লিটার নির্দেশ করার জন্য ইংরেজি অক্ষর “L” বা “l” লিখি।" }),
    numQ({ prompt: "৩টি ১ লিটার বোতলের পানি দিয়ে একটি বালতি পূর্ণ করা হলো। বালতিতে কত লিটার পানি ধরে?", expr: "1+1+1", unit: " লিটার", extra: [1, 4], why: "৩টি ১ লিটার বোতল: ১ + ১ + ১ = ৩ লিটার" }),
    numQ({ prompt: "৫টি ১ লিটার বোতলের পানি দিয়ে একটি বালতি পূর্ণ করা হলো। বালতিতে কত লিটার পানি ধরে?", expr: "1+1+1+1+1", unit: " লিটার", extra: [1, 4], why: "৫টি ১ লিটার বোতল: ১ + ১ + ১ + ১ + ১ = ৫ লিটার" }),
    mcq({ prompt: `বালতিতে ${toBn(more[0][1])} লিটার এবং মাটির পাত্রে ${toBn(more[1][1])} লিটার পানি ধরে। কোনটিতে বেশি পানি ধরে?`, answer: bigger, others: [more.find((m) => m[0] !== bigger)[0], "দুটিতে সমান"], why: `${toBn(Math.max(more[0][1], more[1][1]))} লিটার বেশি, তাই ${bigger} বেশি পানি ধরে।` }),
  ];
  add({ page: 116, slug: "liquid", type: "mcq", title: "তরলের আয়তন", content: finishQuestions(key, qs), src: "pp.114–116" });
}
{
  const key = keyOf(118, "time");
  const handsQ = (h) => mcq({
    prompt: `ঘণ্টার কাঁটা ${toBn(h)} এর ঘরে এবং মিনিটের কাঁটা ১২ এর ঘরে আছে। কয়টা বাজে?`,
    answer: `${toBn(h)}টা বাজে`, others: ["১২টা বাজে", `${toBn(h)}টা ১২ মিনিট`], why: `মিনিটের কাঁটা ১২ তে থাকলে ঘণ্টার কাঁটা যে সংখ্যায়, ঠিক ততটা বাজে: ${toBn(h)}টা।`,
  });
  const digitalQ = (hh, mm) => {
    const shown = `${toBn(String(hh).padStart(2, "0"))}:${toBn(String(mm).padStart(2, "0"))}`;
    const say = (h, m) => `${toBn(h)}টা ${toBn(m)} মিনিট`;
    const rev = Number(String(mm).padStart(2, "0").split("").reverse().join(""));
    return mcq({ prompt: `ডিজিটাল ঘড়িতে ${shown} দেখাচ্ছে। কয়টা বাজে?`, answer: say(hh, mm), others: [say(hh, rev), say(hh + 1, mm)], why: `বামপাশের অঙ্ক দুটি ঘণ্টা (${toBn(hh)}), ডানপাশের অঙ্ক দুটি মিনিট (${toBn(mm)})।`, v: { time: true } });
  };
  const qs = [
    handsQ(3), handsQ(9), handsQ(4), // p.117
    handsQ(8), handsQ(10), // p.118 2
    digitalQ(11, 35), digitalQ(8, 20), digitalQ(6, 25), digitalQ(7, 45), // p.118 3
    mcq({ prompt: "সময়ের একক কোনগুলো?", answer: "সেকেন্ড, মিনিট, ঘণ্টা", others: ["মিটার, সেন্টিমিটার", "কেজি, গ্রাম"], why: "সময়ের একক: সেকেন্ড, মিনিট, ঘণ্টা।" }),
  ];
  add({ page: 118, slug: "time", type: "mcq", title: "কয়টা বাজে?", content: finishQuestions(key, qs), src: "p.117, p.118 2–3" });
}
add({ page: 119, slug: "days", type: "sequence", title: "সাত দিনের নাম (শনিবার থেকে) · সাজাও", content: { items: DAYS.map((t) => ({ text: t })), _v: { list: DAYS } }, src: "p.119 (the circle; we start at শনিবার)" });
add({ page: 119, slug: "bangla-months", type: "sequence", title: "বাংলা মাসের নাম · সাজাও", content: { items: BN_MONTHS.map((t) => ({ text: t })), _v: { list: BN_MONTHS } }, src: "p.119" });
add({ page: 120, slug: "english-months", type: "sequence", title: "ইংরেজি মাসের নাম · সাজাও", content: { items: EN_MONTHS.map((t) => ({ text: t })), _v: { list: EN_MONTHS } }, src: "p.120" });
{
  const key = keyOf(120, "before-after");
  const at = (list, i) => list[((i % list.length) + list.length) % list.length];
  // "the n-th after/before": n > 0 after, n < 0 before
  const stepQ = (list, from, n, prompt) => {
    const i = list.indexOf(from), ans = at(list, i + n);
    const others = [at(list, i - n), at(list, i + n + (n > 0 ? 1 : -1)), at(list, i + n - (n > 0 ? 1 : -1))].filter((x, k, a) => x !== ans && x !== from && a.indexOf(x) === k).slice(0, 2);
    const why = Math.abs(n) === 1 ? `${from} এর ${n > 0 ? "পরে" : "আগে"} ${ans}।` : `${from} থেকে ${toBn(Math.abs(n))} ধাপ ${n > 0 ? "পরে" : "আগে"}: ${range(1, Math.abs(n)).map((k) => at(list, i + (n > 0 ? k : -k))).join(", ")}।`;
    return mcq({ prompt, answer: ans, others, why });
  };
  const qs = [
    stepQ(DAYS, "সোমবার", -1, "সোমবারের আগের দিন কোনটি?"), stepQ(DAYS, "বুধবার", 1, "বুধবারের পরের দিন কোনটি?"),
    stepQ(BN_MONTHS, "জ্যৈষ্ঠ", 1, "জ্যৈষ্ঠ মাসের পরের মাস কোনটি?"), stepQ(BN_MONTHS, "মাঘ", -1, "মাঘ মাসের আগের মাস কোনটি?"), stepQ(BN_MONTHS, "ফাল্গুন", 1, "ফাল্গুন মাসের পরের মাস কোনটি?"),
    stepQ(EN_MONTHS, "মার্চ", 1, "মার্চের পরের মাস কোনটি?"), stepQ(EN_MONTHS, "আগস্ট", -1, "আগস্টের আগের মাস কোনটি?"), stepQ(EN_MONTHS, "নভেম্বর", -1, "নভেম্বর মাসের পূর্বের মাস কোনটি?"),
    stepQ(EN_MONTHS, "জুন", 2, "জুন মাসের দুই মাস পরের মাসের নাম কী?"), stepQ(EN_MONTHS, "অক্টোবর", 5, "অক্টোবর মাসের ৫ মাস পরের মাসের নাম কী?"),
  ];
  add({ page: 120, slug: "before-after", type: "mcq", title: "আগের ও পরের দিন, মাস", content: finishQuestions(key, qs), src: "p.119 1–2, p.120 1–3" });
}

// ═════════════════════════════ অধ্যায় ৬ · মুদ্রা (pp.121–124) ═════════════════════════════
// notes as [count, value] lists; written "২টি ১০০ টাকার নোট …" (full) or "২টি ১০০ টাকা …" (short, for options)
const joinBn = (parts) => (parts.length > 1 ? `${parts.slice(0, -1).join(", ")} ও ${parts[parts.length - 1]}` : parts[0]);
const notesFull = (combo) => joinBn(combo.map(([n, v]) => `${toBn(n)}টি ${toBn(v)} টাকার নোট`));
const notesShort = (combo) => joinBn(combo.map(([n, v]) => `${toBn(n)}টি ${toBn(v)} টাকা`));
const total = (combo) => combo.reduce((s, [n, v]) => s + n * v, 0);
const moneyFromText = (text) => { let s = 0; fromBn(text).replace(/(\d+)টি (\d+) টাকা/g, (_, n, v) => { s += Number(n) * Number(v); }); return s; };
{
  // p.122 টাকার বিনিময়: the book's ways (all three for ২০০, the first for ৫০০ and ১০০০) and others "অনুরূপ ভিন্ন ভিন্নভাবে"
  const groups = [200, 500, 1000];
  const ways = [
    [[2, 100]], [[1, 100], [2, 50]], [[2, 50], [5, 20]], // ২০০ (book)
    [[5, 100]], [[2, 200], [1, 100]], [[4, 100], [2, 50]], // ৫০০ (the first is the book's)
    [[2, 500]], [[5, 200]], [[1, 500], [2, 200], [1, 100]], // ১০০০ (the first is the book's)
  ];
  add({
    page: 122, slug: "money-swap", type: "categorize", title: "টাকার বিনিময় · সাজাও",
    content: {
      categories: groups.map((g) => ({ name: `${toBn(g)} টাকা`, emoji: "" })),
      items: ways.map((w) => { const i = groups.indexOf(total(w)); if (i < 0) throw new Error("p.122 total"); return { text: notesFull(w), category: i, emoji: "💵" }; }),
      _v: { rule: "money" },
    },
    src: "p.122",
  });
}
{
  const key = keyOf(123, "pay");
  const payQ = (prompt, target, combos, short) => {
    const right = combos.filter((c) => total(c) === target);
    if (right.length !== 1) throw new Error(`p.123: ${target}`);
    const txt = short ? notesShort : notesFull;
    return mcq({ prompt, answer: txt(right[0]), others: combos.filter((c) => c !== right[0]).map(txt), why: `${txt(right[0])} = ${toBn(target)} টাকা`, v: { money: target } });
  };
  const qs = [
    // p.123: the book's own way to pay ৩০ টাকা
    payQ("মিরাজ ৩০ টাকা দামের ১টি কলম কিনল। কোনভাবে ঠিক ৩০ টাকা দেওয়া যায়?", 30, [[[2, 1], [4, 2], [2, 5], [1, 10]], [[2, 1], [4, 2], [1, 5], [1, 10]], [[1, 1], [4, 2], [2, 5], [1, 10]]], true),
    payQ("কোনভাবে ৫০ টাকার সাথে বিনিময় করা যায়?", 50, [[[2, 20], [1, 10]], [[2, 20], [1, 5]], [[2, 20], [1, 10], [1, 5]]], false),
    // p.124 table: কলা ৬০, আপেল ১২০, তরমুজ ৫৫০, কাঁঠাল ২৫০ টাকা
    numQ({ prompt: "৬০ টাকার কলা কিনতে ১টি ৫০ টাকার নোটের সাথে কয়টি ১০ টাকার নোট লাগবে?", expr: "60-50", div: 10, unit: "টি", extra: [2, 6], why: "৬০ − ৫০ = ১০ টাকা বাকি: ১টি ১০ টাকার নোট" }),
    numQ({ prompt: "১২০ টাকার আপেল কিনতে ১টি ১০০ টাকার নোটের সাথে কয়টি ১০ টাকার নোট লাগবে?", expr: "120-100", div: 10, unit: "টি", extra: [1, 12], why: "১২০ − ১০০ = ২০ টাকা বাকি: ২টি ১০ টাকার নোট" }),
    numQ({ prompt: "৫৫০ টাকার তরমুজ কিনতে ১টি ৫০ টাকার নোটের সাথে কয়টি ১০০ টাকার নোট লাগবে?", expr: "550-50", div: 100, unit: "টি", extra: [4, 6], why: "৫৫০ − ৫০ = ৫০০ টাকা বাকি: ৫টি ১০০ টাকার নোট" }),
    numQ({ prompt: "২৫০ টাকার কাঁঠাল কিনতে কয়টি ৫০ টাকার নোট লাগবে?", expr: "250", div: 50, unit: "টি", extra: [4, 25], why: "৫০ + ৫০ + ৫০ + ৫০ + ৫০ = ২৫০: ৫টি ৫০ টাকার নোট" }),
  ];
  add({ page: 123, slug: "pay", type: "mcq", title: "টাকা দিয়ে দাম দিই", content: finishQuestions(key, qs), src: "p.123 example + 1, p.124 table" });
}
{
  const key = keyOf(124, "money-sums");
  const qs = [
    mcq({ prompt: "বাংলাদেশি মুদ্রার সাংকেতিক চিহ্ন কোনটি?", answer: "৳", others: ["$", "₹"], why: "বাংলাদেশি মুদ্রার নাম টাকা এবং এর সাংকেতিক চিহ্ন ‘৳’।" }),
    mcq({ prompt: "বাংলাদেশি মুদ্রা কয় রকমের?", answer: "দুই রকমের: ধাতব মুদ্রা ও কাগজের নোট", others: ["এক রকমের: শুধু কাগজের নোট", "এক রকমের: শুধু কয়েন"], why: "বাংলাদেশি মুদ্রা দুই রকমের: (ক) ধাতব মুদ্রা বা কয়েন (খ) কাগজের নোট।" }),
    numQ({ prompt: "১টি ৫০০ টাকার নোট = কয়টি ১০০ টাকার নোট?", expr: "500", div: 100, unit: "টি", extra: [2, 4], why: "৫০০ টাকা = ৫টি ১০০ টাকার নোট" }),
    numQ({ prompt: "১টি ১০০০ টাকার নোট = কয়টি ৫০০ টাকার নোট?", expr: "1000", div: 500, unit: "টি", extra: [5, 10], why: "১০০০ টাকা = ২টি ৫০০ টাকার নোট" }),
    numQ({ prompt: "ইভা ৪০ টাকায় ১ হালি ডিম এবং ৬৫ টাকায় ১ প্যাকেট বিস্কুট কিনল। সে কত টাকা খরচ করল?", expr: "40+65", unit: " টাকা", extra: ["65-40", "40+65-10"] }),
    numQ({ prompt: "১টি খাতা এবং ১টি কলমের দাম একত্রে ১০৫ টাকা। ১টি কলমের দাম ১৫ টাকা হলে ১টি খাতার দাম কত?", expr: "105-15", unit: " টাকা", extra: ["105+15", "105-15+10"] }),
    numQ({ prompt: "মেহেরুলের কাছে ১০০ টাকা ছিল এবং তার বাবা তাকে ৫০ টাকা দিলেন। মেহেরুল ১২০ টাকায় ১টি জ্যামিতি বক্স কিনল। তার কাছে এখন কত টাকা রইল?", expr: "100+50-120", unit: " টাকা", extra: ["100+50", "120-100"] }),
  ];
  add({ page: 124, slug: "money-sums", type: "mcq", title: "টাকার হিসাব", content: finishQuestions(key, qs), src: "p.121, p.122, p.124 2–4" });
}

// ═════════════════════════════ অধ্যায় ৭ · উপাত্ত (pp.125–127) ═════════════════════════════
{
  const key = keyOf(126, "fruit-table");
  const FRUIT = [["আম", 7], ["কলা", 6], ["লিচু", 8], ["আপেল", 5]]; // p.126 table (ট্যালি চিহ্ন → সংখ্যা)
  const names = FRUIT.map((f) => f[0]);
  const count = (n) => FRUIT.find((f) => f[0] === n)[1];
  const most = FRUIT.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  const least = FRUIT.reduce((a, b) => (b[1] < a[1] ? b : a))[0];
  const all = FRUIT.reduce((s, f) => s + f[1], 0);
  const tallyFive = Math.floor(7 / 5), tallyRest = 7 % 5;
  const intro = "পৃষ্ঠা ১২৬ এর তালিকা দেখি।";
  const qs = [
    mcq({ prompt: `${intro} কোন ফল সবচেয়ে বেশি?`, answer: most, fixed: names, why: `${most} ${toBn(count(most))}টি, সবচেয়ে বেশি।` }),
    mcq({ prompt: `${intro} কোন ফল সবচেয়ে কম?`, answer: least, fixed: names, why: `${least} ${toBn(count(least))}টি, সবচেয়ে কম।` }),
    numQ({ prompt: `${intro} আম কয়টি?`, expr: String(count("আম")), unit: "টি", extra: FRUIT.map((f) => f[1]), why: `আমের ট্যালি চিহ্ন: ৫ এর একটি দল ও ২টি দাগ = ৭` }),
    numQ({ prompt: `${intro} লিচু আমের চেয়ে কয়টি বেশি?`, expr: `${count("লিচু")}-${count("আম")}`, unit: "টি", extra: [count("লিচু") + count("আম"), 2] }),
    numQ({ prompt: `${intro} আম ও কলা মিলে কয়টি?`, expr: `${count("আম")}+${count("কলা")}`, unit: "টি", extra: [count("আম") - count("কলা"), 12] }),
    numQ({ prompt: `${intro} সব মিলিয়ে কয়টি ফল?`, expr: FRUIT.map((f) => f[1]).join("+"), unit: "টি", extra: [all - 1, all + 1, all + 10] }),
    mcq({ prompt: "ট্যালি চিহ্নে ৫ কীভাবে দেখানো হয়?", answer: "৪টি খাড়া দাগের উপর ১টি আড়াআড়ি দাগ", others: ["৫টি খাড়া দাগ", "৪টি খাড়া দাগ"], why: "পাশাপাশি চারটি দাগ টেনে পঞ্চমটির জন্য চারটি দাগের উপর দিয়ে আড়াআড়ি একটি দাগ টানি।" }),
    mcq({ prompt: "ট্যালি চিহ্নে ৭ লিখতে কী লাগে?", answer: `${toBn(tallyFive)}টি পাঁচের দল ও ${toBn(tallyRest)}টি দাগ`, others: ["৭টি খাড়া দাগ", `${toBn(tallyFive)}টি পাঁচের দল ও ${toBn(tallyRest + 1)}টি দাগ`], why: `৭ = ৫ + ২: ${toBn(tallyFive)}টি পাঁচের দল ও ${toBn(tallyRest)}টি দাগ`, v: { tally: 7 } }),
    mcq({ prompt: `${intro} ট্যালি চিহ্নে ৮টি দাগ কোন ফলের?`, answer: FRUIT.find((f) => f[1] === 8)[0], fixed: names, why: "লিচুর ট্যালি চিহ্ন: ৫ এর একটি দল ও ৩টি দাগ = ৮" }),
  ];
  add({ page: 126, slug: "fruit-table", type: "mcq", title: "ফলের তালিকা ও ট্যালি চিহ্ন", content: finishQuestions(key, qs), src: "p.125 (ট্যালি চিহ্ন), p.126 table", notes: ["প্রশ্নগুলো পৃষ্ঠা ১২৬ এর ফলের তালিকা (আম ৭, কলা ৬, লিচু ৮, আপেল ৫) দেখে।"] });
}

// ═════════════════════════════ Work It Out (chapters ১–৩): the page's own exercises, worked out on a keypad ═════════════════════════════
// Items carry no answers: the server works every answer out (validate.js checks its answers against ours). Numbers in the
// numeric fields and in "sum"/"missing" are ASCII; a word problem's text is copied as printed (Bangla digits).
const OPS = { "+": "+", "-": "−", "*": "×" };
// "45-23" → { kind: "sum", a: 45, op: "−", b: 23, layout }
const sumsOf = (exprs, layout) => exprs.map((e) => {
  const m = e.replace(/\s+/g, "").match(/^(\d+)([+\-*])(\d+)$/);
  if (!m) throw new Error(`sum ${e}`);
  return { kind: "sum", a: Number(m[1]), op: OPS[m[2]], b: Number(m[3]), layout };
});
const signs = (s) => s.replace(/-/g, "−").replace(/\*/g, "×");
const missingOf = (texts) => texts.map((t) => ({ kind: "missing", text: signs(t) })); // "9 + □ = 16"
const placeOf = (nums, ask) => nums.map((n) => ({ kind: "place", n, ask }));
const patternOf = (list) => list.map((terms) => ({ kind: "pattern", terms }));
const compareOf = (list) => list.map(([a, b]) => ({ kind: "compare", a: String(a), b: String(b) }));
const word = (text, sum, unit) => ({ kind: "word", text, sum: signs(sum), unit });
const table = (n, from = 3) => range(from, 10).map((k) => `${n}*${k}`); // the boxes of a times table (the first rows are printed)
// our own answer for an item (for verify(); the file carries none): null when it hasn't exactly one whole answer
function calcBrackets(expr) {
  let s = String(expr).replace(/−/g, "-").replace(/×/g, "*");
  for (let m; (m = s.match(/\(([^()]*)\)/)); ) s = s.replace(m[0], String(calc(m[1])));
  return calc(s);
}
function wioAnswer(it) {
  const whole = (v) => Number.isInteger(v) && v >= 0;
  if (it.kind === "sum") { const v = calc(`${it.a}${{ "+": "+", "−": "-", "×": "*" }[it.op]}${it.b}`); return whole(v) ? v : null; }
  if (it.kind === "word") { const v = calcBrackets(it.sum); return whole(v) ? v : null; }
  if (it.kind === "missing") {
    const [l, r] = it.text.split("=");
    const top = Math.max(1000, 10 * Math.max(...allNums(it.text)));
    const fits = range(0, top).filter((x) => calcBrackets(l.replace("□", String(x))) === calcBrackets(r.replace("□", String(x))));
    return fits.length === 1 ? fits[0] : null;
  }
  if (it.kind === "place") return it.ask === "number" ? it.n : String(it.n).padStart(2, "0").split("").map(Number);
  if (it.kind === "pattern") {
    const known = it.terms.map((v, i) => [i, v]).filter(([, v]) => v != null);
    if (known.length < 2) return null;
    const step = (known[1][1] - known[0][1]) / (known[1][0] - known[0][0]);
    if (!Number.isInteger(step) || !step || known.some(([i, v]) => v !== known[0][1] + step * (i - known[0][0]))) return null;
    const boxes = it.terms.map((v, i) => (v == null ? known[0][1] + step * (i - known[0][0]) : null)).filter((v) => v != null);
    return boxes.every(whole) ? boxes : null;
  }
  if (it.kind === "compare") { const x = calc(it.a), y = calc(it.b); return x < y ? "<" : x > y ? ">" : "="; }
  return null;
}
function wio({ page, slug, title, items, fresh, src }) {
  add({ page, slug: `wio-${slug}`, type: "work_it_out", title, content: { items }, configuration: fresh ? { fresh: { count: 10, ...fresh } } : {}, src });
}

// ── অধ্যায় ১ ──
wio({ page: 11, slug: "count-blocks", title: "ব্লক গুনে সংখ্যা লিখি", items: placeOf([236, 147, 504, 655, 765], "number"), fresh: { skill: "place", digits: 3 }, src: "p.10 ব্লকের সংখ্যা অঙ্কে লিখি (২ শত ৩ দশ ৬ এক), p.11 নিজে করি 1, 2 and the table (৬ শত ৫ দশ ৫ এক), p.12 card count (৭ শত ৬ দশ ৫ এক)" });
wio({ page: 16, slug: "compare", title: "তুলনা করি: <, > না =", items: compareOf([[85, 57], [524, 348], [634, 670], [423, 428], [823, 540], [901, 972], [75, 65], [423, 337], [557, 642], [876, 706], [678, 948], [785, 639]]), fresh: { skill: "compare", digits: 3 }, src: "p.16 নিজে করি 1–2 (all 12)" });
wio({ page: 20, slug: "place-value", title: "স্থানীয় মান লিখি", items: [...placeOf([56, 83, 120, 467, 976, 1000], "parts"), ...placeOf([28, 74, 108, 230, 782, 1000], "number")], fresh: { skill: "place", digits: 3 }, src: "p.20 নিজে করি 1, p.21 2" });
wio({ page: 21, slug: "digit-places", title: "প্রতিটি অঙ্কের স্থানীয় মান", items: placeOf([24, 56, 73, 98, 105, 328, 639, 840, 957, 1000], "parts"), fresh: { skill: "place", digits: 3 }, src: "p.21 3" });
wio({ page: 23, slug: "compare", title: "তিন অঙ্কের সংখ্যার তুলনা", items: compareOf([[128, 235], [248, 226], [496, 469], [692, 594], [872, 858], [1000, 998], [430, 428], [678, 675], [827, 948], [985, 950], [744, 722]]), fresh: { skill: "compare", digits: 3 }, src: "p.23 নিজে করি 1–2" });
wio({
  page: 31, slug: "patterns", title: "পরবর্তী সংখ্যাগুলো লিখি (১)",
  items: patternOf([
    [2, 4, 6, 8, null, null, null], [15, 20, 25, null, null, null], [21, 19, 17, 15, null, null, null], // p.30 (1)–(3)
    [1, 3, 5, 7, null, null, null], [4, 6, 8, 10, null, null], [3, 7, 11, 15, 19, null, null, null, null], // p.31 (4), (5)
    [0, 5, 10, 15, 20, null, null, null], // p.32 (6)
    [48, null, null, null, null, 38], [9, null, null, null, null, 24], [50, null, 40], // p.32 (7)(2)–(4): "২ করে কমে ৪৮ থেকে ৩৮ পর্যন্ত" …
  ]),
  fresh: { skill: "pattern" }, src: "p.30 (1)–(3), p.31 (4)–(5), p.32 (6)–(7)",
});
wio({
  page: 33, slug: "patterns", title: "পরবর্তী সংখ্যাগুলো লিখি (২)",
  items: patternOf([
    [1, 3, 5, 7, null, null, null], [40, 42, null, 46, null, 50, null], // 1 (1), (3) — 1 (2) "২, ৩, ৫, ৮, ১২" has no fixed step
    [16, 18, 20, null, null, null, null], [37, 39, 41, null, null, null, null], // 2
    [47, 45, null, null, null, null, null, null, null, null], [24, 28, null, null, null, null, null, null, null, null], // 3, 4 (১০টি; the step is said in words, so its second number is shown)
    [3, 6, 9, null, null, null, null], [15, 13, 11, null, null, null, null], // 5
  ]),
  fresh: { skill: "pattern" }, src: "p.33 নিজে করি 1 (1), (3); 2; 3; 4; 5",
});

// ── অধ্যায় ২ ──
const P = { // the word problems, as printed
  p42: word("রাজুর ৩৮টি রঙিন কার্ডের একটি বান্ডেল আছে। মিনার ২৪ টি রঙিন কার্ডের একটি বান্ডেল আছে। দুজনের মোট কতগুলো রঙিন কার্ড আছে?", "38 + 24", "টি"),
  p45a: word("দিলীপ বাজার থেকে ৪৫ টাকার মাছ ও ৩৮ টাকার সবজি কিনল। সে মোট কত টাকা খরচ করল?", "45 + 38", "টাকা"),
  p45b: word("মাহদি ও তার বন্ধুরা দুই দলে একুশে ফেব্রুয়ারির প্রভাত ফেরিতে গেল। এক দলে ৩৫ জন ও অন্য দলে ২৭ জন আছে। দুই দলে মোট কতজন আছে?", "35 + 27", "জন"),
  p45c: word("মানহাদের পারিবারিক লাইব্রেরিতে ৫৪টি গল্পের বই ও ৩৮টি অন্য বিষয়ের বই আছে। লাইব্রেরিতে মোট কতগুলো বই আছে?", "54 + 38", "টি"),
  p46: word("মিনার ৩৬টি কাগজ ছিল, সে এর থেকে ১৩টি কাগজ রাজুকে দিল। মিনার কাছে কতটি কাগজ রইল?", "36 - 13", "টি"),
  p50: word("রাজুর কাছে ৪৫টি রং পেনসিল ছিল। সে তুলিকে ১৮টি রং পেনসিল দিল। রাজুর কাছে কতটি রং পেনসিল রইল?", "45 - 18", "টি"),
  p52a: word("রুমির ৭৫টি মারবেল আছে এবং রাজুর ৪৯টি মারবেল আছে। রুমি থেকে রাজুর কয়টি মারবেল বেশি বা কম আছে?", "75 - 49", "টি"),
  p52b: word("মা ও মেয়ের বয়স একত্রে ৭০ বছর। মেয়ের বয়স ২২ বছর। মায়ের বয়স কত?", "70 - 22", "বছর"),
  p52c: word("রুমু থেকে ঝুমু ৮ বছরের বড়ো। ঝুমুর বয়স ২৪ বছর। রুমুর বয়স কত?", "24 - 8", "বছর"),
  p53: word("একটি ব্যাগে কয়েকটি আম ছিল। ৫টি আম বিক্রি করা হলো। এখন ব্যাগে ৬টি আম আছে। প্রথমে ব্যাগে কয়টি আম ছিল?", "6 + 5", "টি"),
  p54a: word("বিজয় কিছু সংখ্যক আম বিক্রি করার জন্য বাজারে যাচ্ছিল। তার চাচা বিক্রি করার জন্য আরও ১৫টি আম দিল। ৩৩টি আম বিক্রি করার পর তার কাছে ১২টি আম অবশিষ্ট রইলো। তার কাছে প্রথমে কতগুলো আম ছিল?", "12 + 33 - 15", "টি"),
  p54b: word("জলিল সাহেব বাজার থেকে ১০০টি লিচু ক্রয় করলেন। বাড়িতে এসে ২৫টি মেয়েকে, ২৩টি ছেলেকে দিলেন। তার কাছে কতটি লিচু থাকল?", "100 - 25 - 23", "টি"),
  p54c: word("কোনো বাক্সে ২৫টি চকলেট ছিল। এর থেকে কয়েকটি চকলেট মিতুকে দেওয়া হলো। বাক্সে ১৭টি চকলেট থাকল। কয়টি চকলেট মিতুকে দেওয়া হয়েছিল? এর গাণিতিক বাক্য কী হবে?", "25 - 17", "টি"),
  p55: word("তুলির ৭০টি গল্পের বই ছিল। বই মেলা থেকে সে আরও ৫০টি গল্পের বই কিনল। তুলির মোট কয়টি গল্পের বই হলো?", "70 + 50", "টি"),
  p56: word("দিলীপের কাছে ৭৩টি কাগজ ছিল। তার বোন দীপা তাকে আরও ৫৪টি কাগজ দিল। তার কাছে কতটি কাগজ হলো?", "73 + 54", "টি"),
  p58: word("শ্রেণিকক্ষ সাজানোর জন্য রাজু ১৩৪টি কাগজের ফুল বানালো। মীনা ১৪৫টি ফুল বানালো। তারা কাগজ দিয়ে মোট কতগুলো ফুল বানালো?", "134 + 145", "টি"),
  p59: word("রাফি কোনো এক ঈদে তার বাবার কাছ থেকে ২৫০ টাকা এবং মায়ের কাছ থেকে ১২০ টাকা পায়। সে মোট কত টাকা পায়?", "250 + 120", "টাকা"),
  p61: word("রাজুর একটি খাতায় ২৬৭ পৃষ্ঠা কাগজ আছে। আরেকটি খাতায় ১৪৫ পৃষ্ঠা কাগজ আছে। দুটি খাতায় মোট পৃষ্ঠার সংখ্যা কত?", "267 + 145", "পৃষ্ঠা"),
  p67: word("মিনার ২৪১ টাকা আছে। রাজুর নিকট ১১৫ টাকা আছে। রাজু অপেক্ষা মিনার কত টাকা বেশি আছে?", "241 - 115", "টাকা"),
};
const P63 = [
  word("শিমু একমাসে একটি গল্পের বইয়ের ১৫৪ পৃষ্ঠা পড়ে। পরের মাসে ২৭৫ পৃষ্ঠা পড়ে। সে দুই মাসে মোট কত পৃষ্ঠা পড়েছে?", "154 + 275", "পৃষ্ঠা"),
  word("একটি বিদ্যালয়ে ২য় শ্রেণিতে ১৩৬ জন ছাত্র এবং ১২০ জন ছাত্রী আছে। দ্বিতীয় শ্রেণিতে মোট কত জন শিক্ষার্থী আছে?", "136 + 120", "জন"),
  word("দ্বিতীয় শ্রেণির ক শাখায় ১২৩টি বই শিক্ষার্থীদের মাঝে বিতরণ করা হলো। খ শাখায় ১৩১টি বই বিতরণ করা হলো। মোট কতগুলো বই বিতরণ করা হলো?", "123 + 131", "টি"),
  word("একটি নার্সারিতে ১২০টি গোলাপ ফুল গাছ আছে এবং ১২৭ টি গাঁদা ফুল গাছ আছে। ঐ নার্সারীতে মোট কতগুলো ফুল গাছ আছে?", "120 + 127", "টি"),
  word("একটি পুকুরে ১২৫টি শিং মাছের পোনা এবং ২৫০টি মাগুর মাছের পোনা ছাড়া হলো। ঐ পুকুরে মোট কতগুলো মাছের পোনা ছাড়া হলো?", "125 + 250", "টি"),
  word("একজন ফল বিক্রেতা প্রথম দিন ৩৬০ টাকার আম বিক্রি করলেন। দ্বিতীয় দিন ৪৭৫ টাকার আম বিক্রি করলেন। তিনি দুদিনে মোট কত টাকার আম বিক্রি করলেন?", "360 + 475", "টাকা"),
  word("একটি গ্রামের লোকসংখ্যা ৪০০ জন। আরেকটি গ্রামের লোকসংখ্যা ৩২০ জন। দুই গ্রামের মোট লোকসংখ্যা কত?", "400 + 320", "জন"),
];
const P68 = [
  word("শ্যামল ৩৮৫ টাকা নিয়ে বাজারে গেল। সে ২৫৩ টাকা খরচ করল। তার কাছে কত টাকা থাকল?", "385 - 253", "টাকা"),
  word("ক্রিকেট খেলায় বাংলাদেশ দল ৩৫৮ রান করেছে এবং শ্রীলঙ্কা দল ৩১২ রান করেছে। কোন দল বেশি রান করেছে এবং কত রান বেশি করেছে?", "358 - 312", "রান"),
  word("একটি বিদ্যালয়ে ৫৪২ জন শিক্ষার্থী আছে। ছাত্রীর সংখ্যা ২৯০। ঐ বিদ্যালয়ে ছাত্রের সংখ্যা কত?", "542 - 290", "জন"),
  word("বিজয়পুর গ্রামের শিশুদের সংখ্যা ৩৩৪ জন। তাদের মধ্যে ৩১৫ জন টিকা নিয়েছে। কতজন টিকা নেয়নি?", "334 - 315", "জন"),
  word("বাগানে ২১২টি আম গাছ আছে। ১৯৫টি গাছে আম ধরেছে। কতটি গাছে আম ধরেনি?", "212 - 195", "টি"),
  word("রিতার ২৫৫টি মারবেল ছিল। সে তার ছোট ভাইকে ১৫০টি মারবেল দিল। রিতার কাছে কতগুলো মারবেল রইল?", "255 - 150", "টি"),
  word("একটি নার্সারিতে ১৪৬টি মেহগনি গাছের চারা আছে এবং ১২০টি নিম গাছের চারা আছে। ঐ নার্সারিতে কতটি মেহগনি গাছের চারা বেশি আছে?", "146 - 120", "টি"),
  word("৩৫৫ থেকে কোন সংখ্যা বিয়োগ করলে ২৪৫ হবে?", "355 - 245", ""),
  word("একটি পুকুরে ২০০টি তেলাপিয়া মাছ ছিল এবং ১৬৫টি তেলাপিয়া মাছ বিক্রি করা হলো। পুকুরে আর কতগুলো তেলাপিয়া মাছ রইল?", "200 - 165", "টি"),
  word("তুহিনের ৩৪২ টাকা আছে। শাকিলের ৩১৫ টাকা আছে। কার টাকা কম আছে এবং কত টাকা কম আছে?", "342 - 315", "টাকা"),
  word("শাকিবের ৩টি একশ টাকার নোট ছিল, তা থেকে মিনাকে ২২৫ টাকা দিল। শাকিবের কাছে কত টাকা রইল?", "300 - 225", "টাকা"),
];
const P71 = [
  word("একটি বিদ্যালয়ে ৬২৫ জন শিক্ষার্থী ছিল। বছরের শুরুতে ২৭৫ জন শিক্ষার্থী নতুন ভর্তি হলো এবং ৩৫ জন শিক্ষার্থী চলে গেল। ঐ বিদ্যালয়ে কতজন শিক্ষার্থী রইল তা গাণিতিক বাক্যে সমাধান করি।", "625 + 275 - 35", "জন"),
  word("ঝুমার ২৫০ টাকা আছে এবং বাবা তাকে আরও ১৫০ টাকা দিলেন। ঝুমা ২৩০ টাকা দিয়ে একটি বই কিনল। তার কাছে আর কত টাকা রইল?", "250 + 150 - 230", "টাকা"),
  word("দুটি সংখ্যার যোগফল ৮৪০। এদের একটি সংখ্যা ৫২৭ হলে অপর সংখ্যাটি কত?", "840 - 527", ""),
  word("একজন দোকানদার সপ্তাহে আয় করেন ৯২০ টাকা এবং সপ্তাহে ব্যয় করেন ৬৭৫ টাকা। সপ্তাহ শেষে তার নিকট কত টাকা জমা থাকে?", "920 - 675", "টাকা"),
  word("দুটি সংখ্যার বিয়োগফল ৮৭। বড়ো সংখ্যাটি ৩৬৯ হলে ছোটো সংখ্যাটি কত?", "369 - 87", ""),
  word("একটি ঝুড়িতে ৪২৫টি আম এবং অপর একটি ঝুড়িতে ৩৪৫টি আম আছে। দুটি ঝুড়িতে মোট কতটি আম আছে?", "425 + 345", "টি"),
  word("একটি ঝুড়িতে ৪২৫টি আম এবং অপর একটি ঝুড়িতে ৩৪৫টি আম আছে। মোট আম থেকে ১৭৫টি আম বিক্রি করা হলো। কতটি আম রইল?", "425 + 345 - 175", "টি"),
  word("৯টি সংখ্যার যোগফল ৩৬০। প্রথম থেকে ৪র্থ সংখ্যা পর্যন্ত ৪টি সংখ্যার যোগফল ১৫২। ৬ষ্ঠ থেকে ৯ম সংখ্যা পর্যন্ত ৪টি সংখ্যার যোগফল ১৬৪। ৫ম সংখ্যাটি কত?", "360 - 152 - 164", ""),
  word("নাহিদের ৪৫০ টাকা আছে। নাহিদ অপেক্ষা সুমনের ১১৫ টাকা কম আছে। তাদের টাকা একত্র করলে আরিফের টাকার সমান হয়। আরিফের কত টাকা আছে?", "450 + 450 - 115", "টাকা"),
];
const P72 = [
  word("দুই ছেলের বয়স একত্রে ৩৭ বছর এবং পিতার বয়স ৬৩ বছর। ১০ বছর পর তাদের ৩ জনের বয়স মোট কত হবে?", "37 + 63 + 10 + 10 + 10", "বছর"),
  word("সুজন ১০০০ টাকা উপবৃত্তি পেল। সে তা থেকে ৩৫০ টাকা দিয়ে ড্রেস এবং ৪৭৫ টাকা দিয়ে স্কুলের ব্যাগ কিনল। তার নিকট কত টাকা রইল?", "1000 - 350 - 475", "টাকা"),
  word("ক্রিকেট খেলার ব্যাট ও বল কেনার জন্য ৭৫০ টাকা প্রয়োজন। সকল সদস্য মোট ৩৩০ টাকা দিল। ক্লাবের অনুদান হিসেবে ২৫০ টাকা দেওয়া হলো। তাদের আর কত টাকা প্রয়োজন?", "750 - 330 - 250", "টাকা"),
  word("একটি ফলের দোকানের মূল্য তালিকা: আম ১০০ টাকা, আপেল ২২০ টাকা, কমলা ১৬০ টাকা (প্রতি কেজি)। আমের মূল্যের চেয়ে আপেলের মূল্য কত টাকা বেশি?", "220 - 100", "টাকা"),
  word("একটি ফলের দোকানের মূল্য তালিকা: আম ১০০ টাকা, আপেল ২২০ টাকা, কমলা ১৬০ টাকা (প্রতি কেজি)। ফলগুলোর মোটমূল্য কত টাকা?", "100 + 220 + 160", "টাকা"),
  word("একজন চাষি নিজের জমি থেকে ৩২৬ বস্তা ধান পেয়েছেন এবং অন্যের জমি চাষ করে ১২৫ বস্তা ধান পেয়েছেন। তিনি মোট কত বস্তা ধান পেয়েছেন তা, গাণিতিক বাক্যে প্রকাশ করি।", "326 + 125", "বস্তা"),
  word("বিকাশ বড়ুয়া ১০০০ টাকা নিয়ে বই মেলায় গেলেন। বই কেনার পর তার কাছে ২০০ টাকা রইল। তিনি কত টাকার বই কিনলেন?", "1000 - 200", "টাকা"),
  word("নিজাম সাহেব ৯৭০ টাকা নিয়ে বাজারে গেলেন। তিনি ৫৫০ টাকা দিয়ে গরুর মাংস এবং ৩৭০ টাকা দিয়ে একটি মুরগি কিনলেন। তিনি মোট কত টাকা খরচ করলেন?", "550 + 370", "টাকা"),
  word("নিজাম সাহেব ৯৭০ টাকা নিয়ে বাজারে গেলেন। তিনি ৫৫০ টাকা দিয়ে গরুর মাংস এবং ৩৭০ টাকা দিয়ে একটি মুরগি কিনলেন। নিজাম সাহেবের নিকট কত টাকা রইল?", "970 - 550 - 370", "টাকা"),
];
// p.70: the numbers are in the pictures; each question carries them in words
const P70 = [
  word("একটি বিদ্যালয়ে বিগত ৩ বছরে শিক্ষার্থী ভর্তি হয়েছে: ১ম বছর ১২৩ জন, ২য় বছর ১৫৫ জন, ৩য় বছর ২০৯ জন। ১ম বছরের তুলনায় ৩য় বছর কতজন বেশি ভর্তি হয়েছে?", "209 - 123", "জন"),
  word("একটি বিদ্যালয়ে বিগত ৩ বছরে শিক্ষার্থী ভর্তি হয়েছে: ১ম বছর ১২৩ জন, ২য় বছর ১৫৫ জন, ৩য় বছর ২০৯ জন। বর্তমানে বিদ্যালয়ে শিক্ষার্থী সংখ্যা কতজন?", "123 + 155 + 209", "জন"),
  word("চিত্রে দুটি পাত্রে পানি দেখানো হলো: ১ম পাত্রে ২৩৫ গ্লাস পানি, ২য় পাত্রে ৩৬৫ গ্লাস পানি। ২য় পাত্রে কত গ্লাস পানি বেশি আছে?", "365 - 235", "গ্লাস"),
  word("চিত্রে দুটি পাত্রে পানি দেখানো হলো: ১ম পাত্রে ২৩৫ গ্লাস পানি, ২য় পাত্রে ৩৬৫ গ্লাস পানি। দুটি পাত্রে মোট কত গ্লাস পানি আছে?", "235 + 365", "গ্লাস"),
  word("সোহাগের ফলের ঝুড়িতে ১৫০টি, গীতার ফলের ঝুড়িতে ২৪৮টি এবং তুলির ফলের ঝুড়িতে ৪৭৫টি ফল আছে। গীতার ফলের চেয়ে তুলির কতটি ফল বেশি আছে?", "475 - 248", "টি"),
  word("সোহাগের ফলের ঝুড়িতে ১৫০টি, গীতার ফলের ঝুড়িতে ২৪৮টি এবং তুলির ফলের ঝুড়িতে ৪৭৫টি ফল আছে। সোহাগের এবং তুলির দুজনের মোট কতটি ফল আছে?", "150 + 475", "টি"),
];

wio({ page: 42, slug: "add", title: "যোগ করে লিখি (১)", items: [...sumsOf(["32+30", "51+14", "32+22", "50+20", "65+13"], "column"), ...sumsOf(["22+36", "72+15", "71+5", "8+60", "35+10"], "row"), P.p42], fresh: { skill: "add", digits: 2, carry: "no", layout: "column" }, src: "p.42 1–2 and the story" });
wio({ page: 44, slug: "add", title: "যোগ করে লিখি (২)", items: [...sumsOf(["23+18", "45+27", "52+38", "78+8", "26+37"], "column"), ...sumsOf(["37+53", "45+45", "47+18", "65+5", "42+29"], "row"), ...sumsOf(["38+52"], "column")], fresh: { skill: "add", digits: 2, carry: "yes", layout: "column" }, src: "p.44 1–2 (৭৮ + ০৮ written ৭৮ + ৮)" });
wio({ page: 45, slug: "add", title: "যোগ করে লিখি (৩)", items: [...sumsOf(["35+6", "7+36"], "column"), ...sumsOf(["26+37", "38+22", "56+14", "36+17", "75+15"], "column"), ...sumsOf(["42+28", "78+13", "62+28", "6+57", "72+9"], "row")], fresh: { skill: "add", digits: 2, carry: "yes", layout: "column" }, src: "p.45 1–2" });
wio({ page: 48, slug: "sub", title: "বিয়োগ করে লিখি (১)", items: sumsOf(["45-23", "32-11", "68-12", "79-50", "98-67", "49-10", "66-40", "58-18", "70-30", "38-34"], "column"), fresh: { skill: "sub", digits: 2, carry: "no", layout: "column" }, src: "p.48 4" });
wio({ page: 49, slug: "sub", title: "বিয়োগ করে লিখি (২)", items: sumsOf(["45-23", "56-12", "86-31", "75-23", "85-13", "79-44", "61-50", "75-25", "90-50", "49-42", "97-5", "53-3"], "row"), fresh: { skill: "sub", digits: 2, carry: "no", layout: "row" }, src: "p.47 1, p.49 2" });
wio({ page: 51, slug: "sub", title: "বিয়োগ করে লিখি (৩)", items: sumsOf(["64-3", "78-5", "94-2", "76-6", "57-7", "34-7", "30-6", "97-59", "71-44", "75-47", "60-53", "70-22"], "column"), fresh: { skill: "sub", digits: 2, carry: "yes", layout: "column" }, src: "p.49 1, p.51 (৩৪ − ৭, ৩০ − ৬) and 1" });
wio({ page: 52, slug: "sub", title: "বিয়োগ করে লিখি (৪)", items: sumsOf(["32-15", "85-47", "64-27", "92-23", "82-13", "71-44", "97-59", "60-35", "74-68", "40-34", "93-5", "50-3"], "row"), fresh: { skill: "sub", digits: 2, carry: "yes", layout: "row" }, src: "p.51 2, p.52 4" });
wio({ page: 52, slug: "sub-stories", title: "বিয়োগ করে লিখি (৫)", items: [...sumsOf(["25-8", "43-5", "30-7", "60-6", "80-9"], "column"), P.p52a, P.p52b, P.p52c], src: "p.52 3 and 5" });
wio({ page: 54, slug: "missing", title: "খালি ঘর পূরণ করি", items: missingOf(["9 + □ = 16", "39 - □ = 31", "□ + 23 = 34", "□ + 19 = 45", "14 + □ = 35", "29 - □ = 17", "□ + 27 = 75", "□ - 39 = 45", "12 + 9 - □ = 13", "22 + 8 - □ = 23"]), fresh: { skill: "missing", digits: 2 }, src: "p.54 1 (all 10)" });
wio({ page: 54, slug: "stories", title: "যোগ-বিয়োগের গল্প (১)", items: [P.p45a, P.p45b, P.p45c, P.p46, P.p50, P.p53, P.p54a, P.p54b, P.p54c], src: "p.45 3–5, p.46, p.50, p.53, p.54 2–4" });
wio({ page: 55, slug: "tens", title: "দশকের যোগ করে লিখি", items: [...sumsOf(["80+50", "60+60", "50+90", "80+70", "100+300", "500+200", "140+20", "30+130", "160+30", "50+220"], "row"), P.p55], src: "p.55" });
wio({ page: 57, slug: "add", title: "তিন অঙ্কের যোগ (১)", items: sumsOf(["86+43", "68+35", "74+65", "55+45", "93+9", "216+142", "468+394"], "row"), fresh: { skill: "add", digits: 3, carry: "any", layout: "row" }, src: "p.57, p.58 (২১৬ + ১৪২), p.61 (৪৬৮ + ৩৯৪)" });
wio({ page: 59, slug: "add", title: "তিন অঙ্কের যোগ (২)", items: sumsOf(["462+3", "953+46", "620+370", "233+355", "438+521", "232+354", "423+241", "555+324", "284+581", "294+687", "568+432", "409+384"], "column"), fresh: { skill: "add", digits: 3, carry: "any", layout: "column" }, src: "p.59 2, p.62 2 (5)–(8)" });
wio({ page: 62, slug: "add", title: "তিন অঙ্কের যোগ (৩)", items: sumsOf(["526+253", "552+436", "872+127", "672+326", "438+31", "596+312", "649+161", "427+185", "381+269"], "row"), fresh: { skill: "add", digits: 3, carry: "any", layout: "row" }, src: "p.59 1 (without ৫২৩ + ৬১৪), p.62 2 (1)–(4)" });
wio({ page: 63, slug: "stories", title: "যোগের গল্প", items: [P.p56, P.p58, P.p59, P.p61, ...P63], src: "p.56, p.58, p.59, p.61 and p.63 1–7" });
wio({ page: 64, slug: "tens", title: "দশকের বিয়োগ করে লিখি", items: sumsOf(["170-40", "180-20", "160-40", "190-20", "500-200", "700-500", "900-220", "380-30", "390-70", "460-60", "520-30", "220-50"], "row"), src: "p.64 (all 12)" });
wio({ page: 66, slug: "sub", title: "তিন অঙ্কের বিয়োগ (১)", items: [...sumsOf(["125-43"], "column"), ...sumsOf(["325-13", "527-28", "735-48", "474-81", "829-75", "930-40"], "row"), ...sumsOf(["509-25", "729-56", "845-58", "785-421"], "column"), P.p67], fresh: { skill: "sub", digits: 3, carry: "any", layout: "column" }, src: "p.65, p.66 1–2 and ৭৮৫ − ৪২১, p.67's story" });
wio({ page: 67, slug: "sub", title: "তিন অঙ্কের বিয়োগ (২)", items: [...sumsOf(["231-48", "230-90", "320-280", "437-273", "452-378", "663-267"], "row"), ...sumsOf(["490-84", "321-279", "941-608", "792-486", "341-126", "540-280"], "column")], fresh: { skill: "sub", digits: 3, carry: "yes", layout: "column" }, src: "p.67 নিজে করি 1 (1)–(6), p.68 (7)–(12)" });
wio({ page: 68, slug: "stories", title: "বিয়োগের গল্প", items: P68, src: "p.68 2–12" });
wio({ page: 70, slug: "pictures", title: "ছবি দেখে হিসাব করি", items: P70, src: "p.70 1–3 (খ), (গ); the numbers come from the pictures" });
wio({ page: 71, slug: "stories", title: "যোগ-বিয়োগের গল্প (২)", items: P71, src: "p.71 1–8 (6: its (ক) and its question)" });
wio({ page: 72, slug: "stories", title: "যোগ-বিয়োগের গল্প (৩)", items: P72, src: "p.72 9–15 (12 (ক), (গ); 15 (খ), (গ))" });

// ── অধ্যায় ৩ ──
const M = { // multiplication stories, as printed (a × b = a in each group, b groups: p.76)
  p78: word("ছবিতে ৪টি থালার প্রত্যেকটিতে ৫টি করে টমেটো আছে। একত্রে কতগুলো টমেটো আছে?", "5 * 4", "টি"),
  p80: word("৬টি থালায় প্রতিটিতে ৫টি করে লিচু আছে। একত্রে কতগুলো লিচু আছে?", "5 * 6", "টি"),
  p83a: word("মিনা প্রতিদিন একটি বইয়ের ২ পৃষ্ঠা পড়ে। সে ৭ দিনে কত পৃষ্ঠা পড়ে?", "2 * 7", "পৃষ্ঠা"),
  p83b: word("একটি চকলেটের দাম ২ টাকা। রাজু ৬টি চকলেট কিনল। চকলেটগুলোর দাম কত টাকা?", "2 * 6", "টাকা"),
  p83c: word("একটি চকলেটের দাম ২ টাকা। রাজু ৬টি চকলেট কিনল। যদি সে আরও ৭টি চকলেট কিনে, তবে মোট কত টাকা লাগবে?", "2 * 6 + 2 * 7", "টাকা"),
  p85a: word("একটি রিক্সায় ৩টি চাকা আছে। ৪টি রিক্সায় একত্রে কয়টি চাকা রয়েছে?", "3 * 4", "টি"),
  p85b: word("একটি থালায় ৩টি পেয়ারা সাজানো যায়। ৭টি থালা সাজাতে কয়টি পেয়ারা প্রয়োজন?", "3 * 7", "টি"),
  p85c: word("একটি পরিবারে ৩ জন সদস্য থাকলে এরূপ ৯টি পরিবারে কতজন সদস্য থাকবে?", "3 * 9", "জন"),
  p87a: word("১টি বিড়ালের ৪টি পা আছে। ৮টি বিড়ালের মোট কতটি পা আছে?", "4 * 8", "টি"),
  p87b: word("১টি চেয়ারের ৪টি পায়া রয়েছে। ৬টি চেয়ারের কতটি পায়া আছে?", "4 * 6", "টি"),
  p87c: word("প্রতিটি ভেড়ার ৪টি বাচ্চা থাকলে ৯টি ভেড়ার কয়টি বাচ্চা থাকবে?", "4 * 9", "টি"),
  p89: word("বাদলের বাবা এক সপ্তাহে ৫ দিন কাজ করেন। তিনি ৬ সপ্তাহে কতদিন কাজ করেন?", "5 * 6", "দিন"),
  p91: word("৭ দিনে ১ সপ্তাহ। ৮ সপ্তাহে কত দিন?", "7 * 8", "দিন"),
  p92a: word("৫টি বাক্সের প্রতিটিতে ৮টি করে চকলেট আছে। সেখানে কতগুলো চকলেট আছে?", "8 * 5", "টি"),
  p92b: word("একটি শ্রেণিকক্ষে প্রতিটি দলে ৮ জন করে শিক্ষার্থী আছে। যদি ৯টি দল থাকে, তবে সেখানে কতজন শিক্ষার্থী থাকবে?", "8 * 9", "জন"),
  p93a: word("প্রতিটি ঝুড়িতে ৯টি করে রুটি রাখা যায়। এরকম ৭টি ঝুড়িতে কতগুলো রুটি রাখা যায়?", "9 * 7", "টি"),
  p93b: word("রফিক একদিনে একটি বইয়ের ৯ পৃষ্ঠা পড়ে। সে ৮ দিনে কত পৃষ্ঠা পড়ে?", "9 * 8", "পৃষ্ঠা"),
  p94a: word("একজন মানুষের দুই হাতে মোট ১০টি আঙ্গুল আছে। এরকম ৭ জন মানুষের হাতে কতটি আঙ্গুল রয়েছে?", "10 * 7", "টি"),
  p94b: word("৩ জন ছাত্রকে ৫টি ও ৪ জন ছাত্রীকে ৭টি করে বই দিলে কতটি বইয়ের প্রয়োজন হবে?", "5 * 3 + 7 * 4", "টি"),
  p94c: word("৪ টাকা দরে ৭টি লিচু, ৬ টাকা দরে ৮টি আমড়া এবং ৯ টাকা দরে ৫টি কলা কিনতে মোট কত টাকা লাগবে?", "4 * 7 + 6 * 8 + 9 * 5", "টাকা"),
  p95a: word("যদি আমরা প্রতিদিন ১ টাকা করে জমা করি, তবে ৮ দিনে কত টাকা জমা করতে পারব?", "1 * 8", "টাকা"),
  p95b: word("একটি শ্রেণির প্রথম বেঞ্চে ৫ জন, দ্বিতীয় বেঞ্চে ৬ জন এবং তৃতীয় বেঞ্চে ৮ জন ছাত্র আছে। প্রত্যেক ছাত্রকে ১ টাকা করে প্রদান করলে কত টাকা প্রয়োজন হবে?", "1 * (5 + 6 + 8)", "টাকা"),
  p99a: word("রাজুর বাবা এক দিনে ৮ ঘণ্টা কাজ করেন। যদি তিনি ৩ দিন কাজ করেন, তবে কত ঘণ্টা কাজ হবে?", "8 * 3", "ঘণ্টা"),
  p99b: word("আব্দুল করিম ৩টি গল্পের বই কিনতে চায়। প্রতিটি বইয়ের মূল্য ৩০ টাকা। বই কিনতে তার কত টাকা লাগবে?", "30 * 3", "টাকা"),
  p100: word("একটি প্যাকেটে ২টি লজেন্স আছে। ৮টি প্যাকেটে কতগুলো লজেন্স আছে?", "2 * 8", "টি"),
  p101a: word("একটি শ্রেণিকক্ষে ১০টি বেঞ্চ আছে। একটি বেঞ্চে ৪ জন ছাত্র বসতে পারে। শ্রেণিকক্ষে মোট কতজন ছাত্র বসতে পারবে?", "4 * 10", "জন"),
  p101b: word("বাবা প্রতিদিন ৪ ঘণ্টা হাঁটেন। ৭ দিনে তিনি কত ঘণ্টা হাঁটেন?", "4 * 7", "ঘণ্টা"),
  p101c: word("উজ্জ্বল ৪টি বই কিনতে চায়। প্রতিটি বইয়ের দাম ২২ টাকা। বই কিনতে তার কত টাকা লাগবে?", "22 * 4", "টাকা"),
};
wio({
  page: 77, slug: "repeated-addition", title: "যোগ থেকে গুণ · হিসাব করি",
  items: [...missingOf(["4 + 4 + 4 + 4 + 4 = □", "3 + 3 + 3 + 3 + 3 = □", "2 + 2 + 2 + 2 + 2 = □", "4 + 4 + 4 + 4 = □", "2 + 2 + 2 + 2 + 2 + 2 = □", "3 + 3 + 3 + 3 = □"]), ...sumsOf(["3*5", "4*3", "4*4"], "row"), M.p78],
  src: "p.73 (মাছ, আলু), p.74 (আপেল, ৪ ছড়া কলা), p.75 (৬টি থালা), p.76, p.77 (আলু, মাছ, কলা), p.78 (টমেটো)",
});
wio({ page: 81, slug: "tables-5-2", title: "৫ ও ২ এর গুণ লিখি", items: [...sumsOf(["5*3", "5*4"], "row"), M.p80, ...sumsOf(table(2), "row")], fresh: { skill: "mul", table: 2 }, src: "p.79 (৫ × ৩, ৫ × ৪), p.80 story, p.81 (২ × ৩ … ২ × ১০)" });
wio({ page: 84, slug: "table-3", title: "৩ এর গুণ লিখি", items: sumsOf(table(3), "row"), fresh: { skill: "mul", table: 3 }, src: "p.84 1–2" });
wio({ page: 86, slug: "table-4", title: "৪ এর গুণ লিখি", items: sumsOf(table(4), "row"), fresh: { skill: "mul", table: 4 }, src: "p.86 1–2" });
wio({ page: 87, slug: "stories", title: "গুণের গল্প (১)", items: [M.p83a, M.p83b, M.p83c, M.p85a, M.p85b, M.p85c, M.p87a, M.p87b, M.p87c, M.p89], src: "p.83 1–2, p.85 1–3, p.87 1–3, p.89 1" });
wio({ page: 88, slug: "table-6", title: "৬ এর গুণ লিখি", items: sumsOf(table(6), "row"), fresh: { skill: "mul", table: 6 }, src: "p.88 table" });
wio({ page: 90, slug: "table-7", title: "৭ এর গুণ লিখি", items: sumsOf(table(7), "row"), fresh: { skill: "mul", table: 7 }, src: "p.90 table" });
wio({ page: 94, slug: "stories", title: "গুণের গল্প (২)", items: [M.p91, M.p92a, M.p92b, M.p93a, M.p93b, M.p94a, M.p94b, M.p94c], src: "p.91 1, p.92 1–2, p.93 1–2, p.94 1–3" });
// p.96 prints "০টি ট্রে: ০ × ০"; with ৩টি বল in a tray that is ৩ × ০
wio({ page: 96, slug: "one-zero", title: "১ ও ০ এর গুণ", items: [M.p95a, M.p95b, ...sumsOf(["2*2", "1*2", "0*2", "3*2", "3*1", "3*0"], "row")], src: "p.95 1–2, p.96" });
wio({ page: 99, slug: "two-digit", title: "গুণ করি ও গল্পের অঙ্ক", items: [...sumsOf(["14*2", "23*3", "11*7", "32*3", "34*2", "21*4"], "row"), M.p99a, M.p99b, M.p100, M.p101a, M.p101b, M.p101c], src: "p.99 1–3, p.100 2, p.101 3–5" });

// ═════════════════════════════ Tools update (2 Nov 2026): the eight new types ═════════════════════════════
// Find the Mistake, Make Equal Groups, Number Line, Clock & Time, Taka Shop, Measure It, Shape Patterns and Make a Shape
// (the backend's work-it-out.helper.js tools, each its own activity type; content = { items }, items of its one kind).
// They go to ACTIVITIES-bn-update-2026-11-02-tools.json (these only: importing it adds just them) and, with the 85 above,
// to ACTIVITIES-bn.json. Everything here is added AFTER the first file's 85, so their codes (codeFor's used set) and
// QR letters (perPage) stay exactly what they were; a new activity's key starts "tool-", so no key can clash.
const TOOLS_FROM = activities.length; // the first file's activities are activities[0 .. TOOLS_FROM − 1]
const TOOL_KIND = { find_mistake: "mistake", equal_groups: "groups", number_line: "numberline", clock_time: "clock", taka_shop: "money", measure_it: "measure", shape_patterns: "shapes", make_shapes: "compose" };
const TOOL_TYPES = Object.keys(TOOL_KIND);
// fresh problems after the page's own: the skill is written out, because the importer keeps a file's configuration as it
// is and the player reads a fresh block without its skill as "add" (sums)
const FRESH_COUNT = 5;
function tool({ page, slug, type, title, items, fresh, src, notes }) {
  add({ page, slug: `tool-${slug}`, type, title, content: { items }, configuration: fresh ? { fresh: { skill: TOOL_KIND[type], count: FRESH_COUNT, ...fresh } } : {}, src, notes });
}

// ── Find the Mistake: the book's own carrying / borrowing sums, worked in columns with ONE step forgotten ──
// A column sum worked the book's way (p.43 হাতে রেখে যোগ; p.50 দশক থেকে ১ দশ নিয়ে বিয়োগ). skip = the column (0 = ones) whose
// carry (+) or borrow (−) the child forgets to pass on to the next column. Returns the answer and the columns that pass one on.
function columnSum(a, op, b, skip = -1) {
  const A = String(a).split("").reverse().map(Number), B = String(b).split("").reverse().map(Number);
  const out = [], steps = [];
  let pass = 0; // the carry (+) or the borrowed ten (−) from the column before
  for (let k = 0; k < Math.max(A.length, B.length); k++) {
    const x = A[k] || 0, y = B[k] || 0;
    let next = 0, d;
    if (op === "+") { const s = x + y + pass; d = s % 10; next = s >= 10 ? 1 : 0; }
    else { let top = x - pass; if (top < y) { top += 10; next = 1; } d = top - y; }
    if (next) steps.push(k);
    out.push(d);
    pass = k === skip ? 0 : next;
  }
  if (op === "+" && pass) out.push(pass);
  if (op === "−" && pass) throw new Error(`${a} − ${b}: below zero`);
  return { value: Number(out.reverse().join("")), steps };
}
// "23+18" → { kind: "mistake", a: 23, op: "+", b: 18, shown: 31 }. Two kinds of slip:
// - a carry or borrow not passed on (the usual one): of those (each carrying column in turn) the ones that leave the
//   answer as long as the right one and wrong in exactly one digit; the key picks one
// - every third item, a fact slip in the ones column (৩ + ৮ = ১২, ১২ − ৫ = ৬): the ones digit one off, the carry or
//   borrow done right; so the wrong digit isn't always the tens (a two-digit sum has only one carry)
function mistakeOf(key, exprs) {
  return exprs.map((e, n) => {
    const m = e.match(/^(\d+)([+\-])(\d+)$/);
    if (!m) throw new Error(`mistake ${e}`);
    const a = Number(m[1]), op = m[2] === "+" ? "+" : "−", b = Number(m[3]);
    const right = columnSum(a, op, b);
    if (right.value !== calc(e)) throw new Error(`${e}: the columns make ${right.value}`);
    const R = String(right.value);
    const slips = right.steps.map((k) => columnSum(a, op, b, k).value).filter((v) => {
      const W = String(v);
      return W.length === R.length && [...R].filter((d, i) => d !== W[i]).length === 1;
    });
    if (!slips.length) throw new Error(`${e}: no carry or borrow slip leaves one wrong digit`);
    const r = rng(`${key}#${e}`);
    if (n % 3 === 2) {
      const d = Number(R[R.length - 1]);
      const nd = d === 0 ? 1 : d === 9 ? 8 : r() < 0.5 ? d - 1 : d + 1;
      return { kind: "mistake", a, op, b, shown: Number(R.slice(0, -1) + nd) };
    }
    return { kind: "mistake", a, op, b, shown: slips[Math.floor(r() * slips.length)] };
  });
}
{
  // p.44 যোগ করি 1–2 and p.45 1–2 (two digits, হাতে রেখে)
  const sums = ["23+18", "45+27", "26+37", "47+18", "42+29", "56+14", "36+17", "75+15"];
  tool({ page: 44, slug: "mistake-add", type: "find_mistake", title: "ভুলটি খুঁজি: হাতে রেখে যোগ", items: mistakeOf(keyOf(44, "tool-mistake-add"), sums), fresh: { digits: 2 }, src: "p.44 1 (২৩ + ১৮, ৪৫ + ২৭, ২৬ + ৩৭), p.44 2 (৪৭ + ১৮, ৪২ + ২৯), p.45 1–2 (৫৬ + ১৪, ৩৬ + ১৭, ৭৫ + ১৫)", notes: ["প্রতিটি যোগফলের একটি অঙ্ক ভুল: কোথাও হাতে রাখা ১ পরের ঘরে যোগ করা হয়নি, কোথাও এককের ঘরের যোগে ১ বেশি বা কম হয়েছে।"] });
  // p.51 1 and p.52 4 (two digits, দশক থেকে ১ দশ নিয়ে)
  const subs = ["97-59", "71-44", "70-22", "32-15", "85-47", "64-27", "92-23", "50-3"];
  tool({ page: 52, slug: "mistake-sub", type: "find_mistake", title: "ভুলটি খুঁজি: দশক থেকে ১ দশ নিয়ে বিয়োগ", items: mistakeOf(keyOf(52, "tool-mistake-sub"), subs), fresh: { digits: 2 }, src: "p.51 1 (৯৭ − ৫৯, ৭১ − ৪৪, ৭০ − ২২), p.51 2 / p.52 4 (৩২ − ১৫, ৮৫ − ৪৭, ৬৪ − ২৭, ৯২ − ২৩, ৫০ − ৩)", notes: ["প্রতিটি বিয়োগফলের একটি অঙ্ক ভুল: কোথাও দশক থেকে ১ দশ নেওয়া হয়েছে, কিন্তু দশকের ঘর থেকে ১ কমানো হয়নি; কোথাও এককের ঘরের বিয়োগে ১ বেশি বা কম হয়েছে।"] });
  // p.61 (৪৬৮ + ৩৯৪) and p.62 2 (1)–(8) (three digits)
  const sums3 = ["468+394", "596+312", "649+161", "427+185", "381+269", "284+581", "294+687", "409+384"];
  tool({ page: 62, slug: "mistake-add3", type: "find_mistake", title: "ভুলটি খুঁজি: তিন অঙ্কের যোগ", items: mistakeOf(keyOf(62, "tool-mistake-add3"), sums3), fresh: { digits: 3 }, src: "p.61 (৪৬৮ + ৩৯৪), p.62 2 (1)–(4), (5), (6), (8) (৫৬৮ + ৪৩২ = ১০০০ left out)", notes: ["প্রতিটি যোগফলের একটি অঙ্ক ভুল: কোথাও হাতে রাখা ১ পরের ঘরে যোগ করা হয়নি, কোথাও এককের ঘরের যোগে ১ বেশি বা কম হয়েছে।"] });
  // p.67 নিজে করি 1 (1)–(6) and p.68 (7)–(12) (three digits)
  const subs3 = ["231-48", "230-90", "437-273", "663-267", "490-84", "941-608", "792-486", "341-126"];
  tool({ page: 67, slug: "mistake-sub3", type: "find_mistake", title: "ভুলটি খুঁজি: তিন অঙ্কের বিয়োগ", items: mistakeOf(keyOf(67, "tool-mistake-sub3"), subs3), fresh: { digits: 3 }, src: "p.67 নিজে করি 1 (1)–(2), (4), (6), p.68 (7), (9), (10), (11)", notes: ["প্রতিটি বিয়োগফলের একটি অঙ্ক ভুল: কোথাও ১ দশ বা ১ শত নেওয়া হয়েছে, কিন্তু পরের ঘর থেকে ১ কমানো হয়নি; কোথাও এককের ঘরের বিয়োগে ১ বেশি বা কম হয়েছে।"] });
}

// ── Make Equal Groups: the book's plates of things (ch.3 reads them as গুণ: ৫টি থালায় ৪টি করে = ৪ × ৫); the child
// shares the whole lot back onto the plates. [emoji, in each, plates] → total = in each × plates ──
const groupsOf = (list) => list.map(([emoji, each, plates]) => ({ kind: "groups", total: each * plates, groups: plates, emoji }));
tool({
  page: 77, slug: "groups-1", type: "equal_groups", title: "সমান ভাগে ভাগ করি (১)",
  items: groupsOf([["🍎", 2, 5], ["🥔", 3, 5], ["🐟", 4, 5], ["🍌", 4, 4], ["🍎", 2, 6], ["🐟", 4, 3], ["⚽", 3, 5], ["🍅", 5, 4]]),
  fresh: {}, src: "p.73 (আপেল, আলু, মাছ: ৫টি থালা), p.74 (৪ ছড়া কলা, ৪টি করে), p.75 (৬টি থালা), p.77 (৩টি থালায় মাছ), p.78 2 (1) (ফুটবল) and the ৪টি থালায় ৫টি করে টমেটো",
});
tool({
  page: 86, slug: "groups-2", type: "equal_groups", title: "সমান ভাগে ভাগ করি (২)",
  items: groupsOf([["🍅", 5, 3], ["🍅", 5, 5], ["🍒", 5, 6], ["⚽", 3, 3], ["⚽", 3, 6], ["🍏", 4, 3], ["🍏", 4, 4], ["🍏", 4, 5]]),
  fresh: {}, src: "p.79 1–2 (টমেটো, ৫টি করে), p.80 (৬টি থালায় ৫টি করে লিচু), p.84 1–2 (ট্রেতে ৩টি করে বল), p.86 1–2 (থালায় ৪টি করে আপেল)",
});

// ── Number Line: the book's number patterns (ch.1) and its times tables counted in jumps (ch.3). [from, to, step, target, ask].
// The player prints every number on a line of up to 10 steps (every second one on 11–20), so a "place" item uses 11–20
// steps with its number on an unprinted tick (checked below); a "read" item hides the number under the arrow. ──
const lineOf = (list) => list.map(([from, to, step, target, ask]) => ({ kind: "numberline", from, to, step, target, ask }));
const term = (first, step, n) => first + step * (n - 1); // the pattern's n-th number
tool({
  page: 30, slug: "numberline-1", type: "number_line", title: "সংখ্যারেখায় প্যাটার্ন (১)",
  items: lineOf([
    [0, 30, 2, term(2, 2, 7), "place"], [0, 20, 2, term(2, 2, 6), "read"], // (1) ২, ৪, ৬, ৮, …
    [0, 60, 5, term(15, 5, 5), "place"], [15, 60, 5, term(15, 5, 8), "read"], // (2) ১৫, ২০, ২৫, …
    [1, 25, 2, term(21, -2, 6), "place"], [9, 21, 2, term(21, -2, 5), "read"], // (3) ২১, ১৯, ১৭, ১৫, …
  ]),
  src: "p.30 (1) ২, ৪, ৬, ৮ …; (2) ১৫, ২০, ২৫ …; (3) ২১, ১৯, ১৭, ১৫ …",
});
tool({
  page: 32, slug: "numberline-2", type: "number_line", title: "সংখ্যারেখায় প্যাটার্ন (২)",
  items: lineOf([
    [1, 31, 2, term(1, 2, 10), "place"], [4, 20, 2, term(4, 2, 6), "read"], // p.31 (4) ১, ৩, ৫, ৭ … and ৪, ৬, ৮, ১০ …
    [3, 47, 4, term(3, 4, 6), "place"], [3, 35, 4, term(3, 4, 8), "read"], // p.31 (5) ৩, ৭, ১১, ১৫, ১৯, …
    [0, 70, 5, term(0, 5, 10), "place"], [0, 50, 5, term(0, 5, 9), "read"], // p.32 (6) ০, ৫, ১০, ১৫, ২০, …
    [38, 48, 2, term(48, -2, 4), "read"], [9, 24, 3, term(9, 3, 4), "read"], // p.32 (7) (2) ৪৮ থেকে ৩৮, (3) ৯ থেকে ২৪
  ]),
  src: "p.31 (4) (1)–(2), (5); p.32 (6), (7) (2)–(3)",
});
tool({
  page: 81, slug: "numberline-5-2", type: "number_line", title: "সংখ্যারেখায় লাফ: ৫ ও ২ এর গুণ",
  items: lineOf([
    [0, 50, 5, 5 * 3, "read"], [0, 75, 5, 5 * 7, "place"], [0, 50, 5, 5 * 6, "read"], [0, 75, 5, 5 * 9, "place"], // ৫ এর গুণ
    [0, 20, 2, 2 * 3, "read"], [0, 30, 2, 2 * 7, "place"], [0, 20, 2, 2 * 4, "read"], [0, 30, 2, 2 * 9, "place"], // ২ এর গুণ
  ]),
  src: "p.79–80 (৫ × ৩, ৫ × ৬ লিচু, the ৫ table), p.81 (২ × ৩, ২ × ৪, ২ × ৭, ২ × ৯)",
});
tool({
  page: 86, slug: "numberline-3-4", type: "number_line", title: "সংখ্যারেখায় লাফ: ৩ ও ৪ এর গুণ",
  items: lineOf([
    [0, 30, 3, 3 * 3, "read"], [0, 45, 3, 3 * 7, "place"], [0, 30, 3, 3 * 4, "read"], [0, 45, 3, 3 * 9, "place"], // ৩ এর গুণ
    [0, 40, 4, 4 * 4, "read"], [0, 60, 4, 4 * 5, "place"], [0, 40, 4, 4 * 3, "read"], [0, 60, 4, 4 * 7, "place"], // ৪ এর গুণ
  ]),
  src: "p.84 1–2 (৩ এর গুণ), p.86 1–2 (৪ এর গুণ)",
});

// ── Make a Shape (ch.4): which pieces make the shape ──
tool({ page: 104, slug: "compose", type: "make_shapes", title: "আকৃতি বানাই", items: ["square", "rectangle", "circle", "big-square"].map((target) => ({ kind: "compose", target })), src: "pp.102–104 (ত্রিভুজ, চতুর্ভুজ, গোলাকার; p.104 2's picture made of triangles and four-sided shapes)" });

// ── Shape Patterns (ch.4): "c s s s _" with a letter per shape token; _ = the gap. The unit is checked against the server's rule. ──
function shapeSeq(spec, tokens) {
  return spec.trim().split(/\s+/).map((c) => (c === "_" ? null : tokens[c] || (() => { throw new Error(`shape ${c}`); })()));
}
{
  const T = { c: "circle-orange", s: "square-blue", t: "triangle-green" }; // p.102 colours: গোল orange, তিনকোনা green, চারকোনা blue
  tool({
    page: 106, slug: "shapes-1", type: "shape_patterns", title: "আকৃতির প্যাটার্ন (১)",
    items: ["c s s s c s s s _", "c s s s c s _ s c s", "t s s s t s s s _ s", "t s _ s t s s s t s", "c s c s c _ c s", "t c t c _ c t c", "c c t c c t c _ t"].map((p) => ({ kind: "shapes", seq: shapeSeq(p, T) })),
    fresh: {}, src: "p.106 (○□□□○□□□ and △□□□△□□□, the gap in different places); ○□, △○ and ○○△ are new, with the same shapes",
  });
  const U = { r: "star-yellow", h: "heart-red", c: "circle-red", s: "square-blue", t: "triangle-green", R: "square-red", b: "circle-blue", o: "triangle-orange", p: "star-purple", g: "circle-green", y: "rect-yellow", v: "rect-purple" };
  tool({
    page: 106, slug: "shapes-2", type: "shape_patterns", title: "আকৃতির প্যাটার্ন (২)",
    items: ["r h r h r _ r h", "c s t c s t c _ t", "R R b R R b _ R b", "o p h g o p _ g o p", "_ v y v y v y v", "h h r r h h r _ h h"].map((p) => ({ kind: "shapes", seq: shapeSeq(p, U) })),
    fresh: {}, src: "new patterns like p.105–106's (two to four shapes, in colours; p.105 জেব্রা ক্রসিং's stripes as the last-but-one)",
  });
}

// ── Measure It (ch.5): a ruler (pp.108–110), a balance with the book's gram weights (pp.112–113), a measuring jug ──
tool({
  page: 109, slug: "ruler", type: "measure_it", title: "স্কেল দিয়ে মাপি",
  items: [["✏️", 8], ["✏️", 12], ["✏️", 9], ["🥛", 3], ["🕯️", 5], ["🖍️", 7], ["🥕", 14], ["🍌", 18]].map(([emoji, value]) => ({ kind: "measure", tool: "ruler", value, emoji })),
  src: "p.109 (পেনসিল ৮, ১২ ও ৯ সে.মি.), p.110 (গ্লাস ৩, মোমবাতি ৫ সে.মি.); 🖍️ ৭, 🥕 ১৪, 🍌 ১৮ are new",
});
{
  // the book's weight sets (25 = 10 + 10 + 5 = 20 + 5; 50 = 20 + 20 + 10 = 20 + 10 + 10 + 5 + 5; 100 = 50 + 50 = 50 + 20 + 20 + 10)
  // and three more with p.112's bigger weights (100, 200, 500 গ্রাম)
  const sets = [["🍫", [10, 10, 5]], ["🍫", [20, 5]], ["🥚", [20, 20, 10]], ["🥚", [20, 10, 10, 5, 5]], ["🍅", [50, 50]], ["🍅", [50, 20, 20, 10]], ["🍌", [100, 50, 20]], ["🍆", [200, 50]], ["🍍", [500, 200, 200, 100]]];
  tool({ page: 113, slug: "balance", type: "measure_it", title: "দাঁড়িপাল্লায় ওজন মাপি", items: sets.map(([emoji, weights]) => ({ kind: "measure", tool: "balance", weights: weights.slice().sort((x, y) => y - x), emoji })), src: "p.112 (২৫ গ্রাম: ১০ + ১০ + ৫, ২০ + ৫), p.113 (৫০ গ্রাম ও ১০০ গ্রাম, দুইভাবে করে); ১৭০, ২৫০ and ১০০০ গ্রাম are new, with p.112's weights" });
}
tool({
  page: 116, slug: "jug", type: "measure_it", title: "জগে পানি মাপি (মিলিলিটার)",
  items: [[1000, "read"], [500, "fill"], [250, "read"], [750, "fill"], [500, "read"], [1000, "fill"]].map(([value, ask]) => ({ kind: "measure", tool: "jug", value, ask })),
  src: "p.116 (১ লিটারের বোতল); beyond the page: ১ লিটার = ১০০০ মিলি, আধা লিটার = ৫০০ মিলি",
  notes: ["বইয়ে তরল মাপা হয়েছে লিটার ও গ্লাস দিয়ে; মিলিলিটার বইয়ে নেই। ১ লিটার = ১০০০ মিলিলিটার, আধা লিটার = ৫০০ মিলিলিটার।"],
});

// ── Clock & Time (ch.5): pp.117–118's clocks ──
const clockOf = (list) => list.map(([h, m, ask]) => ({ kind: "clock", h, m, ask }));
tool({ page: 117, slug: "clock-read", type: "clock_time", title: "ঘড়ি দেখি", items: clockOf([[9, 0, "read"], [1, 0, "read"], [4, 0, "read"], [3, 0, "read"], [8, 0, "read"]]), fresh: {}, src: "p.117 1 (৯টা, ১টা, ৪টা) and its ৩টা; p.118 2's ৮টা" });
tool({ page: 118, slug: "clock-set", type: "clock_time", title: "ঘড়ির কাঁটা বসাই", items: clockOf([[8, 0, "set"], [2, 0, "set"], [10, 0, "set"], [3, 0, "set"]]), fresh: {}, src: "p.118 2 (৮টা, ২টা, ১০টা, ৩টা বাজে)" });
tool({ page: 118, slug: "clock-minutes", type: "clock_time", title: "ঘণ্টা ও মিনিট", items: clockOf([[11, 15, "read"], [11, 35, "set"], [8, 20, "read"], [6, 25, "set"], [7, 45, "read"]]), fresh: {}, src: "p.118 3 (ডিজিটাল ঘড়ি: ১১:১৫, ১১:৩৫, ০৮:২০, ০৬:২৫, ০৭:৪৫)" });

// ── Taka Shop (ch.6): counting notes and coins, paying a price, change ──
{
  // p.124's price table and the things in pp.123–124's stories (খাতা: p.124 3, খাতা ও কলম একত্রে ১০৫ টাকা, কলম ১৫ টাকা)
  const S = {
    papaya: { name: "পেঁপে", emoji: "🍈", price: 188 }, banana: { name: "কলা", emoji: "🍌", price: 60 }, apple: { name: "আপেল", emoji: "🍎", price: 120 },
    melon: { name: "তরমুজ", emoji: "🍉", price: 550 }, jackfruit: { name: "কাঁঠাল", emoji: "", price: 250 },
    eggs: { name: "১ হালি ডিম", emoji: "🥚", price: 40 }, biscuit: { name: "১ প্যাকেট বিস্কুট", emoji: "🍪", price: 65 },
    pen: { name: "কলম", emoji: "🖊️", price: 15 }, khata: { name: "খাতা", emoji: "📒", price: 105 - 15 }, pen30: { name: "কলম", emoji: "🖊️", price: 30 },
    geometry: { name: "জ্যামিতি বক্স", emoji: "📐", price: 120 },
  };
  const shop = (...names) => names.map((n) => ({ ...S[n] }));
  const priceOf = (list) => list.reduce((s, it) => s + it.price, 0);
  // count: the book's notes and coins (p.122 টাকার বিনিময়, p.123 মিরাজের ৩০ টাকা, p.124 কলার সারি) and one way to make ৫০ (p.123 1)
  // (as [count, value] lists, like p.122's combos above)
  const counts = [
    [[2, 1], [4, 2], [2, 5], [1, 10]], [[2, 100]], [[1, 100], [2, 50]], [[2, 50], [5, 20]], [[5, 100]], [[2, 500]], [[1, 20], [2, 10], [1, 5], [2, 2], [1, 1]], [[1, 50], [1, 10]],
  ];
  tool({
    page: 123, slug: "money-count", type: "taka_shop", title: "টাকা গুনি",
    items: counts.map((c) => ({ kind: "money", ask: "count", notes: c.flatMap(([n, v]) => Array(n).fill(v)).sort((x, y) => y - x) })),
    fresh: { digits: 2 }, src: "p.122 (২০০: ২টি ১০০, ১টি ১০০ ও ২টি ৫০, ২টি ৫০ ও ৫টি ২০; ৫০০: ৫টি ১০০; ১০০০: ২টি ৫০০), p.123 (মিরাজের ৩০ টাকা: ২টি ১, ৪টি ২, ২টি ৫, ১টি ১০; 1: ৫০ টাকা), p.124 (কলা: ৫০ + ১০)",
  });
  tool({
    page: 124, slug: "money-pay", type: "taka_shop", title: "দোকানে কেনাকাটা",
    items: [shop("papaya"), shop("banana"), shop("apple"), shop("melon"), shop("jackfruit"), shop("eggs", "biscuit"), shop("khata", "pen"), shop("pen30")].map((items) => ({ kind: "money", ask: "pay", items })),
    fresh: { digits: 3 }, src: "p.124 table (পেঁপে ১৮৮, কলা ৬০, আপেল ১২০, তরমুজ ৫৫০, কাঁঠাল ২৫০ টাকা), p.124 2 (ডিম ৪০ + বিস্কুট ৬৫), 3 (খাতা ও কলম ১০৫), p.123 (মিরাজের ৩০ টাকার কলম)",
  });
  // change: p.124's prices paid with the next bigger note (new), and মেহেরুল's ১০০ + ৫০ টাকা for the ১২০ টাকার জ্যামিতি বক্স (p.124 4)
  const NOTES_UP = [100, 200, 500, 1000];
  const nextNote = (p) => NOTES_UP.find((n) => n > p);
  const change = [
    [shop("banana")], [shop("apple")], [shop("jackfruit")], [shop("melon")], [shop("papaya")], [shop("eggs", "biscuit")],
    [shop("geometry"), 100 + 50], [shop("khata", "pen"), 500],
  ];
  tool({
    page: 124, slug: "money-change", type: "taka_shop", title: "ফেরত টাকা হিসাব করি",
    items: change.map(([items, paid]) => ({ kind: "money", ask: "change", items, paid: paid || nextNote(priceOf(items)) })),
    fresh: { digits: 3 }, src: "p.124 4 (মেহেরুল: ১০০ + ৫০ টাকা, জ্যামিতি বক্স ১২০ টাকা); the others are new: p.124's prices paid with the next bigger note",
  });
}

// ───────────────────────────── 3 Nov 2026: a game for every page ─────────────────────────────
// The user: "all the pages should have at least one activity if there are some relevant contents in the page". The new
// games are in pages/pNNN-NNN.js, one file per range, each exporting (ctx) => { … ctx.add(…) / ctx.wio(…) / ctx.tool(…) … }
// with the same builders as above. They go in a third file of their own: ACTIVITIES-bn-update-2026-11-03-pages.json.
const PAGES_FROM = activities.length;
const PAGES_DIR = path.join(__dirname, "pages");
const PAGE_CTX = { add, wio, tool, pairs, eqPairs, placeValueText, fromPlaceValue, mcq, numAlts, numQ, mulQ, finishQuestions, wordPairs, range, compareWhy, cmpQ,
  nextOf, patternQ, gapQ, missingQ, tableRapid, productQ, shapeSeq, clockOf, columnSum, mistakeOf, groupsOf, lineOf, calc, calcBrackets, show, toBn, fromBn, numIn, allNums,
  inWords, WORDS, ORD, ORD_SHORT, PLACE, DAYS, BN_MONTHS, EN_MONTHS, SHAPES, SHAPE_OF, rng, shuffled, FRESH_COUNT, TOOL_KIND,
  // a note for the README ("What I wasn't sure of"), and a page left without a game, with the reason
  note: (text) => PAGE_NOTES.push(text), skip: (page, why) => { PAGE_SKIPS[page] = why; } };
const PAGE_NOTES = [], PAGE_SKIPS = {};
const PAGE_FILES = fs.existsSync(PAGES_DIR) ? fs.readdirSync(PAGES_DIR).filter((f) => /^p\d{3}-\d{3}\.js$/.test(f)).sort() : [];
// --only=p025-039 builds with just that range's new games (so one range's unfinished file can't stop another's checks)
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) || "").slice(7);
for (const f of PAGE_FILES) if (!ONLY || f.startsWith(ONLY)) require(path.join(PAGES_DIR, f))(PAGE_CTX);
// the user (3 Nov, for the Class 3 file, as on 18 Oct for the English books): every activity at least 10 questions (a
// game's fresh problems count; a match's pairs and a sequence's or a sort's items each count one). Held for the new games.
const MIN_QUESTIONS = 10;
const WIO_ENGINE = ["work_it_out", ...Object.keys(TOOL_KIND)];
const questionsOf = (a) => (a.content.items || a.content.pairs || a.content.questions).length + (WIO_ENGINE.includes(a.type) && a.configuration.fresh ? a.configuration.fresh.count : 0);
const shortNew = activities.slice(PAGES_FROM).filter((a) => questionsOf(a) < MIN_QUESTIONS);
if (shortNew.length) throw new Error(`${shortNew.length} new activities under ${MIN_QUESTIONS} questions:\n${shortNew.map((a) => `  ${a.key}: ${questionsOf(a)}`).join("\n")}`);

// ───────────────────────────── normalize, check, verify ─────────────────────────────
const nfc = (v) => (typeof v === "string" ? v.normalize("NFC") : Array.isArray(v) ? v.map(nfc) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, nfc(x)])) : v);
// in page order (a page's activities keep the order they were made in)
const built = activities.map(nfc).map((a, i) => [a, i]).sort((x, y) => x[0].page - y[0].page || x[1] - y[1]).map(([a]) => a);
const fail = (a, msg) => { throw new Error(`${a.key} (p.${a.page}): ${msg}`); };
const LIMITS = { option: 60, orderItem: 120, categoryItem: 80, categoryName: 40, why: 160 };

// the tools' items (2 Nov 2026): each one's answer by the rules of the brief, or null when it can't be asked. Written
// here on its own (validate.js compares the server's answers with its own working).
const MONEY_NOTES = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
const GRAM_WEIGHTS = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
const SHAPE_TOKEN = /^(circle|square|triangle|star|heart|rect)-(red|blue|green|yellow|purple|orange)$/;
const COMPOSE_PIECES = { square: "tri+tri", rectangle: "sq+sq", circle: "half+half", "big-square": "sq+sq+sq+sq" };
const int = (v) => Number.isInteger(v) && v >= 0;
function toolAnswer(it) {
  switch (it.kind) {
    case "mistake": {
      if (!int(it.a) || !int(it.b) || !int(it.shown) || !["+", "−"].includes(it.op)) return null;
      const right = it.op === "+" ? it.a + it.b : it.a - it.b;
      const R = String(right), W = String(it.shown);
      if (right < 0 || R.length !== W.length) return null;
      const diff = [...R].map((d, i) => (d !== W[i] ? i : -1)).filter((i) => i >= 0);
      return diff.length === 1 ? { pos: diff[0], digit: Number(R[diff[0]]) } : null;
    }
    case "groups":
      return int(it.total) && int(it.groups) && it.groups >= 2 && it.groups <= 6 && it.total <= 30 && it.total % it.groups === 0 && it.emoji ? it.total / it.groups : null;
    case "numberline": {
      const n = (it.to - it.from) / it.step;
      const onStep = (it.target - it.from) % it.step === 0;
      return [it.from, it.to, it.step, it.target].every(int) && it.step > 0 && Number.isInteger(n) && n >= 2 && n <= 20 && it.target >= it.from && it.target <= it.to && onStep && ["place", "read"].includes(it.ask) ? it.target : null;
    }
    case "clock":
      return int(it.h) && it.h >= 1 && it.h <= 12 && int(it.m) && it.m <= 59 && (it.ask === "read" || (it.ask === "set" && it.m % 5 === 0)) ? [it.h, it.m] : null;
    case "money": {
      if (it.ask === "count") return Array.isArray(it.notes) && it.notes.length >= 1 && it.notes.length <= 12 && it.notes.every((v) => MONEY_NOTES.includes(v)) ? it.notes.reduce((s, v) => s + v, 0) : null;
      const items = it.items || [];
      if (items.length > 3 || items.some((x) => !x.name || x.name.length > 30 || /[0-9]/.test(x.name) || !int(x.price) || !x.price)) return null;
      const price = items.length ? items.reduce((s, x) => s + x.price, 0) : it.price;
      if (!int(price) || !price || price > 5000) return null;
      if (it.ask === "pay") return price;
      if (it.ask === "change") return int(it.paid) && it.paid > price && it.paid <= 5000 ? it.paid - price : null;
      return null;
    }
    case "measure":
      if (it.tool === "ruler") return int(it.value) && it.value >= 1 && it.value <= 30 && it.emoji ? it.value : null;
      if (it.tool === "jug") return int(it.value) && it.value >= 50 && it.value <= 1000 && it.value % 50 === 0 && ["read", "fill"].includes(it.ask) ? it.value : null;
      if (it.tool === "balance") return Array.isArray(it.weights) && it.weights.length >= 1 && it.weights.length <= 6 && it.weights.every((g) => GRAM_WEIGHTS.includes(g)) && it.emoji ? it.weights.reduce((s, g) => s + g, 0) : null;
      return null;
    case "shapes": {
      const seq = it.seq || [];
      if (seq.length > 10 || seq.filter((t) => t == null).length !== 1 || seq.some((t) => t != null && !SHAPE_TOKEN.test(t))) return null;
      // the shortest repeating unit (2–4 shapes, not all the same) that every shown shape fits; at least two whole units shown
      for (let p = 2; p <= 4; p++) {
        const unit = Array(p).fill(null);
        let ok = true;
        seq.forEach((t, i) => { if (t == null) return; if (unit[i % p] == null) unit[i % p] = t; else if (unit[i % p] !== t) ok = false; });
        if (!ok || unit.some((u) => u == null) || new Set(unit).size < 2) continue;
        return seq.length >= 2 * p + 1 ? unit[seq.indexOf(null) % p] : null;
      }
      return null;
    }
    case "compose":
      return COMPOSE_PIECES[it.target] || null;
    default:
      return null;
  }
}

// shape and size rules from the brief and the importer's normalizers
function checkShape(a) {
  const c = a.content;
  if (/[0-9]/.test(JSON.stringify(c, (k, v) => (k.startsWith("_") ? undefined : v)).replace(/"(answer|category)":\d+/g, "")) && !["mcq", "rapid_quiz", "work_it_out", ...TOOL_TYPES].includes(a.type)) fail(a, "ASCII digit in the text");
  if (TOOL_TYPES.includes(a.type)) {
    // the tools: 4–10 items, all of the type's one kind, none twice; a fresh block names the type's own skill
    if (c.items.length < 4 || c.items.length > 10) fail(a, `${c.items.length} items`);
    const seen = new Set();
    for (const it of c.items) {
      const k = JSON.stringify(it);
      if (it.kind !== TOOL_KIND[a.type]) fail(a, `kind ${it.kind}`);
      if (seen.has(k)) fail(a, `repeated item ${k}`); seen.add(k);
      // a "place" number line: 11–20 steps, the number on a tick the player doesn't print (odd, not the last)
      if (it.kind === "numberline" && it.ask === "place") {
        const n = (it.to - it.from) / it.step, i = (it.target - it.from) / it.step;
        if (n <= 10 || i % 2 !== 1 || i === n) fail(a, `the place item ${k} shows its own number`);
      }
    }
    const f = a.configuration.fresh;
    if (f && (f.skill !== TOOL_KIND[a.type] || f.count !== FRESH_COUNT)) fail(a, "fresh");
    if (!/^[^0-9]+$/.test(a.title)) fail(a, `title ${a.title}`);
    return;
  }
  switch (a.type) {
    case "work_it_out": {
      if (c.items.length < 4 || c.items.length > 12) fail(a, `${c.items.length} items`);
      const seen = new Set();
      for (const it of c.items) {
        const k = JSON.stringify(it);
        if (seen.has(k)) fail(a, `repeated item ${k}`); seen.add(k);
        if (it.kind === "word") {
          if (!it.text || it.text.length > 500 || /[0-9]/.test(it.text)) fail(a, `word text: ${it.text}`);
          if (it.unit.length > 24 || !/^[\d\s+−×()]+$/.test(it.sum) || !/[+−×]/.test(it.sum)) fail(a, `word sum/unit: ${it.text}`);
        } else if (it.kind === "sum") {
          if (!["+", "−", "×"].includes(it.op) || !Number.isInteger(it.a) || !Number.isInteger(it.b) || !["row", "column"].includes(it.layout)) fail(a, `sum ${k}`);
        } else if (it.kind === "missing") {
          if ((it.text.match(/□/g) || []).length !== 1) fail(a, `missing ${it.text}`);
        } else if (it.kind === "pattern") {
          if (it.terms.length < 3 || it.terms.length > 12 || !it.terms.includes(null)) fail(a, `pattern ${k}`);
        } else if (it.kind === "place") {
          if (!(it.n >= 1 && it.n <= 9999) || !["parts", "number"].includes(it.ask)) fail(a, `place ${k}`);
        } else if (it.kind !== "compare") fail(a, `kind ${it.kind}`);
      }
      break;
    }
    case "number_match": case "equation_match": {
      if (c.pairs.length < 4 || c.pairs.length > 12) fail(a, `${c.pairs.length} pairs`); // 12 since 3 Nov (10 questions a game), as the Class 3 file
      if (new Set(c.pairs.map((p) => p.left)).size !== c.pairs.length) fail(a, "repeated left");
      if (new Set(c.pairs.map((p) => p.right)).size !== c.pairs.length) fail(a, "repeated right");
      break;
    }
    case "mcq": case "rapid_quiz": {
      if (c.questions.length < 5 || c.questions.length > 10) fail(a, `${c.questions.length} questions`);
      for (const q of c.questions) {
        if (q.options.length < 3 || q.options.length > 4) fail(a, `options: ${q.prompt}`);
        if (new Set(q.options).size !== q.options.length) fail(a, `repeated option: ${q.prompt}`);
        if (!(q.answer >= 0 && q.answer < q.options.length)) fail(a, `answer: ${q.prompt}`);
        if (q.options.some((o) => o.length > LIMITS.option)) fail(a, `long option: ${q.prompt}`);
        if (!q.why || q.why.length > LIMITS.why) fail(a, `why (${(q.why || "").length}): ${q.prompt}`);
        if (/[0-9]/.test(q.prompt + q.options.join("") + q.why)) fail(a, `ASCII digit: ${q.prompt}`);
      }
      if (new Set(c.questions.map((q) => q.answer)).size === 1) fail(a, "the right answer is always in one place");
      break;
    }
    case "categorize": {
      if (c.categories.length < 2 || c.categories.length > 5 || c.items.length < 6 || c.items.length > 12) fail(a, "groups/items count");
      if (c.categories.some((g) => g.name.length > LIMITS.categoryName)) fail(a, "long group name");
      if (c.items.some((it) => it.text.length > LIMITS.categoryItem)) fail(a, "long item");
      if (new Set(c.items.map((it) => it.text)).size !== c.items.length) fail(a, "repeated item");
      if (c.categories.some((_, i) => !c.items.some((it) => it.category === i))) fail(a, "an empty group");
      break;
    }
    case "sequence": {
      if (c.items.length < 3 || c.items.length > 12) fail(a, "items count");
      if (new Set(c.items.map((it) => it.text)).size !== c.items.length) fail(a, "repeated item");
      if (c.items.some((it) => it.text.length > LIMITS.orderItem)) fail(a, "long item");
      break;
    }
    default: fail(a, `type ${a.type}`);
  }
}

// every answer again, from the Bangla text alone
function verify(a) {
  const c = a.content;
  if (a.type === "number_match" || a.type === "equation_match") {
    for (const p of c.pairs) {
      const k = p._v && p._v.kind;
      const ok = k === "eq" ? calc(p.left) === calc(p.right)
        : k === "words" ? fromWords(p.right) === numIn(p.left)
        : k === "pv" ? fromPlaceValue(p.left) === numIn(p.right)
        : k === "ord" ? ORD.indexOf(p.right) + 1 === numIn(p.left)
        : false;
      if (!ok) fail(a, `pair ${p.left} ↔ ${p.right}`);
    }
  } else if (a.type === "mcq" || a.type === "rapid_quiz") {
    for (const q of c.questions) {
      const v = q._v; if (!v) continue;
      const got = q.options[q.answer];
      const only = (pred) => { if (!pred(got) || q.options.filter(pred).length !== 1) fail(a, `answer of: ${q.prompt}`); };
      if (v.expr != null) { const want = calc(v.expr) / v.div; only((o) => numIn(o) === want); }
      else if (v.cmp) { const [x, y] = [numIn(q.options[0]), numIn(q.options[1])]; only((o) => numIn(o) === (v.cmp === "max" ? Math.max(x, y) : Math.min(x, y))); }
      else if (v.missing) { const [l, r] = v.missing.split("="); only((o) => { const n = String(numIn(o)); return calc(l.replace("?", n)) === calc(r.replace("?", n)); }); }
      else if (v.pattern === "next") { const seq = allNums(q.prompt); only((o) => { const s = [...seq, numIn(o)]; try { return nextOf(s.slice(0, -1)).ans === s[s.length - 1]; } catch (e) { return false; } }); }
      else if (v.pattern === "gap") { const [p0, p1, p3] = allNums(q.prompt); only((o) => numIn(o) - p1 === p1 - p0 && p3 - numIn(o) === p1 - p0); }
      else if (v.pv) { const [n, d] = allNums(q.prompt); const s = String(n); only((o) => numIn(o) === d * Math.pow(10, s.length - 1 - s.indexOf(String(d)))); }
      else if (v.product != null) only((o) => calc(o) === v.product);
      else if (v.weights != null) only((o) => allNums(o).reduce((s, x) => s + x, 0) === v.weights);
      else if (v.money != null) only((o) => moneyFromText(o) === v.money);
      else if (v.time) { const [hh, mm] = allNums(q.prompt); only((o) => { const [h, m] = allNums(o); return h === hh && m === mm; }); }
      else if (v.tally != null) only((o) => { const [g, r] = allNums(o); return o.includes("পাঁচের দল") && g * 5 + r === v.tally; });
      else fail(a, "unknown check");
    }
  } else if (a.type === "work_it_out") {
    // every item must have exactly one whole-number answer (the server works it out; validate.js compares)
    for (const it of c.items) {
      const ans = wioAnswer(it);
      if (ans == null) fail(a, `no single whole answer: ${JSON.stringify(it)}`);
    }
  } else if (TOOL_TYPES.includes(a.type)) {
    // every tool item can be asked, and its slip / total / time / share / unit is the one meant
    for (const it of c.items) if (toolAnswer(it) == null) fail(a, `can't be asked: ${JSON.stringify(it)}`);
    if (a.type === "find_mistake") for (const it of c.items) { const r = columnSum(it.a, it.op, it.b); if (!r.steps.length || r.value === it.shown) fail(a, `no carry or borrow: ${it.a} ${it.op} ${it.b}`); }
  } else if (a.type === "sequence") {
    const items = c.items.map((it) => it.text);
    if (c._v && c._v.order === "asc") items.slice(1).forEach((t, i) => { if (!(numIn(t) > numIn(items[i]))) fail(a, `order ${items[i]} → ${t}`); });
    if (c._v && c._v.list && items.join("|") !== c._v.list.map((x) => x.normalize("NFC")).join("|")) fail(a, "order of the list");
  } else if (a.type === "categorize") {
    const rule = c._v && c._v.rule;
    for (const it of c.items) {
      const group = c.categories[it.category].name;
      if (rule === "parity" && (numIn(it.text) % 2 === 0) !== (group === "জোড় সংখ্যা")) fail(a, `${it.text} in ${group}`);
      if (rule === "money" && moneyFromText(it.text) !== numIn(group)) fail(a, `${it.text} in ${group}`);
    }
  }
}

const keys = new Set(), qrs = new Set();
for (const a of built) {
  if (keys.has(a.key)) fail(a, "repeated key"); keys.add(a.key);
  if (qrs.has(a.qr)) fail(a, "repeated qr"); qrs.add(a.qr);
  if (!/^LS[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/.test(a.code)) fail(a, "code");
  checkShape(a);
  verify(a);
}

// ───────────────────────────── write the file and the README ─────────────────────────────
const strip = (k, v) => (k.startsWith("_") ? undefined : v);
// pages that had no game before 3 Nov and need none (none yet: the ranges' files say why with ctx.skip)
const BEFORE_PAGES_SKIPS = [];
const file = {
  format: "ebidyaloy-activity-import",
  version: 1,
  book: { title: "প্রাথমিক গণিত - দ্বিতীয় শ্রেণী", edition: "bn", editionName: "বাংলা", language: "bn", base: true, chapters: CHAPTERS },
  activities: built,
};
if (ONLY) {
  const mine = built.filter((a) => activities.indexOf(activities.find((x) => x.key === a.key)) >= PAGES_FROM);
  fs.mkdirSync(path.join(__dirname, ".check"), { recursive: true });
  const checkFile = path.join(__dirname, ".check", `${ONLY}.json`);
  fs.writeFileSync(checkFile, JSON.stringify({ ...file, activities: mine }, strip, 2) + "\n");
  console.log(`--only=${ONLY}: ${mine.length} new activities verified → ${checkFile} (the real files are not written; check it with: node validate.js .check/${ONLY}.json)`);
  for (const a of mine) console.log(`  p.${a.page} ${a.type} ${a.code} ${a.title}`);
  for (const [p, why] of Object.entries(PAGE_SKIPS)) console.log(`  p.${p} no game: ${why}`);
  process.exit(0);
}
fs.writeFileSync(OUT_JSON, JSON.stringify(file, strip, 2) + "\n");
// the tools update: the same book block, only the new activities (importing it adds just them)
const toolKeys = new Set(activities.slice(TOOLS_FROM, PAGES_FROM).map((a) => a.key)), pageKeys = new Set(activities.slice(PAGES_FROM).map((a) => a.key));
const isTool = (a) => toolKeys.has(a.key), isNewPage = (a) => pageKeys.has(a.key);
const tools = built.filter(isTool), newPages = built.filter(isNewPage), firstFile = built.filter((a) => !isTool(a) && !isNewPage(a));
if (firstFile.length !== 85 || tools.some((a) => !TOOL_TYPES.includes(a.type)) || firstFile.some((a) => TOOL_TYPES.includes(a.type))) throw new Error("the first file's 85 and the tools got mixed up");
fs.writeFileSync(OUT_UPDATE, JSON.stringify({ ...file, activities: tools }, strip, 2) + "\n");
fs.writeFileSync(OUT_PAGES, JSON.stringify({ ...file, activities: newPages }, strip, 2) + "\n");
// the pages still without a game, and why (every one must have a reason)
const withGame = new Set(built.map((a) => a.page)), noGame = [];
for (let p = 1; p <= 127; p++) if (!withGame.has(p)) noGame.push(p);
const unexplained = noGame.filter((p) => !PAGE_SKIPS[p] && !BEFORE_PAGES_SKIPS.includes(p));

const TYPE_NAME = {
  number_match: "Number Match", equation_match: "Equation Match", mcq: "Multiple Choice", rapid_quiz: "Rapid Quiz", categorize: "Categorize", sequence: "Sequence", work_it_out: "Work It Out",
  find_mistake: "Find the Mistake", equal_groups: "Make Equal Groups", number_line: "Number Line", clock_time: "Clock & Time", taka_shop: "Taka Shop", measure_it: "Measure It", shape_patterns: "Shape Patterns", make_shapes: "Make a Shape",
};
const KIND_BN = { sum: "sums", missing: "boxes", place: "place value", pattern: "patterns", word: "stories", compare: "compare" };
// a tool's items: how many, and how they ask (read / set, pay / count / change, ruler / jug / balance …)
const toolItems = (a) => {
  const k = {};
  a.content.items.forEach((it) => { const w = it.ask || it.tool || (it.kind === "mistake" ? (it.op === "+" ? "add" : "sub") : ""); if (w) k[w] = (k[w] || 0) + 1; });
  const how = Object.keys(k).length ? ` (${Object.entries(k).map(([x, n]) => `${n} ${x}`).join(", ")})` : "";
  return `${a.content.items.length} items${how}${a.configuration.fresh ? ` + ${a.configuration.fresh.count} fresh` : ""}`;
};
const itemsOf = (a) => { const c = a.content; if (TOOL_TYPES.includes(a.type)) return toolItems(a); if (a.type === "work_it_out") { const k = {}; c.items.forEach((it) => { k[it.kind] = (k[it.kind] || 0) + 1; }); return `${c.items.length} items (${Object.entries(k).map(([x, n]) => `${n} ${KIND_BN[x]}`).join(", ")})${a.configuration.fresh ? ` + fresh ${a.configuration.fresh.skill}${a.configuration.fresh.table ? " " + a.configuration.fresh.table : ""}` : ""}`; } return c.pairs ? `${c.pairs.length} pairs` : c.questions ? `${c.questions.length} questions` : c.categories ? `${c.categories.length} groups, ${c.items.length} items` : `${c.items.length} items`; };
const wioOf = (list) => list.filter((a) => a.type === "work_it_out");
const wioItems = (list) => wioOf(list).reduce((s, a) => s + a.content.items.length, 0);
const byChapter = CHAPTERS.map((ch) => built.filter((a) => a.chapter === ch));
const byType = Object.keys(TYPE_NAME).map((t) => [t, built.filter((a) => a.type === t).length]).filter(([, n]) => n);
const toolsByChapter = CHAPTERS.map((ch) => tools.filter((a) => a.chapter === ch));
const toolsByType = TOOL_TYPES.map((t) => [t, tools.filter((a) => a.type === t)]);
const srcOf = (a) => activities.find((x) => x.key === a.key)._src;
const row = (a) => `| ${a.page} | ${TYPE_NAME[a.type]} | ${a.title} | \`${a.code}\` | ${a.qr} | ${itemsOf(a)} | ${srcOf(a)} |`;

const NOTES = [
  "**p.44** exercise 1 (4) prints “৭৮ + ০৮” in columns; the file writes it “৭৮ + ৮”.",
  "**p.59** exercise 1 (3) “৫২৩ + ৬১৪” makes ১১৩৭, beyond this book's ১০০০ (probably a misprint), so it is left out.",
  "**Ch.3 reading of ×:** the book (p.76) reads ৩ × ৪ as “৩ করে ৪ বার” (প্রত্যেক দলে বস্তুর সংখ্যা × দলের সংখ্যা), so the file matches ৩ + ৩ + ৩ + ৩ ↔ ৩ × ৪ (and ৪ + ৪ + ৪ would be ৪ × ৩, not ৩ × ৪). Pairs whose products are equal (৩ × ৪ and ৪ × ৩) are not put in one game.",
  "**p.96** prints “০টি ট্রে: ০ × ০” (probably meant ৩ × ০, since a tray holds ৩টি বল). The multiple-choice ০/১ questions use the page's rule text; the Work It Out item writes it ৩ × ০.",
  "**pp.34–35:** the animals and fruits are pictures without names; the file names them হাতি, ঘোড়া, বাঘ, খরগোশ, মোরগ (left → right) and আনারস, আপেল, আঙুর, কলা, তরমুজ (left → right).",
  "**p.104** asks the shapes of six foods without answers; the file uses পাউরুটি → চতুর্ভুজাকার, রসগোল্লা/মোয়া → গোলাকার, সমুচা → ত্রিভুজাকার, and leaves out বিস্কুট and ছানার সন্দেশ (they can be round or square). ইট → চতুর্ভুজাকার follows the matching on p.103.",
  "**p.103 sort:** there is no pyramid or samosa emoji; 🔺 and 🥟 stand in. The ত্রিভুজাকার group has two things (সমুচা, পিরামিড): the pages show no more.",
  "**p.106 patterns:** the first four questions use the book's ○□□□ and △□□□; the last two (△○, ○○△) are new patterns made with the same shapes.",
  "**Coins vs notes:** p.121 lists ১, ২, ৫ টাকা as coins, but p.123 shows ১, ২, ৫ টাকার নোট too, so a coin/note sort would be ambiguous. The money sort (p.122) groups ways to make ২০০ / ৫০০ / ১০০০ টাকা instead: all three ২০০ ways and the first ৫০০ and ১০০০ ways are the book's; the other ৫০০/১০০০ ways are new (the page invites “অনুরূপ ভিন্ন ভিন্নভাবে”).",
  "**p.123 / p.124:** the কলা row (৫০ + ১০) is the book's; the আপেল, তরমুজ and কাঁঠাল note counts are the file's own answers to the empty table.",
  "**p.116:** the pot in picture (3) isn't named on the page; the file calls it “মাটির পাত্র”.",
  "**p.118:** the digital clocks print Latin digits (11:35); the file writes them in Bangla digits (১১:৩৫).",
  "**p.119:** the days circle has no first day; the sequence starts at শনিবার (said in its title).",
  "**Work It Out:** p.33 1 (2) “২, ৩, ৫, ৮, ১২” is left out (its step isn't fixed, which the player needs). p.33 3 and 4 say the step in words (“৪৭ দিয়ে শুরু … ২ করে কমছে”), so their second number (৪৫, ২৮) is shown. p.32 (7) is written as first and last number with boxes between (৪৮, □, □, □, □, ৩৮). The p.40 and p.49 “কীভাবে” examples whose answers the page shows are left out; p.51's ৩৪ − ৭ and ৩০ − ৬ (empty boxes) are in.",
  "**Work It Out, pictures:** p.70's numbers are in its pictures (bars, jars, baskets), so each question carries them in words; p.72 12's price table is written out in the question. p.77's bananas use p.74's “প্রত্যেক ছড়ায় ৪টি করে কলা”. p.10–12 block and card counts (২৩৬, ১৪৭, ৫০৪, ৬৫৫, ৭৬৫) were counted from the pictures. p.19 (blocks to count) is not used: the small cubes are hard to count in the scan.",
  "**Not used (unclear in the pictures):** p.78 tomatoes and flowers per plate (exercise 2); p.109 eraser and pencil lengths (in the first file; the tools update reads them at 300 dpi); p.126 vehicles (no printed counts); p.104 cartoon shape counts.",
  "**Spellings** are the book's, read at 150–250 dpi: ঊনত্রিশ, ঊনচল্লিশ, ঊনপঞ্চাশ, ঊনষাট, ঊনসত্তর, ঊনআশি, ঊননব্বই (all with ঊ); বড়ো, ছোটো; জ্যৈষ্ঠ, আষাঢ়, অগ্রহায়ণ, ফাল্গুন. The book's title in the file is “প্রাথমিক গণিত - দ্বিতীয় শ্রেণী” as asked (the cover prints শ্রেণি).",
];

// the tools update (2 Nov 2026): what I wasn't sure of
const TOOL_NOTES = [
  "**Fresh problems:** each tool activity with fresh problems writes its skill out (`\"fresh\": { \"skill\": \"clock\", \"count\": 5 }`, not only the count): the importer saves a file's configuration as it is, and the player reads a fresh block without a skill as `add` (it would add sums to a clock game).",
  "**Find the Mistake:** the sums are the book's; the slip is worked out in code, the book's own column method with one carry (+) or one borrowed ten (−) not passed on to the next column, chosen among those that leave exactly one digit wrong and the answer as long as the right one; every third item instead has a fact slip in the ones column (৩ + ৮ = ১২: the ones digit one off), so the wrong digit isn't always the tens (a two-digit sum has only one carry). The book's sums where every such slip changes the answer's length can't be used: p.51–52 ৬০ − ৫৩, ৭৪ − ৬৮, ৪০ − ৩৪; p.57 ৮৬ + ৪৩, ৬৮ + ৩৫, ৭৪ + ৬৫, ৫৫ + ৪৫, ৯৩ + ৯ (two digits making three); p.62 ৫৬৮ + ৪৩২ (= ১০০০); p.67 ৩২০ − ২৮০. The other carrying and borrowing sums are left out only because eight a game is enough.",
  "**Make Equal Groups:** the book multiplies the plates (p.73 “৫টি থালায় ৪টি করে মাছ” = ৪ × ৫); the tool shares the whole lot back onto the plates, the same groups the other way round. Only pictures with 2–6 plates and at most ৩০ things fit (p.85's ৭টি থালা of পেয়ারা, p.87's ৮টি বিড়াল and the like don't). No lychee emoji: 🍒 stands in for p.80's লিচু; 🍏 for p.86's green apples; p.78 2 (2)–(3) is still not used (the counts per plate are unclear).",
  "**Number Line:** the targets are the book's pattern numbers (pp.30–32) and table products (pp.79–86); where each line starts and ends is mine. The player prints every number on a line of up to ১০ steps (every second one on ১১–২০), so every “place” item uses ১১–২০ steps with its number on a tick that isn't printed (build.js checks it); “read” items hide the number under the arrow. p.32 (7) (4) (৫০ থেকে ৪০, ৫ করে) is only two steps and is left out.",
  "**Clock & Time:** p.117's middle clock (exercise 1) reads ১টা at 250 dpi. p.118 3 shows its times (১১:১৫, ১১:৩৫, ০৮:২০, ০৬:২৫, ০৭:৪৫) on digital clocks only, and pp.117–118 teach the hour hand only (মিনিটের কাঁটা ১২ এর ঘরে); “ঘণ্টা ও মিনিট” puts these times on a dial (read and set), a step beyond the pages.",
  "**Taka Shop:** p.124's পেঁপে costs ১৮৮ টাকা (read at 300 dpi), exactly one each of ১০০, ৫০, ২০, ১০, ৫, ২ and ১ টাকা. There is no papaya or jackfruit emoji: 🍈 stands for পেঁপে, and কাঁঠাল has none (the player shows 🛍️). খাতা ৯০ টাকা is worked out from p.124 3 (১০৫ − ১৫). The count items are the book's ways (p.122, p.123 মিরাজ, p.124 কলা) and one ৫০ টাকা way of mine for p.123 1; p.123's rows (3)–(4) (১০টি ১ টাকা …) have more than ১২ coins, the most a count item shows. In “ফেরত টাকা” only মেহেরুল's (p.124 4: ১০০ + ৫০ টাকা for a ১২০ টাকার জ্যামিতি বক্স) is the book's; the others pay p.124's prices with the next bigger note.",
  "**Measure It:** p.109–110's lengths, read at 300 dpi: পেনসিল ৮, ১২ and ৯ সে.মি., রাবার ৫ (left out: no eraser emoji), গ্লাস ৩, মোমবাতি ৫; 🖍️ ৭, 🥕 ১৪ and 🍌 ১৮ are mine. The balance's six weight sets are the book's (p.112–113); the things on the pan (🍫 🥚 🍅 🍌 🍆 🍍) and the ১৭০, ২৫০ and ১০০০ গ্রাম sets are mine. The jug works in millilitres, which the book doesn't use (it measures liquids in litres and glasses, pp.114–116): ১ লিটার = ১০০০ মিলি and আধা লিটার = ৫০০ মিলি are said in that activity's guide note. No fresh problems here: a fresh “measure” problem can be any of the three tools.",
  "**Shape Patterns:** the book's patterns (p.106) are outlines; the file colours them as p.102 does (গোল orange, তিনকোনা green, চারকোনা blue). The second activity's six patterns are new.",
  "**Make a Shape:** pp.102–104 don't join pieces into shapes; the activity asks the tool's four (two triangles → a square, two squares → a rectangle, two half circles → a circle, four squares → a big square), next to p.104 2's picture made of triangles and four-sided shapes. It has no fresh problems (there are only these four).",
];

const md = [];
md.push("# প্রাথমিক গণিত, দ্বিতীয় শ্রেণি: Activity Studio file", "");
md.push("`ACTIVITIES-bn.json` is an **eBidyaloy Activity Studio activity file** (format `ebidyaloy-activity-import`, version 1) for the NCTB textbook *প্রাথমিক গণিত, দ্বিতীয় শ্রেণি* (2026 edition). Import it into a book in Activity Studio (a book **without** a language course: the file is a Bangla subject book, `book.language: \"bn\"`, no `teachLanguage`). Every activity comes in as a draft game, tied to the printed page it practises; its code (`LS…`) is permanent and can be printed in a QR.", "");
md.push(`- **${built.length} activities** (the first file's **${firstFile.length}**, and the **${tools.length}** tools of the [2 Nov 2026 update](#update-2-nov-2026-the-math-tools)), all in Bangla with Bangla digits; no voice or picture is needed (the guide is empty, but for a few notes).`);
md.push(`- Per chapter: ${byChapter.map((list, i) => `${CHAPTERS[i]} **${list.length}**`).join(" · ")}`);
md.push(`- Per type: ${byType.map(([t, n]) => `${TYPE_NAME[t]} **${n}**`).join(" · ")}`);
md.push(`- Work It Out (chapters ১–৩): ${byChapter.slice(0, 3).map((list, i) => `${CHAPTERS[i]} **${wioOf(list).length}** activities, **${wioItems(list)}** items`).join(" · ")}`, "");
md.push("**Work It Out** activities copy the pages' own exercises (sums, boxes to fill, place value, number patterns, comparisons and word problems, the stories as printed) for the child to work out on a keypad. They carry **no answers**: the server works every answer out when the file is imported. Where a page drills one skill, `configuration.fresh` adds 10 new problems of that skill after the page's own.", "");
md.push("Printed page = PDF page − 9 (printed p.1 is PDF p.10).", "");
md.push("## Activities", "");
md.push(`The first file's ${firstFile.length} (imported 2 Nov 2026); the tools are listed under the update below.`, "");
md.push("| Page | Type | Title | Code | QR | Content | From |", "|---:|---|---|---|---|---|---|");
for (const a of firstFile) md.push(row(a));
md.push("", "## Update 2 Nov 2026: the math tools", "");
md.push(`\`ACTIVITIES-bn-update-2026-11-02-tools.json\` holds **only the ${tools.length} new activities**, made with Activity Studio's eight new math types (Work It Out's tools, each its own type). It has the same format and the same book block as \`ACTIVITIES-bn.json\`; the full \`ACTIVITIES-bn.json\` above now holds all ${built.length}.`, "");
md.push("**To import it:** open the book that already has the first 85 → **Import activity file** → choose `ACTIVITIES-bn-update-2026-11-02-tools.json`. The importer adds these as new drafts with their codes and leaves the 85 as they are. (Importing the full `ACTIVITIES-bn.json` into that book again would do the same: the 85 show as already imported, matched by their codes and keys.) Then publish them from the book's activity list, as with the first file.", "");
md.push("Like Work It Out, the items carry **no answers**: the server works each one out (the wrong digit and its fix, the share, the time, the total, the length or weight, the missing shape, the pieces). Where it helps, `configuration.fresh` adds 5 new problems of the same tool after the page's own (clock, money, groups, mistakes, shape patterns).", "");
md.push(`- Per type: ${toolsByType.map(([t, list]) => `${TYPE_NAME[t]} **${list.length}** (${list.reduce((s, a) => s + a.content.items.length, 0)} items)`).join(" · ")}`);
md.push(`- Per chapter: ${toolsByChapter.map((list, i) => [CHAPTERS[i], list]).filter(([, list]) => list.length).map(([ch, list]) => `${ch} **${list.length}**`).join(" · ")}`, "");
md.push("| Page | Type | Title | Code | QR | Content | From |", "|---:|---|---|---|---|---|---|");
for (const a of tools) md.push(row(a));
md.push("", "## Update 3 Nov 2026: a game for every page", "");
md.push(`\`ACTIVITIES-bn-update-2026-11-03-pages.json\` holds **only the ${newPages.length} new activities**, so that every page with something to practise has at least one game (the user: “all the pages should have at least one activity if there are some relevant contents in the page”). Import it into /b/GDK2NH the same way as the tools update; the full \`ACTIVITIES-bn.json\` above holds all ${built.length}.`, "");
md.push("| Page | Type | Title | Code | QR | Content | From |", "|---:|---|---|---|---|---|---|");
for (const a of newPages) md.push(row(a));
md.push("", noGame.length ? `**Pages still without a game (${noGame.length}):** ${noGame.map((p) => `p.${p} (${PAGE_SKIPS[p] || "?"})`).join(" · ")}` : "**Every page has a game.**", "");
if (PAGE_NOTES.length) { md.push("### The every-page update: what I wasn't sure of", ""); for (const n of PAGE_NOTES) md.push(`- ${n}`); md.push(""); }
md.push("", "## Rebuild", "");
md.push("```sh", "cd ~/Downloads/class2-math-activities", "source ~/.nvm/nvm.sh && nvm use 16", "node build.js      # writes ACTIVITIES-bn.json, the two update files (2 Nov tools, 3 Nov every-page) and this README; --only=pNNN-NNN checks one range of pages/", "node validate.js   # the importer's own checks on both files, its answers against ours, and the 85 against ACTIVITIES-bn-before-tools.json", "```", "");
md.push("`build.js` holds every number as the page prints it (ASCII digits) and computes all answers; before writing it parses every pair, answer, order and group back from the Bangla text and checks it again, and it stops on any mistake. The codes come from a hash of each activity's key, so a rebuild keeps them (a new activity gets a new code; renaming a key changes its code). The tools are made after the first 85, so those keep their codes and QR letters; `ACTIVITIES-bn-before-tools.json` is the full file as it was before the tools, kept for that comparison.", "");
md.push("## What I wasn't sure of", "");
for (const n of NOTES) md.push(`- ${n}`);
md.push("", "### The tools update", "");
for (const n of TOOL_NOTES) md.push(`- ${n}`);
md.push("");
fs.writeFileSync(OUT_README, md.join("\n"));

console.log(`${built.length} activities → ${OUT_JSON}`);
byChapter.forEach((list, i) => console.log(`  ${CHAPTERS[i]}: ${list.length} (${Object.entries(list.reduce((m, a) => ((m[a.type] = (m[a.type] || 0) + 1), m), {})).map(([t, n]) => `${t} ${n}`).join(", ")})`));
console.log(`  types: ${byType.map(([t, n]) => `${t} ${n}`).join(", ")}`);
byChapter.slice(0, 3).forEach((list, i) => console.log(`  work_it_out ${CHAPTERS[i]}: ${wioOf(list).length} activities, ${wioItems(list)} items`));
console.log(`${tools.length} tool activities → ${OUT_UPDATE}`);
console.log(`${newPages.length} every-page activities → ${OUT_PAGES}`);
console.log(noGame.length ? `pages without a game: ${noGame.map((p) => `${p}${PAGE_SKIPS[p] ? "" : "(?)"}`).join(" ")}` : "every page has a game");
if (unexplained.length) console.log(`WARNING: no game and no reason: ${unexplained.join(", ")}`);
toolsByType.forEach(([t, list]) => console.log(`  ${t}: ${list.length} (${list.map((a) => `p.${a.page} ${a.content.items.length}`).join(", ")})`));
