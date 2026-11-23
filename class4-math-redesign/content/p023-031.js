// অধ্যায় ২ · যোগ ও বিয়োগ: printed pages 23–31 (PDF pages 30–38), every word as printed.
// যোগ (pp. 23–29): four numbers with carries (8504 + 9725 + 9233 + 7549), a city's population (48936 + 49877 + 8372), two
// motorcycles' prices (165725 + 144999), missing digits, adding five 6-digit numbers in a line place by place (pp. 26–27),
// and কাজ ৩: numbers whose sum is 1000098 (pp. 28–29). বিয়োগ starts on p. 30: 7652 − 2679 and 90568 − 76984 step by step.
// Own kinds (content/p023-031.parts.js): c4p023_places (the coloured স্থান table, with the carries' arrows), c4p023_ticks (a
// sum in a line, the added digits ticked, the answer in boxes), c4p023_pills, c4p023_why, c4p023_tight.
// Reused: Class 3's c3p021_col / c3p021_cols (columns, carries, borrows, struck digits, colour columns), c3p021_sums,
// c3p021_eq, c3p021_head, c3p021_chip, c3p021_small; Class 3's sticker "motorcycle".
// The book's triangles here are printed pale blue; its key page makes a triangle কাজ, so they are কাজ.
// The book's slips, kept: p. 27 (৪)–(৬) show the three ticks of (৩) again, and 8 answer boxes where p. 26 has 7 (we draw 7:
// a 6-digit sum gets one box more than its numbers); p. 30 "হাজারের ঘরে থেকে" (elsewhere "ঘর থেকে"); p. 31 step 2 strikes
// the ৯ of ৭৬৯৮৪, not the ৫ of ৯০৫৬৮; p. 29 (২): the worked example shows no carries.
const yes = true;
const BN = "০১২৩৪৫৬৭৮৯";
const bnum = (i) => String(i).replace(/\d/g, (d) => BN[d]);
const say = (who, mood, text, side) => ({ say: who, mood, text, ...(side ? { side } : {}) });
const small = (...blocks) => ({ kind: "c3p021_small", gap: 2, small: blocks });
const eq = (text, more = {}) => ({ kind: "c3p021_eq", text, ...more });
const chip = (text) => ({ kind: "c3p021_chip", text });
const sums = (list, more = {}) => ({ kind: "c3p021_sums", sums: list, ...more });
// a column exercise, rows as printed: the answer gets a dashed box per place, one more than the longest number for an
// addition and as many for a subtraction, so the boxes never give the answer away
function colEx(rows, mk) {
  const len = Math.max(...rows.map((r) => [...r.replace(/[+−\s]/g, "")].length));
  return { mk, rows, ans: "", boxes: len + (rows.some((r) => r.includes("−")) ? 0 : 1) };
}
const cols = (list, start, more = {}) => ({ kind: "c3p021_cols", style: "dash", items: list.map((rows, i) => colEx(rows, `(${bnum(start + i)})`)), ...more });
// the places' colours, the same in a column and in its স্থান table
const PEACH = "#FFD9C2", SKY = "#C9E8F7", YEL = "#FEF08A", GREEN = "#D9F2C4", PINK = "#FBCFE8", MAUVE = "#E9D5F5", ROSE = "#FECACA", LAV = "#E0E7FF";
// p. 26–27: the five numbers added in a line, place by place
const NUMS = ["২৪৩৬৮১", "১৮৯২৩৪", "৪৫২০১১", "৩৩২৮১০", "২১২৪৫৩"];
const ticks = (n, more = {}) => ({ kind: "c4p023_ticks", nums: NUMS, ticks: n, boxes: 7, ...more });
// pp. 30–31: a step of the subtraction: the column (its place coloured) and the book's words beside it
const step = (col, head, sum, text, tone) => ({ row: [
  { kind: "c3p021_col", style: "plain", size: 12.5, ...col },
  { kind: "c4p023_why", head, sum, text, tone },
], w: [36, 0], gap: 4 });
const hue = (tone, place, n) => Array.from({ length: n }, (_, i) => (i === n - 1 - place ? tone : "")); // the tint for one place of n
// an empty grid for p. 29's own sums (k numbers of six digits) and the sum to reach
const grid = (k, tops = yes) => ({ ...(tops ? { tops: [["", "", "", "", "", ""]] } : {}), rows: [...Array(k - 1).fill("______"), "+______"], ans: "১০০০০৯৮" });

