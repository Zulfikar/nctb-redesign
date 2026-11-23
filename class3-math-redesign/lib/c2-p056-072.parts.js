// Own kinds for printed pages 56–72 (যোগ (২) with three-digit sums, বিয়োগ (২), যোগ ও বিয়োগ সংক্রান্ত সমস্যা).
// Chapter 2 looks the same throughout: these pages reuse p040-055.parts.js's kinds (p040_cs column sums, p040_hs sums in a
// line, p040_pv blocks, p040_tri ▲ prompts) and its CSS classes. Only what those lack is here:
//   p056_col     a column sum in p040_cs's look, plus what p67 needs: struck digits ("৪/") under a borrowing row on top
//                (top: ["", "৩", "১১"]); cells: "_" empty, "□" a box, "৫{১০}" a small number beside a digit
//   p056_ct      a column sum (p056_col) with its explaining words beside it (stack: under it)
//   p056_steps   p040_pv's step diagram with three places (শতক | দশক | একক) and hundred flats (pp. 57, 65)
//   p056_pvt     the little place-value tables side by side: [শ দ এ] + [শ দ এ] = [শ দ এ], and the step's words (pp. 58, 61)
//   p056_paper   p56's stacks of ten sheets (p040_papers' look) and the short stacks of ৩ and ৪
//   p056_books   p64's bundles of ten books (p040_books' look): seven stay, five go in the dashed arrow
//   p056_tx      a line of text with two more marks: ▭ a wide answer box, ◻ a small box for one digit or a sign
//   p056_sums    sums in a line (p040_hs's look) with those marks
//   p056_grid    blocks in a grid of columns
//   p056_list    numbered word problems (with (ক) (খ) parts and pictures inside)
//   p056_explain a box of explaining lines, one under another;  p056_chips  statements in small boxes, side by side
//   p060_trees, p060_zig, p060_cross   p60's puzzles (number trees, the +৫ zigzag, the cross sums)
//   p069_flow    p69's village box with the arrows of who came and who left
//   p070_bars    p70's bar chart of admissions; p070_pots the two water pots
//   p071_tape    p71's tape of nine numbers with the sums bracketed
//   p072_prices  p72's price list with the fruits' stickers
const GREEN = "#16A34A", RING = "#DB2777", RED = "#DC2626", INK = "#1E2433";

// ── small helpers ──
const mdx = (ctx, s) => ctx.md(s).replace(/▭/g, `<span class="p056-wb"></span>`).replace(/◻/g, `<span class="p056-ob"></span>`);
const HEAD = (id, col) => `<defs><marker id="${id}" viewBox="0 0 6 6" refX="3" refY="3" markerUnits="userSpaceOnUse" markerWidth="2.8" markerHeight="2.8" orient="auto-start-reverse"><path d="M0 0L6 3L0 6Z" fill="${col}"/></marker></defs>`;

// ── a sum in columns, in p040_cs's look ──
/** A row: "+১৪৫" or "_৫{১০}" or "২৪/১/" (an optional sign, then one cell per place); or an array ["+", "২", "৬{+১}", "৭"]. */
function parseRow(r) {
  if (Array.isArray(r)) return { op: r[0] === "-" ? "−" : r[0], cells: r.slice(1) };
  const m = String(r).match(/^\s*([+\-−]?)\s*(.*)$/);
  return { op: m[1] === "-" ? "−" : m[1], cells: m[2].replace(/\s+/g, "").match(/_|□|[^_{}\/](\{[^}]*\})?\/?/g) || [] };
}
function cellHtml(ctx, c) {
  if (!c || c === "_") return "";
  if (c === "□") return `<i class="p040-wb"></i>`;
  if (c.endsWith("/")) return `<span class="p056-x">${cellHtml(ctx, c.slice(0, -1))}</span>`;
  const m = c.match(/^(.)\{(.*)\}$/);
  return m ? `${ctx.esc(m[1])}<sup>${ctx.esc(m[2])}</sup>` : ctx.esc(c);
}
function colHtml(ctx, { rows, ans, heads, top, box, div = "dash", n, size = 15, compact, width: wmin = 0 }) {
  const R = rows.map(parseRow), A = ans == null || ans === "" ? null : parseRow(ans).cells, T = top || null;
  const width = Math.max(...R.map((r) => r.cells.length), A ? A.length : 0, heads ? heads.length : 0, T ? T.length : 0, wmin);
  const pad = (a) => Array(Math.max(0, width - a.length)).fill("_").concat(a);
  const tds = (a) => pad(a).map((c, i) => `<td class="d${i ? " dv" : ""}">${cellHtml(ctx, c)}</td>`).join("");
  let h = "";
  if (heads) h += `<tr class="hd"><td class="op"></td>${pad(heads).map((x, i) => `<td class="h${i ? " dv" : ""}">${ctx.esc(x === "_" ? "" : x)}</td>`).join("")}</tr>`;
  if (T) h += `<tr class="cy"><td class="op"></td>${tds(T)}</tr>`;
  R.forEach((r, i) => { h += `<tr${i === R.length - 1 ? ` class="ln"` : ""}><td class="op">${ctx.esc(r.op)}</td>${tds(r.cells)}</tr>`; });
  if (A) h += `<tr class="an"><td class="op"></td>${tds(A)}</tr>`;
  else if (ans === "") h += `<tr class="an"><td class="op"></td>${tds(Array(width).fill("□"))}</tr>`;
  const table = `<table class="p040-cs ${div}${compact ? " compact" : ""}" style="font-size:${size}pt">${h}</table>`;
  return `<div class="p040-csi">${n ? `<b class="p040-mk">${ctx.esc(n)}</b>` : ""}${box ? `<div class="p040-box ${box}">${table}</div>` : table}</div>`;
}

