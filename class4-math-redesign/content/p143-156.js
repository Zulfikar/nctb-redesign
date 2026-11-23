// অধ্যায় ১০ · জ্যামিতি, its first half: printed pages 143–156 (PDF pages 150–163), every word as printed. Written by a helper
// (23 Nov 2026).
// কোণ পরিমাপ (pp143–149): what an angle is (the slotted square and round papers), degrees, the protractor (চাঁদা), right, acute
// and obtuse angles, measuring and drawing an angle, the set squares, the table of angles, angles found without measuring, the
// clock's hands; লম্বরেখা (pp150–151): the road map, perpendiculars; সমান্তরাল রেখা (pp152–155): parallels, a railway, the
// distance between them, a transversal, drawing a perpendicular with a protractor and with set squares; দেখি পারি কি না (p156).
// Own kinds (content/p143-156.parts.js): c4p143_fig (every angle, line, protractor and set square, drawn true to the degree),
// c4p143_x (the ∠ sign), c4p143_things, c4p143_papers, c4p143_turns, c4p143_arrow, c4p143_pill, c4p143_clocks, c4p143_grid,
// c4p143_map / c4p143_maps (the road map and its views), c4p143_rail, c4p143_steps. Reused: c4_protractor (lib, through
// c4p143_fig), Class 2's p011_tab (the table of angles), Class 3's c3p001_saybox (a speech card holding a drawing), wave 1's
// c4p067_books (the pile of books on p143).
// The book's drawings are stretched sideways (its "৬০°" on p145 measures 53°, its "৪৫°" 38°), so its angles can't be copied by
// measuring: an angle the book names is drawn at that size, and one it doesn't name at the nearest 5° to the book's drawing.
const RED = "#DC2626", PINK = "#DB2777";
const say = (who, mood, text, o = {}) => ({ say: who, mood, text, ...o });
const pol = (v, a, r) => [v[0] + r * Math.cos((a * Math.PI) / 180), v[1] - r * Math.sin((a * Math.PI) / 180)];
const fig = (w, h, items, o = {}) => ({ w, h, items, ...o });
const figs = (list, o = {}) => ({ kind: "c4p143_fig", figs: list, ...o });
const X = (b) => ({ kind: "c4p143_x", b }); // draws ∠
const L = (t, at, o = {}) => ({ t, at, fs: 3.8, ...o }); // a letter on a drawing

// an angle with its letters: the vertex ক, খ at the end of the arm, গ at the end of the base (pp144, 147)
// (swap: খ on the base and গ on the arm, as pp146–147 letter it)
function kkg(a, { w = 40, h = 26, v = [5, 22], base = 30, arm = 26, arc = 7, ac = RED, sw = 0.55, swap } = {}) {
  const [onBase, onArm] = swap ? ["খ", "গ"] : ["গ", "খ"];
  return fig(w, h, [{ angle: v, a: [0, a], len: [base, arm], arc, ac, sw }, L("ক", [v[0] - 2.4, v[1] + 2]), L(onBase, [v[0] + base + 2.8, v[1] + 0.4]), L(onArm, pol(v, a, arm + 2.8))]);
}
// p145: a small protractor with the arm at d° (red lines as in the book), a tinted wedge
function smallProt(d, fill) {
  const c = [17.5, 17];
  return fig(35, 19, [{ prot: c, r: 15 }, { seg: [[0.5, c[1]], [34.5, c[1]]], c: RED, sw: 0.45 }, { ray: c, a: d, len: d === 90 ? 17 : 17.5, c: RED, sw: 0.45 },
    ...(fill ? [{ arc: c, r: 3.4, a: [0, d], c: "#475569", sw: 0.25, fill }] : [])]);
}
function angleFig(d, fill, label) {
  const v = [3, 17];
  return d === 90
    ? fig(42, 19, [{ angle: [4, 17], a: [0, 90], len: [30, 16], right: 3.2, sw: 0.55 }, L(label, [23, 6], { fs: 3.9 })])
    : fig(42, 19, [{ angle: v, a: [0, d], len: [34, d === 30 ? 30 : 23], arc: 5, fill, ac: "#475569", asw: 0.25, sw: 0.55 }, L(label, pol(v, d === 30 ? 11 : d === 60 ? 24 : d / 2, d === 30 ? 21 : 15), { fs: 3.9, w: 700 })]);
}
const protRow = (d, fill, text, label) => ({ row: [figs([smallProt(d, fill)]), { kind: "c4p143_arrow", text, w: 38 }, figs([angleFig(d, fill, label)], { justify: "flex-start" })], w: [44, 44, 0], gap: 6, align: "center" });

// p146–147: a protractor (radius r, centre c) on a line ক খ, with the 90° line, an arm at `arm`°, the letters and the book's red boxes
function protOn({ w, h, c, r, arm, ext = 6, labels = true, boxes = false, right = 34, col = PINK, dotG }) {
  const items = [{ prot: c, r }, { seg: [[c[0] - r - 1, c[1]], [c[0] + right, c[1]]], c: col, sw: 0.45 }, { seg: [[c[0], c[1] + 1.5], [c[0], c[1] - r - ext]], c: col, sw: 0.4 }];
  if (arm) items.push({ ray: c, a: arm, len: r + ext + 2, c: col, sw: 0.45 });
  if (labels) items.push(L("ক", [c[0] - 2.4, c[1] + 3.2], { fs: 3.4 }), L("খ", [c[0] + right + 2.6, c[1] - 0.3], { fs: 3.4 }), ...(arm ? [L("গ", pol(c, arm, r + ext + 5), { fs: 3.4 })] : []));
  if (boxes) items.push({ rbox: "১", at: [c[0] + 3.4, c[1] + 3.4] }, { rbox: "২", at: [c[0] + right - 3, c[1] + 3.4] }, { rbox: "৩", at: pol(c, arm + 5, r + ext + 3) });
  return fig(w, h, items);
}

