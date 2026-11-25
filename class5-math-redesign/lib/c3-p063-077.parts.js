// Own kinds for printed pp. 63–77 (chapter ৬ ভাগ). Every count is drawn here, so it is exact. Units: mm.
//   c3p063_say     { who, mood, side, text, body?: [blocks], small? }  someone speaking; body goes inside the bubble (a picture)
//   c3p063_scene   { obj, big?: { n, rows, size, w }, kids: [{ sticker, emoji }…], plates?: [k…], grid?: [3, 2], kidH, size, plateW }
//                  a big plate of things and children, each behind a plate (p63, p64, p66)
//   c3p063_deal    { obj, total, rows: [{ plates: [k…], label? }], kids?, size, plateW, kidH, pileW?, labW }
//                  sharing round by round: the things left (the given ones dashed), the plates, a label or an answer box
//   c3p063_eq      { parts: [{ t, c?, l?, lc? } | "÷"], look: oval|flag|plain, frame?: round|blue|purple, head?, side?: [blocks] }
//                  a division sentence with the name of each number under it (ভাজ্য, ভাজক, ভাগফল, ভাগশেষ…)
//   c3p063_swap    { left: "২০ ÷ ৫ =", right: "× ৫ = ২০" }   the blue and pink pills, arrows between the two boxes
//   c3p063_strip   { per, n, filled?, bar? }   n boxes of `per` dots (p65), or one bar of n cells, `filled` of them with dots (p68)
//   c3p063_share   { rows, cols, to, tall?, fill? }   a dot block, arrows to `to` boxes (p70)
//   c3p063_bundles { n, singles? }   bundles of ten papers, each labelled ১০, and single sheets (p71, p72)
//   c3p063_tens    { cols, top: n, ones? }   the bundles as ১০ cards, circled in equal shares (p71, p72)
//   c3p063_split   p72's working: ৮৪ ÷ ৪ split into ৮০ and ৪
//   c3p063_rings   { rings, per, left }   blocks shared into rings, some left over (p73)
//   c3p063_dotcols { cols: [4,4,…] }      columns of dots (p73)
//   c3p063_trays   { trays, per, loose: [[…]], eq }   trays of sweets and the loose ones (p74)
//   c3p063_rule    { lines: [text | { pill }] }   p74's box: the remainder rule
//   c3p063_arrays  { cells: [{ shape, color, rows, eq: [4 values, "" = empty] }] }   p75's arrays with □ = □ × □ + □
//   c3p063_qboxes  { eq: ["", "=", "", "×", "", "+", ""], w, h }   a sentence of empty (or filled) boxes
//   c3p063_ldiv    { d, n, q, p, r }   the book's one long division layout (p76): d) n (q / p / r
//   c3p063_opts    { items, cols }    the answer choices of a tick question
const INK = "#1E2433";
const f = (n) => +(+n).toFixed(2);

/** One thing: its ChatGPT sticker, else its emoji (hue turns the emoji's colour, for the blue sweet until its sticker comes). */
function thing(ctx, o, size, style = "") {
  const img = o.sticker && ctx.sticker(o.sticker);
  return `<span class="c3p063-it" style="width:${f(size)}mm;height:${f(size)}mm;${style}">${img ? `<img src="${img}">`
    : `<i style="font-size:${f(size * 2.25)}pt;${o.hue ? `filter:hue-rotate(${o.hue}deg) saturate(1.4);` : ""}${o.tilt ? `transform:rotate(${o.tilt}deg);` : ""}">${o.emoji}</i>`}</span>`;
}
const kid = (ctx, k, h) => thing(ctx, typeof k === "string" ? { sticker: k, emoji: "🧒🏽" } : k, h, ""); // a child: { sticker, emoji }

/** A plate seen a little from above (w × h). */
function plateSvg(w, h) {
  return `<svg class="c3p063-plsvg" width="${f(w)}mm" height="${f(h)}mm" viewBox="0 0 ${f(w)} ${f(h)}">
    <ellipse cx="${f(w / 2)}" cy="${f(h * 0.56)}" rx="${f(w / 2 - 0.35)}" ry="${f(h * 0.42)}" fill="#6FB3D4"/>
    <ellipse cx="${f(w / 2)}" cy="${f(h * 0.46)}" rx="${f(w / 2 - 0.35)}" ry="${f(h * 0.42)}" fill="#E4F4FC" stroke="#4A9BC2" stroke-width=".35"/>
    <ellipse cx="${f(w / 2)}" cy="${f(h * 0.48)}" rx="${f(w * 0.31)}" ry="${f(h * 0.22)}" fill="#fff" stroke="#9CCFE6" stroke-width=".3"/></svg>`;
}
const PILE = { 0: [], 1: [1], 2: [2], 3: [1, 2], 4: [2, 2], 5: [2, 3], 6: [3, 3] };
/** k things on a plate (back row first), the plate w mm wide. */
function plate(ctx, o, k, { size = 6, w, pile, squeeze = 0.12, lift = 0.42 } = {}) {
  const rows = pile || PILE[k];
  if (rows.reduce((a, b) => a + b, 0) !== k) throw new Error(`c3p063 plate: pile ${rows} is not ${k}`);
  const W = w || Math.max(size * 2.8, Math.max(1, ...rows) * size * (1 - squeeze) + size * 1.6), ph = W * 0.32;
  const stack = rows.map((m, r) => `<span class="c3p063-prow" style="--ov:${f(-size * squeeze)}mm;${r ? `margin-top:${f(-size * lift)}mm;` : ""}z-index:${r + 1}">${Array.from({ length: m }, () => thing(ctx, o, size)).join("")}</span>`).join("");
  return `<span class="c3p063-plate" style="width:${f(W)}mm;min-height:${f(ph)}mm;padding-bottom:${f(ph * 0.42)}mm">${plateSvg(W, ph)}<span class="c3p063-pile">${stack}</span></span>`;
}
/** A child with a plate in front of them. */
const kidPlate = (ctx, name, o, k, opt) => opt.noPlate ? `<span class="c3p063-kp">${kid(ctx, name, opt.kidH)}</span>` : `<span class="c3p063-kp">${kid(ctx, name, opt.kidH)}<span class="c3p063-kpp" style="margin-top:${f(-opt.kidH * 0.2)}mm">${plate(ctx, o, k, opt)}</span></span>`;

