// Pages ১–৩ (অধ্যায় ১ · সংখ্যা ও স্থানীয় মান: সংখ্যা গণনা), written by Claude as the model for the helpers (24 Nov 2026).
// The book: ../class4-math-redesign/content/p001-003.js (every word and number as printed).
// p.1: a 6-digit price (৩১২৮৪১) read with the place-value table and its digit tree; p.2: কাজ ১ a password (২৯০৫১৬) read
// and written in words, কাজ ২ a district's people (৩১৬৯৬১৫) that needs the new place নিযুত; p.3: the digit tree of
// ৩১৬৯৬১৫, অনুশীলন ১ (count the place-value table), ২ (read and write in words), ৩ (write in figures).
"use strict";
module.exports = (L) => {
  const { it, wio, toBn } = L;
  // a number's digits, the highest place first (the book's place table)
  const digits = (n) => String(n).split("").map(Number);
  // the value of the digit `at` places from the right (৩১২৮৪১, at 4 → ১০০০০)
  const value = (n, at) => Number(String(n)[String(n).length - 1 - at]) * 10 ** at;

  // p.1: the place-value table and the digit tree (each digit's স্থানীয় মান), the book's three numbers
  wio({
    page: 1, slug: "place-table", title: "স্থানীয় মানের ছকে সংখ্যা বসাই",
    items: [
      it({ kind: "place", n: 312841, ask: "parts" }, digits(312841)),
      it({ kind: "place", n: 312841, ask: "value", at: 5 }, 300000),
      it({ kind: "place", n: 312841, ask: "value", at: 4 }, value(312841, 4)),
      it({ kind: "place", n: 312841, ask: "value", at: 2 }, 800),
      it({ kind: "place", n: 290516, ask: "parts" }, digits(290516)),
      it({ kind: "place", n: 3169615, ask: "parts" }, digits(3169615)),
      it({ kind: "place", n: 3169615, ask: "value", at: 6 }, 3000000),
      it({ kind: "place", n: 3169615, ask: "value", at: 3 }, 9000),
      it({ kind: "place", n: 3169615, ask: "digit", at: 6 }, 3),
      it({ kind: "place", n: 3169615, ask: "digit", at: 4 }, 6),
    ],
    fresh: { skill: "place", count: 5, digits: 7 },
    src: "p.1 মূল প্রশ্ন (৩১২৮৪১ in the place table, its digit tree: ১ একক … ৩ লক্ষ), p.2 কাজ ১ (২৯০৫১৬) and কাজ ২ (৩১৬৯৬১৫, নিযুত), p.3 (the digit tree of ৩১৬৯৬১৫)",
  });

  // p.2: read and write in words (the words laid in order from tiles), the book's own words
  wio({
    page: 2, slug: "words", title: "সংখ্যাটি পড়ি এবং কথায় লিখি",
    items: [
      it({ kind: "place", n: 312841, ask: "words" }, ["তিন লক্ষ", "বারো হাজার", "আটশত", "একচল্লিশ"]),
      it({ kind: "place", n: 290516, ask: "words" }, ["দুই লক্ষ", "নব্বই হাজার", "পাঁচশত", "ষোলো"]),
      it({ kind: "place", n: 3169615, ask: "words" }, ["একত্রিশ লক্ষ", "উনসত্তর হাজার", "ছয়শত", "পনেরো"]),
      it({ kind: "place", n: 236517, ask: "words" }, ["দুই লক্ষ", "ছত্রিশ হাজার", "পাঁচশত", "সতেরো"]),
      it({ kind: "place", n: 3565881, ask: "words" }, ["পঁয়ত্রিশ লক্ষ", "পঁয়ষট্টি হাজার", "আটশত", "একাশি"]),
      it({ kind: "place", n: 5127601, ask: "words" }, ["একান্ন লক্ষ", "সাতাশ হাজার", "ছয়শত", "এক"]),
    ],
    fresh: { skill: "place", count: 5, digits: 7 },
    src: "p.1 (৩১২৮৪১ ‘তিন লক্ষ বারো হাজার আটশত একচল্লিশ’ as printed), p.2 কাজ ১ (২৯০৫১৬) and কাজ ২ (৩১৬৯৬১৫), p.3 অনুশীলন ২ (২৩৬৫১৭, ৩৫৬৫৮৮১, ৫১২৭৬০১)",
  });

  // p.3: অনুশীলন ১ (count each column of the table: ৩ নিযুত, ৪ লক্ষ, ৬ অযুত, ৩ হাজার, ৪ শতক, ২ দশক, ৬ একক) and
  // অনুশীলন ৩ (words → figures; (৪) and (৫) as the book builds them)
  wio({
    page: 3, slug: "figures", title: "স্থানীয় মান অনুযায়ী গণনা করি ও অঙ্কে লিখি",
    items: [
      it({ kind: "place", n: 3463426, ask: "number" }, 3463426),
      it({ kind: "place", n: 557362, ask: "figures" }, 557362),
      it({ kind: "place", n: 1203884, ask: "figures" }, 1203884),
      it({ kind: "place", n: 5518536, ask: "figures" }, 5518536),
      it({ kind: "missing", text: "4 × 100000 + 12 × 1000 = □" }, 412000),
      it({ kind: "missing", text: "18 × 100000 + 73 × 1000 + 6 × 100 + 34 = □" }, 1873634),
      it({ kind: "place", n: 236517, ask: "number" }, 236517),
      it({ kind: "place", n: 5127601, ask: "number" }, 5127601),
      it({ kind: "place", n: 3565881, ask: "figures" }, 3565881),
      it({ kind: "place", n: 290516, ask: "figures" }, 290516),
    ],
    fresh: { skill: "place", count: 5, digits: 7 },
    src: "p.3 অনুশীলন ১ (the table: ৩, ৪, ৬, ৩, ৪, ২, ৬ in its columns), অনুশীলন ৩ (১)–(৫) (৫৫৭৩৬২, ১২০৩৮৮৪, ৫৫১৮৫৩৬; ৪টি এক লক্ষ ও ১২টি এক হাজার; ১৮টি এক লক্ষ, ৭৩টি এক হাজার, ৬টি একশত ও ৩৪টি এক), and অনুশীলন ২'s numbers back in figures",
  });
};