module.exports = {
  pages: [
    // ── p23: the chapter opens: 8504 + 9725 + 9233 + 7549, carrying ──
    {
      page: 23,
      opener: { title: "যোগ ও বিয়োগ" },
      title: "যোগ",
      dense: yes,
      allow: ["দশকের", "শতকের"], // the স্থান table: the OCR cannot read the words on the blue and green bars; checked by eye
      blocks: [
        { ask: "একটি লিচুবাগানে চারটি গাছ থেকে যথাক্রমে ৮৫০৪টি, ৯৭২৫টি, ৯২৩৩টি এবং ৭৫৪৯টি লিচু পাড়া হলো। বাগানের ঐ চারটি গাছ থেকে মোট কতগুলো লিচু পাড়া হলো?" },
        small({ row: [
          say("boy", "talk", "আমরা এমন যোগ ৩য় শ্রেণিতে করেছি। প্রথমে একক স্থানের অঙ্ক, এরপর ক্রমান্বয়ে দশক, শতক, ও হাজারের স্থানের অঙ্কগুলো যোগ করি।"),
          say("girl", "think", "ঠিক বলেছো। ভেবে দেখি কীভাবে সংখ্যা হাতে রেখে যোগ করা যায়।"),
        ], w: [98, 0], gap: 3 }),
        { row: [
          { kind: "c3p021_col", tops: [["২", "১", "২", ""]], rows: ["৮৫০৪", "৯৭২৫", "৯২৩৩", "+৭৫৪৯"], ans: "৩৫০১১", style: "plain", size: 12, box: "white", opTint: LAV, tint: [LAV, GREEN, YEL, SKY, PEACH] },
          { kind: "c4p023_places", arrows: yes, gap: 1.4, rh: 7.4, w: 100, rows: [
            ["এককের স্থান", "৪ + ৫ + ৩ + ৯ = ২১", PEACH],
            ["দশকের স্থান", "০ + ২ + ৩ + ৪ + ২ = ১১", SKY],
            ["শতকের স্থান", "৫ + ৭ + ২ + ৫ + ১ = ২০", YEL],
            ["হাজারের স্থান", "৮ + ৯ + ৯ + ৭ + ২ = ৩৫", GREEN],
          ] },
        ], w: [44, 0], gap: 4 },
        { ex: "১", mark: "anu", text: "যোগ করি।", body: [
          cols([["৪৬৭", "৮৩০", "+৩৫১"], ["৪৭৯২", "+৩২৮০"], ["৬৩৯২", "৭৭৭", "+২৮৫৩"], ["৩৫০৪", "৭২৫", "৯২৩৩", "+৫৫৪৯"], ["৩৩৩", "৪৫৫২", "১১১", "+১০০৩"], ["৫১৩৯", "৩৭৩০২", "২৪৬৫১", "+৯৮৯"]], 1, { cols: 3, size: 11.5, gap: 1.6 }),
          sums(["৫১২ + ২২২", "৩৭৮২ + ৪৫২০ + ১১১১", "৪৪৪৪ + ৩৩৩৩", "৯৮ +৬৪৯ +৪৮৭২", "৫৭২৩২ + ৪৩২০১", "২৪৩৭১ + ৫৭৯৩ +৬৭৮১৩"], { cols: 3, start: 7, size: 12, gap: .6 }),
        ] },
      ],
    },
    // ── p24: a city's population: 48936 + 49877 + 8372 ──
    {
      page: 24,
      blocks: [
        { ask: "একটি শহরে ৪৮৯৩৬ জন নারী, ৪৯৮৭৭ জন পুরুষ ও ৮৩৭২ জন শিশু বাস করেন। ঐ শহরে সর্বমোট জনসংখ্যা কত?" },
        small(say("boy", "talk", "এখানে আমাদের শহরের সর্বমোট জনসংখ্যা বের করতে হবে।")),
        eq("গাণিতিক বাক্য ▭", { bw: 82, center: yes }),
        { text: "সংখ্যাগুলোকে উপর-নিচে বসিয়ে যোগ করা যাক।", center: yes },
        { row: [
          { kind: "c3p021_col", tops: [["২", "২", "১", "১", ""]], rows: ["৪৮৯৩৬", "৪৯৮৭৭", "+৮৩৭২"], ans: "১০৭১৮৫", style: "plain", size: 13, box: "white", opTint: LAV, tint: [LAV, PINK, PEACH, SKY, YEL, GREEN] },
          { kind: "c4p023_places", arrows: yes, gap: 1.2, w: 100, rows: [
            ["এককের স্থান", "৬ + ৭+ ২ = ১৫", GREEN],
            ["দশকের স্থান", "৩ + ৭ + ৭ + ১ = ১৮", YEL],
            ["শতকের স্থান", "৯ + ৮ + ৩+১ = ২১", SKY],
            ["হাজারের স্থান", "৮ + ৯ + ৮+২= ২৭", PEACH],
            ["অযুতের স্থান", "৪ + ৪ + ২ = ১০", PINK],
          ] },
        ], w: [50, 0], gap: 4 },
        small(say("girl", "talk", "যোগের ক্ষেত্রে হাতে রাখা সংখ্যাটি সঠিক স্থানে বসাতে হবে।")),
        { text: "সর্বমোট জনসংখ্যা ১০৭১৮৫ জন।", center: yes },
        { ex: "১", mark: "anu", text: "যোগ করি।", body: [
          cols([["৩৩৫৮", "+৪৫৭১"], ["৪৭২৪৯", "+৩৫৭৮৬"], ["৫৭৩৪৪", "+২৬৮৪৭"], ["৩৭৯৯০", "+৪৫২৭৮"], ["১৮৯৩৪", "+৬২৬২৩"], ["৩৪৭৫৪", "+৪৩৪৭৫"], ["২৩৬৬১", "৫৮৮৯", "+৩২৭৪৬"], ["৪৩৮৫৪", "২৫৮০৫", "+২৬৩৭৩"], ["৯৯৯৯৯", "+১"]], 1, { cols: 3, size: 12, gap: 2.4 }),
        ] },
      ],
    },
    // ── p25: two motorcycles' prices: 165725 + 144999 ──
    {
      page: 25,
      allow: ["দশকের", "শতকের", "হাজারের"], // the স্থান table: the OCR cannot read the words on the coloured bars; checked by eye
      blocks: [
        { ex: "১", mark: "kaj", text: "দুইটি মোটর সাইকেলের মোট দাম কত টাকা?", body: [
          { row: [
            { col: [{ objs: { sticker: "scooter", emoji: "🛵", n: 1, size: 28 } }, chip("১৬৫৭২৫ টাকা")], gap: 1.4 },
            { col: [{ objs: { sticker: "motorcycle", emoji: "🏍️", n: 1, size: 28 } }, chip("১৪৪৯৯৯ টাকা")], gap: 1.4 },
          ], w: [50, 50], justify: "center", gap: 18 },
          small(say("boy", "talk", "যেহেতু আমরা মোট দাম জানতে চাচ্ছি, তাই হিসাবের প্রক্রিয়াটি হবে যোগ।")),
          eq("গাণিতিক বাক্য ▭", { bw: 70, center: yes }),
          { row: [
            { kind: "c3p021_col", tops: [["১", "১", "১", "১", "১", ""]], rows: ["১৬৫৭২৫", "+১৪৪৯৯৯"], ans: "৩১০৭২৪", style: "plain", size: 13, box: "white", opTint: LAV, tint: [MAUVE, YEL, ROSE, SKY, GREEN, PEACH] },
            { kind: "c4p023_places", gap: .9, w: 98, rows: [
              ["এককের স্থান", "৫ + ৯ = ১৪", PEACH],
              ["দশকের স্থান", "২ + ৯ + ১ = ১২", GREEN],
              ["শতকের স্থান", "৭ + ৯ + ১ = ১৭", SKY],
              ["হাজারের স্থান", "৫ + ৪ + ১ = ১০", ROSE],
              ["অযুতের স্থান", "৬ + ৪ + ১ = ১১", YEL],
              ["লক্ষের স্থান", "১ + ১ + ১ = ৩", MAUVE],
            ] },
          ], w: [52, 0], gap: 4 },
          { text: "মোট দাম ৩১০৭২৪ টাকা।", center: yes },
        ] },
        small(say("girl", "talk", "যোগের প্রক্রিয়া মূলত একই, তবে হাতে রাখা সংখ্যাটি লক্ষ রাখতে হয়।")),
        { ex: "২", mark: "anu", text: "যোগ করি।", body: [
          cols([["৩৪২৩১৮", "+২৫৭৬৪০"], ["৪৭৯৩৭৮", "২৩১০৬৩", "+১৪৫৬৯২"], ["৫৭৯৩২০", "৯৮৩৫৩", "২৫৮৯২৪", "+১৬৭৩২৯"]], 1, { cols: 3, size: 12.5 }),
        ] },
      ],
    },
    // ── p26: the missing digits; adding in a line, place by place (ones, tens, hundreds) ──
    {
      page: 26,
      spread: yes,
      blocks: [
        { ex: "৩", mark: "anu", text: "খালি ঘরের সংখ্যা খুঁজে বের করি।", body: [
          { kind: "c3p021_cols", size: 13, style: "plain", items: [
            { mk: "(১)", rows: ["৫৩৬৯□", "২৭৯□৫", "+১০□৪৯"], ans: "□২২৭৬", given: yes },
            { mk: "(২)", rows: ["৪১০৭□৩", "১৩□৮২৬", "২৫৭৩৮□", "+□৪২□৪৯"], ans: "৯□৭৭৫২", given: yes },
            { mk: "(৩)", rows: ["□২২২২৮", "১□৮৭□০", "৩৭৯৩৫□", "+১৪□৯৪৩"], ans: "৮৮৬□৭৫", given: yes },
          ] },
        ] },
        "পাশাপাশি যোগের ক্ষেত্রে আমরা প্রথমে প্রত্যেকটি সংখ্যার একক স্থানের অঙ্ক যোগ করব এবং যোগফল সর্বডানে একক স্থানে বসাব। যদি হাতে সংখ্যা থাকে তবে তা দশকের স্থানের অঙ্কের সঙ্গে যোগ হবে। একইভাবে দশক, শতক, হাজার, অযুত ও লক্ষের ঘরের অঙ্ক যোগ করে যোগফলে বসাব। হিসাব করা সংখ্যাগুলোর উপর ‘/’ চিহ্ন বসালে সুবিধা হবে।",
        { ex: "২", mark: "kaj", text: null, body: [
          { row: [
            { kind: "c3p021_head", n: "২", mark: "kaj", text: "২৪৩৬৮১ + ১৮৯২৩৪ + ৪৫২০১১ + ৩৩২৮১০ + ২১২৪৫৩ =" },
            eq("▭", { bw: 36 }),
          ], w: [0, 40], gap: 1, align: "center" },
          small(say("boy", "talk", "চলো, সমস্যাটি সমাধান করি।")),
          "(১) এককের স্থান",
          small(say("girl", "talk", "১ + ৪ + ১ + ০ + ৩ = ৯")),
          ticks(1, { fill: "৯", arrow: yes, size: 12.5 }),
          "(২) দশকের স্থান",
          ticks(2, { fill: "৮৯", carry: [2, "১"], size: 12.5 }),
          "(৩) শতকের স্থান",
          ticks(3, { fill: "১৮৯", carry: [3, "২"], size: 12.5 }),
        ] },
      ],
    },
    // ── p27: the thousands, ten thousands and lakhs; practice in a line and in columns ──
    {
      page: 27,
      blocks: [
        { ex: "২", mark: "kaj", text: null, body: [
          "(৪) হাজারের স্থান",
          ticks(3, { fill: "১৮৯" }),
          "(৫) অযুতের স্থান",
          ticks(3, { fill: "১৮৯" }),
          "(৬) লক্ষের স্থান",
          ticks(3, { fill: "১৮৯" }),
        ] },
        { ex: "৪", mark: "anu", text: "পাশাপাশি যোগ করি।", body: [
          sums(["২৫১০ + ৩৬১৮ + ২৩২০ +১৯৫৪", "২৪১৬ + ১০৪২ + ১৪২০ + ৪৩২৯ + ২১৫৬", "৪০৩২১ + ১৪০২৫ + ২৮৭৩৪ + ২৯৩৮১", "৩৬১৮০ + ২৩৭১ + ৩০২৭৮ + ১২০৩ + ২৮৭১৬", "৩২১৮১৯ + ২৩০৯১৩ + ১৪৪৭৮২ + ২১৮৯০৩ + ১১০১২৩"], { cols: 1, tpl: "auto", justify: "start", size: 13, gap: .4 }),
        ] },
        { ex: "৫", mark: "anu", text: "উপর-নিচে যোগ করি।", body: [
          { kind: "c4p023_tight", cw: "1.05em", body: cols([["২৫১৩", "১২৪২", "+৫২৩৪"], ["৩২৮১", "৬৭৫", "৪৮২৬", "+২৬২১"], ["৩২৭২৪", "৯০৬৩", "১২৬২৬", "+২১১৫১"], ["২৯১০৪৫", "১৭৩৪২২", "৫৮২৬", "২৪৭৭০", "+৩৯০২৪৬"], ["৩২৭৩১", "৪৩২৮", "৬৪৩৯০", "৫৪৩৯", "+৭৩৯৫"], ["১৬৩৫৩", "২৭১৫৪", "২৬৪৩৯", "১৮২৩৫", "+১৯৮৩৪"], ["৫৪১২৯৭", "১০৭৬২৯", "২৩৮৭১২", "২১৮৭৯৩", "+২৯৫৬২১"], ["৩২৯৭৬০", "২১৭০৩৪", "৫৬৩৮১", "১৬৫৪", "+১৮২৩০৪"]], 1, { cols: 4, size: 12, gap: 2.6, justify: "space-around" }) },
        ] },
      ],
    },
    // ── p28: the missing digits (in a line and in columns); কাজ ৩: six-digit numbers that add up to 1000098 ──
    {
      page: 28,
      spread: yes,
      blocks: [
        { ex: "৬", mark: "anu", text: "খালি ঘরে অঙ্ক বসিয়ে সমাধান করি।", body: [
          { kind: "c4p023_tight", body: sums(["২১৫০ + ৩৫১◻ + ১৩১০ + ১◻১৪ + ১১◻১ = ◻৩৯৩", "১◻৩ + ৩২১ + ৪০০◻ + ২২২২ + ◻৩৩৩ = ৯◻৯৯", "◻৪১৬৩ + ১◻৪২৫ + ১৪◻০৩ + ২৩◻০+ ১৬০২৫ = ৬৭১৫◻"], { cols: 1, tpl: "auto", justify: "start", size: 14, gap: 2.4 }) },
          { kind: "c3p021_cols", size: 13.5, style: "plain", justify: "space-between", items: [
            { mk: "(৪)", rows: ["□৪৮২", "৭২৫৪", "+৫৭৪৮□"], ans: "□০□□১", given: yes },
            { mk: "(৫)", rows: ["৫৪৩", "৪৩২□৭", "□৫৩৮৯২", "১৭৮৫৩□", "+৩২৭□০৪"], ans: "□৫০৩৫১৮", given: yes },
            { mk: "(৬)", rows: ["২১৫৬□", "১□৬০২", "২৫৬□৮", "২১□১৩", "+□২২৪৩"], ans: "□০০০০০", given: yes },
          ] },
        ] },
        { ex: "৩", mark: "kaj", text: "ইচ্ছামতো ছয় অঙ্কের কিছু সংখ্যা নিয়ে যোগ করি যাদের যোগফল হবে ১০০০০৯৮।", body: [
          "(১) দুইটি সংখ্যা নিয়ে যোগ করি।",
          { kind: "c3p021_cols", style: "dgrid", size: 14, justify: "center", items: [grid(2, false)] },
          ({ row: [
            say("boy", "think", "আমি কাজটি কীভাবে করব? কাজটি নিয়ে ভাবতে হবে।"),
            say("girl", "talk", "প্রথমে একক স্থান থেকে শুরু করি।"),
          ], gap: 3 }),
          "একক স্থানে দুইটি অঙ্কের যোগফল ‘৮’ হওয়ার উপায়গুলো হলো",
          { kind: "c4p023_pills", items: [["০", "৮", "৮"], ["১", "৭", "৮"], ["২", "৬", "৮"], ["৩", "৫", "৮"], ["৪", "৪", "৮"]] },
        ] },
      ],
    },
    // ── p29: কাজ ৩ goes on: two, three and five numbers that add up to 1000098 ──
    {
      page: 29,
      blocks: [
        { ex: "৩", mark: "kaj", text: null, body: [
          small(say("boy", "talk", "বুঝেছি! এভাবেই ধাপে ধাপে অন্যান্য স্থানের অঙ্কগুলোও বের করতে পারব।")),
          "[উদাহরণ]",
          { kind: "c3p021_cols", style: "dgrid", size: 12.5, justify: "space-between", items: [
            { tops: [["১", "১", "১", "", "", ""]], rows: ["৬৭৪৭৩৪", "+৩২৫৩৬৪"], ans: "১০০০০৯৮" }, grid(2), grid(2),
          ] },
          "(২) তিনটি সংখ্যা নিয়ে যোগ করি।",
          { kind: "c3p021_cols", style: "dgrid", size: 12.5, justify: "space-between", items: [
            { rows: ["৩৪২৪৩৬", "৩২৫১২৬", "+৩৩২৫৩৬"], ans: "১০০০০৯৮" }, grid(3, false), grid(3, false),
          ] },
          small(say("girl", "talk", "বাহ! বেশ মজা তো! এবার তা হলে ইচ্ছামতো ছয় অঙ্কের পাঁচটি সংখ্যা নিয়ে ঐ একই যোগফল মেলানোর চেষ্টা করি।")),
          "(৩) পাঁচটি সংখ্যা নিয়ে যোগ করি।",
          { kind: "c3p021_cols", style: "dgrid", size: 12.5, cols: 2, gap: 3, justify: "space-around", items: [
            { tops: [["২", "২", "৪", "২", "২", ""]], rows: ["১৫১৯৬৪", "২২৩৫২৫", "২৪৪৮৮৬", "১৩৫৯৪৬", "+২৪৩৭৭৭"], ans: "১০০০০৯৮" }, grid(5), grid(5), grid(5),
          ] },
        ] },
      ],
    },
    // ── p30: বিয়োগ: 7652 − 2679, borrowing step by step; practice ──
    {
      page: 30,
      title: "বিয়োগ",
      dense: yes,
      blocks: [
        { ask: "একজন লিচু বিক্রেতার কাছে ৭৬৫২টি লিচু আছে। সেখান থেকে তিনি ২৬৭৯টি লিচু বিক্রি করলেন। এখন তার কাছে আর কতটি লিচু রয়েছে?" },
        small({ row: [
          say("boy", "talk", "চলো, কীভাবে ৪ অঙ্কের সংখ্যা বিয়োগ করা যায় তা আলোচনা করি।"),
          say("girl", "talk", "প্রথমে একক স্থানের হিসাব করি এবং ক্রমান্বয়ে পরের স্থানগুলোর বিয়োগ সম্পন্ন করি।"),
        ], gap: 3 }),
        step({ tops: [["", "", "৪", "১০"]], rows: ["৭৬৫/২", "−২৬৭৯"], ans: "৩", tint: hue(ROSE, 0, 4) }, "[এককের স্থান]", "১২ − ৯ = ৩",
          "আমরা ২ থেকে ৯ বিয়োগ করতে পারি না। তাই, দশকের ঘর থেকে ১টি দশ (=১০টি এক) এককের ঘরে নিয়ে আসি এবং ১২ থেকে ৯ বিয়োগ করি।", ROSE),
        step({ tops: [["", "", "১০", ""], ["", "৫", "৪", ""]], rows: ["৭৬/৫/২", "−২৬৭৯"], ans: "৭৩", tint: hue(YEL, 1, 4) }, "[দশকের স্থান]", "১৪ − ৭ = ৭",
          "আমরা ৪ থেকে ৭ বিয়োগ করতে পারি না। তাই, শতকের ঘর থেকে ১টি শত (=১০টি দশ) দশকের ঘরে নিয়ে আসি এবং ১৪ থেকে ৭ বিয়োগ করি।", "#FEF3B4"),
        step({ tops: [["", "১০", "", ""], ["৬", "৫", "", ""]], rows: ["৭/৬/৫/২", "−২৬৭৯"], ans: "৯৭৩", tint: hue(SKY, 2, 4) }, "[শতকের স্থান]", "১৫ − ৬ = ৯",
          "আমরা ৫ থেকে ৬ বিয়োগ করতে পারি না। তাই, হাজারের ঘরে থেকে ১টি হাজার (= ১০টি শত) শতকের ঘরে নিয়ে আসি এবং ১৫ থেকে ৬ বিয়োগ করি।", SKY),
        step({ tops: [["৬", "", "", ""]], rows: ["৭/৬/৫/২", "−২৬৭৯"], ans: "৪৯৭৩", tint: hue(MAUVE, 3, 4) }, "[হাজারের স্থান]", "৬ − ২ = ৪",
          "আমরা ৬ থেকে ২ বিয়োগ করতে পারি। তাই, হাজারের ঘরে হবে ৬ − ২ = ৪", MAUVE),
        { text: "৪৯৭৩টি লিচু রয়েছে।", center: yes },
        { ex: "১", mark: "anu", text: "বিয়োগ করি।", body: [
          cols([["৫৮০", "−৩২৫"], ["১২২৩", "−৮৯৯"], ["৭৮৩৬", "−৪৫৬১"], ["৪০২৯১", "−১৭৭৭"], ["৫২৩০", "−৩২৭৮"], ["২৮৩০৪", "−১৬৫২৯"]], 1, { cols: 3, size: 12, gap: 2 }),
        ] },
      ],
    },
    // ── p31: a football tournament's spectators: 90568 − 76984, borrowing across a zero ──
    {
      page: 31,
      spread: yes,
      // the OCR cannot read the words on the coloured boxes (the steps); each checked by eye against the page
      allow: ["দশকের", "১৬", "না", "তাই", "শতকের", "ঘর", "শত", "টি", "দশ", "ঘরে", "নিয়ে", "আসি", "করি", "১৪", "হাজারের", "হাজার", "শুধু", "রয়েছে", "অযুতের", "অযুত", "তারপর", "সরিয়ে", "সরিয়েছি", "আর"],
      blocks: [
        { ask: "একটি ফুটবল টুর্নামেন্টের প্রথম দিনের খেলায় ৭৬৯৮৪ জন এবং দ্বিতীয় দিনের খেলায় ৯০৫৬৮ জন দর্শক ছিল। দুই দিনের দর্শক সংখ্যার পার্থক্য কত?" },
        small({ row: [
          say("boy", "talk", "যেহেতু পার্থক্য বের করতে হবে, সেজন্য আমাদের বিয়োগ করতে হবে।"),
          say("girl", "talk", "বড়ো সংখ্যা থেকে ছোটো সংখ্যা বিয়োগ করতে হয়।"),
        ], gap: 3 }),
        eq("গাণিতিক বাক্যটি হবে ▭", { bw: 70, center: yes }),
        step({ rows: ["৯০৫৬৮", "−৭৬৯৮৪"], ans: "৪", tint: hue(PEACH, 0, 5) }, "[এককের স্থান]", "৮ − ৪ = ৪",
          "আমরা ৮ একক থেকে ৪ একক বিয়োগ করতে পারি।", PEACH),
        step({ tops: [["", "", "৪", "১০", ""]], rows: ["৯০৫৬৮", "−৭৬৯/৮৪"], ans: "৮৪", tint: hue(GREEN, 1, 5) }, "[দশকের স্থান]", "১৬ − ৮ = ৮",
          "আমরা ৬ থেকে ৮ বিয়োগ করতে পারি না, তাই শতকের ঘর থেকে ১ শত ( = ১০ টি দশ) দশকের ঘরে নিয়ে আসি ও বিয়োগ করি।", GREEN),
        step({ tops: [["", "৯", "১০", "", ""], ["৮", "১০", "৪", "", ""]], rows: ["৯/০৫/৬৮", "−৭৬৯৮৪"], ans: "৫৮৪", tint: hue(MAUVE, 2, 5) }, "[শতকের স্থান]", "১৪ − ৯ = ৫",
          "আমরা ৪ থেকে ৯ বিয়োগ করতে পারি না, তাই হাজারের ঘর থেকে ১ হাজার ( = ১০টি শত) শতকের ঘরে নিয়ে আসি, কিন্তু হাজারের ঘরে শুধু ‘০’ রয়েছে। তাই অযুতের ঘর থেকে ১ অযুত (= ১০ হাজার) হাজারের ঘরে নিয়ে আসি। তারপর হাজারের ঘর থেকে ১ হাজার শতকের ঘরে সরিয়ে বিয়োগ করি।", MAUVE),
        step({ tops: [["", "৯", "", "", ""], ["৮", "১০", "", "", ""]], rows: ["৯/০৫/৬৮", "−৭৬৯৮৪"], ans: "৩৫৮৪", tint: hue(ROSE, 3, 5) }, "[হাজারের স্থান]", "৯ − ৬ = ৩",
          "আমরা ১টি অযুত (= ১০ হাজার) হাজারের ঘরে সরিয়েছি এবং ১ হাজার শতকের ঘরে সরিয়েছি। তাই আমাদের হাজারের ঘরে ৯ হাজার রয়েছে। আর আমরা ৯ থেকে ৬ বিয়োগ করতে পারি।", ROSE),
        step({ tops: [["", "৯", "", "", ""], ["৮", "১০", "", "", ""]], rows: ["৯০৫৬৮", "−৭৬৯৮৪"], ans: "১৩৫৮৪", tint: hue(SKY, 4, 5) }, "[অযুতের স্থান]", "৮ − ৭ = ১",
          "আমরা ৮ অযুত থেকে ৭ অযুত বিয়োগ করতে পারি।", SKY),
        { text: "দর্শক সংখ্যার পার্থক্য ১৩৫৮৪ জন।", center: yes },
      ],
    },
  ],
};
