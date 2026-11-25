// অধ্যায় ১ · গুণ ও ভাগ: printed pages 1–3 (PDF pages 8–10), every word as printed. Written by Claude as the model for the
// helpers (25 Nov 2026).
// গুণ: the bridge's cars in a year, ৪৬১৪ × ৩৬৫ in columns with its three partial products (p. 1); the phone seller's ৮৫৩৬ × ৯৭২
// with boxes to fill, then ৪৭৬৫ × ২৩৫৪ with a box beside each partial product to name it (p. 2); four multiplications with
// empty squares or missing digits, and nine to do (p. 3).
// Own kind (content/p001-003.parts.js): c5p001_mul (a multiplication in columns: boxes, boxed digits, the book's ruled squares,
// labels with arrows on either side). Reused: Class 4's c4p041_mex (multiplications to do, the book's way).
// Every sum checked: ৪৬১৪ × ৩৬৫ = ১৬৮৪১১০, ৮৫৩৬ × ৯৭২ = ৮২৯৬৯৯২, ৪৭৬৫ × ২৩৫৪ = ১১২১৬৮১০, ৫৫৭৯ × ৪৬৭৭ = ২৬০৯২৯৮৩ (p. 3's (৩):
// the boxes hold ৯, ৬, ৩, ৭ and ৯), ৭৭৭২৩ × ৪৫৬৭ = ৩৫৪৯৬০৯৪১ ((৪): ৭, ৪, ৪, ৮, ৬, ১, ৪ and ০). The book's triangles are কাজ
// (its key page, PDF p. 5), the orange squares অনুশীলন.
const say = (who, mood, text, side) => ({ say: who, mood, text, ...(side ? { side } : {}) });
const mul = (rows, o = {}) => ({ kind: "c5p001_mul", rows, ...o });

