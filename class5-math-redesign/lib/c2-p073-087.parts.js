// Own kinds of content for printed pp. 73–87 (chapter 3, গুণ: গুণের ধারণা, the 5, 2, 3 and 4 times tables).
// Every count is drawn here, so it is exact: things on plates or trays (one ChatGPT sticker repeated), the tally under
// each group, the 4 × 3 pupils on their benches, the 100-dot sheet with the book's L-shaped paper strip.
//   p073_groups  { sticker, emoji, per, n, rows?: [2,1,2], dish: plate|tray|leaves|none, tone: blue|pink, size, pile?, fan?, tally? }
//   p073_ldots   { r, c, cell, plain? }   10 × 10 dots; the L strip covers column c and row r, so r × c dots stand apart
//   p073_namta   { a, tone }               the "a এর গুণের নামতা" card (a×1 … a×10)
//   p073_scroll  { a, from, to }           the blue scroll: a × (m) = □
//   p073_rows    { items: [{ left: [blocks], eq }], eqW, lines? }   pictures on the left, a sentence on the right
//   p073_class   { benches, per, size }    the classroom: benches of pupils (stickers pupil-boy, pupil-girl)
//   p073_parts   p76's 3 × 4 = 12 with the names of its parts
//   p073_cards   { rows: [{ label, cards, tone }] }   p82's multiplication cards (front pink, back blue)
//   p073_eqbox   { text }                  a sentence in a box (markup)
//   p073_wbox    { h, w?, label? }         an empty box to write a sentence in
//   p073_qs      { items: [{ n, text }] }  the book's green-square problems (n "" for the unnumbered one on p80)
const ICON = (ctx, name) => { const f = name && ctx.picFile(`sticker-${name}`); return f ? "file://" + f.file : null; };

function item(ctx, name, emoji, size, style = "", tilt = 0) {
  const img = ICON(ctx, name);
  return `<span class="p073-it" style="width:${size}mm;height:${size}mm;${style}">${img ? `<img src="${img}">` : `<i style="font-size:${(size * 2.3).toFixed(1)}pt${tilt ? `;transform:rotate(${tilt}deg)` : ""}">${emoji}</i>`}</span>`;
}
const PILE = { 1: [1], 2: [2], 3: [1, 2], 4: [2, 2], 5: [2, 3], 6: [3, 3] };
const LEAVES = `<svg class="p073-leafsvg" viewBox="-25 -25 50 50">${[200, 245, 290, 335, 20, 70, 160, 115].map((a, i) => `<path d="M0 0C6 -4.6 15 -4.6 23 0C15 4.6 6 4.6 0 0Z" fill="${i % 2 ? "#2F8F3A" : "#3FA34D"}" stroke="#1F6B2A" stroke-width=".5" transform="rotate(${a})"/><path d="M2 0H20" stroke="#1F6B2A" stroke-width=".4" transform="rotate(${a})"/>`).join("")}</svg>`;
const TRAY = `<svg class="p073-traysvg" viewBox="0 0 100 30" preserveAspectRatio="none"><path d="M0 12L9 2H100L91 12Z" fill="#FDE68A"/><rect x="0" y="12" width="91" height="17" fill="#FBBF24"/><path d="M91 12L100 2V19L91 29Z" fill="#D97706"/>
  <path d="M0 12L9 2H100L91 12ZM0 12V29H91V12M91 29L100 19V2" fill="none" stroke="#92400E" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>`;

