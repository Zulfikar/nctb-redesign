// Pages ৯৭–১১০ (অধ্যায় ৭ · সাধারণ ভগ্নাংশ), written by Claude (helper for pp. 97–120), 24 Nov 2026.
// The book: ../class4-math-redesign/content/p097-110.js (+ .parts.js for the flowers, grids, strips and number lines).
// p.97: ভগ্নাংশ (Class 3 again: লব and হর, colour the flowers, name the grids); p.98: fractions past ১ on strips, the table of
// ১ এর চেয়ে ছোটো / সমান / বড়ো, প্রকৃত and অপ্রকৃত; p.99: মিশ্র ভগ্নাংশ (৭/৪ = ১ ৩/৪, ২ ১/৪ = (২×৪+১)/৪, the line to ৩ ২/৫);
// p.100–101: সমতুল ভগ্নাংশ (strips, nine lines, × and ÷ the লব and হর); p.102: লঘিষ্ঠ আকার; p.103: তুলনা; p.104–107: যোগ ও
// বিয়োগ with the same bottom (two and three fractions, stories, রাফির and তুলির কৌশল); p.108: দেখি পারি কি না; p.109–110: নিজে করি.
// Fraction Play's rounds take bottoms up to ১২ and two fractions at a time; what they can't hold is in a quiz (see cant()).
"use strict";
module.exports = (L) => {
  const { it, wio, mcq, q, match, sort, note, cant } = L;
  const FP = "fraction_play";
  // the rounds, each with our answer
  const shade = (n, d, shape) => it({ kind: "fshade", n, d, shape }, n);
  const nameIt = (n, d, shape, unit) => it({ kind: "fname", n, d, shape, ...(unit ? { unit } : {}) }, [n, d]);
  const onLine = (n, d) => it({ kind: "fline", n, d, ask: "read" }, [n, d]);
  // n/d = □/d2 (the top typed, or shaded on a whole cut into d2)
  const same = (n, d, d2, ask = "type") => it({ kind: "fsame", n, d, d2, ask, shape: "bar" }, (n * d2) / d);
  const cmpF = (a, b, want) => it({ kind: "fcompare", a, b, shape: "bar" }, want);
  const equiv = (a, b, want) => it({ kind: "fequiv", a, b }, want);
  // "5/8 + 1/8", "1 − 1/5": the same bottom, the answer never reduced (as the server keeps it)
  const add = (expr, text, unit) => {
    const m = /^(1|\d+\/\d+)\s*([+−])\s*(\d+)\/(\d+)$/.exec(expr);
    if (!m) throw new Error(`add ${expr}`);
    const [an, ad] = m[1] === "1" ? [Number(m[4]), Number(m[4])] : m[1].split("/").map(Number);
    const bn = Number(m[3]), d = Number(m[4]);
    if (ad !== d) throw new Error(`add ${expr}: two bottoms`);
    return it({ kind: "fadd", a: m[1], op: m[2], b: `${bn}/${d}`, ...(text ? { text, unit } : {}) }, [m[2] === "+" ? an + bn : an - bn, d]);
  };
  // mixed numbers: "7/4" → [1, 3] (tomixed); "1 1/4" → 5 (toimproper, the top over the same bottom); "1 1/5" → 6 (place)
  const toMixed = (f, look) => { const [n, d] = f.split("/").map(Number); return it({ kind: "fmixed", a: f, ask: "tomixed", look }, [Math.floor(n / d), n % d]); };
  const mixedTop = (m) => { const [w, f] = m.split(" "); const [r, d] = f.split("/").map(Number); return Number(w) * d + r; };
  const toImproper = (m, look) => it({ kind: "fmixed", a: m, ask: "toimproper", look }, mixedTop(m));
  const placeMixed = (m) => it({ kind: "fmixed", a: m, ask: "place", look: "line" }, mixedTop(m));
  const ring = (want, fracs) => it({ kind: "fsort", want, fracs }, fracs.filter((f) => { const [n, d] = f.split("/").map(Number); return want === "proper" ? n < d : n >= d; }));
  const TWO_STEPS = "তিনটি ভগ্নাংশের হিসাব দুই ধাপে: আগে প্রথম দুইটি ভগ্নাংশের হিসাব করি, তারপর সেই ফলাফলের সাথে শেষের ভগ্নাংশটির হিসাব করি।";

  // ───────────── p.97: ভগ্নাংশ (what we learnt in Class 3) ─────────────

  wio({
    page: 97, slug: "shade-name", type: FP, title: "ছবির নির্দিষ্ট অংশ রং করি ও রং করা অংশ ভগ্নাংশে লিখি",
    items: [
      shade(4, 8, "circle"), // কাজ ১: the first flower (৮টি পাপড়ি, ৪টি লাল: the book's example)
      shade(2, 6, "circle"), shade(3, 4, "circle"), shade(1, 8, "circle"), shade(5, 8, "circle"), shade(1, 2, "circle"), // কাজ ১: the hexagon, clover, two flowers, ring
      nameIt(4, 6, "square"), nameIt(9, 12, "square"), // কাজ ২: the purple grid (৬টি ঘরের ৪টি), the green one (১২টির ৯টি)
    ],
    fresh: { skill: "fraction", count: 5, den: 8 },
    src: "p.97 কাজ ১ (the six flowers: ৪/৮, ২/৬, ৩/৪, ১/৮, ৫/৮, ১/২, each drawn as a circle of its parts) and কাজ ২ (the purple ২ × ৩ grid ৪/৬, the green ৪ × ৩ grid ৯/১২; the yellow ৫ × ৫ grid, ১০/২৫, has more than ১২ parts and is in the quiz); then 5 fresh rounds of Class 3's mix (the page asks what we learnt in Class 3)",
  });

  const parts = (f) => { const [n, d] = f.split("/"); return q({ prompt: `${f} ভগ্নাংশে লব কোনটি এবং হর কোনটি?`, options: [`লব ${n}, হর ${d}`, `লব ${d}, হর ${n}`], answer: `লব ${n}, হর ${d}`, why: `দাগের উপরের সংখ্যা ${n} লব, নিচের সংখ্যা ${d} হর।` }); };
  mcq({
    page: 97, slug: "parts", title: "ভগ্নাংশের লব ও হর চিনি, রং করা অংশ বেছে নিই",
    questions: [
      q({ prompt: "2/5 ভগ্নাংশে 2 কে কী বলে?", options: ["লব", "হর"], answer: "লব", why: "দাগের উপরের সংখ্যাকে লব বলে: 2/5 এ লব 2, হর 5।" }),
      q({ prompt: "2/5 ভগ্নাংশে 5 কে কী বলে?", options: ["লব", "হর"], answer: "হর", why: "দাগের নিচের সংখ্যাকে হর বলে: 2/5 এ লব 2, হর 5।" }),
      q({ prompt: "কোনো বস্তুকে একাধিক সমানভাগে ভাগ করে আমরা কীভাবে প্রকাশ করি?", options: ["ভগ্নাংশে", "যোগ করে", "গুণ করে"], answer: "ভগ্নাংশে", why: "আমরা ভগ্নাংশে প্রকাশ করতে পারি।" }),
      q({ prompt: "5 সারি ও 5 কলামের ছকের 25টি সমান ঘরের 10টি হলুদ রং করা। রং করা অংশ কোন ভগ্নাংশ?", options: ["10/25", "10/15", "15/25", "25/10"], answer: "10/25", why: "মোট 25টি সমান ঘর (হর), রং করা 10টি (লব): 10/25।" }),
      q({ prompt: "2 সারি ও 3 কলামের ছকের 6টি সমান ঘরের 4টি রং করা। রং করা অংশ কোন ভগ্নাংশ?", options: ["4/6", "2/6", "6/4", "4/2"], answer: "4/6", why: "মোট 6টি সমান ঘর (হর), রং করা 4টি (লব): 4/6।" }),
      q({ prompt: "4 সারি ও 3 কলামের ছকের 12টি সমান ঘরের 9টি রং করা। রং করা অংশ কোন ভগ্নাংশ?", options: ["9/12", "3/12", "12/9", "9/3"], answer: "9/12", why: "মোট 12টি সমান ঘর (হর), রং করা 9টি (লব): 9/12।" }),
      parts("4/8"), parts("2/6"), parts("3/4"), parts("5/8"),
    ],
    src: "p.97 মূল প্রশ্ন (the girl: ভগ্নাংশের বিভিন্ন অংশের নাম, ২/৫ with its two boxes), the boy (আমরা ভগ্নাংশে প্রকাশ করতে পারি), কাজ ২ (the three grids: ৪/৬, ১০/২৫, ৯/১২; the rows and columns counted on the page) and the লব and হর of কাজ ১'s ৪/৮, ২/৬, ৩/৪, ৫/৮; my options",
  });

  // ───────────── p.98: fractions past ১; প্রকৃত and অপ্রকৃত ─────────────

  wio({
    page: 98, slug: "strips", type: FP, title: "রং করা অংশের ভগ্নাংশ লিখি ও ফিতার অংশ রং করি",
    items: [
      toImproper("1 1/4", "bar"), // কাজ ৩: 0 to 2 in quarters, 5 coloured (the book's label ৫/৮ is a slip: ৫/৪)
      toImproper("1 2/5", "bar"), toImproper("1 2/6", "bar"), toImproper("1 1/8", "bar"), // কাজ ৩: 7 fifths, 8 sixths, 9 eighths
      shade(3, 5, "bar"), shade(5, 5, "bar"), // কাজ ৪ (১), (২): ৩/৫ মি, ৫/৫ মি (৭/৫ মি is কাজ ৩'s second strip)
    ],
    fresh: { skill: "fmixed", count: 5, den: 8 },
    src: "p.98 কাজ ৩ (the four strips from ০ to ২: ৫ quarters, ৭ fifths, ৮ sixths, ৯ eighths; each shown as its wholes and part, the child writes the top over the same bottom) and কাজ ৪ (১)–(২) (৩/৫ and ৫/৫ মিটার shaded); then 5 fresh mixed-number rounds",
    notes: ["কাজ ৩: ফিতার যতগুলো ছোটো ঘর রং করা, ততগুলো লব; প্রতি ১ এর ঘরের সংখ্যা হর (৫টি ১/৪ = ৫/৪)।"],
  });
  note("p.98 কাজ ৩: the first strip (০ to ২ in quarters, ৫ coloured) is labelled ৫/৮ in the book; ৫ quarters are ৫/৪, and the game asks ১ ১/৪ = □/৪ (৫). The fsort round of p.98 counts it as অপ্রকৃত (by the book's label it would be প্রকৃত).");
  note("p.98 কাজ ৩: Fraction Play draws a fraction past ১ as wholes and a part (fmixed), so its round shows ১ ১/৪ beside the bars and asks □/৪; the book reaches মিশ্র ভগ্নাংশ on p.99.");
  cant("p.98 কাজ ৪ (৩) ৭/৫ মিটার রং করি: Fraction Play shades at most one whole (n ≤ d); ৭/৫ is কাজ ৩'s second strip (১ ২/৫ = □/৫) and p.99's bars.");

  wio({
    page: 98, slug: "proper-improper", type: FP, title: "প্রকৃত ও অপ্রকৃত ভগ্নাংশগুলোতে গোল দাগ দিই",
    items: [
      ring("proper", ["3/5", "5/5", "7/5"]), // the table's head row
      ring("improper", ["3/4", "4/4", "5/4", "1/2", "2/2", "3/2"]),
      ring("proper", ["2/3", "3/3", "4/3", "6/7", "7/7", "9/7"]),
      ring("improper", ["3/5", "5/5", "7/5", "1/2", "2/2", "3/2", "6/7", "7/7", "9/7", "3/4", "4/4", "5/4"]),
      ring("improper", ["5/4", "7/5", "8/6", "9/8", "3/5", "5/5"]), // কাজ ৩ and ৪'s fractions
      ring("proper", ["5/3", "4/3", "4/4", "3/5"]), // p.109 নিজে করি ১ (১)'s four
    ],
    fresh: { skill: "fsort", count: 5, den: 9 },
    src: "p.98 the table (১ এর চেয়ে ছোটো: ৩/৫, ৩/৪, ১/২, ২/৩, ৬/৭; সমান: ৫/৫, ৪/৪, ২/২, ৩/৩, ৭/৭; বড়ো: ৭/৫, ৫/৪, ৩/২, ৪/৩, ৯/৭; প্রকৃত / অপ্রকৃত) in groups, কাজ ৩–৪'s fractions (৫/৪, ৭/৫, ৮/৬, ৯/৮, ৩/৫, ৫/৫) and p.109 নিজে করি ১ (১)'s ৫/৩, ৪/৩, ৪/৪, ৩/৫; then 5 fresh rounds",
  });

  const SMALL = 0, EQUAL = 1, BIG = 2;
  sort({
    page: 98, slug: "than-one", title: "লব ও হর তুলনা করে ভগ্নাংশগুলোকে তিনটি দলে ভাগ করি",
    categories: ["1 এর চেয়ে ছোটো (লব < হর)", "1 এর সমান (লব = হর)", "1 এর চেয়ে বড়ো (লব > হর)"],
    items: [
      ["3/5", SMALL], ["5/5", EQUAL], ["7/5", BIG], ["3/4", SMALL], ["4/4", EQUAL], ["5/4", BIG], ["1/2", SMALL], ["2/2", EQUAL],
      ["3/2", BIG], ["2/3", SMALL], ["3/3", EQUAL], ["4/3", BIG], ["6/7", SMALL], ["7/7", EQUAL], ["9/7", BIG],
    ],
    src: "p.98 the table: its three columns as printed (১ এর চেয়ে ছোটো ভগ্নাংশ (লব < হর), ১ এর সমান ভগ্নাংশ (লব = হর), ১ এর চেয়ে বড়ো ভগ্নাংশ (লব > হর)) and their fifteen fractions",
  });

  // ───────────── p.99: মিশ্র ভগ্নাংশ ─────────────

  wio({
    page: 99, slug: "mixed", type: FP, title: "অপ্রকৃত ভগ্নাংশকে মিশ্র ভগ্নাংশে এবং মিশ্র ভগ্নাংশকে অপ্রকৃত ভগ্নাংশে লিখি",
    items: [
      toMixed("7/4", "pie"), // মূল প্রশ্ন: two rotis in quarters, 7 quarters (৭/৪ = ১ ৩/৪)
      toImproper("2 1/4", "pie"), // the parrot: ২ ১/৪ = ((২×৪)+১)/৪
      toMixed("5/4", "bar"), toMixed("7/5", "bar"), toMixed("8/6", "bar"), toMixed("9/8", "bar"), // p.98 কাজ ৩'s strips as মিশ্র ভগ্নাংশ
    ],
    fresh: { skill: "fmixed", count: 5, den: 8 },
    src: "p.99 মূল প্রশ্ন (রুটির পরিমাণ: ৭/৪ = ১ ৩/৪) and the parrot's যেমন: ২ ১/৪ = ((২×৪)+১)/৪, with p.98 কাজ ৩'s four strips written as মিশ্র ভগ্নাংশ («অপ্রকৃত ভগ্নাংশকে মিশ্র ভগ্নাংশে … প্রকাশ করা যায়»); then 5 fresh mixed-number rounds",
  });

  wio({
    page: 99, slug: "number-line", type: FP, title: "সংখ্যারেখার খালি ঘরে প্রকৃত, অপ্রকৃত ও মিশ্র ভগ্নাংশ লিখি",
    items: [
      onLine(2, 5), onLine(3, 5), onLine(4, 5), // the dark boxes above ২, ৩, ৪ fifths (প্রকৃত)
      toMixed("7/5", "line"), toMixed("9/5", "line"), toMixed("12/5", "line"), toMixed("16/5", "line"), // the red boxes below
      toImproper("1 3/5", "line"), toImproper("2 1/5", "line"), toImproper("2 3/5", "line"), toImproper("2 4/5", "line"), toImproper("3 2/5", "line"), // the blue boxes above
      placeMixed("1 1/5"), // the printed ১ ১/৫ (under ৬/৫)
    ],
    src: "p.99 কাজ ১ (the line from ০ to ৩ ২/৫ in fifths): the proper boxes ২/৫, ৩/৫, ৪/৫ (on a line from ০ to ১), the mixed boxes under ৭, ৯, ১২, ১৬ fifths, the improper boxes over ৮, ১১, ১৩ (under it the printed ২ ৩/৫), ১৪, ১৭ fifths, and the printed ১ ১/৫ placed",
  });
  cant("p.99 কাজ ১: the boxes over ১০/৫ and ১৫/৫ (২ and ৩, wholes) can't be a mixed-number round (fmixed takes a part past the whole); the game's line goes to the whole after the point.");

  const KIND = ["প্রকৃত ভগ্নাংশ", "অপ্রকৃত ভগ্নাংশ", "মিশ্র ভগ্নাংশ"];
  sort({
    page: 99, slug: "kinds", title: "প্রকৃত, অপ্রকৃত ও মিশ্র ভগ্নাংশ আলাদা করি",
    categories: KIND,
    items: [
      ["2/5", 0], ["7/5", 1], ["1 2/5", 2], ["3/4", 0], ["7/4", 1], ["1 3/4", 2], ["2 1/4", 2], ["9/4", 1],
      ["4/5", 0], ["10/5", 1], ["2 3/5", 2], ["13/5", 1],
    ],
    src: "p.99 the yellow panel (২/৫ প্রকৃত, ৭/৫ অপ্রকৃত, ১ ২/৫ মিশ্র: পূর্ণ সংখ্যা ও প্রকৃত ভগ্নাংশ) and the page's fractions: ৩/৪, ৭/৪, ১ ৩/৪ (মূল প্রশ্ন), ২ ১/৪, ৯/৪ (the parrot), ৪/৫, ১০/৫, ২ ৩/৫, ১৩/৫ (কাজ ১'s line)",
  });

  // ───────────── p.100–101: সমতুল ভগ্নাংশ ─────────────

  wio({
    page: 100, slug: "equivalent", type: FP, title: "রং করে ও সংখ্যারেখা দেখে সমতুল ভগ্নাংশ খুঁজি",
    items: [
      same(1, 2, 4, "shade"), same(1, 2, 6, "shade"), same(1, 2, 8, "shade"), same(1, 2, 10, "shade"), // কাজ ১: ১/২ = ২/৪ = ৩/৬ = ৪/৮ = ৫/১০
      same(1, 3, 6), same(1, 3, 9), same(2, 3, 6), same(2, 3, 9), // কাজ ২ (১): ১/৩ ও ২/৩ এর সমতুল (the dashed line)
      same(1, 4, 8), same(4, 10, 5), same(6, 9, 3), same(6, 8, 4), // কাজ ২ (২)
    ],
    fresh: { skill: "fsame", count: 5, den: 10 },
    src: "p.100 কাজ ১ (the five strips: ১/২ shaded as ২/৪, ৩/৬, ৪/৮, ৫/১০), কাজ ২ (১) (১/৩ = ২/৬ = ৩/৯ and ২/৩ = ৪/৬ = ৬/৯ on the nine lines) and (২) (১/৪ = ২/□, ৪/১০ = □/৫, ৬/৯ = □/৩, ৬/৮ = ৩/□); then 5 fresh rounds",
  });
  note("p.100 কাজ ২ (২) ১/৪ = ২/□ and ৬/৮ = ৩/□ (and p.101 অনুশীলন ১'s ৬/৮ = ৩/□, ৫/১৫ = ১/□, কাজ ১ (২)–(৪)) have the box in the bottom or a whole number; Fraction Play's fsame asks a top, so p.100's game asks the same pairs as ১/৪ = □/৮ and ৬/৮ = □/৪, and p.101's quiz asks every bottom box as printed.");

  wio({
    page: 101, slug: "multiply-divide", type: FP, title: "হর ও লবকে একই সংখ্যা দিয়ে গুণ বা ভাগ করে সমতুল ভগ্নাংশ লিখি",
    items: [
      same(1, 2, 12), // কাজ ১ (১) ১/২ = □/১২ (×৬)
      same(5, 6, 12), // কাজ ১ (২) ৫/৬ = ১০/□, asked as ৫/৬ = □/১২
      same(6, 12, 6), same(6, 12, 4), same(6, 12, 2), // ৬/১২ = ৩/৬ = ২/৪ = ১/২ (÷২, ÷৩, ÷৬)
      same(3, 9, 3), same(4, 8, 2), same(6, 8, 4), // অনুশীলন ১ (১), (৪), (২)
    ],
    fresh: { skill: "fsame", count: 5, den: 12 },
    src: "p.101 কাজ ১ (১)–(২), the boy and the girl's ৬/১২ = ৩/৬ = ২/৪ = ১/২ (÷ the same number), অনুশীলন ১ (১) ৩/৯ = □/৩, (২) ৬/৮ = ৩/□ (asked as □/৪), (৪) ৪/৮ = □/২; ৫/১৫ = ১/□ (a bottom over ১২) is in the quiz; then 5 fresh rounds",
  });

  const box = (prompt, opts, want, why) => q({ prompt, options: opts.map(String), answer: String(want), num: want, why });
  mcq({
    page: 101, slug: "boxes", title: "হর ও লবকে কোন সংখ্যা দিয়ে গুণ বা ভাগ করা হলো এবং খালিঘরে কী বসবে, বেছে নিই",
    questions: [
      box("1/2 = 3/6: লব ও হরকে কোন সংখ্যা দিয়ে গুণ করা হয়েছে?", [2, 3, 4, 6], 3, "1 × 3 = 3 এবং 2 × 3 = 6।"),
      box("1/2 = 4/8: লব ও হরকে কোন সংখ্যা দিয়ে গুণ করা হয়েছে?", [2, 3, 4, 8], 4, "1 × 4 = 4 এবং 2 × 4 = 8।"),
      box("1/2 = □/12: হরকে 6 দিয়ে গুণ করা হয়েছে। লবকে কোন সংখ্যা দিয়ে গুণ করব?", [2, 6, 10, 12], 6, "হর ও লবকে একই সংখ্যা দিয়ে গুণ করি: 1 × 6 = 6, তাই 1/2 = 6/12।"),
      box("5/6 = 10/□: খালিঘরে কোন সংখ্যা বসবে?", [11, 12, 15, 30], 12, "5 × 2 = 10, তাই হরও 6 × 2 = 12: 5/6 = 10/12।"),
      box("5 = 5/1 = 15/□: খালিঘরে কোন সংখ্যা বসবে?", [1, 3, 5, 15], 3, "5 × 3 = 15, তাই হরও 1 × 3 = 3: 5/1 = 15/3।"),
      box("3 = □/4: খালিঘরে কোন সংখ্যা বসবে?", [3, 4, 7, 12], 12, "3 = 3/1; হর 1 × 4 = 4, তাই লব 3 × 4 = 12: 3 = 12/4।"),
      box("6/12 = 2/4: লব ও হরকে কোন সংখ্যা দিয়ে ভাগ করা হয়েছে?", [2, 3, 4, 6], 3, "6 ÷ 3 = 2 এবং 12 ÷ 3 = 4।"),
      box("6/12 = 1/2: লব ও হরকে কোন সংখ্যা দিয়ে ভাগ করা হয়েছে?", [2, 3, 6, 12], 6, "6 ÷ 6 = 1 এবং 12 ÷ 6 = 2।"),
      box("6/8 = 3/□: খালিঘরে কোন সংখ্যা বসবে?", [2, 4, 5, 6], 4, "6 ÷ 2 = 3, তাই হরও 8 ÷ 2 = 4: 6/8 = 3/4।"),
      box("5/15 = 1/□: খালিঘরে কোন সংখ্যা বসবে?", [1, 3, 5, 10], 3, "5 ÷ 5 = 1, তাই হরও 15 ÷ 5 = 3: 5/15 = 1/3।"),
      box("1/4 = 2/□: খালিঘরে কোন সংখ্যা বসবে?", [2, 4, 6, 8], 8, "1 × 2 = 2, তাই হরও 4 × 2 = 8: 1/4 = 2/8।"),
      q({
        prompt: "কোনো ভগ্নাংশের হর এবং লবকে একই সংখ্যা দিয়ে গুণ বা ভাগ করলে কী পাওয়া যায়?", options: ["ওই ভগ্নাংশের সমতুল ভগ্নাংশ", "ওই ভগ্নাংশের চেয়ে বড়ো ভগ্নাংশ", "ওই ভগ্নাংশের চেয়ে ছোটো ভগ্নাংশ"],
        answer: "ওই ভগ্নাংশের সমতুল ভগ্নাংশ", why: "হর এবং লবকে একই সংখ্যা দিয়ে গুণ বা ভাগ করলে ওই ভগ্নাংশের সমতুল ভগ্নাংশ পাওয়া যায়।",
      }),
    ],
    src: "p.101 the arcs (১/২ = ২/৪ = ৩/৬ = ৪/৮: ×২, ×□, ×□; ৬/১২ = ৩/৬ = ২/৪ = ১/২: ÷২, ÷□, ÷□), কাজ ১ (১)–(৪) (×?, ১০/□, ১৫/□, ৩ = □/৪), অনুশীলন ১ (২) ৬/৮ = ৩/□ and (৩) ৫/১৫ = ১/□, p.100 কাজ ২ (২) ১/৪ = ২/□, and the two boxed rules; my options",
  });

  // ───────────── p.102: লঘিষ্ঠ আকার ─────────────

  match({
    page: 102, slug: "lowest", type: "equation_match", title: "ভগ্নাংশকে তার লঘিষ্ঠ আকারের সাথে মিলাই",
    pairs: [
      ["15/18", "5/6"], ["6/12", "1/2"], ["3/21", "1/7"], ["9/36", "1/4"], ["16/48", "1/3"], ["8/12", "2/3"],
      ["9/12", "3/4"], ["20/25", "4/5"], ["32/36", "8/9"], ["18/30", "3/5"], ["16/28", "4/7"],
    ],
    src: "p.102 মূল প্রশ্ন (১৫/১৮ = ৫/৬) and অনুশীলন ১ (৬/১২ … ১৬/২৮); its ২৮/৪৯ (৪/৭) and ২৪/৪০ (৩/৫) and কাজ ১'s ১৬/২০ (৪/৫) share a lowest form with another pair, so they are in the quiz",
  });
  cant("p.102 লঘিষ্ঠ আকার: Fraction Play has no simplest-form round, and fsame takes bottoms up to ১২ (১৫/১৮, ৯/৩৬ …); the page is a match (each fraction and its lowest form) and a quiz (the divisor, ২৮/৪৯, ২৪/৪০, ১৬/২০).");

  const hcf = (f, opts, want, why) => q({ prompt: `${f}: লব ও হরকে একবারে সবচেয়ে বড়ো কোন সংখ্যা দিয়ে ভাগ করা যায়?`, options: opts.map(String), answer: String(want), num: want, why });
  const lowest = (f, opts, want, why) => q({ prompt: `${f} এর লঘিষ্ঠ আকার কোনটি?`, options: opts, answer: want, why });
  mcq({
    page: 102, slug: "lowest-way", title: "লঘিষ্ঠ আকারে প্রকাশ করতে কোন সংখ্যা দিয়ে ভাগ করব, বেছে নিই",
    questions: [
      q({ prompt: "15/18: 15 ও 18 দুটি সংখ্যাকেই কোন সংখ্যা দিয়ে ভাগ করা যায়?", options: ["2", "3", "4", "5"], answer: "3", num: 3, why: "15 ÷ 3 = 5 এবং 18 ÷ 3 = 6।" }),
      lowest("15/18", ["5/6", "3/6", "5/9", "15/6"], "5/6", "লব ও হরকে 3 দিয়ে ভাগ করি: 15/18 = 5/6।"),
      hcf("16/20", [2, 4, 5, 8], 4, "16 ও 20 এর সবচেয়ে বড়ো সাধারণ গুণনীয়ক 4: 16 ÷ 4 = 4, 20 ÷ 4 = 5।"),
      lowest("16/20", ["8/10", "4/5", "2/5", "4/10"], "4/5", "16/20 = 8/10 = 4/5 (দুই বার 2 দিয়ে, বা একবারে 4 দিয়ে ভাগ করে)।"),
      q({ prompt: "পরপর 2 বার 2 দিয়ে ভাগ করা এবং একবারে কোন সংখ্যা দিয়ে ভাগ করা একই কথা?", options: ["2", "4", "6", "8"], answer: "4", num: 4, why: "2 দিয়ে ভাগ, আবার 2 দিয়ে ভাগ = 2 × 2 = 4 দিয়ে ভাগ।" }),
      lowest("28/49", ["4/7", "7/4", "14/49", "4/9"], "4/7", "লব ও হরকে 7 দিয়ে ভাগ করি: 28 ÷ 7 = 4, 49 ÷ 7 = 7।"),
      lowest("24/40", ["3/5", "12/20", "6/10", "4/5"], "3/5", "লব ও হরকে 8 দিয়ে ভাগ করি: 24 ÷ 8 = 3, 40 ÷ 8 = 5 (12/20, 6/10 আরও ছোটো করা যায়)।"),
      hcf("8/12", [2, 3, 4, 6], 4, "8 ÷ 4 = 2, 12 ÷ 4 = 3: 8/12 = 2/3।"),
      hcf("32/36", [2, 4, 6, 9], 4, "32 ÷ 4 = 8, 36 ÷ 4 = 9: 32/36 = 8/9।"),
      q({
        prompt: "ভগ্নাংশকে লঘিষ্ঠ আকারে প্রকাশ করতে হর ও লবকে কী করতে হয়?", options: ["একই সংখ্যা দিয়ে ভাগ করতে হয়", "একই সংখ্যা দিয়ে গুণ করতে হয়", "একই সংখ্যা যোগ করতে হয়"],
        answer: "একই সংখ্যা দিয়ে ভাগ করতে হয়", why: "লঘিষ্ঠ আকার পেতে হর ও লবকে একই সংখ্যা দিয়ে ভাগ করে যতটা সম্ভব ছোটো করি।",
      }),
    ],
    src: "p.102 মূল প্রশ্ন (the girl: ৩ দিয়ে ১৫ ও ১৮ দুটি সংখ্যাকেই ভাগ করা যায়), কাজ ১ (১৬/২০ = ৮/১০ = ৪/৫, the girl: পরপর ২ বার ২ দিয়ে ভাগ = একবারে ৪ দিয়ে ভাগ, সবচেয়ে বড়ো গুণনীয়ক), অনুশীলন ১'s ২৮/৪৯, ২৪/৪০, ৮/১২, ৩২/৩৬, and the page's rule; my options",
  });

  // ───────────── p.103: ভগ্নাংশের তুলনা ─────────────

  wio({
    page: 103, slug: "compare", type: FP, title: "বড়ো এবং ছোটো ভগ্নাংশ নির্ণয় করে ‘<’ অথবা ‘>’ প্রতীক বসাই",
    items: [
      cmpF("2/5", "3/5", "<"), cmpF("3/8", "5/8", "<"), cmpF("1/2", "1/3", ">"), cmpF("3/5", "3/10", ">"), // কাজ ১
      cmpF("1/4", "3/4", "<"), cmpF("2/5", "1/5", ">"), cmpF("5/7", "5/6", "<"), cmpF("8/9", "1", "<"), // অনুশীলন ১
    ],
    fresh: { skill: "fcompare", count: 5, den: 10 },
    src: "p.103 কাজ ১ (২/৫ □ ৩/৫, ৩/৮ □ ৫/৮, ১/২ □ ১/৩, ৩/৫ □ ৩/১০, each with its strips) and অনুশীলন ১ (১/৪ □ ৩/৪, ২/৫ □ ১/৫, ৫/৭ □ ৫/৬, ৮/৯ □ ১); then 5 fresh rounds",
  });

  const ORDER_WHY = { num: "লবগুলো সমান: যে ভগ্নাংশের হর ছোটো, সেটি বড়ো।", den: "হরগুলো সমান: যে ভগ্নাংশের লব বড়ো, সেটির মান বড়ো।" };
  const lists = [
    { given: "2/3, 2/9, 2/8, 2/5", up: ["2/9", "2/8", "2/5", "2/3"], way: "num", wrong: [["2/3", "2/5", "2/8", "2/9"], ["2/8", "2/9", "2/5", "2/3"], ["2/9", "2/5", "2/8", "2/3"]] },
    { given: "3/7, 3/10, 3/3, 3/5", up: ["3/10", "3/7", "3/5", "3/3"], way: "num", wrong: [["3/3", "3/5", "3/7", "3/10"], ["3/7", "3/10", "3/5", "3/3"], ["3/10", "3/7", "3/3", "3/5"]] },
    { given: "5/10, 5/6, 5/15, 5/9", up: ["5/15", "5/10", "5/9", "5/6"], way: "num", wrong: [["5/6", "5/9", "5/10", "5/15"], ["5/10", "5/15", "5/9", "5/6"], ["5/15", "5/9", "5/10", "5/6"]] },
    { given: "5/7, 3/7, 4/7, 2/7", up: ["2/7", "3/7", "4/7", "5/7"], way: "den", wrong: [["5/7", "4/7", "3/7", "2/7"], ["3/7", "2/7", "4/7", "5/7"], ["2/7", "4/7", "3/7", "5/7"]] },
  ];
  const chain = (l) => l.join(" < ");
  const orderQs = lists.flatMap((l) => [
    q({ prompt: `${l.given}: ছোটো থেকে বড়ো ক্রমানুসারে সাজালে কোনটি সঠিক?`, options: [chain(l.up), ...l.wrong.map(chain)], answer: chain(l.up), why: `${ORDER_WHY[l.way]} ${chain(l.up)}।` }),
    q({ prompt: `${l.given}: এদের মধ্যে কোনটি সবচেয়ে ছোটো?`, options: l.up.slice(), answer: l.up[0], why: `${ORDER_WHY[l.way]} তাই ${l.up[0]} সবচেয়ে ছোটো।` }),
    q({ prompt: `${l.given}: এদের মধ্যে কোনটি সবচেয়ে বড়ো?`, options: l.up.slice(), answer: l.up[3], why: `${ORDER_WHY[l.way]} তাই ${l.up[3]} সবচেয়ে বড়ো।` }),
  ]);
  mcq({
    page: 103, slug: "order", title: "ভগ্নাংশগুলোকে ছোটো থেকে বড়ো ক্রমানুসারে সাজাই",
    questions: orderQs,
    src: "p.103 অনুশীলন ২ (১)–(৪) (২/৩, ২/৯, ২/৮, ২/৫; ৩/৭, ৩/১০, ৩/৩, ৩/৫; ৫/১০, ৫/৬, ৫/১৫, ৫/৯; ৫/৭, ৩/৭, ৪/৭, ২/৭): for each, the order with ‘<’ and the smallest and the largest; the page's two rules as the reasons; my options",
  });
  cant("p.103 অনুশীলন ২ (ছোটো থেকে বড়ো সাজাই): each list has four fractions, and a Sequence game needs ten items (bottoms over ১২ too: ৫/১৫); the order is chosen in a quiz.");

  // ───────────── p.104–107: যোগ ও বিয়োগ ─────────────

  wio({
    page: 104, slug: "add", type: FP, title: "সমহরবিশিষ্ট ভগ্নাংশ যোগ করি",
    items: [
      nameIt(5, 8, "circle"), nameIt(1, 8, "circle"), // রকির অংশ = □/□, রিমার অংশ = □/□ (the two cakes)
      add("5/8 + 1/8", "রকি একটি কেকের 5/8 অংশ পেল। রকির বোন রিমা ঐ কেকের 1/8 অংশ পেল। তারা দুইজন একত্রে কেকের কত অংশ পেল?", "অংশ"), // মূল প্রশ্ন
      same(6, 8, 4), // ৬/৮ = □/৪: the sum in its লঘিষ্ঠ আকার (৩/৪)
      add("3/7 + 2/7"), add("3/9 + 4/9"), add("5/12 + 4/12"), // অনুশীলন ১
    ],
    fresh: { skill: "fadd", count: 5, den: 12 },
    src: "p.104 মূল প্রশ্ন (রকি ৫/৮, রিমা ১/৮: the two cakes named, the story as printed, its sum ৬/৮ then the girl's লঘিষ্ঠ আকার ৩/৪) and অনুশীলন ১ (৩/৭ + ২/৭, ৩/৯ + ৪/৯, ৫/১২ + ৪/১২); then 5 fresh rounds (adding and taking away, the section's two skills)",
  });

  wio({
    page: 105, slug: "add-three", type: FP, title: "সমহরবিশিষ্ট তিনটি ভগ্নাংশ দুই ধাপে যোগ করি",
    items: [
      add("1/7 + 2/7"), add("3/7 + 3/7"), // কাজ ১: ১/৭ + ২/৭ + ৩/৭ মিটার
      add("3/7 + 2/7"), add("5/7 + 1/7"), // অনুশীলন ২ (১)
      add("3/9 + 2/9"), add("5/9 + 2/9"), // (২)
      add("1/12 + 1/12"), add("2/12 + 1/12"), // (৩)
      add("3/8 + 2/8"), add("5/8 + 1/8"), same(6, 8, 4), // কাজ ২: ৩/৮ + ২/৮ + ১/৮ লিটার, then its লঘিষ্ঠ আকার
    ],
    src: "p.105 কাজ ১ (১/৭, ২/৭, ৩/৭ মিটার ফিতা), অনুশীলন ২ (১)–(৩) and কাজ ২ (রিয়া ৩/৮, মিনা ২/৮, ঊর্মি ১/৮ লিটার, then = □/□ (লঘিষ্ঠ আকার): ৬/৮ = ৩/৪), each three fractions in two rounds: the first two added, then the third",
    notes: [TWO_STEPS],
  });
  cant("pp.105, 107, 108, 110: three fractions in one sum (১/৭ + ২/৭ + ৩/৭, ২/৫ + ৩/৫ − ৪/৫): Fraction Play's fadd takes two, so each is two rounds, the first result carried into the second (রাফির কৌশল, p.107); the stories of p.105 কাজ ১–২ (three amounts) are played as their sums, without the story's words.");

  wio({
    page: 106, slug: "subtract", type: FP, title: "সমহরবিশিষ্ট ভগ্নাংশ বিয়োগ করি",
    items: [
      add("3/5 − 2/5", "তোমার কাছে 3/5 লিটার দুধ রয়েছে যা থেকে তুমি 2/5 লিটার দুধ পান করেছ। আর কত লিটার দুধ অবশিষ্ট রয়েছে?", "লিটার"), // মূল প্রশ্ন
      add("6/8 − 4/8", "রাজিবের বোতলে 6/8 লিটার পানি আছে। ববির বোতলে 4/8 লিটার পানি আছে। ববি অপেক্ষা রাজিবের কত লিটার পানি বেশি আছে?", "লিটার"), // কাজ ১
      add("5/8 − 1/8"), add("7/12 − 5/12"), // অনুশীলন ১
      add("1 − 2/5"), add("7/9 − 4/9"), // mine (the page has four)
    ],
    fresh: { skill: "fadd", count: 5, den: 12 },
    src: "p.106 মূল প্রশ্ন (৩/৫ লিটার দুধ, ২/৫ লিটার পান) and কাজ ১ (রাজিব ৬/৮, ববি ৪/৮ লিটার), the stories as printed, and অনুশীলন ১ (৫/৮ − ১/৮, ৭/১২ − ৫/১২); added (mine): ১ − ২/৫ and ৭/৯ − ৪/৯; then 5 fresh rounds",
  });

  wio({
    page: 107, slug: "add-subtract", type: FP, title: "যোগ ও বিয়োগ একসাথে দুই ধাপে হিসাব করি",
    items: [
      add("2/5 + 3/5"), add("5/5 − 4/5"), // অনুশীলন ২ (১) ২/৫ + ৩/৫ − ৪/৫
      add("3/7 + 1/7"), add("4/7 − 2/7"), // (২) ৩/৭ + ১/৭ − ২/৭
      add("3/8 − 1/8"), add("2/8 + 5/8"), // (৩) ৩/৮ − ১/৮ + ৫/৮
      add("1/6 + 5/6"), add("6/6 − 1/6"), // (৪) ১/৬ + ৫/৬ − ১/৬
    ],
    fresh: { skill: "fadd", count: 5, den: 12 },
    src: "p.107 অনুশীলন ২ (১)–(৪), each in two rounds as রাফির কৌশল (আগে প্রথম দুইটি, তারপর শেষেরটি); then 5 fresh rounds",
    notes: [TWO_STEPS],
  });

  const tuli = (sum, top, d, opts) => q({ prompt: `তুলির কৌশলে হিসাব করি: ${sum} = কত?`, options: opts, answer: `${top}/${d}`, why: `লবগুলোর যোগ-বিয়োগ, হর একই থাকে: ${sum} = ${top}/${d}।` });
  const STORY = "রকি একটি ফিতার 6/13 মিটার, রিমা 3/13 মিটার এবং মিঠু 4/13 মিটার পেল।";
  mcq({
    page: 107, slug: "two-ways", title: "রাফির ও তুলির কৌশলে ভগ্নাংশের যোগ-বিয়োগ করি",
    questions: [
      q({ prompt: `${STORY} রকি আর রিমা একসঙ্গে কত মিটার ফিতা পেল?`, options: ["9/13 মিটার", "9/26 মিটার", "3/13 মিটার", "10/13 মিটার"], answer: "9/13 মিটার", why: "রকির অংশ + রিমার অংশ = 6/13 + 3/13 = (6 + 3)/13 = 9/13 মিটার।" }),
      q({ prompt: `${STORY} রকি আর রিমা একসঙ্গে যতটুকু পেল, মিঠু তার চেয়ে কত মিটার ফিতা কম পেয়েছে?`, options: ["5/13 মিটার", "13/13 মিটার", "1/13 মিটার", "2/13 মিটার"], answer: "5/13 মিটার", why: "রকির অংশ + রিমার অংশ − মিঠুর অংশ = (6 + 3 − 4)/13 = 5/13 মিটার।" }),
      q({ prompt: "রাফির কৌশলে প্রথমে কী করি?", options: ["আগে প্রথম দুইটি ভগ্নাংশ যোগ করি", "আগে শেষের ভগ্নাংশটি বিয়োগ করি", "আগে হরগুলো যোগ করি"], answer: "আগে প্রথম দুইটি ভগ্নাংশ যোগ করি", why: "রাফির কৌশল: আগে প্রথম দুইটি ভগ্নাংশ যোগ করব, তারপর সেই যোগফল থেকে শেষের ভগ্নাংশটি বিয়োগ করব।" }),
      q({ prompt: "তুলির কৌশলে 6/13 + 3/13 − 4/13 কে কীভাবে লিখি?", options: ["(6 + 3 − 4)/13", "(6 + 3 − 4)/(13 + 13 − 13)", "(6 + 3 + 4)/13", "(6 − 3 + 4)/13"], answer: "(6 + 3 − 4)/13", why: "সমহরবিশিষ্ট ভগ্নাংশের যোগ আর বিয়োগ মিলিয়ে: লবগুলোর হিসাব, হর একই 13।" }),
      q({ prompt: "সমহরবিশিষ্ট ভগ্নাংশ যোগ করলে যোগফলের হর কী হয়?", options: ["ভগ্নাংশগুলোর সাধারণ হর", "হরগুলোর যোগফল", "লবগুলোর যোগফল"], answer: "ভগ্নাংশগুলোর সাধারণ হর", why: "যোগফলের হর = ভগ্নাংশগুলোর সাধারণ হর, যোগফলের লব = লবগুলোর যোগফল (পৃষ্ঠা 104)।" }),
      q({ prompt: "সমহরবিশিষ্ট ভগ্নাংশ যোগ করলে যোগফলের লব কী হয়?", options: ["লবগুলোর যোগফল", "হরগুলোর যোগফল", "ভগ্নাংশগুলোর সাধারণ হর"], answer: "লবগুলোর যোগফল", why: "যোগফলের লব = ভগ্নাংশগুলোর লবগুলোর যোগফল (পৃষ্ঠা 104–105)।" }),
      q({ prompt: "সমহরবিশিষ্ট একটি ভগ্নাংশ থেকে অন্যটি বিয়োগ করলে বিয়োগফলের লব কী হয়?", options: ["লবগুলোর বিয়োগফল", "হরগুলোর বিয়োগফল", "লবগুলোর যোগফল"], answer: "লবগুলোর বিয়োগফল", why: "বিয়োগফলের হর = সাধারণ হর, বিয়োগফলের লব = লবগুলোর বিয়োগফল (পৃষ্ঠা 106)।" }),
      tuli("2/5 + 3/5 − 4/5", 1, 5, ["1/5", "9/5", "1/15", "5/5"]),
      tuli("3/7 + 1/7 − 2/7", 2, 7, ["2/7", "6/7", "2/21", "4/7"]),
      tuli("3/8 − 1/8 + 5/8", 7, 8, ["7/8", "9/8", "7/24", "2/8"]),
      tuli("1/6 + 5/6 − 1/6", 5, 6, ["5/6", "7/6", "1/6", "5/18"]),
    ],
    src: "p.107 কাজ ২ (রকি ৬/১৩, রিমা ৩/১৩, মিঠু ৪/১৩ মিটার: the story as printed, its two questions), রাফির কৌশল and তুলির কৌশল, the boxed rules of pp.104–106, and অনুশীলন ২ (১)–(৪) worked তুলির কৌশলে in one step; my options",
  });
  note("p.107 কাজ ২, তুলির কৌশল: the book prints «রাফির অংশ + রিমার অংশ − মিঠুর অংশ»; the story's child is রকি, so the game reads «রকির অংশ + রিমার অংশ − মিঠুর অংশ».");
  cant("p.107 কাজ ২ (thirteenths: ৬/১৩ + ৩/১৩ − ৪/১৩): Fraction Play takes bottoms up to ১২, so the story is asked in the page's quiz (৯/১৩ মিটার, then ৫/১৩ মিটার).");

  // ───────────── p.108: দেখি পারি কি না ─────────────

  wio({
    page: 108, slug: "review", type: FP, title: "সমতুল ভগ্নাংশ কি না যাচাই করি ও হিসাবগুলো করি",
    items: [
      equiv("3/4", "3/8", "no"), equiv("3/4", "6/8", "yes"), equiv("3/4", "6/12", "no"), equiv("3/4", "15/16", "no"), // ২
      equiv("3/4", "15/20", "yes"), equiv("3/4", "15/24", "no"), equiv("3/4", "18/24", "yes"), // ২
      equiv("3/9", "1/3", "yes"), equiv("3/9", "1/9", "no"), equiv("3/9", "6/9", "no"), equiv("3/9", "12/18", "no"), // ১, the last row
      add("5/6 − 1/6"), same(4, 6, 3), // ৩ (১): ৪/৬, then its লঘিষ্ঠ আকার ২/৩
      add("1 − 1/5"), add("4/5 + 2/5"), // ৩ (২) ১ + ২/৫ − ১/৫: ১ − ১/৫ first, then + ২/৫ (= ৬/৫)
    ],
    src: "p.108 দেখি পারি কি না ২ (৩/৪ এর সমতুল ভগ্নাংশে টিক: ৩/৮ … ১৮/২৪), ১'s last row (ভগ্নাংশটি ৩/৯ এর সমতুল: ১/৩, ১/৯, ৬/৯, ১২/১৮ of its ten), and ৩ (১) ৫/৬ − ১/৬ (= ৪/৬ = ২/৩ লঘিষ্ঠ আকার) and (২) ১ + ২/৫ − ১/৫ in two rounds",
  });
  cant("p.108 ৩ (২) ১ + ২/৫ − ১/৫: fadd writes one whole only as «১ − …», so the game takes ১ − ১/৫ = ৪/৫ first, then ৪/৫ + ২/৫ = ৬/৫ (the book's (৫ + ২ − ১)/৫ = ৬/৫).");

  const has = (prompt, opts, want, why) => q({ prompt, options: opts, answer: want, why });
  mcq({
    page: 108, slug: "rules", title: "নির্দেশনা অনুসরণ করে ঠিক ভগ্নাংশটি বেছে নিই",
    questions: [
      has("নিচের কোন ভগ্নাংশটির হর একটি বিজোড় সংখ্যা?", ["6/9", "3/4", "5/6", "12/18"], "6/9", "6/9 এর হর 9, একটি বিজোড় সংখ্যা; 4, 6, 18 জোড় সংখ্যা।"),
      has("নিচের কোন ভগ্নাংশটির হর বিজোড় সংখ্যা নয়?", ["3/6", "1/5", "1/3", "1/9"], "3/6", "3/6 এর হর 6, একটি জোড় সংখ্যা; 5, 3, 9 বিজোড়।"),
      has("নিচের কোন ভগ্নাংশটির লব 1?", ["1/9", "3/5", "2/5", "3/4"], "1/9", "1/9 এর লব (দাগের উপরের সংখ্যা) 1।"),
      has("নিচের কোন ভগ্নাংশটির লব 1?", ["1/3", "3/6", "6/9", "5/6"], "1/3", "1/3 এর লব 1।"),
      has("নিচের কোন ভগ্নাংশটির লব 1 নয়?", ["2/5", "1/5", "1/3", "1/9"], "2/5", "2/5 এর লব 2।"),
      has("নিচের কোন ভগ্নাংশটির হর 2 থেকে 6 এর মধ্যে?", ["3/4", "1/9", "12/18", "6/9"], "3/4", "3/4 এর হর 4, যা 2 থেকে 6 এর মধ্যে; 9 ও 18 নয়।"),
      has("নিচের কোন ভগ্নাংশটির হর 2 থেকে 6 এর মধ্যে নয়?", ["12/18", "1/3", "3/4", "2/5"], "12/18", "12/18 এর হর 18; 3, 4, 5 সবই 2 থেকে 6 এর মধ্যে।"),
      has("নিচের কোন ভগ্নাংশটির মান 1/2 এর চেয়ে কম?", ["2/5", "3/5", "3/4", "5/6"], "2/5", "2/5 এর লব 2, হর 5 এর অর্ধেকের চেয়ে কম; তাই 2/5 < 1/2।"),
      has("নিচের কোন ভগ্নাংশটির মান 1/2 এর চেয়ে কম?", ["1/9", "3/6", "6/9", "12/18"], "1/9", "1/9 এর লব 1, হর 9 এর অর্ধেকের চেয়ে কম। 3/6 = 1/2, কম নয়।"),
      has("নিচের কোন ভগ্নাংশটি 3/9 এর সমতুল?", ["1/3", "1/9", "6/9", "3/6"], "1/3", "3/9 এর লব ও হরকে 3 দিয়ে ভাগ করলে 1/3 পাই।"),
    ],
    src: "p.108 দেখি পারি কি না ১ (the five rows: হর বিজোড়, লব ১, হর ২ থেকে ৬ এর মধ্যে, মান ১/২ এর চেয়ে কম, ৩/৯ এর সমতুল) asked of its ten fractions (১/৫, ৩/৫, ১/৩, ২/৫, ১/৯, ৩/৪, ৫/৬, ৩/৬, ১২/১৮, ৬/৯), a question per choice; the bottom ৬ (on the edge of ২ থেকে ৬) is never what decides; my options",
  });
  cant("p.108 দেখি পারি কি না ১ (tick every fraction of ten that fits a rule): no round rings fractions by a rule (fsort only proper / improper); each rule is a few quiz questions.");

  // ───────────── p.109–110: নিজে করি ─────────────

  mcq({
    page: 109, slug: "tick", title: "সঠিক উত্তরের পাশে টিক চিহ্ন দিই",
    questions: [
      q({ prompt: "নিচের কোনটি প্রকৃত ভগ্নাংশ?", options: ["5/3", "4/3", "4/4", "3/5"], book: "ঘ", why: "প্রকৃত ভগ্নাংশে লব < হর: 3/5 এ 3 < 5।" }),
      q({ prompt: "নিচের কোন ভগ্নাংশটির মান সবচেয়ে বড়ো?", options: ["1/5", "2/5", "3/5", "4/5"], book: "ঘ", why: "হরগুলো সমান: যে ভগ্নাংশের লব বড়ো, সেটির মান বড়ো।" }),
      q({ prompt: "নিচের কোন ভগ্নাংশটির মান সবচেয়ে ছোটো?", options: ["3/4", "3/5", "3/7", "3/10"], book: "ঘ", why: "লবগুলো সমান: যে ভগ্নাংশের হর বড়ো, সেটি ছোটো।" }),
      q({ prompt: "নিচের কোনটি সঠিক?", options: ["2/5 > 3/5", "3/4 < 5/4", "2/3 < 1/3", "1/2 > 3/2"], book: "খ", why: "হর সমান, লব 3 < 5: তাই 3/4 < 5/4।" }),
      q({ prompt: "16/48 এর লঘিষ্ঠ আকার কোনটি?", options: ["8/24", "4/12", "2/6", "1/3"], book: "ঘ", why: "লব ও হরকে 16 দিয়ে ভাগ করি: 16/48 = 1/3।" }),
      q({ prompt: "2/7 এর সমতুল ভগ্নাংশ কোনটি?", options: ["2/14", "4/14", "6/14", "8/14"], book: "খ", why: "লব ও হরকে 2 দিয়ে গুণ করি: 2/7 = 4/14।" }),
      q({ prompt: "3/7 + 4/7 + 5/7 = কত?", options: ["12/21", "7/21", "7/14", "12/7"], book: "ঘ", why: "লবগুলো যোগ করি, হর একই থাকে: (3 + 4 + 5)/7 = 12/7।" }),
      q({ prompt: "নিচের কোনটি অপ্রকৃত ভগ্নাংশ?", options: ["7/4", "3/7", "5/8", "1/2"], answer: "7/4", why: "অপ্রকৃত ভগ্নাংশে লব ≥ হর: 7/4 এ 7 > 4।" }),
      q({ prompt: "নিচের কোন ভগ্নাংশটি 1 এর সমান?", options: ["9/9", "9/10", "1/9", "10/9"], answer: "9/9", why: "লব = হর হলে ভগ্নাংশটি 1 এর সমান: 9/9 = 1।" }),
      q({ prompt: "7/4 কে মিশ্র ভগ্নাংশে লিখলে কোনটি হবে?", options: ["1 3/4", "3 1/4", "1 4/7", "7 1/4"], answer: "1 3/4", why: "7/4 = 4/4 + 3/4 = 1 ও 3/4, অর্থাৎ 1 3/4 (পৃষ্ঠা 99)।" }),
    ],
    src: "p.109 নিজে করি ১ (১)–(৭) (the book's options and letters); added: three on নিজে করি ২'s ৭/৪ and ৯/৯ (অপ্রকৃত, ১ এর সমান, ৭/৪ = ১ ৩/৪), my options",
  });

  const eqv = (f, opts, want, why) => q({ prompt: `${f} এর একটি সমতুল ভগ্নাংশ কোনটি?`, options: opts, answer: want, why });
  mcq({
    page: 109, slug: "equivalent-lowest", title: "সমতুল ভগ্নাংশ তৈরি করি ও লঘিষ্ঠ আকারে প্রকাশ করি",
    questions: [
      eqv("3/7", ["6/14", "6/7", "3/14", "4/8"], "6/14", "লব ও হরকে 2 দিয়ে গুণ করি: 3/7 = 6/14।"),
      eqv("3/7", ["9/21", "9/7", "3/21", "6/10"], "9/21", "লব ও হরকে 3 দিয়ে গুণ করি: 3/7 = 9/21।"),
      eqv("5/8", ["10/16", "10/8", "5/16", "6/9"], "10/16", "লব ও হরকে 2 দিয়ে গুণ করি: 5/8 = 10/16।"),
      eqv("5/8", ["15/24", "15/8", "5/24", "8/11"], "15/24", "লব ও হরকে 3 দিয়ে গুণ করি: 5/8 = 15/24।"),
      eqv("7/4", ["14/8", "14/4", "7/8", "11/8"], "14/8", "লব ও হরকে 2 দিয়ে গুণ করি: 7/4 = 14/8।"),
      eqv("7/4", ["21/12", "21/4", "7/12", "28/12"], "21/12", "লব ও হরকে 3 দিয়ে গুণ করি: 7/4 = 21/12।"),
      eqv("9/9", ["18/18", "18/9", "9/18", "11/9"], "18/18", "লব ও হরকে 2 দিয়ে গুণ করি: 9/9 = 18/18।"),
      eqv("9/9", ["3/3", "3/9", "9/3", "1/9"], "3/3", "লব ও হরকে 3 দিয়ে ভাগ করি: 9/9 = 3/3।"),
      lowest("15/25", ["3/5", "5/3", "15/5", "5/25"], "3/5", "লব ও হরকে 5 দিয়ে ভাগ করি: 15/25 = 3/5।"),
      lowest("20/12", ["5/3", "3/5", "10/6", "20/3"], "5/3", "লব ও হরকে 4 দিয়ে ভাগ করি: 20/12 = 5/3 (10/6 আরও ছোটো করা যায়)।"),
      lowest("35/49", ["5/7", "7/5", "7/9", "5/9"], "5/7", "লব ও হরকে 7 দিয়ে ভাগ করি: 35/49 = 5/7।"),
      lowest("25/25", ["1/1", "5/5", "25/1", "1/25"], "1/1", "লব ও হরকে 25 দিয়ে ভাগ করি: 25/25 = 1/1 = 1 (5/5 আরও ছোটো করা যায়)।"),
    ],
    src: "p.109 নিজে করি ২ (৩/৭, ৫/৮, ৭/৪, ৯/৯: ২টি করে সমতুল ভগ্নাংশ, here × ২ and × ৩, or ÷ ৩ for ৯/৯) and ৩ (১৫/২৫, ২০/১২, ৩৫/৪৯, ২৫/২৫ লঘিষ্ঠ আকারে); my options",
  });
  cant("p.109 নিজে করি ২ (make two equivalents of ৩/৭, ৫/৮, ৭/৪, ৯/৯): fsame takes a proper fraction and bottoms up to ১২ (৬/১৪, ১০/১৬, ১৪/৮, ১৮/১৮ are past it); asked as a quiz, as is ৩ (লঘিষ্ঠ আকার).");

  wio({
    page: 110, slug: "add-subtract", type: FP, title: "নিজে করি: ভগ্নাংশের যোগ ও বিয়োগ করি, গল্পের সমাধান করি",
    items: [
      add("1/5 + 2/5"), add("2/7 + 3/7"), add("4/7 − 2/7"), add("7/12 − 3/12"), // ৪ (১)–(৪)
      add("3/5 + 1/5"), // ৪ (৫) ১/৫ + ২/৫ + ১/৫: its first step is (১)
      add("1/7 + 2/7"), add("3/7 + 3/7"), // ৪ (৬) ১/৭ + ২/৭ + ৩/৭
      add("2/7 + 1/7"), // ৪ (৭) ৪/৭ − ২/৭ + ১/৭: its first step is (৩)
      add("4/12 + 1/12"), // ৪ (৮) ৭/১২ − ৩/১২ + ১/১২: its first step is (৪)
      add("1/7 + 2/7", "রিমা একটি দোকান থেকে 1/7 মিটার এবং লিমা 2/7 মিটার রঙিন ফিতা ক্রয় করল। তারা একত্রে মোট কত মিটার ফিতা ক্রয় করল?", "মিটার"), // ৫
      add("1/5 + 4/5", "প্রিয়া একটি পিঠার 1/5 অংশ খায় এবং রিপা 4/5 অংশ খায়। তারা একত্রে মোট কত অংশ খায়?", "অংশ"), // ৬
      add("1 − 1/5"), toImproper("1 4/5", "bar"), // ৭ ২ মিটার − ১/৫ মিটার: ১ − ১/৫ = ৪/৫, so ১ ৪/৫ = ৯/৫ মিটার
    ],
    src: "p.110 নিজে করি ৪ (১)–(৮) (three fractions in two rounds; the first steps of (৫), (৭), (৮) are (১), (৩), (৪)), ৫ (রিমা ১/৭, লিমা ২/৭ মিটার) and ৬ (প্রিয়া ১/৫, রিপা ৪/৫ অংশ) as printed, and ৭ (প্রমি ২ মিটার, ১/৫ মিটার মিনাকে: ১ − ১/৫ = ৪/৫, then ১ ৪/৫ = ৯/৫)",
    notes: [TWO_STEPS, "নিজে করি ৭: ২ মিটার থেকে ১/৫ মিটার দিলে থাকে ১ মিটার আর (১ − ১/৫) = ৪/৫ মিটার, অর্থাৎ ১ ৪/৫ মিটার = ৯/৫ মিটার।"],
  });
  cant("p.110 নিজে করি ৭ (প্রমির ২ মিটার ফিতা − ১/৫ মিটার): fadd takes at most one whole, so the game takes ১ − ১/৫ = ৪/৫, then writes ১ ৪/৫ as ৯/৫ (the answer, ৯/৫ মিটার = ১ ৪/৫ মিটার); the story's words are not shown.");
  cant("p.110 নিজে করি ৮ (my own day in ২৪ ঘণ্টা: খেলাধুলা, ঘুমানো, পড়াশোনা …, each as □/২৪): the hours are the child's own, and Fraction Play's bottoms stop at ১২; not played.");
};