module.exports = {
  pages: [
    {
      page: 1,
      opener: { title: "গুণ ও ভাগ" },
      title: "গুণ",
      blocks: [
        { row: [
          { ask: "একটি সেতু দিয়ে যদি দৈনিক ৪৬১৪টি গাড়ি যাতায়াত করে, তবে বছরে কয়টি গাড়ি যাতায়াত করবে?" },
          { pic: "p001-bridge", h: 44, frame: true },
        ], w: [0, 74], gap: 4 },
        say("boy", "think", "১ বছর সমান ৩৬৫ দিন। আমার মনে হয় ১ দিনে যাতায়াত করা গাড়ির সংখ্যাকে ৩৬৫ দ্বারা গুণ করতে হবে।"),
        say("girl", "talk", "ঠিক বলেছ। আমরা চতুর্থ শ্রেণিতে চার অঙ্কের সংখ্যাকে তিন অঙ্কের সংখ্যা দ্বারা গুণ করা শিখেছি।"),
        { row: [
          { text: "গাণিতিক বাক্য ৪৬১৪ × ৩৬৫ = □" },
          mul(["৪৬১৪", "×৩৬৫", "-", "২৩০৭০", "২৭৬৮৪০", "১৩৮৪২০০", "-", "১৬৮৪১১০"],
            { left: [null, null, "৪৬১৪ × ৫", "৪৬১৪ × ৬০", "৪৬১৪ × ৩০০", null], lw: 34, cell: 6.6, size: 14, frame: true }),
        ], w: [0, 96], gap: 3 },
        "বছরে ১৬৮৪১১০টি গাড়ি চলাচল করে।",
        { row: [
          say("boy", "think", "আমরা চতুর্থ শ্রেণিতে গুণ্য, গুণক ও গুণফল শিখেছি। তোমার কি মনে পড়ে?"),
          say("girl", "talk", "এখানে, গুণ্য ৪৬১৪\nগুণক ৩৬৫\nগুণফল ১৬৮৪১১০"),
        ], gap: 3 },
      ],
    },
    {
      page: 2,
      allow: ["৪৭৬৫"], // ex ২'s ৪৭৬৫ (Tesseract reads its ৪ as an 8 inside the word): checked by eye
      blocks: [
        { ex: "১", mark: "kaj", text: "একজন পাইকারি মোবাইল ফোন বিক্রেতা কোনো একমাসে প্রতিটি ৮৫৩৬ টাকা মূল্যের ৯৭২টি মোবাইল ফোন বিক্রয় করলেন। তিনি ঐ মাসে মোট কত টাকার মোবাইল ফোন বিক্রয় করলেন?", body: [
          say("boy", "talk", "আমরা পূর্বের শ্রেণিতে শিখেছি, ১টি জিনিসের দাম দেওয়া থাকলে অনুরূপ নির্দিষ্ট সংখ্যক জিনিসের দাম গুণ করে বের করা যায়।"),
          { text: "গাণিতিক বাক্য ৮৫৩৬ × ৯৭২ = □", big: true },
          { row: [
            mul(["৮৫৩৬", "×৯৭২", "-", "১□০□□", "৫□□৫□০", "□□৮২□০০", "-", "□□□□□□□"], { cell: 8.4, size: 15 }),
            { pic: "p002-phone-shop", h: 50, frame: true },
          ], w: [0, 66], gap: 3, align: "center" },
          { kind: "c4p067_x", b: "তিনি মোট ▭ টাকার মোবাইল ফোন বিক্রি করলেন।" },
        ] },
        { ex: "২", mark: "kaj", text: "উপরের প্রক্রিয়া অনুসরণ করে ৪৭৬৫ কে ২৩৫৪ দিয়ে উপর-নিচে গুণ করি।", body: [
          mul(["৪৭৬৫", "×২৩৫৪", "-", "[১]৯[০][৬]০", "২[৩][৮][২]৫০", "[১][৪]২[৯]৫০০", "৯[৫][৩]০০০০", "-", "১[১]২[১]৬[৮][১]০"],
            { right: [null, null, "▭ × □", "▭ × □", "▭ × □", "▭ × □", null], lw: 52, cell: 7.4, size: 14 }),
        ] },
        { ex: "১", mark: "anu", text: "৯৩৪৬২ কে ৩৬৫২ দিয়ে গুণ করি।" },
      ],
    },
    {
      page: 3,
      spread: true,
      blocks: [
        { ex: "৩", mark: "kaj", text: "খালি ঘরে সংখ্যা বসাই।", body: [
          { row: [
            { row: [{ text: "(১)" }, mul(["৮৩৪৬", "×১৫৮৫", "-", "□□□□□", "□□□□□□", "□□□□□□□", "□□□□□□□", "=", "□□□□□□□□"], { grid: true, cell: 6.6, size: 13 })], w: [9, 0], gap: 1, align: "flex-start" },
            { row: [{ text: "(২)" }, mul(["৬২৫৮", "×৬০৯৭", "-", "□□□□□", "□□□□□□", "□□□□□□", "□□□□□□□□", "=", "□□□□□□□□"], { grid: true, cell: 6.6, size: 13 })], w: [9, 0], gap: 1, align: "flex-start" },
          ], gap: 4 },
          { row: [
            { row: [{ text: "(৩)" }, mul(["৫৫৭□", "×৪□৭৭", "-", "□৯০৫৩", "৩৯০৫৩০", "৩৩৪□৪০০", "২২৩১৬০০০", "-", "২৬০□২৯৮৩"], { cell: 6.6, size: 13 })], w: [9, 0], gap: 1, align: "flex-start" },
            { row: [{ text: "(৪)" }, mul(["৭৭□২৩", "×□৫৬৭", "-", "৫৪৪০৬১", "□৬৬৩৩□০", "৩৮৮□১৫০০", "৩□০৮৯২০০০", "-", "৩৫□৯৬□৯৪১"], { cell: 6.6, size: 13 })], w: [9, 0], gap: 1, align: "flex-start" },
          ], gap: 4 },
        ] },
        { ex: "২", mark: "anu", text: "উপর-নিচে গুণ করি।", body: [
          { kind: "c4p041_mex", items: ["৪৬৩৫×২১৩৫", "৮৭৭৬৫×২৯৭২", "৫৮৯৩×৩৭৬৭", "৬৯০২৯×৫৫৪৭", "৭৩৫২৮×৫৮৩৭", "৯৫৭৪×৪৬০৬", "৬৩৯২৯×৪৫৯৭", "৯৩১৮৮×৫৯৩১", "৬৯৭২×৯৭১২"], cols: 3, room: false },
        ] },
      ],
    },
  ],
};
