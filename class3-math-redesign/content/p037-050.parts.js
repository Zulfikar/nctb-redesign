// Own kinds for printed pages 37–50 (chapter ৪ যোগ ও বিয়োগের সম্পর্ক, and the start of chapter ৫ গুণ). Units: mm.
// Everything with a count, a place or an arrow that matters is drawn here by code.
//   c3p037_terms   { rows: [[num, term]] }                     p37's grey box: ১৪ ──▶ বিয়োজন …
//   c3p037_rel     { rows: [[a, op, b, "=", c]] }              p37's box of relations (each term in its own colour)
//   c3p037_mk      { mark, n, text }                           an exercise's marker and line, for a card whose line sits beside a picture
//   c3p037_flow    { first: item, second: item }              p38: two column sums (p040_cs items) with an arrow between
//   c3p037_ledger  { rows: [{ l, v, u, rule }] }               p38's labelled column (শিক্ষার্থীর সংখ্যা ৫৩৮ জন …)
//   c3p037_bar     { parts: ["□", "+", "□", "=", "□"] }        p39's grey bar of boxes
//   c3p037_maker   { rows: [{ n, plus, minus, res, ka, kha }] } p39: a + b and c − d ovals pointing to one circle, two stories beside
//   c3p037_mcq     { items: [{ n, q, opts, cols }] }           multiple choice (ক খ গ ঘ)
//   c3p037_qs      { items: [{ n, text }], mark }              a list of word problems, each with the book's marker
//   c3p037_star    { labels: { tl, tr, l, rr, bl, br } }       p41: three lines through an empty centre circle
//   c3p037_diam    { rows: [[left, mid, right]] }              p41: oval ◇ oval rows
//   c3p037_mtab    { n, upto, blanks, cw, ch, size }           the times-table grid (গুণক across, গুণ্য down); upto = the printed block
//   c3p037_rowtab  { a, blank, cw }                            p43: one row of a times table with the arrows that count up and down
//   c3p037_say     { who, mood, side, text, body: [blocks] }   a speech card with blocks inside the bubble
//   c3p037_steps   { rows: [{ eq, note, mid }], h }            p45: lines joined by the book's red arrows, a note beside each
//   c3p037_tree    { left, top, bottom, total, totalRight }    the split "tree": a × b < two parts, a rule, the total
//   c3p037_split   { rows, cols, cut, labels: [top, bottom], s } p44: a dot array cut by a dashed line, a brace and label for each part
//   c3p037_lgrid   { R, C, r, up, old, label, s }              p46: the dot sheet R × C with the L-shaped paper (counted rows r)
//   c3p037_two     { s }                                       p46: a 10 × 10 and a 3 × 10 dot sheet with the first 3 columns framed
//   c3p037_match   { left, right, from, to }                   p47: two columns to join with lines; one arrow drawn
//   c3p037_notes   { cards, per, w }                           p49: cards holding ten-taka notes, each named "দশ টাকা"
//   c3p037_x10     {}                                          p49: ২ × ৪ = ৮ → (১০ গুণ) → ২০ × ৪ = □
//   c3p037_tens    { cards, per }                              p49: cards holding "১০" tiles
//   c3p037_gbox    { rows: [[left, right]] }                   p49's green box of answer lines
//   c3p037_tape    {}                                          p50: the tape diagram (৩ × ২৩ টাকা) over a number line
//   c3p037_weq     { top, bottom }                             p50: the words of a product, arrows up from গুণ্য × গুণক = গুণফল
//   c3p037_pvc     {}                                          p50: the দশক | একক chart of 23 × 3 with its braces
const INK = "#1E2433";
const f = (n) => +(+n).toFixed(2);
const T = (x, y, s, size, col = INK, { w = 800, anchor = "middle", font = "Baloo Da 2" } = {}) =>
  `<text x="${f(x)}" y="${f(y)}" font-family="${font}" font-weight="${w}" font-size="${f(size)}" text-anchor="${anchor}" style="fill:${col}">${s}</text>`;
const svgk = (w, h, inner, k = 1, cls = "c3p037-svg") => `<svg class="${cls}" width="${f(w * k)}mm" height="${f(h * k)}mm" viewBox="0 0 ${f(w)} ${f(h)}">${inner}</svg>`;
const svg = (w, h, inner, cls = "c3p037-svg") => `<svg class="${cls}" width="${f(w)}mm" height="${f(h)}mm" viewBox="0 0 ${f(w)} ${f(h)}">${inner}</svg>`;
const TERM = { "বিয়োজন": "o", "বিয়োজ্য": "b", "বিয়োগফল": "g" };
const ARROW_R = `<svg class="c3p037-arr" viewBox="0 0 30 8"><path d="M1 4H24" stroke="${INK}" stroke-width="1.2"/><path d="M22 .8L29 4L22 7.2Z" fill="${INK}"/></svg>`;

