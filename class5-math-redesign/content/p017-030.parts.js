// Printed pages 17–30's own kinds (chapter ২ গাণিতিক বাক্য, ঐকিক নিয়ম), prefixed c5p017_. Written by a helper (25 Nov 2026).
// Units: mm. Every page's blocks go through c5p017_x (the content file's P()), which is Class 4's c4p067_x (it draws ∴, < >
// and the wide boxes ▭ ▬) plus this chapter's own marks, drawn by code:
//   ✗ a red cross, ✓ a green tick (p17's tries), ≤ (p29's option ঘ), ➡ ⬇ the book's blue block arrows (p25),
//   🟨 🟥 the yellow and the red empty boxes of p23's tape check (the tape's colours),
//   ‹…› words inside a cell of maths, set in Noto Sans Bengali like the labels (p27: "▭ ‹টাকা বিনিয়োগে›").
//
//   c5p017_x      { b }                                      renders block b (or a list) and draws the marks above
//   c5p017_eqs    { rows: [[cell…]…], align?: "rlcl…", lab?: [col…], bw?, bh?, size?, gap?, cgap?, indent?, center? }
//                 working written line under line, its columns lined up (the "=" under the "="): a cell is markup, or
//                 { t, span, al, lb }; lab: the columns in words (Noto Sans Bengali; the rest is maths in Baloo), lb: one
//                 cell in words; bw: ▭'s width. A filled box [[১]] here is the size of an empty one □.
//   c5p017_tab    { cols?: [mm | "%"…], head?: [cell…], rows: [[cell…]…], size?, pad?, plain?, w? }
//                 a table whose cells hold markup or blocks: a cell is markup, or { t | b: [blocks], ctr, span, rs, bg, al,
//                 va, h, lab, link: { dx, len } } (ctr: the blocks centred; link: p25's red line from the cell's right edge
//                 down to the girl)
//   c5p017_tree   {}                                         p18's chart: গাণিতিক বাক্য → খোলা / বদ্ধ বাক্য → সত্য / মিথ্যা বাক্য
//   c5p017_flow   { items: [{ t, shape: "arrow" | "box", fill }], w?, h? }      p21's arrows and box (নতুন আসলেন …)
//   c5p017_tape   { total, parts: [[value, colour]…], labels: [[x%, text, anchor]…], w? }   p23's tape: the total over it,
//                 the "? টাকা" labels, the line with a red dot at every join, the coloured bar (true lengths)
//   c5p017_weave  { days, cloth, top: [[from, to, label]…], bottom: [[from, to, label]…], up?: i, lw?, cw? }
//                 p26's table of days and cloth, the blue arrows over it, the red ones under it, their label boxes
//                 and the pale up-arrow under one label (i: which bottom arrow)
//   c5p017_rules  { title, items: [text…] }                  p20's orange "হিসাবের নিয়ম" box, its title on a tab
//   c5p017_cards  { items: [{ pic, cap }], h, w? }           p23's furniture: each picture over its price strip
//   c5p017_q      { n, text, body?: [blocks] }               a question numbered "(১)" without a marker (p28's review)
//   c5p017_mex    { ex, mark, body: [blocks] }               an exercise card whose marker stands beside its working (p20's
//                                                            worked কাজ ১, printed with no heading line)
//   c5p017_items  { items: [[mark, text]…] }                 items numbered with letters, (ক) (খ) (p30 ১৫), Class 4's look
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;

