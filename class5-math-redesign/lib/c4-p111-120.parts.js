// Own kinds for printed pages 111–120 (chapter ৮ দশমিক ভগ্নাংশ) and 169–174 (chapter ১১ উপাত্ত সংগ্রহ ও বিন্যস্তকরণ),
// prefixed c4p111_ (classes c4p111-). Written by a helper (23 Nov 2026). Everything whose amount matters is drawn here:
//   c4p111_mugs    p111: the jug pouring into three 1-litre mugs, two full and the third filled to 3 of its 10 marks
//   c4p111_glasses measuring glasses ("১ লিটার", 10 equal parts, the 5th mark longer), each filled to n tenths (dark: the
//                  first tenths in a deeper blue), in groups with a mark ("(৩)") and a dashed box, a letter box under each
//                  { groups: [{ mark?, box?, items: [n | { fill, dark, below }] }], bw, bh, gap, ggap }
//   c4p111_pvdec   p112: the place table একক | দশমাংশ with "৩ . ২", the decimal point on the line, its red arrow, the
//                  reading "তিন | দশমিক | দুই", and the labels স্থানের নাম / পড়ার নিয়ম
//   c4p111_ruler   p113: a TRUE-SIZE ruler (1 cm = 10 mm on the page, mm marks), Bangla digits as printed, "সেমি" under ০,
//                  the red ribbon laid along it from ০  { cm, labels, ribbon (cm) }
//   c4p111_nline   a number line in tenths (pp114–116): { unit (mm per 1), max (last tick, tenths), len (line end, tenths),
//                  cross (ticks through the line), arrows: [{ at, text }] with empty boxes below (boxes), hops: [a, b] arcs of
//                  ০.১ under the line, tag: "০.১" (a box with a red arrow), frac: true (the fractions above, decimals below) }
//   c4p111_dgrid   p118: a decimal sum in the book's grid (sign | ones | . | tenths), filled or empty: { rows, ans }
//   c4p111_dsum    a decimal sum written in columns, the decimal points one under the other, a green ✓ or a red × beside a
//                  row (p118), an answer box under the line (p119): { rows: [{ m, op, i, f, dot }], ans, box, size }
//   c4p111_bars    a bar chart (স্তম্ভলেখ) on squared paper: bars at the exact heights of the data, the book's axis numbers,
//                  axis arrows (style "a": p171; style "b": p172 with ক খ গ ০ and the empty boxes for the names)
//   c4p111_sq      empty squared paper to draw a bar chart on (pp173–174): { cols, rows, cell }
//   c4p111_runs    p174: the spreadsheet-style column chart "ওভার প্রতি রান" (gridlines every 2 runs, bars at the runs)
//   c4p111_tab     a table with a caption above it, set column widths and row heights; a cell { t: n } is n drawn tally
//                  marks (Class 2's p115_tally), { c, span, align } a cell with options
//   c4p111_zoo     p169: the zoo, drawn: six fenced pens, each with its exact number of animals (stickers)
//   c4p111_trip    p120: the village picture with its three names above and the two distance arrows below
//   c4p111_rows    lines in a grid, so boxes and words line up ({ cols: CSS grid columns, rows: [[cell…]], sum: Baloo })
//   c4p111_x       renders blocks and draws the marks below in their text
// Extra markup (c4p111_rows, c4p111_tab, c4p111_x): ▭ a wide box (--bw, 20mm), ▬ a long box (--lw, 62mm), ∴ drawn (the fonts'
// glyph is tiny), ✓ a green tick, ✗ a red cross.
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const BN = "০১২৩৪৫৬৭৮৯", bnd = (n) => String(n).replace(/\d/g, (d) => BN[d]);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const BEN = "Noto Sans Bengali", BAL = "Baloo Da 2";
const T = (x, y, s, o = {}) => `<text x="${f2(x)}" y="${f2(y)}" font-family="${o.fam || BEN}" font-weight="${o.w || 600}" font-size="${f2(o.fs || 3.6)}"${o.a ? ` text-anchor="${o.a}"` : ""} fill="${o.fill || INK}"${o.rot != null ? ` transform="rotate(${o.rot} ${f2(x)} ${f2(y)})"` : ""}>${esc(s)}</text>`;
const L = (x1, y1, x2, y2, c = INK, w = 0.3, extra = "") => `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}" stroke="${c}" stroke-width="${w}" fill="none"${extra}/>`;
const head = (x, y, ang, c = INK, s = 1.8) => { // an arrowhead with its tip at (x, y), pointing along ang (degrees, 0 = right)
  const a = ang * Math.PI / 180, p = (d, k) => `${f2(x - s * Math.cos(a) + k * d * Math.sin(a))} ${f2(y - s * Math.sin(a) - k * d * Math.cos(a))}`;
  return `<path d="M${f2(x)} ${f2(y)}L${p(s * .42, 1)}L${p(s * .42, -1)}Z" fill="${c}"/>`;
};
const TH = `<svg class="c4p111-th" viewBox="0 0 10 10"><circle cx="5" cy="1.8" r="1.4"/><circle cx="1.7" cy="8.2" r="1.4"/><circle cx="8.3" cy="8.2" r="1.4"/></svg>`;
const TICK = `<svg class="c4p111-mk" viewBox="0 0 10 10"><path d="M1.2 5.4L4 8.6L8.8 1" fill="none" stroke="#16A34A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CROSS = `<svg class="c4p111-mk" viewBox="0 0 10 10"><path d="M2 2L8 8M8 2L2 8" stroke="#DC2626" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const fx = (html) => String(html).replace(/∴/g, TH).replace(/✓/g, TICK).replace(/✗/g, CROSS)
  .replace(/▭/g, `<span class="c4p111-wb"></span>`).replace(/▬/g, `<span class="c4p111-lb"></span>`);
