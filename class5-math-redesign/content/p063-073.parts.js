// Printed pages 63–73's own kinds (prefixed c5p063_, classes c5p063-): chapter ৫ দশমিক ভগ্নাংশ, its first part (tenths,
// hundredths and thousandths, place value, number lines, litres, decimal ↔ fraction, comparing, + and −). Written by a helper,
// 25 Nov 2026. Units: mm. Everything whose amount matters is drawn here, exactly.
//
//   c5p063_grid   A GRID OF CELLS, EVERY CELL DRAWN: the hundredths grid (10 × 10), the tenths strips (10 × 1), and, for chapter ৬
//                 (শতকরা), the percent grids. Reuse it as it is:
//                 { cols = 10, rows = 10, w = 36 (the grid's width, mm), h (mm; default: square cells; a strip grid `rows: 1`
//                   is drawn square, h = w),
//                   n: shade n cells, in `order`: "col" (down each column, then the next column to the right; the default),
//                      "row" (along each row, then the next row down), "col-up" / "row-up" (the same, from the bottom-left up),
//                   fill: their colour (default the chapter's var(--c)),
//                   rects: [[c, r, w, h, colour?], …] shaded blocks; c and r count from 0 at the top-left cell,
//                   cells: [[c, r, colour?], …] single cells,
//                   tl: a label left of the top-left cell (p63's "০.০১"), bl: a label under the first column ("০.১"),
//                   cap: a caption under the grid ("(ক)"), fs: the labels' size (mm), line / border: the line colours,
//                   left: true (sit at the left, not centred) }
//                 Colour names: orange, red, sky, navy, green, pink, purple, yellow (or any CSS colour). Examples:
//                   { kind: "c5p063_grid", n: 35, fill: "sky" }                    35 cells: three columns and five more
//                   { kind: "c5p063_grid", rects: [[0, 0, 4, 10, "red"], [4, 2, 1, 8, "red"]] }   p63's (ক), 48 cells
//                   { kind: "c5p063_grid", cols: 10, rows: 1, n: 1, fill: "orange", bl: "০.১" }      one tenth of a strip square
//   c5p063_flow   p64: 1 → 0.1 → 0.01 → 0.001 (the orange square, the tenths, the hundredths, the thousandths in a magnifier),
//                 the ×10/×100/×1000 arcs above (১০ গুণ …) and the 1/10, 1/100, 1/1000 arcs below (… ভাগ)
//   c5p063_pvt    pp64, 67: the place table স্থানের নাম | একক | • | দশমাংশ (১/১০) | শতাংশ (১/১০০) | সহস্রাংশ (১/১০০০),
//                 its digits and পড়ার নিয়ম: { digits: [5 cells], words: [5 cells] } (left out: empty cells to fill)
//   c5p063_nline  a number line in small steps (pp65–66): { from, to (the first and last tick, in steps), end (the line's end),
//                 unit (mm a step), major = 10, half = 5, labels: { step: text }, arrows: [{ at, text }] (a boxed letter
//                 pointing down at a tick), x0 }
//   c5p063_cyl    pp66–67: 1-litre measuring beakers (10 marks, the 5th longer) and magnifier lenses, each showing its part
//                 of the scale at a true, larger size: { w, h, beakers: [{ x, y, w, h, fill (litres), label, ring: { v, r },
//                 bracket: { a, b, text } }], lenses: [{ cx, cy, r | rx + ry, vc (the value at the centre), k (mm a litre),
//                 sx (the scale line's x from cx), ticks: [[step, len]], labels: [[v, text, dy?]], water, ring: { v, r, dx },
//                 bracket: { a, b, text }, thick }], links: [[x1, y1, r1, x2, y2, r2]] (the red lines from a small ring to a
//                 lens: the circles' outer tangents) }. Litres are given in thousandths (০.৩৫৮ লিটার = 358).
//   c5p063_cmp    pp70–71: the comparison table স্থানের নাম (একক (১) [দশমিক বিন্দু] দশমাংশ (০.১) শতাংশ (০.০১) সহস্রাংশ (০.০০১))
//                 | সংখ্যা: { dot: true, rows: [[cells]], n (empty rows), tone: "a" (p70's colours) | "b" (p71's), w, rh }
//   c5p063_dcol   decimals written in columns (pp72–73), the points one under the other: { rows: [{ t, op, m: "v" | "x",
//                 raw }], ans: { t, m, raw } (orange), blank: true (room under the line), size (pt), wide (the book's spaced
//                 digits, p72) }. raw: the row is set flush right, not by its point (the book's wrong ways, p73).
//   c5p063_dbox   p73: a sum to set out in three empty boxes: { head, op, bw, bh }
//   c5p063_stk    one sticker at a set size, not in a square box (p72's bus): { name, w, h, emoji }
//   c5p063_eqs    lines of working, one under the other, never wrapped: { lines, size (pt), gap, sb (□'s width), bw (▭'s), indent }
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const BEN = "Noto Sans Bengali", BAL = "Baloo Da 2";
const COL = { orange: "#F7931E", red: "#EF2B2D", sky: "#7DD3FC", navy: "#1E4FA8", green: "#4ADE80", pink: "#F472B6", purple: "#A78BFA",
  yellow: "#FDE047", water: "#BAE6FD" };
