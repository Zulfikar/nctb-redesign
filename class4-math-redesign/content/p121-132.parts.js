// Printed pages 121–132's own kinds (chapter ৯ পরিমাপ: length, perimeter, weight, liquid volume, the start of area),
// prefixed c4p121_, every class c4p121-. Written by a helper (23 Nov 2026).
// Everything whose length, size or count matters is drawn here by code:
//   - the ruler (p123) at true size (1 cm = 10 mm on the page), its Bangla digits as printed, the pencil laid along it;
//   - the rectangle and the square of p125 at true size (5 × 3 cm, 4 × 4 cm), the 1 cm square of p131 at true size;
//   - the shapes of pp130–131 at the book's own sizes, and the squared paper of p132 with exactly the book's squares.
// Extra markup in the texts of these kinds (and in any core block wrapped in c4p121_x): ∴ is drawn as three dots (the
// fonts' glyph is tiny), ▭ is a wider answer box (its width is --bw, 24 mm unless the kind sets bw).
//
//   c4p121_x       { b }                                    renders a block (or a list) with the markup above
//   c4p121_units   { heads: [..4], rows: [{ at, l, r, c }] } p121's table of length units: each fact a coloured bar over two
//                                                           columns, its "=" on the line between them
//   c4p121_steps   { rows: [[l, r] | { l, r, eq } | { line: true }], indent, left?, size?, bw?, gap? }
//                                                           worked steps lined up at "=" (eq: "" for a row without one);
//                                                           left: the left column starts flush (for "(১) …" items)
//   c4p121_ucol    { items: [{ mark?, top?, rows: [[op, a, b]…], res?, ansH? }], cols, size? }
//                                                           sums with units written in columns ("৩৬০ মি" under "৫৭৫ মি")
//   c4p121_ruler   { cm, pencil }                           p123: a true-size ruler (ticks along its top edge, Bangla
//                                                           digits, "সেমি" under ০) with a pencil from ০ to `pencil` cm
//   c4p121_rects   { items: [{ label?, w, h, fill, left?, bottom?, inside? }], gap? }
//                                                           rectangles at true size (mm) with their sides' lengths on
//                                                           dashed arcs (p125, p131)
//   c4p121_shapes  { items: [{ label?, w, h, fill, tiles?: [n, tw, th] }], gap? }   pp130–131's shapes, bottoms in a line
//   c4p121_overlay { a: [w, h, fill], b: [w, h, fill], mix } p130: ক laid on খ, and the two pieces left over moved aside
//   c4p121_grid    { cols, rows, s, fills, polys, texts, arrows, paths, below? }   squared paper with exactly the book's
//                                                           squares (coordinates in squares from the top-left)
//   c4p121_beaker  { h }                                    p129: an empty measuring beaker with its marks
//   c4p121_scene   { pic, w, h, arrows: [{ p0, p1, p2 }], tags: [{ x, y, text, rot }] }   p124: a picture with the
//                                                           distances drawn on it by code (points in % of the picture)
//   c4p121_box     { text, align?, w? }                     the book's rounded yellow boxes with a [bracketed] note
//   c4p121_panel   { tone: lime|green, body: [blocks], center? }   p124: the tinted panels of the worked sum
//   c4p121_fig     { items: [{ b: block, cap }], gap?, justify? }  things in a row, each with its caption under it
//   c4p121_exr     { ex, mark, body }                       an exercise with no heading line: its marker beside the body
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const escx = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const THEREFORE = `<svg class="c4p121-th" viewBox="0 0 10 10"><circle cx="5" cy="1.7" r="1.45"/><circle cx="1.6" cy="8.3" r="1.45"/><circle cx="8.4" cy="8.3" r="1.45"/></svg>`;
const fix = (html) => String(html).replace(/∴\s?/g, THEREFORE).replace(/▭/g, `<span class="c4p121-wb"></span>`);
const mdx = (ctx, s) => fix(ctx.md(s == null ? "" : String(s)));

