// Own kinds for printed pages 40–55 (chapter 2 · যোগ ও বিয়োগ). Every count is drawn by code.
//  p040_tri    the book's pink triangle prompts (▲১ …): { n?, text }
//  p040_cs     sums in columns, the book's way: { items: [item…], cols, size, gap, justify }
//              item: { mk: "১)", rows: ["৩৮", "+২৪"], ans: "৬২" | "" (empty boxes) | undefined (no row),
//                      carry: ["+১", "_"], heads: ["দশক", "একক"], div: "dash" | "solid", box: "blue" | "yellow", grid: true }
//              a row is a string: an optional sign, then one cell per digit; "_" is an empty cell, "৫{১০}" a digit with a small 10.
//  p040_hs     sums in a line with the book's "১)" marks: { items: ["৩৭ + ৫৩", …], start, cols, paren, size }
//  p040_pv     base-ten blocks in a দশক | একক table, in steps (with the column sum and the words beside each step):
//              { heads, color, s, w: [tens, ones, sum] mm, plain, steps: [{ rows: [{ t, o }], sum, side: [blocks] }] }
//              t = the rods, one letter each: o plain · x crossed out · h highlighted · m moved here (highlighted) ·
//                  g white (the number taken away) · r ringed · w white and ringed · q highlighted and ringed ·
//                  " " a gap · ">" an arrow out to the right; or "|" (a long arrow passing down) or { label }.
//              o = the ones: a number, or columns of letters from the top (o x h g q and y = highlighted, crossed), or "|".
//  p040_cards  p40's packs of cards (a star with ১০, ৩, ২ on each)
//  p040_papers p46's paper bundles and single sheets, with the dashed arrow round the 13 taken away
//  p040_books  p55's bundles of ten story books
//  p040_tape   p54's part–whole bars
//  p040_cross  p53's crossed arrows between ১১ − ৫ = ৬ and ৬ + ৫ = ১১
const GHOST = { f: "#FFFFFF", t: "#F1F5F9", s: "#CBD5E1", k: "#475569" };
const RED = "#DC2626", RING = "#DB2777", GREEN = "#16A34A";

// ── sums in columns ──
function parseRow(r) {
  const m = String(r).match(/^\s*([+\-−]?)\s*(.*)$/);
  return { op: m[1] === "-" ? "−" : m[1], cells: m[2].replace(/\s+/g, "").match(/_|[^_{}](\{[^}]*\})?/g) || [] };
}
function cellHtml(c, esc) {
  if (c === "_" || c == null) return "";
  if (c === "□") return `<i class="p040-wb"></i>`;
  const m = c.match(/^(.)\{(.*)\}$/);
  return m ? `${esc(m[1])}<sup>${esc(m[2])}</sup>` : esc(c);
}
function csHtml(it, ctx, size = 15) {
  const { esc } = ctx;
  const rows = it.rows.map(parseRow);
  const ans = it.ans == null ? null : it.ans === "" ? null : parseRow(it.ans).cells;
  const carry = it.carry || null;
  const n = Math.max(...rows.map((r) => r.cells.length), ans ? ans.length : 0, it.heads ? it.heads.length : 0, carry ? carry.length : 0, it.width || 0);
  const pad = (a) => Array(Math.max(0, n - a.length)).fill("_").concat(a);
  const tds = (a, cls = "") => pad(a).map((c, i) => `<td class="d${i ? " dv" : ""}${cls}">${cellHtml(c, esc)}</td>`).join("");
  let h = "";
  if (it.heads) h += `<tr class="hd"><td class="op"></td>${pad(it.heads).map((x, i) => `<td class="h${i ? " dv" : ""}">${esc(x === "_" ? "" : x)}</td>`).join("")}</tr>`;
  if (carry) h += `<tr class="cy"><td class="op"></td>${tds(carry)}</tr>`;
  rows.forEach((r, i) => { h += `<tr${i === rows.length - 1 ? ` class="ln"` : ""}><td class="op">${esc(r.op)}</td>${tds(r.cells)}</tr>`; });
  if (ans) h += `<tr class="an"><td class="op"></td>${tds(ans)}</tr>`;
  else if (it.ans === "") h += `<tr class="an"><td class="op"></td>${tds(Array(n).fill("□"))}</tr>`;
  const cls = `p040-cs${it.div ? " " + it.div : ""}${it.grid ? " grid" : ""}${it.compact ? " compact" : ""}`;
  const table = `<table class="${cls}" style="font-size:${it.size || size}pt">${h}</table>`;
  const body = it.box ? `<div class="p040-box ${it.box}">${table}</div>` : table;
  return `<div class="p040-csi">${it.mk ? `<b class="p040-mk">${esc(it.mk)}</b>` : ""}${body}</div>`;
}

