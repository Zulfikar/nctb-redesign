// অধ্যায় ৩ · গুণ (continued): printed pages 88–101 (PDF pages 97–110), every word as printed.
// The 6–10 times tables with the L-shaped paper on the 100-dot chart, the cut arrays, the 1 and 0 times tables, the 10 × 10
// table, swapping the factors, 12 × 4 in columns, the multiplication flowers and the practice problems.
// As in pp. 73–87: the book's pink-triangle activities are `ex` cards, its green-square problems p073_qs (p088_qs when a
// problem has a picture under it), the full times tables p073_namta.
// Own kinds (content/p088-101.parts.js): p088_lgrid (the 100-dot sheet with the L paper sliding, in p073_ldots' look),
// p088_split, p088_namta (p073_namta with answer boxes), p088_scroll (p073_scroll with its own lines), p088_qs, p088_say,
// p088_dots, p088_swap, p088_bars, p088_groups, p088_trays, p088_mtable, p088_note, p088_flower(s), p088_twelve, p088_vmul,
// p088_seats, p088_cells.
const range = (n) => Array.from({ length: n }, (_, i) => i + 1);
const BN = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
/** a times table's rows "৬×১=৬" …; ans(i) gives the answer as written, or null for an empty box */
const rows = (n, ans) => range(10).map((i) => { const a = ans(i); return `${BN(n)}×${BN(i)}=${a == null ? "□" : a}`; });
const BLANK3 = "□ × □ = □"; // boxes: spaced, so they breathe
const L_ASK = (n) => `আমরা এ পর্যন্ত যা শিখেছি, তার উপর ভিত্তি করে ${n} এর গুণের নামতা তৈরি করি`;