// p148: the two set squares, each angle with a leader to an answer box
const SET = (() => {
  const t30 = Math.tan(Math.PI / 6), V1 = [3, 15], A1 = [91, 15], B1 = [3, 15 + 88 * t30];
  const V2 = [155, 70], A2 = [155, 14], B2 = [99, 70];
  return fig(158, 79, [
    { sq: V1, a: 0, legs: [88, 88 * t30], flip: true, ruler: { edge: 1, unit: 4.5, from: 0, to: 17, start: 1.4 } },
    { rm: V1, a: [-90, 0], s: 3.4, sw: 0.45 }, { arc: A1, r: 6, a: [180, 210], c: "#1E2433", sw: 0.45 }, { arc: B1, r: 8, a: [30, 90], c: "#1E2433", sw: 0.45 },
    { seg: [[3.6, 14.4], [10, 9]], sw: 0.3 }, { box: [10, 3, 21, 7] },
    { seg: [pol(A1, 195, 6), [86, 24]], sw: 0.3 }, { box: [78, 24, 21, 7] },
    { seg: [pol(B1, 50, 8), [22, 66]], sw: 0.3 }, { box: [22, 62.5, 21, 7] },
    { sq: V2, a: 90, legs: [56, 56], ruler: { edge: "h", rev: true, unit: 4.2, from: 0, to: 17, start: 0.6, skip0: true } },
    { rm: V2, a: [90, 180], s: 3.4, sw: 0.45 }, { arc: B2, r: 7, a: [0, 45], c: "#1E2433", sw: 0.45 }, { arc: A2, r: 7, a: [225, 270], c: "#1E2433", sw: 0.45 },
    { seg: [pol(A2, 248, 7), [143, 7]], sw: 0.3 }, { box: [122, 3.5, 21, 7] },
    { seg: [pol(B2, 22, 7), [96, 58]], sw: 0.3 }, { box: [80, 51, 21, 7] },
    { seg: [[155.4, 70.4], [152, 72.5]], sw: 0.3 }, { box: [131, 71.5, 21, 7] },
  ]);
})();
const angCell = (f) => ({ c: [figs([f], { justify: "center" })] });

// p149: the house (∠ক and ৬০° on the roof, খ at the door, the window's diagonals: ২০°, গ, ঘ, ৪০°, ঙ)
const HOUSE = (() => {
  const apex = [75, 4], top = 26, F = [75 - 22 / Math.tan(Math.PI / 3), top], G = [75 + 22 / Math.tan(Math.PI / 3), top];
  const ww = 56, wh = ww * Math.tan((20 * Math.PI) / 180), wx = 74, wy = 31, BL = [wx, wy + wh], C = [wx + ww / 2, wy + wh / 2];
  return fig(150, 64, [
    { rect: [10, top, 130, 36], sw: 0.5 }, { poly: [[10, top], apex, [140, top]], open: true, sw: 0.5 }, { seg: [F, apex], sw: 0.5 }, { seg: [G, apex], sw: 0.5 },
    { arc: F, r: 5, a: [0, 60], c: "#1E2433", sw: 0.4 }, L("৬০°", pol(F, 20, 13), { fs: 3.8 }),
    { arc: F, r: 7, a: [60, 180], c: "#1E2433", sw: 0.4 }, L("ক", pol(F, 128, 11), { fs: 4 }),
    { rect: [30, 38, 22, 24], sw: 0.5 }, { dot: [47, 49], r: 0.9 }, { rect: [52, 58, 4, 4], sw: 0.4 }, L("খ", [61, 58.5], { fs: 4 }),
    { rect: [wx, wy, ww, wh], sw: 0.5 }, { seg: [[wx, wy], [wx + ww, wy + wh]], sw: 0.45 }, { seg: [BL, [wx + ww, wy]], sw: 0.45 },
    { arc: BL, r: 14, a: [0, 20], c: "#1E2433", sw: 0.4 }, L("২০°", pol(BL, 6, 21), { fs: 3.6 }),
    { arc: BL, r: 6, a: [20, 90], c: "#1E2433", sw: 0.4 }, L("গ", pol(BL, 62, 10), { fs: 3.8 }),
    { arc: C, r: 6, a: [160, 200], c: "#1E2433", sw: 0.4 }, L("ঘ", pol(C, 180, 11), { fs: 3.8 }),
    { arc: C, r: 6, a: [340, 20], c: "#1E2433", sw: 0.4 }, L("৪০°", pol(C, 0, 16), { fs: 3.6 }),
    { arc: C, r: 8.5, a: [20, 160], c: "#1E2433", sw: 0.4 }, L("ঙ", pol(C, 36, 12.5), { fs: 3.8 }),
  ]);
})();

// p150: lines meeting at a right angle (with the mark)
const PERP = [
  fig(34, 30, [{ seg: [[2, 15], [32, 15]] }, { seg: [[15, 1.5], [15, 29]] }, { rm: [15, 15], a: [0, 90], s: 2.4 }]),
  fig(34, 30, [{ seg: [pol([17, 15], 210, 15), pol([17, 15], 30, 15)] }, { seg: [pol([17, 15], 300, 14), pol([17, 15], 120, 14)] }, { rm: [17, 15], a: [30, 120], s: 2.4 }]),
  fig(34, 30, [{ seg: [[3, 15], [22, 15]] }, { seg: [[22, 1.5], [22, 29]] }, { rm: [22, 15], a: [90, 180], s: 2.4 }]),
  fig(34, 30, [{ seg: [[8, 2], [8, 29]] }, { seg: [[8, 2], [33, 2]] }, { rm: [8, 2], a: [-90, 0], s: 2.4 }]),
];
// p150 কাজ ১: the four crossings, seen close
const VIEW = { ক: [81, 20, 30, 26], খ: [46, 42, 30, 26], গ: [9, 42, 30, 26], ঘ: [109, 42, 30, 26] };

