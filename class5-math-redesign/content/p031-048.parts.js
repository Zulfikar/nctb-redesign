// Printed pages 31–48's own kinds (অধ্যায় ৩ গুণিতক ও গুণনীয়ক), prefixed c5p031_. Written by a helper (25 Nov 2026).
// Everything whose count, cell or line matters is drawn here by code (SVG): the Venn circles of multiples and factors, the
// factor trees, the লসাগু/গসাগু division ladders, the tables whose cells the book rings, joins with ovals or with arrows,
// the 9 × 6 tiles' grid, the number line ১–২০, the 12 × 18 squared paper and the 48 m × 36 m floor. Units: mm.
//
// The content file wraps every top-level block in c5p031_x, which renders it through Class 4's c4p081_x (so its marks
// ◯ ▢ △ ⬭ ⟨o:…⟩ ⟨V⟩ ▭ ▬ work in every text) and then draws this file's own mark:
//   ⟨-⟩            a short writing line (the book's dotted blank "….," in a row of multiples), kept on one line with a
//                  comma after it
//
//   c5p031_x      { b }                              renders block b (or a list of blocks) with the marks above
//   c5p031_venn   { w, rx, ry, d, labels: [l, r], left: [lines], mid: [lines], right: [lines], below?, arrow?: "down" |
//                 "elbow", fs?, lfs? }               two overlapping ellipses (centres w/2 ∓ d), a label over each, the
//                 numbers in the left part, the overlap and the right part; below: the label under the overlap, reached
//                 by the book's fat blue arrow (down, p32) or its orange elbow arrow (p41), or just written under it (p33)
//   c5p031_tree   { t, dx?: [per level], dy?, fs?, frame?, cap?, w? }   a factor tree: t = [node, left?, right?] (nested);
//                 a node "১২" is a box holding ১২, "" an empty box, "○১২" an oval holding ১২, "○" an empty oval; lines
//                 from the bottom of a node to the top of each child (pp36, 40, 44); frame: the book's rounded box around
//                 it (p44); cap: a line under it ("১২ = ২ × ২ × ৩")
//   c5p031_ladder { rows: [{ d?, n: ["১২,", "১৮"] }], cw?, ind?, fs?, rh?, panel? }   the division ladder: each row's
//                 divisor, its bar and the line under its numbers (each row's bar a little to the right of the one above,
//                 as printed); the numbers right-aligned in columns, their commas after; the last row has no divisor
//   c5p031_stab   { look: "grid" | "boxes" | "plain", cols: [mm], rows: [{ c: [cells], h?, tone? }], fs?, lfs?,
//                 rings?: [[r, c]], ovals?: [[[r, c], [r, c], pad?]], arrows?: [{ a: [r, c], b: [r, c], col?, both? }],
//                 ory? }                              a table drawn in SVG, so its rings, ovals and arrows sit on the cells:
//                 grid: ruled (p34's tiles table); boxes: the book's purple panel of pink cells (p34's multiples);
//                 plain: no lines (p39's and p45's rows of multiples and factors). Column 0 is words (a label), the rest
//                 numbers. tone (grid): a row's fill
//   c5p031_tiles  { n, m, u, tw, th, top, side }      p34: an n × m grid of dashed tw × th tiles (u mm a cm), the first
//                 one coloured, its length and breadth marked with arcs
//   c5p031_nline  { from, to, step?, fs? }            p42: a number line, a tick for every number, the numbers above
//   c5p031_sq     { cols, rows, s }                   p45: squared paper (12 × 18)
//   c5p031_floor  { w, h, k, sq, filled: [[r, c]], top, side }   p48: the w m × h m floor to scale (k mm a metre), sq m
//                 carpets coloured in the cells listed
//   c5p031_strike { digits: ["৪", "৩/", …] }          p37: the digits in a rounded box, those ending "/" struck through
//   c5p031_steps  { title, items: [[mark, text]] }    pp39, 45: the orange box of steps with its tab on top
//   c5p031_form   { rows: [[label, cell, …]], cols?, lw?, lmax?, bw?, align?, gap?, size? }   a label column and its boxes
//                 (pp36, 38, 42, 44, 45): cols the grid's column widths; lmax a label's max width (it then wraps); bw the
//                 □ boxes' width; align one text-align per column
//   c5p031_rule   { text, tone, center?, size? }      the book's tinted boxes of rules: pink, teal, lavender, yellow,
//                 peach, white
//   c5p031_eqs    { cells: [[[lhs, rhs], …], …] }     p35: four cells of equations, the "=" signs one under another
//   c5p031_tab    as c4p081_tab                       Class 4's table, its inner lines in this chapter's tint
//   c5p031_lines  { items: [text], gap?, indent?, size? }   lines with a hanging indent after "(ক)", "(১)" or "১." (pp32–48)
//
// This file's CSS also keeps my pages' blocks from shrinking (an over-full page is then fitted or reported instead of a
// table being squeezed) and lets Class 4's small speech cards run 152 mm wide on pages 31–48.
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const WORDS = "Noto Sans Bengali", NUMS = "Baloo Da 2";
const txt = (x, y, s, { size = 4.4, anchor = "middle", weight = 700, col = INK, font = NUMS, extra = "" } = {}) =>
  `<text x="${f2(x)}" y="${f2(y)}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${f2(size)}" style="fill:${col}"${extra}>${s}</text>`;
