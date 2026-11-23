// Printed pages 143–156's own kinds (prefixed c4p143_), written by a helper (23 Nov 2026). Chapter ১০ জ্যামিতি, its first half:
// angles and the protractor (pp143–149), perpendicular lines (pp150–151), parallel lines (pp152–155), the review (p156).
// Every angle, line, protractor, set square, map road and clock hand is drawn here by code, true to the degree. Units: mm.
// Angles are in maths degrees: 0 = to the right, counting anticlockwise (the y axis of the drawing points down).
//
//   c4p143_fig     { figs: [{ w, h, items, cap?, mt? }], gap?, justify?, align? } or one figure { w, h, items, cap? }:
//                  a drawing in mm (origin top-left). items (each optional key shown with its default):
//                    { seg: [[x,y],[x,y]], c, sw, dash }                       a line
//                    { ray: [x,y], a, len, c, sw, dash, from? }                 a line from a point at angle a (from: start r)
//                    { angle: [x,y], a: [a1,a2], len: L|[L1,L2], c, sw, arc: r, fill, ac, right: s, arrow, label, lr, la, lc, fs }
//                        two arms, the arc from a1 to a2 (anticlockwise), filled if `fill`, or a right-angle mark of size `right`;
//                        `arrow` puts an arrowhead on the arc's a2 end; the label sits at radius lr, angle la (default mid-angle)
//                    { arc: [x,y], r, a: [a1,a2], c, sw, fill, arrow }          an arc (anticlockwise a1 → a2)
//                    { rm: [x,y], a: [a1,a2], s, c, sw }                        a right-angle mark
//                    { t, at: [x,y], fs, anchor, c, w, base }                   words (Noto Sans Bengali; base: "middle" centres)
//                    { dot: [x,y], r, c, ring }                                 a dot (ring: a white edge)
//                    { rect: [x,y,w,h], fill, c, sw, rx, dash }                 a rectangle
//                    { poly: [[x,y]…], fill, c, sw, open }                      a polygon (open: a polyline)
//                    { box: [x,y,w,h], deg? }                                   an answer box (deg: a ° after it)
//                    { rbox: "১", at: [x,y] }                                   the book's red-framed step number
//                    { cnum: "১", at: [x,y], r }                                a number in a circle (p144)
//                    { arrow: [[x,y],[x,y]], c, sw, head }                      a straight arrow
//                    { prot: [cx,cy], r, digits, fk?, step? }                   c4_protractor (lib/c4-shared.parts.js), its centre here; its
//                        scale numbers drawn fk× (0.8, theirs touch below r 45 mm) and only every step° (30 when r < 20 mm)
//                    { sq: [x,y], a, legs: [L1,L2], flip, fill, c, hole, ruler: { edge: 1|2|"h", unit, from, to, rev, sub, skip0 } }
//                        a set square: the right angle at [x,y], leg 1 at angle a, leg 2 at a+90 (a−90 if flip)
//                    { img: "sticker", at: [x,y], w, h, emoji, flip, rot }     a sticker (or its emoji until it comes)
//                    { pencil: [x,y], a, len }                                  a pencil, its tip at [x,y], pointing at angle a
//                    { svg: "<…>" }                                             anything else, as it is
//   c4p143_x       { b } renders block b (or a list) and draws ∠ as the book's angle sign (the fonts lack it)
//   c4p143_things  p143 কাজ ১: the clock, the table, the window, the house, the books and the rickshaw in the book's frame
//   c4p143_papers  p143 কাজ ২: the square and the round paper, cut, slotted together and turned ({ h })
//   c4p143_turns   p144: the slotted papers turned through { degs }, numbered in circles, each angle drawn under it
//   c4p143_arrow   p145: the book's salmon arrow with words in it ({ text, w })
//   c4p143_pill    p145: a label in a box ({ text, tone: grey|pink })
//   c4p143_clocks  p149: clocks with the angle between the hands marked ({ items: [{ h, m, label }], size })
//   c4p143_grid    squared paper ({ cols, rows, s, over? (lines run past the edge, the book's graph paper), c? })
//   c4p143_map     the road map of p150 and the views of it (pp150–151): { w, view?: [x,y,w,h], marks?, labels?: [[t, x, y]], cap? };
//                  c4p143_maps { maps: [...], justify? } several side by side. Clipped to the view by geometry (the build measures)
//   c4p143_rail    p152: a railway track, two rails on sleepers ({ w })
//   c4p143_steps   p155: setting the set squares, step by step, for a perpendicular and for a parallel line
const path = require("path");
const INK = "#1E2433", RED = "#DC2626";
const f2 = (x) => Math.round(x * 100) / 100;
const rad = (d) => (d * Math.PI) / 180;
const P = (v, a, r) => [v[0] + r * Math.cos(rad(a)), v[1] - r * Math.sin(rad(a))];
const xy = (p) => `${f2(p[0])} ${f2(p[1])}`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const BN = "০১২৩৪৫৬৭৮৯", bnd = (s) => String(s).replace(/\d/g, (d) => BN[d]);
const SHARED = require(path.join(__dirname, "..", "lib", "c4-shared.parts.js"));

// ── the pieces of a drawing ──
const line = (a, b, { c = INK, sw = 0.5, dash, cap = "round" } = {}) =>
  `<path d="M${xy(a)}L${xy(b)}" stroke="${c}" stroke-width="${sw}" stroke-linecap="${cap}"${dash ? ` stroke-dasharray="${dash}"` : ""} fill="none"/>`;