/** The things not given yet (filled) and the ones already given (dashed rings), total in a staggered heap of 3 rows. */
function heap(ctx, o, total, left, s, w) {
  const cols = Math.ceil(total / 3), dx = s * 1.08, dy = s * 0.78, W = w || cols * dx + s * 0.6, H = 2 * dy + s;
  let out = "";
  for (let i = 0; i < total; i++) {
    const c = Math.floor(i / 3), r = i % 3, x = c * dx + (r === 1 ? s * 0.5 : 0), y = r * dy;
    out += i < left ? thing(ctx, o, s, `position:absolute;left:${f(x)}mm;top:${f(y)}mm`)
      : `<span class="c3p063-ring" style="left:${f(x + s * 0.06)}mm;top:${f(y + s * 0.12)}mm;width:${f(s * 0.88)}mm;height:${f(s * 0.76)}mm"></span>`;
  }
  return `<span class="c3p063-heap" style="width:${f(W)}mm;height:${f(H)}mm">${out}</span>`;
}

// the colours of the numbers and of their names
const EQC = { cyan: ["#7DD3FC", "#0369A1"], pink: ["#F9A8D4", "#BE185D"], yellow: ["#FDE047", "#A16207"], grey: ["#E5E7EB", "#4B5563"], cream: ["#FEF3C7", "#B45309"],
  orange: ["#FDBA74", "#9A3412"], purple: ["#E9D5FF", "#6B21A8"], sky: ["#CFFAFE", "#0E7490"], lime: ["#D9F99D", "#3F6212"], violet: ["#F5D0FE", "#86198F"] };
const DBL = `<svg class="c3p063-dbl" viewBox="0 0 30 12"><path d="M1 6L9 1V4H21V1L29 6L21 11V8H9V11Z" fill="${INK}" stroke="${INK}" stroke-width=".8" stroke-linejoin="round"/></svg>`;
function eqHtml(b, ctx, page) {
  const P = b.parts.map((p) => typeof p === "string" ? { op: p } : p);
  const cell = (p) => p.arrow ? DBL : p.op ? `<span class="c3p063-eop">${ctx.esc(p.op)}</span>` : p.t === "□" ? `<span class="c3p063-ebox"></span>`
    : `<span class="c3p063-et${p.c ? " col" : ""}"${p.c ? ` style="--b:${EQC[p.c][0]};--k:${EQC[p.c][1]}"` : ""}>${ctx.md(p.t)}</span>`;
  const lab = (p) => p.l ? `<span class="c3p063-el ${b.look || "oval"}"${p.lc ? ` style="--b:${EQC[p.lc][0]};--k:${EQC[p.lc][1]}"` : ""}>${ctx.md(p.l)}</span>` : "<span></span>";
  const grid = `<div class="c3p063-eg" style="grid-template-columns:repeat(${P.length}, auto);column-gap:${b.gap ?? 2.6}mm">${P.map(cell).join("")}${P.some((p) => p.l) ? P.map(lab).join("") : ""}</div>`;
  const side = b.side ? `<div class="c3p063-eside">${b.side.map((x) => ctx.blockHtml(x, page)).join("")}</div>` : "";
  return `<div class="c3p063-eq${b.frame ? " fr-" + b.frame : ""}"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${b.head ? `<p class="c3p063-ehead">${ctx.md(b.head)}</p>` : ""}<div class="c3p063-erow">${grid}${side}</div>${b.foot ? `<p class="c3p063-efoot">${ctx.md(b.foot)}</p>` : ""}</div>`;
}

/** p70: a rows × cols block of dots, arrows down to `to` boxes; `fill` dots stand in the first box. */
function shareSvg({ rows = 3, cols = 5, to = 3, tall = false, fill = 0, s = 5.4 }) {
  const bw = cols * s, bh = rows * s, W = tall ? 84 : 84, x0 = (W - bw) / 2, y0 = 0.6;
  let o = `<rect x="${f(x0)}" y="${y0}" width="${f(bw)}" height="${f(bh)}" fill="#fff" stroke="${INK}" stroke-width=".45"/>`;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) o += `<rect x="${f(x0 + c * s)}" y="${f(y0 + r * s)}" width="${s}" height="${s}" fill="none" stroke="${INK}" stroke-width=".3"/><circle cx="${f(x0 + (c + 0.5) * s)}" cy="${f(y0 + (r + 0.5) * s)}" r="${f(s * 0.4)}" fill="#1D7FD8"/>`;
  const boxW = tall ? 11 : 22, boxH = tall ? 20 : 11, gap = tall ? 5.5 : 6, tw = to * boxW + (to - 1) * gap, bx0 = (W - tw) / 2, by = y0 + bh + 13;
  for (let i = 0; i < to; i++) {
    const bx = bx0 + i * (boxW + gap), cx = bx + boxW / 2;
    o += `<rect x="${f(bx)}" y="${f(by)}" width="${boxW}" height="${boxH}" rx="2" fill="#fff" stroke="${INK}" stroke-width=".45"/>`;
    // the arrow: from under the block towards the box
    const sx = x0 + bw / 2 + (cx - W / 2) * 0.35, sy = y0 + bh + 2.4, ex = cx, ey = by - 1.4, ang = Math.atan2(ey - sy, ex - sx), L = Math.hypot(ex - sx, ey - sy);
    o += `<g transform="translate(${f(sx)} ${f(sy)}) rotate(${f(ang * 180 / Math.PI)})"><path d="M0 -1.1H${f(L - 3.4)}V-2.6L${f(L)} 0L${f(L - 3.4)} 2.6V1.1H0Z" fill="#F97316" stroke="#C2410C" stroke-width=".3" stroke-linejoin="round"/></g>`;
    if (i === 0 && fill) for (let k = 0; k < fill; k++) o += `<rect x="${f(cx - s / 2)}" y="${f(by + 1.6 + k * s)}" width="${s}" height="${s}" fill="none" stroke="${INK}" stroke-width=".3"/><circle cx="${f(cx)}" cy="${f(by + 1.6 + (k + 0.5) * s)}" r="${f(s * 0.4)}" fill="#1D7FD8"/>`;
  }
  const H = by + boxH + 0.6;
  return `<svg class="c3p063-svg" width="${W}mm" height="${f(H)}mm" viewBox="0 0 ${W} ${f(H)}">${o}</svg>`;
}

