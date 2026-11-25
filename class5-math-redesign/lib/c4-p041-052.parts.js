// Printed pages 41–52's own kinds (prefixed c4p041_), written by a helper (23 Nov 2026). Chapter ৩ গুণ (multiplying by 2- and
// 3-digit numbers in columns, the partial products, the zeros, the easy way with ৯৯ and ৯৯৯) and the start of chapter ৪ ভাগ
// (sharing marbles, remainders, long division by a 1-digit number in the book's grid). Every digit, box, rule, ring, brace and
// arrow is drawn here by code. Units: mm.
//   c4p041_col    one multiplication in columns: { rows, w?, size?, look?: none | card | plate, dash?, labels?, lw?, lbox?, al?,
//                 rings?, downs?, ans?, center? }
//                 rows: "৩৫৪" · "×২৯" (a sign, then one cell per digit) · "-" a rule. In a row "_" is an empty cell, "□" an
//                 answer box, "{২}" a small carried digit. The cells line up from the right (the ones). Rows after the first
//                 rule are the answer (orange; ans: false keeps them dark). labels: one per row (null for none), written on the
//                 left with an arrow pointing at the row (pp. 41, 44); lbox puts them in a box; lw is their column's width.
//                 rings: [[row, fromCol, toCol]] (cols from the right, 0 = ones) a purple ring round those cells (p43's zeros);
//                 downs: [[row, col, toRow]] a red arrow from that row down to toRow. dash: red dashed lines on that many places.
//   c4p041_mex    multiplications to do in columns ("গুণ করি"): { items: ["২৪৮×৩২", …], cols, size, room?, marks?, start? }
//                 room: false = the book's way, a line under the sum and one row to write the answer in; otherwise a row
//                 for each partial product, a rule and the answer row.
//   c4p041_pair   p43: two multiplications side by side joined by arrows with words: { left, right (c4p041_col's rows…),
//                 gap, links: [[row, "left" | "right", label, "above" | "below"]] }
//   c4p041_ladder p43: the ×১০০ ladder: { rows: [[tokens…]…], x: [each token's left x], rh, size, w,
//                 arrows: [{ x, row, two?, label }] (red; two = red and blue), side: { x0, x, label } (the green ×১০০০০) }
//   c4p041_beq    p43: equations line under line, with braces over or under a run of tokens and curved or straight arrows:
//                 { lines: [[tokens]…] (a token may be { t, sp } with sp mm of extra space before it), size, lh, ind?: [mm…],
//                   over / under: [[line, fromTok, toTok]], arcs: [{ from: [line, tok], to: [line, tok], side, col }],
//                   links: [{ from: [line, tok], to: [line, tok], col }], tone }
//   c4p041_ldiv   long division (উপর-নিচ ভাগ): { d, n, q, rows, rules?, downs?, grid?, extra?, min?, size? }
//                 q: the quotient's cells over the dividend's (from the left: "১_" = ১ over the tens), rows: the working rows,
//                 each cell under a dividend digit ("_" empty, "□" an answer box), rules: a line under those working rows,
//                 downs: [[col, toRow]] the red arrow bringing a dividend digit down to that working row, grid: the book's grid
//                 of cells (with `extra` empty columns on the right and at least `min` rows).
//   c4p041_dsteps the book's division steps: a long division, a big arrow and its words: { steps: [{ …c4p041_ldiv, text }], size, sw }
//   c4p041_dq     divisions to do, written d)n̄ as the book prints them: { items: [["৬", "৭৮"], …], cols, paren?, size? }
//   c4p041_share  p50's table: marbles given 2, 3, 4 at a time to 5 children, what is left in a blue box:
//                 { rows: [{ per, full, part?, rest?, text }], size } (part: one more pill holding only that many)
//   c4p041_dots   p49: n dots in a row, a brace, then the same dots shared into `groups` columns: { n, groups }
//   c4p041_face   a child's face alone (p43: the girl and the boy beside their working): { who, mood?, size? }
//   c4p041_work   working written line under line, with wide answer boxes (▭): { rows: [string | { l, e }], bw?, bh?, size?,
//                 gap?, indent?, text? (Noto Sans Bengali instead of Baloo) }; with labels (l) the e column lines up
//   c4p041_tight  wraps Class 3's c3p051_steps to tighten its word boxes on a crowded page (p42): { body }
//   c4p041_wbox   a big empty box to write in: { h }
const INK = "#1E2433", RED = "#DC2626", BLUE = "#2563EB", ANS = "#C2410C", RING = "#7C3AED", GREEN = "#15803D";
const BOXS = "#F59E0B", BOXF = "#FFFBEB";
const f = (n) => +(+n).toFixed(2);
// Baloo Da 2's advance widths (em), measured in Chrome: its Bangla digits are not all one width
const GW = { "০": .65, "১": .54, "২": .49, "৩": .76, "৪": .53, "৫": .65, "৬": .7, "৭": .6, "৮": .77, "৯": .65, "×": .57, "=": .57, "+": .57, "−": .57, "÷": .55, "(": .33, ")": .33, " ": .25 };
const twid = (s, fs) => [...s].reduce((a, c) => a + (GW[c] ?? .58), 0) * fs;
const T = (x, y, s, fs, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="${o.fam || "Baloo Da 2"}" font-weight="${o.w || 800}" font-size="${f(fs)}" text-anchor="${o.a || "middle"}" style="fill:${col}">${s}</text>`;
const boxR = (cx, cy, w, h) => `<rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${f(w)}" height="${f(h)}" rx="${f(Math.min(w, h) * .2)}" fill="${BOXF}" stroke="${BOXS}" stroke-width=".45"/>`;
function arrow(x1, y1, x2, y2, col, sw = .4, hl = 1.6, hw = .85) {
  const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d, bx = x2 - ux * hl, by = y2 - uy * hl;
  return `<path d="M${f(x1)} ${f(y1)}L${f(bx)} ${f(by)}" stroke="${col}" stroke-width="${f(sw)}" stroke-linecap="round" fill="none"/><path d="M${f(x2)} ${f(y2)}L${f(bx - uy * hw)} ${f(by + ux * hw)}L${f(bx + uy * hw)} ${f(by - ux * hw)}Z" fill="${col}"/>`;
}
function curve(x1, y1, cx, cy, x2, y2, col, sw = .4, hl = 1.6, hw = .85) {
  const dx = x2 - cx, dy = y2 - cy, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d, bx = x2 - ux * hl, by = y2 - uy * hl;
  return `<path d="M${f(x1)} ${f(y1)}Q${f(cx)} ${f(cy)} ${f(bx)} ${f(by)}" stroke="${col}" stroke-width="${f(sw)}" stroke-linecap="round" fill="none"/><path d="M${f(x2)} ${f(y2)}L${f(bx - uy * hw)} ${f(by + ux * hw)}L${f(bx + uy * hw)} ${f(by - ux * hw)}Z" fill="${col}"/>`;
}
// a curly brace from x1 to x2 whose ends sit at y; dir +1 points its middle down, -1 up
function brace(x1, x2, y, d, dir, col, sw = .35) {
  const m = (x1 + x2) / 2, q = Math.min(d, (x2 - x1) / 4), h = d / 2 * dir;
  return `<path d="M${f(x1)} ${f(y)}Q${f(x1)} ${f(y + h)} ${f(x1 + q)} ${f(y + h)}H${f(m - q)}Q${f(m)} ${f(y + h)} ${f(m)} ${f(y + 2 * h)}Q${f(m)} ${f(y + h)} ${f(m + q)} ${f(y + h)}H${f(x2 - q)}Q${f(x2)} ${f(y + h)} ${f(x2)} ${f(y)}" fill="none" stroke="${col}" stroke-width="${sw}"/>`;
}
const svgOf = (W, H, inner, cls = "c4p041-svg") => `<svg class="${cls}" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${inner}</svg>`;
const ARR = (w) => `<svg class="c4p041-arr" width="${w}mm" height="3mm" viewBox="0 0 ${w} 3"><path d="M0 1.5H${f(w - 1.8)}" stroke="${INK}" stroke-width=".35"/><path d="M${f(w - 2.2)} .45L${w} 1.5L${f(w - 2.2)} 2.55Z" fill="${INK}"/></svg>`;

// ── a multiplication in columns ──
const cellsOf = (s) => s.match(/\{[^}]*\}|./gu) || [];
function parseRow(r) {
  if (r === "-") return { rule: true };
  const m = r.match(/^([×+]?)(.*)$/u);
  return { op: m[1], cells: cellsOf(m[2].replace(/\s+/g, "")) };
}
function colLayout(b) {
  const s = b.size || 6, cw = s * (b.cwf || 1), ch = s * 1.22, look = b.look || "none";
  const rows = b.rows.map(parseRow), nums = rows.filter((r) => !r.rule);
  const w = b.w || Math.max(...nums.map((r) => r.cells.length));
  const opW = rows.some((r) => r.op) ? s * .95 : 0;
  const padX = look === "none" ? s * .15 : s * .5, padT = look === "none" ? s * .05 : s * .3, padB = look === "none" ? s * .05 : s * .28;
  const W = padX * 2 + opW + w * cw, xOf = (k) => W - padX - (k + 1) * cw;
  let y = padT; const geo = [];
  for (const r of rows) { if (r.rule) { geo.push({ y: y + s * .09 }); y += s * .18; } else { geo.push({ y, h: ch, cy: y + ch / 2 }); y += ch; } }
  const Hb = y + padB, tip = look === "plate" ? s * 1.1 : 0;
  return { s, cw, ch, rows, w, opW, padX, W, H: Hb + tip, Hb, tip, xOf, geo, look };
}
function colInner(b, L, ctx) {
  const { s, cw, ch, rows, W, H, Hb, tip, xOf, geo, look, padX, opW } = L;
  let o = "";
  if (look === "plate") { // Class 3's home-plate box
    const r0 = s * .45;
    o += `<path d="M${f(r0)} .3H${f(W - r0)}Q${f(W - .3)} .3 ${f(W - .3)} ${f(r0)}V${f(Hb)}L${f(W / 2)} ${f(H - .3)}L.3 ${f(Hb)}V${f(r0)}Q.3 .3 ${f(r0)} .3Z" style="fill:#fff;stroke:var(--c)" stroke-width=".5" stroke-linejoin="round"/>`;
  } else if (look === "card") {
    o += `<rect x=".25" y=".25" width="${f(W - .5)}" height="${f(H - .5)}" rx="${f(s * .45)}" fill="#fff" stroke="#E2E8F0" stroke-width=".45"/>`;
  }
  if (b.dash) for (let k = 0; k <= b.dash; k++) {
    const x = W - padX - k * cw, yb = look === "plate" ? Hb + tip * (1 - Math.abs(x - W / 2) / (W / 2)) - .7 : H - s * .2;
    o += `<path d="M${f(x)} ${f(look === "none" ? 0 : .9)}V${f(yb)}" stroke="#FCA5A5" stroke-width="${f(s * .05)}" stroke-dasharray="${f(s * .16)} ${f(s * .12)}"/>`;
  }
  for (const [r, c1, c2] of b.rings || []) {
    const g = geo[r];
    o += `<rect x="${f(xOf(c2) + .2)}" y="${f(g.y + .3)}" width="${f((c2 - c1 + 1) * cw - .4)}" height="${f(ch - .6)}" rx="${f(ch * .3)}" fill="#F5F3FF" stroke="${RING}" stroke-width=".45"/>`;
  }
  const firstRule = rows.findIndex((r) => r.rule);
  rows.forEach((r, i) => {
    const g = geo[i];
    if (r.rule) { o += `<path d="M${f(padX * .4)} ${f(g.y)}H${f(W - padX * .4)}" stroke="${INK}" stroke-width="${f(s * .07)}"/>`; return; }
    const col = b.ans !== false && firstRule >= 0 && i > firstRule ? ANS : INK, n = r.cells.length;
    if (r.op) o += T(padX + opW / 2, g.y + ch * .76, r.op, s * .82, RED);
    r.cells.forEach((c, j) => {
      const x = xOf(n - 1 - j);
      if (c === "_") return;
      if (c === "□") { o += boxR(x + cw / 2, g.cy, cw * .8, ch * .74); return; }
      const m = c.match(/^\{(.*)\}$/u);
      if (m) { o += T(x + cw * .3, g.y + ch * .45, ctx.esc(m[1]), s * .6, RED); return; }
      o += T(x + cw / 2, g.y + ch * .76, ctx.esc(c), s * .92, col);
    });
  });
  for (const [r, c, r2] of b.downs || []) { const x = xOf(c) + cw / 2; o += arrow(x, geo[r].y + ch - .2, x, geo[r2].y + .4, RED, s * .07, s * .32, s * .17); }
  return o;
}
function colHtml(b, ctx) {
  const L = colLayout(b), svg = svgOf(L.W, L.H, colInner(b, L, ctx));
  const mk = b.mk ? `<b class="c4p041-mk">${ctx.esc(b.mk)}</b>` : "";
  if (!b.labels) return `<div class="c4p041-colw${b.left ? " left" : ""}">${mk}${svg}</div>`;
  const labs = b.labels.map((t, i) => t ? `<span class="c4p041-lab${b.lbox ? " bx" : ""}" style="top:${f(L.geo[i].cy)}mm"><span class="lt">${ctx.md(t)}</span>${ARR(b.al || 12)}</span>` : "").join("");
  return `<div class="c4p041-colw${b.left ? " left" : ""}">${mk}<div class="c4p041-labs" style="width:${b.lw || 40}mm;height:${f(L.H)}mm">${labs}</div>${svg}</div>`;
}

