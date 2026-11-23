// Own kinds of content for printed pp. 78–90 (chapter ৭ গুণ ও ভাগের সম্পর্ক, chapter ৮ যোগ, বিয়োগ, গুণ ও ভাগসংক্রান্ত সমস্যা).
// The maths is drawn here by code: the fact trees, the গুণ | ভাগ table, the book's written working with its boxes, the
// under-bracket of "১২ ÷ ২ × ৬", the check with circles and arrows, the step banners, the five pencils, the wheel puzzle.
// Extra markup in every text of these kinds (besides the core's □ [[x]] {{a/b}} ___ **b**):
//   ▭ a wide empty box (the book's long answer boxes), ▢ a small square box (for a sign), ▣ a big square box (p79's model)
//
//   c3p078_gv       { cols: [{ head, lines, two? }], heads: ["গুণ", "ভাগ"] }  p78's table: the গুণ column, then the ভাগ columns under one head
//   c3p078_trees    { items: [{ tag, top, left, right }] }                   p78's fact trees: one × at the top, arrows to two ÷
//   c3p078_work     { rows: [{ l?, e, r?, hint? }], size?, indent? }          written working: label | sum | words; "=" rows line up
//   c3p078_under    { top: ["১২ ÷ ২", "× ৬"], rows: [["৬", "× ৬"], ["৩৬"]] }  p79: the bracket under the part worked out first
//   c3p078_check    { note, a, b }                                             p81: ৯৬ ÷ ১২ = ৮ checked by ১২ × ৮ = ৯৬ (circles, arrows, সঠিক)
//   c3p078_step     { n, text, body?: [lines or blocks], center?, inline? }   ch ৮'s green step banners ("১। প্রথমে …") with the working
//   c3p078_mcq      { items: [{ n, q, opts: ["(ক) …"], cols }], gap? }             tick questions: each option with a round box to tick
//   c3p078_qlist    { mark, items: [{ n, text, body? }] }                      the নিজে করি problems in one card, with the book's blue circles
//   c3p078_pencils  { n, h }                                                   p84: n coloured pencils standing, drawn (the count matters)
//   c3p078_priced   { sticker, emoji, n, size, label }                         p85: n things (a sticker) each with its price under it
//   c3p078_stories  { rows: [{ eq, story? }] }                                 p88: number sentences beside their stories (lines to write on)
//   c3p078_storybox { eq, h? }                                                 p83: a number sentence over a big ruled box (fills the page)
//   c3p078_wheel    { nums: [8 clockwise from 12 o'clock, "□" for the blank], r }   p90's wheel of numbers
//   c3p078_arrow    { w, top }                                                 a plain arrow (p81: from the sum to its check)
//   c3p078_says     { items: [[who, mood, text, side?]], small?, row? }        talk bubbles a little smaller, or side by side (crowded pages)
//   c3p078_big      { text }                                                   a big centred sum (p79's model with its boxes)
const RED = "#DC2626", GREEN = "#16A34A", INK = "#1E2433";

const mdx = (ctx, s) => ctx.md(s == null ? "" : String(s)).replace(/▭/g, `<span class="c3p078-wb"></span>`).replace(/▢/g, `<span class="c3p078-ob"></span>`).replace(/▣/g, `<span class="c3p078-bb"></span>`);
const ARROW = (w, col = "#334155") => `<svg class="c3p078-arw" width="${w}mm" height="4mm" viewBox="0 0 ${w} 4"><path d="M0 2H${w - 2.2}" stroke="${col}" stroke-width=".45"/><path d="M${w - 2.6} .5L${w} 2L${w - 2.6} 3.5Z" fill="${col}"/></svg>`;
const hint = (ctx, text, w = 16) => `<span class="c3p078-hint">${ARROW(w)}<span class="c3p078-hb">${mdx(ctx, text)}</span></span>`;

