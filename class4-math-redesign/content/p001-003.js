// অধ্যায় ১ · সংখ্যা ও স্থানীয় মান: printed pages 1–3 (PDF pages 8–10), every word as printed. Written by Claude as the
// model for the helpers (23 Nov 2026).
// সংখ্যা গণনা: a 6-digit price read with the place-value table (p. 1), a 6-digit password and a 7-digit population that
// needs the new place নিযুত (p. 2), the digit tree of ৩১৬৯৬১৫ and three অনুশীলন (p. 3).
// Own kinds (content/p001-003.parts.js): c4p001_pvlines (the digit tree, with brackets), c4p001_named (the "স্থানের নাম"
// arrow), c4p001_chip (an orange digit). Reused: Class 2's p011_tab (tables with merged cells), Class 3's c3p001_saybox
// (a speech card holding a table) and c3p001_box (a label with an answer box).
// The book's triangles on p. 2 are printed pale blue; its key page (PDF p. 5) makes a triangle কাজ, so they are কাজ here.
const say = (who, mood, text) => ({ say: who, mood, text });
const PL6 = ["লক্ষ", "অযুত", "হাজার", "শতক", "দশক", "একক"], PL7 = ["নিযুত", ...PL6];
const hd = (cells) => ({ type: "hd", cells });
const num = (cells) => ({ type: "num", cells });
// a line of words with its answer box on the right (p. 3 অনুশীলন ৩): the words wrap, the boxes line up
const ansRow = (text) => ({ row: [text, { kind: "c3p001_box", w: 48, h: 8 }], w: [0, 50], gap: 3 });

