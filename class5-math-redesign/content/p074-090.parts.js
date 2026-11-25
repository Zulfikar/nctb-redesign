// Printed pages 74–90's own kinds (prefixed c5p074_, classes c5p074-): chapter ৫ দশমিক ভগ্নাংশ, its second part (× and ÷ of
// decimals, দেখি পারি কি না, নিজে করি). Written by a helper (25 Nov 2026). Every digit, decimal point, rule, arrow, box and
// tick is drawn here by code. Units: mm.
//
// The cells: a number is written one digit to a cell, and its decimal point sits ON THE LINE BETWEEN two cells (after the digit
// it follows), so the points of a column sum or a long division line up exactly. In every row string:
//   a digit · "□" an empty answer box · "_" or " " an empty cell · "." the decimal point after the digit before it ·
//   "~" strikes out the next digit (p77's ৪.৯~০~০) · "{3}" one empty box three cells wide (p85's empty long division) ·
//   a leading "×" (or ÷ + −) the row's sign.
//
//   c5p074_mul    a multiplication in columns (pp75–77): { rows, fs?, cw?, rh?, opFar?, opCol?, vline?, right?, join?, up?,
//                 under?, ans?, box? }
//                 rows: strings (right-aligned: the last cell is the ones), "-" a rule under the row before. Rows after the
//                 last rule are the answer (orange; ans: false keeps them dark). opFar: the sign at the far left (p75, p76); opCol: in
//                 that column (from the right, 0 = the ones).
//                 vline: k — the red line from the first row's point down to the answer's, k cells from the right (pp75–76).
//                 right: a label in a blue box beside each row (null for none); join: { rows: [a, b], to, text } the blue
//                 bracket from rows a and b's labels to row to's, with its box (p77's "যোগফল"). up: k — a pink arrow under the
//                 answer pointing up at k cells from the right (k + .5 = a cell's middle); under: lines of text under it.
//                 box: "dot" (the book's dotted frame) | "line" (a plain frame, p77 কাজ ৭).
//   c5p074_ld     a long division with decimal points (pp80–86): { d, n, q?, rows?, lines?, arrows?, hl?, hops?, fs?, cw?, rh?,
//                 cwd?, minRows?, box? }
//                 n, q and rows are written from the dividend's first cell (left-aligned; "_" skips a cell); d (the divisor)
//                 ends at the bracket. lines: [i] a rule under work row i. arrows: [{ col, to }] the red arrow bringing n's
//                 cell col down to work row to. hl: [[c0, c1, r0, r1, "pink" | "blue"]] a coloured band over cells c0…c1 of
//                 rows r0…r1 (row 0 = the quotient, 1 = the dividend, 2… = the work rows). hops: [{ on: "d" | "n", from, to,
//                 label }] p85's red hop of the decimal point from boundary from to boundary to (boundary k = before cell k).
//                 cwd: the divisor's cell width (tighter than the dividend's, wider when it has a point); minRows: the
//                 height of that many work rows (so the book's steps stand the same height); box: "dot" the dotted frame.
//   c5p074_tape   p74: the packets' tape over the number line { n, top, unit, cap, w }
//   c5p074_share  pp78–79: the yellow panel of a share: a bracket of `parts` parts over a number line, the first part's box
//                 { parts, title, right, box: "" | "?", dots, labels: [[at, text]], cap, w }
//   c5p074_scale  pp78–79: the little scale in a speech bubble { n, major?, top, arc?, bottom, w }
//   c5p074_shift  pp76, 82: the digits' cells moving past the decimal point { rows, blue, dots, arcs: [[label, from, to]] }
//   c5p074_rod    p83: the iron rod on its two scales (০–১২ কেজি, ০–২.৪ মি)
//   c5p074_dline  p85: the paint's double number line (ওজন, আয়তন)
//   c5p074_ratio  pp83–84: rows of numbers with arrows and ×/÷ tags between them
//                 { cols: [mm…], rows: [[cell…] | { steps: { col: { dir, tone, label, shape } | "‖" } }], tone? }
//   c5p074_idea   p83: a coloured tab ("রাফির ধারণা") over a box of lines { tab, tone: "rafi" | "tuli", body: [line | block] }
//   c5p074_lines  lines of working, a line starting with "»" indented (p83) { lines, size? }
//   c5p074_nl     p89: a number line in thousandths { from, to, labels: { at: text }, mid: [at…], w }
//   c5p074_cards  p87: number cards in a row { items }
//   c5p074_dbox   p87: a yellow strip of boxes with a decimal point after the first { n }
//   c5p074_eq     pp74, 78, 79: the blue arrow and the rounded sum with its big box { text, arrow? }
//   c5p074_grid   a bordered table whose cells hold blocks { cols: [%…], rows: [[cell…]], look?: "split" (only the line
//                 between the columns, p78), bw?, lw? } — a cell is a block, a list of blocks or { b, bg, span, align }
//   c5p074_work   working in two columns, a label and its sum { rows: [[l, e]], lw?, gap?, size? }
//   c5p074_x      renders a block (or a list) and draws its marks: ▭ a wide box (--bw), ▬ a long box (--lw), → an arrow,
//                 ∴ three dots, ⇨ the book's fat blue arrow { b, bw?, lw?, gap?, indent?, fs? (the lines' size, pt) }
const INK = "#1E2433", RED = "#DC2626", ANS = "#C2410C", AMB = "#F59E0B", AMBF = "#FFFBEB", MAG = "#E6007E", NAVY = "#1E40AF";
const HL = { pink: "#FBCFE8", blue: "#BAE6FD" };
const f2 = (x) => Math.round(x * 100) / 100;
const T = (x, y, s, fs, o = {}) => `<text x="${f2(x)}" y="${f2(y)}" text-anchor="${o.a || "middle"}" font-family="${o.font || "Baloo Da 2"}" font-weight="${o.w || 700}" font-size="${f2(fs)}" fill="${o.fill || INK}">${s}</text>`;
const TB = (x, y, s, fs, o = {}) => T(x, y, s, fs, { font: "Noto Sans Bengali", w: 600, ...o });
const svgOf = (W, H, inner, cls = "c5p074-svg") => `<svg class="${cls}" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${inner}</svg>`;
function head(x2, y2, ux, uy, col, hl = 1.5, hw = .8) {
  const bx = x2 - ux * hl, by = y2 - uy * hl;
  return `<path d="M${f2(x2)} ${f2(y2)}L${f2(bx - uy * hw)} ${f2(by + ux * hw)}L${f2(bx + uy * hw)} ${f2(by - ux * hw)}Z" fill="${col}"/>`;
}
function arrow(x1, y1, x2, y2, col, sw = .4, hl = 1.5, hw = .8) {
  const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
  return `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2 - ux * hl * .9)} ${f2(y2 - uy * hl * .9)}" stroke="${col}" stroke-width="${sw}" fill="none"/>${head(x2, y2, ux, uy, col, hl, hw)}`;
}
// a quadratic curve from (x1, y1) through control (cx, cy) to (x2, y2), with a head at the end
function curve(x1, y1, cx, cy, x2, y2, col, sw = .4, hl = 1.6, hw = .85) {
  const dx = x2 - cx, dy = y2 - cy, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
  return `<path d="M${f2(x1)} ${f2(y1)}Q${f2(cx)} ${f2(cy)} ${f2(x2 - ux * hl * .8)} ${f2(y2 - uy * hl * .8)}" stroke="${col}" stroke-width="${sw}" fill="none"/>${head(x2, y2, ux, uy, col, hl, hw)}`;
}
const box = (x, y, w, h, o = {}) => `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" rx="${f2(o.rx ?? Math.min(w, h) * .18)}" fill="${o.fill || AMBF}" stroke="${o.stroke || AMB}" stroke-width="${o.sw || .45}"/>`;
const dot = (x, y, r, col = INK) => `<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(r)}" fill="${col}"/>`;

