// Own kinds for printed pages 51–62 (chapter ৫ গুণ, the rest: multiplying in columns with carrying, by tens, by two-digit
// numbers). Every digit, carry, column line and count is drawn here by code. Units: mm.
//   c3p051_mul    one multiplication in columns, the book's way: { rows, w?, dash?, arrows?, look?, size? }
//                 rows: "২৩" · "×৩" (a sign, then one cell per digit) · "-" a rule · "^_৩৩_" a row of small carried digits
//                 (the book's হাতের digits over a partial product); in a row "_" is an empty cell and "{২}" a small carried
//                 digit at the top-left of its cell (the book's "ছোটো ২" in the answer row). Rows after the first rule are the
//                 answer (orange); carries are red. dash: how many columns from the right get the red dashed lines (default:
//                 the first row's digits). arrows: [[fromRow, fromCol, toRow, toCol]…] (rows index `rows`, cols from the right,
//                 0 = ones): the blue arrow from the multiplier's digit to the digit it multiplies. look: plate (the book's
//                 home-plate box) | card (a plain card) | none.
//   c3p051_steps  the book's big rounded box of steps: a column multiplication with its words in a tinted box beside it
//                 { steps: [{ rows, arrows, text | lines, title?, tone }], size, mw (the sum's width), w, dash }
//   c3p051_pp     the purple box of partial products: { rows: [["", "২৩"], ["×", "৩"], "-", ["", "৯", "৩ × ৩"], …], w }
//   c3p051_mex    column exercises with room to work: { items: ["১২×৪", …], marks?, start, cols, size }
//   c3p051_split  the book's split: a sum on the left, lines fanning out to the parts, a rule, the total
//                 { left?, lines: [["২০০ × ৩ =", "৬০০"]…], total?: ["মোট", "৬৯৩"], rh, size } ("□" is a wide answer box)
//   c3p051_pv     p54's শতক | দশক | একক chart of ovals, with the braces: { heads, rows: [[2, 3, 1]…], right, under }
//   c3p051_ovals  p57's 13 ovals of ১০, ১০, ১ in two groups, with the braces: { groups: [10, 3], vals, labels }
//   c3p051_area   p57's area grid: { cols: ["২০", "১"], rows: [["১০", "২০০", "১০"]…] }
//   c3p051_tenx   the "১০ গুণ" ladder: { rows: [["২ × ৪ =", "□"]…], label, size }
//   c3p051_mcq    choose the answer, (ক) (খ) (গ) (ঘ) with a box to tick: { items: [{ q, opts }], start }
//   c3p051_eqs    sums under one another, the rule before the last (p57's ২০০ + ৬০ + ১০ + ৩): { nums, total, size }
const INK = "#1E2433", RED = "#DC2626", BLUE = "#2F80ED", ANS = "#C2410C";
const f = (n) => +(+n).toFixed(2);
const BNL = ["ক", "খ", "গ", "ঘ", "ঙ", "চ"];

// ── one multiplication in columns ──
const cellsOf = (s) => s.match(/\{[^}]*\}|./gu) || [];
function parseRow(r) {
  if (r === "-") return { rule: true };
  if (r.startsWith("^")) return { small: true, cells: cellsOf(r.slice(1)) };
  const m = r.match(/^([×+]?)(.*)$/u);
  return { op: m[1], cells: cellsOf(m[2].replace(/\s+/g, "")) };
}
const T = (x, y, s, size, col, w = 800) => `<text x="${f(x)}" y="${f(y)}" font-family="Baloo Da 2" font-weight="${w}" font-size="${f(size)}" text-anchor="middle" style="fill:${col}">${s}</text>`;

