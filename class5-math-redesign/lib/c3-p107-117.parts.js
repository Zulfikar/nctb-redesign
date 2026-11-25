// Own kinds for printed pages 107–117 (chapter 10, বাংলাদেশি মুদ্রা) and 149–155 (chapter 13, উপাত্ত সংগ্রহ ও বিন্যস্তকরণ).
// They load for both content files (p107-117.js, p149-155.js).
//   money: the paisa coins drawn by code (১, ৫, ১০, ২৫, ৫০ পয়সা, shaped as the book's photos: ১ round and small, ৫ a
//          rounded square standing on its corner, ১০ scalloped with 8 lobes, ২৫ round with a beaded ring, ৫০ the largest,
//          round and beaded), mixed with Class 2's drawn notes and taka coins (p115_cash), in rows, columns or stacks,
//          some circled; a shop list; sums in টাকা and পয়সা written in columns; a sum with brackets under its groups
//   data:  pictograph symbols (dot, half dot, leaf flowers with 4/3/2 leaves, hourglass, star, star in a circle, book),
//          pictographs drawn exactly (rows, columns on a grid, columns in rows of three), the tally boxes with a pencil
//   text:  c3p107_ic draws icons inside any block's text: ‹n20› a note, ‹p50› a paisa coin, ‹c1› a taka coin, ‹dot› ‹half›
//          ‹flw› ‹flw3› ‹flw2› ‹hg› ‹star› ‹jstar› ‹bk› symbols, ‹box:30› an empty answer box 30 mm wide (":size" in mm)
//   layout: a table with joined and struck-out cells, a box with its label on top, a centred tinted line, label chips,
//          a curly brace
// Every count (coins, notes, symbols, tally strokes) is drawn by code, so it is exact.
const BN = "০১২৩৪৫৬৭৮৯", bn = (n) => String(n).replace(/\d/g, (d) => BN[d]);
const f2 = (x) => +(+x).toFixed(2);
const INK = "#1E2433";

// ── paisa coins (viewBox 60 × 61, the coin's centre at 30, 30) ──
const PSIZE = { 1: .74, 5: .9, 10: .88, 25: .84, 50: 1 }; // diameters, the ৫০ পয়সা coin = 1
function coinShape(v, k = 1, attrs = "") {
  if (v === 5) { const s = 41 * k; return `<rect x="${f2(30 - s / 2)}" y="${f2(30 - s / 2)}" width="${f2(s)}" height="${f2(s)}" rx="${f2(9 * k)}" transform="rotate(45 30 30)" ${attrs}/>`; }
  if (v === 10) {
    let d = "";
    for (let i = 0; i < 120; i++) { const t = i * 3 * Math.PI / 180, r = k * (25 + 3.6 * Math.pow(Math.abs(Math.cos(4 * t)), .45)); d += `${i ? "L" : "M"}${f2(30 + r * Math.sin(t))} ${f2(30 - r * Math.cos(t))}`; }
    return `<path d="${d}Z" ${attrs}/>`;
  }
  return `<circle cx="30" cy="30" r="${f2(28 * k)}" ${attrs}/>`;
}
/** A paisa coin; d = the ৫০ পয়সা coin's diameter in mm (the others are smaller, as in the book). */
function paisaSvg(v, d = 15) {
  const dm = f2(d * (PSIZE[v] || .85)), V = bn(v);
  const grad = `<defs><radialGradient id="c3p107pg" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#E6EBF1"/><stop offset="1" stop-color="#A9B4C2"/></radialGradient></defs>`;
  const ring = v === 10 ? `<circle cx="30" cy="30" r="21.2" fill="none" stroke="#8C99AA" stroke-width=".8"/>`
    : v === 5 ? coinShape(5, .8, `fill="none" stroke="#8C99AA" stroke-width=".8"`)
    : v >= 25 ? `<circle cx="30" cy="30" r="${v === 50 ? 24.6 : 23.4}" fill="none" stroke="#7B8899" stroke-width="1.5" stroke-dasharray=".1 2.2" stroke-linecap="round"/>`
    : `<circle cx="30" cy="30" r="22.4" fill="none" stroke="#8C99AA" stroke-width=".8"/>`;
  const fs = V.length > 1 ? 19 : 22;
  return `<svg class="c3p107-svg" width="${dm}mm" height="${f2(dm * 61 / 60)}mm" viewBox="0 0 60 61">${grad}
    <g transform="translate(0 1.2)">${coinShape(v, 1, `fill="#475569" opacity=".24"`)}</g>${coinShape(v, 1, `fill="url(#c3p107pg)" stroke="#64748B" stroke-width="1"`)}${ring}
    <path d="M14 21A18 18 0 0 1 32 11" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".75"/>
    <text x="30" y="${v === 5 ? 31.5 : 31}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${fs}" fill="#334155">${V}</text>
    <text x="30" y="42.6" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="700" font-size="8.6" fill="#475569">পয়সা</text></svg>`;
}

