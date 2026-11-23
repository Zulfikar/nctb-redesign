// অধ্যায় ২ · যোগ (printed pp.21–30): column and row sums of 3–5-digit numbers (carries, 3–4 addends, answers up to
// 101408), missing digits in a sum, one-step stories, the নিজে করি multiple choice and match.
module.exports = (L) => {
  const { it, wio, q, mcq, match, eq, note, cant } = L;
  const add = (a, b, layout = "row") => ({ kind: "sum", a, op: "+", b, layout });
  const add3 = (terms, layout = "row") => ({ kind: "sum", terms, op: "+", layout });
  const word = (text, sum, unit) => (unit ? { kind: "word", text, sum, unit } : { kind: "word", text, sum });

  // ── p.21: 3-digit numbers, no carry ──
  wio({
    page: 21, slug: "add-3digit", title: "তিন অঙ্কের সংখ্যা যোগ করি",
    items: [
      it(add(453, 325, "column"), 778),
      it(add(333, 44), 377), it(add(500, 200), 700), it(add(234, 155), 389), it(add(53, 412), 465), it(add(510, 245), 755), it(add(250, 22), 272),
      it(add(16, 352, "column"), 368), it(add(253, 524, "column"), 777), it(add(415, 230, "column"), 645),
    ],
    fresh: { skill: "add", digits: 3, carry: "no", layout: "column" },
    src: "p.21 মূল প্রশ্ন 453 + 325 in columns (printed 778), অনুশীলন ১ (১)–(৬) in a row, (৭)–(৯) in columns",
  });

  // ── p.22: three numbers in one sum, no carry ──
  wio({
    page: 22, slug: "add-three", title: "তিনটি সংখ্যা যোগ করি",
    items: [
      it(add3([231, 425, 342], "column"), 998),
      it(add3([200, 300, 400]), 900), it(add3([321, 123, 222]), 666), it(add3([147, 401, 251]), 799), it(add3([222, 111, 555]), 888),
      it(add3([352, 234, 311], "column"), 897), it(add3([610, 173, 116], "column"), 899), it(add3([532, 55, 401], "column"), 988),
      it(add3([2133, 2113, 5343], "column"), 9589),
    ],
    fresh: { skill: "add3", digits: 3, carry: "no", layout: "column" },
    src: "p.22 মূল প্রশ্ন 231 + 425 + 342 (printed 998), অনুশীলন ১ (১)–(৪) in a row, (৫)–(৭) in columns, কাজ ১ 2133 + 2113 + 5343 (printed 9589)",
  });

  // ── p.23: three or four numbers (one carry on the page) ──
  wio({
    page: 23, slug: "add-many-row", title: "পাশাপাশি তিন-চারটি সংখ্যা যোগ করি",
    items: [
      it(add3([105, 230, 33]), 368), it(add3([3333, 4444, 2222]), 9999), it(add3([243, 410, 202]), 855), it(add3([3412, 2131, 4243]), 9786),
      it(add3([2312, 3, 240, 23]), 2578), it(add3([2340, 3003, 2102, 241]), 7686), it(add3([2222, 1111, 4321, 1234]), 8888), it(add3([4133, 2301, 1425, 2140]), 9999),
    ],
    fresh: { skill: "add3", digits: 4, carry: "no", layout: "row" },
    src: "p.23 অনুশীলন ২ (১)–(৪), অনুশীলন ৩ (১)–(৪) (all in a row)",
  });
  wio({
    page: 23, slug: "add-many-column", title: "উপর-নিচ তিন-চারটি সংখ্যা যোগ করি",
    items: [
      it(add3([1032, 4130, 3615, 1211], "column"), 9988), it(add3([2502, 3163, 2211, 1011], "column"), 8887), it(add3([3041, 403, 4255, 1300], "column"), 8999),
      it(add3([3054, 432, 4310], "column"), 7796), it(add3([4131, 3822, 1048], "column"), 9001), it(add3([4030, 1415, 2351], "column"), 7796),
    ],
    fresh: { skill: "add3", digits: 4, layout: "column" },
    src: "p.23 অনুশীলন ৩ (৫)–(১০) (in columns)",
  });

  // ── p.24: carrying; missing digits ──
  wio({
    page: 24, slug: "add-carry", title: "হাতে রেখে যোগ করি",
    items: [
      it(add3([289, 240, 265], "column"), 794),
      it(add(228, 356), 584), it(add(345, 474), 819), it(add(467, 245), 712), it(add(683, 328), 1011),
      it(add(436, 378, "column"), 814), it(add(519, 284, "column"), 803), it(add(635, 379, "column"), 1014),
    ],
    fresh: { skill: "add", digits: 3, carry: "yes", layout: "column" },
    src: "p.24 মূল প্রশ্ন 289 + 240 + 265 রান in columns (printed 794), অনুশীলন ১ (১)–(৪) in a row, (৫)–(৭) in columns",
  });
  wio({
    page: 24, slug: "missing-digits", title: "খালিঘরের অঙ্ক খুঁজে বের করি",
    items: [
      it({ kind: "mdigit", terms: ["□10", "2□5", "10□"], op: "+", total: "857", layout: "row" }, [5, 4, 2]),
      it({ kind: "mdigit", terms: ["3□12", "□131", "42□6"], op: "+", total: "978□", layout: "row" }, [4, 2, 4, 9]),
      it({ kind: "mdigit", terms: ["41□0", "□34", "□085"], op: "+", total: "639□", layout: "column" }, [8, 1, 2, 9]),
      it({ kind: "mdigit", terms: ["30□0", "□627", "4□01"], op: "+", total: "886□", layout: "column" }, [4, 1, 2, 8]),
    ],
    fresh: { skill: "mdigit", digits: 4, layout: "column" },
    src: "p.24 অনুশীলন ২ (১)–(২) in a row, (৩)–(৪) in columns",
  });

  // ── p.25: 4-digit numbers, in columns and in a row ──
  wio({
    page: 25, slug: "add-4digit-column", title: "চার অঙ্কের সংখ্যা উপর-নিচ যোগ করি",
    items: [
      it(add(3876, 5508, "column"), 9384),
      it(add(2133, 5423, "column"), 7556), it(add(6382, 1676, "column"), 8058), it(add(5913, 68, "column"), 5981),
      it(add(2876, 5823, "column"), 8699), it(add(8097, 1786, "column"), 9883), it(add(9584, 469, "column"), 10053),
    ],
    fresh: { skill: "add", digits: 4, carry: "yes", layout: "column" },
    src: "p.25 কাজ ১ 3876 + 5508 (printed 9384), অনুশীলন ৩ (১)–(৬) উপর-নিচ যোগ করি",
  });
  wio({
    page: 25, slug: "add-4digit-row", title: "চার অঙ্কের সংখ্যা পাশাপাশি যোগ করি",
    items: [
      it(add(240, 2312), 2552), it(add(2537, 1824), 4361), it(add(3628, 4591), 8219),
      it(add(327, 896), 1223), it(add(687, 2365), 3052), it(add(7, 2453), 2460),
    ],
    fresh: { skill: "add", digits: 4, carry: "yes", layout: "row" },
    src: "p.25 অনুশীলন ৪ (১)–(৬) পাশাপাশি যোগ করি",
  });

  // ── p.26: three or four numbers with carries (a carry of 2) ──
  wio({
    page: 26, slug: "add-many-carry", title: "তিন-চারটি সংখ্যা হাতে রেখে যোগ করি",
    items: [
      it(add3([4837, 2572, 1896], "column"), 9305),
      it(add3([3412, 2131, 4243]), 9786), it(add3([1521, 4839, 2817]), 9177), it(add3([3418, 1673, 3628]), 8719),
      it(add3([718, 421, 594]), 1733), it(add3([168, 1695, 2453]), 4316), it(add3([1485, 327, 45]), 1857),
      it(add3([3041, 403, 4255, 1300], "column"), 8999), it(add3([2503, 615, 8101, 1120], "column"), 12339),
      it(add3([2150, 3518, 1310, 1413]), 8391), it(add3([2461, 389, 3908, 88]), 6846),
    ],
    fresh: { skill: "add3", digits: 4, carry: "yes", layout: "column" },
    src: "p.26 অনুশীলন ৫ 4837 + 2572 + 1896 (printed 9305, carries 2 2 1), অনুশীলন ৬ (১)–(৬) in a row, অনুশীলন ৭ (১)–(২) in columns, (৩)–(৪) in a row",
  });

  // ── p.27: 5-digit numbers ──
  wio({
    page: 27, slug: "add-5digit", title: "পাঁচ অঙ্কের সংখ্যা যোগ করি",
    items: [
      it(add(43121, 14457), 57578), it(add(32675, 1398), 34073), it(add(39650, 16398), 56048), it(add(28438, 17653), 46091),
      it(add(43756, 37275), 81031), it(add(23836, 45618), 69454), it(add(57122, 22679), 79801), it(add(99999, 1), 100000),
    ],
    fresh: { skill: "add", digits: 5, carry: "yes", layout: "row" },
    src: "p.27 অনুশীলন ১ (১)–(৮)",
  });
  wio({
    page: 27, slug: "add-5digit-many", title: "পাঁচ অঙ্কের তিন-চারটি সংখ্যা যোগ করি",
    items: [
      it(add3([14275, 23532, 37126]), 74933), it(add3([40305, 5246, 30837]), 76388),
      it(add3([12547, 20834, 31276, 18420]), 83077), it(add3([31983, 643, 4210, 24581]), 61417),
    ],
    fresh: { skill: "add3", digits: 5, layout: "row" },
    src: "p.27 অনুশীলন ২ (১)–(৪)",
  });

  // ── p.26–28: stories ──
  wio({
    page: 27, slug: "stories-1", title: "যোগের গল্প (১)",
    items: [
      it(word("একটি চিড়িয়াখানায় গতকাল 2754 জন দর্শনার্থী এসেছিল। আজকে 3656 জন দর্শনার্থী এসেছে। দুই দিনে চিড়িয়াখানায় মোট কতজন দর্শনার্থী এসেছে?", "2754 + 3656", "জন"), 6410),
      it(word("একটি পাইকারি দোকানে 4416 বস্তা চাল, 3241 বস্তা গম এবং 1537 বস্তা চিনি আছে। ঐ দোকানে কতগুলো বস্তা আছে?", "4416 + 3241 + 1537", "বস্তা"), 9194),
      it(word("একটি বনে 52889টি শাল গাছ ও 46943টি মেহগনি গাছ আছে। ঐ বনে সর্বমোট কতটি গাছ আছে?", "52889 + 46943", "টি"), 99832),
      it(word("একটি দোকানে জানুয়ারি মাসে 34295 টাকার চকলেট, 13720 টাকার বিস্কুট এবং 14853 টাকার চানাচুর বিক্রি হয়। ঐ দোকানে সর্বমোট কত টাকার জিনিস বিক্রি হয়?", "34295 + 13720 + 14853", "টাকা"), 62868),
      it(word("একটি চকলেটের দোকানের বিক্রয় তালিকা: জানুয়ারি 12376 টাকা, ফেব্রুয়ারি 15753 টাকা, মার্চ 21654 টাকা, এপ্রিল 28765 টাকা। জানুয়ারি থেকে এপ্রিল মাস পর্যন্ত সর্বমোট কত টাকার চকলেট বিক্রি হয়েছে?", "12376 + 15753 + 21654 + 28765", "টাকা"), 78548),
      it(word("ফাতেমার 3845 টাকা ছিল। তার বাবা তাকে ঈদে 1500 টাকা এবং মা 700 টাকা দিলেন। এখন তার মোট কত টাকা হলো?", "3845 + 1500 + 700", "টাকা"), 6045),
    ],
    src: "p.26 অনুশীলন ৮, ৯; p.27 মূল প্রশ্ন (printed 99832), অনুশীলন ৩, ৪ (its side table written into the story); p.28 অনুশীলন ৫ (১) (printed 6045)",
  });

  // ── p.29: নিজে করি ১ (multiple choice) and ২ (match) ──
  mcq({
    page: 29, slug: "mcq", title: "যোগ: সঠিক উত্তরটিতে টিক দিই",
    questions: [
      q({ prompt: "2000 + 30000 + 4000 = কত?", options: ["3600", "9000", "36000", "90000"], book: "গ", num: 36000, why: "2000 + 30000 + 4000 = 36000" }),
      q({ prompt: "20300 + 50090 + 907 = 712□7, খালিঘরের সঠিক অঙ্ক নিচের কোনটি হবে?", options: ["0", "3", "7", "9"], book: "ঘ", num: 9, why: "20300 + 50090 + 907 = 71297, তাই খালিঘরে 9 বসবে।" }),
      q({ prompt: "নিচের কোন সংখ্যাগুলোর যোগফল 90000 হবে?", options: ["45000 + 35000 + 5000", "10000 + 60000 + 2000", "75000 + 10000 + 5000", "55000 + 15000 + 2000"], book: "গ", why: "75000 + 10000 + 5000 = 90000; অন্যগুলোর যোগফল 85000, 72000 ও 72000।" }),
      q({ prompt: "379 + 9□5 = 1344, যোগটির খালিঘরে নিচের কোন অঙ্কটি বসবে?", options: ["8", "7", "6", "5"], book: "গ", num: 6, why: "1344 − 379 = 965, তাই খালিঘরে 6 বসবে।" }),
      q({ prompt: "রুহি বইমেলা থেকে 1050 টাকা দিয়ে গল্পের বই, 1200 টাকা দিয়ে দুটি অভিধান এবং 900 টাকা দিয়ে একটি ব্যাগ কিনল। সে কত টাকা খরচ করল?", options: ["2150", "3150", "11250", "21150"], book: "খ", num: 3150, why: "1050 + 1200 + 900 = 3150 টাকা" }),
      q({ prompt: "সুমির কাছে 668 টাকা আছে। তাঁর বাবা তাকে আরও 715 টাকা দিলে তার মোট কত টাকা হবে?", options: ["1373 টাকা", "1383 টাকা", "3813 টাকা", "13713 টাকা"], book: "খ", num: 1383, why: "668 + 715 = 1383 টাকা" }),
    ],
    src: "p.29 নিজে করি ১ (১)–(৬), the book's options in its order ((৪) is printed in columns: written in a row here)",
  });
  match({
    page: 29, slug: "match-sums", title: "দাগ টেনে মিল করি", type: "equation_match",
    pairs: [eq("5009+3021"), eq("4001+60+400"), eq("25094+746"), eq("99+111+1000"), eq("2222+333+7777")],
    src: "p.29 নিজে করি ২ (ক)–(ঙ)",
  });

  // ── p.30: নিজে করি ৩–১২ ──
  wio({
    page: 30, slug: "add-row", title: "নিজে করি: যোগ করি",
    items: [
      it(add(1504, 6282), 7786), it(add(7627, 1438), 9065), it(add(2539, 672), 3211), it(add(99, 4322), 4421), it(add(8537, 4265), 12802),
      it(add(43121, 14457), 57578), it(add(16384, 10623), 27007), it(add(63994, 51), 64045), it(add(111, 99889), 100000),
    ],
    fresh: { skill: "add", digits: 5, layout: "row" },
    src: "p.30 নিজে করি ৩ (১)–(৯)",
  });
  wio({
    page: 30, slug: "add-many-row", title: "নিজে করি: তিন-চারটি সংখ্যা যোগ করি",
    items: [
      it(add3([2531, 4012, 1254]), 7797), it(add3([7621, 547, 1014]), 9182), it(add3([5200, 1920, 2780]), 9900), it(add3([6171, 3530, 2048]), 11749),
      it(add3([62310, 15607, 23491]), 101408), it(add3([44217, 5382, 891]), 50490), it(add3([3007, 172, 2712, 1071]), 6962), it(add3([2900, 1600, 300, 2400]), 7200),
      it(add3([355, 180, 489]), 1024),
    ],
    fresh: { skill: "add3", digits: 4, layout: "row" },
    src: "p.30 নিজে করি ৪ (১)–(৮), নিজে করি ১৩ (the sum 355 + 180 + 489; its story is free)",
  });
  wio({
    page: 30, slug: "stories-2", title: "যোগের গল্প (২)",
    items: [
      it(word("লুসাই চাকমা তার দোকান থেকে প্রথম সপ্তাহে 1680 টাকা, দ্বিতীয় সপ্তাহে 890 টাকা এবং তৃতীয় সপ্তাহে 1000 টাকা লাভ করেন। এই তিন সপ্তাহে তার মোট লাভের পরিমাণ কত?", "1680 + 890 + 1000", "টাকা"), 3570),
      it(word("লিমা 261 পৃষ্ঠা, 275 পৃষ্ঠা ও 350 পৃষ্ঠার তিনটি গল্পের বই এক মাসে পড়েছে। সে ঐ মাসে কত পৃষ্ঠা গল্পের বই পড়েছে?", "261 + 275 + 350", "পৃষ্ঠা"), 886),
      it(word("রাজন বার্ষিক ক্রীড়া প্রতিযোগিতায় 800 মিটার, 1000 মিটার ও 400 মিটার দৌড়ায়। সে মোট কত মিটার দৌড়ায়?", "800 + 1000 + 400", "মিটার"), 2200),
      it(word("রিনাদের ফল বাগানের 3টি আমগাছ থেকে যথাক্রমে 645টি, 729টি ও 890টি আম পাড়া হয়েছিল। ঐ বাগান থেকে কতগুলো আম পাড়া হয়েছিল?", "645 + 729 + 890", "টি"), 2264),
      it(word("একটি নার্সারিতে 725টি গোলাপ, 840টি জবা ও 945টি গাঁদা ফুলের চারা আছে। ঐ নার্সারিতে কতগুলো চারাগাছ আছে?", "725 + 840 + 945", "টি"), 2510),
      it(word("একটি গ্রামে 4536 জন নারী ও 4879 জন পুরুষ বাস করেন। ঐ গ্রামে মোট কতজন লোক বাস করেন?", "4536 + 4879", "জন"), 9415),
      it(word("লিজন বইমেলায় প্রথম দিনে 1250 টাকা, দ্বিতীয় দিনে 1460 টাকা, তৃতীয় দিনে 1575 টাকা ও চতুর্থ দিনে 2000 টাকার বই বিক্রি করে। চার দিনে মোট কত টাকার বই বিক্রি করে?", "1250 + 1460 + 1575 + 2000", "টাকা"), 6285),
      it(word("একটি গুদামে 8375 বস্তা চিনি, 11860 বস্তা গম ও 12720 বস্তা চাল আছে। ঐ গুদামে মোট কত বস্তা জিনিস আছে?", "8375 + 11860 + 12720", "বস্তা"), 32955),
    ],
    src: "p.30 নিজে করি ৫–১২ (the full questions read from the page image; the survey shortens ৮–১২)",
  });

  note("p.27 অনুশীলন ৪: the side table (জানুয়ারি 12376 … এপ্রিল 28765 টাকা) can't be shown beside a story, so its four amounts are written into the story (\"একটি চকলেটের দোকানের বিক্রয় তালিকা: …\") instead of \"পাশের ছকটি …\".");
  note("Stories with 3–4 amounts (p.26 অনুশীলন ৯, p.27 অনুশীলন ৩–৪, p.28 অনুশীলন ৫ (১), p.30 নিজে করি ৫–৯, ১১–১২) are one sum of all the amounts; the Work It Out player plays them in steps (ধাপ ১, ধাপ ২, …), adding from the left.");
  note("Demos with a printed answer are used as the first item of their page's game: p.21 453 + 325, p.22 231 + 425 + 342 and 2133 + 2113 + 5343, p.24 289 + 240 + 265, p.25 3876 + 5508, p.26 অনুশীলন ৫; p.27's মূল প্রশ্ন and p.28 অনুশীলন ৫ (১) (Fatema) are stories in যোগের গল্প (১).");
  note("Repeated sums kept where the book repeats them: p.26 অনুশীলন ৬ (১) = p.23 অনুশীলন ২ (৪); p.26 অনুশীলন ৭ (১) = p.23 অনুশীলন ৩ (৭); p.30 নিজে করি ৩ (৬) = p.27 অনুশীলন ১ (১).");
  note("p.29 নিজে করি ১ (৪) and (২) are missing-digit questions kept as multiple choice, as printed; the four p.24 অনুশীলন ২ items are the missing-digit game.");
  cant("p.23 কাজ ২: number cards cut from paper, a 4-digit number added to a friend's (a classroom game).");
  cant("p.28 অনুশীলন ৫ (২)–(৪): the child chooses the numbers and makes a story (only row (১), printed, is played).");
  cant("p.28 অনুশীলন ৬ (চ্যালেঞ্জ): choose 5-digit numbers whose sum is 100000 (any answer; the printed 39980 + 60020 is only the example).");
  cant("p.28 অনুশীলন ৭: a card lottery game in pairs.");
  cant("p.30 নিজে করি ১৩: make a story for 355 + 180 + 489 (the sum itself is played).");
};