const mdx = (ctx, s) => fx(ctx.md(s == null ? "" : String(s)));
// a fraction drawn in SVG: the top over a bar over the bottom, centred on x; y = the bar
const fracG = (x, y, a, b, fs = 3.3, fill = INK) => T(x, y - fs * .32, a, { a: "middle", fs, fam: BAL, w: 700, fill }) + L(x - fs * .55, y, x + fs * .55, y, fill, .25) + T(x, y + fs * .86, b, { a: "middle", fs, fam: BAL, w: 700, fill });

// ── measuring glasses: the body's top-left at (x, y), w × h, 10 equal parts, filled to `fill` tenths ──
function glassG(x, y, w, h, it, label) {
  const { fill = 0, dark = 0, below } = typeof it === "number" ? { fill: it } : it, u = h / 10, yb = y + h;
  let s = `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" fill="#F8FDFF"/>`;
  if (fill) s += `<rect x="${f2(x)}" y="${f2(yb - fill * u)}" width="${f2(w)}" height="${f2(fill * u)}" fill="#BAE6FD"/>` + L(x, yb - fill * u, x + w, yb - fill * u, "#0EA5E9", .35);
  if (dark) s += `<rect x="${f2(x)}" y="${f2(yb - dark * u)}" width="${f2(w)}" height="${f2(dark * u)}" fill="#38BDF8"/>`;
  for (let i = 1; i <= 10; i++) s += L(x, yb - i * u, x + (i === 5 ? w * .3 : w * .17), yb - i * u, INK, .28);
  s += `<path d="M${f2(x)} ${f2(y - .6)}V${f2(yb)}H${f2(x + w)}V${f2(y - .6)}" fill="none" stroke="${INK}" stroke-width=".42" stroke-linejoin="round"/>`;
  if (label) s += T(x + w / 2, y - 1.3, label, { a: "middle", fs: 3, w: 600 });
  if (below) s += `<rect x="${f2(x + w / 2 - 2.8)}" y="${f2(yb + 1.4)}" width="5.6" height="5.6" rx=".8" fill="#fff" stroke="${INK}" stroke-width=".3"/>` + T(x + w / 2, yb + 5.6, below, { a: "middle", fs: 3.6, w: 600 });
  return s;
}
function glassesSvg(b) {
  const bw = b.bw || 12, bh = b.bh || 21, gap = b.gap ?? 4, ggap = b.ggap ?? 6, pad = 2.2, label = b.label ?? "১ লিটার";
  const hasBelow = b.groups.some((g) => g.items.some((it) => typeof it === "object" && it.below)), hasMark = b.groups.some((g) => g.mark);
  const top = (hasMark ? 4.4 : 0) + 4.8, H = top + bh + (hasBelow ? 8 : 1.2);
  let x = .3, s = "";
  for (const g of b.groups) {
    const n = g.items.length, inner = n * bw + (n - 1) * gap, gx = x + (g.box ? pad : 0), w = inner + (g.box ? 2 * pad : 0);
    if (g.mark) s += T(x + (g.box ? 0 : 0), 3.4, g.mark, { fs: 3.4, fam: BAL, w: 700, fill: "var(--d)" });
    if (g.box) s += `<rect x="${f2(x)}" y="${f2(top - 4.6)}" width="${f2(w)}" height="${f2(bh + 6)}" rx="1.4" fill="none" stroke="#64748B" stroke-width=".3" stroke-dasharray="1 .8"/>`;
    g.items.forEach((it, i) => { s += glassG(gx + i * (bw + gap), top, bw, bh, it, label); });
    x += w + ggap;
  }
  const W = x - ggap + .6;
  return `<svg class="c4p111-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${s}</svg>`;
}

