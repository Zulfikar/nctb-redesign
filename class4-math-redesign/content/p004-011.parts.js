// Printed pages 4–11's own kinds (prefixed c4p004_). Every digit, place, tick and arrow is drawn by code.
// - c4p004_tab     a table whose cells each take a colour (the book's coloured place tables, pp. 4, 5): spans, rowspans,
//                  column widths, header / number / text rows, empty cells to write in
// - c4p004_tree    the digit tree with empty answer boxes (p. 6 অনুশীলন ৮): a line from each digit to its place, a line to its box
// - c4p004_commas  a number in boxes with its commas and the curved arrows that count the digits between them ("২ অঙ্ক", p. 7)
// - c4p004_groups  the place table cut into groups with a big comma between them and a caption under them (p. 7)
// - c4p004_cmpdig  two numbers in digit boxes, one under the other, with labelled arrows into the columns compared (p. 8)
// - c4p004_nline   a number line (0 … 440000, a tick every 10000) with arrows at given numbers and empty boxes above (p. 10)
// - c4p004_rule    the book's rule box with its heading on a pill ("দুইটি সংখ্যা তুলনার পদ্ধতি", p. 10)
// - c4p004_order   a chain of numbers joined by < or >, with arrows up to labels under some of them ("ক্ষুদ্রতম", p. 11)
// - c4p004_line    a centred line of numbers with set gaps (the boxes of numbers written with commas, pp. 9, 11)
// - c4p004_panels  two toned frames side by side at the same height (p. 7's দেশীয় and আন্তর্জাতিক comma panels)
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;

// the tones of c4p004_tab's cells: [background, text]. A capital H = the strong (header) shade with white text.
const TONE = {
  w: ["#FFFFFF", INK],
  bH: ["#2563EB", "#fff"], b: ["#DBEAFE", "#1E3A8A"],
  oH: ["#EA580C", "#fff"], o: ["#FFEDD5", "#9A3412"],
  gH: ["#16A34A", "#fff"], g: ["#DCFCE7", "#166534"],
  pH: ["#DB2777", "#fff"], p: ["#FCE7F3", "#9D174D"],
  yH: ["#CA8A04", "#fff"], y: ["#FEF9C3", "#854D0E"],
  cH: ["#0284C7", "#fff"], c: ["#E0F2FE", "#075985"],
  vH: ["#7C3AED", "#fff"], v: ["#EDE9FE", "#5B21B6"],
  // the paler column tints of p. 5 অনুশীলন ৫ (one per place, like the book's)
  rose: ["#FFE4E6", INK], lime: ["#F7FBC8", INK], mint: ["#D1FAE5", INK], blush: ["#FFF1F2", INK], sage: ["#ECFCCB", INK],
  amber: ["#FEF3C7", INK], salmon: ["#FFE4D6", INK], sky: ["#E0F2FE", INK],
};

function tabHtml(b, ctx) {
  const cols = b.cols ? `<colgroup>${b.cols.map((x) => `<col style="width:${x}">`).join("")}</colgroup>` : "";
  const rows = b.rows.map((r) => {
    const cells = (r.cells || r).map((c0) => {
      const c = c0 && typeof c0 === "object" ? c0 : { c: c0 };
      const [bg, fg] = TONE[c.t || r.t || "w"];
      const type = c.type || r.type || "tx", txt = c.c ?? "";
      const st = `background:${bg};color:${fg}${c.align ? `;text-align:${c.align}` : ""}${c.pad ? `;padding:${c.pad}` : ""}`;
      return `<td class="c4p004-${type}"${c.span ? ` colspan="${c.span}"` : ""}${c.rs ? ` rowspan="${c.rs}"` : ""} style="${st}">${ctx.md(txt)}</td>`;
    }).join("");
    return `<tr${r.in ? ` class="c4p004-in"` : ""}${r.h ? ` style="height:${r.h}mm"` : ""}>${cells}</tr>`;
  }).join("");
  return `<table class="c4p004-tab${b.small ? " c4p004-small" : ""}"${b.width ? ` style="width:${b.width}mm;align-self:center"` : ""}>${cols}${rows}</table>`;
}