// p152: parallel lines and a line across them at a right angle
const PAR = (() => {
  const c = [26, 16], q1 = pol(c, 230, 5.2), q2 = pol(c, 50, 5.2);
  return [
    fig(62, 30, [{ seg: [[2, 10], [60, 10]] }, { seg: [[2, 21], [60, 21]] }, { seg: [[18, 1], [18, 29.5]], c: "#0EA5E9" }, { rm: [18, 10], a: [0, 90], s: 2.4 }, { rm: [18, 21], a: [0, 90], s: 2.4 }]),
    fig(52, 32, [{ seg: [pol(q1, 140, 13), pol(q1, -40, 15)] }, { seg: [pol(q2, 140, 15), pol(q2, -40, 13)] }, { seg: [pol(c, 230, 17), pol(c, 50, 17)], c: "#0EA5E9" },
      { rm: q1, a: [-40, 50], s: 2.4 }, { rm: q2, a: [140, 230], s: 2.4 }]),
  ];
})();
// p152 কাজ ৪: চছ ∥ জঝ, 16 mm apart (the book's 15·7 mm), joined by কখ, গঘ, ঙম
const LADDER = (() => {
  const y1 = 8, y2 = 24, x0 = 9, x1 = 77, xs = [25.5, 44, 67];
  const items = [{ rect: [0, 0, 88, 32], fill: "#FCE7F3", c: "#F9A8D4", rx: 4 }, { seg: [[x0, y1], [x1, y1]] }, { seg: [[x0, y2], [x1, y2]] },
    L("চ", [x0 - 4, y1]), L("ছ", [x1 + 4, y1]), L("জ", [x0 - 4, y2]), L("ঝ", [x1 + 4, y2])];
  [["ক", "খ"], ["গ", "ঘ"], ["ঙ", "ম"]].forEach(([t, b], i) => items.push({ seg: [[xs[i], y1], [xs[i], y2]] }, { rm: [xs[i], y1], a: [-90, 0], s: 1.8 }, { rm: [xs[i], y2], a: [0, 90], s: 1.8 },
    L(t, [xs[i], y1 - 4]), L(b, [xs[i], y2 + 4])));
  return fig(88, 32, items);
})();
// p152 অনুশীলন ৫: কছ ∥ গঝ (the same slope); খজ is level; three lines across
const SLANTS = (() => {
  const k = -0.0315, Y = (x0, y0, x) => y0 + (x - x0) * k, dy = 1.6;
  const items = [{ rect: [0, 0, 140, 31], fill: "#FCE7F3", c: "#F9A8D4", rx: 3 },
    { seg: [[8.5, 9.2 + dy], [130.5, Y(8.5, 9.2, 130.5) + dy]] }, { seg: [[10, 15.05 + dy], [131.7, 15.05 + dy]] }, { seg: [[10, 23.4 + dy], [131.7, Y(10, 23.4, 131.7) + dy]] },
    { seg: [[25.2, 6.3 + dy], [34, 25.7 + dy]] }, { seg: [[59.5, 5.2 + dy], [60.8, 25.7 + dy]] }, { seg: [[103, 4.5 + dy], [97.1, 24.4 + dy]] },
    L("ক", [5, 9.4 + dy]), L("খ", [6.6, 15.05 + dy]), L("গ", [6.6, 23.4 + dy]), L("ছ", [134, 5.3 + dy]), L("জ", [135, 15.05 + dy]), L("ঝ", [135, 19.6 + dy]),
    L("ঘ", [23.6, 3.4 + dy]), L("ঙ", [59, 2.9 + dy]), L("চ", [103.8, 2.2 + dy]), L("ঠ", [36, 27.4 + dy]), L("ট", [62.6, 27.4 + dy]), L("ঞ", [95.6, 26.8 + dy])];
  return fig(140, 31, items);
})();

// p153: a page of lines (5.6 mm apart) cut by a line at 55°, the angle marked at every crossing
const RULED = (() => {
  const ys = [4.6, 10.2, 15.8, 21.4, 27], a = 55, x0 = 18, items = [{ rect: [0, 0, 132, 31], fill: "#fff", sw: 0.5 }];
  ys.forEach((y) => items.push({ seg: [[6, y], [127, y]], sw: 0.4 }));
  const at = (y) => [x0 + (30 - y) / Math.tan((a * Math.PI) / 180), y];
  items.push({ seg: [at(30.5), at(0.6)], sw: 0.45 });
  ys.forEach((y) => items.push({ arc: at(y), r: 2.2, a: [0, a], c: "#1E2433", sw: 0.35 }));
  return fig(132, 31, items);
})();
// pp153–154: a perpendicular drawn with the protractor at গ on ক খ
const G0 = [44, 50], RP = 41;
const kkLine = (items, h, y) => fig(124, h, [{ seg: [[3, y], [116, y]], c: RED, sw: 0.5 }, ...items, L("ক", [4.5, y + 4.2]), L("খ", [116, y + 4.2])]);
const dotG = (p) => ({ dot: p, r: 1.7, c: RED, ring: 0.35 });
const STEP1 = fig(124, 12, [{ seg: [[10, 4], [116, 4]], c: RED, sw: 0.5 }, dotG([46, 4]), L("ক", [11, 9.2]), L("গ", [46, 9.2]), L("খ", [114, 9.2])]);
const G2 = [44, 44], STEP2 = kkLine([{ prot: G2, r: RP }, { seg: [[3, G2[1]], [116, G2[1]]], c: RED, sw: 0.5 }, dotG(G2), L("গ", [G2[0], G2[1] + 4.4])], 50, G2[1]);
const STEP3 = kkLine([{ prot: G0, r: RP }, { seg: [[3, G0[1]], [116, G0[1]]], c: RED, sw: 0.5 }, dotG(G0), L("গ", [G0[0], G0[1] + 4.4]), dotG([G0[0], 3]), L("ঘ", [G0[0] + 5, 3])], 56, G0[1]);
const STEP4 = fig(124, 46, [{ seg: [[3, 40], [112, 40]], c: RED, sw: 0.5 }, { seg: [[38, 40], [38, 3]], c: RED, sw: 0.5 }, dotG([38, 40]), dotG([38, 3]),
  L("ঘ", [43, 3]), L("ক", [4.5, 44.2]), L("গ", [38, 44.4]), L("খ", [110, 44.2])]);
const STEP5 = kkLine([{ prot: G0, r: RP }, { seg: [[3, G0[1]], [116, G0[1]]], c: RED, sw: 0.5 }, { seg: [G0, [G0[0], 3]], c: RED, sw: 0.5 }, dotG(G0), dotG([G0[0], 3]),
  L("গ", [G0[0], G0[1] + 4.4]), L("ঘ", [G0[0] + 5, 3])], 56, G0[1]);

