// Unit 7's own kinds (SPEC section 4). Most are the earlier units' kinds under Unit 7's names (their CSS comes along);
// the new classes start with u7-.
//   u7rows, u7read, u7match, u7ans:  Unit 6's u6rows, u6read, u6match, u6ans (True/False pills, answer lines, a reading
//                                    text in paragraphs, a match with its columns spread out)
//   u7jumble: u6rows for the jumbled letters of page 103, which the book prints with a space between the letters
//   u7wrap, u7head:  Unit 5's u5wrap (bold labels, plain or small look) and u5head (the rhyme's name under the title)
//   u7song:   Unit 1's u1song (stanzas in columns, a picture at the foot of a column) with the song's title over both
//             columns (page 107)
//   u7box:    an empty box to draw in (page 108: "Draw a rainbow")
//   u7dlg:    a dialogue set as the book sets it inside a reading text: the speaker's name in their colour, a colon, the
//             line, its guide beside it when there's room (page 98)
//   u7look:   any part (shared or Unit 7's) with Unit 5's looks: { u7look: <a part>, ulook: "flow tight small …" }; a
//             look named u7-… is Unit 7's own: "u7-gap" spaces a choice's questions apart (page 105)
// It also gives the unit's two speakers, Shihab and Kaniz, their colours, only where the build's WHO has none.
module.exports = (H) => {
  const u1 = require("./unit1.parts.js")(H), u5 = require("./unit5.parts.js")(H), u6 = require("./unit6.parts.js")(H);
  const COLOURS = { Shihab: "#1D4ED8", Kaniz: "#BE123C" };
  for (const [k, v] of Object.entries(COLOURS)) if (!(k in H.WHO)) H.WHO[k] = v;
  // a borrowed list kind reads its list under its own name
  const as = (fn, theirs, ours) => (p) => fn({ ...p, [theirs]: p[ours] });
  const base = require("../parts.js")(H).kinds;
  let own = {};
  // a part inside one of ours, rendered as build.js renders a part (an object kind's options merged in)
  const render = (part) => {
    const all = { ...base, ...own }, k = Object.keys(all).find((x) => x in part);
    if (!k) throw new Error("u7: unknown part " + JSON.stringify(part).slice(0, 80));
    const v = part[k], q = v && typeof v === "object" && !Array.isArray(v) && k !== "note" ? { ...part, ...v } : part;
    return all[k](q);
  };
  own = {
      u7rows: as(u6.kinds.u6rows, "u6rows", "u7rows"),
      u7read: as(u6.kinds.u6read, "u6read", "u7read"),
      u7ans: as(u6.kinds.u6ans, "u6ans", "u7ans"),
      u7match: (p) => u6.kinds.u6match(p),
      // { u7jumble: [["", "P a l t n"], …], rw: the line's width in mm }
      u7jumble: (p) => `<div class="u7-jumble">${u6.kinds.u6rows({ ...p, u6rows: p.u7jumble, right: "line" })}</div>`,
      u7wrap: as(u5.kinds.u5wrap, "u5wrap", "u7wrap"),
      u7head: as(u5.kinds.u5head, "u5head", "u7head"),
      // { u7song: { title: [en, hint, meaning], cols: [{ stanzas, pic, pos }, …] } }
      u7song: (p) => u1.kinds.u1song(p).replace(`<div class="u1-song">`, `<div class="u1-song u7-song"><div class="u7-stitle"><div class="ltitle" data-c>${H.en(p.title[0])}</div>${H.guide(p.title[1], p.title[2])}</div>`),
      // { u7box: { h: mm } }
      u7box: (p) => `<div class="u7-box" style="height:${p.h || 60}mm"><span>🌈</span><span>✏️</span></div>`,
      // { u7dlg: [[who, en, hint, meaning], …] }
      u7dlg: (p) => `<div class="u7-dlg">${p.u7dlg.map(([w, e, h, m]) => `<div class="u7-dl" style="--w:${H.WHO[w] || H.INK}"><b class="u7-who" data-c>${H.esc(w)}</b><span class="u7-col">:</span><div class="u7-said"><span class="en" data-c>${H.en(e)}</span>${H.guide(h, m)}</div></div>`).join("")}</div>`,
      // { u7look: <a part>, ulook: "flow tight …" }
      u7look: (p) => `<div class="u5-wrap${(p.ulook || "").split(" ").filter(Boolean).map((c) => (c.startsWith("u7-") ? " " : " u5-") + c).join("")}">${render(p.u7look)}</div>`,
  };
  return {
    kinds: own,
    css: u1.css + u5.css + u6.css + `
.u7-jumble .u6-rows { padding-left: 4mm }
.u7-jumble .u6-row { grid-template-columns: 0 40mm 1fr; column-gap: 3mm; padding: .6mm 2mm }
.u7-jumble .en { font: 400 15pt/1.3 'Andika'; word-spacing: 1.6mm; color: var(--d) }
.u7-song .u7-stitle { grid-column: 1 / -1; text-align: center; margin-bottom: -1.4mm }
.u7-song .u7-stitle .ltitle { font-size: 15pt; color: #9D174D }
.u7-box { position: relative; background: #fff; border: .7mm dashed var(--c); border-radius: 5mm; box-shadow: 0 1mm 0 var(--s) }
.u7-box span { position: absolute; bottom: 2mm; font-family: 'Noto Color Emoji'; font-size: 14pt; opacity: .5 }
.u7-dlg { display: flex; flex-direction: column; gap: .4mm; background: #fff; border: .5mm solid color-mix(in srgb, var(--c) 35%, #fff); border-radius: 4mm; padding: 1.2mm 3.4mm }
.u7-dl { display: grid; grid-template-columns: 14mm 3mm 1fr; align-items: baseline; line-height: 1.12 } .u7-said .guide { margin: 0 }
.u7-who { font: 700 11pt 'Andika'; color: var(--w) } .u7-col { font: 700 11pt 'Andika'; color: #94A3B8 }
.u7-said .en { display: inline; margin-right: 2mm } .u7-said .guide { display: inline-block }
.u7-gap .choose + .choose { margin-top: 2.6mm } .u7-gap .opts.inline { grid-template-columns: repeat(3, 1fr) } .u7-gap .opt .guide { font-size: 7.4pt }
.u7-jumble .u6-rows { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2mm 6mm }
.u7-box span:first-child { left: 3mm } .u7-box span:last-child { right: 3mm }
`,
  };
};