// ── base-ten blocks ──
function crossSvg(x, y, s, k) { // a red stroke across each of k cubes from (x, y) down
  let d = "";
  for (let i = 0; i < k; i++) d += `M${(x + s * .14).toFixed(2)} ${(y + i * s + s * .14).toFixed(2)}L${(x + s * .86).toFixed(2)} ${(y + i * s + s * .86).toFixed(2)}`;
  return `<path d="${d}" stroke="${RED}" stroke-width="${(s * .13).toFixed(2)}" stroke-linecap="round"/>`;
}
const ringRect = (x1, y1, x2, y2, s) => `<rect x="${x1.toFixed(2)}" y="${y1.toFixed(2)}" width="${(x2 - x1).toFixed(2)}" height="${(y2 - y1).toFixed(2)}" rx="${(s * .4).toFixed(2)}" fill="none" stroke="${RING}" stroke-width="${(s * .14).toFixed(2)}" stroke-dasharray="${(s * .45).toFixed(2)} ${(s * .3).toFixed(2)}"/>`;
const onesCols = (o) => typeof o === "number" ? Array.from({ length: Math.ceil(o / 10) }, (_, i) => "o".repeat(Math.min(10, o - i * 10))) : (o || []);
const rodsStr = (t) => typeof t === "number" ? "o".repeat(t) : (t || "");
/** Rods and ones side by side, bottom-aligned, as one SVG (units mm). */
function partSvg(t, o, s, base, ctx) {
  const B = ctx.BLOCK, c0 = B[base], hi = B[base === "yellow" ? "blue" : "yellow"];
  const fill = (ch) => "hmqy".includes(ch) ? hi : "gwk".includes(ch) ? GHOST : c0;
  const dx = s * .36, g = s * .55, pad = s * .5, top = dx + pad + .3, floor = top + 10 * s;
  let x = pad, out = "", rings = "", any = false;
  for (const ch of rodsStr(t)) {
    if (ch === " ") { x += s * 1.1; continue; }
    if (ch === ">") { // a hollow arrow out to the right, from the rod before it
      const ax = x - g + s * .35, ay = top + 5 * s, L = s * 2.6, w = s * .45, hd = s * .95;
      out += `<path d="M${ax} ${ay - w}H${ax + L - hd}V${ay - hd}L${ax + L} ${ay}L${ax + L - hd} ${ay + hd}V${ay + w}H${ax}Z" fill="#fff" stroke="#1E2433" stroke-width="${s * .12}" stroke-linejoin="round"/>`;
      x += L - g + s * .5; continue;
    }
    out += ctx.rod(x, top, s, fill(ch));
    if ("xky".includes(ch)) out += crossSvg(x, top, s, 10);
    if ("rwq".includes(ch)) rings += ringRect(x - s * .32, top - dx - s * .3, x + s + dx + s * .32, floor + s * .3, s);
    x += s + g; any = true;
  }
  const cols = onesCols(o);
  if (any && cols.length) x += s * .3;
  cols.forEach((col) => {
    const k = col.length; let q1 = -1, q2 = -1;
    for (let i = k - 1; i >= 0; i--) { // bottom first, so each cube's top face sits under the one above
      const ch = col[i], y = floor - (k - i) * s;
      out += ctx.cube(x, y, s, fill(ch));
      if ("xky".includes(ch)) out += crossSvg(x, y, s, 1);
      if (ch === "q") { if (q2 < 0) q2 = y + s; q1 = y; }
    }
    if (q1 >= 0) rings += ringRect(x - s * .32, q1 - dx - s * .3, x + s + dx + s * .32, q2 + s * .3, s);
    x += s * 1.3; any = true;
  });
  const w = Math.max(x - (cols.length ? s * .3 : g) + dx + pad, s * 2), h = floor + pad;
  return `<svg class="p040-bk" width="${w.toFixed(2)}mm" height="${h.toFixed(2)}mm" viewBox="0 0 ${w.toFixed(2)} ${h.toFixed(2)}">${out}${rings}</svg>`;
}
const downArrow = (hmm, wmm = 4.2) => `<svg width="${wmm}mm" height="${hmm}mm" viewBox="0 0 ${wmm} ${hmm}"><path d="M${wmm * .32} 0H${wmm * .68}V${hmm - wmm * .62}H${wmm}L${wmm / 2} ${hmm}L0 ${hmm - wmm * .62}H${wmm * .32}Z" fill="${GREEN}"/></svg>`;
function pvCell(v, isTens, s, base, ctx) {
  if (v === "|") return `<div class="p040-pass">${downArrow(10 * s)}</div>`;
  if (v && typeof v === "object" && !Array.isArray(v) && v.label) return `<div class="p040-lab"><span>${ctx.br(v.label)}</span>
    <svg width="14mm" height="11mm" viewBox="0 0 14 11"><path d="M13 .6C13 6.5 8.5 8 3.6 8.4" fill="none" stroke="#1E2433" stroke-width="1.1" stroke-linecap="round"/><path d="M4.2 5.4L1 8.6L4.6 10.6Z" fill="#1E2433"/></svg></div>`;
  return isTens ? partSvg(v, null, s, base, ctx) : partSvg("", v, s, base, ctx);
}
function pvHtml(b, ctx, page) {
  const s = b.s || 2.4, base = b.color || "blue", rowH = 10 * s + s * .36 + s + .9;
  const steps = b.steps || [{ rows: b.rows }];
  const extra = steps.some((st) => st.sum || st.side);
  const [tw, ow, sw] = b.w || [];
  const colsT = b.plain ? [`${tw ? tw + "mm" : "auto"}`] : [`${tw ? tw + "mm" : "auto"}`, `${ow ? ow + "mm" : "auto"}`];
  const cols = extra ? [...colsT, sw ? sw + "mm" : "auto", "1fr"] : colsT;
  const nT = colsT.length;
  let h = "";
  if (b.heads) h += b.heads.map((x) => `<div class="p040-hd">${ctx.md(x)}</div>`).join("") + (extra ? `<div></div><div></div>` : "");
  steps.forEach((st, i) => {
    if (i) h += Array.from({ length: nT }, () => `<div class="p040-ar">${downArrow(4.6, 4.6)}</div>`).join("") + (extra ? `<div></div><div></div>` : "");
    const card = (fn) => {
      const passes = st.rows.every((r) => fn(r) === "|");
      if (passes) return `<div class="p040-pass">${downArrow(rowH * st.rows.length * .8)}</div>`;
      return `<div class="p040-card${b.heads && i === 0 ? " top" : ""}">${st.rows.map((r) => `<div class="p040-r" style="min-height:${rowH.toFixed(1)}mm">${fn(r) === "|" ? "" : (b.plain ? partSvg(r.t, r.o, s, base, ctx) : pvCell(fn(r), fn === tOf, s, base, ctx))}</div>`).join("")}</div>`;
    };
    const tOf = (r) => r.t, oOf = (r) => r.o;
    h += b.plain ? card(tOf) : card(tOf) + card(oOf);
    if (extra) h += `<div class="p040-sum">${st.sum ? csHtml(st.sum, ctx, st.sum.size || 13) : ""}</div><div class="p040-side">${(st.side || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>`;
  });
  return `<div class="p040-pv${extra ? " wide" : ""}" style="grid-template-columns:${cols.join(" ")}">${h}</div>`;
}

