// অধ্যায় ১০ · জ্যামিতি, its second half: printed pages 157–168 (PDF pages 164–175), every word as printed. Written by a
// helper (23 Nov 2026).
// ত্রিভুজ (157), বাহুভেদে ত্রিভুজ (158), কোণভেদে ত্রিভুজ (159–160), drawing a 7–5–4 triangle with a cardboard strip (160–161)
// and an equilateral one with a protractor (162), আয়ত ও বর্গ (163–164), দেখি পারি কি না (165), জ্যামিতিক প্যাটার্ন (166–167),
// নিজে করি (168).
// Every triangle, angle, grid and pattern is drawn by code (content/p157-168.parts.js, c4p157_geo) from its sides or its
// angles: the book's own triangles were measured on its page (the shapes and sizes are the book's), and a side the book
// meant to be equal to another is drawn exactly equal (the ticks show which), a right angle exactly 90° with its mark.
// The book's slips and loose drawings, kept or put right (listed in the report):
//   - p165 ৪: the book prints ক and গ 19 × 16 mm and 29 × 24 mm (the page's drawing is squashed); they are the exercise's
//     squares, so they are drawn as squares here (and খ, ঘ as rectangles).
//   - p165 ১: the middle triangle (26, 26, 27 mm in the book) is drawn equilateral, the right one isosceles: the three are
//     one of each kind; p165 ২ (ক): 88° in the book, drawn 90°.
//   - p168 ৪ (২): the angles are labelled ৬০° and ৬০ (the top one has no degree sign; a stray ° sits above the apex, kept),
//     but the book draws it with 49° and 64°: drawn here with the labelled 60° and 60° (so it is equilateral, 5 সেমি).
//   - p168 ৪ (১), (৩) and p162 অনুশীলন ২ are drawn to their printed measures (6–6–4, a right triangle 7 by 4, 40°–80°).
//   - p160: the book's obtuse সমদ্বিবাহু triangles (pp159–160) are not isosceles as printed; drawn isosceles here.
const say = (who, mood, text, side) => ({ say: who, mood, text, ...(side ? { side } : {}) });
const X = (b) => ({ kind: "c4p067_x", b });
const geo = (w, h, items, o = {}) => ({ kind: "c4p157_geo", w, h, items, ...o });
const line = (text, o = {}) => ({ kind: "c4p157_line", text, ...o });
const cos = (d) => Math.cos((d * Math.PI) / 180), sin = (d) => Math.sin((d * Math.PI) / 180);
// a triangle by its sides: base AB = a along →, AC = b, BC = c, C above the base
const bySides = (a, b, c) => { const x = (a * a + b * b - c * c) / (2 * a); return [[0, 0], [a, 0], [x, -Math.sqrt(b * b - x * x)]]; };
// a triangle by its base and the angles at its two ends
const byAngles = (a, A, B) => { const b = (a * sin(B)) / sin(A + B); return [[0, 0], [a, 0], [b * cos(A), -b * sin(A)]]; };
// turn (degrees, anticlockwise on the page) about the origin, scale
const turn = (P, rot = 0, s = 1) => P.map(([x, y]) => [s * (x * cos(rot) + y * sin(rot)), s * (-x * sin(rot) + y * cos(rot))]);
// move a figure so its box's top-left is at (x, y)
const put = (P, x, y) => { const mx = Math.min(...P.map((p) => p[0])), my = Math.min(...P.map((p) => p[1])); return P.map(([a, b]) => [a - mx + x, b - my + y]); };
// move a figure so its box is centred at (cx, cy)
const mid = (P, cx, cy) => { const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]); const dx = cx - (Math.min(...xs) + Math.max(...xs)) / 2, dy = cy - (Math.min(...ys) + Math.max(...ys)) / 2; return P.map(([a, b]) => [a + dx, b + dy]); };
// move C onto AB's perpendicular bisector (the book's near-isosceles triangle, made exactly isosceles)
const iso = ([A, B, C]) => { const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], d = [B[0] - A[0], B[1] - A[1]], L = Math.hypot(...d), n = [-d[1] / L, d[0] / L], k = (C[0] - M[0]) * n[0] + (C[1] - M[1]) * n[1]; return [A, B, [M[0] + k * n[0], M[1] + k * n[1]]]; };
const cen = (P) => [P.reduce((s, p) => s + p[0], 0) / P.length, P.reduce((s, p) => s + p[1], 0) / P.length];
const add = (p, dx, dy) => [p[0] + dx, p[1] + dy];
// the kinds' colours: by sides (yellow, green, blue), by angles (the book's green, purple, red)
const EQ = { fill: "#FEF3C7", stroke: "#B45309" }, ISO = { fill: "#DCFCE7", stroke: "#15803D" }, SCA = { fill: "#E0F2FE", stroke: "#0369A1" };
const ACU = { fill: "#F0FDF4", stroke: "#16A34A" }, RT = { fill: "#FAF5FF", stroke: "#9333EA" }, OBT = { fill: "#FEF2F2", stroke: "#DC2626" };
const PLAIN = { fill: "#fff", stroke: "#1E2433" };
// a triangle's items: its outline, ticks on equal sides ([i, j] pairs of its corners), a right-angle mark at corner k
const tri = (P, look, o = {}) => [
  { poly: P, fill: look.fill, stroke: look.stroke, sw: o.sw || 0.5 },
  ...(o.ticks ? [{ ticks: o.ticks.map(([i, j, n = 1]) => [P[i], P[j], n]), color: o.tc || "#DC2626" }] : []),
  ...(o.right != null ? [{ right: [P[o.right], P[(o.right + 1) % 3], P[(o.right + 2) % 3]], s: o.rs || 2.4, stroke: look.stroke }] : []),
];
const EQT = [[0, 1], [1, 2], [2, 0]];
const lab = (t, at, o = {}) => ({ t, at, fs: o.fs || 3.6, weight: o.weight || 700, color: o.color, ...o });

// ── p157: the book's triangles, where the book prints them (mm on its page) ──
const P157a = { k: [[80.85, 45.3], [72.5, 76.6], [89.2, 76.6]], kh: [[93.1, 50.2], [116.8, 50.2], [104.95, 77.1]], g: [[120.8, 79.1], [134, 48.8], [133.3, 75.6]] };
const P157b = {
  k: [[23.1, 186.9], [34.2, 163.7], [45.3, 186.9]], kh: [[52.1, 165.6], [84.2, 165.6], [68.15, 182.6]], g: iso([[88.1, 184.5], [106.7, 164.3], [105.4, 182.5]]),
  gh: [[46, 193.3], [53.5, 182.4], [81.3, 194.1]], ng: [[19.4, 198.9], [77.3, 198.9], [48.35, 208.3]], c: [[67.4, 210.8], [90.2, 186.3], [113, 210.8]],
};
const tint = (c) => ({ fill: c + "1A", stroke: c });

// ── p158: two tables of triangles by their sides (shapes measured on the book's page; mm) ──
// equilateral, side s, turned so it points right (rot 30 from the base-down position) or down
const eq = (s, rot) => turn(bySides(s, s, s), rot);
const T158 = {
  eqR: put(turn(bySides(19.2, 19.2, 19.2), -90), 0, 0), eqD: put(turn(bySides(19, 19, 19), 180), 0, 0),
  isoTilt: (() => { const A = [0, 0], B = [20.2 * cos(-1), -20.2 * sin(-1)], C = [20.2 * cos(-83), -20.2 * sin(-83)]; return put([A, B, C], 0, 0); })(),
  isoUp: put(bySides(18.8, 23.7, 23.7), 0, 0),
  scaA: put([[30.3, 75.3], [53.9, 53.1], [64.4, 64.4]], 0, 0), scaB: put([[68.9, 54.4], [65.8, 72.9], [90.7, 77.1]], 0, 0),
  eqD2: put(turn(bySides(23.8, 23.8, 23.8), 180), 0, 0),
  eqTilt: (() => { const A = [0, 0]; return put([A, [24 * cos(-40), -24 * sin(-40)], [24 * cos(-100), -24 * sin(-100)]], 0, 0); })(),
  isoUp2: put(bySides(17.5, 20.7, 20.7), 0, 0), isoWide: put(turn(bySides(39, 25.2, 25.2), 180), 0, 0),
  scaC: put([[8.5, 154.6], [17, 176], [44, 176]], 0, 0), scaD: put([[32.3, 152.7], [71.3, 156.9], [54.4, 176.3]], 0, 0),
};
// a table cell's drawing: figures side by side, each [points, look, opts, dx]
const cellGeo = (w, h, figs) => {
  const items = [];
  for (const [P, look, o = {}] of figs) items.push(...tri(P, look, o));
  return geo(w, h, items);
};
const row2 = (A, B, gap, h, lookA, lookB, oA, oB) => {
  const wA = Math.max(...A.map((p) => p[0])), wB = Math.max(...B.map((p) => p[0])), hA = Math.max(...A.map((p) => p[1])), hB = Math.max(...B.map((p) => p[1]));
  const w = wA + gap + wB + 2;
  return cellGeo(w, h, [[A.map(([x, y]) => [x + 1, y + (h - hA) / 2]), lookA, oA], [B.map(([x, y]) => [x + 1 + wA + gap, y + (h - hB) / 2]), lookB, oB]]);
};
const hd = (cells) => ({ type: "hd", cells });
const L = (c) => ({ c, align: "left" });

