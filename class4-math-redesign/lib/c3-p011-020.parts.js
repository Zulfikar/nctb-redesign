// Own kinds for printed pages 11–20 (অধ্যায় ১ সংখ্যা: সংখ্যার তুলনা, ক্রমবাচক সংখ্যা, সংখ্যা প্যাটার্ন, নিজে করি).
// Every count, order and position is drawn here, so it is exact. Every class is prefixed c3p011-.
//   c3p011_ex      an exercise card whose heading takes ▣ (a drawn unit cube, p18) and ▭ (a wide answer box)
//   c3p011_rule    p11's lilac box: a rule and two worked lines (a < b … in words)
//   c3p011_cmp     pairs of numbers with a box between them for < or >, (১) (২) … in rows (p11, p20)
//   c3p011_order   sets of numbers, each with its rows "বড়ো থেকে ছোটো" / "ছোটো থেকে বড়ো" and room to write (p12, p13)
//   c3p011_tree    the place-value tree of a 5-digit number: lines from each digit to its place and value (p13)
//   c3p011_ordtab  p14's table of ordinals (word, short form) with a name column to write in
//   c3p011_rank    a table with set column widths (p15's marks and ordinal places)
//   c3p011_stairs  p15's staircase: n steps, some labelled (১ম, ৩য়), the rest boxes to write in, the girl at its foot
//   c3p011_pat     number patterns: given numbers as beads, blanks as boxes, and an optional rule box (pp16–17)
//   c3p011_pcards  p17's pattern card, front (সামনে) and back (পিছনে)
//   c3p011_stack   p18's blocks: stacks of ten hundred-flats, single flats, rods and cubes, bottom-aligned
//   c3p011_cards   p18's box of place-value cards (১০০০০, ১০০০, ১০০, ১০, ১), laid out as the book's
//   c3p011_qs      numbered questions (১) (২) …, each with an optional answer line; ▭ a wide box, □ a box
//   c3p011_mcq     multiple-choice questions with ক) খ) গ) ঘ) and a tick box each; optional row of circles (p19)
//   c3p011_nline   a number line with ticks every 10, long ones every 100, labels or boxes over the long ones (p20)
const PLACE = ["#EA580C", "#DB2777", "#2563EB", "#16A34A", "#9333EA"]; // একক, দশক, শতক, হাজার, অযুত
const INK = "#1E2433";

const cubeIcon = (ctx) => `<svg class="c3p011-ic" width="6mm" height="6mm" viewBox="0 0 6.2 6.2">${ctx.cube(0.3, 1.8, 4, ctx.BLOCK.blue)}</svg>`;
function mdx(ctx, s) {
  return ctx.md(String(s).replace(/▣/g, "⟦C⟧").replace(/▭/g, "⟦W⟧"))
    .replace(/⟦C⟧/g, cubeIcon(ctx)).replace(/⟦W⟧/g, `<span class="c3p011-wbox"></span>`);
}