// ── multiplications to do ──
function mexHtml(b, ctx) {
  const s = b.size || 5;
  const one = (x, i) => {
    const [a, m] = x.split("×").map((t) => t.trim()), la = [...a].length, lm = [...m].length;
    const work = b.room === false || lm === 1 ? [""] : [...Array(lm).fill(""), "-", ""];
    const w = b.room === false ? Math.max(la, lm) + 1 : la + lm; // the book's way needs only the sum's own width
    const spec = { rows: [a, "×" + m, "-", ...work], w, size: s, look: "card", dash: w };
    const L = colLayout(spec), mk = b.marks ? b.marks[i] : `(${ctx.bn((b.start || 1) + i)})`;
    return `<div class="c4p041-mx"><b class="c4p041-mk">${ctx.esc(mk)}</b>${svgOf(L.W, L.H, colInner(spec, L, ctx))}</div>`;
  };
  return `<div class="c4p041-mex" style="grid-template-columns:repeat(${b.cols || 4}, 1fr)${b.gap != null ? `;row-gap:${b.gap}mm` : ""}">${b.items.map(one).join("")}</div>`;
}

// ── p43: two multiplications joined by arrows ──
function pairHtml(b, ctx) {
  const A = colLayout(b.left), B = colLayout(b.right), gap = b.gap || 34, s = A.s, pt = .5, pb = s * 1.3;
  const W = A.W + gap + B.W, H = pt + Math.max(A.H, B.H) + pb;
  let o = `<g transform="translate(0 ${pt})">${colInner(b.left, A, ctx)}<g transform="translate(${f(A.W + gap)} 0)">${colInner(b.right, B, ctx)}</g>`;
  for (const [r, dir, label, pos] of b.links || []) {
    const g = A.geo[r], x1 = A.W + 2.4, x2 = A.W + gap - 2.4, below = pos === "below", y = below ? g.cy : g.y + A.ch * .78;
    o += dir === "left" ? arrow(x2, y, x1, y, INK, .35) : arrow(x1, y, x2, y, INK, .35);
    o += T((x1 + x2) / 2, below ? y + s * 1.15 : g.y + A.ch * .5, ctx.esc(label), s * .74, INK, { w: 700 });
  }
  return `<div class="c4p041-colw">${svgOf(W, H, o + "</g>")}</div>`;
}

