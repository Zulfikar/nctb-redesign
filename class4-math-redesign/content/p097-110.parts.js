// Printed pages 97–110's own kinds (prefixed c4p097_): chapter ৭ সাধারণ ভগ্নাংশ. Every fraction picture is drawn here, cut into
// exactly equal parts (flowers, grids, pies, tapes, the milk bar, the number lines); the strips with braces are Class 3's
// c3p091_strips. Units: mm. Written by a helper, 23 Nov 2026.
//   c4p097_flowers { items: [{ f: petal|hex|clover|ring, n, fill: [i…], rot, frac }], s }   p97: flowers beside their fractions,
//                  each in the book's dashed cells; the petals (or the ring's halves) in `fill` red
//   c4p097_cells   { rows: ["10001", …] (1 = coloured), color, cw, ch }                     p97: a grid of cells, some coloured
//   c4p097_pie     { items: [{ n, fill, start }], r, gap, color, line, label: { text, item, sector } }   circles cut into n equal
//                  sectors (counted anticlockwise from `start`°, 0 = 3 o'clock), with an arrow from a label to one sector (p99)
//   c4p097_nl      { unit, lw, rw, ext, size, box: [w, h], rows: [{ n, len, ah, bh, zero, whole, above: { k: markup | "#K"|"#B"|"#R" },
//                  below }], dash: [{ x, from, to }] }   number lines cut into n a unit, labels or answer boxes (#K dark, #B blue,
//                  #R red) above / below tick k, "০" on the left, long ticks at whole numbers, an orange dashed drop line (p100)
//   c4p097_arcs    { items: [markup…], w: [slot mm…], sw, th, up, dn, size, arcs: [{ a, b, side: up|down, color, label, rise,
//                  lx, ly, lpos: in|out }] }   fractions in a row joined by curved arrows (×২, ÷৩) above and below (pp101–102)
//   c4p097_cancel  { up: [..], down: [..], eq }   a fraction worked by crossing out ("~১৫" is struck in red), p102
//   c4p097_sym     { terms: [[top, bottom] | "=" …], z }   the book's shape rules: o ● red, q ■ red, t ▲ green (p101);
//                  A ▲ red, O ● purple, S ★ blue, G ■ green (pp104–107); the other characters are signs
//   c4p097_lh      { n, d, boxes: [word, word] | [word], w }   a fraction with arrows from its লব and হর to boxes (pp97–98)
//   c4p097_kinds   p99's yellow panel: প্রকৃত, অপ্রকৃত and মিশ্র ভগ্নাংশ with the coloured words and arrows
//   c4p097_tape    { cells: [colour…], w, h, top: { at, label }, under: [{ at, label, brace }] }   p105's ribbon of sevenths
//   c4p097_vbar    { n, cw, ch, fill: { i: colour } (from the bottom), left / right: { at: [a, b], label } }   p106's milk
//   c4p097_ticks   { lines: [["১", "৫"]…][], ticked }   p108: fractions each with a box to tick (the first `ticked` ticked)
//   c4p097_head    { n, text }   an exercise heading without a marker ("১."), where ☑ is the book's boxed tick (p108)
//   c4p097_eqs     { lines: [markup | [indent mm, markup]], size, center, box, indent }   lines of working (▭ = a wide box)
//   c4p097_tab     { tab, body }   a box with a tab on its top edge ("অপরদিকে", p99)
//   c4p097_hl      { text }   a yellow highlighted line (p99's "যেমন: …")
//   c4p097_face    { who, mood, size }   রাফি's or তুলি's face alone (p107's table)
//   c4p097_cell    { body, align }   blocks in a table cell, aligned left (p107, p108)
//   c4p097_arrow   { w, angle }   the book's fat blue arrow, turned (p102)
const INK = "#1E2433", RED = "#EF4444";
const f2 = (n) => Math.round(n * 100) / 100;
const COL = { red: RED, orange: "#FB923C", purple: "#8B80C4", yellow: "#FDE047", green: "#8CCB6E", pink: "#EC6F98", teal: "#5CC8D4",
  lime: "#E6EC9E", gold: "#FCD34D", cream: "#FEF7D6", peach: "#F9B98A", grass: "#4E8F37", navy: "#1E3A8A", blue: "#38BDF8" };
const col = (c) => COL[c] || c;