// ── notes and taka coins: Class 2's (p115_cash), one at a time ──
const NREL = { 1: .7, 2: .72, 5: .76, 10: .8, 20: .88, 50: .92, 100: .96, 200: .96, 500: 1, 1000: 1 }; // note widths, the ৫০০ টাকা note = 1
const CREL = { 1: .82, 2: .9, 5: 1 };
const unwrap = (html) => html.replace(/^<div[^>]*>/, "").replace(/<\/div>\s*$/, "");
const noteW = (v, w) => f2(w * (NREL[v] || 1));
function pieceSvg(m, o, ctx) {
  if (typeof m === "number") return unwrap(ctx.blockHtml({ kind: "p115_cash", items: [{ v: m, back: o.back }], w: noteW(m, o.w) }));
  const k = m[0], v = +m.slice(1);
  if (k === "c") return unwrap(ctx.blockHtml({ kind: "p115_cash", items: [{ v, coin: true }], cw: f2(o.cw * (CREL[v] || 1)) }));
  if (k === "p") return paisaSvg(v, o.cw);
  throw new Error(`c3p107 money: no piece "${m}" (a number for a note, c1/c2/c5 for a taka coin, p1/p5/p10/p25/p50 for a paisa coin)`);
}
/** One piece: 20 | "p50" | "c2" | { m, ring: circled, cap: a label under it, back } */
function piece(it, o, ctx) {
  const s = it && typeof it === "object" ? it : { m: it };
  return `<span class="c3p107-pc${s.ring ? " ring" : ""}">${pieceSvg(s.m, { ...o, back: s.back ?? o.back }, ctx)}${s.cap ? `<small>${ctx.md(s.cap)}</small>` : ""}</span>`;
}

// ── pictograph symbols (viewBox 20 × 20) ──
function leaf(tx, ty) { // a lens-shaped leaf from the centre (10, 10) out to (tx, ty)
  const mx = (10 + tx) / 2, my = (10 + ty) / 2, dx = tx - 10, dy = ty - 10, nx = -dy * .36, ny = dx * .36;
  return `<path d="M10 10Q${f2(mx + nx)} ${f2(my + ny)} ${tx} ${ty}Q${f2(mx - nx)} ${f2(my - ny)} 10 10Z" fill="#2BB57F" stroke="#14532D" stroke-width=".55" stroke-linejoin="round"/><path d="M10 10L${f2(10 + dx * .86)} ${f2(10 + dy * .86)}" stroke="#14532D" stroke-width=".35"/>`;
}
const LEAVES = { TL: [1.4, 1.4], TR: [18.6, 1.4], BL: [1.4, 18.6], BR: [18.6, 18.6] };
const flower = (keys) => keys.map((k) => leaf(...LEAVES[k])).join("");
const starPath = (cx, cy, R, r) => { let d = ""; for (let i = 0; i < 10; i++) { const a = (i * 36 - 90) * Math.PI / 180, q = i % 2 ? r : R; d += `${i ? "L" : "M"}${f2(cx + q * Math.cos(a))} ${f2(cy + q * Math.sin(a))}`; } return d + "Z"; };
const SYM = {
  dot: `<circle cx="10" cy="10" r="9" fill="#2E3192" stroke="#1E1B4B" stroke-width=".5"/><circle cx="7" cy="6.8" r="2.2" fill="#fff" opacity=".22"/>`,
  half: `<path d="M10 1A9 9 0 0 0 10 19Z" fill="#2E3192" stroke="#1E1B4B" stroke-width=".5"/>`,
  flw: flower(["TL", "TR", "BL", "BR"]), flw3: flower(["TL", "BL", "BR"]), flw2: flower(["TL", "BL"]),
  hg: `<path d="M1.6 1.4H18.4L10 10L18.4 18.6H1.6L10 10Z" fill="#1F63C6" stroke="#1E3A8A" stroke-width=".7" stroke-linejoin="round"/><path d="M4.2 2.8H11L7.6 6.2Z" fill="#fff" opacity=".25"/>`,
  star: `<path d="${starPath(10, 10.8, 9.6, 3.9)}" fill="#fff" stroke="${INK}" stroke-width="1.15" stroke-linejoin="round"/>`,
  jstar: `<circle cx="10" cy="10" r="9.3" fill="#FDE047" stroke="${INK}" stroke-width=".6"/><path d="${starPath(10, 10.6, 7.4, 3)}" fill="#EC1C8C" stroke="${INK}" stroke-width=".5" stroke-linejoin="round"/>`,
  bk: `<path d="M6.4 2.6H19.6L13.6 17.4H.4Z" fill="#0B6FB8" stroke="#075985" stroke-width=".4" stroke-linejoin="round"/>`,
};
function symSvg(name, size = 6) {
  if (!SYM[name]) throw new Error(`c3p107 symbol: no "${name}" (${Object.keys(SYM).join(", ")})`);
  return `<svg class="c3p107-svg c3p107-sym" width="${size}mm" height="${size}mm" viewBox="0 0 20 20">${SYM[name]}</svg>`;
}