// ── p40: packs of cards with a star and the number on top ──
function star(cx, cy, R, r, n = 12) { let d = ""; for (let i = 0; i < 2 * n; i++) { const a = Math.PI * i / n - Math.PI / 2, q = i % 2 ? r : R; d += `${i ? "L" : "M"}${(cx + Math.cos(a) * q).toFixed(2)} ${(cy + Math.sin(a) * q).toFixed(2)}`; } return d + "Z"; }
function cardPack(x, y, n, bn) {
  const W = 12.5, H = 16, layers = n >= 10 ? 6 : 2, st = .55;
  let g = "";
  for (let i = layers - 1; i >= 1; i--) g += `<rect x="${x + i * st}" y="${y + i * st}" width="${W}" height="${H}" rx=".9" fill="${i % 2 ? "#6B2C91" : "#8E44AD"}" stroke="#4A1D6B" stroke-width=".25"/>`;
  g += `<rect x="${x}" y="${y}" width="${W}" height="${H}" rx=".9" fill="#9B4DCA" stroke="#4A1D6B" stroke-width=".35"/><rect x="${x + 1.4}" y="${y + 1.4}" width="${W - 2.8}" height="${H - 2.8}" rx=".5" fill="#F9C6E0"/>`;
  g += `<path d="${star(x + W / 2, y + H / 2, 4.6, 3.3)}" fill="#fff" stroke="#E879F9" stroke-width=".2"/><text x="${x + W / 2}" y="${y + H / 2 + 1.25}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${n >= 10 ? 3.5 : 3.9}" fill="#1E2433">${bn(n)}</text>`;
  return g;
}
function cardsHtml(b, ctx) {
  const panel = ({ rows, cap }) => {
    const gx = 16.5, gy = 20, w = Math.max(...rows.map((r) => r.length)) * gx + 2, hh = rows.length * gy;
    let g = ""; rows.forEach((r, j) => r.forEach((n, i) => { g += cardPack(1 + i * gx, 1 + j * gy, n, ctx.bn); }));
    return `<figure class="p040-cardp"><svg width="${w}mm" height="${hh}mm" viewBox="0 0 ${w} ${hh}">${g}</svg><figcaption>${ctx.md(cap)}</figcaption></figure>`;
  };
  return `<div class="p040-cards">${b.panels.map(panel).join("")}</div>`;
}