function arcD(v, r, a1, a2) {
  let d = a2 - a1; while (d < 0) d += 360; while (d > 360) d -= 360;
  const p1 = P(v, a1, r), p2 = P(v, a1 + d, r);
  if (d >= 359.99) { const pm = P(v, a1 + 180, r); return `M${xy(p1)}A${r} ${r} 0 1 0 ${xy(pm)}A${r} ${r} 0 1 0 ${xy(p1)}`; }
  return `M${xy(p1)}A${f2(r)} ${f2(r)} 0 ${d > 180 ? 1 : 0} 0 ${xy(p2)}`;
}
const head = (tip, dir, s = 1.6, c = RED) => { // an arrowhead at tip, pointing at angle dir
  const b1 = P(tip, dir + 180 - 24, s), b2 = P(tip, dir + 180 + 24, s);
  return `<path d="M${xy(tip)}L${xy(b1)}L${xy(b2)}Z" fill="${c}"/>`;
};
function arcSvg(v, r, a1, a2, { c = RED, sw = 0.4, fill, arrow } = {}) {
  let g = "";
  if (fill) g += `<path d="M${xy(v)}L${arcD(v, r, a1, a2).slice(1)}Z" fill="${fill}"/>`;
  g += `<path d="${arcD(v, r, a1, a2)}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`;
  if (arrow) g += head(P(v, a2, r), a2 + 90, Math.max(1.3, sw * 3.4), c);
  return g;
}
const rmark = (v, a1, a2, s = 2.4, c = INK, sw = 0.35) => { const p1 = P(v, a1, s), p2 = P(v, a2, s), q = [p1[0] + p2[0] - v[0], p1[1] + p2[1] - v[1]];
  return `<path d="M${xy(p1)}L${xy(q)}L${xy(p2)}" fill="none" stroke="${c}" stroke-width="${sw}"/>`; };
const text = (s, [x, y], { fs = 4, anchor = "middle", c = INK, w = 600, base = "middle", font = "Noto Sans Bengali" } = {}) =>
  `<text x="${f2(x)}" y="${f2(y)}" text-anchor="${anchor}" dominant-baseline="${base === "middle" ? "central" : "alphabetic"}" font-family="${font}" font-weight="${w}" font-size="${f2(fs)}" fill="${c}">${esc(s)}</text>`;

// the protractor of lib/c4-shared.parts.js, placed with its centre at [cx, cy]
function protSvg({ prot: [cx, cy], ...o }, ctx) {
  const html = SHARED.kinds.c4_protractor({ r: 30, ...o, arms: null }, ctx);
  const m = html.match(/viewBox="0 0 ([\d.]+) ([\d.]+)">([\s\S]*)<\/svg>/);
  const W = +m[1], H = +m[2], pcx = W / 2, pcy = H - 6, r = o.r || 30;
  // the scale's numbers: a little smaller than the shared kind's (theirs touch on a protractor under 45 mm), and only every
  // step° on a small one (r < 20 mm), where every 10° would run together
  const fk = o.fk ?? (r < 20 ? 1 : 0.8), step = o.step ?? (r < 20 ? 30 : 10);
  let i = 0;
  const inner = m[3].replace(/<text ([^>]*)font-size="([\d.]+)"([^>]*)>(\d+)<\/text>/g, (t, a, fs, b, n) => {
    const d = Math.floor(i++ / 2) * 10;
    return d % step ? "" : `<text ${a}font-size="${f2(fs * fk)}"${b}>${n}</text>`;
  });
  return `<svg x="${f2(cx - pcx)}" y="${f2(cy - pcy)}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" overflow="visible">${inner}</svg>`;
}