// a row string → its sign and cells ({ ch, pt, strike, k })
function cellsOf(s0) {
  let s = String(s0 ?? ""), op = "";
  const m = s.match(/^([×÷+−])\s*/);
  if (m) { op = m[1]; s = s.slice(m[0].length); }
  const cells = []; let strike = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === ".") { if (cells.length) cells[cells.length - 1].pt = true; continue; }
    if (ch === "~") { strike = true; continue; }
    if (ch === "{") { const j = s.indexOf("}", i), k = +s.slice(i + 1, j) || 2; cells.push({ ch: "▭", k }); for (let t = 1; t < k; t++) cells.push({ ch: "", skip: true }); i = j; continue; }
    cells.push({ ch: ch === "_" || ch === " " ? "" : ch, strike });
    strike = false;
  }
  return { op, cells };
}
// draws one cell's content: its left edge at x, the row's top at y
function cellSvg(c, x, y, cw, rh, fs, fill, w = 700) {
  if (!c.ch || c.skip) return "";
  if (c.ch === "□") return box(x + cw * .08, y + rh * .1, cw * .84, rh * .8);
  if (c.ch === "▭") return box(x + .5, y + rh * .1, c.k * cw - 1, rh * .8);
  return T(x + cw / 2, y + rh / 2 + fs * .36, c.ch, fs, { fill, w });
}

