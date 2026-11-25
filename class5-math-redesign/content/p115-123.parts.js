// Printed pages 115–123's own kinds (prefixed c5p115_, classes c5p115-): chapter ৮ পরিমাপ, its first part (the units of length,
// weight and volume with ডেকা and হেক্টো, the map of distances, the truck's টন, the cubic units, দেখি পারি কি না, নিজে করি).
// Written by a helper (25 Nov 2026). Units: mm. The map's roads and distances and the three cubes are drawn here by code.
//
//   c5p115_ladder  { tab, rows: [[name, abbr, value, frac?]…], base?: 3, sep?: "বা" | "=", up?, down? }
//                  pp115, 118, 120: the book's box of units, its title on a tab: the bigger units over the base unit (its row
//                  highlighted), the smaller under it, an up arrow "বড়ো" and a down arrow "ছোটো" beside them; each row
//                  "name (abbr) = value" and, for the smaller units, "sep fraction" (frac takes the markup: "{{১/১০}} মি")
//   c5p115_facts   { items: ["১ কিলোমিটার = ১০ হেক্টোমিটার", …] }   the box of "1 unit = 10 units" in two columns, in
//                  reading order (row by row), each "=" lined up in its column
//   c5p115_form    { rows: [[cell…]…], cols?, bw?, sw?, size?, gap?, cgap?, indent? }   working in a grid, its columns lined up:
//                  a cell is markup or { t, span, al: "l" | "c" | "r" }. A cell that is a sign, "□" or "▫" is centred,
//                  any other is set left. □ is an answer box bw mm wide (16 by default), ▫ a small one sw mm (the book's box
//                  for the sign, p122)
//   c5p115_lines   { lines: [markup | [indent mm, markup]], bw?, size?, gap?, indent? }   lines one under another (never wrapped
//                  unless they must), □ bw mm wide
//   c5p115_map     { w, h, places: [{ pic, x, y, w, h, cap, cx?, cy?, ca? }], roads: [{ a: [x, y], b: [x, y], t, sw? }] }
//                  p117: the green map, each place a picture (x, y its top-left, mm) with its name (cx, cy: the name's
//                  centre, under the picture unless given; ca: "l" | "r" sets it from its left or right end); each road a
//                  white strip with dashed green edges from a to b (drawn under the pictures), a double arrow along it and
//                  its distance written along the road
//   c5p115_scene   { pic, w, h, frame?, tags: [{ x, y, w, h, text, fs?, bg?, color?, rot?, font? }] }   a picture with words
//                  painted on it by the build (p119's truck: "সমগ্র বাংলাদেশ ৫ টন"); x, y, w, h in % of the picture
//   c5p115_utab    { head: [3], rows: [[name, amount, unit]…], cols?, al2? }   pp118, 121: the table of goods, the last column a
//                  dotted line to write on, then the unit
//   c5p115_rule    { lines, tone? }   p119's tinted box of facts (∴ drawn as three dots)
//   c5p115_band    { text }           p115's yellow band (কীভাবে পরিমাপগুলো রূপান্তর করলাম …)
//   c5p115_cubes   {}                 p121: ১ ঘন সেমি (green), ১০ সেমি (red, 10 × 10 on each face, its corner cube green) and
//                  ১ মিটার (blue, 10 × 10 on each face: each square 10 cm, its corner cube red, the red cube's size), their
//                  edges' lengths, and the arrows from each corner cube to the cube it is
//   c5p115_tints   { items: [{ tone: "blue" | "pink" | "orange", text }] }   p121's three tinted boxes in a row
//   c5p115_exp     { ex, mark, text, side: block, sw, body? }   an exercise card whose heading stands beside a picture (p121),
//                  the body under both at full width
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;
const escx = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const THEREFORE = `<svg class="c5p115-th" viewBox="0 0 10 10"><circle cx="5" cy="1.7" r="1.45"/><circle cx="1.6" cy="8.3" r="1.45"/><circle cx="8.4" cy="8.3" r="1.45"/></svg>`;
const mdx = (ctx, s) => ctx.md(s == null ? "" : String(s)).replace(/∴\s?/g, THEREFORE).replace(/▫/g, `<span class="abox c5p115-sbx"></span>`);
const SIGN = /^\s*([=+−×÷<>]|□|▫)\s*$/;

