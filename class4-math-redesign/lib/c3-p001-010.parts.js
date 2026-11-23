// Own kinds for printed pages 1–10 (chapter ১ সংখ্যা: 4- and 5-digit numbers, লক্ষ, সংখ্যার তুলনা).
// Every count is drawn by code, so it is exact.
//   c3p001_base     base-ten blocks: thousand cubes, hundred flats (upright or lying), ten rods, ones; rows and stacks
//   c3p001_sets     groups of blocks side by side, each with a brace and a label under it ("২টি ১০০০"), in cells or trays
//   c3p001_cards    the book's coloured number cards (১০০০০, ১০০০, ১০০, ১০, ১): columns, a grid, stacks, scattered, a row
//   c3p001_tickets  the ticket pictures (pp. 3, 7): cartons of ten 1000-packets, bundles, packets of 100 and 10, single tickets
//   c3p001_pvlines  the digit tree "স্থানীয় মান": a line from each digit to its place, a line to its value, a bracket
//   c3p001_saybox   a speech card that holds blocks (a table, a card) under its text
//   c3p001_nline    a number line with long, middle and short ticks, labels, and boxes to fill (ক, খ)
//   c3p001_balloons the balloons of p4 (numbers on them), their strings, held by the girl's picture
//   c3p001_arrow    the book's outlined arrow (down or right)
//   c3p001_box      an empty answer box (with a label beside it or a caption above)
//   c3p001_tag      the book's pointed label ("স্থানের নাম")
//   c3p001_tight    blocks in a column with tighter exercise cards (for p2, the fullest page)
const INK = "#1E2433";
const K = 0.3; // how far the blocks' depth goes back, per cube length

// ── base-ten blocks ──
const f2 = (n) => +n.toFixed(2);
/** a thousand: ten flats stacked into a 10 × 10 × 10 cube; (x, y) = its front face's top-left */
function thousand(x, y, s, c) {
  const L = 10 * s, d = L * K, e = d / 10, sw = f2(s * 0.06);
  let gt = "", gs = "", gf = "";
  for (let i = 1; i < 10; i++) {
    gt += `M${f2(x + i * s)} ${f2(y)}l${f2(d)} ${f2(-d)}M${f2(x + i * e)} ${f2(y - i * e)}h${f2(L)}`;
    gs += `M${f2(x + L + i * e)} ${f2(y - i * e)}v${f2(L)}M${f2(x + L)} ${f2(y + i * s)}l${f2(d)} ${f2(-d)}`;
    gf += `M${f2(x + i * s)} ${f2(y)}v${f2(L)}M${f2(x)} ${f2(y + i * s)}h${f2(L)}`;
  }
  return `<path d="M${f2(x)} ${f2(y)}l${f2(d)} ${f2(-d)}h${f2(L)}l${f2(-d)} ${f2(d)}z" fill="${c.t}"/><path d="${gt}" stroke="${c.k}" stroke-width="${sw}" fill="none"/>
    <path d="M${f2(x + L)} ${f2(y)}l${f2(d)} ${f2(-d)}v${f2(L)}l${f2(-d)} ${f2(d)}z" fill="${c.s}"/><path d="${gs}" stroke="${c.k}" stroke-width="${sw}" fill="none"/>
    <rect x="${f2(x)}" y="${f2(y)}" width="${f2(L)}" height="${f2(L)}" fill="${c.f}"/><path d="${gf}" stroke="${c.k}" stroke-width="${sw}" fill="none"/>
    <path d="M${f2(x)} ${f2(y)}l${f2(d)} ${f2(-d)}h${f2(L)}v${f2(L)}l${f2(-d)} ${f2(d)}h${f2(-L)}zM${f2(x)} ${f2(y)}h${f2(L)}l${f2(d)} ${f2(-d)}M${f2(x + L)} ${f2(y)}v${f2(L)}" stroke="${c.k}" stroke-width="${f2(sw * 1.8)}" fill="none" stroke-linejoin="round"/>`;
}
/** a hundred flat lying down (10 × 10 × 1); (x, y) = its front edge's top-left */
function lying(x, y, s, c) {
  const L = 10 * s, d = L * K, e = d / 10, sw = f2(s * 0.06);
  let gt = "", gs = "", gf = "";
  for (let i = 1; i < 10; i++) {
    gt += `M${f2(x + i * s)} ${f2(y)}l${f2(d)} ${f2(-d)}M${f2(x + i * e)} ${f2(y - i * e)}h${f2(L)}`;
    gs += `M${f2(x + L + i * e)} ${f2(y - i * e)}v${f2(s)}`;
    gf += `M${f2(x + i * s)} ${f2(y)}v${f2(s)}`;
  }
  return `<path d="M${f2(x)} ${f2(y)}l${f2(d)} ${f2(-d)}h${f2(L)}l${f2(-d)} ${f2(d)}z" fill="${c.t}"/><path d="${gt}" stroke="${c.k}" stroke-width="${sw}" fill="none"/>
    <path d="M${f2(x + L)} ${f2(y)}l${f2(d)} ${f2(-d)}v${f2(s)}l${f2(-d)} ${f2(d)}z" fill="${c.s}"/><path d="${gs}" stroke="${c.k}" stroke-width="${sw}" fill="none"/>
    <rect x="${f2(x)}" y="${f2(y)}" width="${f2(L)}" height="${f2(s)}" fill="${c.f}"/><path d="${gf}" stroke="${c.k}" stroke-width="${sw}" fill="none"/>
    <path d="M${f2(x)} ${f2(y)}l${f2(d)} ${f2(-d)}h${f2(L)}v${f2(s)}l${f2(-d)} ${f2(d)}h${f2(-L)}zM${f2(x)} ${f2(y)}h${f2(L)}l${f2(d)} ${f2(-d)}M${f2(x + L)} ${f2(y)}v${f2(s)}" stroke="${c.k}" stroke-width="${f2(sw * 1.6)}" fill="none" stroke-linejoin="round"/>`;
}
// each kind of block: its front face (w × h) and how far its depth reaches up and to the right
const SHAPE = (s) => ({
  K: { fw: 10 * s, fh: 10 * s, dp: 10 * s * K, gap: s * 1.8 },
  F: { fw: 10 * s, fh: 10 * s, dp: s * 0.5, gap: s * 1.3 },
  L: { fw: 10 * s, fh: s, dp: 10 * s * K, gap: s * 1.4 },
  R: { fw: s, fh: 10 * s, dp: s * 0.36, gap: s * 0.6 },
  C: { fw: s, fh: s, dp: s * 0.36, gap: s * 0.5 },
});
/**
 * Blocks drawn in rows ("/" between rows), groups in a row (space between groups), bottom-aligned on each row's floor.
 * A group is a run of one letter side by side ("KK", "RRRRR") or a letter and a count, stacked up ("L3" three lying flats
 * with gaps, "S9" nine lying flats piled close, "C5" five ones in a column with gaps).
 * K a thousand cube, F a hundred flat standing, L a hundred flat lying, R a ten rod, C a one.
 */
