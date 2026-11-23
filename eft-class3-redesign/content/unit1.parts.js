// Unit 1's own kinds (SPEC section 4), for what parts.js can't do yet. Each composes the shared kinds where it can, so the
// look stays the same; the classes are prefixed u1-. Tell Claude: the first three would serve other units too.
//   u1song:   a song in a card, its stanzas in columns, with a picture filling the foot of a column (page 10)
//   u1beside: a reading text with a picture beside it (page 15). The shared `text` kind's picture is a .pic of 38 mm,
//             which the build's check reports as "squeezed" (under 52 mm), so this one draws its own picture.
//   u1dlg:    a dialogue whose blank-only lines carry no guide (SPEC 3: "a line that is only blanks: no guide"); the
//             shared dialogue always prints a guide, so an empty one would show a lone "·" (page 11)
//             tight: true draws it a little tighter (smaller faces, slimmer cards), for a page of two dialogues (page 11)
//   u1cal:    the shared calendar with taller day cells, to write the numbers in (page 13)
//   u1spot:   a small spot picture on white (a cut-out, no frame, shown whole), to fill the foot of a page (page 5). A
//             .pic would crop it to its frame, and under 52 mm the build reports it as squeezed.
// It also gives the unit's new speakers their colours, only where the build's WHO has none (Claude: these belong in WHO).
module.exports = (H) => {
  const base = require("../parts.js")(H).kinds;
  const COLOURS = { Namira: "#DC2626", Roton: "#0891B2", Salma: "#C026D3", Tanim: "#65A30D", Asif: "#4F46E5", Rina: "#EA580C",
    Zabed: "#0369A1", Sabiha: "#BE185D", Mahmud: "#15803D", Laila: "#A21CAF", Sagor: "#0E7490", Mamun: "#CA8A04" };
  for (const [k, v] of Object.entries(COLOURS)) if (!(k in H.WHO)) H.WHO[k] = v;
  // a picture of our own (not a .pic): the new art, else the stand-in with its tag; pos: the CSS object-position
  const fig = (name, pos) => {
    const f = H.art(name);
    return `<figure class="u1-fig"><img src="file://${f}"${pos ? ` style="object-position:${pos}"` : ""}>${f.includes("/art/new/") ? "" : `<span class="u1-tag">stand-in: the old picture</span>`}</figure>`;
  };
  const EMPTY = H.guide("", "");
  return {
    kinds: {
      // { u1song: { cols: [{ stanzas: [[[en, hint, meaning], …], …], pic: name, pos: "50% 70%" }, …] } }
      u1song: (p) => `<div class="u1-song">${p.cols.map((c) => `<div class="u1-scol">${c.stanzas.map((s) => `<div class="u1-st">${base.lines({ lines: s })}</div>`).join("")}${c.pic ? fig(c.pic, c.pos) : ""}</div>`).join("")}</div>`,
      // { u1beside: { pic: name, side: "left" | "right", w: % of the width, text: [[en, hint, meaning], …] } }
      u1beside: (p) => `<div class="u1-beside${p.side === "right" ? " u1-r" : ""}" style="--u1w:${p.w || 44}%">${fig(p.pic, p.pos)}<div class="u1-bt">${base.text({ text: p.text })}</div></div>`,
      // { u1dlg: [[who, en, hint, meaning], …] }: hint and meaning "" for a line of blanks
      u1dlg: (p) => `<div class="u1-dlg${p.tight ? " u1-tight" : ""}">${H.dialogue(p.u1dlg).split(EMPTY).join("")}</div>`,
      // { u1cal: { title, start, days, show, h: the day cells' height in mm } }
      u1cal: (p) => `<div class="u1-cal" style="--u1h:${p.h || 16}mm">${base.calendar(p)}</div>`,
      // { u1spot: { name, h: its height in mm } }
      u1spot: (p) => { const f = H.art(p.name); return `<div class="u1-spot" style="height:${p.h || 34}mm"><img src="file://${f}">${f.includes("/art/new/") ? "" : `<span class="u1-tag">stand-in: the old picture</span>`}</div>`; },
    },
    css: `
.u1-fig { position: relative; margin: 0; border-radius: 4mm; overflow: hidden; border: 1mm solid #fff; box-shadow: 0 0 0 .8mm var(--c), 0 1.6mm 0 .8mm var(--s); background: #fff }
.u1-fig img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; display: block }
.u1-tag { position: absolute; right: 1.6mm; bottom: 1.6mm; font: 700 6.5pt 'Andika'; color: #fff; background: rgba(0,0,0,.45); padding: .3mm 1.6mm; border-radius: 99px }
.u1-song { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; background: linear-gradient(135deg, #FDF2F8, #EFF6FF); border: .6mm solid #F9A8D4; border-radius: 5mm; padding: 2.6mm 4mm 3mm; position: relative }
.u1-song::before { content: "♪"; position: absolute; right: 3mm; top: .4mm; font: 800 20pt 'Baloo 2'; color: #F472B6; opacity: .5 }
.u1-scol { display: flex; flex-direction: column; gap: 2.6mm; min-height: 0 }
.u1-st { padding-left: 2.6mm; border-left: 1mm solid #F9A8D4 }
.u1-song .en { color: #831843 }
.u1-scol .u1-fig { flex: 1 1 0; min-height: 26mm }
.u1-beside { display: grid; grid-template-columns: var(--u1w) 1fr; gap: 3.4mm; align-items: stretch }
.u1-beside.u1-r { grid-template-columns: 1fr var(--u1w) } .u1-beside.u1-r .u1-fig { order: 2 }
.u1-beside .u1-fig { min-height: 52mm }
.u1-bt { display: flex; flex-direction: column; justify-content: center }
.u1-cal .cd { height: var(--u1h) }
.u1-tight .dlg { gap: 1mm }
.u1-tight .av { width: 11.4mm }
.u1-tight .fc { width: 7.6mm; height: 7.6mm; font-size: 10.5pt; line-height: 7.8mm }
.u1-tight .card { padding: .7mm 2.8mm .8mm }
.u1-spot { position: relative; flex: none; display: flex; justify-content: center }
.u1-spot img { height: 100%; width: auto; max-width: 100%; object-fit: contain; border-radius: 6mm }
.u1-spot .u1-tag { right: auto; left: 50%; transform: translateX(-50%) }
`,
  };
};
