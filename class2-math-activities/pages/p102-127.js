// 3 Nov 2026, a game for every page: printed pages 102, 105, 107, 110, 111, 114, 115, 121, 125 and 127
// (অধ্যায় ৪ জ্যামিতিক আকৃতি ও প্যাটার্ন, ৫ পরিমাপ, ৬ মুদ্রা, ৭ উপাত্ত). Every number is typed as the page prints it (ASCII
// digits here, toBn() shows Bangla); every answer is computed below, never typed.
"use strict";

module.exports = (ctx) => {
  const { add, tool, mcq, numQ, finishQuestions, toBn, numIn, SHAPE_OF, rng, shuffled } = ctx;
  const keyOf = (page, slug) => `m2-p${String(page).padStart(3, "0")}-${slug}`; // as build.js makes the keys (for the seeded shuffles)

  // ═════════════ p.102 জ্যামিতিক আকৃতি: the page's own shape words, asked the other way round from p.104 ═════════════
  // p.102 shows ফুটবল / পিরামিড / বই above গোল / তিনকোনা / চারকোনা আকৃতি, then the things Rafi and Tuli collected
  // (কয়েন, ম্যাচ বাক্স, গ্লাস, মার্বেল, ছক্কা, ইট, কোণ). Here the child is given the shape and picks the thing.
  {
    const key = keyOf(102, "which-thing");
    const WORD = ["তিনকোনা আকৃতি", "চারকোনা আকৃতি", "গোল আকৃতি"]; // p.102's words, in SHAPES' order (ত্রিভুজ, চতুর্ভুজ, গোল)
    // the shapes come from build.js's SHAPE_OF (pp.102–104); ছক্কা is p.102's die (each face চারকোনা)
    const THINGS = ["ফুটবল", "পিরামিড", "বই", "১ টাকার কয়েন", "ম্যাচ বাক্স", "মার্বেল", "ইট"];
    const SHAPE = Object.fromEntries(THINGS.map((t) => { if (SHAPE_OF[t] == null) throw new Error(`p.102: no shape for ${t}`); return [t, SHAPE_OF[t]]; }));
    SHAPE["ছক্কা"] = 1;
    const WHY = {
      "ফুটবল": "ফুটবল গোল আকৃতির।", "পিরামিড": "পিরামিডের পাশগুলো তিনকোনা আকৃতির।", "বই": "বইয়ের পাশগুলো চারকোনা আকৃতির।",
      "১ টাকার কয়েন": "১ টাকার কয়েন গোলাকৃতি।", "ম্যাচ বাক্স": "ম্যাচ বাক্স এর পৃষ্ঠদেশ চারকোনা।", "মার্বেল": "মার্বেল গোল আকৃতির।",
      "ছক্কা": "ছক্কার প্রতিটি পাশ চারকোনা আকৃতির।", "ইট": "ইটের পাশগুলো চারকোনা আকৃতির।",
    };
    const r = rng(`${key}#others`);
    const thingQ = (thing) => {
      const s = SHAPE[thing];
      const others = shuffled(Object.keys(SHAPE).filter((t) => SHAPE[t] !== s), r).slice(0, 2);
      return mcq({ prompt: `কোনটি ${WORD[s]}র?`, answer: thing, others, why: WHY[thing] });
    };
    const qs = ["ফুটবল", "পিরামিড", "বই", "১ টাকার কয়েন", "ম্যাচ বাক্স", "মার্বেল", "ছক্কা", "ইট"].map(thingQ);
    // the page's names say how many corners: তিনকোনা ৩, চারকোনা ৪, গোল none (new questions, from the names)
    const CORNERS = [3, 4, 0];
    qs.push(
      numQ({ prompt: `${WORD[0]}র কয়টি কোনা আছে?`, expr: String(CORNERS[0]), unit: "টি", extra: [CORNERS[1], CORNERS[0] - 1], count: 2, why: `তিনকোনা মানে তিনটি কোনা: ${toBn(CORNERS[0])}টি কোনা।` }),
      mcq({ prompt: `${WORD[2]}র কয়টি কোনা আছে?`, answer: CORNERS[2] ? `${toBn(CORNERS[2])}টি` : "কোনো কোনা নেই", others: [`${toBn(CORNERS[0])}টি`, `${toBn(CORNERS[1])}টি`], why: "ফুটবল বা ১ টাকার কয়েনের মতো গোল আকৃতির কোনো কোনা নেই।" }),
    );
    add({ page: 102, slug: "which-thing", type: "mcq", title: "কোনটি গোল, তিনকোনা, চারকোনা?", content: finishQuestions(key, qs), src: "p.102 (ফুটবল, পিরামিড, বই; ১ টাকার কয়েন, ম্যাচ বাক্স, মার্বেল, ছক্কা, ইট); the glass and the cone are left out; the corner questions are new" });
    ctx.note("**p.102:** the game gives the page's shape word (গোল / তিনকোনা / চারকোনা আকৃতি) and asks which thing has it (p.104 asks the other way round). ছক্কা (the die) counts as চারকোনা (its faces); the glass and the cone are left out (round at the top, but four- or three-cornered seen from the side). The last two questions (তিনকোনা আকৃতির ৩টি কোনা, গোল আকৃতির কোনো কোনা নেই) are new, built from the page's shape names, to reach 10.");
  }

  // ═════════════ p.105 প্যাটার্ন: the colour patterns in its pictures ═════════════
  // জেব্রা ক্রসিং (white stripes on the dark road), the zebra's সাদাকালো stripes, the traffic lights (red, yellow, green,
  // top to bottom); the last two patterns are new, with the same colours. ☐ = the box to fill.
  {
    const key = keyOf(105, "colour-patterns");
    const SYM = { w: "⬜", k: "⬛", r: "🔴", y: "🟡", g: "🟢" };
    const NAME = { w: "সাদা", k: "কালো", r: "লাল", y: "হলুদ", g: "সবুজ" };
    const opt = (c) => `${SYM[c]} ${NAME[c]}`;
    // the options: the pattern's colours, and one more (so there are always three), in a fixed order
    const optsOf = (unit) => { const cs = [...new Set(unit)]; for (const c of "wkryg") if (cs.length < 3 && !cs.includes(c)) cs.push(c); return "wkryg".split("").filter((c) => cs.includes(c)).map(opt); };
    const unitText = (unit) => unit.split("").map((c) => SYM[c]).join(" ");
    const nextQ = (intro, unit, shown) => {
      const seq = Array.from({ length: shown }, (_, i) => unit[i % unit.length]);
      const next = unit[shown % unit.length];
      return mcq({ prompt: `${intro}: ${seq.map((c) => SYM[c]).join(" ")} … পরেরটি কোন রং?`, answer: opt(next), fixed: optsOf(unit), why: `${unitText(unit)} বারবার আসছে, তাই এরপর ${opt(next)}।` });
    };
    const gapQ = (intro, unit, length, gap) => {
      const seq = Array.from({ length }, (_, i) => unit[i % unit.length]);
      const ans = seq[gap];
      return mcq({ prompt: `${intro}: ${seq.map((c, i) => (i === gap ? "☐" : SYM[c])).join(" ")}। খালি ঘরে কোন রং বসবে?`, answer: opt(ans), fixed: optsOf(unit), why: `${unitText(unit)} বারবার আসছে, তাই খালি ঘরে ${opt(ans)}।` });
    };
    const qs = [
      nextQ("জেব্রা ক্রসিংয়ের ডোরা", "wk", 7), nextQ("জেব্রার শরীরের সাদাকালো ডোরা", "kw", 5),
      nextQ("ট্রাফিক বাতির রং", "ryg", 7), nextQ("ট্রাফিক বাতির রং", "ryg", 5),
      gapQ("জেব্রা ক্রসিংয়ের ডোরা", "wk", 6, 3), gapQ("ট্রাফিক বাতির রং", "ryg", 6, 2),
      nextQ("নতুন প্যাটার্ন", "wwk", 7), nextQ("নতুন প্যাটার্ন", "ggr", 8),
    ];
    // which row keeps the pattern? the right row and rows with one colour changed (the next colour of the unit)
    const rowQ = (intro, unit, length, breaks) => {
      const good = Array.from({ length }, (_, i) => unit[i % unit.length]);
      const rows = [good, ...breaks.map((at) => good.map((c, i) => (i === at ? unit[(unit.indexOf(c) + 1) % unit.length] : c)))];
      const keeps = (row) => row.every((c, i) => c === unit[i % unit.length]);
      if (rows.filter(keeps).length !== 1) throw new Error(`p.105: ${unit} rows`);
      const show = (row) => row.map((c) => SYM[c]).join(" ");
      return mcq({ prompt: `${intro}: কোন সারিতে প্যাটার্ন ঠিক আছে?`, answer: show(rows.find(keeps)), others: rows.filter((x) => !keeps(x)).map(show), why: `${unitText(unit)} বারবার আসছে কেবল এই সারিতে: ${show(good)}।` });
    };
    qs.push(rowQ("জেব্রা ক্রসিংয়ের মতো সাদাকালো ডোরা", "wk", 6, [3, 4]), rowQ("ট্রাফিক বাতির রং", "ryg", 6, [4, 2]));
    add({ page: 105, slug: "colour-patterns", type: "mcq", title: "রঙের প্যাটার্ন: পরেরটি কী?", content: finishQuestions(key, qs), src: "p.105 (জেব্রা ক্রসিং, জেব্রার সাদাকালো ডোরা, ট্রাফিক বাতি); questions 7–8 use new patterns with the same colours; 9–10 ask which row keeps the pattern" });
    ctx.note("**p.105** has no exercise; its game asks the colour patterns in its pictures: the জেব্রা ক্রসিং (⬜ ⬛: white stripes on the dark road), the zebra's সাদাকালো stripes and the traffic lights (🔴 🟡 🟢, the order the poles show top to bottom, not the lights' timing). Two patterns (⬜⬜⬛, 🟢🟢🔴) are new, and the last two questions (which row keeps the ⬜⬛ or 🔴🟡🟢 pattern; the wrong rows have one colour changed) are new, added to reach 10.");
  }

  // ═════════════ p.107 দৈর্ঘ্য পরিমাপ: comparing two pencils; measuring with a pencil ═════════════
  {
    const key = keyOf(107, "compare-length");
    // the page: the girl's pencil and the boy's ("হ্যাঁ, তোমার পেনসিল বড়ো। আমার পেনসিল ছোটো।" says the boy to the girl)
    const PENCILS = ["মেয়েটির পেনসিল", "ছেলেটির পেনসিল"]; // longer first, as the boy says
    const talk = "মেয়েটি বলল, “আমার পেনসিলের সাথে তোমার পেনসিল লম্বায় তুলনা করি।” ছেলেটি বলল, “হ্যাঁ, তোমার পেনসিল বড়ো। আমার পেনসিল ছোটো।”";
    const penFixed = [...PENCILS, "দুটি সমান"];
    // exercise 1: the textbook and the geometry box measured with a pencil (how many pencils long: mine; the page has no numbers)
    const BY_PENCIL = [["প্রাথমিক গণিত পাঠ্যপুস্তক", 3], ["জ্যামিতি বাক্স", 2]];
    const [[bookName, book], [boxName, box]] = BY_PENCIL;
    const longer = book > box ? bookName : book < box ? boxName : "দুটি সমান";
    const measured = `একটি পেনসিল দিয়ে মেপে দেখা গেল, ${bookName} ${toBn(book)} পেনসিলের সমান লম্বা এবং ${boxName} ${toBn(box)} পেনসিলের সমান লম্বা।`;
    // the same book measured with two pencils: the fewer pencils it takes, the longer the pencil
    const BOTH = [["তুলির পেনসিল", 4], ["রাফির পেনসিল", 3]];
    const longPencil = BOTH[0][1] < BOTH[1][1] ? BOTH[0][0] : BOTH[1][0];
    const qs = [
      mcq({ prompt: `${talk} কার পেনসিল লম্বায় বড়ো?`, answer: PENCILS[0], fixed: penFixed, why: "ছেলেটি বলল, “তোমার পেনসিল বড়ো”: মেয়েটির পেনসিল লম্বায় বড়ো।" }),
      mcq({ prompt: `${talk} কার পেনসিল লম্বায় ছোটো?`, answer: PENCILS[1], fixed: penFixed, why: "ছেলেটি বলল, “আমার পেনসিল ছোটো”: ছেলেটির পেনসিল লম্বায় ছোটো।" }),
      mcq({ prompt: "দুটি পেনসিল লম্বায় তুলনা করতে কীভাবে রাখি?", answer: "পাশাপাশি, এক প্রান্ত সমান করে", others: ["একটির উপর আরেকটি আড়াআড়ি করে", "দুটিকে দূরে দূরে রেখে"], why: "পাশাপাশি রেখে এক প্রান্ত সমান করলে অন্য প্রান্ত দেখে বোঝা যায় কোনটি লম্বায় বড়ো।" }),
      mcq({ prompt: `${measured} কোনটি লম্বায় বড়ো?`, answer: longer, fixed: [bookName, boxName, "দুটি সমান"], why: `${toBn(Math.max(book, box))} পেনসিল ${toBn(Math.min(book, box))} পেনসিলের চেয়ে বেশি, তাই ${longer} লম্বায় বড়ো।` }),
      numQ({ prompt: `${measured} পাঠ্যপুস্তকটি জ্যামিতি বাক্সের চেয়ে কত পেনসিল বেশি লম্বা?`, expr: `${book}-${box}`, unit: " পেনসিল", extra: [`${book}+${box}`, box], count: 2 }),
      mcq({ prompt: `তুলি ও রাফি নিজের নিজের পেনসিল দিয়ে একই বই মাপল। তুলির পেনসিলে বইটি ${toBn(BOTH[0][1])} পেনসিল লম্বা হলো, রাফির পেনসিলে ${toBn(BOTH[1][1])} পেনসিল। কার পেনসিল লম্বায় বড়ো?`, answer: longPencil, fixed: [BOTH[0][0], BOTH[1][0], "দুটি সমান"], why: `একই বই মাপতে ${longPencil === BOTH[1][0] ? "রাফির" : "তুলির"} কম পেনসিল লেগেছে, তাই ${longPencil} লম্বায় বড়ো।` }),
    ];
    // to reach 10 (new, from the page's idea): the comparison turned round, the two things end to end, an equal pair, the shortest of three
    const SCALE = 2, BENCH = 10; // a স্কেল and a বেঞ্চ measured with the same pencil (mine)
    const three = [[bookName, book], [boxName, box], ["বেঞ্চ", BENCH]];
    const shortest = three.reduce((x, y) => (y[1] < x[1] ? y : x));
    qs.push(
      mcq({ prompt: "মেয়েটির পেনসিল ছেলেটির পেনসিলের চেয়ে লম্বায় বড়ো। তাহলে ছেলেটির পেনসিল মেয়েটির পেনসিলের চেয়ে লম্বায় কেমন?", answer: "ছোটো", fixed: ["বড়ো", "ছোটো", "সমান"], why: "একটি পেনসিল অন্যটির চেয়ে বড়ো হলে অন্যটি তার চেয়ে ছোটো।" }),
      numQ({ prompt: `${measured} পাঠ্যপুস্তক ও জ্যামিতি বাক্স এক লাইনে পরপর রাখলে মোট কত পেনসিল লম্বা হবে?`, expr: `${book}+${box}`, unit: " পেনসিল", extra: [`${book}-${box}`, book], count: 2 }),
      mcq({ prompt: `একই পেনসিল দিয়ে মেপে দেখা গেল, ${boxName} ${toBn(box)} পেনসিল লম্বা এবং একটি স্কেল ${toBn(SCALE)} পেনসিল লম্বা। কোনটি লম্বায় বড়ো?`, answer: box > SCALE ? boxName : box < SCALE ? "স্কেল" : "দুটি সমান", fixed: [boxName, "স্কেল", "দুটি সমান"], why: `দুটিই ${toBn(box)} পেনসিল লম্বা, তাই দুটি সমান।` }),
      mcq({ prompt: `একই পেনসিল দিয়ে মেপে দেখা গেল, ${three.map(([n, v]) => `${n} ${toBn(v)} পেনসিল`).join(", ")} লম্বা। কোনটি লম্বায় সবচেয়ে ছোটো?`, answer: shortest[0], fixed: three.map((t) => t[0]), why: `${shortest[0]} মাপতে সবচেয়ে কম, ${toBn(shortest[1])}টি পেনসিল লেগেছে।` }),
    );
    if (box !== SCALE) throw new Error("p.107: the স্কেল question is the equal one");
    add({ page: 107, slug: "compare-length", type: "mcq", title: "লম্বায় তুলনা করি: পেনসিল দিয়ে মাপি", content: finishQuestions(key, qs), src: "p.107 (মেয়েটির ও ছেলেটির পেনসিল; 1: পাঠ্যপুস্তক ও জ্যামিতি বাক্স পেনসিল দিয়ে মাপা); the pencil counts are mine; questions 7–10 are new" });
    ctx.note("**p.107** prints no lengths: its pencils are compared by the children's words (“তোমার পেনসিল বড়ো। আমার পেনসিল ছোটো।”), and exercise 1's measuring with a pencil uses counts of mine (পাঠ্যপুস্তক ৩, জ্যামিতি বাক্স ২ পেনসিল; the same book ৪ পেনসিল with তুলির পেনসিল, ৩ with রাফির). Questions 7–10 are new, from the page's idea, to reach 10: the comparison turned round, the two things end to end (৩ + ২), a স্কেল as long as the geometry box (২ পেনসিল), and the shortest of three (with a বেঞ্চ of ১০ পেনসিল).");
  }

  // ═════════════ p.110 উচ্চতা (the standing ruler: গ্লাস ৩, মোমবাতি ৫ সে.মি.) and the দৈর্ঘ্য / প্রস্থ table ═════════════
  {
    const key = keyOf(110, "height-width");
    const GLASS = 3, CANDLE = 5; // p.110: the dashed lines meet the standing ruler at 3 and 5
    const taller = GLASS > CANDLE ? "গ্লাস" : GLASS < CANDLE ? "মোমবাতি" : "দুটি সমান";
    const both = `গ্লাসটি ${toBn(GLASS)} সে.মি. এবং মোমবাতিটি ${toBn(CANDLE)} সে.মি. উঁচু।`;
    const KHATA = [25, 18]; // Rafi's খাতা: দৈর্ঘ্য, প্রস্থ (mine: the page's table is empty)
    const qs = [
      numQ({ prompt: `দাঁড় করানো স্কেলের পাশে একটি গ্লাস রাখা হলো। গ্লাসের মুখ স্কেলের ${toBn(GLASS)} এর দাগ বরাবর। গ্লাসটি কত সেন্টিমিটার উঁচু?`, expr: String(GLASS), unit: " সে.মি.", extra: [GLASS * 2, GLASS - 1], count: 2, why: `গ্লাসের মুখ ${toBn(GLASS)} এর দাগ বরাবর, তাই গ্লাসটি ${toBn(GLASS)} সে.মি. উঁচু।` }),
      numQ({ prompt: `মোমবাতির উপরের প্রান্ত (শিখা ছাড়া) স্কেলের ${toBn(CANDLE)} এর দাগ বরাবর। মোমবাতিটি কত সেন্টিমিটার উঁচু?`, expr: String(CANDLE), unit: " সে.মি.", extra: [CANDLE + 1, CANDLE - 1], count: 2, why: `মোমবাতির উপরের প্রান্ত ${toBn(CANDLE)} এর দাগ বরাবর, তাই মোমবাতিটি ${toBn(CANDLE)} সে.মি. উঁচু।` }),
      mcq({ prompt: `${both} কোনটি বেশি উঁচু?`, answer: taller, fixed: ["গ্লাস", "মোমবাতি", "দুটি সমান"], why: `${toBn(Math.max(GLASS, CANDLE))} সে.মি. ${toBn(Math.min(GLASS, CANDLE))} সে.মি. এর চেয়ে বেশি, তাই ${taller} বেশি উঁচু।` }),
      numQ({ prompt: `${both} মোমবাতিটি গ্লাসের চেয়ে কত সে.মি. বেশি উঁচু?`, expr: `${CANDLE}-${GLASS}`, unit: " সে.মি.", extra: [`${CANDLE}+${GLASS}`, GLASS], count: 2 }),
      mcq({ prompt: "ছকে খাতা, পাঠ্যপুস্তক ও বেঞ্চের দৈর্ঘ্য ও প্রস্থ কোন এককে লিখব?", answer: "সেন্টিমিটার (সে.মি.)", others: ["কিলোগ্রাম (কেজি)", "লিটার"], why: "ছকে লেখা আছে: দৈর্ঘ্য (সে.মি.) ও প্রস্থ (সে.মি.)।" }),
      mcq({ prompt: "খাতার লম্বা দিকের মাপকে বলে দৈর্ঘ্য। খাতার চওড়া দিকের মাপকে কী বলে?", answer: "প্রস্থ", others: ["উচ্চতা", "ওজন"], why: "লম্বা দিকের মাপ দৈর্ঘ্য, চওড়া দিকের মাপ প্রস্থ।" }),
      numQ({ prompt: `রাফি স্কেল দিয়ে তার খাতা মেপে ছকে লিখল: দৈর্ঘ্য ${toBn(KHATA[0])} সে.মি., প্রস্থ ${toBn(KHATA[1])} সে.মি.। খাতার দৈর্ঘ্য প্রস্থের চেয়ে কত সে.মি. বেশি?`, expr: `${KHATA[0]}-${KHATA[1]}`, unit: " সে.মি.", extra: [`${KHATA[0]}+${KHATA[1]}`, `${KHATA[0]}-${KHATA[1]}+2`] }),
    ];
    // to reach 10: two glasses one on the other (the ruler's top, ৬), a tape for the long things in the table, and one more
    // row of Rafi's table (জ্যামিতি বক্স ১৭ সে.মি.: mine)
    const BOX = 17;
    qs.push(
      numQ({ prompt: `${toBn(GLASS)} সে.মি. উঁচু দুটি একই রকম গ্লাস একটির উপর আরেকটি বসালে কত সে.মি. উঁচু হবে?`, expr: `${GLASS}+${GLASS}`, unit: " সে.মি.", extra: [GLASS, GLASS + 1], count: 2 }),
      mcq({ prompt: "ছকের কোন জিনিসটির দৈর্ঘ্য মাপতে স্কেলের চেয়ে ফিতা বেশি সুবিধাজনক?", answer: "ব্ল্যাকবোর্ড", others: ["জ্যামিতি বক্স", "কলম"], why: "ব্ল্যাকবোর্ড স্কেলের চেয়ে অনেক লম্বা, তাই লম্বা ফিতা দিয়ে মাপা সহজ।" }),
      numQ({ prompt: `রাফির ছকে খাতার দৈর্ঘ্য ${toBn(KHATA[0])} সে.মি. এবং জ্যামিতি বক্সের দৈর্ঘ্য ${toBn(BOX)} সে.মি.। খাতা জ্যামিতি বক্সের চেয়ে কত সে.মি. লম্বা?`, expr: `${KHATA[0]}-${BOX}`, unit: " সে.মি.", extra: [`${KHATA[0]}+${BOX}`, `${KHATA[0]}-${BOX}+10`], count: 2 }),
    );
    add({ page: 110, slug: "height-width", type: "mcq", title: "কত সে.মি. উঁচু? দৈর্ঘ্য ও প্রস্থ", content: finishQuestions(key, qs), src: "p.110 (গ্লাস ৩ সে.মি., মোমবাতি ৫ সে.মি.; 1: দৈর্ঘ্য ও প্রস্থের ছক); রাফির খাতা ২৫ × ১৮ সে.মি. and জ্যামিতি বক্স ১৭ সে.মি. are mine" });
    ctx.note("**p.110:** the glass (৩ সে.মি.) and the candle (৫ সে.মি.) are also items in p.109's ruler game; this page's game asks them as heights on its standing ruler and compares them. Exercise 1's table is empty in the book, so the table questions use Rafi's measures of mine (খাতা দৈর্ঘ্য ২৫, প্রস্থ ১৮ সে.মি.; জ্যামিতি বক্স ১৭ সে.মি.). Questions 8–10 are new, added to reach 10: two glasses one on the other (৩ + ৩), a tape for the ব্ল্যাকবোর্ড, and খাতা − জ্যামিতি বক্স.");
  }

  // ═════════════ p.111 ওজন পরিমাপ: কোনটি ভারী? and কেজি / গ্রাম ═════════════
  {
    const key = keyOf(111, "heavier");
    // the page: "আমার মনে হয় ডাস্টারের ওজন বেশি হবে" and "কলমের সাথে বেলুনের … কলমের ওজন বেশি হবে": heaviest first
    const HEAVY = ["ডাস্টার", "কলম", "বেলুন"];
    const heavier = (a, b) => (HEAVY.indexOf(a) < HEAVY.indexOf(b) ? a : b);
    const grams = (t) => numIn(t) * (/কেজি/.test(t) ? 1000 : 1); // "১ কেজি" → 1000, "৫০০ গ্রাম" → 500 (১ কেজি = ১০০০ গ্রাম)
    const kgQ = (a, b) => {
      const ga = grams(a), gb = grams(b);
      const ans = ga > gb ? a : ga < gb ? b : "দুটি সমান";
      const why = ga === gb ? `১ কেজি = ১০০০ গ্রাম, তাই ${a} ও ${b} সমান।` : `১ কেজি = ১০০০ গ্রাম; ${toBn(Math.max(ga, gb))} গ্রাম ${toBn(Math.min(ga, gb))} গ্রামের চেয়ে বেশি, তাই ${ans} ভারী।`;
      return mcq({ prompt: `${a} ও ${b}${/কেজি$/.test(b) ? "র" : "ের"} মধ্যে কোনটি ভারী?`, answer: ans, fixed: [a, b, "দুটি সমান"], why });
    };
    const sum = 500 + 500;
    const qs = [
      mcq({ prompt: "কোন বস্তুটি ভারী? ১টি ডাস্টার না ১টি কলম?", answer: heavier("ডাস্টার", "কলম"), fixed: ["ডাস্টার", "কলম", "দুটি সমান"], why: "এক হাতে ডাস্টার ও অন্য হাতে কলম নিয়ে তুলনা করি: ডাস্টারের ওজন বেশি।" }),
      mcq({ prompt: "কলম ও বেলুনের মধ্যে কোনটি ভারী?", answer: heavier("কলম", "বেলুন"), fixed: ["বেলুন", "কলম", "দুটি সমান"], why: "কলমের সাথে বেলুনের ওজন হাতে নিয়ে তুলনা করলে কলমের ওজন বেশি।" }),
      mcq({ prompt: "ডাস্টার, কলম ও বেলুনের মধ্যে কোনটি সবচেয়ে হালকা?", answer: HEAVY[HEAVY.length - 1], fixed: HEAVY, why: "ডাস্টার কলমের চেয়ে ভারী, কলম বেলুনের চেয়ে ভারী: তাই বেলুন সবচেয়ে হালকা।" }),
      mcq({ prompt: "দাঁড়িপাল্লার এক পাল্লায় ডাস্টার ও অন্য পাল্লায় কলম রাখলে কোন পাল্লা নিচে নামবে?", answer: `${heavier("ডাস্টার", "কলম")}ের পাল্লা`, fixed: ["কলমের পাল্লা", "ডাস্টারের পাল্লা", "দুটি সমান থাকবে"], why: "ভারী জিনিসের পাল্লা নিচে নামে; ডাস্টার কলমের চেয়ে ভারী।" }),
      kgQ("১ কেজি", "৫০০ গ্রাম"),
      kgQ("১০০০ গ্রাম", "১ কেজি"),
      mcq({ prompt: "৫০০ গ্রাম ও আরও ৫০০ গ্রাম মিলে কত হয়?", answer: `${toBn(sum / 1000)} কেজি`, others: ["১০০ গ্রাম", "৫ কেজি"], why: `৫০০ + ৫০০ = ${toBn(sum)} গ্রাম = ${toBn(sum / 1000)} কেজি`, v: { expr: "500+500", div: 1000 } }),
    ];
    // to reach 10, from the page's pictures (the seller's দাঁড়িপাল্লা, the ডিজিটাল মাপনী) and its ১ কেজি = ১০০০ গ্রাম
    const KG = 1000;
    qs.push(
      mcq({ prompt: "দোকানি দাঁড়িপাল্লার এক পাল্লায় কমলা আর অন্য পাল্লায় ১ কেজির বাটখারা রাখলেন। পাল্লা দুটি সমান হলো। কমলাগুলোর ওজন কত?", answer: `${toBn(KG / 1000)} কেজি`, others: ["১০০ গ্রাম", "৫০০ গ্রাম"], why: "পাল্লা দুটি সমান হলে দুদিকের ওজন সমান: কমলাগুলোর ওজন ১ কেজি।", v: { expr: String(KG), div: 1000 } }),
      kgQ("৯০০ গ্রাম", "১ কেজি"),
      mcq({ prompt: "কোন যন্ত্রে বস্তু রাখলেই তার ওজন সংখ্যায় লেখা দেখা যায়?", answer: "ডিজিটাল মাপনী", others: ["দাঁড়িপাল্লা", "স্কেল"], why: "ডিজিটাল মাপনীর পর্দায় ওজন সংখ্যায় দেখা যায়; দাঁড়িপাল্লায় বাটখারা দিয়ে মাপতে হয়।" }),
    );
    add({ page: 111, slug: "heavier", type: "mcq", title: "কোনটি ভারী? কেজি ও গ্রাম", content: finishQuestions(key, qs), src: "p.111 (ডাস্টার না কলম; কলম ও বেলুন; ১ কেজি = ১০০০ গ্রাম; the seller's দাঁড়িপাল্লা and the ডিজিটাল মাপনী)" });
    ctx.note("**p.111:** the children only guess the weights (“আমার মনে হয় ডাস্টারের ওজন বেশি হবে”, “কলমের ওজন বেশি হবে বলে মনে হয়”); the game takes ডাস্টার > কলম > বেলুন from those words. Its units questions compare ১ কেজি with gram amounts; p.112's game already asks the page's unit facts (কেজি, গ্রাম, দাঁড়িপাল্লা). Questions 8–10 are new, added to reach 10: the seller's balance level with a ১ কেজি weight (the page's picture), ৯০০ গ্রাম vs ১ কেজি, and the ডিজিটাল মাপনী showing the weight as a number.");
  }

  // ═════════════ p.114 তরলের আয়তন: the three ways to compare two bottles (রেজা, তুলি, রাফি) ═════════════
  {
    const key = keyOf(114, "which-bottle");
    const OPTS = ["প্রথম বোতলে", "দ্বিতীয় বোতলে", "দুটিতে সমান"];
    const more = (a, b) => (a > b ? OPTS[0] : a < b ? OPTS[1] : OPTS[2]); // a, b: how much each bottle holds (glasses)
    const ask = "কোন বোতলে বেশি পানি ধরে?";
    // (১) রেজার পদ্ধতি: the first bottle poured into the second
    const reza = (a, b) => mcq({
      prompt: `রেজা প্রথম বোতলের সব পানি খালি দ্বিতীয় বোতলে ঢালল। ${a > b ? "দ্বিতীয় বোতল ভরে গিয়ে পানি উপচে পড়ল" : a < b ? "দ্বিতীয় বোতল পুরো ভরল না" : "দ্বিতীয় বোতল ঠিক কানায় কানায় ভরে গেল"}। ${ask}`,
      answer: more(a, b), fixed: OPTS,
      why: a > b ? "প্রথম বোতলের সব পানি দ্বিতীয় বোতলে আঁটল না, তাই প্রথম বোতলে বেশি পানি ধরে।" : a < b ? "প্রথম বোতলের সব পানি ঢেলেও দ্বিতীয় বোতল ভরল না, তাই দ্বিতীয় বোতলে বেশি পানি ধরে।" : "প্রথম বোতলের পানিতে দ্বিতীয় বোতল ঠিক ভরে গেল, তাই দুটিতে সমান পানি ধরে।",
    });
    // (২) তুলির পদ্ধতি: a mark on one glass
    const tuli = (a, b) => mcq({
      prompt: `তুলি প্রথম বোতলের পানি একটি পাত্রে ঢেলে পানির উপর দাগ দিল। পাত্র খালি করে দ্বিতীয় বোতলের পানি ঢালল। পানি ${b > a ? "দাগের উপরে উঠল" : b < a ? "দাগের নিচে থাকল" : "ঠিক দাগ পর্যন্ত উঠল"}। ${ask}`,
      answer: more(a, b), fixed: OPTS,
      why: b > a ? "দ্বিতীয় বোতলের পানি দাগ ছাড়িয়ে গেল, তাই দ্বিতীয় বোতলে বেশি পানি ধরে।" : b < a ? "দ্বিতীয় বোতলের পানি দাগ পর্যন্ত পৌঁছাল না, তাই প্রথম বোতলে বেশি পানি ধরে।" : "দুই বোতলের পানি একই দাগ পর্যন্ত উঠল, তাই দুটিতে সমান পানি ধরে।",
    });
    // (৩) রাফির পদ্ধতি: two glasses of the same shape
    const rafi = (a, b) => mcq({
      prompt: `রাফি একই আকৃতির দুটি গ্লাসের একটিতে প্রথম বোতলের, অন্যটিতে দ্বিতীয় বোতলের পানি ঢালল। ${a > b ? "প্রথম বোতলের পানি বেশি উঁচুতে উঠল" : a < b ? "দ্বিতীয় বোতলের পানি বেশি উঁচুতে উঠল" : "দুটি গ্লাসে পানি সমান উঁচুতে উঠল"}। ${ask}`,
      answer: more(a, b), fixed: OPTS,
      why: a === b ? "একই আকৃতির গ্লাসে পানি সমান উঁচু, তাই দুটিতে সমান পানি ধরে।" : `একই আকৃতির গ্লাসে যে পানি বেশি উঁচু, সেটিই বেশি: ${more(a, b)} বেশি পানি ধরে।`,
    });
    const qs = [
      reza(5, 4), reza(3, 4), tuli(4, 5), tuli(5, 4), rafi(4, 4), rafi(3, 5),
      mcq({ prompt: "রাফি একই আকৃতির দুটি পাত্র ব্যবহার করল কেন?", answer: "পানি কত উঁচুতে উঠল দেখে তুলনা করতে", others: ["পাত্র দুটি সুন্দর দেখাতে", "পানি ঠান্ডা রাখতে"], why: "একই আকৃতির পাত্রে যে পানি বেশি উঁচুতে ওঠে, সেটিই বেশি পানি।" }),
    ];
    // to reach 10: Reza's third outcome (the bottles hold the same), and which child's method is which (the page's words)
    const METHODS = [["রেজার পদ্ধতি", "প্রথম বোতল থেকে দ্বিতীয় বোতলে পানি ঢেলে"], ["তুলির পদ্ধতি", "পাত্রে পানি ঢেলে দাগ দিয়ে"], ["রাফির পদ্ধতি", "একই আকৃতির দুটি পাত্রে পানি ঢেলে"]];
    const methodQ = (i) => mcq({ prompt: `কার পদ্ধতিতে ${METHODS[i][1]} তুলনা করা হয়েছে?`, answer: METHODS[i][0], fixed: METHODS.map((m) => m[0]), why: `${METHODS[i][0]}: ${METHODS[i][1]} তুলনা করা হয়।` });
    qs.push(reza(4, 4), methodQ(0), methodQ(1));
    add({ page: 114, slug: "which-bottle", type: "mcq", title: "কোন বোতলে বেশি পানি ধরে?", content: finishQuestions(key, qs), src: "p.114 (১) রেজার, (২) তুলির, (৩) রাফির পদ্ধতি; what each one sees is mine" });
    ctx.note("**p.114** shows three ways to compare two bottles but no result; each question gives one way with an outcome of mine (the second bottle overflows, doesn't fill or fills exactly; the water passes the mark or not; one glass is fuller) and asks which bottle holds more. Questions 8–10 were added to reach 10: Reza's third outcome (exactly full: the same) and two that match a method to its child, in the page's words.");
  }

  // ═════════════ p.115: how many glasses each bottle and pot fills ═════════════
  {
    const key = keyOf(115, "glasses");
    const glasses = ([, n, part]) => (part ? `${toBn(n)} গ্লাস ও আরও প্রায় আধা গ্লাস` : `${toBn(n)} গ্লাস`);
    const amount = ([, n, part]) => n + part;
    // 1: the small bottle fills 4 glasses, the big one 4 and a glass about half full
    const BOTTLES = [["ছোটো বোতল", 4, 0], ["বড়ো বোতল", 4, 0.5]];
    const [small, big] = BOTTLES;
    const bigger = amount(small) > amount(big) ? "ছোটো বোতলে" : amount(small) < amount(big) ? "বড়ো বোতলে" : "দুটিতে সমান";
    const bottles = `ছোটো বোতলের পানিতে ${glasses(small)} ভরে, বড়ো বোতলের পানিতে ${glasses(big)} ভরে।`;
    const extra = amount(big) - amount(small);
    const extraText = extra === 0.5 ? "প্রায় আধা গ্লাস" : `${toBn(extra)} গ্লাস`;
    // 3: (১) চায়ের কেতলি ৭ গ্লাস, (২) সসপ্যান ৫ গ্লাস ও প্রায় আধা গ্লাস, (৩) বালতি ৮ গ্লাস
    const POTS = [["চায়ের কেতলি", 7, 0], ["সসপ্যান", 5, 0.5], ["বালতি", 8, 0]];
    const pots = `চায়ের কেতলিতে ${glasses(POTS[0])}, সসপ্যানে ${glasses(POTS[1])} এবং বালতিতে ${glasses(POTS[2])} পানি ধরে।`;
    const most = POTS.reduce((x, y) => (amount(y) > amount(x) ? y : x)), least = POTS.reduce((x, y) => (amount(y) < amount(x) ? y : x));
    const [kettle, , bucket] = POTS;
    const qs = [
      mcq({ prompt: `${bottles} ${"কোন বোতলে বেশি পানি ধরে?"}`, answer: bigger, fixed: ["ছোটো বোতলে", "বড়ো বোতলে", "দুটিতে সমান"], why: `ছোটো বোতল ${glasses(small)}, বড়ো বোতল ${glasses(big)}: ${bigger} বেশি পানি ধরে।` }),
      mcq({ prompt: `${bottles} বড়ো বোতলে কতটুকু বেশি পানি ধরে?`, answer: extraText, others: ["১ গ্লাস", `${toBn(small[1])} গ্লাস`], why: `দুটি বোতলেই ${toBn(small[1])} গ্লাস করে; বড়ো বোতলে আরও ${extraText}।` }),
      mcq({ prompt: `${pots} কোন পাত্রে সবচেয়ে বেশি পানি ধরে?`, answer: most[0], fixed: POTS.map((p) => p[0]), why: `${most[0]} ${glasses(most)}, সবচেয়ে বেশি।` }),
      mcq({ prompt: `${pots} কোন পাত্রে সবচেয়ে কম পানি ধরে?`, answer: least[0], fixed: POTS.map((p) => p[0]), why: `${least[0]} ${glasses(least)}, ${toBn(least[1] + 1)} গ্লাসেরও কম: সবচেয়ে কম।` }),
      numQ({ prompt: `${pots} বালতিতে চায়ের কেতলির চেয়ে কত গ্লাস বেশি পানি ধরে?`, expr: `${bucket[1]}-${kettle[1]}`, unit: " গ্লাস", extra: [`${bucket[1]}+${kettle[1]}`, 2] }),
      numQ({ prompt: `${pots} চায়ের কেতলি ও বালতি মিলে কত গ্লাস পানি ধরে?`, expr: `${kettle[1]}+${bucket[1]}`, unit: " গ্লাস", extra: [`${bucket[1]}-${kettle[1]}`] }),
      mcq({ prompt: "দুটি গ্লাসে পানি একই উঁচু পর্যন্ত আছে, কিন্তু দ্বিতীয় গ্লাসটি বেশি চওড়া। কোনটিতে বেশি পানি আছে?", answer: "দ্বিতীয় (চওড়া) গ্লাসে", others: ["প্রথম গ্লাসে", "দুটিতে সমান"], why: "পানি সমান উঁচু হলেও চওড়া গ্লাসে বেশি পানি ধরে।" }),
    ];
    // to reach 10, with exercises 1 and 3's numbers: the pot in the middle, two kettles, and the সসপ্যান against the big bottle
    // (both hold some glasses and about half a glass more, so the halves cancel)
    const order = POTS.slice().sort((x, y) => amount(x) - amount(y));
    const pan = POTS[1];
    if (pan[2] !== big[2]) throw new Error("p.115: the halves must match");
    qs.push(
      mcq({ prompt: `${pots} কম পানি থেকে বেশি পানি অনুযায়ী সাজালে মাঝে কোন পাত্র থাকবে?`, answer: order[1][0], fixed: POTS.map((p) => p[0]), why: `${order.map((p) => p[0]).join(", ")}: মাঝে ${order[1][0]}।` }),
      numQ({ prompt: `চায়ের কেতলিতে ${glasses(kettle)} পানি ধরে। এমন ২টি কেতলি ভরতে কত গ্লাস পানি লাগবে?`, expr: `${kettle[1]}+${kettle[1]}`, unit: " গ্লাস", extra: [kettle[1], kettle[1] + 2], count: 2 }),
      numQ({ prompt: `বড়ো বোতলে ${glasses(big)} এবং সসপ্যানে ${glasses(pan)} পানি ধরে। সসপ্যানে বড়ো বোতলের চেয়ে কত গ্লাস বেশি পানি ধরে?`, expr: `${pan[1]}-${big[1]}`, unit: " গ্লাস", extra: [`${pan[1]}+${big[1]}`, 2], count: 2, why: `দুটিতেই প্রায় আধা গ্লাস বাড়তি; ${toBn(pan[1])} − ${toBn(big[1])} = ${toBn(pan[1] - big[1])}` }),
    );
    add({ page: 115, slug: "glasses", type: "mcq", title: "কয় গ্লাস পানি ধরে?", content: finishQuestions(key, qs), src: "p.115 1 (ছোটো বোতল ৪ গ্লাস, বড়ো বোতল ৪ গ্লাস ও প্রায় আধা), 2 (দুটি গ্লাস), 3 (কেতলি ৭, সসপ্যান ৫ ও প্রায় আধা, বালতি ৮ গ্লাস)" });
    ctx.note("**p.115:** the pots in exercise 3 aren't named on the page; the file calls them চায়ের কেতলি, সসপ্যান and বালতি. The part-filled glass (exercise 1's big bottle, exercise 3's সসপ্যান) is read as “প্রায় আধা গ্লাস” (it is a little over half full at 300 dpi). Questions 8–10 are new, with the page's numbers, to reach 10: the pot in the middle, two kettles (৭ + ৭), and the সসপ্যান against the big bottle (৫ − ৪, the halves cancel).");
  }

  // ═════════════ p.121 বাংলাদেশি মুদ্রা: the page's coins (১, ২, ৫ টাকা) and notes (২০০, ৫০০, ১০০০ টাকা), counted ═════════════
  {
    const COINS = [1, 2, 5], NOTES = [200, 500, 1000]; // p.121's two tables
    // ten mixes of mine (a tool game takes at most 10 items; no fresh problems: they would bring p.123–124's notes)
    const sets = [[5, 2, 1], [5, 5, 2, 1], [2, 2, 2, 1, 1], [5, 5, 5, 5], [200, 200, 200], [500, 200], [500, 200, 200, 5, 1], [200, 5, 2, 2], [500, 500], [1000]];
    for (const s of sets) if (s.some((v) => !COINS.includes(v) && !NOTES.includes(v))) throw new Error(`p.121: ${s} isn't the page's money`);
    tool({
      page: 121, slug: "coins-notes", type: "taka_shop", title: "কয়েন ও নোট গুনি",
      items: sets.map((s) => ({ kind: "money", ask: "count", notes: s.slice().sort((x, y) => y - x) })),
      src: "p.121 (কয়েন: ১, ২ ও ৫ টাকা; নোট: ২০০, ৫০০ ও ১০০০ টাকা); the mixes are mine",
    });
  }

  // ═════════════ p.125 উপাত্ত সংগ্রহ: counting the picture's fruits, and the ট্যালি চিহ্ন ═════════════
  {
    const key = keyOf(125, "tally");
    // p.125's picture (the same as p.126's table): 6 কলা, 7 আম, 8 লিচু, 5 আপেল; no lychee emoji: 🍒 stands in (as on p.80)
    const FRUITS = [["কলা", "🍌", 6], ["আম", "🥭", 7], ["লিচু", "🍒", 8], ["আপেল", "🍎", 5]];
    const line = shuffled(FRUITS.flatMap(([, e, n]) => Array(n).fill(e)), rng(`${key}#picture`)).join(" ");
    const countIn = (emoji) => Array.from(line.replace(/ /g, "")).filter((e) => e === emoji).length;
    const tallyText = (n) => [Math.floor(n / 5) ? `${toBn(Math.floor(n / 5))}টি পাঁচের দল` : "", n % 5 ? `${toBn(n % 5)}টি দাগ` : ""].filter(Boolean).join(" ও ");
    const countQ = (name, emoji) => {
      const n = countIn(emoji);
      return numQ({ prompt: `ছবির ফলগুলো: ${line}। কয়টি ${name} (${emoji}) আছে?`, expr: String(n), unit: "টি", extra: FRUITS.map((f) => f[2]).filter((x) => x !== n), why: `দাগ টেনে গুনি: ${tallyText(n)} = ${toBn(n)}` });
    };
    const lychee = countIn("🍒");
    const qs = [
      countQ("কলা", "🍌"), countQ("আপেল", "🍎"),
      numQ({ prompt: "ট্যালি চিহ্নে ১টি পাঁচের দল ও ৩টি দাগ আছে। সংখ্যাটি কত?", expr: "5+3", extra: [4, "5+4"], why: "১টি পাঁচের দল ও ৩টি দাগ: ৫ + ৩ = ৮" }),
      numQ({ prompt: "ট্যালি চিহ্নে ২টি পাঁচের দল ও ১টি দাগ আছে। সংখ্যাটি কত?", expr: "5+5+1", extra: [3, "5+1"], why: "২টি পাঁচের দল ও ১টি দাগ: ৫ + ৫ + ১ = ১১" }),
      mcq({ prompt: `ছবিতে ${toBn(lychee)}টি লিচু আছে। ট্যালি চিহ্নে লিচুর সংখ্যা লিখতে কী লাগে?`, answer: tallyText(lychee), others: [`${toBn(lychee)}টি খাড়া দাগ`, tallyText(lychee + 1), tallyText(lychee + 5)], why: `${toBn(lychee)} = ৫ + ${toBn(lychee - 5)}: ${tallyText(lychee)}`, v: { tally: lychee } }),
      numQ({ prompt: "১০টি ফল ট্যালি চিহ্নে লিখতে কয়টি পাঁচের দল লাগে?", expr: "10", div: 5, unit: "টি", extra: [1, 10], why: "৫ + ৫ = ১০: ২টি পাঁচের দল" }),
      numQ({ prompt: "ট্যালি চিহ্নে ৩টি খাড়া দাগ আছে। আরও ১টি ফল পেলে কয়টি দাগ হবে?", expr: "3+1", unit: "টি", extra: [3, 5], why: "প্রতিটি ফলের জন্য একটি করে খাড়া দাগ: ৩ + ১ = ৪টি দাগ" }),
      mcq({ prompt: "দাগ টেনে প্রতিটি ফলের সংখ্যা বের করার এই দাগগুলোকে কী বলা হয়?", answer: "ট্যালি চিহ্ন", others: ["যোগ চিহ্ন", "সংখ্যারেখা"], why: "এই দাগগুলোকে বলা হয় ট্যালি চিহ্ন।" }),
    ];
    // to reach 10, from the page: the picture's আম, and its text (চারটি খাড়া দাগ, পঞ্চমটি আড়াআড়ি: পাঁচটির একটি দল)
    const STANDING = 4, ACROSS = 1;
    qs.push(
      countQ("আম", "🥭"),
      numQ({ prompt: "পাশাপাশি চারটি খাড়া দাগ টেনে পঞ্চমটির জন্য আড়াআড়ি একটি দাগ টানি। পাঁচের একটি দলে মোট কয়টি দাগ?", expr: `${STANDING}+${ACROSS}`, unit: "টি", extra: [STANDING, STANDING + 2], count: 2, why: `${toBn(STANDING)}টি খাড়া দাগ ও ${toBn(ACROSS)}টি আড়াআড়ি দাগ: ${toBn(STANDING)} + ${toBn(ACROSS)} = ${toBn(STANDING + ACROSS)}` }),
    );
    if (FRUITS.some(([, e, n]) => countIn(e) !== n)) throw new Error("p.125: the picture's counts");
    add({ page: 125, slug: "tally", type: "mcq", title: "দাগ টেনে গুনি: ট্যালি চিহ্ন", content: finishQuestions(key, qs), src: "p.125 (the picture: ৬ কলা, ৭ আম, ৮ লিচু, ৫ আপেল; ট্যালি চিহ্ন ১–৬ and the five-group text)", notes: ["ছবির ফলগুলো এক সারিতে এলোমেলো করে দেখানো হলো; লিচুর জন্য 🍒 ব্যবহার করা হয়েছে।"] });
    ctx.note("**p.125:** the picture's fruits (৬ কলা, ৭ আম, ৮ লিচু, ৫ আপেল, as p.126's table) are shown in one shuffled line of emoji, 🍒 standing in for লিচু (as on p.80); the child counts three kinds from it (the আম question was added to reach 10, with one on the page's five-group text: ৪টি খাড়া ও ১টি আড়াআড়ি দাগ). The other questions read and write ট্যালি চিহ্ন (৮, ১১, ১০).");
  }

  // ═════════════ p.127: a class survey (exercise 3 (খ), প্রিয় পাখি) as tally marks → a table ═════════════
  {
    const key = keyOf(127, "bird-survey");
    // the page asks the class and leaves the table to be made: these counts are an example of mine
    const BIRDS = [["কাক", 4], ["কোকিল", 9], ["কবুতর", 7], ["শালিক", 6]];
    const tallyText = (n) => [Math.floor(n / 5) ? `${toBn(Math.floor(n / 5))}টি পাঁচের দল` : "", n % 5 ? `${toBn(n % 5)}টি দাগ` : ""].filter(Boolean).join(" ও ");
    const count = (b) => BIRDS.find((x) => x[0] === b)[1];
    const intro = `শ্রেণি প্রতিনিধি জিজ্ঞেস করল, কাক, কোকিল, কবুতর ও শালিকের মধ্যে কোনটি প্রিয়? ট্যালি চিহ্ন: ${BIRDS.map(([b, n]) => `${b} ${tallyText(n)}`).join("; ")}।`;
    const names = BIRDS.map((b) => b[0]);
    const most = BIRDS.reduce((x, y) => (y[1] > x[1] ? y : x)), least = BIRDS.reduce((x, y) => (y[1] < x[1] ? y : x));
    const sumExpr = BIRDS.map((b) => b[1]).join("+");
    const crowMore = 2;
    const qs = [
      numQ({ prompt: `${intro} কোকিল কতজনের প্রিয়?`, expr: `5+${count("কোকিল") - 5}`, unit: " জন", extra: [count("কোকিল") - 1, count("কোকিল") - 5], why: `কোকিল ${tallyText(count("কোকিল"))}: ৫ + ${toBn(count("কোকিল") - 5)} = ${toBn(count("কোকিল"))}` }),
      mcq({ prompt: `${intro} কোন পাখি সবচেয়ে বেশি জনের প্রিয়?`, answer: most[0], fixed: names, why: `${most[0]} ${toBn(most[1])} জনের প্রিয়, সবচেয়ে বেশি।` }),
      mcq({ prompt: `${intro} কোন পাখি সবচেয়ে কম জনের প্রিয়?`, answer: least[0], fixed: names, why: `${least[0]} ${toBn(least[1])} জনের প্রিয়, সবচেয়ে কম।` }),
      numQ({ prompt: `${intro} কবুতর শালিকের চেয়ে কতজনের বেশি প্রিয়?`, expr: `${count("কবুতর")}-${count("শালিক")}`, unit: " জন", extra: [`${count("কবুতর")}+${count("শালিক")}`, 2] }),
      numQ({ prompt: `${intro} মোট কতজন শিক্ষার্থীকে জিজ্ঞেস করা হয়েছিল?`, expr: sumExpr, unit: " জন", extra: [BIRDS.length] }),
      mcq({ prompt: `${intro} আরও ${toBn(crowMore)} জন বলল কাক প্রিয়। এখন কাকের ট্যালি চিহ্ন কেমন হবে?`, answer: tallyText(count("কাক") + crowMore), others: [`${toBn(count("কাক") + crowMore)}টি খাড়া দাগ`, tallyText(count("কাক") + crowMore + 1)], why: `${toBn(count("কাক"))} + ${toBn(crowMore)} = ${toBn(count("কাক") + crowMore)}: পঞ্চম দাগটি আড়াআড়ি টেনে একটি দল, তারপর বাকি দাগ।`, v: { tally: count("কাক") + crowMore } }),
    ];
    // to reach 10: the page's other two surveys, (ক) the subjects and (গ) the colours, with the same class (example counts of mine)
    const SUBJECTS = [["বাংলা", 8], ["ইংরেজি", 6], ["গণিত", 12]];
    const COLOURS = [["লাল", 8], ["নীল", 6], ["সবুজ", 5], ["হলুদ", 4], ["বেগুনি", 3]];
    const total = (list) => list.reduce((s, x) => s + x[1], 0);
    if (total(SUBJECTS) !== total(BIRDS) || total(COLOURS) !== total(BIRDS)) throw new Error("p.127: one class, the same number of children in each survey");
    const surveyIntro = (ask, list) => `শ্রেণি প্রতিনিধি জিজ্ঞেস করল, ${ask} ট্যালি চিহ্ন: ${list.map(([b, n]) => `${b} ${tallyText(n)}`).join("; ")}।`;
    const subjIntro = surveyIntro("বাংলা, ইংরেজি ও গণিত এই তিনটি বিষয়ের মধ্যে কোনটি বেশি ভাল লাগে?", SUBJECTS);
    const colIntro = surveyIntro("লাল, নীল, সবুজ, হলুদ ও বেগুনি রঙের মধ্যে কোনটি বেশি পছন্দ?", COLOURS);
    const of = (list, name) => list.find((x) => x[0] === name)[1];
    const topSubject = SUBJECTS.reduce((x, y) => (y[1] > x[1] ? y : x));
    const fromTally = (n) => [...Array(Math.floor(n / 5)).fill(5), ...(n % 5 ? [n % 5] : [])].join("+");
    qs.push(
      numQ({ prompt: `${subjIntro} কতজনের গণিত বেশি ভাল লাগে?`, expr: fromTally(of(SUBJECTS, "গণিত")), unit: " জন", extra: [of(SUBJECTS, "গণিত") - 5, 7], why: `গণিত ${tallyText(of(SUBJECTS, "গণিত"))}: ${fromTally(of(SUBJECTS, "গণিত")).split("+").map(Number).map(toBn).join(" + ")} = ${toBn(of(SUBJECTS, "গণিত"))}` }),
      mcq({ prompt: `${subjIntro} কোন বিষয়টি সবচেয়ে বেশি জনের ভাল লাগে?`, answer: topSubject[0], fixed: SUBJECTS.map((s) => s[0]), why: `${topSubject[0]} ${toBn(topSubject[1])} জনের, সবচেয়ে বেশি।` }),
      numQ({ prompt: `${colIntro} কতজনের লাল রং বেশি পছন্দ?`, expr: fromTally(of(COLOURS, "লাল")), unit: " জন", extra: [of(COLOURS, "লাল") - 1, 3], why: `লাল ${tallyText(of(COLOURS, "লাল"))}: ৫ + ${toBn(of(COLOURS, "লাল") - 5)} = ${toBn(of(COLOURS, "লাল"))}` }),
      numQ({ prompt: `${colIntro} নীল ও সবুজ মিলে কতজনের পছন্দ?`, expr: `${of(COLOURS, "নীল")}+${of(COLOURS, "সবুজ")}`, unit: " জন", extra: [`${of(COLOURS, "নীল")}-${of(COLOURS, "সবুজ")}`, of(COLOURS, "নীল")] }),
    );
    add({ page: 127, slug: "bird-survey", type: "mcq", title: "প্রিয় পাখির ট্যালি ও সারণি", content: finishQuestions(key, qs), src: "p.127 3 (খ) কাক, কোকিল, কবুতর ও শালিক, (ক) বাংলা, ইংরেজি ও গণিত, (গ) লাল, নীল, সবুজ, হলুদ ও বেগুনি; the tally counts are an example of mine", notes: [`প্রশ্নগুলো একটি উদাহরণ শ্রেণির (${toBn(total(BIRDS))} জন) ট্যালি চিহ্ন দেখে: ${BIRDS.map(([b, n]) => `${b} ${toBn(n)}`).join(", ")}; ${SUBJECTS.map(([b, n]) => `${b} ${toBn(n)}`).join(", ")}; ${COLOURS.map(([b, n]) => `${b} ${toBn(n)}`).join(", ")}।`] });
    ctx.note("**p.127** only gives class work (ask the class, collect leaves) with no numbers. Its game takes exercise 3's three surveys with an example class of ২৬ of mine: (খ) কাক ৪, কোকিল ৯, কবুতর ৭, শালিক ৬; (ক) বাংলা ৮, ইংরেজি ৬, গণিত ১২; (গ) লাল ৮, নীল ৬, সবুজ ৫, হলুদ ৪, বেগুনি ৩ (the (ক) and (গ) questions were added to reach 10). Drop it if only the book's own numbers should be used.");
  }
};
