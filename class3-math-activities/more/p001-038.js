// pp.1–38 (অধ্যায় ১–৪): a game for each page the fraction and rest files left without one (3 Nov 2026): p.1 (শতের দল),
// p.3 (টিকিট: অযুত), p.5 (কার্ড গুনি), p.7 (ফুটবলের টিকিট ও সারণি), p.10 (কোন স্থানের অঙ্ক তুলনা করি), p.28 (খালিঘর:
// যোগফল ১০০০০০), p.32 (ধাপে ধাপে বিয়োগ), p.38 (যোগ করব, না বিয়োগ করব). Each page's own exercises are already items in a
// neighbouring game (README-rest.md's "From" column), so these practise the page another way: a match, a sort, the
// page's worked example step by step, or its template with one box.
module.exports = (L) => {
  const { it, wio, q, mcq, match, sort, note } = L;
  const word = (text, sum, unit) => (unit ? { kind: "word", text, sum, unit } : { kind: "word", text, sum });
  const parts = (n) => it({ kind: "place", n, ask: "parts" }, String(n).split("").map(Number));
  const miss = (text, want) => it({ kind: "missing", text }, want);
  // the p.28 challenge: a number and its partner that make 100000 (a whole number in one box: the server reads a run of
  // boxes "□□□□□" as one box, so a missing-digit grid can't box a whole number)
  const to100000 = (a, b, want) => miss(`${a} + ${b} = 100000`, want);

  // ── p.1: ১১টি ১০০ (the chapter opener) ──
  match({
    page: 1, slug: "hundreds-count", title: "শতের দল গুনি · মিল করি",
    pairs: [
      ["11টি 100, 2টি 10, 1টি 1", 1121], // p.1 the blocks (printed ১১২১)
      ["10টি 100", 1000], // p.1 “১০টি ১০০ তে ১০০০ হয়” (printed)
      ["11টি 100", 1100], // p.1 the brace “১১টি ১০০”
      ["9টি 100, 2টি 10, 5টি 1", 925], // p.2 অনুশীলন ১ (the left box)
      ["24টি 100, 5টি 10, 5টি 1", 2455], // p.18 নিজে করি ১ (two stacks of ten flats, 4 flats, 5 rods, 5 cubes)
      ["39 শত", 3900], ["122 শত", 12200], ["29 শত", 2900], ["910 শত", 91000], // p.20 নিজে করি ৬ (১)–(৪)
      ["10টি 1000", 10000], // p.4 অনুশীলন ১
    ],
    src: "p.1 মূল প্রশ্ন (১১টি ১০০, ২টি ১০, ১টি ১: ১১২১ printed; “১০টি ১০০ তে ১০০০ হয়” printed); the chapter's other block and শত counts: p.2 অনুশীলন ১ (৯২৫), p.18 নিজে করি ১ (২৪৫৫), p.20 নিজে করি ৬ (১)–(৪) (৩৯ শত, ১২২ শত, ২৯০০, ৯১০০০), p.4 অনুশীলন ১ (১০টি ১০০০)",
  });

  // ── p.3: the cricket tickets (অযুত) ──
  wio({
    page: 3, slug: "tickets-ajut", title: "টিকিট গুনি: অযুত ও হাজার",
    askOperation: false,
    items: [
      it(word("ক্রিকেট ম্যাচের টিকিট বিক্রি করা হবে। একটি বড় বাক্সে 1000 টিকিটের প্যাকেটগুলো 5 সারিতে সাজানো, প্রতি সারিতে 2টি। বাক্সের ভেতর কতগুলো প্যাকেট আছে?", "5 × 2", "টি"), 10),
      it(word("প্রতিটি বড় বাক্সে 1000 এর 10টি করে প্যাকেট আছে। একটি বাক্সে কতটি টিকিট আছে?", "1000 × 10", "টি"), 10000),
      it(word("প্রতিটি বড় বাক্সে 10000টি টিকিট আছে। ছবিতে এরকম 2টি বাক্স আছে। এই 2টি বাক্সে একত্রে কতটি টিকিট আছে?", "10000 + 10000", "টি"), 20000),
      it(word("এক অযুত অর্থ হলো 10 হাজার। 2টি বাক্সে 2 অযুত টিকিট আছে। 2 অযুত = কত হাজার?", "2 × 10", "হাজার"), 20),
      it(word("2টি বাক্সে একত্রে 20000টি টিকিট আছে। ছবিতে আরও 3 হাজার এবং 425টি টিকিট আছে। সর্বমোট কতটি টিকিট আছে?", "20000 + 3000 + 425", "টি"), 23425),
      parts(23425), // the table অযুত / হাজার / শতক / দশক / একক = 2 / 3 / 4 / 2 / 5
    ],
    fresh: { skill: "place", digits: 5 },
    src: "p.3 মূল প্রশ্ন (১) (১০টি প্যাকেট, the box's 2 × 5 packets), the text (১০০০ এর ১০টি প্যাকেট = ১০০০০, ২টি বাক্সে ২০ হাজার, both printed), the box “এক অযুত অর্থ হলো ১০ হাজার”, (২) (৩ হাজার এবং ৪২৫: ২৩৪২৫ printed) and its table",
  });

  // ── p.5: counting the scattered cards ──
  match({
    page: 5, slug: "cards-count", title: "কার্ড গুনে সংখ্যা লিখি · মিল করি",
    pairs: [
      ["1টি 10000, 3টি 1000, 4টি 100, 5টি 10, 5টি 1", 13455], // p.5 অনুশীলন ২, left box
      ["4টি 1000, 4টি 100, 4টি 10, 4টি 1", 4444], // p.5 অনুশীলন ২, right box
      ["1টি 10000, 3টি 1000, 4টি 100, 2টি 10, 5টি 1", 13425], // p.5 অনুশীলন ৩
      ["1টি 10000, 3টি 1000, 4টি 100, 5টি 10, 7টি 1", 13457], // p.8 অনুশীলন ২ (১৩৪৫৭), close to ১৩৪৫৫
      ["2টি 10000, 3টি 1000, 4টি 100, 2টি 10, 5টি 1", 23425], // p.3 the table
      ["3টি 10000, 4টি 1000, 3টি 10, 4টি 1", 34034], // p.6 অনুশীলন ৪ (no 100 card)
      ["2টি 10000, 3টি 1000, 5টি 100, 5টি 10, 4টি 1", 23554], // p.6 অনুশীলন ৫
      ["6টি 10000, 8টি 1000, 5টি 1", 68005], // p.8 অনুশীলন ২ (৬৮০০৫)
      ["2টি 1000, 3টি 100, 5টি 10, 4টি 1", 2354], // p.2 কাজ ১
      ["8টি 1000, 4টি 100, 4টি 10, 8টি 1", 8448], // p.2 অনুশীলন ২
    ],
    src: "p.5 অনুশীলন ২ (both boxes: ১৩৪৫৫, ৪৪৪৪) and ৩ (১৩৪২৫), the cards counted; the chapter's other card tables: p.3 (২৩৪২৫), p.6 অনুশীলন ৪–৫ (৩৪০৩৪, ২৩৫৫৪), p.8 অনুশীলন ২ (১৩৪৫৭, ৬৮০০৫), p.2 কাজ ১ (২৩৫৪) and অনুশীলন ২ (৮৪৪৮)",
  });

  // ── p.7: the football tickets and the empty table ──
  mcq({
    page: 7, slug: "tickets-table", title: "ফুটবল খেলার টিকিট গুনি ও সারণিতে লিখি",
    questions: [
      q({ prompt: "উপরের সারির প্রতিটি বাক্সে 1000 এর 10টি করে প্যাকেট আছে। একটি বাক্সে কতটি টিকিট আছে?", options: ["1000", "10000", "100000", "1010"], answer: "10000", num: 10000, why: "10টি 1000 = 10000। টিকিটের পরিমাণ দশ হাজার এবং একে লেখা হয় 10000।" }),
      q({ prompt: "10000 সংখ্যাটি আমরা কীভাবে পড়ি?", options: ["দশ হাজার", "এক হাজার", "এক শত", "এক লক্ষ"], answer: "দশ হাজার", why: "10টি 1000 = 10000: দশ হাজার। এক অযুত অর্থ হলো 10 হাজার।" }),
      q({ prompt: "ছবিতে এরকম 8টি বাক্স আছে, প্রতিটিতে 10000টি টিকিট। 8টি বাক্সে একত্রে কতটি টিকিট আছে?", options: ["8000", "80000", "800000", "18000"], answer: "80000", num: 80000, why: "8টি 10000 = 80000। এই 8টি বাক্সে একত্রে আশি হাজার টিকিট আছে।" }),
      q({ prompt: "80000 সংখ্যাটি কথায় কী?", options: ["আট হাজার", "আশি হাজার", "আট লক্ষ", "আটাশি হাজার"], answer: "আশি হাজার", why: "80000 = 80 হাজার: আশি হাজার।" }),
      q({ prompt: "8টি বাক্সে 80000টি টিকিট। 80000 = কত অযুত?", options: ["8 অযুত", "80 অযুত", "1 অযুত", "800 অযুত"], answer: "8 অযুত", num: 8, why: "প্রতিটি বাক্সে 10000 = 1 অযুত। 8টি বাক্সে 8 অযুত।" }),
      q({ prompt: "টিকিটগুলো সারণিতে লিখি। 10000 টিকিটের বাক্সগুলো সারণির কোন ঘরে লিখব?", options: ["অযুত", "হাজার", "শতক", "একক"], answer: "অযুত", why: "10000 = 1 অযুত। 8টি বাক্স: অযুতের ঘরে 8।" }),
      q({ prompt: "1000 টিকিটের প্যাকেটগুলো সারণির কোন ঘরে লিখব?", options: ["অযুত", "হাজার", "শতক", "দশক"], answer: "হাজার", why: "প্রতিটি প্যাকেটে 1000টি টিকিট: 1000 = 1 হাজার, তাই হাজারের ঘরে।" }),
      q({ prompt: "100 টিকিটের প্যাকেটগুলো সারণির কোন ঘরে লিখব?", options: ["হাজার", "শতক", "দশক", "একক"], answer: "শতক", why: "প্রতিটি প্যাকেটে 100টি টিকিট: 100 = 1 শত, তাই শতকের ঘরে।" }),
      q({ prompt: "একটি একটি করে রাখা টিকিটগুলো সারণির কোন ঘরে লিখব?", options: ["অযুত", "শতক", "দশক", "একক"], answer: "একক", why: "প্রতিটিতে 1টি টিকিট, তাই এককের ঘরে।" }),
      q({ prompt: "সারণিতে অযুত 8, হাজার 3, শতক 4, দশক 7, একক 3। টিকিট কতটি?", options: ["83473", "8347", "38437", "80000"], answer: "83473", num: 83473, why: "80000 + 3000 + 400 + 70 + 3 = 83473। আমরা সংখ্যাটি পড়ি তিরাশি হাজার চার শত তিয়াত্তর।" }),
    ],
    src: "p.7 মূল প্রশ্ন: the text (১০০০ এর ১০টি প্যাকেট = ১০০০০, “দশ হাজার”, ৮টি বাক্সে “আশি হাজার”, all printed), the empty table অযুত / হাজার / শতক / দশক / একক (which packet in which column); the number as p.8 prints it (৮৩৪৭৩, তিরাশি হাজার চার শত তিয়াত্তর)",
  });

  // ── p.10: সংখ্যার তুলনা (which place decides) ──
  const PLACES5 = ["অযুত", "হাজার", "শতক", "দশক", "একক"];
  const four = (right, skip) => PLACES5.filter((p) => p !== skip || p === right);
  const firstDiff = (a, b, right, skip, why) => q({ prompt: `${a} ও ${b} তুলনা করি। বাম দিক থেকে কোন স্থানে প্রথম আলাদা অঙ্ক পাই?`, options: String(a).length === 4 ? PLACES5.slice(1) : four(right, skip), answer: right, why });
  mcq({
    page: 10, slug: "which-place", title: "সংখ্যার তুলনা: কোন স্থানের অঙ্ক দেখব?",
    questions: [
      q({ prompt: "1215 ও 1125 এর মধ্যে কোন সংখ্যাটি ছোটো, তা বের করতে প্রথমে কোন দলের তুলনা করি?", options: ["হাজারের দল", "শত এর দল", "দশের দল", "একের দল"], answer: "হাজারের দল", why: "বড়ো দল থেকে শুরু করি: চলো, আমরা হাজারের দল তুলনা করি। দুইটিতেই হাজারের দল 1টি।" }),
      q({ prompt: "1215 ও 1125: হাজারের দল একই। এরপর কোন দলের তুলনা করব?", options: ["শত এর দল", "দশের দল", "একের দল", "হাজারের দল"], answer: "শত এর দল", why: "হাজারের দল একই। তাই আমরা সংখ্যা দুইটিতে শত এর দল তুলনা করব।" }),
      q({ prompt: "1215 সংখ্যাটিতে শত এর দল কয়টি?", options: ["1টি", "2টি", "5টি", "12টি"], answer: "2টি", num: 2, why: "1215 = 1 হাজার, 2 শত, 1 দশ ও 5 এক। 1215 সংখ্যাটিতে শত এর দল 2টি।" }),
      q({ prompt: "1125 সংখ্যাটিতে শত এর দল কয়টি?", options: ["1টি", "2টি", "5টি", "11টি"], answer: "1টি", num: 1, why: "1125 = 1 হাজার, 1 শত, 2 দশ ও 5 এক। শত এর দল 1টি, তাই 1125 সংখ্যাটি ছোটো।" }),
      q({ prompt: "পাঁচ অঙ্কের দুইটি সংখ্যা তুলনা করতে প্রথমে কোন স্থানের অঙ্ক তুলনা করব?", options: ["অযুত", "হাজার", "দশক", "একক"], answer: "অযুত", why: "বড়ো স্থানীয় মান থেকে ছোটো স্থানীয় মান: প্রথমে অযুত, এরপর হাজার, শতক, দশক এবং সবশেষে একক।" }),
      q({ prompt: "অযুতের স্থানের অঙ্ক একই হলে এরপর কোন স্থানের অঙ্ক তুলনা করব?", options: ["হাজার", "শতক", "দশক", "একক"], answer: "হাজার", why: "প্রথমে অযুতের স্থান, এরপর হাজারের স্থান, এরপর শতকের স্থান, এরপর দশকের স্থান এবং সবশেষে এককের স্থান।" }),
      q({ prompt: "32740 এবং 32940 তুলনা করি। কোন স্থানের অঙ্ক দেখে বুঝব কোনটি বড়ো?", options: ["অযুত", "হাজার", "শতক", "দশক"], answer: "শতক", why: "অযুত এবং হাজারের স্থানের অঙ্ক একই, 3 ও 2। শতকে 7 থেকে 9 বড়ো, তাই 32740 থেকে 32940 বড়ো।" }),
      firstDiff(32370, 32320, "দশক", "অযুত", "অযুত, হাজার ও শতকের অঙ্ক একই (3, 2, 3)। দশকে 7 > 2, তাই 32370 > 32320।"),
      firstDiff(43680, 45400, "হাজার", "একক", "অযুতে দুইটিতেই 4। হাজারে 3 < 5, তাই 43680 < 45400।"),
      firstDiff(79980, 69988, "অযুত", "দশক", "অযুতে 7 > 6, তাই 79980 > 69988। পরের অঙ্কগুলো দেখতে হয় না।"),
      firstDiff(42586, 42585, "একক", "অযুত", "অযুত, হাজার, শতক ও দশকের অঙ্ক একই (4, 2, 5, 8)। এককে 6 > 5, তাই 42586 > 42585।"),
      firstDiff(9469, 9496, "দশক", null, "হাজার ও শতকের অঙ্ক একই (9, 4)। দশকে 6 < 9, তাই 9469 < 9496।"),
      firstDiff(13777, 13666, "শতক", "একক", "অযুত ও হাজারের অঙ্ক একই (1, 3)। শতকে 7 > 6, তাই 13777 > 13666।"),
    ],
    src: "p.10 মূল প্রশ্ন (১২১৫ ও ১১২৫: “হাজারের দল তুলনা করি”, “শত এর দল ২টি … ১টি”, printed), অনুশীলন ১ (৩২৭৪০ এবং ৩২৯৪০, the boy's order অযুত → হাজার → শতক → দশক → একক; “৭ থেকে ৯ বড়ো” printed on p.11); then which place decides for the p.11 box (৩২৩৭০ > ৩২৩২০, ৪৩৬৮০ < ৪৫৪০০) and p.11 অনুশীলন ২ (৭), (৩), (৪), অনুশীলন ৩ (৪২৫৮৬, ৪২৫৮৫)",
  });

  // ── p.28: অনুশীলন ৫ (১) with one box, and the চ্যালেঞ্জ (যোগফল ১০০০০০) ──
  wio({
    page: 28, slug: "make-100000", title: "খালিঘর পূরণ করি: যোগফল ১০০০০০",
    items: [
      miss("3845 + 1500 + □ = 6045", 700), miss("3845 + □ + 700 = 6045", 1500), miss("□ + 1500 + 700 = 6045", 3845), // অনুশীলন ৫ (১), printed
      to100000(39980, "□", 60020), // অনুশীলন ৬, the printed example 39980 + 60020
      to100000(99999, "□", 1), // p.27 অনুশীলন ১ (৮) 99999 + 1
      to100000(111, "□", 99889), // p.30 নিজে করি ৩ (৯) 111 + 99889
      to100000(81111, "□", 18889), // p.40 নিজে করি ২ (৭) 81111 + 18889
      to100000("□", 11111, 88889), // p.34 অনুশীলন ৬ (৬) 100000 − 11111 = 88889
      to100000(9, "□", 99991), // p.40 নিজে করি ২ (১৫) 100000 − 9 = 99991
      to100000(88755, "□", 11245), // p.36 নিজে করি ১১ 100000 − 88755 = 11245
    ],
    src: "p.28 অনুশীলন ৫ (১) ৩৮৪৫ + ১৫০০ + ৭০০ → ৬০৪৫ (printed), each number a box in turn; অনুশীলন ৬ (চ্যালেঞ্জ) the printed ৩৯৯৮০ + ৬০০২০ = ১০০০০০ as ৩৯৯৮০ + □ = ১০০০০০, then the book's other sums that make ১০০০০০: p.27 অনুশীলন ১ (৮), p.30 নিজে করি ৩ (৯), p.40 নিজে করি ২ (৭), p.34 অনুশীলন ৬ (৬), p.40 নিজে করি ২ (১৫), p.36 নিজে করি ১১",
  });

  // ── p.32: কাজ ১ and কাজ ২, step by step ──
  const STEPS_1 = ["4 − 2 = 2", "6 − 1 = 5", "7 − 4 = 3", "8 − 3 = 5"]; // কাজ ১'s four frames
  const STEPS_2 = ["8 − 5 = 3", "14 − 8 = 6", "12 − 6 = 6", "4 − 3 = 1"]; // কাজ ২'s four frames
  mcq({
    page: 32, slug: "sub-steps", title: "ধাপে ধাপে বিয়োগ করি",
    questions: [
      q({ prompt: "8764 − 3412 = □। একক স্থানে কোন বিয়োগটি করি?", options: STEPS_1, answer: "4 − 2 = 2", why: "একক স্থানের অঙ্ক 4 ও 2। একক স্থান: 4 − 2 = 2" }),
      q({ prompt: "8764 − 3412 = □। দশক স্থানে কোন বিয়োগটি করি?", options: STEPS_1, answer: "6 − 1 = 5", why: "দশক স্থানের অঙ্ক 6 ও 1। দশক স্থান: 6 − 1 = 5" }),
      q({ prompt: "8764 − 3412 = □। শতক স্থানে কোন বিয়োগটি করি?", options: STEPS_1, answer: "7 − 4 = 3", why: "শতক স্থানের অঙ্ক 7 ও 4। শতক স্থান: 7 − 4 = 3" }),
      q({ prompt: "8764 − 3412 = □। হাজার স্থানে কোন বিয়োগটি করি?", options: STEPS_1, answer: "8 − 3 = 5", why: "হাজার স্থান: 8 − 3 = 5। তাই 8764 − 3412 = 5352" }),
      q({ prompt: "8764 − 3412 = 5352। নিচের কোনটি সঠিক?", options: ["8764 বিয়োজন, 3412 বিয়োজ্য", "8764 বিয়োজ্য, 3412 বিয়োজন", "3412 বিয়োজন, 5352 বিয়োজ্য", "5352 বিয়োজন, 8764 বিয়োগফল"], answer: "8764 বিয়োজন, 3412 বিয়োজ্য", why: "যে সংখ্যাটি থেকে বিয়োগ করা হয় তা বিয়োজন (8764) এবং যে সংখ্যাটি বিয়োগ করা হয় তা বিয়োজ্য (3412)। 5352 বিয়োগফল।" }),
      q({ prompt: "5348 − 3685 = □। একক স্থানে কোন বিয়োগটি করি?", options: STEPS_2, answer: "8 − 5 = 3", why: "একক স্থানের অঙ্ক 8 ও 5। 8 থেকে 5 বিয়োগ করা যায়: 8 − 5 = 3" }),
      q({ prompt: "5348 − 3685: দশক স্থানে 4 থেকে 8 বিয়োগ করা যায় না। শতক থেকে 1 শত (10টি দশ) দশকের ঘরে আনি। দশকের ঘরে এখন কতটি দশ?", options: ["14", "12", "4", "10"], answer: "14", num: 14, why: "4 + 10 = 14। দশক স্থান: 14 − 8 = 6" }),
      q({ prompt: "5348 − 3685: শতক থেকে 1 শত দশকের ঘরে আনার পর শতকের 3 এর জায়গায় কত লিখি?", options: ["2", "3", "4", "13"], answer: "2", num: 2, why: "3 থেকে 1 নিলে থাকে 2। শতকের 3 কেটে উপরে ছোটো করে 2 লিখি।" }),
      q({ prompt: "5348 − 3685: শতকে 2 থেকে 6 বিয়োগ করা যায় না। হাজার থেকে 1 হাজার (10টি শত) শতকের ঘরে আনি। শতক স্থানে কোন বিয়োগটি করি?", options: STEPS_2, answer: "12 − 6 = 6", why: "2 + 10 = 12। শতক স্থান: 12 − 6 = 6। হাজারের 5 কেটে উপরে 4 লিখি।" }),
      q({ prompt: "5348 − 3685: হাজার থেকে 1 শতকে আনা হয়েছে। হাজার স্থানে কোন বিয়োগটি করি?", options: ["4 − 3 = 1", "5 − 3 = 2", "12 − 6 = 6", "8 − 5 = 3"], answer: "4 − 3 = 1", why: "হাজারের 5 থেকে 1 নেওয়া হয়েছে, তাই থাকে 4। হাজার স্থান: 4 − 3 = 1" }),
      q({ prompt: "রেজার কাছে 5348 টাকা আছে। হিয়ার কাছে 3685 টাকা আছে। হিয়ার থেকে রেজার কত টাকা বেশি আছে?", options: ["1663 টাকা", "2343 টাকা", "1763 টাকা", "9033 টাকা"], answer: "1663 টাকা", num: 1663, why: "5348 − 3685 = 1663। ধাপগুলো: 8 − 5 = 3, 14 − 8 = 6, 12 − 6 = 6, 4 − 3 = 1" }),
    ],
    src: "p.32 কাজ ১ ৮৭৬৪ − ৩৪১২ (its four frames ৪ − ২ = ২ … ৮ − ৩ = ৫, the labels বিয়োজন / বিয়োজ্য / বিয়োগফল, all printed), কাজ ২ ৫৩৪৮ − ৩৬৮৫ (its four frames ৮ − ৫ = ৩, ১৪ − ৮ = ৬, ১২ − ৬ = ৬, ৪ − ৩ = ১ and the borrow marks ২ ১০, ৪; printed ১৬৬৩)",
  });

  // ── p.38: “যাত্রী নেমে যাওয়ায়” বিয়োগ, “যাত্রী ওঠায়” যোগ ──
  sort({
    page: 38, slug: "add-or-sub", title: "যোগ করব, না বিয়োগ করব?",
    categories: ["যোগ করতে হবে (+)", "বিয়োগ করতে হবে (−)"],
    items: [
      ["ট্রেন থেকে 865 জন যাত্রী নেমে গেল", 1], // p.38 কাজ ১
      ["ট্রেনে 730 জন নতুন যাত্রী উঠল", 0], // p.38 কাজ ১
      ["বিদ্যালয়ে 125 জন নতুন শিক্ষার্থী ভর্তি হলো", 0], // p.38 কাজ ২
      ["93 জন শিক্ষার্থী অন্য বিদ্যালয়ে চলে গেল", 1], // p.38 কাজ ২
      ["রেজার বাবা তাকে আরো 48টি মার্বেল দিলেন", 0], // p.39 অনুশীলন ২
      ["খেলতে গিয়ে রেজার 17টি মার্বেল হারিয়ে গেল", 1], // p.39 অনুশীলন ২
      ["লিমুর মা তাকে আরো 10টি কলম দিলেন", 0], // p.39 অনুশীলন ৩ (ক)
      ["রাজু তার বোনকে 5টি বেলুন দিয়ে দিলো", 1], // p.39 অনুশীলন ৩ (খ)
      ["নার্সারি থেকে 532টি চারা বিক্রি করা হলো", 1], // p.41 নিজে করি ৭
      ["নার্সারিতে আরও 420টি নতুন চারা আনা হলো", 0], // p.41 নিজে করি ৭
      ["রাজীবের মা রাজীবের বাবার কাছ থেকে আরো 3420 টাকা নিলেন", 0], // p.41 নিজে করি ১২
      ["রাজীবের মা কেনাকাটায় 7830 টাকা ব্যয় করলেন", 1], // p.41 নিজে করি ১২
      ["1000টি লিচুর মধ্যে 26টি লিচু পচে গেল", 1], // p.33 কাজ ৩
      ["ফাতেমার বাবা তাকে ঈদে 1500 টাকা দিলেন", 0], // p.28 অনুশীলন ৫ (১)
    ],
    src: "p.38 কাজ ১ (“যাত্রী নেমে যাওয়ায় বিয়োগ … যাত্রী ওঠায় যোগ”) and কাজ ২ (“নতুন শিক্ষার্থী ভর্তি যোগ … অন্য বিদ্যালয়ে চলে যাওয়া বিয়োগ”), the children's bubbles; then the same choice in the chapters' other stories: p.39 অনুশীলন ২ and ৩ (ক), (খ), p.41 নিজে করি ৭ and ১২, p.33 কাজ ৩, p.28 অনুশীলন ৫ (১)",
  });

  // ── the choices made ──
  note("**p.1–p.38, eight pages without a game (3 Nov):** each page's own exercises were already items in a neighbouring game of the rest file (README-rest.md, “From”), so these games practise the page another way: p.1 and p.5 as matches (blocks / cards ↔ the number), p.7, p.10 and p.32 as multiple choice walking through the page's worked example, p.38 as a sort, p.3 and p.28 as Work It Out with items of a kind the neighbour doesn't use (the page's ticket count as stories; its template and its ১০০০০০ challenge with one box). Where a page alone has fewer than 10 questions, the chapter's own printed numbers fill it, as in the rest file.");
  note("**p.7/p.8 slip:** the p.7 picture adds up to 83703 (8 boxes, a bundle of 3 thousands, 4 + 3 packets of ১০০, no ১০, 3 singles; checked at 300 dpi), but p.8 prints the answer ৮৩৪৭৩ (তিরাশি হাজার চার শত তিয়াত্তর); the redesign keeps it as printed. The p.7 quiz never counts the small packets: it asks the printed text (১০০০০ a box, ৮টি বাক্সে আশি হাজার), which column each kind of packet goes in, and the last question gives the table's digits (8, 3, 4, 7, 3) and asks the number, the p.8 answer. The rest file's p.6 game also uses ৮৩৪৭৩ for p.7.");
  note("**p.1 match:** “১১টি ১০০” → ১১০০ is read off the page's brace (not printed as a number). The p.20 নিজে করি ৬ counts keep the book's wording “৩৯ শত” (the p.1 pairs say “১১টি ১০০”), so the child sees both ways of saying it. p.1's printed words “এক হাজার একশত একুশ” are not used (the lib spells “এক শত”, as the rest of the chapter prints it).");
  note("**p.3 stories** are played without the sign step (`askOperation: false`), like the rest file's p.20 game: the child types the number, the sum (৫ × ২, ১০০০ × ১০, ১০০০০ + ১০০০০, ২ × ১০, ২০০০০ + ৩০০০ + ৪২৫) shows only as the hint (× comes before chapter ৫ here). (১) “বাক্সের ভেতর কতগুলো প্যাকেট আছে?” is asked with the box described in words (5 rows of 2 packets, as drawn; the survey's answer 10); “ছবিতে” is kept from the book's text. The last item is the page's table as places; 5 fresh 5-digit place-value problems follow.");
  note("**p.5 match:** the left side gives each box's card counts (the survey's counts at 300 dpi, matching the redesign's transcription: 1 × ১০০০০, 3 × ১০০০, 4 × ১০০, 5 × ১০, 5 × ১ = ১৩৪৫৫; four of each = ৪৪৪৪); ১৩৪২৫ (অনুশীলন ৩) and ১৩৪৫৭ (p.8) sit beside ১৩৪৫৫ on purpose, so the child has to count the ১০ and ১ cards. Sorting the scattered cards into the box (“কার্ডগুলো সাজিয়ে রাখি”) stays unplayed (the rest file's cant).");
  note("**p.10 quiz:** the child names the place that decides each comparison (the < > signs themselves are typed in the p.11 and p.20 games). The first four questions follow the page's dialogue (হাজারের দল, then শত এর দল: ২টি and ১টি, printed); then the boy's order (অযুত first, then হাজার); then the first differing place for p.10 অনুশীলন ১ (printed “৭ থেকে ৯ বড়ো”) and seven pairs from p.11. Each question shows four of the five place names.");
  note("**p.28:** অনুশীলন ৫ (১) (৩৮৪৫ + ১৫০০ + ৭০০ → ৬০৪৫, printed) is asked with each number in turn as the box (the page's own template is boxes to fill). অনুশীলন ৬ (চ্যালেঞ্জ) lets the child choose the numbers, which can't be checked; the game asks its first grid (two numbers, the answer ১০০০০০ printed) as “□ + □ = ১০০০০০” with one number given, using the book's own pairs that make ১০০০০০: the printed ৩৯৯৮০ + ৬০০২০, then ৯৯৯৯৯ + ১ (p.27), ১১১ + ৯৯৮৮৯ (p.30), ৮১১১১ + ১৮৮৮৯ (p.40), and the subtractions ১০০০০০ − ১১১১১, − ৯, − ৮৮৭৫৫ (p.34, p.40, p.36) turned round. A missing-digit grid (each digit of the second number boxed, as the page draws it) isn't possible: the server reads a run of boxes “□□□□□” as one box, so each partner is one missing number. The three-number grid and rows (২)–(৪) stay free.");
  note("**p.32 quiz:** কাজ ১'s four frames and কাজ ২'s four frames are asked place by place (the options are the frames' own steps), with the borrowing of কাজ ২ in two more questions (দশকে ১৪ after borrowing, শতকের ৩ becomes ২, as the marks ২ ১০ show). The labels বিয়োজন / বিয়োজ্য / বিয়োগফল are one question on this page's numbers, which of ৮৭৬৪ and ৩৪১২ is which (the p.35 quiz asks the names in general and what ৫৩৫২ is called). The last question is কাজ ২'s story (printed ১৬৬৩); its wrong options are the usual slips: ২৩৪৩ (the smaller digit taken from the bigger in each column), ১৭৬৩ (the hundreds not reduced after borrowing), ৯০৩৩ (added).");
  note("**p.38 sort:** each card is one change in a story of chapters ২–৪, in the book's words with its subject (whose count changes) said: four from p.38 itself (যাত্রী নেমে গেল / উঠল, শিক্ষার্থী ভর্তি হলো / চলে গেল), the rest from p.39 অনুশীলন ২–৩, p.41 নিজে করি ৭ and ১২, p.33 কাজ ৩ and p.28 অনুশীলন ৫ (১); 7 যোগ, 7 বিয়োগ. The groups are the boy's and girl's words (“যোগ করতে হবে”, “বিয়োগ করতে হবে”). “রাজু তার বোনকে ৫টি বেলুন দিয়ে দিলো” is বিয়োগ (রাজুর বেলুন কমে), “রাজীবের মা … আরো ৩৪২০ টাকা নিলেন” is যোগ.");
};