// a drawing: an SVG with labels laid over it ([x, y, markup, anchor c|l|r|b|t, extra class, size pt, colour])
function wrap(ctx, w, h, svg, labels = [], cls = "") {
  const lb = labels.map(([x, y, t, a = "c", k = "", size, color]) => `<span class="c4p097-lb a-${a}${k ? " " + k : ""}" style="left:${f2(x)}mm;top:${f2(y)}mm${size ? `;font-size:${size}pt` : ""}${color ? `;color:${color}` : ""}">${ctx.md(t)}</span>`).join("");
  return `<div class="c4p097-dg${cls ? " " + cls : ""}" style="width:${f2(w)}mm;height:${f2(h)}mm"><svg viewBox="0 0 ${f2(w)} ${f2(h)}" width="${f2(w)}mm" height="${f2(h)}mm">${svg}</svg>${lb}</div>`;
}
function arrowG(x1, y1, x2, y2, c = INK, sw = 0.4, head = 1.8) {
  const a = Math.atan2(y2 - y1, x2 - x1), hx = (s) => x2 - head * Math.cos(a) + s * head * 0.42 * Math.sin(a), hy = (s) => y2 - head * Math.sin(a) - s * head * 0.42 * Math.cos(a);
  return `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2 - head * 0.6 * Math.cos(a))} ${f2(y2 - head * 0.6 * Math.sin(a))}" stroke="${c}" stroke-width="${sw}" fill="none"/><path d="M${f2(x2)} ${f2(y2)}L${f2(hx(1))} ${f2(hy(1))}L${f2(hx(-1))} ${f2(hy(-1))}Z" fill="${c}"/>`;
}
// curly braces: horizontal (ends at yEnd, tip h above or below) and vertical (ends at xEnd, tip h to the left or right)
function braceG(x1, x2, yEnd, h, up, c = INK) {
  const s = up ? -1 : 1, m = (x1 + x2) / 2, q = Math.min(h * 1.1, (x2 - x1) / 4), yS = yEnd + s * h / 2, yT = yEnd + s * h;
  return `<path d="M${f2(x1)} ${f2(yEnd)}Q${f2(x1)} ${f2(yS)} ${f2(x1 + q)} ${f2(yS)}H${f2(m - q)}Q${f2(m)} ${f2(yS)} ${f2(m)} ${f2(yT)}Q${f2(m)} ${f2(yS)} ${f2(m + q)} ${f2(yS)}H${f2(x2 - q)}Q${f2(x2)} ${f2(yS)} ${f2(x2)} ${f2(yEnd)}" fill="none" stroke="${c}" stroke-width=".4" stroke-linejoin="round" stroke-linecap="round"/>`;
}
function braceVG(y1, y2, xEnd, h, left, sw = 0.45) {
  const s = left ? -1 : 1, m = (y1 + y2) / 2, q = Math.min(h * 1.1, (y2 - y1) / 4), xS = xEnd + s * h / 2, xT = xEnd + s * h;
  return `<path d="M${f2(xEnd)} ${f2(y1)}Q${f2(xS)} ${f2(y1)} ${f2(xS)} ${f2(y1 + q)}V${f2(m - q)}Q${f2(xS)} ${f2(m)} ${f2(xT)} ${f2(m)}Q${f2(xS)} ${f2(m)} ${f2(xS)} ${f2(m + q)}V${f2(y2 - q)}Q${f2(xS)} ${f2(y2)} ${f2(xEnd)} ${f2(y2)}" fill="none" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
}

// ── p97: the flowers (each part the same shape, turned) ──
function flowerSvg(it, s) {
  const r = s / 2, l = r * 0.94, on = new Set(it.fill || []), rot = it.rot || 0;
  const P = (d, i, a) => `<path d="${d}" transform="rotate(${f2(a)})" fill="${on.has(i) ? RED : "#fff"}" stroke="${INK}" stroke-width=".32" stroke-linejoin="round"/>`;
  let g = "";
  if (it.f === "petal") {
    const n = it.n, w = l * (n > 6 ? 0.26 : 0.34);
    const d = `M0 0C${f2(w)} ${f2(-l * 0.3)} ${f2(w * 1.18)} ${f2(-l * 0.9)} 0 ${f2(-l)}C${f2(-w * 1.18)} ${f2(-l * 0.9)} ${f2(-w)} ${f2(-l * 0.3)} 0 0Z`;
    for (let i = 0; i < n; i++) g += P(d, i, rot + i * 360 / n);
  } else if (it.f === "hex") { // six petals whose outer edges make a hexagon, a star in the middle
    const k = (x, y) => `${f2(x * l)} ${f2(y * l)}`;
    const d = `M0 0L${k(-0.3, -0.56)}L${k(-0.25, -0.97)}L${k(0.25, -0.97)}L${k(0.3, -0.56)}Z`;
    for (let i = 0; i < 6; i++) g += P(d, i, rot + i * 60);
    for (let i = 0; i < 6; i++) g += `<path d="M0 0L0 ${f2(-l * 0.42)}" transform="rotate(${rot + i * 60 + 30})" stroke="${INK}" stroke-width=".25"/>`;
  } else if (it.f === "clover") { // four heart-shaped leaves, their tips in the middle
    const k = (x, y) => `${f2(x * l * 0.8)} ${f2(y * l)}`;
    const d = `M0 0C${k(-0.2, -0.2)} ${k(-0.66, -0.4)} ${k(-0.54, -0.8)}C${k(-0.44, -1.04)} ${k(-0.08, -1.04)} ${k(0, -0.8)}C${k(0.08, -1.04)} ${k(0.44, -1.04)} ${k(0.54, -0.8)}C${k(0.66, -0.4)} ${k(0.2, -0.2)} 0 0Z`;
    for (let i = 0; i < 4; i++) g += P(d, i, 45 + i * 90);
  } else if (it.f === "ring") { // a black scalloped ring round a white disc cut in two halves
    const R0 = l * 0.7, rb = l * 0.3, ri = l * 0.6;
    for (let i = 0; i < 8; i++) g += `<circle cx="${f2(R0 * Math.cos(i * Math.PI / 4))}" cy="${f2(R0 * Math.sin(i * Math.PI / 4))}" r="${f2(rb)}" fill="${INK}"/>`;
    g += `<circle r="${f2(R0)}" fill="${INK}"/>`;
    g += `<path d="M0 ${f2(-ri)}A${f2(ri)} ${f2(ri)} 0 0 0 0 ${f2(ri)}Z" fill="${on.has(0) ? RED : "#fff"}"/><path d="M0 ${f2(-ri)}A${f2(ri)} ${f2(ri)} 0 0 1 0 ${f2(ri)}Z" fill="${on.has(1) ? RED : "#fff"}"/>`;
    g += `<path d="M0 ${f2(-ri)}V${f2(ri)}" stroke="${INK}" stroke-width=".35"/>`;
  } else throw new Error("c4p097_flowers f? " + it.f);
  return `<svg viewBox="${f2(-r)} ${f2(-r)} ${s} ${s}" width="${s}mm" height="${s}mm">${g}</svg>`;
}

