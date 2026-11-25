// অধ্যায় ৯ · জ্যামিতি, its second part: printed pages 159–170 (PDF pages 166–177), every word as printed. Written by a
// helper (25 Nov 2026).
// বৃত্ত (159–162): round things, drawing a curve with a pin, a pencil and a strip of card, the circle and its centre,
// its parts (radius, arc, chord, diameter), filling in the blanks, drawing a 3 cm circle with a compass (four steps),
// designs made of circles, the CDs in a box; দেখি পারি কি না (163); জ্যামিতিক প্যাটার্ন (164–165): tilings and two
// star designs, dot paper; ঘনবস্তু (166–168): cube, sphere, cylinder, cone, the views from above and from the side,
// patterns of solids; নিজে করি (169–170).
// Every circle, tiling, design, ruler, compass, CD, plate and solid is drawn by code (content/p159-170.parts.js,
// c5p159_fig), true to the book's numbers: the circles are true circles; the CDs touch each other and the box's ends
// (3 in 36 সেমি), the 5 plates likewise, p169's five circles touch (each centre-to-centre segment is two radii); p161's
// ruler, compass opening and circle share one scale (1 সেমি = 4.6 mm), so the circle's radius is the 3 সেমি set on the ruler.
// The book's drawings put right (no words change):
//   - p163 ২: the parallelogram is printed with sides 4 and 6 সেমি and a 70° angle, but drawn about 77° with its sides
//     1 : 1.95; it is drawn here to its printed measures (6 : 4, 70°).
//   - p163 ৪: the book's ক is a rhombus (all four sides 15.4–15.6 mm) and ঘ a square (18.9 × 19 mm): drawn exact.
//   - p164: the tilings are drawn as true tilings of congruent tiles, measured on the book's page.
//   - p165: the two star designs are drawn by their geometry: 8 rhombi round the centre with 8 squares on them (the
//     outline is two crossed squares), and a regular octagon cut into 8 kites and 8 triangles.
// No words needed fixing. Flagged, kept as printed (the pages' flags): ঘনক used for every box shape, a brick among its
// examples (pp166–167, 170); p167 কাজ ৩'s views (three solids look like a circle from above, nothing like a triangle).
// The speakers' faces follow the book's poses (hand out: talk; finger on chin: think) and its sides.
// Pictures: the round and solid things are ChatGPT stickers (PICTURE-PROMPTS-p159-170.md); p159's hands drawing a curve is a
// scene (stand-in cut from the book). Own kinds: c5p159_fig, c5p159_blanks, c5p159_exh, c5p159_lines, c5p159_stk.
// Reused kinds: c4p157_geo (dot paper, squared paper), c4p157_bullets, c4p157_fill, c4p143_x (∠), p011_tab, p011_chat,
// p011_lines; the core's clock.
const say = (who, mood, text, side) => ({ say: who, mood, text, ...(side ? { side } : {}) });
const chat = (...lines) => ({ kind: "p011_chat", lines });
const fig = (w, h, items, o = {}) => ({ kind: "c5p159_fig", w, h, items, ...o });
const stk = (name, w, h, emoji) => ({ kind: "c5p159_stk", name, w, h, emoji });
const lines = (items, o = {}) => ({ kind: "c5p159_lines", items, ...o });
const T = (t, at, o = {}) => ({ t, at, fs: 3.6, ...o });
const cos = (d) => Math.cos((d * Math.PI) / 180), sin = (d) => Math.sin((d * Math.PI) / 180);
const go = (p, a, r) => [p[0] + r * cos(a), p[1] - r * sin(a)];
const add = (p, dx, dy) => [p[0] + dx, p[1] + dy];
const INK = "#1E2433";
const hd = (cells) => ({ type: "hd", cells });
const L = (c) => ({ c, align: "left" });
// a writing line of n underscores (the markup's dashed line)
const W = (n = 15) => "_".repeat(n);

// ── p159: the pin, the strip of card and the pencil (the book's left panel) ──
function stripPanel() {
  const P = [16, 19.4], R = 37, a = -34, wid = 9.4;
  const strip = (ang) => { const u = [cos(ang), -sin(ang)], v = [sin(ang), cos(ang)], A = (s, t) => [P[0] + s * u[0] + t * v[0], P[1] + s * u[1] + t * v[1]];
    return [A(-7, -wid / 2), A(R + 6, -wid / 2), A(R + 6, wid / 2), A(-7, wid / 2)]; };
  const hole2 = go(P, a, R), hole0 = go(P, 0, R);
  return [
    T("আয়তাকার কাগজ", [5, 5.5], { anchor: "start", fs: 3.5 }),
    { poly: strip(0), fill: "none", stroke: "#475569", sw: 0.3, dash: "0.7 0.6" },
    { poly: strip(a), fill: "#FFFFFF", stroke: INK, sw: 0.35 },
    { arc: [P[0], P[1], R, 0, -50], sw: 0.45 }, { arrow: [go(P, -50, R), go(P, -56, R)], head: 2 },
    { dot: hole0, r: 0.9 }, { dot: hole2, r: 0.9 }, { dot: P, r: 0.9 },
    { pencil: hole2, ang: 180 + a, len: 21, wid: 2.4, color: "#EF4444" },
    { pin: P, s: 1.05 },
    T("পিন", [11, 30], { fs: 3.5 }), T("পেনসিল", [21, 45], { fs: 3.5 }),
  ];
}
// the blue strip with its two holes (the book's right panel, beside the hands)
function blueStrip() {
  const C = [11, 11], a = -30, L2 = 10, w = 3.6, u = [cos(a), -sin(a)], v = [sin(a), cos(a)];
  const A = (s, t) => [C[0] + s * u[0] + t * v[0], C[1] + s * u[1] + t * v[1]];
  return [
    { poly: [A(-L2, -w), A(L2, -w), A(L2, w), A(-L2, w)], fill: "#7FB2E5", stroke: "#3B6FA8", sw: 0.3 },
    { circle: [...A(-L2 + 2.6, 0), 0.9], fill: "#fff", stroke: "#3B6FA8", sw: 0.25 }, { circle: [...A(L2 - 2.6, 0), 0.9], fill: "#fff", stroke: "#3B6FA8", sw: 0.25 },
    { line: [[6, 1.5], [12, 1.5]], sw: 0.3, dash: "1.4 0.9" }, { line: [[8, 21], [15, 21]], sw: 0.3, dash: "1.4 0.9" },
  ];
}