// a set square: the right angle at v, leg 1 at angle a, leg 2 at a + 90 (or a − 90), a hole in the middle, a ruler on one edge
function setSquare({ sq: v, a = 0, legs: [L1, L2], flip, fill = "#7FB2E0", c = "#2563A8", hole = true, holeC = "#22A34A", ruler, sw = 0.35 }) {
  const b = flip ? a - 90 : a + 90, A = P(v, a, L1), B = P(v, b, L2), T = [v, A, B];
  let g = `<path d="M${xy(v)}L${xy(A)}L${xy(B)}Z" fill="${fill}" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  if (hole) { // the cut-out: the triangle shrunk towards its incentre
    const la = Math.hypot(A[0] - B[0], A[1] - B[1]), per = la + L1 + L2, I = [(la * v[0] + L2 * A[0] + L1 * B[0]) / per, (la * v[1] + L2 * A[1] + L1 * B[1]) / per];
    const k = typeof hole === "number" ? hole : 0.42, H = T.map((p) => [I[0] + (p[0] - I[0]) * k, I[1] + (p[1] - I[1]) * k]);
    g += `<path d="M${H.map(xy).join("L")}Z" fill="#fff" stroke="${holeC}" stroke-width="${f2(Math.max(0.5, Math.min(L1, L2) * 0.025))}" stroke-linejoin="round"/>`;
  }
  if (ruler) { // ticks along an edge, inside, numbered (the book prints English digits on its set squares)
    const { edge = 1, unit = 4.8, from = 0, to = 17, rev, sub = 10, start = 1.2, fs = 2, skip0 } = ruler;
    const [p0, p1] = edge === 1 ? [v, A] : edge === 2 ? [v, B] : rev ? [B, A] : [A, B];
    const len = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), ux = (p1[0] - p0[0]) / len, uy = (p1[1] - p0[1]) / len;
    const cen = [(v[0] + A[0] + B[0]) / 3, (v[1] + A[1] + B[1]) / 3];
    let nx = -uy, ny = ux; if ((cen[0] - p0[0]) * nx + (cen[1] - p0[1]) * ny < 0) { nx = -nx; ny = -ny; } // inward
    const n = (to - from) * sub, step = unit / sub, rot = (Math.atan2(uy, ux) * 180) / Math.PI;
    for (let i = 0; i <= n; i++) {
      const d = start + i * step; if (d > len - 0.6) break;
      const L = i % sub === 0 ? 2.2 : i % (sub / 2) === 0 ? 1.5 : 0.9, q = [p0[0] + ux * d, p0[1] + uy * d];
      g += `<path d="M${xy(q)}L${f2(q[0] + nx * L)} ${f2(q[1] + ny * L)}" stroke="#fff" stroke-width="${i % sub ? 0.12 : 0.22}"/>`;
      if (i % sub === 0 && !(skip0 && i === 0)) { const t = [q[0] + nx * 3.6, q[1] + ny * 3.6];
        g += `<text x="${f2(t[0])}" y="${f2(t[1])}" transform="rotate(${f2(Math.abs(rot) > 90 ? rot + 180 : rot)} ${f2(t[0])} ${f2(t[1])})" text-anchor="middle" dominant-baseline="central" font-family="Nunito, sans-serif" font-weight="700" font-size="${fs}" fill="#fff">${from + i / sub}</text>`; }
    }
  }
  return g;
}

// a pencil with its tip at t, pointing at angle a
function pencilSvg({ pencil: t, a = -60, len = 16, wd = 2.4 }) {
  const back = a + 180, tipL = wd * 1.5, B = P(t, back, tipL), E = P(t, back, len), n = (p, s) => P(p, a + 90, s);
  const wood = [n(B, wd / 2), n(B, -wd / 2)], body = [n(B, wd / 2), n(E, wd / 2), n(E, -wd / 2), n(B, -wd / 2)];
  const G = P(t, back, len - 2.6), er = [n(G, wd / 2), n(E, wd / 2), n(E, -wd / 2), n(G, -wd / 2)], lead = P(t, back, tipL * 0.35);
  return `<path d="M${xy(t)}L${xy(wood[0])}L${xy(wood[1])}Z" fill="#F5D7A1" stroke="#7C5A2A" stroke-width=".25" stroke-linejoin="round"/>`
    + `<path d="M${xy(t)}L${xy(n(lead, wd * 0.17))}L${xy(n(lead, -wd * 0.17))}Z" fill="#334155"/>`
    + `<path d="M${body.map(xy).join("L")}Z" fill="#FACC15" stroke="#A16207" stroke-width=".25" stroke-linejoin="round"/>`
    + `<path d="M${er.map(xy).join("L")}Z" fill="#F9A8D4" stroke="#BE185D" stroke-width=".25"/>`
    + line(n(G, wd / 2), n(G, -wd / 2), { c: "#94A3B8", sw: 0.5, cap: "butt" });
}

function imgSvg({ img, at: [x, y], w, h, emoji = "✋", flip, rot = 0 }, ctx) {
  const src = ctx.sticker(img), cx = x + w / 2, cy = y + h / 2;
  const tr = `${rot ? `rotate(${-rot} ${f2(cx)} ${f2(cy)}) ` : ""}${flip ? `translate(${f2(2 * cx)} 0) scale(-1 1)` : ""}`.trim();
  const inner = src ? `<image href="${src}" x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="${f2(cx)}" y="${f2(cy)}" text-anchor="middle" dominant-baseline="central" font-family="Noto Color Emoji" font-size="${f2(Math.min(w, h) * 0.85)}">${emoji}</text>`;
  return tr ? `<g transform="${tr}">${inner}</g>` : inner;
}

function itemSvg(it, ctx) {
  if (it.seg) return line(it.seg[0], it.seg[1], it);
  if (it.ray) return line(it.from ? P(it.ray, it.a, it.from) : it.ray, P(it.ray, it.a, it.len), it);
  if (it.angle) {
    const v = it.angle, [a1, a2] = it.a, L = Array.isArray(it.len) ? it.len : [it.len, it.len], sw = it.sw ?? 0.5, c = it.c || INK;
    let g = "";
    const r = it.arc;
    if (r && it.fill) g += arcSvg(v, r, a1, a2, { c: it.ac || RED, sw: it.asw ?? 0.35, fill: it.fill });
    g += line(v, P(v, a1, L[0]), { c: it.c1 || c, sw }) + line(v, P(v, a2, L[1]), { c: it.c2 || c, sw });
    if (r && !it.fill) g += arcSvg(v, r, a1, a2, { c: it.ac || RED, sw: it.asw ?? 0.35, arrow: it.arrow });
    if (it.right) g += rmark(v, a1, a2, it.right, it.rc || c, 0.35);
    if (it.label) { const la = it.la ?? (a1 + (((a2 - a1) % 360) + 360) % 360 / 2); g += text(it.label, P(v, la, it.lr ?? (r || 4) + 4), { fs: it.fs || 3.8, c: it.lc || INK, w: 700 }); }
    return g;
  }
  if (it.arc) return arcSvg(it.arc, it.r, it.a[0], it.a[1], { c: it.c || RED, sw: it.sw ?? 0.4, fill: it.fill, arrow: it.arrow });
  if (it.rm) return rmark(it.rm, it.a[0], it.a[1], it.s ?? 2.4, it.c || INK, it.sw ?? 0.35);
  if (it.t != null) return text(it.t, it.at, it);
  if (it.dot) return `<circle cx="${f2(it.dot[0])}" cy="${f2(it.dot[1])}" r="${it.r ?? 0.7}" fill="${it.c || INK}"${it.ring ? ` stroke="#fff" stroke-width="${it.ring}"` : ""}/>`;
  if (it.rect) { const [x, y, w, h] = it.rect; return `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" rx="${it.rx ?? 0}" fill="${it.fill || "none"}" stroke="${it.c || INK}" stroke-width="${it.sw ?? 0.4}"${it.dash ? ` stroke-dasharray="${it.dash}"` : ""}/>`; }
  if (it.poly) return `<path d="M${it.poly.map(xy).join("L")}${it.open ? "" : "Z"}" fill="${it.fill || "none"}" stroke="${it.c || INK}" stroke-width="${it.sw ?? 0.4}" stroke-linejoin="round" stroke-linecap="round"/>`;
  if (it.box) { const [x, y, w, h] = it.box; return `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" rx="1" fill="#fff" stroke="#2563EB" stroke-width=".45"/>${it.deg ? text("°", [x + w + 1.2, y + 0.8], { fs: 4, w: 700 }) : ""}`; }
  if (it.rbox) { const [x, y] = it.at; return `<rect x="${f2(x - 2.4)}" y="${f2(y - 2.4)}" width="4.8" height="4.8" fill="#fff" stroke="${RED}" stroke-width=".4"/>${text(it.rbox, [x, y + 0.1], { fs: 3.6, c: RED, w: 700 })}`; }
  if (it.cnum) { const [x, y] = it.at, r = it.r ?? 3.4; return `<circle cx="${f2(x)}" cy="${f2(y)}" r="${r}" fill="#fff" stroke="${INK}" stroke-width=".4"/>${text(it.cnum, [x, y + 0.1], { fs: r * 1.15, w: 700 })}`; }
  if (it.arrow) { const [a, b] = it.arrow, dir = (Math.atan2(a[1] - b[1], b[0] - a[0]) * 180) / Math.PI, hs = it.head ?? 2.2;
    return line(a, P(b, dir + 180, hs * 0.6), { c: it.c || RED, sw: it.sw ?? 0.7 }) + head(b, dir, hs, it.c || RED); }
  if (it.prot) return protSvg(it, ctx);
  if (it.sq) return setSquare(it);
  if (it.img) return imgSvg(it, ctx);
  if (it.pencil) return pencilSvg(it);
  if (it.svg) return it.svg;
  throw new Error("c4p143_fig: unknown item " + JSON.stringify(it).slice(0, 80));
}
const figSvg = (f, ctx) => `<svg class="c4p143-svg" width="${f2(f.w * (f.k || 1))}mm" height="${f2(f.h * (f.k || 1))}mm" viewBox="0 0 ${f.w} ${f.h}">${f.items.map((it) => itemSvg(it, ctx)).join("")}</svg>`;
const figure = (f, ctx) => `<figure class="c4p143-fig"${f.mt ? ` style="margin-top:${f.mt}mm"` : ""}>${figSvg(f, ctx)}${f.cap ? `<figcaption>${ctx.md(f.cap)}</figcaption>` : ""}</figure>`;

