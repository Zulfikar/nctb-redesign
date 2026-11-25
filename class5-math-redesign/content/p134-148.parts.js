// Printed pages 134–148's own kinds (prefixed c5p134_, classes c5p134-): chapter ৮ পরিমাপ, its time part (সময়ের রূপান্তর,
// বাংলা ও ইংরেজি ক্যালেন্ডার, ages and dates, ২৪ ঘণ্টা সময়সূচি, the train timetable, অধিবর্ষ/দশক/যুগ/শতাব্দী, the review and নিজে
// করি). Written by a helper (25 Nov 2026). Every calendar, clock, time line, date strip and arrow is drawn here by code. Units: mm.
//
//   c5p134_eqs    lines of working on a grid of columns (so they line up), with the book's thin curved arrows from one line's
//                 number down to the same number in the next line (p134):
//                 { cols: [mm…], al?: "lcr…", rh?: 8, size?: 12.5, indent?, rows: [[cell…]…], curves?: [{ from: [r, c, dx],
//                   to: [r, c, dx], y1?, y2?, k? }] }   a cell is markup or { t, span, al }; a curve runs from the bottom of row
//                 r's cell c (dx mm into it) to the top of the other row's cell (an arrowhead there)
//   c5p134_arc    a line of text whose stretch ⟦…⟧ has the book's blue arc over it, from its first number to its last (p134:
//                 "১ দিন = ⟦২৪ ঘণ্টা, তাহলে … ৪৮ × ২৪⟧ = …"): { text, size? }. The arc spans the stretch exactly (CSS), so it
//                 needs no measuring; the line keeps room above for it
//   c5p134_hooks  p135's lines, each joined to the next by the book's hollow double-line hook arrow (from the end of a line,
//                 right, down and back left to the end of the next): { lines: [markup…], xs: [x of each hook's bend, mm], w,
//                 rh?, size? }. The bars start at each line's real end (flex), so they meet the text whatever its width
//   c5p134_cal    a calendar month by code: { y, m, name?, bnr?, cap?, prev?, wk?, colors?: { day: "r" | "y" | "g" }, cw?, ch?,
//                 fs? }   the weeks run Sat → Fri as the book prints them, English weekday heads and dates, and under each date
//                 its Bangla date (small), computed from the revised Bangla calendar (1 বৈশাখ = 14 April, …, ফাল্গুন 30 days in
//                 a leap year). name: the English month (left of the title bar); bnr: its Bangla months (right); cap: a centred
//                 title above instead (p144's "February-2024"); prev: the last days of the month before in the first week;
//                 wk: the Saturday and Friday columns pink (p144); colors: days filled red, yellow or green (p140's routine)
//   c5p134_strip  p137's strips of dates: { cells: [text…], cw?, ch?, fs?, shade: [i…], tops: [[i, text, "l" | "c"]…], dotted?,
//                 div?: i (a dotted line after cell i), down?: i (a blue arrow down over the line before cell i), spans:
//                 [[a, b, label]…] (an arrow under cells a…b, both ends) }
//   c5p134_ymd    বছর | মাস | দিন in columns (pp138, 139, 146): { heads, rows: [[cell…]…], ans: [cell…], shade?: [col…], cw?,
//                 size?, bw? }   a cell: "২০২৪" · "□" a box · "~১৩" struck through in red · "৫^+১২" a small red raised part
//   c5p134_form   p140's লেবেল ▭ বছর ▭ মাস rows: { rows: [{ l, a, b, u1, u2, sa? }], lw?, bw?, rh?, top?: { a?, b? } }
//                 a / b: the boxes' contents ("" empty); sa: the first box's digit struck through; the last row comes after a
//                 rule. top: the book's working above the first row: a "৮" in a circle over box a; over box b an empty box and
//                 the blue ring with "+" (borrowing a year as ১২ months)
//   c5p134_tab    a table: { cols: [mm…], head?: [cell…], rows: [[cell…]…], title?, size?, plain?, rh? }   a cell is markup (▭ a
//                 wide box, "⇓" the timetable's red arrow) or { t, rs, cs, al: "l" | "r", cls, bg }; plain: no lines (rows of
//                 questions with boxes)
//   c5p134_tline  p141's 24-hour line: the 0–23 scale over the পূর্বাহ্ণ/অপরাহ্ণ bar, the 12-hour scale under it, the red frames on
//                 6, 13, 20 and 22, the four labels with their arrows ({ w? })
//   c5p134_clocks p146 ৫: clocks in a ruled grid with an empty answer cell under each: { items: [{ h, m, lab, ly?: "t" | "b",
//                 lx? }], cols?: 4, size? }   the hands at the exact time, the clock's own label (অপরাহ্ণ / পূর্বাহ্ণ) inside
//   c5p134_ld     p144's divisions by ৪০০ in dotted frames: { items: [{ d, n, q?, sub?, rem?, lab? }] }
//   c5p134_bul    a box of bullet points: { items, tone?: "blue" | "tan" | "none", title?, size? } (title: a tab on its top edge)
//   c5p134_qbox   questions each followed by its boxes, the boxes lined up in a column: { rows: [[question, boxes]…], lw?,
//                 size?, gap?, bw? } (markup; ▭ a wide box)
//   c5p134_qn     a question numbered as the core numbers an exercise ("৫।"), its words beside a drawing: { n, text }
//   c5p134_band   a full-width tinted band of words (the book's headings in a coloured strip): { text, tone?, size? }
const INK = "#1E2433", RED = "#DC2626", BLUE = "#1D4ED8";
const f2 = (x) => Math.round(x * 100) / 100;
const sum = (a) => a.reduce((s, x) => s + x, 0);
const FB = `font-family="'Baloo Da 2'"`, FN = `font-family="'Noto Sans Bengali'"`;