const svg = (cls, W, H, g) => `<svg class="${cls}" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${g}</svg>`;
function head(x, y, a, s = 1.7, col = INK) {
  const b = s * 0.45, hx = x - s * Math.cos(a), hy = y - s * Math.sin(a);
  return `<path d="M${f2(x)} ${f2(y)}L${f2(hx + b * Math.sin(a))} ${f2(hy - b * Math.cos(a))}L${f2(hx - b * Math.sin(a))} ${f2(hy + b * Math.cos(a))}Z" style="fill:${col}"/>`;
}
function arrow(x1, y1, x2, y2, { w = 0.32, s = 1.6, col = INK, both = false } = {}) {
  const a = Math.atan2(y2 - y1, x2 - x1), k = s * 0.8;
  return `<path d="M${f2(x1 + (both ? k * Math.cos(a) : 0))} ${f2(y1 + (both ? k * Math.sin(a) : 0))}L${f2(x2 - k * Math.cos(a))} ${f2(y2 - k * Math.sin(a))}" style="stroke:${col}" stroke-width="${w}" fill="none"/>${head(x2, y2, a, s, col)}${both ? head(x1, y1, a + Math.PI, s, col) : ""}`;
}

// ── the Venn circles ──
function vennSvg(b, ctx) {
  const W = b.w || 90, rx = b.rx || 26, ry = b.ry || 16, d = b.d || 15, fs = b.fs || 4.4, lfs = b.lfs || 4.1;
  const top = b.labels ? lfs + 2 : 0.6, cy = top + ry + 0.4, cx1 = W / 2 - d, cx2 = W / 2 + d;
  const xl = (cx1 - rx + cx2 - rx) / 2, xr = (cx1 + rx + cx2 + rx) / 2, xm = W / 2, lens = ry * Math.sqrt(1 - (d / rx) ** 2);
  const lines = (arr, x) => (arr || []).map((s, i) => txt(x, cy + (i - (arr.length - 1) / 2) * fs * 1.42 + fs * 0.36, ctx.esc(s), { size: fs })).join("");
  let g = `<ellipse cx="${f2(cx1)}" cy="${f2(cy)}" rx="${rx}" ry="${ry}" fill="#DBEAFE" fill-opacity=".6"/><ellipse cx="${f2(cx2)}" cy="${f2(cy)}" rx="${rx}" ry="${ry}" fill="#FCE7F3" fill-opacity=".6"/>`;
  g += `<ellipse cx="${f2(cx1)}" cy="${f2(cy)}" rx="${rx}" ry="${ry}" fill="none" stroke="${INK}" stroke-width=".4"/><ellipse cx="${f2(cx2)}" cy="${f2(cy)}" rx="${rx}" ry="${ry}" fill="none" stroke="${INK}" stroke-width=".4"/>`;
  if (b.labels) g += txt(cx1 - rx * 0.12, lfs, ctx.esc(b.labels[0]), { size: lfs, font: WORDS, weight: 600, col: "var(--d)" }) + txt(cx2 + rx * 0.12, lfs, ctx.esc(b.labels[1]), { size: lfs, font: WORDS, weight: 600, col: "var(--d)" });
  g += lines(b.left, xl) + lines(b.mid, xm) + lines(b.right, xr);
  let H = cy + ry + 0.8;
  if (b.below && b.arrow === "down") { // the fat light-blue arrow from inside the overlap down to the words
    const y0 = cy + lens - 4.5, y1 = cy + ry + 6.5, hw = 1.5, hh = 3;
    g += `<path d="M${f2(xm - hw)} ${f2(y0)}H${f2(xm + hw)}V${f2(y1 - hh)}H${f2(xm + hw * 2.1)}L${f2(xm)} ${f2(y1)}L${f2(xm - hw * 2.1)} ${f2(y1 - hh)}H${f2(xm - hw)}Z" fill="#7DD3FC" stroke="#0369A1" stroke-width=".3" stroke-linejoin="round"/>`;
    g += txt(xm, y1 + lfs + 1, ctx.esc(b.below), { size: lfs, font: WORDS, weight: 600 });
    H = y1 + lfs + 2.4;
  } else if (b.below && b.arrow === "elbow") { // the orange elbow arrow from the overlap's foot to the words on the right
    const y0 = cy + lens - 0.2, y1 = cy + ry + 4.4, x1 = xm + 10;
    g += `<path d="M${f2(xm)} ${f2(y0)}V${f2(y1)}H${f2(x1 - 2.4)}" fill="none" stroke="#D97706" stroke-width="1.1"/>` + head(x1, y1, 0, 2.8, "#D97706");
    g += txt(x1 + 1, y1 + lfs * 0.36, ctx.esc(b.below), { size: lfs, font: WORDS, weight: 600, anchor: "start" });
    H = y1 + lfs * 0.36 + 1.6;
  } else if (b.below) {
    g += txt(xm, cy + ry + lfs + 1.4, ctx.esc(b.below), { size: lfs, font: WORDS, weight: 600 });
    H = cy + ry + lfs + 2.6;
  }
  return svg("c5p031-svg", W, H, g);
}

