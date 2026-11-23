// অধ্যায় ১১ · পরিমাপ (printed pp.118–132): দৈর্ঘ্য (the mm ruler, কিমি মি সেমি মিমি), ওজন (the kitchen scale, আদর্শ
// বাটখারা, কেজি গ্রাম), সময় (reading clocks, সকাল/দুপুর/বিকাল/রাত with সাড়ে/সোয়া/পৌনে, digital clocks, elapsed time,
// ঘণ্টা মিনিট সেকেন্ড) and the নিজে করি review.
module.exports = (L) => {
  const { it, wio, q, mcq, note, cant } = L;
  const conv = (from, to) => ({ kind: "convert", from, to });
  const clock = (h, m, extra = {}) => ({ kind: "clock", h, m, ...extra });

  // ════════════════════════════ দৈর্ঘ্য ════════════════════════════
  // ── p.118: millimetres on the ruler ──
  wio({
    page: 118, slug: "mm-ruler", title: "মিলিমিটারে দৈর্ঘ্য মাপি",
    items: [
      it({ kind: "measure", tool: "ruler", mm: true, value: 43, emoji: "✏️" }, [4, 3]),
      it({ kind: "measure", tool: "ruler", mm: true, value: 40, emoji: "✏️" }, [4, 0]),
      it({ kind: "units", unit: "cm", terms: [[4, 3], [4, 0]], ops: ["−"], text: "ছেলেটি বলল, “আমার পেনসিলটির দৈর্ঘ্য 4 সেমি 3 মিমি।” মেয়েটি বলল, “আমার পেনসিলটির দৈর্ঘ্য 4 সেমি।” দুইটি পেনসিলের দৈর্ঘ্যের পার্থক্য কত?" }, [0, 3]),
    ],
    src: "p.118 মূল প্রশ্ন: the boy's pencil (printed 4 সেমি 3 মিমি), the girl's (printed 4 সেমি), the difference (printed 3 মিমি)",
  });
  note("p.118 is all worked example (the two pencils on a mm ruler and their difference, all printed): a three-item Work It Out (two mm readings, then the difference as a সেমি মিমি story made of the two speech bubbles and the মূল প্রশ্ন's “দৈর্ঘ্যের পার্থক্য”). It has no fresh problems (a mix of kinds); the p.123 and p.124 Measure It games add the tools' Class 3 rounds, mm readings among them.");
  cant("p.119 কাজ ১ (estimating, then measuring a book, a খাতা, a জ্যামিতি বক্স to the millimetre) and p.121 অনুশীলন ১ (measuring the classroom walls with a tape): real-world measuring.");

  // ── p.120 কাজ ২–৩: নিপার নানাবাড়ি (the map), the classroom in সেমি ──
  wio({
    page: 120, slug: "map-distance", type: "units_amounts", title: "নিপার নানাবাড়ির পথ",
    items: [
      it(conv([[7, "km"]], "m"), 7000),
      it(conv([[5, "km"], [50, "m"]], "m"), 5050),
      it({ kind: "units", unit: "km", terms: [[5, 50], [3, 0]], ops: ["+"], text: "নিপার নানাবাড়ি যাওয়ার পথে উদ্যান থেকে পোস্ট অফিসের দূরত্ব 5 কিমি 50 মি এবং পোস্ট অফিস থেকে নানাবাড়ির দূরত্ব 3 কিমি। উদ্যান থেকে নানাবাড়ির দূরত্ব কত হবে?" }, [8, 50]),
      it(conv([[16, "m"]], "cm"), 1600),
    ],
    src: "p.120 কাজ ২ (1) (printed 7000 মিটার), (2), (3); কাজ ৩ (16 মিটার, printed 1600 সেন্টিমিটার)",
  });
  note("p.120 কাজ ২ (3): the map's labels (উদ্যান ↔ পোস্ট অফিস 5 কিমি 50 মি, পোস্ট অফিস ↔ নানাবাড়ি 3 কিমি) are written into the story before the printed question; the 4 কিমি 750 মি label is used by no question.");

  wio({
    page: 121, slug: "length-convert", type: "units_amounts", title: "খালিঘর পূরণ করি: দৈর্ঘ্যের একক",
    items: [
      it(conv([[1600, "cm"]], "mm"), 16000),
      it(conv([[24, "cm"]], "mm"), 240),
      it(conv([[38, "cm"], [9, "mm"]], "mm"), 389),
      it(conv([[6, "m"]], "cm"), 600),
      it(conv([[3, "m"], [22, "cm"]], "cm"), 322),
      it(conv([[2, "km"], [26, "m"]], "m"), 2026),
      it(conv([[1, "km"]], "cm"), 100000),
    ],
    fresh: { skill: "convert", unit: "length" },
    src: "p.121 কাজ ৩ continued (1600 সেন্টিমিটার, printed 16000 মিলিমিটার), অনুশীলন ২ (1)–(6)",
  });

  mcq({
    page: 121, slug: "length-units", title: "দৈর্ঘ্যের সঠিক একক",
    questions: [
      q({ prompt: "ভুল বাক্যটি চিহ্নিত করি। (1) সেন্টিমিটারের সংক্ষিপ্ত রূপ সেমি। (2) দৈর্ঘ্য পরিমাপ করে দুইটি বস্তু (ছোটো, বড়ো) তুলনা করা সম্ভব। (3) ছোটো বস্তুর দৈর্ঘ্য পরিমাপ করার জন্য কিলোমিটার একক ব্যবহার করা হয়।", options: ["(1)", "(2)", "(3)"], book: "গ", why: "কিলোমিটার বড়ো দৈর্ঘ্য (যেমন, দূরত্ব) পরিমাপের একক। ছোটো বস্তুর দৈর্ঘ্য সেন্টিমিটার বা মিলিমিটারে মাপি।" }),
      q({ prompt: "ঢাকা থেকে খুলনার দূরত্ব: কোন এককের সঙ্গে মিল?", options: ["সেন্টিমিটার", "মিটার", "কিলোমিটার"], book: "গ", why: "দূরত্বের মতো বড়ো দৈর্ঘ্য কিলোমিটারে পরিমাপ করা হয়।" }),
      q({ prompt: "একটি খাতার দৈর্ঘ্য: কোন এককের সঙ্গে মিল?", options: ["সেন্টিমিটার", "মিটার", "কিলোমিটার"], book: "ক", why: "খাতা ছোটো বস্তু; এর দৈর্ঘ্য সেন্টিমিটারে পরিমাপ করা হয়।" }),
      q({ prompt: "খেলার মাঠের দৈর্ঘ্য: কোন এককের সঙ্গে মিল?", options: ["সেন্টিমিটার", "মিটার", "কিলোমিটার"], book: "খ", why: "খেলার মাঠ কয়েক মিটার লম্বা; এর দৈর্ঘ্য মিটারে পরিমাপ করা হয়।" }),
    ],
    src: "p.121 অনুশীলন ৩ (the wrong sentence: (3)), অনুশীলন ৪ (দাগ টেনে মিল করি, 3 rows)",
  });
  note("p.121 অনুশীলন ৩: the three sentences are in the question, numbered as printed, and the options are (১), (২), (৩) ((৩) is the wrong one; sentence (৩) is 67 characters, over an option's 60). অনুশীলন ৪ (a 3-row match; a Number Match needs 4) is three questions, each with the book's right-hand column (সেন্টিমিটার, মিটার, কিলোমিটার) as its options in that order.");

  // ════════════════════════════ ওজন ════════════════════════════
  // ── p.122–123: the dial and the digital kitchen scale ──
  wio({
    page: 123, slug: "kitchen-scale", type: "measure_it", title: "মাপনী দেখে ওজন লিখি",
    items: [
      it({ kind: "measure", tool: "scale", value: 1, emoji: "🛍️" }, 1),
      it({ kind: "measure", tool: "scale", value: 3, emoji: "🍈" }, 3),
      it({ kind: "measure", tool: "scale", value: 1, emoji: "🍊" }, 1),
      it({ kind: "measure", tool: "scale", value: 4, digital: true, emoji: "🍍" }, 4),
      it({ kind: "measure", tool: "scale", value: 2, digital: true, emoji: "🍌" }, 2),
    ],
    fresh: { skill: "measure", more: true },
    src: "p.122 কাজ ১ (the bag of sand, the needle on 1), p.123 কাজ ৩: papayas (dial, 3), oranges (dial, 1), pineapples (digital “4.00”), bananas (digital “2.000”)",
    notes: ["কাজ ৩ (পৃষ্ঠা 123): চারটি ওজন লেখার পরে জিজ্ঞাসা করি, কোন ফলগুলোর ওজন সবচেয়ে বেশি? (আনারস, 4 কেজি)"],
  });
  note("p.123 কাজ ৩: the four readings are played (papaya has no emoji: 🍈); “কোন ফলগুলোর ওজন সবচেয়ে বেশি” (the pineapples, 4 কেজি) is in the guide note for the teacher to ask.");
  cant("p.122 মূল প্রশ্ন (how to weigh a watermelon: discussion), p.123 কাজ ২ (clay shapes weighed: hands-on), p.125 অনুশীলন ৫ (estimating and weighing real things).");

  // ── p.124–125: আদর্শ বাটখারা ──
  wio({
    page: 124, slug: "weights", type: "measure_it", title: "আদর্শ বাটখারা দিয়ে ওজন করি",
    items: [
      it({ kind: "measure", tool: "balance", ask: "weigh", value: 650, emoji: "🛍️" }, 650),
      it({ kind: "measure", tool: "balance", kg: true, weights: [1000, 1000, 1000, 200, 20], emoji: "📦" }, [3, 220]),
      it({ kind: "measure", tool: "balance", kg: true, weights: [1000, 1000, 1000, 100, 100, 10, 10], emoji: "📦" }, [3, 220]),
      it({ kind: "measure", tool: "balance", ask: "weigh", value: 5045, emoji: "📦" }, 5045),
      it({ kind: "measure", tool: "balance", ask: "weigh", value: 1620, stock: [1000, 500, 500, 200, 200, 200, 20, 20, 20, 20, 20, 20], emoji: "📦" }, 1620),
      it({ kind: "measure", tool: "balance", ask: "weigh", value: 1300, fewest: true, emoji: "🧂" }, 1300),
    ],
    fresh: { skill: "measure", more: true },
    src: "p.124 কাজ ৪ (650 গ্রাম), কাজ ৫ (3 কিলোগ্রাম 220 গ্রাম: the boy's and the girl's printed ways), অনুশীলন ১ (5 কিলোগ্রাম 45 গ্রাম); p.125 অনুশীলন ৩ (1 কিলোগ্রাম 620 গ্রাম from the given weights), অনুশীলন ৪ (1 কিলোগ্রাম 300 গ্রাম, কমপক্ষে)",
    notes: ["অনুশীলন ৩ (পৃষ্ঠা 125): বইয়ে সব উপায় বের করতে বলা হয়েছে (৩টি উপায়); খেলায় একটি উপায়ে ওজন মিলালেই হবে। বাকি উপায়গুলো শিক্ষার্থীরা খাতায় লিখতে পারে।"],
  });
  note("p.124 কাজ ৫'s two printed ways (1 কেজি × 3 + 200 + 20 গ্রাম; 1 কেজি × 3 + 100 × 2 + 10 × 2 গ্রাম) are read-the-balance rounds (answer 3 কেজি 220 গ্রাম). p.125 অনুশীলন ৩ (1টি 1 কেজি, 2টি 500, 3টি 200, 6টি 20 গ্রাম) is a weigh round with exactly that stock; the book asks for every way (there are 3), the game takes one (guide note). অনুশীলন ৪ (কমপক্ষে) is a fewest-weights round (1 কেজি + 200 + 100 গ্রাম).");
  cant("p.124 কাজ ৪, the boy's way: weights on both pans (200 + 500 গ্রাম against the 650 গ্রাম bag + 50 গ্রাম); the balance puts weights on one pan only. The girl's way (500 + 100 + 50) is the weigh round.");

  // ── p.125: কিলোগ্রাম and গ্রাম ──
  wio({
    page: 125, slug: "weight-convert", type: "units_amounts", title: "গ্রাম-এ প্রকাশ করি",
    items: [
      it(conv([[8, "kg"], [447, "g"]], "g"), 8447),
      it(conv([[6, "kg"]], "g"), 6000),
      it(conv([[7, "kg"], [33, "g"]], "g"), 7033),
      it(conv([[4, "kg"], [670, "g"]], "g"), 4670),
      it(conv([[2000, "g"]], "kg"), 2),
    ],
    fresh: { skill: "convert", unit: "weight" },
    src: "p.125 কাজ ৬ (printed 8447 গ্রাম), অনুশীলন ২ (1)–(4)",
  });

  // ════════════════════════════ সময় ════════════════════════════
  // ── p.127 কাজ ২: clock words ──
  wio({
    page: 127, slug: "clock-words", type: "clock_time", title: "ঘড়ি দেখে সময় বসাই",
    items: [
      it(clock(8, 30, { ask: "words", part: "morning" }), [8, 30, 8]),
      it(clock(2, 45, { ask: "words", part: "noon" }), [2, 45, 3]),
      it(clock(10, 15, { ask: "words", part: "night" }), [10, 15, 10]),
      it(clock(12, 45, { ask: "words", part: "noon" }), [12, 45, 1]),
      it(clock(5, 15, { ask: "words", part: "afternoon" }), [5, 15, 5]),
      it(clock(12, 30, { ask: "words", part: "noon" }), [12, 30, 12]),
    ],
    fresh: { skill: "clock", more: true },
    src: "p.127 কাজ ২, the six clocks (8:30 and 10:15 printed)",
  });
  note("p.127 কাজ ২: the day parts are the book's (2:45 is দুপুর, not বিকাল; 12:45 is দুপুর পৌনে 1টা).");

  // ── p.126–128: reading clocks, 30 minutes later, 45 minutes earlier, digital clocks ──
  wio({
    page: 128, slug: "read-clocks", type: "clock_time", title: "কয়টা বাজে বলি",
    items: [
      it(clock(2, 33), [2, 33]),
      it(clock(3, 30), [3, 30]),
      it(clock(3, 30, { ask: "after", add: 30 }), [4, 0]),
      it(clock(3, 30, { ask: "before", add: 45 }), [2, 45]),
      it(clock(10, 10), [10, 10]),
      it(clock(10, 20, { face: "digital" }), [10, 20]),
      it(clock(12, 55, { face: "digital" }), [12, 55]),
    ],
    fresh: { skill: "clock", more: true },
    src: "p.126 কাজ ১ (printed 2:33), p.127 কাজ ৩ (এখন 3:30; 30 মিনিট পর; 45 মিনিট আগে), p.128 কাজ ৪ (the clock at 10:10, the green digital “10:20”, the phone's “12:55”)",
  });
  cant("p.126 মূল প্রশ্ন (the three hands, 60 সেকেন্ড = 1 মিনিট, 60 মিনিট = 1 ঘণ্টা: facts, asked again in p.128 কাজ ৫), p.129 কাজ ৯ (acting out the use of time) and কাজ ১০ (making a দৈনিক রুটিন): discussion.");

  mcq({
    page: 128, slug: "tick-time", title: "সঠিক উত্তরটিতে টিক (✓) চিহ্ন দিই",
    questions: [
      q({ prompt: "ঘণ্টার কাঁটা মিনিটের কাঁটার চেয়ে …", options: ["ছোটো", "বড়ো"], book: "ক", why: "ঘড়িতে ঘণ্টার কাঁটা ছোটো, মিনিটের কাঁটা বড়ো।" }),
      q({ prompt: "মিনিটের কাঁটা 1 বার সম্পূর্ণ ঘুরলে …", options: ["30 মিনিট", "60 মিনিট"], book: "খ", why: "ঘড়িতে 60টি ঘর; মিনিটের কাঁটা 1 বার ঘুরলে 60 মিনিট = 1 ঘণ্টা।" }),
      q({ prompt: "ঘণ্টার কাঁটা 1 বার সম্পূর্ণ ঘুরলে …", options: ["1 ঘণ্টা", "12 ঘণ্টা"], book: "খ", why: "ঘণ্টার কাঁটা 1 থেকে 12 পর্যন্ত সব সংখ্যা ঘুরে আসে: 12 ঘণ্টা।" }),
      q({ prompt: "1 দিনে ঘড়িতে 12টা বাজে …", options: ["1 বার", "2 বার"], book: "খ", why: "দুপুর 12টা এবং রাত 12টা: 1 দিনে 2 বার।" }),
      q({ prompt: "1 দিনে ঘণ্টার কাঁটা 5 এর ঘরে আসে …", options: ["সকালে", "বিকালে", "সকালে-বিকালে"], book: "গ", why: "ঘণ্টার কাঁটা 1 দিনে 2 বার ঘোরে, তাই 5 এর ঘরে আসে সকালে একবার, বিকালে একবার।" }),
      q({ prompt: "1 দিনে ঘণ্টার কাঁটা কত বার সম্পূর্ণ ঘোরে?", options: ["1 বার", "2 বার", "3 বার"], book: "খ", why: "1 দিনে 24 ঘণ্টা; ঘণ্টার কাঁটা 12 ঘণ্টায় 1 বার ঘোরে, তাই 2 বার।" }),
      q({ prompt: "1 দিনে মিনিটের কাঁটা কত বার সম্পূর্ণ ঘোরে?", options: ["10 বার", "12 বার", "24 বার"], book: "গ", why: "মিনিটের কাঁটা 1 ঘণ্টায় 1 বার ঘোরে; 1 দিনে 24 ঘণ্টা, তাই 24 বার।" }),
      q({ prompt: "1 দিনে …", options: ["12 ঘণ্টা", "24 ঘণ্টা"], book: "খ", why: "1 দিনে 24 ঘণ্টা।" }),
      q({ prompt: "1 ঘণ্টা = …", options: ["30 মিনিট", "60 মিনিট"], book: "খ", why: "60 মিনিট = 1 ঘণ্টা।" }),
    ],
    src: "p.128 কাজ ৫ (1)–(9)",
  });

  // ── p.128–129: how long, how much later, ঘণ্টা মিনিট সেকেন্ড ──
  wio({
    page: 129, slug: "elapsed", title: "সময়ের হিসাব করি",
    items: [
      it(conv([[5, "min"]], "s"), 300),
      it(clock(3, 20, { ask: "after", add: 30 }), [3, 50]),
      it(clock(8, 25, { ask: "before", add: 20 }), [8, 5]),
      it(clock(9, 0, { ask: "between", h2: 10, m2: 0 }), [1, 0]),
      it(clock(4, 30), [4, 30]),
      it(clock(10, 0, { ask: "between", h2: 3, m2: 30 }), [5, 30]),
      it({ kind: "units", unit: "h", terms: [[2, 25], [2, 45]], ops: ["+"], text: "পলি সকালে 2 ঘণ্টা 25 মিনিট এবং রাতে 2 ঘণ্টা 45 মিনিট পড়ে। সে প্রতিদিন কত সময় পড়ে?" }, [5, 10]),
    ],
    src: "p.128 কাজ ৬ (5 মিনিট = □ সেকেন্ড), কাজ ৭ (দিপু: 3:20, 30 মিনিট পর); p.129 অনুশীলন ১ (মিতা: 8:25, 20 মিনিট আগে), কাজ ৮ (সামি: 9:00 → 10:00 printed 1 ঘণ্টা; (1) বাড়ি ফিরে আসে 4:30; (2) 10:00 → 3:30), অনুশীলন ২ (পলি)",
    notes: ["কাজ ৭ ও অনুশীলন ১: দিপু 3:20 এ রওনা দিয়ে 30 মিনিট পর বইমেলায় পৌঁছায়; মিতা 8:25 এ বিদ্যালয়ে পৌঁছায়, যেতে 20 মিনিট লাগে। কাজ ৮: সামি 9:00 টায় বাড়ি ত্যাগ করে, 10:00 টায় চাচার বাড়ি পৌঁছায়, 3:30 টায় চাচার বাড়ি ত্যাগ করে, 4:30 টায় বাড়ি ফিরে আসে।"],
  });
  note("p.128–129's time stories (দিপু, মিতা, সামি) are clock rounds, which carry no story text: the guide note tells each story, and the rounds show its clocks (start + 30 মিনিট, end − 20 মিনিট, 9:00 → 10:00, the clock at 4:30, 10:00 → 3:30 across noon = 5 ঘণ্টা 30 মিনিট). p.128 কাজ ৬ (5 মিনিট = 300 সেকেন্ড) and p.129 অনুশীলন ২ (পলি, ঘণ্টা মিনিট carried at 60) are in the same Work It Out game (a mix of kinds: no fresh problems).");

  // ════════════════════════════ নিজে করি ════════════════════════════
  mcq({
    page: 130, slug: "tick-review", title: "নিজে করি: সঠিক উত্তরে টিক চিহ্ন দিই (১)",
    questions: [
      q({ prompt: "একটি কলমের নিপ পরিমাপ করতে কোন এককটি ব্যবহার সুবিধাজনক?", options: ["কিলোমিটার", "মিটার", "সেন্টিমিটার", "মিলিমিটার"], book: "ঘ", why: "কলমের নিপ 1 সেন্টিমিটারেরও ছোটো; 1 সেন্টিমিটার থেকে ছোটো দৈর্ঘ্য মিলিমিটারে মাপি।" }),
      q({ prompt: "একটি পেনসিলের দৈর্ঘ্য পরিমাপ করতে সাধারণত কোন একক ব্যবহার করা হয়?", options: ["মিটার", "সেন্টিমিটার", "মিলিমিটার", "কিলোমিটার"], book: "খ", why: "পেনসিল ছোটো বস্তু; ছোটো বস্তুর দৈর্ঘ্য সেন্টিমিটারে মাপা হয়।", emoji: "✏️" }),
      q({ prompt: "স্কেল ব্যবহার না করে একটি পেনসিলের আনুমানিক দৈর্ঘ্য কত হবে?", options: ["5 সেমি", "15 সেমি", "50 সেমি", "1 মি"], book: "খ", why: "একটি পেনসিল সাধারণত প্রায় 15 সেমি লম্বা; 5 সেমি খুব ছোটো, 50 সেমি বা 1 মি অনেক বড়ো।", emoji: "✏️" }),
      q({ prompt: "নিচের কোনটি সঠিক?", options: ["1 কিলোগ্রাম = 10 গ্রাম", "1 কিলোগ্রাম = 100 গ্রাম", "1 কিলোগ্রাম = 1000 গ্রাম", "1 কিলোগ্রাম = 10000 গ্রাম"], book: "গ", why: "ওজনের একক: 1 কিলোগ্রাম (কেজি) = 1000 গ্রাম।" }),
      q({ prompt: "3 কেজি 220 গ্রাম ওজন পরিমাপের জন্য নিচের কোন আদর্শ বাটখারাগুলো লাগবে?", options: ["1 কেজি × 3 + 200 গ্রাম + 20 গ্রাম", "1 কেজি × 3 + 200 গ্রাম + 10 গ্রাম", "1 কেজি × 2 + 200 গ্রাম + 20 গ্রাম", "1 কেজি × 3 + 100 গ্রাম + 20 গ্রাম"], book: "ক", why: "1 কেজি × 3 = 3 কেজি, 200 গ্রাম + 20 গ্রাম = 220 গ্রাম। অন্যগুলো 3 কেজি 210 গ্রাম, 2 কেজি 220 গ্রাম, 3 কেজি 120 গ্রাম।" }),
      q({ prompt: "যদি রিমার শ্রেণিকক্ষের দৈর্ঘ্য 20 মিটার হয়, তাহলে শ্রেণিকক্ষের এক প্রান্ত থেকে আরেক প্রান্ত পর্যন্ত 25 সেন্টিমিটার দৈর্ঘ্যের একটি স্কেল কতবার রেখে শ্রেণিকক্ষের দৈর্ঘ্য পরিমাপ করা যাবে?", options: ["40 বার", "80 বার", "160 বার", "320 বার"], book: "খ", num: 80, why: "20 মিটার = 2000 সেন্টিমিটার; 2000 ÷ 25 = 80 বার।" }),
    ],
    src: "p.130 নিজে করি ১ (1)–(6)",
  });
  note("p.130 নিজে করি ১ (4): two options are labelled গ); the file letters them ক–ঘ (1000 গ্রাম, the third, is right).");
  note("p.130 নিজে করি ১ (5): the printed ক, খ and ঘ all make 3 কেজি 220 গ্রাম, and গ uses a “220 গ্রা” weight; ক, খ, ঘ also use 2 কেজি or 3 কেজি weights, which aren't in p.123's আদর্শ বাটখারা (5 গ্রাম–1 কিলোগ্রাম). The options are rewritten with the book's own weights so that only ক is right: ক 1 কেজি × 3 + 200 + 20 গ্রাম (p.124 কাজ ৫'s printed way), খ … + 200 + 10 গ্রাম (3 কেজি 210 গ্রাম), গ 1 কেজি × 2 + 200 + 20 গ্রাম, ঘ 1 কেজি × 3 + 100 + 20 গ্রাম.");
  note("p.130 নিজে করি ১ (2), (3) ask about the pencil drawn beside them; the questions say “একটি পেনসিলের”. (3)'s drawing is about 6 cm long on the page; the answer is a real pencil's 15 সেমি (খ), as the survey reads it.");

  mcq({
    page: 131, slug: "tick-review", title: "নিজে করি: সঠিক উত্তরে টিক চিহ্ন দিই (২)",
    questions: [
      q({ prompt: "ঘড়িতে এখন 5টা বেজে 5 মিনিট। 6টা বাজতে আর কত মিনিট বাকি আছে?", options: ["5 মিনিট", "25 মিনিট", "35 মিনিট", "55 মিনিট"], book: "ঘ", num: 55, why: "5:05 থেকে 6:00 পর্যন্ত মিনিটের কাঁটা 1 থেকে 12 এ যায়: 60 − 5 = 55 মিনিট।", emoji: "🕔" }),
      q({ prompt: "নিপার বাড়ি থেকে তার দাদাবাড়ির দূরত্ব 3 কিলোমিটার। যদি নিপা প্রতি 10 মিনিটে 500 মিটার হাঁটে তাহলে তার দাদাবাড়িতে পৌঁছাতে কত সময় লাগবে?", options: ["30 মিনিট", "50 মিনিট", "60 মিনিট", "70 মিনিট"], book: "গ", num: 60, why: "3 কিলোমিটার = 3000 মিটার; 3000 ÷ 500 = 6, তাই 6 × 10 = 60 মিনিট।" }),
      q({ prompt: "দুপুর 12:30টায় বৃষ্টি শুরু হয়েছিল এবং 2 ঘণ্টা 45 মিনিট বৃষ্টি হয়েছিল। কখন বৃষ্টি থেমেছিল?", options: ["3:15 টায়", "3:30 টায়", "4:45 টায়", "5:15 টায়"], book: "ক", why: "12:30 থেকে 2 ঘণ্টা পরে 2:30; তার 45 মিনিট পরে 3:15।" }),
      q({ prompt: "একদিনে একটি ঘড়ির মিনিটের কাঁটা সম্পূর্ণভাবে কতবার ঘোরে?", options: ["60", "120", "24", "1440"], book: "গ", num: 24, why: "মিনিটের কাঁটা 1 ঘণ্টায় 1 বার সম্পূর্ণ ঘোরে; 1 দিনে 24 ঘণ্টা, তাই 24 বার।" }),
      q({ prompt: "একটি ডিজিটাল ঘড়িতে 21:33 দেখাচ্ছে। তখন কয়টা বাজে?", options: ["রাত 9টা বেজে 33 মিনিট", "সকাল 9টা বেজে 33 মিনিট", "দুপুর 2টা বেজে 13 মিনিট", "রাত 2টা বেজে 33 মিনিট"], answer: "রাত 9টা বেজে 33 মিনিট", why: "এ ঘড়ি দুপুর 12টার পরে 13, 14 … গোনে। 21 − 12 = 9, তাই 21:33 মানে রাত 9টা বেজে 33 মিনিট।" }),
    ],
    src: "p.131 নিজে করি ১ (7)–(10); p.132 নিজে করি ৬, the black LED clock “21:33”",
  });
  note("p.131 নিজে করি ১ (10): no printed option is right (60, 120, 240, 1440; the answer is 24, as p.128 কাজ ৫ (7) says “24 বার”). Option গ 240 is taken as a misprint of 24 and written 24; “ঘরির” is written ঘড়ির.");
  note("p.131 নিজে করি ১ (7): the clock (5:05) is said in words in the question (“ঘড়িতে এখন 5টা বেজে 5 মিনিট।”).");
  note("p.132 নিজে করি ৬'s fourth clock is the 24-hour “21:33”, never taught in the book: it is the last question of “নিজে করি: সঠিক উত্তরে টিক চিহ্ন দিই (২)” (রাত 9টা বেজে 33 মিনিট; the wrong options are mine), not a clock round (those show 1–12).");

  wio({
    page: 131, slug: "fill-boxes", type: "units_amounts", title: "নিজে করি: খালিঘর পূরণ করি",
    items: [
      it(conv([[4, "cm"]], "mm"), 40),
      it(conv([[5, "kg"]], "g"), 5000),
      it(conv([[9000, "g"]], "kg"), 9),
      it(conv([[300, "cm"]], "m"), 3),
    ],
    fresh: { skill: "convert", unit: "any" },
    src: "p.131 নিজে করি ২ (1)–(4)",
  });

  wio({
    page: 131, slug: "to-m-mm", type: "units_amounts", title: "নিজে করি: মিটারে ও মিলিমিটারে প্রকাশ করি",
    items: [
      it(conv([[2, "km"]], "m"), 2000),
      it(conv([[5, "km"], [320, "m"]], "m"), 5320),
      it(conv([[7, "km"]], "m"), 7000),
      it(conv([[7, "km"], [570, "m"]], "m"), 7570),
      it(conv([[3, "m"], [10, "cm"]], "mm"), 3100),
      it(conv([[11, "m"]], "mm"), 11000),
      it(conv([[4, "m"], [23, "cm"], [3, "mm"]], "mm"), 4233),
    ],
    fresh: { skill: "convert", unit: "length" },
    src: "p.131 নিজে করি ৩ (1)–(4) (মিটারে), নিজে করি ৪ (1)–(3) (মিলিমিটারে)",
  });

  wio({
    page: 132, slug: "review", title: "নিজে করি: ওজন ও সময়",
    items: [
      it({ kind: "measure", tool: "balance", ask: "weigh", value: 3200, fewest: true, emoji: "🥔" }, 3200),
      it(clock(2, 45), [2, 45]),
      it(clock(9, 35), [9, 35]),
      it(clock(7, 2, { face: "digital" }), [7, 2]),
      it(conv([[13, "min"]], "s"), 780),
      it({ kind: "units", unit: "h", terms: [[1, 30], [2, 10]], ops: ["+"], text: "মিজান প্রতিদিন সকালে 1 ঘণ্টা 30 মিনিট ও বিকালে 2 ঘণ্টা 10 মিনিট হাঁটে। সে প্রতিদিন কত সময় হাঁটে?" }, [3, 40]),
      it(clock(10, 20, { ask: "between", h2: 12, m2: 50 }), [2, 30]),
      it(clock(4, 55, { ask: "before", add: 35 }), [4, 20]),
      it(clock(11, 0, { ask: "between", h2: 12, m2: 30 }), [1, 30]),
    ],
    src: "p.132 নিজে করি ৫ (3 কেজি 200 গ্রাম, কমপক্ষে), ৬ (the two clocks and the “07:02” clock), ৭ (13 মিনিট), ৮ (মিজান), ৯ (রফিক: 10:20 → 12:50), ১০ (কাব্য: 4:55, 35 মিনিট আগে), ১১ (বৃষ্টি: 11:00 → 12:30)",
    notes: ["নিজে করি ৯: রফিক 10:20 এ বন্ধুর বাসায় গিয়েছিল এবং 12:50 এ ফিরে এসেছিল; সে কতক্ষণ বাড়ির বাইরে ছিল? নিজে করি ১০: কাব্য 4:55 এ বাড়ি পৌঁছায়, যেতে 35 মিনিট লাগে; কখন বিদ্যালয় ত্যাগ করে? নিজে করি ১১: সকাল 11:00 টায় বৃষ্টি শুরু হয়ে দুপুর 12:30 টায় থেমেছিল; কতক্ষণ বৃষ্টি হয়েছিল?"],
  });
  note("p.132 is one mixed Work It Out game, page order (no fresh problems): নিজে করি ৫ a fewest-weights round (1 কেজি × 3 + 200 গ্রাম), ৬ three clocks (the “21:33” one is a multiple choice on p.131), ৭ 13 মিনিট = 780 সেকেন্ড, ৮ the story, ৯–১১ clock rounds with the stories in the guide note.");
};