// ── p43: the ×১০০ ladder ──
function ladderHtml(b, ctx) {
  const fs = b.size || 5, rh = b.rh || 16, top = fs * 1.05, base = (r) => top + r * rh, W = b.w || 118, H = base(b.rows.length - 1) + fs * .5;
  let o = "";
  b.rows.forEach((row, r) => row.forEach((t, i) => { o += T(b.x[i], base(r), ctx.esc(t), fs, INK, { a: "start", w: 700 }); }));
  for (const a of b.arrows || []) {
    const y1 = base(a.row) + fs * .45, y2 = base(a.row + 1) - fs * 1.02;
    o += arrow(a.x, y1, a.x, y2, RED, .35, 1.5, .75);
    if (a.two) o += arrow(a.x + 1.6, y1, a.x + 1.6, y2, BLUE, .35, 1.5, .75);
    if (a.label) o += T(a.x + (a.two ? 3.4 : 1.8), (y1 + y2) / 2 + fs * .35, ctx.esc(a.label), fs * .82, INK, { a: "start", w: 700 });
  }
  if (b.side) {
    const s = b.side, y0 = base(0) - fs * .35, y2 = base(b.rows.length - 1) - fs * 1.02;
    o += `<path d="M${f(s.x0)} ${f(y0)}H${f(s.x)}V${f(y2 - 1.4)}" fill="none" stroke="${GREEN}" stroke-width=".35"/>` + arrow(s.x, y2 - 1.6, s.x, y2, GREEN, .35, 1.5, .75);
    o += T(s.x + 2.4, (y0 + y2) / 2 + fs * .35, ctx.esc(s.label), fs * .82, INK, { a: "start", w: 700 });
  }
  return `<div class="c4p041-colw">${svgOf(W, H, o)}</div>`;
}