// ── p123: the ruler and the pencil ──
// a pencil lying left to right from x0 to x0 + L (the book's: a pink eraser, a blue band, a yellow-orange body)
function pencilG(x0, cy, L, t) {
  const y0 = cy - t / 2, y1 = cy + t / 2, er = t * 1.05, band = t * .85, cone = t * 1.9, tip = cone * .34;
  const xe = x0 + er, xb = xe + band, xc = x0 + L - cone, xt = x0 + L - tip, k = t * .17;
  return `<g stroke="#7C2D12" stroke-width="${f2(t * .06)}" stroke-linejoin="round">
    <path d="M${f2(xe)} ${f2(y0)}H${f2(x0 + t * .45)}Q${f2(x0)} ${f2(y0)} ${f2(x0)} ${f2(cy)}Q${f2(x0)} ${f2(y1)} ${f2(x0 + t * .45)} ${f2(y1)}H${f2(xe)}Z" fill="#F87171"/>
    <rect x="${f2(xe)}" y="${f2(y0)}" width="${f2(band)}" height="${f2(t)}" fill="#7DD3FC"/><path d="M${f2(xe + band * .5)} ${f2(y0)}V${f2(y1)}" stroke="#0284C7" stroke-width="${f2(t * .14)}"/>
    <path d="M${f2(xb)} ${f2(y0)}H${f2(xc)}L${f2(xc)} ${f2(y1)}H${f2(xb)}Z" fill="#FBBF24"/>
    <path d="M${f2(xb + .2)} ${f2(y0 + t * .1)}H${f2(xc - .3)}V${f2(y0 + t * .36)}H${f2(xb + .2)}Z" fill="#F59E0B" stroke="none"/>
    <path d="M${f2(xb + .2)} ${f2(y1 - t * .3)}H${f2(xc - .3)}V${f2(y1 - t * .08)}H${f2(xb + .2)}Z" fill="#FDE68A" stroke="none"/>
    <path d="M${f2(xc)} ${f2(y0)}L${f2(xt)} ${f2(cy - k)}V${f2(cy + k)}L${f2(xc)} ${f2(y1)}Z" fill="#FDBA74"/>
    <path d="M${f2(xt)} ${f2(cy - k)}L${f2(x0 + L)} ${f2(cy)}L${f2(xt)} ${f2(cy + k)}Z" fill="#1E293B"/></g>`;
}
function rulerSvg({ cm = 13, pencil }, ctx) {
  const pad = 4, ox = 1, X = (v) => ox + pad + v * 10, t = 6.4, yP = pencil != null ? 2.6 : 0, cyP = yP + t / 2, yR = yP + (pencil != null ? t + 2.2 : 0), rh = 14;
  const W = ox * 2 + cm * 10 + pad * 2, H = yR + rh + .6;
  let s = `<rect x="${ox}" y="${f2(yR)}" width="${cm * 10 + pad * 2}" height="${rh}" rx="1.3" fill="#FDE047" stroke="#CA8A04" stroke-width=".45"/>
    <rect x="${ox + .6}" y="${f2(yR + rh * .7)}" width="${cm * 10 + pad * 2 - 1.2}" height="${f2(rh * .26)}" rx=".8" fill="#FACC15" opacity=".55"/>`;
  for (let i = 0; i <= cm * 10; i++) {
    const isCm = i % 10 === 0, isHalf = i % 5 === 0;
    s += `<path d="M${f2(X(i / 10))} ${f2(yR)}v${isCm ? 4.6 : isHalf ? 3.3 : 2}" stroke="${INK}" stroke-width="${isCm ? .4 : .22}"/>`;
    if (isCm && i < cm * 10) s += `<text x="${f2(X(i / 10))}" y="${f2(yR + 8.6)}" text-anchor="middle" class="c4p121-rn">${ctx.bn(i / 10)}</text>`;
  }
  s += `<text x="${f2(X(0) + .2)}" y="${f2(yR + 12.4)}" class="c4p121-ru">সেমি</text>`;
  if (pencil != null) {
    s += pencilG(X(0), cyP, pencil * 10, t);
    for (const v of [0, pencil]) s += `<path d="M${f2(X(v))} ${f2(yP - 1.6)}V${f2(yR + 4.6)}" stroke="${INK}" stroke-width=".3"/>`;
  }
  return `<svg class="c4p121-svg" width="${f2(W)}mm" height="${f2(H + 1.6)}mm" viewBox="0 -1.6 ${f2(W)} ${f2(H + 1.6)}">${s}</svg>`;
}