// ── the marks drawn in the text ──
const CROSS = `<svg class="c5p017-mk" viewBox="0 0 10 10"><path d="M2 2L8 8M8 2L2 8" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const TICK = `<svg class="c5p017-mk" viewBox="0 0 10 10"><path d="M1.3 5.6L3.9 8.6L8.9 1.2" fill="none" stroke="#16A34A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const LE = `<svg class="c5p017-le" viewBox="0 0 10 12"><path d="M8.7 .8L1.5 4.4L8.7 8" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.5 10.9H8.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const RARR = `<svg class="c5p017-fa r" viewBox="0 0 24 14"><path d="M1 4.2H13.6V1L23 7L13.6 13V9.8H1Z" fill="#4F7FD6" stroke="#1E3A8A" stroke-width=".9" stroke-linejoin="round"/></svg>`;
const DARR = `<svg class="c5p017-fa d" viewBox="0 0 14 22"><path d="M4.2 1H9.8V12.6H13L7 21L1 12.6H4.2Z" fill="#4F7FD6" stroke="#1E3A8A" stroke-width=".9" stroke-linejoin="round"/></svg>`;
function marks(html) {
  return String(html).replace(/✗/g, CROSS).replace(/✓/g, TICK).replace(/≤/g, LE).replace(/➡/g, RARR).replace(/⬇/g, DARR)
    .replace(/‹/g, `<span class="c5p017-w">`).replace(/›/g, `</span>`).replace(/🟨/g, `<i class="c5p017-cb" style="--b:#FDE68A;--k:#CA8A04"></i>`).replace(/🟥/g, `<i class="c5p017-cb" style="--b:#F87171;--k:#B91C1C"></i>`);
}

// ── written working, its columns lined up ──
function eqsHtml(b, ctx) {
  const rows = b.rows.map((r) => r.map((c) => (c && typeof c === "object" ? c : { t: c == null ? "" : String(c) })));
  const n = Math.max(...rows.map((r) => r.reduce((s, c) => s + (c.span || 1), 0)));
  const lab = new Set(b.lab || []), al = b.align || "";
  const A = { l: "left", c: "center", r: "right" };
  const html = rows.map((r) => {
    let col = 0;
    const cells = r.map((c) => {
      const i = col; col += c.span || 1;
      const a = A[c.al || al[i] || "l"];
      return `<span class="c5p017-ec${lab.has(i) || c.lb ? " lb" : ""}" style="text-align:${a}${c.span ? `;grid-column:span ${c.span}` : ""}">${ctx.md(c.t)}</span>`;
    }).join("");
    return cells + (col < n ? `<span class="c5p017-ec"></span>`.repeat(n - col) : "");
  }).join("");
  const st = [`grid-template-columns:repeat(${n}, auto)`, b.size ? `font-size:${b.size}pt` : "", b.bw ? `--bw:${b.bw}mm` : "", b.bh ? `--bh:${b.bh}mm` : "",
    b.gap != null ? `row-gap:${b.gap}mm` : "", b.cgap != null ? `column-gap:${b.cgap}mm` : "", b.indent ? `margin-left:${b.indent}mm` : "", b.center ? "align-self:center" : ""].filter(Boolean).join(";");
  return `<div class="c5p017-eqs" style="${st}">${html}</div>`;
}

// ── a table whose cells hold markup or blocks ──
function tabHtml(b, ctx, page) {
  const cell = (c, tag) => {
    const o = c && typeof c === "object" ? c : { t: c == null ? "" : String(c) };
    const inner = o.b ? `<div class="c5p017-tb${o.ctr ? " ctr" : ""}">${o.b.map((x) => ctx.blockHtml(x, page)).join("")}</div>` : ctx.md(o.t || "");
    const st = [o.bg ? `background:${o.bg}` : "", o.al ? `text-align:${o.al}` : "", o.h ? `height:${o.h}mm` : "", o.va ? `vertical-align:${o.va}` : ""].filter(Boolean).join(";");
    const link = o.link ? `<svg class="c5p017-link" style="width:${o.link.dx + 2}mm;height:${o.link.len + 1}mm" viewBox="0 0 ${o.link.dx + 2} ${o.link.len + 1}">
      <path d="M0 .6H${o.link.dx}V${o.link.len - 2.6}L${o.link.dx - 2.6} ${o.link.len}" fill="none" stroke="#DC2626" stroke-width=".5" stroke-linejoin="round"/>
      <path d="M${f2(o.link.dx - 3.6)} ${f2(o.link.len + .9)}L${f2(o.link.dx - 1.9)} ${f2(o.link.len - 2.3)}L${f2(o.link.dx - .6)} ${f2(o.link.len - .9)}Z" fill="#DC2626"/></svg>` : "";
    return `<${tag}${o.span ? ` colspan="${o.span}"` : ""}${o.rs ? ` rowspan="${o.rs}"` : ""}${o.lab ? ` class="lb"` : ""}${st ? ` style="${st}"` : ""}>${inner}${link}</${tag}>`;
  };
  const cols = b.cols ? `<colgroup>${b.cols.map((w) => `<col style="width:${typeof w === "number" ? w + "mm" : w}">`).join("")}</colgroup>` : "";
  const head = b.head ? `<thead><tr>${b.head.map((c) => cell(c, "th")).join("")}</tr></thead>` : "";
  const body = `<tbody>${b.rows.map((r) => `<tr>${r.map((c) => cell(c, "td")).join("")}</tr>`).join("")}</tbody>`;
  const st = [b.size ? `font-size:${b.size}pt` : "", b.pad != null ? `--pad:${b.pad}mm` : "", b.w ? `width:${b.w}mm;align-self:center` : "", b.bw ? `--bw:${b.bw}mm` : ""].filter(Boolean).join(";");
  return `<table class="c5p017-tab${b.plain ? " plain" : ""}"${st ? ` style="${st}"` : ""}>${cols}${head}${body}</table>`;
}