const col = (c, d) => COL[c] || c || d;
const T = (x, y, s, o = {}) => `<text x="${f2(x)}" y="${f2(y)}" font-family="${o.fam || BAL}" font-weight="${o.w || 700}" font-size="${f2(o.fs || 3.6)}"${o.a ? ` text-anchor="${o.a}"` : ""} fill="${o.fill || INK}"${o.rot != null ? ` transform="rotate(${o.rot} ${f2(x)} ${f2(y)})"` : ""}>${esc(s)}</text>`;
const L = (x1, y1, x2, y2, c = INK, w = 0.3, extra = "") => `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}" stroke="${c}" stroke-width="${w}" fill="none"${extra}/>`;
const head = (x, y, ang, c = INK, s = 1.8) => { // an arrowhead with its tip at (x, y), pointing along ang (degrees, 0 = right)
  const a = ang * Math.PI / 180, p = (d, k) => `${f2(x - s * Math.cos(a) + k * d * Math.sin(a))} ${f2(y - s * Math.sin(a) - k * d * Math.cos(a))}`;
  return `<path d="M${f2(x)} ${f2(y)}L${p(s * .45, 1)}L${p(s * .45, -1)}Z" fill="${c}"/>`;
};
// a fraction drawn in SVG: the top over a bar over the bottom, centred on x; y = the bar
const fracG = (x, y, a, b, fs = 3.2, fill = INK) => {
  const wd = Math.max([...a].length, [...b].length) * fs * .56 + fs * .3;
  return T(x, y - fs * .3, a, { a: "middle", fs, fill }) + L(x - wd / 2, y, x + wd / 2, y, fill, .26) + T(x, y + fs * .9, b, { a: "middle", fs, fill });
};
const svg = (w, h, s, cls = "") => `<svg class="c5p063-svg${cls ? " " + cls : ""}" width="${f2(w)}mm" height="${f2(h)}mm" viewBox="0 0 ${f2(w)} ${f2(h)}">${s}</svg>`;
let UID = 0;

// ── c5p063_grid: a grid of cells, each drawn; shaded by count, by blocks or by single cells ──
function gridSvg(b) {
  const C = b.cols || 10, R = b.rows || 10, W = b.w || 36, H = b.h || (R === 1 ? W : W * R / C), cw = W / C, ch = H / R;
  const fs = b.fs || 3.3, lw = b.tl ? [...b.tl].length * fs * .5 + 1.4 : .4, x0 = lw, y0 = .4;
  const shade = {}; // "c,r" → colour
  const fill = col(b.fill, "var(--c)");
  if (b.n) {
    const order = b.order || "col";
    for (let i = 0; i < b.n; i++) {
      let c, r;
      if (order.startsWith("col")) { c = Math.floor(i / R); r = i % R; } else { r = Math.floor(i / C); c = i % C; }
      if (order.endsWith("-up")) r = R - 1 - r;
      shade[`${c},${r}`] = fill;
    }
  }
  for (const [c, r, w, h, k] of b.rects || []) for (let i = c; i < c + w; i++) for (let j = r; j < r + h; j++) shade[`${i},${j}`] = col(k, fill);
  for (const [c, r, k] of b.cells || []) shade[`${c},${r}`] = col(k, fill);
  let s = `<rect x="${f2(x0)}" y="${f2(y0)}" width="${f2(W)}" height="${f2(H)}" fill="#fff"/>`;
  for (const [key, k] of Object.entries(shade)) { const [c, r] = key.split(",").map(Number); s += `<rect x="${f2(x0 + c * cw)}" y="${f2(y0 + r * ch)}" width="${f2(cw)}" height="${f2(ch)}" fill="${k}"/>`; }
  const line = b.line || "#334155";
  for (let i = 1; i < C; i++) s += L(x0 + i * cw, y0, x0 + i * cw, y0 + H, line, .2);
  for (let j = 1; j < R; j++) s += L(x0, y0 + j * ch, x0 + W, y0 + j * ch, line, .2);
  s += `<rect x="${f2(x0)}" y="${f2(y0)}" width="${f2(W)}" height="${f2(H)}" fill="none" stroke="${b.border || INK}" stroke-width=".4"/>`;
  let bottom = y0 + H + .4;
  if (b.tl) s += T(x0 - .9, y0 + Math.min(ch, 6) * .5 + fs * .36, b.tl, { a: "end", fs });
  if (b.bl) { s += T(x0, bottom + fs * .95, b.bl, { fs }); bottom += fs * 1.2; }
  if (b.cap) { s += T(x0 + W / 2, bottom + fs * 1.15, b.cap, { a: "middle", fs: fs * 1.12, fam: BEN, w: 600 }); bottom += fs * 1.45; }
  return svg(x0 + W + .5, bottom + .3, s);
}

