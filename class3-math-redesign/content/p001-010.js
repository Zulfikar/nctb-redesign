// অধ্যায় ১ · সংখ্যা: printed pages 1–10 (PDF pages 7–16), every word as printed.
// গণনা করা, পড়া ও লেখা pp. 1–9 (4- and 5-digit numbers, অযুত, লক্ষ) · সংখ্যার তুলনা from p. 10.
// Own kinds (content/p001-010.parts.js): c3p001_base (base-ten blocks with thousand cubes), c3p001_sets (blocks with braces
// and labels), c3p001_cards (the coloured number cards), c3p001_tickets (pp. 3, 7), c3p001_pvlines (the স্থানীয় মান digit tree),
// c3p001_saybox, c3p001_nline, c3p001_balloons, c3p001_arrow, c3p001_box, c3p001_tag.
// Class 2 kinds reused: p011_tab (tables whose cells hold blocks or cards), p011_chat (smaller speech cards).
// Every count of blocks, cards and packets is drawn by code and checked against the book.
const say = (who, mood, text) => ({ say: who, mood, text });
const chat = (lines, size) => ({ kind: "p011_chat", lines, size });
const base = (seq, o = {}) => ({ kind: "c3p001_base", seq, ...o });
const PL4 = ["হাজার", "শতক", "দশক", "একক"], PL5 = ["অযুত", ...PL4], PL6 = ["লক্ষ", ...PL5];
// a place-value table of number cards, as the book draws it: the place names on top, the cards (each cell: a value and
// its columns of cards, bottom-aligned), and an empty row for the digits
const cardTab = (heads, cells, { tone = "blue", k = 0.8, h, write = true, cols, small, wh = 9 } = {}) => ({
  kind: "p011_tab", tone, cols, small,
  rows: [
    { type: "hd", cells: heads },
    { type: "pic", h, cells: cells.map(([v, c]) => (c && c.length ? [{ kind: "c3p001_cards", v, cols: c, k }] : "")) },
    ...(write ? [{ cells: heads.map(() => "…"), h: wh }] : []),
  ],
});
// the ten 1000-tickets of a box, as a grid of 2 × 5, "= ১০০০০", and the book's sentence beside it (pp. 3, 7)
const tenThousand = (text) => ({ row: [
  { table: { rows: Array.from({ length: 5 }, () => ["১০০০", "১০০০"]), tone: "green", width: 40 } },
  { text: "= ১০০০০", big: true },
  { text },
], w: [42, 24], gap: 3, align: "center" });