// ── p159–160: triangles by angles ──
// p159's table: the book's acute (42°, 69°, 69°), right and obtuse (105°) triangles, with their angle marks
const acu = put([[0, 16.6], [18.1, 0], [24.5, 16.6]], 2, 1.5), rtt = put([[0, 12.9], [19.9, 0], [19.9, 12.9]], 2, 3), obt = put([[0, 14.2], [24.5, 0], [20.7, 14.2]], 2, 2);
// p159–160's sorting tables: one triangle of each kind, true to its kind
const S = {
  // (acuSca: every angle under 90°, as the NCTB page draws it; our first build's 37, 26, 21 had a 103° angle, found 24 Nov)
  acuEq: bySides(22, 22, 22), acuIso: bySides(16, 27, 27), acuSca: bySides(34, 28, 22),
  obtIso: (() => { const B = [0, 0], A = [22, 0], C = [22 * cos(116), -22 * sin(116)]; return [C, B, A]; })(),
  obtSca: (() => { const B = [0, 0], A = [38, 0], C = [21 * cos(122), -21 * sin(122)]; return [C, B, A]; })(),
  rtSca: [[0, -19], [0, 0], [36, 0]], rtIso: [[0, -23], [0, 0], [23, 0]],
  acuSca2: bySides(31, 20, 25), obtSca2: (() => { const B = [0, 0], A = [26, 0], C = [19 * cos(118), -19 * sin(118)]; return [C, B, A]; })(),
};
// a sorting cell: triangles in a row, each with its name inside (or beside) it
const sortCell = (w, h, figs) => {
  const items = [];
  let x = 2;
  for (const f of figs) {
    if (f.space) { x += f.space; continue; }
    const P0 = f.P, wd = Math.max(...P0.map((p) => p[0])) - Math.min(...P0.map((p) => p[0])), ht = Math.max(...P0.map((p) => p[1])) - Math.min(...P0.map((p) => p[1]));
    const P = f.at ? put(P0, ...f.at) : put(P0, x + (f.dx || 0), (h - ht) / 2 + (f.dy || 0));
    items.push(...tri(P, f.look, f.o || {}));
    if (f.label && f.la) items.push(lab(f.label, f.la, { fs: f.fs || 3.3, weight: 600, anchor: f.anchor || "middle" }));
    else if (f.label) { const c = cen(P); items.push(lab(f.label, f.lat ? f.lat(P) : add(c, 0, ht * 0.18), { fs: f.fs || 3.3, weight: 700, color: "#1E2433", pill: f.pill ?? "#ffffffcc" })); }
    x += wd + (f.gap ?? 8);
  }
  return geo(w, h, items);
};

// ── p160–161: the 7–5–4 triangle with the cardboard strip ──
const U = 8.6;                                    // mm a সেমি in the big drawing (the book's is about 8.6)
const T754 = bySides(7, 5, 4);                    // A (left), B (right), C (the top), in সেমি
function fanItems() {
  const s = U, A = [10, 50], B = [10 + 7 * s, 50], C = [A[0] + T754[2][0] * s, A[1] + T754[2][1] * s];
  const aA = Math.atan2(-(C[1] - A[1]), C[0] - A[0]) * 180 / Math.PI, aB = 180 - Math.atan2(-(C[1] - B[1]), C[0] - B[0]) * 180 / Math.PI;
  const items = [];
  // the pink board around the fans
  items.push({ raw: `<path d="M${A[0]} ${A[1]}Q${A[0] - 7} ${A[1] - 22} ${A[0] + 5 * s * cos(82)} ${A[1] - 5 * s * sin(82) + 4}" fill="none" stroke="#EC4899" stroke-width=".45"/><path d="M${B[0]} ${B[1]}Q${B[0] + 9} ${B[1] - 20} ${B[0] - 4 * s * cos(70) + 1.5} ${B[1] - 4 * s * sin(70) + 6}" fill="none" stroke="#EC4899" stroke-width=".45"/><path d="M${A[0]} ${A[1]}Q${(A[0] + B[0]) / 2} ${A[1] + 9} ${B[0]} ${B[1]}" fill="none" stroke="#EC4899" stroke-width=".45"/>` });
  items.push({ poly: [A, B, C], fill: "#FDE047", stroke: "none", sw: 0 });
  // 5 সেমি lines from A, 4 সেমি lines from B, every 4° — those across the yellow triangle drawn paler
  for (let a = 18; a <= 82; a += 4) items.push({ line: [A, [A[0] + 5 * s * cos(a), A[1] - 5 * s * sin(a)]], stroke: a < aA - 0.5 ? "#BEF264" : "#84CC16", sw: 0.5 });
  for (let a = 18; a <= 82; a += 4) items.push({ line: [B, [B[0] - 4 * s * cos(a), B[1] - 4 * s * sin(a)]], stroke: a < aB - 0.5 ? "#F9A8D4" : "#DB2777", sw: 0.5 });
  items.push({ line: [A, C], stroke: "#4D7C0F", sw: 0.7 }, { line: [B, C], stroke: "#9D174D", sw: 0.7 }, { line: [A, B], stroke: "#1E2433", sw: 0.7 });
  items.push(lab("৫ সেমি", [A[0] - 3, A[1] - 24], { fs: 4, weight: 600, anchor: "end" }), lab("৪ সেমি", [B[0] + 4, B[1] - 22], { fs: 4, weight: 600, anchor: "start" }), lab("৭ সেমি", [(A[0] + B[0]) / 2, A[1] + 6], { fs: 4, weight: 600, pill: "#fff" }));
  return items;
}
// p161: the ruler swung about a pin (its marks on board pins) and the circle drawn with a thread and a pencil
function pinItems() {
  const O = [6, 30], a = 8, cm = 5.4, n = 12;
  const items = [{ ruler: [O[0] + n * cm * cos(a), O[1] - n * cm * sin(a)], ang: a + 180, n, cm, wid: 7 }];
  // the pins: on the arc the ruler's ০ end sweeps about its far end
  const R = n * cm, P = [O[0], O[1]];
  for (const d of [-14, -10, -6, -2, 2, 6, 10]) items.push({ ellipse: [P[0] + R * cos(a + d) + 0.8, P[1] - R * sin(a + d) - 0.8, 1.1, 0.6], fill: "#111827", stroke: "none" });
  // the circle, a board pin in the middle, the thread to the pencil
  const c = [118, 20];
  items.push({ ellipse: [c[0], c[1], 22, 14], fill: "#fff", stroke: "#1E2433", sw: 0.5 }, { ellipse: [c[0], c[1], 0.9, 0.5], fill: "#94A3B8", stroke: "#475569", sw: 0.2 });
  const tip = [c[0] + 22 * cos(-28), c[1] - 14 * sin(-28)];
  items.push({ line: [c, tip], stroke: "#1E2433", sw: 0.3 }, { pencil: tip, ang: 90, len: 12, wid: 2.4, color: "#818CF8" });
  return items;
}
// p161: the cardboard strip with its holes and digits, and the two labels with their arrows
function cardItems() {
  const O = [10, 26], a = 4, gap = 7.4, items = [{ strip: O, ang: a, n: 10, gap, wid: 8.6, pad: 4 }];
  const hole = (i) => [O[0] + i * gap * cos(a) + 1.5 * sin(a), O[1] - i * gap * sin(a) - 1.5 * cos(a)];
  items.push({ rect: [18, 2.5, 24, 6], fill: "#fff", stroke: "#1E2433", sw: 0.3 }, lab("কার্ডবোর্ড", [30, 5.6], { fs: 3.3, weight: 600 }), { arrow: [[30, 8.6], [30, 19.5]], sw: 0.35, head: 1.6 });
  items.push({ rect: [18, 40, 22, 6], fill: "#fff", stroke: "#1E2433", sw: 0.3 }, lab("ছোট ছিদ্র", [29, 43.1], { fs: 3.3, weight: 600 }));
  for (let i = 0; i <= 4; i++) items.push({ arrow: [[29, 40], add(hole(i), 0, 1.6)], sw: 0.3, head: 1.5 });
  return items;
}
// p161's three steps: the strip turned about the base's left end (৫), then its right end (৪), then the triangle
function stepItems() {
  const s = 6.2, gap = 1.2, items = [];
  // step 2: base AB, the strip from A with the pencil at hole ৫
  const A = [8, 36], B = [8 + 7 * s, 36];
  items.push({ line: [add(A, 6, 0), B], sw: 0.6 }, { tbox: "১", at: [B[0] + 8, B[1]] });
  const a2 = 30, P5 = [A[0] + 5 * s * cos(a2), A[1] - 5 * s * sin(a2)];
  items.push({ arc: [A[0], A[1], 5 * s, 10, 58], sw: 0.45 });
  items.push({ strip: A, ang: a2, n: 8, gap: s, wid: 6, pad: 2.6 });
  items.push({ pencil: add(A, 0, -0.6), ang: 90, len: 9, wid: 2, color: "#818CF8" }, { pencil: add(P5, 0, -0.6), ang: 90, len: 9, wid: 2, color: "#F472B6" });
  items.push({ tbox: "২", at: [A[0] + 13, A[1] - 27] }, { carrow: [[A[0] + 37, A[1] - 21], [A[0] + 42, A[1] - 16], [A[0] + 40, A[1] - 9]], sw: 1.1, head: 2.6 });
  items.push({ barrow: [67, 18, 11, 9] });
  // step 3: base CD, the 5-cm arc from step 2, the strip from D with the pencil at hole ৪
  const C = [86, 36], D = [86 + 7 * s, 36], a3 = 180 - 62, P4 = [D[0] + 4 * s * cos(a3), D[1] - 4 * s * sin(a3)];
  items.push({ line: [C, D], sw: 0.6 }, { arc: [C[0], C[1], 5 * s, 18, 58], sw: 0.45 }, { arc: [D[0], D[1], 4 * s, 100, 160], sw: 0.45 });
  items.push({ strip: D, ang: a3, n: 8, gap: s, wid: 6, pad: 2.6, rev: true });
  items.push({ pencil: add(D, 0, -0.6), ang: 90, len: 9, wid: 2, color: "#818CF8" }, { pencil: add(P4, 0, -0.6), ang: 90, len: 9, wid: 2, color: "#F472B6" });
  items.push({ carrow: [[D[0] - 14, D[1] - 30], [D[0] - 22, D[1] - 32], [D[0] - 28, D[1] - 23]], sw: 1.1, head: 2.6 });
  items.push({ barrow: [140, 18, 11, 9] });
  // step 4: the triangle, the two arcs crossing at its top
  const E = [158, 36], F = [158 + 7 * s, 36], G = [E[0] + T754[2][0] * s, E[1] + T754[2][1] * s];
  items.push({ poly: [E, F, G], fill: "#FEF9C3", stroke: "#1E2433", sw: 0.5 }, { arc: [E[0], E[1], 5 * s, 22, 50], sw: 0.45 }, { arc: [F[0], F[1], 4 * s, 115, 150], sw: 0.45 });
  return items;
}