// ── p43: equations with braces and arrows ──
const ARC = "#0EA5E9", LINK = "#F97316", BR = "#2563EB";
function beqHtml(b, ctx) {
  const fs = b.size || 5, lh = b.lh || fs * 2.2, gap = fs * .28, top = b.top ?? fs * 2.1;
  const base = (li) => top + (b.lhs ? b.lhs.slice(0, li).reduce((a, c) => a + c, 0) : li * lh);
  let maxW = 0;
  const pos = b.lines.map((line, li) => {
    let x = (b.ind && b.ind[li]) || 0;
    const ps = line.map((tk) => { const t = typeof tk === "string" ? tk : tk.t; if (typeof tk === "object" && tk.sp) x += tk.sp; const w = twid(t, fs); const p = { x, w, cx: x + w / 2 }; x += w + gap; return p; });
    maxW = Math.max(maxW, x - gap); return ps;
  });
  let o = "";
  b.lines.forEach((line, li) => line.forEach((tk, i) => { const t = typeof tk === "string" ? tk : tk.t; o += T(pos[li][i].x, base(li), ctx.esc(t), fs, INK, { a: "start", w: 700 }); }));
  for (const [li, a, z] of b.over || []) o += brace(pos[li][a].x - .3, pos[li][z].x + pos[li][z].w + .3, base(li) - fs * .9, fs * .5, -1, BR);
  for (const [li, a, z] of b.under || []) o += brace(pos[li][a].x - .3, pos[li][z].x + pos[li][z].w + .3, base(li) + fs * .32, fs * .5, 1, BR);
  for (const a of b.arcs || []) {
    const [l1, t1] = a.from, [l2, t2] = a.to, p = pos[l1][t1], q = pos[l2][t2], up = a.side !== "under";
    const y1 = up ? base(l1) - fs * 1.55 : base(l1) + fs * .55, y2 = up ? base(l2) - fs * 1.05 : base(l2) + fs * .45;
    o += curve(p.cx, y1, (p.cx + q.cx) / 2, up ? base(l1) - fs * 2.9 : base(l1) + fs * 2.1, q.cx, y2, a.col || ARC, .32, 1.4, .7);
  }
  for (const a of b.links || []) {
    const [l1, t1] = a.from, [l2, t2] = a.to, p = pos[l1][t1], q = pos[l2][t2];
    o += arrow(p.cx, base(l1) + fs * .5, q.cx, base(l2) - fs * 1.05, a.col || LINK, .32, 1.4, .7);
  }
  const H = base(b.lines.length - 1) + fs * .6;
  return `<div class="c4p041-beq${b.tone ? " t-" + b.tone : ""}">${svgOf(maxW + .6, H, o)}</div>`;
}

