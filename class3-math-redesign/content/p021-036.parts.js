// Own kinds for printed pages 21–36 (অধ্যায় ২ যোগ, অধ্যায় ৩ বিয়োগ). Every digit, carry and borrow mark is set by code.
// The column sums follow Class 2's p040_cs / p056_col look (white table, red sign, the answer in orange, a struck digit
// with a red stroke); what Class 3 needs more is here:
//   c3p021_col    a sum in columns: { rows: ["৭৪/২", "−৩৯৫"], ans: "৩৪৭" | "" (a dashed box per digit) | "blank" (empty
//                 cells) | null (no answer row), tops: [["", "১০", ""], ["৬", "৩", "১০"]] (rows of small red carry / borrow
//                 marks, from the top), heads: ["শ", "দ", "এ"], style: "dash" | "solid" | "grid" | "dgrid" | "plain",
//                 tint: ["pink", "green", "peach", "blue"] (the last columns' colours, as the book's colour columns),
//                 opTint, labels: ["বিয়োজন", "বিয়োজ্য", "বিয়োগফল"] (an arrow and a word after each row), boxes (how many
//                 answer boxes), width, size (pt), box: "white" | "blue" | "yellow" | "pink" | "green" (a card), mk: "(৫)", noop }
//                 A row is a string: an optional sign, then one cell per place: a digit, "□" a box, "_" an empty cell, a
//                 digit + "/" struck through. A top cell may be "১০" or "১০/" (struck).
//   c3p021_cols   column sums side by side: { items: [col…], cols, size, style, gap, justify }
//   c3p021_flow   the book's worked steps: frames with an arrow between and a caption chip under each:
//                 { frames: [{ col, cap, tone }], panel: "#FCE7F3", size, style, cap: pt }
//   c3p021_ct     a column sum with its words beside it in a tinted note: { col, text, tone, w }
//   c3p021_places the side table "একক স্থান: ৩ + ৩ + ৩ = ৯" …: { rows: [[text, tone]], size }
//   c3p021_mcq    multiple choice with tick boxes: { items: [{ n, q, opts, cols, col }] }
//   c3p021_match  "দাগ টেনে মিল করি": { left, right, mid }
//   c3p021_story  p28's table: a sum in a coloured pill → its total in an oval → the story: { rows: [{ pill, tone, oval, text }] }
//   c3p021_list   numbered problems in one card, each with the book's marker: { items: [{ n, mark, text, body, line }], line }
//   c3p021_ledger p30's labelled column (প্রথম সপ্তাহে ১৬৮০ টাকা …) and its total line
//   c3p021_hsub   p34's subtraction in a line: every digit ticked "/", the borrow marks above: { a, b, ans, marks }
//   c3p021_chip   a small tag ("চ্যালেঞ্জ") ; c3p021_eq a line of text with a wide answer box: { text, bw }
const RED = "#DC2626", INK = "#1E2433";
const TINT = { pink: "#FBCFE8", green: "#D9F2C4", peach: "#FFD9C2", blue: "#BFDBFE", yellow: "#FEF08A", lime: "#E2F5A8", mauve: "#E9D5F5",
  lav: "#E0E7FF", gray: "#E5E7EB", sky: "#C9E8F7", rose: "#FCE7F3" };
const tint = (t) => TINT[t] || t;
// the markup, plus ▭ a wide answer box and ◻ a box for one digit
const mdx = (ctx, s, bw) => ctx.md(s).replace(/▭/g, `<i class="c3p021-wb wide"${bw ? ` style="width:${bw}mm"` : ""}></i>`).replace(/◻/g, `<i class="c3p021-wb one"></i>`);

