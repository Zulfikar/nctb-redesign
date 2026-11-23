// Own kinds for printed pages 88–101 (chapter 3 গুণ: the 6–10, 1 and 0 times tables, the 10 × 10 table, arrays, flowers).
// Everything that is counted is drawn here, so every count is exact. Units: mm.
const INK = "#1E2433";
// the look of the chapter's 100-dot sheet (content/p073-087.parts.js, p073_ldots): ink dots, the counted ones in the chapter
// colour on its tint, grey lines, the yellow L strip
const DOT = "var(--c)", TINT = "var(--s)", DOT_OFF = INK, DOT_HL = "#EA580C", DOT_OLD = "#EC4899";
const LINE = "#94A3B8", EDGE = "#334155";
const MARBLES = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#A855F7", "#EC4899"];
const f = (n) => +n.toFixed(2);
const T = (x, y, s, size, col = INK) => `<text x="${f(x)}" y="${f(y)}" font-family="Baloo Da 2" font-weight="800" font-size="${size}" text-anchor="middle" style="fill:${col}">${s}</text>`;

/** One square cell with a dot (the colours may be CSS variables, so they go in style). */
function cellDot(x, y, s, fill, bg = "#fff", ring = false) {
  return `<rect x="${f(x)}" y="${f(y)}" width="${s}" height="${s}" style="fill:${bg}" stroke="${LINE}" stroke-width="${f(Math.min(0.28, s * 0.055))}"/>` +
    (fill ? `<circle cx="${f(x + s / 2)}" cy="${f(y + s / 2)}" r="${f(s * 0.36)}" style="fill:${fill}"${ring ? ` stroke="rgba(0,0,0,.25)" stroke-width="${f(s * 0.04)}"` : ""}/>` : "");
}
/** rows × cols dots in cells at (x, y), the chapter colour on its tint; hl = the first hl columns in orange (with a dashed
 * line after them); marble = coloured marbles. */
function arr(x, y, rows, cols, s, { hl = 0, marble = false } = {}) {
  let o = "";
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const inHl = c < hl;
    o += cellDot(x + c * s, y + r * s, s, marble ? MARBLES[(r * 7 + c * 3) % MARBLES.length] : inHl ? DOT_HL : DOT, marble ? "#fff" : inHl ? "#FFEDD5" : TINT, marble);
  }
  o += `<rect x="${f(x)}" y="${f(y)}" width="${f(cols * s)}" height="${f(rows * s)}" fill="none" stroke="${EDGE}" stroke-width=".4"/>`;
  if (hl) o += `<path d="M${f(x + hl * s)} ${f(y - s * 0.25)}V${f(y + rows * s + s * 0.25)}" stroke="#DC2626" stroke-width="${f(s * 0.09)}" stroke-dasharray="${f(s * 0.22)} ${f(s * 0.16)}"/>`;
  return o;
}
const svg = (w, h, inner, cls = "p088-svg") => `<svg class="${cls}" width="${f(w)}mm" height="${f(h)}mm" viewBox="0 0 ${f(w)} ${f(h)}">${inner}</svg>`;
/** A fat block arrow pointing right (dir 0) or down (dir 90), from its tail's centre (x, y). */
function blockArrow(x, y, len, wd, fill, stroke, dir = 0) {
  const hw = wd / 2, head = wd * 1.0, hh = wd * 0.95;
  const d = `M0 ${-hw * 0.55}H${len - head}V${-hh}L${len} 0L${len - head} ${hh}V${hw * 0.55}H0Z`;
  return `<path d="${d}" transform="translate(${f(x)} ${f(y)}) rotate(${dir})" style="fill:${fill};stroke:${stroke}" stroke-width="${f(wd * 0.09)}" stroke-linejoin="round"/>`;
}

/** The L-shaped paper on the 100-dot chart (pp. 88, 90, 92, 93, 94), in the look of p073_ldots, with the book's slide: the
 * rows of dots seen above the paper's arm, its upright at the 8th column, its old place (pink, dashed) at column `old` and
 * the two arrows; brackets on top ([label, n columns]), a label on the left, or a bracket down the side. */