// ── p46: bundles of ten papers and single sheets ──
function paperSheet(x, y, w, h, id) { return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".4" fill="url(#${id})" stroke="#64748B" stroke-width=".3"/>`; }
function papersHtml(b, ctx) {
  const id = "p040pg", W = 10, H = 14.5, sw = 8.6, sh = 13, gx = 17;
  const bundle = (x, y) => { let g = ""; for (let i = 6; i >= 1; i--) g += paperSheet(x + i * .45, y + i * .45, W, H, id); return g + paperSheet(x, y, W, H, id) + `<rect x="${x}" y="${y + 5.2}" width="${W}" height="3.4" fill="#1E3A8A"/><text x="${x + W / 2}" y="${y + 7.75}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="2.6" fill="#fff">${ctx.bn(10)}</text>`; };
  const y1 = 9, y2 = 30, x0 = 4, xs = x0 + 2 * gx + 2;
  let g = bundle(x0, y1) + bundle(x0 + gx, y1) + bundle(x0, y2);
  for (let i = 0; i < 3; i++) { g += paperSheet(xs + i * 12, y1 + .7, sw, sh, id) + paperSheet(xs + i * 12, y2 + .7, sw, sh, id); }
  // the dashed arrow round one bundle and three sheets (the 13 given away)
  const x1 = x0 + gx - 2.6, x2 = xs + 2 * 12 + sw + 3, t = y1 - 2.4, bt = y1 + H + 3, m = (t + bt) / 2;
  g += `<path d="M${x1} ${t}H${x2}V${t - 5}L${x2 + 11} ${m}L${x2} ${bt + 5}V${bt}H${x1}Z" fill="none" stroke="#1E2433" stroke-width=".45" stroke-dasharray="1.6 1.1" stroke-linejoin="round"/>`;
  const w = x2 + 14, h = y2 + H + 3;
  return `<div class="p040-papers"><svg width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#BAE6FD"/></linearGradient></defs>${g}</svg></div>`;
}

