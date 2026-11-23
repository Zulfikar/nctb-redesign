// অধ্যায় ১৩ · উপাত্ত সংগ্রহ ও বিন্যস্তকরণ (printed pp.149–155): tally tables (the park rides, the teacher's colours) and
// pictographs (make them, read them: key, half and quarter symbols, most/least, total, difference, the missing key,
// symbols to add, the book's own questions), and a short multiple choice on ট্যালি চিহ্ন and চিত্রলেখ.
module.exports = (L) => {
  const { it, mine, wio, q, mcq, note, cant } = L;
  // a pictograph question: the chart (rows, key, symbol, dir, unit) and its ask
  const chart = (base, ask, extra = {}) => ({ kind: "chart", ...base, ask, ...extra });

  // ── p.149–150: সারণি তৈরি করা (ট্যালি চিহ্ন) ──
  // the p.149 picture can't be counted: only the train's 10 is printed (p.150); the other rides' numbers are mine
  const RIDES = [
    { name: "ছোটো মণিদের রেলগাড়ি", emoji: "🚂", value: 10 },
    { name: "নাগরদোলা", emoji: "🎡", value: 8 },
    { name: "উড়ন্ত বিমান", emoji: "✈️", value: 5 },
    { name: "আনন্দঘূর্ণি", emoji: "🎠", value: 12 },
  ];
  const RIDE_CHART = { rows: RIDES, key: 1, symbol: "dot", dir: "h", unit: "জন শিক্ষার্থী" };
  const PICTURE = "the p.149 picture can't be counted (only the train's 10 is printed): the other rides' numbers are chosen (8, 5, 12)";
  wio({
    page: 150, slug: "tally-rides", type: "tally_chart", title: "ট্যালি চিহ্ন দিয়ে রাইডের সারণি পূরণ করি",
    items: [
      mine({ kind: "tally", rows: RIDES, ask: "make" }, PICTURE),
      mine(chart(RIDE_CHART, "most", { text: "কোন রাইডটিতে সবচেয়ে বেশি সংখ্যক শিক্ষার্থী চড়েছিল?" }), PICTURE),
      mine(chart(RIDE_CHART, "least", { text: "কোন রাইডটিতে সবচেয়ে কম সংখ্যক শিক্ষার্থী চড়েছিল?" }), PICTURE),
      mine(chart(RIDE_CHART, "sum", { a: 1, b: 3, text: "কতজন শিক্ষার্থী নাগরদোলা ও আনন্দঘূর্ণিতে চড়েছিল?" }), PICTURE),
      mine(chart(RIDE_CHART, "total", { text: "মোট কতজন শিক্ষার্থী রাইডে চড়েছিল?" }), PICTURE), // the table's মোট row
    ],
    fresh: { skill: "tally" },
    notes: ["পৃষ্ঠা ১৪৯-এর ছবির শিক্ষার্থীদের গোনা যায় না (শুধু রেলগাড়ির ১০ জন বইয়ে ছাপা)। তাই খেলায় নাগরদোলা ৮, উড়ন্ত বিমান ৫ ও আনন্দঘূর্ণি ১২ জন ধরা হয়েছে।"],
    src: "p.150 কাজ ১ (খেলার নাম, ট্যালি চিহ্ন, শিক্ষার্থীর সংখ্যা, মোট; printed: রেলগাড়ি 10), its questions (1)–(3) and the মোট row; 5 fresh tally rounds",
  });
  const COLOURS = [
    { name: "লাল", emoji: "🔴", value: 7 },
    { name: "নীল", emoji: "🔵", value: 5 },
    { name: "হলুদ", emoji: "🟡", value: 9 },
    { name: "সবুজ", emoji: "🟢", value: 4 },
  ];
  const COLOUR_CHART = { rows: COLOURS, key: 1, symbol: "dot", dir: "h", unit: "বার" };
  const SPOKEN = "the teacher's colours are spoken in class: the numbers are chosen (7, 5, 9, 4)";
  wio({
    page: 150, slug: "tally-colours", type: "tally_chart", title: "রঙের নাম গুনে ট্যালি চিহ্ন দিই",
    items: [
      mine({ kind: "tally", rows: COLOURS, ask: "make" }, SPOKEN),
      mine(chart(COLOUR_CHART, "most", { text: "শিক্ষক কোন রংটি সবচেয়ে বেশি সংখ্যক বার বলেছেন?" }), SPOKEN),
      mine(chart(COLOUR_CHART, "sum", { a: 0, b: 2, text: "শিক্ষক লাল এবং হলুদ রং কতবার বলেছেন?" }), SPOKEN),
      mine(chart(COLOUR_CHART, "least", { text: "শিক্ষক কোন রংটি সবচেয়ে কম সংখ্যক বার বলেছেন?" }), SPOKEN),
    ],
    fresh: { skill: "tally", count: 6 },
    notes: ["বইয়ে শিক্ষক রঙের নাম মুখে বলেন; খেলায় রঙের কার্ড একটি একটি করে আসে (লাল ৭, নীল ৫, হলুদ ৯, সবুজ ৪ বার)।"],
    src: "p.150 অনু ১ (রঙের নাম লাল, নীল, হলুদ, সবুজ; ট্যালি চিহ্ন, সংখ্যা), its questions (1)–(2) and the fewest (like কাজ ১ (2)); 6 fresh tally rounds",
  });

  // ── p.151–153: চিত্রলেখ ──
  const FRUITS = { rows: [{ name: "আপেল", emoji: "🍎", value: 5 }, { name: "কলা", emoji: "🍌", value: 4 }, { name: "পেয়ারা", emoji: "🍐", value: 6 }, { name: "আনারস", emoji: "🍍", value: 7 }], key: 1, symbol: "dot", dir: "h", unit: "টি ফল" };
  const SPORTS_ROWS = [
    { name: "দৌড়", emoji: "🏃", value: 50 },
    { name: "মোরগ লড়াই", emoji: "🐓", value: 20 },
    { name: "যেমন খুশি তেমন সাজো", emoji: "🎭", value: 15 },
    { name: "ছবি আঁকা", emoji: "🎨", value: 35 },
  ];
  const SPORTS = { rows: SPORTS_ROWS, key: 10, symbol: "dot", dir: "h", unit: "জন শিক্ষার্থী" };
  const SPORTS_V = { ...SPORTS, dir: "v" };
  wio({
    page: 152, slug: "sports-chart", type: "tally_chart", title: "চিত্রলেখ তৈরি করি ও পড়ি",
    items: [
      it(chart(FRUITS, "make"), [5, 4, 6, 7]), // p.151 মূল প্রশ্ন (printed: the girl's dots)
      it(chart(SPORTS, "make"), [50, 20, 15, 35]), // p.152 কাজ ১ (printed: ●●●●●, ●●, ● ◖, ●●● ◖)
      it(chart(SPORTS_V, "part"), 5), // p.153 (1) ◖ কতজন শিক্ষার্থীর সমান?
      it(chart(SPORTS_V, "most", { text: "কোন প্রতিযোগিতায় সবচেয়ে বেশি সংখ্যক শিক্ষার্থী অংশগ্রহণ করেছে?" }), [0]),
      it(chart(SPORTS_V, "least", { text: "কোন প্রতিযোগিতায় সবচেয়ে কম সংখ্যক শিক্ষার্থী অংশগ্রহণ করেছে?" }), [2]),
      // more questions on the two printed charts (the 10-question rule; the answers from the printed tables)
      it(chart(SPORTS_V, "table"), [50, 20, 15, 35]), // the table beside p.152 কাজ ১, read back from the chart
      it(chart(SPORTS, "value", { a: 3 }), 35), // ছবি আঁকা ●●● ◖
      it(chart(SPORTS, "diff", { a: 0, b: 1 }), 30), // দৌড় 50 − মোরগ লড়াই 20
      it(chart(SPORTS, "total"), 120), // 50 + 20 + 15 + 35
      it(chart(FRUITS, "most"), [3]), // আনারস 7
      it(chart(FRUITS, "total", { text: "ঝুড়িতে মোট কয়টি ফল আছে?" }), 22), // 5 + 4 + 6 + 7
    ],
    src: "p.151 মূল প্রশ্ন (আপেল 5, কলা 4, পেয়ারা 6, আনারস 7; printed), p.152 কাজ ১ (প্রতিটি ● = 10 জন শিক্ষার্থী; printed), p.153 the same chart standing up and (1)–(3); then the sports table, a value, a difference and the total, and the fruits' most and total",
  });
  const VEG = {
    rows: [{ name: "বেগুন", value: 35 }, { name: "ফুলকপি", value: 20 }, { name: "লেবু", value: 60 }, { name: "শসা", value: 50 }, { name: "লাউ", value: 15 }],
    key: 10, symbol: "dot", dir: "h", unit: "টি সবজি",
  };
  const FLOWERS = {
    rows: [{ name: "গোলাপ", value: 100 }, { name: "বেলি", value: 55 }, { name: "জবা", value: 40 }, { name: "কদম", value: 30 }],
    key: 20, symbol: "flower", dir: "h", unit: "জন শিক্ষার্থী",
  };
  wio({
    page: 153, slug: "veg-flower-charts", type: "tally_chart", title: "সবজি ও ফুলের চিত্রলেখ",
    items: [
      it(chart(VEG, "make"), [35, 20, 60, 50, 15]), // অনু ১: 3½, 2, 6, 5, 1½ ●
      it(chart(FLOWERS, "least", { text: "___ ফুলটি সবচেয়ে কম সংখ্যক শিক্ষার্থী পছন্দ করে।" }), [3]), // অনু ২ (1)
      it(chart(FLOWERS, "value", { a: 1, text: "___ জন শিক্ষার্থী বেলি ফুল পছন্দ করে।" }), 55), // (2): 2 ✿ and ¾ ✿
      it(chart(FLOWERS, "total", { text: "মোট শিক্ষার্থীর সংখ্যা ___।" }), 225), // (3)
      // more questions on the two charts (the 10-question rule; the answers from the printed numbers)
      it(chart(FLOWERS, "most"), [0]), // গোলাপ 100
      it(chart(FLOWERS, "part", { a: 1 }), 15), // বেলি's three-leaf flower: ¾ of 20
      it(chart(VEG, "most"), [2]), // লেবু 60
      it(chart(VEG, "total"), 180), // 35 + 20 + 60 + 50 + 15
    ],
    fresh: { skill: "chart" },
    src: "p.153 অনু ১ (সবজি বিক্রির মেমো: বেগুন 35, ফুলকপি 20, লেবু 60, শসা 50, লাউ 15; ● = 10), অনু ২ (প্রতিটি ✿ = 20 জন শিক্ষার্থী: গোলাপ 100, বেলি 55, জবা 40, কদম 30) (1)–(3); then the flowers' most and বেলি's ¾ flower, the vegetables' most and total",
  });

  // ── p.154: no key on the vehicles' chart (⧗ = 2 from 8 গাড়ি); the fish chart's questions ──
  const VEHICLES = {
    rows: [
      { name: "গাড়ি", emoji: "🚗", value: 8 },
      { name: "মোটরসাইকেল", emoji: "🏍️", value: 14 },
      { name: "রিকশা", emoji: "🛺", value: 12 },
      { name: "দোতলা বাস", emoji: "🚌", value: 4 },
      { name: "সাইকেল", emoji: "🚲", value: 8 },
    ],
    key: 2, symbol: "hourglass", dir: "v", unit: "টি যানবাহন",
  };
  const FISH = {
    rows: [{ name: "ইলিশ", value: 16 }, { name: "চিংড়ি", value: 24 }, { name: "বোয়াল", value: 8 }, { name: "রুই", value: 12 }],
    key: 4, symbol: "star", dir: "h", unit: "জন শিক্ষার্থী",
  };
  wio({
    page: 154, slug: "vehicle-fish-charts", type: "tally_chart", title: "চিত্রলেখ দেখে প্রশ্নের উত্তর দিই",
    items: [
      it(chart(VEHICLES, "key", { a: 0 }), 2), // কাজ ২ (1) “শিক্ষার্থীরা 8টি গাড়ি দেখেছিল। প্রতিটি ⧗ = □ যানবাহন?”
      it(chart(VEHICLES, "diff", { a: 1, b: 2, text: "তারা রিকশার চেয়ে □টি মোটরসাইকেল বেশি দেখেছিল।" }), 2), // (2)
      it(chart(VEHICLES, "more", { a: 3, given: 6 }), 1), // (3) “তারা 6টি দোতলা বাস দেখেছিল। চিত্রলেখ-এ তারা ⧗ আরও □ বার আঁকবে।”
      it(chart(VEHICLES, "diff", { a: 1, b: 4, text: "মোটরসাইকেলের চেয়ে সাইকেল □টি কম ছিল।" }), 6), // (4)
      it(chart(FISH, "calc", { text: "9 জন ছেলে শিক্ষার্থীর পছন্দের মাছ হলো ইলিশ। কতজন মেয়ে শিক্ষার্থী ইলিশ মাছ পছন্দ করে?", sum: "#1 - 9" }), 7), // অনু ৩ (1)
      it(chart(FISH, "calc", { text: "12 জন মেয়ে শিক্ষার্থী চিংড়ি মাছ পছন্দ করে। কতজন ছেলে শিক্ষার্থী চিংড়ি মাছ পছন্দ করে?", sum: "#2 - 12" }), 12), // (2)
      it(chart(FISH, "calc", { text: "4 জন ছেলে শিক্ষার্থী রুই মাছ পছন্দ করে। ছেলে শিক্ষার্থীর চেয়ে কতজন বেশি মেয়ে শিক্ষার্থী রুই মাছ পছন্দ করে?", sum: "#4 - 4 - 4" }), 4), // (3): 12 − 4 = 8 girls, 8 − 4 = 4
      // more questions on the two charts (the 10-question rule; the answers from the printed symbols × the key)
      it(chart(VEHICLES, "most", { text: "শিক্ষার্থীরা কোন যানবাহন সবচেয়ে বেশি দেখেছিল?" }), [1]), // মোটরসাইকেল 14
      it(chart(VEHICLES, "total", { text: "শিক্ষার্থীরা মোট কয়টি যানবাহন দেখেছিল?" }), 46), // 8 + 14 + 12 + 4 + 8
      it(chart(FISH, "most", { text: "কোন মাছ সবচেয়ে বেশি সংখ্যক শিক্ষার্থী পছন্দ করে?" }), [1]), // চিংড়ি 24
      it(chart(FISH, "value", { a: 2, text: "কতজন শিক্ষার্থী বোয়াল মাছ পছন্দ করে?" }), 8), // 2 ☆
    ],
    notes: ["বইয়ের যানবাহনের চিত্রলেখে কোনো প্রতীকের মান (⧗ = কত) দেওয়া নেই; প্রথম প্রশ্নে শিশু তা বের করে (৮টি গাড়ি, ৪টি ⧗: ⧗ = ২)। পরের প্রশ্নগুলোতে চিত্রলেখের নিচে “প্রতিটি ⧗ = ২টি যানবাহন” দেখানো হয়।"],
    src: "p.154 কাজ ২ (গাড়ি 4 ⧗, মোটরসাইকেল 7, রিকশা 6, দোতলা বাস 2, সাইকেল 4; no key) (1)–(4), অনু ৩ (প্রতিটি ☆ = 4 জন শিক্ষার্থী: ইলিশ 4 ☆, চিংড়ি 6, বোয়াল 2, রুই 3) (1)–(3); then the vehicles' most and total, the fish's most and বোয়াল",
  });

  // ── p.155: নিজে করি ──
  const BOOKS = {
    rows: [{ name: "বাংলা", value: 30 }, { name: "গণিত", value: 40 }, { name: "ইংরেজি", value: 40 }, { name: "সামাজিক বিজ্ঞান", value: 20 }],
    key: 10, symbol: "box", dir: "h", unit: "টি বই",
  };
  wio({
    page: 155, slug: "library-chart", type: "tally_chart", title: "লাইব্রেরির বইয়ের চিত্রলেখ",
    items: [
      it(chart(BOOKS, "table", { text: "বইয়ের সংখ্যার সারণি তৈরি করি।" }), [30, 40, 40, 20]),
      it(chart(BOOKS, "most", { text: "সবচেয়ে বেশি সংখ্যক বই হলো ___ ও ___।" }), [1, 2]), // (ক) a tie
      it(chart(BOOKS, "which", { given: 30, text: "___ বইয়ের সংখ্যা হলো 30টি।" }), [0]), // (খ)
      it(chart(BOOKS, "total", { text: "মোট বইয়ের সংখ্যা হলো ___।" }), 130), // (গ)
      // more questions on the chart (the 10-question rule)
      it(chart(BOOKS, "least", { text: "সবচেয়ে কম সংখ্যক বই হলো ___।" }), [3]), // সামাজিক বিজ্ঞান 20
      it(chart(BOOKS, "diff", { a: 1, b: 0 }), 10), // গণিত 40 − বাংলা 30
    ],
    fresh: { skill: "chart" },
    src: "p.155 নিজে ৩ (প্রতিটি ▱ = 10টি বই: বাংলা 3, গণিত 4, ইংরেজি 4, সামাজিক বিজ্ঞান 2) the table and (ক)–(গ); then the fewest and গণিত − বাংলা",
  });
  mcq({
    page: 155, slug: "tally-chart-quiz", title: "ট্যালি চিহ্ন ও চিত্রলেখ চিনি",
    questions: [
      q({ prompt: "ট্যালি চিহ্নে প্রথম 4টির প্রতিটির জন্য একটি করে খাড়া রেখা টানা হয়। পঞ্চমটির জন্য কী করা হয়?", options: ["আগের 4টি রেখার আড়াআড়ি দাগ টানা হয়", "আরেকটি খাড়া রেখা টানা হয়", "একটি গোল দাগ দেওয়া হয়", "কোনো দাগ টানা হয় না"], answer: "আগের 4টি রেখার আড়াআড়ি দাগ টানা হয়", why: "পঞ্চমটির জন্য আগের ৪টি রেখার আড়াআড়ি দাগ টানা হয়; তারপর একটু ফাঁক দিয়ে আবার ট্যালি চিহ্ন।" }),
      q({ prompt: "ট্যালি চিহ্নের একটি পূর্ণ দল কয়টি সংখ্যার হিসাব রাখে?", options: ["4টি", "5টি", "6টি", "10টি"], answer: "5টি", num: 5, why: "৪টি খাড়া রেখা আর পঞ্চমটির আড়াআড়ি দাগ: একটি দলে ৫টি।" }),
      q({ prompt: "চিত্রলেখ-এ উপাত্তকে কীসের সাহায্যে প্রকাশ করা হয়?", options: ["চিত্র অথবা প্রতীক", "শুধু অঙ্ক", "শুধু কথা", "ঘড়ির কাঁটা"], answer: "চিত্র অথবা প্রতীক", why: "চিত্রলেখ-এ উপাত্তকে চিত্র অথবা প্রতীক এর সাহায্যে প্রকাশ করা হয়।" }),
      q({ prompt: "প্রতিটি ● = 10 জন শিক্ষার্থী। দৌড়ে 50 জন শিক্ষার্থী অংশ নিলে চিত্রলেখ-এ কয়টি ● আঁকতে হবে?", options: ["5টি", "10টি", "50টি", "15টি"], answer: "5টি", num: 5, why: "১০ জন করে একটি দল: ৫০ ÷ ১০ = ৫টি ●।" }),
      q({ prompt: "একই উপাত্ত দিয়ে আঁকা দুইটি চিত্রের একটিতে প্রতীকগুলো পাশাপাশি, অন্যটিতে খাড়া করে সাজানো। দুইটি চিত্রকেই কি চিত্রলেখ বলতে পারি?", options: ["হ্যাঁ, দুইটিই চিত্রলেখ", "না, শুধু পাশাপাশিটি", "না, শুধু খাড়াটি", "না, কোনোটিই নয়"], answer: "হ্যাঁ, দুইটিই চিত্রলেখ", why: "দুইটিতেই একই উপাত্ত প্রতীক দিয়ে দেখানো হয়েছে; শুধু সাজানোর দিক আলাদা।" }),
      // more of the pages' printed sentences and charts (the 10-question rule)
      q({ prompt: "ট্যালি চিহ্নে 5টির একটি দল শেষ হলে কী করা হয়?", options: ["একটু ফাঁক দিয়ে আবার ট্যালি চিহ্ন দেওয়া হয়", "দলটি মুছে ফেলা হয়", "একটি গোল দাগ দেওয়া হয়", "আর ট্যালি চিহ্ন দেওয়া হয় না"], answer: "একটু ফাঁক দিয়ে আবার ট্যালি চিহ্ন দেওয়া হয়", why: "৫টির দল শেষ হলে একটু ফাঁক দিয়ে আবারও ট্যালি চিহ্ন দেওয়া হয়।" }),
      q({ prompt: "ছোটো মণিদের রেলগাড়ির সারিতে ট্যালি চিহ্নের দুইটি পূর্ণ দল। কতজন শিক্ষার্থী রেলগাড়িতে চড়েছিল?", options: ["2 জন", "5 জন", "10 জন", "20 জন"], answer: "10 জন", num: 10, why: "প্রতিটি পূর্ণ দলে ৫টি: ৫ + ৫ = ১০ জন।" }),
      q({ prompt: "বড়ো আকারের উপাত্তকে কীভাবে খুব সহজেই চিত্রলেখ-এ প্রকাশ করা যায়?", options: ["দলের মাধ্যমে (যেমন: 10-এর দলে)", "সংখ্যাগুলো যোগ করে", "শুধু কথায় লিখে", "ট্যালি চিহ্ন মুছে"], answer: "দলের মাধ্যমে (যেমন: 10-এর দলে)", why: "বড়ো আকারের উপাত্তকে দলের মাধ্যমে খুব সহজেই চিত্রলেখ-এ প্রকাশ করা যায়: প্রতিটি ● = ১০ জন।" }),
      q({ prompt: "প্রতিটি ● = 10 জন শিক্ষার্থী। অর্ধেক ● কতজন শিক্ষার্থীর সমান?", options: ["2 জন", "5 জন", "10 জন", "15 জন"], answer: "5 জন", num: 5, why: "পুরো ● = ১০ জন, তাই অর্ধেক ● = ১০ ÷ ২ = ৫ জন।" }),
      q({ prompt: "প্রতিটি ☆ = 4 জন শিক্ষার্থী। চিংড়ি মাছের সারিতে 6টি ☆। কতজন শিক্ষার্থী চিংড়ি মাছ পছন্দ করে?", options: ["6 জন", "10 জন", "24 জন", "64 জন"], answer: "24 জন", num: 24, why: "৬টি ☆, প্রতিটি ৪ জন: ৬ × ৪ = ২৪ জন।" }),
    ],
    src: "p.150 (ট্যালি চিহ্ন: খাড়া রেখা, পঞ্চমটি আড়াআড়ি, 5টি করে দল, ফাঁক দিয়ে আবার; printed: রেলগাড়ি দুই দল = 10), p.151 box (চিত্র অথবা প্রতীক), p.152 (● = 10, দৌড় 50 = ●●●●●; parrot: দলের মাধ্যমে), p.153 (1) (◖ = 5), p.154 অনু ৩ (☆ = 4, চিংড়ি 6 ☆), p.155 নিজে ২ (the juice charts, horizontal and vertical)",
  });

  // ── notes ──
  note("p.149–150 কাজ ১: the park picture is too small to count (only the train's 10 is printed on p.150), so the game uses নাগরদোলা 8 (4 gondolas of 2), উড়ন্ত বিমান 5, আনন্দঘূর্ণি 12 (total 35); its answers (most আনন্দঘূর্ণি, least উড়ন্ত বিমান, নাগরদোলা + আনন্দঘূর্ণি = 20) follow. The guide note says so. These four items are mine().");
  note("p.150 অনু ১: the teacher's spoken colours become cards shown one by one (a tally round), with লাল 7, নীল 5, হলুদ 9, সবুজ 4 (mine; answers হলুদ, 7 + 9 = 16). The guide note says so.");
  note("p.150's questions (most, least, the sum of two rows) are asked on a dot pictograph of the same numbers (প্রতিটি ● = ১): a tally round asks only each row's number and the total.");
  note("p.154 কাজ ২: the vehicles' chart has no key; (1) hides it and asks it (8 গাড়ি, 4 ⧗ → ⧗ = 2); (2)–(4) show “প্রতিটি ⧗ = ২টি যানবাহন” under the chart. The guide note says so. (3) asks the player's own words (“দোতলা বাস-এর সংখ্যা ৬ হলে আর কয়টি ⧗ আঁকতে হবে?”) with the symbol drawn, as does (1), and p.153 (1) (“◖ কতর সমান?”): the book's ⧗ and ◖ aren't safe characters on every phone.");
  note("p.153 অনু ১ prints no key; it uses p.152's ● = 10 (the survey's answer 3½, 2, 6, 5, 1½). The direction of p.153 অনু ২, p.154 অনু ৩ and p.155 নিজে ৩'s charts isn't in the survey: drawn across (h). p.153's sports chart is drawn standing up (v) as printed, p.154's vehicles too.");
  note("p.154 অনু ৩ (3) asks how many more girls than boys like রুই: 12 − 4 = 8 girls, 8 − 4 = 4 (one sum, “#4 − 4 − 4”).");
  note("p.155 নিজে ২ (are both juice charts pictographs?) is a multiple-choice question (হ্যাঁ, the survey's answer), with p.150–152's facts on tally marks and pictographs (questions of mine from the printed sentences; ● = 10 → দৌড় 50 = 5 ●).");
  note("Every activity has at least 10 questions (the user, 3 Nov). The pictograph games ask more about their own printed charts (one question per item, the same chart again): p.152 the sports table read back, ছবি আঁকা's value, দৌড় − মোরগ লড়াই, the total, the fruits' most and total (22); p.153 the flowers' most and বেলি's three-leaf flower (¾ of 20 = 15), the vegetables' most and total (180); p.154 the vehicles' most and total (46), the fish's most and বোয়াল (8); p.155 the fewest books and গণিত − বাংলা (10). The tally games add the rides' total (the table's মোট row, 35) and the colours' fewest (সবুজ), both mine() like the rest of p.150, and top up with fresh tally rounds (5 and 6). The multiple choice adds p.150's gap between groups and the printed train (two full groups = 10), p.152's parrot (দলের মাধ্যমে), half a ● (p.153 (1)) and p.154's 6 ☆ = 24.");
  note("Chart units after the key and the answers: জন শিক্ষার্থী (rides, sports, flowers, fish), বার (colours), টি ফল, টি সবজি, টি যানবাহন, টি বই. p.151's guava has the pear picture 🍐 (there is no guava emoji); the vegetables, flowers, fish and books have no pictures.");

  cant("p.149–150: counting the riders in the park picture (too small); the numbers are chosen.");
  cant("p.150 অনু ১: listening to the teacher (a spoken stream would need recorded voices); cards one by one instead.");
  cant("p.151: the boy's chart of fruit pictures (one picture each) is the same numbers as the girl's dot chart, which is the make round.");
  cant("p.155 নিজে ১ (list the trees around home and make a table and a pictograph): the child's own data.");
  cant("p.155 নিজে ২ “সহপাঠীদের সঙ্গে আলোচনা করে মতামত দিই”: discussion; the yes/no is a multiple-choice question.");
};
