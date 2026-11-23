// Own kinds for printed pages 115–127: liquids (glasses, bottles, pouring), time (clocks with a second hand or no hands,
// the hands diagram, 7-segment digital clocks, the day and month cycles), money (drawn coins and notes, both sides),
// data (scattered fruits and vehicles, tally marks) and the layout pieces those pages need (an exercise card with a
// picture beside it, the book's green-square practice items, label + writing-line rows, a table whose cells hold blocks).
// Every count (glasses, bottles, fruits, vehicles, tally strokes) is drawn by code, so it is exact.
const fs = require("fs"), path = require("path");
const ART = path.join(__dirname, "..", "art");
const BN = "০১২৩৪৫৬৭৮৯", bn = (n) => String(n).replace(/\d/g, (d) => BN[d]);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const f2 = (x) => +x.toFixed(2);

// ── a sticker (art/ready, else art/new), else its emoji ──
const EMOJI = { teapot: "🫖", saucepan: "🍳", bucket: "🪣", "clay-bowl": "🥣", banana: "🍌", mango: "🥭", lychee: "🍓", apple: "🍎",
  papaya: "🍈", "banana-bunch": "🍌", watermelon: "🍉", jackfruit: "🍍", bus: "🚌", car: "🚗", taxi: "🚕", "mini-car": "🚙",
  crow: "🐦", koel: "🐦", pigeon: "🕊️", myna: "🐦" };
function stk(name) { for (const d of ["ready", "new"]) { const f = path.join(ART, d, `sticker-${name}.png`); if (fs.existsSync(f)) return "file://" + f; } return null; }
// a wide thing (a bus, a car) fills only the middle band of its square sticker: its box is that band (the sticker's
// empty top and bottom are cropped), and its square emoji stand-in is drawn smaller
const BAND = { bus: .5, car: .6, taxi: .6, "mini-car": .7 }, EMOJI_SCALE = { bus: .5, car: .62, taxi: .6, "mini-car": .66 };
function item(name, size) {
  const img = stk(name), band = BAND[name] || 1;
  return `<span class="p115-it${band < 1 ? " band" : ""}" style="width:${size}mm;height:${f2(size * band)}mm">${img ? `<img src="${img}">` : `<i style="font-size:${(size * 2.1 * (EMOJI_SCALE[name] || 1)).toFixed(1)}pt">${EMOJI[name] || "●"}</i>`}</span>`;
}

// ── glasses and bottles (units: mm) ──
function glass(x, y, w, h, { f = 1, level } = {}) {
  const tb = w * 0.1, X = (yy) => [x + tb * (yy - y) / h, x + w - tb * (yy - y) / h], bot = y + h - 0.7, sw = f2(w * 0.04);
  const lv = level != null ? level : f * (h - 1.9);
  let s = "";
  if (lv > 0) {
    const wy = bot - lv, [l1, r1] = X(wy), [l2, r2] = X(bot);
    s += `<path d="M${f2(l1)} ${f2(wy)}L${f2(r1)} ${f2(wy)}L${f2(r2)} ${f2(bot)}L${f2(l2)} ${f2(bot)}Z" fill="#6CCBF0"/>`
      + `<ellipse cx="${f2((l1 + r1) / 2)}" cy="${f2(wy)}" rx="${f2((r1 - l1) / 2)}" ry="${f2(w * 0.07)}" fill="#B4E9FA" stroke="#4BB3DE" stroke-width="${f2(sw * 0.6)}"/>`;
  }
  const [l0, r0] = X(y), [lb, rb] = X(y + h);
  s += `<path d="M${f2(l0)} ${f2(y)}L${f2(r0)} ${f2(y)}L${f2(rb)} ${f2(y + h)}L${f2(lb)} ${f2(y + h)}Z" fill="rgba(219,234,254,.35)" stroke="#557694" stroke-width="${sw}" stroke-linejoin="round"/>`
    + `<ellipse cx="${f2(x + w / 2)}" cy="${f2(y)}" rx="${f2(w / 2)}" ry="${f2(w * 0.08)}" fill="none" stroke="#557694" stroke-width="${sw}"/>`
    + `<path d="M${f2(x + w * 0.22)} ${f2(y + h * 0.14)}L${f2(x + w * 0.29)} ${f2(y + h * 0.84)}" stroke="#fff" stroke-width="${f2(w * 0.08)}" stroke-linecap="round" opacity=".85"/>`
    + `<path d="M${f2(lb + 0.3)} ${f2(y + h - 0.35)}L${f2(rb - 0.3)} ${f2(y + h - 0.35)}" stroke="#94A3B8" stroke-width="${f2(w * 0.1)}" stroke-linecap="round"/>`;
  return s;
}
const svgBox = (w, h, inner, cls = "") => `<svg class="p115-svg ${cls}" width="${f2(w)}mm" height="${f2(h)}mm" viewBox="0 0 ${f2(w)} ${f2(h)}">${inner}</svg>`;
function glassesSvg(fills, gw = 9, gh = 11.5, gap = 1.6) {
  const w = fills.length * gw + (fills.length - 1) * gap + 0.6;
  return svgBox(w, gh + 1, fills.map((f, i) => glass(0.3 + i * (gw + gap), 0.6, gw, gh, { f })).join(""));
}
// a plastic water bottle in its own units: W wide (10 slim, 16 wide), 26 high, the cap's top centre at (W/2, 0)
const BOTTLE_W = { small: 10, litre: 10, big: 16 };
function bottleUnits(kind = "small", label) {
  const w = BOTTLE_W[kind], h = 26, big = kind === "big", cw = big ? 6.4 : 4.2, nw = big ? 7 : 4.6, c = w / 2;
  const body = `M${c - nw / 2} 3.9C${c - nw / 2} 6 .45 ${big ? 5.6 : 6.4} .45 ${big ? 8.4 : 9}L.45 ${h - 1.4}Q.45 ${h - .4} 1.5 ${h - .4}L${w - 1.5} ${h - .4}Q${w - .45} ${h - .4} ${w - .45} ${h - 1.4}L${w - .45} ${big ? 8.4 : 9}C${w - .45} ${big ? 5.6 : 6.4} ${c + nw / 2} 6 ${c + nw / 2} 3.9Z`;
  const lab = label ? `<text transform="translate(${c} ${h * 0.6}) rotate(-90)" text-anchor="middle" dominant-baseline="central" font-family="Noto Sans Bengali" font-weight="700" font-size="${big ? 3 : 2.45}" fill="#1E3A8A">${esc(label)}</text>` : "";
  return `<rect x="${c - cw / 2}" y=".2" width="${cw}" height="2.3" rx=".6" fill="#1D4ED8" stroke="#1E3A8A" stroke-width=".3"/>`
    + `<rect x="${c - nw / 2}" y="2.4" width="${nw}" height="1.6" fill="#BFE6FA" stroke="#2B7BB9" stroke-width=".35"/>`
    + `<path d="${body}" fill="#A9DBF5" stroke="#2B7BB9" stroke-width=".45" stroke-linejoin="round"/>`
    + `<path d="M.6 ${big ? 10 : 10.6}H${w - .6}M.6 ${h - 4.2}H${w - .6}" stroke="#2B7BB9" stroke-width=".3" opacity=".55"/>`
    + `<rect x=".5" y="${h * 0.44}" width="${w - 1}" height="${h * 0.32}" fill="#fff" opacity=".93"/>${lab}`
    + `<path d="M1.7 ${big ? 9 : 9.6}V${h * 0.42}M1.7 ${h * 0.79}V${h - 2.2}" stroke="#fff" stroke-width=".7" stroke-linecap="round" opacity=".75"/>`;
}
function bottleSvg(kind, hmm, label) { const w = BOTTLE_W[kind]; return `<svg class="p115-svg" width="${f2(hmm * w / 26)}mm" height="${hmm}mm" viewBox="-.1 -.1 ${w + .2} 26.2">${bottleUnits(kind, label)}</svg>`; }

