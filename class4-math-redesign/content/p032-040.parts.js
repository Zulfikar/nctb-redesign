// Printed pages 32–40's own kinds (prefixed c4p032_), অধ্যায় ২ · যোগ ও বিয়োগ: বিয়োগ, যোগ ও বিয়োগের সম্পর্ক, the review
// and নিজে করি. Everything whose count or place matters is drawn here by code. Units: mm. The column sums themselves are
// Class 3's c3p021_col (lib/c3-p021-036.parts.js); these kinds hold them, or draw what Class 3 had no kind for.
//   c4p032_card   a tinted card of words (the book's blue "[এককের স্থান] …" box, p32): { title, text, tone, line }
//   c4p032_steps  p33's five worked steps of ১০০০০০ − ১৮৭: each a white frame holding a column sum (c3p021_col, its column
//                 lit) and its caption bubble beside it: { size, panel, rows: [{ col, cap, tone }] }
//   c4p032_rel    p35's three relation sums of the boxes বিয়োজন / বিয়োজ্য / বিয়োগফল, the four arrows between them and the green
//                 captions under them: { groups: [{ rows: [a, b, c], op, cap: [line, line] }], arrows: [[from, to]] }
//   c4p032_elbow  p36: the line that carries the sum's answer up to the next sum's first row, and the book's blue arrow:
//                 { w, h, yT, yA }
//   c4p032_lines  lines with a label on the left and words with answer boxes (▭ wide, ◻ one sign): { rows: [[label, text]],
//                 lw, bw, size, gap }
//   c4p032_story  p36's tables: a number sentence beside its story, then a row of boxes and an empty cell to write a story in:
//                 { rows: [[sentence, story]], lw }
//   c4p032_vbox   p38's empty sums in columns: wide answer boxes, a small box for the sign, the rule, the answer box:
//                 { rows, sign, ans, label, after, bw }
//   c4p032_wheel  p40's pattern wheels: eight numbers on spokes, "" the empty one: { labels: [8, clockwise from the top], tone }
//   c4p032_c      a wrapper that holds blocks under a class, for small tweaks of the library kinds: { cls, body: [blocks] }
const INK = "#1E2433", RED = "#DC2626";
const f = (n) => +(+n).toFixed(2);
const mdx = (ctx, s, bw) => ctx.md(s).replace(/▭/g, `<i class="c4p032-wb"${bw ? ` style="width:${bw}mm"` : ""}></i>`).replace(/◻/g, `<i class="c4p032-wb one"></i>`);
const T = (x, y, s, size, col = INK, { w = 700, anchor = "middle", font = "Noto Sans Bengali" } = {}) =>
  `<text x="${f(x)}" y="${f(y)}" font-family="${font}" font-weight="${w}" font-size="${f(size)}" text-anchor="${anchor}" fill="${col}">${s}</text>`;