// ── p97: a grid of cells ──
function cellsHtml(ctx, { rows, color = "purple", cw = 10, ch = 8 }) {
  const R = rows.length, C = rows[0].length, W = C * cw + 1, H = R * ch + 1; let g = "";
  rows.forEach((r, i) => [...r].forEach((v, j) => { g += `<rect x="${f2(0.5 + j * cw)}" y="${f2(0.5 + i * ch)}" width="${cw}" height="${ch}" fill="${v === "1" ? col(color) : "#fff"}" stroke="${INK}" stroke-width=".35"/>`; }));
  g += `<rect x=".5" y=".5" width="${C * cw}" height="${R * ch}" fill="none" stroke="${INK}" stroke-width=".5"/>`;
  return wrap(ctx, W, H, g);
}

// ── pies: circles cut into equal sectors ──
function pieHtml(ctx, { items, r = 12, gap = 6, color = "orange", line = INK, label, lw = 0 }) {
  const W = lw + items.length * 2 * r + (items.length - 1) * gap + 1, H = 2 * r + 1, lab = []; let g = "";
  items.forEach((it, j) => {
    const cx = lw + 0.5 + r + j * (2 * r + gap), cy = 0.5 + r, n = it.n, st = it.start || 0, on = new Set(it.fill || []);
    const P = (a, rr = r) => [cx + rr * Math.cos(a * Math.PI / 180), cy - rr * Math.sin(a * Math.PI / 180)];
    for (let i = 0; i < n; i++) {
      const a1 = st + i * 360 / n, a2 = a1 + 360 / n, [x1, y1] = P(a1), [x2, y2] = P(a2);
      g += `<path d="M${f2(cx)} ${f2(cy)}L${f2(x1)} ${f2(y1)}A${r} ${r} 0 0 0 ${f2(x2)} ${f2(y2)}Z" fill="${on.has(i) ? col(it.color || color) : "#fff"}" stroke="${line}" stroke-width=".4" stroke-linejoin="round"/>`;
    }
    g += `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${r}" fill="none" stroke="${line}" stroke-width=".5"/>`;
    if (label && (label.item || 0) === j) {
      const am = st + (label.sector + 0.5) * 360 / n, [tx, ty] = P(am, r * 0.5);
      lab.push([lw / 2 - 1, cy + 2, label.text, "c", "", label.size || 12]);
      g += arrowG(lw / 2 + 1.6, cy + 1.2, tx, ty, INK, 0.35, 1.6);
    }
  });
  return wrap(ctx, W, H, g, lab, "mid");
}

