// অধ্যায় ৫ · গুণ (printed pp.42–62): the 1–15 times tables (row facts, grids, flowers, a match), the rules (গুণক ১ বাড়লে,
// স্থান বিনিময়, ভেঙ্গে লিখে), × by 10s, multiplying in columns by a 1-digit and a 2-digit number, the review and the stories.
module.exports = (L) => {
  const { it, wio, q, mcq, match, eq, note, cant } = L;

  // a sum: in a row (the book's পাশাপাশি, a 2-digit number × a 1-digit one) or in columns (উপর-নিচ)
  const row = (a, b, want) => it({ kind: "sum", a, op: "×", b, layout: "row" }, want);
  const col = (a, b, want) => it({ kind: "sum", a, op: "×", b, layout: "column" }, want);
  const box = (text, want) => it({ kind: "missing", text }, want);
  const story = (text, sum, unit, want) => it({ kind: "word", text, sum, unit }, want);
  // a part of the 15 × 15 table (p.48): every cell blank; the survey lists no cells, each is row × column
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const table = (rows, cols) => it({ kind: "grid", rows, cols }, [].concat(...rows.map((r) => cols.map((c) => r * c))));

  // ── p.42: the 10 × 10 table's nine blanks ──
  wio({
    page: 42, slug: "times-table", title: "গুণের নামতা মনে করি · খালিঘর পূরণ করি",
    items: [
      row(3, 7, 21), row(4, 2, 8), row(4, 9, 36), row(5, 6, 30), row(6, 5, 30),
      row(7, 3, 21), row(8, 6, 48), row(9, 9, 81), row(10, 8, 80),
    ],
    fresh: { skill: "mul" },
    src: "p.42 মূল প্রশ্ন: the 9 blank cells of the 10 × 10 table (গুণ্য × গুণক, row × column, in the table's order)",
  });

  // ── p.43–44: the multiplier one more or one less, the factors swapped ──
  wio({
    page: 44, slug: "rules", title: "গুণের নিয়ম · খালিঘর পূরণ করি",
    items: [
      it({ kind: "pattern", terms: [6, 12, 18, 24, null, 36, 42, 48, 54, 60] }, [30]), // p.43 কাজ ১ (১): row 6 of the table
      box("6 × 5 = 6 × 4 + □", 6), // p.43 কাজ ১ (১): "□ করে বাড়ে", "৬ × ৫ = ৬ × ৪ + □"
      box("6 × 5 = 6 × 6 − □", 6), // "□ করে কমে", "৬ × ৫ = ৬ × ৬ − □"
      box("6 × 5 − 6 × 4 = □", 6), // the girl: "৬ × ৫ এর উত্তর ৬ × ৪ এর উত্তরের চেয়ে □ বেশি।"
      box("6 × 6 − 6 × 5 = □", 6), // the boy: "৬ × ৫ এর উত্তর ৬ × ৬ এর উত্তরের চেয়ে □ কম।"
      box("6 × 5 = □ × 6", 5), // p.43 কাজ ১ (২): the 6 × 5 array turned, "□ × □" (5 × 6): the first box
      box("6 × 5 = 5 × □", 6), // the second box
      box("4 × 6 = 4 × 5 + □", 4), // p.44 অনুশীলন ১ (১) "৪ × ৬ এর উত্তর ৪ × ৫ এর উত্তরের চেয়ে □ বেশি।"
      box("7 × 8 = 7 × 9 − □", 7), // (২) "৭ × ৮ এর উত্তর ৭ × ৯ এর উত্তরের চেয়ে □ কম।"
      box("5 × 4 = 5 × 3 + □", 5), // (৩)
      box("8 × 9 = 8 × 10 − □", 8), // (৪)
    ],
    src: "p.43 কাজ ১ (১) (row 6: 6, 12, 18, 24, □ …; ৬ × ৫ = ৬ × ৪ + □, ৬ × ৫ = ৬ × ৬ − □; the girl's □ বেশি and the boy's □ কম) and (২) (৬ × ৫ → □ × □, both boxes), p.44 অনুশীলন ১ (১)–(৪)",
  });

  // ── p.44–46: split a factor in two ──
  wio({
    page: 45, slug: "split", title: "গুণ্য বা গুণককে ভেঙ্গে লিখে গুণ করি",
    items: [
      row(3, 6, 18), // p.44 কাজ ২: "৩ × ৬ = □"
      box("8 × 6 = 3 × 6 + □ × 6", 5), // "□ × ৬ = □"
      box("3 × 6 + 5 × 6 = □", 48), // "একত্রে □"
      box("9 × 5 = 5 × 5 + □ × 5", 4), // p.44 অনুশীলন ২ (১)
      box("7 × 4 = 7 × □ + 7 × 2", 2), // (২)
      box("13 + 13 + 13 + 13 + 13 = □", 65), // p.45 মূল প্রশ্ন, the boy: "আমি ১৩ কে ৫ বার যোগ করেছি।"
      it({ kind: "pattern", terms: [45, 50, null, null, null] }, [55, 60, 65]), // the girl: ৫ × ৯ = ৪৫, ৫ × ১০ = ৫০, ৫ × ১১ … ৫ × ১৩
      row(10, 5, 50), // the boy: "আমি গুণ্যকে দুই ভাগে ভেঙ্গে লিখেছি।" "১০ × ৫ = □"
      box("13 × 5 = 10 × 5 + □ × 5", 3), // "□ × ৫ = □"
      row(14, 11, 154), // p.45 কাজ ১ "গুণের নিয়ম ব্যবহার করে ১৪ × ১১ হিসাব করি।"
      box("10 × 3 + 3 × 3 = □", 39), // p.46 কাজ ১: "১০ এর গুণ" + "৩ এর গুণ" (13 × 3)
    ],
    src: "p.44 কাজ ২ (৩ × ৬ = □, ৮ × ৬ = ৩ × ৬ + ৫ × ৬) and অনুশীলন ২ (১)–(২), p.45 মূল প্রশ্ন (১৩ × ৫ three ways; ১০ × ৫ = □) and কাজ ১ (১৪ × ১১), p.46 কাজ ১ (১০ × ৩ + ৩ × ৩)",
  });

  // ── p.46–47: the 12 and 13 tables, the flowers, the 14 table ──
  wio({
    page: 47, slug: "tables-12-13", title: "১২ ও ১৩ এর গুণের নামতা",
    items: [
      it({ kind: "grid", rows: [13], cols: range(1, 10), shown: ["0,0", "0,1"] }, [39, 52, 65, 78, 91, 104, 117, 130]), // p.46 মূল প্রশ্ন
      story("তাহসিন 13টি লাটিম কিনতে চায়। প্রতিটি লাটিমের দাম 8 টাকা হলে তার কত টাকার প্রয়োজন?", "8 × 13", "টাকা", 104), // p.47 অনুশীলন ১
      it({ kind: "grid", rows: [12], cols: [4, 5, 2, 9, 1, 7, 6, 3, 8], shown: ["0,1"] }, [48, 24, 108, 12, 84, 72, 36, 96]), // p.47 কাজ ২, flower 12 (60 printed)
      it({ kind: "grid", rows: [13], cols: [4, 6, 2, 8, 1, 7, 5, 3, 9], shown: ["0,7"] }, [52, 78, 26, 104, 13, 91, 65, 117]), // flower 13 (39 printed)
      // p.48's ১৫ এর ঘর পর্যন্ত table, rows ১২ and ১৩ past ১০ (row × column)
      row(12, 11, 132), row(12, 13, 156), row(12, 15, 180), row(13, 11, 143), row(13, 14, 182), row(13, 15, 195),
    ],
    src: "p.46 মূল প্রশ্ন (১৩এর গুণের নামতা, ১৩ × ১ and ১৩ × ২ printed), p.47 অনুশীলন ১ (লাটিম) and কাজ ২ (the ১২ and ১৩ flowers, 60 and 39 printed), p.48 মূল প্রশ্ন (six cells of rows ১২ and ১৩: × ১১, ১৩, ১৫ and × ১১, ১৪, ১৫)",
  });
  match({
    page: 47, slug: "table-14-match", type: "equation_match", title: "১৪ এর গুণের নামতা · দাগ টেনে মিল করি",
    pairs: ["14*1", "14*2", "14*3", "14*4", "14*5", "14*6", "14*7", "14*8", "14*9", "14*10"].map(eq),
    src: "p.47 অনুশীলন ২ (১৪ × ১ … ১৪ × ১০, all 10 pairs; 14 × 4 → 56 is the book's shown example)",
  });

  // ── p.48: the 15 × 15 table (the 10 × 10 block is printed; 125 cells blank) ──
  wio({
    page: 48, slug: "table-15-1", title: "১৫ এর ঘর পর্যন্ত গুণের নামতা (১)",
    items: [
      table(range(1, 5), range(11, 15)), table(range(6, 10), range(11, 15)), table([11], range(1, 15)),
      row(12, 12, 144), row(13, 13, 169), row(14, 14, 196), // three cells of the ১১–১৫ corner (rows ১২–১৪), row × column
    ],
    fresh: { skill: "grid" },
    src: "p.48 মূল প্রশ্ন: rows ১–১০ × columns ১১–১৫, row ১১ × columns ১–১৫, and the cells ১২ × ১২, ১৩ × ১৩, ১৪ × ১৪",
  });
  wio({
    page: 48, slug: "table-15-2", title: "১৫ এর ঘর পর্যন্ত গুণের নামতা (২)",
    items: [
      table([12], range(1, 15)), table([13], range(1, 15)), table([14], range(1, 15)), table([15], range(1, 15)),
      row(11, 11, 121), row(11, 14, 154), // two cells of row ১১ (the first part's), row × column
    ],
    fresh: { skill: "grid" },
    src: "p.48 মূল প্রশ্ন: rows ১২–১৫ × columns ১–১৫, and the cells ১১ × ১১, ১১ × ১৪",
  });

  // ── p.49: tens times a 1-digit number ──
  wio({
    page: 49, slug: "tens-1", title: "২০, ৩০, ৪০ … দিয়ে গুণ করি (১)",
    items: [
      story("একটি আনারসের দাম 20 টাকা। যদি তুমি 4টি ক্রয় করো তবে এর দাম কত হবে?", "20 × 4", "টাকা", 80), // p.49 মূল প্রশ্ন (printed 80)
      row(3, 5, 15), row(30, 5, 150), // p.49 কাজ ১ "৩ × ৫ = □", then ৩০ × ৫
      row(20, 3, 60), row(40, 2, 80), row(30, 4, 120), row(50, 6, 300), // অনুশীলন ১ (১)–(৪)
      row(10, 3, 30), // p.52 মূল প্রশ্ন "১০ × ৩ = □" (17 split into 10 and 7)
      row(30, 3, 90), row(200, 3, 600), // p.54 মূল প্রশ্ন "৩০ × ৩ = ৯০", "২০০ × ৩ = ৬০০" (231 × 3 split; printed)
    ],
    src: "p.49 মূল প্রশ্ন (আনারস, printed 80), কাজ ১ (৩ × ৫, ৩০ × ৫), অনুশীলন ১ (১)–(৪); p.52 মূল প্রশ্ন (১০ × ৩), p.54 মূল প্রশ্ন (৩০ × ৩, ২০০ × ৩, printed)",
  });

  // ── p.50–53: a 2-digit number × a 1-digit number ──
  wio({
    page: 51, slug: "mul-1", title: "উপর-নিচ ও পাশাপাশি গুণ করি (১)",
    items: [
      col(23, 3, 69), // p.51 কাজ ১ (p.50 মূল প্রশ্ন, বিস্কুট: printed ২৩ × ৩ = ৬৯)
      col(12, 4, 48), col(21, 4, 84), col(32, 3, 96), col(22, 2, 44), col(30, 2, 60), col(20, 3, 60), // অনুশীলন ১ উপর-নিচ (১)–(৬)
      row(34, 2, 68), row(24, 2, 48), row(30, 3, 90), row(20, 4, 80), // অনুশীলন ২ পাশাপাশি (১)–(৪)
    ],
    fresh: { skill: "mulcol", digits: 2, carry: "no" },
    src: "p.50 মূল প্রশ্ন / p.51 কাজ ১ (২৩ × ৩, printed 69), p.51 অনুশীলন ১ (১)–(৬) উপর-নিচ, অনুশীলন ২ (১)–(৪) পাশাপাশি",
  });
  wio({
    page: 52, slug: "mul-2", title: "উপর-নিচ ও পাশাপাশি গুণ করি (২)",
    items: [
      col(17, 3, 51), // p.52 মূল প্রশ্ন and কাজ ১ (printed 51)
      col(24, 4, 96), col(12, 8, 96), col(48, 2, 96), // অনুশীলন ১ উপর-নিচ (১), (২), (৩) [printed "(২)" twice]
      row(18, 5, 90), row(26, 3, 78), row(39, 2, 78), row(25, 4, 100), // অনুশীলন ২ পাশাপাশি (১)–(৪)
    ],
    fresh: { skill: "mulcol", digits: 2, carry: "yes" },
    src: "p.52 মূল প্রশ্ন / কাজ ১ (১৭ × ৩, printed 51), অনুশীলন ১ (১)–(৩) উপর-নিচ (the book numbers the third “(২)” again), অনুশীলন ২ (১)–(৪) পাশাপাশি",
  });
  wio({
    page: 53, slug: "mul-3", title: "উপর-নিচ ও পাশাপাশি গুণ করি (৩)",
    items: [
      col(43, 3, 129), col(67, 3, 201), // p.53 মূল প্রশ্ন (১), (২) (printed)
      row(62, 4, 248), row(41, 5, 205), row(72, 3, 216), row(37, 5, 185), // অনুশীলন ১ পাশাপাশি (১)–(৪)
      row(32, 8, 256), row(68, 4, 272), row(79, 2, 158), row(95, 6, 570), // (৫)–(৮)
    ],
    fresh: { skill: "mulcol", digits: 2, carry: "yes" },
    src: "p.53 মূল প্রশ্ন (৪৩ × ৩ printed 129, ৬৭ × ৩ printed 201), অনুশীলন ১ (১)–(৮) পাশাপাশি",
  });

  // ── p.54–55: a 3-digit number × a 1-digit number ──
  const inColumns = "অনুশীলনের গুণগুলো বইয়ে পাশাপাশি দেওয়া; খেলায় উপর-নিচ করে গুণ করি, যেমন বইয়ের উদাহরণে।";
  wio({
    page: 54, slug: "mul-3digit-1", title: "তিন অঙ্কের সংখ্যা গুণ করি (১)",
    items: [col(231, 3, 693), col(121, 4, 484), col(314, 2, 628), col(232, 3, 696), col(423, 2, 846)],
    fresh: { skill: "mulcol", digits: 3, carry: "no" },
    src: "p.54 মূল প্রশ্ন (২৩১ × ৩, printed 693), অনুশীলন ১ (১)–(৪) (পাশাপাশি in the book)",
    notes: [inColumns],
  });
  wio({
    page: 55, slug: "mul-3digit-2", title: "তিন অঙ্কের সংখ্যা গুণ করি (২)",
    items: [col(286, 4, 1144), col(162, 3, 486), col(273, 2, 546), col(153, 5, 765), col(249, 4, 996), col(912, 3, 2736), col(651, 4, 2604)],
    fresh: { skill: "mulcol", digits: 3, carry: "yes" },
    src: "p.55 কাজ ১ (২৮৬ × ৪, printed 1144), অনুশীলন ২ (১)–(৬) (পাশাপাশি in the book)",
    notes: [inColumns],
  });
  wio({
    page: 55, slug: "mul-3digit-3", title: "তিন অঙ্কের সংখ্যা গুণ করি (৩)",
    items: [col(276, 7, 1932), col(475, 8, 3800), col(604, 8, 4832), col(207, 5, 1035), col(820, 7, 5740), col(380, 6, 2280)],
    fresh: { skill: "mulcol", digits: 3, carry: "yes" },
    src: "p.55 অনুশীলন ২ (৭)–(১২) (পাশাপাশি in the book)",
    notes: [inColumns],
  });

  // ── p.56: multiples of ten ──
  wio({
    page: 56, slug: "tens-2", title: "২০, ৩০, ৪০ … দিয়ে গুণ করি (২)",
    items: [
      story("একটি শ্রেণিতে 30টি বেঞ্চ আছে। প্রতিটি বেঞ্চে 4 জন শিক্ষার্থী বসতে পারে। তাহলে 30টি বেঞ্চে কতজন শিক্ষার্থী বসতে পারবে?", "4 × 30", "জন", 120), // মূল প্রশ্ন (printed 120)
      row(2, 4, 8), row(20, 4, 80), row(20, 40, 800), // কাজ ১ (the book prints "২ × ৪ = ১২": fixed)
      row(3, 20, 60), row(7, 40, 280), row(8, 60, 480), row(4, 50, 200), // অনুশীলন ১ (১)–(৪)
      row(12, 30, 360), row(25, 20, 500), row(30, 50, 1500), row(60, 70, 4200), // (৫)–(৮)
    ],
    src: "p.56 মূল প্রশ্ন (বেঞ্চ, ৪ × ৩০, printed 120), কাজ ১ (২ × ৪ → ২০ × ৪ → ২০ × ৪০), অনুশীলন ১ (১)–(৮)",
    notes: ["কাজ ১: বইয়ে ২০ × ৪০ এর ঘরের নিচে “২ × ৪ = ১২” ছাপা হয়েছে; সঠিক হলো ২ × ৪ = ৮।"],
  });

  // ── p.57–61: a 2-digit number × a 2-digit number ──
  wio({
    page: 58, slug: "mul-2digit-1", title: "দুই অঙ্কের সংখ্যা দিয়ে গুণ করি (১)",
    items: [
      story("মিনা 13টি পেনসিল কিনেছে। যদি প্রতিটি পেনসিলের দাম 21 টাকা হয়, তবে সবগুলো পেনসিলের মোট দাম কত হবে?", "21 × 13", "টাকা", 273), // p.57 মূল প্রশ্ন
      it({ kind: "grid", rows: [10, 3], cols: [20, 1] }, [200, 10, 60, 3]), // p.57: ২১ = ২০ + ১, ১৩ = ১০ + ৩ (the area grid)
      col(21, 13, 273), // p.58 (printed 273: 63, 210)
      col(12, 24, 288), col(63, 16, 1008), col(30, 23, 690), // অনুশীলন ১ উপর-নিচ (১)–(৩)
      col(41, 23, 943), col(25, 24, 600), col(17, 42, 714), col(15, 36, 540), // অনুশীলন ২ পাশাপাশি (১)–(৪)
    ],
    src: "p.57 মূল প্রশ্ন (পেনসিল, ২১ × ১৩, printed 273) and its area grid (২০ | ১ × ১০ | ৩), p.58 (২১ × ১৩ উপর-নিচ), অনুশীলন ১ (১)–(৩), অনুশীলন ২ (১)–(৪) (পাশাপাশি in the book)",
    notes: ["অনুশীলন ২ এর গুণগুলো বইয়ে পাশাপাশি দেওয়া; খেলায় উপর-নিচ করে গুণ করি, যেমন পৃষ্ঠা 58 এর উদাহরণে।"],
  });
  wio({
    page: 59, slug: "mul-2digit-2", title: "দুই অঙ্কের সংখ্যা দিয়ে গুণ করি (২)",
    items: [
      col(43, 35, 1505), col(36, 53, 1908), col(37, 40, 1480), // p.59 কাজ ১ (১)–(৩) (worked in the book)
      col(17, 68, 1156), col(91, 25, 2275), col(54, 20, 1080), col(27, 60, 1620), col(95, 27, 2565), col(59, 29, 1711), // অনুশীলন ৩ (১)–(৬)
    ],
    fresh: { skill: "mul2", digits: 2 },
    src: "p.59 কাজ ১ (১)–(৩) (৪৩ × ৩৫, ৩৬ × ৫৩, ৩৭ × ৪০: worked in the book, “ব্যাখ্যা করি”), অনুশীলন ৩ (১)–(৬) উপর-নিচ",
    notes: ["৩৭ × ৪০: বইয়ে দ্বিতীয় সারির ১৪৮ এক ঘর বামে সরিয়ে লেখা, ০ ছাড়া। খেলায় পৃষ্ঠা 58 এর মতো ০ বসিয়ে ১৪৮০ লিখি; গুণফল একই, ১৪৮০।"],
  });
  wio({
    page: 59, slug: "mul-2digit-3", title: "দুই অঙ্কের সংখ্যা দিয়ে গুণ করি (৩)",
    items: [col(35, 57, 1995), col(81, 49, 3969), col(25, 64, 1600), col(48, 96, 4608), col(12, 30, 360), col(38, 20, 760), col(87, 50, 4350), col(70, 80, 5600)],
    fresh: { skill: "mul2", digits: 2 },
    src: "p.59 অনুশীলন ৪ (১)–(৮) (পাশাপাশি in the book)",
    notes: [inColumns],
  });

  // ── p.60: a 3-digit number × a 2-digit number ──
  wio({
    page: 60, slug: "mul-3by2-1", title: "তিন অঙ্কের সংখ্যাকে দুই অঙ্কের সংখ্যা দিয়ে গুণ করি (১)",
    items: [col(367, 25, 9175), col(213, 23, 4899), col(163, 47, 7661), col(264, 27, 7128), col(314, 26, 8164), col(367, 32, 11744), col(685, 83, 56855)],
    fresh: { skill: "mul2", digits: 3 },
    src: "p.60 মূল প্রশ্ন (৩৬৭ × ২৫, printed 9175: 1835, 7340), অনুশীলন ১ (১)–(৬) (পাশাপাশি in the book)",
    notes: [inColumns],
  });
  wio({
    page: 60, slug: "mul-3by2-2", title: "তিন অঙ্কের সংখ্যাকে দুই অঙ্কের সংখ্যা দিয়ে গুণ করি (২)",
    items: [col(517, 43, 22231), col(528, 79, 41712), col(404, 42, 16968), col(203, 54, 10962), col(309, 85, 26265), col(708, 26, 18408), col(502, 63, 31626)],
    fresh: { skill: "mul2", digits: 3 },
    src: "p.60 অনুশীলন ১ (৭)–(১২) (পাশাপাশি in the book), অনুশীলন ২ (৫০২ × ৬৩)",
    notes: [inColumns],
  });

  // ── p.61: নিজে করি ১–৩ ──
  mcq({
    page: 61, slug: "tick-right-answer", title: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দিই",
    questions: [
      q({ prompt: "500 × 30 এর গুণফল নিচের কোনটি?", options: ["150", "1500", "15000", "150000"], book: "গ", num: 15000, why: "5 × 3 = 15। 500 × 30 এ মোট 3টি শূন্য, তাই গুণফল 15000।" }),
      q({ prompt: "172 × 50 এর গুণফল নিচের কোনটি?", options: ["5500", "8500", "8600", "17250"], book: "গ", num: 8600, why: "172 × 5 = 860, তাই 172 × 50 = 860 এর 10 গুণ = 8600।" }),
      q({ prompt: "নিচের কোনটির গুণফল 70 × 50 এর সমান", options: ["7 × 5", "7 × 50", "70 × 5", "50 × 70"], book: "ঘ", why: "গুণ্য ও গুণক স্থান বিনিময় করলেও গুণফল একই থাকে: 70 × 50 = 50 × 70 = 3500।" }),
      // the chapter's boxes, asked (questions of ours)
      q({ prompt: "3 × 7 = 21 এ গুণক কোনটি?", options: ["3", "7", "21"], answer: "7", num: 7, why: "গুণের ক্ষেত্রে প্রথম সংখ্যাটি হলো গুণ্য এবং দ্বিতীয় সংখ্যাটি হলো গুণক। এখানে 3 গুণ্য, 7 গুণক।" }),
      q({ prompt: "3 × 7 = 21 এ 21 কে কী বলে?", options: ["গুণফল", "গুণ্য", "গুণক"], answer: "গুণফল", why: "গুণ্য × গুণক = গুণফল। 3 × 7 = 21, তাই 21 হলো গুণফল।" }),
      q({ prompt: "গুণক 1 করে বৃদ্ধি পেলে গুণফল কত করে বৃদ্ধি পায়?", options: ["গুণ্যের সমান", "গুণকের সমান", "1 করে"], answer: "গুণ্যের সমান", why: "6 × 4 = 24, 6 × 5 = 30: গুণক 1 বাড়লে গুণফল 6 বাড়ে, গুণ্যের সমান।" }),
      q({ prompt: "গুণক 1 করে কমে গেলে গুণফল কত করে কমে যায়?", options: ["গুণ্যের সমান", "গুণকের সমান", "1 করে"], answer: "গুণ্যের সমান", why: "6 × 6 = 36, 6 × 5 = 30: গুণক 1 কমলে গুণফল 6 কমে, গুণ্যের সমান।" }),
      q({ prompt: "8 × 6 এর গুণফল নিচের কোনটির সমান?", options: ["3 × 6 + 5 × 6", "3 × 6 + 5", "8 × 3 + 6", "3 + 5 × 6"], answer: "3 × 6 + 5 × 6", why: "গুণ্য 8 কে 3 ও 5 এ ভেঙ্গে লিখি: 3 × 6 = 18, 5 × 6 = 30, একত্রে 48 = 8 × 6।" }),
      q({ prompt: "20 সংখ্যাটিতে 2টি দশ আছে। 20 × 4 এর উত্তর কতটি দশ?", options: ["8 দশ", "6 দশ", "2 দশ", "80 দশ"], answer: "8 দশ", num: 8, why: "2 × 4 = 8, তাই 20 × 4 = 8 দশ = 80।" }),
      q({ prompt: "21 × 13 উপর-নিচ গুণ করতে দ্বিতীয় সারিতে 21 × 1 কে কীভাবে লিখি?", options: ["210", "21", "2100"], answer: "210", num: 210, why: "13 এর 1 হলো 1 দশ: 21 × 10 = 210। তাই 21 এক ঘর বামে সরে যায়।" }),
      q({ prompt: "4 × 30 এর গুণফল 4 × 3 এর গুণফলের কত গুণ?", options: ["10 গুণ", "3 গুণ", "30 গুণ", "100 গুণ"], answer: "10 গুণ", num: 10, why: "4 × 3 = 12 এবং 4 × 30 = 120। 120 হলো 12 এর 10 গুণ।" }),
    ],
    src: "p.61 নিজে করি ১ (১)–(৩) (the book's options in its order; answers গ, গ, ঘ), then eight of ours from the chapter's boxes and examples: p.42 (গুণ্য, গুণক), p.50 (গুণ্য × গুণক = গুণফল), p.43 (গুণক ১ বাড়লে, কমলে), p.44 (ভেঙ্গে লিখে), p.49 (৮ দশ), p.58 (২১ × ১ written ২১০) and p.56 (১০ গুণ)",
  });
  wio({
    page: 61, slug: "nije-2", title: "নিজে করি: গুণ করি (১)",
    items: [
      row(15, 5, 75), row(18, 9, 162), row(53, 8, 424), row(75, 6, 450), // নিজে করি ২ (১)–(৪)
      col(21, 31, 651), col(48, 93, 4464), col(121, 31, 3751), col(495, 14, 6930), col(284, 28, 7952), col(269, 35, 9415), // (৫)–(১০)
    ],
    src: "p.61 নিজে করি ২ (১)–(১০) (in a row in the book; (৫)–(১০), with a 2-digit multiplier, in columns)",
    notes: ["(৫)–(১০) বইয়ে পাশাপাশি দেওয়া; খেলায় উপর-নিচ করে গুণ করি।"],
  });
  wio({
    page: 61, slug: "nije-3", title: "নিজে করি: গুণ করি (২)",
    items: [
      col(14, 2, 28), col(56, 6, 336), col(90, 5, 450), col(36, 48, 1728), col(28, 73, 2044), col(89, 64, 5696),
      col(121, 23, 2783), col(305, 7, 2135), col(486, 9, 4374), col(210, 20, 4200), col(373, 28, 10444), col(298, 35, 10430),
    ],
    src: "p.61 নিজে করি ৩ (১)–(১২) (columns)",
  });

  // ── p.60, p.62: stories ──
  wio({
    page: 62, slug: "stories", title: "নিজে করি: গুণের গল্প",
    items: [
      story("রেজা তিন প্যাকেট বিস্কুট কিনতে চায়। এক প্যাকেটের দাম 23 টাকা। এজন্য তার কত টাকার প্রয়োজন?", "23 × 3", "টাকা", 69), // p.50 মূল প্রশ্ন
      story("তন্দ্রা চাকমা গাড়ি চালিয়ে ঘণ্টায় 45 কিলোমিটার যান। একই গতিতে 8 ঘণ্টায় তিনি কত কিলোমিটার যাবেন?", "45 × 8", "কিলোমিটার", 360), // p.60 অনুশীলন ৩
      story("4টিতে 1 হালি হয়। 5 হালিতে কতগুলো হবে?", "4 × 5", "টি", 20), // নিজে করি ৪
      story("যদি এক গুচ্ছে 6টি ফুল থাকে, তবে এরকম 8 গুচ্ছে কয়টি ফুল থাকবে?", "6 × 8", "টি ফুল", 48), // ৫
      story("তাসকিয়া প্রতিদিন 4 ঘণ্টা করে বই পড়ে। এক সপ্তাহে সে কত ঘণ্টা বই পড়ে?", "4 × 7", "ঘণ্টা", 28), // ৬ (1 সপ্তাহ = 7 দিন)
      story("এক দিস্তা কাগজে 24 তা থাকে। 12 দিস্তায় কত তা কাগজ থাকবে?", "24 × 12", "তা", 288), // ৭
      story("100 পয়সায় 1 টাকা হয়। 10 টাকায় কত পয়সা হবে?", "100 × 10", "পয়সা", 1000), // ৮
      story("একটি বইয়ে 130 পৃষ্ঠা আছে। এরূপ 28টি বইয়ে কত পৃষ্ঠা আছে?", "130 × 28", "পৃষ্ঠা", 3640), // ৯
      story("মিলির টাকার 14 গুণ টাকা মুন্নীর কাছে আছে। মিলির কাছে যদি 225 টাকা থাকে, তবে মুন্নীর কাছে কত টাকা আছে?", "225 × 14", "টাকা", 3150), // ১০
      story("একটি ইলিশ মাছের দাম 750 টাকা। এরূপ 20টি ইলিশ মাছের দাম কত?", "750 × 20", "টাকা", 15000), // ১১
    ],
    src: "p.50 মূল প্রশ্ন (রেজা, বিস্কুট), p.60 অনুশীলন ৩ (তন্দ্রা চাকমা), p.62 নিজে করি ৪–১১",
    notes: ["নিজে করি ৬: ১ সপ্তাহ = ৭ দিন।"],
  });

  // ── notes and what can't be played ──
  note("p.52 অনুশীলন ১: the book numbers its third sum “(২)” again (24 × 4, 12 × 8, 48 × 2); the src calls them (১)–(৩). All three make 96, which looks intentional, so the sums are kept.");
  note("p.56 কাজ ১: the book prints “২ × ৪ = ১২” under the 20 × 40 box; the activity asks 2 × 4 = □ with the right answer 8 (then 20 × 4 = 80, 20 × 40 = 800), and its guide note says so.");
  note("p.59 কাজ ১ (৩) 37 × 40: the book's worked column writes row 1 as `00` and row 2 as `148` shifted one place left WITHOUT its 0 (the only place the placeholder 0 is missing). It is played as a normal column sum (the second row 1480, as p.58 teaches; the product 1480 either way); the guide note tells the child. p.59 কাজ ১ asks to explain the three worked sums; the activity has the child work them.");
  note("পাশাপাশি গুণ করি (the book's sums in a row): a 2-digit number × a 1-digit one stays in a row (p.51 অনুশীলন ২, p.52 অনুশীলন ২, p.53 অনুশীলন ১, p.61 নিজে করি ২ (১)–(৪)): the book's split (20 × 3 + 3 × 3, the purple boxes) works in the head. A 3-digit number or a 2-digit multiplier is played in columns (p.54 অনুশীলন ১, p.55 অনুশীলন ২, p.58 অনুশীলন ২, p.59 অনুশীলন ৪, p.60 অনুশীলন ১, p.61 নিজে করি ২ (৫)–(১০)): the column round is the working the pages' own examples show and a child would write on paper; each of those activities says so in its guide note.");
  note("p.42: the 10 × 10 table's 9 blanks are 9 facts in a row, গুণ্য × গুণক (row × column: 3 × 7, 4 × 2 …), as the girl reads the first one; fresh times-table facts follow.");
  note("p.43 কাজ ১: “□ করে বাড়ে / □ করে কমে” and the two boxes are the equations 6 × 5 = 6 × 4 + □ and 6 × 5 = 6 × 6 − □; the turned array “□ × □” (5 × 6) is 6 × 5 = □ × 6 (one box). p.44 অনুশীলন ১ (১)–(২) are sentences (“৪ × ৬ এর উত্তর ৪ × ৫ এর উত্তরের চেয়ে □ বেশি”), played as 4 × 6 = 4 × 5 + □ and 7 × 8 = 7 × 9 − □ (the form of (৩)–(৪)).");
  note("p.44 কাজ ২ (split the গুণ্য) is two boxes: 8 × 6 = 3 × 6 + □ × 6 (5) and 3 × 6 + 5 × 6 = □ (48). p.45 মূল প্রশ্ন is three items: 13 + 13 + 13 + 13 + 13 = □ (a missing-number box: a column sum takes at most 4 numbers), the pattern 45, 50, □, □, □ (5 × 11 … 5 × 13) and 13 × 5 = 10 × 5 + □ × 5. p.46 কাজ ১ (one box) is 10 × 3 + 3 × 3 = □ (39).");
  note("p.46–47: the ১৩ table is a grid row (13 × 1 and 13 × 2 shown, as printed); the flowers are grid rows with the petals in the order the survey lists them and the printed petal shown (60 by the 5; 39 by the 3). The লাটিম story (p.47 অনুশীলন ১) is in the same activity, as it uses the 13 table; its sum is 8 × 13 (price × number, p.50's “১ প্যাকেটের দাম × প্যাকেটের সংখ্যা”).");
  note("p.47 অনুশীলন ২ (match 14 × 1 … 14 × 10): all 10 pairs, the book's shown example 14 × 4 → 56 among them (matches play in rounds of up to 6).");
  note("p.48: the 15 × 15 table's 125 blank cells are 7 grids in two activities: rows 1–5 and 6–10 × columns 11–15, then rows 11, 12, 13, 14, 15 one at a time × columns 1–15 (the printed 10 × 10 block isn't asked). The survey lists no cells; each is row × column. To reach 10 questions (3 Nov rule) each activity also asks a few cells as facts in a row, taken from the other activity's part so no cell is asked twice in one activity: (১) 12 × 12, 13 × 13, 14 × 14; (২) 11 × 11, 11 × 14; and both add 5 fresh table rows (11–15). “১২ ও ১৩ এর গুণের নামতা” (p.47) also asks six cells of rows 12 and 13 past 10 (12 × 11, 12 × 13, 12 × 15, 13 × 11, 13 × 14, 13 × 15), so a few p.48 cells appear in two activities.");
  note("p.50 মূল প্রশ্ন (রেজা, বিস্কুট, ২৩ × ৩ = ৬৯ printed): p.51 কাজ ১'s column 23 × 3 (the first item of “উপর-নিচ ও পাশাপাশি গুণ করি (১)”) works it; the story itself is the first item of “নিজে করি: গুণের গল্প” (p.62), added on 3 Nov to reach 10 questions. Its “তিন প্যাকেট” is in words, as printed.");
  note("3 Nov top-ups (every activity at least 10 questions), from unused boxes of the chapter: “গুণের নিয়ম” (p.44) adds the girl's and the boy's boxes of p.43 কাজ ১ (১) (6 × 5 − 6 × 4 = □, 6 × 6 − 6 × 5 = □) and the second box of the turned array (6 × 5 = 5 × □); “ভেঙ্গে লিখে” (p.45) adds p.44 কাজ ২'s 3 × 6 = □ and p.45's 10 × 5 = □; “২০, ৩০, ৪০ … দিয়ে গুণ করি (১)” (p.49) adds p.52 মূল প্রশ্ন's 10 × 3 = □ and p.54 মূল প্রশ্ন's printed split 30 × 3 = 90, 200 × 3 = 600.");
  note("p.56 মূল প্রশ্ন: the story's sum is 4 × 30, the book's গাণিতিক বাক্য (4 students a bench × 30 benches; the opposite order from p.50's price × number).");
  note("p.57: the area grid (columns 20 | 1, rows 10 | 3 → 200, 10, 60, 3) is a grid round with rows 10, 3 and columns 20, 1.");
  note("p.61 multiple choice: নিজে করি ১ (১)–(৩) keep the book's options in its order (গ, গ, ঘ); (৩)'s prompt keeps the book's wording without a question mark. Eight questions of ours follow (the book has no more multiple choice in the chapter), each from a box or worked example of the chapter with one certain answer: p.42 গুণ্য/গুণক, p.50 গুণ্য × গুণক = গুণফল, p.43 গুণক ১ বাড়লে / কমলে, p.44 ভেঙ্গে লিখে (8 × 6 = 3 × 6 + 5 × 6), p.49 “৮ দশ”, p.58 (21 × 1 written 210 in the second row) and p.56 ১০ গুণ.");
  note("p.62 নিজে করি ৪ (হালি): the unit is “টি”; নিজে করি ৬ needs 1 সপ্তাহ = 7 দিন (4 × 7), which the guide note says.");
  cant("p.43–46, p.50, p.54, p.57 dot arrays and place-value charts (turn the 6 × 5 array, cut the 8 × 6 array, the 13-row dot grid with the sliding card, the 10s-and-1s groups): no array round multiplies; their boxes are asked as equations, grids or column sums.");
  cant("p.44 কাজ ২ “গুণককে ভেঙ্গে লিখে হিসাব করি” (8 × □ = □, 8 × □ = □: any split of 6 works): an open answer.");
  cant("p.59 কাজ ১ “ব্যাখ্যা করি” and p.58's “চিন্তা করি কেন ২১ কে এক ঘর বামে সরিয়ে নেওয়া হলো”, p.56's “তুলির ধারণাটি ব্যাখ্যা করি”: explaining; the sums themselves are played.");
  cant("The steps the pages print (the partial products in the purple boxes, 10 × 3 = □ before 17 × 3, 21 × 10 = 210 and 21 × 3 = 63 on p.57): the column round shows its own partial products; only the boxes the child fills are asked.");
};
