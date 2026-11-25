// Printed pages 23–31's own kinds (অধ্যায় ২ যোগ ও বিয়োগ), prefixed c4p023_. Every digit, carry, tick and arrow is set by code.
// - c4p023_places: the book's coloured "স্থান" table beside a column sum (pp. 23–25): a bar per place, its sum, and the
//   carried digit (red) at the end of the next bar; arrows: true draws the book's arrow from the carry to where it is added.
//   { rows: [["এককের স্থান", "৪ + ৫ + ৩ + ৯ = ২১", "#FFD9C2"], …], arrows, size (pt), lw (label width, mm), gap (mm) }
//   The "=" signs line up; the digits are placed one by one, so the arrows land on them.
// - c4p023_ticks: a sum in a line (pp. 26–27): the numbers with a red tick over each digit already added, "=", and a strip of
//   answer boxes: { nums, ticks (digits ticked from the right), boxes, fill: "১৮৯" (the last boxes), carry: [place, "১"]
//   (a small red carried digit in the box of that place, 0 = units), arrow (from the speech bubble above to the units box) }
// - c4p023_pills: p. 28's ways to make ৮: capsules of two digits, a line, their sum: { items: [["০", "৮", "৮"], …] }
// - c4p023_why: pp. 30–31's coloured explanation beside a column: { head: "[এককের স্থান]", sum: "১২ − ৯ = ৩", text, tone }
// - c4p023_tight: a block whose column sums have narrower cells (a row of four wide sums): { body, cw: "1.08em" }
const RED = "#DC2626", INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const txt = (ctx, x, y, s, { size, w = 700, fam = "Baloo Da 2", fill = INK, anchor = "middle" }) =>
  `<text x="${f2(x)}" y="${f2(y)}" text-anchor="${anchor}" font-family="${fam}" font-weight="${w}" font-size="${f2(size)}" fill="${fill}">${ctx.esc(s)}</text>`;
const arrowHead = (x1, y1, x2, y2, col = INK, sw = .3) => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 1.5, s = .55;
  const p = (d, r) => `${f2(x2 - L * Math.cos(a) + r * Math.cos(a + Math.PI / 2))} ${f2(y2 - L * Math.sin(a) + r * Math.sin(a + Math.PI / 2))}`;
  return `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2 - L * .6 * Math.cos(a))} ${f2(y2 - L * .6 * Math.sin(a))}" stroke="${col}" stroke-width="${sw}" fill="none"/>` +
    `<path d="M${f2(x2)} ${f2(y2)}L${p(0, s)}L${p(0, -s)}Z" fill="${col}"/>`;
};

// ── the "স্থান" table ──
function placesSvg(b, ctx) {
  const fs = (b.size || 12) * 0.3528, dp = fs * 0.6, sw = fs * 1.25, rh = b.rh || fs * 1.95, gap = b.gap ?? 1, lw = b.lw ?? 29;
  const rows = b.rows.map(([label, sum, tone]) => {
    const [l, r] = sum.split("=");
    return { label, lt: l.match(/[০-৯]+|[+−]/g), rt: r.match(/[০-৯]+/)[0], tone };
  });
  const tw = (t) => (/[+−]/.test(t) ? sw : [...t].length * dp);
  const leftW = (r) => r.lt.reduce((s, t) => s + tw(t), 0);
  const eqX = lw + 3 + Math.max(...rows.map(leftW)) + sw / 2, resX = eqX + sw / 2;
  const W = b.w || f2(resX + Math.max(...rows.map((r) => [...r.rt].length)) * dp + 4);
  const H = rows.length * rh + (rows.length - 1) * gap;
  let bg = "", g = "";
  const pos = rows.map((r, i) => {
    const y0 = i * (rh + gap), yb = y0 + rh / 2 + fs * 0.36;
    bg += `<rect x="0" y="${f2(y0)}" width="${W}" height="${f2(rh)}" rx="1.6" fill="${r.tone}"/>`;
    g += txt(ctx, 3, yb, r.label, { size: fs * .92, w: 600, fam: "Noto Sans Bengali", anchor: "start" });
    let x = eqX - sw / 2 - leftW(r), last = 0;
    r.lt.forEach((t, k) => {
      if (/[+−]/.test(t)) { g += txt(ctx, x + sw / 2, yb, t, { size: fs }); x += sw; return; }
      const carried = i > 0 && b.carry !== false && k === r.lt.length - 1;
      [...t].forEach((d, j) => { g += txt(ctx, x + dp * (j + .5), yb, d, { size: fs, fill: carried ? RED : INK }); });
      last = x + dp * ([...t].length - .5); x += tw(t);
    });
    g += txt(ctx, eqX, yb, "=", { size: fs });
    [...r.rt].forEach((d, j) => { g += txt(ctx, resX + dp * (j + .5), yb, d, { size: fs, w: 800, fill: "#9A3412" }); });
    return { y0, yb, last, carryX: resX + dp * ([...r.rt].length - 1) / 2 };
  });
  if (b.arrows) for (let i = 0; i + 1 < pos.length; i++) {
    const a = pos[i], z = pos[i + 1];
    g += arrowHead(a.carryX, a.yb + 1, z.last + .3, z.yb - fs * .82, INK, .32);
  }
  return `<svg class="c4p023-pl" width="${W}mm" height="${f2(H)}mm" viewBox="0 0 ${W} ${f2(H)}">${bg}${g}</svg>`;
}

