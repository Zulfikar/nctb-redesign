// Printed pages 53–66's own kinds (prefixed c4p053_): chapter ৪ ভাগ, long division by 1- and 2-digit numbers. Every digit,
// line, box and count is drawn here by code. Units: mm. Written by Claude (helper for pp. 53–66), 23 Nov 2026.
//
//   c4p053_ldiv   { d, n, q?, rows?: [..], lines?: [i | { r, from }], arrows?: [{ col, to }], cut?: col | [cols], grid?, top?,
//                   curl?: i, thumb?: col, fs?, cw?, rh?, dw? }
//                 long division d ) n with the quotient q above. Every row is a string right-aligned to n's last digit, one
//                 character a column: a digit, " " an empty place, "□" a box, "▭" a box two columns wide; a row longer than n
//                 reaches left under the divisor (p58's ১০২). lines: a rule under those rows; arrows: the red "bring down"
//                 arrow from n's digit in column col to row `to`; cut: the red dashed line after column col (pp57–59); grid: the
//                 book's squared layout (pp53–55), with `top` empty rows above; curl: p58's bent arrow from the dividend to row
//                 i; thumb: p57's thumb covering column col.
//   c4p053_tbox   { text?, h?, center?, w? }       a bordered box of words (the book's explanations), or an empty ruled one to write in
//   c4p053_arrow  { w?, tone?: ink | blue | red, top? }   the book's black arrow, its fat blue arrow, a small red one
//   c4p053_flow   { label?, items: [text | ""], aw? }      p58's chips joined by blue arrows ("" = an empty answer box)
//   c4p053_work   { rows: [{ l, e } | "a full line"], indent?, size?, gap? }   written working: a right-aligned label and its sum,
//                 so the "=" signs line up; ▭ is a wide answer box
//   c4p053_choc   { groups: [{ rings, kid }], rest?: { rings, label } }   p56: rings of 10 chocolates in packets, a child above each
//   c4p053_share  { cols: [3, 3, …, 2], ringed, kids: [stickers] }       p60: 20 biscuits, the 3s ringed, arrows to the children
//   c4p053_cross  { top, bottom, xs, arrows: [[from, to, colour]], w, h, fs? }   p61: × and ÷ rows with crossing arrows
//   c4p053_finger { d, n, q?, thumb, text, box? }   p57's "আঙুলের ব্যবহার": the thumb on the dividend, a red arrow, the words
//   c4p053_say    { who, mood, side?, text }        a speaker with a smaller face (crowded pages)
const INK = "#1E2433", RED = "#DC2626", AMB = "#F59E0B", AMBF = "#FFFBEB";
const f2 = (x) => Math.round(x * 100) / 100;
const txt = (x, y, s, { fs, fill = INK, w = 700, anchor = "middle", font = "Baloo Da 2" }) =>
  `<text x="${f2(x)}" y="${f2(y)}" text-anchor="${anchor}" font-family="${font}" font-weight="${w}" font-size="${f2(fs)}" fill="${fill}">${s}</text>`;
const SKIP = "\u0000";
const cellsOf = (s) => { const o = []; for (const ch of [...(s || "")]) { if (ch === "▭") o.push("▭", SKIP); else o.push(ch === " " ? "" : ch); } return o; };
const mdx = (ctx, s) => ctx.md(s == null ? "" : String(s)).replace(/▭/g, `<span class="c4p053-wb"></span>`);

// the thumb (p57), its tip at (x, y), w wide
function thumbSvg(x, y, w) {
  const k = w / 12;
  return `<g transform="translate(${f2(x)} ${f2(y)}) scale(${f2(k)})">
    <path d="M1.2 18 C0.8 12 0.4 6.4 1.6 3.4 C3 .2 9.4 -.4 10.8 3.2 C12.2 7 12.4 12.4 13.4 18 Z" fill="#E8955A" stroke="${INK}" stroke-width=".42"/>
    <path d="M2.3 4.2 C2.6 1.4 9.4 1 10.2 4.2 C10.7 6.4 10.2 8.6 8.6 9.2 C6.6 9.8 4.2 9.7 3.1 8.8 C2.4 8 2.2 5.8 2.3 4.2 Z" fill="#FCE7EA" stroke="${INK}" stroke-width=".38"/>
    <path d="M4.6 14.6 Q7.4 13.6 10.2 14.2 M5.4 15.9 Q7.6 15.2 9.8 15.6" fill="none" stroke="#7C3F1D" stroke-width=".3"/></g>`;
}