// ── number lines ──
function nlHtml(ctx, b) {
  const U = b.unit, lw = b.lw ?? 6, rw = b.rw ?? 4, ext = b.ext ?? 0, tk = b.tick ?? 1.6, [bw, bh] = b.box || [6, 9], size = b.size || 10;
  const BOX = { "#K": INK, "#B": "#0EA5E9", "#R": "#EF4444" };
  let y = 0.5, svg = "", maxW = 0; const lab = [], rows = [];
  for (const r of b.rows) {
    const n = r.n, len = r.len ?? n, X = (k) => lw + U * k / n, ly = y + (r.ah ?? b.ah ?? 7);
    maxW = Math.max(maxW, X(len) + ext);
    svg += `<path d="M${f2(X(0))} ${f2(ly)}H${f2(X(len) + ext)}" stroke="${INK}" stroke-width=".45"/>`;
    for (let k = 0; k <= len; k++) {
      const big = r.whole && k % n === 0;
      svg += `<path d="M${f2(X(k))} ${f2(ly - (big ? tk * 1.3 : tk))}V${f2(big ? ly + tk * 1.3 : ly)}" stroke="${INK}" stroke-width="${big ? 0.5 : 0.38}"/>`;
    }
    const put = (k, v, above) => {
      const x = X(+k), t = above ? ly - tk - 0.7 : ly + tk * (r.whole ? 1.3 : 1) + 0.7;
      if (BOX[v]) svg += `<rect x="${f2(x - bw / 2)}" y="${f2(above ? t - bh : t)}" width="${bw}" height="${bh}" rx=".6" fill="#fff" stroke="${BOX[v]}" stroke-width=".5"/>`;
      else lab.push([x, t, v, above ? "b" : "t", "", r.size || size]);
    };
    for (const [k, v] of Object.entries(r.above || {})) put(k, v, true);
    for (const [k, v] of Object.entries(r.below || {})) put(k, v, false);
    if (r.zero) lab.push([X(0) - 1, ly - 1.2, r.zero, "r", "", r.size || size]);
    rows.push({ ly, X });
    y = ly + (r.bh ?? b.bh ?? 1.2);
  }
  for (const d of b.dash || []) {
    const A = rows[d.from], Z = rows[d.to], x = lw + U * d.x;
    svg += `<path d="M${f2(x)} ${f2(A.ly - tk)}V${f2(Z.ly)}" stroke="${d.color || "#F97316"}" stroke-width=".45" stroke-dasharray="1.2 .8"/>`;
  }
  return wrap(ctx, maxW + rw, y + 0.5, svg, lab, "mid");
}

// ── fractions joined by curved arrows ──
function arcsHtml(ctx, b) {
  const ws = b.items.map((_, i) => (b.w && b.w[i]) || b.sw || 9), th = b.th ?? 4.2, up = b.up ?? 10, dn = b.dn ?? up, size = b.size || 14;
  const ym = up + th, H = up + 2 * th + dn, xs = []; let x = 0.5;
  ws.forEach((w) => { xs.push(x + w / 2); x += w; });
  const W = x + 0.5, lab = b.items.map((t, i) => [xs[i], ym, t, "c", "", size]); let svg = "";
  for (const a of b.arcs || []) {
    const isUp = a.side !== "down", s = isUp ? -1 : 1, y0 = ym + s * th, rise = a.rise ?? (isUp ? up : dn) * 0.85, yc = y0 + s * rise, c = a.color || RED;
    const xa = xs[a.a] + (a.dx ?? -1), xb = xs[a.b] + (a.ex ?? 0), hd = 1.5;
    svg += `<path d="M${f2(xa)} ${f2(y0)}C${f2(xa)} ${f2(yc)} ${f2(xb)} ${f2(yc)} ${f2(xb)} ${f2(y0 - s * hd * 0.6)}" fill="none" stroke="${c}" stroke-width=".4"/>`;
    svg += `<path d="M${f2(xb)} ${f2(y0)}L${f2(xb - 0.75)} ${f2(y0 - s * hd)}L${f2(xb + 0.75)} ${f2(y0 - s * hd)}Z" fill="${c}"/>`;
    if (a.label) {
      const out = a.lpos === "out", lx = a.lx ?? (out ? (xa + xb) / 2 : xb - 5.2), ly = a.ly ?? (out ? yc + s * 0.4 : y0 + s * 2.4);
      lab.push([lx, ly, a.label, out ? (isUp ? "b" : "t") : "c", "c4p097-op", a.size || 11]);
    }
  }
  return wrap(ctx, W, H, svg, lab, b.mid === false ? "" : "mid");
}

