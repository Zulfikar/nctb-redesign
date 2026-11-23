// Class 4's own shared kinds (written by Claude before wave 2, 23 Nov 2026), loaded for every page like lib/c2-* and c3-*.
// - c4_protractor: a protractor drawn true to the degree (চাঁদা, chapter ১০): the half disc, a tick every 1°, longer every
//   5° and 10°, the two scales (outer 0→180 from the left, inner 0→180 from the right, as on a real one), the centre mark
//   and the base line; and, if asked, an angle on it: arms from the centre at the given degrees (0 = along the base to the
//   right, counting anticlockwise), with an arc and a label. Digits are English by default (as the book's protractors
//   print them); digits: "bn" for Bangla.
//   { kind: "c4_protractor", r: 34 (mm), arms: [0, 65]?, arc: true?, label: "৬৫°"?, armLen: 1.25 (× r)?, digits?: "en"|"bn",
//     rotate?: deg (turn the whole protractor), fs?: 1 (× the scale digits' size: smaller for a small protractor),
//     step?: 10 (label every 10°; 30 keeps a small one readable), justify?: "center" }
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const BN = "০১২৩৪৫৬৭৮৯", bnd = (s) => String(s).replace(/\d/g, (d) => BN[d]);

function protractorSvg({ r = 34, arms, arc = true, label, armLen = 1.25, digits = "en", rotate = 0, armColor = "#DC2626", fs: fsk = 1, step = 10 }, ctx) {
  const pad = 4, R = r, W = 2 * (R * Math.max(armLen, 1) + pad), H = R * Math.max(armLen, 1) + pad + 6;
  const cx = W / 2, cy = H - 6, P = (deg, rr) => [cx + rr * Math.cos((deg * Math.PI) / 180), cy - rr * Math.sin((deg * Math.PI) / 180)];
  const num = (n) => (digits === "bn" ? bnd(n) : String(n));
  let g = "";
  // the half disc and its inner window
  g += `<path d="M${f2(cx - R)} ${f2(cy)}A${R} ${R} 0 0 1 ${f2(cx + R)} ${f2(cy)}Z" fill="#E0F2FE" fill-opacity=".85" stroke="#0369A1" stroke-width=".35"/>`;
  g += `<path d="M${f2(cx - R * .42)} ${f2(cy)}A${f2(R * .42)} ${f2(R * .42)} 0 0 1 ${f2(cx + R * .42)} ${f2(cy)}" fill="#fff" fill-opacity=".9" stroke="#0369A1" stroke-width=".25"/>`;
  // the ticks
  for (let d = 0; d <= 180; d++) {
    const len = d % 10 === 0 ? R * .12 : d % 5 === 0 ? R * .08 : R * .045;
    const [x1, y1] = P(d, R), [x2, y2] = P(d, R - len);
    g += `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}" stroke="#0C4A6E" stroke-width="${d % 10 === 0 ? .28 : .16}"/>`;
  }
  // the two scales: outer reads 0 at the left, inner reads 0 at the right
  const fs = Math.max(1.9, R * .07) * fsk;
  for (let d = 0; d <= 180; d += step) {
    const [xo, yo] = P(d, R * .8), [xi, yi] = P(d, R * .64), rot = 90 - d;
    g += `<text x="${f2(xo)}" y="${f2(yo)}" transform="rotate(${rot} ${f2(xo)} ${f2(yo)})" text-anchor="middle" dominant-baseline="middle" font-family="Nunito, sans-serif" font-weight="700" font-size="${f2(fs)}" fill="#0C4A6E">${num(180 - d)}</text>`;
    g += `<text x="${f2(xi)}" y="${f2(yi)}" transform="rotate(${rot} ${f2(xi)} ${f2(yi)})" text-anchor="middle" dominant-baseline="middle" font-family="Nunito, sans-serif" font-weight="600" font-size="${f2(fs * .82)}" fill="#DC2626">${num(d)}</text>`;
  }
  // the base line and the centre
  g += `<path d="M${f2(cx - R)} ${f2(cy)}H${f2(cx + R)}" stroke="#0369A1" stroke-width=".35"/><circle cx="${f2(cx)}" cy="${f2(cy)}" r=".7" fill="${INK}"/>`;
  // the angle
  if (arms && arms.length) {
    const L = R * armLen;
    for (const a of arms) { const [x, y] = P(a, L); g += `<path d="M${f2(cx)} ${f2(cy)}L${f2(x)} ${f2(y)}" stroke="${armColor}" stroke-width=".55" stroke-linecap="round"/>`; }
    if (arc && arms.length === 2) {
      const [a0, a1] = [Math.min(...arms), Math.max(...arms)], ra = R * .3, [x0, y0] = P(a0, ra), [x1, y1] = P(a1, ra);
      g += `<path d="M${f2(x0)} ${f2(y0)}A${f2(ra)} ${f2(ra)} 0 ${a1 - a0 > 180 ? 1 : 0} 0 ${f2(x1)} ${f2(y1)}" fill="none" stroke="${armColor}" stroke-width=".4"/>`;
      if (label) { const [lx, ly] = P((a0 + a1) / 2, ra + 3.2); g += `<text x="${f2(lx)}" y="${f2(ly)}" text-anchor="middle" dominant-baseline="middle" font-family="Noto Sans Bengali" font-weight="700" font-size="${f2(fs * 1.25)}" fill="${armColor}">${ctx.esc(label)}</text>`; }
    }
  }
  const tr = rotate ? ` transform="rotate(${-rotate} ${f2(cx)} ${f2(cy)})"` : "";
  return `<svg class="c4s-prot" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}"><g${tr}>${g}</g></svg>`;
}

module.exports = {
  kinds: {
    c4_protractor: (b, ctx) => `<div class="c4s-protw" style="justify-content:${b.justify || "center"}">${protractorSvg(b, ctx)}</div>`,
  },
  css: `
.c4s-protw { display: flex } svg.c4s-prot { display: block; overflow: visible }
`,
};