// ∠ drawn: the book's angle sign (two strokes), the size of the text around it
const ANGLE = `<svg class="c4p143-ang" viewBox="0 0 10 10"><path d="M9 1.2L1.4 8.8H9.6" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="miter"/></svg>`;
const fixAng = (html) => String(html).replace(/∠/g, ANGLE);

// ── p143: the things with corners ──
function tableSvg() { // a wooden table seen from the front and a little above
  const top = "#D9A066", side = "#B97A3C", leg = "#C98A4B", k = "#7C4A1E";
  return `<svg class="c4p143-svg" width="26mm" height="20mm" viewBox="0 0 26 20">
    <path d="M3 5.5L8 2H25L20 5.5Z" fill="${top}" stroke="${k}" stroke-width=".3" stroke-linejoin="round"/>
    <path d="M3 5.5H20V7.4H3Z" fill="${side}" stroke="${k}" stroke-width=".3"/><path d="M20 5.5L25 2V3.9L20 7.4Z" fill="#A66A2F" stroke="${k}" stroke-width=".3"/>
    <rect x="3.6" y="7.4" width="1.6" height="11.6" fill="${leg}" stroke="${k}" stroke-width=".3"/><rect x="17.8" y="7.4" width="1.6" height="11.6" fill="${leg}" stroke="${k}" stroke-width=".3"/>
    <rect x="22.6" y="3.9" width="1.4" height="11.8" fill="${side}" stroke="${k}" stroke-width=".3"/></svg>`;
}
function windowSvg() { // a wooden window with two casements of six panes
  let g = `<rect x="1" y="1" width="22" height="18" fill="#C98A4B" stroke="#7C4A1E" stroke-width=".35"/>`;
  for (const x0 of [2.4, 12.6]) {
    g += `<rect x="${x0}" y="2.4" width="9" height="15.2" fill="#E2B27A" stroke="#7C4A1E" stroke-width=".3"/>`;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) g += `<rect x="${f2(x0 + 0.9 + c * 3.9)}" y="${f2(3.3 + r * 4.75)}" width="3.3" height="4.1" fill="#DBEFFB" stroke="#7C4A1E" stroke-width=".25"/>`;
  }
  return `<svg class="c4p143-svg" width="22mm" height="18mm" viewBox="0 0 24 20">${g}</svg>`;
}
function thingsHtml(b, ctx, page) {
  const img = (n, w, h) => { const s = ctx.sticker(n); return s ? `<img class="c4p143-st" src="${s}" style="width:${w}mm;height:${h}mm">` : `<span class="c4p143-st" style="font-size:${h * 2}pt">🏠</span>`; };
  return `<div class="c4p143-things">
    <div class="c4p143-tc">${ctx.clockHtml({ h: 10, m: 10, size: 31, bangla: true })}</div>
    <div class="c4p143-tc c4p143-four"><span>${tableSvg()}</span><span>${windowSvg()}</span><span>${img("house", 24, 17)}</span><span>${ctx.blockHtml({ kind: "c4p067_books", h: 15 }, page)}</span></div>
    <div class="c4p143-tc">${img("rickshaw", 46, 36)}</div></div>`;
}

