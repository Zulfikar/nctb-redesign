// Own kinds for printed pages 25–39 (জোড়-বিজোড় সংখ্যা ও সংখ্যা প্যাটার্ন, ক্রমবাচক সংখ্যা). Every count and position is
// drawn here, so it is exact; the pictured things are ChatGPT stickers (art/ready/sticker-<name>.png), emoji until then.
// Every class is prefixed p025- (the core has bare classes such as .pic, .tag, .note).
//   p025_ex        a task card with the book's pink triangle (▲, in class) or green square (■, on your own) and its number
//   p025_mark      an unnumbered ▲ / ■ line (the book's task lines without a number)
//   p025_duo       the boy and the girl talking side by side (smaller faces)
//   p025_small     blocks with smaller speech-card faces
//   p025_row       stickers in rows, centred (the coconuts on p25)
//   p025_pairtable p26's two tables: pictures, how many pairs, জোড়/বিজোড় (rows of the same height side by side)
//   p025_pairs     p27's six cells: n cubes go through the arrow and come out in pairs
//   p025_rules     p29's two rules with a drawn pair (and a pair and one) beside each
//   p025_wt        a table to write in, with a fixed label column
//   p025_chart     a number grid with circled numbers or an oval around a run (p28, p32)
//   p025_jumps     a number pattern with its jump arrows and the jump size under each (pp. 30–32)
//   p025_eq        a line with big answer boxes: "□" a box, "□□" a wide box, anything else text
//   p025_qa        questions with dotted answer lines (p34, p37)
//   p025_ordinal   p34's ordinal arrows from the left and from the right around the five animals
//   p025_mat       p35's fruits on a table cloth between বাম and ডান
//   p025_chain     p35's five children holding hands between বাম and ডান
//   p025_kids      a row of the children's portraits, with an oval or a ring, a pointing tag or a callout above
//   p025_kidcol    p37's line of ten children, back (পিছনে) at the top, front (সামনে) at the bottom, with name tags
//   p025_line      a line of children drawn as circles (pp. 36, 39): one marked, arrows, brackets and labels
//   p025_draw      room to draw (p39)
const INK = "#1E2433";
// the classmates in pp. 35–38 (one portrait sticker each, used again and again), and the colour of the round card behind each
const KID = {
  "girl-glasses": ["👧🏽", "#FDE047"], "girl-bow": ["👧🏽", "#FECACA"], "girl-orange": ["👧🏽", "#FDBA74"], "girl-blue": ["👧🏽", "#93C5FD"],
  "boy-blue": ["👦🏽", "#BAE6FD"], "boy-beige": ["👦🏽", "#E7D7B5"], "boy-purple": ["👦🏽", "#C4B5FD"],
};
const imgOf = (ctx, name) => { const f = ctx.picFile(`sticker-${name}`); return f ? "file://" + f.file : null; };
/** one sticker (or its emoji until the sticker is there) in a w × h mm box */
function thing(ctx, name, emoji, w, h) {
  const img = imgOf(ctx, name);
  return `<span class="p025-th" style="width:${w}mm;height:${h || w}mm">${img ? `<img src="${img}">` : `<i style="font-size:${(Math.min(w, h || w) * 2.2).toFixed(1)}pt">${emoji}</i>`}</span>`;
}
function kid(ctx, k, size) {
  const img = imgOf(ctx, `kid-${k}`), [emoji, bg] = KID[k];
  return `<span class="p025-th p025-kid" style="width:${size}mm;height:${size}mm;background:radial-gradient(circle at 50% 58%, ${bg} 0 62%, transparent 63%)">${img ? `<img src="${img}">` : `<i style="font-size:${(size * 1.9).toFixed(1)}pt">${emoji}</i>`}</span>`;
}
const triSvg = (n) => `<svg class="p025-tri" viewBox="0 0 22 20"><path d="M11 1.3L20.7 18.7H1.3Z" fill="#F9A8D4" stroke="#DB2777" stroke-width="1.3" stroke-linejoin="round"/>${n ? `<text x="11" y="16.6" text-anchor="middle">${n}</text>` : ""}</svg>`;
const badge = (mark, n, esc) => mark === "sq" ? `<span class="p025-sqb">${n ? esc(n) : ""}</span>` : triSvg(n ? esc(n) : "");
const lines = (s) => String(s).split("\n");

// the drawn cubes of p26, p27 and p29: rows of yellow cubes, each row from the left
function cubesSvg(ctx, rows, s = 4.6, gap = 1.4) {
  const c = ctx.BLOCK.yellow, d = s * 0.36;
  const w = Math.max(...rows) * (s + gap) - gap + d, h = rows.length * (s + d + gap) - gap;
  let out = "";
  rows.forEach((k, r) => { for (let j = 0; j < k; j++) out += ctx.cube(j * (s + gap), d + r * (s + d + gap), s, c); });
  return `<svg class="p025-cubes" width="${(w + .6).toFixed(2)}mm" height="${(h + .6).toFixed(2)}mm" viewBox="-.3 -.3 ${(w + .6).toFixed(2)} ${(h + .6).toFixed(2)}">${out}</svg>`;
}