// ── long division ──
function ldivSvg(b, ctx) {
  const s = b.size || 7, cw = s, rh = s * (b.grid ? 1 : .98), fs = s * .62, nd = [...b.n].length, extra = b.extra ?? (b.grid ? 1 : .5);
  const dw = Math.max(b.grid ? s * 1.5 : 0, twid(b.d, fs) + s * .75), R = Math.max(b.min || 0, 2 + (b.rows || []).length);
  const xC = (i) => dw + i * cw, W = dw + (nd + extra) * cw, H = R * rh, yR = (r) => r * rh, bl = (r) => yR(r) + rh * .7;
  let o = "";
  if (b.grid) {
    o += `<rect x=".2" y=".2" width="${f(W - .4)}" height="${f(H - .4)}" rx="1" fill="#fff" stroke="#FDBA74" stroke-width=".4"/>`;
    for (let i = 0; i <= nd + Math.ceil(extra) - 1; i++) o += `<path d="M${f(xC(i))} .2V${f(H - .2)}" stroke="#FED7AA" stroke-width=".3"/>`;
    for (let r = 1; r < R; r++) o += `<path d="M.2 ${f(yR(r))}H${f(W - .2)}" stroke="#FED7AA" stroke-width=".3"/>`;
  }
  const cell = (c, i, r, col) => {
    const x = xC(i) + cw / 2;
    if (c === "_" || c === " ") return "";
    if (c === "□") return boxR(x, yR(r) + rh / 2, cw * .78, rh * .78);
    return T(x, bl(r), ctx.esc(c), fs * 1.05, col);
  };
  [...(b.q || "")].forEach((c, i) => { o += cell(c, i, 0, ANS); });
  [...b.n].forEach((c, i) => { o += cell(c, i, 1, INK); });
  (b.rows || []).forEach((row, k) => [...row].forEach((c, i) => { o += cell(c, i, 2 + k, "var(--d)"); }));
  o += T(dw - s * .42, bl(1), ctx.esc(b.d), fs * 1.05, INK, { a: "end" });
  const bx = dw - s * .3;
  o += `<path d="M${f(bx)} ${f(yR(1) + .1)}Q${f(bx + s * .36)} ${f(yR(1) + rh / 2)} ${f(bx)} ${f(yR(2) - .3)}" fill="none" stroke="${INK}" stroke-width=".5" stroke-linecap="round"/>`;
  o += `<path d="M${f(bx)} ${f(yR(1))}H${f(W - (b.grid ? .2 : 0))}" stroke="${INK}" stroke-width=".5"/>`;
  for (const k of b.rules || []) o += `<path d="M${f(xC(0) - s * .15)} ${f(yR(3 + k))}H${f(xC(nd) + s * .15)}" stroke="${INK}" stroke-width=".5"/>`;
  for (const [i, k] of b.downs || []) { const x = xC(i) + cw / 2; o += arrow(x, yR(2) + .5, x, yR(2 + k) + .5, RED, .35, 1.4, .7); }
  return svgOf(W, H, o, "c4p041-svg c4p041-ld");
}
const BIGARR = `<svg class="c4p041-big" width="13mm" height="4mm" viewBox="0 0 13 4"><path d="M0 2H10" stroke="${INK}" stroke-width=".9"/><path d="M9 .2L13 2L9 3.8Z" fill="${INK}"/></svg>`;
const TONES = ["yellow", "blue", "pink", "green"];
const dstepsHtml = (b, ctx) => `<div class="c4p041-ds">${b.steps.map((st, i) => `<div class="c4p041-dstep"><div class="c4p041-dsv" style="width:${b.sw || 34}mm">${ldivSvg({ size: b.size, grid: true, ...st }, ctx)}</div>${BIGARR}<div class="c4p041-tb t-${st.tone || TONES[i % 4]}">${ctx.md(st.text)}</div></div>`).join("")}</div>`;