function ldivSvg(b, ctx) {
  const grid = !!b.grid, fs = b.fs || (grid ? 4.7 : 5.2), cw = b.cw || (grid ? 7 : 5.2), rh = b.rh || (grid ? 6 : 6.4);
  const nd = cellsOf(b.n), N = nd.length, q = cellsOf(b.q), rows = (b.rows || []).map(cellsOf);
  const top = b.top || 0, dLen = [...b.d].length;
  const dw = b.dw || (grid ? dLen * fs * 0.62 + 6.4 : dLen * fs * 0.64 + 3.6);
  const minCol = Math.min(0, ...rows.map((r) => N - r.length));
  const X0 = Math.max(0.5 + dw, -minCol * cw + 0.8), XR = X0 + N * cw, Y0 = 0.5;
  const Rq = top, Rd = top + 1, rowR = (i) => Rd + 1 + i, R = Rd + 1 + rows.length;
  const yT = (r) => Y0 + r * rh, yB = (r) => Y0 + (r + 1) * rh, yBase = (r) => yT(r) + rh / 2 + fs * 0.34;
  const xL = (c) => X0 + c * cw, xC = (c) => X0 + (c + 0.5) * cw;
  const cuts = [].concat(b.cut ?? []);
  let W = XR + (grid ? 0.5 : 1.4) + (b.curl != null ? 6.4 : 0), H = yB(R - 1) + 0.5 + (cuts.length && !grid ? 1.8 : 0);
  if (b.thumb != null) { W = Math.max(W, xL(b.thumb) + 11); H = Math.max(H, yT(Rd) + 17.5); }
  let g = "";
  if (grid) { // the book's squared paper: a wide column for the divisor, then one per digit
    g += `<rect x=".4" y="${Y0}" width="${f2(XR - 0.4)}" height="${f2(R * rh)}" rx="1.4" fill="#fff" stroke="#FB923C" stroke-width=".35"/>`;
    for (let c = 0; c < N; c++) g += `<path d="M${f2(xL(c))} ${Y0}V${f2(yB(R - 1))}" stroke="#FED7AA" stroke-width=".3"/>`;
    for (let r = 1; r < R; r++) g += `<path d="M.4 ${f2(yT(r))}H${f2(XR)}" stroke="#FED7AA" stroke-width=".3"/>`;
  }
  const put = (cs, r, fill, w) => {
    const off = N - cs.length;
    cs.forEach((ch, i) => {
      const c = off + i;
      if (!ch || ch === SKIP) return;
      if (ch === "□" || ch === "▭") {
        const k = ch === "▭" ? 2 : 1, bw = Math.min(k * cw - 0.9, k === 2 ? cw * 1.6 : cw), bx = xL(c) + (k * cw - bw) / 2;
        g += `<rect x="${f2(bx)}" y="${f2(yT(r) + 0.5)}" width="${f2(bw)}" height="${f2(rh - 1)}" rx=".9" fill="${AMBF}" stroke="${AMB}" stroke-width=".42"/>`;
        return;
      }
      g += txt(xC(c), yBase(r), ctx.esc(ch), { fs, fill, w });
    });
  };
  // the lines under the rows taken away
  for (const L of b.lines || []) {
    const i = typeof L === "number" ? L : L.r, cs = rows[i], off = N - cs.length, first = cs.findIndex((x) => x);
    const c0 = typeof L === "object" && L.from != null ? L.from : first < 0 ? 0 : off + first;
    const xa = grid ? X0 : xL(c0) - 0.7, xb = grid ? XR : XR + 0.7;
    g += `<path d="M${f2(xa)} ${f2(yB(rowR(i)))}H${f2(xb)}" stroke="${INK}" stroke-width=".5"/>`;
  }
  // the bar over the dividend, the bracket and the divisor
  const yo = yT(Rd) + (grid ? 0 : 0.3);
  g += `<path d="M${f2(X0 - 1.4)} ${f2(yo)}H${f2(XR + (grid ? 0 : 0.8))}" stroke="${INK}" stroke-width=".5"/>`;
  g += `<path d="M${f2(X0 - 2.3)} ${f2(yo + 0.3)}Q${f2(X0 - 0.1)} ${f2(yT(Rd) + rh / 2)} ${f2(X0 - 2.3)} ${f2(yB(Rd) - 0.3)}" fill="none" stroke="${INK}" stroke-width=".5"/>`;
  g += txt(X0 - 3.1, yBase(Rd), ctx.esc(b.d), { fs, w: 800, anchor: "end" });
  put(nd, Rd, INK, 800);
  put(q, Rq, "var(--c)", 800);
  rows.forEach((cs, i) => put(cs, rowR(i), INK, 700));
  for (const a of b.arrows || []) {
    const x = xC(a.col), y1 = yB(Rd) + 0.4, y2 = yT(rowR(a.to)) + 0.6;
    g += `<path d="M${f2(x)} ${f2(y1)}V${f2(y2 - 1.2)}" stroke="${RED}" stroke-width=".38"/><path d="M${f2(x - 0.85)} ${f2(y2 - 1.6)}L${f2(x)} ${f2(y2)}L${f2(x + 0.85)} ${f2(y2 - 1.6)}Z" fill="${RED}"/>`;
  }
  for (const c of cuts) g += `<path d="M${f2(xL(c + 1))} ${f2(Y0 + 0.2)}V${f2(H - 0.3)}" stroke="${RED}" stroke-width=".42" stroke-dasharray="1.2 .9"/>`;
  if (b.curl != null) {
    const ys = yT(Rd) + rh * 0.6, ye = yT(rowR(b.curl)) + rh / 2, xs = XR + 1.4, xe = XR + 0.8;
    g += `<path d="M${f2(xs)} ${f2(ys)}C${f2(xs + 5)} ${f2(ys + 1.6)} ${f2(xs + 5.4)} ${f2(ye)} ${f2(xe + 1.6)} ${f2(ye)}" fill="none" stroke="${INK}" stroke-width=".38"/>
      <path d="M${f2(xe + 1.9)} ${f2(ye - 0.85)}L${f2(xe)} ${f2(ye)}L${f2(xe + 1.9)} ${f2(ye + 0.85)}Z" fill="${INK}"/>`;
  }
  if (b.thumb != null) g += thumbSvg(xL(b.thumb) - 0.2, yT(Rd) - 0.6, 10);
  return `<svg class="c4p053-ld" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${g}</svg>`;
}

