// Printed pages 159–170's own kinds (chapter ৯ জ্যামিতি, its second part: the circle and its parts, drawing a circle with a
// pin and a strip or with a compass, designs made of circles, the review, geometric patterns and tilings, solids, নিজে করি),
// prefixed c5p159_. Written by a helper (25 Nov 2026). Units: mm.
// Every circle, line, tiling, compass, ruler, CD, plate and solid is drawn here by code; the content file computes the
// shapes (true circles, radius and diameter as printed, tilings of congruent tiles, the solids in the series' colours).
//
//   c5p159_fig    { w, h, items, boxes?, justify?, mt? }   a drawing in mm (origin top-left, y down). Angles are maths
//                 degrees (0 = to the right, anticlockwise). Items:
//     { circle: [cx, cy, r] } { ellipse: [cx, cy, rx, ry] } { rect: [x, y, w, h], rx? } { poly: [[x, y]…] } { line: [[x, y]…] }
//                 each with fill?, stroke?, sw?, dash?, op? (opacity)
//     { arc: [cx, cy, r, a0, a1] }             an arc from a0 to a1 (anticlockwise when a1 > a0)
//     { bow: [A, B, bulge] }                   the book's dashed curve beside a segment AB (bulge mm, + to the left of A→B)
//     { arrow: [A, B] } { carrow: [A, C, B] }  a straight / curved (quadratic, through control C) arrow, its head at B
//     { dot: [x, y], r? }                      a dot
//     { t: "words", at: [x, y], fs?, anchor?, color?, weight?, rot? }   words (Noto Sans Bengali), centred on (x, y)
//     { pin: [x, y], s? }                      a red push-pin stuck in at (x, y)
//     { pencil: [x, y], ang, len?, wid?, color? }   a pencil, its point at (x, y), its body lying towards ang
//     { compass: { n: [x, y], p: [x, y], leg?, flip? } }   a pair of compasses: the needle at n, the pencil's point at p,
//                 the hinge over the middle of np (flip: on the other side), each leg `leg` mm long, the red handle on top
//     { scale: [x, y], cm?, n?, wid? }         the book's ruler: its 0 at (x, y) on the top edge, a mark every mm,
//                 English digits ০–n as the book prints them, "cm" under them (cm: mm per centimetre of the drawing)
//     { cd: [cx, cy, r] } { plate: [cx, cy, r] }        a CD; a steel plate with a copper rim (p169)
//     { cube: [x, y, s] } { cuboid: [x, y, w, h, d], look? } { cyl: [x, y, w, h], look?: "glass" | "teal" }
//     { cone: [x, y, w, h] } { sphere: [cx, cy, r] }     the solids, (x, y) the top-left of the box they stand in
//     { group: [items], clip?: [x, y, w, h] }  items, clipped to a rectangle
//     { raw: "<…>" }                           anything else, as it is
//   boxes: [{ x, y, w, text, fs?, al? }]       the book's peach boxes of words, laid over the drawing (p161's steps)
//   c5p159_blanks { items: [{ n, text }], bw?, size? }   p161's sentences, each with a box to fill at the right; "▭" in a
//                 text puts its box inside the line instead (its "… হবে ▭ সেমি।")
//   c5p159_exh    { mark, n, icons: { w, h, items }, text }   an exercise heading with drawings between the marker and the
//                 words (p168 কাজ ৪: the four solids)
//   c5p159_lines  { items: [text…], cols?, size?, gap? }   short lines to write on, "(১) ……" in columns (p163)
//   c5p159_stk    { name, w, h, emoji }   one sticker in a w × h box (p166's things); until the sticker comes, its emoji
//                 sized to the box (wave 1's c5p063_stk draws its emoji at 40pt, which spills out of a small box)
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const xy = (p) => `${f2(p[0])} ${f2(p[1])}`;
const rad = (d) => (d * Math.PI) / 180;
const escx = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const go = (p, a, r) => [p[0] + r * Math.cos(rad(a)), p[1] - r * Math.sin(rad(a))];
const dirOf = (A, B) => (Math.atan2(-(B[1] - A[1]), B[0] - A[0]) * 180) / Math.PI;
const lerp = (A, B, t) => [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
const FONT = `font-family="'Noto Sans Bengali'"`;
let UID = 0;

const style = (it, d = {}) => {
  const fill = it.fill ?? d.fill ?? "none", stroke = it.stroke ?? d.stroke ?? INK, sw = it.sw ?? d.sw ?? 0.45;
  return `fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${it.dash ? ` stroke-dasharray="${it.dash}"` : ""}${it.op != null ? ` opacity="${it.op}"` : ""} stroke-linejoin="round" stroke-linecap="round"`;
};
const text = (s, [x, y], o = {}) => {
  const tr = o.rot ? ` transform="rotate(${-o.rot} ${f2(x)} ${f2(y)})"` : "";
  return `<text x="${f2(x)}" y="${f2(y)}" text-anchor="${o.anchor || "middle"}" dominant-baseline="central" ${FONT} font-weight="${o.weight || 600}" font-size="${f2(o.fs || 3.6)}" fill="${o.color || INK}"${tr}>${escx(s)}</text>`;
};
const head = (B, a, h, color) => { const h1 = go(B, a + 180 - 24, h), h2 = go(B, a + 180 + 24, h); return `<path d="M${xy(B)}L${xy(h1)}L${xy(h2)}Z" fill="${color}"/>`; };
// a tapered band from A (width wA) to B (width wB), as a polygon
const band = (A, B, wA, wB) => { const a = dirOf(A, B); return [go(A, a + 90, wA / 2), go(B, a + 90, wB / 2), go(B, a - 90, wB / 2), go(A, a - 90, wA / 2)]; };
const polyD = (P) => `M${P.map(xy).join("L")}Z`;

function pencil(it) {
  const [x, y] = it.pencil, a = it.ang ?? 60, L = it.len || 13, w = it.wid || 2.2, tip = w * 1.25, col = it.color || "#F59E0B";
  const body = `<path d="M0 0L${f2(tip)} ${f2(-w / 2)}H${f2(L)}V${f2(w / 2)}H${f2(tip)}Z" fill="${col}" stroke="${INK}" stroke-width=".22" stroke-linejoin="round"/>`
    + `<path d="M0 0L${f2(tip)} ${f2(-w / 2)}V${f2(w / 2)}Z" fill="#FDE7C7" stroke="${INK}" stroke-width=".22" stroke-linejoin="round"/>`
    + `<path d="M0 0L${f2(tip * 0.38)} ${f2(-w * 0.19)}V${f2(w * 0.19)}Z" fill="${INK}"/>`
    + `<rect x="${f2(L)}" y="${f2(-w / 2)}" width="${f2(w * 0.7)}" height="${f2(w)}" fill="#F9A8D4" stroke="${INK}" stroke-width=".22"/>`;
  return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(-a)})">${body}</g>`;
}
// a red push-pin: its point at (x, y), the head up and to the left
function pin(it) {
  const P = it.pin, s = it.s || 1, a = 135, n1 = go(P, a, 1.8 * s), c = go(P, a, 3.2 * s), hd = go(P, a, 5.4 * s);
  return `<path d="M${xy(P)}L${xy(n1)}" stroke="#475569" stroke-width="${f2(0.45 * s)}" stroke-linecap="round"/>`
    + `<path d="${polyD(band(n1, c, 1.4 * s, 2 * s))}" fill="#B91C1C" stroke="#7F1D1D" stroke-width=".2"/>`
    + `<path d="${polyD(band(c, hd, 3.4 * s, 3.4 * s))}" fill="#DC2626" stroke="#7F1D1D" stroke-width=".25" stroke-linejoin="round"/>`
    + `<circle cx="${f2(hd[0])}" cy="${f2(hd[1])}" r="${f2(1.9 * s)}" fill="#EF4444" stroke="#7F1D1D" stroke-width=".25"/>`
    + `<circle cx="${f2(hd[0] - 0.6 * s)}" cy="${f2(hd[1] - 0.6 * s)}" r="${f2(0.55 * s)}" fill="#FCA5A5"/>`;
}
// a pair of compasses: the needle at n, the pencil's point at p; the hinge on the perpendicular bisector of np
function compass(it) {
  const { n, p, leg = 30, flip } = it.compass, M = lerp(n, p, 0.5), d = Math.hypot(p[0] - n[0], p[1] - n[1]);
  const hgt = Math.sqrt(Math.max(1, leg * leg - (d * d) / 4)), a = dirOf(n, p), up = a + (flip ? -90 : 90), H = go(M, up, hgt);
  let g = "";
  // the needle leg: steel, tapering, then the needle itself
  const nEnd = lerp(H, n, 0.9);
  g += `<path d="${polyD(band(H, nEnd, 2.2, 1.1))}" fill="#CBD5E1" stroke="#475569" stroke-width=".22" stroke-linejoin="round"/>`;
  g += `<path d="M${xy(nEnd)}L${xy(n)}" stroke="#334155" stroke-width=".45" stroke-linecap="round"/>`;
  // the pencil leg: steel to the clamp, then the pencil
  const cl = lerp(H, p, 0.5), pc = lerp(H, p, 0.42);
  g += `<path d="${polyD(band(H, cl, 2.2, 1.6))}" fill="#CBD5E1" stroke="#475569" stroke-width=".22" stroke-linejoin="round"/>`;
  g += pencil({ pencil: p, ang: dirOf(p, H), len: Math.hypot(pc[0] - p[0], pc[1] - p[1]), wid: 2.3, color: "#FBBF24" });
  const c1 = lerp(H, p, 0.47), c2 = lerp(H, p, 0.56);
  g += `<path d="${polyD(band(c1, c2, 3.4, 3.4))}" fill="#94A3B8" stroke="#334155" stroke-width=".22"/>`;
  // the hinge and the red handle
  const h1 = go(H, up, 1), h2 = go(H, up, 9.5);
  g += `<path d="${polyD(band(h1, h2, 3.6, 3.2))}" fill="#DC2626" stroke="#7F1D1D" stroke-width=".25" stroke-linejoin="round"/>`;
  g += `<path d="${polyD(band(go(H, up, 6.5), h2, 3.25, 3.2))}" fill="#B91C1C"/>`;
  g += `<circle cx="${f2(H[0])}" cy="${f2(H[1])}" r="1.7" fill="#94A3B8" stroke="#334155" stroke-width=".25"/>`;
  return g;
}
// the ruler: light blue-grey, a mark every mm along the top edge, English digits and "cm"
function scale(it) {
  const [x, y] = it.scale, cm = it.cm || 5, n = it.n || 10, wid = it.wid || 7, pad = 2;
  let g = `<rect x="${f2(x - pad)}" y="${f2(y)}" width="${f2(n * cm + 2 * pad)}" height="${f2(wid)}" rx=".5" fill="#D5E6EE" stroke="#64748B" stroke-width=".25"/>`;
  g += `<rect x="${f2(x - pad)}" y="${f2(y + wid * 0.78)}" width="${f2(n * cm + 2 * pad)}" height="${f2(wid * 0.22)}" fill="#B9CFDB"/>`;
  let d = "";
  for (let i = 0; i <= n * 10; i++) { const hx = x + (i * cm) / 10, len = i % 10 === 0 ? wid * 0.34 : i % 5 === 0 ? wid * 0.25 : wid * 0.15; d += `M${f2(hx)} ${f2(y)}V${f2(y + len)}`; }
  g += `<path d="${d}" stroke="#334155" stroke-width=".13"/>`;
  for (let i = 0; i <= n; i++) g += `<text x="${f2(x + i * cm)}" y="${f2(y + wid * 0.55)}" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif" font-size="${f2(Math.min(2.6, cm * 0.5))}" fill="${INK}">${i}</text>`;
  g += `<text x="${f2(x + cm * 0.18)}" y="${f2(y + wid * 0.8)}" text-anchor="start" dominant-baseline="central" font-family="Arial, sans-serif" font-size="${f2(Math.min(1.8, cm * 0.36))}" fill="${INK}">cm</text>`;
  return g;
}
function cd([cx, cy, r], id) {
  let g = `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r)}" fill="url(#c5p159-cd${id})" stroke="#94A3B8" stroke-width=".3"/>`;
  // the light and dark sectors a disc shows
  for (const [a0, a1, c, o] of [[100, 128, "#fff", 0.75], [-80, -52, "#fff", 0.75], [150, 172, "#94A3B8", 0.35], [-30, -8, "#94A3B8", 0.35], [40, 52, "#E2E8F0", 0.9], [220, 232, "#E2E8F0", 0.9]]) {
    const p0 = go([cx, cy], a0, r * 0.97), p1 = go([cx, cy], a1, r * 0.97), q0 = go([cx, cy], a0, r * 0.45), q1 = go([cx, cy], a1, r * 0.45);
    g += `<path d="M${xy(q0)}L${xy(p0)}A${f2(r * 0.97)} ${f2(r * 0.97)} 0 0 0 ${xy(p1)}L${xy(q1)}A${f2(r * 0.45)} ${f2(r * 0.45)} 0 0 1 ${xy(q0)}Z" fill="${c}" opacity="${o}"/>`;
  }
  g += `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r * 0.385)}" fill="none" stroke="#3F4651" stroke-width="${f2(r * 0.11)}"/>`;
  g += `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r * 0.3)}" fill="#F1F5F9" stroke="#94A3B8" stroke-width=".2"/>`;
  g += `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r * 0.22)}" fill="none" stroke="#CBD5E1" stroke-width=".2"/>`;
  g += `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r * 0.1)}" fill="#fff" stroke="#CBD5E1" stroke-width=".2"/>`;
  return g;
}
function plate([cx, cy, r], id) {
  let g = `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r)}" fill="url(#c5p159-rim${id})" stroke="#9A5B2E" stroke-width=".3"/>`;
  let d = "";
  for (let i = 0; i < 72; i++) { const a = i * 5, p0 = go([cx, cy], a, r * 0.8), p1 = go([cx, cy], a, r * (i % 2 ? 0.88 : 0.93)); d += `M${xy(p0)}L${xy(p1)}`; }
  g += `<path d="${d}" stroke="#FFF7ED" stroke-width=".28" opacity=".85"/>`;
  g += `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r * 0.76)}" fill="url(#c5p159-steel${id})" stroke="#8D6E63" stroke-width=".3"/>`;
  g += `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r * 0.6)}" fill="none" stroke="#9CA3AF" stroke-width=".35"/>`;
  return g;
}
// the solids, in the colours of the book's pictures (a see-through pink and yellow cube, a red ball, a glass or teal
// cylinder, a white cone on a pale green base)
function cube([x, y, s], id) {
  const o = s * 0.34, F = [[x, y + o], [x + s, y + o], [x + s, y + o + s], [x, y + o + s]], B = F.map(([a, b]) => [a + o, b - o]);
  let g = `<path d="${polyD([B[0], B[1], B[2], B[3]])}" fill="#FDE68A" opacity=".55"/>`;
  g += `<path d="M${xy(B[3])}L${xy(B[0])}M${xy(B[3])}L${xy(B[2])}M${xy(B[3])}L${xy(F[3])}" stroke="#F59E0B" stroke-width=".25" opacity=".8"/>`;
  g += `<path d="${polyD([F[0], B[0], B[1], F[1]])}" fill="#FECACA" stroke="#E11D48" stroke-width=".25" opacity=".95"/>`;
  g += `<path d="${polyD([F[1], B[1], B[2], F[2]])}" fill="url(#c5p159-cy${id})" stroke="#D97706" stroke-width=".25"/>`;
  g += `<path d="${polyD(F)}" fill="url(#c5p159-cp${id})" stroke="#E11D48" stroke-width=".3" opacity=".92"/>`;
  return g;
}
function cuboid([x, y, w, h, d], look = {}) {
  const o = d * 0.7, dy = d * 0.7, F = [[x, y + dy], [x + w, y + dy], [x + w, y + dy + h], [x, y + dy + h]], top = [F[0], [x + o, y], [x + w + o, y], F[1]], side = [F[1], [x + w + o, y], [x + w + o, y + h], F[2]];
  const fill = look.fill || "#FFE4D6", st = look.stroke || INK;
  return `<path d="${polyD(top)}" fill="${look.top || "#FFEDE3"}" stroke="${st}" stroke-width=".3" stroke-linejoin="round"/><path d="${polyD(side)}" fill="${look.side || "#FCD5C2"}" stroke="${st}" stroke-width=".3" stroke-linejoin="round"/><path d="${polyD(F)}" fill="${fill}" stroke="${st}" stroke-width=".3"/>`;
}
function cyl([x, y, w, h], look, id) {
  const ry = w * 0.2, cx = x + w / 2, top = y + ry, bot = y + h - ry;
  const body = `M${f2(x)} ${f2(top)}V${f2(bot)}A${f2(w / 2)} ${f2(ry)} 0 0 0 ${f2(x + w)} ${f2(bot)}V${f2(top)}Z`;
  if (look === "teal") return `<path d="${body}" fill="url(#c5p159-teal${id})"/><ellipse cx="${f2(cx)}" cy="${f2(top)}" rx="${f2(w / 2)}" ry="${f2(ry)}" fill="#A7E3E0"/>`;
  return `<path d="${body}" fill="url(#c5p159-glass${id})" stroke="#7B9BC4" stroke-width=".3"/><ellipse cx="${f2(cx)}" cy="${f2(bot)}" rx="${f2(w / 2 * 0.86)}" ry="${f2(ry * 0.8)}" fill="#E0EEFB" stroke="#9DB7D8" stroke-width=".25"/>`
    + `<ellipse cx="${f2(cx)}" cy="${f2(bot)}" rx="${f2(w / 2 * 0.5)}" ry="${f2(ry * 0.45)}" fill="#C9DDF4" opacity=".8"/>`
    + `<ellipse cx="${f2(cx)}" cy="${f2(top)}" rx="${f2(w / 2)}" ry="${f2(ry)}" fill="#EAF3FC" stroke="#7B9BC4" stroke-width=".3"/>`
    + `<rect x="${f2(x + w * 0.2)}" y="${f2(top + ry * 0.9)}" width="${f2(w * 0.13)}" height="${f2(bot - top - ry * 1.4)}" rx="${f2(w * 0.06)}" fill="#fff" opacity=".8"/>`;
}
function cone([x, y, w, h]) {
  const ry = w * 0.12, cx = x + w / 2, by = y + h - ry;
  return `<path d="M${f2(cx)} ${f2(y)}L${f2(x + w)} ${f2(by)}A${f2(w / 2)} ${f2(ry)} 0 0 1 ${f2(x)} ${f2(by)}Z" fill="#FFFDF7" stroke="${INK}" stroke-width=".3" stroke-linejoin="round"/>`
    + `<ellipse cx="${f2(cx)}" cy="${f2(by)}" rx="${f2(w / 2)}" ry="${f2(ry)}" fill="#C8E6C2" stroke="${INK}" stroke-width=".3"/>`;
}
const sphere = ([cx, cy, r], id) => `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r)}" fill="url(#c5p159-ball${id})" stroke="#BE123C" stroke-width=".3"/>`;