// ── p160: the circle and its centre; চিত্র ক with its parts ──
function circleK() {
  const O = [32, 30], R = 26, D1 = go(O, 126, R), D2 = go(O, -54, R), C1 = go(O, 65.5, R), C2 = go(O, -26.4, R);
  return [
    { circle: [O[0], O[1], R], sw: 0.75 },
    { arc: [O[0], O[1], R, -26.4, 65.5], stroke: "#E11D48", sw: 1 },
    { line: [O, go(O, 180, R)], sw: 0.45 }, { line: [D1, D2], sw: 0.45 }, { line: [C1, C2], sw: 0.45 },
    { bow: [D1, D2, 5], sw: 0.35 }, { dot: O, r: 0.8 },
    T("ব্যাস", [27.5, 11.5], { fs: 3.1 }),
    T("ব্যাসার্ধ", [16, 20.5], { fs: 3.1 }), { arrow: [[17, 22.5], [18.4, 29.3]], head: 1.4, sw: 0.3 },
    T("কেন্দ্র", [27.5, 39.5], { fs: 3.1 }), { arrow: [[28.8, 37.2], [31.4, 31.2]], head: 1.4, sw: 0.3 },
    T("জ্যা", [44.5, 27.5], { fs: 3.1 }), { arrow: [[45.4, 25.3], [47.3, 20.9]], head: 1.4, sw: 0.3 },
    T("বৃত্তচাপ", [56, 4.2], { fs: 3.1 }), { arrow: [[56.6, 6.4], [53.6, 13.2]], head: 1.4, sw: 0.3 },
    T("চিত্র: ক", [32, 60.5], { fs: 3.3 }),
  ];
}

// ── p161: the four steps of drawing a 3 cm circle with a compass ──
const CM = 4.6;                                   // mm a সেমি in the drawing (the ruler, the opening, the circle)
function compassSteps() {
  const r = 3 * CM, Z = [70, 40], n3 = [64, 93], c4 = [149, 62], c5 = [149, 92];
  return [
    { scale: Z, cm: CM, n: 10, wid: 7 },
    { compass: { n: Z, p: add(Z, r, 0), leg: 28 } },
    { carrow: [[27, 23.5], [29, 40], [67.6, 39.6]], head: 1.9, sw: 0.35 },
    { carrow: [[143, 17.5], [144, 40], [85.6, 39.6]], head: 1.9, sw: 0.35 },
    { dot: n3, r: 0.8 }, { arc: [n3[0], n3[1], r, 2, -42], sw: 0.4 },
    { compass: { n: n3, p: add(n3, r, 0), leg: 28 } },
    { carrow: [[24, 76.5], [28, 94], [62, 93.2]], head: 1.9, sw: 0.35 },
    { circle: [c4[0], c4[1], r], sw: 0.45 }, { dot: c4, r: 0.8 },
    { compass: { n: c4, p: go(c4, 152, r), leg: 28, flip: true } },
    { carrow: [[121, 50], [127, 40.5], [134.5, 46.5]], head: 1.9, sw: 0.35 },
    { circle: [c5[0], c5[1], r], sw: 0.45 }, { dot: c5, r: 0.8 },
    { carrow: [[111, 93], [113, 103.5], [133.6, 99]], head: 1.9, sw: 0.35 },
  ];
}
const STEPS = [
  { x: 1, y: 3, w: 52, text: "১. কম্পাসের কাঁটা স্কেলের ০-⁠এর স্থানে ধরি এবং খেয়াল রাখি যেন কাঁটাটি সরে না যায়।" },
  { x: 120, y: 3, w: 47, text: "২. কম্পাসের পেনসিলটি স্কেলের ৩ সেমি-⁠এর স্থানে ধরি।" },
  { x: 1, y: 56, w: 50, text: "৩. একটি বৃত্তের কেন্দ্র নির্ধারণ করি এবং কম্পাসের কাঁটাটি সেখানে রাখি।" },
  { x: 86, y: 51, w: 41, text: "৪. কেন্দ্রের চারপাশ দিয়ে পেনসিলটি ঘুরিয়ে আনি। খেয়াল রাখতে হবে যেন কেন্দ্র থেকে কাঁটাটি সরে না যায় এবং কেন্দ্র থেকে পেনসিলের দূরত্ব পরিবর্তন না হয়।" },
];

// ── p162: the face made of circles, the six-petal design, the CDs ──
function faceTile() {
  const k = 1.3, S = (v) => v * k, cx = S(18), sw = 0.75;
  return [
    { rect: [0.4, 0.4, S(36), S(32.6)], rx: 5, fill: "#FCEFC4", stroke: INK, sw: 0.35 },
    { circle: [cx, S(16.3), S(13.6)], fill: "#FFF7DD", sw },
    { circle: [cx - S(6), S(11.8), S(3.9)], fill: "#fff", sw }, { circle: [cx - S(5.9), S(12.7), S(2.2)], fill: "#BAE6FD", sw },
    { circle: [cx + S(6), S(11.8), S(3.9)], fill: "#fff", sw }, { circle: [cx + S(6.1), S(12.7), S(2.2)], fill: "#BAE6FD", sw },
    { circle: [cx, S(16.8), S(2.2)], fill: "#FDBA74", sw }, { circle: [cx, S(23.9), S(3.9)], fill: "#FDA4AF", sw },
  ];
}
// the seed of life: a centre circle and six round it (each through the centre), in a circle twice as big
function sixPetals() {
  const r = 10.6, O = [22, 22], petal = [];
  for (let i = 0; i < 6; i++) petal.push({ circle: [...go(O, 90 + 60 * i, r), r], sw: 0.5, fill: i % 2 ? "#FCE7F333" : "#E0F2FE33" });
  return [{ circle: [O[0], O[1], 2 * r], fill: "#FFFBEB", sw: 0.55 }, ...petal, { circle: [O[0], O[1], r], sw: 0.5 }];
}
function cds() {
  const r = 18.6, x0 = 3, y0 = 11, items = [
    { rect: [x0, y0, 6 * r + 0.8, 2 * r + 1.2], fill: "#FAFAFA", stroke: INK, sw: 0.6 },
    { arrow: [[x0 + 3 * r + 0.4, 6], [x0, 6]], head: 1.8, sw: 0.3 }, { arrow: [[x0 + 3 * r + 0.4, 6], [x0 + 6 * r + 0.8, 6]], head: 1.8, sw: 0.3 },
    { line: [[x0 + 2, 6], [x0 + 6 * r - 1.2, 6]], stroke: "#fff", sw: 0.6 }, { line: [[x0 + 2, 6], [x0 + 6 * r - 1.2, 6]], sw: 0.3, dash: "1 0.8" },
    { rect: [x0 + 3 * r - 9, 2.6, 18.8, 6.8], fill: "#fff", stroke: "none" }, T("৩৬ সেমি", [x0 + 3 * r + 0.4, 5.6], { fs: 3.8 }),
  ];
  for (let i = 0; i < 3; i++) items.push({ cd: [x0 + 0.4 + r + 2 * r * i, y0 + 0.6 + r, r] });
  return items;
}