// ── a sum in columns ──
function parseRow(r) {
  const m = String(r).match(/^\s*([+\-−]?)\s*(.*)$/);
  return { op: m[1] === "-" ? "−" : m[1], cells: m[2].replace(/\s+/g, "").match(/_|□|▫|[^_\/](\/)?/g) || [] };
}
function cellHtml(ctx, c) {
  if (c == null || c === "" || c === "_") return "";
  if (c === "□") return `<i class="c3p021-wb q"></i>`;
  if (c === "▫") return `<i class="c3p021-wb"></i>`;
  if (c.length > 1 && c.endsWith("/")) return `<span class="c3p021-x">${ctx.esc(c.slice(0, -1))}</span>`;
  return ctx.esc(c);
}
function colTable(ctx, b, extra = {}) {
  const { rows, ans, tops = [], heads, labels, style = "dash", size = 15, width: wmin = 0, opTint, noop, boxes, given } = { ...b, ...extra };
  const R = rows.map(parseRow), A = ans == null || ans === "" || ans === "blank" ? null : parseRow(ans).cells;
  const T = (tops || []).map((t) => (Array.isArray(t) ? t : [...t]));
  const n = Math.max(...R.map((r) => r.cells.length), A ? A.length : 0, heads ? heads.length : 0, ...T.map((t) => t.length), wmin, boxes || 0);
  const pad = (a) => Array(Math.max(0, n - a.length)).fill("_").concat(a);
  const tn = b.tint || [];
  const bg = (i) => { const t = tn[i - (n - tn.length)]; return t ? ` style="background:${tint(t)}"` : ""; };
  const opbg = opTint ? ` style="background:${tint(opTint)}"` : "";
  const op = (s, cls = "") => noop ? "" : `<td class="op${cls}"${cls ? "" : opbg}>${ctx.esc(s || "")}</td>`;
  const tds = (a) => pad(a).map((c, i) => `<td class="d${i ? " dv" : ""}"${bg(i)}>${cellHtml(ctx, c)}</td>`).join("");
  const lab = (i) => labels ? `<td class="lab">${labels[i] ? `<span>→</span>${ctx.esc(labels[i])}` : ""}</td>` : "";
  let h = "";
  if (heads) h += `<tr class="hd">${op("", " e")}${pad(heads).map((x, i) => `<td class="h${i ? " dv" : ""}">${ctx.esc(x === "_" ? "" : x)}</td>`).join("")}${labels ? "<td></td>" : ""}</tr>`;
  T.forEach((t) => { h += `<tr class="cy">${op("", " e")}${pad(t).map((c) => `<td>${cellHtml(ctx, c)}</td>`).join("")}${labels ? "<td></td>" : ""}</tr>`; });
  R.forEach((r, i) => { h += `<tr class="r${i === R.length - 1 ? " ln" : ""}">${op(r.op)}${tds(r.cells)}${lab(i)}</tr>`; });
  if (A) h += `<tr class="r an">${op("")}${tds(A)}${lab(R.length)}</tr>`;
  else if (ans === "") h += `<tr class="r an">${op("")}${tds(Array(boxes || n).fill("▫"))}${lab(R.length)}</tr>`;
  else if (ans === "blank") h += `<tr class="r an">${op("")}${tds(Array(n).fill("_"))}${lab(R.length)}</tr>`;
  return `<table class="c3p021-cs s-${style}${given ? " giv" : ""}" style="font-size:${size}pt">${h}</table>`;
}
function colHtml(ctx, b, extra) {
  const table = colTable(ctx, b, extra);
  const body = b.box ? `<div class="c3p021-box ${b.box}">${table}</div>` : table;
  return `<div class="c3p021-csi">${b.mk ? `<b class="c3p021-mk">${ctx.esc(b.mk)}</b>` : ""}${body}</div>`;
}

// ── the worked steps: frames, arrows, captions ──
const ARROW = `<svg width="5.4mm" height="6mm" viewBox="0 0 5.4 6"><path d="M.3 1.9H2.6V.3L5.1 3L2.6 5.7V4.1H.3Z" fill="${INK}"/></svg>`;
function flowHtml(ctx, b) {
  const nt = Math.max(0, ...b.frames.map((f) => (f.col.tops || []).length));
  const frames = b.frames.map((f) => {
    const tops = [...Array(nt - (f.col.tops || []).length).fill([]), ...(f.col.tops || [])];
    return `<div class="c3p021-fr">${colTable(ctx, { style: b.style || "dgrid", size: b.size || 12, ...f.col, tops })}</div>`;
  });
  const caps = b.frames.map((f) => f.cap ? `<div class="c3p021-cap" style="--t:${tint(f.tone || "lav")};font-size:${b.cap || 11.5}pt">${ctx.md(f.cap)}</div>` : `<div></div>`);
  const k = b.frames.length, cols = Array.from({ length: 2 * k - 1 }, (_, i) => (i % 2 ? "auto" : "auto")).join(" ");
  let h = "";
  frames.forEach((f, i) => { h += (i ? `<div class="c3p021-ar">${ARROW}</div>` : "") + f; });
  caps.forEach((c, i) => { h += (i ? `<div></div>` : "") + c; });
  return `<div class="c3p021-flow" style="grid-template-columns:${cols};background:${b.panel || "#F1F5F9"}">${h}</div>`;
}