// ── p162: an equilateral triangle with a protractor (the book's three pictures), and the 40°–80° triangle ──
const K = 27;                                     // কখ in the pictures, mm (the book's is about 28)
const PR = { r: 22, armLen: 1, digits: "en" };    // the protractor: the book's English digits
function protSteps() {
  const red = "#DC2626";
  // (২) the protractor at ক, the 60° arm, the pencil marking it
  const A = [23, 30], B = [A[0] + K, 30], a60 = [A[0] + 32 * cos(60), A[1] - 32 * sin(60)];
  const s2 = [{ prot: PR, at: A, ray90: true, fs: 0.78 }, { line: [A, B], sw: 0.6 }, { line: [A, a60], sw: 0.6 },
    { pencil: [A[0] + 26.5 * cos(60), A[1] - 26.5 * sin(60)], ang: 150, len: 10, wid: 2 }, lab("ক", add(A, 0, 3.6)), lab("খ", add(B, 0, 3.6))];
  // (৩) the arm from ক, the protractor at খ finding 60° the other way
  const C = [3, 30], D = [C[0] + K, 30], c60 = [C[0] + 32 * cos(60), C[1] - 32 * sin(60)], d120 = [D[0] + 23 * cos(120), D[1] - 23 * sin(120)];
  const s3 = [{ prot: PR, at: D, ray90: true, fs: 0.78 }, { line: [C, D], sw: 0.6 }, { line: [C, c60], sw: 0.6 }, { ang: [C, D, c60], r: 4, sw: 0.45 }, { line: [D, d120], sw: 0.6 },
    { pencil: [D[0] + 22 * cos(120), D[1] - 22 * sin(120)], ang: 50, len: 10, wid: 2 }, lab("ক", add(C, 0, 3.6)), lab("খ", add(D, 0, 3.6))];
  // (৪) the triangle কখগ, its two 60° angles marked
  const E = [4, 30], F = [E[0] + K, 30], G = [E[0] + K / 2, 30 - K * sin(60)], g2 = [G[0] + 3 * cos(60), G[1] - 3 * sin(60)];
  const s4 = [{ line: [E, F], stroke: red, sw: 0.6 }, { line: [E, G, g2], stroke: red, sw: 0.6 }, { line: [F, G], stroke: red, sw: 0.6 },
    { ang: [E, F, G], r: 4, sw: 0.45 }, { ang: [F, G, E], r: 4, sw: 0.45 }, { pencil: [G[0] + 2.4 * cos(-60), G[1] - 2.4 * sin(-60)], ang: 45, len: 10, wid: 2 },
    lab("ক", add(E, 0, 3.6)), lab("খ", add(F, 0, 3.6)), lab("গ", add(G, -3, -2))];
  return [s2, s3, s4];
}
const T4080 = byAngles(5, 40, 80);                // সেমি
function t4080() {
  const P = put(turn(T4080, 0, 8.4), 4, 2), [A, B, C] = P;
  return [...tri(P, PLAIN, { sw: 0.55 }), { ang: [A, B, C], r: 6, sw: 0.4, label: "৪০°", lr: 9.5, fs: 3.3 }, { ang: [B, C, A], r: 5, sw: 0.4, label: "৮০°", lr: 8.4, fs: 3.3 },
    { bow: [B, A, 2.2], label: "৫ সেমি", fs: 3.3 }];
}

// ── p163–164: rectangles and squares on squared paper ──
const SHADE = "#CBD5E1";
const SQ163 = [[3, 1, 4, 1, SHADE, "ক"], [8, 1, 3, 3, SHADE, "গ"], [1, 3, 6, 3, SHADE, "খ"], [3, 7, 1, 1, SHADE, "ঘ"], [6, 7, 2, 2, SHADE, "ঙ"], [9, 5, 2, 4, SHADE, "চ"]];
// one figure of a group, drawn at u mm a square, its letter on a white disc
const fig = (x, y, w, h, l, u) => [{ rect: [x, y, w * u, h * u], fill: SHADE, stroke: "#334155", sw: 0.45 }, { circle: [x + (w * u) / 2, y + (h * u) / 2, 2.4], fill: "#fff", stroke: "none" }, lab(l, [x + (w * u) / 2, y + (h * u) / 2 + 0.1], { fs: 3.2 })];
// p164 কাজ ৩: the 5 by 3 rectangle being drawn: the two perpendiculars, the top still dashed, the lengths
function rect53() {
  const u = 7, A = [6, 30], B = [A[0] + 5 * u, 30], C = [B[0], 30 - 3 * u], D = [A[0], 30 - 3 * u];
  return [{ line: [A, B], sw: 0.6 }, { line: [A, add(D, 0, -4)], sw: 0.6 }, { line: [B, add(C, 0, -4)], sw: 0.6 }, { line: [D, C], sw: 0.45, dash: "1.4 1" },
    { circle: [...D, 0.9], fill: "#1E2433", stroke: "none" }, { circle: [...C, 0.9], fill: "#1E2433", stroke: "none" },
    { bow: [D, A, 1.4] }, lab("৩ সেমি", add(D, 8.4, 7), { fs: 3.3, weight: 600 }), { bow: [B, C, -2] }, { bow: [B, A, 1.8] }, lab("৫ সেমি", [(A[0] + B[0]) / 2, A[1] + 5], { fs: 3.3, weight: 600 })];
}
// p164: a line, then a set square on it and another sliding on the first, then the second standing up: a perpendicular
function setSquares() {
  const y = 14, it = [];
  it.push({ line: [[2, y], [20, y]], sw: 0.5 }, { arrow: [[21.5, y], [26, y]], sw: 0.6, head: 2 });
  it.push({ line: [[28, y], [50, y]], sw: 0.5 }, { setsq: [[29, y + 0.4], [49, y + 0.4], [42, y + 8.6]] }, { setsq: [[31, 2], [48, 2], [44, 9.5]], hole: 0 });
  it.push({ arrow: [[51.5, y], [56, y]], sw: 0.6, head: 2 });
  it.push({ line: [[58, y], [82, y]], sw: 0.5 }, { setsq: [[59, y + 0.4], [79, y + 0.4], [72, y + 8.6]] }, { setsq: [[63, y - 0.4], [63, y - 13], [74, y - 0.4]], hole: 0.42 });
  return it;
}

// ── p165: the review's drawings, where the book has them (its mm), true to their kinds ──
const R1 = { a: [[19.2, 66.2], [34.7, 48.5], [73.8, 66.2]], b: [[78, 67.6], [104.5, 67.6], [91.25, 67.6 - 26.5 * sin(60)]], c: iso([[149, 65], [134.4, 68.6], [132, 42.9]]) };
const R2 = { a: [[21.4, 92.6], [44.6, 113.4], [21.4, 113.4]], b: [[78.5, 93.7], [98.6, 106.7], [73.7, 113.4]], c: [[120.5, 114.4], [132, 100.2], [162.8, 114.4]] };
const nameBox = (x, y, w, h) => [{ rect: [x, y, w, h], fill: "#fff", stroke: "#B45309", sw: 0.45, rx: 1 }, lab("ত্রিভুজ", [x + w + 1.4, y + h / 2], { fs: 3.8, weight: 500, anchor: "start" })];
// p165 ৪: ক and গ squares (the book prints them squashed), খ and ঘ rectangles
const Q4 = [[19.5, 155, 17.5, 17.5, "ক"], [49.1, 160, 35.9, 10.7, "খ"], [96, 150.5, 26.6, 26.6, "গ"], [141.7, 149, 23.3, 29.1, "ঘ"]];