// ── the shapes of the book's rules ──
const ICON = {
  o: `<circle cx="5" cy="5" r="4.2" fill="#EF4444"/>`, q: `<rect x="1" y="1" width="8" height="8" fill="#EF4444"/>`, t: `<path d="M5 .8L9.4 9H.6Z" fill="#16A34A"/>`,
  A: `<path d="M5 .6L9.6 9.2H.4Z" fill="#EF4444" stroke="#EF4444" stroke-width=".6" stroke-linejoin="round"/>`, O: `<circle cx="5" cy="5" r="4.6" fill="#9B4FA8"/>`,
  S: `<path d="M5 .3L6.2 3.7 9.8 3.8 7 6 8 9.5 5 7.5 2 9.5 3 6 .2 3.8 3.8 3.7Z" fill="#4F7CC8"/>`, G: `<rect x=".4" y="1.4" width="9.2" height="7.2" rx="1.4" fill="#4CBB53"/>`,
};
function symPart(ctx, s, z) {
  return [...s].map((ch) => ICON[ch] ? `<svg class="c4p097-ic" viewBox="0 0 10 10" style="width:${z}mm;height:${z}mm">${ICON[ch]}</svg>` : `<span class="c4p097-sop">${ctx.esc(ch)}</span>`).join("");
}

// ── p97–98: a fraction's লব and হর, arrows to words in boxes ──
function lhHtml(ctx, { n, d, boxes, w = 46, size = 13 }) {
  const H = 16.5, yn = 4.8, yd = 11.7, lab = [[3.6, yn, n, "c", "", size], [3.6, yd, d, "c", "", size]], bx = 19.6, bw = w - bx - 0.5;
  let g = `<path d="M.8 8.25H6.4" stroke="${INK}" stroke-width=".42"/>` + arrowG(7.6, yn, 18.8, yn, INK, 0.35, 1.6) + arrowG(7.6, yd, 18.8, yd, INK, 0.35, 1.6);
  if (boxes.length === 2) {
    g += `<rect x="${bx}" y="1.4" width="${f2(bw)}" height="6.2" fill="#fff" stroke="${INK}" stroke-width=".38"/><rect x="${bx}" y="8.9" width="${f2(bw)}" height="6.2" fill="#fff" stroke="${INK}" stroke-width=".38"/>`;
    g += `<path d="M${f2(bx - 1)} 8.25H${f2(w - 0.2)}" stroke="${INK}" stroke-width=".5"/>`;
    boxes.forEach((t, i) => t && lab.push([bx + bw / 2, i ? 12 : 4.5, t, "c", "bn", 10.5]));
  } else {
    g += `<rect x="${bx}" y="3.6" width="${f2(bw)}" height="8.4" fill="#fff" stroke="${INK}" stroke-width=".38"/>`;
    lab.push([bx + bw / 2, 7.8, boxes[0], "c", "bn", 10.5]);
  }
  return wrap(ctx, w, H, g, lab, "mid");
}

// ── p99: প্রকৃত, অপ্রকৃত and মিশ্র ভগ্নাংশ ──
function kindsHtml(ctx) {
  const G = "#16A34A", R = "#DC2626", W = 164, H = 29, lab = []; let g = "";
  const frac = (x, yb, a, c) => { g += `<path d="M${f2(x - 2.4)} ${f2(yb)}H${f2(x + 2.4)}" stroke="${INK}" stroke-width=".42"/>`; lab.push([x, yb - 2.6, a, "c", "", 12.5], [x, yb + 2.9, c, "c", "", 12.5]); };
  // প্রকৃত
  frac(44, 10, "২", "৫");
  lab.push([36, 7.3, "ছোটো", "r", "bn", 12, G], [36, 12.9, "বড়ো", "r", "bn", 12, R], [37, 24.3, "প্রকৃত ভগ্নাংশ", "c", "bn b", 12.5]);
  g += arrowG(36.8, 7.4, 41.2, 7.4, G, 0.4, 1.5) + arrowG(36.8, 12.9, 41.2, 12.9, R, 0.4, 1.5);
  // অপ্রকৃত
  frac(106, 12.6, "৭", "৫");
  lab.push([84, 3.6, "বড়ো", "c", "bn", 12, R], [84, 7.9, "(অথবা সমান)", "c", "bn sm"], [86, 14.6, "ছোটো", "c", "bn", 12, G], [86, 18.9, "(অথবা সমান)", "c", "bn sm"], [94, 24.3, "অপ্রকৃত ভগ্নাংশ", "c", "bn b", 12.5]);
  g += arrowG(88.8, 3.8, 103.2, 9.4, R, 0.35, 1.5) + arrowG(91, 14.8, 103.2, 15.5, G, 0.35, 1.5);
  // মিশ্র
  lab.push([133.4, 12.2, "১", "c", "", 14]); frac(138.8, 12.2, "২", "৫");
  lab.push([147.8, 9.3, "প্রকৃত", "l", "bn", 11.5, R], [147.8, 13.9, "ভগ্নাংশ", "l", "bn", 11.5, R], [127.4, 17.4, "পূর্ণ সংখ্যা", "r", "bn", 11.5, R], [140, 24.3, "মিশ্র ভগ্নাংশ", "c", "bn b", 12.5]);
  g += arrowG(147.4, 9.4, 141.8, 9.4, R, 0.35, 1.4) + arrowG(127.6, 16.6, 132.6, 14.4, R, 0.35, 1.4);
  return `<div class="c4p097-kinds">${wrap(ctx, W, H, g, lab, "mid")}</div>`;
}