// ── a multiplication in columns ──
function mulHtml(b, ctx) {
  const fs = b.fs || 5.2, cw = b.cw || fs * 1.02, rh = b.rh || fs * 1.36;
  const lines = [];
  for (const r of b.rows) { if (r === "-") { if (lines.length) lines[lines.length - 1].rule = true; continue; } lines.push(cellsOf(r)); }
  const lastRule = lines.map((l) => !!l.rule).lastIndexOf(true);
  const maxD = Math.max(...lines.map((l) => l.cells.length));
  const N = Math.max(maxD, ...lines.map((l) => l.cells.length + (l.op && !b.opFar ? 1 : 0)));
  const lw = b.right ? (b.lw || 17) : 0, join = b.join ? 24 : 0;
  const X0 = .6, XR = X0 + N * cw, Y0 = .4;
  const yT = (i) => Y0 + i * rh, base = (i) => yT(i) + rh / 2 + fs * .36, yM = (i) => yT(i) + rh / 2;
  let W = XR + 1 + (lw ? 3 + lw : 0) + join, H = yT(lines.length) + .6;
  const upH = b.up != null ? 11 : 0;
  H += upH;
  let g = "";
  lines.forEach((l, i) => {
    const L = l.cells.length, ans = lastRule >= 0 && i > lastRule && b.ans !== false, col = ans ? ANS : INK;
    l.cells.forEach((c, j) => {
      const x = XR - (L - j) * cw;
      g += cellSvg(c, x, yT(i), cw, rh, fs, col, i === 0 || ans ? 800 : 700);
      if (c.pt) g += dot(x + cw, base(i) - fs * .06, fs * .075, col);
    });
    // struck digits: one pink line through the run
    const st = l.cells.map((c, j) => c.strike ? j : -1).filter((j) => j >= 0);
    if (st.length) { const xa = XR - (L - st[0]) * cw + cw * .1, xb = XR - (L - st[st.length - 1] - 1) * cw - cw * .1; g += `<path d="M${f2(xa)} ${f2(base(i) - fs * .3)}H${f2(xb)}" stroke="${MAG}" stroke-width=".45"/>`; }
    if (l.op) { const c = b.opCol != null ? b.opCol : b.opFar ? maxD - 1 : L; g += T(XR - (c + .5) * cw, base(i), l.op, fs * .95, { fill: RED, w: 600 }); }
    if (l.rule) g += `<path d="M${f2(X0 - .4)} ${f2(yT(i + 1))}H${f2(XR + .4)}" stroke="${INK}" stroke-width=".5"/>`;
    if (b.right && b.right[i]) {
      const bx = XR + 3, bh = rh * .78;
      g += `<rect x="${f2(bx)}" y="${f2(yM(i) - bh / 2)}" width="${lw}" height="${f2(bh)}" fill="#BAE6FD" stroke="${INK}" stroke-width=".35"/>` + TB(bx + lw / 2, yM(i) + fs * .24, ctx.esc(b.right[i]), fs * .66);
    }
  });
  if (b.join) {
    const [a, c] = b.join.rows, to = b.join.to, xe = XR + 3 + lw, x1 = xe + 4, x2 = xe + 13, ym = (yM(a) + yM(c)) / 2;
    g += `<path d="M${f2(xe)} ${f2(yM(a))}H${f2(x1)}V${f2(yM(c))}H${f2(xe)}M${f2(x1)} ${f2(ym)}H${f2(x2)}V${f2(yM(to))}H${f2(xe)}" fill="none" stroke="${NAVY}" stroke-width=".45"/>`;
    const tw = 17, th = rh * .8, ty = (ym + yM(to)) / 2 - th / 2;
    g += `<rect x="${f2(x2 - tw / 2)}" y="${f2(ty)}" width="${tw}" height="${f2(th)}" fill="#BAE6FD" stroke="${INK}" stroke-width=".35"/>` + TB(x2, ty + th / 2 + fs * .24, ctx.esc(b.join.text), fs * .66);
  }
  if (b.vline != null) {
    const x = XR - b.vline * cw, ia = lines.length - 1;
    g += `<path d="M${f2(x)} ${f2(base(0) + .5)}V${f2(base(ia) - fs * .62)}" stroke="${RED}" stroke-width=".42"/>` + head(x, base(ia) - fs * .12, 0, 1, RED, 1.9, .95);
  }
  if (b.up != null) {
    const x = XR - b.up * cw, y1 = yT(lines.length) + upH - .3, y2 = yT(lines.length) + .8;
    g += arrow(x, y1, x, y2, MAG, .45, 2.2, 1.1);
  }
  const s = svgOf(W, H, g, "c5p074-svg c5p074-mul");
  const under = b.under ? `<div class="c5p074-under" style="min-width:${f2(W)}mm">${b.under.map((t) => `<div>${ctx.md(t)}</div>`).join("")}</div>` : "";
  const inner = `<div class="c5p074-mw">${s}${under}</div>`;
  return b.box ? `<div class="c5p074-box ${b.box}">${inner}</div>` : inner;
}