function lgrid({ rows, old, top = [], left, bracket, s = 5.2 }) {
  const over = s * 0.95, arrowsH = s * 1.7, brH = top.length ? s * 1.1 * top.length + s * 0.35 : 0, ext = Math.max(s * 1.5, brH + s * 0.15);
  const ML = over + (bracket ? s * 1.8 : s * 0.3), MT = arrowsH + ext + s * 0.1;
  const gx = ML, gy = MT, armY = rows < 10 ? gy + rows * s : gy + 10 * s + s * 0.3;
  const H = Math.max(gy + 10 * s, armY + s) + s * 0.25, W = gx + 10 * s + s * 0.5;
  let o = "";
  for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
    const counted = r < rows && c < 7, isOld = counted && c === old - 1;
    o += cellDot(gx + c * s, gy + r * s, s, isOld ? DOT_OLD : counted ? DOT : DOT_OFF, isOld ? "#FCE7F3" : counted ? TINT : "#fff");
  }
  o += `<rect x="${f(gx)}" y="${f(gy)}" width="${f(10 * s)}" height="${f(10 * s)}" fill="none" stroke="${EDGE}" stroke-width=".4"/>`;
  // the paper's old place: a pink dashed upright over column `old`
  const ox = gx + (old - 1) * s;
  o += `<rect x="${f(ox)}" y="${f(gy - ext)}" width="${f(s)}" height="${f(armY - gy + ext)}" fill="#FBCFE8" fill-opacity=".35" stroke="${DOT_OLD}" stroke-width="${f(s * 0.07)}" stroke-dasharray="${f(s * 0.22)} ${f(s * 0.14)}"/>`;
  // the L-shaped paper (upright over the 8th column, arm under the rows), yellow as in p073_ldots
  const px = gx + 7 * s;
  const L = `M${f(px)} ${f(gy - ext)}H${f(px + s)}V${f(armY + s)}H${f(gx - over)}V${f(armY)}H${f(px)}Z`;
  o += `<path d="${L}" transform="translate(.5 .7)" fill="rgba(30,36,51,.16)"/><path d="${L}" fill="#FEF9C3" stroke="#CA8A04" stroke-width=".45" stroke-linejoin="round"/>`;
  // the slide: a pink arrow from the old place, a white one to the new place
  const ay = arrowsH * 0.5;
  o += blockArrow(ox - s * 0.4, ay, px + s * 0.6 - (ox - s * 0.4), s * 0.85, "#F9A8D4", "#DB2777");
  o += blockArrow(px - s * 0.6, ay, s * 2.6, s * 0.85, "#fff", "#CA8A04");
  // the brackets on top: from the first column's centre to the nth column's centre
  top.forEach(([lab, n], i) => {
    const y = gy - s * 0.35 - s * 1.1 * (top.length - i), x1 = gx + s * 0.5 - (top.length - 1 - i) * s * 0.18, x2 = gx + (n - 0.5) * s;
    const ah = (x) => `<path d="M${f(x - s * 0.16)} ${f(gy - s * 0.42)}L${f(x)} ${f(gy - s * 0.12)}L${f(x + s * 0.16)} ${f(gy - s * 0.42)}Z" fill="${INK}"/>`;
    o += `<path d="M${f(x1)} ${f(gy - s * 0.3)}V${f(y)}H${f(x2)}V${f(gy - s * 0.3)}" fill="none" stroke="${INK}" stroke-width="${f(s * 0.06)}"/>${ah(x1)}${ah(x2)}`;
    o += `<rect x="${f((x1 + x2) / 2 - s * 0.6)}" y="${f(y - s * 0.5)}" width="${f(s * 1.2)}" height="${f(s * 1)}" fill="#fff"/>` + T((x1 + x2) / 2, y + s * 0.34, lab, f(s * 1.0), "var(--d)");
  });
  if (left) o += T(gx - s * 0.62, gy + rows * s / 2 + s * 0.36, left, f(s * 1.05), "var(--d)");
  if (bracket) o += `<path d="M${f(s * 1.5)} ${f(gy + s * 0.1)}H${f(s * 1.15)}V${f(gy + 10 * s - s * 0.1)}H${f(s * 1.5)}" fill="none" stroke="${INK}" stroke-width="${f(s * 0.07)}"/><rect x="${f(s * 0.2)}" y="${f(gy + 5 * s - s * 0.7)}" width="${f(s * 1.5)}" height="${f(s * 1.4)}" fill="#fff"/>` + T(s * 1.0, gy + 5 * s + s * 0.36, bracket, f(s * 0.95), "var(--d)");
  return svg(W, H, o);
}