// ── p55: bundles of ten story books ──
function bookPile(x, y, bn) {
  let g = "";
  for (let i = 0; i < 4; i++) { const yy = y + 13 - i * 3.1, xx = x + (i % 2 ? .5 : 0);
    g += `<rect x="${xx}" y="${yy}" width="13" height="3" rx=".6" fill="#B91C1C" stroke="#7F1D1D" stroke-width=".3"/><rect x="${xx + 1.6}" y="${yy + .7}" width="10.8" height="1.6" fill="#FEF3C7"/><path d="M${xx + 1.6} ${yy + 1.5}h10.8" stroke="#E7D7A8" stroke-width=".25"/>`; }
  const ty = y + 13 - 3 * 3.1;
  g += `<path d="M${x + .5} ${ty}L${x + 3} ${ty - 3.4}H${x + 16}L${x + 13.5} ${ty}Z" fill="#EF4444" stroke="#7F1D1D" stroke-width=".3" stroke-linejoin="round"/>`;
  g += `<text x="${x + 8.3}" y="${ty - .75}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="3.1" fill="#fff">${bn(10)}</text>`;
  return g;
}
function booksHtml(b, ctx) {
  const k = b.scale || .8, P = 15; // drawn at 15 units a pile, shown k mm a unit
  const box = (n) => { const w = n * P + 2.5, h = 20; let g = ""; for (let i = 0; i < n; i++) g += bookPile(1 + i * P, 3, ctx.bn); return `<div class="p040-bookbox"><svg width="${(w * k).toFixed(1)}mm" height="${(h * k).toFixed(1)}mm" viewBox="0 0 ${w} ${h}">${g}</svg></div>`; };
  const arrow = `<svg class="p040-larr" width="11mm" height="8mm" viewBox="0 0 11 8"><path d="M10.4 2.4H4.6V.6L.6 4L4.6 7.4V5.6H10.4Z" fill="#fff" stroke="#1E2433" stroke-width=".5" stroke-linejoin="round"/></svg>`;
  return `<div class="p040-books">${box(b.left)}${arrow}${box(b.right)}</div>`;
}

// ── p54: part–whole bars ──
function tapeHtml(b, ctx) {
  const one = ({ top, bottom }) => {
    const n = Math.max(top.length, bottom.length);
    const tr = (a) => `<tr>${a.map((x) => `<td colspan="${n / a.length}"${x === "?" ? ` class="q"` : ""}>${ctx.esc(x)}</td>`).join("")}</tr>`;
    return `<table class="p040-tape">${tr(top)}${tr(bottom)}</table>`;
  };
  return `<div class="p040-tapes">${b.bars.map(one).join("")}</div>`;
}

