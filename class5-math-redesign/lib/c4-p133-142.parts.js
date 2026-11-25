// Printed pages 133–142's own kinds (prefixed c4p133_, classes c4p133-): chapter ৯ পরিমাপ, its second half — area
// (squared paper, rectangles and squares), time (the units, adding and taking away times, clocks), dates (calendar
// months), the review and নিজে করি. Everything whose count, length, area or time matters is drawn here by code:
//   c4p133_sq     { cols, rows, sp, colFill?, cm?: [r, c], fs? }        squared paper: cols × rows squares of sp mm (p133's
//                                                                       15 × 9 at a true 1 cm); a cell's two sides named
//                                                                       "১ সেমি" on dashed arcs, as the book marks them
//   c4p133_rect   { w, h, fill, left?, bottom?, inside?, mark?, ink?, fs?, bulge? }   a rectangle or square (mm), its sides
//                                                                       named on dashed arcs (left, bottom), words inside
//   c4p133_vline  { h }                                                 a thin upright line between figures (p140)
//   c4p133_units  { heads, widths: [%…], rows: [[col, left, right, span?]] }  p136's table of the time units: each pair
//                                                                       joined by a ↔ across its column line
//   c4p133_eqs    { cols: [mm…], al, rh, rg?, size?, rows, arrows?, lines?, indent? }   lines of working on a grid of
//                 columns, so they line up; a cell is "text" or { t, ul, span, al }; arrows { from: [r, c, dx?],
//                 to: [r, c, dx?] } run down, across and down (an elbow); lines: [[x1, y1, x2, y2]] straight arrows (mm)
//   c4p133_hms    { heads, rows: [{ op?, cells }], ans }               p137's coloured ঘণ্টা | মিনিট | সেকেন্ড columns
//                                                                       (a cell { t, sup } carries a small red "+১")
//   c4p133_pill   { text, w? }                                          a rounded yellow note (p137)
//   c4p133_tcol   { n, top?, heads?, rows: [{ op?, cells }], w: [mm…], ah?, size?, al? }   a sum of times or measures in
//                                                                       columns: the sign, a rule, room for the answer
//   c4p133_cal    { y, m, name, ring: [d…] }                            a calendar month drawn by code: each date under
//                                                                       its own weekday (computed), written ০১ ০২ … as the
//                                                                       book does, the marked dates ringed in red
//   c4p133_clock  { h, m, s?, size, empty?, bangla? }                   an analog clock (the core's look), the hands at
//                                                                       the exact time, or empty to draw them in
//   c4p133_t      { text, size?, bw?, center?, indent?, bold? }         a line of text with this file's markup
//   c4p133_w      { cls, body: [blocks] }                               blocks wrapped in a class (tighter lists)
// This file's markup (mdx), on top of the core's: ▭ a wider answer box (--bw, 17 mm), ∴ drawn (the fonts lack it),
// ◷ an empty clock in the line (--ck, 13 mm), !!x!! red.
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const sum = (a) => a.reduce((s, x) => s + x, 0);
const THEREFORE = `<svg class="c4p133-ther" width="3.4mm" height="3.2mm" viewBox="0 0 34 32"><circle cx="17" cy="7" r="4"/><circle cx="6" cy="25" r="4"/><circle cx="28" cy="25" r="4"/></svg>`;