// ── p163: the review's drawings ──
const PINK = { fill: "#F9CCDF", stroke: INK }, SKY = { fill: "#BDE5F8", stroke: INK };
function shapes163() {
  // the trapezium (top 24, bottom 53, height 19) and the parallelogram (33.8 wide, leaning 9.6, height 18.5), as printed
  const trap = [[16 + 9.3, 1.5], [16 + 32, 1.5], [16 + 50, 19.5], [16, 19.5]], par = [[96 + 9.1, 1.5], [96 + 41.2, 1.5], [96 + 32.1, 19], [96, 19]];
  return [{ poly: trap, ...PINK, sw: 0.9 }, { poly: par, ...SKY, sw: 0.9 }];
}
// the parallelogram কখগঘ drawn to its printed measures: খগ = ৬ সেমি, খক = ৪ সেমি, ∠খ = ৭০° (1 সেমি = 7 mm)
function para163() {
  const u = 6.6, B = [6, 31.4], C = [B[0] + 6 * u, B[1]], A = go(B, 70, 4 * u), D = [A[0] + 6 * u, A[1]];
  return [
    { poly: [A, B, C, D], fill: "#FEF9C3", stroke: INK, sw: 0.5 },
    { arc: [B[0], B[1], 4.2, 0, 70], sw: 0.4 }, { arc: [A[0], A[1], 3.6, 250, 360], sw: 0.4 }, { arc: [D[0], D[1], 3.6, 180, 250], sw: 0.4 },
    T("ক", add(A, -1.6, -2.4), { fs: 3.3 }), T("খ", add(B, -1.6, 2.6), { fs: 3.3 }), T("গ", add(C, 1.6, 2.6), { fs: 3.3 }), T("ঘ", add(D, 1.6, -2.4), { fs: 3.3 }),
    T("৪ সেমি", go(go(B, 70, 2 * u), 160, 3), { fs: 3, rot: 70 }), T("৬ সেমি", [B[0] + 3 * u + 3, B[1] - 2.4], { fs: 3 }),
    T("৭০°", go(B, 35, 7.6), { fs: 2.9 }),
  ];
}
// the T: rectangle কজছখ over rectangle গচঙঘ
function tee163() {
  const x = 6, y = 5, w = 44, h = 10.4, sx = x + 15.3, sw = 12.6, sh = 18.7;
  return [
    { rect: [x, y, w, h], fill: "#EAB8BC", stroke: INK, sw: 0.5 }, { rect: [sx, y + h, sw, sh], fill: "#B7CFE6", stroke: INK, sw: 0.5 },
    T("ক", [x - 2.4, y - 0.6], { fs: 3.2 }), T("জ", [x + w + 2.4, y + 0.6], { fs: 3.2 }),
    T("খ", [x - 2.4, y + h + 3.2], { fs: 3.2 }), T("গ", [sx - 3.4, y + h + 3.2], { fs: 3.2 }), T("চ", [sx + sw + 3, y + h + 3.2], { fs: 3.2 }), T("ছ", [x + w + 0.4, y + h + 4], { fs: 3.2 }),
    T("ঘ", [sx - 2.6, y + h + sh - 1.4], { fs: 3.2 }), T("ঙ", [sx + sw + 2.6, y + h + sh - 1.4], { fs: 3.2 }),
  ];
}
// the five quadrilaterals: ক a rhombus, খ a rectangle, গ a trapezium, ঘ a square, ঙ a parallelogram
function quads163() {
  const k = 1.06, P = (pts) => pts.map(([a, b]) => [a * k + 0.5, b * k + 0.5]);
  const s = 15.5, off = s * cos(77), ht = s * sin(77);
  const items = [
    [P([[1 + off, 4.4], [1 + off + s, 4.4], [1 + s, 4.4 + ht], [1, 4.4 + ht]]), "#F7BCC7", "ক"],
    [P([[23.2, 0.7], [35.7, 0.7], [35.7, 19.7], [23.2, 19.7]]), "#C4E3C2", "খ"],
    [P([[42.2, 5.4], [48.5, 5.4], [54.8, 19.8], [39, 19.8]]), "#F6F29E", "গ"],
    [P([[4.2, 24.5], [23.2, 24.5], [23.2, 43.5], [4.2, 43.5]]), "#C1B6DC", "ঘ"],
    [P([[32.3, 29.2], [54.8, 29.2], [51.7, 38.9], [29.2, 38.9]]), "#FAC9D9", "ঙ"],
  ];
  return items.flatMap(([pts, fill, l]) => {
    const c = [pts.reduce((a, p) => a + p[0], 0) / 4, pts.reduce((a, p) => a + p[1], 0) / 4];
    return [{ poly: pts, fill, stroke: INK, sw: 0.45 }, T(l, c, { fs: 3.4 })];
  });
}

// ── p164: the five tilings ──
function chess(x, y, n, s) {
  const items = [{ rect: [x, y, n * s, n * s], fill: "#fff", stroke: INK, sw: 0.7 }];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if ((r + c) % 2) items.push({ rect: [x + c * s, y + r * s, s, s], fill: "#23272B", stroke: "none" });
  return items;
}
// parallelograms leaning right as they go down, in two colours taking turns
function paraTiles(x, y, cols, rows, w, h, lean) {
  const items = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const X = x + c * w + r * lean, Y = y + r * h;
    items.push({ poly: [[X, Y], [X + w, Y], [X + w + lean, Y + h], [X + lean, Y + h]], fill: (r + c) % 2 ? "#A9A0CC" : "#FDAA5E", stroke: INK, sw: 0.3 });
  }
  return items;
}
// rhombi with their long diagonal across: pink rows, and lilac rows between them
function rhombTiles(x, y, w, h) {
  const items = [], rh = (cx, cy, fill) => items.push({ poly: [[cx - w / 2, cy], [cx, cy - h / 2], [cx + w / 2, cy], [cx, cy + h / 2]], fill, stroke: INK, sw: 0.3 });
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) rh(x + w + c * w, y + h + r * h, "#B6B0D8");
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) rh(x + w / 2 + c * w, y + h / 2 + r * h, "#F39FC2");
  return items;
}
// trapezia: short side a, long side b = a + p + q, height h; an upright one leans p to the left and q to the right, the
// next is the same tile turned over; each row starts where the row above it left off (the book's pattern, measured)
function trapTiles(x0, y0, a, p, q, h) {
  const b = a + p + q, items = [];
  const U = (x, Y) => [[x, Y], [x + a, Y], [x + a + q, Y + h], [x - p, Y + h]], I = (x, Y) => [[x, Y], [x + b, Y], [x + b - p, Y + h], [x + q, Y + h]];
  const starts = [[x0, "U"], [x0 - p, "I"], [x0 - p + q, "U"]];
  starts.forEach(([s, first], r) => {
    let x = s, kind = first;
    for (let i = 0; i < 6; i++) {
      items.push({ poly: kind === "U" ? U(x, y0 + r * h) : I(x, y0 + r * h), fill: kind === "U" ? "#FFF4C2" : "#DDEFFC", stroke: INK, sw: 0.3 });
      x += kind === "U" ? a : b; kind = kind === "U" ? "I" : "U";
    }
  });
  return items;
}
// blue triangles pointing down in rows, each row moved on by half a triangle, inside a blue frame
function triTiles(x, y, cols, rows, w, h) {
  const tris = [];
  for (let r = 0; r < rows; r++) for (let c = -1; c <= cols; c++) {
    const X = x + c * w - (r % 2) * (w / 2), Y = y + r * h;
    tris.push({ poly: [[X, Y], [X + w, Y], [X + w / 2, Y + h]], fill: "#4AA6DD", stroke: "none" });
  }
  return [{ rect: [x, y, cols * w, rows * h], fill: "#fff", stroke: "none" }, { group: tris, clip: [x, y, cols * w, rows * h] },
    { rect: [x, y, cols * w, rows * h], fill: "none", stroke: "#2E3A9A", sw: 1 }];
}