// ── a factor tree ──
function treeSvg(b, ctx) {
  const fs = b.fs || 4.5, bw = b.bw || 10.5, bh = b.bh || 6.8, crx = b.crx || 6.2, cry = b.cry || 4.4, dy = b.dy || 11.5, dxs = b.dx || [12, 10, 9, 8];
  const nodes = [], edges = [];
  const place = (n, x, y, lvl) => {
    const [lab, L, R] = Array.isArray(n) ? n : [n];
    const me = { lab, x, y, oval: lab.startsWith("○") };
    nodes.push(me);
    const dx = dxs[Math.min(lvl, dxs.length - 1)];
    if (L != null) edges.push([me, place(L, x - dx, y + dy, lvl + 1)]);
    if (R != null) edges.push([me, place(R, x + dx, y + dy, lvl + 1)]);
    return me;
  };
  place(b.t, 0, 0, 0);
  const hw = (n) => (n.oval ? crx : bw / 2), hh = (n) => (n.oval ? cry : bh / 2);
  const minX = Math.min(...nodes.map((n) => n.x - hw(n))), maxX = Math.max(...nodes.map((n) => n.x + hw(n)));
  const minY = Math.min(...nodes.map((n) => n.y - hh(n))), maxY = Math.max(...nodes.map((n) => n.y + hh(n)));
  const ox = 0.5 - minX, oy = 0.5 - minY, W = maxX - minX + 1, H = maxY - minY + 1;
  let g = "";
  for (const [p, c] of edges) g += `<path d="M${f2(p.x + ox)} ${f2(p.y + hh(p) + oy)}L${f2(c.x + ox)} ${f2(c.y - hh(c) + oy)}" stroke="${INK}" stroke-width=".32" fill="none"/>`;
  for (const n of nodes) {
    const x = n.x + ox, y = n.y + oy, v = n.oval ? n.lab.slice(1) : n.lab;
    g += n.oval ? `<ellipse cx="${f2(x)}" cy="${f2(y)}" rx="${crx}" ry="${cry}" fill="#fff" stroke="${INK}" stroke-width=".38"/>`
      : `<rect x="${f2(x - bw / 2)}" y="${f2(y - bh / 2)}" width="${bw}" height="${bh}" rx=".6" fill="#fff" stroke="${INK}" stroke-width=".38"/>`;
    if (v) g += txt(x, y + fs * 0.36, ctx.esc(v), { size: fs, col: "var(--d)" });
  }
  return svg("c5p031-svg", W, H, g);
}

