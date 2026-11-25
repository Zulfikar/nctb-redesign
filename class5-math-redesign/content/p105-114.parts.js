// Printed pages 105–114's own kinds (prefixed c5p105_, classes c5p105-): chapter ৭ গড়. Written by a helper (25 Nov 2026).
// Units: mm. Every counted marble, every glass's level and every bar's height is drawn here by code, exactly.
//
//   c5p105_lines   lines of working: { lines: [line…], size? (pt), gap? (mm), bw? (▭'s width), lw? (▬'s), indent?, center?,
//                  sb? (□'s width, 11 mm), panel?: "peach" (p108's tinted box) }
//                  a line: markup | { t, in (mm, an indent), c (centred) } | [left, right] (two parts, the second pushed right)
//                  markup: the core's (□ [[x]] {{a/b}} ___ **b**) plus ▭ a wide box (bw, 20 mm) and ▬ a long one (lw, 30 mm)
//   c5p105_step    the book's ধাপ bands (pp106, 107, 113): { n: "১", text, tone: "peach" | "pink" | "blue", body?: [blocks] }
//                  "ধাপ-১ :" and its words on a tinted band, the working under it, indented
//   c5p105_tab     a table: { cols?: [mm | "%"…], rows: [[cell…]…], hr? (head rows, 1), hc? (first column a head too),
//                  size? (pt), rh? (mm), w? (mm, else full width) }
//                  a cell: markup | { t | b: [blocks], span, rs, bg: "grey" | a colour, al: "left", h, words: true (Noto) }
//   c5p105_jars    p105: the four children's jars of marbles (১৮, ২২, ২৮, ১৬, each marble drawn, a name tag on the jar,
//                  the count under it), the arrow "সবগুলো মার্বেল একত্রে" and the one jar holding all ৮৪: { w? }
//   c5p105_glasses p108: three glasses of juice (ক) (খ) (গ) at ১০০, ৮০ and ১৫০ মিলি (a glass holds ১৬০): { ml, cap, w? }
//   c5p105_level   p108's levelling: the three glasses' levels as bars (framed) ⇨ all the juice in one vessel three
//                  glasses wide (framed) ⇨ three equal bars at the average; true heights: { ml, cap, w? }
//   c5p105_bars    p111: the heights as bars standing on a base value: the base part light blue up to the line at the base
//                  (labelled), the rest grey at the true differences: { base, diffs, k (mm a cm), baseH, unit, w? }
//   c5p105_temp    p109 কাজ ৬: the book's table of the days' temperatures (সোম … বৃহস্পতি), its coloured merged cells and
//                  boxes to fill, the blue arrows joining মঙ্গল ও বুধ and সোম, মঙ্গল ও বুধ to সোম: {}
//   c5p105_mcq     multiple choice with tick boxes, numbered (১) (২), options (ক) … (ঘ) as printed: { items: [{ q, opts }] }
//                  wrap: true lets long lines wrap, hang: their hanging indent (mm), for "ক) …" items
//   c5p105_qn      a numbered heading without a card, the core's look: { n: "৪।", text } (p113 ৪, beside its table)
//   c5p105_rule    p105's light-blue rule boxes: { text, center?, size? (pt) }
const INK = "#1E2433", AMB = "#F59E0B", AMBF = "#FFFBEB";
const f = (n) => (+n).toFixed(2).replace(/\.?0+$/, "");
const FN = `font-family="'Noto Sans Bengali'"`, FB = `font-family="'Baloo Da 2'"`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const txt = (x, y, s, o = {}) => `<text x="${f(x)}" y="${f(y)}" ${o.b ? FB : FN} font-size="${o.fs || 3.6}" font-weight="${o.w || 600}" fill="${o.c || INK}" text-anchor="${o.a || "start"}">${esc(s)}</text>`;
const box = (x, y, w, h) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="1.2" fill="${AMBF}" stroke="${AMB}" stroke-width=".45"/>`;
const ln = (x1, y1, x2, y2, c = INK, w = .3) => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="${c}" stroke-width="${w}" fill="none"/>`;
const mk = (ctx, s) => ctx.md(String(s ?? "")).replace(/▭/g, `<span class="c5p105-wb"></span>`).replace(/▬/g, `<span class="c5p105-lb"></span>`);