// ── p111: the jug pouring into three mugs (1 litre each, 10 marks): two full, the third filled to 3 marks ──
function mugG(x, y, w, h, fill) {
  const u = h / 10, yb = y + h, r = 1.6;
  const body = `M${f2(x)} ${f2(y)}V${f2(yb - r)}Q${f2(x)} ${f2(yb)} ${f2(x + r)} ${f2(yb)}H${f2(x + w - r)}Q${f2(x + w)} ${f2(yb)} ${f2(x + w)} ${f2(yb - r)}V${f2(y)}`;
  let s = `<path d="M${f2(x + w - .2)} ${f2(y + h * .16)}C${f2(x + w + h * .34)} ${f2(y + h * .1)} ${f2(x + w + h * .38)} ${f2(y + h * .68)} ${f2(x + w - .2)} ${f2(y + h * .72)}" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M${f2(x + w - .2)} ${f2(y + h * .16)}C${f2(x + w + h * .34)} ${f2(y + h * .1)} ${f2(x + w + h * .38)} ${f2(y + h * .68)} ${f2(x + w - .2)} ${f2(y + h * .72)}" fill="none" stroke="#F1F5F9" stroke-width=".7" stroke-linecap="round"/>
    <path d="${body}Z" fill="#F0F9FF"/>`;
  if (fill) s += `<clipPath id="c4p111m${Math.round(x * 10)}"><path d="${body}Z"/></clipPath><rect x="${f2(x)}" y="${f2(yb - fill * u)}" width="${f2(w)}" height="${f2(fill * u + .2)}" fill="url(#c4p111-water)" clip-path="url(#c4p111m${Math.round(x * 10)})"/>`
    + `<ellipse cx="${f2(x + w / 2)}" cy="${f2(yb - fill * u)}" rx="${f2(w / 2)}" ry=".9" fill="#7DD3FC" stroke="#0EA5E9" stroke-width=".25"/>`;
  for (let i = 1; i <= 10; i++) s += L(x + w * .38, yb - i * u, x + w * (i === 5 ? .7 : .6), yb - i * u, "#0F172A", .3);
  s += `<path d="${body}" fill="none" stroke="#475569" stroke-width=".45"/><ellipse cx="${f2(x + w / 2)}" cy="${f2(y)}" rx="${f2(w / 2)}" ry="1" fill="none" stroke="#475569" stroke-width=".4"/>`
    + `<path d="M${f2(x + 1.2)} ${f2(y + 2)}V${f2(yb - 2.5)}" stroke="#fff" stroke-width=".9" stroke-linecap="round" opacity=".8"/>`;
  return s;
}
function mugsSvg(b) {
  const W = b.w || 68, H = b.h || 46, mw = 13, mh = 19, y = H - mh - .6;
  let s = `<defs><linearGradient id="c4p111-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7DD3FC"/><stop offset="1" stop-color="#38BDF8"/></linearGradient></defs>`;
  const xs = [1, 22, 43];
  s += mugG(xs[0], y, mw, mh, 10) + mugG(xs[1], y, mw, mh, 10);
  // the stream from the jug's spout into the third mug
  const sx = xs[2] + mw * .55;
  s += `<path d="M${f2(sx + 1.4)} ${f2(y - 12.6)}Q${f2(sx - .2)} ${f2(y - 9)} ${f2(sx)} ${f2(y + mh - 3 * mh / 10)}" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round" opacity=".9"/>`;
  s += mugG(xs[2], y, mw, mh, 3);
  // the jug, tipped to pour: drawn upright, then turned about its spout
  const body = "M2 1Q1.2 6 .6 10Q0 15 2.2 18H11.8Q14 15 13.4 10Q12.8 6 12 1Z";
  const jug = `<path d="M12.2 3.2C17.8 3 17.8 12.4 13.2 13.4" fill="none" stroke="#64748B" stroke-width="1.7" stroke-linecap="round"/>
    <path d="M2.2 1.2L-1.9 -.8L2.5 3.6Z" fill="#E0F2FE" stroke="#475569" stroke-width=".4" stroke-linejoin="round"/>
    <path d="${body}" fill="url(#c4p111-water)" stroke="#475569" stroke-width=".45" stroke-linejoin="round"/>
    <path d="M2 1Q1.6 3.4 1.4 5H12.6Q12.4 3.4 12 1Z" fill="#F0F9FF" opacity=".9"/>
    <ellipse cx="7" cy="1" rx="5" ry=".9" fill="#F0F9FF" stroke="#475569" stroke-width=".4"/>
    <path d="M2.6 6.5Q2 11 3.4 15.6" fill="none" stroke="#fff" stroke-width=".9" stroke-linecap="round" opacity=".75"/>`;
  s += `<g transform="translate(${f2(sx + 1.6)} ${f2(y - 12.8)}) rotate(-62)">${jug}</g>`;
  return `<svg class="c4p111-svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${s}</svg>`;
}

// ── p112: the place table of ৩.২ ──
function pvdecSvg() {
  const tx = 31, tw = 80, rh = 9.4, y0 = 1, a = tw / 3, mid = tx + tw / 2;
  const tag = (y, text, c, d) => `<path d="M0 ${f2(y)}H26L29.4 ${f2(y + 3.8)}L26 ${f2(y + 7.6)}H0Z" fill="${c}" stroke="${d}" stroke-width=".35"/>` + T(13, y + 5.3, text, { a: "middle", fs: 3.5, w: 700 });
  let s = `<rect x="${tx}" y="${y0}" width="${tw}" height="${rh}" fill="#FED7AA"/>`;
  s += `<rect x="${tx}" y="${y0}" width="${tw}" height="${f2(rh * 3)}" fill="none" stroke="${INK}" stroke-width=".4"/>`;
  s += L(tx, y0 + rh, tx + tw, y0 + rh, INK, .35) + L(tx, y0 + 2 * rh, tx + tw, y0 + 2 * rh, INK, .35);
  s += L(mid, y0, mid, y0 + 2 * rh, INK, .35) + L(tx + a, y0 + 2 * rh, tx + a, y0 + 3 * rh, INK, .35) + L(tx + 2 * a, y0 + 2 * rh, tx + 2 * a, y0 + 3 * rh, INK, .35);
  s += T(tx + tw / 4, y0 + 6.3, "একক", { a: "middle", fs: 3.9, w: 700, fill: "#9A3412" }) + T(tx + 3 * tw / 4, y0 + 6.3, "দশমাংশ", { a: "middle", fs: 3.9, w: 700, fill: "#9A3412" });
  s += T(tx + tw / 4, y0 + rh + 6.8, "৩", { a: "middle", fs: 5, fam: BAL, w: 800, fill: "var(--c)" }) + T(tx + 3 * tw / 4, y0 + rh + 6.8, "২", { a: "middle", fs: 5, fam: BAL, w: 800, fill: "var(--c)" });
  s += `<circle cx="${mid}" cy="${f2(y0 + rh + 3)}" r="1" fill="${INK}"/>` + L(mid, y0 + 2 * rh + 1.4, mid, y0 + rh + 5.2, "#DC2626", .45) + head(mid, y0 + rh + 4.3, -90, "#DC2626", 2);
  s += T(tx + a / 2, y0 + 2 * rh + 6.4, "তিন", { a: "middle", fs: 3.9 }) + T(mid, y0 + 2 * rh + 6.4, "দশমিক", { a: "middle", fs: 3.9 }) + T(tx + 2.5 * a, y0 + 2 * rh + 6.4, "দুই", { a: "middle", fs: 3.9 });
  s += tag(y0 + .9, "স্থানের নাম", "#FBBF24", "#B45309") + tag(y0 + 2 * rh + .9, "পড়ার নিয়ম", "#E2E8F0", "#64748B");
  const W = tx + tw + .5, H = y0 + 3 * rh + .6;
  return `<svg class="c4p111-svg" width="${W}mm" height="${f2(H)}mm" viewBox="0 0 ${W} ${f2(H)}">${s}</svg>`;
}

