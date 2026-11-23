// Own kinds for printed pages 118–132 (chapter 11 পরিমাপ: length, weight, time). Everything whose length, weight,
// reading or time matters is drawn here by code, so it is exact:
// - rulers at true size (1 cm = 10 mm on the page) with mm ticks, a pencil laid along them and a magnified part (the "zoom");
// - the two standing pencils (p118), the road map with its distances (p120);
// - the weighing instruments (beam balance, table balance with weights and bags on its pans, dial kitchen scale with its
//   needle, flat digital scale and hanging digital scale with their readings), the standard weights (p122–p124);
// - analog clocks (hands at the exact time, an optional second hand, a time arc), 7-segment digital clocks, a wrist watch
//   and a phone lock screen, the clock with its hands named, the enlarged minute marks (p126–p132);
// - layout pieces: small speech cards, unit cards, worked steps aligned at "=", wide answer boxes, the unit ladder,
//   a matching table, multiple-choice questions, the time flow arrows.
// The book prints its rulers, clock faces, digital readings and the weights' labels with English digits: kept as printed.
// Kinds are prefixed c3p118_, classes c3p118-.
const INK = "#1E2433";
const f2 = (n) => Math.round(n * 100) / 100;
const escx = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rad = (d) => (d * Math.PI) / 180;
const polar = (cx, cy, r, deg) => [cx + r * Math.sin(rad(deg)), cy - r * Math.cos(rad(deg))];
let UID = 0;
const uid = () => `c3p118u${++UID}`;

// ── a pencil lying left to right: the eraser's end at x0, the lead's tip at x0 + L (so L is its length) ──
// (the Class 2 book's pencil, with a purple one added: the book's pencils are purple)
const PENCIL = { yellow: ["#FDE68A", "#F59E0B"], blue: ["#BFDBFE", "#3B82F6"], purple: ["#DDD6FE", "#7C3AED"], orange: ["#FED7AA", "#F97316"], red: ["#FECACA", "#EF4444"] };
function pencilG(x0, cy, L, t, c = "purple") {
  const C = PENCIL[c] || PENCIL.purple;
  const e = t, fe = t * 0.9, cone = t * 2.3, tip = cone * 0.36, y0 = cy - t / 2, y1 = cy + t / 2, xf = x0 + e, xb = xf + fe, xc = x0 + L - cone, xt = x0 + L - tip, k = t * 0.18;
  return `<g stroke="#4C1D95" stroke-width="${f2(t * 0.08)}" stroke-linejoin="round">
    <path d="M${f2(xf)} ${f2(y0)}H${f2(x0 + t * 0.35)}Q${f2(x0)} ${f2(y0)} ${f2(x0)} ${f2(cy)}Q${f2(x0)} ${f2(y1)} ${f2(x0 + t * 0.35)} ${f2(y1)}H${f2(xf)}Z" fill="#F5E6D3"/>
    <rect x="${f2(xf)}" y="${f2(y0)}" width="${f2(fe)}" height="${f2(t)}" fill="#94A3B8"/><path d="M${f2(xf + fe * 0.35)} ${f2(y0)}V${f2(y1)}M${f2(xf + fe * 0.7)} ${f2(y0)}V${f2(y1)}" stroke-width="${f2(t * 0.05)}"/>
    <rect x="${f2(xb)}" y="${f2(y0)}" width="${f2(xc - xb)}" height="${f2(t)}" fill="${C[1]}"/><rect x="${f2(xb + 0.2)}" y="${f2(y0 + t * 0.12)}" width="${f2(Math.max(0, xc - xb - 0.4))}" height="${f2(t * 0.26)}" fill="${C[0]}" stroke="none"/>
    <path d="M${f2(xc)} ${f2(y0)}L${f2(xt)} ${f2(cy - k)}V${f2(cy + k)}L${f2(xc)} ${f2(y1)}Z" fill="#F5D0A1"/>
    <path d="M${f2(xt)} ${f2(cy - k)}L${f2(x0 + L)} ${f2(cy)}L${f2(xt)} ${f2(cy + k)}Z" fill="#334155"/></g>`;
}
const pencilSvg = (L, t = 4.6, c = "orange", cls = "c3p118-pen") => `<svg class="${cls}" width="${f2(L + 0.6)}mm" height="${f2(t + 0.6)}mm" viewBox="-.3 -.3 ${f2(L + 0.6)} ${f2(t + 0.6)}">${pencilG(0, t / 2, L, t, c)}</svg>`;

// ── rulers: true size (1 cm = 10 mm), English digits as printed, the ticks rising from the bottom edge ──
function rulerG(ox, oy, cm, rh, latin, bn, fs = 3.7) {
  const X = (v) => ox + 4 + v * 10;
  let s = `<rect x="${ox}" y="${oy}" width="${cm * 10 + 8}" height="${rh}" rx="1.3" fill="#FDE047" stroke="#CA8A04" stroke-width=".45"/>
    <rect x="${ox + .6}" y="${oy + .6}" width="${cm * 10 + 6.8}" height="${f2(rh * .28)}" rx=".8" fill="#FEF9C3" opacity=".7"/>`;
  for (let i = 0; i <= cm * 10; i++) {
    const isCm = i % 10 === 0, isHalf = i % 5 === 0;
    s += `<path d="M${f2(X(i / 10))} ${f2(oy + rh)}v${isCm ? -4.3 : isHalf ? -3 : -1.8}" stroke="${INK}" stroke-width="${isCm ? 0.36 : 0.22}"/>`;
    if (isCm) s += `<text x="${f2(X(i / 10))}" y="${f2(oy + rh - 5.3)}" text-anchor="middle" class="c3p118-rn" font-size="${fs}">${latin ? i / 10 : bn(i / 10)}</text>`;
  }
  return s;
}
/** A magnified part [a, b] of a ruler at (ox, oy), drawn as a box at (z.x, z.y), k times bigger, with the light cone joining them. */
function zoomG(ox, oy, rh, z, tipAt) {
  const X = (v) => ox + 4 + v * 10, k = z.k || 3, w = (z.b - z.a) * 10 * k, h = z.h || 13, zx = z.x, zy = z.y;
  const sx0 = X(z.a) - 0.8, sx1 = X(z.b) + 0.8, sy0 = oy + rh - 4.8, sy1 = oy + rh + 0.7;
  let cone;
  if (z.side === "left") cone = [[sx0, sy0], [zx + w, zy], [zx + w, zy + h], [sx0, sy1]];
  else cone = [[sx0, sy1], [zx, zy], [zx + w, zy], [sx1, sy1]];
  let s = `<path d="M${cone.map((p) => `${f2(p[0])} ${f2(p[1])}`).join("L")}Z" fill="#7DD3FC" opacity=".28"/>
    <path d="M${f2(cone[0][0])} ${f2(cone[0][1])}L${f2(cone[1][0])} ${f2(cone[1][1])}M${f2(cone[3][0])} ${f2(cone[3][1])}L${f2(cone[2][0])} ${f2(cone[2][1])}" stroke="#0284C7" stroke-width=".5" fill="none"/>
    <rect x="${f2(sx0)}" y="${f2(sy0)}" width="${f2(sx1 - sx0)}" height="${f2(sy1 - sy0)}" fill="none" stroke="#0284C7" stroke-width=".6" rx=".4"/>
    <rect x="${f2(zx)}" y="${f2(zy)}" width="${f2(w)}" height="${h}" rx="1.2" fill="#FDE047" stroke="#CA8A04" stroke-width=".5"/>
    <rect x="${f2(zx + .7)}" y="${f2(zy + .7)}" width="${f2(w - 1.4)}" height="${f2(h * .3)}" rx=".8" fill="#FEF9C3" opacity=".7"/>`;
  for (let i = 0; i <= Math.round((z.b - z.a) * 10); i++) {
    const v = z.a + i / 10, isCm = Math.abs(v - Math.round(v)) < 1e-6, isHalf = Math.abs(v * 2 - Math.round(v * 2)) < 1e-6, x = zx + i * k;
    s += `<path d="M${f2(x)} ${f2(zy + h)}v${f2(-(isCm ? h * .5 : isHalf ? h * .38 : h * .26))}" stroke="${INK}" stroke-width="${isCm ? .62 : isHalf ? .45 : .36}"/>`;
  }
  if (tipAt != null && tipAt >= z.a && tipAt <= z.b) { const x = zx + (tipAt - z.a) * 10 * k; s += `<path d="M${f2(x)} ${f2(zy - 1)}V${f2(zy + h + 2.8)}" stroke="#2563EB" stroke-width=".6"/>`; }
  if (z.bracket) {
    const [p, q] = z.bracket, x1 = zx + (p - z.a) * 10 * k, x2 = zx + (q - z.a) * 10 * k, yb = zy + h + 2.4;
    s += `<path d="M${f2(x1)} ${f2(zy + h + .4)}V${f2(yb)}H${f2(x2)}V${f2(zy + h + .4)}" fill="none" stroke="#2563EB" stroke-width=".55"/>`;
    if (z.stem) s += `<path d="M${f2((x1 + x2) / 2)} ${f2(yb)}V${f2(yb + z.stem)}" stroke="#2563EB" stroke-width=".55"/>`;
  }
  return s;
}

