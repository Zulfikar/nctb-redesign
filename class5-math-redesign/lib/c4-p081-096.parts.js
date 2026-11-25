// Printed pages 81–96's own kinds (অধ্যায় ৬ গুণিতক ও গুণনীয়ক), prefixed c4p081_. Written by a helper (23 Nov 2026).
// Everything whose count, cell or line matters is drawn here by code: the ১–১০০ charts, the arrangements of 12 bottle caps,
// the 8 sweets in their box, the factor trees, the coloured squared paper, the ১০ cards, the 2 red and 5 yellow bags.
// Units: mm.
//
// Extra markup in every text on these pages (on top of the core's □ [[x]] {{a/b}} ___ **b**). The content file wraps every
// top-level block in c4p081_x, which renders it and then draws these (so they work inside the core's blocks too):
//   ◯ ▢ △ ⬭      the book's marks to draw with (an empty circle, square, triangle, rounded oblong), drawn small in the line
//   ⟨o:১⟩ ⟨b:৫⟩   a number ringed (red circle) / boxed (red square), as the book's worked examples mark them
//   ⟨v⟩ ⟨V⟩       a tick: red (p84's example) / ink
//   ▭ ▬          a wider answer box (19 mm) / a long one (34 mm), beside the core's □ (11 mm)
//   ⟨_⟩,         a writing line with its comma, kept together on one line (p88's 22 blanks)
//
//   c4p081_x        { b }                                      renders block b (or a list of blocks) and draws the marks above
//   c4p081_tab      { rows, cols?, h?, size?, width?, center? }   a table with a teal frame: rows are arrays of cells, or
//                   { cells, h?, tone?, left?, words? }; a cell is a string or { t, tone, span, rs, left, words, h }.
//                   tones: b blue, p pink, y yellow, g green, t the chapter's tint, h the chapter's colour (white text).
//                   words: Noto Sans Bengali (labels, sentences) instead of Baloo (numbers); left: left-aligned
//   c4p081_chart    { ring?: [n], box?: [n], rh? }             the ১–১০০ chart, some numbers ringed or boxed (p82's example)
//   c4p081_fan      { box, rows: [[sum, words]], rh?, aw? }   p81: the box "৩ জনে লিচু নিতে পারবে" with arrows to six rows
//   c4p081_callouts { items: [{ x, w, p, text }], h? }         p84: boxes under a table pointing up at a column (p = the point's x)
//   c4p081_sweets   { n?, w? }                                 p84: an open box with 8 sweets, 4 at the back and 4 in front
//   c4p081_caps     { groups, circle, arrows, w, h }           p85: 12 bottle caps in a ring and in six rows × columns
//   c4p081_rel      { }                                        p86: "১২=৪×৩" with the boy's arrows from ১২ and back to it
//   c4p081_pairs    { nums, pairs }                            p86: the factors in boxes, each pair joined by a two-headed arc
//   c4p081_trees    { trees: [{ top, kids, sub?, label? }], look?: "stem" | "ring", panel? }   factor trees (pp86, 91, 95);
//                   a node "" is an empty box, "○" an empty circle, "○১৫" a circle holding ১৫, "৮" a box holding ৮
//   c4p081_paper    { n, fill: { col: colour }, cw?, ch? }    p89: squared paper 1–15 × 1–15, column c coloured in rows r % c = 0
//   c4p081_cards    { rows: [[n, sum, value]], label?, cw? }   p94: rows of purple "১০" cards with "১০ × n" and its value
//   c4p081_bags     { red, yellow, w? }                        p94: red cloth bags over yellow paper bags
//   c4p081_pill     { text }                                   p92: the yellow "যাচাই করে দেখি" pill
//   c4p081_wbox     { w, h? }                                  an empty box to write in, centred (p83)
//   c4p081_say      { who, mood?, side?, text, tiny?, body?, aside?, center? }   a speaker with a smaller face, for the fuller
//                   pages; body: blocks under the words inside the bubble; aside: blocks beside the words (p86's ১২=৪×৩)
//   c4p081_exrow    { ex, mark?, text, items, marks? }         an exercise whose short items, (১) (২) …, follow its heading on
//                   the same line (the fullest pages: p95 ৫, p96 ২–৪)
//   c4p081_mcq      { items: [{ q, opts, inline? }] }          multiple choice with tick boxes; inline: the options on the
//                   question's line (p96's short items)
//   c4p081_note     { text }                             a boxed sentence of the book's, yellow, centred (pp87, 91)
//   c4p081_eqs      { lead, items }                            p89: "উদাহরণ" and its equations in a row
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const TONE = { b: ["#E0F2FE", "#075985"], p: ["#FCE7F3", "#9D174D"], y: ["#FEF9C3", "#854D0E"], g: ["#DCFCE7", "#166534"], t: ["var(--s)", "var(--d)"], h: ["var(--c)", "#fff"], w: ["#fff", INK] };

