// অধ্যায় ৯ · জ্যামিতি, its first part: printed pages 149–158 (PDF pages 156–165), every word as printed. Written by a helper
// (25 Nov 2026).
// ট্রাপিজিয়াম ও সামান্তরিক (pp149–153): the four frames and the six quadrilaterals made by laying one over another, the two groups
// by parallel sides, squared paper, measuring parallelograms, drawing one (4 সেমি, 3 সেমি, 60°) with the set squares, the house's
// roof and a trapezium drawn with a protractor, quadrilaterals around us; রম্বস (pp154–155): two equal frames crossed, folded and
// cut paper, designs of rhombi; চতুর্ভুজের কর্ণ (p156) and the table of properties; the nested sets (p157); the flow chart (p158).
// Own kinds (content/p149-158.parts.js): c5p149_fig / c5p149_figs (every drawing), c5p149_blanks, c5p149_rule, c5p149_form,
// c5p149_lines. Reused: Class 2's p011_tab (the tables with drawings and merged cells) and p011_chat (smaller speech cards,
// pp153, 155), Class 3's c3p001_saybox (the girl's speech holding the set-square steps), Class 4's c4p143_x (the ∠ sign),
// c4p157_bullets, lib's c4_protractor (through c5p149_fig); stickers: Class 4's hand-press, Class 3's tree, house, school,
// post-office, playground (the town map). New: the picture p153-stairs and the sticker scissors (PICTURE-PROMPTS-p149-158.md).
// How the drawings are made true: the book's four frames (p149) are measured from the page and kept the same in every
// combination; each combination turns and lays them as the book does, and the quadrilateral in the window is computed (the two
// holes clipped), so ক and চ really have one pair of parallel sides, খ ঘ ঙ two, গ none. A named angle or length is drawn at its
// size (the book's drawings are not to scale: its ৪০° on p152 is drawn about 68°, its ৪৫° on p153 about 38°); the squared-paper
// figures keep the book's grid points.
const INK = "#1E2433", BLUE = "#1D4ED8";
const say = (who, mood, text, o = {}) => ({ say: who, mood, text, ...o });
const rad = (d) => (d * Math.PI) / 180;
const pol = (v, a, r) => [v[0] + r * Math.cos(rad(a)), v[1] - r * Math.sin(rad(a))]; // maths angle, y down
const rot = (p, th) => { const c = Math.cos(rad(th)), s = Math.sin(rad(th)); return [p[0] * c + p[1] * s, -p[0] * s + p[1] * c]; }; // turn th° anticlockwise (as seen)
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mv = (P, d) => P.map((p) => add(p, d));
const sc = (P, k) => P.map(([x, y]) => [x * k, y * k]);
const box = (P) => ({ x0: Math.min(...P.map((p) => p[0])), y0: Math.min(...P.map((p) => p[1])), x1: Math.max(...P.map((p) => p[0])), y1: Math.max(...P.map((p) => p[1])) });
const cen = (P) => [P.reduce((s, p) => s + p[0], 0) / P.length, P.reduce((s, p) => s + p[1], 0) / P.length];
const rectP = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
const fig = (w, h, items, o = {}) => ({ w, h, items, ...o });
const one = (f, o = {}) => ({ kind: "c5p149_fig", ...f, ...o });
const figs = (list, o = {}) => ({ kind: "c5p149_figs", figs: list, ...o });
const L = (t, at, o = {}) => ({ t, at, fs: 3.8, ...o }); // a letter on a drawing
const X = (b) => ({ kind: "c4p143_x", b }); // draws ∠

// a convex polygon clipped by another (Sutherland–Hodgman): the window two frames' holes leave open
function clip(subject, by) {
  const c = cen(by); let out = subject;
  for (let i = 0; i < by.length; i++) {
    const A = by[i], B = by[(i + 1) % by.length], side = (p) => (B[0] - A[0]) * (p[1] - A[1]) - (B[1] - A[1]) * (p[0] - A[0]), sg = Math.sign(side(c));
    const inp = out; out = [];
    for (let j = 0; j < inp.length; j++) {
      const P = inp[j], Q = inp[(j + 1) % inp.length], sp = side(P) * sg, sq = side(Q) * sg;
      if (sp >= -1e-9) out.push(P);
      if ((sp >= -1e-9) !== (sq >= -1e-9)) { const t = sp / (sp - sq); out.push([P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]); }
    }
  }
  return out.filter((p, i) => { const q = out[(i + 1) % out.length]; return Math.hypot(p[0] - q[0], p[1] - q[1]) > 0.05; });
}

// ── p149: the book's four frames, measured from the page (mm about the frame's centre; the name on the top strip) ──
const FW = 29.8, FH = 34.4, OUT = rectP(-FW / 2, -FH / 2, FW / 2, FH / 2);
const FRAMES = {
  r1: { fill: "#35B2E2", label: "আয়ত ১", hole: rectP(-8.55, -9.1, 8.1, 10.9) },
  r2: { fill: "#B1D58F", label: "আয়ত ২", hole: rectP(-4.2, -9.35, 4.2, 13.3) },
  t1: { fill: "#FDE89B", label: "ত্রিভুজ ১", hole: [[0, -9.9], [11.1, 12.6], [-11.1, 12.6]] },
  t2: { fill: "#F3A6C9", label: "ত্রিভুজ ২", hole: [[9.3, -10.5], [9.3, 13.3], [-10.5, 13.3]] },
};
const place = (P, at, th) => P.map((p) => add(at, rot(p, th)));
function frameItems(name, at, th, edge) {
  const f = FRAMES[name], hole = place(f.hole, at, th);
  return [{ poly: place(OUT, at, th), holes: [hole], fill: f.fill, c: null },
    ...(edge ? [{ poly: hole, sw: 0.3 }] : []),
    { t: f.label, at: add(at, rot([0, -FH / 2 + 3], th)), fs: 3.7, rot: -th }];
}
const frameFig = (name) => fig(FW, FH, frameItems(name, [FW / 2, FH / 2], 0, true));
// two frames, the second laid over the first: [name, centre, turn°]; the window's quadrilateral outlined; its letter at top left
function combo(letter, lo, hi) {
  const shape = clip(place(FRAMES[lo[0]].hole, lo[1], lo[2]), place(FRAMES[hi[0]].hole, hi[1], hi[2]));
  const b = box([...place(OUT, lo[1], lo[2]), ...place(OUT, hi[1], hi[2])]), d = [-b.x0 + 6.5, -b.y0 + 0.5];
  const items = [...frameItems(lo[0], add(lo[1], d), lo[2]), ...frameItems(hi[0], add(hi[1], d), hi[2]), { poly: mv(shape, d), fill: "#fff", sw: 0.4 },
    { t: letter + ")", at: [2.6, 3.4], fs: 4.2, w: 600 }];
  return { fig: fig(b.x1 - b.x0 + 7, b.y1 - b.y0 + 1, items), shape };
}
// how the book lays them: ক) আয়ত ২ turned a quarter over ত্রিভুজ ১; খ) আয়ত ১ turned 24° over আয়ত ২; গ) ত্রিভুজ ২ turned a
// quarter over ত্রিভুজ ১ (its window's corner on the triangle's corner); ঘ) আয়ত ২ turned a quarter and 8.7° more over আয়ত ১;
// ঙ) আয়ত ২ turned a quarter over আয়ত ১; চ) আয়ত ২ turned a quarter over ত্রিভুজ ২
const C = {
  ক: combo("ক", ["t1", [0, 0], 0], ["r2", [0, 2.9], 90]),
  খ: combo("খ", ["r2", [0, 0], 90], ["r1", [1.81, 0.59], 24]),
  গ: combo("গ", ["t1", [0, 0], 0], ["t2", [-2.2, 2.1], 90]),
  ঘ: combo("ঘ", ["r1", [0, 0], 0], ["r2", [-2.18, 4.2], 98.7]),
  ঙ: combo("ঙ", ["r1", [0, 0], 0], ["r2", [-2.2, 3.3], 90]),
  চ: combo("চ", ["t2", [0, 0], 0], ["r2", [-0.07, 2.7], 90]),
};
// the quadrilaterals by themselves, each with its letter (p149's last row, p150's table)
function shapesFig(letters, { gap = 7, fill = "#fff", sw = 0.45, fs = 4 } = {}) {
  let x = 1; const items = [], H = Math.max(...letters.map((l) => { const b = box(C[l].shape); return b.y1 - b.y0; }));
  for (const l of letters) {
    const b = box(C[l].shape), P = mv(C[l].shape, [x - b.x0, H + 1 - b.y1]);
    items.push({ poly: P, fill, sw }, L(l, cen(P), { fs, w: 600 }));
    x += b.x1 - b.x0 + gap;
  }
  return fig(x - gap + 1, H + 2, items);
}