// an arrowhead with its tip at (x, y), pointing along (dx, dy)
function head(x, y, dx, dy, s = 1.4, col = INK) {
  const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  return `<path d="M${f2(x)} ${f2(y)}L${f2(x - ux * s * 1.7 + nx * s * 0.72)} ${f2(y - uy * s * 1.7 + ny * s * 0.72)}L${f2(x - ux * s * 1.7 - nx * s * 0.72)} ${f2(y - uy * s * 1.7 - ny * s * 0.72)}Z" fill="${col}"/>`;
}
// this file's markup on top of the core's: ▭ a wide box (--bw)
const xmd = (ctx, s) => ctx.md(String(s ?? "").replace(/▭/g, "⟦W⟧")).replace(/⟦W⟧/g, `<span class="c5p134-wb"></span>`);

// ── c5p134_eqs ──
function eqsHtml(b, ctx) {
  const cols = b.cols, rh = b.rh || 8, al = b.al || "", xs = cols.map((_, i) => sum(cols.slice(0, i))), W = sum(cols), H = rh * b.rows.length;
  let cells = "";
  b.rows.forEach((row, r) => {
    let c = 0;
    for (const cell of row) {
      const o = typeof cell === "string" ? { t: cell } : cell, span = o.span || 1, a = o.al || al[c] || "l";
      if (o.t) cells += `<div class="c5p134-ec ${a}" style="left:${f2(xs[c])}mm;top:${f2(r * rh)}mm;width:${f2(sum(cols.slice(c, c + span)))}mm;height:${rh}mm"><span>${xmd(ctx, o.t)}</span></div>`;
      c += span;
    }
  });
  let g = "";
  for (const cv of b.curves || []) {
    const [r1, c1, d1] = cv.from, [r2, c2, d2] = cv.to;
    const x1 = xs[c1] + d1, y1 = r1 * rh + rh * (cv.y1 ?? 0.86), x2 = xs[c2] + d2, y2 = r2 * rh + rh * (cv.y2 ?? 0.2);
    const k = cv.k ?? 0.38, cx = x2 + (x1 - x2) * k, cy = y1 + (y2 - y1) * 0.05;
    g += `<path d="M${f2(x1)} ${f2(y1)}Q${f2(cx)} ${f2(cy)} ${f2(x2 + (x1 - x2) * 0.04)} ${f2(y2 - (y2 - y1) * 0.1)}" fill="none" stroke="${INK}" stroke-width=".3"/>${head(x2, y2, x2 - cx, y2 - cy, 1.05)}`;
  }
  return `<div class="c5p134-eqs" style="width:${f2(W)}mm;height:${f2(H)}mm;margin-left:${b.indent || 0}mm;font-size:${b.size || 12.5}pt;--bw:${b.bw || 15}mm">${cells}${g ? `<svg class="c5p134-eqa" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${g}</svg>` : ""}</div>`;
}

// ── c5p134_arc ──
const ARC = `<svg class="c5p134-arc" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 10Q50 -9 100 10"/></svg><svg class="c5p134-ah" viewBox="0 0 10 8"><path d="M0 0L10 4L0 8Z"/></svg>`;
const arcLine = (ctx, s) => ctx.md(s).replace(/⟦(.+?)⟧/g, `<span class="c5p134-aw">$1${ARC}</span>`);

// ── c5p134_hooks ──
function hooksHtml(b, ctx) {
  const n = b.lines.length, rh = b.rh || 10, W = b.w || 150, X = b.xs, bt = 2.2, R = 3, off = 1.5, HL = 6.2, HH = 5.6;
  const yc = (i) => i * rh + rh / 2, has = (k) => k >= 0 && k < n - 1 && X[k] != null;
  const yo = (k) => yc(k) + (has(k - 1) ? off : 0), yi = (k) => yc(k) - (has(k) ? off : 0);
  const bar = (l, r, y) => `<i class="c5p134-hb" style="left:${f2(l)}mm;right:${f2(r)}mm;top:${f2(y - bt / 2)}mm;height:${bt}mm"></i>`;
  const hd = (y) => `<svg class="c5p134-hh" style="left:1mm;top:${f2(y - HH / 2)}mm" width="${HL}mm" height="${HH}mm" viewBox="0 0 ${HL} ${HH}"><path d="M${HL} ${f2(HH / 2 - bt / 2)}V.3L.4 ${f2(HH / 2)}L${HL} ${f2(HH - .3)}V${f2(HH / 2 + bt / 2)}" fill="#fff" stroke="${BLUE}" stroke-width=".35" stroke-linejoin="round"/></svg>`;
  const rows = b.lines.map((t, i) => {
    let z = "";
    if (has(i - 1)) z += bar(HL + 0.8, W - X[i - 1] + R, yi(i) - i * rh) + hd(yi(i) - i * rh);
    if (has(i)) z += bar(has(i - 1) ? HL + 1.4 : 1.4, W - X[i] + R, yo(i) - i * rh);
    return `<div class="c5p134-hr" style="height:${rh}mm"><span class="c5p134-ht">${ctx.md(t)}</span><span class="c5p134-hz">${z}</span></div>`;
  }).join("");
  let g = "";
  for (let k = 0; k < n - 1; k++) {
    if (!has(k)) continue;
    const x = X[k], a = yo(k), c = yi(k + 1), d = `M${f2(x - R - 0.3)} ${f2(a)}H${f2(x - R)}A${R} ${R} 0 0 1 ${f2(x)} ${f2(a + R)}V${f2(c - R)}A${R} ${R} 0 0 1 ${f2(x - R)} ${f2(c)}H${f2(x - R - 0.3)}`;
    g += `<path d="${d}" fill="none" stroke="${BLUE}" stroke-width="${bt}"/><path d="${d}" fill="none" stroke="#fff" stroke-width="${f2(bt - 0.7)}"/>`;
  }
  return `<div class="c5p134-hooks" style="width:${W}mm;font-size:${b.size || 12.5}pt">${rows}<svg class="c5p134-hov" width="${W}mm" height="${n * rh}mm" viewBox="0 0 ${W} ${n * rh}">${g}</svg></div>`;
}