function defs(id) {
  return `<defs>
<radialGradient id="c5p159-cd${id}" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#FAFAFB"/><stop offset=".7" stop-color="#E5E7EB"/><stop offset="1" stop-color="#C7CBD1"/></radialGradient>
<radialGradient id="c5p159-rim${id}" cx=".5" cy=".5" r=".5"><stop offset=".72" stop-color="#C77B45"/><stop offset=".86" stop-color="#F0A86C"/><stop offset="1" stop-color="#B8662F"/></radialGradient>
<radialGradient id="c5p159-steel${id}" cx=".45" cy=".4" r=".65"><stop offset="0" stop-color="#F8F8F8"/><stop offset=".6" stop-color="#DEDCDA"/><stop offset="1" stop-color="#B9B5B1"/></radialGradient>
<radialGradient id="c5p159-ball${id}" cx=".38" cy=".33" r=".72"><stop offset="0" stop-color="#FDA4AF"/><stop offset=".55" stop-color="#F43F5E"/><stop offset="1" stop-color="#BE123C"/></radialGradient>
<linearGradient id="c5p159-glass${id}" x1="0" x2="1"><stop offset="0" stop-color="#9DB9DE"/><stop offset=".35" stop-color="#E7F1FB"/><stop offset=".65" stop-color="#C3D7EF"/><stop offset="1" stop-color="#7E9CC9"/></linearGradient>
<linearGradient id="c5p159-teal${id}" x1="0" x2="1"><stop offset="0" stop-color="#5CC6C8"/><stop offset=".55" stop-color="#7FD6CF"/><stop offset="1" stop-color="#4CB98A"/></linearGradient>
<linearGradient id="c5p159-cp${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FB7185"/><stop offset="1" stop-color="#FDA4AF"/></linearGradient>
<linearGradient id="c5p159-cy${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FCD34D"/><stop offset="1" stop-color="#F59E0B"/></linearGradient>
</defs>`;
}

