// Printed pages 91–104's own kinds (prefixed c5p091_, classes c5p091-): chapter ৬ শতকরা (percent as hundredths, % of a
// number, percent bars, profit and loss, the cost price, মুনাফা and its rate, দেখি পারি কি না, নিজে করি). Written by a
// helper, 25 Nov 2026. Units: mm. Every share, count, cell and arrow is drawn here by code. The 10 × 10 percent grids are
// wave 1's c5p063_grid (content/p063-073.parts.js), the lines of working with ditto marks wave 1's c5p017_eqs.
//
//   c5p091_x       renders a block (or a list) and draws its answer boxes: ▭ a box var(--bw) wide (18 mm), and inside a
//                  fraction ({{▭ × ▭/▭}}) a box var(--fw) wide (12 mm): { b, bw?, fw?, gap?, indent?, fs?, center? }
//   c5p091_hl      the book's tinted boxes of words (p97's লাভ = … in yellow, ক্ষতি = … in pink, p99–100's pink boxes):
//                  { text, tone: "yellow" | "pink" | "rose" | "peach", center?, w? }
//   c5p091_pbar    a percent bar in its panel (pp93–94): 0 to 100 %, the first `pct` % filled, labels above it, under it
//                  and under those, each at its % from the left: { pct, bw (the bar's width), bh?, fill, rest, bg, bd,
//                  top: [[%, text, anchor?]], bottom: [...], under: [...], th?, bth?, uh? (the rows' heights), inside (words
//                  in the filled part), brace (a boxed label over a bracket spanning the bar, p94), braceL (a label at the
//                  bracket's left end) }. anchor: "l" | "c" | "r" (default: l at 0 %, r at 100 %, c between).
//   c5p091_scale   p95: the scale (100 small steps, longer at every 5 and 10) over bars of cells, each bar's labels under it:
//                  { w, sh?, bh?, bars: [{ n (cells), a (the first colour's cells), ca, cb, labels: [[%, text]] }] }
//   c5p091_fig     a small diagram in SVG, every piece placed in mm (pp97–99's cost and selling price boxes):
//                  { w, h, items: [{ r: [x, y, w, h], fill?, stroke?, sw?, rx? } | { t, at: [x, y], fs?, a?: "s"|"m"|"e",
//                  f?: "b" (Baloo; default Noto Sans Bengali), fill? } | { dbl: [x1, x2, y] } (a double-headed arrow) |
//                  { cv: [x1, y1, cx, cy, x2, y2], c? } (a curved arrow, its head at the end) | { ar: [x1, y1, x2, y2], c?,
//                  sw? (the line's width), hs? (the head's size) }] }
//   c5p091_stairs  p100: the table of আসল and মুনাফা, one more মুনাফা each year: { rows: [[label, আসল, n, মুনাফা]] }
//   c5p091_flowers p93: the flowers in their boxes (20 a box, 4 to a row): { cells: [[sticker, emoji]], n?, perRow?, size? }
//   c5p091_heap    p103: mangoes in a heap, each placed: { w, h, size, items: [[x %, y %, turn°, green?]] } (ripe: the
//                  "mango" sticker; green: "green-mango", or until it comes the ripe one tinted green)
//   c5p091_gallery p102: the gallery's 10 rows of 10 seats, a spectator on the seats marked 1: { rows: ["0101…" × 10], cw?, ch? }
//   c5p091_wall    p102: a brick wall, its left `part` painted brick red, the rest white: { w, h, part, rows?, bl? }
//   c5p091_mcq     tick questions as Class 3's c3p078_mcq (its look), the options in 4 equal columns lined up from item to
//                  item, and an `aside` block beside a question (p103 (৩)'s strip): { items: [{ n, q, opts, aside? }] }
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const BAL = "'Baloo Da 2'", BEN = "'Noto Sans Bengali'";
const BOX = `<span class="c5p091-wb"></span>`;
const mdx = (ctx, s) => ctx.md(s == null ? "" : String(s)).replace(/▭/g, BOX);
const COL = { green: "#16A34A", red: "#EF2B2D", orange: "#F7931E", lime: "#BFD730", pink: "#F472B6", yellow: "#FDE047" };
const col = (c, d) => COL[c] || c || d;
const svg = (w, h, s) => `<svg class="c5p091-svg" width="${f2(w)}mm" height="${f2(h)}mm" viewBox="0 0 ${f2(w)} ${f2(h)}">${s}</svg>`;
let UID = 0;
// an arrowhead with its tip at (x, y), pointing along ang (degrees, 0 = right)
const head = (x, y, ang, c = INK, s = 1.5) => {
  const a = ang * Math.PI / 180, p = (k) => `${f2(x - s * Math.cos(a) + k * s * .42 * Math.sin(a))} ${f2(y - s * Math.sin(a) - k * s * .42 * Math.cos(a))}`;
  return `<path d="M${f2(x)} ${f2(y)}L${p(1)}L${p(-1)}Z" fill="${c}"/>`;
};

