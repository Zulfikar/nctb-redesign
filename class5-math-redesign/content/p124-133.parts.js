// Printed pages 124–133's own kinds (অধ্যায় ৮ পরিমাপ, its area part: rectangles and squares, এয়র, হেক্টর and বর্গ কিমি,
// L-shapes, the parallelogram and the triangle, the review and নিজে করি), prefixed c5p124_, every class c5p124-. Written
// by a helper (25 Nov 2026). Units: mm. Every figure whose length, square or count matters is drawn here by code.
//
//   c5p124_fig   { u, w, h, pad?: [l, t, r, b], items, panel?, cap?, truesize?, title? }
//                one drawing in SVG on a grid of units: u mm a unit, the drawing area w × h units (origin top-left, y down),
//                pad in mm around it. truesize: drawn at its true size (u = 10, so 1 cm is 1 cm on the page); the SVG then
//                carries a class with "ruler" in it, so the core's fit step never scales its page down (an over-full page
//                is reported as spilling instead, as for a true-size ruler). panel: the book's tinted rounded panel behind
//                it (cream, yellow, blue, lime) or "frame" (a plain black frame, p126). cap: a boxed caption under it.
//                items (coordinates in units):
//                  { grid: [x, y, cols, rows], lines?: "dot" | "solid" | "none", dots?, lc? }   squared or dot paper
//                  { cells: [[x, y, w?, h?], …], fill }                filled squares
//                  { poly: [[x, y], …], fill?, stroke?, sw?, dash?: "red" | "dash" | "dot", open? }
//                  { line: [x1, y1, x2, y2], stroke?, sw?, dash? }
//                  { dim: [x1, y1, x2, y2], t?, at?: "above" | "below" | "left" | "right", off?, fs?, rot?, bg?, bw? }
//                                                         a double arrow, its label beside it (rot: turned, -90 or 90)
//                  { arrow: [x1, y1, x2, y2], stroke?, sw? }   a single arrow (p125's pointer)
//                  { t, x, y, fs?, rot?, anchor?, color?, w?: weight, bg?, bw?, box? }   a label (centred on x, y; bg: a
//                                                         rounded box behind it, bw its width in mm; box: a plain frame)
//                  { ra: [x, y], dx, dy, s? }             a right-angle mark in the corner at (x, y), towards dx, dy (±1)
//                  { arc: [x1, y1, x2, y2], c: [cx, cy], head?, stroke?, dash? }   a curved arrow (quadratic, control c)
//   c5p124_eq    { rows: [[label, rest] | rest], lw?, bw?, fs?, gap?, indent?, al? }   lines of working: a label column
//                (lw mm), then text with ▭ (a wide answer box, bw mm) and the core's □; a plain string spans the row
//                (nowrap: never wrap a line; nw: the narrow box ▯'s width; bh: the boxes' height)
//   c5p124_qs    { mark, items: [[n, text], …] }            several questions in one card, each with its marker (p133)
//   c5p124_call  { items: [{ text, tone }], w? }             p125: the three notes under the unit squares, a tail on top
//   c5p124_tag   { text }                                  a small boxed caption (p127's «রাফির ভাবনা»)
//   c5p124_vr    { h }                                     the thin red line between p130's two halves
const INK = "#1E2433", RED = "#E11D2E";
const FONT = "'Baloo Da 2'";
const f2 = (x) => Math.round(x * 100) / 100;
const escx = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const DASH = { red: `stroke-dasharray="0 1.25" stroke-linecap="round"`, dash: `stroke-dasharray="1.3 .9"`, dot: `stroke-dasharray=".35 .5"` };

