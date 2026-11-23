// অধ্যায় ৫ পরিমাপ (তরলের আয়তন, সময়), অধ্যায় ৬ মুদ্রা, অধ্যায় ৭ উপাত্ত: printed pages 115–127 (PDF pages 124–136),
// every word as printed. Own kinds (p115_…) are in p115-127.parts.js: glasses, bottles and pouring, clocks (second hand,
// empty faces), digital clocks, the day and month cycles, drawn coins and notes, scattered fruits and vehicles, tallies.
// The book's pink-triangle numbers are exercise cards (ex / p115_ex); its green-square numbers are p115_tasks.
const G = (n) => Array(n).fill(1); // n full glasses
const cash = (items, o = {}) => ({ kind: "p115_cash", items, ...o });
const one = (sticker, emoji, size) => ({ objs: { sticker, emoji, n: 1, size } });
const tally = (n) => ({ kind: "p115_tally", n, h: 7.4 });
// p125's fruits, placed as in the book's picture: 6 bananas, 7 mangoes, 8 lychees, 5 apples (p126's table)
const FRUITS = [
  ["banana", 11, 17, 9, -12], ["banana", 25.9, 42.2, 9, 14], ["banana", 11, 72.2, 9, 8], ["banana", 43.6, 63.4, 9, -10], ["banana", 61.3, 65.5, 9, 12], ["banana", 77.4, 27.8, 9, -6],
  ["mango", 11, 38, 9], ["mango", 22.3, 26.6, 9, 10], ["mango", 39.6, 44.5, 9, -8], ["mango", 52, 38.9, 9], ["mango", 66.5, 23.4, 9, 8], ["mango", 76.9, 45.5, 9, -10], ["mango", 71.3, 80, 9],
  ["lychee", 33.2, 27.8, 8.5], ["lychee", 58, 27.8, 8.5], ["lychee", 85.4, 28.9, 8.5], ["lychee", 10.7, 55, 8.5], ["lychee", 51.8, 54.5, 8.5], ["lychee", 30.3, 75.5, 8.5], ["lychee", 70.7, 61.1, 8.5], ["lychee", 89.5, 71.1, 8.5],
  ["apple", 45.1, 25.5, 9], ["apple", 67.6, 38.9, 9], ["apple", 20.7, 56.6, 9], ["apple", 52, 72.2, 9], ["apple", 82.6, 63.4, 9],
];
// p126's road: 3 buses, 7 red cars, 2 taxis, 1 small green car
const VEHICLES = [
  ["bus", 20, 15, 42], ["bus", 73, 30, 42], ["bus", 61, 82, 42, 0, true],
  ["car", 45, 15, 17], ["car", 44, 34, 17], ["car", 12.4, 50, 17], ["car", 50, 51, 17], ["car", 66, 61, 17], ["car", 21, 76, 17], ["car", 11, 89, 17],
  ["taxi", 24, 37, 22], ["taxi", 88, 59, 22],
  ["mini-car", 34, 66, 16, 0, true],
];
module.exports = {
  pages: [
    {
      page: 115,
      spread: true,
      blocks: [
        { kind: "p115_ex", n: "১", text: "কোন বোতলে বেশি পানি ধরে, ছোটো পাত্রগুলোর সাহায্যে তুলনা করো। কোন বোতলে বেশি পানি ধরে এবং কতটুকু বেশি পানি ধরে?",
          aside: { kind: "p115_bottles", items: ["small", "big"], h: 21, gap: 5 },
          body: [{ row: [{ kind: "p115_pour", bottle: "small", fills: G(4) }, { pic: "p115-girl-glasses", h: 40, w: 27 }, { kind: "p115_pour", bottle: "big", fills: [1, 1, 1, 1, 0.45] }], w: [50, 27, 62], justify: "center", align: "flex-end", gap: 5 }] },
        { kind: "p115_ex", n: "২", text: "কোনটিতে বেশি পানি আছে?\nকেন?", aside: { kind: "p115_glasspair", h: 22 } },
        { kind: "p115_ex", n: "৩", text: "কোন পাত্রে সবচেয়ে বেশি পানি ধরে? কোন পাত্রে সবচেয়ে কম পানি ধরে?", body: [
          { row: [{ text: "(১)", big: true }, one("teapot", "🫖", 22), { kind: "p115_glasses", fills: G(7) }], w: [12, 36, 100], justify: "flex-start" },
          { row: [{ text: "(২)", big: true }, one("saucepan", "🍳", 22), { kind: "p115_glasses", fills: [1, 1, 1, 1, 1, 0.45] }], w: [12, 36, 100], justify: "flex-start" },
          { row: [{ text: "(৩)", big: true }, one("bucket", "🪣", 25), { kind: "p115_glasses", fills: G(8) }], w: [12, 36, 100], justify: "flex-start" },
        ] },
      ],
    },
    {
      page: 116,
      spread: true,
      blocks: [
        { row: [{ ask: "বালতিতে কতটুকু পানি ধরে তা নির্ণয় করি।" }, one("bucket", "🪣", 24)], w: [null, 30], align: "center" },
        { row: [{ kind: "p115_fact", left: true, text: "তরলের আয়তন পরিমাপে আমরা আন্তর্জাতিক একক লিটার ব্যবহার করি এবং এটি নির্দেশ করার জন্য ইংরেজি অক্ষর “L” বা “l” লিখি।" },
          { kind: "p115_bottles", n: 1, h: 24, top: "১ লিটার" }], w: [null, 24], align: "center", gap: 6 },
        { row: [{ text: "(১)", big: true }, one("bucket", "🪣", 22), { kind: "p115_arrow", dir: "left", block: true, w: 9, h: 7 }, { kind: "p115_bottles", n: 3, h: 21 },
          { text: "___টি ১ লিটার বোতলের পানির সাহায্যে বালতিটি পূর্ণ করা হয়েছে। তাই বালতিতে ___ লিটার পানি ধরে।" }], w: [10, 24, 9, 28, null], gap: 3 },
        { kind: "p115_ex", n: "২", text: "নিচের পাত্রগুলোতে কতটুকু পানি ধরে?", body: [
          { row: [{ text: "(২)", big: true }, one("bucket", "🪣", 22), { kind: "p115_bottles", n: 5, h: 21 }, { text: "___ লিটার" }], w: [10, 30, 70, null], justify: "flex-start", gap: 3 },
          { row: [{ text: "(৩)", big: true }, one("clay-bowl", "🥣", 24), { kind: "p115_bottles", n: 4, h: 21 }, { text: "___ লিটার" }], w: [10, 30, 70, null], justify: "flex-start", gap: 3 },
        ] },
        { kind: "p115_tasks", items: [{ n: "১", text: "এক লিটার পানির বোতল ব্যবহার করে বিভিন্ন পাত্র পূর্ণ করো এবং পানি পরিমাপ করো।" }] },
      ],
    },
    {
      page: 117,
      title: "সময় পরিমাপ",
      spread: true,
      // the clock faces' numerals: our clocks write Bangla numerals (the core's convention); the book's clocks print Latin ones
      allow: ["২", "৫", "৭", "৮", "৯", "১০", "১১"],
      blocks: [
        { ask: "ছবির ঘড়িতে কয়টা বাজে?" },
        { frame: [{ row: [{ kind: "p115_clocks", items: [{ h: 3, m: 0, s: 3 }], size: 46 }, { col: [{ kind: "p115_hands", w: 80 }, { kind: "p115_unit", head: "সময়ের একক", body: "সেকেন্ড, মিনিট, ঘণ্টা" }], gap: 2 }], w: [62, null], justify: "space-around" }] },
        { say: "boy", mood: "think", text: "ঘণ্টার কাঁটা ৩ এর ঘরে আছে।" },
        { say: "girl", mood: "talk", text: "মিনিটের কাঁটা ১২ এর ঘরে আছে" },
        { ex: "১", text: "কয়টা বাজে?", body: [{ kind: "p115_clocks", items: [{ h: 9, m: 0 }, { h: 1, m: 0 }, { h: 4, m: 0 }], size: 38, line: true }] },
      ],
    },
    {
      page: 118,
      spread: true,
      // the clock faces' numerals: our clocks write Bangla numerals (the core's convention); the book's clocks print Latin ones
      allow: ["১", "৪", "৫", "৬", "৭", "৯", "১২"],
      blocks: [
        { ex: "২", text: "সময় অনুযায়ী ঘড়ির কাঁটা বসাই। (প্রথমটি করে দেওয়া হলো)", body: [{ kind: "p115_clocks", size: 38, items: [{ h: 8, m: 0, cap: "৮টা বাজে" }, { empty: true, cap: "২টা বাজে" }, { empty: true, cap: "১০টা বাজে" }, { empty: true, cap: "৩টা বাজে" }] }] },
        { ex: "৩", text: "ডিজিটাল ঘড়ি: ডিজিটাল ঘড়ি অথবা মোবাইল ফোনের ঘড়িতে বামপাশের অংক দুটি ঘণ্টা ও ডান পাশের অংক দুটি হলো মিনিট।", body: [
          { row: [{ text: "ঘড়িতে ১১টা ১৫ মিনিট", big: true }, { kind: "p115_lcds", items: ["11:15"], h: 25 }], justify: "center", gap: 14 },
          { gap: 2 },
          { text: "কয়টা বাজে?", big: true, center: true },
          { kind: "p115_lcds", items: ["11:35", "08:20", "06:25", "07:45"], h: 19, line: true },
        ] },
      ],
    },
    {
      page: 119,
      title: "দিন, সপ্তাহ ও মাস",
      spread: true,
      // the OCR misses these month names in the book's small boxes; each checked by eye
      allow: ["আষাঢ়", "আশ্বিন", "কার্তিক", "পৌষ"],
      blocks: [
        { kind: "p115_fact", text: "১ সপ্তাহ = ৭ দিন" },
        { row: [{ kind: "p115_cycle", items: ["শুক্রবার", "শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার"], center: "৭ দিনের নাম", tone: "yellow", hi: 3, rx: 31, ry: 25, bw: 21, bh: 7.2 },
          { col: [{ kind: "p115_ex", n: "১", inset: true, body: [{ kind: "p115_lines", rows: ["সোমবারের আগের দিন", "বুধবারের পরের দিন", "বিদ্যালয় বন্ধের দিন"], lw: 13 }] },
            { gap: 3 }, { kind: "p115_fact", text: "১ মাস = ৩০ দিন\n১ বছর = ১২ মাস" }] }], w: [86, null], gap: 4, align: "center" },
        { kind: "p115_cycle", items: ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"],
          nums: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], center: "বাংলা মাসের নাম", tone: "green", rx: 52, ry: 31, bw: 17, bh: 6.8, font: 10 },
        { row: [{ kind: "p115_ex", n: "২", inset: true, body: [{ kind: "p115_lines", rows: ["জ্যৈষ্ঠ মাসের পরের মাস", "মাঘ মাসের আগের মাস", "ফাল্গুন মাসের পরের মাস"], lw: 30 }] }], w: [118], justify: "center" },
      ],
    },
    {
      page: 120,
      spread: true,
      // the OCR misses these month names in the book's small boxes; each checked by eye
      allow: ["জুলাই", "সেপ্টেম্বর", "ডিসেম্বর"],
      blocks: [
        { kind: "p115_cycle", items: ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"],
          nums: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], center: "ইংরেজি মাসের নাম", tone: "pink", rx: 58, ry: 43, bw: 20, bh: 8, font: 11.5 },
        // the book numbers this exercise with a Latin "3" (its two before are ১ and ২)
        { row: [{ kind: "p115_ex", n: "3", inset: true, body: [{ kind: "p115_lines", rows: ["মার্চের পরের মাস", "আগস্টের আগের মাস", "তোমার জন্ম মাস"], lw: 30 }] }], w: [110], justify: "center" },
        { kind: "p115_tasks", items: [
          { n: "১", text: "নভেম্বর মাসের পূর্বের মাস কোনটি?" },
          { n: "২", text: "জুন মাসের দুই মাস পরের মাসের নাম কী?" },
          { n: "৩", text: "অক্টোবর মাসের ৫ মাস পরের মাসের নাম কী?" },
        ] },
      ],
    },
    {
      page: 121,
      opener: { n: "ষষ্ঠ অধ্যায়", title: "মুদ্রা" },
      title: "বাংলাদেশি মুদ্রা",
      blocks: [
        { text: "বাংলাদেশি মুদ্রার নাম টাকা এবং এর সাংকেতিক চিহ্ন **‘৳’**।\nবাংলাদেশি মুদ্রা দুই রকমের: (ক) ধাতব মুদ্রা বা কয়েন (খ) কাগজের নোট" },
        { sub: "ধাতব মুদ্রা বা কয়েন" },
        { kind: "p115_table", tone: "yellow", widths: [41, 18, 41], head: ["ধাতব মুদ্রা বা কয়েন এর এক পিঠ", "টাকা", "ধাতব মুদ্রা বা কয়েন এর বিপরীত পিঠ"], rows: [
          [cash([{ v: 1, coin: true }], { cw: 13 }), "১ টাকা", cash([{ v: 1, coin: true, back: true }], { cw: 13 })],
          [cash([{ v: 2, coin: true }], { cw: 14.5 }), "২ টাকা", cash([{ v: 2, coin: true, back: true }], { cw: 14.5 })],
          [cash([{ v: 5, coin: true }], { cw: 16 }), "৫ টাকা", cash([{ v: 5, coin: true, back: true }], { cw: 16 })],
        ] },
        { sub: "কাগজের মুদ্রা-নোট" },
        { kind: "p115_table", tone: "green", widths: [41, 18, 41], head: ["নোট এর এক পিঠ", "টাকা", "নোট এর বিপরীত পিঠ"], rows: [
          [cash([200], { w: 37 }), "২০০ টাকা", cash([{ v: 200, back: true }], { w: 37 })],
          [cash([500], { w: 37 }), "৫০০ টাকা", cash([{ v: 500, back: true }], { w: 37 })],
          [cash([1000], { w: 37 }), "১০০০ টাকা", cash([{ v: 1000, back: true }], { w: 37 })],
        ] },
      ],
    },
    {
      page: 122,
      title: "টাকার বিনিময়",
      spread: true,
      blocks: [
        { kind: "p115_table", tone: "blue", widths: [36, 16, 48], rows: [
          [cash([200], { w: 42 }), { kind: "p115_arrow", dir: "both", w: 20, h: 5 }, [cash([100, 100], { w: 25 }), "২টি ১০০ টাকার নোট"]],
          [cash([{ v: 500, back: true }], { w: 42 }), { kind: "p115_arrow", dir: "both", w: 20, h: 5 }, [cash([100, 100, 100, 100, 100], { w: 25, maxw: 82 }), "৫টি ১০০ টাকার নোট"]],
          [cash([{ v: 1000, back: true }], { w: 42 }), { kind: "p115_arrow", dir: "both", w: 20, h: 5 }, [cash([500, 500], { w: 31, back: true, gap: 4 }), "২টি ৫০০ টাকার নোট"]],
        ] },
        { say: "boy", mood: "talk", text: "চলো, অন্য রকমে বিনিময় করার চেষ্টা করি।" },
        { say: "girl", mood: "talk", text: "আমরা ১টি ১০০ টাকার নোট এবং ২টি ৫০ টাকার নোটের মাধ্যমে ২০০ টাকা বিনিময় করতে পারি।" },
        { say: "boy", mood: "talk", text: "এছাড়া, ২০০ টাকাকে আমরা বিভিন্ন রকমে বিনিময় করতে পারি। যেমন, ২টি ৫০ টাকার নোট ও ৫টি ২০ টাকার নোটের মাধ্যমে ২০০ টাকা বিনিময় করতে পারি।" },
        { say: "girl", mood: "think", text: "তাহলে তো, ৫০০ টাকা ও ১০০০ টাকাকেও আমরা অনুরূপ ভিন্ন ভিন্নভাবে বিনিময় করতে পারি।" },
      ],
    },
    {
      page: 123,
      spread: true,
      blocks: [
        { ask: "মিরাজ ৩০ টাকা দামের ১টি কলম কিনল। ১ টাকা, ২ টাকা, ৫ টাকা ও ১০ টাকার নোট ব্যবহার করে সে কতভাবে দাম পরিশোধ করতে পারে?" },
        { say: "boy", mood: "talk", text: "নিম্নরূপে নোট ব্যবহার করে দাম পরিশোধ করা যায়: ১ টাকার নোট ২টি, ২ টাকার নোট ৪টি, ৫ টাকার নোট ২টি ও ১০ টাকার নোট ১টি।" },
        { say: "girl", mood: "talk", text: "অন্যভাবেও দাম পরিশোধ করা যায়।" },
        { text: "নিচের ছকের খালিঘর পূরণ করি", big: true },
        // the book's first row (১ + ৪ + ৫ + ১০ = ২০ টাকা) does not make ৩০ টাকা; kept as printed
        { kind: "p115_table", tone: "pink", widths: [12, 22, 22, 22, 22], head: ["টাকা", cash([1], { w: 27 }), cash([2], { w: 27 }), cash([5], { w: 27 }), cash([10], { w: 27 })], rows: [
          ["", "১টি = **৳**১", "২টি = **৳**৪", "১টি = **৳**৫", "১টি = **৳**১০"],
          ["", "২টি = ___", "৪টি = ___", "২টি = ___", "___টি = ___"],
          ["", "১০টি = ___", "৫টি = ___", "___টি = ___", "০টি = ___"],
          ["", "১০টি = ___", "___টি = ___", "০টি = ___", "১টি = ___"],
          ["", "___", "___", "___", "___"],
          ["", "___", "___", "___", "___"],
          ["", "___", "___", "___", "___"],
        ] },
        { kind: "p115_tasks", items: [{ n: "১", text: "আমরা কীভাবে ১ টাকা, ২ টাকা, ৫ টাকা, ১০ টাকা এবং ২০ টাকার নোট ব্যবহার করে ৫০ টাকার সাথে বিনিময় করতে পারি?" }] },
      ],
    },
    {
      page: 124,
      spread: true,
      allow: ["৪০"], // "ইভা ৪০ টাকায়": the OCR reads the book's ৪০ as 8০; checked by eye
      blocks: [
        // the book's triangle here carries no number; the papaya (১৮৮ টাকা) sits in the table's head row, as printed
        { kind: "p115_ex", n: "▲", dot: false, text: "নিচে জিনিসগুলোর মূল্য দেওয়া আছে। ইচ্ছামতো বিভিন্ন নোট ব্যবহার করে মূল্য পরিশোধ করে খালিঘর পূরণ করি।", body: [
          { kind: "p115_table", tone: "green", widths: [23, 11, 11, 11, 11, 11, 11, 11],
            head: [[one("papaya", "🍈", 12), "১৮৮ টাকা"], "১০০\nটাকা", "৫০\nটাকা", "২০\nটাকা", "১০\nটাকা", "৫\nটাকা", "২\nটাকা", "১\nটাকা"], rows: [
              [[one("banana-bunch", "🍌", 13), "৬০ টাকা"], "–", "৫০\nটাকা", "–", "১০\nটাকা", "–", "–", "–"],
              [[{ objs: { sticker: "apple", emoji: "🍎", n: 6, perRow: 3, size: 5.6, gap: .7 } }, "১২০ টাকা"], "", "", "", "", "", "", ""],
              [[one("watermelon", "🍉", 13), "৫৫০ টাকা"], "", "", "", "", "", "", ""],
              [[one("jackfruit", "🍍", 13), "২৫০ টাকা"], "", "", "", "", "", "", ""],
            ] },
        ] },
        { kind: "p115_tasks", items: [
          { n: "২", text: "ইভা ৪০ টাকায় ১ হালি ডিম এবং ৬৫ টাকায় ১ প্যাকেট বিস্কুট কিনল। সে কত টাকা খরচ করল?" },
          { n: "৩", text: "১টি খাতা এবং ১টি কলমের দাম একত্রে ১০৫ টাকা। ১টি কলমের দাম ১৫ টাকা হলে ১টি খাতার দাম কত?" },
          { n: "৪", text: "মেহেরুলের কাছে ১০০ টাকা ছিল এবং তার বাবা তাকে ৫০ টাকা দিলেন। মেহেরুল দোকান থেকে ১২০ টাকায় ১টি জ্যামিতি বক্স কিনল। তার কাছে এখন কত টাকা রইল?" },
        ] },
      ],
    },
    {
      page: 125,
      opener: { n: "সপ্তম অধ্যায়", title: "উপাত্ত" },
      title: "উপাত্ত সংগ্রহ এবং সাজানো",
      spread: true,
      // the OCR reads the heading's সংগ্রহ as সঞ্জাহ, and the ২ under the second tally box as ২১; checked by eye
      allow: ["সংগ্রহ", "২"],
      blocks: [
        { ask: "ছবিতে কোন ফল কতটি আছে, তার সংখ্যা কীভাবে বের করা যায় চিন্তা করি।" },
        { kind: "p115_scatter", h: 50, items: FRUITS },
        { row: [{ say: "boy", mood: "talk", text: "তালিকা তৈরি করে ফলের সংখ্যা আমরা সহজেই বের করতে পারি।" }, { say: "girl", mood: "talk", text: "আমরা দাগ টেনেও সহজে ফলের সংখ্যা বের করতে পারি।" }], gap: 3 },
        { frame: [{ row: [{ text: "প্রথমে প্রতিটি ফলের জন্য একটি করে খাড়া দাগ টানি। এভাবে পাশাপাশি চারটি দাগ টানি। পঞ্চমটির জন্য চারটি দাগের উপর দিয়ে আড়াআড়ি একটি দাগ টানি। এখন পাঁচটির একটি দল তৈরি হলো। এভাবে খুব সহজেই দাগ টেনে প্রতিটি ফলের সংখ্যা বের করা যায়। এই দাগগুলোকে বলা হয় **ট্যালি** চিহ্ন।" },
          { kind: "p115_tallyboxes", w: 21 }], w: [92, null], gap: 3 }] },
      ],
    },
    {
      page: 126,
      spread: true,
      blocks: [
        { row: [{ note: "ট্যালি চিহ্ন ব্যবহার করে ফলের সংখ্যা দেখানো হলো।" },
          { kind: "p115_table", tone: "yellow", widths: [36, 38, 26], head: ["ফলের নাম", "ট্যালি চিহ্ন", "সংখ্যা"], rows: [["আম", tally(7), "৭"], ["কলা", tally(6), "৬"], ["লিচু", tally(8), "৮"], ["আপেল", tally(5), "৫"]] }], w: [74, null], gap: 6 },
        { kind: "p115_tasks", items: [{ n: "১", text: "কোনো এক রাস্তায় একদিনে যতগুলো যানবাহন চলাচল করে, তার ছবি নিচে দেওয়া হলো। ছবি দেখে সেগুলোর নাম লিখি এবং তালিকা তৈরি করি। প্রত্যেক প্রকার যানবাহনের পাশে ট্যালি চিহ্নের সাহায্যে সংখ্যা লিপিবদ্ধ করি। পরবর্তীকালে চিহ্নকে সংখ্যায় প্রকাশ করে একটি সারণি তৈরি করি।" }] },
        { kind: "p115_scatter", h: 74, items: VEHICLES },
        { kind: "p115_tasks", items: [{ n: "২", text: "শিক্ষক শ্রেণিকক্ষে গৃহপালিত বিভিন্ন প্রাণির ছবি প্রদর্শন করবেন। মনোযোগ দিয়ে দেখে শিক্ষার্থীরা ট্যালি চিহ্নের সাহায্যে প্রাণিগুলোর সংখ্যা প্রকাশ করবে।" }] },
      ],
    },
    {
      page: 127,
      spread: true,
      blocks: [
        { kind: "p115_tasks", items: [
          { n: "৩", text: "শ্রেণি প্রতিনিধি প্রত্যেক শিক্ষার্থীকে জিজ্ঞেস করবে:", body: [
            { kind: "p115_list", items: [
              ["(ক)", "বাংলা, ইংরেজি ও গণিত এই তিনটি বিষয়ের মধ্যে কোনটি বেশি ভাল লাগে?"],
              ["(খ)", "কাক, কোকিল, কবুতর ও শালিক এই চার ধরনের পাখির মধ্যে কোনটি প্রিয়?", { kind: "p115_items", items: ["crow", "koel", "pigeon", "myna"], size: 14 }],
              ["(গ)", "লাল, নীল, সবুজ, হলুদ ও বেগুনি রঙের মধ্যে কোনটি বেশি পছন্দ?", { kind: "p115_swatches", colors: ["#EF4444", "#3B82F6", "#22C55E", "#FACC15", "#8B5CF6"], size: 7.5 }],
            ] },
            { text: "এই বিষয়গুলোর উপর ভিত্তি করে প্রত্যেক ক্ষেত্রে ট্যালি চিহ্নের সাহায্যে সংখ্যা লিপিবদ্ধ করে একটি সারণি তৈরি করবে।" },
          ] },
          { n: "৪", text: "**ব্যবহারিক কাজ:**", body: [
            { text: "তোমরা প্রত্যেকে শিক্ষকের নির্দেশমত কোনো একদিন ৩/৪ প্রকারের কয়েকটি করে পাতা এনে শ্রেণিকক্ষে একটি বাক্সে রাখবে। পরে একটি একটি করে তুলে ট্যালি চিহ্নের সাহায্যে সংখ্যা লিপিবদ্ধ করবে। পরবর্তীকালে ট্যালি চিহ্নকে সংখ্যায় প্রকাশ করে একটি সারণি তৈরি করবে।" },
          ] },
        ] },
        // the book leaves this space blank before "– সমাপ্ত –"; this picture is our addition (drop the line to keep the book's blank)
        { pic: "p127-leaves-box", h: 62, w: 110, frame: true },
        { text: "– সমাপ্ত –", big: true, center: true },
      ],
    },
  ],
};
