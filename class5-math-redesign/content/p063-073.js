// অধ্যায় ৫ · দশমিক ভগ্নাংশ (first part): printed pages 63–73 (PDF pages 70–80), every word as printed. Written by a helper
// (25 Nov 2026).
// The table's 1 মিটার 30 সেমি and the hundredths grid (p63), 1 → 0.1 → 0.01 → 0.001 and the place table to সহস্রাংশ (p64),
// numbers made of 1, 0.1, 0.01, 0.001 and number lines in 0.01 and 0.001 steps (pp65–66), litres in a beaker and its
// magnified scale (pp66–67), decimal → fraction (p68), fraction → decimal (p69), comparing decimals with place tables
// (pp70–71), adding and taking away (pp72–73).
// Own kinds (content/p063-073.parts.js): c5p063_grid (the reusable 10 × 10 grid, for chapter ৬ too), c5p063_flow, c5p063_pvt,
// c5p063_nline, c5p063_cyl (beakers and magnifier lenses), c5p063_cmp, c5p063_dcol (decimals in columns), c5p063_dbox,
// c5p063_eqs (p66's lines of working), c5p063_stk (p72's bus sticker at a set size).
// Reused: Class 3's c3p118_say (smaller speech cards) and c3p037_say (a card holding blocks, p68); Class 4's c4p111_rows, c4p111_tab, c4p111_x, c4p097_cancel, c4p004_rule,
// c4p004_line; the core's table and sums; the bus is Class 2's "bus" sticker.
// Readings, every one checked by eye at 300–400 dpi and worked out:
// - p63 (ক) 48 cells (4 columns + 8), (খ) 60 (5 columns + 2 × 5), (গ) 49 (4 rows + 3 × 3).
// - p64: ২৫০ + ১০০ + ৫০০ + ৩৭৫ = ১২২৫ গ্রাম = ১.২২৫ কেজি.
// - p65: the arrows point at ৭.২২, ৭.৩৫, ৭.৪৯ (ক খ গ) and ০.০০১, ০.০১৩, ০.০২৬, ০.০৩৮ (ঘ ঙ চ ছ) (measured: 10 small
//   steps between labels, the arrows on ticks 2, 5, 9 and 1, 13, 26, 38); both lines run to the half step after ৭.৫ / ০.০৪.
// - p66: the second beaker holds ০.৩৬ লিটার (the girl's "৬টি ০.০১"; the drawing's water is at 3.5–3.6 tenths), the first is
//   full, so the boxes come to ১.৩৬ লিটার. p67's lenses show ০.৩৫৮ লিটার (the boxes' "আটটি ০.০০১"; the drawing's water sits
//   7.5–8 thousandths above ০.৩৫).
// - p68: {{১৫/১০০}} = {{৩/২০}}, {{৮/১০০০}} = {{২/২৫০}} = {{১/১২৫}}; p69: {{৩/৫}} = {{৬/১০}}, {{৭/২৫}} = {{২৮/১০০}},
//   {{১৭৩/৫০০}} = {{৩৪৬/১০০০}}; p72: ২৫.৫২ + ১২.৬৫ = ৩৮.১৭, ৪.৮০ − ৩.৫৯ = ১.২১; p73: ৪.০০ − ২.৩১ = ১.৬৯,
//   ৩.৭৫ − ০.৫০ = ৩.২৫, ৭.৫৮ − ৬.৮৭ = ০.৭১ (the crossed answers ২.৩৩, ৩.৭০ and ৭১ are the book's wrong ways, kept).
// The book's triangles (green, blue) are কাজ, its orange squares অনুশীলন (its key page, PDF p5).
const sm = (who, mood, text, side, o = {}) => ({ kind: "c3p118_say", who, mood, text, ...(side ? { side } : {}), face: o.face || 14, fs: o.fs || 11.5, ...(o.w ? { w: o.w } : {}) });
const say = (who, mood, text, side) => ({ say: who, mood, text, ...(side ? { side } : {}) });
const grid = (o) => ({ kind: "c5p063_grid", ...o });
const nl = (labels, arrows) => ({ kind: "c5p063_nline", from: 0, to: 44, end: 45, unit: 3.45, labels, ...(arrows ? { arrows } : {}) });
const dc = (rows, ans, o = {}) => ({ kind: "c5p063_dcol", rows, ...(ans ? { ans } : {}), ...o });
const five = (lab) => [lab, "=", "▭", "▭", "▭", "▭", "▭", "লিটার"];