// ── p95's scale and bars ──
function scaleHtml(b, ctx) {
  const W = b.w || 160, sh = b.sh || 11, bh = b.bh || 7.4, X = (i) => .25 + i * (W - .5) / 100;
  let t = "";
  for (let i = 0; i <= 100; i++) {
    const L = i % 10 === 0 ? sh : i % 5 === 0 ? sh * .62 : sh * .3;
    t += `<path d="M${f2(X(i))} ${f2((sh - L) / 2)}V${f2((sh + L) / 2)}" stroke="${INK}" stroke-width="${i % 10 === 0 ? .24 : .16}"/>`;
  }
  const bars = b.bars.map((br) => {
    const cw = (W - .5) / br.n;
    let s = "";
    for (let i = 0; i < br.n; i++) s += `<rect x="${f2(.25 + i * cw)}" y=".25" width="${f2(cw)}" height="${f2(bh - .5)}" fill="${i < br.a ? col(br.ca) : col(br.cb)}" stroke="${INK}" stroke-width=".14"/>`;
    s += `<rect x=".25" y=".25" width="${f2(W - .5)}" height="${f2(bh - .5)}" fill="none" stroke="${INK}" stroke-width=".42"/>`;
    return `<div class="c5p091-sb">${svg(W, bh, s)}<div class="c5p091-sl">${br.labels.map(([p, tx]) => `<span style="left:${p}%">${mdx(ctx, tx)}</span>`).join("")}</div></div>`;
  }).join("");
  return `<div class="c5p091-scale" style="width:${W}mm">${svg(W, sh, t)}${bars}</div>`;
}

// ── a percent bar in its panel (pp93–94) ──
function pbarHtml(b, ctx) {
  const bw = b.bw || 92, bh = b.bh || 7.6;
  const row = (arr, cls, h) => arr ? `<div class="c5p091-pr ${cls}" style="height:${h}mm">${arr.map(([p, t, a]) =>
    `<span class="${a || (p <= 0 ? "l" : p >= 100 ? "r" : "c")}" style="left:${p}%">${mdx(ctx, t)}</span>`).join("")}</div>` : "";
  const brace = b.brace ? `<div class="c5p091-pbr"><span class="c5p091-pbt">${mdx(ctx, b.brace)}</span>${b.braceL ? `<span class="c5p091-pbl">${mdx(ctx, b.braceL)}</span>` : ""}${svg(bw, 6.6,
    `<path d="M${f2(bw / 2)} 0V3.2M.2 5.6V3.2H${f2(bw - .2)}V5.6" fill="none" stroke="${INK}" stroke-width=".3"/>`)}</div>` : "";
  const bar = `<div class="c5p091-pbb" style="height:${bh}mm"><i style="width:${b.pct}%;background:${col(b.fill, COL.orange)}">${b.inside ? mdx(ctx, b.inside) : ""}</i><i style="flex:1;background:${col(b.rest, "#fff")}"></i></div>`;
  return `<div class="c5p091-pb" style="--pbg:${b.bg || "#A5DEEA"};--pbd:${b.bd || "#475569"}"><div style="width:${bw}mm">${row(b.top, "t", b.th || 6.5)}${brace}${bar}${row(b.bottom, "b", b.bth || 6.6)}${row(b.under, "u", b.uh || 10)}</div></div>`;
}

