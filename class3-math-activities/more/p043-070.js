// প্রাথমিক গণিত, তৃতীয় শ্রেণি · a game for every page (3 Nov 2026): printed pp.43, 46, 50, 57 (অধ্যায় ৫ · গুণ) and
// 63, 65, 66, 70 (অধ্যায় ৬ · ভাগ). Each page's exercises are already items in a neighbouring page's game (rest/ch05.js,
// rest/ch06.js), so each page here practises its own content another way: a multiple choice where the neighbour is
// Work It Out, a match, a sort, or the page's worked example step by step.
module.exports = (L) => {
  const { it, wio, q, mcq, match, sort, eq, note } = L;
  const row = (a, op, b, want) => it({ kind: "sum", a, op, b, layout: "row" }, want);
  const box = (text, want) => it({ kind: "missing", text }, want);
  const story = (text, sum, unit, want) => it({ kind: "word", text, sum, unit }, want);

  // ── p.43: ৬ × ৫ from its neighbours in row 6 of the table, and the turned array ──
  // (p.44's “গুণের নিয়ম” game has this page's boxes as missing-number items; here the same row and rules as choices)
  mcq({
    page: 43, slug: "rules-choice", title: "৬ × ৫ এর উত্তর কীভাবে বের করি?",
    questions: [
      q({ prompt: "6 এর গুণের নামতা: 6, 12, 18, 24, □, 36, 42, 48, 54, 60। খালিঘরে কোন সংখ্যা বসবে?", options: ["30", "28", "32", "25"], answer: "30", num: 30, why: "6 × 4 = 24। গুণক 1 বাড়লে গুণফল 6 বাড়ে: 24 + 6 = 30, তাই 6 × 5 = 30।" }),
      q({ prompt: "6 এর গুণের নামতায় বাম থেকে ডানে গেলে গুণফল কত করে বাড়ে?", options: ["6", "5", "1", "10"], answer: "6", num: 6, why: "6, 12, 18, 24 …: প্রতি ঘরে 6 করে বাড়ে। গুণক 1 করে বৃদ্ধি পেলে গুণফল গুণ্যের সমান করে বৃদ্ধি পায়।" }),
      q({ prompt: "6 এর গুণের নামতায় ডান থেকে বামে গেলে গুণফল কত করে কমে?", options: ["6", "5", "1", "10"], answer: "6", num: 6, why: "60, 54, 48, 42 …: প্রতি ঘরে 6 করে কমে। গুণক 1 করে কমে গেলে গুণফল গুণ্যের সমান করে কমে যায়।" }),
      q({ prompt: "6 × 5 = 6 × 4 + □। খালিঘরে কত?", options: ["6", "4", "5", "24"], answer: "6", num: 6, why: "6 × 4 = 24 এবং 6 × 5 = 30। 30 = 24 + 6, তাই খালিঘরে 6।" }),
      q({ prompt: "6 × 5 = 6 × 6 − □। খালিঘরে কত?", options: ["6", "5", "1", "36"], answer: "6", num: 6, why: "6 × 6 = 36 এবং 6 × 5 = 30। 30 = 36 − 6, তাই খালিঘরে 6।" }),
      q({ prompt: "6 × 8 এর উত্তর 6 × 7 এর উত্তরের চেয়ে কত বেশি?", options: ["6", "7", "8", "1"], answer: "6", num: 6, why: "6 × 7 = 42, 6 × 8 = 48। 48 − 42 = 6: গুণক 1 বেশি, তাই গুণফল গুণ্যের সমান, 6 বেশি।" }),
      q({ prompt: "6 × 9 = 54। তাহলে 6 × 10 = কত?", options: ["60", "55", "64", "50"], answer: "60", num: 60, why: "গুণক 1 বাড়লে গুণফল গুণ্য 6 এর সমান বাড়ে: 54 + 6 = 60।" }),
      q({ prompt: "6 × 4 = 24। তাহলে 6 × 3 = কত?", options: ["18", "23", "20", "12"], answer: "18", num: 18, why: "গুণক 1 কমলে গুণফল গুণ্য 6 এর সমান কমে: 24 − 6 = 18।" }),
      q({ prompt: "6টি সারিতে 5টি করে বিন্দু আছে (6 × 5)। রাফি ছবিটি ঘুরিয়ে দেখল 5টি সারিতে 6টি করে বিন্দু। এটি কোন গুণ?", options: ["5 × 6", "6 × 6", "5 × 5", "6 × 4"], answer: "5 × 6", why: "ছবি ঘুরালে বিন্দুর সংখ্যা একই থাকে: 6 × 5 = 5 × 6 = 30।" }),
      q({ prompt: "6 × 5 = 30 হলে 5 × 6 = কত?", options: ["30", "11", "56", "65"], answer: "30", num: 30, why: "গুণ্য ও গুণক স্থান বিনিময় করলেও গুণফল একই থাকে: 5 × 6 = 30।" }),
      q({ prompt: "গুণ্য ও গুণক স্থান বিনিময় করলে গুণফলের কী হয়?", options: ["একই থাকে", "বেড়ে যায়", "কমে যায়"], answer: "একই থাকে", why: "6 × 5 = 30 এবং 5 × 6 = 30। গুণের ক্ষেত্রে গুণ্য ও গুণক স্থান বিনিময় করলেও গুণফল একই থাকে।" }),
    ],
    src: "p.43 কাজ ১ (১) (row 6 of the table: the blank 6 × 5, “□ করে বাড়ে”, “□ করে কমে”, ৬ × ৫ = ৬ × ৪ + □, ৬ × ৫ = ৬ × ৬ − □, the girl's □ বেশি; the box's rule asked on the row's printed neighbours 6 × 7 → 6 × 8, 6 × 9 → 6 × 10, 6 × 4 → 6 × 3) and (২) (রাফি's turned array ৬ × ৫ → □ × □, the box গুণ্য ও গুণক স্থান বিনিময়); my options",
  });
  note("p.43 (multiple choice): the page's boxes are already missing-number items in “গুণের নিয়ম · খালিঘর পূরণ করি” (p.44, Work It Out), so this page's game asks the same row and rules as choices. Besides the page's own boxes, three questions apply the page's box (গুণক ১ বাড়লে / কমলে) to other neighbours in the printed row 6 (6 × 7 = 42 → 6 × 8, 6 × 9 = 54 → 6 × 10, 6 × 4 = 24 → 6 × 3); রাফি's turned array is told in words (6 rows of 5 → 5 rows of 6). Seven of the eleven answers are 6, as on the page (the step is always the গুণ্য); the options differ.");

  // ── p.46: the ১৩ table (the grid row is in p.47's game; কাজ ১'s 10 × 3 + 3 × 3 in p.45's) ──
  match({
    page: 46, slug: "table-13-match", type: "equation_match", title: "১৩ এর গুণের নামতা তৈরি করি · মিল করি",
    pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => eq(`13*${n}`)),
    src: "p.46 মূল প্রশ্ন (১৩এর গুণের নামতা: ১৩ × ১ … ১৩ × ১০, all 10 pairs; ১৩ × ১ = ১৩ and ১৩ × ২ = ২৬ are printed)",
    notes: ["ছবির মতো 13 কে 10 ও 3 এ ভেঙ্গে গুণ করি: 13 × 3 = 10 × 3 + 3 × 3 = 30 + 9 = 39।"],
  });
  note("p.46 (equation match): the ১৩ table is a grid row in “১২ ও ১৩ এর গুণের নামতা” (p.47) and কাজ ১ (10 × 3 + 3 × 3) a box in “ভেঙ্গে লিখে” (p.45), so this page's game matches 13 × 1 … 13 × 10 to their products (the two printed facts among them, to make 10 pairs), with কাজ ১'s split (13 = 10 + 3) as the guide note.");

  // ── p.50: রেজার বিস্কুট, the tape diagram's words and the place-value split ──
  // (23 × 3 is a column sum in p.51's game and the story a word problem in p.62's)
  mcq({
    page: 50, slug: "reza-biscuits", title: "রেজার বিস্কুট: গুণ্য × গুণক = গুণফল",
    questions: [
      q({ prompt: "রেজা তিন প্যাকেট বিস্কুট কিনতে চায়। এক প্যাকেটের দাম 23 টাকা। গাণিতিক বাক্য কোনটি?", options: ["23 × 3", "23 + 3", "23 − 3", "3 × 3"], answer: "23 × 3", emoji: "🍪", why: "1 প্যাকেটের দাম × প্যাকেটের সংখ্যা = মোট মূল্য: 23 × 3।" }),
      q({ prompt: "23 × 3 এ 23 কী বোঝায়?", options: ["1 প্যাকেটের দাম", "প্যাকেটের সংখ্যা", "মোট মূল্য"], answer: "1 প্যাকেটের দাম", why: "এক প্যাকেটের দাম 23 টাকা। 1 প্যাকেটের দাম × প্যাকেটের সংখ্যা = মোট মূল্য।" }),
      q({ prompt: "23 × 3 এ 3 কী বোঝায়?", options: ["1 প্যাকেটের দাম", "প্যাকেটের সংখ্যা", "মোট মূল্য"], answer: "প্যাকেটের সংখ্যা", why: "রেজা তিন প্যাকেট বিস্কুট কিনতে চায়: প্যাকেটের সংখ্যা 3।" }),
      q({ prompt: "1 প্যাকেটের দাম × প্যাকেটের সংখ্যা = মোট মূল্য। এখানে গুণ্য কোনটি?", options: ["1 প্যাকেটের দাম", "প্যাকেটের সংখ্যা", "মোট মূল্য"], answer: "1 প্যাকেটের দাম", why: "গুণ্য × গুণক = গুণফল: 1 প্যাকেটের দাম গুণ্য, প্যাকেটের সংখ্যা গুণক, মোট মূল্য গুণফল।" }),
      q({ prompt: "1 প্যাকেটের দাম × প্যাকেটের সংখ্যা = মোট মূল্য। মোট মূল্যকে কী বলে?", options: ["গুণফল", "গুণ্য", "গুণক"], answer: "গুণফল", why: "গুণ্য × গুণক = গুণফল: মোট মূল্য হলো গুণফল।" }),
      q({ prompt: "দশক ও একক এর ছকে 23 কে কীভাবে ভেঙ্গে লিখি?", options: ["20 + 3", "2 + 3", "20 + 30", "200 + 3"], answer: "20 + 3", why: "23 এ 2টি দশ (দশক এর ঘরে 10 10) ও 3টি এক (এককের ঘরে 1 1 1): 23 = 20 + 3।" }),
      q({ prompt: "ছকের দশক এর ঘরে 3 সারিতে 10 10 আছে। 20 × 3 = কত?", options: ["60", "6", "23", "600"], answer: "60", num: 60, why: "20 এ 2টি দশ। 2 × 3 = 6, তাই 20 × 3 = 6 দশ = 60।" }),
      q({ prompt: "ছকের এককের ঘরে 3 সারিতে 1 1 1 আছে। 3 × 3 = কত?", options: ["9", "6", "33", "3"], answer: "9", num: 9, why: "প্রতি সারিতে 3টি এক, 3টি সারি: 3 × 3 = 9।" }),
      q({ prompt: "20 × 3 = 60 এবং 3 × 3 = 9। তাহলে 23 × 3 = কত?", options: ["69", "63", "96", "60"], answer: "69", num: 69, why: "23 × 3 = 20 × 3 + 3 × 3 = 60 + 9 = 69।" }),
      q({ prompt: "রেজার কত টাকার প্রয়োজন?", options: ["69 টাকা", "26 টাকা", "23 টাকা", "20 টাকা"], answer: "69 টাকা", num: 69, emoji: "🍪", why: "23 × 3 = 69। তাই রেজার 69 টাকার প্রয়োজন।" }),
    ],
    src: "p.50 মূল প্রশ্ন (রেজা, বিস্কুট: গাণিতিক বাক্য লিখি; the boxes ১ প্যাকেটের দাম × প্যাকেটের সংখ্যা = মোট মূল্য under গুণ্য × গুণক = গুণফল; the দশক | একক chart 20 × 3 and 3 × 3; the printed split 20 × 3 = 60, 3 × 3 = 9, মোট = 69; “……… টাকার প্রয়োজন”); my options",
  });
  note("p.50 (multiple choice): 23 × 3 is a column sum in “উপর-নিচ ও পাশাপাশি গুণ করি (১)” (p.51) and the রেজা story a word problem in “নিজে করি: গুণের গল্প” (p.62), so this page's game asks the page itself: the গাণিতিক বাক্য (3 × 23 is left out of the options, so the book's 1 প্যাকেটের দাম × প্যাকেটের সংখ্যা order is the one right choice), what 23 and 3 stand for, the page's names গুণ্য / গুণক / গুণফল for its three boxes, and the দশক | একক chart's split 20 × 3 + 3 × 3 = 69 (printed).");

  // ── p.57: মিনার পেনসিল, the worked example step by step ──
  // (p.58's game plays the story as 21 × 13 and the area grid as one grid round)
  wio({
    page: 57, slug: "mina-pencils", title: "মিনার পেনসিল: ভেঙ্গে লিখে গুণ করি",
    items: [
      // the story with the page's own split as its sum: ধাপ ১ 21 × 10 = 210, ধাপ ২ 21 × 3 = 63, ধাপ ৩ 210 + 63 = 273
      story("মিনা 13টি পেনসিল কিনেছে। যদি প্রতিটি পেনসিলের দাম 21 টাকা হয়, তবে সবগুলো পেনসিলের মোট দাম কত হবে?", "21 × 10 + 21 × 3", "টাকা", 273), // printed: মোট দাম ২৭৩ টাকা
      it({ kind: "sum", terms: [10, 10, 1], op: "+", layout: "row" }, 21), // one oval: 10, 10, 1 (one pencil's 21 টাকা)
      box("21 × 13 = 21 × 10 + 21 × □", 3), // the 13 ovals: "২১ × ১০" (10 ovals) and "২১ × ৩" (3 ovals)
      box("21 = 20 + □", 1), // "২১ ও ১৩ কে স্থানীয় মানে প্রকাশ করি": ২১ = ২০ + ১ (printed)
      box("13 = 10 + □", 3), // ১৩ = ১০ + ৩ (printed)
      row(20, "×", 10, 200), row(1, "×", 10, 10), row(20, "×", 3, 60), row(1, "×", 3, 3), // the grid's four cells (printed 200, 10, 60, 3)
      it({ kind: "sum", terms: [200, 60, 10, 3], op: "+", layout: "column" }, 273), // the column beside the grid (printed 273)
    ],
    src: "p.57 মূল প্রশ্ন (মিনা, পেনসিল: the 13 ovals of 10, 10, 1 split as ২১ × ১০ and ২১ × ৩, মোট = ২৭৩), ২১ = ২০ + ১, ১৩ = ১০ + ৩, the grid's cells 200, 10, 60, 3 and the column 200 + 60 + 10 + 3 = 273 (all printed: the page is a worked example)",
    notes: ["ছবির প্রতিটি ডিম্বাকারে 10, 10, 1: একটি পেনসিলের দাম 21 টাকা। 10টি পেনসিলের দাম 21 × 10, আরও 3টির দাম 21 × 3।"],
  });
  note("p.57 (Work It Out): the whole page is a worked example (every number printed), and p.58's game “দুই অঙ্কের সংখ্যা দিয়ে গুণ করি (১)” already plays its story as 21 × 13 and its area grid as one grid round. This page's game walks the page's own steps instead: the story with the page's split as its sum (21 × 10 + 21 × 3, played ধাপ ১–৩), one oval (10 + 10 + 1 = 21), 21 × 13 = 21 × 10 + 21 × □, the place-value split (21 = 20 + □, 13 = 10 + □), the grid's four cells one by one (20 × 10, 1 × 10, 20 × 3, 1 × 3: the cell's column part × its row part, the order of 21 × 13) and the column 200 + 60 + 10 + 3.");

  // ── p.63: প্রত্যেকে কয়টি করে পাবে? round by round (12 biscuits, 3 children) ──
  // (p.64's Make Equal Groups game shares 12 on 3 plates; p.68's story game asks the story)
  mcq({
    page: 63, slug: "deal-round-by-round", title: "১২টি বিস্কুট ৩ জনকে সমানভাবে ভাগ করি",
    questions: [
      q({ prompt: "12টি বিস্কুট থেকে 3 জনের প্রত্যেককে 1টি করে দিলাম। মোট কয়টি বিস্কুট দেওয়া হলো?", options: ["3", "1", "4", "12"], answer: "3", num: 3, emoji: "🍪", why: "3 জনের প্রত্যেকে 1টি করে: 1 × 3 = 3টি বিস্কুট।" }),
      q({ prompt: "12টি বিস্কুট থেকে 3 জনের প্রত্যেককে 1টি করে দিলাম। বড়ো থালায় কয়টি বিস্কুট বাকি থাকল?", options: ["9", "11", "3", "10"], answer: "9", num: 9, emoji: "🍪", why: "3টি দেওয়া হলো: 12 − 3 = 9টি বাকি।" }),
      q({ prompt: "প্রত্যেকে 2টি করে পেলে 3 জনকে মোট কয়টি বিস্কুট দেওয়া হলো?", options: ["6", "5", "2", "8"], answer: "6", num: 6, emoji: "🍪", why: "3 জনের প্রত্যেকে 2টি করে: 2 × 3 = 6টি।" }),
      q({ prompt: "12টি বিস্কুট থেকে 3 জনের প্রত্যেকে 2টি করে পেলে কয়টি বিস্কুট বাকি থাকে?", options: ["6", "10", "4", "9"], answer: "6", num: 6, emoji: "🍪", why: "2 × 3 = 6টি দেওয়া হলো: 12 − 6 = 6টি বাকি।" }),
      q({ prompt: "12টি বিস্কুট থেকে 3 জনের প্রত্যেকে 3টি করে পেলে কয়টি বিস্কুট বাকি থাকে?", options: ["3", "9", "0", "6"], answer: "3", num: 3, emoji: "🍪", why: "3 × 3 = 9টি দেওয়া হলো: 12 − 9 = 3টি বাকি।" }),
      q({ prompt: "12টি বিস্কুট থেকে 3 জনের প্রত্যেকে 4টি করে পেলে কয়টি বিস্কুট বাকি থাকে?", options: ["0", "4", "1", "3"], answer: "0", num: 0, emoji: "🍪", why: "4 × 3 = 12টি দেওয়া হলো: সব বিস্কুট শেষ, 12 − 12 = 0।" }),
      q({ prompt: "12টি বিস্কুট আছে। যদি 3 জনকে সমানভাবে ভাগ করে দেওয়া হয়, তবে প্রত্যেকে কয়টি করে বিস্কুট পাবে?", options: ["4টি", "3টি", "9টি", "12টি"], answer: "4টি", num: 4, emoji: "🍪", why: "প্রত্যেকে 4টি করে পেলে সব বিস্কুট শেষ হয়। তাহলে প্রত্যেকে 4টি করে বিস্কুট পেল।" }),
      q({ prompt: "12টি বিস্কুট 3 জনকে সমানভাবে ভাগ করার গাণিতিক বাক্য কোনটি?", options: ["12 ÷ 3 = 4", "12 − 3 = 9", "12 + 3 = 15", "12 × 3 = 36"], answer: "12 ÷ 3 = 4", why: "এই ধরনের হিসাবকে ভাগ বলা হয়: 12 ÷ 3 = 4।" }),
      q({ prompt: "12 ÷ 3 = 4 এই ভাগে 3 কী বোঝায়?", options: ["শিশুর সংখ্যা", "মোট বিস্কুট", "প্রত্যেকের বিস্কুটের সংখ্যা"], answer: "শিশুর সংখ্যা", why: "12 হলো মোট বিস্কুট (বস্তু), 3 হলো শিশু, 4 হলো প্রত্যেকের বিস্কুটের সংখ্যা।" }),
      q({ prompt: "12 ÷ 3 = 4 এই ভাগে 4 কী বোঝায়?", options: ["শিশুর সংখ্যা", "মোট বিস্কুট", "প্রত্যেকের বিস্কুটের সংখ্যা"], answer: "প্রত্যেকের বিস্কুটের সংখ্যা", why: "12 হলো মোট বিস্কুট (বস্তু), 3 হলো শিশু, 4 হলো প্রত্যেকের বিস্কুটের সংখ্যা।" }),
      q({ prompt: "ভাগের হিসাবে কোন প্রতীকটি ব্যবহার করি?", options: ["÷", "×", "+", "−"], answer: "÷", why: "এই ধরনের হিসাবকে ভাগ বলা হয় এবং ÷ প্রতীককে ভাগ চিহ্ন বলে।" }),
    ],
    src: "p.63 কাজ ১ (12 biscuits to 3 children dealt round by round: প্রত্যেকে ১টি, ২টি, ৩টি, ৪টি করে, the biscuits given and left in each row's picture; “তাহলে প্রত্যেকে ৪টি করে বিস্কুট পেল”), the printed 12 ÷ 3 = 4 with its labels বস্তু, শিশু, বিস্কুটের সংখ্যা, and the parrot's ÷ = ভাগ চিহ্ন; my options",
  });
  note("p.63 (multiple choice): 12 ÷ 3 on plates is in “প্রত্যেকে কয়টি করে পাবে?” (p.64, Make Equal Groups) and as a story in “ভাগের গল্প” (p.68), so this page's game follows the page's four rows: the biscuits given and the biscuits left after each round (3/9, 6/6, 9/3, 12/0, as drawn), the answer ৪টি, the printed sentence 12 ÷ 3 = 4 and what 3 and 4 stand for. The book's labels are বস্তু, শিশু, বিস্কুটের সংখ্যা; the options say “মোট বিস্কুট”, “শিশুর সংখ্যা” and “প্রত্যেকের বিস্কুটের সংখ্যা” so that 12 and 4 (both numbers of biscuits) can't be confused. The last question is the parrot's sentence turned round (which sign is ভাগ চিহ্ন), as “÷ প্রতীককে কী বলে?” is already in p.71's quiz.");

  // ── p.65: ২০ ÷ ৫ ⇄ □ × ৫ = ২০, and the three অনুশীলন stories by the times table ──
  // (p.69's game has [৩]–[৪] and □ × 5 = 20 as Work It Out items; p.68's has the stories as word problems)
  mcq({
    page: 65, slug: "divide-by-times", title: "গুণ ব্যবহার করে ভাগের উত্তর বের করি",
    questions: [
      q({ prompt: "[3] যখন আমরা 5 জন শিশুকে 3টি করে কলা দিই, তখন মোট কলার সংখ্যা কোনটি?", options: ["3 × 5 = 15", "3 + 5 = 8", "5 × 5 = 25", "3 × 3 = 9"], answer: "3 × 5 = 15", emoji: "🍌", why: "5 জনের প্রত্যেককে 3টি করে: 3 × 5 = 15টি কলা।" }),
      q({ prompt: "[4] যখন আমরা 5 জন শিশুকে 4টি করে কলা দিই, তখন মোট কলার সংখ্যা কোনটি?", options: ["4 × 5 = 20", "4 + 5 = 9", "4 × 4 = 16", "5 × 5 = 25"], answer: "4 × 5 = 20", emoji: "🍌", why: "5 জনের প্রত্যেককে 4টি করে: 4 × 5 = 20টি কলা। সবগুলো কলা দেওয়া হলো।" }),
      q({ prompt: "20 ÷ 5 এর উত্তর পেতে কোন গুণের নামতা ব্যবহার করতে পারি?", options: ["5 এর গুণের নামতা", "2 এর গুণের নামতা", "3 এর গুণের নামতা", "10 এর গুণের নামতা"], answer: "5 এর গুণের নামতা", why: "20 ÷ 5 = □ ⇄ □ × 5 = 20: 5 এর গুণের নামতায় 4 × 5 = 20।" }),
      q({ prompt: "20 ÷ 5 = □ ⇄ □ × 5 = 20। খালিঘরে কোন সংখ্যা বসবে?", options: ["4", "5", "15", "100"], answer: "4", num: 4, why: "4 × 5 = 20, তাই 20 ÷ 5 = 4।" }),
      q({ prompt: "20টি কলা 5 জন শিশুকে সমানভাবে দেওয়া হলে প্রত্যেকে কয়টি করে কলা পাবে?", options: ["4টি", "5টি", "15টি", "25টি"], answer: "4টি", num: 4, emoji: "🍌", why: "4 × 5 = 20, তাই 20 ÷ 5 = 4। প্রত্যেক শিশু 4টি করে কলা পাবে।" }),
      q({ prompt: "48 ÷ 8 = □ এর উত্তর পেতে কোন গুণটি ব্যবহার করি?", options: ["□ × 8 = 48", "□ × 48 = 8", "□ + 8 = 48", "48 × 8 = □"], answer: "□ × 8 = 48", why: "ভাগের উত্তর গুণ থেকে: □ × 8 = 48। 6 × 8 = 48, তাই 48 ÷ 8 = 6।" }),
      q({ prompt: "যদি 48টি কাগজ 8 জন শিশুকে সমানভাবে ভাগ করে দেওয়া হয়, তবে প্রত্যেক শিশু কয়টি করে কাগজ পাবে?", options: ["6টি", "8টি", "7টি", "40টি"], answer: "6টি", num: 6, emoji: "📄", why: "6 × 8 = 48, তাই 48 ÷ 8 = 6। প্রত্যেক শিশু 6টি করে কাগজ পাবে।" }),
      q({ prompt: "63 ÷ 7 এর উত্তর পেতে 7 এর গুণের নামতার কোন গুণটি কাজে লাগে?", options: ["9 × 7 = 63", "7 × 7 = 49", "8 × 7 = 56", "10 × 7 = 70"], answer: "9 × 7 = 63", why: "□ × 7 = 63: 9 × 7 = 63, তাই 63 ÷ 7 = 9।" }),
      q({ prompt: "বাবার কাছে 63 টাকা আছে। তিনি এই টাকা তাঁর পরিবারের 7 জনকে সমানভাবে দিতে চান। প্রত্যেকে কত টাকা করে পাবে?", options: ["9 টাকা", "7 টাকা", "8 টাকা", "56 টাকা"], answer: "9 টাকা", num: 9, why: "9 × 7 = 63, তাই 63 ÷ 7 = 9। প্রত্যেকে 9 টাকা করে পাবে।" }),
      q({ prompt: "1 হালি ডিমের দাম 48 টাকা হলে 1টি ডিমের দাম কত? [1 হালি = 4টি]", options: ["12 টাকা", "4 টাকা", "44 টাকা", "11 টাকা"], answer: "12 টাকা", num: 12, emoji: "🥚", why: "□ × 4 = 48: 12 × 4 = 48, তাই 48 ÷ 4 = 12। 1টি ডিমের দাম 12 টাকা।" }),
    ],
    src: "p.65 মূল প্রশ্ন ([৩] 3 × 5 = 15, [৪] 4 × 5 = 20, “২০ ÷ ৫ এর উত্তর পেতে আমরা ৫ এর গুণের নামতা ব্যবহার করতে পারি”, ২০ ÷ ৫ = □ ⇄ □ × ৫ = ২০, printed “প্রত্যেক শিশু ৪টি করে কলা পাবে”), অনুশীলন ১–৩ (48 ÷ 8, 63 ÷ 7, 48 ÷ 4), each with its × fact; my options",
  });
  note("p.65 (multiple choice): [৩]–[৪] and □ × 5 = 20 are Work It Out items in “গুণের নামতা ব্যবহার করে ভাগ করি” (p.69), the three অনুশীলন stories word problems in “ভাগের গল্প” (p.68) and 20 ÷ 5 on plates in p.64's game, so this page's game asks the page's method as choices: which × sentence the dots show, which table, the ⇄ box, and each অনুশীলন story both ways (the × fact that answers it, then the answer). অনুশীলন ৩ (48 ÷ 4 = 12) goes past the 10 × 10 table: its why uses 12 × 4 = 48 (the 12 table, p.47).");

  // ── p.66: কতজনকে দেওয়া যাবে? 3 biscuits at a time (repeated subtraction, as the page's dashed circles show) ──
  // (p.67's Make Equal Groups game puts 12 in threes on plates; p.68's story game asks the story; p.69's has □ × 3 = 12)
  wio({
    page: 66, slug: "three-at-a-time", title: "১২টি বিস্কুট, প্রত্যেককে ৩টি করে",
    items: [
      story("12টি বিস্কুট আছে। একজন শিশুকে 3টি বিস্কুট দিলাম। বড়ো থালায় কয়টি বিস্কুট বাকি থাকল?", "12 − 3", "টি", 9), // row 1: 9 drawn, 3 dashed
      story("12টি বিস্কুট থেকে 2 জন শিশুকে 3টি করে দিলাম। বড়ো থালায় কয়টি বিস্কুট বাকি থাকল?", "12 − 2 × 3", "টি", 6), // row 2: 6 drawn
      story("12টি বিস্কুট থেকে 3 জন শিশুকে 3টি করে দিলাম। বড়ো থালায় কয়টি বিস্কুট বাকি থাকল?", "12 − 3 × 3", "টি", 3), // row 3: 3 drawn
      story("12টি বিস্কুট থেকে 4 জন শিশুকে 3টি করে দিলাম। বড়ো থালায় কয়টি বিস্কুট বাকি থাকল?", "12 − 4 × 3", "টি", 0), // row 4: all dashed
      it({ kind: "pattern", terms: [12, 9, 6, null, null] }, [3, 0]), // the big plate, row by row
      box("12 − 3 − 3 − 3 − 3 = □", 0), // 3 taken away four times: none left
      box("3 + 3 + 3 + 3 = □", 12), // row 4: four plates of 3
      story("বড়ো থালায় 9টি বিস্কুট বাকি আছে। প্রত্যেক শিশুকে 3টি করে দিলে আর কতজন শিশুকে দেওয়া যাবে?", "9 ÷ 3", "জন", 3), // after row 1
      story("বড়ো থালায় 6টি বিস্কুট বাকি আছে। প্রত্যেক শিশুকে 3টি করে দিলে আর কতজন শিশুকে দেওয়া যাবে?", "6 ÷ 3", "জন", 2), // after row 2
      story("5 জন শিশু আছে। 12টি বিস্কুট থেকে প্রত্যেক শিশুকে 3টি করে দিলে কতজন শিশু বিস্কুট পাবে না?", "5 − 12 ÷ 3", "জন", 1), // row 4: the fifth plate stays empty
    ],
    src: "p.66 কাজ ১ (12 biscuits, 3 to a child, 5 children with plates): the four rows' pictures (biscuits left on the big plate 9, 6, 3, 0; plates filled 1, 2, 3, 4; the fifth plate empty in the last row), as stories and sums of mine",
    notes: ["প্রতিবার একজন শিশুকে 3টি বিস্কুট দিই: বড়ো থালা থেকে 3টি করে কমে। 4 বার দেওয়ার পর থালায় কিছু থাকে না, তাই 4 জন শিশু বিস্কুট পায়।"],
  });
  note("p.66 (Work It Out): the page's one question (12 biscuits, 3 each: 4 children) is on plates in “কতজনকে দেওয়া যাবে?” (p.67, Make Equal Groups) and a story in “ভাগের গল্প” (p.68), and □ × 3 = 12 is in p.69's game. This page's game plays what its four rows draw: 3 biscuits leave the big plate each time (the dashed circles), so the stories and sums are mine, with the answers counted in the picture (left 9, 6, 3, 0; the fifth child of the five gets none). Items 2–4 and 10 are two-step stories (12 − 2 × 3: ধাপ ১ 2 × 3, ধাপ ২ 12 − 6; 5 − 12 ÷ 3), written in p.67's order “২ জনকে ২ × ৩ = ৬টি”.");

  // ── p.70: the two kinds of ভাগ, sorted (p.71's quiz asks (ক) and (খ) as choices) ──
  sort({
    page: 70, slug: "two-kinds", title: "দুই ধরনের ভাগ: গল্পগুলো সাজাই",
    categories: ["প্রত্যেকে কয়টি করে পাবে?", "কতজনকে দেওয়া যাবে?"],
    items: [
      ["15টি বিস্কুট 3 জন শিশুর মধ্যে সমানভাবে ভাগ করব।", 0], // p.70 (ক)
      ["15টি বিস্কুট বিতরণ করব, যেন প্রত্যেক শিশু 3টি করে পায়।", 1], // p.70 (খ)
      ["12টি বিস্কুট 3 জনকে সমানভাবে ভাগ করে দেওয়া হলো।", 0], // p.63 কাজ ১
      ["12টি বিস্কুট থেকে একজন শিশু 3টি করে বিস্কুট পায়।", 1], // p.66 কাজ ১
      ["18টি চকলেট 6 জন শিশুকে সমানভাবে দেওয়া হলো।", 0], // p.64 কাজ ৩
      ["18টি চকলেট থেকে প্রত্যেক শিশুকে 6টি করে চকলেট দিই।", 1], // p.67 কাজ ২
      ["20টি কলা 5 জন শিশুকে সমানভাবে দেওয়া হলো।", 0], // p.65 মূল প্রশ্ন
      ["20টি কলা থেকে প্রত্যেক শিশুকে 5টি করে কলা দিই।", 1], // p.68 মূল প্রশ্ন
      ["48টি কাগজ 8 জন শিশুকে সমানভাবে ভাগ করে দেওয়া হলো।", 0], // p.65 অনুশীলন ১
      ["32টি লিচু থেকে প্রত্যেক শিশু 8টি করে লিচু পেল।", 1], // p.68 কাজ ১
      ["বাবা 63 টাকা পরিবারের 7 জনকে সমানভাবে দিতে চান।", 0], // p.65 অনুশীলন ২
      ["45টি খাতা থেকে প্রত্যেক শিক্ষার্থীকে 5টি করে খাতা দেওয়া হলো।", 1], // p.68 কাজ ২
    ],
    src: "p.70 মূল প্রশ্ন (the parrot's two kinds of ভাগ as the two groups; (ক) and (খ), both 15 ÷ 3), and the chapter's stories of each kind: p.63 কাজ ১, p.64 কাজ ৩, p.65 মূল প্রশ্ন and অনুশীলন ১–২ (প্রত্যেকে কয়টি করে পাবে?); p.66 কাজ ১, p.67 কাজ ২, p.68 মূল প্রশ্ন and কাজ ১–২ (কতজনকে দেওয়া যাবে?), shortened to cards",
  });
  note("p.70 (Categorize): the parrot's two kinds of ভাগ (“প্রত্যেকে কয়টি করে পাবে?”, “কতজনকে দেওয়া যাবে?”) are the two groups, as the survey suggests; p.71's quiz already asks (ক) and (খ) as choices. The 12 cards are this page's two 15 ÷ 3 stories and the chapter's own stories (pp.63–68), shortened to fit a card (at most 80 characters) and without their question, so the child decides which question each one asks; four pairs share their numbers (15 and 3, 12 and 3, 18 and 6, 20 and 5) so only the kind tells them apart.");
};