// ── squared paper ──
const onGrid = (s, P) => P.map(([i, j]) => [i * s, j * s]);
// p150: the trapezium and the parallelogram on 7 × 7 squares
const gridShape = (P, name, ly) => fig(7 * 4.4, 7 * 4.4, [{ grid: [0, 0, 7, 7, 4.4] }, { poly: onGrid(4.4, P), fill: "#CDE8C5", sw: 0.4 }, L(name, [3.5 * 4.4, ly * 4.4], { fs: 3.4, halo: true, w: 500 })]);
// p151 অনুশীলন ১: six quadrilaterals on 28 × 8 squares, at the book's grid points (ক ঙ parallelograms; গ ঘ trapeziums; খ চ neither)
const S1 = 5.3;
const Q151 = [[[2, 1], [4, 1], [3, 7], [1, 7]], [[6, 2], [8, 2], [9, 7], [4, 5]], [[10, 1], [14, 1], [11.6, 5], [10, 5]],
  [[14, 2.57], [18, 2], [18, 6.73], [14, 5.33]], [[19, 1], [22, 2], [22, 5], [19, 4]], [[24, 3], [26.95, 2.25], [26, 7], [23, 7]]];
const G151 = fig(28 * S1, 8 * S1 + 6, [{ grid: [0, 0, 28, 8, S1] }, ...Q151.map((P) => ({ poly: onGrid(S1, P), sw: 0.6 })),
  ...["(ক)", "(খ)", "(গ)", "(ঘ)", "(ঙ)", "(চ)"].map((t, i) => L(t, [[2.03, 6.33, 11.37, 15.95, 20.45, 24.4][i] * S1, 8 * S1 + 4], { fs: 4, w: 500 }))]);

// p151 কাজ ৩: two parallelograms to measure, drawn true size: 6 সেমি × 3 সেমি at 80°, 4 সেমি × 3 সেমি at 75°
const GREEN = "#4DB848";
const paraP = (base, side, ang, lean) => { const h = side * Math.sin(rad(ang)), o = side * Math.cos(rad(ang));
  return lean > 0 ? [[o, 0], [o + base, 0], [base, h], [0, h]] : [[0, 0], [base, 0], [base + o, h], [o, h]]; };
const P151 = [paraP(60, 30, 80, 1), paraP(40, 30, 75, -1)].map((P) => { const b = box(P); return fig(b.x1 + 1.2, b.y1 + 1.2, [{ poly: mv(P, [0.6, 0.6]), c: GREEN, sw: 1.1 }]); });