const head = (x, y, a, s, col = INK) => `<path d="M0 0L${f(-s)} ${f(-s * 0.5)}L${f(-s * 0.72)} 0L${f(-s)} ${f(s * 0.5)}Z" transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})" fill="${col}"/>`;
const arrowLine = (x1, y1, x2, y2, col = INK) => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="${col}" stroke-width=".32"/>` + head(x2, y2, Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, 2.2, col);

// ── p35: the relation sums ──
const TERM = { "বিয়োজন": ["#FEF08A", "#CA8A04"], "বিয়োজ্য": ["#BAE6FD", "#0284C7"], "বিয়োগফল": ["#FBCFE8", "#DB2777"] };
function relSvg(b, ctx) {
  const W = 166, H = 52, bw = 30, bh = 8.2, Y = [1, 12.4, 25.2], RULE = 23.4, cw = 52, gap = (W - 3 * cw) / 2;
  const cx = (g) => g * (cw + gap) + cw / 2;
  let s = "";
  // where each arrow starts and ends: [group, row, side]
  const at = ([g, r, side]) => [cx(g) + (side === "l" ? -bw / 2 - (r === 1 ? 6 : 1.2) : bw / 2 + 1.4), Y[r] + bh / 2];
  b.groups.forEach((gr, g) => {
    const x0 = cx(g) - bw / 2;
    gr.rows.forEach((t, r) => {
      const [fill, stroke] = TERM[t] || ["#fff", INK];
      s += `<rect x="${f(x0)}" y="${f(Y[r])}" width="${bw}" height="${bh}" rx="1.4" fill="${fill}" stroke="${stroke}" stroke-width=".4"/>` + T(cx(g), Y[r] + bh / 2 + 1.5, ctx.esc(t), 4.2);
    });
    s += T(x0 - 3.4, Y[1] + bh / 2 + 1.8, gr.op, 5.4, RED, { w: 800, font: "Baloo Da 2" });
    s += `<path d="M${f(x0 - 7)} ${RULE}H${f(x0 + bw + 4)}" stroke="${INK}" stroke-width=".6"/>`;
    const cy = 36.6, ch = 15;
    s += `<rect x="${f(cx(g) - cw / 2)}" y="${cy}" width="${cw}" height="${ch}" rx="2.4" fill="#DCFCE7" stroke="#16A34A" stroke-width=".45"/>`;
    gr.cap.forEach((line, i) => { s += T(cx(g), cy + 6 + i * 6, ctx.esc(line), 3.9, "#14532D", { w: 600 }); });
  });
  for (const [a, z] of b.arrows) { const [x1, y1] = at(a), [x2, y2] = at(z); s += arrowLine(x1, y1, x2, y2); }
  return `<svg class="c4p032-svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">${s}</svg>`;
}

// ── p36: the elbow line and the blue arrow between two sums ──
function elbowSvg({ w = 34, h = 22, yT = 3.5, yA = 18 }) {
  const xv = w * 0.22, ym = (yT + yA) / 2 + 1.2;
  const blue = `<path d="M${f(w * 0.36)} ${f(ym - 1.2)}H${f(w * 0.62)}V${f(ym - 3.2)}L${f(w * 0.8)} ${f(ym)}L${f(w * 0.62)} ${f(ym + 3.2)}V${f(ym + 1.2)}H${f(w * 0.36)}Z" fill="#38BDF8" stroke="#0284C7" stroke-width=".3" stroke-linejoin="round"/>`;
  return `<svg class="c4p032-svg" width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}"><path d="M0 ${f(yA)}H${f(xv)}V${f(yT)}H${f(w - 1.2)}" fill="none" stroke="${INK}" stroke-width=".35"/>${head(w - 0.2, yT, 0, 2.2)}${blue}</svg>`;
}

// ── p40: the pattern wheels ──
const WHEEL = { orange: ["#F97316", "#C2410C"], green: ["#65A30D", "#3F6212"] };
function wheelSvg({ labels, tone = "orange", size = 62 }) {
  const [fill, dark] = WHEEL[tone] || WHEEL.orange, S = 66, c = S / 2, R = 24.6, r = 7.2;
  let s = "";
  labels.forEach((_, i) => { const a = i * Math.PI / 4, ux = Math.sin(a), uy = -Math.cos(a); s += `<path d="M${f(c)} ${f(c)}L${f(c + ux * (R - r))} ${f(c + uy * (R - r))}" stroke="${dark}" stroke-width=".4"/>`; });
  labels.forEach((t, i) => {
    const a = i * Math.PI / 4, x = c + Math.sin(a) * R, y = c - Math.cos(a) * R;
    s += t ? `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${fill}"/>` + T(x, y + 1.95, t, 5.6, "#fff", { w: 800, font: "Baloo Da 2" })
      : `<circle cx="${f(x)}" cy="${f(y)}" r="${r - 0.3}" fill="#fff" stroke="${fill}" stroke-width=".7" stroke-dasharray="1.6 1"/>`;
  });
  return `<svg class="c4p032-svg" width="${size}mm" height="${size}mm" viewBox="0 0 ${S} ${S}">${s}</svg>`;
}

// ── p38: an empty sum in columns, all boxes ──
function vboxHtml(b, ctx) {
  const n = b.rows || 2, sign = b.sign ?? n - 1;
  let h = "";
  for (let i = 0; i < n; i++) h += `<span class="sg">${i === sign ? `<i class="c4p032-wb one"></i>` : ""}</span><i class="c4p032-wb"></i><span></span>`;
  h += `<i class="rule"></i>`;
  if (b.ans !== false) h += `<span class="sg">${b.label ? `<em class="lb">${ctx.md(b.label)}</em>` : ""}</span><i class="c4p032-wb"></i><span class="af">${b.after ? ctx.md(b.after) : ""}</span>`;
  return `<div class="c4p032-vb" style="--bw:${b.bw || 30}mm">${h}</div>`;
}