// ── p18: the chart of sentences ──
function treeHtml(b, ctx) {
  // rows: the top box (yA), the line under it (yL), খোলা / বদ্ধ বাক্য (yB), সত্য (yT) and মিথ্যা বাক্য (yF), ৯ + ক = ২১ (yX)
  const W = b.w || 156, yA = 4.2, yL = 12, yB = 20, yT = 8.4, yF = 32.6, yX = 36.4, H = 40.6;
  const BOX = [["গাণিতিক বাক্য", 46, yA, 33], ["খোলা বাক্য", 20, yB, 29], ["বদ্ধ বাক্য", 72, yB, 29], ["সত্য বাক্য", 113, yT, 29], ["মিথ্যা বাক্য", 113, yF, 29]];
  const TXT = [["৯ + ক = ২১", 20, yX, "c"], ["৬ × ৪ = ২৪", 136, yT, "l"], ["২৫ + ৪ > ৩০", 136, yF, "l"]];
  const head = (x, y, a) => `<path d="M0 0L-2.2 -1.1L-1.6 0L-2.2 1.1Z" transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(a)})" fill="${INK}"/>`;
  const arrow = (x1, y1, x2, y2) => `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}" stroke="${INK}" stroke-width=".35"/>` + head(x2, y2, Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI);
  const hh = 3.9; // half a box's height
  let s = `<path d="M46 ${yA + hh}V${yL}M20 ${yL}H72" stroke="${INK}" stroke-width=".35" fill="none"/>`;
  s += arrow(20, yL, 20, yB - hh - .2) + arrow(72, yL, 72, yB - hh - .2) + arrow(20, yB + hh, 20, yX - 3.6);
  s += arrow(86.8, yB - 2.6, 98.2, yT + 2.6) + arrow(86.8, yB + 2.6, 98.2, yF - 2.6) + arrow(127.8, yT, 134.4, yT) + arrow(127.8, yF, 134.4, yF);
  const boxes = BOX.map(([t, x, y, w]) => `<span class="c5p017-tbx" style="left:${x}mm;top:${y}mm;width:${w}mm">${ctx.esc(t)}</span>`).join("");
  const txts = TXT.map(([t, x, y, a]) => `<span class="c5p017-ttx ${a}" style="left:${x}mm;top:${y}mm">${ctx.esc(t)}</span>`).join("");
  return `<div class="c5p017-tree" style="width:${W}mm;height:${H}mm"><svg width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${s}</svg>${boxes}${txts}</div>`;
}

// ── p21: the arrows and the box ──
function flowHtml(b, ctx) {
  const w = b.w || 34, h = b.h || 16;
  return `<div class="c5p017-flow">${b.items.map((it) => {
    const arrow = it.shape === "arrow", fill = it.fill || (arrow ? "#FBC4B4" : "#BAE0F5"), k = it.shape === "arrow" ? "#C2410C" : "#0369A1";
    const shape = arrow ? `M.4 ${f2(h * .14)}H${f2(w * .76)}V.4L${f2(w - .4)} ${f2(h / 2)}L${f2(w * .76)} ${f2(h - .4)}V${f2(h * .86)}H.4Z` : `M.4 .4H${f2(w - .4)}V${f2(h - .4)}H.4Z`;
    return `<span class="c5p017-fi" style="width:${w}mm;height:${h}mm"><svg viewBox="0 0 ${w} ${h}" width="${w}mm" height="${h}mm"><path d="${shape}" fill="${fill}" stroke="${k}" stroke-width=".5" stroke-linejoin="round"/></svg><span class="c5p017-ft" style="${arrow ? `width:${f2(w * .76)}mm` : `width:${w}mm`}">${ctx.md(it.t)}</span></span>`;
  }).join("")}</div>`;
}