// p151 অনুশীলন ২: কখগঘ, কঘ = ৪ সেমি upright, ঘগ = ২ সেমি rising 10°: ∠ক = 100°, ∠ঘ = 80° (7.5 mm a সেমি)
const KKGG = (() => {
  const g = [14, 39], k = [14, 9], gg = pol(g, 10, 15), kh = add(k, [gg[0] - g[0], gg[1] - g[1]]);
  return fig(38, 43.6, [{ poly: [k, kh, gg, g], c: GREEN, sw: 0.9 },
    { ang: [k, kh, g], r: 5.5, c: "#64748B", dash: "0.6 0.6", label: "১০০°", lr: 9.5, fs: 3.3 },
    { ang: [g, gg, k], r: 5.5, c: "#64748B", dash: "0.6 0.6", label: "৮০°", lr: 9.5, fs: 3.3 },
    L("ক", [k[0] - 2.4, k[1] - 2]), L("খ", [kh[0] + 2.4, kh[1] - 1.6]), L("গ", [gg[0] + 2.6, gg[1] + 0.6]), L("ঘ", [g[0] - 2.4, g[1] + 2]),
    L("৪ সেমি", [g[0] - 1.6, 24], { fs: 3.3, anchor: "end" }), L("২ সেমি", [g[0] + 10, g[1] + 2.9], { fs: 3.3 })]);
})();
// p152: চছজঝ, চঝ = ৩ সেমি, ঝজ = ৬ সেমি, ∠চ = 40°, ∠ঝ = 140° (8 mm a সেমি)
const CCJJ = (() => {
  const jh = [32, 26], j = [80, 26], c = pol(jh, 140, 24), ch = add(c, [48, 0]), mid = [(c[0] + jh[0]) / 2, (c[1] + jh[1]) / 2];
  return fig(86, 31, [{ poly: [c, ch, j, jh], c: GREEN, sw: 0.9 },
    { ang: [c, ch, jh], r: 6, c: "#64748B", dash: "0.6 0.6", label: "৪০°", lr: 10, fs: 3.3 },
    { ang: [jh, j, c], r: 4, c: "#64748B", dash: "0.6 0.6", label: "১৪০°", la: 55, lr: 8.4, fs: 3.3 },
    L("চ", [c[0] - 2.2, c[1] - 2.2]), L("ছ", [ch[0] + 2.4, ch[1] - 2.2]), L("জ", [j[0] + 2.6, j[1] + 1.2]), L("ঝ", [jh[0] - 1.6, jh[1] + 2.8]),
    L("৩ সেমি", pol(mid, 230, 3.6), { fs: 3.3, anchor: "end" }), L("৬ সেমি", [58, 29.4], { fs: 3.3 })]);
})();
// p152 কাজ ৪: the parallelogram to copy (৪ সেমি, ৩ সেমি, ৬০°; 9 mm a সেমি) and its steps ১–৫
const PARA60 = (() => {
  const A = [6, 30], B = [42, 30], D = pol(A, 60, 27), Cc = add(D, [36, 0]), mid = [(A[0] + D[0]) / 2, (A[1] + D[1]) / 2];
  return fig(66, 34, [{ poly: [A, B, Cc, D], sw: 0.55 }, { ang: [A, B, D], r: 4.6, label: "৬০°", lr: 8, fs: 3.2 },
    L("৪ সেমি", [D[0] + 18, D[1] - 2.6], { fs: 3.2 }), L("৪ সেমি", [24, A[1] + 2.8], { fs: 3.2 }),
    L("৩ সেমি", [(B[0] + Cc[0]) / 2 + 3, (B[1] + Cc[1]) / 2], { fs: 3.2, anchor: "start" }), L("৩ সেমি", pol(mid, 150, 3), { fs: 3.2, rot: -60 })]);
})();
const CONSTR = (() => {
  const A = [12, 32], B = [48, 32], D = pol(A, 60, 27), Cc = add(D, [36, 0]);
  return fig(78, 38, [{ seg: [D, pol(A, 60, 33)], dash: "0.1 0.8", sw: 0.5 }, { seg: [Cc, pol(B, 60, 33)], dash: "0.1 0.8", sw: 0.5 },
    { bow: [A, D, 2.6] }, { bow: [B, Cc, 2.2] }, { bow: [A, B, -1.4] },
    { poly: [A, B, Cc, D], sw: 0.55 }, { ang: [A, B, D], r: 4.6, label: "৬০°", lr: 8, fs: 3.2 },
    L("৩ সেমি", [12, 17.5], { fs: 3.2, anchor: "end" }), L("৩ সেমি", [50, 15.5], { fs: 3.2 }), L("৪ সেমি", [30, 36], { fs: 3.2 }),
    { rbox: "১", at: [33, 27.6] }, { rbox: "২", at: [22, 21] }, { rbox: "৩", at: [61, 21] }, { rbox: "৪", at: [19.5, 5.4] }, { rbox: "৪", at: [69, 6.4] }, { rbox: "৫", at: [43.5, 4] }]);
})();
// p152: the set squares sliding to draw a parallel line (as Class 4's p155): A (30°–60°) on the line, B (45°) against A's short
// edge; A slides down along B; the new line along A's long edge; the two lines
const sqPoly = (P, fill) => { const c = cen(P); return { poly: P, holes: [P.map((p) => [c[0] + (p[0] - c[0]) * 0.42, c[1] + (p[1] - c[1]) * 0.42])], fill, c: "#3B5B8C", sw: 0.3 }; };
const XA = 15, sqA = (y) => sqPoly([[XA, y], [XA + 21, y], [XA, y + 12]], "#9DB4D6"), sqB = () => sqPoly([[XA, 21], [XA, 3], [XA - 10, 21]], "#C7D5EA");
const hand = (x, y, w = 10, flip = false, r = 0) => ({ img: "hand-press", at: [x, y], w, h: w, emoji: "✋", flip, rot: r });
const ln = (y, x1 = XA, x2 = 39) => ({ seg: [[x1, y], [x2, y]], sw: 0.5 });
const STEP = (items) => fig(40, 24, [{ poly: rectP(0, 0, 40, 24), fill: "#fff", c: "#CBD5E1", sw: 0.3 }, ...items]);
const NEXT = fig(6, 24, [{ farrow: [[0.6, 12], [5.6, 12]], w: 1.6, fill: "#29B6E8", c: "#0284C7" }]);
const SETSQ = figs([
  STEP([sqB(), sqA(3), ln(3), hand(2, 8, 10, false, -12), hand(26, 3, 9, true, 8)]), NEXT,
  STEP([ln(3), sqB(), sqA(10), { arrow: [[XA + 8, 6], [XA + 8, 12]], c: "#B91C1C", sw: 0.8, head: 2 }, hand(2, 12, 10, false, -12), hand(27, 11, 9, true, 8)]), NEXT,
  STEP([ln(3), sqB(), sqA(10), ln(10, XA, 36), { pencil: [36, 10], a: 58, len: 10, wd: 1.8 }, hand(3, 12, 10, false, -12)]), NEXT,
  fig(40, 24, [{ poly: rectP(2, 3, 38, 21), fill: "#EEF2B8", c: "#A3A855", sw: 0.3 }, { seg: [[7, 9], [33, 9]], sw: 0.5 }, { seg: [[7, 15], [33, 15]], sw: 0.5 }]),
], { gap: 0.8, justify: "flex-start", align: "center" });
SETSQ.figs.forEach((f) => (f.k = 0.66));

// ── p153: the house (its roof a trapezium), the protractor on squared paper, the trapezium কখগঘ, the lattice, the map ──
function houseFig(cap) {
  const win = (P) => { const c = cen(P); return [{ poly: P, fill: "#C2582B", c: null }, { poly: P.map((p) => [c[0] + (p[0] - c[0]) * 0.78, c[1] + (p[1] - c[1]) * 0.7]), fill: "#BFE8F0", c: null }]; };
  return fig(50, 30, [{ poly: [[0, 14], [14.6, 0.5], [35.4, 0.5], [50, 14]], fill: "#C9706F", c: null }, { poly: rectP(2.6, 14, 47.2, 30), fill: "#C9C9CF", c: null },
    ...win([[5.4, 16.3], [14.8, 16.3], [14.2, 25.6], [4.8, 25.6]]), { poly: rectP(19.1, 16.3, 31.8, 30), fill: "#F26B1D", c: "#C2410C", sw: 0.7 },
    { dot: [24.7, 23.4], r: 0.35, c: "#9A3412" }, { dot: [26.2, 23.4], r: 0.35, c: "#9A3412" }, ...win(rectP(37.4, 16.5, 43.5, 20.8))], cap ? { cap } : {});
}
const PROT = (() => { const s = 3.6, c = [4.4 * s, 2.9 * s]; return fig(12 * s, 8 * s, [{ grid: [0, 0, 12, 8, s] }, { prot: c, r: 13, rot: 225, step: 30, fs: 0.8 }, { seg: [pol(c, 225, 10), pol(c, 45, 14)], c: "#DC2626", sw: 0.35 }]); })();
const TRAP = (() => {
  const s = 4.6, k = [4 * s, 7 * s], kh = [23 * s, 7 * s], gh = [10 * s, s], g = [17 * s, s];
  return fig(28 * s, 8 * s, [{ grid: [0, 0, 28, 8, s] }, { poly: [k, kh, g, gh], sw: 0.55 }, ...[k, kh, g, gh].map((p) => ({ dot: p, r: 0.9 })),
    { ang: [k, kh, gh], r: 6.5, label: "৪৫°", lr: 11, la: 26, fs: 3.3 }, { ang: [kh, gh, k], r: 6.5, label: "৪৫°", lr: 11, la: 154, fs: 3.3 },
    L("ক", [k[0] - 2.6, k[1] + 1.4], { halo: true }), L("খ", [kh[0] + 2.6, kh[1] + 0.4], { halo: true }), L("ঘ", [gh[0] - 2.6, gh[1]], { halo: true }), L("গ", [g[0] + 2.6, g[1]], { halo: true })]);
})();
// the window lattice: bars, and in every square a smaller square joined to the corners (trapeziums all round)
const LATTICE = (() => {
  const c = 10.4, x0 = 3.4, y0 = 3.8, BR = "#A65A4E", items = [];
  for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) {
    const m = [x0 + (i + 0.5) * c, y0 + (j + 0.5) * c], q = 0.21 * c, e = 0.5 * c - 1;
    items.push({ poly: rectP(m[0] - q, m[1] - q, m[0] + q, m[1] + q), c: BR, sw: 1.1 });
    for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) items.push({ seg: [[m[0] + sx * q, m[1] + sy * q], [m[0] + sx * e, m[1] + sy * e]], c: BR, sw: 1.1, cap: "butt" });
  }
  for (let i = 0; i <= 3; i++) items.push({ seg: [[x0 + i * c, 0.5], [x0 + i * c, y0 + 3 * c]], c: BR, sw: 1.5, cap: "butt" });
  for (let j = 0; j < 3; j++) items.push({ seg: [[0.5, y0 + j * c], [2 * x0 + 3 * c - 0.5, y0 + j * c]], c: BR, sw: 1.5, cap: "butt" });
  return fig(2 * x0 + 3 * c, y0 + 3 * c, items);
})();
// the town map: roads (white, edged grey) making squares, trapeziums and parallelograms between them; trees and buildings
const MAP = (() => {
  const roads = [[[4.5, 4.6], [50.9, 4.6]], [[4.5, 12.6], [51, 12.6]], [[4.9, 21.1], [49.5, 21.1]], [[15.7, 30.9], [48.8, 26.6]], [[6.6, 36.1], [48.8, 36.1]],
    [[8.2, 4.6], [8.2, 36.1]], [[14.7, 4.6], [14.7, 36.1]], [[20.6, 21.1], [20.6, 36.1]], [[22.5, 5.6], [28.3, 36.1]], [[30.7, 5.1], [36.3, 28.4]], [[42.1, 4.6], [42.6, 36.1]]];
  const st = (name, emoji, x, y, s) => ({ img: name, emoji, at: [x - s / 2, y - s / 2], w: s, h: s });
  return fig(52, 39, [{ poly: rectP(0, 0, 52, 39), fill: "#D3E3E8", c: null }, ...roads.map((r) => ({ seg: r, c: "#9AA5AD", sw: 1.5, cap: "butt" })), ...roads.map((r) => ({ seg: r, c: "#fff", sw: 0.95, cap: "butt" })),
    st("tree", "🌳", 11.4, 17.4, 5.4), st("house", "🏠", 20.4, 17.6, 5.6), st("playground", "🌳", 29.2, 17.6, 6), st("school", "🏫", 46.6, 9.2, 5.6), st("post-office", "🏢", 38.6, 24.4, 5), st("tree", "🌳", 32.4, 31.8, 5.6)]);
})();