/** pp. 89, 91: the array, the scissors, and the two smaller arrays it is cut into, each with its label on the left. */
function split({ rows, cut, hl, labels, s = 4.7 }) {
  const W = 10 * s;
  const big = svg(W + s * 3.4, rows * s + 1, arr(0.5, 0.5, rows, 10, s, { hl }) +
    `<path d="M${f(W + 0.5)} ${f(0.5 + cut * s)}H${f(W + s * 1.6)}" stroke="${INK}" stroke-width="${f(s * 0.07)}" stroke-dasharray="${f(s * 0.1)} ${f(s * 0.12)}"/>` +
    `<text x="${f(W + s * 1.4)}" y="${f(0.5 + cut * s + s * 0.62)}" font-family="Noto Color Emoji" font-size="${f(s * 1.6)}">✂️</text>`);
  const part = (n) => svg(W + s * 3.4, n * s + 1, arr(0.5, 0.5, n, 10, s, { hl }));
  const down = svg(W + s * 3.4, s * 2.3, blockArrow(W / 2, s * 0.1, s * 2, s * 1.4, "var(--s)", "var(--d)", 90));
  const row = (lab, html) => `<div class="p088-sr"><span class="p088-sl">${lab}</span>${html}</div>`;
  return `<div class="p088-split">${row(labels[0], big)}${row("", down)}${row(labels[1], part(cut))}${row(labels[2], part(rows - cut))}</div>`;
}

/** A times-table card in the look of p073_namta whose rows may hold answer boxes ("৬×৩=□", "৭×১=[[৭]]"). */
const namta = ({ title, rows, tone = "blue" }, ctx) => `<div class="p073-namta p088-nbx tone-${tone}">${title ? `<div class="p073-nh">${ctx.md(title)}</div>` : ""}${rows.map((r) => `<div class="p073-nl">${ctx.md(r)}</div>`).join("")}</div>`;
/** The book's blue scroll in the look of p073_scroll, with its own lines: [left, answer] ("৭×১=", "[[৭]]" or "□"). */
const CURL = `<svg class="p073-curl" viewBox="0 0 100 24" preserveAspectRatio="none"><path d="M0 0H100C95.5 7 95.5 16 100 24H9C3 24 0 19 0 12Z" fill="#7DD3FC" stroke="#0EA5E9" stroke-width="1" vector-effect="non-scaling-stroke"/><path d="M0 0C0 8 4 12 9 12" fill="none" stroke="#0EA5E9" stroke-width="1" vector-effect="non-scaling-stroke"/></svg>`;
const scroll = ({ rows }, ctx) => `<div class="p073-scroll p088-scroll"><div class="p073-paper">${rows.map(([l, a]) => `<div class="p073-sr"><span>${ctx.md(l)}</span>${ctx.md(a)}</div>`).join("")}</div>${CURL}</div>`;
/** The book's green-square problems in the look of p073_qs; a problem may carry blocks under its line (body). */
const qs = ({ items }, ctx, page) => `<div class="p073-qs">${items.map((q) => `<div class="p073-q"><span class="p073-sq">${ctx.esc(q.n || "")}</span><div class="p073-qt">${ctx.md(q.text)}${q.body ? `<div class="p088-qb">${q.body.map((b) => ctx.blockHtml(b, page)).join("")}</div>` : ""}</div></div>`).join("")}</div>`;

/** A child's speech card (the core's) with extras inside the bubble: equations in columns (eqs, cols) and a line after them,
 * a row of n dots, or a sum written under a line. */
function say({ who, mood = "talk", text, eqs, cols = 2, after, dots, sum }, ctx, page) {
  let extra = "";
  if (eqs) extra += `<div class="p088-eqs" style="grid-template-columns:repeat(${cols}, auto)">${eqs.map((e) => `<span>${ctx.md(e)}</span>`).join("")}</div>`;
  if (after) extra += `<div>${ctx.md(after)}</div>`;
  if (dots) extra = `<div class="p088-sx">${svg(dots * 4.6 + 1, 5.6, arr(0.5, 0.5, 1, dots, 4.6))}</div>`;
  if (sum) extra = `<div class="p088-sum">${sum.map((l, i) => `<span class="${i === sum.length - 2 ? "u" : i === sum.length - 1 ? "t" : ""}">${ctx.md(l)}</span>`).join("")}</div>`;
  const html = ctx.blockHtml({ say: who, mood, text }, page);
  return html.replace(/(<div class="sb">[\s\S]*?)<\/div>/, `$1${extra}</div>`);
}

/** A plain dot array (rows × cols), optionally the first hl columns in orange, or coloured marbles. */
const dots = ({ rows, cols, s = 4.6, hl, marble }) => svg(cols * s + 1, rows * s + 1, arr(0.5, 0.5, rows, cols, s, { hl, marble }));

