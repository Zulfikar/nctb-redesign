// অধ্যায় ৮ · পরিমাপ, its area part: printed pages 124–133 (PDF pages 131–140), every word as printed. Written by a helper
// (25 Nov 2026).
// আয়ত ও বর্গের ক্ষেত্রফল (p124: a 5 × 3 cm rectangle and a 4 × 4 cm square at true size, the two formulas, the working with
// the squares counted); p125: shapes of 7 and 9 sq cm on dot paper (true 1 cm), then এয়র, হেক্টর and বর্গ কিমি on three
// 10 × 10 grids; p126: the units to fill, the L-shape, রাফির ঘর, three more shapes; সামান্তরিকের ক্ষেত্রফল (p127: an 8 cm
// × 6 cm parallelogram on squared paper, cut and moved by রাফি and তুলি; p128: the formula, two to work out, four to do,
// 12 sq cm parallelograms on dot paper at true size); ত্রিভুজের ক্ষেত্রফল (p129: the right triangle, half its height cut and
// moved, or doubled into a rectangle; p130: acute and obtuse triangles doubled into parallelograms, the formula; p131: three
// triangles between two parallel lines 10 cm apart, a base of 6 cm with heights 1–6 cm, four to do, 6 sq cm triangles on
// squared paper at true size); দেখি পারি কি না (p132) and নিজে করি (p133).
// Own kinds (content/p124-133.parts.js): c5p124_fig (every figure: squared and dot paper, shapes, arrows, labels, right-angle
// marks, curved arrows; truesize for 1 cm = 1 cm), c5p124_eq (lines of working with wide boxes), c5p124_call (p125's notes),
// c5p124_qs (p133's ৩–৫ in one card), c5p124_vr. Reused: Class 3's c3p118_say (smaller speech cards), wave 1's c5p017_mex (a marker beside its body, p131 ২)
// and c5p031_rule (p130's rule box).
// Drawn at true size (1 cm = 1 cm): p124's rectangle and square, the dot and squared papers the children draw on (pp125,
// 128, 131, 132). The other figures keep the book's counts of squares and their true proportions at a smaller scale, as
// the book draws them (its squares there are 5 mm), with the lengths labelled as printed.
// Areas worked out: p124 15 and 16 sq cm; p126 L 19.5 sq m (2.5 × 5 + 3.5 × 2 = 6 × 5 − 3.5 × 3), U 1800 sq m, steps 14
// sq km, the orange shape 1440 sq m (with its unlabelled left arm 12 m), রাফির ঘর 37.5 sq m; p127 48 sq cm both ways;
// p129 6 × 2 = 6 × 4 ÷ 2 = 12 sq cm; p130 12 and 6 sq cm; p132 28 + 6 = 34 sq cm, 36 × 12 = 432 sq cm; p133 ৪ 55 × 55 =
// 3025 ✓, ৫ 1.2 × 2 ÷ 0.8 = 3 m, ৬ 45 − 22.5 = 22.5 and 60 − 25 = 35 sq cm.
const say = (who, mood, text, o = {}) => ({ kind: "c3p118_say", who, mood, text, fs: 12, face: 16, ...o });
const fig = (o) => ({ kind: "c5p124_fig", ...o });
const eq = (rows, o = {}) => ({ kind: "c5p124_eq", rows, ...o });
const GREY = "#C9C9C9";
// a parallelogram or triangle drawn as the book's grey figure
const shape = (pts, fill = GREY) => ({ poly: pts, fill, sw: .4 });
// "১ সেমি" on the top-right square of a grid whose right edge is at x = R (squares of 1 unit)
const cm1 = (R, fs = 3, off = 5.6) => [
  { dim: [R - 1, -.32, R, -.32], t: "১ সেমি", at: "above", fs, hl: 1.3, off: 2.4 },
  { dim: [R + .3, 0, R + .3, 1], t: "১ সেমি", at: "right", fs, hl: 1.3, off },
];
// p126's and p133's houses are traced from the book's drawing (pixels of the page at 300 or 500 dpi, from a corner)
const shift = (dx, dy) => (pts) => pts.map(([x, y]) => [x - dx, y - dy]);
const h6 = shift(940, 70), h3 = shift(0, 90);
const PEACH = "#F7B582";

