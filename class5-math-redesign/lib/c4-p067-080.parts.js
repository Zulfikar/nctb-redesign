// Printed pages 67–80's own kinds (chapter ৫ গাণিতিক বাক্য), prefixed c4p067_. Written by a helper (23 Nov 2026).
// The chapter is about signs, so the signs are drawn with care:
//   ≮ and ≯ have no glyph in our fonts (Chrome falls back to "</" and ">/"), so they are drawn by code: a chevron with a
//   slash through it; < and > are drawn the same way, so the four match; ∴ is three drawn dots (the fallback glyph is tiny).
// Extra markup in every text on these pages (besides the core's □ [[x]] {{a/b}} ___ **b**):
//   ▭ a wider empty box (for a number of 3–5 digits; its width is --bw, 19mm unless a kind sets bw), ▬ a long box (--lw),
//   ○ a drawn circle (the unknown-number sign on p68), ≮ ≯ ∴ as above.
// The content file wraps every top-level block in c4p067_x, so this markup works in the core's blocks too (say, text,
// sums, tables) without changing their layout (the wrapper adds no element).
//
//   c4p067_x        { b }                                             renders block b (or a list) and draws the signs
//   c4p067_symgrid  { rows: [[[x%, sign], …], …], w, rh }             p67's yellow panel of symbols, each on a tile where the book has it
//   c4p067_def      { tone, text, syms, last? }                       p67–68's coloured rule cards: the rule, then its signs on chips
//   c4p067_names    { cells: [[sign, name], …] }                      p68's table of the relation signs' and brackets' names (3 a row)
//   c4p067_tab      { table: {head, rows, tone, left}, cols: [%…] }   a core table with set column widths (p70)
//   c4p067_sides    { n, left: [[op, expr]…], right, after, lw, rw }  বামপক্ষ / ডানপক্ষ: each side worked out in a dashed box (pp71–73)
//   c4p067_work     { rows: [{ l, e, r }], left?, bw?, bh?, size?, gap?, indent?, center? }   written working: label | sum | words
//   c4p067_eq       { text, center?, align?, size?, bw?, lw? }                     one line of maths (Baloo), e.g. "এখানে ▭ □ ▭"
//   c4p067_items    { items: [text…], cols?, start? }                 "(১) উনপঞ্চাশ ভাগ সাত": numbered items in words
//   c4p067_trial    { rows: [[n, ok]…], rest }                        p74: numbers tried in the box, each crossed or ticked
//   c4p067_cards    { nums, ops: [[sign, colour]…] }                  p74's game: the set of 6 number cards and 4 sign cards
//   c4p067_books    { h }                                             p73: a pile of three books, drawn
//   c4p067_food     { h }                                             p77: এক হালি (4) eggs and এক ডজন (12) bananas, drawn (the counts matter)
//   c4p067_wbox     { h }                                             an empty ruled box to write a story or the working in
//   c4p067_arrow    { w }                                             p75's long arrow
//   c4p067_tag      { text }                                          p77's "বিকল্প সমাধান" label
const INK = "#1E2433";
const f2 = (x) => Math.round(x * 100) / 100;