// ── c5p134_cal: the revised Bangla calendar (Bangla Academy, 2019): the day of the Gregorian month each Bangla month starts on ──
const BN_START = [0, 15, 14, 15, 14, 15, 15, 16, 16, 16, 17, 16, 16]; // Jan: মাঘ 15, Feb: ফাল্গুন 14, Mar: চৈত্র 15, Apr: বৈশাখ 14, …
const dim = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();
function bnDay(y, m, d) {
  const s = BN_START[m];
  if (d >= s) return d - s + 1;
  const pm = m === 1 ? 12 : m - 1, py = m === 1 ? y - 1 : y;
  return dim(py, pm) - BN_START[pm] + 1 + d; // ফাল্গুন runs on to 30 in a leap year by itself (29 Feb exists)
}
const WD = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
function calHtml(b, ctx) {
  const { y, m } = b, days = dim(y, m), lead = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 1) % 7; // Sat = 0 … Fri = 6
  const pm = m === 1 ? 12 : m - 1, py = m === 1 ? y - 1 : y, pdays = dim(py, pm), colors = b.colors || {};
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(b.prev ? { d: pdays - lead + 1 + i, bd: bnDay(py, pm, pdays - lead + 1 + i) } : null);
  for (let d = 1; d <= days; d++) cells.push({ d, bd: bnDay(y, m, d), c: colors[d] });
  while (cells.length % 7) cells.push(null);
  const wk = (i) => b.wk && (i === 0 || i === 6) ? " w" : "";
  let rows = "";
  for (let r = 0; r < cells.length / 7; r++) rows += `<tr>${cells.slice(r * 7, r * 7 + 7).map((c, i) => c ? `<td class="d${c.c ? " c-" + c.c : ""}${wk(i)}"><b>${c.d}</b><i>${ctx.bn(c.bd)}</i></td>` : `<td class="e${wk(i)}"></td>`).join("")}</tr>`;
  const title = b.name ? `<tr class="c5p134-ct"><td colspan="7"><div><b>${ctx.esc(b.name)}</b><span>${ctx.esc(b.bnr || "")}</span></div></td></tr>` : "";
  return `<div class="c5p134-cal" style="--cw:${b.cw || 9}mm;--ch:${b.ch || 9}mm;--fs:${b.fs || 11}pt">${b.cap ? `<div class="c5p134-cap">${ctx.esc(b.cap)}</div>` : ""}<table>${title}<tr class="c5p134-cw">${WD.map((d, i) => `<th class="${wk(i).trim()}">${d}</th>`).join("")}</tr>${rows}</table></div>`;
}

// ── c5p134_strip ──
function stripSvg(b, ctx) {
  const n = b.cells.length, cw = b.cw || 11, ch = b.ch || 7.4, fs = b.fs || 4.4, lfs = b.lfs || 3.9;
  const top = b.tops ? lfs * 1.6 : 0.4, T = top + (b.down != null ? 3.2 : 0), sp = b.spans ? 7 : 0.6, x0 = 0.4, W = n * cw + 0.8, H = T + ch + sp;
  let g = "";
  b.cells.forEach((t, i) => {
    g += `<rect x="${f2(x0 + i * cw)}" y="${f2(T)}" width="${cw}" height="${ch}" fill="${(b.shade || []).includes(i) ? "#CBD5E1" : "#fff"}"/>`;
    g += `<text x="${f2(x0 + i * cw + cw / 2)}" y="${f2(T + ch / 2 + fs * 0.36)}" text-anchor="middle" ${FB} font-weight="700" font-size="${fs}" fill="${INK}">${ctx.esc(t)}</text>`;
  });
  for (let i = 1; i < n; i++) g += `<path d="M${f2(x0 + i * cw)} ${f2(T)}V${f2(T + ch)}" stroke="${INK}" stroke-width=".25"${b.dotted ? ` stroke-dasharray=".5 .5"` : ""}/>`;
  g += `<rect x="${x0}" y="${f2(T)}" width="${f2(n * cw)}" height="${ch}" fill="none" stroke="${INK}" stroke-width=".4"/>`;
  if (b.div != null) { const x = x0 + (b.div + 1) * cw; g += `<path d="M${f2(x)} ${f2(T - 1)}V${f2(T + ch + 1)}" stroke="${INK}" stroke-width=".7" stroke-dasharray=".7 .7"/>`; }
  for (const [i, t, a] of b.tops || []) {
    const x = a === "c" ? x0 + i * cw + cw / 2 : x0 + i * cw + 0.6;
    g += `<text x="${f2(x)}" y="${f2(top - lfs * 0.45 + (b.down != null ? 3.2 : 0))}" text-anchor="${a === "c" ? "middle" : "start"}" ${FN} font-weight="600" font-size="${lfs}" fill="${INK}">${ctx.esc(t)}</text>`;
  }
  if (b.down != null) { // the book's fat blue arrow, pointing down at the line between two months
    const x = x0 + b.down * cw - 3.4, yb = T - 0.4;
    g += `<path d="M${f2(x - 1.3)} ${f2(yb - 6.4)}H${f2(x + 1.3)}V${f2(yb - 3.4)}H${f2(x + 3)}L${f2(x)} ${f2(yb)}L${f2(x - 3)} ${f2(yb - 3.4)}H${f2(x - 1.3)}Z" fill="#0EA5E9"/>`;
  }
  for (const [a, z, t] of b.spans || []) {
    const xa = x0 + a * cw + 0.3, xz = x0 + (z + 1) * cw - 0.3, y = T + ch + 3.4, w = t.length * lfs * 0.46 + 3;
    g += `<path d="M${f2(xa + 1.4)} ${f2(y)}H${f2(xz - 1.4)}" stroke="${INK}" stroke-width=".3"/>${head(xa, y, -1, 0, 1)}${head(xz, y, 1, 0, 1)}`;
    g += `<rect x="${f2((xa + xz) / 2 - w / 2)}" y="${f2(y - 2.4)}" width="${f2(w)}" height="4.8" fill="#fff"/><text x="${f2((xa + xz) / 2)}" y="${f2(y + lfs * 0.36)}" text-anchor="middle" ${FN} font-weight="600" font-size="${lfs}" fill="${INK}">${ctx.esc(t)}</text>`;
  }
  return `<svg class="c5p134-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${g}</svg>`;
}