// ── the box of units: bigger units, the base unit, smaller units ──
function ladderHtml(b, ctx) {
  const base = b.base ?? 3, n = b.rows.length, sep = b.sep || "বা";
  const head = (dir) => `<svg class="c5p115-ah" viewBox="0 0 10 8" width="3.6mm" height="2.9mm"><path d="${dir === "up" ? "M5 0L10 8H0Z" : "M5 8L10 0H0Z"}"/></svg>`;
  const arrow = (dir, from, span, label) => `<div class="c5p115-arw ${dir}" style="grid-row:${from} / span ${span}"><span class="c5p115-al">${escx(label)}</span><span class="c5p115-ac">${dir === "up" ? head("up") : ""}<i></i>${dir === "dn" ? head("dn") : ""}</span></div>`;
  let s = arrow("up", 1, base, b.up || "বড়ো") + arrow("dn", base + 2, n - base - 1, b.down || "ছোটো");
  s += `<i class="c5p115-hl" style="grid-row:${base + 1};grid-column:2 / 6"></i>`;
  b.rows.forEach((r, i) => {
    const g = `grid-row:${i + 1}`;
    s += `<span class="c5p115-ln" style="${g};grid-column:2">${mdx(ctx, r[0])}</span><span class="c5p115-ab" style="${g};grid-column:3">${mdx(ctx, r[1])}</span>`
      + `<b class="c5p115-eq" style="${g};grid-column:4">=</b><span class="c5p115-v" style="${g};grid-column:5">${mdx(ctx, r[2])}</span>`;
    if (r[3]) s += `<span class="c5p115-sep" style="${g};grid-column:6">${sep === "=" ? `<b class="c5p115-eq">=</b>` : escx(sep)}</span><span class="c5p115-fr" style="${g};grid-column:7">${mdx(ctx, r[3])}</span>`;
  });
  return `<div class="c5p115-lad"><span class="c5p115-tab">${escx(b.tab)}</span><div class="c5p115-lg">${s}</div></div>`;
}

// ── the map: pictures, roads with their distances ──
function mapHtml(b, ctx) {
  const W = b.w, H = b.h;
  let roads = "", texts = "";
  for (const r of b.roads) {
    const [x1, y1] = r.a, [x2, y2] = r.b, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    const sw = (r.sw || 6.4) / 2, ext = 2.5;
    const P = (t, k) => `${f2(x1 + ux * t + nx * k)} ${f2(y1 + uy * t + ny * k)}`;
    roads += `<path d="M${P(-ext, -sw)}L${P(L + ext, -sw)}L${P(L + ext, sw)}L${P(-ext, sw)}Z" fill="#fff"/>`
      + `<path d="M${P(-ext, -sw)}L${P(L + ext, -sw)}M${P(-ext, sw)}L${P(L + ext, sw)}" stroke="#16A34A" stroke-width=".45" stroke-dasharray="1.6 1"/>`;
    // the double arrow, a gap left for the distance in the middle
    const head = (t, dir) => { const tx = x1 + ux * t, ty = y1 + uy * t, bx = tx - ux * 2.2 * dir, by = ty - uy * 2.2 * dir;
      return `<path d="M${f2(tx)} ${f2(ty)}L${f2(bx + nx * .85)} ${f2(by + ny * .85)}L${f2(bx - nx * .85)} ${f2(by - ny * .85)}Z" fill="${INK}"/>`; };
    roads += `<path d="M${P(1.2, 0)}L${P(L - 1.2, 0)}" stroke="${INK}" stroke-width=".3"/>${head(.6, -1)}${head(L - .6, 1)}`;
    let ang = Math.atan2(dy, dx) * 180 / Math.PI; if (ang > 90) ang -= 180; if (ang < -90) ang += 180;
    const mx = (x1 + x2) / 2 + (r.dt || 0) * ux, my = (y1 + y2) / 2 + (r.dt || 0) * uy;
    texts += `<text x="${f2(mx)}" y="${f2(my)}" transform="rotate(${f2(ang)} ${f2(mx)} ${f2(my)})" text-anchor="middle" dominant-baseline="central" class="c5p115-mt">${escx(r.t)}</text>`;
  }
  const pics = b.places.map((p) => {
    // a place may be a shared sticker (Claude, 25 Nov 2026: the series' icons for houses, the clinic, the tree, so the map's
    // seven places need three new stickers, not seven pictures); until that sticker exists, the place's own picture or stand-in
    const s = p.sticker && ctx.sticker(p.sticker), f = s ? null : ctx.picFile(p.pic);
    const img = s ? `<img src="${s}" style="object-fit:contain">` : f ? `<img src="file://${f.file}">${f.old ? `<span class="tag">stand-in</span>` : ""}` : `<div class="ph">ChatGPT: ${escx(p.pic)}.png</div>`;
    const cx = p.cx ?? p.x + p.w / 2, cy = p.cy ?? p.y + p.h + 3.2, tr = p.ca === "l" ? "translate(0, -50%)" : p.ca === "r" ? "translate(-100%, -50%)" : "translate(-50%, -50%)";
    return `<div class="c5p115-mp" style="left:${p.x}mm;top:${p.y}mm;width:${p.w}mm;height:${p.h}mm">${img}</div>`
      + `<span class="c5p115-mc" style="left:${cx}mm;top:${cy}mm;transform:${tr};text-align:${p.ca === "l" ? "left" : p.ca === "r" ? "right" : "center"}">${ctx.br(p.cap)}</span>`;
  }).join("");
  return `<div class="c5p115-map" style="width:${W}mm;height:${H}mm"><svg class="c5p115-svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${roads}</svg>${pics}<svg class="c5p115-svg c5p115-top" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${texts}</svg></div>`;
}