// ── p165: the two star designs ──
// 8 rhombi round the centre (edge e), and on each of the 8 directions a square standing on the rhombi, cut by its diagonal
function star165(O, e) {
  const items = [], P = (a, r) => go(O, a, r);
  for (let k = 0; k < 8; k++) {
    const a = 45 * k, A = P(a, e), B = P(a + 45, e), tip = go(A, a + 45, e);
    items.push({ poly: [O, A, tip, B], fill: k % 2 ? "#FBCFE8" : "#FDE68A", stroke: INK, sw: 0.75 });
  }
  for (let k = 0; k < 8; k++) {
    const a = 45 * k, Q = P(a, e), L1 = go(Q, a - 45, e), L2 = go(Q, a + 45, e), far = go(L1, a + 45, e);
    items.push({ poly: [Q, L1, far, L2], fill: "#BAE6FD", stroke: INK, sw: 0.75 }, { line: [Q, far], sw: 0.75 });
  }
  return items;
}
// a regular octagon (corners up, down and to the sides), cut into 8 kites meeting at the centre and 8 triangles on its sides
function octa165(O, R, ri) {
  const items = [], V = (k) => go(O, 90 + 45 * k, R), I = (k) => go(O, 90 + 45 * k + 22.5, ri);
  for (let k = 0; k < 8; k++) items.push({ poly: [V(k), I(k), V(k + 1)], fill: "#DDD6FE", stroke: INK, sw: 0.75 });
  for (let k = 0; k < 8; k++) items.push({ poly: [O, I(k - 1), V(k), I(k)], fill: k % 2 ? "#BBF7D0" : "#FEF3C7", stroke: INK, sw: 0.75 });
  return items;
}
const dotPaper = (w, h, sp) => {
  const cols = Math.floor((w - 1.6 * sp) / sp) + 1, rows = Math.floor((h - 1.6 * sp) / sp) + 1, x = (w - (cols - 1) * sp) / 2, y = (h - (rows - 1) * sp) / 2;
  return { kind: "c4p157_geo", w, h, items: [{ rect: [0, 0, w, h], rx: 2, fill: "#EEF0F4", stroke: "#CBD5E1", sw: 0.3 }, { dots: [x, y, cols, rows, sp], r: 0.32, color: "#334155" }] };
};

// ── pp166–168: the solids ──
// a thick block arrow from A to B (p167's blue arrows)
function blockArrow(A, B, w = 3.4, hw = 7, hl = 5.4, fill = "#1FB3E5") {
  const a = Math.atan2(-(B[1] - A[1]), B[0] - A[0]) * 180 / Math.PI, L = Math.hypot(B[0] - A[0], B[1] - A[1]), S = go(A, a, L - hl);
  return { poly: [go(A, a + 90, w / 2), go(S, a + 90, w / 2), go(S, a + 90, hw / 2), B, go(S, a - 90, hw / 2), go(S, a - 90, w / 2), go(A, a - 90, w / 2)], fill, stroke: "none" };
}
// p167: match the solid to its views from above and from the side
function match167() {
  const items = [], rows = [21, 48, 75, 102], dot = (x, y) => ({ dot: [x, y], r: 1.3, color: "#94A3B8" });
  const tab = (x, w, fill, t) => [{ rect: [x, 0, w, 8], rx: 1.4, fill, stroke: "none" }, T(t, [x + w / 2, 4.1], { fs: 4, weight: 700 })];
  items.push(...tab(1, 32, "#7DD3F0", "উপর থেকে"), ...tab(60, 38, "#F2D675", "ঘনবস্তু"), ...tab(123, 32, "#F28BAE", "পাশ থেকে"));
  const out = { fill: "#fff", stroke: INK, sw: 0.4 };
  const L = 16, Rx = 140, M = 79;
  // from above: a triangle, a circle, a square, a rectangle
  items.push({ poly: [[L, rows[0] - 7.5], [L + 7.5, rows[0] + 7.5], [L - 7.5, rows[0] + 7.5]], ...out });
  items.push({ circle: [L, rows[1], 8], ...out }, { rect: [L - 7.2, rows[2] - 7.2, 14.4, 14.4], ...out }, { rect: [L - 11, rows[3] - 4.6, 22, 9.2], ...out });
  // from the side: a rectangle, a triangle, a square, a circle
  items.push({ rect: [Rx - 5.4, rows[0] - 8, 10.8, 16], ...out }, { poly: [[Rx, rows[1] - 7.5], [Rx + 7.5, rows[1] + 7.5], [Rx - 7.5, rows[1] + 7.5]], ...out });
  items.push({ rect: [Rx - 7.2, rows[2] - 7.2, 14.4, 14.4], ...out }, { circle: [Rx, rows[3], 8], ...out });
  // the solids: a ball, a cylinder, a cone, a cube
  items.push({ sphere: [M, rows[0], 8.2] }, { cyl: [M - 5.6, rows[1] - 8.4, 11.2, 16.8] }, { cone: [M - 8, rows[2] - 8.6, 16, 17.2] }, { cube: [M - 7.6, rows[3] - 9.4, 12.6] });
  for (const y of rows) items.push(dot(L + 15, y), dot(M - 14, y), dot(M + 14, y), dot(Rx - 15, y), T("নাম: ................", [M, y + 13.6], { fs: 3.9 }));
  return items;
}
// the solids in a row: "C" a cube, "S" a ball, "Y" a cylinder (teal), "K" a cone, each in a cell of width cw
function solidRow(seq, cw, h) {
  const items = [];
  seq.split("").forEach((c, i) => {
    const x = i * cw, m = x + cw / 2;
    if (c === "C") items.push({ cube: [m - 5.6, h / 2 - 7, 8.6] });
    if (c === "S") items.push({ sphere: [m, h / 2, 5.6] });
    if (c === "Y") items.push({ cyl: [m - 4.2, h / 2 - 6.4, 8.4, 12.8], look: "teal" });
    if (c === "K") items.push({ cone: [m - 5.6, h / 2 - 6.8, 11.2, 13.6] });
  });
  return items;
}