// p. 6: the digit tree whose values are left to write, in boxes
function treeSvg({ digits, labels, w = 150, fs = 4.6, rh = 7.2, dw = 5.2, xl = 70, bw = 46, bh = 6.2 }, ctx) {
  const ds = [...digits], n = ds.length, yD = fs + 1, y0 = yD + rh * 1.05, rowY = (r) => y0 + r * rh, mid = (r) => rowY(r) - fs * 0.33;
  const lw = Math.max(...labels.map((l) => [...l].length)) * fs * 0.5 + 1.5, XB = w - bw - 0.5;
  const line = (x1, y1, x2, y2) => `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}" stroke="${INK}" stroke-width=".3" fill="none"/>`;
  let g = "";
  ds.forEach((d, i) => {
    const x = 2 + i * dw + dw / 2, y = mid(n - 1 - i);
    g += `<text x="${f2(x)}" y="${f2(yD)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${f2(fs * 1.15)}" fill="var(--d)">${ctx.esc(d)}</text>`;
    g += `<path d="M${f2(x)} ${f2(yD + 1)}V${f2(y)}H${f2(xl - 2)}" fill="none" stroke="${INK}" stroke-width=".3"/>`;
  });
  labels.forEach((lab, r) => {
    const y = rowY(r), ym = mid(r);
    g += `<text x="${f2(xl + lw)}" y="${f2(y)}" text-anchor="end" font-family="Noto Sans Bengali" font-weight="600" font-size="${f2(fs * .92)}" fill="${INK}">${ctx.esc(lab)}</text>`;
    g += line(xl + lw + 2, ym, XB, ym);
    g += `<rect x="${f2(XB)}" y="${f2(ym - bh / 2)}" width="${bw}" height="${bh}" rx="1.4" fill="#fff" stroke="var(--c)" stroke-width=".45"/>`;
  });
  const H = rowY(labels.length - 1) + bh / 2 + 1;
  return `<svg class="c4p004-svg" width="${w}mm" height="${f2(H)}mm" viewBox="0 0 ${w} ${f2(H)}">${g}</svg>`;
}

// p. 7: the number in boxes with its commas; arcs [from, to, label] run under the boxes between digit boundaries (0 … n),
// their arrowheads at "to" (the comma they count to)
function commasSvg({ digits, commas = [], arcs = [], bw = 8.4, bh = 9.4, fs = 5.6 }, ctx) {
  const ds = [...digits], n = ds.length, W = n * bw + 1, x = (k) => 0.5 + k * bw;
  let g = `<rect x="${f2(x(0))}" y=".5" width="${f2(n * bw)}" height="${bh}" rx="1.4" fill="#fff" stroke="var(--c)" stroke-width=".45"/>`;
  for (let k = 1; k < n; k++) g += `<path d="M${f2(x(k))} .5v${bh}" stroke="var(--c)" stroke-width=".3"/>`;
  ds.forEach((d, i) => {
    g += `<text x="${f2(x(i) + bw / 2)}" y="${f2(0.5 + bh / 2 + fs * 0.36)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${fs}" fill="${INK}">${ctx.esc(d)}</text>`;
    if (commas.includes(i)) g += `<text x="${f2(x(i + 1) - 1.2)}" y="${f2(0.5 + bh / 2 + fs * 0.42)}" text-anchor="end" font-family="Baloo Da 2" font-weight="800" font-size="${fs}" fill="#DC2626">,</text>`;
  });
  const y1 = bh + 1.4, yLow = bh + 8.4, yLab = bh + 10.8;
  for (const [a, b, lab] of arcs) {
    const xa = x(a) - (a === n ? 1.2 : 0.4), xb = x(b) - 0.9, xm = (xa + xb) / 2;
    g += `<path d="M${f2(xa)} ${f2(y1)}C${f2(xa - 1)} ${f2(yLow)} ${f2(xb + 2)} ${f2(yLow)} ${f2(xb + 0.4)} ${f2(y1 + 1.6)}" fill="none" stroke="var(--d)" stroke-width=".45"/>`;
    g += `<path d="M${f2(xb - 0.2)} ${f2(y1 - 0.2)}l-.5 2.6l2.2 -1.2z" fill="var(--d)"/>`;
    g += `<text x="${f2(xm)}" y="${f2(yLab)}" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="600" font-size="3.6" fill="#C2410C">${ctx.esc(lab)}</text>`;
  }
  const H = arcs.length ? yLab + 1.2 : bh + 1;
  return `<svg class="c4p004-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${g}</svg>`;
}

