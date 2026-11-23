#!/usr/bin/env node
// Builds ACTIVITIES-bn-update-2026-11-14-slice.json: the Slice It! games («কেটে ভাগ করি», type fraction_slice, 14 Nov
// 2026) for chapter ৯ ভগ্নাংশ, an update file with only these 5 new activities (the chapter's earlier games stay as
// they are). The child cuts real food into equal parts, eats or shares the parts, and names the fraction. The things
// can be cut into 2, 4, 6 or 8 (orange, roti, cake, watermelon) or 2, 3, 4, 6, 12 (chocolate 3 × 4, eggs 2 × 6), so the
// book's fifths, sevenths and ninths stay with Fraction Play. Every game has 10 rounds (the user's rule, 3 Nov: at
// least 10 questions). Codes: LS + 6 from a hash of the key, none used by any other activity file here or in Class 2.
// Run:  node build-slice.js   (then node validate-slice.js)
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const OUT = path.join(__dirname, "ACTIVITIES-bn-update-2026-11-14-slice.json");
const BOOK = JSON.parse(fs.readFileSync(path.join(__dirname, "ACTIVITIES-bn.json"), "utf8")).book; // the same 13 chapters
const CHAPTER = "অধ্যায় ৯ · ভগ্নাংশ";
const BN = "০১২৩৪৫৬৭৮৯";
const bn = (s) => String(s).replace(/\d/g, (d) => BN[d]);

// every code already in an activity file (this book's three, Class 2's), never used again
const OTHER_FILES = ["ACTIVITIES-bn.json", "ACTIVITIES-bn-rest.json", "ACTIVITIES-bn-update-2026-11-03-pages.json"].map((f) => path.join(__dirname, f))
  .concat(["ACTIVITIES-bn.json", "ACTIVITIES-bn-update-2026-11-02-tools.json", "ACTIVITIES-bn-update-2026-11-03-pages.json"].map((f) => path.join(__dirname, "..", "class2-math-activities", f)));
const used = new Set();
OTHER_FILES.forEach((f) => { if (fs.existsSync(f)) JSON.parse(fs.readFileSync(f, "utf8")).activities.forEach((a) => used.add(a.code)); });
const CODE_ABC = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function codeFor(key) {
  for (let salt = 0; ; salt++) {
    const h = crypto.createHash("sha256").update(`ebidyaloy-class3-math:${key}:${salt}`).digest();
    let c = "LS";
    for (let i = 0; i < 6; i++) c += CODE_ABC[h[i] % CODE_ABC.length];
    if (!used.has(c)) { used.add(c); return c; }
  }
}

// a round: cut it (slice), eat some (eat: how many, ask what's left or what was eaten), share among friends
const slice = (object, d, text) => ({ kind: "slice", object, d, ...(text ? { text } : {}) });
const share = (object, d, text) => ({ kind: "share", object, d, ...(text ? { text } : {}) });
const eat = (object, d, k, ask = "left", text) => ({ kind: "eat", object, d, eat: k, ask, ...(text ? { text } : {}) });
// "১ − ৩/৪ = ?": the whole thing is ১; eat k of its d parts; what's left
const oneMinus = (object, d, k, from) => ({ ...eat(object, d, k, "left", `১ − ${bn(`${k}/${d}`)} = ? পুরোটা হলো ১। ${bn(d)} ভাগের ${bn(k)} ভাগ খেয়ে ফেললে বাকি কত থাকে?`), from });