/** p. 98: three rows of four marbles, turned into four rows of three (with a curved arrow). */
function swap({ s = 4.8 }) {
  const W = s * 9.6, H = s * 7.6;
  const a = arr(0.5, H - 3 * s - 0.5, 3, 4, s, { marble: true }), b = arr(W - 3 * s - 0.5, 0.5, 4, 3, s, { marble: true });
  const p = `M${f(s * 2)} ${f(H - 3 * s - s * 0.4)}V${f(s * 1.9)}Q${f(s * 2)} ${f(s * 1.3)} ${f(s * 2.6)} ${f(s * 1.3)}H${f(W - 3 * s - s * 0.9)}`;
  return svg(W, H, `${a}${b}<path d="${p}" fill="none" stroke="#D97706" stroke-width="${f(s * 0.32)}" stroke-linecap="round"/><path d="M${f(W - 3 * s - s * 1.1)} ${f(s * 0.75)}L${f(W - 3 * s - s * 0.2)} ${f(s * 1.3)}L${f(W - 3 * s - s * 1.1)} ${f(s * 1.85)}Z" fill="#D97706"/>`);
}

/** Bars of n dots (p. 98), perRow bars in a row. */
function bars({ bars: k, n, perRow = 2, s = 5 }) {
  const bw = n * s + s * 0.5, bh = s * 1.3, gx = s * 1.2, gy = s * 0.6, rows = Math.ceil(k / perRow);
  let o = "";
  for (let i = 0; i < k; i++) {
    const x = 0.5 + (i % perRow) * (bw + gx), y = 0.5 + Math.floor(i / perRow) * (bh + gy);
    o += `<rect x="${f(x)}" y="${f(y)}" width="${f(bw)}" height="${f(bh)}" rx="${f(s * 0.3)}" style="fill:var(--s)" stroke="${EDGE}" stroke-width=".4"/>`;
    for (let j = 0; j < n; j++) o += `<circle cx="${f(x + s * 0.25 + (j + 0.5) * s)}" cy="${f(y + bh / 2)}" r="${f(s * 0.36)}" style="fill:${DOT}"/>`;
  }
  return svg(perRow * bw + (perRow - 1) * gx + 1, rows * bh + (rows - 1) * gy + 1, o);
}

/** Groups of one object (a sticker, until then an emoji), each group with a curved line under it; lines = groups per line. */
function groups({ sticker: name, emoji, groups: gs, lines, w = 6, h = 8, gap = 0.5 }, ctx) {
  const img = ctx.sticker(name);
  const one = `<span class="p088-gi" style="width:${w}mm;height:${h}mm">${img ? `<img src="${img}">` : `<i style="font-size:${f(Math.min(w, h) * 2.3)}pt">${emoji}</i>`}</span>`;
  const g = (n) => `<span class="p088-g" style="gap:${gap}mm">${Array.from({ length: n }, () => one).join("")}</span>`;
  const ls = lines || [gs.length];
  let i = 0;
  return `<div class="p088-groups">${ls.map((k) => `<div class="p088-gl">${gs.slice(i, (i += k)).map(g).join("")}</div>`).join("")}</div>`;
}