// ── clocks ──
function clockSvg({ h = 12, m = 0, s, empty, size = 30 }) {
  const hand = (a, len, wd, col, tail = 0) => { const r = (a - 90) * Math.PI / 180, c = Math.cos(r), n = Math.sin(r); return `<line x1="${f2(50 - c * tail)}" y1="${f2(50 - n * tail)}" x2="${f2(50 + c * len)}" y2="${f2(50 + n * len)}" stroke="${col}" stroke-width="${wd}" stroke-linecap="round"/>`; };
  let ticks = "", nums = "";
  for (let i = 0; i < 60; i++) { const r = i * 6 * Math.PI / 180; ticks += `<line x1="${f2(50 + Math.sin(r) * 44)}" y1="${f2(50 - Math.cos(r) * 44)}" x2="${f2(50 + Math.sin(r) * (i % 5 ? 42 : 39.5))}" y2="${f2(50 - Math.cos(r) * (i % 5 ? 42 : 39.5))}" stroke="#334155" stroke-width="${i % 5 ? .6 : 1.4}"/>`; }
  for (let i = 1; i <= 12; i++) { const r = i * 30 * Math.PI / 180; nums += `<text x="${f2(50 + Math.sin(r) * 31)}" y="${f2(50 - Math.cos(r) * 31 + 3.6)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="700" font-size="${i > 9 ? 9.5 : 10.5}" fill="#1E2433">${i /* the book prints its clock faces with English digits */}</text>`; }
  const hands = empty ? "" : hand((h % 12) * 30 + m * 0.5, 22, 4.4, "#1E3A8A") + hand(m * 6, 34, 2.8, "#DC2626") + (s != null ? hand(s * 6, 38, 1.1, "#16A34A", 7) : "");
  return `<svg class="p115-svg" width="${size}mm" height="${size}mm" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#FEF3C7" stroke="#D97706" stroke-width="3.5"/><circle cx="50" cy="50" r="45" fill="#fff"/>${ticks}${nums}${hands}<circle cx="50" cy="50" r="${empty ? 2.4 : 3.2}" fill="#1E2433"/></svg>`;
}
// a digital clock: 7-segment digits on a dark screen in an orange case (h = height in mm)
const SEG = { 0: "abcdef", 1: "bc", 2: "abdeg", 3: "abcdg", 4: "bcfg", 5: "acdfg", 6: "acdefg", 7: "abc", 8: "abcdefg", 9: "abcdfg" };
function lcdSvg(t, hmm = 14) {
  const dw = 8, dh = 14, th = 1.8, gp = 2.3, on = "#F0FDF4";
  let x = 7, digits = "";
  for (const ch of t) {
    if (ch === ":") { digits += `<circle cx="${x + 1.2}" cy="${8.5 + dh * 0.3}" r="1.15" fill="${on}"/><circle cx="${x + 1.2}" cy="${8.5 + dh * 0.72}" r="1.15" fill="${on}"/>`; x += 2.4 + gp; continue; }
    const y = 8.5, segs = { a: [x + th * .55, y, dw - th * 1.1, th], g: [x + th * .55, y + dh / 2 - th / 2, dw - th * 1.1, th], d: [x + th * .55, y + dh - th, dw - th * 1.1, th],
      f: [x, y + th * .55, th, dh / 2 - th * .8], b: [x + dw - th, y + th * .55, th, dh / 2 - th * .8], e: [x, y + dh / 2 + th * .25, th, dh / 2 - th * .8], c: [x + dw - th, y + dh / 2 + th * .25, th, dh / 2 - th * .8] };
    for (const [k, [sx, sy, sw, sh]] of Object.entries(segs)) digits += `<rect x="${f2(sx)}" y="${f2(sy)}" width="${f2(sw)}" height="${f2(sh)}" rx="${th / 2}" fill="${on}" opacity="${SEG[ch].includes(k) ? 1 : .07}"/>`;
    x += dw + gp;
  }
  const W = x - gp + 7, H = 31;
  return `<svg class="p115-svg" width="${f2(hmm * W / H)}mm" height="${hmm}mm" viewBox="0 0 ${f2(W)} ${H}">
    <rect x=".5" y="1.6" width="${f2(W - 1)}" height="${H - 2.1}" rx="4.5" fill="#B45309"/><rect x=".5" y=".5" width="${f2(W - 1)}" height="${H - 2.6}" rx="4.5" fill="#F7931E" stroke="#C2410C" stroke-width=".5"/>
    <rect x="3.6" y="3.6" width="${f2(W - 7.2)}" height="${H - 8.6}" rx="2.6" fill="#163A2A"/><path d="M${f2(W * .55)} 3.6h${f2(W * .16)}l-${f2(W * .2)} ${H - 8.6}h-${f2(W * .16)}z" fill="#fff" opacity=".07"/>
    <g transform="skewX(-6) translate(1.6 -.4)">${digits}</g></svg>`;
}