function baseSvg({ seq, s = 2, color = "blue", cg, lg, rowGap }, ctx) {
  const c = ctx.BLOCK[color], S = SHAPE(s);
  const groupOf = (tok) => {
    const m = tok.match(/^([KFLRCS])(\d+)$/);
    if (m) { // a stack
      const t = m[1] === "S" ? "L" : m[1], n = +m[2], sh = S[t];
      const g = m[1] === "S" ? s * 0.22 : t === "L" ? (lg ?? s * 1.5) : t === "C" ? (cg ?? s * 0.9) : s * 0.3;
      return { w: sh.fw + sh.dp, h: n * sh.fh + (n - 1) * g + sh.dp, draw: (x, floor) => {
        let o = ""; for (let i = 0; i < n; i++) { const y = floor - sh.fh - i * (sh.fh + g); o += t === "L" ? lying(x, y, s, c) : t === "K" ? thousand(x, y, s, c) : t === "R" ? ctx.rod(x, y, s, c) : t === "F" ? ctx.flat(x, y, s, c) : ctx.cube(x, y, s, c); }
        return o; } };
    }
    if (!/^([KFLRC])\1*$/.test(tok)) throw new Error(`c3p001_base: group "${tok}"`);
    const t = tok[0], n = tok.length, sh = S[t];
    return { w: n * sh.fw + (n - 1) * sh.gap + sh.dp, h: sh.fh + sh.dp, draw: (x, floor) => {
      let o = ""; for (let i = 0; i < n; i++) { const xx = x + i * (sh.fw + sh.gap), y = floor - sh.fh; o += t === "K" ? thousand(xx, y, s, c) : t === "L" ? lying(xx, y, s, c) : t === "F" ? ctx.flat(xx, y, s, c) : t === "R" ? ctx.rod(xx, y, s, c) : ctx.cube(xx, y, s, c); }
      return o; } };
  };
  const rows = String(seq).split("/").map((r) => r.trim().split(/\s+/).filter(Boolean).map(groupOf));
  const gg = s * 2.2, rg = rowGap ?? s * 1.4;
  let out = "", y = 0.4, W = 0;
  rows.forEach((gs, ri) => {
    const h = Math.max(...gs.map((g) => g.h)); let x = 0.3;
    y += h; gs.forEach((g, i) => { out += g.draw(x, y); x += g.w + (i < gs.length - 1 ? gg : 0); });
    W = Math.max(W, x); if (ri < rows.length - 1) y += rg;
  });
  const H = y + 0.4; W += 0.4;
  return { svg: `<svg class="c3p001-base" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${out}</svg>`, w: W, h: H };
}
/** a curly brace pointing down, w mm wide */
function braceSvg(w, col = INK) {
  const h = 3.2, m = w / 2, r = Math.min(1.6, w / 6);
  return `<svg class="c3p001-brace" width="${f2(w)}mm" height="${h}mm" viewBox="0 0 ${f2(w)} ${h}"><path d="M.3 .3Q.3 ${h / 2} ${r} ${h / 2}H${f2(m - r)}Q${f2(m)} ${h / 2} ${f2(m)} ${h - .2}Q${f2(m)} ${h / 2} ${f2(m + r)} ${h / 2}H${f2(w - r)}Q${f2(w - .3)} ${h / 2} ${f2(w - .3)} .3" fill="none" stroke="${col}" stroke-width=".4" stroke-linecap="round"/></svg>`;
}