// ── the division ladder ──
function ladderSvg(b, ctx) {
  const fs = b.fs || 4.6, rh = b.rh || 7, cw = b.cw || 10.5, ind = b.ind ?? 2.4, n = Math.max(...b.rows.map((r) => r.n.length));
  const dw = fs * 0.62 * Math.max(...b.rows.map((r) => [...(r.d || "")].length)) + 1.2, bx0 = dw + 1.4;
  const colR = (j) => bx0 + 1.8 + (j + 1) * cw - 2.2, xEnd = bx0 + 1.8 + n * cw + 0.6;
  let g = "";
  b.rows.forEach((r, i) => {
    const yT = 0.6 + i * rh, yB = yT + rh, base = yT + rh / 2 + fs * 0.36, bx = bx0 + i * ind;
    if (r.d != null) {
      g += txt(bx - 1.3, base, ctx.esc(r.d), { size: fs, anchor: "end", col: "var(--c)", weight: 800 });
      g += `<path d="M${f2(bx)} ${f2(yT + (i ? 0 : 0.4))}V${f2(yB)}H${f2(xEnd)}" stroke="${INK}" stroke-width=".38" fill="none"/>`;
    }
    r.n.forEach((s, j) => {
      const m = s.match(/^(.*?)([,.]?)$/);
      g += txt(colR(j), base, ctx.esc(m[1]), { size: fs, anchor: "end" }) + (m[2] ? txt(colR(j) + 0.2, base, m[2], { size: fs, anchor: "start" }) : "");
    });
  });
  return svg("c5p031-svg", xEnd + 2.6, 0.6 + b.rows.length * rh + 0.6, g);
}