// ── p143–144: the square paper (yellow, a cut from its centre to the right edge) and the round one (blue, a cut from its
//    centre to the left edge), slotted together and turned: d° of the round paper shows above the cut ──
const YEL = "#FDE047", YK = "#A16207", BLU = "#93D5F5", BK = "#0369A1";
function paperSvg({ s = 22, d = null, mode = "turned", arrow = true }) {
  // mode: "square" (the square alone), "apart" (square, circle beside it), "joined" (the circle slid half into the slot), "turned"
  const h = s / 2, r = h * 1.02;
  if (mode === "apart") {
    const W = 2 * s + 6, c2 = [s + 6 + r, h];
    return `<svg class="c4p143-svg" width="${W}mm" height="${s}mm" viewBox="0 0 ${W} ${s}"><rect x="0" y="0" width="${s}" height="${s}" fill="${YEL}" stroke="${YK}" stroke-width=".35"/>${line([h, h], [s, h], { sw: 0.4 })}
      <circle cx="${c2[0]}" cy="${h}" r="${r}" fill="${BLU}" stroke="${BK}" stroke-width=".35"/>${line([c2[0] - r, h], c2, { c: "#fff", sw: 0.5 })}</svg>`;
  }
  if (mode === "joined") { // the circle's cut slides along the square's: above the cuts the circle is in front, below them the square
    const ox = s * 0.62, c2 = [h + ox, h], W = c2[0] + r + 0.5;
    return `<svg class="c4p143-svg" width="${f2(W)}mm" height="${s}mm" viewBox="0 0 ${f2(W)} ${s}">
      <circle cx="${c2[0]}" cy="${h}" r="${r}" fill="${BLU}" stroke="${BK}" stroke-width=".35"/>
      <rect x="0" y="0" width="${s}" height="${s}" fill="${YEL}" stroke="${YK}" stroke-width=".35"/>
      <path d="M${xy(P(c2, 180, r))}A${r} ${r} 0 0 1 ${xy(P(c2, 0, r))}Z" fill="${BLU}" stroke="${BK}" stroke-width=".35"/>
      ${line([h, h], P(c2, 180, r), { sw: 0.4 })}${line(P(c2, 180, r), c2, { c: "#fff", sw: 0.5 })}</svg>`;
  }
  // turned (or the square alone): the circle behind the square, d° of it showing in front, above the square's cut
  let g = `<rect x="0" y="0" width="${s}" height="${s}" fill="${YEL}" stroke="${YK}" stroke-width=".35"/>`;
  const v = [h, h];
  if (mode === "square" || !d) g += line(v, [s, h], { sw: 0.45 }) + `<circle cx="${h}" cy="${h}" r=".55" fill="${INK}"/>`;
  else {
    const rr = r * 0.97;
    g += `<path d="M${xy(v)}L${arcD(v, rr, 0, d).slice(1)}Z" fill="${BLU}" stroke="${BK}" stroke-width=".35" stroke-linejoin="round"/>`;
    if (arrow) g += arcSvg(v, rr * 0.55, 6, d - 6, { c: RED, sw: 0.5, arrow: true });
    g += `<circle cx="${h}" cy="${h}" r=".55" fill="${INK}"/>`;
  }
  return `<svg class="c4p143-svg" width="${s}mm" height="${s}mm" viewBox="0 0 ${s} ${s}">${g}</svg>`;
}
const BIGARROW = `<svg class="c4p143-svg" width="9mm" height="7mm" viewBox="0 0 9 7"><path d="M0 2.2H5V0L9 3.5L5 7V4.8H0Z" fill="#334155"/></svg>`;

// ── p149: clocks with the angle between the hands ──
function clocksHtml(b, ctx) {
  return `<div class="c4p143-clocks">${b.items.map(({ h, m, label }) => {
    let svg = ctx.clockHtml({ h, m, size: b.size || 27 });
    const ha = (h % 12) * 30 + m * 0.5, ma = m * 6; // clockwise from 12
    let a1 = Math.min(ha, ma), a2 = Math.max(ha, ma); if (a2 - a1 > 180) [a1, a2] = [a2, a1 + 360];
    const pt = (a, r) => [50 + Math.sin(rad(a)) * r, 50 - Math.cos(rad(a)) * r], R = 11;
    const arc = `<path d="M${xy(pt(a1, R))}A${R} ${R} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${xy(pt(a2, R))}" fill="none" stroke="#06B6D4" stroke-width="2"/>`;
    svg = svg.replace(`<line x1="50" y1="50"`, `${arc}<line x1="50" y1="50"`);
    return `<div class="c4p143-ck"><b>${ctx.esc(label)}</b>${svg}</div>`;
  }).join("")}</div>`;
}

// ── squared paper ──
function gridSvg({ cols = 12, rows = 12, s = 6, over = 0, c = "#94A3B8", fill = "#fff" }) {
  const W = cols * s + 2 * over, H = rows * s + 2 * over;
  let g = `<rect x="${over}" y="${over}" width="${cols * s}" height="${rows * s}" fill="${fill}"/>`;
  for (let i = 0; i <= cols; i++) g += line([over + i * s, 0], [over + i * s, H], { c, sw: 0.25, cap: "butt" });
  for (let j = 0; j <= rows; j++) g += line([0, over + j * s], [W, over + j * s], { c, sw: 0.25, cap: "butt" });
  if (!over) g += `<rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#64748B" stroke-width=".4"/>`;
  return `<svg class="c4p143-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${g}</svg>`;
}