// ── c5p063_flow: p64's 1 → ০.১ → ০.০১ → ০.০০১ with its arcs ──
function flowSvg() {
  const S = 25, xs = [4, 38, 72, 106], yT = 19, yB = yT + S, cell = S / 10, OR = COL.orange;
  const PINK = "#E6007E", BLACK = "#1E2433", BLUE = "#0EA5E9";
  let s = "";
  // the four pictures
  s += `<rect x="${xs[0]}" y="${yT}" width="${S}" height="${S}" fill="${OR}" stroke="${INK}" stroke-width=".45"/>`;
  s += `<rect x="${xs[1]}" y="${yT}" width="${S}" height="${S}" fill="#fff"/><rect x="${xs[1]}" y="${yT}" width="${f2(S / 10)}" height="${S}" fill="${OR}"/>`;
  for (let i = 1; i < 10; i++) s += L(xs[1] + i * S / 10, yT, xs[1] + i * S / 10, yB, INK, .2);
  s += `<rect x="${xs[1]}" y="${yT}" width="${S}" height="${S}" fill="none" stroke="${INK}" stroke-width=".45"/>`;
  for (const k of [2, 3]) {
    const x = xs[k];
    s += `<rect x="${x}" y="${yT}" width="${S}" height="${S}" fill="#fff"/>`;
    if (k === 2) s += `<rect x="${x}" y="${f2(yB - cell)}" width="${f2(cell)}" height="${f2(cell)}" fill="${OR}"/>`;
    else { s += `<rect x="${x}" y="${f2(yB - cell)}" width="${f2(cell / 10)}" height="${f2(cell)}" fill="${OR}"/>`; for (let i = 1; i < 10; i++) s += L(x + i * cell / 10, yB - cell, x + i * cell / 10, yB, INK, .07); }
    for (let i = 1; i < 10; i++) s += L(x + i * cell, yT, x + i * cell, yB, INK, .2) + L(x, yT + i * cell, x + S, yT + i * cell, INK, .2);
    s += `<rect x="${x}" y="${yT}" width="${S}" height="${S}" fill="none" stroke="${INK}" stroke-width=".45"/>`;
  }
  // the magnifier: the thousandths cell, ten times larger, cut into its 10 strips
  const ring = [xs[3] + cell / 2, yB - cell / 2, cell * .95], lens = [151, yT + S / 2, 13.2], q = 15.6, qx = lens[0] - q / 2, qy = lens[1] - q / 2;
  s += outerTangents(ring, lens, "#EF2B2D", .3);
  s += `<circle cx="${f2(ring[0])}" cy="${f2(ring[1])}" r="${f2(ring[2])}" fill="none" stroke="#EF2B2D" stroke-width=".3"/>`;
  s += `<circle cx="${lens[0]}" cy="${f2(lens[1])}" r="${lens[2]}" fill="#fff" stroke="#EF2B2D" stroke-width=".9"/>`;
  s += `<rect x="${f2(qx)}" y="${f2(qy)}" width="${f2(q / 10)}" height="${q}" fill="${OR}"/>`;
  for (let i = 1; i < 10; i++) s += L(qx + i * q / 10, qy, qx + i * q / 10, qy + q, INK, .18);
  s += `<rect x="${f2(qx)}" y="${f2(qy)}" width="${q}" height="${q}" fill="none" stroke="${INK}" stroke-width=".3"/>`;
  // an arc from (x1, y1) to (x2, y2) bulging `bulge` mm (negative: up), its arrowhead at the end
  const arc = (x1, y1, x2, y2, bulge, c, w = .42) => {
    const mx = (x1 + x2) / 2, cy = (y1 + y2) / 2 + 2 * bulge, ang = Math.atan2(y2 - cy, x2 - mx), deg = ang * 180 / Math.PI;
    return `<path d="M${f2(x1)} ${f2(y1)}Q${f2(mx)} ${f2(cy)} ${f2(x2 - Math.cos(ang) * 1.4)} ${f2(y2 - Math.sin(ang) * 1.4)}" fill="none" stroke="${c}" stroke-width="${w}"/>` + head(x2, y2, deg, c, 2);
  };
  // above: ×10 (pink), ×100 (black), ×1000 (blue), each pointing back to the bigger unit
  s += arc(xs[3] + .84 * S, yT - .3, xs[0] + .36 * S, yT - .3, -16, BLUE);
  s += arc(xs[2] + .5 * S, yT - .3, xs[0] + .6 * S, yT - .3, -12, BLACK);
  for (let i = 1; i < 4; i++) s += arc(xs[i] + .5 * S, yT - .3, xs[i - 1] + .75 * S, yT - .3, -6.5, PINK);
  for (let i = 1; i < 4; i++) s += T((xs[i - 1] + .75 * S + xs[i] + .5 * S) / 2, yT - 1.4, "১০ গুণ", { a: "middle", fs: 3.1 });
  s += T(52, yT - 7.8, "১০০ গুণ", { a: "middle", fs: 3.1 }) + T(92, yT - 8.2, "১০০০ গুণ", { a: "middle", fs: 3.1 });
  // the values under the pictures
  const yL = yB + 4.4, lab = [[xs[0] + .3 * S, "১"], [xs[1] + .5 * S, "০.১"], [xs[2] + .5 * S, "০.০১"], [xs[3] + .55 * S, "০.০০১"]];
  for (const [x, t] of lab) s += T(x, yL, t, { a: "middle", fs: 3.5 });
  // below: ÷10 (pink), ÷100 (black), ÷1000 (blue), from one value to the next
  // each arc leaves a value's lower right and ends at the next value's lower left (half: the values' half widths)
  const half = [1, 2.5, 3.45, 4.4], yA = yL + 1.2;
  s += arc(lab[0][0] + .6, yA + .4, lab[3][0] - half[3] + .9, yL + 1.6, 17, BLUE);
  s += arc(lab[0][0] + .2, yA + .4, lab[2][0] - half[2] + .9, yL + 1.6, 15, BLACK);
  for (let i = 0; i < 3; i++) s += arc(lab[i][0] + half[i] * .7, yA, lab[i + 1][0] - half[i + 1] - .6, yL - .2, 4.5, PINK);
  const bhag = (x, y, d) => fracG(x, y, "১", d, 2.9) + T(x + [...d].length * .9 + 1.8, y + 1.1, "ভাগ", { fs: 3.1, fam: BEN, w: 600 });
  for (let i = 0; i < 3; i++) s += bhag((xs[i] + S + xs[i + 1]) / 2 - 2.8, yB + 3.2, "১০");
  s += bhag(41, yB + 12.4, "১০০") + bhag(88, yB + 12.6, "১০০০");
  return svg(166, yB + 24, s);
}
// the two outer tangent lines between circles [x, y, r]
function outerTangents([x1, y1, r1], [x2, y2, r2], c, w) {
  const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy), th = Math.atan2(dy, dx), al = Math.acos((r1 - r2) / d);
  let s = "";
  for (const sg of [1, -1]) {
    const a = th + sg * al;
    s += L(x1 + r1 * Math.cos(a), y1 + r1 * Math.sin(a), x2 + r2 * Math.cos(a), y2 + r2 * Math.sin(a), c, w);
  }
  return s;
}

