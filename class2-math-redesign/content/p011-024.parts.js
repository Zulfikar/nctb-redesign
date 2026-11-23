// Own kinds of content for printed pages 11–24 (chapter 1: counting with blocks and notes, সংখ্যার তুলনা, স্থানীয় মান).
// Every count is drawn by code, so it is exact.
//   p011_base   base-ten blocks in one line (flats, rods, cubes; any order), bottom-aligned; or rows of cubes; or a stack of cubes
//   p011_tab    a table whose cells hold text (the markup below) or blocks; spans, a number column, picture rows
//   p011_money  Bangladeshi notes (১, ১০, ১০০ টাকা), drawn, in rows exactly as the book lays them out
//   p011_cards  number cards (১০০০, ১০০, ১০, ১) in a grid, or sorted into columns
//   p011_pvlines the book's place-value diagrams: lines from each digit to its place (স্থানীয় মান)
//   p011_fill   rows of "(১) {৫৬} = [[৫]] দশক [[৬]] একক", the boxes lined up
//   p011_pairs  pairs of numbers in cards (circle the bigger/smaller one)
//   p011_sub    a heading with a blue dot and a boxed pair of numbers (the hundreds digit underlined)
//   p011_chat   the children's speech cards, smaller (for pages with many of them)
//   p011_lines  blank writing lines
// Text markup (on top of the core's □ [[x]] ___ **x**): {x} a box with a given number, ^৪৬০ underlines the first digit,
// ⬜ a wide empty answer box.
const PLACE = ["#EA580C", "#DB2777", "#2563EB", "#16A34A"]; // ones, tens, hundreds, thousands

function mdx(ctx, s) {
  return ctx.md(String(s).replace(/\{([^}]*)\}/g, "⟦$1⟧").replace(/\^([০-৯]+)/g, "⟪$1⟫").replace(/⬜/g, "⟬⟭"))
    .replace(/⟦(.*?)⟧/g, `<span class="p011-given">$1</span>`).replace(/⟪(.*?)⟫/g, `<span class="p011-u">$1</span>`)
    .replace(/⟬⟭/g, `<span class="p011-wbox"></span>`);
}

/** Base-ten blocks in one line: seq "FRCC…" (F a flat, R a rod, C a cube) or counts; bottom-aligned on one floor. */
function baseSvg(b, ctx) {
  const { s = 2.4, fc = "blue", rc = "pink", oc = "yellow", onesBelow = false, stack = false, tall = false, rows, single } = b;
  const C = { F: ctx.BLOCK[fc], R: ctx.BLOCK[rc], C: ctx.BLOCK[oc] };
  const top = s * 0.5 + 0.3;
  let out = "", w = 0, h = 0;
  if (rows) { // rows of cubes, centred (p17's 23 blocks)
    const step = s * 1.32, maxW = Math.max(...rows) * step;
    rows.forEach((n, r) => { const x0 = (maxW - n * step) / 2; for (let i = 0; i < n; i++) out += ctx.cube(x0 + i * step, top + r * s * 1.45, s, C.C); });
    w = maxW + s * 0.4; h = top + (rows.length - 1) * s * 1.45 + s + 0.4;
  } else {
    const seq = b.seq || "F".repeat(b.flats || 0) + "R".repeat(b.rods || 0) + (onesBelow || stack ? "" : "C".repeat(b.ones || 0));
    const hasTall = /[FR]/.test(seq) || tall || stack;
    const floor = top + (hasTall ? 10 * s : s);
    const gapOf = (a, c) => a === c ? { F: s * 1.3, R: s * 0.55, C: s * 0.32 }[a] : s * 1.5;
    let x = 0, prev = null;
    for (const k of seq) {
      if (prev) x += gapOf(prev, k);
      if (k === "F") { out += ctx.flat(x, floor - 10 * s, s, C.F); x += 10 * s; }
      else if (k === "R") { out += ctx.rod(x, floor - 10 * s, s, C.R); x += s; }
      else { out += ctx.cube(x, floor - s, s, C.C); x += s; }
      prev = k;
    }
    w = x + (seq.includes("F") ? s * 0.5 : s * 0.36); h = floor + 0.4;
    if (stack) { // the ones stacked in a column (p19)
      for (let i = 0; i < (b.ones || 0); i++) out += ctx.cube(x + (seq ? s * 1.5 : 0), floor - (i + 1) * s, s, C.C);
      w = (seq ? x + s * 1.5 : 0) + s * 1.36;
    }
    if (onesBelow) { // the ones in a row under the others (p16)
      const oy = floor + s * 1.1 + s * 0.36;
      for (let i = 0; i < (b.ones || 0); i++) out += ctx.cube(i * s * 1.4, oy, s, C.C);
      w = Math.max(w, (b.ones || 0) * s * 1.4 + s * 0.36); h = oy + s + 0.4;
    }
    if (!seq && !stack) { w = 1; h = floor + 0.4; }
  }
  return `<svg class="p011-base" width="${w.toFixed(2)}mm" height="${h.toFixed(2)}mm" viewBox="-0.3 -0.3 ${(w + 0.6).toFixed(2)} ${(h + 0.6).toFixed(2)}">${out}</svg>`;
}