// ── the marks drawn in a line of text ──
const MARK = {
  "◯": `<svg class="c4p081-sym" width="5.4mm" height="5.4mm" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.1" fill="#fff" stroke="${INK}" stroke-width=".75"/></svg>`,
  "▢": `<svg class="c4p081-sym" width="7.4mm" height="5.4mm" viewBox="0 0 14 10"><rect x=".8" y="1" width="12.4" height="8" rx=".6" fill="#fff" stroke="${INK}" stroke-width=".75"/></svg>`,
  "△": `<svg class="c4p081-sym" width="7mm" height="5.6mm" viewBox="0 0 12.5 10"><path d="M6.25 .9L11.8 9.2H.7Z" fill="#fff" stroke="${INK}" stroke-width=".75" stroke-linejoin="round"/></svg>`,
  "⬭": `<svg class="c4p081-sym" width="9.4mm" height="5.4mm" viewBox="0 0 17.4 10"><rect x=".8" y="1.2" width="15.8" height="7.6" rx="3.8" fill="#fff" stroke="${INK}" stroke-width=".75"/></svg>`,
};
const tick = (col) => `<svg class="c4p081-tick" width="4.6mm" height="4.6mm" viewBox="0 0 10 10"><path d="M1.2 5.6L4 8.6L9 1.4" fill="none" stroke="${col}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const marks = (h) => h.replace(/[◯▢△⬭]/g, (c) => MARK[c])
  .replace(/⟨o:([^⟩]*)⟩/g, `<span class="c4p081-ring">$1</span>`).replace(/⟨b:([^⟩]*)⟩/g, `<span class="c4p081-sq">$1</span>`)
  .replace(/⟨v⟩/g, tick("#DC2626")).replace(/⟨V⟩/g, tick(INK))
  .replace(/▭/g, `<span class="abox c4p081-wbx"></span>`).replace(/▬/g, `<span class="abox c4p081-lbx"></span>`)
  .replace(/⟨_⟩(,?)/g, (m, c) => `<span class="c4p081-nb"><span class="wline" style="width:11mm"></span>${c}</span>`);

// ── arrows ──
function head(x, y, a, s = 1.7, col = INK) {
  const b = s * 0.42, hx = x - s * Math.cos(a), hy = y - s * Math.sin(a);
  return `<path d="M${f2(x)} ${f2(y)}L${f2(hx + b * Math.sin(a))} ${f2(hy - b * Math.cos(a))}L${f2(hx - b * Math.sin(a))} ${f2(hy + b * Math.cos(a))}Z" fill="${col}"/>`;
}
function arrow(x1, y1, x2, y2, { w = 0.32, s = 1.7, col = INK } = {}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2 - s * 0.8 * Math.cos(a))} ${f2(y2 - s * 0.8 * Math.sin(a))}" stroke="${col}" stroke-width="${w}" fill="none"/>${head(x2, y2, a, s, col)}`;
}
// a curved arrow (a quadratic curve through the control point c), with a head at the end, or at both ends
function carc(x1, y1, cx, cy, x2, y2, { both = false, w = 0.3, s = 1.5, col = INK } = {}) {
  return `<path d="M${f2(x1)} ${f2(y1)}Q${f2(cx)} ${f2(cy)} ${f2(x2)} ${f2(y2)}" stroke="${col}" stroke-width="${w}" fill="none"/>${head(x2, y2, Math.atan2(y2 - cy, x2 - cx), s, col)}${both ? head(x1, y1, Math.atan2(y1 - cy, x1 - cx), s, col) : ""}`;
}
const txt = (x, y, s, { size = 4.6, anchor = "middle", weight = 700, col = INK, font = "Baloo Da 2" } = {}) =>
  `<text x="${f2(x)}" y="${f2(y)}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}">${s}</text>`;

