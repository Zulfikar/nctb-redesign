// Printed pages 171–182's own kinds (অধ্যায় ১০ উপাত্ত বিন্যস্তকরণ), prefixed c5p171_ (classes c5p171-). Written by a helper
// (25 Nov 2026). Every chart is drawn here by code from its data (SVG, units mm), so every bar, point and slice is exact:
//   c5p171_dots   p171: the data as dots stacked over a ruler-like number line (a tall tick at every whole number, four
//                 small ones between, as printed): { from, to, unit (mm a unit), labels: [n…], counts: { n: k }, r? }
//   c5p171_bars   bar charts (স্তম্ভলেখ, p173) and histograms (আয়তলেখ, pp174, 175, 181): the bars at the exact heights of the
//                 data on the book's axis numbers, horizontal grid lines at each step, the y axis's numbers, the names under
//                 the bars (straight or turned), a value over a bar (p173's population), the book's frame, the axis titles
//                 with their arrows outside it and a caption:
//                 { max, step, ph (plot height), bw (bar width), gap (0: a histogram, the bars touch), pad, tail, bars: [{ x,
//                 v, c?, top? }], colors: [c…] (in turn), stroke, grid: "light" | "dark", xrot (deg), xh (room for the names),
//                 xfs, yfs, ytitle, xtitle, cap, frame, fw (frame width, else snug), tl / xl (a title's length, for its arrows) }
//   c5p171_line   line graphs (রেখাচিত্র, pp176, 182) on squared paper: { cols, rows, cell, unit (a row's value), lab (a
//                 number every lab rows), points: [[col, v]…], xlabels: [[col, text]…], xrot, xh, ytitle, xtitle, tl, xl }
//   c5p171_pie    pie charts (পাই চার্ট, pp178–179, 182): each slice share × 360°, clockwise from 12 o'clock as printed:
//                 { r, slices: [{ v (%), c (fill), s? (edge), lab: text | [lines], at? (radius factor), da? (turn the label,
//                 deg), box? (the label on a white tag, p178), fc?, fs? }], around: [{ s: sticker, e: emoji, a (deg), d (mm
//                 from the centre), size }], cap (a caption tag under it), pad }
//   c5p171_rules  the book's boxes of steps (pp174, 177): a coloured title bar, red bullets, a tinted note at the foot
//                 { title, items: [text], note?, tone: "green" | "lime" }
//   c5p171_data   a framed line of the book's data (p171): { text, size? }
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const BN = "০১২৩৪৫৬৭৮৯", bn = (n) => String(n).replace(/\d/g, (d) => BN[d]);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const BEN = "'Noto Sans Bengali'", BAL = "'Baloo Da 2'";
const T = (x, y, s, o = {}) => `<text x="${f2(x)}" y="${f2(y)}" font-family="${o.fam || BEN}" font-weight="${o.w || 600}" font-size="${f2(o.fs || 3.6)}"${o.a ? ` text-anchor="${o.a}"` : ""} fill="${o.fill || INK}"${o.rot ? ` transform="rotate(${o.rot} ${f2(x)} ${f2(y)})"` : ""}>${esc(s)}</text>`;
const L = (x1, y1, x2, y2, c = INK, w = 0.3) => `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}" stroke="${c}" stroke-width="${w}" fill="none"/>`;
const head = (x, y, ang, c = INK, s = 1.9) => { // an arrowhead with its tip at (x, y), pointing along ang (deg, 0 = right, 90 = down)
  const a = ang * Math.PI / 180, p = (k) => `${f2(x - s * Math.cos(a) + k * s * .42 * Math.sin(a))} ${f2(y - s * Math.sin(a) - k * s * .42 * Math.cos(a))}`;
  return `<path d="M${f2(x)} ${f2(y)}L${p(1)}L${p(-1)}Z" fill="${c}"/>`;
};
const svg = (W, H, s, cls = "") => `<svg class="c5p171-svg${cls ? " " + cls : ""}" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${s}</svg>`;
// a Bangla line's width, near enough for the gaps of the arrows around an axis title (a title's own `tl` overrides it)
const est = (s, fs) => { let w = 0; for (const ch of s) w += /[ঁ-ঃ়ু-ৄ্ৢৣ]/.test(ch) ? 0 : /[া-ীে-ৌৗ]/.test(ch) ? .36 : ch === " " ? .3 : .64; return w * fs; };
// the y title, turned to read upwards, centred on x between y0 and y1, an arrow up above it and one down below it (as printed)
function yTitle(x, y0, y1, text, fs = 3.8, tl) {
  const mid = (y0 + y1) / 2, l = tl || est(text, fs), a = mid - l / 2 - 1.8, b = mid + l / 2 + 1.8;
  let s = T(x + fs * .36, mid, text, { a: "middle", fs, rot: -90, w: 700 });
  if (a - y0 > 3.5) s += L(x, a, x, y0 + 1.6, INK, .35) + head(x, y0, -90);
  if (y1 - b > 3.5) s += L(x, b, x, y1 - 1.6, INK, .35) + head(x, y1, 90);
  return s;
}
// the x title centred between x0 and x1 on the line y, an arrow left and one right of it (as printed)
function xTitle(x0, x1, y, text, fs = 3.8, tl) {
  const mid = (x0 + x1) / 2, l = tl || est(text, fs), a = mid - l / 2 - 2.6, b = mid + l / 2 + 2.6;
  return T(mid, y + fs * .36, text, { a: "middle", fs, w: 700 }) + L(a, y, x0 + 1.6, y, INK, .35) + head(x0, y, 180) + L(b, y, x1 - 1.6, y, INK, .35) + head(x1, y, 0);
}
// a name under a bar or a column: straight and centred, or turned (xrot < 0) with its end at the tick
const xName = (x, y, text, rot, fs) => rot ? T(x + fs * .3, y + 1.2, text, { a: "end", fs, rot }) : T(x, y + fs * 1.05, text, { a: "middle", fs });