// ── analog clocks (the core's look: amber rim, navy hour hand, red minute hand; a thin green second hand) ──
function clockInner({ h = 12, m = 0, s, empty, plain, bangla, arc }, bn) {
  const hand = (a, len, wd, col, tail = 0) => { const [x2, y2] = polar(50, 50, len, a), [x1, y1] = polar(50, 50, -tail, a); return `<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="${col}" stroke-width="${wd}" stroke-linecap="round"/>`; };
  let g = plain ? `<circle cx="50" cy="50" r="47.5" fill="#fff" stroke="#111827" stroke-width="2.4"/>` : `<circle cx="50" cy="50" r="48" fill="#FEF3C7" stroke="#D97706" stroke-width="3.5"/><circle cx="50" cy="50" r="45" fill="#fff"/>`;
  for (let i = 0; i < 60; i++) { const [x1, y1] = polar(50, 50, 44, i * 6), [x2, y2] = polar(50, 50, i % 5 ? 42 : 39.5, i * 6); g += `<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="${plain ? "#111827" : "#334155"}" stroke-width="${i % 5 ? .6 : 1.4}"/>`; }
  for (let i = 1; i <= 12; i++) { const [x, y] = polar(50, 50, 31, i * 30); g += `<text x="${f2(x)}" y="${f2(y + 3.6)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="700" font-size="${i > 9 ? 9.5 : 10.5}" fill="${INK}">${bangla ? bn(i) : i}</text>`; }
  if (!empty) {
    g += hand((h % 12) * 30 + m * 0.5, 22, 4.4, plain ? "#111827" : "#1E3A8A") + hand(m * 6, 34, 2.8, plain ? "#111827" : "#DC2626");
    if (s != null) g += hand(s * 6, 38, 1.1, "#16A34A", 8);
  }
  g += `<circle cx="50" cy="50" r="${empty ? 2.4 : 3.2}" fill="${INK}"/>`;
  if (arc) { // a time arc outside the rim, clockwise from minute arc[0] to arc[1], its arrowhead at the end
    const [m1, m2] = arc, a1 = m1 * 6, a2 = m2 * 6, sweep = (a2 - a1 + 360) % 360, R = 54, [x1, y1] = polar(50, 50, R, a1), [x2, y2] = polar(50, 50, R, a2);
    const d = [Math.cos(rad(a2)), Math.sin(rad(a2))], n = [-d[1], d[0]], tip = [x2 + d[0] * 2.4, y2 + d[1] * 2.4];
    g += `<path d="M${f2(x1)} ${f2(y1)}A${R} ${R} 0 ${sweep > 180 ? 1 : 0} 1 ${f2(x2)} ${f2(y2)}" fill="none" stroke="#0284C7" stroke-width="2.2"/>
      <path d="M${f2(tip[0])} ${f2(tip[1])}L${f2(x2 - d[0] * 3 + n[0] * 3.4)} ${f2(y2 - d[1] * 3 + n[1] * 3.4)}L${f2(x2 - d[0] * 3 - n[0] * 3.4)} ${f2(y2 - d[1] * 3 - n[1] * 3.4)}Z" fill="#0284C7"/>
      <circle cx="${f2(x1)}" cy="${f2(y1)}" r="1.6" fill="#0284C7"/>`;
  }
  return g;
}
function clockSvg(o, bn) {
  const size = o.size || 34, pad = o.arc ? 9 : 0, V = 100 + 2 * pad;
  return `<svg class="c3p118-svg" width="${f2(size * V / 100)}mm" height="${f2(size * V / 100)}mm" viewBox="${-pad} ${-pad} ${V} ${V}">${clockInner(o, bn)}</svg>`;
}

// ── 7-segment digits (digital clocks and scales): digits, ":" and "." ──
const SEG = { 0: "abcdef", 1: "bc", 2: "abdeg", 3: "abcdg", 4: "bcfg", 5: "acdfg", 6: "acdefg", 7: "abc", 8: "abcdefg", 9: "abcdfg" };
function segText(t, x0, y, dw, dh, th, gp, on, off = .08) {
  let x = x0, s = "";
  for (const ch of String(t)) {
    if (ch === ":") { s += `<circle cx="${f2(x + th * .7)}" cy="${f2(y + dh * .3)}" r="${f2(th * .62)}" fill="${on}"/><circle cx="${f2(x + th * .7)}" cy="${f2(y + dh * .72)}" r="${f2(th * .62)}" fill="${on}"/>`; x += th * 1.4 + gp; continue; }
    if (ch === ".") { s += `<circle cx="${f2(x - gp * .45)}" cy="${f2(y + dh - th * .5)}" r="${f2(th * .6)}" fill="${on}"/>`; continue; }
    if (ch === " ") { x += dw * .5 + gp; continue; }
    const g = { a: [x + th * .55, y, dw - th * 1.1, th], g: [x + th * .55, y + dh / 2 - th / 2, dw - th * 1.1, th], d: [x + th * .55, y + dh - th, dw - th * 1.1, th],
      f: [x, y + th * .55, th, dh / 2 - th * .8], b: [x + dw - th, y + th * .55, th, dh / 2 - th * .8], e: [x, y + dh / 2 + th * .25, th, dh / 2 - th * .8], c: [x + dw - th, y + dh / 2 + th * .25, th, dh / 2 - th * .8] };
    for (const [k, [sx, sy, sw, sh]] of Object.entries(g)) s += `<rect x="${f2(sx)}" y="${f2(sy)}" width="${f2(sw)}" height="${f2(sh)}" rx="${f2(th / 2)}" fill="${on}" opacity="${(SEG[ch] || "").includes(k) ? 1 : off}"/>`;
    x += dw + gp;
  }
  return { s, w: x - gp - x0 };
}
const segWidth = (t, dw, th, gp) => segText(t, 0, 0, dw, 10, th, gp, "#000").w;
// a digital clock: style green (the book's p128), orange (an orange alarm clock), black (a white-digit LED clock), amber (Class 2's)
const LCD = { green: ["#22C55E", "#15803D", "#14321F", "#F0FDF4"], orange: ["#FCA5A5", "#B91C1C", "#FB923C", "#431407"], black: ["#E5E7EB", "#9CA3AF", "#0B0F19", "#F8FAFC"], amber: ["#F7931E", "#C2410C", "#163A2A", "#F0FDF4"] };
function lcdSvg(t, style = "amber", hmm = 15) {
  const [cs, ce, sc, on] = LCD[style] || LCD.amber, dw = 8, dh = 14, th = 1.8, gp = 2.3, W = segWidth(t, dw, th, gp) + 14, H = 31;
  const dg = segText(t, 7, 8.5, dw, dh, th, gp, on, style === "orange" ? .12 : .07).s;
  return `<svg class="c3p118-svg" width="${f2(hmm * W / H)}mm" height="${hmm}mm" viewBox="0 0 ${f2(W)} ${H}">
    <rect x=".5" y="1.6" width="${f2(W - 1)}" height="${H - 2.1}" rx="4.5" fill="${ce}"/><rect x=".5" y=".5" width="${f2(W - 1)}" height="${H - 2.6}" rx="4.5" fill="${cs}" stroke="${ce}" stroke-width=".5"/>
    <rect x="3.6" y="3.6" width="${f2(W - 7.2)}" height="${H - 8.6}" rx="2.6" fill="${sc}"/><path d="M${f2(W * .55)} 3.6h${f2(W * .16)}l-${f2(W * .2)} ${H - 8.6}h-${f2(W * .16)}z" fill="#fff" opacity=".08"/>
    <g transform="skewX(-6) translate(1.6 -.4)">${dg}</g></svg>`;
}
/** A wrist watch with a digital face (p126). */
function watchSvg(t, hmm = 34) {
  const dg = segText(t, 0, 0, 3.6, 6.4, .8, 1.1, "#FB923C", .1), sx = 22 - dg.w / 2;
  return `<svg class="c3p118-svg" width="${f2(hmm * 44 / 52)}mm" height="${hmm}mm" viewBox="0 0 44 52">
    <path d="M13 9L15 1H29L31 9Z" fill="#F97316" stroke="#C2410C" stroke-width=".5"/><path d="M13 43L15 51H29L31 43Z" fill="#EA580C" stroke="#C2410C" stroke-width=".5"/>
    <path d="M16 1.6v6.6M28 1.6v6.6M16 44v6.4M28 44v6.4" stroke="#C2410C" stroke-width=".4" opacity=".6"/>
    <rect x="5" y="7" width="34" height="38" rx="7" fill="#F97316" stroke="#9A3412" stroke-width=".7"/><rect x="8" y="10" width="28" height="32" rx="5" fill="#111827"/>
    <path d="M8.6 10.6L24 10.6L12 41.4H8.6Z" fill="#fff" opacity=".07"/><rect x="39" y="22" width="2" height="7" rx="1" fill="#9A3412"/>
    <g transform="translate(${f2(sx)} 22.8) skewX(-6)">${dg.s}</g></svg>`;
}
/** A phone's lock screen showing the time (p128). */
function phoneSvg(t, temp, hmm = 40) {
  return `<svg class="c3p118-svg" width="${f2(hmm * 34 / 64)}mm" height="${hmm}mm" viewBox="0 0 34 64">
    <rect x="-.6" y="12" width="1.6" height="5" rx=".6" fill="#C2410C"/><rect x="-.6" y="19" width="1.6" height="5" rx=".6" fill="#C2410C"/><rect x="33" y="15" width="1.6" height="8" rx=".6" fill="#C2410C"/>
    <rect x=".8" y=".8" width="32.4" height="62.4" rx="5.4" fill="#FB923C" stroke="#9A3412" stroke-width=".7"/><rect x="2.8" y="2.8" width="28.4" height="58.4" rx="3.8" fill="#1E293B"/>
    <rect x="3.6" y="3.6" width="26.8" height="56.8" rx="3.2" fill="#0EA5E9"/><path d="M30.4 12V57.2Q30.4 60.4 27.2 60.4H6.4Z" fill="#BAE6FD"/>
    <rect x="12" y="3.6" width="10" height="2.2" rx="1.1" fill="#1E293B"/>
    <text x="17" y="19" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="8.2" fill="#fff" stroke="#0F172A" stroke-width=".7" paint-order="stroke">${escx(t)}</text>
    ${temp ? `<text x="17" y="22.8" text-anchor="middle" font-family="Baloo Da 2" font-weight="600" font-size="2.3" fill="#fff">${escx(temp)}</text>` : ""}</svg>`;
}