// ── a factor tree ──
function treeSvg(t, look, ctx) {
  const bw = 11, bh = 6.4, gap = 2, r = 4.9, fs = 4.6;
  const node = (s, x, y) => {
    const circ = s.startsWith("○"), v = circ ? s.slice(1) : s;
    const shape = circ ? `<circle cx="${f2(x)}" cy="${f2(y)}" r="${r}" fill="#fff" stroke="${INK}" stroke-width=".4"/>`
      : `<rect x="${f2(x - bw / 2)}" y="${f2(y - bh / 2)}" width="${bw}" height="${bh}" rx=".5" fill="#fff" stroke="${INK}" stroke-width=".4"/>`;
    return shape + (v ? txt(x, y + fs * 0.36, ctx.esc(v), { size: fs, col: "var(--d)" }) : "");
  };
  const ln = (x1, y1, x2, y2) => `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}" stroke="${INK}" stroke-width=".35" fill="none"/>`;
  let g = "", W, H;
  if (look === "ring") { // p91: straight legs from node to node (the book's circles and boxes)
    const cx = 15, y0 = r + 0.6, dx = 8.6, y1 = y0 + 13.5, dx2 = 7.4, y2 = y1 + 12.5;
    const half = (s) => s.startsWith("○") ? r : bh / 2;
    const leg = (xa, ya, sa, xb, yb, sb) => { const a = Math.atan2(yb - ya, xb - xa), ea = half(sa) + 1.2, eb = (sb.startsWith("○") ? r : bh / 2 / Math.abs(Math.sin(a))) + 1.2;
      return ln(xa + ea * Math.cos(a), ya + ea * Math.sin(a), xb - eb * Math.cos(a), yb - eb * Math.sin(a)); };
    const [kl, kr] = t.kids, kx = [cx - dx, cx + dx];
    g += leg(cx, y0, t.top, kx[0], y1, kl) + leg(cx, y0, t.top, kx[1], y1, kr);
    if (t.sub) g += leg(kx[1], y1, kr, kx[1] - dx2, y2, t.sub[0]) + leg(kx[1], y1, kr, kx[1] + dx2, y2, t.sub[1]);
    g += node(t.top, cx, y0) + node(kl, kx[0], y1) + node(kr, kx[1], y1);
    if (t.sub) g += node(t.sub[0], kx[1] - dx2, y2) + node(t.sub[1], kx[1] + dx2, y2);
    W = kx[1] + dx2 + bw / 2 + 1; H = y2 + bh / 2 + 0.6;
  } else { // pp86, 95: a stem down from the box, then two legs
    const cx = 1 + bw + gap / 2, s1 = 2.6, l1 = 3.6, s2 = 3.8, l2 = 3.6;
    const yT = bh / 2 + 0.4, yK = yT + bh / 2 + s1 + l1 + bh / 2, yS = yK + bh / 2 + s2 + l2 + bh / 2, kl = cx - (bw + gap) / 2, kr = cx + (bw + gap) / 2;
    const fork = (x, yTop, yKids) => ln(x, yTop, x, yTop + (yKids === yK ? s1 : s2)) + ln(x, yTop + (yKids === yK ? s1 : s2), x - bw / 2, yKids - bh / 2) + ln(x, yTop + (yKids === yK ? s1 : s2), x + bw / 2, yKids - bh / 2);
    g += fork(cx, yT + bh / 2, yK);
    if (t.sub) g += fork(kr, yK + bh / 2, yS);
    g += node(t.top, cx, yT) + node(t.kids[0], kl, yK) + node(t.kids[1], kr, yK);
    if (t.sub) g += node(t.sub[0], kr - (bw + gap) / 2, yS) + node(t.sub[1], kr + (bw + gap) / 2, yS);
    W = kr + (bw + gap) / 2 + bw / 2 + 1; H = yS + bh / 2 + 0.6;
  }
  return `<svg class="c4p081-tree" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${g}</svg>`;
}

// ── p85: a bottle cap, seen from the front and a little above; (x, y) its top-left ──
const CW = 6, CH = 4.4;
function cap(x, y) {
  let ridges = "";
  for (let i = 1; i < 7; i++) ridges += `<path d="M${f2(x + i * CW / 7)} ${f2(y + 1.9)}V${f2(y + CH - 0.25)}" stroke="#991B1B" stroke-width=".22" opacity=".55"/>`;
  return `<rect x="${f2(x)}" y="${f2(y + 1.1)}" width="${CW}" height="${f2(CH - 1.1)}" rx=".9" fill="#DC2626" stroke="#991B1B" stroke-width=".22"/>${ridges}
    <ellipse cx="${f2(x + CW / 2)}" cy="${f2(y + 1.2)}" rx="${CW / 2}" ry="1.15" fill="#F87171" stroke="#991B1B" stroke-width=".22"/><ellipse cx="${f2(x + CW / 2 - .8)}" cy="${f2(y + 1)}" rx="1.3" ry=".35" fill="#fff" opacity=".55"/>`;
}
const PX = CW + 0.8, PY = CH + 0.6;
const capGrid = (cx, top, rows, cols) => { let g = ""; const x0 = cx - (cols * PX - 0.8) / 2; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) g += cap(x0 + c * PX, top + r * PY); return g; };