/** an arrowhead at (x, y) pointing along angle a (degrees) */
const head = (x, y, a, s, col) => `<path d="M0 0L${f(-s)} ${f(-s * 0.55)}L${f(-s * 0.7)} 0L${f(-s)} ${f(s * 0.55)}Z" transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})" style="fill:${col}"/>`;
/** an arrowhead at the end (x, y) of a quadratic curve whose control point is (cx, cy) */
const qhead = (cx, cy, x, y, s, col) => head(x, y, Math.atan2(y - cy, x - cx) * 180 / Math.PI, s, col);
/** a curly brace from x1 to x2, its tip pointing up (dir -1) or down (dir 1) at y; depth d */
function braceH(x1, x2, y, d, dir = -1) {
  const m = (x1 + x2) / 2, q = d / 2, e = y - dir * d; // e = the brace's ends, y = its tip
  const r = Math.min(q * 2, (x2 - x1) / 4);
  return `M${f(x1)} ${f(e)}Q${f(x1)} ${f(e + dir * q)} ${f(x1 + r)} ${f(e + dir * q)}H${f(m - r)}Q${f(m)} ${f(e + dir * q)} ${f(m)} ${f(y)}Q${f(m)} ${f(e + dir * q)} ${f(m + r)} ${f(e + dir * q)}H${f(x2 - r)}Q${f(x2)} ${f(e + dir * q)} ${f(x2)} ${f(e)}`;
}
/** a curly brace from y1 to y2, its tip pointing right at x; depth d */
function braceV(y1, y2, x, d) {
  const m = (y1 + y2) / 2, q = d / 2, e = x - d, r = Math.min(q * 2, (y2 - y1) / 4);
  return `M${f(e)} ${f(y1)}Q${f(e + q)} ${f(y1)} ${f(e + q)} ${f(y1 + r)}V${f(m - r)}Q${f(e + q)} ${f(m)} ${f(x)} ${f(m)}Q${f(e + q)} ${f(m)} ${f(e + q)} ${f(m + r)}V${f(y2 - r)}Q${f(e + q)} ${f(y2)} ${f(e)} ${f(y2)}`;
}
/** one square cell with a dot, in the look of Class 2's dot sheets (p088_dots) */
function cellDot(x, y, s, fill, bg = "#fff", line = "#94A3B8") {
  return `<rect x="${f(x)}" y="${f(y)}" width="${f(s)}" height="${f(s)}" style="fill:${bg}" stroke="${line}" stroke-width="${f(Math.min(0.28, s * 0.055))}"/>` +
    (fill ? `<circle cx="${f(x + s / 2)}" cy="${f(y + s / 2)}" r="${f(s * 0.36)}" style="fill:${fill}"/>` : "");
}
/** a fat block arrow pointing right (dir 0), from its tail's centre (x, y) */
function blockArrow(x, y, len, wd, fill, stroke, dir = 0) {
  const hw = wd / 2, hd = wd * 1.0, hh = wd * 0.95;
  const d = `M0 ${f(-hw * 0.55)}H${f(len - hd)}V${f(-hh)}L${f(len)} 0L${f(len - hd)} ${f(hh)}V${f(hw * 0.55)}H0Z`;
  return `<path d="${d}" transform="translate(${f(x)} ${f(y)}) rotate(${dir})" style="fill:${fill};stroke:${stroke}" stroke-width="${f(wd * 0.09)}" stroke-linejoin="round"/>`;
}
const boxSvg = (x, y, w, h) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="1.2" fill="#FFFBEB" stroke="#F59E0B" stroke-width=".5"/>`;

// ── p37 ──
const terms = (b, ctx) => `<div class="c3p037-terms">${b.rows.map(([n, w]) => `<span class="n">${ctx.esc(n)}</span>${ARROW_R}<span class="c3p037-term t-${TERM[w] || "o"}">${ctx.esc(w)}</span>`).join("")}</div>`;
const rel = (b, ctx) => `<div class="c3p037-rel">${b.rows.map((r) => r.map((c, i) => i % 2 ? `<span class="op">${ctx.esc(c)}</span>` : `<span class="c3p037-term t-${TERM[c] || "o"}">${ctx.esc(c)}</span>`).join("")).join("")}</div>`;

// ── p38 ──
function ledger(b, ctx) {
  return `<table class="c3p037-ledger">${b.rows.map((r) => `<tr${r.rule ? ` class="rule"` : ""}><td class="l">${ctx.md(r.l || "")}</td><td class="v">${ctx.md(r.v || "")}</td><td class="u">${ctx.md(r.u || "")}</td></tr>`).join("")}</table>`;
}
function flow(b, ctx, page) {
  const one = (it) => ctx.blockHtml({ kind: "p040_cs", items: [it], size: b.size || 15, justify: "center" }, page);
  const arrow = `<svg class="c3p037-fa" width="20mm" height="9mm" viewBox="0 0 20 9">${blockArrow(1, 4.5, 18, 5, "var(--c)", "var(--d)")}</svg>`;
  return `<div class="c3p037-flow">${one(b.first)}${arrow}${one(b.second)}</div>`;
}

// ── p39 ──
const bar = (b, ctx) => `<div class="c3p037-bar">${b.parts.map((p) => p === "□" ? `<span class="bx"></span>` : `<span class="op">${ctx.esc(p)}</span>`).join("")}</div>`;
function makerSvg(r, k = 1) {
  const W = 64, H = 34, cy1 = 9, cy2 = 25, cx = 19, CX = 53, CY = 17;
  const pair = (y, vals, op, fill, stroke) => `<ellipse cx="${cx}" cy="${y}" rx="17.5" ry="7.6" style="fill:${fill}" stroke="${stroke}" stroke-width=".5"/>` +
    `<rect x="${cx - 13}" y="${y - 3.9}" width="9.5" height="7.8" rx=".9" fill="#fff" stroke="${INK}" stroke-width=".4"/><rect x="${cx + 3.5}" y="${y - 3.9}" width="9.5" height="7.8" rx=".9" fill="#fff" stroke="${INK}" stroke-width=".4"/>` +
    T(cx, y + 1.6, op, 5.2, "#DC2626") + (vals ? T(cx - 8.25, y + 1.75, vals[0], 4.6) + T(cx + 8.25, y + 1.75, vals[1], 4.6) : "");
  return svgk(W, H, `<path d="M${cx + 17.3} ${cy1 + 1.2}L${CX - 7.4} ${CY - 1.6}M${cx + 17.3} ${cy2 - 1.2}L${CX - 7.4} ${CY + 1.6}" stroke="${INK}" stroke-width=".45"/>` +
    pair(cy1, r.plus, "+", "#FEF3A0", "#CA8A04") + pair(cy2, r.minus, "−", "#E2E8F0", "#94A3B8") +
    `<circle cx="${CX}" cy="${CY}" r="8" fill="#FDE047" stroke="#CA8A04" stroke-width=".5"/>` + (r.res ? T(CX, CY + 1.9, r.res, 5.4) : ""), k);
}
const LINES = `<span class="lns"><i class="ln"></i><i class="ln"></i></span>`;
function maker(b, ctx) {
  return `<div class="c3p037-maker">${b.rows.map((r) => `<div class="mr" style="grid-template-columns:${f(66 * (b.k || 1))}mm 1fr">${makerSvg(r, b.k || 1)}<div class="mt">
    <div class="st"><b>${ctx.esc(r.n)}। (ক)</b>${r.ka ? `<span>${ctx.md(r.ka)}</span>` : LINES}</div>
    <div class="st"><b class="kha">(খ)</b>${r.kha ? `<span>${ctx.md(r.kha)}</span>` : LINES}</div></div></div>`).join("")}</div>`;
}

// ── p40–41 ──
const mcq = (b, ctx) => `<div class="c3p037-mcq">${b.items.map((it) => `<div class="mq"><div class="q"><b>${ctx.esc(it.n)}</b><span>${ctx.md(it.q)}</span></div>
  <div class="opts" style="grid-template-columns:repeat(${it.cols || 4}, 1fr)">${it.opts.map((o) => { const m = o.match(/^(\(.\))\s*(.*)$/); return `<span class="opt"><b>${ctx.esc(m[1])}</b>${ctx.md(m[2])}</span>`; }).join("")}</div></div>`).join("")}</div>`;
const qs = (b, ctx) => `<div class="c3p037-qs m-${b.mark || "nije"}">${b.items.map((q) => `<div class="qq">${ctx.exMark(b.mark || "nije", q.n)}<span>${ctx.md(q.text)}</span></div>`).join("")}</div>`;
function star(b) {
  // the book's places: ৮ top-left, ৭ top-right, ৪ left, ৫ right, ৬ bottom-left, ৯ bottom-right; each line joins two ends through the centre
  const c = [30, 21], R = 4.6, r0 = 5.6, P = { tl: [12, 5], tr: [46, 5], l: [4, 21], rr: [56, 21], bl: [13, 37], br: [44, 38.5] };
  const lab = b.labels; // { tl, tr, l, rr, bl, br }
  let o = "";
  for (const [p, q] of [["tl", "br"], ["tr", "bl"], ["l", "rr"]]) o += `<path d="M${P[p][0]} ${P[p][1]}L${P[q][0]} ${P[q][1]}" stroke="${INK}" stroke-width=".45"/>`;
  o += `<circle cx="${c[0]}" cy="${c[1]}" r="${r0}" fill="#fff" stroke="${INK}" stroke-width=".5"/>`;
  for (const [k, [x, y]] of Object.entries(P)) o += `<circle cx="${x}" cy="${y}" r="${R}" fill="#FFEDD5" stroke="#EA580C" stroke-width=".5"/>` + T(x, y + 1.7, lab[k], 4.8);
  return svgk(61, 43.5, `<g transform="translate(.5 .5)">${o}</g>`, b.k || 1);
}
function diam(b) {
  const rh = 11.5;
  let o = "";
  b.rows.forEach(([l, m, r], i) => {
    const y = 6 + i * rh;
    o += `<ellipse cx="9.5" cy="${y}" rx="9" ry="4.4" fill="#FFEDD5" stroke="#EA580C" stroke-width=".5"/>${T(9.5, y + 1.7, l, 4.8)}`;
    o += `<path d="M19 ${y}L31 ${y - 5.2}L43 ${y}L31 ${y + 5.2}Z" fill="${m ? "#FEF3C7" : "#fff"}" stroke="#D97706" stroke-width=".5"/>${m ? T(31, y + 1.7, m, 4.6) : ""}`;
    o += `<ellipse cx="51.5" cy="${y}" rx="8" ry="4.4" fill="#FFEDD5" stroke="#EA580C" stroke-width=".5"/>${T(51.5, y + 1.7, r, 4.8)}`;
  });
  return svgk(60.5, 6 + (b.rows.length - 1) * rh + 6, o, b.k || 1);
}