// an arrowhead with its tip at (x, y), pointing along angle a
const head = (x, y, a, col = INK, L = 1.9, Wd = .72) => `<path d="M${f2(x)} ${f2(y)}L${f2(x - L * Math.cos(a) + Wd * Math.sin(a))} ${f2(y - L * Math.sin(a) - Wd * Math.cos(a))}L${f2(x - L * Math.cos(a) - Wd * Math.sin(a))} ${f2(y - L * Math.sin(a) + Wd * Math.cos(a))}Z" fill="${col}"/>`;
// a label: centred on (x, y) (mm), turned by rot degrees; bg: a rounded box behind it (bw mm wide)
function label(x, y, t, o = {}) {
  const fs = o.fs || 3.6, rot = o.rot || 0, anchor = o.anchor || "middle";
  const tr = rot ? ` transform="rotate(${rot} ${f2(x)} ${f2(y)})"` : "";
  const bw = o.bw || f2(String(t).length * fs * .47 + 2);
  const back = o.bg ? `<rect x="${f2(x - bw / 2)}" y="${f2(y - fs * .72)}" width="${bw}" height="${f2(fs * 1.44)}" rx="${o.box ? 0 : f2(fs * .45)}" fill="${o.bg}"${o.box ? ` stroke="${INK}" stroke-width=".3"` : ""}${tr}/>` : "";
  return `${back}<text x="${f2(x)}" y="${f2(y)}" text-anchor="${anchor}" dominant-baseline="central" font-family="${FONT}" font-weight="${o.w || 600}" font-size="${fs}" fill="${o.color || INK}"${tr}>${escx(t)}</text>`;
}

function figSvg(b) {
  const u = b.u, [pl, pt, pr, pb] = b.pad || [2, 2, 2, 2];
  const W = f2(b.w * u + pl + pr), H = f2(b.h * u + pt + pb);
  const X = (x) => pl + x * u, Y = (y) => pt + y * u;
  const pts = (p) => p.map(([x, y]) => `${f2(X(x))} ${f2(Y(y))}`).join("L");
  let g = "";
  for (const it of b.items) {
    if (it.grid) {
      const [x0, y0, c, r] = it.grid, st = it.lines || "dot", s = it.s || 1;
      if (st !== "none") {
        let d = "";
        for (let i = 0; i <= c; i++) d += `M${f2(X(x0 + i * s))} ${f2(Y(y0))}V${f2(Y(y0 + r * s))}`;
        for (let j = 0; j <= r; j++) d += `M${f2(X(x0))} ${f2(Y(y0 + j * s))}H${f2(X(x0 + c * s))}`;
        g += st === "solid" ? `<path d="${d}" fill="none" stroke="${it.lc || INK}" stroke-width="${it.lw || .3}"/>`
          : `<path d="${d}" fill="none" stroke="${it.lc || "#4B5563"}" stroke-width="${it.lw || .2}" ${DASH.dot}/>`;
      }
      if (it.dots) for (let i = 0; i <= c; i++) for (let j = 0; j <= r; j++) g += `<circle cx="${f2(X(x0 + i * s))}" cy="${f2(Y(y0 + j * s))}" r="${it.r || .6}" fill="${INK}"/>`;
    } else if (it.cells) {
      for (const [x, y, w = 1, h = 1] of it.cells) g += `<rect x="${f2(X(x))}" y="${f2(Y(y))}" width="${f2(w * u)}" height="${f2(h * u)}" fill="${it.fill}"/>`;
    } else if (it.poly) {
      g += `<path d="M${pts(it.poly)}${it.open ? "" : "Z"}" fill="${it.fill || "none"}" stroke="${it.stroke || (it.dash === "red" ? RED : INK)}" stroke-width="${it.sw || (it.dash === "red" ? .75 : .35)}" stroke-linejoin="round" ${DASH[it.dash] || ""}/>`;
    } else if (it.line) {
      const [x1, y1, x2, y2] = it.line;
      g += `<path d="M${f2(X(x1))} ${f2(Y(y1))}L${f2(X(x2))} ${f2(Y(y2))}" stroke="${it.stroke || (it.dash === "red" ? RED : INK)}" stroke-width="${it.sw || (it.dash === "red" ? .75 : .35)}" ${DASH[it.dash] || ""}/>`;
    } else if (it.dim || it.arrow) {
      const [x1, y1, x2, y2] = (it.dim || it.arrow).map((v, i) => (i % 2 ? Y(v) : X(v))), a = Math.atan2(y2 - y1, x2 - x1), col = it.stroke || INK;
      const L = it.hl || 1.9, k = L * .7, both = !!it.dim;
      g += `<path d="M${f2(x1 + (both ? k * Math.cos(a) : 0))} ${f2(y1 + (both ? k * Math.sin(a) : 0))}L${f2(x2 - k * Math.cos(a))} ${f2(y2 - k * Math.sin(a))}" stroke="${col}" stroke-width="${it.sw || .3}"/>`;
      g += head(x2, y2, a, col, L, L * .38) + (both ? head(x1, y1, a + Math.PI, col, L, L * .38) : "");
      if (it.t) {
        const fs = it.fs || 3.6, off = it.off ?? fs * .85, mx = (x1 + x2) / 2, my = (y1 + y2) / 2, at = it.at || "above";
        const [lx, ly] = at === "above" ? [mx, my - off] : at === "below" ? [mx, my + off] : at === "left" ? [mx - off, my] : [mx + off, my];
        g += label(lx + (it.dx || 0), ly + (it.dy || 0), it.t, { fs, rot: it.rot, bg: it.bg, bw: it.bw, anchor: it.anchor });
      }
    } else if (it.t != null) {
      g += label(X(it.x), Y(it.y), it.t, it);
    } else if (it.ra) {
      const [x, y] = it.ra, s = it.s || 2.4, x0 = X(x), y0 = Y(y), dx = it.dx * s, dy = it.dy * s;
      g += `<path d="M${f2(x0 + dx)} ${f2(y0)}V${f2(y0 + dy)}H${f2(x0)}" fill="none" stroke="${it.stroke || INK}" stroke-width="${it.sw || .3}"/>`;
    } else if (it.arc) {
      const [x1, y1, x2, y2] = it.arc, [cx, cy] = it.c, col = it.stroke || INK;
      const P0 = [X(x1), Y(y1)], C = [X(cx), Y(cy)], P2 = [X(x2), Y(y2)], a = Math.atan2(P2[1] - C[1], P2[0] - C[0]);
      const end = it.head === false ? P2 : [P2[0] - 1.3 * Math.cos(a), P2[1] - 1.3 * Math.sin(a)];
      g += `<path d="M${f2(P0[0])} ${f2(P0[1])}Q${f2(C[0])} ${f2(C[1])} ${f2(end[0])} ${f2(end[1])}" fill="none" stroke="${col}" stroke-width="${it.sw || .35}" ${DASH[it.dash] || ""}/>`;
      if (it.head !== false) g += head(P2[0], P2[1], a, col, 2.4, .95);
    }
  }
  return `<svg class="c5p124-svg${b.truesize ? " c5p124-ruler-true" : ""}" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${g}</svg>`;
}