// ── p23: the tape ──
function tapeHtml(b, ctx) {
  const W = b.w || 150, lh = 8, lineH = 5, bh = 9, total = b.parts.reduce((s, [v]) => s + v, 0);
  let x = 0, segs = "", dots = [0];
  for (const [v, c] of b.parts) { const w = W * v / total; segs += `<rect x="${f2(x)}" y="${lh + lineH}" width="${f2(w)}" height="${bh}" fill="${c}" stroke="${INK}" stroke-width=".35"/>`; x += w; dots.push(x); }
  const y = lh + lineH / 2;
  const svg = `<svg width="${W}mm" height="${lh + lineH + bh}mm" viewBox="0 0 ${W} ${lh + lineH + bh}" class="c5p017-tsv">
    <rect x=".2" y=".2" width="${W - .4}" height="${lh + lineH + bh - .4}" fill="#fff" stroke="${INK}" stroke-width=".4"/>
    <path d="M0 ${lh}H${W}M0 ${f2(y - .5)}H${W}M0 ${f2(y + .5)}H${W}" stroke="${INK}" stroke-width=".25"/>
    ${segs}${dots.map((d) => `<circle cx="${f2(Math.min(W - 1.2, Math.max(1.2, d)))}" cy="${f2(y)}" r="1.2" fill="#EF4444"/>`).join("")}</svg>`;
  const labels = b.labels.map(([p, t, a]) => `<span class="c5p017-tl ${a || "c"}" style="left:${f2(W * p / 100)}mm">${ctx.md(t)}</span>`).join("");
  return `<div class="c5p017-tape" style="width:${W}mm"><div class="c5p017-tt">${ctx.md(b.total)}</div><div class="c5p017-tw">${svg}<div class="c5p017-tls" style="height:${lh}mm">${labels}</div></div></div>`;
}