/** One group: `per` things on a plate (or a tray, or leaves), with the book's tally of dots under it if asked. */
function group(b, ctx) {
  const per = b.per, size = b.size || 7, dish = b.dish || "plate";
  let things;
  if (b.fan) { // a bunch (bananas): fanned out from one stem
    const w = size * (1 + (per - 1) * 0.36);
    things = `<span class="p073-fan" style="width:${w.toFixed(2)}mm;height:${(size * 1.08).toFixed(2)}mm">${Array.from({ length: per }, (_, i) =>
      item(ctx, b.sticker, b.emoji, size, `position:absolute;left:${((w - size) / 2).toFixed(2)}mm;top:0;transform:rotate(${((i - (per - 1) / 2) * 20).toFixed(1)}deg);transform-origin:50% 6%`, b.tilt)).join("")}</span>`;
  } else {
    const pile = b.pile || PILE[per];
    if (pile.reduce((x, y) => x + y, 0) !== per) throw new Error(`p073_groups: pile ${pile} is not ${per}`);
    things = `<span class="p073-pile">${pile.map((k, r) => `<span class="p073-prow" style="--ov:${(-size * (b.squeeze ?? 0.14)).toFixed(2)}mm;${r ? `margin-top:${(-size * (b.lift ?? 0.45)).toFixed(2)}mm;` : ""}z-index:${r + 1}">${Array.from({ length: k }, () => item(ctx, b.sticker, b.emoji, size)).join("")}</span>`).join("")}</span>`;
  }
  const under = dish === "plate" ? `<span class="p073-dish" style="height:${(size * (b.dishH ?? 0.9)).toFixed(2)}mm"></span>`
    : dish === "tray" ? TRAY : dish === "leaves" ? LEAVES : "";
  const tally = b.tally ? `<span class="p073-tally">${Array.from({ length: per }, () => "<i></i>").join("")}</span>` : "";
  return `<span class="p073-gw"><span class="p073-g p073-${dish} p073-t-${b.tone || "blue"}" style="--sz:${size}mm">${under}${things}</span>${tally}</span>`;
}

function ldots({ r, c, cell = 4.8, plain = false }, ctx) {
  const R = 10, C = 10, s = cell, full = r >= R && c >= C;
  const ext = full ? 0 : s * 0.95, gap = full ? s * 0.4 : 0, sw = s, lab = !full;
  const ox = s * 0.95 + 0.6, oy = s * 0.95 + 0.6;
  const W = ox + C * s + (full ? gap + sw : 0) + 0.8, H = oy + R * s + (full ? gap + sw : 0) + 0.8;
  let g = `<rect x="${ox}" y="${oy}" width="${C * s}" height="${R * s}" fill="#fff"/>`;
  if (!plain) g += `<rect x="${ox}" y="${oy}" width="${c * s}" height="${r * s}" style="fill:var(--s)"/>`;
  for (let i = 1; i < 10; i++) g += `<path d="M${ox + i * s} ${oy}v${R * s}M${ox} ${oy + i * s}h${C * s}" stroke="#94A3B8" stroke-width=".25"/>`;
  g += `<rect x="${ox}" y="${oy}" width="${C * s}" height="${R * s}" fill="none" stroke="#334155" stroke-width=".4"/>`;
  for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) {
    const on = !plain && i < r && j < c;
    g += `<circle cx="${(ox + (j + 0.5) * s).toFixed(2)}" cy="${(oy + (i + 0.5) * s).toFixed(2)}" r="${(s * 0.36).toFixed(2)}" ${on ? `style="fill:var(--c)"` : `fill="#1E2433"`}/>`;
  }
  const sx = ox + c * s + (c >= C ? gap : 0), sy = oy + r * s + (r >= R ? gap : 0), x0 = ox - (full ? 0 : ext), y0 = oy - (full ? 0 : ext);
  const L = `M${x0} ${sy}H${sx}V${y0}H${sx + sw}V${sy + sw}H${x0}Z`;
  g += `<path d="${L}" fill="rgba(30,36,51,.16)" transform="translate(.5 .7)"/><path d="${L}" fill="#FEF9C3" stroke="#CA8A04" stroke-width=".45" stroke-linejoin="round"/>`;
  if (lab) g += `<text x="${ox + (c * s) / 2}" y="${oy - s * 0.22}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${s * 1.05}" style="fill:var(--d)">${ctx.bn(c)}</text>
    <text x="${ox - s * 0.5}" y="${oy + (r * s) / 2 + s * 0.36}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${s * 1.05}" style="fill:var(--d)">${ctx.bn(r)}</text>`;
  return `<svg class="p073-ldots" width="${W.toFixed(2)}mm" height="${H.toFixed(2)}mm" viewBox="0 0 ${W.toFixed(2)} ${H.toFixed(2)}">${g}</svg>`;
}