// ── pp150–152: the road map (154 × 102 map units, taken from the book's map), drawn: the roads meet at the book's angles ──
const MAP = {
  W: 154, H: 102,
  roads: [
    [[11, 33.3], [151, 33.3]], [[11, 55.6], [151, 55.6]], // ঙ, চ
    [[24, 9.5], [24, 102]], [[43.5, 9.5], [43.5, 95]], // জ, ঝ–ছ
    [[65.5, 9.5], [84.6, 96.5]], [[89, 9.5], [107.3, 74]], // ঞ–ঢ, ট (ends at the ড road)
    [[124, 9.5], [124, 55.6]], [[142, 69.8], [43.5, 81.6]], // ঠ (ends at চ), ড (ends at ঝ)
    [[61, 55.6], [61, 102]], [[128.6, 55.6], [125, 102]], // the roads down from খ and from ঘ
  ],
  icons: [["hospital", 128, 19.2, 21, 13], ["tree", 26.5, 41.8, 11, 13], ["house", 51.5, 42.4, 18, 12.6], ["playground", 75.5, 41, 20, 14],
    ["school", 108.5, 59.6, 13, 11.6], ["tree", 86, 78, 15, 17]],
  emoji: { hospital: "🏥", tree: "🌳", house: "🏠", playground: "🛝", school: "🏫" },
  boxes: [["জ", 24, 8.6], ["ঝ", 43.5, 8.6], ["ঞ", 65.5, 8.6], ["ট", 89, 8.6], ["ঠ", 124.5, 8.6], ["ঙ", 7.3, 33.5], ["চ", 7.3, 55.6],
    ["ক", 105.3, 31.3], ["গ", 28.6, 59.5], ["খ", 63, 60.5], ["ঘ", 129.2, 59.7], ["ড", 145, 70.3]],
  bottom: [["ছ", 43.5, 98.6], ["ঢ", 84.4, 99.4]],
  rings: [[95.3, 33.3], [61, 55.4], [24, 55.6], [124, 55.4]],
};
// Everything is clipped to the view by its geometry (a road cut where it leaves the view, a picture partly in it shown through a
// pattern, a box or ring only when it is wholly in it), so no part of the drawing lies outside the view: the build measures it.
function clipSeg([a, b], [vx, vy, vw, vh]) { // Liang–Barsky
  let t0 = 0, t1 = 1; const dx = b[0] - a[0], dy = b[1] - a[1];
  for (const [p, q] of [[-dx, a[0] - vx], [dx, vx + vw - a[0]], [-dy, a[1] - vy], [dy, vy + vh - a[1]]]) {
    if (p === 0) { if (q < 0) return null; continue; }
    const r = q / p; if (p < 0) { if (r > t1) return null; if (r > t0) t0 = r; } else { if (r < t0) return null; if (r < t1) t1 = r; }
  }
  return [[a[0] + t0 * dx, a[1] + t0 * dy], [a[0] + t1 * dx, a[1] + t1 * dy]];
}
let PID = 0;
function iconIn(n, [x, y, w, h], [vx, vy, vw, vh], ctx) {
  const x0 = Math.max(x, vx), y0 = Math.max(y, vy), x1 = Math.min(x + w, vx + vw), y1 = Math.min(y + h, vy + vh);
  if (x1 - x0 < 0.3 || y1 - y0 < 0.3) return "";
  const pic = (at) => imgSvg({ img: n, at, w, h, emoji: MAP.emoji[n] }, ctx);
  if (x0 === x && y0 === y && x1 === x + w && y1 === y + h) return pic([x, y]);
  const id = `c4p143-pat${++PID}`;
  return `<defs><pattern id="${id}" patternUnits="userSpaceOnUse" x="${x}" y="${y}" width="${w}" height="${h}">${pic([0, 0])}</pattern></defs><rect x="${f2(x0)}" y="${f2(y0)}" width="${f2(x1 - x0)}" height="${f2(y1 - y0)}" fill="url(#${id})"/>`;
}
function mapInner(ctx, { marks = true, view = [0, 0, MAP.W, MAP.H] } = {}) {
  const [vx, vy, vw, vh] = view, inV = (x0, y0, x1, y1) => x0 >= vx && y0 >= vy && x1 <= vx + vw && y1 <= vy + vh;
  const R = MAP.roads.map((r) => clipSeg(r, view)).filter(Boolean);
  let g = `<rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="#D6E9EF"/>`;
  g += R.map(([a, b]) => line(a, b, { c: "#5B6B7A", sw: 2.7, cap: "butt" })).join("") + R.map(([a, b]) => line(a, b, { c: "#fff", sw: 1.95, cap: "butt" })).join("");
  for (const [n, x, y, w, h] of MAP.icons) g += iconIn(n, [x, y, w, h], view, ctx);
  if (marks) {
    for (const [t, x, y] of MAP.boxes) if (inV(x - 3.4, y - 2.4, x + 3.4, y + 2.4)) g += `<rect x="${f2(x - 3.4)}" y="${f2(y - 2.4)}" width="6.8" height="4.8" fill="#fff" stroke="${INK}" stroke-width=".35"/>${text(t, [x, y + 0.15], { fs: 3.4, w: 700 })}`;
    for (const [t, x, y] of MAP.bottom) if (inV(x - 2, y - 2, x + 2, y + 2)) g += text(t, [x, y], { fs: 3.4, w: 700 });
    for (const [x, y] of MAP.rings) if (inV(x - 3.9, y - 3.9, x + 3.9, y + 3.9)) g += `<circle cx="${x}" cy="${y}" r="3.7" fill="none" stroke="${INK}" stroke-width=".45"/>`;
  }
  return g;
}
function mapHtml(b, ctx) {
  const [vx, vy, vw, vh] = b.view || [0, 0, MAP.W, MAP.H], w = b.w || 135, k = w / vw, h = vh * k;
  if (!b.labels) return `<figure class="c4p143-fig c4p143-mapf"><svg class="c4p143-svg c4p143-map" style="overflow:hidden" width="${f2(w)}mm" height="${f2(h)}mm" viewBox="${vx} ${vy} ${vw} ${vh}">${mapInner(ctx, { ...b, view: [vx, vy, vw, vh] })}</svg>${b.cap ? `<figcaption>${ctx.md(b.cap)}</figcaption>` : ""}</figure>`;
  const m = b.m || 7, W = w + 2 * m, H = h + 2 * m; // the labels round the outside of the view (p151's চিত্র-১ and চিত্র-২)
  const lab = b.labels.map(([t, x, y]) => text(t, [m + (x - vx) * k, m + (y - vy) * k], { fs: 4, w: 700 })).join("");
  return `<figure class="c4p143-fig"><svg class="c4p143-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}"><svg x="${m}" y="${m}" width="${f2(w)}" height="${f2(h)}" viewBox="${vx} ${vy} ${vw} ${vh}">${mapInner(ctx, { marks: false, view: [vx, vy, vw, vh] })}</svg>${lab}</svg>${b.cap ? `<figcaption>${ctx.md(b.cap)}</figcaption>` : ""}</figure>`;
}