// p27: n cubes in the arrow, then out in boxed pairs; the one left over stays outside the boxes (n = 1: boxed, as the book)
function pairsSvg(ctx, n) {
  const s = 4.4, g = 1.3, d = s * 0.36, c = ctx.BLOCK.yellow, pad = 2.2, ext = 3.2, headW = 7, bp = 1.3;
  const inRows = n <= 3 ? [n] : n === 4 ? [2, 2] : n === 5 ? [2, 3] : [2, 2, 2];
  const maxR = Math.max(...inRows), rowsW = maxR * (s + g) - g + d, rowsH = inRows.length * (s + d) + (inRows.length - 1) * g;
  const bodyW = rowsW + 2 * pad, bodyH = rowsH + 2 * pad, H0 = bodyH + 2 * ext;
  let out = `<path d="M0 ${ext}H${bodyW}V0L${bodyW + headW} ${H0 / 2}L${bodyW} ${H0}V${ext + bodyH}H0Z" fill="#fff" fill-opacity=".75" stroke="#0369A1" stroke-width=".45" stroke-linejoin="round"/>`;
  inRows.forEach((k, r) => { for (let j = 0; j < k; j++) out += ctx.cube(pad + j * (s + g), ext + pad + d + r * (s + d + g), s, c); });
  const groups = n === 1 ? [1] : Array(Math.floor(n / 2)).fill(2), left = n === 1 ? 0 : n % 2;
  const boxW = (k) => k * (s + g) - g + d + 2 * bp, boxH = s + d + 2 * bp;
  let x = bodyW + headW + 3, W, H = H0;
  const box = (bx, by, k) => { let o = `<rect x="${bx}" y="${by}" width="${boxW(k)}" height="${boxH}" rx="1.2" fill="#fff" fill-opacity=".85" stroke="#0369A1" stroke-width=".45"/>`; for (let j = 0; j < k; j++) o += ctx.cube(bx + bp + j * (s + g), by + bp + d, s, c); return o; };
  if (n <= 3) {
    const by = (H0 - boxH) / 2;
    for (const k of groups) { out += box(x, by, k); x += boxW(k) + 1.6; }
    if (left) { out += ctx.cube(x - .6, by + bp + d, s, c); x += s + d; }
    W = x;
  } else {
    const tot = groups.length * boxH + (groups.length - 1) * 1.8, y0 = (H0 - tot) / 2;
    groups.forEach((k, i) => { out += box(x, y0 + i * (boxH + 1.8), k); });
    W = x + boxW(2);
    if (left) { out += ctx.cube(W + 1.2, y0 + (groups.length - 1) * (boxH + 1.8) + bp + d, s, c); W += 1.2 + s + d; }
    if (tot > H) H = tot;
  }
  return `<svg width="${(W + .6).toFixed(2)}mm" height="${(H + .6).toFixed(2)}mm" viewBox="-.3 -.3 ${(W + .6).toFixed(2)} ${(H + .6).toFixed(2)}">${out}</svg>`;
}

// an arrowhead with its tip at (x, y), pointing along (dx, dy)
function head(x, y, dx, dy, len = 1.7, wid = .95, fill = "#EA580C") {
  const L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, bx = x - ux * len, by = y - uy * len;
  return `<path d="M${x.toFixed(2)} ${y.toFixed(2)}L${(bx - uy * wid).toFixed(2)} ${(by + ux * wid).toFixed(2)}L${(bx + uy * wid).toFixed(2)} ${(by - ux * wid).toFixed(2)}Z" fill="${fill}"/>`;
}

