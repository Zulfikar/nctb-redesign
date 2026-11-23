// অধ্যায় ২ · যোগ ও বিয়োগ: printed pages 40–55 (PDF pages 49–64), every word as printed.
// যোগ (১) pp. 40–45 · বিয়োগ (১) pp. 46–52 · গাণিতিক সম্পর্ক (যোগ ও বিয়োগ) pp. 53–54 · যোগ (২) from p. 55.
// Own kinds (content/p040-055.parts.js): p040_tri (the book's pink ▲ prompts), p040_cs (sums in columns), p040_hs (sums in
// a line with "১)" marks), p040_pv (blocks in a দশক | একক table, step by step), p040_cards, p040_papers, p040_books,
// p040_tape, p040_cross, p040_mangoes, p040_list, p040_arrow. The green ■ exercises are the yellow `ex` cards.
// The text check reads a column sum digit by digit (one cell each), so a lone digit the OCR only saw inside a number
// ("০" of ৩০) is listed in `allow`; each was checked by eye against the book.
const cs = (items, o = {}) => ({ kind: "p040_cs", items, ...o });
const hs = (items, o = {}) => ({ kind: "p040_hs", items, ...o });
const tri = (n, text) => ({ kind: "p040_tri", n, text });
const BN = "০১২৩৪৫৬৭৮৯", bn = (n) => String(n).replace(/\d/g, (d) => BN[d]);
const DE = ["দশক", "একক"];
// column sum exercises: "৩২+৩০" → { mk: "১)", rows: ["৩২", "+৩০"], ans: "" } (empty boxes to write in)
const col = (list, { start = 1, paren = false, op = "+" } = {}) => list.map((x, i) => {
  const [a, b] = x.split(/[+−]/);
  return { mk: paren ? `(${bn(start + i)})` : `${bn(start + i)})`, rows: [a, op + b], ans: "" };
});