// ── base-ten blocks for the শতক | দশক | একক steps (p040_pv's colours: the base colour; yellow = moved here) ──
const downArrow = (hmm, wmm = 4.2) => `<svg width="${wmm}mm" height="${hmm.toFixed(1)}mm" viewBox="0 0 ${wmm} ${hmm.toFixed(2)}"><path d="M${wmm * .32} 0H${wmm * .68}V${(hmm - wmm * .62).toFixed(2)}H${wmm}L${wmm / 2} ${hmm.toFixed(2)}L0 ${(hmm - wmm * .62).toFixed(2)}H${wmm * .32}Z" fill="${GREEN}"/></svg>`;
function crossSvg(x, y, s, k) { // a red stroke across each of k cubes from (x, y) down
  let d = "";
  for (let i = 0; i < k; i++) d += `M${(x + s * .14).toFixed(2)} ${(y + i * s + s * .14).toFixed(2)}L${(x + s * .86).toFixed(2)} ${(y + i * s + s * .86).toFixed(2)}`;
  return `<path d="${d}" stroke="${RED}" stroke-width="${(s * .13).toFixed(2)}" stroke-linecap="round"/>`;
}
const svgBox = (w, h, inner) => `<svg class="p040-bk" width="${w.toFixed(2)}mm" height="${h.toFixed(2)}mm" viewBox="-0.3 -0.3 ${(w + .6).toFixed(2)} ${(h + .6).toFixed(2)}">${inner}</svg>`;
function rodsSvg(ctx, n, s, c, pack, cross) {
  const dx = s * .36, g = pack ? s * .18 : s * .55, top = dx + .3;
  let out = "";
  for (let i = 0; i < n; i++) { const x = i * (s + g); out += ctx.rod(x, top, s, c); if (i >= n - cross) out += crossSvg(x, top, s, 10); }
  return svgBox(n * s + (n - 1) * g + dx, top + 10 * s + .3, out);
}
function cubesSvg(ctx, n, s, c, cross) { // a column; the top `cross` cubes crossed out
  const dx = s * .36, top = dx + .3;
  let out = "";
  for (let i = n - 1; i >= 0; i--) { const y = top + i * s; out += ctx.cube(0, y, s, c); if (i < cross) out += crossSvg(0, y, s, 1); }
  return svgBox(s + dx, top + n * s + .3, out);
}
/** A curved arrow: "left" comes in from the right and drops to the left (into this place); "right" leaves to the right. */
const moveSvg = (dir) => `<svg class="p056-move" width="11mm" height="9mm" viewBox="0 0 11 9" style="overflow:visible"><path d="${dir === "left" ? "M10.4 1.2C6.4 1 2.8 2.6 2.4 6.2" : "M.6 6.2C1.2 2.6 4.6 1 8.6 1.2"}" fill="none" stroke="${INK}" stroke-width=".75" stroke-linecap="round"/>
  <path d="${dir === "left" ? "M.6 5.4L2.4 8.8L4.4 5.6Z" : "M8 -.4L10.8 1.3L8 3Z"}" fill="${INK}"/></svg>`;
function itemHtml(ctx, it, s, base) {
  const c = ctx.BLOCK[it.hi ? "yellow" : it.color || base];
  const wrap = (svg) => `<span class="p056-it${it.ring ? " ring" : ""}">${svg}</span>`;
  if (it.flat) return wrap(ctx.flatsSvg(1, s, it.hi ? "yellow" : it.color || base));
  if (it.rods != null) return wrap(rodsSvg(ctx, it.rods, s, c, it.pack, it.cross || 0));
  if (it.cubes != null) return wrap(cubesSvg(ctx, it.cubes, s, c, it.cross || 0));
  if (it.move) return `<span class="p056-it move">${moveSvg(it.move)}</span>`;
  throw new Error("p056: unknown item " + JSON.stringify(it));
}
/** p040_pv's grid with a শতক column: { heads, w: [h, t, o] mm, s, color, steps: [{ rows: [{ h, t, o }], right: [blocks] }] };
 *  a place is [items] or "|" (the place passes down unchanged: a long green arrow). */