// p156: the review's angles
const R1 = [
  fig(48, 22, [{ angle: [42, 8], a: [165, 180], len: [34, 36], arc: 7, ac: "#1E2433", sw: 0.5 }, L("ক", pol([42, 8], 172.5, 19)), { box: [8, 12, 30, 8.5] }]),
  fig(46, 30, [{ angle: [10, 19], a: [0, 120], len: [32, 18], arc: 4.5, ac: "#1E2433", sw: 0.5 }, L("খ", pol([10, 19], 58, 8.5)), { box: [10, 21.5, 30, 8.5] }]),
];
const R2 = [
  fig(38, 30, [{ angle: [24, 13], a: [35, 180], len: [15, 23], arc: 3, ac: "#1E2433", sw: 0.5 }, L("ক", [19.5, 5]), { box: [2, 20, 30, 8.5] }]),
  fig(38, 30, [{ angle: [10, 14], a: [15, 120], len: [22, 13], arc: 2.8, ac: "#1E2433", sw: 0.5 }, L("খ", pol([10, 14], 66, 7)), { box: [4, 20, 30, 8.5] }]),
  fig(38, 30, [{ seg: [[1, 7], [37, 7]], sw: 0.5 }, { arc: [19, 7], r: 3.6, a: [0, 180], c: "#1E2433", sw: 0.5 }, { dot: [19, 7], r: 0.9 }, L("গ", [19, 13]), { box: [4, 20, 30, 8.5] }]),
  fig(38, 30, [{ angle: [35, 9], a: [165, 195], len: [25, 25], arc: 4, ac: "#1E2433", sw: 0.5 }, L("ঘ", pol([35, 9], 180, 12)), { box: [4, 20, 30, 8.5] }]),
];
const R3 = [
  fig(62, 30, [{ angle: [3, 27], a: [0, 90], len: [56, 25], sw: 0.5 }, { ray: [3, 27], a: 35, len: 46, sw: 0.5 }, { arc: [3, 27], r: 9, a: [35, 90], c: "#1E2433", sw: 0.45 },
    { arc: [3, 27], r: 13, a: [0, 35], c: "#1E2433", sw: 0.35 }, L("৩৫°", pol([3, 27], 13, 26), { fs: 3.8 }), { box: [8, 6, 13, 6.5] }, L("ক", [24.5, 9])]),
  fig(70, 31, [{ seg: [pol([36, 15.5], 176, 31), pol([36, 15.5], 356, 31)], sw: 0.5 }, { seg: [pol([36, 15.5], 206, 29), pol([36, 15.5], 26, 29)], sw: 0.5 },
    { arc: [36, 15.5], r: 9, a: [0, 360], c: "#1E2433", sw: 0.5 }, { arc: [36, 15.5], r: 10.6, a: [356, 26], fill: "#FDE047", c: "#1E2433", sw: 0.4 },
    { angle: [36, 15.5], a: [356, 26], len: [29, 29], sw: 0.5 },
    { arc: [36, 15.5], r: 13, a: [176, 206], c: "#1E2433", sw: 0.4 }, L("৩০°", pol([36, 15.5], 12, 20), { fs: 3.8 }),
    { box: [15, 2, 10, 4.6], deg: true }, { box: [10, 17, 10, 4.6], deg: true }, { box: [33, 26, 9, 4.6], deg: true }]),
];
const R4 = [
  fig(58, 32, [{ seg: [[22, 10], [50, 10]], sw: 0.5 }, { seg: [[2, 10], [22, 10]], sw: 0.4, dash: "1.4 1" }, { ray: [22, 10], a: 210, len: 19, sw: 0.5 },
    { arc: [22, 10], r: 4, a: [0, 210], c: RED, sw: 0.5 }, { arc: [22, 10], r: 10, a: [180, 210], c: "#1E2433", sw: 0.4 }, L("৩০°", pol([22, 10], 196, 15.5), { fs: 3.5 }),
    L("ক", [24.5, 14.2]), L("খ", pol([22, 10], 210, 22.5)), L("গ", [53.5, 10]), { box: [14, 23, 22, 8] }]),
  fig(52, 32, [{ angle: [12, 17], a: [0, 125], len: [34, 19], arc: 4.5, ac: RED, sw: 0.5 }, L("ক", pol([12, 17], 125, 22)), L("খ", [12, 21.4]), L("গ", [49.5, 15]), { box: [14, 23, 22, 8] }]),
  fig(46, 32, [{ angle: [7, 15], a: [0, 35], len: [30, 20], arc: 4, ac: RED, sw: 0.5 }, L("ক", [3, 16.2]), L("খ", pol([7, 15], 35, 23)), L("গ", [40, 15]), { box: [12, 23, 22, 8] }]),
];

