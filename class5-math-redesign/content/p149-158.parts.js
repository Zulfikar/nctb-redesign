// Printed pages 149–158's own kinds (prefixed c5p149_), written by a helper (25 Nov 2026). Chapter ৯ জ্যামিতি, its first part:
// ট্রাপিজিয়াম ও সামান্তরিক (the frames laid one over another, sorting by parallel sides, squared paper, measuring and drawing
// parallelograms, the house's roof, a trapezium drawn with a protractor), রম্বস (two equal frames crossed, folded and cut paper,
// designs), চতুর্ভুজের কর্ণ (diagonals), the table of properties, the diagram of nested sets and the flow chart. Units: mm.
// Every frame, quadrilateral, grid, angle and diagram is drawn here by code. The content file computes the shapes (the frames'
// holes turned and laid one over another, their overlap clipped, so a trapezium's parallel sides are truly parallel and a
// rhombus's sides truly equal); this file only draws them.
//
//   c5p149_fig    { w, h, items, k?, notes?, cap?, justify?, mt? }   a drawing in mm (y down; k scales the whole drawing). Items:
//     { poly: [[x,y]…], holes?: [[[x,y]…]…], fill?, c?, sw?, dash?, open?, op? }   a polygon (holes cut out: the book's frames)
//     { seg: [[x,y],[x,y]], c?, sw?, dash?, cap? }                    a line
//     { t: "words", at: [x,y], fs?, anchor?, c?, w?, rot?, halo? }    words (Noto Sans Bengali, centred on at; rot: degrees
//                                                                    clockwise; halo: a white edge, for words over grid lines)
//     { lbox: "words", at: [cx,cy], bw, bh?, fs? }                    words in a ruled white box (p157's labels)
//     { ang: [V, A, B], r?, c?, sw?, dash?, label?, lr?, fs?, fill? }  the inside angle at V between VA and VB, with its label
//     { dot: [x,y], r?, c? }   { ell: [cx,cy,rx,ry], c?, sw?, fill?, dash? }
//     { grid: [x, y, cols, rows, s], c?, sw?, bg? }                   squared paper
//     { bow: [A, B, bulge], c?, dash? }                               the book's dotted curve beside a side (p152)
//     { rbox: "১", at: [x,y], s? }                                    the book's red-framed step number
//     { arrow: [A, B], c?, sw?, head? }                               a thin arrow
//     { farrow: [A, B], w?, fill?, c? }                               p158's wide orange arrow
//     { img: "sticker", at: [x,y], w, h, emoji?, rot?, flip? }         a sticker (its emoji until the picture comes)
//     { prot: [cx,cy], r, rot?, step?, fs? }                          lib's c4_protractor, its centre at [cx,cy], turned rot°
//                                                                    anticlockwise
//     { pencil: [x,y], a, len?, wd? }                                 a pencil, its tip at [x,y], pointing at a° (maths: 0 = →,
//                                                                    90 = ↑)
//     { g: [items], tr: "transform" }   { raw: "<svg…>" }
//   notes: [{ x, y, w, text, lines?, fs? }]   words laid over the drawing (HTML, so they wrap) on dotted writing lines: the
//                                             text, then the dots to the end of its line, `lines` lines in all (p158)
//   c5p149_figs   { figs: [fig…], gap?, justify?, align? }             several drawings side by side
//   c5p149_blanks { items: [{ n, t, a?, wrap? }], size?, gap? }       p157's sentences to fill: "(১) … তাকে ………… বলে।" (wrap: the
//                                                                    dotted line on a line of its own, then a)
//   c5p149_rule   { title, items: [text], tone?: "green" | "peach", w? }   the book's tinted box of rules: a title, then bullets
//   c5p149_form   { rows: [[label, boxW?]], lw?, gap? }               p151's labels, each with a wide empty box after it
//   c5p149_lines  { items: [text], size?, gap?, indent? }            lines with a hanging indent after "[১]" or "(ক)" (pp151–152)
const INK = "#1E2433", RED = "#DC2626", FONT = "'Noto Sans Bengali'";
const f2 = (x) => Math.round(x * 100) / 100;
const xy = (p) => `${f2(p[0])} ${f2(p[1])}`;
const rad = (d) => (d * Math.PI) / 180;
const escx = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const go = (p, a, r) => [p[0] + r * Math.cos(rad(a)), p[1] - r * Math.sin(rad(a))]; // maths angle, y down
const dirOf = (V, A) => (Math.atan2(-(A[1] - V[1]), A[0] - V[0]) * 180) / Math.PI;
const ring = (P, close = true) => `M${P.map(xy).join("L")}${close ? "Z" : ""}`;