// ── a rectangle with its sides' lengths written on dashed arcs (the book's way) ──
function rectSvg(it, ctx) {
  const { w, h, fill = "#FEF9C3", left, bottom, inside, ink = INK } = it, bl = it.bul ?? Math.min(7, Math.max(2.4, h * .16)), bb = it.bulb ?? Math.min(6, Math.max(2.4, w * .12));
  const fs = it.fs || 4.2, lw = left ? [...left].length * fs * .48 + 2 : 0;
  const x0 = lw + bl + 1.5, y0 = 1, x1 = x0 + w, y1 = y0 + h, H = y1 + (bottom ? bb + fs + 2.6 : 1), W = x1 + 1.5;
  let s = `<rect x="${f2(x0)}" y="${f2(y0)}" width="${w}" height="${h}" fill="${fill}" stroke="${INK}" stroke-width=".4"/>`;
  if (left) s += `<path d="M${f2(x0 - 1.2)} ${f2(y0)}Q${f2(x0 - 1.2 - bl * 2)} ${f2((y0 + y1) / 2)} ${f2(x0 - 1.2)} ${f2(y1)}" fill="none" stroke="${INK}" stroke-width=".35" stroke-dasharray="2 1.4"/>
    <text x="${f2(x0 - 1.2 - bl - 1.2)}" y="${f2((y0 + y1) / 2 + fs * .34)}" text-anchor="end" class="c4p121-dl" font-size="${fs}">${escx(left)}</text>`;
  if (bottom) s += `<path d="M${f2(x0)} ${f2(y1 + 1.2)}Q${f2((x0 + x1) / 2)} ${f2(y1 + 1.2 + bb * 2)} ${f2(x1)} ${f2(y1 + 1.2)}" fill="none" stroke="${INK}" stroke-width=".35" stroke-dasharray="2 1.4"/>
    <text x="${f2((x0 + x1) / 2)}" y="${f2(y1 + 1.2 + bb + fs + .6)}" text-anchor="middle" class="c4p121-dl" font-size="${fs}">${escx(bottom)}</text>`;
  if (inside) { const n = inside.length, ifs = it.ifs || 2.3; inside.forEach((line, i) => { s += `<text x="${f2((x0 + x1) / 2)}" y="${f2((y0 + y1) / 2 + (i - (n - 1) / 2) * ifs * 1.25 + ifs * .34)}" text-anchor="middle" class="c4p121-dl" font-size="${ifs}" style="fill:${ink}">${escx(line)}</text>`; }); }
  return `<svg class="c4p121-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${s}</svg>`;
}