// ── p154: the two equal frames (purple, orange), the orange one laid across the purple one, turned (ক 29° one way, খ square
// across, গ 27° the other way): the window is a rhombus (খ: a square) ──
const RW = 23.7, RH = 41, ROUT = rectP(-RW / 2, -RH / 2, RW / 2, RH / 2), RHOLE = rectP(-6.1, -13, 6.1, 13);
const rFrame = (fill, at, th) => ({ poly: place(ROUT, at, th), holes: [place(RHOLE, at, th)], fill, c: INK, sw: 0.25 });
const PURPLE = "#A9A0CA", ORANGE = "#DB6C33";
function cross(letter, th) {
  const b = box([...place(ROUT, [0, 0], 90), ...place(ROUT, [0, 0], th)]), at = [-b.x0 + 0.3, -b.y0 + 0.3];
  const shape = clip(place(RHOLE, at, 90), place(RHOLE, at, th));
  return fig(b.x1 - b.x0 + 0.6, b.y1 - b.y0 + 0.6, [rFrame(PURPLE, at, 90), rFrame(ORANGE, at, th), { poly: shape, c: INK, sw: 0.3 }, L(letter, at, { fs: 4.2, w: 600 })]);
}
const rFrameFig = (fill) => fig(RW + 0.6, RH + 0.6, [rFrame(fill, [RW / 2 + 0.3, RH / 2 + 0.3], 0)]);

// ── p155: the paper folded in four, cut from the fold's corner; the rhombus it makes (side 27.7 mm, 45°), three ways round;
// designs of 60° rhombi ──
const FOLD = fig(62, 32, [
  ...[0, 1, 2].map((i) => ({ seg: [[6 + (i + 1) * 0.9, 6 - (i + 1) * 0.7], [54, 6]], sw: 0.25 })),
  { poly: rectP(6, 6, 54, 27), fill: "#FBE0D8", sw: 0.3 }, { seg: [[19.9, 27], [54, 12.9]], sw: 0.3, dash: "0.7 0.6" },
  { img: "scissors", emoji: "✂️", at: [15, 23.5], w: 9, h: 9, rot: -22.5 }]);
const SR = 27.7, RHO = [
  [[0, SR * Math.sin(rad(22.5))], [SR * Math.cos(rad(22.5)), 0], [2 * SR * Math.cos(rad(22.5)), SR * Math.sin(rad(22.5))], [SR * Math.cos(rad(22.5)), 2 * SR * Math.sin(rad(22.5))]],
  (() => { const V = [0, 0], P1 = pol(V, -25, SR), P3 = pol(V, -70, SR); return [V, P1, add(P1, P3), P3]; })(),
  (() => { const h = SR * Math.sin(rad(45)), o = SR * Math.cos(rad(45)); return [[0, h], [SR, h], [SR + o, 0], [o, 0]]; })(),
].map((P) => { const b = box(P); return fig(b.x1 - b.x0 + 1, b.y1 - b.y0 + 1, [{ poly: mv(P, [0.5 - b.x0, 0.5 - b.y0]), fill: "#FBE0D8", sw: 0.35 }]); });
// a 60° rhombus with its 60° corner at O, pointing at angle a, side s
const rh60 = (O, a, s) => [O, pol(O, a - 30, s), pol(O, a, s * Math.sqrt(3)), pol(O, a + 30, s)];
const DESIGNS = (() => {
  const s = 8.5, a = s * Math.cos(rad(30)), b = s * Math.sin(rad(30)), w = { poly: null, fill: "#fff", sw: 0.45 };
  const d1 = fig(4 * a + 1, 4 * b + 1, [{ ...w, poly: mv([[0, 2 * b], [2 * a, 0], [4 * a, 2 * b], [2 * a, 4 * b]], [0.5, 0.5]) },
    { seg: [[a + 0.5, b + 0.5], [3 * a + 0.5, 3 * b + 0.5]], sw: 0.45 }, { seg: [[3 * a + 0.5, b + 0.5], [a + 0.5, 3 * b + 0.5]], sw: 0.45 }]);
  const s2 = 11, O2 = [s2 * Math.cos(rad(30)) + 0.8, s2 + 0.8], V = (d) => pol(O2, d, s2);
  const d2 = fig(2 * s2 * Math.cos(rad(30)) + 1.6, 2 * s2 + 1.6, [{ poly: [V(90), V(150), V(210), V(270), V(330), V(30)], fill: "#fff", sw: 1.1 },
    { poly: [O2, V(150)], open: true, sw: 0.5 }, { poly: [O2, V(30)], open: true, sw: 0.5 }, { poly: [O2, V(270)], open: true, sw: 0.5 }]);
  const R3 = s * Math.sqrt(3), O3 = [R3 + 0.5, R3 * Math.sin(rad(60)) + 0.5];
  const d3 = fig(2 * R3 + 1, 2 * R3 * Math.sin(rad(60)) + 1, [0, 60, 120, 180, 240, 300].map((d) => ({ ...w, poly: rh60(O3, d, s) })));
  const O4 = [R3 + 0.5, R3 + 0.5];
  const d4 = fig(2 * R3 + 1, 2 * R3 + 1, [0, 90, 180, 270].map((d) => ({ ...w, poly: rh60(O4, d, s) })));
  return figs([d1, d2, d3, d4], { justify: "space-around", align: "center" });
})();

