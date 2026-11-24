// Pages ১১১–১২০ (অধ্যায় ৮ · দশমিক ভগ্নাংশ), written by Claude (helper for pp. 97–120), 24 Nov 2026.
// The book: ../class4-math-redesign/content/p111-120.js (+ .parts.js for the mugs, glasses, ruler and number lines).
// p.111: tenths of a litre (৩/১০ লিটার = ০.৩ লিটার, ২.৩ লিটার); p.112: the place দশমাংশ, the glasses in words, decimals and
// whole numbers; p.113: ৭ সেমি ৪ মিমি = ৭.৪ সেমি; p.114: ১ কেজি ৫০০ গ্রাম = ১.৫ কেজি, ১.৩ on the line; p.115: the line in
// tenths, how many ০.১; p.116: comparing decimals and tenths; p.117: adding and taking away in a row; p.118: in columns, the
// points lined up; p.119: দেখি পারি কি না; p.120: নিজে করি. The book has tenths only (no hundredths in this chapter).
"use strict";
module.exports = (L) => {
  const { it, wio, mcq, q, match, sort, note, cant, words } = L;
  // a decimal in words, as the book writes it (p.112: «শূন্য দশমিক নয় লিটার»)
  const DIGIT = ["শূন্য", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়"];
  const say = (s) => { const [w, f] = s.split("."); return `${Number(w) ? words(Number(w)) : "শূন্য"} দশমিক ${f.split("").map((d) => DIGIT[d]).join(" ")}`; };
  // decimals: [whole, after the point] (the server's answer); a row or a column
  const parts = (v) => { const s = Number(v).toFixed(1); return [Number(s.split(".")[0]), Number(s.split(".")[1])]; };
  const dsum = (a, op, b, layout, text, unit) => {
    const t = Math.round(Number(a) * 10) + (op === "+" ? 1 : -1) * Math.round(Number(b) * 10);
    return it({ kind: "dsum", a, op, b, layout, ...(text ? { text, unit } : {}) }, [Math.floor(t / 10), t % 10]);
  };
  const row = (a, op, b) => dsum(a, op, b, "row");
  const col = (a, op, b) => dsum(a, op, b, "column");
  // <, > or = between decimals and tenths ("7/10")
  const val = (s) => (s.includes("/") ? Number(s.split("/")[0]) / Number(s.split("/")[1]) : Number(s));
  const cmp = (a, b) => it({ kind: "dcompare", a, b }, val(a) < val(b) ? "<" : val(a) > val(b) ? ">" : "=");
  // a change of unit: into one unit (a whole number, or [whole, after the point]) or into two units ([big, small])
  const conv = (from, to, want) => it({ kind: "convert", from, to }, want);
  // the number line in tenths: read the arrow ([whole, tenth]) or tap the place (the number)
  const read = (from, to, x) => it({ kind: "numberline", from, to, step: 0.1, target: x, ask: "read" }, parts(x));
  const place = (from, to, x) => it({ kind: "numberline", from, to, step: 0.1, target: x, ask: "place" }, x);

  // ───────────── p.111–112: tenths, the decimal point ─────────────

  wio({
    page: 111, slug: "tenths", type: "fraction_play", title: "লিটারের দশ ভাগের কত ভাগ পানি, রং করি ও ভগ্নাংশে লিখি",
    items: [
      it({ kind: "fname", n: 3, d: 10, shape: "bar", unit: "লিটার" }, [3, 10]), // ৩য় মগ: ৩/১০ লিটার
      it({ kind: "fshade", n: 3, d: 10, shape: "bar" }, 3),
      it({ kind: "fname", n: 1, d: 10, shape: "bar", unit: "লিটার" }, [1, 10]), // ১/১০ লিটার = ০.১ লিটার (the beaker's dark tenth)
      it({ kind: "fshade", n: 1, d: 10, shape: "bar" }, 1),
      it({ kind: "fmixed", a: "23/10", ask: "tomixed", look: "bar" }, [2, 3]), // the three mugs: ২ লিটার এবং ০.৩ লিটার
      it({ kind: "fname", n: 9, d: 10, shape: "bar", unit: "লিটার" }, [9, 10]), it({ kind: "fname", n: 4, d: 10, shape: "bar", unit: "লিটার" }, [4, 10]), // p.112 কাজ ১ (১), (২)
      it({ kind: "fmixed", a: "14/10", ask: "tomixed", look: "bar" }, [1, 4]), it({ kind: "fmixed", a: "37/10", ask: "tomixed", look: "bar" }, [3, 7]), // p.112 কাজ ১ (৩), (৪)
    ],
    fresh: { skill: "fshade", count: 5, den: 10 },
    src: "p.111 মূল প্রশ্ন (তিনটি মগ: ৩য় মগে ৩/১০ লিটার; মোট ২ লিটার এবং ০.৩ লিটার) and ১/১০ লিটার = ০.১ লিটার, with p.112 কাজ ১'s four glasses (৯/১০, ৪/১০, ১ ৪/১০, ৩ ৭/১০ লিটার: the tenths that p.112 writes as ০.৯, ০.৪, ১.৪, ৩.৭); then 5 fresh shading rounds",
    notes: ["১ লিটারের ১/১০ অংশ = ০.১ লিটার; ৩/১০ লিটার = ০.৩ লিটার; ২ লিটার এবং ০.৩ লিটার = ২.৩ লিটার।"],
  });

  mcq({
    page: 111, slug: "decimal-point", title: "দশমিক ভগ্নাংশ, দশমিক বিন্দু ও দশমাংশ চিনি",
    questions: [
      q({ prompt: "1 লিটারের 1/10 অংশের সমান পরিমাণকে কী বলে?", options: ["0.1 লিটার", "1.1 লিটার", "10 লিটার"], answer: "0.1 লিটার", why: "1 লিটারের 1/10 অংশের সমান পরিমাণকে 0.1 লিটার বলে।" }),
      q({ prompt: "0.1 লিটারকে কথায় কীভাবে পড়ি ও লিখি?", options: ["শূন্য দশমিক এক লিটার", "এক দশমিক শূন্য লিটার", "দশ লিটার"], answer: "শূন্য দশমিক এক লিটার", why: "0.1 লিটারকে কথায় ‘শূন্য দশমিক এক লিটার’ পড়া এবং লেখা হয়।" }),
      q({ prompt: "৩য় মগটিতে পানির পরিমাণ 3/10 লিটার। দশমিকে লিখলে কত লিটার?", options: ["0.3 লিটার", "3.0 লিটার", "3.1 লিটার", "1.3 লিটার"], answer: "0.3 লিটার", why: "3/10 লিটার হলো 0.1 লিটার এর 3 গুণ। অতএব, এটি 0.3 লিটার।" }),
      q({ prompt: "3/10 লিটার হলো 0.1 লিটার এর কত গুণ?", options: ["3 গুণ", "10 গুণ", "13 গুণ", "30 গুণ"], answer: "3 গুণ", num: 3, why: "3/10 = তিনটি 1/10, আর 1/10 লিটার = 0.1 লিটার।" }),
      q({ prompt: "মগে 2 লিটার এবং 0.3 লিটার পানি আছে। একসাথে কত লিটার?", options: ["2.3 লিটার", "0.23 লিটার", "3.2 লিটার", "23 লিটার"], answer: "2.3 লিটার", why: "‘2 লিটার এবং 0.3 লিটার’ পানিকে আমরা 2.3 দিয়ে প্রকাশ করতে পারি।" }),
      q({ prompt: "2.3 লিটারকে কথায় কী বলি?", options: ["2 দশমিক 3 লিটার", "3 দশমিক 2 লিটার", "23 লিটার"], answer: "2 দশমিক 3 লিটার", why: "2.3 লিটারকে কথায় ‘2 দশমিক 3 লিটার’ বলতে পারি।" }),
      q({ prompt: "সংখ্যার মাঝের বিন্দুকে (.) কী বলে?", options: ["দশমিক বিন্দু", "দশমাংশ", "পূর্ণসংখ্যা"], answer: "দশমিক বিন্দু", why: "সংখ্যার মাঝের বিন্দুকে (.) আমরা দশমিক বিন্দু বলি।" }),
      q({ prompt: "0.1, 0.3, 2.3 ইত্যাদিকে কী বলে?", options: ["দশমিক ভগ্নাংশ", "পূর্ণসংখ্যা", "মিশ্র ভগ্নাংশ"], answer: "দশমিক ভগ্নাংশ", why: "0.1, 0.3, 2.3 ইত্যাদিকে আমরা দশমিক ভগ্নাংশ বলি।" }),
      q({ prompt: "দশমিক বিন্দুর ডানপাশের প্রথম অঙ্কের স্থানের নাম কী?", options: ["দশমাংশ", "একক", "দশক", "শতক"], answer: "দশমাংশ", why: "দশমিক বিন্দুর ডানপাশের প্রথম অঙ্কের স্থানের নাম দশমাংশ (পৃষ্ঠা 112)।" }),
      q({ prompt: "এক দশমাংশ কোনটি?", options: ["1/10 = 0.1", "1/10 = 1.0", "10/1 = 0.1"], answer: "1/10 = 0.1", why: "এক দশমাংশ = 1/10 = 0.1 (পৃষ্ঠা 112)।" }),
      q({ prompt: "ভগ্নাংশ ছাড়া 0, 1, 2 ইত্যাদি সংখ্যাকে কী বলে?", options: ["পূর্ণসংখ্যা", "দশমিক ভগ্নাংশ", "দশমাংশ"], answer: "পূর্ণসংখ্যা", why: "ভগ্নাংশ ছাড়া 0, 1, 2 ইত্যাদি সংখ্যাকে পূর্ণসংখ্যা বলে (পৃষ্ঠা 112)।" }),
    ],
    src: "p.111 (১/১০ লিটার = ০.১ লিটার, ‘শূন্য দশমিক এক লিটার’; ৩য় মগ ৩/১০ লিটার = ০.১ লিটার এর ৩ গুণ = ০.৩ লিটার; ২.৩ লিটার, ‘২ দশমিক ৩ লিটার’; the parrot: দশমিক ভগ্নাংশ, দশমিক বিন্দু) and p.112 (দশমাংশ, এক দশমাংশ = ১/১০ = ০.১, the girl: পূর্ণসংখ্যা); my options",
  });

  const L_ = (s) => `${s} লিটার`;
  match({
    page: 112, slug: "in-words", type: "number_match", title: "দশমিক ভগ্নাংশকে কথায় লেখার সাথে মিলাই",
    pairs: [
      [L_("0.9"), L_(say("0.9"))], [L_("0.4"), L_(say("0.4"))], [L_("1.4"), L_(say("1.4"))], [L_("3.7"), L_(say("3.7"))], // কাজ ১ (১)–(৪)
      [L_("0.1"), L_(say("0.1"))], [L_("0.3"), L_(say("0.3"))], [L_("2.3"), L_(say("2.3"))], // p.111
      ["0.6", say("0.6")], ["61.7", say("61.7")], ["11.3", say("11.3")], ["36.8", say("36.8")], // অনুশীলন ১'s decimals
    ],
    src: "p.112 কাজ ১ (the four glasses: ০.৯ লি, কথায় ‘শূন্য দশমিক নয় লিটার’ as printed, ০.৪, ১.৪, ৩.৭), p.111's ০.১, ০.৩, ২.৩ লিটার, and অনুশীলন ১'s ০.৬, ৬১.৭, ১১.৩, ৩৬.৮ in words",
  });
  note("p.111 writes ২.৩ লিটার in words as ‘২ দশমিক ৩ লিটার’ (a digit before দশমিক); p.112's own words are ‘শূন্য দশমিক নয় লিটার’, so p.112's match spells every number in words (‘দুই দশমিক তিন লিটার’); p.111's quiz keeps ‘২ দশমিক ৩ লিটার’ as printed.");

  sort({
    page: 112, slug: "decimal-whole", title: "সংখ্যাগুলোকে দশমিক সংখ্যা ও পূর্ণসংখ্যায় শ্রেণিবিন্যাস করি",
    categories: ["দশমিক সংখ্যা", "পূর্ণসংখ্যা"],
    items: [
      ["0.6", 0], ["61.7", 0], ["2", 1], ["4", 1], ["11.3", 0], ["36.8", 0], // অনুশীলন ১ as printed
      ["0", 1], ["1", 1], // the girl: ০, ১, ২ ইত্যাদি … পূর্ণসংখ্যা
      ["0.9", 0], ["1.4", 0], ["3.7", 0], ["2.3", 0], // কাজ ১'s glasses, p.111's mugs
    ],
    src: "p.112 অনুশীলন ১ (০.৬, ৬১.৭, ২, ৪, ১১.৩, ৩৬.৮ as printed), the girl's ০ and ১ (পূর্ণসংখ্যা), and the decimals of কাজ ১ (০.৯, ১.৪, ৩.৭) and p.111 (২.৩)",
  });

  // ───────────── p.113–114: সেমি ও মিমি, কেজি ও গ্রাম ─────────────

  wio({
    page: 113, slug: "cm-mm", type: "units_amounts", title: "মিলিমিটারকে সেন্টিমিটারে দশমিক ভগ্নাংশে প্রকাশ করি",
    items: [
      conv([[1, "mm"]], "cm", [0, 1]), // (২) ১ মিমি = ০.১ সেমি
      conv([[4, "mm"]], "cm", [0, 4]), // (৩) ৪ মিমি = ৪/১০ সেমি = ০.৪ সেমি
      conv([[7, "cm"], [4, "mm"]], "cm", [7, 4]), // (৪) ৭ সেমি ও ৪ মিমি = (৭ + ০.৪) সেমি
      conv([[0.1, "cm"]], "mm", 1), conv([[0.4, "cm"]], "mm", 4), conv([[7.4, "cm"]], ["cm", "mm"], [7, 4]), // the same, back
      conv([[12, "cm"], [5, "mm"]], "cm", [12, 5]), conv([[13, "cm"], [8, "mm"]], "cm", [13, 8]), // কাজ ১: পেনসিল, কলম (lengths mine)
      conv([[24, "cm"], [6, "mm"]], "cm", [24, 6]), conv([[20, "cm"], [4, "mm"]], "cm", [20, 4]), // কাজ ১: বইয়ের দৈর্ঘ্য, পানির বোতল (mine)
    ],
    src: "p.113 (২)–(৪) (১ মিমি, ৪ মিমি, ৭ সেমি ও ৪ মিমি = □ সেমি) and the same three written back (০.১ সেমি = □ মিমি, ০.৪ সেমি = □ মিমি, ৭.৪ সেমি = □ সেমি □ মিমি); কাজ ১'s table (পেনসিল, কলম, বইয়ের দৈর্ঘ্য, পানির বোতল: □ সেমি □ মিমি → □ সেমি) with lengths of mine (১২ সেমি ৫ মিমি, ১৩ সেমি ৮ মিমি, ২৪ সেমি ৬ মিমি, ২০ সেমি ৪ মিমি)",
  });
  cant("p.113 (১) and কাজ ১ (measure the red ribbon and my own pencil, pen, book and bottle with a ruler): the measuring is the child's own; the game changes each length into সেমি (the ribbon's ৭ সেমি ৪ মিমি in (৪); the table's four with lengths of mine). The same for p.119 দেখি পারি কি না ২ (the math book's দৈর্ঘ্য and প্রস্থ).");

  wio({
    page: 114, slug: "kg-g", type: "units_amounts", title: "গ্রামকে কেজিতে দশমিক ভগ্নাংশে প্রকাশ করি",
    items: [
      conv([[100, "g"]], "kg", [0, 1]), conv([[500, "g"]], "kg", [0, 5]), conv([[1, "kg"], [500, "g"]], "kg", [1, 5]), // কাজ ২ (১)–(৩)
      conv([[1, "kg"], [200, "g"]], "kg", [1, 2]), // the girl: ১ কেজি ২০০ গ্রাম চালকে আমরা ১.২ কেজি বলি
      conv([[1000, "g"]], "kg", 1), // the girl: ১০০০ গ্রাম = ১ কেজি
      conv([[0.1, "kg"]], "g", 100), conv([[0.5, "kg"]], "g", 500), conv([[1, "kg"]], "g", 1000), // the same, back
      conv([[1.5, "kg"]], ["kg", "g"], [1, 500]), conv([[1.2, "kg"]], ["kg", "g"], [1, 200]),
    ],
    src: "p.114 কাজ ২ (১)–(৩) (১০০ গ্রাম, ৫০০ গ্রাম, ১ কেজি ৫০০ গ্রাম = □ কেজি: the oranges), the girl's ১০০০ গ্রাম = ১ কেজি and ১ কেজি ২০০ গ্রাম = ১.২ কেজি, and the same written back (০.১ কেজি, ০.৫ কেজি, ১ কেজি = □ গ্রাম; ১.৫ কেজি, ১.২ কেজি = □ কেজি □ গ্রাম)",
  });
  cant("p.114 the boy's ১ গ্রাম = ১/১০০০ কেজি (a thousandth): the decimal rounds go to two places; not played. p.114 কাজ ৩ (১.৩ on the number line) is in p.115's number-line game.");

  // ───────────── p.115: the number line in tenths, how many ০.১ ─────────────

  wio({
    page: 115, slug: "number-line", type: "number_line", title: "সংখ্যারেখায় দশমিক সংখ্যা পড়ি ও বসাই",
    items: [
      read(0, 2, 0.1), read(0, 2, 1.7), read(2, 4, 2.2), read(2, 4, 3.8), // অনুশীলন ১: ক, খ, গ, ঘ
      place(0, 2, 0.9), place(0, 2, 0.5), place(2, 4, 2.6), place(2, 4, 3.2), // অনুশীলন ২
      place(0, 2, 1.3), // p.114 কাজ ৩: ১.৩ সংখ্যাটিকে সংখ্যারেখায় বসাই
      place(1, 3, 2.1), // কাজ ৬: ২.১ (ডানপাশে, তাই বড়ো)
    ],
    fresh: { skill: "numberline", count: 5 },
    src: "p.115 অনুশীলন ১ (ক, খ, গ, ঘ at ০.১, ১.৭, ২.২, ৩.৮, measured on the book's line) and ২ (০.৯, ০.৫, ২.৬, ৩.২), p.114 কাজ ৩ (১.৩) and p.115 কাজ ৬ (২.১, the number on the right); then 5 fresh lines in tenths",
  });
  note("p.115: the book's line runs from ০ to ৪.৪ in tenths (44 steps); a game line has at most 20, so the game's lines run from ০ to ২, ১ to ৩ or ২ to ৪, each with the number in it.");

  const tenths = (n, opts, want, why) => q({ prompt: n, options: opts.map(String), answer: String(want), why, ...(typeof want === "number" ? { num: want } : {}) });
  mcq({
    page: 115, slug: "how-many-tenths", title: "সংখ্যাটি কতটি দশমাংশ নিয়ে গঠিত, বলি",
    questions: [
      tenths("1 সংখ্যাটিতে কয়টি 0.1 রয়েছে?", [1, 10, 11, 100], 10, "সংখ্যারেখায় 0 থেকে 1 পর্যন্ত 10টি ছোটো ঘর, প্রতিটি 0.1।"),
      tenths("0.5 এ কয়টি 0.1 রয়েছে?", [5, 15, 50, 1], 5, "0.5 = 5টি 0.1।"),
      tenths("1.8 এ কয়টি 0.1 রয়েছে?", [8, 18, 81, 1], 18, "1 এ 10টি 0.1, আর 0.8 এ 8টি: মোট 18টি 0.1।"),
      tenths("3.3 এ কয়টি 0.1 রয়েছে?", [3, 6, 30, 33], 33, "3 এ 30টি 0.1, আর 0.3 এ 3টি: মোট 33টি 0.1।"),
      tenths("28টি 0.1 দ্বারা গঠিত সংখ্যাটি কোনটি?", ["2.8", "28", "8.2", "0.28"], "2.8", "20টি 0.1 মিলে 2, আর 8টি 0.1 মিলে 0.8: 2.8।"),
      tenths("30টি 0.1 দ্বারা গঠিত সংখ্যাটি কোনটি?", ["3.0", "30", "0.3", "3.3"], "3.0", "10টি 0.1 মিলে 1, তাই 30টি 0.1 মিলে 3, যা 3.0 রূপে লেখা যায়।"),
      tenths("কতটি 0.1 মিলে 4.7 হয়?", [4, 7, 47, 74], 47, "4 এ 40টি 0.1, আর 0.7 এ 7টি: মোট 47টি 0.1।"),
      tenths("কতটি 1 এবং 0.1 মিলে 5.3 হয়?", ["5টি 1 এবং 3টি 0.1", "3টি 1 এবং 5টি 0.1", "53টি 1", "5টি 1 এবং 30টি 0.1"], "5টি 1 এবং 3টি 0.1", "5.3 = 5 + 0.3: 5টি 1 এবং 3টি 0.1।"),
      tenths("2.1 সংখ্যাটি কয়টি 0.1 নিয়ে গঠিত?", [2, 12, 20, 21], 21, "2.1 সংখ্যাটি 21টি 0.1 নিয়ে গঠিত (পৃষ্ঠা 116)।"),
      tenths("1.3 সংখ্যাটি কয়টি 0.1 নিয়ে গঠিত?", [1, 3, 13, 31], 13, "1.3 সংখ্যাটি 13টি 0.1 নিয়ে গঠিত (পৃষ্ঠা 116)।"),
      q({ prompt: "2.1 এবং 1.3 এর মধ্যে কোনটি বড়ো?", options: ["2.1", "1.3"], answer: "2.1", why: "2.1 সংখ্যাটি 21টি এবং 1.3 সংখ্যাটি 13টি 0.1 নিয়ে গঠিত। সুতরাং, 2.1 > 1.3।" }),
    ],
    src: "p.115 কাজ ৪ (০.৫, ১.৮, ৩.৩ কতটি ০.১ নিয়ে গঠিত; the girl: ১ সংখ্যাটিতে ১০টি ০.১), কাজ ৫ (১)–(৪) (২৮টি ০.১, ৩০টি ০.১ (the girl: ২কে ২.০ রূপে), ৪.৭, ৫.৩) and কাজ ৬ (২.১ এবং ১.৩, with p.116's boy: ২১টি ও ১৩টি ০.১); my options",
  });
  cant("p.115 কাজ ৪–৫ (how many ০.১ make a number, and back): no round counts tenths into a box, so they are quiz questions.");

  // ───────────── p.116: comparing decimals and tenths ─────────────

  wio({
    page: 116, slug: "compare", title: "দশমিক সংখ্যা ও ভগ্নাংশের মাঝে সম্পর্ক প্রতীক বসাই",
    items: [
      cmp("2.1", "1.3"), // p.115 কাজ ৬ (the boy: ২.১ > ১.৩)
      cmp("2.4", "1.8"), cmp("3", "4.8"), cmp("2.1", "6.8"), cmp("0", "0.1"), // অনুশীলন ৩
      cmp("3/10", "0.4"), // কাজ ৭
      cmp("7/10", "0.9"), cmp("0.5", "5/10"), cmp("0.2", "6/10"), cmp("10/10", "0.8"), // অনুশীলন ৪
    ],
    src: "p.115 কাজ ৬ (২.১ এবং ১.৩, answered on p.116), p.116 অনুশীলন ৩ (২.৪ □ ১.৮, ৩ □ ৪.৮, ২.১ □ ৬.৮, ০ □ ০.১), কাজ ৭ (৩/১০ ও ০.৪) and অনুশীলন ৪ (৭/১০ □ ০.৯, ০.৫ □ ৫/১০, ০.২ □ ৬/১০, ১০/১০ □ ০.৮), each in the book's order",
  });

  match({
    page: 116, slug: "fraction-decimal", type: "number_match", title: "সাধারণ ভগ্নাংশকে দশমিক ভগ্নাংশের সাথে মিলাই",
    pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => [`${n}/10`, `0.${n}`]).concat([["10/10", "1"]]),
    src: "p.116 কাজ ৭'s number line (১/১০ … ১০/১০ above, ০.১ … ১ below: সাধারণ ভগ্নাংশ এবং দশমিক ভগ্নাংশের সম্পর্ক)",
  });

  // ───────────── p.117–118: adding and taking away ─────────────

  const POTS = "ক পাত্রে 0.5 লিটার এবং খ পাত্রে 0.3 লিটার পানি রয়েছে।";
  wio({
    page: 117, slug: "add-subtract", title: "দশমিক সংখ্যা পাশাপাশি যোগ এবং বিয়োগ করি",
    items: [
      dsum("0.5", "+", "0.3", "row", `${POTS} পাত্র দুইটিতে মোট কত লিটার পানি রয়েছে?`, "লিটার"), // মূল প্রশ্ন (০.৮ লিটার)
      dsum("0.5", "−", "0.3", "row", `${POTS} ক পাত্রে খ পাত্রের চেয়ে কতটুকু পানি বেশি রয়েছে?`, "লিটার"), // কাজ ১ (০.২ লিটার)
      row("0.5", "+", "0.2"), row("0.6", "+", "2.3"), row("0.5", "+", "0.5"), row("1.7", "+", "0.5"), // অনুশীলন ১ (১)–(৪)
      row("0.9", "−", "0.4"), row("2.8", "−", "0.3"), row("1", "−", "0.4"), row("1.5", "−", "0.7"), // অনুশীলন ১ (৫)–(৮)
    ],
    src: "p.117 মূল প্রশ্ন (ক পাত্রে ০.৫ লিটার, খ পাত্রে ০.৩ লিটার: মোট) and কাজ ১ (কতটুকু বেশি: the question with the মূল প্রশ্ন's first sentence before it), and অনুশীলন ১ (১)–(৮) (০.৫ + ০.২ … ১.৫ − ০.৭)",
  });

  wio({
    page: 118, slug: "columns", title: "দশমিক বিন্দু বরাবর রেখে উপরে নিচে যোগ ও বিয়োগ করি",
    items: [
      col("1.8", "+", "2.4"), col("2.3", "−", "0.7"), // কাজ ২ (১), (২)
      col("1.4", "+", "2.6"), col("8", "+", "4.5"), col("6", "−", "0.2"), col("3.6", "−", "2.8"), // কাজ ৩ (১)–(৪), the right way
      col("7.6", "+", "2.8"), col("7.5", "−", "4.8"), // p.119 দেখি পারি কি না ৫
      col("1.7", "+", "0.5"), col("1.5", "−", "0.7"), // p.117 অনুশীলন ১ (৪), (৮) in columns (the boy: উপর নিচেও … হিসাব করতে পারি)
    ],
    src: "p.118 কাজ ২ (১.৮ + ২.৪, ২.৩ − ০.৭) and কাজ ৩ (১)–(৪) (১.৪ + ২.৬, ৮ + ৪.৫, ৬ − ০.২, ৩.৬ − ২.৮: the ticked way, ৮কে ৮.০, ৬কে ৬.০ রূপে), p.119 দেখি পারি কি না ৫ (৭.৬ + ২.৮, ৭.৫ − ৪.৮) and p.117 অনুশীলন ১ (৪), (৮) in columns",
  });
  note("p.118 কাজ ৩ (২): the ticked sum ৮.০ + ৪.৫ is printed with the answer ৩.৫; it is ১২.৫, and the game's column round (৮ + ৪.৫) wants ১২.৫.");
  cant("p.118 কাজ ৩ (যাচাই করি): the crossed-out ways (৮ under the ৫ of ৪.৫ giving ৫.৩, ৬ under the ২ giving ০.৪, ৩.৬ − ২.৮ written ৮) can't be shown as mistakes (Find the Mistake takes whole numbers); the game works each sum the right way, the points lined up.");

  // ───────────── p.119: দেখি পারি কি না ─────────────

  wio({
    page: 119, slug: "review", title: "দেখি পারি কি না: সম্পর্ক প্রতীক বসাই ও দশমিক যোগ-বিয়োগ করি",
    items: [
      cmp("0.4", "0.7"), cmp("5.6", "6.5"), cmp("0.1", "0"), cmp("11", "1.1"), // ১ (১)–(৪)
      cmp("5/10", "0.5"), cmp("0.7", "3/10"), cmp("0.1", "3/10"), cmp("10/10", "1"), // ১ (৫)–(৮)
      row("0.8", "+", "0.2"), // ৩ (৮টি ০.১ + ২টি ০.১ = ১০টি ০.১)
      row("1.9", "−", "0.6"), // ৪ (১৯টি ০.১ − ৬টি ০.১ = ১৩টি ০.১)
    ],
    src: "p.119 দেখি পারি কি না ১ (১)–(৮) (০.৪ □ ০.৭ … ১০/১০ □ ১), ৩ (০.৮ এবং ০.২ এর যোগফল) and ৪ (১.৯ এবং ০.৬ এর বিয়োগফল); ৫'s two column sums are in p.118's game",
  });
  note("p.119 দেখি পারি কি না ৩ prints «০.৮ + ০ .২» (a space inside ০.২); the game reads ০.৮ + ০.২.");

  // ───────────── p.120: নিজে করি ─────────────

  wio({
    page: 120, slug: "compare-add", title: "নিজে করি: সম্পর্ক প্রতীক বসাই ও পাশাপাশি যোগ-বিয়োগ করি",
    items: [
      cmp("2.5", "4.9"), cmp("11.2", "23.4"), cmp("2.1", "2"), cmp("2", "1.9"), // ৩ (১)–(৪)
      cmp("3.4", "3.8"), cmp("1/10", "0.3"), cmp("5/10", "0.2"), cmp("7/10", "1.2"), // ৩ (৫)–(৮)
      row("0.7", "+", "0.9"), row("1.8", "+", "1.2"), row("2.5", "+", "1.7"), row("3", "+", "4.6"), // ৪ (১)–(৪)
      row("0.9", "−", "0.4"), row("2", "−", "0.6"), row("5", "−", "3.8"), row("7.6", "−", "2.6"), // ৪ (৫)–(৮)
    ],
    src: "p.120 নিজে করি ৩ (১)–(৮) (২.৫ □ ৪.৯ … ৭/১০ □ ১.২) and ৪ (১)–(৮) (০.৭ + ০.৯ … ৭.৬ − ২.৬)",
  });

  const SCHOOL = "সঞ্জয়ের বাড়ি বিদ্যালয় থেকে 3.1 কিলোমিটার (কিমি) পশ্চিমে অবস্থিত। শম্পার বাড়ি বিদ্যালয় থেকে 2 কিলোমিটার (কিমি) পূর্বে অবস্থিত।";
  wio({
    page: 120, slug: "columns-stories", title: "নিজে করি: উপরে নিচে যোগ-বিয়োগ করি ও দূরত্বের সমস্যা সমাধান করি",
    items: [
      col("3.7", "+", "2.8"), col("5.9", "+", "2.6"), col("4", "+", "1.4"), col("3.1", "+", "4.9"), col("0.9", "+", "0.4"), // ৫ (১)–(৫)
      col("4.1", "−", "2.8"), col("7.7", "−", "4.2"), col("9", "−", "5.5"), col("8.1", "−", "7.9"), col("0.7", "−", "0.7"), // ৬ (১)–(৫)
      dsum("3.1", "+", "2", "row", `${SCHOOL} সঞ্জয়ের বাড়ি থেকে শম্পার বাড়ির দূরত্ব কত কিমি?`, "কিমি"), // ৭ (১): ৫.১ কিমি
      dsum("3.1", "−", "2", "row", `${SCHOOL} বিদ্যালয় থেকে সঞ্জয়ের বাড়ির দূরত্ব শম্পার বাড়ির দূরত্ব অপেক্ষা কত কিলোমিটার বেশি?`, "কিলোমিটার"), // ৭ (২): ১.১
    ],
    src: "p.120 নিজে করি ৫ (১)–(৫) (৩.৭ + ২.৮ …) and ৬ (১)–(৫) (৪.১ − ২.৮ …) in columns, and ৭ (১)–(২) (সঞ্জয় ৩.১ কিমি পশ্চিমে, শম্পা ২ কিমি পূর্বে: the story and each question as printed)",
  });
  note("p.120 নিজে করি ৭: the story's second sentence ends with no দাঁড়ি in the book; the game's story ends it with «।». (১) the two houses lie on either side of the school: ৩.১ + ২ = ৫.১ কিমি; (২) ৩.১ − ২ = ১.১ কিলোমিটার.");

  match({
    page: 120, slug: "figures-words", type: "number_match", title: "দশমিক সংখ্যা অঙ্কে ও কথায় লিখি",
    pairs: ["5.7", "18.3", "0.8", "1.4", "17.6", "0.9", "2.5", "4.9", "11.2", "23.4"].map((s) => [s, say(s)]),
    src: "p.120 নিজে করি ১ (পাঁচ দশমিক সাত, আঠারো দশমিক তিন, শূন্য দশমিক আট → অঙ্কে) and ২ (১.৪, ১৭.৬, ০.৯ → কথায়), with ৩'s ২.৫, ৪.৯, ১১.২, ২৩.৪ in words too",
  });
};