// ── squared paper: { cols, rows, s (mm a square), fills: [[x, y, w, h, colour]], polys: [[[x, y]…], colour],
//    texts: [[x, y, text, { size (× s), anchor, color, weight }]], arrows: [[x1, y1, x2, y2]], paths: [[d (in squares), dashed]] } ──
const GC = { blue: "#6E92D8", magenta: "#D45AA8", red: "#F26363", orange: "#F0784F", pink: "#F785A4", sky: "#B3BFE2" };
function gridSvg(b) {
  const s = b.s, W = b.cols * s, Hg = b.rows * s, H = Hg + (b.below || 0), P = (v) => f2(v * s), pad = .5;
  let g = `<rect x="0" y="0" width="${P(b.cols)}" height="${P(b.rows)}" fill="#fff"/>`;
  for (const [x, y, w, h, c] of b.fills || []) g += `<rect x="${P(x)}" y="${P(y)}" width="${P(w)}" height="${P(h)}" fill="${GC[c] || c}"/>`;
  for (const [pts, c] of b.polys || []) g += `<path d="M${pts.map(([x, y]) => `${P(x)} ${P(y)}`).join("L")}Z" fill="${GC[c] || c}"/>`;
  let lines = "";
  for (let i = 0; i <= b.cols; i++) lines += `M${P(i)} 0V${P(b.rows)}`;
  for (let j = 0; j <= b.rows; j++) lines += `M0 ${P(j)}H${P(b.cols)}`;
  g += `<path d="${lines}" stroke="${INK}" stroke-width="${b.lw || .3}" fill="none"/>`;
  for (const [d, dashed] of b.paths || []) g += `<path d="${d.replace(/-?\d+(\.\d+)?/g, (m) => P(+m))}" fill="none" stroke="${INK}" stroke-width=".3"${dashed ? ` stroke-dasharray="1.2 .9"` : ""}/>`;
  for (const [x1, y1, x2, y2] of b.arrows || []) {
    const a = Math.atan2(P(y2) - P(y1), P(x2) - P(x1)), hx = +P(x2), hy = +P(y2), L = 1.8, Wd = .8;
    g += `<path d="M${P(x1)} ${P(y1)}L${f2(hx - L * .7 * Math.cos(a))} ${f2(hy - L * .7 * Math.sin(a))}" stroke="${INK}" stroke-width=".4"/>
      <path d="M${f2(hx)} ${f2(hy)}L${f2(hx - L * Math.cos(a) + Wd * Math.sin(a))} ${f2(hy - L * Math.sin(a) - Wd * Math.cos(a))}L${f2(hx - L * Math.cos(a) - Wd * Math.sin(a))} ${f2(hy - L * Math.sin(a) + Wd * Math.cos(a))}Z" fill="${INK}"/>`;
  }
  for (const [x, y, t, o = {}] of b.texts || []) g += `<text x="${P(x)}" y="${P(y)}" text-anchor="${o.anchor || "middle"}" class="c4p121-gt" font-size="${f2((o.size || .42) * s)}" fill="${o.color || INK}"${o.weight ? ` font-weight="${o.weight}"` : ""}>${escx(t)}</text>`;
  return `<svg class="c4p121-svg" width="${f2(W + pad * 2)}mm" height="${f2(H + pad * 2)}mm" viewBox="${-pad} ${-pad} ${f2(W + pad * 2)} ${f2(H + pad * 2)}">${g}</svg>`;
}

// ── p129: an empty measuring beaker (a spout on the left, the marks on the right) ──
function beakerSvg(h) {
  const VW = 44, VH = 40;
  let s = `<path d="M5 3.5Q3 3.5 3.6 5.2L6.4 6.6V36.4Q6.4 38.6 8.6 38.6H35.4Q37.6 38.6 37.6 36.4V5.6Q38.6 4.6 38.6 3.6Z" fill="#F1F5F9" fill-opacity=".7" stroke="#334155" stroke-width=".6" stroke-linejoin="round"/>
    <path d="M9.6 9V35" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>
    <rect x="15.8" y="19" width="7" height="3.4" rx=".5" fill="none" stroke="#475569" stroke-width=".35"/>`;
  for (let i = 0; i <= 10; i++) { const y = 34.6 - i * 2.6; s += `<path d="M37.6 ${f2(y)}H${i % 5 === 0 ? 30.4 : i % 2 === 0 ? 32.2 : 34}" stroke="#334155" stroke-width="${i % 5 === 0 ? .5 : .32}"/>`; }
  return `<svg class="c4p121-svg" width="${f2(h * VW / VH)}mm" height="${h}mm" viewBox="0 0 ${VW} ${VH}">${s}</svg>`;
}