const ARROW = `<svg class="p073-arr" viewBox="0 0 24 16"><path d="M1 5.5H13V1L23 8L13 15V10.5H1Z" fill="var(--c)" stroke="var(--d)" stroke-width="1" stroke-linejoin="round"/></svg>`;

module.exports = {
  kinds: {
    p073_groups: (b, ctx) => {
      const n = b.n || 1, rows = b.rows || [n];
      if (rows.reduce((x, y) => x + y, 0) !== n) throw new Error(`p073_groups: rows ${rows} is not ${n}`);
      let k = 0;
      return `<div class="p073-groups" style="align-items:${b.align || "center"};${b.h ? `min-height:${b.h}mm;` : ""}">${rows.map((m, i) => `<div class="p073-grow" style="gap:${b.gap ?? 4}mm;justify-content:${b.justify || "center"};${i ? `margin-top:${-(b.overlap ?? 0)}mm;` : ""}">${Array.from({ length: m }, () => (k++, group(b, ctx))).join("")}</div>`).join("")}</div>`;
    },
    p073_ldots: (b, ctx) => `<div class="p073-ld" style="justify-content:${b.justify || "center"}">${ldots(b, ctx)}</div>`,
    p073_namta: (b, ctx) => `<div class="p073-namta tone-${b.tone || "blue"}"><div class="p073-nh">${ctx.bn(b.a)} এর গুণের নামতা</div>${Array.from({ length: 10 }, (_, i) => `<div class="p073-nl">${ctx.bn(b.a)}×${ctx.bn(i + 1)}=${ctx.bn(b.a * (i + 1))}</div>`).join("")}</div>`,
    p073_scroll: (b, ctx) => {
      let rows = "";
      for (let m = b.from || 5; m <= (b.to || 10); m++) rows += `<div class="p073-sr"><span>${ctx.bn(b.a)}</span><span class="p073-op">×</span><span class="p073-circ">${ctx.bn(m)}</span><span class="p073-op">=</span><span class="abox"></span></div>`;
      return `<div class="p073-scroll"><div class="p073-paper">${rows}</div><svg class="p073-curl" viewBox="0 0 100 24" preserveAspectRatio="none"><path d="M0 0H100C95.5 7 95.5 16 100 24H9C3 24 0 19 0 12Z" fill="#7DD3FC" stroke="#0EA5E9" stroke-width="1" vector-effect="non-scaling-stroke"/><path d="M0 0C0 8 4 12 9 12" fill="none" stroke="#0EA5E9" stroke-width="1" vector-effect="non-scaling-stroke"/></svg></div>`;
    },
    p073_rows: (b, ctx, page) => `<div class="p073-rows${b.lines ? " lined" : ""}">${b.items.map((it) => `<div class="p073-rw" style="min-height:${b.minH || 0}mm"><div class="p073-rl">${it.left.map((x) => ctx.blockHtml(x, page)).join("")}</div><div class="p073-re${it.right ? " blocks" : ""}" style="width:${b.eqW || 44}mm">${it.right ? it.right.map((x) => ctx.blockHtml(x, page)).join("") : ctx.md(it.eq)}</div></div>`).join("")}</div>`,
    p073_class: (b, ctx) => {
      const benches = b.benches || 4, per = b.per || 3, size = b.size || 12, kids = [["pupil-boy", "👦"], ["pupil-girl", "👧"]];
      let out = "";
      for (let r = 0; r < benches; r++) { // from the back bench to the front one
        const k = 0.74 + 0.26 * (r / (benches - 1 || 1)), sz = size * k, w = per * sz * 1.02 + sz * 0.5;
        const desk = `<svg class="p073-desk" style="width:${w.toFixed(2)}mm;height:${(sz * 0.42).toFixed(2)}mm" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 6L4 0H100L96 6Z" fill="#E0A066" stroke="#8A4B1C" stroke-width=".8" vector-effect="non-scaling-stroke"/><rect x="0" y="6" width="96" height="9" fill="#B86B2E" stroke="#8A4B1C" stroke-width=".8" vector-effect="non-scaling-stroke"/><path d="M96 6L100 0V9L96 15Z" fill="#9A5520" stroke="#8A4B1C" stroke-width=".8" vector-effect="non-scaling-stroke"/>
          ${Array.from({ length: per }, (_, i) => { const cx = (100 / per) * (i + 0.5); return `<path d="M${cx - 9} 4.6L${cx - 7} 1H${cx + 7}L${cx + 9} 4.6Z" fill="#fff" stroke="#94A3B8" stroke-width=".6" vector-effect="non-scaling-stroke"/><path d="M${cx} 1V4.6" stroke="#94A3B8" stroke-width=".6" vector-effect="non-scaling-stroke"/>`; }).join("")}</svg>`;
        const row = Array.from({ length: per }, (_, i) => { const [name, em] = kids[(i + r) % 2]; return item(ctx, name, em, sz); }).join("");
        out += `<div class="p073-bench" style="margin-left:${((benches - 1 - r) * (b.step ?? 7)).toFixed(2)}mm;${r ? `margin-top:${(-sz * 0.18).toFixed(2)}mm;` : ""}z-index:${r + 1}"><div class="p073-kids" style="width:${w.toFixed(2)}mm">${row}</div>${desk}</div>`;
      }
      return `<div class="p073-class">${out}</div>`;
    },
    p073_parts: (b, ctx) => `<div class="p073-parts">
      <span class="p073-pn a">৩</span><span class="p073-po">×</span><span class="p073-pn b">৪</span><span class="p073-po">=</span><span class="p073-pn c">১২</span>
      <i class="a"></i><i></i><i class="b"></i><i></i><i class="c"></i>
      <span class="p073-pl a">প্রত্যেক দলে<br>বস্তুর সংখ্যা</span><span></span><span class="p073-pl b">দলের<br>সংখ্যা</span><span></span><span class="p073-pl c">মোট বস্তুর<br>সংখ্যা</span></div>`,
    p073_cards: (b, ctx) => `<div class="p073-cards">${b.rows.map((r) => `<div class="p073-cr"><span class="p073-cl">${ctx.md(r.label)}</span>${ARROW}${r.cards.map((c) => `<span class="p073-card ${r.tone}">${ctx.esc(c)}</span>`).join("")}</div>`).join("")}</div>`,
    p073_eqbox: (b, ctx) => `<div class="p073-eqbox"${b.w ? ` style="width:${b.w}mm"` : ""}>${ctx.md(b.text)}</div>`,
    p073_wbox: (b, ctx) => `<div class="p073-wbox" style="height:${b.h || 14}mm;${b.w ? `width:${b.w}mm;` : ""}">${b.label ? `<span>${ctx.md(b.label)}</span>` : ""}</div>`,
    p073_qs: (b, ctx) => `<div class="p073-qs">${b.items.map((q) => `<div class="p073-q"><span class="p073-sq">${ctx.esc(q.n || "")}</span><span class="p073-qt">${ctx.md(q.text)}</span></div>`).join("")}</div>`,
  },
  css: `
.p073-it { display: inline-flex; align-items: center; justify-content: center; flex: none; position: relative }
.p073-it img { max-width: 100%; max-height: 100%; object-fit: contain; display: block } .p073-it i { font-family: 'Noto Color Emoji'; font-style: normal; line-height: 1 }
.p073-groups { display: flex; flex-direction: column; justify-content: center } .p073-grow { display: flex; flex-wrap: nowrap; align-items: flex-end }
.p073-gw { display: inline-flex; flex-direction: column; align-items: center; gap: 1.4mm; flex: none }
.p073-g { position: relative; display: inline-flex; flex-direction: column; align-items: center; justify-content: flex-end }
.p073-pile { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center }
.p073-prow { position: relative; display: flex } .p073-prow > .p073-it + .p073-it { margin-left: var(--ov) }
.p073-fan { position: relative; z-index: 1; display: block }
.p073-plate { padding: 0 calc(var(--sz) * .5) calc(var(--sz) * .16) }
.p073-dish { position: absolute; left: 0; right: 0; bottom: 0; border-radius: 50%; background: radial-gradient(ellipse at 50% 45%, #fff 0 34%, var(--pl) 52% 100%); border: .45mm solid var(--pd); box-shadow: 0 .7mm 0 var(--pd) }
.p073-t-blue { --pl: #CDEBF8; --pd: #6FB3D4 } .p073-t-pink { --pl: #FAD3EA; --pd: #D9539A } .p073-t-yellow { --pl: #FEF0B8; --pd: #D9A21B }
.p073-tray { padding: 0 calc(var(--sz) * .5) calc(var(--sz) * .55) calc(var(--sz) * .2) }
.p073-traysvg { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: calc(var(--sz) * .95); display: block }
.p073-leaves { padding: calc(var(--sz) * .45) calc(var(--sz) * .7) }
.p073-leafsvg { position: absolute; left: -4%; top: -6%; width: 108%; height: 112% }
.p073-tally { display: flex; flex-direction: column; border: .45mm solid #1E2433; border-radius: .8mm; background: #fff }
.p073-tally i { width: 3.8mm; height: 3.8mm; background: radial-gradient(circle, var(--c) 0 1.25mm, transparent 1.4mm) } .p073-tally i + i { border-top: .35mm solid #1E2433 }
.p073-ld { display: flex } svg.p073-ldots { display: block; overflow: visible }
.p073-namta { border: .7mm solid var(--tc); border-radius: 4mm; overflow: hidden; background: var(--tb); box-shadow: 0 1.2mm 0 var(--tl); text-align: center }
.p073-nh { background: var(--tc); color: #fff; font: 800 12.5pt/1.2 'Baloo Da 2'; padding: 1.8mm 2mm 1.2mm }
.p073-nl { font: 700 13pt/1 'Baloo Da 2'; padding: 1.55mm 0 .9mm; letter-spacing: .3pt } .p073-nl:nth-child(odd) { background: #fff }
.p073-scroll { position: relative; padding-bottom: 8mm }
.p073-paper { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 1.6mm; padding: 4mm 6mm 6mm; background: #fff; border: 2.2mm solid #7DD3FC; border-bottom: 0; border-radius: 3.4mm 3.4mm 0 0; box-shadow: inset 0 0 0 .3mm #0EA5E9 }
.p073-curl { position: absolute; z-index: 2; left: 0; bottom: 0; width: 100%; height: 10mm; display: block }
.p073-sr { display: flex; align-items: center; justify-content: center; align-self: stretch; gap: 2.6mm; font: 800 14pt/1 'Baloo Da 2'; background: #FEFCE8; border-radius: 2mm; padding: .8mm 2.4mm }
.p073-sr .p073-op { color: var(--c) } .p073-sr .abox { width: 11mm; height: 8mm; margin: 0 0 0 1mm; background: #fff }
.p073-circ { display: inline-flex; align-items: center; justify-content: center; min-width: 8.6mm; height: 8.6mm; padding: 1mm .6mm 0; border-radius: 50%; border: .5mm solid var(--c); color: var(--d); background: var(--s) }
.p073-rows { display: flex; flex-direction: column } .p073-rw { display: flex; align-items: center; gap: 3mm; padding: 1.2mm 0 }
.p073-rows.lined .p073-re { border-top: .45mm dashed #94A3B8; border-bottom: .45mm dashed #94A3B8; align-self: stretch; display: flex; align-items: center; justify-content: center }
.p073-rows.lined .p073-rw + .p073-rw .p073-re { border-top: 0 }
.p073-rl { flex: 1; min-width: 0; display: flex; flex-direction: column } .p073-re { flex: none; text-align: right; font: 800 14.5pt 'Baloo Da 2'; white-space: nowrap }
.p073-re .abox { width: 13mm; height: 8.4mm; vertical-align: -2.4mm } .p073-re.blocks { display: flex; flex-direction: column; gap: 2mm; text-align: left; font: inherit; white-space: normal }
.p073-class { display: flex; flex-direction: column; align-items: flex-start }
.p073-bench { position: relative; display: flex; flex-direction: column; align-items: center } .p073-kids { display: flex; justify-content: space-around; padding: 0 1mm }
svg.p073-desk { display: block; margin-top: -2.2mm; position: relative; z-index: 2 }
.p073-parts { display: inline-grid; grid-template-columns: auto auto auto auto auto; gap: 1mm 5mm; align-items: center; justify-items: center; align-self: flex-start; background: #fff; border: .6mm solid var(--c); border-radius: 4mm; padding: 2.6mm 6mm 2.4mm; box-shadow: 0 1.2mm 0 var(--s) }
.p073-pn { font: 800 17pt/1 'Baloo Da 2'; padding: 1.2mm 3mm .4mm; border-radius: 2.4mm; color: #fff } .p073-po { font: 800 17pt/1 'Baloo Da 2'; color: #64748B }
.p073-pn.a { background: #9333EA } .p073-pn.b { background: #16A34A } .p073-pn.c { background: #EA580C }
.p073-parts i { width: 0; height: 6mm } .p073-parts i.a, .p073-parts i.b, .p073-parts i.c { width: 1mm; background: currentColor; position: relative }
.p073-parts i.a::after, .p073-parts i.b::after, .p073-parts i.c::after { content: ""; position: absolute; left: -1.4mm; bottom: -1.6mm; border: 1.9mm solid transparent; border-top: 2.2mm solid currentColor; border-bottom: 0 }
.p073-parts .a { color: #9333EA } .p073-parts .b { color: #16A34A } .p073-parts .c { color: #EA580C }
.p073-parts .p073-pn { color: #fff }
.p073-pl { font: 700 10.5pt/1.3 'Noto Sans Bengali'; text-align: center; margin-top: 1mm }
.p073-cards { display: flex; flex-direction: column; gap: 3mm; padding-left: 2mm } .p073-cr { display: flex; align-items: center; gap: 5mm }
.p073-cl { width: 30mm; font: 700 13pt 'Baloo Da 2' } svg.p073-arr { width: 8mm; height: 5.4mm; flex: none }
.p073-card { width: 36mm; height: 13mm; display: inline-flex; align-items: center; justify-content: center; font: 800 16pt/1 'Baloo Da 2'; border-radius: 2.6mm; border: .6mm solid; box-shadow: 0 1mm 0 rgba(0,0,0,.12); padding-top: .8mm }
.p073-card.pink { background: #FCE7F3; border-color: #DB2777; color: #9D174D } .p073-card.blue { background: #E0F2FE; border-color: #0284C7; color: #075985 }
.p073-eqbox { background: #fff; border: .6mm solid var(--c); border-radius: 3mm; padding: 2mm 4mm 1.4mm; text-align: center; font: 800 15pt/1.4 'Baloo Da 2'; box-shadow: 0 1mm 0 var(--s); white-space: nowrap }
.p073-eqbox .wline { width: 11mm !important; border-bottom-color: #1E2433 }
.p073-wbox { position: relative; background: #fff; border: .6mm solid var(--c); border-radius: 3mm; box-shadow: 0 1mm 0 var(--s); flex: none }
.p073-wbox span { position: absolute; left: 0; right: 0; top: 1.4mm; text-align: center; font: 700 12.5pt 'Baloo Da 2'; color: var(--d) }
.p073-qs { display: flex; flex-direction: column; gap: 2mm; background: #F7FEE7; border: .5mm dashed #A3E635; border-radius: 4mm; padding: 2.6mm 3.4mm }
.p073-q { display: grid; grid-template-columns: 9mm 1fr; align-items: start; font: 500 12.5pt/1.5 'Noto Sans Bengali' }
.p073-sq { width: 6.4mm; height: 6.4mm; margin-top: .9mm; display: inline-flex; align-items: center; justify-content: center; background: #A3E635; border-radius: 1.4mm; color: #365314; font: 800 11pt/1 'Baloo Da 2'; padding-top: .6mm; box-shadow: 0 .6mm 0 #65A30D }
`,
};