// ── p169–170 ──
function plates() {
  const r = 15.4, x0 = 2, items = [{ rect: [x0, 1, 10 * r + 1.4, 2 * r + 1.4], fill: "#FFFDF8", stroke: INK, sw: 0.9 }];
  for (let i = 0; i < 5; i++) items.push({ plate: [x0 + 0.7 + r + 2 * r * i, 1.7 + r, r] });
  return items;
}
// five circles of radius r, each touching its neighbours: three above, two below; the red line joins their centres
function rings169() {
  const r = 13, d = 2 * r, x0 = 1 + r, y0 = 1 + r, h = d * sin(60);
  const top = [0, 1, 2].map((i) => [x0 + i * d, y0]), bot = [0, 1].map((i) => [x0 + r + i * d, y0 + h]);
  return [
    ...top.map((c) => ({ circle: [...c, r], sw: 0.75 })), ...bot.map((c) => ({ circle: [...c, r], sw: 0.75 })),
    { line: [top[0], bot[0], top[1], bot[1], top[2]], stroke: "#E11D48", sw: 0.65 },
    T("ক", add(top[0], -1.4, -4.6), { fs: 3.8 }), T("খ", add(top[2], -1.4, -4.6), { fs: 3.8 }),
  ];
}
// p170: squared paper, 9 by 6, with (or without) the design: a circle 6 squares across and four circles half as big inside
function design170(withCircles) {
  const s = 5.9, items = [{ grid: [0.4, 0.4, 9, 6, s], sw: 0.25, stroke: "#475569" }];
  if (withCircles) {
    const O = [0.4 + 4.5 * s, 0.4 + 3 * s], R = 3 * s, r = 1.5 * s;
    items.push({ circle: [...O, R], stroke: INK, sw: 0.55 });
    for (const a of [90, 0, 270, 180]) items.push({ circle: [...go(O, a, r), r], stroke: INK, sw: 0.55 });
  }
  return { kind: "c4p157_geo", w: 9 * s + 0.8, h: 6 * s + 0.8, items };
}

