// Unit 3's own kinds (SPEC.md section 4), for what parts.js can't do:
// - u3sub: a sub-heading inside a task ("Exercise 1", "Instructions for making a simple kite", the rhyme's title, "1. Listen…")
// - u3fig: one picture at a fixed height, shown whole (a figure beside commands, a kite step, a sample kite, the thermometer)
// - u3grid: parts side by side in a grid: a figure beside its commands, the kite steps beside their pictures, the rhyme's
//   verses in two columns, and the book's tables whose cells hold several lines (pp 44–45), with dots for matching.
// - u3count: pens, pencils and crayons to count, bundled in tens (page 46), as the book draws them.
// Every English word the book prints keeps data-c (the text check reads it); the classes all start with u3-.
const path = require("path");

module.exports = (H) => {
  const { esc, en, guide } = H;
  const base = require(path.join(__dirname, "..", "parts.js"))(H);
  const kinds = {};
  // one part, rendered as build.js renders a block's parts (object kinds merge their options; nocheck turns data-c off)
  const part = (p) => {
    if (!p) return "";
    if (Array.isArray(p)) return p.map(part).join("");
    const K = { ...base.kinds, ...kinds }, k = Object.keys(K).find((x) => x in p);
    if (!k) throw new Error("unit3: unknown part " + JSON.stringify(p).slice(0, 80));
    const v = p[k], q = v && typeof v === "object" && !Array.isArray(v) && k !== "note" ? { ...p, ...v } : p;
    const h = K[k](q);
    return p.nocheck ? h.replace(/ data-c/g, " data-x") : h;
  };
  const stand = (name) => (H.art(name).includes("/art/new/") ? "" : `<span class="u3-tag">stand-in</span>`);
  // a head cell: [en, hint, meaning]
  const headCell = (c) => (Array.isArray(c) ? `<div class="en" data-c>${en(c[0])}</div>${c[1] || c[2] ? guide(c[1] || "", c[2] || "") : ""}` : "");

  // { u3sub: [en, meaning] } (an instruction) or { u3sub: [en, hint, meaning] } (words the child reads); mk: "1."; center: true
  kinds.u3sub = (p) => {
    const s = p.u3sub, instr = s.length === 2;
    return `<div class="u3-sub${p.center ? " ctr" : ""}">${p.mk ? `<span class="u3-mk" data-c>${esc(p.mk)}</span>` : ""}<div class="u3-sb"><div class="u3-st" data-c>${en(s[0])}</div>${instr ? `<div class="u3-sm">${esc(s[1])}</div>` : guide(s[1], s[2])}</div></div>`;
  };
  // { u3fig: "name", h: mm, w: "60mm" | "70%", fit: "contain" | "cover", center: true, frame: false }
  kinds.u3fig = (p) => `<div class="u3-fig${p.frame === false ? " bare" : ""}${p.center ? " ctr" : ""}" style="height:${p.h || 40}mm${p.w ? `;width:${p.w}` : ""}"><img src="file://${H.art(p.u3fig)}" style="object-fit:${p.fit || "contain"}">${stand(p.u3fig)}</div>`;
  // { u3grid: [cell…], cols: ["44mm", "1fr"], rule: true (the book's table lines), head: [[en, hint, meaning]…],
  //   pair: true (two columns with matching dots between them), mid: true (centre the cells), mkw: mm (the marks' width),
  //   small: true (a little smaller text, for a crowded table), center: true (the columns centred on the page) }
  // A cell is a part or a list of parts, stacked.
  kinds.u3grid = (p) => {
    const cols = p.cols || ["1fr", "1fr"], n = cols.length;
    const tracks = p.pair ? [cols[0], "11mm", ...cols.slice(1)] : cols;
    const out = [];
    if (p.head) p.head.forEach((c, i) => { out.push(`<div class="u3-c u3-h">${headCell(c)}</div>`); if (p.pair && i === 0) out.push(`<div class="u3-c u3-h"></div>`); });
    p.u3grid.forEach((c, i) => {
      const r = Math.floor(i / n), even = r % 2 ? " u3-even" : "";
      out.push(`<div class="u3-c${even}">${part(c)}</div>`);
      if (p.pair && i % n === 0) out.push(`<div class="u3-c u3-pd${even}"><span class="u3-dot"></span><span class="u3-dot"></span></div>`);
    });
    const style = [`grid-template-columns:${tracks.join(" ")}`, p.mkw ? `--u3mk:${p.mkw}mm` : ""].filter(Boolean).join(";");
    return `<div class="u3-grid${p.rule ? " u3-rule" : ""}${p.mid ? " mid" : ""}${p.mkw ? " u3-mkw" : ""}${p.small ? " u3-small" : ""}${p.center ? " ctr" : ""}" style="${style}">${out.join("")}</div>`;
  };

  // { u3count: [{ thing: "pen" | "pencil" | "crayon", n: 75, answer: "75" or "" }] }: things to count, bundled in tens with a
  // band round each bundle and the rest loose (as the book's pens, pencils and crayons on page 46), with the answer box
  const THING = {
    pen: `<svg viewBox="0 0 10 50"><rect x="2" y="0" width="6" height="10" rx="1.5" fill="#1E3A8A"/><rect x="2.4" y="9" width="5.2" height="32" fill="#2563EB"/><rect x="7" y="2" width="1.2" height="12" rx=".6" fill="#93C5FD"/><path d="M2.4 41h5.2L5 50Z" fill="#334155"/></svg>`,
    pencil: `<svg viewBox="0 0 10 50"><rect x="2.2" y="0" width="5.6" height="6" rx="1.4" fill="#F472B6"/><rect x="2.2" y="5.4" width="5.6" height="2.4" fill="#94A3B8"/><rect x="2.2" y="7.6" width="5.6" height="32" fill="#FACC15"/><rect x="4.4" y="7.6" width="1.2" height="32" fill="#EAB308"/><path d="M2.2 39.6h5.6L5 49Z" fill="#FDE6C8"/><path d="M4.1 46h1.8L5 49Z" fill="#334155"/></svg>`,
    crayon: `<svg viewBox="0 0 10 50"><path d="M3 9 5 0l2 9Z" fill="#B91C1C"/><rect x="2" y="9" width="6" height="41" rx="1" fill="#EF4444"/><rect x="2" y="15" width="6" height="2" fill="#7F1D1D"/><rect x="2" y="42" width="6" height="2" fill="#7F1D1D"/></svg>`,
  };
  kinds.u3count = (p) => `<div class="u3-count">${p.u3count.map((r) => {
    const one = THING[r.thing] || THING.pen, tens = Math.floor(r.n / 10), ones = r.n % 10;
    const bundle = (k, band) => `<span class="u3-bun${band ? " band" : ""}">${one.repeat(k)}</span>`;
    return `<div class="u3-cr"><div class="u3-cs">${Array.from({ length: tens }, () => bundle(10, true)).join("")}${ones ? bundle(ones, false) : ""}</div><div class="u3-ca">${r.answer ? `<b data-c>${esc(r.answer)}</b>` : `<span class="wbox"></span>`}</div></div>`;
  }).join("")}</div>`;

  const css = `
.u3-sub { display: flex; gap: 1.8mm; align-items: baseline } .u3-sub.ctr { justify-content: center; text-align: center }
.u3-sb { min-width: 0 }
.u3-st { font: 800 13pt/1.15 'Baloo 2'; color: var(--d) } .u3-mk { font: 800 13pt/1.15 'Baloo 2'; color: #EA580C; flex: none }
.u3-sm { font: 600 8.8pt/1.3 'Noto Sans Bengali'; color: #1D4ED8 }
.u3-sub .guide { font-size: 8.4pt }
.u3-fig { position: relative; flex: none; border-radius: 3.4mm; overflow: hidden; background: #fff; border: .6mm solid color-mix(in srgb, var(--c) 30%, #fff) }
.u3-fig.bare { border: none; border-radius: 0; background: none } .u3-fig.ctr { margin: 0 auto }
.u3-fig img { width: 100%; height: 100%; display: block; object-position: 50% 50% }
.u3-tag { position: absolute; right: 1.2mm; bottom: 1.2mm; font: 700 5.6pt 'Andika'; color: #fff; background: rgba(0,0,0,.45); padding: .1mm 1.2mm; border-radius: 99px }
.u3-grid { display: grid; gap: 2.4mm 3.4mm; align-items: start }
.u3-grid.mid { align-items: center }
.u3-c { min-width: 0; display: flex; flex-direction: column; gap: 2.2mm; align-self: stretch }
.u3-grid:not(.u3-rule) > .u3-c { justify-content: flex-start } .u3-grid.mid:not(.u3-rule) > .u3-c { justify-content: center }
.u3-grid.u3-rule { gap: .35mm; background: color-mix(in srgb, var(--c) 35%, #fff); border: .6mm solid var(--c); border-radius: 3mm; overflow: hidden }
.u3-rule > .u3-c { background: #fff; padding: 1.4mm 2.2mm; justify-content: center }
.u3-rule > .u3-c.u3-even { background: color-mix(in srgb, var(--s) 45%, #fff) }
.u3-rule > .u3-h { background: var(--c); padding: 1.2mm 2.2mm } .u3-h .en { color: #fff; font-size: 11.5pt; text-align: center } .u3-h .guide { text-align: center } .u3-h .guide * { color: #fff !important }
.u3-c.u3-pd { flex-direction: row; justify-content: space-between; align-items: center; padding: 0 1.2mm }
.u3-dot { width: 2.8mm; height: 2.8mm; border-radius: 50%; background: var(--c); flex: none }
.u3-mkw .pl.mk2 .mk { min-width: var(--u3mk); text-align: right }
.u3-grid.ctr { justify-content: center }
.u3-grid.u3-small .en { font-size: 10.6pt } .u3-grid.u3-small .guide { font-size: 7.4pt } .u3-grid.u3-small .lines { gap: 1mm }
.u3-grid.u3-small.u3-rule > .u3-c { padding: 1mm 2mm }
.u3-count { display: flex; flex-direction: column; gap: 2mm; border: .6mm solid var(--c); border-radius: 4mm; padding: 2.4mm 3mm; background: #fff }
.u3-cr { display: grid; grid-template-columns: 1fr 18mm; gap: 3mm; align-items: center }
.u3-cs { display: flex; flex-wrap: wrap; gap: 1.6mm 2.4mm; align-items: flex-end }
.u3-bun { position: relative; display: inline-flex; gap: .2mm } .u3-bun svg { width: 2.3mm; height: 10.5mm; display: block }
.u3-bun.band::after { content: ""; position: absolute; left: -.6mm; right: -.6mm; top: 56%; height: 1.6mm; border-radius: .8mm; background: #A16207; box-shadow: 0 .3mm 0 rgba(0,0,0,.2) }
.u3-ca { height: 14mm; border: .5mm solid var(--c); border-radius: 2.6mm; display: flex; align-items: center; justify-content: center; background: #fff }
.u3-ca b { font: 800 18pt 'Baloo 2'; color: var(--d) } .u3-ca .wbox { border: none; background: none }
/* Unit 3's pages only: a task of two or three lines kept its last English line's descenders on its Bangla meaning, and the
   opener's star sat on the comma of this unit's long title (both are build.js's; tell Claude) */
.page:is([data-page="34"],[data-page="35"],[data-page="36"],[data-page="37"],[data-page="38"],[data-page="39"],[data-page="40"],[data-page="41"],[data-page="42"],[data-page="43"],[data-page="44"],[data-page="45"],[data-page="46"],[data-page="47"]) .tt .tm { margin-top: .7mm }
.page[data-page="34"] .opener .sky path[transform^="translate(120 14)"] { transform: translate(128px, 26px) scale(.4) }
`;
  return { kinds, css };
};