// ── p166: the pattern rows ──
const PAT1 = ["circle", "star", "circle", "star", "star", "circle", "star", "star", "star", "circle", ["slot", 4], "circle"];
const PAT2 = ["circle", "plusc", "xc", "circle", "circle", "plusc", "plusc", "xc", "xc", "circle", "circle", "circle", "plusc", ["slot", 5], "circle"];
const PAT3 = [["cyl", "red"], ["circle", "red"], ["cube", "red"], ["burst", "red"], ["cyl", "green"], ["circle", "green"], ["cube", "green"], ["burst", "green"], ["slot", 3], ["burst", "red"], ["cyl", "green"], ["circle", "green"], ["cube", "green"], ["burst", "green"]];
const COL = { circle: "red", star: "green", plusc: "blue", xc: "green" };
function patRow(label, seq, s = 7.4, gap = 1.3) {
  const it = [lab(label, [3, s / 2 + 0.6], { fs: 3.6, weight: 600 })];
  let x = 10;
  for (const p of seq) {
    const [name, c] = Array.isArray(p) ? p : [p, COL[p]];
    if (name === "slot") { const n = c; it.push({ piece: "slot", n, at: [x + (n * (s + gap) - gap) / 2, s / 2], s }); x += n * (s + gap); continue; }
    it.push({ piece: name, at: [x + s / 2, s / 2], s, color: c }); x += s + gap;
  }
  return geo(x + 2, s + 0.6, it, { justify: "flex-start" });
}

// ── p167: match sticks and squares ──
const SL = 8.6;                                    // a stick, mm
const stickTri = (x, y) => { const h = SL * sin(60), A = [x, y + h], B = [x + SL, y + h], C = [x + SL / 2, y], e = 0.7; const sh = (P, Q) => { const d = [Q[0] - P[0], Q[1] - P[1]], L = Math.hypot(...d); return [[P[0] + (d[0] * e) / L, P[1] + (d[1] * e) / L], [Q[0] - (d[0] * e) / L, Q[1] - (d[1] * e) / L]]; }; return [{ stick: sh(A, B) }, { stick: sh(B, C) }, { stick: sh(C, A) }]; };
const stickSquares = (x, y, n) => { const it = [], e = 0.6; for (let i = 0; i < n; i++) { it.push({ stick: [[x + i * SL + e, y], [x + (i + 1) * SL - e, y]] }, { stick: [[x + i * SL + e, y + SL], [x + (i + 1) * SL - e, y + SL]] }); } for (let i = 0; i <= n; i++) it.push({ stick: [[x + i * SL, y + e], [x + i * SL, y + SL - e]] }); return it; };
const lineGrid = (x, y, cols, rows, s) => [{ grid: [x, y, cols, rows, s], stroke: "#1E2433", sw: 0.4 }];
const cellG = (w, h, items) => geo(w, h, items);
const qm = (h = 13) => ({ c: [geo(10, h, [lab("?", [5, h / 2], { fs: 4.4, weight: 700, color: "#B45309" })])] });
// p167 কাজ ৩: the two patterns the book shows, on dot paper; the rest of the dot paper to draw on
const DOTW = 50, DOTH = 24;
const dotPaper = () => geo(DOTW, DOTH, [{ dots: [2.2, 2, 15, 7, 3.3, 3.3], r: 0.36 }]);

// ── p168 ──
const optFig = (w, h, items) => geo(w, h, items, { justify: "flex-start" });
const scissors = () => optFig(13, 7, [{ circle: [2, 2.2, 1.5], fill: "none", sw: 0.55 }, { circle: [2, 5, 1.5], fill: "none", sw: 0.55 }, { poly: [[3.3, 2.9], [12.5, 6.4], [12.6, 6], [4, 3.9]], fill: "#1E2433", sw: 0.2 }, { poly: [[3.3, 4.3], [12.5, 0.8], [12.6, 1.2], [4, 3.3]], fill: "#1E2433", sw: 0.2 }]);
const sunrise = () => { const it = [{ line: [[0, 6.4], [19, 6.4]], sw: 0.45 }, { raw: '<path d="M6.3 6.4A3.2 3.2 0 0 1 12.7 6.4Z" fill="#1E2433"/>' }]; for (let a = 0; a <= 180; a += 15) it.push({ line: [[9.5 + 3.9 * cos(a), 6.4 - 3.9 * sin(a)], [9.5 + 5.6 * cos(a), 6.4 - 5.6 * sin(a)]], sw: 0.4 }); return optFig(19, 7, it); };
const zee = () => optFig(13, 7, [{ line: [[2.4, 1], [12, 1]], sw: 0.45 }, { line: [[12, 1], [1, 6.2], [12, 6.2]], sw: 0.45 }]);
const eff = () => optFig(9, 7, [{ line: [[1, 0.6], [1, 6.6]], sw: 0.45 }, { line: [[1, 1], [6.5, 1]], sw: 0.45 }, { line: [[1, 3.6], [5.5, 3.6]], sw: 0.45 }]);
const quad = (P, w = 26, h = 11) => optFig(w, h, [{ poly: P, fill: "#fff", sw: 0.5 }]);
const RH = 7.2;                                    // the rhombus's side (ঘ), its acute angle 70°
const T6 = bySides(4, 6, 6), T5 = bySides(5, 5, 5), T74 = [[0, 0], [7, 0], [7, -4]];
function draw168() {
  const u = 4.6, it = [];
  // (১) 6, 6, 4 সেমি
  const P1 = put(turn(T6, 0, u), 12, 5), [A, B, C] = P1;
  it.push(...tri(P1, PLAIN, { sw: 0.5 }), { bow: [C, A, -2.2] }, { bow: [B, C, -2.2] }, { bow: [B, A, 2] }, lab("(১)", [2, 3], { fs: 3.3, weight: 500 }),
    lab("৬ সেমি", [(A[0] + C[0]) / 2 - 3.6, (A[1] + C[1]) / 2 - 3], { fs: 3, weight: 600, anchor: "end" }), lab("৬ সেমি", [(B[0] + C[0]) / 2 + 3.6, (B[1] + C[1]) / 2 - 3], { fs: 3, weight: 600, anchor: "start" }),
    lab("৪ সেমি", [(A[0] + B[0]) / 2, A[1] + 2.4], { fs: 3, weight: 600, pill: "#fff" }));
  // (২) 60° and 60° (the book's labels), 5 সেমি
  const P2 = put(turn(T5, 0, u), 64, 11), [D, E, F] = P2;
  it.push(...tri(P2, PLAIN, { sw: 0.5 }), { ang: [D, E, F], r: 4.6, sw: 0.4, label: "৬০°", lr: 7.6, fs: 3 }, { ang: [F, D, E], r: 4, sw: 0.4, label: "৬০", lr: 7, fs: 3 },
    lab("°", add(F, 3.2, -4.6), { fs: 3 }), { bow: [D, F, 2.2] }, lab("৫ সেমি", [(D[0] + F[0]) / 2 - 3.4, (D[1] + F[1]) / 2 - 2.8], { fs: 3, weight: 600, anchor: "end" }), lab("(২)", [58, 3], { fs: 3.3, weight: 500 }));
  // (৩) a right angle, 7 and 4 সেমি
  const P3 = put(turn(T74, 0, u), 110, 12), [G, H, I] = P3;
  it.push(...tri(P3, PLAIN, { sw: 0.5, right: 1, rs: 2.6 }), { bow: [H, G, 2] }, { bow: [I, H, 2] }, lab("৭ সেমি", [(G[0] + H[0]) / 2, G[1] + 2.4], { fs: 3, weight: 600, pill: "#fff" }),
    lab("৪ সেমি", [H[0] + 4.6, (H[1] + I[1]) / 2], { fs: 3, weight: 600, anchor: "start" }), lab("(৩)", [108, 3], { fs: 3.3, weight: 500 }));
  return it;
}