// ── icons in text: ‹n20› ‹p50› ‹c1› ‹dot› ‹flw3› ‹box:30› … (":n" sets the size in mm) ──
const TOKEN = /‹([a-z]+)(\d*)(?::([\d.]+))?›/g;
function icons(html, ctx) {
  return html.replace(TOKEN, (m, t, n, s) => {
    const z = s ? +s : null, inl = (x) => `<span class="c3p107-in">${x}</span>`;
    if (t === "n" && n) return inl(pieceSvg(+n, { w: (z || 14) / (NREL[+n] || 1) }, ctx));
    if (t === "p" && n) return inl(paisaSvg(+n, z || 8));
    if (t === "c" && n) return inl(pieceSvg("c" + n, { cw: z || 8 }, ctx));
    if (t === "box") return `<span class="abox" style="width:${z || 30}mm"></span>`;
    if (SYM[t + n]) return inl(symSvg(t + n, z || 5.6));
    throw new Error(`c3p107_ic: no icon "${m}"`);
  });
}

// a pencil lying from its tip (x, y) up to the right, in mm (as Class 2's tally lesson draws it)
const pencil = (x, y, len, a = -58, col = "#F472B6") => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0L3 -1.1V1.1Z" fill="#F5D0A9" stroke="#92400E" stroke-width=".25"/><path d="M0 0L1 -.37V.37Z" fill="#334155"/>
  <rect x="3" y="-1.1" width="${len - 5}" height="2.2" fill="${col}" stroke="#9D174D" stroke-width=".25"/><rect x="${len - 2}" y="-1.1" width="2" height="2.2" rx=".5" fill="#818CF8" stroke="#4338CA" stroke-width=".25"/></g>`;
const stroke = (x1, y1, x2, y2, col = INK, w = .75) => `<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;