// ── p113: a true-size ruler, 1 cm = 10 mm, the ticks hanging from its top edge, the ribbon on it ──
function rulerSvg({ cm = 13, labels = 12, ribbon = 7.4 }) {
  const m = 4.5, X = (v) => m + v * 10, ry = 5.2, rh = 13.6, W = cm * 10 + 2 * m;
  let s = `<rect x="0" y="${ry}" width="${W}" height="${rh}" rx="1.2" fill="#FDE047" stroke="#CA8A04" stroke-width=".45"/>
    <rect x=".6" y="${f2(ry + rh - 3.4)}" width="${W - 1.2}" height="2.8" rx=".8" fill="#FACC15" opacity=".55"/>`;
  for (let i = 0; i <= cm * 10; i++) {
    const len = i % 10 === 0 ? 4.4 : i % 5 === 0 ? 3.1 : 1.9;
    s += L(X(i / 10), ry, X(i / 10), ry + len, INK, i % 10 === 0 ? .38 : .22);
    if (i % 10 === 0 && i / 10 <= labels) s += T(X(i / 10), ry + 8.6, bnd(i / 10), { a: "middle", fs: 3.4, fam: BAL, w: 700 });
  }
  s += T(X(0) + .2, ry + 12.2, "সেমি", { fs: 2.5, w: 600 });
  if (ribbon) s += `<rect x="${f2(X(0))}" y=".5" width="${f2(ribbon * 10)}" height="${f2(ry - .5)}" fill="#E8178A" stroke="#9D174D" stroke-width=".3"/><rect x="${f2(X(0) + .4)}" y="1" width="${f2(ribbon * 10 - .8)}" height="1" fill="#fff" opacity=".28"/>`;
  return `<svg class="c4p111-svg c4p111-ruler" width="${W}mm" height="${f2(ry + rh + .4)}mm" viewBox="0 0 ${W} ${f2(ry + rh + .4)}">${s}</svg>`;
}

// ── number lines in tenths ──
function nlineSvg(b) {
  const u = b.unit || 34, max = b.max, len = b.len ?? max + 3, x0 = b.x0 ?? (b.tag ? 17 : 3), X = (t) => x0 + t * u / 10;
  const top = (b.arrows ? 13.5 : 0) + (b.frac ? 9 : 5.2), yL = top + 4.6;
  let s = "";
  for (let t = 0; t <= max; t++) {
    const big = t % 10 === 0, half = t % 5 === 0;
    if (b.cross) s += L(X(t), yL - (big ? 2 : 1.7), X(t), yL + (big ? 2 : 1.7), INK, big ? .4 : .32);
    else s += L(X(t), yL, X(t), yL - (big ? 4.2 : half ? 2.7 : 1.7), INK, big ? .38 : .26);
    if (big && !b.frac) s += T(X(t), yL - 5.3, bnd(t / 10), { a: "middle", fs: b.fs || 3.8, fam: BAL, w: 700 });
  }
  s += L(X(0), yL, X(len), yL, INK, .42);
  if (b.frac) for (let t = 0; t <= 10; t++) {
    s += t ? fracG(X(t), yL - 5.6, bnd(t), "১০", 3) : T(X(0), yL - 4.6, "০", { a: "middle", fs: 3.2, fam: BAL, w: 700 });
    s += T(X(t), yL + 6.4, t === 0 ? "০" : t === 10 ? "১" : "০." + bnd(t), { a: "middle", fs: 3.2, fam: BAL, w: 700, fill: "var(--d)" });
  }
  for (const a of b.arrows || []) {
    s += `<rect x="${f2(X(a.at) - 3.3)}" y=".4" width="6.6" height="6.6" rx=".8" fill="#fff" stroke="${INK}" stroke-width=".35"/>` + T(X(a.at), 5.4, a.text, { a: "middle", fs: 4, w: 700 });
    s += L(X(a.at), 7, X(a.at), yL - 1.4, "#3730A3", .4) + head(X(a.at), yL - .4, 90, "#3730A3", 1.9);
    if (b.boxes) s += `<rect x="${f2(X(a.at) - 5.6)}" y="${f2(yL + 2.2)}" width="11.2" height="6.8" rx="1.4" fill="#FFFBEB" stroke="#F59E0B" stroke-width=".5"/>`;
  }
  if (b.hops) for (let t = b.hops[0]; t < b.hops[1]; t++) s += `<path d="M${f2(X(t))} ${f2(yL)}Q${f2(X(t + .5))} ${f2(yL + 3.4)} ${f2(X(t + 1))} ${f2(yL)}" fill="none" stroke="#C026D3" stroke-width=".35"/>`;
  if (b.tag) s += `<rect x=".3" y="${f2(yL - 3)}" width="10" height="6" rx=".8" fill="#fff" stroke="${INK}" stroke-width=".35"/>` + T(5.3, yL + 1.3, b.tag, { a: "middle", fs: 3.4, fam: BAL, w: 700 })
    + L(10.6, yL, X(0) - 1.6, yL, "#DC2626", .45) + head(X(0) - .3, yL, 0, "#DC2626", 1.9);
  const W = X(len) + 1, H = yL + (b.boxes ? 9.6 : b.frac ? 8 : b.hops ? 4.2 : 1.2);
  return `<svg class="c4p111-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${s}</svg>`;
}