// ── p171: the dot plot ──
function dotsSvg(b) {
  const u = b.unit || 6, n = b.to - b.from, r = b.r || 1.25, x0 = 3, maxK = Math.max(...Object.values(b.counts)), step = 2 * r + .7;
  const base = maxK * step + 4.6, H = base + 6.4, W = n * u + 6;
  let s = L(x0, base, x0 + n * u, base, INK, .4);
  for (let i = 0; i <= n; i++) {
    const x = x0 + i * u;
    s += L(x, base, x, base - 3.4, INK, .3);
    if (i < n) for (let k = 1; k < 5; k++) s += L(x + k * u / 5, base, x + k * u / 5, base - 1.6, INK, .2);
  }
  for (const v of b.labels || []) s += T(x0 + (v - b.from) * u, base + 4.6, bn(v), { a: "middle", fs: 3.6, fam: BAL, w: 700 });
  for (const [v, k] of Object.entries(b.counts)) for (let j = 0; j < k; j++) s += `<circle cx="${f2(x0 + (v - b.from) * u)}" cy="${f2(base - 3.4 - 1 - r - j * step)}" r="${r}" fill="${b.color || "#1E2433"}"/>`;
  return svg(W, H, s);
}

// ── bar charts and histograms ──
function barsSvg(b) {
  const n = b.bars.length, bw = b.bw || 10, gap = b.gap ?? 6, pad = b.pad ?? (gap ? gap / 2 : 0), tail = b.tail || 0;
  const ph = b.ph || 60, max = b.max, step = b.step, yfs = b.yfs || 3.4, xfs = b.xfs || 3.4, rot = b.xrot || 0;
  const yt = b.ytitle ? 9 : 0, fx = yt ? yt + 1 : 0, ylw = b.ylw || 8.5, px0 = fx + ylw + 1.5, top = b.top || 5;
  const plotW = pad * 2 + n * bw + (n - 1) * gap + tail, px1 = px0 + plotW, py0 = top, py1 = py0 + ph;
  const xh = b.xh ?? (rot ? Math.max(...b.bars.map((x) => est(x.x, xfs))) * Math.sin(-rot * Math.PI / 180) + 4 : xfs * 1.6);
  const fw = b.fw || (px1 - fx + 4), fh = py1 + xh + 2.4, k = ph / max;
  const colors = b.colors || ["#8E86D9"];
  let s = b.frame !== false ? `<rect x="${f2(fx)}" y=".3" width="${f2(fw)}" height="${f2(fh - .3)}" fill="#fff" stroke="${INK}" stroke-width=".35"/>` : "";
  for (let v = step; v <= max + 1e-9; v += step) s += L(px0, py1 - v * k, px1, py1 - v * k, b.grid === "dark" ? "#334155" : "#CBD5E1", b.grid === "dark" ? .3 : .25);
  b.bars.forEach((bar, i) => {
    const x = px0 + pad + i * (bw + gap), h = bar.v * k;
    s += `<rect x="${f2(x)}" y="${f2(py1 - h)}" width="${f2(bw)}" height="${f2(h)}" fill="${bar.c || colors[i % colors.length]}" stroke="${b.stroke || INK}" stroke-width=".3"/>`;
    if (bar.top) s += T(x + bw / 2, py1 - h - 1.2, bar.top, { a: "middle", fs: b.tfs || 3.2, fam: BAL, w: 700 });
    s += xName(x + bw / 2, py1 + 1.2, bar.x, rot, xfs);
  });
  s += L(px0, py1, px0, py0 - (b.axisTop ?? 1), INK, .55) + L(px0 - .3, py1, px1, py1, INK, .55);
  for (let v = 0; v <= max + 1e-9; v += step * (b.every || 1)) s += T(px0 - 1.6, py1 - v * k + yfs * .36, b.ylab ? b.ylab(v) : bn(Math.round(v * 100) / 100), { a: "end", fs: yfs, fam: BAL, w: 600 });
  let H = fh;
  if (b.ytitle) s += yTitle(3.2, py0 - 2, b.yspan ? py0 + b.yspan : fh - 2, b.ytitle, b.tfs2 || 3.8, b.tl);
  if (b.xtitle) { s += xTitle(px0 + (b.xs || 0), px1 - (b.xe || 0), fh + 4.6, b.xtitle, 3.8, b.xl); H = fh + 7.4; }
  if (b.cap) { s += T((px0 + px1) / 2, H + 4.4, b.cap, { a: "middle", fs: 3.8, w: 700 }); H += 6.6; }
  return svg(Math.max(fx + fw, px1) + .6, H + .4, s);
}