module.exports = {
  kinds: {
    /** Money in a row (wraps), in rows, in columns, or stacked:
     *  { items | rows: [[…]] | cols: [[…]], stack: [dx, dy] (mm, same notes overlapping), w: the ৫০০ টাকা note's width mm,
     *    cw: the ৫০ পয়সা coin's (and the ৫ টাকা coin's) size mm, gap, rgap, cgap, justify, align, back }
     *  a piece: 20 (a note) | "c2" (a taka coin) | "p25" (a paisa coin) | { m, ring: circled, cap: label under it } */
    c3p107_cash: (b, ctx) => {
      const o = { w: b.w || 30, cw: b.cw || 15, back: b.back }, P = (it) => piece(it, o, ctx), gap = b.gap ?? 2;
      if (b.stack) {
        const [dx, dy] = b.stack, n = b.items.length, m0 = typeof b.items[0] === "object" ? b.items[0].m : b.items[0];
        const w = noteW(m0, o.w), h = w * 60 / 130;
        return `<div class="c3p107-stack" style="width:${f2(w + (n - 1) * dx)}mm;height:${f2(h + (n - 1) * dy)}mm">${b.items.map((it, i) => `<span style="left:${f2(i * dx)}mm;top:${f2(i * dy)}mm">${P(it)}</span>`).join("")}</div>`;
      }
      const row = (items, wrap) => `<div class="c3p107-cr${wrap ? " wrap" : ""}" style="gap:${gap}mm;justify-content:${b.justify || "center"};align-items:${b.align || "center"}">${items.map(P).join("")}</div>`;
      if (b.rows) return `<div class="c3p107-cc" style="gap:${b.rgap ?? gap}mm">${b.rows.map((r) => row(r)).join("")}</div>`;
      if (b.cols) return `<div class="c3p107-cols" style="gap:${b.cgap ?? gap}mm;justify-content:${b.justify || "center"}">${b.cols.map((c) => `<div class="c3p107-cc" style="gap:${b.rgap ?? gap}mm;align-items:center">${c.map(P).join("")}</div>`).join("")}</div>`;
      return row(b.items, true);
    },
    /** Any block, with icons drawn in its text (‹n20› ‹p50› ‹c1› ‹dot› ‹half› ‹flw› ‹flw3› ‹flw2› ‹hg› ‹star› ‹jstar› ‹bk› ‹box:30›): { b: block } */
    c3p107_ic: (b, ctx, page) => icons(ctx.blockHtml(b.b, page), ctx),
    /** One pictograph symbol: { s: "dot" | "half" | "flw" | …, size } */
    c3p107_sym: (b) => `<span class="c3p107-one">${symSvg(b.s, b.size || 6)}</span>`,
    /** A pictograph in rows: { rows: [{ label, n, part?: "half" | "flw3" | …, sticker?, emoji?, icon?: { sticker, emoji } }],
     *  sym, size (mm), gap, lw (label column mm), iw (icon column mm), w (table mm), tone: yellow | white, rowh (mm) } */
    c3p107_picto: (b, ctx) => {
      const size = b.size || 7, gap = b.gap ?? 1.6, icon = b.rows.some((r) => r.icon);
      const syms = (r) => {
        if (r.sticker) return ctx.objsHtml({ sticker: r.sticker, emoji: r.emoji, n: r.n, perRow: r.n, size, gap, align: "start" });
        let s = ""; for (let i = 0; i < r.n; i++) s += symSvg(r.sym || b.sym, size); if (r.part) s += symSvg(r.part, size);
        return `<div class="c3p107-sr" style="gap:${gap}mm">${s}</div>`;
      };
      const cols = `<colgroup><col style="width:${b.lw || 40}mm">${icon ? `<col style="width:${b.iw || 22}mm">` : ""}<col></colgroup>`;
      return `<table class="c3p107-pg ${b.tone || "white"}" style="${b.w ? `width:${b.w}mm` : "width:100%"}">${cols}${b.rows.map((r) => `<tr style="height:${b.rowh || size + 3}mm"><td class="lab">${ctx.md(r.label)}</td>${icon ? `<td class="ic">${r.icon ? ctx.objsHtml({ ...r.icon, n: 1, size: b.isize || size }) : ""}</td>` : ""}<td class="sy">${syms(r)}</td></tr>`).join("")}</table>`;
    },
    /** A pictograph in columns on a grid, the symbols standing from the bottom: { cols: [{ label, n, part? }], rows, sym, size, cw, ch (cell mm) } */
    c3p107_vpicto: (b, ctx) => {
      const H = b.rows, cw = b.cw || 20, ch = b.ch || 10, size = b.size || 7.4;
      let body = "";
      for (let r = 0; r < H; r++) { const i = H - 1 - r; body += `<tr>${b.cols.map((c) => `<td style="height:${ch}mm">${i < c.n ? symSvg(c.sym || b.sym, size) : i === c.n && c.part ? symSvg(c.part, size) : ""}</td>`).join("")}</tr>`; }
      return `<table class="c3p107-vp" style="width:${cw * b.cols.length}mm${b.lf ? `;--lf:${b.lf}pt` : ""}"><colgroup>${b.cols.map(() => `<col style="width:${cw}mm">`).join("")}</colgroup>${body}<tr class="lab">${b.cols.map((c) => `<td>${ctx.md(c.label)}</td>`).join("")}</tr></table>`;
    },
    /** A pictograph in columns, each column's symbols laid out as the book draws them (rows top to bottom, "x" a symbol,
     *  "." an empty place), standing on the column's foot, with a picture and a name under each column:
     *  { cols: [{ grid: ["x..", "xxx"], label, sticker, emoji }], sym, max: rows, size, cw, ph (picture mm) } */
    c3p107_picto3: (b, ctx) => {
      const max = b.max || 3, size = b.size || 6.4, cw = b.cw || 33;
      const cell = (grid) => {
        const list = [...Array(Math.max(0, max - grid.length)).fill(""), ...grid];
        return `<div class="c3p107-p3" style="height:${f2(max * (size + .8))}mm">${list.map((r) => `<div style="height:${size}mm">${[...r].map((ch) => ch === "x" ? symSvg(b.sym, size) : `<i style="width:${size}mm"></i>`).join("")}</div>`).join("")}</div>`;
      };
      return `<table class="c3p107-vp c3p107-p3t" style="width:${cw * b.cols.length}mm"><colgroup>${b.cols.map(() => `<col style="width:${cw}mm">`).join("")}</colgroup>
        <tr>${b.cols.map((c) => `<td>${cell(c.grid)}</td>`).join("")}</tr>
        <tr class="pics">${b.cols.map((c) => `<td>${ctx.objsHtml({ sticker: c.sticker, emoji: c.emoji, n: 1, size: b.ph || 16 })}</td>`).join("")}</tr>
        <tr class="lab">${b.cols.map((c) => `<td>${ctx.md(c.label)}</td>`).join("")}</tr></table>`;
    },
    /** A table whose cells may join or be struck out: { head: [cells] | heads: [[cells], …], rows: [[cells]], widths: [%], tone,
     *  w (mm), small, rowh (mm), al: "left" (every body cell) }; a cell: "markup" | "…" (a writing line) | block | [blocks] |
     *  { c, cs, rs, x: struck out, al: "left", sep: a thick line on its left, th } */
    c3p107_table: (b, ctx, page) => {
      const content = (c) => c == null ? "" : typeof c === "string" ? ctx.md(c) : Array.isArray(c) ? `<div class="c3p107-tc">${c.map((x) => typeof x === "string" ? `<span>${ctx.md(x)}</span>` : ctx.blockHtml(x, page)).join("")}</div>` : `<div class="c3p107-tc">${ctx.blockHtml(c, page)}</div>`;
      const cell = (c, th) => {
        const o = c && typeof c === "object" && !Array.isArray(c) && ("c" in c || c.x) ? c : { c };
        const tag = th || o.th ? "th" : "td", al = o.al || (th ? "" : b.al);
        const cls = [o.x ? "x" : "", al ? "al-" + al : "", o.sep ? "sep" : "", o.c === "…" ? "gap" : ""].filter(Boolean).join(" ");
        return `<${tag}${o.cs ? ` colspan="${o.cs}"` : ""}${o.rs ? ` rowspan="${o.rs}"` : ""}${cls ? ` class="${cls}"` : ""}>${o.c === "…" ? "<i></i>" : content(o.c)}</${tag}>`;
      };
      const heads = b.heads || (b.head ? [b.head] : []);
      const cols = b.widths ? `<colgroup>${b.widths.map((w) => `<col style="width:${w}%">`).join("")}</colgroup>` : "";
      return `<table class="grid tone-${b.tone || "yellow"} c3p107-t${b.small ? " small" : ""}" style="${b.w ? `width:${b.w}mm;align-self:center;` : ""}${b.rowh ? `--rh:${b.rowh}mm` : ""}">${cols}${heads.length ? `<thead>${heads.map((r) => `<tr>${r.map((c) => cell(c, true)).join("")}</tr>`).join("")}</thead>` : ""}<tbody>${b.rows.map((r) => `<tr>${r.map((c) => cell(c)).join("")}</tr>`).join("")}</tbody></table>`;
    },
    /** টাকা and পয়সা written in columns, digit under digit: { rows: [["", "১৫০", "৬৫"], ["+", "৬৭", "৮৩"]], total: ["মোট", "২১৮", "৪৮"],
     *  units: ["টাকা", "পয়সা"], size (pt), nw (number column mm) }; a cell takes the markup (□, ___) */
    c3p107_tp: (b, ctx) => {
      const u = b.units || ["টাকা", "পয়সা"];
      const tr = (r, cls = "") => `<tr class="${cls}"><td class="op">${ctx.md(r[0] || "")}</td><td class="n">${ctx.md(r[1])}</td><td class="u">${u[0]}</td><td class="n">${ctx.md(r[2])}</td><td class="u">${u[1]}</td></tr>`;
      return `<table class="c3p107-tp" style="font-size:${b.size || 13}pt;--nw:${b.nw || 12}mm">${b.rows.map((r) => tr(r)).join("")}${b.total ? tr(b.total, "tot") : ""}</table>`;
    },
    /** A sum with brackets under its groups: { parts: ["+", { g: "৫ + ৫", v: "১০", one?: a single number (a tick, not a bracket) }, …], size } */
    c3p107_group: (b, ctx) => `<div class="c3p107-grp" style="font-size:${b.size || 14}pt">${b.parts.map((p) => typeof p === "string" ? `<span class="t">${ctx.md(p)}</span>`
      : `<span class="g"><span class="t">${ctx.md(p.g)}</span><span class="br${p.one ? " one" : ""}"></span><span class="v">${ctx.md(p.v)}</span></span>`).join("")}</div>`,
    /** An exercise card (the core's ex, same marker and tint) with a block beside it on the right, as the book sets
     *  "the table on the right": { ex, mark, text, body: [blocks under the text], aside: block, aw: its width mm } */
    c3p107_exr: (b, ctx, page) => `<div class="ex m-${b.mark}"><div class="c3p107-exr"><div class="c3p107-exm">${b.text != null ? `<div class="ext wm">${ctx.exMark(b.mark, b.ex)}<span>${icons(ctx.md(b.text), ctx)}</span></div>` : ""}${(b.body || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>
      <div class="c3p107-exa" style="flex:0 0 ${b.aw || 70}mm;width:${b.aw || 70}mm">${ctx.blockHtml(b.aside, page)}</div></div></div>`,
    /** (১) (২) … items whose text flows inline (icons, boxes and writing lines stay in the line): { items: [[label, text]], size, lw (label mm) } */
    c3p107_list: (b, ctx) => `<div class="c3p107-list" style="grid-template-columns:${b.lw || 9.5}mm 1fr${b.size ? `;font-size:${b.size}pt` : ""}">${b.items.map(([l, t]) => `<b>${ctx.esc(l)}</b><div>${icons(ctx.md(t), ctx)}</div>`).join("")}</div>`,
    /** A line of text in its own size: { text, size (pt), center } */
    c3p107_text: (b, ctx) => `<p class="tx${b.center ? " center" : ""}" style="font-size:${b.size || 12.5}pt">${icons(ctx.md(b.text), ctx)}</p>`,
    /** An empty answer box: { w, h } (mm) */
    c3p107_abox: (b) => `<span class="abox c3p107-abox" style="width:${b.w || 30}mm;height:${b.h || 10}mm"></span>`,
    /** A box with its label on top (the book's money boxes): { label, body: [blocks], h (mm), pad, w } */
    c3p107_box: (b, ctx, page) => `<div class="c3p107-bx"${b.w ? ` style="width:${b.w}mm"` : ""}>${b.label ? `<div class="c3p107-bxl">${ctx.md(b.label)}</div>` : ""}<div class="frame c3p107-bxf" style="${b.h ? `min-height:${b.h}mm;` : ""}${b.pad != null ? `padding:${b.pad}mm` : ""}">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div></div>`,
    /** The book's tinted line, centred (or left, full width): { text, left, size } */
    c3p107_pill: (b, ctx) => `<div class="note c3p107-pill${b.left ? " left" : ""}"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${icons(ctx.md(b.text), ctx)}</div>`,
    /** A label chip: { text, tone: violet | green | yellow, big } */
    c3p107_chip: (b, ctx) => `<span class="c3p107-chip ${b.tone || "violet"}${b.big ? " big" : ""}">${icons(ctx.md(b.text), ctx)}</span>`,
    /** A curly brace closing to the right: { h, w } (mm) */
    c3p107_curly: (b) => { const h = b.h || 30, w = b.w || 6, m = w * .5; return `<svg class="c3p107-svg" width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}"><path d="M.3 .4Q${m} .4 ${m} 2.4V${f2(h / 2 - 2)}Q${m} ${f2(h / 2)} ${f2(w - .3)} ${f2(h / 2)}Q${m} ${f2(h / 2)} ${m} ${f2(h / 2 + 2)}V${f2(h - 2.4)}Q${m} ${f2(h - .4)} .3 ${f2(h - .4)}" fill="none" stroke="${INK}" stroke-width=".45" stroke-linecap="round"/></svg>`; },
    /** The shop's price list: { items: [{ sticker, emoji, price, clock?: [h, m] }], cols, size (mm) } */
    c3p107_shop: (b, ctx) => `<div class="c3p107-shop" style="grid-template-columns:repeat(${b.cols || 4}, 1fr)">${b.items.map((it) => `<div class="c3p107-si"><div class="c3p107-sp" style="height:${b.size || 20}mm">${it.clock ? ctx.clockHtml({ h: it.clock[0], m: it.clock[1], size: (b.size || 20) * .95 }) : ctx.objsHtml({ sticker: it.sticker, emoji: it.emoji, n: 1, size: b.size || 20 })}</div><span>${ctx.md(it.price)}</span></div>`).join("")}</div>`,
    /** The tally lesson's two boxes: four strokes with the pencil after them, then the fifth stroke across them being drawn: { w } (one box, mm) */
    c3p107_pencil: (b) => {
      const W = b.w || 24, H = W * .42, gap = 4, h = H * .62, y0 = H * .62, step = W * .085, x0 = W * .22;
      const box = (ox, five) => {
        let s = `<rect x="${ox + .3}" y="${y0 - h / 2 - 1.6}" width="${W - .6}" height="${h + 3.2}" rx="1.2" fill="#fff" stroke="${INK}" stroke-width=".5"/>`;
        for (let i = 0; i < 4; i++) s += stroke(ox + x0 + i * step, y0 - h / 2, ox + x0 + i * step, y0 + h / 2);
        if (five) s += stroke(ox + x0 - step * .6, y0 + h * .38, ox + x0 + step * 3.6, y0 - h * .38, "#DC2626");
        return s + (five ? pencil(f2(ox + x0 + step * 3.6), f2(y0 - h * .38), 17) : pencil(f2(ox + x0 + step * 4.3), f2(y0 + h * .2), 17, -62));
      };
      const top = 14;
      return `<div class="lcenter"><svg class="c3p107-svg" width="${f2(2 * W + gap)}mm" height="${f2(H + top)}mm" viewBox="0 ${-top} ${f2(2 * W + gap)} ${f2(H + top)}">${box(0, false)}${box(W + gap, true)}</svg></div>`;
    },
  },
  css: `
.c3p107-svg { display: block; overflow: visible; flex: none }
.c3p107-pc { position: relative; display: inline-flex; flex-direction: column; align-items: center; gap: .6mm; flex: none }
.c3p107-pc > small { font: 600 9.5pt/1.1 'Noto Sans Bengali'; white-space: nowrap }
.c3p107-pc.ring::after { content: ""; position: absolute; inset: -1.6mm -1.8mm; border: .55mm solid #DC2626; border-radius: 50% }
.c3p107-cr { display: flex; align-items: center } .c3p107-cr.wrap { flex-wrap: wrap } .c3p107-cc { display: flex; flex-direction: column } .c3p107-cols { display: flex; align-items: flex-start }
.c3p107-stack { position: relative; flex: none; align-self: center } .c3p107-stack > span { position: absolute }
.c3p107-in { display: inline-flex; vertical-align: middle; margin: 0 .6mm; position: relative; top: -.3mm }
.c3p107-one { display: inline-flex; justify-content: center }
.c3p107-sr { display: flex; align-items: center; flex-wrap: nowrap }
.c3p107-pg { border-collapse: collapse; background: #fff; align-self: center; box-shadow: 0 1mm 0 var(--s); border-radius: 2mm; overflow: hidden; outline: .5mm solid ${INK}; outline-offset: -.25mm }
.c3p107-pg td { border: .35mm solid ${INK}; padding: .8mm 2.4mm; vertical-align: middle } .c3p107-pg td.lab { font: 700 12pt/1.25 'Baloo Da 2' } .c3p107-pg td.ic { text-align: center } .c3p107-pg td.ic .objs { justify-content: center !important }
.c3p107-pg.yellow td { background: #FFF9C4 }
.c3p107-vp { border-collapse: collapse; background: #fff; align-self: center; table-layout: fixed; box-shadow: 0 1mm 0 var(--s) }
.c3p107-vp td { border: .35mm solid ${INK}; text-align: center; vertical-align: middle; padding: .4mm } .c3p107-vp td > svg { margin: 0 auto }
.c3p107-vp tr.lab td { font: 700 var(--lf, 11.5pt)/1.2 'Baloo Da 2'; padding: 1.2mm .4mm; background: var(--s) }
.c3p107-p3t td { vertical-align: bottom; padding: 1.4mm 1mm } .c3p107-p3 { display: flex; flex-direction: column; justify-content: flex-end; gap: .8mm } .c3p107-p3 > div { display: flex; justify-content: flex-start; gap: .8mm; padding-left: .6mm }
.c3p107-p3t tr.pics td { vertical-align: middle; background: #fff; padding: 1mm } .c3p107-p3t tr.pics .objs { justify-content: center !important }
.c3p107-tc { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .8mm } .c3p107-tc > span { line-height: 1.25 }
.c3p107-t td, .c3p107-t th { vertical-align: middle } .body .c3p107-t td { height: var(--rh, 9mm); padding-top: .5mm; padding-bottom: .5mm; line-height: 1.3 } .c3p107-t td.al-left { text-align: left; padding-left: 3mm } .c3p107-t td.al-left .c3p107-tc { align-items: flex-start }
.c3p107-t thead tr + tr th { border-top: .3mm solid rgba(255,255,255,.55) } .c3p107-t th[rowspan] { vertical-align: middle }
.c3p107-t .sep { border-left: .9mm solid var(--tc) } .c3p107-t td.x { background: linear-gradient(to bottom right, var(--tb) calc(50% - .3mm), ${INK} calc(50% - .3mm), ${INK} calc(50% + .3mm), var(--tb) calc(50% + .3mm)) }
.c3p107-t td.gap i { display: block; border-bottom: .5mm dashed var(--tc); opacity: .55; margin: 3mm 4mm 0 }
.c3p107-tp { border-collapse: collapse; font-family: 'Baloo Da 2'; font-weight: 700; align-self: flex-start }
.c3p107-tp td { padding: .3mm .8mm; white-space: nowrap; line-height: 1.5 } .c3p107-tp td.n { text-align: right; min-width: var(--nw) } .c3p107-tp td.u { font-family: 'Noto Sans Bengali'; font-weight: 600; font-size: .9em; padding-right: 2.2mm }
.c3p107-tp td.op { color: #DC2626; text-align: right; padding-right: 1.6mm; min-width: 5mm } .c3p107-tp tr.tot td { border-top: .6mm solid ${INK}; padding-top: 1.2mm } .c3p107-tp tr.tot td.op { color: var(--d) }
.c3p107-tp .abox { width: 13mm; margin: .4mm 0 } .c3p107-tp .wline { width: 12mm !important }
.c3p107-grp { display: inline-flex; align-items: flex-start; gap: .35em; font-family: 'Baloo Da 2'; font-weight: 700; align-self: flex-start } .c3p107-grp .t { line-height: 1.3; white-space: nowrap }
.c3p107-grp .g { display: inline-flex; flex-direction: column; align-items: center } .c3p107-grp .br { align-self: stretch; height: 2.4mm; border: .45mm solid ${INK}; border-top: 0; border-radius: 0 0 1mm 1mm; margin: .4mm .6mm 0 }
.c3p107-grp .br.one { align-self: center; width: 0; border-width: 0 0 0 .45mm; border-radius: 0; height: 3.2mm } .c3p107-grp .v { font-size: .82em; color: var(--d); line-height: 1.2; margin-top: .4mm }
.c3p107-bx { display: flex; flex-direction: column; align-items: center; min-width: 0; flex: 1 } .c3p107-bx > .frame { align-self: stretch; flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 2mm }
.c3p107-bxl { font: 700 12pt/1 'Baloo Da 2'; color: var(--d); background: #fff; border: .6mm solid var(--c); border-bottom: 0; border-radius: 2.4mm 2.4mm 0 0; padding: 1.6mm 6mm 1mm; position: relative; top: .7mm }
.c3p107-pill { align-self: center; text-align: center; white-space: nowrap } .c3p107-pill.left { align-self: stretch; text-align: left; white-space: normal }
.c3p107-chip { display: inline-block; align-self: center; text-align: center; font: 700 12pt/1.3 'Baloo Da 2'; padding: 1mm 3.6mm .6mm; border-radius: 2mm; white-space: nowrap; border: .5mm solid }
.c3p107-chip.violet { background: #EDE9FE; border-color: #A78BFA; color: #4C1D95 } .c3p107-chip.green { background: #DCFCE7; border-color: #4ADE80; color: #14532D } .c3p107-chip.yellow { background: #FEF9C3; border-color: #FACC15; color: #713F12 }
.c3p107-chip.big { font-size: 13.5pt; padding: 1.4mm 4.6mm 1mm }
.c3p107-shop { display: grid; gap: 2.4mm 3mm; align-items: end } .c3p107-si { display: flex; flex-direction: column; align-items: center; gap: .8mm } .c3p107-si > span { font: 700 11.5pt/1.2 'Baloo Da 2'; white-space: nowrap; background: #FFFBEB; border: .45mm solid #FCD34D; border-radius: 99px; padding: .6mm 3mm .2mm }
.c3p107-sp { display: flex; align-items: center; justify-content: center }
.c3p107-exr { display: flex; gap: 4mm; align-items: flex-start } .c3p107-exm { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2.4mm } .c3p107-exa { display: flex; flex-direction: column; align-items: stretch }
.c3p107-list { display: grid; gap: 1.6mm .6mm; font: 500 12.5pt/1.5 'Noto Sans Bengali' } .c3p107-list > b { font: 700 1em/1.5 'Baloo Da 2'; color: #EA580C } .c3p107-list .abox { vertical-align: -2mm } .c3p107-list .c3p107-in { top: -.2mm }
.c3p107-abox { display: inline-block; vertical-align: middle; flex: none; align-self: center }
.c3p107-p3 > div > i { display: inline-block; flex: none }
`,
};