// ── p152: a railway track ──
function railSvg({ w = 40 }) {
  const H = w * 0.5;
  let g = `<path d="M1 3Q4 1 9 2.4T19 1.6T30 2.6T39 2Q40 8 39.2 10T39.6 18Q34 19.6 28 18.4T16 19.2T4 18.6Q.4 18 1.2 13T1 3Z" fill="#9CA3AF"/>`;
  for (let i = 0; i < 5; i++) g += `<rect x="${f2(4.2 + i * 7)}" y="1.4" width="3.6" height="17.4" fill="#F59E0B" stroke="#7C2D12" stroke-width=".35"/>`;
  for (const y of [5, 13.4]) g += `<rect x="1.6" y="${y}" width="37" height="1.9" fill="#4B5563" stroke="#1F2937" stroke-width=".3"/><rect x="1.6" y="${y}" width="37" height=".5" fill="#D1D5DB"/>`;
  return `<svg class="c4p143-svg" width="${w}mm" height="${f2(H)}mm" viewBox="0 0 40 20">${g}</svg>`;
}

// ── p155: the set squares step by step (A: 30°–60°, B: 45°), drawn; a hand on them is a sticker ──
const SQA = { fill: "#9DB4D6", c: "#3B5B8C", hole: false }, SQB = { fill: "#B8C9E4", c: "#3B5B8C", hole: false };
const hand = (x, y, w = 13, flip = false, rot = 0) => ({ img: "hand-press", at: [x, y], w, h: w, emoji: "✋", flip, rot });
function stepsHtml(b, ctx) {
  const W = 52, K = (items, h) => figSvg({ w: W, h, items, k: 1.2 }, ctx); // drawn at 1.2× (the book's steps are as big)
  const card = (items) => `<div class="c4p143-card">${figSvg({ w: 38, h: 20, items, k: 1.2 }, ctx)}</div>`;
  const row = (n, body) => `<div class="c4p143-srow"><span class="c4p143-rb">${ctx.esc(n)}</span>${body}</div>`;
  const ln = (y, x1 = 6, x2 = 46) => ({ seg: [[x1, y], [x2, y]], sw: 0.55 });
  // the perpendicular: set square A (30°–60°) under the line, its long edge (24 mm) on it from x1; set square B (45°) on the
  // line, its right angle at x0, its upright edge rising from the line: the new line is drawn along that edge
  const sqA = (y, x1 = 8) => ({ sq: P([x1, y], -30, 24 * Math.cos(rad(30))), a: 150, legs: [24 * Math.cos(rad(30)), 12], flip: true, ...SQA });
  const x0 = 30, sqB = (y) => ({ sq: [x0, y], a: 90, legs: [14, 14], ...SQB });
  const left = [
    row("১", K([ln(5)], 10)),
    row("২", K([sqA(4, 10), ln(4)], 18)),
    row("৩", K([sqA(18, 18), sqB(18), ln(18), hand(9, 13, 15, false, 15)], 32)),
    row("৪", K([sqA(25, 18), sqB(25), ln(25), { seg: [[x0, 25], [x0, 9]], sw: 0.6 }, { pencil: [x0, 9], a: -118, len: 9.5, wd: 2.2 }, hand(9, 20, 15, false, 15)], 39)),
    row("৫", card([ln(16, 3, 35), { seg: [[19, 16], [19, 3]], sw: 0.55 }, { rm: [19, 16], a: [0, 90], s: 2 }])),
  ];
  // the parallel: set square A's long edge on the line (its right angle on the left), set square B against A's short edge;
  // A slides down along B, and the new line is drawn along A's long edge
  const xa = 20, sqA2 = (y) => ({ sq: [xa, y], a: 0, legs: [22, 12.7], flip: true, ...SQA }), sqB2 = (y) => ({ sq: [xa, y], a: 90, legs: [20, 11], ...SQB });
  const down = (y) => ({ arrow: [[xa + 7, y], [xa + 7, y + 7]], c: "#B91C1C", sw: 1.1, head: 2.6 });
  const right = [
    row("১", K([ln(5, xa, 46)], 10)),
    row("২", K([sqA2(4), ln(4, xa, 47)], 18)),
    row("৩", K([sqB2(25), sqA2(5), ln(5, xa, 47), down(8), hand(4, 11, 13, false, 15), hand(32, 0, 12, true, -10)], 28)),
    row("৪", K([ln(5, xa, 47), sqB2(25), sqA2(12), down(13.5), hand(4, 12, 13, false, 15), hand(32, 13, 12, true, -10)], 28)),
    row("৫", K([ln(5, xa, 44), sqB2(25), sqA2(12), ln(12, xa, 44), { pencil: [44, 12], a: -62, len: 12 }, hand(7, 13, 13, false, 15)], 28)),
    row("৬", card([ln(6, 4, 34), ln(14, 4, 34)])),
  ];
  return `<div class="c4p143-steps"><div class="c4p143-scol">${left.join("")}</div><i class="c4p143-sdiv"></i><div class="c4p143-scol">${right.join("")}</div></div>`;
}