module.exports = {
  pages: [
    {
      page: 143,
      opener: { title: "জ্যামিতি" },
      title: "কোণ পরিমাপ",
      spread: true,
      allow: ["১০", "১১", "১২"], // the clock's own Bangla digits (p143's clock prints them; the OCR reads none of them)
      blocks: [
        { ask: "কোণ কী এবং কীভাবে কোণ উৎপন্ন হয়?" },
        { ex: "১", mark: "kaj", text: "নিচের ছবিগুলোতে কোনো কোণা বা কোণ রয়েছে কি না তা খুঁজে বের করি।", body: [{ kind: "c4p143_things" }] },
        { ex: "২", mark: "kaj", text: "একটি গোলাকার কাগজ ও একটি বর্গাকার কাগজ নিই এবং এদেরকে একে অপরের উপর ঘুরিয়ে বিভিন্ন কোণ তৈরি করি।", body: [{ kind: "c4p143_papers", s: 21 }] },
        { row: [
          say("boy", "talk", "চিত্রানুযায়ী, গোলাকার কাগজটির মধ্যবিন্দু ও বর্গাকার কাগজটির মাঝামাঝি পর্যন্ত কাটি।"),
          say("girl", "talk", "চিত্রানুযায়ী, বর্গাকার কাগজের মাঝে বৃত্তাকার কাগজটি প্রবেশ করাই এবং ঘুরিয়ে বিভিন্ন আকারের কোণ তৈরি করি।"),
        ], gap: 3, align: "flex-start" },
      ],
    },
    {
      page: 144,
      spread: true,
      blocks: [
        { kind: "c4p143_turns", degs: [0, 30, 90, 135], s: 25 },
        "কোণগুলোকে ক, খ, গ দ্বারা নামকরণ করে একসঙ্গে সাজালে পাই",
        figs([kkg(35, { w: 40 }), kkg(60, { w: 38, base: 28, arm: 24 }), kkg(90, { w: 36, base: 28, arm: 21, arc: 6 }), kkg(125, { w: 42, v: [16, 22], base: 22, arm: 22, arc: 6 })], { align: "flex-end" }),
        { ex: "১", mark: "anu", text: "উপরের নিয়মে কাগজ ব্যবহার করে আর কিছু কোণ তৈরি করি ও চিত্র আঁকি।" },
        say("boy", "talk", "কোনো কোণের আকৃতি ওই কোণ উৎপন্নকারী রেখা দুইটির দৈর্ঘ্যের সঙ্গে সম্পর্কিত নয় বরং রেখাদ্বয় কতখানি খোলা বা দূরে তার উপর নির্ভরশীল।"),
        say("girl", "think", "আমরা কি কোণের আকৃতিকে সংখ্যায় প্রকাশ করতে পারি?"),
        { note: "কোণের আকৃতি পরিমাপের একক হলো ডিগ্রি এবং একে ‘°’ দ্বারা প্রকাশ করা হয়। কোণের আকৃতিই কোণের পরিমাপ নির্দেশ করে।" },
      ],
    },
    {
      page: 145,
      spread: true,
      allow: ["চাঁদা", "সূক্ষ্মকোণ"], // both checked by eye at 300 dpi (the OCR misreads them)
      blocks: [
        { ask: "কীভাবে কোণ পরিমাপ করা যায়?" },
        say("girl", "talk", "কোণ পরিমাপের জন্য আমরা চাঁদা ব্যবহার করি।"),
        { row: [
          (() => { const c = [40, 39], t1 = pol(c, 49.2, 38.6), t2 = pol(c, 51.8, 38.6);
            return figs([fig(80, 42, [{ prot: c, r: 31 }, { seg: [[1, c[1]], [79, c[1]]], c: PINK, sw: 0.4 }, { seg: [c, [40, 2]], c: PINK, sw: 0.4 },
              { ray: c, a: 50, len: 41, c: PINK, sw: 0.35 }, { ray: c, a: 51, len: 41, c: PINK, sw: 0.35 },
              { arrow: [pol(t1, -40, 4.6), t1], c: RED, sw: 0.55, head: 1.6 }, { arrow: [pol(t2, 140, 4.6), t2], c: RED, sw: 0.55, head: 1.6 }])]); })(),
          { col: [{ kind: "c4p143_pill", text: "১° (১ ডিগ্রি)", tone: "grey" }, { kind: "c4p143_pill", text: "৯০° = সমকোণ", tone: "pink" }], gap: 10 },
        ], w: [0, 56], gap: 4, align: "center" },
        say("boy", "talk", "চলো, আমরা ৯০° সমান ও তার চেয়ে ছোটো কিছু কোণ সম্পর্কে ধারণা নিই।"),
        protRow(90, null, "৯০° এর সমান", "৯০°(সমকোণ)"),
        protRow(45, "#FDE047", "৯০° এর {{১/২}}", "৪৫°"),
        protRow(60, "#38BDF8", "৯০° এর {{২/৩}}", "৬০°"),
        protRow(30, "#F472B6", "৯০° এর {{১/৩}}", "৩০°"),
        say("parrot", "talk", "৯০° অপেক্ষা ছোটো কোণকে সূক্ষ্মকোণ বলে।"),
      ],
    },
    {
      page: 146,
      dense: true,
      allow: ["৯০", "১৮০"], // «৯০°» and «১৮০°» in the girl's and the parrot's words, checked by eye at 300 dpi
      blocks: [
        say("girl", "talk", "চলো, আমরা ৯০° কোণের চেয়ে বড়ো কোণের ধারণা নিই।"),
        figs([
          fig(80, 41, [{ prot: [40, 37], r: 31 }, { seg: [[1, 37], [79, 37]], c: PINK, sw: 0.4 }, { seg: [[40, 39.5], [40, 2]], c: PINK, sw: 0.4 }, { ray: [40, 37], a: 110, len: 37.5, c: PINK, sw: 0.5 }]),
          fig(48, 36, [{ angle: [14, 32], a: [0, 110], len: [30, 31], arc: 6, ac: PINK, sw: 0.55 }, L("১১০°", pol([14, 32], 35, 13.5), { fs: 3.8 })]),
        ], { justify: "space-around" }),
        say("parrot", "talk", "৯০° চেয়ে বড়ো ও ১৮০° চেয়ে ছোটো কোণকে স্থূলকোণ বলে।"),
        { ex: "১", mark: "kaj", text: "চাঁদার সাহায্যে কোণ ‘ক’ পরিমাপ করি।", body: [
          { row: [
            figs([kkg(50, { w: 62, h: 30, v: [5, 26], base: 50, arm: 30, arc: 6, ac: "#1E2433", swap: true })], { justify: "flex-start" }),
            X({ frame: [{ text: "ক কোণকে ∠ক বা ∠খকগ রূপে লেখা যায় এবং কোণ খকগ পড়া যায়।", center: true }], pad: 2 }),
          ], w: [66, 0], gap: 4, align: "center" },
          { row: [
            { col: ["[১] চাঁদার কেন্দ্রবিন্দুকে ক শীর্ষবিন্দুতে স্থাপন করি।", "[২] কখ বাহুকে চাঁদার ০° এর সঙ্গে মিলাই।", "[৩] কগ বাহু চাঁদার যে দাগটির সঙ্গে মিলিত হয় তার মানটিই হলো কোণের পরিমাণ।"], gap: 1 },
            figs([protOn({ w: 66, h: 41, c: [31, 36], r: 26, arm: 50, ext: 5, right: 30, boxes: true })]),
          ], w: [0, 68], gap: 3, align: "center" },
          X("কোণ ক-এর পরিমাপ ৫০° (∠ক = ৫০° বা ∠খকগ = ৫০°)।"),
        ] },
        { ex: "১", mark: "anu", text: "নিচের কোণগুলো পরিমাপ করি।", body: [
          figs([
            fig(38, 26, [{ angle: [3, 23], a: [0, 60], len: [32, 24], arc: 4.5, ac: "#1E2433", sw: 0.55 }, L("ক", pol([3, 23], 30, 10), { fs: 4.2 })]),
            fig(38, 26, [{ angle: [36, 23], a: [145, 180], len: [32, 33], arc: 5, ac: "#1E2433", sw: 0.55 }, L("খ", pol([36, 23], 162, 11.5), { fs: 4.2 })]),
            fig(36, 26, [{ angle: [4, 23], a: [0, 90], len: [32, 22], right: 4, sw: 0.55 }, L("গ", [12.5, 15.5], { fs: 4.2 })]),
            fig(38, 26, [{ angle: [11, 23], a: [0, 110], len: [26, 24], arc: 5, ac: "#1E2433", sw: 0.55 }, L("ঘ", [26, 15.5], { fs: 4.2 })]),
          ], { justify: "space-between" }),
        ] },
      ],
    },
    {
      page: 147,
      spread: true,
      blocks: [
        { ex: "২", mark: "anu", text: "আমরা কয়েকটি দলে মিলে গণিত পাঠ্যপুস্তক, ব্ল্যাকবোর্ড বা জানালার কোণগুলো চাঁদার সাহায্যে পরিমাপ করি এবং কোণগুলোর প্রত্যেকটি কত ডিগ্রি হয় তা পরিমাপ করে প্রকাশ করি।" },
        { row: [
          { ex: "৩", mark: "anu", text: "ঘর বা শ্রেণিকক্ষের দরজার চৌকাঠ বরাবর দরজা খোলা অবস্থায় মেঝেতে চক দিয়ে দাগ দিয়ে চৌকাঠের সঙ্গে কত ডিগ্রি কোণ উৎপন্ন হয় তা পরিমাপ করি।" },
          { pic: "p147-open-door", h: 40, w: 36 },
        ], w: [0, 38], gap: 4, align: "center" },
        { ex: "২", mark: "kaj", text: "৫০° পরিমাপের একটি কোণ আঁকি।", body: [
          { row: ["১। ক খ সরল রেখা আঁকি।", figs([fig(70, 15, [{ seg: [[8, 11], [56, 11]], sw: 0.5 }, L("ক", [9, 6.6], { fs: 3.5 }), L("খ", [53, 6.6], { fs: 3.5 }), { pencil: [56.4, 11.2], a: -128, len: 17, wd: 2.2 }])])], w: [0, 72], gap: 2, align: "center" },
          { row: ["২। ক বিন্দুতে চাঁদার কেন্দ্রবিন্দু স্থাপন করি এবং ক খ রেখাকে ০° বরাবর মিলাই।", figs([protOn({ w: 72, h: 34, c: [33, 30], r: 25, right: 34, ext: 3, col: PINK })])], w: [0, 74], gap: 2, align: "center" },
          { row: ["৩। ৫০° বরাবর একটি বিন্দু গ নিই।", figs([protOn({ w: 72, h: 37, c: [33, 33], r: 25, arm: 50, right: 34, ext: 5, col: PINK })])], w: [0, 74], gap: 2, align: "center" },
          { row: [
            { col: ["৪। চাঁদা সরিয়ে ফেলি এবং ক থেকে গ বিন্দু পর্যন্ত স্কেলের সাহায্যে একটি রেখা টানি।", { gap: 8 }, X("৫। ∠খকগ = ৫০°")], gap: 1 },
            figs([kkg(50, { w: 60, h: 37, v: [14, 33], base: 36, arm: 37, arc: 5, ac: "#1E2433", swap: true })]),
          ], w: [0, 74], gap: 2, align: "center" },
        ] },
      ],
    },
    {
      page: 148,
      spread: true,
      blocks: [
        { ex: "৩", mark: "kaj", text: "নিচের ত্রিকোণী সেটের কোণগুলো পরিমাপ করি।", body: [figs([SET])] },
        "কোণসমূহকে নিম্নরূপে শ্রেণিবিভাগ করা যায়।",
        { kind: "p011_tab", tone: "yellow", cols: ["36%", "34%", "30%"], rows: [
          { type: "hd", cells: ["কোণ", "পরিমাপ", "নাম"] },
          { cells: [angCell(fig(34, 20, [{ angle: [8, 18], a: [0, 60], len: [24, 19], arc: 3.2, ac: "#1E2433", sw: 0.5 }])), "৯০°এর ছোটো", "সূক্ষ্মকোণ"], h: 24 },
          { cells: [angCell(fig(34, 22, [{ angle: [8, 20], a: [0, 90], len: [26, 19], right: 2.8, sw: 0.5 }])), "৯০°", "সমকোণ"], h: 26 },
          { cells: [angCell(fig(34, 20, [{ angle: [13, 18], a: [0, 115], len: [20, 18], arc: 5, ac: "#1E2433", sw: 0.5 }])), "৯০°এর বড়ো এবং ১৮০°এর ছোটো", "স্থূলকোণ"], h: 24 },
          { cells: [angCell(fig(40, 14, [{ seg: [[1, 11.5], [39, 11.5]], sw: 0.5 }, { arc: [20, 11.5], r: 8.5, a: [0, 180], c: "#1E2433", sw: 0.45 }, { dot: [20, 11.5], r: 0.8 }, L("১৮০°", [20, 7.6], { fs: 3.3 })])), "১৮০°", "সরলকোণ"], h: 20 },
        ] },
      ],
    },
    {
      page: 149,
      dense: true,
      allow: ["কাঁটা", "৪০"], // both checked by eye at 300 dpi: «কাঁটা» in অনুশীলন ৪ and the window's «৪০°» (the OCR misreads them)
      blocks: [
        X({ ex: "৪", mark: "kaj", text: "পরিমাপ না করে ∠ক, ∠খ, ∠গ, ∠ঘ এবং ∠ঙ কোণগুলোর মান নির্ণয় করি।", body: [figs([HOUSE])] }),
        { ex: "৪", mark: "anu", text: "ঘড়ির ঘণ্টা ও মিনিটের কাঁটা দ্বারা সৃষ্ট কোণগুলোর পরিমাপ করে বলি।", body: [
          { kind: "c4p143_clocks", size: 27, items: [{ h: 3, m: 0, label: "(১)" }, { h: 2, m: 0, label: "(২)" }, { h: 6, m: 0, label: "(৩)" }, { h: 4, m: 30, label: "(৪)" }] },
        ] },
        { ex: "৫", mark: "anu", text: "পেনসিল দিয়ে ছক কাগজে বিভিন্ন ধরনের কোণ এঁকে তা নামকরণ করি।", body: [
          { text: "(যেমন– সমকোণ, সূক্ষ্মকোণ, স্থূলকোণ, সরলকোণ ইত্যাদি।)", center: true },
          { kind: "c4p143_grid", cols: 12, rows: 12, s: 5.6 },
        ] },
      ],
    },
    {
      page: 150,
      title: "লম্বরেখা",
      dense: true,
      blocks: [
        { ask: "চলো, নিচের রাস্তাগুলো কীভাবে একটি অপরটির ওপর দিয়ে আড়াআড়িভাবে গেছে তা নিয়ে আলোচনা করি।" },
        { kind: "c4p143_maps", justify: "center", maps: [{ w: 132 }] },
        { ex: "১", mark: "kaj", text: "ক, খ, গ ও ঘ-এর মধ্যে কোন কোন বিন্দুতে দুইটি রেখা পরস্পরের সাথে সমকোণে মিলিত হয়েছে?", body: [
          { kind: "c4p143_maps", maps: ["ক", "খ", "গ", "ঘ"].map((k) => ({ w: 37, view: VIEW[k] })) },
        ] },
        { row: [say("parrot", "talk", "একটি রেখা অপর একটি রেখার উপর লম্ব হবে যখন এরা একে অপরকে সমকোণে ছেদ করে বা মিলিত হয়।")], w: [0] },
        figs(PERP, { justify: "space-around" }),
      ],
    },
    {
      page: 151,
      dense: true,
      blocks: [
        { ex: "২", mark: "kaj", text: "চিত্রে আনুভূমিক রেখাটিকে আরও বাড়ানো হলে এই রেখা দুইটি কীভাবে একটি আরেকটিকে ছেদ করবে?", body: [
          { row: [
            figs([fig(40, 24, [{ rect: [1, 1, 38, 22], rx: 7, sw: 0.45, fill: "#fff" }, { seg: [[5, 12], [23, 12]], sw: 0.5 }, { seg: [[31, 5], [31, 19]], sw: 0.5 }])]),
            { kind: "c3p001_saybox", who: "girl", mood: "think", text: "আমার মনে হয়, শুধু লম্ব হবে।", body: [
              figs([fig(34, 20, [{ seg: [[2, 10], [12, 10]], sw: 0.5 }, { seg: [[12, 10], [30, 10]], sw: 0.45, dash: "1.2 1" }, { seg: [[20, 1], [20, 19]], sw: 0.5 }, { rm: [20, 10], a: [90, 180], s: 2.2 }])], { justify: "center" }),
            ] },
          ], w: [44, 0], gap: 6, align: "center" },
        ] },
        { ex: "১", mark: "anu", text: "মূল প্রশ্নে প্রদত্ত মানচিত্র থেকে আরও এক জোড়া লম্বরেখা খুঁজে বের করি।" },
        { ex: "২", mark: "anu", text: "নিচের ছবিগুলোর মধ্যে কোনটিতে লম্ব আছে?", body: [
          figs([
            fig(30, 22, [{ seg: [[4, 10], [23, 10]] }, { seg: [[23, 1], [23, 21]] }], { cap: "ক" }),
            fig(30, 22, [{ seg: [pol([15, 11], 105, 10.5), pol([15, 11], 285, 10.5)] }, { seg: [pol([15, 11], 30, 11), pol([15, 11], 210, 11)] }], { cap: "খ" }),
            fig(30, 22, [{ seg: [[3, 1.5], [13, 11.5]] }, { seg: [[11, 21.5], [25, 7.5]] }], { cap: "গ" }),
          ], { justify: "space-around" }),
        ] },
        { ex: "৩", mark: "anu", text: "লম্ব রেখা আছে পরিবেশের এমন বস্তুর কথা চিন্তা করি এবং বস্তুগুলোর নাম লিখি।" },
        { ex: "৩", mark: "kaj", text: "চলো, নিচের মানচিত্র দুইটিতে রাস্তাগুলো কীভাবে পাশাপাশি সাজানো আছে তা দেখি।", body: [
          { kind: "c4p143_maps", justify: "space-around", maps: [
            { w: 46, view: [36, 22, 42, 30], cap: "চিত্র-১", labels: [["ঝ", 43.5, 18.4], ["ঞ", 68.2, 18.4], ["ঙ", 32.2, 33.3], ["ক", 81.8, 33.3], ["ছ", 43.5, 56], ["ঢ", 74.8, 56]] },
            { w: 36, view: [28.5, 26, 36, 40], cap: "চিত্র-২", labels: [["ঝ", 43.5, 21.6], ["ঙ", 24.2, 33.3], ["ক", 68.8, 33.3], ["গ", 24.2, 55.6], ["ঘ", 68.8, 55.6], ["ছ", 43.5, 70.4]] },
          ] },
          "(ক) ১নং চিত্রে কোন রেখা দুইটি পরস্পর লম্ব?",
          "(খ) ২নং চিত্রে কোন রেখা দুইটি সমান দূরে?",
        ] },
      ],
    },
    {
      page: 152,
      title: "সমান্তরাল রেখা",
      dense: true,
      allow: ["জঝ"], // কাজ ৪: «‘চছ’ ও ‘জঝ’», checked by eye at 300 dpi (the OCR misreads it)
      blocks: [
        "দুইটি রেখা যদি সর্বদা একে অপর থেকে সমান দূরত্বে থাকে তখন তারা সমান্তরাল হয়।",
        figs(PAR, { justify: "space-around", align: "center" }),
        { ex: "৪", mark: "anu", text: "মূল প্রশ্নে প্রদত্ত মানচিত্র থেকে আরও এক জোড়া সমান্তরাল রেখা খুঁজে বের করি।" },
        { ex: "৪", mark: "kaj", text: "নিচের চিত্রে ‘চছ’ ও ‘জঝ’ সমান্তরাল রেখা দেয়া আছে। কখ, গঘ এবং ঙম এর দৈর্ঘ্য পরিমাপ করি।", body: [figs([LADDER], { justify: "center" })] },
        { kind: "c3p001_saybox", who: "girl", mood: "talk", text: null, body: [
          { row: [{ kind: "c4p143_rail", w: 36 }, "সমান্তরাল রেখার আদর্শ হিসেবে আমরা দুইটি সরল রেললাইনকে কল্পনা করতে পারি।"], w: [38, 0], gap: 4, align: "center" },
        ] },
        { note: "দুইটি সমান্তরাল রেখা সব সময় একে অপর থেকে সমান দূরত্বে থাকে। এদেরকে যেকোনো দূরত্ব পর্যন্ত বাড়ানো হোক না কেন, এরা কখনোই একে অপরের সঙ্গে মিলিত হয় না।" },
        { ex: "৫", mark: "anu", text: "নিচের চিত্রে কোন রেখাগুলো সমান্তরাল?", body: [figs([SLANTS], { justify: "center" })] },
      ],
    },
    {
      page: 153,
      dense: true,
      allow: ["অঙ্কন"], // কাজ ৫: «অঙ্কন করা হয়েছে», checked by eye at 300 dpi
      blocks: [
        { ex: "৬", mark: "anu", text: "গ্রাফ পেপারে সমান্তরাল রেখা আঁকি এবং এদের মধ্যবর্তী দূরত্ব নির্ণয় করি।", body: [{ kind: "c4p143_grid", cols: 18, rows: 8, s: 5, over: 2, c: "#A8B4C4" }] },
        { ex: "৫", mark: "kaj", text: "একটি খাতায় অঙ্কিত আনুভূমিক রেখাগুলো পরস্পর সমান্তরাল রেখা। নিচের চিত্রে আনুভূমিক রেখাগুলোকে ছেদ করে এমন একটি তির্যক রেখা অঙ্কন করা হয়েছে। এই তির্যক রেখাটি প্রতিটি আনুভূমিক রেখার সঙ্গে যে কোণ উৎপন্ন করেছে তা পরিমাপ করি।", body: [figs([RULED], { justify: "center" })] },
        { ex: "৬", mark: "kaj", text: "চলো, চাঁদার সাহায্যে একটি রেখার উপর আরেকটি লম্ব রেখা আঁকি।", body: [
          "ধাপ ১: প্রথমে ‘ক খ’ সরল রেখা আঁকি। রেখাটির মধ্যে একটি বিন্দু ‘গ’ চিহ্নিত করি।",
          figs([STEP1], { justify: "center" }),
          "ধাপ ২: এবার ‘গ’ বিন্দুতে চাঁদার কেন্দ্রবিন্দু স্থাপন করি ও ‘ক খ’ রেখাকে ০° বরাবর মিলাই।",
          figs([STEP2], { justify: "center" }),
        ] },
      ],
    },
    {
      page: 154,
      spread: true,
      allow: ["চাঁদা", "৯০"], // ধাপ ৩–৫: «৯০°», «চাঁদা», checked by eye at 300 dpi
      blocks: [
        { ex: "৬", mark: "kaj", text: null, body: [
          "ধাপ ৩: ৯০° বরাবর একটি বিন্দু ‘ঘ’ নিই।",
          figs([STEP3], { justify: "center" }),
          "ধাপ ৪: এবার চাঁদা সরিয়ে ‘গ’ থেকে ‘ঘ’ পর্যন্ত সরল রেখা আঁকি।",
          figs([STEP4], { justify: "center" }),
          "ধাপ ৫: এবার চাঁদা বসিয়ে কোণটি সঠিকভাবে আঁকা হয়েছে কি না যাচাই করে দেখি।",
          figs([STEP5], { justify: "center" }),
        ] },
      ],
    },
    {
      page: 155,
      spread: true,
      allow: ["৩"], // the red-boxed step number ৩ (both columns print it), checked by eye
      blocks: [
        { ex: "৭", mark: "kaj", text: "চলো, আমরা ত্রিকোণী সেটের সাহায্যে লম্বরেখা এবং সমান্তরাল রেখা আঁকি।", body: [{ kind: "c4p143_steps" }] },
        say("girl", "talk", "ত্রিকোণী সেট ব্যবহার করে সহজেই লম্ব ও সমান্তরাল রেখা আঁকা যায়।"),
      ],
    },
    {
      page: 156,
      dense: true,
      allow: ["চাঁদা"], // ১. «চাঁদা ব্যবহার করে», checked by eye at 300 dpi
      blocks: [
        { review: "দেখি পারি কি না" },
        { ex: "১", text: "চাঁদা ব্যবহার করে কোণগুলো পরিমাপ করি।", body: [figs(R1, { justify: "space-around", align: "flex-end" })] },
        { ex: "২", text: "নিচের কোণগুলোর নামকরণ করি।", body: [figs(R2, { justify: "space-between", align: "flex-end" })] },
        { ex: "৩", text: "লুকায়িত কোণগুলো নির্ণয় করি।", body: [figs(R3, { justify: "space-around", align: "flex-end" })] },
        { ex: "৪", text: "নিচের কোণগুলোর পরিমাপ করে লিখি।", body: [figs(R4, { justify: "space-around", align: "flex-end" })] },
        { ex: "৫", text: "লম্ব এবং সমান্তরাল রেখা আঁকি।", body: [{ gap: 19 }] },
      ],
    },
  ],
};
