// অধ্যায় ১০ বাংলাদেশি মুদ্রা: printed pages 107–117 (PDF pages 113–123), every word as printed.
// Own kinds (c3p107_…) are in p107-117.parts.js: the paisa coins drawn by code (১, ৫, ১০, ২৫, ৫০ পয়সা), money in rows,
// columns and stacks (Class 2's p115_cash notes and taka coins), icons in text, টাকা-পয়সা column sums, a sum with brackets,
// a table with joined cells, the money boxes with their labels, the shop's price list.
// Every note and coin is drawn with its value, exactly as many as the book shows, in the book's order and places.
const cash = (items, o = {}) => ({ kind: "c3p107_cash", items, ...o });
const ic = (b) => ({ kind: "c3p107_ic", b });
const tp = (rows, total, o = {}) => ({ kind: "c3p107_tp", rows, total, ...o });
const T = (o) => ({ kind: "c3p107_table", ...o });
const pill = (text, o = {}) => ({ kind: "c3p107_pill", text, ...o });
const chip = (text, tone, o = {}) => ({ kind: "c3p107_chip", text, tone, ...o });
const box = (w, h) => ({ kind: "c3p107_abox", w, h });
const arrow = (w = 18) => ({ kind: "p115_arrow", dir: "right", w, h: 4.4 });
const L = (c) => ({ c, al: "left" });
// a coin with its name under it (p111)
const named = (m, cap) => ({ m, cap });

