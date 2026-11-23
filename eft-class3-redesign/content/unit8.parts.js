// Unit 8's own kinds (SPEC section 4). Most are Unit 5's and Unit 6's kinds under Unit 8's names (their CSS is included),
// so the look stays the same; the few new ones use classes starting with u8-. The book prints the festival names in
// italics (Phool Biju, Mulbiju, Gajjya Pajjya): every kind here sets them in italics in the book's English (data-c) text.
// - u8beside: Unit 5's u5beside: a reading text (or any part) with a picture beside it (the story told picture by picture).
// - u8wrap:   Unit 5's u5wrap: any part, with ucaps / ubold / ulook ("plain", "flow", "tight", "small", "chips"…).
// - u8read:   Unit 6's u6read: a reading text in paragraphs, in one card.
// - u8rows:   Unit 6's u6rows: a row per sentence with a line to write on at its right (True or False).
// - u8table:  Unit 6's u6table: a table with empty rows to write in (" ").
// - u8match:  Unit 6's u6match: match, the guide under a long phrase (under: true).
// - u8pic:    a wide picture across the page at a set height (h: mm), trimmed to its middle (pos).
// - u8head:   Unit 5's u5head: a centred heading with its guide ("The End").
// - u8choose: the tick choices with a question AND its sentence to complete under it (the book's "The grasshopper is
//             ______ ." between the question and the options): [{ q: [mark, en, hint, meaning], stem: [en, hint, meaning],
//             options: [[mark, en, hint, meaning], …] }]; ulook: Unit 5's looks ("flow opts3"…).
// - u8words:  a word box with the book's label before it ("Words/phrases:"): { label: [en, meaning], words: [[en, hint, meaning]] }
module.exports = (H) => {
  const { esc, en, guide } = H;
  const base = require("../parts.js")(H).kinds;
  const u5 = require("./unit5.parts.js")(H), u6 = require("./unit6.parts.js")(H);
  const g = (h, m) => (h || m ? guide(h || "", m || "") : "");
  // the festival names in italics, only in the book's English (the text right after an element marked data-c)
  const NAMES = /Phool Biju|Mulbiju|Phulbiju|Gajjya Pajjya/g;
  const ital = (html) => html.replace(/(<[a-z]+\b[^>]*\sdata-c\b[^>]*>)([^<]+)/g, (m, t, txt) => t + txt.replace(NAMES, `<i class="u8-it">$&</i>`));
  const looks = (l) => (l || "").split(" ").filter(Boolean).map((c) => " u5-" + c).join("");
  // a line as parts.js draws one: [mark, en, hint, meaning] or [en, hint, meaning]
  const pl = (l) => {
    const [mk, e, h, m] = l.length === 4 ? l : [null, ...l];
    return `<div class="pl${mk != null ? " mk2" : ""}">${mk != null ? `<span class="mk" data-c>${esc(mk)}</span>` : ""}<div><div class="en" data-c>${en(e)}</div>${g(h, m)}</div></div>`;
  };
  const kinds = {
    u8beside: (p) => ital(u5.kinds.u5beside(p)),
    // a part of Unit 5's or the shared kinds goes through u5wrap (ucaps, ubold, ulook); any other (u8read…) gets the looks only
    u8wrap: (p) => {
      const inner = p.u8wrap, k = Object.keys(inner).find((x) => x in base || x in u5.kinds);
      const own = p.u8look ? (h) => `<div class="${p.u8look.split(" ").map((c) => "u8-" + c).join(" ")}">${h}</div>` : (h) => h;
      if (k) return own(ital(u5.kinds.u5wrap({ ...p, u5wrap: inner })));
      const k2 = Object.keys(kinds).find((x) => x in inner), v = inner[k2];
      return own(`<div class="u5-wrap${looks(p.ulook)}">${kinds[k2](v && typeof v === "object" && !Array.isArray(v) ? { ...inner, ...v } : inner)}</div>`);
    },
    u8read: (p) => ital(u6.kinds.u6read({ u6read: p.u8read })),
    u8rows: (p) => ital(u6.kinds.u6rows({ ...p, u6rows: p.u8rows })),
    u8table: (p) => u6.kinds.u6table(p),
    // aw: column A's width (%); small: a little smaller type, for the most crowded page
    u8match: (p) => `<div class="u8-mc${p.small ? " u8-ms" : ""}" style="--u8a:${p.aw || 44}%">${ital(base.match(p))}</div>`,
    // a wide picture across the page at a set height, trimmed to its middle (pos: the CSS object-position), in Unit 5's frame
    u8pic: (p) => { const f = H.art(p.u8pic); return `<figure class="u5-fig u8-pic" style="height:${p.h}mm"><img src="file://${f}" style="object-position:${p.pos || "50% 50%"}">${f.includes("/art/new/") ? "" : `<span class="u5-tag">stand-in: the old picture</span>`}</figure>`; },
    u8head: (p) => u5.kinds.u5head({ u5head: p.u8head }),
    u8choose: (p) => `<div class="u5-wrap u8-ch${looks(p.ulook)}">${p.u8choose.map((c) => `<div class="choose"><div class="q1">${pl(c.q)}${c.stem ? `<div class="u8-stem">${pl(c.stem)}</div>` : ""}</div>
      <div class="opts inline">${c.options.map(([mk, e, h, m]) => `<div class="opt"><span class="tick"></span><span class="mk" data-c>${esc(mk)}</span><div><div class="en" data-c>${en(e)}</div>${g(h, m)}</div></div>`).join("")}</div></div>`).join("")}</div>`,
    u8words: (p) => `<div class="u8-words${looks(p.ulook)}">${base.words({ words: p.words }).replace('<div class="wordbox">', `<div class="wordbox"><span class="u8-wl"><b data-c>${en(p.label[0])}</b><i>${esc(p.label[1])}</i></span>`)}</div>`,
  };
  const css = `${u5.css}${u6.css}
.u8-it { font-style: italic }
.u8-stem { padding-left: 7.4mm; margin-top: .4mm }
.u8-ch .choose + .choose { margin-top: 1.6mm }
.u8-words .wordbox { align-items: center; gap: 1.2mm 1.6mm; padding: 1.6mm 2mm } .u8-words .wb { padding: .5mm 1.8mm } .u8-words .wb b { font-size: 11pt } .u8-words .wb small { font-size: 7pt }
.u8-wl { display: inline-flex; flex-direction: column; align-items: flex-start; margin-right: 1mm } .u8-wl b { font: 700 11.5pt 'Andika'; color: var(--d) } .u8-wl i { font: 600 8pt 'Noto Sans Bengali'; font-style: normal; color: #1D4ED8 }
.u8-lowbox .box { height: 5.6mm; vertical-align: -1.2mm }
.u8-mc .match { grid-template-columns: var(--u8a) 9mm 1fr }
.u8-mc .mcol { gap: .9mm; justify-content: space-between }
.u8-mc .mh { display: flex; align-items: baseline; gap: 2mm; padding: 0 2mm } .u8-mc .mh .en { font-size: 11.5pt }
.u8-mc .mi { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 2mm; row-gap: 0; padding: .6mm 6mm .7mm 2.2mm; min-height: 0 }
.u8-mc .mi[data-r] { padding: .6mm 2.2mm .7mm 6mm }
.u8-mc .mi .en { font-size: 11pt; line-height: 1.2 } .u8-mc .mi .guide { font-size: 7.2pt; line-height: 1.25 }
.u8-mc .mi > .dot { position: absolute; top: 50%; margin-top: -1.3mm } .u8-mc .mi[data-l] > .dot { right: 2mm } .u8-mc .mi[data-r] > .dot { left: 2mm }
.u8-ms .mcol { gap: .6mm } .u8-ms .mi { padding-top: .3mm; padding-bottom: .4mm } .u8-ms .mi .en { font-size: 10.6pt; line-height: 1.15 } .u8-ms .mi .guide { font-size: 7pt; line-height: 1.2 }
.u8-tall .u6-blank { height: 14mm }
.u8-pic { flex: none }
`;
  return { kinds, css, script: u5.script };
};
