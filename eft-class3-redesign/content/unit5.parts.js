// Unit 5's own kinds (SPEC section 4), for what parts.js can't do yet. Each composes the shared kinds where it can, so the
// look stays the same; the classes are prefixed u5-. Tell Claude: u5beside, u5tf and u5wrap's ucaps and "flow" would
// serve other units too (Unit 5's pages are crowded: two reading texts, a grammar box and a dozen questions on a page).
//   u5wrap:   any shared part, with
//             - ucaps: ["Sunday", …]: the capitals the book colours, only those words' first letters (the shared text's
//               caps: true colours every capital);
//             - ubold: ["Example:", …]: labels in bold;
//             - ulook: "plain" (regular weight, as the book's grammar boxes), "tight" (a reading text set compactly),
//               "flow" (each line's guide follows its English on the same line when there's room: items, questions,
//               a choice's question, the sentences of a short text), "flowopts" (the same for a choice's options),
//               "cells" (a table's words with their guide on one line), "chips" (a word box's guide beside each word),
//               "opts3" (a choice's three options in three tighter columns) and "small" (a little smaller type, for
//               the most crowded page).
//             Its options are named apart from the part's own, because build.js merges the part's options in.
//   u5beside: a reading text (or any part) with a picture beside it. The shared `text` kind's picture is a .pic of 38 mm,
//             which the build's check reports as "squeezed" (under 52 mm), so this one draws its own picture.
//   u5tf:     True or False: each sentence with its guide on one line, and the book's blank (the run of underscores at
//             the end of the line) as a box on the right
//   u5label:  a picture with label lines that lead to boxes to write in (the parts of a tree, page 74)
//   u5circle: the word circle of the sentence game, with the done example under it (page 70)
//   u5head:   a centred heading with its guide (the rhyme's name under the lesson title, page 81)
const fs = require("fs");
module.exports = (H) => {
  const base = require("../parts.js")(H).kinds;
  let own = {};
  // a part inside one of ours, rendered as build.js renders a part (an object kind's options merged in)
  const render = (part) => {
    const all = { ...base, ...own }, k = Object.keys(all).find((x) => x in part);
    if (!k) throw new Error("u5: unknown part " + JSON.stringify(part).slice(0, 80));
    const v = part[k], q = v && typeof v === "object" && !Array.isArray(v) && k !== "note" ? { ...part, ...v } : part;
    return all[k](q);
  };
  const tag = (f) => (f.includes("/art/new/") ? "" : `<span class="u5-tag">stand-in: the old picture</span>`);
  // a picture of our own (not a .pic): the new art, else the stand-in with its tag; pos: the CSS object-position
  const fig = (name, pos) => { const f = H.art(name); return `<figure class="u5-fig"><img src="file://${f}"${pos ? ` style="object-position:${pos}"` : ""}>${tag(f)}</figure>`; };
  // a picture's width and height (a PNG's header, or a JPEG's frame marker), for a picture drawn at its own shape
  const size = (f) => { try { const b = fs.readFileSync(f); if (b.toString("ascii", 1, 4) === "PNG") return [b.readUInt32BE(16), b.readUInt32BE(20)];
    for (let i = 2; i < b.length - 9 && b[i] === 0xff; i += 2 + b.readUInt16BE(i + 2)) if (b[i + 1] >= 0xc0 && b[i + 1] <= 0xc3) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
  } catch (e) {} return [3, 2]; };
  // the book's English only: the text right after an element marked data-c, up to the next tag
  const inEnglish = (html, f) => html.replace(/(<[a-z]+\b[^>]*\sdata-c\b[^>]*>)([^<]+)/g, (m, t, txt) => t + f(txt));
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // a part whose title is [en, hint, meaning] (the shared lines kind prints a title's English only): its guide under it
  const titled = (part) => { const t = part.title, h = render(part); return t && t.length === 3 ? h.replace(/(<div class="ltitle" data-c>[\s\S]*?<\/div>)/, `$1${H.guide(t[1], t[2])}`) : h; };
  const TILES = ["#FDBA74", "#FDA4AF", "#C4B5FD", "#93C5FD", "#FDE68A", "#86EFAC", "#F9A8D4", "#A5B4FC"];
  const tile = ([e, h, m], i) => `<span class="u5-tile" style="--u5k:${TILES[i % TILES.length]}"><b data-c>${H.esc(e)}</b>${h || m ? `<small>${H.hint(h, m)}${m ? ` · <i>${H.esc(m)}</i>` : ""}</small>` : ""}</span>`;
  own = {
    // { u5wrap: <a part>, ucaps: [words], ubold: [phrases], ulook: "plain flow …" }
    u5wrap: (p) => {
      let h = render(p.u5wrap);
      if (Array.isArray(p.ucaps)) { const re = new RegExp(`(^|[^A-Za-z’'])(${p.ucaps.map(reEsc).join("|")})(?![A-Za-z])`, "g"); h = inEnglish(h, (t) => t.replace(re, (m, b, w) => `${b}<b class="u5-cap">${w[0]}</b>${w.slice(1)}`)); }
      if (Array.isArray(p.ubold)) { const re = new RegExp(`(${p.ubold.map((s) => reEsc(H.esc(s))).join("|")})`, "g"); h = inEnglish(h, (t) => t.replace(re, `<b class="u5-b">$1</b>`)); }
      return `<div class="u5-wrap${(p.ulook || "").split(" ").filter(Boolean).map((c) => " u5-" + c).join("")}">${h}</div>`;
    },
    // { u5beside: { pic, side: "left" | "right", w: % of the width, h: the least height in mm, pos, look: "tight",
    //   text: [[en, hint, meaning], …] | part: {…} } }
    u5beside: (p) => `<div class="u5-beside${p.side === "right" ? " u5-r" : ""}${p.look ? " u5-" + p.look : ""}" style="--u5w:${p.w || 40}%;--u5h:${p.h || 40}mm">${fig(p.pic, p.pos)}<div class="u5-bt">${p.text ? base.text({ text: p.text }) : titled(p.part)}</div></div>`,
    // { u5tf: [[mark, en, hint, meaning], …] }
    u5tf: (p) => `<div class="u5-tf">${p.u5tf.map(([mk, e, h, m]) => {
      const b = /\s*_{3,}\s*$/.exec(e), s = b ? e.slice(0, b.index) : e;
      return `<div class="u5-tfr"><span class="mk" data-c>${H.esc(mk)}</span><div class="u5-tfs"><span class="en" data-c>${H.en(s)}</span>${H.guide(h, m)}</div>${b ? `<span class="box u5-tfb"></span>` : ""}</div>`;
    }).join("")}</div>`,
    // { u5label: { pic, h: mm, at: [[x%, y%, box y%], …]: where each line starts on the picture, and where its box is } }
    u5label: (p) => {
      const f = H.art(p.pic), [w, h] = size(f);
      return `<div class="u5-label" style="height:${p.h}mm"><div class="u5-lpic" style="aspect-ratio:${w}/${h}"><img src="file://${f}">${tag(f)}${p.at.map(([x, y], i) => `<i class="u5-ldot" data-i="${i}" style="left:${x}%;top:${y}%"></i>`).join("")}</div>
        <div class="u5-lcol">${p.at.map(([x, y, by], i) => `<span class="u5-lrow" data-i="${i}" style="top:${by ?? y}%"><span class="wbox"></span></span>`).join("")}</div><svg class="u5-llines"></svg></div>`;
    },
    // { u5circle: { rows: [[[en, hint, meaning], …], …], done: [[en, hint, meaning], …], line: [hint, meaning] } }
    u5circle: (p) => {
      let i = 0;
      return `<div class="u5-circle">${p.rows.map((r) => `<div class="u5-crow">${r.map((w) => tile(w, i++)).join("")}</div>`).join("")}</div>
        <div class="u5-done"><div class="u5-crow">${p.done.map((w, j) => tile(w, j + 3)).join("")}</div>${p.line ? H.guide(p.line[0], p.line[1]) : ""}</div>`;
    },
    // { u5head: [en, hint, meaning] }
    u5head: (p) => `<div class="u5-head"><div class="en" data-c>${H.en(p.u5head[0])}</div>${H.guide(p.u5head[1], p.u5head[2])}</div>`,
  };
  // the label lines, drawn once the page is laid out: from each dot on the picture to its box
  const script = `for (const L of document.querySelectorAll('.u5-label')) { const svg = L.querySelector('.u5-llines'), r0 = L.getBoundingClientRect();
    for (const d of L.querySelectorAll('.u5-ldot')) { const row = L.querySelector('.u5-lrow[data-i="' + d.dataset.i + '"] .wbox'); if (!row) continue;
      const a = d.getBoundingClientRect(), b = row.getBoundingClientRect(), x1 = a.left + a.width / 2 - r0.left, y1 = a.top + a.height / 2 - r0.top, x2 = b.left - r0.left - 2, y2 = b.top + b.height / 2 - r0.top;
      svg.insertAdjacentHTML('beforeend', '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#9D174D" stroke-width="1.6" stroke-linecap="round"/>'); } }`;
  return {
    kinds: own,
    script,
    css: `
.u5-cap { color: #DC2626; font-weight: 700 }
.u5-plain .en { font-weight: 400 } .u5-plain .u5-b { font-weight: 700; color: var(--d) }
.u5-tight .read, .u5-beside.u5-tight .read { padding: 2mm 3mm; line-height: 1.2 }
.u5-tight .read .sen .guide, .u5-beside.u5-tight .read .sen .guide { margin: 0 0 .8mm; font-size: 7.6pt; line-height: 1.28 }
.u5-flow .pl > div > .en, .u5-flowopts .opt > div > .en { display: inline; margin-right: 2mm }
.u5-flow .pl > div > .guide, .u5-flowopts .opt > div > .guide { display: inline-block; vertical-align: baseline }
.u5-flow .pl > div { line-height: 1.15 }
.u5-flow .read .sen { display: block; margin-bottom: .6mm; line-height: 1.15 } .u5-flow .read .sen .en { margin-right: 2mm } .u5-flow .read .sen .guide { display: inline-block; margin: 0 }
.u5-flow .items { gap: 1.1mm } .u5-flowopts .opts { margin-top: .4mm; gap: 1.2mm } .u5-flowopts .opt { padding: .7mm 2mm; align-items: center } .u5-flowopts .tick { margin-top: 0 }
.u5-flow .choose { gap: .4mm }
.u5-opts3 .choose { padding-left: 2mm } .u5-opts3 .opts.inline { display: grid; grid-template-columns: 1fr 1fr 1.3fr; gap: 1mm 1.6mm; margin-top: .6mm }
.u5-opts3 .opt { padding: .6mm 1.4mm; grid-template-columns: 4.6mm auto 1fr; column-gap: 1.2mm; align-items: center } .u5-opts3 .tick { width: 4.6mm; height: 4.6mm; margin-top: 0 }
.u5-opts3.u5-flowopts .opts.inline { grid-template-columns: repeat(3, 1fr) } .u5-opts3.u5-flowopts .opt > div { line-height: 1.15 }
.u5-opts3 .opt .en { line-height: 1.2 } .u5-opts3 .opt .guide { line-height: 1.25; margin-top: .2mm }
.u5-cells .tbl td > .en, .u5-cells .tbl th > .en { display: inline; margin-right: 1.6mm }
.u5-cells .tbl td > .guide, .u5-cells .tbl th > .guide { display: inline-block }
.u5-cells .tbl td, .u5-cells .tbl th { line-height: 1.15 }
.u5-cells .tbl td, .u5-cells .tbl th { padding: .8mm 2mm }
.u5-cells .tbl .wbox { height: 6mm }
.u5-small .en, .u5-small .wb b, .u5-small .mi .en { font-size: 10.8pt } .u5-small .guide, .u5-small .read .sen .guide, .u5-small .wb small { font-size: 7.4pt }
.u5-small.u5-plain .en { font-size: 10.2pt } .u5-small .note { padding: 1.6mm 2.6mm; gap: .5mm } .u5-small .nt b { font-size: 11pt }
.u5-small .mi { min-height: 6.2mm } .u5-small .mcol { gap: .8mm }
.u5-small .tbl td, .u5-small .tbl th { padding: .45mm 2mm } .u5-small .items { gap: .5mm } .u5-small .wordbox { padding: 1.4mm 2mm; gap: 1mm 1.6mm }
.u5-chips .wordbox { gap: 1.2mm 2mm; padding: 1.8mm 2.4mm } .u5-chips .wb { flex-direction: row; align-items: baseline; gap: 1.2mm; padding: .6mm 2.2mm }
.u5-tf { display: flex; flex-direction: column; gap: 1.2mm; padding-left: 1mm }
.u5-tfr { display: grid; grid-template-columns: 6mm 1fr auto; column-gap: 2mm; align-items: center }
.u5-tfs .en { display: block }
.u5-tfb { width: 30mm; margin: 0 }
.u5-fig { position: relative; margin: 0; border-radius: 4mm; overflow: hidden; border: 1mm solid #fff; box-shadow: 0 0 0 .8mm var(--c), 0 1.6mm 0 .8mm var(--s); background: #fff }
.u5-fig img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 40%; display: block }
.u5-tag { position: absolute; right: 1.6mm; bottom: 1.6mm; font: 700 6.5pt 'Andika'; color: #fff; background: rgba(0,0,0,.45); padding: .3mm 1.6mm; border-radius: 99px }
.u5-beside { display: grid; grid-template-columns: var(--u5w) 1fr; gap: 3mm; align-items: stretch }
.u5-beside.u5-r { grid-template-columns: 1fr var(--u5w) } .u5-beside.u5-r .u5-fig { order: 2 }
.u5-beside .u5-fig { min-height: var(--u5h) }
.u5-bt .ltitle + .guide { margin-top: -1mm }
.u5-bt { display: flex; flex-direction: column; justify-content: center; min-width: 0 }
.u5-label { position: relative; display: flex }
.u5-lpic { position: relative; height: 100%; flex: none; background: #fff; border-radius: 3mm }
.u5-lpic img { width: 100%; height: 100%; object-fit: contain; display: block }
.u5-ldot { position: absolute; width: 2mm; height: 2mm; margin: -1mm 0 0 -1mm; border-radius: 50%; background: #9D174D; border: .4mm solid #fff }
.u5-lcol { position: relative; flex: 1 }
.u5-lrow { position: absolute; right: 0; transform: translateY(-50%) } .u5-lrow .wbox { width: 42mm; height: 8mm; display: block }
.u5-llines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible }
.u5-circle { margin: 0 auto; width: 88%; border: .9mm solid #DC2626; border-radius: 50%; padding: 7mm 14mm; display: flex; flex-direction: column; align-items: center; gap: 2.4mm; background: #fff }
.u5-crow { display: flex; flex-wrap: wrap; justify-content: center; gap: 2.4mm 3mm }
.u5-tile { display: inline-flex; flex-direction: column; align-items: center; background: var(--u5k); border-radius: 1.6mm; padding: .6mm 2.6mm .5mm; box-shadow: 0 .6mm 0 rgba(0,0,0,.12) }
.u5-tile b { font: 400 15pt/1.1 'Andika'; color: #1E2433 } .u5-tile small { font: 500 7.2pt 'Noto Sans Bengali'; color: #9A3412; white-space: nowrap } .u5-tile small i { font-style: normal; color: #1D4ED8 }
.u5-done { display: flex; flex-direction: column; align-items: center; gap: 1.2mm; margin-top: 2mm }
.u5-done .u5-tile b { font-size: 16pt }
.u5-head { text-align: center } .u5-head .en { font: 800 15pt/1.2 'Baloo 2'; color: var(--d) }
`,
  };
};
