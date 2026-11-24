// Pages ১৪৩–১৫৬ (অধ্যায় ১০ · জ্যামিতি, its first half), written by Claude (helper for pp. 143–174), 24 Nov 2026.
// The book: ../class4-math-redesign/content/p143-156.js (+ .parts.js: every angle, line, protractor, set square, clock and the
// road map, drawn true to the degree; its angles are the book's named sizes, the unnamed ones at the nearest 5°).
// p.143: কোণ কী (corners in pictures, two papers turned); p.144: angles named ক খ গ, the degree; p.145: the protractor, ৯০°,
// ৪৫°, ৬০°, ৩০°, সূক্ষ্মকোণ; p.146: স্থূলকোণ, measuring ∠ক = ৫০°, অনুশীলন ১ (৬০°, ৩৫°, ৯০°, ১১০°); p.147: drawing a ৫০° angle;
// p.148: the set squares, the table of angles; p.149: angles found without measuring (the house), the clocks, angles on
// squared paper; pp.150–151: লম্বরেখা (the road map); pp.152–155: সমান্তরাল রেখা, a line across, a perpendicular drawn with a
// protractor and with set squares; p.156: দেখি পারি কি না.
"use strict";
module.exports = (L) => {
  const { it, wio, mcq, q, sort, note, cant } = L;
  const G = "angles_dots";
  // angles: named (deg in fives, the drawing turned by rot), made, read off a protractor, drawn on one, a clock's hands
  const name = (deg, rot = 0) => it({ kind: "angle", deg, rot, ask: "name" }, deg < 90 ? "acute" : deg === 90 ? "right" : deg < 180 ? "obtuse" : "straight");
  const make = (type) => it({ kind: "angle", ask: "make", type }, type);
  const measure = (deg, from = "right") => it({ kind: "angle", ask: "measure", deg, from }, deg);
  const draw = (deg, from = "right") => it({ kind: "angle", ask: "draw", deg, from }, deg);
  const clock = (h, m, want) => it({ kind: "angle", ask: "clock", h, m }, want);
  // two lines (directions in degrees; apart: pictured made longer): perp, par or neither
  const lines = (a, b, cross = true) => {
    const d = Math.abs(a - b);
    return it({ kind: "lines", a, b, ...(cross ? {} : { cross: false }) }, d === 90 ? "perp" : d === 0 ? "par" : "neither");
  };
  // an angle of a type on a dot grid
  const dotAngle = (type, w, h) => it({ kind: "dots", task: "angle", w, h, type }, type);
  // a hidden angle: a number sentence with one box, the question in words
  const hidden = (text, story, want) => it({ kind: "missing", text, story }, want);

  // ════════════════════ p.143–144: কোণ কী ════════════════════
  sort({
    page: 143, slug: "find-corners", title: "ছবিতে কোণা বা কোণ খুঁজি",
    categories: ["কোণা বা কোণ আছে", "কোণা বা কোণ নেই"],
    items: [
      ["ঘড়ির ঘণ্টা ও মিনিটের কাঁটা দুইটি", 0], ["টেবিলের উপরের তল", 0], ["জানালার কাঠের ফ্রেম", 0], ["বাড়ির চালা", 0],
      ["বইয়ের মলাট", 0], ["রিকশার হাতল ও রড", 0], ["বর্গাকার কাগজ", 0],
      ["গোলাকার কাগজের কিনারা", 1], ["ঘড়ির গোল কিনারা", 1], ["রিকশার চাকা", 1], ["একটি বল", 1], ["একটি পয়সা", 1],
    ],
    src: "p.143 কাজ ১ (the clock, the table, the window, the house, the books and the rickshaw: each has a corner or an angle) and কাজ ২ (the square and the round paper); the round things with no corner (the clock's rim, the rickshaw's wheel, a ball, a coin) are ours, so that the sort has two sides",
  });

  mcq({
    page: 144, slug: "what-is-an-angle", title: "কোণ কী এবং কোণের পরিমাপ কীভাবে প্রকাশ করি",
    questions: [
      q({ prompt: "কোণ কীভাবে উৎপন্ন হয়?", options: ["দুইটি রেখা একটি বিন্দুতে মিলিত হলে", "একটি রেখা লম্বা করলে", "একটি বৃত্ত আঁকলে", "একটি বিন্দু আঁকলে"], answer: "দুইটি রেখা একটি বিন্দুতে মিলিত হলে", why: "দুইটি রেখা একটি বিন্দুতে মিলিত হলে সেখানে কোণ তৈরি হয়; মিলিত বিন্দুটি কোণের শীর্ষবিন্দু।" }),
      q({ prompt: "গোলাকার কাগজটি বর্গাকার কাগজের মাঝে ঢুকিয়ে ঘুরালে কী তৈরি হয়?", options: ["বিভিন্ন আকারের কোণ", "একটি ত্রিভুজ", "একটি বৃত্ত", "একটি সরলরেখা"], answer: "বিভিন্ন আকারের কোণ", why: "কাগজটি যত ঘুরাই, কোণের আকার তত বদলায়: এভাবে বিভিন্ন আকারের কোণ তৈরি হয়।" }),
      q({ prompt: "গোলাকার কাগজটি যত বেশি ঘুরাই, কোণটি তত —", options: ["বড়ো হয়", "ছোটো হয়", "একই থাকে"], answer: "বড়ো হয়", why: "বেশি ঘুরালে রেখা দুইটি বেশি খোলা হয়, তাই কোণটি বড়ো হয়।" }),
      q({ prompt: "কোণের আকৃতি কিসের উপর নির্ভর করে?", options: ["রেখা দুইটি কতখানি খোলা বা দূরে তার উপর", "রেখা দুইটির দৈর্ঘ্যের উপর", "রেখার রঙের উপর"], answer: "রেখা দুইটি কতখানি খোলা বা দূরে তার উপর", why: "কোণের আকৃতি রেখা দুইটির দৈর্ঘ্যের সঙ্গে সম্পর্কিত নয়, রেখাদ্বয় কতখানি খোলা বা দূরে তার উপর নির্ভরশীল।" }),
      q({ prompt: "একটি কোণের বাহু দুইটি আরও লম্বা করে আঁকলে কোণটির কী হয়?", options: ["কোণটি একই থাকে", "কোণটি বড়ো হয়", "কোণটি ছোটো হয়"], answer: "কোণটি একই থাকে", why: "বাহু লম্বা করলে রেখা দুইটি একই রকম খোলা থাকে, তাই কোণটি একই থাকে।" }),
      q({ prompt: "কোণের আকৃতি পরিমাপের একক কী?", options: ["ডিগ্রি", "সেন্টিমিটার", "গ্রাম", "লিটার"], answer: "ডিগ্রি", why: "কোণের আকৃতি পরিমাপের একক হলো ডিগ্রি।" }),
      q({ prompt: "ডিগ্রিকে কোন চিহ্ন দিয়ে প্রকাশ করা হয়?", options: ["°", "×", "÷", "="], answer: "°", why: "ডিগ্রিকে ‘°’ দ্বারা প্রকাশ করা হয়: যেমন 90° (নব্বই ডিগ্রি)।" }),
      q({ prompt: "কোণ খকগ-এর শীর্ষবিন্দু কোনটি?", options: ["ক", "খ", "গ"], answer: "ক", why: "কোণের নামের মাঝের বর্ণটি শীর্ষবিন্দু: খকগ কোণের শীর্ষবিন্দু ক।" }),
      q({ prompt: "30°, 90° ও 135° কোণের মধ্যে কোনটি সবচেয়ে বড়ো?", options: ["135°", "90°", "30°"], answer: "135°", why: "ডিগ্রির সংখ্যা যত বড়ো, কোণটি তত বেশি খোলা: 135° সবচেয়ে বড়ো।" }),
      q({ prompt: "45° ও 60° কোণের মধ্যে কোনটি ছোটো?", options: ["45°", "60°", "দুইটি সমান"], answer: "45°", why: "45 < 60, তাই 45° কোণটি ছোটো।" }),
    ],
    src: "p.143 মূল প্রশ্ন (কোণ কী এবং কীভাবে কোণ উৎপন্ন হয়?) and কাজ ২ (the papers turned), p.144 (the papers turned 30°, 90°, 135°; ক খ গ; the boy: the size depends on the opening, not the lengths; the note: ডিগ্রি, °); the last two compare the turned papers' angles",
  });

  // ════════════════════ p.145–147: চাঁদা ════════════════════
  wio({
    page: 145, slug: "protractor-90", type: G, title: "চাঁদায় সমকোণ ও সূক্ষ্মকোণ পড়ি",
    items: [
      measure(90), measure(45), measure(60), measure(30),
      name(90), name(45, 20), name(60, 10), name(30, 40),
      make("right"), make("acute"),
    ],
    src: "p.145 the four protractors (৯০° সমকোণ, ৯০° এর ১/২ = ৪৫°, ২/৩ = ৬০°, ১/৩ = ৩০°) read off, then each angle named (the parrot: ৯০° অপেক্ষা ছোটো কোণকে সূক্ষ্মকোণ বলে), then a right and an acute angle made by turning an arm (p.143 কাজ ২'s papers); no fresh rounds (স্থূলকোণ comes on p.146)",
  });

  wio({
    page: 146, slug: "measure-angles", type: G, title: "চাঁদার সাহায্যে কোণ পরিমাপ করি",
    items: [
      measure(50), // কাজ ১ ∠ক
      measure(60), measure(35, "left"), measure(90), measure(110), // অনুশীলন ১ ক খ গ ঘ
      name(110), name(50), name(35, 145), name(60),
      make("obtuse"),
    ],
    src: "p.146 কাজ ১ (∠ক = ৫০°, the arm কখ on ০°), অনুশীলন ১ (ক ৬০°, খ ৩৫° its base to the left, গ ৯০°, ঘ ১১০°: our drawings' sizes), then the angles named (the top: ১১০° স্থূলকোণ, the parrot: ৯০° চেয়ে বড়ো ও ১৮০° চেয়ে ছোটো) and an obtuse angle made",
  });

  wio({
    page: 147, slug: "draw-angles", type: G, title: "চাঁদার সাহায্যে কোণ আঁকি",
    items: [
      draw(50), // কাজ ২
      draw(30), draw(45, "left"), draw(60), draw(90, "left"), draw(110), draw(35, "left"), draw(120),
      measure(50, "left"), measure(120, "left"),
    ],
    src: "p.147 কাজ ২ (৫০° পরিমাপের একটি কোণ আঁকি: ক খ রেখা, চাঁদার কেন্দ্র ক-তে, ৫০° বরাবর গ); then the angles of pp.145–146 (৩০°, ৪৫°, ৬০°, ৯০°, ১১০°, ৩৫°) and ১২০° drawn the same way, some from the left end, and two read back",
  });
  cant("p.147 অনুশীলন ২–৩ (in groups, measure the corners of the textbook, the blackboard and a window, and the angle of the classroom's open door chalked on the floor): real things in the room; the games measure and draw angles on a drawn protractor instead.");

  // ════════════════════ p.148: ত্রিকোণী সেট, কোণের শ্রেণিবিভাগ ════════════════════
  wio({
    page: 148, slug: "set-squares", type: G, title: "ত্রিকোণী সেটের কোণ মাপি ও কোণের নাম বলি",
    items: [
      measure(90), measure(30, "left"), measure(60), // the 30°–60° set square
      measure(45), measure(45, "left"), measure(90, "left"), // the 45° set square
      name(60), name(90, 30), name(115), name(180), // the table
    ],
    fresh: { skill: "angle", count: 5 },
    src: "p.148 কাজ ৩ (the two set squares: ৯০°, ৩০°, ৬০° and ৯০°, ৪৫°, ৪৫°, each read off a protractor) and the table (৯০°এর ছোটো সূক্ষ্মকোণ, ৯০° সমকোণ, ৯০°এর বড়ো এবং ১৮০°এর ছোটো স্থূলকোণ, ১৮০° সরলকোণ: its four angles named); 5 fresh rounds (name or make an angle)",
  });
  sort({
    page: 148, slug: "angle-by-size", title: "পরিমাপ দেখে কোণের নাম লিখি",
    categories: ["সূক্ষ্মকোণ", "সমকোণ", "স্থূলকোণ", "সরলকোণ"],
    items: [
      ["30°", 0], ["45°", 0], ["60°", 0], ["15°", 0], ["89°", 0],
      ["90°", 1],
      ["110°", 2], ["115°", 2], ["125°", 2], ["150°", 2], ["91°", 2], ["179°", 2],
      ["180°", 3],
    ],
    src: "p.148 the table (৯০°এর ছোটো: সূক্ষ্মকোণ; ৯০°: সমকোণ; ৯০°এর বড়ো এবং ১৮০°এর ছোটো: স্থূলকোণ; ১৮০°: সরলকোণ) with the chapter's own angles (৩০°, ৪৫°, ৬০°, ১১০°, ১১৫°, p.156's ১৫°, ১২৫°, ১৫০°) and ৮৯°, ৯১°, ১৭৯° (ours, by the borders)",
  });

  // ════════════════════ p.149: পরিমাপ না করে, ঘড়ির কাঁটা, ছক কাগজ ════════════════════
  wio({
    page: 149, slug: "hidden-angles", title: "পরিমাপ না করে লুকানো কোণের মান বের করি",
    items: [
      hidden("□ + 60 = 180", "বাড়ির চালে ∠ক ও 60° কোণ পাশাপাশি একটি সরলরেখার উপর আছে। পরিমাপ না করে ∠ক-এর মান নির্ণয় করি।", 120),
      hidden("2 × □ = 180", "দরজার পাশে ∠খ-তে সমকোণের চিহ্ন দেওয়া আছে। দুইটি সমকোণ মিলে একটি সরলকোণ (180°)। ∠খ কত ডিগ্রি?", 90),
      hidden("□ + 20 = 90", "জানালার কোনাটি একটি সমকোণ। কোনাকুনি রেখাটি একে 20° ও ∠গ-তে ভাগ করেছে। ∠গ কত ডিগ্রি?", 70),
      hidden("□ + 40 = 180", "জানালার কোনাকুনি রেখা দুইটি পরস্পরকে ছেদ করেছে। ∠ঙ ও 40° কোণ পাশাপাশি একটি সরলরেখার উপর আছে। ∠ঙ কত ডিগ্রি?", 140),
      hidden("□ + 140 = 180", "∠ঘ ও ∠ঙ (140°) পাশাপাশি একটি সরলরেখার উপর আছে। ∠ঘ কত ডিগ্রি?", 40),
      hidden("35 + □ = 90", "একটি সমকোণকে একটি রেখা 35° ও ∠ক-তে ভাগ করেছে। লুকায়িত কোণ ∠ক কত ডিগ্রি?", 55),
      hidden("30 + □ = 180", "দুইটি সরলরেখা পরস্পরকে ছেদ করে চারটি কোণ তৈরি করেছে; একটি কোণ 30°। এর উপরের পাশের কোণটি কত ডিগ্রি?", 150),
      hidden("150 + □ = 180", "উপরের কোণটি 150°। এর বাম পাশের কোণটি (30° কোণের বিপরীত কোণ) কত ডিগ্রি?", 30),
      hidden("180 − 30 = □", "নিচের কোণটি 30° কোণের সঙ্গে পাশাপাশি একটি সরলরেখার উপর আছে। নিচের কোণটি কত ডিগ্রি?", 150),
      hidden("180 + 30 = □", "ড্যাশ দেওয়া রেখাটি গক রেখাকে সোজা বাড়িয়ে আঁকা (একটি সরলকোণ, 180°), আর কখ রেখা ড্যাশ রেখার সঙ্গে 30° কোণ তৈরি করেছে। লাল দাগ দেওয়া ∠খকগ কত ডিগ্রি?", 210),
    ],
    src: "p.149 কাজ ৪ (the house: ∠ক with ৬০° on the roof, ∠খ the door's right angle, the window's ২০°: ∠গ, its diagonals' ৪০°: ∠ঙ and ∠ঘ), p.156 দেখি পারি কি না ৩ (লুকায়িত কোণ: ৩৫° in a right angle, the crossing lines' ৩০° and their three boxes) and ৪ (১) (the red arc: ১৮০° + ৩০°); each as a number sentence with its question in words",
  });
  note("p.156 দেখি পারি কি না ৪ (১): the red arc marks the angle খকগ the long way round, ১৮০° + ৩০° = ২১০°, bigger than a সরলকোণ; the chapter never shows an angle over ১৮০° (its table stops at সরলকোণ) and a protractor can't read it. The game asks it in the hidden-angle game as 180 + 30 = □ (the dashed line is the straight angle). Please check that ২১০° is what the book means (the inside angle খকগ is ১৫০°).");

  wio({
    page: 149, slug: "clock-angles", type: G, title: "ঘড়ির ঘণ্টা ও মিনিটের কাঁটার মধ্যের কোণ মাপি",
    items: [
      clock(3, 0, 90), clock(2, 0, 60), clock(6, 0, 180), clock(4, 30, 45), // অনুশীলন ৪ (১)–(৪)
      clock(1, 0, 30), clock(4, 0, 120), clock(5, 0, 150), clock(9, 0, 90), clock(10, 0, 60), clock(3, 30, 75),
    ],
    src: "p.149 অনুশীলন ৪ (১) ৩টা ৯০°, (২) ২টা ৬০°, (৩) ৬টা ১৮০°, (৪) ৪:৩০ ৪৫°; then six clocks of ours (১টা, ৪টা, ৫টা, ৯টা, ১০টা, ৩:৩০), the angle at most ১৮০°",
  });

  wio({
    page: 149, slug: "dot-angles", type: G, title: "ছক কাগজে বিভিন্ন ধরনের কোণ আঁকি ও নাম বলি",
    items: [
      dotAngle("right", 8, 5), dotAngle("acute", 8, 5), dotAngle("obtuse", 8, 5), dotAngle("straight", 8, 5),
      dotAngle("acute", 10, 7), dotAngle("obtuse", 10, 7), dotAngle("right", 10, 7), dotAngle("straight", 10, 7),
    ],
    fresh: { skill: "angle", count: 5 },
    src: "p.149 অনুশীলন ৫ (পেনসিল দিয়ে ছক কাগজে বিভিন্ন ধরনের কোণ এঁকে নামকরণ করি: সমকোণ, সূক্ষ্মকোণ, স্থূলকোণ, সরলকোণ), each drawn on a dot grid twice; 5 fresh rounds (name or make an angle)",
  });

  // ════════════════════ p.150–151: লম্বরেখা ════════════════════
  wio({
    page: 150, slug: "perpendicular-map", type: G, title: "মানচিত্রে লম্ব রেখা খুঁজি",
    items: [
      lines(0, 106), // ক: the road ট across ঙ
      lines(0, 90), // খ: the road down from খ on চ
      lines(90, 0), // গ: জ across চ
      lines(0, 102), // ঞঢ across চ, by the playground
      lines(7, 90), // ড meets ঝছ
      lines(30, 120), // the parrot's second picture
      lines(60, 150), lines(45, 100), lines(15, 105), lines(170, 80),
    ],
    src: "p.150 মূল প্রশ্ন and কাজ ১ (the road map: at ক the slanting road ট crosses ঙ, not at a right angle; খ and গ meet চ at right angles; the roads ঞঢ and ড cross others slantwise), the parrot's pictures (one turned 30°); four pairs of ours turned other ways",
  });
  note("p.150 কাজ ১ ঘ: the road ঠ meets চ at ঘ at a right angle from above, but the road below ঘ leans a little (about ৮৬°), so «ঘ» could be read either way; the games ask only ক (not a right angle), খ and গ (right angles).");

  wio({
    page: 151, slug: "perpendicular-extended", type: G, title: "রেখা বাড়ালে লম্ব হবে কি না দেখি",
    items: [
      lines(0, 90, false), // কাজ ২
      lines(0, 90), lines(105, 30), lines(135, 45, false), // অনুশীলন ২ ক খ গ
      lines(30, 120, false), lines(20, 90, false), lines(150, 60, false), lines(0, 70, false), lines(100, 10, false), lines(45, 160, false),
    ],
    src: "p.151 কাজ ২ (the level line made longer: শুধু লম্ব হবে), অনুশীলন ২ (ক two lines meeting in a corner: লম্ব; খ ১০৫° and ৩০°: not; গ two lines apart at ১৩৫° and ৪৫°: লম্ব when made longer); then six pairs of ours drawn apart",
  });

  mcq({
    page: 151, slug: "perpendicular-quiz", title: "লম্ব রেখা চিনি",
    questions: [
      q({ prompt: "একটি রেখা অপর একটি রেখার উপর কখন লম্ব হয়?", options: ["যখন এরা একে অপরকে সমকোণে ছেদ করে বা মিলিত হয়", "যখন এরা কখনো মিলিত হয় না", "যখন এরা সূক্ষ্মকোণে মিলিত হয়"], answer: "যখন এরা একে অপরকে সমকোণে ছেদ করে বা মিলিত হয়", why: "একটি রেখা অপর একটি রেখার উপর লম্ব হবে যখন এরা একে অপরকে সমকোণে ছেদ করে বা মিলিত হয়।" }),
      q({ prompt: "দুইটি লম্ব রেখা মিলিত হলে কত ডিগ্রি কোণ তৈরি হয়?", options: ["90°", "45°", "180°", "60°"], answer: "90°", why: "লম্ব রেখা দুইটি সমকোণে মিলিত হয়, আর সমকোণ = 90°।" }),
      q({ prompt: "মানচিত্রে ক, খ, গ বিন্দুর মধ্যে কোন বিন্দুতে রাস্তা দুইটি সমকোণে মিলিত হয়নি?", options: ["ক", "খ", "গ"], answer: "ক", why: "ক বিন্দুতে ট রাস্তাটি হেলানোভাবে ঙ রাস্তাকে ছেদ করেছে; খ ও গ বিন্দুতে রাস্তাগুলো সমকোণে মিলিত।" }),
      q({ prompt: "চিত্রের আনুভূমিক রেখাটিকে আরও বাড়ানো হলে রেখা দুইটি কীভাবে একটি আরেকটিকে ছেদ করবে?", options: ["সমকোণে, তারা লম্ব হবে", "কখনো ছেদ করবে না", "সূক্ষ্মকোণে ছেদ করবে"], answer: "সমকোণে, তারা লম্ব হবে", why: "উলম্ব রেখার সঙ্গে আনুভূমিক রেখা সমকোণে মিলিত হয়: বাড়ালে তারা লম্ব হবে।" }),
      q({ prompt: "মূল প্রশ্নের মানচিত্রে আরও এক জোড়া লম্বরেখা কোনটি?", options: ["জ ও ঙ রাস্তা", "ট ও ঙ রাস্তা", "ঙ ও চ রাস্তা"], answer: "জ ও ঙ রাস্তা", why: "জ রাস্তা খাড়া আর ঙ রাস্তা আনুভূমিক: এরা সমকোণে ছেদ করেছে। ট হেলানো, আর ঙ ও চ পাশাপাশি।" }),
      q({ prompt: "চিত্র-১-এ কোন রেখা দুইটি পরস্পর লম্ব?", options: ["ঝছ ও ঙক", "ঞঢ ও ঙক", "ঝছ ও ঞঢ"], answer: "ঝছ ও ঙক", why: "খাড়া ঝছ রেখা আনুভূমিক ঙক রেখাকে সমকোণে ছেদ করেছে; ঞঢ রেখাটি হেলানো।" }),
      q({ prompt: "চিত্র-২-এ কোন রেখা দুইটি সব জায়গায় সমান দূরে?", options: ["ঙক ও গঘ", "ঝছ ও ঙক", "ঝছ ও গঘ"], answer: "ঙক ও গঘ", why: "ঙক ও গঘ দুইটিই আনুভূমিক, সব জায়গায় সমান দূরে; ঝছ এদের দুইটিকেই সমকোণে ছেদ করেছে।" }),
      q({ prompt: "নিচের কোনটিতে লম্ব রেখা দেখা যায়?", options: ["জানালার পাশের ধার ও নিচের ধার", "একটি বলের কিনারা", "রিকশার চাকা", "একটি ডিমের খোসা"], answer: "জানালার পাশের ধার ও নিচের ধার", why: "জানালার কোনায় পাশের ধার ও নিচের ধার সমকোণে মিলিত: এরা পরস্পর লম্ব।" }),
      q({ prompt: "খাড়া দরজার পাশের ধার ও মেঝে কেমন রেখা তৈরি করে?", options: ["লম্ব রেখা", "সমান্তরাল রেখা", "বক্ররেখা"], answer: "লম্ব রেখা", why: "দরজার পাশের ধার মেঝের সঙ্গে সমকোণে মিলিত, তাই এরা লম্ব।" }),
      q({ prompt: "একটি বর্গাকার কাগজের পাশাপাশি দুইটি ধার কেমন?", options: ["পরস্পর লম্ব", "পরস্পর সমান্তরাল", "কখনো মিলিত হয় না"], answer: "পরস্পর লম্ব", why: "বর্গাকার কাগজের প্রতিটি কোনা সমকোণ, তাই পাশাপাশি দুইটি ধার পরস্পর লম্ব।" }),
    ],
    src: "p.150 the parrot (লম্ব), কাজ ১ (ক: not a right angle), p.151 কাজ ২ (made longer: লম্ব), অনুশীলন ১ (another pair on the map), কাজ ৩ (ক) চিত্র-১ and (খ) চিত্র-২ as printed, অনুশীলন ৩ (things around us with perpendicular lines: a window, a door, a square paper)",
  });

  // ════════════════════ p.152–155: সমান্তরাল রেখা ════════════════════
  wio({
    page: 152, slug: "parallel-lines", type: G, title: "সমান্তরাল রেখা ও লম্ব রেখা চিনি",
    items: [
      lines(0, 0, false), lines(0, 90), // the first picture: two level lines, a line across at right angles
      lines(140, 140, false), lines(140, 50), // the second: two slanting lines, a line across at right angles
      lines(90, 90, false), // অনুশীলন ৪: the map's জ and ঝ
      lines(2, 2, false), lines(94, 74, false), lines(114, 94, false), // অনুশীলন ৫: কছ ∥ গঝ; the three lines across
      lines(30, 30, false), lines(60, 75, false), lines(120, 120, false), lines(45, 135),
    ],
    fresh: { skill: "lines", count: 5 },
    src: "p.152 (দুইটি রেখা সর্বদা সমান দূরত্বে: সমান্তরাল; the two pictures with a line across at right angles), অনুশীলন ৪ (another pair on the map: জ and ঝ), অনুশীলন ৫ (কছ and গঝ parallel; the lines across ঘঠ, ঙট, চঞ are not); four pairs of ours; 5 fresh rounds",
  });

  mcq({
    page: 152, slug: "parallel-quiz", title: "সমান্তরাল রেখা চিনি",
    questions: [
      q({ prompt: "দুইটি রেখা কখন সমান্তরাল হয়?", options: ["যখন সর্বদা একে অপর থেকে সমান দূরত্বে থাকে", "যখন সমকোণে মিলিত হয়", "যখন একটি বিন্দুতে মিলিত হয়"], answer: "যখন সর্বদা একে অপর থেকে সমান দূরত্বে থাকে", why: "দুইটি রেখা যদি সর্বদা একে অপর থেকে সমান দূরত্বে থাকে তখন তারা সমান্তরাল হয়।" }),
      q({ prompt: "দুইটি সমান্তরাল রেখাকে যেকোনো দূরত্ব পর্যন্ত বাড়ালে কী হয়?", options: ["এরা কখনোই একে অপরের সঙ্গে মিলিত হয় না", "এরা একসময় মিলিত হয়", "এরা সমকোণে মিলিত হয়"], answer: "এরা কখনোই একে অপরের সঙ্গে মিলিত হয় না", why: "সমান্তরাল রেখা সব সময় সমান দূরত্বে থাকে; যত বাড়ানো হোক, এরা কখনোই মিলিত হয় না।" }),
      q({ prompt: "চছ ও জঝ সমান্তরাল রেখা। এদের মাঝে লম্বভাবে আঁকা কখ, গঘ ও ঙম-এর দৈর্ঘ্য কেমন?", options: ["তিনটিই সমান", "কখ সবচেয়ে বড়ো", "ঙম সবচেয়ে বড়ো"], answer: "তিনটিই সমান", why: "সমান্তরাল রেখা দুইটির দূরত্ব সব জায়গায় সমান, তাই কখ, গঘ ও ঙম তিনটিই সমান।" }),
      q({ prompt: "সমান্তরাল রেখার আদর্শ হিসেবে আমরা কোনটি কল্পনা করতে পারি?", options: ["দুইটি সরল রেললাইন", "ঘড়ির দুইটি কাঁটা", "রিকশার চাকা", "বাড়ির চালা"], answer: "দুইটি সরল রেললাইন", why: "সরল রেললাইনের দুইটি লাইন সব সময় সমান দূরে থাকে, কখনো মিলিত হয় না।" }),
      q({ prompt: "অনুশীলন ৫-এর চিত্রে কোন রেখা দুইটি সমান্তরাল?", options: ["কছ ও গঝ", "কছ ও খজ", "খজ ও গঝ"], answer: "কছ ও গঝ", why: "কছ ও গঝ একইভাবে হেলানো, সব জায়গায় সমান দূরে; খজ রেখাটি আনুভূমিক।" }),
      q({ prompt: "মূল প্রশ্নের মানচিত্রে কোন দুইটি রাস্তা সমান্তরাল?", options: ["ঙ ও চ", "ঙ ও জ", "চ ও ঠ"], answer: "ঙ ও চ", why: "ঙ ও চ দুইটিই আনুভূমিক রাস্তা, সব জায়গায় সমান দূরে; জ ও ঠ এদের উপর লম্ব।" }),
      q({ prompt: "দুইটি সমান্তরাল রেখার উপর লম্ব একটি রেখা প্রতিটির সঙ্গে কত ডিগ্রি কোণ তৈরি করে?", options: ["90°", "45°", "180°", "30°"], answer: "90°", why: "লম্ব রেখা সমকোণ তৈরি করে, দুইটি সমান্তরাল রেখার সঙ্গেই 90°।" }),
      q({ prompt: "খাতার আনুভূমিক রেখাগুলো পরস্পর কেমন রেখা?", options: ["সমান্তরাল", "লম্ব", "কোনোটিই নয়"], answer: "সমান্তরাল", why: "খাতায় অঙ্কিত আনুভূমিক রেখাগুলো পরস্পর সমান্তরাল রেখা।" }),
      q({ prompt: "দুইটি সমান্তরাল রেখার দূরত্ব এক জায়গায় 2 সেমি হলে অন্য এক জায়গায় দূরত্ব কত?", options: ["2 সেমি", "4 সেমি", "1 সেমি"], answer: "2 সেমি", why: "সমান্তরাল রেখা দুইটি সব সময় একে অপর থেকে সমান দূরত্বে থাকে।" }),
      q({ prompt: "জানালার উপরের ধার ও নিচের ধার কেমন রেখা?", options: ["সমান্তরাল", "লম্ব", "কোনোটিই নয়"], answer: "সমান্তরাল", why: "উপরের ও নিচের ধার সব জায়গায় সমান দূরে, কখনো মিলিত হয় না: এরা সমান্তরাল।" }),
    ],
    src: "p.152 (the definition, the note: never meet), কাজ ৪ (কখ, গঘ, ঙম between চছ ∥ জঝ: all equal), the girl (রেললাইন), অনুশীলন ৪ (the map: ঙ and চ), অনুশীলন ৫ (কছ ∥ গঝ), the pictures' right angles; p.153 কাজ ৫ (the exercise book's lines); অনুশীলন ৬'s equal distance and a window of ours",
  });

  wio({
    page: 153, slug: "across-and-perpendicular", type: G, title: "তির্যক রেখার কোণ মাপি ও চাঁদা দিয়ে লম্ব আঁকি",
    items: [
      measure(55), measure(125, "left"), // কাজ ৫: the slanting line and each level line
      draw(90), draw(90, "left"), // কাজ ৬: a perpendicular at গ
      measure(70), measure(110, "left"), measure(40), measure(140, "left"),
    ],
    fresh: { skill: "protractor", count: 5 },
    src: "p.153 কাজ ৫ (the slanting line crosses every line of the exercise book at ৫৫°, so the angle on its other side is ১২৫°), কাজ ৬ ধাপ ১–২ and p.154 ধাপ ৩ (৯০° বরাবর ঘ: a perpendicular drawn with the protractor); then two slanting lines of ours (৭০°, ৪০°) read on both sides; 5 fresh protractor rounds",
  });
  cant("p.153 অনুশীলন ৬ (draw parallel lines on graph paper and find the distance between them): drawing with a ruler on paper; the games ask the equal distance in the quiz on p.152.");

  mcq({
    page: 154, slug: "perpendicular-steps", title: "চাঁদা দিয়ে লম্ব আঁকার ধাপগুলো জানি",
    questions: [
      q({ prompt: "ধাপ ১-এ কী করি?", options: ["‘ক খ’ সরলরেখা আঁকি এবং এর মধ্যে একটি বিন্দু ‘গ’ চিহ্নিত করি", "‘গ’ থেকে ‘ঘ’ পর্যন্ত রেখা আঁকি", "চাঁদা সরিয়ে ফেলি"], answer: "‘ক খ’ সরলরেখা আঁকি এবং এর মধ্যে একটি বিন্দু ‘গ’ চিহ্নিত করি", why: "ধাপ ১: প্রথমে ‘ক খ’ সরলরেখা আঁকি। রেখাটির মধ্যে একটি বিন্দু ‘গ’ চিহ্নিত করি।" }),
      q({ prompt: "ধাপ ২-এ চাঁদার কেন্দ্রবিন্দু কোথায় স্থাপন করি?", options: ["‘গ’ বিন্দুতে", "‘ক’ বিন্দুতে", "‘খ’ বিন্দুতে", "‘ঘ’ বিন্দুতে"], answer: "‘গ’ বিন্দুতে", why: "ধাপ ২: ‘গ’ বিন্দুতে চাঁদার কেন্দ্রবিন্দু স্থাপন করি।" }),
      q({ prompt: "ধাপ ২-এ ‘ক খ’ রেখাকে চাঁদার কোন দাগ বরাবর মিলাই?", options: ["0°", "90°", "180°", "45°"], answer: "0°", why: "ধাপ ২: ‘ক খ’ রেখাকে চাঁদার 0° বরাবর মিলাই।" }),
      q({ prompt: "ধাপ ৩-এ কত ডিগ্রি বরাবর একটি বিন্দু ‘ঘ’ নিই?", options: ["90°", "45°", "60°", "180°"], answer: "90°", why: "লম্ব আঁকতে সমকোণ চাই: ধাপ ৩-এ 90° বরাবর একটি বিন্দু ‘ঘ’ নিই।" }),
      q({ prompt: "ধাপ ৪-এ কী করি?", options: ["চাঁদা সরিয়ে ‘গ’ থেকে ‘ঘ’ পর্যন্ত সরলরেখা আঁকি", "চাঁদার কেন্দ্র ‘ঘ’ বিন্দুতে রাখি", "‘ক খ’ রেখা মুছে ফেলি"], answer: "চাঁদা সরিয়ে ‘গ’ থেকে ‘ঘ’ পর্যন্ত সরলরেখা আঁকি", why: "ধাপ ৪: এবার চাঁদা সরিয়ে ‘গ’ থেকে ‘ঘ’ পর্যন্ত সরলরেখা আঁকি।" }),
      q({ prompt: "ধাপ ৫-এ কী করি?", options: ["চাঁদা বসিয়ে কোণটি সঠিক আঁকা হয়েছে কি না যাচাই করি", "আরেকটি বিন্দু ‘চ’ নিই", "রেখাটি বাঁকা করে আঁকি"], answer: "চাঁদা বসিয়ে কোণটি সঠিক আঁকা হয়েছে কি না যাচাই করি", why: "ধাপ ৫: এবার চাঁদা বসিয়ে কোণটি সঠিকভাবে আঁকা হয়েছে কি না যাচাই করে দেখি।" }),
      q({ prompt: "আঁকা শেষে ‘গঘ’ রেখাটি ‘ক খ’ রেখার উপর কেমন?", options: ["লম্ব", "সমান্তরাল", "কোনোটিই নয়"], answer: "লম্ব", why: "‘গঘ’ রেখা ‘ক খ’ রেখার সঙ্গে 90° কোণে মিলিত, তাই এটি ‘ক খ’-এর উপর লম্ব।" }),
      q({ prompt: "∠খগঘ কত ডিগ্রি?", options: ["90°", "45°", "180°", "60°"], answer: "90°", why: "ঘ বিন্দুটি 90° বরাবর নেওয়া হয়েছে, তাই ∠খগঘ = 90°।" }),
      q({ prompt: "∠কগঘ কত ডিগ্রি?", options: ["90°", "180°", "45°", "30°"], answer: "90°", why: "‘ক খ’ একটি সরলরেখা (180°); ∠খগঘ = 90°, তাই ∠কগঘ = 180° − 90° = 90°।" }),
      q({ prompt: "চাঁদা সরিয়ে ফেলার ঠিক আগে কোন কাজটি করি?", options: ["90° বরাবর বিন্দু ‘ঘ’ নিই", "‘গ’ থেকে ‘ঘ’ পর্যন্ত রেখা আঁকি", "কোণটি যাচাই করি"], answer: "90° বরাবর বিন্দু ‘ঘ’ নিই", why: "ধাপ ৩-এ বিন্দু ‘ঘ’ নিই, তারপর ধাপ ৪-এ চাঁদা সরিয়ে রেখা আঁকি।" }),
    ],
    src: "p.153 কাজ ৬ ধাপ ১–২ and p.154 ধাপ ৩–৫ (চাঁদার সাহায্যে একটি রেখার উপর আরেকটি লম্ব রেখা আঁকি), the steps as printed, then the right angles they make",
  });

  wio({
    page: 155, slug: "set-square-lines", type: G, title: "ত্রিকোণী সেটে আঁকা রেখা: লম্ব না সমান্তরাল",
    items: [
      lines(0, 90), // the left column's step ৫: a perpendicular
      lines(0, 0, false), // the right column's step ৬: a parallel line
      lines(30, 120), lines(150, 150, false), lines(75, 165), lines(110, 110, false), lines(20, 70), lines(160, 40, false),
    ],
    fresh: { skill: "lines", count: 5 },
    src: "p.155 কাজ ৭ (with the set squares: the left column ends in a perpendicular, the right one in a parallel line; the girl: ত্রিকোণী সেট ব্যবহার করে সহজেই লম্ব ও সমান্তরাল রেখা আঁকা যায়); six pairs of ours; 5 fresh rounds",
  });
  cant("p.155 কাজ ৭ (sliding one set square along another to draw a perpendicular and a parallel line): the moves of the set squares can't be played; the game names the lines they make.");

  // ════════════════════ p.156: দেখি পারি কি না ════════════════════
  wio({
    page: 156, slug: "review", type: G, title: "দেখি পারি কি না: কোণ মাপি, নাম বলি, রেখা চিনি",
    items: [
      measure(15, "left"), measure(120), // ১
      name(145, 35), name(105, 15), name(180), name(30, 165), // ২ ক খ গ ঘ
      measure(125), measure(35), // ৪ (২), (৩)
      lines(0, 90), lines(0, 0, false), // ৫
    ],
    fresh: { skill: "protractor", count: 5 },
    src: "p.156 ১ (ক ১৫° its base to the left, খ ১২০°), ২ (ক ১৪৫°, খ ১০৫°, গ ১৮০°, ঘ ৩০°: our drawings' sizes), ৪ (২) ১২৫°, (৩) ৩৫°, ৫ (লম্ব এবং সমান্তরাল রেখা); ৩ and ৪ (১) are in p.149's hidden-angle game; 5 fresh protractor rounds",
  });
};