// ── p118: a decimal sum in the book's grid: columns sign | ones | . | tenths ──
function dgridSvg(b) {
  const cw = [7, 9.5, 6, 9.5], rh = 7.6, W = cw.reduce((a, c) => a + c, 0), H = rh * 3, xs = [0];
  for (const c of cw) xs.push(xs[xs.length - 1] + c);
  const rows = [...b.rows, b.ans || ["", "", "", ""]];
  let s = `<rect x=".3" y=".3" width="${W}" height="${H}" fill="#fff"/>`;
  rows.forEach((r, ri) => r.forEach((c, ci) => {
    if (c) s += T(.3 + xs[ci] + cw[ci] / 2, .3 + ri * rh + 5.5, c === "." ? "." : c, { a: "middle", fs: 4.6, fam: BAL, w: 800, fill: ri === 2 ? "#C2410C" : ci === 0 ? "#DC2626" : INK });
  }));
  s += `<rect x=".3" y=".3" width="${W}" height="${H}" fill="none" stroke="#64748B" stroke-width=".3" stroke-dasharray="1 .7"/>`;
  s += L(.3, .3 + rh, .3 + W, .3 + rh, "#94A3B8", .25, ` stroke-dasharray="1 .7"`) + L(.3, .3 + 2 * rh, .3 + W, .3 + 2 * rh, INK, .55);
  for (let i = 1; i < 4; i++) s += L(.3 + xs[i], .3, .3 + xs[i], .3 + H, INK, .55);
  return `<svg class="c4p111-svg" width="${f2(W + .6)}mm" height="${f2(H + .6)}mm" viewBox="0 0 ${f2(W + .6)} ${f2(H + .6)}">${s}</svg>`;
}

// ── bar charts on squared paper ──
function barsSvg(b) {
  const c = b.cell || 6, C = b.cols, R = b.rows, gw = C * c, gh = R * c, st = b.style || "a";
  const lab = b.lab ?? (b.xlabels || []).reduce((m, x) => Math.max(m, [...x.text].length), 0) * 1.5 + 2.5; // room for the turned names (mm)
  const gx = st === "a" ? 17 : 26, gy = st === "a" ? (b.title ? 11.5 : 3) : 11, bottom = gy + gh;
  let s = "";
  if (b.title) s += `<rect x="${f2(gx + gw / 2 - 38)}" y=".4" width="76" height="7.6" fill="#E0F2FE" stroke="#0284C7" stroke-width=".35"/>` + T(gx + gw / 2, 5.6, b.title, { a: "middle", fs: 3.9, w: 700, fill: "#075985" });
  else if (st === "b") s += `<rect x="${f2(gx + gw / 2 - 23)}" y=".4" width="46" height="7" rx=".6" fill="#fff" stroke="${INK}" stroke-width=".4"/>`;
  for (const bar of b.bars || []) s += `<rect x="${f2(gx + (bar.col - 1) * c)}" y="${f2(bottom - bar.v * c)}" width="${c}" height="${f2(bar.v * c)}" fill="${bar.color}" stroke="${bar.dark || "rgba(0,0,0,.25)"}" stroke-width=".3"/>`;
  for (let i = 0; i <= C; i++) s += L(gx + i * c, gy, gx + i * c, bottom, i === 0 || i === C ? INK : "#64748B", i === 0 || i === C ? .45 : .22);
  for (let j = 0; j <= R; j++) s += L(gx, gy + j * c, gx + gw, gy + j * c, j === 0 || j === R ? INK : "#64748B", j === 0 || j === R ? .45 : .22);
  for (const [v, t] of Object.entries(b.ylabels || {})) s += T(gx - 1.4, bottom - v * c + 1.3, t, { a: "end", fs: 3.5, fam: BAL, w: 700 });
  for (const x of b.xlabels || []) s += T(gx + (x.col - .5) * c + 1.3, bottom + (st === "b" ? 5.2 : 1.6), x.text, { a: "end", fs: 3.4, w: 600, rot: -90 });
  let H;
  if (st === "a") {
    const ya = bottom + lab + 2.6;
    s += L(2.2, ya, 2.2, gy - 1.6, INK, .35) + head(2.2, gy - 2.6, -90, INK, 2) + L(gx - 1, ya, gx + gw + 4, ya, INK, .35) + head(gx + gw + 5, ya, 0, INK, 2);
    if (b.ytitle) s += T(8.4, gy + gh / 2, b.ytitle, { a: "middle", fs: 3.7, w: 700, rot: -90 });
    if (b.xtitle) s += T(gx + gw / 2, ya + 5.4, b.xtitle, { a: "middle", fs: 3.7, w: 700 });
    H = ya + 7;
  } else {
    const ax = gx - 8.4, ya = bottom + 3.4, yb = ya + lab + 3;
    s += L(ax, gy - 3, ax, bottom + .6, INK, .35) + head(ax, gy - 4, -90, INK, 1.9) + head(ax, bottom + 1.6, 90, INK, 1.9);
    s += T(ax - 2.4, gy - 3.6, "গ", { a: "middle", fs: 3.4 }) + T(gx - 1.4, bottom + 1.3, "০", { a: "end", fs: 3.5, fam: BAL, w: 700 });
    s += L(gx - 4.6, ya, gx + gw + 2, ya, INK, .35) + head(gx - 5.6, ya, 180, INK, 1.9) + head(gx + gw + 3, ya, 0, INK, 1.9);
    s += T(gx - 5.4, ya + 5, "ক", { a: "middle", fs: 3.4 }) + T(gx + gw + 5.2, ya + 3.6, "খ", { a: "middle", fs: 3.4 });
    s += `<rect x=".4" y="${f2(gy + gh / 2 - 19)}" width="7" height="38" rx=".6" fill="#fff" stroke="${INK}" stroke-width=".4"/>`;
    s += `<rect x="${f2(gx + gw / 2 - 23)}" y="${f2(yb)}" width="46" height="7" rx=".6" fill="#fff" stroke="${INK}" stroke-width=".4"/>`;
    H = yb + 7.6;
  }
  const W = gx + gw + 7.5;
  return `<svg class="c4p111-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${s}</svg>`;
}
function sqSvg({ cols = 12, rows = 12, cell = 6 }) {
  const W = cols * cell, H = rows * cell;
  let s = `<rect x=".3" y=".3" width="${W}" height="${H}" fill="#fff"/>`;
  for (let i = 0; i <= cols; i++) s += L(.3 + i * cell, .3, .3 + i * cell, .3 + H, i % cols === 0 ? INK : "#64748B", i % cols === 0 ? .45 : .22);
  for (let j = 0; j <= rows; j++) s += L(.3, .3 + j * cell, .3 + W, .3 + j * cell, j % rows === 0 ? INK : "#64748B", j % rows === 0 ? .45 : .22);
  return `<svg class="c4p111-svg" width="${f2(W + .6)}mm" height="${f2(H + .6)}mm" viewBox="0 0 ${f2(W + .6)} ${f2(H + .6)}">${s}</svg>`;
}
// p174: "ওভার প্রতি রান", a column chart drawn like a spreadsheet's (gridlines every 2 runs)
function runsSvg(b) {
  const W = b.w || 132, k = b.k || 2.55, top = 11, left = 11, right = W - 4, n = b.bars.length, bottom = top + 16 * k, step = (right - left) / n;
  let s = `<rect x=".3" y=".3" width="${f2(W - .6)}" height="${f2(bottom + 9.6)}" fill="#fff" stroke="#94A3B8" stroke-width=".4"/>` + T(W / 2, 6.6, b.title, { a: "middle", fs: 3.8, w: 700 });
  for (let v = 0; v <= 16; v += 2) s += L(left, bottom - v * k, right, bottom - v * k, v ? "#CBD5E1" : "#64748B", v ? .3 : .4) + T(left - 2, bottom - v * k + 1.2, bnd(v), { a: "end", fs: 3.2, fam: BAL, w: 600 });
  b.bars.forEach(([name, v], i) => {
    const cx = left + (i + .5) * step, bw = step * .36;
    s += `<rect x="${f2(cx - bw / 2)}" y="${f2(bottom - v * k)}" width="${f2(bw)}" height="${f2(v * k)}" fill="#4F7BD0" stroke="#3A5FA8" stroke-width=".25"/>`;
    s += T(cx, bottom + 5.6, name, { a: "middle", fs: 3.3, w: 600 });
  });
  const H = bottom + 10.2;
  return `<svg class="c4p111-svg" width="${W}mm" height="${f2(H)}mm" viewBox="0 0 ${W} ${f2(H)}">${s}</svg>`;
}