// ── a small diagram, every piece placed (pp97–99) ──
function figSvg(b) {
  let s = "";
  for (const it of b.items) {
    if (it.r) { const [x, y, w, h] = it.r; s += `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}"${it.rx ? ` rx="${it.rx}"` : ""} fill="${it.fill || "#fff"}" stroke="${it.stroke || INK}" stroke-width="${it.sw ?? .3}"/>`; continue; }
    if (it.t != null) {
      const [x, y] = it.at;
      s += `<text x="${f2(x)}" y="${f2(y)}" font-family="${it.f === "b" ? BAL : BEN}" font-weight="${it.w || (it.f === "b" ? 700 : 600)}" font-size="${f2(it.fs || 3.7)}" text-anchor="${{ s: "start", m: "middle", e: "end" }[it.a || "s"]}" fill="${it.fill || INK}">${esc(it.t)}</text>`;
      continue;
    }
    if (it.dbl) { const [x1, x2, y] = it.dbl, c = it.c || INK; s += `<path d="M${f2(x1 + 1.2)} ${f2(y)}H${f2(x2 - 1.2)}" stroke="${c}" stroke-width=".3"/>${head(x1, y, 180, c, 1.6)}${head(x2, y, 0, c, 1.6)}`; continue; }
    if (it.ar) { const [x1, y1, x2, y2] = it.ar, c = it.c || INK, hs = it.hs || 1.6, a = Math.atan2(y2 - y1, x2 - x1), d = hs * .8; s += `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2 - d * Math.cos(a))} ${f2(y2 - d * Math.sin(a))}" stroke="${c}" stroke-width="${it.sw || .3}"/>${head(x2, y2, a * 180 / Math.PI, c, hs)}`; continue; }
    if (it.cv) {
      const [x1, y1, cx, cy, x2, y2] = it.cv, c = it.c || INK, a = Math.atan2(y2 - cy, x2 - cx), d = 1.2;
      s += `<path d="M${f2(x1)} ${f2(y1)}Q${f2(cx)} ${f2(cy)} ${f2(x2 - d * Math.cos(a))} ${f2(y2 - d * Math.sin(a))}" fill="none" stroke="${c}" stroke-width=".3"/>${head(x2, y2, a * 180 / Math.PI, c, 1.6)}`;
    }
  }
  return svg(b.w, b.h, s);
}