function mulSvg(b, ctx) {
  const s = b.size || 6, cw = s, ch = s * 1.2, sh = s * 0.62, look = b.look || "plate";
  const rows = b.rows.map(parseRow), nums = rows.filter((r) => !r.rule);
  const w = b.w || Math.max(...nums.map((r) => r.cells.length));
  const dash = b.dash ?? nums[0].cells.length;
  const opW = s * 0.95, padX = s * 0.5, padT = s * 0.3, padB = s * 0.28, ruleGap = s * 0.12;
  const W = padX * 2 + opW + w * cw;
  const xOf = (k) => W - padX - (k + 1) * cw; // the left edge of column k (0 = ones)
  let y = padT, firstRule = -1;
  const lift = b.lift ?? (b.arrows && b.arrows.length ? s * .5 : 0);
  const geo = rows.map((r, i) => {
    if (r.rule) { const g = { y: y + ruleGap / 2 }; y += ruleGap; if (firstRule < 0) firstRule = i; return g; }
    const h = r.small ? sh : ch, g = { y, h }; y += h + (i === 0 ? lift : 0); return g;
  });
  const Hb = y + padB, tip = look === "plate" ? s * 1.15 : 0, H = Hb + tip;
  let out = "";
  if (look === "plate") {
    const r0 = s * 0.45;
    out += `<path d="M${f(r0)} .3H${f(W - r0)}Q${f(W - .3)} .3 ${f(W - .3)} ${f(r0)}V${f(Hb)}L${f(W / 2)} ${f(H - .3)}L.3 ${f(Hb)}V${f(r0)}Q.3 .3 ${f(r0)} .3Z" style="fill:#fff;stroke:var(--c)" stroke-width=".5" stroke-linejoin="round"/>`;
  } else if (look === "card") {
    out += `<rect x=".25" y=".25" width="${f(W - .5)}" height="${f(H - .5)}" rx="${f(s * .45)}" fill="#fff" stroke="#E2E8F0" stroke-width=".45"/>`;
  }
  // the red dashed lines along each place
  const dashCol = b.light ? "#FCA5A5" : RED;
  for (let k = 0; k <= dash; k++) {
    const x = W - padX - k * cw;
    const yb = look === "plate" ? Hb + tip * (1 - Math.abs(x - W / 2) / (W / 2)) - .7 : H - s * .2;
    out += `<path d="M${f(x)} ${f(look === "none" ? 0 : .9)}V${f(yb)}" stroke="${dashCol}" stroke-width="${f(s * .055)}" stroke-dasharray="${f(s * .16)} ${f(s * .12)}"/>`;
  }
  rows.forEach((r, i) => {
    const g = geo[i];
    if (r.rule) { out += `<path d="M${f(padX * .55)} ${f(g.y)}H${f(W - padX * .55)}" stroke="${INK}" stroke-width="${f(s * .07)}"/>`; return; }
    const col = firstRule >= 0 && i > firstRule ? ANS : INK, L = r.cells.length;
    if (r.op) out += T(padX + opW / 2, g.y + g.h * .76, r.op, s * .82, RED);
    r.cells.forEach((c, j) => {
      if (c === "_") return;
      const x = xOf(L - 1 - j);
      const m = c.match(/^\{(.*)\}$/u);
      if (r.small) out += T(x + cw / 2, g.y + g.h * .84, ctx.esc(c), s * .6, RED, 800);
      else if (m) out += T(x + cw * .3, g.y + g.h * .52, ctx.esc(m[1]), s * .66, RED, 800);
      else out += T(x + cw / 2, g.y + g.h * .76, ctx.esc(c), s * .92, col);
    });
  });
  for (const [r1, c1, r2, c2] of b.arrows || []) { // the blue arrow from the multiplier's digit to the digit it multiplies
    const a = geo[r1], z = geo[r2];
    const x1 = xOf(c1) + cw / 2, y1 = a.y + a.h * .5, x2 = xOf(c2) + cw / 2, y2 = z.y + z.h * .5;
    const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d, k1 = ch * .3, k2 = ch * .36;
    const sx = x1 + ux * k1, sy = y1 + uy * k1, ex = x2 - ux * k2, ey = y2 - uy * k2, hl = s * .34, hw = s * .2;
    const bx = ex - ux * hl, by = ey - uy * hl;
    out += `<path d="M${f(sx)} ${f(sy)}L${f(bx)} ${f(by)}" stroke="${BLUE}" stroke-width="${f(s * .1)}" stroke-linecap="round"/>
      <path d="M${f(ex)} ${f(ey)}L${f(bx - uy * hw)} ${f(by + ux * hw)}L${f(bx + uy * hw)} ${f(by - ux * hw)}Z" fill="${BLUE}"/>`;
  }
  return `<svg class="c3p051-mul" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${out}</svg>`;
}