// ── a sum in a line, the added digits ticked, the answer in boxes ──
function ticksSvg(b, ctx) {
  const fs = (b.size || 12) * 0.3528, dp = fs * .6, ps = fs * 1.6, es = fs * 1.5, bs = b.bs || 6.2, nb = b.boxes || 7;
  const top = b.arrow ? 7.5 : 3.4, yb = top + fs * .95, mid = yb - fs * .36, by = mid - bs / 2;
  let x = .5, g = "";
  b.nums.forEach((n, i) => {
    const ds = [...n];
    ds.forEach((d, j) => {
      const cx = x + dp * (j + .5);
      g += txt(ctx, cx, yb, d, { size: fs });
      if (j >= ds.length - (b.ticks || 0)) g += `<path d="M${f2(cx - .3)} ${f2(yb - fs * .86 - 1.3)}L${f2(cx + .45)} ${f2(yb - fs * .86 - 2.9)}" stroke="${RED}" stroke-width=".3" stroke-linecap="round"/>`;
    });
    x += ds.length * dp;
    if (i < b.nums.length - 1) { g += txt(ctx, x + ps / 2, yb, "+", { size: fs }); x += ps; }
  });
  g += txt(ctx, x + es / 2, yb, "=", { size: fs }); x += es;
  const bx = x, fill = [...(b.fill || "")];
  g += `<rect x="${f2(bx)}" y="${f2(by)}" width="${f2(nb * bs)}" height="${f2(bs)}" rx="1.2" fill="#FFFBEB" stroke="#F59E0B" stroke-width=".45"/>`;
  for (let k = 1; k < nb; k++) g += `<path d="M${f2(bx + k * bs)} ${f2(by)}V${f2(by + bs)}" stroke="#F59E0B" stroke-width=".35"/>`;
  fill.forEach((d, j) => { const k = nb - fill.length + j; g += txt(ctx, bx + bs * (k + .5), mid + fs * .36, d, { size: fs, w: 800, fill: "#C2410C" }); });
  if (b.carry) { const k = nb - 1 - b.carry[0]; g += txt(ctx, bx + bs * k + 1.4, by + 2.6, b.carry[1], { size: fs * .62, w: 800, fill: RED }); }
  const lastX = bx + bs * (nb - .5);
  if (b.arrow) g += arrowHead(lastX - 15, .4, lastX - .2, by - .5, INK, .3);
  const W = f2(bx + nb * bs + .6), H = f2(by + bs + .6);
  return `<svg class="c4p023-tk" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${g}</svg>`;
}

module.exports = {
  kinds: {
    c4p023_places: (b, ctx) => `<div class="c4p023-plw">${placesSvg(b, ctx)}</div>`,
    c4p023_ticks: (b, ctx) => `<div class="c4p023-tkw">${ticksSvg(b, ctx)}</div>`,
    c4p023_pills: (b, ctx) => `<div class="c4p023-pills">${b.items.map(([a, c, s], i) => `<span class="c4p023-pill"><b>${ctx.esc(a)}</b><b>${ctx.esc(c)}</b><b class="s">${ctx.esc(s)}</b></span>${i < b.items.length - 1 ? `<span class="c4p023-cm">,</span>` : ""}`).join("")}</div>`,
    c4p023_why: (b, ctx) => `<div class="c4p023-why" style="--t:${b.tone}"><div class="h"><span>${ctx.md(b.head)}</span><span class="s">${ctx.md(b.sum)}</span></div><p>${ctx.md(b.text)}</p></div>`,
    c4p023_tight: (b, ctx, page) => `<div class="c4p023-tight" style="--cw:${b.cw || "1.08em"}">${ctx.blockHtml(b.body, page)}</div>`,
  },
  css: `
.c4p023-plw, .c4p023-tkw { display: flex; justify-content: center } .c4p023-tkw { justify-content: flex-start }
svg.c4p023-pl, svg.c4p023-tk { display: block; overflow: visible }
.c4p023-pills { display: flex; align-items: flex-end; justify-content: center; gap: 1.2mm }
.c4p023-pill { display: inline-flex; flex-direction: column; align-items: center; width: 11mm; padding: 1.4mm 0 1mm; background: #fff; border: .55mm solid var(--c); border-radius: 99px; box-shadow: 0 .8mm 0 var(--s); font: 800 13pt/1.35 'Baloo Da 2'; color: ${INK} }
.c4p023-pill b.s { align-self: stretch; text-align: center; border-top: .5mm solid ${INK}; margin-top: .6mm; padding-top: .4mm; color: #C2410C }
.c4p023-cm { font: 800 14pt 'Baloo Da 2'; margin-right: 3.4mm; line-height: 1 }
.c4p023-why { background: var(--t); border-radius: 3mm; padding: 1.4mm 3.6mm 1.6mm; font: 500 11.5pt/1.45 'Noto Sans Bengali'; color: ${INK} }
.c4p023-why .h { display: flex; justify-content: center; gap: 6mm; font: 700 12pt/1.4 'Baloo Da 2'; color: ${INK} } .c4p023-why .h .s { font-weight: 800; color: #9A3412 }
.c4p023-why p { text-align: justify }
.c4p023-tight .c3p021-cs td:not(.op) { width: var(--cw) }
.c4p023-tight .c3p021-wb.one { width: 5.4mm; height: 6.8mm; margin: 0 .3mm }
`,
};
