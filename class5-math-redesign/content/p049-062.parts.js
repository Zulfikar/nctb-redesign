// Printed pages 49–62's own kinds (prefixed c5p049_): chapter ৪ সাধারণ ভগ্নাংশ. Every fraction picture is drawn here, cut
// into exactly equal parts. Units: mm. Written by a helper, 25 Nov 2026.
//   c5p049_tape    { n, len, fill, ext, cw, h, thick, labels: [whole…], left, lw, braces: [{ at: [a, b], label }], color, size }
//                  pp49–50: a tape of `len` cells, `n` to a whole; the first `fill` cells coloured; the whole numbers over their
//                  lines (drawn thick if `thick`); its top and bottom lines run on `ext` cells past the last cell (the book's
//                  open end); the fraction or mixed number on its left (in `lw` mm); red braces under cells a…b, labelled
//   c5p049_m2i     p49's diagram: ২{{১/৪}} with its whole (ringed ২) and লব (ringed ১), the box over the হর, and the four
//                  coloured arrows to ৪ × ২ + ১ = ৯
//   c5p049_i2m     p50's diagram: {{৯/৪}} = □{{□/□}}, arrows from ৯ ÷ ৪ = ২ ভাগশেষ ১ up to the boxes
//   c5p049_steps   { items, w: [slot mm…], over: { slot: markup }, under, arcs: [{ a, b, side: up|down }], size, rise }
//                  p52: fractions in a row, the ÷ labels over and under the "=" signs, and the book's fat red arcs from
//                  one label to the next (the order of the steps)
//   c5p049_ring    p53's chains of equivalent fractions: every হর ringed in blue, the common হর ১৫ ringed in red and joined,
//                  blue arrows to the multiples of ৫ and ৩ in a pink box (their ১৫s ringed in red and joined)
//   c5p049_eqs     { lines: [markup | [indent mm, markup]], size, center, indent, gap, aw, tight }   lines of working; ▭ a wide box,
//                  → a short red arrow, ⟶ a long blue arrow (aw mm long, 18 by default); tight: smaller boxes in fractions
//   c5p049_jars    { rows: [[jar, jar], [jar, jar]], color, dotted, w, h, lw, gap }   pp56–57: bars standing up, each
//                  { n, k, label } cut into n, k coloured from the bottom, its fraction on its left at the water's level;
//                  the book's fat blue arrow down between the rows
//   c5p049_ribbon  { cw }   p58: {{৭/৫}} মি (purple) and {{৪/৫}} মি (orange) of ribbon in fifths, the dotted arcs with their
//                  lengths over it, the metre line with a tick every fifth under it (red dotted lines at ০, ১, ২)
//   c5p049_road    { pics: [{ pic, w, h }], caps, dists, w }   p62: সবুজের বাড়ি, বিদ্যালয় and মিতুর বাড়ি over the road line
//                  (drawn as the book draws it: two equal stretches), the dotted arcs and the distances under it
//   c5p049_rule    { title, lines }   p50's rule card: a tab with its title over a yellow card of numbered lines
//   c5p049_face    { who, mood, size }   রাফি's or তুলি's face alone, beside the book's rule boxes (p51)
const INK = "#1E2433", RED = "#EF4444", BLUE = "#2F4AA8";
const f2 = (n) => Math.round(n * 100) / 100;
const BN = "০১২৩৪৫৬৭৮৯", bn = (n) => String(n).replace(/\d/g, (d) => BN[d]);