module.exports = {
  kinds: {
    c4p143_fig: (b, ctx) => `<div class="c4p143-figs" style="gap:${b.gap ?? 4}mm;justify-content:${b.justify || "space-around"};align-items:${b.align || "flex-end"}">${(b.figs || [b]).map((f) => figure(f, ctx)).join("")}</div>`,
    c4p143_x: (b, ctx, page) => fixAng((Array.isArray(b.b) ? b.b : [b.b]).map((x) => ctx.blockHtml(x, page)).join("")),
    c4p143_things: thingsHtml,
    c4p143_papers: (b) => `<div class="c4p143-papers">${paperSvg({ s: b.s || 22, mode: "apart" })}${BIGARROW}${paperSvg({ s: b.s || 22, mode: "joined" })}${BIGARROW}${paperSvg({ s: b.s || 22, d: 30, arrow: false })}</div>`,
    c4p143_turns: (b, ctx) => {
      const s = b.s || 24, L = 17;
      return `<div class="c4p143-turns">${b.degs.map((d, i) => {
        const lines = { w: 30, h: 22, items: [{ dot: [7, 19], r: 0.6 }, { seg: [[7, 19], [7 + L, 19]], sw: 0.55 },
          ...(d ? [{ ray: [7, 19], a: d, len: L * 0.95, c: "#1E3A8A", sw: 0.6 }, { arc: [7, 19], r: d > 60 ? 7 : 6, a: [4, d - 5], c: RED, sw: 0.4, arrow: true }] : [])] };
        return `<div class="c4p143-turn">${figSvg({ w: 8, h: 8, items: [{ cnum: bnd(i + 1), at: [4, 4], r: 3.4 }] }, ctx)}${paperSvg({ s, d: d || null, mode: d ? "turned" : "square" })}${figSvg(lines, ctx)}</div>`;
      }).join("")}</div>`;
    },
    c4p143_arrow: (b, ctx) => `<div class="c4p143-arr" style="width:${b.w || 34}mm"><span>${ctx.md(b.text)}</span></div>`,
    c4p143_pill: (b, ctx) => `<span class="c4p143-pill ${b.tone || "grey"}">${ctx.md(b.text)}</span>`,
    c4p143_clocks: clocksHtml,
    c4p143_grid: (b) => `<div class="c4p143-gridw">${gridSvg(b)}</div>`,
    c4p143_map: (b, ctx) => mapHtml(b, ctx),
    c4p143_maps: (b, ctx) => `<div class="c4p143-figs" style="gap:${b.gap ?? 3}mm;justify-content:${b.justify || "space-between"};align-items:flex-start">${b.maps.map((m) => mapHtml(m, ctx)).join("")}</div>`,
    c4p143_rail: (b) => railSvg(b),
    c4p143_steps: stepsHtml,
  },
  css: `
.c4p143-figs { display: flex; flex-wrap: nowrap } .c4p143-fig { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 1mm }
.c4p143-fig figcaption { font: 600 11.5pt 'Noto Sans Bengali'; color: ${INK} }
svg.c4p143-svg { display: block; overflow: visible }
svg.c4p143-ang { display: inline-block; width: .78em; height: .78em; vertical-align: -.04em; margin: 0 .06em 0 .02em; overflow: visible }
.c4p143-things { display: grid; grid-template-columns: 38mm 1fr 52mm; border: .6mm solid var(--c); border-radius: 3mm; background: #fff; overflow: hidden }
.c4p143-tc { display: flex; align-items: center; justify-content: center; padding: 1.6mm } .c4p143-tc + .c4p143-tc { border-left: .4mm solid var(--s) }
.c4p143-four { display: grid; grid-template-columns: 1fr 1fr; gap: 1mm 2mm; justify-items: center; align-items: center }
.c4p143-st { display: block; object-fit: contain }
.c4p143-papers, .c4p143-turns { display: flex; align-items: center; justify-content: space-around; background: #fff; border: .6mm solid var(--c); border-radius: 3mm; padding: 2.4mm 3mm }
.c4p143-turns { align-items: flex-start; border: 0; background: none; padding: 0 }
.c4p143-turn { display: flex; flex-direction: column; align-items: center; gap: 1.4mm }
.c4p143-arr { position: relative; display: flex; align-items: center; height: 15mm; padding: 0 9mm 0 3mm; background: #FDBA9A; color: #7C2D12;
  font: 700 12pt/1.1 'Noto Sans Bengali'; clip-path: polygon(0 20%, 70% 20%, 70% 0, 100% 50%, 70% 100%, 70% 80%, 0 80%) }
.c4p143-arr .frac { font-size: 15pt; margin-left: .35em }
.c4p143-pill { display: inline-block; padding: 1.4mm 5mm; border-radius: 2mm; font: 700 13pt 'Noto Sans Bengali'; border: .5mm solid; text-align: center }
.c4p143-pill.grey { background: #E5E7EB; border-color: #6B7280; color: #1F2937 } .c4p143-pill.pink { background: #FCE7F3; border-color: #DB2777; color: #831843 }
.c4p143-clocks { display: flex; justify-content: space-around } .c4p143-ck { display: flex; align-items: flex-start; gap: .6mm }
.c4p143-ck b { font: 700 12pt 'Noto Sans Bengali' }
.c4p143-gridw { display: flex; justify-content: center }
.c4p143-mapf svg.c4p143-map, .c4p143-fig svg svg { border-radius: 1.5mm }
.c4p143-steps { display: flex; justify-content: center; gap: 4mm } .c4p143-scol { display: flex; flex-direction: column; gap: 1.6mm; width: 72mm }
.c4p143-sdiv { width: .5mm; background: ${INK}; border-radius: .3mm }
.c4p143-srow { display: flex; align-items: center; gap: 2.4mm }
.c4p143-rb { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 5.6mm; height: 5.6mm; border: .45mm solid ${RED}; color: ${RED}; font: 700 11pt 'Noto Sans Bengali'; background: #fff }
.c4p143-card { background: #FEF9C3; border: .4mm solid #CA8A04; border-radius: 1.2mm; padding: 1mm 2mm }
`,
};