// one pencil standing, its point up: coloured lead, the sharpened wood, the painted body, the metal band and the eraser
function pencil(x, w, h, col, dark) {
  const cone = w * 1.15, band = h - w * 1.45, er = h - w * 0.82, s = w / 3;
  return `<g transform="translate(${x} 0)">
    <path d="M${w / 2} 0L${w} ${cone}H0Z" fill="#F6D2A2" stroke="#9A6A3A" stroke-width=".3" stroke-linejoin="round"/>
    <path d="M${w / 2} 0L${w / 2 + w / 6} ${cone / 3}H${w / 2 - w / 6}Z" fill="${dark}"/>
    <path d="M0 ${cone}Q${s / 2} ${cone - 1.3} ${s} ${cone}Q${s * 1.5} ${cone - 1.3} ${s * 2} ${cone}Q${s * 2.5} ${cone - 1.3} ${w} ${cone}V${band}H0Z" fill="${col}" stroke="${dark}" stroke-width=".3"/>
    <rect x="${s}" y="${cone}" width="${s}" height="${band - cone}" fill="#fff" opacity=".22"/><rect x="${s * 2}" y="${cone}" width="${s}" height="${band - cone}" fill="#000" opacity=".1"/>
    <rect x="-.2" y="${band}" width="${w + .4}" height="${er - band}" fill="#E2E8F0" stroke="#64748B" stroke-width=".3"/>
    <path d="M-.2 ${band + (er - band) / 3}H${w + .2}M-.2 ${band + (er - band) * 2 / 3}H${w + .2}" stroke="#94A3B8" stroke-width=".3"/>
    <rect x="0" y="${er}" width="${w}" height="${h - er}" rx="1.2" fill="#F9A8D4" stroke="#BE185D" stroke-width=".3"/></g>`;
}
const PENCILS = [["#A855F7", "#6B21A8"], ["#84CC16", "#3F6212"], ["#F59E0B", "#B45309"], ["#F43F5E", "#9F1239"], ["#38BDF8", "#0369A1"], ["#22C55E", "#166534"]];