// ── c5p063_pvt: the place table with its two arrow tags ──
function pvtHtml(b, ctx) {
  const heads = [["একক", ""], ["", ""], ["দশমাংশ", "({{১/১০}})"], ["শতাংশ", "({{১/১০০}})"], ["সহস্রাংশ", "({{১/১০০০}})"]];
  const cls = ["u", "d", "t", "h", "th"];
  const cell = (x) => x == null ? "" : ctx.md(x);
  const row = (cells, c) => (cells || ["", "", "", "", ""]).map((x, i) => `<td class="${cls[i]}">${cell(x)}</td>`).join("");
  return `<table class="c5p063-pvt"${b.w ? ` style="width:${b.w}mm"` : ""}><colgroup><col style="width:27%"><col style="width:15.4%"><col style="width:10.4%"><col style="width:15.7%"><col style="width:15.7%"><col style="width:15.8%"></colgroup>
    <tr class="hd"><td class="tg"><span class="c5p063-tag">স্থানের নাম</span></td>${heads.map(([a, f], i) => `<td class="${cls[i]}">${ctx.esc(a)}${f ? `<br>${ctx.md(f)}` : ""}</td>`).join("")}</tr>
    <tr class="dg"><td class="tg"></td>${row(b.digits)}</tr>
    <tr class="wd"><td class="tg"><span class="c5p063-tag">পড়ার নিয়ম</span></td>${row(b.words)}</tr></table>`;
}

