// Printed pages 157–168's own kinds (chapter ১০ জ্যামিতি, its second half: triangles by sides and by angles, drawing
// triangles with a cardboard strip and with a protractor, rectangles and squares, the review, geometric patterns, নিজে
// করি), prefixed c4p157_. Written by a helper (23 Nov 2026).
// Every triangle, angle, side, grid and pattern is drawn by code in c4p157_geo, a drawing in mm whose items the content
// file computes (a triangle from its sides or its angles, so an equilateral one has equal sides, a right angle is 90°).
//
//   c4p157_geo    { w, h, x0?, y0?, scale?, items: [...], justify?, mt? }   an SVG drawing, coordinates in mm (y down; scale shrinks it). Items:
//     { poly: [[x,y]…], fill?, stroke?, sw?, dash?, open? }            a polygon (open: a polyline)
//     { line: [[x,y]…], stroke?, sw?, dash?, cap? }                    a line (or a broken line)
//     { ticks: [[A, B, n]…], color?, len?, sw? }                        n equal-side ticks across the middle of AB
//     { ang: [V, A, B], r?, stroke?, fill?, sw?, label?, lr?, fs?, lc? }  the inside angle at V (an arc), with a label
//     { right: [V, A, B], s?, stroke?, sw? }                            the right-angle mark at V
//     { t: "text", at: [x,y], fs?, color?, anchor?, weight?, font?, rot?, pill? }
//     { arc: [cx, cy, r, a0, a1], stroke?, sw?, dash? }                 an arc (degrees, anticlockwise from →, y up)
//     { bow: [A, B, bulge], label?, lat?, stroke?, dash? }               the book's dashed curve beside a side, with its length
//     { circle: [cx,cy,r] } { ellipse: [cx,cy,rx,ry] } { rect: [x,y,w,h], rx? }   with fill, stroke, sw
//     { grid: [x, y, cols, rows, s], stroke?, sw?, cells?: [[c, r, w, h, fill, label?]…] }   squared paper, shaded figures
//     { dots: [x, y, cols, rows, sx, sy?], r?, color? }                 dot paper
//     { prot: { r, digits… }, at: [cx, cy], ray90?, fs? }               lib's c4_protractor, its centre at `at` (fs: its digits × fs)
//     { pencil: [x, y], ang, len?, wid?, color? }                       a pencil, its tip at (x, y), lying along ang (deg, y up)
//     { strip: [x, y], ang, n?, gap?, wid?, from?, rev? }               the cardboard strip with holes ০ ১ ২ … (hole ০ at x, y)
//     { ruler: [x, y], ang, n?, cm?, wid? }                              p161's ruler (its ০ at x, y; Bangla digits)
//     { barrow: [x, y, w, h], color? }  { arrow: [A, B], color?, sw?, head? }  { carrow: [A, C, B], color?, sw? }
//     { tbox: "২", at: [x, y] }                                          the book's red-framed step number
//     { setsq: [A, B, C], fill?, hole? }                                a set square (a right triangle with a hole)
//     { piece: name, at: [cx, cy], s, color? }                          p166's pattern pieces: circle star burst plusc xc cyl cube
//     { stick: [A, B], w? }                                              a match stick (p167)
//     { chess: [x, y, n, s] }  { grille: [x, y, cols, rows, s] }  { arches: [x, y, n, w, h] }  { tritile: … }  p166–167's patterns
//     { raw: "<svg…>" }
//   c4p157_opts   { items: [{ l: "ক)", b: block | "text" }…], cols?, tpl?, gap?, indent? }   options, each a label and a figure
//   c4p157_group  { title, color, tint, body: [blocks], h? }           p163's ১ম দল / ২য় দল boxes, the name on a tab
//   c4p157_bullets { items: [text…] }                                  p164's dotted rules
//   c4p157_fill   { text }                                             "কার্পেট, ----": words, then a dashed line to the end
//   c4p157_line   { text, size?, indent?, center? }                    a line of text at a set size (captions under drawings)
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const xy = (p) => `${f2(p[0])} ${f2(p[1])}`;
const rad = (d) => (d * Math.PI) / 180;
const escx = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const BN = "০১২৩৪৫৬৭৮৯", bnd = (s) => String(s).replace(/\d/g, (d) => BN[d]);
// a point at distance r from p, in direction a (degrees, anticlockwise, y up)
const go = (p, a, r) => [p[0] + r * Math.cos(rad(a)), p[1] - r * Math.sin(rad(a))];
const dirOf = (V, A) => (Math.atan2(-(A[1] - V[1]), A[0] - V[0]) * 180) / Math.PI;
const attrs = (it, d = {}) => {
  const fill = it.fill ?? d.fill ?? "none", stroke = it.stroke ?? d.stroke ?? INK, sw = it.sw ?? d.sw ?? 0.45;
  return `fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${it.dash ? ` stroke-dasharray="${it.dash}"` : ""} stroke-linejoin="${it.join || "round"}" stroke-linecap="${it.cap || "round"}"`;
};
const text = (s, [x, y], o = {}) => {
  const fs = o.fs || 3.6, font = o.font || "Noto Sans Bengali", w = o.weight || 600;
  const tr = o.rot ? ` transform="rotate(${-o.rot} ${f2(x)} ${f2(y)})"` : "";
  let pill = "";
  if (o.pill) { const pw = o.pw || fs * 0.62 * [...s].length + 2.4, ph = fs * 1.45; pill = `<rect x="${f2(x - pw / 2)}" y="${f2(y - ph / 2)}" width="${f2(pw)}" height="${f2(ph)}" rx="${f2(ph / 2)}" fill="${o.pill === true ? "#fff" : o.pill}"${tr}/>`; }
  return `${pill}<text x="${f2(x)}" y="${f2(y)}" text-anchor="${o.anchor || "middle"}" dominant-baseline="central" font-family="${font}" font-weight="${w}" font-size="${f2(fs)}" fill="${o.color || INK}"${tr}>${escx(s)}</text>`;
};
const arrowHead = (B, a, head, color) => { const h1 = go(B, a + 180 - 24, head), h2 = go(B, a + 180 + 24, head); return `<path d="M${xy(B)}L${xy(h1)}L${xy(h2)}Z" fill="${color}"/>`; };

