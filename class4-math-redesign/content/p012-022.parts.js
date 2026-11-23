// Printed pages 12–22's own kinds (prefixed c4p012_): the end of chapter ১ (ordering, number cards, number patterns,
// দেখি পারি কি না, নিজে করি). Every count, cell and line is drawn here, so it is exact.
//   c4p012_cards  the book's number cards (one digit each), in rows, some tilted; pink, yellow or orange as printed
//   c4p012_chain  "বৃহত্তর থেকে ক্ষুদ্রতর": a label, then n answer boxes joined by > or <
//   c4p012_grid   an empty grid to write numbers digit under digit (p12: 8 columns × 5 rows)
//   c4p012_box    a label with an answer box beside it (or a box alone, full width, to write a sentence in)
//   c4p012_say    a speech card: রাফি/তুলি (who, mood) or another child (face: a sticker name, colour); text takes the marks below
//   c4p012_tx     a line of text with the marks below
//   c4p012_pat    number patterns: numbers as small beads, blanks as boxes, the book's commas, an optional rule column
//   c4p012_strip  a row of cells (some given, some blank), with an optional last "নিয়ম" cell (pp18, 19)
//   c4p012_ctab   a table with a tone per column, set widths and row heights (pp15, 18, 20, 22)
//   c4p012_fig    p19's figures: tri (three circles on a triangle), cross (boxes on a cross), plus (a plus-shaped table),
//                 wheel (a centre and eight circles joined to it)
//   c4p012_vplace p21's tall place-value table (কোটি … একক, a colour per place) with its title above
//   c4p012_list   numbered items (১) (২) … in a grid whose column widths are set (two columns of unequal width, p21)
//   c4p012_tight  blocks in a column with tighter exercise cards and smaller multiple choice (pp21–22, the fullest pages)
// Marks in c4p012_say / c4p012_tx text (on top of the core's markup): ⟦R:২⟧ a red number (the answers printed red, p17),
// ⟦A:৯৭৪৩২০⟧ a number with the red arrow under it (p14), ⟦X⟧ a red cross, ⟦V⟧ a green tick (p14).
const INK = "#1E2433";
const f2 = (n) => Math.round(n * 100) / 100;

const CROSS = `<svg class="c4p012-mk" viewBox="0 0 10 10" width="3.4mm" height="3.4mm"><path d="M2 2L8 8M8 2L2 8" stroke="#DC2626" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const TICK = `<svg class="c4p012-mk" viewBox="0 0 10 10" width="3.8mm" height="3.8mm"><path d="M1.6 5.4L4 8.2L8.8 1.6" fill="none" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function mdx(ctx, s) {
  return ctx.md(String(s))
    .replace(/⟦R:(.*?)⟧/g, `<span class="c4p012-red">$1</span>`)
    .replace(/⟦A:(.*?)⟧/g, `<span class="c4p012-arr">$1</span>`)
    .replace(/⟦X⟧/g, CROSS).replace(/⟦V⟧/g, TICK);
}

// the book's card colours: [fill, border, digit]
const CARD = { pink: ["#F29AC6", "#9D174D", "#4A0D2A"], yellow: ["#FCC21B", "#A16207", INK], orange: ["#F08A2E", "#9A3412", INK] };
function cardsHtml(b, ctx) {
  const [bg, bd, tx] = CARD[b.tone || "yellow"], s = b.s || 11, tilt = b.tilt || {};
  const one = (d, i) => `<span class="c4p012-card" style="width:${s}mm;height:${f2(s * 1.12)}mm;font-size:${f2(s * 1.45)}pt;background:${bg};border-color:${bd};color:${tx};box-shadow:0 .7mm 0 ${bd}${tilt[i] ? `;transform:rotate(${tilt[i]}deg)` : ""}">${ctx.esc(d)}</span>`;
  const row = (list, k) => `<div class="c4p012-crow" style="gap:${b.gap ?? 6}mm;justify-content:${b.justify || "center"}">${list.map((d, i) => one(d, k == null ? i : `${k}.${i}`)).join("")}</div>`;
  if (b.grid) return `<div class="c4p012-cgrid" style="gap:${b.rgap ?? 3}mm">${b.grid.map((r, k) => row(r, k)).join("")}</div>`;
  return row(b.list);
}

