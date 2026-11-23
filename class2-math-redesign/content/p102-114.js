// অধ্যায় ৪ · জ্যামিতিক আকৃতি ও প্যাটার্ন (pp. 102–106) and অধ্যায় ৫ · পরিমাপ (pp. 107–114): printed pages 102–114
// (PDF pages 111–123), every word as printed. The book's two kinds of exercise marks are kept (p102_ex): a green square
// for its activities, a pink triangle for its exercises. Shapes, solids, rulers, the glass and the candle, the weights,
// the balance and the bottles are drawn by content/p102-114.parts.js, so every length and weight is exact; the 10 cm
// rulers are true size (1 cm = 10 mm on the printed page).
const RULER_DIGITS = ["০", "২", "৩", "৪", "৫", "৬", "৭", "৯", "১০"]; // the drawn rulers' numbers: OCR can't read the book's tiny ruler photos; checked by eye

module.exports = {
  pages: [
    {
      page: 102,
      opener: { n: "চতুর্থ অধ্যায়", title: "জ্যামিতিক আকৃতি ও প্যাটার্ন" },
      title: "জ্যামিতিক আকৃতি",
      spread: true,
      blocks: [
        { text: "নিকট পরিবেশে যে সকল জ্যামিতিক আকৃতি আমরা দেখতে পাই", big: true },
        { kind: "p102_grid", tone: "yellow", rows: [
          [{ kind: "p102_objs", justify: "center", items: [{ d: "football", h: 26 }] }, { kind: "p102_objs", justify: "center", items: [{ d: "pyramid", h: 26 }] }, { kind: "p102_objs", justify: "center", items: [{ d: "book", h: 22 }] }],
          [{ kind: "p102_shapes", items: [{ s: "circle", c: "orange", w: 24, label: "গোল আকৃতি" }] }, { kind: "p102_shapes", items: [{ s: "tri", c: "green", w: 28, h: 24, label: "তিনকোনা আকৃতি" }] }, { kind: "p102_shapes", items: [{ s: "rect", c: "blue", w: 34, h: 22, label: "চারকোনা আকৃতি" }] }],
        ] },
        { ask: "রাফি ও তুলি নিচের জিনিসগুলো সংগ্রহ করেছে। চলো তাদের সাথে জ্যামিতিক আকৃতিগুলো শনাক্ত করে পৃথকভাবে সাজাই।" },
        { kind: "p102_objs", items: [{ money: [{ v: 1, coin: true }], size: 1.25 }, { d: "matchbox", h: 15 }, { d: "glass", h: 24 }, { d: "marble", h: 15 }, { d: "dice", h: 19 }, { d: "brick", h: 15 }, { d: "cone", h: 21 }] },
        { row: [
          { say: "boy", mood: "talk", text: "১ টাকার কয়েন গোলাকৃতি" },
          { say: "girl", mood: "talk", text: "ম্যাচ বাক্স এর পৃষ্ঠদেশ চারকোনা" },
        ], gap: 4 },
      ],
    },
    {
      page: 103,
      allow: ["ইট"], // tesseract cannot read the book’s ইট (p103, row 3); checked by eye
      blocks: [
        { kind: "p102_ex", mark: "tri", n: "১", text: "বস্তুর সাথে আকৃতিসমূহের দাগ টেনে মিল করি", body: [
          { kind: "p102_match", rows: [
            [{ d: "ring", h: 19, word: "আংটি" }, { s: "tri", c: "rust", w: 22, h: 19 }],
            [{ d: "samosa", h: 16, word: "সমুচা" }, { s: "rect", c: "orange", w: 26, h: 16 }],
            [{ d: "brick", h: 14, word: "ইট" }, { s: "circle", c: "green", w: 19 }],
          ] },
        ] },
        { frame: [
          { text: "**তিনকোনা আকৃতি – ত্রিভুজ আকার**" },
          { kind: "p102_shapes", items: [{ s: "tri", c: "green", w: 23, h: 20 }, { s: "tri", c: "blue", w: 46, h: 20 }, { s: "tri-down", c: "yellow", w: 29, h: 20 }] },
        ], tone: "green", pad: 2.4 },
        { frame: [
          { text: "**চারকোনা আকৃতি – চতুর্ভুজ আকার**" },
          { kind: "p102_shapes", items: [{ s: "rect", c: "blue", w: 33, h: 20 }, { s: "square", c: "orange", w: 20 }, { s: "para", c: "pink", w: 40, h: 20 }] },
        ], tone: "blue", pad: 2.4 },
        { frame: [
          { text: "**গোলাকৃতি-গোলাকার**" },
          { kind: "p102_shapes", items: [{ s: "circle", c: "blue", w: 19 }, { s: "cylinder", c: "green", w: 28, h: 19 }, { s: "capsule", c: "orange", w: 38, h: 15 }] },
        ], tone: "pink", pad: 2.4 },
      ],
    },
    {
      page: 104,
      dense: true,
      blocks: [
        { kind: "p102_ex", mark: "sq", n: "১", text: "নিচের মজাদার খাদ্যগুলোর জ্যামিতিক আকৃতি বলি:", body: [
          { text: "**(ক)** সমুচা  **(খ)** পাউরুটি  **(গ)** রসগোল্লা  **(ঘ)** বিস্কুট  **(ঙ)** মোয়া  **(চ)** ছানার সন্দেশ" },
        ] },
        { kind: "p102_ex", mark: "sq", n: "২", text: "ত্রিভুজাকার ও চতুর্ভুজাকার আকৃতিগুলো ভিন্ন ভিন্ন রং করি।", body: [{ kind: "p102_design", w: 106 }] },
        { kind: "p102_ex", mark: "tri", n: "২", text: "চতুর্ভুজ, ত্রিভুজ ও গোলাকার জ্যামিতিক আকৃতিগুলো ব্যবহার করে ১টি কার্টুন আঁকা হয়েছে। এতে কয়টি ত্রিভুজাকার, চতুর্ভুজাকার ও গোলাকার রয়েছে?", body: [
          { kind: "p102_robot", h: 47 },
        ] },
      ],
    },
    {
      page: 105,
      title: "প্যাটার্ন",
      spread: true,
      blocks: [
        { say: "boy", mood: "talk", text: "আমি রাস্তায় ‘জেব্রা ক্রসিং’ দেখেছি। এতে প্যাটার্ন আছে। আমরা জেব্রা ক্রসিং দিয়ে রাস্তা পার হই।" },
        { pic: "p105-zebra-crossing", h: 98, w: 168, fit: "cover", frame: true },
        { row: [
          { objs: { sticker: "zebra", emoji: "🦓", n: 1, size: 46 } },
          { say: "girl", mood: "talk", text: "জেব্রার শরীরে এ রকম সাদাকালো প্যাটার্ন আছে।" },
        ], w: [56], gap: 4 },
      ],
    },
    {
      page: 106,
      spread: true,
      blocks: [
        { kind: "p102_ex", mark: "sq", n: "১", text: "আমাদের চারপাশ থেকে আরও প্যাটার্ন খুঁজে বের করি।", body: [
          { kind: "p102_say", who: "boy", mood: "talk", text: "আমি গোলাকার ও চতুর্ভুজাকার আকৃতি ব্যবহার করে একটি প্যাটার্ন তৈরি করেছি।", inner: [
            { kind: "p102_shapes", gap: 2, justify: "flex-start", items: ["circle", "rect", "rect", "rect", "circle", "rect", "rect", "rect"].map((s) => ({ s, w: s === "circle" ? 11.5 : 13.5, h: 11.5, c: s === "circle" ? "orange" : "blue" })) },
          ] },
          { kind: "p102_say", who: "girl", mood: "talk", text: "আমি ত্রিভুজ ও চতুর্ভুজ আকৃতি ব্যবহার করে একটি প্যাটার্ন তৈরি করেছি।", inner: [
            { kind: "p102_shapes", gap: 2, justify: "flex-start", items: ["tri", "rect", "rect", "rect", "tri", "rect", "rect", "rect"].map((s) => ({ s, w: s === "tri" ? 13 : 13.5, h: 11.5, c: s === "tri" ? "green" : "pink" })) },
          ] },
        ] },
        { kind: "p102_ex", mark: "tri", n: "১", text: "নিচের ছবিগুলো ইচ্ছেমতো প্যাটার্নে সাজাই।", body: [
          { row: [
            { objs: { sticker: "leaf", emoji: "🍃", n: 4, perRow: 4, size: 14 } },
            { objs: { sticker: "rose", emoji: "🌹", n: 6, perRow: 6, size: 14 } },
          ], w: [62], gap: 3 },
          { kind: "p102_slots", n: 10, rows: 3, size: 13.5 },
        ] },
      ],
    },
    {
      page: 107,
      opener: { n: "পঞ্চম অধ্যায়", title: "পরিমাপ" },
      title: "দৈর্ঘ্য পরিমাপ",
      spread: true,
      blocks: [
        { ask: "একটি বস্তু কতটুকু লম্বা তা আমরা কীভাবে পরিমাপ করি?" },
        { say: "girl", mood: "think", text: "আমার পেনসিলের সাথে তোমার পেনসিল লম্বায় তুলনা করি। কার পেনসিল লম্বায় বড়ো, কার পেনসিল লম্বায় ছোটো?" },
        { kind: "p102_pencils", h: 46, items: [{ len: 42, color: "red" }, { len: 30, color: "blue" }] },
        { say: "boy", mood: "talk", text: "হ্যাঁ, তোমার পেনসিল বড়ো। আমার পেনসিল ছোটো।" },
        { kind: "p102_ex", mark: "tri", n: "১", text: "পেনসিল দিয়ে মেপে তুলনা করো। তোমাদের প্রাথমিক গণিত পাঠ্যপুস্তকের দৈর্ঘ্য ও জ্যামিতি বাক্সের দৈর্ঘ্য পরিমাপ করো।", body: [
          { row: [{ pic: "cover", h: 32, w: 19, fit: "cover", frame: true }, { kind: "p102_objs", justify: "center", items: [{ d: "geobox", h: 22 }] }], w: [40, 60], justify: "center", gap: 14 },
        ] },
      ],
    },
    {
      page: 108,
      spread: true,
      allow: RULER_DIGITS,
      blocks: [
        { text: "আমরা সকলে দৈর্ঘ্য পরিমাপের জন্য মিটার বা সেন্টিমিটার ব্যবহার করি। বড়ো বস্তুর দৈর্ঘ্য পরিমাপের জন্য মিটার এবং ছোটো বস্তুর দৈর্ঘ্য পরিমাপের জন্য সেন্টিমিটার ব্যবহার করি। ১০০ সেন্টিমিটার সমান ১ মিটার।\nবস্তুর দৈর্ঘ্য পরিমাপ করতে স্কেল বা ফিতা ব্যবহার করা হয়।" },
        { row: [
          { kind: "p102_unit", head: "দৈর্ঘ্যের একক মিটার", body: "১ মিটার =\n১০০ সেন্টিমিটার" },
          { col: [
            { kind: "p102_ruler", cm: 10, mm: 10, items: [{ obj: "pencil", from: 0, to: 8, arrow: "start" }] },
            { kind: "p102_ruler", cm: 10, mm: 10, items: [{ obj: "pencil", from: 0, to: 8, arrow: "end" }] },
          ], gap: 2 },
        ], w: [54], gap: 3 },
        { ask: "পরিমাপে স্কেল কীভাবে ব্যবহার করতে হয়?" },
        { row: [
          { say: "boy", mood: "think", text: "স্কেল ব্যবহার করে কীভাবে পেনসিল মাপা যায়?" },
          { say: "girl", mood: "talk", text: "বস্তুর যে কোনো প্রান্ত স্কেলের শূন্য প্রান্তে স্থাপন করি।" },
        ], gap: 4 },
        { kind: "p102_ruler", cm: 10, mm: 10, items: [{ obj: "pencil", from: 0, to: 8, arrow: "start" }], callout: { at: 0, text: "শূন্যতে স্থাপন করি" } },
      ],
    },
    {
      page: 109,
      spread: true,
      allow: RULER_DIGITS,
      blocks: [
        { say: "boy", mood: "think", text: "বস্তুটির অন্য প্রান্ত স্কেলের কোন সংখ্যার সাথে মিলে যায় তা দেখি।" },
        { kind: "p102_ruler", cm: 10, mm: 10, items: [{ obj: "pencil", from: 0, to: 8, arrow: "end" }], callout: { at: 8, align: "center", text: "৮ সেন্টিমিটার" } },
        { text: "অর্থাৎ পেনসিলের দৈর্ঘ্য ৮ সেন্টিমিটার", center: true },
        { kind: "p102_rules", items: [
          ["১।", "বস্তুর যেকোনো প্রান্ত স্কেলের শূন্য প্রান্তে রাখতে হয়।"],
          ["২।", "বস্তুটির অন্য প্রান্ত স্কেলে কোন সংখ্যার সাথে মিলে যায়, তা ভালো করে খেয়াল করতে হয়।"],
        ] },
        // the book prints these two 0–20 rulers with Latin digits (0 1 2 … 20): kept
        { kind: "p102_ex", mark: "sq", text: "খালি ঘর পূরণ করো:", body: [
          { kind: "p102_ruler", cm: 20, mm: 7.4, ticks: "half", latin: true, fs: 3.3, items: [{ obj: "pencil", from: 0, to: 12, label: "১২ সে.মি." }] },
          { kind: "p102_ruler", cm: 20, mm: 7.4, ticks: "half", latin: true, fs: 3.3, items: [{ obj: "eraser", from: 0, to: 5, box: true }, { obj: "pencil", from: 0, to: 9, box: true }] },
        ] },
      ],
    },
    {
      page: 110,
      spread: true,
      blocks: [
        // the book's standing ruler has Latin digits (0–6): kept
        { kind: "p102_heights", cm: 6, mm: 10, latin: true, w: 150, items: [{ obj: "glass", h: 3, x: 28, w: 20, box: 54 }, { obj: "candle", h: 5, x: 98, w: 14, box: 118 }] },
        { kind: "p102_ex", mark: "tri", n: "১", text: "স্কেল বা ফিতা দিয়ে তুমি ও তোমার বন্ধু কলম, পেনসিল, খাতা, প্রাথমিক গণিত পাঠ্যপুস্তক, জ্যামিতি বক্স, ব্ল্যাকবোর্ড ও বেঞ্চের দৈর্ঘ্য ও প্রস্থ প্রভৃতি মেপে একে অন্যকে বলো।", body: [
          { table: { head: ["বস্তু", "দৈর্ঘ্য (সে.মি.)", "প্রস্থ (সে.মি.)"], tone: "pink", left: true, rows: [
            ["খাতা", "…", "…"], ["প্রাথমিক গণিত পাঠ্যপুস্তক", "…", "…"], ["জ্যামিতি বক্স", "…", "…"], ["ব্ল্যাকবোর্ড", "…", "…"], ["বেঞ্চ", "…", "…"],
            ["…", "…", "…"], ["…", "…", "…"], ["…", "…", "…"],
          ] } },
        ] },
      ],
    },
    {
      page: 111,
      title: "ওজন পরিমাপ",
      spread: true,
      blocks: [
        { ask: "কোন বস্তুটি ভারী? ১টি ডাস্টার না ১টি কলম?" },
        { say: "boy", mood: "talk", text: "১টি ডাস্টার এর সাথে ১টি কলমের ওজনের তুলনা করি।" },
        { say: "girl", mood: "talk", text: "এক হাতে ডাস্টার ও অন্য হাতে কলম নিয়ে ওজন তুলনা করি। আমার মনে হয় ডাস্টারের ওজন বেশি হবে।" },
        { say: "boy", mood: "talk", text: "আমারও তাই মনে হয়। আর কলমের সাথে বেলুনের ওজন হাতে নিয়ে তুলনা করলে কলমের ওজন বেশি হবে বলে মনে হয়। এগুলোকে দাঁড়িপাল্লা দিয়ে পরিমাপ করতে পারি।" },
        { text: "ওজন পরিমাপের একক হলো কিলোগ্রাম বা কেজি। কম ওজনের বস্তু মাপতে হলে গ্রাম একক ব্যবহার করা হয়। বস্তুর ওজন পরিমাপ করতে দাঁড়িপাল্লা বা ডিজিটাল মাপনী ব্যবহার করা হয়।" },
        { row: [
          { kind: "p102_unit", head: "ওজনের একক", body: "কিলোগ্রাম বা কেজি\n১ কেজি = ১০০০ গ্রাম" },
          { pic: "p111-weighing", h: 64, w: 110, frame: true },
        ], w: [54], gap: 6, align: "center" },
      ],
    },
    {
      page: 112,
      spread: true,
      blocks: [
        { kind: "p102_ex", mark: "tri", n: "১", text: "এসো আমরা নিচের জিনিসগুলোর ওজন তুলনা করি। কোনটির ওজন সবচেয়ে বেশি? কীভাবে তুলনা করা যায়?", body: [
          { frame: [{ kind: "p102_objs", justify: "space-around", align: "center", items: [
            { objs: { sticker: "eggplant", emoji: "🍆", n: 1, size: 17 } }, { objs: { sticker: "pineapple", emoji: "🍍", n: 1, size: 25 } }, { objs: { sticker: "tomato", emoji: "🍅", n: 1, size: 13 } },
            { objs: { sticker: "cucumber", emoji: "🥒", n: 1, size: 16 } }, { objs: { sticker: "apple", emoji: "🍎", n: 1, size: 13 } }, { objs: { sticker: "banana", emoji: "🍌", n: 1, size: 16 } },
          ] }], pad: 2 },
        ] },
        // the book's 200 g weight says "200" on top (Latin digits) while all the others are Bangla: kept as printed
        { kind: "p102_wgrid", cols: 4, items: [{ v: 5 }, { v: 10 }, { v: 20 }, { v: 50 }, { v: 100 }, { v: 200, top: "200" }, { v: 500 }, { v: 1000, top: "১ কেজি", label: "১০০০ গ্রাম বা\n১ কেজি" }] },
        // the book's 25 g weight says "25" on top (Latin digits): kept as printed
        { kind: "p102_wsplit", left: { v: 25, top: "25", label: "২৫ গ্রাম", foot: "বাটখারা" }, rows: [[10, 10, 5], [20, 5]] },
      ],
    },
    {
      page: 113,
      blocks: [
        { kind: "p102_wsplit", tone: "yellow", left: { v: 50 }, rows: [[20, 20, 10], [20, 10, 10, 5, 5]] },
        { kind: "p102_wsplit", tone: "blue", left: { v: 100, top: "১০০ গ্রাম", foot: "বাটখারা" }, rows: [[50, 50], [50, 20, 20, 10]] },
        { kind: "p102_ex", mark: "tri", n: "২", text: "বিভিন্ন প্রকারের তিন-চারটি বস্তুর ওজন দাঁড়িপাল্লা ও ডিজিটাল মাপনী দিয়ে মেপে তুলনা করে দেখি একই হয় কিনা?", body: [
          { kind: "p102_scales" },
        ] },
      ],
    },
    {
      page: 114,
      title: "তরলের আয়তন পরিমাপ",
      spread: true,
      blocks: [
        { row: [
          { ask: "কোন বোতলে বেশি পানি ধরে? কীভাবে আমরা এই বোতলগুলোর পানির পরিমাণ তুলনা করতে পারি?" },
          { kind: "p102_water", scene: "ask", w: 30 },
        ], w: [null, 32], gap: 3 },
        { frame: [
          { sub: "(১) রেজার পদ্ধতি" },
          { row: [
            { kind: "p102_water", scene: "pour", w: 44 },
            { col: [
              { kind: "p102_say", who: "girl", mood: "think", small: true, text: "কোন বোতলে বেশি পানি আছে? কীভাবে বুঝলে?" },
              { kind: "p102_say", who: "none", small: true, text: "আমি প্রথম বোতল থেকে দ্বিতীয় বোতলে পানি ঢেলেছি।" },
            ], gap: 1.6 },
          ], w: [48], gap: 3 },
        ], tone: "blue", pad: 2.2 },
        { frame: [
          { sub: "(২) তুলির পদ্ধতি" },
          { row: [
            { kind: "p102_water", scene: "mark", w: 66 },
            { col: [
              { kind: "p102_say", who: "boy", mood: "think", small: true, text: "তুমি কীভাবে বুঝবে, কোন বোতলে বেশি পানি আছে?" },
              { kind: "p102_say", who: "girl", mood: "talk", small: true, text: "পাত্রে পানি ঢেলে দাগ দিয়েছি।" },
            ], gap: 1.6 },
          ], w: [68], gap: 3 },
        ], tone: "pink", pad: 2.2 },
        { frame: [
          { sub: "(৩) রাফির পদ্ধতি" },
          { row: [
            { kind: "p102_water", scene: "two", w: 60 },
            { col: [
              { kind: "p102_say", who: "girl", mood: "think", small: true, text: "কোন বোতলে তুমি বেশি পানি পেয়েছ এবং কেন?" },
              { kind: "p102_say", who: "boy", mood: "talk", small: true, text: "আমি একই আকৃতির দুটি পাত্র ব্যবহার করেছি।" },
            ], gap: 1.6 },
          ], w: [68], gap: 3 },
        ], tone: "green", pad: 2.2 },
      ],
    },
  ],
};