// ── the steps box ──
const keep = (h) => h.replace(/[০-৯]+(?: [×+−=] [০-৯]+)+/gu, (m) => `<span style="white-space:nowrap">${m}</span>`);
function stepsHtml(b, ctx) {
  const lift = b.lift ?? (b.steps.some((st) => st.arrows && st.arrows.length) ? (b.size || 6) * .5 : 0);
  const base = { size: b.size, w: b.w, dash: b.dash, look: b.look, lift };
  return `<div class="c3p051-steps${b.horiz ? " horiz" : ""}"${b.gap != null ? ` style="gap:${b.gap}mm"` : ""}>${b.steps.map((st) => `<div class="c3p051-step">
    <div class="c3p051-sm"${b.mw ? ` style="width:${b.mw}mm"` : ""}>${mulSvg({ ...base, ...st }, ctx)}</div>
    <div class="c3p051-tb t-${st.tone || "yellow"}${st.center ? " c" : ""}"${b.ts ? ` style="font-size:${b.ts}pt"` : ""}>${st.title ? `<p class="ti">${ctx.md(st.title)}</p>` : ""}${(st.lines || [st.text]).map((l) => `<p>${keep(ctx.md(l))}</p>`).join("")}</div></div>`).join("")}</div>`;
}

// ── the purple box of partial products ──
function ppHtml(b, ctx) {
  const rows = b.rows, w = b.w || Math.max(...rows.filter((r) => r !== "-").map((r) => [...r[1]].length));
  let h = "";
  rows.forEach((r, i) => {
    if (r === "-") return;
    const ln = rows[i + 1] === "-", d = [...r[1]], pad = Array(w - d.length).fill("");
    h += `<tr${ln ? ` class="ln"` : ""}><td class="op">${ctx.esc(r[0] || "")}</td>${pad.concat(d).map((x) => `<td class="d">${ctx.esc(x)}</td>`).join("")}<td class="lb">${r[2] ? `<span class="c3p051-lead"><i></i><span>${ctx.md(r[2])}</span></span>` : ""}</td></tr>`;
  });
  return `<div class="c3p051-pp"${b.size ? ` style="font-size:${b.size}pt"` : ""}><table>${h}</table></div>`;
}

// ── column exercises with room to work ──
function mexHtml(b, ctx) {
  const s = b.size || 5.2;
  const one = (x, i) => {
    const [a, m] = x.split("×").map((t) => t.trim());
    const work = b.work ? Array(b.work).fill("") : [...m].length === 1 ? [""] : ["", "", "-", ""];
    const svg = mulSvg({ rows: [a, "×" + m, "-", ...work], w: [...a].length + [...m].length, dash: [...a].length + [...m].length, look: "card", size: s, light: true }, ctx);
    const mk = b.marks ? b.marks[i] : `(${ctx.bn((b.start || 1) + i)})`;
    return `<div class="c3p051-mx"><b class="c3p051-mk">${ctx.esc(mk)}</b>${svg}</div>`;
  };
  return `<div class="c3p051-mex" style="grid-template-columns:repeat(${b.cols || 3}, 1fr);${b.gap ? `row-gap:${b.gap}mm;` : ""}${b.mk ? `font-size:${b.mk}pt;` : ""}">${b.items.map(one).join("")}</div>`;
}

// ── a split: the sum on the left, lines fanning out to its parts, the total under a rule ──
function splitHtml(b, ctx) {
  const rh = b.rh || 8, n = b.lines.length, val = (v) => v === "□" ? `<span class="c3p051-wb"></span>` : `<b>${ctx.md(v)}</b>`;
  let fan = "";
  if (b.left) {
    const H = n * rh, w = 13;
    const lines = b.lines.map((_, i) => `<path d="M1 ${f(H / 2)}L${w - .5} ${f(rh * (i + .5))}" stroke="${INK}" stroke-width=".35"/>`).join("");
    fan = `<div class="c3p051-spa" style="height:${f(H)}mm"><span class="lf">${ctx.md(b.left)}</span><svg width="${w}mm" height="${f(H)}mm" viewBox="0 0 ${w} ${f(H)}">${lines}</svg></div>`;
  }
  const cell = (cls, x) => `<span class="${cls}" style="height:${rh}mm">${x}</span>`;
  const g = b.lines.map(([e, v]) => cell("e", ctx.md(e)) + cell("v", val(v))).join("")
    + (b.total ? `<i class="rl"></i>` + cell("e", ctx.md(b.total[0])) + cell("v", val(b.total[1])) : "");
  return `<div class="c3p051-split"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${fan}<div class="c3p051-spg">${g}</div></div>`;
}