// ── p156: diagonals ──
const S6 = 5.6;
const G156 = fig(28 * S6, 8 * S6, [{ grid: [0, 0, 28, 8, S6] },
  ...[[[4, 4], [8, 4], [6, 7], [2, 7]], [[9, 2], [11, 2], [13, 7], [11, 7]], [[15, 5], [18, 3], [21, 5], [18, 7]], [[25, 1], [27, 4], [25, 7], [23, 4]]].map((P) => ({ poly: onGrid(S6, P), sw: 0.6 })),
  { seg: [[4 * S6, 4 * S6], [6 * S6, 7 * S6]], c: BLUE, sw: 0.45, dash: "1.2 0.8" }]);
const DIAG = (() => {
  const k = [16.4, 5.4], kh = [37, 5.4], g = [26.5, 21.4], gh = [6, 21.4];
  return fig(46, 27, [{ raw: `<rect x=".3" y=".3" width="45.4" height="26.4" rx="4" fill="#FBE0D8" stroke="#1E2433" stroke-width=".3"/>` }, { poly: [k, kh, g, gh], sw: 0.6 },
    { seg: [k, g], c: BLUE, sw: 0.4, dash: "1.1 0.8" }, { seg: [kh, gh], c: BLUE, sw: 0.4, dash: "1.1 0.8" },
    L("ক", [14.6, 3.2], { fs: 3.4 }), L("খ", [39.4, 6.6], { fs: 3.4 }), L("গ", [26.5, 24.2], { fs: 3.4 }), L("ঘ", [5.4, 24.2], { fs: 3.4 })]);
})();
const FOUR = fig(130, 20.5, [[[0, 19.05], [5.84, 9.23], [22.77, 3.39], [27.69, 19.05]], [[34.54, 19.5], [44.24, 4.1], [52.04, 4.1], [61.54, 19.5]],
  [[67.84, 19.1], [72.44, 3.9], [94.34, 3.9], [89.74, 19.1]], [[96.74, 19.1], [108.54, 5.4], [129.24, 5.4], [117.44, 19.1]]].map((P) => ({ poly: mv(P, [0.3, 0.3]), sw: 0.55 })), { k: 1.12 });

// ── p157: the quadrilaterals in nested rings (positions measured from the book; mm about the rings' centre) ──
const VENN = (() => {
  const O = [50, 43], at = (P) => P.map(([x, y]) => [O[0] + x - 0.7, O[1] + y]), PINK = "#E3157F";
  const shapes = [
    ["#BFE6F7", [[-24.6, -28.3], [-19.7, -33.5], [-14.5, -31.8], [-14.1, -28.3]]], ["#BFE6F7", [[8.6, -30.0], [10.6, -35.0], [15.2, -36.3], [22.3, -30.8]]],
    ["#FBE0D8", [[-17.9, -24.3], [-13.4, -26.2], [-9.1, -22.6], [-17.9, -18.9]]], ["#FBE0D8", [[13.3, -25.4], [16.9, -26.0], [17.95, -18.8], [14.1, -19.9]]],
    ["#8B7FBA", [[-11.2, -19.3], [-2.5, -19.3], [-3.6, -15.7], [-12.3, -15.7]]], ["#8B7FBA", [[1.4, -19.2], [6.0, -19.2], [5.4, -14.1], [0.8, -14.1]]],
    ["#DA9C74", [[-22.2, -1.0], [-18.6, -5.9], [-15.0, -1.0], [-18.6, 3.9]]], ["#DA9C74", [[-16.0, 7.6], [-13.4, 0.7], [-6.03, 0.7], [-8.63, 7.6]]],
    ["#F98B2B", rectP(-3.4, -4.7, 4.1, 2.8)], ["#FCD0E1", rectP(8.8, -6.6, 13.1, 2.5)], ["#FCD0E1", rectP(14.4, -4.1, 23.5, 2.3)],
  ];
  return fig(100, 83, [
    { ell: [O[0], O[1], 46.6, 38.6], c: PINK, sw: 0.35 }, { ell: [O[0], O[1], 35.6, 29.4], c: PINK, sw: 0.35 }, { ell: [O[0], O[1], 26.6, 22], c: PINK, sw: 0.35 },
    { ell: [O[0] - 9, O[1], 15.7, 12.8], c: PINK, sw: 0.35 }, { ell: [O[0] + 9, O[1], 15.7, 12.8], c: PINK, sw: 0.35 },
    ...shapes.map(([fill, P]) => ({ poly: at(P), fill, sw: 0.25 })), L("বর্গ", [O[0] + 0, O[1] + 5.2], { fs: 2.6, w: 500 }),
    { lbox: "চতুর্ভুজ", at: [O[0], O[1] - 38.6], bw: 11, bh: 4.4, fs: 2.6 }, { lbox: "ট্রাপিজিয়াম", at: [O[0], O[1] - 29.4], bw: 13.8, bh: 4.4, fs: 2.6 },
    { lbox: "সামান্তরিক", at: [O[0], O[1] - 22], bw: 12.8, bh: 4.4, fs: 2.6 }, { lbox: "রম্বস", at: [O[0] - 9, O[1] - 12.8], bw: 8.6, bh: 4.4, fs: 2.6 }, { lbox: "আয়ত", at: [O[0] + 9.5, O[1] - 12.8], bw: 8.4, bh: 4.4, fs: 2.6 }]);
})();