// ── p53: the crossed arrows ──
function crossHtml(b, ctx) {
  const t = (x, y, s, a = "end", c = "#1E2433") => `<text x="${x}" y="${y}" text-anchor="${a}" font-family="Baloo Da 2" font-weight="800" font-size="5.6" fill="${c}">${ctx.esc(s)}</text>`;
  const arrow = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1), hd = (x, y, a) => `<path d="M${x} ${y}L${(x - Math.cos(a - .45) * 2.6).toFixed(2)} ${(y - Math.sin(a - .45) * 2.6).toFixed(2)}L${(x - Math.cos(a + .45) * 2.6).toFixed(2)} ${(y - Math.sin(a + .45) * 2.6).toFixed(2)}Z" fill="${RING}"/>`;
    return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${RING}" stroke-width=".7"/>${hd(x2, y2, a)}${hd(x1, y1, a + Math.PI)}`; };
  const g = t(22, 7, "১১") + t(5, 16.5, "−", "start", RED) + t(22, 16.5, "৫") + `<path d="M3 19.6H25.5" stroke="#1E2433" stroke-width=".7"/>` + t(22, 27.5, "৬") +
    t(57, 7, "৬") + t(46.5, 16.5, "+", "start", RED) + t(57, 16.5, "৫") + `<path d="M45 19.6H59" stroke="#1E2433" stroke-width=".7"/>` + t(57, 27.5, "১১") +
    arrow(25.5, 3.5, 45, 24.5) + arrow(25.5, 24.5, 49.5, 3.5);
  return `<div class="p040-cross"><svg width="62mm" height="30mm" viewBox="0 0 62 30">${g}</svg></div>`;
}