// ── p105: a ribbon of equal cells, a brace over some, braces under some ──
function tapeHtml(ctx, { cells, w = 160, h = 8, top, under = [] }) {
  const n = cells.length, cw = w / n, X = (k) => 0.5 + k * cw, ty = top ? 13 : 0.5, lab = []; let g = "";
  cells.forEach((c, i) => { g += `<rect x="${f2(X(i))}" y="${f2(ty)}" width="${f2(cw)}" height="${h}" fill="${col(c)}" stroke="${INK}" stroke-width=".4"/>`; });
  if (top) {
    const [a, b] = top.at; g += braceG(X(a), X(b), ty - 0.8, 3.2, true);
    lab.push([(X(a) + X(b)) / 2, ty - 7.4, top.label, "c", "bn bx", 11.5]);
  }
  const by = ty + h + 0.8;
  for (const u of under) {
    const [a, b] = u.at, m = (X(a) + X(b)) / 2;
    if (u.brace) g += braceG(X(a) + 0.4, X(b) - 0.4, by, 2.8, false);
    lab.push([m, by + (u.brace ? 7.4 : 4.6), u.label, "c", "", 12]);
  }
  return wrap(ctx, w + 1, by + 11, g, lab, "mid");
}

// ── p106: a bar standing up, cut into equal cells, with braces left and right ──
function vbarHtml(ctx, { n = 5, cw = 13, ch = 6, fill = {}, left, right, lw = 15, rw = 15 }) {
  const Y = (i) => 0.5 + (n - i) * ch, lab = []; let g = "";
  for (let i = 0; i < n; i++) g += `<rect x="${lw}" y="${f2(Y(i + 1))}" width="${cw}" height="${ch}" fill="${fill[i] ? col(fill[i]) : "#fff"}" stroke="${INK}" stroke-width=".4"/>`;
  if (left) { const [a, b] = left.at; g += braceVG(Y(b) + 0.2, Y(a) - 0.2, lw - 1, 3.6, true, 0.7); lab.push([lw - 8, (Y(a) + Y(b)) / 2, left.label, "c", "", 12]); }
  if (right) { const [a, b] = right.at; g += braceVG(Y(b) + 0.2, Y(a) - 0.2, lw + cw + 1, 2.8, false, 0.45); lab.push([lw + cw + 8, (Y(a) + Y(b)) / 2, right.label, "c", "", 12]); }
  return wrap(ctx, lw + cw + rw, n * ch + 1, g, lab, "mid");
}