// ── lines of working ──
function linesHtml(b, ctx) {
  const one = (x) => {
    if (Array.isArray(x)) return `<div class="c5p105-l2"><span>${mk(ctx, x[0])}</span><span>${mk(ctx, x[1])}</span></div>`;
    const o = typeof x === "object" && x ? x : { t: x };
    return `<p class="c5p105-ln${o.c ? " c" : ""}"${o.in ? ` style="padding-left:${o.in}mm"` : ""}>${mk(ctx, o.t)}</p>`;
  };
  const st = [b.size && `font-size:${b.size}pt`, b.gap != null && `gap:${b.gap}mm`, b.bw && `--bw:${b.bw}mm`, b.lw && `--lw:${b.lw}mm`, b.sb && `--sb:${b.sb}mm`, b.indent && `padding-left:${b.indent}mm`].filter(Boolean).join(";");
  return `<div class="c5p105-lines${b.center ? " c" : ""}${b.wrap ? " wrap" : ""}${b.panel ? " c5p105-" + b.panel : ""}" style="${st}${b.hang ? `;--hg:${b.hang}mm` : ""}">${b.lines.map(one).join("")}</div>`;
}

// ── a table ──
function tabHtml(b, ctx, page) {
  const hr = b.hr ?? 1;
  const cols = b.cols ? `<colgroup>${b.cols.map((w) => `<col style="width:${typeof w === "number" ? w + "mm" : w}">`).join("")}</colgroup>` : "";
  const rows = b.rows.map((r, i) => `<tr${b.rh ? ` style="height:${b.rh}mm"` : ""}>${r.map((c, j) => {
    const o = c && typeof c === "object" ? c : { t: c };
    const head = i < hr || (b.hc && j === 0 && !o.span && !o.b);
    const bg = o.bg === "grey" ? "#E2E8F0" : o.bg;
    const st = [bg && `background:${bg}`, o.h && `height:${o.h}mm`, o.al && `text-align:${o.al}`].filter(Boolean).join(";");
    const inner = o.b ? o.b.map((x) => ctx.blockHtml(x, page)).join("") : mk(ctx, o.t ?? "");
    return `<td class="${[head ? "h" : "", o.words ? "w" : "", o.b ? "bk" : ""].filter(Boolean).join(" ")}"${o.span ? ` colspan="${o.span}"` : ""}${o.rs ? ` rowspan="${o.rs}"` : ""}${st ? ` style="${st}"` : ""}>${inner}</td>`;
  }).join("")}</tr>`).join("");
  return `<table class="c5p105-tab" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.w ? `width:${b.w}mm;margin:0 auto` : ""}">${cols}${rows}</table>`;
}

// ── p105: jars of marbles ──
const MARBLE = [["#EF4444", "#7F1D1D"], ["#3B82F6", "#1E3A8A"], ["#22C55E", "#14532D"], ["#EAB308", "#713F12"], ["#A855F7", "#4C1D95"], ["#14B8A6", "#134E4A"], ["#F97316", "#7C2D12"]];
const marbleDefs = () => `<defs>${MARBLE.map(([c, d], i) => `<radialGradient id="c5p105-mg${i}" cx=".5" cy=".5" r=".55" fx=".34" fy=".3"><stop offset="0" stop-color="#fff"/><stop offset=".28" stop-color="${c}"/><stop offset="1" stop-color="${d}"/></radialGradient>`).join("")}
  <linearGradient id="c5p105-lid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6DC8C"/><stop offset=".5" stop-color="#D4A73A"/><stop offset="1" stop-color="#9C7414"/></linearGradient>
  <linearGradient id="c5p105-juice" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F97316"/><stop offset=".45" stop-color="#FDBA74"/><stop offset="1" stop-color="#EA580C"/></linearGradient></defs>`;