// a drawing: an SVG with labels laid over it ([x, y, markup, anchor c|l|r|b|t, extra class, size pt, colour])
function wrap(ctx, w, h, svg, labels = [], cls = "") {
  const lb = labels.map(([x, y, t, a = "c", k = "", size, color]) => `<span class="c5p049-lb a-${a}${k ? " " + k : ""}" style="left:${f2(x)}mm;top:${f2(y)}mm${size ? `;font-size:${size}pt` : ""}${color ? `;color:${color}` : ""}">${ctx.md(t)}</span>`).join("");
  return `<div class="c5p049-dg${cls ? " " + cls : ""}" style="width:${f2(w)}mm;height:${f2(h)}mm"><svg viewBox="0 0 ${f2(w)} ${f2(h)}" width="${f2(w)}mm" height="${f2(h)}mm">${svg}</svg>${lb}</div>`;
}
const line = (x1, y1, x2, y2, c = INK, sw = 0.4, dash) => `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}" stroke="${c}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ""} fill="none"/>`;
// an arrowhead at (x2, y2), coming from (x1, y1)
function head(x1, y1, x2, y2, c, h = 1.8) {
  const a = Math.atan2(y2 - y1, x2 - x1), p = (s) => [x2 - h * Math.cos(a) + s * h * 0.45 * Math.sin(a), y2 - h * Math.sin(a) - s * h * 0.45 * Math.cos(a)];
  const [ax, ay] = p(1), [bx, by] = p(-1);
  return `<path d="M${f2(x2)} ${f2(y2)}L${f2(ax)} ${f2(ay)}L${f2(bx)} ${f2(by)}Z" fill="${c}"/>`;
}
// a line through points, an arrowhead at its end
function arrowPath(pts, c, sw = 0.45, h = 1.8) {
  const n = pts.length, [x1, y1] = pts[n - 2], [x2, y2] = pts[n - 1], a = Math.atan2(y2 - y1, x2 - x1);
  const end = [x2 - h * 0.7 * Math.cos(a), y2 - h * 0.7 * Math.sin(a)];
  const d = "M" + pts.slice(0, -1).concat([end]).map(([x, y]) => `${f2(x)} ${f2(y)}`).join("L");
  return `<path d="${d}" stroke="${c}" stroke-width="${sw}" fill="none" stroke-linejoin="round"/>` + head(x1, y1, x2, y2, c, h);
}
// a curly brace from x1 to x2, its ends at yEnd, its tip h below
function braceDown(x1, x2, yEnd, h, c = INK, sw = 0.4) {
  const m = (x1 + x2) / 2, q = Math.min(h * 1.1, (x2 - x1) / 4), yS = yEnd + h / 2, yT = yEnd + h;
  return `<path d="M${f2(x1)} ${f2(yEnd)}Q${f2(x1)} ${f2(yS)} ${f2(x1 + q)} ${f2(yS)}H${f2(m - q)}Q${f2(m)} ${f2(yS)} ${f2(m)} ${f2(yT)}Q${f2(m)} ${f2(yS)} ${f2(m + q)} ${f2(yS)}H${f2(x2 - q)}Q${f2(x2)} ${f2(yS)} ${f2(x2)} ${f2(yEnd)}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
}
// a fraction drawn in a drawing: its line, its top and bottom as labels (so they take the book's font)
function frac(svg, lab, x, y, top, bot, { size = 13, w = 6, color } = {}) {
  svg.push(line(x - w / 2, y, x + w / 2, y, color || INK, 0.4));
  lab.push([x, y - 2.9, top, "c", "", size, color], [x, y + 3.2, bot, "c", "", size, color]);
}

// ── pp49–50: a tape of cells, the whole numbers over it ──
function tapeHtml(ctx, b) {
  const n = b.n, len = b.len, cw = b.cw || 7, h = b.h || 6.6, ext = b.ext ?? 0.7, lw = b.lw ?? 0, fillN = b.fill || 0, size = b.size || 12.5;
  const top = b.labels ? 6 : 0.8, X = (k) => lw + 0.5 + k * cw, lab = [], col = b.color || "#EE2A2F";
  let g = "";
  for (let i = 0; i < len; i++) g += `<rect x="${f2(X(i))}" y="${f2(top)}" width="${f2(cw)}" height="${f2(h)}" fill="${i < fillN ? col : "#fff"}"/>`;
  // the thick lines are the labelled whole numbers' (p50's top tape runs on past ২, thin)
  const whole = new Set((b.labels || []).map((w) => w * n));
  for (let i = 1; i <= len; i++) { const thick = b.thick && whole.has(i); g += line(X(i), top, X(i), top + h, INK, thick ? 1.05 : 0.38); }
  g += `<path d="M${f2(X(len + ext))} ${f2(top)}H${f2(X(0))}V${f2(top + h)}H${f2(X(len + ext))}" fill="none" stroke="${INK}" stroke-width=".45"/>`;
  for (const w of b.labels || []) lab.push([X(w * n), top - 2.9, bn(w), "c", "", size]);
  if (b.left) lab.push([b.lx ?? lw / 2, top + h / 2, b.left, "c", "", b.lsize || size + 0.5]);
  let bot = top + h + 0.5;
  for (const br of b.braces || []) {
    const [a, z] = br.at;
    g += braceDown(X(a) + 0.4, X(z) - 0.4, top + h + 0.7, 2.4, RED, 0.5);
    if (br.label) lab.push([(X(a) + X(z)) / 2, top + h + 6.4, br.label, "c", "", size, RED]);
    bot = Math.max(bot, top + h + (br.label ? 9.4 : 3.6));
  }
  return wrap(ctx, X(len + ext) + 0.5, bot, g, lab, b.center ? "mid" : "");
}