module.exports = {
  pages: [
    {
      page: 1,
      opener: { title: "সংখ্যা" },
      title: "গণনা করা, পড়া ও লেখা",
      dense: true,
      blocks: [
        { ask: "কতগুলো ব্লক আছে?" },
        // 11 flats (5 + 6), 2 rods, 1 one = 1121
        base("FFFFF/FFFFFF RR C", { s: 1.22 }),
        { row: [
          { kind: "p011_chat", lines: [say("boy", "think", "আমরা কীভাবে গণনা করব?")] },
          { kind: "p011_chat", size: "s", lines: [say("girl", "talk", "২য় শ্রেণিতে ব্লকের সাহায্যে আমরা দশ এবং শতের দল তৈরি করে ১০০০ পর্যন্ত গণনা করেছি। আমার মনে হয় একইভাবে আমরা ব্লকগুলো সহজেই গণনা করতে পারি। কিন্তু এটি সংখ্যায় কীভাবে লিখব?")] },
        ], w: [62], gap: 2 },
        { kind: "c3p001_sets", s: 1.02, gap: 6, items: [
          { seq: "FFFFF/FFFFFF", label: "১১টি ১০০" },
          { seq: "RR", label: "২টি ১০", tray: true },
          { seq: "C", label: "১টি ১", tray: true },
        ], cols: [82, 15, 15] },
        { kind: "p011_tab", tone: "blue", cols: ["44%", "34%", "22%"], small: true, rows: [
          { type: "pic", cells: [[{ kind: "c3p001_cards", v: "১০০", cols: [5, 5, 1], k: 0.62 }], [{ kind: "c3p001_cards", v: "১০", cols: [1, 1], k: 0.62 }], [{ kind: "c3p001_cards", v: "১", cols: [1], k: 0.62 }]] },
          { type: "hd", cells: ["শতক", "দশক", "একক"] },
          { type: "num", cells: ["১১", "২", "১"] },
        ] },
        chat([say("boy", "talk", "আমরা দ্বিতীয় শ্রেণিতে শিখেছি ১০টি ১০০ তে ১০০০ হয়।")], "s"),
        { text: "তাহলে এটি হলো এক হাজার একশত একুশ এবং আমরা লিখি **১১২১**", center: true },
      ],
    },
    {
      page: 2,
      dense: true,
      blocks: [{ kind: "c3p001_tight", body: [
        { ex: "১", mark: "kaj", text: "কতগুলো ব্লক আছে?", body: [
          { kind: "c3p001_sets", s: 1.26, cells: true, items: [ // 2 thousands, 3 hundreds, 5 tens, 4 ones = 2354
            { seq: "KK", label: "২টি ১০০০" },
            { seq: "L3", label: "৩টি ১০০", lg: 2.1 },
            { seq: "RRRRR", label: "৫টি ১০" },
            { seq: "C4", label: "৪টি ১", cg: 2.5 },
          ], cols: [48, 32, 28, 16] },
          cardTab(PL4, [["১০০০", [2]], ["১০০", [3]], ["১০", [4, 1]], ["১", [4]]], { k: 0.58, small: true, wh: 6.5 }),
          { text: "সংখ্যাটি হলো দুই হাজার তিন শত চুয়ান্ন এবং আমরা লিখি **২৩৫৪**", center: true },
        ] },
        { ex: "১", mark: "anu", text: "নিচের কোন বক্সে ৯২৫টি ব্লক রয়েছে?", body: [
          { row: [ // 9 flats, 2 rods, 5 ones (925) | 9 flats, 3 rods, 5 ones (935)
            { frame: [base("S9 RR C5", { s: 1.02, cg: 1.0 })], pad: 0.8 },
            { frame: [base("S9 RRR C5", { s: 1.02, cg: 1.0 })], pad: 0.8 },
          ], gap: 8, justify: "center", w: [62, 62] },
        ] },
        { ex: "২", mark: "anu", text: "গণনা করি ও সংখ্যায় লিখি", body: [ // 8 thousands, 4 hundreds, 4 tens, 8 ones = 8448
          cardTab(PL4, [["১০০০", [4, 4]], ["১০০", [4]], ["১০", [4]], ["১", [5, 3]]], { k: 0.58, small: true, wh: 6.5 }),
          "সংখ্যাটি হলো______________",
        ] },
        { ex: "৩", mark: "anu", text: "পড়ি ও কথায় লিখি", body: [{ sums: ["১২৩৮", "২৮১৫", "৩১১১", "৪৩৩৫", "৫১৫৩"], cols: 5, marks: true, size: 12.5 }] },
        { ex: "৪", mark: "anu", text: "অঙ্কে লিখি", body: [{ sums: ["এক হাজার এক শত পঁয়ত্রিশ", "তিন হাজার নয় শত উনআশি", "সাত হাজার আট শত উনসত্তর", "নয় হাজার এক শত এক"], cols: 2, marks: true, size: 12.5 }] },
      ] }],
    },
    {
      page: 3,
      spread: true,
      blocks: [
        { ask: "নিচের ছবিতে দেওয়া টিকিটগুলো ক্রিকেট ম্যাচের জন্য বিক্রি করা হবে।\n(১) বাক্সের ভেতর কতগুলো প্যাকেট আছে?\n(২) সর্বমোট কতটি টিকিট আছে?" },
        // 2 boxes of ten 1000-packets, 3 packets of 1000, 4 of 100, 2 of 10, 5 tickets = 23425
        { kind: "c3p001_tickets", rows: [[["box", 2], ["bundle", 3], ["h", 4], ["t", 2], ["one", 5]]], k: 1.22 },
        { row: [
          chat([say("boy", "think", "এতগুলো টিকিট কীভাবে গণনা করব?")], "s"),
          chat([say("girl", "talk", "আমার মনে হয় আমরা ১, ১০, ১০০, ১০০০ করে গণনা করতে পারি।")], "s"),
        ], w: [76], gap: 3 },
        tenThousand("উপরের ছবির প্রতিটি বড় বাক্সে ১০০০ এর ১০টি করে প্যাকেট আছে। অর্থাৎ, টিকিটের পরিমাণ দশ হাজার এবং একে লেখা হয় ১০০০০। ছবিতে এরকম ২টি বাক্স আছে। এই ২টি বাক্সে একত্রে ২০ হাজার টিকিট আছে।"),
        chat([say("boy", "talk", "ছবিতে আরও ৩ হাজার এবং ৪২৫টি টিকিট আছে।")], "s"),
        cardTab(PL5, [["১০০০০", [2]], ["১০০০", [3]], ["১০০", [4]], ["১০", [2]], ["১", [5]]], { k: 0.66 }),
        { text: "সংখ্যাটি হলো তেইশ হাজার চার শত পঁচিশ, এবং আমরা লিখি **২৩৪২৫**", center: true },
        { row: [{ note: "এক অযুত অর্থ হলো ১০ হাজার" }], justify: "center" },
      ],
    },
    {
      page: 4,
      spread: true,
      allow: ["৫৫০৩", "২২৭১৯"], // the numbers on the striped and the blue balloon: the OCR can't read them there; checked by eye
      blocks: [
        { ex: "১", mark: "anu", text: "কতগুলো হাজার আছে? সংখ্যাটি কত?", body: [
          { frame: [{ kind: "c3p001_cards", v: "১০০০", grid: [2, 5], k: 0.95, cgap: 9 }], tone: "green" }, // ten 1000s
          { row: [
            chat([say("boy", "talk", "কতগুলো ১০০০ আছে গণনা করি")], "s"),
            { kind: "c3p001_arrow", dir: "down" },
            "",
          ], w: [80, null, 80], gap: 0 },
          { kind: "c3p001_cards", v: "১০০০", grid: [5, 2], boxed: true, k: 0.95 },
          { text: "সংখ্যাটি হলো □ হাজার বা □ অযুত", center: true },
        ] },
        { ex: "১", mark: "kaj", text: "দাগ টেনে মিল করি", body: [
          { row: [
            { kind: "c3p001_balloons", w: 60, h: 97, knot: [28.6, 61.9],
              pic: { name: "p004-girl-balloons", x: 2.4, y: 44.2, w: 30.8, h: 53 },
              balloons: [ // [number, colour, x, y, rx, ry] in mm, as the book places them
                ["৬৩৭০২", "#B5DB72", 22.4, 12.4, 8.1, 9.3], ["৫১৩০৫", "#FFC424", 37.3, 10.1, 7.9, 9.6],
                ["৯৯৩০৫", "#EDA6CE", 42.3, 25.5, 7.4, 8.5], ["৫৫০৩", "#E8559B", 22.4, 29.3, 6.6, 8.1],
                ["৫৩০৫", "#F59C97", 31.6, 41.6, 7.7, 10], ["২২৭১৯", "#3AAAE0", 47, 40.6, 7.1, 7.8],
              ] },
            { col: [
              "(১) পাঁচ হাজার তিন শত পাঁচ", "(২) বাইশ হাজার সাত শত উনিশ", "(৩) তেষট্টি হাজার সাত শত দুই",
              "(৪) নিরানব্বই হাজার তিন শত পাঁচ", "(৫) একান্ন হাজার তিন শত পাঁচ", "(৬) পাঁচ হাজার পাঁচ শত তিন",
            ], gap: 7 },
          ], w: [64], gap: 14, justify: "flex-start" },
        ] },
      ],
    },
    {
      page: 5,
      spread: true,
      blocks: [
        { ex: "২", mark: "anu", text: "গণনা করে অঙ্কে ও কথায় লিখি", body: [
          { row: [
            { col: [ // one 10000, three 1000, four 100, five 10, five 1 = 13455, scattered as in the book
              { kind: "c3p001_cards", k: 0.9, h: 44, bw: 840, bh: 478, scatter: [
                ["১০০০০", 121, 84], ["১০০", 320, 97], ["১০০০", 505, 58], ["১০", 700, 57], ["১", 112, 169], ["১০০", 320, 205],
                ["১০০০", 542, 151], ["১০", 708, 153], ["১", 520, 240], ["১", 712, 243], ["১০০", 141, 293], ["১০", 327, 308],
                ["১০০", 543, 332], ["১০", 711, 333], ["১", 112, 405], ["১০০০", 304, 413], ["১০", 524, 425], ["১", 716, 419],
              ] },
              { gap: 2 },
              { kind: "c3p001_box", cap: "কার্ডগুলো সাজিয়ে রাখি", h: 40 },
              { gap: 2 },
              { kind: "c3p001_box", label: "অঙ্কে লিখি", h: 8.5 },
              { gap: 2 },
              { kind: "c3p001_box", label: "কথায় লিখি", h: 8.5 },
            ] },
            { col: [ // four each of 1000, 100, 10, 1 = 4444
              { kind: "c3p001_cards", k: 0.9, h: 44, bw: 840, bh: 478, scatter: [
                ["১", 99, 70], ["১০", 277, 56], ["১০", 472, 68], ["১০", 667, 56], ["১০০০", 107, 195], ["১০০", 301, 176],
                ["১০০", 501, 170], ["১", 672, 163], ["১", 80, 304], ["১০", 270, 293], ["১০০০", 490, 283], ["১০০", 693, 278],
                ["১", 81, 406], ["১০০০", 297, 402], ["১০০০", 515, 402], ["১০০", 706, 401],
              ] },
              { gap: 2 },
              { kind: "c3p001_box", cap: "কার্ডগুলো সাজিয়ে রাখি", h: 40 },
              { gap: 2 },
              { kind: "c3p001_box", label: "অঙ্কে লিখি", h: 8.5 },
              { gap: 2 },
              { kind: "c3p001_box", label: "কথায় লিখি", h: 8.5 },
            ] },
          ], gap: 7 },
        ] },
        { ex: "৩", mark: "anu", text: "গণনা করি ও সংখ্যায় লিখি", body: [ // 1, 3, 4, 2, 5 = 13425
          cardTab(PL5, [["১০০০০", [1]], ["১০০০", [3]], ["১০০", [4]], ["১০", [2]], ["১", [5]]], { k: 0.78, cols: ["19%", "23%", "23%", "19%", "16%"] }),
          "সংখ্যাটি হলো______________",
        ] },
      ],
    },
    {
      page: 6,
      spread: true,
      blocks: [
        { ex: "৪", mark: "anu", text: "গণনা করি ও সংখ্যায় লিখি", body: [ // 3, 4, 0, 3, 4 = 34034
          cardTab(PL5, [["১০০০০", [3]], ["১০০০", [4]], ["১০০", []], ["১০", [3]], ["১", [4]]], { k: 0.78, cols: ["19%", "23%", "23%", "19%", "16%"] }),
          "সংখ্যাটি হলো______________। এখানে শতক স্থানীয় অঙ্কটি কী?",
        ] },
        { ex: "৫", mark: "anu", text: "সংখ্যাটি কত?", body: [ // 2, 3, 5, 5, 4 = 23554
          { row: [
            { frame: [{ kind: "c3p001_cards", k: 0.92, gap: 5, stacks: [["১০০০০", 2], ["১০০০", 3], ["১০০", 5], ["১০", 5], ["১", 4]] }], pad: 3 },
            { kind: "c3p001_arrow", dir: "right" },
            { kind: "c3p001_box", w: 30, h: 22 },
          ], w: [114, 14, 32], gap: 3, justify: "center" },
        ] },
        { ex: "৬", mark: "anu", text: "অঙ্কে লিখি", body: [{ sums: ["নয় হাজার নয় শত নব্বই", "নয় হাজার নিরানব্বই", "দশ হাজার", "দশ হাজার দশ", "তেরো হাজার পাঁচ শত বত্রিশ", "ছাব্বিশ হাজার আট শত সাঁইত্রিশ"], cols: 2, marks: true }] },
        { ex: "৭", mark: "anu", text: "পড়ি ও কথায় লিখি", body: [{ sums: ["১১২৩৮", "১৭৮০৫", "১৯১১১", "১৩৩৫৯", "১৫১৫৩", "২৭৫৩৭"], cols: 3, marks: true }] },
      ],
    },
    {
      page: 7,
      spread: true,
      blocks: [
        { ask: "নিচের ছবিতে দেওয়া টিকিটগুলো ফুটবল খেলার জন্য বিক্রি করা হবে। কতগুলো টিকিট আছে?" },
        // 8 boxes of ten 1000-packets; a bundle of 3 packets of 1000, packets of 100 (4 and 3), 3 tickets, as printed
        { col: [
          { kind: "c3p001_tickets", rows: [[["box", 8]]], k: 0.84 },
          { kind: "c3p001_tickets", rows: [[["bundle", 3], ["h", 4], ["h", 3], ["one", 3]]], k: 1.25, gap: 7, justify: "flex-start" },
        ], gap: 3 },
        tenThousand("উপরের সারির প্রতিটি বাক্সে ১০০০ এর ১০টি করে প্যাকেট আছে। অর্থাৎ, টিকিটের পরিমাণ দশ হাজার এবং একে লেখা হয় ১০০০০। ছবিতে এরকম ৮টি বাক্স আছে। এই ৮টি বাক্সে একত্রে আশি হাজার টিকিট আছে।"),
        say("boy", "think", "ছবিতে আরও অনেকগুলো টিকিট রয়েছে। এগুলো আমরা কীভাবে গণনা করব?"),
        cardTab(PL5, [[], [], [], [], []], { h: 46 }),
      ],
    },
    {
      page: 8,
      spread: true,
      blocks: [
        { text: "আমরা সংখ্যাটি পড়ি তিরাশি হাজার চার শত তিয়াত্তর এবং লিখি **৮৩৪৭৩**।" },
        { kind: "c3p001_pvlines", digits: "৮৩৪৭৩", head: "স্থানীয় মান", w: 150,
          rows: [["৩ একক", "৩"], ["৭ দশক", "৭০"], ["৪ শতক", "৪০০"], ["৩ হাজার", "৩০০০"], ["৮ অযুত", "৮০০০০"]], bracket: { rows: [3, 4], text: "৮৩ হাজার" } },
        { ex: "১", mark: "anu", text: "সংখ্যাগুলো উচ্চস্বরে পড়ি, কথায় লিখি এবং উপরের মতো করে স্থানীয় মান নির্ণয় করি।", body: [
          { sums: ["(ক) ২৩৫১৭", "(খ) ৫১৩৪৭", "(গ) ৯৩০০৭"], cols: 3 },
        ] },
        { ex: "১", mark: "kaj", text: "৪৯০৩৭ সংখ্যাটির অঙ্কগুলোর স্থানীয় মান বের করি।", body: [
          { kind: "c3p001_pvlines", digits: "৪৯০৩৭", head: "স্থানীয় মান", w: 150,
            rows: [["৭ একক", "৭"], ["৩ দশক", "৩০"], ["০ শতক", "০"], ["৯ হাজার", "৯০০০"], ["৪ অযুত", "৪০০০০"]], bracket: { rows: [3, 4], text: "৪৯ হাজার" } },
        ] },
        { ex: "২", mark: "anu", text: "খালিঘর পূরণ করি", body: [
          { table: { tone: "blue", rows: [
            ["১৩৪৫৭ =", "□অযুত", "□হাজার", "□শতক", "□দশক", "□একক"],
            ["৭৮০৪ =", "□অযুত", "□হাজার", "□শতক", "□দশক", "□একক"],
            ["৬৮০০৫=", "□অযুত", "□হাজার", "□শতক", "□দশক", "□একক"],
            ["৯৭৮৪২=", "□অযুত", "□হাজার", "□শতক", "□দশক", "□একক"],
          ] } },
        ] },
        { ex: "৩", mark: "anu", text: "(ক) ৯৪২৩০ সংখ্যাটিতে ৪ ও ৩ এর স্থানীয় মান কত? সংখ্যাটিতে অযুত স্থানের অঙ্কটি কত?\n(খ) ৮৬৯৩৫ সংখ্যাটিতে হাজার স্থানের অঙ্কটি কত?" },
      ],
    },
    {
      page: 9,
      dense: true,
      blocks: [
        { ask: "বাংলাদেশের একটি ইউনিয়নের লোকসংখ্যা ১০০০০০ (প্রায়)। সংখ্যাটি আমরা কীভাবে পড়ব?" },
        { row: [
          chat([say("boy", "talk", "এটি সহজ। আগের মতো আমরা দশ, শত, হাজার ও অযুতের দল গঠন করে পড়তে পারি।")]),
          { pic: "p009-union-office", h: 30, w: 60, fit: "cover", frame: true },
        ], w: [null, 62], gap: 4 },
        { kind: "c3p001_saybox", who: "girl", mood: "think", small: true, gap: 6,
          text: "আমার কাছে কাজটি সহজ মনে হচ্ছে না, কারণ এখানে বাম দিকের ১ এর স্থানীয় মানের স্থানটি নেই।",
          body: [
            { kind: "c3p001_cards", list: ["১"], tilt: -42, k: 1.25 },
            { table: { head: PL5, rows: [["০", "০", "০", "০", "০"]], tone: "yellow", small: true, width: 92 } },
          ] },
        { row: [{ note: "এখানে নতুন স্থানটির মান হবে লক্ষ।\n১ লক্ষ অর্থ হলো ১০ অযুত এবং একে লেখা হয় ১০০০০০।" }], justify: "center" },
        { row: [
          { kind: "c3p001_tag", text: "স্থানের নাম" },
          { table: { head: PL6, rows: [["১", "০", "০", "০", "০", "০"]], tone: "blue" } },
        ], w: [28], gap: 1.5 },
        { kind: "c3p001_pvlines", digits: "১০০০০০", head: "এক লক্ষ বা ১০০০০০", headAt: "labels", w: 150, rh: 5.5, xv: 122,
          rows: [["০ একক", "০"], ["০ দশক", "০"], ["০ শতক", "০"], ["০ হাজার", "০"], ["০ অযুত", "০"], ["১ লক্ষ", "১০০০০০"]] },
        { ex: "১", mark: "anu", text: "বাংলাদেশের একটি পৌরসভার মোট জনসংখ্যার ৮০৬৯৯ জন পুরুষ ও ৭৬৬৪৪ জন নারী। সংখ্যা দুইটি উচ্চ স্বরে পড়ি, কথায় লিখি এবং অঙ্কগুলোর স্থানীয় মান নির্ণয় করি।" },
        { ex: "২", mark: "anu", text: "সংখ্যারেখায় ক ও খ স্থানের সংখ্যা লিখি।", body: [
          { kind: "c3p001_nline", from: 6400, to: 10500, labels: [7000, 8000], boxes: { 9000: "ক", 10000: "খ" }, w: 166 },
        ] },
      ],
    },
    {
      page: 10,
      title: "সংখ্যার তুলনা",
      spread: true,
      blocks: [
        { ask: "১২১৫ ও ১১২৫ এর মধ্যে কোন সংখ্যাটি ছোটো?" },
        say("parrot", "talk", "সংখ্যা দুইটিকে হাজার, শত, দশ ও একের দলে সাজাই।"),
        { kind: "p011_tab", tone: "blue", cols: ["50%", "50%"], rows: [ // 1 thousand, 2 hundreds, 1 ten, 5 ones | 1, 1, 2, 5
          { type: "pic", cells: [[base("K L2 R C5", { s: 2.15, cg: 2.6, lg: 3.2 })], [base("K L1 RR C5", { s: 2.15, cg: 2.6 })]] },
          { type: "num", cells: ["১২১৫", "১১২৫"] },
        ] },
        say("boy", "talk", "চলো, আমরা হাজারের দল তুলনা করি।"),
        say("girl", "talk", "হাজারের দল একই। তাই আমরা সংখ্যা দুইটিতে শত এর দল তুলনা করব। ১২১৫ সংখ্যাটিতে শত এর দল ২টি এবং ১১২৫ এ শত এর দল ১টি। তাই ১১২৫ সংখ্যাটি ছোটো।"),
        { ex: "১", mark: "anu", text: "নিচের সংখ্যা দুইটি তুলনা করো।", body: [{ text: "৩২৭৪০ এবং ৩২৯৪০", big: true }] },
        say("boy", "talk", "এটি খুব সহজ। আমরা একে একে বড়ো স্থানীয় মান থেকে ছোটো স্থানীয় মান তুলনা করব। প্রথমে অযুতের স্থান, এরপর হাজারের স্থান, এরপর শতকের স্থান, এরপর দশকের স্থান এবং সবশেষে এককের স্থান।"),
      ],
    },
  ],
};