function stepsHtml(b, ctx, page) {
  const { heads = ["শতক", "দশক", "একক"], w = [40, 44, 13], s = 2.6, color = "blue", steps } = b;
  const rowH = 10 * s + s * .36 + 2.6, K = ["h", "t", "o"];
  let h = heads.map((x) => `<div class="p040-hd">${ctx.esc(x)}</div>`).join("") + `<div></div>`;
  steps.forEach((st, i) => {
    if (i) h += K.map(() => `<div class="p040-ar">${downArrow(4.6, 4.6)}</div>`).join("") + `<div></div>`;
    for (const k of K) {
      if (st.rows.every((r) => r[k] === "|")) { h += `<div class="p040-pass">${downArrow(rowH * st.rows.length * .8)}</div>`; continue; }
      h += `<div class="p040-card${i === 0 ? " top" : ""}">${st.rows.map((r) => `<div class="p040-r" style="min-height:${rowH.toFixed(1)}mm">${r[k] === "|" ? `<div class="p040-pass">${downArrow(rowH * .7)}</div>` : `<div class="p056-cell">${(r[k] || []).map((it) => itemHtml(ctx, it, s, color)).join("")}</div>`}</div>`).join("")}</div>`;
    }
    h += `<div class="p040-side">${(st.right || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>`;
  });
  return `<div class="p040-pv wide p056-steps" style="grid-template-columns:${w.map((x) => x + "mm").join(" ")} 1fr">${h}</div>`;
}

// ── p56: stacks of ten sheets (p040_papers' look), labelled ১০, and the short stacks ──
function paperHtml(b, ctx) {
  const id = "p056pg", W = 10, H = 14.5, gx = 15.5, gy = 19;
  const sheet = (x, y) => `<rect x="${x}" y="${y}" width="${W}" height="${H}" rx=".4" fill="url(#${id})" stroke="#64748B" stroke-width=".3"/>`;
  const stack = (x, y, n) => { const layers = n >= 10 ? 6 : 2; let g = ""; for (let i = layers; i >= 1; i--) g += sheet(x + i * .45, y + i * .45);
    return g + sheet(x, y) + `<rect x="${x}" y="${y + 5.2}" width="${W}" height="3.4" fill="#1E3A8A"/><text x="${x + W / 2}" y="${y + 7.75}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="2.6" fill="#fff">${ctx.bn(n)}</text>`; };
  const one = (g) => {
    const ns = Array(g.n10).fill(10).concat(g.rest ? [g.rest] : []), per = g.perRow || 4, rows = Math.ceil(ns.length / per);
    let s = ""; ns.forEach((n, i) => { s += stack(1 + (i % per) * gx, 1 + Math.floor(i / per) * gy, n); });
    const w = Math.min(ns.length, per) * gx - gx + W + 4.5, h = rows * gy - gy + H + 4.5;
    return `<svg width="${w.toFixed(1)}mm" height="${h.toFixed(1)}mm" viewBox="0 0 ${w.toFixed(2)} ${h.toFixed(2)}">${s}</svg>`;
  };
  return `<div class="p056-paper"><svg width="0" height="0" style="position:absolute"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#BAE6FD"/></linearGradient></defs></svg>${b.groups.map(one).join("")}</div>`;
}
// ── p64: bundles of ten books (p040_books' look); the ones taken away inside a dashed arrow ──
function bookPile(x, y, bn) {
  let g = "";
  for (let i = 0; i < 4; i++) { const yy = y + 13 - i * 3.1, xx = x + (i % 2 ? .5 : 0);
    g += `<rect x="${xx}" y="${yy}" width="13" height="3" rx=".6" fill="#B91C1C" stroke="#7F1D1D" stroke-width=".3"/><rect x="${xx + 1.6}" y="${yy + .7}" width="10.8" height="1.6" fill="#FEF3C7"/><path d="M${xx + 1.6} ${yy + 1.5}h10.8" stroke="#E7D7A8" stroke-width=".25"/>`; }
  const ty = y + 13 - 3 * 3.1;
  g += `<path d="M${x + .5} ${ty}L${x + 3} ${ty - 3.4}H${x + 16}L${x + 13.5} ${ty}Z" fill="#EF4444" stroke="#7F1D1D" stroke-width=".3" stroke-linejoin="round"/>`;
  return g + `<text x="${x + 8.3}" y="${ty - .75}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="3.1" fill="#fff">${bn(10)}</text>`;
}
function booksHtml(b, ctx) {
  const k = b.scale || .8, P = 15, R = 20;
  const pile = (n, per) => { let g = ""; for (let i = 0; i < n; i++) g += bookPile(1 + (i % per) * P, 3 + Math.floor(i / per) * R, ctx.bn); return g; };
  const stay = () => { const per = b.perRow || 4, w = Math.min(b.stay, per) * P + 2.5, h = Math.ceil(b.stay / per) * R;
    return `<div class="p040-bookbox"><svg width="${(w * k).toFixed(1)}mm" height="${(h * k).toFixed(1)}mm" viewBox="0 0 ${w} ${h}">${pile(b.stay, per)}</svg></div>`; };
  const go = () => { const w0 = b.go * P + 2.5, pad = 3, hh = 5, head = 12, w = w0 + 2 * pad + head, h = R + 2 * pad + 2 * hh;
    const arrow = `<path d="M.4 ${hh + .4}H${w0 + 2 * pad}V.4L${w - .4} ${h / 2}L${w0 + 2 * pad} ${h - .4}V${h - hh - .4}H.4Z" fill="#FFF7ED" stroke="${INK}" stroke-width=".45" stroke-dasharray="1.6 1.1" stroke-linejoin="round"/>`;
    return `<svg width="${(w * k).toFixed(1)}mm" height="${(h * k).toFixed(1)}mm" viewBox="0 0 ${w} ${h}">${arrow}<g transform="translate(${pad} ${pad + hh - 1.5})">${pile(b.go, b.go)}</g></svg>`; };
  return `<div class="p056-books">${stay()}${go()}</div>`;
}