// ── c5p063_nline: a number line in small steps, labels above its long ticks, boxed letters pointing down ──
function nlineSvg(b) {
  const u = b.unit || 3.4, from = b.from ?? 0, to = b.to, end = b.end ?? to + 1, major = b.major || 10, half = b.half || 5;
  const x0 = b.x0 ?? 4, X = (k) => x0 + (k - from) * u, top = b.arrows ? 9.6 : 0, yL = top + 10.4;
  let s = "";
  for (let k = from; k <= to; k++) {
    const len = k % major === 0 ? 4.4 : k % half === 0 ? 3 : 1.8;
    s += L(X(k), yL, X(k), yL - len, INK, k % major === 0 ? .36 : .26);
  }
  s += L(X(from), yL, X(end), yL, INK, .42);
  for (const [k, t] of Object.entries(b.labels || {})) s += T(X(+k), yL - 5.6, t, { a: "middle", fs: b.fs || 3.5 });
  for (const a of b.arrows || []) {
    s += `<rect x="${f2(X(a.at) - 3.4)}" y=".4" width="6.8" height="6.8" rx=".9" fill="#fff" stroke="${INK}" stroke-width=".35"/>` + T(X(a.at), 5.5, a.text, { a: "middle", fs: 4, fam: BEN, w: 700 });
    s += L(X(a.at), 7.2, X(a.at), yL - 1.6, "#3730A3", .4) + head(X(a.at), yL - .3, 90, "#3730A3", 2);
  }
  return svg(X(end) + 1.2, yL + 1, s);
}

// ── c5p063_cyl: measuring beakers and the magnifier lenses ──
function beakerG(bk) {
  const { x, y, w, h, fill = 0, label, ring, bracket } = bk, yb = y + h, r = 3.4, id = `c5p063b${++UID}`, Y = (v) => yb - v / 1000 * h;
  const body = `M${f2(x)} ${f2(y - 1)}V${f2(yb - r)}Q${f2(x)} ${f2(yb)} ${f2(x + r)} ${f2(yb)}H${f2(x + w - r)}Q${f2(x + w)} ${f2(yb)} ${f2(x + w)} ${f2(yb - r)}V${f2(y - 1)}`;
  let s = `<clipPath id="${id}"><path d="${body}Z"/></clipPath><path d="${body}Z" fill="#F8FDFF"/>`;
  if (fill) s += `<rect x="${f2(x)}" y="${f2(Y(fill))}" width="${f2(w)}" height="${f2(fill / 1000 * h + 1)}" fill="${COL.water}" clip-path="url(#${id})"/>` + L(x, Y(fill), x + w, Y(fill), "#38BDF8", .3);
  for (let i = 1; i <= 10; i++) s += L(x + w - (i === 5 ? w * .34 : w * .14), yb - i * h / 10, x + w, yb - i * h / 10, INK, .26);
  s += `<path d="${body}" fill="none" stroke="#334155" stroke-width=".42" stroke-linejoin="round"/>`;
  if (label) s += T(x + w / 2, y - 2.2, label, { a: "middle", fs: 3.5, fam: BEN, w: 600 });
  if (ring) s += `<circle cx="${f2(x + w)}" cy="${f2(Y(ring.v))}" r="${ring.r}" fill="none" stroke="#EF2B2D" stroke-width=".3"/>`;
  if (bracket) s += bracketG(x + w + .5, Y(bracket.a), Y(bracket.b), bracket.text);
  return s;
}
function bracketG(x, ya, yb, text) { // a small ")" between ya and yb, the value turned beside it
  const m = (ya + yb) / 2;
  return `<path d="M${f2(x)} ${f2(yb)}Q${f2(x + 1.4)} ${f2(m)} ${f2(x)} ${f2(ya)}" fill="none" stroke="#EF2B2D" stroke-width=".28"/>` + T(x + 1.9, m, text, { a: "middle", fs: 2.2, rot: 90 });
}
function lensG(ln) {
  const { cx, cy, vc, k, sx = 0, water, ring, bracket } = ln, rx = ln.rx || ln.r, ry = ln.ry || ln.r, id = `c5p063l${++UID}`;
  const Y = (v) => cy + (vc - v) / 1000 * k, X = cx + sx, vmin = vc - ry / k * 1000, vmax = vc + ry / k * 1000;
  let s = `<clipPath id="${id}"><ellipse cx="${f2(cx)}" cy="${f2(cy)}" rx="${f2(rx)}" ry="${f2(ry)}"/></clipPath><ellipse cx="${f2(cx)}" cy="${f2(cy)}" rx="${f2(rx)}" ry="${f2(ry)}" fill="#fff"/><g clip-path="url(#${id})">`;
  if (water != null) s += `<rect x="${f2(cx - rx)}" y="${f2(Y(water))}" width="${f2(rx * 2)}" height="${f2(ry * 2)}" fill="${COL.water}"/>` + L(cx - rx, Y(water), cx + rx, Y(water), "#38BDF8", .3);
  s += L(X, cy - ry, X, cy + ry, INK, ln.thick || .5);
  for (const [step, len] of ln.ticks || []) for (let v = Math.ceil(vmin / step) * step; v <= vmax; v += step) s += L(X - len, Y(v), X, Y(v), INK, .26);
  s += `</g>`;
  for (const [v, t, dy = 0, lead = 3.6] of ln.labels || []) s += L(X - lead, Y(v), X, Y(v), INK, .26) + T(X - lead - .6, Y(v) + (ln.fs || 3.2) * .34 + dy, t, { a: "end", fs: ln.fs || 3.2 });
  if (bracket) s += bracketG(X + .5, Y(bracket.a), Y(bracket.b), bracket.text);
  if (ring) s += `<ellipse cx="${f2(X + (ring.dx || 0))}" cy="${f2(Y(ring.v))}" rx="${ring.rx || ring.r}" ry="${ring.r}" fill="none" stroke="#EF2B2D" stroke-width=".3"/>`;
  s += `<ellipse cx="${f2(cx)}" cy="${f2(cy)}" rx="${f2(rx)}" ry="${f2(ry)}" fill="none" stroke="#EF2B2D" stroke-width="${ln.stroke || .8}"/>`;
  return s;
}
function cylSvg(b) {
  let s = "";
  for (const bk of b.beakers || []) s += beakerG(bk);
  for (const ln of b.lenses || []) s += lensG(ln);
  // the links last: they run from a small ring (in a beaker or a lens) out to the next lens's rim
  for (const [x1, y1, r1, x2, y2, r2] of b.links || []) s += outerTangents([x1, y1, r1], [x2, y2, r2], "#EF2B2D", .3);
  return svg(b.w, b.h, s);
}