/** p. 96: trays with balls on them, a label on the left and the boxes "□ × □ = □" on the right (heads over the first row). */
function trays({ rows, heads }, ctx) {
  const ball = ctx.sticker("football");
  const tray = (balls, w = 30) => {
    const d = 4.2, th = 3, bs = 7.2, H = bs + 1.2 + th + d * 0.2;
    let o = `<path d="M2 ${f(H - th)}L${f(2 + d)} ${f(H - th - d)}H${f(w)}L${f(w - d)} ${f(H - th)}Z" fill="#FDE68A" stroke="#92400E" stroke-width=".35" stroke-linejoin="round"/>` +
      `<path d="M${f(w - d)} ${f(H - th)}L${f(w)} ${f(H - th - d)}V${f(H - d)}L${f(w - d)} ${f(H)}Z" fill="#D97706" stroke="#92400E" stroke-width=".35" stroke-linejoin="round"/>` +
      `<rect x="2" y="${f(H - th)}" width="${f(w - d - 2)}" height="${th}" fill="#FBBF24" stroke="#92400E" stroke-width=".35"/>`;
    const span = balls * bs, x0 = 2 + d / 2 + (w - d - 2 - span) / 2;
    for (let i = 0; i < balls; i++) {
      const x = x0 + i * bs, y = H - th - d / 2 - bs + 1.2;
      o += ball ? `<image href="${ball}" x="${f(x)}" y="${f(y)}" width="${bs}" height="${bs}"/>` : `<text x="${f(x + bs / 2)}" y="${f(y + bs * 0.86)}" font-family="Noto Color Emoji" font-size="${f(bs * 0.92)}" text-anchor="middle">⚽</text>`;
    }
    return svg(w + 1, H + 0.5, o);
  };
  const box = (d) => `<span class="p088-fb">${ctx.esc(d)}</span>`;
  return `<div class="p088-trays">${rows.map((r, i) => `<div class="p088-tr"><span class="p088-tl">${ctx.esc(r.label)}</span>
    <span class="p088-tt">${Array.from({ length: r.trays }, () => tray(r.balls)).join("")}</span>
    <span class="p088-te">${i === 0 && heads ? `<span class="p088-th"><i>${heads[0]}</i><i>${heads[1]}</i></span>` : ""}${box(r.eq[0])}<b>×</b>${box(r.eq[1])}<b>=</b><span class="abox"></span></span></div>`).join("")}</div>`;
}

/** The multiplication table: the numbers on top and down the side; fill "all" (every product) or { "row,col": text } (else blank). */
function mtable({ top, side, fill, tone = "pink", size = 12, h = 8 }, ctx) {
  const cell = (r, c) => fill === "all" ? ctx.bn(r * c) : (fill && fill[`${r},${c}`]) || "";
  return `<table class="p088-mt tone-${tone}" style="font-size:${size}pt"><tr><th class="x">×</th>${top.map((c) => `<th>${ctx.bn(c)}</th>`).join("")}</tr>
    ${side.map((r) => `<tr style="height:${h}mm"><th>${ctx.bn(r)}</th>${top.map((c) => { const v = cell(r, c); return `<td${v && fill !== "all" ? ` class="p088-fx"` : ""}${fill === "all" && r === c ? ` class="sq"` : ""}>${v}</td>`; }).join("")}</tr>`).join("")}</table>`;
}

