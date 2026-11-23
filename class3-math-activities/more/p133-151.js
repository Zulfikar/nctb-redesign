// A game for every page (3 Nov 2026): printed pp.133, 134, 136, 137, 139, 142, 143, 145 (অধ্যায় ১২ · জ্যামিতি) and 149,
// 151 (অধ্যায় ১৩ · উপাত্ত সংগ্রহ ও বিন্যস্তকরণ), the pages the rest file (rest/ch12.js, rest/ch13.js) left without a
// game because their exercises went into a neighbouring page's. Each game here practises its own page another way:
// বিন্দু (p.133 multiple choice), বিন্দু / রেখা / তল (p.134 sort), where angles are (p.136 sort), the folding steps
// (p.137 sequence), what a চতুর্ভুজ is (p.139 sort), pattern or not (p.142 sort), the shape that breaks a pattern
// (p.143), patterns of the page's own shapes (p.145), how many rode each ride (p.149) and the fruit pictograph's
// questions (p.151).
module.exports = (L) => {
  const { it, mine, wio, q, mcq, order, sort, note, cant } = L;
  const shapes = (seq, ask) => (ask ? { kind: "shapes", ask, seq } : { kind: "shapes", seq });
  const chart = (base, ask, extra = {}) => ({ kind: "chart", ...base, ask, ...extra });

  // ── p.133: বিন্দু (the night sky, the die, the digital clock, the pencil's tip; কাজ ১ five dots joined into a star) ──
  mcq({
    page: 133, slug: "points", title: "বিন্দু চিনি, বিন্দু যোগ করি",
    questions: [
      q({ prompt: "রাতের পরিষ্কার আকাশে তারাগুলোকে কেমন মনে হয়?", options: ["অনেকগুলো ছোটো ছোটো ফোঁটা", "লম্বা লম্বা সোজা দাগ", "বড়ো বড়ো সমতল", "বাঁকা বাঁকা তল"], answer: "অনেকগুলো ছোটো ছোটো ফোঁটা", why: "রাতের পরিষ্কার আকাশে তারাগুলোকে মনে হয় অনেকগুলো ছোটো ছোটো ফোঁটা।" }),
      q({ prompt: "ডিজিটাল ঘড়িতে সময় 10:20। 10 আর 20-এর মাঝে কয়টি ফোঁটা দেখা যায়?", options: ["1টি", "2টি", "3টি", "4টি"], answer: "2টি", num: 2, why: "১০ আর ২০-এর মাঝে দুইটি ফোঁটা, একটির উপর আরেকটি। ডিজিটাল ঘড়ির সময়ের মাঝেও ফোঁটা দেখি।" }),
      q({ prompt: "নিচের কোনটি বিন্দুর উদাহরণ?", options: ["রাতের আকাশের একটি তারা", "খেলার মাঠের সাদা দাগ", "ইটের উপরের অংশ", "বলের বাইরের অংশ"], answer: "রাতের আকাশের একটি তারা", why: "দূরের তারাকে ছোটো একটি ফোঁটার মতো দেখায়; এরকম ফোঁটাকে আমরা বিন্দু বলি।" }),
      q({ prompt: "নিচের কোনটি বিন্দু নয়?", options: ["আকাশের একটি তারার ফোঁটা", "লুডুর ছক্কার একটি ফোঁটা", "ঘড়ির সময়ের মাঝের একটি ফোঁটা", "স্কেল দিয়ে টানা একটি সোজা দাগ"], answer: "স্কেল দিয়ে টানা একটি সোজা দাগ", why: "স্কেল দিয়ে টানা সোজা দাগটি লম্বা, তাই এটি বিন্দু নয়; বাকি তিনটি ছোটো ফোঁটা, অর্থাৎ বিন্দু।" }),
      q({ prompt: "আমরা কী দিয়ে সহজেই ফোঁটা আঁকতে পারি?", options: ["পেনসিলের চোখা মাথা দিয়ে", "স্কেলের লম্বা দিক দিয়ে", "রাবারের চওড়া দিক দিয়ে", "বইয়ের মলাট দিয়ে"], answer: "পেনসিলের চোখা মাথা দিয়ে", why: "আমরা পেনসিলের চোখা মাথা দিয়ে সহজেই ফোঁটা আঁকতে পারি।" }),
      q({ prompt: "একটি বিন্দু কত লম্বা, তা কি স্কেল দিয়ে মাপা যায়?", options: ["না, বিন্দুর দৈর্ঘ্য, প্রস্থ বা উচ্চতা নেই", "হ্যাঁ, বিন্দু 1 সেমি লম্বা", "হ্যাঁ, বিন্দু 1 মিটার লম্বা", "হ্যাঁ, তবে শুধু উচ্চতা মাপা যায়"], answer: "না, বিন্দুর দৈর্ঘ্য, প্রস্থ বা উচ্চতা নেই", why: "বিন্দুর দৈর্ঘ্য, প্রস্থ বা উচ্চতা নেই, কেবল অবস্থান রয়েছে। তাই মাপার কিছু নেই।" }),
      q({ prompt: "কাজ ১: ছেলেটি 5টি বিন্দু এঁকে সেগুলো যোগ করে কোন চিত্র এঁকেছে?", options: ["একটি তারা", "একটি বৃত্ত", "একটি ত্রিভুজ", "একটি সোজা দাগ"], answer: "একটি তারা", why: "আমি ৫টি বিন্দু এঁকেছি এবং এগুলো যোগ করে একটি তারা এঁকেছি।" }),
      q({ prompt: "5টি বিন্দু যোগ করে তারাটি আঁকতে কয়টি সোজা দাগ লেগেছে?", options: ["3টি", "4টি", "5টি", "10টি"], answer: "5টি", num: 5, why: "তারার প্রতিটি দাগ দুইটি বিন্দু যোগ করেছে; ছবির তারায় ৫টি সোজা দাগ।" }),
      q({ prompt: "এক সারিতে নেই এমন 3টি বিন্দু সোজা দাগে পরপর যোগ করে চিত্রটি বন্ধ করলে কোন চিত্র পাই?", options: ["ত্রিভুজ", "চতুর্ভুজ", "বৃত্ত", "তারা"], answer: "ত্রিভুজ", why: "৩টি বিন্দু যোগ করলে ৩টি সোজা দাগের একটি বন্ধ চিত্র পাই: ত্রিভুজ।" }),
      q({ prompt: "4টি বিন্দু সোজা দাগে পরপর যোগ করে শেষ বিন্দুটি প্রথমটির সাথে মিলালে কয়টি সোজা দাগ লাগে?", options: ["2টি", "3টি", "4টি", "5টি"], answer: "4টি", num: 4, why: "১ম থেকে ২য়, ২য় থেকে ৩য়, ৩য় থেকে ৪র্থ, ৪র্থ থেকে ১ম বিন্দু: ৪টি সোজা দাগ।" }),
    ],
    src: "p.133 মূল প্রশ্ন (boy: রাতের আকাশের তারা, ছোটো ছোটো ফোঁটা; girl: লুডুর ছক্কা, ডিজিটাল ঘড়ি 10:20; পেনসিলের চোখা মাথা; বিন্দু; parrot: দৈর্ঘ্য, প্রস্থ বা উচ্চতা নেই), কাজ ১ (printed: the boy's 5 dots joined into a star, then 3 and 4 dots joined into a closed figure); the questions of p.135's multiple choice (pencil dots, কেবল অবস্থান, the die's dots) not repeated",
  });

  // ── p.134: রেখা (two dots and a ruler; the sports field, the highway) and তল (the brick: সমতল), beside p.133's বিন্দু ──
  sort({
    page: 134, slug: "point-line-surface-sort", title: "বিন্দু, রেখা না তল?",
    categories: ["বিন্দু", "রেখা", "তল"],
    items: [
      ["দুই বিন্দুর উপর স্কেল রেখে টানা সোজা দাগ", 1], // p.134's ruler and two dots
      ["খেলার মাঠের সাদা দাগ", 1], ["বড়ো রাস্তার উপরের সাদা দাগ", 1], // the girl: খেলার মাঠে, বড়ো রাস্তায়
      ["ইটের বাইরের অংশ", 2], // the boy's question: “একটি ইটের বাইরের অংশকে আমরা কী বলি?”
      ["ইটের দুই তল যেখানে মিলেছে, সেই কিনারা", 1],
      ["ইটের একটি কোনা", 0],
      ["পেনসিলের চোখা মাথা দিয়ে আঁকা একটি ফোঁটা", 0], ["ডিজিটাল ঘড়ির সময়ের মাঝের একটি ফোঁটা", 0], // p.133
      ["খাতার পাতার একটি পার্শ্ব", 1], ["খাতার পাতার একটি কোনা", 0], // p.135 কাজ ২ (printed)
      ["বইয়ের মলাট", 2], ["টেবিলের উপরের অংশ", 2], ["বলের বাইরের অংশ", 2],
    ],
    src: "p.134 (দুই বিন্দুর উপর স্কেল রেখে সোজা দাগ = রেখা; খেলার মাঠে, বড়ো রাস্তায় রেখা; ইটের বাইরের অংশ = তল, সমতল), with p.133's বিন্দু (pencil dot, the clock's dots) and p.135 কাজ ২ (printed: কাগজের পার্শ্ব রেখা, পার্শ্ব দুটি মিলিত হওয়ার স্থান বিন্দু); the brick's edges and corners, a book's cover, a table top and a ball's outside (p.135: বক্রতল, still a তল) by the same rules",
  });

  // ── p.136: কোণ (the watermelon slice, the clock at 10:10, the open scissors; কাজ ১ the hut's wall and roof corners) ──
  sort({
    page: 136, slug: "find-angles", title: "কোণ আছে, না কোণ নেই?",
    categories: ["কোণ আছে", "কোণ নেই"],
    items: [
      ["তরমুজের ফালি", 0], ["ঘড়ির দুইটি কাঁটা (10টা 10 মিনিট)", 0], ["খোলা কাঁচির দুইটি ফলা", 0], // মূল প্রশ্ন's pictures
      ["ঘরের দেয়ালের কোনা", 0], ["ঘরের চালের কোনা", 0], // কাজ ১ (printed: the boy's and the girl's arcs)
      ["বইয়ের কোনা", 0], ["ত্রিভুজ", 0], // “আমরা আর কোথায় কোথায় কোণ খুঁজে পাই?”
      ["ফুটবল", 1], ["গোল চাকা", 1], ["ডিম", 1], ["গোল থালা", 1],
      ["একটিমাত্র বিন্দু", 1], // the box: a কোণ needs two রেখা meeting
    ],
    src: "p.136 মূল প্রশ্ন (তরমুজ, ঘড়ি, কাঁচি; girl: প্রতিটি ছবিতেই কোণ রয়েছে), the box (দুইটি রেখার মিলিত বিন্দুতে যে আকৃতি তৈরি হয়, তাকে কোণ বলে), কাজ ১ (printed: the hut's wall corners and roof corners), the parrot's “আমরা আর কোথায় কোথায় কোণ খুঁজে পাই?” (a book's corner, a triangle; round things and a single dot have none)",
  });

  // ── p.137: কাজ ২, folding a paper into one right angle, four right angles, and two right angles into a straight angle ──
  order({
    page: 137, slug: "fold-right-angle", title: "ভাঁজ করে সমকোণ ও সরল কোণ তৈরি করি",
    items: [
      "যেকোনো আকৃতির একটি কাগজ নিই।",
      "কাগজটি মাঝ বরাবর ভাঁজ করি।",
      "ভাঁজ করা কাগজটি পুনরায় আড়াআড়ি ভাঁজ করি।",
      "ভাঁজ শেষে কোনায় এক সমকোণ তৈরি হলো।",
      "এবার ভাঁজটি খুলে ফেলি।",
      "মাঝ বরাবর ভাঁজ হওয়া অংশে রেখা টানি।",
      "রেখা দুটির মিলিত বিন্দুতে 4টি কোণ তৈরি হলো, প্রতিটি এক সমকোণ।",
      "একটি সমকোণে সমকোণের চিহ্ন দিই।",
      "ভাঁজ করে তৈরি দুইটি সমকোণ পাশাপাশি রাখি।",
      "দুইটি সমকোণ একত্রে মিলে সরল কোণ তৈরি করল।",
    ],
    src: "p.137 কাজ ২ (printed, all its steps in the book's order: fold in the middle, fold across, এক সমকোণ at the corner; unfold, draw along the folds, 4 right angles; সমকোণের চিহ্ন; two folded right angles side by side make a সরল কোণ)",
  });

  // ── p.139: চতুর্ভুজ (4টি সরল রেখা দ্বারা আবদ্ধ; 4 sides and 4 angles), its মূল প্রশ্ন figures and কাজ ১'s two ──
  sort({
    page: 139, slug: "is-it-quadrilateral", title: "চতুর্ভুজ, না চতুর্ভুজ নয়?",
    categories: ["চতুর্ভুজ", "চতুর্ভুজ নয়"],
    items: [
      ["4টি সরল রেখা দ্বারা আবদ্ধ আকৃতি", 0], // the parrot
      ["4টি বাহু ও 4টি কোণ আছে এমন আকৃতি", 0], // the girl
      ["সোজা করে বসানো বর্গ", 0], ["একটু হেলানো আয়ত", 0], ["দুইটি কোণ সমকোণ, আর দুইটি নয়, এমন 4 বাহুর আকৃতি", 0], // মূল প্রশ্ন's three
      ["4টি সরল বাহু, বাহুগুলোর দৈর্ঘ্য ভিন্ন ভিন্ন", 0], ["খাড়া করে বসানো আয়ত", 0], // কাজ ১'s two
      ["3টি সরল রেখা দ্বারা আবদ্ধ আকৃতি", 1], ["5টি সরল রেখা দ্বারা আবদ্ধ আকৃতি", 1],
      ["4টি রেখা, কিন্তু একটি রেখা বাঁকা", 1], // not সরল রেখা
      ["4টি সরল রেখা, কিন্তু এক কোনায় ফাঁকা (আবদ্ধ নয়)", 1], // not আবদ্ধ
      ["বৃত্ত", 1],
    ],
    src: "p.139 মূল প্রশ্ন (a square, a tilted rectangle, a right trapezoid; boy: তিনটি চিত্রই চতুর্ভুজাকৃতির; girl: 4টি বাহু ও 4টি কোণ; parrot: 4টি সরল রেখা দ্বারা আবদ্ধ), কাজ ১ (an irregular quadrilateral and a rectangle); then figures that miss one part of the definition (3 or 5 sides, a curved side, an open corner) and a circle",
  });

  // ── p.142: জ্যামিতিক প্যাটার্ন (নির্দিষ্ট নিয়মে সাজানো; the honeycomb, the brick wall, the carpet; কাজ ১ (1)) ──
  sort({
    page: 142, slug: "pattern-or-not", title: "প্যাটার্ন আছে, না প্যাটার্ন নেই?",
    categories: ["প্যাটার্ন আছে", "প্যাটার্ন নেই"],
    items: [
      ["মৌমাছির চাকের ঘরগুলো", 0], ["বিদ্যালয়ের দেয়ালের ইটের সারি", 0], ["বসার ঘরের কার্পেটের বর্গাকৃতির নকশা", 0],
      ["□ △ □ △ □ △", 0], // কাজ ১ (1)
      ["2, 4, 6, 8, 10", 0], // “যেমন: সংখ্যা, নকশা বা জ্যামিতিক আকৃতি”
      ["○ ○ △ ○ ○ △ ○ ○ △", 0], ["লাল, নীল, লাল, নীল, লাল, নীল", 0],
      ["□ △ △ ○ □ ○ △", 1], ["7, 2, 9, 4, 1", 1], ["রাতের আকাশে এলোমেলো ছড়ানো তারা", 1],
      ["○ △ ○ △ △ ○ □", 1], ["লাল, নীল, হলুদ, নীল, লাল, লাল", 1],
    ],
    src: "p.142 মূল প্রশ্ন (প্যাটার্নের ক্ষেত্রে নির্দিষ্ট নিয়মে কোন কিছু (যেমন: সংখ্যা, নকশা বা জ্যামিতিক আকৃতি) সাজানো থাকে; মৌমাছির চাক; boy: the school's brick wall; girl: the carpet's বর্গাকৃতির নকশা), কাজ ১ (1) □ △ □ △ □ △; then rows of numbers, shapes and colours with a rule or without one (p.133's scattered stars)",
  });

  // ── p.143: কাজ ১ (2) the flower (নীল, লাল, হলুদ … পুনরাবৃত্তি), (3) the arrows that make no pattern: which one breaks it ──
  const DOWN = "triangle-green", RIGHT = "rect-green"; // the book's green ↓ and → arrows
  const BL = "circle-blue", RD = "circle-red", YL = "circle-yellow"; // the flower's rings, outside in
  const SQ = "square-blue", TRI = "triangle-red"; // (1), as on p.144's game
  wio({
    page: 143, slug: "break-the-pattern", type: "shape_patterns", title: "কোনটি প্যাটার্ন ভেঙেছে?",
    items: [
      it(shapes([DOWN, RIGHT, DOWN, RIGHT, DOWN, RIGHT, null]), DOWN), // the box: the last → should be ↓
      it(shapes([DOWN, RIGHT, DOWN, RIGHT, DOWN, RIGHT, RIGHT, RIGHT, DOWN, RIGHT, DOWN], "odd"), 6), // (3), four arrows more: the 7th breaks it
      it(shapes([DOWN, RIGHT, DOWN, RIGHT, DOWN, DOWN, DOWN, RIGHT, DOWN, RIGHT], "odd"), 5),
      it(shapes([BL, RD, YL, BL, RD, YL, BL, YL, YL], "odd"), 7), // (2) the flower, one ring the wrong colour
      it(shapes([BL, RD, YL, BL, BL, YL, BL, RD, YL], "odd"), 4),
      it(shapes([SQ, TRI, SQ, TRI, SQ, SQ, SQ, TRI, SQ, TRI], "odd"), 5), // (1), the boy: একটি বর্গের পরে একটি ত্রিভুজ
    ],
    fresh: { skill: "shapes", more: true },
    notes: ["বইয়ের তীর চিহ্নগুলো খেলায় আকৃতি দিয়ে দেখানো: ↓ = সবুজ ত্রিভুজ, → = সবুজ আয়ত। ফুলের পাপড়ির রং (বাইরে থেকে ভেতরে নীল, লাল, হলুদ) পাশাপাশি বৃত্ত দিয়ে দেখানো।"],
    src: "p.143 কাজ ১ (3) ↓ → ↓ → ↓ → → (printed: the box, প্যাটার্নে সাজাতে হলে শেষ → চিত্রের পরিবর্তে ↓; as a fill-in round, then as a “which one breaks it” round going on for four arrows more, and one with an arrow wrong in the middle), (2) the flower's blue, red, yellow rings (printed: the girl's পুনরাবৃত্তি) with one ring wrong, twice, (1) the boy's বর্গ-ত্রিভুজ (printed on p.143) with one wrong; 5 fresh rounds",
  });

  // ── p.145: অনু ১ (আয়ত ও বর্গ), অনু ২ (তারা, বৃত্ত, ষড়ভুজ), অনু ৩ (লাল, সবুজ, হলুদ বর্গ, বড়ো থেকে ছোটো): make your own ──
  const RB = "rect-blue", SB = "square-blue", SR = "square-red", RR = "rect-red";
  const ST = "star-yellow", CI = "circle-red", CP = "circle-purple";
  const S1 = "square-red", S2 = "square-green", S3 = "square-yellow";
  wio({
    page: 145, slug: "own-shape-patterns", type: "shape_patterns", title: "আয়ত, বর্গ, তারা ও বৃত্তের প্যাটার্ন",
    items: [
      it(shapes([RB, SB, RB, SB, RB, null]), SB), // অনু ১: আয়ত ও বর্গ
      it(shapes([SR, RR, RR, SR, RR, RR, SR, null]), RR),
      it(shapes([RB, SB, SB, RB, SB, SB, RB, SB, SB, RB, RB], "odd"), 10),
      it(shapes([ST, CI, ST, CI, ST, null]), CI), // অনু ২: তারা ও বৃত্ত (no hexagon among the shapes)
      it(shapes([ST, ST, CP, ST, ST, CP, ST, null]), ST),
      it(shapes([S1, S2, S3, S1, S2, S3, S1, null]), S2), // অনু ৩: লাল, সবুজ, হলুদ বর্গ
      it(shapes([S1, "square-yellow-s", S1, "square-yellow-s", null, "square-yellow-s"]), S1), // বড়ো ও ছোটো বর্গ
    ],
    fresh: { skill: "shapes", more: true },
    notes: ["এই পৃষ্ঠায় শিশুরা নিজের পছন্দমতো প্যাটার্ন তৈরি করে। খেলায় পৃষ্ঠার আকৃতিগুলো (আয়ত ও বর্গ; তারা ও বৃত্ত; লাল, সবুজ ও হলুদ বর্গ, বড়ো ও ছোটো) দিয়ে তৈরি প্যাটার্ন সম্পূর্ণ করে। ষড়ভুজ খেলার আকৃতিতে নেই।"],
    src: "p.145 অনু ১ (আয়ত ও বর্গ ব্যবহার করে প্যাটার্ন), অনু ২ (তারা, বৃত্ত, ষড়ভুজ), অনু ৩ (3টি ভিন্ন বর্ণ ও আকারের বর্গ: লাল, সবুজ, হলুদ, বড়ো থেকে ছোটো): patterns made of these shapes to complete, and one to find the shape that breaks it; 5 fresh rounds",
  });

  // ── p.149: “কতজন কোন রাইড চড়েছিল?” (the park picture; the girl: তালিকা, ট্যালি চিহ্ন) ──
  // the picture can't be counted: only the train's 10 is printed (p.150); the other rides' numbers are p.150's game's (8, 5, 12)
  const RIDES = [
    { name: "ছোটো মণিদের রেলগাড়ি", emoji: "🚂", value: 10 },
    { name: "নাগরদোলা", emoji: "🎡", value: 8 },
    { name: "উড়ন্ত বিমান", emoji: "✈️", value: 5 },
    { name: "আনন্দঘূর্ণি", emoji: "🎠", value: 12 },
  ];
  const RIDE_CHART = { rows: RIDES, key: 1, symbol: "dot", dir: "h", unit: "জন শিক্ষার্থী" };
  const PICTURE = "the p.149 picture can't be counted (only the train's 10 is printed on p.150): the other rides' numbers are p.150's game's (নাগরদোলা 8, উড়ন্ত বিমান 5, আনন্দঘূর্ণি 12)";
  wio({
    page: 149, slug: "park-rides", type: "tally_chart", title: "শিশুপার্কে কতজন কোন রাইডে চড়েছিল?",
    items: [
      mine({ kind: "tally", rows: RIDES, ask: "read" }, PICTURE),
      it(chart(RIDE_CHART, "value", { a: 0, text: "কতজন শিক্ষার্থী ছোটো মণিদের রেলগাড়িতে চড়েছিল?" }), 10), // printed (p.150)
      mine(chart(RIDE_CHART, "value", { a: 1, text: "কতজন শিক্ষার্থী নাগরদোলায় চড়েছিল?" }), PICTURE),
      mine(chart(RIDE_CHART, "value", { a: 2, text: "কতজন শিক্ষার্থী উড়ন্ত বিমানে চড়েছিল?" }), PICTURE),
      mine(chart(RIDE_CHART, "value", { a: 3, text: "কতজন শিক্ষার্থী আনন্দঘূর্ণিতে চড়েছিল?" }), PICTURE),
      mine(chart(RIDE_CHART, "which", { given: 10, text: "কোন রাইডে 10 জন শিক্ষার্থী চড়েছিল?" }), PICTURE),
      mine(chart(RIDE_CHART, "diff", { a: 3, b: 2, text: "উড়ন্ত বিমানের চেয়ে আনন্দঘূর্ণিতে কতজন বেশি শিক্ষার্থী চড়েছিল?" }), PICTURE),
      mine(chart(RIDE_CHART, "diff", { a: 0, b: 1, text: "নাগরদোলার চেয়ে রেলগাড়িতে কতজন বেশি শিক্ষার্থী চড়েছিল?" }), PICTURE),
      mine(chart(RIDE_CHART, "sum", { a: 0, b: 2, text: "কতজন শিক্ষার্থী রেলগাড়ি ও উড়ন্ত বিমানে চড়েছিল?" }), PICTURE),
      mine(chart(RIDE_CHART, "sum", { a: 1, b: 2, text: "কতজন শিক্ষার্থী নাগরদোলা ও উড়ন্ত বিমানে চড়েছিল?" }), PICTURE),
    ],
    notes: ["পৃষ্ঠা ১৪৯-এর ছবির শিক্ষার্থীদের গোনা যায় না (শুধু রেলগাড়ির ১০ জন পৃষ্ঠা ১৫০-এ ছাপা)। তাই পৃষ্ঠা ১৫০-এর খেলার মতোই নাগরদোলা ৮, উড়ন্ত বিমান ৫ ও আনন্দঘূর্ণি ১২ জন ধরা হয়েছে।"],
    src: "p.149 মূল প্রশ্ন (কতজন কোন রাইড চড়েছিল?; girl: তালিকা তৈরি করতে হবে, ট্যালি চিহ্ন), with p.150 কাজ ১'s table (printed: রেলগাড়ি 10; the other rides' numbers as in p.150's game): the tally marks read back, each ride's number, the ride with 10, two differences and two sums (p.150's game asks the most, the least, নাগরদোলা + আনন্দঘূর্ণি and the total)",
  });

  // ── p.151: চিত্রলেখ (আপেল 5, কলা 4, পেয়ারা 6, আনারস 7; the boy's fruit pictures, the girl's dots) ──
  const FRUIT_ROWS = [{ name: "আপেল", emoji: "🍎", value: 5 }, { name: "কলা", emoji: "🍌", value: 4 }, { name: "পেয়ারা", emoji: "🍐", value: 6 }, { name: "আনারস", emoji: "🍍", value: 7 }];
  const BOY = { rows: FRUIT_ROWS, key: 1, symbol: "emoji", dir: "h", unit: "টি ফল" }; // one fruit picture a fruit
  const GIRL = { rows: FRUIT_ROWS, key: 1, symbol: "dot", dir: "h", unit: "টি ফল" }; // one dot a fruit
  wio({
    page: 151, slug: "fruit-pictograph", type: "tally_chart", title: "ফলের ঝুড়ির চিত্রলেখ পড়ি",
    items: [
      it(chart(BOY, "value", { a: 0, text: "ঝুড়িতে কয়টি আপেল আছে?" }), 5),
      it(chart(BOY, "value", { a: 2, text: "ঝুড়িতে কয়টি পেয়ারা আছে?" }), 6),
      it(chart(BOY, "least", { text: "ঝুড়িতে কোন ফল সবচেয়ে কম আছে?" }), [1]), // কলা 4
      it(chart(BOY, "sum", { a: 0, b: 1, text: "ঝুড়িতে আপেল ও কলা মিলে কয়টি?" }), 9),
      it(chart(BOY, "diff", { a: 2, b: 0, text: "আপেলের চেয়ে পেয়ারা কয়টি বেশি?" }), 1),
      it(chart(GIRL, "value", { a: 1, text: "ঝুড়িতে কয়টি কলা আছে?" }), 4),
      it(chart(GIRL, "which", { given: 7, text: "কোন ফল 7টি আছে?" }), [3]), // আনারস
      it(chart(GIRL, "diff", { a: 3, b: 1, text: "কলার চেয়ে আনারস কয়টি বেশি?" }), 3),
      it(chart(GIRL, "sum", { a: 2, b: 3, text: "ঝুড়িতে পেয়ারা ও আনারস মিলে কয়টি?" }), 13),
      it(chart(GIRL, "table", { text: "চিত্রলেখ দেখে প্রতিটি ফলের সংখ্যা লিখি।" }), [5, 4, 6, 7]),
    ],
    src: "p.151 মূল প্রশ্ন (একটি ফলের ঝুড়িতে 5টি আপেল, 4টি কলা, 6টি পেয়ারা এবং 7টি আনারস; printed: the boy's chart of fruit pictures, the girl's chart of dots; parrot: চিত্র অথবা প্রতীক): questions on the two printed charts (p.152's game makes the dot chart and asks the most and the total)",
  });

  // ── notes ──
  note("Pages 133, 134, 136, 137, 139, 142, 143, 145, 149 and 151 had no game in the rest file: their exercises were in a neighbouring page's game (p.135, p.138, p.140, p.144, p.146–148, p.150, p.152, p.155) or in its cant() list. Each game here practises its own page in another way or another type, and none repeats an item of those games: p.133 and p.135's multiple choice share no question; p.151 asks what p.152's fruit questions don't (p.152 makes the dot chart and asks the most and the total).");
  note("p.133 বিন্দু চিনি, বিন্দু যোগ করি: multiple choice of mine from the page's printed sentences and pictures (the stars, the clock's “10:20”, the pencil, the parrot's দৈর্ঘ্য, প্রস্থ বা উচ্চতা নেই) and কাজ ১ (the boy's 5 dots joined into a star: the star in the book has 5 straight lines); the last two questions take কাজ ১ on (3 dots joined → a triangle, 4 dots → 4 lines).");
  note("p.134 বিন্দু, রেখা না তল?: the sort's cards are p.133–135's own examples; the brick's edge (রেখা) and corner (বিন্দু), a book's cover, a table top (p.135 অনু ১ names পেনসিল, বই, টেবিল) and a ball's outside (বক্রতল is a তল too) follow p.135 কাজ ২'s printed rule (কাগজের পার্শ্ব রেখা, পার্শ্ব দুটি মিলিত হওয়ার স্থান বিন্দু, কাগজের তল সমতল).");
  note("p.136 কোণ আছে, না কোণ নেই?: the cards are the page's pictures (তরমুজ, ঘড়ি 10:10, কাঁচি), কাজ ১'s hut (the wall's and the roof's corners, printed) and the parrot's “আমরা আর কোথায় কোথায় কোণ খুঁজে পাই?”: a book's corner and a triangle have angles; a football, a wheel, an egg, a round plate and a single dot have none (the box: two রেখা meet at the শীর্ষ বিন্দু).");
  note("p.137 ভাঁজ করে সমকোণ ও সরল কোণ তৈরি করি: a Sequence of কাজ ২'s ten steps in the book's order, in its words (“যেকোনো আকৃতির একটি কাগজ নিয়ে” → “একটি কাগজ নিই”; “সমকোণের জন্য আমরা এই চিহ্ন ব্যবহার করব” → “একটি সমকোণে সমকোণের চিহ্ন দিই”). p.146's multiple choice asks the facts (fold twice → এক সমকোণ, 4 সমকোণ, সরল কোণ = দুই সমকোণ); this game orders the steps.");
  note("p.139 চতুর্ভুজ, না চতুর্ভুজ নয়?: the parrot's definition (4টি সরল রেখা দ্বারা আবদ্ধ) is the rule; the চতুর্ভুজ cards are the page's five figures (মূল প্রশ্ন: a square, a tilted rectangle, a right trapezoid; কাজ ১: an irregular quadrilateral, a rectangle) described in words, the others each miss one part of it (3 or 5 sides, a curved side, an open corner) or are a circle. p.140–141's sorts ask আয়ত and বর্গ; this one asks only চতুর্ভুজ.");
  note("p.142 প্যাটার্ন আছে, না প্যাটার্ন নেই?: the page's three pictures (মৌমাছির চাক, the brick wall, the carpet), কাজ ১ (1), and rows of my own with a rule or without one, of numbers, shapes and colours as the page's sentence lists (সংখ্যা, নকশা বা জ্যামিতিক আকৃতি); the scattered stars are p.133's sky. Shapes are written □ △ ○ (p.148's game writes ▲ ●).");
  note("p.143 কোনটি প্যাটার্ন ভেঙেছে?: arrows are drawn as shapes (↓ = a green triangle, → = a green rectangle; the book's arrows are both green), the flower's rings as a row of blue, red and yellow circles, (1) as p.144's game draws it (blue squares, red triangles); the guide note says so. The book's (3) has the break as the last of 7 arrows, where a round can't tell it from a 4-arrow unit (see the rest file's cant), so the fill-in round asks what the box says belongs there (↓), and the “which one breaks it” round goes on for four arrows more as the pattern would (↓ → ↓ → ↓ → → → ↓ → ↓; the 7th, the book's wrong one, breaks it; with fewer arrows after it the server finds a second answer and refuses it). The other four odd rounds (an arrow, two flower rings, (1)'s square) are mine.");
  note("p.145 আয়ত, বর্গ, তারা ও বৃত্তের প্যাটার্ন: the page's three exercises are “make your own pattern” (অনু ১, ২) and a project (অনু ৩), so the game has patterns made of their shapes to complete (blue rectangles and squares; a red square and red rectangles; yellow stars with red or purple circles; red, green and yellow squares; a big red square and a small yellow one) and one “which one breaks it” (the last rectangle of rectangle, square, square …): all mine. The hexagon of অনু ২ isn't one of the rounds' shapes; the colours are mine except অনু ৩'s red, green and yellow.");
  note("p.149 শিশুপার্কে কতজন কোন রাইডে চড়েছিল?: the picture can't be counted, so the game uses p.150's game's numbers (রেলগাড়ি 10, printed; নাগরদোলা 8, উড়ন্ত বিমান 5, আনন্দঘূর্ণি 12), the same picture giving the same counts in both games. Its items are mine() except the train's 10 (and the guide note says so): the tally marks read back (p.150's game makes them), each ride's number (the মূল প্রশ্ন “কতজন কোন রাইড চড়েছিল?”), the ride with 10 (the train, printed), আনন্দঘূর্ণি − উড়ন্ত বিমান 7, রেলগাড়ি − নাগরদোলা 2, রেলগাড়ি + উড়ন্ত বিমান 15, নাগরদোলা + উড়ন্ত বিমান 13.");
  note("p.151 ফলের ঝুড়ির চিত্রলেখ পড়ি: five questions on the boy's chart (one fruit picture a fruit: symbol emoji, the pear 🍐 for the guava as in p.152's game) and five on the girl's dots, all from the printed numbers 5, 4, 6, 7: আপেল 5, পেয়ারা 6, the least কলা, আপেল + কলা 9, পেয়ারা − আপেল 1, কলা 4, the 7 আনারস, আনারস − কলা 3, পেয়ারা + আনারস 13, and the table read back.");

  cant("p.133 কাজ ১ (draw some dots and join them into a picture of one's own): free drawing; its printed star (5 dots, 5 lines) is in the multiple choice.");
  cant("p.136 কাজ ১ (find the angles in the hut picture by tapping its corners): no round taps a picture; the hut's wall and roof corners are cards of the sort.");
  cant("p.145 অনু ১–৩ (make two patterns of one's own on dots; patterns of a star, a circle and a hexagon; the Boishakh paper project): own designs; the game completes patterns of the same shapes.");
};
