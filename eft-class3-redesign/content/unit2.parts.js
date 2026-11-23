// Unit 2's own kinds (SPEC section 4), for what parts.js can't do yet. They compose the shared kinds where they can, so
// the look stays the same; the classes are prefixed u2-. Tell Claude: u2beside, u2tick and u2count would serve other units.
//   u2beside: a picture beside other parts, filling their height (page 26: the family beside the reading text; page 32:
//             the turtle beside its shell). The shared `text` kind's picture is a .pic of 38 mm, which the build's check
//             reports as "squeezed" (under 52 mm), so this one draws its own picture (as Unit 1's u1beside does).
//   u2count:  the shared `count`, with three more things to count: ladybirds, tennis balls and beach balls (page 31)
//   u2stones: the stepping stones across the frogs' pond, to write 31 to 50 on (page 24)
//   u2match:  the shared match with each phrase's guide under it (the shared one sets it beside; page 27's phrases are long)
//   u2tf:     the shared items, with a True/False blank drawn as a small box (page 26)
//   u2tick:   sentences with the book's "(teacher/banker)" choices, each choice with a box to tick (pages 27, 30)
//   u2rings:  numbers in white circles, to colour (page 32)
//   u2shell:  the turtle's shell plates, to write the even numbers on (page 32)
// And a style for the shared `lines` kind: style "song u2-down" with cols: 2 reads each column downwards (the shared
// .c2 grid fills row by row), with the title across both columns (page 28's rhyme).
// It also gives the unit's new speakers their colours, only where the build's WHO has none (Claude: these belong in WHO).
module.exports = (H) => {
  const { esc, en, guide } = H;
  const base = require("../parts.js")(H).kinds;
  const COLOURS = { Rishat: "#047857", Sujana: "#6D28D9", Farzana: "#4338CA" };
  for (const [k, v] of Object.entries(COLOURS)) if (!(k in H.WHO)) H.WHO[k] = v;

  // a picture of our own (not a .pic): the new art, else the stand-in with its tag; outline: line art to colour
  // pos: the CSS object-position; oldPos: the stand-in's, until the new picture is there
  const fig = (name, o = {}) => {
    const f = H.art(name), pos = f.includes("/art/new/") ? o.pos : o.oldPos || o.pos;
    return `<figure class="u2-fig${o.outline ? " u2-out" : ""}"><img src="file://${f}"${pos ? ` style="object-position:${pos}"` : ""}>${f.includes("/art/new/") ? "" : `<span class="u2-tag">stand-in${o.short ? "" : ": the old picture"}</span>`}</figure>`;
  };
  // one part, as build.js renders it (the shared kinds and these), for the kinds that hold other parts
  const one = (p) => {
    const K = { ...base, ...kinds }, k = Object.keys(K).find((x) => x in p);
    if (!k) throw new Error("unknown part: " + JSON.stringify(p).slice(0, 80));
    const v = p[k], q = v && typeof v === "object" && !Array.isArray(v) && k !== "note" ? { ...p, ...v } : p, h = K[k](q);
    return p.nocheck ? h.replace(/ data-c/g, " data-x") : h;
  };

  // the things to count, drawn over the shared kind's dots (it marks each with a colour we name here)
  const THINGS = {
    bug: `<svg viewBox="0 0 10 10"><path d="M5 1.2v1.4" stroke="#111" stroke-width=".5"/><circle cx="5" cy="5.8" r="3.9" fill="#DC2626" stroke="#7F1D1D" stroke-width=".35"/><path d="M5 2.1a1.9 1.6 0 0 1 1.9 1.6H3.1A1.9 1.6 0 0 1 5 2.1Z" fill="#111"/><path d="M5 3.7v6" stroke="#111" stroke-width=".4"/><circle cx="3.2" cy="5.2" r=".75" fill="#111"/><circle cx="6.8" cy="5.2" r=".75" fill="#111"/><circle cx="3.4" cy="7.6" r=".65" fill="#111"/><circle cx="6.6" cy="7.6" r=".65" fill="#111"/></svg>`,
    tennis: `<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.3" fill="#FDE047" stroke="#CA8A04" stroke-width=".35"/><path d="M1.9 2.2c2.1 1.3 2.1 4.3 0 5.6M8.1 2.2c-2.1 1.3-2.1 4.3 0 5.6" fill="none" stroke="#fff" stroke-width=".7"/></svg>`,
    beach: `<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.3" fill="#fff"/><path d="M5 .7A4.3 4.3 0 0 1 9.3 5H5Z" fill="#EF4444"/><path d="M5 5V9.3A4.3 4.3 0 0 1 .7 5Z" fill="#3B82F6"/><path d="M9.3 5A4.3 4.3 0 0 1 5 9.3V5Z" fill="#FACC15"/><circle cx="5" cy="5" r="4.3" fill="none" stroke="#64748B" stroke-width=".35"/><circle cx="5" cy="5" r=".8" fill="#fff" stroke="#64748B" stroke-width=".25"/></svg>`,
  };
  const STONE = ["#FDBA74", "#FDE047", "#FEF3C7"]; // orange, yellow and cream, as the book's stones

  const kinds = {
    // { u2beside: { pic, side: "left" | "right", w: % of the width, pos, oldPos, outline, parts: [part, …] } }
    u2beside: (p) => `<div class="u2-beside${p.side === "right" ? " u2-r" : ""}" style="--u2w:${p.w || 42}%">${fig(p.pic, p)}<div class="u2-bt">${p.parts.map(one).join("")}</div></div>`,
    // { u2match: { a, b, left, right, done } }: the shared match, each phrase's guide under it, not beside it (page 27)
    u2match: (p) => `<div class="u2-match">${base.match(p)}</div>`,
    // { u2tf: [[mark, en, hint, meaning], …], cols }: the shared items, with the book's blank as a small box for one letter,
    // T or F (the underscores stay as printed; only the box is narrower; page 26)
    u2tf: (p) => `<div class="u2-tf">${base.items({ items: p.u2tf, cols: p.cols })}</div>`,
    // { u2count: [{ thing: "bug" | "tennis" | "beach", n, answer }] }: the shared count's rows, with these things in them
    u2count: (p) => {
      const html = base.count({ count: p.u2count.map((r) => ({ shape: "dot", color: "#u2" + r.thing, n: r.n, answer: r.answer })) });
      return html.replace(/<svg\b(?:(?!<\/svg>)[\s\S])*?fill="#u2(\w+)"(?:(?!<\/svg>)[\s\S])*?<\/svg>/g, (m, t) => THINGS[t] || m);
    },
    // { u2stones: { from: 31, to: 50, show: [31, 50], cols: 4, h: mm, start: frog picture, end: frog picture } }:
    // the stones snake from the top left, row by row, to the bottom right
    u2stones: (p) => {
      const n = p.to - p.from + 1, cols = p.cols || 4, rows = Math.ceil(n / cols), pos = [];
      for (let i = 0; i < n; i++) {
        const r = Math.floor(i / cols), c = r % 2 ? cols - 1 - (i % cols) : i % cols;
        pos.push([24 + c * (51 / (cols - 1)) + (r % 2 ? -2.4 : 2.4), 12 + r * (76 / (rows - 1))]);
      }
      const path = pos.map(([x, y]) => `${x},${y}`).join(" ");
      const stones = pos.map(([x, y], i) => {
        const v = p.from + i, shown = (p.show || []).includes(v);
        return `<div class="u2-stone" style="left:${x}%;top:${y}%;--u2s:${STONE[i % 3]}">${shown ? `<b data-c>${v}</b>` : `<i></i>`}</div>`;
      }).join("");
      const ripples = [[10, 44, 9], [88, 30, 7], [52, 61, 8], [12, 80, 6], [70, 96, 9], [36, 22, 6]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r / 3.2}"/>`).join("");
      return `<div class="u2-pond" style="height:${p.h || 112}mm">
        <svg class="u2-water" viewBox="0 0 100 100" preserveAspectRatio="none"><g fill="none" stroke="#fff" stroke-width=".5" opacity=".55">${ripples}</g>
          <polyline points="${path}" fill="none" stroke="#fff" stroke-width="1.1" stroke-dasharray="2 2.2" stroke-linecap="round" opacity=".8"/></svg>
        ${p.start ? `<div class="u2-frog u2-f1">${fig(p.start, { short: true })}</div>` : ""}${p.end ? `<div class="u2-frog u2-f2">${fig(p.end, { short: true })}</div>` : ""}
        ${stones}</div>`;
    },
    // { u2tick: [[mark, en, hint, meaning], …] }: the "(a/b)" in each sentence gets a box to tick before each choice
    u2tick: (p) => `<div class="u2-tick">${p.u2tick.map(([mk, e, h, m]) => `<div class="u2-ti"><span class="u2-mk" data-c>${esc(mk)}</span><div><div class="en" data-c>${en(e).replace(/\(([^()<>]*\/[^()<>]*)\)/g, (x, opts) => `(${opts.split("/").map((o) => `<span class="u2-op"><span class="u2-tb"></span>${o}</span>`).join("/")})`)}</div>${guide(h, m)}</div></div>`).join("")}</div>`,
    // { u2rings: ["62", …], cols: 5 }: numbers in white circles, to colour
    u2rings: (p) => `<div class="u2-rings" style="grid-template-columns:repeat(${p.cols || 5},1fr)">${p.u2rings.map((n) => `<span class="u2-ring"><b data-c>${esc(n)}</b></span>`).join("")}</div>`,
    // { u2shell: ["52", "", …], cols: 5 }: the turtle's shell plates, a number printed or a plate to write on
    u2shell: (p) => `<div class="u2-shell" style="grid-template-columns:repeat(${p.cols || 5},auto)">${p.u2shell.map((n) => `<span class="u2-plate">${n ? `<b data-c>${esc(n)}</b>` : ""}</span>`).join("")}</div>`,
  };

  const css = `
.u2-fig { position: relative; margin: 0; border-radius: 4mm; overflow: hidden; border: 1mm solid #fff; box-shadow: 0 0 0 .8mm var(--c), 0 1.6mm 0 .8mm var(--s); background: #fff }
.u2-fig img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; display: block }
.u2-fig.u2-out { box-shadow: none; border: .6mm dashed color-mix(in srgb, var(--c) 55%, #fff) } .u2-fig.u2-out img { object-fit: contain; padding: 2mm }
.u2-tag { position: absolute; right: 1.6mm; bottom: 1.6mm; font: 700 6.5pt 'Andika'; color: #fff; background: rgba(0,0,0,.45); padding: .3mm 1.6mm; border-radius: 99px; white-space: nowrap }
.u2-beside { display: grid; grid-template-columns: var(--u2w) 1fr; gap: 3.4mm; align-items: stretch }
.u2-beside.u2-r { grid-template-columns: 1fr var(--u2w) } .u2-beside.u2-r .u2-fig { order: 2 }
.u2-beside > .u2-fig { min-height: 52mm }
.u2-bt { display: flex; flex-direction: column; justify-content: center; gap: 2mm; min-width: 0 }
.lines.u2-down.c2 { grid-auto-flow: column; grid-template-rows: repeat(7, auto) } .lines.u2-down .ltitle { grid-column: 1 / -1; text-align: center }
.u2-pond { position: relative; border-radius: 5mm; overflow: hidden; border: 1mm solid #fff; box-shadow: 0 0 0 .8mm var(--c), 0 2mm 0 .8mm var(--s);
  background: radial-gradient(ellipse at 30% 20%, #BAE6FD, transparent 55%), linear-gradient(180deg, #7DD3FC, #38BDF8 45%, #0EA5E9) }
.u2-pond::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 7mm; background: radial-gradient(circle at 6mm 7mm, #16A34A 5mm, transparent 5.2mm) 0 0 / 11mm 7mm repeat-x, radial-gradient(circle at 3mm 1mm, #F472B6 1.2mm, transparent 1.4mm) 0 0 / 17mm 7mm repeat-x; opacity: .9 }
.u2-water { position: absolute; inset: 0; width: 100%; height: 100% }
.u2-stone { position: absolute; width: 25mm; height: 14.5mm; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(ellipse at 40% 30%, #fff8, transparent 60%), var(--u2s);
  box-shadow: inset 0 -1.6mm 0 color-mix(in srgb, var(--u2s) 70%, #92400E), 0 1mm 0 rgba(12,74,110,.35); display: flex; align-items: center; justify-content: center }
.u2-stone b { font: 800 16pt/1 'Baloo 2'; color: #1E2433; margin-top: -1mm } .u2-stone i { width: 15mm; height: 7.6mm; border-radius: 50%; border: .4mm dashed rgba(120,53,15,.45); background: rgba(255,255,255,.55); margin-top: -1mm }
.u2-frog { position: absolute; width: 27mm; height: 27mm } .u2-f1 { left: 2%; top: 3% } .u2-f2 { right: 1.5%; bottom: 20% }
.u2-frog .u2-fig { width: 100%; height: 100%; border-radius: 50%; box-shadow: 0 0 0 .8mm #fff, 0 1.2mm 0 .8mm rgba(12,74,110,.3); border: none }
.u2-frog .u2-tag { right: 50%; transform: translateX(50%); bottom: .8mm; font-size: 5.5pt }
.u2-match .mi { display: grid; column-gap: 1.6mm; row-gap: 0; align-items: center; padding: .8mm 2.4mm }
.u2-match .mi[data-l] { grid-template-columns: 1fr auto } .u2-match .mi[data-l] .dot { grid-column: 2; grid-row: 1 / span 2 }
.u2-match .mi[data-r] { grid-template-columns: auto 1fr } .u2-match .mi[data-r] .dot { grid-column: 1; grid-row: 1 / span 2 }
.u2-match .mi .guide { font-size: 7.8pt; line-height: 1.3 }
.u2-tf .box { width: 10mm !important }
.u2-tick { display: flex; flex-direction: column; gap: 1.6mm; padding-left: 2mm }
.u2-ti { display: grid; grid-template-columns: 6mm 1fr; column-gap: 1.6mm; align-items: start }
.u2-mk { font: 800 12.5pt/1.3 'Baloo 2'; color: #EA580C }
.u2-op { white-space: nowrap } .u2-tb { display: inline-block; width: 4.2mm; height: 4.2mm; border: .45mm solid #F59E0B; border-radius: 1mm; background: #fff; margin: 0 .9mm 0 .5mm; vertical-align: -.5mm }
.u2-rings { display: grid; gap: 2.4mm 4mm; justify-items: center; padding: 1mm 6mm }
.u2-ring { width: 14mm; height: 14mm; border-radius: 50%; border: .6mm solid #334155; background: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 .8mm 0 #CBD5E1 }
.u2-ring b { font: 800 16pt/1 'Baloo 2'; color: #fff; -webkit-text-stroke: .35mm #1E2433; paint-order: stroke fill; margin-top: .6mm }
.u2-shell { display: grid; gap: 1.6mm 2mm; justify-content: center }
.u2-plate { width: 15mm; height: 13mm; clip-path: polygon(25% 2%, 75% 2%, 100% 50%, 75% 98%, 25% 98%, 0 50%); background: #15803D; display: flex; align-items: center; justify-content: center; position: relative }
.u2-plate::before { content: ""; position: absolute; inset: .7mm; clip-path: inherit; background: #F0FDF4 }
.u2-plate b { position: relative; font: 800 14pt/1 'Baloo 2'; color: #166534; margin-top: .6mm }
`;
  return { kinds, css };
};
