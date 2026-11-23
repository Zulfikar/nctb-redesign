// অধ্যায় ৯ · পরিমাপ: printed pages 121–132 (PDF pages 128–139), every word as printed. Written by a helper (23 Nov 2026).
// দৈর্ঘ্য (pp121–124: km, m, cm, mm; the road, the bridge, the pencil on the ruler, sums with units, the hospital–market–
// post office distances), পরিসীমা (p125), ওজন (pp126–128: kg and g, the weights, the market's goods), তরল পদার্থের আয়তন
// (p129: litre, decilitre, millilitre), ক্ষেত্রফল (pp130–132: comparing shapes, the square centimetre, squared paper).
// Own kinds in content/p121-132.parts.js (c4p121_…). Reused: Class 3's c3p118_unit (the "ওজনের একক" card), c3p118_wset (the
// standard weights; their tops "200 g", "500 g", "1KG" in English as the book prints them), c3p118_say (smaller speech
// cards); Class 2's p011_tab (the table with pictures in its cells).
// The book's ruler (p123) prints Bangla digits: kept. Its p131 square of 1 cm is drawn at true size, as is the ruler and
// p125's rectangle (5 cm × 3 cm) and square (4 cm); pp130–131's shapes and p132's squared paper keep the book's sizes.
// Stickers reused (sticker: "fish", sticker: "watermelon", sticker: "papaya", face: "kid-girl-blue", face: "kid-boy-beige").
const say = (who, mood, text, side) => ({ say: who, mood, text, ...(side ? { side } : {}) });
const ssay = (who, mood, text, o = {}) => ({ kind: "c3p118_say", who, mood, text, ...o });
const X = (b) => ({ kind: "c4p121_x", b });
const steps = (rows, o = {}) => ({ kind: "c4p121_steps", rows, ...o });
const hd = (cells) => ({ type: "hd", cells });
const pic = (name, h, w) => ({ c: [{ kind: "c4p121_fig", items: [{ b: { pic: name, h, ...(w ? { w } : {}) } }] }] });
const W = (v, top, label) => ({ v, top, label });