// ── p158: the flow chart (positions measured from the book, mm) ──
const FLOW = (() => {
  const T = (t, at) => L(t, at, { fs: 4, w: 500 });
  return fig(147, 178, [
    { poly: [[52.3, 17.1], [62.1, 6.2], [81.2, 0.9], [94.9, 17.3]], fill: "#fff", sw: 0.4 }, T("চতুর্ভুজ", [74, 11.2]),
    { farrow: [[73.9, 18.6], [73.9, 38.1]] },
    { poly: [[56.2, 50.8], [63.2, 40.1], [81.2, 40.1], [89.5, 50.8]], fill: "#fff", sw: 0.4 }, T("ট্রাপিজিয়াম", [72.8, 45.6]),
    { farrow: [[73.7, 52.9], [73.7, 79.4]] },
    { poly: [[56.4, 91.8], [62.7, 80.3], [92.4, 80.3], [86.1, 91.8]], fill: "#fff", sw: 0.4 }, T("সামান্তরিক", [74.4, 86.1]),
    { farrow: [[69.5, 93.3], [57.2, 116.6]] }, { farrow: [[75.8, 93.3], [88.3, 116.6]] },
    { poly: rectP(44.1, 117.2, 73.7, 127.5), fill: "#fff", sw: 0.4 }, T("আয়ত", [58.9, 122.4]),
    { poly: [[75.6, 122.4], [93, 115.4], [109.7, 122.4], [93, 129.4]], fill: "#fff", sw: 0.4 }, T("রম্বস", [92.8, 122.4]),
    { farrow: [[58.9, 129.1], [71.4, 152.2]] }, { farrow: [[90.6, 130.6], [78.3, 152.2]] },
    { poly: rectP(65.2, 153.8, 84.5, 173), fill: "#fff", sw: 0.4 }, T("বর্গ", [74.85, 163.4]),
  ], { notes: [
    { x: 90.3, y: 39.4, w: 56.4, lines: 4, text: "(১) একটি চতুর্ভুজকে ট্রাপিজিয়াম বলা যাবে যদি" },
    { x: 0.5, y: 73, w: 54.5, lines: 3, text: "(২) একটি ট্রাপিজিয়ামকে সামান্তরিক বলা যাবে যদি" },
    { x: 0.5, y: 109.4, w: 40, lines: 6, fs: 10.8, text: "(৩) একটি সামান্তরিককে আয়ত বলা যাবে যদি" },
    { x: 111, y: 108.4, w: 35.6, lines: 7, fs: 10.8, text: "(৪) একটি সামান্তরিককে রম্বস বলা যাবে যদি" },
    { x: 0.5, y: 154.6, w: 58.5, lines: 4, text: "(৫) একটি আয়তকে বর্গ বলা যাবে যদি" },
    { x: 89.5, y: 154.6, w: 56.5, lines: 4, text: "(৬) একটি রম্বসকে বর্গ বলা যাবে যদি" },
  ] });
})();