const PANEL = { cream: ["#FBF1D3", "#C9A54A"], yellow: ["#FAF3A8", "#C9AE2C"], blue: ["#CFEBF8", "#5FA9D1"], lime: ["#EEF5CF", "#9DB851"], white: ["#FFFFFF", "#CBD5E1"] };
const TONE = { green: ["#D3EBCB", "#4E9A43"], salmon: ["#F6CDBF", "#C2553A"], yellow: ["#F4F0A2", "#A8961E"] };
// my markup: the core's, plus ▭ a wide answer box (--bw) and ▯ a narrow one (--nw, 8 mm)
const mx = (ctx, s) => ctx.md(s == null ? "" : String(s)).replace(/▭/g, `<span class="c5p124-bx"></span>`).replace(/▯/g, `<span class="c5p124-bx c5p124-n"></span>`);

module.exports = {
  kinds: {
    c5p124_fig: (b) => {
      const svg = figSvg(b), cap = b.cap ? `<div class="c5p124-tag">${escx(b.cap)}</div>` : "";
      if (!b.panel) return `<div class="c5p124-fig"${b.align ? ` style="align-self:${b.align}"` : ""}>${svg}${cap}</div>`;
      if (b.panel === "frame") return `<div class="c5p124-fig"><div class="c5p124-frame">${svg}</div>${cap}</div>`;
      const [bg, bd] = PANEL[b.panel];
      return `<div class="c5p124-fig"><div class="c5p124-pan" style="background:${bg};border-color:${bd}">${svg}</div>${cap}</div>`;
    },
    c5p124_eq: (b, ctx) => {
      const cols = b.lw ? `${b.lw}mm auto` : "auto";
      const rows = b.rows.map((r) => Array.isArray(r) ? `<span class="c5p124-el">${mx(ctx, r[0])}</span><span>${mx(ctx, r[1])}</span>`
        : typeof r === "object" ? `<span class="c5p124-ew" style="padding-left:${r.in || 0}mm">${mx(ctx, r.t)}</span>` : `<span class="c5p124-ew">${mx(ctx, r)}</span>`).join("");
      return `<div class="c5p124-eq${b.nowrap ? " c5p124-nw" : ""}" style="grid-template-columns:${cols};--bw:${b.bw || 16}mm;${b.nw ? `--nw:${b.nw}mm;` : ""}${b.bh ? `--bh:${b.bh}mm;` : ""}font-size:${b.fs || 12.5}pt;row-gap:${b.gap ?? 1.8}mm;padding-left:${b.indent || 0}mm;justify-content:${b.al || "start"}">${rows}</div>`;
    },
    // several questions in one card, each with its own marker (p133's নিজে করি ৩–৫, one line or two each)
    c5p124_qs: (b, ctx) => `<div class="ex m-${b.mark} c5p124-qs">${b.items.map(([n, t]) => `<div class="ext wm">${ctx.exMark(b.mark, n)}<span>${ctx.md(t)}</span></div>`).join("")}</div>`,
    c5p124_call: (b, ctx) => `<div class="c5p124-calls" style="${b.w ? `width:${b.w}mm` : ""}">${b.items.map((it) => {
      const [bg, bd] = TONE[it.tone];
      return `<div class="c5p124-cc"><div class="c5p124-call" style="--cb:${bg};--cl:${bd}">${ctx.md(it.text)}</div></div>`;
    }).join("")}</div>`,
    c5p124_tag: (b) => `<div class="c5p124-tag">${escx(b.text)}</div>`,
    c5p124_vr: (b) => `<div class="c5p124-vr" style="height:${b.h}mm"></div>`,
  },
  css: `
.c5p124-fig { display: flex; flex-direction: column; align-items: center; gap: 1.6mm }
.c5p124-svg { display: block; overflow: visible }
.c5p124-pan { border: .5mm solid; border-radius: 4mm; padding: 1.2mm 1.6mm; box-shadow: 0 .8mm 0 rgba(0,0,0,.08) }
.c5p124-frame { border: .45mm solid ${INK}; background: #fff; padding: 1mm 2mm }
.c5p124-tag { display: inline-block; border: .4mm solid ${INK}; background: #fff; padding: .5mm 4mm .2mm; font: 600 12pt/1.35 'Noto Sans Bengali' }
.c5p124-eq { display: grid; align-items: center; column-gap: 1.4mm; font-family: 'Noto Sans Bengali'; font-weight: 500; line-height: 1.4 }
.c5p124-el { white-space: nowrap } .c5p124-ew { grid-column: 1 / -1 }
.c5p124-nw .c5p124-ew, .c5p124-nw span { white-space: nowrap } .c5p124-qs { gap: 1.2mm !important }
.c5p124-bx { display: inline-block; width: var(--bw); height: var(--bh, 7.4mm); vertical-align: -2.2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .9mm }
.c5p124-bx.c5p124-n { width: var(--nw, 8mm) }
.c5p124-calls { display: flex; justify-content: space-around; align-items: flex-start; padding-top: 5mm; align-self: center }
.c5p124-cc { flex: 1 1 0; display: flex; justify-content: center }
.c5p124-call { position: relative; width: 47mm; background: var(--cb); border: .5mm solid var(--cl); border-radius: 3mm; padding: 2mm 2.6mm 1.6mm; text-align: center; font: 600 11pt/1.45 'Noto Sans Bengali'; box-shadow: 0 .8mm 0 rgba(0,0,0,.07) }
.c5p124-call::before { content: ""; position: absolute; left: 30%; top: -5.1mm; border-left: 2.4mm solid transparent; border-right: 2.4mm solid transparent; border-bottom: 5.1mm solid var(--cl) }
.c5p124-call::after { content: ""; position: absolute; left: calc(30% + .75mm); top: -3.9mm; border-left: 1.65mm solid transparent; border-right: 1.65mm solid transparent; border-bottom: 4.1mm solid var(--cb) }
.c5p124-vr { width: .8mm; background: #DC2626; border-radius: .4mm; align-self: center }
`,
};