// ── an analog clock: the core's look (amber rim, navy hour hand, red minute hand), a thin green second hand ──
function clockSvg({ h = 12, m = 0, s, size = 26, empty, bangla }, bn, cls = "c4p133-clk") {
  const P = (r, deg) => [50 + r * Math.sin(deg * Math.PI / 180), 50 - r * Math.cos(deg * Math.PI / 180)];
  const hand = (deg, len, wd, col, tail = 0) => { const [x2, y2] = P(len, deg), [x1, y1] = P(-tail, deg); return `<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="${col}" stroke-width="${wd}" stroke-linecap="round"/>`; };
  let g = `<circle cx="50" cy="50" r="48" fill="#FEF3C7" stroke="#D97706" stroke-width="3.5"/><circle cx="50" cy="50" r="45" fill="#fff"/>`;
  for (let i = 0; i < 60; i++) { const [x1, y1] = P(44, i * 6), [x2, y2] = P(i % 5 ? 42 : 39.5, i * 6); g += `<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="#334155" stroke-width="${i % 5 ? .6 : 1.4}"/>`; }
  for (let i = 1; i <= 12; i++) { const [x, y] = P(31, i * 30); g += `<text x="${f2(x)}" y="${f2(y + 3.6)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="700" font-size="${i > 9 ? 9.5 : 10.5}" fill="${INK}">${bangla ? bn(i) : i}</text>`; }
  if (!empty) {
    g += hand((h % 12) * 30 + m * 0.5 + (s || 0) / 120, 22, 4.4, "#1E3A8A") + hand(m * 6 + (s || 0) / 10, 34, 2.8, "#DC2626");
    if (s != null) g += hand(s * 6, 38, 1.1, "#16A34A", 8);
  }
  g += `<circle cx="50" cy="50" r="${empty ? 2.4 : 3.2}" fill="${INK}"/>`;
  return `<svg class="${cls}" width="${size}mm" height="${size}mm" viewBox="0 0 100 100">${g}</svg>`;
}

function mdx(ctx, s) {
  return ctx.md(String(s).replace(/▭/g, "⟦B⟧").replace(/∴/g, "⟦T⟧").replace(/◷/g, "⟦C⟧"))
    .replace(/⟦B⟧/g, `<span class="c4p133-box"></span>`).replace(/⟦T⟧/g, THEREFORE)
    .replace(/⟦C⟧/g, clockSvg({ empty: true, size: 13 }, ctx.bn, "c4p133-clk in"))
    .replace(/!!(.+?)!!/g, `<span class="c4p133-red">$1</span>`);
}

// a label in an SVG (mm units), one or more lines, with a white halo so a dashed arc can pass behind it
function label(ctx, x, y, text, fs, anchor = "middle", col = INK) {
  const lines = String(text).split("\n"), lh = fs * 1.15, y0 = y - ((lines.length - 1) * lh) / 2 + fs * 0.34;
  return lines.map((t, i) => `<text x="${f2(x)}" y="${f2(y0 + i * lh)}" text-anchor="${anchor}" font-family="Noto Sans Bengali" font-weight="600" font-size="${f2(fs)}" fill="${col}" stroke="#fff" stroke-width="${f2(fs * 0.28)}" stroke-linejoin="round" paint-order="stroke">${ctx.esc(t)}</text>`).join("");
}
const lw = (text, fs) => Math.max(...String(text).split("\n").map((t) => [...t.normalize("NFC")].filter((c) => !/[়-্ৗঁ]/.test(c)).length)) * fs * 0.7;
const DASH = `fill="none" stroke="${INK}" stroke-width=".3" stroke-dasharray="1 .8"`;

// ── squared paper ──
function sqSvg(b, ctx) {
  const { cols, rows, sp = 10, colFill = [], cm, fs = 2.6 } = b, W = cols * sp, H = rows * sp;
  let g = "";
  for (let c = 0; c < cols; c++) g += `<rect x="${f2(c * sp)}" y="0" width="${f2(sp)}" height="${f2(H)}" fill="${colFill[c] || "#fff"}"/>`;
  let d = "";
  for (let c = 1; c < cols; c++) d += `M${f2(c * sp)} 0V${f2(H)}`;
  for (let r = 1; r < rows; r++) d += `M0 ${f2(r * sp)}H${f2(W)}`;
  g += `<path d="${d}" stroke="${INK}" stroke-width=".3" fill="none"/><rect x="0" y="0" width="${f2(W)}" height="${f2(H)}" fill="none" stroke="${INK}" stroke-width=".55"/>`;
  if (cm) { // the cell (row, col) whose left side and bottom side are named "১ সেমি", each on a dashed arc
    const [r, c] = cm, x = c * sp, y = r * sp, k = sp * 0.42;
    g += `<path d="M${f2(x)} ${f2(y)}Q${f2(x - k)} ${f2(y + sp / 2)} ${f2(x)} ${f2(y + sp)}" ${DASH}/><path d="M${f2(x)} ${f2(y + sp)}Q${f2(x + sp / 2)} ${f2(y + sp + k)} ${f2(x + sp)} ${f2(y + sp)}" ${DASH}/>`;
    const two = sp < 9 ? "১ সেমি" : "১\nসেমি";
    g += label(ctx, x - k / 2 - (sp - k / 2) / 2 + 0.2, y + sp / 2, two, fs) + label(ctx, x + sp / 2, y + sp + k / 2 + (sp - k / 2) / 2 + 0.2, "১ সেমি", fs);
  }
  return `<svg class="c4p133-svg" width="${f2(W + 1)}mm" height="${f2(H + 1)}mm" viewBox="-.5 -.5 ${f2(W + 1)} ${f2(H + 1)}">${g}</svg>`;
}