// ── number cards ──
const CARD = { // background, border, text
  "১০০০০": ["#F3F19B", "#B8B23A", "#4D4A0B", 18], "১০০০": ["#FDE6D5", "#E8B08A", "#7C2D12", 15.5],
  "১০০": ["#93D6CF", "#3FA79C", "#134E4A", 14], "১০": ["#FDBA21", "#D99A09", "#5B3A06", 12], "১": ["#E8A9CF", "#C9659F", "#5E1240", 10],
};
function cardHtml(v, ctx, k = 1, extra = "") {
  const [bg, bd, tx, w] = CARD[v] || ["#fff", "#94A3B8", INK, 12];
  return `<span class="c3p001-card" style="--cb:${bg};--cd:${bd};--ct:${tx};width:${f2(w * k)}mm;height:${f2(5.6 * k)}mm;font-size:${f2(10.5 * k)}pt;${extra}">${ctx.esc(v)}</span>`;
}

// ── the tickets (pp. 3, 7) ──
const TK = { pk: "#C3E293", band: "#F6F2A6", top: "#D8EDB4", side: "#9CC66A", line: "#26301A" };
const tkText = (x, y, t, fs) => `<text x="${f2(x)}" y="${f2(y)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="700" font-size="${fs}" fill="${TK.line}">${t}</text>`;
/** a packet seen from its end (in a carton): w × h */
function pkEnd(x, y, w, h, label) {
  return `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" fill="${TK.pk}" stroke="${TK.line}" stroke-width=".25"/><rect x="${f2(x + w * .3)}" y="${f2(y)}" width="${f2(w * .4)}" height="${f2(h)}" fill="${TK.band}"/>
    <rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" fill="none" stroke="${TK.line}" stroke-width=".25"/>${tkText(x + w / 2, y + h * .72, label, f2(h * .62))}`;
}
/** a packet as a box: front w × h, depth dd (drawn up-right), band across the middle, label on the front */
function pkBox(x, y, w, h, dd, label, bandV = true) {
  const L = TK.line;
  return `<path d="M${f2(x)} ${f2(y)}l${f2(dd)} ${f2(-dd)}h${f2(w)}l${f2(-dd)} ${f2(dd)}z" fill="${TK.top}" stroke="${L}" stroke-width=".25" stroke-linejoin="round"/>
    ${bandV ? `<path d="M${f2(x + w * .3)} ${f2(y)}l${f2(dd)} ${f2(-dd)}h${f2(w * .4)}l${f2(-dd)} ${f2(dd)}z" fill="${TK.band}"/>` : ""}
    <path d="M${f2(x + w)} ${f2(y)}l${f2(dd)} ${f2(-dd)}v${f2(h)}l${f2(-dd)} ${f2(dd)}z" fill="${TK.side}" stroke="${L}" stroke-width=".25" stroke-linejoin="round"/>
    <rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" fill="${TK.pk}"/>${bandV ? `<rect x="${f2(x + w * .22)}" y="${f2(y)}" width="${f2(w * .56)}" height="${f2(h)}" fill="${TK.band}"/>` : ""}
    <rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" fill="none" stroke="${L}" stroke-width=".25"/>${label ? tkText(x + w / 2, y + h * .74, label, f2(h * .62)) : ""}`;
}
const PW = 7.6, PH = 4.4; // a 1000-packet's end
/** an open carton holding ten packets of 1000 (2 across, 5 up) */
function carton(x, y) {
  const fw = PW * 2 + 1.6, fh = PH * 5 + 1.6, d = 5.4;
  const o = "#F7B733", od = "#E2961B", oi = "#B9740F", L = "#5B3A06";
  let p = "";
  for (let r = 0; r < 5; r++) for (let c = 0; c < 2; c++) p += pkEnd(x + .8 + c * PW, y + .8 + r * PH, PW, PH, "১০০০");
  return `<path d="M${f2(x + d)} ${f2(y - d)}l1.6 -5.6h${f2(fw)}l-1.6 5.6z" fill="#FBD27A" stroke="${L}" stroke-width=".3" stroke-linejoin="round"/>
    <path d="M${f2(x)} ${f2(y)}l${f2(d)} ${f2(-d)}h${f2(fw)}l${f2(-d)} ${f2(d)}z" fill="${oi}" stroke="${L}" stroke-width=".3" stroke-linejoin="round"/>
    <path d="M${f2(x)} ${f2(y)}l-4.2 -4.6l${f2(d)} ${f2(-d)}l4.2 4.6z" fill="#FBCB60" stroke="${L}" stroke-width=".3" stroke-linejoin="round"/>
    <path d="M${f2(x + fw)} ${f2(y)}l${f2(d)} ${f2(-d)}v${f2(fh)}l${f2(-d)} ${f2(d)}z" fill="${od}" stroke="${L}" stroke-width=".3" stroke-linejoin="round"/>
    <rect x="${f2(x)}" y="${f2(y)}" width="${f2(fw)}" height="${f2(fh)}" fill="${o}" stroke="${L}" stroke-width=".3"/>${p}`;
}
const CW = PW * 2 + 1.6 + 5.4, CH = PH * 5 + 1.6 + 5.4 + 5.6; // a carton's whole size
/** n packets of 1000 piled, seen from their ends, with a paper band round them */
function bundle(x, floor, n) {
  const dd = 5.2; let o = "";
  for (let i = 0; i < n; i++) o += pkBox(x, floor - (i + 1) * PH, PW, PH, dd, "", false);
  const top = floor - n * PH;
  o += `<path d="M${f2(x + PW * .3)} ${f2(top)}l${f2(dd)} ${f2(-dd)}h${f2(PW * .4)}l${f2(-dd)} ${f2(dd)}z" fill="${TK.band}" stroke="${TK.line}" stroke-width=".2"/>
    <rect x="${f2(x + PW * .3)}" y="${f2(top)}" width="${f2(PW * .4)}" height="${f2(n * PH)}" fill="${TK.band}" stroke="${TK.line}" stroke-width=".2"/>`;
  for (let i = 0; i < n; i++) o += tkText(x + PW / 2, floor - i * PH - PH * .3, "১০০০", f2(PH * .5));
  return { svg: o, w: PW + dd, h: n * PH + dd };
}
const BW = 10.5, BH = 3.9, BD = 2.2; // a packet of 100 or 10
/** n packets of 100 (or 10) piled, a little apart, alternately shifted */
function pile(x, floor, n, label) {
  let o = ""; const g = 1.1;
  for (let i = 0; i < n; i++) { const xx = x + (i % 2 ? 0.9 : 0) + (n - 1 - i) * 0; o += pkBox(xx, floor - BH - i * (BH + g), BW, BH, BD, label); }
  return { svg: o, w: BW + BD + 0.9, h: n * BH + (n - 1) * g + BD };
}
/** n single tickets in a column */
function singles(x, floor, n) {
  let o = ""; const w = 7.2, h = 4.6, g = 1.6;
  for (let i = 0; i < n; i++) { const y = floor - h - i * (h + g); o += `<rect x="${f2(x)}" y="${f2(y)}" width="${w}" height="${h}" fill="${TK.pk}" stroke="${TK.line}" stroke-width=".25"/>${tkText(x + w / 2, y + h * .74, "১", 3)}`; }
  return { svg: o, w, h: n * h + (n - 1) * g };
}
/** rows of groups: ["box", n] cartons, ["bundle", n], ["h", n] packets of 100, ["t", n] packets of 10, ["one", n] tickets */
function ticketsSvg({ rows, k = 1, gap = 4.5, rowGap = 4, align = "left" }) {
  let out = "", y = 0.5, W = 0;
  const built = rows.map((r) => {
    let x = 0; const parts = [];
    for (const [t, n] of r) {
      if (t === "box") { for (let i = 0; i < n; i++) parts.push({ x: x + i * (CW + 2.2), w: CW, h: CH, kind: "box" }); x += n * CW + (n - 1) * 2.2 + gap; }
      else { const probe = t === "bundle" ? bundle(0, 0, n) : t === "one" ? singles(0, 0, n) : pile(0, 0, n, t === "h" ? "১০০" : "১০"); parts.push({ x, w: probe.w, h: probe.h, t, n }); x += probe.w + gap; }
    }
    return { parts, w: x - gap, h: Math.max(...parts.map((p) => p.h)) };
  });
  W = Math.max(...built.map((r) => r.w));
  built.forEach((r, i) => {
    const off = align === "center" ? (W - r.w) / 2 : 0;
    const floor = y + r.h;
    for (const p of r.parts) {
      const x = p.x + off + 4.4; // room for the cartons' left flap
      if (p.kind === "box") out += carton(x, floor - CH + 5.4 + 5.6);
      else if (p.t === "bundle") out += bundle(x, floor, p.n).svg;
      else if (p.t === "one") out += singles(x, floor, p.n).svg;
      else out += pile(x, floor, p.n, p.t === "h" ? "১০০" : "১০").svg;
    }
    y = floor + (i < built.length - 1 ? rowGap : 0);
  });
  W += 4.4 + 0.6; const H = y + 0.6;
  return `<svg class="c3p001-tk" width="${f2(W * k)}mm" height="${f2(H * k)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${out}</svg>`;
}