// ── line graphs on squared paper ──
function lineSvg(b) {
  const C = b.cols, R = b.rows, c = b.cell || 5, unit = b.unit || 1, lab = b.lab || 1, xfs = b.xfs || 3.2, rot = b.xrot || 0;
  const yt = b.ytitle ? 9 : 0, gx = yt + (b.ylw || 8), gy = 2, gw = C * c, gh = R * c, bottom = gy + gh;
  const xh = b.xh ?? (rot ? 9 : xfs * 1.8);
  let s = `<rect x="${f2(gx)}" y="${f2(gy)}" width="${f2(gw)}" height="${f2(gh)}" fill="#fff"/>`;
  for (let i = 1; i <= C; i++) s += L(gx + i * c, gy, gx + i * c, bottom, "#64748B", .22);
  for (let j = 0; j < R; j++) s += L(gx, gy + j * c, gx + gw, gy + j * c, "#64748B", .22);
  s += L(gx, bottom, gx, gy, INK, .6) + L(gx - .3, bottom, gx + gw, bottom, INK, .6);
  for (let j = 0; j <= R; j += lab) s += T(gx - 1.6, bottom - j * c + 1.2, bn(Math.round(j * unit * 100) / 100), { a: "end", fs: b.yfs || 3.3, fam: BAL, w: 600 });
  for (const [col, t] of b.xlabels || []) s += xName(gx + col * c, bottom + 1, t, rot, xfs);
  const P = b.points.map(([col, v]) => [gx + col * c, bottom - v / unit * c]);
  s += `<path d="M${P.map(([x, y]) => `${f2(x)} ${f2(y)}`).join("L")}" fill="none" stroke="${b.line || "#1D4ED8"}" stroke-width=".75" stroke-linejoin="round"/>`;
  for (const [x, y] of P) s += `<circle cx="${f2(x)}" cy="${f2(y)}" r="1" fill="${b.dot || "#EF4444"}" stroke="#fff" stroke-width=".25"/>`;
  let H = bottom + xh;
  if (b.ytitle) s += yTitle(3.2, gy + (b.ys || 0), bottom - (b.ye || 0), b.ytitle, 3.8, b.tl);
  if (b.xtitle) { s += xTitle(gx + (b.xs || 0), gx + gw - (b.xe || 0), H + 2.6, b.xtitle, 3.8, b.xl); H += 5.6; }
  return svg(gx + gw + (b.right || 2), H, s);
}