/** p71, p72: n bundles of ten papers (a box with a band and its ১০), then single sheets. */
function bundlesSvg({ n = 8, singles = 0, w = 13.6, h = 17.4 }, ctx) {
  const d = 3, gap = 4.4, W = n * (w + d) + (n - 1) * gap + 1, rowH = h + d + 1;
  let o = "";
  for (let i = 0; i < n; i++) {
    const x = 0.5 + i * (w + d + gap), y = 0.5 + d;
    o += `<path d="M${f(x)} ${f(y)}L${f(x + d)} ${f(y - d)}H${f(x + w + d)}L${f(x + w)} ${f(y)}Z" fill="#BAE6FD" stroke="#0369A1" stroke-width=".35" stroke-linejoin="round"/>
      <path d="M${f(x + w)} ${f(y)}L${f(x + w + d)} ${f(y - d)}V${f(y + h - d)}L${f(x + w)} ${f(y + h)}Z" fill="#1D6FB8" stroke="#0369A1" stroke-width=".35" stroke-linejoin="round"/>
      <rect x="${f(x)}" y="${f(y)}" width="${w}" height="${h}" fill="#8FD3F4" stroke="#0369A1" stroke-width=".4"/>
      <rect x="${f(x - 0.6)}" y="${f(y + h * 0.36)}" width="${f(w + 0.6)}" height="${f(h * 0.26)}" fill="#fff" stroke="#CBD5E1" stroke-width=".25"/>
      <path d="M${f(x + w)} ${f(y + h * 0.36)}L${f(x + w + d)} ${f(y + h * 0.36 - d)}V${f(y + h * 0.62 - d)}L${f(x + w)} ${f(y + h * 0.62)}Z" fill="#E2E8F0"/>
      <text x="${f(x + w / 2)}" y="${f(y + h * 0.56)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="4.4" fill="${INK}">${ctx.bn(10)}</text>`;
  }
  let H = rowH;
  if (singles) {
    const sy = rowH + 4;
    for (let i = 0; i < singles; i++) o += `<rect x="${f(0.5 + i * (w + d + gap))}" y="${f(sy)}" width="${f(w * 0.9)}" height="${f(h * 0.8)}" fill="#8FD3F4" stroke="#38A3D8" stroke-width=".3"/>`;
    H = sy + h * 0.8 + 0.5;
  }
  return `<svg class="c3p063-svg" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${o}</svg>`;
}

/** p71, p72: the bundles as ১০ cards in columns (cols equal shares, each circled in red), with ১ cards under them on pink. */
function tensSvg({ cols = 4, top = 2, ones = 0, cw = 10, ch = 8.4, gx = 4 }, ctx) {
  const pad = 4, colW = cw + 3, W = pad * 2 + cols * colW + (cols - 1) * gx, topH = pad + top * (ch + 2) + 1, oneH = ones ? ch + 5 : 0, H = topH + oneH + (ones ? 2 : pad - 1);
  let o = `<rect x="0" y="0" width="${f(W)}" height="${f(H)}" fill="#DCEBC2" stroke="${INK}" stroke-width=".4"/>`;
  if (ones) o += `<rect x="0" y="${f(topH)}" width="${f(W)}" height="${f(H - topH)}" fill="#EBC3DF" stroke="${INK}" stroke-width=".4"/>`;
  for (let c = 0; c < cols; c++) {
    const x = pad + c * (colW + gx);
    o += `<rect x="${f(x)}" y="${f(pad - 2)}" width="${f(colW)}" height="${f((ones ? topH + oneH - 2 : H - pad + 2) - pad + 2 - (ones ? 0 : 2))}" rx="3" fill="none" stroke="#E11D48" stroke-width=".55"/>`;
    for (let r = 0; r < top; r++) {
      const y = pad + r * (ch + 2);
      o += `<rect x="${f(x + 1.5)}" y="${f(y)}" width="${cw}" height="${ch}" fill="#FCD9C0"/><text x="${f(x + 1.5 + cw / 2)}" y="${f(y + ch * 0.72)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="700" font-size="5" fill="${INK}">${ctx.bn(10)}</text>`;
    }
    if (ones) { const y = topH + 2.2; o += `<rect x="${f(x + 1.5)}" y="${f(y)}" width="${cw}" height="${ch}" fill="#FCD9C0"/><text x="${f(x + 1.5 + cw / 2)}" y="${f(y + ch * 0.72)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="700" font-size="5" fill="${INK}">${ctx.bn(1)}</text>`; }
  }
  return `<svg class="c3p063-svg" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${o}</svg>`;
}