// p. 8: two numbers in digit boxes; arrows [{ col, text }] come from their labels on the right into the columns, top down
function cmpdigSvg({ rows, arrows = [], tint = {}, bw = 11, bh = 9, fs = 6, xt = 96, w = 168 }, ctx) {
  const n = Math.max(...rows.map((r) => [...r].length)), lh = 7.4, y0 = arrows.length * lh + 6, gap = 3.2;
  let g = "";
  arrows.forEach((a, k) => {
    const y = 3.2 + k * lh, xc = 0.5 + a.col * bw + bw / 2;
    g += `<path d="M${f2(xt - 2)} ${f2(y)}H${f2(xc)}V${f2(y0 - 2.2)}" fill="none" stroke="${INK}" stroke-width=".35"/><path d="M${f2(xc - 1.1)} ${f2(y0 - 2.6)}h2.2l-1.1 2.2z" fill="${INK}"/>`;
    g += `<text x="${xt}" y="${f2(y + 1.5)}" font-family="Noto Sans Bengali" font-weight="600" font-size="4.1" fill="var(--d)">${ctx.esc(a.text)}</text>`;
  });
  rows.forEach((r, j) => {
    const ds = [...r], y = y0 + j * (bh + gap);
    ds.forEach((d, i) => {
      const xx = 0.5 + (n - ds.length + i) * bw, col = n - ds.length + i;
      g += `<rect x="${f2(xx)}" y="${f2(y)}" width="${bw}" height="${bh}" fill="${tint[col] || "#fff"}" stroke="var(--c)" stroke-width=".4"/>`;
      g += `<text x="${f2(xx + bw / 2)}" y="${f2(y + bh / 2 + fs * 0.36)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${fs}" fill="${INK}">${ctx.esc(d)}</text>`;
    });
  });
  const H = y0 + rows.length * (bh + gap) - gap + 0.6;
  return `<svg class="c4p004-svg" width="${w}mm" height="${f2(H)}mm" viewBox="0 0 ${w} ${f2(H)}">${g}</svg>`;
}

// p. 10: the number line; labels { value: "text" }, arrows at values with an empty box above each
function nlineSvg({ from = 0, to, minor, mid, major, labels = {}, arrows = [], w = 168 }, ctx) {
  const m = 3, X = (v) => m + (v - from) / (to - from) * (w - 2 * m), yL = 25, bw = 22, bh = 7;
  let g = `<path d="M${f2(m - 1)} ${yL}H${f2(w - m + 0.3)}" stroke="${INK}" stroke-width=".55"/>`;
  for (let v = from; v <= to; v += minor) {
    const t = v % major === 0 ? 6.4 : v % mid === 0 ? 4 : 2.3;
    g += `<path d="M${f2(X(v))} ${yL}v${-t}" stroke="${INK}" stroke-width="${v % major === 0 ? .45 : .3}"/>`;
  }
  for (const [v, t] of Object.entries(labels)) g += `<text x="${f2(X(+v) + (+v === from ? 0 : 0))}" y="${yL - 8}" text-anchor="${+v === from ? "start" : "middle"}" font-family="Baloo Da 2" font-weight="700" font-size="3.9" fill="${INK}">${ctx.esc(t)}</text>`;
  for (const v of arrows) {
    const x = X(v), top = 0.6;
    g += `<rect x="${f2(x - bw / 2)}" y="${top}" width="${bw}" height="${bh}" rx="1.3" fill="#fff" stroke="#0EA5E9" stroke-width=".5"/>`;
    g += `<path d="M${f2(x)} ${f2(top + bh)}V${f2(yL - 4.2)}" stroke="${INK}" stroke-width=".7"/><path d="M${f2(x - 1.5)} ${f2(yL - 4.6)}h3l-1.5 3.6z" fill="${INK}"/>`;
  }
  return `<svg class="c4p004-svg" width="${w}mm" height="${yL + 1}mm" viewBox="0 0 ${w} ${yL + 1}">${g}</svg>`;
}

