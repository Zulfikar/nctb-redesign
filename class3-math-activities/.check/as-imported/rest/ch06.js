// অধ্যায় ৬ · ভাগ (printed pp.63–77): sharing on plates (each gets / how many plates / left over), ÷ facts in a row,
// ÷ by the times table, ten-bundle division, ভাগশেষ in a row and in arrays (□ = □ × □ + □), stories, the নিজে করি MCQs.
module.exports = (L) => {
  const { it, wio, q, mcq, note, cant } = L;
  const div = (a, b, ans) => it({ kind: "sum", a, op: "÷", b, layout: "row" }, ans);
  const mul = (a, b, ans) => it({ kind: "sum", a, op: "×", b, layout: "row" }, ans);
  const share = (total, groups, emoji, ans) => it({ kind: "groups", total, groups, emoji }, ans);
  const plates = (total, each, emoji, ans) => it({ kind: "groups", ask: "plates", total, each, emoji }, ans);
  const story = (text, sum, unit, ans) => it({ kind: "word", text, sum, unit }, ans);
  const rem = (a, b, ans) => it({ kind: "divrem", a, b, ask: "row" }, ans);

  // ── p.63–65, p.70 (ক): প্রত্যেকে কয়টি করে পাবে? ──
  wio({
    page: 64, slug: "share-equally", type: "equal_groups", title: "প্রত্যেকে কয়টি করে পাবে?",
    items: [
      share(12, 3, "🍪", 4), // p.63 কাজ ১: 12 biscuits, 3 children
      share(6, 3, "🍊", 2), // p.64 কাজ ২ (girl): 6 oranges, 3 people
      share(3, 3, "🍊", 1), // p.64 কাজ ২ (boy): 3 oranges
      share(18, 6, "🍫", 3), // p.64 কাজ ৩: 18 chocolates, 6 children
      share(20, 5, "🍌", 4), // p.65 মূল প্রশ্ন: 20 bananas, 5 children (printed: ৪টি করে)
      share(15, 3, "🍪", 5), // p.70 (ক): 15 biscuits, 3 children
    ],
    src: "p.63 কাজ ১ (12 ÷ 3), p.64 কাজ ২ (6 ÷ 3, 3 ÷ 3) and কাজ ৩ (18 ÷ 6), p.65 মূল প্রশ্ন (20 ÷ 5, printed 4), p.70 (ক) (15 ÷ 3)",
  });
  cant("p.64 কাজ ২ (the parrot): “থালায় কোনো কমলাই না থাকে” (0 ÷ 3 = 0): Make Equal Groups needs at least one thing to share.");
  cant("p.64 কাজ ৩ (girl) and p.70 মূল প্রশ্ন: “make a question like this” / “তোমার তৈরি গাণিতিক সমস্যা নিচের খালিঘরে লেখো” (free writing).");

  // ── p.66–68, p.70 (খ): কতজনকে দেওয়া যাবে? ──
  wio({
    page: 67, slug: "how-many-children", type: "equal_groups", title: "কতজনকে দেওয়া যাবে?",
    items: [
      plates(12, 3, "🍪", 4), // p.66 কাজ ১: 3 biscuits each (the rows 1, 2, 3, 4 children; p.67 prints 12 ÷ 3 = 4)
      plates(18, 6, "🍫", 3), // p.67 কাজ ২: 6 chocolates each
      plates(20, 5, "🍌", 4), // p.68 মূল প্রশ্ন: 5 bananas each (printed: ৪ জন শিশু)
      plates(15, 3, "🍪", 5), // p.70 (খ): 3 biscuits each
    ],
    src: "p.66 কাজ ১ (12, 3 each; p.67 prints 12 ÷ 3 = 4), p.67 কাজ ২ (18, 6 each), p.68 মূল প্রশ্ন (20, 5 each; printed 4), p.70 (খ) (15, 3 each)",
  });
  note("p.63–70, sharing on plates: the first two Make Equal Groups games (p.64 “প্রত্যেকে কয়টি করে পাবে?”, p.67 “কতজনকে দেওয়া যাবে?”) have no fresh problems: the groups skill's fresh mix also deals out leftovers, which the book teaches only on p.73. The leftover game (p.73) has them.");

  // ── p.65, p.68: one-step ÷ stories (too many things for the plates: 32–63) ──
  wio({
    page: 68, slug: "stories", title: "ভাগের গল্প",
    items: [
      story("যদি 48টি কাগজ 8 জন শিশুকে সমানভাবে ভাগ করে দেওয়া হয়, তবে প্রত্যেক শিশু কয়টি করে কাগজ পাবে?", "48 ÷ 8", "টি", 6),
      story("বাবার কাছে 63 টাকা আছে। তিনি এই টাকা তাঁর পরিবারের 7 জনকে সমানভাবে দিতে চান। প্রত্যেকে কত টাকা করে পাবে?", "63 ÷ 7", "টাকা", 9),
      story("1 হালি ডিমের দাম 48 টাকা হলে 1টি ডিমের দাম কত? [1 হালি = 4টি]", "48 ÷ 4", "টাকা", 12),
      story("আমরা কয়েকজন শিশুকে 32টি লিচু ভাগ করে দিলাম। প্রত্যেক শিশু 8টি করে লিচু পেল। কতজন শিশুকে লিচু দেওয়া হয়েছে?", "32 ÷ 8", "জন", 4),
      story("একটি বিদ্যালয়ে শিক্ষার্থীদের পুরস্কারের জন্য 45টি খাতা আছে। যদি প্রত্যেক শিক্ষার্থীকে 5টি করে খাতা দেওয়া হয়, তবে কতজন শিক্ষার্থী পুরস্কার পাবে?", "45 ÷ 5", "জন", 9),
    ],
    src: "p.65 অনুশীলন ১–৩, p.68 কাজ ১ (32 ÷ 8 = □ printed as the sentence) and কাজ ২",
  });
  note("p.65 অনুশীলন ১–৩ and p.68 কাজ ১–২ are stories with 32–63 things (Make Equal Groups shares at most 30), so they are Work It Out stories (the sign first, then the answer).");

  // ── p.65, p.68, p.69: ÷ by the times table (÷ ⇄ ×) ──
  wio({
    page: 69, slug: "by-the-table", title: "গুণের নামতা ব্যবহার করে ভাগ করি",
    items: [
      mul(3, 5, 15), mul(4, 5, 20), // p.65 মূল প্রশ্ন [৩], [৪]: 3 bananas each for 5 children
      it({ kind: "missing", text: "□ × 5 = 20" }, 4), div(20, 5, 4), // p.65 (and p.68): 20 ÷ 5 = □ ⇄ □ × 5 = 20 (printed: ৪টি করে, ৪ জন)
      mul(5, 3, 15), mul(5, 4, 20), // p.68 মূল প্রশ্ন [৩], [৪]: 5 bananas to each of 3, 4 children
      it({ kind: "missing", text: "2 × □ = 16" }, 8), div(16, 2, 8), // p.69 মূল প্রশ্ন (printed 2 × 8 = 16, 16 ÷ 2 = 8)
    ],
    src: "p.65 মূল প্রশ্ন [৩]–[৪] and 20 ÷ 5 = □ ⇄ □ × 5 = 20, p.68 মূল প্রশ্ন [৩]–[৪] (its 20 ÷ 5 ⇄ □ × 5 = 20 is p.65's, asked once), p.69 মূল প্রশ্ন (2 × □ = 16, 16 ÷ 2)",
  });

  // ── p.69: অনুশীলন ১–৩, ÷ facts ──
  wio({
    page: 69, slug: "divide-1", title: "ভাগ করি (১)",
    items: [div(3, 1, 3), div(6, 1, 6), div(12, 2, 6), div(2, 2, 1), div(18, 2, 9), div(20, 2, 10), div(9, 3, 3), div(12, 3, 4), div(6, 3, 2), div(3, 3, 1), div(21, 3, 7), div(27, 3, 9)],
    src: "p.69 অনুশীলন ১ (১)–(১২)",
  });
  wio({
    page: 69, slug: "divide-2", title: "ভাগ করি (২)",
    items: [div(16, 4, 4), div(20, 4, 5), div(40, 4, 10), div(32, 4, 8), div(15, 5, 3), div(30, 5, 6), div(45, 5, 9), div(10, 5, 2), div(18, 6, 3), div(6, 6, 1), div(42, 6, 7), div(54, 6, 9)],
    src: "p.69 অনুশীলন ২ (১)–(১২)",
  });
  wio({
    page: 69, slug: "divide-3", title: "ভাগ করি (৩)",
    items: [div(42, 7, 6), div(70, 7, 10), div(28, 7, 4), div(14, 7, 2), div(72, 8, 9), div(32, 8, 4), div(16, 8, 2), div(40, 8, 5), div(27, 9, 3), div(9, 9, 1), div(81, 9, 9), div(54, 9, 6)],
    src: "p.69 অনুশীলন ৩ (১)–(১২)",
  });
  note("Division facts (p.69 অনুশীলন ১–৩, p.71 কাজ ২, p.72 অনুশীলন ১, p.76 নিজে করি ৩) are row sums with ÷ and have no fresh problems: no fresh skill makes exact divisions (divrem always leaves a remainder, mul makes × facts).");

  // ── p.71: কাজ ৩, tick the right answer ──
  mcq({
    page: 71, slug: "tick", title: "সঠিক উত্তরটিতে টিক (✓) চিহ্ন দিই",
    questions: [
      q({ prompt: "10টি করে কাগজ নিয়ে তৈরি 8টি বান্ডেল আছে (মোট 80টি কাগজ)। বান্ডেলগুলো 4 জন শিশুকে সমানভাবে ভাগ করে দিলে প্রত্যেক শিশু কয়টি বান্ডেল পাবে?", options: ["2টি", "4টি", "8টি", "20টি"], answer: "2টি", num: 2, why: "8 ÷ 4 = 2। প্রত্যেকে 2টি বান্ডেল, অর্থাৎ 80 ÷ 4 = 20টি কাগজ পাবে।" }),
      q({ prompt: "12 থেকে 3 বিয়োগ করা যায় … বার", options: ["4", "2", "3"], book: "ক", num: 4, why: "12 − 3 = 9, 9 − 3 = 6, 6 − 3 = 3, 3 − 3 = 0: মোট 4 বার। তাই 12 ÷ 3 = 4" }),
      q({ prompt: "27 কে 9 দিয়ে ভাগ করলে ভাগফল …", options: ["3", "4", "5"], book: "ক", num: 3, why: "9 × 3 = 27, তাই 27 ÷ 9 = 3" }),
      q({ prompt: "10 বার 10 যোগ করলে পাওয়া যায় …", options: ["90", "100", "110"], book: "খ", num: 100, why: "10 বার 10 যোগ = 10 × 10 = 100" }),
    ],
    src: "p.71 মূল প্রশ্ন (the boy's step: 8 bundles ÷ 4 = 2, asked as a question) and কাজ ৩ (১)–(৩), the book's choices in its order",
  });
  note("p.71 multiple choice: কাজ ৩ has only three questions, so the মূল প্রশ্ন's own step (“প্রত্যেক শিশু ১০টি কাগজের কয়টি বান্ডেল পাবে … ৮ ÷ ৪”) is asked first, with my options (২টি, ৪টি, ৮টি, ২০টি). কাজ ৩'s choices are printed in a row (৪/২/৩), not lettered; they keep the book's order.");

  // ── p.71–72: tens and ones (ten-bundles) ──
  wio({
    page: 72, slug: "tens-and-ones", title: "দশক ও একক আলাদা করে ভাগ করি",
    items: [
      story("80টি রঙিন কাগজ আছে। যদি এই কাগজগুলো 4 জন শিশুকে সমানভাবে ভাগ করে দেওয়া হয়, তবে প্রত্যেকে কয়টি করে কাগজ পাবে?", "80 ÷ 4", "টি", 20),
      story("90টি কমলা আছে। যদি কমলাগুলো 3 জন শিশুর মধ্যে সমানভাবে ভাগ করে দেওয়া হয়, তাহলে প্রত্যেক শিশু কয়টি করে কমলা পাবে?", "90 ÷ 3", "টি", 30),
      div(60, 2, 30), div(50, 5, 10), div(60, 3, 20), div(80, 2, 40),
      // p.72 মূল প্রশ্ন: the boy's working, "৮০ ÷ ৪ = ২০", "৪ ÷ ৪ = ১", then 20 + 1: played as three steps
      story("84টি রঙিন কাগজ আছে। যদি এই কাগজগুলো 4 জন শিশুকে সমানভাবে ভাগ করে দেওয়া হয়, তবে প্রত্যেকে কয়টি করে কাগজ পাবে?", "80 ÷ 4 + 4 ÷ 4", "টি", 21),
      div(36, 3, 12), div(86, 2, 43), div(69, 3, 23), div(77, 7, 11),
    ],
    src: "p.71 মূল প্রশ্ন (80 ÷ 4), কাজ ১ (90 ÷ 3), কাজ ২ (১)–(৪); p.72 মূল প্রশ্ন (84 ÷ 4 split into 80 ÷ 4 and 4 ÷ 4) and অনুশীলন ১ (১)–(৪)",
  });
  note("p.72 মূল প্রশ্ন (84 ÷ 4): the story's sum is the boy's own split, 80 ÷ 4 + 4 ÷ 4, so the game plays it as ধাপ ১ 80 ÷ 4 = 20, ধাপ ২ 4 ÷ 4 = 1, ধাপ ৩ 20 + 1 = 21 (the book's “একক ও দশক স্থান আলাদাভাবে”). p.72 অনুশীলন ১ (36 ÷ 3 …) are plain row sums.");

  // ── p.73–74: sharing with a leftover ──
  wio({
    page: 73, slug: "leftover", type: "equal_groups", title: "সমানভাবে ভাগ করি, কয়টি অবশিষ্ট থাকে?",
    items: [
      share(14, 4, "🍊", [3, 2]), // p.73 মূল প্রশ্ন: 14 oranges, 4 friends (printed: 14 ÷ 4 = 3, অবশিষ্ট 2)
      plates(19, 3, "🍫", [6, 1]), // p.74 কাজ ১: 19 chocolates, 3 to each friend (the girl's 19 ÷ 3 = 6, অবশিষ্ট 1)
      share(9, 2, "🍎", [4, 1]), share(14, 3, "🍎", [4, 2]), share(26, 5, "🍎", [5, 1]), // p.74 কাজ ২ (১)–(৩) on plates
    ],
    fresh: { skill: "groups" },
    src: "p.73 মূল প্রশ্ন (14 ÷ 4 = 3, অবশিষ্ট 2 printed), p.74 কাজ ১ (19 chocolates, 3 each: 6, অবশিষ্ট 1) and কাজ ২ (১)–(৩) (9 ÷ 2, 14 ÷ 3, 26 ÷ 5) on plates",
  });
  note("p.74 কাজ ১: the boy's “১৯ ÷ ৩ = ৫, অবশিষ্ট ৪” is the book's wrong example (অবশিষ্ট must be less than ভাজক); the game asks the girl's answer, 6 friends and 1 left over. p.74 কাজ ২ (১)–(৩) are played twice: on plates (p.73 game) and as row sums with ভাগফল and ভাগশেষ (p.74 game).");

  // ── p.74: কাজ ২ and কাজ ৩, ভাগফল and ভাগশেষ ──
  wio({
    page: 74, slug: "remainder", title: "ভাগ করি: ভাগফল ও ভাগশেষ",
    items: [
      rem(9, 2, [4, 1]), rem(14, 3, [4, 2]), rem(26, 5, [5, 1]), rem(75, 9, [8, 3]),
      rem(67, 10, [6, 7]), rem(52, 7, [7, 3]), rem(71, 8, [8, 7]), rem(41, 6, [6, 5]),
      it({ kind: "divrem", a: 30, b: 4, text: "30 সেমি লম্বা একটি ফিতা আছে। ফিতাটিকে 4 সেমি করে কয়েকটি টুকরায় কেটে নেওয়া হলো। আমরা 4 সেমি দৈর্ঘ্যের কয়টি টুকরা পাব? ফিতার কতটুকু অবশিষ্ট থাকবে?", qUnit: "টুকরা", rUnit: "সেমি" }, [7, 2]),
    ],
    fresh: { skill: "divrem" },
    src: "p.74 কাজ ২ (১)–(৮) and কাজ ৩ (the ribbon: 7 টুকরা, 2 সেমি অবশিষ্ট)",
  });

  // ── p.75: কাজ ৪, the arrays (□ = □ × □ + □) ──
  wio({
    page: 75, slug: "arrays", title: "খালিঘর পূরণ করি: □ = □ × □ + □",
    items: [
      it({ kind: "divrem", a: 10, b: 4, ask: "array" }, [10, 4, 2, 2]), // blue circles 4, 4, 2 (printed: 10 = 4 × 2 + 2)
      it({ kind: "divrem", a: 16, b: 6, ask: "array" }, [16, 6, 2, 4]), // triangles 6, 6, 4 (16 and 6 printed)
      it({ kind: "divrem", a: 31, b: 8, ask: "array" }, [31, 8, 3, 7]), // stars 8, 8, 8, 7
      it({ kind: "divrem", a: 33, b: 7, ask: "array" }, [33, 7, 4, 5]), // hearts 7, 7, 7, 7, 5
      it({ kind: "divrem", a: 29, b: 6, ask: "array" }, [29, 6, 4, 5]), // diamonds 6, 6, 6, 6, 5
      it({ kind: "divrem", a: 31, b: 7, ask: "array" }, [31, 7, 4, 3]), // hexagons 7, 7, 7, 7, 3
    ],
    src: "p.75 কাজ ৪: the six pictures (the first, 10 = 4 × 2 + 2, is the printed example); rows as the survey counted them",
  });
  note("p.75 কাজ ৪: the arrays are drawn as dots (rows of the row size, the short row last), not as the book's circles, triangles, stars, hearts, diamonds and hexagons; the numbers are the survey's counts.");
  cant("p.76 নিজে করি ২: a bare “□ = □ × □ + □” for the child to fill freely (any a = b × c + d with d < b): the games check one answer only.");

  // ── p.76: নিজে করি ১, tick the right answer ──
  mcq({
    page: 76, slug: "tick", title: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দিই",
    questions: [
      q({ prompt: "26 ÷ 5 এর ক্ষেত্রে ভাগশেষ কত?", options: ["25", "1", "26", "5"], book: "খ", num: 1, why: "5 × 5 = 25, 26 − 25 = 1। তাই 26 ÷ 5 = 5, অবশিষ্ট 1" }),
      q({ prompt: "নিচের কোনটি সঠিক?", options: ["ভাগশেষ > ভাজক", "ভাগশেষ = ভাজক", "ভাগশেষ < ভাজক", "ভাজক < ভাগশেষ"], book: "গ", why: "ভাগের অবশিষ্ট ভাজক থেকে ছোটো হবে: ভাগশেষ < ভাজক" }),
      q({ prompt: "একটি ভাগ এভাবে লেখা: 7) 43 (6, 43 এর নিচে 42, দাগের নিচে 1। এই ভাগটিতে ভাজ্য কত?", options: ["1", "6", "7", "43"], book: "ঘ", num: 43, why: "যে সংখ্যাকে ভাগ করা হয় সেটি ভাজ্য: 43 ÷ 7 = 6, অবশিষ্ট 1। ভাজ্য 43" }),
      q({ prompt: "125 ÷ 5 = □, খালিঘরে কত হবে?", options: ["21", "25", "120", "130"], book: "খ", num: 25, why: "5 × 25 = 125, তাই 125 ÷ 5 = 25" }),
    ],
    src: "p.76 নিজে করি ১ (১)–(৪), the book's options in its ক–ঘ order",
    pictures: [{ item: "প্রশ্ন ৩", subject: "পৃষ্ঠা ৭৬: ৭) ৪৩ (৬ — ৪৩ এর নিচে ৪২, তার নিচে দাগ, দাগের নিচে ১" }],
  });
  note("p.76 নিজে করি ১ (৩) prints the bracket layout “৭) ৪৩ (৬ / ৪২ / ─ / ১”; the question says it in words (“একটি ভাগ এভাবে লেখা: ৭) ৪৩ (৬, ৪৩ এর নিচে ৪২, দাগের নিচে ১।”) and the guide asks for the picture. (২) prints “সঠিক ?” with a space; written “সঠিক?”.");

  // ── p.76: নিজে করি ৩, ÷ facts ──
  wio({
    page: 76, slug: "divide", title: "নিজে করি: ভাগ করি",
    items: [div(8, 2, 4), div(9, 3, 3), div(12, 2, 6), div(21, 3, 7), div(45, 5, 9), div(30, 6, 5), div(64, 8, 8), div(54, 9, 6), div(42, 7, 6), div(35, 5, 7), div(28, 4, 7), div(63, 7, 9)],
    src: "p.76 নিজে করি ৩ (১)–(১২)",
  });

  // ── p.76–77: নিজে করি ৪–১১, ১৩, ১৪, the stories ──
  wio({
    page: 77, slug: "stories", title: "নিজে করি: ভাগের গল্প",
    items: [
      story("8টি আম দুইজনকে সমানভাবে ভাগ করে দেওয়া হলে, প্রত্যেকে কয়টি করে আম পাবে?", "8 ÷ 2", "টি", 4),
      story("24টি লজেন্স 4 জনকে সমানভাবে ভাগ করে দেওয়া হলে, প্রত্যেকে কয়টি করে লজেন্স পাবে?", "24 ÷ 4", "টি", 6),
      story("27 টাকা 3 জনকে সমানভাবে ভাগ করে দেওয়া হলে, প্রত্যেকে কত টাকা করে পাবে?", "27 ÷ 3", "টাকা", 9),
      story("একটি বেঞ্চে 5 জন বসে। 45 জনের জন্য কয়টি বেঞ্চের প্রয়োজন হবে?", "45 ÷ 5", "টি", 9),
      story("নাফিদ 40 টাকা দিয়ে কিছু কোয়েল পাখির ডিম কিনল। যদি 1টি ডিমের দাম 5 টাকা হয়, তবে নাফিদ কয়টি ডিম কিনেছে?", "40 ÷ 5", "টি", 8),
      story("প্রতিটি দলে 8 জন করে শিক্ষার্থী নিয়ে দল গঠন করা হলো। যদি 72 জন শিক্ষার্থী থাকে, তবে কয়টি দল হবে?", "72 ÷ 8", "টি", 9),
      story("সাদিদ 54 পৃষ্ঠার একটি বই পড়ছে। যদি সে এক দিনে 6 পৃষ্ঠা পড়ে, এই বই পড়ে শেষ করতে তার কত দিন সময় লাগবে?", "54 ÷ 6", "দিন", 9),
      story("একটি প্যাকেটে 8টি বিস্কুট আছে। একজন বালিকা বিস্কুটের 2টি প্যাকেট কিনল। সে মোট কতগুলো বিস্কুট কিনল?", "8 × 2", "টি", 16),
      story("একটি শ্রেণিতে 45 জন শিক্ষার্থী আছে। প্রতি বেঞ্চে 3 জন করে শিক্ষার্থী বসতে পারে। তাদের বসার জন্য কয়টি বেঞ্চের প্রয়োজন?", "45 ÷ 3", "টি", 15),
      story("48টি পেয়ারা 6 জনের মধ্যে সমানভাবে বিতরণ করা হলো। প্রত্যেকে কয়টি করে পেয়ারা পেল?", "48 ÷ 6", "টি", 8),
    ],
    src: "p.76 নিজে করি ৪–৫, p.77 নিজে করি ৬–১১, ১৩, ১৪",
  });
  note("p.77 নিজে করি ১১ (8 biscuits a packet, 2 packets: 8 × 2 = 16) is a × story inside the ÷ chapter; the game asks for the sign first, so it stays a “which sign?” item among the ÷ stories.");

  // ── p.77: নিজে করি ১২, ভাগশেষ ──
  wio({
    page: 77, slug: "remainder", title: "নিজে করি: ভাগফল ও ভাগশেষ",
    items: [rem(8, 3, [2, 2]), rem(15, 2, [7, 1]), rem(37, 5, [7, 2]), rem(52, 7, [7, 3]), rem(23, 8, [2, 7]), rem(31, 4, [7, 3]), rem(73, 10, [7, 3]), rem(40, 9, [4, 4])],
    fresh: { skill: "divrem" },
    src: "p.77 নিজে করি ১২ (১)–(৮)",
  });
};