// ── braces ──
function braceH(x1, x2, y, d) { // opening downward, the point at the middle
  const m = (x1 + x2) / 2, q = Math.min(d, (x2 - x1) / 4);
  return `<path d="M${f(x1)} ${f(y)}Q${f(x1)} ${f(y + d / 2)} ${f(x1 + q)} ${f(y + d / 2)}H${f(m - q)}Q${f(m)} ${f(y + d / 2)} ${f(m)} ${f(y + d)}Q${f(m)} ${f(y + d / 2)} ${f(m + q)} ${f(y + d / 2)}H${f(x2 - q)}Q${f(x2)} ${f(y + d / 2)} ${f(x2)} ${f(y)}" fill="none" stroke="${INK}" stroke-width=".35"/>`;
}
function braceV(x, y1, y2, d) { // opening to the left, the point at the middle on the right
  const m = (y1 + y2) / 2, q = Math.min(d, (y2 - y1) / 4);
  return `<path d="M${f(x)} ${f(y1)}Q${f(x + d / 2)} ${f(y1)} ${f(x + d / 2)} ${f(y1 + q)}V${f(m - q)}Q${f(x + d / 2)} ${f(m)} ${f(x + d)} ${f(m)}Q${f(x + d / 2)} ${f(m)} ${f(x + d / 2)} ${f(m + q)}V${f(y2 - q)}Q${f(x + d / 2)} ${f(y2)} ${f(x)} ${f(y2)}" fill="none" stroke="${INK}" stroke-width=".35"/>`;
}

// ── p54: the শতক | দশক | একক chart of ovals ──
const PVCOL = [["#E0E7FF", "#4338CA"], ["#FEF9C3", "#A16207"], ["#FCE7F3", "#BE185D"]];
function pvSvg(b, ctx) {
  const vals = ["১০০", "১০", "১"], cwid = b.cw || [36, 40, 24], hh = 7, rh = b.rh || 10.5, n = b.rows.length;
  const tw = cwid.reduce((a, c) => a + c, 0), xs = cwid.map((_, i) => cwid.slice(0, i).reduce((a, c) => a + c, 0));
  const right = b.right ? 32 : 0, under = b.under ? 13 : 0, W = tw + right + 1, H = hh + n * rh + under + 1;
  let o = "";
  cwid.forEach((c, i) => {
    o += `<rect x="${f(xs[i] + .5)}" y=".5" width="${c}" height="${f(hh + n * rh)}" fill="${PVCOL[i][0]}"/>`;
    o += T(xs[i] + .5 + c / 2, .5 + hh * .74, ctx.esc(b.heads[i]), 4.4, PVCOL[i][1], 700);
  });
  b.rows.forEach((r, j) => r.forEach((k, i) => {
    if (!k) return;
    const label = Array(k).fill(vals[i]).join("  "), ow = Math.min(cwid[i] - 3, 5 + k * vals[i].length * 2.3 + (k - 1) * 2.2), cx = xs[i] + .5 + cwid[i] / 2, cy = .5 + hh + rh * (j + .5);
    o += `<rect x="${f(cx - ow / 2)}" y="${f(cy - rh * .33)}" width="${f(ow)}" height="${f(rh * .66)}" rx="${f(rh * .33)}" fill="${i === 2 ? "#FBCFE8" : "#FEF08A"}" stroke="#16A34A" stroke-width=".45"/>`;
    o += T(cx, cy + 1.5, ctx.esc(label), 4.3, INK, 700);
  }));
  let grid = `<rect x=".5" y=".5" width="${tw}" height="${f(hh + n * rh)}" fill="none" stroke="#475569" stroke-width=".4"/>`;
  for (let i = 1; i < 3; i++) grid += `<path d="M${f(xs[i] + .5)} .5V${f(.5 + hh + n * rh)}" stroke="#475569" stroke-width=".35"/>`;
  for (let j = 0; j < n; j++) grid += `<path d="M.5 ${f(.5 + hh + j * rh)}H${f(tw + .5)}" stroke="#475569" stroke-width=".3"/>`;
  o += grid;
  if (b.right) { o += braceV(tw + 2.5, .5 + hh + .5, .5 + hh + n * rh - .5, 3.6); o += `<text x="${f(tw + 8)}" y="${f(.5 + hh + n * rh / 2 + 1.6)}" font-family="Baloo Da 2" font-weight="700" font-size="4.6" style="fill:${INK}">${ctx.esc(b.right)}</text>`; }
  if (b.under) b.under.forEach((u, i) => { const y = .5 + hh + n * rh + 1.2; o += braceH(xs[i] + 2.5, xs[i] + cwid[i] - 1.5, y, 3.4); o += T(xs[i] + .5 + cwid[i] / 2, y + 8.6, ctx.esc(u), 4.6, INK, 700); });
  return `<svg class="c3p051-svg" width="${f(W)}mm" height="${f(H)}mm" viewBox="0 0 ${f(W)} ${f(H)}">${o}</svg>`;
}