// a sequence: "৬, ৯, _, !২" → beads, blanks and the book's commas (a space instead of a comma keeps the book's missing comma)
function seqHtml(seq, ctx) {
  const parts = seq.split(","), out = [];
  parts.forEach((p, k) => {
    p.trim().split(/\s+/).filter(Boolean).forEach((t) => out.push(t === "_" ? `<span class="c4p012-pb"></span>`
      : t.startsWith("!") ? `<span class="c4p012-pn c4p012-pr">${ctx.esc(t.slice(1))}</span>` : `<span class="c4p012-pn">${ctx.esc(t)}</span>`));
    if (k < parts.length - 1) out.push(`<span class="c4p012-pc">,</span>`);
  });
  return `<span class="c4p012-pi">${out.join("")}</span>`;
}
const ruleHtml = (r, ctx, label = "নিয়ম :") => `<span class="c4p012-rule"><b>${ctx.esc(label)}</b>${r ? `<span class="c4p012-rt">${ctx.md(r)}</span>` : `<i class="c4p012-dl"></i>`}</span>`;

// p19's figures, in mm
const BLANK = { fill: "#FFFBEB", stroke: "#F59E0B" };
function figSvg(b, ctx) {
  const txt = (x, y, t, fs = 5) => t ? `<text x="${f2(x)}" y="${f2(y + fs * 0.36)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${fs}" fill="${INK}">${ctx.esc(t)}</text>` : "";
  const ln = (x1, y1, x2, y2, c = "var(--c)", w = 0.45) => `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}" stroke="${c}" stroke-width="${w}" fill="none"/>`;
  if (b.type === "tri") { // [top-left, top-right, bottom]
    const [a, c, d] = b.v, r = 5.4, W = 44, H = 34, p = [[r + 0.6, r + 0.6], [W - r - 0.6, r + 0.6], [W / 2, H - r - 0.6]];
    let g = ln(...p[0], ...p[1]) + ln(...p[1], ...p[2]) + ln(...p[2], ...p[0]);
    [a, c, d].forEach((t, i) => { const bl = t === ""; g += `<circle cx="${p[i][0]}" cy="${p[i][1]}" r="${r}" fill="${bl ? BLANK.fill : "#fff"}" stroke="${bl ? BLANK.stroke : "var(--c)"}" stroke-width=".55"${bl ? ` stroke-dasharray="1.2 .8"` : ""}/>` + txt(p[i][0], p[i][1], t); });
    return `<svg width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${g}</svg>`;
  }
  if (b.type === "cross") { // { t, l, m, r, b }: boxes on a cross
    const s = 8.4, d = 15, W = 2 * d + s + 1, H = W, cx = W / 2, cy = H / 2;
    const at = { t: [cx, cy - d], l: [cx - d, cy], m: [cx, cy], r: [cx + d, cy], b: [cx, cy + d] };
    let g = ln(cx, cy - d + s / 2, cx, cy + d - s / 2) + ln(cx - d + s / 2, cy, cx + d - s / 2, cy);
    for (const k of ["t", "l", "m", "r", "b"]) { const [x, y] = at[k], t = b.v[k], bl = t === "";
      g += `<rect x="${f2(x - s / 2)}" y="${f2(y - s / 2)}" width="${s}" height="${s}" rx="1.2" fill="${bl ? BLANK.fill : k === "m" ? "var(--s)" : "#fff"}" stroke="${bl ? BLANK.stroke : "var(--c)"}" stroke-width=".55"${bl ? ` stroke-dasharray="1.2 .8"` : ""}/>` + txt(x, y, t, 4.8); }
    return `<svg width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${g}</svg>`;
  }
  if (b.type === "plus") { // { t, l, m, r, b }: a plus-shaped table
    const cw = 15, ch = 8.6, W = 3 * cw + 1, H = 3 * ch + 1, o = 0.5;
    const cell = (i, j, t, fill) => `<rect x="${f2(o + i * cw)}" y="${f2(o + j * ch)}" width="${cw}" height="${ch}" fill="${fill}" stroke="var(--c)" stroke-width=".5"/>` + txt(o + i * cw + cw / 2, o + j * ch + ch / 2, t, 4.6);
    const v = b.v, q = (t) => t === "?" ? "#FFFBEB" : null;
    const g = cell(1, 0, v.t, "#fff") + cell(0, 1, v.l, "#fff") + cell(2, 1, v.r, "#fff") + cell(1, 2, v.b, "#fff") + cell(1, 1, v.m, q(v.m) || "var(--s)");
    return `<svg width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${g}</svg>`;
  }
  if (b.type === "wheel") { // a centre and eight circles, the book's colours, clockwise from the top
    const COL = ["#FDC010", "#D7E021", "#8DC63F", "#8DC63F", "#66BF63", "#68C3A6", "#5FC6D6", "#5F9BD5"];
    const R = 22, r = 6.6, rc = 7.2, W = 2 * (R + r) + 1.2, c = W / 2;
    let g = "", dots = "";
    COL.forEach((col, i) => { const a = (i * 45 - 90) * Math.PI / 180, x = c + R * Math.cos(a), y = c + R * Math.sin(a);
      g += ln(c + (rc + 1.4) * Math.cos(a), c + (rc + 1.4) * Math.sin(a), x - (r + 1.4) * Math.cos(a), y - (r + 1.4) * Math.sin(a), "#1BA1D9", 0.4);
      dots += `<circle cx="${f2(x)}" cy="${f2(y)}" r="${r}" fill="${col}"/><circle cx="${f2(x)}" cy="${f2(y)}" r="${r - 1.5}" fill="#fff" fill-opacity=".55"/>`; });
    dots += `<circle cx="${c}" cy="${c}" r="${rc}" fill="#ADA9AD"/><circle cx="${c}" cy="${c}" r="${rc - 1.5}" fill="#fff" fill-opacity=".55"/>`;
    return `<svg width="${f2(W)}mm" height="${f2(W)}mm" viewBox="0 0 ${f2(W)} ${f2(W)}">${g}${dots}</svg>`;
  }
  throw new Error(`c4p012_fig: type "${b.type}"`);
}