// ── a table in SVG, with its rings, ovals and arrows ──
function stabSvg(b, ctx) {
  const look = b.look || "grid", fs = b.fs || 4.3, lfs = b.lfs || 4, cols = b.cols, gap = look === "boxes" ? 1.5 : 0, pad = look === "boxes" ? 2.2 : 0.3;
  const rh = (r) => r.h || b.h || 7.6;
  const X = [pad]; cols.forEach((w, i) => X.push(X[i] + w + gap));
  const Y = [pad]; b.rows.forEach((r, i) => Y.push(Y[i] + rh(r) + gap));
  const W = X[cols.length] - gap + pad, H = Y[b.rows.length] - gap + pad;
  const cx = (c) => X[c] + cols[c] / 2, cy = (r) => Y[r] + rh(b.rows[r]) / 2;
  let g = "";
  if (look === "boxes") g += `<rect x="0" y="0" width="${f2(W)}" height="${f2(H)}" rx="3.6" fill="#8B80C4"/>`;
  b.rows.forEach((r, i) => r.c.forEach((s, j) => {
    const x = X[j], y = Y[i], w = cols[j], h = rh(r);
    if (look === "boxes") g += `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" rx=".8" fill="#FCE7E0"/>`;
    else if (look === "grid" && (r.tone || (j === 0 && b.ltone))) g += `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" style="fill:${r.tone || b.ltone}"/>`;
    if (s == null || s === "") return;
    const words = j === 0 && b.words !== false;
    g += words ? txt(x + (look === "plain" ? 0 : 2.2), y + h / 2 + lfs * 0.36, ctx.esc(s), { size: lfs, anchor: "start", font: WORDS, weight: 600 })
      : txt(x + w / 2, y + h / 2 + fs * 0.36, ctx.esc(s), { size: fs, col: r.tone ? INK : look === "plain" ? INK : INK });
  }));
  if (look === "grid") {
    const st = `style="stroke:color-mix(in srgb, var(--c) 45%, #fff)" stroke-width=".3"`;
    for (let i = 1; i < b.rows.length; i++) g += `<path d="M${f2(X[0])} ${f2(Y[i])}H${f2(X[cols.length])}" ${st}/>`;
    for (let j = 1; j < cols.length; j++) g += `<path d="M${f2(X[j])} ${f2(Y[0])}V${f2(Y[b.rows.length])}" ${st}/>`;
    g += `<rect x="${f2(X[0])}" y="${f2(Y[0])}" width="${f2(X[cols.length] - X[0])}" height="${f2(Y[b.rows.length] - Y[0])}" rx="1.6" fill="none" style="stroke:var(--c)" stroke-width=".55"/>`;
  }
  const rr = b.rr || 3.3;
  for (const [r, c] of b.rings || []) g += `<circle cx="${f2(cx(c))}" cy="${f2(cy(r))}" r="${rr}" fill="none" stroke="${INK}" stroke-width=".32"/>`;
  for (const [[r1, c1], [r2, c2], op] of b.ovals || []) {
    const x1 = cx(c1), y1 = cy(r1), x2 = cx(c2), y2 = cy(r2), a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    const L = Math.hypot(x2 - x1, y2 - y1) / 2 + (op ?? 4.6);
    g += `<ellipse cx="${f2((x1 + x2) / 2)}" cy="${f2((y1 + y2) / 2)}" rx="${f2(L)}" ry="${b.ory || 3.3}" transform="rotate(${f2(a)} ${f2((x1 + x2) / 2)} ${f2((y1 + y2) / 2)})" fill="none" stroke="${INK}" stroke-width=".32"/>`;
  }
  for (const A of b.arrows || []) {
    const x1 = cx(A.a[1]), y1 = cy(A.a[0]), x2 = cx(A.b[1]), y2 = cy(A.b[0]), a = Math.atan2(y2 - y1, x2 - x1), k = rr + 0.4;
    g += arrow(x1 + k * Math.cos(a), y1 + k * Math.sin(a), x2 - k * Math.cos(a), y2 - k * Math.sin(a), { col: A.col || INK, both: A.both !== false, w: 0.3, s: 1.5 });
  }
  return svg("c5p031-svg", W, H, g);
}

// ── p34: the tiles ──
function tilesSvg(b, ctx) {
  const u = b.u || 1.3, cw = b.tw * u, ch = b.th * u, L = 9, T = 7.5, n = b.n, m = b.m, W = L + n * cw + 0.8, H = T + m * ch + 0.8;
  let g = `<rect x="${L}" y="${T}" width="${f2(cw)}" height="${f2(ch)}" fill="#F4A574"/>`;
  const dash = `stroke="${INK}" stroke-width=".35" stroke-dasharray="1.3 .9" fill="none"`;
  for (let i = 0; i <= n; i++) g += `<path d="M${f2(L + i * cw)} ${T}V${f2(T + m * ch)}" ${dash}/>`;
  for (let j = 0; j <= m; j++) g += `<path d="M${L} ${f2(T + j * ch)}H${f2(L + n * cw)}" ${dash}/>`;
  g += `<path d="M${L} ${f2(T - 0.6)}Q${f2(L + cw / 2)} ${f2(T - 5)} ${f2(L + cw)} ${f2(T - 0.6)}" stroke="${INK}" stroke-width=".3" fill="none"/>`;
  g += txt(L + cw / 2, T - 3.6, ctx.esc(b.top), { size: 3.4, font: WORDS, weight: 600 });
  g += `<path d="M${f2(L - 0.6)} ${T}Q${f2(L - 4.4)} ${f2(T + ch / 2)} ${f2(L - 0.6)} ${f2(T + ch)}" stroke="${INK}" stroke-width=".3" fill="none"/>`;
  g += txt(L - 4.6, T + ch / 2, ctx.esc(b.side), { size: 3.4, font: WORDS, weight: 600, extra: ` transform="rotate(-90 ${f2(L - 4.6)} ${f2(T + ch / 2)})"` });
  return svg("c5p031-svg", W, H, g);
}