module.exports = {
  kinds: {
    c4p097_flowers: (b, ctx) => `<div class="c4p097-fls">${b.items.map((it) => `<div class="c4p097-fl"><span class="c4p097-fp">${flowerSvg(it, b.s || 12.5)}</span><span class="c4p097-ff">${ctx.md(it.frac)}</span></div>`).join("")}</div>`,
    c4p097_cells: (b, ctx) => cellsHtml(ctx, b),
    c4p097_pie: (b, ctx) => pieHtml(ctx, b),
    c4p097_nl: (b, ctx) => nlHtml(ctx, b),
    c4p097_arcs: (b, ctx) => arcsHtml(ctx, b),
    c4p097_cancel: (b, ctx) => {
      const it = (t) => t.startsWith("~") ? `<span class="c4p097-ci x">${ctx.esc(t.slice(1))}</span>` : `<span class="c4p097-ci">${ctx.esc(t)}</span>`;
      return `<div class="c4p097-cn"><span class="c4p097-cs">${b.up.map(it).join("")}<i class="c4p097-cb"></i>${b.down.map(it).join("")}</span>${b.eq ? `<span class="c4p097-ce">= ${ctx.md(b.eq)}</span>` : ""}</div>`;
    },
    c4p097_sym: (b, ctx) => `<div class="c4p097-sym${b.bg ? " bg" : ""}${b.left ? " l" : ""}">${b.terms.map((t) => Array.isArray(t)
      ? `<span class="c4p097-sf"><span>${symPart(ctx, t[0], b.z || 5.6)}</span><span>${symPart(ctx, t[1], b.z || 5.6)}</span></span>` : `<span class="c4p097-sop big">${ctx.esc(t)}</span>`).join("")}</div>`,
    c4p097_lh: (b, ctx) => lhHtml(ctx, b),
    c4p097_kinds: (b, ctx) => kindsHtml(ctx),
    c4p097_tape: (b, ctx) => tapeHtml(ctx, b),
    c4p097_vbar: (b, ctx) => vbarHtml(ctx, b),
    c4p097_ticks: (b, ctx) => { let k = 0;
      return `<div class="c4p097-tks">${b.lines.map((ln) => `<div>${ln.map(([a, d]) => `<span class="c4p097-tki">${ctx.md(`{{${a}/${d}}}`)}<span class="c4p097-tb${k++ < (b.ticked || 0) ? " on" : ""}">${k <= (b.ticked || 0) ? "✓" : ""}</span>,</span>`).join("")}</div>`).join("")}</div>`; },
    c4p097_head: (b, ctx) => `<div class="ext c4p097-head"><span class="mk">${ctx.esc(b.n)}.</span><span>${ctx.md(b.text).replace("☑", `<span class="c4p097-tb on">✓</span>`)}</span></div>`,
    c4p097_eqs: (b, ctx) => `<div class="c4p097-eqs${b.center ? " c" : ""}${b.box ? " bx" : ""}" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.indent ? `padding-left:${b.indent}mm;` : ""}">${b.lines.map((l) => {
      const [ind, t] = Array.isArray(l) ? l : [0, l];
      return `<div class="c4p097-eq"${ind ? ` style="padding-left:${ind}mm"` : ""}>${ctx.md(t).replace(/▭/g, `<span class="abox c4p097-w"></span>`)}</div>`; }).join("")}</div>`,
    c4p097_tab: (b, ctx, page) => `<div class="c4p097-tab"><span class="c4p097-tt">${ctx.md(b.tab)}</span>${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
    c4p097_hl: (b, ctx) => `<div class="c4p097-hlw"><span class="c4p097-hl">${ctx.md(b.text)}</span></div>`,
    c4p097_face: (b, ctx) => { const f = ctx.picFile(`face-${b.who}-${b.mood || "talk"}`) || ctx.picFile(`face-${b.who}`);
      return `<span class="c4p097-face" style="--w:${ctx.WHO[b.who]};width:${b.size || 15}mm;height:${b.size || 15}mm">${f ? `<img src="file://${f.file}">` : ""}</span>`; },
    c4p097_cell: (b, ctx, page) => `<div class="c4p097-cell" style="text-align:${b.align || "left"};gap:${b.gap ?? 1.2}mm">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
    c4p097_arrow: (b) => { const w = b.w || 10, h = w * 0.72;
      return `<div class="c4p097-arw"><svg viewBox="0 0 ${w} ${f2(h)}" width="${w}mm" height="${f2(h)}mm" style="transform:rotate(${b.angle || 0}deg)"><path d="M.4 ${f2(h * 0.32)}H${f2(w * 0.55)}V.4L${f2(w - 0.4)} ${f2(h / 2)}L${f2(w * 0.55)} ${f2(h - 0.4)}V${f2(h * 0.68)}H.4Z" fill="#38BDF8" stroke="#0284C7" stroke-width=".35" stroke-linejoin="round"/></svg></div>`; },
  },
  css: `
.c4p097-dg { position: relative; flex: none; max-width: 100% } .c4p097-dg.mid { align-self: center; margin: 0 auto }
.c4p097-dg > svg { position: absolute; left: 0; top: 0; display: block; overflow: visible }
.c4p097-lb { position: absolute; white-space: nowrap; font: 700 11.5pt/1.15 'Baloo Da 2'; color: ${INK} }
.c4p097-lb.a-c { transform: translate(-50%, -50%) } .c4p097-lb.a-l { transform: translateY(-50%) } .c4p097-lb.a-r { transform: translate(-100%, -50%) }
.c4p097-lb.a-b { transform: translate(-50%, -100%) } .c4p097-lb.a-t { transform: translateX(-50%) }
.c4p097-lb.bn { font-family: 'Noto Sans Bengali'; font-weight: 600 } .c4p097-lb.b { font-weight: 700 } .c4p097-lb.sm { font-size: 8pt; font-weight: 500 }
.c4p097-lb.bx { background: #fff; border: .4mm solid ${INK}; border-radius: 1mm; padding: .3mm 2mm .1mm }
.c4p097-lb.c4p097-op .abox { width: 4.6mm; height: 4.4mm; vertical-align: -.9mm; margin: 0 .3mm; border-radius: .8mm }
.c4p097-fls { display: grid; grid-template-columns: repeat(3, auto); justify-content: space-evenly; gap: 2.4mm 0 }
.c4p097-fl { display: flex } .c4p097-fp, .c4p097-ff { display: flex; align-items: center; justify-content: center; height: 17mm; border: .55mm dashed #5CC8D4; background: #fff }
.c4p097-fp { width: 20mm } .c4p097-ff { width: 11mm; border-left: 0; font: 700 15pt 'Baloo Da 2' }
.c4p097-cn { display: flex; align-items: center; gap: 2.4mm; font: 700 13pt/1.05 'Baloo Da 2' } .c4p097-cs { display: inline-flex; flex-direction: column; align-items: center }
.c4p097-cb { display: block; width: 7.5mm; border-top: .4mm solid ${INK}; margin: .5mm 0 .3mm } .c4p097-ci { position: relative; padding: 0 .4mm }
.c4p097-ci.x::after { content: ""; position: absolute; left: -.4mm; right: -.4mm; top: 52%; border-top: .4mm solid #DC2626; transform: rotate(-38deg) }
.c4p097-ce { white-space: nowrap; font-size: 14pt }
.c4p097-sym { display: flex; align-items: center; justify-content: center; gap: 2.4mm; padding: 1.2mm 3mm } .c4p097-sym.l { justify-content: flex-start }
.c4p097-sym.bg { background: #FDE4DE; border-radius: 2mm; align-self: flex-start }
.c4p097-sf { display: inline-flex; flex-direction: column; align-items: center } .c4p097-sf > span { display: flex; align-items: center; gap: .6mm; padding: .5mm 2.4mm }
.c4p097-sf > span:first-child { border-bottom: .45mm solid ${INK} } .c4p097-ic { display: block } .c4p097-sop { font: 700 13pt/1 'Baloo Da 2'; color: ${INK} } .c4p097-sop.big { font-size: 16pt }
.c4p097-kinds { background: linear-gradient(#FEF9C3, #FEF3A0); border: .5mm solid #FACC15; border-radius: 4mm; padding: 1.6mm 0 .8mm; box-shadow: 0 .8mm 0 #FDE68A }
.c4p097-tks { display: flex; flex-direction: column; gap: 1.2mm; padding: .6mm 0 } .c4p097-tks > div { display: flex; gap: 1.2mm; align-items: center }
.c4p097-tki { display: inline-flex; align-items: center; font: 700 12.5pt 'Baloo Da 2' } .c4p097-tki .frac { margin-right: .5mm }
.c4p097-tb { display: inline-flex; align-items: center; justify-content: center; width: 6.4mm; height: 7mm; border: .4mm solid ${INK}; background: #fff; border-radius: .6mm; vertical-align: middle; margin: 0 .5mm; font: 700 13pt/1 'Noto Sans Symbols 2', 'Noto Sans', sans-serif; color: #16A34A }
.c4p097-head .c4p097-tb { width: 6.4mm; height: 6.8mm }
.c4p097-eqs { display: flex; flex-direction: column; gap: 1.4mm; font: 700 13pt/1.3 'Baloo Da 2' } .c4p097-eqs.c { align-items: center }
.c4p097-eqs.bx { align-self: center; border: .5mm solid var(--c); border-radius: 3mm; background: #fff; padding: 2mm 5mm; box-shadow: 0 .8mm 0 var(--s) }
.c4p097-eq { white-space: nowrap } .abox.c4p097-w { width: 15mm }
.c4p097-tab { position: relative; border: .5mm solid var(--c); border-radius: 3mm; background: #fff; padding: 4.6mm 3.4mm 2mm; margin-top: 3.4mm; box-shadow: 0 .8mm 0 var(--s) }
.c4p097-tt { position: absolute; left: 3mm; top: -3.6mm; background: var(--c); color: #fff; font: 700 11pt/1 'Noto Sans Bengali'; padding: 1.4mm 3.4mm 1.1mm; border-radius: 2mm 2mm 2mm 0 }
.c4p097-hlw { display: flex; justify-content: flex-end } .c4p097-hl { display: inline-block; background: #FDE047; padding: .8mm 4mm; border-radius: 1.6mm; font: 700 13pt 'Baloo Da 2'; color: ${INK} }
.c4p097-face { display: inline-block; flex: none; border-radius: 50%; overflow: hidden; background: #fff; border: .6mm solid #fff; box-shadow: 0 0 0 .6mm var(--w) } .c4p097-face img { width: 100%; height: 100%; object-fit: cover; display: block }
.c4p097-cell { display: flex; flex-direction: column; padding: 1mm .6mm } .c4p097-cell .tx { font-size: 12pt; line-height: 1.4 }
.c4p097-arw { display: flex; align-items: center; justify-content: center } .c4p097-arw svg { display: block }
`,
};