module.exports = {
  pages: [
    {
      page: 121,
      opener: { title: "পরিমাপ" },
      title: "দৈর্ঘ্য",
      spread: true,
      blocks: [
        // the book puts a space before "।" (dropped)
        { ask: "একটি রাস্তার দৈর্ঘ্য ১৬ কিলোমিটার। রাস্তার দৈর্ঘ্যকে ‘মিটার’-এ প্রকাশ করলে কত হবে?" },
        { pic: "p121-road", h: 44, w: 118, fit: "cover", frame: true },
        say("girl", "talk", "চলো, আমরা দৈর্ঘ্যের এককগুলোর মধ্যকার সম্পর্ক নিয়ে আলোচনা করি।", "left"),
        { kind: "c4p121_units", heads: ["কিমি\n(কিলোমিটার)", "মি\n(মিটার)", "সেমি\n(সেন্টিমিটার)", "মিমি\n(মিলিমিটার)"], rows: [
          { at: 0, l: "১ কিমি", r: "১০০০ মি", c: "pink" },
          { at: 1, l: "১ মি", r: "১০০ সেন্টিমিটার", c: "orange" },
          { at: 2, l: "১ সেমি", r: "১০ মিমি", c: "lime" },
        ] },
        steps([["১ কিলোমিটার", "১০০০ মিটার"], ["১৬ কিলোমিটার", "১৬ × ১০০০ মিটার"], ["", "১৬০০০ মিটার"], ["∴১৬ কিলোমিটার", "১৬০০০ মিটার"]], { indent: 42 }),
      ],
    },
    {
      page: 122,
      dense: true,
      blocks: [
        { ex: "১", mark: "kaj", text: "একটি সেতুর দৈর্ঘ্য ৪ কিলোমিটার ৮০০ মিটার।", body: [
          { row: [
            { col: [
              "(১) সেতুর দৈর্ঘ্য ‘মিটার’ এ প্রকাশ করি।",
              steps([["১ কিলোমিটার", "১০০০ মিটার"], ["৪ কিলোমিটার", "৪ × ১০০০ মিটার"], ["", "৪০০০ মিটার"]], { indent: 8, gap: .4 }),
            ], gap: 1.4 },
            { pic: "p122-bridge", h: 35, w: 56, fit: "cover", frame: true },
          ], w: [0, 60], gap: 3, align: "flex-start" },
          steps([["৪ কিলোমিটার ৮০০ মিটার", "৪০০০ মিটার + ৮০০ মিটার"], ["", "৪৮০০ মিটার"], ["সেতুর দৈর্ঘ্য ৪ কিমি ৮০০ মিটার", "৪৮০০ মিটার"]], { indent: 0, gap: .4 }),
        ] },
        { ex: "১", mark: "anu", text: "‘মিটার’ এবং ‘সেন্টিমিটারে’ প্রকাশ করি।", body: [
          steps([["(১) ৩ কিমি ২৫০ মি", "▭ মি"], ["(২) ৪ মি ২৫ সেমি", "▭ সেমি"]], { indent: 6, left: true, bw: 28, gap: .6 }),
        ] },
        { ex: "২", mark: "kaj", text: "উষাতন চাকমার উচ্চতা ১ মি ৬০ সেমি।", body: [
          { row: [
            { col: [
              "(১) ‘সেমি’-এ প্রকাশ করি",
              steps([["১ মি", "□ সেমি"], ["∴ ১ মি ৬০ সেমি", "□ সেমি"]], { indent: 6, gap: .4 }),
              "(২) ‘মিমি’-এ প্রকাশ করি।",
              steps([["১ সেমি", "□ মিমি"], ["১৬০ সেমি", "□ × □"], ["", "□ মিমি"], ["∴ ১ মি ৬০ সেমি", "□ মিমি"]], { indent: 6, gap: .4 }),
            ], gap: 1.2 },
            { pic: "p122-height", h: 57, w: 48 },
          ], w: [0, 54], gap: 3, align: "flex-start" },
        ] },
        { ex: "২", mark: "anu", text: "‘সেমি’-এ প্রকাশ করি।", body: [
          steps([["(১) ৪ মি ৫৮ সেমি", "▭ সেমি"], ["(২) ৫ মি ৭ সেমি", "▭ সেমি"]], { indent: 6, left: true, bw: 28, gap: .6 }),
        ] },
      ],
    },
    {
      page: 123,
      spread: true,
      blocks: [
        { ex: "৩", mark: "kaj", text: "নিচের পেনসিলটির দৈর্ঘ্যকে ‘সেমি’ এবং ‘মিমি’-এ প্রকাশ করি।", body: [
          // a true-size ruler (Bangla digits, as printed); the pencil reaches 7 cm 9 mm
          { kind: "c4p121_ruler", cm: 13, pencil: 7.9 },
          { row: [
            say("boy", "talk", "পেনসিলের দৈর্ঘ্য ৭ সেমি ও ৯ মিমি"),
            say("girl", "talk", "১ সেমি = ১০ মিমি"),
          ], gap: 4 },
          steps([{ l: "পেনসিলের দৈর্ঘ্য", eq: "", r: "□ সেমি □ মিমি" }, ["", "□ মিমি + □ মিমি"], ["", "□ মিমি"]], { indent: 36 }),
        ] },
        { ex: "৩", mark: "anu", text: "আমাদের চারপাশের বিভিন্ন বস্তু (যেমন– বই, খাতা, রাবার, টেবিল, ইট ইত্যাদি) পরিমাপ করি এবং ‘মি’, ‘সেমি’ এবং ‘মিমি’-এ প্রকাশ করি।" },
        { ex: "৪", mark: "kaj", text: "৫৮৯ মি ৭৫ সেমি-কে ‘সেমি’-এ প্রকাশ করি।", body: [
          steps([["৫৮৯ মি  =  ৫৮৯ × □ সেমি", "□ সেমি"], ["৭৫ সেমি", "□ সেমি"], { line: true }, ["৫৮৯ মি ৭৫ সেমি", "□ সেমি"]], { indent: 6 }),
        ] },
        { ex: "৪", mark: "anu", text: "ম্যারাথনে একজন দৌড়বিদ ৪২ কিমি ১৯৫ মিটার দৌড়ান। তাঁর দৌড়ানোর পথকে মিটারে প্রকাশ করি।" },
      ],
    },
    {
      page: 124,
      dense: true,
      blocks: [
        { ex: "৫", mark: "kaj", text: "মাসুদ বাড়ি থেকে ২ কিমি ৩৬০ মি রাস্তা রিকশায় এবং ৫৭৫ মি রাস্তা পায়ে হেঁটে স্কুলে যায়। মাসুদের বাড়ির থেকে স্কুলের দূরত্ব নির্ণয় করি।", body: [
          { row: [
            ssay("boy", "think", "মোট দূরত্ব বের করতে যোগ করতে হবে। কিন্তু, কীভাবে গাণিতিক বাক্যটি হবে তা বুঝতে পারছি না।"),
            ssay("girl", "talk", "আমার মনে হচ্ছে, দৈর্ঘ্যের একই এককসমূহ ঠিক রেখে যোগ করতে হবে।"),
          ], gap: 3, align: "flex-start" },
          X({ text: "গাণিতিক বাক্যটি হবে ২ কিমি ৩৬০ মি + ৫৭৫ মি = ▭" }),
          // "২কিমি" and "৯৩৫মি" without a space, as printed
          { row: [
            { kind: "c4p121_panel", tone: "lime", body: [{ kind: "c4p121_ucol", items: [{ rows: [["", "২ কিমি", "৩৬০ মি"], ["+", "", "৫৭৫ মি"]], res: ["", "২কিমি", "৯৩৫ মি"] }] }] },
            { kind: "c4p121_panel", tone: "green", body: ["পাশাপাশি যোগ করলে হয়", "২ কিমি ৩৬০ মি + ৫৭৫ মি = ২ কিমি ৯৩৫মি"] },
          ], w: [58, 0], gap: 3, align: "stretch" },
        ] },
        { ex: "৫", mark: "anu", text: "নিচের যোগ এবং বিয়োগগুলো করি।", body: [
          { kind: "c4p121_ucol", cols: 3, items: [
            { mark: "(১)", rows: [["", "৫৫ সেমি", "৯ মিমি"], ["+", "৮ সেমি", "৫ মিমি"]] },
            { mark: "(২)", rows: [["", "৭৩৫ মি", "৪৩ সেমি"], ["−", "২৭৭ মি", "৩৭ সেমি"]] },
            { mark: "(৩)", rows: [["", "৭৩ কিমি", "১৯৯ মি"], ["−", "৪৯ কিমি", "৭৮ মি"]] },
          ] },
          { sums: ["৩৩ সেমি ৬ মিমি + ২১ সেমি ৩ মিমি", "৫৬ মি ৫৫ সেমি + ১৮ মি ৬৫ সেমি", "৪৫ কিমি ২৫০ মি − ২৪ কিমি ৫০০ মি", "৫ কিমি ৩২০ মি − ২ কিমি ৪৮০ মি"], cols: 2, marks: true, start: 4, size: 12 },
        ] },
        { ex: "৬", mark: "anu", text: "সাদিদ তার বাড়ি থেকে ২৮০ মিটার পথ হেঁটে ও ৫৫০ মিটার পথ রিকশায় চড়ে বিদ্যালয়ে যায়। বিদ্যালয়ে যেতে সে কত সেমি পথ অতিক্রম করে?" },
        { ex: "৭", mark: "anu", text: "হাসপাতাল থেকে একই দিকে বাজারের দূরত্ব ৮৪৫ মি এবং পোস্ট অফিসের দূরত্ব ১ কিমি ২০০ মি। বাজার থেকে পোস্ট অফিসের দূরত্ব বের করে ‘সেমি’-এ প্রকাশ করি।", body: [
          // the hospital (left), the market (middle), the post office (right): the two distances drawn on the picture
          // the user's picture (23 Nov): cropped low (pos) so its bare ground shows, and the arrows run on it
          { kind: "c4p121_scene", pic: "p124-hospital-market-post", w: 160, h: 52, pos: "50% 60%",
            arrows: [{ p0: [14.5, 81], p1: [34, 92], p2: [55, 86] }, { p0: [14.5, 81], p1: [50, 110], p2: [87, 85] }],
            tags: [{ x: 34.5, y: 80, text: "৮৪৫ মি" }, { x: 70, y: 87, text: "১ কিমি ২০০ মি", rot: -6 }] },
        ] },
      ],
    },
    {
      page: 125,
      title: "পরিসীমা",
      dense: true,
      blocks: [
        { ask: "একটি টেবিলের চারপাশের মোট দৈর্ঘ্যকে কী বলে?" },
        { row: [
          say("boy", "talk", "আমাদের শ্রেণিকক্ষের টেবিলের উপরের চারধারের মোট দৈর্ঘ্য মেপে দেখি।"),
          { pic: "p125-table", h: 36 },
        ], w: [0, 52], gap: 3 },
        "টেবিলের চারধারের মোট দৈর্ঘ্য\n= □ সেমি + □ সেমি + □ সেমি + □ সেমি = □ সেমি",
        say("parrot", "talk", "কোনো আকৃতির বাহুগুলোর মোট দৈর্ঘ্যই হলো ঐ আকৃতির পরিসীমা।"),
        { ex: "১", mark: "anu", text: "নিচের আয়ত এবং বর্গের পরিসীমা নির্ণয় করি।", body: [
          // true size: 5 cm × 3 cm and 4 cm × 4 cm
          { kind: "c4p121_rects", items: [
            { label: "ক)", w: 50, h: 30, left: "৩ সেমি", bottom: "৫ সেমি" },
            { label: "খ)", w: 40, h: 40, left: "৪ সেমি" },
          ] },
        ] },
        { ex: "২", mark: "anu", text: "শ্রেণিকক্ষের বস্তুগুলো পরিমাপ করে পরিসীমা হিসাব করি।", body: [
          { table: { head: ["বস্তু", "দৈর্ঘ্য", "প্রস্থ", "পরিসীমা"], rows: [["বেঞ্চ", "", "", ""], ["বোর্ড", "", "", ""], ["বই", "", "", ""], ["শ্রেণিকক্ষ", "", "", ""]], tone: "pink" } },
        ] },
      ],
    },
    {
      page: 126,
      title: "ওজন",
      spread: true,
      blocks: [
        { ask: "২৫ কিলোগ্রাম চালের বস্তার ওজন কীভাবে গ্রামে প্রকাশ করব?" },
        { row: [
          say("boy", "talk", "চলো, আমরা ওজনের একক স্মরণ করি।"),
          { kind: "c4p121_fig", items: [{ b: { pic: "p126-rice-sack", h: 28, w: 24 }, cap: "২৫ কেজি" }] },
        ], w: [0, 40], gap: 3 },
        { kind: "c3p118_unit", head: "ওজনের একক", body: "১ কিলোগ্রাম (কেজি) = ১০০০ গ্রাম (গ্রা)" },
        say("girl", "talk", "তাহলে চালের বস্তার ওজন হবে", "left"),
        steps([["১ কেজি", "১০০০ গ্রাম হলে,"], ["২৫ কেজি", "(২৫ × ১০০০) গ্রাম"], ["", "২৫০০০ গ্রাম"]], { indent: 40 }),
        { ex: "১", mark: "kaj", text: "সবজিভর্তি একটি ব্যাগের ওজন ৬ কেজি ২৫৮ গ্রাম। এ ওজনকে ‘গ্রাম’-এ প্রকাশ করি।", body: [
          { row: [
            // "(৬ × ১০০০)গ্রাম" and "সবজি ভর্তি" as printed; the last line has no "="
            steps([["৬ কেজি  =  (৬ × ১০০০)গ্রাম", "▭ গ্রাম"], ["২৫৮ গ্রাম", "▭ গ্রাম"], { line: true }, { l: "সবজি ভর্তি ব্যাগের ওজন", eq: "", r: "▭ গ্রাম" }], { indent: 2, bw: 20 }),
            { pic: "p126-vegetable-bag", h: 44, w: 42 },
          ], w: [0, 44], gap: 3, align: "flex-end" },
        ] },
      ],
    },
    {
      page: 127,
      dense: true,
      // "২০০" (২০০ গ্রাম under the 200 g weight), checked by eye: tesseract misreads the weights' labels
      allow: ["২০০"],
      blocks: [
        { ex: "২", mark: "kaj", text: "নিচের জিনিসগুলোর ওজন পরিমাপ করতে কোন কোন বাটখারা লাগবে তা নির্ধারণ করি এবং জিনিসগুলোর ওজন ‘গ্রাম’-এ প্রকাশ করি।", body: [
          "[একটি করে দেখানো হলো]",
          { kind: "p011_tab", tone: "blue", cols: ["26%", "24%", "30%", "20%"], rows: [
            hd(["দ্রব্য", "ওজন", "বাটখারা", "গ্রামে প্রকাশ"]),
            { cells: [{ c: [{ kind: "c4p121_fig", items: [{ b: { objs: { sticker: "fish", emoji: "🐟", n: 1, size: 18 } } }] }] }, "১ কেজি ৫৭৫ গ্রাম", "১ কেজি,  ৫০০ গ্রা,\n৫০ গ্রাম,  ২০ গ্রা,  ৫ গ্রা", "১৫৭৫  গ্রাম"], h: 19 },
            { cells: [pic("p127-orange-box", 16, 32), "২ কেজি ৫০০ গ্রাম", "", "___ গ্রাম"], h: 19 },
            { cells: [pic("p127-pumpkin", 16, 26), "৩ কেজি ৩২৫ গ্রাম", "", "___ গ্রাম"], h: 19 },
            { cells: [pic("p127-fruit-basket", 16, 22), "৪ কেজি ৮১৫ গ্রাম", "", "___ গ্রাম"], h: 19 },
          ] },
        ] },
        // the book's weights: "200 g", "500 g", "1KG" printed on them in English; the small ones' tops, unreadable in the book, in the same form
        { kind: "c3p118_wset", head: "আদর্শ বাটখারা", k: 1.05, rows: [
          [W(5, "5 g", "৫ গ্রাম"), W(10, "10 g", "১০ গ্রাম"), W(20, "20 g", "২০ গ্রাম"), W(50, "50 g", "৫০ গ্রাম"), W(100, "100 g", "১০০ গ্রাম"), W(200, "200 g", "২০০ গ্রাম"), W(500, "500 g", "৫০০ গ্রাম")],
          [{ ...W(1000, "1KG", "১ কিলোগ্রাম"), side: true }],
        ] },
        X({ ex: "৩", mark: "kaj", text: "একটি তরমুজের ওজন ৩ কেজি ৪০০ গ্রাম এবং একটি পেঁপের ওজন ৯০০ গ্রাম। পেঁপে থেকে তরমুজের ওজন কত বেশি?", body: [
          { row: [
            { objs: { sticker: "watermelon", emoji: "🍉", n: 1, size: 28 } },
            { objs: { sticker: "papaya", emoji: "🥭", n: 1, size: 22 } },
          ], w: [40, 40], gap: 16, justify: "center", align: "flex-end" },
          "গাণিতিক বাক্যটি হবে : ৩ কেজি ৪০০ গ্রাম − ৯০০ গ্রাম = ▭",
        ] }),
      ],
    },
    {
      page: 128,
      dense: true,
      spread: true,
      blocks: [
        ssay("boy", "talk", "ওজন কত বেশি তা বের করতে বিয়োগ করতে হবে।"),
        ssay("girl", "talk", "বড়ো থেকে ছোটো সংখ্যা বিয়োগ করতে হবে এবং এখানে এককের দিকে লক্ষ রাখতে হবে।"),
        { row: [
          // the first line is the regrouped one: 3 kg 400 g as 2 kg and (1000 + 400) g
          { kind: "c4p121_ucol", items: [{ top: true, rows: [["", "২ কেজি", "□ গ্রাম"], ["", "৩ কেজি", "৪০০ গ্রাম"], ["−", "", "৯০০ গ্রাম"]], res: ["", "২ কেজি", "□ গ্রাম"] }] },
          { kind: "c4p121_box", text: "[৪০০ গ্রাম থেকে ৯০০ গ্রাম বিয়োগ করা যাবে না। তাই কেজির ঘর থেকে ১ কেজি (=১০০০ গ্রাম) গ্রামের ঘরে সরিয়ে বিয়োগ করতে হবে।]" },
        ], w: [62, 0], gap: 4 },
        "তরমুজের ওজন ২ কেজি ৫০০ গ্রাম বেশি।",
        { ex: "১", mark: "anu", text: "নিচের যোগ ও বিয়োগগুলো করি।", body: [
          { kind: "c4p121_ucol", cols: 3, items: [
            { mark: "(১)", rows: [["", "২ কেজি", "৪৫০ গ্রাম"], ["+", "৩ কেজি", "৮০০ গ্রাম"]] },
            { mark: "(২)", rows: [["", "১ কেজি", "৬৫৫ গ্রাম"], ["+", "৪ কেজি", "৭৫০ গ্রাম"]] },
            { mark: "(৩)", rows: [["", "৫ কেজি", "২২০ গ্রাম"], ["−", "২ কেজি", "৬৫০ গ্রাম"]] },
          ] },
          { sums: ["২ কেজি ৩৮০ গ্রাম + ১ কেজি ৫৫০ গ্রাম", "৭ কেজি ৬৭০ গ্রাম + ৮৮০ গ্রাম", "৮ কেজি ৭৮৫ গ্রাম − ২ কেজি ৪৫০ গ্রাম", "১২ কেজি ৪২৫ গ্রাম − ৮৩৫ গ্রাম"], cols: 2, marks: true, start: 4, size: 12 },
        ] },
        { ex: "২", mark: "anu", text: "নিচের দ্রব্যগুলোর ওজন একত্র করে তা ‘কেজি’ এবং ‘গ্রাম’-এ প্রকাশ করি।", body: [
          { kind: "c4p121_fig", items: [
            { b: { pic: "p128-bottle-gourd", h: 26, w: 22 }, cap: "২ কেজি ১৩৫ গ্রাম" },
            { b: { objs: { sticker: "fish", emoji: "🐟", n: 1, size: 26 } }, cap: "৯২০ গ্রাম" },
            { b: { pic: "p128-onion-basket", h: 22, w: 27 }, cap: "১ কেজি ৬৫০ গ্রাম" },
          ] },
        ] },
        X({ ex: "৩", mark: "anu", text: "৩ কেজি ৬৫০ গ্রা − ১ কেজি ৪০০ গ্রা = ▭", body: ["সমস্যাটি সমাধান করে গাণিতিক বাক্যটি দিয়ে একটি গল্প তৈরি করি।"] }),
      ],
    },
    {
      page: 129,
      title: "তরল পদার্থের আয়তন",
      dense: true,
      blocks: [
        { ask: "আমরা তরল পদার্থের আয়তন পরিমাপের জন্য কোন কোন একক ব্যবহার করি?" },
        // the five things, each over its volume
        { kind: "c4p121_fig", gap: 2, items: [
          { b: { pic: "p129-juice-bottle", h: 30, w: 24 }, cap: "১ লিটার\nবা\n১০০০ মিলি" },
          { b: { pic: "p129-water-bottle-500", h: 30, w: 24 }, cap: "৫০০ মিলি\nবা\n৫ ডেলি" },
          { b: { pic: "p129-water-bottle-250", h: 30, w: 24 }, cap: "২৫০ মিলি\nবা\n২.৫ ডেলি" },
          { b: { pic: "p129-handwash", h: 30, w: 26 }, cap: "২০০ মিলি\nবা\n২ ডেলি" },
          { b: { pic: "p129-syringe", h: 30, w: 22 }, cap: "৫ মিলি\nবা\n০.০৫ ডেলি" },
        ] },
        { row: [
          { table: { head: ["লিটার\n(লি)", "ডেসিলিটার\n(ডেলি)", "মিলিলিটার\n(মিলি)"], rows: [["১ লি", "১০ ডেলি", "১০০০ মিলি"], ["", "১ ডেলি", "১০০ মিলি"]], tone: "blue" } },
          { kind: "c4p121_box", align: "left", text: "[তরল পদার্থের ক্ষুদ্রতর পরিমাণ পরিমাপের জন্য আমরা ‘লিটার (লি)’, ‘ডেসিলিটার (ডেলি)’ এবং ‘মিলিলিটার (মিলি)’ ব্যবহার করি।]" },
        ], w: [84, 0], gap: 5 },
        // কাজ ১ has no heading line: its marker stands beside the girl's words
        { kind: "c4p121_exr", ex: "১", mark: "kaj", body: [
          ssay("girl", "talk", "আমাদের প্রত্যেকের পানির বোতলে কতটুকু পরিমাণ পানি আছে তা মাপনী দিয়ে মেপে দেখি।"),
          { row: [
            { kind: "c4p121_beaker", h: 25 },
            { col: [
              X({ text: "বোতলে পানির পরিমাণ ▭ মিলি" }),
              ssay("boy", "talk", "আমাদের শ্রেণিতে সবচাইতে বেশি পানি কার বোতলে আছে তা খুঁজে বের করি।"),
            ], gap: 2 },
          ], w: [34, 0], gap: 4 },
        ] },
        { ex: "২", mark: "kaj", text: "সজল ১ লিটার দুধ কিনে তা থেকে ৩০০ মিলি পান করল। সজলের কাছে আর কতটুকু দুধ অবশিষ্ট রয়েছে তা বন্ধুদের সঙ্গে আলোচনা করি।", body: [
          // মুমু (left) works in millilitres, মিঠুন (right) in litres
          { row: [
            { say: "kid", face: "kid-girl-blue", color: "#DB2777", text: "১ লি = ১০০০ মিলি\nঅতএব,\n১০০০ − ৩০০ = ৭০০\nঅবশিষ্ট : ৭০০ মিলি" },
            { say: "kid", face: "kid-boy-beige", color: "#0D9488", side: "right", text: "৩০০ মিলি = ০.৩ লি\nঅতএব,\n১ − ০.৩ = ০.৭\nঅবশিষ্ট : ০.৭ লি" },
          ], gap: 4 },
          { text: "দুইটি পদ্ধতিই সঠিক। মুমু মিলিলিটারে এবং মিঠুন লিটারে প্রকাশ করেছে।", center: true },
        ] },
      ],
    },
    {
      page: 130,
      title: "ক্ষেত্রফল",
      spread: true,
      blocks: [
        { ask: "কোনো তলের আকার কীভাবে বর্ণনা করতে হয়?" },
        // ক and খ at the book's sizes (mm). As printed, খ (41.3 × 21.9) is drawn larger than ক (28.5 × 28), though the text
        // says ক takes more room: the book's slip, kept (see the report)
        { ex: "১", mark: "kaj", text: "তুলনা করে দেখি কোনটি বেশি জায়গা দখল করে ‘ক’ নাকি ‘খ’।", body: [
          { kind: "c4p121_shapes", gap: 20, justify: "center", items: [{ label: "(ক)", w: 28.5, h: 28, fill: "sky" }, { label: "(খ)", w: 41.3, h: 21.9, fill: "pink" }] },
          ssay("boy", "talk", "আমার মনে হয়, পাতলা কাগজের উপর এঁকে নিয়ে অথবা এগুলোকে কেটে অথবা একটির উপর আরেকটি রেখে তুলনা করা যেতে পারে।"),
          { kind: "c4p121_overlay", a: [28.5, 28, "sky"], b: [41.3, 21.9, "pink"], mix: "#B684B1", gap: 26 },
          { text: "‘ক’ আকৃতিটি ‘খ’-এর চেয়ে বেশি জায়গা দখল করেছে।", center: true },
        ] },
        say("parrot", "talk", "কোনো আকৃতি যতটুকু জায়গা দখল করে সেটিই তার ক্ষেত্র।", "left"),
        say("girl", "talk", "তাহলে একটি আয়ত যে জায়গা দখল করে তা আয়তক্ষেত্র।"),
      ],
    },
    {
      page: 131,
      spread: true,
      blocks: [
        say("boy", "talk", "যদি আমরা কাটতে কিংবা আঁকতে না পারি, তবে আকারগুলোর উপর এমন কোনো বস্তু স্থাপন করি যাতে ঐ বস্তু কতটুকু স্থান দখল করে তার উপর ভিত্তি করে তুলনা করতে পারি।"),
        // the same two shapes (the book's sizes), three small tiles laid along the bottom of each
        { kind: "c4p121_shapes", gap: 30, justify: "center", items: [{ w: 28.5, h: 28.5, fill: "#5B86C8", tiles: [3, 5.4, 4.2] }, { w: 41.3, h: 22.3, fill: "pink", tiles: [3, 5.4, 4.2] }] },
        say("girl", "talk", "হ্যাঁ, তুমি ঠিকই বলেছ, কিন্তু আমার মনে হয় না এগুলো যথেষ্ট। আমাদের আদর্শ মানের একটি সুনির্দিষ্ট একক থাকা প্রয়োজন।"),
        say("parrot", "talk", "কোনো ক্ষেত্র যতটুকু পরিমাণ স্থান দখল করে, সেই পরিমাণ স্থানকে ‘ক্ষেত্রফল’ বলে। ক্ষেত্রফলকে বর্গ একক দ্বারা প্রকাশ করা হয়।", "left"),
        { row: [
          { col: ["১ সেমি বাহুবিশিষ্ট বর্গের ক্ষেত্রফল ১ বর্গ সেমি এবং একে ১ বর্গ সেমিরূপে লেখা হয়।", "১ বর্গ সেমি ক্ষেত্রফল পরিমাপের একটি একক।"], gap: 2 },
          // the square centimetre at true size
          { kind: "c4p121_rects", items: [{ w: 10, h: 10, fill: "#DB5C8A", ink: "#fff", inside: ["১", "বর্গ সেমি"], ifs: 2.05, left: "১ সেমি", bottom: "১ সেমি", fs: 3.8, bul: 2.2, bulb: 2.2 }] },
        ], w: [0, 36], gap: 4 },
        say("boy", "talk", "ক্ষেত্রফল নির্ণয় করার জন্য আমরা ঐ সমতলের উপর ১ বর্গ সেমি ক্ষেত্রফলবিশিষ্ট বর্গ রাখতে পারি এবং তাদের সংখ্যা গণনা করি।"),
        say("girl", "talk", "হ্যাঁ, এক্ষেত্রে আমরা ছক কাগজের ১ সেমি × ১ সেমি ঘরগুলোও বিবেচনা করতে পারি।"),
      ],
    },
    {
      page: 132,
      dense: true,
      // "৪" (the squares numbered in ক and খ), checked by eye: tesseract can't read the digits in the coloured squares
      allow: ["৪"],
      blocks: [
        { ex: "২", mark: "kaj", text: "কোনটি বৃহত্তর, ‘ক’ নাকি ‘খ’? এদের ক্ষেত্রফলের পার্থক্য কত বর্গ সেমি?", body: [
          // 14 × 7 squares: ক 5 × 5 (its top-right square marked), খ 6 × 4, counted down the columns as the book numbers them
          { kind: "c4p121_grid", cols: 14, rows: 7, s: 10, fills: [[1, 1, 5, 5, "blue"], [5, 1, 1, 1, "magenta"], [7, 2, 6, 4, "red"]],
            texts: [[1.5, .72, "ক"], [1.5, 1.74, "১"], [2.5, 1.74, "৬"], [1.5, 2.74, "২"], [1.5, 3.74, "৩"], [1.5, 4.74, "৪"], [1.5, 5.74, "৫"],
              [5.95, .42, "১ বর্গ সেমি", { size: .3 }], [7.5, 1.72, "খ"],
              [7.5, 2.74, "১"], [8.5, 2.74, "৫"], [7.5, 3.74, "২"], [8.5, 3.74, "৬"], [7.5, 4.74, "৩"], [7.5, 5.74, "৪"]],
            arrows: [[5.82, .55, 5.82, 1.22]] },
          "ক এর ক্ষেত্রফল [[২৫]] টি ১ বর্গ সেমি অতএব, এটির ক্ষেত্রফল □ বর্গ সেমি।",
          "খ এর ক্ষেত্রফল □ টি ১ বর্গ সেমি অতএব, এটির ক্ষেত্রফল □ বর্গ সেমি।",
          "□ অপেক্ষা □ বৃহত্তর এবং এদের ক্ষেত্রফলের পার্থক্য □ বর্গ সেমি।",
        ] },
        { ex: "১", mark: "anu", text: "নিচের আকৃতিগুলোর প্রত্যেকটির ক্ষেত্রফল কত বর্গ সেমি?", body: [
          // 14 × 12 squares, the shapes exactly as printed: ক 3 × 2; খ two steps of 2; গ a triangle (base 3, height 2);
          // ঘ 1 + 3 + 5; ঙ 5 and 3 down; চ 2 × 2; ছ 3 + 4 + 4; জ three half squares (the bottom halves of a row)
          { kind: "c4p121_grid", cols: 14, rows: 12, s: 7.1, below: 4.4,
            fills: [[1, 1, 3, 2, "orange"], [6, 1, 1, 2, "orange"], [7, 2, 1, 2, "orange"],
              [3, 4, 1, 1, "orange"], [2, 5, 3, 1, "orange"], [1, 6, 5, 1, "orange"],
              [8, 5, 5, 1, "orange"], [12, 6, 1, 3, "orange"], [4, 8, 2, 2, "orange"],
              [8, 8, 3, 1, "orange"], [7, 9, 4, 2, "orange"], [0, 10.5, 3, .5, "orange"]],
            polys: [[[[10, 3], [11.5, 1], [13, 3]], "orange"]],
            texts: [[1.5, .62, "ক"], [6.5, .62, "খ"], [11.5, .62, "গ"], [1.5, 4.5, "ঘ"], [8.5, 4.5, "ঙ"], [3.4, 8.92, "চ"], [7.4, 8.92, "ছ"], [1.5, 10.4, "জ"],
              [12.5, 11.42, "১", { size: .34 }], [12.5, 11.86, "সেমি", { size: .34 }], [14, 12.55, "১ সেমি", { size: .36, anchor: "end" }]],
            paths: [["M13 11.06C12.72 11.62 13.1 12.3 14 12.1", true]] },
        ] },
      ],
    },
  ],
};