// ── c5p134_ymd ──
function ymdCell(ctx, s) {
  if (s == null || s === "") return "";
  if (s === "□") return `<span class="c5p134-yb"></span>`;
  const [base, sup] = String(s).split("^");
  let h = base.startsWith("~") ? `<span class="c5p134-st b">${ctx.esc(base.slice(1))}</span>` : ctx.esc(base);
  if (sup) h += `<sup class="c5p134-sp">${ctx.esc(sup)}</sup>`;
  return h;
}
function ymdHtml(b, ctx) {
  const sh = (i) => (b.shade || []).includes(i) ? ` class="sh"` : "";
  const ans = b.ans ? `<tr class="a">${b.ans.map((c, i) => `<td${sh(i)}>${ymdCell(ctx, c)}</td>`).join("")}</tr>` : "";
  return `<table class="c5p134-ymd" style="--yw:${b.cw || 24}mm;--ybw:${b.bw || 14}mm;font-size:${b.size || 13}pt"><tr class="h">${b.heads.map((h, i) => `<th${sh(i)}>${ctx.esc(h)}</th>`).join("")}</tr>${b.rows.map((r, j) => `<tr${j === b.rows.length - 1 ? ` class="l"` : ""}>${r.map((c, i) => `<td${sh(i)}>${ymdCell(ctx, c)}</td>`).join("")}</tr>`).join("")}${ans}</table>`;
}

// ── c5p134_form ──
function formHtml(b, ctx) {
  const lw = b.lw || 62, bw = b.bw || 19, rh = b.rh || 8.4, n = b.rows.length;
  const box = (t, s) => `<span class="c5p134-fb">${t ? (s ? `<span class="c5p134-st">${ctx.esc(t)}</span>` : ctx.esc(t)) : ""}</span>`;
  let top = "";
  if (b.top) {
    const ring = b.top.b ? `<span class="c5p134-fb c5p134-fbt"></span><span class="c5p134-plus">+</span><i class="c5p134-ring"></i>` : "";
    top = `<tr class="c5p134-ftop"><td></td><td>${b.top.a ? `<span class="c5p134-cir">${ctx.esc(b.top.a)}</span>` : ""}</td><td></td><td class="c5p134-rc">${ring}</td><td></td></tr>`;
  }
  const rows = b.rows.map((r, i) => `<tr class="${i === n - 1 ? "c5p134-fl" : ""}"><td class="c5p134-flb">${ctx.esc(r.l)}</td><td>${box(r.a, r.sa)}</td><td class="c5p134-fu">${ctx.esc(r.u1 || "বছর")}</td><td>${box(r.b)}</td><td class="c5p134-fu l">${ctx.esc(r.u2 || "মাস")}</td></tr>`).join("");
  return `<table class="c5p134-form" style="--rh:${rh}mm;--bw:${bw}mm"><colgroup><col style="width:${lw}mm"><col style="width:${bw + 4}mm"><col style="width:${b.uw || 22}mm"><col style="width:${bw + 4}mm"><col style="width:${b.uw2 || 30}mm"></colgroup>${top}${rows}</table>`;
}

