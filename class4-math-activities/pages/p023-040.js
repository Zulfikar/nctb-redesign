// Pages ২৩–৪০ (অধ্যায় ২ · যোগ ও বিয়োগ), written by a helper (24 Nov 2026). The book: ../class4-math-redesign/content/
// p023-031.js and p032-040.js (every word and number as printed).
// যোগ (pp 23–29): three to five numbers in columns with carries (8504 + 9725 + 9233 + 7549), a city's people, two motorcycles,
// five 6-digit numbers added in a line place by place (pp 26–27), missing digits (pp 26, 28), six-digit numbers that add up to
// 1000098 (pp 28–29). বিয়োগ (pp 30–34): borrowing, across one zero (p 31) and across five (100000 − 187, pp 32–33), in a line
// (p 34), the largest and smallest numbers from digit cards. যোগ ও বিয়োগের সম্পর্ক (pp 35–37): the relation, boxes, two-step
// stories. দেখি পারি কি না (p 38), নিজে করি (pp 39–40).
"use strict";
module.exports = (L) => {
  const { it, wio, q, mcq, note, cant } = L;
  const add = (a, b, layout = "row") => ({ kind: "sum", a, op: "+", b, layout });
  const addN = (terms, layout = "row") => ({ kind: "sum", terms, op: "+", layout });
  const sub = (a, b, layout = "row") => ({ kind: "sum", a, op: "−", b, layout });
  const word = (text, sum, unit) => (unit ? { kind: "word", text, sum, unit } : { kind: "word", text, sum });
  const box = (text, story) => (story ? { kind: "missing", text, story } : { kind: "missing", text });
  const md = (terms, total, layout = "column") => ({ kind: "mdigit", terms, op: "+", total, layout });

  // the chapter's stories, in the book's words (ASCII digits; the build makes them Bangla)
  const LICHU = "একটি লিচুবাগানে চারটি গাছ থেকে যথাক্রমে 8504টি, 9725টি, 9233টি এবং 7549টি লিচু পাড়া হলো। বাগানের ঐ চারটি গাছ থেকে মোট কতগুলো লিচু পাড়া হলো?";
  const TOWN = "একটি শহরে 48936 জন নারী, 49877 জন পুরুষ ও 8372 জন শিশু বাস করেন। ঐ শহরে সর্বমোট জনসংখ্যা কত?";
  // p.25 কাজ ১ prints only the question; the two prices stand under the pictures (written into the story here)
  const BIKES = "একটি মোটর সাইকেলের দাম 165725 টাকা এবং আরেকটির দাম 144999 টাকা। দুইটি মোটর সাইকেলের মোট দাম কত টাকা?";
  const SELLER = "একজন লিচু বিক্রেতার কাছে 7652টি লিচু আছে। সেখান থেকে তিনি 2679টি লিচু বিক্রি করলেন। এখন তার কাছে আর কতটি লিচু রয়েছে?";
  const FOOTBALL = "একটি ফুটবল টুর্নামেন্টের প্রথম দিনের খেলায় 76984 জন এবং দ্বিতীয় দিনের খেলায় 90568 জন দর্শক ছিল। দুই দিনের দর্শক সংখ্যার পার্থক্য কত?";
  const SAPLINGS = "রাস্তার দুইধারে 100000 গাছের চারা লাগানো হলো। এর মধ্যে 187টি চারাগাছ মরে গেলে কতগুলো চারা বেঁচে রইল?";
  const AREA = "একটি এলাকার নারী ও পুরুষের মোট সংখ্যা 458525 জন। নারীর সংখ্যা 206388 জন হলে, পুরুষের সংখ্যা কত?";

  // ── p.23: three or four numbers, carrying (the opener's লিচু sum, its carries 2 1 2) ──
  wio({
    page: 23, slug: "add-column", title: "উপর-নিচে তিন-চারটি সংখ্যা হাতে রেখে যোগ করি",
    items: [
      it(addN([8504, 9725, 9233, 7549], "column"), 35011),
      it(addN([467, 830, 351], "column"), 1648),
      it(add(4792, 3280, "column"), 8072),
      it(addN([6392, 777, 2853], "column"), 10022),
      it(addN([3504, 725, 9233, 5549], "column"), 19011),
      it(addN([333, 4552, 111, 1003], "column"), 5999),
      it(addN([5139, 37302, 24651, 989], "column"), 68081),
    ],
    fresh: { skill: "add3", count: 5, digits: 4, carry: "yes", layout: "column" },
    src: "p.23 মূল প্রশ্ন 8504 + 9725 + 9233 + 7549 in columns (printed 35011, its স্থান table 21, 11, 20, 35), অনুশীলন ১ (১)–(৬) (columns)",
  });
  wio({
    page: 23, slug: "add-row", title: "পাশাপাশি যোগ করি",
    items: [
      it(add(512, 222), 734),
      it(addN([3782, 4520, 1111]), 9413),
      it(add(4444, 3333), 7777),
      it(addN([98, 649, 4872]), 5619),
      it(add(57232, 43201), 100433),
      it(addN([24371, 5793, 67813]), 97977),
    ],
    fresh: { skill: "add3", count: 5, digits: 4, carry: "yes", layout: "row" },
    src: "p.23 অনুশীলন ১ (৭)–(১২) (in a row)",
  });

  // ── p.24: five-digit numbers (the city's people, carries 2 2 1 1) ──
  wio({
    page: 24, slug: "add-5digit", title: "পাঁচ অঙ্কের সংখ্যা উপর-নিচে যোগ করি",
    items: [
      it(addN([48936, 49877, 8372], "column"), 107185),
      it(add(3358, 4571, "column"), 7929),
      it(add(47249, 35786, "column"), 83035),
      it(add(57344, 26847, "column"), 84191),
      it(add(37990, 45278, "column"), 83268),
      it(add(18934, 62623, "column"), 81557),
      it(add(34754, 43475, "column"), 78229),
      it(addN([23661, 5889, 32746], "column"), 62296),
      it(addN([43854, 25805, 26373], "column"), 96032),
      it(add(99999, 1, "column"), 100000),
    ],
    fresh: { skill: "add", count: 5, digits: 5, carry: "yes", layout: "column" },
    src: "p.24 মূল প্রশ্ন 48936 + 49877 + 8372 in columns (printed 107185), অনুশীলন ১ (১)–(৯) (columns)",
  });

  // ── p.25: six-digit numbers; the three addition stories of pp 23–25 ──
  wio({
    page: 25, slug: "add-lakh", title: "লক্ষের ঘর পর্যন্ত যোগ করি ও যোগের গল্প সমাধান করি",
    items: [
      it(word(BIKES, "165725 + 144999", "টাকা"), 310724),
      it(add(165725, 144999, "column"), 310724),
      it(add(342318, 257640, "column"), 599958),
      it(addN([479378, 231063, 145692], "column"), 856133),
      it(addN([579320, 98353, 258924, 167329], "column"), 1103926),
      it(word(LICHU, "8504 + 9725 + 9233 + 7549", "টি"), 35011),
      it(word(TOWN, "48936 + 49877 + 8372", "জন"), 107185),
    ],
    fresh: { skill: "add", count: 5, digits: 6, carry: "yes", layout: "column" },
    src: "p.25 কাজ ১ (the motorcycles: printed 310724; the prices under the pictures written into the story) and its column, অনুশীলন ২ (১)–(৩); the stories of p.23 মূল প্রশ্ন (printed 35011) and p.24 মূল প্রশ্ন (printed 107185)",
  });

  // ── pp.26–27 কাজ ২: five 6-digit numbers added in a line, place by place (the ‘/’ ticks); the carry joins the next place ──
  wio({
    page: 26, slug: "five-in-a-line", title: "পাশাপাশি পাঁচটি সংখ্যা স্থান ধরে ধরে যোগ করি",
    items: [
      it(box("1 + 4 + 1 + 0 + 3 = □", "(1) এককের স্থান"), 9),
      it(box("8 + 3 + 1 + 1 + 5 = □", "(2) দশকের স্থান"), 18),
      it(box("6 + 2 + 0 + 8 + 4 + 1 = □", "(3) শতকের স্থান"), 21),
      it(box("3 + 9 + 2 + 2 + 2 + 2 = □", "(4) হাজারের স্থান"), 20),
      it(box("4 + 8 + 5 + 3 + 1 + 2 = □", "(5) অযুতের স্থান"), 23),
      it(box("2 + 1 + 4 + 3 + 2 + 2 = □", "(6) লক্ষের স্থান"), 14),
      it(addN([243681, 189234, 452011, 332810, 212453]), 1430189),
    ],
    fresh: { skill: "add3", count: 5, digits: 6, layout: "row" },
    src: "p.26 কাজ ২ 243681 + 189234 + 452011 + 332810 + 212453 (the girl's 1 + 4 + 1 + 0 + 3 = 9, then দশক and শতক with the carries 1 and 2), p.27 কাজ ২ (৪)–(৬) (হাজার, অযুত, লক্ষ), the whole sum (1430189)",
  });
  note("p.27 কাজ ২ (৪)–(৬): the book's pictures repeat step (৩)'s three ticks and its answer ১৮৯ under হাজার, অযুত and লক্ষ; the game works each place: হাজার 3 + 9 + 2 + 2 + 2 + 2 (হাতের) = 20, অযুত 4 + 8 + 5 + 3 + 1 + 2 = 23, লক্ষ 2 + 1 + 4 + 3 + 2 + 2 = 14, so the sum is 1430189.");
  note("p.25 কাজ ১ prints only ‘দুইটি মোটর সাইকেলের মোট দাম কত টাকা?’, the prices (১৬৫৭২৫ টাকা, ১৪৪৯৯৯ টাকা) under the two pictures; the story round writes the prices into a first sentence of ours.");

  // ── p.27: অনুশীলন ৪ (in a line) and ৫ (in columns), up to five numbers ──
  wio({
    page: 27, slug: "add-column", title: "উপর-নিচে অনেকগুলো সংখ্যা যোগ করি",
    items: [
      it(addN([2513, 1242, 5234], "column"), 8989),
      it(addN([3281, 675, 4826, 2621], "column"), 11403),
      it(addN([32724, 9063, 12626, 21151], "column"), 75564),
      it(addN([291045, 173422, 5826, 24770, 390246], "column"), 885309),
      it(addN([32731, 4328, 64390, 5439, 7395], "column"), 114283),
      it(addN([16353, 27154, 26439, 18235, 19834], "column"), 108015),
      it(addN([541297, 107629, 238712, 218793, 295621], "column"), 1402052),
      it(addN([329760, 217034, 56381, 1654, 182304], "column"), 787133),
    ],
    fresh: { skill: "add3", count: 5, digits: 5, carry: "yes", layout: "column" },
    src: "p.27 অনুশীলন ৫ (১)–(৮) উপর-নিচে যোগ করি",
  });
  wio({
    page: 27, slug: "add-row", title: "পাশাপাশি অনেকগুলো সংখ্যা যোগ করি",
    items: [
      it(addN([2510, 3618, 2320, 1954]), 10402),
      it(addN([2416, 1042, 1420, 4329, 2156]), 11363),
      it(addN([40321, 14025, 28734, 29381]), 112461),
      it(addN([36180, 2371, 30278, 1203, 28716]), 98748),
      it(addN([321819, 230913, 144782, 218903, 110123]), 1026540),
    ],
    fresh: { skill: "add3", count: 5, digits: 5, layout: "row" },
    src: "p.27 অনুশীলন ৪ (১)–(৫) পাশাপাশি যোগ করি",
  });

  // ── p.28 (and p.26): the missing digits ──
  wio({
    page: 28, slug: "missing-digits", title: "খালি ঘরে সঠিক অঙ্ক বসিয়ে যোগ মেলাই",
    items: [
      it(md(["5369□", "279□5", "10□49"], "□2276"), [2, 3, 6, 9]),
      it(md(["4107□3", "13□826", "25738□", "□42□49"], "947752"), [9, 6, 4, 1, 7]),
      it(md(["□22228", "1□87□0", "37935□", "14□943"], "886275"), [2, 3, 5, 4, 5]),
      it(md(["3460", "351□", "1□14", "11□1"], "□393", "row"), [8, 3, 0, 9]),
      it(md(["1□3", "400□", "2543", "□333"], "9□99", "row"), [2, 0, 3, 9]),
      it(md(["□482", "7254", "5748□"], "□02□1"), [5, 5, 7, 2]),
    ],
    fresh: { skill: "mdigit", count: 5, digits: 4, layout: "column" },
    src: "p.26 অনুশীলন ৩ (১)–(৩) (columns; (২) and (৩) with the total's box filled: 947752, 886275), p.28 অনুশীলন ৬ (১), (২) (in a row; the two numbers without a box added into one: 2150 + 1310 = 3460, 321 + 2222 = 2543) and (৪) (columns; the total □0□□1 shown as □02□1)",
  });
  note("p.26 অনুশীলন ৩ (২), (৩) have six boxes each; the game's missing-digit sum takes at most five, so the total's box is filled (9□7752 → 947752, 886□75 → 886275). The digits to find are the book's: (২) 9, 6, 4, 1, 7 (and 4 in the total), (৩) 2, 3, 5, 4, 5 (and 2).");
  note("p.28 অনুশীলন ৬ (১), (২) add five numbers; the game's missing-digit sum takes two to four, so the two numbers without a box are added into one ((১) 2150 + 1310 = 3460; (২) 321 + 2222 = 2543); the boxes are the book's ((১) 8, 3, 0, 9: 2150 + 3518 + 1310 + 1314 + 1101 = 9393; (২) 2, 0, 3, 9: 123 + 321 + 4000 + 2222 + 3333 = 9999).");
  note("p.28 অনুশীলন ৬ (৪): the total □০□□১ has two boxes side by side, which the game can't draw (two boxes in a row read as one); the game shows its tens digit: □০২□১ (5482 + 7254 + 57485 = 70221).");
  cant("p.28 অনুশীলন ৬ (৩) (□4163 + 1□425 + 14□03 + 23□0 + 16025 = 6715□), (৫) (543 + 432□7 + □53892 + 17853□ + 327□04 = □503518) and (৬) (2156□ + 1□602 + 256□8 + 21□13 + □2243 = □00000): five numbers with boxes (and six boxes in (৬)); the missing-digit sum takes two to four numbers and five boxes. Their answers: (৩) 2, 0, 2, 4, 6; (৫) 4, 9, 2, 3, 1; (৬) 4, 8, 7, 9, 1, 1.");

  // ── p.29 (from p.28 কাজ ৩): numbers that add up to 1000098 ──
  wio({
    page: 29, slug: "same-total", title: "নির্দিষ্ট যোগফল মেলাতে বাকি সংখ্যাটি খুঁজি",
    items: [
      it(box("674734 + □ = 1000098"), 325364),
      it(box("342436 + 325126 + □ = 1000098"), 332536),
      it(box("151964 + 223525 + 244886 + 135946 + □ = 1000098"), 243777),
      it(box("500049 + □ = 1000098"), 500049),
      it(box("123456 + □ = 1000098"), 876642),
      it(box("333333 + 333333 + □ = 1000098"), 333432),
    ],
    fresh: { skill: "missing", count: 5, digits: 6 },
    src: "p.28–29 কাজ ৩ ‘ইচ্ছামতো ছয় অঙ্কের কিছু সংখ্যা নিয়ে যোগ করি যাদের যোগফল হবে ১০০০০৯৮’: the book's three examples (674734 + 325364; 342436 + 325126 + 332536; 151964 + 223525 + 244886 + 135946 + 243777), the last number to find; three of ours (500049, 123456, 333333 + 333333) in their place for the child's own choice",
  });
  cant("p.28–29 কাজ ৩: the child chooses six-digit numbers of their own that add up to 1000098 (the empty grids); played as ‘find the last number’ for the book's three examples and three starts of ours.");

  // ── p.30: borrowing (the লিচু seller, 7652 − 2679) ──
  wio({
    page: 30, slug: "sub-column", title: "হাতে রেখে উপর-নিচে বিয়োগ করি",
    items: [
      it(sub(7652, 2679, "column"), 4973),
      it(sub(580, 325, "column"), 255),
      it(sub(1223, 899, "column"), 324),
      it(sub(7836, 4561, "column"), 3275),
      it(sub(40291, 1777, "column"), 38514),
      it(sub(5230, 3278, "column"), 1952),
      it(sub(28304, 16529, "column"), 11775),
    ],
    fresh: { skill: "sub", count: 5, digits: 4, carry: "yes", layout: "column" },
    src: "p.30 মূল প্রশ্ন 7652 − 2679 step by step (printed 4973), অনুশীলন ১ (১)–(৬) (columns)",
  });

  // ── p.31: borrowing across a zero (the football match, 90568 − 76984) ──
  wio({
    page: 31, slug: "sub-across-zero", title: "শূন্য পেরিয়ে বিয়োগ করি ও বিয়োগের গল্প সমাধান করি",
    items: [
      it(word(FOOTBALL, "90568 − 76984", "জন"), 13584),
      it(sub(90568, 76984, "column"), 13584),
      it(word(SELLER, "7652 − 2679", "টি"), 4973),
      it(sub(60352, 27816, "column"), 32536),
      it(sub(80415, 36728, "column"), 43687),
    ],
    fresh: { skill: "sub", count: 5, digits: 5, carry: "yes", layout: "column" },
    src: "p.31 মূল প্রশ্ন (the football match: printed 13584) and its column, p.30 মূল প্রশ্ন (the লিচু seller, printed 4973); two of ours like p.31's (a 0 in the হাজারের ঘর to borrow across: 60352 − 27816, 80415 − 36728)",
  });
  note("p.31 (TEACHER-CHECK): step ২ (দশকের স্থান) strikes the ৯ of ৭৬৯৮৪ (the number taken away) instead of the ৫ of ৯০৫৬৮; the game borrows from ৯০৫৬৮'s শতক (৫ → ৪), as the step's own words say, and its answer is the book's ১৩৫৮৪.");

  // ── p.32: across five zeros (100000 saplings, 187 die) ──
  wio({
    page: 32, slug: "sub-zeros", title: "অনেকগুলো শূন্য থেকে বিয়োগ করি",
    items: [
      it(word(SAPLINGS, "100000 − 187", "টি"), 99813),
      it(sub(100000, 187, "column"), 99813),
      it(sub(10000, 99, "column"), 9901),
      it(sub(100000, 111, "column"), 99889),
      it(sub(100000, 1, "column"), 99999),
      it(sub(10000, 789, "column"), 9211),
      it(sub(100000, 89, "column"), 99911),
    ],
    fresh: { skill: "sub", count: 5, digits: 5, carry: "yes", layout: "column" },
    src: "p.32 কাজ ১ (the saplings) and p.33 its five steps (printed 99813), p.33 অনুশীলন ১ (১)–(৩), p.34 অনুশীলন ১ (৯) and (১১) (the ones across zeros)",
  });

  // ── p.33–34: অনুশীলন ১ উপর-নিচে বিয়োগ (the rest) ──
  wio({
    page: 33, slug: "sub-column", title: "উপর-নিচে বিয়োগ করি",
    items: [
      it(sub(5397, 928, "column"), 4469),
      it(sub(7237, 4355, "column"), 2882),
      it(sub(17894, 8493, "column"), 9401),
      it(sub(28169, 3784, "column"), 24385),
      it(sub(52197, 27681, "column"), 24516),
      it(sub(972361, 98024, "column"), 874337),
      it(sub(823651, 532876, "column"), 290775),
    ],
    fresh: { skill: "sub", count: 5, digits: 6, carry: "yes", layout: "column" },
    src: "p.33 অনুশীলন ১ (৪)–(৬), p.34 অনুশীলন ১ (৭), (৮), (১০), (১২) (উপর-নিচে)",
  });

  // ── p.34: in a line; the largest and smallest numbers from five digit cards ──
  wio({
    page: 34, slug: "sub-row", title: "পাশাপাশি বিয়োগ করি ও পার্থক্য নির্ণয় করি",
    items: [
      it(sub(74329, 46836), 27493),
      it(sub(7692, 3249), 4443),
      it(sub(67493, 23654), 43839),
      it(sub(92370, 23155), 69215),
      it(sub(542719, 95288), 447431),
      it(sub(638210, 321789), 316421),
      it(sub(100000, 11111), 88889),
      it({ kind: "place", ask: "cards", cards: [5, 2, 9, 0, 7], want: "largest" }, 97520),
      it({ kind: "place", ask: "cards", cards: [5, 2, 9, 0, 7], want: "smallest" }, 20579),
      it(sub(97520, 20579), 76941),
      it(box("753 − 230 = □"), 523),
    ],
    fresh: { skill: "sub", count: 5, digits: 6, layout: "row" },
    src: "p.34 কাজ ১ পাশাপাশি বিয়োগ (the example 74329 − 46836, printed 27493), অনুশীলন ২ (১)–(৬), অনুশীলন ৩ (the cards ৫, ২, ৯, ০, ৭: the largest, the smallest, their difference), অনুশীলন ৪ (the sentence 753 − 230 = □)",
  });
  cant("p.34 অনুশীলন ৪: make a story for ৭৫৩ − ২৩০ = □ (the sentence itself is played).");

  // ── p.35: যোগ ও বিয়োগের সম্পর্ক ──
  wio({
    page: 35, slug: "relation", title: "যোগ ও বিয়োগের সম্পর্ক দিয়ে সমাধান করি",
    items: [
      it(word(AREA, "458525 − 206388", "জন"), 252137),
      it(sub(458525, 206388, "column"), 252137),
      it(box("252137 + 206388 = □", "পুরুষের সংখ্যা + নারীর সংখ্যা = মোট"), 458525),
      it(box("458525 − 252137 = □", "মোট − পুরুষের সংখ্যা = নারীর সংখ্যা"), 206388),
      it(box("□ − 206388 = 252137"), 458525),
      it(box("458525 − □ = 252137"), 206388),
      it(word("একটি বিদ্যালয়ে 260 জন ছাত্রী ও 279 জন ছাত্র রয়েছে। ঐ বিদ্যালয়ে মোট কতজন শিক্ষার্থী রয়েছে?", "260 + 279", "জন"), 539),
      it(word("একটি বিদ্যালয়ে মোট 539 জন শিক্ষার্থী রয়েছে যার মধ্যে ছাত্রী 260 জন। ঐ বিদ্যালয়ে কতজন ছাত্র রয়েছে?", "539 − 260", "জন"), 279),
    ],
    fresh: { skill: "missing", count: 5, digits: 6 },
    src: "p.35 মূল প্রশ্ন (printed 252137) and its column (বিয়োজন, বিয়োজ্য, বিয়োগফল), the three relation sums (পুরুষ + নারী = মোট; মোট − পুরুষ = নারী) and two boxes of ours on the same numbers, অনুশীলন ১ (the two school problems)",
  });

  // ── p.36: boxes; one sum then another (Abir); the metro; stories made from sentences ──
  wio({
    page: 36, slug: "boxes-stories", title: "খালিঘর পূরণ করি ও দুই ধাপের গল্প সমাধান করি",
    items: [
      it(box("5555 − □ = 3333"), 2222),
      it(box("□ + 2222 = 5678"), 3456),
      it(box("3456 + □ = 5678"), 2222),
      it(box("□ − 17253 = 9566"), 26819),
      it(word("আবিরের কাছে 4865 টাকা ছিল। বাজারে যাওয়ার আগে তার মা তাকে আরও 733 টাকা দিলেন। সে 1045 টাকার কেনাকাটা করল। এখন তার কাছে আর কত টাকা রইল?", "4865 + 733 − 1045", "টাকা"), 4553),
      it(add(4865, 733, "column"), 5598),
      it(sub(5598, 1045, "column"), 4553),
      it(word("একটি স্টেশন থেকে মেট্রো ট্রেন 1048 জন যাত্রী নিয়ে যাত্রা শুরু করল। পরবর্তী স্টেশনে 148 জন যাত্রী নেমে গেল এবং 180 জন নতুন যাত্রী উঠল। এখন মেট্রো ট্রেনটিতে মোট কতজন যাত্রী আছে?", "1048 − 148 + 180", "জন"), 1080),
      it(word("একটি বাগানে গাছের সংখ্যা 57321টি। সেখানে আরও 8550টি নতুন চারাগাছ লাগানো হলো এবং তার মধ্যে 1030টি চারাগাছ মরে গেল। এখন গাছের সংখ্যা কত?", "57321 + 8550 − 1030", "টি"), 64841),
      it(word("আব্দুর রহিম সাহেবের 5941 টাকা আছে। তিনি আম বিক্রি করে 687 টাকা ও মাছ বিক্রি করে 1050 টাকা পান এবং পরিবারের জন্য ব্যয় করেন 3075 টাকা। তাঁর কাছে কত টাকা রইল?", "5941 + 687 + 1050 − 3075", "টাকা"), 4603),
    ],
    src: "p.36 অনুশীলন ২ (খালিঘর), কাজ ১ (আবির: the story, then the book's two columns 4865 + 733 and 5598 − 1045), অনুশীলন ৩ (the metro), কাজ ২ (the book's two stories made from 57321 + 8550 − 1030 and 5941 + 687 + 1050 − 3075)",
  });
  cant("p.36 কাজ ২: the child's own story for □ + □ + □ and □ + □ − □ − □ (the book's two example stories are played).");

  // ── p.37: two steps (Salma's change; a mother's and a daughter's ages) ──
  wio({
    page: 37, slug: "two-steps", title: "দুই ধাপে গল্পের সমস্যা সমাধান করি",
    items: [
      it(word("সালমা দোকান থেকে 72 টাকার খাতা, 60 টাকার কলম এবং 185 টাকার জ্যামিতি বক্স কিনল। সে দোকানদারকে 500 টাকা দিলে কত টাকা ফেরত পাবে?", "500 − (72 + 60 + 185)", "টাকা"), 183),
      it(box("72 + 60 + 185 = □", "১ম ধাপ"), 317),
      it(box("500 − 317 = □", "২য় ধাপ"), 183),
      it(word("মা ও মেয়ের বর্তমান বয়সের যোগফল 98 বছর। 8 বছর পূর্বে মেয়ের বয়স ছিল 25 বছর। মেয়ের বর্তমান বয়স কত?", "25 + 8", "বছর"), 33),
      it(word("মা ও মেয়ের বর্তমান বয়সের যোগফল 98 বছর। 8 বছর পূর্বে মেয়ের বয়স ছিল 25 বছর। মায়ের বর্তমান বয়স কত?", "98 − (25 + 8)", "বছর"), 65),
      it(word("মা ও মেয়ের বর্তমান বয়সের যোগফল 98 বছর। 8 বছর পূর্বে মেয়ের বয়স ছিল 25 বছর। 10 বছর পর মায়ের বয়স কত হবে?", "98 − (25 + 8) + 10", "বছর"), 75),
      it(word("রিনা দোকান থেকে 45 টাকার পেনসিল, 120 টাকার রং এবং 95 টাকার খাতা কিনল। সে দোকানদারকে 500 টাকা দিলে কত টাকা ফেরত পাবে?", "500 − (45 + 120 + 95)", "টাকা"), 240),
      it(word("তানভীর 250 টাকা দিয়ে একটি গল্পের বই এবং 85 টাকা দিয়ে একটি স্কেল কিনে দোকানদারকে 1000 টাকা দিল। দোকানদার তাকে কত টাকা ফেরত দেবেন?", "1000 − (250 + 85)", "টাকা"), 665),
      it(word("বাবা ও ছেলের বর্তমান বয়সের যোগফল 54 বছর। 5 বছর পূর্বে ছেলের বয়স ছিল 9 বছর। বাবার বর্তমান বয়স কত?", "54 − (9 + 5)", "বছর"), 40),
      it(word("দাদু ও নাতির বর্তমান বয়সের যোগফল 80 বছর। 3 বছর পূর্বে নাতির বয়স ছিল 7 বছর। 5 বছর পর দাদুর বয়স কত হবে?", "80 − (7 + 3) + 5", "বছর"), 75),
    ],
    src: "p.37 কাজ ৩ (সালমা: the story, then ১ম ধাপ 72 + 60 + 185 and ২য় ধাপ 500 − 317, printed as boxes), অনুশীলন ৪ (১)–(৩) (the shared lines + each question); four two-step stories of ours like the page's (the boy: ‘চলো, আমরা এই রকম আরো কয়েকটি গাণিতিক গল্প তৈরি করে সমাধান করি’)",
  });
  note("p.37: the page has six questions (সালমা's story and its two steps, অনুশীলন ৪ (১)–(৩)); four two-step stories of ours (রিনা, তানভীর, বাবা ও ছেলে, দাদু ও নাতি), made like the page's, bring the game to ten, as the boy invites.");
  cant("p.37: make more stories of your own (the boy's invitation): four of ours are played instead.");

  // ── p.38: দেখি পারি কি না ──
  const PONDS = "রনি সাহেবের পুকুরে 925টি মাছের পোনা ছাড়া হলো। রনি সাহেবের চেয়ে রাকিব সাহেবের পুকুরে 120টি কম এবং রেজা সাহেবের পুকুরে 187টি বেশি মাছের পোনা ছাড়া হলো। তাদের তিনজনের পুকুরে মোট কতগুলো মাছের পোনা ছাড়া হলো?";
  wio({
    page: 38, slug: "review", title: "দেখি পারি কি না: যোগ, বিয়োগ ও গল্পের হিসাব করি",
    items: [
      it(addN([470238, 82031, 2956, 51169], "column"), 606394),
      it(addN([834901, 38299, 60327, 999], "column"), 934526),
      it(sub(852016, 98201, "column"), 753815),
      it(sub(945105, 63274, "column"), 881831),
      it(addN([371904, 57012, 7702, 501456]), 938074),
      it(sub(760034, 5290), 754744),
      it(word("মিনুর কাছে 15570 টাকা আছে। তার বড়ো ভাই তাকে 2200 টাকা দিলো। মিনু তার ছোটো বোনকে 1685 টাকা দিলে এখন তার কাছে কত টাকা রইল?", "15570 + 2200 − 1685", "টাকা"), 16085),
      it(box("925 − 120 = □", PONDS), 805),
      it(box("925 + 187 = □", PONDS), 1112),
      it(box("925 + 805 + 1112 = □", PONDS), 2842),
      it(word("ফাতিমা 175 টাকা দিয়ে একটি পেনসিলের বাক্স এবং 40 টাকা দিয়ে কলম কিনে দোকানদারকে 500 টাকা দিলে দোকানদার তাকে কত টাকা ফেরত দেবেন?", "500 − (175 + 40)", "টাকা"), 285),
    ],
    src: "p.38 দেখি পারি কি না ১ (four in columns, two in a row), ২ (মিনু), ৩ (the three ponds: the book's three boxes রাকিব, রেজা, মোট), ৪ (ফাতিমা)",
  });
  note("p.38 দেখি পারি কি না ৩ (the ponds) needs four steps (925 − 120, 925 + 187, then two additions); a story round takes at most three, so it is played as the book's three boxes (রাকিব 805, রেজা 1112, মোট 2842), each with the story above it.");

  // ── p.39: নিজে করি ──
  mcq({
    page: 39, slug: "mcq", title: "যোগ ও বিয়োগ: সঠিক উত্তরের পাশে টিক দিই",
    questions: [
      q({ prompt: "নিচের কোন সম্পর্কটি সঠিক?", options: ["বিয়োজন + বিয়োজ্য = বিয়োগফল", "বিয়োজন − বিয়োজ্য = বিয়োগফল", "বিয়োজ্য × বিয়োজন = বিয়োগফল", "বিয়োজন ÷ বিয়োজ্য = বিয়োগফল"], book: "খ", why: "বিয়োজন থেকে বিয়োজ্য বিয়োগ করলে বিয়োগফল পাই: 458525 − 206388 = 252137।" }),
      q({ prompt: "নিলা ও মিলার একত্রে 11320 টাকা আছে। নিলার 7019 টাকা হলে মিলার কত টাকা আছে?", options: ["4011 টাকা", "4301 টাকা", "7019 টাকা", "11320 টাকা"], book: "খ", num: 4301, why: "11320 − 7019 = 4301 টাকা" }),
      q({ prompt: "মনি এবং রনিকে তাদের বাবা 12820 টাকা ও 11380 টাকা দিয়ে দুইটি সাইকেল কিনে দিলেন। সাইকেল দুইটি কিনতে মোট কত টাকা খরচ হলো?", options: ["11380 টাকা", "12820 টাকা", "23100 টাকা", "24200 টাকা"], book: "ঘ", num: 24200, why: "12820 + 11380 = 24200 টাকা" }),
      q({ prompt: "9999 − 999 = 9000, এখানে বিয়োজ্য কত?", options: ["9999", "9000", "999", "99"], book: "গ", num: 999, why: "যে সংখ্যাটি বিয়োগ করা হয় সেটি বিয়োজ্য: 999। এখানে 9999 বিয়োজন, 9000 বিয়োগফল।" }),
      q({ prompt: "বিয়োজ্য 799 এবং বিয়োগফল 201 হলে বিয়োজন কত?", options: ["201", "598", "799", "1000"], book: "ঘ", num: 1000, why: "বিয়োজন = বিয়োগফল + বিয়োজ্য = 201 + 799 = 1000" }),
      q({ prompt: "458525 − 206388 = 252137, এখানে বিয়োজন কোনটি?", options: ["458525", "206388", "252137"], answer: "458525", why: "যে সংখ্যা থেকে বিয়োগ করা হয় সেটি বিয়োজন: 458525 (মোট)।" }),
      q({ prompt: "458525 − 206388 = 252137, এখানে বিয়োগফল কোনটি?", options: ["458525", "206388", "252137"], answer: "252137", why: "বিয়োগ করে যে সংখ্যা পাই সেটি বিয়োগফল: 252137 (পুরুষের সংখ্যা)।" }),
      q({ prompt: "বিয়োজ্য ও বিয়োগফল জানা থাকলে বিয়োজন কীভাবে বের করি?", options: ["বিয়োগফল + বিয়োজ্য", "বিয়োগফল − বিয়োজ্য", "বিয়োজ্য − বিয়োগফল", "বিয়োগফল × বিয়োজ্য"], answer: "বিয়োগফল + বিয়োজ্য", why: "বিয়োগফল + বিয়োজ্য = বিয়োজন: 252137 + 206388 = 458525।" }),
      q({ prompt: "সবুজ চাকায় উপর থেকে ঘড়ির কাঁটার দিকে সংখ্যাগুলো: 19, 25, 8, 27, 21, □, 32, 13। প্যাটার্নে নিয়ম খুঁজে খালি ঘরের সংখ্যা বের করি।", options: ["15", "17", "23", "35"], answer: "15", why: "মুখোমুখি দুইটি সংখ্যার যোগফল 40: 19 + 21, 8 + 32, 27 + 13; তাই 25 + 15 = 40।" }),
      q({ prompt: "কমলা চাকায় উপর থেকে ঘড়ির কাঁটার দিকে সংখ্যাগুলো: 12, 9, 16, 27, 21, □, 7, 18। প্যাটার্নে নিয়ম খুঁজে খালি ঘরের সংখ্যা বের করি।", options: ["18", "24", "30", "33"], answer: "18", why: "মুখোমুখি দুইটি সংখ্যার পার্থক্য 9: 21 − 12, 16 − 7, 27 − 18; তাই 9-এর মুখোমুখি 9 + 9 = 18।" }),
    ],
    src: "p.39 নিজে করি ১ (১)–(৫) (the book's options in its order), three of ours on p.35's terms (বিয়োজন, বিয়োগফল, the relation), p.40 নিজে করি ১৪ (the two pattern wheels, read clockwise from the top; the blank is the bottom left)",
  });
  note("p.40 নিজে করি ১৪ (the wheels) is asked in the p.39 quiz: each wheel's eight numbers listed clockwise from the top, the blank being the bottom left. The green wheel: opposite numbers add up to 40 (19 + 21, 8 + 32, 27 + 13), so 25's opposite is 15. The orange wheel has no common sum (12 + 21 = 33, 16 + 7 = 23, 27 + 18 = 45); its opposite numbers differ by 9 (21 − 12, 16 − 7, 27 − 18), so 9's opposite is taken as 18 (0 would also differ by 9; it is not an option). Worth a teacher's look.");
  wio({
    page: 39, slug: "sums", title: "নিজে করি: উপর-নিচে ও পাশাপাশি হিসাব করি",
    items: [
      it(addN([76281, 4629, 21982], "column"), 102892),
      it(addN([82450, 999, 19345], "column"), 102794),
      it(addN([127280, 34746, 219825, 53891], "column"), 435742),
      it(addN([370821, 127836, 211893, 506322, 438720], "column"), 1655592),
      it(sub(64382, 999, "column"), 63383),
      it(sub(37201, 12837, "column"), 24364),
      it(sub(693521, 327810, "column"), 365711),
      it(sub(863427, 2399, "column"), 861028),
      it(addN([23781, 34291, 6788]), 64860),
      it(addN([340326, 210024, 561286, 452398]), 1564034),
      it(sub(20000, 17253), 2747),
      it(sub(872530, 278176), 594354),
    ],
    src: "p.39 নিজে করি ২ (১)–(৮) উপর-নিচে, নিজে করি ৩ (১)–(৪) পাশাপাশি",
  });
  wio({
    page: 39, slug: "boxes", title: "নিজে করি: খালিঘর পূরণ করি",
    items: [
      it(box("65231 + □ = 97238"), 32007),
      it(box("23805 + 13276 + □ = 56318"), 19237),
      it(box("□ − 6483 = 3517"), 10000),
      it(box("982531 − □ = 247389"), 735142),
      it(box("83291 + □ = 128792", "83291 এর সঙ্গে কোন সংখ্যা যোগ করলে যোগফল 128792 হবে?"), 45501),
      it(box("32074 + 20689 + □ = 89340", "তিনটি সংখ্যার যোগফল 89340। তাদের মধ্যে দুইটি সংখ্যা 32074 ও 20689 হলে, তৃতীয় সংখ্যাটি কত?"), 36577),
    ],
    fresh: { skill: "missing", count: 5, digits: 6 },
    src: "p.39 নিজে করি ৪ (১)–(৪); p.40 নিজে করি ৮ and ৯ (their questions shown above the box sentence)",
  });

  // ── p.40: নিজে করি ৫–১৩ (the stories) ──
  const SAIKAT = "শিমুল অপেক্ষা শ্যামলের 490 টাকা বেশি আছে। সৈকত অপেক্ষা শিমুলের 502 টাকা কম আছে। সৈকতের কাছে 980 টাকা আছে।";
  wio({
    page: 40, slug: "stories", title: "নিজে করি: যোগ-বিয়োগের গল্প সমাধান করি",
    items: [
      it(word("একটি গুদামে 14845 বস্তা চাল, 10483 বস্তা গম ও 6958 বস্তা ডাল আছে। ঐ গুদামে মোট কতবস্তা দ্রব্য আছে?", "14845 + 10483 + 6958", "বস্তা"), 32286),
      it(word("এমন একটি সংখ্যা নির্ণয় করি যা 3582 থেকে 475 বড়ো।", "3582 + 475"), 4057),
      it({ kind: "place", ask: "cards", cards: [3, 8, 5, 0, 6, 4], want: "largest" }, 865430),
      it({ kind: "place", ask: "cards", cards: [3, 8, 5, 0, 6, 4], want: "smallest" }, 304568),
      it(word("3, 8, 5, 0, 6, 4 অঙ্কগুলো মাত্র একবার ব্যবহার করে গঠিত বৃহত্তম ও ক্ষুদ্রতম সংখ্যার পার্থক্য নির্ণয় করি।", "865430 − 304568"), 560862),
      it(word(`${SAIKAT} শিমুলের কাছে কত টাকা আছে?`, "980 − 502", "টাকা"), 478),
      it(word(`${SAIKAT} শ্যামলের কাছে কত টাকা আছে?`, "980 − 502 + 490", "টাকা"), 968),
      it(word(`${SAIKAT} তিনজনের একত্রে মোট কত টাকা আছে?`, "980 + 478 + 968", "টাকা"), 2426),
      it(word("জাহিদ সাহেব 285000 টাকা দিয়ে একটি জমি ক্রয় করলেন। তিনি জমি রেজিস্ট্রেশন বাবদ 28500 টাকা এবং গাছ লাগানো বাবদ 9045 টাকা খরচ করলেন। কিছুদিন পরে তিনি জমিটি 410675 টাকায় বিক্রি করেন। তাঁর কত টাকা লাভ হবে?", "410675 − (285000 + 28500 + 9045)", "টাকা"), 88130),
      it(word("10 বছর আগে বাবা ও ছেলের বয়সের যোগফল ছিল 76 বছর। বর্তমানে বাবার বয়স 66 বছর। 7 বছর পরে ছেলের বয়স কত হবে?", "76 + 20 − 66 + 7", "বছর"), 37),
      it({ kind: "expr", text: "2587 − 854 − 399 − 250" }, 1084),
    ],
    src: "p.40 নিজে করি ৫, ৬, ৭ (the cards ৩, ৮, ৫, ০, ৬, ৪: the largest, the smallest, then the difference as printed), ১০ (its two questions as three: শিমুল, শ্যামল, তিনজন), ১১, ১২, ১৩ (the sentence worked step by step); ৮ and ৯ are in p.39's boxes game, ১৪ in p.39's quiz",
  });
  note("p.40 নিজে করি ১০ asks ‘শিমুল ও শ্যামলের কাছে কত টাকা আছে? তিনজনের একত্রে মোট কত টাকা আছে?’; played as three rounds with the same lines: শিমুল 980 − 502 = 478, শ্যামল 478 + 490 = 968, তিনজন 980 + 478 + 968 = 2426 (the last round's working uses the first two answers).");
  note("p.40 নিজে করি ১২: worked in three steps as 76 + 20 = 96 (both are 10 years older now), 96 − 66 = 30 (the son now), 30 + 7 = 37.");
  cant("p.40 নিজে করি ১৩: make a story for ২৫৮৭ − ৮৫৪ − ৩৯৯ − ২৫০ = □ (the sentence is played, step by step).");
};