// ── the digit tree (স্থানীয় মান) ──
/**
 * digits "৮৩৪৭৩" at the top left; rows top to bottom (ones first): [label, value]; a line from each digit down to its row,
 * then on to its label; a line from the label to the value (right-aligned). bracket: { rows: [3, 4], text } joins rows on the right.
 */
function pvlinesSvg({ digits, rows, head, headAt = "values", bracket, w = 160, fs = 4.4, rh = 6.6, dw = 4.6, xl, xv }, ctx) {
  const ds = [...digits].filter((d) => d !== " "), n = ds.length;
  const x0 = 2, yD = fs + 1.2, XL = xl ?? w * 0.42, XV = xv ?? (bracket ? w * 0.8 : w - 2);
  const y0 = yD + rh * 0.95, rowY = (r) => y0 + r * rh, H = rowY(rows.length - 1) + 2.2;
  const lw = Math.max(...rows.map((r) => [...r[0]].length)) * fs * 0.48 + 2.5, vw = Math.max(...rows.map((r) => [...r[1]].length)) * fs * 0.6 + 2;
  let g = "";
  if (head) g += `<text x="${f2(headAt === "values" ? XV - vw / 2 + 1 : XL + lw / 2)}" y="${f2(yD)}" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="600" font-size="${f2(fs * .86)}" fill="${INK}">${ctx.esc(head)}</text>`;
  ds.forEach((d, i) => {
    const x = x0 + i * dw + dw / 2;
    g += `<text x="${f2(x)}" y="${f2(yD)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${f2(fs * 1.12)}" fill="var(--d)">${ctx.esc(d)}</text>`;
    const r = n - 1 - i, y = rowY(r) - fs * 0.32;
    g += `<path d="M${f2(x)} ${f2(yD + 1)}V${f2(y)}H${f2(XL - 1.6)}" fill="none" stroke="${INK}" stroke-width=".3"/>`;
  });
  rows.forEach(([lab, val], r) => {
    const y = rowY(r);
    g += `<text x="${f2(XL)}" y="${f2(y)}" font-family="Noto Sans Bengali" font-weight="500" font-size="${f2(fs * .9)}" fill="${INK}">${ctx.esc(lab)}</text>`;
    g += `<path d="M${f2(XL + lw)} ${f2(y - fs * .32)}H${f2(XV - vw)}" stroke="${INK}" stroke-width=".3"/>`;
    g += `<text x="${f2(XV)}" y="${f2(y)}" text-anchor="end" font-family="Baloo Da 2" font-weight="700" font-size="${f2(fs)}" fill="var(--c)">${ctx.esc(val)}</text>`;
  });
  if (bracket) {
    const [a, b] = bracket.rows, ya = rowY(a) - fs * .32, yb = rowY(b) - fs * .32, bx = XV + 2.6;
    g += `<path d="M${f2(XV + .8)} ${f2(ya)}H${f2(bx)}V${f2(yb)}H${f2(XV + .8)}M${f2(bx)} ${f2((ya + yb) / 2)}H${f2(bx + 1.8)}" fill="none" stroke="${INK}" stroke-width=".3"/>`;
    g += `<text x="${f2(bx + 2.8)}" y="${f2((ya + yb) / 2 + fs * .32)}" font-family="Noto Sans Bengali" font-weight="600" font-size="${f2(fs * .9)}" fill="var(--d)">${ctx.esc(bracket.text)}</text>`;
  }
  return `<svg class="c3p001-pvl" width="${w}mm" height="${f2(H)}mm" viewBox="0 0 ${w} ${f2(H)}">${g}</svg>`;
}