// ── weighing: weights, bags, fruit, and the instruments ──
const wDims = (v, k = 1) => { const w = (6.4 + 2.1 * Math.log(v / 5)) * k; return { w, t: w * 0.24 + .9 * k, f: w * 0.3 + 1.5 * k }; };
/** A standard weight (বাটখারা), its front's bottom centre at (cx, base); its label on its top face. */
function weightG(cx, base, v, top, k = 1) {
  const { w, t, f } = wDims(v, k), X = cx - w / 2, Y = base - t - f, ins = w * 0.09, sw = 0.36 * Math.sqrt(k), len = [...String(top)].length;
  const fs = f2(Math.min(t * 0.62, (w - 2 * ins - 1) / (len * 0.55)));
  return `<g><path d="M${f2(X + ins)} ${f2(Y)}H${f2(X + w - ins)}L${f2(X + w)} ${f2(Y + t)}H${f2(X)}Z" fill="#F6A770"/>
    <path d="M${f2(X + ins * 1.9)} ${f2(Y + t * .16)}H${f2(X + w - ins * 1.9)}L${f2(X + w - ins * 1.1)} ${f2(Y + t * .86)}H${f2(X + ins * 1.1)}Z" fill="#E07B45" stroke="#7C2D12" stroke-width="${f2(sw * .7)}"/>
    <rect x="${f2(X)}" y="${f2(Y + t)}" width="${f2(w)}" height="${f2(f)}" fill="#D9672E"/><rect x="${f2(X + .3)}" y="${f2(Y + t + .4)}" width="${f2(w - .6)}" height="${f2(f * .22)}" fill="#E8834C"/>
    <path d="M${f2(X + ins)} ${f2(Y)}H${f2(X + w - ins)}L${f2(X + w)} ${f2(Y + t)}V${f2(Y + t + f)}H${f2(X)}V${f2(Y + t)}ZM${f2(X)} ${f2(Y + t)}H${f2(X + w)}" fill="none" stroke="#7C2D12" stroke-width="${f2(sw)}" stroke-linejoin="round"/>
    <text x="${f2(cx)}" y="${f2(Y + t * .52 + fs * .36)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${fs}" fill="#fff">${escx(top)}</text></g>`;
}
function weightSvg(v, top, k = 1) { const { w, t, f } = wDims(v, k); return `<svg class="c3p118-svg" width="${f2(w + 1)}mm" height="${f2(t + f + 1)}mm" viewBox="${f2(-w / 2 - .5)} ${f2(-t - f - .5)} ${f2(w + 1)} ${f2(t + f + 1)}">${weightG(0, 0, v, top, k)}</svg>`; }
const BAG = { sand: ["#D6C7A1", "#7C6A46"], green: ["#BEF264", "#4D7C0F"], brown: ["#D9B48F", "#7C4A21"] };
/** A tied sack (বালির ব্যাগ, a bag of 650 g), its bottom centre at (cx, base), w wide and h high (tuft included), its label on it. */
function bagG(cx, base, w, h, label, color = "sand", fs) {
  const [fill, ink] = BAG[color] || BAG.sand, top = base - h, ny = top + h * .3, nw = w * .16;
  fs = fs || Math.min(h * .2, w / Math.max(3, [...String(label || "")].length * .42));
  return `<g stroke="${ink}" stroke-width=".4" stroke-linejoin="round">
    <path d="M${f2(cx - nw)} ${f2(ny)}C${f2(cx - w * .52)} ${f2(top + h * .46)} ${f2(cx - w * .58)} ${f2(base - h * .04)} ${f2(cx - w * .34)} ${f2(base)}H${f2(cx + w * .34)}C${f2(cx + w * .58)} ${f2(base - h * .04)} ${f2(cx + w * .52)} ${f2(top + h * .46)} ${f2(cx + nw)} ${f2(ny)}Z" fill="${fill}"/>
    <path d="M${f2(cx - nw * .8)} ${f2(ny + .2)}L${f2(cx - w * .2)} ${f2(top + .3)}Q${f2(cx - w * .06)} ${f2(top + h * .08)} ${f2(cx)} ${f2(top + h * .02)}Q${f2(cx + w * .06)} ${f2(top + h * .08)} ${f2(cx + w * .2)} ${f2(top + .3)}L${f2(cx + nw * .8)} ${f2(ny + .2)}Z" fill="${fill}"/>
    <rect x="${f2(cx - nw * 1.2)}" y="${f2(ny - h * .03)}" width="${f2(nw * 2.4)}" height="${f2(h * .07)}" rx=".5" fill="${ink}"/>
    <path d="M${f2(cx - w * .3)} ${f2(base - h * .5)}Q${f2(cx - w * .33)} ${f2(base - h * .2)} ${f2(cx - w * .2)} ${f2(base - h * .08)}" fill="none" stroke="#fff" stroke-width="${f2(w * .04)}" opacity=".45" stroke-linecap="round"/></g>
    ${label ? `<text x="${f2(cx)}" y="${f2(base - h * .24)}" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="700" font-size="${f2(fs)}" fill="#1E2433">${escx(label)}</text>` : ""}`;
}
/** n stickers of one fruit in rows (back row first, a little higher), standing on y = base, centred on cx. */
function fruitG(ctx, f, cx, base) {
  const s = f.s || 12, img = ctx.sticker(f.fruit), rows = f.rows || [f.n || 1], step = s * (f.step || .78);
  let out = "";
  rows.forEach((n, r) => {
    const back = rows.length - 1 - r, yb = base - back * s * (f.lift || .32), x0 = cx - ((n - 1) * step) / 2 + (back ? (f.shift || 0) * s : 0);
    for (let i = 0; i < n; i++) {
      const x = x0 + i * step;
      out += img ? `<image href="${img}" x="${f2(x - s / 2)}" y="${f2(yb - s)}" width="${f2(s)}" height="${f2(s)}" preserveAspectRatio="xMidYMax meet"/>`
        : `<text x="${f2(x)}" y="${f2(yb - s * .1)}" text-anchor="middle" font-family="Noto Color Emoji" font-size="${f2(s * .9)}">${f.emoji || "●"}</text>`;
    }
  });
  return out;
}
/** What sits on a pan or a platform: weights / bags side by side (row), more on top of them (top), or fruit. */
function loadG(ctx, L, cx, base, k = 1) {
  if (!L) return "";
  if (L.fruit) return fruitG(ctx, L, cx, base);
  const size = (it) => it.bag ? { w: it.bw || 13, h: it.bh || 15 } : (({ w, t, f }) => ({ w, h: t + f }))(wDims(it.w, k));
  const place = (items, b) => {
    const dims = items.map(size), gap = .7, tot = dims.reduce((a, d) => a + d.w, 0) + gap * (items.length - 1);
    let x = cx - tot / 2, s = "";
    items.forEach((it, i) => { const c = x + dims[i].w / 2; s += it.bag ? bagG(c, b, dims[i].w, dims[i].h, it.bag, it.color || "green", it.fs) : weightG(c, b, it.w, it.top ?? `${it.w} g`, k); x += dims[i].w + gap; });
    return { s, h: Math.max(...dims.map((d) => d.h)) };
  };
  const row = place(L.row || [], base);
  return row.s + (L.top ? place(L.top, base - row.h + .2).s : "");
}
/** A weighing instrument; LH = the room above it for its load. Returns { svg inner, vw, vh }. */
function scaleParts(it, ctx) {
  const LH = it.lh ?? (it.load || it.left || it.right ? 20 : 0);
  if (it.type === "dial") { // a kitchen scale with a round dial: 0 at the top, 0–4 kg round it (a full turn is 5 kg); the needle at kg
    const cx = 30, cy = 45 + LH, kg = it.kg ?? 0;
    let s = `<path d="M5 ${12 + LH}H55L49 ${20.5 + LH}H11Z" fill="#F25A2C" stroke="#9A3412" stroke-width=".55" stroke-linejoin="round"/><path d="M30 ${12 + LH}H55L49 ${20.5 + LH}H35Z" fill="#E2421F"/>
      <path d="M5 ${12 + LH}H55L49 ${20.5 + LH}H11Z" fill="none" stroke="#9A3412" stroke-width=".55" stroke-linejoin="round"/>
      <rect x="15" y="${20.5 + LH}" width="30" height="2" rx=".8" fill="#C2410C"/><rect x="25.5" y="${22.5 + LH}" width="9" height="7.5" fill="#E2421F" stroke="#9A3412" stroke-width=".45"/>
      <path d="M13 ${28 + LH}Q13 ${26 + LH} 15.5 ${26 + LH}H44.5Q47 ${26 + LH} 47 ${28 + LH}L50 ${67 + LH}H10Z" fill="#F4592D" stroke="#9A3412" stroke-width=".55" stroke-linejoin="round"/>
      <path d="M33 ${26 + LH}H44.5Q47 ${26 + LH} 47 ${28 + LH}L50 ${67 + LH}H40Z" fill="#E2421F"/>
      <rect x="12" y="${67 + LH}" width="7" height="2.4" rx=".6" fill="#C2410C"/><rect x="41" y="${67 + LH}" width="7" height="2.4" rx=".6" fill="#C2410C"/>
      <rect x="14" y="${59 + LH}" width="6" height="1.6" rx=".8" fill="#1F2937"/><rect x="14" y="${61.6 + LH}" width="6" height="1.6" rx=".8" fill="#1F2937"/>
      <circle cx="${cx}" cy="${cy}" r="15.6" fill="#F1F5F9" stroke="#fff" stroke-width="1"/><circle cx="${cx}" cy="${cy}" r="12.4" fill="#CBD5E1"/>
      <path d="M${cx} ${cy}L${cx} ${cy - 12.4}A12.4 12.4 0 0 1 ${f2(polar(cx, cy, 12.4, 150)[0])} ${f2(polar(cx, cy, 12.4, 150)[1])}Z" fill="#B6C2D0"/>
      <rect x="27" y="${22.5 + LH}" width="6" height="7" fill="#E2421F"/>`;
    for (let i = 0; i < 50; i++) { const a = i * 7.2, big = i % 10 === 0, mid = i % 5 === 0, [x1, y1] = polar(cx, cy, 15, a), [x2, y2] = polar(cx, cy, big ? 12.9 : mid ? 13.5 : 14, a); s += `<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="#475569" stroke-width="${big ? .5 : .28}"/>`; }
    for (let i = 0; i < 5; i++) { const [x, y] = polar(cx, cy, 10.2, i * 72); s += `<text x="${f2(x)}" y="${f2(y + 1.3)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="600" font-size="3.6" fill="#1E293B">${i}</text>`; }
    const [nx, ny] = polar(cx, cy, 7.9, kg * 72), [tx, ty] = polar(cx, cy, -2.2, kg * 72); // the needle stops short of the number it points to, so the number stays readable
    s += `<text x="${cx}" y="${f2(cy + 5.6)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="600" font-size="2.1" fill="#334155">Weight</text>
      <line x1="${f2(tx)}" y1="${f2(ty)}" x2="${f2(nx)}" y2="${f2(ny)}" stroke="#DC2626" stroke-width=".8" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="1.3" fill="#1F2937" stroke="#fff" stroke-width=".4"/>`;
    return { s: s + loadG(ctx, it.load, 30, 12.3 + LH), vw: 60, vh: 70 + LH };
  }
  if (it.type === "pan") { // a table balance (pan balance): level, its two pans' tops at y = 13 + LH, centred at x = 25 and 75
    const y = LH, pan = (c) => `<path d="M${c - 20} ${13 + y}H${c + 20}L${c + 17} ${17 + y}H${c - 17}Z" fill="#22C55E" stroke="#166534" stroke-width=".55" stroke-linejoin="round"/><path d="M${c - 19} ${13.8 + y}H${c + 19}" stroke="#86EFAC" stroke-width=".7"/>`;
    const s = `<path d="M12 ${31 + y}H88L94 ${39 + y}H6Z" fill="#60A5FA" stroke="#1E40AF" stroke-width=".6" stroke-linejoin="round"/><path d="M6 ${39 + y}H94V${41.5 + y}H6Z" fill="#2563EB" stroke="#1E40AF" stroke-width=".6"/>
      <path d="M18 ${33 + y}L30 ${37.5 + y}M56 ${33 + y}L64 ${37.5 + y}" stroke="#fff" stroke-width=".9" opacity=".5"/>
      <rect x="23.9" y="${20 + y}" width="2.2" height="11" fill="#15803D"/><rect x="73.9" y="${20 + y}" width="2.2" height="11" fill="#15803D"/>
      <path d="M25 ${22.5 + y}H75" stroke="#EA580C" stroke-width="2.6"/><rect x="19" y="${16.5 + y}" width="12" height="6.4" rx=".8" fill="#F97316" stroke="#9A3412" stroke-width=".45"/><rect x="69" y="${16.5 + y}" width="12" height="6.4" rx=".8" fill="#F97316" stroke="#9A3412" stroke-width=".45"/>
      <path d="M45 ${31 + y}V${10 + y}Q45 ${6 + y} 50 ${6 + y}Q55 ${6 + y} 55 ${10 + y}V${31 + y}Z" fill="#FACC15" stroke="#A16207" stroke-width=".55"/>
      <path d="M47.4 ${17 + y}V${10.6 + y}Q47.4 ${8.4 + y} 50 ${8.4 + y}Q52.6 ${8.4 + y} 52.6 ${10.6 + y}V${17 + y}Z" fill="#BAE6FD" stroke="#1E40AF" stroke-width=".4"/><path d="M50 ${16.6 + y}V${9.4 + y}" stroke="#DC2626" stroke-width=".9"/>
      <circle cx="50" cy="${22.5 + y}" r="2" fill="#EF4444" stroke="#991B1B" stroke-width=".4"/>${pan(25)}${pan(75)}`;
    return { s: s + loadG(ctx, it.left, 25, 13.1 + y, it.k || 1) + loadG(ctx, it.right, 75, 13.1 + y, it.k || 1), vw: 100, vh: 42 + y };
  }
  if (it.type === "beam") { // the hanging beam balance (দাঁড়িপাল্লা) on its stand
    const pan = (cx, y) => `<path d="M${cx} 9.6L${cx - 7} ${y}M${cx} 9.6L${cx + 7} ${y}" stroke="#475569" stroke-width=".35"/><path d="M${cx - 9} ${y}H${cx + 9}Q${cx + 7} ${y + 3.6} ${cx} ${y + 3.6}Q${cx - 7} ${y + 3.6} ${cx - 9} ${y}Z" fill="#FACC15" stroke="#A16207" stroke-width=".5"/>`;
    const s = `<path d="M10 66Q25 50 40 66Z" fill="#FDBA74" stroke="#9A3412" stroke-width=".6"/><rect x="8" y="65.4" width="34" height="2.2" rx="1" fill="#EA580C" stroke="#9A3412" stroke-width=".5"/>
      <rect x="23.5" y="7" width="3" height="52" fill="#F59E0B" stroke="#92400E" stroke-width=".5"/><circle cx="25" cy="56" r="2.6" fill="#DC2626"/>
      <rect x="4" y="8.4" width="42" height="2.2" rx="1.1" fill="#D97706" stroke="#92400E" stroke-width=".45"/><circle cx="25" cy="9.5" r="2.1" fill="#3B82F6" stroke="#1E40AF" stroke-width=".4"/>
      <path d="M25 7V2.6" stroke="#92400E" stroke-width="1.6" stroke-linecap="round"/><circle cx="25" cy="2.4" r="1.4" fill="#DC2626"/>${pan(6, 30)}${pan(44, 30)}`;
    return { s, vw: 50, vh: 68 };
  }
  if (it.type === "digital") { // a flat digital scale: the reading in red on its screen
    const y = LH, dg = segText(it.read ?? "0.00", 0, 0, 2.4, 4, .55, .8, "#F87171", .1);
    const s = `<path d="M9 ${3 + y}H61L66 ${9 + y}H4Z" fill="#BFDBFE" stroke="#1D4ED8" stroke-width=".55" stroke-linejoin="round"/><path d="M9.6 ${3.6 + y}H38L33 ${8.4 + y}H5.6Z" fill="#fff" opacity=".5"/>
      <path d="M4 ${9 + y}H66V${11 + y}H4Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width=".5"/>
      <path d="M3 ${11 + y}H67L68 ${24 + y}Q68 ${26 + y} 66 ${26 + y}H4Q2 ${26 + y} 2 ${24 + y}Z" fill="#F1F5F9" stroke="#6B21A8" stroke-width=".55"/>
      <path d="M2 ${24 + y}H68V${25 + y}Q68 ${28.4 + y} 64.6 ${28.4 + y}H5.4Q2 ${28.4 + y} 2 ${25 + y}Z" fill="#A855F7" stroke="#6B21A8" stroke-width=".55"/>
      <rect x="7" y="${14 + y}" width="15" height="6" rx=".8" fill="#78350F" opacity=".8"/>
      <rect x="25" y="${13.4 + y}" width="${f2(dg.w + 4.4)}" height="7.2" rx=".9" fill="#1E293B"/><g transform="translate(27.2 ${15 + y})">${dg.s}</g>
      ${[0, 1, 2, 3].map((i) => `<rect x="${f2(50 + i * 3.6)}" y="${13.6 + y}" width="2.6" height="2.4" rx=".5" fill="${["#EF4444", "#22C55E", "#3B82F6", "#F59E0B"][i]}"/><rect x="${f2(50 + i * 3.6)}" y="${17.4 + y}" width="2.6" height="2.4" rx=".5" fill="${["#22C55E", "#3B82F6", "#F59E0B", "#EF4444"][i]}"/>`).join("")}`;
    return { s: s + loadG(ctx, it.load, 35, 5.6 + y), vw: 70, vh: 29 + y };
  }
  if (it.type === "hook") { // a hanging digital scale, its reading on the screen
    const dg = segText(it.read ?? "0.00", 0, 0, 3.4, 6, .7, 1, "#1E293B", .08);
    const s = `<circle cx="16" cy="5" r="3.6" fill="none" stroke="#DC2626" stroke-width="1.4"/><rect x="14.4" y="8" width="3.2" height="4" rx=".6" fill="#B91C1C"/>
      <rect x="4" y="11" width="24" height="34" rx="4" fill="#DC2626" stroke="#7F1D1D" stroke-width=".55"/><path d="M4 22V15Q4 11 8 11H24Q28 11 28 15V22Z" fill="#FBBF24" stroke="#92400E" stroke-width=".5"/>
      <rect x="6.6" y="13.4" width="18.8" height="9.6" rx="1.4" fill="#E0F2FE" stroke="#475569" stroke-width=".5"/><g transform="translate(${f2(16 - dg.w / 2)} 15.2)">${dg.s}</g>
      <path d="M8 26L24 41" stroke="#fff" stroke-width="1.2" opacity=".25"/><rect x="14.4" y="45" width="3.2" height="3" fill="#475569"/>
      <path d="M16 48V54Q16 59 12 59Q8.4 59 8.4 55.4" fill="none" stroke="#9A3412" stroke-width="1.5" stroke-linecap="round"/>`;
    return { s, vw: 32, vh: 61 };
  }
  throw new Error("c3p118 scale? " + it.type);
}
function scaleSvg(it, ctx) {
  const { s, vw, vh } = scaleParts(it, ctx), hmm = it.h || 30;
  return `<svg class="c3p118-svg" width="${f2(hmm * vw / vh)}mm" height="${hmm}mm" viewBox="0 0 ${vw} ${vh}">${s}</svg>`;
}