// ── p121's three cubes (corner facing us: the left and right faces, the top) ──
function cubesSvg() {
  const A = 21 * Math.PI / 180, ca = Math.cos(A), sa = Math.sin(A);
  const C = {
    green: { top: "#86EFAC", left: "#22C55E", right: "#15803D", line: "#14532D" },
    red: { top: "#FCA5A5", left: "#EF4444", right: "#B91C1C", line: "#FECACA" },
    blue: { top: "#818CF8", left: "#4F46E5", right: "#3730A3", line: "#C7D2FE" },
  };
  const pt = (p) => `${f2(p[0])} ${f2(p[1])}`, add = (...v) => v.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]), mul = (v, k) => [v[0] * k, v[1] * k];
  const quad = (p, u, v, fill, extra = "") => `<path d="M${pt(p)}L${pt(add(p, u))}L${pt(add(p, u, v))}L${pt(add(p, v))}Z" fill="${fill}"${extra}/>`;
  let out = "", labs = "";
  // one cube: T its near top corner; s its edge; n squares a side (0: none); hi the corner cube's colours
  const cube = (T, s, col, n, hi, dims) => {
    const R = [s * ca, -s * sa], L = [-s * ca, -s * sa], D = [0, s], c = C[col];
    let g = quad(T, R, L, c.top) + quad(T, L, D, c.left) + quad(T, R, D, c.right);
    if (n) {
      let d = "";
      for (let i = 1; i < n; i++) {
        const k = i / n;
        d += `M${pt(add(T, mul(R, k)))}L${pt(add(T, mul(R, k), D))}M${pt(add(T, mul(D, k)))}L${pt(add(T, mul(D, k), R))}`; // right face
        d += `M${pt(add(T, mul(L, k)))}L${pt(add(T, mul(L, k), D))}M${pt(add(T, mul(D, k)))}L${pt(add(T, mul(D, k), L))}`; // left face
        d += `M${pt(add(T, mul(R, k)))}L${pt(add(T, mul(R, k), L))}M${pt(add(T, mul(L, k)))}L${pt(add(T, mul(L, k), R))}`; // top
      }
      g += `<path d="${d}" stroke="${c.line}" stroke-width=".16" opacity=".85" fill="none"/>`;
    }
    if (hi) { const k = 1 / n, h = C[hi]; g += quad(T, mul(R, k), mul(L, k), h.top) + quad(T, mul(L, k), mul(D, k), h.left) + quad(T, mul(R, k), mul(D, k), h.right); }
    g += `<path d="M${pt(T)}L${pt(add(T, R))}L${pt(add(T, R, L))}L${pt(add(T, L))}ZM${pt(T)}V${f2(T[1] + s)}M${pt(add(T, L))}L${pt(add(T, L, D))}L${pt(add(T, D))}L${pt(add(T, R, D))}L${pt(add(T, R))}" stroke="${INK}" stroke-width=".25" stroke-opacity=".55" fill="none" stroke-linejoin="round"/>`;
    // the edges' lengths: a double arrow beside the edge, the words along it, away from the cube
    const edges = { lv: [add(T, L), add(T, L, D)], rv: [add(T, R), add(T, R, D)], bl: [add(T, L, D), add(T, D)], br: [add(T, D), add(T, R, D)], tl: [add(T, L, R), add(T, L)], tr: [add(T, R), add(T, R, L)] };
    const mid = add(T, mul(D, .5));
    for (const [e, text, fs] of dims) {
      const [p, q] = edges[e], dx = q[0] - p[0], dy = q[1] - p[1], Ln = Math.hypot(dx, dy), ux = dx / Ln, uy = dy / Ln;
      let nx = -uy, ny = ux; const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
      if ((m[0] - mid[0]) * nx + (m[1] - mid[1]) * ny < 0) { nx = -nx; ny = -ny; }
      const o = 1.6, a = [p[0] + nx * o + ux * .3, p[1] + ny * o + uy * .3], b = [q[0] + nx * o - ux * .3, q[1] + ny * o - uy * .3];
      const hd = (t, dir) => { const bx = t[0] - ux * 1.5 * dir, by = t[1] - uy * 1.5 * dir; return `<path d="M${pt(t)}L${f2(bx + nx * .6)} ${f2(by + ny * .6)}L${f2(bx - nx * .6)} ${f2(by - ny * .6)}Z" fill="${INK}"/>`; };
      labs += `<path d="M${pt(a)}L${pt(b)}" stroke="${INK}" stroke-width=".25"/>${hd(a, -1)}${hd(b, 1)}`;
      let ang = Math.atan2(dy, dx) * 180 / Math.PI; if (ang >= 90) ang -= 180; if (ang < -90) ang += 180;
      const tx = m[0] + nx * (o + fs * .62), ty = m[1] + ny * (o + fs * .62);
      labs += `<text x="${f2(tx)}" y="${f2(ty)}" transform="rotate(${f2(ang)} ${f2(tx)} ${f2(ty)})" text-anchor="middle" dominant-baseline="central" class="c5p115-ct" font-size="${fs}">${escx(text)}</text>`;
    }
    out += g;
    return { T, R, L, D, s, n };
  };
  // the arrow from a corner cube (its centre) to the cube it stands for
  const arrow = (from, to) => {
    const dx = to[0] - from[0], dy = to[1] - from[1], Ln = Math.hypot(dx, dy), ux = dx / Ln, uy = dy / Ln, bx = to[0] - ux * 2.2, by = to[1] - uy * 2.2;
    return `<circle cx="${f2(from[0])}" cy="${f2(from[1])}" r=".55" fill="${INK}"/><path d="M${pt(from)}L${f2(bx)} ${f2(by)}" stroke="${INK}" stroke-width=".35"/><path d="M${pt(to)}L${f2(bx - uy * .9)} ${f2(by + ux * .9)}L${f2(bx + uy * .9)} ${f2(by - ux * .9)}Z" fill="${INK}"/>`;
  };
  const corner = (c) => add(c.T, mul(add(c.R, c.L, c.D), .5 / c.n));
  const g = cube([22, 24], 10, "green", 0, null, [["tl", "১ সেমি", 2.6], ["lv", "১ সেমি", 2.6], ["bl", "১ সেমি", 2.6]]);
  g.n = 1;
  const r = cube([80, 22.5], 21, "red", 10, "green", [["lv", "১০ সেমি", 3], ["bl", "১০ সেমি", 3], ["br", "১০ সেমি", 3]]);
  const b = cube([136, 23], 24, "blue", 10, "red", [["tl", "১ মিটার", 3.1], ["tr", "১ মিটার", 3.1], ["rv", "১ মিটার", 3.1]]);
  out += arrow(corner(r), add(g.T, g.R, mul(g.D, .5), [1.6, 0])) + arrow(corner(b), add(r.T, r.R, mul(r.D, .5), [1.8, 0])) + labs;
  const W = 166, H = 51;
  return `<svg class="c5p115-svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${out}</svg>`;
}