module.exports = {
  kinds: {
    c4p081_x: (b, ctx, page) => marks(Array.isArray(b.b) ? b.b.map((x) => ctx.blockHtml(x, page)).join("") : ctx.blockHtml(b.b, page)),

    c4p081_tab: (b, ctx) => {
      const cols = b.cols ? `<colgroup>${b.cols.map((w) => `<col style="width:${typeof w === "number" ? w + "mm" : w}">`).join("")}</colgroup>` : "";
      const cell = (c, r) => {
        const o = c && typeof c === "object" ? c : { t: c };
        const tone = o.tone || r.tone, [bg, fg] = tone ? TONE[tone] : [];
        const st = [bg && `background:${bg}`, fg && `color:${fg}`, o.h && `height:${o.h}mm`].filter(Boolean).join(";");
        const cls = [(o.left ?? r.left) ? "c4p081-l" : "", (o.words ?? r.words) ? "c4p081-w" : ""].filter(Boolean).join(" ");
        return `<td${o.span ? ` colspan="${o.span}"` : ""}${o.rs ? ` rowspan="${o.rs}"` : ""}${cls ? ` class="${cls}"` : ""}${st ? ` style="${st}"` : ""}>${o.t == null || o.t === "" ? "" : ctx.md(String(o.t))}</td>`;
      };
      const rows = b.rows.map((r0) => { const r = Array.isArray(r0) ? { cells: r0 } : r0, h = r.h || b.h;
        return `<tr${h ? ` style="height:${h}mm"` : ""}>${r.cells.map((c) => cell(c, r)).join("")}</tr>`; }).join("");
      return `<div class="c4p081-tw" style="${b.width ? `width:${b.width}mm;` : ""}${b.center ? "align-self:center;" : ""}"><table class="c4p081-tab"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${cols}${rows}</table></div>`;
    },

    c4p081_chart: (b, ctx) => {
      let h = "";
      for (let r = 0; r < 10; r++) {
        h += `<tr style="height:${b.rh || 8}mm">`;
        for (let c = 1; c <= 10; c++) { const n = r * 10 + c, t = ctx.bn(n);
          h += `<td>${(b.ring || []).includes(n) ? `<span class="c4p081-ring">${t}</span>` : (b.box || []).includes(n) ? `<span class="c4p081-sq">${t}</span>` : t}</td>`; }
        h += "</tr>";
      }
      return `<div class="c4p081-tw"><table class="c4p081-tab c4p081-chart">${h}</table></div>`;
    },

    c4p081_fan: (b, ctx) => {
      const n = b.rows.length, rh = b.rh || 7.6, H = n * rh, aw = b.aw || 22;
      let svg = "";
      b.rows.forEach((r, i) => { svg += arrow(0.6, H / 2, aw - 0.8, (i + 0.5) * rh); });
      return `<div class="c4p081-fan"><div class="c4p081-fbox">${ctx.md(b.box)}</div><svg class="c4p081-fsv" width="${aw}mm" height="${H}mm" viewBox="0 0 ${aw} ${H}">${svg}</svg>
        <div class="c4p081-frows" style="grid-template-rows:repeat(${n}, ${rh}mm)">${b.rows.map(([e, s]) => `<span class="c4p081-fe">${ctx.md(e)}</span><span class="c4p081-fs">${ctx.md(s)}</span>`).join("")}</div></div>`;
    },

    c4p081_callouts: (b, ctx) => `<div class="c4p081-calls" style="height:${b.h || 15}mm">${b.items.map((it) =>
      `<div class="c4p081-call" style="left:${it.x}mm;width:${it.w}mm"><i style="left:${f2(it.p - it.x)}mm"></i>${ctx.md(it.text)}</div>`).join("")}</div>`,

    c4p081_sweets: (b) => { // the box (lid open at the back), 4 sweets at the back, 4 in front: 8 in all, each one seen
      const n = b.n || 8, half = n / 2, W = 46, step = 8.6;
      let back = "", front = "";
      const ball = (x, y) => `<circle cx="${f2(x)}" cy="${f2(y)}" r="3.6" fill="url(#c4p081-sw)" stroke="#C2410C" stroke-width=".25"/><ellipse cx="${f2(x - 1.1)}" cy="${f2(y - 1.3)}" rx="1.1" ry=".6" fill="#fff" opacity=".6"/>`;
      for (let i = 0; i < half; i++) { back += ball(9.6 + i * step, 11.4); front += ball(13.6 + i * step, 15.6); }
      return `<svg class="c4p081-sweets" width="${b.w || W}mm" height="${f2((b.w || W) * 30 / W)}mm" viewBox="0 0 ${W} 30">
        <defs><radialGradient id="c4p081-sw" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#FED7AA"/><stop offset=".45" stop-color="#FB923C"/><stop offset="1" stop-color="#C2410C"/></radialGradient></defs>
        <path d="M6 10L9.5 1H40L40.5 10Z" fill="#D6A26A" stroke="#8B5A2B" stroke-width=".35" stroke-linejoin="round"/>
        <path d="M6 10H40.5L44.5 17H1.6Z" fill="#EDD3AE" stroke="#8B5A2B" stroke-width=".35" stroke-linejoin="round"/>
        ${back}${front}
        <path d="M1.6 17H44.5L42.8 28.4H3.4Z" fill="#C98F55" stroke="#8B5A2B" stroke-width=".35" stroke-linejoin="round"/><path d="M3 19.4H43" stroke="#E0B07A" stroke-width=".5"/></svg>`;
    },

    c4p081_caps: (b) => {
      const { w = 168, h = 116, circle: C, groups, arrows } = b;
      let g = `<circle cx="${C.x}" cy="${C.y}" r="${C.r}" fill="#fff" stroke="${INK}" stroke-width=".4"/>`;
      // the 12 caps in the circle: rows of 1, 3, 4, 3, 1
      [1, 3, 4, 3, 1].forEach((k, i) => { g += capGrid(C.x, C.y - 2.5 * PY + i * PY + 0.3, 1, k); });
      for (const G of groups) g += capGrid(G.x, G.y, G.r, G.c) + txt(G.lx ?? G.x, G.ly ?? G.y + G.r * PY + 5.2, G.label, { size: 4.6 });
      for (const a of arrows) g += arrow(...a, { w: 0.35, s: 2 });
      return `<svg class="c4p081-caps" width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}">${g}</svg>`;
    },

    c4p081_rel: () => { // ১২ = ৪ × ৩: arrows from ১২ to ৪ and ৩ above, from ৪ and ৩ back to ১২ below
      const X = { a: 5.4, eq: 12.4, f: 18.2, x: 23.6, g: 29 }, y = 15.2, top = 9.4, bot = 17.4;
      let g = txt(X.a, y, "১২", { size: 6.2 }) + txt(X.eq, y, "=", { size: 6.2 }) + txt(X.f, y, "৪", { size: 6.2 }) + txt(X.x, y - .4, "×", { size: 5.6 }) + txt(X.g, y, "৩", { size: 6.2 });
      g += carc(X.a + 1, top, 11.8, 3.8, X.f - 0.6, top, { col: "#2563EB" }) + carc(X.a, top - 1.2, 17, -3.4, X.g, top, { col: "#2563EB" });
      g += carc(X.f, bot + .6, 12.4, 22.4, X.a + 1.2, bot + .4, { col: "#DB2777" }) + carc(X.g, bot + .6, 17.6, 28.6, X.a - .4, bot + 1.2, { col: "#DB2777" });
      return `<svg class="c4p081-rel" width="30mm" height="22.5mm" viewBox="0 -4 36 27">${g}</svg>`;
    },

    c4p081_pairs: (b, ctx) => { // the factors in a row of boxes; each pair whose product is the number joined by an arc
      const n = b.nums.length, bw = 12, bh = 8, W = n * bw + 2, ctl = (i, j) => 2.4 + (j - i) * 2;
      const H = bh + 2.4 + Math.max(...b.pairs.map(([i, j]) => ctl(i, j))) / 2 + 1.4;
      let g = "";
      b.nums.forEach((v, i) => { g += `<rect x="${1 + i * bw}" y="1" width="${bw}" height="${bh}" fill="#fff" stroke="${INK}" stroke-width=".45"/>` + txt(1 + (i + 0.5) * bw, 1 + bh / 2 + 1.7, ctx.esc(v), { size: 4.8, col: "var(--d)" }); });
      const cols = ["#7C3AED", "#2563EB", "#DB2777"];
      b.pairs.forEach(([i, j], k) => { const x1 = 1 + (i + 0.5) * bw, x2 = 1 + (j + 0.5) * bw;
        g += carc(x1, bh + 2.4, (x1 + x2) / 2, bh + 2.4 + ctl(i, j), x2, bh + 2.4, { both: true, col: cols[k % 3], w: .38, s: 1.3 }); });
      return `<svg class="c4p081-pairs" width="${W}mm" height="${f2(H)}mm" viewBox="0 0 ${W} ${f2(H)}">${g}</svg>`;
    },

    c4p081_trees: (b, ctx) => `<div class="c4p081-trees" style="justify-content:${b.justify || "space-around"}">${b.trees.map((t) =>
      `<div class="c4p081-tu${b.panel ? " c4p081-panel" : ""}">${treeSvg(t, b.look, ctx)}${t.label ? `<span class="c4p081-tlab">${ctx.md(t.label)}</span>` : ""}</div>`).join("")}</div>`,

    c4p081_paper: (b, ctx) => {
      const n = b.n || 15, cw = b.cw || 7.2, ch = b.ch || 6, L = 8, T = 6.6, W = L + n * cw + 0.6, H = T + n * ch + 0.6;
      let g = "", lines = "";
      for (let r = 1; r <= n; r++) for (let c = 1; c <= n; c++) {
        const col = b.fill[c] && r % c === 0 ? b.fill[c] : null;
        if (col) g += `<rect x="${f2(L + (c - 1) * cw)}" y="${f2(T + (r - 1) * ch)}" width="${f2(cw)}" height="${f2(ch)}" fill="${col}"/>`;
      }
      for (let i = 0; i <= n; i++) lines += `<path d="M${f2(L + i * cw)} ${T}V${f2(T + n * ch)}M${L} ${f2(T + i * ch)}H${f2(L + n * cw)}" stroke="#475569" stroke-width="${i === 0 || i === n ? .45 : .22}" fill="none"/>`;
      let nums = "";
      for (let i = 1; i <= n; i++) nums += txt(L + (i - 0.5) * cw, T - 1.6, ctx.bn(i), { size: 3.9, col: "var(--d)" }) + txt(L - 1.6, T + (i - 0.5) * ch + 1.4, ctx.bn(i), { size: 3.9, anchor: "end", col: "var(--d)" });
      return `<svg class="c4p081-paper" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}"><rect x="${L}" y="${T}" width="${f2(n * cw)}" height="${f2(n * ch)}" fill="#fff"/>${g}${lines}${nums}</svg>`;
    },

    c4p081_cards: (b, ctx) => `<div class="c4p081-cards">${b.rows.map(([n, e, v]) => `<div class="c4p081-crow"><div class="c4p081-cc" style="width:${b.cw || 86}mm">${
      `<span class="c4p081-card">${ctx.esc(b.label || "১০")}</span>`.repeat(n)}</div><span class="c4p081-ceq">${ctx.esc(e)}</span><span class="c4p081-cv">${ctx.esc(v)}</span></div>`).join("")}</div>`,

    c4p081_bags: (b) => { // red cloth bags on the top row, yellow paper bags under them
      const red = b.red || 2, yel = b.yellow || 5, W = 58, H = 44;
      let g = "";
      const tote = (x, y) => `<path d="M${f2(x + 3)} ${f2(y + 6)}V${f2(y + 1.6)}Q${f2(x + 3)} ${y} ${f2(x + 4.6)} ${y}H${f2(x + 7.4)}Q${f2(x + 9)} ${y} ${f2(x + 9)} ${f2(y + 1.6)}V${f2(y + 6)}" stroke="#B91C1C" stroke-width="1.1" fill="none"/>
        <rect x="${f2(x)}" y="${f2(y + 5)}" width="12" height="13.5" rx=".6" fill="#EF4444" stroke="#B91C1C" stroke-width=".35"/><rect x="${f2(x)}" y="${f2(y + 5)}" width="12" height="1.6" fill="#DC2626"/>`;
      const paper = (x, y) => `<path d="M${f2(x + 2.4)} ${f2(y + 5.4)}Q${f2(x + 2.4)} ${y} ${f2(x + 4.3)} ${y}Q${f2(x + 6.2)} ${y} ${f2(x + 6.2)} ${f2(y + 5.4)}" stroke="#A16207" stroke-width=".45" fill="none"/>
        <path d="M${f2(x + .6)} ${f2(y + 4.4)}H${f2(x + 8)}L${f2(x + 8.6)} ${f2(y + 18)}H${f2(x)}Z" fill="#FACC15" stroke="#CA8A04" stroke-width=".35" stroke-linejoin="round"/><path d="M${f2(x + 6.4)} ${f2(y + 4.4)}L${f2(x + 6.8)} ${f2(y + 18)}" stroke="#EAB308" stroke-width=".5"/>`;
      for (let i = 0; i < red; i++) g += tote(W / 2 - (red * 14 - 2) / 2 + i * 14, 0.6);
      for (let i = 0; i < yel; i++) g += paper(W / 2 - (yel * 11.2 - 2.6) / 2 + i * 11.2, 23.4);
      return `<svg class="c4p081-bags" width="${b.w || W}mm" height="${f2((b.w || W) * H / W)}mm" viewBox="0 0 ${W} ${H}">${g}</svg>`;
    },

    c4p081_pill: (b, ctx) => `<div class="c4p081-pillw"><span class="c4p081-pill">${ctx.md(b.text)}</span></div>`,

    c4p081_wbox: (b) => `<div class="c4p081-wboxw"><span class="c4p081-wbox" style="width:${b.w}mm;height:${b.h || 10}mm"></span></div>`,

    c4p081_say: (b, ctx, page) => {
      const blocks = (l) => l.map((x) => ctx.blockHtml(x, page)).join("");
      const inner = b.aside ? `<div class="c4p081-sba"><div>${ctx.md(b.text)}</div><div class="c4p081-sbx">${blocks(b.aside)}</div></div>`
        : `${b.center ? `<div class="c4p081-sbc">${ctx.md(b.text)}</div>` : ctx.md(b.text)}${b.body ? `<div class="c4p081-sbb">${blocks(b.body)}</div>` : ""}`;
      const h = ctx.sayHtml(b.who, "\u0001", b.mood || "talk", b.side).replace("\u0001", inner);
      return h.replace(`class="say `, `class="say c4p081-say${b.tiny ? " c4p081-tiny" : ""} `);
    },

    // an exercise whose short items follow its heading on the same line (to fit the fullest pages: pp95, 96)
    c4p081_exrow: (b, ctx, page) => ctx.blockHtml({ ex: b.ex, mark: b.mark, text: "\u0001" }, page).replace("\u0001",
      `<span class="c4p081-exr"><span>${ctx.md(b.text)}</span><span class="c4p081-its">${b.items.map((x, i) => `<span>${b.marks === false ? "" : `<b>(${ctx.bn(i + 1)})</b> `}${ctx.md(x)}</span>`).join("")}</span></span>`),

    // multiple choice with tick boxes (Class 3's look); an item with inline: true has its options on the question's line
    c4p081_mcq: (b, ctx) => { const L = ["ক", "খ", "গ", "ঘ"];
      return `<div class="c4p081-mcq">${b.items.map((it, i) => `<div class="c4p081-mq${it.inline ? " c4p081-mi" : ""}"><b class="c4p081-qm">(${ctx.bn(i + 1)})</b><span>${ctx.md(it.q)}</span><span class="c4p081-mo">${
        it.opts.map((o, j) => `<span><i class="c4p081-tk"></i><b>${L[j]})</b> ${ctx.md(o)}</span>`).join("")}</span></div>`).join("")}</div>`; },

    c4p081_note: (b, ctx) => `<div class="c4p081-notew"><div class="c4p081-note">${ctx.md(b.text)}</div></div>`,

    c4p081_eqs: (b, ctx) => `<div class="c4p081-eqs">${b.lead ? `<span class="c4p081-eql">${ctx.md(b.lead)}</span>` : ""}${b.items.map((x) => `<span>${ctx.md(x)}</span>`).join("")}</div>`,
  },

  css: `
/* marks in a line */
svg.c4p081-sym { display: inline-block; vertical-align: -1.2mm; margin: 0 .6mm } svg.c4p081-tick { display: inline-block; vertical-align: -.7mm; margin: 0 .2mm }
.c4p081-ring, .c4p081-sq { display: inline-flex; align-items: center; justify-content: center; min-width: 7mm; height: 7mm; padding: .7mm .5mm 0; border: .5mm solid #DC2626; border-radius: 99px; line-height: 1; vertical-align: middle }
.c4p081-sq { border-radius: .8mm }
.abox.c4p081-wbx { width: 19mm } .abox.c4p081-lbx { width: 34mm } .abox.c4p081-wbx, .abox.c4p081-lbx { height: 6.8mm; vertical-align: -1.9mm }
.c4p081-nb { white-space: nowrap }
/* an exercise's heading with its items on the same line */
.c4p081-exr { display: flex; align-items: baseline; justify-content: space-between; gap: 4mm; flex-wrap: wrap }
.c4p081-its { flex: 1; display: flex; justify-content: space-between; gap: 3mm; font: 700 13pt 'Baloo Da 2'; max-width: 92mm } .c4p081-its > span { white-space: nowrap } .c4p081-its b { color: #EA580C }
/* tables */
.c4p081-tw { border: .6mm solid var(--c); border-radius: 2.6mm; overflow: hidden; background: #fff; box-shadow: 0 1mm 0 var(--s) }
.c4p081-tab { width: 100%; table-layout: fixed; border-collapse: collapse; border-style: hidden; font: 700 13pt 'Baloo Da 2'; color: ${INK} }
.c4p081-tab td { border: .3mm solid #8FD3CA; text-align: center; vertical-align: middle; padding: .8mm .8mm .4mm; height: 8.2mm; line-height: 1.25 }
.c4p081-tab td.c4p081-l { text-align: left; padding-left: 2.4mm; word-spacing: .6mm } .c4p081-tab td.c4p081-w { font: 600 12pt/1.35 'Noto Sans Bengali'; word-spacing: 0 }
.c4p081-tab td:not(.c4p081-w) { white-space: nowrap } .c4p081-tab svg.c4p081-tick { width: 3.2mm; height: 3.2mm; margin: 0 }
.c4p081-chart tr:nth-child(even) td { background: #F0FDFA } .c4p081-chart td { font-size: 13.5pt; padding: .4mm 0 0 }
/* p81: the box with arrows to six rows */
.c4p081-fan { display: flex; align-items: center }
.c4p081-fbox { flex: none; width: 21mm; padding: 2mm 1mm; border: .6mm solid var(--c); border-radius: 2.4mm; background: var(--s); text-align: center; font: 700 12pt/1.4 'Noto Sans Bengali'; color: var(--d) }
svg.c4p081-fsv { flex: none; display: block }
.c4p081-frows { flex: 1; display: grid; grid-template-columns: 33mm 1fr; align-items: center; padding-left: 1mm }
.c4p081-fe { font: 800 13pt 'Baloo Da 2'; color: var(--d); white-space: nowrap } .c4p081-fs { font: 500 12.5pt 'Noto Sans Bengali'; white-space: nowrap }
/* p84: the boxes pointing up at the table */
.c4p081-calls { position: relative; flex: none; margin-top: .6mm }
.c4p081-call { position: absolute; top: 1.6mm; padding: 1.2mm 1.6mm .9mm; background: #fff; border: .5mm solid var(--c); border-radius: 2mm; text-align: center; font: 500 11pt/1.4 'Noto Sans Bengali'; white-space: nowrap }
.c4p081-call i { position: absolute; top: -2.05mm; width: 3.4mm; height: 3.4mm; background: #fff; border-left: .5mm solid var(--c); border-top: .5mm solid var(--c); transform: translateX(-50%) rotate(45deg) }
svg.c4p081-sweets, svg.c4p081-caps, svg.c4p081-rel, svg.c4p081-pairs, svg.c4p081-tree, svg.c4p081-paper, svg.c4p081-bags { display: block; overflow: visible }
svg.c4p081-caps, svg.c4p081-paper { align-self: center }
/* factor trees */
.c4p081-trees { display: flex; align-items: flex-start }
.c4p081-tu { display: flex; flex-direction: column; align-items: center; gap: 1.6mm }
.c4p081-tlab { font: 600 11.5pt 'Noto Sans Bengali'; padding: .5mm 2.2mm .2mm; border: .45mm solid var(--c); border-radius: 1.6mm; background: var(--s); color: var(--d); white-space: nowrap }
.c4p081-panel { background: #FDE68A; border: .5mm solid #B45309; border-radius: 6mm; padding: 2.4mm 6mm 2.6mm }
/* p94: the ১০ cards */
.c4p081-cards { display: flex; flex-direction: column; gap: 1.5mm; align-self: center }
.c4p081-crow { display: flex; align-items: center; gap: 2.4mm } .c4p081-cc { display: flex; gap: .9mm }
.c4p081-card { width: 7.6mm; height: 7.6mm; display: inline-flex; align-items: center; justify-content: center; padding-top: .6mm; background: #B04A9E; color: #fff; font: 700 11pt 'Baloo Da 2'; border-radius: .9mm; box-shadow: 0 .5mm 0 #7E2F72 }
.c4p081-ceq, .c4p081-cv { display: inline-flex; align-items: center; justify-content: center; height: 7.6mm; padding: .6mm 2mm 0; border: .45mm solid ${INK}; background: #fff; font: 700 12.5pt 'Baloo Da 2'; white-space: nowrap }
.c4p081-ceq { width: 24mm } .c4p081-cv { width: 14mm }
/* the yellow pill, the box to write in, a smaller speaker */
.c4p081-pillw { display: flex; justify-content: center } .c4p081-pill { font: 700 13pt 'Noto Sans Bengali'; background: #FEF08A; color: #713F12; padding: 1mm 8mm .6mm; border-radius: 99px; box-shadow: 0 .8mm 0 #FACC15 }
.c4p081-wboxw { display: flex; justify-content: center } .c4p081-wbox { display: block; background: #fff; border: .55mm solid var(--c); border-radius: 2mm; box-shadow: 0 .8mm 0 var(--s) }
.c4p081-say .fc { width: 16mm; height: 16mm } .c4p081-say .sb { font-size: 12.5pt; padding: 2mm 4.4mm 1.8mm; max-width: 140mm }
.c4p081-tiny .fc { width: 13.5mm; height: 13.5mm } .c4p081-tiny .sb { font-size: 12pt; padding: 1.5mm 3.8mm 1.3mm }
.c4p081-sbb { display: flex; flex-direction: column; align-items: center; gap: .6mm; margin-top: 1mm } .c4p081-sbb .tx { font: inherit; text-align: center }
.c4p081-sbc { text-align: center }
.c4p081-sba { display: flex; align-items: center; gap: 3mm } .c4p081-sbx { flex: none }
/* multiple choice */
.c4p081-mcq { display: flex; flex-direction: column; gap: .2mm; padding-left: 1mm }
.c4p081-mq { display: grid; grid-template-columns: 8.5mm 1fr; font: 500 12pt/1.3 'Noto Sans Bengali' } .c4p081-mq.c4p081-mi { grid-template-columns: 8.5mm 56mm 1fr }
.c4p081-qm { font: 700 12pt/1.3 'Noto Sans Bengali'; color: #EA580C }
.c4p081-mo { grid-column: 2; display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 1.5mm; padding-left: 0 } .c4p081-mi .c4p081-mo { grid-column: 3; padding-left: 0 }
.c4p081-mo > span { display: flex; align-items: center; gap: 1.1mm; white-space: nowrap } .c4p081-mo b { color: #1D4ED8; font: 700 11.5pt 'Noto Sans Bengali' }
.c4p081-tk { flex: none; width: 4mm; height: 4mm; border: .5mm solid #3B9EE8; border-radius: 1.1mm; background: #fff }
/* a bordered rule (the book's boxed sentences), centred */
.c4p081-notew { display: flex; justify-content: center }
.c4p081-note { font: 600 12.5pt/1.5 'Noto Sans Bengali'; background: #FEF9C3; border: .55mm solid #CA8A04; border-radius: 2.4mm; padding: 1.6mm 5mm 1.2mm; box-shadow: 0 .8mm 0 #FDE68A }
/* p89: "উদাহরণ" and the equations in a row */
.c4p081-eqs { display: flex; flex-wrap: wrap; align-items: baseline; gap: 1mm 6mm; font: 700 13pt 'Baloo Da 2' } .c4p081-eql { font: 600 12.5pt 'Noto Sans Bengali'; color: var(--d) }
.c4p081-tab svg.c4p081-tick { width: 3.6mm; height: 3.6mm }
`,
};
