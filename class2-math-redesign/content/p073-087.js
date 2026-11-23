// অধ্যায় ৩ · গুণ: printed pages 73–87 (PDF pages 82–96), every word as printed.
// গুণের ধারণা (73–79), ৫ এর গুণ (78–80), ২ এর গুণ (81–83), ৩ এর গুণ (84–85), ৪ এর গুণ (86–87).
// Own kinds (content/p073-087.parts.js): p073_groups (things on plates/trays, exact counts), p073_ldots (the 100-dot sheet
// with the L-shaped paper), p073_namta, p073_scroll, p073_rows, p073_class, p073_parts, p073_cards, p073_eqbox, p073_wbox, p073_qs.
// The book's pink-triangle activities are `ex` cards; its green-square problems are p073_qs.

// the things the book counts (one ChatGPT sticker each, repeated by the build; the emoji until it comes)
const APPLE = { sticker: "apple", emoji: "🍎" }, POTATO = { sticker: "potato", emoji: "🥔" }, FISH = { sticker: "fish", emoji: "🐟" };
const BANANA = { sticker: "banana", emoji: "🍌", tilt: -38 }, TOMATO = { sticker: "tomato", emoji: "🍅" }, BALL = { sticker: "football", emoji: "⚽" };
const FLOWER = { sticker: "frangipani", emoji: "🌼" }, GREEN_APPLE = { sticker: "green-apple", emoji: "🍏" };
const G = (o) => ({ kind: "p073_groups", ...o });
const tomatoes = (n, size = 7.8) => G({ ...TOMATO, per: 5, n, size, align: "flex-start", justify: "flex-start", gap: 2.6 });
const balls = (n, size = 7.6) => G({ ...BALL, per: 3, n, dish: "tray", size, squeeze: 0.02, align: "flex-start", justify: "flex-start", gap: 2.2 });
const greenApples = (n) => G({ ...GREEN_APPLE, per: 4, pile: [1, 3], n, tone: "pink", size: 7, align: "flex-start", justify: "flex-start", gap: 2.6 });
// p81: the four pairs of children (pictures), the first n of them
const pairs = (n, h) => ({ row: Array.from({ length: n }, (_, i) => ({ pic: `p081-pair-${i + 1}`, h, w: h * 1.45 })), w: Array(n).fill(h * 1.45), gap: 1.2, justify: "flex-start" });
const L_ASK = "১০০ ডটের ছকের সাথে L আকৃতির কাগজ ব্যবহার করি এবং গুণফল বের করি।";