// ── divisions to do, written d)n̄ ──
function dqSvg(d, n, fs, ctx) {
  const wd = twid(d, fs), wn = twid(n, fs), bx = wd + fs * .3, x1 = bx + fs * .45, W = x1 + wn + fs * .45, H = fs * 1.42, base = fs * 1.13;
  let o = T(wd, base, ctx.esc(d), fs, INK, { a: "end", w: 700 }) + T(x1, base, ctx.esc(n), fs, INK, { a: "start", w: 700 });
  o += `<path d="M${f(bx)} ${f(fs * .14)}Q${f(bx + fs * .36)} ${f(H / 2)} ${f(bx)} ${f(H - .15)}" fill="none" stroke="${INK}" stroke-width=".4" stroke-linecap="round"/><path d="M${f(bx)} ${f(fs * .14)}H${f(W)}" stroke="${INK}" stroke-width=".4"/>`;
  return svgOf(W, H, o, "c4p041-svg c4p041-dqs");
}
const dqHtml = (b, ctx) => `<div class="c4p041-dq" style="grid-template-columns:repeat(${b.cols || 4}, 1fr)">${b.items.map(([d, n], i) => {
  const k = ctx.bn((b.start || 1) + i);
  return `<span class="c4p041-dqi"><b class="c4p041-mk">${b.paren === false ? `${k})` : `(${k})`}</b>${dqSvg(d, n, b.size || 5.2, ctx)}</span>`;
}).join("")}</div>`;

// ── p50: the marbles dealt out ──
function shareHtml(b, ctx) {
  const img = ctx.sticker(b.sticker || "marble"), ms = b.size || 6.4;
  const one = (on) => `<span class="c4p041-mb${on ? "" : " no"}" style="width:${ms}mm;height:${ms}mm">${on ? (img ? `<img src="${img}">` : `<i class="em" style="font-size:${f(ms * 2.1)}pt">${b.emoji || "🔵"}</i>`) : ""}</span>`;
  const pill = (k, per) => `<span class="c4p041-pill">${Array.from({ length: per }, (_, i) => one(i < k)).join("")}</span>`;
  const row = (r) => {
    let g = Array.from({ length: r.full }, () => pill(r.per, r.per)).join("");
    if (r.part) g += pill(r.part, r.per);
    if (r.rest) g += `<span class="c4p041-rest">${Array.from({ length: r.rest }, () => one(true)).join("")}</span>`;
    return `<tr><td class="l"><div class="c4p041-pills">${g}</div></td><td class="r">${ctx.md(r.text)}</td></tr>`;
  };
  return `<table class="c4p041-share">${b.rows.map(row).join("")}</table>`;
}