// ── a long division with decimal points ──
function ldHtml(b, ctx) {
  const fs = b.fs || 5, cw = b.cw || fs * 1.04, rh = b.rh || fs * 1.3, cwd = b.cwd || (/[.{]/.test(b.d) ? fs * .92 : fs * .74);
  const dv = cellsOf(b.d).cells, nd = cellsOf(b.n).cells, q = cellsOf(b.q).cells, rows = (b.rows || []).map((r) => cellsOf(r).cells);
  const N = Math.max(nd.length, q.length, ...rows.map((r) => r.length), b.cols || 0);
  const dW = dv.length * cwd, X0 = .6 + dW + 2.8, XR = X0 + N * cw + .6, Y0 = .4;
  const R = 2 + Math.max(rows.length, b.minRows || 0), yT = (r) => Y0 + r * rh, yB = (r) => yT(r + 1), base = (r) => yT(r) + rh / 2 + fs * .36;
  const hopH = b.hops ? 5.6 : 0, W = XR + .6, H = yT(R) + .5 + hopH;
  let g = "";
  for (const [c0, c1, r0, r1, tone] of b.hl || []) g += `<rect x="${f2(X0 + c0 * cw)}" y="${f2(yT(r0))}" width="${f2((c1 - c0 + 1) * cw)}" height="${f2((r1 - r0 + 1) * rh)}" fill="${HL[tone || "pink"]}"/>`;
  const put = (cells, r, x0, w, fill, wt) => cells.forEach((c, j) => {
    g += cellSvg(c, x0 + j * w, yT(r), w, rh, fs, fill, wt);
    if (c.pt) g += dot(x0 + (j + 1) * w, base(r) - fs * .06, fs * .075, fill);
  });
  // the bar over the dividend and the bracket
  const yo = yT(1) + .2;
  g += `<path d="M${f2(X0 - 1.6)} ${f2(yo)}H${f2(XR)}" stroke="${INK}" stroke-width=".48"/>`;
  g += `<path d="M${f2(X0 - 2.4)} ${f2(yo + .2)}Q${f2(X0 - .2)} ${f2(yT(1) + rh / 2)} ${f2(X0 - 2.4)} ${f2(yB(1) - .2)}" fill="none" stroke="${INK}" stroke-width=".48"/>`;
  put(dv, 1, X0 - 2.6 - dW, cwd, INK, 800);
  put(nd, 1, X0, cw, INK, 800);
  put(q, 0, X0, cw, b.qcol || "var(--d)", 800);
  rows.forEach((cs, i) => put(cs, i + 2, X0, cw, INK, 700));
  for (const i of b.lines || []) g += `<path d="M${f2(X0 - .8)} ${f2(yB(i + 2))}H${f2(XR)}" stroke="${INK}" stroke-width=".45"/>`;
  for (const a of b.arrows || []) { const x = X0 + (a.col + .5) * cw; g += arrow(x, yB(1) + .3, x, yT(a.to + 2) + .5, RED, .38, 1.5, .75); }
  for (const h of b.hops || []) {
    const x0 = h.on === "d" ? X0 - 2.6 - dW : X0, w = h.on === "d" ? cwd : cw, xa = x0 + h.from * w, xb = x0 + h.to * w, y = base(1) + .6;
    g += curve(xa - .2, y, (xa + xb) / 2 - (xb - xa) * .1, y + 4.4, xb + .2, y - .6, RED, .32, 1.3, .65);
    if (h.label) g += T((xa + xb) / 2, yB(1) + hopH - .2, ctx.esc(h.label), fs * .6, { fill: RED, w: 600 });
  }
  const s = svgOf(W, H, g, "c5p074-svg c5p074-ld");
  return b.box ? `<div class="c5p074-box ${b.box}">${s}</div>` : `<div class="c5p074-mw">${s}</div>`;
}

// ── p74: the four packets' tape over the number line ──
function tapeSvg(b, ctx) {
  const n = b.n || 4, W = b.w || 96, pad = 5, bw = (W - 2 * pad) / n, H = 33, y0 = 2, bh = 12, yl = 18.5;
  let g = `<rect x=".3" y=".3" width="${f2(W - .6)}" height="${f2(H - .6)}" rx="4" fill="#FEF08A" stroke="${INK}" stroke-width=".35"/>`;
  for (let i = 0; i < n; i++) {
    const x = pad + i * bw;
    g += `<rect x="${f2(x)}" y="${y0}" width="${f2(bw)}" height="${bh}" fill="#fff" stroke="${INK}" stroke-width=".45"/>`;
    g += T(x + bw / 2, y0 + 5, ctx.esc(b.top), 4.2) + TB(x + bw / 2, y0 + 10.4, ctx.esc(b.unit), 3.9);
  }
  g += `<path d="M${pad} ${yl}H${f2(W - pad)}" stroke="${INK}" stroke-width=".4"/>`;
  for (let i = 0; i <= n; i++) g += dot(pad + i * bw, yl, .75) + T(pad + i * bw, yl + 5.2, ctx.bn(i), 4.2);
  g += TB(W / 2, H - 2.6, ctx.esc(b.cap), 4);
  return svgOf(W, H, g);
}

// ── pp78–79: the share panel: a bracket of `parts` parts over the number line, the first part asked ──
function shareSvg(b, ctx) {
  const W = b.w || 66, H = b.h || 40, x0 = 6, x1 = W - (b.rpad || 12), parts = b.parts, pw = (x1 - x0) / parts;
  const yB = 19, yL = 23.5, X = (t) => x0 + t * (x1 - x0);
  let g = `<rect x="0" y="0" width="${W}" height="${H}" rx="2.5" fill="#FEF08A"/>`;
  g += TB((x0 + x1) / 2, 6.2, ctx.esc(b.title), 4.2) + TB(x1 + (b.rshift || 0), 9.2, ctx.esc(b.right), 4.2, { a: "middle" });
  // the bracket: a line with the parts' ticks rising from it
  g += `<path d="M${f2(x0)} ${f2(yB - 4)}V${yB}H${f2(x1)}V${f2(yB - 4)}" fill="none" stroke="${INK}" stroke-width=".45"/>`;
  for (let i = 1; i < parts; i++) g += `<path d="M${f2(x0 + i * pw)} ${yB}V${f2(yB - 3)}" stroke="${INK}" stroke-width=".4"/>`;
  // the first part's dotted arc and its box
  g += `<path d="M${f2(x0)} ${f2(yB - 4.2)}Q${f2(x0 + pw / 2)} ${f2(yB - 10.6)} ${f2(x0 + pw)} ${f2(yB - 4.2)}" fill="none" stroke="${INK}" stroke-width=".25" stroke-dasharray=".5 .5"/>`;
  const bs = 4.2, bx = x0 + pw / 2 - bs / 2, by = yB - 9.2;
  g += `<rect x="${f2(bx)}" y="${f2(by)}" width="${bs}" height="${bs}" fill="#fff" stroke="${INK}" stroke-width=".35"/>`;
  if (b.box) g += T(bx + bs / 2, by + bs - .9, ctx.esc(b.box), 3.6, { font: "Noto Sans Bengali", w: 600 });
  // the number line and its dots
  g += `<path d="M${f2(x0)} ${yL}H${f2(x1)}" stroke="${INK}" stroke-width=".45"/>`;
  const nd = b.dots || parts;
  for (let i = 0; i <= nd; i++) g += dot(x0 + i * (x1 - x0) / nd, yL, .6);
  for (const [t, s] of b.labels) g += T(X(t / parts) + (s.length > 2 ? (s.length - 1) * .9 : 0), yL + 5.4, ctx.esc(s), 4, { font: /[ক-হ]/.test(s) ? "Noto Sans Bengali" : "Baloo Da 2", w: 600 });
  g += TB((x0 + x1) / 2, H - 3, ctx.esc(b.cap), 4);
  return svgOf(W, H, g);
}

// ── pp78–79: the little scale in a bubble ──
function scaleSvg(b, ctx) {
  const n = b.n, W = b.w || 64, x0 = 1, x1 = W - 1, step = (x1 - x0) / n, yb = 8, H = 15.5, major = b.major || 1;
  let g = `<path d="M${x0} ${yb}H${f2(x1)}" stroke="${INK}" stroke-width=".4"/>`;
  for (let i = 0; i <= n; i++) { const big = i % major === 0; g += `<path d="M${f2(x0 + i * step)} ${yb}V${f2(yb - (big ? 3.2 : 1.8))}" stroke="${INK}" stroke-width=".35"/>`; }
  g += T(x0 + step / 2 + (b.arc ? 0 : 1.6), b.arc ? 2.5 : 3.4, ctx.esc(b.top), b.arc ? 2.6 : 3.6, { w: 600 });
  if (b.arc) g += `<path d="M${x0} ${f2(yb - 1.6)}Q${f2(x0 + step / 2)} ${f2(yb - 5.4)} ${f2(x0 + step)} ${f2(yb - 1.6)}" fill="none" stroke="${INK}" stroke-width=".2" stroke-dasharray=".4 .4"/>`;
  g += `<path d="M${x0} ${f2(yb + .6)}Q${f2(W / 2)} ${f2(yb + 4.6)} ${f2(x1)} ${f2(yb + .6)}" fill="none" stroke="${INK}" stroke-width=".22" stroke-dasharray=".5 .5"/>`;
  g += T(W / 2, H - .6, ctx.esc(b.bottom), 3.6, { w: 600 });
  return svgOf(W, H, g);
}

// ── pp76, 82: the digits' cells and the decimal point moving ──
function shiftSvg(b, ctx) {
  const cw = b.cw || 13, ch = 6.6, gap = 4.6, x0 = 3, y0 = 3, rows = b.rows, n = rows[0].length;
  const W = x0 + n * cw + 44, H = y0 + rows.length * ch + (rows.length - 1) * gap + 3;
  const yT = (r) => y0 + r * (ch + gap), xr = x0 + n * cw;
  let g = `<rect x=".3" y=".3" width="${f2(W - .6)}" height="${f2(H - .6)}" rx="3.4" fill="#FEF9C3" stroke="${INK}" stroke-width=".35"/>`;
  rows.forEach((r, i) => r.forEach((s, j) => {
    const fill = j < b.blue[i] ? (i === 0 ? "#A5DCE4" : "#BAE6FD") : "#FBCFE8";
    g += `<rect x="${f2(x0 + j * cw)}" y="${f2(yT(i))}" width="${cw}" height="${ch}" fill="${fill}" stroke="${INK}" stroke-width=".3"/>`;
    if (s) g += T(x0 + (j + .5) * cw, yT(i) + ch / 2 + 1.5, ctx.esc(s), 4.2);
  }));
  const P = b.dots.map((k, i) => [x0 + k * cw, yT(i) + ch * .72]);
  for (let i = 0; i + 1 < P.length; i++) g += arrow(P[i][0], P[i][1], P[i + 1][0], P[i + 1][1] - .2, "#3F51B5", .42, 1.7, .8);
  for (const [x, y] of P) g += dot(x, y, .55);
  // the curved arrows on the right, from row a to row c
  for (const [label, a, c] of b.arcs) {
    const far = c - a > 1, ya = yT(a) + ch * (far ? .15 : .5), yc = yT(c) + ch * (far ? .85 : .5), bulge = far ? 46 : 15;
    g += curve(xr + (far ? 3.5 : 1.5), ya, xr + bulge, (ya + yc) / 2, xr + 1.2, yc, "#3F51B5", .42, 1.7, .85);
    g += T(far ? xr + 26.5 : xr + 9.6, (ya + yc) / 2 + 1.5, ctx.esc(label), 4, { w: 600, a: "start" });
  }
  return svgOf(W, H, g);
}

// ── p83: the iron rod on its two scales ──
function rodSvg(b, ctx) {
  const W = 70, H = 33, x0 = 6, u = 22.5, X = (m) => x0 + m * u, xe = X(2.4), yR = 13, rh = 5.2, yL = 23;
  let g = `<rect x="0" y="0" width="${W}" height="${H}" rx="5" fill="#FBCFE8"/>`;
  g += T(x0, 6, "০", 3.6, { w: 600 }) + TB(xe + 2, 6, "১২ (কেজি)", 3.6);
  for (const x of [X(0), xe]) g += `<path d="M${f2(x)} 8V${yL}" stroke="${INK}" stroke-width=".2" stroke-dasharray=".5 .5"/>`;
  g += `<rect x="${f2(X(0))}" y="${f2(yR - rh / 2)}" width="${f2(xe - X(0))}" height="${rh}" rx="1" fill="#8B7FC4" stroke="${INK}" stroke-width=".35"/>`;
  g += `<ellipse cx="${f2(xe)}" cy="${yR}" rx="1.1" ry="${f2(rh / 2)}" fill="#2B2440"/>`;
  for (const m of [1, 2]) g += `<path d="M${f2(X(m))} ${f2(yR - rh / 2)}V${f2(yR + rh / 2)}" stroke="${INK}" stroke-width=".2" stroke-dasharray=".5 .5"/>`;
  g += `<path d="M${f2(X(0))} ${yL}H${f2(xe)}" stroke="${INK}" stroke-width=".4"/>`;
  for (const m of [0, 1, 2, 2.4]) g += dot(X(m), yL, .55);
  g += T(X(0), yL + 5.2, "০", 3.6, { w: 600 }) + T(X(1), yL + 5.2, "১", 3.6, { w: 600 }) + T(X(2) - .6, yL + 5.2, "২", 3.6, { w: 600 }) + TB(xe + 3.4, yL + 5.2, "২.৪ (মি)", 3.6);
  return svgOf(W, H, g);
}

// ── p85: the paint's double number line ──
function dlineSvg(b, ctx) {
  const W = 66, H = 37, x0 = 7, u = 23, X = (l) => x0 + l * u, y1 = 16, y2 = 24.5;
  let g = `<rect x="0" y="0" width="${W}" height="${H}" rx="5" fill="#FBCFE8"/>`;
  g += TB(W / 2, 4.6, "ওজন", 3.4) + T(x0 - 1.4, 10.6, "০", 3.4, { w: 600 });
  g += `<rect x="${f2(X(1) - 3)}" y="7.2" width="6" height="5.2" fill="#fff" stroke="${INK}" stroke-width=".35"/>` + TB(X(1), 11.3, "?", 3.8);
  g += TB(X(1.6) + 2.6, 12, "২.৪ কেজি", 3.3);
  for (const [y, ds] of [[y1, [0, 2]], [y2, [0, 1, 2]]]) { g += `<path d="M${f2(X(0))} ${y}H${f2(X(2))}" stroke="${INK}" stroke-width=".42"/>`; for (const l of ds) g += dot(X(l), y, .6); }
  for (const l of [1, 1.6]) g += `<path d="M${f2(X(l))} ${y1}V${y2}" stroke="${INK}" stroke-width=".22" stroke-dasharray=".45 .45"/>`;
  g += T(x0 - 1.4, y2 + 5, "০", 3.4, { w: 600 }) + T(X(1) - .4, y2 + 5, "১", 3.4, { w: 600 }) + T(X(1.6) - .3, y2 + 5, "১.৬", 3.4, { w: 600 }) + TB(X(2) + 3.6, y2 + 5, "২ (লি)", 3.4);
  g += TB(W / 2, H - 2, "আয়তন", 3.4);
  return svgOf(W, H, g);
}

// ── pp83–84: rows of numbers with arrows and ×/÷ tags between them ──
const STEPC = { blue: ["#7DD3FC", "#0284C7"], pink: [MAG, MAG] };
function stepHtml(s, ctx) {
  if (s === "‖") return `<span class="c5p074-eqv">‖</span>`;
  const [fill, stroke] = STEPC[s.tone || "blue"], up = s.dir === "up";
  const a = `<svg class="c5p074-sa" width="2.6mm" height="11mm" viewBox="0 0 2.6 11">${up
    ? `<path d="M1.3 0L2.6 2.6H1.75V11H.85V2.6H0Z" fill="${fill}" stroke="${stroke}" stroke-width=".12"/>`
    : `<path d="M1.3 11L2.6 8.4H1.75V0H.85V8.4H0Z" fill="${fill}" stroke="${stroke}" stroke-width=".12"/>`}</svg>`;
  return `<span class="c5p074-st">${a}<span class="c5p074-tag ${s.shape || "oval"}">${xmd(ctx, s.label)}</span></span>`;
}
function ratioHtml(b, ctx) {
  const cols = b.cols.map((w) => w ? `${w}mm` : "auto").join(" ");
  const cells = b.rows.map((r) => Array.isArray(r)
    ? r.map((c) => `<span class="c5p074-rv">${xmd(ctx, c)}</span>`).join("")
    : b.cols.map((_, j) => `<span class="c5p074-rs">${r.steps[j] ? stepHtml(r.steps[j], ctx) : ""}</span>`).join("")).join("");
  return `<div class="c5p074-ratio ${b.tone || "yellow"}" style="grid-template-columns:${cols}${b.size ? `;font-size:${b.size}pt` : ""}">${cells}</div>`;
}

// ── p89: a number line in thousandths ──
function nlSvg(b, ctx) {
  const n = b.to - b.from, W = b.w || 160, x0 = 3, step = (W - 8) / (n + 1), y = 13, H = 15;
  let g = `<path d="M0 ${y}H${W}" stroke="${INK}" stroke-width=".4"/>`;
  for (let i = 0; i <= n; i++) {
    const v = b.from + i, x = x0 + (i + .5) * step, big = b.labels[v] != null, mid = (b.mid || []).includes(v);
    g += `<path d="M${f2(x)} ${y}V${f2(y - (big ? 6.6 : mid ? 4.6 : 3))}" stroke="${INK}" stroke-width="${big ? .38 : .3}"/>`;
    if (big) g += T(x, 4.4, ctx.esc(b.labels[v]), 3.8, { w: 600 });
  }
  return svgOf(W, H, g);
}

// the marks drawn in text: ▭ ▬ → ∴ ⇨ (after the core's markup)
const ARR_SVG = `<svg class="c5p074-ar" width="6.2mm" height="2.6mm" viewBox="0 0 6.2 2.6"><path d="M0 1.3H4.8" stroke="${INK}" stroke-width=".42"/><path d="M6.2 1.3L4 .1V2.5Z" fill="${INK}"/></svg>`;
const THEREFORE = `<svg class="c5p074-tf" width="3.4mm" height="3.2mm" viewBox="0 0 3.4 3.2"><circle cx="1.7" cy=".7" r=".52" fill="${INK}"/><circle cx=".6" cy="2.5" r=".52" fill="${INK}"/><circle cx="2.8" cy="2.5" r=".52" fill="${INK}"/></svg>`;
const FAT = `<svg class="c5p074-fat" width="9mm" height="6mm" viewBox="0 0 9 6"><path d="M0 1.8H5.4V0L9 3L5.4 6V4.2H0Z" fill="#22B8E6"/></svg>`;
const marks = (h) => h.replace(/▭/g, `<span class="c5p074-wb"></span>`).replace(/▬/g, `<span class="c5p074-lb"></span>`)
  .replace(/→/g, ARR_SVG).replace(/∴/g, THEREFORE).replace(/⇨/g, FAT).replace(/‖/g, `<span class="c5p074-eqv">‖</span>`);
const lineHtml = (ctx, x) => /^»/.test(x) ? `<p class="c5p074-il in">${xmd(ctx, x.replace(/^»\s*/, ""))}</p>` : `<p class="c5p074-il">${xmd(ctx, x)}</p>`;
const xmd = (ctx, s) => marks(ctx.md(String(s ?? "")).replace(/\[([^\]\[]+)\]/g, `<span class="c5p074-vb">$1</span>`));

module.exports = {
  kinds: {
    c5p074_mul: mulHtml,
    c5p074_ld: ldHtml,
    c5p074_tape: (b, ctx) => `<div class="c5p074-c">${tapeSvg(b, ctx)}</div>`,
    c5p074_share: (b, ctx) => `<div class="c5p074-c">${shareSvg(b, ctx)}</div>`,
    c5p074_scale: (b, ctx) => `<div class="c5p074-scale">${scaleSvg(b, ctx)}</div>`,
    c5p074_shift: (b, ctx) => `<div class="c5p074-c">${shiftSvg(b, ctx)}</div>`,
    c5p074_rod: (b, ctx) => `<div class="c5p074-c">${rodSvg(b, ctx)}</div>`,
    c5p074_dline: (b, ctx) => `<div class="c5p074-c">${dlineSvg(b, ctx)}</div>`,
    c5p074_ratio: ratioHtml,
    c5p074_idea: (b, ctx, page) => `<div class="c5p074-idea ${b.tone || "rafi"}"><span class="c5p074-tab">${ctx.esc(b.tab)}</span><div class="c5p074-ib">${b.body.map((x) =>
      typeof x === "string" ? lineHtml(ctx, x) : marks(ctx.blockHtml(x, page))).join("")}</div></div>`,
    c5p074_lines: (b, ctx) => `<div class="c5p074-lines"${b.size ? ` style="--ls:${b.size}pt"` : ""}>${b.lines.map((x) => lineHtml(ctx, x)).join("")}</div>`,
    c5p074_nl: (b, ctx) => `<div class="c5p074-c">${nlSvg(b, ctx)}</div>`,
    c5p074_cards: (b, ctx) => `<div class="c5p074-cards">${b.items.map((x) => `<span>${ctx.esc(x)}</span>`).join("")}</div>`,
    c5p074_dbox: (b) => `<div class="c5p074-dbox">${Array.from({ length: b.n || 4 }, (_, i) => `<span class="c5p074-db"></span>${i === 0 ? `<i class="c5p074-dp"></i>` : ""}`).join("")}</div>`,
    c5p074_eq: (b, ctx) => `<div class="c5p074-eqw">${b.arrow === false ? "" : FAT}<span class="c5p074-eq">${xmd(ctx, b.text)}<span class="c5p074-eqb"></span></span></div>`,
    c5p074_grid: (b, ctx, page) => {
      const cols = b.cols ? `<colgroup>${b.cols.map((x) => `<col style="width:${x}">`).join("")}</colgroup>` : "";
      const cell = (c) => {
        const o = c && typeof c === "object" && !Array.isArray(c) && !c.kind && "b" in c ? c : { b: c };
        const bl = [].concat(o.b ?? []).map((x) => typeof x === "string" ? `<p class="c5p074-gt">${xmd(ctx, x)}</p>` : marks(ctx.blockHtml(x, page))).join("");
        return `<td${o.span ? ` colspan="${o.span}"` : ""} style="${o.bg ? `background:${o.bg};` : ""}${o.align ? `text-align:${o.align};` : ""}${o.pad != null ? `padding:${o.pad}mm;` : ""}"><div class="c5p074-gc${o.row ? " r" : ""}">${bl}</div></td>`;
      };
      return `<table class="c5p074-grid${b.look ? " " + b.look : ""}" style="${b.width ? `width:${b.width}mm;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}${b.lw ? `--lw:${b.lw}mm;` : ""}">${cols}${b.rows.map((r) => `<tr${r.h ? ` style="height:${r.h}mm"` : ""}>${(r.cells || r).map(cell).join("")}</tr>`).join("")}</table>`;
    },
    c5p074_work: (b, ctx) => `<div class="c5p074-work" style="grid-template-columns:${b.lw ? `${b.lw}mm` : "auto"} auto;${b.gap != null ? `row-gap:${b.gap}mm;` : ""}${b.size ? `font-size:${b.size}pt;` : ""}${b.indent ? `margin-left:${b.indent}mm;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}">${b.rows.map(([l, e]) =>
      `<span class="c5p074-wl">${xmd(ctx, l)}</span><span class="c5p074-we">${xmd(ctx, e)}</span>`).join("")}</div>`,
    c5p074_x: (b, ctx, page) => `<div class="c5p074-xw" style="${b.fs ? `--xs:${b.fs}pt;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}${b.lw ? `--lw:${b.lw}mm;` : ""}${b.gap != null ? `gap:${b.gap}mm;` : ""}${b.indent ? `padding-left:${b.indent}mm;` : ""}">${[].concat(b.b).map((x) =>
      marks(ctx.blockHtml(x, page))).join("")}</div>`,
  },
  css: `