module.exports = {
  kinds: {
    c4p032_card: (b, ctx) => `<div class="c4p032-card" style="--t:${b.tone || "#CFEFF7"};--k:${b.line || "#38BDF8"}">${b.title ? `<b>${ctx.md(b.title)}</b>` : ""}<p>${ctx.md(b.text)}</p></div>`,
    c4p032_steps: (b, ctx, page) => `<div class="c4p032-steps" style="background:${b.panel || "#FCE7F3"}">${b.rows.map((r) =>
      `<div class="c4p032-fr">${ctx.blockHtml({ kind: "c3p021_col", style: "plain", size: b.size || 13, ...r.col }, page)}</div><div class="c4p032-cap" style="--t:${r.tone || "#FEF3C7"}">${ctx.md(r.cap)}</div>`).join("")}</div>`,
    c4p032_rel: (b, ctx) => `<div class="c4p032-center">${relSvg(b, ctx)}</div>`,
    c4p032_elbow: (b) => `<div class="c4p032-elbow">${elbowSvg(b)}</div>`,
    c4p032_lines: (b, ctx) => `<div class="c4p032-lines" style="grid-template-columns:${b.lw ? `${b.lw}mm` : "auto"} 1fr;${b.size ? `font-size:${b.size}pt;` : ""}${b.gap != null ? `row-gap:${b.gap}mm;` : ""}">${b.rows.map(([l, t]) =>
      `<span class="lb">${l ? ctx.md(l) : ""}</span><span class="tx">${mdx(ctx, t, b.bw)}</span>`).join("")}</div>`,
    c4p032_story: (b, ctx) => `<table class="c4p032-story">${b.rows.map((r, i) => `<tr class="${i % 2 ? "w" : "e"}"><td class="l" style="width:${b.lw || 45}%">${mdx(ctx, r[0], 13)}</td><td class="r">${r[1] ? ctx.md(r[1]) : ""}</td></tr>`).join("")}</table>`,
    c4p032_vbox: (b, ctx) => vboxHtml(b, ctx),
    c4p032_wheel: (b) => `<div class="c4p032-center">${wheelSvg(b)}</div>`,
    c4p032_c: (b, ctx, page) => `<div class="c4p032-c ${b.cls || ""}"${b.style ? ` style="${b.style}"` : ""}>${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
  },
  css: `
svg.c4p032-svg { display: block; overflow: visible } .c4p032-center { display: flex; justify-content: center }
/* answer boxes in a line: ▭ a wide one, ◻ one for a sign */
.c4p032-wb { display: inline-block; width: 28mm; height: 7.4mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; vertical-align: -2.2mm; margin: 0 .8mm }
.c4p032-wb.one { width: 6.6mm; margin: 0 .5mm }
/* p32: the tinted card */
.c4p032-card { background: var(--t); border: .5mm solid var(--k); border-radius: 3.4mm; padding: 2mm 4mm 2mm; font: 500 12pt/1.5 'Noto Sans Bengali'; box-shadow: 0 .8mm 0 color-mix(in srgb, var(--k) 35%, transparent) }
.c4p032-card b { display: block; font: 700 12pt/1.45 'Noto Sans Bengali'; color: #075985; margin-bottom: .6mm }
/* p33: the worked steps */
.c4p032-steps { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 2.6mm 7mm; align-items: center; padding: 3mm 5mm; border-radius: 4mm }
.c4p032-fr { background: #fff; border-radius: 3mm; padding: 1mm 2.6mm 1.6mm; box-shadow: 0 .6mm 0 rgba(30,36,51,.1) }
.c4p032-cap { position: relative; justify-self: start; background: var(--t); border: .45mm solid rgba(30,36,51,.45); border-radius: 4.4mm; padding: 1.8mm 5mm 1.4mm; font: 600 12.5pt/1.5 'Noto Sans Bengali' }
.c4p032-cap::before { content: ""; position: absolute; left: -2.3mm; top: 50%; width: 3.6mm; height: 3.6mm; background: inherit; border: .45mm solid rgba(30,36,51,.45); border-top: 0; border-right: 0; transform: translateY(-50%) rotate(45deg) }
/* p36 */
.c4p032-elbow { display: flex; justify-content: center }
.c4p032-lines { display: grid; column-gap: 3mm; row-gap: 2.4mm; align-items: center; font: 700 13pt/1.6 'Baloo Da 2' }
.c4p032-lines .lb { white-space: nowrap } .c4p032-lines .tx { white-space: nowrap }
.c4p032-story { width: 100%; border-collapse: collapse; background: #fff; border: .5mm solid var(--c); border-radius: 3mm }
.c4p032-story td { border: .35mm solid color-mix(in srgb, var(--c) 45%, #fff); padding: 1.4mm 2.6mm; vertical-align: middle }
.c4p032-story td.l { font: 700 12.5pt/1.6 'Baloo Da 2'; text-align: center; white-space: nowrap } .c4p032-story td.r { font: 500 11pt/1.45 'Noto Sans Bengali' }
.c4p032-story tr.w td { height: 9.4mm; background: #FFFDF5 }
.c4p032-story .ansbox { min-width: 13mm; padding: .1mm 1.6mm; font-size: 12pt; color: ${INK}; border-color: #94A3B8; background: #F8FAFC }
.c4p032-story .abox { width: 13mm; height: 7mm; margin: 0 .6mm }
/* p38: the empty sums in columns */
.c4p032-vb { display: grid; grid-template-columns: 7.6mm var(--bw) 0; align-items: center; row-gap: 1.2mm }
.c4p032-vb .c4p032-wb { width: var(--bw); height: 6.8mm; margin: 0; vertical-align: 0 } .c4p032-vb .c4p032-wb.one { width: 6.6mm; height: 6.8mm }
.c4p032-vb .sg { position: relative; display: flex; justify-content: flex-start; height: 6.8mm }
.c4p032-vb .rule { grid-column: 1 / -1; display: block; height: 0; border-top: .6mm solid ${INK}; margin: .2mm -1.5mm .2mm 0 }
.c4p032-vb .lb { position: absolute; right: 100%; top: 50%; transform: translateY(-50%); margin-right: 1mm; font: 500 12pt 'Noto Sans Bengali'; white-space: nowrap; font-style: normal }
.c4p032-vb .af { position: relative; font: 500 12pt 'Noto Sans Bengali'; white-space: nowrap } .c4p032-vb .af:not(:empty) { padding-left: 2mm }
/* small tweaks of the library kinds */
.c4p032-c.hs { flex: 1; display: flex; flex-direction: column; gap: .6mm } .c4p032-c.hs .c3p021-hsub { justify-content: center }
.c4p032-c.sm1 .sb { font-size: 12pt; padding: 1.8mm 4.6mm 1.5mm; max-width: 142mm } .c4p032-c.sm1 .fc { width: 15mm; height: 15mm }
.c4p032-c.nw .c3p021-eq { white-space: nowrap }
.c4p032-c.vb .c4p032-wb { height: 6.6mm } .c4p032-c.vb .c3p021-wb.wide { height: 6.6mm; vertical-align: -1.8mm } .c4p032-c.vb .c4p032-lines, .c4p032-c.vb .c3p021-sums, .c4p032-c.vb .c3p021-eq { line-height: 1.4 } .c4p032-c.vb .tx { line-height: 1.4; margin-top: .8mm }
.c4p032-c.tr .c3p021-cs td { height: 1.24em; line-height: 1.24 } .c4p032-c.tr .c3p021-cols { row-gap: 1.6mm }
.c4p032-c.nla .c3p021-cs td.lab span { display: none }
.c4p032-c.tc .c3p021-cs td { width: 1.1em; padding: 0 .02em } .c4p032-c.tc .c3p021-cs td.op { width: .9em } .c4p032-c.tc .c3p021-cols { gap: 2.4mm 2mm }
.c4p032-c.tc .c3p021-mk { font-size: 11.5pt }
.c4p032-c.wb .abox { width: 30mm }
.c4p032-c.mq .c3p021-mq { font-size: 11.5pt; line-height: 1.35 } .c4p032-c.mq .c3p021-opts { font-size: 11.5pt; line-height: 1.25; padding-left: 9mm; row-gap: .6mm }
.c4p032-c.mq .c3p021-mcq { gap: .8mm } .c4p032-c.mq .c3p021-mi { gap: .5mm } .c4p032-c.mq .c3p021-opts i { width: 4.2mm; height: 4.2mm }
`,
};