// ── the rest ──
function mcqHtml(ctx, b, page) {
  return `<div class="c3p021-mcq">${b.items.map((it) => {
    const q = `<div class="c3p021-mq">${it.n ? `<b>${ctx.esc(it.n)}</b>` : ""}<div class="c3p021-mqt">${it.col ? `<div class="c3p021-mqc">${colTable(ctx, { style: "plain", size: 12, ...it.col })}</div>` : ""}<span>${mdx(ctx, it.q)}</span></div></div>`;
    const opts = `<div class="c3p021-opts" style="grid-template-columns:repeat(${it.cols || 4}, 1fr)">${it.opts.map((o) => `<span><i></i>${ctx.md(o)}</span>`).join("")}</div>`;
    return `<div class="c3p021-mi">${q}${opts}</div>`;
  }).join("")}</div>`;
}
function matchHtml(ctx, b) {
  const rows = b.left.map((l, i) => `<div class="c3p021-ml">${ctx.md(l)}<i></i></div><div></div><div class="c3p021-mr"><i></i>${ctx.md(b.right[i])}</div>`).join("");
  return `<div class="c3p021-match" style="grid-template-columns:${b.w ? b.w.map((x) => x + "mm").join(" ") : "62mm 1fr 34mm"}">${rows}</div>`;
}
function storyHtml(ctx, b) {
  const pill = (r) => {
    const inner = typeof r.pill === "number" ? Array.from({ length: r.pill }, () => `<i></i>`).join(`<b>+</b>`) : `<span>${ctx.md(r.pill)}</span>`;
    return `<div class="c3p021-pill" style="--t:${r.tone}">${inner}</div>`;
  };
  return `<table class="c3p021-story">${b.rows.map((r) => `<tr><td class="p">${pill(r)}</td><td class="a"><svg width="9mm" height="3mm" viewBox="0 0 9 3"><path d="M0 1.5H7.6" stroke="${INK}" stroke-width=".35"/><path d="M6.6 .4L8.8 1.5L6.6 2.6Z" fill="${INK}"/></svg></td>
    <td class="o"><span style="--t:${r.tone}">${r.oval ? ctx.md(r.oval) : ""}</span></td><td class="s">${ctx.md(r.text)}${r.lines ? Array.from({ length: r.lines }, () => `<i class="c3p021-wl"></i>`).join("") : ""}</td></tr>`).join("")}</table>`;
}
function listHtml(ctx, b, page) {
  return `<div class="c3p021-list${b.plain ? " plain" : ""}${b.line ? " lined" : ""}" style="${b.gap != null ? `--lg:${b.gap}mm;` : ""}${b.size ? `--ls:${b.size}pt;` : ""}${b.lh ? `--lh:${b.lh}mm;` : ""}">${b.items.map((it) => `<div class="c3p021-li">${it.mark ? ctx.exMark(it.mark, it.n) : `<span class="mk">${ctx.esc(it.n)}</span>`}<div class="c3p021-lt">${it.aside ? `<div class="c3p021-la"><p>${mdx(ctx, it.text)}</p><div>${ctx.blockHtml(it.aside, page)}</div></div>` : `<p>${mdx(ctx, it.text)}</p>`}${
    (it.body || []).map((x) => ctx.blockHtml(x, page)).join("")}${(it.line ?? b.line) ? Array.from({ length: it.line ?? b.line }, () => `<i class="c3p021-wl"></i>`).join("") : ""}</div></div>`).join("")}</div>`;
}
function ledgerHtml(ctx, b) {
  const rows = b.lines.map(([l, v], i) => `<tr${i === b.lines.length - 1 ? ` class="ln"` : ""}><td class="l">${ctx.md(l)}</td><td class="v">${ctx.md(v)}</td></tr>`).join("");
  return `<div class="lcenter"><table class="c3p021-ledger">${rows}<tr class="tot"><td class="l">${ctx.md(b.total)}</td><td class="v"><i class="c3p021-wb wide"></i></td></tr></table></div>`;
}
function hsubHtml(ctx, b) {
  const dig = (d, m, tick) => `<span class="c3p021-hd"><small>${m ? ctx.esc(m) : ""}</small><b${tick ? ` class="t"` : ""}>${ctx.esc(d)}</b></span>`;
  const a = [...b.a].map((d, i) => dig(d, (b.marks || [])[i], true)).join("");
  const s = [...b.b].map((d) => dig(d, "", true)).join("");
  return `<div class="c3p021-hsub" style="font-size:${b.size || 15}pt">${a}<span class="c3p021-hs">−</span>${s}<span class="c3p021-hs">=</span>${[...b.ans].map((d) => dig(d, "", false)).join("")}</div>`;
}