// ── tables with a caption; a cell { t: n } holds n tally marks ──
function tabHtml(b, ctx, page) {
  const cell = (c0, th) => {
    const c = c0 && typeof c0 === "object" ? c0 : { c: c0 };
    const inner = c.t != null ? ctx.blockHtml({ kind: "p115_tally", n: c.t, h: b.th || 6 }, page) : mdx(ctx, c.c ?? "");
    const tag = th ? "th" : "td";
    return `<${tag}${c.span ? ` colspan="${c.span}"` : ""}${c.rs ? ` rowspan="${c.rs}"` : ""}${c.align ? ` style="text-align:${c.align}"` : ""}${c.t != null ? ` class="c4p111-ty"` : ""}>${inner}</${tag}>`;
  };
  const cols = b.cols ? `<colgroup>${b.cols.map((w) => `<col style="width:${w}">`).join("")}</colgroup>` : "";
  const hd = b.head ? `<thead><tr>${b.head.map((h) => cell(h, true)).join("")}</tr></thead>` : "";
  const rows = b.rows.map((r) => `<tr style="height:${b.rh || 8}mm">${r.map((c) => cell(c)).join("")}</tr>`).join("");
  const table = `<table class="c4p111-tab tone-${b.tone || "blue"}${b.left ? " c4p111-left" : ""}" style="${b.fs ? `font-size:${b.fs}pt;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}">${cols}${hd}<tbody>${rows}</tbody></table>`;
  return `<div class="c4p111-tw" style="${b.w ? `width:${b.w}mm;` : ""}">${b.cap ? `<div class="c4p111-cap">${mdx(ctx, b.cap)}</div>` : ""}${table}</div>`;
}

// ── p169: the zoo, drawn: fenced pens holding their animals (the counts matter: the children tally them) ──
const FENCE = (w) => { let s = ""; for (let x = 1; x < w; x += 3.2) s += `<rect x="${f2(x)}" y="0" width="1.3" height="4.2" rx=".4" fill="#B45309" stroke="#78350F" stroke-width=".18"/>`; return `<svg class="c4p111-fence" width="${w}mm" height="4.4mm" viewBox="0 0 ${w} 4.4"><rect x="0" y="1" width="${w}" height=".8" fill="#92400E"/><rect x="0" y="2.8" width="${w}" height=".8" fill="#92400E"/>${s}</svg>`; };
function zooHtml(b, ctx) {
  const pw = b.pw || 50;
  return `<div class="c4p111-zoo" style="grid-template-columns:repeat(${b.cols || 3}, ${pw}mm)">${b.pens.map((p) => `<div class="c4p111-pen" style="background:${p.ground || "#E9F7D9"}">
    <div class="c4p111-pin">${ctx.objsHtml({ sticker: p.s, emoji: p.e, n: p.n, perRow: p.perRow || p.n, size: p.size || 10, gap: p.gap ?? 1.2 })}</div>${FENCE(pw)}</div>`).join("")}</div>`;
}