// ── pie charts: true angles (share × 360°), clockwise from 12 o'clock ──
function pieHtml(b, ctx) {
  const r = b.r || 28, pad = b.pad || 3, cx = r + pad + (b.padL || 0), cy = r + pad + (b.padT || 0), W = cx + r + pad + (b.padR || 0), H = cy + r + pad + (b.padB || 0);
  const pt = (deg, rr) => [cx + rr * Math.sin(deg * Math.PI / 180), cy - rr * Math.cos(deg * Math.PI / 180)];
  const total = b.slices.reduce((m, x) => m + x.v, 0);
  if (Math.abs(total - 100) > 1e-6) throw new Error(`c5p171_pie: the shares add up to ${total}, not 100`);
  let a0 = b.start || 0, s = "", labs = "";
  for (const sl of b.slices) {
    const a1 = a0 + sl.v * 3.6, [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r);
    s += sl.v >= 100 ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${sl.c}"/>`
      : `<path d="M${f2(cx)} ${f2(cy)}L${f2(x0)} ${f2(y0)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f2(x1)} ${f2(y1)}Z" fill="${sl.c}" stroke="#fff" stroke-width=".7" stroke-linejoin="round"/>`;
    if (sl.lab) {
      const lines = Array.isArray(sl.lab) ? sl.lab : [sl.lab], fs = sl.fs || b.fs || 3.4, lh = fs * 1.3, mid = (a0 + a1) / 2 + (sl.da || 0);
      const [lx, ly] = pt(mid, r * (sl.at || .58)), y = ly - (lines.length - 1) * lh / 2 + fs * .36;
      if (sl.box) { const w = Math.max(...lines.map((l) => est(l, fs))) + 3.2; labs += `<rect x="${f2(lx - w / 2)}" y="${f2(ly - lines.length * lh / 2 - .5)}" width="${f2(w)}" height="${f2(lines.length * lh + 1)}" rx=".5" fill="#fff" stroke="${INK}" stroke-width=".2"/>`; }
      lines.forEach((l, i) => { labs += T(lx, y + i * lh, l, { a: "middle", fs, w: 700, fill: sl.fc || INK, fam: /^[০-৯.%]+$/.test(l) ? BAL : BEN }); });
    }
    a0 = a1;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${b.edge || INK}" stroke-width=".35"/>` + labs;
  let pics = "";
  for (const o of b.around || []) {
    const [x, y] = pt(o.a, o.d), src = ctx.sticker(o.s), z = o.size || 14;
    pics += src ? `<image href="${src}" x="${f2(x - z / 2)}" y="${f2(y - z / 2)}" width="${z}" height="${z}" preserveAspectRatio="xMidYMid meet"/>`
      : `<text x="${f2(x)}" y="${f2(y + z * .3)}" font-size="${f2(z * .8)}" text-anchor="middle">${esc(o.e || "●")}</text>`;
  }
  const cap = b.cap ? `<div class="c5p171-cap">${ctx.md(b.cap)}</div>` : "";
  return `<div class="c5p171-pie">${svg(W, H, s + pics)}${cap}</div>`;
}

module.exports = {
  kinds: {
    c5p171_dots: (b) => `<div class="c5p171-c">${dotsSvg(b)}</div>`,
    c5p171_bars: (b) => `<div class="c5p171-c${b.left ? " l" : ""}">${barsSvg(b)}</div>`,
    c5p171_line: (b) => `<div class="c5p171-c${b.left ? " l" : ""}">${lineSvg(b)}</div>`,
    c5p171_pie: (b, ctx) => pieHtml(b, ctx),
    c5p171_rules: (b, ctx) => `<div class="c5p171-rules ${b.tone || "green"}"><div class="c5p171-rh">${ctx.md(b.title)}</div><div class="c5p171-ri">${b.items.map((t) => `<i></i><span>${ctx.md(t)}</span>`).join("")}</div>${b.note ? `<div class="c5p171-rn">${ctx.md(b.note)}</div>` : ""}</div>`,
    c5p171_data: (b, ctx) => `<div class="c5p171-data"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${ctx.md(b.text)}</div>`,
    /** questions with the book's marks as printed ("ক)", "(ক)", "১)", or "" for none): { items: [[mark, text]], gap, indent, size, bw }; ▭ a wide box */
    c5p171_qs: (b, ctx) => `<div class="c5p171-qs" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.gap != null ? `row-gap:${b.gap}mm;` : ""}${b.indent ? `padding-left:${b.indent}mm;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}">${b.items.map(([m, t]) =>
      `<b>${ctx.esc(m)}</b><span>${ctx.md(t).replace(/▭/g, `<span class="c5p171-wb"></span>`)}</span>`).join("")}</div>`,
  },
  css: `