module.exports = {
  pages: [
    {
      page: 63,
      opener: { title: "দশমিক ভগ্নাংশ" },
      dense: true,
      allow: ["১০", "১০০"], // the bottoms of {{১/১০}}, {{১/১০০}}, {{৩০/১০০}}: tesseract can't read the book's small fractions (checked by eye)
      blocks: [
        { ask: "একটি পড়ার টেবিলের দৈর্ঘ্য ১ মিটার ৩০ সেমি। টেবিলটির দৈর্ঘ্য কত মিটার?" },
        { row: [
          { pic: "p063-table", h: 33, w: 59 },
          { col: [
            sm("boy", "talk", "১ সেমি = {{১/১০০}} মিটার\nতাহলে, ৩০ সেমি = {{৩০/১০০}}মিটার", "right"),
            sm("girl", "talk", "৪র্থ শ্রেণিতে আমরা জেনেছি,\n{{১/১০}} = ০.১ বা এক দশমাংশ।"),
          ], gap: 1.6 },
        ], w: [62, 0], gap: 3 },
        { row: [
          grid({ cols: 10, rows: 1, w: 27, n: 1, fill: "orange", bl: "০.১" }),
          grid({ w: 27, cells: [[0, 0]], fill: "orange", tl: "০.০১" }),
        ], justify: "space-evenly", align: "flex-start" },
        "তাহলে {{১/১০০}} = ০.০১ বা এক শতাংশ। অর্থাৎ, ৩০ সেমি = {{৩০/১০০}}মি = ০.৩ মি\nটেবিলটির দৈর্ঘ্য = ১ মি + ০.৩ মি = ১.৩ মি।",
        { ex: "১", mark: "kaj", text: "রং করা অংশ সাধারণ ও দশমিক ভগ্নাংশে লিখি।", body: [
          { row: [
            grid({ w: 27, rects: [[0, 0, 4, 10], [4, 2, 1, 8]], fill: "red", cap: "(ক)" }),
            grid({ w: 27, rects: [[5, 0, 5, 10], [3, 5, 2, 5]], fill: "sky", cap: "(খ)" }),
            grid({ w: 27, rects: [[0, 6, 10, 4], [7, 3, 3, 3]], fill: "navy", cap: "(গ)" }),
          ], justify: "space-evenly" },
          { table: { head: ["চিত্র", "রং করা অংশ", "সাধারণ ভগ্নাংশ", "দশমিক ভগ্নাংশ"], rows: [["ক", "", "", ""], ["খ", "", "", ""], ["গ", "", "", ""]], tone: "yellow" } },
        ] },
      ],
    },
    {
      page: 64,
      dense: true,
      allow: ["দুই"], // the place table's "দুই": tesseract reads "ই" (checked by eye)
      blocks: [
        { ask: "নিচের রং করা অংশকে কীভাবে প্রকাশ করা যায়?" },
        { kind: "c5p063_flow" },
        { row: [
          { kind: "c4p111_x", bw: 22, b: { col: ["(১) {{১/১০}} = এক দশমাংশ = ০.১", "(২) {{১/১০০}} = ▭ = ▭", "(৩) {{১/১০০০}} = ▭ = ▭"], gap: 1.6 } },
          sm("girl", "talk", "১.২৩৫ দশমিক ভগ্নাংশের বিভিন্ন স্থানের নাম কী?"),
        ], w: [80, 0], gap: 3 },
        { kind: "c5p063_pvt", digits: ["১", "•", "২", "৩", "৫"], words: ["এক", "দশমিক", "দুই", "তিন", "পাঁচ"] },
        { ex: "১", mark: "kaj", text: "মিতুর বাবা বাজার থেকে ২৫০ গ্রাম আদা, ১০০ গ্রাম জিরা, ৫০০ গ্রাম পেঁয়াজ এবং ৩৭৫ গ্রাম রসুন কিনে আনলেন। তিনি বাজার থেকে কত কেজি জিনিস ক্রয় করলেন?", body: [
          "তিনি ক্রয় করলেন = ২৫০ গ্রাম + ১০০ গ্রাম + ৫০০ গ্রাম + ৩৭৫ গ্রাম = ১২২৫ গ্রাম",
          { row: [sm("boy", "talk", "১ গ্রাম = {{১/১০০০}} কেজি"), sm("girl", "talk", "তাহলে, {{১/১০০০}} = ০.০০১ বা\nএক সহস্রাংশ।")], gap: 4 },
          { kind: "c4p111_rows", cols: "auto auto", indent: 18, gap: [1, 2], rows: [
            ["তাহলে, ১২২৫ গ্রাম", "= ১০০০ গ্রাম + ২২৫ গ্রাম"],
            ["", "= {{১০০০/১০০০}} কেজি + {{২২৫/১০০০}} কেজি"],
            ["", "= ১ কেজি + ০.২২৫ কেজি = ১.২২৫ কেজি।"]] },
          { kind: "c4p111_rows", cols: "auto", indent: 18, rows: [["তিনি ১.২২৫ কেজি জিনিস ক্রয় করলেন।"]] },
        ] },
      ],
    },
    {
      page: 65,
      dense: true,
      spread: true,
      flags: ["p65–66: the book draws the half-way ticks of its number lines (৭.১৫, ০.০০৫ …) as long as or longer than the labelled ones; ours draws the labelled ticks longest, the half-way ones medium"],
      blocks: [
        { ex: "২", mark: "kaj", text: "কতগুলো ১, ০.১, ০.০১ এবং ০.০০১ নিয়ে নিচের সংখ্যাগুলো গঠিত?", body: [
          { sums: ["১.৪৬৯", "৩.৮২৫", "০.০১৭"], cols: 3, marks: true },
          { kind: "c4p111_tab", cap: "ফাঁকা ঘরগুলো পূরণ করি", tone: "yellow", left: true, bw: 30, rh: 9.4, head: ["(ক) ১.৪৬৯", "(খ) ৩.৮২৫", "(গ) ০.০১৭"], rows: [
            ["১.৪৬৯-এ", "৩.৮২৫-এ", "০.০১৭-এ"],
            ["একটি ১", "▭ ১", "▭ ১"],
            ["চারটি ০.১", "▭ ০.১", "▭ ০.১"],
            ["ছয়টি ০.০১", "▭ ০.০১", "▭ ০.০১"],
            ["নয়টি ০.০০১", "▭ ০.০০১", "▭ ০.০০১"]] },
        ] },
        { ex: "১", mark: "anu", text: "নিচের প্রশ্নগুলোর উত্তর লিখি।", body: [
          { kind: "c4p111_rows", cols: "1fr auto", lw: 54, gap: [1.8, 4], rows: [
            ["(১) একশত পঞ্চান্নটি ০.০১ নিয়ে গঠিত সংখ্যাটি কত?", "▬"],
            ["(২) একশত পঞ্চান্নটি ০.০০১ নিয়ে গঠিত সংখ্যাটি কত?", "▬"],
            ["(৩) কতটি ০.০১ নিয়ে ৬.৮২ গঠিত?", "▬"],
            ["(৪) কতটি ০.০০১ নিয়ে ৬.৮২ গঠিত?", "▬"]] },
        ] },
        { ex: "২", mark: "anu", text: "সংখ্যারেখার ক থেকে ছ পর্যন্ত স্থানগুলো কোন কোন সংখ্যাকে প্রকাশ করে? ফাঁকা স্থানে লিখি।", body: [
          nl({ 10: "৭.২", 20: "৭.৩", 30: "৭.৪", 40: "৭.৫" }, [{ at: 12, text: "ক" }, { at: 25, text: "খ" }, { at: 39, text: "গ" }]),
          { kind: "c4p111_rows", cols: "repeat(3, auto)", justify: "space-evenly", bw: 24, size: 13, rows: [["ক = ▭", "খ = ▭", "গ = ▭"]] },
          nl({ 0: "০", 10: "০.০১", 20: "০.০২", 30: "০.০৩", 40: "০.০৪" }, [{ at: 1, text: "ঘ" }, { at: 13, text: "ঙ" }, { at: 26, text: "চ" }, { at: 38, text: "ছ" }]),
          { kind: "c4p111_rows", cols: "repeat(4, auto)", justify: "space-evenly", bw: 24, size: 13, rows: [["ঘ = ▭", "ঙ = ▭", "চ = ▭", "ছ = ▭"]] },
        ] },
      ],
    },
    {
      page: 66,
      dense: true,
      spread: true,
      blocks: [
        { ex: "৩", mark: "anu", text: "নিচের সংখ্যাগুলোকে সংখ্যারেখায় উপস্থাপন করি।", body: [
          { kind: "c4p004_line", items: ["০.০০১,", "০.০১৫,", "০.০২৭,", "০.০৩৪,"], gap: 16, size: 13.5 },
          nl({ 0: "০", 10: "০.০১", 20: "০.০২", 30: "০.০৩", 40: "০.০৪" }),
        ] },
        { ex: "১", mark: "kaj", text: "নিচের ছবিতে দেখানো পানির পরিমাণকে কীভাবে প্রকাশ করতে পারি?", body: [
          { kind: "c5p063_cyl", w: 166, h: 45,
            beakers: [{ x: 3, y: 10, w: 22, h: 30, fill: 1000, label: "১ লি" },
              { x: 32, y: 10, w: 22, h: 30, fill: 360, label: "১ লি", ring: { v: 360, r: 2.2 }, bracket: { a: 900, b: 1000, text: "০.১" } }],
            lenses: [
              { cx: 84, cy: 23, r: 15.5, vc: 300, k: 60, sx: 6.5, ticks: [[100, 3]], labels: [[400, "০.৪"], [300, "০.৩"]], water: 360, ring: { v: 350, r: 3.4, dx: -1.4 } },
              { cx: 141, cy: 23, r: 21.5, vc: 350, k: 140, sx: 13.5, ticks: [[10, 1.8], [50, 2.8]], labels: [[400, "০.৪"], [300, "০.৩"]], water: 360, bracket: { a: 300, b: 310, text: "০.০১" } }],
            links: [[54, 40 - 0.36 * 30, 2.2, 84, 23, 15.5], [84 + 6.5 - 1.4, 23 - 0.05 * 60, 3.4, 141, 23, 21.5]] },
          sm("boy", "talk", "০.১কে আরও ১০টি সমানভাগে ভাগ করব।\nআর, ১ লিটারের {{১/১০}} অংশ = ০.১ লিটার (শূন্য দশমিক এক লিটার)"),
          sm("girl", "think", "তাহলে, ০.১ লিটারের {{১/১০}} অংশ = ০.০১ লিটার (শূন্য দশমিক শূন্য এক লিটার)\nএবং ০.০১ লিটার হলো ১ লিটারের {{১/১০০}} অংশ।\nএখানে, ছবিতে ৬টি ০.০১ লিটার রয়েছে।", null, { w: 146, fs: 11.2 }),
          "তাহলে, ছবিতে দেখানো পানির পরিমাণ",
          { kind: "c5p063_eqs", size: 12, sb: 9, bw: 15, gap: 1.6, lines: [
            "= □ লিটার+ {{□/১০}} লিটার + {{□/১০০}} লিটার",
            "= □ লিটার + ১ লিটারের {{১/১০}} অংশের □ গুণ + ১ লিটারের {{১/১০০}} অংশের □ গুণ",
            "= □ লিটার + ০.১ লিটারের □ গুণ + ০.০১ লিটারের □ গুণ",
            "= ▭ লিটার + ▭ লিটার+ ▭ লিটার",
            "=(▭ + ▭ + ▭) লিটার",
            "=□.□ □ লিটার"] },
        ] },
      ],
    },
    {
      page: 67,
      dense: true,
      allow: ["৩৫"], // the lenses' tiny "০.৩৫": tesseract reads only "০.৩৬" (checked by eye at 400 dpi)
      spread: true,
      flags: ["p67: this কাজ is numbered ১ again, right after p66's কাজ ১ with no new lesson (মূল প্রশ্ন) between; kept as printed"],
      blocks: [
        { ex: "১", mark: "kaj", text: "আমরা ছবিতে দেখানো পানির পরিমাণকে কীভাবে লিখে প্রকাশ করতে পারি?", body: [
          { kind: "c5p063_cyl", w: 162, h: 42,
            beakers: [{ x: 12, y: 9, w: 22, h: 30, fill: 1000, label: "১ লি" }],
            lenses: [
              { cx: 68, cy: 21, rx: 14.5, ry: 19, vc: 350, k: 230, sx: 6.5, ticks: [[10, 1.6], [50, 2.6]], fs: 2.6,
                labels: [[400, "০.৪"], [360, "০.৩৬", -.5], [350, "০.৩৫", .6], [300, "০.৩"]], water: 358, ring: { v: 355, r: 1.9, rx: 2.7 } },
              { cx: 110, cy: 21, r: 9.5, vc: 355, k: 1150, sx: 4.5, fs: 2.5, labels: [[360, "০.৩৬"], [350, "০.৩৫"]], water: 358 },
              { cx: 146, cy: 21, rx: 12, ry: 14.5, vc: 355, k: 1150, sx: 6.5, ticks: [[1, 1.5]], fs: 2.5, labels: [[360, "০.৩৬"], [350, "০.৩৫"]], water: 358, thick: .8 }],
            links: [[68 + 6.5, 21 - 0.005 * 230, 1.9, 110, 21, 9.5]] },
          { kind: "c4p111_rows", cols: "auto auto repeat(5, auto) auto", bw: 14, gap: [1.4, 2.2], rows: [
            five("একটি ১ লিটার"), five("তিনটি ০.১ লিটার"), five("পাঁচটি ০.০১ লিটার"), five("আটটি ০.০০১ লিটার"), five("এক দশমিক তিন পাঁচ আট লিটার")] },
          sm("boy", "talk", "আমরা দশমাংশ, শতাংশ এবং সহস্রাংশের ধারণা ব্যবহার করতে পারি।"),
          { kind: "c5p063_pvt", digits: ["১", "•", "৩", "৫", "৮"], words: ["এক", "দশমিক", "তিন", "পাঁচ", "আট"] },
        ] },
        { ex: "১", mark: "anu", text: "০.৮৪৯ কে স্থানীয় মানের ছকে লিখি ও পড়ি।", body: [{ kind: "c5p063_pvt" }] },
      ],
    },
    {
      page: 68,
      title: "সাধারণ ভগ্নাংশে রূপান্তর",
      dense: true,
      allow: ["২৫০"], // the struck-out ২৫০ under ১০০০: tesseract reads "২৫৫০" (checked by eye)
      spread: true,
      blocks: [
        { ask: "দশমিক ভগ্নাংশকে কীভাবে সাধারণ ভগ্নাংশে রূপান্তর করতে পারি?" },
        sm("boy", "talk", "আমরা দশমাংশ, শতাংশ এবং সহস্রাংশের ধারণা ব্যবহার করতে পারি।", "right"),
        sm("girl", "think", "এসো আমরা ০.৩, ০.১৫, এবং ০.০০৮কে সাধারণ ভগ্নাংশে প্রকাশ করি।", "left"),
        { row: [
          { kind: "c4p111_rows", sum: true, cols: "auto auto", indent: 22, gap: [3, 2], rows: [["০.৩", "= {{□/১০}}"], ["০.১৫", "= {{□/১০০}}"], ["০.০০৮", "= {{□/১০০০}}"]] },
          { kind: "c3p037_say", who: "girl", mood: "think", side: "right", text: "আমরা জানি,", body: [
            { kind: "c4p111_rows", sum: true, cols: "auto auto", gap: [1.4, 1.6], rows: [["০.১", "= {{১/১০}}"], ["০.০১", "= {{১/১০০}}"], ["০.০০১", "= {{১/১০০০}}"]] }] },
        ], w: [0, 70], gap: 3 },
        { note: "হরে ১০, ১০০, ১০০০ ইত্যাদি বসানোর মাধ্যমে দশমিক ভগ্নাংশকে সাধারণ ভগ্নাংশে প্রকাশ করি।" },
        { row: [
          { col: [
            { row: [{ kind: "c4p111_rows", sum: true, rows: [["০.১৫ ="]] }, { kind: "c4p097_cancel", up: ["৩", "~১৫"], down: ["~১০০", "২০"], eq: "{{৩/২০}}" }], w: [15, 0], gap: 1, justify: "flex-start" },
            { row: [{ kind: "c4p111_rows", sum: true, rows: [["০.০০৮ ="]] }, { kind: "c4p097_cancel", up: ["১", "~২", "~৮"], down: ["~১০০০", "~২৫০", "১২৫"], eq: "{{১/১২৫}}" }], w: [18, 0], gap: 1, justify: "flex-start" },
          ], gap: 3 },
          sm("boy", "talk", "এরপর সম্ভব হলে, ভগ্নাংশগুলোকে তার লঘিষ্ঠ আকারে প্রকাশ করি।", "right"),
        ], w: [64, 0], gap: 3, align: "flex-start" },
        { ex: "১", mark: "anu", text: "নিচের দশমিক সংখ্যাগুলোকে সাধারণ ভগ্নাংশে রূপান্তর করি এবং সম্ভব হলে ভগ্নাংশকে তার লঘিষ্ঠ আকারে প্রকাশ করি।", body: [
          { sums: ["০.০৪", "০.৩৫", "০.৭৫", "০.২৫"], cols: 4, marks: true }] },
      ],
    },
    {
      page: 69,
      title: "দশমিক ভগ্নাংশে রূপান্তর",
      dense: true,
      spread: true,
      blocks: [
        { ask: "সাধারণ ভগ্নাংশকে কীভাবে দশমিক ভগ্নাংশে রূপান্তর করতে পারি?" },
        sm("boy", "talk", "{{৩/১০}}, {{২৭/১০০}}, {{৩৪১/১০০০}} কে দশমিক ভগ্নাংশে প্রকাশ করি।"),
        { kind: "c4p004_line", items: ["{{৩/১০}} = ০.৩", "{{২৭/১০০}} = ০.২৭", "{{৩৪১/১০০০}} = ০.৩৪১"], gap: 24, size: 14 },
        sm("girl", "think", "এবার {{৩/৫}}, {{৭/২৫}}, {{১৭৩/৫০০}} কে দশমিক ভগ্নাংশে প্রকাশ করি।"),
        { row: [
          { frame: [{ kind: "c4p111_rows", sum: true, size: 15, cols: "auto auto auto auto auto auto", gap: [2.6, 2.2], rows: [
            ["{{৩/৫}}", "=", "{{৩ × ২/৫ × ২}}", "=", "{{৬/১০}}", "= ০.৬"],
            ["{{৭/২৫}}", "=", "{{৭ × ৪/২৫ × ৪}}", "=", "{{২৮/১০০}}", "= ০.২৮"],
            ["{{১৭৩/৫০০}}", "=", "{{১৭৩ × ২/৫০০ × ২}}", "=", "{{৩৪৬/১০০০}}", "= ০.৩৪৬"]] }], pad: 2.4 },
          sm("parrot", "talk", "আমরা সমতুল ভগ্নাংশের ধারণা ব্যবহার করে হরকে ১০, ১০০, ১০০০ ইত্যাদিতে রূপান্তর করি। তারপর সহজেই সাধারণ ভগ্নাংশকে দশমিক ভগ্নাংশে প্রকাশ করতে পারি।"),
        ], w: [90, 0], gap: 3 },
        { ex: "১", mark: "kaj", text: "নিচের ভগ্নাংশগুলোকে দশমিক ভগ্নাংশে প্রকাশ করি।", body: [
          { kind: "c4p111_rows", sum: true, size: 15, cols: "repeat(8, auto)", bw: 30, indent: 20, gap: [3.6, 2.8], rows: [
            ["(১)", "{{৭/২০}}", "=", "{{৭ × □/২০ × □}}", "=", "{{□/□}}", "=", "▭"],
            ["(২)", "{{১১/২৫}}", "=", "{{১১ × □/২৫ × □}}", "=", "{{□/□}}", "=", "▭"],
            ["(৩)", "{{৩৭/৫০}}", "=", "{{৩৭ × □/৫০ × □}}", "=", "{{□/□}}", "=", "▭"],
            ["(৪)", "{{১/৪}}", "=", "{{১ × □/৪ × □}}", "=", "{{□/□}}", "=", "▭"]] },
        ] },
      ],
    },
    {
      page: 70,
      dense: true,
      spread: true,
      blocks: [
        { ask: "দশমিক ভগ্নাংশগুলোকে কীভাবে তুলনা করতে পারি?" },
        sm("boy", "talk", "চলো এই ১.২৩, ০.০১৫, এবং ০.৪৭৮ দশমিক সংখ্যাগুলোর মধ্যে ছোটো-বড়ো তুলনা করি।"),
        { table: { rows: [["১.২৩ = {{১২৩/১০০}} = {{১২৩০/১০০০}}", "০.০১৫ = {{১৫/১০০০}}", "০.৪৭৮ = {{৪৭৮/১০০০}}"]], tone: "blue" } },
        "যেহেতু, {{১৫/১০০০}} < {{৪৭৮/১০০০}} < {{১২৩০/১০০০}} সুতরাং ০.০১৫ < ০.৪৭৮ < ১.২৩",
        sm("girl", "think", "স্থানীয় মানের ধারণা ব্যবহার করে আরও সহজেই দশমিক সংখ্যার তুলনা করতে পারি। আমি প্রথমে সরাসরি নিচের মতো করে সংখ্যাগুলোকে ছকে লিখি।"),
        { kind: "c5p063_cmp", dot: true, tone: "a", w: 152, rows: [["১", "(.)", "২", "৩", "০", "১.২৩০"], ["০", "(.)", "০", "১", "৫", "০.০১৫"], ["০", "(.)", "৪", "৭", "৮", "০.৪৭৮"]] },
        sm("girl", "think", "এবার, দশমিক বিন্দু ছাড়া শুধু সংখ্যাগুলো পড়ি।", "left"),
        { kind: "c5p063_cmp", tone: "a", w: 128, rows: [["১", "২", "৩", "০", "১২৩০"], ["০", "০", "১", "৫", "০০১৫"], ["০", "৪", "৭", "৮", "০৪৭৮"]] },
      ],
    },
    {
      page: 71,
      dense: true,
      spread: true,
      fixes: [{ book: "the two place tables of অনুশীলন ১ have 3 empty rows each", ours: "4 empty rows each",
        why: "the exercise compares four numbers (৪.০৪৪, ৪.৪৪, ৪.৬ and ০.৪৮৯) and its যেহেতু / অতএব lines have four boxes" }],
      blocks: [
        sm("boy", "talk", "১২৩০, ০০১৫ এবং ০৪৭৮ অর্থাৎ, ১২৩০, ১৫ এবং ৪৭৮ এই তিনটি সংখ্যা পেলাম।"),
        sm("girl", "think", "যেহেতু ১৫ < ৪৭৮ < ১২৩০ সুতরাং ০.০১৫ < ০.৪৭৮ < ১.২৩"),
        sm("boy", "talk", "তাহলে আমরা এভাবেও দশমিক ভগ্নাংশগুলোর তুলনা করতে পারি।"),
        { ex: "১", mark: "anu", text: "স্থানীয় মানের ছকের মাধ্যমে ৪.০৪৪, ৪.৪৪, ৪.৬ এবং ০.৪৮৯ তুলনা করি এবং সম্পর্ক প্রতীক (<, >) দিয়ে ছোটো থেকে বড়ো মানের ক্রমানুসারে সাজাই।", body: [
          { kind: "c5p063_cmp", dot: true, tone: "b", w: 152, n: 4, rh: 8.4 },
          "দশমিক বিন্দু না বসিয়ে",
          { kind: "c5p063_cmp", tone: "b", w: 128, n: 4, rh: 8.4 },
          { kind: "c4p111_rows", cols: "repeat(8, auto)", bw: 30, gap: [2.4, 2.2], size: 13, rows: [
            ["যেহেতু", "▭", "<", "▭", "<", "▭", "<", "▭"],
            ["অতএব", "▭", "<", "▭", "<", "▭", "<", "▭"]] },
        ] },
      ],
    },
    {
      page: 72,
      title: "দশমিক সংখ্যার যোগ ও বিয়োগ",
      dense: true,
      blocks: [
        { ask: "তাসিন ২৫.৫২ কিলোমিটার পথ বাসে এবং ১২.৬৫ কিলোমিটার পথ নৌকায় ভ্রমণ করল। সে মোট কত কিলোমিটার পথ ভ্রমণ করল?" },
        { row: [
          { col: [{ kind: "c5p063_stk", name: "bus", emoji: "🚌", w: 42, h: 22 }, { text: "২৫.৫২ কিলোমিটার", center: true }], gap: 0 },
          { col: [{ pic: "p072-boat", h: 24, w: 43, frame: true }, { text: "১২.৬৫ কিলোমিটার", center: true }], gap: 1.6 },
        ], w: [60, 60], justify: "space-around", align: "flex-end" },
        { kind: "c4p111_rows", cols: "auto auto", lw: 100, indent: 12, rows: [["গাণিতিক বাক্য", "▬"]] },
        sm("boy", "talk", "দশমাংশ পর্যন্ত দুইটি দশমিক সংখ্যার যোগ ও বিয়োগের পদ্ধতি আমরা চতুর্থ শ্রেণিতে জেনেছি। সংখ্যাগুলোকে উপরে নিচে রেখে হিসাব করতে পারি।"),
        { row: [
          { col: [dc([{ t: "২৫.৫২" }, { t: "১২.৬৫", op: "+" }], { t: "৩৮.১৭" }, { wide: true, size: 13.5 }), { text: "মোট ৩৮.১৭ কিমি পথ ভ্রমণ করল।", center: true }], gap: 1 },
          sm("girl", "think", "তবে সংখ্যাগুলোর দশমিক বিন্দুর অবস্থান সঠিকভাবে উপর-নিচে রাখা খুবই জরুরি।", "right", { w: 62 }),
        ], w: [0, 84], gap: 3 },
        { kind: "c4p004_rule", head: "উপর-নিচে হিসাব করার নিয়ম", items: [
          ["১.", "সংখ্যাগুলোকে উপরে-নিচে এমনভাবে রাখি যেন দশমিক বিন্দুগুলো উল্লম্ব বরাবর একই লাইনে থাকে।"],
          ["২.", "পূর্ণসংখ্যার যোগ এবং বিয়োগের অনুরূপ পদ্ধতিতে হিসাব করি। ফলাফলে দশমিক বিন্দু বসাই।"]] },
        { ex: "১", mark: "kaj", text: "হাসানের ব্যাগের ওজন ৪.৮ কিলোগ্রাম এবং রিপার ব্যাগের ওজন ৩.৫৯ কিলোগ্রাম। তাদের ব্যাগের ওজনের পার্থক্য কত কিলোগ্রাম?", body: [
          { row: [
            { col: [{ sub: "হিসাব" }, dc([{ t: "৪.৮০" }, { t: "৩.৫৯", op: "−" }], { t: "১.২১" }, { wide: true, size: 13.5, left: true })], gap: 1 },
            sm("girl", "think", "সংখ্যাগুলোকে পরপর সাজাই এবং ৪.৮ কে ৪.৮০ রূপে লিখি।", "right", { w: 60 }),
            { pic: "p072-hasan-ripa", h: 34, w: 48 },
          ], w: [36, 0, 48], gap: 3, align: "center" },
          "ব্যাগ দুইটির ওজনের পার্থক্য ১.২১ কিলোগ্রাম।",
        ] },
      ],
    },
    {
      page: 73,
      dense: true,
      flags: ["p73 অনুশীলন ১ (৩): the ৪ is printed \"৪.\" (a decimal point with no digits after it) over \"− ২.২৫\"; kept as printed"],
      blocks: [
        { ask: "শতাংশ ও সহস্রাংশ পর্যন্ত স্থানবিশিষ্ট দশমিক ভগ্নাংশের যোগ ও বিয়োগ করি।" },
        sm("girl", "think", "দশমিক ভগ্নাংশের যোগ ও বিয়োগের ক্ষেত্রে কিছু বিষয় লক্ষ করি।", "left"),
        { frame: [
          ...[
            ["(১) ৪.০৬ + ২.৯৪", dc([{ t: "৪.০৬", m: "v" }, { t: "২.৯৪", op: "+" }], { t: "৭.০০" }), null, "৪.০৬ + ২.৯৪ = ৭.০০,\nকিন্তু আমরা শুধু ৭ লিখি।\n৪.০৬ + ২.৯৪ = ৭"],
            ["(২) ৪ − ২.৩১", dc([{ t: "৪", m: "x", raw: true }, { t: "২.৩১", op: "−" }], { t: "২.৩৩" }), dc([{ t: "৪.০০", m: "v" }, { t: "২.৩১", op: "−" }], { t: "১.৬৯" }), "৪কে ৪.০০ রূপে লিখি।"],
            ["(৩) ৩.৭৫ − ০.৫", dc([{ t: "৩.৭৫" }, { t: "০.৫", op: "−", raw: true }], { t: "৩.৭০", m: "x" }), dc([{ t: "৩.৭৫" }, { t: "০.৫০", op: "−" }], { t: "৩.২৫", m: "v" }), "০.৫কে ০.৫০ রূপে লিখি।"],
            ["(৪) ৭.৫৮ − ৬.৮৭", dc([{ t: "৭.৫৮" }, { t: "৬.৮৭", op: "−" }], { t: "৭১", m: "x", raw: true }), dc([{ t: "৭.৫৮" }, { t: "৬.৮৭", op: "−" }], { t: "০.৭১", m: "v" }), "দশমিক বিন্দু এবং এককের স্থানে ‘০’ বসানোর কথা যেন ভুলে না যাই।"],
          ].map(([lab, a, b, note]) => ({ row: [{ text: lab }, { ...a, left: true }, b ? { ...b, left: true } : { gap: 1 }, { text: note }], w: [40, 30, 30, 0], gap: 3, align: "center", justify: "flex-start" })),
        ], pad: 2.4 },
        sm("boy", "talk", "আমরা একইভাবে সহস্রাংশ স্থানবিশিষ্ট ভগ্নাংশের যোগ ও বিয়োগ করতে পারি।"),
        { row: [{ kind: "c5p063_dbox", head: "২.১৫ + ৩.৪১২", op: "+", bw: 34 }, { kind: "c5p063_dbox", head: "৮.৫৯২ − ৪.৩৭", op: "-", bw: 34 }], justify: "space-evenly" },
        { ex: "১", mark: "anu", text: "উপর-নিচে হিসাব করি।", body: [
          { row: [
            [[{ t: "০.২৮" }, { t: "৬.৭২", op: "+" }], "(১)"], [[{ t: "৩.১৪১" }, { t: "৫.৩৭৯", op: "+" }], "(২)"],
            [[{ t: "৪." }, { t: "২.২৫", op: "−" }], "(৩)"], [[{ t: "৭.৬৫২" }, { t: "৬.৬৪৮", op: "−" }], "(৪)"],
          ].map(([rows, lab]) => ({ row: [{ text: lab }, dc(rows, null, { size: 13.5 })], w: [9, 0], gap: 1, align: "flex-start" })), gap: 4 },
        ] },
      ],
    },
  ],
};