function item(it, id) {
  if (it.group) {
    if (!it.clip) return it.group.map((x) => item(x, id)).join("");
    const cid = `c5p159-clip${id}-${++UID}`, [x, y, w, h] = it.clip;
    return `<clipPath id="${cid}"><rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}"/></clipPath><g clip-path="url(#${cid})">${it.group.map((g) => item(g, id)).join("")}</g>`;
  }
  if (it.circle) return `<circle cx="${f2(it.circle[0])}" cy="${f2(it.circle[1])}" r="${f2(it.circle[2])}" ${style(it)}/>`;
  if (it.ellipse) return `<ellipse cx="${f2(it.ellipse[0])}" cy="${f2(it.ellipse[1])}" rx="${f2(it.ellipse[2])}" ry="${f2(it.ellipse[3])}" ${style(it)}/>`;
  if (it.rect) return `<rect x="${f2(it.rect[0])}" y="${f2(it.rect[1])}" width="${f2(it.rect[2])}" height="${f2(it.rect[3])}" rx="${it.rx || 0}" ${style(it)}/>`;
  if (it.poly) return `<path d="${polyD(it.poly)}" ${style(it)}/>`;
  if (it.line) return `<path d="M${it.line.map(xy).join("L")}" ${style(it)}/>`;
  if (it.arc) { const [cx, cy, r, a0, a1] = it.arc, p0 = go([cx, cy], a0, r), p1 = go([cx, cy], a1, r); return `<path d="M${xy(p0)}A${f2(r)} ${f2(r)} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${xy(p1)}" ${style(it)}/>`; }
  if (it.bow) { const [A, B, bulge = 3] = it.bow, m = lerp(A, B, 0.5), c = go(m, dirOf(A, B) + 90, bulge * 2); return `<path d="M${xy(A)}Q${xy(c)} ${xy(B)}" ${style({ ...it, dash: it.dash || "1.3 1" })}/>`; }
  if (it.arrow) { const [A, B] = it.arrow, a = dirOf(A, B), h = it.head || 1.8, c = it.color || INK, e = go(B, a + 180, h * 0.7); return `<path d="M${xy(A)}L${xy(e)}" stroke="${c}" stroke-width="${it.sw || 0.35}" stroke-linecap="round"/>${head(B, a, h, c)}`; }
  if (it.carrow) { const [A, C, B] = it.carrow, a = dirOf(C, B), h = it.head || 1.8, c = it.color || INK, e = go(B, a + 180, h * 0.7); return `<path d="M${xy(A)}Q${xy(C)} ${xy(e)}" fill="none" stroke="${c}" stroke-width="${it.sw || 0.35}" stroke-linecap="round"/>${head(B, a, h, c)}`; }
  if (it.dot) return `<circle cx="${f2(it.dot[0])}" cy="${f2(it.dot[1])}" r="${it.r || 0.75}" fill="${it.color || INK}"/>`;
  if (it.t != null) return text(it.t, it.at, it);
  if (it.pin) return pin(it);
  if (it.pencil) return pencil(it);
  if (it.compass) return compass(it);
  if (it.scale) return scale(it);
  if (it.cd) return cd(it.cd, id);
  if (it.plate) return plate(it.plate, id);
  if (it.cube) return cube(it.cube, id);
  if (it.cuboid) return cuboid(it.cuboid, it.look);
  if (it.cyl) return cyl(it.cyl, it.look, id);
  if (it.cone) return cone(it.cone);
  if (it.sphere) return sphere(it.sphere, id);
  if (it.raw) return it.raw;
  throw new Error("c5p159_fig: item? " + JSON.stringify(it).slice(0, 80));
}
function figSvg(b) {
  const id = ++UID;
  return `<svg class="c5p159-svg" width="${f2(b.w)}mm" height="${f2(b.h)}mm" viewBox="0 0 ${f2(b.w)} ${f2(b.h)}">${defs(id)}${b.items.map((it) => item(it, id)).join("")}</svg>`;
}
function figHtml(b, ctx) {
  const boxes = (b.boxes || []).map((x) => `<div class="c5p159-step" style="left:${x.x}mm;top:${x.y}mm;width:${x.w}mm${x.fs ? `;font-size:${x.fs}pt` : ""}${x.al ? `;text-align:${x.al}` : ""}">${ctx.md(x.text)}</div>`).join("");
  const inner = boxes ? `<div class="c5p159-board" style="width:${f2(b.w)}mm;height:${f2(b.h)}mm">${figSvg(b)}${boxes}</div>` : figSvg(b);
  return `<div class="c5p159-fw" style="justify-content:${b.justify || "center"}${b.mt ? `;margin-top:${b.mt}mm` : ""}">${inner}</div>`;
}