function arrowSvg(w, tone = "ink") {
  if (tone === "blue") { const h = 6.4; return `<svg class="c4p053-arr" width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}"><path d="M0 ${f2(h * 0.3)}H${f2(w - 4)}V0L${w} ${f2(h / 2)}L${f2(w - 4)} ${h}V${f2(h * 0.7)}H0Z" fill="#38BDF8"/></svg>`; }
  if (tone === "red") { const h = 4; return `<svg class="c4p053-arr" width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}"><path d="M0 ${f2(h * 0.3)}H${f2(w - 2.4)}V0L${w} ${f2(h / 2)}L${f2(w - 2.4)} ${h}V${f2(h * 0.7)}H0Z" fill="${RED}"/></svg>`; }
  return `<svg class="c4p053-arr" width="${w}mm" height="4mm" viewBox="0 0 ${w} 4"><path d="M0 2H${f2(w - 2.6)}" stroke="${INK}" stroke-width=".7"/><path d="M${f2(w - 3.4)} .3L${w} 2L${f2(w - 3.4)} 3.7L${f2(w - 2.6)} 2Z" fill="${INK}"/></svg>`;
}

// a ring of 10 chocolates (2 rows of 5) with its centre at (cx, cy)
function ring10(cx, cy, rx, ry) {
  let s = `<ellipse cx="${f2(cx)}" cy="${f2(cy)}" rx="${f2(rx)}" ry="${f2(ry)}" fill="#DBEFFC" stroke="#E11D48" stroke-width=".42"/>`;
  for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) s += `<circle cx="${f2(cx + (c - 2) * 2.5)}" cy="${f2(cy + (r - 0.5) * 2.6)}" r="1.08" fill="#F7931E"/>`;
  return s;
}
function kidImg(ctx, name, h) {
  const src = ctx.sticker(name);
  return `<span class="c4p053-kid" style="width:${h}mm;height:${h}mm">${src ? `<img src="${src}">` : `<i>🧒🏽</i>`}</span>`;
}
function chocHtml(b, ctx) {
  const rx = 7.3, ry = 4.9, gap = 1.2, pad = 1.4, kidH = b.kidH || 11;
  const ringsSvg = (k, boxed) => {
    const w = k * 2 * rx + (k - 1) * gap + 2 * pad, h = 2 * ry + 2 * pad;
    let s = boxed ? `<rect x=".3" y=".3" width="${f2(w - 0.6)}" height="${f2(h - 0.6)}" rx="3" fill="#F8FAFC" stroke="${INK}" stroke-width=".4"/>` : "";
    for (let i = 0; i < k; i++) s += ring10(pad + rx + i * (2 * rx + gap), pad + ry, rx, ry);
    return { s, w, h };
  };
  const groups = b.groups.map((gp) => { const { s, w, h } = ringsSvg(gp.rings, true);
    return `<div class="c4p053-cg">${kidImg(ctx, gp.kid, kidH)}<svg width="${f2(w)}mm" height="${f2(h)}mm" viewBox="0 0 ${f2(w)} ${f2(h)}">${s}</svg></div>`; });
  if (b.rest) {
    const { s, w, h } = ringsSvg(b.rest.rings, false), H2 = h + 9;
    const brace = `<path d="M${pad} ${f2(h + 0.6)}q0 2 2.4 2H${f2(w / 2 - 2)}q2 0 2 2q0-2 2-2H${f2(w - pad - 2.4)}q2.4 0 2.4-2" fill="none" stroke="${INK}" stroke-width=".5"/>`;
    groups.push(`<div class="c4p053-cg"><span style="height:${kidH}mm"></span><svg width="${f2(w)}mm" height="${f2(H2)}mm" viewBox="0 0 ${f2(w)} ${f2(H2)}">${s}${brace}${txt(w / 2, H2 - 0.6, ctx.esc(b.rest.label), { fs: 3.8, w: 600, font: "Noto Sans Bengali" })}</svg></div>`);
  }
  return `<div class="c4p053-choc">${groups.join("")}</div>`;
}
function shareSvg(b, ctx) {
  const cols = b.cols, ringed = b.ringed ?? cols.length - 1, dx = 4.7, dy = 4.1, r = 1.55, kid = b.kidH || 12, kgap = 2.4;
  const kids = b.kids, KW = kids.length * kid + (kids.length - 1) * kgap, boxW = cols.length * dx + 3.4, boxH = 3 * dy + 2.6;
  const W = Math.max(KW, boxW) + 1, bx = (W - boxW) / 2, by = 0.5, kx = (W - KW) / 2, ky = by + boxH + 13, H = ky + kid + 0.6;
  let s = `<rect x="${f2(bx)}" y="${by}" width="${f2(boxW)}" height="${f2(boxH)}" rx="2.6" fill="#fff" stroke="#38BDF8" stroke-width=".5"/>`;
  const cx = (c) => bx + 1.7 + (c + 0.5) * dx, cy = (k) => by + 1.3 + (k + 0.5) * dy;
  cols.forEach((n, c) => { for (let k = 0; k < n; k++) s += `<circle cx="${f2(cx(c))}" cy="${f2(cy(k))}" r="${r}" fill="#F7931E"/>`; });
  for (let c = 0; c < ringed; c++) s += `<ellipse cx="${f2(cx(c))}" cy="${f2(by + boxH / 2)}" rx="${f2(dx / 2 - 0.1)}" ry="${f2(boxH / 2 - 0.4)}" fill="none" stroke="#E11D48" stroke-width=".4"/>`;
  kids.forEach((name, i) => {
    const x = kx + i * (kid + kgap), src = ctx.sticker(name), tx = x + kid / 2, fx = cx(i), fy = by + boxH - 0.5, ty = ky - 0.4;
    const a = Math.atan2(ty - fy, tx - fx), hx = tx - 1.7 * Math.cos(a), hy = ty - 1.7 * Math.sin(a), nx = -Math.sin(a) * 0.8, ny = Math.cos(a) * 0.8;
    s += `<path d="M${f2(fx)} ${f2(fy)}L${f2(hx)} ${f2(hy)}" stroke="#E11D48" stroke-width=".38"/><path d="M${f2(hx + nx)} ${f2(hy + ny)}L${f2(tx)} ${f2(ty)}L${f2(hx - nx)} ${f2(hy - ny)}Z" fill="#E11D48"/>`;
    s += `<rect x="${f2(x)}" y="${f2(ky)}" width="${kid}" height="${kid}" rx="1.2" fill="#fff" stroke="${INK}" stroke-width=".45"/>`;
    s += src ? `<image href="${src}" x="${f2(x + 0.5)}" y="${f2(ky + 0.5)}" width="${kid - 1}" height="${kid - 1}" preserveAspectRatio="xMidYMid meet"/>` : txt(x + kid / 2, ky + kid * 0.7, "🧒🏽", { fs: kid * 0.6 });
  });
  return `<svg class="c4p053-share" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${s}</svg>`;
}
function crossSvg(b, ctx) {
  const { top, bottom, xs, w, h = 24 } = b, fs = b.fs || 5, yt = 6, yb = h - 3;
  const COL = { ink: INK, blue: "#2E3192", red: RED, green: "#15803D" };
  let s = top.map((t, i) => txt(xs[i], yt, ctx.esc(t), { fs })).join("") + bottom.map((t, i) => txt(xs[i], yb, ctx.esc(t), { fs })).join("");
  for (const [i, j, c = "ink"] of b.arrows) {
    const x1 = xs[i], y1 = yt + 2.2, x2 = xs[j], y2 = yb - fs - 0.6, a = Math.atan2(y2 - y1, x2 - x1), col = COL[c] || c;
    const hx = x2 - 2 * Math.cos(a), hy = y2 - 2 * Math.sin(a), nx = -Math.sin(a) * 0.9, ny = Math.cos(a) * 0.9;
    s += `<path d="M${f2(x1)} ${f2(y1)}L${f2(hx)} ${f2(hy)}" stroke="${col}" stroke-width=".38"/><path d="M${f2(hx + nx)} ${f2(hy + ny)}L${f2(x2)} ${f2(y2)}L${f2(hx - nx)} ${f2(hy - ny)}Z" fill="${col}"/>`;
  }
  return `<div class="c4p053-cross"><svg width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}">${s}</svg></div>`;
}