// ── p102's gallery: 10 rows of 10 seats, a spectator on each seat marked 1 ──
const SHIRTS = ["#16A34A", "#F97316", "#DC2626", "#EC4899", "#9F1239", "#22C55E", "#EA580C", "#15803D"];
function gallerySvg(b) {
  const R = b.rows.length, C = b.rows[0].length, cw = b.cw || 6.4, ch = b.ch || 5.4, x0 = 1, y0 = 1.2, W = C * cw + 2, H = R * ch + 5.4;
  let s = `<rect x=".2" y=".2" width="${f2(W - .4)}" height="${f2(H - .4)}" rx="1" fill="#7DD3E0" stroke="#0E7490" stroke-width=".3"/>`;
  for (let c = 0; c <= C; c++) s += `<path d="M${f2(x0 + c * cw)} ${f2(y0)}V${f2(y0 + R * ch + .6)}" stroke="#0E7490" stroke-width=".35"/>`;
  b.rows.forEach((row, r) => [...row].forEach((v, c) => {
    const x = x0 + c * cw, y = y0 + r * ch;
    s += `<rect x="${f2(x + .65)}" y="${f2(y + .25)}" width="${f2(cw - 1.3)}" height="${f2(ch * .58)}" rx=".7" fill="#FACC15" stroke="#A16207" stroke-width=".18"/>`;
    s += `<rect x="${f2(x + .45)}" y="${f2(y + ch * .6)}" width="${f2(cw - .9)}" height="${f2(ch * .26)}" rx=".5" fill="#EAB308" stroke="#A16207" stroke-width=".18"/>`;
    if (v !== "1") return;
    const k = SHIRTS[(c * 3 + r * 5) % SHIRTS.length], cx = x + cw / 2, hy = y + ch * .27, hr = ch * .17;
    s += `<path d="M${f2(x + 1.25)} ${f2(y + ch * .88)}V${f2(y + ch * .58)}Q${f2(x + 1.25)} ${f2(y + ch * .42)} ${f2(cx)} ${f2(y + ch * .42)}Q${f2(x + cw - 1.25)} ${f2(y + ch * .42)} ${f2(x + cw - 1.25)} ${f2(y + ch * .58)}V${f2(y + ch * .88)}Z" fill="${k}" stroke="rgba(0,0,0,.45)" stroke-width=".14"/>`;
    s += `<circle cx="${f2(cx)}" cy="${f2(hy)}" r="${f2(hr)}" fill="#E8B48A" stroke="#7C4A2D" stroke-width=".12"/>`;
    s += `<path d="M${f2(cx - hr * 1.04)} ${f2(hy + hr * .1)}A${f2(hr * 1.04)} ${f2(hr * 1.06)} 0 0 1 ${f2(cx + hr * 1.04)} ${f2(hy + hr * .1)}Q${f2(cx)} ${f2(hy - hr * .45)} ${f2(cx - hr * 1.04)} ${f2(hy + hr * .1)}Z" fill="#2B1A10"/>`;
    s += `<circle cx="${f2(cx - hr * .38)}" cy="${f2(hy + hr * .28)}" r=".13" fill="#2B1A10"/><circle cx="${f2(cx + hr * .38)}" cy="${f2(hy + hr * .28)}" r=".13" fill="#2B1A10"/>`;
  }));
  s += `<rect x="${f2(x0)}" y="${f2(y0 + R * ch + .6)}" width="${f2(C * cw)}" height="2.6" fill="#38BDF8" stroke="#0E7490" stroke-width=".3"/>`;
  return svg(W, H, s);
}

// ── p102's wall: bricks, the left part painted ──
function wallSvg(b) {
  const W = b.w || 84, H = b.h || 22, R = b.rows || 9, bl = b.bl || 6.4, bh = H / R, split = W * (b.part ?? .75), id = `c5p091w${++UID}`;
  const bricks = (fill, mortar, gap) => {
    let s = `<rect width="${f2(W)}" height="${f2(H)}" fill="${mortar}"/>`;
    for (let r = 0; r < R; r++) for (let x = r % 2 ? -bl / 2 : 0; x < W; x += bl) {
      const tint = fill === "#fff" ? "#fff" : ["#C2553A", "#CB6146", "#B94D34", "#C85A3F"][(r * 7 + Math.round(x)) % 4];
      s += `<rect x="${f2(x + gap / 2)}" y="${f2(r * bh + gap / 2)}" width="${f2(bl - gap)}" height="${f2(bh - gap)}" fill="${tint}"/>`;
    }
    return s;
  };
  return svg(W, H, `<defs><clipPath id="${id}a"><rect width="${f2(split)}" height="${f2(H)}"/></clipPath><clipPath id="${id}b"><rect x="${f2(split)}" width="${f2(W - split)}" height="${f2(H)}"/></clipPath></defs>
    <g clip-path="url(#${id}a)">${bricks("#C2553A", "#E8B5A2", .42)}</g><g clip-path="url(#${id}b)">${bricks("#fff", "#475569", .22)}</g>
    <rect x=".15" y=".15" width="${f2(W - .3)}" height="${f2(H - .3)}" fill="none" stroke="#64748B" stroke-width=".3"/>`);
}