// ── a picture (the user's, or the book's as a stand-in) ──
function picInner(ctx, name) {
  const f = ctx.picFile(name);
  return f ? `<img src="file://${f.file}">${f.old ? `<span class="tag">stand-in</span>` : ""}` : `<div class="ph">ChatGPT: ${escx(name)}.png</div>`;
}
const arrowHead = (x, y, a, L = 2.6, Wd = 1.1, c = "#DC2626") => `<path d="M${f2(x)} ${f2(y)}L${f2(x - L * Math.cos(a) + Wd * Math.sin(a))} ${f2(y - L * Math.sin(a) - Wd * Math.cos(a))}L${f2(x - L * Math.cos(a) - Wd * Math.sin(a))} ${f2(y - L * Math.sin(a) + Wd * Math.cos(a))}Z" fill="${c}"/>`;

module.exports = {
  kinds: {
    c4p121_x: (b, ctx, page) => fix(Array.isArray(b.b) ? b.b.map((x) => ctx.blockHtml(x, page)).join("") : ctx.blockHtml(b.b, page)),
    c4p121_units: (b, ctx) => {
      const n = b.heads.length, TONE = { pink: ["#FECACA", "#F87171"], orange: ["#FED7AA", "#FB923C"], lime: ["#D9F99D", "#84CC16"] };
      const head = `<tr>${b.heads.map((h) => `<th>${mdx(ctx, h)}</th>`).join("")}</tr>`;
      const rows = b.rows.map((r) => { const [bg, bd] = TONE[r.c] || TONE.pink; return `<tr>${"<td></td>".repeat(r.at)}<td colspan="2" class="c4p121-ub" style="--ub:${bg};--ud:${bd}"><span>${mdx(ctx, r.l)}</span><b>=</b><span>${mdx(ctx, r.r)}</span></td>${"<td></td>".repeat(n - r.at - 2)}</tr>`; }).join("");
      return `<table class="c4p121-units">${head}${rows}</table>`;
    },
    c4p121_steps: (b, ctx) => `<div class="c4p121-steps${b.left ? " lf" : ""}" style="margin-left:${b.indent ?? 10}mm;${b.size ? `font-size:${b.size}pt;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}${b.gap != null ? `row-gap:${b.gap}mm;` : ""}">${b.rows.map((r) => {
      if (r.line) return `<i class="c4p121-rule"${r.from ? ` style="grid-column:${r.from} / -1"` : ""}></i>`;
      const o = Array.isArray(r) ? { l: r[0], r: r[1] } : r;
      return `<span class="l">${mdx(ctx, o.l)}</span><b>${escx(o.eq ?? "=")}</b><span class="r">${mdx(ctx, o.r)}</span>`;
    }).join("")}</div>`,
    c4p121_ucol: (b, ctx) => {
      const split = (s) => { const m = String(s ?? "").match(/^([০-৯□▭.]*)\s*(.*)$/); return [m[1], m[2]]; };
      const cell = (v, cls) => `<span class="${cls}">${mdx(ctx, v)}</span>`;
      const row = (r, cls = "") => { const [op, ...rest] = r; return cell(op, `op ${cls}`) + rest.map((x) => { const [n, u] = split(x); return cell(n, `n ${cls}`) + cell(u, `u ${cls}`); }).join(""); };
      const item = (it) => {
        const k = it.rows[0].length - 1, cols = `auto${" auto auto".repeat(k)}`;
        const body = it.rows.map((r, i) => row(r, `${i === it.rows.length - 1 ? "ln" : ""}${i === 0 && it.top ? " top" : ""}`)).join("")
          + (it.res ? row(it.res, "res") : `<i class="c4p121-ua" style="height:${it.ansH ?? 8}mm"></i>`);
        return `<div class="c4p121-uitem">${it.mark ? `<b class="c4p121-um">${escx(it.mark)}</b>` : ""}<div class="c4p121-ug" style="grid-template-columns:${cols}">${body}</div></div>`;
      };
      return `<div class="c4p121-ucols" style="grid-template-columns:repeat(${b.cols || 1}, auto);${b.size ? `font-size:${b.size}pt;` : ""}">${b.items.map(item).join("")}</div>`;
    },
    c4p121_ruler: (b, ctx) => `<div class="c4p121-ruler">${rulerSvg(b, ctx)}</div>`,
    c4p121_rects: (b) => `<div class="c4p121-rects" style="gap:${b.gap ?? 10}mm;justify-content:${b.justify || "space-around"}">${b.items.map((it) => `<div class="c4p121-ri">${it.label ? `<span class="c4p121-lab">${escx(it.label)}</span>` : ""}${rectSvg(it)}</div>`).join("")}</div>`,
    c4p121_shapes: (b) => `<div class="c4p121-rects" style="gap:${b.gap ?? 10}mm;justify-content:${b.justify || "space-around"};align-items:flex-end">${b.items.map((it) => {
      let s = `<rect x=".2" y=".2" width="${it.w}" height="${it.h}" fill="${GC[it.fill] || it.fill}" stroke="${INK}" stroke-width=".35"/>`;
      if (it.tiles) { const [n, tw, th] = it.tiles; for (let i = 0; i < n; i++) s += `<rect x="${f2(.4 + i * (tw + .2))}" y="${f2(it.h + .2 - th - .2)}" width="${tw}" height="${th}" fill="#FEF08A" stroke="${INK}" stroke-width=".3"/>`; }
      return `<div class="c4p121-ri">${it.label ? `<span class="c4p121-lab">${escx(it.label)}</span>` : ""}<svg class="c4p121-svg" width="${f2(it.w + .4)}mm" height="${f2(it.h + .4)}mm" viewBox="0 0 ${f2(it.w + .4)} ${f2(it.h + .4)}">${s}</svg></div>`;
    }).join("")}</div>`,
    // p130: ক (a) laid on খ (b), their bottom-left corners together; then ক's strip above খ and the piece of খ that ক
    // doesn't cover are moved to the right (the piece turned a quarter), with arrows, as the book draws them
    c4p121_overlay: (b) => {
      const [aw, ah, ac] = b.a, [bw, bh, bc] = b.b, top = ah - bh, gap = b.gap || 26, x2 = bw + gap, pw = bw - aw;
      const W = x2 + Math.max(aw, bh) + 1, H = ah + 1;
      const r = (x, y, w, h, c) => `<rect x="${f2(x + .4)}" y="${f2(y + .4)}" width="${f2(w)}" height="${f2(h)}" fill="${GC[c] || c}" stroke="${INK}" stroke-width=".35"/>`;
      const arr = (x1, x2b, y) => `<path d="M${f2(x1)} ${f2(y)}H${f2(x2b - 2)}" stroke="${INK}" stroke-width=".4"/>${arrowHead(x2b, y, 0, 2.2, .9, INK)}`;
      const s = r(0, top, bw, bh, bc) + r(0, 0, aw, ah, ac) + r(0, top, aw, bh, b.mix) + r(x2, 0, aw, top, ac) + r(x2, top + 1.2, bh, pw, bc)
        + arr(aw + 4, x2 - 1.5, top / 2 + .4) + arr(bw + 3, x2 - 1.5, top + 1.2 + pw / 2 + .4);
      return `<div class="c4p121-ovl"><svg class="c4p121-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${s}</svg></div>`;
    },
    c4p121_grid: (b) => `<div class="c4p121-gridw">${gridSvg(b)}</div>`,
    c4p121_beaker: (b) => `<div class="c4p121-bk">${beakerSvg(b.h || 26)}</div>`,
    // p124: the scene, with the two distances drawn on it (red curved arrows from the hospital, and their lengths)
    c4p121_scene: (b, ctx) => {
      const W = b.w, H = b.h, X = (p) => p[0] / 100 * W, Y = (p) => p[1] / 100 * H;
      let s = "";
      for (const a of b.arrows) {
        const [x0, y0, x1, y1, x2, y2] = [X(a.p0), Y(a.p0), X(a.p1), Y(a.p1), X(a.p2), Y(a.p2)], ang = Math.atan2(y2 - y1, x2 - x1);
        s += `<path d="M${f2(x0)} ${f2(y0)}Q${f2(x1)} ${f2(y1)} ${f2(x2 - 1.6 * Math.cos(ang))} ${f2(y2 - 1.6 * Math.sin(ang))}" fill="none" stroke="#DC2626" stroke-width=".7"/>${arrowHead(x2, y2, ang)}<circle cx="${f2(x0)}" cy="${f2(y0)}" r=".9" fill="#DC2626"/>`;
      }
      const tags = (b.tags || []).map((t) => `<span class="c4p121-stag" style="left:${t.x}%;top:${t.y}%;${t.rot ? `transform:translate(-50%, -50%) rotate(${t.rot}deg)` : ""}">${mdx(ctx, t.text)}</span>`).join("");
      return `<div class="c4p121-scene" style="width:${W}mm;height:${H}mm">${picInner(ctx, b.pic)}<svg class="c4p121-svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${s}</svg>${tags}</div>`;
    },
    c4p121_box: (b, ctx) => `<div class="c4p121-box" style="text-align:${b.align || "center"};${b.w ? `width:${b.w}mm;` : ""}">${mdx(ctx, b.text)}</div>`,
    c4p121_panel: (b, ctx, page) => `<div class="c4p121-panel ${b.tone || "lime"}${b.center ? " ctr" : ""}">${b.body.map((x) => typeof x === "string" ? `<p>${mdx(ctx, x)}</p>` : fix(ctx.blockHtml(x, page))).join("")}</div>`,
    c4p121_exr: (b, ctx, page) => `<div class="ex m-${b.mark}"><div class="c4p121-exr">${ctx.exMark(b.mark, b.ex)}<div class="c4p121-exb">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div></div></div>`,
    c4p121_fig: (b, ctx, page) => `<div class="c4p121-figs" style="gap:${b.gap ?? 4}mm;justify-content:${b.justify || "space-around"}">${b.items.map((it) => `<figure class="c4p121-fg"><div class="c4p121-fgp">${ctx.blockHtml(it.b, page)}</div>${it.cap ? `<figcaption>${mdx(ctx, it.cap)}</figcaption>` : ""}</figure>`).join("")}</div>`,
  },
  css: `
.c4p121-svg { display: block; overflow: visible }
.c4p121-th { display: inline-block; width: .56em; height: .56em; fill: currentColor; vertical-align: -.02em; margin-right: .18em }
.c4p121-wb { display: inline-block; width: var(--bw, 24mm); height: 7.6mm; vertical-align: -2.2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
.c4p121-units { width: 100%; table-layout: fixed; border: .6mm solid #0EA5E9; border-radius: 3.4mm; overflow: hidden; background: #fff }
.c4p121-units th { background: #0EA5E9; color: #fff; font: 700 11pt/1.25 'Baloo Da 2'; padding: 1.4mm 1mm 1mm; border-left: .3mm solid rgba(255,255,255,.5) } .c4p121-units th:first-child { border-left: 0 }
.c4p121-units td { height: 9.4mm; border-top: .3mm solid #BAE6FD; border-left: .3mm solid #BAE6FD; padding: 0 } .c4p121-units td:first-child { border-left: 0 }
.c4p121-units td.c4p121-ub { position: relative; background: var(--ub); box-shadow: inset 0 0 0 .45mm var(--ud); font: 700 12.5pt 'Baloo Da 2'; color: ${INK} }
.c4p121-ub span { display: inline-block; width: 50%; text-align: center; padding-top: .6mm }
.c4p121-ub b { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 6.4mm; height: 6.4mm; border-radius: 50%; background: #fff; border: .45mm solid var(--ud); font: 800 12pt/6.2mm 'Baloo Da 2'; text-align: center; color: #DC2626 }
.c4p121-steps { display: grid; grid-template-columns: auto auto auto; justify-content: start; align-self: flex-start; align-items: center; column-gap: 2.2mm; row-gap: 1.1mm; font: 600 12.5pt/1.5 'Noto Sans Bengali' }
.c4p121-steps .l { text-align: right; white-space: nowrap } .c4p121-steps.lf .l { text-align: left } .c4p121-steps .r { white-space: nowrap }
.c4p121-steps > b { color: #DC2626; font: 800 13pt 'Baloo Da 2' }
.c4p121-rule { grid-column: 1 / -1; height: 0; border-top: .5mm solid ${INK}; margin: .2mm 0 }
.c4p121-ucols { display: grid; justify-content: space-between; column-gap: 6mm; row-gap: 2mm; font: 600 12.5pt/1.55 'Noto Sans Bengali' }
.c4p121-uitem { display: flex; align-items: flex-start; gap: 2mm } .c4p121-um { font: 700 12.5pt/1.55 'Noto Sans Bengali'; color: #EA580C }
.c4p121-ug { display: grid; column-gap: 0; align-items: stretch }
.c4p121-ug > span { display: flex; align-items: center; white-space: nowrap; padding: .3mm 0 .1mm } .c4p121-ug .op { color: #DC2626; font-weight: 700; padding-right: 2.6mm; justify-content: center } .c4p121-ug .n { justify-content: flex-end; padding-left: 4mm } .c4p121-ug .op + .n { padding-left: 0 }
.c4p121-ug .u { padding-left: 1.4mm } .c4p121-ug .ln { border-bottom: .5mm solid ${INK} } .c4p121-ug .top { color: #C2410C } .c4p121-ug .res { color: #1E3A8A; padding-top: .8mm }
.c4p121-ua { grid-column: 1 / -1; display: block }
.c4p121-ruler { display: flex; justify-content: center }
.c4p121-rn { font: 600 4.2px 'Baloo Da 2'; fill: ${INK} } .c4p121-ru { font: 600 2.9px 'Noto Sans Bengali'; fill: ${INK} }
.c4p121-dl { font-family: 'Noto Sans Bengali'; font-weight: 600; fill: ${INK} }
.c4p121-rects { display: flex; align-items: flex-start }
.c4p121-ri { display: flex; align-items: flex-start; gap: 1.4mm } .c4p121-lab { font: 700 12.5pt 'Noto Sans Bengali'; color: var(--d) }
.c4p121-ovl { display: flex; justify-content: center }
.c4p121-gridw { display: flex; justify-content: center } .c4p121-gt { font-family: 'Noto Sans Bengali'; font-weight: 600 }
.c4p121-bk { display: flex; justify-content: center }
.c4p121-scene { position: relative; align-self: center; border-radius: 4mm; overflow: hidden; border: .9mm solid #fff; box-shadow: 0 0 0 .7mm var(--c), 0 1.6mm 0 .7mm var(--s); flex: none }
.c4p121-scene > img { width: 100%; height: 100%; object-fit: cover; display: block }
.c4p121-scene > svg { position: absolute; left: 0; top: 0 }
.c4p121-stag { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; font: 700 11pt/1 'Noto Sans Bengali'; color: #991B1B; background: rgba(255,255,255,.88); border: .4mm solid #DC2626; border-radius: 1.6mm; padding: .8mm 2mm .6mm }
.c4p121-box { align-self: center; background: #FEF9C3; border: .6mm solid #CA8A04; border-radius: 5mm; padding: 2mm 4.4mm 1.6mm; font: 600 12pt/1.5 'Noto Sans Bengali'; box-shadow: 0 1mm 0 #FDE68A }
.c4p121-panel { display: flex; flex-direction: column; justify-content: center; gap: 1.4mm; border-radius: 3mm; padding: 2mm 4mm; height: 100% }
.c4p121-panel.lime { background: #F7FEE7; border: .5mm solid #BEF264 } .c4p121-panel.green { background: #DCFCE7; border: .5mm solid #4ADE80; align-items: center; text-align: center }
.c4p121-panel p { font: 600 12.5pt/1.45 'Noto Sans Bengali' }
.c4p121-exr { display: flex; align-items: flex-start; gap: 1.6mm } .c4p121-exb { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2mm }
.c4p121-figs { display: flex; align-items: flex-end }
.c4p121-fg { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 2mm } .c4p121-fg figcaption { font: 700 12pt/1.35 'Noto Sans Bengali'; white-space: nowrap; text-align: center }
.c4p121-fgp { display: flex; align-items: flex-end; justify-content: center }
`,
};