/** A multiplication flower (p. 100): the number in the middle, nine numbers round it (clockwise from the top), answers in the petals. */
function flower({ c, ring, out = {}, tone, size = 42 }) {
  const [inner, petal] = { blue: ["#BAE6FD", "#E9D5FF"], pink: ["#FBCFE8", "#BAE6FD"], yellow: ["#FEF08A", "#FDBA74"], purple: ["#D8B4FE", "#FCD34D"], peach: ["#FED7AA", "#F9A8D4"], tan: ["#E7D3BC", "#FDE047"] }[tone];
  const N = ring.length, R0 = 14, R1 = 29, R2 = 42, cx = 50, cy = 50;
  const pt = (r, a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
  const step = 360 / N;
  let petals = "", seg = "", txt = "";
  for (let i = 0; i < N; i++) {
    const a0 = i * step - step / 2, a1 = i * step + step / 2;
    const [x0, y0] = pt(R1, a0), [x1, y1] = pt(R1, a1), [p0x, p0y] = pt(R2 - 6, a0), [p1x, p1y] = pt(R2 - 6, a1);
    // a petal: from the ring out, round at the end
    petals += `<path d="M${f(x0)} ${f(y0)}L${f(p0x)} ${f(p0y)}A${f((R2 - 6) * Math.sin(step * Math.PI / 360))} ${f((R2 - 6) * Math.sin(step * Math.PI / 360))} 0 1 1 ${f(p1x)} ${f(p1y)}L${f(x1)} ${f(y1)}Z" fill="${out[i] ? petal : "#fff"}" stroke="${INK}" stroke-width=".9" stroke-linejoin="round"/>`;
    const [a, b] = pt(R0, a0), [c2, d] = pt(R0, a1);
    seg += `<path d="M${f(a)} ${f(b)}L${f(x0)} ${f(y0)}A${R1} ${R1} 0 0 1 ${f(x1)} ${f(y1)}L${f(c2)} ${f(d)}A${R0} ${R0} 0 0 0 ${f(a)} ${f(b)}Z" fill="${inner}" stroke="${INK}" stroke-width=".9"/>`;
    const [tx, ty] = pt((R0 + R1) / 2, i * step), [ux, uy] = pt(R2 - 4, i * step);
    if (ring[i]) txt += T(tx, ty + 3.4, ring[i], 10);
    if (out[i]) txt += T(ux, uy + 3.6, out[i], 10.5);
  }
  return svg(size, size, `<g transform="scale(${f(size / 100)})">${petals}${seg}<circle cx="${cx}" cy="${cy}" r="${R0}" fill="#fff" stroke="${INK}" stroke-width=".9"/>${T(cx, cy + 4.4, c, 13)}${txt}</g>`, "p088-svg p088-flower");
}

/** p. 99: four 12s (a ten and a two each) → four tens and eight ones. */
function twelve({ s = 4.3 }) {
  let a = "";
  for (let g = 0; g < 4; g++) { const x = 0.5 + g * s * 3.1; a += arr(x, 0.5, 10, 1, s) + arr(x + s * 1.25, 0.5 + 8 * s, 2, 1, s); }
  let b = "";
  for (let g = 0; g < 4; g++) b += arr(0.5 + g * s * 1.25, 0.5, 10, 1, s);
  b += arr(0.5 + 4 * s * 1.25 + s * 0.3, 0.5 + 8 * s, 2, 4, s);
  return { a: svg(s * 3.1 * 3 + s * 2.3 + 1, 10 * s + 1, a), b: svg(4 * s * 1.25 + s * 4.3 + 1, 10 * s + 1, b) };
}
function twelveHtml(b, ctx) {
  const { a, b: bb } = twelve(b), arrow = svg(14, 12, blockArrow(1, 6, 12, 7, "var(--s)", "var(--d)"));
  return `<div class="p088-twelve"><div class="p088-tc">${a}<span class="p088-tcl">${ctx.md(b.left)}</span></div>${arrow}<div class="p088-tc">${bb}<span class="p088-tcl">${ctx.md(b.right)}</span></div></div>`;
}

/** p. 99: 12 × 4 written in columns: tens | ones, with the arrows of the book (4 × 2 first, then 4 × 1). */
function vmul({ top, by, ans }) {
  const w = 34, h = 30, c1 = 11, c2 = 23;
  const dash = (x) => `<path d="M${x} 1V${h - 1}" stroke="#94A3B8" stroke-width=".45" stroke-dasharray="1.6 1.2"/>`;
  return svg(w, h, `${dash(5)}${dash(17)}${dash(29)}<rect x="5.2" y="1" width="23.6" height="${h - 2}" fill="#F5F3FF"/>${dash(5)}${dash(17)}${dash(29)}
    ${T(c1, 8.4, top[0], 7.5)}${T(c2, 8.4, top[1], 7.5)}${T(c1, 17.4, "×", 7, "#DC2626")}${T(c2, 17.4, by, 7.5)}
    <path d="M3 20.4H31" stroke="${INK}" stroke-width=".6"/>${T(c1, 27.4, ans[0], 7.5, "#C2410C")}${T(c2, 27.4, ans[1], 7.5, "#C2410C")}
    <path d="M${c2} 12.6V9.6" stroke="#DC2626" stroke-width=".55"/><path d="M${c2 - 1} 10.2L${c2} 8.6L${c2 + 1} 10.2Z" fill="#DC2626"/>
    <path d="M${c2 - 1.6} 12.8L${c1 + 2.2} 6.6" stroke="#2563EB" stroke-width=".55"/><path d="M${c1 + 1.4} 5.9L${c1 + 3.1} 6.3L${c1 + 2.3} 7.7Z" fill="#2563EB"/>`);
}

/** p. 101: desks seen from above, a dot for each pupil ("111", "001", "110"…). */
function seats({ desks, s = 5.4 }) {
  const dw = s * 3.6, dh = s * 1.45, gx = s * 1.3, gy = s * 0.55, cols = desks[0].length, rows = desks.length;
  let o = "";
  desks.forEach((row, r) => row.forEach((d, c) => {
    const x = 0.5 + c * (dw + gx), y = 0.5 + r * (dh + gy);
    o += `<rect x="${f(x)}" y="${f(y)}" width="${f(dw)}" height="${f(dh)}" rx="${f(s * 0.25)}" fill="#FEF3C7" stroke="#B45309" stroke-width="${f(s * 0.08)}"/>`;
    [...d].forEach((k, j) => { if (k === "1") o += `<circle cx="${f(x + s * 0.3 + (j + 0.5) * s)}" cy="${f(y + dh / 2)}" r="${f(s * 0.3)}" fill="${INK}"/>`; });
  }));
  return svg(cols * dw + (cols - 1) * gx + 1, rows * dh + (rows - 1) * gy + 1, o);
}

/** Pictures in bordered cells, two to a row (p. 98), each cell its own blocks. */
const cells = ({ cells: cs, cols = 2 }, ctx, page) => `<div class="p088-cells" style="grid-template-columns:repeat(${cols}, 1fr)">${cs.map((c) => `<div class="p088-cell">${c.map((b) => ctx.blockHtml(b, page)).join("")}</div>`).join("")}</div>`;

module.exports = {
  kinds: {
    p088_lgrid: (b) => `<div class="p088-c">${lgrid(b)}</div>`,
    p088_split: (b) => split(b),
    p088_namta: (b, ctx) => namta(b, ctx),
    p088_scroll: (b, ctx) => scroll(b, ctx),
    p088_qs: (b, ctx, page) => qs(b, ctx, page),
    // the book's small pink triangle before a line (p. 98's unnumbered one)
    p088_tri: (b, ctx) => `<div class="p088-tl1"><i class="p088-tri"></i><span>${ctx.md(b.text)}</span></div>`,
    p088_say: (b, ctx, page) => say(b, ctx, page),
    p088_dots: (b, ctx) => `<div class="p088-dl">${dots(b)}${b.cap ? `<span class="p088-cap">${ctx.md(b.cap)}</span>` : ""}</div>`,
    p088_swap: (b) => swap(b),
    p088_bars: (b) => `<div class="p088-c">${bars(b)}</div>`,
    p088_groups: (b, ctx) => groups(b, ctx),
    p088_trays: (b, ctx) => trays(b, ctx),
    p088_mtable: (b, ctx) => mtable(b, ctx),
    p088_note: (b, ctx) => `<div class="p088-note">${ctx.md(b.text)}</div>`,
    p088_flower: (b) => `<div class="p088-c">${flower(b)}</div>`,
    // several flowers placed in a box h mm high, each at x, y (mm from the box's top-left)
    p088_flowers: (b) => `<div class="p088-fls" style="height:${b.h}mm">${b.items.map((it) => `<div style="left:${it.x}mm;top:${it.y}mm">${flower(it)}</div>`).join("")}</div>`,
    p088_twelve: (b, ctx) => twelveHtml(b, ctx),
    p088_vmul: (b) => `<div class="p088-c">${vmul(b)}</div>`,
    p088_seats: (b) => `<div class="p088-c">${seats(b)}</div>`,
    p088_cells: (b, ctx, page) => cells(b, ctx, page),
  },
  css: `
.p088-svg { display: block; overflow: visible } .p088-c { display: flex; justify-content: center }
/* the variants of p073_namta (answer boxes in the rows) and p073_scroll (ten lines with boxes) */
.p088-nbx .p073-nl { padding: .75mm 0 .45mm; display: flex; align-items: center; justify-content: center; gap: 1mm }
.p088-nbx .abox { width: 12mm; height: 5.6mm; margin: 0; background: #fff } .p088-nbx .ansbox { min-width: 12mm; height: 5.6mm; padding: 0 1mm; font-size: 12pt; line-height: 5mm }
.p088-scroll .p073-paper { gap: .8mm; padding: 3mm 4mm 5.5mm } .p088-scroll .p073-sr { justify-content: space-between; padding: .25mm 2mm; font-size: 12.5pt }
.p088-scroll .abox { width: 12mm; height: 6mm; margin: 0 } .p088-scroll .ansbox { min-width: 12mm; height: 6mm; padding: 0 1mm; font-size: 12pt; line-height: 5.4mm }
.p088-tl1 { display: flex; align-items: center; gap: 2.4mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .p088-tri { flex: none; width: 6.4mm; height: 5.6mm; background: linear-gradient(160deg, #F9A8D4, #DB2777); clip-path: polygon(50% 0, 100% 100%, 0 100%) }
.p088-qb { margin-top: 1.6mm; display: flex; flex-direction: column; gap: 2mm }
.p088-split { display: flex; flex-direction: column; gap: 1.6mm }
.p088-sr { display: flex; align-items: center; gap: 3mm } .p088-sl { flex: none; width: 21mm; font: 700 12.5pt 'Baloo Da 2'; color: var(--d) }
.p088-note { align-self: flex-start; font: 700 13.5pt/1.35 'Baloo Da 2'; color: #9A3412; background: linear-gradient(90deg, #FEF3C7, #FFFBEB); border-left: 2mm solid #F59E0B; border-radius: 2mm 4mm 4mm 2mm; padding: 2mm 5mm 1.6mm 4mm; box-shadow: 0 .8mm 0 #FDE68A }
.p088-fls { position: relative; flex: none } .p088-fls > div { position: absolute }
.p088-eqs { display: grid; gap: 0 9mm; font: 700 12.5pt/1.5 'Baloo Da 2' }
.p088-sx { margin-top: 1.4mm } .p088-sum { display: flex; flex-direction: column; align-items: center; margin-top: 1mm; font: 700 13pt/1.4 'Baloo Da 2' }
.p088-sum .u { border-bottom: .5mm solid ${INK}; padding: 0 2mm } .p088-sum .t { padding-left: 14mm }
.p088-dl { display: flex; flex-direction: column; align-items: center; gap: 1.2mm } .p088-cap { font: 700 12.5pt 'Baloo Da 2' }
.p088-groups { display: flex; flex-direction: column; align-items: center; gap: 1.6mm } .p088-gl { display: flex; gap: 3.2mm; justify-content: center }
.p088-g { display: inline-flex; padding: 0 1mm 1.3mm; border-bottom: .55mm solid #64748B; border-radius: 0 0 50% 50% / 0 0 2.6mm 2.6mm }
.p088-gi { display: inline-flex; align-items: flex-end; justify-content: center } .p088-gi img { max-width: 100%; max-height: 100%; object-fit: contain } .p088-gi i { font-family: 'Noto Color Emoji'; font-style: normal; line-height: 1 }
.p088-trays { display: flex; flex-direction: column; gap: 1.2mm }
.p088-tr { display: grid; grid-template-columns: 30mm 1fr 48mm; align-items: end; min-height: 13mm }
.p088-tl { font: 700 12.5pt 'Baloo Da 2'; align-self: center } .p088-tt { display: flex; gap: 6mm; align-items: flex-end }
.p088-te { position: relative; display: flex; align-items: center; gap: 1.4mm; font: 800 13pt 'Baloo Da 2'; align-self: center; padding-top: 2mm }
.p088-th { position: absolute; left: 0; top: -3.6mm; display: flex; gap: 1.6mm; font: 700 9.5pt 'Baloo Da 2'; color: var(--d) } .p088-th i { font-style: normal; width: 7.4mm; text-align: center } .p088-th i + i { margin-left: 3.4mm }
.p088-fb { display: inline-block; width: 7.4mm; height: 8mm; border: .5mm solid var(--c); border-radius: 1.4mm; background: var(--s); text-align: center; font: 800 13pt/8.4mm 'Baloo Da 2'; color: var(--d) }
.p088-te .abox { width: 14mm }
.p088-mt { border-collapse: separate; border-spacing: 0; margin: 0 auto; border: .6mm solid var(--tc); border-radius: 3mm; overflow: hidden; font-family: 'Baloo Da 2'; font-weight: 700 }
.p088-mt th, .p088-mt td { text-align: center; border-right: .3mm solid var(--tl); border-bottom: .3mm solid var(--tl); padding: 0 .6mm; min-width: 9mm }
.p088-mt th { background: var(--tc); color: #fff; font-weight: 800; border-color: rgba(255,255,255,.45) } .p088-mt th.x { background: var(--d) }
.p088-mt td { background: #fff } .p088-mt tr:nth-child(odd) td { background: var(--tb) } .p088-mt td.sq { background: #FEF3C7 !important; color: #B45309 }
.p088-mt td.p088-fx { color: #C2410C } .p088-mt tr:last-child td, .p088-mt tr:last-child th { border-bottom: 0 } .p088-mt tr > :last-child { border-right: 0 }
.p088-twelve { display: flex; align-items: center; justify-content: space-around } .p088-tc { display: flex; flex-direction: column; gap: 2mm; align-items: flex-start }
.p088-tcl { font: 700 13pt 'Baloo Da 2' } .p088-tcl .abox { width: 10mm }
.p088-cells { display: grid; border: .6mm solid var(--c); border-radius: 4mm; overflow: hidden; background: #fff; box-shadow: 0 1.2mm 0 var(--s) }
.p088-cell { display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 2mm; padding: 2.4mm 2mm; border-right: .4mm solid var(--s); border-bottom: .4mm solid var(--s) }
.p088-cell:nth-child(2n) { border-right: 0 } .p088-cell:nth-last-child(-n+2) { border-bottom: 0 }
.p088-cell .sums { justify-items: center }
`,
};