// ── p49: ২{{১/৪}} → {{৯/৪}} ──
function m2iHtml(ctx) {
  const BL = "#3B4BA8", GR = "#16A34A", PK = "#C2459A", W = 60, H = 26, svg = [], lab = [];
  // the mixed number: its whole and its লব ringed, the box for the new লব
  svg.push(`<circle cx="23.5" cy="8.6" r="2.5" fill="#fff" stroke="${BL}" stroke-width=".4"/>`, `<circle cx="31" cy="4.2" r="2.5" fill="#fff" stroke="${GR}" stroke-width=".4"/>`);
  lab.push([23.5, 8.7, "২", "c", "", 12], [31, 4.3, "১", "c", "", 12]);
  svg.push(line(27.8, 8.6, 34.2, 8.6), line(40.2, 8.6, 47.8, 8.6));
  lab.push([31, 12.1, "৪", "c", "", 13], [37.2, 8.6, "=", "c", "", 14], [44, 12.1, "৪", "c", "", 13]);
  svg.push(`<rect x="41.2" y="1.6" width="5.6" height="5.6" fill="#fff" stroke="${PK}" stroke-width=".5"/>`);
  // ৪ × ২ + ১ = ৯
  const yb = 22.4, xs = { d: 18.5, x: 22.5, w: 26.5, p: 30.5, n: 34.5, e: 38.5, r: 42.5 };
  [["d", "৪"], ["x", "×"], ["w", "২"], ["p", "+"], ["n", "১"], ["e", "="], ["r", "৯"]].forEach(([k, t]) => lab.push([xs[k], yb, t, "c", "", 13]));
  svg.push(arrowPath([[28.2, 12.1], [12.5, 12.1], [12.5, yb], [16.7, yb]], RED));
  svg.push(arrowPath([[21, 8.6], [14.6, 8.6], [25.4, 19.8]], BL));
  svg.push(arrowPath([[32.4, 6.3], [36.6, 13.6], [35.2, 19.9]], GR));
  svg.push(arrowPath([[46.8, 4.4], [52.6, 4.4], [52.6, yb], [44.4, yb]], PK));
  return wrap(ctx, W, H, svg.join(""), lab, "mid c5p049-m2i");
}

// ── p50: {{৯/৪}} = □{{□/□}} ──
function i2mHtml(ctx) {
  const PU = "#6D5BC4", W = 54, H = 26, svg = [], lab = [];
  frac(svg, lab, 6, 8.8, "৯", "৪", { size: 13 });
  lab.push([12, 8.8, "=", "c", "", 14]);
  const box = (x, y) => `<rect x="${x}" y="${y}" width="6.2" height="6.2" fill="#fff" stroke="${INK}" stroke-width=".45"/>`;
  svg.push(box(15, 5.7), box(24.4, 1.6), line(23.6, 8.8, 31.4, 8.8), box(24.4, 10));
  const yb = 22.4;
  [[3.5, "৯"], [7.6, "÷"], [11.7, "৪"], [15.8, "="], [19.9, "২"], [30.5, "ভাগশেষ"], [40.6, "১"]].forEach(([x, t]) => lab.push([x, yb, t, "c", "", 13]));
  svg.push(arrowPath([[20.1, 19.6], [18.4, 12.3]], RED, 0.4, 1.6));
  svg.push(arrowPath([[40.6, 19.5], [31.4, 3.4]], PU, 0.35, 1.6));
  return wrap(ctx, W, H, svg.join(""), lab, "mid");
}