/** p72: the boy splits ৮৪ into ৮০ and ৪, divides each and adds. */
function splitSvg(ctx, w = 62) {
  const T = (x, y, s, size = 4.6, anchor = "middle") => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Baloo Da 2" font-weight="700" font-size="${size}" fill="${INK}">${s}</text>`;
  const W = 62, H = 44;
  let o = T(31, 5, "৮৪ ÷ ৪");
  o += `<path d="M26.5 6.6L21.6 11.6M26.5 6.6L31.2 11.6" stroke="${INK}" stroke-width=".4" fill="none"/>`;
  o += `<circle cx="21" cy="16" r="4.4" fill="#fff" stroke="${INK}" stroke-width=".45"/><circle cx="30.8" cy="16" r="4.4" fill="#fff" stroke="${INK}" stroke-width=".45"/>`;
  o += T(21, 17.6, "৮০", 4.2) + T(30.8, 17.6, "৪", 4.2);
  o += T(1, 29, "৮০ ÷ ৪ = ২০", 4.6, "start") + T(3.4, 37, "৪ ÷ ৪ = ১", 4.6, "start");
  o += `<path d="M33.5 31.4H39.6" stroke="${INK}" stroke-width=".55"/><path d="M41.2 31.4L38.4 29.8V33Z" fill="${INK}"/>`;
  // ২০ + ১ in a column, a box for the sum
  o += T(54, 26.4, "২০", 4.4) + T(45.8, 33, "+", 4.8) + T(55.2, 33, "১", 4.4);
  o += `<path d="M43 35.2H60" stroke="${INK}" stroke-width=".55"/><rect x="48.6" y="36.6" width="9.6" height="6.6" rx="1.6" fill="#FFFBEB" stroke="#F59E0B" stroke-width=".5"/>`;
  return `<svg class="c3p063-svg" width="${f(w)}mm" height="${f(H * w / W)}mm" viewBox="0 0 ${W} ${H}">${o}</svg>`;
}

/** p73: rings of blocks, `per` in each, and `left` blocks outside. */
function ringsSvg({ rings = 4, per = 3, left = 2 }) {
  const W = 72, H = 52, rx = 13, ry = 11, cx = [16, 44, 16, 44], cy = [14, 14, 38, 38], b = 4.2;
  let o = `<rect x="0" y="0" width="${W}" height="${H}" rx="3" fill="#FBE4E4"/>`;
  for (let i = 0; i < rings; i++) {
    o += `<ellipse cx="${cx[i]}" cy="${cy[i]}" rx="${rx}" ry="${ry}" fill="#fff" stroke="${INK}" stroke-width=".4"/>`;
    const pos = [[-b * 0.65, -b * 0.75], [b * 0.65, -b * 0.75], [0, b * 0.75]].slice(0, per);
    for (const [dx, dy] of pos) o += `<rect x="${f(cx[i] + dx - b / 2)}" y="${f(cy[i] + dy - b / 2)}" width="${b}" height="${b}" fill="#7DD3FC" stroke="#1E3A5F" stroke-width=".3"/>`;
  }
  for (let k = 0; k < left; k++) o += `<rect x="${f(60.5 + k * 5.6 - (left - 1) * 2.8)}" y="${f(26 - b / 2)}" width="${b}" height="${b}" fill="#7DD3FC" stroke="#1E3A5F" stroke-width=".3"/>`;
  return `<svg class="c3p063-svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${o}</svg>`;
}

/** p73: columns of red dots, bottom-aligned. */
function dotcolsSvg({ cols, dx = 5.4, dy = 3, r = 1.25 }) {
  const n = Math.max(...cols), W = cols.length * dx, H = n * dy + 0.6;
  let o = "";
  cols.forEach((k, c) => { for (let i = 0; i < k; i++) o += `<circle cx="${f((c + 0.5) * dx)}" cy="${f(H - 0.3 - (i + 0.5) * dy)}" r="${r}" fill="#EF4444"/>`; });
  return `<svg class="c3p063-svg" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${o}</svg>`;
}

/** p75: one shape, centred at (x, y), size s. */
function shape(kind, x, y, s, col) {
  const r = s / 2;
  if (kind === "circle") return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.92)}" fill="${col}"/>`;
  if (kind === "tri") return `<path d="M${f(x)} ${f(y - r)}L${f(x + r)} ${f(y + r * 0.8)}H${f(x - r)}Z" fill="${col}"/>`;
  if (kind === "diamond") return `<path d="M${f(x)} ${f(y - r)}L${f(x + r)} ${f(y)}L${f(x)} ${f(y + r)}L${f(x - r)} ${f(y)}Z" fill="${col}"/>`;
  if (kind === "hex") { const p = [0, 60, 120, 180, 240, 300].map((a) => { const t = a * Math.PI / 180; return `${f(x + Math.cos(t) * r)} ${f(y + Math.sin(t) * r * 0.92)}`; }); return `<path d="M${p.join("L")}Z" fill="${col}"/>`; }
  if (kind === "star") { const p = []; for (let i = 0; i < 10; i++) { const t = (i * 36 - 90) * Math.PI / 180, rr = i % 2 ? r * 0.42 : r; p.push(`${f(x + Math.cos(t) * rr)} ${f(y + Math.sin(t) * rr + r * 0.08)}`); } return `<path d="M${p.join("L")}Z" fill="${col}"/>`; }
  if (kind === "heart") return `<path d="M${f(x)} ${f(y + r * 0.85)}C${f(x - r * 1.25)} ${f(y - r * 0.05)} ${f(x - r * 0.75)} ${f(y - r * 1.05)} ${f(x)} ${f(y - r * 0.4)}C${f(x + r * 0.75)} ${f(y - r * 1.05)} ${f(x + r * 1.25)} ${f(y - r * 0.05)} ${f(x)} ${f(y + r * 0.85)}Z" fill="${col}"/>`;
  throw new Error(`c3p063 shape "${kind}"`);
}
function arraySvg({ shape: k, color, rows, s = 6.2, gx = 1.4, gy = 2.6 }) {
  const n = Math.max(...rows), W = n * s + (n - 1) * gx, H = rows.length * s + (rows.length - 1) * gy;
  let o = "";
  rows.forEach((m, r) => { for (let c = 0; c < m; c++) o += shape(k, c * (s + gx) + s / 2, r * (s + gy) + s / 2, s, color); });
  return `<svg class="c3p063-svg" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${o}</svg>`;
}
/** A sentence of boxes: values ("" = an empty box, the rest filled), the signs between them. */
const qboxes = (ctx, eq, w = 11, h = 10, size) => `<div class="c3p063-qbs"${size ? ` style="font-size:${size}pt"` : ""}>${eq.map((v, i) => i % 2
  ? `<span class="c3p063-qop">${ctx.esc(v)}</span>` : `<span class="c3p063-qb${v ? " on" : ""}" style="width:${w}mm;height:${h}mm">${ctx.esc(v)}</span>`).join("")}</div>`;