const GAMES = [
  {
    key: "m3-p091-sl-halves", qr: "M3-p91-b", page: 91, title: "রুটি ভাগ করি: সমান দুই ভাগ",
    from: "p.91 মূল প্রশ্ন (a roti for রেজা and মিনা: the fair cut and the unfair one) and কাজ ১ (a square and a circle into 2 equal pieces); p.92 অর্ধেক = দুই ভাগের এক ভাগ, 1/2, and অনুশীলন ৩ (two halves make one)",
    rounds: [
      share("roti", 2, "একটি রুটি আছে। রুটিটি কীভাবে ভাগ করলে রেজা ও মিনা দুজনেই সমান পরিমাণ পাবে?"),
      slice("chocolate", 2),
      slice("orange", 2),
      eat("watermelon", 2, 1, "left"),
      share("cake", 2, "রাফি আর তুলি একটি কেক সমান দুই ভাগ করে নেবে।"),
      slice("eggs", 2),
      eat("chocolate", 2, 1, "ate"),
      share("orange", 2),
      slice("roti", 2),
      eat("cake", 2, 1, "left"),
    ],
  },
  {
    key: "m3-p093-sl-quarters", qr: "M3-p93-b", page: 93, title: "কেটে দেখি: চার ভাগের এক ভাগ",
    from: "p.93 মূল প্রশ্ন and box (সমান ৪ অংশ, এক চতুর্থাংশ বা চার ভাগের এক ভাগ, 1/4), অনুশীলন ১ (four quarters make one); p.94 অনুশীলন ২ (“1/4 এর দুই টুকরা”, “তিন টুকরা”: 2/4, 3/4)",
    rounds: [
      slice("cake", 4),
      share("orange", 4, "একটি কমলা ৪ জন বন্ধু সমান ভাগ করে খাবে।"),
      slice("chocolate", 4),
      eat("roti", 4, 1, "left"),
      share("eggs", 4),
      slice("watermelon", 4),
      eat("cake", 4, 2, "ate"),
      share("roti", 4),
      eat("orange", 4, 3, "ate"),
      slice("eggs", 4),
    ],
  },
  {
    key: "m3-p095-sl-thirds", qr: "M3-p95-c", page: 95, title: "কেটে দেখি: তিন ভাগের এক ভাগ",
    from: "p.95 মূল প্রশ্ন (১ মিটার ফিতা সমান ৩ ভাগ: 1/3, এক তৃতীয়াংশ) and the 2/3 box (৩ টুকরার ২টি: দুই-তৃতীয়াংশ); a chocolate bar (3 rows) and a tray of eggs (2 × 6) are the things that cut into 3",
    rounds: [
      slice("chocolate", 3),
      share("eggs", 3, "এক ট্রে ডিম ৩ জন বন্ধু সমান ভাগ করে নেবে।"),
      eat("chocolate", 3, 1, "left"),
      slice("eggs", 3),
      share("chocolate", 3),
      eat("eggs", 3, 2, "ate"),
      eat("chocolate", 3, 2, "left"),
      share("eggs", 3),
      eat("eggs", 3, 1, "left"),
      slice("chocolate", 3),
    ],
  },
  {
    key: "m3-p096-sl-eighths", qr: "M3-p96-b", page: 96, title: "কেটে দেখি: আট ভাগ",
    from: "p.96 অনুশীলন ৪ (7/8 অংশ রং করি) and the box (লব ও হর: 7/8); p.101 অনুশীলন ৩ and p.104 নিজে করি ১ (৪): a cake in 8ths (5/8, 2/8, 1/4 = 2/8)",
    rounds: [
      slice("cake", 8),
      eat("cake", 8, 1, "left"),
      slice("orange", 8),
      eat("watermelon", 8, 3, "ate"),
      slice("roti", 8),
      eat("orange", 8, 5, "ate"),
      eat("roti", 8, 2, "left"),
      slice("watermelon", 8),
      eat("cake", 8, 7, "ate"),
      eat("orange", 8, 4, "left"),
    ],
  },
  {
    key: "m3-p102-sl-one-minus", qr: "M3-p102-b", page: 102, title: "খেয়ে ফেললে বাকি কত? (১ − ভগ্নাংশ)",
    from: "the book's ১ − n/d items that the things can show: p.102 কাজ ১ (১ − 3/4 = 1/4, printed), p.103 অনুশীলন ১ (১) ১ − 1/2 and (৮) ১ − 3/8, p.106 নিজে করি ৮ (১) ১ − 1/3 and (৮) ১ − 5/8; then mine with the chapter's other bottoms (4, 3, 6, 8, 4): 1/4, 2/3, 5/6, 1/8, 2/4. The book's ১ − 1/5, 4/9, 1/7, 7/9 stay with Fraction Play (p.103, p.106)",
    rounds: [
      oneMinus("roti", 4, 3, "p.102 কাজ ১"),
      oneMinus("watermelon", 2, 1, "p.103 অনুশীলন ১ (১)"),
      oneMinus("cake", 8, 3, "p.103 অনুশীলন ১ (৮)"),
      oneMinus("chocolate", 3, 1, "p.106 নিজে করি ৮ (১)"),
      oneMinus("orange", 8, 5, "p.106 নিজে করি ৮ (৮)"),
      oneMinus("roti", 4, 1, "mine"),
      oneMinus("eggs", 3, 2, "mine"),
      oneMinus("cake", 6, 5, "mine"),
      oneMinus("watermelon", 8, 1, "mine"),
      oneMinus("chocolate", 4, 2, "mine"),
    ],
  },
];

const activities = GAMES.map((g) => ({
  key: g.key, qr: g.qr, code: codeFor(g.key), type: "fraction_slice", title: g.title, chapter: CHAPTER, page: g.page,
  configuration: {},
  content: { rounds: g.rounds.map(({ from, ...r }) => r) },
  guide: { audio: null, pictures: [], notes: [] },
}));
const file = { format: "ebidyaloy-activity-import", version: 1, book: BOOK, activities };
fs.writeFileSync(OUT, JSON.stringify(file, null, 2) + "\n");
// the README's table rows
const rows = GAMES.map((g, i) => {
  const a = activities[i], kinds = { slice: 0, eat: 0, share: 0 };
  g.rounds.forEach((r) => { kinds[r.kind] += 1; });
  return `| ${g.page} | Slice It! | ${g.title} | \`${a.code}\` | ${g.qr} | ${g.rounds.length} rounds (${kinds.slice} cut, ${kinds.eat} eat, ${kinds.share} share) | ${g.from} |`;
});
fs.writeFileSync(path.join(__dirname, ".check/slice-rows.md"), rows.join("\n") + "\n");
console.log(`${path.basename(OUT)}: ${activities.length} activities, ${activities.reduce((s, a) => s + a.content.rounds.length, 0)} rounds`);
activities.forEach((a) => console.log(`  p.${a.page} ${a.qr} ${a.code} ${a.title} (${a.content.rounds.length})`));