module.exports = {
  pages: [
    {
      page: 149,
      allow: ["জ্যামিতি"], // the chapter's title in the book's banner (Tesseract doesn't read the banner at all): checked by eye
      opener: { title: "জ্যামিতি" },
      title: "ট্রাপিজিয়াম ও সামান্তরিক",
      dense: true,
      blocks: [
        { ask: "নিচের আয়তাকার ও ত্রিভুজাকার আকৃতির ফ্রেমগুলো একটি অন্যটির উপর বসিয়ে আমরা কত ধরনের চতুর্ভুজ তৈরি করতে পারি?" },
        figs(["r1", "r2", "t1", "t2"].map((n) => ({ ...frameFig(n), k: 0.84 })), { justify: "space-around" }),
        { ex: "১", mark: "kaj", text: "চিত্রানুযায়ী আমরা যেকোনো দুইটি ফ্রেমকে একটির উপর অপরটি রেখে পেনসিল দিয়ে বিভিন্ন ধরনের চতুর্ভুজ আঁকি।", body: [
          figs(["ক", "খ", "গ"].map((l) => ({ ...C[l].fig, k: 0.9 })), { align: "flex-start" }),
          figs(["ঘ", "ঙ", "চ"].map((l) => ({ ...C[l].fig, k: 0.9 })), { align: "flex-start" }),
          one({ ...shapesFig(["ক", "খ", "গ", "ঘ", "ঙ", "চ"], { gap: 9 }), k: 0.92 }),
        ] },
      ],
    },
    {
      page: 150,
      dense: true,
      flags: ["pp150–158 use the inclusive meaning of ট্রাপিজিয়াম (at least one pair of parallel sides), so every সামান্তরিক, রম্বস, আয়ত and বর্গ is a ট্রাপিজিয়াম (\"সকল সামান্তরিকই ট্রাপিজিয়াম\" here, \"রম্বসও ট্রাপিজিয়াম\" on p154, p157 (৯)); some books use the exclusive meaning (exactly one pair). Kept as printed: it is the book's own teaching."],
      blocks: [
        "সমান্তরাল বাহুর ভিত্তিতে উল্লেখিত চতুর্ভুজগুলো থেকে দুইটি দল তৈরি করি।",
        { kind: "p011_tab", tone: "pink", cols: ["55%", "45%"], rows: [
          { type: "hd", cells: ["সমান্তরাল বাহুর সংখ্যা", "চতুর্ভুজ"] },
          { h: 9, cells: [{ c: "(১) শুধু এক জোড়া বাহু পরস্পর সমান্তরাল", cls: "p011-left" }, "ক, ___"] },
          { h: 9, cells: [{ c: "(২) দুই জোড়া বাহু পরস্পর সমান্তরাল", cls: "p011-left" }, "_______"] },
        ] },
        { ex: "২", mark: "kaj", text: "উল্লেখিত ৬টি চতুর্ভুজের মধ্যে কি কোনো আয়ত আছে? যদি থাকে, তবে কেন সেটি আয়ত তার কারণ ব্যাখ্যা করি।", body: [
          say("boy", "think", "আমরা চতুর্থ শ্রেণিতে বর্গ ও আয়ত সম্পর্কে শিখেছি। উপরের চতুর্ভুজগুলোর মধ্যে কোনটি আয়ত?"),
          say("girl", "talk", "চতুর্ভুজ ‘ঙ’-এর বিপরীত বাহুগুলো পরস্পর সমান ও সমান্তরাল। এছাড়া, এর প্রতিটি কোণ এক সমকোণ। তাই চতুর্ভুজ ‘ঙ’ একটি আয়ত।"),
        ] },
        say("boy", "talk", "এখানে কিছু চতুর্ভুজের এক জোড়া বাহু পরস্পর সমান্তরাল। আবার কিছু চতুর্ভুজের দুই জোড়া বাহু পরস্পর সমান্তরাল।"),
        { kind: "p011_tab", tone: "pink", cols: ["50%", "50%"], rows: [
          { type: "hd", cells: ["চতুর্ভুজের এক জোড়া বাহু পরস্পর সমান্তরাল", "চতুর্ভুজের দুই জোড়া বাহু পরস্পর সমান্তরাল"] },
          { type: "pic", cells: [{ c: [one({ ...shapesFig(["ক", "চ"], { gap: 16 }), k: 0.86 })] }, { c: [one({ ...shapesFig(["ঙ", "ঘ", "খ"], { gap: 5 }), k: 0.86 })] }] },
          { type: "pic", cells: [{ c: [one(gridShape([[2, 1], [5, 1], [6, 4], [1, 4]], "ট্রাপিজিয়াম", 5.1))] }, { c: [one(gridShape([[2, 1], [6, 1], [5, 5], [1, 5]], "সামান্তরিক", 6.1))] }] },
          { cells: [{ c: "ট্রাপিজিয়াম", span: 2 }] },
        ] },
        { row: [
          say("boy", "talk", "ট্রাপিজিয়ামের এক জোড়া বাহু পরস্পর সমান্তরাল এবং সামান্তরিকের দুই জোড়া বাহু পরস্পর সমান্তরাল।"),
          say("girl", "talk", "সকল সামান্তরিকই ট্রাপিজিয়াম।"),
        ], w: [0, 72], gap: 3, align: "flex-end" },
      ],
    },
    {
      page: 151,
      dense: true,
      allow: ["১০০", "৮০"], // the angles ১০০° and ৮০° on কখগঘ (Tesseract reads the ° as a ০): checked by eye
      blocks: [
        { ex: "১", mark: "anu", text: "নিচের আকৃতিগুলো থেকে ট্রাপিজিয়াম ও সামান্তরিক খুঁজে বের করি এবং কারণ ব্যাখ্যা করি।", body: [one(G151)] },
        { ex: "৩", mark: "kaj", text: "নিচের সামান্তরিকগুলোর বাহুর দৈর্ঘ্য ও কোণগুলো পরিমাপ করি। আমরা সামান্তরিকের বাহু ও কোণগুলোর কি কোনো বৈশিষ্ট্য খুঁজে পাই?", body: [
          figs(P151, { justify: "space-around" }),
          { kind: "c5p149_form", rows: [["(১) পরস্পর বিপরীত বাহুর দৈর্ঘ্য", 52], ["(২) পরস্পর বিপরীত কোণ", 52]], lw: 70 },
        ] },
        { kind: "c5p149_rule", title: "সামান্তরিকের", items: ["বিপরীত বাহুগুলো পরস্পর সমান।", "বিপরীত কোণগুলো পরস্পর সমান।"], tone: "green", w: 96 },
        { ex: "২", mark: "anu", text: "নিচের সামান্তরিকগুলোর বাহুর দৈর্ঘ্য ও কোণের পরিমাপ নির্ণয় করি।", body: [
          { row: [
            X({ kind: "c5p149_lines", items: ["(১) কখ = ______ সেমি", "(২) খগ = ______ সেমি", "(৩) ∠খ = ______°", "(৪) ∠গ = ______°"], gap: 2.6 }),
            one(KKGG),
          ], w: [0, 62], align: "center" },
        ] },
      ],
    },
    {
      page: 152,
      dense: true,
      spread: true,
      // অনুশীলন ৩'s angles ৫৫°, ৭০°, ৩৫° (Tesseract reads the ° as a ০) and step [২]'s চাঁদা (Tesseract: "চীদা"): checked by eye
      allow: ["৫৫", "৭০", "৩৫", "চাঁদা"],
      blocks: [
        { row: [
          X({ kind: "c5p149_lines", items: ["(৫) চছ = ______ সেমি", "(৬) ছজ = ______ সেমি", "(৭) ∠ছ = ______°", "(৮) ∠জ = ______°"], gap: 2.6, indent: 3.2 }),
          one(CCJJ),
        ], w: [0, 84], align: "center" },
        { ex: "৪", mark: "kaj", text: "নিচের সামান্তরিকের মতো সামান্তরিক খাতায় আঁকি।", body: [
          { row: [
            { kind: "c5p149_lines", items: ["যেভাবে সামান্তরিক আঁকব।", "[১] স্কেলের সাহায্যে ৪ সেমি দৈর্ঘ্যের একটি রেখা আঁকি।", "[২] চাঁদা ব্যবহার করে ৬০° কোণ আঁকি।", "[৩] ত্রিকোণীসেট ব্যবহার করে ২য় ধাপে অঙ্কিত রেখার সমান্তরাল রেখা আঁকি।"] },
            one(PARA60),
          ], w: [0, 70], gap: 3, align: "center" },
          { kind: "c3p001_saybox", who: "girl", mood: "talk", text: "ত্রিকোণীসেট ব্যবহার করে আমরা নিচে দেখানো ছবির মতো সমান্তরাল রেখা আঁকতে পারি।", body: [SETSQ], gap: 2 },
          { row: [
            { kind: "c5p149_lines", items: ["[৪] ২য় ও ৩য় ধাপের অঙ্কিত রেখাদ্বয়ে ৩ সেমি চিহ্নিত করি।", "[৫] ৪র্থ ধাপে চিহ্নিত বিন্দুদ্বয় স্কেলের সাহায্যে সংযুক্ত করি।"] },
            one(CONSTR),
          ], w: [0, 80], gap: 3, align: "center" },
        ] },
        { ex: "৩", mark: "anu", text: "নিচের সামান্তরিকগুলো আঁকি।", body: [
          { kind: "c5p149_lines", items: ["(ক) দৈর্ঘ্যে ৪ সেমি, প্রস্থ ২.৫ সেমি এবং একটি কোণ ৫৫°", "(খ) দৈর্ঘ্যে ৫ সেমি, প্রস্থ ৩ সেমি এবং একটি কোণ ৭০°", "(গ) প্রতিটি বাহুর দৈর্ঘ্য ৪ সেমি এবং একটি কোণ ৩৫°"], gap: 1.6, indent: 3 },
        ] },
      ],
    },
    {
      page: 153,
      dense: true,
      allow: ["৪৫"], // the ৪৫° in the bullet and on কখগঘ (Tesseract reads the ° as a ০): checked by eye
      blocks: [
        { ex: "৫", mark: "kaj", text: "ছবিতে কোনো ট্রাপিজিয়াম আছে কি না খুঁজি ও আঁকি।", body: [
          { row: [
            { kind: "p011_chat", lines: [say("girl", "talk", "এখানে আমরা কয়েকটি ট্রাপিজিয়াম দেখতে পাচ্ছি।", { side: "left" }), say("boy", "talk", "এখানে ঘরের চালাটিও ট্রাপিজিয়াম আকৃতির।")], gap: 2 },
            one({ ...houseFig(), k: 0.98 }),
          ], w: [0, 56], gap: 3, align: "center" },
          { kind: "p011_chat", lines: [say("girl", "think", "চাঁদা ও পেনসিল দিয়ে এটি আমরা কীভাবে আঁকতে পারি?")] },
          { kind: "c4p157_bullets", items: ["গ্রিড পেপার বা সাদা কাগজে কখ রেখা (ভূমি) এঁকে চাঁদার সাহায্যে কখ রেখার দুইপাশে ৪৫° করে কোণ আঁকি।", "এবার কখ রেখার সমান্তরাল করে গঘ রেখা আঁকি। তাহলে একটি কখগঘ ট্রাপিজিয়াম অঙ্কিত হলো।"] },
          { kind: "p011_tab", tone: "pink", cols: ["50%", "50%"], rows: [
            { type: "pic", cells: [{ c: [one({ ...houseFig("ট্রাপিজিয়াম আকৃতির ঘরের চালা"), k: 0.88 })] }, { c: [one(PROT)] }] },
          ] },
          one({ ...TRAP, k: 0.96 }),
        ] },
        { ex: "৪", mark: "anu", text: "চিত্রে আমরা কী কী ধরনের চতুর্ভুজ দেখতে পাই?", body: [
          { row: [one(LATTICE), { pic: "p153-stairs", h: 36, w: 38 }, one({ ...MAP, k: 0.92 })], gap: 4, align: "center", justify: "space-around" },
        ] },
      ],
    },
    {
      page: 154,
      title: "রম্বস",
      spread: true,
      blocks: [
        { ask: "নিচে দেখানো সমান আকৃতির আয়ত দুইটির একটিকে অন্যটির উপর বসিয়ে বিভিন্ন আকৃতির চতুর্ভুজ তৈরি করি। আমরা কোন আকৃতিগুলো পাই?" },
        figs([rFrameFig(PURPLE), rFrameFig(ORANGE)].map((f) => ({ ...f, k: 0.9 })), { justify: "center", gap: 10 }),
        figs([cross("ক", -28.8), cross("খ", 0), cross("গ", 26.7)].map((f) => ({ ...f, k: 0.92 })), { justify: "space-around", align: "center" }),
        say("boy", "talk", "বাহুগুলোর দৈর্ঘ্য পরিমাপ করি।"),
        say("girl", "talk", "আকৃতিগুলোর প্রত্যেকটি বাহুর দৈর্ঘ্যই সমান। আবার, বিপরীত বাহুগুলো পরস্পর সমান্তরাল।"),
        say("parrot", "talk", "যে সামান্তরিকের প্রত্যেকটি বাহুর দৈর্ঘ্যই সমান, তাকে রম্বস বলে।\nবর্গ এক ধরনের রম্বস।", { side: "left" }),
        say("girl", "talk", "আমরা জেনেছি সকল সামান্তরিকই ট্রাপিজিয়াম। তাই, রম্বসও ট্রাপিজিয়াম।"),
      ],
    },
    {
      page: 155,
      dense: true,
      spread: true,
      blocks: [
        { ex: "১", mark: "kaj", text: "চিত্রের মতো একটি আয়ত আকৃতির কাগজকে চার ভাগে ভাঁজ করে দাগ বরাবর কাটলে কী ধরনের চতুর্ভুজ পাই?", body: [
          one(FOLD),
          figs(RHO.map((f) => ({ ...f, k: 0.95 })), { justify: "space-around", align: "center" }),
          { row: [
            { kind: "p011_chat", lines: [say("boy", "talk", "বাহুগুলোর দৈর্ঘ্য পরিমাপ করি।")] },
            { kind: "c5p149_lines", items: ["চতুর্ভুজের প্রত্যেকটি বাহুর দৈর্ঘ্য _____", "চতুর্ভুজটি একটি __________"], size: 12, gap: 1.6 },
          ], w: [0, 72], gap: 3, align: "center" },
          { row: [
            { kind: "p011_chat", lines: [say("girl", "talk", "চলো, কোণগুলো মেপে দেখি।", { side: "left" })] },
            { kind: "c5p149_lines", items: ["বিপরীত কোণ দুইটি ________"], size: 12 },
          ], w: [0, 72], gap: 3, align: "center" },
        ] },
        { kind: "c5p149_rule", title: "রম্বসের", items: ["বিপরীত বাহুগুলো পরস্পর সমান্তরাল।", "বিপরীত কোণগুলো পরস্পর সমান।"], tone: "peach", w: 96 },
        { ex: "১", mark: "anu", text: "একই মাপের রম্বস কেটে বিভিন্ন ডিজাইনের আকৃতি বানাই।", body: [DESIGNS] },
      ],
    },
    {
      page: 156,
      title: "চতুর্ভুজের কর্ণ",
      dense: true,
      blocks: [
        { ask: "নিচের চতুর্ভুজগুলোর বিপরীত শীর্ষবিন্দুগুলো সংযোগ করে কী পাই?" },
        one(G156),
        { row: [
          say("boy", "talk", "চতুর্ভুজের বিপরীত শীর্ষবিন্দু সংযোগ করলে কর্ণ পাই। একটি চতুর্ভুজের দুইটি কর্ণ রয়েছে, কিন্তু ত্রিভুজের কোনো কর্ণ নেই।"),
          one(DIAG),
        ], w: [0, 50], gap: 4, align: "center" },
        { ex: "১", mark: "kaj", text: "নিচের চতুর্ভুজগুলোতে কর্ণ আঁকি।", body: [one(FOUR)] },
        { ex: "২", mark: "kaj", text: "চতুর্ভুজ সম্পর্কে আমরা কী পেয়েছি তা সংক্ষেপে ছকের খালি ঘরগুলোতে লিখি।", body: [
          { kind: "p011_tab", tone: "blue", cols: ["20%", "20%", "26%", "17%", "17%"], rows: [
            { type: "hd", cells: [{ c: "", rs: 2 }, { c: "সকল বাহুর দৈর্ঘ্য\nসর্বদা সমান", rs: 2 }, { c: "সকল কোণ সর্বদা সমকোণ", rs: 2 }, { c: "বিপরীত বাহুগুলো সর্বদা", span: 2 }] },
            { type: "hd", cells: ["সমান্তরাল", "দৈর্ঘ্যে সমান"] },
            ...["সামান্তরিক:না", "রম্বস:হ্যাঁ", "আয়ত:না", "বর্গ:হ্যাঁ"].map((r) => { const [n, a] = r.split(":"); return { h: 10, cells: [{ c: n, cls: "p011-left" }, a, "", "", ""] }; }),
          ] },
        ] },
      ],
    },
    {
      page: 157,
      fixes: [{ book: "a square (turned 45°, its diagonals equal) drawn in the রম্বস-only part of the rings", ours: "a rhombus that is not a square",
        why: "the part of the রম্বস ring outside the আয়ত ring holds rhombi that are not squares; the squares belong in the overlap (বর্গ)" }],
      blocks: [
        { ex: "৩", mark: "kaj", text: "নিচের চিত্রে বিভিন্ন বৈশিষ্ট্যের আলোকে চতুর্ভুজগুলোকে বৃত্তের ভিতরে সাজানো হয়েছে। চিত্রটি পর্যালোচনা করে নিচের শূন্যস্থান পূরণ করি।", body: [
          one({ ...VENN, k: 1.3 }),
          { kind: "c5p149_blanks", size: 12, gap: 2.6, items: [
            { n: "(১)", t: "চতুর্ভুজের এক জোড়া বিপরীত বাহু সমান্তরাল হলে তাকে", a: "বলে।" },
            { n: "(২)", t: "চতুর্ভুজের দুই জোড়া বিপরীত বাহু সমান্তরাল হলে তাকে", a: "বলে।" },
            { n: "(৩)", t: "যে সামান্তরিকের চারটি বাহুই সমান তাকে", a: "বলে।" },
            { n: "(৪)", t: "যে সামান্তরিকের চারটি কোণই সমকোণ তাকে", a: "বলে।" },
            { n: "(৫)", t: "রম্বসের একটি কোণ সমকোণ হলে তাকে", a: "বলে।" },
            { n: "(৬)", t: "আয়ত ও বর্গের মধ্যে মিল হলো এদের চারটি কোণ", a: "।" },
            { n: "(৭)", t: "রম্বস ও বর্গের মধ্যে মিল হলো এদের চারটি", a: "পরস্পর সমান।" },
            { n: "(৮)", t: "রম্বস, বর্গ এবং আয়ত এদের সবগুলোই হলো এক ধরনের", a: "।" },
            { n: "(৯)", t: "আয়ত, বর্গ ও রম্বস হলো একধরনের ট্রাপিজিয়াম, কারণ এদের প্রত্যেকের অন্তত একজোড়া", a: "বাহু আছে।", wrap: true },
          ] },
        ] },
      ],
    },
    {
      page: 158,
      allow: ["চতুর্ভুজ"], // the word in the flow chart's first shape (Tesseract reads ভু as তু on this page: "চতুর্তুজের"): checked by eye
      blocks: [
        { ex: "১", mark: "anu", text: "চতুর্ভুজের বিভিন্ন বৈশিষ্ট্যের উপর ভিত্তি করে নিচের শূন্যস্থানগুলো পূরণ করি।", body: [one({ ...FLOW, k: 1.08 })] },
      ],
    },
  ],
};
