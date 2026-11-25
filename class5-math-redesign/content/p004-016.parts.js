// Printed pages 4–16's own kinds (prefixed c5p004_), written by a helper (25 Nov 2026). Chapter ১ গুণ ও ভাগ: পাশাপাশি গুণ by
// breaking a number up, the easy ways with 0s and with ৯৯ / ৯৯৯ / ৯৯৯৯, long division by 2- and 3-digit divisors (the book's
// framed steps, red boxes, dotted lines and arrows), dividing by 10 and 100. Every digit, box, rule, arrow and arc is drawn
// here by code. Units: mm.
//
//   c5p004_eqs    lines of maths in SVG (Baloo Da 2, every glyph's width known), with marks joining their parts:
//                 { lines: [[seg…] | { x, t: [seg…] }], fs?: 5, lh?: 11 | [mm…], top?, bottom?, gap?, card?, w? ,
//                   frames: [{ at: [line, from, to], c }], staples: [{ from: [line, a, z], to: [line, a, z], c }],
//                   arcs: [{ from: [line, seg], to: [line, seg], side: "over" | "under", h?, heads?: 1 | 2, c }],
//                   rings: [{ at: [line, from, to], c }] (a circle round them), unders: [{ at: [line, from, to] }] }
//                 seg: "৬০৪২ × ১০০০" (text, spaces kept) · { t, c?, at?, sp? } (a colour; at: an absolute x; sp: more
//                 space before) · { b: 22 } (an empty answer box 22 mm wide) · { s: "sq" | "tri" | "dot" } (p6's shapes).
//                 frames: a box round segments (p4's pink bracket, p12's red and blue parts); staples: p4's purple bracket
//                 under the line, an up-arrow at each end; arcs: curved arrows over or under a line (p5, p6, p12).
//   c5p004_ld     long division as the book prints it: { d, n, q?, rows?, lines?, rings?, arrows?, cut?, frame?, chev?,
//                 margin?, qline?, extra?, sq?, fs?, cw?, rh?, dp? }
//                 n the dividend; q and every row are strings right-aligned to n's last digit, one character a column
//                 (" " empty, "□" a box, "−" a minus); a row longer than n reaches left (the book's minus signs).
//                 d the divisor (it may hold "□"). lines: [i | { r: i, from: col }] a rule under row i (full width in a frame);
//                 rings: [{ r: "q" | "n" | i, from, to }] p8–10's red box round those columns; arrows: [{ col, to, from?, c?:
//                 "red" | "blue" }] the bring-down arrow; cut: p10's red dotted line after column col.
//                 frame: "box" | "plate" (the book's step frames; plate ends in a chevron chev mm deep), qline: "full" (the
//                 line under the quotient across the frame) or "bracket"; margin: the frame's empty right column with its
//                 line (p9); sq: p14's squared paper (every digit, the divisor and the bracket in squares; □ an empty square).
//   c5p004_zmul   p5's multiplication with the zeros set apart: { rows: ["৪৯৭৩|০", "×৯৮|০০", "-", …], fs?, cw?, arrow?: [r1, r2] }
//   c5p004_tab    a box with a title tab on its top edge (p9's যাচাই পদ্ধতি, p10's সঠিকতা যাচাই): { title, body: [blocks] }
//   c5p004_chips  coloured chips in a line with signs between: { items: [{ l, v?, tone, above? } | "×" | { arrow: w }], w?, size? }
//                 v: a value under the label ("" an empty chip); above: the label over an empty chip (p10)
//   c5p004_wbox   an empty ruled box with its label at the top (p7's গাণিতিক গল্প, সমাধান): { label, h }
//   c5p004_band   p12's green সমাধান band: { text }
//   c5p004_arrow  a fat arrow: { dir?: "left" | "right", w?, tone?: "red" | "blue" }
//   c5p004_bw     c4p067_x's ▭ / ▬ boxes with their widths set: { b: block | [blocks], bw?, lw?, gap?, indent?, wide? }
//                 (wide: speech cards up to 150 mm, for a sum with boxes on one line, p7)
//   c5p004_list   numbered lines, each with a long box after it (p11 অনুশীলন ৪): { items, box?, start?, size? }
//   c5p004_qhead  the exercise's marker and words as the core draws them, in a row beside a picture (p7), or the marker
//                 heading a drawn block instead of words (p6's (১)): { mark, n, text } | { mark, n, b: block }
const INK = "#1E2433", RED = "#DC2626", ANS = "#C2410C", BOXS = "#F59E0B", BOXF = "#FFFBEB";
const f = (n) => Math.round(n * 100) / 100;
// Baloo Da 2's advance widths (em) at weight 700, measured in Chrome (25 Nov 2026) with the family name quoted: an unquoted
// font-family="Baloo Da 2" is invalid CSS (the "2"), so such SVG text falls back to Noto Sans Bengali, whose widths Class 4's
// table holds. Whole words are measured as words (Bangla letters join).
const GW = { "০": .573, "১": .576, "২": .543, "৩": .728, "৪": .594, "৫": .638, "৬": .689, "৭": .596, "৮": .699, "৯": .693, "×": .502, "=": .511, "+": .546, "−": .508, "÷": .524, "(": .292, ")": .292, " ": .2, ";": .25, ",": .219, "‘": .2, "’": .198, "/": .334 };
const WORDS = { "ভাগশেষ": 3.373 };
const twid = (s, fs) => s.split(" ").reduce((a, w, i) => a + (i ? GW[" "] : 0) + (WORDS[w] ?? [...w].reduce((b, c) => b + (GW[c] ?? .7), 0)), 0) * fs;
const T = (x, y, s, fs, col = INK, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="&apos;Baloo Da 2&apos;" font-weight="${o.w || 700}" font-size="${f(fs)}" text-anchor="${o.a || "start"}" style="fill:${col}">${s}</text>`;
const boxR = (x, y, w, h, o = {}) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${f(o.rx ?? Math.min(w, h) * .2)}" fill="${o.fill || BOXF}" stroke="${o.stroke || BOXS}" stroke-width="${o.sw || .45}"/>`;
function head(x2, y2, ux, uy, col, hl, hw) {
  const bx = x2 - ux * hl, by = y2 - uy * hl;
  return `<path d="M${f(x2)} ${f(y2)}L${f(bx - uy * hw)} ${f(by + ux * hw)}L${f(bx + uy * hw)} ${f(by - ux * hw)}Z" fill="${col}"/>`;
}
const COLS = { red: RED, blue: "#2563EB", cyan: "#0EA5E9", pink: "#EC4899", purple: "#8B5CF6", ink: INK, green: "#16A34A" };
const colOf = (c, d) => COLS[c] || c || d;

// ── c5p004_eqs ──
function eqsSvg(b, ctx) {
  const fs = b.fs || 5, gap = b.gap ?? fs * .3, lhs = Array.isArray(b.lh) ? b.lh : null, lh = lhs ? 0 : (b.lh || fs * 2.2);
  const top = b.top ?? fs * 1.15, bh = fs * 1.42;
  const base = (li) => top + (lhs ? lhs.slice(0, li).reduce((a, c) => a + c, 0) : li * lh);
  let o = "", maxX = 0;
  const lines = b.lines.map((L) => Array.isArray(L) ? { x: 0, t: L } : L);
  const pos = [];
  lines.forEach((L, li) => {
    let x = Array.isArray(L.x) ? pos[L.x[0]][L.x[1]].x : L.x || 0; // x: [line, seg] lines this line up under that segment
    pos.push(L.t.map((sg) => {
      const s = typeof sg === "string" ? { t: sg } : sg;
      if (s.at != null) x = s.at;
      if (s.sp) x += s.sp;
      const w = s.b != null ? s.b : s.s ? fs * .95 : twid(s.t, fs), p = { x, w, cx: x + w / 2 };
      const y = base(li), mid = y - fs * .34;
      if (s.b != null) o += boxR(x, mid - bh / 2, s.b, bh);
      else if (s.s === "sq") o += `<rect x="${f(x + fs * .08)}" y="${f(mid - fs * .4)}" width="${f(fs * .78)}" height="${f(fs * .78)}" fill="#38BDF8"/>`;
      else if (s.s === "tri") o += `<path d="M${f(x + w / 2)} ${f(mid - fs * .46)}L${f(x + w - fs * .02)} ${f(mid + fs * .38)}H${f(x + fs * .02)}Z" fill="#D4BE1E"/>`;
      else if (s.s === "dot") o += `<circle cx="${f(x + w / 2)}" cy="${f(mid)}" r="${f(fs * .47)}" fill="#D062A8"/>`;
      else o += T(x, y, ctx.esc(s.t), fs, colOf(s.c, INK));
      x += w + (s.g ?? gap);
      maxX = Math.max(maxX, p.x + p.w);
      return p;
    }));
  });
  const span = ([li, a, z = a]) => { const p = pos[li][a], q = pos[li][z]; return { x1: p.x, x2: q.x + q.w, cx: (p.x + q.x + q.w) / 2, y: base(li) }; };
  let bottom = 0, topExtra = 0;
  for (const fr of b.frames || []) {
    const s = span(fr.at), pad = fr.pad ?? fs * .16;
    o += `<rect x="${f(s.x1 - pad)}" y="${f(s.y - fs * 1.02)}" width="${f(s.x2 - s.x1 + 2 * pad)}" height="${f(fs * 1.34)}" fill="none" stroke="${colOf(fr.c, "#F472B6")}" stroke-width="${fr.sw || .35}"/>`;
  }
  for (const r of b.rings || []) {
    const s = span(r.at), rx = (s.x2 - s.x1) / 2 + fs * .45, ry = fs * 1.05;
    o += `<ellipse cx="${f(s.cx)}" cy="${f(s.y - fs * .36)}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="${colOf(r.c, INK)}" stroke-width=".35"/>`;
  }
  for (const u of b.unders || []) { const s = span(u.at); o += `<path d="M${f(s.x1 - .3)} ${f(s.y + fs * .32)}H${f(s.x2 + .3)}" stroke="${colOf(u.c, INK)}" stroke-width=".35"/>`; }
  for (const st of b.staples || []) { // p4: a bracket under the line, an arrow pointing up at each end
    const a = span(st.from), z = span(st.to), col = colOf(st.c, "#9F86D0"), y1 = a.y + fs * .5, d = st.d || fs * 1.25, y2 = y1 + d, sw = fs * .2;
    o += `<path d="M${f(a.cx)} ${f(y1 + fs * .5)}V${f(y2)}H${f(z.cx)}V${f(y1 + fs * .5)}" fill="none" stroke="${INK}" stroke-width="${f(sw + .5)}" stroke-linejoin="miter"/>`;
    o += `<path d="M${f(a.cx)} ${f(y1 + fs * .5)}V${f(y2)}H${f(z.cx)}V${f(y1 + fs * .5)}" fill="none" stroke="${col}" stroke-width="${f(sw)}" stroke-linejoin="miter"/>`;
    for (const x of [a.cx, z.cx]) o += `<path d="M${f(x)} ${f(y1 - .2)}L${f(x + fs * .42)} ${f(y1 + fs * .55)}H${f(x - fs * .42)}Z" fill="${col}" stroke="${INK}" stroke-width=".25" stroke-linejoin="round"/>`;
    bottom = Math.max(bottom, y2 + sw);
  }
  for (const a of b.arcs || []) {
    const p = pos[a.from[0]][a.from[1]], q = pos[a.to[0]][a.to[1]], up = a.side !== "under", col = colOf(a.c, INK);
    const ya = up ? base(a.from[0]) - fs * 1.2 : base(a.from[0]) + fs * .45, yb = up ? base(a.to[0]) - fs * 1.2 : base(a.to[0]) + fs * .45;
    const h = a.h ?? fs * 1.6, cy = up ? Math.min(ya, yb) - h * 2 : Math.max(ya, yb) + h * 2, cx = (p.cx + q.cx) / 2 + (a.dx || 0);
    const x1 = p.cx + (a.ox1 || 0), x2 = q.cx + (a.ox2 || 0);
    // a quadratic curve, shortened at each end that carries an arrowhead
    const hl = fs * .38, hw = fs * .2, end = (x, y, ox, oy) => { const dx = x - ox, dy = y - oy, d = Math.hypot(dx, dy) || 1; return [dx / d, dy / d]; };
    const [ux2, uy2] = end(x2, yb, cx, cy), [ux1, uy1] = end(x1, ya, cx, cy);
    const s1 = a.heads === 2 ? [x1 - ux1 * hl * .9, ya - uy1 * hl * .9] : [x1, ya], s2 = [x2 - ux2 * hl * .9, yb - uy2 * hl * .9];
    o += `<path d="M${f(s1[0])} ${f(s1[1])}Q${f(cx)} ${f(cy)} ${f(s2[0])} ${f(s2[1])}" fill="none" stroke="${col}" stroke-width="${a.sw || .32}"/>` + head(x2, yb, ux2, uy2, col, hl, hw);
    if (a.heads === 2) o += head(x1, ya, ux1, uy1, col, hl, hw);
    if (up) topExtra = Math.max(topExtra, -(Math.min(ya, yb) - h) + .5); else bottom = Math.max(bottom, Math.max(ya, yb) + h + .6);
  }
  const W = Math.max(b.w || 0, maxX + .6), H = Math.max(base(lines.length - 1) + (b.bottom ?? fs * .55), bottom);
  const svg = `<svg class="c5p004-svg" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${o}</svg>`;
  return `<div class="c5p004-eqs${b.card ? " card" : ""}${b.center ? " c" : ""}"${b.indent ? ` style="padding-left:${b.indent}mm"` : ""}>${svg}</div>`;
}

// ── c5p004_ld: long division ──
const SKIP = "\u0000";
const cellsOf = (s) => [...(s || "")].map((ch) => ch === " " ? "" : ch);
function ldSvg(b, ctx) {
  const sq = !!b.sq, framed = !!b.frame;
  const fs = b.fs || 5.2, cw = b.cw || (sq ? 7.6 : 5.4), rh = b.rh || (sq ? 7.6 : 6.6);
  const nd = cellsOf(b.n), N = nd.length, q = cellsOf(b.q), rows = (b.rows || []).map(cellsOf), dd = cellsOf(b.d);
  const dp = b.dp || 0; // the divisor's digits: close together, or spaced dp mm apart (p8, p10's boxes)
  const dW = sq ? (dd.length + 1) * cw : dd.reduce((a, c) => a + (c === "□" ? cw * .95 : Math.max(dp, (GW[c] || .6) * fs + .25)), 0) + 3.4;
  const minCol = Math.min(0, ...rows.map((r) => N - r.length), N - q.length);
  const padL = framed ? (b.padL ?? 2.4) : .5;
  const X0 = padL + Math.max(dW, -minCol * cw + .6), XR = X0 + N * cw, extra = b.extra ?? (framed ? (b.margin ? 1.5 : .9) : .25);
  const XE = XR + extra * cw, W = XE + (framed ? .4 : .5);
  const Y0 = framed ? .8 : .5, R = 2 + rows.length, rowOf = (r) => r === "q" ? 0 : r === "n" ? 1 : 2 + r;
  const yT = (r) => Y0 + r * rh, yB = (r) => Y0 + (r + 1) * rh, yBase = (r) => yT(r) + rh / 2 + fs * .34;
  const xL = (c) => X0 + c * cw, xC = (c) => X0 + (c + .5) * cw;
  const chev = b.frame === "plate" ? (b.chev ?? 7) : 0, Hb = yB(R - 1) + (framed ? 1.2 : 0), H = Hb + chev + (framed ? .5 : .4);
  const FL = .35, FR = W - .35;
  let g = "";
  if (framed) {
    g += chev ? `<path d="M${FL} .35H${f(FR)}V${f(Hb)}L${f(W / 2)} ${f(Hb + chev)}L${FL} ${f(Hb)}Z" fill="#fff" style="stroke:var(--c)" stroke-width=".5" stroke-linejoin="round"/>`
      : `<rect x="${FL}" y=".35" width="${f(FR - FL)}" height="${f(Hb - .35)}" rx="1.2" fill="#fff" style="stroke:var(--c)" stroke-width=".5"/>`;
    if (b.margin) g += `<path d="M${f(XR + cw * .32)} ${f(yT(0) + 1)}V${f(yB(R - 1))}" stroke="${INK}" stroke-width=".35"/>`;
  }
  const put = (cs, r, fill, w) => {
    const off = N - cs.length;
    cs.forEach((ch, i) => {
      const c = off + i;
      if (!ch) return;
      if (ch === "□") {
        if (sq) { g += `<rect x="${f(xL(c))}" y="${f(yT(r))}" width="${f(cw)}" height="${f(rh)}" fill="#fff" stroke="${INK}" stroke-width=".35"/>`; return; }
        const bw = cw * .92, bh = rh * .82;
        g += boxR(xL(c) + (cw - bw) / 2, yT(r) + (rh - bh) / 2, bw, bh, { rx: .9, sw: .42 });
        return;
      }
      if (sq) g += `<rect x="${f(xL(c))}" y="${f(yT(r))}" width="${f(cw)}" height="${f(rh)}" fill="#fff" stroke="${INK}" stroke-width=".35"/>`;
      g += T(xC(c), yBase(r), ctx.esc(ch), fs, fill, { a: "middle", w });
    });
  };
  // the rules under the rows taken away
  for (const L of b.lines || []) {
    const i = typeof L === "number" ? L : L.r, cs = rows[i], off = N - cs.length, first = cs.findIndex((x) => x);
    const c0 = typeof L === "object" && L.from != null ? L.from : first < 0 ? 0 : off + first;
    const xa = framed ? FL : xL(c0) - .7, xb = framed ? FR : (L.to != null ? xL(L.to + 1) + .7 : XR + .7);
    g += `<path d="M${f(xa)} ${f(yB(2 + i))}H${f(xb)}" stroke="${INK}" stroke-width=".42"/>`;
  }
  // the bracket, the divisor, and the line over the dividend
  const yo = yT(1), bx = X0 - (sq ? cw : 2.6);
  if (sq) {
    dd.forEach((ch, i) => { const x = X0 - (dd.length + 1 - i) * cw; g += `<rect x="${f(x)}" y="${f(yo)}" width="${f(cw)}" height="${f(rh)}" fill="#fff" stroke="${INK}" stroke-width=".35"/>` + (ch === "□" ? "" : T(x + cw / 2, yBase(1), ctx.esc(ch), fs, INK, { a: "middle", w: 800 })); });
    g += `<rect x="${f(X0 - cw)}" y="${f(yo)}" width="${f(cw)}" height="${f(rh)}" fill="#fff" stroke="${INK}" stroke-width=".35"/>`;
    g += `<path d="M${f(X0 - cw * .62)} ${f(yo + rh * .2)}Q${f(X0 - cw * .3)} ${f(yo + rh / 2)} ${f(X0 - cw * .62)} ${f(yo + rh * .8)}" fill="none" stroke="${INK}" stroke-width=".42" stroke-linecap="round"/>`;
  } else {
    const full = framed && b.qline !== "bracket";
    g += `<path d="M${f(full ? FL : X0 - 1.6)} ${f(yo)}H${f(framed ? FR : XR + .8)}" stroke="${INK}" stroke-width="${full ? .42 : .5}"/>`;
    g += `<path d="M${f(X0 - 2.3)} ${f(yo + .3)}Q${f(X0 - .1)} ${f(yo + rh / 2)} ${f(X0 - 2.3)} ${f(yB(1) - .3)}" fill="none" stroke="${INK}" stroke-width=".5" stroke-linecap="round"/>`;
    let x = X0 - 3.4;
    for (const ch of [...dd].reverse()) {
      if (ch === "□") { const bw = cw * .92, bh = rh * .82; x -= cw * .95; g += boxR(x + (cw * .95 - bw) / 2, yo + (rh - bh) / 2, bw, bh, { rx: .9, sw: .42 }); continue; }
      const w = Math.max(dp, (GW[ch] || .6) * fs + .25); x -= w; if (ch) g += T(x + w / 2, yBase(1), ctx.esc(ch), fs, INK, { a: "middle", w: 800 });
    }
  }
  put(nd, 1, INK, 800);
  if (sq) g += `<path d="M${f(X0 - cw * .45)} ${f(yo + .7)}H${f(XR - .3)}" stroke="${INK}" stroke-width=".6"/>`;
  put(q, 0, sq ? INK : "var(--c)", 800);
  rows.forEach((cs, i) => put(cs, 2 + i, INK, 700));
  for (const rg of b.rings || []) {
    const r = rowOf(rg.r);
    g += `<rect x="${f(xL(rg.from) + .25)}" y="${f(yT(r) + .45)}" width="${f((rg.to - rg.from + 1) * cw - .5)}" height="${f(rh - .9)}" fill="none" stroke="${RED}" stroke-width=".35"/>`;
  }
  for (const a of b.arrows || []) {
    const x = xC(a.col) + (a.dx || 0), y1 = yB(rowOf(a.from ?? "n")) + .2, y2 = yT(rowOf(a.to)) + (a.c === "blue" ? .35 : .7);
    if (a.c === "blue") { // p9's pale-blue arrow: the digit brought down
      const xx = x, w = .8;
      g += `<path d="M${f(xx - w)} ${f(y1)}H${f(xx + w)}V${f(y2 - 2)}H${f(xx + 1.8)}L${f(xx)} ${f(y2)}L${f(xx - 1.8)} ${f(y2 - 2)}H${f(xx - w)}Z" fill="#BAE6FD" stroke="#0284C7" stroke-width=".3" stroke-linejoin="round"/>`;
    } else g += `<path d="M${f(x)} ${f(y1)}V${f(y2 - 1.3)}" stroke="${RED}" stroke-width=".38"/><path d="M${f(x - .85)} ${f(y2 - 1.7)}L${f(x)} ${f(y2)}L${f(x + .85)} ${f(y2 - 1.7)}Z" fill="${RED}"/>`;
  }
  if (b.cut != null) g += `<path d="M${f(xL(b.cut + 1))} ${f(yT(0) + .6)}V${f(yB(R - 1) - .2)}" stroke="${RED}" stroke-width=".35" stroke-dasharray=".5 .7" stroke-linecap="round"/>`;
  return `<svg class="c5p004-svg" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${g}</svg>`;
}

// ── c5p004_zmul: p5's ৪৯৭৩০ × ৯৮০০ with the zeros set apart by a line ──
function zmulSvg(b, ctx) {
  const fs = b.fs || 5.2, cw = b.cw || 4.2, rh = b.rh || fs * 1.5, rows = [];
  for (const r of b.rows) { if (r === "-") { rows[rows.length - 1].rule = true; continue; } const m = r.match(/^(×?)([^|]*)\|?(.*)$/); rows.push({ op: m[1], l: [...m[2]], r: [...m[3]] }); }
  const nl = Math.max(...rows.map((r) => r.l.length + (r.op ? 1 : 0))), nr = Math.max(...rows.map((r) => r.r.length));
  const XD = .6 + nl * cw + .8, W = XD + 1.4 + nr * cw + 1.2, H = rows.length * rh + 1, last = rows.length - 1;
  let g = "";
  rows.forEach((r, i) => {
    const yb = (i + .5) * rh + fs * .34 + .3, col = i === last ? ANS : INK;
    r.l.forEach((ch, k) => { g += T(XD - .8 - (r.l.length - k - .5) * cw, yb, ctx.esc(ch), fs, col, { a: "middle" }); });
    if (r.op) g += T(XD - .8 - (r.l.length + .5) * cw, yb, r.op, fs * .9, RED, { a: "middle" });
    r.r.forEach((ch, k) => { g += T(XD + 1.4 + (k + .5) * cw, yb, ctx.esc(ch), fs, col, { a: "middle" }); });
    if (r.rule) g += `<path d="M.3 ${f((i + 1) * rh + .5)}H${f(W - .3)}" stroke="${INK}" stroke-width=".45"/>`;
  });
  const firstRule = rows.findIndex((r) => r.rule);
  g += `<path d="M${f(XD)} .3V${f((firstRule + 1) * rh + .5)}" stroke="${INK}" stroke-width=".4"/>`;
  if (b.arrow) {
    const [r1, r2] = b.arrow, x = XD + 1.4 + nr * cw / 2 + .6, y1 = r1 * rh + 1, y2 = r2 * rh + .2, w = 1.1;
    g += `<path d="M${f(x - w)} ${f(y1)}H${f(x + w)}V${f(y2 - 3)}H${f(x + 2.4)}L${f(x)} ${f(y2)}L${f(x - 2.4)} ${f(y2 - 3)}H${f(x - w)}Z" fill="#7DD3FC"/>`;
  }
  return `<svg class="c5p004-svg" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${g}</svg>`;
}

const mdx = (ctx, s) => ctx.md(s == null ? "" : String(s));
const TONE = { blue: ["#BAE6FD", "#0284C7"], pink: ["#F5C6DE", "#BE185D"], yellow: ["#EEF08A", "#A16207"], green: ["#86CB86", "#166534"] };
function arrowSvg(w, dir, tone) {
  const h = tone === "blue" ? 7 : 5.4, fill = tone === "blue" ? "#93D7F7" : RED, stroke = tone === "blue" ? ` stroke="#0369A1" stroke-width=".3"` : "";
  const p = `M0 ${f(h * .3)}H${f(w - h * .75)}V0L${w} ${f(h / 2)}L${f(w - h * .75)} ${h}V${f(h * .7)}H0Z`;
  return `<svg class="c5p004-arr" width="${w}mm" height="${h}mm" viewBox="-.2 -.2 ${w + .4} ${h + .4}"><path d="${p}" fill="${fill}"${stroke} stroke-linejoin="round"${dir === "left" ? ` transform="translate(${w} 0) scale(-1 1)"` : ""}/></svg>`;
}
function chipsHtml(b, ctx) {
  const items = b.items.map((it) => {
    if (typeof it === "string") return `<span class="c5p004-op">${mdx(ctx, it)}</span>`;
    if (it.arrow) return arrowSvg(it.arrow, "right", "blue");
    const [bg, bd] = TONE[it.tone] || TONE.blue;
    if (it.above) return `<span class="c5p004-cha"><b>${ctx.esc(it.l)}</b><span class="c5p004-chip e" style="background:${bg};border-color:${bg}"></span></span>`;
    return `<span class="c5p004-chip${it.v != null ? " two" : ""}${it.line ? " ln" : ""}" style="background:${bg};border-color:${it.line ? INK : bg}"><b>${ctx.esc(it.l)}</b>${it.v != null ? `<i>${ctx.esc(it.v)}</i>` : ""}</span>`;
  }).join("");
  return `<div class="c5p004-chips${b.left ? " left" : ""}" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.w ? `--cw:${b.w}mm;` : ""}${b.gap != null ? `gap:${b.gap}mm;` : ""}">${items}</div>`;
}

module.exports = {
  kinds: {
    c5p004_eqs: (b, ctx) => eqsSvg(b, ctx),
    c5p004_ld: (b, ctx) => `<div class="c5p004-ldw${b.left ? " left" : ""}">${ldSvg(b, ctx)}</div>`,
    c5p004_zmul: (b, ctx) => `<div class="c5p004-ldw${b.left ? " left" : ""}">${zmulSvg(b, ctx)}</div>`,
    c5p004_tab: (b, ctx, page) => `<div class="c5p004-tab${b.tone ? " " + b.tone : ""}"${b.w ? ` style="width:${b.w}mm;align-self:center"` : ""}><span class="c5p004-tt">${ctx.esc(b.title)}</span>${(b.body || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
    c5p004_chips: (b, ctx) => chipsHtml(b, ctx),
    c5p004_wbox: (b, ctx) => `<div class="c5p004-wbox" style="height:${b.h || 24}mm"><span>${ctx.esc(b.label || "")}</span></div>`,
    c5p004_band: (b, ctx) => `<div class="c5p004-band">${ctx.esc(b.text)}</div>`,
    c5p004_arrow: (b) => `<div class="c5p004-aw">${arrowSvg(b.w || 16, b.dir, b.tone || "red")}</div>`,
    c5p004_bw: (b, ctx, page) => `<div class="c5p004-bw${b.wide ? " wide" : ""}" style="${b.bw ? `--bw:${b.bw}mm;` : ""}${b.lw ? `--lw:${b.lw}mm;` : ""}${b.gap != null ? `gap:${b.gap}mm;` : ""}${b.indent ? `padding-left:${b.indent}mm;` : ""}">${ctx.blockHtml({ kind: "c4p067_x", b: b.b }, page)}</div>`,
    // the book's question line beside a picture: the marker and the words, as the core's exercise heading draws them
    c5p004_qhead: (b, ctx, page) => `<div class="ext wm">${ctx.exMark(b.mark, b.n)}${b.b ? `<div class="c5p004-qb">${ctx.blockHtml(b.b, page)}</div>` : `<span>${ctx.md(b.text)}</span>`}</div>`,
    c5p004_list: (b, ctx) => `<div class="c5p004-list" style="${b.box ? `--lbw:${b.box}mm;` : ""}${b.size ? `font-size:${b.size}pt;` : ""}">${b.items.map((x, i) => `<span class="t"><b>(${ctx.bn((b.start || 1) + i)})</b> ${mdx(ctx, x)}</span><span class="c5p004-lb"></span>`).join("")}</div>`,
  },
  css: `
svg.c5p004-svg { display: block; overflow: visible; flex: none }
.c5p004-eqs { display: flex; justify-content: flex-start } .c5p004-eqs.c { justify-content: center } .c5p004-eqs.card { align-self: center; justify-content: center; background: #fff; border: .5mm solid ${INK}; border-radius: 2.4mm; padding: 1.4mm 4mm 1mm }
.c5p004-ldw { display: flex; justify-content: center } .c5p004-ldw.left { justify-content: flex-start }
.c5p004-tab { position: relative; border: .8mm solid #B05AB0; border-radius: 4mm; background: #fff; padding: 7mm 4mm 3mm; margin-top: 4.4mm; display: flex; flex-direction: column; gap: 2.4mm; box-shadow: 0 1mm 0 #F3D9F3 }
.c5p004-tab.yellow { border: .55mm solid ${INK}; box-shadow: none; padding-top: 6mm } .c5p004-tab.yellow .c5p004-tt { background: #FDE68A }
.c5p004-tt { position: absolute; top: -4.6mm; left: 50%; transform: translateX(-50%); background: #fff; border: .5mm solid ${INK}; border-radius: 2.4mm; padding: .9mm 9mm .5mm; font: 700 12.5pt/1.3 'Noto Sans Bengali'; white-space: nowrap }
.c5p004-chips { display: flex; align-items: center; justify-content: center; gap: 2.4mm; font: 700 12.5pt/1.25 'Baloo Da 2' } .c5p004-chips.left { justify-content: flex-start }
.c5p004-chip { display: inline-flex; flex-direction: column; align-items: center; justify-content: center; min-width: var(--cw, 24mm); min-height: 8.6mm; padding: .9mm 3mm .5mm; border: .45mm solid; border-radius: 1.6mm; font-family: 'Noto Sans Bengali'; font-weight: 600 }
.c5p004-chip.ln { border-radius: .4mm } .c5p004-chip b { font-weight: 600 } .c5p004-chip i { font: 700 1em/1.1 'Baloo Da 2'; font-style: normal }
.c5p004-cha { display: inline-flex; flex-direction: column; align-items: center; gap: 1.2mm } .c5p004-cha b { font: 600 1em 'Noto Sans Bengali' } .c5p004-chip.e { min-height: 10mm }
.c5p004-op { font: 700 1.05em 'Baloo Da 2'; white-space: nowrap }
.c5p004-arr { display: block; flex: none } .c5p004-aw { display: flex; justify-content: center; align-items: center }
.c5p004-wbox { flex: none; position: relative; border: .55mm solid var(--c); border-radius: 3mm; background: repeating-linear-gradient(180deg, transparent 0 8.6mm, #CBD5E1 8.6mm 8.9mm), #fff; background-position: 0 1mm; box-shadow: 0 1mm 0 var(--s) }
.c5p004-wbox span { position: absolute; left: 3mm; top: 1.2mm; font: 700 12.5pt 'Noto Sans Bengali'; color: var(--d); background: #fff; padding: 0 1.4mm }
.c5p004-band { align-self: stretch; text-align: center; font: 700 13.5pt/1.3 'Noto Sans Bengali'; color: #14532D; background: #C5E3B0; border-radius: 2mm; padding: 1.6mm 0 1.2mm }
.c5p004-qb { min-width: 0; padding-top: .4mm } .c5p004-bw { display: flex; flex-direction: column; gap: 2.6mm } .c5p004-bw.wide .sb { max-width: 150mm }
.c5p004-list { display: grid; grid-template-columns: auto var(--lbw, 40mm); justify-content: start; align-items: center; gap: 2.2mm 5mm; padding-left: 2mm; font: 500 12.5pt/1.4 'Noto Sans Bengali' }
.c5p004-list .t b { font: 800 1em 'Baloo Da 2'; color: #EA580C } .c5p004-lb { display: block; height: 8.4mm; border: .55mm solid ${BOXS}; background: ${BOXF}; border-radius: 1.8mm }
`,
};