// ── the number line ──
function nlineSvg({ from, to, minor = 100, mid = 500, major = 1000, labels = [], boxes = {}, w = 172, pad = 0.6 }, ctx) {
  const n = (to - from) / minor, step = (w - 8) / (n + 2 * pad), X = (v) => 4 + (pad + (v - from) / minor) * step;
  const yL = 24, hasBox = Object.keys(boxes).length;
  let g = `<path d="M1 ${yL}H${w - 1}" stroke="${INK}" stroke-width=".45"/>`;
  for (let v = from; v <= to; v += minor) {
    const t = v % major === 0 ? 5.6 : v % mid === 0 ? 3.4 : 2;
    g += `<path d="M${f2(X(v))} ${yL}v${-t}" stroke="${INK}" stroke-width="${v % major === 0 ? .45 : .3}"/>`;
  }
  for (const v of labels) g += `<text x="${f2(X(v))}" y="${yL - 7.2}" text-anchor="middle" font-family="Baloo Da 2" font-weight="700" font-size="4.4" fill="${INK}">${ctx.bn(v)}</text>`;
  for (const [v, t] of Object.entries(boxes)) {
    const x = X(+v), bw = 17, bh = 6.2, by = yL - 5.6 - bh;
    g += `<rect x="${f2(x - bw / 2)}" y="${f2(by)}" width="${bw}" height="${bh}" rx="1" fill="#FFFBEB" stroke="#F59E0B" stroke-width=".45"/>
      <path d="M${f2(x)} ${f2(by - 3.4)}v2.4" stroke="#DB2777" stroke-width=".4"/><path d="M${f2(x - 1)} ${f2(by - 1.6)}h2l-1 1.2z" fill="#DB2777"/>
      <rect x="${f2(x - 3.4)}" y="${f2(by - 10.6)}" width="6.8" height="6.8" rx="1" fill="#D9F99D" stroke="#65A30D" stroke-width=".35"/>
      <text x="${f2(x)}" y="${f2(by - 5.3)}" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="700" font-size="4.2" fill="${INK}">${ctx.esc(t)}</text>`;
  }
  return `<svg class="c3p001-nl" width="${w}mm" height="${yL + 1}mm" viewBox="0 0 ${w} ${yL + 1}" style="margin-top:${hasBox ? 0 : -8}mm">${g}</svg>`;
}

