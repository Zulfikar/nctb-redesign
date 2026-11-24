// Pages ১২১–১৩২ (অধ্যায় ৯ · পরিমাপ, its first half), written by Claude (helper for pp. 121–142), 24 Nov 2026.
// The book: ../class4-math-redesign/content/p121-132.js (+ .parts.js for the ruler, the column sums and the squared paper).
// p.121–124: দৈর্ঘ্য (কিমি, মি, সেমি, মিমি: 16 km in metres, the bridge, উষাতন চাকমার উচ্চতা, the pencil on the ruler,
// the marathon, adding and taking away lengths in columns, the hospital–market–post office distances); p.125: পরিসীমা
// (a rectangle 5 × 3, a square of 4); p.126–128: ওজন (25 kg of rice in grams, the weights, adding and taking away kg and
// g); p.129: তরল পদার্থের আয়তন (লিটার, ডেসিলিটার, মিলিলিটার); p.130–132: ক্ষেত্রফল (comparing two shapes, the square
// centimetre, counting squares on squared paper).
"use strict";
module.exports = (L) => {
  const { it, wio, mcq, q, match, note, cant } = L;
  // a change of unit (convert): from [[n, unit], …] to a unit or [big, small]
  const conv = (from, to, want) => it({ kind: "convert", from, to }, want);
  // amounts in two units added or taken away (units): terms [[big, small], …], ops; a story optional
  const amt = (unit, terms, ops, want, o = {}) => it({ kind: "units", unit, terms, ops, ...o }, want);
  const story = (text, sum, unit, want) => it({ kind: "word", text, sum, ...(unit ? { unit } : {}) }, want);
  // a shape on squared paper: its squares from a list of [x, y, w, h] blocks
  const cellsOf = (...blocks) => blocks.flatMap(([x0, y0, w, h]) => { const c = []; for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) c.push([x, y]); return c; });
  const area = (cells, want, o = {}) => it({ kind: "area", ask: "area", cells, unit: "সেমি", ...o }, want);
  const perim = (cells, want, o = {}) => it({ kind: "area", ask: "perimeter", cells, unit: "সেমি", ...o }, want);
  const make = (squares, rect, want = "made") => it({ kind: "area", ask: "make", squares, rect, w: 10, h: 6, unit: "সেমি" }, want);

  // ───────────── p.121–124: দৈর্ঘ্য ─────────────

  wio({
    page: 121, slug: "length-units", type: "units_amounts", title: "দৈর্ঘ্যের এককগুলোর সম্পর্ক জেনে মিটারে প্রকাশ করি",
    items: [
      conv([[16, "km"]], "m", 16000), // মূল প্রশ্ন (printed: ১৬০০০ মিটার)
      conv([[1, "km"]], "m", 1000), conv([[1, "m"]], "cm", 100), conv([[1, "cm"]], "mm", 10), // the table
      conv([[16000, "m"]], "km", 16), conv([[1000, "m"]], "km", 1), conv([[100, "cm"]], "m", 1), conv([[10, "mm"]], "cm", 1), // the table read back
    ],
    fresh: { skill: "convert", count: 5, unit: "length" },
    src: "p.121 মূল প্রশ্ন (১৬ কিলোমিটার রাস্তা in metres, printed ১৬০০০ মিটার) and the table of units (১ কিমি = ১০০০ মি, ১ মি = ১০০ সেমি, ১ সেমি = ১০ মিমি), then the same four read back up the table (mine); then 5 fresh changes of a length's unit",
  });

  wio({
    page: 122, slug: "to-m-cm-mm", type: "units_amounts", title: "সেতুর দৈর্ঘ্য ও উচ্চতাকে মিটার, সেন্টিমিটার ও মিলিমিটারে প্রকাশ করি",
    items: [
      conv([[4, "km"]], "m", 4000), conv([[4, "km"], [800, "m"]], "m", 4800), // কাজ ১ (printed: ৪০০০ মিটার, ৪৮০০ মিটার)
      conv([[3, "km"], [250, "m"]], "m", 3250), conv([[4, "m"], [25, "cm"]], "cm", 425), // অনুশীলন ১ (১)–(২)
      conv([[1, "m"]], "cm", 100), conv([[1, "m"], [60, "cm"]], "cm", 160), // কাজ ২ (১)
      conv([[1, "cm"]], "mm", 10), conv([[160, "cm"]], "mm", 1600), conv([[1, "m"], [60, "cm"]], "mm", 1600), // কাজ ২ (২)
      conv([[4, "m"], [58, "cm"]], "cm", 458), conv([[5, "m"], [7, "cm"]], "cm", 507), // অনুশীলন ২ (১)–(২)
    ],
    fresh: { skill: "convert", count: 5, unit: "length" },
    src: "p.122 কাজ ১ (সেতু ৪ কিমি ৮০০ মি: ৪ কিমি = ৪০০০ মি, then ৪৮০০ মি), অনুশীলন ১ (৩ কিমি ২৫০ মি, ৪ মি ২৫ সেমি), কাজ ২ (উষাতন চাকমার উচ্চতা ১ মি ৬০ সেমি: each box of (১) and (২)), অনুশীলন ২ (৪ মি ৫৮ সেমি, ৫ মি ৭ সেমি); then 5 fresh changes of a length's unit",
  });

  match({
    page: 122, slug: "same-length", title: "সমান দৈর্ঘ্যগুলো মিলাই",
    pairs: [
      ["16 কিমি", "16000 মি"], ["4 কিমি 800 মি", "4800 মি"], ["3 কিমি 250 মি", "3250 মি"], ["4 মি 25 সেমি", "425 সেমি"],
      ["1 মি 60 সেমি", "160 সেমি"], ["4 মি 58 সেমি", "458 সেমি"], ["5 মি 7 সেমি", "507 সেমি"], ["7 সেমি 9 মিমি", "79 মিমি"],
      ["589 মি 75 সেমি", "58975 সেমি"], ["42 কিমি 195 মি", "42195 মি"],
    ],
    src: "the lengths of p.121 (১৬ কিমি), p.122 (কাজ ১, অনুশীলন ১, কাজ ২, অনুশীলন ২) and p.123 (the pencil ৭ সেমি ৯ মিমি, কাজ ৪ ৫৮৯ মি ৭৫ সেমি, অনুশীলন ৪ the marathon ৪২ কিমি ১৯৫ মি), each with its other form",
  });

  wio({
    page: 123, slug: "pencil-marathon", title: "পেনসিল ও দৌড়ের পথের দৈর্ঘ্য অন্য এককে প্রকাশ করি",
    items: [
      it({ kind: "measure", tool: "ruler", mm: true, value: 79, emoji: "✏️" }, [7, 9]), // কাজ ৩: the pencil (the boy: ৭ সেমি ও ৯ মিমি)
      conv([[1, "cm"]], "mm", 10), // the girl: ১ সেমি = ১০ মিমি
      conv([[7, "cm"], [9, "mm"]], "mm", 79), // পেনসিলের দৈর্ঘ্য = ৭০ মিমি + ৯ মিমি = ৭৯ মিমি
      conv([[79, "mm"]], ["cm", "mm"], [7, 9]),
      conv([[7, "cm"], [9, "mm"]], "cm", [7, 9]), // ৭.৯ সেমি (chapter ৮'s decimal)
      conv([[589, "m"]], "cm", 58900), conv([[589, "m"], [75, "cm"]], "cm", 58975), // কাজ ৪ (৫৮৯ মি = ৫৮৯ × ১০০ সেমি; + ৭৫ সেমি)
      conv([[58975, "cm"]], ["m", "cm"], [589, 75]),
      conv([[42, "km"], [195, "m"]], "m", 42195), // অনুশীলন ৪ (the marathon)
      conv([[42195, "m"]], ["km", "m"], [42, 195]),
    ],
    fresh: { skill: "convert", count: 5, unit: "length" },
    src: "p.123 কাজ ৩ (the pencil on the ruler, ৭ সেমি ৯ মিমি, then the girl's ১ সেমি = ১০ মিমি and the boxes □ সেমি □ মিমি = □ মিমি; also as ৭.৯ সেমি), কাজ ৪ (৫৮৯ মি ৭৫ সেমি in সেমি, its two lines), অনুশীলন ৪ (ম্যারাথন ৪২ কিমি ১৯৫ মিটার in metres); each answer also changed back (mine); then 5 fresh changes of a length's unit",
  });
  cant("p.123 অনুশীলন ৩ (measuring a book, a খাতা, a rubber, a table, a brick in মি, সেমি, মিমি), p.125 মূল প্রশ্ন and অনুশীলন ২ (measuring the classroom table, a bench, the board, a book, the classroom for their perimeters): real-world measuring.");

  wio({
    page: 124, slug: "add-sub-length", type: "units_amounts", title: "দৈর্ঘ্যের একই একক ঠিক রেখে যোগ ও বিয়োগ করি",
    items: [
      amt("km", [[2, 360], [0, 575]], ["+"], [2, 935], { layout: "column" }), // কাজ ৫ (printed: ২ কিমি ৯৩৫ মি)
      amt("cm", [[55, 9], [8, 5]], ["+"], [64, 4], { layout: "column" }), // অনুশীলন ৫ (১)
      amt("m", [[735, 43], [277, 37]], ["−"], [458, 6], { layout: "column" }), // (২)
      amt("km", [[73, 199], [49, 78]], ["−"], [24, 121], { layout: "column" }), // (৩)
      amt("cm", [[33, 6], [21, 3]], ["+"], [54, 9], { layout: "row" }), // (৪)
      amt("m", [[56, 55], [18, 65]], ["+"], [75, 20], { layout: "row" }), // (৫)
      amt("km", [[45, 250], [24, 500]], ["−"], [20, 750], { layout: "row" }), // (৬)
      amt("km", [[5, 320], [2, 480]], ["−"], [2, 840], { layout: "row" }), // (৭)
    ],
    fresh: { skill: "units", count: 5, unit: "length" },
    src: "p.124 কাজ ৫ (২ কিমি ৩৬০ মি + ৫৭৫ মি in columns, printed ২ কিমি ৯৩৫ মি) and অনুশীলন ৫ (১)–(৩) in columns, (৪)–(৭) in a row as printed; then 5 fresh sums of lengths in two units",
  });

  wio({
    page: 124, slug: "distances", title: "দূরত্ব নির্ণয় করি ও সেন্টিমিটারে প্রকাশ করি",
    items: [
      amt("km", [[2, 360], [0, 575]], ["+"], [2, 935], { layout: "column", text: "মাসুদ বাড়ি থেকে 2 কিমি 360 মি রাস্তা রিকশায় এবং 575 মি রাস্তা পায়ে হেঁটে স্কুলে যায়। মাসুদের বাড়ির থেকে স্কুলের দূরত্ব নির্ণয় করি।" }), // কাজ ৫
      story("সাদিদ তার বাড়ি থেকে 280 মিটার পথ হেঁটে ও 550 মিটার পথ রিকশায় চড়ে বিদ্যালয়ে যায়। বিদ্যালয়ে যেতে সে কত সেমি পথ অতিক্রম করে?", "(280 + 550) × 100", "সেমি", 83000), // অনুশীলন ৬
      story("হাসপাতাল থেকে একই দিকে বাজারের দূরত্ব 845 মি এবং পোস্ট অফিসের দূরত্ব 1 কিমি 200 মি। বাজার থেকে পোস্ট অফিসের দূরত্ব বের করে ‘সেমি’-এ প্রকাশ করি।", "(1200 − 845) × 100", "সেমি", 35500), // অনুশীলন ৭
      amt("km", [[1, 200], [0, 845]], ["−"], [0, 355], { layout: "column" }), // অনুশীলন ৭ worked with the units
      conv([[355, "m"]], "cm", 35500),
    ],
    fresh: { skill: "units", count: 5, unit: "length" },
    src: "p.124 কাজ ৫ (মাসুদ: the story as printed, in columns), অনুশীলন ৬ (সাদিদ: ২৮০ মি + ৫৫০ মি, asked in সেমি: (২৮০ + ৫৫০) × ১০০) and অনুশীলন ৭ (the hospital, the market and the post office: (১২০০ − ৮৪৫) × ১০০, then the same worked in columns, ১ কিমি ২০০ মি − ৮৪৫ মি = ৩৫৫ মি, and ৩৫৫ মি in সেমি), stories as printed; then 5 fresh sums of lengths in two units",
  });
  note("p.124 অনুশীলন ৬–৭ ask the distance in সেমি: the word rounds work it in metres first (১ কিমি ২০০ মি = ১২০০ মি), then × ১০০: সাদিদ ৮৩০ মি = ৮৩০০০ সেমি; বাজার থেকে পোস্ট অফিস ৩৫৫ মি = ৩৫৫০০ সেমি.");

  // ───────────── p.125: পরিসীমা ─────────────

  wio({
    page: 125, slug: "perimeter", type: "angles_dots", title: "আয়ত ও বর্গের চারপাশের বাহুগুলো গুনে পরিসীমা নির্ণয় করি",
    items: [
      perim(cellsOf([1, 1, 5, 3]), 16, { text: "নিচের আয়ত এবং বর্গের পরিসীমা নির্ণয় করি।" }), // অনুশীলন ১ ক) ৫ সেমি × ৩ সেমি
      perim(cellsOf([1, 1, 4, 4]), 16, { text: "নিচের আয়ত এবং বর্গের পরিসীমা নির্ণয় করি।" }), // খ) ৪ সেমি
      perim(cellsOf([1, 1, 3, 2]), 10), // p.132 অনুশীলন ১ ক (৩ × ২)
      perim(cellsOf([1, 1, 6, 4]), 20), // p.133 কাজ ৩ (৬ সেমি × ৪ সেমি)
      perim(cellsOf([1, 1, 8, 2]), 20), // p.142 নিজে করি ৭ (৩) (৮ সেমি × ২ সেমি)
    ],
    fresh: { skill: "area", count: 5 },
    src: "p.125 অনুশীলন ১ (ক) the rectangle ৫ সেমি × ৩ সেমি, খ) the square of ৪ সেমি, drawn on 1 সেমি squared paper; the instruction as printed), then the perimeters of three rectangles from later pages of the chapter (p.132 ক ৩ × ২, p.133 ৬ × ৪, p.142 ৭ (৩) ৮ × ২: the perimeters mine); then 5 fresh squared-paper rounds",
  });

  mcq({
    page: 125, slug: "what-perimeter", title: "পরিসীমা কী তা বুঝি ও হিসাব করি",
    questions: [
      q({ prompt: "একটি টেবিলের চারপাশের মোট দৈর্ঘ্যকে কী বলে?", options: ["পরিসীমা", "ক্ষেত্রফল", "ওজন", "উচ্চতা"], answer: "পরিসীমা", why: "কোনো আকৃতির বাহুগুলোর মোট দৈর্ঘ্যই হলো ঐ আকৃতির পরিসীমা।" }),
      q({ prompt: "কোনো আকৃতির বাহুগুলোর মোট দৈর্ঘ্যকে কী বলে?", options: ["পরিসীমা", "প্রস্থ", "ক্ষেত্র", "বাহু"], answer: "পরিসীমা", why: "কোনো আকৃতির বাহুগুলোর মোট দৈর্ঘ্যই হলো ঐ আকৃতির পরিসীমা।" }),
      q({ prompt: "একটি আয়তের দৈর্ঘ্য 5 সেমি এবং প্রস্থ 3 সেমি। এর পরিসীমা কত?", options: ["8 সেমি", "15 সেমি", "16 সেমি", "30 সেমি"], answer: "16 সেমি", num: 16, why: "5 সেমি + 3 সেমি + 5 সেমি + 3 সেমি = 16 সেমি।" }),
      q({ prompt: "একটি বর্গের প্রতিটি বাহু 4 সেমি। এর পরিসীমা কত?", options: ["4 সেমি", "8 সেমি", "12 সেমি", "16 সেমি"], answer: "16 সেমি", num: 16, why: "বর্গের চারটি বাহু সমান: 4 সেমি + 4 সেমি + 4 সেমি + 4 সেমি = 16 সেমি।" }),
      q({ prompt: "টেবিলের চারধারের মোট দৈর্ঘ্য বের করতে কয়টি বাহুর দৈর্ঘ্য যোগ করতে হয়?", options: ["2টি", "3টি", "4টি", "6টি"], answer: "4টি", num: 4, why: "টেবিলের উপরের দিকটি একটি আয়ত; এর 4টি বাহু: □ সেমি + □ সেমি + □ সেমি + □ সেমি।" }),
      q({ prompt: "12 মি দৈর্ঘ্য ও 8 মি প্রস্থবিশিষ্ট একটি দেয়ালের পরিসীমা কত?", options: ["20 মি", "32 মি", "40 মি", "96 মি"], answer: "40 মি", num: 40, why: "12 মি + 8 মি + 12 মি + 8 মি = 40 মি।" }),
      q({ prompt: "একটি বেঞ্চের দৈর্ঘ্য 150 সেমি এবং প্রস্থ 30 সেমি। এর পরিসীমা কত?", options: ["180 সেমি", "330 সেমি", "360 সেমি", "4500 সেমি"], answer: "360 সেমি", num: 360, why: "150 + 30 + 150 + 30 = 360 সেমি।" }),
      q({ prompt: "একটি বইয়ের দৈর্ঘ্য 26 সেমি এবং প্রস্থ 19 সেমি। এর পরিসীমা কত?", options: ["45 সেমি", "64 সেমি", "90 সেমি", "494 সেমি"], answer: "90 সেমি", num: 90, why: "26 + 19 + 26 + 19 = 90 সেমি।" }),
      q({ prompt: "একটি বোর্ডের দৈর্ঘ্য 240 সেমি এবং প্রস্থ 120 সেমি। এর পরিসীমা কত?", options: ["360 সেমি", "480 সেমি", "600 সেমি", "720 সেমি"], answer: "720 সেমি", num: 720, why: "240 + 120 + 240 + 120 = 720 সেমি।" }),
      q({ prompt: "একটি শ্রেণিকক্ষের দৈর্ঘ্য 8 মি এবং প্রস্থ 7 মি। এর পরিসীমা কত?", options: ["15 মি", "30 মি", "56 মি", "60 মি"], answer: "30 মি", num: 30, why: "8 মি + 7 মি + 8 মি + 7 মি = 30 মি।" }),
    ],
    src: "p.125 মূল প্রশ্ন (টেবিলের চারপাশের মোট দৈর্ঘ্য: পরিসীমা), the parrot's sentence, the table's four sides (□ + □ + □ + □), অনুশীলন ১ ক) and খ) (১৬ সেমি each), p.141 নিজে করি ১ (৫) (the wall, ৪০ মি), and অনুশীলন ২'s table (বেঞ্চ, বোর্ড, বই, শ্রেণিকক্ষ) with sizes of mine; the options are mine",
  });
  note("p.125 অনুশীলন ২ (বেঞ্চ, বোর্ড, বই, শ্রেণিকক্ষ: the children measure them): the quiz gives each a sensible size of mine (বেঞ্চ ১৫০ × ৩০ সেমি, বই ২৬ × ১৯ সেমি, বোর্ড ২৪০ × ১২০ সেমি, শ্রেণিকক্ষ ৮ × ৭ মি as on p.135) and asks its perimeter.");

  // ───────────── p.126–128: ওজন ─────────────

  wio({
    page: 126, slug: "to-grams", type: "units_amounts", title: "চালের বস্তা ও সবজির ব্যাগের ওজন গ্রামে প্রকাশ করি",
    items: [
      conv([[1, "kg"]], "g", 1000), // ১ কিলোগ্রাম (কেজি) = ১০০০ গ্রাম
      conv([[25, "kg"]], "g", 25000), // মূল প্রশ্ন (printed: ২৫০০০ গ্রাম)
      conv([[6, "kg"]], "g", 6000), conv([[6, "kg"], [258, "g"]], "g", 6258), // কাজ ১ (৬ কেজি = (৬ × ১০০০) গ্রাম; + ২৫৮ গ্রাম)
      conv([[25000, "g"]], "kg", 25), conv([[6258, "g"]], ["kg", "g"], [6, 258]),
    ],
    fresh: { skill: "convert", count: 5, unit: "weight" },
    src: "p.126 ওজনের একক (১ কেজি = ১০০০ গ্রাম), মূল প্রশ্ন (২৫ কেজি চালের বস্তা, printed ২৫০০০ গ্রাম), কাজ ১ (সবজিভর্তি ব্যাগ ৬ কেজি ২৫৮ গ্রাম: its two lines); both answers changed back (mine); then 5 fresh changes of a weight's unit",
  });

  wio({
    page: 127, slug: "weights", title: "বাটখারা বেছে নিয়ে জিনিসের ওজন গ্রামে প্রকাশ করি",
    items: [
      it({ kind: "measure", tool: "balance", kg: true, weights: [1000, 500, 50, 20, 5], emoji: "🐟" }, [1, 575]), // the worked row: ১ কেজি, ৫০০, ৫০, ২০, ৫ গ্রা
      conv([[1, "kg"], [575, "g"]], "g", 1575), // printed: ১৫৭৫ গ্রাম
      it({ kind: "measure", tool: "balance", ask: "weigh", value: 2500, fewest: true, emoji: "🍊" }, 2500), conv([[2, "kg"], [500, "g"]], "g", 2500),
      it({ kind: "measure", tool: "balance", ask: "weigh", value: 3325, fewest: true, emoji: "🎃" }, 3325), conv([[3, "kg"], [325, "g"]], "g", 3325),
      it({ kind: "measure", tool: "balance", ask: "weigh", value: 4815, fewest: true, emoji: "🧺" }, 4815), conv([[4, "kg"], [815, "g"]], "g", 4815),
      it({ kind: "measure", tool: "balance", ask: "weigh", value: 1575, fewest: true, emoji: "🐟" }, 1575),
      amt("kg", [[3, 400], [0, 900]], ["−"], [2, 500], { text: "একটি তরমুজের ওজন 3 কেজি 400 গ্রাম এবং একটি পেঁপের ওজন 900 গ্রাম। পেঁপে থেকে তরমুজের ওজন কত বেশি?" }), // কাজ ৩ (p.128 prints ২ কেজি ৫০০ গ্রাম)
    ],
    src: "p.127 কাজ ২, the table row by row: the fish (১ কেজি ৫৭৫ গ্রাম: the shown weights read off the balance, then in গ্রাম, printed ১৫৭৫ গ্রাম), the orange box (২ কেজি ৫০০ গ্রাম), the pumpkin (৩ কেজি ৩২৫ গ্রাম), the fruit basket (৪ কেজি ৮১৫ গ্রাম): the fewest আদর্শ বাটখারা put on, then the weight in গ্রাম; the fish weighed again with the fewest weights; then কাজ ৩ (তরমুজ ও পেঁপে, the story as printed; worked on p.128)",
  });

  wio({
    page: 128, slug: "add-sub-weight", type: "units_amounts", title: "কেজি ও গ্রামের যোগ ও বিয়োগ করি",
    items: [
      amt("kg", [[3, 400], [0, 900]], ["−"], [2, 500], { layout: "column" }), // p.127 কাজ ৩ worked here (১ কেজি = ১০০০ গ্রাম moved)
      amt("kg", [[2, 450], [3, 800]], ["+"], [6, 250], { layout: "column" }), // অনুশীলন ১ (১)
      amt("kg", [[1, 655], [4, 750]], ["+"], [6, 405], { layout: "column" }), // (২)
      amt("kg", [[5, 220], [2, 650]], ["−"], [2, 570], { layout: "column" }), // (৩)
      amt("kg", [[2, 380], [1, 550]], ["+"], [3, 930], { layout: "row" }), // (৪)
      amt("kg", [[7, 670], [0, 880]], ["+"], [8, 550], { layout: "row" }), // (৫)
      amt("kg", [[8, 785], [2, 450]], ["−"], [6, 335], { layout: "row" }), // (৬)
      amt("kg", [[12, 425], [0, 835]], ["−"], [11, 590], { layout: "row" }), // (৭)
      amt("kg", [[2, 135], [0, 920], [1, 650]], ["+", "+"], [4, 705], { text: "একটি লাউয়ের ওজন 2 কেজি 135 গ্রাম, একটি মাছের ওজন 920 গ্রাম এবং এক ঝুড়ি পেঁয়াজের ওজন 1 কেজি 650 গ্রাম। দ্রব্যগুলোর ওজন একত্র করে তা ‘কেজি’ এবং ‘গ্রাম’-এ প্রকাশ করি।" }), // অনুশীলন ২
      amt("kg", [[3, 650], [1, 400]], ["−"], [2, 250], { layout: "row" }), // অনুশীলন ৩
    ],
    fresh: { skill: "units", count: 5, unit: "weight" },
    src: "p.128 the worked subtraction (৩ কেজি ৪০০ গ্রাম − ৯০০ গ্রাম in columns, printed ২ কেজি ৫০০ গ্রাম), অনুশীলন ১ (১)–(৩) in columns and (৪)–(৭) in a row as printed, অনুশীলন ২ (the three goods' printed weights in a story of mine: লাউ, মাছ, পেঁয়াজ as drawn), অনুশীলন ৩ (৩ কেজি ৬৫০ গ্রা − ১ কেজি ৪০০ গ্রা); then 5 fresh sums of weights in কেজি and গ্রাম",
  });
  cant("p.128 অনুশীলন ৩ “গাণিতিক বাক্যটি দিয়ে একটি গল্প তৈরি করি” (the child's own story): the game plays the number sentence (৩ কেজি ৬৫০ গ্রা − ১ কেজি ৪০০ গ্রা = ২ কেজি ২৫০ গ্রাম).");

  // ───────────── p.129: তরল পদার্থের আয়তন ─────────────

  wio({
    page: 129, slug: "litre-units", type: "units_amounts", title: "লিটার, ডেসিলিটার ও মিলিলিটারে প্রকাশ করি",
    items: [
      conv([[1, "l"]], "ml", 1000), // the juice bottle: ১ লিটার বা ১০০০ মিলি
      conv([[500, "ml"]], "dl", 5), // ৫০০ মিলি বা ৫ ডেলি
      conv([[250, "ml"]], "dl", [2, 5]), // ২৫০ মিলি বা ২.৫ ডেলি
      conv([[200, "ml"]], "dl", 2), // ২০০ মিলি বা ২ ডেলি
      conv([[5, "ml"]], "dl", [0, 5]), // ৫ মিলি বা ০.০৫ ডেলি
      conv([[1, "l"]], "dl", 10), conv([[1, "dl"]], "ml", 100), // the table: ১ লি = ১০ ডেলি, ১ ডেলি = ১০০ মিলি
      amt("l", [[1, 0], [0, 300]], ["−"], [0, 700], { text: "সজল 1 লিটার দুধ কিনে তা থেকে 300 মিলি পান করল। সজলের কাছে আর কতটুকু দুধ অবশিষ্ট রয়েছে?" }), // কাজ ২ (মুমু: ৭০০ মিলি)
      conv([[300, "ml"]], "l", [0, 3]), // মিঠুন: ৩০০ মিলি = ০.৩ লি
      conv([[700, "ml"]], "l", [0, 7]), // মিঠুন: অবশিষ্ট ০.৭ লি
    ],
    fresh: { skill: "convert", count: 5, unit: "volume" },
    src: "p.129 the five things' volumes (১ লিটার = ১০০০ মিলি; ৫০০ মিলি = ৫ ডেলি; ২৫০ মিলি = ২.৫ ডেলি; ২০০ মিলি = ২ ডেলি; ৫ মিলি = ০.০৫ ডেলি), the table (১ লি = ১০ ডেলি, ১ ডেলি = ১০০ মিলি), কাজ ২ (সজলের দুধ: the story as printed up to its question, মুমু's ৭০০ মিলি, then মিঠুন's ৩০০ মিলি = ০.৩ লি and ০.৭ লি); then 5 fresh changes of a volume's unit",
  });
  note("p.129 কাজ ২ ends «… তা বন্ধুদের সঙ্গে আলোচনা করি»: the story round stops at the question («… কতটুকু দুধ অবশিষ্ট রয়েছে?»); মুমু's way (৭০০ মিলি) is the story round, মিঠুন's (০.৩ লি, ০.৭ লি) two change-of-unit rounds.");

  wio({
    page: 129, slug: "measuring-jug", type: "measure_it", title: "মাপনী দিয়ে পানির পরিমাণ মেপে দেখি",
    items: [
      it({ kind: "measure", tool: "jug", value: 1000, ask: "read" }, 1000), it({ kind: "measure", tool: "jug", value: 500, ask: "read" }, 500),
      it({ kind: "measure", tool: "jug", value: 250, ask: "read" }, 250), it({ kind: "measure", tool: "jug", value: 200, ask: "read" }, 200),
      it({ kind: "measure", tool: "jug", value: 1000, ask: "fill" }, 1000), it({ kind: "measure", tool: "jug", value: 500, ask: "fill" }, 500),
      it({ kind: "measure", tool: "jug", value: 250, ask: "fill" }, 250), it({ kind: "measure", tool: "jug", value: 200, ask: "fill" }, 200),
      it({ kind: "measure", tool: "jug", value: 300, ask: "fill" }, 300), it({ kind: "measure", tool: "jug", value: 700, ask: "read" }, 700),
    ],
    src: "p.129 কাজ ১ (বোতলে পানির পরিমাণ ▭ মিলি, measured with a মাপনী) with the page's own bottles: the juice (১০০০ মিলি), the water bottles (৫০০ and ২৫০ মিলি), the hand wash (২০০ মিলি), each read and then poured; and কাজ ২ (সজল drinks ৩০০ মিলি, ৭০০ মিলি left)",
  });
  cant("p.129 কাজ ১ (each child measures the water in his own bottle; whose bottle holds the most): the jug rounds use the page's own bottles; the syringe's ৫ মিলি is too small for the jug (marked in 50 মিলি steps) and is a change-of-unit round (০.০৫ ডেলি).");

  match({
    page: 129, slug: "same-volume", title: "সমান পরিমাণ তরল মিলাই",
    pairs: [
      ["1 লিটার", "1000 মিলি"], ["500 মিলি", "5 ডেলি"], ["250 মিলি", "2.5 ডেলি"], ["200 মিলি", "2 ডেলি"], ["5 মিলি", "0.05 ডেলি"],
      ["1 ডেলি", "100 মিলি"], ["300 মিলি", "0.3 লি"], ["700 মিলি", "0.7 লি"], ["1.40 লি", "14 ডেলি"], ["2.65 লি", "2650 মিলি"],
    ],
    src: "p.129 the five things' volumes, the table (১ ডেলি = ১০০ মিলি) and কাজ ২ (৩০০ মিলি = ০.৩ লি, ০.৭ লি); p.140 দেখি পারি কি না ১ (১.৪০ লি = ১৪ ডেলি) and p.141 নিজে করি ২ (৫) (২.৬৫ লি = ২৬৫০ মিলি)",
  });

  // ───────────── p.130–132: ক্ষেত্রফল ─────────────

  mcq({
    page: 130, slug: "what-area", title: "ক্ষেত্র ও ক্ষেত্রফল কী তা বুঝি",
    questions: [
      q({ prompt: "কোনো আকৃতি যতটুকু জায়গা দখল করে সেটিকে কী বলে?", options: ["ক্ষেত্র", "পরিসীমা", "দৈর্ঘ্য", "বাহু"], answer: "ক্ষেত্র", why: "কোনো আকৃতি যতটুকু জায়গা দখল করে সেটিই তার ক্ষেত্র।" }),
      q({ prompt: "একটি আয়ত যে জায়গা দখল করে তাকে কী বলে?", options: ["আয়তক্ষেত্র", "পরিসীমা", "বাহু", "কোণ"], answer: "আয়তক্ষেত্র", why: "একটি আয়ত যে জায়গা দখল করে তা আয়তক্ষেত্র।" }),
      q({ prompt: "দুইটি আকৃতির কোনটি বেশি জায়গা দখল করে, তা কীভাবে তুলনা করা যায়?", options: ["একটির উপর আরেকটি রেখে", "দুইটির রং দেখে", "দুইটির ওজন মেপে"], answer: "একটির উপর আরেকটি রেখে", why: "পাতলা কাগজের উপর এঁকে নিয়ে, কেটে অথবা একটির উপর আরেকটি রেখে তুলনা করা যায়।" }),
      q({ prompt: "কোনো ক্ষেত্র যতটুকু পরিমাণ স্থান দখল করে, সেই পরিমাণ স্থানকে কী বলে?", options: ["ক্ষেত্রফল", "পরিসীমা", "দৈর্ঘ্য", "ওজন"], answer: "ক্ষেত্রফল", why: "কোনো ক্ষেত্র যতটুকু পরিমাণ স্থান দখল করে, সেই পরিমাণ স্থানকে ‘ক্ষেত্রফল’ বলে।" }),
      q({ prompt: "ক্ষেত্রফলকে কী দ্বারা প্রকাশ করা হয়?", options: ["বর্গ একক", "কিলোগ্রাম", "লিটার", "ঘণ্টা"], answer: "বর্গ একক", why: "ক্ষেত্রফলকে বর্গ একক দ্বারা প্রকাশ করা হয়, যেমন বর্গ সেমি।" }),
      q({ prompt: "1 সেমি বাহুবিশিষ্ট বর্গের ক্ষেত্রফল কত?", options: ["1 বর্গ সেমি", "1 সেমি", "4 সেমি", "4 বর্গ সেমি"], answer: "1 বর্গ সেমি", why: "1 সেমি বাহুবিশিষ্ট বর্গের ক্ষেত্রফল 1 বর্গ সেমি।" }),
      q({ prompt: "1 বর্গ সেমি কীসের একক?", options: ["ক্ষেত্রফল পরিমাপের", "দৈর্ঘ্য পরিমাপের", "ওজন পরিমাপের", "সময় পরিমাপের"], answer: "ক্ষেত্রফল পরিমাপের", why: "1 বর্গ সেমি ক্ষেত্রফল পরিমাপের একটি একক।" }),
      q({ prompt: "ক্ষেত্রফল নির্ণয় করতে আমরা সমতলের উপর কী রেখে তাদের সংখ্যা গণনা করি?", options: ["1 বর্গ সেমি ক্ষেত্রফলবিশিষ্ট বর্গ", "1 সেমি লম্বা দাগ", "1 গ্রামের বাটখারা"], answer: "1 বর্গ সেমি ক্ষেত্রফলবিশিষ্ট বর্গ", why: "সমতলের উপর 1 বর্গ সেমি ক্ষেত্রফলবিশিষ্ট বর্গ রেখে তাদের সংখ্যা গণনা করি; ছক কাগজের 1 সেমি × 1 সেমি ঘরও গুনতে পারি।" }),
      q({ prompt: "ছক কাগজে একটি আকৃতির ভিতরে 1 সেমি × 1 সেমি এর 9টি ঘর আছে। আকৃতিটির ক্ষেত্রফল কত?", options: ["9 বর্গ সেমি", "9 সেমি", "3 বর্গ সেমি", "36 বর্গ সেমি"], answer: "9 বর্গ সেমি", why: "প্রতিটি ঘর 1 বর্গ সেমি; 9টি ঘর, তাই ক্ষেত্রফল 9 বর্গ সেমি।" }),
      q({ prompt: "‘ক’ আকৃতির উপর 1 বর্গ সেমির 9টি বর্গ এবং ‘খ’ আকৃতির উপর 8টি বর্গ বসানো যায়। কোনটি বেশি জায়গা দখল করে?", options: ["‘ক’", "‘খ’", "দুইটি সমান"], answer: "‘ক’", why: "9 বর্গ সেমি 8 বর্গ সেমির চেয়ে বেশি, তাই ‘ক’ আকৃতিটি ‘খ’-এর চেয়ে বেশি জায়গা দখল করে।" }),
    ],
    src: "p.130 মূল প্রশ্ন and কাজ ১ (ways to compare ক and খ: the boy's words), the parrot's ক্ষেত্র and the girl's আয়তক্ষেত্র; p.131 the parrot's ক্ষেত্রফল and বর্গ একক, ১ বর্গ সেমি, the boy's and the girl's ways of counting squares; then ক and খ counted in squares of 1 বর্গ সেমি (৯ and ৮, mine: see the note); the options are mine",
  });
  note("p.130–131 (the known slip, TEACHER-CHECK §1): the text says ক takes more room, but খ is drawn bigger (২.৮৫ × ২.৮ সেমি against ৪.১৩ × ২.১৯ সেমি). The games take the shapes to the nearest centimetre, ক ৩ × ৩ (৯ বর্গ সেমি) and খ ৪ × ২ (৮ বর্গ সেমি), so that ক is bigger, as the text says; they never ask which of the drawn shapes is bigger.");
  cant("p.130 কাজ ১ and p.131 (comparing two shapes by drawing them on thin paper, cutting them out, laying one on the other or laying small tiles on both): the quiz asks about these ways; the comparing itself is done by counting 1 বর্গ সেমি squares (p.131's game).");

  wio({
    page: 131, slug: "count-squares", type: "angles_dots", title: "এক বর্গ সেমি ঘর গুনে ক্ষেত্রফল বের করি",
    items: [
      area([[1, 1]], 1, { text: "1 সেমি বাহুবিশিষ্ট বর্গের ক্ষেত্রফল কত বর্গ সেমি?" }),
      area(cellsOf([1, 1, 3, 3]), 9, { text: "‘ক’ আকৃতিটির ক্ষেত্রফল কত বর্গ সেমি?" }),
      area(cellsOf([1, 1, 4, 2]), 8, { text: "‘খ’ আকৃতিটির ক্ষেত্রফল কত বর্গ সেমি?" }),
      make(9, true), make(8, false),
    ],
    fresh: { skill: "area", count: 5 },
    src: "p.131: the square of ১ সেমি (১ বর্গ সেমি), then p.130–131's ক and খ on 1 সেমি squared paper (to the nearest centimetre: ক ৩ × ৩, খ ৪ × ২; see the note) as the girl says («ছক কাগজের ১ সেমি × ১ সেমি ঘরগুলোও বিবেচনা করতে পারি»), then a rectangle of ৯ বর্গ সেমি and any shape of ৮ বর্গ সেমি to shade (mine); then 5 fresh squared-paper rounds",
  });

  wio({
    page: 132, slug: "squared-paper", type: "angles_dots", title: "ছক কাগজে ঘর গুনে আকৃতির ক্ষেত্রফল নির্ণয় করি",
    items: [
      area(cellsOf([1, 1, 5, 5]), 25, { text: "কোনটি বৃহত্তর, ‘ক’ নাকি ‘খ’? ‘ক’ এর ক্ষেত্রফল কত বর্গ সেমি?" }), // কাজ ২ ক (printed: ২৫টি)
      area(cellsOf([1, 1, 6, 4]), 24, { text: "কোনটি বৃহত্তর, ‘ক’ নাকি ‘খ’? ‘খ’ এর ক্ষেত্রফল কত বর্গ সেমি?" }), // কাজ ২ খ
      area(cellsOf([1, 1, 3, 2]), 6, { text: "নিচের আকৃতিগুলোর প্রত্যেকটির ক্ষেত্রফল কত বর্গ সেমি? (ক)" }), // অনুশীলন ১ ক
      area(cellsOf([1, 1, 1, 2], [2, 2, 1, 2]), 4, { text: "নিচের আকৃতিগুলোর প্রত্যেকটির ক্ষেত্রফল কত বর্গ সেমি? (খ)" }), // খ: two steps of 2
      area(cellsOf([3, 1, 1, 1], [2, 2, 3, 1], [1, 3, 5, 1]), 9, { text: "নিচের আকৃতিগুলোর প্রত্যেকটির ক্ষেত্রফল কত বর্গ সেমি? (ঘ)" }), // ঘ: 1 + 3 + 5
      area(cellsOf([1, 1, 5, 1], [5, 2, 1, 3]), 8, { text: "নিচের আকৃতিগুলোর প্রত্যেকটির ক্ষেত্রফল কত বর্গ সেমি? (ঙ)" }), // ঙ: 5, then 3 down
      area(cellsOf([1, 1, 2, 2]), 4, { text: "নিচের আকৃতিগুলোর প্রত্যেকটির ক্ষেত্রফল কত বর্গ সেমি? (চ)" }), // চ
      area(cellsOf([2, 1, 3, 1], [1, 2, 4, 2]), 11, { text: "নিচের আকৃতিগুলোর প্রত্যেকটির ক্ষেত্রফল কত বর্গ সেমি? (ছ)" }), // ছ: 3 + 4 + 4
    ],
    fresh: { skill: "area", count: 5 },
    src: "p.132 কাজ ২ (ক ৫ × ৫ = ২৫, printed ২৫টি; খ ৬ × ৪ = ২৪) and অনুশীলন ১'s shapes made of whole squares, exactly as drawn: ক ৩ × ২ (৬), খ two steps of ২ (৪), ঘ ১ + ৩ + ৫ (৯), ঙ ৫ and ৩ down (৮), চ ২ × ২ (৪), ছ ৩ + ৪ + ৪ (১১); the questions as printed; then 5 fresh squared-paper rounds",
  });
  cant("p.132 কাজ ২ «□ অপেক্ষা □ বৃহত্তর এবং এদের ক্ষেত্রফলের পার্থক্য □ বর্গ সেমি» (ক বৃহত্তর, পার্থক্য ১ বর্গ সেমি): the two areas are counted in the game (২৫ and ২৪); the comparison and the difference are not a squared-paper round.");
  cant("p.132 অনুশীলন ১ গ (a triangle, base ৩ and height ২ squares: ৩ বর্গ সেমি) and জ (three half squares: ১.৫ বর্গ সেমি): the squared-paper rounds draw whole squares only.");
};