// ── the times-table grid (p42, p48) ──
function mtab(b, ctx) {
  const n = b.n || 10, upto = b.upto ?? n, blanks = new Set((b.blanks || []).map(([r, c]) => `${r},${c}`));
  const cw = b.cw || 12, ch = b.ch || 8.4, size = b.size || 12;
  let h = `<tr style="height:${ch}mm"><th class="corner"></th>${Array.from({ length: n }, (_, c) => `<th class="top">${ctx.bn(c + 1)}</th>`).join("")}</tr>`;
  for (let r = 1; r <= n; r++) {
    h += `<tr style="height:${ch}mm"><th class="side">${ctx.bn(r)}</th>`;
    for (let c = 1; c <= n; c++) {
      const shown = r <= upto && c <= upto && !blanks.has(`${r},${c}`);
      h += `<td class="${blanks.has(`${r},${c}`) ? "bl" : shown ? "" : "em"}">${shown ? ctx.bn(r * c) : ""}</td>`;
    }
    h += "</tr>";
  }
  return `<div class="c3p037-mt" style="--cw:${cw}mm;font-size:${size}pt"><div class="mtop"><span class="pill gk">গুণক</span></div>
    <div class="mrow"><span class="pill gy">গুণ্য</span><table>${h}</table></div></div>`;
}

// ── p43: one row of the times table, the arrows counting up (red) and down (blue) ──
function rowtab(b, ctx) {
  const a = b.a, cw = b.cw || 13, h1 = 8, h2 = 8.6, x0 = 0.4, y0 = 0.4, W = 11 * cw + 0.8, H = h1 + h2 + 8;
  let o = "";
  for (let c = 0; c <= 10; c++) {
    const x = x0 + c * cw;
    o += `<rect x="${f(x)}" y="${y0}" width="${cw}" height="${h1}" fill="${c ? "#DBEAFE" : "#fff"}" stroke="${INK}" stroke-width=".4"/>`;
    o += `<rect x="${f(x)}" y="${y0 + h1}" width="${cw}" height="${h2}" fill="#fff" stroke="${INK}" stroke-width=".4"/>`;
    if (c) o += T(x + cw / 2, y0 + h1 / 2 + 1.7, ctx.bn(c), 4.6, "#1E3A8A");
    const v = c === 0 ? ctx.bn(a) : c === b.blank ? null : ctx.bn(a * c);
    if (v != null) o += T(x + cw / 2, y0 + h1 + h2 / 2 + 1.7, v, 4.8);
    else o += boxSvg(x + 2, y0 + h1 + 1.4, cw - 4, h2 - 2.8);
  }
  const yb = y0 + h1 + h2, cx = (c) => x0 + (c + 0.5) * cw;
  const arc = (c1, c2, col) => {
    const xa = cx(c1) + (c2 > c1 ? 1 : -1), xb = cx(c2) + (c2 > c1 ? -1 : 1), xm = (xa + xb) / 2, ym = yb + 7.4, ya = yb + 0.8;
    return `<path d="M${f(xa)} ${f(ya)}Q${f(xm)} ${f(ym)} ${f(xb)} ${f(ya)}" fill="none" stroke="${col}" stroke-width=".5"/>` + qhead(xm, ym, xb, ya, 1.8, col);
  };
  for (let c = 1; c < b.blank; c++) o += arc(c, c + 1, "#DC2626");
  for (let c = 10; c > b.blank; c--) o += arc(c, c - 1, "#3B82F6");
  return svg(W, H, o);
}