// ── money: drawn coins and notes (no photographs of banknotes) ──
const NOTE = { 1: ["#EADFC4", "#7A5C1E"], 2: ["#CFE6B0", "#3F6212"], 5: ["#EED3B5", "#7C3F12"], 10: ["#F8C8D4", "#9D174D"], 20: ["#BFE8C8", "#166534"],
  50: ["#F6D2B0", "#9A3412"], 100: ["#BFD8F2", "#1E40AF"], 200: ["#DCE9A8", "#4D5B0E"], 500: ["#F7C1B4", "#991B1B"], 1000: ["#DCCCF2", "#5B21B6"] };
const COIN = { 1: ["#F6E7AE", "#D4AE45", "#7A5A12"], 2: ["#F8FAFC", "#C3CCD7", "#4B5563"], 5: ["#E5E9EF", "#9AA6B6", "#374151"] };
// the water lily emblem (shapla), drawn in lines, centred at (cx, cy)
const shapla = (cx, cy, s, col, sw = 1.1) => `<g transform="translate(${cx} ${cy}) scale(${s})" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">
  <path d="M0 -10C4 -5 4 2 0 5C-4 2 -4 -5 0 -10Z"/><path d="M-1 4C-9 2 -11 -4 -9 -8C-5 -5 -2 -1 -1 4Z"/><path d="M1 4C9 2 11 -4 9 -8C5 -5 2 -1 1 4Z"/>
  <path d="M-2 6.5C-8 6.5 -13 4 -15 0M2 6.5C8 6.5 13 4 15 0"/><path d="M-12 10.5q3 -2 6 0t6 0t6 0t6 0M-9 13.5q3 -2 6 0t6 0t6 0"/>
  <g fill="${col}" stroke="none"><circle cx="-9" cy="-14" r="1"/><circle cx="-3" cy="-16" r="1"/><circle cx="3" cy="-16" r="1"/><circle cx="9" cy="-14" r="1"/></g></g>`;
const building = (x, y, col) => `<g transform="translate(${x} ${y})" fill="none" stroke="${col}" stroke-width=".9" stroke-linejoin="round">
  <path d="M0 30H56M2 30V27H54V30M5 27V13H51V27"/><path d="M5 13L28 5L51 13" /><path d="M20 8.2Q28 -2 36 8.2"/><path d="M28 1.4V-1"/>
  ${[9, 15, 21, 27, 33, 39, 45].map((cx) => `<path d="M${cx} 15V25.5"/>`).join("")}<path d="M5 15.5H51M5 25.5H51" opacity=".6"/></g>`;