// ── p49: the dots shared into columns ──
function dotsHtml(b) {
  const n = b.n, g = b.groups, k = n / g, r = b.r || 1.75, sp = r * 2.45, rowW = (n - 1) * sp + 2 * r;
  const cw = r * 5.2, cgap = r * 4.3, boxW = g * cw + (g - 1) * cgap + 14, W = Math.max(rowW + 8, boxW) + 1, cx = W / 2;
  const yD = r + .6, yb = yD + r + 1, bd = 4.6, yBox = yb + bd + 5.5, ch = k * r * 3.1 + 3.4, boxH = ch + 6, H = yBox + boxH + .5;
  let o = "";
  for (let i = 0; i < n; i++) o += `<circle cx="${f(cx - rowW / 2 + r + i * sp)}" cy="${f(yD)}" r="${r}" fill="${INK}"/>`;
  o += brace(cx - rowW / 2 - 2, cx + rowW / 2 + 2, yb, bd, 1, INK, .4) + `<path d="M${f(cx)} ${f(yb + bd)}V${f(yBox)}" stroke="${INK}" stroke-width=".4"/>`;
  o += `<rect x="${f(cx - boxW / 2)}" y="${f(yBox)}" width="${f(boxW)}" height="${f(boxH)}" rx="2.2" fill="#CFFAFE" stroke="#0891B2" stroke-width=".45"/>`;
  const x0 = cx - (g * cw + (g - 1) * cgap) / 2;
  for (let j = 0; j < g; j++) {
    const x = x0 + j * (cw + cgap);
    o += `<rect x="${f(x)}" y="${f(yBox + 3)}" width="${cw}" height="${f(ch)}" rx="1.4" fill="#fff" stroke="${INK}" stroke-width=".4"/>`;
    for (let i = 0; i < k; i++) o += `<circle cx="${f(x + cw / 2)}" cy="${f(yBox + 3 + 1.7 + r + i * r * 3.1)}" r="${r}" fill="${INK}"/>`;
  }
  return `<div class="c4p041-colw">${svgOf(W, H, o)}</div>`;
}

// ── working written line under line, with wide answer boxes (▭) ──
function workHtml(b, ctx) {
  const mdx = (s) => ctx.md(s || "").replace(/▭/g, `<span class="c4p041-wb"></span>`);
  const two = b.rows.some((r) => typeof r === "object" && r.l != null);
  const cells = b.rows.map((r) => { const o = typeof r === "string" ? { e: r } : r; return (two ? `<span class="l">${mdx(o.l)}</span>` : "") + `<span class="e">${mdx(o.e)}</span>`; }).join("");
  return `<div class="c4p041-work${b.text ? " tx" : ""}" style="grid-template-columns:${two ? "auto auto" : "auto"};--bw:${b.bw || 20}mm;${b.bh ? `--bh:${b.bh}mm;` : ""}${b.size ? `font-size:${b.size}pt;` : ""}${b.gap != null ? `row-gap:${b.gap}mm;` : ""}${b.indent ? `margin-left:${b.indent}mm;` : ""}">${cells}</div>`;
}