// p18: two stacks of ten flats (each flat a little in front of the one before), then flats in a 2 × 2 block, rods, cubes
function stackSvg(b, ctx) {
  const s = b.s || 2, c = ctx.BLOCK[b.color || "blue"], d = s * 0.5, F = 10 * s, st = b.step || 2.4, top = d + 0.4;
  const stacks = b.stacks || 2, apart = b.apart || F + 2.6, inStack = b.inStack || 10;
  const floor = top + (inStack - 1) * st + F;
  let out = "";
  for (let j = 0; j < inStack; j++) for (let k = 0; k < stacks; k++) out += ctx.flat(k * apart + j * st, top + j * st, s, c);
  let x = (stacks - 1) * apart + (inStack - 1) * st + F + d + (b.gap || 7);
  const flats = b.flats || 0, perCol = 2;
  for (let i = 0; i < flats; i++) { // two rows, filled column by column from the left: the bottom one, then the top one
    const col = Math.floor(i / perCol), row = i % perCol;
    out += ctx.flat(x + col * (F + d + 1.6), floor - F - row * (F + d + 1.4), s, c);
  }
  if (flats) x += Math.ceil(flats / perCol) * (F + d + 1.6) - 1.6 + (b.gap || 7);
  for (let i = 0; i < (b.rods || 0); i++) out += ctx.rod(x + i * (s + 1.5), floor - F, s, c);
  if (b.rods) x += b.rods * (s + 1.5) - 1.5 + s * 0.36 + (b.gap || 7) * 0.8;
  for (let i = 0; i < (b.ones || 0); i++) out += ctx.cube(x, floor - s - i * (s + 1.7), s, c);
  const w = x + (b.ones ? s * 1.36 : 0) + 0.4, h = floor + 0.4;
  return `<svg class="c3p011-stack" width="${w.toFixed(2)}mm" height="${h.toFixed(2)}mm" viewBox="-0.3 -0.3 ${(w + 0.6).toFixed(2)} ${(h + 0.6).toFixed(2)}">${out}</svg>`;
}

// p18: the book's 28 cards, at the book's places (px of its box at 250 dpi: 1426 × 449, each card 148 × 71)
const CARD = { "১": ["#DDD6FE", "#7C3AED", "#4C1D95"], "১০": ["#FECDD3", "#E11D48", "#881337"], "১০০": ["#CFFAFE", "#0891B2", "#164E63"],
  "১০০০": ["#BBF7D0", "#16A34A", "#14532D"], "১০০০০": ["#FEF08A", "#CA8A04", "#713F12"] };