module.exports = {
  pages: [
    {
      page: 107,
      opener: { title: "বাংলাদেশি মুদ্রা" },
      spread: true,
      // the coins carry their own values (১, ১০, ৫, ২৫, ৫০ পয়সা) as the book's coin photos do; the OCR does not read
      // them from the photos; and it reads the girl's "জিনিসপত্র" as "পত্র"; checked by eye
      allow: ["২৫", "৫০", "জিনিসপত্র"],
      blocks: [
        { ask: "নিচের ছবিগুলো কীসের?" },
        // the book's five coins, in its order: ১ পয়সা (unlabelled in the book, its face shows ১), ১০, ৫, ২৫, ৫০ পয়সা
        cash(["p1", "p10", "p5", "p25", "p50"], { cw: 25, gap: 9 }),
        // "ধারণা নিই" as printed
        { say: "boy", mood: "talk", text: "আমার ধারণা নিই এগুলো কীসের ছবি। তবে দ্বিতীয় শ্রেণির বইয়ের ধাতব মুদ্রার মতো দেখতে।" },
        { say: "girl", mood: "talk", text: "আমার মনে হয় এগুলো পয়সার ছবি। আমি শুনেছি পয়সা দিয়ে আগে জিনিসপত্র কেনা যেত।" },
        { ex: "১", mark: "kaj", text: "নিচের ছবিতে কী কী পয়সা আছে খুঁজে বের করি।", body: [
          { text: "ধাতব মুদ্রার সঙ্গে নোটের মিল", center: true, big: true },
          T({ head: ["ধাতব মুদ্রা", "", "কাগজের নোট"], widths: [33, 30, 37], rowh: 17, rows: [
            [cash(["c1"], { cw: 15 }), "১ টাকা", cash([1], { w: 44 })],
            [cash(["c2"], { cw: 15 }), "২ টাকা", cash([2], { w: 44 })],
            [cash(["c5"], { cw: 15 }), "৫ টাকা", cash([5], { w: 44 })],
          ] }),
        ] },
      ],
    },
    {
      page: 108,
      spread: true,
      blocks: [
        { row: [{ say: "boy", mood: "think", text: "পয়সা ও টাকার সম্পর্ক কী?" }, { say: "girl", mood: "talk", text: "চলো, তাদের সম্পর্ক দেখি।" }], gap: 3 },
        { frame: [{ row: [
          { col: [
            { row: [cash(["p50"], { cw: 19 }), "ও", cash(["p50"], { cw: 19 }), "একত্রে", cash(["c1"], { cw: 23 })], w: [21, 7, 21, 20, 42], gap: 3, justify: "flex-start" },
            { row: [cash(["p50"], { cw: 19 }), "ও", cash(["p50"], { cw: 19 }), "একত্রে", cash([1], { w: 58 })], w: [21, 7, 21, 20, 42], gap: 3, justify: "flex-start" },
          ], gap: 3 },
          { kind: "c3p107_curly", h: 46, w: 7 },
          chip("একই", "yellow", { big: true }),
        ], w: [130, 7, null], gap: 2, justify: "flex-start" }], pad: 2.6 },
        pill("৫০ পয়সা + ৫০ পয়সা = ১ টাকা"),
        { say: "boy", mood: "talk", text: "১০০ পয়সা ও ১ টাকা সমমূল্যের। টাকা ও পয়সা কীভাবে পড়তে ও অঙ্কে লিখতে হয় তুমি কি জানো?" },
        ic({ say: "girl", mood: "talk", text: "হ্যাঁ জানি, যেমন ‹n20:17› ও ‹p50:8.6› একসাথে থাকলে বিশ টাকা পঞ্চাশ পয়সা পড়তে হয় এবং ২০ টাকা ৫০ পয়সা লিখতে হয়।" }),
        { say: "parrot", text: "চলো, আমরা নিচের টাকা পয়সা চিনে পড়ি এবং অঙ্কে লিখি।" },
        cash([100, 50, 5, "p5", "p10"], { w: 38, cw: 17, gap: 3 }),
        pill("এখানে, ১০০ টাকা + ৫০ টাকা + ৫ টাকা = ১৫৫ টাকা এবং ৫ পয়সা + ১০ পয়সা = ১৫ পয়সা।\nসুতরাং, আমরা লিখব ১৫৫ টাকা ১৫ পয়সা।", { left: true, size: 12.5 }),
      ],
    },
    {
      page: 109,
      dense: true,
      blocks: [
        { frame: [cash([500, 20, "p50", "p50", "p25"], { w: 38, cw: 17, gap: 4 })], pad: 2.4 },
        pill("৫০০ টাকা + ২০ টাকা = ৫২০ টাকা\n৫০ পয়সা + ৫০ পয়সা + ২৫ পয়সা = ১২৫ পয়সা\nআমরা শিখেছি, ১০০ পয়সা = ১ টাকা, তাহলে ১২৫ পয়সা = ১ টাকা ২৫ পয়সা\nআমরা লিখব (৫২০+১) টাকা ২৫ পয়সা, হিসাবটি লিখব ৫২১ টাকা ২৫ পয়সা", { left: true, size: 12.5 }),
        { ex: "২", mark: "kaj", text: "ছবি দেখে অঙ্কে লিখি", body: [
          T({ head: ["ছবি", "অঙ্কে"], widths: [68, 32], rowh: 15, rows: [
            [L(cash([500, "p50", "p25"], { w: 28, cw: 12.5, gap: 2.4, justify: "flex-start" })), "৫০০ টাকা ৭৫ পয়সা"],
            [L(cash([100, 100, "p25", "p5"], { w: 28, cw: 12.5, gap: 2.4, justify: "flex-start" })), "…"],
            [L(cash([500, 10, "p10", "p50"], { w: 28, cw: 12.5, gap: 2.4, justify: "flex-start" })), "…"],
            [L(cash([200, 5, "p50", "p25"], { w: 28, cw: 12.5, gap: 2.4, justify: "flex-start" })), "…"],
          ] }),
        ] },
        { ex: "৩", mark: "kaj", text: "পড়ি এবং অঙ্কে লিখি", body: [
          T({ head: ["কথায়", "অঙ্কে"], widths: [68, 32], rowh: 7.6, small: true, rows: [
            [L("ক) বারো টাকা পঁয়তাল্লিশ পয়সা"), "১২ টাকা ৪৫ পয়সা"],
            [L("খ) পাঁচ শত টাকা বাষট্টি পয়সা"), "…"],
            [L("গ) সাত শত পঁচিশ টাকা পঁচাত্তর পয়সা"), "…"],
            [L("ঘ) এক হাজার দুই শত টাকা পঞ্চাশ পয়সা"), "…"],
            [L("ঙ) নয় শত পঞ্চান্ন টাকা ত্রিশ পয়সা"), "…"],
            [L("চ) তিন হাজার আট শত পঁচিশ টাকা বত্রিশ পয়সা"), "…"],
          ] }),
        ] },
      ],
    },
    {
      page: 110,
      spread: true,
      blocks: [
        { ask: "যদি ১০ টাকার ২টি নোট এবং ৫০০ টাকার ২টি নোট থাকে, তবে টাকার পরিমাণ কত?" },
        { say: "boy", mood: "talk", text: "সংখ্যার হিসাব যেভাবে করেছি, এখানেও সেভাবে করা যায়।" },
        { row: [
          { frame: [{ row: [cash([], { rows: [[10], [10]], w: 36, rgap: 1.4 }), arrow(13), cash([20], { w: 33 })], w: [30, 13, null], gap: 2 },
            { kind: "c3p107_text", text: "১০ টাকার ২টি নোট ও ২০ টাকা সমমূল্যের", center: true, size: 11.5 }], pad: 2.4 },
          { frame: [{ row: [cash([], { rows: [[500], [500]], w: 30, rgap: 1.4 }), arrow(13), cash([1000], { w: 30 })], w: [30, 13, null], gap: 2 },
            { kind: "c3p107_text", text: "৫০০ টাকার ২টি নোট ও ১০০০ টাকা সমমূল্যের", center: true, size: 11.5 }], pad: 2.4 },
        ], gap: 4, align: "stretch" },
        pill("টাকার পরিমাণ হবে ১০০০ + ২০ = ১০২০ টাকা"),
        { ex: "১", mark: "anu", text: "মুদ্রা বিনিময় করি", body: [
          { row: [
            { frame: [{ row: [cash([20, 20, 20, 20, 20], { stack: [2.6, 3.4], w: 32 }), arrow(11), box(17, 12)], w: [40, 11, 17], gap: 2, justify: "flex-start" }], pad: 3 },
            { frame: [{ row: [cash([200], { w: 34 }), arrow(11), box(17, 12)], w: [40, 11, 17], gap: 2, justify: "flex-start" }], pad: 3 },
          ], gap: 4, align: "stretch" },
          { row: [
            { frame: [{ row: [cash([5, 5], { stack: [6, 6.5], w: 36 }), arrow(11), box(17, 12)], w: [40, 11, 17], gap: 2, justify: "flex-start" }], pad: 3 },
            { frame: [{ row: [cash([10], { w: 40 }), arrow(11), box(17, 12)], w: [40, 11, 17], gap: 2, justify: "flex-start" }], pad: 3 },
          ], gap: 4, align: "stretch" },
        ] },
      ],
    },
    {
      page: 111,
      spread: true,
      blocks: [
        { ex: "২", mark: "anu", text: "সমাধান করি", body: [
          { sums: [
            "(১) ৫ টাকার ২০টি নোট = □ টাকা", "(৭) ১০০ টাকার ৫টি নোট = □ টাকা",
            "(২) ৫০ টাকার ৪টি নোট = □ টাকা", "(৮) ৫০০ টাকার ২টি নোট = □ টাকা",
            "(৩) ২০ টাকার ১০টি নোট = □ টাকা", "(৯) ১০ টাকার □টি নোট = ২০০ টাকা",
            "(৪) ১০ টাকার ৫টি নোট = □ টাকা", "(১০) ১০০ টাকার □টি নোট = ১০০০ টাকা",
            "(৫) ১ টাকার ১০০টি নোট = □ টাকা", "(১১) ৫ টাকার □টি নোট = ১০০ টাকা",
            "(৬) ২ টাকার ৫০টি নোট = □ টাকা", "(১২) ২০ টাকার □টি নোট = ২০০ টাকা",
          ], cols: 2, size: 12.5 },
        ] },
        { ex: "১", mark: "kaj", text: "হিসাব করি", body: [
          { row: [
            { frame: [cash([named("p10", "১০ পয়সা"), named("p5", "৫ পয়সা"), named("p5", "৫ পয়সা")], { cw: 15, gap: 2.4 })], pad: 1.6 },
            "ও",
            { frame: [cash([named("p25", "২৫ পয়সা"), named("p25", "২৫ পয়সা")], { cw: 15, gap: 2.4 })], pad: 1.6 },
            "একত্রে", box(26, 13),
          ], w: [58, 6, 42, 16, null], gap: 2.4, justify: "flex-start" },
          { row: [{ say: "boy", mood: "talk", text: "আমরা যোগের মতো হিসাব করব।" },
            { col: [{ kind: "c3p107_group", parts: [{ g: "১০", v: "১০", one: true }, "+", { g: "৫ + ৫", v: "১০" }, "+", { g: "২৫ + ২৫", v: "৫০" }, "= ৭০"] },
              { text: "মোট ৭০ পয়সা", big: true }], gap: 1.6 }], w: [84, null], gap: 4 },
          { row: [
            { frame: [cash([named("p10", "১০ পয়সা")], { cw: 15 })], pad: 1.6 },
            "ও",
            { frame: [cash([named("p25", "২৫ পয়সা"), named("p25", "২৫ পয়সা")], { cw: 15, gap: 2.4 })], pad: 1.6 },
            "ও",
            { frame: [cash([named("p50", "৫০ পয়সা")], { cw: 15 })], pad: 1.6 },
            "একত্রে", box(26, 13),
          ], w: [24, 6, 42, 6, 24, 16, null], gap: 2.4, justify: "flex-start" },
          { row: [pill("১০ + ২৫ + ২৫+ ৫০ = ১১০"), { say: "girl", mood: "think", text: "১০০ পয়সা = ১ টাকা\nউত্তর কী হবে?" }], w: [60, null], gap: 4 },
          pill("মোট ১ টাকা ১০ পয়সা"),
        ] },
      ],
    },
    {
      page: 112,
      dense: true,
      blocks: [
        { ask: "বক্সে টাকার পরিমাণ, নোট ও মুদ্রায় গোল দাগ দিয়ে হিসাব করি।\nএকটি করে দেখানো হয়েছে।" },
        { row: [
          // the book's worked box: ১০ + ৫ + ২ + ২ টাকা and ১০ + ১০ + ৫ পয়সা are circled
          { kind: "c3p107_box", label: "১৯ টাকা ২৫ পয়সা", pad: 3, body: [
            cash([], { cols: [[{ m: 10, ring: true }, { m: 5, ring: true }, 5, 5], [{ m: 2, ring: true }, { m: 2, ring: true }, "p10"], [{ m: "p10", ring: true }, { m: "p10", ring: true }, { m: "p5", ring: true }]], w: 32, cw: 13, rgap: 3.2, cgap: 4.4 }),
          ] },
          { kind: "c3p107_box", label: "৫২ টাকা ৭৫ পয়সা", pad: 3, body: [
            cash([], { cols: [[20, 20], [10, 10, 10], ["p50", "p50"]], w: 32, cw: 15, rgap: 1.4, cgap: 4 }),
            { row: [cash([], { rows: [[1], [1]], w: 32, rgap: 1.4 }), cash(["p25", "p25", "p25"], { cw: 14, gap: 2.4 })], w: [25, null], gap: 3 },
          ] },
        ], gap: 5, align: "stretch" },
        { kind: "c3p107_box", label: "১১৫১ টাকা ৭০ পয়সা", pad: 3, body: [
          // no ১ টাকা note in this box: the extra ১ টাকা comes from ৫০ + ৫০ পয়সা, as printed
          cash([], { rows: [[500, 100, 50, "p10", "p25"], [500, 100, 50, "p10", "p25", "p50"], [500, 100, 50, "p10", "p25", "p50"]], w: 36, cw: 14, gap: 3.4, rgap: 1.6, justify: "flex-start" }),
        ] },
        { ex: "১", mark: "anu", text: "হিসাব করি", body: [
          ic({ sums: [
            "(১) ৫ পয়সা + ৫ পয়সা + ১০ পয়সা + ২৫ পয়সা + ৩ টাকা = ‹box:28›",
            "(২) ১ পয়সা + ১০ পয়সা + ৫০ পয়সা + ২ টাকা + ৫ টাকা = ‹box:28›",
            "(৩) ২০ টাকা + ২৫ পয়সা + ৫০ পয়সা + ৩০ টাকা = ‹box:28›",
            "(৪) ৫ পয়সা + ২৫ পয়সা + ১০ টাকা + ২ টাকা + ১০ পয়সা = ‹box:28›",
          ], cols: 1, size: 12.5 }),
        ] },
      ],
    },
    {
      page: 113,
      dense: true,
      blocks: [
        { ex: "১", mark: "kaj", text: "বকুল ৬৫ টাকা ৭৫ পয়সা দিয়ে একটি বই কিনল। ২০ টাকা, ১০ টাকা, ৫ টাকা ও ২ টাকা এবং ৫ পয়সা, ১০ পয়সা ও ২৫ পয়সা ব্যবহার করে কতভাবে মূল্য পরিশোধ করতে পারবে?", body: [
          { row: [{ say: "boy", mood: "talk", text: "২ টাকা ৫টি, ৫ টাকা ১টি, ১০ টাকা ১টি, ২০ টাকা ২টি এবং ২৫ পয়সা ৩টি দিয়ে মূল্য পরিশোধ করতে পারবে।" },
            { say: "girl", mood: "talk", text: "অন্যভাবেও মূল্য পরিশোধ করা যায়।" }], w: [104, null], gap: 3, align: "flex-start" },
          T({ tone: "green", small: true, rowh: 6.6, widths: [16, 12, 12, 12, 12, 12, 12, 12], heads: [
            [{ c: "মূল্য", rs: 2 }, { c: "টাকা", cs: 4 }, { c: "পয়সা", cs: 3, sep: true }],
            ["২ টাকা", "৫ টাকা", "১০ টাকা", "২০ টাকা", { c: "৫ পয়সা", sep: true }, "১০ পয়সা", "২৫ পয়সা"],
          ], rows: [
            [{ c: "৬৫ টাকা\n৭৫ পয়সা", rs: 6 }, "", "", "", "", { c: "", sep: true }, "", ""],
            ...Array.from({ length: 5 }, () => ["", "", "", "", { c: "", sep: true }, "", ""]),
          ] }),
        ] },
        { ex: "২", mark: "kaj", text: "যোগ করি", body: [
          { text: "১৫০ টাকা ৬৫ পয়সা + ৬৭ টাকা ৮৩ পয়সা" },
          { row: [
            { col: [tp([["", "১৫০", "৬৫"], ["+", "৬৭", "৮৩"]], ["মোট", "২১৮", "৪৮"]), { text: "মোট ২১৮ টাকা ৪৮ পয়সা" }], gap: 2 },
            { say: "girl", mood: "talk", text: "১৪৮ পয়সা = ১ টাকা ৪৮ পয়সা\nকাজেই আমরা ২১৭ টাকার সঙ্গে\n১ টাকা যোগ করব।" },
          ], w: [62, null], gap: 4 },
        ] },
        { ex: "২", mark: "anu", text: "যোগ করি", body: [
          { sums: [
            "(১) ৩৫ টাকা ৫৫ পয়সা + ২৮ টাকা ৩৪ পয়সা",
            "(২) ৭৭ টাকা ৪৯ পয়সা + ৪২ টাকা ৮৫ পয়সা",
            "(৩) ২৫৯ টাকা ৭৫ পয়সা + ১৩৭ টাকা ৬৫ পয়সা",
            "(৪) ২১৫৫ টাকা ৩৫ পয়সা + ৭৮৫ টাকা ৯০ পয়সা",
            "(৫) ৪৭৪০ টাকা ৫৫ পয়সা + ৩৮৯ টাকা ৬৫ পয়সা",
          ], cols: 1, size: 12.5 },
        ] },
      ],
    },
    {
      page: 114,
      spread: true,
      blocks: [
        // the question asks "অবশিষ্ট", the worked answer says "ফেরত পাবে", as printed
        { ex: "৩", mark: "kaj", text: "রাফির কাছে ২২৫ টাকা ২৫ পয়সা আছে। সে ১০৫ টাকা ৭৫ পয়সা দামের একটি বল কিনল। তার কাছে কত টাকা অবশিষ্ট থাকল?", body: [
          { row: [
            tp([["", "২২৫", "২৫"], ["−", "১০৫", "৭৫"]], ["", "___", "___"]),
            { say: "girl", mood: "think", text: "এক্ষেত্রে আমরা ২৫ থেকে ৭৫ বিয়োগ করতে পারি না। তাহলে কীভাবে হিসাব করব?" },
          ], w: [62, null], gap: 4 },
          { say: "boy", mood: "talk", text: "বিয়োগের মতো ১ টাকাকে পয়সাতে আনব। আমরা জানি, ১ টাকা হচ্ছে ১০০ পয়সা সমমূল্যের।" },
          { row: [chip("পয়সা", "violet"), { text: "যদি ১ টাকাকে পয়সায় নেওয়া যায়, তবে হিসাব হবে" }, chip("১২৫ − ৭৫ = ৫০", "violet", { big: true })], w: [18, null, 44], gap: 3 },
          { row: [
            { col: [
              { row: [chip("টাকা", "green"), { text: "১ টাকা পয়সায় নেওয়া হয়েছে। সুতরাং হিসাব হবে" }], w: [18, null], gap: 3 },
              { text: "ফেরত পাবে ১১৯ টাকা ৫০ পয়সা", big: true },
            ], gap: 8 },
            { col: [chip("২২৫ − ১ = ২২৪", "green", { big: true }), { text: "↓", center: true }, chip("২২৪ − ১০৫ = ১১৯", "green", { big: true })], gap: .4 },
          ], w: [null, 44], gap: 3 },
        ] },
        { ex: "৩", mark: "anu", text: "বিয়োগ করি", body: [
          { sums: [
            "(১) ৯৫ টাকা ৬০ পয়সা − ৪২ টাকা ২০ পয়সা",
            "(২) ৩৬০ টাকা ৮০ পয়সা − ২১৫ টাকা ৩৫ পয়সা",
            "(৩) ৭৫৫ টাকা ৪৫ পয়সা − ৩৪৫ টাকা ২০ পয়সা",
            "(৪) ৪৭৫ টাকা ১৫ পয়সা − ৯৯ টাকা ৭৫ পয়সা",
            "(৫) ৮০ টাকা − ৩৭ টাকা ৫০ পয়সা",
            "(৬) ৮২৪ টাকা ৪৫ পয়সা − ৩০৭ টাকা ৭৫ পয়সা",
            "(৭) ৯০০ টাকা − ২৭৯ টাকা ৫৫ পয়সা",
          ], cols: 1, size: 12.5 },
        ] },
      ],
    },
    {
      page: 115,
      dense: true,
      blocks: [
        { ex: "৪", mark: "kaj", text: "নিজের ইচ্ছেমতো জিনিস কিনি।", body: [
          { kind: "c3p107_shop", cols: 4, size: 17, items: [
            { sticker: "bicycle", emoji: "🚲", price: "৮৫০ টাকা" }, { sticker: "school-bag", emoji: "🎒", price: "৩২৫ টাকা ৫০ পয়সা" },
            { sticker: "cricket-bat", emoji: "🏏", price: "১৭৯ টাকা" }, { sticker: "flower-vase", emoji: "🏺", price: "১১০ টাকা" },
            { sticker: "football", emoji: "⚽", price: "২৫০ টাকা" }, { sticker: "shirt", emoji: "👕", price: "৪৩০ টাকা ৫০ পয়সা" },
            { sticker: "colour-pencils", emoji: "🖍️", price: "১৪৫ টাকা" }, { sticker: "toy-car", emoji: "🚗", price: "৪৬০ টাকা" },
            { sticker: "tiffin-box", emoji: "🍱", price: "২৫০ টাকা" }, { sticker: "pencil-box", emoji: "🧰", price: "৬৫ টাকা ৫০ পয়সা" },
            { clock: [10, 9], price: "৫২৫ টাকা" }, { sticker: "sneakers", emoji: "👟", price: "৪৯৫ টাকা ৫০ পয়সা" },
          ] },
        ] },
        { row: [{ text: "রং পেনসিল ও স্কুলব্যাগ কিনলে খরচ হবে" }, arrow(20), tp([["", "□", "□"], ["+", "□", "□"]], ["", "□", "□"], { size: 12 })], w: [86, 20, null], gap: 2, align: "flex-start" },
        { row: [ic({ text: "‹box:18› ও [[ঘড়ি]] কিনলে খরচ হবে" }), arrow(20), tp([["", "□", "□"], ["+", "□", "□"]], ["", "□", "□"], { size: 12 })], w: [86, 20, null], gap: 2, align: "flex-start" },
        { row: [ic({ text: "‹box:18› ও ‹box:18› কিনলে খরচ হবে" }), arrow(20), tp([["", "□", "□"], ["+", "□", "□"]], ["", "□", "□"], { size: 12 })], w: [86, 20, null], gap: 2, align: "flex-start" },
        { row: [{ text: "ফুটবল ও ব্যাটের মধ্যে কোনটির দাম বেশি?\nকত বেশি?" }, arrow(20), tp([["", "□", "□"], ["−", "□", "□"]], ["", "□", "□"], { size: 12 })], w: [86, 20, null], gap: 2, align: "flex-start" },
      ],
    },
    {
      page: 116,
      dense: true,
      blocks: [
        { practise: "নিজে করি" },
        // box 1: the two big coins are unlabelled in the book; their faces show ১, as the ১ পয়সা coin on p107
        { ex: "১", mark: "nije", text: "বক্সে মোট কত টাকা ও পয়সা আছে?", body: [
          { frame: [cash(["p1", "p1", "p5", "p5", "p10", "p25", "p25", "p50"], { cw: 18, gap: 3.4 })], pad: 2.4 },
          { row: [{ text: "=" }, box(52, 11)], w: [5, 52], gap: 2, justify: "flex-end" },
          { frame: [cash(["p5", "p10", "p10", "p25", 50, 10], { w: 38, cw: 17, gap: 3.4 })], pad: 2.4 },
          { row: [{ text: "=" }, box(52, 11)], w: [5, 52], gap: 2, justify: "flex-end" },
        ] },
        { ex: "২", mark: "nije", text: "নিচের হিসাবগুলো করি", body: [
          ic({ sums: ["ক) ৪৫ টাকা ৭৫ পয়সা + ৩৫ টাকা ৮০ পয়সা = ‹box:34›", "খ) ৩৭ টাকা ২০ পয়সা − ২১ টাকা ৭০ পয়সা = ‹box:34›"], cols: 1, size: 12.5 }),
          { row: [tp([["গ)", "৬৯", "৩৫"], ["+", "৩৭", "৭৭"]], ["", "___", "___"], { size: 12.5 }), tp([["ঘ)", "৮৯", "৪২"], ["+", "৪৫", "৮৯"]], ["", "___", "___"], { size: 12.5 })], gap: 6, justify: "flex-start" },
          { row: [tp([["ঙ)", "৭৮", "৫০"], ["−", "৪২", "৭৫"]], ["", "___", "___"], { size: 12.5 }), tp([["চ)", "২০০", "২০"], ["−", "১০", "৪০"]], ["", "___", "___"], { size: 12.5 })], gap: 6, justify: "flex-start" },
        ] },
        { ex: "৩", mark: "nije", text: "উষার ৬৫ টাকা ৭৫ পয়সা ছিল। তার মা তাকে খাতা কেনার জন্য ৮২ টাকা ৭৫ পয়সা দিলেন। এখন উষার কত টাকা হলো?" },
        { ex: "৪", mark: "nije", text: "জুবায়ের ৭৮ টাকা ২৫ পয়সা দিয়ে একটি খেলনা কিনল। সে দোকানদারকে ১০০ টাকা দিলে দোকানদার তাকে কত টাকা ফেরত দেবে?" },
      ],
    },
    {
      page: 117,
      dense: true,
      blocks: [
        { ex: "৫", mark: "nije", text: "দুইটি খাতার দাম ৮০ টাকা এবং একটি কলমের দাম ২৫ টাকা ৭৫ পয়সা। আরিশা দোকানদারকে এই জিনিসগুলো কেনার জন্য ২০০ টাকার একটি নোট দিলো। দোকানদার আরিশাকে কত টাকা ফেরত দেবেন?" },
        { ex: "৬", mark: "nije", text: "শিমুল ৮৫ টাকা ৭৫ পয়সার চাল এবং ৪৫ টাকা ৫৫ পয়সার সবজি কেনে। সে মোট কত টাকা খরচ করে?" },
        { ex: "৭", mark: "nije", text: "মিতুর ১৩৫ টাকা ২৫ পয়সা ছিল। তার বাবা তাকে ৬৫ টাকা ৭৫ পয়সা দিলেন। তার কত টাকা হলো?" },
        { ex: "৮", mark: "nije", text: "তামান্না ৩৫ টাকা ৭৫ পয়সা দিয়ে একটি বিস্কুটের প্যাকেট কিনল। সে দোকানদারকে ৫০ টাকার নোট দিলো। দোকানদার তামান্নাকে কত টাকা ফেরত দিল?" },
        { ex: "৯", mark: "nije", text: "লিলি ৩০০ টাকা নিয়ে দোকানে গেল। সে ১২০ টাকা ৯৫ পয়সা দিয়ে একজোড়া জুতা কিনল। তার কাছে কত টাকা রইল?" },
        { ex: "১০", mark: "nije", text: "ডেভিডের ৫৪২ টাকা ৭৮ পয়সা আছে। তার মামা তাকে আরও ৩০০ টাকা ৫৫ পয়সা দিলো। এখন ডেভিডের মোট কত টাকা হলো?" },
        { ex: "১১", mark: "nije", text: "১২৮ টাকা ৫০ পয়সা − ৭৭ টাকা ২৫ পয়সা = [[___টাকা ___ পয়সা]] গাণিতিক বাক্যটি দিয়ে একটি গল্প তৈরি করি।" },
        { ex: "১২", mark: "nije", text: "রিয়া ১০০ টাকা নিয়ে দোকানে গেল। সে ৬৯ টাকা ৭৫ পয়সা দিয়ে একটি বই কিনল। তার কাছে কত টাকা রইল?" },
        { ex: "১৩", mark: "nije", text: "রতন ৪৫ টাকা ৫০ পয়সা দিয়ে একটি চানাচুরের প্যাকেট কিনল। সে দোকানদারকে ১০০ টাকার নোট দিলো। দোকানদার রতনকে কত টাকা ফেরত দিলো?" },
        { row: [
          { text: "**প্রকল্প:** গত বছর তৃতীয় শ্রেণির শিক্ষার্থীরা টিফিনের টাকা থেকে কিছু টাকা মাটির ব্যাংকে জমিয়ে তা দিয়ে বিদ্যালয়ের উন্নয়নে খরচ করেছিল। তোমরাও মাটির ব্যাংকে টাকা জমিয়ে তা একত্র করে শিক্ষকের সহায়তায় ভালো কোনো কাজে ব্যয় করতে পারো।" },
          { pic: "p117-clay-bank", h: 36, w: 30 },
        ], w: [null, 32], gap: 4 },
      ],
    },
  ],
};