module.exports = {
  pages: [
    {
      page: 1,
      opener: { title: "সংখ্যা ও স্থানীয় মান" },
      title: "সংখ্যা গণনা",
      spread: true,
      blocks: [
        { row: [
          { ask: "একটি পরিবেশবান্ধব গাড়ির মূল্য ৩১২৮৪১ টাকা। আমরা কীভাবে এই সংখ্যাটি গণনা করে পড়তে ও লিখতে পারি?" },
          { pic: "p001-eco-car", h: 32, fit: "contain" },
        ], w: [0, 44], gap: 3 },
        { row: [
          say("boy", "think", "এসো আমরা ভেবে দেখি কীভাবে বড়ো সংখ্যা গণনা করা যায়।"),
          say("girl", "talk", "আমরা ৩য় শ্রেণির মতোই স্থানীয় মান ব্যবহার করে গণনা করে পড়তে ও লিখতে পারি। চলো, আমরা গাড়ির মূল্য পড়ি ও লিখি।"),
        ], gap: 3, align: "flex-start" },
        { kind: "c4p001_named", label: "স্থানের নাম", body: { kind: "p011_tab", tone: "blue", rows: [
          hd(PL6),
          num(["৩", "১", "২", "৮", "৪", "১"]),
          { cells: ["তিন লক্ষ", { c: "বারো হাজার", span: 2 }, "আট শত", { c: "একচল্লিশ", span: 2 }] },
        ] } },
        "আমরা ৩১২৮৪১ সংখ্যাটি পড়ি ‘তিন লক্ষ বারো হাজার আটশত একচল্লিশ’।",
        { kind: "c4p001_pvlines", digits: "৩১২৮৪১", rows: [["১ একক", "১"], ["৪ দশক", "৪০"], ["৮ শতক", "৮০০"], ["২ হাজার", "২০০০"], ["১ অযুত", "১০০০০"], ["৩ লক্ষ", "৩০০০০০"]],
          brackets: [{ rows: [3, 4], text: "১২ হাজার" }] },
      ],
    },
    {
      page: 2,
      blocks: [
        { ex: "১", mark: "kaj", text: "আরিফ সাহেব মোবাইলে পাসওয়ার্ড দিয়েছেন ২৯০৫১৬। সংখ্যাটি পড়ি এবং লিখি।", body: [
          { row: [
            say("boy", "talk", "আগের নিয়মে সংখ্যাটি গণনা করতে পারি।"),
            say("girl", "talk", "সংখ্যাটি স্থানীয় মানের ছকে বসালে সহজ হবে।"),
          ], gap: 3 },
          // the book's empty table: a row for the digits, then a row whose cells join as the number is read (লক্ষ, অযুত+হাজার, শতক, দশক+একক)
          { kind: "p011_tab", tone: "blue", rows: [
            hd(PL6),
            { cells: ["", "", "", "", "", ""], h: 10 },
            { cells: ["", { c: "", span: 2 }, "", { c: "", span: 2 }], h: 9 },
          ] },
          { kind: "c3p001_box", label: "সংখ্যাটি কথায় লিখি", w: 70 },
        ] },
        { ex: "২", mark: "kaj", text: "বাংলাদেশের একটি জেলার লোকসংখ্যা ৩১৬৯৬১৫ জন। সংখ্যাটি আমরা কীভাবে পড়ব?", body: [
          say("boy", "talk", "এই বড়ো সংখ্যাটি আমরা আগের নিয়মে গণনা করতে পারি।"),
          { kind: "c3p001_saybox", who: "girl", mood: "think",
            text: "অপেক্ষা করো! আমার কাছে একটু অন্য রকম লাগছে, কারণ এখানে বামদিকের ৩ এর স্থানীয় মানের স্থানটি নাই।",
            body: [{ row: [
              { kind: "c4p001_chip", text: "৩" },
              { kind: "p011_tab", tone: "yellow", small: true, rows: [hd(PL6), num(["১", "৬", "৯", "৬", "১", "৫"])] },
            ], w: [12, 0], gap: 2 }] },
        ] },
        { kind: "c4p001_named", label: "স্থানের নাম", body: { kind: "p011_tab", tone: "blue", rows: [
          hd(PL7),
          num(["৩", "১", "৬", "৯", "৬", "১", "৫"]),
        ] } },
        say("parrot", "talk", "আমাদের নতুন স্থানটির নাম ‘নিযুত’।\n১ নিযুত অর্থ হলো ১০ লক্ষ।"),
      ],
    },
    {
      page: 3,
      dense: true,
      blocks: [
        { gap: 2 },
        { kind: "c4p001_pvlines", digits: "৩১৬৯৬১৫",
          rows: [["৫ একক", "৫"], ["১ দশক", "১০"], ["৬ শতক", "৬০০"], ["৯ হাজার", "৯০০০"], ["৬ অযুত", "৬০০০০"], ["১ লক্ষ", "১০০০০০"], ["৩ নিযুত", "৩০০০০০০"]],
          brackets: [{ rows: [3, 4], text: "৬৯ হাজার" }, { rows: [5, 6], text: "৩১ লক্ষ" }] },
        { ex: "১", mark: "anu", text: "স্থানীয় মান অনুযায়ী গণনা করি ও সংখ্যাটি লিখি।", body: [
          { kind: "p011_tab", tone: "yellow", small: true, rows: [
            hd(PL7),
            ["", "", "১০০০০", "", "", "", "১"],
            ["", "", "১০০০০", "", "", "", "১"],
            ["", "১০০০০০", "১০০০০", "", "১০০", "", "১"],
            ["১০০০০০০", "১০০০০০", "১০০০০", "১০০০", "১০০", "", "১"],
            ["১০০০০০০", "১০০০০০", "১০০০০", "১০০০", "১০০", "১০", "১"],
            ["১০০০০০০", "১০০০০০", "১০০০০", "১০০০", "১০০", "১০", "১"],
            { cells: ["", "", "", "", "", "", ""], h: 8 },
          ] },
          "সংখ্যাটি হলো ______________",
        ] },
        { ex: "২", mark: "anu", text: "নিচের সংখ্যাগুলো উচ্চস্বরে পড়ি ও কথায় লিখি এবং উপরে দেখানো নিয়মে স্থানীয় মান নির্ণয় করি।", body: [
          { sums: ["(১) ২৩৬৫১৭", "(২) ৩৫৬৫৮৮১", "(৩) ৫১২৭৬০১"], cols: 3 },
        ] },
        { ex: "৩", mark: "anu", text: "অঙ্কে লিখি।", body: [
          ansRow("(১) পাঁচ লক্ষ সাতান্ন হাজার তিনশত বাষট্টি"),
          ansRow("(২) বারো লক্ষ তিন হাজার আটশত চুরাশি"),
          ansRow("(৩) পঞ্চান্ন লক্ষ আঠারো হাজার পাঁচশত ছত্রিশ"),
          ansRow("(৪) ৪টি এক লক্ষ, ১২টি এক হাজার দ্বারা গঠিত সংখ্যা"),
          ansRow("(৫) ১৮টি এক লক্ষ, ৭৩টি এক হাজার, ৬টি একশত ও ৩৪টি এক দ্বারা গঠিত সংখ্যা"),
        ] },
      ],
    },
  ],
};
