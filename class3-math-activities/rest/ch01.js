// অধ্যায় ১ · সংখ্যা (printed pp.1–20): place value to অযুত and লক্ষ, number words both ways, compare and order,
// ordinals (প্রথম–বিংশ), patterns, number lines, and the নিজে করি review (p.19 multiple choice, its (৪) fixed)
module.exports = (L) => {
  const { it, wio, q, mcq, match, wordPair, order, note, cant, ORDINALS } = L;
  const place = (n, ask) => ({ kind: "place", n, ask });
  const parts = (n) => it(place(n, "parts"), String(n).split("").map(Number)); // the server's format: the number's own places, highest first
  const number = (n) => it(place(n, "number"), n);
  const cmp = (a, b, want) => it({ kind: "compare", a: String(a), b: String(b) }, want);
  const pat = (terms, want) => it({ kind: "pattern", terms }, want);
  const line = (from, to, step, target) => it({ kind: "numberline", from, to, step, target, ask: "read" }, target);
  const word = (text, sum, want, unit) => it(unit ? { kind: "word", text, sum, unit } : { kind: "word", text, sum }, want);
  const ord = (k) => ORDINALS[k - 1]; // [word, short form] of the k-th

  // ── p.1–2: গণনা করা, পড়া ও লেখা (4 digits) ──
  wio({
    page: 2, slug: "place-count-1", title: "গণনা করি ও সংখ্যায় লিখি (১)",
    items: [
      number(1121), // p.1 মূল প্রশ্ন: 11টি 100, 2টি 10, 1টি 1 (printed ১১২১)
      parts(2354), // p.2 কাজ ১: the table হাজার/শতক/দশক/একক (printed ২৩৫৪)
      number(8448), // p.2 অনুশীলন ২: 8 of 1000, 4 of 100, 4 of 10, 8 of 1
      number(925), // p.2 অনুশীলন ১: the left box (9টি 100, 2টি 10, 5টি 1) is the one with 925
      parts(1238), parts(9101), // the places of two numbers p.2 prints (অনুশীলন ৩ (১), অনুশীলন ৪ (৪))
    ],
    fresh: { skill: "place", digits: 4 },
    src: "p.1 মূল প্রশ্ন (১১২১ printed), p.2 কাজ ১ (২৩৫৪ printed), অনুশীলন ২ (৮৪৪৮), অনুশীলন ১ (the left box, ৯২৫), the places of ১২৩৮ (অনুশীলন ৩ (১)) and ৯১০১ (অনুশীলন ৪ (৪))",
  });
  match({
    page: 2, slug: "words-1", title: "পড়ি ও কথায় লিখি · মিল করি (১)",
    pairs: [
      ...[1238, 2815, 3111, 4335, 5153, 8448, 925, 13425].map((n) => wordPair(n)),
      wordPair(2354, "দুই হাজার তিন শত চুয়ান্ন"), wordPair(23425, "তেইশ হাজার চার শত পঁচিশ"),
    ],
    src: "p.2 অনুশীলন ৩ (১)–(৫), অনুশীলন ২ (৮৪৪৮), অনুশীলন ১ (৯২৫), কাজ ১ (২৩৫৪, words printed), p.3 (২৩৪২৫, words printed), p.5 অনুশীলন ৩ (১৩৪২৫)",
  });
  match({
    page: 2, slug: "digits-1", title: "অঙ্কে লিখি · মিল করি (১)",
    pairs: [
      wordPair(1135, "এক হাজার এক শত পঁয়ত্রিশ"), wordPair(3979, "তিন হাজার নয় শত উনআশি"),
      wordPair(7869, "সাত হাজার আট শত উনসত্তর"), wordPair(9101, "নয় হাজার এক শত এক"),
      ...[1215, 1125, 9469, 9496, 3896, 3289].map((n) => wordPair(n)),
    ].map(([d, w]) => [w, d]),
    src: "p.2 অনুশীলন ৪ (১)–(৪), the book's words; the four-digit pairs of p.10 মূল প্রশ্ন (১২১৫, ১১২৫) and p.11 অনুশীলন ২ (৩), (৫) (৯৪৬৯, ৯৪৯৬, ৩৮৯৬, ৩২৮৯)",
  });

  // ── p.3–4: অযুত; the balloons ──
  match({
    page: 4, slug: "balloons", title: "দাগ টেনে মিল করি",
    pairs: [
      wordPair(5305, "পাঁচ হাজার তিন শত পাঁচ"), wordPair(22719, "বাইশ হাজার সাত শত উনিশ"), wordPair(63702, "তেষট্টি হাজার সাত শত দুই"),
      wordPair(99305, "নিরানব্বই হাজার তিন শত পাঁচ"), wordPair(51305, "একান্ন হাজার তিন শত পাঁচ"), wordPair(5503, "পাঁচ হাজার পাঁচ শত তিন"),
      ...[34034, 23554, 13457, 68005].map((n) => wordPair(n)),
    ].map(([d, w]) => [w, d]),
    src: "p.4 কাজ ১ (১)–(৬), the book's words and its six balloons (৫৩০৫ / ৫৫০৩ / ৫১৩০৫ / ৯৯৩০৫ on purpose); then p.6 অনুশীলন ৪–৫ (৩৪০৩৪, ২৩৫৫৪) and p.8 অনুশীলন ২ (১৩৪৫৭, ৬৮০০৫)",
  });

  // ── p.5–7: counting cards up to অযুত ──
  wio({
    page: 6, slug: "place-count-2", title: "গণনা করি ও সংখ্যায় লিখি (২)",
    items: [
      number(23425), // p.3 মূল প্রশ্ন: the table অযুত/হাজার/শতক/দশক/একক = 2/3/4/2/5 (printed ২৩৪২৫)
      number(13455), // p.5 অনুশীলন ২, left box
      number(4444), // p.5 অনুশীলন ২, right box
      number(13425), // p.5 অনুশীলন ৩
      number(34034), // p.6 অনুশীলন ৪ (its শতক digit is asked on p.9)
      number(23554), // p.6 অনুশীলন ৫
      number(83473), // p.7 মূল প্রশ্ন (the football tickets; the answer is printed on p.8)
    ],
    fresh: { skill: "place", digits: 5 },
    src: "p.3 মূল প্রশ্ন (২৩৪২৫ printed), p.5 অনুশীলন ২ (both boxes) and ৩, p.6 অনুশীলন ৪ and ৫, p.7 মূল প্রশ্ন (৮৩৪৭৩, printed on p.8)",
  });
  match({
    page: 6, slug: "digits-2", title: "অঙ্কে লিখি · মিল করি (২)",
    pairs: [
      wordPair(9990, "নয় হাজার নয় শত নব্বই"), wordPair(9099, "নয় হাজার নিরানব্বই"), wordPair(10000, "দশ হাজার"),
      wordPair(10010, "দশ হাজার দশ"), wordPair(13532, "তেরো হাজার পাঁচ শত বত্রিশ"), wordPair(26837, "ছাব্বিশ হাজার আট শত সাঁইত্রিশ"),
      ...[49037, 7804, 97842].map((n) => wordPair(n)), wordPair(100000, "এক লক্ষ"),
    ].map(([d, w]) => [w, d]),
    src: "p.6 অনুশীলন ৬ (১)–(৬), the book's words; p.8 কাজ ১ (৪৯০৩৭) and অনুশীলন ২ (৭৮০৪, ৯৭৮৪২); p.9 “এক লক্ষ বা ১০০০০০” (printed)",
  });
  match({
    page: 6, slug: "words-2", title: "পড়ি ও কথায় লিখি · মিল করি (২)",
    pairs: [11238, 17805, 19111, 13359, 15153, 27537, 13455, 4444, 94230, 86935].map((n) => wordPair(n)),
    src: "p.6 অনুশীলন ৭ (১)–(৬), p.5 অনুশীলন ২ (কথায় লিখি: ১৩৪৫৫, ৪৪৪৪), p.8 অনুশীলন ৩ (ক) ৯৪২৩০, (খ) ৮৬৯৩৫",
  });

  // ── p.8: স্থানীয় মান ──
  wio({
    page: 8, slug: "place-parts-1", title: "স্থানীয় মান: খালিঘর পূরণ করি (১)",
    items: [
      parts(83473), // p.8 the digit tree (printed)
      parts(49037), // p.8 কাজ ১ (printed 7, 30, 0, 9000, 40000)
      parts(23517), parts(51347), parts(93007), // p.8 অনুশীলন ১ (ক)–(গ)
      parts(13457), parts(7804), parts(68005), parts(97842), // p.8 অনুশীলন ২
    ],
    fresh: { skill: "place", digits: 5 },
    src: "p.8 the ৮৩৪৭৩ tree and কাজ ১ (৪৯০৩৭, both printed), অনুশীলন ১ (ক)–(গ), অনুশীলন ২ (৪ সারি)",
  });

  // ── p.4–9: অযুত, লক্ষ and the value of a digit ──
  mcq({
    page: 9, slug: "place-value", title: "অযুত, লক্ষ ও স্থানীয় মান",
    questions: [
      q({ prompt: "1000 লেখা 10টি কার্ড আছে। সংখ্যাটি হলো □ হাজার বা □ অযুত।", options: ["10 হাজার বা 1 অযুত", "1 হাজার বা 10 অযুত", "100 হাজার বা 1 অযুত", "10 হাজার বা 10 অযুত"], answer: "10 হাজার বা 1 অযুত", why: "10টি 1000 = 10000 = 10 হাজার। এক অযুত অর্থ হলো 10 হাজার।" }),
      q({ prompt: "34034 সংখ্যাটিতে শতক স্থানীয় অঙ্কটি কী?", options: ["0", "3", "4", "30"], answer: "0", num: 0, why: "34034: 3 অযুত, 4 হাজার, 0 শতক, 3 দশক, 4 একক।" }),
      q({ prompt: "94230 সংখ্যাটিতে 4 এর স্থানীয় মান কত?", options: ["4", "40", "400", "4000"], answer: "4000", num: 4000, why: "4 আছে হাজারের স্থানে, তাই এর স্থানীয় মান 4000।" }),
      q({ prompt: "94230 সংখ্যাটিতে 3 এর স্থানীয় মান কত?", options: ["3", "30", "300", "3000"], answer: "30", num: 30, why: "3 আছে দশকের স্থানে, তাই এর স্থানীয় মান 30।" }),
      q({ prompt: "94230 সংখ্যাটিতে অযুত স্থানের অঙ্কটি কত?", options: ["9", "4", "2", "3"], answer: "9", num: 9, why: "বাম দিক থেকে প্রথম অঙ্কটি অযুতের স্থানে: 9।" }),
      q({ prompt: "86935 সংখ্যাটিতে হাজার স্থানের অঙ্কটি কত?", options: ["8", "6", "9", "3"], answer: "6", num: 6, why: "86935: 8 অযুত, 6 হাজার, 9 শতক, 3 দশক, 5 একক।" }),
      q({ prompt: "93007 সংখ্যাটিতে 9 এর স্থানীয় মান কত?", options: ["9", "900", "9000", "90000"], answer: "90000", num: 90000, why: "9 আছে অযুতের স্থানে, তাই এর স্থানীয় মান 90000।" }),
      q({ prompt: "49037 সংখ্যাটিতে বাম দিকের 4 ও 9 মিলে কত হাজার?", options: ["4 হাজার", "9 হাজার", "49 হাজার", "490 হাজার"], answer: "49 হাজার", num: 49, why: "4 অযুত = 40000 আর 9 হাজার = 9000; একত্রে 49000, অর্থাৎ 49 হাজার।" }),
      q({ prompt: "1 লক্ষ অর্থ হলো কত অযুত?", options: ["1 অযুত", "10 অযুত", "100 অযুত", "1000 অযুত"], answer: "10 অযুত", num: 10, why: "1 লক্ষ অর্থ হলো 10 অযুত এবং একে লেখা হয় 100000।" }),
      q({ prompt: "বাংলাদেশের একটি ইউনিয়নের লোকসংখ্যা 100000 (প্রায়)। সংখ্যাটি আমরা কীভাবে পড়ব?", options: ["এক লক্ষ", "এক হাজার", "দশ হাজার", "এক অযুত"], answer: "এক লক্ষ", why: "100000 = 10 অযুত = 1 লক্ষ: এক লক্ষ।" }),
    ],
    src: "p.4 অনুশীলন ১ (১০টি ১০০০), p.6 অনুশীলন ৪ (শতক স্থানীয় অঙ্ক), p.8 অনুশীলন ৩ (ক) (৪ ও ৩ এর মান, অযুতের অঙ্ক) and (খ), অনুশীলন ১ (গ) (৯৩০০৭), কাজ ১ (“৪৯ হাজার”), p.9 the লক্ষ box and মূল প্রশ্ন",
  });
  match({
    page: 9, slug: "words-3", title: "পড়ি ও কথায় লিখি · মিল করি (৩)",
    pairs: [wordPair(83473, "তিরাশি হাজার চার শত তিয়াত্তর"), ...[23517, 51347, 93007, 80699, 76644, 32740, 32940, 43680, 45400].map((n) => wordPair(n))],
    src: "p.8 the printed ৮৩৪৭৩ and অনুশীলন ১ (ক)–(গ), p.9 অনুশীলন ১ (৮০৬৯৯ পুরুষ, ৭৬৬৪৪ নারী), p.10 অনুশীলন ১ (৩২৭৪০, ৩২৯৪০), p.11 box (৪৩৬৮০ < ৪৫৪০০)",
  });

  // ── p.10–11: সংখ্যার তুলনা ──
  wio({
    page: 11, slug: "compare-1", title: "খালিঘরে < বা > চিহ্ন লিখি",
    items: [
      cmp(1215, 1125, ">"), // p.10 মূল প্রশ্ন (printed: ১১২৫ ছোটো)
      cmp(32740, 32940, "<"), // p.10 অনুশীলন ১ (printed on p.11)
      cmp(1000, 999, ">"), cmp(2199, 2200, "<"), cmp(9469, 9496, "<"), cmp(13777, 13666, ">"),
      cmp(3896, 3289, ">"), cmp(45799, 46898, "<"), cmp(79980, 69988, ">"), cmp(99999, 100000, "<"), // p.11 অনুশীলন ২ (১)–(৮)
    ],
    fresh: { skill: "compare", digits: 5 },
    src: "p.10 মূল প্রশ্ন (১২১৫, ১১২৫) and অনুশীলন ১ (৩২৭৪০, ৩২৯৪০; both printed), p.11 অনুশীলন ২ (১)–(৮)",
  });
  wio({
    page: 11, slug: "compare-2", title: "ছোটো থেকে বড়ো ও বড়ো থেকে ছোটো লিখি",
    items: [
      cmp(1999, 2000, "<"), // the printed row
      cmp(21109, 21111, "<"), cmp(21111, 21109, ">"),
      cmp(42586, 42585, ">"), cmp(42585, 42586, "<"),
      cmp(68888, 68990, "<"), cmp(68990, 68888, ">"),
      cmp(87109, 87099, ">"), cmp(87099, 87109, "<"),
      cmp(89325, 89775, "<"), // p.13 অনুশীলন ৩ (the two mango gardens)
    ],
    src: "p.11 অনুশীলন ৩ (৫ জোড়া, each written both ways: ছোটো থেকে বড়ো with <, বড়ো থেকে ছোটো with >; ১৯৯৯ < ২০০০ printed), p.13 অনুশীলন ৩ (৮৯৩২৫, ৮৯৭৭৫)",
  });

  // ── p.12–13: ordering ──
  order({
    page: 12, slug: "small-to-big", title: "ছোটো থেকে বড়ো ক্রমে সাজাই",
    items: [4379, 4399, 5409, 5480, 24709, 35699, 36735, 37556, 37566, 38556, 39456, 47802],
    src: "p.12 অনুশীলন ৪, the first two sets (৪৩৯৯, ৫৪০৯, ৫৪৮০, ৪৩৭৯ and ২৪৭০৯, ৩৫৬৯৯, ৩৬৭৩৫, ৪৭৮০২) and কাজ ১ (৩৭৫৬৬, ৩৮৫৫৬, ৩৭৫৫৬, ৩৯৪৫৬) in one row",
  });
  order({
    page: 12, slug: "big-to-small", title: "বড়ো থেকে ছোটো ক্রমে সাজাই",
    items: [91809, 91099, 91009, 90888, 87109, 87099, 78609, 77690, 75689, 75611],
    src: "p.12 অনুশীলন ৪, the last two sets (৭৫৬১১, ৭৫৬৮৯, ৭৭৬৯০, ৭৮৬০৯ and ৯১০০৯, ৯১৮০৯, ৯০৮৮৮, ৯১০৯৯) in one row, with p.11 অনুশীলন ৩'s ৮৭১০৯ > ৮৭০৯৯",
  });
  order({
    page: 13, slug: "salary", title: "বেতন, দাম ও আরও: ছোটো থেকে বড়ো ক্রমে সাজাই",
    items: [8875, 9347, 9845, 15416, 17779, 17879, 18257, 89325, 89775, 97779],
    src: "p.13 অনুশীলন ১ (the five salary steps of the মূল প্রশ্ন), অনুশীলন ২ (৯৭৭৭৯ টাকার গহনা), অনুশীলন ৩ (৮৯৩২৫ ও ৮৯৭৭৫ টাকার আম), p.20 নিজে করি ৯ (৩) (১৭৭৭৯, ১৭৮৭৯)",
  });
  wio({
    page: 13, slug: "place-parts-2", title: "স্থানীয় মান: খালিঘর পূরণ করি (২)",
    items: [
      parts(100000), // p.9 the table লক্ষ/অযুত/হাজার/শতক/দশক/একক = 1/0/0/0/0/0 (printed)
      parts(80699), parts(76644), // p.9 অনুশীলন ১
      parts(18257), // p.13 কাজ ১ (the printed tree)
      parts(15416), parts(9845), parts(9347), parts(8875), // p.13 কাজ ১, the other four
      parts(97779), // p.13 অনুশীলন ২ (the jewellery)
    ],
    fresh: { skill: "place", digits: 5 },
    src: "p.9 the লক্ষ table (printed) and অনুশীলন ১, p.13 কাজ ১ (১৮২৫৭ printed, ১৫৪১৬, ৯৮৪৫, ৯৩৪৭, ৮৮৭৫) and অনুশীলন ২ (৯৭৭৭৯)",
  });
  match({
    page: 13, slug: "words-4", title: "পড়ি ও কথায় লিখি · মিল করি (৪)",
    pairs: [18257, 15416, 9845, 9347, 8875, 97779, 89325, 89775, 37556, 37566].map((n) => wordPair(n)),
    src: "p.13 কাজ ১ (সংখ্যাগুলো পড়ি: the five salaries), অনুশীলন ২ (৯৭৭৭৯ কথায়) and ৩ (৮৯৩২৫, ৮৯৭৭৫: সংখ্যা দুইটি পড়ি), p.12 কাজ ১ (৩৭৫৫৬, ৩৭৫৬৬)",
  });

  // ── p.14–15: ক্রমবাচক সংখ্যা ──
  match({
    page: 14, slug: "ordinals-1", title: "ক্রমবাচক সংখ্যা · মিল করি (১)",
    pairs: [9, 10, 11, 12, 13, 14, 15, 16, 1, 5].map((k) => [ord(k)[1], ord(k)[0]]),
    src: "p.14 the table অবস্থান (নবম ৯ম … ষোড়শ ১৬শ; প্রথম, পঞ্চম)",
  });
  match({
    page: 14, slug: "ordinals-2", title: "ক্রমবাচক সংখ্যা · মিল করি (২)",
    pairs: [17, 18, 19, 20, 2, 3, 4, 6, 7, 8].map((k) => [ord(k)[1], ord(k)[0]]),
    src: "p.14 the table অবস্থান (সপ্তদশ ১৭শ … বিংশ ২০শ; দ্বিতীয়, তৃতীয়, চতুর্থ, ষষ্ঠ, সপ্তম, অষ্টম)",
  });
  order({
    page: 14, slug: "ordinals-order", title: "ক্রমবাচক সংখ্যা সাজাই (একাদশ থেকে বিংশ)",
    items: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((k) => ord(k)[0]),
    src: "p.14 the table's right half (একাদশ … বিংশ)",
  });
  order({
    page: 15, slug: "stairs", title: "সিঁড়ির ধাপে ক্রমবাচক সংখ্যা সাজাই",
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => ord(k)[0]),
    src: "p.15 অনুশীলন ২ (the stairs, ১ম and ৩য় printed: the first ten steps, in words), p.14 table",
  });
  match({
    page: 15, slug: "marks", title: "গণিতের নম্বর অনুযায়ী ক্রমবাচক অবস্থান · মিল করি",
    pairs: [["ঐশী 100", 1], ["শিমু 98", 2], ["ইমন 97", 3], ["তপন 95", 4], ["হিয়া 92", 5], ["লিমন 90", 6], ["রেখা 87", 7], ["ইতি 85", 8], ["নাবিলা 84", 9], ["দিপু 82", 10]].map(([who, k]) => [who, ord(k)[0]]),
    src: "p.15 কাজ ১, the left half's ten rows (ঐশী ১০০ প্রথম printed … দিপু ৮২ দশম)",
  });

  // ── p.16–17: সংখ্যা প্যাটার্ন ──
  wio({
    page: 16, slug: "patterns-1", title: "খালিঘর পূরণ করে প্যাটার্ন সম্পন্ন করি (১)",
    items: [
      pat([7, 10, 13, null, 19, null, 25, 28, null], [16, 22, 31]),
      pat([18, 20, null, null, 26, 28], [22, 24]),
      pat([19, null, 15, null, 11, 9, null, null], [17, 13, 7, 5]),
      pat([2, 4, null, null, null, 12, null, null], [6, 8, 10, 14, 16]),
      pat([null, 29, 28, null, 26, null, 24], [30, 27, 25]),
      pat([null, null, null, 35, 40, 45, null], [20, 25, 30, 50]),
    ],
    fresh: { skill: "pattern" },
    src: "p.16 মূল প্রশ্ন (১)–(৬) (নিয়ম +৩ printed for (১))",
  });
  wio({
    page: 17, slug: "patterns-2", title: "খালিঘর পূরণ করে প্যাটার্ন সম্পন্ন করি (২)",
    items: [
      pat([14, 18, 22, null, null, null], [26, 30, 34]),
      pat([28, 26, 24, null, null, null], [22, 20, 18]),
      pat([65, null, 75, 80, null, null], [70, 85, 90]),
      pat([36, 30, 24, null, null, null], [18, 12, 6]),
      pat([77, 66, 55, null, null, null], [44, 33, 22]),
    ],
    fresh: { skill: "pattern" },
    src: "p.17 মূল প্রশ্ন and অনুশীলন ১ (১)–(৫)",
  });
  mcq({
    page: 17, slug: "rules", title: "প্যাটার্নের নিয়ম খুঁজি",
    questions: [
      q({ prompt: "14, 18, 22, □, □, □ প্যাটার্নটির নিয়ম কী?", options: ["+4", "−4", "+2", "+8"], answer: "+4", why: "14 থেকে 18, 18 থেকে 22: প্রতি ক্ষেত্রে 4 করে বৃদ্ধি, তাই নিয়ম +4।" }),
      q({ prompt: "28, 26, 24, □, □, □ প্যাটার্নটির নিয়ম কী?", options: ["−2", "+2", "−4", "−1"], answer: "−2", why: "প্রতি ক্ষেত্রে 2 করে কমেছে: 28 − 2 = 26, 26 − 2 = 24। নিয়ম −2।" }),
      q({ prompt: "65, □, 75, 80, □, □ প্যাটার্নটির নিয়ম কী?", options: ["+5", "−5", "+10", "+15"], answer: "+5", why: "75 থেকে 80: 5 বৃদ্ধি। 65 থেকে 75 দুই ধাপে 10, তাই প্রতি ধাপে 5। নিয়ম +5।" }),
      q({ prompt: "36, 30, 24, □, □, □ প্যাটার্নটির নিয়ম কী?", options: ["−6", "+6", "−4", "−3"], answer: "−6", why: "প্রতি ক্ষেত্রে 6 করে কমেছে: 36 − 6 = 30, 30 − 6 = 24। নিয়ম −6।" }),
      q({ prompt: "77, 66, 55, □, □, □ প্যাটার্নটির নিয়ম কী?", options: ["−11", "+11", "−10", "−1"], answer: "−11", why: "প্রতি ক্ষেত্রে 11 করে কমেছে: 77 − 11 = 66, 66 − 11 = 55। নিয়ম −11।" }),
      q({ prompt: "15, 18, 21, 24, 27, 30 প্যাটার্নটির নিয়ম কী?", options: ["+3", "−3", "+5", "+6"], answer: "+3", why: "প্রতি ক্ষেত্রে 3 করে বৃদ্ধি: আমার নিয়মটি হলো +3।" }),
      q({ prompt: "□, 29, 28, □, 26, □, 24 প্যাটার্নটির নিয়ম কী?", options: ["−1", "+1", "−2", "−3"], answer: "−1", why: "29 থেকে 28: 1 কম। প্রতি ক্ষেত্রে 1 করে কমেছে, তাই নিয়ম −1।" }),
      q({ prompt: "7, 10, 13, □, 19, □, 25, 28, □ প্যাটার্নটির নিয়ম কী?", options: ["+3", "−3", "+2", "+4"], answer: "+3", why: "1 নম্বর প্যাটার্নের নিয়মটি হলো +3, কারণ এখানে প্রতি ক্ষেত্রে 3 করে বৃদ্ধি পেয়েছে।" }),
      q({ prompt: "18, 20, □, □, 26, 28 প্যাটার্নটির নিয়ম কী?", options: ["+2", "−2", "+4", "+1"], answer: "+2", why: "18 থেকে 20, 26 থেকে 28: প্রতি ক্ষেত্রে 2 করে বৃদ্ধি, তাই নিয়ম +2।" }),
      q({ prompt: "19, □, 15, □, 11, 9, □, □ প্যাটার্নটির নিয়ম কী?", options: ["−2", "+2", "−4", "−1"], answer: "−2", why: "11 থেকে 9: 2 কম। 19 থেকে 15 দুই ধাপে 4, তাই প্রতি ধাপে 2 কম। নিয়ম −2।" }),
      q({ prompt: "2, 4, □, □, □, 12, □, □ প্যাটার্নটির নিয়ম কী?", options: ["+2", "+4", "−2", "+3"], answer: "+2", why: "2 থেকে 4: 2 বৃদ্ধি। 4 থেকে 12 চার ধাপে 8, তাই প্রতি ধাপে 2। নিয়ম +2।" }),
      q({ prompt: "□, □, □, 35, 40, 45, □ প্যাটার্নটির নিয়ম কী?", options: ["+5", "−5", "+10", "+4"], answer: "+5", why: "35 থেকে 40, 40 থেকে 45: প্রতি ক্ষেত্রে 5 করে বৃদ্ধি, তাই নিয়ম +5।" }),
    ],
    src: "p.17 the নিয়ম box of মূল প্রশ্ন (১)–(৫) (+৪ printed), কাজ ৩ (the card ১৫ … ৩০, “আমার নিয়মটি হলো +৩” printed), p.16 মূল প্রশ্ন (৫), then (১) (+৩ printed by the girl), (২), (৩), (৪), (৬) (কাজ ২: “অন্যান্য প্যাটার্নের নিয়মগুলো খুঁজে বের করি”)",
  });

  // ── p.18–20: নিজে করি ──
  match({
    page: 18, slug: "digits-3", title: "অঙ্কে লিখি · মিল করি (৩)",
    pairs: [
      ...[wordPair(30605, "ত্রিশ হাজার ছয় শত পাঁচ"), wordPair(57563, "সাতান্ন হাজার পাঁচ শত তেষট্টি"), wordPair(87007, "সাতাশি হাজার সাত")].map(([d, w]) => [w, d]),
      ["আটটি 10 হাজার ও চারটি 1 হাজার দ্বারা গঠিত সংখ্যা", 84000],
      ["আটটি 10 হাজার, নয়টি 1 হাজার ও নয়টি 1 দ্বারা গঠিত সংখ্যা", 89009],
      ["নয়টি 10 হাজার, নয়টি 1 হাজার, নয়টি 1 শত, নয়টি 10 ও নয়টি 1 দ্বারা গঠিত সংখ্যা", 99999],
      ...[2455, 30466, 54009, 29999].map((n) => wordPair(n)).map(([d, w]) => [w, d]),
    ],
    src: "p.18 নিজে করি ৩ (১)–(৬), as printed; then the answers of p.18 নিজে করি ১ (২৪৫৫) and ২ (৩০৪৬৬), p.20 নিজে করি ৫ (৬) (৫৪০০৯) and ৮ (২) (২৯৯৯৯) in words",
  });
  mcq({
    page: 19, slug: "tick", title: "নিজে করি: সঠিক উত্তর বেছে নিই",
    questions: [
      q({ prompt: "ছবিতে ব্লকের 2টি স্তূপ আছে, প্রতিটিতে 10টি 100। আরও আছে 4টি 100, 5টি 10 ও 5টি 1। মোট কতগুলো ব্লক আছে?", options: ["2455", "2545", "20455", "455"], answer: "2455", num: 2455, why: "10টি 100 = 1000, তাই 2টি স্তূপে 2000। 2000 + 400 + 50 + 5 = 2455" }),
      q({ prompt: "বক্সে 2টি 10000, 10টি 1000, 4টি 100, 6টি 10 ও 6টি 1 কার্ড আছে। সংখ্যাটি কত?", options: ["30466", "21466", "20466", "210466"], answer: "30466", num: 30466, why: "10টি 1000 = 10000, তাই মোট 3টি 10000। 30000 + 400 + 60 + 6 = 30466" }),
      q({ prompt: "এক অযুত কত অঙ্ক বিশিষ্ট সংখ্যা হবে?", options: ["তিন অঙ্ক", "চার অঙ্ক", "পাঁচ অঙ্ক", "ছয় অঙ্ক"], book: "গ", why: "এক অযুত = 10000: এতে 5টি অঙ্ক।" }),
      q({ prompt: "নিচের কোনটি বৃহত্তম সংখ্যা?", options: ["7829", "7892", "7982", "7928"], book: "গ", num: 7982, why: "হাজারে সবগুলোতে 7। শতকে 9 আছে 7982 ও 7928 এ; দশকে 8 > 2, তাই 7982 বৃহত্তম।" }),
      q({ prompt: "চিত্রে বাম দিক থেকে গণনা করলে কালো রং করা বৃত্তটির অবস্থান ক্রমবাচক সংখ্যায় কততম? ⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚫⚪⚪⚪⚪", options: ["চতুর্থ", "পঞ্চম", "চতুর্দশ", "পঞ্চদশ"], book: "গ", why: "বাম দিক থেকে গুনি: কালো বৃত্তটির আগে 13টি বৃত্ত, তাই এর অবস্থান 14শ, অর্থাৎ চতুর্দশ।" }),
      // the book prints ক and গ alike (both right): ক is changed to a wrong order, গ stays the right one
      q({ prompt: "2597, 2579, 2757, 2775 সংখ্যাগুলোকে বড়ো থেকে ছোটো ক্রমে সাজালে নিচের কোন ক্রমটি সঠিক?", options: ["2757 > 2775 > 2579 > 2597", "2775 > 2757 > 2579 > 2597", "2775 > 2757 > 2597 > 2579", "2757 > 2775 > 2597 > 2579"], book: "গ", why: "শতকে 7 আছে দুইটিতে: 2775 > 2757। শতকে 5 আছে দুইটিতে: 2597 > 2579।" }),
      q({ prompt: "5, 10, 15, 20, 25, 30, … প্যাটার্নটির নিয়ম হলো–", options: ["প্রতি ক্ষেত্রে 5 বৃদ্ধি", "প্রতি ক্ষেত্রে 10 বৃদ্ধি", "প্রতি ক্ষেত্রে 5 কম", "প্রতি ক্ষেত্রে 10 কম"], book: "ক", why: "প্রতিটি সংখ্যা আগেরটির চেয়ে 5 বেশি: নিয়ম +5।" }),
      q({ prompt: "7, 11, □, 19, □, 27। প্যাটার্নটির খালিঘরের সংখ্যাগুলো কত হবে?", options: ["12, 20", "18, 26", "15, 23", "15, 20"], book: "গ", why: "নিয়ম +4: 11 + 4 = 15, 19 + 4 = 23।" }),
      q({ prompt: "1215 ও 1125 এর মধ্যে কোন সংখ্যাটি ছোটো?", options: ["1215", "1125"], answer: "1125", num: 1125, why: "হাজারের দল একই। শত এর দল 1215 এ 2টি, 1125 এ 1টি। তাই 1125 সংখ্যাটি ছোটো।" }),
      q({ prompt: "ছবিতে 10000 টিকিটের 2টি বাক্স আছে। ছবিতে আরও 3 হাজার এবং 425টি টিকিট আছে। সর্বমোট কতটি টিকিট আছে?", options: ["23425", "20425", "5425", "230425"], answer: "23425", num: 23425, why: "2টি বাক্সে 20 হাজার, আরও 3 হাজার ও 425: 20000 + 3000 + 425 = 23425" }),
    ],
    src: "p.18 নিজে করি ১ (the blocks, ২৪৫৫) and ২ (২) (the cards, ৩০৪৬৬): options mine; p.19 নিজে করি ৪ (১)–(৬), the book's options in its order ((৪) fixed); p.10 মূল প্রশ্ন (১১২৫ ছোটো, printed) and p.3 মূল প্রশ্ন (২) (২৩৪২৫ টিকিট, printed): options mine",
  });
  wio({
    page: 19, slug: "place-fill", title: "নিজে করি: খালিঘর পূরণ করি",
    items: [
      number(3505), number(7145), number(2027), number(5006), // নিজে করি ৫ (১)–(৪): the number from its places
      parts(4375), // (৫)
      parts(54009), // (৬), p.20
    ],
    fresh: { skill: "place", digits: 5 },
    src: "p.19 নিজে করি ৫ (১)–(৫), p.20 নিজে করি ৫ (৬)",
  });
  wio({
    page: 20, slug: "what-number", title: "নিজে করি: সংখ্যাটি কত?",
    askOperation: false,
    items: [
      word("39 শত সংখ্যাটি কত?", "39 × 100", 3900),
      word("122 শত সংখ্যাটি কত?", "122 × 100", 12200),
      word("2900 এ কয়টি শত আছে?", "2900 ÷ 100", 29, "শত"),
      word("91000 এ কয়টি শত আছে?", "91000 ÷ 100", 910, "শত"),
      word("একটি সংখ্যা 12999 থেকে 1 বেশি। সংখ্যাটি কত?", "12999 + 1", 13000),
      word("একটি সংখ্যা 30000 থেকে 1 কম। সংখ্যাটি কত?", "30000 − 1", 29999),
      word("একটি সংখ্যা 10000 থেকে 10 কম। সংখ্যাটি কত?", "10000 − 10", 9990),
      word("একটি সংখ্যা 49990 থেকে 10 বেশি। সংখ্যাটি কত?", "49990 + 10", 50000),
      word("একটি সংখ্যা 79900 থেকে 100 বেশি। সংখ্যাটি কত?", "79900 + 100", 80000),
      word("আটটি 10 হাজার ও চারটি 1 হাজার দ্বারা গঠিত সংখ্যাটি কত?", "80000 + 4000", 84000),
    ],
    src: "p.20 নিজে করি ৬ (১)–(৪) (শত গুনি) and নিজে করি ৮ (১)–(৫) (১, ১০, ১০০ বেশি বা কম), p.18 নিজে করি ৩ (৪) (৮৪০০০)",
  });
  wio({
    page: 20, slug: "number-line", type: "number_line", title: "সংখ্যারেখায় খালিঘরে সংখ্যা লিখি",
    items: [
      line(7000, 10000, 500, 9000), line(7000, 10000, 500, 10000), // p.9 অনুশীলন ২: ক, খ
      line(0, 600, 50, 200), line(0, 600, 50, 400), line(0, 600, 50, 500), // p.20 নিজে করি ৭ (১)
      line(2300, 2900, 50, 2400), line(2300, 2900, 50, 2800), line(2300, 2900, 50, 2900), // (২)
      line(0, 600, 50, 300), line(2300, 2900, 50, 2600), // two of the labels the book prints on the same lines
    ],
    src: "p.9 অনুশীলন ২ (ক = ৯০০০, খ = ১০০০০), p.20 নিজে করি ৭ (১) (২০০, ৪০০, ৫০০) and (২) (২৪০০, ২৮০০, ২৯০০); then the printed labels ৩০০ and ২৬০০ of the same lines, as boxes",
  });
  wio({
    page: 20, slug: "compare-3", title: "নিজে করি: > বা < প্রতীক বসাই",
    items: [cmp(975, 957, ">"), cmp(8475, 8574, "<"), cmp(17779, 17879, "<"), cmp(37589, 38579, "<"), cmp(8579, 8578, ">"), cmp(17999, 18999, "<")],
    fresh: { skill: "compare", digits: 5 },
    src: "p.20 নিজে করি ৯ (১)–(৬)",
  });

  // ── the choices made ──
  note("**p.19 নিজে করি ৪ (৪)** prints options ক and গ alike (“২৭৭৫ > ২৭৫৭ > ২৫৯৭ > ২৫৭৯”, both right). ক is changed to a wrong order, “২৭৫৭ > ২৭৭৫ > ২৫৭৯ > ২৫৯৭” (both pairs swapped). গ stays the right answer, so the book's letters for the other options still hold.");
  note("**p.19 নিজে করি ৪ (৩)** (the 18 circles, the black one 14th from the left, as the survey counted it) is drawn in the question as a row of ⚪ and one ⚫. **(৬)**'s blanks, printed “…”, are written □. **(৫)**: “২৫,৩০, …..” is written “২৫, ৩০, …”.");
  note("**p.18 নিজে করি ১** is read as 2455: two stacks of 10 hundred-flats (2000), 4 flats, 5 rods, 5 cubes (checked at 110 dpi; the survey marks it (?)). The question says the counts in words. **নিজে করি ২ (২)** gives the card counts (2 of 10000, 10 of 1000, 4 of 100, 6 of 10, 6 of 1; 30466) in the question, because (১), counting the cards, needs the picture. Both are in the p.19 multiple choice, with options of mine.");
  note("**Place-value rounds:** the server asks a number's own places (7804 → 4 boxes, হাজার to একক). p.8 অনুশীলন ২'s row prints five boxes for 7804 (0 অযুত). p.19 নিজে করি ৫ (৩) “২ হাজার, ২ দশক ও ৭ একক” and (৪) “৫ হাজার ৬ একক” leave places out; the round shows every place, with 0 for the ones the book skips. The digit trees (“স্থানীয় মান নির্ণয় করি”: 7, 70, 400 …) are asked as each place's digit; the values themselves are asked in the p.9 multiple choice for 94230, 93007 and 49037.");
  note("**p.2 অনুশীলন ১** (which of two boxes holds 925 blocks; the left one: 9 flats, 2 rods, 5 cubes) is a place-value round: 9 শতক 2 দশক 5 একক = □.");
  note("**Number words:** every word the book prints (p.2 অনুশীলন ৪, p.4 কাজ ১, p.6 অনুশীলন ৬, p.8 ৮৩৪৭৩, p.18 নিজে করি ৩) is checked against the lib's spelling and agrees. p.1's “এক হাজার একশত একুশ” (one word একশত) is not used in a match: 1121 is only a place-value round.");
  note("**p.18 নিজে করি ৩ (৪)–(৬)** stay in the match with their printed phrases (“আটটি ১০ হাজার ও চারটি ১ হাজার দ্বারা গঠিত সংখ্যা” → ৮৪০০০); (৬) is the longest card text in the chapter.");
  note("**Ordering:** the book asks each set both ways (p.11 অনুশীলন ৩, p.12 অনুশীলন ৪, p.13 অনুশীলন ১). The p.11 pairs are compare rounds, each pair written both ways. p.12's four sets of four are two Sequences: sets 1–2 with কাজ ১'s four numbers (its order is printed), ছোটো থেকে বড়ো, 12 numbers; sets 3–4 with p.11 অনুশীলন ৩'s ৮৭১০৯ > ৮৭০৯৯, বড়ো থেকে ছোটো, 10 numbers. p.13's Sequence (ছোটো থেকে বড়ো) is the five salaries with the jewellery (৯৭৭৭৯), the two mango gardens (৮৯৩২৫, ৮৯৭৭৫) and p.20 নিজে করি ৯ (৩)'s ১৭৭৭৯ and ১৭৮৭৯, which fall between the salaries.");
  note("**At least 10 questions each (the user, 3 Nov):** where a page's own exercise is shorter, the activity adds the chapter's other printed numbers. The number-word matches read numbers the book prints but doesn't ask in words (p.6 অনুশীলন ৪–৫, p.8 অনুশীলন ২–৩, p.10–12 comparisons, the p.18–20 answers); the p.2 “অঙ্কে লিখি” match takes the four-digit pairs of p.10–11 (১২১৫/১১২৫, ৯৪৬৯/৯৪৯৬, ৩৮৯৬/৩২৮৯), close numbers like p.4's balloons. The p.2 place-value game adds the places of ১২৩৮ and ৯১০১. The p.17 rule quiz adds the rules of p.16 (১)–(৬) (কাজ ২). The p.19 review adds p.10 মূল প্রশ্ন (which is smaller, ১১২৫, two options as printed) and p.3 মূল প্রশ্ন (২) (২৩৪২৫ টিকিট), with options of mine. The p.20 story game adds p.18 নিজে করি ৩ (৪) (৮৪০০০). The number line adds two labels the book prints on the p.20 lines (৩০০, ২৬০০), asked as boxes. The ordinal matches now hold all twenty (প্রথম–বিংশ, ten each).");
  note("**p.13 অনুশীলন ৩** (89325 and 89775, one comparison) is the last round of the p.11 “ছোটো থেকে বড়ো ও বড়ো থেকে ছোটো” activity.");
  note("**p.15 কাজ ১:** the match uses the table's left half, ten rows (ঐশী ১০০ প্রথম … দিপু ৮২ দশম), which a child can rank from the marks shown. The right half (সামি একাদশ … রিয়া বিংশ) needs the whole table; its words are in the p.14 matches and the একাদশ–বিংশ Sequence. **p.15 অনুশীলন ২** (the stairs, about 14 steps, ১ম and ৩য় printed) is the প্রথম–দশম Sequence, in words (the short forms would sort by their digits).");
  note("**p.16 মূল প্রশ্ন (৬)** prints “৩৫, ৪০, ৪৫ ____” with no comma before the last blank; it is read as one more box (50).");
  note("**Number lines** have at most 20 steps. p.9 অনুশীলন ২ (ticks every 100, labelled ৭০০০ and ৮০০০) is drawn from 7000 to 10000 in steps of 500; p.20 নিজে করি ৭ (ticks every 10, labels every 100) in steps of 50, so the labels fall on the hundreds as printed. The p.9 line has two boxes only, so it joins the p.20 activity.");
  note("**p.20 নিজে করি ৬ and ৮** are story rounds without the sign step (`askOperation: false`): the child types the number. Their sums (৩৯ × ১০০, ২৯০০ ÷ ১০০, ১২৯৯৯ + ১ …) show only as the hint; ৬ (৩)–(৪) have the unit শত (২৯ শত).");
  note("**Fresh problems:** place value (4 digits on p.2, 5 digits after), compare (5 digits) and patterns add 5 new ones each; the number words, the orderings, the stories and the number line have none (the fresh number line is Class 2's 0–100).");

  cant("p.1–7 base-ten pictures (blocks, ticket boxes, number cards) are not drawn: the rounds give the counts as places.");
  cant("p.5 অনুশীলন ২ and p.18 নিজে করি ২ (১): sorting the scattered number cards into a box by place, and counting them in the picture.");
  cant("p.3 মূল প্রশ্ন (১) (how many packets are in a ticket box) and p.4's regrouped cards: picture questions; the ideas (১০টি ১০০০ = ১ অযুত) are in the p.9 multiple choice.");
  cant("“উচ্চস্বরে পড়ি” (p.8 অনুশীলন ১, p.9 অনুশীলন ১, p.13): reading aloud.");
  cant("p.14 মূল প্রশ্ন: the class lines up by height and says its ordinals; p.15 অনুশীলন ১: colour the 12th ant in a row of pictures (দ্বাদশ ↔ ১২শ is in the p.14 match).");
  cant("p.16 কাজ ১–৩ and অনুশীলন ১, p.17 কাজ ১–৩: discuss a rule, make your own patterns (৫টি with +৩; one for +৬, +৩, −৩, −৪), the card game with a classmate. The card's rule (+৩) is in the p.17 multiple choice.");
};