// < > ≮ ≯ all drawn the same way (a chevron, and a slash through it for "not"), so the four look alike in a sentence
const REL = (dir, not) => `<svg class="c4p067-rel" viewBox="0 0 10 10"><path d="${dir === "<" ? "M8.7 1.3L1.5 5L8.7 8.7" : "M1.3 1.3L8.5 5L1.3 8.7"}" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/>${not ? `<path d="M7.4 -.6L2.6 10.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>` : ""}</svg>`;
const THEREFORE = `<svg class="c4p067-th" viewBox="0 0 10 10"><circle cx="5" cy="1.7" r="1.45"/><circle cx="1.6" cy="8.3" r="1.45"/><circle cx="8.4" cy="8.3" r="1.45"/></svg>`;
function fix(html) { // runs on finished HTML: "&lt;"/"&gt;" are only ever text there (a tag's own < > are never escaped)
  return String(html)
    .replace(/≮|&lt;̸/g, REL("<", true)).replace(/≯|&gt;̸/g, REL(">", true))
    .replace(/&lt;/g, REL("<")).replace(/&gt;/g, REL(">"))
    .replace(/∴/g, THEREFORE)
    .replace(/▭/g, `<span class="c4p067-wb"></span>`).replace(/▬/g, `<span class="c4p067-lb"></span>`)
    .replace(/○/g, `<span class="c4p067-ci"></span>`);
}
const mdx = (ctx, s) => fix(ctx.md(s == null ? "" : String(s)));
// one sign on a tile or chip: the book's empty box and circle are drawn, the rest is text
const glyph = (ctx, s) => s === "□" ? `<i class="c4p067-sq"></i>` : s === "○" ? `<i class="c4p067-cc"></i>` : fix(ctx.esc(s));
const TILE = ["#F472B6", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA", "#FB923C"];
const TONES = { // card tint, border, dark (the book's colours, brightened)
  rose: ["#FFF1F2", "#FDA4AF", "#9F1239"], orange: ["#FFF7ED", "#FB923C", "#9A3412"], lime: ["#FEFCE8", "#D9C21F", "#6B5A06"],
  violet: ["#FDF4FF", "#E879F9", "#86198F"], yellow: ["#FEFCE8", "#FACC15", "#854D0E"],
};

// p74: a red cross or a green tick after each try
const CROSS = `<svg class="c4p067-mk" viewBox="0 0 10 10"><path d="M2 2L8 8M8 2L2 8" stroke="#DC2626" stroke-width="1.7" stroke-linecap="round"/></svg>`;
const TICK = `<svg class="c4p067-mk" viewBox="0 0 10 10"><path d="M1.4 5.6L4 8.4L8.8 1.4" fill="none" stroke="#16A34A" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// p73: three books lying in a pile, a little askew (drawn: front edge, pages on the right, the cover on top)
function booksSvg(h) {
  const W = 40, T = 5, D = 13, E = 8.5; // width, thickness, depth (slanting back) of a book
  const books = [[4, 40, "#E0565B", "#9F1D23"], [1.5, 35, "#2A93B8", "#155E75"], [6, 30, "#C9B458", "#7A6A1E"]];
  let g = "";
  for (const [x, y, c, d] of books) {
    g += `<path d="M${x} ${y}H${x + W}L${x + W + D} ${y - E}H${x + D}Z" fill="${c}" stroke="${d}" stroke-width=".45" stroke-linejoin="round"/>`;
    g += `<path d="M${x + W} ${y}L${x + W + D} ${y - E}V${y - E + T}L${x + W} ${y + T}Z" fill="#FBF7EE" stroke="${d}" stroke-width=".45" stroke-linejoin="round"/>`;
    for (let i = 1; i < 4; i++) g += `<path d="M${x + W + .4} ${f2(y + T * i / 4)}L${f2(x + W + D - .4)} ${f2(y - E + T * i / 4)}" stroke="#D6CCB4" stroke-width=".3"/>`;
    g += `<rect x="${x}" y="${y}" width="${W}" height="${T}" fill="${c}" stroke="${d}" stroke-width=".45"/>`;
    g += `<rect x="${x + .5}" y="${y + 1.3}" width="${W - 1}" height="${T - 2.4}" fill="#FBF7EE"/>`;
    g += `<path d="M${x + 6} ${y - 2}L${x + D + 4} ${y - E + 2}" stroke="#fff" stroke-opacity=".35" stroke-width="1.6" stroke-linecap="round"/>`;
  }
  const vw = 62, vy = 20, vh = 27;
  return `<svg class="c4p067-books" width="${f2(h * vw / vh)}mm" height="${h}mm" viewBox="0 ${vy} ${vw} ${vh}">${g}</svg>`;
}

// p77: 4 brown eggs and a hand of 12 bananas
function foodSvg(h) {
  let g = `<defs><radialGradient id="c4p067-egg" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#FBDDB8"/><stop offset=".55" stop-color="#E5A66C"/><stop offset="1" stop-color="#B9733D"/></radialGradient>
    <linearGradient id="c4p067-ban" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FEF08A"/><stop offset=".6" stop-color="#FACC15"/><stop offset="1" stop-color="#D99A0B"/></linearGradient></defs>`;
  for (const [x, y, a] of [[21, 14.5, -14], [38, 15, 10], [14, 28, -8], [31, 30.5, 6]]) // the two at the back first
    g += `<ellipse cx="${x}" cy="${y}" rx="7.6" ry="9.2" transform="rotate(${a} ${x} ${y})" fill="url(#c4p067-egg)" stroke="#7C3F16" stroke-width=".4"/>`;
  const banana = (a, k, fill) => `<g transform="translate(60 6) rotate(${a}) scale(${k})"><path d="M0 -1.9Q17 -1.2 34 -5.6L35.8 -4.6Q19 4.4 0 2Z" fill="${fill}" stroke="#92400E" stroke-width=".4" stroke-linejoin="round"/><circle cx="35" cy="-5" r=".9" fill="#5B3A1A"/></g>`;
  for (let i = 0; i < 6; i++) g += banana(10 + i * 12.4, 1, "url(#c4p067-ban)");
  for (let i = 0; i < 6; i++) g += banana(16 + i * 12.4, .9, "#FDE047");
  g += `<rect x="57" y="3.4" width="6" height="5" rx="1.4" fill="#65A30D" stroke="#3F6212" stroke-width=".4" transform="rotate(35 60 6)"/><rect x="55.2" y="2.4" width="3" height="3.4" rx=".8" fill="#78350F" transform="rotate(35 60 6)"/>`;
  return `<svg class="c4p067-food" width="${f2(h * 100 / 46)}mm" height="${h}mm" viewBox="2 2 100 46">${g}</svg>`;
}