/** A Bangladeshi note, drawn: 1 taka cream-yellow, 10 pink, 100 blue; the value in Bangla digits. */
const NOTE = { 1: ["#FEF3C7", "#FCD34D", "#92400E"], 10: ["#FCE7F3", "#F9A8D4", "#9D174D"], 100: ["#DBEAFE", "#93C5FD", "#1E3A8A"] };
function noteSvg(v, w, ctx) {
  const [a, b, k] = NOTE[v], d = ctx.bn(v), big = v >= 100 ? 17 : 19;
  const motif = v === 1 // two little deer heads for the old 1 taka note
    ? `<g fill="${k}" opacity=".5">${[-56, -28, 0, 28, 56].map((a) => `<ellipse cx="25" cy="19.5" rx="2.6" ry="6.2" transform="rotate(${a} 25 27)"/>`).join("")}<path d="M17.5 29.5q7.5 5 15 0" fill="none" stroke="${k}" stroke-width="1.4" stroke-linecap="round"/></g>`
    : v === 10 ? `<circle cx="25" cy="23.5" r="9.5" fill="none" stroke="${k}" stroke-opacity=".45" stroke-width="1.2"/><circle cx="25" cy="23.5" r="5" fill="${k}" opacity=".18"/>`
    : `<path d="M25 11l3 9h-6zM19 20h12v3H19zM17 24h16v12H17z" fill="${k}" opacity=".35"/>`;
  return `<svg class="p011-note" width="${w}mm" height="${(w * 0.47).toFixed(2)}mm" viewBox="0 0 100 47">
    <rect x="1" y="1" width="98" height="45" rx="4.5" fill="${b}" stroke="${k}" stroke-width="1.6"/>
    <rect x="5" y="5" width="90" height="37" rx="3" fill="${a}" stroke="${k}" stroke-opacity=".4" stroke-width=".8" stroke-dasharray="2.2 1.6"/>
    <circle cx="25" cy="23.5" r="13" fill="#fff" fill-opacity=".65"/>${motif}
    <text x="68" y="${big === 17 ? 31 : 32}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${big}" fill="${k}">${d}</text>
    <text x="91" y="13.5" text-anchor="end" font-family="Baloo Da 2" font-weight="700" font-size="7.5" fill="${k}" opacity=".8">${d}</text></svg>`;
}

/** The place-value diagram: dir "down" (digits on top, lines down then right) or "up" (digits below, lines up then right). */
function pvlinesSvg({ digits, labels, values, dir = "down", inline = false, head = "স্থানীয় মান", w = 78 }, ctx) {
  const n = digits.length, dw = 5.4, fs = 4.2, rh = 5.5, mid = 1.4;
  const x0 = 3, xL = x0 + n * dw + 12, xV = w - 2;
  // the label rows, top to bottom, with their place (0 = ones)
  const order = dir === "down" ? [...Array(n).keys()] : [...Array(n).keys()].reverse();
  const hY = 4.6;
  let yD, rowY = {};
  if (dir === "down") {
    yD = inline ? hY + rh : hY + 0.4;
    order.forEach((p, r) => { rowY[p] = (inline ? yD : yD + rh * 1.05) + r * rh; });
  } else {
    order.forEach((p, r) => { rowY[p] = hY + rh + r * rh; });
    yD = inline ? rowY[0] : rowY[0] + rh * 1.35;
  }
  const H = Math.max(yD, ...Object.values(rowY)) + 2.2;
  let g = `<text x="${(xL + xV) / 2}" y="${hY}" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="600" font-size="3.9" fill="#1E40AF">${ctx.esc(head)}</text>`;
  digits.forEach((dg, i) => {
    const p = n - 1 - i, x = x0 + i * dw + dw / 2, col = PLACE[p] || "#1E2433", y = rowY[p] - mid;
    g += `<text x="${x}" y="${yD}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${fs + 0.6}" fill="${col}">${ctx.esc(dg)}</text>`;
    const flat = inline && p === 0;
    const path = flat ? `M${x + dw * 0.55} ${y}H${xL - 1.2}` : dir === "down" ? `M${x} ${yD + 0.9}V${y}H${xL - 1.2}` : `M${x} ${yD - fs - 0.2}V${y}H${xL - 1.2}`;
    g += `<path d="${path}" fill="none" stroke="${col}" stroke-width=".55" stroke-linecap="round" stroke-linejoin="round"/>`;
    g += `<text x="${xL}" y="${rowY[p]}" font-family="Noto Sans Bengali" font-weight="600" font-size="${fs - 0.4}" fill="#1E2433">${ctx.esc(labels[i])}</text>`;
    if (values) g += `<text x="${xV}" y="${rowY[p]}" text-anchor="end" font-family="Baloo Da 2" font-weight="800" font-size="${fs}" fill="${col}">${ctx.esc(values[i])}</text>`;
  });
  return `<svg class="p011-pvl" width="${w}mm" height="${H.toFixed(2)}mm" viewBox="0 0 ${w} ${H.toFixed(2)}">${g}</svg>`;
}