// ── p42: the number line ──
function nlineSvg(b, ctx) {
  const st = b.step || 7.6, fs = b.fs || 4.1, N = b.to - b.from + 1, x0 = 1, W = x0 + (N + 0.2) * st, base = 13.6, th = 4.6;
  let g = `<path d="M${x0} ${base}H${f2(x0 + N * st)}" stroke="${INK}" stroke-width=".45"/>`;
  for (let i = 1; i <= N; i++) {
    const x = x0 + i * st;
    g += `<path d="M${f2(x)} ${f2(base - th)}V${base}" stroke="${INK}" stroke-width="${i % 5 === 0 ? .5 : .38}"/>` + txt(x, base - th - 3.4, ctx.bn(b.from + i - 1), { size: fs });
  }
  return svg("c5p031-svg", W, base + 0.6, g);
}

// ── p45: squared paper; p48: the floor ──
function sqSvg(b) {
  const s = b.s || 4.5, W = b.cols * s + 0.8, H = b.rows * s + 0.8;
  let g = `<rect x=".4" y=".4" width="${f2(b.cols * s)}" height="${f2(b.rows * s)}" fill="#fff"/>`;
  for (let i = 1; i < b.cols; i++) g += `<path d="M${f2(0.4 + i * s)} .4V${f2(0.4 + b.rows * s)}" stroke="#475569" stroke-width=".2"/>`;
  for (let j = 1; j < b.rows; j++) g += `<path d="M.4 ${f2(0.4 + j * s)}H${f2(0.4 + b.cols * s)}" stroke="#475569" stroke-width=".2"/>`;
  g += `<rect x=".4" y=".4" width="${f2(b.cols * s)}" height="${f2(b.rows * s)}" fill="none" stroke="${INK}" stroke-width=".45"/>`;
  return svg("c5p031-svg", W, H, g);
}
function floorSvg(b, ctx) {
  const k = b.k || 2, L = 8, T = 7, w = b.w * k, h = b.h * k, s = b.sq * k, W = L + w + 1, H = T + h + 1;
  let g = `<rect x="${L}" y="${T}" width="${f2(w)}" height="${f2(h)}" fill="#fff"/>`;
  for (const [r, c] of b.filled) g += `<rect x="${f2(L + c * s)}" y="${f2(T + r * s)}" width="${f2(s)}" height="${f2(s)}" fill="#F7922F" stroke="${INK}" stroke-width=".4"/>`;
  g += `<rect x="${L}" y="${T}" width="${f2(w)}" height="${f2(h)}" fill="none" stroke="${INK}" stroke-width=".6"/>`;
  g += txt(L + w / 2, T - 1.8, ctx.esc(b.top), { size: 4, font: WORDS, weight: 600 });
  g += txt(L - 2.2, T + h / 2, ctx.esc(b.side), { size: 4, font: WORDS, weight: 600, extra: ` transform="rotate(-90 ${f2(L - 2.2)} ${f2(T + h / 2)})"` });
  return svg("c5p031-svg", W, H, g);
}

const RULE = { pink: ["#FCE7F3", "#F9A8D4"], teal: ["#CCFBF1", "#5EEAD4"], lavender: ["#E0E7FF", "#A5B4FC"], yellow: ["#FEF3C7", "#FCD34D"],
  peach: ["#FFEDD5", "#FDBA74"], white: ["#fff", "var(--c)"] };