module.exports = {
  pages: [
    {
      page: 73,
      opener: { n: "তৃতীয় অধ্যায়", title: "গুণ" },
      title: "গুণের ধারণা",
      blocks: [
        { text: "নিচের ছবিতে কয়েকটি থালায় আপেল, আলু, মাছ ও কলা সাজানো আছে।" },
        { row: [
          { frame: [G({ ...APPLE, per: 2, n: 5, rows: [2, 1, 2], size: 8.6, gap: 14, overlap: 2.2, h: 33 })], pad: 1.6 },
          { frame: [G({ ...POTATO, per: 3, n: 5, rows: [2, 1, 2], size: 7.2, gap: 14, overlap: 2.6, h: 33 })], pad: 1.6 },
        ], gap: 3 },
        { row: [
          { frame: [G({ ...FISH, per: 4, n: 5, rows: [2, 1, 2], size: 6.8, gap: 14, overlap: 2.6, h: 33 })], pad: 1.6 },
          { frame: [G({ ...BANANA, tilt: 0, per: 4, n: 5, rows: [2, 1, 2], size: 6.8, gap: 14, overlap: 2.6, h: 33 })], pad: 1.6 },
        ], gap: 3 },
        { ask: "মাছ ও আলু কয়টি থালায় কয়টি করে আছে?" },
        { say: "boy", mood: "talk", text: "৫টি থালায় ৪টি করে মাছ আছে।" },
        { say: "girl", mood: "talk", text: "৫টি থালায় ৩টি করে আলু আছে।" },
        { row: [
          { col: [{ frame: [{ text: "**মাছ** ৪+৪+৪+৪+৪= □" }, { text: "___________টি মাছ", center: true }], tone: "blue" }, { text: "এটি একটি গাণিতিক বাক্য।", center: true }], gap: 1.4 },
          { col: [{ frame: [{ text: "**আলু** ৩+৩+৩+৩+৩ = □" }, { text: "___________টি আলু", center: true }], tone: "yellow" }, { text: "এটি একটি গাণিতিক বাক্য।", center: true }], gap: 1.4 },
        ], gap: 4 },
      ],
    },
    {
      page: 74,
      spread: true,
      blocks: [
        // the book's pink triangle here has no number (the next one, on p75, is ২): kept unnumbered, as a ● heading
        { sub: "আপেল ও কলা কতগুলো আছে?" },
        { frame: [G({ ...APPLE, per: 2, n: 5, size: 10.6, tally: true, justify: "space-around" })], pad: 3 },
        { frame: [G({ ...BANANA, per: 4, n: 4, dish: "none", fan: true, size: 13, tally: true, gap: 18 })], pad: 3 },
        { say: "girl", mood: "think", text: "উপরের ৫টি থালার প্রত্যেকটিতে ২টি করে আপেল আছে।\nসেখানে কতগুলো আপেল আছে?" },
        { say: "boy", mood: "think", text: "উপরে ৪ ছড়া কলা রয়েছে। প্রত্যেক ছড়ায় ৪টি করে কলা আছে।\nসেখানে মোট কতগুলো কলা আছে?" },
        { col: [
          { text: "আপেল গণনার জন্য গাণিতিক বাক্য লিখি" },
          { row: [{ kind: "p073_wbox", h: 17 }, { text: "______________টি আপেল", center: true }], gap: 8, align: "flex-end" },
        ], gap: 2.4 },
      ],
    },
    {
      page: 75,
      spread: true,
      blocks: [
        { col: [
          { text: "কলা গণনার জন্য গাণিতিক বাক্য লিখি" },
          { row: [{ kind: "p073_wbox", h: 17 }, { text: "______________টি কলা", center: true }], gap: 8, align: "flex-end" },
        ], gap: 2.4 },
        { ex: "২", text: "যদি আমরা আরও ১টি থালা যুক্ত করি, তাহলে সেখানে কতগুলো আপেল হবে?", body: [
          { frame: [G({ ...APPLE, per: 2, n: 6, size: 8.4, tally: true, justify: "space-around" })], pad: 3 },
          { gap: 4 },
          { kind: "p073_wbox", h: 36, label: "গাণিতিক বাক্য" },
          { gap: 5 },
          { text: "______________টি আপেল", center: true },
          { gap: 3 },
        ] },
      ],
    },
    {
      page: 76,
      spread: true,
      blocks: [
        { ask: "কোনো শ্রেণিতে ৪টি বেঞ্চ আছে, প্রতিটি বেঞ্চে ৩ জন করে শিক্ষার্থী বসে। শ্রেণিতে কত জন শিক্ষার্থী আছে?" },
        { row: [
          { frame: [{ kind: "p073_class", benches: 4, per: 3, size: 13, step: 8 }], pad: 2.4 },
          { say: "boy", mood: "talk", text: "৪টি সারিতে ৩ জন করে শিক্ষার্থী আছে। শিক্ষার্থী সংখ্যার জন্য গাণিতিক বাক্য হলো..." },
        ], w: [80], gap: 4 },
        { col: [
          { text: "শিক্ষার্থীর সংখ্যা: ৩+৩+৩+৩=১২" },
          { text: "সুতরাং শ্রেণিতে ১২ জন শিক্ষার্থী আছে।" },
          { text: "এখানে, আমরা ৩ কে ৪ বার যোগ করেছি। এই সমস্যাটি আমরা নিচের গাণিতিক বাক্যেও প্রকাশ করতে পারি।" },
        ], gap: 0 },
        { row: [
          { kind: "p073_eqbox", text: "৩×৪=১২" },
          { frame: [{ text: "কীভাবে পড়ব:\n**তিন গুণ চার সমান বারো।**" }], tone: "yellow" },
        ], w: [44], gap: 8, justify: "flex-start" },
        { text: "এই ধরনের হিসাবকে গুণ এবং × এই প্রতীককে গুণ চিহ্ন বলে।", big: true },
        { kind: "p073_parts" },
        { say: "boy", mood: "talk", text: "× এই চিহ্নকে গুণ ও + এই চিহ্নকে যোগ চিহ্ন বলা হয়।" },
      ],
    },
    {
      page: 77,
      allow: ["২"], // the book's "২ × ৫ = ১০" (its worked example): tesseract misses the ২; checked by eye
      blocks: [
        { ex: "১", text: "গুণ চিহ্ন ব্যবহার করে হিসাব করি।", body: [
          { kind: "p073_rows", eqW: 64, items: [
            { left: [{ frame: [G({ ...APPLE, per: 2, n: 5, rows: [2, 1, 2], size: 9.6, gap: 16, overlap: 2.4, h: 40 })], pad: 1.6 }],
              right: [{ kind: "p073_eqbox", text: "২ × ৫ = ১০" }, { text: "[[১০]]টি আপেল", center: true }] },
            { left: [{ frame: [G({ ...POTATO, per: 3, n: 5, rows: [2, 1, 2], size: 8, gap: 16, overlap: 2.8, h: 40 })], pad: 1.6 }],
              right: [{ kind: "p073_eqbox", text: "৩ × ___ = ___" }, { text: "__________টি আলু", center: true }] },
            { left: [{ frame: [G({ ...FISH, per: 4, n: 3, rows: [2, 1], size: 8, gap: 16, overlap: 2.4, h: 34 })], pad: 1.6 }],
              right: [{ kind: "p073_eqbox", text: "___ × ___ = ___" }, { text: "__________টি মাছ", center: true }] },
            { left: [{ frame: [G({ ...BANANA, per: 4, n: 4, rows: [2, 2], fan: true, size: 10, dishH: 0.62, gap: 18, overlap: 0, h: 38 })], pad: 1.6 }],
              right: [{ kind: "p073_eqbox", text: "___ × ___ = ___" }, { text: "__________টি কলা", center: true }] },
          ] },
        ] },
      ],
    },
    {
      page: 78,
      spread: true,
      blocks: [
        { ex: "২", text: "নিচের প্রত্যেক বস্তুর জন্য গুণের গাণিতিক বাক্য লিখি এবং গুণ করে উত্তর লিখি।", body: [
          { row: [{ text: "**১.**" }, balls(5, 8)], w: [8], gap: 1, align: "flex-start" },
          { row: [{ gap: 0.1 }, { kind: "p073_wbox", h: 13, w: 86 }], w: [8], gap: 1, justify: "flex-start" },
          { gap: 2 },
          { row: [
            { text: "**২.**" },
            G({ ...APPLE, per: 4, n: 5, rows: [2, 3], size: 8, gap: 3, overlap: 0.6 }),
            { kind: "p073_wbox", h: 13 },
          ], w: [8, 84], gap: 4, align: "center" },
          { gap: 2 },
          { row: [
            { text: "**৩.**" },
            G({ ...FLOWER, per: 4, n: 4, dish: "leaves", size: 6.8, squeeze: 0.06, lift: 0.28, gap: 3.4, justify: "flex-start", align: "flex-start" }),
            { kind: "p073_wbox", h: 13 },
          ], w: [8, 98], gap: 4, align: "center" },
        ] },
        { sub: "৫ এর গুণ" },
        { ask: "ছবিতে ৪টি থালার প্রত্যেকটিতে ৫টি করে টমেটো আছে। একত্রে কতগুলো টমেটো আছে?" },
        { frame: [G({ ...TOMATO, per: 5, n: 4, size: 9.6, justify: "space-around" })], pad: 3.4 },
      ],
    },
    {
      page: 79,
      spread: true,
      blocks: [
        { ex: "১", text: "নিচের ছবি অনুযায়ী ৩টি বা ৪টি থালায় কতগুলো টমেটো আছে বের করি।\n২টি করে সমাধান দেওয়া আছে।", body: [
          { kind: "p073_rows", eqW: 42, minH: 21, items: [
            { left: [tomatoes(1)], eq: "৫ × ১ = ৫" },
            { left: [tomatoes(2)], eq: "৫ × ২ = ১০" },
            { left: [tomatoes(3)], eq: "৫ × ৩ = □" },
            { left: [tomatoes(4)], eq: "৫ × ৪ = □" },
          ] },
        ] },
        { ex: "২", text: "উপরের ছবি অনুযায়ী যে কোনো ৫টি থালায় কতগুলো টমেটো আছে?" },
        { say: "boy", mood: "think", text: "যখন থালার সংখ্যা বৃদ্ধি পায়, তখন টমেটোর সংখ্যা কীভাবে বৃদ্ধি পাবে?" },
        { say: "girl", mood: "talk", text: "আমার মনে হয়, থালার সংখ্যা ও টমেটোর সংখ্যার মধ্যে একটি সম্পর্ক আছে।" },
      ],
    },
    {
      page: 80,
      title: "৫ এর গুণের নামতা শিখি",
      allow: ["৩", "২", "৪", "৮", "৯"], // the times table and the dot labels: tesseract runs "৫×৩=১৫" together into one number; checked by eye
      spread: true,
      blocks: [
        { row: [
          { ex: "৩", text: "১০০ ডটের ছকের সাথে L আকৃতির কাগজ ব্যবহার করি এবং দেখি কীভাবে গুণে প্রকাশ করা যায়।", body: [
            { kind: "p073_ldots", r: 10, c: 10, cell: 4.7, plain: true },
          ] },
          { kind: "p073_namta", a: 5, tone: "blue" },
        ], w: [null, 54], gap: 4, align: "flex-start" },
        { row: [
          { kind: "p073_ldots", r: 5, c: 3, cell: 5.2 },
          { kind: "p073_ldots", r: 5, c: 8, cell: 5.2 },
        ], gap: 4, justify: "space-around" },
        { row: [
          { say: "boy", mood: "talk", text: "৫×৩=১৫" },
          { say: "girl", mood: "talk", text: "৫×৮=৪০" },
        ], gap: 4, justify: "space-around" },
        { kind: "p073_qs", items: [{ n: "", text: "৬টি থালায় প্রতিটিতে ৫টি করে লিচু আছে। একত্রে কতগুলো লিচু আছে?" }] },
      ],
    },
    {
      page: 81,
      title: "২ এর গুণ",
      dense: true,
      blocks: [
        { ask: "চার জোড়া শিশু খেলছে। মোট কতজন শিশু খেলছে?" },
        { frame: [{ ...pairs(4, 27), justify: "space-around" }], pad: 1.6 },
        { text: "নিচের ছবি অনুযায়ী কতজন শিশু আছে তা বের করি।" },
        { kind: "p073_rows", eqW: 50, lines: true, items: [
          { left: [pairs(1, 16)], eq: "২×১=২" },
          { left: [pairs(2, 16)], eq: "২×২=৪" },
          { left: [pairs(3, 16)], eq: "২×৩= □" },
          { left: [pairs(4, 16)], eq: "২×৪= □" },
        ] },
        { row: [
          { ex: "১", text: "একইভাবে ৫,৬, ৭, ৮, ৯ বা ১০ জোড়ায় কতজন শিশু আছে?" },
          { frame: [{ sums: ["২×৫= ____", "২×৮= ____", "২×৬= ____", "২×৯= ____", "২×৭= ____", "২×১০= ____"], cols: 2 }], tone: "green", pad: 2.4 },
        ], w: [null, 78], gap: 4 },
        { say: "boy", mood: "think", text: "জোড়ার সংখ্যা বৃদ্ধি পেলে কীভাবে শিশুর সংখ্যা বৃদ্ধি পায়?" },
      ],
    },
    {
      page: 82,
      spread: true,
      allow: ["৮"], // the blue answer card "৮": tesseract misses it; checked by eye
      blocks: [
        { ex: "২", text: "গুণের কার্ড দিয়ে খেলা করি।", body: [
          { row: [
            { col: [{ text: "নিচের মতো করে গুণের কার্ড তৈরি করি।" }, { gap: 3 }, { text: "যেমন," }] },
            { pic: "p082-card-game", h: 40, w: 71, frame: true, fit: "cover" },
          ], w: [null, 72], gap: 4 },
          { kind: "p073_cards", rows: [
            { label: "সামনে গুণ", cards: ["২ × ৪", "৫ × ৩"], tone: "pink" },
            { label: "পিছনে উত্তর", cards: ["৮", "১৫"], tone: "blue" },
          ] },
        ] },
        { sub: "এসো নিজেরাই খেলি" },
        { col: [
          { text: "**খেলা–১:** প্রথমে ৫ এর গুণের সেট এর কার্ডগুলো ভালোভাবে মিশাই। গুণগুলো সব এক–দিকে এবং উত্তরগুলো সব কার্ডের উল্টো দিকে থাকবে। গুণের দিক থেকে যেকোনো একটি তুলি। পিছনের উত্তর না দেখেই নিজে নিজে উত্তর বের করি। এবার পিছনের উত্তরের সাথে মিলাই। এভাবে খেলাটি চলতে থাকবে।" },
          { text: "**খেলা–২:** একই খেলা প্রথমে উত্তর তুলে পরে গুণ বের করি।" },
        ], gap: 1 },
        { sub: "এবারে জোড়ায় / বন্ধুর সাথে খেলি" },
        { col: [
          { text: "**খেলা–৩:** একজন একটি কার্ড তুলবে এবং অন্য খেলোয়াড়কে গুণ দেখাবে। অন্যজন গুণের উত্তর দেবে। একইভাবে একজন উত্তর দেখাবে অন্যজন গুণটি বলবে।" },
          { text: "**খেলা–৪:** ডেস্কের উপর কার্ডের গুণের দিকটি নিচে রাখি। বন্ধুকে উত্তর দেখিয়ে গুণটি জিজ্ঞেস করি।" },
        ], gap: 1 },
        { row: [
          { say: "boy", mood: "think", text: "২ এর গুণের খেলা।\nএই গুণফলটি কীভাবে হয়?\n[[১৮]]" },
          { say: "girl", mood: "talk", text: "এটি ২ × ৯,\nতাই নয় কি?\n[[২ × ৯]]" },
        ], gap: 4 },
      ],
    },
    {
      page: 83,
      title: "২ এর গুণের নামতা শিখি",
      allow: ["৩", "৯"], // the times table (২×৩=৬, ২×৯=১৮): tesseract runs each line into one number; checked by eye
      spread: true,
      blocks: [
        { row: [
          { col: [
            { ask: "১০০ ডটের ছকের সাথে L আকৃতির কাগজ ব্যবহার করি এবং আমরা দেখি কীভাবে গুণ প্রকাশ করা যায়।" },
            { row: [{ say: "boy", mood: "talk", text: "২×৪=৮" }, { kind: "p073_ldots", r: 2, c: 4, cell: 4.8 }], w: [46], gap: 3, align: "center" },
          ], gap: 3 },
          { kind: "p073_namta", a: 2, tone: "green" },
        ], w: [null, 54], gap: 4, align: "flex-start" },
        { row: [
          { kind: "p073_ldots", r: 2, c: 8, cell: 5.4 },
          { say: "girl", mood: "talk", text: "২×৮=১৬" },
        ], w: [null, 60], gap: 4 },
        { kind: "p073_qs", items: [
          { n: "১", text: "মিনা প্রতিদিন একটি বইয়ের ২ পৃষ্ঠা পড়ে। সে ৭ দিনে কত পৃষ্ঠা পড়ে?" },
          { n: "২", text: "একটি চকলেটের দাম ২ টাকা। রাজু ৬টি চকলেট কিনল।\n(১) চকলেটগুলোর দাম কত টাকা?\n(২) যদি সে আরও ৭টি চকলেট কিনে, তবে মোট কত টাকা লাগবে?" },
        ] },
      ],
    },
    {
      page: 84,
      title: "৩ এর গুণ",
      allow: ["৪"], // "৩ × ৪ = □": tesseract misses the ৪; checked by eye
      spread: true,
      blocks: [
        { ask: "৩ এর গুণের নামতা তৈরি করি।" },
        { ex: "১", text: "নিচের ছবি অনুযায়ী কতগুলো বল আছে বের করি।", body: [
          { kind: "p073_rows", eqW: 42, items: [
            { left: [balls(1)], eq: "৩ × ১ = ৩" },
            { left: [balls(2)], eq: "৩ × ২ = ৬" },
            { left: [balls(3)], eq: "৩ × ৩ = □" },
            { left: [balls(4)], eq: "৩ × ৪ = □" },
          ] },
        ] },
        { row: [
          { col: [
            { ex: "২", text: "উপরের ছবি অনুযায়ী ৫, ৬, ৭, ৮, ৯ ও ১০টি ট্রেতে কতটি করে বল আছে?" },
            { ex: "৩", text: "যে সংখ্যা দিয়ে গুণ করা হয়, তা ১ করে বৃদ্ধি করলে গুণফল কীভাবে বৃদ্ধি পায়?" },
          ], gap: 6 },
          { kind: "p073_scroll", a: 3, from: 5, to: 10 },
        ], w: [null, 64], gap: 6, align: "center" },
      ],
    },
    {
      page: 85,
      title: "৩ এর গুণের নামতা শিখি",
      spread: true,
      blocks: [
        { row: [
          { col: [
            { ask: L_ASK },
            { row: [{ say: "boy", mood: "talk", text: "৩×৫=১৫" }, { kind: "p073_ldots", r: 3, c: 5, cell: 4.8 }], w: [46], gap: 3, align: "center" },
          ], gap: 3 },
          { kind: "p073_namta", a: 3, tone: "yellow" },
        ], w: [null, 54], gap: 4, align: "flex-start" },
        { row: [
          { kind: "p073_ldots", r: 3, c: 8, cell: 5.4 },
          { say: "girl", mood: "talk", text: "৩×৮=২৪" },
        ], w: [null, 60], gap: 4 },
        { kind: "p073_qs", items: [
          { n: "১", text: "একটি রিক্সায় ৩টি চাকা আছে। ৪টি রিক্সায় একত্রে কয়টি চাকা রয়েছে?" },
          { n: "২", text: "একটি থালায় ৩টি পেয়ারা সাজানো যায়। ৭টি থালা সাজাতে কয়টি পেয়ারা প্রয়োজন?" },
          { n: "৩", text: "একটি পরিবারে ৩ জন সদস্য থাকলে এরূপ ৯টি পরিবারে কতজন সদস্য থাকবে?" },
        ] },
      ],
    },
    {
      page: 86,
      title: "৪ এর গুণ",
      spread: true,
      blocks: [
        { ask: "৪ এর গুণের নামতা তৈরি করি।" },
        { ex: "১", text: "নিচের ছবি অনুযায়ী কতগুলো আপেল আছে তা বের করি।", body: [
          { kind: "p073_rows", eqW: 48, lines: true, items: [
            { left: [greenApples(1)], eq: "৪×১=৪" },
            { left: [greenApples(2)], eq: "৪×২=৮" },
            { left: [greenApples(3)], eq: "৪×৩= □" },
            { left: [greenApples(4)], eq: "৪×৪= □" },
          ] },
        ] },
        { row: [
          { col: [
            { ex: "২", text: "উপরের ছবি অনুযায়ী ৫, ৬, ৭, ৮, ৯ ও ১০টি থালায় কতটি করে আপেল আছে?" },
            { ex: "৩", text: "যে সংখ্যা দিয়ে গুণ করা হয়, তা ১ করে বৃদ্ধি করলে গুণফল কীভাবে বৃদ্ধি পায়?" },
          ], gap: 6 },
          { kind: "p073_scroll", a: 4, from: 5, to: 10 },
        ], w: [null, 64], gap: 6, align: "center" },
      ],
    },
    {
      page: 87,
      title: "৪ এর গুণের নামতা শিখি",
      spread: true,
      blocks: [
        { row: [
          { col: [
            { ask: L_ASK },
            { row: [{ say: "boy", mood: "talk", text: "৪×৩=১২" }, { kind: "p073_ldots", r: 4, c: 3, cell: 4.8 }], w: [46], gap: 3, align: "center" },
          ], gap: 3 },
          { kind: "p073_namta", a: 4, tone: "pink" },
        ], w: [null, 54], gap: 4, align: "flex-start" },
        { row: [
          { kind: "p073_ldots", r: 4, c: 7, cell: 5.4 },
          { say: "girl", mood: "talk", text: "৪×৭=২৮" },
        ], w: [null, 60], gap: 4 },
        { kind: "p073_qs", items: [
          { n: "১", text: "১টি বিড়ালের ৪টি পা আছে। ৮টি বিড়ালের মোট কতটি পা আছে?" },
          { n: "২", text: "১টি চেয়ারের ৪টি পায়া রয়েছে। ৬টি চেয়ারের কতটি পায়া আছে?" },
          { n: "৩", text: "প্রতিটি ভেড়ার ৪টি বাচ্চা থাকলে ৯টি ভেড়ার কয়টি বাচ্চা থাকবে?" },
        ] },
      ],
    },
  ],
};