module.exports = {
  kinds: {
    p040_tri: (b, ctx) => `<div class="p040-tri"><span class="p040-trim"><b>${b.n ? ctx.esc(b.n) : ""}</b></span><span class="p040-trit">${ctx.md(b.text)}</span></div>`,
    p040_cs: (b, ctx) => `<div class="p040-css" style="grid-template-columns:repeat(${b.cols || b.items.length}, auto);${b.gap ? `gap:${b.gap}mm;` : ""}justify-content:${b.justify || "space-between"}">${b.items.map((it) => csHtml(it, ctx, b.size)).join("")}</div>`,
    p040_hs: (b, ctx) => `<div class="p040-hs" style="grid-template-columns:repeat(${b.cols || 4}, 1fr);font-size:${b.size || 13.5}pt">${b.items.map((x, i) => `<span><b class="p040-mk">${b.paren ? `(${ctx.bn((b.start || 1) + i)})` : `${ctx.bn((b.start || 1) + i)})`}</b>${ctx.md(x)}</span>`).join("")}</div>`,
    p040_pv: (b, ctx, page) => pvHtml(b, ctx, page),
    p040_cards: (b, ctx) => cardsHtml(b, ctx),
    p040_papers: (b, ctx) => papersHtml(b, ctx),
    p040_books: (b, ctx) => booksHtml(b, ctx),
    p040_tape: (b, ctx) => tapeHtml(b, ctx),
    p040_cross: (b, ctx) => crossHtml(b, ctx),
    // a big arrow between pictures: { dir: "right" | "left", w, solid }
    p040_arrow: (b) => {
      const w = b.w || 16, h = w * .62, f = b.solid ? "#1E2433" : "#fff";
      const d = `M1 ${h * .3}H${w - h * .55}V1L${w - 1} ${h / 2}L${w - h * .55} ${h - 1}V${h * .7}H1Z`;
      return `<div class="p040-arw"><svg width="${w}mm" height="${h.toFixed(1)}mm" viewBox="0 0 ${w} ${h.toFixed(2)}"${b.dir === "left" ? ` style="transform:scaleX(-1)"` : ""}><path d="${d}" fill="${f}" stroke="#1E2433" stroke-width=".7" stroke-linejoin="round"/></svg></div>`;
    },
    // p53: the mangoes sold and left, in the book's two-row box (the mango is a ChatGPT sticker, repeated)
    p040_mangoes: (b, ctx) => {
      const m = (n) => ctx.objsHtml({ sticker: "mango", emoji: "🥭", n, perRow: n, size: 11.5, gap: 1.6 });
      return `<table class="p040-mg"><tr><td class="l">${ctx.md("প্রথমে আমের সংখ্যা □")}</td><td><div class="cap">${ctx.md("বিক্রি করা হলো ৫টি আম")}</div>${m(5)}</td></tr>
        <tr><td colspan="2">${m(6)}</td></tr></table>`;
    },
    // numbered lines inside a card (p52's ১। ২। ৩।): { items, start, sep }
    p040_list: (b, ctx) => `<div class="p040-list">${b.items.map((x, i) => `<div class="ext"><span class="mk">${ctx.bn((b.start || 1) + i)}${b.sep ?? "।"}</span><span>${ctx.md(x)}</span></div>`).join("")}</div>`,
  },
  css: `
.p040-tri { display: flex; align-items: center; gap: 2.4mm; font: 700 13.5pt/1.35 'Baloo Da 2'; color: var(--d) }
.p040-trim { flex: none; position: relative; width: 9mm; height: 7.8mm; clip-path: polygon(50% 0, 100% 100%, 0 100%); background: linear-gradient(#FBCFE8, #EC4899) }
.p040-trim b { position: absolute; left: 0; right: 0; bottom: .3mm; text-align: center; font: 800 9.5pt/1 'Baloo Da 2'; color: #fff }
.p040-css { display: grid; gap: 3mm 3mm; align-items: start }
.p040-csi { display: flex; align-items: flex-start; gap: 1.4mm }
.p040-mk { font: 800 12.5pt/1.4 'Baloo Da 2'; color: #EA580C; margin-right: 1.4mm; white-space: nowrap }
.p040-csi > .p040-mk { padding-top: .5mm; margin-right: 0 }
.p040-cs { font-family: 'Baloo Da 2'; font-weight: 800; border-collapse: collapse; background: #fff; border-radius: 2.4mm; box-shadow: 0 0 0 .4mm #E2E8F0 }
.p040-cs td { width: 1.25em; height: 1.45em; text-align: center; padding: 0 .1em; line-height: 1.45; white-space: nowrap }
.p040-cs td.op { color: ${RED}; width: 1em } .p040-cs tr.ln td { border-bottom: .6mm solid #1E2433 }
.p040-cs.dash td.dv { border-left: .4mm dashed #64748B } .p040-cs.solid td.dv { border-left: .5mm solid #1E2433 }
.p040-cs tr.hd td { font-size: .5em; font-weight: 700; line-height: 1.6; padding: .25em .4em .1em } .p040-cs tr.hd td.h { color: #fff; background: var(--c) }
.p040-cs tr.cy td { font-size: .62em; color: ${RED}; height: 1.2em; line-height: 1.2 } .p040-cs tr.an td { color: #C2410C }
.p040-cs sup { font-size: .5em; color: ${RED}; margin-left: .05em }
.p040-cs.grid td { border: .35mm solid #64748B; width: 1.5em } .p040-cs.grid tr.ln td { border-bottom: .35mm solid #64748B } .p040-cs.grid { box-shadow: none; border-radius: 0 }
.p040-cs.compact td { height: 1.28em; line-height: 1.28 }
.p040-wb { display: inline-block; width: .82em; height: 1.08em; border: .35mm dashed #CBD5E1; border-radius: 1mm; vertical-align: middle; background: #fff }
.p040-box { padding: 1.4mm 2.6mm 1.6mm; border-radius: 3mm; border: .6mm solid; box-shadow: 0 .8mm 0 rgba(0,0,0,.06) }
.p040-box.blue { background: #E0F2FE; border-color: #38BDF8 } .p040-box.yellow { background: #FEF9C3; border-color: #EAB308 } .p040-box.white { background: #fff; border-color: var(--c) }
.p040-box .p040-cs { background: transparent; box-shadow: none }
.p040-hs { display: grid; gap: 2.4mm 3mm; font-family: 'Baloo Da 2'; font-weight: 700; line-height: 1.6; padding-left: 2mm } .p040-hs > span { white-space: nowrap }
.p040-pv { display: grid; column-gap: 1.6mm; align-items: stretch; justify-content: center } .p040-pv.wide { width: 100% }
.p040-hd { text-align: center; font: 700 10.5pt/1.2 'Baloo Da 2'; color: #fff; background: var(--c); border-radius: 2.6mm 2.6mm 0 0; padding: 1.1mm 1mm .7mm; align-self: end }
.p040-card { display: flex; flex-direction: column; border: .6mm solid var(--c); border-radius: 3mm; background: #fff; overflow: hidden; box-shadow: 0 .8mm 0 var(--s) } .p040-card.top { border-top-left-radius: 0; border-top-right-radius: 0 }
.p040-r { flex: 1 1 auto; display: flex; align-items: flex-end; justify-content: center; padding: 0 1mm .9mm } .p040-r + .p040-r { border-top: .45mm dashed #94A3B8 }
.p040-ar { display: flex; justify-content: center; align-items: center; height: 5.6mm }
.p040-pass { display: flex; justify-content: center; align-items: center }
.p040-sum { align-self: center; justify-self: center; padding: 1mm 0 } .p040-side { align-self: center; display: flex; flex-direction: column; gap: 2mm; padding-left: 1mm }
.p040-side .tx { font-size: 12pt; line-height: 1.45 }
svg.p040-bk { display: block; overflow: visible }
.p040-lab { display: flex; flex-direction: column; align-items: flex-end; align-self: center; width: 100% } .p040-lab span { font: 600 10pt/1.35 'Noto Sans Bengali'; background: #FFFBEB; border: .45mm solid #F59E0B; border-radius: 2mm; padding: 1mm 2mm .6mm; margin-right: 3mm }
.p040-cards { display: flex; justify-content: center; gap: 0; align-self: center; border: .7mm solid #DB2777; border-radius: 4mm; overflow: hidden; box-shadow: 0 1.2mm 0 #FBCFE8 }
.p040-cardp { margin: 0; padding: 3mm 7mm 1.6mm; background: #FDF2F8; display: flex; flex-direction: column; align-items: center; gap: 1mm } .p040-cardp + .p040-cardp { border-left: .5mm solid #F9A8D4 }
.p040-cardp figcaption { font: 700 12.5pt 'Baloo Da 2'; color: #9D174D }
.p040-papers { align-self: center; padding: 1mm 0 }
.p040-books { display: flex; align-items: center; justify-content: center; gap: 2mm } .p040-bookbox { border: .6mm solid var(--c); border-radius: 3mm; background: #FFF7ED; padding: 1.4mm 2mm; box-shadow: 0 .8mm 0 var(--s) }
.p040-tapes { display: flex; gap: 6mm; padding-left: 2mm }
.p040-tape { border-collapse: collapse; width: 56mm; font: 800 13pt 'Baloo Da 2' } .p040-tape td { border: .5mm solid var(--c); text-align: center; height: 8mm; background: #fff } .p040-tape tr:first-child td { background: var(--s) } .p040-tape td.q { color: ${RED} }
.p040-cross { display: flex; justify-content: center; align-items: center } .p040-arw { display: flex; justify-content: center; align-items: center }
.p040-mg { width: 100%; border-collapse: separate; border-spacing: 0; border: .7mm solid var(--c); border-radius: 4mm; overflow: hidden; background: #fff; box-shadow: 0 1.2mm 0 var(--s) }
.p040-mg td { padding: 1.6mm 3mm; vertical-align: middle; text-align: center } .p040-mg td.l { width: 42%; text-align: left; font: 600 12.5pt 'Noto Sans Bengali'; border-right: .5mm solid var(--s); background: #F0FDF4 }
.p040-mg tr + tr td { border-top: .5mm solid var(--s); background: #FFFBEB } .p040-mg .cap { font: 600 12pt 'Noto Sans Bengali'; text-align: left; margin-bottom: 1mm }
.p040-list { display: flex; flex-direction: column; gap: 1.6mm } .p040-list .ext { grid-template-columns: 8mm 1fr }
`,
};