module.exports = {
  kinds: {
    c5p031_x: (b, ctx, page) => ctx.blockHtml({ kind: "c4p081_x", b: b.b }, page)
      .replace(/⟨-⟩(,?)/g, (m, c) => `<span class="c5p031-nb"><span class="wline" style="width:8mm"></span>${c}</span>`),
    c5p031_venn: (b, ctx) => `<div class="c5p031-c">${vennSvg(b, ctx)}</div>`,
    c5p031_tree: (b, ctx) => `<div class="c5p031-tu">${b.frame ? `<div class="c5p031-tf" style="${b.w ? `width:${b.w}mm;` : ""}${b.h ? `height:${b.h}mm;` : ""}">${treeSvg(b, ctx)}</div>` : treeSvg(b, ctx)}${b.cap ? `<span class="c5p031-cap">${ctx.md(b.cap)}</span>` : ""}</div>`,
    c5p031_ladder: (b, ctx) => `<div class="c5p031-c${b.left ? " l" : ""}">${b.panel ? `<div class="c5p031-lp">${ladderSvg(b, ctx)}</div>` : ladderSvg(b, ctx)}</div>`,
    c5p031_stab: (b, ctx) => `<div class="c5p031-c${b.left ? " l" : ""}">${stabSvg(b, ctx)}</div>`,
    c5p031_tiles: (b, ctx) => `<div class="c5p031-c">${tilesSvg(b, ctx)}</div>`,
    c5p031_nline: (b, ctx) => `<div class="c5p031-c">${nlineSvg(b, ctx)}</div>`,
    c5p031_sq: (b) => `<div class="c5p031-c">${sqSvg(b)}</div>`,
    c5p031_floor: (b, ctx) => `<div class="c5p031-c">${floorSvg(b, ctx)}</div>`,
    c5p031_strike: (b, ctx) => `<div class="c5p031-stk">${b.digits.map((d) => d.endsWith("/") ? `<span class="c5p031-sk">${ctx.esc(d.slice(0, -1))}</span>` : `<span>${ctx.esc(d)}</span>`).join("")}</div>`,
    c5p031_steps: (b, ctx) => `<div class="c5p031-st"><span class="c5p031-stt">${ctx.md(b.title)}</span><div class="c5p031-stl">${b.items.map(([m, t]) => `<span class="c5p031-stm">${ctx.esc(m)}</span><span>${ctx.md(t)}</span>`).join("")}</div></div>`,
    c5p031_form: (b, ctx) => { const n = Math.max(...b.rows.map((r) => r.length)), cols = b.cols || [b.lw ? `${b.lw}mm` : "auto", ...Array(n - 1).fill("auto")];
      return `<div class="c5p031-form${b.center ? " c" : ""}" style="grid-template-columns:${cols.join(" ")};${b.bw ? `--bw:${b.bw}mm;` : ""}${b.gap != null ? `row-gap:${b.gap}mm;` : ""}${b.size ? `font-size:${b.size}pt;` : ""}">${b.rows.map((r) => r.map((c, i) =>
        `<span class="${i ? "c5p031-fc" : "c5p031-fl"}"${(b.align && b.align[i]) || (!i && b.lmax) ? ` style="${b.align && b.align[i] ? `text-align:${b.align[i]};` : ""}${!i && b.lmax ? `max-width:${b.lmax}mm;white-space:normal;` : ""}"` : ""}>${ctx.md(c)}</span>`).join("")).join("")}</div>`; },
    c5p031_rule: (b, ctx) => { const [bg, bd] = RULE[b.tone || "pink"];
      return `<div class="c5p031-rule${b.center ? " c" : ""}" style="background:${bg};border-color:${bd};${b.size ? `font-size:${b.size}pt;` : ""}">${ctx.md(b.text)}</div>`; },
    c5p031_eqs: (b, ctx) => `<table class="c5p031-eqs"><tr>${b.cells.map((cell) => `<td><div class="c5p031-eqc">${cell.map(([l, r]) => `<span>${ctx.esc(l)}</span><span>=</span><span>${ctx.esc(r)}</span>`).join("")}</div></td>`).join("")}</tr></table>`,
    c5p031_tab: (b, ctx, page) => ctx.blockHtml({ ...b, kind: "c4p081_tab" }, page).replace(`class="c4p081-tw"`, `class="c4p081-tw c5p031-tw"`),
    c5p031_lines: (b, ctx) => `<div class="c5p031-lines" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.gap != null ? `row-gap:${b.gap}mm;` : ""}${b.indent ? `padding-left:${b.indent}mm;` : ""}">${b.items.map((t) => {
      const m = t.match(/^(\([^)]+\)|[০-৯]+\.)\s*(.*)$/s); return m ? `<span class="c5p031-lm">${ctx.esc(m[1])}</span><span>${ctx.md(m[2])}</span>` : `<span></span><span>${ctx.md(t)}</span>`; }).join("")}</div>`,
  },
  css: `
:is(${Array.from({ length: 18 }, (_, i) => `.page[data-page="${31 + i}"]`).join(", ")}) .body > * { flex-shrink: 0 }
:is(${Array.from({ length: 18 }, (_, i) => `.page[data-page="${31 + i}"]`).join(", ")}) .c4p081-tiny .sb { max-width: 152mm }
.c5p031-nb { white-space: nowrap }
.c5p031-c { display: flex; justify-content: center } .c5p031-c.l { justify-content: flex-start } svg.c5p031-svg { display: block; overflow: visible; flex: none }
.c5p031-tu { display: flex; flex-direction: column; align-items: center; gap: 1.4mm }
.c5p031-tf { display: flex; align-items: center; justify-content: center; background: #fff; border: .45mm solid ${INK}; border-radius: 5mm; padding: 2.6mm 4mm; box-shadow: 0 .8mm 0 var(--s) }
.c5p031-cap { font: 700 12.5pt 'Baloo Da 2'; white-space: nowrap }
.c5p031-lp { background: #FEF08A; border-radius: 5mm; padding: 2.4mm 4mm 2mm 3mm; box-shadow: 0 .8mm 0 #FACC15 }
.c5p031-stk { align-self: flex-start; display: inline-flex; gap: 5mm; padding: 1.2mm 9mm .8mm; background: #fff; border: .45mm solid ${INK}; border-radius: 3mm; font: 700 14pt 'Baloo Da 2' }
.c5p031-sk { position: relative } .c5p031-sk::after { content: ""; position: absolute; left: -.6mm; right: -.6mm; top: 50%; border-top: .45mm solid #DC2626; transform: rotate(-58deg) }
.c5p031-st { position: relative; margin-top: 4.2mm; background: #FED7AA; border-radius: 4mm; padding: 7.2mm 5mm 2.6mm; box-shadow: 0 1mm 0 #FDBA74 }
.c5p031-stt { position: absolute; left: 50%; top: -4.2mm; transform: translateX(-50%); white-space: nowrap; background: #FB923C; color: #fff; font: 700 13pt 'Baloo Da 2'; padding: 1.2mm 8mm .6mm; border-radius: 2.4mm; box-shadow: 0 .7mm 0 #EA580C }
.c5p031-stl { display: grid; grid-template-columns: 9mm 1fr; row-gap: 1mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .c5p031-stm { font-weight: 600; color: #9A3412 }
.c5p031-form { display: grid; align-items: center; column-gap: 1.6mm; row-gap: 1.4mm; font: 500 12.5pt/1.35 'Noto Sans Bengali' }
.c5p031-form.c { justify-content: center }
.c5p031-fl { white-space: nowrap } .c5p031-fc { white-space: nowrap }
.c5p031-form .ansbox { min-width: 8mm; padding: .2mm 1.6mm; font-size: 12pt }
.c5p031-fc .abox { width: var(--bw, 9mm); height: 7mm; margin: 0 .5mm } .c5p031-fc .abox.c4p081-wbx { width: 15mm }
.c5p031-rule { border: .55mm solid; border-radius: 3mm; padding: 1.6mm 4mm 1.2mm; font: 600 12.5pt/1.5 'Noto Sans Bengali'; box-shadow: 0 .8mm 0 rgba(0,0,0,.06) }
.c5p031-rule.c { text-align: center }
.c5p031-eqs { width: 100%; table-layout: fixed; border-collapse: collapse; background: #fff; border: .6mm solid var(--c); border-radius: 2.6mm; box-shadow: 0 1mm 0 var(--s) }
.c5p031-eqs td { border-left: .3mm solid #D8B4FE; vertical-align: top; padding: 1.6mm 2mm; height: 22mm } .c5p031-eqs td:first-child { border-left: 0 }
.c5p031-eqc { display: grid; grid-template-columns: auto auto auto; justify-content: center; column-gap: 1.4mm; row-gap: .4mm; font: 700 13pt/1.45 'Baloo Da 2' }
.c5p031-eqc span:nth-child(3n+1) { text-align: right; min-width: 6mm }
.c5p031-tw .c4p081-tab td { border-color: #DDC6F7 }
.c5p031-lines { display: grid; grid-template-columns: auto 1fr; column-gap: 1.6mm; row-gap: .8mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .c5p031-lm { white-space: nowrap }
`,
};