// ── p26: days and cloth, with the arrows ──
function weaveHtml(b, ctx) {
  const lw = b.lw || 26, cw = b.cw || 9.4, rh = b.rh || 8.2, n = b.days.length, W = lw + n * cw;
  const top = 15.5, k = 8, bot = 15.5, upH = b.up != null ? 10 : 0, H = top + 2 * rh + bot + upH, y0 = top, y1 = top + 2 * rh;
  const cx = (i) => lw + (i + .5) * cw;
  const head = (x, y, a, c) => `<path d="M0 0L-2.6 -1.35L-1.9 0L-2.6 1.35Z" transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(a)})" fill="${c}"/>`;
  const arc = (a, z, up, c) => {
    const x1 = cx(a), x2 = cx(z), yy = up ? y0 - .4 : y1 + .4, s = up ? -1 : 1, d = (x2 > x1 ? -1 : 1) * Math.min(4, Math.abs(x2 - x1) / 4);
    const c1 = [x1, yy + s * k], c2 = [x2 + d, yy + s * k], end = [x2 - (x2 > x1 ? 0 : -0), yy];
    const ang = Math.atan2(end[1] - c2[1], end[0] - c2[0]) * 180 / Math.PI;
    // the shaft ends a little before the tip, so the head's point is sharp
    const tx = end[0] - 1.6 * Math.cos(ang * Math.PI / 180), ty = end[1] - 1.6 * Math.sin(ang * Math.PI / 180);
    return { path: `<path d="M${f2(x1)} ${f2(yy)}C${f2(c1[0])} ${f2(c1[1])} ${f2(c2[0])} ${f2(c2[1])} ${f2(tx)} ${f2(ty)}" fill="none" stroke="${c}" stroke-width="1" stroke-linecap="round"/>` + head(end[0], end[1], ang, c),
      mid: (x1 + x2) / 2, peak: yy + s * k * .75 };
  };
  let svg = "", labs = "";
  for (const [a, z, t] of b.top || []) { const r = arc(a, z, true, "#1D4ED8"); svg += r.path; labs += `<span class="c5p017-wl" style="left:${f2(r.mid)}mm;top:${f2(r.peak - 1.2)}mm;transform:translate(-50%,-100%)">${ctx.md(t)}</span>`; }
  (b.bottom || []).forEach(([a, z, t, at], i) => {
    const r = arc(a, z, false, "#EF4444"), x = at != null ? lw + at * cw : r.mid;
    svg += r.path; labs += `<span class="c5p017-wl" style="left:${f2(x)}mm;top:${f2(r.peak + 1.4)}mm;transform:translateX(-50%)">${ctx.md(t)}</span>`;
    if (b.up === i) {
      const ux = x, uy = r.peak + 1.4 + 7.6 + 1, uh = H - uy - .4;
      svg += `<path d="M${f2(ux)} ${f2(uy)}L${f2(ux + 4.4)} ${f2(uy + 4)}H${f2(ux + 2)}V${f2(uy + uh)}H${f2(ux - 2)}V${f2(uy + 4)}H${f2(ux - 4.4)}Z" fill="#BFE3F7" stroke="#3B5BA9" stroke-width=".4" stroke-linejoin="round"/>`;
    }
  });
  const cell = (t, cls = "") => `<td class="${cls}">${ctx.md(t)}</td>`;
  const table = `<table class="c5p017-wt" style="top:${top}mm;left:0;width:${f2(W)}mm"><colgroup><col style="width:${lw}mm">${b.days.map(() => `<col style="width:${cw}mm">`).join("")}</colgroup>
    <tr style="height:${rh}mm">${cell("দিন", "h")}${b.days.map((d) => cell(d)).join("")}</tr>
    <tr style="height:${rh}mm">${cell("কাপড় (মি)", "h")}${b.cloth.map((d) => cell(d)).join("")}</tr></table>`;
  return `<div class="c5p017-weave" style="width:${f2(W)}mm;height:${f2(H)}mm"><svg width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${svg}</svg>${table}${labs}</div>`;
}