// ── small inline pictures ──
const ARROW = `<svg class="c3p118-la" viewBox="0 0 30 10" width="10mm" height="3.4mm"><path d="M1 5H24" stroke="#1E2433" stroke-width="1.4"/><path d="M29 5L21 1V9Z" fill="#1E2433"/></svg>`;
const DARROW = `<svg viewBox="0 0 26 16" width="11mm" height="7mm"><path d="M1 5H15V1L25 8L15 15V11H1Z" fill="#fff" stroke="#1E2433" stroke-width="1.3" stroke-linejoin="round"/></svg>`;

module.exports = {
  kinds: {
    /** A speech card with a smaller face and text: { who, mood, text, side, w (bubble's max width, mm), fs (pt), face (mm) }. */
    c3p118_say: (b, ctx) => `<div class="c3p118-sm" style="${b.w ? `--mw:${b.w}mm;` : ""}${b.fs ? `--fs:${b.fs}pt;` : ""}${b.face ? `--fc:${b.face}mm;` : ""}">${ctx.sayHtml(b.who, b.text, b.mood, b.side)}</div>`,
    /** p118: pencils standing on a line, their tops marked by dashed lines: { items: [{ len (mm), color }], k (scale), w }. */
    c3p118_stand: (b) => {
      const k = b.k || 1, H = Math.max(...b.items.map((p) => p.len)) * k + 7, W = b.w || 26, n = b.items.length, base = H - 3;
      let s = "";
      b.items.forEach((p, i) => { const x = W * (i + 1) / (n + 1), L = p.len * k, top = base - L; s += `<path d="M0 ${f2(top)}H${W}" stroke="#475569" stroke-width=".4" stroke-dasharray="2 1.2"/><g transform="rotate(-90 ${f2(x)} ${f2(base)})">${pencilG(x, base, L, 4.4 * k, p.color || "purple")}</g>`; });
      s += `<path d="M0 ${f2(base + .3)}H${W}" stroke="${INK}" stroke-width=".6"/>`;
      return `<svg class="c3p118-svg" width="${W}mm" height="${f2(H)}mm" viewBox="0 0 ${W} ${f2(H)}">${s}</svg>`;
    },
    /** A true-size ruler (English digits as printed) with a pencil along it and a magnified part:
     *  { cm, ox, oy, pencil: { to, color }, zoom: { a, b, k, x, y, h, side: left|below, bracket: [p, q], stem }, cap: { text, x, y }, W, H } */
    c3p118_ruler: (b, ctx) => {
      const cm = b.cm || 8, ox = b.ox || 0, oy = b.oy ?? .4, rh = 11, X = (v) => ox + 4 + v * 10;
      let s = rulerG(ox, oy, cm, rh, b.latin !== false, ctx.bn), H = oy + rh + .6, W = ox + cm * 10 + 8.5;
      if (b.pencil) {
        const t = b.pencil.t || 4.2, cy = oy + rh + 2.8 + t / 2, to = b.pencil.to;
        s += pencilG(X(0), cy, to * 10, t, b.pencil.color) + `<path d="M${f2(X(to))} ${f2(oy + rh + .2)}V${f2(cy + t / 2 + 1)}" stroke="#2563EB" stroke-width=".45"/>`;
        H = Math.max(H, cy + t / 2 + 1.4);
      }
      if (b.zoom) { s += zoomG(ox, oy, rh, b.zoom, b.pencil && b.pencil.to); H = Math.max(H, b.zoom.y + (b.zoom.h || 13) + 3 + (b.zoom.stem || 0)); W = Math.max(W, b.zoom.x + (b.zoom.b - b.zoom.a) * 10 * (b.zoom.k || 3) + .5); }
      if (b.cap) { s += `<text x="${b.cap.x}" y="${b.cap.y}" class="c3p118-cap" font-size="${b.cap.fs || 4.3}">${escx(b.cap.text)}</text>`; H = Math.max(H, b.cap.y + 1.6); }
      W = b.W || W; H = b.H || H;
      return `<div class="c3p118-rul"><svg class="c3p118-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${s}</svg></div>`;
    },
    /** A unit card: a tab with its name over the facts (the book's "দৈর্ঘ্যের একক" boxes): { head, body }; no head = a pill. */
    c3p118_unit: (b, ctx) => `<div class="c3p118-unit${b.head ? "" : " pill"}"${b.fs ? ` style="font-size:${b.fs}pt"` : ""}>${b.head ? `<span class="c3p118-uh">${ctx.md(b.head)}</span>` : ""}<div class="c3p118-ub">${ctx.md(b.body)}</div></div>`,
    /** Worked steps aligned at "=": { rows: [[left, right], ["", right]…], res: the result line (right), indent (mm) }. */
    c3p118_steps: (b, ctx) => `<div class="c3p118-steps" style="padding-left:${b.indent ?? 20}mm"><div class="c3p118-sg">${b.rows.map(([l, r]) => `<span class="l">${ctx.md(l)}</span><b>=</b><span>${ctx.md(r)}</span>`).join("")}</div>${b.res ? `<div class="c3p118-res">${ctx.md(b.res)}</div>` : ""}</div>`,
    /** Lines with wide answer boxes (□): { items, cols, bw (box width, mm) }. */
    c3p118_fill: (b, ctx) => `<div class="c3p118-fill" style="grid-template-columns:repeat(${b.cols || 1}, auto);--bw:${b.bw || 26}mm${b.size ? `;font-size:${b.size}pt` : ""}">${b.items.map((x) => `<span>${ctx.md(x)}</span>`).join("")}</div>`,
    /** Numbered lines with a hanging indent: { items: [[mark, text]…], cols, size }. */
    c3p118_list: (b, ctx) => `<div class="c3p118-list" style="grid-template-columns:repeat(${b.cols || 1}, auto 1fr)${b.size ? `;font-size:${b.size}pt` : ""};row-gap:${b.gap ?? .6}mm">${b.items.map(([m, t]) => `<b>${ctx.esc(m)}</b><span>${ctx.md(t)}</span>`).join("")}</div>`,
    /** p121: the units' ladder (কিলোমিটার → মিটার → …). */
    c3p118_ladder: (b, ctx) => `<div class="c3p118-ladder">${b.items.map((x) => `<span>${ctx.md(x)}</span>`).join(ARROW)}</div>`,
    /** p121: join each thing to its unit (a table with a dot at each inner edge): { left, right }. */
    c3p118_match: (b, ctx) => `<div class="c3p118-match">${b.left.map((l, i) => `<div class="ml">${ctx.md(l)}<i></i></div><div class="mr"><i></i>${ctx.md(b.right[i])}</div>`).join("")}</div>`,
    /** A table with set column widths (%) and row height (mm): the core's table otherwise: { table: { … }, widths, rh }. */
    c3p118_table: (b, ctx) => `<div class="c3p118-tbw" style="--rh:${b.rh || 9}mm">${ctx.tableHtml(b.table).replace(/^<table class="grid/, `<table class="grid c3p118-tb`).replace(/>/, `><colgroup>${b.widths.map((w) => `<col style="width:${w}%">`).join("")}</colgroup>`)}</div>`,
    /** A multiple-choice question: { q (may hold {pencil:mm}), body: [blocks], opts, cols, pad (space after it, mm) }. */
    c3p118_mcq: (b, ctx, page) => `<div class="c3p118-mcq"${b.pad ? ` style="padding-bottom:${b.pad}mm"` : ""}><p class="q">${ctx.md(b.q).replace(/\{pencil:([\d.]+)\}/g, (m, L) => pencilSvg(+L, 3.4, "orange", "c3p118-pen in"))}</p>${(b.body || []).map((x) => ctx.blockHtml(x, page)).join("")}
      <div class="c3p118-opts" style="grid-template-columns:repeat(${b.cols || 4}, minmax(max-content, 1fr))">${b.opts.map((o) => `<span>${ctx.md(o)}</span>`).join("")}</div></div>`,
    /** An exercise card whose text has a block beside it (p125 অনু ৫: the text and its table): { ex, mark, text, aside, w }. */
    c3p118_exside: (b, ctx, page) => `<div class="ex m-${b.mark}"><div class="c3p118-exs"><div class="ext wm">${ctx.exMark(b.mark, b.ex)}<span>${ctx.md(b.text)}</span></div><div style="flex:0 0 ${b.w || 80}mm">${ctx.blockHtml(b.aside, page)}</div></div></div>`,
    /** A pencil lying, its length in mm: { len, t, color, indent }. */
    c3p118_pencil: (b) => `<div class="c3p118-penrow" style="padding-left:${b.indent ?? 8}mm">${pencilSvg(b.len, b.t || 5.4, b.color || "orange")}</div>`,
    /** Clocks and other time pictures in a row, each with a question above, a caption, lines or an answer box below:
     *  items: [{ h, m, s, empty, plain, arc: [m1, m2], size } | { lcd, style, h } | { phone, temp, h } | { watch, h }, + { q, cap, lines, box }];
     *  arrows: ⇨ between them; qh: the questions' height (mm), so the clocks line up. */
    c3p118_clocks: (b, ctx) => {
      const one = (it) => {
        const fig = it.lcd != null ? lcdSvg(it.lcd, it.style, it.h || b.lh || 15) : it.phone ? phoneSvg(it.phone, it.temp, it.h || 40) : it.watch ? watchSvg(it.watch, it.h || 34) : clockSvg({ ...it, size: it.size || b.size || 34 }, ctx.bn);
        return `<figure class="c3p118-ck"${b.cw ? ` style="width:${b.cw}mm"` : ""}>${it.q != null ? `<p class="q"${b.qh ? ` style="height:${b.qh}mm"` : ""}>${ctx.md(it.q)}</p>` : ""}<div class="fg"${b.fh ? ` style="height:${b.fh}mm"` : ""}>${fig}</div>${it.cap ? `<figcaption>${ctx.md(it.cap)}</figcaption>` : ""}${(it.lines || []).map((l) => `<p class="ln">${ctx.md(l)}</p>`).join("")}${it.box ? `<i class="c3p118-tbox"></i>` : ""}</figure>`;
      };
      return `<div class="c3p118-clocks${b.arrows ? " arr" : ""}" style="justify-content:${b.justify || "space-around"};gap:${b.gap ?? 3}mm">${b.items.map(one).join(b.arrows ? `<span class="c3p118-darr">${DARROW}</span>` : "")}</div>`;
    },
    /** p126: the clock with its three hands named (10:10 and 32 seconds), leader lines to the names. */
    c3p118_hands: (b, ctx) => {
      const R = 22, C = [24, 24], sc = (2 * R) / 100, at = (len, a) => polar(C[0], C[1], len * sc, a);
      const ha = 10 * 30 + 10 * .5, ma = 10 * 6, sa = 32 * 6, mh = at(28, ma), hh = at(16, ha), sh = at(26, sa);
      const T = (x, y, t, c, a = "start") => `<text x="${x}" y="${y}" text-anchor="${a}" font-family="Noto Sans Bengali" font-weight="700" font-size="4" fill="${c}">${t}</text>`;
      const lead = (p, x2, y2, c) => `<path d="M${f2(p[0])} ${f2(p[1])}L${x2} ${y2}" stroke="${c}" stroke-width=".45" fill="none"/><circle cx="${f2(p[0])}" cy="${f2(p[1])}" r=".8" fill="${c}"/>`;
      return `<svg class="c3p118-svg" width="${b.w || 84}mm" height="${f2((b.w || 84) * 60 / 84)}mm" viewBox="0 0 84 60"><g transform="translate(${C[0] - R} ${C[1] - R}) scale(${f2(sc)})">${clockInner({ h: 10, m: 10, s: 32 }, ctx.bn)}</g>
        ${lead(mh, 52, 11, "#DC2626")}${T(53, 12.4, "মিনিটের কাঁটা", "#B91C1C")}${lead(sh, 52, 44, "#16A34A")}${T(53, 45.4, "সেকেন্ডের কাঁটা", "#15803D")}${lead(hh, 9, 52, "#1E3A8A")}${T(1, 57.4, "ঘণ্টার কাঁটা", "#1E3A8A")}</svg>`;
    },
    /** p126 কাজ ১: the clock (2:33 and 56 seconds), the minute marks between 5 and 7 enlarged, an arrow to the facts box. */
    c3p118_minutes: (b, ctx, page) => {
      const cx = 19, cy = -16, R = 30;
      let arc = "";
      for (let mm = 24; mm <= 36; mm++) { const [x, y] = polar(cx, cy, R, mm * 6); arc += `<circle cx="${f2(x)}" cy="${f2(y)}" r="${mm % 5 ? .55 : .95}" fill="${INK}"/>`; }
      for (const [mm, n] of [[25, 5], [30, 6], [35, 7]]) { const [x, y] = polar(cx, cy, R - 4.4, mm * 6); arc += `<text x="${f2(x)}" y="${f2(y + 1.4)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="600" font-size="4.2" fill="${INK}">${n}</text>`; }
      arc += `<path d="M38.4 8.3H42" stroke="${INK}" stroke-width=".5"/><path d="M44 8.3L41.4 6.8V9.8Z" fill="${INK}"/>`; // from the arc to the facts
      return `<div class="c3p118-minr"><div class="c3p118-minl">${clockSvg({ ...b.clock, size: b.size || 44 }, ctx.bn)}<svg class="c3p118-svg c3p118-arcz" width="44mm" height="17mm" viewBox="0 0 44 17">${arc}</svg></div>
        <div class="c3p118-facts">${b.facts.map((t) => `<p>${ctx.md(t)}</p>`).join("")}</div></div>`;
    },
    /** A time flow: boxes and a big arrow ([৩:২০] [৩০ মিনিট ➜] [□]); dir: left mirrors the arrow. items: [{ t, tone } | { t, arrow: true } | { box: true }]. */
    c3p118_flow: (b, ctx) => `<div class="c3p118-flow">${b.items.map((it) => it.box ? `<i class="c3p118-tbox big"></i>` : it.arrow ? `<span class="c3p118-farr ${b.dir === "left" ? "l" : "r"}"><span>${ctx.md(it.t)}</span></span>` : `<span class="c3p118-fbox">${ctx.md(it.t)}</span>`).join("")}</div>`,
    /** Weighing instruments in a row, in groups with a caption under each and a line between the groups:
     *  { groups: [{ items: [{ type: dial|pan|beam|digital|hook, h, kg, read, load, left, right, box, cap }], cap }], gap, justify } or { items }. */
    c3p118_scales: (b, ctx) => {
      const fig = (it) => `<figure class="c3p118-sc">${scaleSvg(it, ctx)}${it.cap ? `<figcaption>${ctx.md(it.cap)}</figcaption>` : ""}${it.box ? `<i class="c3p118-tbox"></i>` : ""}</figure>`;
      const groups = b.groups || [{ items: b.items }];
      return `<div class="c3p118-scales" style="justify-content:${b.justify || "space-around"}">${groups.map((g) => `<div class="c3p118-sg2"${g.w ? ` style="flex:0 0 ${g.w}mm"` : ""}><div class="c3p118-sgi" style="gap:${b.gap ?? 3}mm;align-items:${b.align || "flex-end"}">${g.items.map(fig).join("")}</div>${g.cap ? `<p class="c3p118-gcap">${ctx.md(g.cap)}</p>` : ""}</div>`).join(`<i class="c3p118-vl"></i>`)}</div>`;
    },
    /** One scale with its load and a speech card beside it is built in the page; this draws one instrument alone: { type, …, h }. */
    c3p118_scale: (b, ctx) => `<div class="c3p118-one">${scaleSvg(b, ctx)}</div>`,
    /** The standard weights (আদর্শ বাটখারা): { head, rows: [[{ v, top, label }…]…], k }. */
    c3p118_wset: (b, ctx) => `<div class="c3p118-wset"><span class="c3p118-uh">${ctx.md(b.head)}</span><div class="c3p118-wb">${b.rows.map((r) => `<div class="c3p118-wr">${r.map((it) => `<figure${it.side ? ` class="side"` : ""}>${weightSvg(it.v, it.top, b.k || 1)}<figcaption>${ctx.md(it.label)}</figcaption></figure>`).join("")}</div>`).join("")}</div></div>`,
    /** p120: Nipa's way to her grandmother's house: the roads drawn, the places as stickers, the distances as printed. */
    c3p118_map: (b, ctx) => {
      const VW = 170, VH = 74, P = (x, y) => `left:${f2(x / VW * 100)}%;top:${f2(y / VH * 100)}%`;
      const roads = ["M0 29H170", "M37 29V67", "M0 67H102L113 74", "M119 29L102 67"];
      let s = `<rect width="${VW}" height="${VH}" fill="#B9E48C"/><rect width="${VW}" height="15" fill="#D7F0FC"/><path d="M0 15H170V24H0Z" fill="#CBEBA6"/>
        <g fill="#fff" opacity=".9"><ellipse cx="22" cy="6" rx="7" ry="2.2"/><ellipse cx="27" cy="4.8" rx="4" ry="2"/><ellipse cx="104" cy="5" rx="6" ry="1.8"/><ellipse cx="150" cy="7" rx="7" ry="2.2"/><ellipse cx="155" cy="5.6" rx="4" ry="2"/></g>
        <path d="M41 33H98L110 33L100 63H41Z" fill="#A3D977"/><path d="M45 37H96L88 59H45Z" fill="none" stroke="#D6A55C" stroke-width="1.2"/>`;
      for (const [w, c] of [[8.6, "#A1A1AA"], [6.8, "#6B7280"]]) s += roads.map((d) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`).join("");
      s += roads.map((d) => `<path d="${d}" fill="none" stroke="#fff" stroke-width=".4" stroke-dasharray="2 1.6"/>`).join("");
      const dist = (x1, y1, x2, y2) => { const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, a = [x1 + ux * 1.6, y1 + uy * 1.6], c = [x2 - ux * 1.6, y2 - uy * 1.6], n = [-uy, ux];
        const head = (p, d) => `<path d="M${f2(p[0])} ${f2(p[1])}L${f2(p[0] - d * ux * 2.2 + n[0] * 1.2)} ${f2(p[1] - d * uy * 2.2 + n[1] * 1.2)}L${f2(p[0] - d * ux * 2.2 - n[0] * 1.2)} ${f2(p[1] - d * uy * 2.2 - n[1] * 1.2)}Z" fill="#fff"/>`;
        return `<path d="M${f2(a[0])} ${f2(a[1])}L${f2(c[0])} ${f2(c[1])}" stroke="#fff" stroke-width=".6"/>${head(a, -1)}${head(c, 1)}<circle cx="${x1}" cy="${y1}" r="1.1" fill="#fff" stroke="#334155" stroke-width=".3"/><circle cx="${x2}" cy="${y2}" r="1.1" fill="#fff" stroke="#334155" stroke-width=".3"/>`; };
      s += dist(22, 29, 88, 29) + dist(88, 29, 119, 29) + dist(119, 29, 102, 67) + dist(20, 67, 102, 67);
      const thing = (name, emoji, x, y, w, h) => { const img = ctx.sticker(name); return `<span class="c3p118-mt" style="${P(x, y)};width:${f2(w / VW * 100)}%;height:${f2(h / VH * 100)}%">${img ? `<img src="${img}">` : `<i style="font-size:${f2(h * 1.9)}pt">${emoji}</i>`}</span>`; };
      const tag = (t, x, y, cls = "") => `<span class="c3p118-mtag ${cls}" style="${P(x, y)}">${ctx.md(t)}</span>`;
      const trees = [[44, 13, 9], [53, 14, 8], [62, 13, 9], [70, 14, 8], [100, 14, 8], [108, 13, 9], [152, 14, 8], [161, 13, 9], [44, 52, 7], [92, 50, 7], [91, 37, 6], [6, 31, 7], [15, 32, 7], [25, 31, 7], [161, 40, 7], [114, 40, 7]];
      const html = thing("hospital", "🏥", 3, 5, 32, 22) + thing("village-house", "🏡", 76, 8, 22, 18) + thing("post-office", "🏤", 124, 8, 25, 18)
        + trees.map(([x, y, w]) => thing("tree", "🌳", x - w / 2, y - 2, w, w * 1.15)).join("")
        + thing("school", "🏫", 53, 36, 34, 24) + thing("house", "🏠", 3, 41, 31, 21) + thing("playground", "🛝", 122, 40, 40, 26)
        + tag("নানাবাড়ি", 87, 7.4) + tag("পোস্ট অফিস", 136.5, 7) + tag("নিপার বাড়ি", 18.5, 40.6) + tag("উদ্যান", 140, 69.6)
        + tag("৪ কিমি ৭৫০মি", 55, 29, "d") + tag("৩ কিমি", 103.5, 29, "d") + tag("৭ কিমি", 61, 67, "d") + `<span class="c3p118-mtag d rot" style="${P(110.5, 48)}">${ctx.md("৫ কিমি ৫০ মি")}</span>`;
      return `<div class="c3p118-map" style="width:${b.w || 164}mm;height:${f2((b.w || 164) * VH / VW)}mm"><svg class="c3p118-svg" width="100%" height="100%" viewBox="0 0 ${VW} ${VH}" preserveAspectRatio="none">${s}</svg>${html}</div>`;
    },
  },
  css: `
.c3p118-svg { display: block; overflow: visible }
.c3p118-rn { font-family: 'Baloo Da 2'; font-weight: 600; fill: ${INK} }
.c3p118-cap { font-family: 'Noto Sans Bengali'; font-weight: 700; fill: ${INK} }
.c3p118-rul { display: flex; justify-content: center }
.c3p118-sm .say { gap: 2.2mm } .c3p118-sm .fc { width: var(--fc, 14mm); height: var(--fc, 14mm); border-width: .6mm }
.c3p118-sm .sb { font-size: var(--fs, 11.5pt); line-height: 1.42; padding: 1.5mm 3.6mm 1.2mm; max-width: var(--mw, 130mm); border-radius: 4mm }
.c3p118-unit { display: flex; flex-direction: column; align-items: center; align-self: center; font-size: 12.5pt }
.c3p118-uh { position: relative; z-index: 1; font: 800 .92em/1 'Baloo Da 2'; color: #fff; background: linear-gradient(135deg, #38BDF8, var(--c)); padding: 1.4mm 5.4mm 1mm; border-radius: 2.6mm 2.6mm 0 0; box-shadow: 0 .6mm 0 var(--d); white-space: nowrap }
.c3p118-ub { font: 700 1em/1.5 'Baloo Da 2'; color: #0C4A6E; background: var(--s); border: .6mm solid var(--c); border-radius: 4.4mm; padding: 1.4mm 6mm 1mm; text-align: center; box-shadow: 0 .9mm 0 #BAE6FD; white-space: pre-line }
.c3p118-unit.pill .c3p118-ub { border-radius: 99px; padding: 1.2mm 7mm .8mm }
.c3p118-steps { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 1.6mm 6mm; font: 700 12.5pt/1.55 'Baloo Da 2' }
.c3p118-sg { display: grid; grid-template-columns: auto auto auto; column-gap: 1.8mm; align-items: baseline } .c3p118-sg .l { text-align: right } .c3p118-sg b { color: #DC2626 } .c3p118-sg span { white-space: nowrap }
.c3p118-tb { table-layout: fixed } .c3p118-tbw .grid td { height: var(--rh); vertical-align: middle; padding-top: .4mm; padding-bottom: .4mm }
.c3p118-res { margin-left: auto; font: 800 12.5pt 'Baloo Da 2'; color: #9A3412; background: #FFFBEB; border: .6mm solid #F59E0B; border-radius: 2.6mm; padding: .6mm 4mm .2mm; white-space: nowrap }
.c3p118-fill { display: grid; column-gap: 9mm; row-gap: 1mm; font: 600 12.5pt/1.5 'Noto Sans Bengali'; padding-left: 2mm } .c3p118-fill .abox { width: var(--bw); height: 6.8mm; vertical-align: -1.9mm } .c3p118-fill span { white-space: nowrap }
.c3p118-list { display: grid; column-gap: 2mm; font: 500 12.5pt/1.45 'Noto Sans Bengali'; padding-left: 1mm } .c3p118-list b { font-weight: 700; color: #0369A1; white-space: nowrap }
.c3p118-ladder { align-self: center; display: flex; align-items: center; gap: 1.6mm; font: 800 13pt 'Baloo Da 2'; color: #0C4A6E; background: var(--s); border: .6mm solid var(--c); border-radius: 99px; padding: 1.4mm 7mm .9mm; box-shadow: 0 .9mm 0 #BAE6FD }
.c3p118-la { flex: none; display: block }
.c3p118-match { display: grid; grid-template-columns: 1fr 1fr; column-gap: 26mm; row-gap: 2mm }
.c3p118-match > div { position: relative; display: flex; align-items: center; min-height: 9.4mm; padding: 1mm 4mm .6mm; background: #fff; border: .5mm solid #5EEAD4; border-radius: 2.6mm; font: 600 12.5pt 'Noto Sans Bengali' }
.c3p118-match i { position: absolute; top: 50%; width: 3.2mm; height: 3.2mm; margin-top: -1.6mm; border-radius: 50%; background: #0D9488; border: .5mm solid #fff; box-shadow: 0 0 0 .35mm #0D9488 } .c3p118-match .ml i { right: -2mm } .c3p118-match .mr i { left: -2mm } .c3p118-match .mr { padding-left: 5mm }
.c3p118-mcq { display: flex; flex-direction: column; gap: 1.2mm } .c3p118-mcq .q { font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.c3p118-opts { display: grid; gap: 1.4mm 2.4mm; padding-left: 5mm; font: 500 12pt/1.45 'Noto Sans Bengali' }
.c3p118-opts span { display: flex; align-items: center; gap: 1.8mm; justify-self: start; white-space: nowrap; background: #fff; border: .4mm solid #BFDBFE; border-radius: 2.4mm; padding: .4mm 2.6mm .2mm 1.4mm }
.c3p118-opts span::before { content: ""; flex: none; width: 3.6mm; height: 3.6mm; border-radius: 50%; border: .45mm solid #60A5FA; background: #fff }
.c3p118-exs { display: flex; gap: 4mm; align-items: flex-start } .c3p118-exs > .ext { flex: 1 }
.c3p118-pen { display: inline-block } .c3p118-pen.in { vertical-align: -.4mm; margin: 0 1.4mm } .c3p118-penrow { display: flex }
.c3p118-clocks { display: flex; align-items: flex-start } .c3p118-clocks.arr { align-items: center }
.c3p118-ck { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 1.2mm }
.c3p118-ck .q { font: 500 12pt/1.4 'Noto Sans Bengali'; text-align: center; width: 100% } .c3p118-ck .fg { display: flex; align-items: center; justify-content: center }
.c3p118-ck figcaption { font: 700 11.5pt/1.25 'Baloo Da 2'; text-align: center; white-space: nowrap }
.c3p118-ck .ln { font: 600 11.5pt/1.55 'Noto Sans Bengali'; white-space: nowrap; align-self: stretch }
.c3p118-ck .ln .abox { width: 7.4mm; height: 6.2mm; vertical-align: -1.8mm; margin: 0 .5mm } .c3p118-ck .ln .ansbox { min-width: 7.4mm; padding: 0 1.2mm; font-size: 11pt; border-width: .5mm; margin: 0 .5mm; line-height: 1.25 }
.c3p118-darr { align-self: center; flex: none; margin-bottom: 7mm }
.c3p118-tbox { display: block; width: 30mm; height: 9.4mm; border: .6mm solid #F59E0B; background: #FFFBEB; border-radius: 2mm; flex: none } .c3p118-tbox.big { width: 34mm; height: 13mm }
.c3p118-minr { display: flex; align-items: center; justify-content: space-between; gap: 4mm } .c3p118-minl { display: flex; align-items: flex-end; gap: 0 } .c3p118-arcz { margin-left: -2mm; margin-bottom: 1mm }
.c3p118-facts { flex: 0 0 80mm; background: #fff; border: .6mm solid var(--c); border-radius: 4mm; padding: 2mm 4mm 1.6mm; box-shadow: 0 1mm 0 var(--s); font: 500 11.5pt/1.5 'Noto Sans Bengali' }
.c3p118-facts p { position: relative; padding-left: 4.4mm } .c3p118-facts p::before { content: ""; position: absolute; left: .4mm; top: 2.6mm; width: 2mm; height: 2mm; border-radius: 50%; background: var(--c) }
.c3p118-flow { display: flex; align-items: center; gap: 2mm }
.c3p118-fbox { display: inline-flex; align-items: center; justify-content: center; min-width: 22mm; height: 12mm; padding: .6mm 3mm 0; background: #D9F99D; border: .5mm solid #65A30D; border-radius: 2mm; font: 800 13pt 'Baloo Da 2'; color: #365314 }
.c3p118-farr { position: relative; display: inline-flex; align-items: center; width: 40mm; height: 17mm; font: 800 12.5pt 'Baloo Da 2'; color: #9A3412 }
.c3p118-farr::before { content: ""; position: absolute; inset: 0; background: #FDBA74; clip-path: polygon(0 22%, 70% 22%, 70% 0, 100% 50%, 70% 100%, 70% 78%, 0 78%) }
.c3p118-farr.l::before { clip-path: polygon(100% 22%, 30% 22%, 30% 0, 0 50%, 30% 100%, 30% 78%, 100% 78%) }
.c3p118-farr span { position: relative; width: 70%; text-align: center; padding-top: .6mm } .c3p118-farr.l span { margin-left: 30% }
.c3p118-scales { display: flex; align-items: stretch; gap: 3mm }
.c3p118-sg2 { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 1.6mm } .c3p118-sgi { display: flex; justify-content: center }
.c3p118-gcap { font: 700 12pt 'Noto Sans Bengali'; color: ${INK} } .c3p118-vl { flex: none; width: .6mm; background: #F59E0B; border-radius: 1mm; margin: 2mm 1mm }
.c3p118-sc { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 1.6mm } .c3p118-sc figcaption { font: 700 11.5pt 'Noto Sans Bengali' }
.c3p118-one { display: flex; justify-content: center }
.c3p118-wset { display: flex; flex-direction: column; align-items: flex-start }
.c3p118-wset .c3p118-uh { margin-left: 8mm; font-size: 12pt }
.c3p118-wb { align-self: stretch; background: linear-gradient(#FFFBEB, #FEF3C7); border: .6mm solid #F59E0B; border-radius: 5mm; padding: 2.6mm 4mm 2mm; box-shadow: 0 1mm 0 #FDE68A; display: flex; flex-direction: column; gap: 2mm }
.c3p118-wr { display: flex; align-items: flex-end; justify-content: space-between; gap: 2mm }
.c3p118-wr figure { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 1mm } .c3p118-wr figure.side { flex-direction: row; gap: 3mm; align-items: center }
.c3p118-wr figcaption { font: 700 11pt 'Noto Sans Bengali'; white-space: nowrap }
.c3p118-map { position: relative; align-self: center; border-radius: 3mm; overflow: hidden; border: .6mm solid #fff; box-shadow: 0 0 0 .5mm var(--c), 0 1.2mm 0 .5mm var(--s) }
.c3p118-map > svg { position: absolute; inset: 0 }
.c3p118-mt { position: absolute; display: flex; align-items: flex-end; justify-content: center } .c3p118-mt img { width: 100%; height: 100%; object-fit: contain; object-position: 50% 100% }
.c3p118-mt i { font-family: 'Noto Color Emoji'; font-style: normal; line-height: 1 }
.c3p118-mtag { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; font: 700 9.6pt/1 'Noto Sans Bengali'; color: ${INK}; background: #FFFBEB; border: .4mm solid #F59E0B; border-radius: 1.6mm; padding: .7mm 1.8mm .5mm }
.c3p118-mtag.d { background: #fff; border-color: #475569; font-size: 9.4pt } .c3p118-mtag.rot { transform: translate(-50%, -50%) rotate(-66deg) }
`,
};