function noteSvg(v, back, wmm = 36) {
  const [bg, k] = NOTE[v] || NOTE[10], W = 130, H = 60, V = bn(v);
  let waves = "";
  for (let i = 0; i < 6; i++) waves += `<path d="M4 ${10 + i * 8}q8 -4 16 0t16 0t16 0t16 0t16 0t16 0t16 0t16 0" fill="none" stroke="${k}" stroke-width=".5" opacity=".16"/>`;
  const face = back
    ? `${building(10, 17, k)}<text x="104" y="30" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${V.length > 3 ? 18 : 21}" fill="${k}">${V}</text>
       <text x="104" y="42" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="700" font-size="8.5" fill="${k}">টাকা</text>
       <text x="9" y="13" font-family="Baloo Da 2" font-weight="800" font-size="8" fill="${k}">${V}</text>`
    : `<ellipse cx="29" cy="30" rx="16" ry="20" fill="#fff" opacity=".6" stroke="${k}" stroke-width=".6" stroke-opacity=".45"/>${shapla(29, 32, .95, k, 1)}
       <text x="88" y="32" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${V.length > 3 ? 20 : 23}" fill="${k}">${V}</text>
       <text x="88" y="45" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="700" font-size="9" fill="${k}">টাকা</text>
       <text x="121" y="14" text-anchor="end" font-family="Baloo Da 2" font-weight="800" font-size="8" fill="${k}">${V}</text>`;
  return `<svg class="p115-svg p115-note" width="${wmm}mm" height="${f2(wmm * H / W)}mm" viewBox="0 0 ${W} ${H}">
    <rect x=".8" y=".8" width="${W - 1.6}" height="${H - 1.6}" rx="4" fill="${bg}" stroke="${k}" stroke-width="1.3"/><path d="M1 1H70L40 59H1Z" fill="#fff" opacity=".28"/>${waves}
    <rect x="4.5" y="4.5" width="${W - 9}" height="${H - 9}" rx="2.4" fill="none" stroke="${k}" stroke-width=".6" stroke-dasharray="2 1.4" opacity=".55"/>
    ${face}<text x="${back ? 121 : 9}" y="54" text-anchor="${back ? "end" : "start"}" font-family="Baloo Da 2" font-weight="800" font-size="8" fill="${k}">${V}</text></svg>`;
}
function coinSvg(v, back, dmm = 16) {
  const [lt, md, dk] = COIN[v] || COIN[2];
  let ticks = "";
  for (let i = 0; i < 48; i++) { const r = i * 7.5 * Math.PI / 180; ticks += `<line x1="${f2(30 + Math.sin(r) * 26.6)}" y1="${f2(30 - Math.cos(r) * 26.6)}" x2="${f2(30 + Math.sin(r) * 28.4)}" y2="${f2(30 - Math.cos(r) * 28.4)}" stroke="${dk}" stroke-width=".7" opacity=".45"/>`; }
  const face = back ? shapla(30, 31.5, 1.05, dk, 1.25)
    : `<text x="30" y="34" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="22" fill="${dk}">${bn(v)}</text><text x="30" y="44.5" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="700" font-size="7.5" fill="${dk}">টাকা</text>`;
  return `<svg class="p115-svg p115-coin" width="${dmm}mm" height="${dmm}mm" viewBox="0 0 60 60"><circle cx="30" cy="31" r="29" fill="${dk}" opacity=".25"/><circle cx="30" cy="30" r="29" fill="${md}" stroke="${dk}" stroke-width=".8"/>${ticks}
    <circle cx="30" cy="30" r="24.5" fill="${lt}" stroke="${dk}" stroke-width=".7" stroke-opacity=".6"/><path d="M12 22A20 20 0 0 1 34 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>${face}</svg>`;
}

// ── tally marks: groups of five (four upright strokes, the fifth across them) ──
function tallyInner(n, h, x0 = 0, y0 = 0, col = "#1E2433") {
  const sw = f2(h * 0.11), step = h * 0.3, gg = h * 0.55;
  let s = "", x = x0 + h * 0.2;
  for (let g = 0; g * 5 < n; g++) {
    const k = Math.min(5, n - g * 5);
    for (let i = 0; i < Math.min(4, k); i++) s += `<line x1="${f2(x + i * step)}" y1="${f2(y0 + h * .04)}" x2="${f2(x + i * step)}" y2="${f2(y0 + h * .96)}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`;
    if (k === 5) s += `<line x1="${f2(x - step * .55)}" y1="${f2(y0 + h * .86)}" x2="${f2(x + step * 3.55)}" y2="${f2(y0 + h * .14)}" stroke="#DC2626" stroke-width="${sw}" stroke-linecap="round"/>`;
    x += (k === 5 ? 3 * step + gg + step * .6 : k * step);
  }
  return { s, w: x - x0 };
}
function tallySvg(n, h = 9) { const { s, w } = tallyInner(n, h); return svgBox(w + h * 0.1, h, s); }
// a pencil lying from (x, y) (its tip) up to the right
const pencil = (x, y, len, col = "#F472B6") => `<g transform="translate(${x} ${y}) rotate(-58)"><path d="M0 0L3 -1.1V1.1Z" fill="#F5D0A9" stroke="#92400E" stroke-width=".25"/><path d="M0 0L1 -.37V.37Z" fill="#334155"/>
  <rect x="3" y="-1.1" width="${len - 5}" height="2.2" fill="${col}" stroke="#9D174D" stroke-width=".25"/><rect x="${len - 2}" y="-1.1" width="2" height="2.2" rx=".5" fill="#818CF8" stroke="#4338CA" stroke-width=".25"/></g>`;