// ── c5p063_cmp: the comparison table (স্থানের নাম over the places, সংখ্যা beside) ──
function cmpHtml(b, ctx) {
  const places = [["একক", "(১)"], ...(b.dot ? [["দশমিক", "বিন্দু"]] : []), ["দশমাংশ", "(০.১)"], ["শতাংশ", "(০.০১)"], ["সহস্রাংশ", "(০.০০১)"]];
  const n = places.length, rows = b.rows || Array.from({ length: b.n || 3 }, () => [...(b.dot ? ["", "(.)"] : [""]), ...Array(n - (b.dot ? 2 : 1)).fill(""), ""]);
  const widths = b.dot ? [15, 19, 15.5, 15.5, 15.5, 19.5] : [20, 20, 20, 20, 20]; // the book's (p70)
  const body = rows.map((r) => `<tr style="height:${b.rh || 9}mm">${r.map((c, i) => `<td class="${i === n ? "c5p063-nm" : b.dot && i === 1 ? "c5p063-dt" : ""}">${ctx.md(c)}</td>`).join("")}</tr>`).join("");
  return `<table class="c5p063-cmp c5p063-t${b.tone || "a"}" style="width:${b.w || 150}mm"><colgroup>${widths.map((w) => `<col style="width:${w}%">`).join("")}</colgroup>
    <tr><th class="c5p063-pl" colspan="${n}">স্থানের নাম</th><th class="c5p063-nh" rowspan="2">সংখ্যা</th></tr>
    <tr>${places.map(([a, c]) => `<th class="c5p063-sp">${ctx.esc(a)}<br>${ctx.esc(c)}</th>`).join("")}</tr>${body}</table>`;
}

