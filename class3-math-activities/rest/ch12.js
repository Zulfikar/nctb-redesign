// অধ্যায় ১২ · জ্যামিতি (printed pp.133–148): বিন্দু, রেখা ও তল (a sort, multiple choice), কোণ (name, make and draw
// angles on dots), চতুর্ভুজ/আয়ত/বর্গ (multiple choice, sorts, draw and complete on dots), জ্যামিতিক প্যাটার্ন (Shape
// Patterns incl. small shapes and "which one breaks it", multiple choice), the নিজে করি review and its match.
module.exports = (L) => {
  const { it, wio, q, mcq, match, sort, note, cant } = L;
  const angle = (deg, rot = 0) => ({ kind: "angle", deg, rot });
  const make = (type) => ({ kind: "angle", ask: "make", type });
  const dots = (task, w, h, extra = {}) => ({ kind: "dots", task, w, h, ...extra });
  const shapes = (seq, ask) => (ask ? { kind: "shapes", ask, seq } : { kind: "shapes", seq });
  const YES_NO = ["হ্যাঁ", "না"];
  const ANGLE_NAMES = ["সূক্ষ্মকোণ", "সমকোণ", "স্থূলকোণ", "সরল কোণ"];
  const WHY_ANGLE = ["এটি ঠিক এক সমকোণের সমান", "এটি এক সমকোণের চেয়ে বড়ো, দুই সমকোণের চেয়ে ছোটো", "এটি দুই সমকোণের সমান", "এটি এক সমকোণের চেয়ে ছোটো"];

  // ── p.133–135: বিন্দু, রেখা ও তল ──
  sort({
    page: 135, slug: "surfaces", title: "সমতল, বক্রতল না উভয় তল?",
    categories: ["সমতল", "বক্রতল", "উভয় তল"],
    items: [
      ["ইট", 0], ["রুবিক কিউব", 0], ["লুডুর ছক্কা", 0], ["বই", 0],
      ["ছোটো বল", 1], ["কলা", 1], ["আইসক্রিমের কোন", 1],
      ["অর্ধেক কমলা", 2], ["কোমল পানীয়ের ক্যান", 2],
      // more of the chapter's own objects (the 10-question rule)
      ["ফুটবল", 1], ["গোলক", 1], ["ক্যারম বোর্ড", 0], ["চকলেট বার", 0], ["কাঠের চাকা", 2], ["বালতি", 2],
    ],
    src: "p.135 কাজ ৩ (8 objects; printed: cube সমতল, ball বক্রতল, half orange উভয় তল), p.134 the brick (printed: “একটি ইটের সকল তল সমতল”), p.135 the football (printed: বক্রতল), p.146 নিজে ১ (1) গোলক, p.140 কাজ ৩'s carrom board, chocolate bar, wooden wheel and bucket",
  });
  mcq({
    page: 135, slug: "point-line-surface", title: "বিন্দু, রেখা ও তল",
    questions: [
      q({ prompt: "পেনসিলের চোখা মাথা দিয়ে আঁকা ছোটো ছোটো ফোঁটাকে আমরা কী বলি?", options: ["বিন্দু", "রেখা", "তল", "কোণ"], answer: "বিন্দু", why: "পেনসিলের চোখা মাথা দিয়ে আঁকা ফোঁটাগুলোকে আমরা বিন্দু বলি।" }),
      q({ prompt: "বিন্দুর দৈর্ঘ্য, প্রস্থ বা উচ্চতা নেই। বিন্দুর কী রয়েছে?", options: ["কেবল অবস্থান", "শুধু দৈর্ঘ্য", "শুধু প্রস্থ", "শুধু উচ্চতা"], answer: "কেবল অবস্থান", why: "বিন্দুর দৈর্ঘ্য, প্রস্থ বা উচ্চতা নেই, কেবল অবস্থান রয়েছে।" }),
      q({ prompt: "দুই বিন্দুর উপর স্কেল রেখে পেনসিল দিয়ে সোজা দাগ টানলে কী পাওয়া যায়?", options: ["বিন্দু", "রেখা", "তল", "কোণ"], answer: "রেখা", why: "দুই বিন্দুর উপর স্কেল রেখে টানা সোজা দাগকে আমরা রেখা বলি।" }),
      q({ prompt: "একটি ইটের বাইরের অংশকে আমরা কী বলি?", options: ["বিন্দু", "রেখা", "তল", "কোণ"], answer: "তল", why: "ইটের বাইরের অংশকে আমরা তল বলি।" }),
      q({ prompt: "একটি ইটের সকল তল কেমন?", options: ["সমতল", "বক্রতল", "উভয় তল"], answer: "সমতল", why: "ইটের তলগুলো বাঁকা নয়: একটি ইটের সকল তল সমতল।" }),
      q({ prompt: "একটি বলের তল কেমন?", options: ["সমতল", "বক্রতল", "উভয় তল"], answer: "বক্রতল", why: "বলের তল সমতল নয়, এ তলটি বাঁকা: একে বক্রতল বলি।" }),
      q({ prompt: "একটি খাতার পাতার পার্শ্ব হচ্ছে একটি —", options: ["বিন্দু", "রেখা", "বক্রতল", "কোণ"], answer: "রেখা", why: "কাগজের পার্শ্ব হচ্ছে একটি রেখা; কাগজটির তল হলো সমতল।" }),
      q({ prompt: "খাতার পাতার দুই পার্শ্ব যে স্থানে মিলিত হয়েছে (শীর্ষবিন্দু), তা কী?", options: ["বিন্দু", "রেখা", "তল", "সমতল"], answer: "বিন্দু", why: "যে স্থানে দুই পার্শ্ব মিলিত (শীর্ষবিন্দু) হয়েছে তা একটি বিন্দু।" }),
      q({ prompt: "লুডু খেলার ছক্কাতে যে ছোটো ছোটো ফোঁটা রয়েছে, সেগুলো কী?", options: ["বিন্দু", "রেখা", "তল", "কোণ"], answer: "বিন্দু", why: "ছক্কার ছোটো ছোটো ফোঁটাগুলো বিন্দুর উদাহরণ।" }),
      q({ prompt: "খেলার মাঠে আর বড়ো রাস্তায় যে সোজা দাগ দেখি, সেগুলো কীসের উদাহরণ?", options: ["বিন্দু", "রেখা", "বক্রতল", "কোণ"], answer: "রেখা", why: "খেলার মাঠে, বড়ো রাস্তায় আমরা এ রকম রেখা দেখি।" }),
      q({ prompt: "একটি খাতার পাতার (কাগজের) তল কেমন?", options: ["সমতল", "বক্রতল", "উভয় তল"], answer: "সমতল", why: "কাগজটির তল হলো সমতল।" }),
      q({ prompt: "অর্ধেক কমলার কোন তল রয়েছে?", options: ["শুধু সমতল", "শুধু বক্রতল", "সমতল ও বক্রতল উভয় তলই"], answer: "সমতল ও বক্রতল উভয় তলই", why: "কাটা দিকটি সমতল, খোসার দিকটি বাঁকা: অর্ধেক কমলার সমতল ও বক্রতল উভয় তলই রয়েছে।" }),
    ],
    src: "p.133 (বিন্দু; the die's dots; parrot: কেবল অবস্থান), p.134 (রেখা; খেলার মাঠ ও বড়ো রাস্তার রেখা; ইটের তল, সমতল), p.135 (বলের তল বক্রতল; কাজ ২ printed: খাতার পাতার তল, পার্শ্ব, শীর্ষবিন্দু; কাজ ৩ printed: অর্ধেক কমলার উভয় তল)",
  });

  // ── p.136–138: কোণ ──
  wio({
    page: 138, slug: "angle-types", type: "angles_dots", title: "কোণের নাম বলি, কোণ তৈরি করি",
    items: [
      it(angle(35, 20), "acute"), it(angle(130, 10), "obtuse"), // কাজ ৩, the boy's two stick angles
      it(angle(55), "acute"), it(angle(90), "right"), it(angle(180), "straight"), // the girl's three
      it(make("right"), "right"), it(make("acute"), "acute"), it(make("obtuse"), "obtuse"), it(make("straight"), "straight"), // অনু ১
    ],
    fresh: { skill: "angle" },
    src: "p.138 কাজ ৩ (printed: boy সূক্ষ্মকোণ ও স্থূলকোণ, girl সূক্ষ্মকোণ, সমকোণ ও সরলকোণ), অনু ১ (সমকোণ, সূক্ষ্মকোণ, স্থূলকোণ ও সরল কোণ আঁকি); p.137–138 the folded-paper right angle is the tester",
  });
  wio({
    page: 138, slug: "dot-angles", type: "angles_dots", title: "ডট কাগজে কোণ আঁকি",
    items: [
      it(dots("angle", 10, 4, { type: "acute" }), "acute"), // the printed example (45°)
      it(dots("angle", 10, 4, { type: "obtuse" }), "obtuse"), it(dots("angle", 10, 4, { type: "straight" }), "straight"),
      it(dots("angle", 10, 4, { type: "right" }), "right"),
      // অনু ১ (pencil and ruler: সমকোণ, সূক্ষ্মকোণ, স্থূলকোণ ও সরল কোণ) on a dot grid of the round's own size
      it(dots("angle", 8, 5, { type: "right" }), "right"), it(dots("angle", 8, 5, { type: "acute" }), "acute"),
      it(dots("angle", 8, 5, { type: "obtuse" }), "obtuse"), it(dots("angle", 8, 5, { type: "straight" }), "straight"),
    ],
    fresh: { skill: "angle" },
    src: "p.138 কাজ ৪ (a 10 × 4 dot grid; printed example a সূক্ষ্মকোণ; “যেমন: সূক্ষ্মকোণ, স্থূলকোণ, সরল কোণ ইত্যাদি”), অনু ১ (সমকোণ, সূক্ষ্মকোণ, স্থূলকোণ ও সরল কোণ আঁকি) on an 8 × 5 grid",
  });

  // ── p.139–141: চতুর্ভুজ, আয়ত, বর্গ ──
  mcq({
    page: 140, slug: "quadrilaterals", title: "চতুর্ভুজ, আয়ত ও বর্গ",
    questions: [
      q({ prompt: "একটি আকৃতি যা 4টি সরল রেখা দ্বারা আবদ্ধ, তাকে কী বলে?", options: ["চতুর্ভুজ", "ত্রিভুজ", "বৃত্ত", "কোণ"], answer: "চতুর্ভুজ", why: "একটি আকৃতি যা ৪টি সরল রেখা দ্বারা আবদ্ধ, তাকে চতুর্ভুজ বলে।" }),
      q({ prompt: "একটি চতুর্ভুজের কয়টি বাহু ও কয়টি কোণ থাকে?", options: ["4টি বাহু ও 4টি কোণ", "3টি বাহু ও 3টি কোণ", "4টি বাহু ও 3টি কোণ", "6টি বাহু ও 6টি কোণ"], answer: "4টি বাহু ও 4টি কোণ", why: "চতুর্ভুজাকৃতির চিত্রের ৪টি বাহু ও ৪টি কোণ রয়েছে।" }),
      q({ prompt: "একটি সাধারণ চতুর্ভুজ ও একটি আয়তের মধ্যে পার্থক্য কোথায়?", options: ["কোণগুলোতে", "বাহুর সংখ্যায়", "কোণের সংখ্যায়", "রঙে"], answer: "কোণগুলোতে", why: "দুইটিরই ৪টি বাহু ও ৪টি কোণ; কিন্তু আয়তের ৪টি কোণই সমকোণ।" }),
      q({ prompt: "যে চতুর্ভুজের 4টি কোণই সমকোণ, তাকে কী বলে?", options: ["আয়ত", "ত্রিভুজ", "বৃত্ত", "সরল কোণ"], answer: "আয়ত", why: "যে চতুর্ভুজের ৪টি কোণই সমকোণ, তাকে আয়ত বলে।" }),
      q({ prompt: "একটি আয়তকে ভাঁজ করে দেখলে কোন বাহুগুলোর দৈর্ঘ্য একই পাওয়া যায়?", options: ["বিপরীত বাহুগুলোর", "পাশাপাশি বাহুগুলোর", "কোনো বাহুর নয়"], answer: "বিপরীত বাহুগুলোর", why: "একটি আয়তের বিপরীত বাহুগুলোর দৈর্ঘ্য একই।" }),
      q({ prompt: "যে আয়তের 4 বাহুর দৈর্ঘ্য একই, তাকে কী বলে?", options: ["বর্গ", "ত্রিভুজ", "বৃত্ত", "সরল রেখা"], answer: "বর্গ", why: "যে আয়তের ৪ বাহুর দৈর্ঘ্য একই, তাকে বর্গ বলে।" }),
      q({ prompt: "নিচের কোনটি সঠিক?", options: ["সকল বর্গই আয়ত", "সকল আয়তই বর্গ", "বর্গের কোণগুলো সমকোণ নয়", "আয়তের 3টি বাহু"], answer: "সকল বর্গই আয়ত", why: "বর্গের ৪টি কোণই সমকোণ, তাই বর্গও একটি আয়ত: সকল বর্গই আয়ত।" }),
      q({ prompt: "একটি আয়তের কয়টি কোণ সমকোণ?", options: ["1টি", "2টি", "3টি", "4টি"], answer: "4টি", num: 4, why: "যে চতুর্ভুজের ৪টি কোণই সমকোণ, তাকে আয়ত বলে।" }),
      q({ prompt: "একটি আয়ত ও একটি বর্গের মধ্যে মিল কী?", options: ["কোণগুলো সমকোণ, বিপরীত বাহু সমান", "4টি বাহুর দৈর্ঘ্যই সমান", "কোনো কোণ সমকোণ নয়", "দুইটিরই 3টি বাহু"], answer: "কোণগুলো সমকোণ, বিপরীত বাহু সমান", why: "দুইটির কোণগুলো সমকোণ এবং বিপরীত বাহুগুলোর দৈর্ঘ্য সমান: দুইটি চিত্রই আয়ত।" }),
      q({ prompt: "একটি বর্গকে বিভিন্নভাবে ভাঁজ করে বাহুগুলোর দৈর্ঘ্য লক্ষ করলে কী পাই?", options: ["প্রতিটি বাহুর দৈর্ঘ্যই সমান", "শুধু বিপরীত বাহু সমান", "কোনো বাহু সমান নয়"], answer: "প্রতিটি বাহুর দৈর্ঘ্যই সমান", why: "বর্গকে ভাঁজ করলে দেখি, প্রতিটি বাহুর দৈর্ঘ্যই সমান।" }),
      q({ prompt: "নিচের কোনটি চতুর্ভুজ নয়?", options: ["আয়ত", "বর্গ", "ত্রিভুজ"], answer: "ত্রিভুজ", why: "চতুর্ভুজ ৪টি সরল রেখা দ্বারা আবদ্ধ; ত্রিভুজের বাহু ৩টি।" }),
    ],
    src: "p.139 মূল প্রশ্ন (girl: 4টি বাহু ও 4টি কোণ; parrot: চতুর্ভুজ), কাজ ১ (“এগুলোর কোণগুলো লক্ষ করি”; আয়ত; বিপরীত বাহু), p.140 কাজ ২ (boy: the likeness of a rectangle and a square; girl: the folded square's equal sides; বর্গ; “সকল বর্গই আয়ত”), p.141 কাজ ৫ (which figures are চতুর্ভুজ)",
  });
  sort({
    page: 140, slug: "square-rect-objects", title: "বর্গাকার না আয়তাকার?",
    categories: ["বর্গাকার", "আয়তাকার", "কোনোটিই নয়"],
    items: [
      ["রুবিক কিউব", 0], ["ক্যারম বোর্ড", 0],
      ["চকলেট বার", 1], ["বই", 1],
      ["কাঠের চাকা", 2], ["ফুটবল", 2], ["বালতি", 2],
      // more of the chapter's own objects (the 10-question rule)
      ["লুডুর ছক্কা", 0], ["ইট", 1], ["শ্রেণিকক্ষের বোর্ড", 1], ["ছোটো বল", 2], ["কোমল পানীয়ের ক্যান", 2], ["কলা", 2],
    ],
    src: "p.140 কাজ ৩ (8 objects; the popcorn box left out), p.135 কাজ ৩'s die, ball, can and banana, p.134 the brick, p.141 অনু ১'s classroom board",
  });
  sort({
    page: 140, slug: "find-rectangles", title: "আয়তগুলো খুঁজি",
    categories: ["আয়ত", "আয়ত নয়"],
    items: [
      ["লম্বা চতুর্ভুজ, 4টি কোণই সমকোণ", 0], // the printed example
      ["চওড়া চতুর্ভুজ, 4টি কোণই সমকোণ", 0],
      ["ত্রিভুজ, দুইটি বাহু সমান", 1],
      ["ত্রিভুজ, একটি কোণ সমকোণ", 1],
      ["4টি বাহু, কোণগুলো সমকোণ নয়", 1],
      ["হেলানো চতুর্ভুজ, 4টি কোণই সমকোণ", 0],
      ["বর্গ", 0],
      // the figures of p.141 কাজ ৫ and p.139 মূল প্রশ্ন (the 10-question rule)
      ["খাড়া সরু চতুর্ভুজ, 4টি কোণই সমকোণ", 0],
      ["ডিমের মতো আকৃতি, কোনো বাহু নেই", 1],
      ["6টি বাহু ও 6টি কোণ", 1],
      ["4টি বাহু, উপরের বাহু নিচের বাহুর চেয়ে বড়ো", 1],
      ["4টি বাহু, দুইটি কোণ সমকোণ, একটি বাহু হেলানো", 1],
    ],
    src: "p.140 কাজ ৪ (printed example: the tall rectangle; then 6 figures), p.141 কাজ ৫'s tall narrow rectangle, ellipse, hexagon and trapezoid, p.139 মূল প্রশ্ন's right trapezoid",
  });
  sort({
    page: 141, slug: "name-shapes", title: "বর্গ, আয়ত, অন্য চতুর্ভুজ না চতুর্ভুজ নয়?",
    categories: ["বর্গ", "আয়ত", "অন্য চতুর্ভুজ", "চতুর্ভুজ নয়"],
    items: [
      ["4টি বাহু, উপরের বাহুটি হেলানো", 2],
      ["ডিমের মতো আকৃতি, কোনো বাহু নেই", 3],
      ["4টি কোণই সমকোণ, পাশাপাশি বাহু দুইটি অসমান", 1],
      ["4টি বাহু, উপরের বাহু নিচের বাহুর চেয়ে বড়ো", 2],
      ["4টি কোণই সমকোণ, 4টি বাহুর দৈর্ঘ্য একই", 0],
      ["শুয়ে থাকা লম্বা চতুর্ভুজ, 4টি কোণই সমকোণ", 1],
      ["6টি বাহু ও 6টি কোণ", 3],
      ["খাড়া সরু চতুর্ভুজ, 4টি কোণই সমকোণ", 1],
      // the figures of p.140 কাজ ৪ and p.141 অনু ২ (the 10-question rule)
      ["3টি বাহু ও 3টি কোণ", 3],
      ["3টি বাহু, একটি কোণ সমকোণ", 3],
      ["হেলানো চতুর্ভুজ, 4টি কোণই সমকোণ, পাশাপাশি বাহু অসমান", 1],
      ["4টি বাহু, একটি কোণও সমকোণ নয়", 2],
      ["হেলানো চতুর্ভুজ, 4টি বাহু সমান, 4টি কোণই সমকোণ", 0],
    ],
    src: "p.141 কাজ ৫ (8 figures, ✓ and নাম), p.140 কাজ ৪'s two triangles, tilted rectangle and irregular quadrilateral, p.141 অনু ২'s tilted square",
  });
  wio({
    page: 141, slug: "dot-rect-square", type: "angles_dots", title: "ডট কাগজে আয়ত ও বর্গ আঁকি",
    items: [
      it(dots("rect", 10, 6), "rect"), it(dots("square", 10, 6), "square"), // কাজ ৬
      it(dots("complete", 4, 4, { given: [[1, 0, 3, 1], [1, 0, 0, 2], [0, 2, 2, 3]] }), "square"), // অনু ২ (a): 3 sides of a tilted square
      it(dots("complete", 4, 4, { given: [[0, 1, 1, 0], [1, 0, 2, 1]] }), "square"), // (b): two sides at 45°
      it(dots("complete", 4, 4, { given: [[0, 2, 2, 3]] }), "square"), // (c): one side
    ],
    fresh: { skill: "dots" },
    src: "p.141 কাজ ৬ (a 21 × 6 dot grid; printed: a 3 × 2 rectangle and a 2 × 2 square), অনু ২ (a)–(c) (the book says 4 figures, 3 are printed)",
  });

  // ── p.142–145: জ্যামিতিক প্যাটার্ন ──
  const SQ = "square-blue", TRI = "triangle-red";
  const C = "circle-red", T = "triangle-green", R = "rect-blue";
  wio({
    page: 144, slug: "shape-patterns", type: "shape_patterns", title: "প্যাটার্ন খুঁজি ও সম্পূর্ণ করি",
    items: [
      it(shapes([SQ, TRI, SQ, TRI, SQ, null]), TRI), // কাজ ১ (1)
      it(shapes(["circle-blue", "circle-red", "circle-yellow", "circle-blue", "circle-red", "circle-yellow", "circle-blue", null]), "circle-red"), // (2) the flower's rings
      it(shapes([C, T, R, C, T, R, C, T, R, C, T, null]), R), // কাজ ৩, the boy's ○△□ pattern
    ],
    fresh: { skill: "shapes", count: 7, more: true },
    src: "p.142–143 কাজ ১ (1) বর্গ-ত্রিভুজ, (2) নীল-লাল-হলুদ পাপড়ি, p.144 কাজ ৩ the boy's ○△□○△□… ((3), the arrows, is in the multiple choice); 7 fresh rounds",
  });
  mcq({
    page: 144, slug: "find-patterns", title: "প্যাটার্ন আছে কি না খুঁজি",
    questions: [
      q({ prompt: "বর্গ, ত্রিভুজ, বর্গ, ত্রিভুজ, বর্গ, ত্রিভুজ: এখানে কি প্যাটার্ন আছে?", options: YES_NO, answer: "হ্যাঁ", why: "একটি বর্গের পরে একটি ত্রিভুজ এবং এর পুনরাবৃত্তি ঘটেছে।" }),
      q({ prompt: "একটি ফুলে বাইরে থেকে ভেতরে পাপড়ির রং: নীল, লাল, হলুদ, নীল, লাল, হলুদ। এখানে কি প্যাটার্ন আছে?", options: YES_NO, answer: "হ্যাঁ", why: "নীল, তার উপর লাল, তার উপর হলুদ পাপড়ির ফুল এবং এর পুনরাবৃত্তি ঘটেছে।" }),
      q({ prompt: "↓ → ↓ → ↓ → → : এখানে কি প্যাটার্ন আছে?", options: YES_NO, answer: "না", why: "প্যাটার্নে সাজাতে হলে শেষ → চিত্রের পরিবর্তে ↓ চিত্র থাকতে হবে।" }),
      q({ prompt: "প্রতিটি বর্গ 4টি ত্রিভুজে ভাগ করা, একটি ত্রিভুজ কালো। প্রথম 4টি বর্গে কালো ত্রিভুজটি উপরে, ডানে, নিচে, বামে। পঞ্চম বর্গে কালো ত্রিভুজটি কোথায়?", options: ["উপরে", "ডানে", "নিচে", "বামে"], answer: "উপরে", why: "কালো ত্রিভুজটি ঘড়ির কাঁটার দিকে ঘুরছে: উপরে, ডানে, নিচে, বামে; তারপর আবার উপরে।" }),
      q({ prompt: "কালো ত্রিভুজটি উপরে, ডানে, নিচে, বামে, উপরে, ___। ষষ্ঠ বর্গে কালো ত্রিভুজটি কোথায়?", options: ["উপরে", "ডানে", "নিচে", "বামে"], answer: "ডানে", why: "উপরে, ডানে, নিচে, বামে এর পুনরাবৃত্তি: উপরের পরে ডানে।" }),
      q({ prompt: "কালো ত্রিভুজটি উপরে, ডানে, নিচে, বামে, উপরে, ডানে, ___। সপ্তম বর্গে কালো ত্রিভুজটি কোথায়?", options: ["উপরে", "ডানে", "নিচে", "বামে"], answer: "নিচে", why: "উপরে, ডানে, নিচে, বামে এর পুনরাবৃত্তি: ডানের পরে নিচে।" }),
      q({ prompt: "কালো ত্রিভুজটি উপরে, ডানে, নিচে, বামে, উপরে, ডানে, নিচে, ___। অষ্টম বর্গে কালো ত্রিভুজটি কোথায়?", options: ["উপরে", "ডানে", "নিচে", "বামে"], answer: "বামে", why: "উপরে, ডানে, নিচে, বামে এর পুনরাবৃত্তি: নিচের পরে বামে।" }),
      q({ prompt: "প্রথম চিত্রে 2টি, দ্বিতীয় চিত্রে 4টি, তৃতীয় চিত্রে 6টি বর্গ। চতুর্থ চিত্রে কয়টি বর্গ থাকবে?", options: ["7টি", "8টি", "9টি", "10টি"], answer: "8টি", num: 8, why: "প্রতিবার ২টি করে বর্গ বাড়ে: ৬ + ২ = ৮।" }),
      q({ prompt: "প্রথম ঘরে 7টি, তারপর 5টি, তারপর 3টি তারা। পরের ঘরে কয়টি তারা থাকবে?", options: ["1টি", "2টি", "3টি", "4টি"], answer: "1টি", num: 1, why: "প্রতিবার ২টি করে তারা কমে: ৩ − ২ = ১।" }),
      q({ prompt: "বৃত্ত, বৃত্ত, ত্রিভুজ, ত্রিভুজ, আয়ত, আয়ত, বৃত্ত, বৃত্ত, ত্রিভুজ, ত্রিভুজ, আয়ত, ___। খালিস্থানে কোনটি বসবে?", options: ["বৃত্ত", "ত্রিভুজ", "আয়ত"], answer: "আয়ত", why: "দুইটি বৃত্ত, দুইটি ত্রিভুজ, দুইটি আয়ত এবং এর পুনরাবৃত্তি: আয়তের পরে আরেকটি আয়ত।" }),
    ],
    src: "p.142–143 কাজ ১ (1)–(3) (printed: পুনরাবৃত্তি; (3) প্যাটার্ন তৈরি করেনি), p.144 কাজ ২ (1) the turning black triangle, (2) 2-4-6 squares, (3) 7-5-3 stars, কাজ ৩ the girl's ○○△△□□",
  });

  // ── p.146–148: নিজে করি ──
  mcq({
    page: 146, slug: "tick-right-answer", title: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দিই",
    questions: [
      q({ prompt: "নিচের কোনটিকে সরলরেখার উদাহরণ হিসেবে ব্যবহার করা যায়?", options: ["একটি গোলকের পৃষ্ঠ", "একটি টেবিলের প্রান্ত", "একটি আঁকাবাঁকা রাস্তা", "একটি বলের পৃষ্ঠ"], book: "খ", why: "টেবিলের প্রান্ত সোজা, তাই এটি সরলরেখার মতো। গোলক ও বলের পৃষ্ঠ বক্রতল।" }),
      q({ prompt: "একটি সরলকোণ গঠিত হয়–", options: ["দুটি সমকোণ দিয়ে", "দুটি সূক্ষ্মকোণ দিয়ে", "দুটি স্থূলকোণ দিয়ে", "একটি সমকোণ এবং একটি স্থূলকোণ দিয়ে"], book: "ক", why: "দুইটি সমকোণ একত্রে মিলে যে কোণ তৈরি করে, সেটি হলো সরল কোণ।" }),
      // the book: "… দুবার ভাঁজ করা হয় তাহলে নিচের কোনটি পাওয়া যায়?" with গ) চার সমকোণ (also right once unfolded)
      q({ prompt: "যদি একটি কাগজ আড়াআড়িভাবে দুবার ভাঁজ করা হয় তাহলে ভাঁজ শেষে কোনায় নিচের কোনটি পাওয়া যায়?", options: ["এক সমকোণ", "দুটি সূক্ষ্মকোণ", "একটি সরল কোণ", "এক স্থূলকোণ"], book: "ক", why: "ভাঁজ শেষে কোনায় যে কোণটি তৈরি হয়, সেটিই এক সমকোণ। ভাঁজ খুললে ৪টি সমকোণ দেখা যায়।" }),
      q({ prompt: "দুটি সরলরেখা পরস্পরকে সমকোণে অতিক্রম করলে কী হয়?", options: ["একটি স্থূলকোণ গঠিত হয়", "একটি সরলরেখা তৈরি হয়", "চারটি সমকোণ গঠিত হয়", "দুটি সূক্ষ্মকোণ গঠিত হয়"], book: "গ", why: "রেখা দুটির মিলিত বিন্দুতে ৪টি কোণ তৈরি হয়, এগুলোর প্রতিটি এক সমকোণ।" }),
      q({ prompt: "আয়তের ক্ষেত্রে নিচের কোন শর্তটি আবশ্যিক?", options: ["চারটি সমান বাহু", "চারটি কোণ সমকোণ", "বিভিন্ন দৈর্ঘ্যের চারটি বাহু", "শুধু একটি কোণ সমকোণ"], book: "খ", why: "যে চতুর্ভুজের ৪টি কোণই সমকোণ, তাকে আয়ত বলে।" }),
      q({ prompt: "তোমার একটি রোবট আছে যেটি শুধুমাত্র সমকোণে ঘুরতে পারে। তুমি যদি এটিকে একটি আয়তক্ষেত্রের চারপাশ বরাবর হাঁটতে বলো, তাহলে এটি শুরুর অবস্থানে ফিরতে কতটি বাঁক ঘুরবে?", options: ["2টি", "3টি", "4টি", "5টি"], book: "গ", num: 4, why: "আয়তের ৪টি কোণ; প্রতিটি কোণে রোবটটি একবার সমকোণে ঘোরে: ৪টি বাঁক।" }),
      q({ prompt: "নিচের কোনটি প্যাটার্ন নয়?", options: ["মৌচাকের গঠন", "বর্গাকার টাইলসের দেয়াল", "এলোমেলো বিন্দু", "একটি দাবার ছক"], book: "গ", why: "প্যাটার্নে নির্দিষ্ট নিয়মে সাজানো থাকে; এলোমেলো বিন্দু কোনো নিয়মে সাজানো নয়।" }),
      // the book's খ) "একটি চাঁদা দিয়ে পরিমাপ করে": a protractor is never taught; the book's own tester is the folded paper
      q({ prompt: "একটি ত্রিভুজের একটি কোণ সমকোণ কিনা তা কীভাবে বের করা যায়?", options: ["ত্রিভুজটিকে আড়াআড়ি ভাঁজ করে", "দুবার ভাঁজ করা কাগজের কোনা দিয়ে মিলিয়ে", "ত্রিভুজটির উপর দিয়ে আরেকটি রেখা অংকন করে", "আকৃতির উপর ভিত্তি করে অনুমান করে"], book: "খ", why: "দুবার ভাঁজ করা কাগজের কোনা এক সমকোণ। কোণটির উপর রাখি: ঠিক মিলে গেলে কোণটি সমকোণ।" }),
      q({ prompt: "নিচের কোন বাক্যটি সঠিক নয়, তা শনাক্ত করি?", options: ["সূক্ষ্মকোণ এক সমকোণ অপেক্ষা ছোটো।", "সরলকোণ দুই সমকোণের সমান।", "স্থূলকোণ দুই সমকোণ অপেক্ষা বড়ো।", "সকল বর্গই আয়ত।"], book: "গ", why: "স্থূলকোণ এক সমকোণের চেয়ে বড়ো, কিন্তু সরল কোণের (দুই সমকোণের) চেয়ে ছোটো।" }),
      // the p.136 box (the 10-question rule)
      q({ prompt: "দুইটি রেখার মিলিত বিন্দুতে যে আকৃতি তৈরি হয়, তাকে কী বলে?", options: ["কোণ", "বিন্দু", "তল", "বাহু"], answer: "কোণ", why: "দুইটি রেখার মিলিত বিন্দুতে (শীর্ষ বিন্দু) যে আকৃতি তৈরি হয়, তাকে কোণ বলে।" }),
      q({ prompt: "কোণের দুই পার্শ্ব যে বিন্দুতে মিলিত হয়, তাকে কী বলে?", options: ["শীর্ষ বিন্দু", "পার্শ্ব", "সমতল", "বাহু"], answer: "শীর্ষ বিন্দু", why: "কোণের দুই পার্শ্বের মিলিত বিন্দুটি হলো শীর্ষ বিন্দু।" }),
    ],
    notes: [
      "প্রশ্ন ৩: বইয়ের প্রশ্নে গ) “চার সমকোণ” (ভাঁজ খুললে এটিও ঠিক); খেলায় প্রশ্নে “ভাঁজ শেষে কোনায়” লেখা, আর গ) “একটি সরল কোণ”।",
      "প্রশ্ন ৮: বইয়ের খ) “একটি চাঁদা দিয়ে পরিমাপ করে”; চাঁদা বইয়ে শেখানো হয়নি, তাই খেলায় খ) বইয়ের নিজের পদ্ধতি: দুবার ভাঁজ করা কাগজের কোনা দিয়ে মিলিয়ে।",
    ],
    src: "p.146 নিজে ১ (1)–(7), p.147 (8)–(9), the book's options in its ক–ঘ order ((3) and (8) fixed, see notes); then p.136's box (কোণ, শীর্ষ বিন্দু)",
  });
  wio({
    page: 147, slug: "name-angles", type: "angles_dots", title: "কোণগুলোর নাম লিখি",
    items: [
      it(angle(90, 30), "right"), it(angle(125), "obtuse"), it(angle(180), "straight"), it(angle(45, 15), "acute"),
      it(angle(40, 70), "acute"), // নিজে ২ (1): the V of Ima's books, “90 ডিগ্রির কম”
      it(angle(90, 45), "right"), // p.137: the corner of the paper folded twice, “এক সমকোণ”
    ],
    fresh: { skill: "angle" },
    notes: ["বইয়ের সারণিতে সরল কোণটি “নাম” সারিতে আঁকা; খেলায় চারটি কোণই একইভাবে আঁকা।"],
    src: "p.147 নিজে ২ (3) (সমকোণ, স্থূলকোণ, সরল কোণ, সূক্ষ্মকোণ; the কারণ column left out), নিজে ২ (1) (the V of books, less than 90°), p.137 (the folded corner, এক সমকোণ)",
  });
  mcq({
    page: 148, slug: "short-questions", title: "নিজে করি: সংক্ষিপ্ত প্রশ্ন ও প্যাটার্ন",
    questions: [
      q({ prompt: "ইমা তার বইগুলিকে একটি শেলফে V-আকৃতিতে সাজিয়েছে। বই দ্বারা গঠিত কোণ 90 ডিগ্রির কম হলে, ইমা কোন ধরনের কোণ তৈরি করেছে?", options: ANGLE_NAMES, answer: "সূক্ষ্মকোণ", why: "এক সমকোণ ৯০ ডিগ্রি; এক সমকোণের চেয়ে ছোটো কোণ সূক্ষ্মকোণ।" }),
      q({ prompt: "তুমি একটি আয়তাকার কাগজ দুটি সমান অর্ধেকে ভাঁজ করলে এবং তারপর আবার চতুর্থাংশে ভাঁজ করলে। মূল আয়তটির দৈর্ঘ্য 12 সেমি এবং প্রস্থ 8 সেমি হলে, দ্বিতীয় ভাঁজের পরে ভাঁজ করা আয়তটির দৈর্ঘ্য ও প্রস্থ কত হবে?", options: ["দৈর্ঘ্য 6 সেমি, প্রস্থ 4 সেমি", "দৈর্ঘ্য 12 সেমি, প্রস্থ 4 সেমি", "দৈর্ঘ্য 6 সেমি, প্রস্থ 8 সেমি", "দৈর্ঘ্য 3 সেমি, প্রস্থ 2 সেমি"], answer: "দৈর্ঘ্য 6 সেমি, প্রস্থ 4 সেমি", why: "এক ভাঁজে দৈর্ঘ্য অর্ধেক: ১২ ÷ ২ = ৬ সেমি; আরেক ভাঁজে প্রস্থ অর্ধেক: ৮ ÷ ২ = ৪ সেমি।" }),
      q({ prompt: "একটি চতুর্ভুজকে কখন বর্গ বলতে পারি?", options: ["যখন 4টি কোণই সমকোণ এবং 4টি বাহুর দৈর্ঘ্য একই", "যখন শুধু 4টি কোণই সমকোণ", "যখন 4টি বাহু থাকে", "যখন শুধু বিপরীত বাহুগুলোর দৈর্ঘ্য একই"], answer: "যখন 4টি কোণই সমকোণ এবং 4টি বাহুর দৈর্ঘ্য একই", why: "যে আয়তের (৪টি কোণই সমকোণ) ৪ বাহুর দৈর্ঘ্য একই, তাকে বর্গ বলে।" }),
      q({ prompt: "▲ ● ▲ ● ● ▲ ___ ___ ___ ___ : খালিস্থানে কোন আকৃতিগুলো বসবে?", options: ["● ● ● ▲", "● ● ▲ ●", "▲ ● ● ●", "● ▲ ● ●"], answer: "● ● ● ▲", why: "▲ এর পরে প্রতিবার একটি করে ● বেশি: ▲●, ▲●●, ▲●●●, তারপর আবার ▲।" }),
      q({ prompt: "→ ↑ ← → ↑ ← : এই চিত্রগুলো কি প্যাটার্ন?", options: YES_NO, answer: "হ্যাঁ", why: "ডানে, উপরে, বামে: একই নিয়মে বারবার এসেছে।" }),
      q({ prompt: "+ ○ ↓ + ○ ↑ + ○ ↓ : এই চিত্রগুলো কি প্যাটার্ন?", options: YES_NO, answer: "না", why: "মাঝের তীরটি উপরমুখী (↑); প্যাটার্ন হলে সেখানেও ↓ থাকত।" }),
      // p.147 নিজে ২ (3)'s “কারণ” column: why each angle has its name (p.137–138's definitions, p.147 (9))
      q({ prompt: "নিজে ২ (3): কোনো কোণকে সমকোণ বলি কেন?", options: WHY_ANGLE, answer: WHY_ANGLE[0], why: "কাগজ দুবার ভাঁজ করে কোনায় যে কোণ পাই, সেটিই এক সমকোণ।" }),
      q({ prompt: "নিজে ২ (3): কোনো কোণকে স্থূলকোণ বলি কেন?", options: WHY_ANGLE, answer: WHY_ANGLE[1], why: "এক সমকোণের চেয়ে বড়ো কোণ স্থূলকোণ; তবে তা দুই সমকোণের (সরল কোণের) চেয়ে ছোটো।" }),
      q({ prompt: "নিজে ২ (3): কোনো কোণকে সরল কোণ বলি কেন?", options: WHY_ANGLE, answer: WHY_ANGLE[2], why: "দুইটি সমকোণ একত্রে মিলে সরল কোণ তৈরি করে: সরলকোণ দুই সমকোণের সমান।" }),
      q({ prompt: "নিজে ২ (3): কোনো কোণকে সূক্ষ্মকোণ বলি কেন?", options: WHY_ANGLE, answer: WHY_ANGLE[3], why: "যদি কোণটি এক সমকোণের চেয়ে ছোটো হয়, তবে তাকে সূক্ষ্মকোণ বলি।" }),
    ],
    src: "p.147 নিজে ২ (1) (সূক্ষ্মকোণ), (2) (6 সেমি × 4 সেমি), (3) its কারণ column (from p.137–138's definitions), p.148 নিজে ৪, নিজে ৫ (খ) (▲●, ▲●●, ▲●●●), নিজে ৬ (ক) chevrons → ↑ ← (হ্যাঁ), (খ) plus, oval, arrows (না); নিজে ৬'s কারণ left out",
  });
  const BIG = "triangle-grey", SMALL = "triangle-grey-s";
  wio({
    page: 148, slug: "complete-patterns", type: "shape_patterns", title: "খালিস্থানে সঠিক আকৃতি বসাই",
    items: [
      it(shapes([BIG, SMALL, SMALL, BIG, null, SMALL]), SMALL), // নিজে ৫ (ক), the first blank
      it(shapes([BIG, SMALL, SMALL, BIG, SMALL, SMALL, null, SMALL, SMALL]), BIG), // the second blank
      it(shapes([BIG, SMALL, SMALL, BIG, SMALL, SMALL, BIG, null, SMALL]), SMALL), // the third blank
      it(shapes([BIG, SMALL, SMALL, BIG, SMALL, SMALL, BIG, SMALL, SMALL, null]), BIG), // the pattern goes on: the 10th
      it(shapes(["star-red", "circle-green", "triangle-blue", "star-red", "circle-green", "square-blue", "star-red", "circle-green", "triangle-blue"], "odd"), 5), // নিজে ৬ (খ): the ↑ breaks it
    ],
    fresh: { skill: "shapes", more: true },
    src: "p.148 নিজে ৫ (ক) (grey triangles big, small, small, …: the three blanks small, big, small, then the shape after the last), নিজে ৬ (খ) (plus, oval, ↓, plus, oval, ↑, …: না)",
  });
  // 12 pairs play as two rounds of 6 IN THIS ORDER: the first round has বিন্দু and রেখা, the second শীর্ষ বিন্দু and বর্গ
  // (a vertex is a point too, so the two never share a round), and only one of the four-sided words (বর্গ)
  match({
    page: 148, slug: "match-surfaces", title: "মিল করি: বিন্দু, রেখা, তল ও কোণ",
    pairs: [
      ["কোমল পানীয়ের ক্যানের গা", "বক্রতল"],
      ["বইয়ের উপরের দিক", "সমতল"],
      ["রঙের প্যালেটের একটি রঙের ফোঁটা", "বিন্দু"],
      ["দৌড়ের মাঠের দাগ", "রেখা"],
      ["অর্ধেক কমলার তল", "উভয় তল"],
      ["দুইটি রেখার মিলিত বিন্দুতে তৈরি আকৃতি", "কোণ"],
      // the second round
      ["এক সমকোণের চেয়ে ছোটো কোণ", "সূক্ষ্মকোণ"],
      ["এক সমকোণের চেয়ে বড়ো, দুই সমকোণের চেয়ে ছোটো কোণ", "স্থূলকোণ"],
      ["দুই সমকোণের সমান কোণ", "সরল কোণ"],
      ["কাগজ দুবার ভাঁজ করলে কোনার কোণ", "সমকোণ"],
      ["কোণের দুই পার্শ্বের মিলিত বিন্দু", "শীর্ষ বিন্দু"],
      ["4 বাহুর দৈর্ঘ্য একই এমন আয়ত", "বর্গ"],
    ],
    src: "p.148 নিজে ৩ (the four pictures and their arrows, in words), then the chapter's own words: p.135 (অর্ধেক কমলা, উভয় তল), p.136 (কোণ, শীর্ষ বিন্দু), p.137–138 (সমকোণ, সরল কোণ, সূক্ষ্মকোণ, স্থূলকোণ), p.140 (বর্গ)",
  });

  // ── notes ──
  note("p.141 অনু ২ says “নিচের 4টি চিত্রের প্রতিটিতে” but prints 3 figures: the game has the 3 printed ones (complete-the-square rounds on a 4 × 4 dot grid, the book's 3 × 3 squares; corners read as (column, row) from the top left: (a) (1,0)–(3,1), (1,0)–(0,2), (0,2)–(2,3); (b) (0,1)–(1,0)–(2,1); (c) (0,2)–(2,3)). No fourth figure is made up.");
  note("p.146 নিজে ১ (3) is ambiguous: the corner of a paper folded twice is one right angle (ক, p.137), but unfolded it shows four (গ “চার সমকোণ”). The question now says “ভাঁজ শেষে কোনায়” (p.137's own words) and গ is “একটি সরল কোণ”, so only ক is right. The guide note says so.");
  note("p.147 নিজে ১ (8): the book's answer খ “একটি চাঁদা দিয়ে পরিমাপ করে” uses a protractor, which the book never teaches. খ is now “দুবার ভাঁজ করা কাগজের কোনা দিয়ে মিলিয়ে” (the p.138 folded-paper right-angle tester) and stays the answer. The guide note says so.");
  note("p.147 নিজে ২ (3): the straight angle is drawn in the “নাম” row instead of the “কোণ” row; the game draws all four angles the same way (guide note). The four angles' sizes are mine (90°, 125°, 180°, 45°); the book shows them without degrees.");
  note("p.138 কাজ ৩: the five stick angles' sizes are mine (boy 35° and 130°, girl 55°, 90°, 180°); the answers are the printed names. The make rounds are অনু ১'s four angles in its order.");
  note("Dot grids: p.138 কাজ ৪ as printed (10 × 4 dots). p.141 কাজ ৬ prints 21 × 6; a round's grid is at most 10 dots wide, so 10 × 6.");
  note("p.135 কাজ ৩: the ice-cream cone is sorted under বক্রতল (the survey's reading, with a question mark); the p.134 brick (“একটি ইটের সকল তল সমতল”) is added as a ninth card. The die is “লুডুর ছক্কা” (p.133's word).");
  note("p.140 কাজ ৩: the popcorn box is left out (its sides are tapered, so it is neither, but a word card would read as a box, i.e. আয়তাকার). 7 cards.");
  note("p.140 কাজ ৪ and p.141 কাজ ৫ sort the printed figures, so each card describes its figure in words (its sides and angles, e.g. “হেলানো চতুর্ভুজ, ৪টি কোণই সমকোণ”; the ellipse “ডিমের মতো আকৃতি”, the hexagon “৬টি বাহু ও ৬টি কোণ”). p.140 কাজ ৪ keeps the printed example (the tall rectangle) as a card.");
  note("Shape colours are mine except the flower (blue, red, yellow) and the grey triangles: p.142 কাজ ১ (1) blue squares and red triangles; p.144 কাজ ৩ red circles, green triangles, blue rectangles. Arrows and other signs are drawn as shapes: p.148 নিজে ৬ (খ) plus = a red star, oval = a green circle, ↓ = a blue triangle, ↑ = a blue square (the one to tap). The flower's nested rings are a row of circles.");
  note("p.148 নিজে ৫ (ক) has three blanks; a Shape Patterns round has one, so it is three rounds, each with one blank and the earlier ones filled in (answers small, big, small).");
  note("p.147 নিজে ২ (2) is read as one fold each way (the survey's answer, 6 সেমি × 4 সেমি); folding twice the same way (3 × 8) is not among the options.");
  note("p.148 নিজে ৩: the running track's arrow points between the lines; it is matched to রেখা.");
  note("Every activity has at least 10 questions (the user, 3 Nov). Added from the chapter's own material: the surfaces sort takes p.135's football, p.146's গোলক and p.140 কাজ ৩'s carrom board, chocolate bar, wooden wheel (উভয় তল) and bucket (উভয় তল); the বর্গাকার/আয়তাকার sort takes p.135's die, ball, can and banana, p.134's brick (its faces are rectangles) and p.141 অনু ১'s classroom board; the two figure sorts take each other's figures (p.140 কাজ ৪ ↔ p.141 কাজ ৫), p.139's right trapezoid and p.141 অনু ২'s tilted square; the multiple choice take more of the pages' printed sentences (p.133–135, p.139–140, p.136's box) and the remaining blanks of p.144 কাজ ২ (1) (the 6th and 7th squares).");
  note("p.138 ডট কাগজে কোণ আঁকি: অনু ১'s four angles (drawn with pencil and ruler in the book) are drawn on an 8 × 5 dot grid, after কাজ ৪'s four on the printed 10 × 4 grid, then 5 fresh angle rounds (name or make an angle; the page drills angles, and the fresh dot rounds would bring the rectangles and squares of p.141).");
  note("p.144 প্যাটার্ন খুঁজি ও সম্পূর্ণ করি has only 3 of the book's patterns that a round can show, so it takes 7 fresh rounds (10 in all).");
  note("p.147 কোণগুলোর নাম লিখি adds নিজে ২ (1)'s V of books (drawn at 40°, mine; the book says “90 ডিগ্রির কম”) and p.137's folded corner (এক সমকোণ).");
  note("p.148 নিজে ২ (3)'s কারণ column is now four multiple-choice questions (why a কোণ is সমকোণ, স্থূলকোণ, সরল কোণ, সূক্ষ্মকোণ), the reasons from p.137–138's definitions and p.147 (9) (স্থূলকোণ is smaller than two right angles).");
  note("p.148 খালিস্থানে সঠিক আকৃতি বসাই: a fourth grey-triangle round asks the shape after the printed nine (big).");
  note("p.148 মিল করি: নিজে ৩'s four pairs, then eight pairs of the chapter's words and their printed meanings (12 pairs, two rounds of 6 in the file's order). বিন্দু and শীর্ষ বিন্দু are in different rounds, and of the four-sided words only বর্গ is used (“৪টি কোণই সমকোণ” would fit both আয়ত and বর্গ).");
  note("Multiple choice of mine (no options printed): p.135 বিন্দু, রেখা ও তল (from the pages' printed sentences), p.140 চতুর্ভুজ (from the boxes), p.144 প্যাটার্ন (কাজ ১ yes/no, কাজ ২'s turning triangle and growing/shrinking figures, the girl's ○○△△□□), p.148 নিজে ২ (1)–(2), ৪, ৫ (খ), ৬.");

  cant("p.133 কাজ ১ (draw 5 dots and join them into a star), p.145 অনু ১ (two patterns of rectangles and squares on dots), অনু ২ (patterns of a star, a circle and a hexagon), অনু ৩ (project): free drawing; p.144 কাজ ৩'s own pattern (the two printed ones are rounds).");
  cant("p.135 অনু ১ and p.141 অনু ১ (find points, lines, surfaces, rectangles and squares in the classroom): discussion.");
  cant("p.143 কাজ ১ (3) (↓ → ↓ → ↓ → →, the last one breaks it) as a “tap the one that breaks it” round: with the break at the end of only 7 arrows, a 4-shape unit (↓ → → →) also fits with one change, so the server finds two answers and refuses it. It is the yes/no question “এখানে কি প্যাটার্ন আছে?” (না) on p.144.");
  cant("p.136 কাজ ১ (find the angles in the hut picture): no round taps the corners in a picture.");
  cant("p.137 (fold a paper into a right angle; two right angles make a straight angle): a demo; its facts are in the p.146 multiple choice.");
  cant("p.144 কাজ ২ (1) (a black triangle turning in a square: a shape round has no turn), (2)–(3) and p.148 নিজে ৫ (খ) (growing and shrinking figures), and the girl's ○○△△□□ on p.144 (a unit of 6; a round's unit is 2–4 shapes): multiple choice.");
  cant("The “কারণ” parts of p.140 কাজ ৩ and p.148 নিজে ৬, and p.148 নিজে ৪'s written answer: free text (p.147 নিজে ২ (3)'s কারণ is multiple choice).");
};