module.exports = {
  kinds: {
    p025_ex: (b, ctx, page) => `<div class="ex p025-ex p025-ex-${b.mark || "tri"}"><div class="ext">${badge(b.mark, b.n, ctx.esc)}<span>${ctx.md(b.text)}</span></div>${(b.body || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
    p025_mark: (b, ctx) => `<div class="p025-mark">${badge(b.mark, b.n, ctx.esc)}<span>${ctx.md(b.text)}</span></div>`,
    p025_duo: (b, ctx, page) => `<div class="p025-duo p025-small">${ctx.blockHtml({ say: "boy", mood: b.boy[0], text: b.boy[1] }, page)}${ctx.blockHtml({ say: "girl", mood: b.girl[0], text: b.girl[1] }, page)}</div>`,
    p025_small: (b, ctx, page) => `<div class="p025-small" style="gap:${b.gap ?? 2}mm">${b.body.map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
    p025_row: (b, ctx) => `<div class="p025-rows" style="gap:${b.vgap ?? 3}mm">${b.rows.map((k) => `<div style="gap:${b.gap ?? 3}mm">${Array.from({ length: k }, () => thing(ctx, b.s, b.e, b.size || 14)).join("")}</div>`).join("")}</div>`,

    p025_pairtable: (b, ctx) => {
      const size = b.size || 12;
      const pic = (p) => {
        if (p.cubes) return cubesSvg(ctx, p.cubes, 4.4, 1.6);
        const img = imgOf(ctx, p.s);
        // a pair of socks: two copies of the one sock, overlapping (the emoji is a pair already)
        const unit = () => p.pair && img ? `<span class="p025-pair" style="width:${size * 1.45}mm;height:${size}mm"><img src="${img}"><img src="${img}"></span>` : thing(ctx, p.s, p.e, size);
        return `<div class="p025-prow">${p.rows.map((k) => `<div>${Array.from({ length: k }, unit).join("")}</div>`).join("")}</div>`;
      };
      // the row heights are shared by both tables, so their rows line up as in the book
      const heights = b.tables[0].rows.map((_, i) => Math.max(...b.tables.map((t) => { const p = t.rows[i].pic; return p.cubes ? p.cubes.length : p.rows.length; })) > 1 ? b.tall || 37 : b.short || 27);
      const one = (t) => `<table class="grid tone-${t.tone} p025-pt"><thead><tr><th>ছবি</th><th>কয়টি</th><th></th></tr></thead><tbody>${t.rows.map((r, i) => `<tr style="height:${heights[i]}mm"><td class="p025-pc">${pic(r.pic)}<span class="p025-cap">${ctx.esc(r.cap)}</span></td><td class="p025-ct">${ctx.md(r.count)}</td><td class="p025-eo ${r.odd ? "p025-odd" : "p025-even"}">${ctx.esc(r.label)}</td></tr>`).join("")}</tbody></table>`;
      return `<div class="p025-pts">${b.tables.map(one).join("")}</div>`;
    },
    p025_pairs: (b, ctx) => `<div class="p025-pairs">${b.ns.map((n) => `<div class="p025-cell"><div class="p025-pcell">${pairsSvg(ctx, n)}</div><div class="p025-nn">${ctx.bn(n)}</div></div>`).join("")}</div>`,
    p025_rules: (b, ctx) => `<div class="p025-rules">${b.rows.map((r) => `<div class="p025-rr${r.odd ? " p025-odd" : ""}"><span class="p025-ic"><span class="p025-bx">${cubesSvg(ctx, [2], 3.4, 1)}</span>${r.odd ? cubesSvg(ctx, [1], 3.4, 1) : ""}</span><span class="p025-rt">${ctx.md(r.text)}</span></div>`).join("")}</div>`,
    // a table to write in: the first column (labels) lw mm wide, "…" an empty cell
    p025_wt: (b, ctx) => `<table class="grid tone-${b.tone || "yellow"} left p025-wt">${b.lw ? `<colgroup><col style="width:${b.lw}mm"><col></colgroup>` : ""}<tbody>${b.rows.map((r) => `<tr>${r.map((c, i) => c === "…" ? `<td class="gap"><i></i></td>` : `<td class="${i === 0 ? "p025-lab" : ""}">${ctx.md(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`,

    p025_chart: (b, ctx) => {
      const { cols = 10, w = 15.5, h = 9.4, ring = [], tone = "pink" } = b;
      const nums = b.rows ? null : Array.from({ length: b.end - b.start + 1 }, (_, i) => b.start + i);
      const cells = b.rows ? b.rows.flat() : nums.map((n) => ctx.bn(n));
      const html = cells.map((c, i) => `<span>${nums && ring.includes(nums[i]) ? `<b class="p025-rg">${c}</b>` : ctx.esc(c)}</span>`).join("");
      const oval = b.oval ? `<i class="p025-oval" style="left:${b.oval[1] * w + .8}mm;top:${b.oval[0] * h + .9}mm;width:${(b.oval[2] - b.oval[1] + 1) * w - 1.6}mm;height:${h - 1.8}mm"></i>` : "";
      return `<div class="p025-chart tone-${tone}" style="grid-template-columns:repeat(${cols}, ${w}mm);grid-auto-rows:${h}mm">${html}${oval}</div>`;
    },
    p025_jumps: (b, ctx) => {
      const { nums, arcs = 3, step, blank = true, pitch = 15.5, fs = 4.6 } = b;
      const y = fs + .6, n = nums.length, W = blank ? n * pitch + 14 : (n - 1) * pitch + 8, H = y + 12;
      let s = nums.map((t, i) => `<text x="${(i * pitch).toFixed(2)}" y="${y}" class="p025-n">${ctx.esc(t)}</text>`).join("");
      for (let i = 0; i < arcs; i++) {
        const x1 = i * pitch + 3.4, x2 = (i + 1) * pitch + 1.6, y1 = y + 1.8, y2 = y + .9, cx = (x1 + x2) / 2, cy = y + 9.4;
        s += `<path d="M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}" class="p025-arc"/>${head(x2, y2, x2 - cx, y2 - cy)}<text x="${(cx - .4).toFixed(2)}" y="${(y + 11.2).toFixed(2)}" class="p025-st" text-anchor="middle">${ctx.esc(step)}</text>`;
      }
      if (blank) s += `<path d="M${n * pitch} ${y}h13" class="p025-bl"/>`;
      return `<div class="p025-jumps"><svg width="${W.toFixed(1)}mm" height="${H.toFixed(1)}mm" viewBox="-.5 0 ${(W + .5).toFixed(1)} ${H.toFixed(1)}">${s}</svg></div>`;
    },
    p025_eq: (b, ctx) => `<div class="p025-eq${b.center ? " p025-center" : ""}">${b.parts.map((p) => p === "□" ? `<span class="p025-box"></span>` : p === "□□" ? `<span class="p025-box p025-wide"></span>` : `<span class="p025-t">${ctx.md(p)}</span>`).join("")}</div>`,
    p025_qa: (b, ctx) => `<div class="p025-qa" style="grid-template-columns:${b.qw || 52}mm ${b.lw ? b.lw + "mm" : "1fr"}">${b.items.map((it) => {
      const q = typeof it === "string" ? { q: it } : it;
      return q.head ? `<span class="p025-q p025-full${q.plain ? " p025-plain" : ""}">${ctx.md(q.q)}</span>` : `<span class="p025-q${q.indent ? " p025-in" : ""}">${ctx.md(q.q)}</span><i class="p025-ln"></i>`;
    }).join("")}</div>`,

    p025_ordinal: (b, ctx) => {
      const col = 28, L = 13, cw = 5 * col, Wt = L + cw + 10;
      const cx = (i) => L + (i + .5) * col;
      const band = (r2l) => {
        const labels = r2l ? [...b.labels].reverse() : b.labels, fill = r2l ? "#FBCFE8" : "#BAE6FD", k = r2l ? "#DB2777" : "#0284C7";
        let s = r2l ? `<path d="M${L - 3} 2.4H${L + cw}V7.6H${L - 3}V.2L${L - 11} 5L${L - 3} 9.8Z" fill="${fill}" stroke="${k}" stroke-width=".45" stroke-linejoin="round"/>`
          : `<path d="M${L} 2.4H${L + cw}V.2L${L + cw + 8} 5L${L + cw} 9.8V7.6H${L}Z" fill="${fill}" stroke="${k}" stroke-width=".45" stroke-linejoin="round"/>`;
        labels.forEach((t, i) => {
          const c = cx(i), p = r2l ? `M${c - 8} .9H${c + 11}V9.1H${c - 8}L${c - 11.4} 5Z` : `M${c - 11} .9H${c + 8}L${c + 11.4} 5L${c + 8} 9.1H${c - 11}Z`;
          s += `<path d="${p}" fill="#fff" stroke="${k}" stroke-width=".45" stroke-linejoin="round"/><text x="${c}" y="6.6" text-anchor="middle" class="p025-ol">${ctx.esc(t)}</text>`;
        });
        const tx = r2l ? L + cw + .8 : 0, tl = lines(r2l ? b.right : b.left);
        s += `<rect x="${tx}" y=".2" width="${r2l ? 10.6 : 11.4}" height="9.6" rx="1" fill="#FCE7F3" stroke="#DB2777" stroke-width=".45"/>${tl.map((t, j) => `<text x="${tx + (r2l ? 5.3 : 5.7)}" y="${4.1 + j * 4}" text-anchor="middle" class="p025-tg">${ctx.esc(t)}</text>`).join("")}`;
        return `<svg width="${Wt}mm" height="10.2mm" viewBox="0 0 ${Wt} 10.2" class="p025-band">${s}</svg>`;
      };
      return `<div class="p025-ord" style="width:${Wt}mm">${band(false)}<div class="p025-anim" style="margin-left:${L}mm;width:${cw}mm">${b.things.map(([s, e]) => thing(ctx, s, e, col - 3, b.h || 21)).join("")}</div>${band(true)}</div>`;
    },
    p025_mat: (b, ctx) => {
      const n = b.things.length, size = b.size || 17, W = n * (size + 1) + 34;
      return `<div class="p025-lrrow"><span class="p025-lr">${ctx.esc(b.left)}</span><div class="p025-matw" style="width:${W}mm"><svg class="p025-cloth" viewBox="0 0 ${W} 14" preserveAspectRatio="none"><path d="M14 .5H${W - .5}L${W - 14} 13.5H.5Z" fill="#BAE6FD" stroke="${INK}" stroke-width=".4" stroke-linejoin="round"/></svg>
        <div class="p025-on">${b.things.map(([s, e]) => thing(ctx, s, e, size)).join("")}</div></div><span class="p025-lr">${ctx.esc(b.right)}</span></div>`;
    },
    p025_chain: (b, ctx) => `<div class="p025-lrrow"><span class="p025-lr">${ctx.esc(b.left)}</span><div class="p025-chain">${b.kids.map((k) => thing(ctx, `${k}-arms-out`, k === "girl" ? "👧🏽" : "👦🏽", b.w || 19, b.h || 27)).join("")}</div><span class="p025-lr">${ctx.esc(b.right)}</span></div>`,
    p025_kids: (b, ctx) => {
      const s = b.size || 15, g = b.gap ?? 1.2, n = b.kids.length, W = n * s + (n - 1) * g, x = (i) => i * (s + g);
      let marks = "", cxm = W / 2;
      if (b.oval) { const [a, z] = b.oval; marks += `<i class="p025-oval" style="left:${x(a) - 1.3}mm;width:${x(z) + s - x(a) + 2.6}mm;top:-1.2mm;height:${s + 2.4}mm"></i>`; cxm = (x(a) + x(z) + s) / 2; }
      if (b.ring != null) { marks += `<i class="p025-ring" style="left:${x(b.ring) - 1}mm;width:${s + 2}mm;top:-1mm;height:${s + 2}mm"></i>`; cxm = x(b.ring) + s / 2; }
      let row = `<div class="p025-kids" style="width:${W}mm;height:${s}mm;gap:${g}mm">${b.kids.map((k) => kid(ctx, k, s)).join("")}${marks}</div>`;
      if (b.frame) row = `<div class="p025-kframe">${row}</div>`;
      let call = "";
      if (b.call) {
        const cw = b.call.w || 62, f = b.frame ? 2.6 : 0, left = Math.max(0, Math.min(W - cw, cxm - cw / 2)) + f;
        call = `<div class="p025-call" style="margin-left:${left.toFixed(2)}mm;width:${cw}mm;--ax:${(cxm + f - left).toFixed(2)}mm">${ctx.md(b.call.text)}</div>`;
      }
      const tag = b.tag ? `<span class="p025-tag p025-${b.tag.tone || "blue"}">${ctx.md(b.tag.text)}</span>` : "";
      return `<div class="p025-kidw">${tag}<div class="p025-kidc">${call}${row}</div></div>`;
    },
    p025_kidcol: (b, ctx) => `<div class="p025-kidcol" style="gap:${b.gap ?? .9}mm">${b.kids.map(([k, name], i) => `<div class="p025-kr" style="grid-template-columns:15mm ${b.size || 12.5}mm 29mm"><span class="p025-side">${i === 0 ? ctx.esc(b.back) : i === b.kids.length - 1 ? ctx.esc(b.front) : ""}</span>${kid(ctx, k, b.size || 12.5)}<span class="p025-nm">${ctx.esc(name)}</span></div>`).join("")}</div>`,

    p025_line: (b, ctx) => {
      const { n, hi, hiFill = "#EC4899", panel = "#ECFCCB", edge = "#84CC16", arrows = [], labels = [], brackets = [] } = b;
      const r = 3.1, p = 6.9, cx = 21, top = 4.6, W = b.w || 76, lx = cx + r + 9, lw = W - lx - 3;
      const cy = (i) => top + r + i * p, H = cy(n - 1) + r + 4.6;
      let s = `<rect x=".3" y=".3" width="${W - .6}" height="${H - .6}" rx="5" fill="${panel}" stroke="${edge}" stroke-width=".5"/>`;
      const tag = (y, t) => `<rect x="${cx - r - 16.6}" y="${(y - 3.1).toFixed(2)}" width="15" height="6.2" rx="1.6" fill="#fff" stroke="${INK}" stroke-width=".35"/><text x="${cx - r - 9.1}" y="${(y + 1.4).toFixed(2)}" text-anchor="middle" class="p025-lt">${ctx.esc(t)}</text>`;
      s += tag(cy(0), b.back) + tag(cy(n - 1), b.front);
      for (let i = 0; i < n; i++) s += `<circle cx="${cx}" cy="${cy(i).toFixed(2)}" r="${r}" fill="${i === hi ? hiFill : "#fff"}" stroke="${INK}" stroke-width=".45"/>`;
      const ax = cx + r + 3.2;
      for (const a of arrows) {
        const down = a.to > a.from, y1 = down ? cy(a.from) - r : cy(a.from) + r, y2 = down ? cy(a.to) - r - .7 : cy(a.to) + r + .7;
        s += `<path d="M${ax} ${y1.toFixed(2)}V${(y2 + (down ? -1.4 : 1.4)).toFixed(2)}" stroke="${INK}" stroke-width=".45"/>${head(ax, y2, 0, down ? 1 : -1, 1.8, .9, INK)}`;
      }
      const box = (yc, text, fill, k) => { const ls = lines(text), bh = ls.length * 4.5 + 2.6; return `<rect x="${lx}" y="${(yc - bh / 2).toFixed(2)}" width="${lw}" height="${bh}" rx="1.4" fill="${fill}" stroke="${k}" stroke-width=".4"/>${ls.map((t, j) => `<text x="${lx + lw / 2}" y="${(yc - bh / 2 + 4.6 + j * 4.5).toFixed(2)}" text-anchor="middle" class="p025-lb">${ctx.esc(t)}</text>`).join("")}`; };
      const tone = (t) => t === "pink" ? ["#FCE7F3", "#DB2777"] : ["#E0F2FE", "#0284C7"];
      for (const k of brackets) {
        const y1 = cy(k.from) - r + .2, y2 = cy(k.to) + r - .2, bx = cx + r + 2.6, ym = (y1 + y2) / 2, [f, e] = tone(k.tone);
        s += `<path d="M${bx - 1.4} ${y1.toFixed(2)}H${bx}V${y2.toFixed(2)}H${bx - 1.4}M${bx} ${ym.toFixed(2)}H${lx}" fill="none" stroke="${INK}" stroke-width=".45"/>${box(ym, k.text, f, e)}`;
      }
      for (const l of labels) {
        const [f, e] = tone(l.tone), py = cy(hi) + (l.dy || 0);
        s += box(cy(l.at), l.text, f, e) + `<path d="M${lx - .6} ${py.toFixed(2)}H${cx + r + 2.2}" stroke="${l.ptr || "#DB2777"}" stroke-width=".5"/>${head(cx + r + .7, py, -1, 0, 1.6, .85, l.ptr || "#DB2777")}`;
      }
      return `<div class="p025-line"><svg width="${W}mm" height="${H.toFixed(2)}mm" viewBox="0 0 ${W} ${H.toFixed(2)}">${s}</svg></div>`;
    },
    p025_draw: (b) => `<div class="p025-draw" style="height:${b.h || 40}mm"></div>`,
  },

  css: `
/* task cards and lines with the book's ▲ (in class) and ■ (on your own) */
.p025-ex .ext { grid-template-columns: 10.5mm 1fr; align-items: start }
.p025-ex.p025-ex-sq { background: #F7FEE7; border-color: #A3E635 }
.p025-tri { width: 8.6mm; height: 7.8mm; display: block; margin-top: .2mm } .p025-tri text { font: 800 9.6px 'Baloo Da 2'; fill: #831843 }
.p025-sqb { display: inline-flex; align-items: center; justify-content: center; width: 7mm; height: 7mm; margin-top: .4mm; border-radius: 1.6mm; background: linear-gradient(135deg, #D9F99D, #A3E635); border: .5mm solid #65A30D; font: 800 11.5pt/1 'Baloo Da 2'; color: #365314; box-shadow: 0 .6mm 0 #4D7C0F }
.p025-mark { display: flex; align-items: flex-start; gap: 2.4mm; font: 600 12.5pt/1.45 'Noto Sans Bengali' } .p025-mark .p025-tri { width: 7.4mm; height: 6.7mm; flex: none; margin-top: .4mm } .p025-mark .p025-sqb { flex: none; width: 6.2mm; height: 6.2mm }
/* stickers */
.p025-th { display: inline-flex; align-items: center; justify-content: center; position: relative; flex: none }
.p025-th img { max-width: 100%; max-height: 100%; object-fit: contain } .p025-th i { font-family: 'Noto Color Emoji'; font-style: normal; line-height: 1 }
.p025-kid { border-radius: 50%; overflow: hidden } .p025-kid img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 18% }
.p025-rows { display: flex; flex-direction: column; align-items: center } .p025-rows > div { display: flex; justify-content: center }
/* smaller faces where two children talk side by side */
.p025-small { display: flex; flex-direction: column } .p025-small .fc { width: 15mm; height: 15mm } .p025-small .sb { font-size: 11.8pt; padding: 2mm 4mm 1.7mm }
.p025-duo { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; align-items: center }
/* p26 */
.p025-pts { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; align-items: start }
.p025-pt td { height: auto; vertical-align: middle; font: 700 11.6pt/1.35 'Baloo Da 2' } .p025-pt th { font-size: 11pt }
.p025-pt td.p025-pc { width: 41%; background: #fff; padding: 1.6mm .8mm 1.2mm } .p025-pt td.p025-ct { width: 38% } .p025-pt td.p025-eo { font-size: 12.5pt }
.p025-pt td.p025-even { color: #0369A1 } .p025-pt td.p025-odd { color: #BE185D }
.p025-cap { display: block; font: 400 10.5pt/1.3 'Noto Sans Bengali'; margin-top: .8mm }
.p025-prow { display: flex; flex-direction: column; align-items: center; gap: .6mm } .p025-prow > div { display: flex; justify-content: center; gap: .8mm }
.p025-pair { position: relative; display: inline-block; flex: none } .p025-pair img { position: absolute; height: 100%; width: auto; top: 0 } .p025-pair img:first-child { left: 0 } .p025-pair img:last-child { right: 0; top: 4% }
svg.p025-cubes { display: inline-block; vertical-align: middle; overflow: visible }
/* p27 */
.p025-pairs { display: grid; grid-template-columns: 1fr 1fr 1.25fr; border: .6mm solid #0EA5E9; border-radius: 3.4mm; overflow: hidden; background: #E0F2FE }
.p025-cell { display: flex; flex-direction: column; border-right: .3mm solid #7DD3FC; border-bottom: .3mm solid #7DD3FC } .p025-cell:nth-child(3n) { border-right: 0 } .p025-cell:nth-child(n+4) { border-bottom: 0 }
.p025-pcell { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2.4mm 1.6mm; min-height: 27mm }
.p025-nn { text-align: center; font: 800 14pt/1 'Baloo Da 2'; color: #fff; background: #0EA5E9; padding: 1.4mm 0 1mm }
/* p29 */
.p025-rules { display: flex; flex-direction: column; gap: 2mm; width: 150mm; align-self: center }
.p025-rr { display: flex; align-items: stretch; border: .6mm solid #0EA5E9; border-radius: 3mm; overflow: hidden; background: #F0F9FF } .p025-rr.p025-odd { border-color: #DB2777; background: #FDF2F8 }
.p025-ic { flex: none; width: 24mm; display: flex; align-items: center; justify-content: center; gap: 1mm; background: #BAE6FD } .p025-odd .p025-ic { background: #FBCFE8 }
.p025-bx { display: inline-flex; padding: .8mm 1mm; border: .4mm solid #0369A1; border-radius: 1mm; background: #fff }
.p025-rt { padding: 1.8mm 3.4mm 1.4mm; font: 600 12.5pt/1.5 'Noto Sans Bengali' }
.p025-wt { table-layout: fixed } .p025-wt td.p025-lab { font: 700 12pt 'Noto Sans Bengali'; background: var(--tl) } .p025-wt td { height: 10mm }
/* number grids */
.p025-chart { position: relative; display: grid; align-self: center; border: .6mm solid var(--tc); border-radius: 2.6mm; overflow: hidden; background: var(--tb) }
.p025-chart span { display: flex; align-items: center; justify-content: center; font: 700 12.5pt 'Baloo Da 2'; border-right: .3mm solid var(--tl); border-bottom: .3mm solid var(--tl) }
.p025-rg { display: inline-flex; align-items: center; justify-content: center; width: 8.2mm; height: 8.2mm; border-radius: 50%; border: .55mm solid #BE185D; background: #fff; font-weight: 800; color: #9D174D }
.p025-oval { position: absolute; border: .6mm solid #DB2777; border-radius: 50%; pointer-events: none }
.p025-ring { position: absolute; border: .7mm solid #B45309; border-radius: 50% }
/* number patterns with jumps */
.p025-jumps { display: flex; justify-content: center } .p025-jumps svg { overflow: visible }
.p025-n { font: 700 4.6px 'Baloo Da 2'; fill: ${INK} } .p025-st { font: 800 3.9px 'Baloo Da 2'; fill: #EA580C }
.p025-arc { fill: none; stroke: #EA580C; stroke-width: .42 } .p025-bl { stroke: #64748B; stroke-width: .45 }
/* big answer boxes */
.p025-eq { display: flex; align-items: center; flex-wrap: wrap; gap: 2mm; font: 700 13pt 'Baloo Da 2' } .p025-eq.p025-center { justify-content: center }
.p025-box { display: inline-block; width: 19mm; height: 10.5mm; border: .6mm solid #0EA5E9; border-radius: 2.2mm; background: linear-gradient(135deg, #fff, #E0F2FE) } .p025-box.p025-wide { width: 28mm }
.p025-t { white-space: nowrap }
/* questions with answer lines */
.p025-qa { display: grid; gap: 1.6mm 2mm; align-items: end; padding-left: 1mm }
.p025-q { position: relative; padding-left: 4.6mm; font: 600 12pt/1.4 'Noto Sans Bengali' } .p025-q::before { content: ""; position: absolute; left: .4mm; top: 1.9mm; width: 2.4mm; height: 2.4mm; border-radius: 50%; background: var(--c) }
.p025-q.p025-in { padding-left: 13mm } .p025-q.p025-in::before { display: none } .p025-q.p025-full { grid-column: 1 / -1 }
.p025-q.p025-plain { padding-left: 0 } .p025-q.p025-plain::before { display: none }
.p025-ln { display: block; border-bottom: .5mm dotted #64748B; margin-bottom: 1.6mm }
/* p34: ordinal arrows */
.p025-ord { align-self: center; display: flex; flex-direction: column; gap: 1.6mm } .p025-band { display: block; overflow: visible }
.p025-ol { font: 700 4.2px 'Baloo Da 2'; fill: ${INK} } .p025-tg { font: 700 3.3px 'Noto Sans Bengali'; fill: #9D174D }
.p025-anim { display: flex; justify-content: space-around; align-items: flex-end; border: .6mm solid var(--c); border-radius: 3mm; background: linear-gradient(#F8FBFF, #EEF5FF); padding: 1.4mm 0 1mm }
/* p35 */
.p025-lrrow { display: flex; align-items: center; justify-content: center; gap: 3.4mm }
.p025-lr { flex: none; font: 700 12pt 'Baloo Da 2'; border: .5mm solid ${INK}; border-radius: 2.4mm; background: #fff; padding: .8mm 3mm .4mm; box-shadow: 0 .6mm 0 #CBD5E1 }
.p025-matw { position: relative; display: flex; justify-content: center; padding-bottom: 2mm } .p025-cloth { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 13mm }
.p025-on { position: relative; display: flex; gap: 1mm; align-items: flex-end }
.p025-chain { display: flex } .p025-chain .p025-th + .p025-th { margin-left: -3.2mm }
.p025-kidw { display: flex; align-items: flex-end; justify-content: center; gap: 4mm } .p025-kidc { display: flex; flex-direction: column; gap: 1mm }
.p025-kids { position: relative; display: flex }
.p025-kframe { border: .6mm solid #4338CA; border-radius: 2.4mm; background: #fff; padding: 1.4mm 2mm .6mm }
.p025-tag { display: inline-block; margin-bottom: 2.6mm; font: 700 12pt 'Noto Sans Bengali'; color: #0C4A6E; padding: 1.3mm 8mm 1.1mm 3.6mm; background: #BAE6FD; clip-path: polygon(0 0, calc(100% - 4.6mm) 0, 100% 50%, calc(100% - 4.6mm) 100%, 0 100%); border-radius: 1.6mm 0 0 1.6mm }
.p025-tag.p025-pink { background: #FBCFE8; color: #831843 }
.p025-call { position: relative; text-align: center; font: 700 14pt 'Noto Sans Bengali'; background: #FEF08A; border-radius: 2.4mm; padding: 3.4mm 2mm 3mm; margin-bottom: 10mm; box-shadow: 0 .7mm 0 #EAB308 }
.p025-call::after { content: ""; position: absolute; left: calc(var(--ax) - 6mm); top: calc(100% + .7mm); border: 6mm solid transparent; border-top: 8.4mm solid #FACC15; border-bottom: 0 }
/* p37: the line of ten */
.p025-kidcol { display: flex; flex-direction: column; gap: .9mm; border: .6mm solid var(--c); border-radius: 3mm; background: #fff; padding: 2mm 2.4mm }
.p025-kr { display: grid; grid-template-columns: 15mm 12.5mm 29mm; align-items: center; gap: 1.6mm }
.p025-side { font: 600 9.5pt 'Noto Sans Bengali'; text-align: center; background: #DBEAFE; border-radius: 99px; padding: .4mm 0 .2mm } .p025-side:empty { background: none }
.p025-nm { font: 700 11.5pt 'Noto Sans Bengali'; text-align: center; border: .5mm solid ${INK}; border-radius: 2.4mm; padding: .6mm 0 .3mm; background: #FFFDF2 }
/* pp. 36, 39: the line drawn as circles */
.p025-line { display: flex; justify-content: center } .p025-lt { font: 600 3.7px 'Noto Sans Bengali'; fill: ${INK} } .p025-lb { font: 600 3.8px 'Noto Sans Bengali'; fill: ${INK} }
.p025-draw { border: .6mm dashed #A3E635; border-radius: 3mm; background: repeating-linear-gradient(0deg, transparent 0 7.6mm, #ECFCCB 7.6mm 7.9mm), #fff }
`,
};
