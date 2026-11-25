// Printed pages 1–3's own kinds (prefixed c4p001_), written by Claude as the model for the helpers (23 Nov 2026).
// - c4p001_pvlines: the স্থানীয় মান digit tree (pp. 1, 3): each digit's line runs down to its row, the row's label, a line,
//   its value; a group of rows can be joined by brackets on both sides with its name between them ("১২ হাজার", "৩১ লক্ষ"),
//   as the book draws it. Class 3's c3p001_pvlines takes one bracket at the end; this one takes any number, in the middle.
// - c4p001_named: the book's pale arrow with a name ("স্থানের নাম") pointing at a block (a table) beside it.
// - c4p001_chip: a digit on an orange square (p. 2: the ৩ that has no place in the girl's table).
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;

function pvlinesSvg({ digits, rows, brackets = [], w = 168, fs = 4.4, rh = 6.4, dw = 4.6, xl, gap = 34 }, ctx) {
  const ds = [...digits].filter((d) => d !== " "), n = ds.length;
  const x0 = 2, yD = fs + 1.2, XL = xl ?? n * dw + 14, XV = w - 2;
  const y0 = yD + rh * 0.95, rowY = (r) => y0 + r * rh, H = rowY(rows.length - 1) + 2.2, mid = (r) => rowY(r) - fs * 0.32;
  const lw = Math.max(...rows.map((r) => [...r[0]].length)) * fs * 0.46 + 2.5, vw = Math.max(...rows.map((r) => [...r[1]].length)) * fs * 0.6 + 2;
  const BL = XL + lw + 6, BR = XV - vw - 6, inB = (r) => brackets.some((b) => r >= b.rows[0] && r <= b.rows[1]);
  const line = (x1, y1, x2, y2) => `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}" stroke="${INK}" stroke-width=".3" fill="none"/>`;
  let g = "";
  ds.forEach((d, i) => {
    const x = x0 + i * dw + dw / 2;
    g += `<text x="${f2(x)}" y="${f2(yD)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${f2(fs * 1.12)}" fill="var(--d)">${ctx.esc(d)}</text>`;
    const y = mid(n - 1 - i);
    g += `<path d="M${f2(x)} ${f2(yD + 1)}V${f2(y)}H${f2(XL - 1.6)}" fill="none" stroke="${INK}" stroke-width=".3"/>`;
  });
  rows.forEach(([lab, val], r) => {
    const y = rowY(r), ym = mid(r);
    g += `<text x="${f2(XL)}" y="${f2(y)}" font-family="Noto Sans Bengali" font-weight="500" font-size="${f2(fs * .9)}" fill="${INK}">${ctx.esc(lab)}</text>`;
    g += inB(r) ? line(XL + lw, ym, BL, ym) + line(BR, ym, XV - vw, ym) : line(XL + lw, ym, XV - vw, ym);
    g += `<text x="${f2(XV)}" y="${f2(y)}" text-anchor="end" font-family="Baloo Da 2" font-weight="700" font-size="${f2(fs)}" fill="var(--c)">${ctx.esc(val)}</text>`;
  });
  for (const b of brackets) {
    const ya = mid(b.rows[0]), yb = mid(b.rows[1]), ym = (ya + yb) / 2;
    g += line(BL, ya, BL, yb) + line(BR, ya, BR, yb);
    g += `<text x="${f2((BL + BR) / 2)}" y="${f2(ym + fs * 0.32)}" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="700" font-size="${f2(fs * .95)}" fill="var(--d)">${ctx.esc(b.text)}</text>`;
  }
  return `<svg class="c4p001-pvl" width="${w}mm" height="${f2(H)}mm" viewBox="0 0 ${w} ${f2(H)}">${g}</svg>`;
}

module.exports = {
  kinds: {
    c4p001_pvlines: (b, ctx) => `<div class="c4p001-pvw">${pvlinesSvg(b, ctx)}</div>`,
    c4p001_named: (b, ctx, page) => `<div class="c4p001-named"><span class="c4p001-arrow" style="width:${b.w || 38}mm">${ctx.esc(b.label)}</span><div class="c4p001-nb">${ctx.blockHtml(b.body, page)}</div></div>`,
    c4p001_chip: (b, ctx) => `<span class="c4p001-chip">${ctx.esc(b.text)}</span>`,
  },
  css: `
.c4p001-pvw { display: flex; justify-content: center } svg.c4p001-pvl { display: block; overflow: visible }
.c4p001-named { display: flex; align-items: center; gap: 3mm }
.c4p001-arrow { flex: none; position: relative; display: flex; align-items: center; height: 13mm; padding: 0 7mm 0 4mm; background: #DBEAFE; color: #1E3A8A;
  font: 700 12pt 'Noto Sans Bengali'; clip-path: polygon(0 18%, 78% 18%, 78% 0, 100% 50%, 78% 100%, 78% 82%, 0 82%) }
.c4p001-nb { flex: 1; min-width: 0 }
.c4p001-chip { display: inline-flex; align-items: center; justify-content: center; width: 10mm; height: 8.5mm; background: #FBBF24; border-radius: 1.6mm; font: 800 13pt 'Baloo Da 2'; color: ${INK}; box-shadow: 0 .6mm 0 #D97706 }
`,
};