svg.c5p074-svg { display: block; overflow: visible; flex: none }
.c5p074-c { display: flex; justify-content: center } .c5p074-c > svg { display: block }
.c5p074-mw { display: flex; flex-direction: column; align-items: center; flex: none }
.c5p074-under { font: 600 11pt/1.4 'Noto Sans Bengali'; text-align: center; margin-top: .6mm; white-space: nowrap; display: flex; flex-direction: column; align-items: center }
.c5p074-box { align-self: center; flex: none; display: flex; justify-content: center; padding: 1.8mm 2.4mm; border-radius: 3.4mm; background: #fff }
.c5p074-box.dot { border: .45mm dotted #F59E0B } .c5p074-box.line { border: .45mm solid ${INK}; border-radius: 1.4mm; padding: 3mm 4mm }
.c5p074-scale { display: flex; margin-top: 1mm } .c5p074-scale svg { display: block }
/* the rows-of-numbers diagram */
.c5p074-ratio { display: grid; align-items: center; justify-items: start; align-self: center; width: fit-content; padding: 2.6mm 4mm; border-radius: 4mm; border: .4mm solid ${INK}; font: 700 13pt/1.25 'Baloo Da 2'; column-gap: 2mm }
.c5p074-ratio.yellow { background: #FEF9C3 } .c5p074-ratio.gold { background: #FDF06A }
.c5p074-rv { white-space: nowrap; padding: .8mm 0 } .c5p074-rv .c5p074-ar { vertical-align: .6mm }
.c5p074-rs { display: flex; align-items: center; min-height: 13mm }
.c5p074-st { display: flex; align-items: center; gap: 1.2mm } .c5p074-sa { display: block; flex: none }
.c5p074-tag { display: inline-flex; align-items: center; justify-content: center; min-width: 14mm; height: 11mm; padding: 0 2mm; border: .35mm solid ${INK}; font: 700 12pt 'Baloo Da 2' }
.c5p074-tag.oval { border-radius: 50% } .c5p074-tag.sq { border-radius: 2.6mm }
.c5p074-ratio .c5p074-tag .c5p074-wb { width: 6.4mm; height: 6mm; margin: 0 0 0 .6mm; border-color: ${INK}; background: #fff; border-radius: .6mm; border-width: .3mm }
.c5p074-eqv { font: 700 15pt/1 'Baloo Da 2'; letter-spacing: -1mm; margin-left: 4mm }
.c5p074-vb { display: inline-block; min-width: 14mm; padding: .4mm 1.6mm 0; background: #fff; border: .3mm solid ${INK}; text-align: center }
.c5p074-ratio .c5p074-wb { width: 14mm; height: 7mm; background: #fff; border: .3mm solid ${INK}; border-radius: 0; vertical-align: -1.6mm; margin: 0 }
/* the tabbed idea boxes */
.c5p074-idea { display: flex; flex-direction: column; align-items: flex-start }
.c5p074-tab { font: 700 12.5pt/1 'Noto Sans Bengali'; padding: 2.2mm 6mm 1.8mm; border-radius: 2.4mm 2.4mm 0 0 }
.c5p074-ib { align-self: stretch; padding: 2.4mm 4mm 2.6mm; border-radius: 0 3.4mm 3.4mm 3.4mm; display: flex; flex-direction: column; gap: 1.2mm }
.c5p074-idea.rafi .c5p074-tab { background: #6FC8AE } .c5p074-idea.rafi .c5p074-ib { background: #D6EFFB; border: .45mm solid #7CC4E8 }
.c5p074-idea.tuli .c5p074-tab { background: #FDAA62 } .c5p074-idea.tuli .c5p074-ib { background: #FFD9B3; border: .45mm solid #F9A86A }
table.c5p074-grid.split td { border: 0 } table.c5p074-grid.split td + td { border-left: .4mm solid ${INK} } table.c5p074-grid.split { background: transparent }
.c5p074-lines { display: flex; flex-direction: column; gap: 1.2mm }
.c5p074-il { font: 500 var(--ls, 12.5pt)/1.5 'Noto Sans Bengali' } .c5p074-il.in { padding-left: 14mm }
/* cards, decimal boxes, the sum in its pill */
.c5p074-cards { display: flex; gap: 4.4mm; padding-left: 4mm } .c5p074-cards span { width: 9.6mm; height: 12mm; display: flex; align-items: center; justify-content: center; border: .45mm solid ${INK}; border-radius: 1mm; background: #fff; font: 700 14pt 'Baloo Da 2'; box-shadow: .6mm .6mm 0 #E2E8F0 }
.c5p074-dbox { display: inline-flex; align-items: flex-end; gap: 2mm; background: #FDE68A; border: .4mm solid ${INK}; padding: 1.6mm 2mm; flex: none; width: fit-content }
.c5p074-db { width: 11mm; height: 10mm; background: #fff; border: .4mm solid ${INK} } .c5p074-dp { width: 1.1mm; height: 1.1mm; border-radius: 50%; background: ${INK}; margin: 0 -1.5mm 1.5mm }
.c5p074-eqw { display: flex; align-items: center; gap: 2mm } .c5p074-fat { display: inline-block; flex: none; vertical-align: middle }
.c5p074-eq { display: inline-flex; align-items: center; gap: 2mm; background: #CDEBFA; border: .45mm solid #1E3A8A; border-radius: 3.4mm; padding: 1.2mm 1.4mm 1.2mm 4mm; font: 700 13.5pt 'Baloo Da 2'; white-space: nowrap }
.c5p074-eqb { width: 22mm; height: 9mm; background: #fff; border: .45mm solid #1E3A8A; border-radius: 2.6mm }
/* tables holding blocks */
table.c5p074-grid { border-collapse: collapse; width: 100%; background: #fff; table-layout: fixed }
table.c5p074-grid td { border: .4mm solid ${INK}; vertical-align: middle; padding: 2mm 2.4mm }
.c5p074-gc { display: flex; flex-direction: column; gap: 1.6mm; justify-content: center } .c5p074-gc.r { flex-direction: row; align-items: center; justify-content: space-around; gap: 1.6mm }
.c5p074-gt { font: 500 12.5pt/1.45 'Noto Sans Bengali' }
/* working in two columns */
.c5p074-work { display: grid; column-gap: 3mm; row-gap: 2.2mm; align-items: center; font: 500 12.5pt/1.45 'Noto Sans Bengali'; justify-content: start }
.c5p074-wl, .c5p074-we { white-space: nowrap }
/* the marks */
.c5p074-xw { display: flex; flex-direction: column; gap: 2mm } .c5p074-xw .tx { font-size: var(--xs, 12.5pt) }
.c5p074-wb { display: inline-block; width: var(--bw, 20mm); height: 7.4mm; vertical-align: -2.2mm; border: .55mm solid ${AMB}; background: ${AMBF}; border-radius: 1.8mm; margin: 0 .8mm }
.c5p074-lb { display: inline-block; width: var(--lw, 90mm); height: 9mm; vertical-align: -3mm; border: .55mm solid ${AMB}; background: ${AMBF}; border-radius: 2mm; margin-left: 1.6mm }
.c5p074-ar { display: inline-block; vertical-align: .4mm; margin: 0 1mm } .c5p074-tf { display: inline-block; vertical-align: -.2mm; margin-right: 1mm }
.frac .c5p074-wb { width: 14mm; height: 6.6mm; margin: .5mm 0; vertical-align: 0 }
`,
};