module.exports = {
  kinds: {
    c4p111_mugs: (b) => `<div class="c4p111-c">${mugsSvg(b)}</div>`,
    c4p111_glasses: (b) => `<div class="c4p111-c${b.left ? " l" : ""}">${glassesSvg(b)}</div>`,
    c4p111_pvdec: () => `<div class="c4p111-c l">${pvdecSvg()}</div>`,
    c4p111_ruler: (b) => `<div class="c4p111-c">${rulerSvg(b)}</div>`,
    c4p111_nline: (b) => `<div class="c4p111-c${b.left ? " l" : ""}">${nlineSvg(b)}</div>`,
    c4p111_dgrid: (b) => dgridSvg(b),
    /** { rows: [{ m: "v"|"x", op, i, f, dot }], ans: { m, i, f, dot } | null, box: true (a box under the line), size } */
    c4p111_dsum: (b, ctx) => {
      const iw = Math.max(1, ...[...b.rows, b.ans || {}].map((r) => [...(r.i || "")].length));
      const row = (r, last, ans) => {
        const k = `${last ? " ln" : ""}${ans ? " an" : ""}`;
        return `<span class="m">${r.m === "v" ? TICK : r.m === "x" ? CROSS : ""}</span><span class="o${k}">${esc(r.op || "")}</span><span class="i${k}">${[...(r.i || "")].map((d) => `<i>${esc(d)}</i>`).join("")}</span><span class="d${k}">${r.dot === false || (!r.f && r.dot !== true) ? "" : "."}</span><span class="f${k}">${esc(r.f || "")}</span>`;
      };
      const rows = b.rows.map((r, i) => row(r, i === b.rows.length - 1)).join("");
      const ans = b.box ? `<span class="m"></span><span class="bx"><span class="abox c4p111-dbx"></span></span>` : b.ans ? row(b.ans, false, true) : `<span class="sp"></span>`;
      return `<div class="c4p111-ds" style="--iw:${iw};${b.size ? `font-size:${b.size}pt` : ""}">${rows}${ans}</div>`;
    },
    c4p111_bars: (b) => `<div class="c4p111-c${b.left ? " l" : ""}">${barsSvg(b)}</div>`,
    c4p111_sq: (b) => `<div class="c4p111-c${b.left ? " l" : ""}">${sqSvg(b)}</div>`,
    c4p111_runs: (b) => `<div class="c4p111-c">${runsSvg(b)}</div>`,
    c4p111_tab: (b, ctx, page) => tabHtml(b, ctx, page),
    c4p111_zoo: (b, ctx) => `<div class="c4p111-c">${zooHtml(b, ctx)}</div>`,
    /** { pic, w, h, labels: [[x%, text]], left: [x%, text], right: [x%, text], from: x% } */
    c4p111_trip: (b, ctx) => {
      const w = b.w || 150, ah = 11, X = (p) => f2(w * p / 100);
      const lab = b.labels.map(([x, t]) => `<span style="left:${x}%">${ctx.esc(t)}</span>`).join("");
      let s = `<path d="M${X(b.from)} .6C${X(b.from - 12)} ${ah - 1} ${X(b.left[0] + 14)} ${ah - .6} ${X(b.left[0])} 2.6" fill="none" stroke="${INK}" stroke-width=".38"/>` + head(+X(b.left[0]), 2.2, -150, INK, 2.1);
      s += `<path d="M${X(b.from)} .6C${X(b.from + 6)} ${ah - 1.5} ${X(b.right[0] - 10)} ${ah - 1} ${X(b.right[0])} 2.6" fill="none" stroke="${INK}" stroke-width=".38"/>` + head(+X(b.right[0]), 2.2, -25, INK, 2.1);
      s += T(+X(b.left[1][0]), 6.6, b.left[1][1], { a: "middle", fs: 3.8, w: 600 }) + T(+X(b.right[1][0]), 6.6, b.right[1][1], { a: "middle", fs: 3.8, w: 600 });
      return `<div class="c4p111-trip" style="width:${w}mm"><div class="c4p111-tl">${lab}</div>${ctx.picHtml({ pic: b.pic, h: b.h || 30, w, fit: "cover", pos: b.pos })}<svg class="c4p111-svg" width="${w}mm" height="${ah}mm" viewBox="0 0 ${w} ${ah}">${s}</svg></div>`;
    },
    /** lines in a grid: { cols: "auto 24mm 1fr", rows: [[cell…]], gap: [row, col] (mm), sum: true (Baloo numbers), size, indent, bw, lw } */
    c4p111_rows: (b, ctx) => `<div class="c4p111-rows${b.sum ? " sum" : ""}" style="grid-template-columns:${b.cols || "auto"};gap:${(b.gap || [1.6, 3])[0]}mm ${(b.gap || [1.6, 3])[1]}mm;${b.size ? `font-size:${b.size}pt;` : ""}${b.indent ? `padding-left:${b.indent}mm;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}${b.lw ? `--lw:${b.lw}mm;` : ""}${b.justify ? `justify-content:${b.justify};` : ""}">${b.rows.flat().map((c) => c && typeof c === "object" ? `<span style="grid-column:span ${c.span || 1};${c.align ? `text-align:${c.align};` : ""}">${mdx(ctx, c.c)}</span>` : `<span>${mdx(ctx, c)}</span>`).join("")}</div>`,
    /** { b: block or [blocks], bw?, lw? } */
    c4p111_x: (b, ctx, page) => { const h = fx((Array.isArray(b.b) ? b.b : [b.b]).map((x) => ctx.blockHtml(x, page)).join("")); return b.bw || b.lw ? `<div class="c4p111-xv" style="${b.bw ? `--bw:${b.bw}mm;` : ""}${b.lw ? `--lw:${b.lw}mm;` : ""}">${h}</div>` : h; },
    /** a box of lines (the book's tinted working boxes): { lines: [text], tone: peach|mint|white, indent, bw } */
    c4p111_wbox: (b, ctx) => `<div class="c4p111-wbox ${b.tone || "peach"}" style="${b.bw ? `--bw:${b.bw}mm;` : ""}${b.w ? `width:${b.w}mm;` : ""}${b.gap != null ? `gap:${b.gap}mm;` : ""}">${b.lines.map((l) => `<div>${mdx(ctx, l)}</div>`).join("")}</div>`,
  },
  css: `
.c4p111-c { display: flex; justify-content: center } .c4p111-c.l { justify-content: flex-start } svg.c4p111-svg { display: block; overflow: visible; flex: none }
.c4p111-xv { display: contents }
.c4p111-th { display: inline-block; width: .62em; height: .62em; fill: currentColor; vertical-align: -.02em; margin-right: .25em }
.c4p111-mk { display: inline-block; width: 4.6mm; height: 4.6mm; vertical-align: -.8mm }
.c4p111-wb { display: inline-block; width: var(--bw, 20mm); height: 7.4mm; vertical-align: -2.2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
.c4p111-lb { display: inline-block; width: var(--lw, 62mm); height: 7.4mm; vertical-align: -2.2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
.c4p111-rows { display: grid; align-items: center; justify-content: start; font: 500 12.5pt/1.4 'Noto Sans Bengali' } .c4p111-rows.sum { font: 700 13pt/1.5 'Baloo Da 2' }
.c4p111-rows > span { white-space: nowrap }
/* decimal sums in columns */
.c4p111-ds { display: inline-grid; grid-template-columns: 5.4mm 1.1em calc(var(--iw) * .62em) .42em .7em; align-items: end; font: 800 14pt/1.45 'Baloo Da 2'; color: ${INK}; padding: 0 1mm }
.c4p111-ds > span { height: 1.45em } .c4p111-ds .m { display: flex; align-items: center; justify-content: center } .c4p111-ds .o { color: #DC2626; text-align: center }
.c4p111-ds .i { display: flex; justify-content: flex-end } .c4p111-ds .i i { font-style: normal; width: .62em; text-align: center } .c4p111-ds .d { text-align: center } .c4p111-ds .f { text-align: left }
.c4p111-ds .ln { border-bottom: .5mm solid ${INK} } .c4p111-ds .an { color: #C2410C }
.c4p111-ds .bx { grid-column: 2 / span 4; height: auto; display: flex; justify-content: flex-end; padding-top: 1mm } .c4p111-dbx { width: 15mm; height: 7mm; margin: 0 }
.c4p111-ds .sp { grid-column: 1 / -1; height: 2.4mm }
/* tables */
.c4p111-tw { display: flex; flex-direction: column; align-items: stretch; gap: 1mm; align-self: center }
.c4p111-cap { text-align: center; font: 700 12pt/1.3 'Noto Sans Bengali'; color: var(--d) }
.c4p111-tab { width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0; border: .6mm solid var(--tc); border-radius: 3mm; overflow: hidden; background: #fff; font: 700 12pt/1.3 'Baloo Da 2' }
.c4p111-tab th { background: var(--tc); color: #fff; font: 700 11pt/1.25 'Baloo Da 2'; padding: 1.2mm 1mm .8mm; border-left: .3mm solid rgba(255,255,255,.5) } .c4p111-tab th:first-child { border-left: 0 }
.c4p111-tab td { text-align: center; vertical-align: middle; padding: 1.3mm 1.2mm 0; border-top: .3mm solid var(--tl); border-left: .3mm solid var(--tl); background: var(--tb) } .c4p111-tab td:first-child { border-left: 0 }
.c4p111-tab tbody tr:first-child td { border-top: 0 } .c4p111-tab.c4p111-left td { text-align: left }
.c4p111-tab td.c4p111-ty > * { justify-content: center; margin: 0 auto } .c4p111-tab td .abox { vertical-align: middle }
/* working boxes */
.c4p111-wbox { display: flex; flex-direction: column; gap: 1.6mm; align-self: center; border-radius: 3mm; padding: 2.2mm 5mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.c4p111-wbox.peach { background: #FFF1E6; border: .5mm solid #FDBA74 } .c4p111-wbox.mint { background: #E6F6EE; border: .5mm solid #86EFAC } .c4p111-wbox.white { background: #fff; border: .5mm solid #94A3B8 }
.c4p111-wbox.yellow { background: #FEF3A0; border: .5mm solid #EAB308 } .c4p111-wbox.sky { background: #BAE6FD; border: .5mm solid #38BDF8 }
.c4p111-wbox.pink { background: #FCE7F3; border: .5mm solid #F9A8D4; padding: 1.8mm 3.6mm; font-size: 11.5pt; line-height: 1.35; align-self: stretch }
/* the zoo */
.c4p111-zoo { display: grid; gap: 2.4mm; padding: 2.6mm; background: linear-gradient(#D9F99D, #BBF7D0); border: .7mm solid var(--c); border-radius: 4mm; box-shadow: 0 1.2mm 0 var(--s) }
.c4p111-pen { position: relative; display: flex; flex-direction: column; justify-content: flex-end; border-radius: 2mm; overflow: hidden; border: .4mm solid #B45309 }
.c4p111-pin { flex: 1; display: flex; align-items: center; justify-content: center; padding: 1.2mm 1mm .4mm } svg.c4p111-fence { display: block }
/* p120's picture with its names and arrows */
.c4p111-trip { align-self: center; display: flex; flex-direction: column } .c4p111-tl { position: relative; height: 6.4mm }
.c4p111-tl span { position: absolute; top: 0; transform: translateX(-50%); white-space: nowrap; font: 700 11.5pt 'Noto Sans Bengali'; color: var(--d) }
`,
};