const TINT = { blue: ["#DBEAFE", "#60A5FA"], pink: ["#FCE7F3", "#F472B6"], orange: ["#FFEDD5", "#FB923C"], peach: ["#FFE4D6", "#F4A27A"] };

module.exports = {
  kinds: {
    c5p115_ladder: (b, ctx) => ladderHtml(b, ctx),
    c5p115_facts: (b, ctx) => `<div class="c5p115-facts">${b.items.map((t, i) => { const [l, r] = t.split(/\s*=\s*/); return `${i % 2 ? "<i></i>" : ""}<span class="l">${mdx(ctx, l)}</span><b class="c5p115-eq">=</b><span class="r">${mdx(ctx, r)}</span>`; }).join("")}</div>`,
    c5p115_form: (b, ctx) => {
      const n = Math.max(...b.rows.map((r) => r.reduce((k, c) => k + ((c && c.span) || 1), 0)));
      const cols = b.cols || Array(n).fill("auto");
      const cells = b.rows.map((r) => r.map((c, i) => {
        const o = typeof c === "object" && c ? c : { t: c }, t = o.t == null ? "" : String(o.t);
        const al = o.al || (i === 0 ? "l" : SIGN.test(t) ? "c" : "l");
        return `<span class="c5p115-fc" style="text-align:${al === "c" ? "center" : al === "r" ? "right" : "left"};${o.span ? `grid-column:span ${o.span};` : ""}">${mdx(ctx, t)}</span>`;
      }).join("") + (r.reduce((k, c) => k + ((c && c.span) || 1), 0) < n ? `<span style="grid-column:span ${n - r.reduce((k, c) => k + ((c && c.span) || 1), 0)}"></span>` : "")).join("");
      return `<div class="c5p115-form" style="grid-template-columns:${cols.join(" ")};--bw:${b.bw || 16}mm;--sw:${b.sw || 7}mm;${b.size ? `font-size:${b.size}pt;` : ""}${b.gap != null ? `row-gap:${b.gap}mm;` : ""}${b.cgap != null ? `column-gap:${b.cgap}mm;` : ""}${b.indent ? `margin-left:${b.indent}mm;` : ""}">${cells}</div>`;
    },
    c5p115_lines: (b, ctx) => `<div class="c5p115-lines" style="--bw:${b.bw || 16}mm;${b.size ? `font-size:${b.size}pt;` : ""}${b.gap != null ? `gap:${b.gap}mm;` : ""}${b.indent ? `padding-left:${b.indent}mm;` : ""}">${b.lines.map((l) => Array.isArray(l) ? `<div style="padding-left:${l[0]}mm">${mdx(ctx, l[1])}</div>` : `<div>${mdx(ctx, l)}</div>`).join("")}</div>`,
    c5p115_map: (b, ctx) => mapHtml(b, ctx),
    c5p115_scene: (b, ctx) => {
      const f = ctx.picFile(b.pic), img = f ? `<img src="file://${f.file}">${f.old ? `<span class="tag">stand-in</span>` : ""}` : `<div class="ph">ChatGPT: ${escx(b.pic)}.png</div>`;
      const tags = (b.tags || []).map((t) => `<span class="c5p115-tg" style="left:${t.x}%;top:${t.y}%;width:${t.w}%;height:${t.h}%;font-size:${t.fs || 10}pt;${t.bg ? `background:${t.bg};` : ""}${t.color ? `color:${t.color};` : ""}${t.rot ? `transform:rotate(${t.rot}deg);` : ""}${t.font ? `font-family:${t.font};` : ""}">${mdx(ctx, t.text)}</span>`).join("");
      return `<div class="c5p115-scene${b.frame ? " fr" : ""}" style="width:${b.w}mm;height:${b.h}mm">${img}${tags}</div>`;
    },
    c5p115_utab: (b, ctx) => {
      const cols = b.cols || ["36%", "28%", "36%"];
      return `<table class="c5p115-ut"><colgroup>${cols.map((c) => `<col style="width:${c}">`).join("")}</colgroup><thead><tr>${b.head.map((h) => `<th>${mdx(ctx, h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map(([a, m, u]) =>
        `<tr><td class="n">${mdx(ctx, a)}</td><td class="a" style="text-align:${b.al2 === "l" ? "left" : "center"}">${mdx(ctx, m)}</td><td class="u"><div><i></i><span>${mdx(ctx, u)}</span></div></td></tr>`).join("")}</tbody></table>`;
    },
    c5p115_rule: (b, ctx) => { const [bg, bd] = TINT[b.tone || "peach"]; return `<div class="c5p115-rule" style="background:${bg};border-color:${bd}">${b.lines.map((l) => `<div>${mdx(ctx, l)}</div>`).join("")}</div>`; },
    c5p115_band: (b, ctx) => `<div class="c5p115-band">${mdx(ctx, b.text)}</div>`,
    c5p115_cubes: () => `<div class="c5p115-cubes">${cubesSvg()}</div>`,
    c5p115_tints: (b, ctx) => `<div class="c5p115-tints">${b.items.map((it) => { const [bg, bd] = TINT[it.tone] || TINT.blue; return `<div class="c5p115-tint" style="background:${bg};border-color:${bd}"><span>${mdx(ctx, it.text)}</span>${it.eq ? `<b>${mdx(ctx, it.eq)}</b>` : ""}</div>`; }).join("")}</div>`,
    c5p115_exp: (b, ctx, page) => `<div class="ex m-${b.mark}"><div class="c5p115-exh"><div class="ext wm">${ctx.exMark(b.mark, b.ex)}<span>${mdx(ctx, b.text)}</span></div><div class="c5p115-exs" style="flex:0 0 ${b.sw || 36}mm">${ctx.blockHtml(b.side, page)}</div></div>${(b.body || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
  },
  css: `
.c5p115-svg { display: block; overflow: visible }
.c5p115-th { display: inline-block; width: .56em; height: .56em; fill: currentColor; vertical-align: -.02em; margin-right: .18em }
.c5p115-lad { position: relative; margin-top: 3.4mm; border: .6mm solid var(--c); border-radius: 5mm; background: #fff; padding: 6.4mm 6mm 2.6mm 4mm; box-shadow: 0 1.2mm 0 var(--s) }
.c5p115-tab { position: absolute; left: 50%; top: -3.6mm; transform: translateX(-50%); white-space: nowrap; background: var(--c); color: #fff; font: 700 12.5pt/1 'Baloo Da 2'; padding: 1.7mm 6mm 1.1mm; border-radius: 2.4mm; box-shadow: 0 .7mm 0 var(--d) }
.c5p115-lg { display: grid; grid-template-columns: 13mm auto auto 9mm auto 9mm auto; grid-auto-rows: minmax(8.2mm, auto); justify-content: start; align-items: center; column-gap: 2mm; row-gap: .7mm; font: 600 12.5pt/1.3 'Noto Sans Bengali'; color: ${INK} }
.c5p115-lg > span, .c5p115-lg > b { position: relative; z-index: 1; white-space: nowrap }
.c5p115-v { text-align: right } .c5p115-sep { text-align: center } .c5p115-lg .c5p115-eq { text-align: center }
.c5p115-eq { color: #DC2626; font: 800 13pt 'Baloo Da 2' }
.c5p115-hl { grid-column: 2 / 6; align-self: stretch; margin: .5mm -2mm; background: #E0E7FF; border: .45mm solid var(--c); border-radius: 1.8mm; z-index: 0 }
.c5p115-arw { grid-column: 1; align-self: stretch; display: flex; align-items: stretch; justify-content: center; gap: .6mm; padding: 1.2mm 0 }
.c5p115-arw.up { color: #EA580C } .c5p115-arw.dn { color: #0D9488 }
.c5p115-al { writing-mode: vertical-rl; transform: rotate(180deg); font: 700 11.5pt/1 'Noto Sans Bengali'; text-align: center }
.c5p115-ac { display: flex; flex-direction: column; align-items: center; width: 3.6mm } .c5p115-ac i { flex: 1; width: .7mm; background: currentColor; border-radius: .3mm } .c5p115-ah { display: block; fill: currentColor; flex: none }
.c5p115-facts { display: grid; grid-template-columns: auto auto auto 14mm auto auto auto; justify-content: center; column-gap: 1.6mm; row-gap: 1mm; align-items: center; border: .5mm solid var(--c); border-radius: 4mm; background: var(--s); padding: 2.2mm 7mm 1.8mm; font: 600 12.5pt/1.45 'Noto Sans Bengali'; color: ${INK} }
.c5p115-facts span { white-space: nowrap }
.c5p115-form { display: grid; justify-content: start; align-items: center; column-gap: 1.6mm; row-gap: 2mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.c5p115-fc { white-space: nowrap } .c5p115-form .abox, .c5p115-lines .abox { width: var(--bw); height: 7.4mm } .c5p115-form .c5p115-sbx { width: var(--sw) !important }
.c5p115-lines { display: flex; flex-direction: column; gap: 2mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .c5p115-lines > div { white-space: nowrap }
.c5p115-map { position: relative; flex: none; align-self: center; background: #ECFCCB; border: .6mm solid #84CC16; border-radius: 4mm; box-shadow: 0 1mm 0 #D9F99D }
.c5p115-map > svg { position: absolute; left: 0; top: 0 } .c5p115-map > .c5p115-top { z-index: 3; pointer-events: none }
.c5p115-mt { font-family: 'Noto Sans Bengali'; font-weight: 700; font-size: 3.1px; fill: ${INK}; stroke: #fff; stroke-width: 1.1px; paint-order: stroke; stroke-linejoin: round }
.c5p115-mp { position: absolute; z-index: 2; border-radius: 1.6mm; overflow: hidden; border: .6mm solid #fff; box-shadow: 0 .5mm 1.2mm rgba(0,0,0,.25) }
.c5p115-mp img { width: 100%; height: 100%; object-fit: cover; display: block } .c5p115-mp .tag { font-size: 5pt }
.c5p115-mc { position: absolute; z-index: 2; white-space: nowrap; font: 700 9.5pt/1.15 'Noto Sans Bengali'; color: #3F6212 }
.c5p115-scene { position: relative; flex: none; align-self: center }
.c5p115-scene > img { width: 100%; height: 100%; object-fit: fill; display: block }
.c5p115-scene.fr { border-radius: 4mm; overflow: hidden; border: .9mm solid #fff; box-shadow: 0 0 0 .7mm var(--c), 0 1.6mm 0 .7mm var(--s) }
.c5p115-tg { position: absolute; display: flex; align-items: center; justify-content: center; white-space: nowrap; font-family: 'Baloo Da 2'; font-weight: 800; line-height: 1; color: #fff; padding-top: .4mm; box-sizing: border-box }
.c5p115-ut { width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0; border: .6mm solid var(--c); border-radius: 3mm; overflow: hidden; background: #fff }
.c5p115-ut th { background: var(--c); color: #fff; font: 700 11.5pt/1.25 'Noto Sans Bengali'; padding: 1.4mm 1mm 1.1mm; border-left: .3mm solid rgba(255,255,255,.5) } .c5p115-ut th:first-child { border-left: 0 }
.c5p115-ut td { font: 600 12pt/1.3 'Noto Sans Bengali'; padding: 1.3mm 2.6mm 1.1mm; height: 8.2mm; border-top: .3mm solid #C7D2FE; border-left: .3mm solid #C7D2FE } .c5p115-ut td:first-child { border-left: 0 }
.c5p115-ut tr:nth-child(even) td { background: #F5F7FF }
.c5p115-ut td.u > div { display: flex; align-items: flex-end; gap: 1.6mm } .c5p115-ut td.u i { flex: 1; border-bottom: .5mm dotted #64748B; margin-bottom: 1.4mm } .c5p115-ut td.u span { white-space: nowrap }
.c5p115-rule { display: flex; flex-direction: column; gap: .6mm; border: .5mm solid; border-radius: 3mm; padding: 2mm 5mm 1.6mm; font: 600 12.5pt/1.45 'Noto Sans Bengali'; color: ${INK} }
.c5p115-band { align-self: stretch; text-align: center; font: 700 13pt/1.3 'Noto Sans Bengali'; color: #713F12; background: #FDE047; border-radius: 2.4mm; padding: 1.8mm 0 1.4mm; box-shadow: 0 .9mm 0 #EAB308 }
.c5p115-cubes { display: flex; justify-content: center }
.c5p115-ct { font-family: 'Noto Sans Bengali'; font-weight: 700; fill: ${INK}; stroke: #fff; stroke-width: .9px; paint-order: stroke; stroke-linejoin: round }
.c5p115-tints { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.6mm }
.c5p115-tint { display: flex; flex-direction: column; justify-content: space-between; gap: 1mm; border: .5mm solid; border-radius: 3mm; padding: 2mm 3mm 1.6mm; font: 600 11.5pt/1.5 'Noto Sans Bengali'; color: ${INK} } .c5p115-tint > b { font: 700 12pt/1.4 'Noto Sans Bengali'; color: var(--d) }
.c5p115-exh { display: flex; align-items: center; gap: 3mm } .c5p115-exh > .ext { flex: 1; min-width: 0 }
.c5p115-exs { display: flex; justify-content: center }
`,
};