function text(s, [x, y], o = {}) {
  const fs = o.fs || 3.6, tr = o.rot ? ` transform="rotate(${f2(o.rot)} ${f2(x)} ${f2(y)})"` : "";
  const halo = o.halo ? ` stroke="#fff" stroke-width="${f2(fs * 0.28)}" stroke-linejoin="round" paint-order="stroke"` : "";
  return `<text x="${f2(x)}" y="${f2(y)}" text-anchor="${o.anchor || "middle"}" dominant-baseline="central" font-family="${FONT}" font-weight="${o.w || 600}" font-size="${f2(fs)}" fill="${o.c || INK}"${halo}${tr}>${escx(s)}</text>`;
}
function angItem(it) {
  const [V, A, B] = it.ang, r = it.r || 4;
  const a1 = dirOf(V, A); let d = dirOf(V, B) - a1;
  while (d <= -180) d += 360; while (d > 180) d -= 360;
  const p1 = go(V, a1, r), p2 = go(V, a1 + d, r), arc = `A${f2(r)} ${f2(r)} 0 0 ${d > 0 ? 0 : 1} ${xy(p2)}`;
  let g = it.fill ? `<path d="M${xy(V)}L${xy(p1)}${arc}Z" fill="${it.fill}"/>` : "";
  g += `<path d="M${xy(p1)}${arc}" fill="none" stroke="${it.c || INK}" stroke-width="${it.sw || 0.35}"${it.dash ? ` stroke-dasharray="${it.dash}"` : ""}/>`;
  if (it.label) g += text(it.label, go(V, it.la ?? a1 + d / 2, it.lr || r + 3.4), { fs: it.fs || 3.2, c: it.lc || INK });
  return g;
}
function gridItem(it) {
  const [x, y, cols, rows, s] = it.grid;
  let d = "";
  for (let i = 0; i <= cols; i++) d += `M${f2(x + i * s)} ${f2(y)}V${f2(y + rows * s)}`;
  for (let j = 0; j <= rows; j++) d += `M${f2(x)} ${f2(y + j * s)}H${f2(x + cols * s)}`;
  return `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(cols * s)}" height="${f2(rows * s)}" fill="${it.bg || "#fff"}"/><path d="${d}" stroke="${it.c || "#94A3B8"}" stroke-width="${it.sw || 0.22}" fill="none"/>`;
}
function bowItem(it) {
  const [A, B, bulge = 3] = it.bow, m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], c = go(m, dirOf(A, B) + 90, bulge * 2);
  return `<path d="M${xy(A)}Q${xy(c)} ${xy(B)}" fill="none" stroke="${it.c || INK}" stroke-width="${it.sw || 0.4}" stroke-dasharray="${it.dash || "0.1 0.75"}" stroke-linecap="round"/>`;
}
const head = (B, a, h, c) => `<path d="M${xy(B)}L${xy(go(B, a + 180 - 24, h))}L${xy(go(B, a + 180 + 24, h))}Z" fill="${c}"/>`;
function farrowItem(it) { // a long arrow drawn as one outlined shape: a shaft of width w, a head 2.6w wide
  const [A, B] = it.farrow, w = it.w || 1.5, a = dirOf(A, B), L = Math.hypot(B[0] - A[0], B[1] - A[1]), hl = w * 3.2, hw = w * 1.35;
  const n = (p, s) => go(p, a + 90, s), E = go(A, a, L - hl);
  const P = [n(A, w / 2), n(E, w / 2), n(E, hw), B, n(E, -hw), n(E, -w / 2), n(A, -w / 2)];
  return `<path d="${ring(P)}" fill="${it.fill || "#F9A65A"}" stroke="${it.c || "#9A3412"}" stroke-width=".22" stroke-linejoin="round"/>`;
}
function imgItem(it, ctx) {
  const [x, y] = it.at, { w, h } = it, src = ctx.sticker(it.img), cx = x + w / 2, cy = y + h / 2;
  const tr = `${it.rot ? `rotate(${f2(it.rot)} ${f2(cx)} ${f2(cy)}) ` : ""}${it.flip ? `translate(${f2(2 * cx)} 0) scale(-1 1)` : ""}`.trim();
  const inner = src ? `<image href="${src}" x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="${f2(cx)}" y="${f2(cy)}" text-anchor="middle" dominant-baseline="central" font-family="'Noto Color Emoji'" font-size="${f2(Math.min(w, h) * 0.8)}">${it.emoji || "✋"}</text>`;
  return tr ? `<g transform="${tr}">${inner}</g>` : inner;
}
// lib's protractor (c4_protractor), its centre (W/2, H − 6 in its own box) put at [cx, cy] and turned rot° anticlockwise
function protItem(it, ctx) {
  const html = ctx.blockHtml({ kind: "c4_protractor", r: it.r, step: it.step, fs: it.fs, armLen: 1 }, 0);
  const m = html.match(/<svg class="c4s-prot" width="([\d.]+)mm" height="([\d.]+)mm" viewBox="[^"]*">([\s\S]*)<\/svg>/);
  if (!m) throw new Error("c5p149_fig: c4_protractor changed its output");
  const W = +m[1], H = +m[2], [cx, cy] = it.prot;
  return `<g transform="translate(${f2(cx)} ${f2(cy)}) rotate(${f2(-(it.rot || 0))}) translate(${f2(-W / 2)} ${f2(-(H - 6))})">${m[3]}</g>`;
}
function pencilItem(it) {
  const [x, y] = it.pencil, a = it.a ?? 60, L = it.len || 13, w = it.wd || 2.2, tip = w * 1.3;
  const body = `<path d="M0 0L${f2(tip)} ${f2(-w / 2)}H${f2(L)}V${f2(w / 2)}H${f2(tip)}Z" fill="#FACC15" stroke="#A16207" stroke-width=".22" stroke-linejoin="round"/>`
    + `<path d="M0 0L${f2(tip)} ${f2(-w / 2)}V${f2(w / 2)}Z" fill="#F5D7A1" stroke="#7C5A2A" stroke-width=".22" stroke-linejoin="round"/>`
    + `<path d="M0 0L${f2(tip * 0.38)} ${f2(-w * 0.19)}V${f2(w * 0.19)}Z" fill="#334155"/>`
    + `<rect x="${f2(L)}" y="${f2(-w / 2)}" width="${f2(w * 0.8)}" height="${f2(w)}" fill="#F9A8D4" stroke="#BE185D" stroke-width=".22"/>`;
  return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(-a)})">${body}</g>`;
}
function item(it, ctx) {
  if (it.poly) {
    const d = ring(it.poly, !it.open) + (it.holes || []).map((h) => ring(h)).join("");
    return `<path d="${d}" fill="${it.fill || "none"}"${it.holes ? ` fill-rule="evenodd"` : ""}${it.op ? ` opacity="${it.op}"` : ""} stroke="${it.c || (it.c === null ? "none" : INK)}" stroke-width="${it.sw ?? 0.4}"${it.dash ? ` stroke-dasharray="${it.dash}"` : ""} stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  if (it.seg) return `<path d="M${xy(it.seg[0])}L${xy(it.seg[1])}" stroke="${it.c || INK}" stroke-width="${it.sw ?? 0.45}"${it.dash ? ` stroke-dasharray="${it.dash}"` : ""} stroke-linecap="${it.cap || "round"}" fill="none"/>`;
  if (it.t != null) return text(it.t, it.at, it);
  if (it.lbox != null) {
    const [cx, cy] = it.at, bw = it.bw, bh = it.bh || 5.6;
    return `<rect x="${f2(cx - bw / 2)}" y="${f2(cy - bh / 2)}" width="${f2(bw)}" height="${f2(bh)}" fill="#fff" stroke="${INK}" stroke-width=".3"/>` + text(it.lbox, [cx, cy + 0.15], { fs: it.fs || 3.6, w: 500 });
  }
  if (it.ang) return angItem(it);
  if (it.dot) return `<circle cx="${f2(it.dot[0])}" cy="${f2(it.dot[1])}" r="${it.r ?? 0.7}" fill="${it.c || INK}"/>`;
  if (it.ell) { const [cx, cy, rx, ry] = it.ell; return `<ellipse cx="${f2(cx)}" cy="${f2(cy)}" rx="${f2(rx)}" ry="${f2(ry)}" fill="${it.fill || "none"}" stroke="${it.c || INK}" stroke-width="${it.sw ?? 0.4}"${it.dash ? ` stroke-dasharray="${it.dash}"` : ""}/>`; }
  if (it.grid) return gridItem(it);
  if (it.bow) return bowItem(it);
  if (it.rbox) { const [x, y] = it.at, s = it.s || 4.6; return `<rect x="${f2(x - s / 2)}" y="${f2(y - s / 2)}" width="${s}" height="${s}" fill="#fff" stroke="${RED}" stroke-width=".4"/>` + text(it.rbox, [x, y + 0.15], { fs: s * 0.72, c: RED, w: 700 }); }
  if (it.arrow) { const [A, B] = it.arrow, a = dirOf(A, B), h = it.head || 1.8, c = it.c || INK; return `<path d="M${xy(A)}L${xy(go(B, a + 180, h * 0.7))}" stroke="${c}" stroke-width="${it.sw || 0.4}" fill="none"/>${head(B, a, h, c)}`; }
  if (it.farrow) return farrowItem(it);
  if (it.img) return imgItem(it, ctx);
  if (it.prot) return protItem(it, ctx);
  if (it.pencil) return pencilItem(it);
  if (it.g) return `<g transform="${it.tr || ""}">${it.g.map((x) => item(x, ctx)).join("")}</g>`;
  if (it.raw) return it.raw;
  throw new Error("c5p149_fig: unknown item " + JSON.stringify(it).slice(0, 80));
}
function figHtml(f, ctx) {
  const k = f.k || 1, W = f2(f.w * k), H = f2(f.h * k);
  const svg = `<svg class="c5p149-svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${f.w} ${f.h}">${f.items.map((it) => item(it, ctx)).join("")}</svg>`;
  const notes = (f.notes || []).map((n) => `<div class="c5p149-note" style="left:${f2(n.x * k)}mm;top:${f2(n.y * k)}mm;width:${f2(n.w * k)}mm;--lh:${n.lh || 6.4}mm;height:calc(var(--lh) * ${n.lines || 1});font-size:${n.fs || 11.5}pt"><span>${ctx.md(n.text)}</span></div>`).join("");
  const body = notes ? `<div class="c5p149-fbox" style="width:${W}mm;height:${H}mm">${svg}${notes}</div>` : svg;
  return `<figure class="c5p149-fig"${f.mt ? ` style="margin-top:${f.mt}mm"` : ""}>${body}${f.cap ? `<figcaption>${ctx.md(f.cap)}</figcaption>` : ""}</figure>`;
}

module.exports = {
  kinds: {
    c5p149_fig: (b, ctx) => `<div class="c5p149-figs" style="justify-content:${b.justify || "center"}">${figHtml(b, ctx)}</div>`,
    c5p149_figs: (b, ctx) => `<div class="c5p149-figs" style="gap:${b.gap ?? 4}mm;justify-content:${b.justify || "space-around"};align-items:${b.align || "flex-end"}">${b.figs.map((f) => figHtml(f, ctx)).join("")}</div>`,
    c5p149_blanks: (b, ctx) => `<div class="c5p149-blanks" style="font-size:${b.size || 12}pt;gap:${b.gap ?? 2.4}mm">${b.items.map((r) => r.wrap
      ? `<div class="c5p149-bl"><b>${ctx.esc(r.n)}</b><span>${ctx.md(r.t)}</span></div><div class="c5p149-bl"><b></b><i></i><span>${ctx.md(r.a || "")}</span></div>`
      : `<div class="c5p149-bl"><b>${ctx.esc(r.n)}</b><span>${ctx.md(r.t)}</span><i></i><span>${ctx.md(r.a || "")}</span></div>`).join("")}</div>`,
    c5p149_rule: (b, ctx) => `<div class="c5p149-rule ${b.tone || "green"}"${b.w ? ` style="width:${b.w}mm"` : ""}><p>${ctx.md(b.title)}</p><ul>${b.items.map((t) => `<li>${ctx.md(t)}</li>`).join("")}</ul></div>`,
    c5p149_form: (b, ctx) => `<div class="c5p149-form" style="grid-template-columns:${b.lw || 62}mm auto;gap:${b.gap ?? 2.4}mm 2mm">${b.rows.map(([l, w]) => `<span>${ctx.md(l)}</span><i style="width:${w || 58}mm"></i>`).join("")}</div>`,
    c5p149_lines: (b, ctx) => `<div class="c5p149-lines" style="font-size:${b.size || 12.5}pt;row-gap:${b.gap ?? 1.4}mm${b.indent ? `;padding-left:${b.indent}mm` : ""}">${b.items.map((t) => {
      const m = t.match(/^(\[[^\]]+\]|\([^)]+\))\s*(.*)$/s);
      return m ? `<span class="c5p149-lm">${ctx.esc(m[1])}</span><span>${ctx.md(m[2])}</span>` : `<span class="c5p149-l1">${ctx.md(t)}</span>`; }).join("")}</div>`,
  },
  css: `
