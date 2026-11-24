// Pages ১৩৩–১৪২ (অধ্যায় ৯ · পরিমাপ, its second half), written by Claude (helper for pp. 121–142), 24 Nov 2026.
// The book: ../class4-math-redesign/content/p133-142.js (+ .parts.js for the squared paper, the time columns, the clocks
// and the calendars).
// p.133: shapes of ৬ and ৮ বর্গ সেমি, the ৬ × ৪ rectangle's squares; p.134: the square of ৪ সেমি, the formulas, অনুশীলন
// ৩–৪; p.135: a classroom floor in বর্গ মিটার; p.136–138: সময় (the units, seconds in an hour, a day, a week; hours in
// days and weeks; adding and taking away ঘণ্টা মিনিট সেকেন্ড; the time between two clocks; clocks to set); p.139: dates
// (বিজয় দিবস ১৬/১২/১৯৭১, three calendar months); p.140: দেখি পারি কি না; p.141–142: নিজে করি.
"use strict";
module.exports = (L) => {
  const { it, wio, mcq, q, match, note, cant } = L;
  const conv = (from, to, want) => it({ kind: "convert", from, to }, want);
  const amt = (unit, terms, ops, want, o = {}) => it({ kind: "units", unit, terms, ops, ...o }, want);
  const amt3 = (unit, terms, ops, want, o = {}) => it({ kind: "units3", unit, terms, ops, ...o }, want);
  const story = (text, sum, unit, want) => it({ kind: "word", text, sum, ...(unit ? { unit } : {}) }, want);
  const box = (text, want, story) => it({ kind: "missing", text, ...(story ? { story } : {}) }, want);
  const cellsOf = (...blocks) => blocks.flatMap(([x0, y0, w, h]) => { const c = []; for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) c.push([x, y]); return c; });
  const clock = (h, m, o, want) => it({ kind: "clock", h, m, ...o }, want);
  const date = (y, m, d, o, want) => it({ kind: "date", y, m, d, ...o }, want);

  // ───────────── p.133–135: ক্ষেত্রফল ─────────────

  wio({
    page: 133, slug: "draw-area", type: "angles_dots", title: "নির্দিষ্ট ক্ষেত্রফলের আকৃতি আঁকি ও আয়তের ঘর গুনি",
    items: [
      it({ kind: "area", ask: "make", squares: 6, rect: false, w: 12, h: 9, unit: "সেমি" }, "made"), // অনুশীলন ২: ৬ বর্গ সেমি
      it({ kind: "area", ask: "make", squares: 8, rect: false, w: 12, h: 9, unit: "সেমি" }, "made"), // ৮ বর্গ সেমি
      it({ kind: "area", ask: "make", squares: 6, rect: true, w: 12, h: 9, unit: "সেমি" }, "made"),
      it({ kind: "area", ask: "make", squares: 8, rect: true, w: 12, h: 9, unit: "সেমি" }, "made"),
      it({ kind: "area", ask: "area", cells: cellsOf([1, 1, 6, 4]), unit: "সেমি", text: "হিসাব করে নিচের আয়তক্ষেত্রটির ক্ষেত্রফল কীভাবে নির্ণয় করা যায় তা নিয়ে চিন্তা করি। আয়তটির ক্ষেত্রফল কত বর্গ সেমি?" }, 24), // কাজ ৩ (the girl: ২৪টি ঘর)
    ],
    fresh: { skill: "area", count: 5 },
    src: "p.133 অনুশীলন ২ (৬ বর্গ সেমি ও ৮ বর্গ সেমি ক্ষেত্রফলবিশিষ্ট কয়েকটি আকৃতি আঁকি: any shape, then a rectangle, of each, on squared paper 12 × 9 of the book's 15 × 9), কাজ ৩ (the ৬ সেমি × ৪ সেমি rectangle cut into squares, printed ২৪ বর্গ সেমি); then 5 fresh squared-paper rounds",
  });

  wio({
    page: 134, slug: "area-formula", title: "সূত্র ব্যবহার করে আয়তক্ষেত্র ও বর্গক্ষেত্রের ক্ষেত্রফল নির্ণয় করি",
    items: [
      story("আয়তক্ষেত্রটির দৈর্ঘ্য 6 সেমি এবং প্রস্থ 4 সেমি। দৈর্ঘ্য ও প্রস্থ গুণ করে আয়তক্ষেত্রটির ক্ষেত্রফল নির্ণয় করি।", "6 × 4", "বর্গ সেমি", 24), // p.133 কাজ ৩ (the boy)
      story("হিসাব করে নিচের বর্গক্ষেত্রটির ক্ষেত্রফল নির্ণয় করি। বর্গক্ষেত্রটির প্রতিটি বাহুর দৈর্ঘ্য 4 সেমি।", "4 × 4", "বর্গ সেমি", 16), // কাজ ৪
      story("সূত্র ব্যবহার করে ক্ষেত্রফল নির্ণয় করি: 18 সেমি দৈর্ঘ্য এবং 13 সেমি প্রস্থবিশিষ্ট আয়তক্ষেত্র।", "18 × 13", "বর্গ সেমি", 234), // অনুশীলন ৩ (১)
      it({ kind: "sum", a: 18, op: "×", b: 13, layout: "column" }, 234), // (১) worked in columns
      story("সূত্র ব্যবহার করে ক্ষেত্রফল নির্ণয় করি: 9 সেমি বাহুবিশিষ্ট একটি বর্গক্ষেত্র।", "9 × 9", "বর্গ সেমি", 81), // (২)
      story("9 সেমি দৈর্ঘ্য এবং 6 সেমি প্রস্থবিশিষ্ট একটি আয়তক্ষেত্র এঁকে ক্ষেত্রফল নির্ণয় করি।", "9 × 6", "বর্গ সেমি", 54), // (৩)
      story("নিচের আয়তক্ষেত্রটির দৈর্ঘ্য কত? আয়তক্ষেত্রটির ক্ষেত্রফল 96 বর্গ সেমি এবং প্রস্থ 8 সেমি।", "96 ÷ 8", "সেমি", 12), // অনুশীলন ৪
      box("□ × 8 = 96", 12, "আয়তক্ষেত্রের ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ: দৈর্ঘ্য × 8 সেমি = 96 বর্গ সেমি"), // অনুশীলন ৪ with the formula
      story("একটি আয়তক্ষেত্রের ক্ষেত্রফল 54 বর্গ সেমি এবং দৈর্ঘ্য 9 সেমি। এর প্রস্থ কত?", "54 ÷ 9", "সেমি", 6), // (৩) backwards, mine
      story("একটি আয়তক্ষেত্রের ক্ষেত্রফল 234 বর্গ সেমি এবং দৈর্ঘ্য 18 সেমি। এর প্রস্থ কত?", "234 ÷ 18", "সেমি", 13), // (১) backwards, mine
    ],
    src: "p.133 কাজ ৩ (the boy: দৈর্ঘ্য ৬ সেমি × প্রস্থ ৪ সেমি = ২৪ বর্গ সেমি), p.134 কাজ ৪ (the square of ৪ সেমি), the two formulas applied to অনুশীলন ৩ (১)–(৩) (each as printed; (১) also ১৮ × ১৩ in columns) and অনুশীলন ৪ (৯৬ বর্গ সেমি, প্রস্থ ৮ সেমি: as a question and as □ × ৮ = ৯৬); then অনুশীলন ৩ (৩) and (১) worked backwards as অনুশীলন ৪ (the width from the area: mine). The figures' sides are written into the questions",
  });
  cant("p.134 অনুশীলন ৩ (৩) «… একটি আয়তক্ষেত্র এঁকে …» (draw it, 9 × 6 = ৫৪ squares, more than the squared paper's 48): the game asks its area by the formula; drawing rectangles is p.133's game.");

  wio({
    page: 135, slug: "square-metre", title: "শ্রেণিকক্ষের মেঝের ক্ষেত্রফল বর্গ মিটারে নির্ণয় করি",
    items: [
      story("নিপার শ্রেণিকক্ষের দৈর্ঘ্য 800 সেমি ও প্রস্থ 700 সেমি। এর মেঝের ক্ষেত্রফল নির্ণয় করি।", "800 × 700", "বর্গ সেমি", 560000), // কাজ ৫ (“কিন্তু সংখ্যাটি অনেক বড়ো”)
      conv([[1, "m"]], "cm", 100), // ১ মি (১০০ সেমি)
      conv([[700, "cm"]], "m", 7), conv([[800, "cm"]], "m", 8), // ৭০০ সেমি = ৭ মি, ৮০০ সেমি = ৮ মি
      story("শ্রেণিকক্ষটির দৈর্ঘ্য 8 মি এবং প্রস্থ 7 মি। শ্রেণিকক্ষটির ক্ষেত্রফল কত বর্গ মি?", "7 × 8", "বর্গ মি", 56), // printed: ৭ মি × ৮ মি = ৫৬ বর্গ মি
      box("100 × 100 = □", 10000, "1 বর্গ মি = 100 সেমি × 100 সেমি = কত বর্গ সেমি?"), // the boy: ১ বর্গ মি = ১০০০০ বর্গ সেমি
      box("560000 ÷ 10000 = □", 56, "560000 বর্গ সেমি = কত বর্গ মি? (1 বর্গ মি = 10000 বর্গ সেমি)"), // the boy: ৫৬০০০০ বর্গ সেমি = ৫৬ বর্গ মি
      conv([[1000, "cm"]], "m", 10), conv([[600, "cm"]], "m", 6), // অনুশীলন ৫, an example classroom (mine)
      story("মিটার স্কেল দিয়ে মেপে দেখা গেল, একটি শ্রেণিকক্ষের দৈর্ঘ্য 10 মি এবং প্রস্থ 6 মি। শ্রেণিকক্ষটির ক্ষেত্রফল কত বর্গ মি?", "10 × 6", "বর্গ মি", 60),
    ],
    src: "p.135 কাজ ৫ (নিপার শ্রেণিকক্ষ ৮০০ সেমি × ৭০০ সেমি, the question as printed: ৫৬০০০০ বর্গ সেমি; then ১ মি = ১০০ সেমি, ৭০০ সেমি = ৭ মি, ৮০০ সেমি = ৮ মি, ৭ মি × ৮ মি = ৫৬ বর্গ মি, the boy's ১ বর্গ মি = ১০০ সেমি × ১০০ সেমি = ১০০০০ বর্গ সেমি and ৫৬০০০০ বর্গ সেমি = ৫৬ বর্গ মি), then অনুশীলন ৫ with an example classroom of mine (১০০০ সেমি × ৬০০ সেমি = ১০ মি × ৬ মি)",
  });
  cant("p.135 অনুশীলন ৫ (measure our own classroom with a metre scale): the game works an example classroom (১০ মি × ৬ মি = ৬০ বর্গ মি).");

  // ───────────── p.136–138: সময় ─────────────

  wio({
    page: 136, slug: "time-units", type: "units_amounts", title: "সময়ের এককগুলোর সম্পর্ক জেনে সেকেন্ড ও মিনিটে প্রকাশ করি",
    items: [
      amt("h", [[0, 30], [0, 45], [1, 45]], ["+", "+"], [3, 0], { text: "শবনম প্রতিদিন 30 মিনিট ব্যায়াম করে, 45 মিনিট ছবি আঁকে এবং 1 ঘণ্টা 45 মিনিট পড়ালেখা করে। তার তিনটি কাজ করতে মোট কত সময় লাগে?" }), // মূল প্রশ্ন, step 1
      conv([[3, "h"]], "s", 10800), // মূল প্রশ্ন, step 2: মোট কত সেকেন্ড
      conv([[1, "yr"]], "mo", 12), conv([[1, "wk"]], "day", 7), conv([[1, "day"]], "h", 24), conv([[1, "h"]], "min", 60), conv([[1, "min"]], "s", 60), // the table
      conv([[1, "h"]], "s", 3600), conv([[1, "day"]], "s", 86400), conv([[1, "wk"]], "s", 604800), // কাজ ১ (১)–(৩) (printed)
      conv([[1, "day"]], "min", 1440), conv([[1, "wk"]], "min", 10080), // অনুশীলন ১ (১)–(২)
    ],
    fresh: { skill: "convert", count: 5, unit: "time" },
    src: "p.136 মূল প্রশ্ন (শবনম: ৩০ মিনিট + ৪৫ মিনিট + ১ ঘণ্টা ৪৫ মিনিট, then in সেকেন্ড, as the boy says: first add, then change to seconds), the table of units (১ বছর = ১২ মাস … ১ মিনিট = ৬০ সেকেন্ড), কাজ ১ (১ ঘণ্টা, ১ দিন, ১ সপ্তাহ in সেকেন্ড, printed ৩৬০০, ৮৬৪০০, ৬০৪৮০০) and অনুশীলন ১ (১ দিন, ১ সপ্তাহ in মিনিট); then 5 fresh changes of a time's unit",
  });
  note("p.136 মূল প্রশ্ন asks «মোট কত সেকেন্ড»: two rounds, as the boy works it: the story asks «মোট কত সময় লাগে?» (৩ ঘণ্টা ০ মিনিট), then ৩ ঘণ্টা = ১০৮০০ সেকেন্ড. p.142 নিজে করি ৯ (আরিফ) is played the same way (৪ ঘণ্টা ৫ মিনিট, then ১৪৭০০ সেকেন্ড).");
  cant("p.136 the table's «১ মাস = ৪ সপ্তাহ (অথবা, ৪ সপ্তাহ এবং ১ বা ২ বা ৩ দিন)»: a month is not a fixed number of days, so it is not a change-of-unit round.");

  wio({
    page: 137, slug: "days-weeks", type: "units_amounts", title: "সময়গুলোকে পাশে বর্ণিত এককে প্রকাশ করি",
    items: [
      conv([[4, "day"]], "h", 96), conv([[1, "wk"]], "h", 168), // কাজ ২ (১)–(২) (printed)
      conv([[8, "wk"], [5, "day"]], "day", 61), conv([[8, "wk"], [5, "day"]], "h", 1464), // কাজ ২ (৩): ৬১ দিন, ১৪৬৪ ঘণ্টা
      conv([[3, "min"]], "s", 180), conv([[4, "h"]], "min", 240), conv([[9, "h"], [25, "min"]], "s", 33900), // অনুশীলন ২ (১)–(৩)
      conv([[21, "day"]], "wk", 3), conv([[38, "day"]], ["wk", "day"], [5, 3]), conv([[5, "wk"]], "h", 840), // (৪)–(৬)
      amt3("h", [[2, 5, 58], [1, 14, 35]], ["+"], [3, 20, 33], { layout: "column", text: "একদিনে সাফিন 2 ঘণ্টা 05 মিনিট 58 সেকেন্ড এবং স্নেহা 1 ঘণ্টা 14 মিনিট 35 সেকেন্ড পড়ে। তারা দুইজনে মোট কত সময় পড়েছে?" }), // কাজ ৩ (printed)
    ],
    fresh: { skill: "convert", count: 5, unit: "days" },
    src: "p.137 কাজ ২ (৪ দিন, ১ সপ্তাহ, ৮ সপ্তাহ ৫ দিন in ঘণ্টা, printed ৯৬, ১৬৮, ৬১ দিন and ১৪৬৪ ঘণ্টা), অনুশীলন ২ (১)–(৬) (each in the unit beside it), কাজ ৩ (সাফিন ও স্নেহা, the story as printed, in columns: printed ৩ ঘণ্টা ২০ মিনিট ৩৩ সেকেন্ড); then 5 fresh changes among সপ্তাহ, দিন, ঘণ্টা",
  });
  note("p.137 কাজ ২ (৩) prints «= ৬১ দিন × ২৪ ঘণ্টা» (a day times an hour); it is ৬১ × ২৪ ঘণ্টা = ১৪৬৪ ঘণ্টা, which the game asks.");

  match({
    page: 137, slug: "same-time", title: "সমান সময় মিলাই",
    pairs: [
      ["1 বছর", "12 মাস"], ["1 সপ্তাহ", "7 দিন"], ["1 দিন", "24 ঘণ্টা"], ["1 ঘণ্টা", "60 মিনিট"], ["1 মিনিট", "60 সেকেন্ড"], ["4 দিন", "96 ঘণ্টা"],
      ["8 সপ্তাহ 5 দিন", "61 দিন"], ["3 মিনিট", "180 সেকেন্ড"], ["4 ঘণ্টা", "240 মিনিট"], ["21 দিন", "3 সপ্তাহ"], ["38 দিন", "5 সপ্তাহ 3 দিন"], ["5 সপ্তাহ", "840 ঘণ্টা"],
    ],
    src: "p.136's table of units (১ বছর = ১২ মাস … ১ মিনিট = ৬০ সেকেন্ড) and p.137 কাজ ২ and অনুশীলন ২, each time with its answer",
  });

  wio({
    page: 138, slug: "add-sub-time", type: "units_amounts", title: "ঘণ্টা, মিনিট ও সেকেন্ডের যোগ ও বিয়োগ করি",
    items: [
      amt3("h", [[3, 40, 25], [1, 15, 32]], ["+"], [4, 55, 57], { layout: "column" }), // অনুশীলন ৩ (১)
      amt3("h", [[8, 38, 42], [2, 26, 35], [1, 10, 23]], ["+", "+"], [12, 15, 40]), // (২)
      amt3("h", [[10, 37, 28], [3, 15, 19], [7, 25, 25]], ["+", "+"], [21, 18, 12]), // (৩)
      amt3("h", [[6, 45, 37], [2, 34, 12]], ["−"], [4, 11, 25], { layout: "column" }), // (৪)
      amt3("h", [[13, 55, 14], [4, 0, 47]], ["−"], [9, 54, 27], { layout: "column" }), // (৫)
      amt3("h", [[18, 23, 39], [9, 48, 55]], ["−"], [8, 34, 44], { layout: "column" }), // (৬)
      amt3("h", [[6, 25, 0], [2, 10, 35]], ["+"], [8, 35, 35], { layout: "row" }), // (৭)
      amt3("h", [[20, 0, 24], [1, 50, 0]], ["+"], [21, 50, 24], { layout: "row" }), // (৮)
      amt3("h", [[16, 42, 10], [3, 28, 0]], ["−"], [13, 14, 10], { layout: "row" }), // (৯)
      amt3("h", [[7, 0, 15], [4, 46, 35]], ["−"], [2, 13, 40], { layout: "row" }), // (১০)
    ],
    fresh: { skill: "units", count: 5, unit: "time" },
    src: "p.138 অনুশীলন ৩ (১)–(৬) in columns and (৭)–(১০) in a row, as printed (a unit not written is ০; the three-row sums (২), (৩) are worked left to right); then 5 fresh sums of times in two units",
  });

  wio({
    page: 138, slug: "clocks", type: "clock_time", title: "ঘড়ি দেখে সময়ের পার্থক্য বের করি ও কাঁটা বসাই",
    items: [
      clock(5, 0, { ask: "read" }, [5, 0]), clock(7, 15, { ask: "read" }, [7, 15]), // অনুশীলন ৪: বিকাল ৫টা, সন্ধ্যা ৭টা ১৫ মিনিট
      clock(5, 0, { ask: "between", h2: 7, m2: 15 }, [2, 15]), // সময়ের পার্থক্য ২ ঘণ্টা ১৫ মিনিট
      clock(8, 20, { ask: "set" }, [8, 20]), // কাজ ৪: স্কুল পৌঁছালাম সকাল ৮টা ২০ মিনিটে
      clock(8, 20, { ask: "after", add: 10 }, [8, 30]), // রিতা ১০ মিনিট পরে পৌঁছাল
      clock(8, 30, { ask: "set" }, [8, 30]), // রিতা স্কুলে পৌঁছাল ৮টা ৩০ মিনিটে
      clock(10, 10, { ask: "read" }, [10, 10]), // p.136's wall clock
    ],
    fresh: { skill: "clock", count: 5, more: true },
    src: "p.138 অনুশীলন ৪ (the two clocks, বিকাল ৫টা and সন্ধ্যা ৭টা ১৫ মিনিট, and the time between them), কাজ ৪ (school reached at সকাল ৮টা ২০ মিনিট: set the hands; রিতা ১০ মিনিট পরে: ৮টা ৩০ মিনিট, found and set); p.136's wall clock (১০টা ১০ মিনিট); then 5 fresh clock rounds (with the elapsed-time ones)",
    notes: ["কাজ ৪ (পৃষ্ঠা 138): ঘুম থেকে ওঠা, বাড়ি থেকে বের হওয়া ও স্কুল শুরুর সময় শিক্ষার্থীর নিজের; খেলায় স্কুলে পৌঁছানো (সকাল 8টা 20 মিনিট) ও রিতার পৌঁছানো (10 মিনিট পরে) ঘড়িতে বসাই।"],
  });
  cant("p.138 কাজ ৪ (the child's own waking time, leaving time and school's start): the clock rounds set the times the page gives (৮টা ২০ মিনিট, and রিতা ১০ মিনিট পরে).");

  // ───────────── p.139: তারিখ ─────────────

  wio({
    page: 139, slug: "write-date", title: "প্রচলিত রীতিতে তারিখ লিখি",
    items: [
      date(1971, 12, 16, { ask: "write", show: "words", text: "আমাদের মহান বিজয় দিবস কত তারিখে?" }, [16, 12, 1971]), // মূল প্রশ্ন (printed: ১৬/১২/১৯৭১ খ্রি.)
      date(1971, 12, 16, { ask: "write", show: "words", sep: ".", text: "মুক্তিযুদ্ধে বিজয় অর্জনের তারিখ লিখি।" }, [16, 12, 1971]), // অথবা ১৬.১২.১৯৭১ খ্রি:
      date(2026, 2, 21, { ask: "write", show: "words", text: "বিদ্যালয়ে শহিদ দিবস পালিত হয়েছে" }, [21, 2, 2026]), // কাজ ১ (১)
      date(2026, 3, 26, { ask: "write", show: "words", text: "স্বাধীনতা দিবস পালিত হয়েছে" }, [26, 3, 2026]), // কাজ ১ (২)
      date(2025, 6, 30, { ask: "write", show: "cal" }, [30, 6, 2025]), // অনুশীলন ১: জুন ২০২৫, ৩০ ringed
      date(2025, 9, 8, { ask: "write", show: "cal" }, [8, 9, 2025]), // সেপ্টেম্বর ২০২৫, ৮
      date(2026, 1, 1, { ask: "write", show: "cal" }, [1, 1, 2026]), // জানুয়ারি ২০২৬, ১
    ],
    fresh: { skill: "date", count: 5 },
    src: "p.139 মূল প্রশ্ন (বিজয় দিবস, ১৯৭১ সালের ১৬ই ডিসেম্বর, written ১৬/১২/১৯৭১ and ১৬.১২.১৯৭১ as printed), কাজ ১ (১)–(২) (শহিদ দিবস ২১ ফেব্রুয়ারি and স্বাধীনতা দিবস ২৬ মার্চ «এ বছর»: 2026), অনুশীলন ১ (the three calendars, the ringed ৩০ জুন ২০২৫, ৮ সেপ্টেম্বর ২০২৫, ১ জানুয়ারি ২০২৬); then 5 fresh date rounds",
  });
  note("p.139 কাজ ১ «এ বছর কত তারিখে বিদ্যালয়ে ‘শহিদ দিবস’ ও ‘স্বাধীনতা দিবস’ পালন করা হয়েছে»: the game takes the book's year, 2026 (২১/২/২০২৬, ২৬/৩/২০২৬).");

  wio({
    page: 139, slug: "calendar", title: "ক্যালেন্ডার দেখে বার ও দিন গণনা করি",
    items: [
      date(1971, 12, 16, { ask: "weekday" }, 4), // বিজয় দিবস: বৃহস্পতিবার
      date(2025, 6, 30, { ask: "weekday" }, 1), date(2025, 9, 8, { ask: "weekday" }, 1), date(2026, 1, 1, { ask: "weekday" }, 4), // the three calendars
      date(2026, 2, 21, { ask: "weekday" }, 6), date(2026, 3, 26, { ask: "weekday" }, 4), // শহিদ দিবস, স্বাধীনতা দিবস 2026
      date(2025, 6, 1, { ask: "between", d2: 30 }, 29), date(1971, 12, 16, { ask: "between", d2: 31 }, 15),
      date(2025, 9, 8, { ask: "after", n: 7 }, 15), date(2026, 1, 1, { ask: "after", n: 20 }, 21),
    ],
    fresh: { skill: "date", count: 5 },
    src: "p.139: the weekday of every date on the page (বিজয় দিবস ১৬/১২/১৯৭১; the three calendars' ringed dates; শহিদ দিবস and স্বাধীনতা দিবস 2026), the days between two dates of a month (১ to ৩০ জুন ২০২৫; ১৬ to ৩১ ডিসেম্বর ১৯৭১) and the date some days after (৮ সেপ্টেম্বর + ৭; ১ জানুয়ারি + ২০): reading the page's calendar months, mine; then 5 fresh date rounds",
  });

  // ───────────── p.140: দেখি পারি কি না ─────────────

  wio({
    page: 140, slug: "review", title: "দেখি পারি কি না: খালিঘর পূরণ করি, যোগ-বিয়োগ করি ও ক্ষেত্রফল নির্ণয় করি",
    items: [
      conv([[650, "g"]], "kg", [0, 65]), conv([[1.4, "l"]], "ml", 1400), conv([[1.4, "l"]], "dl", 14), conv([[8, "min"]], "s", 480), // ১ (left column)
      conv([[2.7, "km"]], "m", 2700), conv([[1275, "g"]], ["kg", "g"], [1, 275]), conv([[4, "day"]], "min", 5760), // ১ (right column)
      amt("kg", [[7, 250], [5, 650]], ["+"], [12, 900], { layout: "column" }), // ২ (১)
      amt("kg", [[15, 435], [2, 720], [12, 365]], ["+", "+"], [30, 520]), // ২ (২)
      amt3("m", [[17, 55, 4], [10, 74, 8]], ["−"], [6, 80, 6], { layout: "column" }), // ২ (৩)
      story("ক্ষেত্রফল নির্ণয় করি। বর্গক্ষেত্রটির প্রতিটি বাহুর দৈর্ঘ্য 4 সেমি।", "4 × 4", "বর্গ সেমি", 16), // ৩ (left)
      story("ক্ষেত্রফল নির্ণয় করি। আয়তক্ষেত্রটির দৈর্ঘ্য 25 সেমি এবং প্রস্থ 14 সেমি।", "25 × 14", "বর্গ সেমি", 350), // ৩ (right)
      amt("yr", [[12, 7], [9, 9]], ["+"], [22, 4], { text: "লাইজুর বয়স 12 বছর 7 মাস এবং মাসুদের বয়স 9 বছর 9 মাস। লাইজু এবং মাসুদের বয়সের যোগফল কত?" }), // ৪
    ],
    src: "p.140 দেখি পারি কি না ১ (all seven boxes: ৬৫০ গ্রা = ০.৬৫ কেজি, ১.৪০ লি = ১৪০০ মিলি = ১৪ ডেলি (the game shows ১.৪ লি: the server keeps a decimal as a number), ৮ মিনিট, ২.৭ কিমি, ১২৭৫ গ্রা, ৪ দিন), ২ (১)–(৩) (the two weights and the মি সেমি মিমি subtraction, in columns as printed; (২)'s three rows worked left to right), ৩ (the square of ৪ সেমি and the rectangle ২৫ সেমি × ১৪ সেমি, their sides written into the questions), ৪ (লাইজু ও মাসুদের বয়স, as printed)",
  });

  // ───────────── p.141–142: নিজে করি ─────────────

  mcq({
    page: 141, slug: "tick", title: "নিজে করি: সঠিক উত্তরের পাশে টিক চিহ্ন দিই",
    questions: [
      q({ prompt: "1 কিলোমিটার = কত মিটার?", options: ["10 মি", "100 মি", "1000 মি", "10000 মি"], book: "গ", num: 1000, why: "দৈর্ঘ্যের একক: 1 কিমি = 1000 মি।" }),
      q({ prompt: "1 মিটার 60 সেন্টিমিটার সমান কত সেন্টিমিটার?", options: ["61 সেন্টিমিটার", "70 সেন্টিমিটার", "160 সেন্টিমিটার", "1060 সেন্টিমিটার"], book: "গ", num: 160, why: "1 মি = 100 সেমি; 100 সেমি + 60 সেমি = 160 সেমি।" }),
      q({ prompt: "8 কেজি = কত গ্রাম?", options: ["80 গ্রাম", "800 গ্রাম", "8000 গ্রাম", "80000 গ্রাম"], book: "গ", num: 8000, why: "1 কেজি = 1000 গ্রাম; 8 কেজি = 8 × 1000 গ্রাম = 8000 গ্রাম।" }),
      q({ prompt: "1 লি = কত মিলি?", options: ["10 মিলি", "100 মিলি", "1000 মিলি", "10000 মিলি"], book: "গ", num: 1000, why: "1 লিটার = 10 ডেসিলিটার = 1000 মিলিলিটার।" }),
      q({ prompt: "12 মি দৈর্ঘ্য ও 8 মি প্রস্থবিশিষ্ট একটি দেয়ালের পরিসীমা কত?", options: ["20 মি", "32 মি", "40 মি", "96 মি"], book: "গ", num: 40, why: "পরিসীমা = বাহুগুলোর মোট দৈর্ঘ্য: 12 মি + 8 মি + 12 মি + 8 মি = 40 মি।" }),
      q({ prompt: "8 মিটার দৈর্ঘ্যের একটি বর্গাকার মেঝের ক্ষেত্রফল কত?", options: ["8 বর্গমিটার", "16 বর্গমিটার", "32 বর্গমিটার", "64 বর্গমিটার"], book: "ঘ", num: 64, why: "বর্গক্ষেত্রের ক্ষেত্রফল = 1 বাহুর দৈর্ঘ্য × 1 বাহুর দৈর্ঘ্য = 8 মি × 8 মি = 64 বর্গমিটার।" }),
      q({ prompt: "নিচের কোন ক্ষেত্রটির ক্ষেত্রফল 400 বর্গ সেমি হতে পারে?", options: ["শ্রেণিকক্ষের মেঝে", "বইয়ের মলাট", "টেবিল", "জ্যামিতি বক্স"], book: "খ", why: "400 বর্গ সেমি = 20 সেমি × 20 সেমি, প্রায় একটি বইয়ের মলাটের মাপ। মেঝে ও টেবিল অনেক বড়ো, জ্যামিতি বক্স ছোটো।" }),
      q({ prompt: "1 ডেসিলিটার = কত মিলিলিটার?", options: ["10 মিলি", "100 মিলি", "1000 মিলি"], answer: "100 মিলি", num: 100, why: "তরল পদার্থের আয়তন: 1 ডেলি = 100 মিলি, 1 লি = 10 ডেলি।" }),
      q({ prompt: "1 দিন = কত ঘণ্টা?", options: ["12 ঘণ্টা", "24 ঘণ্টা", "60 ঘণ্টা"], answer: "24 ঘণ্টা", num: 24, why: "সময়ের একক: 1 দিন = 24 ঘণ্টা।" }),
      q({ prompt: "1 বর্গ মিটার = কত বর্গ সেমি?", options: ["100 বর্গ সেমি", "1000 বর্গ সেমি", "10000 বর্গ সেমি"], answer: "10000 বর্গ সেমি", num: 10000, why: "1 বর্গ মি = 100 সেমি × 100 সেমি = 10000 বর্গ সেমি।" }),
    ],
    src: "p.141 নিজে করি ১ (১)–(৭) (the book's options and letters; (৪)'s «১০০০মিলি» written with a space), then three of the chapter's units (p.129 ১ ডেলি = ১০০ মিলি, p.136 ১ দিন = ২৪ ঘণ্টা, p.135 ১ বর্গ মি = ১০০০০ বর্গ সেমি), my options",
  });
  note("p.141 নিজে করি ১ (৭) «কোন ক্ষেত্রটির ক্ষেত্রফল ৪০০ বর্গ সেমি হতে পারে?»: the answer is খ বইয়ের মলাট (about ২০ সেমি × ২০ সেমি); a classroom floor and a table are far bigger, a geometry box smaller.");

  wio({
    page: 141, slug: "fill", type: "units_amounts", title: "নিজে করি: খালিঘর পূরণ করি",
    items: [
      conv([[9, "mm"]], "cm", [0, 9]), conv([[4, "m"], [7, "cm"]], "cm", 407), conv([[5.3, "km"]], "m", 5300), conv([[12, "kg"]], "g", 12000), // ২ (১)–(৪)
      conv([[2.65, "l"]], "ml", 2650), conv([[1350, "g"]], ["kg", "g"], [1, 350]), conv([[120, "h"]], "day", 5), conv([[2, "day"]], "min", 2880), // ২ (৫)–(৮)
    ],
    fresh: { skill: "convert", count: 5, unit: "any" },
    src: "p.141 নিজে করি ২ (১)–(৮) (৯ মিমি = ০.৯ সেমি … ২ দিন = ২৮৮০ মিনিট); then 5 fresh changes of unit",
  });

  wio({
    page: 141, slug: "add-sub", type: "units_amounts", title: "নিজে করি: পরিমাপের যোগ ও বিয়োগ করি",
    items: [
      amt3("m", [[4, 66, 8], [7, 58, 9], [1, 24, 0]], ["+", "+"], [13, 49, 7]), // ৩ (১): ৪ মি ৬৫ সেমি ১৮ মিমি, ১ মি ২৩ সেমি ১০ মিমি regrouped (see the note)
      amt("kg", [[15, 785], [3, 453], [12, 200]], ["+", "+"], [31, 438]), // (২)
      amt("l", [[24, 650], [16, 350], [5, 0]], ["+", "+"], [46, 0]), // (৩)
      amt3("h", [[5, 48, 25], [1, 35, 40]], ["+"], [7, 24, 5], { layout: "column" }), // (৪)
      amt3("m", [[21, 32, 9], [16, 68, 6]], ["−"], [4, 64, 3], { layout: "column" }), // (৫)
      amt("kg", [[8, 320], [3, 865]], ["−"], [4, 455], { layout: "column" }), // (৬)
      amt("l", [[9, 0], [4, 487]], ["+"], [13, 487], { layout: "row" }), // (৭)
      amt3("h", [[14, 15, 0], [5, 35, 40]], ["+"], [19, 50, 40], { layout: "row" }), // (৮)
      amt("m", [[6, 28], [4, 45]], ["−"], [1, 83], { layout: "row" }), // (৯)
      amt("kg", [[8, 380], [3, 700]], ["−"], [4, 680], { layout: "row" }), // (১০)
    ],
    src: "p.141 নিজে করি ৩ (১)–(১০): (৪)–(৬) in columns, (৭)–(১০) in a row as printed, the three-row sums (১)–(৩) worked left to right ((৩)'s «০০০ মিলি» is ০)",
  });
  note("p.141 নিজে করি ৩ (১) prints «৪ মি ৬৫ সেমি ১৮ মিমি» and «১ মি ২৩ সেমি ১০ মিমি» (TEACHER-CHECK §2 lists the first): a মিমি part must be under ১০, so the game writes them regrouped, ৪ মি ৬৬ সেমি ৮ মিমি and ১ মি ২৪ সেমি ০ মিমি (the same lengths); the total stays the printed amounts' sum, ১৩ মি ৪৯ সেমি ৭ মিমি. If ১৮ is a misprint for ৮, the total is ১৩ মি ৪৮ সেমি ৭ মিমি.");

  wio({
    page: 142, slug: "stories-amounts", type: "units_amounts", title: "নিজে করি: ফল, পানি, পড়ার সময় ও বয়সের হিসাব করি",
    items: [
      conv([[2.5, "kg"]], ["kg", "g"], [2, 500]), // ৫ (২.৫ কেজি = ২ কেজি ৫০০ গ্রাম)
      amt("kg", [[2, 500], [0, 985]], ["−"], [1, 515], { text: "রেজা সাহেব তার পরিবারের জন্য 2.5 কেজি ফল কিনলেন। তা থেকে কিছু পরিমাণ ফল খাওয়ার পর 985 গ্রাম অবশিষ্ট রইল। তারা কতটুকু ফল খেয়েছেন তা প্রকাশ করি।" }), // ৫
      amt("l", [[0, 380], [0, 410], [0, 290]], ["+", "+"], [1, 80], { text: "শান্তা সকালের নাশতায় 380 মিলি, দুপুরের খাবারের সময় 410 মিলি এবং রাতের খাবারের সময় 290 মিলি পানি পান করেছে। সে মোট কতটুকু পানি পান করেছে?" }), // ৬
      amt("h", [[2, 10], [1, 55]], ["+"], [4, 5], { text: "আরিফ সকালে 2 ঘণ্টা 10 মিনিট এবং রাতে 1 ঘণ্টা 55 মিনিট বই পড়ে। সে মোট কত সময় পড়ে?" }), // ৯, step 1
      conv([[4, "h"], [5, "min"]], "s", 14700), // ৯, step 2: সেকেন্ডে প্রকাশ করি
      amt("yr", [[12, 0], [10, 9]], ["−"], [1, 3], { text: "লায়লার বয়স 10 বছর 9 মাস এবং মৃদুলের বয়স 12 বছর। লায়লা এবং মৃদুলের বয়সের পার্থক্য কত?" }), // ১০
    ],
    fresh: { skill: "unitmix", count: 5, unit: "any" },
    src: "p.142 নিজে করি ৫ (রেজা সাহেবের ফল: ২.৫ কেজি = ২ কেজি ৫০০ গ্রাম, then the story as printed), ৬ (শান্তার পানি, as printed: ১ লি ৮০ মিলি), ৯ (আরিফ: the story up to «সে মোট কত সময় পড়ে?», then ৪ ঘণ্টা ৫ মিনিট in সেকেন্ড), ১০ (লায়লা ও মৃদুলের বয়স, as printed); then 5 fresh rounds of amounts and units",
  });

  wio({
    page: 142, slug: "area-perimeter", title: "নিজে করি: পরিসীমা, ক্ষেত্রফল ও জন্ম তারিখের খেলা",
    items: [
      it({ kind: "dsum", a: "52.7", op: "+", b: "43.6", unit: "সেমি", text: "দিপুর টেবিলের দৈর্ঘ্য এবং প্রস্থ যথাক্রমে 52.7 সেমি এবং 43.6 সেমি। টেবিলটির দৈর্ঘ্য ও প্রস্থ একসাথে কত সেমি?" }, [96, 3]), // ৪, step 1
      it({ kind: "dsum", a: "96.3", op: "+", b: "96.3", unit: "সেমি", text: "দিপুর টেবিলের দৈর্ঘ্য এবং প্রস্থ যথাক্রমে 52.7 সেমি এবং 43.6 সেমি। টেবিলটির পরিসীমা কত? (দৈর্ঘ্য + প্রস্থ = 96.3 সেমি, পরিসীমা তার দুই গুণ)" }, [192, 6]), // ৪, step 2
      story("ক্ষেত্রফল নির্ণয় করি। আয়তক্ষেত্রটির দৈর্ঘ্য 5 সেমি এবং প্রস্থ 3 সেমি।", "5 × 3", "বর্গ সেমি", 15), // ৭ (১)
      story("ক্ষেত্রফল নির্ণয় করি। বর্গক্ষেত্রটির প্রতিটি বাহুর দৈর্ঘ্য 4 সেমি।", "4 × 4", "বর্গ সেমি", 16), // ৭ (২)
      story("ক্ষেত্রফল নির্ণয় করি। আয়তক্ষেত্রটির দৈর্ঘ্য 8 সেমি এবং প্রস্থ 2 সেমি।", "8 × 2", "বর্গ সেমি", 16), // ৭ (৩)
      story("বাগানটির দৈর্ঘ্য কত? বাগানটির ক্ষেত্রফল 115 বর্গ মি এবং প্রস্থ 5 মিটার।", "115 ÷ 5", "মিটার", 23), // ৮ (১)
      box("□ × 5 = 115", 23, "দৈর্ঘ্য × প্রস্থ = ক্ষেত্রফল: দৈর্ঘ্য × 5 মিটার = 115 বর্গ মি"),
      story("বাগানটির প্রস্থ কত? বাগানটির ক্ষেত্রফল 98 বর্গ মি এবং দৈর্ঘ্য 14 মি।", "98 ÷ 14", "মি", 7), // ৮ (২)
      box("14 × □ = 98", 7, "দৈর্ঘ্য × প্রস্থ = ক্ষেত্রফল: 14 মি × প্রস্থ = 98 বর্গ মি"),
      box("(16 × 2 + 5) × 50 = □", 1850, "জন্ম তারিখ ও মাস বের করার খেলা: সহপাঠীর জন্ম তারিখ 16 হলে, তার সঙ্গে 2 গুণ করে, গুণফলের সঙ্গে 5 যোগ করে, যোগফলকে 50 দিয়ে গুণ করি।"), // ১২
      box("1850 + 12 − 250 = □", 1612, "এবার গুণফলের সঙ্গে জন্ম মাস 12 যোগ করি, তারপর 250 বিয়োগ করি। বিয়োগফলের হাজার ও শতক স্থানের অঙ্ক দুইটি জন্ম তারিখ, দশক ও একক স্থানের অঙ্ক দুইটি জন্ম মাস।"),
    ],
    src: "p.142 নিজে করি ৪ (দিপুর টেবিল ৫২.৭ সেমি × ৪৩.৬ সেমি: দৈর্ঘ্য + প্রস্থ, then twice that, the perimeter ১৯২.৬ সেমি), ৭ (১)–(৩) (৫ × ৩, ৪ × ৪, ৮ × ২ সেমি, their sides written into the questions), ৮ (১)–(২) (the gardens: ১১৫ বর্গ মি with প্রস্থ ৫ মিটার; ৯৮ বর্গ মি with দৈর্ঘ্য ১৪ মি, each as a question and as a box), ১২ (the birthday game worked for a classmate born on ১৬/১২, বিজয় দিবস: mine)",
  });
  note("p.142 নিজে করি ৪ asks the perimeter «‘সেমি’ ও ‘মি’-এ»: the game works it in সেমি in two decimal sums (৫২.৭ + ৪৩.৬ = ৯৬.৩, then ৯৬.৩ + ৯৬.৩ = ১৯২.৬ সেমি; the first question «দৈর্ঘ্য ও প্রস্থ একসাথে কত সেমি?» is mine).");
  note("p.142 নিজে করি ১২ (the birthday game): the classmate's secret date is the reader's own; the game works it for ১৬/১২ (বিজয় দিবস): (১৬ × ২ + ৫) × ৫০ = ১৮৫০, ১৮৫০ + ১২ − ২৫০ = ১৬১২, read as ১৬ (তারিখ) and ১২ (মাস).");
  cant("p.142 নিজে করি ৪ in metres: ১৯২.৬ সেমি = ১.৯২৬ মি needs three places after the point; the change-of-unit rounds take two.");
  cant("p.142 নিজে করি ১১ (weigh yourself with the school's ক্ষুদে ডাক্তার and write it in কিলোগ্রাম and গ্রাম): real-world measuring.");
};