// ── the kinds ──
module.exports = {
  kinds: {
    /** An exercise card (the book's pink-triangle numbers): { n, text, aside: block beside the text, body: [blocks], inset: body beside the number, dot } */
    p115_ex: (b, ctx, page) => {
      const head = `<span class="mk">${esc(b.n)}${b.dot === false ? "" : "."}</span>`;
      const text = b.text != null ? `<div class="p115-ext">${ctx.md(b.text)}</div>` : "";
      const body = (b.body || []).map((x) => ctx.blockHtml(x, page)).join("");
      const aside = b.aside ? `<div class="p115-aside">${ctx.blockHtml(b.aside, page)}</div>` : "";
      return b.inset ? `<div class="ex p115-ex"><div class="p115-exr">${head}<div class="p115-exc">${text}${body}</div>${aside}</div></div>`
        : `<div class="ex p115-ex"><div class="p115-exr">${head}<div class="p115-exc">${text}</div>${aside}</div>${body}</div>`;
    },
    /** The book's green-square practice items: { items: [{ n, text, body }] } */
    p115_tasks: (b, ctx, page) => `<div class="p115-tasks">${b.items.map((it) => `<div class="p115-task"><span class="p115-sq">${esc(it.n)}</span><div class="p115-tc">${it.text != null ? `<div class="p115-tt">${ctx.md(it.text)}</div>` : ""}${(it.body || []).map((x) => ctx.blockHtml(x, page)).join("")}</div></div>`).join("")}</div>`,
    /** Labels each followed by a writing line: { rows: ["…"], lw: line width mm } */
    p115_lines: (b, ctx) => `<div class="p115-lines" style="grid-template-columns:auto ${b.lw || 22}mm${b.size ? `;font-size:${b.size}pt` : ""}">${b.rows.map((r) => `<span>${ctx.md(r)}</span><i></i>`).join("")}</div>`,
    /** (ক) (খ) … items: { items: [[label, text, block?]] } */
    p115_list: (b, ctx, page) => `<div class="p115-list">${b.items.map(([l, t, x]) => `<b>${esc(l)}</b><div>${ctx.md(t)}${x ? ctx.blockHtml(x, page) : ""}</div>`).join("")}</div>`,
    /** A pink fact card: { text, left: full width and left-aligned } */
    p115_fact: (b, ctx) => `<div class="p115-fact${b.left ? " left" : ""}">${ctx.md(b.text)}</div>`,
    /** A table whose cells may be blocks: { head?, rows, tone, widths: [%], small } (a cell: "markup" | block | [blocks] | "…") */
    p115_table: (b, ctx, page) => {
      const cell = (c, tag) => c === "…" ? `<${tag} class="gap"><i></i></${tag}>` : `<${tag}>${c == null ? "" : typeof c === "string" ? ctx.md(c) : Array.isArray(c) ? `<div class="p115-cc">${c.map((x) => typeof x === "string" ? `<span>${ctx.md(x)}</span>` : ctx.blockHtml(x, page)).join("")}</div>` : `<div class="p115-cc">${ctx.blockHtml(c, page)}</div>`}</${tag}>`;
      const cols = b.widths ? `<colgroup>${b.widths.map((w) => `<col style="width:${w}%">`).join("")}</colgroup>` : "";
      return `<table class="grid tone-${b.tone || "blue"} p115-t${b.small ? " small" : ""}"${b.style ? ` style="${b.style}"` : ""}>${cols}${b.head ? `<thead><tr>${b.head.map((h) => cell(h, "th")).join("")}</tr></thead>` : ""}<tbody>${b.rows.map((r) => `<tr>${r.map((c) => cell(c, "td")).join("")}</tr>`).join("")}</tbody></table>`;
    },
    /** A row of glasses filled to a fraction: { fills: [1, 1, .45], gw, gh } */
    p115_glasses: (b) => glassesSvg(b.fills, b.gw, b.gh),
    /** Two glasses, the second wider, water at the same height */
    p115_glasspair: (b) => { const h = b.h || 21; return svgBox(44, h + 2, glass(1, 1.2, 16, h - .6, { level: h * .42 }) + glass(21, 1, 22, h - .4, { level: h * .42 })); },
    /** Upright bottles: { items: ["small", "big"] } or { n } one-litre bottles with "১ লিটার" on each; h mm; top: a caption above */
    p115_bottles: (b, ctx) => {
      const list = b.items || Array(b.n).fill("litre");
      return `<div class="p115-bots" style="gap:${b.gap ?? 1.6}mm">${b.top ? `<b class="p115-btop">${ctx.md(b.top)}</b>` : ""}<div>${list.map((k) => bottleSvg(k, b.h || 20, k === "litre" ? "১ লিটার" : "")).join("")}</div></div>`;
    },
    /** A bottle tipped over the last of a row of glasses: { bottle: "small" | "big", fills } */
    p115_pour: (b) => {
      const fills = b.fills, gw = 9, gh = 11.5, gap = 1.6, top = 21.5, n = fills.length, kind = b.bottle || "small", Wu = BOTTLE_W[kind], bh = 19, k = bh / 26, a = 140;
      const gx = 0.3 + (n - 1) * (gw + gap) + gw / 2, mx = gx + .4, my = top - 3.6;
      const r = a * Math.PI / 180, cx = mx - 13 * k * Math.sin(r), cy = my + 13 * k * Math.cos(r);
      const W = Math.max(n * gw + (n - 1) * gap + .6, cx + 13 * k + 2), H = top + gh + 1;
      const pourBottle = `<g transform="translate(${f2(cx)} ${f2(cy)}) rotate(${a}) scale(${f2(k)}) translate(${-Wu / 2} -13)">${bottleUnits(kind)}</g>`;
      const stream = `<path d="M${f2(mx)} ${f2(my)}Q${f2(gx + .9)} ${f2(top - 1)} ${f2(gx + .4)} ${f2(top + gh * .45)}" fill="none" stroke="#6CCBF0" stroke-width="1.3" stroke-linecap="round" opacity=".9"/>`;
      return svgBox(W, H, fills.map((f, i) => glass(0.3 + i * (gw + gap), top, gw, gh, { f })).join("") + stream + pourBottle);
    },
    /** An arrow: { dir: "left" | "right" | "both", w, h, block: a fat filled arrow } */
    p115_arrow: (b) => {
      const w = b.w || 22, h = b.h || 6, col = b.color || "#1E2433";
      if (b.block) return svgBox(w, h, `<path d="M0 ${h / 2}L${h * .55} 0V${h * .3}H${w}V${h * .7}H${h * .55}V${h}Z" fill="${col}" transform="${b.dir === "right" ? `translate(${w} 0) scale(-1 1)` : ""}"/>`);
      const hd = h * .5, y = h / 2;
      return svgBox(w, h, `<line x1="${b.dir === "right" ? 1 : hd + .5}" y1="${y}" x2="${b.dir === "left" ? w - 1 : w - hd - .5}" y2="${y}" stroke="${col}" stroke-width=".7"/>`
        + (b.dir !== "right" ? `<path d="M0 ${y}L${hd * 1.5} ${y - hd * .7}V${y + hd * .7}Z" fill="${col}"/>` : "")
        + (b.dir !== "left" ? `<path d="M${w} ${y}L${w - hd * 1.5} ${y - hd * .7}V${y + hd * .7}Z" fill="${col}"/>` : ""));
    },
    /** Analog clocks in a row: { items: [{ h, m, s, empty, cap }], size, line: a writing line under each } */
    p115_clocks: (b, ctx) => `<div class="p115-clocks">${b.items.map((c) => `<div class="p115-ck">${clockSvg({ ...c, size: c.size || b.size || 34 })}${c.cap ? `<span class="p115-cap">${ctx.md(c.cap)}</span>` : ""}${b.line ? `<i class="p115-wl"></i>` : ""}</div>`).join("")}</div>`,
    /** The clock's three hands, named */
    p115_hands: (b) => {
      const P = [50, 37], L = (x1, y1, x2, y2, c, w) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
      const sa = 13 * Math.PI / 180, sx = f2(P[0] + 31 * Math.sin(sa)), sy = f2(P[1] - 31 * Math.cos(sa));
      const T = (x, y, a, c, t) => `<text x="${x}" y="${y}" text-anchor="${a}" font-family="Noto Sans Bengali" font-weight="700" font-size="5.4" fill="${c}">${t}</text>`;
      return svgBox(b.w || 76, (b.w || 76) * 50 / 112, `<g transform="scale(${f2((b.w || 76) / 112)})">${L(50, 39, 50, 8, "#DC2626", 3.4)}${L(44, 37, 70, 37, "#1E3A8A", 4.6)}
        ${L(f2(P[0] - 5 * Math.sin(sa)), f2(P[1] + 5 * Math.cos(sa)), sx, sy, "#16A34A", 1.2)}<circle cx="50" cy="37" r="2.6" fill="#fff" stroke="#1E2433" stroke-width="1.3"/>
        ${T(45, 10, "end", "#B91C1C", "মিনিটের কাঁটা")}${T(sx + 3, 8, "start", "#15803D", "সেকেন্ডের কাঁটা")}${T(74, 39, "start", "#1E3A8A", "ঘণ্টার কাঁটা")}</g>`);
    },
    /** The book's small "unit" card: { head, body } */
    p115_unit: (b, ctx) => `<div class="p115-unit"><b>${ctx.md(b.head)}</b><span>${ctx.md(b.body)}</span></div>`,
    /** Digital clocks: { items: ["11:35", …], h, line } */
    p115_lcds: (b) => `<div class="p115-clocks">${b.items.map((t) => `<div class="p115-ck">${lcdSvg(t, b.h || 14)}${b.line ? `<i class="p115-wl"></i>` : ""}</div>`).join("")}</div>`,
    /** Names in a cycle with arrows going round (clockwise from the top): { items, nums, center, tone, hi, rx, ry, bw, bh, font } */
    p115_cycle: (b, ctx) => {
      const { items, nums, center, tone = "yellow", hi = -1, rx = 30, ry = 26, bw = 24, bh = 7.4, font = 10.5 } = b;
      const T = { yellow: ["#FEF9C3", "#CA8A04", "#713F12"], green: ["#DCFCE7", "#16A34A", "#14532D"], pink: ["#FCE7F3", "#DB2777", "#831843"] }[tone];
      const n = items.length, padX = nums ? 8 : 1, padY = nums ? 6.5 : 1, W = 2 * rx + bw + 2 * padX, H = 2 * ry + bh + 2 * padY, cx = W / 2, cy = H / 2;
      const th = (i) => (-90 + i * 360 / n) * Math.PI / 180, P = (t) => [cx + rx * Math.cos(t), cy + ry * Math.sin(t)];
      const inBox = (p, i, m) => { const c = P(th(i)); return Math.abs(p[0] - c[0]) < bw / 2 + m && Math.abs(p[1] - c[1]) < bh / 2 + m; };
      const id = `p115ah${tone}${n}`;
      let arcs = "";
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n, step = 0.004;
        let t0 = th(i); while (inBox(P(t0), i, 1.1)) t0 += step;
        let t1 = th(i) + 2 * Math.PI / n; while (inBox(P(t1), j, 1.5)) t1 -= step;
        if (t1 - t0 < 0.02) continue;
        const pts = Array.from({ length: 13 }, (_, q) => P(t0 + (t1 - t0) * q / 12).map(f2).join(" "));
        arcs += `<path d="M${pts.join("L")}" fill="none" stroke="#1E2433" stroke-width=".55" stroke-linejoin="round" marker-end="url(#${id})"/>`;
      }
      const boxes = items.map((t, i) => { const [x, y] = P(th(i)); return `<span class="p115-cb${i === hi ? " hi" : ""}" style="left:${f2(x)}mm;top:${f2(y)}mm;width:${bw}mm;height:${bh}mm">${esc(t)}</span>`; }).join("");
      const numbers = nums ? nums.map((v, i) => { const t = th(i), c = Math.cos(t), s = Math.sin(t), ext = Math.abs(c) * bw / 2 + Math.abs(s) * bh / 2 + 3.4; return `<span class="p115-cn" style="left:${f2(cx + (rx + ext) * c)}mm;top:${f2(cy + (ry + ext * .78) * s)}mm">${esc(v)}</span>`; }).join("") : "";
      return `<div class="p115-cyc" style="width:${f2(W)}mm;height:${f2(H)}mm;--cb:${T[0]};--ck:${T[1]};--ct:${T[2]};font-size:${font}pt">
        <svg class="p115-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}"><defs><marker id="${id}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5.2" markerHeight="5.2" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#1E2433"/></marker></defs>
        <ellipse cx="${f2(cx)}" cy="${f2(cy)}" rx="${f2(rx - bh * .9)}" ry="${f2(ry - bh * .9)}" fill="${T[0]}" opacity=".45"/>${arcs}</svg>${boxes}${numbers}
        <span class="p115-cc2">${ctx.md(center)}</span></div>`;
    },
    /** Drawn money: { items: [100, { v: 500, back: true }, { v: 5, coin: true }], back, w: note width mm, cw: coin size mm, gap, maxw } */
    p115_cash: (b) => `<div class="p115-cash" style="gap:${b.gap ?? 1.8}mm;justify-content:${b.justify || "center"}${b.maxw ? `;max-width:${b.maxw}mm` : ""}">${b.items.map((it) => {
      const o = typeof it === "number" ? { v: it } : it, bk = o.back ?? b.back;
      return o.coin ? coinSvg(o.v, bk, b.cw || 15) : noteSvg(o.v, bk, b.w || 34);
    }).join("")}</div>`,
    /** Objects scattered in a frame (exact counts): { h, items: [[sticker, x%, y%, size mm, rotate°, flip]] } */
    p115_scatter: (b) => `<div class="frame p115-scat" style="height:${b.h}mm">${b.items.map(([name, x, y, s, rot = 0, flip]) => `<span class="p115-sc" style="left:${x}%;top:${y}%;transform:translate(-50%,-50%) rotate(${rot}deg)${flip ? " scaleX(-1)" : ""}">${item(name, s)}</span>`).join("")}</div>`,
    /** Tally marks for n: { n, h } */
    p115_tally: (b) => tallySvg(b.n, b.h || 8),
    /** The tally lesson: boxes 1 … 6 with a pencil drawing the next stroke and the number below; w = one box's width in mm */
    p115_tallyboxes: (b) => `<div class="p115-tb">${Array.from({ length: b.n || 6 }, (_, i) => {
      const n = i + 1, h = 8, { s, w } = tallyInner(n, h, 3, 6.5), W = b.w || 22;
      return `<div class="p115-tbi"><svg class="p115-svg" width="${W}mm" height="${f2(W * 22 / 30)}mm" viewBox="0 0 30 22"><rect x="1" y="4.5" width="27" height="12" rx="1.6" fill="#fff" stroke="#1E2433" stroke-width=".55"/>${s}${pencil(3 + w + 1.6, 15.2, 15)}</svg><b>${bn(n)}</b></div>`;
    }).join("")}</div>`,
    /** Colour dots: { colors: ["#…"], size } */
    p115_swatches: (b) => `<div class="p115-sw">${b.colors.map((c) => `<i style="background:${c};width:${b.size || 7}mm;height:${b.size || 7}mm"></i>`).join("")}</div>`,
    /** Stickers in a row (one each): { items: ["crow", …], size } */
    p115_items: (b) => `<div class="p115-items" style="gap:${b.gap ?? 3}mm">${b.items.map((n) => item(n, b.size || 12)).join("")}</div>`,
  },
  css: `
.p115-svg { display: block; overflow: visible; flex: none }
.p115-it { display: inline-flex; align-items: center; justify-content: center; flex: none } .p115-it img { max-width: 100%; max-height: 100%; object-fit: contain } .p115-it.band { overflow: hidden } .p115-it.band img { width: 100%; height: 100%; max-height: none; object-fit: cover } .p115-it i { font-family: 'Noto Color Emoji'; font-style: normal; line-height: 1 }
.p115-exr { display: flex; gap: 1.6mm; align-items: flex-start } .p115-ex .mk { flex: 0 0 6.4mm } .p115-exc { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2mm }
.p115-ext { font: 500 12.5pt/1.45 'Noto Sans Bengali' } .p115-aside { flex: none; display: flex; align-items: center }
.p115-tasks { display: flex; flex-direction: column; gap: 2.2mm }
.p115-task { display: flex; gap: 2.6mm; align-items: flex-start; background: #F7FEE7; border: .5mm dashed #A3E635; border-radius: 4mm; padding: 2.2mm 3.4mm 2.4mm 2.6mm }
.p115-sq { flex: none; width: 7.4mm; height: 7.4mm; border-radius: 1.8mm; background: linear-gradient(135deg, #A3E635, #65A30D); color: #fff; font: 800 13pt/8mm 'Baloo Da 2'; text-align: center; box-shadow: 0 .6mm 0 #4D7C0F; margin-top: .3mm }
.p115-tc { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1.8mm } .p115-tt { font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.p115-lines { display: grid; gap: 2.4mm 2.6mm; align-items: end; font: 500 12.5pt/1.35 'Noto Sans Bengali'; align-self: flex-start } .p115-lines i { display: block; border-bottom: .5mm dashed #94A3B8; height: 0; margin-bottom: 1.3mm }
.p115-list { display: grid; grid-template-columns: 9.5mm 1fr; gap: 1.6mm .6mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .p115-list > b { font: 700 12.5pt/1.45 'Baloo Da 2'; color: #EA580C } .p115-list > div { display: flex; flex-direction: column; gap: 1.4mm }
.p115-fact { align-self: center; text-align: center; font: 700 14pt/1.5 'Baloo Da 2'; color: #831843; background: linear-gradient(135deg, #FCE7F3, #FFF5FA); border: .6mm solid #F9A8D4; border-radius: 4mm; padding: 1.6mm 6mm 1.2mm; box-shadow: 0 1mm 0 #FBCFE8 }
.p115-fact.left { align-self: stretch; text-align: left; font: 600 12.5pt/1.5 'Noto Sans Bengali'; color: #4A1030; padding: 2.4mm 4.6mm 2mm }
.p115-t td, .p115-t th { vertical-align: middle } .p115-t td { height: auto } .p115-cc { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .8mm } .p115-cc > span { line-height: 1.25 }
.p115-t td .wline { width: 9mm !important } .p115-t b { color: #DC2626 }
.p115-bots { display: flex; flex-direction: column; align-items: center } .p115-bots > div { display: flex; gap: inherit; align-items: flex-end } .p115-btop { font: 700 10.5pt 'Baloo Da 2'; color: #1E3A8A; margin-bottom: .6mm }
.p115-clocks { display: flex; justify-content: space-around; align-items: flex-start; gap: 3mm }
.p115-ck { display: flex; flex-direction: column; align-items: center; gap: 1.4mm } .p115-cap { font: 700 12.5pt 'Baloo Da 2'; color: #1E2433 } .p115-wl { display: block; width: 26mm; border-bottom: .5mm dashed #94A3B8; margin-top: 3mm }
.p115-unit { display: flex; flex-direction: column; align-items: center; align-self: center; position: relative; padding-top: 4mm }
.p115-unit b { position: absolute; top: 0; font: 700 11pt 'Baloo Da 2'; color: #fff; background: linear-gradient(135deg, #38BDF8, #0284C7); padding: .8mm 6mm .4mm; border-radius: 2.4mm; box-shadow: 0 .6mm 0 #075985; white-space: nowrap }
.p115-unit span { font: 600 11pt 'Noto Sans Bengali'; background: #fff; border: .5mm solid #7DD3FC; border-radius: 3mm; padding: 5mm 7mm 1.6mm; white-space: nowrap }
.p115-cyc { position: relative; flex: none; align-self: center } .p115-cyc > svg { position: absolute; left: 0; top: 0 }
.p115-cb { position: absolute; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; white-space: nowrap; font-weight: 700; font-family: 'Noto Sans Bengali'; color: var(--ct); background: var(--cb); border: .45mm solid var(--ck); border-radius: 1.8mm; box-shadow: 0 .6mm 0 color-mix(in srgb, var(--ck) 35%, transparent); line-height: 1 }
.p115-cb.hi { border-width: .9mm; box-shadow: 0 0 0 .7mm #fff, 0 0 0 1.2mm var(--ck) }
.p115-cn { position: absolute; transform: translate(-50%, -50%); font: 700 10.5pt 'Baloo Da 2'; color: #64748B }
.p115-cc2 { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font: 700 12pt/1.25 'Baloo Da 2'; color: var(--ct); text-align: center; white-space: nowrap }
.p115-cash { display: flex; flex-wrap: wrap; align-items: center } .p115-note { filter: drop-shadow(0 .5mm 0 rgba(0,0,0,.12)) }
.p115-scat { position: relative; padding: 0; background: linear-gradient(#FFFFFF, #F8FAFC) }
.p115-sc { position: absolute; display: block; line-height: 0 }
.p115-tb { display: grid; grid-template-columns: repeat(3, auto); gap: 3mm 3mm; justify-content: center; align-content: center } .p115-tbi { display: flex; flex-direction: column; align-items: center } .p115-tbi b { font: 800 13pt/1 'Baloo Da 2'; color: var(--c); margin-top: -1mm }
.p115-sw { display: flex; gap: 2.4mm; padding: .6mm 0 } .p115-sw i { display: inline-block; border-radius: 50%; border: .6mm solid #fff; box-shadow: 0 0 0 .35mm #94A3B8, 0 .6mm 0 .35mm rgba(0,0,0,.1) }
.p115-items { display: flex; align-items: center; padding: .4mm 0 }
`,
};