// ── speech with blocks inside, and the stepped lines of p45 ──
function sayPlus(b, ctx, page) {
  const html = ctx.sayHtml(b.who, b.text || "", b.mood, b.side);
  const extra = `<div class="c3p037-sbx">${(b.body || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>`;
  return html.replace(/(<div class="sb">[\s\S]*?)<\/div>/, (m, a) => `${a}${extra}</div>`);
}
function steps(b, ctx) {
  const h = b.h || 8.6, n = b.rows.length, aw = 7;
  let arcs = "";
  for (let i = 1; i < n; i++) {
    const y1 = (i - 1) * h + h / 2 + 1.2, y2 = i * h + h / 2 - 1.4;
    arcs += `<path d="M1 ${f(y1)}Q${f(aw - 0.6)} ${f((y1 + y2) / 2)} 1.6 ${f(y2)}" fill="none" stroke="#DC2626" stroke-width=".45"/>` + qhead(aw - 0.6, (y1 + y2) / 2, 1.6, y2, 1.6, "#DC2626");
  }
  return `<div class="c3p037-steps" style="grid-template-rows:repeat(${n}, ${h}mm)">
    <svg class="arcs" style="grid-row:1 / span ${n}" width="${aw}mm" height="${f(n * h)}mm" viewBox="0 0 ${aw} ${f(n * h)}">${arcs}</svg>
    ${b.rows.map((r, i) => `<span class="eq" style="grid-row:${i + 1}">${ctx.md(r.eq)}</span><span class="nt${r.mid ? " mid" : ""}" style="grid-row:${i + 1};${r.mid ? `top:${f(-h / 2)}mm` : ""}">${r.note ? ctx.md(r.note) : ""}</span>`).join("")}</div>`;
}
const tree = (b, ctx) => `<div class="c3p037-tree"${b.size ? ` style="font-size:${b.size}pt"` : ""}><span class="l">${ctx.md(b.left)}</span>
  <svg class="fork" viewBox="0 0 10 20" preserveAspectRatio="none"><path d="M.5 10L9.5 3.2M.5 10L9.5 16.8" stroke="${INK}" stroke-width="1" fill="none" vector-effect="non-scaling-stroke"/></svg>
  <div class="r"><span>${ctx.md(b.top)}</span><span>${ctx.md(b.bottom)}</span></div>
  <div class="tot"><span>${ctx.md(b.total || "")}</span><span>${ctx.md(b.totalRight || "")}</span></div></div>`;

// ── dot arrays ──
function split(b, ctx) {
  const { rows, cols, cut } = b, s = b.s || 4.6, g = 0.4, W = cols * s + 9, H = rows * s + 1.2, gx = 0.6, gy = 0.6;
  let o = "";
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) o += cellDot(gx + c * s, gy + r * s + (r >= cut ? g : 0), s, "var(--c)", "var(--s)");
  o += `<path d="M${gx - 0.6} ${f(gy + cut * s + g / 2)}H${f(gx + cols * s + 0.8)}" stroke="${INK}" stroke-width=".45" stroke-dasharray="1.4 1"/>`;
  const bx = gx + cols * s + 1.2;
  o += `<path d="${braceV(gy + 0.2, gy + cut * s - 0.2, bx + 2.6, 2.6)}" fill="none" stroke="${INK}" stroke-width=".4"/>`;
  o += `<path d="${braceV(gy + cut * s + g + 0.2, gy + rows * s + g - 0.2, bx + 2.6, 2.6)}" fill="none" stroke="${INK}" stroke-width=".4"/>`;
  const lab = (y, t) => `<span class="lab" style="top:${f(y)}mm;left:${f(bx + 3.6)}mm">${ctx.md(t)}</span>`;
  return `<div class="c3p037-split" style="width:${f(W + 26)}mm;height:${f(H + g)}mm">${svg(W, H + g, o)}${lab(gy + cut * s / 2, b.labels[0])}${lab(gy + g + (cut + rows) * s / 2, b.labels[1])}</div>`;
}
function lgrid(b, ctx) {
  const { R, C, r, up, old } = b, s = b.s || 4.6, over = s * 0.9, arrowsH = s * 1.6, ext = s * 0.9;
  const lw = b.label ? s * 2.6 : 0, gx = lw + over, gy = arrowsH + ext, armY = gy + r * s;
  const W = gx + C * s + 0.6, H = gy + R * s + 0.6;
  let o = "";
  for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) {
    const counted = i < r && j < up - 1, isOld = counted && j === old - 1;
    o += cellDot(gx + j * s, gy + i * s, s, counted ? "var(--c)" : INK, isOld ? "#BAE6FD" : counted ? "var(--s)" : "#fff");
  }
  o += `<rect x="${f(gx)}" y="${f(gy)}" width="${f(C * s)}" height="${f(R * s)}" fill="none" stroke="#334155" stroke-width=".4"/>`;
  // the paper's old place: a blue dashed strip over column `old`
  const ox = gx + (old - 1) * s;
  o += `<rect x="${f(ox)}" y="${f(gy - ext)}" width="${f(s)}" height="${f(armY - gy + ext)}" fill="#7DD3FC" fill-opacity=".25" stroke="#0284C7" stroke-width="${f(s * 0.06)}" stroke-dasharray="${f(s * 0.22)} ${f(s * 0.14)}"/>`;
  // the L-shaped paper: upright over column `up`, arm under the counted rows
  const px = gx + (up - 1) * s;
  const L = `M${f(px)} ${f(gy - ext)}H${f(px + s)}V${f(armY + s)}H${f(gx - over)}V${f(armY)}H${f(px)}Z`;
  o += `<path d="${L}" transform="translate(.5 .7)" fill="rgba(30,36,51,.16)"/><path d="${L}" fill="#FEF9C3" stroke="#CA8A04" stroke-width=".45" stroke-linejoin="round"/>`;
  // the slide: from the old place to the new one
  const ay = arrowsH * 0.5;
  o += blockArrow(ox - s * 0.2, ay, px - ox + s * 0.9, s * 0.8, "#BAE6FD", "#0284C7");
  o += blockArrow(px + s * 0.4, ay, s * 2.4, s * 0.8, "#38BDF8", "#0369A1");
  if (b.label) o += `<path d="M${f(lw - s * 0.2)} ${f(gy + 0.2)}H${f(lw - s * 0.9)}V${f(armY - 0.2)}H${f(lw - s * 0.2)}" fill="none" stroke="${INK}" stroke-width=".45"/>` + T(lw - s * 1.6, gy + r * s / 2 + 1.6, b.label, s * 0.95, "var(--d)", { anchor: "middle" });
  return svg(W, H, o);
}
function two(b, ctx) {
  const s = b.s || 4.4, lx = 36, pad = 3, gx = lx, W = lx + 10 * s + 8, h1 = 10 * s + 2 * pad, h2 = 3 * s + 2 * pad, gap = 2.6;
  const grid = (y, rows) => { let o = ""; for (let r = 0; r < rows; r++) for (let c = 0; c < 10; c++) o += cellDot(gx + c * s, y + r * s, s, INK, "rgba(255,255,255,.55)", "#334155"); return o + `<rect x="${gx}" y="${f(y)}" width="${f(10 * s)}" height="${f(rows * s)}" fill="none" stroke="#334155" stroke-width=".4"/>`; };
  let o = `<rect x=".5" y=".5" width="${f(W - 1)}" height="${f(h1)}" rx="4" fill="#FBCFE8" stroke="#DB2777" stroke-width=".5"/>`;
  o += `<rect x=".5" y="${f(h1 + gap + 0.5)}" width="${f(W - 1)}" height="${f(h2)}" rx="4" fill="#BBF7D0" stroke="#16A34A" stroke-width=".5"/>`;
  o += grid(0.5 + pad, 10) + grid(h1 + gap + 0.5 + pad, 3);
  o += T(lx / 2, 0.5 + h1 / 2 + 1.8, "১০ এর গুণ", 5, "#9D174D") + T(lx / 2, h1 + gap + 0.5 + h2 / 2 + 1.8, "৩ এর গুণ", 5, "#166534");
  o += `<rect x="${f(gx - 0.6)}" y="${f(0.5 + pad - 0.6)}" width="${f(3 * s + 1.2)}" height="${f(h1 + gap + h2 - 2 * pad + 1.2)}" fill="none" stroke="#DC2626" stroke-width=".7" stroke-dasharray="1.2 .8"/>`;
  return svg(W, h1 + gap + h2 + 1, o);
}