// ── p52: fractions in a row, the steps over and under the "=" signs, fat red arcs from one step to the next ──
function stepsHtml(ctx, b) {
  const ws = b.items.map((_, i) => (b.w && b.w[i]) || 9), size = b.size || 14, rise = b.rise ?? (b.arcs && b.arcs.length ? 7 : 0), lr = 5;
  const xs = []; let x = 0.5; ws.forEach((w) => { xs.push(x + w / 2); x += w; });
  const W = x + 0.5, yO = rise + lr / 2, yM = rise + lr + 5.2, yU = yM + 5.2 + lr / 2, H = yU + lr / 2 + rise + 0.5, lab = [], svg = [];
  b.items.forEach((t, i) => lab.push([xs[i], yM, t, "c", "", size]));
  for (const [k, t] of Object.entries(b.over || {})) lab.push([xs[k], yO, t, "c", "c5p049-op", size - 2]);
  for (const [k, t] of Object.entries(b.under || {})) lab.push([xs[k], yU, t, "c", "c5p049-op", size - 2]);
  for (const a of b.arcs || []) {
    const up = a.side !== "down", s = up ? -1 : 1, y0 = up ? yO - lr / 2 + 0.2 : yU + lr / 2 - 0.2, xa = xs[a.a] - 1.4, xb = xs[a.b] + 0.8, yc = y0 + s * rise * 1.25, c = "#E8282B";
    svg.push(`<path d="M${f2(xa)} ${f2(y0)}C${f2(xa)} ${f2(yc)} ${f2(xb)} ${f2(yc)} ${f2(xb)} ${f2(y0 + s * 2.2)}" stroke="${c}" stroke-width="1.15" fill="none"/>`);
    svg.push(`<path d="M${f2(xb)} ${f2(y0 - s * 0.2)}L${f2(xb - 1.7)} ${f2(y0 + s * 2.6)}L${f2(xb + 1.7)} ${f2(y0 + s * 2.6)}Z" fill="${c}"/>`);
  }
  return wrap(ctx, W, H, svg.join(""), lab, "mid");
}

// ── p53: the chains of equivalent fractions with their হর ringed ──
function ringHtml(ctx) {
  const RB = "#2F4AA8", RR = "#E11D2A", W = 116, H = 36, svg = [], lab = [], pitch = 7, x0 = 5;
  const chain = (y, list, red) => list.forEach(([t, d], i) => {
    const x = x0 + i * pitch * 2;
    frac(svg, lab, x, y, t, d, { size: 12.5, w: 6.2 });
    svg.push(`<circle cx="${f2(x)}" cy="${f2(y + 3.3)}" r="3" fill="none" stroke="${i === red ? RR : RB}" stroke-width=".4"/>`);
    if (i) lab.push([x - pitch, y, "=", "c", "", 13]);
  });
  const y1 = 8.5, y2 = 24.5;
  chain(y1, [["৩", "৫"], ["৬", "১০"], ["৯", "১৫"], ["১২", "২০"]], 2);
  chain(y2, [["২", "৩"], ["৪", "৬"], ["৬", "৯"], ["৮", "১২"], ["১০", "১৫"]], 4);
  // the common হর joined
  const xa = x0 + 2 * pitch * 2, xb = x0 + 4 * pitch * 2;
  svg.push(line(xa + 2.1, y1 + 5.4, xb - 2.1, y2 + 1.2, RR, 0.3));
  // arrows to the multiples
  const bx = 77, bw = 38;
  svg.push(arrowPath([[x0 + 3 * pitch * 2 + 4.5, y1], [bx - 1.2, y1]], RB, 0.55, 2.2), arrowPath([[x0 + 4 * pitch * 2 + 4.5, y2], [bx - 1.2, y2]], RB, 0.55, 2.2));
  svg.push(`<rect x="${bx}" y="1.5" width="${bw}" height="${H - 3}" rx="3" fill="#FBCFE8" stroke="${RR}" stroke-width=".35"/>`);
  const nums = (y, list, red) => { let x = bx + 4; const at = []; list.forEach((t, i) => {
    const wd = t.length > 1 ? 4.2 : 2.3; lab.push([x, y, t + (i < list.length - 1 ? "," : "…"), "l", "", 12]); at.push(x + wd / 2); x += wd + (i < list.length - 1 ? 2.9 : 0); });
    svg.push(`<circle cx="${f2(at[red])}" cy="${f2(y + 0.1)}" r="2.9" fill="none" stroke="${RR}" stroke-width=".4"/>`); return at[red]; };
  const r1 = nums(y1 + 0.4, ["৫", "১০", "১৫", "২০"], 2), r2 = nums(y2 + 0.4, ["৩", "৬", "৯", "১২", "১৫"], 4);
  svg.push(line(r1 + 1.6, y1 + 2.8, r2 - 1.4, y2 - 2.2, RR, 0.3));
  return wrap(ctx, W, H, svg.join(""), lab, "mid");
}