function marbles(n, x0, x1, yBottom, r, seed) {
  const per = Math.floor((x1 - x0) / (2 * r)), rnd = mrng(seed);
  let g = "";
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / per), inRow = Math.min(per, n - row * per), k = i % per;
    const cx = (x0 + x1) / 2 + (k - (inRow - 1) / 2) * 2 * r + (rnd() - .5) * .16, cy = yBottom - r - row * 2 * r * .97 + (rnd() - .5) * .12;
    const col = Math.floor(rnd() * MARBLE.length);
    g += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r * .96)}" fill="url(#c5p105-mg${col})" stroke="${MARBLE[col][1]}" stroke-width=".1"/>
      <path d="M${f(cx - r * .55)} ${f(cy + r * .2)}q${f(r * .5)} ${f(-r * .7)} ${f(r * 1.05)} ${f(-r * .15)}" stroke="#fff" stroke-opacity=".55" stroke-width="${f(r * .22)}" fill="none" stroke-linecap="round"/>`;
  }
  return g;
}
function mrng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
function jar(x, y, w, h, inside) {
  const lid = 4, neck = 1.8, top = y + lid + neck;
  return `<rect x="${f(x + w * .1)}" y="${f(y + lid - .4)}" width="${f(w * .8)}" height="${f(neck + 1)}" fill="#E0F2FE" fill-opacity=".5" stroke="#64748B" stroke-width=".3"/>
    <rect x="${f(x)}" y="${f(top)}" width="${f(w)}" height="${f(y + h - top)}" rx="3.4" fill="#F0F9FF" fill-opacity=".75" stroke="#64748B" stroke-width=".38"/>
    ${inside}
    <rect x="${f(x + 1.1)}" y="${f(top + 2)}" width="1.1" height="${f(y + h - top - 5)}" rx=".55" fill="#fff" opacity=".75"/>
    <rect x="${f(x + w - 2.4)}" y="${f(top + 3)}" width=".7" height="${f(y + h - top - 8)}" rx=".35" fill="#fff" opacity=".6"/>
    <rect x="${f(x + w * .06)}" y="${f(y)}" width="${f(w * .88)}" height="${lid}" rx=".9" fill="url(#c5p105-lid)" stroke="#8A6408" stroke-width=".3"/>
    ${[.2, .35, .5, .65, .8].map((t) => ln(x + w * .06 + w * .88 * t, y + .8, x + w * .06 + w * .88 * t, y + lid - .6, "#8A6408", .15)).join("")}`;
}
function jarsSvg(b) {
  const kids = [["আবির", 18, "১৮ টি মার্বেল"], ["লতা", 22, "২২ টি মার্বেল"], ["আয়ান", 28, "২৮ টি মার্বেল"], ["সুমি", 16, "১৬ টি মার্বেল"]];
  const jw = 24, jh = 33, gap = 3.5, W = 168, H = 42.5, r = 1.7;
  let g = marbleDefs();
  kids.forEach(([name, n, cap], i) => {
    const x = i * (jw + gap);
    g += jar(x, 0, jw, jh, marbles(n, x + 1.3, x + jw - 1.3, jh - 1.1, r, 11 + i * 7));
    const tw = name.length * 1.5 + 5;
    g += `<rect x="${f(x + jw / 2 - tw / 2)}" y="7.2" width="${f(tw)}" height="5.4" rx="1" fill="#fff" stroke="#94A3B8" stroke-width=".25"/>` + txt(x + jw / 2, 11.3, name, { a: "middle", fs: 3.4 });
    g += `<rect x="${f(x + 1)}" y="${jh + 2.3}" width="${jw - 2}" height="6.4" rx="1.2" fill="#fff" stroke="${INK}" stroke-width=".3"/>` + txt(x + jw / 2, jh + 6.8, cap, { a: "middle", fs: 3.3, w: 500 });
  });
  // the arrow: all the marbles together
  const ax = 4 * jw + 3 * gap + 2.5, aw = 27, ay = 2, ah = 30, bodyH = 18, bodyW = 18.5, cy = ay + ah / 2;
  g += `<path d="M${f(ax)} ${f(cy - bodyH / 2)}H${f(ax + bodyW)}V${f(ay)}L${f(ax + aw)} ${f(cy)}L${f(ax + bodyW)} ${f(ay + ah)}V${f(cy + bodyH / 2)}H${f(ax)}Z" fill="#BAE6FD" stroke="#0284C7" stroke-width=".4" stroke-linejoin="round"/>`;
  ["সবগুলো", "মার্বেল", "একত্রে"].forEach((t, i) => { g += txt(ax + bodyW / 2 + 1.2, cy - 4.4 + i * 5, t, { a: "middle", fs: 3.5 }); });
  // the one jar of all 84
  const bx = ax + aw + 2.5, bw = W - bx - .3;
  g += jar(bx, 0, bw, jh, marbles(84, bx + 1.2, bx + bw - 1.2, jh - 1, bw > 28.4 ? 1.3 : (bw - 2.4) / 20, 97));
  return `<svg class="c5p105-svg" width="${W}mm" height="${H}mm" viewBox="-.3 -.3 ${W + .6} ${H + .6}">${g}</svg>`;
}

// ── p108: glasses of juice and the levelling ──
function glass(x, y, w, h, ml, cap) {
  const lvl = (h - 1.6) * ml / cap, jy = y + h - .8 - lvl;
  return `<path d="M${f(x)} ${f(y)}L${f(x + .6)} ${f(y + h - 1.4)}Q${f(x + .7)} ${f(y + h)} ${f(x + 2)} ${f(y + h)}H${f(x + w - 2)}Q${f(x + w - .7)} ${f(y + h)} ${f(x + w - .6)} ${f(y + h - 1.4)}L${f(x + w)} ${f(y)}" fill="#F8FAFC" stroke="#94A3B8" stroke-width=".35"/>
    <path d="M${f(x + .3)} ${f(jy)}L${f(x + .75)} ${f(y + h - 1.6)}Q${f(x + .9)} ${f(y + h - .6)} ${f(x + 2)} ${f(y + h - .6)}H${f(x + w - 2)}Q${f(x + w - .9)} ${f(y + h - .6)} ${f(x + w - .75)} ${f(y + h - 1.6)}L${f(x + w - .3)} ${f(jy)}Z" fill="url(#c5p105-juice)"/>
    <ellipse cx="${f(x + w / 2)}" cy="${f(jy)}" rx="${f(w / 2 - .32)}" ry="1" fill="#FDBA74" stroke="#EA580C" stroke-width=".2"/>
    <ellipse cx="${f(x + w / 2)}" cy="${f(y)}" rx="${f(w / 2)}" ry="1.3" fill="#F1F5F9" fill-opacity=".6" stroke="#94A3B8" stroke-width=".35"/>
    <rect x="${f(x + 1.4)}" y="${f(y + 2)}" width="1" height="${f(h - 5)}" rx=".5" fill="#fff" opacity=".7"/>`;
}
function glassesSvg(b) {
  const ml = b.ml || [100, 80, 150], cap = b.cap || 160, gw = 15, gh = 31, gap = 4.5, L = ["(ক)", "(খ)", "(গ)"];
  const W = ml.length * gw + (ml.length - 1) * gap, H = gh + 7.5;
  let g = marbleDefs();
  ml.forEach((v, i) => { const x = i * (gw + gap); g += glass(x, 1.4, gw, gh, v, cap) + txt(x + gw / 2, gh + 6.6, L[i], { a: "middle", fs: 3.3, w: 500 }); });
  return `<svg class="c5p105-svg" width="${f(W)}mm" height="${f(H)}mm" viewBox="-.3 -.3 ${f(W + .6)} ${f(H + .6)}">${g}</svg>`;
}
function levelSvg(b) {
  const ml = b.ml || [100, 80, 150], cap = b.cap || 160, n = ml.length, avg = ml.reduce((a, c) => a + c, 0) / n;
  const bw = 5.2, bg = 1.4, H = 27, top = 3.4, set = n * bw + (n - 1) * bg, pw = set + 6.4, OR = "#F97316";
  const bars = (x0, vals) => vals.map((v, i) => { const x = x0 + i * (bw + bg), h = H * v / cap;
    return `<rect x="${f(x)}" y="${top}" width="${bw}" height="${H}" fill="#fff" stroke="${INK}" stroke-width=".3"/><rect x="${f(x)}" y="${f(top + H - h)}" width="${bw}" height="${f(h)}" fill="${OR}" stroke="${INK}" stroke-width=".3"/>`; }).join("");
  const frame = (x) => `<rect x="${f(x)}" y=".4" width="${f(pw)}" height="${H + 6}" fill="#fff" stroke="#1D4ED8" stroke-width=".7"/>`;
  const arrow = (x) => `<path d="M${f(x)} ${f(top + H / 2 - 3.2)}H${f(x + 4)}V${f(top + H / 2 - 7)}L${f(x + 8.4)} ${f(top + H / 2)}L${f(x + 4)} ${f(top + H / 2 + 7)}V${f(top + H / 2 + 3.2)}H${f(x)}" fill="#fff" stroke="#1D4ED8" stroke-width=".6" stroke-linejoin="round"/>`;
  let g = "", x = 0;
  g += frame(x) + bars(x + 3.2, ml); x += pw;
  g += arrow(x - .4); x += 8.6;
  const vh = H * ml.reduce((a, c) => a + c, 0) / (cap * n);   // all the juice in a vessel n glasses wide (no gaps): the same level as the average
  g += frame(x) + `<rect x="${f(x + 3.2)}" y="${top}" width="${f(n * bw)}" height="${H}" fill="#fff" stroke="${INK}" stroke-width=".3"/><rect x="${f(x + 3.2)}" y="${f(top + H - vh)}" width="${f(n * bw)}" height="${f(vh)}" fill="${OR}" stroke="${INK}" stroke-width=".3"/>`;
  x += pw; g += arrow(x - .4); x += 9.4;
  g += bars(x, ml.map(() => avg)); x += set;
  const W = x + .4, HH = H + 7;
  return `<svg class="c5p105-svg" width="${f(W)}mm" height="${f(HH)}mm" viewBox="-.4 0 ${f(W + .8)} ${f(HH + .4)}">${g}</svg>`;
}

// ── p111: the heights over a base ──
function barsSvg(b) {
  const diffs = b.diffs, k = b.k || .85, baseH = b.baseH || 26, bw = 6, gap = 1.2, x0 = 11, top = 2.4;
  const maxD = Math.max(...diffs), yb = top + maxD * k + 4 + baseH, yl = yb - baseH, W = x0 + 4.6 + diffs.length * (bw + gap) + .4;
  let g = ln(x0, top - 1.4, x0, yb, INK, .35) + ln(x0, yb, W - .4, yb, INK, .35);
  diffs.forEach((d, i) => {
    const x = x0 + 4.6 + i * (bw + gap);
    g += `<rect x="${f(x)}" y="${f(yl)}" width="${bw}" height="${f(baseH)}" fill="#BAE6FD" stroke="${INK}" stroke-width=".3"/>`;
    if (d) g += `<rect x="${f(x)}" y="${f(yl - d * k)}" width="${bw}" height="${f(d * k)}" fill="#94A3B8" stroke="${INK}" stroke-width=".3"/>`;
  });
  g += ln(x0, yl, W - .4, yl, INK, .4) + txt(x0 - 1.4, yl + 1.3, b.base, { a: "end", fs: 3.6, w: 600 }) + txt(x0 - 1.4, top + 2.2, b.unit || "সেমি", { a: "end", fs: 3.4, w: 500 });
  return `<svg class="c5p105-svg" width="${f(W)}mm" height="${f(yb + .6)}mm" viewBox="0 0 ${f(W)} ${f(yb + .6)}">${g}</svg>`;
}

// ── p109 কাজ ৬: the days' table with its arrows ──
function tempSvg() {
  const W = 160, L = 100, dw = 15, c = [L, L + dw, L + 2 * dw, L + 3 * dw, W], fs = 3.75;
  const OR = "#FDBA8C", GR = "#D9F99D", CY = "#7DD3FC", CR = "#FEF3C7", BAND = "#BFDBFE", HD = "#FEE2E2";
  const H = [7.2, 7.6, 14.6, 7.6, 14.6, 7.6, 7.4, 9.4, 7.4, 7.4, 11]; // the rows' heights
  const Y = [0]; H.forEach((h) => Y.push(Y[Y.length - 1] + h));
  const mid = (r) => Y[r] + H[r] / 2, base = (r) => mid(r) + 1.3;
  let fills = "", lines = "", words = "";
  const cell = (r, a, z, fill, s) => { if (fill) fills += `<rect x="${f(c[a])}" y="${f(Y[r])}" width="${f(c[z] - c[a])}" height="${f(H[r])}" fill="${fill}"/>`; if (s) words += txt((c[a] + c[z]) / 2, base(r), s, { a: "middle", fs: 3.6 }); };
  const vbar = (r, xs) => { for (const x of xs) lines += ln(x, Y[r], x, Y[r + 1]); };
  // row 0: the days
  ["সোম", "মঙ্গল", "বুধ", "বৃহস্পতি"].forEach((d, i) => cell(0, i, i + 1, HD, d)); vbar(0, c.slice(0, 4));
  // row 1: সোম, মঙ্গল ও বুধ
  words += txt(1.6, base(1), "সোম, মঙ্গল ও বুধবারের গড় তাপমাত্রা ছিল ৩০°সে", { fs });
  cell(1, 0, 3, OR, "৯০° সে"); vbar(1, [c[0], c[3]]);
  // row 2: their total, boxes to fill
  const boxes = (r, y, op, unit) => { words += box(1.6, y, 17, 6) + txt(22.6, y + 4.4, op, { a: "middle", fs: 4 }) + box(27, y, 17, 6) + txt(48.5, y + 4.4, "=", { a: "middle", fs: 4 }) + box(53, y, 17, 6) + (unit ? txt(72, y + 4.4, "°সে", { fs }) : ""); };
  words += txt(1.6, Y[2] + 4.8, "সোম, মঙ্গল ও বুধবারের মোট তাপমাত্রা ছিল", { fs }); boxes(2, Y[2] + 7.2, "×", true);
  // row 3: মঙ্গল, বুধ ও বৃহস্পতি
  words += txt(1.6, base(3), "মঙ্গল, বুধ ও বৃহস্পতিবারের গড় তাপমাত্রা ছিল ৩৩°সে", { fs });
  cell(3, 1, 4, GR, "৯৯°সে"); vbar(3, [c[0], c[1]]);
  words += txt(1.6, Y[4] + 4.8, "মঙ্গল, বুধ ও বৃহস্পতিবারের মোট তাপমাত্রা ছিল", { fs }); boxes(4, Y[4] + 7.2, "×", true);
  // row 5: বৃহস্পতি given
  words += txt(1.6, base(5), "দেওয়া আছে বৃহস্পতিবারের তাপমাত্রা ছিল ৩৫°সে", { fs });
  cell(5, 3, 4, CY, "৩৫°সে"); vbar(5, c.slice(0, 4));
  // row 6: the band
  fills += `<rect x="0" y="${f(Y[6])}" width="${W}" height="${f(H[6])}" fill="${BAND}"/>`; words += txt(1.6, base(6), "মঙ্গল ও বুধবারের মোট তাপমাত্রা ছিল", { fs });
  // row 7: boxes, মঙ্গল ও বুধ
  boxes(7, Y[7] + 1.7, "−", false); cell(7, 1, 3, CR, "মঙ্গল ও বুধ"); vbar(7, [c[0], c[1], c[3]]);
  // rows 8–9: the words over two rows; সোম, মঙ্গল ও বুধ
  words += txt(1.6, base(8), "যেহেতু সোম, মঙ্গল ও বুধবারের মোট তাপমাত্রা ছিল", { fs }) + txt(1.6, base(9), "৯০°সে। সুতরাং সোমবারের তাপমাত্রা ছিল", { fs });
  vbar(8, c.slice(0, 4)); cell(9, 0, 3, OR, "সোম, মঙ্গল ও বুধ"); vbar(9, [c[0], c[3]]);
  // row 10: the answer; সোম | মঙ্গল ও বুধ
  boxes(10, Y[10] + 2.5, "−", true); cell(10, 0, 1, OR); cell(10, 1, 3, CR, "মঙ্গল ও বুধ"); vbar(10, [c[0], c[1], c[3]]);
  words += txt((c[0] + c[1]) / 2, Y[10] + 4.6, "সোম", { a: "middle", fs: 3.6 });
  // the horizontal lines (the words of rows 8–9 share one cell on the left)
  for (let r = 1; r < H.length; r++) lines += r === 9 ? ln(c[0], Y[r], W, Y[r]) : ln(0, Y[r], W, Y[r]);
  lines += `<rect x="0" y="0" width="${W}" height="${f(Y[H.length])}" fill="none" stroke="${INK}" stroke-width=".45"/>`;
  // the blue arrows: up from সোম's row to মঙ্গল ও বুধ, and into সোম, মঙ্গল ও বুধ and সোম; back left to the answer
  const ax = 93.5, B = "#1D4ED8", sw = 1.3, head = (x, y, dir) => `<path d="M${f(x)} ${f(y)}l${f(-2.6 * dir)} -2l0 4z" fill="${B}"/>`;
  const a = `<path d="M${ax} ${f(mid(10) + 1.6)}V${f(mid(7) + 1.2)}Q${ax} ${f(mid(7) - 1.2)} ${ax + 2.4} ${f(mid(7) - 1.2)}H${f(c[0] - 1.8)}" stroke="${B}" stroke-width="${sw}" fill="none"/>${head(c[0] + .6, mid(7) - 1.2, 1)}
    ${ln(ax, mid(9), c[0] - 1.8, mid(9), B, sw)}${head(c[0] + .6, mid(9), 1)}
    ${ln(ax, mid(10) + 1, c[0] - 1.8, mid(10) + 1, B, sw)}${head(c[0] + .6, mid(10) + 1, 1)}
    ${ln(ax, mid(10) + 1, 83.6, mid(10) + 1, B, sw)}${head(81.2, mid(10) + 1, -1)}`;
  const HH = Y[H.length];
  return `<svg class="c5p105-svg" width="${W}mm" height="${f(HH + .5)}mm" viewBox="-.25 -.25 ${W + .5} ${f(HH + .5)}">${fills}${lines}${words}${a}</svg>`;
}

module.exports = {
  kinds: {
    c5p105_lines: (b, ctx) => linesHtml(b, ctx),
    c5p105_step: (b, ctx, page) => `<div class="c5p105-step ${b.tone || "peach"}"><div class="c5p105-band"><b>ধাপ-${ctx.esc(b.n)} :</b> ${mk(ctx, b.text)}</div>${b.body ? `<div class="c5p105-sb">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>` : ""}</div>`,
    c5p105_tab: (b, ctx, page) => tabHtml(b, ctx, page),
    c5p105_jars: (b) => `<div class="c5p105-c">${jarsSvg(b)}</div>`,
    c5p105_glasses: (b) => `<div class="c5p105-c">${glassesSvg(b)}</div>`,
    c5p105_level: (b) => `<div class="c5p105-c">${levelSvg(b)}</div>`,
    c5p105_bars: (b) => `<div class="c5p105-c">${barsSvg(b)}</div>`,
    c5p105_temp: () => `<div class="c5p105-c">${tempSvg()}</div>`,
    c5p105_mcq: (b, ctx) => { const L = ["ক", "খ", "গ", "ঘ"];
      return `<div class="c5p105-mcq">${b.items.map((it, i) => `<div class="c5p105-mq"><b class="c5p105-qn">(${ctx.bn(i + 1)})</b><span>${ctx.md(it.q)}</span></div><div class="c5p105-mo">${
        it.opts.map((o, j) => `<span><i class="c5p105-tk"></i>(${L[j]}) ${ctx.md(o)}</span>`).join("")}</div>`).join("")}</div>`; },
    c5p105_qn: (b, ctx) => `<div class="ext"><span class="mk">${ctx.esc(b.n)}</span><span>${ctx.md(b.text)}</span></div>`,
    c5p105_rule: (b, ctx) => `<div class="c5p105-rule${b.center ? " c" : ""}"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${ctx.md(b.text)}</div>`,
  },
  css: `
svg.c5p105-svg { display: block; overflow: visible; flex: none } .c5p105-c { display: flex; justify-content: center }
.c5p105-lines { display: flex; flex-direction: column; gap: 1.6mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.c5p105-lines.c { align-items: center } .c5p105-ln { white-space: nowrap } .c5p105-ln.c { align-self: center }
.c5p105-lines.wrap .c5p105-ln { white-space: normal; padding-left: var(--hg, 0mm); text-indent: calc(-1 * var(--hg, 0mm)) }
.c5p105-l2 { display: flex; justify-content: space-between; align-items: center; white-space: nowrap; gap: 4mm }
.c5p105-wb { display: inline-block; width: var(--bw, 20mm); height: 7.4mm; vertical-align: -2.2mm; border: .55mm solid ${AMB}; background: ${AMBF}; border-radius: 1.8mm; margin: 0 .8mm }
.c5p105-lb { display: inline-block; width: var(--lw, 30mm); height: 7.4mm; vertical-align: -2.2mm; border: .55mm solid ${AMB}; background: ${AMBF}; border-radius: 1.8mm; margin: 0 .8mm }
.c5p105-lines .abox { width: var(--sb, 11mm) }
.c5p105-lines .ansbox { min-width: 12mm; padding: 0 2mm; font-size: 12pt; vertical-align: .2mm }
.c5p105-peach { background: #FFEDE5; border: .55mm solid #FDBA9A; border-radius: 4mm; padding: 2.4mm 4mm; box-shadow: 0 1mm 0 #FED7C3 }
.c5p105-step { display: flex; flex-direction: column; gap: 1.6mm }
.c5p105-band { align-self: flex-start; font: 600 12.5pt/1.35 'Noto Sans Bengali'; padding: 1.3mm 5mm 1mm 3mm; border-left: 1.8mm solid; border-radius: 1.4mm 3mm 3mm 1.4mm }
.c5p105-band b { font-weight: 800; margin-right: .6mm }
.c5p105-step.peach .c5p105-band { background: #FDE4DC; border-color: #F97362 } .c5p105-step.peach .c5p105-band b { color: #C2410C }
.c5p105-step.pink .c5p105-band { background: #FBCFE8; border-color: #DB2777 } .c5p105-step.pink .c5p105-band b { color: #9D174D }
.c5p105-step.blue .c5p105-band { background: #BAE6FD; border-color: #0284C7 } .c5p105-step.blue .c5p105-band b { color: #075985 }
.c5p105-sb { padding-left: 10mm; display: flex; flex-direction: column; gap: 1.6mm }
.c5p105-tab { width: 100%; border-collapse: separate; border-spacing: 0; border: .6mm solid var(--c); border-radius: 2.6mm; overflow: hidden; background: #fff; font: 700 12pt/1.3 'Baloo Da 2'; box-shadow: 0 1mm 0 var(--s) }
.c5p105-tab td { text-align: center; vertical-align: middle; padding: 1.2mm .8mm .9mm; border-right: .3mm solid color-mix(in srgb, var(--c) 30%, #fff); border-bottom: .3mm solid color-mix(in srgb, var(--c) 30%, #fff); height: 8.4mm }
.c5p105-tab tr td:last-child { border-right: 0 } .c5p105-tab tr:last-child td { border-bottom: 0 }
.c5p105-tab td.h { background: var(--s); color: var(--d); font-weight: 800 } .c5p105-tab td.w { font: 500 1em/1.4 'Noto Sans Bengali' }
.c5p105-tab td.bk { padding: 1.6mm 3mm; font-weight: 500 } .c5p105-tab td.bk .tx { font-size: 12pt }
.c5p105-mcq { display: grid; grid-template-columns: 1fr; gap: .6mm; padding-left: 1mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.c5p105-mq { display: grid; grid-template-columns: 9mm 1fr } .c5p105-qn { color: #EA580C; font: 800 12.5pt/1.45 'Baloo Da 2' }
.c5p105-mo { display: grid; grid-template-columns: repeat(4, 1fr); padding-left: 9mm; margin-bottom: .6mm }
.c5p105-mo span { display: flex; align-items: center; gap: 1.4mm; white-space: nowrap }
.c5p105-tk { display: inline-block; flex: none; width: 4.6mm; height: 4.6mm; border: .45mm solid #3B9EE8; border-radius: 1.2mm; background: #fff }
.c5p105-rule { background: #E0F2FE; border: .55mm solid #7DD3FC; border-radius: 3mm; padding: 2mm 4mm 1.6mm; font: 600 12.5pt/1.45 'Noto Sans Bengali'; box-shadow: 0 .8mm 0 #BAE6FD }
.c5p105-rule.c { text-align: center }
/* Class 4's smaller speech cards may run 150 mm wide on pages 105–114 (one line, as printed) */
:is(${Array.from({ length: 10 }, (_, i) => `.page[data-page="${105 + i}"]`).join(", ")}) .c4p081-say .sb { max-width: 150mm }
`,
};