// the inside angle at V between VA and VB, as an arc (and a filled wedge if asked); its label in the middle of the angle
function angItem(it) {
  const [V, A, B] = it.ang, r = it.r || 4;
  let a1 = dirOf(V, A), a2 = dirOf(V, B), d = a2 - a1;
  while (d <= -180) d += 360; while (d > 180) d -= 360;
  const p1 = go(V, a1, r), p2 = go(V, a1 + d, r), sweep = d > 0 ? 0 : 1;
  const arc = `A${r} ${r} 0 0 ${sweep} ${xy(p2)}`;
  let g = it.fill ? `<path d="M${xy(V)}L${xy(p1)}${arc}Z" fill="${it.fill}"/>` : "";
  g += `<path d="M${xy(p1)}${arc}" fill="none" stroke="${it.stroke || INK}" stroke-width="${it.sw || 0.4}"/>`;
  if (it.label) g += text(it.label, go(V, a1 + d / 2, it.lr || r + 3), { fs: it.fs || 3.2, color: it.lc || INK, weight: 600 });
  return g;
}
function rightItem(it) {
  const [V, A, B] = it.right, s = it.s || 2.4, a = dirOf(V, A), b = dirOf(V, B);
  const p1 = go(V, a, s), p2 = go(V, b, s), q = [p1[0] + p2[0] - V[0], p1[1] + p2[1] - V[1]];
  return `<path d="M${xy(p1)}L${xy(q)}L${xy(p2)}" fill="none" stroke="${it.stroke || INK}" stroke-width="${it.sw || 0.4}"/>`;
}
function ticksItem(it) {
  const len = it.len || 2.4, gap = it.gap || 0.9;
  return it.ticks.map(([A, B, n = 1]) => {
    const m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], a = dirOf(A, B);
    let g = "";
    for (let i = 0; i < n; i++) { const c = go(m, a, (i - (n - 1) / 2) * gap); g += `<path d="M${xy(go(c, a + 90, len / 2))}L${xy(go(c, a - 90, len / 2))}" stroke="${it.color || "#DC2626"}" stroke-width="${it.sw || 0.45}" stroke-linecap="round"/>`; }
    return g;
  }).join("");
}
// the book's dashed curve beside a side AB (bulging to the side given by the sign of bulge), with the length on it
function bowItem(it) {
  const [A, B, bulge = 3] = it.bow, m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], a = dirOf(A, B), c = go(m, a + 90, bulge * 2);
  let g = `<path d="M${xy(A)}Q${xy(c)} ${xy(B)}" fill="none" stroke="${it.stroke || "#0EA5E9"}" stroke-width="${it.sw || 0.4}" stroke-dasharray="${it.dash || "1.6 1.1"}"/>`;
  if (it.label) g += text(it.label, it.lat || go(m, a + 90, bulge), { fs: it.fs || 3.2, pill: it.pill ?? "#fff", weight: 600 });
  return g;
}
function gridItem(it) {
  const [x, y, cols, rows, s] = it.grid;
  let g = `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(cols * s)}" height="${f2(rows * s)}" fill="${it.bg || "#fff"}"/>`;
  for (const [c, r, w, h, fill] of it.cells || []) g += `<rect x="${f2(x + c * s)}" y="${f2(y + r * s)}" width="${f2(w * s)}" height="${f2(h * s)}" fill="${fill}"/>`;
  let d = "";
  for (let i = 0; i <= cols; i++) d += `M${f2(x + i * s)} ${f2(y)}V${f2(y + rows * s)}`;
  for (let j = 0; j <= rows; j++) d += `M${f2(x)} ${f2(y + j * s)}H${f2(x + cols * s)}`;
  g += `<path d="${d}" stroke="${it.stroke || "#475569"}" stroke-width="${it.sw || 0.3}" fill="none"/>`;
  for (const [c, r, w, h, , label, at] of it.cells || []) if (label) {
    const p = at ? [x + at[0] * s, y + at[1] * s] : [x + (c + w / 2) * s, y + (r + h / 2) * s];
    g += `<circle cx="${f2(p[0])}" cy="${f2(p[1])}" r="${f2(s * 0.36)}" fill="#fff"/>` + text(label, [p[0], p[1] + 0.1], { fs: s * 0.5, weight: 700 });
  }
  return g;
}
function dotsItem(it) {
  const [x, y, cols, rows, sx, sy = sx] = it.dots, r = it.r || 0.42;
  let g = "";
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) g += `<circle cx="${f2(x + i * sx)}" cy="${f2(y + j * sy)}" r="${r}" fill="${it.color || "#E11D48"}"/>`;
  return g;
}
// lib's protractor, nested: its centre (W/2, H − 6 in its own box) put at `at`
function protItem(it, ctx) {
  const html = ctx.blockHtml({ kind: "c4_protractor", ...it.prot }, 0);
  const m = html.match(/<svg class="c4s-prot" width="([\d.]+)mm" height="([\d.]+)mm"/);
  if (!m) throw new Error("c4p157_geo: c4_protractor changed its output");
  const W = +m[1], H = +m[2], x = it.at[0] - W / 2, y = it.at[1] - (H - 6);
  let svg = html.slice(html.indexOf("<svg"), html.lastIndexOf("</svg>") + 6).replace(m[0], `<svg class="c4s-prot" x="${f2(x)}" y="${f2(y)}" width="${f2(W)}" height="${f2(H)}"`);
  // a small protractor's three-digit numbers crowd each other: fs shrinks its digits
  if (it.fs) svg = svg.replace(/font-size="([\d.]+)"/g, (q, v) => `font-size="${f2(v * it.fs)}"`);
  if (it.ray90) svg += `<path d="M${xy(it.at)}L${xy(go(it.at, 90, it.prot.r * 0.98))}" stroke="#DC2626" stroke-width=".4"/>`;
  return svg;
}
function pencilItem(it) {
  const [x, y] = it.pencil, a = it.ang ?? 60, L = it.len || 13, w = it.wid || 2.2, tip = w * 1.25, col = it.color || "#F59E0B";
  // drawn along +x from the tip, then turned: the tip at the origin
  const body = `<path d="M0 0L${f2(tip)} ${f2(-w / 2)}H${f2(L)}V${f2(w / 2)}H${f2(tip)}Z" fill="${col}" stroke="${INK}" stroke-width=".25" stroke-linejoin="round"/>`
    + `<path d="M0 0L${f2(tip)} ${f2(-w / 2)}V${f2(w / 2)}Z" fill="#FDE7C7" stroke="${INK}" stroke-width=".25" stroke-linejoin="round"/>`
    + `<path d="M0 0L${f2(tip * 0.38)} ${f2(-w * 0.19)}V${f2(w * 0.19)}Z" fill="${INK}"/>`
    + `<rect x="${f2(L)}" y="${f2(-w / 2)}" width="${f2(w * 0.7)}" height="${f2(w)}" fill="#F9A8D4" stroke="${INK}" stroke-width=".25"/>`;
  return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(-a)})">${body}</g>`;
}
// the cardboard strip: holes every `gap` mm along its middle, hole ০ at (x, y), digits beside them
function stripItem(it) {
  const [x, y] = it.strip, a = it.ang || 0, n = it.n || 10, gap = it.gap || 5, wid = it.wid || 6.4, from = it.from || 0, pad = it.pad || 3.2;
  const L = (n - 1) * gap + 2 * pad, side = it.rev ? -1 : 1;
  let g = `<rect x="${f2(-pad)}" y="${f2(-wid / 2)}" width="${f2(L)}" height="${f2(wid)}" rx=".6" fill="#E8C27A" stroke="#A16207" stroke-width=".3"/>`;
  for (let i = 0; i < n; i++) {
    const hx = i * gap;
    g += `<ellipse cx="${f2(hx)}" cy="${f2(-wid * 0.18 * side)}" rx=".85" ry=".65" fill="#fff" stroke="#78350F" stroke-width=".2"/>`;
    if (it.digits !== false) g += `<text x="${f2(hx)}" y="${f2(wid * 0.2 * side)}" text-anchor="middle" dominant-baseline="central" font-family="Noto Sans Bengali" font-weight="700" font-size="${f2(wid * 0.36)}" fill="${INK}"${it.rev ? ` transform="rotate(180 ${f2(hx)} ${f2(wid * 0.2 * side)})"` : ""}>${bnd(from + i)}</text>`;
  }
  return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(-a)})">${g}</g>`;
}
// p161's grey ruler: its ০ at (x, y), the cm marks every `cm` mm towards ang, Bangla digits
function rulerItem(it) {
  const [x, y] = it.ruler, a = it.ang || 0, n = it.n || 12, cm = it.cm || 5, wid = it.wid || 7, pad = 2.6;
  let g = `<rect x="${f2(-pad)}" y="${f2(-wid)}" width="${f2(n * cm + 2 * pad)}" height="${f2(wid)}" fill="#CBD5E1" stroke="#475569" stroke-width=".3"/>`;
  for (let i = 0; i <= n * 2; i++) { const hx = (i * cm) / 2, len = i % 2 ? wid * 0.22 : wid * 0.36; g += `<path d="M${f2(hx)} 0V${f2(-len)}" stroke="#334155" stroke-width=".22"/>`; }
  for (let i = 0; i <= n; i++) g += `<text x="${f2(i * cm)}" y="${f2(-wid * 0.62)}" text-anchor="middle" dominant-baseline="central" font-family="Noto Sans Bengali" font-weight="600" font-size="${f2(wid * 0.34)}" fill="${INK}">${bnd(i)}</text>`;
  return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(-a)})">${g}</g>`;
}
const barrow = ([x, y, w, h], color = "#0EA5E9") => `<path d="M${f2(x)} ${f2(y + h * 0.3)}H${f2(x + w * 0.55)}V${f2(y)}L${f2(x + w)} ${f2(y + h / 2)}L${f2(x + w * 0.55)} ${f2(y + h)}V${f2(y + h * 0.7)}H${f2(x)}Z" fill="${color}" stroke="#0369A1" stroke-width=".3" stroke-linejoin="round"/>`;
function setsqItem(it) {
  const [A, B, C] = it.setsq, c = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3], k = it.hole ?? 0.45;
  const inner = [A, B, C].map((p) => [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k]);
  return `<path d="M${xy(A)}L${xy(B)}L${xy(C)}Z${k ? `M${xy(inner[0])}L${xy(inner[2])}L${xy(inner[1])}Z` : ""}" fill="${it.fill || "#60A5FA"}" fill-rule="evenodd" stroke="${it.stroke || "#1E3A8A"}" stroke-width=".35" stroke-linejoin="round"/>`;
}
// p166's pattern pieces, each in a box of side s centred at (cx, cy)
const PC = { red: ["#EF4444", "#991B1B"], green: ["#22C55E", "#166534"], blue: ["#3B82F6", "#1E3A8A"] };
function star(cx, cy, R, r, n, rot = 90) { const p = []; for (let i = 0; i < 2 * n; i++) p.push(go([cx, cy], rot + (i * 180) / n, i % 2 ? r : R)); return `M${p.map(xy).join("L")}Z`; }
function pieceItem(it) {
  const [cx, cy] = it.at, s = it.s || 8, [f, k] = PC[it.color || "red"] || PC.red, sw = 0.3, R = s / 2;
  switch (it.piece) {
    case "circle": return `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(R * 0.92)}" fill="${f}" stroke="${k}" stroke-width="${sw}"/>`;
    case "star": return `<path d="${star(cx, cy, R * 0.98, R * 0.42, 5)}" fill="${f}" stroke="${k}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    case "burst": return `<path d="${star(cx, cy, R * 0.9, R * 0.55, 8)}" fill="${f}" stroke="${k}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    case "plusc": case "xc": { const r = R * 0.92, c = it.piece === "xc" ? r * 0.7071 : 0, q = it.piece === "xc" ? r * 0.7071 : r;
      const d = it.piece === "xc" ? `M${f2(cx - c)} ${f2(cy - c)}L${f2(cx + c)} ${f2(cy + c)}M${f2(cx + c)} ${f2(cy - c)}L${f2(cx - c)} ${f2(cy + c)}` : `M${f2(cx - q)} ${f2(cy)}H${f2(cx + q)}M${f2(cx)} ${f2(cy - q)}V${f2(cy + q)}`;
      return `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r)}" fill="${f}" stroke="${INK}" stroke-width="${sw}"/><path d="${d}" stroke="${INK}" stroke-width=".35"/>`; }
    case "cyl": { const w = s * 0.62, h = s * 0.92, ry = w * 0.2, x = cx - w / 2, y = cy - h / 2 + ry;
      return `<path d="M${f2(x)} ${f2(y)}V${f2(y + h - 2 * ry)}A${f2(w / 2)} ${f2(ry)} 0 0 0 ${f2(x + w)} ${f2(y + h - 2 * ry)}V${f2(y)}" fill="${f}" stroke="${k}" stroke-width="${sw}"/><ellipse cx="${f2(cx)}" cy="${f2(y)}" rx="${f2(w / 2)}" ry="${f2(ry)}" fill="${f}" stroke="${k}" stroke-width="${sw}" style="filter:brightness(1.12)"/>`; }
    case "cube": { const a = s * 0.62, o = s * 0.22, x = cx - (a + o) / 2, y = cy - (a + o) / 2 + o;
      return `<path d="M${f2(x)} ${f2(y)}H${f2(x + a)}V${f2(y + a)}H${f2(x)}Z" fill="${f}" stroke="${k}" stroke-width="${sw}"/><path d="M${f2(x)} ${f2(y)}L${f2(x + o)} ${f2(y - o)}H${f2(x + a + o)}L${f2(x + a)} ${f2(y)}Z" fill="${f}" stroke="${k}" stroke-width="${sw}" style="filter:brightness(1.18)"/><path d="M${f2(x + a)} ${f2(y)}L${f2(x + a + o)} ${f2(y - o)}V${f2(y + a - o)}L${f2(x + a)} ${f2(y + a)}Z" fill="${f}" stroke="${k}" stroke-width="${sw}" style="filter:brightness(.82)"/>`; }
    case "slot": return `<rect x="${f2(cx - R * (it.n || 1))}" y="${f2(cy - R)}" width="${f2(s * (it.n || 1))}" height="${f2(s)}" rx="1.6" fill="#fff" stroke="#CBD5E1" stroke-width=".35" stroke-dasharray="1.2 .9"/>`;
    default: throw new Error("c4p157 piece? " + it.piece);
  }
}
const stickItem = (it) => { const [A, B] = it.stick, w = it.w || 1.25; return `<path d="M${xy(A)}L${xy(B)}" stroke="#F6C453" stroke-width="${w}" stroke-linecap="round"/><path d="M${xy(A)}L${xy(B)}" stroke="#FDE68A" stroke-width="${f2(w * 0.45)}" stroke-linecap="round"/>`; };
// p166: the chessboard (n × n, the top-left square dark)
function chessItem([x, y, n, s]) {
  let g = `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(n * s)}" height="${f2(n * s)}" fill="#fff" stroke="${INK}" stroke-width=".35"/>`;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if ((r + c) % 2 === 0) g += `<rect x="${f2(x + c * s)}" y="${f2(y + r * s)}" width="${f2(s)}" height="${f2(s)}" fill="#1F2937"/>`;
  return g;
}
// p166: the grille, two square motifs taking turns like a chessboard (A: bars, a ring and a lattice; B: a big ring, arcs)
function grilleItem([x, y, cols, rows, s]) {
  const sw = `stroke="${INK}" stroke-width=".3" fill="none"`;
  const A = (X, Y) => { const q = s / 4, c = [X + s / 2, Y + s / 2]; let d = "";
    for (let i = 1; i < 4; i++) d += `M${f2(X + i * q)} ${f2(Y)}V${f2(Y + s)}M${f2(X)} ${f2(Y + i * q)}H${f2(X + s)}`;
    d += `M${f2(X)} ${f2(Y)}L${f2(X + s)} ${f2(Y + s)}M${f2(X + s)} ${f2(Y)}L${f2(X)} ${f2(Y + s)}`;
    const r = s * 0.2, k = s * 0.11;
    return `<rect x="${f2(X)}" y="${f2(Y)}" width="${f2(s)}" height="${f2(s)}" fill="#fff"/><path d="${d}" ${sw}/><circle cx="${f2(c[0])}" cy="${f2(c[1])}" r="${f2(r)}" fill="#fff" ${sw.replace('fill="none"', "")}/><path d="M${f2(c[0])} ${f2(c[1] - k)}L${f2(c[0] + k)} ${f2(c[1])}L${f2(c[0])} ${f2(c[1] + k)}L${f2(c[0] - k)} ${f2(c[1])}ZM${f2(c[0] - k / 2)} ${f2(c[1] - k / 2)}L${f2(c[0] + k / 2)} ${f2(c[1] + k / 2)}M${f2(c[0] + k / 2)} ${f2(c[1] - k / 2)}L${f2(c[0] - k / 2)} ${f2(c[1] + k / 2)}" ${sw}/>`; };
  const B = (X, Y) => { const c = [X + s / 2, Y + s / 2], R = s * 0.24, e = s * 0.26, k = s * 0.13; let d = `M${f2(X)} ${f2(Y)}L${f2(X + s)} ${f2(Y + s)}M${f2(X + s)} ${f2(Y)}L${f2(X)} ${f2(Y + s)}`;
    // a half ring standing on the middle of each edge
    d += `M${f2(c[0] - e)} ${f2(Y)}A${f2(e)} ${f2(e)} 0 0 0 ${f2(c[0] + e)} ${f2(Y)}M${f2(c[0] - e)} ${f2(Y + s)}A${f2(e)} ${f2(e)} 0 0 1 ${f2(c[0] + e)} ${f2(Y + s)}`;
    d += `M${f2(X)} ${f2(c[1] - e)}A${f2(e)} ${f2(e)} 0 0 1 ${f2(X)} ${f2(c[1] + e)}M${f2(X + s)} ${f2(c[1] - e)}A${f2(e)} ${f2(e)} 0 0 0 ${f2(X + s)} ${f2(c[1] + e)}`;
    return `<rect x="${f2(X)}" y="${f2(Y)}" width="${f2(s)}" height="${f2(s)}" fill="#fff"/><path d="${d}" ${sw}/><circle cx="${f2(c[0])}" cy="${f2(c[1])}" r="${f2(R)}" fill="#fff" ${sw.replace('fill="none"', "")}/><path d="M${f2(c[0])} ${f2(c[1] - k)}L${f2(c[0] + k)} ${f2(c[1])}L${f2(c[0])} ${f2(c[1] + k)}L${f2(c[0] - k)} ${f2(c[1])}ZM${f2(c[0] - k / 2)} ${f2(c[1] - k / 2)}L${f2(c[0] + k / 2)} ${f2(c[1] + k / 2)}M${f2(c[0] + k / 2)} ${f2(c[1] - k / 2)}L${f2(c[0] - k / 2)} ${f2(c[1] + k / 2)}" ${sw}/>`; };
  let g = "";
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const X = x + c * (s + 0.8), Y = y + r * (s + 0.8); g += ((r + c) % 2 ? B : A)(X, Y) + `<rect x="${f2(X)}" y="${f2(Y)}" width="${f2(s)}" height="${f2(s)}" ${sw.replace(".3", ".45")}/>`; }
  return g;
}
// p166: the mosque wall, n panels taking turns (a pointed arch with a spike, a round horseshoe arch), drawn twice (a double line)
function archesItem([x, y, n, w, h]) {
  const gap = 1.1, sw = `fill="none" stroke="${INK}" stroke-width=".25"`;
  const pointed = (X, Y, W, H, o) => { const l = X + W * 0.15 + o, r = X + W * 0.85 - o, b = Y + H - 0.6 - o, s1 = Y + H * 0.36 + o, top = Y + H * 0.08 + o, cx = X + W / 2, sh = Y + H * 0.22 + o;
    return `<path d="M${f2(l)} ${f2(b)}V${f2(s1)}L${f2(l + W * 0.06)} ${f2(s1)}C${f2(l + W * 0.06)} ${f2(sh + H * 0.02)} ${f2(cx - W * 0.1)} ${f2(sh)} ${f2(cx - W * 0.03)} ${f2(sh - H * 0.03)}L${f2(cx)} ${f2(top)}L${f2(cx + W * 0.03)} ${f2(sh - H * 0.03)}C${f2(cx + W * 0.1)} ${f2(sh)} ${f2(r - W * 0.06)} ${f2(sh + H * 0.02)} ${f2(r - W * 0.06)} ${f2(s1)}L${f2(r)} ${f2(s1)}V${f2(b)}" ${sw}/>`; };
  const round = (X, Y, W, H, o) => { const l = X + W * 0.15 + o, r = X + W * 0.85 - o, b = Y + H - 0.6 - o, cx = X + W / 2, R = W * 0.27 - o, cy = Y + H * 0.28, nk = Y + H * 0.45;
    return `<path d="M${f2(l)} ${f2(b)}V${f2(nk)}H${f2(cx - R * 0.78)}A${f2(R)} ${f2(R * 1.05)} 0 1 1 ${f2(cx + R * 0.78)} ${f2(nk)}H${f2(r)}V${f2(b)}" ${sw}/>`; };
  let g = "";
  for (let i = 0; i < n; i++) {
    const X = x + i * (w + gap);
    g += `<rect x="${f2(X)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" fill="#fff" ${sw}/><rect x="${f2(X + 0.7)}" y="${f2(y + 0.7)}" width="${f2(w - 1.4)}" height="${f2(h - 1.4)}" ${sw}/>`;
    const f = i % 2 ? round : pointed;
    g += f(X, y, w, h, 0) + f(X, y, w, h, 0.7);
  }
  return g;
}
// p167: triangles in rows, the upward ones black: { tritile: [x, y, cols, rows, b, hgt], shift: "zig" }
function tritileItem(it) {
  const [x, y, cols, rows, b, hh] = it.tritile;
  let g = "";
  for (let r = 0; r < rows; r++) {
    const off = it.shift === "none" ? 0 : (r % 2) * (b / 2), Y = y + r * hh;
    for (let c = 0; c < cols - (it.shift !== "none" && r % 2 && it.trim ? 1 : 0); c++) {
      const X = x + off + c * b;
      g += `<path d="M${f2(X)} ${f2(Y + hh)}L${f2(X + b / 2)} ${f2(Y)}L${f2(X + b)} ${f2(Y + hh)}Z" fill="${it.fill || "#111827"}"/>`;
    }
  }
  return g;
}
function geoItem(it, ctx) {
  if (it.poly) return `<path d="M${it.poly.map(xy).join("L")}${it.open ? "" : "Z"}" ${attrs(it)}/>`;
  if (it.line) return `<path d="M${it.line.map(xy).join("L")}" ${attrs(it, { sw: 0.45 })}/>`;
  if (it.ticks) return ticksItem(it);
  if (Array.isArray(it.ang)) return angItem(it);
  if (it.right) return rightItem(it);
  if (it.t != null) return text(it.t, it.at, it);
  if (it.arc) { const [cx, cy, r, a0, a1] = it.arc, p0 = go([cx, cy], a0, r), p1 = go([cx, cy], a1, r); return `<path d="M${xy(p0)}A${f2(r)} ${f2(r)} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${xy(p1)}" ${attrs(it, { sw: 0.4 })}/>`; }
  if (it.bow) return bowItem(it);
  if (it.circle) return `<circle cx="${f2(it.circle[0])}" cy="${f2(it.circle[1])}" r="${f2(it.circle[2])}" ${attrs(it)}/>`;
  if (it.ellipse) return `<ellipse cx="${f2(it.ellipse[0])}" cy="${f2(it.ellipse[1])}" rx="${f2(it.ellipse[2])}" ry="${f2(it.ellipse[3])}" ${attrs(it)}/>`;
  if (it.rect) return `<rect x="${f2(it.rect[0])}" y="${f2(it.rect[1])}" width="${f2(it.rect[2])}" height="${f2(it.rect[3])}" rx="${it.rx || 0}" ${attrs(it)}/>`;
  if (it.grid) return gridItem(it);
  if (it.dots) return dotsItem(it);
  if (it.prot) return protItem(it, ctx);
  if (it.pencil) return pencilItem(it);
  if (it.strip) return stripItem(it);
  if (it.ruler) return rulerItem(it);
  if (it.barrow) return barrow(it.barrow, it.color);
  if (it.arrow) { const [A, B] = it.arrow, a = dirOf(A, B), head = it.head || 2, e = go(B, a + 180, head * 0.7), c = it.color || INK; return `<path d="M${xy(A)}L${xy(e)}" stroke="${c}" stroke-width="${it.sw || 0.4}"/>${arrowHead(B, a, head, c)}`; }
  if (it.carrow) { const [A, C, B] = it.carrow, c = it.color || "#DC2626", head = it.head || 3.4, a = dirOf(C, B), e = go(B, a + 180, head * 0.6); return `<path d="M${xy(A)}Q${xy(C)} ${xy(e)}" fill="none" stroke="${c}" stroke-width="${it.sw || 1.3}" stroke-linecap="round"/>${arrowHead(B, a, head, c)}`; }
  if (it.tbox) { const [x, y] = it.at, w = it.w || 7, h = it.h || 4.4; return `<rect x="${f2(x - w / 2)}" y="${f2(y - h / 2)}" width="${f2(w)}" height="${f2(h)}" fill="#fff" stroke="#DC2626" stroke-width=".4"/>` + text(it.tbox, [x, y + 0.15], { fs: h * 0.72, color: "#DC2626", weight: 700 }); }
  if (it.setsq) return setsqItem(it);
  if (it.piece) return pieceItem(it);
  if (it.stick) return stickItem(it);
  if (it.chess) return chessItem(it.chess);
  if (it.grille) return grilleItem(it.grille);
  if (it.arches) return archesItem(it.arches);
  if (it.tritile) return tritileItem(it);
  if (it.raw) return it.raw;
  throw new Error("c4p157_geo: item? " + JSON.stringify(it).slice(0, 80));
}