// ── p47: draw lines to match ──
function match(b, ctx) {
  const rh = b.rh || 7.6, lw = 32, gap = 34, rw = 28, n = b.left.length, W = lw + gap + rw + 1, H = n * rh + 1;
  let o = "";
  b.left.forEach((t, i) => { const y = 0.5 + i * rh; o += `<rect x=".5" y="${f(y)}" width="${lw}" height="${rh}" fill="${i % 2 ? "#fff" : "#FDF2F8"}" stroke="${INK}" stroke-width=".35"/>` + T(lw / 2 + 0.5, y + rh / 2 + 1.6, t, 4.6) + `<circle cx="${f(lw + 2.2)}" cy="${f(y + rh / 2)}" r=".9" style="fill:var(--c)"/>`; });
  b.right.forEach((t, i) => { const y = 0.5 + i * rh, x = lw + gap + 0.5; o += `<rect x="${f(x)}" y="${f(y)}" width="${rw}" height="${rh}" fill="${i % 2 ? "#fff" : "#EFF6FF"}" stroke="${INK}" stroke-width=".35"/>` + T(x + rw / 2, y + rh / 2 + 1.6, t, 4.6) + `<circle cx="${f(x - 1.7)}" cy="${f(y + rh / 2)}" r=".9" fill="#2563EB"/>`; });
  const x1 = lw + 2.2, y1 = 0.5 + (b.from - 0.5) * rh, x2 = lw + gap + 0.5 - 2.4, y2 = 0.5 + (b.to - 0.5) * rh, a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  o += `<path d="M${f(x1)} ${f(y1)}L${f(x2 - 1.2 * Math.cos(a * Math.PI / 180))} ${f(y2 - 1.2 * Math.sin(a * Math.PI / 180))}" stroke="${INK}" stroke-width=".45"/>` + head(x2, y2, a, 2, INK);
  return svg(W, H, o);
}

// ── p49 ──
const notes = (b, ctx, page) => `<div class="c3p037-notes">${Array.from({ length: b.cards || 4 }, () => `<div class="card">${Array.from({ length: b.per || 2 }, () =>
  `<div class="nt">${ctx.blockHtml({ kind: "p011_money", rows: [[10]], w: b.w || 30 }, page)}<span>দশ টাকা</span></div>`).join("")}</div>`).join("")}</div>`;
function x10(b, ctx) {
  const W = 64, H = 40, y1 = 8.2, y2 = 34.2, xa = 22, xb = 44;
  let o = `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="6" fill="#FEF08A" stroke="#EAB308" stroke-width=".5"/>`;
  o += T(xa, y1, "২", 5.4) + T(33, y1, "× ৪ =", 5.4) + T(xb, y1, "৮", 5.4);
  o += T(xa - 1, y2, "২০", 5.4) + T(31.4, y2, "× ৪ =", 5.4) + `<rect x="${xb - 4.6}" y="${y2 - 6}" width="9.2" height="8" rx="1.6" fill="#fff" stroke="#F59E0B" stroke-width=".55"/>`;
  for (const x of [xa, xb]) o += `<path d="M${x} ${y1 + 3}V${y2 - 9.5}" stroke="#DC2626" stroke-width=".9"/>` + head(x, y2 - 7.6, 90, 2.4, "#DC2626");
  o += T(xa - 10, 22.4, "১০ গুণ", 4.2, INK, { w: 700 }) + T(xb + 10.4, 22.4, "১০ গুণ", 4.2, INK, { w: 700 });
  return svg(W, H, o);
}
const tens = (b) => `<div class="c3p037-tens">${Array.from({ length: b.cards || 5 }, () => `<div class="card">${Array.from({ length: b.per || 3 }, () => `<span>১০</span>`).join("")}</div>`).join("")}</div>`;
const gbox = (b, ctx) => `<div class="c3p037-gbox">${b.rows.map(([l, r]) => `<span class="l">${ctx.md(l)}</span><span class="r">${ctx.md(r)}</span>`).join("")}</div>`;