// ── a rectangle, its sides named on dashed arcs (the book's way) ──
function rectSvg(b, ctx) {
  const { w, h, fill = "#5B8DD6", left, bottom, inside, mark, ink = "#fff", fs = 3.9, stroke = INK } = b;
  const bl = b.bulge ?? Math.min(9, Math.max(3.5, h * 0.2)), bb = b.bulgeB ?? Math.min(8, Math.max(3, w * 0.1));
  const wl = left ? lw(left, fs) : 0, nl = left ? String(left).split("\n").length : 0;
  const lx = left ? Math.max(bl, wl / 2 + 1.2) : 0, padL = left ? lx + wl / 2 + 0.6 : 0.6, padB = bottom ? bb + fs * 0.9 : 0.6, padT = mark ? fs * 1.7 : 0.6;
  const markW = mark ? lw(mark, fs) + 2 : 0, ox = Math.max(padL, markW), oy = padT, W = ox + w + (bottom ? Math.max(1, lw(bottom, fs) / 2 - w / 2) : 0.6) + 0.6, H = oy + h + padB;
  let g = `<rect x="${f2(ox)}" y="${f2(oy)}" width="${f2(w)}" height="${f2(h)}" fill="${fill}" stroke="${stroke}" stroke-width=".35"/>`;
  if (left) g += `<path d="M${f2(ox)} ${f2(oy)}Q${f2(ox - 2 * bl)} ${f2(oy + h / 2)} ${f2(ox)} ${f2(oy + h)}" ${DASH}/>` + label(ctx, ox - lx, oy + h / 2, left, fs);
  if (bottom) g += `<path d="M${f2(ox)} ${f2(oy + h)}Q${f2(ox + w / 2)} ${f2(oy + h + 2 * bb)} ${f2(ox + w)} ${f2(oy + h)}" ${DASH}/>` + label(ctx, ox + w / 2, oy + h + bb, bottom, fs);
  if (inside) g += String(inside).split("\n").map((t, i, a) => `<text x="${f2(ox + w / 2)}" y="${f2(oy + h / 2 + fs * 0.36 + (i - (a.length - 1) / 2) * fs * 1.25)}" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="700" font-size="${f2(fs * 1.05)}" fill="${ink}">${ctx.esc(t)}</text>`).join("");
  if (mark) g += `<text x="0" y="${f2(fs * 1.05)}" font-family="Noto Sans Bengali" font-weight="600" font-size="${f2(fs * 1.05)}" fill="${INK}">${ctx.esc(mark)}</text>`;
  return `<svg class="c4p133-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${g}</svg>`;
}

// ── an arrowhead at (x, y) pointing along (dx, dy) ──
function head(x, y, dx, dy, s = 1.5) {
  const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  return `<path d="M${f2(x)} ${f2(y)}L${f2(x - ux * s * 1.6 + nx * s * 0.75)} ${f2(y - uy * s * 1.6 + ny * s * 0.75)}L${f2(x - ux * s * 1.6 - nx * s * 0.75)} ${f2(y - uy * s * 1.6 - ny * s * 0.75)}Z" fill="${INK}"/>`;
}