/** p76: the long division the book prints once: d) n (q, the product p under n, a rule, the remainder r. */
function ldivSvg({ d, n, q, p, r }, ctx) {
  const fs = 6, cw = 3.9, T = (x, y, s, a = "middle") => `<text x="${f(x)}" y="${f(y)}" text-anchor="${a}" font-family="Baloo Da 2" font-weight="700" font-size="${fs}" fill="${INK}">${s}</text>`;
  const digits = (s, right, y) => [...s].reverse().map((ch, i) => T(right - (i + 0.5) * cw, y, ch)).join("");
  const nx = 12 + [...n].length * cw; // the right edge of the dividend's ones column
  let o = T(10.6, 6, d + ")", "end") + digits(n, nx, 6) + T(nx + 1.2, 6, "(" + q, "start");
  o += digits(p, nx, 14) + `<path d="M1 16.4H${f(nx + 0.8)}" stroke="${INK}" stroke-width=".5"/>` + digits(r, nx, 23);
  const W = nx + 12, H = 25;
  return `<svg class="c3p063-svg" width="${f(W)}mm" height="${H}mm" viewBox="0 0 ${f(W)} ${H}">${o}</svg>`;
}

const SWAP_ARR = `<svg class="c3p063-swarr" viewBox="0 0 20 22" preserveAspectRatio="none"><path d="M3.4 5.2C5 -.2 15 -.2 16.6 4.6" fill="none" stroke="${INK}" stroke-width=".5"/><path d="M16.9 5.4L15 3.2L18.3 3.1Z" fill="${INK}"/>
  <path d="M16.6 16.8C15 22.2 5 22.2 3.4 17.4" fill="none" stroke="${INK}" stroke-width=".5"/><path d="M3.1 16.6L5 18.8L1.7 18.9Z" fill="${INK}"/></svg>`;