module.exports = {
  kinds: {
    p056_col: (b, ctx) => colHtml(ctx, b),
    p056_ct: (b, ctx) => `<div class="p056-ct${b.stack ? " st" : ""}">${colHtml(ctx, b)}<p class="tx${b.big ? " big" : ""}"${b.ts ? ` style="font-size:${b.ts}pt"` : ""}>${mdx(ctx, b.text)}</p></div>`,
    p056_steps: stepsHtml,
    p056_pvt: (b, ctx) => {
      const one = (p) => typeof p === "string" ? `<span class="p056-sign">${ctx.esc(p)}</span>`
        : `<table class="p056-pt tone-${p.tone || "blue"}${p.ans ? " ans" : ""}"><tr>${p.heads.map((h) => `<th>${ctx.esc(h)}</th>`).join("")}</tr><tr>${p.d.map((c) => `<td>${cellHtml(ctx, c)}</td>`).join("")}</tr></table>`;
      return `<div class="p056-pvt" style="font-size:${b.size || 14}pt">${b.parts.map(one).join("")}${b.text ? `<p class="p056-pvtx">${mdx(ctx, b.text)}</p>` : ""}</div>`;
    },
    p056_paper: paperHtml,
    p056_books: booksHtml,
    // a fat arrow between two steps (p67), as p040_arrow's solid one
    p056_icon: () => `<div class="p040-arw"><svg width="11mm" height="6.8mm" viewBox="0 0 11 6.82"><path d="M1 2.05H7.25V1L10 3.41L7.25 5.82V4.77H1Z" fill="${INK}" stroke="${INK}" stroke-width=".7" stroke-linejoin="round"/></svg></div>`,
    p056_tx: (b, ctx) => `<p class="tx${b.big ? " big" : ""}${b.center ? " center" : ""}" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}${b.bh ? `--bh:${b.bh}mm;line-height:1.5` : ""}">${mdx(ctx, b.text)}${b.box ? ` <span class="p056-wb" style="width:${b.box}mm"></span>` : ""}</p>`,
    p056_sums: (b, ctx) => `<div class="p040-hs p056-hs" style="grid-template-columns:repeat(${b.cols || 3}, 1fr);font-size:${b.size || 13.5}pt;${b.bw ? `--bw:${b.bw}mm` : ""}">${b.sums.map((x, i) => `<span><b class="p040-mk">${b.paren === false ? `${ctx.bn((b.start || 1) + i)})` : `(${ctx.bn((b.start || 1) + i)})`}</b>${mdx(ctx, x)}</span>`).join("")}</div>`,
    p056_grid: (b, ctx, page) => `<div class="p056-grid" style="grid-template-columns:${b.tpl || `repeat(${b.cols || 2}, 1fr)`};gap:${b.gap ?? 3}mm ${b.cgap ?? 5}mm;align-items:${b.align || "center"}">${b.items.map((x) => `<div class="p056-gi"${b.center ? ` style="align-items:center"` : ""}>${ctx.blockHtml(x, page)}</div>`).join("")}</div>`,
    p056_list: (b, ctx, page) => `<ol class="p056-list${b.items.some((it) => it.line) ? " lined" : ""}"${b.lh || b.pad ? ` style="${b.lh ? `--lh:${b.lh}mm;` : ""}${b.pad ? `--lp:${b.pad}mm` : ""}"` : ""}>${b.items.map((it) => `<li><span class="p056-ln">${ctx.esc(it.n)}</span><div class="p056-lt"><p>${mdx(ctx, it.t)}</p>${
      it.body ? `<div class="p056-lb">${it.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>` : ""}${
      it.subs ? `<div class="p056-subs">${it.subs.map((s) => { const m = s.match(/^(\([^)]+\))\s*(.*)$/s); return m ? `<p><b>${ctx.esc(m[1])}</b><span>${mdx(ctx, m[2])}</span></p>` : `<p><span>${mdx(ctx, s)}</span></p>`; }).join("")}</div>` : ""}${
      it.line ? `<i class="p056-wl"></i>` : ""}</div></li>`).join("")}</ol>`,
    p056_explain: (b, ctx) => `<div class="p056-explain${b.tone ? ` tone-${b.tone}` : ""}"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${b.lines.map((l) => `<p${b.center ? ` class="c"` : ""}>${mdx(ctx, l)}</p>`).join("")}</div>`,
    p056_chips: (b, ctx) => `<div class="p056-chips" style="justify-content:${b.justify || "flex-start"}">${b.chips.map((c) => `<span class="p056-chip tone-${b.tone || "green"}">${mdx(ctx, c)}</span>`).join("")}</div>`,

    // p60: a number on top, a stem and two branches, a number under each (the right one may be a box)
    p060_trees: (b, ctx) => `<div class="p060-trees">${b.trees.map(([t, l, r]) => `<svg width="${27 * (b.k || 1)}mm" height="${22 * (b.k || 1)}mm" viewBox="0 0 27 22">
      <text x="13.5" y="5" class="p060-n">${t}</text><path d="M13.5 6.6V10.6L5.6 15.4M13.5 10.6L21.4 15.4" stroke="${RING}" stroke-width=".55" fill="none" stroke-linecap="round"/>
      <text x="5.6" y="20.6" class="p060-n">${l}</text>${r === "□" ? `<rect x="17" y="16.6" width="9" height="5" rx=".8" fill="#FFFBEB" stroke="#F59E0B" stroke-width=".45"/>` : `<text x="21.4" y="20.6" class="p060-n">${r}</text>`}</svg>`).join("")}</div>`,
    // p60: the zigzag: the tops grow by the numbers at the bottom; the last top is the "?" box
    p060_zig: (b, ctx) => {
      const { tops, bottoms, k = 1 } = b, step = 19, x0 = 5, yT = 8.5, yB = 22;
      let pts = [], t = "";
      tops.forEach((n, i) => { const x = x0 + i * step; pts.push(`${x},${yT}`); if (i < bottoms.length) pts.push(`${x + step / 2},${yB}`);
        t += n === "?" ? `<rect x="${x - 4.2}" y=".4" width="8.4" height="6" rx=".8" fill="#FFFBEB" stroke="#F59E0B" stroke-width=".45"/><text x="${x}" y="5.2" class="p060-n">?</text>` : `<text x="${x}" y="5.6" class="p060-n">${n}</text>`; });
      bottoms.forEach((n, i) => { t += `<text x="${x0 + i * step + step / 2}" y="${yB + 5.6}" class="p060-n sm">${n}</text>`; });
      const W = x0 * 2 + (tops.length - 1) * step;
      return `<svg width="${W * k}mm" height="${30 * k}mm" viewBox="0 0 ${W} 30"><polyline points="${pts.join(" ")}" fill="none" stroke="${RING}" stroke-width=".55" stroke-linejoin="round"/>${t}</svg>`;
    },
    // p60: a cross of five boxes: the middle one is the sum of the four around it; the first has the green arrows
    p060_cross: (b, ctx) => `<div class="p060-crosses">${b.crosses.map(({ c, arrows: arr }) => {
      const S = 12, o = 6, cellR = (x, y, txt, mid) => `<rect x="${x}" y="${y}" width="${S}" height="${S}" fill="${mid ? "#FEF3C7" : "#fff"}" stroke="${INK}" stroke-width="${mid ? .7 : .35}"/><text x="${x + S / 2}" y="${y + S / 2 + 1.8}" class="p060-n">${txt}</text>`;
      const arrows = arr ? `${HEAD("p060-ah", GREEN)}${["M4.5 16.4C4.5 9 8 6.4 14.5 5.6", "M30.4 4.6C36 4.6 39.4 8 39.6 14.6", "M38.6 29.6C38.6 36 35 39.4 29.6 39.6", "M13.6 40C8 40 4.4 36 4.6 30.4"].map((d) => `<path d="${d}" fill="none" stroke="${GREEN}" stroke-width=".6" marker-end="url(#p060-ah)"/>`).join("")}` : "";
      return `<svg width="${44 * (b.k || 1)}mm" height="${44 * (b.k || 1)}mm" viewBox="0 0 44 44">${arrows}${cellR(o + S, o, c[0])}${cellR(o, o + S, c[1])}${cellR(o + 2 * S, o + S, c[3])}${cellR(o + S, o + 2 * S, c[4])}${cellR(o + S, o + S, c[2], true)}</svg>`;
    }).join("")}</div>`,

    // p69: the village and the two arrows
    p069_flow: (b, ctx) => {
      const arr = (txt, dir, fill, stroke) => `<div class="p069-arr"><svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="${dir === "in" ? "M.6 10L18 .6V5H99.4V15H18V19.4Z" : "M99.4 10L82 .6V5H.6V15H82V19.4Z"}" fill="${fill}" stroke="${stroke}" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg><span class="${dir}">${mdx(ctx, txt)}</span></div>`;
      return `<div class="p069-flow"><div class="p069-vil">${mdx(ctx, b.village)}</div><div class="p069-arrs">${arr(b.came, "in", "#FEF9C3", "#CA8A04")}${arr(b.left, "out", "#E0F2FE", "#0284C7")}</div></div>`;
    },
    // p70: a bar per year, its number on top, the year's name up the bar
    p070_bars: (b, ctx) => {
      const k = b.k || 0.13, bw = 11, gap = 7, x0 = 8, cols = ["#BAE6FD", "#93C5FD", "#FBCFE8"], ks = ["#0284C7", "#1D4ED8", RING];
      const base = Math.max(...b.bars.map((x) => x[0])) * k + 6;
      let s = "";
      b.bars.forEach(([v, name, label], i) => { const h = v * k, x = x0 + i * (bw + gap);
        s += `<rect x="${x}" y="${base - h}" width="${bw}" height="${h}" rx="1" fill="${cols[i]}" stroke="${ks[i]}" stroke-width=".4"/>
          <text x="${x + bw / 2}" y="${base - h - 1.6}" class="p070-v">${label}</text>
          <text transform="translate(${x + bw / 2 + 1.4} ${base - 1.4}) rotate(-90)" class="p070-y">${name}</text>`; });
      const W = x0 * 2 + b.bars.length * bw + (b.bars.length - 1) * gap;
      return `<div class="lcenter"><svg width="${W}mm" height="${base + 1.5}mm" viewBox="0 0 ${W} ${base + 1.5}">${s}<path d="M1 ${base}H${W - 1}" stroke="${INK}" stroke-width=".5"/></svg></div>`;
    },
    // p70: two pots of water: the amount above, the pot's name below
    p070_pots: (b, ctx) => `<div class="p070-pots">${b.pots.map(([top, name, w, fill, stroke]) => `<div class="p070-pot"><span>${ctx.esc(top)}</span>
      <svg width="${w * (b.k || 1)}mm" height="${19 * (b.k || 1)}mm" viewBox="0 0 ${w} 19"><path d="M.5 4.5V15A${w / 2 - .5} 3.4 0 0 0 ${w - .5} 15V4.5" fill="${fill}" stroke="${stroke}" stroke-width=".5"/>
      <ellipse cx="${w / 2}" cy="4.5" rx="${w / 2 - .5}" ry="3.4" fill="#fff" stroke="${stroke}" stroke-width=".5"/><ellipse cx="${w / 2}" cy="6.6" rx="${w / 2 - 2.4}" ry="2" fill="${fill}" opacity=".9"/></svg>
      <span>${ctx.esc(name)}</span></div>`).join("")}</div>`,
    // p71: nine places in a tape, ৩৬০ over all, brackets under the first four and the last four, "?" under the fifth
    p071_tape: (b, ctx) => {
      const n = b.cells.length, cw = 12.4, x0 = 4, y0 = 9, ch = 9, W = x0 * 2 + n * cw;
      let s = `${HEAD("p071-ah", "#1D4ED8")}<path d="M${x0 + 2} 4.4H${W - x0 - 2}" stroke="#1D4ED8" stroke-width=".55" marker-start="url(#p071-ah)" marker-end="url(#p071-ah)"/>
        <rect x="${W / 2 - 9}" y="0" width="18" height="8" fill="#fff"/><text x="${W / 2}" y="6.6" class="p071-t">${b.total}</text>`;
      b.cells.forEach((c, i) => { s += `<rect x="${x0 + i * cw}" y="${y0}" width="${cw}" height="${ch}" fill="${i === b.ask ? "#FEF3C7" : "#E0F2FE"}" stroke="${INK}" stroke-width=".45"/><text x="${x0 + i * cw + cw / 2}" y="${y0 + ch / 2 + 1.9}" class="p071-c">${c}</text>`; });
      const br = (a, z, lab) => { const xa = x0 + a * cw + cw * .3, xz = x0 + (z + 1) * cw - cw * .3; return `<path d="M${xa} ${y0 + ch + 1.6}V${y0 + ch + 4.2}H${xz}V${y0 + ch + 1.6}" fill="none" stroke="${RING}" stroke-width=".55"/><text x="${(xa + xz) / 2}" y="${y0 + ch + 11}" class="p071-t">${lab}</text>`; };
      s += br(b.left[0], b.left[1], b.left[2]) + br(b.right[0], b.right[1], b.right[2]);
      const xq = x0 + b.ask * cw + cw / 2;
      s += `<path d="M${xq} ${y0 + ch + 1.2}V${y0 + ch + 5.4}" stroke="#1D4ED8" stroke-width=".5" marker-end="url(#p071-ah)"/><text x="${xq}" y="${y0 + ch + 11}" class="p071-t">?</text>`;
      return `<div class="lcenter"><svg width="${W}mm" height="${y0 + ch + 13}mm" viewBox="0 0 ${W} ${y0 + ch + 13}">${s}</svg></div>`;
    },
    // p72: the fruit shop's price list; each fruit with its sticker
    p072_prices: (b, ctx) => `<table class="grid tone-blue p072-prices"${b.width ? ` style="width:${b.width}mm"` : ""}><thead><tr>${b.head.map((h, i) => `<th>${i && b.stickers[i - 1] ? `<span class="p072-fr">${ctx.objsHtml({ ...b.stickers[i - 1], n: 1, size: 9 })}</span>` : ""}${ctx.md(h)}</th>`).join("")}</tr></thead>
      <tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${ctx.md(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`,
  },
  css: `
.p056-wb { display: inline-block; width: var(--bw, 26mm); height: var(--bh, 8mm); vertical-align: -2.4mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
.p056-ob { display: inline-block; width: 6.4mm; height: var(--bh, 7.4mm); vertical-align: -2.4mm; border: .5mm solid #F59E0B; background: #FFFBEB; border-radius: 1.4mm; margin: 0 .5mm }
/* column sums: p040_cs's look; a struck digit */
.p056-x { position: relative; display: inline-block } .p056-x::after { content: ""; position: absolute; left: -16%; right: -16%; top: 47%; border-top: .6mm solid ${RED}; transform: rotate(-58deg) }
.p056-ct { display: flex; align-items: center; gap: 3mm } .p056-ct.st { flex-direction: column; align-items: flex-start; gap: 1.6mm } .p056-ct .tx { flex: 1; min-width: 0 } .p056-ct > .p040-csi { flex: none }
.p056-hs { gap: 2.4mm 3mm; padding-left: 2mm }
/* the little place-value tables */
.p056-pvt { display: flex; align-items: center; gap: 1.8mm }
.p056-sign { font: 800 1.1em 'Baloo Da 2'; color: ${RED} }
.p056-pt { border-collapse: separate; border-spacing: 0; border: .5mm solid var(--tc); border-radius: 2mm; overflow: hidden; background: #fff; flex: none }
.p056-pt th { background: var(--tc); color: #fff; font: 700 .68em/1.3 'Baloo Da 2'; padding: .7mm 1.4mm .3mm; border-left: .3mm solid rgba(255,255,255,.55) } .p056-pt th:first-child, .p056-pt td:first-child { border-left: 0 }
.p056-pt td { font: 800 1em/1.2 'Baloo Da 2'; text-align: center; height: 1.75em; min-width: 1.75em; padding: 0 .8mm; border-left: .3mm solid var(--tl); background: var(--tb) }
.p056-pt td sup { font-size: .5em; color: ${RED}; margin-left: .05em }
.p056-pt.ans td { color: #C2410C }
.p056-pvtx { flex: 1; font: 500 12pt/1.45 'Noto Sans Bengali'; padding-left: 2mm }
/* the step diagram (p040_pv's grid, with hundreds) */
.p056-cell { display: flex; align-items: flex-end; justify-content: center; gap: 1.3mm; width: 100% }
.p056-it { display: inline-flex; line-height: 0 } .p056-it.ring { outline: .45mm dashed ${RING}; outline-offset: .7mm; border-radius: 1mm } .p056-it.move { align-self: flex-start }
.p056-steps .p040-side .tx { font-size: 11.5pt; line-height: 1.42 }
/* paper stacks, book bundles */
.p056-paper { display: flex; justify-content: space-around; align-items: center; gap: 6mm; padding: 2.6mm 4mm; border: .7mm solid var(--c); border-radius: 4mm; background: #fff; box-shadow: 0 1.2mm 0 var(--s) }
.p056-books { display: flex; align-items: center; justify-content: center; gap: 6mm }
/* layout */
.p056-grid { display: grid } .p056-gi { min-width: 0; display: flex; flex-direction: column; gap: 2mm }
/* numbered word problems */
.p056-list { list-style: none; display: flex; flex-direction: column; background: #fff; border: .6mm solid var(--c); border-radius: 4mm; box-shadow: 0 1.2mm 0 var(--s); padding: .6mm 3.4mm }
.p056-list > li { display: grid; grid-template-columns: 9mm 1fr; align-items: start; padding: var(--lp, 1.7mm) 0 var(--lp, 1.6mm); border-top: .35mm dashed color-mix(in srgb, var(--c) 40%, #fff) } .p056-list > li:first-child { border-top: 0 }
.p056-list.lined > li { border-top: 0 }
.p056-ln { width: 6.6mm; height: 6.6mm; border-radius: 50%; background: var(--c); color: #fff; font: 800 10.5pt/7mm 'Baloo Da 2'; text-align: center; margin-top: .5mm }
.p056-lt { display: flex; flex-direction: column; gap: 1.2mm; font: 500 12pt/1.45 'Noto Sans Bengali' }
.p056-subs { display: flex; flex-direction: column; gap: .4mm; padding-left: 1mm } .p056-subs p { display: grid; grid-template-columns: 10mm 1fr } .p056-subs b { color: var(--d); font-weight: 700 }
.p056-lb { display: flex; flex-direction: column; gap: 2mm; padding: 1mm 0 }
.p056-wl { display: block; height: var(--lh, 6mm); border-bottom: .45mm dashed #CBD5E1; margin-right: 2mm }
.dense .p056-list > li { padding: 1.2mm 0 1.1mm } .dense .p056-lt { font-size: 11.8pt; line-height: 1.42 }
/* explaining lines, chips */
.p056-explain { border: .5mm solid var(--tc, var(--c)); border-radius: 3mm; background: var(--tb, #fff); overflow: hidden; font: 500 11pt/1.45 'Noto Sans Bengali' }
.p056-explain p { padding: 1.4mm 2.6mm 1.2mm; border-top: .35mm solid var(--tl, var(--s)) } .p056-explain p:first-child { border-top: 0 } .p056-explain p.c { text-align: center }
.p056-chips { display: flex; flex-wrap: wrap; gap: 2.4mm 3mm }
.p056-chip { display: inline-block; font: 600 12pt/1.4 'Noto Sans Bengali'; background: var(--tb); border: .5mm solid var(--tc); border-radius: 2.4mm; padding: 1mm 3.4mm .8mm; box-shadow: 0 .7mm 0 var(--tl); text-align: center }
/* p60 */
.p060-n { font-family: 'Baloo Da 2'; font-weight: 800; font-size: 4.6px; text-anchor: middle; fill: ${INK} } .p060-n.sm { font-size: 4.2px; fill: ${RING} }
.p060-trees { display: flex; gap: 3mm } .p060-crosses { display: flex; justify-content: space-around; align-items: center }
/* p69 */
.p069-flow { display: flex; align-items: center; gap: 6mm }
.p069-vil { flex: none; width: 70mm; text-align: center; font: 700 13pt/1.3 'Baloo Da 2'; background: #FCE7F3; border: .6mm solid ${RING}; border-radius: 3mm; padding: 5mm 3mm; box-shadow: 0 1mm 0 #FBCFE8 }
.p069-arrs { flex: 1; display: flex; flex-direction: column; gap: 3mm }
.p069-arr { position: relative; height: 13mm } .p069-arr svg { position: absolute; inset: 0; width: 100%; height: 100% }
.p069-arr span { position: absolute; top: 0; bottom: 0; padding-top: .9mm; display: flex; align-items: center; font: 700 12pt 'Baloo Da 2' } .p069-arr span.in { left: 20%; right: 2% } .p069-arr span.out { left: 4%; right: 20% }
/* p70 */
.p070-v { font-family: 'Baloo Da 2'; font-weight: 800; font-size: 3.6px; text-anchor: middle; fill: ${INK} } .p070-y { font-family: 'Noto Sans Bengali'; font-weight: 600; font-size: 3.1px; fill: ${INK} }
.p070-pots { display: flex; justify-content: center; gap: 18mm } .p070-pot { display: flex; flex-direction: column; align-items: center; gap: 1mm; font: 600 10.5pt 'Noto Sans Bengali' }
/* p71 */
.p071-t { font-family: 'Baloo Da 2'; font-weight: 800; font-size: 5px; text-anchor: middle; fill: ${INK} } .p071-c { font-family: 'Baloo Da 2'; font-weight: 800; font-size: 4.6px; text-anchor: middle; fill: ${INK} }
/* p72 */
.p072-prices { margin: 0 auto } .p072-prices th { vertical-align: bottom } .p072-fr { display: block; margin: 0 auto .6mm; width: fit-content; background: #fff; border-radius: 50%; padding: .6mm }
`,
};
