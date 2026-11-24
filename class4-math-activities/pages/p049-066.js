// Pages ৪৯–৬৬ (অধ্যায় ৪ · ভাগ), written by Claude (helper for pp. 49–66), 24 Nov 2026.
// The book: ../class4-math-redesign/content/p041-052.js (pages 49–52) and p053-066.js (+ .parts.js for the long divisions).
// p.49–50: sharing marbles (১৫ ÷ ৫; ১৭ ÷ ৫ leaves ২), নিঃশেষে বিভাজ্য; p.51–52: উপর-নিচে by a one-digit number (৬৫ ÷ ৫,
// ৯৮ ÷ ৮); p.53–55: three- and four-digit numbers (১২৯ ÷ ৩, ১৫৪ ÷ ৯, ১৭৫২ ÷ ৮); p.56: by tens (৮০ ÷ ২০, ৮০ ÷ ৩০);
// p.57–59: by a two-digit number with an estimated quotient (৮৫ ÷ ২১, ১৬৫ ÷ ৫৫, ৯৫ ÷ ৩৪), a ০ in the quotient (৯৪১ ÷ ২৩);
// p.60: ভাজ্য = ভাজক × ভাগফল + ভাগশেষ; p.61: গুণ ও ভাগ undo each other; p.62–63: × and ÷ in one sentence, stories;
// p.64: দেখি পারি কি না; p.65–66: নিজে করি.
"use strict";
module.exports = (L) => {
  const { it, wio, mcq, q, match, note, cant } = L;
  // long division (উপর-নিচে), our answer [ভাগফল, ভাগশেষ]; a story optional
  const ld = (a, b, want, text) => it({ kind: "longdiv", a, b, ...(text ? { text } : {}) }, want);
  // division with a remainder in a row ([ভাগফল, ভাগশেষ]) or a story, and the array □ = □ × □ + □ ([a, b, q, r])
  const rem = (a, b, want) => it({ kind: "divrem", a, b, ask: "row" }, want);
  const remStory = (a, b, text, qUnit, rUnit, want) => it({ kind: "divrem", a, b, ask: "row", text, qUnit, rUnit }, want);
  const arr = (a, b, want) => it({ kind: "divrem", a, b, ask: "array" }, want);
  const box = (text, want, story) => it({ kind: "missing", text, ...(story ? { story } : {}) }, want);
  const ex = (text, want) => it({ kind: "expr", text }, want);
  const truth = (text, want) => it({ kind: "truth", text }, want);
  const story = (text, sum, unit, want) => it({ kind: "word", text, sum, ...(unit ? { unit } : {}) }, want);
  const share = (total, groups, emoji, want) => it({ kind: "groups", total, groups, emoji }, want);
  const plates = (total, each, emoji, want) => it({ kind: "groups", ask: "plates", total, each, emoji }, want);

  // ───────────── p.49–50: sharing, a remainder, নিঃশেষে বিভাজ্য ─────────────

  // p.49: 15 marbles for 5 (the dots in 5 groups); p.50: 17 marbles for 5 (3 each, 2 left), 20 chocolates for the family;
  // p.60: 20 biscuits, 3 each (how many people?)
  wio({
    page: 49, slug: "share", type: "equal_groups", title: "সমানভাবে ভাগ করে দিই",
    items: [
      share(15, 5, "🔵", 3), // p.49 মূল প্রশ্ন (printed: ১৫ ÷ ৫ = ৩)
      share(17, 5, "🔵", [3, 2]), // p.50 কাজ ১ (printed: ৩টি করে, ২টি অবশিষ্ট)
      share(20, 3, "🍫", [6, 2]), share(20, 4, "🍫", 5), share(20, 5, "🍫", 4), share(20, 6, "🍫", [3, 2]), // p.50 অনুশীলন ১: a family of 3, 4, 5 or 6
      plates(20, 3, "🍪", [6, 2]), // p.60 মূল প্রশ্ন (printed: ৬ জন, ২টি অবশিষ্ট)
    ],
    fresh: { skill: "groups", count: 5 },
    src: "p.49 মূল প্রশ্ন (১৫টি মার্বেল, ৫ জন), p.50 কাজ ১ (১৭টি মার্বেল, ৫ জন) and অনুশীলন ১ (২০টি চকোলেট: the family's size is the child's, so 3, 4, 5 and 6 people, mine), p.60 মূল প্রশ্ন (২০টি বিস্কুট, ৩টি করে: how many people); then 5 fresh sharing rounds",
  });
  cant("p.50 অনুশীলন ১ (২০টি চকোলেট “তোমার পরিবারের সবার মধ্যে”): the family's size is the child's own; the games share 20 among 3, 4, 5 and 6 people.");

  // p.50: ভাগফল and ভাগশেষ (the story, the dot picture, the book's trial rows: 2, 3, 4 each to 5 children)
  wio({
    page: 50, slug: "remainder", title: "ভাগ করি: ভাগফল ও ভাগশেষ লিখি",
    items: [
      remStory(15, 5, "15টি মার্বেল 5 জনকে সমানভাবে ভাগ করে দিলে প্রত্যেকে কয়টি করে মার্বেল পাবে?", "টি", "টি", [3, 0]), // p.49
      remStory(17, 5, "17টি মার্বেল 5 জনকে সমানভাবে ভাগ করে দিলে প্রত্যেকে কয়টি করে মার্বেল পাবে?", "টি", "টি", [3, 2]), // p.50 কাজ ১
      box("17 = 2 × 5 + □", 7), // “যখন ২টি করে মার্বেল দেওয়া হয়, ২ × ৫ = ১০, ৭টি থাকে”
      box("17 = 3 × 5 + □", 2), // “যখন ৩টি করে …, ৩ × ৫ = ১৫, ২টি থাকে”
      box("4 × 5 − 17 = □", 3), // “যখন ৪টি করে …, ৪ × ৫ = ২০, ৩টি কম হয়”
      arr(17, 5, [17, 5, 3, 2]), // the picture: 3 rows of 5, 2 over
      rem(20, 3, [6, 2]), rem(20, 4, [5, 0]), rem(20, 5, [4, 0]), rem(20, 6, [3, 2]), // p.50 অনুশীলন ১ (a family of 3–6, mine)
    ],
    fresh: { skill: "divrem", count: 5 },
    src: "p.49 মূল প্রশ্ন (১৫ ÷ ৫, ভাগশেষ ০), p.50 কাজ ১ (১৭ ÷ ৫ as printed, its three trial rows as □ boxes, its picture as an array) and অনুশীলন ১ (২০ ÷ 3, 4, 5, 6: the family's size mine); then 5 fresh ভাগশেষ rounds",
  });

  // p.50's note: নিঃশেষে বিভাজ্য (no remainder) or not, for the chapter's divisions; p.64 ১ asks the same of ৮৪৯ ÷ ৬
  const DIV = "নিঃশেষে বিভাজ্য", NOT = "নিঃশেষে বিভাজ্য নয়";
  const divisible = (a, b, qt, r) => q({
    prompt: `${a} ÷ ${b} ভাগটি নিঃশেষে বিভাজ্য, নাকি নিঃশেষে বিভাজ্য নয়?`, options: [DIV, NOT], answer: r ? NOT : DIV,
    why: r ? `${a} ÷ ${b} = ${qt}, ভাগশেষ ${r}: ${r}টি অবশিষ্ট থাকে, তাই নিঃশেষে বিভাজ্য নয়।` : `${a} ÷ ${b} = ${qt}, ভাগশেষ 0: কোনো অবশিষ্ট নেই, তাই নিঃশেষে বিভাজ্য।`,
  });
  mcq({
    page: 50, slug: "divisible", title: "ভাগটি নিঃশেষে বিভাজ্য কি না বলি",
    questions: [
      divisible(15, 5, 3, 0), divisible(17, 5, 3, 2), divisible(65, 5, 13, 0), divisible(98, 8, 12, 2), divisible(72, 6, 12, 0),
      divisible(73, 9, 8, 1), divisible(129, 3, 43, 0), divisible(154, 9, 17, 1), divisible(1752, 8, 219, 0), divisible(849, 6, 141, 3),
    ],
    src: "p.50 (ভাগের ক্ষেত্রে কোনো অবশিষ্ট না থাকলে নিঃশেষে বিভাজ্য …) asked of the chapter's worked divisions: p.49 (১৫ ÷ ৫), p.50 (১৭ ÷ ৫), p.51 (৬৫ ÷ ৫, the girl: নিঃশেষে বিভাজ্য; কাজ ১ ৭২ ÷ ৬), p.52 কাজ ২–৩ (৯৮ ÷ ৮, ৭৩ ÷ ৯), p.53 (১২৯ ÷ ৩), p.54 কাজ ১ (১৫৪ ÷ ৯), p.55 (১৭৫২ ÷ ৮), p.64 দেখি পারি কি না ১ (৮৪৯ ÷ ৬); the two choices are the note's words",
  });

  // ───────────── p.51–52: উপর-নিচে by a one-digit number ─────────────

  wio({
    page: 51, slug: "long-division", title: "উপর-নিচে ভাগ করি",
    items: [
      ld(65, 5, [13, 0]), // p.51 মূল প্রশ্ন (printed: ভাগফল ১৩, ভাগশেষ ০)
      ld(72, 6, [12, 0]), // p.51 কাজ ১
      ld(78, 6, [13, 0]), ld(96, 8, [12, 0]), ld(72, 9, [8, 0]), ld(60, 5, [12, 0]), // p.52 অনুশীলন ১ (১)–(৪)
      ld(60, 3, [20, 0]), ld(84, 7, [12, 0]), ld(64, 4, [16, 0]), ld(58, 2, [29, 0]), // p.52 অনুশীলন ১ (৫)–(৮)
    ],
    src: "p.51 মূল প্রশ্ন (৬৫ ÷ ৫) and কাজ ১ (৭২ ÷ ৬), with p.52 অনুশীলন ১ (১)–(৮) (৭৮ ÷ ৬ … ৫৮ ÷ ২): the same skill, no remainder, so they sit with p.51's two (p.52 has its own game)",
  });

  wio({
    page: 52, slug: "long-division-remainder", title: "উপর-নিচে ভাগ করি, ভাগশেষ লিখি",
    items: [
      ld(98, 8, [12, 2]), // p.52 কাজ ২ (printed: ভাগফল ১২ ও ভাগশেষ ২)
      ld(73, 9, [8, 1]), // p.52 কাজ ৩
      ld(63, 5, [12, 3]), ld(81, 7, [11, 4]), ld(54, 4, [13, 2]), ld(92, 6, [15, 2]), // p.52 অনুশীলন ২ (১)–(৪)
      ld(95, 8, [11, 7]), ld(64, 9, [7, 1]), ld(22, 3, [7, 1]), ld(35, 2, [17, 1]), // p.52 অনুশীলন ২ (৫)–(৮)
    ],
    fresh: { skill: "divrem", count: 5 },
    src: "p.52 কাজ ২ (৯৮ ÷ ৮), কাজ ৩ (৭৩ ÷ ৯) and অনুশীলন ২ (১)–(৮) (৬৩ ÷ ৫ … ৩৫ ÷ ২); then 5 fresh ভাগশেষ rounds (a two-digit number by 2–9, in a row)",
  });
  note("p.51–52: the long-division fresh rounds always divide a number of 3–5 digits, so the two-digit pages take none; p.52 has fresh divrem rounds (a two-digit number by 2–9, ভাগফল and ভাগশেষ in a row), p.51 none (divrem always leaves a remainder; p.51 is about none).");

  // ───────────── p.53–55: three- and four-digit numbers by a one-digit number ─────────────

  wio({
    page: 53, slug: "three-digits", title: "তিন অঙ্কের সংখ্যাকে উপর-নিচে ভাগ করি",
    items: [
      ld(129, 3, [43, 0], "একটি বাক্সে 129টি কলম আছে। প্রত্যেককে 3টি করে কলম দেওয়া হলে কতজনের মধ্যে কলমগুলো সমানভাবে ভাগ করে দেওয়া যাবে?"), // p.53 (printed: ৪৩ জনের মধ্যে)
      ld(154, 9, [17, 1]), // p.54 কাজ ১ (printed: ভাগফল ১৭, ভাগশেষ ১)
      ld(386, 7, [55, 1]), ld(512, 8, [64, 0]), ld(286, 6, [47, 4]), // p.54 কাজ ২ (১)–(৩)
    ],
    fresh: { skill: "longdiv", count: 5, digits: 3, table: 3 },
    src: "p.53 মূল প্রশ্ন (১২৯টি কলম, ৩টি করে, the story as printed), p.54 কাজ ১ (১৫৪ ÷ ৯) and কাজ ২ (৩৮৬ ÷ ৭, ৫১২ ÷ ৮, ২৮৬ ÷ ৬: the first digit smaller than the divisor, as on p.53); then 5 fresh three-digit numbers ÷ ৩",
  });
  cant("p.54 কাজ ১ “ধাপগুলো ব্যাখ্যা করি” (the steps explained in words): the long-division rounds work every step instead.");

  wio({
    page: 54, slug: "divide", title: "তিন অঙ্কের সংখ্যা ভাগ করি",
    items: [
      ld(144, 4, [36, 0]), ld(285, 5, [57, 0]), ld(394, 7, [56, 2]), ld(662, 2, [331, 0]), ld(783, 9, [87, 0]),
      ld(438, 6, [73, 0]), ld(196, 3, [65, 1]), ld(871, 9, [96, 7]), ld(552, 8, [69, 0]), ld(931, 7, [133, 0]),
    ],
    fresh: { skill: "longdiv", count: 5, digits: 3, table: 7 },
    src: "p.54 অনুশীলন ১ (১)–(১০) (১৪৪ ÷ ৪ … ৯৩১ ÷ ৭); then 5 fresh three-digit numbers ÷ ৭",
  });

  wio({
    page: 55, slug: "four-digits", title: "চার অঙ্কের সংখ্যাকে উপর-নিচে ভাগ করি",
    items: [
      ld(1752, 8, [219, 0], "1752 মিটার ফিতাকে 8 জন শিক্ষার্থীর মধ্যে সমানভাবে ভাগ করে দিলে, প্রত্যেকে কত মিটার করে পাবে?"), // p.55 (printed: ২১৯ মিটার)
      ld(2148, 4, [537, 0]), ld(1326, 3, [442, 0]), ld(4956, 6, [826, 0]), ld(6149, 8, [768, 5]), // p.55 অনুশীলন ১ (১)–(৪)
      ld(1823, 5, [364, 3]), ld(7824, 6, [1304, 0]), ld(2961, 9, [329, 0]), ld(5747, 7, [821, 0]), // p.55 অনুশীলন ১ (৫)–(৮)
    ],
    fresh: { skill: "longdiv", count: 5, digits: 4, table: 8 },
    src: "p.55 মূল প্রশ্ন (১৭৫২ মিটার ফিতা, ৮ জন, the story as printed) and অনুশীলন ১ (১)–(৮) (২১৪৮ ÷ ৪ … ৫৭৪৭ ÷ ৭); then 5 fresh four-digit numbers ÷ ৮",
  });
  note("p.53–55 (one-digit divisors): the fresh long divisions have a fixed divisor (table: ৩ on p.53, ৭ on p.54, ৮ on p.55), since without one half of them would be by 11–49, which the chapter starts only on p.57. p.57–59 and p.64–66 take any divisor.");

  // ───────────── p.56: dividing by tens ─────────────

  const CHOC = "80টি চকোলেটকে 20টি করে ছোটো ছোটো প্যাকেটে রাখা হলো। ";
  wio({
    page: 56, slug: "by-tens", title: "দশকের সংখ্যা দিয়ে ভাগ করি",
    items: [
      ld(80, 20, [4, 0], CHOC + "তুমি তোমার বন্ধুদের 20টি করে চকোলেট দিতে চাও। তুমি তোমার কতজন বন্ধুকে চকোলেটগুলো দিতে পারবে?"), // ১) printed: ৪ জন
      ld(80, 30, [2, 20], CHOC + "তুমি তোমার বন্ধুদের 30টি করে চকোলেট দিলে, কতজন বন্ধুকে চকোলেটগুলো দিতে পারবে?"), // ২) printed: ২ জন, ২০টি অবশিষ্ট
      ld(90, 30, [3, 0]), ld(80, 40, [2, 0]), ld(120, 40, [3, 0]), ld(240, 60, [4, 0]), // অনুশীলন ১ (১)–(৪)
      ld(120, 30, [4, 0]), ld(210, 50, [4, 10]), ld(390, 60, [6, 30]), ld(500, 90, [5, 50]), // অনুশীলন ১ (৫)–(৮)
    ],
    src: "p.56 মূল প্রশ্ন ১) and ২) (the page's opening sentence and each question, as printed) and অনুশীলন ১ (১)–(৮) (৯০ ÷ ৩০ … ৫০০ ÷ ৯০); no fresh rounds (they can't make a divisor of whole tens)",
  });

  // the page's way: “১০ এর দল হিসেবে বিবেচনা করে পাই ৮÷২”: each division by tens and its small division (the same ভাগফল)
  match({
    page: 56, slug: "tens-groups", type: "equation_match", title: "দশের দল ধরে ভাগটিকে সহজ ভাগের সাথে মিলাই",
    pairs: [
      ["80 ÷ 20", "8 ÷ 2"], ["80 ÷ 30", "8 ÷ 3"], ["90 ÷ 30", "9 ÷ 3"], ["80 ÷ 40", "8 ÷ 4"], ["120 ÷ 40", "12 ÷ 4"],
      ["240 ÷ 60", "24 ÷ 6"], ["120 ÷ 30", "12 ÷ 3"], ["210 ÷ 50", "21 ÷ 5"], ["390 ÷ 60", "39 ÷ 6"], ["500 ÷ 90", "50 ÷ 9"],
    ],
    src: "p.56: the boy's “১০ এর দল হিসেবে বিবেচনা করে পাই ৮÷২” (৮০ ÷ ২০) and the girl's “১০ এর দলে বিবেচনা করি” (৮০ ÷ ৩০), applied to অনুশীলন ১ (১)–(৮)",
  });
  note("p.56 match: each division by tens is matched with its division in tens (৮০ ÷ ২০ with ৮ ÷ ২), the page's way of finding the ভাগফল; the ভাগশেষ stays in tens (৮০ ÷ ৩০ = ২ ভাগশেষ ২০), which the long-division game asks.");

  // ───────────── p.57–59: by a two-digit number ─────────────

  wio({
    page: 57, slug: "two-digit-divisor", title: "দুই অঙ্কের সংখ্যা দিয়ে উপর-নিচে ভাগ করি",
    items: [
      ld(85, 21, [4, 1], "তোমার কাছে 85টি চকোলেট আছে। তুমি তোমার বন্ধুদেরকে 21টি করে চকোলেট দিতে চাও। তুমি কতজন বন্ধুকে চকোলেটগুলো দিতে পারবে?"), // printed: ৪ জন, ১টি অবশিষ্ট
      ld(63, 21, [3, 0]), ld(66, 11, [6, 0]), ld(51, 24, [2, 3]), ld(72, 35, [2, 2]), // কাজ ১ (১)–(৪)
    ],
    fresh: { skill: "longdiv", count: 5, digits: 3 },
    src: "p.57 মূল প্রশ্ন (৮৫টি চকোলেট, ২১টি করে, the story as printed) and কাজ ১ (২১)৬৩, ১১)৬৬, ২৪)৫১, ৩৫)৭২); then 5 fresh long divisions (three digits, any divisor)",
  });
  cant("p.57 আঙুলের ব্যবহার (a thumb hiding the dividend's digits, ৪৫)৯৪…): a way of working, not an exercise; its ৯৪ ÷ ৪৫ has no full dividend printed.");

  wio({
    page: 58, slug: "estimate-divide", title: "অনুমান করে দুই অঙ্কের সংখ্যা দিয়ে ভাগ করি",
    items: [
      ld(165, 55, [3, 0], "একটি বক্সে 165টি পেনসিল আছে। যদি আমরা 55 জনকে সমান সংখ্যক পেনসিল বিতরণ করি, তাহলে প্রত্যেকে কয়টি করে পেনসিল পাবে?"), // printed: ৩টি করে
      ld(95, 34, [2, 27]), // কাজ ১ (the estimate ৩ is too big: ৩৪ × ৩ = ১০২; ২ is right)
      ld(129, 43, [3, 0]), ld(128, 32, [4, 0]), ld(415, 83, [5, 0]), ld(359, 51, [7, 2]), // অনুশীলন ১ (১)–(৪)
      ld(382, 62, [6, 10]), ld(314, 43, [7, 13]), ld(662, 94, [7, 4]), ld(239, 47, [5, 4]), // অনুশীলন ১ (৫)–(৮)
    ],
    fresh: { skill: "longdiv", count: 5, digits: 3 },
    src: "p.58 মূল প্রশ্ন (১৬৫টি পেনসিল, ৫৫ জন, the story as printed), কাজ ১ (৯৫ ÷ ৩৪) and অনুশীলন ১ (১)–(৮) (১২৯ ÷ ৪৩ … ২৩৯ ÷ ৪৭); then 5 fresh long divisions (three digits)",
  });

  // the page's estimate: both numbers made smaller (৮৫ → ৮০, ২১ → ২০ → ৮ ÷ ২); too big → the number before it
  const guess = (a, b, round, small, want, opts, after) => q({
    prompt: `${a} ÷ ${b}: ${round} ধরে অনুমান করি। ভাগফল কত হবে?`, options: opts.map(String), answer: String(want), num: want,
    why: `${round} → ${small} = ${want} প্রায়। ${after}`,
  });
  mcq({
    page: 58, slug: "estimate", title: "অনুমান করে ভাগফল বেছে নিই",
    questions: [
      guess(85, 21, "80 ÷ 20", "8 ÷ 2", 4, [2, 3, 4, 5], "21 × 4 = 84, ভাগশেষ 1।"), // p.57 (printed: অনুমিত ভাগফল ৮÷২=৪)
      guess(165, 55, "160 ÷ 50", "16 ÷ 5", 3, [2, 3, 4, 5], "55 × 3 = 165, ভাগশেষ 0।"), // p.58 (printed: প্রায় ৩)
      q({
        prompt: "95 ÷ 34: 90 ÷ 30 ধরে অনুমান করলে 3 পাই, কিন্তু 34 × 3 = 102, যা 95 এর চেয়ে বড়ো। ভাগফল কত হবে?", options: ["1", "2", "3", "4"], answer: "2", num: 2,
        why: "অনুমিত ভাগফল বড়ো হয়ে গেলে ঠিক এর আগের ছোটো সংখ্যাটি নিই: 34 × 2 = 68, 95 − 68 = 27, ভাগশেষ 27।",
      }), // p.58 কাজ ১
      guess(129, 43, "120 ÷ 40", "12 ÷ 4", 3, [2, 3, 4, 5], "43 × 3 = 129, ভাগশেষ 0।"),
      guess(128, 32, "120 ÷ 30", "12 ÷ 3", 4, [3, 4, 5, 6], "32 × 4 = 128, ভাগশেষ 0।"),
      guess(415, 83, "410 ÷ 80", "41 ÷ 8", 5, [4, 5, 6, 7], "83 × 5 = 415, ভাগশেষ 0।"),
      guess(359, 51, "350 ÷ 50", "35 ÷ 5", 7, [5, 6, 7, 8], "51 × 7 = 357, ভাগশেষ 2।"),
      guess(382, 62, "380 ÷ 60", "38 ÷ 6", 6, [5, 6, 7, 8], "62 × 6 = 372, ভাগশেষ 10।"),
      guess(314, 43, "310 ÷ 40", "31 ÷ 4", 7, [6, 7, 8, 9], "43 × 7 = 301, ভাগশেষ 13।"),
      guess(662, 94, "660 ÷ 90", "66 ÷ 9", 7, [6, 7, 8, 9], "94 × 7 = 658, ভাগশেষ 4।"),
      guess(239, 47, "230 ÷ 40", "23 ÷ 4", 5, [4, 5, 6, 7], "47 × 5 = 235, ভাগশেষ 4।"),
    ],
    src: "p.57 (৮৫ ÷ ২১: ৮০ ÷ ২০, ৮ ÷ ২ = ৪) and p.58 (অনুমান করি: ১৬৫ ÷ ৫৫, ১৬০ ÷ ৫০, ১৬ ÷ ৫, প্রায় ৩; কাজ ১ ৯৫ ÷ ৩৪ with the box “যদি অনুমিত ভাগফলটি বড়ো হয়ে যায়…”), then the same estimate for p.58 অনুশীলন ১ (১)–(৮); my options",
  });

  wio({
    page: 59, slug: "zero-in-quotient", title: "বড়ো সংখ্যা ভাগ করি, ভাগফলে শূন্যও বসাই",
    items: [
      ld(3266, 23, [142, 0], "23টি পুকুরে 3266টি পোনামাছ সমানভাবে ছাড়া হলো। প্রতিটি পুকুরে কতটি করে পোনামাছ ছাড়া হলো?"), // printed: ৩২৬৬ ÷ ২৩ = ১৪২
      ld(941, 23, [40, 21]), // কাজ ১ (২১ ÷ ২৩ সম্ভব নয়, তাই “০”)
      ld(711, 23, [30, 21]), ld(731, 18, [40, 11]), ld(763, 25, [30, 13]), ld(810, 27, [30, 0]), // অনুশীলন ১ (১)–(৪)
      ld(1576, 17, [92, 12]), ld(3038, 14, [217, 0]), ld(7824, 48, [163, 0]), ld(5876, 32, [183, 20]), // অনুশীলন ১ (৫)–(৮)
      ld(365, 12, [30, 5], "রিয়াদের বাগান থেকে 365টি লিচু পেড়ে 12 জন বন্ধুর মধ্যে সমানভাবে ভাগ করে দিলে প্রত্যেকে কয়টি করে পাবে এবং কয়টি অবশিষ্ট থাকবে?"), // কাজ ২ (the girl's story)
    ],
    fresh: { skill: "longdiv", count: 5, digits: 4 },
    src: "p.59 মূল প্রশ্ন (৩২৬৬টি পোনামাছ, ২৩টি পুকুর, as printed), কাজ ১ (৯৪১ ÷ ২৩), অনুশীলন ১ (১)–(৮) (৭১১ ÷ ২৩ … ৫৮৭৬ ÷ ৩২) and কাজ ২ (৩৬৫ ÷ ১২, the girl's story); then 5 fresh four-digit long divisions",
  });
  note("p.59 মূল প্রশ্ন: our redesigned page had ৮৬ and ৮৬ in the last step of ৩২৬৬ ÷ ২৩; the NCTB book prints ৪৬ and ৪৬, which is right (found by the games' helper). Fixed in ../class4-math-redesign/content/p053-066.js on 24 Nov; the book is rebuilt with the QRs.");
  note("p.59 কাজ ২: the girl's story prints «লিচু পেরে ১২জন বন্ধু মধ্যে» (as the NCTB book); the game reads «লিচু পেড়ে ১২ জন বন্ধুর মধ্যে».");
  cant("p.59 কাজ ২, p.63 কাজ ৬, p.66 নিজে করি ১২ “গল্প তৈরি করি” / “তোমার গল্পটি বলো” (the child's own story): the games play the book's own story (p.59, p.63) or the number sentence (p.66 ৯৭ × ৮ ÷ ৪).");

  // ───────────── p.60: ভাজ্য = ভাজক × ভাগফল + ভাগশেষ ─────────────

  wio({
    page: 60, slug: "dividend-relation", title: "ভাজ্য, ভাজক, ভাগফল ও ভাগশেষের সম্পর্ক দিয়ে যাচাই করি",
    items: [
      remStory(20, 3, "20টি বিস্কুট এমনভাবে ভাগ করে দেওয়া হয় যেন প্রত্যেকে 3টি করে বিস্কুট পায়। তাহলে কতজন লোক বিস্কুটগুলো পাবে?", "জন", "টি", [6, 2]), // printed: ৬ জন, ২টি অবশিষ্ট
      arr(20, 3, [20, 3, 6, 2]), // the girl: ২০ = ৩ × ৬ + ২
      box("□ = 3 × 6 + 2", 20),
      box("□ = 146 × 5 + 3", 733), // কাজ ১ (১) □ = ১৪৬ × □ + ৩: the ভাগফল (৫) mine
      box("387 = 190 × □ + 7", 2), box("387 = 190 × 2 + □", 7), // কাজ ১ (২) ৩৮৭ = ১৯০ × □ + □ (২ and ৭)
      truth("872 = 28 × 31 + 4", "true"), ld(872, 28, [31, 4]), // অনুশীলন ১ (১): right
      truth("5345 = 35 × 152 + 28", "false"), ld(5345, 35, [152, 25]), // (২): the ভাগশেষ is ২৫
      truth("996 = 9 × 11 + 6", "false"), ld(996, 9, [110, 6]), // (৩): the ভাগফল is ১১০
    ],
    src: "p.60 মূল প্রশ্ন (২০টি বিস্কুট, ৩টি করে: the story as printed, then the girl's ২০ = ৩ × ৬ + ২ as an array and a box), কাজ ১ (১)–(২) (one box per round), অনুশীলন ১ (১)–(৩) (each checked with ভাজ্য = ভাজক × ভাগফল + ভাগশেষ, then divided উপর-নিচে for the right ভাগফল and ভাগশেষ)",
  });
  note("p.60 কাজ ১ (১) «□ = ১৪৬ × □ + ৩» has two boxes and no single answer (any ভাগফল works); the game fixes the ভাগফল at ৫ (□ = ১৪৬ × ৫ + ৩, ৭৩৩). (২) «৩৮৭ = ১৯০ × □ + □» has one answer (২ and ৭, the ভাগশেষ smaller than ১৯০): two rounds, each with one box and the other number filled in.");
  note("p.60 অনুশীলন ১ and p.66 নিজে করি ৪ (সঠিক কি না যাচাই করি) are true/false sentences ভাজ্য = ভাজক × ভাগফল + ভাগশেষ (the girl's way on p.60: «ভাগের উত্তর যাচাই করার জন্য আমরা এই সম্পর্কটি ব্যবহার করতে পারি»), each followed by its long division: p.60 (১) ৮৭২ ÷ ২৮ = ৩১ ভাগশেষ ৪ is right; (২) ৫৩৪৫ ÷ ৩৫ is ১৫২ ভাগশেষ ২৫ (not ২৮); (৩) ৯৯৬ ÷ ৯ is ১১০ ভাগশেষ ৬ (not ১১). p.66: ৩৯০ ÷ ৭ = ৫৫ ভাগশেষ ৫, ৫৩৮ ÷ ১২ = ৪৪ ভাগশেষ ১০, ১৫১২ ÷ ২৪ = ৬৩ ভাগশেষ ০ (all three printed wrong, on purpose), ৮২১৭ ÷ ৩৪ = ২৪১ ভাগশেষ ২৩ (right).");

  // ───────────── p.61: × and ÷ undo each other ─────────────

  wio({
    page: 61, slug: "multiply-divide", title: "গুণ ও ভাগের সম্পর্ক দিয়ে খালিঘর পূরণ করি",
    items: [
      box("12 + 12 + 12 + 12 = □", 48), // the boy: ১২+১২+১২+১২=৪৮
      box("12 × 4 = □", 48), box("48 ÷ 4 = □", 12), // the two crosses: ১২ × ৪ = ৪৮, ৪৮ ÷ ৪ = ১২
      box("12 ÷ 4 = □", 3), // the girl: ১২−৪=৮, ৮−৪=৪, ৪−৪=০, অর্থাৎ ১২÷৪=৩
      box("□ × 4 = 48", 12), box("12 × □ = 48", 4), box("48 ÷ □ = 12", 4), box("□ ÷ 4 = 12", 48), // গুণ্য × গুণক = গুণফল ⇄ ভাজ্য ÷ ভাজক = ভাগফল
      box("43 × 3 = □", 129, "গুণ করে যাচাই করি: 129 ÷ 3 = 43 হলে 43 × 3 = কত?"), // p.53's answer
      box("219 × 8 = □", 1752, "গুণ করে যাচাই করি: 1752 ÷ 8 = 219 হলে 219 × 8 = কত?"), // p.55's
      box("142 × 23 = □", 3266, "গুণ করে যাচাই করি: 3266 ÷ 23 = 142 হলে 142 × 23 = কত?"), // p.59's
      box("□ ÷ 5 = 13", 65), // p.51: ৬৫ ÷ ৫ = ১৩
    ],
    src: "p.61: the boy's ১২+১২+১২+১২=৪৮ (১২×৪=৪৮), the girl's ১২÷৪=৩ (by taking away ৪), the two crosses (১২ × ৪ = ৪৮ ⇄ ৪৮ ÷ ৪ = ১২) and the names' cross (গুণ্য × গুণক = গুণফল ⇄ ভাজ্য ÷ ভাজক = ভাগফল) as boxes; then «গুণ এবং ভাগের উত্তর যাচাই করার জন্য আমরা এই সম্পর্ক ব্যবহার করতে পারি» on the chapter's answers (p.53 ১২৯ ÷ ৩, p.55 ১৭৫২ ÷ ৮, p.59 ৩২৬৬ ÷ ২৩, p.51 ৬৫ ÷ ৫); the three checking lines (story) are mine",
  });

  // ───────────── p.62–63: × and ÷ in one sentence, stories ─────────────

  wio({
    page: 62, slug: "mixed", title: "গুণ ও ভাগ একসাথে আছে এমন হিসাব করি",
    items: [
      story("তোমার কাছে 144টি কাগজের টুকরা আছে। তুমি সমান 12 ভাগ করে 3 ভাগ তোমার ভাইকে দিলে তোমার ভাই কয় টুকরা কাগজ পাবে?", "144 ÷ 12 × 3", "টুকরা", 36), // কাজ ১ (printed: ৩৬ টুকরা)
      story("প্রতিটি প্যাকেটে 30টি করে মার্বেল আছে। এরকম 15টি প্যাকেট কিনে 18 জনের মধ্যে সমান ভাগ করে দিলে, প্রত্যেকে কয়টি করে মার্বেল পাবে?", "30 × 15 ÷ 18", "টি", 25), // কাজ ২
      ex("212 × 5 ÷ 20", 53), ex("1596 ÷ 12 × 26", 3458), ex("638 ÷ 22 × 35", 1015), ex("374 × 13 ÷ 17", 286), // অনুশীলন ১ (১)–(৪)
    ],
    fresh: { skill: "expr", count: 5 },
    src: "p.62 কাজ ১ (১৪৪ টুকরা কাগজ: ১৪৪÷১২×৩, as the boy works it), কাজ ২ (৩০টি করে মার্বেল, ১৫টি প্যাকেট, ১৮ জন: = ▭ × ▭ ÷ ▭) and অনুশীলন ১ (১)–(৪) (২১২×৫÷২০= □ …); then 5 fresh mixed sums",
  });

  wio({
    page: 63, slug: "stories", title: "গুণ ও ভাগের গল্পের সমাধান করি",
    items: [
      story("25 কেজি চালের দাম 2275 টাকা হলে, 3 কেজি চালের দাম কত?", "2275 ÷ 25 × 3", "টাকা", 273), // কাজ ৩
      ld(2275, 25, [91, 0]), // কাজ ৩: ১ কেজি চালের দাম (২২৭৫ ÷ ২৫) টাকা
      story("কোনো সংখ্যাকে 34 দ্বারা ভাগ করলে ভাগফল 3 এবং ভাগশেষ 10 পাওয়া যায়। সংখ্যাটি কত?", "34 × 3 + 10", null, 112), // কাজ ৪ (ভাজ্য = ৩৪ × ৩ + ১০)
      story("এক ডজন কমলার মূল্য 312 টাকা হলে, 25টি কমলার মূল্য কত?", "312 ÷ 12 × 25", "টাকা", 650), // কাজ ৫
      ld(312, 12, [26, 0]), // কাজ ৫: ১টি কমলার মূল্য
      story("5625টি লিচু সমান 25 ভাগ করে 5 ভাগ সুমিকে দিলে, সুমি কয়টি লিচু পাবে?", "5625 ÷ 25 × 5", "টি", 1125), // কাজ ৬ (the book's «আমার গল্প»)
      ld(5625, 25, [225, 0]), // কাজ ৬: ৫৬২৫ ÷ ২৫
    ],
    fresh: { skill: "expr", count: 5 },
    src: "p.63 কাজ ৩ (২৫ কেজি চাল ২২৭৫ টাকা), কাজ ৪ (৩৪ দ্বারা ভাগ, ভাগফল ৩, ভাগশেষ ১০), কাজ ৫ (এক ডজন কমলা ৩১২ টাকা) and কাজ ৬ (৫৬২৫ ÷ ২৫ × ৫ = ▭, with the book's own story «৫৬২৫টি লিচু…»), each story as printed, and the ÷ step of কাজ ৩, ৫, ৬ worked উপর-নিচে; then 5 fresh mixed sums",
  });

  // ───────────── p.64: দেখি পারি কি না ─────────────

  wio({
    page: 64, slug: "review", title: "দেখি পারি কি না: ভাগ করি ও যাচাই করি",
    items: [
      ld(849, 6, [141, 3]), // ১ (নিঃশেষে বিভাজ্য নয়: ভাগশেষ ৩)
      box("□ = 6 × 141 + 3", 849), // ১, checked: ভাজ্য = ভাজক × ভাগফল + ভাগশেষ
      story("তোমার কাছে কিছু রঙিন কাগজ আছে। তুমি তোমার 20 জন বন্ধুকে কাগজগুলো সমানভাবে ভাগ করে দিলে প্রত্যেকে 4টি করে কাগজ পেল এবং 10টি কাগজ অবশিষ্ট রইল। তোমার কাছে কতগুলো কাগজ ছিল?", "20 × 4 + 10", "টি", 90), // ২
      ld(1965, 15, [131, 0]), ld(801, 5, [160, 1]), // ৩ (the two divisions with boxes)
    ],
    fresh: { skill: "longdiv", count: 5, digits: 4 },
    src: "p.64 দেখি পারি কি না ১ (৮৪৯ ÷ ৬, then checked with ভাজ্য = ভাজক × ভাগফল + ভাগশেষ; whether it is নিঃশেষে বিভাজ্য is asked in p.50's quiz), ২ (২০ জন বন্ধু, ৪টি করে, ১০টি অবশিষ্ট: = ▭ × ▭ + ▭, the story as printed), ৩ (১৫)১৯৬৫ and ৫)৮০১, the book's boxes worked as whole long divisions); then 5 fresh four-digit long divisions",
  });
  cant("p.64 দেখি পারি কি না ১ “ব্যাখ্যা করি” (explain whether ৮৪৯ ÷ ৬ is নিঃশেষে বিভাজ্য): the division is worked here and the question asked in p.50's quiz (নিঃশেষে বিভাজ্য নয়, ভাগশেষ ৩).");

  // ───────────── p.65: নিজে করি ১–২ ─────────────

  mcq({
    page: 65, slug: "tick", title: "সঠিক উত্তরের পাশে টিক চিহ্ন দিই",
    questions: [
      q({ prompt: "পাঁচ অঙ্কের ক্ষুদ্রতম সংখ্যাকে 100 দ্বারা ভাগ করলে ভাগফল কত হবে?", options: ["1", "10", "100", "1000"], book: "গ", num: 100, why: "পাঁচ অঙ্কের ক্ষুদ্রতম সংখ্যা 10000; 10000 ÷ 100 = 100।" }),
      q({ prompt: "6573 ÷ 100 = কত? এই ভাগটিতে ভাগশেষ কত হবে?", options: ["73", "65", "57", "3"], book: "ক", num: 73, why: "100 × 65 = 6500, 6573 − 6500 = 73: ভাগফল 65, ভাগশেষ 73।" }),
      q({ prompt: "একটি গাণিতিক সমস্যায় ভাজ্য ও ভাজক সমান হলে ভাগফল কত হবে?", options: ["0", "1", "2", "3"], book: "খ", num: 1, why: "কোনো সংখ্যাকে সেই সংখ্যা দিয়েই ভাগ করলে ভাগফল 1, যেমন 25 ÷ 25 = 1।" }),
      q({ prompt: "625 ÷ □ = 25, খালিঘরে কোন সংখ্যাটি বসবে?", options: ["650", "625", "600", "25"], book: "ঘ", num: 25, why: "25 × 25 = 625, তাই 625 ÷ 25 = 25।" }),
      q({ prompt: "নিঃশেষে বিভাজ্যের ক্ষেত্রে ভাগশেষ কত হয়?", options: ["ভাজকের সমান", "ভাজ্যের সমান", "ভাগফলের সমান", "শূন্য"], book: "ঘ", why: "ভাগের ক্ষেত্রে কোনো অবশিষ্ট না থাকলে নিঃশেষে বিভাজ্য: ভাগশেষ শূন্য (0)।" }),
      q({ prompt: "ভাগফল 5 এবং ভাজক ভাগফলের 5 গুণ হলে ভাজ্য কত?", options: ["5", "10", "25", "125"], book: "ঘ", num: 125, why: "ভাজক = 5 × 5 = 25; ভাজ্য = ভাজক × ভাগফল = 25 × 5 = 125।" }),
      q({ prompt: "340কে কোন সংখ্যা দিয়ে ভাগ করলে ভাগফল 17 হবে?", options: ["2", "17", "20", "34"], book: "গ", num: 20, why: "17 × 20 = 340, তাই 340 ÷ 20 = 17।" }),
      q({
        prompt: "ভাগশেষ না থাকলে ভাজ্য নির্ণয়ের সূত্র কী?", options: ["ভাজ্য = ভাজক × ভাগফল", "ভাজ্য = ভাজক + ভাগফল", "ভাজ্য = ভাগফল ÷ ভাজক", "ভাজ্য = ভাজক − ভাগফল"],
        answer: "ভাজ্য = ভাজক × ভাগফল", why: "ভাজ্য = ভাজক × ভাগফল + ভাগশেষ (পৃষ্ঠা 60); ভাগশেষ 0 হলে ভাজ্য = ভাজক × ভাগফল।",
      }), // নিজে করি ২ (১), my options
      q({ prompt: "20 ÷ 3 = 6, ভাগশেষ 2। এখানে 3কে আমরা কী বলি?", options: ["ভাজ্য", "ভাজক", "ভাগফল", "ভাগশেষ"], answer: "ভাজক", why: "এখানে, 20 ভাজ্য, 3 ভাজক, 6 ভাগফল এবং 2 ভাগশেষ (পৃষ্ঠা 60)।" }),
      q({ prompt: "গুণ এবং ভাগ কেমন প্রক্রিয়া?", options: ["বিপরীত প্রক্রিয়া", "একই প্রক্রিয়া"], answer: "বিপরীত প্রক্রিয়া", why: "গুণ এবং ভাগ বিপরীত প্রক্রিয়া: 12 × 4 = 48, আবার 48 ÷ 4 = 12 (পৃষ্ঠা 61)।" }),
      q({ prompt: "ভাগ হচ্ছে একই সংখ্যা বারবার কী করা?", options: ["যোগ করা", "বিয়োগ করা", "গুণ করা"], answer: "বিয়োগ করা", why: "12 − 4 = 8, 8 − 4 = 4, 4 − 4 = 0: 4 তিনবার বিয়োগ করা যায়, তাই 12 ÷ 4 = 3 (পৃষ্ঠা 61)।" }),
    ],
    src: "p.65 নিজে করি ১ (১)–(৭) (the book's options and letters), ২ (১) (my options); added: p.60 (২০, ৩, ৬, ২কে কী বলি: ৩ ভাজক) and p.61 (গুণ এবং ভাগ বিপরীত প্রক্রিয়া; ভাগ = একই সংখ্যা বারবার বিয়োগ), my options",
  });

  wio({
    page: 65, slug: "answer", title: "হিসাব করে প্রশ্নের উত্তর লিখি",
    items: [
      box("10000 ÷ 100 = □", 100, "পাঁচ অঙ্কের ক্ষুদ্রতম সংখ্যাকে 100 দ্বারা ভাগ করলে ভাগফল কত হবে?"), // ১ (১)
      box("6573 = 100 × 65 + □", 73, "6573 ÷ 100 = কত? এই ভাগটিতে ভাগশেষ কত হবে?"), // ১ (২)
      box("25 ÷ 25 = □", 1, "একটি গাণিতিক সমস্যায় ভাজ্য ও ভাজক সমান হলে ভাগফল কত হবে?"), // ১ (৩): ২৫ mine
      box("625 ÷ □ = 25", 25), // ১ (৪)
      story("ভাগফল 5 এবং ভাজক ভাগফলের 5 গুণ হলে ভাজ্য কত?", "5 × 5 × 5", null, 125), // ১ (৬)
      box("340 ÷ □ = 17", 20, "340কে কোন সংখ্যা দিয়ে ভাগ করলে ভাগফল 17 হবে?"), // ১ (৭)
      box("240 ÷ □ = 12", 20, "240 কে কোন সংখ্যা দিয়ে ভাগ করলে ভাগফল 12 হবে?"), // ২ (২)
      story("500 টাকার একটি নোট দিয়ে 25 টাকা মূল্যের কয়টি রং পেনসিল কেনা যাবে?", "500 ÷ 25", "টি", 20), // ২ (৩)
      story("একটি বাক্সে 20টি পুশপিন থাকলে 400টি পুশপিনের জন্য কতটি বাক্স লাগবে?", "400 ÷ 20", "টি", 20), // ২ (৪)
      story("1 হালি ডিমের দাম 40 টাকা হলে 9টি ডিমের দাম কত?", "40 ÷ 4 × 9", "টাকা", 90), // ২ (৫)
    ],
    src: "p.65 নিজে করি ১ (১)–(৪), (৬), (৭) typed instead of ticked ((২) as ৬৫৭৩ = ১০০ × ৬৫ + □; (৩) with ২৫ ÷ ২৫, my number) and ২ (২)–(৫) (each question as printed; ২ (৫) ১ হালি = ৪টি: ৪০ ÷ ৪ × ৯)",
  });

  // ───────────── p.66: নিজে করি ৩–১২ ─────────────

  wio({
    page: 66, slug: "divide", title: "নিজে করি: উপর-নিচে ভাগ করি",
    items: [
      ld(60, 30, [2, 0]), ld(90, 40, [2, 10]), ld(310, 40, [7, 30]), ld(99, 28, [3, 15]), ld(168, 42, [4, 0]), // ৩ (১)–(৫)
      ld(455, 73, [6, 17]), ld(224, 28, [8, 0]), ld(3030, 14, [216, 6]), ld(1674, 18, [93, 0]), ld(9316, 32, [291, 4]), // ৩ (৬)–(১০)
    ],
    fresh: { skill: "longdiv", count: 5, digits: 4 },
    src: "p.66 নিজে করি ৩ (১)–(১০) (৬০ ÷ ৩০ … ৯৩১৬ ÷ ৩২); then 5 fresh four-digit long divisions",
  });

  wio({
    page: 66, slug: "check", title: "সঠিক কি না যাচাই করি",
    items: [
      truth("390 = 7 × 50 + 5", "false"), ld(390, 7, [55, 5]), // ৪ (১)
      truth("538 = 12 × 53 + 2", "false"), ld(538, 12, [44, 10]), // ৪ (২)
      truth("1512 = 24 × 60 + 3", "false"), ld(1512, 24, [63, 0]), // ৪ (৩)
      truth("8217 = 34 × 241 + 23", "true"), ld(8217, 34, [241, 23]), // ৪ (৪)
      box("□ = 23 × 107 + 12", 2473, "ভাজক 23, ভাগফল 107 এবং ভাগশেষ 12 হলে ভাজ্য কত?"), // ৬
    ],
    fresh: { skill: "longdiv", count: 5, digits: 3 },
    src: "p.66 নিজে করি ৪ (১)–(৪) (each statement checked with ভাজ্য = ভাজক × ভাগফল + ভাগশেষ, then divided উপর-নিচে) and ৬ (ভাজক ২৩, ভাগফল ১০৭, ভাগশেষ ১২: the question as printed); then 5 fresh three-digit long divisions",
  });

  wio({
    page: 66, slug: "stories", title: "হিসাব করি ও ভাগের গল্পের সমাধান করি",
    items: [
      ex("78 × 9 ÷ 13", 54), ex("1155 ÷ 15 × 9", 693), ex("282 × 6 ÷ 18", 94), ex("658 ÷ 47 × 34", 476), // ৫ (১)–(৪)
      ld(2304, 96, [24, 0], "2304 মিটার লম্বা একটি তারকে 96টি সমান ভাগে ভাগ করা হলে, প্রতি ভাগের দৈর্ঘ্য কত মিটার?"), // ৭
      ld(500, 12, [41, 8], "500টি পেনসিল থেকে প্রতি বক্সে 12টি করে পেনসিল রাখলে কতটি বক্সের প্রয়োজন পড়বে এবং কতটি পেনসিল অবশিষ্ট থাকবে?"), // ৮
      ld(182, 36, [5, 2], "36 জন লোকের মধ্যে 182টি লিচু বিতরণ করলে প্রত্যেকে কতটি করে পাবে?"), // ৯
      story("15টি খাতার দাম 975 টাকা হলে, 30টি খাতার দাম কত?", "975 ÷ 15 × 30", "টাকা", 1950), // ১০
      ld(1175, 25, [47, 0], "একটি দোকানে 1175টি ফুল আছে। একটি মালা তৈরি করতে 25টি ফুল লাগলে দোকানদার এরূপ কয়টি মালা তৈরি করতে পারবে?"), // ১১
      ex("97 × 8 ÷ 4", 194), // ১২ (the number sentence; the story is the child's)
    ],
    src: "p.66 নিজে করি ৫ (১)–(৪) (৭৮ × ৯ ÷ ১৩ = □ …), ৭ (২৩০৪ মিটার তার, ৯৬ ভাগ), ৮ (৫০০টি পেনসিল, ১২টি করে: বক্স and অবশিষ্ট), ৯ (১৮২টি লিচু, ৩৬ জন), ১০ (১৫টি খাতা ৯৭৫ টাকা), ১১ (১১৭৫টি ফুল, ২৫টি করে মালা), each story as printed (the ÷-by-a-two-digit-number stories worked উপর-নিচে), and ১২ (৯৭ × ৮ ÷ ৪ = □)",
  });
  note("p.66 নিজে করি ৮ (৫০০টি পেনসিল, ১২টি করে): the game's answer is ৪১টি বক্স and ৮টি পেনসিল অবশিষ্ট (ভাগফল and ভাগশেষ), as the question asks both; a 42nd box would hold the 8 left over. ৯ (১৮২টি লিচু, ৩৬ জন): ৫টি করে, ২টি অবশিষ্ট.");
};