.c5p149-figs { display: flex; flex-wrap: nowrap } .c5p149-fig { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 1mm; flex: none }
.c5p149-fig figcaption { font: 600 11.5pt 'Noto Sans Bengali'; color: ${INK} }
svg.c5p149-svg { display: block; overflow: visible }
.c5p149-fbox { position: relative } .c5p149-fbox > svg { position: absolute; left: 0; top: 0 }
.c5p149-note { position: absolute; font-family: 'Noto Sans Bengali'; font-weight: 500; line-height: var(--lh); color: ${INK};
  background: radial-gradient(circle at 50% calc(100% - 1.3mm), #64748B .22mm, transparent .3mm) 0 0 / 1.7mm var(--lh) repeat }
.ex.m-anu .c5p149-note { --nbg: #FFFBEB } .ex.m-kaj .c5p149-note { --nbg: #FFF5F7 } .ex.m-nije .c5p149-note { --nbg: #F0F7FF }
.c5p149-note span { background: var(--nbg, #fff); box-decoration-break: clone; -webkit-box-decoration-break: clone; padding-right: 1.2mm }
.c5p149-blanks { display: flex; flex-direction: column; font-family: 'Noto Sans Bengali'; font-weight: 500; line-height: 1.5 }
.c5p149-bl { display: flex; align-items: baseline; gap: 1.6mm } .c5p149-bl > b { flex: none; width: 10mm; font-weight: 600 }
.c5p149-bl > span { flex: none } .c5p149-bl > i { flex: 1; min-width: 14mm; border-bottom: .6mm dotted #64748B; transform: translateY(-1mm) }
.c5p149-rule { align-self: center; border-radius: 3mm; padding: 2mm 6mm 2.2mm; font: 600 12.5pt/1.5 'Noto Sans Bengali'; box-shadow: 0 .8mm 0 rgba(0,0,0,.06); border: .55mm solid }
.c5p149-rule.green { background: #DCEFD3; border-color: #6BAF5C } .c5p149-rule.peach { background: #FBE3DA; border-color: #E8A48E }
.c5p149-rule ul { margin: .4mm 0 0 11mm; padding: 0 } .c5p149-rule li::marker { color: #1E2433 }
.c5p149-form { display: grid; align-items: center; font: 500 12.5pt 'Noto Sans Bengali' }
.c5p149-form > i { display: block; height: 7.4mm; border: .5mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm }
.c5p149-lines { display: grid; grid-template-columns: auto 1fr; column-gap: 1.6mm; font-family: 'Noto Sans Bengali'; font-weight: 500; line-height: 1.45 }
.c5p149-l1 { grid-column: 1 / -1 } .c5p149-lm { font-weight: 600; white-space: nowrap }
`,
};