// p21: the places, each with the book's colour [label cell, value cell]
const PLACES = [["কোটি", "#6FCFF5", "#C9EEFB"], ["নিযুত", "#79C25C", "#D3EDC7"], ["লক্ষ", "#C28CC2", "#ECD9EC"], ["অযুত", "#AEDDE8", "#E0F3F7"],
  ["হাজার", "#C7B36B", "#EEE6C9"], ["শতক", "#4FAE8A", "#CBE9DD"], ["দশক", "#B9D433", "#E9F3BE"], ["একক", "#F47562", "#FCD3CC"]];

const TONES = { blue: ["#0EA5E9", "#F0F9FF"], sky: ["#38BDF8", "#E0F2FE"], orange: ["#F97316", "#FFEDD5"], yellow: ["#D97706", "#FEF9C3"],
  pink: ["#DB2777", "#FCE7F3"], green: ["#16A34A", "#F0FDF4"], white: ["#64748B", "#FFFFFF"] };

module.exports = {
  kinds: {
    c4p012_cards: (b, ctx) => `<div class="c4p012-cards">${cardsHtml(b, ctx)}</div>`,

    c4p012_chain: (b, ctx) => {
      const box = `<span class="c4p012-wb" style="width:${b.w || 25}mm;height:${b.h || 9}mm"></span>`;
      return `<div class="c4p012-chain">${b.label ? `<span class="c4p012-cl">${ctx.esc(b.label)}</span>` : ""}<div class="c4p012-cr">${Array.from({ length: b.n || 5 }, () => box).join(`<b class="c4p012-sg">${ctx.esc(b.sign)}</b>`)}</div></div>`;
    },

    c4p012_grid: (b) => {
      const c = b.cell || 9.5, h = b.ch || c;
      return `<table class="c4p012-grid">${`<tr>${`<td style="width:${c}mm;height:${h}mm"></td>`.repeat(b.cols)}</tr>`.repeat(b.rows)}</table>`;
    },

    c4p012_box: (b, ctx) => b.label
      ? `<div class="c4p012-ar" style="justify-content:${b.justify || "flex-start"}"><span class="c4p012-al"${b.lw ? ` style="min-width:${b.lw}mm${b.left ? ";text-align:left" : ""}"` : ""}>${ctx.md(b.label)}</span><span class="c4p012-wb" style="width:${b.w || 40}mm;height:${b.h || 9}mm"></span></div>`
      : `<span class="c4p012-wb c4p012-full" style="height:${b.h || 16}mm"></span>`,

    c4p012_say: (b, ctx) => {
      let h = ctx.sayHtml(b.who || "boy", "\u0001", b.mood || "talk", b.side).replace("\u0001", mdx(ctx, b.text));
      if (b.face) { const src = ctx.sticker(b.face); if (src) h = h.replace(/(<img class="fc" src=")[^"]*/, `$1${src}`); }
      if (b.color) h = h.replace(/--w:[^;"]*/, `--w:${b.color}`);
      return h.replace(`class="say `, `class="say c4p012-say${b.small ? " c4p012-ss" : ""}${b.face ? " c4p012-kid" : ""} `);
    },

    c4p012_tx: (b, ctx) => `<p class="tx${b.center ? " center" : ""}${b.big ? " big" : ""} c4p012-tx">${mdx(ctx, b.text)}</p>`,

    c4p012_pat: (b, ctx) => `<div class="c4p012-pat${b.small ? " c4p012-psm" : ""}${b.xs ? " c4p012-pxs" : ""}" style="gap:${b.gap ?? 2.2}mm">${b.rows.map((r) =>
      `<div class="c4p012-prow" style="grid-template-columns:${r.n || b.nw ? `${b.nw || 9}mm ` : ""}1fr${b.rule ? ` ${b.rule}mm` : ""}">${r.n || b.nw ? `<b class="c4p012-pm">${ctx.esc(r.n || "")}</b>` : ""}<span class="c4p012-pl">${r.lead ? `<span class="c4p012-lead">${ctx.md(r.lead)}</span>` : ""}${seqHtml(r.seq, ctx)}${r.after ? `<span class="c4p012-after">${ctx.md(r.after)}</span>` : ""}</span>${b.rule ? ruleHtml(r.rule, ctx) : ""}</div>`).join("")}</div>`,

    c4p012_strip: (b, ctx) => `<div class="c4p012-strip">${b.n ? `<b class="c4p012-pm">${ctx.esc(b.n)}</b>` : ""}<table><tr>${b.cells.map((c) => c === ""
      ? `<td class="c4p012-sb" style="width:${b.cw || 10.5}mm"></td>` : `<td style="width:${b.cw || 10.5}mm">${ctx.esc(c)}</td>`).join("")}${b.rule != null ? `<td class="c4p012-sr">${ruleHtml(b.rule, ctx)}</td>` : ""}</tr></table></div>`,

    c4p012_ctab: (b, ctx) => {
      const tones = b.tones || [], col = (i) => TONES[tones[i] || b.tone || "blue"], left = b.left || [];
      const cg = b.cols ? `<colgroup>${b.cols.map((w) => `<col style="width:${w}">`).join("")}</colgroup>` : "";
      const head = b.head ? `<tr>${b.head.map((h, i) => `<th style="background:${col(i)[0]}">${ctx.md(h)}</th>`).join("")}</tr>` : "";
      const rows = b.rows.map((r) => `<tr${b.h ? ` style="height:${b.h}mm"` : ""}>${r.map((c, i) => `<td class="${left.includes(i) ? "c4p012-tl" : ""}" style="background:${col(i)[1]}">${c === "…" ? `<i class="c4p012-tw"></i>` : ctx.md(c)}</td>`).join("")}</tr>`).join("");
      const edge = b.edge || col(0)[0];
      return `<table class="c4p012-ctab${b.small ? " c4p012-csm" : ""}" style="--e:${edge};${b.width ? `width:${b.width}mm;` : ""}${b.center ? "margin:0 auto;" : ""}">${cg}${head}${rows}</table>`;
    },

    c4p012_fig: (b, ctx) => `<div class="c4p012-fig">${figSvg(b, ctx)}</div>`,

    c4p012_vplace: (b, ctx) => `<div class="c4p012-vp"><span class="c4p012-vt">${ctx.md(b.title)}</span><table>${PLACES.map(([p, c1, c2]) =>
      `<tr style="height:${b.rh || 6}mm"><td class="c4p012-vl" style="background:${c1}">${p}</td><td class="c4p012-vv" style="background:${c2}">${b.vals && b.vals[p] ? ctx.esc(b.vals[p]) : ""}</td></tr>`).join("")}</table></div>`,

    c4p012_list: (b, ctx) => `<div class="c4p012-list" style="grid-template-columns:${b.cols || "1fr"};row-gap:${b.gap ?? 1.2}mm">${b.items.map((t, i) => `<div class="c4p012-li"><b>(${ctx.bn((b.start || 1) + i)})</b><span>${ctx.md(t)}</span></div>`).join("")}</div>`,

    c4p012_tight: (b, ctx, page) => `<div class="c4p012-tight" style="gap:${b.gap ?? 1.8}mm">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
  },

  css: `
/* marks inside text */
.c4p012-red { color: #DC2626 } svg.c4p012-mk { display: inline-block; vertical-align: -.5mm; margin: 0 .4mm 0 .8mm }
.c4p012-arr { position: relative; display: inline-block; font-family: 'Baloo Da 2'; font-weight: 800 }
.c4p012-arr::after { content: ""; position: absolute; left: 0; right: -2.6mm; bottom: .2mm; height: .45mm; background: #DC2626 }
.c4p012-arr::before { content: ""; position: absolute; right: -3.4mm; bottom: -.75mm; border: 1.2mm solid transparent; border-left: 2mm solid #DC2626; border-right: 0 }
/* number cards */
.c4p012-cards { display: flex; justify-content: center } .c4p012-cgrid { display: flex; flex-direction: column }
.c4p012-crow { display: flex; align-items: center }
.c4p012-card { display: inline-flex; align-items: center; justify-content: center; flex: none; border: .5mm solid; border-radius: 1.8mm; font-family: 'Baloo Da 2'; font-weight: 800; line-height: 1; padding-top: .6mm }
/* answer boxes in a chain, with a label */
.c4p012-chain { display: flex; flex-direction: column; gap: 1.4mm } .c4p012-cl { font: 600 12pt 'Noto Sans Bengali'; color: var(--d) }
.c4p012-cr { display: flex; align-items: center; justify-content: space-between } .c4p012-sg { font: 800 15pt 'Baloo Da 2'; color: #DC2626; padding: 0 1mm }
.c4p012-wb { display: block; flex: none; background: #fff; border: .55mm solid var(--c); border-radius: 2mm; box-shadow: 0 .8mm 0 var(--s) } .c4p012-wb.c4p012-full { width: 100% }
.c4p012-ar { display: flex; align-items: center; gap: 2.4mm } .c4p012-al { font: 500 12.5pt 'Noto Sans Bengali'; white-space: nowrap; text-align: right }
/* the grid to write digits in */
.c4p012-grid { border-collapse: collapse; background: #fff; box-shadow: 0 0 0 .6mm var(--c), 0 1.4mm 0 .6mm var(--s); border-radius: 1mm }
.c4p012-grid td { border: .3mm solid #93C5FD }
/* speech cards */
.c4p012-say .sb { max-width: 145mm } .c4p012-ss .fc { width: 15mm; height: 15mm } .c4p012-ss .sb { font-size: 12pt; padding: 1.8mm 4.4mm 1.6mm }
.c4p012-kid .fc { background: #fff; object-fit: contain; object-position: 50% 100% }
/* number patterns */
.c4p012-pat { display: flex; flex-direction: column; padding-left: 1mm }
.c4p012-prow { display: grid; align-items: center; column-gap: 1.6mm }
.c4p012-pm { font: 800 12.5pt 'Baloo Da 2'; color: #EA580C; white-space: nowrap }
.c4p012-pl { display: flex; align-items: center; flex-wrap: wrap; gap: 1.2mm 0 } .c4p012-pi { display: inline-flex; align-items: center; flex-wrap: wrap; row-gap: 1.2mm }
.c4p012-pn { font: 800 12.5pt/1 'Baloo Da 2'; color: var(--d); background: #fff; border: .5mm solid var(--c); border-radius: 99px; padding: 1.2mm 1.9mm .5mm; min-width: 7.6mm; text-align: center; box-shadow: 0 .5mm 0 var(--s) }
.c4p012-pn.c4p012-pr { color: #DC2626; border-color: #F87171; box-shadow: 0 .5mm 0 #FECACA }
.c4p012-pb { display: inline-block; width: 12.5mm; height: 7.4mm; border: .55mm dashed #F59E0B; background: #FFFBEB; border-radius: 99px }
.c4p012-pc { font: 800 12.5pt 'Baloo Da 2'; color: #64748B; margin: 0 1.2mm 0 .3mm; align-self: flex-end }
.c4p012-pn + .c4p012-pn, .c4p012-pn + .c4p012-pb, .c4p012-pb + .c4p012-pn, .c4p012-pb + .c4p012-pb { margin-left: 2mm }
.c4p012-lead { font: 500 12.5pt 'Noto Sans Bengali'; margin-right: 2.4mm } .c4p012-after { font: 500 12.5pt 'Noto Sans Bengali'; margin-left: 2.4mm }
.c4p012-psm .c4p012-pn { font-size: 11.5pt; padding: 1mm 1.5mm .4mm; min-width: 6.8mm } .c4p012-psm .c4p012-pb { width: 11mm; height: 6.8mm } .c4p012-psm .c4p012-pc { font-size: 11.5pt; margin: 0 .8mm 0 .2mm }
.c4p012-pxs .c4p012-pn { font-size: 11pt; padding: .9mm 1.2mm .3mm; min-width: 6.2mm; border-width: .45mm } .c4p012-pxs .c4p012-pb { width: 10mm; height: 6.6mm } .c4p012-pxs .c4p012-pc { font-size: 11pt; margin: 0 .7mm 0 .2mm }
.c4p012-rule { display: flex; align-items: baseline; gap: 1.6mm; white-space: nowrap } .c4p012-rule b { font: 700 12pt 'Noto Sans Bengali'; color: var(--d) }
.c4p012-rt { font: 700 12.5pt 'Baloo Da 2'; color: #C2410C } .c4p012-dl { flex: 1; min-width: 14mm; border-bottom: .6mm dotted #64748B; transform: translateY(-1mm) }
/* a strip of cells */
.c4p012-strip { display: flex; align-items: center; gap: 2mm } .c4p012-strip table { border-collapse: collapse; background: #fff; box-shadow: 0 1mm 0 var(--s) }
.c4p012-strip td { height: 9mm; border: .45mm solid var(--c); text-align: center; font: 800 13pt 'Baloo Da 2'; color: var(--d); padding-top: .6mm }
.c4p012-strip td.c4p012-sb { background: #FFFBEB } .c4p012-strip td.c4p012-sr { text-align: left; padding: 0 3mm; min-width: 36mm; background: var(--s) }
/* tables with a tone per column */
.c4p012-ctab { width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0; border: .6mm solid var(--e); border-radius: 3mm; overflow: hidden }
.c4p012-ctab th { color: #fff; font: 700 12pt/1.2 'Baloo Da 2'; padding: 1.4mm 1mm 1mm; border-left: .3mm solid rgba(255,255,255,.55) } .c4p012-ctab th:first-child { border-left: 0 }
.c4p012-ctab td { border-top: .3mm solid rgba(0,0,0,.14); border-left: .3mm solid rgba(0,0,0,.14); text-align: center; vertical-align: middle; font: 700 13pt 'Baloo Da 2'; padding: .8mm 1.4mm .4mm; height: 9mm }
.c4p012-ctab tr:first-child td { border-top: 0 } .c4p012-ctab td:first-child { border-left: 0 }
.c4p012-ctab td.c4p012-tl { text-align: left; font: 600 12pt 'Noto Sans Bengali'; padding-left: 3mm }
.c4p012-ctab .c4p012-tw { display: block; border-bottom: .5mm dashed rgba(0,0,0,.25); margin: 3mm 2mm 0 }
.c4p012-csm td { height: 7.4mm; font-size: 12pt } .c4p012-csm td.c4p012-tl { font-size: 11.5pt }
/* p19's figures */
.c4p012-fig { display: flex; justify-content: center } .c4p012-fig svg { display: block; overflow: visible }
/* the tall place-value tables (p21) */
.c4p012-vp { display: flex; flex-direction: column; align-items: center; gap: 1.2mm } .c4p012-vt { font: 700 12.5pt/1.25 'Baloo Da 2'; color: var(--d); white-space: nowrap }
.c4p012-vp table { border-collapse: collapse; width: 44mm; box-shadow: 0 0 0 .5mm #475569; border-radius: 1mm; overflow: hidden }
.c4p012-vp td { border: .3mm solid rgba(30,36,51,.35); font: 700 11.5pt/1 'Baloo Da 2'; text-align: center; padding: .9mm 0 .2mm }
.c4p012-vl { width: 52%; color: ${INK} } .c4p012-vv { color: #9A3412; font-weight: 800 !important }
/* a numbered list */
.c4p012-list { display: grid; column-gap: 6mm; padding-left: 2mm } .c4p012-li { display: flex; gap: 2mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.c4p012-li b { flex: none; font: 800 12.5pt/1.45 'Baloo Da 2'; color: #EA580C; min-width: 8mm }
/* the fullest pages */
.c4p012-tight { display: flex; flex-direction: column } .c4p012-tight .ex { gap: 1.1mm; padding: 1.1mm 3mm 1.4mm } .c4p012-tight .ext { line-height: 1.35 }
.c4p012-tight .c3p011-mcq { gap: .5mm !important } .c4p012-tight .c3p011-mqq, .c4p012-tight .c3p011-mo { font-size: 12pt; line-height: 1.4 } .c4p012-tight .c3p011-mo { padding-top: 0 }
.c4p012-tight .sums { line-height: 1.4; gap: 1mm 4mm; font-size: 12.5pt } .c4p012-tight .c3p011-qs { row-gap: .6mm } .c4p012-tight .c3p011-q { font-size: 12pt; line-height: 1.45 }
.c4p012-tight .tx { line-height: 1.4 } .c4p012-tight .c4p012-li { font-size: 12pt; line-height: 1.4 } .c4p012-tight .c4p012-li b { font-size: 12pt; line-height: 1.4 }
.c4p012-tight .c3p011-cmp { border-spacing: 0 1mm; margin: -.6mm 0 } .c4p012-tight .c3p011-box { height: 7.2mm }
.c4p012-tight .c3p011-mqq .c3p011-qm { font-size: 12pt }
.c4p012-tight .ext.wm { grid-template-columns: 9.4mm 1fr } .c4p012-tight .xm { width: 7.4mm; height: 7.4mm } .c4p012-tight .xm b { font-size: 11pt }
.c4p012-tight .c3p011-mqq, .c4p012-tight .c3p011-mo { line-height: 1.32 } .c4p012-tight .c4p012-csm td { height: 6.6mm }
`,
};