// ── c5p134_tab ──
const DARR = `<svg class="c5p134-darr" viewBox="0 0 8 12" width="2.6mm" height="4mm"><path d="M2.6 0V8.2M5.4 0V8.2" stroke="${RED}" stroke-width=".7"/><path d="M.6 6.4L4 11.4L7.4 6.4" fill="none" stroke="${RED}" stroke-width=".8" stroke-linejoin="round"/></svg>`;
function tabHtml(b, ctx) {
  const cell = (c, th) => {
    const o = c != null && typeof c === "object" ? c : { t: c ?? "" }, tag = th ? "th" : "td";
    const inner = o.t === "⇓" ? DARR : xmd(ctx, o.t);
    return `<${tag}${o.rs ? ` rowspan="${o.rs}"` : ""}${o.cs ? ` colspan="${o.cs}"` : ""}${o.al || o.cls ? ` class="${[o.al, o.cls].filter(Boolean).join(" ")}"` : ""}${o.bg ? ` style="background:${o.bg}"` : ""}>${inner}</${tag}>`;
  };
  const n = b.cols ? b.cols.length : (b.head || b.rows[0]).length;
  const cg = b.cols ? `<colgroup>${b.cols.map((w) => `<col style="width:${w}mm">`).join("")}</colgroup>` : "";
  const title = b.title ? `<tr class="c5p134-tti"><th colspan="${n}">${ctx.md(b.title)}</th></tr>` : "";
  const style = `${b.size ? `font-size:${b.size}pt;` : ""}${b.rh ? `--rh:${b.rh}mm;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}${b.cols ? `width:${sum(b.cols)}mm;` : ""}`;
  return `<table class="c5p134-tab${b.plain ? " c5p134-plain" : ""}${b.cls ? " " + b.cls : ""}" style="${style}">${cg}${title}${b.head ? `<tr class="c5p134-th">${b.head.map((h) => cell(h, true)).join("")}</tr>` : ""}${b.rows.map((r) => `<tr>${r.map((c) => cell(c)).join("")}</tr>`).join("")}</table>`;
}

// ── c5p134_tline: p141's 24-hour line ──
function tlineSvg(b) {
  const W = b.w || 160, xa = 6, u = (W - 12) / 24, X = (h) => xa + h * u;
  const yLab = 0.6, yTopN = 14.6, yAx = 19.4, yBar = 25.4, bh = 6.6, yBot = yBar + bh, yBotN = yBot + 8.2, yCall = 45.4, ch = 7, yLab2 = 55.2, H = 62.6;
  let g = "";
  const t = (x, y, s, fs, o = {}) => `<text x="${f2(x)}" y="${f2(y)}" text-anchor="${o.a || "middle"}" ${o.bn ? FN : FB} font-weight="${o.w || 600}" font-size="${fs}" fill="${o.c || INK}">${s}</text>`;
  const tag = (x, y, w, s) => `<rect x="${f2(x - w / 2)}" y="${f2(y)}" width="${f2(w)}" height="6.8" rx="1" fill="#67C9D0" stroke="${INK}" stroke-width=".25"/>${t(x, y + 4.9, s, 3.9, { bn: true })}`;
  g += tag(W / 2, yLab, 40, "২৪ ঘণ্টা সময়সূচি");
  // the bar: পূর্বাহ্ণ (0–12) and অপরাহ্ণ (12–24), the white band above it
  g += `<rect x="${f2(X(0))}" y="${f2(yAx)}" width="${f2(24 * u)}" height="${f2(yBar - yAx)}" fill="#fff"/>`;
  g += `<rect x="${f2(X(0))}" y="${f2(yBar)}" width="${f2(12 * u)}" height="${bh}" fill="#D1D5DB"/><rect x="${f2(X(12))}" y="${f2(yBar)}" width="${f2(12 * u)}" height="${bh}" fill="#9CA3AF"/>`;
  g += `<path d="M${f2(X(0))} ${f2(yBar)}H${f2(X(24))}" stroke="${BLUE}" stroke-width=".25"/><path d="M${f2(X(12))} ${f2(yBar)}V${f2(yBot)}" stroke="${INK}" stroke-width=".3"/>`;
  g += t(X(3.3), yBar + bh / 2 + 1.4, "পূর্বাহ্ণ", 3.9, { bn: true }) + t(X(18.1), yBar + bh / 2 + 1.4, "অপরাহ্ণ", 3.9, { bn: true });
  g += `<path d="M${f2(X(0))} ${f2(yAx)}H${f2(X(24))}M${f2(X(0))} ${f2(yBot)}H${f2(X(24))}" stroke="${INK}" stroke-width=".35"/>`;
  for (let h = 0; h <= 24; h++) {
    g += `<path d="M${f2(X(h))} ${f2(yAx - 3.4)}V${f2(yAx)}M${f2(X(h))} ${f2(yBot)}V${f2(yBot + 3.4)}" stroke="${INK}" stroke-width=".3"/>`;
    if (h < 24) g += t(X(h), yTopN, String(h), 3.9, { w: 500 }) + t(X(h), yBotN, String(h % 12 || 12), 3.9, { w: 500 });
  }
  // the red frames round 6, 13, 20 and 22, and the labels pointing at them
  for (const h of [6, 13, 20, 22]) g += `<rect x="${f2(X(h) - u * 0.52)}" y="${f2(yTopN - 5)}" width="${f2(u * 1.04)}" height="${f2(yBotN - yTopN + 6.8)}" fill="none" stroke="#EF4444" stroke-width=".5"/>`;
  const yRb = yBotN + 1.8;
  const calls = [[-0.03, 4.62, "সকাল ৬:০০টা", [4.62, yCall], [6 - 0.52, yRb]], [6.97, 11.6, "দুপুর ১:০০টা", [11.6, yCall], [13 - 0.52, yRb]],
    [14, 18.65, "রাত ৮:০০টা", [18.65, yCall], [20 - 0.52, yRb]], [19.26, 23.9, "রাত ১০:০০টা", [23.4, yCall], [22 + 0.52, yRb]]];
  for (const [a, z, s, from, to] of calls) {
    g += `<rect x="${f2(X(a))}" y="${f2(yCall)}" width="${f2((z - a) * u)}" height="${ch}" fill="#fff" stroke="${INK}" stroke-width=".3"/>${t(X((a + z) / 2), yCall + 4.9, s, 3.9, { bn: true })}`;
    const x1 = X(from[0]), y1 = from[1], x2 = X(to[0]), y2 = to[1];
    g += `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2 + (x1 - x2) * 0.12)} ${f2(y2 + (y1 - y2) * 0.12)}" stroke="${BLUE}" stroke-width=".3"/>${head(x2, y2, x2 - x1, y2 - y1, 1.1, BLUE)}`;
  }
  g += tag(W / 2, yLab2, 40, "১২ ঘণ্টার সময়সূচি");
  return `<svg class="c5p134-svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${g}</svg>`;
}

// ── a clock (Class 4's look: amber rim, navy hour hand, red minute hand), its own label inside ──
function clockSvg({ h, m, lab, ly = "t", lx = 0 }, ctx, size) {
  const P = (r, deg) => [50 + r * Math.sin(deg * Math.PI / 180), 50 - r * Math.cos(deg * Math.PI / 180)];
  const hand = (deg, len, wd, col) => { const [x2, y2] = P(len, deg); return `<line x1="50" y1="50" x2="${f2(x2)}" y2="${f2(y2)}" stroke="${col}" stroke-width="${wd}" stroke-linecap="round"/>`; };
  let g = `<circle cx="50" cy="50" r="48" fill="#FEF3C7" stroke="#D97706" stroke-width="3.5"/><circle cx="50" cy="50" r="45" fill="#fff"/>`;
  for (let i = 0; i < 60; i++) { const [x1, y1] = P(44, i * 6), [x2, y2] = P(i % 5 ? 42 : 39.5, i * 6); g += `<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="#334155" stroke-width="${i % 5 ? .6 : 1.4}"/>`; }
  for (let i = 1; i <= 12; i++) { const [x, y] = P(32.5, i * 30); g += `<text x="${f2(x)}" y="${f2(y + 3.6)}" text-anchor="middle" ${FB} font-weight="700" font-size="${i > 9 ? 9.5 : 10.5}" fill="${INK}">${i}</text>`; }
  if (lab) g += `<text x="${f2(50 + lx)}" y="${ly === "t" ? 37.5 : 71.5}" text-anchor="middle" ${FN} font-weight="600" font-size="10.5" fill="#7C2D12" stroke="#fff" stroke-width="2.2" paint-order="stroke">${ctx.esc(lab)}</text>`;
  g += hand((h % 12) * 30 + m * 0.5, 22, 4.4, "#1E3A8A") + hand(m * 6, 34, 2.8, "#DC2626") + `<circle cx="50" cy="50" r="3.2" fill="${INK}"/>`;
  return `<svg class="c5p134-clk" width="${size}mm" height="${size}mm" viewBox="0 0 100 100">${g}</svg>`;
}
function clocksHtml(b, ctx) {
  const cols = b.cols || 4, size = b.size || 22, rows = [];
  for (let i = 0; i < b.items.length; i += cols) rows.push(b.items.slice(i, i + cols));
  return `<table class="c5p134-clks">${rows.map((r) => `<tr class="k">${r.map((it) => `<td>${clockSvg(it, ctx, size)}</td>`).join("")}</tr><tr class="a">${r.map(() => `<td></td>`).join("")}</tr>`).join("")}</table>`;
}

