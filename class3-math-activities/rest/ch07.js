// অধ্যায় ৭ · গুণ ও ভাগের সম্পর্ক (printed pp.78–83): the fact trees (× and ÷ of one family), × and ÷ left to right,
// two-step stories (÷ then ×, × then ÷, "x ভাগের y ভাগ"), repeated addition and subtraction as × and ÷, the নিজে করি MCQs.
module.exports = (L) => {
  const { it, wio, q, mcq, match, note, cant } = L;
  const fact = (a, op, b, ans) => it({ kind: "sum", a, op, b, layout: "row" }, ans);
  const story = (text, sum, unit, ans) => it({ kind: "word", text, sum, unit }, ans);
  const expr = (text, ans) => it({ kind: "expr", text }, ans);

  // ── p.78: × and ÷ are related (the table and the two fact trees) ──
  wio({
    page: 78, slug: "fact-trees", title: "গুণ ও ভাগের সম্পর্ক",
    items: [
      fact(7, "×", 4, 28), fact(28, "÷", 4, 7), fact(28, "÷", 7, 4), // the গুণ | ভাগ table
      fact(6, "×", 3, 18), fact(18, "÷", 3, 6), fact(18, "÷", 6, 3), // tree (ক)
      fact(8, "×", 4, 32), fact(32, "÷", 4, 8), fact(32, "÷", 8, 4), // tree (খ)
      fact(96, "÷", 12, 8), fact(12, "×", 8, 96), // p.81 কাজ ৫: “১২ এর গুণের নামতা ব্যবহার করি এবং যাচাই করি” (both printed, “সঠিক”)
    ],
    src: "p.78 the গুণ | ভাগ table (7 × 4 = 28, 28 ÷ 4 = 7, 28 ÷ 7 = 4) and the fact trees (ক) 6 × 3 = 18 and (খ) 8 × 4 = 32, all printed; added: p.81 কাজ ৫'s check 96 ÷ 12 = 8, 12 × 8 = 96 (printed)",
  });
  note("p.78: the table and the two fact trees are printed with their answers; they are played as one fact family after another (× first, then its two ÷), the page's only drill of “গুণ ও ভাগ পরস্পর সম্পর্কযুক্ত”.");

  // ── p.79–80: × and ÷ side by side, left to right ──
  wio({
    page: 80, slug: "left-to-right", title: "বাম থেকে ডান দিকে হিসাব করি",
    items: [
      expr("12 ÷ 2 × 6", 36), // p.79 কাজ ৩ (printed: = 6 × 6 = 36)
      expr("15 ÷ 3 × 4", 20), expr("45 × 4 ÷ 5", 36), expr("23 × 4 ÷ 2", 46), expr("63 ÷ 7 × 6", 54),
      // the গাণিতিক বাক্য of the p.79–81 stories (p.80 prints “২১ × ৬ ÷ ১৪ = ১২৬ ÷ ১৪ = ৯”)
      expr("40 ÷ 5 × 2", 16), expr("120 ÷ 20 × 5", 30), expr("21 × 6 ÷ 14", 9), expr("30 × 4 ÷ 15", 8), expr("96 ÷ 12 × 32", 256),
    ],
    src: "p.79 কাজ ৩ (12 ÷ 2 × 6, printed 36), p.80 অনুশীলন ১ (১)–(৪); added: the sentences of p.78–79 কাজ ১ (40 ÷ 5 × 2, 16 printed) and কাজ ২, p.80 কাজ ৪ (21 × 6 ÷ 14, 9 printed) and অনুশীলন ২, p.81 কাজ ৫ (96 ÷ 12 × 32, 256 printed)",
  });
  note("p.80 expression game (10 since 3 Nov): after p.79 কাজ ৩ and p.80 অনুশীলন ১ come the গাণিতিক বাক্য of the p.79–81 stories (the book prints p.80 কাজ ৪'s as “২১ × ৬ ÷ ১৪ = ১২৬ ÷ ১৪ = ৯”), also asked as stories in the p.81 game. The p.83 expression game likewise adds the sentences of p.83 নিজে করি ৪, ৫, ৭, ৮, ৯. No fresh problems (see below).");

  // ── p.78–81: two-step stories ──
  wio({
    page: 81, slug: "two-steps", title: "দুই ধাপে সমাধান করি",
    items: [
      story("তাহসিনের 40টি রং পেনসিল ছিল। সে পেনসিলগুলোকে সমান 5 ভাগে ভাগ করল এবং রাতুলকে 2 ভাগ দিলো। রাতুল কয়টি পেনসিল পেল?", "40 ÷ 5 × 2", "টি", 16),
      story("তৃষাদের বিদ্যালয়ের অনুষ্ঠানে 20 জন অতিথির প্রত্যেককে একটি করে কলম দেওয়া হবে। তৃষা 120 টাকা খরচ করে 20টি কলম আনল। শিক্ষক পরে তাকে আরো 5টি কলম কিনতে বললেন। তাহলে আরো কত টাকা লাগবে?", "120 ÷ 20 × 5", "টাকা", 30),
      story("6টি ঝুড়ির প্রতিটিতে 21টি করে আম আছে। আমগুলো 14 জনের মধ্যে ভাগ করে দিলে প্রত্যেকে কতটি করে আম পাবে?", "21 × 6 ÷ 14", "টি", 9),
      story("30টি করে চকলেটের 4টি প্যাকেট কিনে তোমার 15 জন বন্ধুর মধ্যে সমানভাবে ভাগ করে দিলে প্রত্যেকে কতটি করে চকলেট পাবে?", "30 × 4 ÷ 15", "টি", 8),
      story("12টি কলমের মূল্য 96 টাকা। এরূপ 32টি কলম কিনতে কত টাকার প্রয়োজন?", "96 ÷ 12 × 32", "টাকা", 256),
      story("13টি কলার দাম 117 টাকা হলে 24টি কলা কিনতে কত টাকা লাগবে?", "117 ÷ 13 × 24", "টাকা", 216),
      // the big divisions by a times table beyond 10 (p.80 “১৪ এর গুণের নামতা ব্যবহার করে”, p.81 অনুশীলন ৩ ধাপ ১)
      it({ kind: "missing", text: "14 × □ = 126" }, 9), it({ kind: "missing", text: "13 × □ = 117" }, 9),
      // p.82 নিজে করি ১ (১) and (৩), typed instead of chosen
      story("2টি প্যাকেটের প্রতিটিতে 10টি করে কলম আছে। কলমগুলো 5 জন শিক্ষার্থীর মধ্যে সমানভাবে ভাগ করে দিলে প্রত্যেকে কয়টি করে কলম পাবে?", "10 × 2 ÷ 5", "টি", 4),
      story("30 জন শিক্ষার্থীর প্রত্যেকের নিকট থেকে 8 টাকা করে সংগ্রহ করা হলো। মোট টাকা 2জন বন্ধুকে খাতা কেনার জন্য সমানভাবে ভাগ করে দেওয়া হলে প্রত্যেক বন্ধু কত টাকা করে পেল?", "8 × 30 ÷ 2", "টাকা", 120),
    ],
    src: "p.78–79 কাজ ১ (40 ÷ 5 = 8, 8 × 2 = 16 printed) and কাজ ২, p.80 কাজ ৪ (21 × 6 ÷ 14 = 9 printed) and অনুশীলন ২, p.81 কাজ ৫ (96 ÷ 12 = 8, 8 × 32 = 256 printed) and অনুশীলন ৩; added: p.80 কাজ ৪'s 126 ÷ 14 by the 14 table (14 × □ = 126, 9 printed), p.81 অনুশীলন ৩ ধাপ ১ (13 × □ = 117), p.82 নিজে করি ১ (১) and (৩) as stories (answers ঘ 4, খ 120)",
  });
  note("p.78–81 stories: each sum is written in the order the book works it (p.80 the girl's “আমের সংখ্যা × ঝুড়ির সংখ্যা ÷ জনের সংখ্যা”: 21 × 6 ÷ 14; p.79 and p.81 ÷ first, then ×), and the game plays it as ধাপ ১, ধাপ ২, each step's sign first: the “□ □ □ □ □” operator boxes of p.80 অনুশীলন ২ and the ধাপ ১ / ধাপ ২ template of p.81 অনুশীলন ৩.");

  // ── p.82: নিজে করি ১ and ২ (১), (৩) ──
  mcq({
    page: 82, slug: "tick", title: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দিই",
    questions: [
      // the book's ক (প্যাকেট সংখ্যা × কলম সংখ্যা ÷ শিক্ষার্থীর সংখ্যা) is right too: replaced (see the note)
      q({
        prompt: "2টি প্যাকেটের প্রতিটিতে 10টি করে কলম আছে। কলমগুলো 5 জন শিক্ষার্থীর মধ্যে সমানভাবে ভাগ করে দিলে প্রত্যেকে কয়টি করে কলম পাবে? – সমস্যাটি সমাধানের সঠিক প্রক্রিয়া কোনটি?",
        options: ["প্যাকেট সংখ্যা × কলম সংখ্যা × শিক্ষার্থীর সংখ্যা", "প্যাকেট সংখ্যা × শিক্ষার্থীর সংখ্যা ÷ কলম সংখ্যা", "কলম সংখ্যা × শিক্ষার্থীর সংখ্যা ÷ প্যাকেট সংখ্যা", "কলম সংখ্যা × প্যাকেট সংখ্যা ÷ শিক্ষার্থীর সংখ্যা"],
        book: "ঘ", why: "মোট কলম = 10 × 2 = 20, তারপর 20 ÷ 5 = 4। কলম সংখ্যা × প্যাকেট সংখ্যা ÷ শিক্ষার্থীর সংখ্যা",
      }),
      // the book's খ (8 × 7) has the same value as গ (7 × 8): replaced
      q({ prompt: "7+7+7+7+7+7+7+7 কে প্রকাশ করার ক্ষেত্রে নিচের কোনটি সঠিক?", options: ["7 + 8", "8 × 8", "7 × 8", "7 × 7"], book: "গ", why: "7 কে 8 বার যোগ করা হয়েছে: 7 × 8 = 56" }),
      q({ prompt: "30 জন শিক্ষার্থীর প্রত্যেকের নিকট থেকে 8 টাকা করে সংগ্রহ করা হলো। মোট টাকা 2জন বন্ধুকে খাতা কেনার জন্য সমানভাবে ভাগ করে দেওয়া হলে প্রত্যেক বন্ধু কত টাকা করে পেল?", options: ["240 টাকা", "120 টাকা", "60 টাকা", "30 টাকা"], book: "খ", num: 120, why: "মোট টাকা 8 × 30 = 240, তারপর 240 ÷ 2 = 120 টাকা" }),
      q({ prompt: "ময়না একদিনের 8 ভাগের 2 ভাগ সময় পড়ালেখা করে। সে সারাদিনে কত ঘণ্টা পড়ালেখা করে?", options: ["3 ঘণ্টা", "4 ঘণ্টা", "6 ঘণ্টা", "8 ঘণ্টা"], book: "গ", num: 6, why: "1 দিন = 24 ঘণ্টা। 24 ÷ 8 = 3, 3 × 2 = 6 ঘণ্টা" }),
      q({ prompt: "একই সংখ্যা বারবার যোগ করাকে কী বলে?", options: ["গুণ", "ভাগ", "যোগ", "বিয়োগ"], answer: "গুণ", why: "যেমন 7 + 7 + 7 + 7 = 7 × 4 = 28। একই সংখ্যা বারবার যোগ করা হলো গুণ।" }),
      q({ prompt: "একই সংখ্যা বারবার বিয়োগ করাকে কী বলে?", options: ["গুণ", "ভাগ", "যোগ", "বিয়োগ"], answer: "ভাগ", why: "28 থেকে 4 বারবার বিয়োগ করলে 7 বারে 0 হয়: 28 ÷ 4 = 7। একই সংখ্যা বারবার বিয়োগ করা হলো ভাগ।" }),
      q({ prompt: "4+4+4+4+4 কে গুণ আকারে প্রকাশ করো।", options: ["4 × 5", "5 × 5", "4 × 4", "4 + 5"], answer: "4 × 5", why: "4 কে 5 বার যোগ করা হয়েছে: 4 × 5 = 20" }),
      q({ prompt: "136 থেকে কতবার 4 বিয়োগ করা যায়?", options: ["32", "34", "36", "38"], answer: "34", num: 34, why: "বারবার বিয়োগ = ভাগ: 136 ÷ 4 = 34, কারণ 4 × 34 = 136" }),
      q({ prompt: "7 কে 25 বার যোগ করাকে বিকল্প রূপে প্রকাশ করো।", options: ["7 × 25", "7 + 25", "7 × 7", "25 + 25"], answer: "7 × 25", why: "একই সংখ্যা বারবার যোগ করা হলো গুণ: 7 কে 25 বার যোগ = 7 × 25" }),
      q({ prompt: "3 বার 18 যোগ করাকে বিকল্প রূপে প্রকাশ করো।", options: ["18 × 3", "18 + 3", "3 × 3", "18 × 18"], answer: "18 × 3", why: "18 + 18 + 18 = 18 × 3 = 54" }),
    ],
    src: "p.82 নিজে করি ১ (১)–(৪) (the book's options in its ক–ঘ order, (১) ক and (২) খ replaced), নিজে করি ২ (১)–(৬) (the short answers as choices, my options)",
  });
  note("p.82 নিজে করি ১ (১): ক (প্যাকেট সংখ্যা × কলম সংখ্যা ÷ শিক্ষার্থীর সংখ্যা) and ঘ (কলম সংখ্যা × প্যাকেট সংখ্যা ÷ শিক্ষার্থীর সংখ্যা) are both right (2 × 10 ÷ 5 = 10 × 2 ÷ 5 = 4). ঘ stays the answer (the p.80 girl's pattern: the count in each packet first); ক is now “প্যাকেট সংখ্যা × কলম সংখ্যা × শিক্ষার্থীর সংখ্যা” (wrong: 100).");
  note("p.82 নিজে করি ১ (২): খ (8 × 7) has the same value as গ (7 × 8), the book's answer (the repeated number is the গুণ্য). খ is now “8 × 8”.");
  note("p.82 নিজে করি ২ (সংক্ষিপ্ত প্রশ্ন): all six are multiple choice with my options ((১), (৩): গুণ, ভাগ, যোগ, বিয়োগ; (২), (৫), (৬): the product as the book writes it, the repeated number first, never its swapped twin as a wrong option; (৪): 34 among 32, 36, 38). (২), (৪), (৫), (৬) are also in the p.82 match, and (৪) is a story on p.83 (136 ÷ 4 = 34).");

  // ── p.78, p.82: repeated addition and subtraction as × and ÷ ──
  match({
    page: 82, slug: "repeated", type: "equation_match", title: "বারবার যোগ ও বিয়োগ · গুণ ও ভাগে মিলাও",
    pairs: [
      ["7 + 7 + 7 + 7", "7 × 4"], // p.78 the table: 7 × 4 = 28 “কারণ, ৭ + ৭ + ৭ + ৭ = ২৮”
      ["28 থেকে 4 বারবার বিয়োগ", "28 ÷ 4"], // p.78: 28 − 4 = 24 … 4 − 4 = 0
      ["28 থেকে 7 বারবার বিয়োগ", "28 ÷ 7"], // p.78: 28 − 7 = 21 … 7 − 7 = 0
      ["4+4+4+4+4", "4 × 5"], // p.82 নিজে করি ২ (২)
      ["7 কে 25 বার যোগ", "7 × 25"], // (৫)
      ["3 বার 18 যোগ", "18 × 3"], // (৬)
      ["7+7+7+7+7+7+7+7", "7 × 8"], // নিজে করি ১ (২)
      ["136 থেকে 4 বারবার বিয়োগ", "136 ÷ 4"], // নিজে করি ২ (৪)
      ["6 + 6 + 6", "6 × 3"], // p.78 fact tree (ক) 6 × 3 = 18, as repeated addition (the boy: “গুণ হচ্ছে একই সংখ্যা বারবার যোগ করা”)
      ["8 + 8 + 8 + 8", "8 × 4"], // p.78 fact tree (খ) 8 × 4 = 32
    ],
    src: "p.78 the গুণ | ভাগ table (7 + 7 + 7 + 7; 28 − 4 …; 28 − 7 …), p.82 নিজে করি ২ (২), (৫), (৬) and নিজে করি ১ (২); added: নিজে করি ২ (৪) (136 − 4 …) and the p.78 fact trees 6 × 3, 8 × 4 written as repeated sums (mine)",
  });
  note("p.82 match (10 pairs since 3 Nov): “৬ + ৬ + ৬ ↔ ৬ × ৩” and “৮ + ৮ + ৮ + ৮ ↔ ৮ × ৪” are mine: the p.78 fact trees' products written as repeated sums, by the boy's rule on p.78; every right side has a different value, so each pair has one match.");

  // ── p.83: নিজে করি ৩ (and the number part of ১০) ──
  wio({
    page: 83, slug: "left-to-right", title: "নিজে করি: খালিঘর পূরণ করি",
    items: [
      expr("18 ÷ 6 × 7", 21), expr("42 ÷ 7 × 8", 48), expr("15 × 5 ÷ 3", 25), expr("72 ÷ 8 × 10", 90), expr("65 ÷ 13 × 4", 20),
      // the sentences of the p.83 stories (নিজে করি ৪, ৫, ৭, ৮, ৯)
      expr("22 × 18 ÷ 12", 33), expr("500 × 3 ÷ 15", 100), expr("104 ÷ 13 × 5", 40), expr("99 ÷ 9 × 4", 44), expr("112 ÷ 14 × 13", 104),
    ],
    src: "p.83 নিজে করি ৩ (১)–(৪), নিজে করি ১০ (the sentence 65 ÷ 13 × 4 = □ worked out; its story is free); added: the sentences of নিজে করি ৪, ৫, ৭, ৮, ৯ (also asked as stories in the p.83 story game)",
  });
  cant("p.83 নিজে করি ১০: “নিচের গাণিতিক বাক্যের জন্য গল্প তৈরি করি। ৬৫ ÷ ১৩ × ৪ =” (make a story): the sentence's value is worked out in the p.83 expression game; the story is free writing.");
  note("Chapter ৭'s two expression games have no fresh problems: the expr skill's fresh mix also makes + − forms (750 − 185 × 4, (a + b) ÷ c) that come only in chapter ৮; the chapter ৮ game (p.88) has them.");

  // ── p.82–83: নিজে করি ২ (৪), ৪–৯, the stories ──
  wio({
    page: 83, slug: "stories", title: "নিজে করি: গুণ ও ভাগের গল্প",
    items: [
      story("136 থেকে কতবার 4 বিয়োগ করা যায়?", "136 ÷ 4", "বার", 34),
      story("12 জন বন্ধু প্রত্যেকে কত করে টাকা দিলে 22 টাকা দামের 18টি খাতা কিনতে পারবে?", "22 × 18 ÷ 12", "টাকা", 33),
      story("500 টাকার 3টি নোট 15 জনের মধ্যে ভাগ করে দিলে প্রত্যেকে কত করে টাকা পাবে?", "500 × 3 ÷ 15", "টাকা", 100),
      story("63 জন বন্ধু 50 টাকা হারে চাঁদা তুলে 9টি অসহায় পরিবারের মধ্যে বিতরণ করলে প্রত্যেক পরিবার কত টাকা করে পাবে?", "50 × 63 ÷ 9", "টাকা", 350),
      story("হেলেন একটি 104 মিটার লম্বা ফিতার 13 ভাগের 5 ভাগ তার ছোটো ভাই রিফাতকে দিলো। রিফাত কত মিটার ফিতা পেল?", "104 ÷ 13 × 5", "মিটার", 40),
      story("99 টাকার 9 ভাগের 4 ভাগ কত টাকা?", "99 ÷ 9 × 4", "টাকা", 44),
      story("সালমা 112 কিলোমিটার পথের 14 ভাগের 13 ভাগ বাসে যায় এবং বাকি পথ হেঁটে যায়। সে কত পথ বাসে যায়?", "112 ÷ 14 × 13", "কিলোমিটার", 104),
      story("ময়না একদিনের 8 ভাগের 2 ভাগ সময় পড়ালেখা করে। সে সারাদিনে কত ঘণ্টা পড়ালেখা করে? [1 দিন = 24 ঘণ্টা]", "24 ÷ 8 × 2", "ঘণ্টা", 6), // p.82 নিজে করি ১ (৪)
      story("28 থেকে কতবার 4 বিয়োগ করা যায়?", "28 ÷ 4", "বার", 7), // p.78 table: 28 − 4 = 24 … 4 − 4 = 0 (28 ÷ 4 = 7 printed)
      story("28 থেকে কতবার 7 বিয়োগ করা যায়?", "28 ÷ 7", "বার", 4), // p.78 table: 28 − 7 = 21 … 7 − 7 = 0 (28 ÷ 7 = 4 printed)
    ],
    src: "p.82 নিজে করি ২ (৪) (136 ÷ 4), p.83 নিজে করি ৪–৯ (৭–৯: “x ভাগের y ভাগ”); added: p.82 নিজে করি ১ (৪) (ময়না, typed; “[১ দিন = ২৪ ঘণ্টা]” added), the p.78 table's repeated subtractions asked like নিজে করি ২ (৪) (28 ÷ 4 = 7, 28 ÷ 7 = 4 printed)",
  });
  note("p.83 story game (10 since 3 Nov): p.82 নিজে করি ১ (৪) (ময়না, 8 ভাগের 2 ভাগ of a day) is typed with “[১ দিন = ২৪ ঘণ্টা]” added, like the book's own “[১ হালি = ৪টি]” on p.65; “২৮ থেকে কতবার ৪ (৭) বিয়োগ করা যায়?” are my wording of the p.78 table's repeated subtractions, in the form of নিজে করি ২ (৪) (answers printed on p.78).");
  note("p.83 নিজে করি ৬ (63 friends at 50 টাকা, 9 families): the sum is 50 × 63 ÷ 9 (the amount each gives × the friends, then ÷ the families), the p.80 order; the survey gives only 3150 ÷ 9 = 350. নিজে করি ৪ is 22 × 18 ÷ 12 (the survey's order).");
};