.c5p171-c { display: flex; justify-content: center } .c5p171-c.l { justify-content: flex-start } svg.c5p171-svg { display: block; overflow: visible; flex: none }
.c5p171-pie { display: flex; flex-direction: column; align-items: center; gap: 1.6mm; align-self: center }
.c5p171-cap { font: 700 12pt/1.3 'Noto Sans Bengali'; color: var(--d); background: var(--s); border: .45mm solid var(--c); border-radius: 2mm; padding: 1mm 4mm .6mm }
.c5p171-rules { border: .6mm solid var(--rc); border-radius: 3.5mm; overflow: hidden; background: #fff; box-shadow: 0 1mm 0 var(--rs) }
.c5p171-rules.green { --rc: #16A34A; --rs: #BBF7D0 } .c5p171-rules.lime { --rc: #65A30D; --rs: #D9F99D }
.c5p171-rh { background: var(--rc); color: #fff; font: 700 12.5pt/1.3 'Baloo Da 2'; text-align: center; padding: 1.5mm 3mm .9mm }
.c5p171-ri { display: grid; grid-template-columns: 3mm 1fr; gap: 1.4mm 2.4mm; padding: 2.2mm 4mm 2.4mm; font: 500 12pt/1.45 'Noto Sans Bengali' }
.c5p171-ri i { width: 2.6mm; height: 2.6mm; border-radius: 50%; background: #EF4444; margin-top: 1.9mm }
.c5p171-rn { margin: 0 3mm 3mm; background: #FED7AA; border-radius: 2.5mm; padding: 1.8mm 4mm 1.4mm; text-align: center; font: 700 12.5pt/1.45 'Baloo Da 2'; color: #9A3412 }
.c5p171-qs { display: grid; grid-template-columns: auto 1fr; column-gap: 1.8mm; row-gap: 1mm; align-items: baseline; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .c5p171-qs > b { font-weight: 600; white-space: nowrap }
.c5p171-wb { display: inline-block; width: var(--bw, 34mm); height: 7.6mm; vertical-align: -2.4mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 1mm }
.c5p171-data {align-self: stretch; background: #fff; border: .6mm solid var(--c); border-radius: 3mm; padding: 1.8mm 4mm 1.4mm; font: 600 12.5pt/1.6 'Noto Sans Bengali'; box-shadow: 0 1mm 0 var(--s) }
`,
};