// ── p57: thirteen ovals of ১০, ১০, ১ ──
function ovalsSvg(b, ctx) {
  const ow = b.ow || 9, oh = b.oh || 24, gap = b.gap || 2.4, gg = b.gg || 7, vals = b.vals || ["১০", "১০", "১"];
  let x = .6, o = "", spans = [];
  b.groups.forEach((n, gi) => {
    const x0 = x;
    for (let i = 0; i < n; i++) {
      o += `<rect x="${f(x - .5)}" y=".4" width="${f(ow + 1)}" height="${f(oh + 1)}" rx=".8" fill="#EDE9FE"/>`;
      o += `<rect x="${f(x)}" y=".9" width="${ow}" height="${oh}" rx="${f(ow / 2)}" fill="#FEF9C3" stroke="#16A34A" stroke-width=".45"/>`;
      vals.forEach((v, k) => { o += T(x + ow / 2, .9 + oh * (k + .5) / vals.length + 1.5, ctx.esc(v), 4.1, INK, 700); });
      x += ow + gap;
    }
    spans.push([x0, x - gap]);
    x += gg - gap + (gi < b.groups.length - 1 ? 0 : 0);
  });
  const W = x - gg + gap + .6, yb = oh + 2.4;
  spans.forEach(([a, z], i) => { o += braceH(a + .5, z - .5, yb, 4); o += T((a + z) / 2, yb + 10, ctx.esc(b.labels[i]), 4.6, INK, 700); });
  return `<svg class="c3p051-svg" width="${f(W)}mm" height="${f(yb + 12)}mm" viewBox="0 0 ${f(W)} ${f(yb + 12)}">${o}</svg>`;
}

// ── the "১০ গুণ" ladder ──
const DOWN = `<svg class="c3p051-dn" width="2.8mm" height="6.4mm" viewBox="0 0 6 14"><path d="M1.9 0H4.1V8.6H6L3 14L0 8.6H1.9Z" fill="${RED}"/></svg>`;
function tenxHtml(b, ctx) {
  const lab = ctx.esc(b.label || "১০ গুণ"), val = (v) => v === "□" ? `<span class="c3p051-wb sm"></span>` : `<b>${ctx.md(v)}</b>`;
  let g = "";
  b.rows.forEach(([e, v], i) => {
    if (i) g += `<span class="al">${lab} ${DOWN}</span><span></span><span class="ar">${DOWN}</span><span class="arl">${lab}</span>`;
    g += `<span></span><span class="e">${ctx.md(e)}</span><span class="v">${val(v)}</span><span></span>`;
  });
  return `<div class="c3p051-tenx${b.tone ? " " + b.tone : ""}"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${g}</div>`;
}