module.exports = {
  kinds: {
    c5p159_fig: figHtml,
    c5p159_blanks: (b, ctx) => `<div class="c5p159-blanks" style="${b.size ? `font-size:${b.size}pt;` : ""}--bw:${b.bw || 30}mm">${b.items.map((x) => {
      const t = ctx.md(x.text).replace(/▭/g, `<span class="c5p159-bx"></span>`);
      return `<span class="c5p159-bn">${ctx.esc(x.n)}</span>${/▭/.test(x.text) ? `<span class="c5p159-bt" style="grid-column:2 / 4">${t}</span>` : `<span class="c5p159-bt">${t}</span><span class="c5p159-bx"></span>`}`;
    }).join("")}</div>`,
    c5p159_exh: (b, ctx) => `<div class="ext wm">${ctx.exMark(b.mark, b.n)}<span class="c5p159-exh">${figSvg(b.icons)}<span>${ctx.md(b.text)}</span></span></div>`,
    c5p159_stk: (b, ctx) => { const src = ctx.sticker(b.name); return `<span class="c5p159-stk" style="width:${b.w}mm;height:${b.h}mm">${src ? `<img src="${src}">` : `<i style="font-size:${f2(Math.min(b.w, b.h) * 2.1)}pt">${ctx.esc(b.emoji || "●")}</i>`}</span>`; },
    c5p159_lines: (b, ctx) => `<div class="c5p159-lines" style="grid-template-columns:repeat(${b.cols || 2}, auto);${b.size ? `font-size:${b.size}pt;` : ""}gap:${b.gap ?? 2.4}mm 8mm">${b.items.map((t) => `<span>${ctx.md(t)}</span>`).join("")}</div>`,
  },
  css: `
.c5p159-fw { display: flex; flex: none } svg.c5p159-svg { display: block; overflow: visible; flex: none }
.c5p159-board { position: relative; flex: none } .c5p159-board > svg { position: absolute; left: 0; top: 0 }
.c5p159-step { position: absolute; background: #FDE3DA; border-radius: 3mm; padding: 1.6mm 2.6mm 1.3mm; font: 500 11pt/1.4 'Noto Sans Bengali'; color: ${INK}; text-align: left; box-shadow: 0 .7mm 0 #F8C9B8 }
.c5p159-blanks { display: grid; grid-template-columns: 8mm auto 1fr; align-items: center; row-gap: 2.2mm; column-gap: 1.4mm; font: 500 12.5pt/1.4 'Noto Sans Bengali'; padding-left: 4mm }
.c5p159-bn { font: 700 12pt 'Noto Sans Bengali'; color: #C2410C }
.c5p159-bx { display: inline-block; justify-self: end; width: var(--bw); height: 8mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; vertical-align: middle; margin: 0 1.2mm }
.c5p159-exh { display: flex; align-items: center; gap: 2.4mm } .c5p159-exh > svg { flex: none }
.c5p159-stk { display: inline-flex; align-items: center; justify-content: center; flex: none; margin: 0 auto } .c5p159-stk img { max-width: 100%; max-height: 100%; object-fit: contain } .c5p159-stk i { font-style: normal; font-family: 'Noto Color Emoji'; line-height: 1 }
.c5p159-lines { display: grid; justify-content: start; align-items: baseline; font: 500 12.5pt/1.45 'Noto Sans Bengali'; padding-left: 4mm }
`,
};