// ── the balloons of p4 ──
function balloonsSvg({ balloons, knot, w, h, fs = 3.5 }, ctx) {
  let strings = "", bodies = "";
  for (const [t, col, x, y, rx = 8.6, ry = 10.2, ink = INK] of balloons) {
    const by = y + ry;
    strings += `<path d="M${f2(x)} ${f2(by + 1.2)}Q${f2((x + knot[0]) / 2 + (x < knot[0] ? -3 : 3))} ${f2((by + knot[1]) / 2)} ${f2(knot[0])} ${f2(knot[1])}" fill="none" stroke="#C9CDD3" stroke-width=".55"/>`;
    bodies += `<path d="M${f2(x - 1.2)} ${f2(by + 1.3)}L${f2(x)} ${f2(by - .3)}L${f2(x + 1.2)} ${f2(by + 1.3)}z" fill="${col}" stroke="rgba(0,0,0,.25)" stroke-width=".2"/>
      <ellipse cx="${f2(x)}" cy="${f2(y)}" rx="${rx}" ry="${ry}" fill="${col}"/><ellipse cx="${f2(x - rx * .38)}" cy="${f2(y - ry * .45)}" rx="${f2(rx * .22)}" ry="${f2(ry * .3)}" fill="#fff" opacity=".45" transform="rotate(-25 ${f2(x - rx * .38)} ${f2(y - ry * .45)})"/>
      <text x="${f2(x)}" y="${f2(y + 1.5)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${fs}" fill="${ink}">${ctx.esc(t)}</text>`;
  }
  return `<svg class="c3p001-bal" width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}">${strings}${bodies}</svg>`;
}