module.exports = {
  pages: [
    // ── 157 ── ত্রিভুজ
    {
      page: 157,
      title: "ত্রিভুজ",
      spread: true,
      blocks: [
        { ask: "নিচের চিত্রগুলোর মধ্যে আমরা কী কী মিল ও অমিল খুঁজে পাই?" },
        geo(68, 37, [
          ...tri(P157a.k, tint("#16A34A")), ...tri(P157a.kh, tint("#DC2626")), ...tri(P157a.g, tint("#DC2626")),
          lab("ক", [80.8, 67]), lab("খ", [104.6, 58]), lab("গ", [127.4, 70]),
        ], { x0: 70, y0: 43 }),
        say("boy", "talk", "আমরা ২য় শ্রেণিতে ত্রিভুজাকৃতি সম্পর্কে শিখেছি। আমার মনে হয় এখানের চিত্র তিনটি ত্রিভুজাকৃতির। প্রতিটি চিত্রে ৩টি করে বাহু এবং তিনটি করে কোণ রয়েছে।"),
        say("parrot", "talk", "একটি আকৃতি যা তিনটি রেখা দ্বারা আবদ্ধ, তাকে ত্রিভুজ বলে।", "left"),
        { row: [
          say("boy", "think", "চলো, আমরা নিচের ত্রিভুজগুলো বাহুর দৈর্ঘ্য অনুসারে বাছাই করি।"),
          say("girl", "talk", "স্কেলের সাহায্যে ত্রিভুজের বাহুগুলোর দৈর্ঘ্য পরিমাপ করে ত্রিভুজের বৈশিষ্ট্য নির্ণয় করি।"),
        ], gap: 3, align: "flex-start" },
        { col: [
          geo(98, 51, [
            ...tri(P157b.k, tint("#16A34A")), ...tri(P157b.kh, tint("#16A34A")), ...tri(P157b.g, tint("#DC2626")),
            ...tri(P157b.gh, tint("#DB2777")), ...tri(P157b.ng, tint("#F59E0B")), ...tri(P157b.c, tint("#0D9488")),
            lab("ক", [34.6, 179.6]), lab("খ", [68.3, 171.5]), lab("গ", [101, 177]), lab("ঘ", [60, 188]), lab("ঙ", [48.4, 202.6]), lab("চ", [90, 202]),
          ], { x0: 17, y0: 162 }),
          line("বিভিন্ন ধরনের ত্রিভুজ", { center: true, size: 12 }),
        ], gap: 1.6 },
      ],
    },
    // ── 158 ── বাহুভেদে ত্রিভুজ
    {
      page: 158,
      title: "বাহুভেদে ত্রিভুজ",
      dense: true,
      allow: ["চাঁদা"], // কাজ ১ "চলো, আমরা চাঁদা ব্যবহার করে…": checked by eye (300 dpi); the OCR misses it
      blocks: [
        { kind: "p011_tab", tone: "yellow", cols: ["27%", "51%", "22%"], rows: [
          hd(["ত্রিভুজের বাহুর দৈর্ঘ্য/ বৈশিষ্ট্য", "ত্রিভুজসমূহ", "নামকরণ"]),
          { cells: [L("দুইটি ত্রিভুজই তিনটি সমান বাহু (ভুজ) দ্বারা গঠিত।"), { c: [row2(T158.eqR, T158.eqD, 8, 22, EQ, EQ, { ticks: EQT }, { ticks: EQT })] }, "সমবাহু ত্রিভুজ"] },
          { cells: [L("দুইটি ত্রিভুজই দুইটি সমান বাহু (ভুজ) দ্বারা গঠিত।"), { c: [row2(T158.isoTilt, T158.isoUp, 9, 24, ISO, ISO, { ticks: [[0, 1], [0, 2]] }, { ticks: [[0, 2], [1, 2]] })] }, "সমদ্বিবাহু ত্রিভুজ"] },
          { cells: [L("দুইটি ত্রিভুজই তিনটি অসমান বাহু (ভুজ) দ্বারা গঠিত।"), { c: [row2(T158.scaA, T158.scaB, 4, 26, SCA, SCA)] }, "বিষমবাহু ত্রিভুজ"] },
        ] },
        { ex: "১", mark: "kaj", text: "চলো, আমরা চাঁদা ব্যবহার করে ত্রিভুজগুলোর কোণ পরিমাপ করে আরও কিছু বৈশিষ্ট্য বের করি।", body: [
          X({ kind: "p011_tab", tone: "yellow", cols: ["19%", "50%", "31%"], rows: [
            hd(["নামকরণ", "ত্রিভুজসমূহ", "ফাঁকা ঘর পূরণ করি (ত্রিভুজের বৈশিষ্ট্য)"]),
            { cells: ["সমবাহু ত্রিভুজ", { c: [row2(T158.eqD2, T158.eqTilt, 12, 27, EQ, EQ, { ticks: EQT }, { ticks: EQT })] }, L("সমবাহু ত্রিভুজের তিনটি বাহুই সমান এবং তিনটি কোণই ▭")] },
            { cells: ["সমদ্বিবাহু ত্রিভুজ", { c: [row2(T158.isoUp2, T158.isoWide, 4, 23, ISO, ISO, { ticks: [[0, 2], [1, 2]] }, { ticks: [[0, 2], [1, 2]] })] }, L("সমদ্বিবাহু ত্রিভুজের দুইটি ▭ কোণ রয়েছে।")] },
            { cells: ["বিষমবাহু ত্রিভুজ", { c: [row2(put(turn(T158.scaC, 0, 0.88), 0, 0), put(turn(T158.scaD, 0, 0.88), 0, 0), 6, 25, SCA, SCA)] }, L("বিষমবাহু ত্রিভুজের ▭ কোণই অসমান।")] },
          ] }),
        ] },
      ],
    },
    // ── 159 ── কোণভেদে ত্রিভুজ
    {
      page: 159,
      title: "কোণভেদে ত্রিভুজ",
      spread: true,
      allow: ["সমবাহু"], // the label in the acute row's first triangle: checked by eye; the OCR reads it "সমবাহ"
      blocks: [
        "ত্রিভুজের কোণের ভিন্নতা অনুযায়ী ত্রিভুজ আরও কয়েক ধরনের হয়।",
        { kind: "p011_tab", tone: "green", cols: ["22%", "26%", "52%"], rows: [
          hd(["নামকরণ", "ত্রিভুজ", "ত্রিভুজের বৈশিষ্ট্য"]),
          { cells: [L("সূক্ষ্মকোণী ত্রিভুজ"), { c: [geo(29, 20, [...tri(acu, ACU, { sw: 0.6 }),
            { ang: [acu[0], acu[2], acu[1]], r: 3.4, stroke: "#16A34A", sw: 0.45 }, { ang: [acu[1], acu[0], acu[2]], r: 3.4, stroke: "#16A34A", sw: 0.45 }, { ang: [acu[2], acu[1], acu[0]], r: 3.4, stroke: "#16A34A", sw: 0.45 },
            lab("ক", add(acu[0], 6.4, -1.6), { fs: 3 }), lab("খ", add(acu[1], -0.2, 5.6), { fs: 3 }), lab("গ", add(acu[2], -4.6, -1.8), { fs: 3 })])] },
            L("সূক্ষ্মকোণী ত্রিভুজের প্রত্যেকটি কোণই ৯০° এর ছোটো। (ক, খ এবং গ < ৯০°)")] },
          { cells: [L("সমকোণী ত্রিভুজ"), { c: [geo(24, 17, [...tri(rtt, RT, { sw: 0.6, right: 2, rs: 2.6 }), lab("ঘ", add(rtt[2], -4.4, -5), { fs: 3 })])] },
            L("সমকোণী ত্রিভুজের একটি কোণ সমকোণ বা ৯০°।\n(ঘ = ৯০°)")] },
          { cells: [L("স্থূলকোণী ত্রিভুজ"), { c: [geo(29, 18, [...tri(obt, OBT, { sw: 0.6 }), { ang: [obt[2], obt[0], obt[1]], r: 3.6, stroke: "#DC2626", sw: 0.45 }, lab("ঙ", add(obt[2], -4.6, -6.2), { fs: 3 })])] },
            L("স্থূলকোণী ত্রিভুজের একটি কোণ ৯০° এর বড়ো।\n(ঙ > ৯০°)")] },
        ] },
        say("boy", "talk", "আমরা ত্রিভুজগুলোকে কোণভেদেও সাজাতে পারি।"),
        { kind: "p011_tab", tone: "green", cols: ["22%", "78%"], rows: [
          { cells: [{ c: "সূক্ষ্মকোণী", style: "background:#DCFCE7" }, { c: [sortCell(124, 28, [
            { P: S.acuEq, look: EQ, o: { ticks: EQT }, label: "সমবাহু", gap: 10 },
            { P: S.acuIso, look: ISO, o: { ticks: [[0, 2], [1, 2]] }, label: "সমদ্বিবাহু", fs: 2.9, gap: 10 },
            { P: S.acuSca, look: SCA, label: "বিষমবাহু" },
          ])] }] },
          { cells: [{ c: "স্থূলকোণী", style: "background:#DCFCE7" }, { c: [sortCell(124, 24, [
            { P: S.obtIso, look: ISO, o: { ticks: [[0, 1], [1, 2]] }, label: "সমদ্বিবাহু", lat: (P) => add(cen(P), 2.4, 0.6), gap: 12 },
            { P: S.obtSca, look: SCA, label: "বিষমবাহু", lat: (P) => add(cen(P), 4, 3) },
          ])] }] },
          { cells: [{ c: "সমকোণী", style: "background:#DCFCE7" }, { c: [sortCell(124, 26, [
            { P: S.rtSca, look: SCA, o: { right: 1 }, label: "বিষমবাহু", lat: (P) => add(cen(P), 5, 3.2), gap: 18 },
            { P: S.rtIso, look: ISO, o: { right: 1, ticks: [[0, 1], [1, 2]] }, label: "সমদ্বিবাহু", lat: (P) => add(cen(P), 4.6, 4.4), fs: 3 },
          ])] }] },
        ] },
      ],
    },
    // ── 160 ── by sides again; কাজ ২ begins: the 7–5–4 triangle
    {
      page: 160,
      spread: true,
      blocks: [
        say("girl", "talk", "আমরা ত্রিভুজগুলোকে বাহুভেদেও সাজাতে পারি।"),
        { kind: "p011_tab", tone: "yellow", cols: ["22%", "78%"], rows: [
          { cells: [{ c: "সমবাহু", style: "background:#FEF3C7" }, { c: [sortCell(124, 26, [
            { P: S.acuEq, look: EQ, o: { ticks: EQT }, at: [64, 3], label: "সূক্ষ্মকোণী ত্রিভুজ", la: [60, 20.5], anchor: "end" },
          ])] }] },
          { cells: [{ c: "সমদ্বিবাহু", style: "background:#FEF3C7" }, { c: [sortCell(124, 31, [
            { P: S.obtIso, look: ISO, o: { ticks: [[0, 1], [1, 2]] }, at: [14, 3], label: "স্থূলকোণী ত্রিভুজ", la: [6, 27.5], anchor: "start" },
            { P: S.acuIso, look: ISO, o: { ticks: [[0, 2], [1, 2]] }, at: [100, 2.5], label: "সূক্ষ্মকোণী ত্রিভুজ", la: [97, 24], anchor: "end" },
          ])] }] },
          { cells: [{ c: "বিষমবাহু", style: "background:#FEF3C7" }, { c: [sortCell(124, 26, [
            { P: S.obtSca2, look: SCA, at: [4, 6], label: "স্থূলকোণী ত্রিভুজ", la: [26, 6.5], anchor: "start" },
            { P: S.acuSca2, look: SCA, at: [58, 6], label: "সূক্ষ্মকোণী ত্রিভুজ", la: [91, 10], anchor: "start" },
          ])] }] },
        ] },
        { ex: "২", mark: "kaj", text: "৭ সেমি, ৫ সেমি ও ৪ সেমি বাহুবিশিষ্ট ত্রিভুজ আঁকি।", body: [
          say("girl", "talk", "চলো, আমরা ৭ সেমি বাহু আঁকার মধ্যে দিয়ে শুরু করি।"),
          say("boy", "think", "কিন্তু আমরা কীভাবে দ্বিতীয় এবং তৃতীয় বাহু আঁকতে পারি? এই বাহু দুইটির মিলিত বিন্দু বের করার কোনো ভালো উপায় কি রয়েছে?"),
          say("girl", "talk", "আমরা ৭ সেমি বাহুর একপ্রান্ত থেকে ৫ সেমি ও অন্য প্রান্ত থেকে ৪ সেমি দৈর্ঘ্যের অনেকগুলো বাহু একই পাশে আঁকতে পারি।"),
        ] },
      ],
    },
    // ── 161 ── কাজ ২ goes on: the lines of 5 and 4 সেমি, a ruler swung on pins, the circle with a thread; the cardboard strip
    {
      page: 161,
      dense: true,
      allow: ["১০", "১১", "১২"], // the ruler's numbers: the book's ruler shows ০–১২ upside down (checked by eye); the OCR can't read them
      blocks: [
        geo(96, 58, fanItems(), { x0: -8, y0: 2, scale: 0.82 }),
        geo(150, 38, pinItems(), { y0: 2, scale: 0.84 }),
        { frame: [
          "বৃত্তের কোনো একটি অংশ আঁকার জন্য আমরা উপরের চিত্রের বোর্ড পিন এবং সুতা ব্যবহার না করে নিচের চিত্রের মতো ছোটো ছোটো ছিদ্রযুক্ত আয়তাকার কার্ডবোর্ডের টুকরো ব্যবহার করতে পারি।",
          { row: [geo(84, 47, cardItems()), { pic: "p161-hands-cardboard", h: 31, w: 68, fit: "contain" }], gap: 4, justify: "space-around" },
        ] },
        say("girl", "talk", "চলো, এখন আমরা কার্ডবোর্ড ব্যবহার করে ত্রিভুজ আঁকি।"),
        { frame: [
          "(১) বাহু আঁকি। (ত্রিভুজের ভূমি : ৭ সেমি)",
          geo(204, 40, stepItems(), { x0: 0, y0: 0, scale: 0.75 }),
          { row: [line("(২) ভূমির বাম প্রান্ত থেকে\n৫ সেমি দৈর্ঘ্য আঁকি।", { center: true, size: 12 }), line("(৩) ভূমির ডান প্রান্ত থেকে\n৪ সেমি দৈর্ঘ্য আঁকি।", { center: true, size: 12 }), line("(৪) প্রাপ্ত বিন্দুটি ব্যবহার করে\nত্রিভুজের বাকি দুই বাহু আঁকি।", { center: true, size: 12 })], gap: 2 },
        ] },
      ],
    },
    // ── 162 ── অনুশীলন ১; drawing a triangle with its angles: an equilateral one with a protractor (কাজ ৩)
    {
      page: 162,
      spread: true,
      allow: ["৪০", "৮০", "সূক্ষ্মকোণী"], // ৪০° ৮০° on অনুশীলন ২'s triangle and সূক্ষ্মকোণী in অনুশীলন ৩: checked by eye at 300 dpi; the OCR misreads them
      blocks: [
        { ex: "১", mark: "anu", text: "উপরের পদ্ধতি ব্যবহার করে নিচের ত্রিভুজগুলো আঁকি।", body: [
          line("(১) ৬ সেমি বাহুবিশিষ্ট একটি সমবাহু ত্রিভুজ।", { size: 12.5, indent: 4 }),
          line("(২) একটি সমদ্বিবাহু ত্রিভুজ আঁকি যার ২টি বাহু ৫ সেমি এবং ১টি বাহু ৬ সেমি।", { size: 12.5, indent: 4 }),
        ] },
        say("girl", "think", "সমবাহু ত্রিভুজের ৩টি ৬০° কোণ রয়েছে এবং সমদ্বিবাহু ত্রিভুজের ২টি সমান কোণ রয়েছে। আমরা কি এই কোণগুলো ব্যবহার করে ত্রিভুজ আঁকতে পারি?"),
        { ex: "৩", mark: "kaj", text: "স্কেল ও চাঁদা ব্যবহার করে ৫ সেমি বাহুবিশিষ্ট একটি সমবাহু ত্রিভুজ আঁকি।", body: [
          { row: [line("(১) একবাহু আঁকি। (কখ : ৫ সেমি)", { size: 12.5 }), geo(44, 6, [{ line: [[6, 3], [38, 3]], sw: 0.6 }, lab("ক", [2.5, 3.2]), lab("খ", [41.5, 3.2])])], w: [0, 60], align: "center" },
          { row: protSteps().map((items, i) => ({ col: [geo([52, 54, 40][i], 34, items, { justify: "flex-start" }), line(["(২) ক বিন্দুতে ৬০° পরিমাপের\nএকটি কোণ আঁকি।", "(৩) খ বিন্দু থেকে ৬০°\nকোণ খুঁজে বের করি।", "(৪) খ থেকে একটি রেখা\nআঁকি এবং ক কোণের বাহুর\nসাথে গ বিন্দুতে মিলাই।"][i], { size: 11.5 })], gap: 1 })), w: [54, 56, 46], gap: 2, align: "flex-start" },
          line("(৫)এখন, কখগ একটি ৫ সেমি বাহুবিশিষ্ট সমবাহু ত্রিভুজ হলো।", { size: 12.5 }),
        ] },
        { ex: "২", mark: "anu", text: "নিচের ত্রিভুজটি আঁকি।", body: [
          { row: [geo(52, 36, t4080()), { frame: [{ gap: 30 }], pad: 1 }], w: [56, 0], gap: 6, align: "center" },
        ] },
        { ex: "৩", mark: "anu", text: "চাঁদা ব্যবহার করে একটি সূক্ষ্মকোণী, একটি স্থূলকোণী ও একটি সমকোণী ত্রিভুজ আঁকি।" },
      ],
    },
    // ── 163 ── আয়ত ও বর্গ
    {
      page: 163,
      title: "আয়ত ও বর্গ",
      spread: true,
      blocks: [
        { ask: "নিচের আকৃতিগুলো লক্ষ করি এবং মিল ও অমিল শনাক্ত করে আকৃতিগুলোকে কয়েকটি দলে সাজাই।" },
        { ex: "১", mark: "kaj", text: "চলো, আমরা আকৃতিগুলোকে এদের বৈশিষ্ট্য অনুযায়ী আলাদা করি।", body: [
          { row: [say("girl", "talk", "আমরা আকৃতিগুলোকে দুই ভাগে ভাগ করতে পারি।", "left"), geo(73, 61, [{ grid: [0.5, 0.5, 12, 10, 6], cells: SQ163, sw: 0.3 }])], w: [0, 76], gap: 4 },
        ] },
        { row: [
          { kind: "c4p157_group", title: "১ম দল", color: "#E53935", tint: "#FDECE4", body: [geo(48, 28, [...fig(2, 5, 3, 3, "গ", 6.4), ...fig(32, 1, 1, 1, "ঘ", 6.4), ...fig(29, 13, 2, 2, "ঙ", 6.4)])] },
          { kind: "c4p157_group", title: "২য় দল", color: "#22A35A", tint: "#E6F4DD", body: [geo(62, 28, [...fig(1, 1, 4, 1, "ক", 6.4), ...fig(1, 9, 6, 3, "খ", 6.4), ...fig(47, 2, 2, 4, "চ", 6.4).map((x) => x.rect ? { ...x, rect: [47, 1.2, 12.8, 25.6] } : x.circle ? { ...x, circle: [53.4, 14, 2.4] } : { ...x, at: [53.4, 14.1] })])] },
        ], gap: 6, align: "stretch" },
        { ex: "২", mark: "kaj", text: "১ম দল ও ২য় দলের আকৃতিগুলো নিয়ে সহপাঠীদের সঙ্গে আলোচনা করি এবং মিল ও অমিল খুঁজে বের করি।", body: [
          { kind: "p011_tab", tone: "blue", cols: ["50%", "50%"], rows: [
            hd(["মিল", "অমিল"]),
            { cells: [L("১।"), L("১।")], h: 10 }, { cells: [L("২।"), L("২।")], h: 10 }, { cells: [L("৩।"), L("৩।")], h: 10 },
          ] },
        ] },
      ],
    },
    // ── 164 ── চতুর্ভুজ, আয়ত, বর্গ; drawing a rectangle with set squares
    {
      page: 164,
      dense: true,
      blocks: [
        { row: [
          { kind: "c4p157_bullets", items: ["চারটি সরলরেখা দ্বারা সীমাবদ্ধ আকৃতিকে চতুর্ভুজ বলে।", "যে চতুর্ভুজের চারটি কোণই সমকোণ তাকে আয়ত বলে।", "যে আয়তের চারটি বাহু সমান তাকে বর্গ বলে।"] },
          geo(57, 34.6, [{ grid: [0.5, 0.5, 10, 6, 5.6], cells: [[0, 2, 5, 2, "#D9D9E0"], [7, 2, 2, 2, "#7FB8C2"]], sw: 0.3 }]),
        ], w: [0, 60], gap: 4 },
        { kind: "c3p133_say", who: "parrot", small: true, text: "উপরের চিত্রে আমরা দেখতে পাই, আয়তের বিপরীত এবং বর্গের বাহুগুলো পরস্পর সমান ও সমান্তরাল।" },
        { ex: "১", mark: "anu", text: "আমাদের চারপাশের পরিবেশে বর্গাকার ও আয়তাকার ক্ষেত্র কোথায় দেখতে পাই তা সহপাঠীদের সাথে আলোচনা করে ছকে লিখি।", body: [
          { kind: "p011_tab", tone: "yellow", cols: ["27%", "73%"], rows: [
            { cells: [{ c: "বর্গাকার ক্ষেত্র", align: "left", style: "background:#FEF3C7" }, { c: "", style: "background:#fff" }], h: 9 },
            { cells: [{ c: "আয়তাকার ক্ষেত্র", align: "left", style: "background:#FEF3C7" }, { c: "", style: "background:#fff" }], h: 9 },
          ] },
        ] },
        { ex: "৩", mark: "kaj", text: "আমরা কীভাবে আয়ত আঁকতে পারি?", body: [
          { row: [{ col: [line("[১] একটি স্কেলের সাহায্যে ৫ সেমি দৈর্ঘ্যের একটি রেখা আঁকি।", { size: 12.5 }), line("[২] ১ম ধাপে অঙ্কিত রেখার উপর জ্যামিতি বক্সের ত্রিকোণীসেট ব্যবহার করে দুইটি লম্ব আঁকি।", { size: 12.5 })], gap: 1.6 },
            geo(50, 33, rect53(), { y0: 4 })], w: [0, 52], gap: 4, align: "flex-start" },
          { row: [{ kind: "c3p133_say", who: "girl", side: "left", small: true, maxw: 66, text: "ত্রিকোণীসেট ব্যবহার করে আমরা পাশে দেখানো ছবির মতো লম্ব আঁকতে পারি।" },
            { frame: [geo(84, 24, setSquares())], pad: 1.6 }], w: [0, 92], gap: 3 },
          line("[৩] লম্ব দুইটি থেকে ৩ সেমি দৈর্ঘ্যের দুইটি বিন্দু দিয়ে চিহ্নিত করি।", { size: 12.5 }),
          line("[৪] ৩য় ধাপে আয়তটি আঁকার জন্য চিহ্নিত বিন্দুদ্বয় যোগ করি।", { size: 12.5 }),
        ] },
        { ex: "২", mark: "anu", text: "আয়ত ও বর্গ অঙ্কন করি।", body: [
          line("১) দৈর্ঘ্য ৬ সেমি, প্রস্থ ৩ সেমি", { size: 12.5, indent: 2 }), line("২) দৈর্ঘ্য ৮ সেমি, প্রস্থ ৪ সেমি", { size: 12.5, indent: 2 }), line("৩) প্রতিটি বাহুর দৈর্ঘ্য ৬ সেমি।", { size: 12.5, indent: 2 }),
        ] },
      ],
    },
    // ── 165 ── দেখি পারি কি না
    {
      page: 165,
      dense: true,
      spread: true,
      blocks: [
        { review: "দেখি পারি কি না" },
        { ex: "১", text: "বাহুভেদে ত্রিভুজের নাম লিখি।", body: [
          geo(160, 40, [...tri(R1.a, SCA), ...tri(R1.b, SCA), ...tri(R1.c, SCA), ...nameBox(19, 73, 29, 7), ...nameBox(77, 73, 29, 7), ...nameBox(123, 73, 29, 7)], { x0: 14, y0: 41 }),
        ] },
        { ex: "২", text: "কোণভেদে ত্রিভুজের নাম লিখি।", body: [
          geo(160, 36, [...tri(R2.a, ACU), ...tri(R2.b, ACU), ...tri(R2.c, ACU), ...nameBox(20, 119, 24, 7), ...nameBox(63, 119, 24, 7), ...nameBox(125, 119, 24, 7)], { x0: 14, y0: 91 }),
        ] },
        { ex: "৩", text: "৪ সেমি, ৫ সেমি ও ৬ সেমি বাহুবিশিষ্ট একটি ত্রিভুজ আঁকি ও এর নাম লিখি।" },
        { ex: "৪", text: "নিচের চতুর্ভুজগুলোর মধ্যে কোনটি আয়ত এবং কোনটি বর্গ লিখি এবং বৈশিষ্ট্য উল্লেখ করি।", body: [
          geo(152, 31, Q4.flatMap(([x, y, w, h, l]) => [{ rect: [x, y, w, h], fill: "#FEF3C7", stroke: "#B45309", sw: 0.5 }, lab(l, [x + w / 2, y + h / 2], { fs: 3.6 })]), { x0: 16, y0: 148 }),
          { kind: "p011_tab", tone: "blue", cols: ["11%", "39%", "11%", "39%"], rows: [hd(["আয়ত", "বৈশিষ্ট্য", "বর্গ", "বৈশিষ্ট্য"]), { cells: ["", "", "", ""], h: 12 }] },
        ] },
        { ex: "৫", text: "৪ সেমি ও ৫ সেমি বাহুবিশিষ্ট একটি চতুর্ভুজ আঁকি ও এর নাম লিখি।" },
      ],
    },
    // ── 166 ── জ্যামিতিক প্যাটার্ন
    {
      page: 166,
      title: "জ্যামিতিক প্যাটার্ন",
      spread: true,
      blocks: [
        { ask: "চলো, আমরা পরিবেশ থেকে বিভিন্ন জ্যামিতিক আকৃতির প্যাটার্ন খুঁজে বের করি।" },
        { kind: "c3p133_figs", justify: "space-between", items: [
          { pic: "p166-saree-border", h: 37, w: 28, fit: "cover", label: "শাড়ির পাড়" },
          { objs: { sticker: "pineapple", emoji: "🍍", n: 1, size: 37 }, label: "আনারস" },
          { kind: "c4p157_geo", w: 93, h: 37, items: [{ arches: [0.5, 0.5, 5, 17.6, 36] }], label: "মসজিদের দেয়াল" },
        ] },
        { kind: "c3p133_figs", justify: "space-between", items: [
          { kind: "c4p157_geo", w: 66, h: 33, items: [{ grille: [0.5, 0.5, 4, 2, 15.8] }], label: "গ্রিল" },
          { pic: "p166-floor-tiles", h: 33, w: 40, fit: "cover", label: "মেঝে" },
          { kind: "c4p157_geo", w: 34, h: 34, items: [{ chess: [0.5, 0.5, 8, 4.1] }], label: "দাবার বোর্ড" },
        ] },
        { ex: "১", mark: "kaj", text: "বর্ণিত চিত্রে কেন এগুলো প্যাটার্ন তা যুক্তিসহকারে উপস্থাপন করি।", body: [
          { kind: "c3p133_say", who: "boy", small: true, text: "আর কোথায় প্যাটার্ন লক্ষ করা যায় তা লিখি।" },
          { kind: "c4p157_fill", text: "কার্পেট,", indent: 6 },
        ] },
        { ex: "১", mark: "anu", text: "চলো, নিচের প্যাটার্ন লক্ষ করি এবং প্যাটার্ন সম্পূর্ণ করি।", body: [
          patRow("(১)", PAT1, 7.4, 1.4), patRow("(২)", PAT2, 6.6, 1), patRow("(৩)", PAT3, 7, 1.6),
        ] },
      ],
    },
    // ── 167 ── making patterns: match sticks (কাজ ২), patterns on dot paper (কাজ ৩)
    {
      page: 167,
      dense: true,
      blocks: [
        { ex: "২", mark: "kaj", text: "জ্যামিতিক প্যাটার্ন ও গাণিতিক প্যাটার্ন তৈরি করি।", body: [
          { row: [line("(১)  (কাঠি বা ম্যাচ শলাকা ব্যবহার করে)", { size: 12.5 }), geo(14, 5, [{ stick: [[1, 2.5], [13, 2.5]], w: 1.4 }])], w: [70, 16], justify: "flex-start", gap: 1 },
          { kind: "p011_tab", tone: "yellow", cols: ["13%", "23%", "35%", "29%"], rows: [
            { type: "pic", cells: [{ c: [cellG(12, 10, stickTri(1.5, 1))] }, { c: [cellG(22, 10, [...stickTri(1.5, 1), ...stickTri(11.5, 1)])] }, { c: [cellG(32, 10, [...stickTri(1.5, 1), ...stickTri(11.5, 1), ...stickTri(21.5, 1)])] }, qm(10)] },
            { type: "num", cells: ["৩", "৬", "৯", "?"] },
          ] },
          line("(২)", { size: 12.5 }),
          { kind: "p011_tab", tone: "yellow", cols: ["13%", "23%", "35%", "29%"], rows: [
            { type: "pic", cells: [{ c: [cellG(11, 11, stickSquares(1, 1, 1))] }, { c: [cellG(20, 11, stickSquares(1, 1, 2))] }, { c: [cellG(29, 11, stickSquares(1, 1, 3))] }, qm(11)] },
            { type: "num", cells: ["৪", "৭", "১০", "?"] },
          ] },
          line("(৩)", { size: 12.5 }),
          { kind: "p011_tab", tone: "yellow", cols: ["13%", "23%", "35%", "29%"], rows: [
            { type: "pic", cells: [{ c: [cellG(13, 13, lineGrid(0.5, 0.5, 2, 2, 6))] }, { c: [cellG(19, 13, lineGrid(0.5, 0.5, 3, 2, 6))] }, { c: [cellG(25, 13, lineGrid(0.5, 0.5, 4, 2, 6))] }, qm(13)] },
            { type: "num", cells: ["১২", "?", "২২", "?"] },
          ] },
        ] },
        { ex: "৩", mark: "kaj", text: "ডট কাগজে সমবাহু ত্রিভুজ ও সমদ্বিবাহু ত্রিভুজ ব্যবহার করে প্যাটার্ন তৈরি করা হয়েছে। এবার বর্গ, আয়ত, সামান্তরিক, রম্বস, ট্রাপিজিয়াম দিয়ে ইচ্ছেমতো প্যাটার্ন তৈরি করি।", body: [
          { kind: "p011_tab", tone: "yellow", cols: ["33.3%", "33.3%", "33.4%"], rows: [
            { type: "pic", cells: [
              { c: [geo(DOTW, 19, [{ tritile: [1.4, 0.4, 9, 4, 5.2, 5.2 * sin(60)], trim: true }]), line("সমবাহু ত্রিভুজের প্যাটার্ন", { size: 10.5, center: true })] },
              { c: [geo(DOTW, 19, [{ tritile: [2.6, 0.4, 6, 2, 7.4, 9.2], trim: true }]), line("সমদ্বিবাহু ত্রিভুজের প্যাটার্ন", { size: 10.5, center: true })] },
              { c: [dotPaper()] }] },
            { type: "pic", cells: [{ c: [dotPaper()] }, { c: [dotPaper()] }, { c: [dotPaper()] }] },
            { type: "pic", cells: [{ c: [dotPaper()] }, { c: [dotPaper()] }, { c: [dotPaper()] }] },
          ] },
        ] },
      ],
    },
    // ── 168 ── নিজে করি
    {
      page: 168,
      fitMin: 0.78, // (its three games' QRs need the room: 24 Nov)
      dense: true,
      allow: ["কাঁটা"], // (২) "…মিনিটের কাঁটা কত ডিগ্রি…": checked by eye; the OCR misreads it
      blocks: [
        { practise: "নিজে করি" },
        { ex: "১", mark: "nije", text: "সঠিক উত্তরটিতে টিক (√) চিহ্ন দিই।", body: [
          { col: [{ kind: "c3p133_mcq", n: "(১)", q: "সরল কোণের উদাহরণ কোনটি?" }, { kind: "c4p157_opts", items: [{ l: "ক)", b: scissors() }, { l: "খ)", b: sunrise() }, { l: "গ)", b: zee() }, { l: "ঘ)", b: eff() }], tpl: "32mm 36mm 36mm 40mm" }], gap: 0.6 },
          { col: [{ kind: "c3p133_mcq", n: "(২)", q: "বিকাল ৩টার সময় ঘড়ির ঘণ্টা ও মিনিটের কাঁটা কত ডিগ্রি কোণ উৎপন্ন করে?" }, { kind: "c4p157_opts", items: [{ l: "ক)", b: "৪৫°" }, { l: "খ)", b: "৬০°" }, { l: "গ)", b: "৭৫°" }, { l: "ঘ)", b: "৯০°" }], tpl: "32mm 36mm 36mm 40mm" }], gap: 0.6 },
          { col: [{ kind: "c3p133_mcq", n: "(৩)", q: "কোন ত্রিভুজের সবগুলো কোণ সমান?" }, { kind: "c4p157_opts", items: [{ l: "ক)", b: "সমকোণী ত্রিভুজ" }, { l: "খ)", b: "সূক্ষ্মকোণী ত্রিভুজ" }, { l: "গ)", b: "সমবাহু ত্রিভুজ" }, { l: "ঘ)", b: "সমদ্বিবাহু ত্রিভুজ" }], tpl: "auto auto auto auto", cgap: 5, indent: 2 }], gap: 0.6 },
          { col: [{ kind: "c3p133_mcq", n: "(৪)", q: "নিচের কোনটি বর্গ?" }, { kind: "c4p157_opts", items: [
            { l: "ক)", b: quad([[0.5, 0.5], [17, 0.5], [17, 9.5], [0.5, 9.5]], 18) },
            { l: "খ)", b: quad([[4.5, 0.5], [24, 0.5], [19.5, 9.5], [0.5, 9.5]], 25) },
            { l: "গ)", b: quad([[0.5, 0.5], [9.5, 0.5], [9.5, 9.5], [0.5, 9.5]], 10) },
            { l: "ঘ)", b: quad([[0.5 + RH * cos(70), 0.5], [0.5 + RH * cos(70) + RH, 0.5], [0.5 + RH, 0.5 + RH * sin(70)], [0.5, 0.5 + RH * sin(70)]], 11) },
          ], tpl: "32mm 36mm 36mm 40mm" }], gap: 0.6 },
          { col: [{ kind: "c3p133_mcq", n: "(৫)", q: "ত্রিকোণী সেট ব্যবহার করে নিচের কোনটি আঁকা যায়?" }, { kind: "c4p157_opts", items: [{ l: "ক)", b: "বৃত্ত" }, { l: "খ)", b: "অর্ধবৃত্ত" }, { l: "গ)", b: "বক্ররেখা" }, { l: "ঘ)", b: "সমান্তরাল রেখা" }], tpl: "32mm 36mm 36mm 40mm" }], gap: 0.6 },
        ] },
        { ex: "২", mark: "nije", text: "নিচে উল্লেখিত কোণগুলো চাঁদার সাহায্যে আঁকি এবং নাম লিখি।", body: [
          { kind: "c4p157_opts", items: [{ l: "(ক)", b: "২৫°" }, { l: "(খ)", b: "৭৫°" }, { l: "(গ)", b: "৯০°" }, { l: "(ঘ)", b: "১২০°" }], tpl: "32mm 36mm 36mm 40mm" },
        ] },
        { ex: "৩", mark: "nije", text: "লম্ব ও সমান্তরাল রেখা কী তা কথায় ও চিত্র এঁকে প্রকাশ করি।" },
        { ex: "৪", mark: "nije", text: "নিচের ত্রিভুজগুলো আঁকি।", body: [geo(158, 36, draw168())] },
        { row: [
          { ex: "৫", mark: "nije", text: "৩ সেমি ও ৪ সেমি বাহুবিশিষ্ট একটি আয়ত আঁকি।" },
          { ex: "৬", mark: "nije", text: "৪ সেমি বাহুবিশিষ্ট একটি বর্গ আঁকি।" },
        ], gap: 3, align: "stretch" },
        { ex: "৭", mark: "nije", text: "নিচের আকৃতিগুলো ব্যবহার করে প্যাটার্ন তৈরি করি।", body: [
          geo(130, 15, [{ poly: [[2, 1], [2, 14], [12, 14]], fill: "#FCE7F3", stroke: "#BE185D", sw: 0.5 }, { poly: [[22, 14], [29.5, 1], [37, 14]], fill: "#DCFCE7", stroke: "#15803D", sw: 0.5 },
            { circle: [53, 7.5, 6.5], fill: "#FEF3C7", stroke: "#B45309", sw: 0.5 }, { rect: [69, 1, 13, 13], fill: "#E0F2FE", stroke: "#0369A1", sw: 0.5 }, { rect: [90, 1, 25, 13], fill: "#EDE9FE", stroke: "#6D28D9", sw: 0.5 }]),
        ] },
      ],
    },
  ],
};