module.exports = {
  kinds: {
    c4p067_x: (b, ctx, page) => fix(Array.isArray(b.b) ? b.b.map((x) => ctx.blockHtml(x, page)).join("") : ctx.blockHtml(b.b, page)),
    c4p067_symgrid: (b, ctx) => {
      const rh = b.rh || 11.5, H = b.rows.length * rh + 3;
      const tiles = b.rows.map((r, i) => r.map(([x, s], j) => `<span class="c4p067-st" style="left:${f2(6 + x * .88)}%;top:${f2(1.5 + i * rh + rh / 2)}mm;--t:${TILE[(i * 2 + j) % TILE.length]}">${glyph(ctx, s)}</span>`).join("")).join("");
      return `<div class="c4p067-sg" style="height:${f2(H)}mm;width:${b.w || 128}mm">${tiles}</div>`;
    },
    c4p067_def: (b, ctx) => {
      const [bg, k, d] = TONES[b.tone] || TONES.yellow, n = b.syms.length;
      const syms = b.syms.map((s, i) => `<span class="c4p067-chip">${glyph(ctx, s)}</span>${i < n - 1 ? (b.last && i === n - 2 ? `<span class="c4p067-and">${ctx.esc(b.last)}</span>` : `<span class="c4p067-sep">,</span>`) : ""}`).join("");
      return `<div class="c4p067-def" style="--b:${bg};--k:${k};--kd:${d}"><p>${mdx(ctx, b.text)}</p><div class="c4p067-syms">${syms}</div></div>`;
    },
    c4p067_names: (b, ctx) => `<div class="c4p067-names">${b.cells.map(([s, name]) => `<span><b>${glyph(ctx, s)}</b>${mdx(ctx, name)}</span>`).join("")}</div>`,
    c4p067_tab: (b, ctx) => fix(ctx.tableHtml(b.table).replace(/^(\s*<table[^>]*>)/, `$1<colgroup>${b.cols.map((c) => `<col style="width:${c}%">`).join("")}</colgroup>`)),
    c4p067_sides: (b, ctx) => {
      const lab = b.labels || ["[বামপক্ষ]", "[ডানপক্ষ]"];
      const box = (rows, i) => `<div class="c4p067-side"><span class="c4p067-sl">${ctx.esc(lab[i])}</span><div class="c4p067-sbox">${rows.map(([o, e]) =>
        `<span class="o">${mdx(ctx, o)}</span><span class="e">${mdx(ctx, e)}</span>`).join("")}</div></div>`;
      return `<div class="c4p067-sides" style="--lw:${b.lw ? b.lw + "mm" : "1fr"};--rw:${b.rw ? b.rw + "mm" : "1fr"}${b.bw ? `;--bw:${b.bw}mm` : ""}"><span class="c4p067-sn">${ctx.esc(b.n || "")}</span>${box(b.left, 0)}${box(b.right, 1)}<div class="c4p067-after">${b.after ? mdx(ctx, b.after) : ""}</div></div>`;
    },
    c4p067_work: (b, ctx) => `<div class="c4p067-work${b.left ? " c4p067-wll" : ""}" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}${b.bh ? `--bh:${b.bh}mm;` : ""}${b.gap != null ? `row-gap:${b.gap}mm;` : ""}${b.indent ? `margin-left:${b.indent}mm;` : ""}${b.center ? "align-self:center;" : ""}">${b.rows.map((r) =>
      `<span class="c4p067-wl">${mdx(ctx, r.l || "")}</span><span class="c4p067-we">${mdx(ctx, r.e)}${r.r ? `<span class="c4p067-wr">${mdx(ctx, r.r)}</span>` : ""}</span>`).join("")}</div>`,
    c4p067_eq: (b, ctx) => `<div class="c4p067-eq${b.center ? " c4p067-c" : ""}" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.bw ? `--bw:${b.bw}mm;` : ""}${b.lw ? `--lw:${b.lw}mm;` : ""}${b.align ? `text-align:${b.align};` : ""}">${mdx(ctx, b.text)}</div>`,
    c4p067_items: (b, ctx) => `<div class="c4p067-items" style="grid-template-columns:repeat(${b.cols || 1}, auto)">${b.items.map((t, i) => `<span class="c4p067-it"><b>(${ctx.bn((b.start || 1) + i)})</b><span>${mdx(ctx, t)}</span></span>`).join("")}</div>`,
    c4p067_trial: (b, ctx) => `<div class="c4p067-trial">${b.rows.map(([n, ok]) => `<span class="ansbox">${ctx.esc(n)}</span><span>${mdx(ctx, b.rest)}</span>${ok ? TICK : CROSS}`).join("")}</div>`,
    c4p067_cards: (b, ctx) => `<div class="c4p067-cards"><div class="c4p067-cn">${b.nums.map((n) => `<span class="c4p067-ncard">${ctx.esc(n)}</span>`).join("")}</div>
      <div class="c4p067-co">${b.ops.map(([s, c]) => `<span class="c4p067-ocard" style="--o:${c}">${ctx.esc(s)}</span>`).join("")}</div></div>`,
    c4p067_books: (b) => `<div class="c4p067-pic">${booksSvg(b.h || 30)}</div>`,
    c4p067_food: (b) => `<div class="c4p067-pic">${foodSvg(b.h || 24)}</div>`,
    c4p067_wbox: (b) => `<div class="c4p067-wbox" style="height:${b.h || 24}mm"></div>`,
    c4p067_arrow: (b) => `<svg class="c4p067-arrow" width="${b.w || 30}mm" height="5mm" viewBox="0 0 ${b.w || 30} 5"><path d="M.5 2.5H${(b.w || 30) - 4}" stroke="${INK}" stroke-width=".9"/><path d="M${(b.w || 30) - 5} .4L${(b.w || 30) - .3} 2.5L${(b.w || 30) - 5} 4.6Z" fill="${INK}"/></svg>`,
    c4p067_tag: (b, ctx) => `<span class="c4p067-tag">${ctx.esc(b.text)}</span>`,
  },
  css: `
/* the signs drawn by code, and the boxes */
:is(.c4p067-st, .c4p067-chip, .c4p067-names) svg.c4p067-rel path:first-child { stroke-width: 2.2 } :is(.c4p067-st, .c4p067-chip, .c4p067-names) svg.c4p067-rel path + path { stroke-width: 1.5 }
svg.c4p067-rel { display: inline-block; width: .62em; height: .66em; vertical-align: -.04em; overflow: visible; margin: 0 .07em }
svg.c4p067-th { display: inline-block; width: .62em; height: .62em; vertical-align: -.04em; fill: currentColor; margin: 0 .12em }
.c4p067-wb { display: inline-block; width: var(--bw, 19mm); height: var(--bh, 7.6mm); vertical-align: -2.2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
.c4p067-lb { display: inline-block; width: var(--lw, 72mm); height: var(--bh, 7.6mm); vertical-align: -2.2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
.c4p067-ci { display: inline-block; width: .85em; height: .85em; border: .5mm solid currentColor; border-radius: 50%; vertical-align: -.08em }
/* p67's panel of symbols */
.c4p067-sg { position: relative; flex: none; align-self: center; background: radial-gradient(circle, #FDE68A .9px, transparent 1.3px) 0 0 / 4mm 4mm, #FEFCE8; border: .7mm solid #FACC15; border-radius: 4mm; box-shadow: 0 1.2mm 0 #FEF08A }
.c4p067-st { position: absolute; transform: translate(-50%, -50%); min-width: 10mm; height: 9.4mm; padding: .9mm 1.2mm 0; display: flex; align-items: center; justify-content: center; background: #fff; border: .55mm solid var(--t); border-radius: 2.2mm; box-shadow: 0 .7mm 0 var(--t); font: 800 17pt/1 'Baloo Da 2'; color: ${INK} }
.c4p067-sq { display: block; width: 8mm; height: 4.6mm; border: .45mm solid ${INK}; margin-top: -.9mm }
.c4p067-cc { display: block; width: 5.6mm; height: 5.6mm; border: .45mm solid currentColor; border-radius: 50%; margin-top: -.9mm }
/* the rule cards */
.c4p067-def { display: flex; flex-direction: column; align-items: center; gap: 1.8mm; background: var(--b); border: .6mm solid var(--k); border-left-width: 2.4mm; border-radius: 3mm 4mm 4mm 3mm; padding: 2.4mm 4mm 2.8mm; box-shadow: 0 1mm 0 color-mix(in srgb, var(--k) 40%, transparent) }
.c4p067-def p { font: 600 12.5pt/1.45 'Noto Sans Bengali'; text-align: center }
.c4p067-syms { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1.2mm .8mm }
.c4p067-chip { min-width: 8.6mm; height: 8.4mm; padding: 1mm 1.6mm 0; display: inline-flex; align-items: center; justify-content: center; background: #fff; border: .5mm solid var(--k); border-radius: 2mm; font: 800 15pt/1 'Baloo Da 2'; color: var(--kd); box-shadow: 0 .6mm 0 var(--k) }
.c4p067-chip .c4p067-sq { width: 5.6mm; height: 5.6mm; margin-top: -1mm; border-color: var(--kd) }
.c4p067-sep { font: 800 14pt/1 'Baloo Da 2'; color: var(--kd); align-self: flex-end; margin-bottom: .6mm } .c4p067-and { font: 700 12.5pt 'Noto Sans Bengali'; color: var(--kd); margin: 0 1.4mm }
/* p68's names */
.c4p067-names { display: grid; grid-template-columns: repeat(3, 1fr); border: .6mm solid var(--c); border-radius: 3.4mm; overflow: hidden; background: #fff; box-shadow: 0 1.2mm 0 var(--s) }
.c4p067-names > span { display: flex; align-items: center; gap: 2.4mm; padding: 1.3mm 3mm; border-top: .35mm solid var(--s); border-left: .35mm solid var(--s); font: 600 12.5pt 'Noto Sans Bengali' }
.c4p067-names > span:nth-child(-n+3) { border-top: 0 } .c4p067-names > span:nth-child(3n+1) { border-left: 0 } .c4p067-names > span:nth-child(n+7) { background: #FFFBFD }
.c4p067-names b { flex: none; min-width: 9.6mm; height: 7.6mm; display: inline-flex; align-items: center; justify-content: center; background: var(--s); border-radius: 1.8mm; font: 800 14pt/1 'Baloo Da 2'; color: var(--d); padding: .9mm 1.4mm 0 }
/* বামপক্ষ / ডানপক্ষ */
.c4p067-sides { display: grid; grid-template-columns: 9mm var(--lw) var(--rw) minmax(0, auto); gap: 0 5mm; align-items: stretch }
.c4p067-sn { font: 800 13pt 'Baloo Da 2'; color: #EA580C; padding-top: .4mm }
.c4p067-side { display: flex; flex-direction: column; align-items: center; gap: .6mm; min-width: 0 }
.c4p067-sl { font: 700 11.5pt 'Noto Sans Bengali'; color: var(--d) }
.c4p067-sbox { align-self: stretch; flex: 1; display: grid; grid-template-columns: auto auto; justify-content: center; align-content: center; align-items: center; gap: 1.2mm 1.6mm; padding: 1.6mm 4mm; border: .55mm dashed var(--c); border-radius: 5mm; background: #fff; font: 700 13pt/1.3 'Baloo Da 2' }
.c4p067-sbox .o { text-align: right; color: var(--d) } .c4p067-sbox .e { white-space: nowrap }
.c4p067-after { align-self: center; padding-top: 5mm; font: 600 12.5pt/1.5 'Noto Sans Bengali'; white-space: nowrap }
/* written working, lines of maths, numbered items */
.c4p067-work { display: grid; grid-template-columns: auto auto; gap: 2.2mm 2mm; align-items: center; justify-content: start; font: 700 13pt/1.3 'Baloo Da 2'; align-self: flex-start }
.c4p067-wl { text-align: right; color: var(--d); white-space: nowrap } .c4p067-we { white-space: nowrap }
.c4p067-wll .c4p067-wl { text-align: left; font: 600 .95em 'Noto Sans Bengali'; color: ${INK} }
.c4p067-wr { font: 600 12pt/1.35 'Noto Sans Bengali'; margin-left: 3mm }
.c4p067-eq { font: 700 13pt/1.5 'Baloo Da 2'; white-space: nowrap } .c4p067-eq.c4p067-c { text-align: center }
.c4p067-items { display: grid; gap: 1.2mm 8mm; padding-left: 2mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.c4p067-it { display: grid; grid-template-columns: 9mm 1fr } .c4p067-it > b { font: 800 12.5pt/1.45 'Baloo Da 2'; color: #EA580C }
/* p74 */
.c4p067-trial { display: grid; grid-template-columns: auto auto auto; gap: 1.4mm 3mm; align-items: center; font: 700 13pt 'Baloo Da 2'; margin-left: 4mm }
.c4p067-trial .ansbox { min-width: 12mm; padding: 0 2mm; font-size: 12.5pt } svg.c4p067-mk { display: block; width: 5mm; height: 5mm }
.c4p067-cards { flex: none; display: flex; flex-direction: column; gap: 2.4mm; padding: 2.6mm 3.4mm 3mm; background: #fff; border: .6mm solid var(--c); border-radius: 3.4mm; box-shadow: 0 1.2mm 0 var(--s) }
.c4p067-cn { display: grid; grid-template-columns: repeat(3, auto); gap: 2mm 7mm; justify-content: center }
.c4p067-ncard { width: 10.5mm; height: 13.5mm; border: .5mm solid ${INK}; border-radius: 1.4mm; background: linear-gradient(160deg, #fff, #F1F5F9); font: 800 11.5pt/1 'Baloo Da 2'; padding: 1.6mm 1.4mm; box-shadow: .7mm .7mm 0 #CBD5E1 }
.c4p067-co { display: flex; justify-content: space-between; gap: 3mm }
.c4p067-ocard { width: 10mm; height: 9mm; display: flex; align-items: center; justify-content: center; border: .5mm solid ${INK}; border-radius: 1.4mm; background: var(--o); font: 800 15pt/1 'Baloo Da 2'; padding-top: .8mm; box-shadow: .7mm .7mm 0 #CBD5E1 }
/* drawings, boxes, the arrow, the tag */
.c4p067-pic { display: flex; justify-content: center; align-items: center } svg.c4p067-books, svg.c4p067-food { display: block; overflow: visible }
.c4p067-wbox { flex: none; border: .6mm solid var(--c); border-radius: 4mm; box-shadow: 0 1.2mm 0 var(--s); background: repeating-linear-gradient(180deg, transparent 0 8.6mm, #CBD5E1 8.6mm 8.9mm), #fff; background-origin: content-box; padding: 0 5mm }
svg.c4p067-arrow { display: block; flex: none }
.c4p067-tag { display: inline-block; flex: none; font: 700 12pt 'Noto Sans Bengali'; color: #075985; background: #BAE6FD; border-radius: 2mm; padding: 1mm 3mm .6mm; white-space: nowrap; box-shadow: 0 .6mm 0 #7DD3FC }
`,
};
