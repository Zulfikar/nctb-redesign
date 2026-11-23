// The kinds of content a block's `parts` can hold (SPEC.md lists them with examples). build.js passes its helpers (H);
// each renderer takes the part and returns HTML. English the book prints carries data-c (the text check reads it);
// decoration doesn't. A unit can add its own kinds in content/unitN.parts.js: module.exports = (H) => ({ kinds, css }).
module.exports = (H) => {
  const { esc, en, guide, picture, dialogue, WHO, INK } = H;
  // a line [en, hint, meaning] or [mark, en, hint, meaning]: its English with the guide under it (no guide when both are "")
  const line = (l, marks) => {
    const [mk, e, h, m] = marks ? l : [null, ...l];
    return `<div class="pl${mk != null ? " mk2" : ""}">${mk != null ? `<span class="mk" data-c>${esc(mk)}</span>` : ""}<div><div class="en" data-c>${en(e)}</div>${h || m ? guide(h || "", m || "") : ""}</div></div>`;
  };
  // a cell: "" or "_" is a box to write in, {pic} a picture, [en, hint, meaning] English with its guide, a string English alone
  const cell = (c) => {
    if (c == null || c === "" || c === "_") return `<span class="wbox"></span>`;
    if (typeof c === "object" && !Array.isArray(c) && c.pic) return `<img class="cpic" src="file://${H.art(c.pic)}">`;
    if (Array.isArray(c)) return `<div class="en" data-c>${en(c[0])}</div>${c[1] || c[2] ? guide(c[1] || "", c[2] || "") : ""}`;
    return `<div class="en" data-c>${en(String(c))}</div>`;
  };
  const SHAPES = {
    tri: (c) => `<svg viewBox="0 0 10 10"><path d="M5 1 9.4 9H.6Z" fill="${c}"/></svg>`,
    dot: (c) => `<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.2" fill="${c}"/></svg>`,
    sq: (c) => `<svg viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" rx="1.4" fill="${c}"/></svg>`,
    star: (c) => `<svg viewBox="-10 -10 20 20"><path d="M0-9 2.6-2.8 9-2.8 3.9 1.1 5.9 7.3 0 3.5-5.9 7.3-3.9 1.1-9-2.8-2.6-2.8Z" fill="${c}"/></svg>`,
  };
  const PALETTE = ["#F59E0B", "#EF4444", "#3B82F6", "#22C55E", "#A855F7", "#EC4899", "#14B8A6", "#F97316", "#6366F1", "#84CC16"];
  const kinds = {
    dlg: (p) => dialogue(p.dlg),
    // lines without a speaker; style: "plain" (default), "song" (a verse card), "read" (a reading card); cols: 2
    lines: (p) => `<div class="lines ${p.style || "plain"}${p.cols ? " c" + p.cols : ""}">${p.title ? `<div class="ltitle" data-c>${en(p.title[0])}</div>` : ""}${p.lines.map((l) => line(l, p.marks)).join("")}</div>`,
    // numbered items [mark, en, hint, meaning]; answer: "line" adds a writing line under each
    items: (p) => `<div class="items${p.cols ? " c" + p.cols : ""}">${p.items.map((l) => `<div class="it">${line(l, true)}${p.answer === "line" ? `<div class="wline"></div>` : ""}</div>`).join("")}</div>`,
    // a reading text: sentences [en, hint, meaning] run on as a paragraph, each with its guide; caps: colour the capitals;
    // pic: a picture beside it ({ name, side: "right"|"left", w: % })
    text: (p) => {
      const s = p.text.map(([e, h, m]) => `<span class="sen"><span class="en" data-c>${p.caps ? en(e).replace(/(^|[\s(“‘'"])([A-Z])/g, "$1<b class=\"cap\">$2</b>") : en(e)}</span>${h || m ? guide(h || "", m || "") : ""}</span>`).join("");
      const pic = p.pic ? `<div class="tpic ${p.pic.side || "right"}" style="width:${p.pic.w || 42}%">${picture(p.pic.name, p.pic.bubbles || [])}</div>` : "";
      return `<div class="read">${pic}${s}</div>`;
    },
    // the tick choices: [{ q: [en, hint, meaning] or [mark, en, hint, meaning], options: [[mark, en, hint, meaning]] }]
    choices: (p) => p.choices.map((c) => `<div class="choose">${c.q ? `<div class="q1">${line(c.q, c.q.length === 4)}</div>` : ""}
      <div class="opts${p.inline ? " inline" : ""}">${c.options.map(([mk, e, h, m]) => `<div class="opt"><span class="tick"></span><span class="mk" data-c>${esc(mk)}</span><div><div class="en" data-c>${en(e)}</div>${h || m ? guide(h || "", m || "") : ""}</div></div>`).join("")}</div></div>`).join(""),
    // a box of words: [[en, hint, meaning]] or plain strings
    words: (p) => `<div class="wordbox">${p.words.map((w) => `<span class="wb">${Array.isArray(w) ? `<b data-c>${en(w[0])}</b>${w[1] || w[2] ? `<small>${H.hint(w[1] || "", w[2] || "")}${w[2] ? ` · <i>${esc(w[2])}</i>` : ""}</small>` : ""}` : `<b data-c>${en(w)}</b>`}</span>`).join("")}</div>`,
    // a table: head [cell…] (optional), rows [[cell…]], w: column widths in %
    table: (p) => `<table class="tbl"${p.w ? ` style="table-layout:fixed"` : ""}>${p.w ? `<colgroup>${p.w.map((x) => `<col style="width:${x}%">`).join("")}</colgroup>` : ""}${p.head ? `<thead><tr>${p.head.map((c) => `<th>${cell(c)}</th>`).join("")}</tr></thead>` : ""}<tbody>${p.rows.map((r) => `<tr>${r.map((c) => `<td>${cell(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`,
    // column A and column B: { a: title cell, b: title cell, left: [cell], right: [cell], done: [[i, j]] }
    match: (p) => `<div class="match" data-done='${JSON.stringify(p.done || [])}'><div class="mcol">${p.a ? `<div class="mh">${cell(p.a)}</div>` : ""}${p.left.map((c, i) => `<div class="mi" data-l="${i}">${cell(c)}<span class="dot r"></span></div>`).join("")}</div>
      <div class="mgap"></div><div class="mcol">${p.b ? `<div class="mh">${cell(p.b)}</div>` : ""}${p.right.map((c, i) => `<div class="mi" data-r="${i}"><span class="dot l"></span>${cell(c)}</div>`).join("")}</div><svg class="mlines"></svg></div>`,
    // a calendar page: { title, start: the weekday of the 1st (0 = Sunday), days, show: "all" or [numbers] }
    calendar: (p) => {
      const W = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], cells = [];
      for (let i = 0; i < p.start; i++) cells.push("");
      for (let d = 1; d <= p.days; d++) cells.push(p.show === "all" || (p.show || []).includes(d) ? `<b data-c>${d}</b>` : "");
      while (cells.length % 7) cells.push("");
      return `<div class="cal"><div class="calh"><span data-c>${esc(p.title)}</span></div><div class="calg">${W.map((w, i) => `<span class="cw${i >= 5 ? " we" : ""}">${w}</span>`).join("")}${cells.map((c, i) => `<span class="cd${i % 7 >= 5 ? " we" : ""}">${c}</span>`).join("")}</div></div>`;
    },
    // pictures in a row or grid: [{ name, label: "a", cap: [en, hint, meaning] }]; cols, h (mm), outline: line art to colour
    pics: (p) => `<div class="pics" style="grid-template-columns:repeat(${p.cols || p.pics.length},1fr)">${p.pics.map((x) => `<figure${p.outline ? " class=\"outline\"" : ""}><div class="pf" style="height:${p.h || 30}mm">${x.name ? `<img src="file://${H.art(x.name)}">` : ""}${x.label ? `<span class="plab" data-c>${esc(x.label)}</span>` : ""}</div>${x.cap ? `<figcaption>${cell(x.cap)}</figcaption>` : ""}</figure>`).join("")}</div>`,
    // number or word cards: [{ n: "11", w: [en, hint, meaning] or "" (a box to write in) }]; shape: "bubble" | "tag" | "mixed"
    cards: (p) => `<div class="cards sh-${p.shape || "bubble"}" style="grid-template-columns:repeat(${p.cols || 5},1fr)">${p.cards.map((c, i) => `<div class="cc" style="--k:${PALETTE[i % PALETTE.length]}"><span class="cn${p.shape === "mixed" ? " s" + (i % 4) : ""}" data-c>${esc(c.n)}</span>${c.w === undefined ? "" : c.w === "" ? `<span class="wbox"></span>` : `<div class="cword">${cell(c.w)}</div>`}</div>`).join("")}</div>`,
    // things to count: [{ shape: "tri" | "dot" | "sq" | "star", n: 31, color, answer: "31" or "" }]
    count: (p) => `<div class="count">${p.count.map((r) => `<div class="cr"><div class="cs">${Array.from({ length: r.n }, (_, i) => `${i && i % 5 === 0 ? "<i></i>" : ""}${SHAPES[r.shape || "dot"](r.color || "#F59E0B")}`).join("")}</div><div class="ca">${r.answer ? `<b data-c>${esc(r.answer)}</b>` : `<span class="wbox"></span>`}</div></div>`).join("")}</div>`,
    // words to trace on handwriting lines: ["eleven", "twelve"…] (per: words per line)
    trace: (p) => { const rows = []; for (let i = 0; i < p.trace.length; i += p.per || 4) rows.push(p.trace.slice(i, i + (p.per || 4))); return `<div class="trace">${rows.map((r) => `<div class="tr">${r.map((w) => `<span data-c>${esc(w)}</span>`).join("")}</div>`).join("")}</div>`; },
    // empty lines to write on
    write: (p) => `<div class="write">${Array.from({ length: p.write }, () => `<div class="wline"></div>`).join("")}</div>`,
    // boxes in a row: ["□ 9", "14 □"…]: □ is a box to write in, anything else is printed
    boxes: (p) => `<div class="boxes" style="grid-template-columns:repeat(${p.cols || 3},auto)">${p.boxes.map((b) => `<span class="bx">${b.split(" ").map((t) => (t === "□" ? `<span class="wbox"></span>` : `<b data-c>${esc(t)}</b>`)).join("")}</span>`).join("")}</div>`,
    // a "Grammar focus" box (or any note): { title: [en, meaning], lines: [[en, hint, meaning]] }
    note: (p) => `<div class="note">${p.note.title ? `<div class="nt"><span class="emo">💡</span><span><b data-c>${en(p.note.title[0])}</b>${p.note.title[1] ? `<i>${esc(p.note.title[1])}</i>` : ""}</span></div>` : ""}${(p.note.lines || []).map((l) => line(l, l.length === 4)).join("")}</div>`,
    // a big picture with speech bubbles, inside the parts
    pic: (p) => picture(p.pic, p.bubbles || [], p.h),
    // a little gap
    gap: (p) => `<div style="height:${p.gap}mm"></div>`,
  };
  const css = `
.pl { display: flex; gap: 1.6mm } .pl.mk2 .mk { flex: none; min-width: 6mm }
.lines { display: flex; flex-direction: column; gap: 1.4mm }
.lines.c2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4mm 5mm }
.lines.song { background: linear-gradient(135deg, #FDF2F8, #EFF6FF); border: .6mm solid #F9A8D4; border-radius: 5mm; padding: 3mm 4mm; position: relative }
.lines.song::before { content: "♪"; position: absolute; right: 4mm; top: 1mm; font: 800 22pt 'Baloo 2'; color: #F472B6; opacity: .5 }
.lines.song .en { color: #831843 }
.lines.read { background: color-mix(in srgb, var(--s) 55%, #fff); border-radius: 4mm; padding: 2.6mm 3.4mm }
.ltitle { font: 800 13pt 'Baloo 2'; color: var(--d) }
.items { display: flex; flex-direction: column; gap: 1.6mm; padding-left: 2mm } .items.c2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.6mm 5mm }
.wline { height: 7mm; border-bottom: .35mm solid #CBD5E1; margin-top: .4mm }
.read { background: color-mix(in srgb, var(--s) 45%, #fff); border-radius: 4mm; padding: 2.8mm 3.4mm; line-height: 1.25 }
.read::after { content: ""; display: block; clear: both }
.read .sen { display: inline } .read .sen .en { display: inline; font-weight: 400 } .read .sen .guide { display: block; margin: .2mm 0 1.4mm; font-size: 8pt }
.read .cap { color: #DC2626; font-weight: 700 }
.tpic { margin: 0 0 2mm; } .tpic.right { float: right; margin-left: 3mm } .tpic.left { float: left; margin-right: 3mm }
.tpic .pic { flex: none; min-height: 0; max-height: none; height: 38mm }
.opts.inline { flex-direction: row; flex-wrap: wrap }
.wordbox { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.6mm 2.4mm; background: #fff; border: .6mm solid #22C55E; border-radius: 4mm; padding: 2.4mm; box-shadow: 0 .8mm 0 #BBF7D0 }
.wb { display: inline-flex; flex-direction: column; align-items: center; background: #F0FDF4; border-radius: 2.4mm; padding: .8mm 2.6mm }
.wb b { font: 700 12pt 'Andika'; color: #166534 } .wb small { font: 500 7.4pt 'Noto Sans Bengali'; color: #C2410C } .wb small i { font-style: normal; color: #1D4ED8 }
.tbl { width: 100%; border-collapse: separate; border-spacing: 0; border: .6mm solid var(--c); border-radius: 3mm; overflow: hidden; background: #fff }
.tbl th { background: var(--c); color: #fff; padding: 1.4mm 2mm; text-align: left } .tbl th .en { color: #fff; font-size: 11pt } .tbl th .guide * { color: #fff !important }
.tbl td { padding: 1.4mm 2mm; border-top: .3mm solid color-mix(in srgb, var(--c) 30%, #fff); vertical-align: middle }
.tbl td + td, .tbl th + th { border-left: .3mm solid color-mix(in srgb, var(--c) 30%, #fff) }
.tbl tr:nth-child(even) td { background: color-mix(in srgb, var(--s) 45%, #fff) }
.tbl .wbox { width: 100%; min-width: 14mm }
.cpic { height: 22mm; display: block; margin: 0 auto; object-fit: contain; max-width: 100% }
.wbox { display: inline-block; min-width: 16mm; height: 7.4mm; border: .5mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; vertical-align: middle }
.match { position: relative; display: grid; grid-template-columns: 1fr 14mm 1fr }
.mcol { display: flex; flex-direction: column; gap: 1mm }
.mh { font-weight: 700; padding: 0 2mm } .mh .en { color: var(--d); font-weight: 800 }
.mi { position: relative; display: flex; align-items: center; gap: 1.6mm; background: #fff; border: .4mm solid color-mix(in srgb, var(--c) 35%, #fff); border-radius: 2.6mm; padding: .3mm 2.4mm; min-height: 6.8mm }
.mi[data-l] { justify-content: space-between } .mi .en { font-size: 12pt }
.dot { width: 2.6mm; height: 2.6mm; border-radius: 50%; background: var(--c); flex: none }
.mlines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible }
.cal { border: .8mm solid var(--c); border-radius: 4mm; overflow: hidden; background: #fff; box-shadow: 0 1.2mm 0 var(--s) }
.calh { background: linear-gradient(90deg, var(--c), var(--d)); color: #fff; text-align: center; font: 800 15pt 'Baloo 2'; padding: 1.4mm 0 .8mm; position: relative }
.calg { display: grid; grid-template-columns: repeat(7, 1fr) }
.cw { font: 700 7.6pt 'Andika'; text-align: center; padding: 1mm 0; background: var(--s); color: var(--d) } .cw.we { color: #DC2626 }
.cd { height: 10.5mm; border-top: .3mm solid color-mix(in srgb, var(--c) 25%, #fff); border-left: .3mm solid color-mix(in srgb, var(--c) 25%, #fff); display: flex; align-items: center; justify-content: center }
.cd:nth-child(7n+1) { border-left: none } .cd b { font: 800 15pt 'Baloo 2'; color: var(--d) } .cd.we b { color: #DC2626 }
.pics { display: grid; gap: 2.4mm }
.pics figure { display: flex; flex-direction: column; align-items: center; gap: 1mm }
.pf { position: relative; width: 100%; border-radius: 3mm; overflow: hidden; background: #fff; border: .6mm solid color-mix(in srgb, var(--c) 40%, #fff) }
.pf img { width: 100%; height: 100%; object-fit: cover; display: block } .outline .pf img { object-fit: contain } .outline .pf { border-style: dashed }
.plab { position: absolute; left: 1.4mm; top: 1.4mm; width: 5.6mm; height: 5.6mm; border-radius: 50%; background: #fff; color: var(--d); font: 800 10pt/5.8mm 'Baloo 2'; text-align: center; box-shadow: 0 .4mm 0 rgba(0,0,0,.2) }
.pics figcaption { text-align: center } .pics figcaption .en { font-size: 11.5pt } .pics figcaption .guide { font-size: 7.6pt }
.cards { display: grid; gap: 2.4mm }
.cc { display: flex; flex-direction: column; align-items: center; gap: 1mm }
.cn { font: 800 17pt/1 'Baloo 2'; color: #fff; background: var(--k); min-width: 13mm; height: 13mm; padding: 0 1.6mm; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: .8mm solid #fff; box-shadow: 0 0 0 .6mm var(--k), 0 1mm 0 .6mm rgba(0,0,0,.15) }
.cards.sh-tag .cn { border-radius: 2.4mm; height: 9mm; font-size: 13pt }
.cn.s1 { border-radius: 2mm } .cn.s2 { clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); border: none; box-shadow: none; width: 15mm; height: 15mm } .cn.s3 { clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%); border: none; box-shadow: none; width: 15mm }
.cc .cword { text-align: center } .cc .cword .en { font-size: 11pt } .cc .cword .guide { font-size: 7.2pt } .cc .wbox { width: 100%; height: 9mm }
.count { display: flex; flex-direction: column; gap: 2mm; border: .6mm solid var(--c); border-radius: 4mm; padding: 2mm; background: #fff }
.cr { display: grid; grid-template-columns: 1fr 18mm; gap: 2mm; align-items: center }
.cs { display: flex; flex-wrap: wrap; gap: .8mm } .cs svg { width: 4.6mm; height: 4.6mm } .cs i { width: 2.2mm }
.ca { height: 14mm; border: .5mm solid var(--c); border-radius: 2.6mm; display: flex; align-items: center; justify-content: center } .ca b { font: 800 18pt 'Baloo 2'; color: var(--d) } .ca .wbox { border: none; background: none }
.trace { display: flex; flex-direction: column; gap: 2.4mm }
.tr { display: flex; justify-content: space-between; padding: 1mm 2mm 0; height: 13mm; align-items: flex-end;
  background: linear-gradient(#CBD5E1, #CBD5E1) 0 2.6mm / 100% .3mm no-repeat, linear-gradient(#F9A8D4, #F9A8D4) 0 6.4mm / 100% .3mm no-repeat, linear-gradient(#94A3B8, #94A3B8) 0 10.2mm / 100% .35mm no-repeat }
.tr span { font: 400 20pt/1 'Andika'; color: #CBD5E1; letter-spacing: 1.4pt; padding-bottom: 2.4mm; -webkit-text-stroke: .25mm #94A3B8 }
.write { display: flex; flex-direction: column }
.boxes { display: grid; gap: 2.4mm 8mm; justify-content: start; padding-left: 4mm } .bx { display: inline-flex; align-items: center; gap: 1.6mm } .bx b { font: 800 14pt 'Baloo 2'; color: var(--d) } .bx .wbox { min-width: 12mm; height: 8.4mm }
.note { background: #FEF9C3; border: .6mm solid #FACC15; border-radius: 4mm; padding: 2.4mm 3mm; display: flex; flex-direction: column; gap: 1mm; box-shadow: 0 .8mm 0 #FDE68A }
.nt { display: flex; gap: 1.6mm; align-items: baseline } .nt b { font: 800 12pt 'Andika'; color: #A16207 } .nt i { font: 600 9pt 'Noto Sans Bengali'; font-style: normal; color: #1D4ED8; margin-left: 1.6mm }
`;
  // the "one is done for you" lines of a matching exercise, drawn once the page is laid out
  const script = `for (const m of document.querySelectorAll('.match')) { const done = JSON.parse(m.dataset.done || '[]'), svg = m.querySelector('.mlines'), r0 = m.getBoundingClientRect();
    for (const [i, j] of done) { const a = m.querySelector('[data-l="' + i + '"] .dot'), b = m.querySelector('[data-r="' + j + '"] .dot'); if (!a || !b) continue;
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      svg.insertAdjacentHTML('beforeend', '<line x1="' + (ra.left + ra.width / 2 - r0.left) + '" y1="' + (ra.top + ra.height / 2 - r0.top) + '" x2="' + (rb.left + rb.width / 2 - r0.left) + '" y2="' + (rb.top + rb.height / 2 - r0.top) + '" stroke="#EA580C" stroke-width="2.4" stroke-linecap="round"/>'); } }`;
  return { kinds, css, script };
};