module.exports = {
  kinds: {
    c4p053_ldiv: (b, ctx) => `<div class="c4p053-ldw${b.left ? " l" : ""}">${ldivSvg(b, ctx)}</div>`,
    c4p053_tbox: (b, ctx) => `<div class="c4p053-tb${b.center ? " c" : ""}${b.text ? "" : " empty"}" style="${b.h ? `min-height:${b.h}mm;` : ""}${b.w ? `width:${b.w}mm;flex:none;` : ""}${b.size ? `font-size:${b.size}pt;` : ""}">${b.text ? mdx(ctx, b.text) : ""}</div>`,
    c4p053_arrow: (b) => `<div class="c4p053-aw" style="padding-top:${b.top || 0}mm">${arrowSvg(b.w || 12, b.tone)}</div>`,
    c4p053_flow: (b, ctx) => `<div class="c4p053-flow${b.center ? " c" : ""}">${b.label ? `<span class="c4p053-fl">${mdx(ctx, b.label)}</span>` : ""}${b.items.map((x, i) =>
      (i ? arrowSvg(b.aw || 11, "blue") : "") + (x ? `<span class="c4p053-chip">${mdx(ctx, x)}</span>` : `<span class="c4p053-chip c4p053-empty"${b.ew ? ` style="width:${b.ew}mm"` : ""}></span>`)).join("")}</div>`,
    c4p053_work: (b, ctx) => `<div class="c4p053-work" style="${b.indent ? `margin-left:${b.indent}mm;` : ""}${b.size ? `font-size:${b.size}pt;` : ""}${b.gap != null ? `row-gap:${b.gap}mm;` : ""}">${b.rows.map((r) =>
      typeof r === "string" ? `<span class="c4p053-wf">${mdx(ctx, r)}</span>` : `<span class="c4p053-wl">${mdx(ctx, r.l)}</span><span class="c4p053-we">${mdx(ctx, r.e)}</span>`).join("")}</div>`,
    c4p053_choc: (b, ctx) => chocHtml(b, ctx),
    c4p053_share: (b, ctx) => `<div class="c4p053-shw">${shareSvg(b, ctx)}</div>`,
    c4p053_cross: (b, ctx) => crossSvg(b, ctx),
    c4p053_finger: (b, ctx) => `<div class="c4p053-fg${b.box ? " bx" : ""}">${ldivSvg({ d: b.d, n: b.n, q: b.q, thumb: b.thumb, fs: 4.6, cw: 4.6, rh: 6 }, ctx)}${arrowSvg(6, "red")}<span class="c4p053-fq">${ctx.md(b.text)}</span></div>`,
    c4p053_say: (b, ctx) => `<div class="c4p053-say${b.tiny ? " t" : ""}">${ctx.sayHtml(b.who, b.text, b.mood || "talk", b.side)}</div>`,
  },
  css: `
.c4p053-ldw { display: flex; justify-content: center } .c4p053-ldw.l { justify-content: flex-start } svg.c4p053-ld { display: block; overflow: visible }
.c4p053-tb { background: #fff; border: .5mm solid color-mix(in srgb, var(--c) 70%, #fff); border-radius: 3mm; padding: 1.6mm 3mm 1.4mm; font: 500 11.5pt/1.45 'Noto Sans Bengali'; box-shadow: 0 .8mm 0 var(--s) }
.c4p053-tb.c { text-align: center } .c4p053-tb.empty { background: repeating-linear-gradient(180deg, transparent 0 7.6mm, #E2E8F0 7.6mm 7.9mm), #fff; background-origin: content-box; min-height: 20mm }
.c4p053-aw { display: flex; justify-content: center } .c4p053-arr { display: block; flex: none }
.c4p053-flow { display: flex; align-items: center; gap: 1.6mm } .c4p053-flow.c { justify-content: center }
.c4p053-fl { font: 700 12.5pt 'Baloo Da 2'; color: var(--d); margin-right: 1mm }
.c4p053-chip { display: inline-flex; align-items: center; min-height: 8mm; padding: .4mm 3mm 0; background: #fff; border: .5mm solid ${INK}; border-radius: 1.6mm; font: 700 12.5pt 'Baloo Da 2'; white-space: nowrap }
.c4p053-chip.c4p053-empty { width: 22mm; border-color: ${AMB}; background: ${AMBF} }
.c4p053-wb { display: inline-block; width: 20mm; height: 7.4mm; vertical-align: -2.2mm; border: .55mm solid ${AMB}; background: ${AMBF}; border-radius: 1.8mm; margin: 0 .8mm }
.c4p053-work { display: grid; grid-template-columns: auto auto; justify-content: start; gap: 2.2mm 1.6mm; align-items: center; font: 600 12.5pt/1.35 'Noto Sans Bengali' }
.c4p053-wl { text-align: right; white-space: nowrap } .c4p053-we { white-space: nowrap } .c4p053-wf { grid-column: 1 / -1 }
.c4p053-choc { display: flex; justify-content: center; align-items: flex-start; gap: 2.6mm } .c4p053-cg { display: flex; flex-direction: column; align-items: center }
.c4p053-cg svg { display: block } .c4p053-kid { display: flex; align-items: center; justify-content: center; background: #fff; border: .45mm solid ${INK}; border-radius: 1.2mm; margin-bottom: -.4mm; overflow: hidden; position: relative; z-index: 1 }
.c4p053-kid img { width: 100%; height: 100%; object-fit: contain } .c4p053-kid i { font-style: normal; font-family: 'Noto Color Emoji' }
.c4p053-shw { display: flex; justify-content: center } svg.c4p053-share { display: block }
.c4p053-cross { display: flex; justify-content: center; align-self: center; width: fit-content; background: #fff; border: .5mm solid color-mix(in srgb, var(--c) 70%, #fff); border-radius: 3mm; padding: 1.2mm 3mm; box-shadow: 0 .8mm 0 var(--s) } .c4p053-cross svg { display: block }
.c4p053-fg { display: flex; align-items: center; gap: 2mm } .c4p053-fg svg { display: block; flex: none } .c4p053-fg.bx { border: .5mm solid ${INK}; border-radius: 2mm; background: #fff; padding: 1.4mm 3mm }
.c4p053-fq { font: 500 11.5pt/1.45 'Noto Sans Bengali'; text-align: center }
.c4p053-say .fc { width: 15.5mm; height: 15.5mm } .c4p053-say .sb { font-size: 12pt; padding: 1.8mm 4mm 1.5mm } .c4p053-say.t .fc { width: 13mm; height: 13mm } .c4p053-say.t .sb { font-size: 11.5pt; padding: 1.4mm 3.4mm 1.2mm }
`,
};