const upArrow = `<svg width="3mm" height="9mm" viewBox="0 0 3 9"><path d="M1.5 1.8V9" stroke="${INK}" stroke-width=".35"/><path d="M.4 2.6L1.5 0L2.6 2.6Z" fill="${INK}"/></svg>`;

module.exports = {
  kinds: {
    c4p004_tab: (b, ctx) => tabHtml(b, ctx),
    c4p004_tree: (b, ctx) => `<div class="c4p004-wrap">${treeSvg(b, ctx)}</div>`,
    c4p004_commas: (b, ctx) => `<div class="c4p004-wrap">${commasSvg(b, ctx)}</div>`,
    c4p004_groups: (b, ctx) => `<div class="c4p004-groups"><div class="c4p004-grow">${b.groups.map((t, i) =>
      `${i ? `<span class="c4p004-comma">,</span>` : ""}<div class="c4p004-gcell" style="flex:${t.flex || 1}">${tabHtml(t, ctx)}</div>`).join("")}</div>${b.caption ? `<p class="c4p004-gcap">${ctx.md(b.caption)}</p>` : ""}</div>`,
    c4p004_cmpdig: (b, ctx) => `<div class="c4p004-wrap left">${cmpdigSvg(b, ctx)}</div>`,
    c4p004_nline: (b, ctx) => `<div class="c4p004-wrap">${nlineSvg(b, ctx)}</div>`,
    c4p004_rule: (b, ctx) => `<div class="c4p004-rule"><span class="c4p004-rh">${ctx.md(b.head)}</span>${b.items.map(([mk, t, sub]) =>
      `<div class="c4p004-ri${sub ? " c4p004-rs" : ""}"><b>${ctx.esc(mk)}</b><span>${ctx.md(t)}</span></div>`).join("")}</div>`,
    c4p004_order: (b, ctx) => `<div class="c4p004-order">${b.items.map((x, i) => `${i ? `<span class="c4p004-os">${ctx.esc(b.sign || "<")}</span>` : ""}<span class="c4p004-oc"><b>${ctx.esc(x)}</b>${b.marks && b.marks[i] ? `<span class="c4p004-ol">${upArrow}<i>${ctx.esc(b.marks[i])}</i></span>` : ""}</span>`).join("")}</div>`,
    c4p004_panels: (b, ctx, page) => `<div class="c4p004-panels" style="gap:${b.gap ?? 3}mm">${b.panels.map((p) => `<div class="frame toned tone-${p.tone || "blue"}">${p.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>`).join("")}</div>`,
    c4p004_line: (b, ctx) => `<div class="c4p004-line" style="gap:${b.gap ?? 10}mm${b.size ? `;font-size:${b.size}pt` : ""}">${b.items.map((x) => `<span>${ctx.md(x)}</span>`).join("")}</div>`,
  },
  css: `
.c4p004-wrap { display: flex; justify-content: center } .c4p004-wrap.left { justify-content: flex-start; padding-left: 2mm } svg.c4p004-svg { display: block; overflow: visible }
/* coloured tables */
.c4p004-tab { width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0; border: .6mm solid var(--c); border-radius: 3mm; overflow: hidden; background: #fff; box-shadow: 0 1mm 0 var(--s) }
.c4p004-tab td { border-top: .35mm solid rgba(30,36,51,.16); border-left: .35mm solid rgba(30,36,51,.16); text-align: center; vertical-align: middle; padding: 1.1mm 1mm; line-height: 1.25 }
.c4p004-tab tr:first-child td { border-top: 0 } .c4p004-tab td:first-child { border-left: 0 }
.c4p004-tab tr.c4p004-in td:first-child { border-left: .35mm solid rgba(30,36,51,.16) } /* a row whose first cell sits under a rowspan */
.c4p004-hd { font: 800 11.5pt 'Baloo Da 2' } .c4p004-num { font: 800 14pt 'Baloo Da 2' } .c4p004-tx { font: 600 11.5pt 'Noto Sans Bengali' }
.c4p004-small td { padding: .7mm .8mm } .c4p004-small .c4p004-hd { font-size: 10.5pt } .c4p004-small .c4p004-num { font-size: 12.5pt } .c4p004-small .c4p004-tx { font-size: 10.5pt }
/* the place table in groups, with commas */
.c4p004-groups { border: .6mm solid var(--c); border-radius: 4mm; background: linear-gradient(#F8FBFF, #EEF5FF); padding: 2.4mm 3mm 1.6mm; box-shadow: 0 1.2mm 0 var(--s) }
.c4p004-grow { display: flex; align-items: center; gap: 1.2mm } .c4p004-gcell { min-width: 0 } .c4p004-gcell .c4p004-tab { box-shadow: none }
.c4p004-comma { flex: none; width: 4mm; text-align: center; font: 800 22pt/1 'Baloo Da 2'; color: #DC2626; margin-top: 2mm }
.c4p004-gcap { text-align: center; font: 700 12pt/1.3 'Noto Sans Bengali'; color: var(--d); margin-top: 1.8mm }
/* the rule box */
.c4p004-rule { position: relative; margin: 4mm 6mm 0; background: linear-gradient(135deg, #FEF9C3, #FFFBEB); border: .7mm solid #EAB308; border-radius: 7mm; padding: 6.4mm 7mm 3mm; box-shadow: 0 1.2mm 0 #FDE68A; display: flex; flex-direction: column; gap: 1mm }
.c4p004-rh { position: absolute; top: 0; left: 50%; transform: translate(-50%, -55%); white-space: nowrap; font: 800 13.5pt/1 'Baloo Da 2'; color: #fff; background: linear-gradient(90deg, #EA580C, #DB2777); padding: 2.2mm 7mm 1.6mm; border-radius: 99px; box-shadow: 0 .8mm 0 #9D174D }
.c4p004-ri { display: grid; grid-template-columns: 7mm 1fr; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .c4p004-ri b { font: 800 12.5pt/1.45 'Baloo Da 2'; color: #C2410C }
.c4p004-ri.c4p004-rs { grid-template-columns: 10mm 1fr; padding-left: 7mm } .c4p004-ri.c4p004-rs b { font-family: 'Noto Sans Bengali'; font-weight: 700 }
/* a chain of numbers with arrows to labels */
.c4p004-order { display: flex; justify-content: center; align-items: flex-start; gap: 3mm; font: 800 15pt/1.3 'Baloo Da 2'; color: var(--d) }
.c4p004-oc { display: flex; flex-direction: column; align-items: center } .c4p004-os { color: #DC2626 }
.c4p004-ol { display: flex; flex-direction: column; align-items: center; margin-top: .6mm } .c4p004-ol svg { display: block } .c4p004-ol i { font: 700 12pt 'Noto Sans Bengali'; font-style: normal; color: #C2410C; margin-top: .4mm }
/* two panels side by side, the same height */
.c4p004-panels { display: grid; grid-template-columns: 1fr 1fr } .c4p004-panels > .frame { display: flex; flex-direction: column; gap: 2mm; padding: 2.4mm 3mm }
/* a centred line of numbers */
.c4p004-line { display: flex; flex-wrap: wrap; justify-content: center; font: 800 14pt/1.5 'Baloo Da 2'; color: ${INK} }
`,
};