module.exports = {
  kinds: {
    c3p051_mul: (b, ctx) => `<div class="c3p051-one">${mulSvg(b, ctx)}</div>`,
    // finished multiplications side by side, each with its (১) mark: { items: [{ mk, rows, w, dash, look }], size }
    c3p051_set: (b, ctx) => `<div class="c3p051-set">${b.items.map((it) => `<div class="c3p051-mx"><b class="c3p051-mk">${ctx.esc(it.mk)}</b>${mulSvg({ size: b.size, ...it }, ctx)}</div>`).join("")}</div>`,
    c3p051_steps: stepsHtml,
    c3p051_pp: ppHtml,
    c3p051_mex: mexHtml,
    c3p051_split: splitHtml,
    c3p051_pv: (b, ctx) => `<div class="lcenter">${pvSvg(b, ctx)}</div>`,
    c3p051_ovals: (b, ctx) => `<div class="lcenter">${ovalsSvg(b, ctx)}</div>`,
    c3p051_area: (b, ctx) => `<table class="c3p051-area"><tr><td class="k"></td>${b.cols.map((c) => `<td class="h">${ctx.md(c)}</td>`).join("")}</tr>${b.rows.map(([k, ...r]) => `<tr><td class="k">${ctx.md(k)}</td>${r.map((c) => `<td>${ctx.md(c)}</td>`).join("")}</tr>`).join("")}</table>`,
    c3p051_tenx: tenxHtml,
    c3p051_mcq: (b, ctx) => `<div class="c3p051-mcq">${b.items.map((it, i) => `<div class="q"><b class="c3p051-mk">(${ctx.bn((b.start || 1) + i)})</b><span>${ctx.md(it.q)}</span></div>
      <div class="os">${it.opts.map((o, k) => `<span class="o"><b>(${BNL[k]})</b> ${ctx.md(o)}<i class="tk"></i></span>`).join("")}</div>`).join("")}</div>`,
    c3p051_eqs: (b, ctx) => `<div class="c3p051-eqs"${b.size ? ` style="font-size:${b.size}pt"` : ""}><table>${b.nums.map((n, i) => `<tr${i === b.nums.length - 1 ? ` class="ln"` : ""}><td>${ctx.esc(n)}</td></tr>`).join("")}<tr class="t"><td>${ctx.esc(b.total)}</td></tr></table></div>`,
    // a dashed line to write the answer on, under a word problem: { w? (mm) }
    c3p051_line: (b) => `<div class="c3p051-wl"${b.w ? ` style="width:${b.w}mm"` : ""}></div>`,
  },
  css: `
svg.c3p051-mul, svg.c3p051-svg { display: block; overflow: visible }
.c3p051-one { display: flex; justify-content: center }
.c3p051-steps { display: flex; flex-direction: column; gap: 2.2mm; border: .6mm solid var(--c); border-radius: 6mm; background: #fff; padding: 3mm 3.4mm; box-shadow: 0 1.2mm 0 var(--s) }
.c3p051-step { display: flex; align-items: center; gap: 3.4mm }
.c3p051-sm { flex: none; display: flex; justify-content: center }
.c3p051-tb { flex: 1; border-radius: 4mm; padding: 2mm 3.6mm 1.8mm; border: .5mm solid; font: 600 12pt/1.45 'Noto Sans Bengali' }
.c3p051-tb p + p { margin-top: .6mm } .c3p051-tb.c { display: flex; flex-direction: column; justify-content: center } .c3p051-tb .ti { text-align: center; font: 800 13pt/1.3 'Baloo Da 2'; color: var(--d) } .c3p051-tb.c { text-align: center }
.c3p051-tb.t-green { background: #ECFCCB; border-color: #A3E635 } .c3p051-tb.t-yellow { background: #FEF9C3; border-color: #FACC15 }
.c3p051-tb.t-pink { background: #FCE7F3; border-color: #F9A8D4 } .c3p051-tb.t-blue { background: #E0F2FE; border-color: #7DD3FC }
.c3p051-tb.t-purple { background: #F3E8FF; border-color: #D8B4FE } .c3p051-tb.t-orange { background: #FFEDD5; border-color: #FDBA74 }
.c3p051-pp { align-self: center; background: linear-gradient(160deg, #F5EDFF, #EBDDFB); border: .6mm solid #C4A5F0; border-radius: 6mm; padding: 3mm 4mm 2.6mm; box-shadow: 0 1.2mm 0 #DDD0F5; font-size: 13pt }
.c3p051-pp table { border-collapse: collapse; font-family: 'Baloo Da 2'; font-weight: 800 }
.c3p051-pp td { height: 1.55em; line-height: 1.55; padding: 0 } .c3p051-pp td.d { width: .95em; text-align: center } .c3p051-pp td.op { width: 1em; color: ${RED}; text-align: center }
.c3p051-pp tr.ln td.d, .c3p051-pp tr.ln td.op { border-bottom: .5mm solid ${INK} } .c3p051-pp td.lb { padding-left: 1mm; font-weight: 700; color: #6B21A8; white-space: nowrap }
.c3p051-lead { display: flex; align-items: baseline; gap: 1mm } .c3p051-lead i { flex: 1; min-width: 5mm; border-bottom: .6mm dotted #8B5CF6; transform: translateY(-.25em) }
.c3p051-set { display: flex; justify-content: space-around; align-items: flex-start }
.c3p051-mex { display: grid; gap: 3mm 3mm; align-items: start; justify-items: center }
.c3p051-mx { display: flex; align-items: flex-start; gap: 1.6mm }
.c3p051-mk { font: 800 12.5pt/1.4 'Baloo Da 2'; color: #EA580C; white-space: nowrap }
.c3p051-split { display: flex; align-items: flex-start; gap: 1mm; font: 700 13pt 'Baloo Da 2'; align-self: center }
.c3p051-spa { display: flex; align-items: center; gap: 1mm } .c3p051-spa .lf { white-space: nowrap }
.c3p051-spg { display: grid; grid-template-columns: auto auto; column-gap: 2.4mm; align-items: center }
.c3p051-spg .e { text-align: right; white-space: nowrap } .c3p051-spg .v { text-align: right; white-space: nowrap; min-width: 9mm } .c3p051-spg .v b { color: ${ANS} }
.c3p051-spg > span { display: flex; align-items: center } .c3p051-spg .e { justify-content: flex-end } .c3p051-spg .v { justify-content: flex-end }
.c3p051-spg .rl { grid-column: 1 / -1; border-top: .5mm solid ${INK} }
.c3p051-wb { display: inline-block; width: var(--bw, 24mm); height: 7.4mm; vertical-align: middle; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm }
.c3p051-wb.sm { width: 15mm; height: 6.8mm }
.c3p051-area { border-collapse: separate; border-spacing: .7mm; font: 800 13pt 'Baloo Da 2' }
.c3p051-area td { width: 17mm; height: 9mm; text-align: center; background: #CCFBF1; border-radius: 1.4mm } .c3p051-area td.h { background: #BAE6FD } .c3p051-area td.k { background: #EDE9FE; width: 12mm }
.c3p051-area tr:first-child td.k { background: transparent }
.c3p051-tenx { display: grid; grid-template-columns: auto auto auto auto; align-items: center; column-gap: 2mm; row-gap: .4mm; font: 700 13pt 'Baloo Da 2'; align-self: center; background: #FEFCE8; border: .5mm solid #FDE047; border-radius: 4mm; padding: 2mm 4mm }
.c3p051-tenx.green { background: #ECFCCB; border-color: #A3E635 }
.c3p051-tenx .e { text-align: right; white-space: nowrap } .c3p051-tenx .v { text-align: center; white-space: nowrap } .c3p051-tenx .v b { color: ${ANS} }
.c3p051-tenx .al, .c3p051-tenx .ar, .c3p051-tenx .arl { display: flex; align-items: center; gap: 1mm; font-size: .85em; color: #B91C1C; white-space: nowrap } .c3p051-tenx .al { justify-content: flex-end } .c3p051-tenx .ar { justify-content: center }
svg.c3p051-dn { display: block }
.c3p051-mcq { display: flex; flex-direction: column; gap: .6mm; padding-left: 1mm }
.c3p051-mcq .q { display: flex; gap: 1.6mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .c3p051-mcq .q .c3p051-mk { font-size: 12.5pt }
.c3p051-mcq .os { display: grid; grid-template-columns: repeat(4, 1fr); padding-left: 8mm; margin-bottom: .6mm; font: 700 12.5pt/1.4 'Baloo Da 2' }
.c3p051-mcq .o { display: flex; align-items: center; gap: 1.4mm; white-space: nowrap } .c3p051-mcq .o > b { color: #EA580C }
.c3p051-mcq .tk { display: inline-block; width: 4.6mm; height: 4.6mm; border: .45mm solid #93C5FD; border-radius: 1mm; background: #fff; margin-left: .6mm }
.c3p051-eqs { align-self: center; font: 800 13pt 'Baloo Da 2'; background: #F7FEE7; border: .5mm solid #BEF264; border-radius: 3mm; box-shadow: 0 .8mm 0 #D9F99D; padding: 1mm 2.4mm 1.2mm }
.c3p051-eqs table { border-collapse: collapse } .c3p051-eqs td { text-align: right; padding: 0 1mm; line-height: 1.45 } .c3p051-eqs tr.ln td { border-bottom: .5mm solid ${INK} } .c3p051-eqs tr.t td { color: ${ANS} }
.c3p051-wl { margin: 3mm 0 1mm 10mm; width: 120mm; border-bottom: .5mm dashed #94A3B8 }
.c3p051-steps.horiz { flex-direction: row; align-items: stretch } .c3p051-steps.horiz .c3p051-step { flex: 1 1 0; flex-direction: column; align-items: stretch; gap: 2mm }
.c3p051-steps.horiz .c3p051-sm { width: auto !important } .c3p051-steps.horiz .c3p051-tb { flex: 1 }
`,
};