// ── p50 ──
function tape(b, ctx) {
  const x0 = 22, bw = 30, n = 3, yB = 24, bh = 7, yN = 36, W = 172, H = 44;
  let o = "";
  // the price box and the big brace over the three packets
  o += `<rect x="${x0 + bw * 1.5 - 12}" y=".5" width="24" height="7.6" fill="#fff" stroke="${INK}" stroke-width=".4"/>` + T(x0 + bw * 1.5, 5.9, "টাকা", 4.6, INK, { w: 700 });
  o += `<path d="${braceH(x0, x0 + n * bw, 9.2, 3.2, -1)}" fill="none" stroke="${INK}" stroke-width=".45"/>`;
  // faint squared paper under the bars, as in the book
  for (let x = x0; x <= x0 + n * bw + 10; x += 2.5) o += `<path d="M${f(x)} ${yB - 1}V${yN}" stroke="#E2E8F0" stroke-width=".25"/>`;
  for (let y = yB - 1; y <= yN; y += 2.5) o += `<path d="M${x0} ${f(y)}H${x0 + n * bw + 10}" stroke="#E2E8F0" stroke-width=".25"/>`;
  const shades = ["#3B82F6", "#60A5FA", "#93C5FD"];
  for (let i = 0; i < n; i++) {
    const x = x0 + i * bw;
    o += `<path d="${braceH(x + 0.6, x + bw - 0.6, 19.6, 2.4, -1)}" fill="none" stroke="${INK}" stroke-width=".4"/>` + T(x + bw / 2, 18.4, "২৩", 4.4);
    o += `<rect x="${x}" y="${yB}" width="${bw}" height="${bh}" rx="1.2" fill="${shades[i]}" stroke="#1E40AF" stroke-width=".4"/>`;
  }
  o += `<path d="M${x0 - 2} ${yN}H${x0 + n * bw + 14}" stroke="${INK}" stroke-width=".55"/>`;
  for (let i = 0; i <= n; i++) o += `<path d="M${x0 + i * bw} ${yN - 2.2}V${yN + 1.4}" stroke="${INK}" stroke-width=".55"/>` + T(x0 + i * bw, yN + 6.2, ctx.bn(i), 4.4);
  for (let i = 0; i < n; i++) for (let k = 1; k < 10; k++) o += `<path d="M${f(x0 + i * bw + k * bw / 10)} ${yN - 1}V${yN}" stroke="${INK}" stroke-width=".3"/>`;
  o += T(x0 + n * bw + 16, yN + 1.6, "(বিস্কুটের প্যাকেট)", 4.4, INK, { w: 600, anchor: "start" });
  return svg(W, H, o);
}
const weq = (b, ctx) => `<div class="c3p037-weq">${b.top.map((t, i) => i % 2 ? `<span class="op">${ctx.esc(t)}</span>` : `<span class="wb">${ctx.md(t)}</span>`).join("")}
  ${b.top.map((t, i) => i % 2 ? "<span></span>" : `<span class="up"><svg viewBox="0 0 10 10" width="6mm" height="6mm"><path d="M5 .5L9.4 5H6.7V9.5H3.3V5H.6Z" fill="${INK}"/></svg></span>`).join("")}
  ${b.bottom.map((t, i) => i % 2 ? `<span class="op">${ctx.esc(t)}</span>` : `<span class="tp t${i / 2}">${ctx.md(t)}</span>`).join("")}</div>`;
function pvc(b, ctx) {
  const x0 = 1, cw = 32, hh = 7.4, rh = 9, rows = 3, y0 = 0.5, W = 96, H = 52;
  const yb = y0 + hh, ye = yb + rows * rh + 2;
  let o = `<rect x="${x0}" y="${y0}" width="${2 * cw}" height="${hh}" rx="1.4" fill="#FDBA74"/>` + `<rect x="${x0}" y="${yb}" width="${2 * cw}" height="${ye - yb}" fill="#F5F0DC"/>`;
  o += T(x0 + cw / 2, y0 + 5.3, "দশক", 4.4, "#7C2D12", { w: 700 }) + T(x0 + cw * 1.5, y0 + 5.3, "একক", 4.4, "#7C2D12", { w: 700 });
  o += `<path d="M${x0 + cw} ${y0 + 0.8}V${y0 + hh - 0.8}" stroke="#7C2D12" stroke-width=".45"/>`;
  for (let i = 0; i < rows; i++) {
    const y = yb + 1 + i * rh + rh / 2;
    o += `<ellipse cx="${x0 + cw / 2}" cy="${f(y)}" rx="11.5" ry="3.6" fill="#DCFCE7" stroke="#16A34A" stroke-width=".5"/>` + T(x0 + cw / 2 - 5, y + 1.5, "১০", 4.2) + T(x0 + cw / 2 + 5, y + 1.5, "১০", 4.2);
    o += `<ellipse cx="${x0 + cw * 1.5}" cy="${f(y)}" rx="11.5" ry="3.6" fill="#FEF9C3" stroke="#16A34A" stroke-width=".5"/>` + [-6, 0, 6].map((d) => T(x0 + cw * 1.5 + d, y + 1.5, "১", 4.2)).join("");
    o += `<path d="M${x0 + cw} ${f(y - 2.6)}V${f(y + 2.6)}" stroke="${INK}" stroke-width=".45"/>`;
  }
  o += `<path d="${braceV(yb + 0.6, ye - 0.6, x0 + 2 * cw + 4.2, 3)}" fill="none" stroke="${INK}" stroke-width=".45"/>` + T(x0 + 2 * cw + 5.4, (yb + ye) / 2 + 1.6, "২৩ × ৩", 4.4, INK, { anchor: "start" });
  o += `<path d="${braceH(x0 + 0.6, x0 + cw - 0.8, ye + 3.6, 3, 1)}" fill="none" stroke="${INK}" stroke-width=".45"/><path d="${braceH(x0 + cw + 0.8, x0 + 2 * cw - 0.6, ye + 3.6, 3, 1)}" fill="none" stroke="${INK}" stroke-width=".45"/>`;
  o += T(x0 + cw / 2, ye + 9.8, "২০ × ৩", 4.4) + T(x0 + cw * 1.5, ye + 9.8, "৩ × ৩", 4.4);
  return svg(W, ye + 11.4, o);
}