module.exports = {
  kinds: {
    c4p041_work: workHtml,
    c4p041_col: colHtml,
    c4p041_mex: mexHtml,
    c4p041_pair: pairHtml,
    c4p041_ladder: ladderHtml,
    c4p041_beq: beqHtml,
    c4p041_ldiv: (b, ctx) => `<div class="c4p041-colw">${ldivSvg(b, ctx)}</div>`,
    c4p041_dsteps: dstepsHtml,
    c4p041_dq: dqHtml,
    c4p041_share: shareHtml,
    c4p041_dots: dotsHtml,
    c4p041_face: (b, ctx) => {
      const p = ctx.picFile(`face-${b.who}-${b.mood || "talk"}`) || ctx.picFile(`face-${b.who}`), z = b.size || 21;
      return `<div class="c4p041-facew"><span class="c4p041-face" style="--w:${ctx.WHO[b.who]};width:${z}mm;height:${z}mm">${p ? `<img src="file://${p.file}">` : ""}</span></div>`;
    },
    // a wrapper that tightens the Class 3 steps box on a crowded page (p42): { body }
    c4p041_tight: (b, ctx, page) => `<div class="c4p041-tight">${ctx.blockHtml(b.body, page)}</div>`,
    c4p041_wbox: (b) => `<div class="c4p041-wbox" style="height:${b.h || 22}mm"></div>`,
  },
  css: `
svg.c4p041-svg { display: block; overflow: visible }
.c4p041-colw { display: flex; justify-content: center; align-items: flex-start } .c4p041-colw.left { justify-content: flex-start }
.c4p041-labs { position: relative; flex: none; margin-right: 1mm }
.c4p041-lab { position: absolute; right: 0; transform: translateY(-50%); display: flex; align-items: center; gap: 1.4mm; white-space: nowrap; font: 700 12.5pt/1.2 'Baloo Da 2' }
.c4p041-lab.bx .lt { border: .5mm solid var(--c); border-radius: 1.8mm; padding: .5mm 2.4mm .1mm; background: #fff; box-shadow: 0 .6mm 0 var(--s) }
.c4p041-lab .abox { width: 7.4mm; height: 6.4mm; vertical-align: -1.8mm }
svg.c4p041-arr { display: block; flex: none }
.c4p041-mex { display: grid; gap: 2.6mm 3mm; align-items: start; justify-items: center }
.c4p041-mx { display: flex; align-items: flex-start; gap: 1.4mm }
.c4p041-mk { font: 800 12.5pt/1.4 'Baloo Da 2'; color: #EA580C; white-space: nowrap }
.c4p041-beq { align-self: center; display: flex; justify-content: center; border-radius: 4mm; padding: 2mm 4mm; border: .5mm solid #FACC15; background: #FEF9C3; box-shadow: 0 1mm 0 #FDE68A }
.c4p041-beq.t-teal { border-color: #5EEAD4; background: #F0FDFA; box-shadow: 0 1mm 0 #CCFBF1 }
.c4p041-ds { display: flex; flex-direction: column; gap: 2.4mm; border: .6mm solid var(--c); border-radius: 6mm; background: #fff; padding: 3mm 3.4mm; box-shadow: 0 1.2mm 0 var(--s) }
.dense .c4p041-ds { gap: 1.4mm; padding: 2.2mm 3mm }
.c4p041-dstep { display: flex; align-items: center; gap: 3mm }
.c4p041-dsv { flex: none; display: flex; justify-content: center } svg.c4p041-big { flex: none; display: block }
.c4p041-tb { flex: 1; border-radius: 4mm; padding: 2mm 4mm 1.8mm; border: .5mm solid; font: 600 12pt/1.5 'Noto Sans Bengali' }
.c4p041-tb.t-green { background: #ECFCCB; border-color: #A3E635 } .c4p041-tb.t-yellow { background: #FEF9C3; border-color: #FACC15 }
.c4p041-tb.t-pink { background: #FCE7F3; border-color: #F9A8D4 } .c4p041-tb.t-blue { background: #E0F2FE; border-color: #7DD3FC }
.c4p041-dq { display: grid; gap: 2.4mm 3mm; padding-left: 2mm } .c4p041-dqi { display: flex; align-items: flex-end; gap: 1.6mm }
.c4p041-share { width: 100%; border-collapse: separate; border-spacing: 0; border: .6mm solid var(--c); border-radius: 4mm; overflow: hidden; background: #fff }
.c4p041-share td { border-top: .4mm solid var(--s); padding: 2mm 3mm; vertical-align: middle } .c4p041-share tr:first-child td { border-top: 0 }
.c4p041-share td.r { width: 52mm; border-left: .4mm solid var(--s); background: color-mix(in srgb, var(--s) 45%, #fff); font: 600 12pt/1.5 'Noto Sans Bengali' }
.c4p041-pills { display: flex; flex-wrap: wrap; gap: 2mm 3mm; align-items: center }
.c4p041-pill { display: inline-flex; gap: .5mm; padding: 1mm 2.4mm; background: #FEF08A; border: .45mm solid #A16207; border-radius: 99px }
.c4p041-rest { display: inline-flex; gap: .5mm; padding: 1mm 1.6mm; background: #BAE6FD; border: .45mm solid #0369A1; border-radius: 1mm }
.c4p041-mb { display: inline-flex; align-items: center; justify-content: center } .c4p041-mb img { max-width: 100%; max-height: 100%; object-fit: contain }
.c4p041-mb .em { font-family: 'Noto Color Emoji'; font-style: normal; line-height: 1 }
.c4p041-facew { display: flex; justify-content: center }
.c4p041-face { display: block; flex: none; border-radius: 50%; overflow: hidden; background: #fff; border: .8mm solid #fff; box-shadow: 0 0 0 .7mm var(--w), 0 1mm 0 .7mm color-mix(in srgb, var(--w) 35%, transparent) }
.c4p041-face img { width: 100%; height: 100%; object-fit: cover; display: block }
.c4p041-work { display: grid; column-gap: 2mm; row-gap: 2.2mm; align-items: center; align-self: flex-start; font: 700 13pt/1.3 'Baloo Da 2' }
.c4p041-work .l { text-align: right; white-space: nowrap; color: var(--d) } .c4p041-work .e { white-space: nowrap } .c4p041-work.tx { font: 500 12.5pt/1.4 'Noto Sans Bengali' }
.c4p041-wb { display: inline-block; width: var(--bw); height: var(--bh, 7.4mm); vertical-align: -2.2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
.c4p041-colw > .c4p041-mk { margin-right: 2mm }
.c4p041-tight .c3p051-tb { padding: 1.3mm 3.4mm 1.1mm; line-height: 1.38 } .c4p041-tight .c3p051-tb p + p { margin-top: .2mm } .c4p041-tight .c3p051-tb .ti { line-height: 1.2 }
.c4p041-tight .c3p051-steps { padding: 2.4mm 3mm }
.c4p041-mex .c4p041-mk { font-size: 11.5pt }
.c4p041-wbox { border: .6mm solid #FBBF24; border-radius: 3mm; background: #fff repeating-linear-gradient(transparent 0 8.4mm, #FDE68A 8.4mm 8.7mm) }
`,
};