module.exports = {
  pages: [
    {
      page: 88,
      title: "৬ এর গুণ",
      spread: true,
      blocks: [
        { ask: "আমরা এ পর্যন্ত যা শিখেছি, তার উপর ভিত্তি করে ৬ এর জন্য গুণের নামতা তৈরি করি।" },
        { row: [
          { ex: "১", text: "যদি আমরা ১০০ ডটের ছকের উপর নিচের ছবির মতো বাম থেকে ডানে L আকৃতির কাগজ রাখি, তবে আমরা কী খুঁজে পেতে পারি?",
            body: [{ kind: "p088_lgrid", rows: 6, old: 6, top: [["৭", 7], ["৬", 6]], left: "৬", s: 5.2 }] },
          { kind: "p088_namta", title: "৬ এর গুণের নামতা", rows: rows(6, (i) => (i <= 2 ? BN(6 * i) : null)), tone: "yellow" },
        ], w: [null, 50], gap: 4, align: "flex-start" },
        { kind: "p088_say", who: "boy", mood: "talk", text: "আমার ধারণা হলো",
          eqs: ["৬×১=৬", "৬×২=৬+৬=১২", "৬×৩=৬+৬+৬=১৮", "৬×৪=৬+৬+৬+৬=২৪", "৬×৫=৬+৬+৬+৬+৬=৩০"] },
        { kind: "p088_say", who: "girl", mood: "think", text: "আমার ধারণা হলো",
          eqs: ["৬×১=৬", "৬×২=৬+৬=১২", "৬×৩=১২+৬=১৮", "৬×৪=১৮+৬=২৪", "৬×৫=২৪+৬=৩০"],
          after: "তুমি কী উপায়ে ৬ এর গুণ হিসাব করো?" },
      ],
    },
    {
      page: 89,
      spread: true,
      blocks: [
        { ex: "২", text: "৬ এর গুণের নামতা শিখি" },
        { row: [
          { ex: "৩", text: "আবারও মনোযোগ দিয়ে ৬ এর গুণ দেখি",
            body: [{ kind: "p088_split", rows: 6, cut: 2, hl: 3, labels: ["৬ এর গুণ", "২ এর গুণ", "৪ এর গুণ"], s: 4.8 }] },
          { kind: "p073_namta", a: 6, tone: "blue" },
        ], w: [null, 50], gap: 4, align: "flex-start" },
        { say: "boy", mood: "think", text: "আমরা ৬ এর গুণকে ২ এর ও ৪ এর গুণে সাজাতে পারি। ঠিক কি না?" },
        { say: "girl", mood: "talk", text: "এটি মজার। আমরা জানি ৬×৩=১৮\nআবার ২×৩=৬ ও ৪×৩=১২\nএদের যোগফল ৬+১২=১৮" },
        // the book's slip: "৪ গুণের যোগফল" (for "৪ এর গুণের"), kept
        { text: "উপরের ছবি ব্যবহার করে চিন্তা করি ৬×৫=৩০, যা ২ এর গুণ ও ৪ গুণের যোগফল।" },
        { kind: "p073_qs", items: [{ n: "১", text: "বাদলের বাবা এক সপ্তাহে ৫ দিন কাজ করেন। তিনি ৬ সপ্তাহে কতদিন কাজ করেন?" }] },
      ],
    },
    {
      page: 90,
      title: "৭ এর গুণ",
      spread: true,
      blocks: [
        { ask: L_ASK("৭") },
        { row: [
          { ex: "১", text: "যদি আমরা ১০০ ডটের ছকের উপর নিচের ছবির মতো বাম থেকে ডানে L আকৃতির কাগজ রাখি, তবে আমরা কী খুঁজে পাব?",
            body: [{ kind: "p088_lgrid", rows: 7, old: 6, top: [["৭", 7], ["৬", 6]], s: 5.2 }] },
          { kind: "p088_scroll", rows: range(10).map((i) => [`৭×${BN(i)}=`, i === 1 ? "[[৭]]" : i === 2 ? "[[১৪]]" : "□"]) },
        ], w: [null, 50], gap: 4, align: "flex-start" },
        { kind: "p088_say", who: "girl", mood: "talk", text: "আমার ধারণা হলো",
          eqs: ["৭×১=৭, ৭×২=৭+৭", "৭×৩=৭+৭+৭=২১", "৭×৪=৭+৭+৭+৭=২৮", "৭×৫=৭+৭+৭+৭+৭=৩৫", "৭×৬=________"] },
        { kind: "p088_say", who: "boy", mood: "think", text: "আমার ধারণা হলো",
          eqs: ["৭×১=৭, ৭×২=৭+৭=১৪", "৭×৩=১৪+৭=২১, ৭×৪=২১+৭=২৮", "৭×৫=২৮+৭=৩৫"], cols: 1,
          after: "তুমি কী উপায়ে ৭ এর গুণ হিসাব করবে?" },
      ],
    },
    {
      page: 91,
      spread: true,
      blocks: [
        { ex: "২", text: "৭ এর গুণের নামতা শিখি" },
        { row: [
          // the book's lower two arrays mark 4 columns; drawn with 5, as 4 × 5 and 3 × 5 in the boy's sum
          { ex: "৩", text: "আবারও মনোযোগ দিয়ে ৭ এর গুণ দেখি",
            body: [{ kind: "p088_split", rows: 7, cut: 4, hl: 5, labels: ["৭ এর গুণ", "৪ এর গুণ", "৩ এর গুণ"], s: 4.6 }] },
          { kind: "p073_namta", a: 7, tone: "pink" },
        ], w: [null, 50], gap: 4, align: "flex-start" },
        { say: "girl", mood: "think", text: "৭×৫=৩৫, তুমি কি এটি ৪ এর গুণ ও ৩ এর গুণে ভেঙ্গে দেখাতে পারবে?" },
        { kind: "p088_say", who: "boy", mood: "talk", text: "৭ এর গুণকে ৪ এর ও ৩ এর গুণে ভেঙ্গে দেখানো যায়। ৪ ও ৩ এর গুণে ভেঙ্গে দেখানো হলো:",
          sum: ["৪×৫=২০", "৩×৫=১৫", "৩৫"] },
        { kind: "p073_qs", items: [{ n: "১", text: "৭ দিনে ১ সপ্তাহ। ৮ সপ্তাহে কত দিন?" }] },
      ],
    },
    {
      page: 92,
      title: "৮ এর গুণ",
      spread: true,
      blocks: [
        { ask: L_ASK("৮") },
        { row: [
          { kind: "p088_lgrid", rows: 8, old: 7, top: [["৭", 7], ["৬", 6]], s: 5.2 },
          { kind: "p073_namta", a: 8, tone: "blue" },
        ], w: [null, 50], gap: 4, align: "center" },
        { text: "৪৮=৮×৬ এই গুণকে কোন কোন সংখ্যায় ভেঙ্গে দেখানো যায়? এটি ৩ এর গুণ ও ৫ এর গুণে ভেঙ্গে দেখানো হলো:" },
        { col: [
          { row: [{ text: "৩×৬=১৮", big: true }, { kind: "p088_dots", rows: 3, cols: 10, hl: 6, s: 4.6 }], w: [50, 50], align: "center", justify: "center", gap: 10 },
          { row: [{ text: "৫×৬=৩০", big: true }, { kind: "p088_dots", rows: 5, cols: 10, hl: 6, s: 4.6 }], w: [50, 50], align: "center", justify: "center", gap: 10 },
          { row: [{ text: "১৮+৩০=৪৮", big: true }, { gap: 0 }], w: [50, 50], justify: "center", gap: 10 },
        ], gap: 2.4 },
        { kind: "p073_qs", items: [
          { n: "১", text: "৫টি বাক্সের প্রতিটিতে ৮টি করে চকলেট আছে। সেখানে কতগুলো চকলেট আছে?" },
          { n: "২", text: "একটি শ্রেণিকক্ষে প্রতিটি দলে ৮ জন করে শিক্ষার্থী আছে। যদি ৯টি দল থাকে, তবে সেখানে কতজন শিক্ষার্থী থাকবে?" },
        ] },
      ],
    },
    {
      page: 93,
      title: "৯ এর গুণ",
      spread: true,
      blocks: [
        { ask: L_ASK("৯") },
        { row: [
          { kind: "p088_lgrid", rows: 9, old: 6, s: 5.4 },
          { kind: "p073_namta", a: 9, tone: "blue" },
        ], w: [null, 50], gap: 4, align: "center" },
        { row: [
          // no ১ on this page in the book: it goes straight to ২.
          // The book draws these arrays with 10 rows; drawn with 9, as 9 × 2, 9 × 3 and 9 × 4
          { ex: "২", text: "৯×৯=৮১ এই গুণকে ২, ৩ ও ৪ এর গুণে ভেঙ্গে দেখানো হলো।", body: [
            { row: [{ kind: "p088_dots", rows: 9, cols: 2, s: 4.2, cap: "৯×২=১৮" }, { kind: "p088_dots", rows: 9, cols: 3, s: 4.2, cap: "৯×৩=২৭" }, { kind: "p088_dots", rows: 9, cols: 4, s: 4.2, cap: "৯×৪=৩৬" }], gap: 2, align: "end", justify: "space-around" },
            { text: "এখানে ১৮+২৭+৩৬=৮১", big: true },
          ] },
          { kind: "p073_qs", items: [
            { n: "১", text: "প্রতিটি ঝুড়িতে ৯টি করে রুটি রাখা যায়। এরকম ৭টি ঝুড়িতে কতগুলো রুটি রাখা যায়?" },
            { n: "২", text: "রফিক একদিনে একটি বইয়ের ৯ পৃষ্ঠা পড়ে। সে ৮ দিনে কত পৃষ্ঠা পড়ে?" },
          ] },
        ], w: [92, null], align: "center", gap: 4 },
      ],
    },
    {
      page: 94,
      title: "১০ এর গুণ",
      spread: true,
      blocks: [
        { ask: L_ASK("১০") },
        { row: [
          { ex: "১", text: "আমরা এ পর্যন্ত যা শিখেছি, তার উপর ভিত্তি করে ১০ এর গুণ বের করি।",
            body: [{ kind: "p088_lgrid", rows: 10, old: 6, bracket: "১০", s: 5.2 }] },
          { kind: "p073_namta", a: 10, tone: "pink" },
        ], w: [null, 50], gap: 4, align: "flex-start" },
        { ex: "২", text: "১০ এর গুণ কোন কোন সংখ্যায় ভেঙ্গে দেখানো যায়?" },
        { kind: "p073_qs", items: [
          { n: "১", text: "একজন মানুষের দুই হাতে মোট ১০টি আঙ্গুল আছে। এরকম ৭ জন মানুষের হাতে কতটি আঙ্গুল রয়েছে?" },
          { n: "২", text: "৩ জন ছাত্রকে ৫টি ও ৪ জন ছাত্রীকে ৭টি করে বই দিলে কতটি বইয়ের প্রয়োজন হবে?" },
          { n: "৩", text: "৪ টাকা দরে ৭টি লিচু, ৬ টাকা দরে ৮টি আমড়া এবং ৯ টাকা দরে ৫টি কলা কিনতে মোট কত টাকা লাগবে?" },
        ] },
      ],
    },
    {
      page: 95,
      title: "১ এর গুণ",
      spread: true,
      blocks: [
        { ask: "প্রতি শ্রেণির বার্ষিক পরীক্ষায় প্রথম হওয়া শিক্ষার্থীকে ২টি পেনসিল ও ১ টি খাতা পুরস্কার দেওয়া হবে। ৫টি শ্রেণির জন্য কতটি পুরস্কার প্রয়োজন হবে?" },
        { row: [
          { col: [
            // the prize: one exercise book and two pencils
            { row: [{ objs: { sticker: "notebook", emoji: "📒", n: 1, size: 22 } }, { objs: { sticker: "pencil", emoji: "✏️", n: 2, perRow: 2, size: 18, gap: 0 } }], w: [26, 40], gap: 6, justify: "center" },
            { row: [{ objs: { sticker: "pencil", emoji: "✏️", n: 2, perRow: 2, size: 13, gap: 0 } }, { text: "২ × □ = ______ টি পেনসিল", big: true }], w: [32, null], gap: 3, justify: "flex-start" },
            { row: [{ objs: { sticker: "notebook", emoji: "📒", n: 1, size: 15 } }, { text: "□ × □ = ___টি খাতা", big: true }], w: [32, null], gap: 3, justify: "flex-start" },
          ], gap: 4 },
          { kind: "p073_namta", a: 1, tone: "blue" },
        ], w: [null, 50], gap: 4, align: "center" },
        { ex: "১", text: "এখানে আমরা কী খুঁজে পেতে পারি?", body: [
          { kind: "p088_say", who: "boy", mood: "talk", text: "আমি ১×৩ ও ১×৭ এর যোগফল ১×১০ পেয়েছি।", dots: 10 },
        ] },
        { kind: "p073_qs", items: [
          { n: "১", text: "যদি আমরা প্রতিদিন ১ টাকা করে জমা করি, তবে ৮ দিনে কত টাকা জমা করতে পারব?" },
          { n: "২", text: "একটি শ্রেণির প্রথম বেঞ্চে ৫ জন, দ্বিতীয় বেঞ্চে ৬ জন এবং তৃতীয় বেঞ্চে ৮ জন ছাত্র আছে। প্রত্যেক ছাত্রকে ১ টাকা করে প্রদান করলে কত টাকা প্রয়োজন হবে?" },
        ] },
      ],
    },
    {
      page: 96,
      title: "০ এর গুণ",
      spread: true,
      blocks: [
        { ask: "আমাদের দুটি ট্রে আছে। যদি আমরা প্রতিটি ট্রেতে ০টি বল রাখি তবে সেখানে কতগুলো বল হবে?" },
        { kind: "p088_trays", heads: ["বল", "ট্রে"], rows: [
          { label: "২টি করে বল", trays: 2, balls: 2, eq: ["২", "২"] },
          { label: "১টি করে বল", trays: 2, balls: 1, eq: ["১", "২"] },
          { label: "০টি করে বল", trays: 2, balls: 0, eq: ["০", "২"] },
        ] },
        { ask: "একটি ট্রেতে তিনটি বল রাখা যায়। যদি কোনো ট্রে না থাকে তবে কতগুলো বল রাখা যাবে?" },
        // the book's slip: the last row reads ০ × ০ (for ৩ × ০), kept; the ball sticker is p. 78's football (content/p073-087)
        { kind: "p088_trays", heads: ["বল", "ট্রে"], rows: [
          { label: "২টি ট্রে", trays: 2, balls: 3, eq: ["৩", "২"] },
          { label: "১টি ট্রে", trays: 1, balls: 3, eq: ["৩", "১"] },
          { label: "০টি ট্রে", trays: 0, balls: 3, eq: ["০", "০"] },
        ] },
        { row: [
          { say: "boy", mood: "think", text: "০ দিয়ে গুণ করলে গুণফল সব সময়ই ০ হয়। তাই নয় কি?" },
          { say: "girl", mood: "think", text: "তাহলে ০×০ এর গুণফল কত?" },
        ], gap: 4 },
        { kind: "p088_note", text: "যখন একটি সংখ্যাকে ০ দিয়ে গুণ করা হয়, তখন এর উত্তর সবসময়ই ০ হবে। আবার, যখন ০ কে কোনো সংখ্যা দিয়ে গুণ করা হয়, তখন উত্তর সব সময়ই ০ হয়।" },
      ],
    },
    {
      page: 97,
      title: "গুণের নামতা",
      spread: true,
      blocks: [
        { ask: "গুণের নামতা।" },
        { kind: "p088_mtable", top: range(10), side: range(10), fill: "all", tone: "pink", size: 14, h: 11.6 },
        { row: [
          { say: "boy", mood: "think", text: "গুণের ক্রম অনুযায়ী আমি একটি নিয়ম পেয়েছি।" },
          { say: "girl", mood: "talk", text: "আমি এককের স্থানে কিছু নিয়ম পেয়েছি।" },
        ], gap: 4 },
        { kind: "p088_note", text: "উপরের ছক থেকে আমরা বিভিন্ন রকম প্যাটার্ন খুঁজে বের করি।" },
      ],
    },
    {
      page: 98,
      title: "গুণের বিনিময়",
      dense: true,
      blocks: [
        { row: [
          { row: [{ kind: "p088_dots", rows: 3, cols: 4, s: 5, cap: "৩×৪=১২" }, { kind: "p088_dots", rows: 4, cols: 3, s: 5, cap: "৪×৩=১২" }], gap: 3, align: "end", justify: "space-around" },
          { frame: [{ row: [{ text: "তিন সারিতে ৪টি করে মারবেল ও চার সারিতে ৩টি করে মারবেল। মোট মারবেলের সংখ্যা সমান।" }, { kind: "p088_swap", s: 4.4 }], w: [null, 43], gap: 3 }], pad: 2.4 },
        ], w: [62, null], gap: 4 },
        // the book numbers it twice: the green ১ and "১." in the line
        { kind: "p088_qs", items: [{ n: "১", text: "১. নিচের সংখ্যাগুলো কোন কোন সংখ্যার গুণফল?", body: [
          { sums: ["ক. ১৬", "খ. ২৪", "গ. ৩৬", "ঘ. ৬৩", "ঙ. ৭২"], cols: 5 },
          // the book's pink triangle without a number
          { kind: "p088_tri", text: "একই রকম অন্য গুণ খুঁজে বের করি।" },
        ] }] },
        { kind: "p088_qs", items: [{ n: "২", text: "নিচের ছবি দেখে শূন্যস্থানগুলো পূরণ করি", body: [{ kind: "p088_cells", cells: [
          [{ kind: "p088_groups", sticker: "glass", emoji: "🥛", groups: [4, 4], w: 6.4, h: 8.4 }, { sums: [BLANK3], cols: 1 }],
          [{ kind: "p088_groups", sticker: "glass", emoji: "🥛", groups: [2, 2, 2, 2], w: 6.4, h: 8.4 }, { sums: [BLANK3], cols: 1 }],
          [{ kind: "p088_groups", sticker: "candle", emoji: "🕯️", groups: [4, 4, 4, 4, 4], lines: [3, 2], w: 5, h: 9, gap: 0.2 }, { sums: [BLANK3], cols: 1 }],
          [{ kind: "p088_groups", sticker: "candle", emoji: "🕯️", groups: [5, 5, 5, 5], lines: [2, 2], w: 5, h: 9, gap: 0.2 }, { sums: [BLANK3], cols: 1 }],
          [{ kind: "p088_bars", bars: 4, n: 6, perRow: 2, s: 4.2 }, { sums: [BLANK3], cols: 1 }],
          [{ kind: "p088_bars", bars: 6, n: 4, perRow: 2, s: 4.2 }, { sums: [BLANK3], cols: 1 }],
        ] }] }] },
        { text: "উপরের প্রতিক্ষেত্রে আমরা কী দেখি? সংখ্যা বিনিময় করে গুণ করলে গুণফলের কোনো পরিবর্তন হয় না।" },
      ],
    },
    {
      page: 99,
      title: "গুণ",
      spread: true,
      blocks: [
        { ask: "মিনা একদিনে একটি বইয়ের ১২ পৃষ্ঠা পড়তে পারে। ৪ দিনে সে ঐ বইয়ের কত পৃষ্ঠা পড়তে পারে?" },
        { kind: "p088_twelve", left: "১২", right: "১২ × □ = □", s: 4.3 },
        { row: [
          { col: [
            { say: "girl", mood: "talk", text: "আমরা প্রথমে ৪ দ্বারা একক স্থানের অঙ্ককে এবং পরে দশক স্থানের অঙ্ককে গুণ করি" },
            { text: "১২×৪=৪৮", big: true, center: true },
          ], gap: 2 },
          { col: [{ kind: "p088_vmul", top: ["১", "২"], by: "৪", ans: ["৪", "৮"] }, { text: "৪৮ পৃষ্ঠা", big: true, center: true }], gap: 1 },
        ], w: [null, 38], align: "center", gap: 5 },
        { kind: "p088_qs", items: [
          { n: "১", text: "গুণ করি", body: [{ sums: ["ক. ১৪×২", "খ. ২৩×৩", "গ. ১১×৭", "ঘ. ৩২×৩", "ঙ. ৩৪×২", "চ. ২১×৪"], cols: 6 }] },
          { n: "২", text: "রাজুর বাবা এক দিনে ৮ ঘণ্টা কাজ করেন। যদি তিনি ৩ দিন কাজ করেন, তবে কত ঘণ্টা কাজ হবে?" },
          { n: "৩", text: "আব্দুল করিম ৩টি গল্পের বই কিনতে চায়। প্রতিটি বইয়ের মূল্য ৩০ টাকা। বই কিনতে তার কত টাকা লাগবে?" },
        ] },
      ],
    },
    {
      page: 100,
      spread: true,
      allow: ["২৮", "৪২", "৪৯", "৫৬", "৬৪", "৩৬"] /* the petals' answers are printed turned round, tesseract misses them; each checked by eye */,
      blocks: [
        { practise: "নিজে করি" },
        { ex: "১", text: "গুণের নামতার সাহায্যে খালি জায়গা পূরণ করি।", body: [
          { row: [
            { say: "boy", mood: "think", text: "৩×৯=২৭" },
            { kind: "p088_flower", c: "৩", ring: ["", "২", "৫", "৭", "৬", "৮", "৩", "৯", "৪"], out: { 3: "২১", 7: "২৭" }, tone: "blue", size: 46 },
            { say: "girl", mood: "think", text: "৩×৭=২১" },
          ], w: [null, 50, null], align: "center", gap: 2 },
          { kind: "p088_flowers", h: 120, items: [
            { x: 4, y: 0, c: "৪", ring: ["৫", "৪", "৮", "১", "৩", "৭", "৬", "৯", "২"], out: { 0: "২০", 5: "২৮" }, tone: "pink", size: 48 },
            { x: 113, y: 0, c: "৬", ring: ["", "২", "৭", "৩", "৬", "১", "", "৪", "৮"], out: { 2: "৪২" }, tone: "yellow", size: 48 },
            { x: 58.5, y: 36, c: "৭", ring: ["৯", "৭", "৩", "", "৫", "৪", "৮", "৬", "২"], out: { 1: "৪৯", 6: "৫৬" }, tone: "purple", size: 48 },
            { x: 4, y: 72, c: "৮", ring: ["৭", "৫", "", "২", "৯", "৬", "৮", "১", ""], out: { 6: "৬৪" }, tone: "peach", size: 48 },
            { x: 113, y: 72, c: "৯", ring: ["৩", "৮", "৪", "৬", "৯", "২", "৫", "১", "৭"], out: { 2: "৩৬", 6: "৪৫" }, tone: "tan", size: 48 },
          ] },
        ] },
        { ex: "২", text: "একটি প্যাকেটে ২টি লজেন্স আছে। ৮টি প্যাকেটে কতগুলো লজেন্স আছে?" },
      ],
    },
    {
      page: 101,
      dense: true,
      blocks: [
        { ex: "৩", text: "একটি শ্রেণিকক্ষে ১০টি বেঞ্চ আছে। একটি বেঞ্চে ৪ জন ছাত্র বসতে পারে। শ্রেণিকক্ষে মোট কতজন ছাত্র বসতে পারবে?" },
        { ex: "৪", text: "বাবা প্রতিদিন ৪ ঘণ্টা হাঁটেন। ৭ দিনে তিনি কত ঘণ্টা হাঁটেন?" },
        { ex: "৫", text: "উজ্জ্বল ৪টি বই কিনতে চায়। প্রতিটি বইয়ের দাম ২২ টাকা। বই কিনতে তার কত টাকা লাগবে?" },
        { ex: "৬", text: "বামদিকের কলামের সংখ্যা দিয়ে উপরের সারির সংখ্যা গুণ করো এবং খালিঘরে ফলাফল লিখে পূরণ করো।", body: [
          { text: "গুণ করি : ৪×৫=২০, খালি ঘরে ২০ লিখি", center: true },
          { row: [
            { text: "গুণ করি\n৪×৫=২০\nখালি ঘরে ২০ লিখি" },
            { kind: "p088_mtable", top: [3, 5, 2, 7, 4, 1, 8, 10, 9, 6], side: [1, 4, 7, 6, 8, 5, 2, 9, 3, 10], fill: { "4,5": "২০" }, tone: "blue", size: 11.5, h: 6.6 },
          ], w: [36, null], align: "center", gap: 2 },
        ] },
        { ex: "৭", text: "নিচের চিত্রটি শ্রেণিকক্ষে শিক্ষার্থীদের বসার ব্যবস্থা। একটি ডট (●) দিয়ে একজন শিক্ষার্থী নির্দেশ করা হয়েছে। শ্রেণিকক্ষে কতজন শিক্ষার্থী আছে? বিভিন্ন উপায়ে এটি হিসাব করো।",
          body: [{ kind: "p088_seats", desks: [["111", "111", "111"], ["111", "111", "111"], ["001", "111", "110"]], s: 5 }] },
      ],
    },
  ],
};