module.exports = {
  kinds: {
    c5p017_x: (b, ctx, page) => marks(ctx.blockHtml({ kind: "c4p067_x", b: b.b }, page)),
    c5p017_eqs: (b, ctx) => eqsHtml(b, ctx),
    c5p017_tab: (b, ctx, page) => tabHtml(b, ctx, page),
    c5p017_tree: (b, ctx) => `<div class="c5p017-c">${treeHtml(b, ctx)}</div>`,
    c5p017_flow: (b, ctx) => flowHtml(b, ctx),
    c5p017_tape: (b, ctx) => `<div class="c5p017-c">${tapeHtml(b, ctx)}</div>`,
    c5p017_weave: (b, ctx) => `<div class="c5p017-c">${weaveHtml(b, ctx)}</div>`,
    c5p017_rules: (b, ctx) => `<div class="c5p017-rules"><span class="c5p017-rh">${ctx.esc(b.title)}</span><div class="c5p017-rl">${b.items.map((t, i) =>
      `<b>${ctx.bn(i + 1)}।</b><span>${ctx.md(t)}</span>`).join("")}</div></div>`,
    c5p017_cards: (b, ctx) => `<div class="c5p017-cards">${b.items.map((it) => `<div class="c5p017-card" style="${it.w ? `width:${it.w}mm` : ""}">${ctx.picHtml({ pic: it.pic, h: b.h || 36 })}<span class="c5p017-cap">${ctx.md(it.cap)}</span></div>`).join("")}</div>`,
    c5p017_q: (b, ctx, page) => `<div class="c5p017-q"><b>${ctx.esc(b.n)}</b><span>${ctx.md(b.text)}</span>${b.body ? `<div class="c5p017-qb">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>` : ""}</div>`,
    // an exercise card whose marker stands beside its working (p20's worked ১, printed with no heading line)
    c5p017_mex: (b, ctx, page) => `<div class="ex m-${b.mark}"><div class="c5p017-mex">${ctx.exMark(b.mark, b.ex)}<div class="c5p017-mb">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div></div></div>`,
    // items numbered with letters, as printed: { items: [[mark, text]…] } → (ক) …, (খ) …
    c5p017_items: (b, ctx) => `<div class="c4p067-items" style="grid-template-columns:auto">${b.items.map(([m, t]) => `<span class="c4p067-it"><b>(${ctx.esc(m)})</b><span>${ctx.md(t)}</span></span>`).join("")}</div>`,
  },
  css: `
/* marks in the text */
svg.c5p017-mk { display: inline-block; width: 4.6mm; height: 4.6mm; vertical-align: -.6mm }
svg.c5p017-le { display: inline-block; width: .62em; height: .78em; vertical-align: -.1em; overflow: visible; margin: 0 .07em }
svg.c5p017-fa.r { display: inline-block; width: 7.6mm; height: 4.6mm; vertical-align: middle } svg.c5p017-fa.d { display: block; width: 4.2mm; height: 6.4mm; margin: 0 auto .6mm }
.c5p017-cb { display: inline-block; width: 12.5mm; height: 6.6mm; vertical-align: -1.8mm; background: var(--b); border: .45mm solid var(--k); margin: 0 .8mm }
.c5p017-c { display: flex; justify-content: center } .c5p017-w { font: 600 .95em 'Noto Sans Bengali' }
/* written working */
.c5p017-eqs { display: grid; gap: 1.6mm 1.6mm; align-items: center; justify-content: start; font: 700 13pt/1.3 'Baloo Da 2'; align-self: flex-start }
.c5p017-ec { white-space: nowrap } .c5p017-eqs .ansbox { min-width: 11mm; height: 7.6mm; padding: .6mm 2mm 0; vertical-align: -2.2mm; font-size: 1em; line-height: 6.4mm; margin: 0 .8mm } .c5p017-ec.lb { font: 600 .95em/1.35 'Noto Sans Bengali' }
/* tables whose cells hold blocks */
.c5p017-tab { border-collapse: separate; border-spacing: 0; border: .6mm solid var(--c); border-radius: 3mm; background: #fff; box-shadow: 0 1.2mm 0 var(--s); font: 500 12pt/1.4 'Noto Sans Bengali'; width: 100% }
.c5p017-tab th { background: var(--s); color: var(--d); font: 700 12.5pt/1.3 'Baloo Da 2'; padding: 1.4mm 1.4mm 1mm; border-left: .3mm solid color-mix(in srgb, var(--c) 45%, #fff) }
.c5p017-tab td { position: relative; padding: var(--pad, 1.6mm) 2.2mm; vertical-align: middle; text-align: center; border-top: .3mm solid color-mix(in srgb, var(--c) 45%, #fff); border-left: .3mm solid color-mix(in srgb, var(--c) 45%, #fff) }
.c5p017-tab tr > :first-child { border-left: 0 } .c5p017-tab tbody tr:first-child td { border-top: 0 } .c5p017-tab thead + tbody tr:first-child td { border-top: .3mm solid color-mix(in srgb, var(--c) 45%, #fff) }
.c5p017-tab thead tr:first-child th:first-child { border-top-left-radius: 2.4mm } .c5p017-tab thead tr:first-child th:last-child { border-top-right-radius: 2.4mm }
.c5p017-tab td.lb { font: 600 12pt/1.35 'Noto Sans Bengali' }
.c5p017-tb { display: flex; flex-direction: column; gap: 1.2mm; align-items: flex-start } .c5p017-tb.ctr { align-items: center }
.c5p017-tab.plain { box-shadow: none; border-width: .45mm }
svg.c5p017-link { position: absolute; left: calc(100% - 1mm); top: 50%; overflow: visible }
/* p18's chart */
.c5p017-tree { position: relative; flex: none } .c5p017-tree > svg { position: absolute; left: 0; top: 0 }
.c5p017-tbx { position: absolute; transform: translate(-50%, -50%); height: 7.8mm; display: flex; align-items: center; justify-content: center; padding-top: .6mm; background: #FCE7F3; border: .45mm solid #DB2777; border-radius: 2.4mm; font: 700 12.5pt 'Baloo Da 2'; color: #831843; box-shadow: 0 .7mm 0 #FBCFE8 }
.c5p017-ttx { position: absolute; transform: translate(-50%, -50%); font: 700 13pt 'Baloo Da 2'; white-space: nowrap; padding-top: .6mm } .c5p017-ttx.l { transform: translate(0, -50%) }
/* p21's arrows */
.c5p017-flow { display: flex; align-items: center; gap: 2.4mm; flex: none }
.c5p017-fi { position: relative; flex: none } .c5p017-fi > svg { position: absolute; left: 0; top: 0 }
.c5p017-ft { position: absolute; left: 0; top: 0; height: 100%; display: flex; align-items: center; justify-content: center; text-align: center; font: 700 11.5pt/1.25 'Baloo Da 2'; padding-top: .6mm }
/* p23's tape */
.c5p017-tape { display: flex; flex-direction: column; align-items: center; gap: 1mm; flex: none }
.c5p017-tt { font: 700 13pt 'Baloo Da 2' } .c5p017-tw { position: relative; width: 100% } .c5p017-tsv { display: block }
.c5p017-tls { position: absolute; left: 0; top: 0; width: 100% }
.c5p017-tl { position: absolute; top: 50%; transform: translate(-50%, -50%); font: 700 12pt 'Baloo Da 2'; white-space: nowrap; padding-top: .6mm }
.c5p017-tl.r { transform: translate(calc(-100% - 2mm), -50%) }
/* p26's table with arrows */
.c5p017-weave { position: relative; flex: none } .c5p017-weave > svg { position: absolute; left: 0; top: 0; overflow: visible }
table.c5p017-wt { position: absolute; border-collapse: collapse; table-layout: fixed; background: #fff }
.c5p017-wt td { border: .4mm solid ${INK}; text-align: center; font: 700 12pt 'Baloo Da 2'; padding: .8mm 0 0; white-space: nowrap }
.c5p017-wt td.h { background: #FDE2D6; font: 700 12.5pt 'Baloo Da 2' }
.c5p017-wl { position: absolute; white-space: nowrap; font: 700 12pt 'Baloo Da 2'; background: #fff; border: .4mm solid ${INK}; padding: .8mm 3mm 0; height: 7.6mm; display: flex; align-items: center }
/* p20's rules */
.c5p017-rules { position: relative; background: #FED7AA; border-radius: 4mm; padding: 6.4mm 6mm 3mm; margin-top: 4.4mm; box-shadow: 0 1.2mm 0 #FDBA74 }
.c5p017-rh { position: absolute; left: 50%; top: 0; transform: translate(-50%, -55%); background: #FB923C; color: #fff; font: 800 14pt 'Baloo Da 2'; padding: 1.4mm 9mm .8mm; border-radius: 2.4mm; box-shadow: 0 .8mm 0 #EA580C; white-space: nowrap }
.c5p017-rl { display: grid; grid-template-columns: 8mm 1fr; gap: 1mm 0; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .c5p017-rl b { font: 800 12.5pt/1.45 'Baloo Da 2'; color: #9A3412 }
/* p23's furniture */
.c5p017-cards { display: flex; justify-content: space-between; gap: 4mm }
.c5p017-card { flex: 1 1 0; display: flex; flex-direction: column; background: #fff; border: .6mm solid var(--c); border-radius: 3.4mm; overflow: hidden; box-shadow: 0 1.2mm 0 var(--s) }
.c5p017-card .pic { border-radius: 0; align-self: stretch; margin: 1.6mm 2mm 1mm } .c5p017-card .pic img { mix-blend-mode: normal }
.c5p017-cap { background: #BAE6FD; border-top: .4mm solid #0EA5E9; text-align: center; font: 700 12.5pt 'Baloo Da 2'; padding: 1.4mm 0 .8mm; color: #0C4A6E }
/* an exercise whose marker stands beside its working */
.c5p017-mex { display: grid; grid-template-columns: 10mm 1fr; align-items: start } .c5p017-mb { display: flex; flex-direction: column; gap: 2mm }
/* a question numbered (১) */
.c5p017-q { display: grid; grid-template-columns: 10mm 1fr; row-gap: 2mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.c5p017-q > b { font: 800 13pt/1.45 'Baloo Da 2'; color: #EA580C } .c5p017-qb { grid-column: 1 / -1; display: flex; flex-direction: column; gap: 2mm }
`,
};