module.exports = {
  kinds: {
    c3p021_col: (b, ctx) => colHtml(ctx, b),
    c3p021_cols: (b, ctx) => `<div class="c3p021-cols" style="grid-template-columns:repeat(${b.cols || b.items.length}, auto);${b.gap ? `gap:${b.gap}mm;` : ""}justify-content:${b.justify || "space-around"}">${b.items.map((it) => colHtml(ctx, { size: b.size, style: b.style, box: b.box, ...it })).join("")}</div>`,
    c3p021_flow: (b, ctx) => flowHtml(ctx, b),
    c3p021_ct: (b, ctx) => `<div class="c3p021-ct">${b.col ? colHtml(ctx, b.col) : ""}${b.text ? `<div class="c3p021-note" style="--t:${tint(b.tone || "lav")};${b.w ? `width:${b.w}mm;` : ""}${b.size ? `font-size:${b.size}pt` : ""}">${mdx(ctx, b.text)}</div>` : ""}</div>`,
    c3p021_places: (b, ctx) => `<div class="c3p021-places" style="font-size:${b.size || 12}pt">${b.rows.map(([t, tone]) => `<div style="background:${tint(tone)}">${ctx.md(t)}</div>`).join("")}</div>`,
    c3p021_mcq: (b, ctx, page) => mcqHtml(ctx, b, page),
    c3p021_match: (b, ctx) => matchHtml(ctx, b),
    c3p021_story: (b, ctx) => storyHtml(ctx, b),
    c3p021_list: (b, ctx, page) => listHtml(ctx, b, page),
    c3p021_ledger: (b, ctx) => ledgerHtml(ctx, b),
    c3p021_hsub: (b, ctx) => hsubHtml(ctx, b),
    c3p021_head: (b, ctx) => `<div class="ext wm c3p021-head">${ctx.exMark(b.mark, b.n)}<span>${ctx.md(b.text)}</span></div>`,
    // blocks with smaller speech bubbles (a crowded page): { small: [blocks], gap }
    c3p021_small: (b, ctx, page) => `<div class="c3p021-sm" style="gap:${b.gap ?? 2.2}mm">${b.small.map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
    c3p021_chip: (b, ctx) => `<span class="c3p021-chip">${ctx.md(b.text)}</span>`,
    c3p021_eq: (b, ctx) => `<p class="c3p021-eq${b.center ? " c" : ""}"${b.size ? ` style="font-size:${b.size}pt"` : ""}>${mdx(ctx, b.text, b.bw || 24)}</p>`,
    // sums in a line with "(১)" marks; ▭ a wide answer box, ◻ a box for one digit: { sums, cols, start, size, bw, gap }
    c3p021_sums: (b, ctx) => `<div class="c3p021-sums" style="grid-template-columns:${b.tpl || `repeat(${b.cols || 3}, auto)`};font-size:${b.size || 13}pt;${b.gap ? `row-gap:${b.gap}mm;` : ""}justify-content:${b.justify || "space-between"}">${b.sums.map((x, i) => `<span><b class="c3p021-sk">${b.marks ? ctx.esc(b.marks[i]) : `(${ctx.bn((b.start || 1) + i)})`}</b>${mdx(ctx, x, b.bw || 24)}</span>`).join("")}</div>`,
  },
  css: `
/* sums in columns */
.c3p021-csi { display: flex; align-items: flex-start; gap: 1.2mm }
.c3p021-mk { font: 800 12pt/1.6 'Baloo Da 2'; color: #EA580C; white-space: nowrap }
.c3p021-cs { font-family: 'Baloo Da 2'; font-weight: 800; border-collapse: collapse; color: ${INK} }
.c3p021-cs td { width: 1.3em; height: 1.42em; text-align: center; vertical-align: middle; padding: 0 .08em; line-height: 1.42; white-space: nowrap }
.c3p021-cs td.op { color: ${RED}; width: 1.05em }
.c3p021-cs tr.hd td { font-size: .52em; font-weight: 700; line-height: 1.7; height: auto; padding: .15em .3em } .c3p021-cs tr.hd td.h { color: #fff; background: var(--c) }
.c3p021-cs tr.cy td { font-size: .6em; color: ${RED}; height: 1.15em; line-height: 1.15; padding: 0; vertical-align: bottom }
.c3p021-cs tr.an td { color: #C2410C } .c3p021-cs.giv tr.an td { color: ${INK} }
.c3p021-cs.s-dash td.dv, .c3p021-cs.s-dash tr.hd td.h { border-left: .4mm dashed #94A3B8 }
.c3p021-cs.s-solid td.dv { border-left: .45mm solid #475569 }
.c3p021-cs.s-grid tr.r td { border: .35mm solid #475569 } .c3p021-cs.s-dgrid tr.r td { border: .35mm dashed #64748B }
.c3p021-cs.s-grid tr.r td.op, .c3p021-cs.s-dgrid tr.r td.op { width: 1.3em }
.c3p021-cs tr.r.ln td { border-bottom: .6mm solid ${INK} }
.c3p021-cs.s-dash tr.ln td.op, .c3p021-cs.s-plain tr.ln td.op, .c3p021-cs.s-solid tr.ln td.op { border-bottom: .6mm solid ${INK} }
.c3p021-cs td.lab { width: auto; text-align: left; padding-left: 1.4mm; border: 0 !important; background: none !important; font: 700 .72em 'Noto Sans Bengali'; color: var(--d) } .c3p021-cs td.lab span { color: ${INK}; margin-right: 1mm; font-family: 'Baloo Da 2' }
.c3p021-x { position: relative; display: inline-block } .c3p021-x::after { content: ""; position: absolute; left: -18%; right: -18%; top: 50%; border-top: .5mm solid ${RED}; transform: rotate(52deg) }
.c3p021-cs tr.cy .c3p021-x::after { border-top-width: .35mm }
.c3p021-wb { display: inline-block; width: .82em; height: 1.08em; border: .35mm dashed #CBD5E1; border-radius: 1mm; vertical-align: middle; background: #fff }
.c3p021-wb.q { width: .9em; height: 1.1em; border: .45mm solid #F59E0B; background: #FFFBEB; border-radius: 1.2mm }
.c3p021-wb.wide { width: 24mm; height: 7.6mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; vertical-align: -2.2mm; margin: 0 .8mm }
.c3p021-wb.one { width: 6.4mm; height: 7.2mm; border: .5mm solid #F59E0B; background: #FFFBEB; border-radius: 1.4mm; vertical-align: -2.2mm; margin: 0 .5mm }
.c3p021-box { padding: 1.2mm 2.4mm 1.4mm; border-radius: 3mm; border: .6mm solid; background: #fff; box-shadow: 0 .8mm 0 rgba(0,0,0,.06) }
.c3p021-box.white { border-color: var(--c) } .c3p021-box.blue { background: #E0F2FE; border-color: #38BDF8 } .c3p021-box.yellow { background: #FEF9C3; border-color: #EAB308 }
.c3p021-box.pink { background: #FDF2F8; border-color: #F472B6 } .c3p021-box.green { background: #F0FDF4; border-color: #4ADE80 } .c3p021-box.plain { border-color: #CBD5E1 }
.c3p021-cols { display: grid; gap: 3mm 4mm; align-items: start }
/* worked steps */
.c3p021-flow { display: grid; align-items: center; justify-content: space-between; row-gap: 2.2mm; padding: 2.6mm 3mm 3mm; border-radius: 4mm }
.c3p021-fr { justify-self: center; background: #fff; border-radius: 3.4mm; padding: 1.6mm 2.2mm 2mm; box-shadow: 0 .6mm 0 rgba(30,36,51,.1) }
.c3p021-ar { display: flex; align-items: center; justify-content: center; padding: 0 .4mm }
.c3p021-cap { position: relative; justify-self: center; background: var(--t); border-radius: 2mm; padding: .9mm 3mm .5mm; font: 700 11.5pt/1.3 'Baloo Da 2'; text-align: center; white-space: nowrap }
.c3p021-cap::before { content: ""; position: absolute; left: 50%; top: -2mm; margin-left: -2mm; border: 2mm solid transparent; border-top: 0; border-bottom-color: var(--t) }
/* a column sum with its words */
.c3p021-ct { display: flex; align-items: center; gap: 3mm }
.c3p021-note { position: relative; background: var(--t); border-radius: 3mm; padding: 1.8mm 3.4mm 1.4mm; font: 600 11.5pt/1.45 'Noto Sans Bengali'; text-align: center }
.c3p021-places { display: flex; flex-direction: column; gap: .7mm; font-family: 'Baloo Da 2'; font-weight: 700 } .c3p021-places > div { padding: 1mm 4mm .6mm; border-radius: 1.6mm; line-height: 1.35 }
/* multiple choice */
.c3p021-mcq { display: flex; flex-direction: column; gap: 2.2mm }
.c3p021-mi { display: flex; flex-direction: column; gap: 1.2mm }
.c3p021-mq { display: grid; grid-template-columns: 8mm 1fr; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .c3p021-mq > b { font: 800 12pt/1.6 'Baloo Da 2'; color: #EA580C }
.c3p021-mqt { display: flex; align-items: center; gap: 3mm } .c3p021-mqc { flex: none }
.c3p021-opts { display: grid; gap: 1.2mm 3mm; padding-left: 10mm; font: 600 12.5pt/1.4 'Noto Sans Bengali' }
.c3p021-opts span { display: flex; align-items: center; gap: 1.8mm; white-space: nowrap } .c3p021-opts i { flex: none; width: 4.6mm; height: 4.6mm; border: .5mm solid #3B82F6; border-radius: 1.2mm; background: #fff }
/* matching */
.c3p021-match { display: grid; row-gap: 2.2mm; align-items: center; padding: 0 4mm }
.c3p021-ml, .c3p021-mr { position: relative; display: flex; align-items: center; gap: 2mm; background: #fff; border: .5mm solid var(--c); border-radius: 2.4mm; padding: 1mm 3mm .7mm; font: 700 12.5pt/1.35 'Baloo Da 2'; box-shadow: 0 .6mm 0 var(--s) }
.c3p021-ml { justify-content: space-between } .c3p021-mr { justify-content: flex-start }
.c3p021-ml i, .c3p021-mr i { width: 2.6mm; height: 2.6mm; border-radius: 50%; background: var(--c); flex: none }
/* p28's story table */
.c3p021-story { width: 100%; border-collapse: collapse; background: #fff; border: .5mm solid #64748B }
.c3p021-story td { border: .35mm solid #94A3B8; padding: 1.4mm 2mm; vertical-align: middle }
.c3p021-story td.p { width: 58mm } .c3p021-story td.a { width: 11mm; text-align: center } .c3p021-story td.o { width: 24mm; text-align: center }
.c3p021-story td.s { font: 500 11pt/1.4 'Noto Sans Bengali'; height: 14mm; vertical-align: top }
.c3p021-pill { display: flex; align-items: center; justify-content: center; gap: 1.4mm; background: var(--t); border-radius: 2.4mm; padding: 1.6mm 2.4mm; font: 800 12.5pt 'Baloo Da 2' }
.c3p021-pill i { width: 13mm; height: 6.4mm; background: #fff; border-radius: 1mm } .c3p021-pill b { color: #fff; font-weight: 800 }
.c3p021-story td.o span { display: inline-flex; align-items: center; justify-content: center; width: 19mm; height: 9mm; border-radius: 50%; background: var(--t); font: 800 12pt 'Baloo Da 2' }
.c3p021-wl { display: block; height: 6.4mm; border-bottom: .45mm dashed #CBD5E1 }
/* numbered problems in one card */
.c3p021-list { display: flex; flex-direction: column; background: #fff; border: .6mm solid var(--c); border-radius: 4mm; box-shadow: 0 1.2mm 0 var(--s); padding: .8mm 3.2mm }
.c3p021-list.plain { background: none; border: 0; box-shadow: none; padding: 0 }
.c3p021-li { display: grid; grid-template-columns: 10mm 1fr; align-items: start; padding: var(--lg, 1.5mm) 0; border-top: .35mm dashed color-mix(in srgb, var(--c) 35%, #fff) } .c3p021-li:first-child { border-top: 0 }
.c3p021-list.plain .c3p021-li { border-top: 0; padding: var(--lg, .6mm) 0 }
.c3p021-la { display: grid; grid-template-columns: 1fr auto; gap: 4mm; align-items: start }
.c3p021-lt { display: flex; flex-direction: column; gap: 1.2mm; font: 500 var(--ls, 12pt)/1.45 'Noto Sans Bengali' } .c3p021-lt .c3p021-wl { height: var(--lh, 7mm) } .c3p021-list.lined .c3p021-li { border-top: 0 }
/* p30's labelled column */
.c3p021-ledger { border-collapse: collapse; font: 600 11.5pt/1.45 'Noto Sans Bengali' } .c3p021-ledger td { padding: .2mm 1.6mm }
.c3p021-ledger td.l { text-align: right } .c3p021-ledger td.v { text-align: right; font-family: 'Baloo Da 2'; font-weight: 700 }
.c3p021-ledger tr.ln td { border-bottom: .5mm solid ${INK}; padding-bottom: .8mm } .c3p021-ledger tr.tot td { padding-top: 1.4mm } .c3p021-ledger tr.tot td.l { text-align: left }
/* p34: subtraction in a line, with ticks */
.c3p021-hsub { display: flex; align-items: flex-end; gap: .08em; font-family: 'Baloo Da 2'; font-weight: 800; justify-content: flex-end }
.c3p021-hd { display: inline-flex; flex-direction: column; align-items: center; width: .76em } .c3p021-hd small { font-size: .55em; color: ${RED}; height: 1.2em; line-height: 1.2 }
.c3p021-hd b { position: relative; line-height: 1.2 } .c3p021-hd b.t::after { content: ""; position: absolute; left: 58%; top: -22%; width: 0; height: 52%; border-left: .3mm solid ${RED}; transform: rotate(30deg); transform-origin: bottom }
.c3p021-hs { line-height: 1.2; padding: 0 .18em; color: ${INK} }
/* small things */
.c3p021-sm { display: flex; flex-direction: column } .c3p021-sm .sb { font-size: 12pt; line-height: 1.42; padding: 2mm 4.4mm 1.7mm } .c3p021-sm .fc { width: 17mm; height: 17mm }
.c3p021-chip { display: inline-block; align-self: center; width: fit-content; font: 700 11pt 'Baloo Da 2'; color: #9A3412; background: #FEF3C7; border: .5mm solid #F59E0B; border-radius: 99px; padding: .4mm 4mm .1mm; box-shadow: 0 .6mm 0 #FDE68A }
.c3p021-eq { font: 700 13pt/1.6 'Baloo Da 2' } .c3p021-eq.c { text-align: center }
.c3p021-sums { display: grid; column-gap: 4mm; row-gap: 2.2mm; font-family: 'Baloo Da 2'; font-weight: 700; line-height: 1.6; padding-left: 1mm } .c3p021-sums > span { white-space: nowrap }
.c3p021-sk { color: #EA580C; margin-right: 1.4mm; font-weight: 800 }
`,
};