module.exports = {
  pages: [
    {
      page: 40,
      opener: { n: "দ্বিতীয় অধ্যায়", title: "যোগ ও বিয়োগ" },
      title: "যোগ (১)",
      spread: true,
      allow: ["১০", "২"], // the numbers on the cards' stars (১০, ৩, ২): too small for the OCR, checked by eye
      blocks: [
        { ask: "রাফির ৪৩টি কার্ড আছে। তুলির ৩২টি কার্ড আছে। দুজনের কার্ড একত্র করলে কতগুলো কার্ড হবে?" },
        { kind: "p040_cards", panels: [{ rows: [[10, 10], [10, 10, 3]], cap: "৪৩টি কার্ড" }, { rows: [[10, 10], [10, 2]], cap: "৩২টি কার্ড" }] },
        { say: "boy", mood: "think", text: "কীভাবে একত্র করা যায় তা ভেবে দেখি।\nএকত্র করলে কি কার্ডের সংখ্যা বেশি হতে পারে?" },
        { say: "girl", mood: "think", text: "কার্ডের মোট সংখ্যার হিসাব কীভাবে গাণিতিক বাক্যে প্রকাশ করা যায়?" },
        { say: "boy", mood: "talk", text: "গাণিতিক বাক্যে প্রকাশ করলে হয়\n৪৩ + ৩২ = □" },
      ],
    },
    {
      page: 41,
      spread: true,
      allow: ["৬"], // the ৬ of ১৬ in the column sum (the OCR reads "১৬" whole), checked by eye
      blocks: [
        { row: [
          { kind: "p040_pv", heads: DE, color: "blue", s: 2.9, w: [40, 22], steps: [
            { rows: [{ t: 4, o: 3 }, { t: 3, o: 2 }] },
            { rows: [{ t: 7, o: 5 }] },
          ] },
          { col: [
            { frame: [
              { text: "একক এর স্থানের সংখ্যা গাণিতিক বাক্যে প্রকাশ করলে হয়:" },
              { text: "**৩+২=৫**", center: true },
              { gap: 2 },
              { text: "দশক এর স্থানের সংখ্যা গাণিতিক বাক্যে প্রকাশ করলে হয়:" },
              { text: "**৪+৩=৭**", center: true },
            ], tone: "blue" },
            { gap: 8 },
            cs([{ heads: DE, rows: ["৪৩", "+৩২"], ans: "৭৫", div: "dash", box: "white" }], { size: 20, justify: "center" }),
          ], gap: 2 },
        ], w: [66], align: "start", gap: 6 },
        { text: "যোগ একক স্থান থেকে শুরু করতে হয়।", big: true },
        { ask: "৩২+১৬ কীভাবে যোগ করা যায়?" },
        { say: "boy", mood: "think", text: "তুমি কি সংখ্যাগুলো স্থানীয় মান অনুযায়ী সাজিয়েছ?" },
        { row: [
          cs([{ rows: ["৩২", "+১৬"], ans: "৪৮", div: "dash", box: "white" }], { size: 19, justify: "center" }),
          { say: "girl", mood: "think", text: "তুমি কি প্রথমে একক স্থানের অঙ্ক যোগ করেছ?" },
        ], w: [40], gap: 4 },
      ],
    },
    {
      page: 42,
      spread: true,
      allow: ["০", "৬"], // single digits of the column sums (৩০, ২০ …; ১৬), checked by eye
      blocks: [
        { ex: "১", text: "যোগ করি", body: [cs(col(["৩২+৩০", "৫১+১৪", "৩২+২২", "৫০+২০", "৬৫+১৩"], { paren: true }), { cols: 5, size: 18 })] },
        { ex: "২", text: "নিচের যোগগুলো করি", body: [hs(["২২ + ৩৬", "৭২ + ১৫", "৭১ + ৫", "৮ + ৬০", "৩৫ + ১০"], { paren: true, cols: 3, size: 15.5 })] },
        { ask: "রাজুর ৩৮টি রঙিন কার্ডের একটি বান্ডেল আছে। মিনার ২৪ টি রঙিন কার্ডের একটি বান্ডেল আছে। দুজনের মোট কতগুলো রঙিন কার্ড আছে?" },
        { say: "boy", mood: "think", text: "• কার্ডের মোট সংখ্যা কীভাবে হিসাব করতে পারি?\n• হিসাবটি গাণিতিক বাক্যে প্রকাশ করলে হয়\n৩৮ + ২৪ = □\nকার্ডের বান্ডেলগুলোকে ব্লক দিয়ে সাজিয়ে নিই।" },
      ],
    },
    {
      page: 43,
      blocks: [
        { kind: "p040_pv", heads: DE, color: "blue", s: 2.7, w: [34, 18, 27], steps: [
          { rows: [{ t: 3, o: 8 }, { t: 2, o: 4 }], sum: { rows: ["৩৮", "+২৪"], ans: "", div: "solid", box: "white" },
            side: [{ say: "girl", mood: "talk", text: "আমরা স্থানীয় মান ব্যবহার করে সংখ্যা দুটি সাজিয়ে নিই" }] },
          { rows: [{ t: { label: "দশকের স্থানে\nনিয়ে যাই।" }, o: ["hhhhhhhhhh", "oo"] }], sum: { rows: ["৩৮", "+২৪"], ans: "", div: "solid", box: "white" },
            side: [{ say: "girl", mood: "talk", text: "একক স্থানের অঙ্ক দুটি গাণিতিক বাক্যে প্রকাশ করলে ৮+৪ =১২ হয়। ১২ হলো ১দশ ২। একক স্থানে ২ লিখি এবং দশকের অঙ্কের সাথে ১ যোগ করি। দশকের স্থানে ৩+২+১ = ৬ লিখি।" }] },
          { rows: [{ t: "ooooo m", o: "|" }] },
          { rows: [{ t: 6, o: 2 }], sum: { carry: ["+১", "_"], rows: ["৩৮", "+২৪"], ans: "৬২", div: "solid", box: "white" },
            side: [{ text: "[[৩৮+ ২৪= ৬২]]" }] },
        ] },
      ],
    },
    {
      page: 44,
      spread: true,
      allow: ["ভিন্ন"], // the book's thought cloud is printed at a slant; the OCR misreads ভিন্ন there, checked by eye
      blocks: [
        tri("১", "২৩+১৮ কীভাবে যোগ করা যায়?"),
        { row: [
          { kind: "p040_pv", plain: true, color: "pink", s: 3, steps: [{ rows: [{ t: 2, o: 3 }, { t: 1, o: 8 }] }] },
          { kind: "p040_arrow", w: 18 },
          cs([{ rows: ["২৩", "+১৮"], ans: "", div: "dash", box: "blue" }], { size: 21, justify: "center" }),
        ], w: [52, 24, 52], justify: "center", gap: 6 },
        { ex: "১", text: "যোগ করি", body: [
          cs(col(["২৩+১৮", "৪৫+২৭", "৫২+৩৮", "৭৮+০৮", "২৬+৩৭"]), { cols: 5, size: 17 }),
          hs(["৩৭ + ৫৩", "৪৫ + ৪৫", "৪৭ + ১৮", "৬৫ + ৫", "৪২ + ২৯"], { start: 6, cols: 3, size: 15 }),
        ] },
        tri("২", "৩৮+৫২= □"),
        { row: [
          { say: "boy", mood: "think", text: "কীভাবে যোগটি করতে পরি?" },
          cs([{ rows: ["৩৮", "৫২"], ans: "", div: "dash", box: "white" }], { size: 18, justify: "center" }),
          { say: "girl", mood: "think", text: "এই যোগটি কি ভিন্ন ধরনের?" },
        ], w: [66, 22, 66], gap: 4 },
      ],
    },
    {
      page: 45,
      spread: true,
      allow: ["২৮"], // ৪২ + ২৮ and ৬২ + ২৮: the OCR misreads the book's ২৮, checked by eye
      blocks: [
        tri("৩", "কীভাবে আমরা নিচের যোগগুলো করতে পারি?"),
        { row: [
          { text: "৩৫ + ৬", big: true, center: true },
          cs([{ rows: ["৩৫", "+৬"], ans: "", div: "dash", box: "blue" }], { size: 18, justify: "center" }),
          { text: "৭ + ৩৬", big: true, center: true },
          cs([{ rows: ["৭", "+৩৬"], ans: "", div: "dash", box: "blue" }], { size: 18, justify: "center" }),
        ], gap: 3 },
        { ex: "২", text: "যোগ করি", body: [
          cs(col(["২৬+৩৭", "৩৮+২২", "৫৬+১৪", "৩৬+১৭", "৭৫+১৫"]), { cols: 5, size: 17 }),
          hs(["৪২ + ২৮", "৭৮ + ১৩", "৬২ + ২৮", "৬ + ৫৭", "৭২ + ৯"], { start: 6, cols: 3, size: 15 }),
        ] },
        { ex: "৩", text: "দিলীপ বাজার থেকে ৪৫ টাকার মাছ ও ৩৮ টাকার সবজি কিনল। সে মোট কত টাকা খরচ করল?" },
        { ex: "৪", text: "মাহদি ও তার বন্ধুরা দুই দলে একুশে ফেব্রুয়ারির প্রভাত ফেরিতে গেল। এক দলে ৩৫ জন ও অন্য দলে ২৭ জন আছে। দুই দলে মোট কতজন আছে?" },
        { ex: "৫", text: "মানহাদের পারিবারিক লাইব্রেরিতে ৫৪টি গল্পের বই ও ৩৮টি অন্য বিষয়ের বই আছে। লাইব্রেরিতে মোট কতগুলো বই আছে?" },
      ],
    },
    {
      page: 46,
      title: "বিয়োগ (১)",
      spread: true,
      blocks: [
        { ask: "মিনার ৩৬টি কাগজ ছিল, সে এর থেকে ১৩টি কাগজ রাজুকে দিল। মিনার কাছে কতটি কাগজ রইল?" },
        { kind: "p040_papers" },
        { text: "গাণিতিক বাক্য: ________________" },
        tri("", "কীভাবে হিসাবটি করা যায় তা ভেবে দেখি।"),
        { row: [
          { say: "boy", mood: "talk", text: "আমি গণনা করে ৩৬টি থেকে এক এক করে ১৩টি সরিয়ে নিই।" },
          { say: "girl", mood: "talk", text: "১৩ হচ্ছে ১ দশ ৩ একক। আমি ৩ দশ ৬ থেকে ১ দশ ৩ সরিয়ে নিই।" },
        ], gap: 4 },
        { row: [
          { kind: "p040_pv", plain: true, color: "pink", s: 3.4, steps: [{ rows: [{ t: "oox", o: ["xxxooo"] }] }] },
          { kind: "p040_pv", plain: true, color: "pink", s: 3.4, steps: [{ rows: [{ t: "ooq", o: ["qqqooo"] }] }] },
          { kind: "p040_arrow", w: 12, solid: true },
        ], w: [62, 62, 16], justify: "center", gap: 6 },
      ],
    },
    {
      page: 47,
      blocks: [
        { text: "স্থানীয় মানের সাহায্যে ৩৬ থেকে ১৩ কীভাবে বিয়োগ করবে?", big: true },
        { kind: "p040_pv", heads: DE, color: "pink", s: 2.5, w: [28, 18, 30], steps: [
          { rows: [{ t: 3, o: 6 }, { t: "g", o: ["ggg"] }], sum: { heads: DE, grid: true, rows: ["৩৬", "−১৩"], ans: "", size: 14 },
            side: [{ text: "সংখ্যা দুটি স্থানীয় মান ব্যবহার করে সাজিয়ে নিই।" }] },
          { rows: [{ t: "|", o: ["hhhooo"] }], sum: { rows: ["৩৬", "−১৩"], ans: "_৩", div: "solid", box: "white" },
            side: [{ text: "এককের স্থান ৬ − ৩ = ৩ হয়।" }] },
          { rows: [{ t: "oow", o: "|" }], sum: { rows: ["৩৬", "−১৩"], ans: "২৩", div: "solid", box: "white" },
            side: [{ text: "দশকের স্থান ৩ − ১ = ২ হয়।" }] },
          { rows: [{ t: 2, o: 3 }], sum: { rows: ["৩৬", "−১৩"], ans: "২৩", div: "solid", box: "white" },
            side: [{ text: "**৩৬ − ১৩ = ২৩**" }] },
        ] },
        { ex: "১", text: "বিয়োগ করি", body: [hs(["৪৫ − ২৩", "৫৬ − ১২", "৮৬ − ৩১", "৭৫ − ২৩"], { cols: 4, size: 15 })] },
      ],
    },
    {
      page: 48,
      spread: true,
      blocks: [
        { ex: "২", text: "কীভাবে ৪৭ থেকে ১০ বিয়োগ করা যায় ভেবে দেখি", body: [{ row: [
          { kind: "p040_pv", heads: DE, color: "pink", s: 3, w: [44, 30], steps: [{ rows: [{ t: 4, o: 7 }] }] },
          cs([{ rows: ["৪৭", "−১০"], ans: "", div: "solid", box: "white" }], { size: 20, justify: "center" }),
        ], w: [86], justify: "center", gap: 12 }] },
        { ex: "৩", text: "কীভাবে ৪৫ থেকে ২৫ বিয়োগ করা যায় ভেবে দেখি", body: [{ row: [
          { kind: "p040_pv", heads: ["দশ এর ব্লক", "একটি করে পাঁচটি ব্লক"], color: "pink", s: 3, w: [44, 42], steps: [{ rows: [{ t: 4, o: 5 }] }] },
          cs([{ rows: ["৪৫", "−২৫"], ans: "", div: "solid", box: "white" }], { size: 20, justify: "center" }),
        ], w: [98], justify: "center", gap: 12 }] },
        { ex: "৪", text: "বিয়োগ করি", body: [
          cs(col(["৪৫−২৩", "৩২−১১", "৬৮−১২", "৭৯−৫০", "৯৮−৬৭"], { op: "−" }), { cols: 5, size: 17 }),
          cs(col(["৪৯−১০", "৬৬−৪০", "৫৮−১৮", "৭০−৩০", "৩৮−৩৪"], { op: "−", start: 6 }), { cols: 5, size: 17 }),
        ] },
      ],
    },
    {
      page: 49,
      spread: true,
      blocks: [
        { ask: "৩৯ থেকে ৫ কীভাবে বিয়োগ করা যায়?" },
        { row: [
          { kind: "p040_pv", heads: DE, color: "pink", s: 2.8, w: [40, 24], steps: [{ rows: [{ t: 3, o: 9 }] }] },
          cs([{ rows: ["৩৯", "−৫"], ans: "", div: "dash", box: "blue" }], { size: 20, justify: "center" }),
        ], w: [66], justify: "center", gap: 18 },
        tri("১", "৩৯ থেকে ৯ কীভাবে বিয়োগ করা যায়?"),
        { row: [
          { kind: "p040_pv", heads: DE, color: "pink", s: 2.8, w: [40, 24], steps: [{ rows: [{ t: 3, o: 9 }] }] },
          cs([{ rows: ["৩৯", "−৯"], ans: "", div: "dash", box: "yellow" }], { size: 20, justify: "center" }),
        ], w: [66], justify: "center", gap: 18 },
        { ex: "১", text: "বিয়োগ করি", body: [cs(col(["৬৪−৩", "৭৮−৫", "৯৪−২", "৭৬−৬", "৫৭−৭"], { op: "−" }), { cols: 5, size: 17 })] },
        { ex: "২", text: "বিয়োগ করি", body: [hs(["৮৫ − ১৩", "৭৯ − ৪৪", "৬১ − ৫০", "৭৫ − ২৫", "৯০ − ৫০", "৪৯ − ৪২", "৯৭ − ৫", "৫৩ − ৩"], { cols: 4, size: 15 })] },
      ],
    },
    {
      page: 50,
      dense: true,
      blocks: [
        { ask: "রাজুর কাছে ৪৫টি রং পেনসিল ছিল। সে তুলিকে ১৮টি রং পেনসিল দিল। রাজুর কাছে কতটি রং পেনসিল রইল?" },
        { text: "হিসাবটি গাণিতিক বাক্যে প্রকাশ করলে হয় ৪৫ − ১৮ = □" },
        { kind: "p040_pv", heads: DE, color: "pink", s: 2, w: [28, 16, 25], steps: [
          { rows: [{ t: 4, o: 5 }, { t: "g", o: ["gggggggg"] }], sum: { heads: DE, grid: true, rows: ["৪৫", "−১৮"], ans: "", size: 11.5, compact: true },
            side: [{ say: "girl", mood: "think", text: "তুমি কীভাবে আমাকে ১৮টি রং পেনসিল দিবে?" }, { text: "সংখ্যা দুটি স্থানীয় মান ব্যবহার করে সাজিয়ে নিই।" }] },
          { rows: [{ t: "ooor>", o: ["hhhhhhhhhh", "ooooo"] }], sum: { rows: ["_৫{১০}", "−১৮"], ans: "", div: "solid", box: "white", size: 12, compact: true },
            side: [{ text: "যেহেতু একক স্থানের অঙ্ক ৫ ছোটো, ৮ বড়ো তাই আমরা একক স্থানের ৫ থেকে ৮ বিয়োগ করতে পারি না। সুতরাং দশক এর স্থান থেকে ১ দশ একক স্থানে সরিয়ে নিয়ে এককের সংখ্যার সাথে যোগ করে পাই ১০ + ৫ =১৫" }] },
          { rows: [{ t: "|", o: ["hhhhhhhyyy", "xxxxx"] }], sum: { rows: ["_৫{১০}", "−১৮"], ans: "_৭", div: "solid", box: "white", size: 12, compact: true },
            side: [{ text: "এককের স্থান: ১৫ − ৮ = ৭" }] },
          { rows: [{ t: "oow", o: "|" }], sum: { rows: ["_৫{১০}", "−১৮"], ans: "২৭", div: "solid", box: "white", size: 12, compact: true },
            side: [{ text: "দশকের স্থান: ৩ − ১ = ২" }] },
          { rows: [{ t: 2, o: 7 }], sum: { rows: ["_৫{১০}", "−১৮"], ans: "২৭", div: "solid", box: "white", size: 12, compact: true },
            side: [{ text: "**৪৫ − ১৮ = ২৭**" }] },
        ] },
      ],
    },
    {
      page: 51,
      spread: true,
      blocks: [
        { ex: "১", text: "বিয়োগ করি", body: [cs(col(["৯৭−৫৯", "৭১−৪৪", "৭৫−৪৭", "৬০−৫৩", "৭০−২২"], { op: "−" }), { cols: 5, size: 17 })] },
        { ex: "২", text: "বিয়োগ করি", body: [hs(["৩২ − ১৫", "৮৫ − ৪৭", "৬৪ − ২৭", "৯২ − ২৩"], { cols: 4, size: 15 })] },
        tri("১", "৩৪ থেকে ৭ কীভাবে বিয়োগ করা যায়?"),
        { row: [
          { kind: "p040_pv", heads: DE, color: "pink", s: 2.8, w: [40, 24], steps: [{ rows: [{ t: 3, o: 4 }] }] },
          cs([{ rows: ["৩৪", "−৭"], ans: "", div: "dash", box: "blue" }], { size: 20, justify: "center" }),
        ], w: [66], justify: "center", gap: 18 },
        tri("২", "৩০ থেকে ৬ কীভাবে বিয়োগ করা যায়?"),
        { row: [
          { kind: "p040_pv", heads: DE, color: "pink", s: 2.8, w: [40, 24], steps: [{ rows: [{ t: 3, o: 0 }] }] },
          cs([{ rows: ["৩০", "−৬"], ans: "", div: "dash", box: "blue" }], { size: 20, justify: "center" }),
        ], w: [66], justify: "center", gap: 18 },
      ],
    },
    {
      page: 52,
      spread: true,
      allow: ["০"], // the ০ of ৩০, ৬০, ৮০ in the column sums, checked by eye
      blocks: [
        { ex: "৩", text: "বিয়োগ করি", body: [cs(col(["২৫−৮", "৪৩−৫", "৩০−৭", "৬০−৬", "৮০−৯"], { op: "−" }), { cols: 5, size: 19 })] },
        { ex: "৪", text: "বিয়োগ করি", body: [hs(["৮২ − ১৩", "৭১ − ৪৪", "৯৭ − ৫৯", "৬০ − ৩৫", "৭৪ − ৬৮", "৪০ − ৩৪", "৯৩ − ৫", "৫০ − ৩"], { cols: 4, size: 16 })] },
        { ex: "৫", text: "বিয়োগ সম্পর্কিত গাণিতিক সমস্যা", body: [{ kind: "p040_list", items: [
          "রুমির ৭৫টি মারবেল আছে এবং রাজুর ৪৯টি মারবেল আছে। রুমি থেকে রাজুর কয়টি মারবেল বেশি বা কম আছে?",
          "মা ও মেয়ের বয়স একত্রে ৭০ বছর। মেয়ের বয়স ২২ বছর। মায়ের বয়স কত?",
          "রুমু থেকে ঝুমু ৮ বছরের বড়ো। ঝুমুর বয়স ২৪ বছর। রুমুর বয়স কত?",
        ] }] },
      ],
    },
    {
      page: 53,
      title: "গাণিতিক সম্পর্ক (যোগ ও বিয়োগ)",
      spread: true,
      blocks: [
        { ask: "একটি ব্যাগে কয়েকটি আম ছিল। ৫টি আম বিক্রি করা হলো। এখন ব্যাগে ৬টি আম আছে। প্রথমে ব্যাগে কয়টি আম ছিল?" },
        { say: "boy", mood: "talk", text: "বিক্রি করায় ব্যাগ হতে ৫টি আম কমে গেল।" },
        { say: "girl", mood: "talk", text: "৫টি আম বাদ দিতে হবে।" },
        { say: "boy", mood: "talk", text: "নিচে সমস্যাটির ছবি আঁকি।" },
        { kind: "p040_mangoes" },
        { row: [
          { text: "এখন ব্যাগে আছে ৬টি আম।" },
          { say: "girl", mood: "think", text: "প্রথমে কয়টি আম ছিল, কীভাবে বের করবে?" },
        ], w: [58], gap: 3 },
        { text: "৫টি আম বিক্রি করার পর ৬টি আম থাকে। ছবি হতে দেখা যায় ব্যাগে আম ছিল ১১টি।\nগাণিতিক বাক্যে লিখতে পারি" },
        { text: "**□ − ৫ = ৬ ⟶ ৬ + ৫ = □টি আম ছিল।**" },
        { row: [
          { say: "boy", mood: "talk", text: "বিয়োগের সর্বপ্রথম সংখ্যাটি হচ্ছে অন্য দুটি সংখ্যার যোগফল।" },
          { kind: "p040_cross" },
        ], w: [104], gap: 4 },
      ],
    },
    {
      page: 54,
      spread: true,
      blocks: [
        { ex: "১", text: "খালি ঘর পূরণ করি", body: [
          hs(["৯ + □ = ১৬", "৩৯ − □ = ৩১"], { cols: 2, size: 15 }),
          { kind: "p040_tape", bars: [{ top: ["৯", "?"], bottom: ["১৬"] }, { top: ["৩৯"], bottom: ["?", "৩১"] }] },
          hs(["□ + ২৩ = ৩৪", "□ + ১৯ = ৪৫", "১৪ + □ = ৩৫", "২৯ − □ = ১৭", "□ + ২৭ = ৭৫", "□ − ৩৯ = ৪৫", "১২ + ৯ − □ = ১৩", "২২ + ৮ − □ = ২৩"], { start: 3, cols: 2, size: 15 }),
        ] },
        { ex: "২", text: "বিজয় কিছু সংখ্যক আম বিক্রি করার জন্য বাজারে যাচ্ছিল। তার চাচা বিক্রি করার জন্য আরও ১৫টি আম দিল। ৩৩টি আম বিক্রি করার পর তার কাছে ১২টি আম অবশিষ্ট রইলো। তার কাছে প্রথমে কতগুলো আম ছিল?" },
        { ex: "৩", text: "জলিল সাহেব বাজার থেকে ১০০টি লিচু ক্রয় করলেন। বাড়িতে এসে ২৫টি মেয়েকে, ২৩টি ছেলেকে দিলেন। তার কাছে কতটি লিচু থাকল?" },
        { ex: "৪", text: "কোনো বাক্সে ২৫টি চকলেট ছিল। এর থেকে কয়েকটি চকলেট মিতুকে দেওয়া হলো। বাক্সে ১৭টি চকলেট থাকল। কয়টি চকলেট মিতুকে দেওয়া হয়েছিল? এর গাণিতিক বাক্য কী হবে?" },
      ],
    },
    {
      page: 55,
      title: "যোগ (২)",
      spread: true,
      blocks: [
        { ask: "তুলির ৭০টি গল্পের বই ছিল। বই মেলা থেকে সে আরও ৫০টি গল্পের বই কিনল। তুলির মোট কয়টি গল্পের বই হলো?" },
        { kind: "p040_books", left: 7, right: 5, scale: .76 },
        { text: "গাণিতিক বাক্য: ________________" },
        { say: "boy", mood: "think", text: "গাণিতিক বাক্য কীভাবে লিখতে পারি" },
        { say: "girl", mood: "talk", text: "৭০ + ৫০ = ১২০" },
        { ex: " ", dot: false, text: "যোগ করি", body: [hs(["৮০+৫০", "৬০+৬০", "৫০+৯০", "৮০+৯০", "১০০+৩০০", "৫০০+২০০", "১৪০+২০", "৩০+১৩০", "১৬০+৩০", "৫০+২২০"], { cols: 4, size: 15 })] },
      ],
    },
  ],
};