module.exports = {
  kinds: {
    c3p011_ex: (b, ctx, page) => `<div class="ex m-${b.mark}"><div class="ext wm">${ctx.exMark(b.mark, b.ex)}<span>${mdx(ctx, b.text)}</span></div>${(b.body || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>`,

    c3p011_rule: (b, ctx) => `<div class="c3p011-rule"><p>${ctx.md(b.head)}</p><div class="c3p011-rg">${b.rows.map(([a, c]) => `<span class="c3p011-rs">${ctx.md(a)}</span><span>${ctx.md(c)}</span>`).join("")}</div></div>`,

    c3p011_cmp: (b, ctx) => {
      const cols = b.cols || 2, rows = Math.ceil(b.items.length / cols), start = b.start || 1;
      let html = "";
      for (let r = 0; r < rows; r++) {
        html += "<tr>";
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c, it = b.items[i];
          html += it ? `<td class="c3p011-mk">(${ctx.bn(start + i)})</td><td class="c3p011-a">${ctx.esc(it[0])}</td><td><span class="c3p011-box"></span></td><td class="c3p011-b">${ctx.esc(it[1])}</td>` : "<td></td><td></td><td></td><td></td>";
          if (c < cols - 1) html += `<td class="c3p011-sp"></td>`;
        }
        html += "</tr>";
      }
      return `<table class="c3p011-cmp">${html}</table>`;
    },

    c3p011_order: (b, ctx) => {
      const cols = b.cols || ["40%", "24%", "36%"];
      const head = b.head ? `<tr class="c3p011-oh">${b.head.map((h) => `<th>${ctx.esc(h)}</th>`).join("")}</tr>` : "";
      const body = b.sets.map((s, k) => {
        const tone = s.tone || (k % 2 ? "yellow" : "pink");
        return s.rows.map((lab, j) => {
          const t = s.tones ? s.tones[j] : tone;
          return `<tr class="c3p011-t-${t}">${j === 0 ? `<td class="c3p011-set c3p011-t-${tone}" rowspan="${s.rows.length}">${ctx.br(s.nums)}</td>` : ""}<td class="c3p011-lab">${ctx.esc(lab)}</td><td class="c3p011-w"><i></i></td></tr>`;
        }).join("");
      }).join("");
      return `<table class="c3p011-order${b.nowrap ? " c3p011-nw" : ""}"><colgroup>${cols.map((w) => `<col style="width:${w}">`).join("")}</colgroup>${head}${body}</table>`;
    },

    c3p011_tree: (b, ctx) => {
      const { digits, labels, values, w = 150 } = b, n = digits.length;
      const dw = 6.4, x0 = 5, yD = 5.8, rh = b.rh || 7.6, y1 = yD + rh - 0.2, xL = b.xL || 62, xV = w - 6, H = y1 + (n - 1) * rh + 2.6;
      let g = "";
      digits.forEach((dg, i) => {
        const p = n - 1 - i, x = x0 + i * dw + dw / 2, col = PLACE[p] || INK, y = y1 + p * rh;
        g += `<text x="${x}" y="${yD}" text-anchor="middle" class="c3p011-td" fill="${col}">${ctx.esc(dg)}</text>`;
        g += `<path d="M${x} ${yD + 1.3}V${y - 1.5}H${xL - 2.4}" fill="none" stroke="${col}" stroke-width=".6" stroke-linecap="round" stroke-linejoin="round"/>`;
        g += `<text x="${xL}" y="${y}" class="c3p011-tl">${ctx.esc(labels[i])}</text>`;
        g += `<path d="M${xL + 24} ${y - 1.5}H${xV - 24}" stroke="${col}" stroke-width=".5" stroke-dasharray="1.2 1.2" stroke-linecap="round"/>`;
        g += `<text x="${xV}" y="${y}" text-anchor="end" class="c3p011-tv" fill="${col}">${ctx.esc(values[i])}</text>`;
      });
      return `<div class="c3p011-tree"><svg width="${w}mm" height="${H.toFixed(2)}mm" viewBox="0 0 ${w} ${H.toFixed(2)}">${g}</svg></div>`;
    },

    c3p011_ordtab: (b, ctx) => `<table class="c3p011-ord"><colgroup><col style="width:34%"><col style="width:22%"><col style="width:44%"></colgroup>
      <tr><th colspan="2">${ctx.esc(b.head[0])}</th><th>${ctx.esc(b.head[1])}</th></tr>
      ${b.rows.map(([w, s], i) => `<tr class="${i % 2 ? "c3p011-oy" : "c3p011-op"}"><td class="c3p011-ow">${ctx.esc(w)}</td><td class="c3p011-os">${ctx.esc(s)}</td><td class="c3p011-on"><i></i></td></tr>`).join("")}</table>`,

    c3p011_rank: (b, ctx) => {
      const cell = (c) => c === "…" ? `<td class="gap"><i></i></td>` : `<td>${ctx.md(c)}</td>`;
      return `<table class="grid tone-${b.tone || "blue"} c3p011-rank"><colgroup>${b.cols.map((w) => `<col style="width:${w}">`).join("")}</colgroup>
        <thead><tr>${b.head.map((h) => `<th>${ctx.br(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map(cell).join("")}</tr>`).join("")}</tbody></table>`;
    },

    c3p011_stairs: (b, ctx) => {
      const n = b.n || 13, run = b.run || 10, rise = b.rise || 4.6, base = b.base || 3.4, gx = b.gx || 22, labels = b.labels || {};
      const W = gx + n * run + 1, Ht = base + n * rise + 1.4, floor = Ht;
      const ty = (i) => floor - base - i * rise; // the top of step i (1 = the lowest)
      let d = `M${gx} ${floor}`;
      for (let i = 1; i <= n; i++) d += `V${ty(i)}H${gx + i * run}`;
      d += `V${floor}Z`;
      let g = `<defs><linearGradient id="c3p011-sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFEDD5"/><stop offset="1" stop-color="#FDBA74"/></linearGradient></defs>
        <path d="${d}" fill="url(#c3p011-sg)" stroke="#EA580C" stroke-width=".35" stroke-linejoin="round"/>`;
      for (let i = 1; i <= n; i++) {
        const x = gx + (i - 1) * run, y = ty(i), bw = run - 1.6, bh = Math.min(5.6, base + rise - 1.6);
        g += `<rect x="${x - 0.9}" y="${y - 0.75}" width="${run + 0.9}" height="1.5" rx=".5" fill="#EA580C" stroke="#9A3412" stroke-width=".2"/>`;
        g += labels[i]
          ? `<rect x="${x + 0.8}" y="${y + 1.3}" width="${bw}" height="${bh}" rx="1.2" fill="#fff" stroke="#F59E0B" stroke-width=".45"/><text x="${x + run / 2}" y="${y + 1.3 + bh * 0.76}" text-anchor="middle" class="c3p011-sl">${ctx.esc(labels[i])}</text>`
          : `<rect x="${x + 0.8}" y="${y + 1.3}" width="${bw}" height="${bh}" rx="1.2" fill="#fff" fill-opacity=".85" stroke="#C2410C" stroke-width=".35" stroke-dasharray=".9 .7"/>`;
      }
      g += `<path d="M0 ${floor - 0.2}H${W}" stroke="#9A3412" stroke-width=".5"/>`;
      const f = b.pic && ctx.picFile(b.pic);
      const girl = b.pic ? (f ? `<span class="c3p011-girl" style="width:${b.picW || gx + 4}mm;height:${b.picH || 50}mm"><img src="file://${f.file}">${f.old ? `<span class="tag">stand-in</span>` : ""}</span>` : `<span class="c3p011-girl ph" style="width:${b.picW || gx + 4}mm;height:${b.picH || 50}mm">ChatGPT: ${ctx.esc(b.pic)}.png</span>`) : "";
      return `<div class="c3p011-stairs" style="width:${W}mm;height:${Ht}mm"><svg width="${W}mm" height="${Ht}mm" viewBox="0 0 ${W} ${Ht}">${g}</svg>${girl}</div>`;
    },

    c3p011_pat: (b, ctx) => `<div class="c3p011-pat">${b.rows.map((r) => {
      const parts = r.seq.split(",").map((p) => p.trim().split(/\s+/));
      let items = "";
      parts.forEach((p, k) => p.forEach((t, j) => {
        items += t === "_" ? `<span class="c3p011-pb"></span>` : `<span class="c3p011-pn">${ctx.esc(t)}</span>`;
        if (j === p.length - 1 && k < parts.length - 1) items += `<span class="c3p011-pc">,</span>`;
      }));
      const rule = r.rule == null ? "" : `<span class="c3p011-rl">${ctx.esc(b.label || "")}</span>${r.rule ? `<span class="c3p011-rb c3p011-rf">${ctx.esc(r.rule)}</span>` : `<span class="c3p011-rb"></span>`}`;
      return `<div class="c3p011-prow"><b class="c3p011-pm">${ctx.esc(r.n)}</b><span class="c3p011-pi">${items}</span>${rule}</div>`;
    }).join("")}</div>`,

    c3p011_pcards: (b, ctx) => `<div class="c3p011-pcs${b.stack ? " c3p011-pst" : ""}">${b.cards.map(([lab, txt]) => `<div class="c3p011-pcw"><span class="c3p011-pcl">${ctx.esc(lab)}</span><span class="c3p011-pcd">${ctx.md(txt)}</span></div>`).join("")}</div>`,

    c3p011_stack: (b, ctx) => `<div class="c3p011-swrap">${stackSvg(b, ctx)}</div>`,

    c3p011_cards: (b, ctx) => {
      const W = b.w || 150, k = W / 1426, H = 449 * k, cw = 148 * k, ch = 71 * k;
      return `<div class="c3p011-cbox" style="width:${W}mm;height:${H.toFixed(1)}mm">${b.cards.map(([x, y, v]) => {
        const [bg, bd, tx] = CARD[v];
        return `<span class="c3p011-card" style="left:${(x * k).toFixed(2)}mm;top:${(y * k).toFixed(2)}mm;width:${cw.toFixed(2)}mm;height:${ch.toFixed(2)}mm;background:${bg};border-color:${bd};color:${tx};box-shadow:0 .7mm 0 ${bd}">${ctx.esc(v)}</span>`;
      }).join("")}</div>`;
    },

    c3p011_qs: (b, ctx) => `<div class="c3p011-qs" style="grid-template-columns:repeat(${b.cols || 1}, 1fr)${b.gap ? `;row-gap:${b.gap}mm` : ""}">${b.items.map((t, i) => `<div class="c3p011-q"><b class="c3p011-qm">(${ctx.bn((b.start || 1) + i)})</b><span class="c3p011-qt">${mdx(ctx, t)}</span>${b.line ? `<i class="c3p011-ql" style="min-width:${b.lw || 24}mm"></i>` : ""}</div>`).join("")}</div>`,

    c3p011_mcq: (b, ctx) => {
      const L = ["ক", "খ", "গ", "ঘ"];
      const dots = ({ n, black, r = 1.85, gap = 0.45 }) => {
        const p = 2 * r + gap, w = n * p + 0.6;
        let c = "";
        for (let i = 0; i < n; i++) c += `<circle cx="${0.3 + r + i * p}" cy="${r + 0.3}" r="${r}" fill="${i + 1 === black ? INK : "#fff"}" stroke="${INK}" stroke-width=".35"/>`;
        return `<svg class="c3p011-dots" width="${w.toFixed(2)}mm" height="${(2 * r + 0.6).toFixed(2)}mm" viewBox="0 0 ${w.toFixed(2)} ${(2 * r + 0.6).toFixed(2)}">${c}</svg>`;
      };
      return `<div class="c3p011-mcq"${b.gap ? ` style="gap:${b.gap}mm"` : ""}>${b.items.map((it, i) => `<div class="c3p011-mq"><div class="c3p011-mqq"><b class="c3p011-qm">(${ctx.bn((b.start || 1) + i)})</b><span>${it.dots ? dots(it.dots) + " " : ""}${ctx.md(it.q)}</span></div>
        <div class="c3p011-mo" style="grid-template-columns:repeat(${it.cols || 4}, 1fr)">${it.opts.map((o, j) => `<span><i class="c3p011-tk"></i><b>${L[j]})</b> ${ctx.md(o)}</span>`).join("")}</div></div>`).join("")}</div>`;
    },

    c3p011_nline: (b, ctx) => {
      const { ticks = 60, major = 10, mid = 5, labels = [], w = 160 } = b;
      const m = 7.5, step = (w - 2 * m) / ticks, y0 = 18.5, H = 20;
      let g = `<path d="M${m - 1.5} ${y0}H${w - m + 1.5}" class="c3p011-nl"/>`;
      for (let i = 0; i <= ticks; i++) {
        const x = (m + i * step).toFixed(2), len = i % major === 0 ? 6.4 : i % mid === 0 ? 3.8 : 2.4;
        g += `<path d="M${x} ${y0}V${y0 - len}" class="${i % major === 0 ? "c3p011-nM" : "c3p011-nt"}"/>`;
      }
      labels.forEach((l, k) => {
        const x = m + k * major * step;
        g += l === "□" ? `<rect x="${(x - 7).toFixed(2)}" y="1.2" width="14" height="8" rx="1.8" class="c3p011-nb"/>`
          : `<text x="${x.toFixed(2)}" y="7.8" text-anchor="middle" class="c3p011-nn">${ctx.esc(l)}</text>`;
      });
      return `<div class="c3p011-nline">${b.mark ? `<b class="c3p011-qm">${ctx.esc(b.mark)}</b>` : ""}<svg width="${w}mm" height="${H}mm" viewBox="0 0 ${w} ${H}">${g}</svg></div>`;
    },
  },

  css: `
svg.c3p011-ic { display: inline-block; vertical-align: -1.4mm; margin: 0 -.4mm 0 .2mm }
.c3p011-wbox { display: inline-block; width: 24mm; height: 8mm; vertical-align: -2.4mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 2mm; margin: 0 1.2mm 0 0 }
/* p11's rule box */
.c3p011-rule { background: linear-gradient(135deg, #F3E8FF, #FCE7F3); border: .6mm solid #C084FC; border-radius: 6mm; padding: 2.4mm 6mm 2.6mm; box-shadow: 0 1mm 0 #E9D5FF }
.c3p011-rule p { font: 600 12.5pt/1.45 'Noto Sans Bengali'; color: #581C87 }
.c3p011-rg { display: grid; grid-template-columns: 50mm 1fr; gap: .6mm 6mm; padding: 1mm 0 0 8mm; font: 700 13.5pt/1.45 'Baloo Da 2' }
.c3p011-rs { color: #7E22CE; font-weight: 800 }
/* < or > between two numbers */
.c3p011-cmp { align-self: center; border-collapse: separate; border-spacing: 0 1.8mm; margin: -1.2mm 0; font: 700 13.5pt 'Baloo Da 2' }
.c3p011-cmp td { padding: 0 1.1mm; white-space: nowrap; vertical-align: middle } .c3p011-mk { color: #EA580C; font-weight: 800 }
.c3p011-a { text-align: right; min-width: 19mm } .c3p011-b { text-align: left; min-width: 21mm } .c3p011-sp { width: 12mm }
.c3p011-box { display: block; width: 14mm; height: 8.4mm; border: .6mm solid #F59E0B; background: #fff; border-radius: 2mm }
/* sets to order */
.c3p011-order { width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0; border: .6mm solid #DB2777; border-radius: 3.4mm; overflow: hidden; background: #fff }
.c3p011-order td, .c3p011-order th { border-top: .3mm solid rgba(0,0,0,.12); border-left: .3mm solid rgba(0,0,0,.12); padding: 1.1mm 2.4mm; vertical-align: middle }
.c3p011-order tr:first-child td, .c3p011-order tr:first-child th { border-top: 0 } .c3p011-order td:first-child, .c3p011-order th:first-child { border-left: 0 }
.c3p011-order th { background: #FDE68A; font: 700 12pt 'Baloo Da 2'; color: #713F12; height: 8mm }
.c3p011-nw .c3p011-set { white-space: nowrap; font-size: 12pt }
.c3p011-set { font: 800 12.5pt/1.5 'Baloo Da 2'; color: ${INK}; vertical-align: top !important; padding-top: 2mm !important; text-align: center }
.c3p011-lab { font: 600 11.5pt 'Noto Sans Bengali'; text-align: center; height: 8.6mm; white-space: nowrap }
.c3p011-order .c3p011-w i { display: block; border-bottom: .5mm dashed rgba(0,0,0,.28); margin: 3.4mm 1mm 0 }
.c3p011-order tr.c3p011-t-pink td { background: #FDF2F8 } .c3p011-order tr.c3p011-t-pink .c3p011-lab { background: #FBCFE8; color: #9D174D }
.c3p011-order tr.c3p011-t-yellow td { background: #FEFCE8 } .c3p011-order tr.c3p011-t-yellow .c3p011-lab { background: #FDE68A; color: #854D0E }
.c3p011-order tr.c3p011-t-blue td { background: #F0F9FF } .c3p011-order tr.c3p011-t-blue .c3p011-lab { background: #BAE6FD; color: #075985 }
.c3p011-order td.c3p011-set.c3p011-t-pink { background: #FCE7F3 } .c3p011-order td.c3p011-set.c3p011-t-yellow { background: #ECFCCB }
/* the place-value tree */
.c3p011-tree { display: flex; justify-content: center } .c3p011-tree svg { display: block; overflow: visible }
.c3p011-td { font: 800 5.4px 'Baloo Da 2' } .c3p011-tl { font: 600 4.3px 'Noto Sans Bengali'; fill: ${INK} } .c3p011-tv { font: 800 4.8px 'Baloo Da 2' }
/* the ordinals table */
.c3p011-ord { width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0; border: .6mm solid #DB2777; border-radius: 3.4mm; overflow: hidden }
.c3p011-ord th { background: #DB2777; color: #fff; font: 700 12pt 'Baloo Da 2'; padding: 1.2mm 1mm .8mm; border-left: .3mm solid rgba(255,255,255,.5) } .c3p011-ord th:first-child { border-left: 0 }
.c3p011-ord td { border-top: .3mm solid rgba(0,0,0,.1); border-left: .3mm solid rgba(0,0,0,.1); height: 7.25mm; padding: 0 3mm; vertical-align: middle } .c3p011-ord td:first-child { border-left: 0 }
.c3p011-ow { font: 600 12pt 'Noto Sans Bengali' } .c3p011-os { font: 800 12.5pt 'Baloo Da 2'; text-align: center; color: #9D174D }
.c3p011-op .c3p011-ow, .c3p011-op .c3p011-os { background: #FCE7F3 } .c3p011-oy .c3p011-ow, .c3p011-oy .c3p011-os { background: #FEF9C3 } .c3p011-oy .c3p011-os { color: #A16207 }
.c3p011-on { background: #fff } .c3p011-on i { display: block; border-bottom: .5mm dashed #CBD5E1; margin: 3mm 1mm 0 }
/* a table with column widths */
.c3p011-rank { table-layout: fixed } .c3p011-rank th { font-size: 10.5pt; line-height: 1.25; padding: 1.2mm .8mm .8mm } .c3p011-rank td { height: 7mm; padding: .3mm .8mm; font-size: 12pt; line-height: 1.25 } .c3p011-rank td.gap i { margin-top: 3mm }
.c3p011-rank td:nth-child(1), .c3p011-rank td:nth-child(4) { font: 600 11.5pt 'Noto Sans Bengali' } .c3p011-rank .ansbox { min-width: 0; font-size: 11pt; padding: 0 2mm }
.c3p011-rank td:nth-child(3) { border-right: .6mm solid var(--tc) } .c3p011-rank th:nth-child(3) { border-right: .6mm solid #fff }
/* the staircase */
.c3p011-stairs { position: relative; align-self: center } .c3p011-stairs svg { display: block }
.c3p011-sl { font: 800 3.9px 'Baloo Da 2'; fill: #C2410C }
.c3p011-girl { position: absolute; left: 0; bottom: 0; display: block } .c3p011-girl img { width: 100%; height: 100%; object-fit: contain; object-position: left bottom; display: block }
.c3p011-girl.ph { font-size: 7pt }
/* number patterns */
.c3p011-pat { display: flex; flex-direction: column; gap: 2.4mm; padding: 1mm 0 0 2mm }
.c3p011-prow { display: grid; grid-template-columns: 9mm 1fr auto auto; align-items: center; column-gap: 1.6mm }
.c3p011-pm { font: 800 13pt 'Baloo Da 2'; color: #EA580C } .c3p011-pi { display: flex; align-items: center; flex-wrap: wrap; gap: 1.2mm 0 }
.c3p011-pn { font: 800 13.5pt/1 'Baloo Da 2'; color: var(--d); background: #fff; border: .55mm solid var(--c); border-radius: 99px; padding: 1.5mm 2.6mm .7mm; min-width: 9mm; text-align: center; box-shadow: 0 .6mm 0 var(--s) }
.c3p011-pb { display: inline-block; width: 14mm; height: 8.4mm; border: .55mm dashed #F59E0B; background: #FFFBEB; border-radius: 99px }
.c3p011-pc { font: 800 13pt 'Baloo Da 2'; color: #64748B; margin: 0 1.1mm 0 .5mm; align-self: flex-end }
.c3p011-pn + .c3p011-pb, .c3p011-pn + .c3p011-pn, .c3p011-pb + .c3p011-pn, .c3p011-pb + .c3p011-pb { margin-left: 2.4mm }
.c3p011-rl { font: 700 12.5pt 'Noto Sans Bengali'; padding-left: 2mm } .c3p011-rb { display: inline-block; width: 30mm; height: 8.4mm; border: .55mm solid #F59E0B; background: #fff; border-radius: 2mm }
.c3p011-rf { font: 800 13pt/8mm 'Baloo Da 2'; color: #C2410C; text-align: center; background: #FFFBEB }
/* the pattern card, front and back */
.c3p011-pcs { display: flex; justify-content: space-around; gap: 6mm } .c3p011-pcs.c3p011-pst { flex-direction: column; gap: 2.4mm; justify-content: center }
.c3p011-pcw { display: flex; flex-direction: column; align-items: center; gap: 1mm } .c3p011-pcl { font: 700 12pt 'Noto Sans Bengali'; color: #475569 }
.c3p011-pcd { font: 800 13pt 'Baloo Da 2'; color: #0C4A6E; background: linear-gradient(135deg, #BAE6FD, #7DD3FC); border: .6mm solid #0EA5E9; border-radius: 3mm; padding: 2mm 5mm 1.4mm; box-shadow: 0 1mm 0 #0284C7; white-space: nowrap }
/* the blocks of p18 and the cards' box */
.c3p011-swrap { display: flex; justify-content: center; padding: 1mm 0 } svg.c3p011-stack { display: block; overflow: visible }
.c3p011-cbox { position: relative; align-self: center; border: .6mm solid var(--c); border-radius: 4mm; background: #fff; box-shadow: 0 1mm 0 var(--s) }
.c3p011-card { position: absolute; display: flex; align-items: center; justify-content: center; border: .5mm solid; border-radius: 1.6mm; font: 800 12pt/1 'Baloo Da 2'; padding-top: .5mm }
/* numbered questions */
.c3p011-qs { display: grid; gap: 1.6mm 6mm; padding-left: 2mm }
.c3p011-q { display: flex; align-items: center; gap: 2mm; font: 500 12.5pt/1.5 'Noto Sans Bengali' }
.c3p011-qm { flex: none; font: 800 12.5pt 'Baloo Da 2'; color: #EA580C; min-width: 8mm }
.c3p011-qt { flex: 0 1 auto } .c3p011-qt .abox { width: 12mm; margin: 0 1mm }
.c3p011-ql { flex: 1 0 auto; height: 0; border-bottom: .5mm dashed #94A3B8; align-self: flex-end; margin-bottom: 1.6mm }
/* multiple choice */
.c3p011-mcq { display: flex; flex-direction: column; gap: 1.5mm; padding-left: 2mm }
.c3p011-mqq { display: flex; gap: 2mm; font: 500 12.5pt/1.5 'Noto Sans Bengali' } svg.c3p011-dots { display: inline-block; vertical-align: -.6mm }
.c3p011-mo { display: grid; gap: .4mm 4mm; padding: .2mm 0 0 10mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.c3p011-mo span { display: flex; align-items: center; gap: 1.2mm; white-space: nowrap } .c3p011-mo b { color: #1D4ED8; font: 700 12pt 'Noto Sans Bengali' }
.c3p011-tk { flex: none; width: 4.2mm; height: 4.2mm; border: .5mm solid #3B9EE8; border-radius: 1.2mm; background: #fff; margin-right: .4mm }
/* the number line */
.c3p011-nline { display: flex; align-items: flex-start; gap: 1mm } .c3p011-nline svg { display: block; overflow: visible }
.c3p011-nl { stroke: var(--d); stroke-width: .6; stroke-linecap: round } .c3p011-nt { stroke: var(--d); stroke-width: .3 } .c3p011-nM { stroke: var(--d); stroke-width: .6 }
.c3p011-nn { font: 800 4.6px 'Baloo Da 2'; fill: var(--d) } .c3p011-nb { fill: #FFFBEB; stroke: #F59E0B; stroke-width: .55 }
`,
};