// ── lines of working: ▭ a wide box, → a short red arrow, ⟶ a long blue one ──
const ARW = (w, c, sw) => `<svg class="c5p049-ar" viewBox="0 0 ${w} 4" width="${w}mm" height="4mm"><path d="M0 2H${w - 2.4}" stroke="${c}" stroke-width="${sw}"/><path d="M${w} 2L${w - 2.8} .7V3.3Z" fill="${c}"/></svg>`;
const eqsMd = (ctx, t, aw = 18) => ctx.md(t).replace(/▭/g, `<span class="abox c5p049-w"></span>`).replace(/⟶/g, ARW(aw, BLUE, 0.6)).replace(/→/g, ARW(12, RED, 0.6));

// ── pp56–57: bars standing up, a fat arrow down between the rows ──
function jarsHtml(ctx, b) {
  const w = b.w || 24, h = b.h || 21, lw = b.lw || 9, gap = b.gap || 6, cg = b.cg || 13, col = b.color || "#8ED6F0", lab = [], svg = [];
  const X = (j) => lw + j * (w + cg + lw), Y = (r) => 0.5 + r * (h + gap);
  b.rows.forEach((row, r) => row.forEach((jar, j) => {
    const x = X(j), y = Y(r), ch = h / jar.n, fy = y + h - jar.k * ch;
    svg.push(`<rect x="${f2(x)}" y="${f2(fy)}" width="${w}" height="${f2(jar.k * ch)}" fill="${col}"/>`);
    for (let i = 1; i < jar.n; i++) {
      const yy = y + i * ch, edge = Math.abs(yy - fy) < 0.01;
      svg.push(b.dotted ? line(x, yy, x + w, yy, edge ? INK : "#475569", edge ? 0.45 : 0.18, edge ? "" : ".35 .35") : line(x, yy, x + w, yy, INK, edge ? 0.4 : 0.25));
    }
    svg.push(`<rect x="${f2(x)}" y="${f2(y)}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width=".45"/>`);
    lab.push([x - lw / 2, fy, jar.label, "c", "", 12.5]);
  }));
  // the fat arrow, down between the two columns
  const ax = X(1) - lw / 2 - 1, ay = Y(0) + h - 2, ah = gap + 6;
  svg.push(`<path d="M${f2(ax - 1.4)} ${f2(ay)}H${f2(ax + 1.4)}V${f2(ay + ah * 0.5)}H${f2(ax + 3.4)}L${f2(ax)} ${f2(ay + ah)}L${f2(ax - 3.4)} ${f2(ay + ah * 0.5)}H${f2(ax - 1.4)}Z" fill="#22B5E0"/>`);
  return wrap(ctx, X(1) + w + 0.5, Y(b.rows.length - 1) + h + 0.5, svg.join(""), lab, "mid");
}