module.exports = {
  pages: [
    {
      page: 124,
      title: "আয়ত ও বর্গের ক্ষেত্রফল",
      spread: true,
      // "সে মি" (with a space) is printed twice in the working; kept as printed and flagged
      flags: ["p124: the working prints “৫ সে মি × ৩ সেমি” and “৪ সে মি × ৪ সেমি” (সে মি with a space, then সেমি): kept as printed"],
      blocks: [
        { ask: "নিচে একটি আয়ত এবং একটি বর্গ রয়েছে। একটি অপরটি থেকে কতটুকু বড়ো?" },
        // true size: 5 cm × 3 cm and 4 cm × 4 cm
        { row: [
          fig({ u: 10, w: 5, h: 3, pad: [13, 9, 2, 1], truesize: true, items: [
            { poly: [[0, 0], [5, 0], [5, 3], [0, 3]], fill: "#6CCBDD", sw: .3 },
            { dim: [0, -.4, 5, -.4], t: "৫ সেমি", at: "above", fs: 3.9, off: 3.2 },
            { dim: [-.55, 0, -.55, 3], t: "৩ সেমি", at: "left", rot: -90, fs: 3.9, off: 3.2 },
          ] }),
          fig({ u: 10, w: 4, h: 4, pad: [2, 9, 13, 1], truesize: true, items: [
            { poly: [[0, 0], [4, 0], [4, 4], [0, 4]], fill: "#A3CC3A", sw: .3 },
            { dim: [0, -.4, 4, -.4], t: "৪ সেমি", at: "above", fs: 3.9, off: 3.2 },
            { dim: [4.55, 0, 4.55, 4], t: "৪ সেমি", at: "right", rot: 90, fs: 3.9, off: 3.2 },
          ] }),
        ], justify: "space-around", align: "flex-start" },
        { row: [
          say("boy", "talk", "প্রতিটি আকৃতিতে কয়টি ১ বর্গ সেমি রয়েছে?"),
          say("girl", "think", "তোমার কি মনে আছে, আমরা কীভাবে ক্ষেত্রফল নির্ণয় করি?"),
        ], gap: 6 },
        // the two formulas, the book's arrows between them
        { row: [
          { text: "আয়তের ক্ষেত্রফল\n= দৈর্ঘ্য × প্রস্থ" },
          fig({ u: 1, w: 16, h: 11, pad: [1, 6, 7, 1], items: [
            { poly: [[0, 0], [16, 0], [16, 11], [0, 11]], fill: "#A3CC3A", sw: .3 },
            { dim: [0, -1.4, 16, -1.4], t: "দৈর্ঘ্য", at: "above", fs: 2.9, off: 2.2, hl: 1.5 },
            { dim: [17.6, 0, 17.6, 11], t: "প্রস্থ", at: "right", rot: 90, fs: 2.9, off: 2.4, hl: 1.5 },
          ] }),
          fig({ u: 1, w: 8, h: 8, pad: [.5, .5, .5, .5], items: [{ poly: [[0, 2.5], [4.3, 2.5], [4.3, 0], [8, 4], [4.3, 8], [4.3, 5.5], [0, 5.5]], fill: "#1FA9DF", stroke: "none" }] }),
          { text: "যেহেতু সকল\nবর্গই আয়ত" },
          fig({ u: 1, w: 8, h: 8, pad: [.5, .5, .5, .5], items: [{ poly: [[0, 2.5], [4.3, 2.5], [4.3, 0], [8, 4], [4.3, 8], [4.3, 5.5], [0, 5.5]], fill: "#1FA9DF", stroke: "none" }] }),
          { text: "বর্গের ক্ষেত্রফল\n= দৈর্ঘ্য × প্রস্থ\n= দৈর্ঘ্য × দৈর্ঘ্য" },
          fig({ u: 1, w: 12, h: 12, pad: [1, 6, 7, 1], items: [
            { poly: [[0, 0], [12, 0], [12, 12], [0, 12]], fill: "#A3CC3A", sw: .3 },
            { dim: [0, -1.4, 12, -1.4], t: "দৈর্ঘ্য", at: "above", fs: 2.9, off: 2.2, hl: 1.5 },
            { dim: [13.6, 0, 13.6, 12], t: "প্রস্থ", at: "right", rot: 90, fs: 2.9, off: 2.4, hl: 1.5 },
          ] }),
        ], w: [36, 25, 10, 27, 10, 37, 21], gap: 0, align: "center" },
        say("boy", "talk", "তাহলে চলো সমাধানটি করে ফেলি।"),
        { row: [
          eq([
            "আয়তের ক্ষেত্রফল : ৫ সে মি × ৩ সেমি",
            "= (৫ × ৩) বর্গ সেমি  = ১৫ বর্গ সেমি",
            "বর্গের ক্ষেত্রফল : ৪ সে মি × ৪ সেমি  = ১৬ বর্গ সেমি",
            "ক্ষেত্রফলের পার্থক্য : ১৬ − ১৫ = ১ বর্গ সেমি",
            "অতএব, বর্গক্ষেত্রটি আয়তক্ষেত্রের চেয়ে ১ বর্গ সেমি বড়ো।",
          ], { gap: 2.2 }),
          // the same rectangle and square cut into their squares of 1 sq cm (5 × 3 = 15, 4 × 4 = 16), smaller, as printed
          { col: [
            fig({ u: 5, w: 5, h: 3, pad: [8, 7, 3, 7], panel: "lime", items: [
              { grid: [0, 0, 5, 3], lines: "solid", lw: .3 },
              { dim: [0, -.45, 5, -.45], t: "৫ সেমি", at: "above", fs: 3.2, off: 2.6, hl: 1.5 },
              { dim: [-.5, 0, -.5, 3], t: "৩ সেমি", at: "left", rot: -90, fs: 3.2, off: 2.6, hl: 1.5 },
              { t: "১৫ বর্গ সেমি", x: 2.5, y: 3.8, fs: 3.4 },
            ] }),
            fig({ u: 5, w: 4, h: 4, pad: [8, 7, 3, 7], panel: "lime", items: [
              { grid: [0, 0, 4, 4], lines: "solid", lw: .3 },
              { dim: [0, -.45, 4, -.45], t: "৪ সেমি", at: "above", fs: 3.2, off: 2.6, hl: 1.5 },
              { dim: [-.5, 0, -.5, 4], t: "৪ সেমি", at: "left", rot: -90, fs: 3.2, off: 2.6, hl: 1.5 },
              { t: "১৬ বর্গ সেমি", x: 2, y: 4.8, fs: 3.4 },
            ] }),
          ], gap: 2 },
        ], w: [0, 46], gap: 3, align: "center" },
      ],
    },
    {
      page: 125,
      dense: true,
      blocks: [
        { ex: "১", mark: "kaj", text: "নিচের ডটযুক্ত কাগজ ব্যবহার করে ৭ বর্গ সেমি ক্ষেত্রফলবিশিষ্ট আকৃতিটি তৈরি করি এবং সহপাঠীদের সঙ্গে দলে আলোচনা করে ইচ্ছেমতো আরও কিছু ক্ষেত্রফলের আকৃতি তৈরি করি।", body: [
          // dot paper at true size, 10 × 7 squares as printed: the yellow 1 sq cm; তুলি's 7 squares (pink: 2 × 3 and 1);
          // রাফি's 9 squares (blue, the bottom row)
          fig({ u: 10, w: 10, h: 7, pad: [1.5, 9, 9, 1.5], truesize: true, items: [
            { cells: [[9, 0]], fill: "#FEF08A" },
            { cells: [[8, 2, 2, 3], [7, 4]], fill: "#FBCFE8" },
            { cells: [[0, 6, 9, 1]], fill: "#C3E5EE" },
            { grid: [0, 0, 10, 7], dots: true },
            ...cm1(10, 3.1, 2.6).map((d, i) => (i ? { ...d, rot: 90 } : d)),
            { t: "১ বর্গ সেমি", x: 7.1, y: -.62, fs: 3.1, bg: "#FEF08A", box: true, bw: 17 },
            { arrow: [8.05, -.55, 9.3, .3], hl: 1.6 },
          ] }),
          // তুলি speaks first (her 7 squares), then রাফি (his 9)
          { row: [
            say("girl", "think", "আমি ৭ বর্গ সেমি ক্ষেত্রফলবিশিষ্ট এই আকৃতিটি তৈরি করেছি।", { side: "left", fs: 11.5, face: 14 }),
            say("boy", "talk", "আমি ৯ বর্গ সেমি ক্ষেত্রফলবিশিষ্ট এই আকৃতিটি তৈরি করেছি।", { fs: 11.5, face: 14 }),
          ], gap: 4, align: "flex-start" },
        ] },
        { note: "বড়ো ক্ষেত্রফল নির্ণয়ের জন্য আরও কিছু একক রয়েছে :" },
        // three 10 × 10 grids: 1 m squares (১ এয়র), 10 m squares (১ হেক্টর, its first square is the এয়র), 100 m squares
        // (১ বর্গ কিমি, its first square is the হেক্টর); each red bracket's arrow points to that first square
        fig({ u: 1, w: 164, h: 46, pad: [1, 1, 1, 1], items: [
          { poly: [[8.7, 8], [44.7, 8], [44.7, 44], [8.7, 44]], fill: "#3BB54A", stroke: "none" },
          { poly: [[64, 8], [100, 8], [100, 44], [64, 44]], fill: "#DC705E", stroke: "none" },
          { cells: [[64, 8, 3.6, 3.6]], fill: "#63AF6F" },
          { poly: [[119.3, 8], [155.3, 8], [155.3, 44], [119.3, 44]], fill: "#F2EC8F", stroke: "none" },
          { cells: [[119.3, 8, 3.6, 3.6]], fill: "#C9443A" },
          ...[8.7, 64, 119.3].map((x) => ({ grid: [x, 8, 10, 10], s: 3.6, lines: "solid", lw: .25 })),
          { t: "১ এয়র = ১০০ বর্গ মি", x: 26.7, y: 27, fs: 3, bg: "#BDE6F2", bw: 32 },
          { t: "১ হেক্টর = ১০০০০ বর্গ মি", x: 82, y: 27, fs: 3, bg: "#BDE6F2", bw: 37 },
          { t: "১ বর্গ কিমি = ১০০০০০০ বর্গ মি", x: 137.3, y: 20.5, fs: 3, bg: "#BDE6F2", bw: 39 },
          { dim: [8.7, 4.4, 44.7, 4.4], t: "১০ মি", at: "above", fs: 3, off: 2.4, hl: 1.6 },
          { dim: [64, 4.4, 100, 4.4], t: "১০০ মি", at: "above", fs: 3, off: 2.4, hl: 1.6 },
          { dim: [119.3, 4.4, 155.3, 4.4], t: "১ কিমি বা ১০০০ মি", at: "above", fs: 3, off: 2.4, hl: 1.6 },
          { t: "১০ মি", x: 5.6, y: 30, fs: 3, rot: -90 },
          { t: "১০০ মি", x: 60.9, y: 30, fs: 3, rot: -90 },
          { t: "১ কিমি বা ১০০০ মি", x: 115.6, y: 31, fs: 3, rot: -90 },
          { poly: [[45.8, 8], [47.4, 8], [47.4, 44], [45.8, 44]], open: true, stroke: "#E11D2E", sw: .4 },
          { poly: [[101.1, 8], [102.7, 8], [102.7, 44], [101.1, 44]], open: true, stroke: "#E11D2E", sw: .4 },
          { arrow: [47.6, 28, 63.6, 11.8], sw: .3, hl: 1.7 },
          { arrow: [102.9, 28, 118.9, 11.8], sw: .3, hl: 1.7 },
        ] }),
        { kind: "c5p124_call", w: 166, items: [
          { tone: "green", text: "‘১ এয়র’ হলো ১০০ বর্গ মি। এটি ১০ মিটার বাহুবিশিষ্ট একটি বর্গের ক্ষেত্রফলের সমান।" },
          { tone: "salmon", text: "‘১ হেক্টর’ হলো ১০০০০ বর্গ মি। এটি ১০০ মিটার বাহুবিশিষ্ট একটি বর্গের ক্ষেত্রফলের সমান।" },
          { tone: "yellow", text: "‘১ বর্গ কিমি’ হলো ১০০০০০০ বর্গ মি। অর্থাৎ এটি ১ কিমি বা ১০০০ মিটার বাহুবিশিষ্ট একটি বর্গের ক্ষেত্রফলের সমান।" },
        ] },
      ],
    },
    {
      page: 126,
      dense: true,
      flags: ["p126 কাজ ৩ (৩): the orange shape's left arm has no length printed (the drawing makes it 12 m, as wide as the top arm, giving 1440 sq m): kept as printed"],
      allow: ["৭", "৪০"], // ৭.৫ মি under রাফির ঘর and ৪০ মি beside shape (১), checked by eye at 400 dpi: tesseract skips the labels in the drawings
      blocks: [
        { ex: "১", mark: "kaj", text: "খালি ঘরগুলো পূরণ করি।", body: [
          { row: [eq(["(১) ১ হেক্টর = ▭ এয়র"], { bw: 24 }), eq(["(২) ১ বর্গ কিমি = ▭ হেক্টর"], { bw: 24 })], gap: 6 },
        ] },
        { ex: "২", mark: "kaj", text: "ডানপাশের L আকৃতির ক্ষেত্রফল কত বর্গ মিটার? এটি কতভাবে হিসাব করা যায় তা সহপাঠীদের সঙ্গে দলে আলোচনা করি।", body: [
          { row: [
            { col: [
              say("boy", "talk", "এটির ক্ষেত্রফল বের করতে কি আমরা আয়তের ক্ষেত্রফলের সূত্র ব্যবহার করতে পারি?"),
              say("girl", "talk", "অবশ্যই তবে এখানে ক্ষেত্রফল নির্ণয়ের বিভিন্ন উপায় রয়েছে।", { side: "left" }),
            ], gap: 3 },
            // 2.5 + 3.5 = 6 m across, 3 + 2 = 5 m down, to scale (9 mm a metre)
            fig({ u: 9, w: 6, h: 5, pad: [8, 7, 8, 7], panel: "frame", items: [
              { poly: [[0, 0], [2.5, 0], [2.5, 3], [6, 3], [6, 5], [0, 5]], fill: "#fff", sw: .45 },
              { t: "২.৫ মি", x: 1.25, y: -.42, fs: 3.6 },
              { t: "৩ মি", x: 2.88, y: 1.5, fs: 3.6, rot: 90 },
              { t: "৩.৫ মি", x: 4.25, y: 2.6, fs: 3.6 },
              { t: "২ মি", x: 6.4, y: 4, fs: 3.6, rot: 90 },
              { t: "৬ মি", x: 3, y: 5.42, fs: 3.6 },
              { t: "৫ মি", x: -.42, y: 2.5, fs: 3.6, rot: -90 },
            ] }),
          ], w: [0, 76], gap: 3, align: "center" },
        ] },
        { row: [
          { ex: "১", mark: "anu", text: "রাফির ঘরের ক্ষেত্রফল নির্ণয় করি।" },
          // রাফির ঘর, traced from the book's drawing: the floor is 5 m × 7.5 m
          fig({ u: .085, w: 830, h: 560, pad: [1, 1, 1, 1], items: [
            { poly: h6([[1115, 122], [1590, 88], [1750, 240], [1275, 312]]), fill: "#A9A9AB" },
            { poly: h6([[952, 288], [1115, 122], [1275, 312]]), fill: "#C4C4C6" },
            { poly: h6([[952, 288], [1275, 312], [1275, 590], [952, 545]]), fill: "#AED48E" },
            { poly: h6([[1275, 312], [1750, 240], [1740, 488], [1275, 590]]), fill: "#98B2DE" },
            { poly: h6([[1040, 370], [1155, 383], [1155, 487], [1040, 474]]), fill: PEACH },
            ...[1063, 1086, 1109, 1132].map((x) => ({ line: [...h6([[x, 370 + (x - 1040) * 13 / 115]])[0], ...h6([[x, 474 + (x - 1040) * 13 / 115]])[0]], sw: .35 })),
            { poly: h6([[1480, 375], [1577, 357], [1577, 522], [1480, 545]]), fill: PEACH },
            { line: [...h6([[1528, 366]])[0], ...h6([[1528, 534]])[0]], sw: .45 },
            { dim: [...h6([[952, 556]])[0], ...h6([[1243, 608]])[0]], hl: 1.8 },
            { dim: [...h6([[1278, 606]])[0], ...h6([[1740, 509]])[0]], hl: 1.8 },
            { t: "৫ মি", ...xy(h6([[1085, 622]])[0]), fs: 3.5, rot: 10 },
            { t: "৭.৫ মি", ...xy(h6([[1545, 586]])[0]), fs: 3.5, rot: -12 },
          ] }),
        ], w: [0, 74], gap: 3, align: "center" },
        { ex: "৩", mark: "kaj", text: "আরও কিছু ক্ষেত্রফল নির্ণয় করি।", body: [
          { row: [
            // (১) 55 m × 40 m less a 20 m × 20 m notch; (৩) 48 m × 48 m (both 0.72 mm a metre); (২) steps of 1 km (7 mm a km)
            fig({ u: .72, w: 55, h: 40, pad: [9, 9, 2, 6], items: [
              { t: "(১)", x: -11.5, y: -10, fs: 4, w: 700, anchor: "start" },
              { poly: [[0, 0], [20, 0], [20, 20], [40, 20], [40, 0], [55, 0], [55, 40], [0, 40]], fill: "#fff", sw: .4 },
              { t: "২০ মি", x: 10, y: -3, fs: 3.3 },
              { t: "১৫ মি", x: 47.5, y: -3, fs: 3.3 },
              { t: "২০ মি", x: 23, y: 8.5, fs: 3.3, rot: 90 },
              { t: "২০ মি", x: 31, y: 17, fs: 3.3 },
              { t: "৪০ মি", x: -3.3, y: 20, fs: 3.3, rot: -90 },
              { t: "৫৫ মি", x: 27.5, y: 43.4, fs: 3.3 },
            ] }),
            fig({ u: 7, w: 4, h: 5, pad: [8, 9, 8, 6], items: [
              { t: "(২)", x: -1.1, y: -1.25, fs: 4, w: 700, anchor: "start" },
              { poly: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [3, 3], [4, 3], [4, 5], [0, 5]], fill: "#fff", sw: .4 },
              ...[0, 1, 2, 3].map((i) => ({ t: "১ কিমি", x: i + .08, y: i - .38, fs: 3.2, anchor: "start" })),
              { t: "৫ কিমি", x: -.45, y: 2.5, fs: 3.3, rot: -90 },
              { t: "২ কিমি", x: 4.45, y: 4, fs: 3.3, rot: 90 },
              { t: "৪ কিমি", x: 2, y: 5.46, fs: 3.3 },
            ] }),
            fig({ u: .72, w: 48, h: 48, pad: [9, 9, 10, 6], items: [
              { t: "(৩)", x: -11.5, y: -10, fs: 4, w: 700, anchor: "start" },
              { poly: [[0, 0], [36, 0], [36, 12], [12, 12], [12, 36], [36, 36], [36, 24], [48, 24], [48, 48], [0, 48]], fill: "#FBBD82", stroke: "none" },
              { t: "৩৬ মি", x: 18, y: -3, fs: 3.3 },
              { t: "১২ মি", x: 37.2, y: 6, fs: 3.3, anchor: "start" },
              { t: "৪৮ মি", x: -3.3, y: 24, fs: 3.3, rot: -90 },
              { t: "২৪ মি", x: 15, y: 24, fs: 3.3, rot: 90 },
              { t: "১২ মি", x: 42, y: 21, fs: 3.3 },
              { t: "২৪ মি", x: 51.3, y: 36, fs: 3.3, rot: 90 },
              { t: "৪৮ মি", x: 24, y: 51.4, fs: 3.3 },
            ] }),
          ], justify: "space-around", align: "flex-start", gap: 2 },
        ] },
      ],
    },
    {
      page: 127,
      title: "সামান্তরিকের ক্ষেত্রফল",
      spread: true,
      blocks: [
        { row: [
          { ask: "৮ সেমি ভূমি এবং ৬ সেমি উচ্চতাবিশিষ্ট সামান্তরিকের ক্ষেত্রফল নির্ণয় করার উপায় বিবেচনা করি।" },
          // 10 × 6 squares as printed, the parallelogram's base 8, its top moved 2 to the right
          fig({ u: 6, w: 10, h: 6, pad: [2, 9, 15, 11], items: [
            shape([[0, 6], [8, 6], [10, 0], [2, 0]]),
            { grid: [0, 0, 10, 6] },
            { dim: [4.05, .05, 4.05, 5.95], t: "৬ সেমি", at: "right", fs: 3.6, off: 7.2 },
            { dim: [0, 6.4, 8, 6.4], t: "৮ সেমি", at: "below", fs: 3.6, off: 3.4 },
            ...cm1(10, 3),
          ] }),
        ], w: [0, 80], gap: 3, align: "center" },
        { row: [
          say("boy", "talk", "আয়তের ক্ষেত্রফল নির্ণয়ের সূত্র ব্যবহার করে সামান্তরিকের ক্ষেত্রফল নির্ণয় করার অনেক উপায় আছে।"),
          say("girl", "talk", "সামান্তরিকের একপাশের অংশ কেটে অন্যপাশে যুক্ত করলে একই ভূমি ও উচ্চতা বিশিষ্ট আয়ত পাওয়া যায়।"),
        ], gap: 4, align: "flex-start" },
        { row: [
          // রাফি: the triangle on the right moved to the left; the rectangle 8 × 6
          fig({ u: 5.1, w: 12, h: 8, pad: [1.2, 7.4, 1.2, 1.2], panel: "yellow", cap: "রাফির ভাবনা", items: [
            { poly: [[1, 7], [9, 7], [11, 1], [3, 1]], fill: "#D9D5BE", stroke: "none" },
            { grid: [0, 0, 12, 8] },
            { poly: [[1, 1], [9, 1], [9, 7], [1, 7]], sw: .55 },
            { poly: [[3, 1], [1, 1], [1, 7]], open: true, dash: "red" },
            { line: [1, 7, 3, 1], dash: "red" },
            { poly: [[9, 7], [9, 1], [11, 1]], open: true, dash: "red" },
            { line: [9, 7, 11, 1], dash: "red" },
            { arc: [10, .85, 2.1, .78], c: [6, -3.1] },
          ] }),
          // তুলি: the part right of the rectangle moved to the left
          fig({ u: 5.1, w: 14, h: 8, pad: [1.2, 7.4, 1.2, 1.2], panel: "blue", cap: "তুলির ভাবনা", items: [
            { poly: [[4, 7], [9, 7], [9, 1], [6, 1]], fill: "#C6C6C8", stroke: "none" },
            { poly: [[9, 7], [12, 7], [14, 1], [9, 1]], fill: "#D8D5DC", stroke: "none" },
            { grid: [0, 0, 14, 8] },
            { poly: [[1, 1], [9, 1], [9, 7], [1, 7]], sw: .55 },
            { poly: [[6, 1], [1, 1], [1, 7], [4, 7]], open: true, dash: "red" },
            { line: [4, 7, 6, 1], dash: "red" },
            { poly: [[9, 7], [9, 1], [14, 1]], open: true, dash: "red" },
            { line: [9, 7, 12, 7], dash: "red" },
            { line: [12, 7, 14, 1], dash: "red" },
            { arc: [11.3, .85, 3.4, .78], c: [7.3, -3.1] },
          ] }),
        ], justify: "space-between", align: "flex-start", gap: 3 },
        "১. রাফির পদ্ধতি অনুযায়ী সামান্তরিকের ক্ষেত্রফল",
        eq(["▭ × ▭ = ▭ বর্গ সেমি"], { indent: 34, bw: 20 }),
        "২. তুলির পদ্ধতি অনুযায়ী সামান্তরিকের ক্ষেত্রফল",
        eq(["▭ × ▭ = ▭ বর্গ সেমি"], { indent: 34, bw: 20 }),
        "(১) এবং (২)-এর ফলাফল থেকে আমরা কী সিদ্ধান্তে আসতে পারি?",
      ],
    },
    {
      page: 128,
      dense: true,
      blocks: [
        { row: [
          { frame: [{ row: [
            "এখানে দৈর্ঘ্যকে ভূমি এবং প্রস্থকে উচ্চতা বিবেচনা করলে সামান্তরিকের ক্ষেত্রফল\n= ভূমি × উচ্চতা",
            fig({ u: 1, w: 42, h: 19.5, pad: [1, 2, 1, 8], items: [
              shape([[7.8, 0], [42, 0], [34.2, 19.5], [0, 19.5]]),
              { dim: [16.5, .4, 16.5, 19.1], t: "উচ্চতা", at: "right", fs: 3.6, off: 6.2 },
              { dim: [0, 21.6, 34.2, 21.6], t: "ভূমি", at: "below", fs: 3.6, off: 3.4 },
            ] }),
          ], w: [0, 45], gap: 3 }], pad: 2.4 },
          say("girl", "think", "এই সূত্রটি আয়তের ক্ষেত্রফল নির্ণয়ের সূত্রের অনুরূপ।", { fs: 11.5, face: 13 }),
        ], w: [106, 0], gap: 3, align: "center" },
        { ex: "১", mark: "kaj", text: "নিচের সামান্তরিকগুলোর ক্ষেত্রফল নির্ণয় করি।", body: [
          { row: [
            // (১) base 7 cm, height 7 cm; (২) base 9 km, height 4 km: true proportions
            fig({ u: 3, w: 8.5, h: 7, pad: [1, 7, 1, 7], items: [
              { t: "(১)", x: -.1, y: -1.6, fs: 3.9, w: 700, anchor: "start" },
              shape([[0, 0], [7, 0], [8.5, 7], [1.5, 7]]),
              { dim: [3.4, .1, 3.4, 6.9], t: "৭ সেমি", at: "right", fs: 3, off: 5.4 },
              { dim: [1.5, 7.45, 8.5, 7.45], t: "৭ সেমি", at: "below", fs: 3, off: 2.7 },
            ] }),
            eq(["ক্ষেত্রফল", "= ▯ সেমি × ▯ সেমি", "= ▭ বর্গ সেমি"], { fs: 11.5, bw: 17, gap: 1.4, nowrap: true }),
            fig({ u: 2.9, w: 10.45, h: 4, pad: [1, 12, 1, 1], items: [
              { t: "(২)", x: -.1, y: -3.6, fs: 3.9, w: 700, anchor: "start" },
              shape([[1.45, 0], [10.45, 0], [9, 4], [0, 4]]),
              { dim: [1.45, -.6, 10.45, -.6], t: "৯ কিমি", at: "above", fs: 3.1, off: 2.7 },
              { dim: [3.6, .1, 3.6, 3.9], t: "৪ কিমি", at: "right", fs: 3.1, off: 5.8 },
            ] }),
            eq(["ক্ষেত্রফল", "= ▯ কিমি × ▯ কিমি", "= ▭ বর্গ কিমি"], { fs: 11.5, bw: 17, gap: 1.4, nowrap: true }),
          ], w: [28, 0, 33, 0], gap: 2, align: "center" },
        ] },
        { ex: "১", mark: "anu", text: "নিচের সামান্তরিকগুলোর ক্ষেত্রফল নির্ণয় করি।", body: [
          { row: [
            eq(["(১) ভূমি = ৭ সেমি, উচ্চতা = ৬ সেমি", "(৩) ভূমি = ৪ মি, উচ্চতা = ৬ মি"], { gap: 1.2 }),
            eq(["(২) ভূমি = ৪ সেমি, উচ্চতা = ১২ সেমি", "(৪) ভূমি = ৩.৫ কিমি, উচ্চতা = ৪ কিমি"], { gap: 1.2 }),
          ], gap: 4 },
        ] },
        { ex: "২", mark: "kaj", text: "নিচের ডটযুক্ত কাগজে ১২ বর্গ সেমি ক্ষেত্রফলবিশিষ্ট সামান্তরিকগুলো তৈরি করি এবং সহপাঠীদের সঙ্গে দলে আলোচনা করি।", body: [
          // dot paper at true size (1 cm between dots)
          fig({ u: 10, w: 15, h: 7, pad: [1.5, 7, 9, 1.5], truesize: true, items: [
            { grid: [0, 0, 15, 7], lines: "none", dots: true, r: .65 },
            { dim: [14, 0, 15, 0], t: "১ সেমি", at: "above", fs: 3, hl: 1.4, off: 2.8 },
            { dim: [15, 0, 15, 1], t: "১ সেমি", at: "right", rot: 90, fs: 3, hl: 1.4, off: 2.6 },
          ] }),
        ] },
      ],
    },
    {
      page: 129,
      title: "ত্রিভুজের ক্ষেত্রফল",
      spread: true,
      allow: ["সূক্ষ্মকোণী"], // তুলি's last line, checked by eye at 600 dpi (tesseract misreads its ক্ষ্ম; p130 has the same word)
      blocks: [
        { ask: "৬ সেমি ভূমি এবং ৪ সেমি উচ্চতাবিশিষ্ট একটি সমকোণী ত্রিভুজের ক্ষেত্রফল কত?" },
        // 8 × 6 squares as printed; the right triangle's base 6, height 4
        fig({ u: 4.8, w: 8, h: 6, pad: [2, 8, 15, 8], panel: "cream", items: [
          { grid: [0, 0, 8, 6] },
          shape([[1, 5], [7, 5], [7, 1]]),
          { dim: [7.55, 1, 7.55, 5], t: "৪ সেমি", at: "right", fs: 3.3, off: 7.4 },
          { dim: [1, 5.45, 7, 5.45], t: "৬ সেমি", at: "below", fs: 3.3, off: 5.2 },
          ...cm1(8, 2.9),
        ] }),
        { note: "চলো, আমরা ত্রিভুজের ক্ষেত্রফল নির্ণয়ের সূত্রটি কীভাবে প্রয়োগ করা যায় তা নিয়ে চিন্তা করি।" },
        { row: [
          { col: [
            // তুলি: the part above half the height cut and turned beside: a rectangle 6 × 2
            fig({ u: 4.3, w: 8, h: 6, pad: [1, 1, 1, 1], panel: "cream", items: [
              shape([[1, 5], [7, 5], [7, 1]]),
              { grid: [0, 0, 8, 6] },
              { poly: [[1, 5], [7, 5], [7, 3]], open: true, stroke: "#16A34A", sw: .6 },
              { line: [1, 5, 7, 1], sw: .35 },
              { poly: [[1, 5], [1, 3], [7, 3], [7, 1]], open: true, dash: "red" },
              { line: [1, 5, 7, 1], dash: "red" },
              { arc: [5.5, 2.55, 2.05, 3.55], c: [3.7, .2] },
            ] }),
            say("girl", "think", "আমি ত্রিভুজের অর্ধেক উচ্চতার উপরের অংশটুকু কেটে পাশে বসিয়ে আয়ত তৈরি করেছি।", { side: "left", fs: 11.5, face: 14 }),
          ], gap: 2 },
          { col: [
            // রাফি: the same triangle again makes a rectangle 6 × 4
            fig({ u: 4.3, w: 8, h: 6, pad: [1, 1, 1, 1], panel: "cream", items: [
              { grid: [0, 0, 8, 6] },
              { poly: [[1, 1], [7, 1], [1, 5]], fill: "#8A80BC", stroke: "none" },
              { poly: [[1, 5], [7, 5], [7, 1]], fill: GREY, stroke: "none" },
              { grid: [1, 1, 6, 4], lc: "#F8FAFC" },
              { poly: [[1, 1], [7, 1], [7, 5], [1, 5]], sw: .35 },
              { line: [1, 5, 7, 1], sw: .8 },
            ] }),
            say("boy", "talk", "আমি একই আকৃতির আরেকটি ত্রিভুজ বসিয়ে একটি আয়ত তৈরি করেছি।", { side: "right", fs: 11.5, face: 14 }),
          ], gap: 2 },
        ], gap: 6, align: "flex-start" },
        { ex: "১", mark: "kaj", text: "সহপাঠীদের সঙ্গে দলে আলোচনা করি।", body: [
          eq([
            "(১) যদি আমরা তুলির পদ্ধতি অনুসরণ করি, তবে এই ত্রিভুজটির ক্ষেত্রফল হবে।",
            { t: "▭ × ▭ = ▭ বর্গ সেমি", in: 18 },
            "(২) যদি আমরা রাফির পদ্ধতি অনুসরণ করি, তবে এই ত্রিভুজটির ক্ষেত্রফল হবে :",
            { t: "▭ × ▭ ÷ ২ = ▭ বর্গ সেমি", in: 18 },
          ], { bw: 20, gap: 1.4 }),
        ] },
        say("girl", "think", "তাহলে দেখা যাচ্ছে ত্রিভুজটির ক্ষেত্রফল আয়তের ক্ষেত্রফলের অর্ধেক। কিন্তু সূক্ষ্মকোণী এবং স্থূলকোণী ত্রিভুজের ক্ষেত্রে কী হবে?", { side: "left" }),
      ],
    },
    {
      page: 130,
      spread: true,
      fixes: [{ book: "ত্রিভূজের", ours: "ত্রিভুজের", why: "a misprint (ূ for ু) in রাফি's first line: the book spells it ত্রিভুজ everywhere else, on this page too" }],
      blocks: [
        say("boy", "talk", "আমরা একটি সূক্ষ্মকোণী ও একটি স্থূলকোণী ত্রিভুজের ক্ষেত্রফল নির্ণয়ের উপায় লক্ষ করি।"),
        { row: [
          { col: [
            // the acute triangle: base 6, height 4 (apex over the 5th line); the same triangle turned makes a parallelogram
            fig({ u: 5.4, w: 10, h: 6, pad: [1.5, 7, 11, 1.5], panel: "cream", items: [
              { grid: [0, 0, 10, 6] },
              shape([[1, 5], [7, 5], [5, 1]]),
              { dim: [7.5, 1, 7.5, 5], t: "৪ সেমি", at: "right", fs: 3.1, off: 5.6, bg: "#fff", bw: 11 },
              { dim: [1, 5.45, 7, 5.45], t: "৬ সেমি", at: "below", fs: 3.1, off: 2.6, bg: "#fff", bw: 11 },
              ...cm1(10, 2.8),
            ] }),
            fig({ u: 5.4, w: 10, h: 6, pad: [1.5, 1.5, 1.5, 1.5], panel: "cream", items: [
              { grid: [0, 0, 10, 6] },
              shape([[3, 5], [9, 5], [7, 1]]),
              shape([[1, 1], [7, 1], [3, 5]], "#FBC98A"),
            ] }),
            say("boy", "talk", "আমি একই আকৃতির আরেকটি সূক্ষ্মকোণী ত্রিভুজ বসিয়ে সামান্তরিক তৈরি করেছি।", { fs: 11.5, face: 14 }),
            eq(["ত্রিভুজটির ক্ষেত্রফল", "= ▭ × ▭ ÷ ২", "= ▭ বর্গ সেমি"], { bw: 17, indent: 6, gap: 1.4 }),
          ], gap: 2.4 },
          { kind: "c5p124_vr", h: 134 },
          { col: [
            // the obtuse triangle: base 3, height 4 (apex beyond the base); turned, it makes a parallelogram
            fig({ u: 5.4, w: 10, h: 6, pad: [1.5, 7, 11, 1.5], panel: "cream", items: [
              { grid: [0, 0, 10, 6] },
              shape([[3, 5], [6, 5], [7, 1]]),
              { dim: [7.25, 1, 7.25, 5], t: "৪ সেমি", at: "right", fs: 3.1, off: 5.6, bg: "#fff", bw: 11 },
              { dim: [3, 5.35, 6, 5.35], t: "৩ সেমি", at: "below", fs: 3.1, off: 2.6, bg: "#fff", bw: 11 },
              ...cm1(10, 2.8),
            ] }),
            fig({ u: 5.4, w: 10, h: 6, pad: [1.5, 1.5, 1.5, 1.5], panel: "cream", items: [
              { grid: [0, 0, 10, 6] },
              shape([[3, 5], [6, 5], [7, 1]]),
              shape([[3, 5], [4, 1], [7, 1]], "#EBB1D3"),
            ] }),
            say("girl", "think", "আমি একই আকৃতির আরেকটি স্থূলকোণী ত্রিভুজ বসিয়ে সামান্তরিক তৈরি করেছি।", { fs: 11.5, face: 14 }),
            eq(["ত্রিভুজটির ক্ষেত্রফল", "= ▭ × ▭ ÷ ২", "= ▭ বর্গ সেমি"], { bw: 17, indent: 6, gap: 1.4 }),
          ], gap: 2.4 },
        ], w: [0, 1, 0], gap: 4, align: "flex-start" },
        say("boy", "talk", "দেখা যাচ্ছে, ত্রিভুজগুলোর ক্ষেত্রফল একই ভূমি ও উচ্চতা বিশিষ্ট সামান্তরিকের ক্ষেত্রফলের অর্ধেক।"),
        { row: [{ kind: "c5p031_rule", text: "ত্রিভুজের ক্ষেত্রফল = (ভূমি × উচ্চতা) ÷ ২", tone: "pink", center: true, size: 13 }], w: [110], justify: "center" },
      ],
    },
    {
      page: 131,
      spread: true,
      blocks: [
        { ex: "১", mark: "kaj", text: "১০ সেমি দূরত্বে দুইটি সমান্তরাল রেখার মাঝে আঁকা ৩টি ত্রিভুজের ক্ষেত্রফল নির্ণয় এবং তুলনা করি। সহপাঠীদের সাথে আলোচনা করি।", body: [
          // to scale (2.9 mm a cm): the lines 10 cm apart, each triangle's base 9 cm, the apexes on the top line
          fig({ u: 2.9, w: 50, h: 10, pad: [1, 1, 12, 8], items: [
            { line: [0, 0, 50, 0], sw: .4 }, { line: [0, 10, 50, 10], sw: .4 },
            { poly: [[4, 10], [13, 10], [6.6, 0]], sw: .5 },
            { poly: [[17.9, 10], [26.9, 10], [26.9, 0]], sw: .5 }, { ra: [26.9, 10], dx: -1, dy: -1, s: 2.6 },
            { poly: [[31.5, 10], [40.5, 10], [43.2, 0]], sw: .5 },
            { line: [46.5, 0, 46.5, 10], dash: "dash", sw: .45 }, { ra: [46.5, 10], dx: 1, dy: -1, s: 2.6 },
            { t: "১০ সেমি", x: 47, y: 5, fs: 3.2, anchor: "start" },
            ...[4, 17.9, 31.5].map((x) => ({ dim: [x, 10.6, x + 9, 10.6], t: "৯ সেমি", at: "below", fs: 3.1, off: 2.8 })),
          ] }),
        ] },
        { kind: "c5p017_mex", ex: "২", mark: "kaj", body: [
          { row: [
            { col: [
              "একটি ত্রিভুজ দেওয়া আছে যার ভূমি ৬ সেমি। যদি এর উচ্চতা ক্রমান্বয়ে ১ সেমি থেকে ৬ সেমি পর্যন্ত বৃদ্ধি করা হয় তবে এর ক্ষেত্রফল কীভাবে বৃদ্ধি পাবে?",
              { table: { head: ["উচ্চতা (সেমি)", "১", "২", "৩", "৪", "৫", "৬"], rows: [["ক্ষেত্রফল (বর্গ সেমি)", "…", "…", "…", "…", "…", "…"]], tone: "blue", small: true } },
            ], gap: 2 },
            // the base 6 cm, the heights 1 to 6 cm, every apex on the middle line (7 mm a cm)
            fig({ u: 7, w: 6, h: 6, pad: [1, 1, 1, 7], items: [
              ...[[6, "#FFFFFF"], [5, "#E4E4E4"], [4, "#C8C8C8"], [3, "#A3A3A3"], [2, "#6E6E6E"], [1, "#3B3535"]].map(([h, c]) => ({ poly: [[0, 6], [6, 6], [3, 6 - h]], fill: c, sw: .3 })),
              { line: [3, 0, 3, 6], dash: "dash", sw: .25 },
              { dim: [0, 6.4, 6, 6.4], t: "৬ সেমি", at: "below", fs: 3, off: 2.6 },
            ] }),
          ], w: [0, 46], gap: 3, align: "flex-start" },
        ] },
        { ex: "১", mark: "anu", text: "নিচের ত্রিভুজগুলোর ক্ষেত্রফল নির্ণয় করি।", body: [
          { row: [
            eq(["(১) ভূমি = ৫ সেমি, উচ্চতা = ৪ সেমি", "(৩) ভূমি = ৫ মি, উচ্চতা = ৫ মি"], { gap: 1.2 }),
            eq(["(২) ভূমি = ৬ সেমি, উচ্চতা = ৮ সেমি", "(৪) ভূমি = ২ সেমি, উচ্চতা = ২.৫ সেমি"], { gap: 1.2 }),
          ], gap: 4 },
        ] },
        { ex: "৩", mark: "kaj", text: "নিচের ছক কাগজে ৬ বর্গ সেমি ক্ষেত্রফলবিশিষ্ট ত্রিভুজ অঙ্কন করি।", body: [
          // squared paper at true size, 10 × 4 squares as printed, the 1 sq cm yellow
          fig({ u: 10, w: 10, h: 4, pad: [1.5, 7, 9, 1.5], truesize: true, items: [
            { cells: [[9, 0]], fill: "#FEF9C3" },
            { grid: [0, 0, 10, 4], dots: true },
            ...cm1(10, 3.1, 2.6).map((d, i) => (i ? { ...d, rot: 90 } : d)),
          ] }),
        ] },
      ],
    },
    {
      page: 132,
      dense: true,
      allow: ["৭", "৪"], // ৭ সেমি and ৪ সেমি inside the orange figure, checked by eye at 250 dpi (tesseract skips them)
      blocks: [
        { review: "দেখি পারি কি না" },
        { ex: "১।", dot: false, text: "নিচের আকৃতিটির ক্ষেত্রফল নির্ণয় করি।", body: [
          // a 7 × 4 rectangle and a right triangle (base 3, height 4): 10 cm in all (5 mm a cm)
          fig({ u: 5, w: 10, h: 4, pad: [2, 6, 2, 7.5], items: [
            { poly: [[0, 0], [7, 0], [10, 4], [0, 4]], fill: "#F7892B", sw: .35 },
            { line: [7, 0, 7, 4], sw: .35 },
            { dim: [0, -.55, 7, -.55], hl: 1.7 },
            { t: "৭ সেমি", x: 3.7, y: .5, fs: 3.2 },
            { dim: [.3, .05, .3, 3.95], hl: 1.6 },
            { t: "৪ সেমি", x: 1.45, y: 2.6, fs: 3.2 },
            { dim: [0, 4.45, 10, 4.45], t: "১০ সেমি", at: "below", fs: 3.2, off: 3 },
          ] }),
          eq([
            "আয়তটির দৈর্ঘ্য = ▭ , প্রস্থ = ▭",
            "আয়তটির ক্ষেত্রফল = ▭ × ▭ = ▭",
            "ত্রিভুজের ভূমি = ▭ − ▭ = ▭",
            "ত্রিভুজের ক্ষেত্রফল = ▭ × ▭ ÷ ▭ = ▭",
            "আকৃতিটির মোট ক্ষেত্রফল = ▭ + ▭ = ▭",
          ], { bw: 19, indent: 8, gap: .9, bh: 6.8 }),
        ] },
        { ex: "২।", dot: false, text: "পাশের ক্ষেত্রটির ক্ষেত্রফল কত?", body: [
          { row: [
            eq([["১টি বর্গের ক্ষেত্রফল", "= ▭ × ▭ = ▭"], ["ক্ষেত্রটিতে মোট বর্গ রয়েছে", "= ▭"], ["ক্ষেত্রটির ক্ষেত্রফল", "= ▭ × ▭ = ▭"]], { lw: 54, bw: 15, gap: .9, bh: 6.8 }),
            // 4 × 3 squares, each 6 cm a side (drawn smaller)
            fig({ u: 7.4, w: 4, h: 3, pad: [1, 6.5, 1, 1], items: [
              { cells: [[0, 0]], fill: "#FEF08A" },
              { grid: [0, 0, 4, 3], lines: "solid", lw: .35 },
              { dim: [0, -.4, 1, -.4], t: "৬ সেমি", at: "above", fs: 3, off: 2.4, hl: 1.5 },
            ] }),
          ], w: [0, 34], gap: 3, align: "center" },
        ] },
        { ex: "৩।", dot: false, text: "ছক কাগজে নিচের আকৃতিগুলো আঁকি।", body: [
          { row: [
            eq(["(১) একটি ত্রিভুজ যার ক্ষেত্রফল ৯ বর্গ সেমি", "(২) একটি আয়ত যার ক্ষেত্রফল ৮ বর্গ সেমি", "(৩) একটি সামান্তরিক যার ক্ষেত্রফল ৬ বর্গ সেমি"], { gap: 3, fs: 12 }),
            // squared paper at true size, 10 × 6 squares as printed
            fig({ u: 10, w: 10, h: 6, pad: [1.5, 6.5, 8.5, 1.5], truesize: true, items: [
              { cells: [[9, 0]], fill: "#FEF08A" },
              { grid: [0, 0, 10, 6], dots: true, r: .55 },
              ...cm1(10, 2.6, 2.4).map((d, i) => (i ? { ...d, rot: 90 } : d)),
            ] }),
          ], w: [0, 112], gap: 2, align: "center" },
        ] },
      ],
    },
    {
      page: 133,
      dense: true,
      allow: ["৭"], // the blue circle's ৭ (নিজে করি ৭), checked by eye: tesseract reads the markers' digits as shapes
      blocks: [
        { practise: "নিজে করি" },
        { ex: "১", mark: "nije", text: "খালি ঘরে সঠিক শব্দ বসাই।", body: [
          eq([["(১) সামান্তরিকের ক্ষেত্রফল", "= ▭ × ▭"], ["(২) ত্রিভুজের ক্ষেত্রফল", "= ▭ × ▭ ÷ ২"]], { lw: 58, bw: 26, indent: 6, gap: 1.4 }),
        ] },
        { ex: "২", mark: "nije", text: "নিচের আকৃতিগুলোর ক্ষেত্রফল নির্ণয় করি।", body: [
          { row: [
            // all four at 3.6 mm a cm, true to their lengths
            fig({ u: 3.6, w: 5, h: 4, pad: [1, 7, 8, 7], items: [
              { t: "(১)", x: 0, y: -1.3, fs: 3.8, w: 700, anchor: "start" },
              { poly: [[0, 4], [5, 4], [1.9, 0]], fill: "#fff", sw: .4 },
              { line: [1.9, 0, 1.9, 4], dash: "dash", sw: .3 }, { ra: [1.9, 4], dx: -1, dy: -1, s: 2.2 },
              { t: "৪ সেমি", x: 2.45, y: 2.75, fs: 2.7, rot: 90 },
              { dim: [0, 4.45, 5, 4.45], t: "৫ সেমি", at: "below", fs: 3, off: 2.6 },
            ] }),
            fig({ u: 3.6, w: 12.4, h: 6, pad: [1, 7, 6, 7], items: [
              { t: "(২)", x: 0, y: -1.3, fs: 3.8, w: 700, anchor: "start" },
              { poly: [[0, 6], [9, 6], [12.4, 0]], fill: "#fff", sw: .4 },
              { line: [9, 6, 12.4, 6], dash: "dash", sw: .3 }, { line: [12.4, 0, 12.4, 6], dash: "dash", sw: .3 },
              { ra: [12.4, 6], dx: -1, dy: -1, s: 2.2 },
              { t: "৬ সেমি", x: 13.1, y: 2.4, fs: 3, rot: 90 },
              { dim: [0, 6.45, 9, 6.45], t: "৯ সেমি", at: "below", fs: 3, off: 2.6 },
            ] }),
            fig({ u: 3.6, w: 6.45, h: 6, pad: [1, 7, 2, 7], items: [
              { t: "(৩)", x: 0, y: -1.3, fs: 3.8, w: 700, anchor: "start" },
              { poly: [[0, 0], [5, 0], [6.45, 6], [1.45, 6]], fill: "#fff", sw: .4 },
              { line: [2.2, 0, 2.2, 6], dash: "dash", sw: .3 }, { ra: [2.2, 6], dx: 1, dy: -1, s: 2.2 },
              { t: "৬ সেমি", x: 2.85, y: 2.4, fs: 3, rot: 90 },
              { dim: [1.45, 6.45, 6.45, 6.45], t: "৫ সেমি", at: "below", fs: 3, off: 2.6 },
            ] }),
            fig({ u: 3.6, w: 6.4, h: 10, pad: [1, 7, 4, 7], items: [
              { t: "(৪)", x: 0, y: -1.3, fs: 3.8, w: 700, anchor: "start" },
              { poly: [[0, 10], [2, 10], [5.1, 0], [3.1, 0]], fill: "#fff", sw: .4 },
              { line: [2, 10, 6.4, 10], dash: "dash", sw: .3 }, { line: [5.1, 0, 5.1, 10], dash: "dash", sw: .3 },
              { ra: [5.1, 10], dx: -1, dy: -1, s: 2.2 },
              { t: "১০ সেমি", x: 5.75, y: 3.4, fs: 3, rot: 90 },
              { dim: [0, 10.4, 2, 10.4], t: "২ সেমি", at: "below", fs: 3, off: 2.6, hl: 1.2, sw: .25 },
            ] }),
          ], justify: "space-around", align: "flex-end", gap: 2 },
        ] },
        // ৩–৫: three word problems, one card (as the book lists them, one under another)
        { kind: "c5p124_qs", mark: "nije", items: [
          ["৩", "একটি আয়তাকার জমির প্রস্থ ৮৫ মিটার এবং দৈর্ঘ্য ১০৫ মিটার। জমিটির ক্ষেত্রফল কত?"],
          ["৪", "একটি বর্গাকার বাড়ির প্রস্থ ৫৫ মিটার এবং এর ক্ষেত্রফল ৩০২৫ বর্গ মিটার। বাড়িটির দৈর্ঘ্য কত মিটার?"],
          ["৫", "একটি ত্রিভুজাকৃতি ডিজাইনের উচ্চতা ০.৮ মি এবং এর ক্ষেত্রফল ১.২ বর্গ মি হলে এর ভূমি কত মি?"],
        ] },
        { row: [
          { ex: "৬", mark: "nije", text: "নিচের আকৃতিগুলোর রঙিন অংশের ক্ষেত্রফল নির্ণয় করি।", body: [
            { row: [
              // (১) a 9 × 5 rectangle, the white triangle's top on its top side; (২) base 10, height 12, the white
              // triangle's top on the left side at a height of 5 (3.2 mm a cm)
              fig({ u: 4.2, w: 9, h: 5, pad: [1, 7, 12, 8], items: [
                { t: "(১)", x: 0, y: -1.3, fs: 3.8, w: 700, anchor: "start" },
                { poly: [[0, 0], [9, 0], [9, 5], [0, 5]], fill: "#FBC98A", sw: .4 },
                { poly: [[0, 5], [9, 5], [6.1, 0]], fill: "#fff", sw: .4 },
                { ra: [0, 0], dx: 1, dy: 1, s: 2 }, { ra: [9, 0], dx: -1, dy: 1, s: 2 }, { ra: [0, 5], dx: 1, dy: -1, s: 2 }, { ra: [9, 5], dx: -1, dy: -1, s: 2 },
                { dim: [9.7, 0, 9.7, 5], t: "৫ সেমি", at: "right", fs: 3, off: 5.4 },
                { dim: [0, 5.5, 9, 5.5], t: "৯ সেমি", at: "below", fs: 3, off: 2.6 },
              ] }),
              fig({ u: 3.1, w: 11.6, h: 12, pad: [1, 7, 12, 8], items: [
                { t: "(২)", x: 0, y: -1.5, fs: 3.8, w: 700, anchor: "start" },
                { poly: [[0, 12], [10, 12], [7, 0]], fill: "#FBC98A", sw: .4 },
                { poly: [[0, 12], [10, 12], [2.917, 7]], fill: "#fff", sw: .4 },
                { line: [2.917, 7, 2.917, 12], dash: "dash", sw: .3 }, { ra: [2.917, 12], dx: -1, dy: -1, s: 2 },
                { arc: [2.917, 7, 3.05, 12], c: [4.3, 9.5], head: false, stroke: "#E11D2E", dash: "dash", sw: .3 },
                { t: "৫ সেমি", x: 3.6, y: 10, fs: 2.9, bg: "#fff", bw: 9 },
                { line: [7, 0, 11.6, 0], dash: "dash", sw: .3 }, { line: [11.6, 0, 11.6, 12], dash: "dash", sw: .3 }, { line: [10, 12, 11.6, 12], dash: "dash", sw: .3 },
                { ra: [11.6, 0], dx: -1, dy: 1, s: 2 }, { ra: [11.6, 12], dx: -1, dy: -1, s: 2 },
                { dim: [12.3, 0, 12.3, 12], t: "১২ সেমি", at: "right", fs: 3, off: 6 },
                { dim: [0, 12.5, 10, 12.5], t: "১০ সেমি", at: "below", fs: 3, off: 2.6 },
              ] }),
            ], justify: "space-around", align: "flex-end", gap: 2 },
          ] },
          { ex: "৭", mark: "nije", text: "নিচের চিত্রের ঘরটির রং করা অংশের সম্পূর্ণ ক্ষেত্রফল নির্ণয় করি।", body: [
            // the house traced from the book's drawing: the roof 10 m × 4 m, the long wall 10 m × 3 m, the short wall 5 m × 3 m
            fig({ u: .046, w: 1130, h: 650, pad: [1, 1, 1, 1], items: [
              { poly: h3([[318, 158], [865, 118], [1045, 293], [502, 375]]), fill: "#45C4E3" },
              { poly: h3([[133, 348], [318, 158], [502, 375]]), fill: "#fff" },
              { poly: h3([[133, 348], [502, 375], [502, 692], [133, 636]]), fill: "#AED48E" },
              { poly: h3([[502, 375], [1045, 293], [1035, 575], [502, 692]]), fill: "#98B2DE" },
              { poly: h3([[252, 475], [382, 475], [382, 592], [252, 592]]), fill: PEACH },
              { poly: h3([[737, 450], [848, 427], [848, 613], [737, 642]]), fill: PEACH },
              { dim: [...h3([[507, 714]])[0], ...h3([[1033, 599]])[0]], hl: 1.6 },
              ...[["১০ মি", 625, 182, -4], ["৪ মি", 450, 268, 50], ["৪ মি", 1010, 180, 44], ["১০ মি", 760, 368, -8.6], ["৩ মি", 1080, 434, 90], ["৩ মি", 530, 535, 90],
                ["৫ মি", 318, 400, 4], ["৩ মি", 108, 492, -90], ["৫ মি", 290, 698, 9], ["১০ মি", 830, 690, -12.3]]
                .map(([t, x, y, rot]) => ({ t, ...xy(h3([[x, y]])[0]), fs: 2.7, rot })),
            ] }),
          ] },
        ], w: [0, 66], gap: 3, align: "stretch" },
      ],
    },
  ],
};
function xy([x, y]) { return { x, y }; }