// ── c5p134_ld: p144's divisions ──
const RARR = `<svg class="c5p134-rarr" viewBox="0 0 12 6" width="4.4mm" height="2.2mm"><path d="M0 3H10" stroke="${INK}" stroke-width=".9"/><path d="M7.4 .4L11.4 3L7.4 5.6" fill="none" stroke="${INK}" stroke-width=".9" stroke-linejoin="round"/></svg>`;
function ldHtml(b, ctx) {
  return `<div class="c5p134-lds">${b.items.map((it) => `<div class="c5p134-ld"><div class="c5p134-lg">
    <span></span><span class="n q">${ctx.esc(it.q || "")}</span>
    <span class="d">${ctx.esc(it.d)}<i>)</i></span><span class="n o">${ctx.esc(it.n)}</span>
    <span></span><span class="n${it.sub ? " u" : ""}">${ctx.esc(it.sub || "")}</span>
    <span class="lab">${RARR}${it.lab ? `<small>${ctx.esc(it.lab)}</small>` : ""}</span><span class="n">${ctx.esc(it.rem || "")}</span>
  </div></div>`).join("")}</div>`;
}

module.exports = {
  kinds: {
    c5p134_eqs: eqsHtml,
    c5p134_arc: (b, ctx) => `<p class="c5p134-al"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${arcLine(ctx, b.text)}</p>`,
    c5p134_hooks: hooksHtml,
    c5p134_cal: calHtml,
    c5p134_strip: (b, ctx) => `<div class="c5p134-fig">${stripSvg(b, ctx)}</div>`,
    c5p134_ymd: ymdHtml,
    c5p134_form: formHtml,
    c5p134_tab: tabHtml,
    c5p134_tline: (b) => `<div class="c5p134-fig c5p134-tlf">${tlineSvg(b)}</div>`,
    c5p134_clocks: clocksHtml,
    c5p134_ld: ldHtml,
    c5p134_bul: (b, ctx) => `<div class="c5p134-bul t-${b.tone || "blue"}"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${b.title ? `<span class="c5p134-bt">${ctx.esc(b.title)}</span>` : ""}<ul>${b.items.map((x) => `<li>${xmd(ctx, x)}</li>`).join("")}</ul></div>`,
    c5p134_qbox: (b, ctx) => `<div class="c5p134-qb" style="grid-template-columns:${b.lw ? `${b.lw}mm auto` : b.fill ? "1fr auto" : "auto auto"};${b.size ? `font-size:${b.size}pt;` : ""}${b.gap != null ? `row-gap:${b.gap}mm;` : ""}--bw:${b.bw || 22}mm">${b.rows.map(([q, x]) => x == null ? `<span class="c5p134-qq c5p134-qs">${xmd(ctx, q)}</span>` : `<span class="c5p134-qq">${xmd(ctx, q)}</span><span class="c5p134-qx">${xmd(ctx, x)}</span>`).join("")}</div>`,
    c5p134_qn: (b, ctx) => `<div class="ext"><span class="mk">${ctx.esc(b.n)}</span><span>${xmd(ctx, b.text)}</span></div>`,
    c5p134_band: (b, ctx) => `<div class="c5p134-band t-${b.tone || "yellow"}"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${xmd(ctx, b.text)}</div>`,
  },
  css: `
.c5p134-fig { display: flex; justify-content: center } svg.c5p134-svg { display: block; overflow: visible }
.c5p134-wb { display: inline-block; width: var(--bw, 22mm); height: 7.2mm; vertical-align: -2.2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
/* lines of working on a grid, with curved arrows */
.c5p134-eqs { position: relative; font-family: 'Noto Sans Bengali'; font-weight: 500 }
.c5p134-ec { position: absolute; display: flex; align-items: center; white-space: nowrap } .c5p134-ec.l { justify-content: flex-start } .c5p134-ec.c { justify-content: center } .c5p134-ec.r { justify-content: flex-end }
.c5p134-eqa { position: absolute; left: 0; top: 0; overflow: visible }
/* a line with a blue arc over a stretch of it */
.c5p134-al { font: 500 12.5pt/1.45 'Noto Sans Bengali'; padding-top: 4.2mm }
.c5p134-aw { position: relative; white-space: nowrap }
.c5p134-arc { position: absolute; left: 2.2mm; width: calc(100% - 4.6mm); bottom: calc(100% - .3mm); height: 4.4mm; overflow: visible }
.c5p134-arc path { fill: none; stroke: ${BLUE}; stroke-width: .5mm; vector-effect: non-scaling-stroke }
.c5p134-ah { position: absolute; right: 2.4mm; bottom: calc(100% - .3mm - 1.1mm); width: 2.8mm; height: 2.2mm; fill: ${BLUE}; transform-origin: 100% 50%; transform: rotate(17deg) }
/* p135's hook arrows */
.c5p134-hooks { position: relative; font-family: 'Noto Sans Bengali'; font-weight: 500 }
.c5p134-hr { display: flex; align-items: center } .c5p134-ht { white-space: nowrap; padding-right: 1.2mm }
.c5p134-hz { position: relative; flex: 1; align-self: stretch }
.c5p134-hb { position: absolute; border-top: .35mm solid ${BLUE}; border-bottom: .35mm solid ${BLUE}; background: #fff }
.c5p134-hh { position: absolute; overflow: visible }
.c5p134-hov { position: absolute; left: 0; top: 0; overflow: visible; pointer-events: none }
/* a calendar month */
.c5p134-cal { display: flex; flex-direction: column; align-items: center }
.c5p134-cap { font: 700 12pt 'Baloo Da 2'; color: ${INK}; margin-bottom: 1mm }
.c5p134-cal table { border-collapse: collapse; background: #fff; box-shadow: 0 1mm 0 var(--s) }
.c5p134-cal td, .c5p134-cal th { border: .3mm solid #475569 }
.c5p134-cal tr.c5p134-ct td { height: auto; padding: .7mm 1.4mm .4mm; text-align: left; background: var(--s) }
.c5p134-ct div { display: flex; justify-content: space-between; align-items: baseline } .c5p134-ct b { font: 700 calc(var(--fs) * 1.08)/1.2 'Baloo Da 2'; color: var(--d) } .c5p134-ct span { font: 600 calc(var(--fs) * .86)/1.2 'Noto Sans Bengali'; color: var(--d) }
.c5p134-cw th { width: var(--cw); font: 700 calc(var(--fs) * .82) 'Baloo Da 2'; color: ${INK}; background: #E2E8F0; padding: .7mm 0 .3mm }
.c5p134-cal td.d, .c5p134-cal td.e { width: var(--cw); height: var(--ch); position: relative; padding: 0; vertical-align: top }
.c5p134-cal td.d b { position: absolute; left: 0; right: 0; top: 4%; text-align: center; font: 600 var(--fs)/1 'Baloo Da 2' }
.c5p134-cal td.d i { position: absolute; left: 6%; bottom: 6%; font: 600 calc(var(--fs) * .66)/1 'Baloo Da 2'; font-style: normal; color: #334155 }
.c5p134-cal td.c-r { background: #EF4444 } .c5p134-cal td.c-y { background: #FDE047 } .c5p134-cal td.c-g { background: #22C55E }
.c5p134-cal td.c-r b, .c5p134-cal td.c-g b, .c5p134-cal td.c-r i, .c5p134-cal td.c-g i { color: #fff }
.c5p134-cal th.w { background: #FB7185; color: #fff } .c5p134-cal td.w { background: #FECDD3 }
/* বছর মাস দিন in columns */
.c5p134-ymd { align-self: center; border-collapse: collapse; font-family: 'Baloo Da 2'; font-weight: 600; color: ${INK} }
.c5p134-ymd th { width: var(--yw); background: #CBD5E1; font: 600 .92em 'Noto Sans Bengali'; padding: 1mm 0 .6mm }
.c5p134-ymd td { text-align: center; height: 7.6mm; padding: 0 }
.c5p134-ymd tr.l td { border-bottom: .45mm solid ${INK} } .c5p134-ymd tr.a td { height: 9.4mm; color: #C2410C }
.c5p134-ymd .sh { background: #E2E8F0 } .c5p134-ymd th.sh { background: #94A3B8 }
.c5p134-yb { display: inline-block; width: var(--ybw); height: 7.4mm; vertical-align: middle; border: .5mm solid #F59E0B; background: #FFFBEB; border-radius: 1.6mm }
.c5p134-st { position: relative; display: inline-block } .c5p134-st::after { content: ""; position: absolute; left: -12%; right: -12%; top: 52%; border-top: .45mm solid ${RED}; transform: rotate(-40deg) } .c5p134-st.b::after { transform: rotate(40deg) }
.c5p134-sp { font-size: .58em; color: #DB2777; vertical-align: .7em; margin-left: .2mm; line-height: 0 }
/* p140's rows of boxes */
.c5p134-form { border-collapse: collapse; font: 500 12.5pt 'Noto Sans Bengali'; align-self: flex-start }
.c5p134-form td { height: var(--rh); padding: .5mm 0; text-align: center; white-space: nowrap }
.c5p134-form td.c5p134-flb { text-align: right; padding-right: 1.6mm } .c5p134-form td.c5p134-fu.l { text-align: left; padding-left: 1.6mm }
.c5p134-form tr.c5p134-fl td { border-top: .45mm solid ${INK}; padding-top: 1.2mm }
.c5p134-fb { display: inline-flex; align-items: center; justify-content: center; width: var(--bw); height: 7.2mm; border: .5mm solid #F59E0B; background: #FFFBEB; border-radius: 1.6mm; font: 600 12.5pt 'Baloo Da 2'; vertical-align: middle }
.c5p134-ftop td { height: 13mm; vertical-align: bottom; position: relative } .c5p134-rc { position: relative }
.c5p134-cir { display: inline-flex; align-items: center; justify-content: center; width: 7mm; height: 7mm; border: .35mm solid ${INK}; border-radius: 50%; font: 600 11.5pt 'Baloo Da 2'; margin-bottom: 1.4mm; background: #fff }
.c5p134-fbt { position: absolute; left: 50%; top: -1mm; transform: translateX(-50%); height: 6.6mm }
.c5p134-plus { position: absolute; left: 0; right: 0; top: 7.4mm; font: 700 14pt/1 'Baloo Da 2'; color: ${INK} }
.c5p134-ring { position: absolute; left: 50%; top: 0; width: calc(var(--bw) + 1mm); height: calc(var(--bw) + 1mm); transform: translateX(-50%); border: .4mm solid #2563EB; border-radius: 50% }
/* tables */
.c5p134-tab { align-self: center; border-collapse: separate; border-spacing: 0; border: .5mm solid var(--c); border-radius: 2.6mm; overflow: hidden; background: #fff; font: 500 11.5pt/1.25 'Noto Sans Bengali'; box-shadow: 0 1mm 0 var(--s) }
.c5p134-tab th { background: var(--c); color: #fff; font: 600 1em/1.25 'Noto Sans Bengali'; padding: 1.2mm 1mm .9mm; border-left: .3mm solid rgba(255,255,255,.45) } .c5p134-tab th:first-child { border-left: 0 }
.c5p134-tab td { height: var(--rh, 7mm); text-align: center; vertical-align: middle; padding: .3mm 1.2mm; border-top: .3mm solid #C7D2FE; border-left: .3mm solid #C7D2FE } .c5p134-tab td:first-child { border-left: 0 }
.c5p134-tab td.l { text-align: left; padding-left: 2.4mm } .c5p134-tab td.r { text-align: right } .c5p134-tab td.n { font-family: 'Baloo Da 2'; font-weight: 600 }
.c5p134-tab tr.c5p134-tti th { background: #FEF3C7; color: ${INK}; font-weight: 700 }
.c5p134-tab td.bl { border-left: .3mm solid #C7D2FE }
.c5p134-tab.c5p134-plain { border: 0; border-radius: 0; box-shadow: none; background: none; overflow: visible }
.c5p134-tab.c5p134-plain td, .c5p134-tab.c5p134-plain th { border: 0; background: none; color: ${INK}; padding: .3mm .8mm; white-space: nowrap }
.c5p134-tab.c5p134-plain th { font-weight: 600 }
.c5p134-darr { display: block; margin: 0 auto }
.c5p134-tab.c5p134-tt th { background: #FCD34D; color: ${INK} } .c5p134-tab.c5p134-tt { border-color: #B45309 } .c5p134-tab.c5p134-tt td { border-color: #FDE68A }
/* p141's line */
.c5p134-tlf { border: .5mm solid #64748B; border-radius: 3mm; background: #fff; padding: 2mm 2mm 1.6mm }
/* p146's clocks */
.c5p134-clks { border-collapse: collapse; background: #fff } .c5p134-clks td { border: .35mm solid ${INK}; padding: 1mm 1.6mm; text-align: center }
.c5p134-clks tr.a td { height: 8mm } svg.c5p134-clk { display: block; margin: 0 auto }
/* p144's divisions */
.c5p134-lds { display: flex; justify-content: space-between; gap: 5mm }
.c5p134-ld { flex: 1; border: .4mm dotted #475569; border-radius: 2.4mm; background: #fff; padding: 1.6mm 3mm 1.6mm }
.c5p134-lg { display: grid; grid-template-columns: auto 15mm; justify-content: center; row-gap: .4mm; font: 600 13pt/1.25 'Baloo Da 2' }
.c5p134-lg span { min-height: 6.4mm; display: flex; align-items: center; justify-content: flex-end }
.c5p134-lg .d i { font-style: normal; font-weight: 500; font-size: 1.15em; margin: 0 .3mm 0 .8mm }
.c5p134-lg .n { padding-right: 1mm } .c5p134-lg .n.o { border-top: .4mm solid ${INK}; margin-left: -1mm } .c5p134-lg .n.u { border-bottom: .4mm solid ${INK} }
.c5p134-lg .lab { justify-content: flex-start; gap: 1mm } .c5p134-lg .lab small { font: 600 8.5pt 'Noto Sans Bengali' }
/* boxes of bullet points */
.c5p134-bul { position: relative; font: 500 12.5pt/1.45 'Noto Sans Bengali'; border-radius: 3mm; padding: 2mm 4mm 2mm 3mm }
.c5p134-bul ul { list-style: none; display: flex; flex-direction: column; gap: .8mm }
.c5p134-bul li { position: relative; padding-left: 5.4mm } .c5p134-bul li::before { content: ""; position: absolute; left: .6mm; top: .52em; width: 2.4mm; height: 2.4mm; border-radius: 50%; background: ${INK} }
.c5p134-bul.t-blue { background: #DBEAFE; border: .45mm solid #93C5FD }
.c5p134-bul.t-tan { background: #FDE9C4; border: .45mm solid #B45309; padding-top: 6.4mm; margin-top: 4mm }
.c5p134-bul.t-none { padding: 0 }
.c5p134-bt { position: absolute; left: 50%; top: 0; transform: translate(-50%, -50%); font: 700 12pt/1 'Noto Sans Bengali'; background: #D6A75E; border: .45mm solid #7C4A0E; border-radius: 2mm; padding: 1.6mm 9mm 1.2mm; white-space: nowrap }
/* questions with their boxes */
.c5p134-qb { display: grid; column-gap: 2mm; row-gap: 1.6mm; align-items: center; font: 500 12pt/1.4 'Noto Sans Bengali' }
.c5p134-qx { white-space: nowrap } .c5p134-qs { grid-column: 1 / -1 }
.c5p134-band.t-pill { align-self: flex-start; background: #FEF3C7; border: .45mm solid #EF4444; border-radius: 3mm; padding: 1.2mm 5mm .9mm }
/* the book's tinted bands */
.c5p134-band { font: 600 12.5pt/1.45 'Noto Sans Bengali'; text-align: center; border-radius: 3mm; padding: 1.6mm 4mm 1.2mm }
.c5p134-band.t-yellow { background: #FEF3C7; border: .45mm solid #FCD34D } .c5p134-band.t-green { background: #D9F99D; border: .45mm solid #A3E635 }
.c5p134-band.t-pink { background: #FCE7E3; border: .45mm solid #F9A8A0 } .c5p134-band.t-teal { background: #CCFBF1; border: .45mm solid #F87171 }
.c5p134-band.t-yred { background: #FEF3C7; border: .45mm solid #F87171 } .c5p134-band.t-head { font: 700 15pt 'Baloo Da 2'; background: #FEF3C7; border: .45mm solid #FCD34D }
`,
};