// ── p58: a ribbon of fifths, its lengths over it, the metre line under it ──
function ribbonHtml(ctx, b) {
  const cw = b.cw || 11, X = (k) => 1.5 + k * cw, top = 9.6, h = 6, ly = top + h + 8, lab = [], svg = [];
  for (let i = 0; i < 11; i++) svg.push(`<rect x="${f2(X(i))}" y="${top}" width="${cw}" height="${h}" fill="${i < 7 ? "#8A80BC" : "#F7902A"}" stroke="${INK}" stroke-width=".4"/>`);
  const arc = (a, z, peak) => `<path d="M${f2(X(a))} ${top}C${f2(X(a))} ${f2(top - peak)} ${f2(X(z))} ${f2(top - peak)} ${f2(X(z))} ${top}" fill="none" stroke="${INK}" stroke-width=".25" stroke-dasharray=".4 .5"/>`;
  svg.push(arc(0, 7, 8), arc(7, 11, 6.8));
  lab.push([X(3.5), 3.2, "{{৭/৫}} মি", "c", "c5p049-wb", 12], [X(9), 3.8, "{{৪/৫}} মি", "c", "c5p049-wb", 12]);
  svg.push(line(X(0), ly, X(13.4), ly, INK, 0.45));
  for (let k = 1; k <= 12; k++) svg.push(line(X(k), ly - 3.6, X(k), ly, INK, 0.35));
  for (const k of [0, 5, 10]) svg.push(line(X(k), top + h, X(k), ly, "#EF4444", 0.3, ".4 .4"));
  lab.push([X(0), ly + 2.8, "০", "c", "", 12], [X(5), ly + 2.8, "১", "c", "", 12], [X(10), ly + 2.8, "২", "c", "", 12], [X(12) + 1.6, ly + 2.8, "(মি)", "l", "c5p049-bn", 11.5]);
  return wrap(ctx, X(13.4) + 1, ly + 5.6, svg.join(""), lab, "mid");
}

// ── p62: the three pictures over the road line, the distances under it ──
function roadHtml(ctx, b, page) {
  const W = b.w || 160, x1 = 8, x2 = W / 2, x3 = W - 8, ly = b.ly || 36, svg = [], lab = [];
  const pics = b.pics.map((p, i) => {
    const cx = [x1 + 16, x2 + 2, x3 - 16][i];
    return `<div class="c5p049-rp" style="left:${f2(cx - p.w / 2)}mm;top:${f2(ly - 5.4 - p.h)}mm;width:${p.w}mm;height:${p.h}mm">${ctx.picHtml({ pic: p.pic, h: p.h, w: p.w, fit: "cover" })}</div>`;
  }).join("");
  svg.push(line(x1, ly, x3, ly, INK, 0.4));
  for (const x of [x1, x2, x3]) svg.push(line(x, ly - 3, x, ly, INK, 0.4));
  // the captions between the pictures and the line, as printed
  lab.push([x1 + 16, ly - 0.5, b.caps[0], "c", "c5p049-cap"], [x2 + 2, ly - 0.5, b.caps[1], "l", "c5p049-cap"], [x3 - 16, ly - 0.5, b.caps[2], "c", "c5p049-cap"]);
  const sag = (a, z) => `<path d="M${f2(a)} ${ly}C${f2(a + 14)} ${f2(ly + 11)} ${f2(z - 14)} ${f2(ly + 11)} ${f2(z)} ${ly}" fill="none" stroke="${INK}" stroke-width=".25" stroke-dasharray=".4 .5"/>`;
  svg.push(sag(x1, x2), sag(x2, x3));
  lab.push([(x1 + x2) / 2, ly + 5.6, b.dists[0], "c", "c5p049-wb", 12.5], [(x2 + x3) / 2, ly + 5.6, b.dists[1], "c", "c5p049-wb", 12.5]);
  const H = ly + 10.5, dg = wrap(ctx, W, H, svg.join(""), lab);
  return dg.replace(/<svg /, `${pics}<svg `).replace(`class="c5p049-dg"`, `class="c5p049-dg mid c5p049-road"`);
}