module.exports = {
  kinds: {
    c3p037_terms: terms,
    c3p037_rel: rel,
    // a wrapper, so that this file's CSS can reach a Class 2 kind inside it without touching other pages
    c3p037_box: (b, ctx, page) => `<div class="c3p037-${b.cls}">${(b.body || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
    c3p037_mk: (b, ctx) => `<div class="ext wm c3p037-mk">${ctx.exMark(b.mark, b.n)}<span>${ctx.md(b.text)}</span></div>`,
    c3p037_flow: flow,
    c3p037_ledger: ledger,
    c3p037_bar: bar,
    c3p037_maker: maker,
    c3p037_mcq: mcq,
    c3p037_qs: qs,
    c3p037_star: (b) => `<div class="c3p037-c">${star(b)}</div>`,
    c3p037_diam: (b) => `<div class="c3p037-c">${diam(b)}</div>`,
    c3p037_mtab: mtab,
    c3p037_rowtab: (b, ctx) => `<div class="c3p037-c">${rowtab(b, ctx)}</div>`,
    c3p037_say: sayPlus,
    c3p037_steps: steps,
    c3p037_tree: tree,
    c3p037_split: split,
    c3p037_lgrid: (b, ctx) => `<div class="c3p037-c">${lgrid(b, ctx)}</div>`,
    c3p037_two: (b, ctx) => `<div class="c3p037-c">${two(b, ctx)}</div>`,
    c3p037_match: (b, ctx) => `<div class="c3p037-c">${match(b, ctx)}</div>`,
    c3p037_notes: notes,
    c3p037_x10: (b, ctx) => `<div class="c3p037-c">${x10(b, ctx)}</div>`,
    c3p037_tens: tens,
    c3p037_gbox: gbox,
    c3p037_tape: (b, ctx) => `<div class="c3p037-c">${tape(b, ctx)}</div>`,
    c3p037_weq: weq,
    c3p037_pvc: (b, ctx) => `<div class="c3p037-c">${pvc(b, ctx)}</div>`,
    // a face in a ring, as decoration (the book's head of রাফি beside a picture)
    c3p037_face: (b, ctx) => { const p = ctx.picFile(`face-${b.who}-${b.mood || "talk"}`); return `<span class="c3p037-face" style="--w:${ctx.WHO[b.who]};width:${b.size || 16}mm;height:${b.size || 16}mm">${p ? `<img src="file://${p.file}">` : ""}</span>`; },
  },
  css: `
.c3p037-svg { display: block; overflow: visible } .c3p037-c { display: flex; justify-content: center }
svg.c3p037-arr { width: 13mm; height: 3.5mm; flex: none }
/* p37: the terms, each in its own colour */
.c3p037-term { display: inline-flex; align-items: center; justify-content: center; font: 700 12.5pt/1 'Baloo Da 2'; padding: 1.5mm 3mm .9mm; border-radius: 2mm; border: .5mm solid; background: #fff; white-space: nowrap }
.c3p037-term.t-o { color: #9A3412; border-color: #EA580C; background: #FFEDD5 } .c3p037-term.t-b { color: #1E40AF; border-color: #3B82F6; background: #DBEAFE } .c3p037-term.t-g { color: #166534; border-color: #16A34A; background: #DCFCE7 }
.c3p037-terms { display: grid; grid-template-columns: auto auto auto; gap: 1.2mm 2.4mm; align-items: center; justify-items: start; background: #E5E7EB; border-radius: 4mm; padding: 2mm 4.4mm; box-shadow: 0 1mm 0 #CBD5E1 }
.c3p037-terms .c3p037-term { padding: 1.2mm 2.8mm .7mm }
.c3p037-terms .n { font: 800 13pt/1 'Baloo Da 2'; justify-self: end; padding-top: .8mm }
.c3p037-rel { display: grid; grid-template-columns: auto 7mm auto 7mm auto; gap: 1.5mm 2mm; align-items: center; justify-items: stretch; align-self: center; background: #fff; border: .6mm solid var(--c); border-radius: 4mm; padding: 2.2mm 6mm; box-shadow: 0 1.2mm 0 var(--s) }
.c3p037-rel .op { font: 800 15pt/1 'Baloo Da 2'; text-align: center; color: var(--d) }
/* p38 */
.c3p037-mk { padding-right: 2mm }
.c3p037-flow { display: flex; align-items: center; justify-content: center; gap: 6mm }
.c3p037-flow .p040-cs tr.an td:not(.op) { background: #FFFBEB; box-shadow: inset 0 -.5mm 0 #F59E0B, inset 0 .5mm 0 #F59E0B }
.c3p037-ledger { border-collapse: collapse; font: 600 12pt/1.3 'Noto Sans Bengali'; align-self: flex-start }
.c3p037-ledger td { padding: 1.1mm 1.6mm } .c3p037-ledger td.v { text-align: right; font: 800 13pt 'Baloo Da 2'; white-space: nowrap; padding-left: 6mm } .c3p037-ledger td.u { padding-left: 0 }
.c3p037-ledger tr.rule td { border-bottom: .5mm solid ${INK} } .c3p037-ledger .abox { width: 17mm }
/* p39 */
.c3p037-bar { display: flex; align-items: center; justify-content: center; gap: 4mm; align-self: center; background: #A5B4C8; border-radius: 1.5mm; padding: 1.8mm 6mm }
.c3p037-bar .bx { width: 18mm; height: 9mm; background: #fff; border-radius: 1mm } .c3p037-bar .op { width: 9mm; height: 7.4mm; background: #fff; border-radius: 1mm; text-align: center; font: 800 14pt/7.8mm 'Baloo Da 2' }
.c3p037-maker { display: flex; flex-direction: column; border-top: .45mm solid #64748B }
.c3p037-maker .mr { display: grid; align-items: center; border-bottom: .45mm solid #64748B; padding: 1.2mm 0 }
.c3p037-maker .mt { display: flex; flex-direction: column; gap: 2mm; font: 500 11.5pt/1.45 'Noto Sans Bengali' }
.c3p037-maker .st { display: grid; grid-template-columns: 17mm 1fr; align-items: start } .c3p037-maker .st b { font: 700 11.5pt/1.45 'Noto Sans Bengali'; white-space: nowrap } .c3p037-maker .st b.kha { padding-left: 7mm }
.c3p037-maker .lns { display: flex; flex-direction: column; gap: 5.6mm; padding-top: 5.2mm } .c3p037-maker .ln { display: block; height: 0; border-bottom: .45mm dashed #94A3B8 }
/* p40: sixteen sums in columns, bottoms in line as in the book, narrower cells */
.c3p037-cs .p040-css { align-items: end; justify-content: space-between; gap: 3mm 2mm } .c3p037-cs .p040-cs td { width: 1.02em; padding: 0 .04em; height: 1.3em; line-height: 1.3 } .c3p037-cs .p040-cs td.op { width: .8em }
.c3p037-cs .p040-mk { font-size: 11.5pt }
/* p40–41 */
.c3p037-mcq { display: flex; flex-direction: column; gap: 2.2mm } .c3p037-mcq .q { display: flex; gap: 1.6mm; font: 500 12.5pt/1.5 'Noto Sans Bengali' } .c3p037-mcq .q b { color: #1D4ED8; font: 800 12.5pt/1.5 'Baloo Da 2' }
.c3p037-mcq .opts { display: grid; gap: 1.2mm 4mm; padding-left: 8mm; margin-top: .8mm } .c3p037-mcq .opt { display: flex; align-items: center; gap: 1.4mm; font: 500 12pt/1.4 'Noto Sans Bengali'; white-space: nowrap }
.c3p037-mcq .opt b { flex: none; display: inline-flex; align-items: center; justify-content: center; min-width: 8.6mm; height: 6.2mm; padding-top: .5mm; border-radius: 99px; background: #fff; border: .45mm solid #93C5FD; color: #1D4ED8; font: 700 10.5pt/1 'Baloo Da 2' }
.c3p037-mcq .abox { width: 7mm; height: 6mm; vertical-align: -1.4mm; margin: 0 .3mm }
.c3p037-qs { display: flex; flex-direction: column; gap: 1.5mm; background: #F0F7FF; border: .5mm dashed #93C5FD; border-radius: 4mm; padding: 2.2mm 3.2mm 2.4mm }
.c3p037-qs .qq { display: grid; grid-template-columns: 10mm 1fr; align-items: start; font: 500 11.6pt/1.42 'Noto Sans Bengali' }
.c3p037-qs .xm { width: 7.8mm; height: 7.8mm } .c3p037-qs .xm b { font-size: 11pt }
/* the times-table grid */
.c3p037-mt { display: flex; flex-direction: column; align-items: center; gap: 1.6mm }
.c3p037-mt .mtop { padding-left: 10mm } .c3p037-mt .mrow { display: flex; align-items: center; gap: 2mm }
.c3p037-mt .pill { font: 800 12pt/1 'Baloo Da 2'; border-radius: 2.4mm; border: .5mm solid; padding: 1.6mm 6mm 1mm; box-shadow: 0 .7mm 0 rgba(0,0,0,.12) }
.c3p037-mt .pill.gk { background: #DBEAFE; border-color: #2563EB; color: #1E40AF } .c3p037-mt .pill.gy { background: #DCFCE7; border-color: #16A34A; color: #166534; padding: 13mm 1.6mm 12.4mm }
.c3p037-mt table { border-collapse: collapse; font-family: 'Baloo Da 2'; font-weight: 700; border: .6mm solid ${INK} }
.c3p037-mt th, .c3p037-mt td { width: var(--cw); text-align: center; border: .3mm solid #475569; padding: .5mm 0 0 }
.c3p037-mt th.top { background: #DBEAFE; color: #1E40AF; font-weight: 800 } .c3p037-mt th.side { background: #DCFCE7; color: #166534; font-weight: 800 } .c3p037-mt th.corner { background: #fff }
.c3p037-mt td { background: #fff } .c3p037-mt tr:nth-child(odd) td { background: #FFFDF5 }
.c3p037-mt td.bl { background: #fff !important; box-shadow: inset 0 0 0 .7mm #F59E0B } .c3p037-mt td.em { background: #fff !important }
/* speech with blocks inside, the steps, the tree */
.c3p037-sbx { display: flex; flex-direction: column; gap: 1.6mm; margin-top: 1.2mm }
.c3p037-steps { display: grid; grid-template-columns: auto 7mm auto; column-gap: 2mm; align-items: center; font: 700 12.5pt/1 'Baloo Da 2' }
.c3p037-steps .arcs { grid-column: 2; display: block } .c3p037-steps .eq { grid-column: 1; white-space: nowrap } .c3p037-steps .nt { grid-column: 3; white-space: nowrap; position: relative; font: 600 11.5pt/1 'Noto Sans Bengali' }
.c3p037-steps .abox { width: 9mm; height: 7mm; vertical-align: -2mm }
.c3p037-tree { display: inline-grid; grid-template-columns: auto 11mm auto; grid-template-rows: auto auto; column-gap: 1.6mm; align-items: center; align-self: flex-start; font: 700 13pt/1 'Baloo Da 2' }
.c3p037-tree .l { grid-row: 1; white-space: nowrap } .c3p037-tree .fork { grid-row: 1; width: 11mm; height: 100%; display: block }
.c3p037-tree .r { grid-row: 1; display: flex; flex-direction: column; gap: 2.6mm; white-space: nowrap }
.c3p037-tree .tot { grid-row: 2; grid-column: 2 / 4; display: flex; justify-content: space-between; align-items: center; gap: 8mm; border-top: .5mm solid ${INK}; margin-top: 1.6mm; padding-top: 1.2mm; font: 600 12pt/1 'Noto Sans Bengali'; white-space: nowrap }
.c3p037-tree .tot span:last-child { font: 700 13pt/1 'Baloo Da 2' } .c3p037-tree .abox { width: 10mm; height: 7mm; vertical-align: -2mm }
.c3p037-split { position: relative; flex: none } .c3p037-split .lab { position: absolute; transform: translateY(-50%); font: 700 13pt/1 'Baloo Da 2'; white-space: nowrap } .c3p037-split .lab .abox { width: 10mm; height: 7.4mm; vertical-align: -2.2mm }
.c3p037-face { display: block; flex: none; border-radius: 50%; overflow: hidden; background: #fff; border: .7mm solid #fff; box-shadow: 0 0 0 .6mm var(--w) } .c3p037-face img { width: 100%; height: 100%; object-fit: cover; display: block }
/* p49 */
.c3p037-notes { display: flex; justify-content: space-between; gap: 3mm }
.c3p037-notes .card { display: flex; flex-direction: column; gap: 1.2mm; padding: 2mm 2.4mm; background: #fff; border: .6mm solid ${INK}; border-radius: 4mm; box-shadow: 0 1mm 0 var(--s) }
.c3p037-notes .nt { display: flex; flex-direction: column; align-items: center } .c3p037-notes .nt span { font: 700 11pt/1.2 'Baloo Da 2'; margin-top: .4mm }
.c3p037-tens { display: flex; justify-content: center; gap: 4mm }
.c3p037-tens .card { display: flex; flex-direction: column; gap: 2mm; padding: 2.4mm; background: #fff; border: .5mm solid ${INK}; border-radius: 2.6mm; box-shadow: 0 .8mm 0 var(--s) }
.c3p037-tens .card span { width: 22mm; height: 8mm; display: flex; align-items: center; justify-content: center; background: #A7D7A0; border: .35mm solid #4D7C0F; border-radius: 1mm; font: 800 12.5pt/1 'Baloo Da 2'; color: #14532D; padding-top: .6mm }
.c3p037-gbox { display: grid; grid-template-columns: auto auto; gap: 2.4mm 2mm; align-items: center; align-self: center; background: #A7D7A0; border: .5mm solid #4D7C0F; padding: 3mm 6mm; border-radius: 1.4mm; font: 800 14pt/1 'Baloo Da 2' }
.c3p037-gbox .abox { width: 22mm; height: 8.6mm; background: #fff; border-color: #fff; margin: 0 } .c3p037-gbox .l { text-align: right }
/* p50 */
.c3p037-weq { display: grid; grid-template-columns: 44mm 9mm 44mm 9mm 36mm; align-items: center; justify-items: center; justify-content: center; row-gap: 1mm }
.c3p037-weq .wb { width: 100%; height: 13mm; display: flex; align-items: center; justify-content: center; border: .45mm solid ${INK}; background: #fff; font: 600 11.5pt/1.2 'Noto Sans Bengali'; text-align: center }
.c3p037-weq .op { font: 800 14pt/1 'Baloo Da 2' } .c3p037-weq .up svg { display: block }
.c3p037-weq .tp { width: 100%; padding: 2.2mm 0 1.6mm; text-align: center; font: 700 12pt/1 'Baloo Da 2' } .c3p037-weq .tp.t0 { background: #DBEAFE } .c3p037-weq .tp.t1 { background: #DCFCE7 } .c3p037-weq .tp.t2 { background: #FBCFE8 }
`,
};