module.exports = {
  kinds: {
    c3p063_say: (b, ctx, page) => {
      const html = ctx.sayHtml(b.who, b.text || "", b.mood || "talk", b.side);
      const extra = (b.body || []).map((x) => ctx.blockHtml(x, page)).join("");
      const out = extra ? html.replace(/(<div class="sb">[\s\S]*?)<\/div>/, `$1<div class="c3p063-sbx">${extra}</div></div>`) : html;
      return `<div class="c3p063-say${b.small ? " c3p063-sm" : ""}${b.text ? "" : " notext"}${b.top ? " top" : ""}"${b.w ? ` style="--sbw:${b.w}mm"` : ""}>${out}</div>`;
    },
    c3p063_scene: (b, ctx) => {
      const opt = { size: b.size || 6, w: b.plateW || 20, kidH: b.kidH || 15, noPlate: b.noPlate };
      const kids = b.kids.map((k, i) => kidPlate(ctx, k, b.obj, (b.plates || [])[i] || 0, opt));
      let rows = [kids], g = b.grid;
      if (g) { rows = []; let i = 0; for (const m of g) { rows.push(kids.slice(i, i + m)); i += m; } }
      const big = b.big ? `<span class="c3p063-big">${plate(ctx, b.obj, b.big.n, { size: b.big.size || 6, w: b.big.w || 44, pile: b.big.rows, squeeze: 0.05, lift: 0.36 })}</span>` : "";
      return `<div class="c3p063-scene" style="gap:${b.gap ?? 6}mm;justify-content:${b.justify || "center"}">${b.bigRight ? "" : big}<div class="c3p063-kids">${rows.map((r, i) => `<div class="c3p063-krow" style="gap:${b.kgap ?? 4}mm;${b.shift && i ? `margin-left:${b.shift}mm;` : ""}">${r.join("")}</div>`).join("")}</div>${b.bigRight ? big : ""}</div>`;
    },
    c3p063_deal: (b, ctx) => {
      const s = b.pile || 5, opt = { size: b.size || 5, w: b.plateW || 18, kidH: b.kidH || 12 }, total = b.total;
      return `<div class="c3p063-deal">${b.rows.map((r, i) => {
        const given = r.plates.reduce((x, y) => x + y, 0);
        const plates = r.plates.map((k, j) => i === 0 && b.kids ? kidPlate(ctx, b.kids[j], b.obj, k, opt) : `<span class="c3p063-kp">${plate(ctx, b.obj, k, opt)}</span>`).join("");
        const lab = r.label ? `<span class="c3p063-dlab">${ctx.md(r.label)}</span>` : `<span class="c3p063-dlab box"></span>`;
        return `<div class="c3p063-drow" style="grid-template-columns:${f(b.pileW || Math.ceil(total / 3) * s * 1.08 + s * 0.6)}mm 1fr ${b.labW || 36}mm">${heap(ctx, b.obj, total, total - given, s)}<span class="c3p063-dpl" style="gap:${b.gap ?? 3}mm">${plates}</span>${lab}</div>`;
      }).join("")}</div>`;
    },
    c3p063_plates: (b, ctx) => `<div class="c3p063-plates" style="grid-template-columns:repeat(${b.cols || b.plates.length}, auto);gap:${b.gy ?? 1.6}mm ${b.gx ?? 3}mm">${b.plates.map((k) => plate(ctx, b.obj, k, { size: b.size || 6, w: b.w || 18 })).join("")}</div>`,
    c3p063_eq: (b, ctx, page) => eqHtml(b, ctx, page),
    c3p063_swap: (b, ctx) => `<div class="c3p063-swap"><span class="c3p063-swl">${ctx.md(b.left)}<i class="c3p063-swb"></i></span><span class="c3p063-swr">${SWAP_ARR}<i class="c3p063-swb"></i>${ctx.md(b.right)}</span></div>`,
    c3p063_strip: (b) => {
      const d = b.d || 4.2, per = b.per;
      if (b.bar) {
        const cw = per * d + 2.4, W = b.n * cw + 1, H = d + 2.4;
        let o = `<rect x=".5" y=".5" width="${f(b.n * cw)}" height="${f(H - 1)}" fill="#fff" stroke="${INK}" stroke-width=".5"/>`;
        for (let c = 0; c < b.n; c++) {
          if (c) o += `<path d="M${f(0.5 + c * cw)} .5V${f(H - 0.5)}" stroke="${INK}" stroke-width=".5"/>`;
          if (c < (b.filled || 0)) for (let k = 0; k < per; k++) o += `<circle cx="${f(0.5 + c * cw + 1.2 + (k + 0.5) * d)}" cy="${f(H / 2)}" r="${f(d * 0.38)}" fill="${INK}"/>`;
        }
        return `<div class="c3p063-c" style="justify-content:flex-start"><svg class="c3p063-svg" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${o}</svg></div>`;
      }
      const bw = Math.max(per, 1) * d + 2.4 + (b.extra || 0), gap = 2, W = b.n * bw + (b.n - 1) * gap + 1, H = d + 2.4;
      let o = "";
      for (let c = 0; c < b.n; c++) {
        const x = 0.5 + c * (bw + gap);
        o += `<rect x="${f(x)}" y=".5" width="${f(bw)}" height="${f(H - 1)}" fill="#FDF0A6" stroke="#7A5A0B" stroke-width=".45"/>`;
        for (let k = 0; k < per; k++) o += `<circle cx="${f(x + 1.2 + (k + 0.5) * d)}" cy="${f(H / 2)}" r="${f(d * 0.38)}" fill="${INK}"/>`;
      }
      return `<div class="c3p063-c" style="justify-content:flex-start"><svg class="c3p063-svg" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${o}</svg></div>`;
    },
    c3p063_share: (b) => `<div class="c3p063-c">${shareSvg(b)}</div>`,
    c3p063_bundles: (b, ctx) => `<div class="c3p063-c">${bundlesSvg(b, ctx)}</div>`,
    c3p063_tens: (b, ctx) => `<div class="c3p063-c">${tensSvg(b, ctx)}</div>`,
    c3p063_split: (b, ctx) => `<div class="c3p063-c">${splitSvg(ctx, b.w)}</div>`,
    c3p063_rings: (b) => `<div class="c3p063-c">${ringsSvg(b)}</div>`,
    c3p063_dotcols: (b) => `<div class="c3p063-c">${dotcolsSvg(b)}</div>`,
    c3p063_trays: (b, ctx) => {
      const size = b.size || 6.2, cand = (c) => thing(ctx, c === "b" ? { sticker: "candy-blue", emoji: "🍬", hue: 175 } : { sticker: "candy-red", emoji: "🍬" }, size);
      const trays = Array.from({ length: b.trays }, () => `<span class="c3p063-tray">${(b.pattern || "rbr").split("").map(cand).join("")}</span>`).join("");
      const loose = (b.loose || []).map((r) => `<span class="c3p063-loose">${r.split("").map(cand).join("")}</span>`).join("");
      return `<div class="c3p063-trays">${trays}${loose}${b.eq ? `<span class="c3p063-teq">${ctx.md(b.eq)}</span>` : ""}</div>`;
    },
    c3p063_candies: (b, ctx) => { // sweets in a grid (cols × rows), alternating colours; ring: circle the first column
      const size = b.size || 6.6, cols = b.cols, n = b.n, R = { sticker: "candy-red", emoji: "🍬" }, B = { sticker: "candy-blue", emoji: "🍬", hue: 175 };
      const cells = Array.from({ length: n }, (_, i) => thing(ctx, (i * 7 + Math.floor(i / cols)) % 3 === 1 ? R : (i % 2 ? R : B), size)).join("");
      return `<div class="c3p063-cand" style="grid-template-columns:repeat(${cols}, ${f(size * (b.dx || 1.12))}mm);grid-auto-rows:${f(size * (b.dy || 0.86))}mm">${cells}${b.ring ? `<i class="c3p063-cring" style="width:${f(size * 1.3)}mm;left:${f(-size * 0.09)}mm;height:${f(b.ring * size * (b.dy || 0.86) + size * 0.5)}mm"></i>` : ""}</div>`;
    },
    c3p063_rule: (b, ctx) => `<div class="c3p063-rule">${b.lines.map((l) => typeof l === "string" ? `<span>${ctx.md(l)}</span>` : `<span class="pill">${ctx.md(l.pill)}</span>`).join("")}</div>`,
    c3p063_arrays: (b, ctx) => `<div class="c3p063-arrays">${b.cells.map((c) => `<div class="c3p063-acell" style="min-height:${b.h || 60}mm"><div class="c3p063-apic">${arraySvg(c)}</div>${qboxes(ctx, [c.eq[0], "=", c.eq[1], "×", c.eq[2], "+", c.eq[3]], 10.6, 10)}</div>`).join("")}</div>`,
    c3p063_qboxes: (b, ctx) => `<div class="c3p063-c" style="justify-content:${b.justify || "flex-start"}">${qboxes(ctx, b.eq, b.w, b.h, b.size)}</div>`,
    c3p063_ldiv: (b, ctx) => ldivSvg(b, ctx),
    c3p063_opts: (b, ctx) => `<div class="c3p063-opts" style="grid-template-columns:repeat(${b.cols || 4}, 1fr)">${b.items.map((x) => `<span>${ctx.md(x)}</span>`).join("")}</div>`,
    c3p063_list: (b, ctx) => `<div class="c3p063-list" style="grid-template-columns:repeat(${b.cols || 4}, 1fr)${b.size ? `;font-size:${b.size}pt` : ""}">${b.items.map((x, i) => `<span><b>(${ctx.bn((b.start || 1) + i)})</b>${ctx.md(x)}</span>`).join("")}</div>`,
    c3p063_vsep: (b) => `<div class="c3p063-vsep" style="height:${b.h || 20}mm"></div>`,
    c3p063_mcq: (b, ctx, page) => `<div class="c3p063-mcq"><span class="c3p063-mn">${ctx.esc(b.n)}</span><div class="c3p063-mb">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div></div>`,
  },
  css: `
.c3p063-it { display: inline-flex; align-items: center; justify-content: center; flex: none; position: relative }
.c3p063-it img { max-width: 100%; max-height: 100%; object-fit: contain; display: block } .c3p063-it i { font-family: 'Noto Color Emoji'; font-style: normal; line-height: 1 }
.c3p063-c { display: flex; justify-content: center } svg.c3p063-svg { display: block; overflow: visible }
/* plates, children behind them, the heap of things not given yet */
.c3p063-plate { position: relative; display: inline-flex; flex-direction: column; align-items: center; justify-content: flex-end; flex: none }
svg.c3p063-plsvg { position: absolute; left: 0; bottom: 0; display: block }
.c3p063-pile { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center }
.c3p063-prow { position: relative; display: flex } .c3p063-prow > .c3p063-it + .c3p063-it { margin-left: var(--ov) }
.c3p063-kp { display: inline-flex; flex-direction: column; align-items: center; flex: none } .c3p063-kpp { position: relative; z-index: 2; display: flex }
.c3p063-scene { display: flex; align-items: flex-end } .c3p063-kids { display: flex; flex-direction: column; gap: 1mm } .c3p063-krow { display: flex; align-items: flex-end }
.c3p063-big { display: flex; align-items: flex-end }
.c3p063-heap { position: relative; display: block; flex: none }
.c3p063-ring { position: absolute; border: .4mm dashed #475569; border-radius: 50% }
.c3p063-deal { display: flex; flex-direction: column }
.c3p063-drow { display: grid; align-items: end; column-gap: 3mm; padding: 1.4mm 1mm 1.6mm } .c3p063-drow + .c3p063-drow { border-top: .6mm dashed #38BDF8 }
.c3p063-drow > .c3p063-heap { align-self: center }
.c3p063-dpl { display: flex; align-items: flex-end }
.c3p063-dlab { align-self: center; justify-self: end; font: 600 12pt/1.2 'Noto Sans Bengali'; background: #fff; border: .5mm solid #FB923C; border-radius: 2mm; padding: 2mm 3mm 1.6mm; white-space: nowrap }
.c3p063-dlab b { color: var(--d) } .c3p063-dlab.box { width: 20mm; height: 11mm; padding: 0; background: #FFFBEB; border-color: #F59E0B }
/* someone speaking: smaller, and with a picture in the bubble */
.c3p063-say.c3p063-sm .fc { width: 15mm; height: 15mm } .c3p063-say.c3p063-sm .sb { font-size: 11.8pt; padding: 2mm 4mm 1.7mm }
.c3p063-say .sb { max-width: var(--sbw, 130mm) } .c3p063-sbx { display: flex; flex-direction: column; gap: 1.6mm; margin-top: 1.4mm } .c3p063-say.notext .c3p063-sbx { margin-top: 0 }
.c3p063-say.top .say { align-items: flex-start } .c3p063-say.top .sb::before { top: 7.5mm }
.c3p063-plates { display: grid; justify-content: center; align-items: end }
/* the division sentence and the names of its numbers */
.c3p063-eq { align-self: center; display: flex; flex-direction: column; align-items: center; gap: 2mm; font-size: 14pt }
.c3p063-eq.fr-round { background: #fff; border: .6mm solid ${INK}; border-radius: 9mm; padding: 2.4mm 5mm 2.6mm; box-shadow: 0 1mm 0 var(--s) }
.c3p063-eq.fr-blue { background: #D9F0FA; border-radius: 2mm; padding: 3mm 4mm 2.4mm; box-shadow: 0 1mm 0 #A5DCF2 }
.c3p063-eq.fr-purple { align-self: stretch; background: #EDE4F7; border-radius: 6mm; padding: 2.6mm 5mm 3mm; box-shadow: 0 1mm 0 #D8C6EE }
.c3p063-eq.fr-pink { align-self: stretch; background: #F6E1F0; border-radius: 6mm; padding: 2.4mm 6mm 2.6mm; box-shadow: 0 1mm 0 #EBC3DF }
.c3p063-ehead { font: 500 12.5pt/1.45 'Noto Sans Bengali'; text-align: center } .c3p063-efoot { font: 600 12pt 'Noto Sans Bengali' }
.c3p063-erow { display: flex; align-items: center; gap: 9mm; align-self: stretch; justify-content: center }
.c3p063-eg { display: grid; row-gap: 1.6mm; align-items: center; justify-items: center }
.c3p063-et, .c3p063-eop { font: 800 1em/1.2 'Baloo Da 2'; white-space: nowrap } .c3p063-eop { color: #475569 }
.c3p063-et.col { min-width: 15mm; text-align: center; background: var(--b); color: var(--k); border-radius: 1.6mm; padding: .8mm 3mm .2mm }
.c3p063-ebox { display: inline-block; width: 15mm; height: 9mm; background: #fff; border: .55mm solid #F59E0B; border-radius: 1.8mm }
.fr-blue .c3p063-ebox { width: 14mm; height: 13mm; background: #FEFCE8; border-color: #E5C84B; border-radius: 2.4mm }
.c3p063-et .abox { width: 12mm; height: 8.4mm; vertical-align: -2.2mm; background: #fff }
.c3p063-el { font: 600 10.5pt/1.25 'Noto Sans Bengali'; text-align: center; white-space: nowrap }
.c3p063-el.oval { background: var(--b); color: ${INK}; border-radius: 99px; padding: 1.6mm 3mm 1.2mm }
.c3p063-el.flag { position: relative; background: var(--b); color: var(--k); font-weight: 700; padding: 1mm 3mm .6mm; border-radius: 1mm; margin-top: 1.4mm; border: .35mm solid var(--k) }
.c3p063-el.flag::before { content: ""; position: absolute; left: 50%; top: -1.9mm; margin-left: -1.8mm; border: 1.8mm solid transparent; border-top: 0; border-bottom: 1.8mm solid var(--k) }
.c3p063-el.plain { font-size: 11pt }
svg.c3p063-dbl { width: 11mm; height: 4.6mm; display: block }
.c3p063-eside { display: flex; align-items: center }
/* ÷ and × side by side, arrows between their boxes */
.c3p063-swap { display: inline-flex; align-self: flex-start; font: 800 15pt/1 'Baloo Da 2'; margin: 3mm 0 3mm 4mm }
.c3p063-swl, .c3p063-swr { display: inline-flex; align-items: center; gap: 1.6mm; height: 13mm; padding: 0 2.2mm 0 5mm }
.c3p063-swl { background: #7DD3FC; border-radius: 99px 0 0 99px } .c3p063-swr { position: relative; background: #FBCFC4; border-radius: 0 99px 99px 0; padding: 0 5mm 0 2.2mm }
.c3p063-swb { display: inline-block; width: 12mm; height: 8.4mm; background: #fff; border: .55mm solid ${INK}; border-radius: 1.4mm }
svg.c3p063-swarr { position: absolute; left: -10.2mm; top: -4.5mm; width: 20.4mm; height: 22mm; overflow: visible }
/* sweets */
.c3p063-cand { position: relative; display: grid; align-content: center; width: max-content; margin: 0 auto }
.c3p063-cring { position: absolute; top: -1.4mm; border: .5mm solid ${INK}; border-radius: 50% }
.c3p063-trays { display: flex; flex-direction: column; align-items: center; gap: 1.4mm }
.c3p063-tray { display: inline-flex; gap: .6mm; padding: .6mm 2.4mm; background: #fff; border: .45mm solid #64748B; border-radius: 2mm }
.c3p063-loose { display: inline-flex; gap: 1mm } .c3p063-teq { font: 700 12.5pt 'Baloo Da 2'; margin-top: 1mm; white-space: nowrap }
/* the remainder rule */
.c3p063-rule { align-self: center; display: flex; flex-direction: column; align-items: center; gap: 1.2mm; background: #E4DAF2; border-radius: 6mm; padding: 2.4mm 12mm 2.6mm; font: 600 12.5pt/1.3 'Noto Sans Bengali'; box-shadow: 0 1mm 0 #CDBDE6 }
.c3p063-rule .pill { background: #FBF7D2; border-radius: 99px; padding: 1.4mm 10mm 1mm; font-family: 'Baloo Da 2'; font-weight: 700; font-size: 13.5pt; color: #6B21A8 }
/* p75's arrays */
.c3p063-arrays { display: grid; grid-template-columns: 1fr 1fr }
.c3p063-acell { display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 3mm; padding: 2.4mm 2mm 3mm }
.c3p063-acell:nth-child(odd) { border-right: .5mm solid #94A3B8 } .c3p063-acell:nth-child(n+3) { border-top: .5mm solid #94A3B8 }
.c3p063-apic { flex: 1; display: flex; align-items: center; justify-content: center }
.c3p063-qbs { display: inline-flex; align-items: center; gap: 1.8mm; font-size: 14pt }
.c3p063-qb { display: inline-flex; align-items: center; justify-content: center; background: #fff; border: .55mm solid ${INK}; border-radius: 1.4mm; font: 800 1em/1 'Baloo Da 2'; padding-top: .6mm }
.c3p063-qb.on { color: #C2410C; background: #FFFBEB; border-color: #F59E0B } .c3p063-qop { font: 800 1em/1 'Baloo Da 2'; color: #475569 }
/* the lists of sums to work out */
.c3p063-list { display: grid; gap: .8mm 4mm; font: 700 13pt/1.3 'Baloo Da 2'; padding-left: 10mm } .c3p063-list > span { white-space: nowrap } .c3p063-list b { color: #EA580C; margin-right: 1.8mm; font-weight: 800 }
.c3p063-vsep { border-left: .5mm dashed #64748B; flex: none }
/* tick questions */
.c3p063-opts { display: grid; gap: 1mm 4mm; padding-left: 9mm; font: 500 12.5pt/1.5 'Noto Sans Bengali' }
.c3p063-mcq { display: grid; grid-template-columns: 9mm 1fr; align-items: start } .c3p063-mn { font: 800 12.5pt/1.5 'Baloo Da 2'; color: #EA580C }
.c3p063-mb { display: flex; flex-direction: column; gap: 1mm; font: 500 12.5pt/1.5 'Noto Sans Bengali' }
`,
};