module.exports = {
  kinds: {
    c5p049_tape: (b, ctx) => tapeHtml(ctx, b),
    c5p049_m2i: (b, ctx) => m2iHtml(ctx),
    c5p049_i2m: (b, ctx) => i2mHtml(ctx),
    c5p049_steps: (b, ctx) => stepsHtml(ctx, b),
    c5p049_ring: (b, ctx) => ringHtml(ctx),
    c5p049_eqs: (b, ctx) => `<div class="c5p049-eqs${b.center ? " c" : ""}${b.tight ? " t" : ""}" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.indent ? `padding-left:${b.indent}mm;` : ""}${b.gap != null ? `gap:${b.gap}mm;` : ""}">${b.lines.map((l) => {
      const [ind, t] = Array.isArray(l) ? l : [0, l];
      return `<div class="c5p049-eq"${ind ? ` style="padding-left:${ind}mm"` : ""}>${eqsMd(ctx, t, b.aw)}</div>`; }).join("")}</div>`,
    c5p049_jars: (b, ctx) => jarsHtml(ctx, b),
    c5p049_ribbon: (b, ctx) => ribbonHtml(ctx, b),
    c5p049_road: (b, ctx, page) => roadHtml(ctx, b, page),
    c5p049_rule: (b, ctx) => `<div class="c5p049-rule"><span class="c5p049-rt">${ctx.md(b.title)}</span><div class="c5p049-rl">${b.lines.map((l) => `<div>${ctx.md(l)}</div>`).join("")}</div></div>`,
    c5p049_face: (b, ctx) => { const f = ctx.picFile(`face-${b.who}-${b.mood || "talk"}`) || ctx.picFile(`face-${b.who}`);
      return `<span class="c5p049-face" style="--w:${ctx.WHO[b.who]};width:${b.size || 17}mm;height:${b.size || 17}mm">${f ? `<img src="file://${f.file}">` : ""}</span>`; },
  },
  css: `
.c5p049-dg { position: relative; flex: none; max-width: 100% } .c5p049-dg.mid { align-self: center; margin: 0 auto }
.c5p049-dg > svg { position: absolute; left: 0; top: 0; display: block; overflow: visible }
.c5p049-lb { position: absolute; white-space: nowrap; font: 700 12pt/1.15 'Baloo Da 2'; color: ${INK} }
.c5p049-lb.a-c { transform: translate(-50%, -50%) } .c5p049-lb.a-l { transform: translateY(-50%) } .c5p049-lb.a-r { transform: translate(-100%, -50%) }
.c5p049-lb.a-b { transform: translate(-50%, -100%) } .c5p049-lb.a-t { transform: translateX(-50%) }
.c5p049-lb.c5p049-op .abox { width: 5mm; height: 4.6mm; vertical-align: -1mm; margin: 0 .3mm; border-radius: .8mm }
.c5p049-lb.c5p049-wb { background: #fff; padding: 0 1mm } .c5p049-lb.c5p049-bn { font-family: 'Noto Sans Bengali'; font-weight: 600 }
.c5p049-lb.c5p049-cap { font: 600 9pt 'Noto Sans Bengali'; transform: translate(-50%, -100%) } .c5p049-lb.c5p049-cap.a-l { transform: translate(1.4mm, -100%) }
.c5p049-eqs { display: flex; flex-direction: column; gap: 1.6mm; font: 700 13pt/1.3 'Baloo Da 2' } .c5p049-eqs.c { align-items: center }
.c5p049-eq { white-space: nowrap } .c5p049-eqs.t { line-height: 1.12 } .c5p049-eqs.t .frac .abox { width: 1.45em; height: 1.05em; margin: .05em 0 } .c5p049-eqs.t .frac .abox.c5p049-w { width: 2.6em } .abox.c5p049-w { width: 15mm } .frac .abox.c5p049-w { width: 2.6em }
svg.c5p049-ar { display: inline-block; vertical-align: middle; margin: 0 1.6mm }
.c5p049-rule { position: relative; align-self: center; width: 132mm; margin-top: 4.6mm; background: #FEF3C7; border: .6mm solid #F59E0B; border-radius: 4mm; padding: 6.4mm 6mm 2.6mm; box-shadow: 0 1mm 0 #FDE68A }
.c5p049-rt { position: absolute; left: 50%; top: -4.6mm; transform: translateX(-50%); white-space: nowrap; background: linear-gradient(90deg, #F97316, #EA580C); color: #fff; font: 700 12.5pt/1 'Noto Sans Bengali'; padding: 2mm 7mm 1.6mm; border-radius: 99px; box-shadow: 0 .8mm 0 #9A3412 }
.c5p049-rl { display: flex; flex-direction: column; gap: .6mm; font: 600 12.5pt/1.45 'Noto Sans Bengali' }
.c5p049-face { display: inline-block; flex: none; border-radius: 50%; overflow: hidden; background: #fff; border: .6mm solid #fff; box-shadow: 0 0 0 .6mm var(--w) } .c5p049-face img { width: 100%; height: 100%; object-fit: cover; display: block }
.c5p049-rp { position: absolute; display: flex } .c5p049-rp .pic { border-radius: 2.4mm }
`,
};