module.exports = {
  kinds: {
    c5p091_x: (b, ctx, page) => `<div class="c5p091-x" style="${b.bw ? `--bw:${b.bw}mm;` : ""}${b.fw ? `--fw:${b.fw}mm;` : ""}${b.gap != null ? `gap:${b.gap}mm;` : ""}${b.indent ? `padding-left:${b.indent}mm;` : ""}${b.fs ? `--xs:${b.fs}pt;` : ""}${b.center ? "align-items:center;" : ""}">${[].concat(b.b).map((x) =>
      ctx.blockHtml(x, page).replace(/▭/g, BOX)).join("")}</div>`,
    c5p091_hl: (b, ctx) => `<div class="c5p091-hl ${b.tone || "pink"}${b.center ? " c" : ""}"${b.w ? ` style="width:${b.w}mm"` : ""}>${mdx(ctx, b.text)}</div>`,
    c5p091_pbar: (b, ctx) => pbarHtml(b, ctx),
    c5p091_scale: (b, ctx) => scaleHtml(b, ctx),
    c5p091_fig: (b) => `<div class="c5p091-c">${figSvg(b)}</div>`,
    c5p091_stairs: (b) => {
      const n = Math.max(...b.rows.map((r) => r[2]));
      return `<table class="c5p091-st">${b.rows.map(([l, a, k, m]) => `<tr><td class="l">${esc(l)}</td><td class="a">${esc(a)}</td>${`<td class="m">${esc(m)}</td>`.repeat(k)}${`<td class="e"></td>`.repeat(n - k)}</tr>`).join("")}</table>`;
    },
    c5p091_flowers: (b, ctx) => `<div class="c5p091-fl">${b.cells.map(([name, emoji]) => `<div class="c5p091-flc">${ctx.objsHtml({ sticker: name, emoji, n: b.n || 20, perRow: b.perRow || 4, size: b.size || 4.6, gap: b.gap ?? .7 })}</div>`).join("")}</div>`,
    c5p091_heap: (b, ctx) => {
      const ripe = ctx.sticker(b.ripe || "mango"), green = ctx.sticker(b.green || "green-mango");
      const one = ([x, y, r, g]) => {
        const src = g ? green || ripe : ripe, tint = g && !green ? "filter:hue-rotate(62deg) saturate(1.3) brightness(.9);" : "";
        return `<span class="c5p091-hp" style="left:${x}%;top:${y}%;width:${b.size}mm;height:${b.size}mm;transform:translate(-50%,-50%) rotate(${r}deg);${tint}">${src ? `<img src="${src}">` : `<i>🥭</i>`}</span>`;
      };
      return `<div class="c5p091-heap" style="width:${b.w}mm;height:${b.h}mm">${b.items.map(one).join("")}</div>`;
    },
    c5p091_gallery: (b) => `<div class="c5p091-c">${gallerySvg(b)}</div>`,
    c5p091_wall: (b) => `<div class="c5p091-c">${wallSvg(b)}</div>`,
    c5p091_mcq: (b, ctx, page) => `<div class="c3p078-mcq c5p091-mcq">${b.items.map((it) => {
      const q = `<div class="c3p078-mqt"><b>${esc(it.n)}</b><span>${mdx(ctx, it.q)}</span></div>`;
      const opts = it.opts.map((o) => { const m = o.match(/^(\(?[কখগঘ]\))\s*(.*)$/); return `<span><i class="c3p078-tk"></i>${m ? `<b>${esc(m[1])}</b> ${mdx(ctx, m[2])}` : mdx(ctx, o)}</span>`; }).join("");
      return `<div class="c3p078-mq">${it.aside ? `<div class="c5p091-mqa">${q}${ctx.blockHtml(it.aside, page)}</div>` : q}<div class="c3p078-mo c5p091-mo">${opts}</div></div>`;
    }).join("")}</div>`,
  },
  css: `
svg.c5p091-svg { display: block; overflow: visible; flex: none } .c5p091-c { display: flex; justify-content: center }
/* answer boxes in any block */
.c5p091-x { display: flex; flex-direction: column; gap: 2mm } .c5p091-x > .tx { font-size: var(--xs, 12.5pt) }
.c5p091-wb { display: inline-block; width: var(--bw, 18mm); height: 7.2mm; vertical-align: -2.1mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm; box-sizing: border-box }
.frac .c5p091-wb { width: var(--fw, 12mm); height: 6.4mm; margin: .45mm 0; vertical-align: 0 }
/* the tinted boxes of words */
.c5p091-hl { align-self: flex-start; font: 600 12.5pt/1.45 'Noto Sans Bengali'; padding: 1.6mm 4mm 1.2mm; border-radius: 2.6mm; border: .45mm solid }
.c5p091-hl.c { align-self: center; text-align: center }
.c5p091-hl.yellow { background: #FEF9A7; border-color: #A16207 } .c5p091-hl.pink { background: #F9A8D4; border-color: #9D174D }
.c5p091-hl.rose { background: #FCE7F3; border-color: #F9A8D4; border-radius: 4mm; box-shadow: 0 .8mm 0 #FBCFE8 } .c5p091-hl.peach { background: #FDE5DA; border-color: #FDE5DA }
/* the percent bars */
.c5p091-pb { align-self: flex-start; background: var(--pbg); border: .5mm solid var(--pbd); border-radius: 4mm; padding: 1.6mm 6mm 1mm }
.c5p091-pr { position: relative } .c5p091-pr > span { position: absolute; white-space: nowrap; font: 700 12pt/1.22 'Baloo Da 2'; color: ${INK}; text-align: center }
.c5p091-pr.t > span { bottom: .4mm } .c5p091-pr.b > span, .c5p091-pr.u > span { top: .6mm }
.c5p091-pr > span.c { transform: translateX(-50%) } .c5p091-pr > span.r { transform: translateX(-100%); text-align: right } .c5p091-pr > span.l { text-align: left }
.c5p091-pbb { display: flex; border: .45mm solid ${INK}; background: #fff } .c5p091-pbb i { display: flex; align-items: center; padding: .6mm 0 0 3mm; font: 700 12pt 'Baloo Da 2'; font-style: normal; white-space: nowrap; color: ${INK} }
.c5p091-pbb i + i { border-left: .3mm solid ${INK} }
.c5p091-pbr { position: relative; padding-top: 8.4mm } .c5p091-pbt { position: absolute; top: 0; left: 50%; transform: translateX(-50%); background: #fff; border: .35mm solid ${INK}; padding: .5mm 2.4mm 0; font: 700 12pt 'Baloo Da 2'; white-space: nowrap }
.c5p091-pbl { position: absolute; left: 0; top: 4.4mm; font: 700 12pt/1 'Baloo Da 2' }
/* p95's scale */
.c5p091-scale { display: flex; flex-direction: column; gap: 1mm; align-self: center } .c5p091-sb { display: flex; flex-direction: column; margin-top: 1.4mm }
.c5p091-sl { position: relative; height: 9.6mm } .c5p091-sl > span { position: absolute; top: 1.2mm; transform: translateX(-50%); white-space: nowrap; font: 600 12pt 'Noto Sans Bengali' }
/* p100's table */
table.c5p091-st { align-self: center; border-collapse: collapse; font: 600 12pt 'Noto Sans Bengali'; color: ${INK} }
.c5p091-st td { border: .35mm solid ${INK}; height: 8.6mm; padding: .6mm 3mm 0; text-align: center } .c5p091-st td.l { background: #fff; text-align: left; width: 28mm }
.c5p091-st td.a { background: #BFE3F7; width: 38mm } .c5p091-st td.m { background: #FEF08A; width: 15mm } .c5p091-st td.e { border: 0 }
/* p93's flowers */
.c5p091-fl { display: flex; align-self: flex-start; border: .45mm solid ${INK}; background: #fff } .c5p091-flc { padding: 1mm 1.2mm; border-left: .35mm solid ${INK} } .c5p091-flc:first-child { border-left: 0 }
/* p103's mangoes */
.c5p091-heap { position: relative; flex: none; align-self: center } .c5p091-hp { position: absolute; display: flex; align-items: center; justify-content: center }
.c5p091-hp img { width: 100%; height: 100%; object-fit: contain } .c5p091-hp i { font: normal 26pt 'Noto Color Emoji' }
/* tick questions */
.c5p091-mqa { display: flex; align-items: center; justify-content: space-between; gap: 4mm } .c5p091-mo { grid-template-columns: repeat(4, 1fr); justify-content: stretch }
`,
};
