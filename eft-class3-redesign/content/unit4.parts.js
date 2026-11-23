// Unit 4's own kinds (SPEC section 4): what parts.js can't do for "Let's Play with Sounds and Numbers".
// Each takes the part (an object kind's options are merged in by the build) and returns HTML; the book's English carries
// data-c, decoration doesn't. Classes start with u4-.
module.exports = (H) => {
  const { esc, en, guide, art } = H;
  const BASE = require("../parts.js")(H);
  const g = (h, m) => (h || m ? guide(h || "", m || "") : "");
  const word = (w) => `<div class="en" data-c>${en(w[0])}</div>${g(w[1], w[2])}`; // [en, hint, meaning]
  const img = (name, cls = "") => `<img class="${cls}" src="file://${art(name)}">`;
  // a drill line's speaker (T:, Ss:, S1:) as a little chip, still part of the book's text
  const SP = /^((?:T|Ss|S\d)\s*:)\s*/;
  const spk = (e) => { const m = e.match(SP); return m ? `<b class="u4-sp ${m[1][0] === "T" ? "t" : "s"}">${esc(m[1])}</b> ${en(e.slice(m[0].length))}` : en(e); };
  const dcell = (l) => (l ? `<div class="u4-dc"><div class="en" data-c>${spk(l[0])}</div>${g(l[1], l[2])}</div>` : `<div></div>`);
  const more = (m) => `<div class="u4-more"><span class="en" data-c>${en(m[0])}</span>${m[2] ? `<i>${esc(m[2])}</i>` : ""}</div>`;
  // a calendar month (0–11) of a year: the days that don't fit five rows go up into the first row, as the book prints them
  const month = (y, mo) => {
    const start = new Date(Date.UTC(y, mo, 1)).getUTCDay(), days = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate(), cells = Array(35).fill("");
    for (let d = 1; d <= days; d++) { const i = start + d - 1; cells[i < 35 ? i : i - 35] = d; }
    return cells;
  };
  const LCG = (seed) => () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  const SPINES = ["#DC2626", "#2563EB", "#16A34A", "#F59E0B", "#9333EA", "#0D9488", "#DB2777", "#EA580C", "#4F46E5", "#65A30D", "#0891B2", "#B45309"];

  const kinds = {
    // the teacher-and-class drill: [{ pic, lines: [[left, right]], more: [en, "", meaning] }], each side [en, hint, meaning]
    u4drill: (p) => `<div class="u4-drill">${p.u4drill.map((r) => `<div class="u4-dr${r.lines ? "" : " short"}">${r.pic ? `<div class="u4-dp">${img(r.pic)}</div>` : ""}
      <div class="u4-dl">${(r.lines || []).map(([a, b]) => `<div class="u4-drow">${dcell(a)}${dcell(b)}</div>`).join("")}${r.more ? more(r.more) : ""}</div></div>`).join("")}</div>`,
    // pairs of words: { rows: [{ mk, a, b, ans, pa, pb }], cols: 1 | 2, box: answer boxes, side: a picture beside }
    u4pairs: (p) => {
      const w1 = (w, pic) => `<div class="u4-pw">${pic ? img(pic, "u4-ppic") : ""}<div>${word(w)}</div></div>`;
      const row = (r) => `<div class="u4-pr${p.box ? " bx" : ""}"><span class="mk" data-c>${esc(r.mk)}</span>${w1(r.a, r.pa)}${w1(r.b, r.pb)}${p.box ? `<span class="u4-ans">${r.ans ? `<b data-c>${esc(r.ans)}</b>` : ""}</span>` : ""}</div>`;
      const cols = p.cols || 1, per = Math.ceil(p.rows.length / cols), groups = [];
      for (let i = 0; i < p.rows.length; i += per) groups.push(p.rows.slice(i, i + per));
      return `<div class="u4-pairs">${groups.map((gr) => `<div class="u4-pcol">${gr.map(row).join("")}</div>`).join("")}${p.side ? `<div class="u4-pside">${img(p.side)}</div>` : ""}</div>`;
    },
    // words in rows: [[w…]…], w = [en, hint, meaning] (or [mark, en, hint, meaning] with marks); oval: in an oval as the
    // book draws it; grid: equal boxes in a row; box: a box to write in after each word
    u4row: (p) => {
      const one = (w) => { const [mk, e, h, m] = p.marks ? w : [null, ...w]; return `<div class="u4-w">${mk ? `<span class="mk" data-c>${esc(mk)}</span>` : ""}<div class="u4-wt">${word([e, h, m])}</div>${p.box ? `<span class="wbox"></span>` : ""}</div>`; };
      return `<div class="u4-rows${p.oval ? " oval" : ""}${p.grid ? " grid" : ""}">${p.u4row.map((r) => `<div class="u4-r" style="${p.grid ? `grid-template-columns:repeat(${r.length},1fr)` : ""}">${r.map(one).join("")}</div>`).join("")}</div>`;
    },
    // a rhyme: { title: [en, hint, meaning], verses: [[line…]…], cols, side: picture beside, w: its width % }
    u4song: (p) => `<div class="u4-song">${p.side ? `<div class="u4-sside" style="width:${p.w || 34}%">${img(p.side)}</div>` : ""}<div class="u4-sbody">
      ${p.title ? `<div class="u4-stitle"><div class="en" data-c>${en(p.title[0])}</div>${g(p.title[1], p.title[2])}</div>` : ""}
      <div class="u4-verses" style="grid-template-columns:repeat(${p.cols || 1},1fr)">${p.verses.map((v) => `<div class="u4-verse">${v.map((l) => `<div class="u4-sl">${word(l)}</div>`).join("")}</div>`).join("")}</div></div></div>`,
    // a heading in the page: [en, hint, meaning]
    u4head: (p) => `<div class="u4-head">${word(p.u4head)}</div>`,
    // the rhyme's word box: { title: [en, hint, meaning], rows: [[cell, cell]…] }
    u4vocab: (p) => `<div class="u4-vocab"><div class="u4-vh">${word(p.title)}</div><div class="u4-vg">${p.rows.flat().map((c) => `<div class="u4-vc">${word(c)}</div>`).join("")}</div></div>`,
    // a year's calendar: { title: [en, hint, meaning], year, months: [[name, hint, meaning] × 12] }; Friday and Saturday in red
    u4year: (p) => {
      const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return `<div class="u4-year"><div class="u4-yh">${word(p.title)}</div><div class="u4-ym">${p.months.map((m, mo) => `<div class="u4-mo">
        <div class="u4-mh">${word(m)}</div><div class="u4-mg">${WD.map((d, i) => `<span class="u4-wd${i >= 5 ? " we" : ""}" data-c>${d}</span>`).join("")}${month(p.year, mo).map((d, i) => `<span class="u4-d${i % 7 >= 5 ? " we" : ""}"${d ? " data-c" : ""}>${d}</span>`).join("")}</div></div>`).join("")}</div></div>`;
    },
    // the cardinal and ordinal numbers side by side: { head: [cardinal, ordinal], rows: [[n, word, ordinal, "1st"]…], split }
    u4ord: (p) => {
      const sh = (s) => { const m = String(s).match(/^(\d+)(\D+)$/); return m ? `<span data-c>${m[1]}<sup>${m[2]}</sup></span>` : `<span data-c>${esc(s)}</span>`; };
      const half = (rows) => `<table class="u4-ot"><thead><tr><th colspan="2">${word(p.head[0])}</th><th colspan="2" class="o">${word(p.head[1])}</th></tr></thead><tbody>${rows.map(([n, c, o, s]) => `<tr><td class="n"><span data-c>${n}</span></td><td>${word(c)}</td><td class="o">${word(o)}</td><td class="s">${sh(s)}</td></tr>`).join("")}</tbody></table>`;
      const k = p.split || Math.ceil(p.rows.length / 2);
      return `<div class="u4-ord">${half(p.rows.slice(0, k))}${half(p.rows.slice(k))}</div>`;
    },
    // the bookshelf, drawn: { shelves: [label…] from the top; the book's labels are part of its picture, so they carry no
    // data-c; only the "st" of its "1st shelf" sign is text in the book }
    u4shelf: (p) => {
      const rnd = LCG(7);
      const books = () => { let s = "", x = 0; while (x < 100) { const w = 1.6 + rnd() * 2.2, h = 62 + rnd() * 34, c = SPINES[Math.floor(rnd() * SPINES.length)]; s += `<i style="width:${w.toFixed(2)}%;height:${h.toFixed(0)}%;background:${c}"></i>`; x += w + 0.35; } return s; };
      return `<div class="u4-shelf"><div class="u4-case">${p.shelves.map((l) => `<div class="u4-sh"><div class="u4-bk">${books()}</div><span class="u4-lab">${esc(l)}</span></div>`).join("")}</div>
        <span class="u4-sign">1<sup data-c>st</sup> shelf</span></div>`;
    },
    // the frogs' pond: lily pads from..to in a snake from the bottom left, the given numbers printed, the rest to write
    u4pond: (p) => {
      const cols = p.cols || 4, n = p.to - p.from + 1, rows = Math.ceil(n / cols), pads = [], pts = [];
      for (let i = 0; i < n; i++) {
        const r = Math.floor(i / cols), c = r % 2 === 0 ? i % cols : cols - 1 - (i % cols), num = p.from + i;
        const x = 6 + ((c + 0.5) / cols) * 88, y = 7 + ((rows - r - 0.5) / rows) * 86; pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
        pads.push(`<div class="u4-pad" style="left:${x}%;top:${y}%"><svg viewBox="-10 -10 20 20" style="transform:rotate(${(i * 67) % 360}deg)"><path d="M0 0 9.5-3A10 10 0 1 0 9.5 3Z" fill="#65A30D" stroke="#3F6212" stroke-width=".7"/><path d="M0 0-6 4M0 0-4-6M0 0 3 7" stroke="#84CC16" stroke-width=".6"/></svg>
          <span class="u4-num">${(p.given || []).includes(num) ? `<b data-c>${num}</b>` : ""}</span></div>`);
      }
      const frogs = (p.frogs || []).map(([x, y]) => `<span class="u4-frog emo" style="left:${x}%;top:${y}%">🐸</span>`).join("");
      return `<div class="u4-pond" style="height:${p.h || 70}mm"><svg class="u4-vine" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="${pts.join(" ")}" fill="none" stroke="#BEF264" stroke-width="5" vector-effect="non-scaling-stroke" stroke-linejoin="round" opacity=".8"/></svg>${pads.join("")}${frogs}</div>`;
    },
    // number cards in a basket: { cards: [{ n, w }], cols }, the cards of parts.js
    u4basket: (p) => `<div class="u4-basket">${BASE.kinds.cards({ cards: p.cards, cols: p.cols || 7, shape: "tag" })}</div>`,
    // things to count in tens: [{ n, color, answer }]: each ten a block of 2 × 5
    u4count: (p) => `<div class="u4-count">${p.u4count.map((r) => {
      const tens = []; for (let k = 0; k < r.n; k += 10) tens.push(Math.min(10, r.n - k));
      return `<div class="u4-cr"><div class="u4-tens">${tens.map((t) => `<span class="u4-ten">${Array.from({ length: t }, () => `<i style="background:${r.color}"></i>`).join("")}</span>`).join("")}</div>
        <div class="u4-ca">${r.answer ? `<b data-c>${esc(r.answer)}</b>` : `<span class="wbox"></span>`}</div></div>`;
    }).join("")}</div>`,
    // parts.js's match, with bigger pictures
    u4match: (p) => `<div class="u4-bigm">${BASE.kinds.match(p)}</div>`,
    // a Grammar focus box whose example words show their capital letter in red: { title, lines, caps: [words] }
    u4note: (p) => {
      let h = BASE.kinds.note({ note: { title: p.title, lines: p.lines } });
      for (const c of p.caps || []) h = h.replace(new RegExp(`\\b${c}\\b`, "g"), `<b class="u4-cap">${c[0]}</b>${c.slice(1)}`);
      return h;
    },
    // phrases with a picture each: [[[en, hint, meaning], picture]…]
    u4phr: (p) => `<div class="u4-phr">${p.u4phr.map(([l, pic]) => `<div class="u4-ph">${word(l)}</div><div class="u4-pp">${img(pic)}</div>`).join("")}</div>`,
    // a compact table: { w: [%…], head: [cell…], rows: [[cell…]…] }; a cell is "_" (a box), a string, or [en, hint, meaning]
    // with its guide beside the word
    u4tbl: (p) => {
      const c = (x) => (x === "_" ? `<span class="wbox"></span>` : Array.isArray(x) ? `<div class="u4-inl"><span class="en" data-c>${en(x[0])}</span>${g(x[1], x[2])}</div>` : `<span class="en" data-c>${en(x)}</span>`);
      return `<table class="u4-tbl">${p.w ? `<colgroup>${p.w.map((x) => `<col style="width:${x}%">`).join("")}</colgroup>` : ""}${p.head ? `<thead><tr>${p.head.map((x) => `<th>${Array.isArray(x) ? word(x) : c(x)}</th>`).join("")}</tr></thead>` : ""}<tbody>${p.rows.map((r) => `<tr>${r.map((x) => `<td>${c(x)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    },
    // a paragraph for the teacher or the class: [en, "", meaning], in the book's plain type
    u4para: (p) => `<div class="u4-para"><div class="en" data-c>${en(p.u4para[0])}</div>${g(p.u4para[1], p.u4para[2])}</div>`,
    // parts.js's numbered items, a little smaller and with shorter writing boxes, so two columns fit
    u4items: (p) => `<div class="u4-its">${BASE.kinds.items({ ...p, items: p.u4items })}</div>`,
  };

  const css = `
.u4-sp { display: inline-block; font: 800 8.6pt/1 'Baloo 2'; color: #fff; padding: .8mm 1.6mm .5mm; border-radius: 99px; margin-right: .6mm; vertical-align: .5mm }
.u4-sp.t { background: #475569 } .u4-sp.s { background: var(--c) }
.u4-drill { display: flex; flex-direction: column; border: .6mm solid color-mix(in srgb, var(--c) 45%, #fff); border-radius: 3.4mm; overflow: hidden; background: #fff }
.u4-dr { display: flex; align-items: stretch } .u4-dr + .u4-dr { border-top: .3mm solid color-mix(in srgb, var(--c) 30%, #fff) }
.u4-dp { flex: none; width: 36mm; display: flex; align-items: center; justify-content: center; padding: 1mm; border-right: .3mm solid color-mix(in srgb, var(--c) 30%, #fff); background: #fff }
.u4-dp img { width: 100%; max-height: 21mm; object-fit: contain } .u4-dr.short .u4-dp img { max-height: 12mm } .u4-dr.short .u4-dl { padding: .6mm 3mm }
.u4-dl { flex: 1; padding: 1.6mm 3mm; display: flex; flex-direction: column; gap: 1.2mm; justify-content: center; background: color-mix(in srgb, var(--s) 35%, #fff) }
.u4-drow { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; align-items: baseline }
.u4-dc { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 2.4mm } .u4-dc .en { font-size: 12pt } .u4-dc .guide { font-size: 8pt }
.u4-more .en { display: inline; color: var(--d); font-size: 11.5pt } .u4-more i { font: 600 8.6pt 'Noto Sans Bengali'; font-style: normal; color: #1D4ED8; margin-left: 2mm }
.u4-pairs { display: flex; gap: 6mm; align-items: center; padding-left: 4mm }
.u4-pcol { flex: 1; display: flex; flex-direction: column; gap: 1.2mm }
.u4-pcol + .u4-pcol { border-left: .4mm solid color-mix(in srgb, var(--c) 35%, #fff); padding-left: 6mm }
.u4-pr { display: grid; grid-template-columns: 7mm 1fr 1fr; align-items: center; column-gap: 2mm; background: #fff; border: .4mm solid color-mix(in srgb, var(--c) 30%, #fff); border-radius: 2.6mm; padding: .8mm 2.4mm }
.u4-pr.bx { grid-template-columns: 7mm 1fr 1fr 14mm }
.u4-pr .en { font-size: 12.5pt } .u4-pr .guide { font-size: 7.8pt } .u4-pr .u4-pw > div { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 2mm }
.u4-pw { display: flex; align-items: center; gap: 2mm } .u4-ppic { height: 15mm; width: 21mm; object-fit: contain; flex: none }
.u4-ans { height: 8mm; border: .5mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; display: flex; align-items: center; justify-content: center }
.u4-ans b { font: 800 14pt 'Baloo 2'; color: #DC2626 }
.u4-pside { flex: none; width: 34%; display: flex; justify-content: center } .u4-pside img { width: 100%; max-height: 40mm; object-fit: contain }
.u4-rows { display: flex; flex-direction: column; gap: 2mm; align-items: center }
.u4-r { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.6mm 5mm }
.u4-w { display: flex; align-items: center; gap: 1.6mm } .u4-wt { text-align: center } .u4-w .en { font-size: 13pt } .u4-w .guide { font-size: 7.8pt }
.u4-w .wbox { min-width: 14mm; height: 8mm }
.u4-rows.oval { align-self: center; width: 78%; margin: 0 auto; border: .7mm solid var(--c); border-radius: 50%; padding: 4.4mm 10mm; background: #fff; box-shadow: 0 1mm 0 var(--s) }
.u4-rows.grid { align-items: stretch } .u4-rows.grid .u4-r { display: grid; gap: 0; border: .6mm solid var(--c); border-radius: 3mm; overflow: hidden; background: #fff }
.u4-rows.grid .u4-w { justify-content: center; padding: 1.4mm 1mm } .u4-rows.grid .u4-w + .u4-w { border-left: .3mm solid color-mix(in srgb, var(--c) 30%, #fff) }
.u4-song { display: flex; gap: 3mm; align-items: stretch; background: linear-gradient(135deg, #FDF2F8, #EFF6FF); border: .6mm solid #F9A8D4; border-radius: 5mm; padding: 2.6mm 3.4mm; position: relative }
.u4-sbody { flex: 1; display: flex; flex-direction: column; gap: 1.6mm; min-width: 0 }
.u4-stitle { text-align: center } .u4-stitle .en { font: 800 15pt/1.2 'Baloo 2'; color: #BE185D }
.u4-verses { display: grid; gap: 2mm 5mm }
.u4-verse { display: flex; flex-direction: column; gap: .9mm; background: rgba(255,255,255,.6); border-radius: 3mm; padding: 1.4mm 2.4mm }
.u4-sl .en { color: #831843; font-size: 12pt; line-height: 1.2 } .u4-sl .guide { font-size: 7.8pt; line-height: 1.3 }
.u4-sside { flex: none; display: flex; align-items: center; justify-content: center; order: 2 } .u4-sside img { width: 100%; max-height: 100%; object-fit: contain; border-radius: 3mm }
.u4-head { text-align: center } .u4-head .en { font: 800 17pt/1.15 'Baloo 2'; color: var(--d) }
.u4-vocab { border: .6mm solid #A16207; border-radius: 3mm; overflow: hidden; background: #FEFCE8 }
.u4-vh { background: #FEF08A; text-align: center; padding: .8mm } .u4-vh .en { font-size: 11.5pt; color: #1E3A8A }
.u4-vg { display: grid; grid-template-columns: 1fr 1fr }
.u4-vc { padding: .8mm 2.4mm; border-top: .3mm solid #FDE68A } .u4-vc:nth-child(even) { border-left: .3mm solid #FDE68A }
.u4-vc .en { font-size: 10.5pt; font-weight: 400 } .u4-vc .guide { font-size: 7.2pt }
.u4-year { border: .8mm solid var(--c); border-radius: 4mm; overflow: hidden; background: #fff; box-shadow: 0 1.2mm 0 var(--s) }
.u4-yh { background: linear-gradient(90deg, #0EA5E9, #0284C7); text-align: center; padding: 1mm 0 .8mm } .u4-yh .en { font: 800 15pt/1.1 'Baloo 2'; color: #fff; letter-spacing: .6pt } .u4-yh .guide * { color: #fff !important }
.u4-ym { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2mm 2.4mm; padding: 2mm 2.4mm }
.u4-mh .en { font: 800 10.5pt/1.1 'Andika'; color: #0369A1 } .u4-mh .guide { font-size: 6.6pt; line-height: 1.25 }
.u4-mg { display: grid; grid-template-columns: repeat(7, 1fr); margin-top: .6mm }
.u4-wd { font: 700 5.4pt/1 'Andika'; text-align: center; padding: .7mm 0 .5mm; background: #E0F2FE; color: #0F172A } .u4-wd.we { color: #DC2626 }
.u4-d { font: 700 7.4pt/1 'Andika'; text-align: center; padding: .7mm 0 .5mm; color: #0F172A } .u4-d.we { color: #DC2626 }
.u4-ord { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm }
.u4-ot { width: 100%; border-collapse: separate; border-spacing: 0; border: .6mm solid var(--c); border-radius: 3mm; overflow: hidden; background: #fff }
.u4-ot th { background: #BAE6FD; padding: .8mm 1.4mm; text-align: center } .u4-ot th.o { background: #FBCFE8 } .u4-ot th .en { font-size: 9.6pt } .u4-ot th .guide { font-size: 6.6pt }
.u4-ot td { padding: .6mm 1.4mm; border-top: .3mm solid color-mix(in srgb, var(--c) 30%, #fff); text-align: center; vertical-align: middle }
.u4-ot td + td { border-left: .3mm solid color-mix(in srgb, var(--c) 30%, #fff) }
.u4-ot td .en { font-size: 10.5pt } .u4-ot td .guide { font-size: 6.8pt; line-height: 1.25 } .u4-ot td.n, .u4-ot td.s { font: 800 11pt 'Baloo 2'; color: var(--d) }
.u4-ot td.o .en { color: #BE185D } .u4-ot sup { font-size: 65%; color: #BE185D }
.u4-shelf { position: relative; width: 112mm; margin: 0 auto; padding: 0 10mm 0 0 }
.u4-case { background: #B45309; border: 2.4mm solid #92400E; border-top-width: 4mm; border-radius: 1.6mm; padding: 0 1.6mm; display: flex; flex-direction: column; box-shadow: 1.6mm 1.6mm 0 #78350F }
.u4-sh { position: relative; height: 7.4mm; border-bottom: 1.3mm solid #FCD34D; background: #451A03; display: flex; align-items: center; justify-content: center }
.u4-bk { position: absolute; inset: .5mm 1mm 0; display: flex; align-items: flex-end; gap: .35% } .u4-bk i { display: block; flex: none; border-radius: .3mm .3mm 0 0; box-shadow: inset -.25mm 0 0 rgba(0,0,0,.25) }
.u4-lab { position: relative; font: 700 6.4pt/1 'Andika'; letter-spacing: .3pt; color: #1E293B; background: #F8FAFC; border: .3mm solid #94A3B8; border-radius: .8mm; padding: .7mm 2mm .5mm; text-transform: uppercase; white-space: nowrap }
.u4-sign { position: absolute; right: -4mm; bottom: 3mm; transform: rotate(-14deg); font: 800 10pt/1 'Andika'; color: #1E293B; background: #fff; border: .4mm solid #92400E; border-radius: 1.4mm; padding: 1mm 2mm .8mm; box-shadow: 0 .6mm 0 rgba(0,0,0,.2) }
.u4-sign sup { font-size: 65% }
.u4-pond { position: relative; border-radius: 9mm; background: radial-gradient(ellipse at 30% 20%, #67E8F9, #0891B2 75%); box-shadow: inset 0 0 0 1.2mm #22D3EE, 0 1.2mm 0 #A5F3FC; overflow: hidden }
.u4-vine { position: absolute; inset: 0; width: 100%; height: 100% }
.u4-pad { position: absolute; width: 15.5mm; height: 15.5mm; transform: translate(-50%, -50%) }
.u4-pond .u4-pad { margin: 0 } .u4-pad svg { position: absolute; inset: 0; width: 100%; height: 100% }
.u4-num { position: absolute; left: 50%; top: 50%; width: 9.6mm; height: 9.6mm; transform: translate(-50%, -50%); border-radius: 50%; background: #fff; border: .4mm solid #3F6212; display: flex; align-items: center; justify-content: center }
.u4-num b { font: 800 11.5pt/1 'Baloo 2'; color: #1E293B }
.u4-frog { position: absolute; font-size: 15pt; transform: translate(-50%, -50%) }
.u4-basket { position: relative; margin: 0 6mm; padding: 3.4mm 4mm 3mm; border: 2.2mm solid #92400E; border-radius: 6mm 6mm 18mm 18mm; background: repeating-linear-gradient(45deg, #FDE68A 0 2.4mm, #FCD34D 2.4mm 4.8mm); box-shadow: 0 1.2mm 0 #78350F }
.u4-basket .cc:nth-child(odd) .cn { transform: rotate(-5deg) } .u4-basket .cc:nth-child(even) .cn { transform: rotate(4deg) }
.u4-basket .cc .guide { background: rgba(255,255,255,.85); border-radius: 1.4mm; padding: 0 1mm }
.u4-count { display: flex; flex-direction: column; gap: 2mm; border: .6mm solid var(--c); border-radius: 4mm; padding: 2mm 3mm; background: #fff }
.u4-cr { display: grid; grid-template-columns: 1fr 20mm; gap: 3mm; align-items: center } .u4-cr + .u4-cr { border-top: .3mm dashed color-mix(in srgb, var(--c) 40%, #fff); padding-top: 2mm }
.u4-tens { display: grid; grid-template-columns: repeat(5, max-content); gap: 1.6mm 3.4mm; justify-content: center }
.u4-ten { display: grid; grid-template-columns: repeat(5, 3.4mm); grid-auto-rows: 3.4mm; gap: .6mm } .u4-ten i { border-radius: 50%; box-shadow: inset -.4mm -.4mm 0 rgba(0,0,0,.18) }
.u4-ca { height: 14mm; border: .5mm solid var(--c); border-radius: 2.6mm; display: flex; align-items: center; justify-content: center } .u4-ca b { font: 800 18pt 'Baloo 2'; color: var(--d) }
.u4-bigm .cpic { height: 36mm } .u4-bigm .mi { padding: 1mm 2.4mm } .u4-bigm .mcol { justify-content: space-around; gap: 2.4mm }
.u4-cap { color: #DC2626 }
/* Lesson 1's and Lesson 4's titles are long: a little smaller on their pages, so they stay on one line (else they break
   inside a sound symbol, "/ʌ/") */
.page:is([data-page="49"], [data-page="50"], [data-page="51"], [data-page="56"], [data-page="57"], [data-page="58"]) .ttl h1 { font-size: 21.5pt }
.u4-phr { display: grid; grid-template-columns: 1fr 44%; border: .6mm solid var(--c); border-radius: 3mm; overflow: hidden; background: #fff }
.u4-ph { display: flex; flex-direction: column; justify-content: center; padding: 1mm 3.4mm } .u4-ph .en { font-size: 13pt; font-weight: 400 }
.u4-pp { display: flex; justify-content: center; padding: 1mm; border-left: .3mm solid color-mix(in srgb, var(--c) 30%, #fff) } .u4-pp img { height: 19mm; max-width: 100%; object-fit: contain }
.u4-ph:nth-child(n+3), .u4-pp:nth-child(n+3) { border-top: .3mm solid color-mix(in srgb, var(--c) 30%, #fff) }
.u4-tbl { width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0; border: .6mm solid var(--c); border-radius: 3mm; overflow: hidden; background: #fff }
.u4-tbl th { background: var(--c); padding: .6mm 1.6mm; text-align: left; vertical-align: middle } .u4-tbl th .en { color: #fff; font-size: 9.4pt; line-height: 1.1 } .u4-tbl th .guide { font-size: 6.4pt; line-height: 1.2 } .u4-tbl th .guide * { color: #fff !important }
.u4-tbl td { padding: .45mm 1.6mm; border-top: .3mm solid color-mix(in srgb, var(--c) 30%, #fff); vertical-align: middle } .u4-tbl td + td, .u4-tbl th + th { border-left: .3mm solid color-mix(in srgb, var(--c) 30%, #fff) }
.u4-tbl tr:nth-child(even) td { background: color-mix(in srgb, var(--s) 45%, #fff) } .u4-tbl td .en { font-size: 11.5pt } .u4-tbl .wbox { width: 100%; min-width: 0; height: 5.8mm; display: block }
.u4-tbl .box { height: 5.8mm; vertical-align: -1.5mm } .u4-inl { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 2mm } .u4-inl .guide { font-size: 7.4pt }
.u4-para .en { font-weight: 400; font-size: 11pt; line-height: 1.3 } .u4-para .guide { font-size: 8pt; line-height: 1.3; margin-top: .4mm }
.u4-its .items.c2 { gap: 1.6mm 4mm; padding-left: 0 } .u4-its .en { font-size: 10.2pt; white-space: nowrap } .u4-its .guide { font-size: 7pt; white-space: nowrap }
.u4-its .box { width: 12mm !important; height: 6.2mm; vertical-align: -1.8mm } .u4-its .pl.mk2 .mk { min-width: 5mm; font-size: 11pt }
`;
  return { kinds, css };
};