module.exports = {
  pages: [
    // ── 159 ── বৃত্ত: round things; drawing a curve with a pin, a pencil and a strip of card
    {
      page: 159,
      title: "বৃত্ত",
      spread: true,
      blocks: [
        { ask: "নিচের আকৃতিগুলোর নাম কী এবং এই আকৃতিগুলো আমরা কীভাবে আঁকতে পারি?" },
        { row: [
          { objs: { sticker: "football", emoji: "⚽", n: 1, size: 28 } },
          fig(30, 30, [{ circle: [15, 15, 14.4], fill: "#F9E49B", stroke: INK, sw: 0.4 }]),
          { clock: { h: 4, m: 0, size: 29 } },
          chat(say("boy", "talk", "এই আকৃতিগুলোকে গোল আকৃতি বলে।", "right")),
        ], w: [29, 31, 30, 0], gap: 3 },
        say("girl", "talk", "আমরা চুড়ি, বোতলের ছিপি ইত্যাদি ব্যবহার করে গোল আকৃতি আঁকতে পারি।", "left"),
        { ex: "১", mark: "kaj", text: "চুড়ি, কৌটার ঢাকনা, বোতলের ছিপি ইত্যাদি ব্যবহার করে গোল আকৃতি আঁকি।", body: [
          { frame: [{ gap: 40 }], pad: 1 },
        ] },
        { ex: "২", mark: "kaj", text: "একটি পিন, একটি পেনসিল, দুইটি ছোটো ছিদ্রসহ একটি আয়তাকার মোটা কাগজ সংগ্রহ করি এবং নিচের চিত্র অনুযায়ী এগুলো ব্যবহার করে খাতায় একটি বক্ররেখা অঙ্কন করি।", body: [
          { row: [
            { frame: [fig(68, 51, stripPanel())], pad: 1.4 },
            { frame: [{ row: [{ pic: "p159-hands-curve", h: 38, w: 54 }, fig(22, 23, blueStrip())], w: [55, 22], gap: 2, align: "center", justify: "center" }], pad: 1.4 },
          ], w: [74, 0], gap: 3, align: "stretch" },
        ] },
      ],
    },
    // ── 160 ── the circle: centre, circumference; its parts (চিত্র ক)
    {
      page: 160,
      spread: true,
      blocks: [
        chat(
          say("girl", "talk", "আমরা যদি পিনটির চারদিকে একবার পেনসিলটি ঘুরিয়ে আনি, তাহলে কেমন আকৃতি তৈরি করতে পারব?", "left"),
          say("boy", "talk", "একটি বিন্দু ও সুন্দর একটি গোল আকৃতি পাব।", "right"),
        ),
        { row: [
          "এই গোল আকৃতিকে বলা হয় বৃত্ত। যে বক্ররেখা বৃত্তটিকে আবদ্ধ করে রাখে তাকে বলা হয় পরিধি। বৃত্ত একটি আবদ্ধ বক্ররেখা যার প্রত্যেক বিন্দু ভিতরের একটি বিন্দু থেকে সমান দূরে। বৃত্তের ভিতরের এই নির্দিষ্ট বিন্দুটি বৃত্তের কেন্দ্র।",
          fig(46, 42, [{ circle: [23, 21, 20.4], fill: "#FFFDF5", sw: 0.55 }, { dot: [23, 19.6], r: 0.9 }, T("কেন্দ্র", [23, 25.4], { fs: 3.6 })]),
        ], w: [0, 52], gap: 6 },
        { ex: "৩", mark: "kaj", text: "কেন্দ্র থেকে পরিধির প্রতিটি বিন্দুর দূরত্ব কি সমান? কেন? আলোচনা করি।" },
        { frame: [{ row: [
          { col: [
            { note: "বৃত্তের অংশগুলো ডানপাশে দেওয়া আছে।" },
            { kind: "c4p157_bullets", items: ["ব্যাসার্ধ হলো কেন্দ্র থেকে পরিধির দূরত্ব।", "বৃত্তচাপ পরিধির একটি অংশ।", "জ্যা হলো একটি বৃত্তচাপের প্রান্তবিন্দু দুইটির সংযোজক রেখাংশ।", "ব্যাস হলো বৃত্তের কেন্দ্রগামী জ্যা। ব্যাস হলো বৃত্তের বৃহত্তম জ্যা।"] },
          ], gap: 2.4 },
          fig(64, 62.5, circleK()),
        ], w: [0, 66], gap: 4, align: "center" }], pad: 2.4 },
        chat(
          say("girl", "think", "একটি বৃত্তের ব্যাসার্ধ এবং ব্যাসের মধ্যে সম্পর্ক কী?", "right"),
          say("boy", "talk", "বৃত্ত ‘ক’-এর দিকে খেয়াল করলে দেখা যাবে যে, বৃত্তের কেন্দ্র থেকে পরিধি পর্যন্ত দূরত্ব বা ব্যাসার্ধ সব সময় সমান।", "left"),
          say("girl", "think", "খেয়াল করলে আরও দেখা যাবে যে, ব্যাস হলো ব্যাসার্ধের দ্বিগুণ। ব্যাসকে বৃত্তের কেন্দ্রগামী জ্যা বলা হয়। ব্যাস হলো বৃত্তের বৃহত্তম জ্যা।", "right"),
        ),
      ],
    },
    // ── 161 ── fill in the blanks; drawing a 3 cm circle with a compass
    {
      page: 161,
      dense: true,
      spread: true,
      allow: ["অঙ্কন"], // the book prints অঙ্কন (checked by eye at 300 dpi); Tesseract reads it as অঞঙ্কন
      blocks: [
        { ex: "৪", mark: "kaj", text: "বৃত্ত সম্পর্কিত বাক্যের খালি ঘর পূরণ করি।", body: [
          { kind: "c5p159_blanks", bw: 30, items: [
            { n: "১)", text: "কেন্দ্র থেকে পরিধি পর্যন্ত দূরত্ব হলো" },
            { n: "২)", text: "পরিধির একটি অংশ হলো" },
            { n: "৩)", text: "একটি রেখা যা বৃত্তের যেকোনো দুইটি বিন্দু যোগ করে তা হলো" },
            { n: "৪)", text: "জ্যা যদি বৃত্তের কেন্দ্র দিয়ে যায়, তাহলে তাকে বলে" },
            { n: "৫)", text: "যদি ব্যাস ১২ সেমি হয়, তাহলে ব্যাসার্ধ হবে ▭ সেমি।" },
          ] },
        ] },
        { ex: "৫", mark: "kaj", text: "পেনসিল কম্পাস ব্যবহার করে ৩ সেমি ব্যাসার্ধবিশিষ্ট একটি বৃত্ত অঙ্কন করি।", body: [
          chat(
            say("boy", "talk", "প্রদত্ত ব্যাসার্ধ নিয়ে কীভাবে বৃত্ত অঙ্কন করা যায়?", "right"),
            say("girl", "think", "অঙ্কনের ধাপসমূহ লক্ষ করি।", "left"),
          ),
          fig(168, 107, compassSteps(), { boxes: STEPS }),
        ] },
      ],
    },
    // ── 162 ── designs made of circles; অনুশীলন ১–৩
    {
      page: 162,
      spread: true,
      allow: ["অঙ্কন"], // as on p161: Tesseract reads the book's অঙ্কন as অঞঙ্কন (checked by eye)
      blocks: [
        { ex: "৬", mark: "kaj", text: "বৃত্ত দ্বারা নকশা অঙ্কন করি।", body: [
          { row: [
            { col: [chat(say("boy", "talk", "বিভিন্ন ব্যাসার্ধের বৃত্ত দিয়ে আমি মুখের ছবি এঁকেছি।", "left")), fig(47.6, 43.2, faceTile())], gap: 2.4 },
            { col: [chat(say("girl", "think", "আমি বৃত্ত দিয়ে এই সুন্দর নকশাটি বানিয়েছি।", "right")), fig(44, 44, sixPetals())], gap: 2.4 },
          ], gap: 6, align: "flex-start" },
        ] },
        { ex: "১", mark: "anu", text: "নিচের চিত্রের মতো ৩৬ সেমি দৈর্ঘ্যবিশিষ্ট একটি বাক্সে ৩টি সিডি রাখা যায়। ১টি সিডির ব্যাসার্ধ কত?", body: [
          fig(118, 50.5, cds()),
        ] },
        { ex: "২", mark: "anu", text: "নিচের বৃত্তগুলো আঁকি।", body: [
          lines(["(১) ২৫ মিলিমিটার ব্যাসার্ধবিশিষ্ট একটি বৃত্ত।", "(২) ৪৬ মিলিমিটার ব্যাসবিশিষ্ট একটি বৃত্ত।"], { cols: 1 }),
        ] },
        { ex: "৩", mark: "anu", text: "একটি বৃত্তের কেন্দ্রগামী জ্যা’র দৈর্ঘ্য ৬ সেন্টিমিটার।", body: [
          lines(["(১) বৃত্তটি আঁকি।", "(২) অঙ্কিত বৃত্তের তিনটি বৈশিষ্ট্য লিখি।"], { cols: 1 }),
        ] },
      ],
    },
    // ── 163 ── দেখি পারি কি না
    {
      page: 163,
      dense: true,
      allow: ["৭০"], // the figure's ৭০° at খ (printed ৭০◦, checked at 300 dpi): Tesseract misses the small label
      blocks: [
        { review: "দেখি পারি কি না" },
        { ex: "১", text: "নিচের চিত্রের অনুরূপ দুইটি করে চিত্র আঁকি।", body: [fig(150, 21, shapes163())] },
        { ex: "২", text: "ডানপাশের সামান্তরিকের বাহুগুলোর দৈর্ঘ্য এবং কোণগুলো পরিমাপ নির্ণয় করি।", body: [
          { row: [
            { kind: "c4p143_x", b: lines([`(১) কঘ = ${W(7)} সেমি`, `(২) গঘ = ${W(7)}সেমি`, `(৩) ∠ক =${W(7)}°`, `(৪) ∠ঘ =${W(7)}°`], { cols: 1, gap: 1.2 }) },
            fig(60, 35, para163()),
          ], w: [0, 66], gap: 4, align: "center" },
        ] },
        { ex: "৩", text: "ডানপাশের চিত্রের ‘ঘঙ’ বাহু এবং ‘খছ’ বাহুর উপর লম্বগুলো শনাক্ত করে লিখি।", body: [
          { row: [
            lines([`(১) ${W(15)}`, `(২) ${W(15)}`, `(৩) ${W(15)}`, `(৪) ${W(15)}`], { gap: 4 }),
            fig(56, 35, tee163()),
          ], w: [0, 58], gap: 4, align: "center" },
        ] },
        { ex: "৪", text: "নিচে ডানপাশের চতুর্ভুজাকার চিত্র ক, খ, গ, ঘ, ঙ লক্ষ করি এবং নিচের প্রশ্নগুলোর উত্তর দেই।", body: [
          { row: [
            { col: [
              lines(["(১) চতুর্ভুজগুলোর নাম লিখি।"], { cols: 1 }),
              lines([`(ক) ${W(13)}`, `(খ)${W(14)}`, `(গ) ${W(13)}`, `(ঘ)${W(14)}`, `(ঙ) ${W(13)}`], { gap: 1.4 }),
              lines([`(২) কোন কোন চতুর্ভুজের চারটি সমকোণ রয়েছে?${W(12)}`, `(৩) কোন কোন চতুর্ভুজের দুই জোড়া বিপরীত বাহু সমান্তরাল?${W(12)}`], { cols: 1, gap: 1.4 }),
            ], gap: 1.6 },
            fig(59.5, 47.5, quads163()),
          ], w: [0, 64], gap: 3, align: "center" },
        ] },
      ],
    },
    // ── 164 ── জ্যামিতিক প্যাটার্ন: five tilings, their shapes and names
    {
      page: 164,
      title: "জ্যামিতিক প্যাটার্ন",
      spread: true,
      blocks: [
        { ask: "নিচের জ্যামিতিক প্যাটার্নগুলো কী ধরনের আকৃতি দিয়ে তৈরি?" },
        { kind: "p011_tab", tone: "yellow", cols: ["50%", "22%", "28%"], rows: [
          hd(["প্যাটার্ন", "আকৃতির নাম", "প্যাটার্নের নাম"]),
          { type: "pic", cells: [{ c: [fig(43, 43, chess(0.6, 0.6, 8, 5.2))] }, { c: "বর্গ", style: "vertical-align:middle;background:#fff" }, { c: "বর্গাকৃতি প্যাটার্ন", style: "vertical-align:middle;background:#fff" }] },
          { type: "pic", cells: [{ c: [fig(62.2, 26.6, paraTiles(0.5, 0.5, 5, 3, 10.2, 8.6, 3.4))] }, "", ""] },
          { type: "pic", cells: [{ c: [fig(67, 26, rhombTiles(0.6, 0.4, 14.6, 8.4))] }, "", ""] },
          { type: "pic", cells: [{ c: [fig(69, 23, trapTiles(4.6, 0.4, 4.2, 4, 7.8, 7.3))] }, "", ""] },
          { type: "pic", cells: [{ c: [fig(53.6, 32.4, triTiles(0.8, 0.6, 6, 6, 8.6, 5.2))] }, "", ""] },
        ] },
      ],
    },
    // ── 165 ── two star designs to copy; dot paper; patterns around us
    {
      page: 165,
      allow: ["ফাঁকা"], // "পাশের ফাঁকা ঘরে" (checked by eye at 300 dpi): Tesseract garbles the word
      blocks: [
        { ex: "১", mark: "kaj", text: "নিচের জ্যামিতিক প্যাটার্নগুলো লক্ষ করি এবং পাশের ফাঁকা ঘরে অনুরূপ প্যাটার্ন আঁকি।", body: [
          { kind: "p011_tab", tone: "yellow", cols: ["50%", "50%"], rows: [
            { type: "pic", cells: [{ c: [fig(41, 41, star165([20.5, 20.5], 8.3))], style: "vertical-align:middle" }, { c: "", style: "background:#fff" }], h: 44 },
            { type: "pic", cells: [{ c: [fig(41, 41, octa165([20.5, 20.5], 19.6, 12.2))], style: "vertical-align:middle" }, { c: "", style: "background:#fff" }], h: 44 },
          ] },
        ] },
        { ex: "১", mark: "anu", text: "নিচের ডট-কাগজে ইচ্ছেমতো জ্যামিতিক প্যাটার্ন তৈরি করি।", body: [dotPaper(160, 40, 4.4)] },
        { ex: "২", mark: "anu", text: "আমাদের আশপাশে বিভিন্ন বস্তুর জ্যামিতিক আকৃতির প্যাটার্ন খুঁজে বের করি ও নিচের ছকটি পূরণ করি।", body: [
          { table: { head: ["বস্তুর নাম", "প্যাটার্ন"], rows: [["", ""], ["", ""], ["", ""]], tone: "yellow" } },
        ] },
      ],
    },
    // ── 166 ── ঘনবস্তু: things of many shapes; the cube, the sphere, the cylinder, the cone
    {
      page: 166,
      title: "ঘনবস্তু",
      dense: true,
      flags: ["ঘনক (a cube) is used for every box shape: the table's first example is ইট (a brick, a cuboid), p167's bubbles call a cuboid ঘনক ('its six faces may be rectangles or squares') and p170 ৫ gives ঘনক the views আয়ত/বর্গ; kept as printed (strictly, a brick is a cuboid, আয়তাকার ঘনবস্তু)"],
      allow: ["নাম"], // the table head "ঘনবস্তুর নাম" (checked by eye): Tesseract skips the word on the pink head
      blocks: [
        { ask: "পরিবেশে আমরা কি কি ঘনবস্তু দেখতে পাই তা খুঁজে বের করি। সবগুলোর আকৃতি কী একই রকম?" },
        chat(
          say("boy", "talk", "বই, বল, কলম, গ্লাস, ইট, মার্বেল, তরমুজ, বেলুন, আইসক্রিম ইত্যাদি।", "right"),
          say("girl", "think", "আকৃতিগুলোর মধ্যে ভিন্নতা রয়েছে।", "left"),
        ),
        { ex: "১", mark: "kaj", text: "নিচের ঘনবস্তুগুলো দেখি এবং আকৃতি অনুযায়ী ছকটি পূরণ করি।", body: [
          { frame: [
            { row: [stk("book", 25, 16, "📘"), stk("football", 16, 16, "⚽"), stk("watermelon", 15, 17, "🍉"), stk("brick", 25, 13, "🧱"), stk("glass", 12, 18, "🥛"), stk("ice-cream-cone", 11, 19, "🍦")],
              w: [25, 16, 15, 25, 12, 11], justify: "space-around", align: "flex-end", gap: 2 },
            { row: [stk("marble", 12, 12, "🔮"), stk("dice", 14, 14, "🎲"), stk("traffic-cone", 12, 16, "🚧"), stk("funnel", 12, 14, "🔻"), stk("rolling-pin", 26, 8, "🥖"), stk("food-cover", 18, 14, "🧺"), stk("mug", 14, 12, "☕"), stk("globe", 14, 14, "🌍")],
              w: [12, 14, 12, 12, 26, 18, 14, 14], justify: "space-around", align: "flex-end", gap: 2 },
          ], pad: 2 },
          { kind: "p011_tab", tone: "yellow", cols: ["22%", "18%", "60%"], rows: [
            hd([{ c: "বস্তুর আকৃতি", style: "background:#0EA5C6" }, { c: "ঘনবস্তুর নাম", style: "background:#DB2777" }, { c: "উদাহরণ লিখি", style: "background:#CA8A04" }]),
            { cells: [{ c: [fig(18, 18, [{ cube: [0.8, 0.8, 12.8] }])] }, "ঘনক", L(`ইট, ${W(8)}, ${W(8)}, ${W(8)}`)], h: 18.4 },
            { cells: [{ c: [fig(18, 18, [{ sphere: [9, 9, 8.4] }])] }, "গোলক", L(`ফুটবল, ${W(8)}, ${W(8)}, ${W(8)}`)], h: 18.4 },
            { cells: [{ c: [fig(13, 19, [{ cyl: [1, 0.6, 11, 17.8] }])] }, "বেলন", L(`গ্লাস, ${W(8)}, ${W(8)}, ${W(8)}`)], h: 18.4 },
            { cells: [{ c: [fig(19, 18, [{ cone: [0.6, 0.4, 17.8, 17.4] }])] }, "কোণক", L(`আইসক্রিম, ${W(8)}, ${W(8)}, ${W(8)}`)], h: 18.4 },
          ] },
        ] },
        { ex: "১", mark: "anu", text: "আমাদের চারিদিকের ঘনবস্তু তথা ঘনক, গোলক, বেলন ও কোণকের আরও কিছু উদাহরণ খুঁজে বের করে খাতায় লিখি।" },
      ],
    },
    // ── 167 ── the faces of a solid; matching the views from above and from the side
    {
      page: 167,
      dense: true,
      flags: ["কাজ ৩: from above, the ball, the cylinder and the cone all look like a circle and nothing looks like a triangle, but the উপর থেকে column has one circle and a triangle; kept as printed (a line can join one shape to several solids; the triangle matches none)"],
      allow: ["৩"], // the number in কাজ ৩'s triangle (checked by eye): Tesseract does not read it
      blocks: [
        { ex: "২", mark: "kaj", text: "ঘনবস্তুসমূহ দেখতে কেমন বা এর বৈশিষ্ট্য কী তা খুঁজে বের করি এবং আলোচনা করি।", body: [
          fig(70, 38, [{ cuboid: [14, 11, 42, 11.5, 9.7] }, blockArrow([39, 0.2], [39, 14]), blockArrow([22, 37.6], [30.4, 25.8])]),
          chat(
            say("boy", "talk", "ঘনকের উপরের দিক থেকে আমি চারকোণা/চতুর্ভুজ পৃষ্ঠ দেখতে পাই।", "left"),
            say("girl", "think", "পাশ থেকেও আমি চারকোণা/চতুর্ভুজ পৃষ্ঠ দেখতে পাই। আসলে ঘনকের ছয়টি পৃষ্ঠভাগ বা তল রয়েছে, যা দেখতে আয়তাকার বা বর্গাকার হতে পারে।", "right"),
          ),
        ] },
        { ex: "৩", mark: "kaj", text: "ঘনবস্তুর নাম লিখি এবং উপর ও পাশ থেকে বস্তুটি দেখতে কোন জ্যামিতিক আকৃতির তা রেখা টেনে মিল করি।", body: [
          fig(156, 119, match167()),
        ] },
      ],
    },
    // ── 168 ── patterns made of solids; dot paper
    {
      page: 168,
      dense: true,
      blocks: [
        { ex: "৪", mark: "kaj", text: null, body: [
          { kind: "c5p159_exh", mark: "kaj", n: "৪", text: "ঘনবস্তুগুলো দিয়ে প্যাটার্ন তৈরি করি।", icons: { w: 42, h: 11, items: [
            { cube: [0.4, 1, 7] }, { sphere: [16, 5.6, 4.6] }, { cyl: [22.6, 0.4, 7, 10.4] }, { cone: [31.4, 0.6, 10, 10.2] },
          ] } },
          fig(160.8, 16, solidRow("CSYKCSYKCSYK", 13.4, 16)),
          { row: [fig(53.6, 16, solidRow("CCSS", 13.4, 16)), { kind: "c4p157_fill", text: "" }], w: [56, 0], gap: 3, align: "flex-end" },
          { row: [fig(53.6, 16, solidRow("CCCS", 13.4, 16)), { kind: "c4p157_fill", text: "" }], w: [56, 0], gap: 3, align: "flex-end" },
          { kind: "p011_lines", n: 4, h: 7.8 },
        ] },
        { ex: "২", mark: "anu", text: "নিচের ডট-কাগজে ঘনবস্তু ব্যবহার করে ইচ্ছেমতো প্যাটার্ন তৈরি করি।", body: [dotPaper(160, 102, 4.4)] },
      ],
    },
    // ── 169 ── নিজে করি
    {
      page: 169,
      allow: ["অঙ্কন", "৮০"], // অঙ্কন: Tesseract reads it as অঞঙ্কন; ৮০: the book's "কোণ ৮০°", read as ৮০০ (both checked by eye)
      blocks: [
        { practise: "নিজে করি" },
        { ex: "১", mark: "nije", text: "চিত্র অঙ্কন করি।", body: [
          lines(["(১) দৈর্ঘ্য ৫ সেমি, প্রস্থ ৩ সেমি (আয়ত)", "(২) প্রতিটি বাহুর দৈর্ঘ্য ৪ সেমি (বর্গ)", "(৩) দৈর্ঘ্য ৪ সেমি, প্রস্থ ২.৫ সেমি এবং একটি কোণ ৮০° (সামান্তরিক)", "(৪) একটি সামান্তরিক ও একটি ট্রাপিজিয়াম।", "(৫) পিন, পেনসিল ও দুইটি ছোটো ছিদ্রসহ একটি আয়তাকার মোটা কাগজ ব্যবহার করে একটি বৃত্ত।"], { cols: 1, gap: 1.6 }),
        ] },
        { ex: "২", mark: "nije", text: "নিচের চিত্র অনুযায়ী একটি বাক্সে একই ধরনের ৫টি থালা রাখা হলো। নিচের প্রশ্নগুলোর উত্তর দেই।", body: [
          fig(158.2, 34, plates()),
          lines(["(১) প্রত্যেক থালার ব্যাসার্ধ ১২ সেমি হলে বাক্সের দৈর্ঘ্য কত?", "(২) ২০ সেন্টিমিটার ব্যাসের কয়টি থালা রাখা যাবে এই বাক্সে?"], { cols: 1, gap: 1.6 }),
        ] },
        { ex: "৩", mark: "nije", text: "৫ সেমি ব্যাসার্ধবিশিষ্ট সমান ৫টি বৃত্ত আঁকা আছে। চিত্র অনুযায়ী, কেন্দ্রগুলো যোগ করলে ক থেকে খ পর্যন্ত অঙ্কিত রেখাংশের মোট দৈর্ঘ্য নির্ণয় করি।", body: [
          fig(80, 50.6, rings169()),
        ] },
      ],
    },
    // ── 170 ── নিজে করি (continued)
    {
      page: 170,
      dense: true,
      blocks: [
        { ex: "৪", mark: "nije", text: "কম্পাস ব্যবহার করে বামপাশের নকশাটির মতো ডানে নকশা আঁকি।", body: [
          { row: [design170(true), design170(false)], gap: 16, justify: "center", w: [54, 54] },
        ] },
        { ex: "৫", mark: "nije", text: "নিচের ছকটি পূরণ করি।", body: [
          { kind: "p011_tab", tone: "yellow", cols: ["33%", "33.5%", "33.5%"], rows: [
            hd(["ঘনবস্তুর নাম", "উপর থেকে দেখতে যেমন", "পাশ থেকে দেখতে যেমন"]),
            { cells: ["ঘনক", "আয়ত/বর্গ", "আয়ত/বর্গ"], h: 7.8 }, { cells: ["গোলক", "", ""], h: 7.8 }, { cells: ["বেলন", "", ""], h: 7.8 }, { cells: ["কোণক", "", ""], h: 7.8 },
          ] },
        ] },
        { ex: "৬", mark: "nije", text: "নিচের বাক্যগুলো যাচাই করে সত্য নাকি মিথ্যা তা লিখি। বাক্যটি মিথ্যা হলে সঠিক বাক্য লিখি।", body: [
          { kind: "p011_tab", tone: "yellow", cols: ["51%", "15%", "34%"], rows: [
            hd(["বাক্য", "সত্য/মিথ্যা", "মিথ্যা হলে সঠিক বাক্য"]),
            ...["(১) চতুর্ভুজের বাহুর সংখ্যা তিন", "(২) ট্রাপিজিয়ামের অন্তত এক জোড়া সমান্তরাল বাহু আছে", "(৩) আয়ত এক ধরনের ট্রাপিজিয়াম", "(৪) সামান্তরিক এক ধরনের রম্বস",
              "(৫) সকল রম্বসই বর্গ", "(৬) সকল সামান্তরিকই আয়ত", "(৭) রম্বসের কোনো বাহুই সমান্তরাল নয়", "(৮) সকল রম্বসই ট্রাপিজিয়াম", "(৯) সকল ট্রাপিজিয়ামই সামান্তরিক",
              "(১০) সামান্তরিকের বিপরীত কোণগুলো সমান"].map((t) => ({ cells: [L(t), { c: "", style: "background:#fff" }, { c: "", style: "background:#fff" }], h: 7.8 })),
          ] },
        ] },
      ],
    },
  ],
};
