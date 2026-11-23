// Unit 6's own kinds (SPEC section 4): what parts.js can't do. Every class starts with u6-; the book's English carries
// data-c, so the text check reads it.
// - u6rows:   a row per sentence with a place to answer at its right: the True/False pills to circle (right: "tf"),
//             or a line to write on (right: "line", rw: its width in mm); spaced: the letters spread out (a jumble),
//             two rows abreast, the line filling the rest; tight, plain (no card), inline (the guide beside the word).
// - u6ans:    answer lines: each mark with a dotted line, as the book prints them (h: the row's height in mm).
// - u6draw:   "Draw and write": a box to draw in, with dotted lines beside it and under it.
// - u6table:  a table whose head cells can span columns (head: [[cell, span]]), with a title row over it, smaller
//             pictures (ph: mm) and empty rows to write in (" ").
// - u6poster: the clues for a poster, in a dashed poster frame (cols: 2 for two columns).
// - u6read:   a reading text in paragraphs: parts.js's text, one paragraph after another in one card.
// - u6match:  parts.js's match, with each column's items spread down its height, the guide under a long phrase,
//             and bigger pictures (ph: mm).
module.exports = (H) => {
  const { esc, en, guide, hint } = H;
  const base = require("../parts.js")(H).kinds;
  const g = (h, m) => (h || m ? guide(h || "", m || "") : "");
  // a cell, as parts.js draws one: "" or "_" a box to write in, " " an empty cell, {pic} a picture, [en, hint, meaning]
  const cell = (c, ph) => {
    if (c == null || c === "" || c === "_") return `<span class="wbox"></span>`;
    if (c === " ") return `<div class="u6-blank"></div>`;
    if (typeof c === "object" && !Array.isArray(c) && c.pic) return `<img class="u6-cpic" style="height:${ph || 16}mm" src="file://${H.art(c.pic)}">`;
    if (Array.isArray(c)) return `<div class="en" data-c>${en(c[0])}</div>${g(c[1], c[2])}`;
    return `<div class="en" data-c>${en(String(c))}</div>`;
  };
  const right = (p) => (p.right === "tf"
    ? `<span class="u6-tf"><span class="u6-pill" data-c>True</span><span class="u6-pill" data-c>False</span></span>`
    : p.right === "line" ? `<span class="u6-line"${p.rw ? ` style="width:${p.rw}mm"` : ""}></span>` : "");
  const kinds = {
    u6read: (p) => `<div class="u6-read">${p.u6read.map((par) => base.text({ text: par })).join("")}</div>`,
    u6match: (p) => `<div class="u6-m${p.under ? " u6-under" : ""}" style="--u6ph:${p.ph || 22}mm">${base.match(p)}</div>`,
    u6rows: (p) => {
      // the True/False column's guide, once, over the pills
      const legend = p.right === "tf" ? `<div class="u6-row u6-legend"><span></span><span></span><span class="u6-tf"><span>${hint("ট্রূ")}<i>সত্য</i></span><span>${hint("ফ়লস়")}<i>মিথ্যা</i></span></span></div>` : "";
      return `<div class="u6-rows${p.spaced ? " u6-sp" : ""}${p.inline ? " u6-inl" : ""}${p.plain ? " u6-plain" : ""}${p.tight ? " u6-tight" : ""}">${legend}${p.u6rows.map(([mk, e, h, m]) => `<div class="u6-row"><span class="u6-mk" data-c>${esc(mk)}</span><div class="u6-txt"><div class="en" data-c>${en(e)}</div>${g(h, m)}</div>${right(p)}</div>`).join("")}</div>`;
    },
    u6ans: (p) => `<div class="u6-ans">${p.u6ans.map((mk) => `<div class="u6-an" style="height:${p.h || 16}mm"><span class="u6-mk" data-c>${esc(mk)}</span><span class="u6-dots"></span></div>`).join("")}</div>`,
    u6draw: (p) => {
      const dots = (n) => Array.from({ length: n }, () => `<div class="u6-dl"></div>`).join("");
      return `<div class="u6-draw"><div class="u6-dtop"><div class="u6-dbox" style="height:${(p.side || 7) * 8.4}mm"><span>✏️</span></div><div class="u6-dside">${dots(p.side || 7)}</div></div>${dots(p.below || 5)}</div>`;
    },
    u6table: (p) => {
      const cols = p.w ? `<colgroup>${p.w.map((x) => `<col style="width:${x}%">`).join("")}</colgroup>` : "";
      const n = p.w ? p.w.length : (p.rows[0] || []).length;
      const title = p.title ? `<tr><th class="u6-tt" colspan="${n}">${cell(p.title)}</th></tr>` : "";
      const head = p.head ? `<tr>${p.head.map(([c, span]) => `<th${span > 1 ? ` colspan="${span}"` : ""}>${cell(c)}</th>`).join("")}</tr>` : "";
      return `<table class="u6-tbl">${cols}<thead>${title}${head}</thead><tbody>${p.rows.map((r) => `<tr>${r.map((c) => `<td${c && c.pic ? ` class="u6-pc"` : ""}>${cell(c, p.ph)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    },
    u6poster: (p) => `<div class="u6-poster${p.cols === 2 ? " u6-c2" : ""}"><span class="u6-pin"></span>${p.u6poster.map(([mk, e, h, m]) => `<div class="u6-clue"><span class="u6-bul" data-c>${esc(mk)}</span><div><div class="en" data-c>${en(e)}</div>${g(h, m)}</div></div>`).join("")}</div>`,
  };
  const css = `
.u6-rows { display: flex; flex-direction: column; gap: 1.2mm; padding-left: 2mm }
.u6-row { display: grid; grid-template-columns: 7mm 1fr auto; column-gap: 1.6mm; align-items: center; background: #fff; border-radius: 2.6mm; padding: 1mm 2mm; border: .4mm solid #FDE68A }
.u6-legend { background: none; border: none; padding: 0 2mm; margin-bottom: -.8mm }
.u6-legend .u6-tf > span { width: 17mm; text-align: center; font: 500 7.4pt/1.25 'Noto Sans Bengali'; display: flex; flex-direction: column }
.u6-legend i { font-style: normal; color: #1D4ED8; font-weight: 600 }
.u6-mk { font: 800 12.5pt/1.3 'Baloo 2'; color: #EA580C; align-self: start; padding-top: .2mm }
.u6-tf { display: flex; gap: 2mm }
.u6-pill { width: 17mm; text-align: center; font: 700 11.5pt/1 'Andika'; color: var(--d); background: var(--s); border: .5mm solid var(--c); border-radius: 99px; padding: 1.4mm 0 1.2mm }
.u6-line { height: 7mm; border-bottom: .4mm solid #64748B; align-self: end; margin-bottom: 1.2mm }
.u6-sp { display: grid; grid-template-columns: 1fr 1fr; gap: 2mm 6mm }
.u6-sp .u6-row { grid-template-columns: 0 32mm 1fr; column-gap: 1.4mm }
.u6-sp .en { letter-spacing: 2.6mm; font-size: 14pt }
.u6-tight { gap: .8mm } .u6-tight .u6-row { padding: .3mm 2mm }
.u6-plain { gap: 0 } .u6-plain .u6-row { background: none; border: none; padding: .6mm 2mm }
.u6-inl .u6-txt { display: flex; align-items: baseline; gap: 2.4mm; flex-wrap: wrap }
.u6-ans { display: flex; flex-direction: column; padding: 0 2mm }
.u6-an { display: flex; align-items: flex-end; gap: 2mm; padding-bottom: 1.4mm }
.u6-an .u6-mk { align-self: auto; padding: 0; line-height: 1 }
.u6-dots { flex: 1; border-bottom: .7mm dotted #94A3B8; margin-bottom: .6mm }
.u6-draw { background: #fff; border: .6mm solid var(--c); border-radius: 4mm; padding: 3mm 4mm 2mm; display: flex; flex-direction: column }
.u6-dtop { display: grid; grid-template-columns: 44% 1fr; column-gap: 4mm }
.u6-dbox { border: .6mm dashed var(--c); border-radius: 3mm; background: color-mix(in srgb, var(--s) 35%, #fff); position: relative }
.u6-dbox span { position: absolute; right: 2mm; bottom: 1.4mm; font-family: 'Noto Color Emoji'; font-size: 13pt; opacity: .55 }
.u6-dl { height: 8.4mm; border-bottom: .6mm dotted #94A3B8 }
.u6-tbl { width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0; border: .6mm solid var(--c); border-radius: 3mm; overflow: hidden; background: #fff }
.u6-tbl th { background: var(--c); padding: 1.2mm 2mm; text-align: center } .u6-tbl th .en { color: #fff; font-size: 11.5pt } .u6-tbl th .guide * { color: #fff !important }
.u6-tbl th.u6-tt { background: var(--d) } .u6-tbl th + th { border-left: .3mm solid rgba(255,255,255,.5) }
.u6-tbl td { padding: 1mm 2.4mm; border-top: .3mm solid color-mix(in srgb, var(--c) 30%, #fff); vertical-align: middle }
.u6-tbl td + td { border-left: .3mm solid color-mix(in srgb, var(--c) 30%, #fff) }
.u6-tbl tbody tr:nth-child(even) td { background: color-mix(in srgb, var(--s) 45%, #fff) }
.u6-tbl td.u6-pc { text-align: center; padding: .8mm }
.u6-cpic { display: block; margin: 0 auto; max-width: 100%; object-fit: contain; border-radius: 1.6mm }
.u6-blank { height: 9mm }
.u6-poster { position: relative; align-self: center; width: 78%; background: #fff; border: .7mm dashed var(--c); border-radius: 5mm; padding: 4mm 5mm 3mm; display: flex; flex-direction: column; gap: 1mm; box-shadow: 0 1mm 0 var(--s) }
.u6-pin { position: absolute; top: -2.6mm; left: 50%; width: 5mm; height: 5mm; margin-left: -2.5mm; border-radius: 50%; background: #EF4444; box-shadow: 0 .6mm 0 #991B1B }
.u6-poster.u6-c2 { width: 100%; padding: 3.4mm 5mm 2mm; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: repeat(3, auto); grid-auto-flow: column; gap: .6mm 5mm }
.u6-clue { display: grid; grid-template-columns: 5mm 1fr; align-items: start }
.u6-bul { font: 800 13pt/1.25 'Baloo 2'; color: var(--c) }
.u6-read { display: flex; flex-direction: column; border-radius: 4mm; overflow: hidden }
.u6-read > .read { border-radius: 0; padding-top: 1.6mm; padding-bottom: .2mm }
.u6-read > .read:first-child { padding-top: 2.6mm } .u6-read > .read:last-child { padding-bottom: 1.2mm }
.u6-read > .read + .read { border-top: .5mm dashed color-mix(in srgb, var(--c) 45%, #fff) }
.u6-read .sen .guide { margin-bottom: .9mm }
.u6-m .mcol { justify-content: space-around }
.u6-m .cpic { height: var(--u6ph) }
.u6-under .mi[data-r] { flex-wrap: wrap; column-gap: 1.6mm; row-gap: 0; padding-top: .8mm; padding-bottom: .8mm }
.u6-under .mi[data-r] .guide { flex-basis: 100%; padding-left: 4.2mm; font-size: 7.8pt; line-height: 1.3 }
`;
  return { kinds, css };
};
