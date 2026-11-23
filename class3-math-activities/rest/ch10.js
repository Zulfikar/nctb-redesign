// অধ্যায় ১০ · বাংলাদেশি মুদ্রা (printed pp.107–117): পয়সা and টাকা (100 পয়সা = 1 টাকা), counting notes and coins,
// changing notes, paying exactly from a box, adding and taking away টাকা পয়সা (carrying and borrowing at 100), change
// and the review stories.
module.exports = (L) => {
  const { it, mine, wio, q, mcq, match, note, cant, words } = L;
  const tk = (big, small = 0) => [big, small]; // an amount in টাকা and পয়সা
  const money = (terms, ops, extra = {}) => ({ kind: "units", unit: "tk", terms, ops, ...extra });
  // an amount in words, as p.109 কাজ ৩ writes it ("পাঁচ শত টাকা বাষট্টি পয়সা"), and in digits
  const amountPair = (taka, paisa) => [`${words(taka)} টাকা ${words(paisa)} পয়সা`, `${taka} টাকা ${paisa} পয়সা`];

  // ── p.108–109: পয়সা and টাকা (the printed boxes) ──
  mcq({
    page: 108, slug: "taka-paisa", title: "টাকা ও পয়সার সম্পর্ক",
    questions: [
      q({ prompt: "50 পয়সা + 50 পয়সা = কত?", options: ["1 টাকা", "100 টাকা", "50 টাকা", "5 টাকা"], answer: "1 টাকা", why: "100 পয়সা = 1 টাকা। 50 পয়সা + 50 পয়সা = 100 পয়সা = 1 টাকা।" }),
      q({ prompt: "100 পয়সা ও কোনটি সমমূল্যের?", options: ["1 টাকা", "10 টাকা", "100 টাকা", "1000 টাকা"], answer: "1 টাকা", why: "100 পয়সা ও 1 টাকা সমমূল্যের।" }),
      q({ prompt: "বিশ টাকা পঞ্চাশ পয়সা অঙ্কে কীভাবে লিখতে হয়?", options: ["20 টাকা 50 পয়সা", "50 টাকা 20 পয়সা", "20 টাকা 5 পয়সা", "2 টাকা 50 পয়সা"], answer: "20 টাকা 50 পয়সা", why: "বিশ টাকা = 20 টাকা, পঞ্চাশ পয়সা = 50 পয়সা। তাই লিখি 20 টাকা 50 পয়সা।" }),
      q({ prompt: "125 পয়সা = কত?", options: ["1 টাকা 25 পয়সা", "12 টাকা 5 পয়সা", "125 টাকা", "1 টাকা 52 পয়সা"], answer: "1 টাকা 25 পয়সা", why: "100 পয়সা = 1 টাকা, তাই 125 পয়সা = 100 পয়সা + 25 পয়সা = 1 টাকা 25 পয়সা।" }),
      q({ prompt: "5 পয়সা + 10 পয়সা = কত?", options: ["15 পয়সা", "15 টাকা", "1 টাকা 5 পয়সা", "50 পয়সা"], answer: "15 পয়সা", why: "পয়সার সঙ্গে পয়সা যোগ করি: 5 পয়সা + 10 পয়সা = 15 পয়সা।" }),
      q({ prompt: "520 টাকা ও 125 পয়সা একত্রে কত?", options: ["521 টাকা 25 পয়সা", "520 টাকা 25 পয়সা", "645 টাকা", "521 টাকা 52 পয়সা"], answer: "521 টাকা 25 পয়সা", why: "125 পয়সা = 1 টাকা 25 পয়সা। তাই (520 + 1) টাকা 25 পয়সা = 521 টাকা 25 পয়সা।" }),
      q({ prompt: "10 টাকার 2টি নোট ও কত টাকা সমমূল্যের?", options: ["20 টাকা", "10 টাকা", "12 টাকা", "200 টাকা"], answer: "20 টাকা", why: "10 টাকা + 10 টাকা = 20 টাকা।" }),
      q({ prompt: "500 টাকার 2টি নোট ও কত টাকা সমমূল্যের?", options: ["1000 টাকা", "500 টাকা", "502 টাকা", "250 টাকা"], answer: "1000 টাকা", why: "500 টাকা + 500 টাকা = 1000 টাকা।" }),
      q({ prompt: "110 পয়সা = কত?", options: ["1 টাকা 10 পয়সা", "11 টাকা", "110 টাকা", "1 টাকা 1 পয়সা"], answer: "1 টাকা 10 পয়সা", why: "100 পয়সা = 1 টাকা, তাই 110 পয়সা = 1 টাকা 10 পয়সা।" }),
      q({ prompt: "148 পয়সা = কত?", options: ["1 টাকা 48 পয়সা", "14 টাকা 8 পয়সা", "148 টাকা", "1 টাকা 84 পয়সা"], answer: "1 টাকা 48 পয়সা", why: "148 পয়সা = 100 পয়সা + 48 পয়সা = 1 টাকা 48 পয়সা।" }),
    ],
    src: "p.108 box “50 পয়সা + 50 পয়সা = 1 টাকা”, the boy (“100 পয়সা ও 1 টাকা সমমূল্যের”), the girl (“বিশ টাকা পঞ্চাশ পয়সা … 20 টাকা 50 পয়সা”), the parrot (“5 পয়সা + 10 পয়সা = 15 পয়সা”); p.109 “125 পয়সা = 1 টাকা 25 পয়সা”, “(520+1) টাকা 25 পয়সা”; p.110 মূল প্রশ্ন (“10 টাকার 2টি নোট ও 20 টাকা সমমূল্যের”, “500 টাকার 2টি নোট ও 1000 টাকা সমমূল্যের”); p.111 কাজ ১ (“110 … মোট 1 টাকা 10 পয়সা”); p.113 কাজ ২ (“148 পয়সা = 1 টাকা 48 পয়সা”)",
  });
  note("p.108 has no exercise of its own: the multiple choice “টাকা ও পয়সার সম্পর্ক” (published) asks the chapter's printed facts: p.108 (50 + 50 পয়সা = 1 টাকা, 100 পয়সা ও 1 টাকা সমমূল্যের, বিশ টাকা পঞ্চাশ পয়সা = 20 টাকা 50 পয়সা, 5 + 10 পয়সা = 15 পয়সা), p.109 (125 পয়সা = 1 টাকা 25 পয়সা, 520 টাকা ও 125 পয়সা = 521 টাকা 25 পয়সা), p.110 (two 10 notes = 20 টাকা, two 500 notes = 1000 টাকা), p.111 (110 পয়সা = 1 টাকা 10 পয়সা) and p.113 (148 পয়সা = 1 টাকা 48 পয়সা). Questions 5–10 were added on 3 Nov (the 10-question rule); the wrong options are mine.");

  wio({
    page: 109, slug: "count-paisa", type: "taka_shop", title: "ছবি দেখে অঙ্কে লিখি",
    items: [
      it({ kind: "money", ask: "count", notes: [100, 50, 5, 0.05, 0.1] }, tk(155, 15)),
      it({ kind: "money", ask: "count", notes: [500, 20, 0.5, 0.5, 0.25] }, tk(521, 25)),
      it({ kind: "money", ask: "count", notes: [500, 0.5, 0.25] }, tk(500, 75)),
      it({ kind: "money", ask: "count", notes: [100, 100, 0.25, 0.05] }, tk(200, 30)),
      it({ kind: "money", ask: "count", notes: [500, 10, 0.1, 0.5] }, tk(510, 60)),
      it({ kind: "money", ask: "count", notes: [200, 5, 0.5, 0.25] }, tk(205, 75)),
    ],
    fresh: { skill: "money", more: true },
    src: "p.108 the parrot's notes and coins (printed 155 টাকা 15 পয়সা), p.109 the demo box (printed 521 টাকা 25 পয়সা), p.109 কাজ ২ rows 1–4 (row 1 printed)",
  });

  match({
    page: 109, slug: "words-to-digits", title: "পড়ি এবং অঙ্কে লিখি",
    pairs: [
      ["বারো টাকা পঁয়তাল্লিশ পয়সা", "12 টাকা 45 পয়সা"],
      ["পাঁচ শত টাকা বাষট্টি পয়সা", "500 টাকা 62 পয়সা"],
      ["সাত শত পঁচিশ টাকা পঁচাত্তর পয়সা", "725 টাকা 75 পয়সা"],
      ["এক হাজার দুই শত টাকা পঞ্চাশ পয়সা", "1200 টাকা 50 পয়সা"],
      ["নয় শত পঞ্চান্ন টাকা ত্রিশ পয়সা", "955 টাকা 30 পয়সা"],
      ["তিন হাজার আট শত পঁচিশ টাকা বত্রিশ পয়সা", "3825 টাকা 32 পয়সা"],
      ["বিশ টাকা পঞ্চাশ পয়সা", "20 টাকা 50 পয়সা"],
      amountPair(155, 15),
      amountPair(521, 25),
      amountPair(200, 30),
      amountPair(510, 60),
      amountPair(205, 75),
    ],
    src: "p.109 কাজ ৩ ক)–চ) (ক printed); p.108 the girl's “বিশ টাকা পঞ্চাশ পয়সা … 20 টাকা 50 পয়সা”; the amounts of p.108 (155 টাকা 15 পয়সা), p.109's demo (521 টাকা 25 পয়সা) and p.109 কাজ ২ rows 2–4, in words",
  });
  note("p.109 “পড়ি এবং অঙ্কে লিখি” (12 pairs, two rounds of 6): কাজ ৩'s six, the girl's p.108 “বিশ টাকা পঞ্চাশ পয়সা”, and five more amounts the chapter prints in digits (p.108, p.109's demo, p.109 কাজ ২ rows 2–4) written in words the way কাজ ৩ writes them (“শত” a word of its own).");

  // ── p.110: notes into one amount, and changing a note ──
  wio({
    page: 110, slug: "exchange", type: "taka_shop", title: "মুদ্রা বিনিময় করি",
    items: [
      it({ kind: "money", ask: "count", notes: [10, 10, 500, 500] }, 1020),
      it({ kind: "money", ask: "count", notes: [20, 20, 20, 20, 20] }, 100),
      it({ kind: "money", ask: "pay", price: 200, wallet: [100, 100, 50, 50, 50, 50] }, 200),
      it({ kind: "money", ask: "count", notes: [5, 5] }, 10),
      it({ kind: "money", ask: "pay", price: 10, wallet: [5, 5, 2, 2, 2, 2, 2] }, 10),
    ],
    fresh: { skill: "money" },
    src: "p.110 মূল প্রশ্ন (two 10 and two 500 notes, printed 1020 টাকা), অনুশীলন ১ (1)–(4)",
    notes: ["অনুশীলন ১ (2) ও (4): 200 টাকা ও 10 টাকার নোটের বদলে ছোটো নোট থেকে ঠিক সেই টাকা বেছে নিতে হয়।"],
  });
  note("p.110 অনুশীলন ১ (2), (4) (“one 200-taka note → □”, “one 10-taka note → □”) are open in the book; the game asks the child to pay 200 টাকা from 2 × 100 + 4 × 50 and 10 টাকা from 2 × 5 + 5 × 2 (wallets mine: the survey's examples), so the note itself is never there.");

  // ── p.111 অনুশীলন ২: notes × count, and the missing count ──
  const notesItem = (text, sum, unit, want) => it({ kind: "word", text, sum, unit }, want);
  wio({
    page: 111, slug: "notes-solve", title: "সমাধান করি: নোটে কত টাকা",
    items: [
      notesItem("5 টাকার 20টি নোট = □ টাকা", "5 × 20", "টাকা", 100),
      notesItem("50 টাকার 4টি নোট = □ টাকা", "50 × 4", "টাকা", 200),
      notesItem("20 টাকার 10টি নোট = □ টাকা", "20 × 10", "টাকা", 200),
      notesItem("10 টাকার 5টি নোট = □ টাকা", "10 × 5", "টাকা", 50),
      notesItem("1 টাকার 100টি নোট = □ টাকা", "1 × 100", "টাকা", 100),
      notesItem("2 টাকার 50টি নোট = □ টাকা", "2 × 50", "টাকা", 100),
      notesItem("100 টাকার 5টি নোট = □ টাকা", "100 × 5", "টাকা", 500),
      notesItem("500 টাকার 2টি নোট = □ টাকা", "500 × 2", "টাকা", 1000),
      notesItem("10 টাকার □টি নোট = 200 টাকা", "200 ÷ 10", "টি নোট", 20),
      notesItem("100 টাকার □টি নোট = 1000 টাকা", "1000 ÷ 100", "টি নোট", 10),
      notesItem("5 টাকার □টি নোট = 100 টাকা", "100 ÷ 5", "টি নোট", 20),
      notesItem("20 টাকার □টি নোট = 200 টাকা", "200 ÷ 20", "টি নোট", 10),
    ],
    src: "p.111 অনুশীলন ২ (1)–(12)",
  });
  note("p.111 অনুশীলন ২ (up to 100 notes, too many for the Taka Shop) is played as twelve one-line stories, each sentence as printed: the child picks the sign (× for (1)–(8), ÷ for the missing count in (9)–(12)), then works it out.");

  // ── p.111 কাজ ১, p.112 মূল প্রশ্ন, p.113 কাজ ১: counting পয়সা, paying exactly from a box ──
  wio({
    page: 112, slug: "pick-exact", type: "taka_shop", title: "নোট ও মুদ্রা বেছে ঠিক টাকা দিই",
    items: [
      it({ kind: "money", ask: "count", notes: [0.1, 0.05, 0.05, 0.25, 0.25] }, tk(0, 70)),
      it({ kind: "money", ask: "count", notes: [0.1, 0.25, 0.25, 0.5] }, tk(1, 10)),
      it({ kind: "money", ask: "pay", price: 19.25, wallet: [10, 5, 5, 5, 2, 2, 0.1, 0.1, 0.1, 0.05] }, 1925),
      it({ kind: "money", ask: "pay", price: 52.75, wallet: [20, 20, 10, 10, 10, 1, 1, 0.5, 0.5, 0.25, 0.25, 0.25] }, 5275),
      it({ kind: "money", ask: "pay", price: 1151.7, wallet: [500, 500, 500, 100, 100, 100, 50, 50, 50, 0.1, 0.1, 0.1, 0.25, 0.25, 0.25, 0.5, 0.5] }, 115170),
      it({ kind: "money", ask: "pay", price: 65.75, wallet: [20, 20, 20, 10, 10, 5, 5, 2, 2, 2, 2, 2, 0.25, 0.25, 0.25, 0.1, 0.1, 0.05, 0.05, 0.05] }, 6575),
    ],
    fresh: { skill: "money", more: true },
    src: "p.111 কাজ ১ (a), (b) (printed মোট 70 পয়সা, 1 টাকা 10 পয়সা), p.112 মূল প্রশ্ন: the three boxes (19 টাকা 25 পয়সা printed, 52 টাকা 75 পয়সা, 1151 টাকা 70 পয়সা), p.113 কাজ ১ (65 টাকা 75 পয়সা)",
    notes: ["কাজ ১ (পৃষ্ঠা 113): বইয়ে কতভাবে দাম মেটানো যায় তা জানতে চাওয়া হয়েছে; খেলায় যেকোনো একভাবে ঠিক দাম দিলেই হবে।"],
  });
  note("p.112 মূল প্রশ্ন: each box is a wallet of exactly the notes and coins drawn (box 3 has no 1-taka note: the extra 1 টাকা must come from 50 + 50 পয়সা). p.113 কাজ ১ (pay 65 টাকা 75 পয়সা with 20, 10, 5, 2 টাকা and 5, 10, 25 পয়সা, “কতভাবে”): the wallet is mine (3 × 20, 2 × 10, 2 × 5, 5 × 2 টাকা, 3 × 25, 2 × 10, 3 × 5 পয়সা: 20 pieces, the most a wallet holds), so the printed way and several others fit; the game takes one way, not a list.");

  // ── p.112 অনুশীলন ১: পয়সা and টাকা added in a row ──
  wio({
    page: 112, slug: "add-coins", type: "units_amounts", title: "হিসাব করি: টাকা ও পয়সা",
    items: [
      it(money([tk(0, 5), tk(0, 5), tk(0, 10), tk(0, 25), tk(3)], ["+", "+", "+", "+"]), tk(3, 45)),
      it(money([tk(0, 1), tk(0, 10), tk(0, 50), tk(2), tk(5)], ["+", "+", "+", "+"]), tk(7, 61)),
      it(money([tk(20), tk(0, 25), tk(0, 50), tk(30)], ["+", "+", "+"]), tk(50, 75)),
      it(money([tk(0, 5), tk(0, 25), tk(10), tk(2), tk(0, 10)], ["+", "+", "+", "+"]), tk(12, 40)),
    ],
    fresh: { skill: "units", unit: "money", layout: "row", count: 6 },
    src: "p.112 অনুশীলন ১ (1)–(4) (the book has four), then 6 fresh",
  });

  // ── p.113: adding টাকা পয়সা in columns ──
  wio({
    page: 113, slug: "add-taka-paisa", type: "units_amounts", title: "টাকা ও পয়সা যোগ করি",
    items: [
      it(money([tk(150, 65), tk(67, 83)], ["+"], { layout: "column" }), tk(218, 48)),
      it(money([tk(35, 55), tk(28, 34)], ["+"], { layout: "column" }), tk(63, 89)),
      it(money([tk(77, 49), tk(42, 85)], ["+"], { layout: "column" }), tk(120, 34)),
      it(money([tk(259, 75), tk(137, 65)], ["+"], { layout: "column" }), tk(397, 40)),
      it(money([tk(2155, 35), tk(785, 90)], ["+"], { layout: "column" }), tk(2941, 25)),
      it(money([tk(4740, 55), tk(389, 65)], ["+"], { layout: "column" }), tk(5130, 20)),
    ],
    fresh: { skill: "units", unit: "money", layout: "column", digits: 3 },
    src: "p.113 কাজ ২ (printed 218 টাকা 48 পয়সা), অনুশীলন ২ (1)–(5)",
  });

  // ── p.114: taking away টাকা পয়সা in columns ──
  wio({
    page: 114, slug: "sub-taka-paisa", type: "units_amounts", title: "টাকা ও পয়সা বিয়োগ করি",
    items: [
      it(money([tk(225, 25), tk(105, 75)], ["−"], { layout: "column", text: "রাফির কাছে 225 টাকা 25 পয়সা আছে। সে 105 টাকা 75 পয়সা দামের একটি বল কিনল। তার কাছে কত টাকা অবশিষ্ট থাকল?" }), tk(119, 50)),
      it(money([tk(95, 60), tk(42, 20)], ["−"], { layout: "column" }), tk(53, 40)),
      it(money([tk(360, 80), tk(215, 35)], ["−"], { layout: "column" }), tk(145, 45)),
      it(money([tk(755, 45), tk(345, 20)], ["−"], { layout: "column" }), tk(410, 25)),
      it(money([tk(475, 15), tk(99, 75)], ["−"], { layout: "column" }), tk(375, 40)),
      it(money([tk(80), tk(37, 50)], ["−"], { layout: "column" }), tk(42, 50)),
      it(money([tk(824, 45), tk(307, 75)], ["−"], { layout: "column" }), tk(516, 70)),
      it(money([tk(900), tk(279, 55)], ["−"], { layout: "column" }), tk(620, 45)),
    ],
    fresh: { skill: "units", unit: "money", layout: "column", digits: 3 },
    src: "p.114 কাজ ৩ (the story, printed 119 টাকা 50 পয়সা), অনুশীলন ৩ (1)–(7)",
  });
  note("p.113 অনুশীলন ২ and p.114 অনুশীলন ৩ are played in columns, the way the page's worked example (কাজ ২, কাজ ৩) writes them. p.114 কাজ ৩ asks “অবশিষ্ট” and the book answers “ফেরত পাবে”: the story keeps the printed question.");

  // ── p.115 কাজ ৪: the price list ──
  wio({
    page: 115, slug: "shop-list", type: "units_amounts", title: "নিজের ইচ্ছেমতো জিনিস কিনি",
    items: [
      it(money([tk(145), tk(325, 50)], ["+"], { layout: "column", text: "রং পেনসিলের দাম 145 টাকা এবং স্কুলব্যাগের দাম 325 টাকা 50 পয়সা। রং পেনসিল ও স্কুলব্যাগ কিনলে খরচ কত হবে?" }), tk(470, 50)),
      mine(money([tk(495, 50), tk(525)], ["+"], { layout: "column", text: "জুতার দাম 495 টাকা 50 পয়সা এবং ঘড়ির দাম 525 টাকা। জুতা ও ঘড়ি কিনলে খরচ কত হবে?" }), "p.115 কাজ ৪ (2) “□ ও [ঘড়ি] কিনলে খরচ হবে”: the child picks the item; the game fixes জুতা (495 টাকা 50 পয়সা)"),
      mine(money([tk(325, 50), tk(495, 50)], ["+"], { layout: "column", text: "স্কুলব্যাগের দাম 325 টাকা 50 পয়সা এবং জুতার দাম 495 টাকা 50 পয়সা। স্কুলব্যাগ ও জুতা কিনলে খরচ কত হবে?" }), "p.115 কাজ ৪ (3) “□ ও □ কিনলে খরচ হবে”: the child picks both; the game fixes স্কুলব্যাগ and জুতা (50 + 50 পয়সা carry 1 টাকা)"),
      it(money([tk(250), tk(179)], ["−"], { text: "ফুটবলের দাম 250 টাকা এবং ক্রিকেট ব্যাটের দাম 179 টাকা। ফুটবল ও ব্যাটের মধ্যে কোনটির দাম বেশি? কত বেশি?" }), tk(71, 0)),
      it(money([tk(430, 50), tk(495, 50)], ["+"], { layout: "column", text: "শার্টের দাম 430 টাকা 50 পয়সা এবং জুতার দাম 495 টাকা 50 পয়সা। শার্ট ও জুতা কিনলে খরচ কত হবে?" }), tk(926, 0)),
      it(money([tk(460), tk(325, 50)], ["+"], { layout: "column", text: "খেলনা গাড়ির দাম 460 টাকা এবং স্কুলব্যাগের দাম 325 টাকা 50 পয়সা। খেলনা গাড়ি ও স্কুলব্যাগ কিনলে খরচ কত হবে?" }), tk(785, 50)),
      it(money([tk(250), tk(430, 50)], ["+"], { layout: "column", text: "টিফিন বক্সের দাম 250 টাকা এবং শার্টের দাম 430 টাকা 50 পয়সা। টিফিন বক্স ও শার্ট কিনলে খরচ কত হবে?" }), tk(680, 50)),
      it(money([tk(850), tk(495, 50)], ["−"], { layout: "column", text: "সাইকেলের দাম 850 টাকা এবং জুতার দাম 495 টাকা 50 পয়সা। সাইকেল ও জুতার মধ্যে কোনটির দাম বেশি? কত বেশি?" }), tk(354, 50)),
      it(money([tk(525), tk(430, 50)], ["−"], { layout: "column", text: "ঘড়ির দাম 525 টাকা এবং শার্টের দাম 430 টাকা 50 পয়সা। ঘড়ি ও শার্টের মধ্যে কোনটির দাম বেশি? কত বেশি?" }), tk(94, 50)),
      it(money([tk(430, 50), tk(325, 50)], ["−"], { layout: "column", text: "শার্টের দাম 430 টাকা 50 পয়সা এবং স্কুলব্যাগের দাম 325 টাকা 50 পয়সা। শার্ট ও স্কুলব্যাগের মধ্যে কোনটির দাম বেশি? কত বেশি?" }), tk(105, 0)),
    ],
    src: "p.115 কাজ ৪ (1)–(4) with the page's price list, then six more pairs from the same list (3 costs, 3 “কত বেশি”)",
    notes: ["“কোনটির দাম বেশি? কত বেশি?”: খেলায় শিশু শুধু “কত বেশি” লেখে। বেশি দাম: ফুটবল, সাইকেল, ঘড়ি, শার্ট।"],
  });
  note("p.115 কাজ ৪: the prices are pictures in the book, so each story names the two prices from the list, then asks the printed question. (2) and (3) are the child's own choice in the book; the game fixes জুতা + ঘড়ি and স্কুলব্যাগ + জুতা (marked mine). (4) asks only “কত বেশি” (71 টাকা); the guide note says which is dearer. Items 5–10 (added 3 Nov, the 10-question rule) are more pairs from the same price list, worked out from its prices: three costs (শার্ট + জুতা, খেলনা গাড়ি + স্কুলব্যাগ, টিফিন বক্স + শার্ট) and three “কত বেশি” (সাইকেল − জুতা, ঘড়ি − শার্ট, শার্ট − স্কুলব্যাগ). The things' Bangla names (শার্ট, জুতা, খেলনা গাড়ি, টিফিন বক্স, সাইকেল, ঘড়ি) are mine: the book draws them; it prints only রং পেনসিল, স্কুলব্যাগ, ফুটবল and ব্যাট.");

  // ── p.116 নিজে করি ২: the review sums ──
  wio({
    page: 116, slug: "review-sums", type: "units_amounts", title: "নিজে করি: নিচের হিসাবগুলো করি",
    items: [
      it(money([tk(45, 75), tk(35, 80)], ["+"]), tk(81, 55)),
      it(money([tk(37, 20), tk(21, 70)], ["−"]), tk(15, 50)),
      it(money([tk(69, 35), tk(37, 77)], ["+"], { layout: "column" }), tk(107, 12)),
      it(money([tk(89, 42), tk(45, 89)], ["+"], { layout: "column" }), tk(135, 31)),
      it(money([tk(78, 50), tk(42, 75)], ["−"], { layout: "column" }), tk(35, 75)),
      it(money([tk(200, 20), tk(10, 40)], ["−"], { layout: "column" }), tk(189, 80)),
    ],
    fresh: { skill: "units", unit: "money", layout: "column", digits: 3 },
    src: "p.116 নিজে করি ২ ক)–চ) (ক, খ in a row; গ–চ in columns, as printed)",
  });

  // ── p.116–117: counting a box, and change from a note (the Taka Shop) ──
  wio({
    page: 116, slug: "count-change", type: "taka_shop", title: "নিজে করি: টাকা গুনি, ফেরত দিই",
    items: [
      it({ kind: "money", ask: "count", notes: [0.05, 0.1, 0.1, 0.25, 50, 10] }, tk(60, 50)),
      it({ kind: "money", ask: "change", items: [{ name: "খেলনা", emoji: "🧸", price: 78.25 }], paid: 100 }, tk(21, 75)),
      it({ kind: "money", ask: "change", items: [{ name: "বিস্কুটের প্যাকেট", emoji: "🍪", price: 35.75 }], paid: 50 }, tk(14, 25)),
      it({ kind: "money", ask: "change", items: [{ name: "চানাচুরের প্যাকেট", emoji: "🥜", price: 45.5 }], paid: 100 }, tk(54, 50)),
    ],
    fresh: { skill: "money", more: true, count: 6 },
    src: "p.116 নিজে করি ১ box 2, নিজে করি ৪ (জুবায়ের: 78 টাকা 25 পয়সা, 100 টাকা), p.117 নিজে করি ৮ (তামান্না: 35 টাকা 75 পয়সা, 50 টাকা), নিজে করি ১৩ (রতন: 45 টাকা 50 পয়সা, 100 টাকা); then 6 fresh (পয়সা rounds among them)",
  });
  note("p.116 নিজে করি ৪ and p.117 নিজে করি ৮, ১৩ (“দোকানদার … কত টাকা ফেরত দেবে?”) are played in the Taka Shop's change round: the thing bought (খেলনা, বিস্কুটের প্যাকেট, চানাচুরের প্যাকেট) at its price, the note given, the change to give (then 6 fresh rounds). All the p.116–117 stories, these three too, are read as printed in “নিজে করি: টাকা-পয়সার গল্প”.");
  cant("p.116 নিজে করি ১ box 1: two large round coins the survey reads as 1 পয়সা (?) (the answer 1 টাকা 22 পয়সা depends on it); the Taka Shop has no 1-paisa coin (5, 10, 25, 50 পয়সা), so the box is left out. Box 2 is played.");

  // ── p.116–117: the stories ──
  wio({
    page: 117, slug: "stories", type: "units_amounts", title: "নিজে করি: টাকা-পয়সার গল্প",
    items: [
      it(money([tk(65, 75), tk(82, 75)], ["+"], { text: "উষার 65 টাকা 75 পয়সা ছিল। তার মা তাকে খাতা কেনার জন্য 82 টাকা 75 পয়সা দিলেন। এখন উষার কত টাকা হলো?" }), tk(148, 50)),
      it(money([tk(100), tk(78, 25)], ["−"], { text: "জুবায়ের 78 টাকা 25 পয়সা দিয়ে একটি খেলনা কিনল। সে দোকানদারকে 100 টাকা দিলে দোকানদার তাকে কত টাকা ফেরত দেবে?" }), tk(21, 75)),
      it(money([tk(200), tk(80), tk(25, 75)], ["−", "−"], { text: "দুইটি খাতার দাম 80 টাকা এবং একটি কলমের দাম 25 টাকা 75 পয়সা। আরিশা দোকানদারকে এই জিনিসগুলো কেনার জন্য 200 টাকার একটি নোট দিলো। দোকানদার আরিশাকে কত টাকা ফেরত দেবেন?" }), tk(94, 25)),
      it(money([tk(85, 75), tk(45, 55)], ["+"], { text: "শিমুল 85 টাকা 75 পয়সার চাল এবং 45 টাকা 55 পয়সার সবজি কেনে। সে মোট কত টাকা খরচ করে?" }), tk(131, 30)),
      it(money([tk(135, 25), tk(65, 75)], ["+"], { text: "মিতুর 135 টাকা 25 পয়সা ছিল। তার বাবা তাকে 65 টাকা 75 পয়সা দিলেন। তার কত টাকা হলো?" }), tk(201, 0)),
      it(money([tk(50), tk(35, 75)], ["−"], { text: "তামান্না 35 টাকা 75 পয়সা দিয়ে একটি বিস্কুটের প্যাকেট কিনল। সে দোকানদারকে 50 টাকার নোট দিলো। দোকানদার তামান্নাকে কত টাকা ফেরত দিল?" }), tk(14, 25)),
      it(money([tk(300), tk(120, 95)], ["−"], { text: "লিলি 300 টাকা নিয়ে দোকানে গেল। সে 120 টাকা 95 পয়সা দিয়ে একজোড়া জুতা কিনল। তার কাছে কত টাকা রইল?" }), tk(179, 5)),
      it(money([tk(542, 78), tk(300, 55)], ["+"], { text: "ডেভিডের 542 টাকা 78 পয়সা আছে। তার মামা তাকে আরও 300 টাকা 55 পয়সা দিলো। এখন ডেভিডের মোট কত টাকা হলো?" }), tk(843, 33)),
      it(money([tk(128, 50), tk(77, 25)], ["−"]), tk(51, 25)),
      it(money([tk(100), tk(69, 75)], ["−"], { text: "রিয়া 100 টাকা নিয়ে দোকানে গেল। সে 69 টাকা 75 পয়সা দিয়ে একটি বই কিনল। তার কাছে কত টাকা রইল?" }), tk(30, 25)),
      it(money([tk(100), tk(45, 50)], ["−"], { text: "রতন 45 টাকা 50 পয়সা দিয়ে একটি চানাচুরের প্যাকেট কিনল। সে দোকানদারকে 100 টাকার নোট দিলো। দোকানদার রতনকে কত টাকা ফেরত দিলো?" }), tk(54, 50)),
    ],
    src: "p.116 নিজে করি ৩, ৪, p.117 নিজে করি ৫–১০, ১১ (the sum only), ১২, ১৩: every story of the two pages, in the book's order",
  });
  note("p.117 নিজে করি ৫ (two steps; the survey's 94 টাকা 25 পয়সা) is played as 200 টাকা − 80 টাকা − 25 টাকা 75 পয়সা, worked left to right (the note, then each thing's price taken away); a story with two signs has no sign step.");
  cant("p.117 নিজে করি ১১: “গাণিতিক বাক্যটি দিয়ে একটি গল্প তৈরি করি” (making a story); the sum 128 টাকা 50 পয়সা − 77 টাকা 25 পয়সা is played without it.");
  cant("p.117 প্রকল্প (saving in a মাটির ব্যাংক) and p.107 মূল প্রশ্ন / কাজ ১ (naming the pictured coins; the coin ↔ note table, 3 printed pairs): the Taka Shop rounds show the পয়সা coins instead.");
};