function cellHtml(c, ctx, page, rowCls) {
  const o = c && typeof c === "object" && !Array.isArray(c) ? c : { c };
  const inner = Array.isArray(o.c) ? o.c.map((x) => ctx.blockHtml(x, page)).join("") : o.c === "…" ? `<i class="wl"></i>` : mdx(ctx, o.c ?? "");
  const attrs = `${o.span ? ` colspan="${o.span}"` : ""}${o.rs ? ` rowspan="${o.rs}"` : ""}`;
  const cls = [o.cls, o.align ? "p011-" + o.align : ""].filter(Boolean).join(" ");
  return `<td${attrs}${cls ? ` class="${cls}"` : ""}${o.style ? ` style="${o.style}"` : ""}>${inner}</td>`;
}

module.exports = {
  kinds: {
    p011_base: (b, ctx) => `<div class="p011-bwrap" style="justify-content:${b.align || "center"}">${baseSvg(b, ctx)}</div>`,
    p011_tab: (b, ctx, page) => {
      const cols = b.cols ? `<colgroup>${b.num ? `<col style="width:8mm">` : ""}${b.cols.map((x) => `<col style="width:${x}">`).join("")}</colgroup>` : "";
      const rows = b.rows.map((r, i) => {
        const cells = (r.cells || r).map((c) => cellHtml(c, ctx, page)).join("");
        const num = b.num && i === 0 ? `<td class="p011-nc" rowspan="${b.rows.length}"><span>${ctx.esc(b.num)}</span></td>` : "";
        return `<tr class="p011-${r.type || "tx"}"${r.h ? ` style="height:${r.h}mm"` : ""}>${num}${cells}</tr>`;
      }).join("");
      return `<table class="p011-tab tone-${b.tone || "blue"}${b.small ? " p011-small" : ""}"${b.width ? ` style="width:${b.width}mm"` : ""}>${cols}${rows}</table>`;
    },
    p011_money: (b, ctx) => `<div class="p011-money" style="gap:${b.gap ?? 1.6}mm">${b.rows.map((r) => `<div class="p011-mrow" style="gap:${b.gap ?? 1.6}mm">${r.map((v) => noteSvg(v, b.w || 20, ctx)).join("")}</div>`).join("")}</div>`,
    p011_cards: (b, ctx) => {
      const card = (v) => `<span class="p011-card" style="width:${b.w || 19}mm">${ctx.esc(v)}</span>`;
      if (b.sorted) return `<div class="p011-sorted">${b.sorted.map((g) => `<div class="p011-sgrp">${g.cols.map((k) => `<div class="p011-scol" style="height:${g.h || 5 * 10.4}mm">${Array.from({ length: k }, () => card(g.v)).join("")}</div>`).join("")}</div>`).join(`<i class="p011-sdiv"></i>`)}</div>`;
      const cols = b.cols || Math.max(...b.rows.map((r) => r.length));
      return `<div class="p011-cards" style="grid-template-columns:repeat(${cols}, ${b.w || 19}mm)">${b.rows.map((r) => r.map(card).join("") + `<span></span>`.repeat(cols - r.length)).join("")}</div>`;
    },
    p011_pvlines: (b, ctx) => `<div class="p011-pvwrap">${pvlinesSvg(b, ctx)}</div>`,
    p011_fill: (b, ctx) => {
      const n = Math.max(...b.lines.map((l) => l.split("|").length));
      return `<table class="p011-fill${b.wide ? " p011-wide" : ""}" style="font-size:${b.size || 13}pt">${b.lines.map((l) => { const c = l.split("|"); return `<tr>${c.map((x) => `<td>${mdx(ctx, x)}</td>`).join("")}${"<td></td>".repeat(n - c.length)}</tr>`; }).join("")}</table>`;
    },
    p011_pairs: (b, ctx) => `<div class="p011-pairs" style="grid-template-columns:repeat(${b.cols || 3}, 1fr)">${b.pairs.map(([x, y]) => `<span class="p011-pair"><b>${ctx.esc(x)}</b><b>${ctx.esc(y)}</b></span>`).join("")}</div>`,
    p011_text: (b, ctx) => `<p class="tx${b.big ? " big" : ""}${b.center ? " center" : ""}">${mdx(ctx, b.text)}</p>`,
    p011_sub: (b, ctx) => `<div class="sub p011-subx">${b.n ? `<i class="p011-subn">${ctx.esc(b.n)}</i>` : "<i></i>"}<span>${mdx(ctx, b.text)}</span>${b.box ? `<span class="p011-sbox">${mdx(ctx, b.box)}</span>` : ""}</div>`,
    p011_chat: (b, ctx, page) => `<div class="p011-chat${b.size ? " p011-chat-" + b.size : ""}" style="gap:${b.gap ?? 1.6}mm">${b.lines.map((l) => ctx.blockHtml(l, page)).join("")}</div>`,
    p011_lines: (b) => `<div class="p011-lines">${`<i style="height:${b.h || 8}mm"></i>`.repeat(b.n || 2)}</div>`,
  },
  css: `
.p011-bwrap { display: flex; align-items: flex-end } svg.p011-base, svg.p011-note, svg.p011-pvl { display: block; overflow: visible }
.p011-given { display: inline-block; min-width: 13mm; padding: .3mm 2.4mm 0; border: .55mm solid #0EA5E9; background: #F0F9FF; border-radius: 1.8mm; font: 800 1em 'Baloo Da 2'; color: #0369A1; text-align: center; margin: 0 .8mm }
.p011-u { display: inline-block } .p011-u::first-letter { text-decoration: underline; text-decoration-thickness: .5mm; text-underline-offset: 1mm; text-decoration-color: #DC2626 }
.p011-wbox { display: inline-block; width: 46mm; height: 8mm; vertical-align: -2.4mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 2mm; margin: 0 1mm }
/* tables with pictures */
.p011-tab { width: 100%; table-layout: fixed; border: .6mm solid var(--tc); border-radius: 3.4mm; overflow: hidden; background: var(--tb); border-collapse: separate; border-spacing: 0 }
.p011-tab td { border-top: .3mm solid var(--tl); border-left: .3mm solid var(--tl); text-align: center; vertical-align: middle; padding: 1mm 1.4mm; font: 700 12pt/1.35 'Baloo Da 2' }
.p011-tab tr:first-child td { border-top: 0 } .p011-tab td:first-child { border-left: 0 }
.p011-tab tr.p011-pic td { background: #fff; vertical-align: bottom; padding: 2mm 1.4mm 1.8mm }
.p011-tab tr.p011-pic td > * { margin: 0 auto }
.p011-tab tr.p011-hd td { background: var(--tc); color: #fff; font: 800 12pt 'Baloo Da 2'; border-left-color: rgba(255,255,255,.45) }
.p011-tab tr.p011-num td { font: 800 15pt 'Baloo Da 2'; color: var(--tc) }
.p011-tab tr.p011-ans td, .p011-tab td.p011-left { text-align: left; font: 400 12pt/1.5 'Noto Sans Bengali'; padding: 1.4mm 3mm }
.dense .p011-tab td { padding: .6mm 1.2mm }
.p011-tab.p011-small td { font-size: 10.5pt; padding: .3mm 1mm; line-height: 1.2; white-space: nowrap } .p011-tab.p011-small tr.p011-hd td, .p011-tab.p011-small tr.p011-pl td { font-size: 10.5pt }
.p011-tab.p011-small tr.p011-ans td { padding: .8mm 3mm; font-size: 11.5pt } .p011-tab.p011-small tr.p011-pic td { padding: 1.6mm 1mm 1.4mm }
.p011-tab.p011-small .abox { width: 8mm; height: 6.4mm; vertical-align: -1.8mm; margin: 0 .6mm } .dense .p011-tab tr.p011-ans td { padding: .7mm 3mm; line-height: 1.4 } .dense .p011-tab tr.p011-pic td { padding: 1.6mm 1.2mm 1.4mm }
.p011-tab tr.p011-ans td .wline { vertical-align: -.4mm }
.p011-tab tr td.p011-nc.p011-nc { background: var(--tc); vertical-align: top; padding: 1.8mm 0 0; border-left: 0 } .p011-nc span { font: 800 12.5pt 'Baloo Da 2'; color: #fff }
.p011-tab td.p011-nc + td { border-left: 0 }
.p011-tab tr.p011-pl td { font: 800 12pt 'Baloo Da 2'; color: var(--tc) }
.p011-tab tr.p011-pv td { background: #fff; padding: 1.6mm 1mm }
.p011-tab .wl { display: block; border-bottom: .5mm dashed var(--tc); opacity: .55; margin: 3.4mm 3mm 0 }

/* notes and cards */
.p011-money { display: flex; flex-direction: column; align-items: center } .p011-mrow { display: flex; justify-content: center }
.p011-cards { display: grid; gap: 2mm 3mm; justify-content: center }
.p011-card { display: inline-flex; align-items: center; justify-content: center; height: 8.4mm; background: #fff; border: .55mm solid var(--c); border-radius: 2mm; font: 800 13pt/1 'Baloo Da 2'; color: var(--d); box-shadow: 0 .7mm 0 var(--s); padding-top: .6mm }
.p011-sorted { display: flex; justify-content: center; align-items: stretch; gap: 4mm } .p011-sgrp { display: flex; gap: 3mm }
.p011-scol { display: flex; flex-direction: column; justify-content: flex-end; gap: 2mm } .p011-sdiv { width: 0; border-left: .6mm dashed var(--c); opacity: .6 }
/* the place-value diagrams */
.p011-pvwrap { display: flex; justify-content: center }
/* boxes in rows */
.p011-fill { align-self: flex-start; border-collapse: separate; border-spacing: 0 1.9mm; font-family: 'Baloo Da 2'; font-weight: 700; margin: -1.9mm 0 } .p011-fill td { padding: 0 1.2mm; white-space: nowrap; vertical-align: middle }
.p011-fill td:first-child { color: #EA580C; font-weight: 800; padding-right: 3mm } .p011-fill .abox { width: 14mm; height: 8.4mm; vertical-align: middle; margin: 0 } .p011-fill .ansbox { min-width: 14mm; font-size: 1em; padding: .1mm 2mm }
.p011-fill .p011-given { min-width: 17mm }
.p011-fill.p011-wide .p011-given { min-width: 62mm; text-align: left; padding: 1.2mm 3mm .6mm; font-weight: 700; color: #0C4A6E }
.p011-fill.p011-wide td { padding: 0 2.4mm } .p011-fill.p011-wide .abox, .p011-fill.p011-wide .ansbox { width: 62mm; min-width: 62mm; height: 10.6mm; margin: 0; text-align: left; padding: 1.2mm 3mm .6mm; background: #FDF2F8; border-color: #DB2777; color: #9D174D }
/* pairs */
.p011-pairs { display: grid; gap: 2.2mm 6mm; padding: 0 2mm }
.p011-pair { display: flex; justify-content: space-between; align-items: center; background: #fff; border: .5mm solid var(--c); border-radius: 2.4mm; padding: 1mm 4mm .5mm; box-shadow: 0 .7mm 0 var(--s) }
.p011-pair b { font: 800 13pt 'Baloo Da 2'; color: ${"#1E2433"} }
/* headings with a boxed pair */
.p011-subx { flex-wrap: wrap } .sub i.p011-subn { width: 6.2mm; height: 6.2mm; flex: none; font: 800 11pt/6.6mm 'Baloo Da 2'; font-style: normal; color: #fff; text-align: center } .p011-sbox { font: 800 13pt 'Baloo Da 2'; color: #1E2433; background: #fff; border: .6mm solid var(--c); border-radius: 2.4mm; padding: .6mm 3.4mm 0; margin-left: 1mm }
/* smaller speech cards */
.p011-chat { display: flex; flex-direction: column }
.p011-chat .fc { width: 15mm; height: 15mm } .p011-chat .sb { font-size: 12pt; padding: 1.8mm 4.4mm 1.5mm; max-width: 140mm }
.p011-chat-s .fc { width: 13mm; height: 13mm } .p011-chat-s .sb { font-size: 11.5pt; padding: 1.4mm 4mm 1.2mm }
/* writing lines */
.p011-lines { display: flex; flex-direction: column } .p011-lines i { display: block; border-bottom: .5mm dashed #94A3B8 }
`,
};