module.exports = {
  kinds: {
    c4p133_sq: (b, ctx) => `<div class="c4p133-fig">${sqSvg(b, ctx)}</div>`,
    c4p133_rect: (b, ctx) => `<div class="c4p133-fig">${rectSvg(b, ctx)}</div>`,
    c4p133_vline: (b) => `<div class="c4p133-vl" style="height:${b.h || 30}mm"></div>`,

    c4p133_units: (b, ctx) => {
      const n = b.heads.length;
      const rows = b.rows.map(([c, L, R, span = 1]) => {
        let tds = "";
        for (let i = 0; i < c; i++) tds += "<td></td>";
        tds += `<td class="c4p133-ul">${mdx(ctx, L)}</td><td class="c4p133-ur" colspan="${span}"><svg class="c4p133-arr" viewBox="0 0 30 6"><path d="M1 3H29" stroke="${INK}" stroke-width=".7"/><path d="M0 3L4.2 .9V5.1Z M30 3L25.8 .9V5.1Z" fill="${INK}"/></svg>${mdx(ctx, R)}</td>`;
        for (let i = c + 1 + span; i < n; i++) tds += "<td></td>";
        return `<tr>${tds}</tr>`;
      }).join("");
      return `<table class="c4p133-units"><colgroup>${b.widths.map((w) => `<col style="width:${w}%">`).join("")}</colgroup><thead><tr>${b.heads.map((h) => `<th>${ctx.esc(h)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table>`;
    },

    c4p133_eqs: (b, ctx) => {
      const cols = b.cols, rh = b.rh || 7.4, rg = b.rg || 0, al = b.al || "", xs = cols.map((_, i) => sum(cols.slice(0, i)));
      const W = sum(cols), Y = (r) => r * (rh + rg), H = Y(b.rows.length) - rg;
      let cells = "";
      b.rows.forEach((row, r) => {
        let c = 0;
        for (const cell of row) {
          const o = typeof cell === "string" ? { t: cell } : cell, span = o.span || 1, a = o.al || al[c] || "c";
          if (o.t) cells += `<div class="c4p133-ec ${a}" style="left:${f2(xs[c])}mm;top:${f2(Y(r))}mm;width:${f2(sum(cols.slice(c, c + span)))}mm;height:${rh}mm"><span${o.ul ? ` class="c4p133-u"` : ""}>${mdx(ctx, o.t)}</span></div>`;
          c += span;
        }
      });
      let g = "";
      for (const { from, to, mid } of b.arrows || []) {
        const x1 = xs[from[1]] + cols[from[1]] / 2 + (from[2] || 0), y1 = Y(from[0]) + rh - 0.4, x2 = xs[to[1]] + cols[to[1]] / 2 + (to[2] || 0), y2 = Y(to[0]) + 0.9, ym = mid != null ? y1 + mid : (y1 + y2) / 2;
        g += `<path d="M${f2(x1)} ${f2(y1)}V${f2(ym)}H${f2(x2)}V${f2(y2 - 1.6)}" fill="none" stroke="${INK}" stroke-width=".3"/>${head(x2, y2, 0, 1, 1.1)}`;
      }
      for (const [x1, y1, x2, y2] of b.lines || []) g += `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}" stroke="${INK}" stroke-width=".3"/>${head(x2, y2, x2 - x1, y2 - y1, 1.1)}`;
      return `<div class="c4p133-eqs" style="width:${f2(W)}mm;height:${f2(H)}mm;margin-left:${b.indent || 0}mm;font-size:${b.size || 12}pt;--bw:${b.bw || 15}mm">${cells}${g ? `<svg class="c4p133-eqa" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${g}</svg>` : ""}</div>`;
    },

    c4p133_hms: (b, ctx) => {
      const cls = ["h", "m", "s"], cell = (x) => typeof x === "string" ? mdx(ctx, x) : `${mdx(ctx, x.t)}<sup class="c4p133-sup">${ctx.esc(x.sup)}</sup>`;
      return `<table class="c4p133-hms"><tr><td class="op"></td>${b.heads.map((h, i) => `<th class="${cls[i]}">${ctx.esc(h)}</th>`).join("")}</tr>
        ${b.rows.map((r, i) => `<tr class="${i === b.rows.length - 1 ? "last" : ""}"><td class="op">${ctx.esc(r.op || "")}</td>${r.cells.map((x, j) => `<td class="${cls[j]}">${cell(x)}</td>`).join("")}</tr>`).join("")}
        <tr class="an"><td class="op"></td>${b.ans.map((x, j) => `<td class="${cls[j]}">${cell(x)}</td>`).join("")}</tr></table>`;
    },
    c4p133_pill: (b, ctx) => `<div class="c4p133-pill"${b.w ? ` style="width:${b.w}mm"` : ""}>${mdx(ctx, b.text)}</div>`,

    c4p133_tcol: (b, ctx) => {
      const nc = b.w.length, top = b.top, al = b.al || "r";
      const lab = (show) => `<td class="n">${show ? ctx.esc(b.n) : ""}</td>`;
      let rows = top ? `<tr><td class="n" colspan="${nc + 2}">${ctx.esc(b.n)}</td></tr>` : "";
      if (b.heads) rows += `<tr class="hd">${lab(!top)}<td class="op"></td>${b.heads.map((h) => `<td>${ctx.esc(h)}</td>`).join("")}</tr>`;
      b.rows.forEach((r, i) => { rows += `<tr class="${i === b.rows.length - 1 ? "last" : ""}">${lab(!top && !b.heads && i === 0)}<td class="op">${ctx.esc(r.op || "")}</td>${r.cells.map((x) => `<td class="${al}">${mdx(ctx, x)}</td>`).join("")}</tr>`; });
      rows += `<tr class="an"><td class="n"></td><td colspan="${nc + 1}" style="height:${b.ah ?? 5.5}mm"></td></tr>`;
      return `<table class="c4p133-tc" style="font-size:${b.size || 12}pt"><colgroup><col style="width:${b.nw ?? 8}mm"><col style="width:${b.ow ?? 4.5}mm">${b.w.map((w) => `<col style="width:${w}mm">`).join("")}</colgroup>${rows}</table>`;
    },

    c4p133_cal: (b, ctx) => {
      const first = new Date(Date.UTC(b.y, b.m - 1, 1)).getUTCDay(), days = new Date(Date.UTC(b.y, b.m, 0)).getUTCDate(); // 0 = Sunday, রবি
      const DN = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"], ring = b.ring || [];
      let cells = DN.map((d) => `<b>${d}</b>`).join("");
      for (let i = 0; i < first; i++) cells += "<span></span>";
      for (let d = 1; d <= days; d++) cells += `<span${ring.includes(d) ? ` class="c4p133-ring"` : ""}>${ctx.bn(String(d).padStart(2, "0"))}</span>`;
      return `<div class="c4p133-cal" style="--k:${b.k || 1}"><div class="c4p133-calt">${ctx.esc(b.name)} ${ctx.bn(b.y)}</div><div class="c4p133-calg">${cells}</div></div>`;
    },

    c4p133_clock: (b, ctx) => `<div class="c4p133-fig">${clockSvg(b, ctx.bn)}</div>`,
    c4p133_t: (b, ctx) => `<p class="c4p133-t${b.center ? " c" : ""}${b.bold ? " b" : ""}" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}${b.indent ? `padding-left:${b.indent}mm;` : ""}${b.ck ? `--ck:${b.ck}mm;` : ""}">${mdx(ctx, b.text)}</p>`,
    c4p133_w: (b, ctx, page) => `<div class="c4p133-w ${b.cls || ""}">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
    c4p133_grid: (b, ctx) => `<div class="c4p133-grid" style="grid-template-columns:${typeof b.cols === "string" ? b.cols : `repeat(${b.cols || 2}, 1fr)`};${b.size ? `font-size:${b.size}pt;` : ""}--bw:${b.bw || 17}mm;row-gap:${b.gap ?? 2}mm;${b.indent ? `padding-left:${b.indent}mm;` : ""}">${b.items.map((x) => `<span>${mdx(ctx, x)}</span>`).join("")}</div>`,
  },
  css: `
.c4p133-fig { display: flex; justify-content: center } svg.c4p133-svg, svg.c4p133-clk { display: block; overflow: visible }
svg.c4p133-clk.in { display: inline-block; width: var(--ck, 13mm); height: var(--ck, 13mm); vertical-align: middle; margin: 0 1mm }
svg.c4p133-ther { display: inline-block; vertical-align: -.3mm; margin-right: 1mm; fill: currentColor }
.c4p133-box { display: inline-block; width: var(--bw, 17mm); height: 6.8mm; vertical-align: -2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 1mm }
.c4p133-red { color: #DC2626 }
.c4p133-t { font: 500 12.5pt/1.5 'Noto Sans Bengali' } .c4p133-t.c { text-align: center } .c4p133-t.b { font-weight: 700; color: var(--d) }
.c4p133-vl { width: 0; border-left: .45mm solid #94A3B8; align-self: center }
/* p136: the units of time */
.c4p133-units { width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0; border: .6mm solid #0EA5E9; border-radius: 3mm; overflow: hidden; background: #F0F9FF }
.c4p133-units th { background: #0EA5E9; color: #fff; font: 700 11pt/1.2 'Baloo Da 2'; padding: 1.3mm .5mm .9mm; border-right: .3mm solid rgba(255,255,255,.5) } .c4p133-units th:last-child { border-right: 0 }
.c4p133-units td { height: 7.2mm; padding: 0; border-top: .3mm solid #BAE6FD; border-right: .3mm solid #BAE6FD; font: 600 11pt 'Noto Sans Bengali'; white-space: nowrap; vertical-align: middle } .c4p133-units td:last-child { border-right: 0 }
.c4p133-units td.c4p133-ul { text-align: right; padding-right: 5mm; background: #fff; color: var(--d) } .c4p133-units td.c4p133-ur { position: relative; text-align: left; padding-left: 5.4mm; background: #fff; color: var(--d) }
.c4p133-arr { position: absolute; left: -5mm; top: 50%; width: 10mm; height: 2mm; transform: translateY(-50%) }
/* lines of working on a grid */
.c4p133-eqs { position: relative; font-family: 'Noto Sans Bengali'; font-weight: 500 }
.c4p133-ec { position: absolute; display: flex; align-items: center; white-space: nowrap } .c4p133-ec.l { justify-content: flex-start } .c4p133-ec.c { justify-content: center } .c4p133-ec.r { justify-content: flex-end }
.c4p133-u { border-bottom: .35mm solid ${INK}; padding: 0 1.5mm; line-height: 1.25 }
.c4p133-eqa { position: absolute; left: 0; top: 0; overflow: visible }
/* p137: hours, minutes and seconds in coloured columns */
.c4p133-hms { border-collapse: collapse; font: 700 13pt 'Baloo Da 2' }
.c4p133-hms th, .c4p133-hms td { width: 18mm; height: 7.4mm; text-align: center; border: .35mm dashed #475569 } .c4p133-hms th { font: 700 11pt 'Noto Sans Bengali' }
.c4p133-hms td.op, .c4p133-hms tr:first-child td.op { width: 7mm; border: 0; color: #DC2626; font-size: 15pt }
.c4p133-hms .h { background: #BFDBFE } .c4p133-hms .m { background: #BBF7D0 } .c4p133-hms .s { background: #FED7AA }
.c4p133-hms th.h { background: #93C5FD } .c4p133-hms th.m { background: #86EFAC } .c4p133-hms th.s { background: #FDBA74 }
.c4p133-hms tr.last td { border-bottom: .6mm solid ${INK} } .c4p133-hms tr.last td.op { border-bottom: .6mm solid ${INK} } .c4p133-hms tr.an td { color: #C2410C }
.c4p133-sup { font-size: .62em; color: #DC2626; vertical-align: .55em; margin-left: .3mm }
.c4p133-pill { align-self: flex-start; font: 600 12pt/1.5 'Noto Sans Bengali'; background: #FEF9C3; border: .5mm solid #CA8A04; border-radius: 6mm; padding: 1.4mm 5mm 1.1mm; box-shadow: 0 .7mm 0 #FDE68A }
/* sums of times and measures written in columns */
.c4p133-tc { border-collapse: collapse; font-family: 'Noto Sans Bengali'; font-weight: 600 }
.c4p133-tc td { padding: 0 .7mm; height: 5.7mm; line-height: 1.2; white-space: nowrap } .c4p133-tc td.r { text-align: right } .c4p133-tc td.c { text-align: center }
.c4p133-tc td.n { color: #EA580C; font: 800 1em/1.2 'Baloo Da 2'; padding-left: 0 } .c4p133-tc td.op { color: #DC2626; font: 800 1.1em/1 'Baloo Da 2'; text-align: center }
.c4p133-tc tr.hd td { font-weight: 700; color: var(--d); text-align: center; font-size: .92em }
.c4p133-tc tr.last td:not(.n) { border-bottom: .55mm solid ${INK} }
/* p139: a calendar month */
.c4p133-cal { flex: 1; background: #fff; border: .6mm solid var(--c); border-radius: 4mm; padding: 1.2mm 1.6mm 1.6mm; box-shadow: 0 1mm 0 var(--s) }
.c4p133-calt { font: 800 calc(10.5pt * var(--k)) 'Baloo Da 2'; color: var(--d); padding: 0 0 .6mm 1mm }
.c4p133-calg { display: grid; grid-template-columns: repeat(7, 1fr); row-gap: .5mm }
.c4p133-calg b { font: 700 calc(7.1pt * var(--k)) 'Noto Sans Bengali'; text-align: center; color: #fff; background: var(--c); padding: .5mm 0 .2mm; white-space: nowrap }
.c4p133-calg b:first-child { border-radius: 1.4mm 0 0 1.4mm } .c4p133-calg b:nth-child(7) { border-radius: 0 1.4mm 1.4mm 0 }
.c4p133-calg span { font: 700 calc(9.6pt * var(--k))/calc(5.2mm * var(--k)) 'Baloo Da 2'; text-align: center; height: calc(5.2mm * var(--k)) }
.c4p133-calg span.c4p133-ring { justify-self: center; width: calc(6.4mm * var(--k)); border-radius: 50%; box-shadow: inset 0 0 0 .45mm #DC2626 }
/* p141's ticks: Class 3's c3p011_mcq, its four options in four equal columns as the book has them */
.c4p133-w.mq .c3p011-mcq { gap: .8mm; padding-left: 0 } .c4p133-w.mq .c3p011-mqq { font-size: 11.6pt; line-height: 1.33 } .c4p133-w.mq .c3p011-qm { font-size: 11.6pt; line-height: 1.33 }
.c4p133-w.mq .c3p011-mo { grid-template-columns: minmax(0, 1.12fr) repeat(3, minmax(0, 1fr)) !important; font-size: 10.8pt; line-height: 1.33; gap: 0 1mm; padding-left: 6mm } .c4p133-w.mq .c3p011-mo span { gap: .9mm }
.c4p133-w.mq .c3p011-mo b { font-size: 10.6pt; line-height: 1.33 } .c4p133-w.mq .c3p011-tk { width: 3.5mm; height: 3.5mm; margin-right: 0 }
/* p134's two formulas in a rounded box; p138's lines with clocks */
.c4p133-w.c4p133-rule { align-self: center; background: #FEF9C3; border: .6mm solid #CA8A04; border-radius: 5mm; padding: 2mm 9mm 1.6mm; box-shadow: 0 1mm 0 #FDE68A }
.c4p133-w.c4p133-rule .c4p133-t { font: 700 13pt/1.6 'Baloo Da 2'; color: ${INK} }
.c4p133-w.c4p133-cl { display: flex; flex-direction: column; gap: .4mm } .c4p133-w.c4p133-cl .c4p133-t { line-height: 1.25 }
/* tighter নিজে করি problems (Class 3's c3p078_qlist, p142) */
.c4p133-w.ql .c3p078-qi { padding: .8mm 0; font-size: 12pt; line-height: 1.4 } .c4p133-w.ql .c4p133-t { font-size: 11.5pt; line-height: 1.5 }
/* items in a grid (fill the boxes) */
.c4p133-grid { display: grid; column-gap: 6mm; font: 500 12.5pt/1.5 'Noto Sans Bengali' } .c4p133-grid span { white-space: nowrap }
`,
};