module.exports = {
  kinds: {
    c3p078_gv: (b, ctx) => {
      const cell = (c) => `<td><div class="c3p078-gvh">${mdx(ctx, c.head)}</div><div class="c3p078-gvk">কারণ,</div><div class="c3p078-gvl${c.two ? " c3p078-two" : ""}">${c.lines.map((l) => `<span>${mdx(ctx, l)}</span>`).join("")}</div></td>`;
      return `<table class="c3p078-gv"><thead><tr><th>${ctx.esc(b.heads[0])}</th><th colspan="${b.cols.length - 1}">${ctx.esc(b.heads[1])}</th></tr></thead><tbody><tr>${b.cols.map(cell).join("")}</tr></tbody></table>`;
    },
    c3p078_trees: (b, ctx) => `<div class="c3p078-trees">${b.items.map((t) => `<div class="c3p078-tree"><span class="c3p078-tag">${ctx.esc(t.tag)}</span>
      <div class="c3p078-tt"><span class="c3p078-eqb c3p078-top">${mdx(ctx, t.top)}</span></div>
      <svg class="c3p078-tarw" width="74mm" height="10mm" viewBox="0 0 74 10"><defs><marker id="c3p078-th" viewBox="0 0 6 6" refX="5" refY="3" markerUnits="userSpaceOnUse" markerWidth="2.8" markerHeight="2.8" orient="auto"><path d="M0 0L6 3L0 6Z" fill="${INK}"/></marker></defs>
        <path d="M37 .4L19 9.6" stroke="${INK}" stroke-width=".45" marker-end="url(#c3p078-th)"/><path d="M37 .4L55 9.6" stroke="${INK}" stroke-width=".45" marker-end="url(#c3p078-th)"/></svg>
      <div class="c3p078-tb"><span class="c3p078-eqb">${mdx(ctx, t.left)}</span><span class="c3p078-eqb">${mdx(ctx, t.right)}</span></div></div>`).join("")}</div>`,
    c3p078_work: (b, ctx) => `<div class="c3p078-work${b.left ? " c3p078-ll" : ""}" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.indent ? `margin-left:${b.indent}mm;` : ""}${b.gap ? `row-gap:${b.gap}mm;` : ""}">${b.rows.map((r) =>
      `<span class="c3p078-wl">${mdx(ctx, r.l)}</span><span class="c3p078-we">${mdx(ctx, r.e)}${r.r ? `<span class="c3p078-wr">${mdx(ctx, r.r)}</span>` : ""}${r.hint ? hint(ctx, r.hint) : ""}</span>`).join("")}</div>`,
    c3p078_under: (b, ctx) => `<table class="c3p078-under"><tr class="c3p078-ut"><td></td><td class="c3p078-ug"><span>${mdx(ctx, b.top[0])}</span></td><td>${mdx(ctx, b.top[1])}</td></tr>
      ${b.rows.map((r) => r.length > 1 ? `<tr><td>=</td><td class="c3p078-um">${mdx(ctx, r[0])}</td><td>${mdx(ctx, r[1])}</td></tr>` : `<tr><td>=</td><td colspan="2">${mdx(ctx, r[0])}</td></tr>`).join("")}</table>`,
    c3p078_check: (b, ctx) => {
      const [a1, a2, a3] = b.a, [b1, b2, b3] = b.b; // ৯৬ ÷ ১২ = ৮ and ১২ × ৮ = ৯৬
      const T = (x, y, s, col = INK, anchor = "middle") => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${col}">${ctx.esc(s)}</text>`;
      return `<div class="c3p078-check"><span class="c3p078-hb">${mdx(ctx, b.note)}</span>
        <svg width="72mm" height="33mm" viewBox="0 0 72 33" class="c3p078-cks">
        <defs><marker id="c3p078-ah" viewBox="0 0 6 6" refX="5" refY="3" markerUnits="userSpaceOnUse" markerWidth="2.6" markerHeight="2.6" orient="auto"><path d="M0 0L6 3L0 6Z" fill="${RED}"/></marker></defs>
        ${T(8, 16, a1)}${T(17, 16, "÷")}${T(26, 16, a2)}${T(34, 16, "=")}${T(41, 16, a3)}
        ${T(25, 29.5, b1)}${T(33, 29.5, "×")}${T(40, 29.5, b2)}${T(47, 29.5, "=")}${T(56, 29.5, b3)}
        <ellipse cx="8" cy="14.3" rx="5" ry="4" fill="none" stroke="${RED}" stroke-width=".5"/><ellipse cx="56" cy="27.8" rx="5" ry="4" fill="none" stroke="${RED}" stroke-width=".5"/>
        <path d="M8 10.3V5.6H56V23.4" fill="none" stroke="${RED}" stroke-width=".45" marker-end="url(#c3p078-ah)"/>
        <path d="M60.5 8.8L44.2 12.6" fill="none" stroke="${RED}" stroke-width=".45" marker-end="url(#c3p078-ah)"/>
        <text x="61.5" y="9.6" fill="${RED}" class="c3p078-ok">${ctx.esc(b.ok || "সঠিক")}</text></svg></div>`;
    },
    c3p078_step: (b, ctx, page) => `<div class="c3p078-step${b.inline ? " c3p078-in" : ""}"><div class="c3p078-sb"><b>${ctx.esc(b.n)}</b><span>${mdx(ctx, b.text)}</span></div>${b.body ? `<div class="c3p078-sw${b.center ? " c3p078-c" : ""}">${b.body.map((x) =>
      typeof x === "string" ? `<p>${mdx(ctx, x)}</p>` : ctx.blockHtml(x, page)).join("")}</div>` : ""}</div>`,
    c3p078_mcq: (b, ctx) => `<div class="c3p078-mcq"${b.gap ? ` style="gap:${b.gap}mm"` : ""}>${b.items.map((it) => `<div class="c3p078-mq"><div class="c3p078-mqt"><b>${ctx.esc(it.n)}</b><span>${mdx(ctx, it.q)}</span></div>
      <div class="c3p078-mo" style="grid-template-columns:repeat(${it.cols || 4}, auto)">${it.opts.map((o) => { const m = o.match(/^(\(?[কখগঘ]\))\s*(.*)$/);
        return `<span><i class="c3p078-tk"></i>${m ? `<b>${ctx.esc(m[1])}</b> ${mdx(ctx, m[2])}` : mdx(ctx, o)}</span>`; }).join("")}</div></div>`).join("")}</div>`,
    c3p078_qlist: (b, ctx, page) => `<div class="c3p078-ql">${b.items.map((it) => `<div class="c3p078-qi"><span class="c3p078-qm">${ctx.exMark(b.mark || "nije", it.n)}</span><div class="c3p078-qx"><span>${mdx(ctx, it.text)}</span>${(it.body || []).map((x) =>
      typeof x === "string" ? `<p class="c3p078-qs">${mdx(ctx, x)}</p>` : ctx.blockHtml(x, page)).join("")}</div></div>`).join("")}</div>`,
    c3p078_pencils: (b) => {
      const n = b.n, h = b.h || 46, w = h * 0.17, gap = w * 0.55, W = n * w + (n - 1) * gap;
      return `<svg class="c3p078-pens" width="${W + 1}mm" height="${h + 1}mm" viewBox="-.5 -.5 ${W + 1} ${h + 1}">${Array.from({ length: n }, (_, i) => pencil(i * (w + gap), w, h, ...PENCILS[i % PENCILS.length])).join("")}</svg>`;
    },
    c3p078_priced: (b, ctx) => `<div class="c3p078-pr">${Array.from({ length: b.n }, () => `<div class="c3p078-pi">${ctx.objsHtml({ sticker: b.sticker, emoji: b.emoji, n: 1, size: b.size || 24 })}<span class="c3p078-pl">${mdx(ctx, b.label)}</span></div>`).join("")}</div>`,
    c3p078_stories: (b, ctx) => `<table class="c3p078-st">${b.rows.map((r) => `<tr><td class="c3p078-steq">${mdx(ctx, r.eq)}</td><td class="c3p078-sty">${r.story ? `<span>${ctx.md(r.story)}</span>` : `<i></i><i></i>`}</td></tr>`).join("")}</table>`,
    c3p078_storybox: (b, ctx) => `<div class="c3p078-sbx"${b.h ? ` style="flex:none;height:${b.h}mm"` : ""}><div class="c3p078-sbeq">${mdx(ctx, b.eq)}</div><div class="c3p078-sbbx"></div></div>`,
    c3p078_wheel: (b, ctx) => {
      const R = b.r || 30, C = R + 1, fills = ["#FEF3C7", "#DBEAFE", "#FCE7F3", "#DCFCE7"];
      let s = "";
      b.nums.forEach((v, i) => {
        const a0 = (i * 45 - 90) * Math.PI / 180, a1 = ((i + 1) * 45 - 90) * Math.PI / 180, am = (i * 45 + 22.5 - 90) * Math.PI / 180;
        const blank = v === "□";
        s += `<path d="M${C} ${C}L${(C + R * Math.cos(a0)).toFixed(2)} ${(C + R * Math.sin(a0)).toFixed(2)}A${R} ${R} 0 0 1 ${(C + R * Math.cos(a1)).toFixed(2)} ${(C + R * Math.sin(a1)).toFixed(2)}Z" fill="${blank ? "#FFFBEB" : fills[i % 4]}" stroke="${INK}" stroke-width=".5" stroke-linejoin="round"/>`;
        const x = C + R * 0.66 * Math.cos(am), y = C + R * 0.66 * Math.sin(am);
        s += blank ? `<rect x="${(x - 5.5).toFixed(2)}" y="${(y - 3.8).toFixed(2)}" width="11" height="7.6" rx="1.6" fill="#FFFBEB" stroke="#F59E0B" stroke-width=".55"/>`
          : `<text x="${x.toFixed(2)}" y="${(y + 2).toFixed(2)}" text-anchor="middle">${ctx.esc(v)}</text>`;
      });
      return `<div class="lcenter"><svg class="c3p078-wh" width="${2 * C}mm" height="${2 * C}mm" viewBox="0 0 ${2 * C} ${2 * C}"><circle cx="${C}" cy="${C}" r="${R + .6}" fill="none" stroke="var(--c)" stroke-width="1.2"/>${s}<circle cx="${C}" cy="${C}" r="1.2" fill="${INK}"/></svg></div>`;
    },
    c3p078_arrow: (b) => `<div class="c3p078-arrow" style="padding-top:${b.top || 0}mm">${ARROW(b.w || 16)}</div>`,
    c3p078_says: (b, ctx) => `<div class="c3p078-says${b.small ? " c3p078-small" : ""}${b.row ? " c3p078-row" : ""}">${b.items.map(([who, mood, text, side]) => ctx.sayHtml(who, text, mood, side)).join("")}</div>`,
    c3p078_big: (b, ctx) => `<div class="c3p078-big">${mdx(ctx, b.text)}</div>`,
  },
  css: `
.c3p078-wb { display: inline-block; width: 22mm; height: 7.6mm; vertical-align: -2.2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
.c3p078-ob { display: inline-block; width: 7.6mm; height: 7.6mm; vertical-align: -2.2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
.c3p078-bb { display: inline-block; width: 15mm; height: 12mm; vertical-align: -3.6mm; border: .7mm solid var(--c); background: #fff; border-radius: 2.4mm; margin: 0 1.6mm; box-shadow: 0 .8mm 0 var(--s) }
/* p78's table */
.c3p078-gv { width: 100%; border: .6mm solid var(--c); border-radius: 3.4mm; overflow: hidden; background: #fff; box-shadow: 0 1.2mm 0 var(--s) }
.c3p078-gv th { background: var(--c); color: #fff; font: 800 12.5pt/1.2 'Baloo Da 2'; padding: 1.4mm 1mm 1mm; border-right: .4mm solid rgba(255,255,255,.55) } .c3p078-gv th:last-child { border-right: 0 }
.c3p078-gv td { vertical-align: top; padding: 2mm 2.4mm 2.2mm; background: #FFF7ED; border-right: .4mm solid #FED7AA; font: 600 11.5pt/1.5 'Baloo Da 2' } .c3p078-gv td:last-child { border-right: 0 }
.c3p078-gv td:first-child { background: #FEF2F2 }
.c3p078-gvh { display: inline-block; font: 800 13pt 'Baloo Da 2'; color: var(--d); background: #fff; border: .5mm solid var(--c); border-radius: 2mm; padding: .2mm 2.4mm 0 }
.c3p078-gvk { font: 600 11pt 'Noto Sans Bengali'; margin: .6mm 0 .2mm } .c3p078-gvl { display: grid; gap: 0 4mm } .c3p078-gvl.c3p078-two { grid-template-columns: auto auto; justify-content: start } .c3p078-gvl span { white-space: nowrap }
/* p78's fact trees */
.c3p078-trees { display: flex; justify-content: space-around; gap: 4mm }
.c3p078-tree { position: relative; width: 80mm; padding: 2mm 3mm 2.4mm; background: var(--s); border: .6mm solid color-mix(in srgb, var(--c) 45%, #fff); border-radius: 4mm; display: flex; flex-direction: column; align-items: center; box-shadow: 0 1mm 0 color-mix(in srgb, var(--c) 25%, #fff) }
.c3p078-tag { position: absolute; left: 2.4mm; top: 1.4mm; font: 800 12.5pt 'Baloo Da 2'; color: var(--d) }
.c3p078-tarw { display: block; margin: .4mm 0 } .c3p078-tb { width: 74mm; display: grid; grid-template-columns: 1fr 1fr; justify-items: center }
.c3p078-eqb { display: inline-block; white-space: nowrap; font: 800 13pt 'Baloo Da 2'; background: #fff; border: .55mm solid #2563EB; border-radius: 2mm; padding: .3mm 3mm 0; box-shadow: 0 .7mm 0 #BFDBFE } .c3p078-eqb.c3p078-top { border-color: var(--c); box-shadow: 0 .7mm 0 color-mix(in srgb, var(--c) 35%, #fff) }
/* written working */
.c3p078-work { display: grid; grid-template-columns: auto auto; gap: 2.4mm 2mm; align-items: center; font: 700 13.5pt/1.3 'Baloo Da 2'; align-self: flex-start }
.c3p078-work .c3p078-wl { text-align: right; color: var(--d); white-space: nowrap } .c3p078-work.c3p078-ll .c3p078-wl { text-align: left; font: 600 12.5pt 'Noto Sans Bengali'; color: ${INK} } .c3p078-work .c3p078-we { white-space: nowrap } .c3p078-work .c3p078-wr { font: 600 12pt/1.35 'Noto Sans Bengali'; margin-left: 4mm }
.c3p078-hint { display: inline-flex; align-items: center; gap: 1.6mm; margin-left: 4mm } .c3p078-arw { display: block; flex: none }
.c3p078-hb { display: inline-block; font: 600 11.5pt/1.4 'Noto Sans Bengali'; background: #fff; border: .5mm solid #64748B; border-top-color: transparent; border-bottom-color: transparent; border-radius: 1mm; padding: .6mm 3mm; box-shadow: inset 0 .5mm 0 -.1mm #64748B, inset 0 -.5mm 0 -.1mm #64748B }
/* p79's under-bracket */
.c3p078-under { font: 800 14pt/1.25 'Baloo Da 2'; border-collapse: collapse; align-self: center } .c3p078-under td { padding: 0 1mm; white-space: nowrap }
.c3p078-under tr.c3p078-ut td { padding-bottom: 4.6mm } .c3p078-under td.c3p078-ug, .c3p078-under td.c3p078-um { text-align: center } .c3p078-under td.c3p078-ug span { position: relative; display: inline-block }
.c3p078-under td.c3p078-ug span::after { content: ""; position: absolute; left: 0; right: 0; bottom: -2.4mm; height: 2.2mm; border: .5mm solid ${RED}; border-top: 0 }
.c3p078-under td.c3p078-ug span::before { content: ""; position: absolute; left: 50%; bottom: -4.8mm; height: 2.4mm; border-left: .5mm solid ${RED} }
/* p81's check */
.c3p078-check { display: flex; flex-direction: column; align-items: flex-start; gap: 0 } .c3p078-cks { display: block; font: 800 5.2px 'Baloo Da 2' } .c3p078-cks .c3p078-ok { font: 700 3.9px 'Noto Sans Bengali' }
/* ch ৮'s steps */
.c3p078-step { display: flex; flex-direction: column; gap: 1.4mm }
.c3p078-sb { align-self: flex-start; display: flex; align-items: flex-start; gap: 2.4mm; background: linear-gradient(90deg, #DCFCE7, #F0FDF4); border: .5mm solid #86EFAC; border-left: 2mm solid ${GREEN}; border-radius: 2mm 4mm 4mm 2mm; padding: 1.4mm 4mm 1.2mm 2.4mm; font: 600 12pt/1.45 'Noto Sans Bengali'; box-shadow: 0 .7mm 0 #BBF7D0 }
.c3p078-sb b { flex: none; width: 6.4mm; height: 6.4mm; margin-top: .4mm; border-radius: 50%; background: ${GREEN}; color: #fff; font: 800 11pt/7mm 'Baloo Da 2'; text-align: center }
.c3p078-sw { display: flex; flex-direction: column; gap: .6mm; padding-left: 12mm; font: 700 13pt/1.4 'Baloo Da 2' } .c3p078-sw.c3p078-c { align-items: center; padding-left: 0 } .c3p078-sw p { white-space: nowrap }
.c3p078-step.c3p078-in { flex-direction: row; align-items: center; gap: 5mm } .c3p078-step.c3p078-in .c3p078-sb { flex: 0 1 auto } .c3p078-step.c3p078-in .c3p078-sw { padding-left: 0 }
/* tick questions */
.c3p078-mcq { display: flex; flex-direction: column; gap: 2.2mm }
.c3p078-mqt { display: grid; grid-template-columns: 8.4mm 1fr; font: 500 12pt/1.45 'Noto Sans Bengali' } .c3p078-mqt b { font: 800 12pt/1.45 'Baloo Da 2'; color: #EA580C }
.c3p078-mo { display: grid; gap: 1mm 4mm; padding-left: 8.4mm; margin-top: .8mm; justify-content: space-between; font: 600 12pt/1.4 'Noto Sans Bengali' } .c3p078-mo span { display: inline-flex; align-items: center; gap: 1.4mm; white-space: nowrap }
.c3p078-mo b { font: 800 12pt 'Baloo Da 2'; color: #2563EB } .c3p078-tk { flex: none; width: 4.4mm; height: 4.4mm; border: .5mm solid #60A5FA; border-radius: 50%; background: #fff }
/* the নিজে করি problems */
.c3p078-ql { display: flex; flex-direction: column; background: #F0F7FF; border: .6mm solid #93C5FD; border-radius: 4mm; padding: .6mm 3.4mm; box-shadow: 0 1mm 0 #DBEAFE }
.c3p078-qi { display: grid; grid-template-columns: 10.4mm 1fr; align-items: start; padding: 1.9mm 0; border-top: .4mm dashed #BFDBFE; font: 500 12.5pt/1.5 'Noto Sans Bengali' } .c3p078-qi:first-child { border-top: 0 }
.c3p078-qx { display: flex; flex-direction: column; gap: 1mm } .c3p078-qs { font: 700 13pt/1.4 'Baloo Da 2'; padding-left: 4mm }
/* p84's pencils, p85's priced things */
.c3p078-pens { display: block }
.c3p078-pr { display: flex; justify-content: space-around; align-items: flex-end } .c3p078-pi { display: flex; flex-direction: column; align-items: center; gap: 1mm }
.c3p078-pl { font: 800 12pt 'Baloo Da 2'; color: var(--d); background: #fff; border: .5mm solid var(--c); border-radius: 99px; padding: .2mm 3mm 0; box-shadow: 0 .6mm 0 var(--s) }
/* stories */
.c3p078-st { width: 100%; border: .6mm solid var(--c); border-radius: 3.4mm; overflow: hidden; background: #fff; box-shadow: 0 1.2mm 0 var(--s) }
.c3p078-st td { border-top: .4mm solid var(--s); padding: 2mm 3mm; vertical-align: middle } .c3p078-st tr:first-child td { border-top: 0 }
.c3p078-st td.c3p078-steq { width: 58mm; background: var(--s); border-right: .4mm solid color-mix(in srgb, var(--c) 30%, #fff); font: 800 13pt 'Baloo Da 2'; white-space: nowrap }
.c3p078-st td.c3p078-sty { font: 500 11.5pt/1.45 'Noto Sans Bengali'; height: 15mm } .c3p078-st td.c3p078-sty i { display: block; border-bottom: .45mm dashed #94A3B8; height: 6.4mm }
.c3p078-sbx { flex: 1 1 auto; min-height: 24mm; display: flex; flex-direction: column; align-items: stretch; gap: 1.6mm }
.c3p078-sbx .c3p078-sbeq { align-self: center; font: 800 14pt 'Baloo Da 2'; color: var(--d) }
.c3p078-sbx .c3p078-sbbx { flex: 1; border: .6mm solid var(--c); border-radius: 4mm; box-shadow: 0 1.2mm 0 var(--s); background: repeating-linear-gradient(180deg, transparent 0 9.4mm, #CBD5E1 9.4mm 9.7mm), #fff; background-origin: content-box; padding: 0 5mm }
/* p90's wheel */
.c3p078-wh { display: block; font: 800 6px 'Baloo Da 2' } .c3p078-wh text { fill: ${INK} }
.c3p078-arrow { flex: none }
.c3p078-says { display: flex; flex-direction: column; gap: 2mm } .c3p078-says.c3p078-row { flex-direction: row; align-items: center; gap: 3mm } .c3p078-says.c3p078-row > .say { flex: 1 1 0; min-width: 0 } .c3p078-says.c3p078-row > .say:first-child { flex-grow: 1.6 } .c3p078-says.c3p078-row .sb { min-width: 0 }
.c3p078-says.c3p078-small .fc { width: 15mm; height: 15mm } .c3p078-says.c3p078-small .sb { font-size: 12pt; padding: 1.8mm 4mm 1.4mm }
.c3p078-big { align-self: center; font: 800 16pt 'Baloo Da 2'; color: ${INK} }
`,
};