module.exports = {
  kinds: {
    c4p157_geo: (b, ctx) => `<div class="c4p157-gw" style="justify-content:${b.justify || "center"}${b.mt ? `;margin-top:${b.mt}mm` : ""}"><svg class="c4p157-svg" width="${f2(b.w * (b.scale || 1))}mm" height="${f2(b.h * (b.scale || 1))}mm" viewBox="${f2(b.x0 || 0)} ${f2(b.y0 || 0)} ${f2(b.w)} ${f2(b.h)}">${b.items.map((it) => geoItem(it, ctx)).join("")}</svg></div>`,
    c4p157_opts: (b, ctx, page) => `<div class="c4p157-opts" style="grid-template-columns:${b.tpl || `repeat(${b.cols || 4}, auto)`};gap:${b.gap ?? 1}mm ${b.cgap ?? 4}mm;padding-left:${b.indent ?? 9}mm">${b.items.map((o) => `<div class="c4p157-opt"><b>${ctx.esc(o.l)}</b>${typeof o.b === "string" ? `<span>${ctx.md(o.b)}</span>` : ctx.blockHtml(o.b, page)}</div>`).join("")}</div>`,
    c4p157_group: (b, ctx, page) => `<div class="c4p157-group" style="--g:${b.color};--gt:${b.tint}${b.h ? `;height:${b.h}mm` : ""}"><span class="c4p157-gtab">${ctx.esc(b.title)}</span>${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
    c4p157_bullets: (b, ctx) => `<ul class="c4p157-bul">${b.items.map((t) => `<li>${ctx.md(t)}</li>`).join("")}</ul>`,
    c4p157_fill: (b, ctx) => `<div class="c4p157-fill"${b.indent ? ` style="padding-left:${b.indent}mm"` : ""}><span>${ctx.md(b.text)}</span><i></i></div>`,
    c4p157_line: (b, ctx) => `<p class="c4p157-line" style="font-size:${b.size || 11.5}pt${b.indent ? `;padding-left:${b.indent}mm` : ""}${b.center ? ";text-align:center" : ""}">${ctx.md(b.text)}</p>`,
  },
  css: `
.c4p157-gw { display: flex; flex: none } svg.c4p157-svg { display: block; overflow: visible; flex: none }
.c4p157-opts { display: grid; align-items: center; justify-content: start }
.c4p157-opt { display: flex; align-items: center; gap: 1.6mm; font: 500 12pt/1.35 'Noto Sans Bengali' } .c4p157-opt > b { font: 700 12pt 'Noto Sans Bengali'; color: #C2410C; flex: none }
.c4p157-group { position: relative; flex: 1; border: .8mm solid var(--g); background: var(--gt); border-radius: 6mm; padding: 7.5mm 4mm 3mm; display: flex; flex-direction: column; justify-content: center }
.c4p157-gtab { position: absolute; top: -4.2mm; left: 50%; transform: translateX(-50%); background: #fff; border: .8mm solid var(--g); border-radius: 2.4mm; padding: .4mm 9mm 0; font: 800 12.5pt 'Baloo Da 2'; color: var(--g); white-space: nowrap }
.c4p157-bul { margin: 0; padding-left: 6mm; display: flex; flex-direction: column; gap: 1.6mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.c4p157-bul li::marker { color: var(--c); font-size: 13pt }
.c4p157-fill { display: flex; align-items: baseline; gap: 1.6mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .c4p157-fill i { flex: 1; border-bottom: .5mm dashed #94A3B8 }
.c4p157-line { font: 500 11.5pt/1.4 'Noto Sans Bengali'; margin: 0 }
`,
};