// ── c5p063_dcol: decimals in columns, the points one under the other ──
const TICK = (x, y, s) => `<path d="M${f2(x - s * .5)} ${f2(y - s * .05)}L${f2(x - s * .12)} ${f2(y + s * .42)}L${f2(x + s * .55)} ${f2(y - s * .62)}" fill="none" stroke="#16A34A" stroke-width="${f2(s * .2)}" stroke-linecap="round" stroke-linejoin="round"/>`;
const CROSS = (x, y, s) => `<path d="M${f2(x - s * .4)} ${f2(y - s * .4)}L${f2(x + s * .4)} ${f2(y + s * .4)}M${f2(x + s * .4)} ${f2(y - s * .4)}L${f2(x - s * .4)} ${f2(y + s * .4)}" stroke="#DC2626" stroke-width="${f2(s * .17)}" stroke-linecap="round"/>`;
function dcolSvg(b) {
  const fs = (b.size || 13) * .3528, d = b.wide ? fs * 1.05 : fs * .6, p = b.wide ? fs * .85 : fs * .34, rh = fs * (b.wide ? 1.55 : 1.42);
  const all = [...b.rows, ...(b.ans ? [b.ans] : [])].map((r) => ({ ...r, ch: [...r.t] }));
  const split = (r) => { const i = r.ch.indexOf("."); return i < 0 ? { ip: r.ch.length, fp: 0 } : { ip: i, fp: r.ch.length - i - 1 }; };
  const ip = Math.max(...all.filter((r) => !r.raw).map((r) => split(r).ip)), dp = Math.max(...all.filter((r) => !r.raw).map((r) => split(r).fp), 0);
  const mk = all.some((r) => r.m) ? fs * 1.3 : 0, ow = all.some((r) => r.op) ? fs * .95 : 0, x0 = mk + ow + .4;
  const Xp = x0 + ip * d + p / 2, R = Xp + p / 2 + dp * d, W = R + .6;
  let s = "", y = fs * 1.05;
  const nOps = b.rows.length;
  all.forEach((r, i) => {
    const isAns = b.ans && i === all.length - 1, fill = isAns ? "#C2410C" : INK, yy = y + i * rh + (isAns ? fs * .2 : 0);
    const put = (x, c) => { s += T(x, yy, c, { a: "middle", fs, fill, w: 800 }); };
    if (r.raw) { let x = R; for (const c of [...r.ch].reverse()) { const a = c === "." ? p : d; put(x - a / 2, c); x -= a; } }
    else {
      const { ip: ri } = split(r);
      r.ch.forEach((c, j) => {
        if (j < ri) put(Xp - p / 2 - (ri - j - .5) * d, c);
        else if (j === ri) put(Xp, c);
        else put(Xp + p / 2 + (j - ri - .5) * d, c);
      });
    }
    if (r.op) s += T(mk + ow / 2, yy, r.op === "-" ? "−" : r.op, { a: "middle", fs, fill: "#DC2626", w: 800 });
    if (r.m) s += (r.m === "v" ? TICK : CROSS)(mk / 2, yy - fs * .35, fs * .95);
  });
  const yLine = y + (nOps - 1) * rh + fs * .45;
  s += L(mk + .2, yLine, W - .2, yLine, INK, .45);
  const H = b.ans ? y + (all.length - 1) * rh + fs * .2 + fs * .4 : yLine + (b.blank === false ? .6 : rh);
  return svg(W, H, s);
}