module.exports = {
  kinds: {
    c3p001_base: (b, ctx) => `<div class="c3p001-bw" style="justify-content:${b.align || "center"}">${baseSvg(b, ctx).svg}</div>`,
    c3p001_sets: (b, ctx) => {
      const items = b.items.map((it) => ({ ...it, d: baseSvg({ s: b.s, ...it }, ctx) }));
      const cols = b.cols || items.map((it) => it.d.w + (it.tray ? 6 : 4));
      const cells = items.map((it, i) => `<div class="c3p001-sc${it.tray ? " tray" : ""}" style="width:${f2(cols[i])}mm">${it.d.svg}</div>`).join("");
      const labs = items.map((it, i) => `<div class="c3p001-sl" style="width:${f2(cols[i])}mm">${it.label ? `${braceSvg(cols[i] - (b.cells ? 2 : 1))}<span>${ctx.md(it.label)}</span>` : ""}</div>`).join("");
      return `<div class="c3p001-sets${b.cells ? " cells" : ""}" style="--sg:${b.gap ?? 3}mm"><div class="c3p001-srow">${cells}</div><div class="c3p001-srow labs">${labs}</div></div>`;
    },
    c3p001_cards: (b, ctx) => {
      const k = b.k || 1, card = (v, ex) => cardHtml(v, ctx, k, ex);
      if (b.cols) return `<div class="c3p001-ccols" style="gap:${f2(2.2 * k)}mm">${b.cols.map((n) => `<div class="c3p001-ccol" style="gap:${f2(1.45 * k)}mm">${Array.from({ length: n }, () => card(b.v)).join("")}</div>`).join("")}</div>`;
      if (b.grid) return `<div class="c3p001-cgrid${b.boxed ? " boxed" : ""}" style="grid-template-columns:repeat(${b.grid[1]}, auto);gap:${b.gap ?? 2.4}mm ${b.cgap ?? 6}mm">${Array.from({ length: b.grid[0] * b.grid[1] }, () => card(b.v)).join("")}</div>`;
      if (b.stacks) return `<div class="c3p001-ccols stacks" style="gap:${b.gap ?? 4}mm">${b.stacks.map(([v, n]) => `<div class="c3p001-ccol">${Array.from({ length: n }, () => card(v)).join("")}</div>`).join("")}</div>`;
      if (b.scatter) return `<div class="c3p001-scat" style="height:${b.h}mm">${b.scatter.map(([v, x, y]) => card(v, `position:absolute;left:${f2(x / b.bw * 100)}%;top:${f2(y / b.bh * 100)}%;transform:translate(-50%,-50%)`)).join("")}</div>`;
      return `<div class="c3p001-crow">${b.list.map((v) => card(v, b.tilt ? `transform:rotate(${b.tilt}deg)` : "")).join("")}</div>`;
    },
    c3p001_tickets: (b) => `<div class="c3p001-tkw" style="justify-content:${b.justify || "center"}">${ticketsSvg(b)}</div>`,
    c3p001_pvlines: (b, ctx) => `<div class="c3p001-pvw">${pvlinesSvg(b, ctx)}</div>`,
    c3p001_saybox: (b, ctx, page) => ctx.sayHtml(b.who, "\u0001", b.mood, b.side)
      .replace("\u0001", `${b.text ? ctx.md(b.text) : ""}<div class="c3p001-sbb" style="gap:${b.gap ?? 3}mm">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>`)
      .replace(`class="say `, `class="say c3p001-sbx${b.small ? " c3p001-sbs" : ""} `),
    c3p001_nline: (b, ctx) => `<div class="c3p001-nlw">${nlineSvg(b, ctx)}</div>`,
    c3p001_balloons: (b, ctx) => {
      const p = b.pic, f = ctx.picFile(p.name);
      const img = f ? `<img src="file://${f.file}">${f.old ? `<span class="tag">stand-in</span>` : ""}` : `<div class="ph">ChatGPT: ${ctx.esc(p.name)}.png</div>`;
      return `<div class="c3p001-balw" style="width:${b.w}mm;height:${b.h}mm"><div class="c3p001-balp" style="left:${p.x}mm;top:${p.y}mm;width:${p.w}mm;height:${p.h}mm">${img}</div>${balloonsSvg(b, ctx)}</div>`;
    },
    c3p001_arrow: (b) => {
      const d = b.dir === "right" ? "M1 3.2H8V1L12.4 5L8 9V6.8H1Z" : "M3.2 1V8H1L5 12.4L9 8H6.8V1Z", vw = b.dir === "right" ? "0 0 13.4 10" : "0 0 10 13.4";
      return `<div class="c3p001-arw"><svg width="${b.dir === "right" ? 11 : 8}mm" height="${b.dir === "right" ? 8.2 : 11}mm" viewBox="${vw}"><path d="${d}" fill="#fff" stroke="${INK}" stroke-width=".55" stroke-linejoin="round"/></svg></div>`;
    },
    c3p001_box: (b, ctx) => {
      const box = `<span class="c3p001-wb" style="${b.w ? `width:${b.w}mm;` : b.cap ? "" : "flex:1;"}height:${b.h || 9}mm"></span>`;
      if (b.cap) return `<div class="c3p001-wbc"><span class="c3p001-wbl">${ctx.md(b.cap)}</span>${box}</div>`;
      return `<div class="c3p001-wbr">${b.label ? `<span class="c3p001-wbl">${ctx.md(b.label)}</span>` : ""}${box}</div>`;
    },
    c3p001_tight: (b, ctx, page) => `<div class="c3p001-tight">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
    c3p001_tag: (b, ctx) => `<span class="c3p001-tag">${ctx.md(b.text)}</span>`,
  },
  css: `
.c3p001-bw { display: flex; align-items: flex-end } svg.c3p001-base, svg.c3p001-brace, svg.c3p001-tk, svg.c3p001-pvl, svg.c3p001-nl, svg.c3p001-bal { display: block; overflow: visible }
/* groups of blocks with braces */
.c3p001-sets { display: flex; flex-direction: column; align-items: center; gap: .8mm }
.c3p001-srow { display: flex; gap: var(--sg); align-items: stretch } .c3p001-srow.labs { align-items: flex-start }
.c3p001-sc { display: flex; justify-content: center; align-items: flex-end; padding: 1.4mm 0 }
.c3p001-sc.tray { background: #fff; border: .5mm solid #94A3B8; border-top: 0; border-radius: 0 0 2.6mm 2.6mm; box-shadow: inset 0 -1.6mm 0 #E2E8F0; padding: 2mm 0 2.6mm }
.c3p001-sets.cells .c3p001-srow:first-child { gap: 0; border: .6mm solid var(--c); border-radius: 3mm; background: #fff; overflow: hidden }
.c3p001-sets.cells .c3p001-sc + .c3p001-sc { border-left: .4mm solid var(--s) } .c3p001-sets.cells .c3p001-srow.labs { gap: 0 }
.c3p001-sl { display: flex; flex-direction: column; align-items: center; gap: .4mm } .c3p001-sl span { font: 700 11.5pt/1.2 'Baloo Da 2'; color: var(--d) }
/* number cards */
.c3p001-card { display: inline-flex; align-items: center; justify-content: center; flex: none; background: var(--cb); border: .35mm solid var(--cd); border-radius: 1mm; color: var(--ct); font-family: 'Baloo Da 2'; font-weight: 700; line-height: 1; padding-top: .5mm; box-shadow: 0 .45mm 0 color-mix(in srgb, var(--cd) 55%, transparent) }
.c3p001-ccols { display: flex; justify-content: center; align-items: flex-end; gap: 1.6mm } .c3p001-ccol { display: flex; flex-direction: column; gap: 1.1mm }
.c3p001-cgrid { display: grid; justify-content: center } .c3p001-cgrid.boxed { gap: 0 !important; border: .7mm solid #DB2777; background: #FCE7F3; padding: .8mm; width: fit-content; margin: 0 auto }
.c3p001-cgrid.boxed .c3p001-card { border-color: #9D174D; border-width: .45mm; margin: .35mm }
.c3p001-scat { position: relative; background: #fff; border: .6mm solid var(--c); border-radius: 3mm }
.c3p001-crow { display: flex; gap: 2mm; align-items: center }
/* tickets, digit trees, number lines */
.c3p001-tkw, .c3p001-pvw, .c3p001-nlw { display: flex } .c3p001-pvw, .c3p001-nlw { justify-content: center }
/* speech cards holding blocks */
.c3p001-sbx .sb { max-width: 150mm } .c3p001-sbb { display: flex; align-items: center; margin-top: 1.6mm }
.c3p001-sbs .fc { width: 15mm; height: 15mm } .c3p001-sbs .sb { font-size: 12pt; padding: 1.8mm 4.4mm 1.6mm }
/* balloons */
.c3p001-balw { position: relative; flex: none; margin: 0 auto } .c3p001-balw > svg { position: absolute; left: 0; top: 0 }
.c3p001-balp { position: absolute } .c3p001-balp img { width: 100%; height: 100%; object-fit: contain; display: block; mix-blend-mode: multiply } .c3p001-balp .ph { border-radius: 4mm }
/* arrows, boxes, tags */
.c3p001-arw { display: flex; justify-content: center; align-items: center }
.c3p001-wbr { display: flex; align-items: center; gap: 2mm } .c3p001-wbc { display: flex; flex-direction: column; align-items: stretch; gap: 1mm }
.c3p001-wbc .c3p001-wbl { text-align: center } .c3p001-wbl { font: 500 12pt 'Noto Sans Bengali'; white-space: nowrap } .c3p001-wbr .c3p001-wbl { min-width: 21mm }
.c3p001-wb { display: block; background: #fff; border: .55mm solid var(--c); border-radius: 2mm; box-shadow: 0 .8mm 0 var(--s) }
.c3p001-tight { display: flex; flex-direction: column; gap: 1.8mm } .c3p001-tight .ex { gap: 1.3mm; padding: 1.3mm 3mm 1.7mm } .c3p001-tight .ext { line-height: 1.3 }
.c3p001-tight .sums { line-height: 1.35; gap: 1.2mm 4mm } .c3p001-tight .p011-tab tr.p011-pic td { padding: 1.2mm 1mm 1mm }
.c3p001-tag { display: inline-block; flex: none; font: 700 10.5pt 'Noto Sans Bengali'; color: #7C2D12; background: #FDE6D5; padding: 1.2mm 6mm 1mm 2.4mm; clip-path: polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%) }
`,
};