module.exports = {
  kinds: {
    c5p063_grid: (b) => `<div class="c5p063-c${b.left ? " l" : ""}">${gridSvg(b)}</div>`,
    c5p063_flow: () => `<div class="c5p063-c">${flowSvg()}</div>`,
    c5p063_pvt: (b, ctx) => pvtHtml(b, ctx),
    c5p063_nline: (b) => `<div class="c5p063-c${b.left ? " l" : ""}">${nlineSvg(b)}</div>`,
    c5p063_cyl: (b) => `<div class="c5p063-c">${cylSvg(b)}</div>`,
    c5p063_cmp: (b, ctx) => `<div class="c5p063-c">${cmpHtml(b, ctx)}</div>`,
    c5p063_dcol: (b) => `<div class="c5p063-c${b.left ? " l" : ""}">${dcolSvg(b)}</div>`,
    c5p063_stk: (b, ctx) => { const src = ctx.sticker(b.name); return `<div class="c5p063-c"><span class="c5p063-stk" style="width:${b.w}mm;height:${b.h}mm">${src ? `<img src="${src}">` : `<i>${ctx.esc(b.emoji || "●")}</i>`}</span></div>`; },
    c5p063_eqs: (b, ctx) => `<div class="c5p063-eqs" style="font-size:${b.size || 12.5}pt;gap:${b.gap ?? 1.6}mm;--sb:${b.sb || 9}mm;--bw:${b.bw || 16}mm${b.indent ? `;padding-left:${b.indent}mm` : ""}">${b.lines.map((l) => `<div>${ctx.md(l).replace(/▭/g, `<span class="abox c5p063-wb"></span>`)}</div>`).join("")}</div>`,
    c5p063_dbox: (b, ctx) => `<div class="c5p063-dbox" style="--bw:${b.bw || 30}mm;--bh:${b.bh || 7}mm"><span class="hd">${ctx.md(b.head)}</span><i></i><span class="bx"></span><i>${ctx.esc(b.op === "-" ? "−" : b.op)}</i><span class="bx"></span><span class="ln"></span><i></i><span class="bx"></span></div>`,
  },
  css: `
.c5p063-c { display: flex; justify-content: center } .c5p063-c.l { justify-content: flex-start } svg.c5p063-svg { display: block; overflow: visible; flex: none }
/* the place table (pp64, 67) */
.c5p063-pvt { width: 100%; table-layout: fixed; border-collapse: collapse; background: #fff; font: 700 12pt/1.25 'Baloo Da 2'; color: ${INK}; box-shadow: 0 1.2mm 0 var(--s) }
.c5p063-pvt td { border: .4mm solid #475569; text-align: center; vertical-align: middle; padding: 1mm .6mm .6mm }
.c5p063-pvt tr.hd td { height: 15mm } .c5p063-pvt tr.dg td { height: 8mm; font-size: 14pt; color: var(--d) } .c5p063-pvt tr.wd td { height: 11mm; font: 600 12pt 'Noto Sans Bengali' }
.c5p063-pvt tr.hd td.u { background: #A7E3B6 } .c5p063-pvt tr.hd td.t { background: #E9C9EA } .c5p063-pvt tr.hd td.h { background: #BFE6F5 } .c5p063-pvt tr.hd td.th { background: #FCE1D6 }
.c5p063-pvt tr.dg td.d { font-size: 16pt } .c5p063-pvt td.tg { text-align: left; padding: 1mm 1.6mm }
.c5p063-tag { display: inline-block; position: relative; font: 700 11.5pt/1 'Noto Sans Bengali'; color: ${INK}; background: #FFF7ED; border: .5mm solid #F97316; border-right: 0; padding: 2.4mm 2.6mm 2mm 3mm; margin-right: 5mm }
.c5p063-tag::after { content: ""; position: absolute; right: -4.3mm; top: -.5mm; bottom: -.5mm; width: 4.4mm; background: #F97316; clip-path: polygon(0 0, 100% 50%, 0 100%) }
.c5p063-tag::before { content: ""; position: absolute; right: -3.55mm; top: .1mm; bottom: .1mm; width: 3.6mm; background: #FFF7ED; clip-path: polygon(0 0, 100% 50%, 0 100%); z-index: 1 }
/* the comparison tables (pp70–71) */
.c5p063-cmp { table-layout: fixed; border-collapse: collapse; background: #fff; font: 700 12.5pt/1.2 'Baloo Da 2'; color: ${INK}; box-shadow: 0 1.2mm 0 var(--s) }
.c5p063-cmp th, .c5p063-cmp td { border: .4mm solid #475569; text-align: center; vertical-align: middle; padding: .8mm .5mm .4mm }
.c5p063-cmp th { font: 700 11pt/1.3 'Noto Sans Bengali' } .c5p063-cmp th.c5p063-pl { background: #F2B48C; font-size: 12pt; padding: 1.2mm }
.c5p063-ta th.c5p063-sp { background: #CDEBFA } .c5p063-ta th.c5p063-nh { background: #FBE7A1 } .c5p063-ta td.c5p063-dt, .c5p063-ta td.c5p063-nm { background: #FCD6E6 }
.c5p063-tb th.c5p063-sp { background: #FCD6E6 } .c5p063-tb th.c5p063-nh { background: #CDEBFA } .c5p063-tb td.c5p063-dt { background: #B9E29A } .c5p063-tb td.c5p063-nm { background: #FBE7A1 }
.c5p063-cmp td.c5p063-nm { color: #9D174D } .c5p063-tb td.c5p063-nm { color: #92400E }
.c5p063-stk { display: inline-flex; align-items: center; justify-content: center } .c5p063-stk img { max-width: 100%; max-height: 100%; object-fit: contain } .c5p063-stk i { font: normal 40pt 'Noto Color Emoji' }
/* lines of working with answer boxes (p66): □ a box (--sb), ▭ a wider one (--bw) */
.c5p063-eqs { display: flex; flex-direction: column; font: 500 1em/1.5 'Noto Sans Bengali' } .c5p063-eqs > div { white-space: nowrap }
.c5p063-eqs > div > .abox { width: var(--sb); height: 7mm; vertical-align: -2mm } .c5p063-eqs > div > .abox.c5p063-wb { width: var(--bw) }
/* p73's sum to set out in boxes */
.c5p063-dbox { display: grid; grid-template-columns: 7mm var(--bw); gap: 1.6mm 1.4mm; align-items: center; justify-content: center; font: 700 13pt 'Baloo Da 2' }
.c5p063-dbox .hd { grid-column: 1 / -1; text-align: center; padding-left: 7mm } .c5p063-dbox i { font-style: normal; color: #DC2626; text-align: center; font-size: 16pt }
.c5p063-dbox .bx { height: var(--bh); border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm } .c5p063-dbox .ln { grid-column: 1 / -1; border-top: .5mm solid ${INK}; height: 0 }
`,
};
