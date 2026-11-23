// Own kinds for printed pages 91–106 (chapter ৯, ভগ্নাংশ). Every fraction picture is drawn here, cut and shaded exactly as
// the book cuts and shades it, so every part is truly equal (or, on p93, truly a half and two quarters):
// - c3p091_shapes: squares, rectangles, circles, ellipses, triangles, rhombuses and the "house" pentagon, cut by dashed or
//   solid lines into halves, quarters, eighths, shaded part by part, with labels inside the parts;
// - c3p091_fold: the paper folds of p91 (the paper, folded in half, the two halves laid on each other);
// - c3p091_roti: the roti of p91, drawn (dough and browned spots) and cut into equal halves or unequal parts;
// - c3p091_strips: strips, tapes and bars cut into equal parts, braces ("১ মিটার"), labels, number lines from ০ to ১ with
//   their ticks and answer boxes, and dashed drop lines (pp92–103, the fraction wall p97);
// - c3p091_cross: the cross-multiplication arrows (pp98–99); c3p091_match3: the three-column match (p105);
// - small helpers: an exercise heading with pictures beside it (c3p091_head), grids of items (c3p091_grid), a text line
//   with wide boxes (c3p091_tx, ▭), writing/drawing boxes (c3p091_box), the definition cards (c3p091_card, c3p091_lh),
//   the △/○ example (c3p091_tc), tables whose cells hold drawings (c3p091_tbl), a small bar (c3p091_bar), the trapezoid
//   of triangles (c3p091_trap), the fat arrow (c3p091_fat).
// All sizes in mm. Kinds are prefixed c3p091_, classes c3p091-.
const INK = "#1E2433";
let UID = 0;
const uid = () => `c3p091u${++UID}`;
const f2 = (n) => Math.round(n * 100) / 100;
const lcg = (seed) => { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };
const polyD = (pts) => "M" + pts.map(([x, y]) => `${f2(x)} ${f2(y)}`).join("L") + "Z";

// friendly versions of the book's colours
const PAL = {
  yellow: "#FDE047", gold: "#F5C518", green: "#86EFAC", grass: "#8BCB5E", leaf: "#4CC764", blue: "#38BDF8", sky: "#A5CDF2",
  pink: "#F67FA4", blush: "#F8C8DC", orange: "#FB923C", rust: "#D9773A", red: "#EF4444", tan: "#E3C27A", brown: "#C99A3A",
  peach: "#FDCDBB", lime: "#EEF3A2", teal: "#8FD9E3", lilac: "#E6B9DD", sand: "#FDE2A4", cream: "#FEF3A0", salmon: "#F8B9AC",
  mint: "#CDEBC0", paper: "#4CC764",
};
const col = (c) => PAL[c] || c || PAL.blue;

// ── labels over a drawing: [x, y, markup, anchor (c|l|r), extra class, size pt] ──
function wrap(ctx, w, h, svg, labels = [], cls = "") {
  const lb = labels.map(([x, y, t, a = "c", k = "", size]) => `<span class="c3p091-lb a-${a}${k ? " " + k : ""}" style="left:${f2(x)}mm;top:${f2(y)}mm${size ? `;font-size:${size}pt` : ""}">${ctx.md(t)}</span>`).join("");
  return `<div class="c3p091-dg${cls ? " " + cls : ""}" style="width:${f2(w)}mm;height:${f2(h)}mm"><svg viewBox="0 0 ${f2(w)} ${f2(h)}" width="${f2(w)}mm" height="${f2(h)}mm">${svg}</svg>${lb}</div>`;
}
const arrowG = (x1, y1, x2, y2, sw = 0.4, head = 1.8) => {
  const a = Math.atan2(y2 - y1, x2 - x1), hx = (d, s) => x2 - head * Math.cos(a) + s * d * Math.sin(a), hy = (d, s) => y2 - head * Math.sin(a) - s * d * Math.cos(a);
  return `<path d="M${f2(x1)} ${f2(y1)}L${f2(x2 - head * 0.6 * Math.cos(a))} ${f2(y2 - head * 0.6 * Math.sin(a))}" stroke="${INK}" stroke-width="${sw}" fill="none"/>
    <path d="M${f2(x2)} ${f2(y2)}L${f2(hx(head * 0.42, 1))} ${f2(hy(head * 0.42, 1))}L${f2(hx(head * 0.42, -1))} ${f2(hy(head * 0.42, -1))}Z" fill="${INK}"/>`;
};
// a curly brace from x1 to x2; its ends at yEnd, its tip at yEnd − h (up) or yEnd + h (down)
function braceG(x1, x2, yEnd, h, up) {
  const s = up ? -1 : 1, m = (x1 + x2) / 2, q = Math.min(h * 1.1, (x2 - x1) / 4), yS = yEnd + s * h / 2, yT = yEnd + s * h;
  return `<path d="M${f2(x1)} ${f2(yEnd)}Q${f2(x1)} ${f2(yS)} ${f2(x1 + q)} ${f2(yS)}H${f2(m - q)}Q${f2(m)} ${f2(yS)} ${f2(m)} ${f2(yT)}Q${f2(m)} ${f2(yS)} ${f2(m + q)} ${f2(yS)}H${f2(x2 - q)}Q${f2(x2)} ${f2(yS)} ${f2(x2)} ${f2(yEnd)}" fill="none" stroke="${INK}" stroke-width=".4" stroke-linejoin="round" stroke-linecap="round"/>`;
}

// ── shapes cut into parts (unit coordinates: 0..1 across the shape's box) ──
const OUTLINES = {
  square: { poly: [[0, 0], [1, 0], [1, 1], [0, 1]] }, rect: { poly: [[0, 0], [1, 0], [1, 1], [0, 1]] },
  circle: { ell: true }, ellipse: { ell: true },
  "tri-down": { poly: [[0, 0], [1, 0], [0.5, 1]] }, rhombus: { poly: [[0, 0.5], [0.5, 0], [1, 0.5], [0.5, 1]] },
  house: { poly: [[0, 0], [0.56, 0], [1, 0.5], [0.56, 1], [0, 1]] },
};
const CUTS = {
  v: [[0.5, 0, 0.5, 1]], h: [[0, 0.5, 1, 0.5]], x: [[0.5, 0, 0.5, 1], [0, 0.5, 1, 0.5]], d: [[0, 1, 1, 0]], e: [[0, 0, 1, 1]],
  x8: [[0.5, 0, 0.5, 1], [0, 0.5, 1, 0.5], [0, 0, 1, 1], [0, 1, 1, 0]],
  dq: [[0, 1, 1, 0], [0.5, 0.5, 1, 1]], // p93: a diagonal, and from its middle to a corner (a half and two quarters)
  tri: [[0, 1, 0.5, 0], [0.5, 0, 1, 1]], // p93: a triangle on the whole bottom side, its top at the middle of the top side
};
const PIECES = {
  l: [[0, 0], [0.5, 0], [0.5, 1], [0, 1]], r: [[0.5, 0], [1, 0], [1, 1], [0.5, 1]], t: [[0, 0], [1, 0], [1, 0.5], [0, 0.5]], b: [[0, 0.5], [1, 0.5], [1, 1], [0, 1]],
  tl: [[0, 0], [0.5, 0], [0.5, 0.5], [0, 0.5]], tr: [[0.5, 0], [1, 0], [1, 0.5], [0.5, 0.5]], bl: [[0, 0.5], [0.5, 0.5], [0.5, 1], [0, 1]], br: [[0.5, 0.5], [1, 0.5], [1, 1], [0.5, 1]],
  ul: [[0, 0], [1, 0], [0, 1]], lr: [[1, 0], [1, 1], [0, 1]], all: [[0, 0], [1, 0], [1, 1], [0, 1]],
};
// a piece pushed past the box where it touches the box, so clipping by it never cuts the shape's own outline
const grow = (poly) => poly.map(([x, y]) => [x === 0 ? -0.3 : x === 1 ? 1.3 : x, y === 0 ? -0.3 : y === 1 ? 1.3 : y]);

function paperTex(w, h, seed = 5) { // a soft watercolour look for the coloured papers
  const R = lcg(seed); let s = "";
  for (let i = 0; i < 9; i++) s += `<ellipse cx="${f2(R() * w)}" cy="${f2(R() * h)}" rx="${f2(w * (0.12 + R() * 0.2))}" ry="${f2(h * (0.08 + R() * 0.16))}" fill="${i % 2 ? "#fff" : "#000"}" opacity="${i % 2 ? 0.16 : 0.07}"/>`;
  return s;
}
/** One shape, w × h, at (x, y): { o, cut | lines, solid, fill: ["r", { p: [[u, v]…], c }], color, bg, paper } */
function shapeG({ o = "square", w, h, cut, lines, solid = false, fill = [], color = "blue", bg = "#fff", paper = false, sw = 0.5 }, x = 0, y = 0) {
  h = h ?? w;
  const O = OUTLINES[o]; if (!O) throw new Error("c3p091 shape? " + o);
  const m = sw / 2 + 0.1, P = ([u, v]) => [m + u * (w - 2 * m), m + v * (h - 2 * m)];
  const outline = (a) => O.ell ? `<ellipse cx="${f2(w / 2)}" cy="${f2(h / 2)}" rx="${f2(w / 2 - m)}" ry="${f2(h / 2 - m)}" ${a}/>` : `<path d="${polyD(O.poly.map(P))}" ${a}/>`;
  const id = uid();
  let inner = "";
  for (const f of fill) { const p = typeof f === "string" ? PIECES[f] : f.p; if (!p) throw new Error("c3p091 piece? " + f); inner += `<path d="${polyD(grow(p).map(P))}" fill="${col(typeof f === "string" ? color : f.c || color)}"/>`; }
  if (paper) inner += paperTex(w, h, Math.round(w * 7 + h));
  for (const [u1, v1, u2, v2] of lines || CUTS[cut] || []) { const [a, b] = [P([u1, v1]), P([u2, v2])]; inner += `<path d="M${f2(a[0])} ${f2(a[1])}L${f2(b[0])} ${f2(b[1])}" stroke="${INK}" stroke-width="${solid ? 0.45 : 0.38}"${solid ? "" : ` stroke-dasharray="1.3 .9"`}/>`; }
  return `<g transform="translate(${f2(x)} ${f2(y)})"><defs><clipPath id="${id}">${outline("")}</clipPath></defs>${outline(`fill="${col(bg)}"`)}<g clip-path="url(#${id})">${inner}</g>${outline(`fill="none" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"`)}</g>`;
}
function shapeItem(ctx, it, page) {
  if (it.fat) return fatArrow(ctx, it.fat[0], it.fat[1]);
  if (it.block) return ctx.blockHtml(it.block, page);
  const w = it.w, h = it.h ?? it.w;
  const lab = (it.labels || []).map(([u, v, t]) => [0.5 + u * (w - 1), 0.5 + v * (h - 1), t, "c", "", it.ls]);
  return `<div class="c3p091-it">${wrap(ctx, w, h, shapeG(it), lab)}${it.cap ? `<div class="c3p091-cap">${ctx.md(it.cap)}</div>` : ""}</div>`;
}
function fatArrow(ctx, w = 14, h = 11) {
  const t = h * 0.28, hw = w * 0.42;
  return wrap(ctx, w, h, `<path d="M.5 ${f2(t)}H${f2(w - hw)}V.5L${f2(w - 0.5)} ${f2(h / 2)}L${f2(w - hw)} ${f2(h - 0.5)}V${f2(h - t)}H.5Z" fill="#F97316" stroke="#C2410C" stroke-width=".45" stroke-linejoin="round"/>`);
}

// ── the paper folds (p91): the paper with its fold line → one half (the other half dashed) → the two halves on each other ──
const KEEP = { square: { v: ["l", "r"], h: ["b", "t"], d: ["ul", "lr"] }, circle: { h: ["t", "b"], v: ["l", "r"] } };
const BBOX = { l: [0, 0, 0.5, 1], r: [0.5, 0, 1, 1], t: [0, 0, 1, 0.5], b: [0, 0.5, 1, 1], ul: [0, 0, 1, 1], lr: [0, 0, 1, 1] };
function pieceG(o, s, keep, rest, c, cut, withRest) {
  const sw = 0.45, m = sw / 2 + 0.1, S = s - 2 * m, P = ([u, v]) => [m + u * S, m + v * S], O = OUTLINES[o];
  const outl = (a) => O.ell ? `<ellipse cx="${f2(s / 2)}" cy="${f2(s / 2)}" rx="${f2(S / 2)}" ry="${f2(S / 2)}" ${a}/>` : `<path d="${polyD(O.poly.map(P))}" ${a}/>`;
  const idK = uid(), idR = uid(), idO = uid(), [u1, v1, u2, v2] = CUTS[cut][0], [a, b] = [P([u1, v1]), P([u2, v2])];
  let g = `<defs><clipPath id="${idK}"><path d="${polyD(grow(PIECES[keep]).map(P))}"/></clipPath><clipPath id="${idR}"><path d="${polyD(grow(PIECES[rest]).map(P))}"/></clipPath><clipPath id="${idO}">${outl("")}</clipPath></defs>`;
  g += `<g clip-path="url(#${idK})">${outl(`fill="${c}"`)}<g clip-path="url(#${idO})">${paperTex(s, s, 3)}</g>${outl(`fill="none" stroke="${INK}" stroke-width="${sw}"`)}</g>`;
  g += `<g clip-path="url(#${idO})"><path d="M${f2(a[0])} ${f2(a[1])}L${f2(b[0])} ${f2(b[1])}" stroke="${INK}" stroke-width="${sw * 1.6}"/></g>`;
  if (withRest) g += `<g clip-path="url(#${idR})">${outl(`fill="none" stroke="${INK}" stroke-width=".38" stroke-dasharray="1.3 .9"`)}</g>`;
  return g;
}
function foldHtml(ctx, { o = "square", cut = "v", s = 17, color = "paper", aw = 16, gap = 3 }) {
  const c = col(color), [keep, rest] = KEEP[o][cut], bb = BBOX[keep], off = s * 0.07;
  const W = 3 * s + 2 * aw + 4 * gap + 2 * off, H = s + 2 * off + 1;
  let x = 0.5, svg = shapeG({ o, w: s, cut, bg: c, paper: true, sw: 0.45 }, x, off);
  x += s + gap; svg += arrowG(x, off + s / 2, x + aw, off + s / 2, 0.45);
  x += aw + gap; svg += `<g transform="translate(${f2(x)} ${f2(off)})">${pieceG(o, s, keep, rest, c, cut, true)}</g>`;
  x += s + gap; svg += arrowG(x, off + s / 2, x + aw, off + s / 2, 0.45);
  x += aw + gap;
  // the two halves on each other, centred in the last slot
  const cx = x + s / 2 + off - s * (bb[0] + bb[2]) / 2, cy = off + s / 2 - s * (bb[1] + bb[3]) / 2;
  svg += `<g transform="translate(${f2(cx - off)} ${f2(cy - off)})">${pieceG(o, s, keep, rest, c, cut, false)}</g><g transform="translate(${f2(cx + off)} ${f2(cy + off)})">${pieceG(o, s, keep, rest, c, cut, false)}</g>`;
  return wrap(ctx, W, H, svg);
}

// ── the roti (p91), drawn: dough and browned spots; cut along dashed lines ──
function rotiTex(r) {
  const id = uid(), R = lcg(23);
  let s = `<defs><radialGradient id="${id}" cx=".45" cy=".42" r=".62"><stop offset="0" stop-color="#FFF6E6"/><stop offset=".62" stop-color="#F8DDB4"/><stop offset="1" stop-color="#E8B67C"/></radialGradient></defs><circle cx="${r}" cy="${r}" r="${r}" fill="url(#${id})"/>`;
  for (let i = 0; i < 26; i++) {
    const a = R() * 2 * Math.PI, d = Math.sqrt(R()) * r * 0.86, x = r + Math.cos(a) * d, y = r + Math.sin(a) * d, rr = r * (0.025 + R() * 0.07);
    s += `<ellipse cx="${f2(x)}" cy="${f2(y)}" rx="${f2(rr)}" ry="${f2(rr * (0.55 + R() * 0.4))}" transform="rotate(${Math.round(R() * 180)} ${f2(x)} ${f2(y)})" fill="${i % 3 ? "#D9783F" : "#9A5B2E"}" opacity="${f2(0.3 + R() * 0.4)}"/>`;
  }
  return s;
}
/** A roti of radius r with its top-left at (x, y); clip: a polygon in the roti's unit box (only that piece shows); dash: dashed lines */
function rotiG(r, x, y, { clip, dash = [] } = {}) {
  const idC = uid(), idP = uid(), U = ([u, v]) => [u * 2 * r, v * 2 * r];
  let g = `<defs><clipPath id="${idC}"><circle cx="${r}" cy="${r}" r="${r}"/></clipPath>${clip ? `<clipPath id="${idP}"><path d="${polyD(clip.map(U))}"/></clipPath>` : ""}</defs>`;
  let body = `${rotiTex(r)}<circle cx="${r}" cy="${r}" r="${f2(r - 0.15)}" fill="none" stroke="#C98A4B" stroke-width=".3"/>`;
  if (clip) body += `<g clip-path="url(#${idC})"><path d="${polyD(clip.map(U))}" fill="none" stroke="#C98A4B" stroke-width=".6"/></g>`;
  for (const pts of dash) body += `<g clip-path="url(#${idC})"><path d="M${pts.map(U).map(([a, b]) => `${f2(a)} ${f2(b)}`).join("L")}" fill="none" stroke="${INK}" stroke-width=".4" stroke-dasharray="1.2 .8"/></g>`;
  return `<g transform="translate(${f2(x)} ${f2(y)})">${g}${clip ? `<g clip-path="url(#${idP})">${body}</g>` : body}</g>`;
}
function rotiHtml(ctx, { show = "whole", r = 9 }) {
  if (show === "whole") return wrap(ctx, 2 * r + 0.4, 2 * r + 0.4, rotiG(r, 0.2, 0.2));
  if (show === "halves") { // the roti, its dashed middle line, its two halves pulled apart below
    const W = 5.2 * r, H = 4.6 * r, top = rotiG(r, W / 2 - r, 0, { dash: [[[0.5, -0.1], [0.5, 1.1]]] });
    const L = rotiG(r, 0.3, H - 2 * r - 0.3, { clip: [[-0.1, -0.1], [0.5, -0.1], [0.5, 1.1], [-0.1, 1.1]] }), Rr = rotiG(r, W - 2 * r - 0.3, H - 2 * r - 0.3, { clip: [[0.5, -0.1], [1.1, -0.1], [1.1, 1.1], [0.5, 1.1]] });
    const ay = 2 * r + 0.8;
    return wrap(ctx, W, H, top + L + Rr + arrowG(W / 2 - r * 0.45, ay, W / 2 - r * 1.15, ay + r * 0.85) + arrowG(W / 2 + r * 0.45, ay, W / 2 + r * 1.15, ay + r * 0.85));
  }
  if (show === "lcut") { // an L-shaped cut: a small piece (bottom left) and a big piece with a notch
    const cx = 0.58, cy = 0.47, W = 5.2 * r, H = 4.6 * r;
    const top = rotiG(r, W / 2 - r, 0, { dash: [[[-0.1, cy], [cx, cy], [cx, 1.1]]] });
    const small = rotiG(r, 0.3 - 0.0, H - 2 * r - 0.3, { clip: [[-0.1, cy], [cx, cy], [cx, 1.1], [-0.1, 1.1]] });
    const big = rotiG(r, W - 2 * r - 0.3, H - 2 * r - 0.3, { clip: [[-0.1, -0.1], [1.1, -0.1], [1.1, 1.1], [cx, 1.1], [cx, cy], [-0.1, cy]] });
    const ay = 2 * r + 0.8;
    return wrap(ctx, W, H, top + small + big + arrowG(W / 2 - r * 0.45, ay, W / 2 - r * 1.1, ay + r * 0.85) + arrowG(W / 2 + r * 0.45, ay, W / 2 + r * 1.1, ay + r * 0.85));
  }
  throw new Error("c3p091_roti show? " + show);
}

// ── strips, braces, number lines (pp92–103) ──
const fillSet = (f, n) => new Set(f === "all" ? [...Array(n).keys()] : Array.isArray(f) ? f : [...Array(f || 0).keys()]);
/**
 * { w: length of the whole (১) in mm, lw / rw: room for labels left / right, rows: [
 *   { bar: n, fill: k | [i…] | "all", color, h, len (of the whole), at (start, of the whole), ticks: short ticks instead of dividers,
 *     left, right: labels beside it, marks: [[pos, markup]] at its height },
 *   { brace: markup, at: [a, b] }        a brace over a…b, the label above it
 *   { under: markup, at: [a, b], box }   a brace under a…b, the label under its tip (box: the label's first answer box under the tip)
 *   { line: n, lo, hi, boxes: [i…], up: ticks upward, above: room above the line }   a number line cut into n
 *   { labels: [[pos, markup, boxed]], h }   { gap: mm } ],
 *   vlines: [{ x, from, to, y1: "top|bot|mid", y2, dash }] (rows by index) }
 */
function stripsHtml(ctx, b) {
  const W = b.w || 150, lw = b.lw ?? 0, rw = b.rw ?? 0, X = (p) => lw + W * p, sw = 0.45;
  let y = b.top ?? 0.5, svg = "";
  const lab = [], rows = [];
  for (const r of b.rows) {
    const top = y; let mid = null;
    if (r.gap != null) y += r.gap;
    else if (r.bar != null) {
      const n = r.bar, h = r.h || 6.5, at = r.at || 0, len = r.len ?? 1, c = col(r.color || "yellow"), fs = fillSet(r.fill, n), pw = W * len / n;
      for (let i = 0; i < n; i++) svg += `<rect x="${f2(X(at) + i * pw)}" y="${f2(y)}" width="${f2(pw)}" height="${f2(h)}" fill="${fs.has(i) ? c : "#fff"}"/>`;
      for (let i = 1; i < n; i++) {
        const xx = f2(X(at) + i * pw);
        svg += r.ticks && fs.has(i - 1) === fs.has(i) ? `<path d="M${xx} ${f2(y - 0.9)}V${f2(y + h * 0.42)}" stroke="${INK}" stroke-width=".35"/>` : `<path d="M${xx} ${f2(y)}V${f2(y + h)}" stroke="${INK}" stroke-width="${f2(sw * 0.8)}"/>`;
      }
      svg += `<rect x="${f2(X(at))}" y="${f2(y)}" width="${f2(W * len)}" height="${f2(h)}" fill="none" stroke="${INK}" stroke-width="${sw}"/>`;
      mid = y + h / 2;
      if (r.left) lab.push([lw / 2, mid, r.left]);
      if (r.right) lab.push([X(1) + rw / 2, mid, r.right, "c", "", r.rsize]);
      if (r.rfrac) { // a fraction drawn beside the bar: [top, bottom], each a digit or □ (an answer box), so stacked bars keep their labels apart
        const cx = X(1) + rw / 2, bw = 6.4, bh = 3.9;
        svg += `<path d="M${f2(cx - 4)} ${f2(mid)}H${f2(cx + 4)}" stroke="${INK}" stroke-width=".4"/>`;
        r.rfrac.forEach((t, k) => { const yc = mid + (k ? 1 : -1) * (bh / 2 + 0.55);
          if (t === "□") svg += `<rect x="${f2(cx - bw / 2)}" y="${f2(yc - bh / 2)}" width="${bw}" height="${bh}" rx=".9" fill="#FFFBEB" stroke="#F59E0B" stroke-width=".45"/>`;
          else lab.push([cx, yc + 0.15, t, "c", "", 11]); });
      }
      for (const [p, t] of r.marks || []) lab.push([X(p), mid, t]);
      y += h;
    } else if (r.brace != null) {
      const [a, z] = r.at || [0, 1], bh = r.bh || 2.8, th = r.th ?? 4.8;
      if (r.brace) lab.push([(X(a) + X(z)) / 2, y + th / 2, r.brace, "c", "", r.size]);
      svg += braceG(X(a), X(z), y + th + bh, bh, true);
      y += th + bh + 0.7;
    } else if (r.under != null) {
      const [a, z] = r.at || [0, 1], bh = r.bh || 2.8, th = r.th ?? (r.under ? 8.2 : 0), m = (X(a) + X(z)) / 2;
      svg += braceG(X(a), X(z), y + 0.5, bh, false);
      if (r.under) lab.push(r.box ? [m - 6.3, y + 0.5 + bh + th / 2, r.under, "l"] : [m, y + 0.5 + bh + th / 2, r.under]);
      y += 0.5 + bh + th;
    } else if (r.line != null) {
      const n = r.line, above = r.above ?? (r.boxes ? 9.5 : 5.6), ly = y + above, tk = 2.4;
      svg += `<path d="M${f2(X(0))} ${f2(ly)}H${f2(X(1))}" stroke="${INK}" stroke-width="${sw}"/>`;
      for (let i = 0; i <= n; i++) svg += `<path d="M${f2(X(i / n))} ${f2(r.up ? ly - tk : ly)}V${f2(r.up ? ly : ly + tk)}" stroke="${INK}" stroke-width=".4"/>`;
      if (r.lo) lab.push([X(0), y + above / 2 - 0.4, r.lo]);
      if (r.hi) lab.push(r.hiRight ? [X(1) + 1.5, y + above / 2 - 0.4, r.hi, "l"] : [X(1), y + above / 2 - 0.4, r.hi]);
      for (const i of r.boxes || []) lab.push([X(i / n), y + above / 2 - 0.2, "□"]);
      mid = ly; y = ly + (r.up ? 0.8 : tk + 0.6);
    } else if (r.labels) {
      const h = r.h || 7;
      for (const [p, t, boxed, a] of r.labels) lab.push([X(p) + (a === "r" ? -0.3 : a === "l" ? 0.3 : 0), y + h / 2, t, a || "c", boxed ? "bx" : "", r.size]);
      y += h;
    } else throw new Error("c3p091_strips row? " + JSON.stringify(r));
    rows.push({ top, bot: y, mid: mid ?? (top + y) / 2 });
  }
  for (const v of b.vlines || []) {
    const ya = rows[v.from][v.y1 || "bot"], yb = rows[v.to][v.y2 || "mid"];
    svg += `<path d="M${f2(X(v.x))} ${f2(ya)}V${f2(yb)}" stroke="${INK}" stroke-width="${v.dash ? 0.38 : 0.4}"${v.dash ? ` stroke-dasharray="1.2 .8"` : ""}/>`;
  }
  return wrap(ctx, lw + W + rw, y + 0.5, svg, lab, b.center === false ? "" : "mid");
}

// ── cross multiplication (pp98–99) ──
function crossOne(ctx, x, [an, ad], [bn, bd], out, size, H = 18) {
  const yt = H * 0.2556, yb = H * 0.7444, ym = H / 2, lab = [];
  let svg = `<path d="M${f2(x)} ${ym}h7M${f2(x + 21)} ${ym}h7" stroke="${INK}" stroke-width=".42"/>`;
  lab.push([x + 3.5, yt, an, "c", "", size], [x + 3.5, yb, ad, "c", "", size], [x + 24.5, yt, bn, "c", "", size], [x + 24.5, yb, bd, "c", "", size]);
  svg += arrowG(x + 8, yb - 0.6, x + 20, yt + 0.4, 0.38, 1.6) + arrowG(x + 8, yt + 0.6, x + 20, yb - 0.4, 0.38, 1.6);
  if (out) svg += out(x + 29, yt, yb, lab);
  return svg;
}
function crossHtml(ctx, b) {
  const size = b.size || 14;
  if (b.pairs) { // p99: two pairs a row, each with two answer boxes, a line between
    const cw = b.cw || 80, H = b.ph || 18, bh = Math.min(7.2, H * 0.42), rowsN = Math.ceil(b.pairs.length / 2); let svg = "", lab = [];
    b.pairs.forEach(([a, c], i) => {
      const x = (i % 2) * (cw + 4) + 1, y0 = Math.floor(i / 2) * (H + 2);
      let s = crossOne(ctx, x, a, c, (x0, yt, yb, L) => {
        let g = arrowG(x0, yt, x0 + 10, yt, 0.38, 1.6) + arrowG(x0, yb, x0 + 10, yb, 0.38, 1.6);
        const bx = x0 + 11.5, bw = cw - (bx - x) - 1;
        g += `<rect x="${f2(bx)}" y="${f2(yt - bh / 2)}" width="${f2(bw)}" height="${f2(bh)}" rx=".8" fill="#fff" stroke="${INK}" stroke-width=".4"/><rect x="${f2(bx)}" y="${f2(yb - bh / 2)}" width="${f2(bw)}" height="${f2(bh)}" rx=".8" fill="#fff" stroke="${INK}" stroke-width=".4"/>`;
        return g;
      }, size, H);
      svg += `<g transform="translate(0 ${f2(y0)})">${s}</g>`;
    });
    // the labels were collected per pair with y relative to the pair: recompute
    b.pairs.forEach(([a, c], i) => {
      const x = (i % 2) * (cw + 4) + 1, y0 = Math.floor(i / 2) * (H + 2);
      const yt = y0 + H * 0.2556, yb = y0 + H * 0.7444;
      lab.push([x + 3.5, yt, a[0], "c", "", size], [x + 3.5, yb, a[1], "c", "", size], [x + 24.5, yt, c[0], "c", "", size], [x + 24.5, yb, c[1], "c", "", size]);
    });
    svg += `<path d="M${f2(cw + 3)} 0V${f2(rowsN * (H + 2) - 2)}" stroke="${INK}" stroke-width=".4"/>`;
    return wrap(ctx, 2 * cw + 6, rowsN * (H + 2) - 1.5, svg, lab, "mid");
  }
  // p98: one pair, long arrows to the two products, a brace joining them
  const lab = [];
  const svg = crossOne(ctx, 1, b.a, b.b, (x0, yt, yb) => {
    lab.push([x0 + 32, yt, b.out[0], "l", "", size - 1], [x0 + 32, yb, b.out[1], "l", "", size - 1]);
    return arrowG(x0 + 1, yt, x0 + 30, yt, 0.4, 1.7) + arrowG(x0 + 1, yb, x0 + 30, yb, 0.4, 1.7) +
      `<path d="M${f2(x0 + 57)} ${f2(yt - 3)}q1.6 0 1.6 1.6v${f2((yb - yt) / 2 - 0.2)}q0 1.6 1.6 1.6q-1.6 0 -1.6 1.6v${f2((yb - yt) / 2 - 0.2)}q0 1.6 -1.6 1.6" fill="none" stroke="${INK}" stroke-width=".45"/>`;
  }, size);
  lab.push([4.5, 4.6, b.a[0], "c", "", size], [4.5, 13.4, b.a[1], "c", "", size], [25.5, 4.6, b.b[0], "c", "", size], [25.5, 13.4, b.b[1], "c", "", size]);
  return wrap(ctx, 94, 18, svg, lab, "mid");
}

// ── a small bar (for tables), the trapezoid of triangles (p105) ──
function barSvg(ctx, { n, fill, color = "peach", w = 40, h = 7 }) {
  const fs = fillSet(fill, n), pw = (w - 0.6) / n; let s = "";
  for (let i = 0; i < n; i++) s += `<rect x="${f2(0.3 + i * pw)}" y=".3" width="${f2(pw)}" height="${f2(h - 0.6)}" fill="${fs.has(i) ? col(color) : "#fff"}" stroke="${INK}" stroke-width=".45"/>`;
  return wrap(ctx, w, h, s);
}
function trapSvg(ctx, { n = 5, fill = 3, color = "gold", s = 12 }) { // n triangles in a row, up, down, up…, the first `fill` coloured
  const h = s * 0.866, W = s * (n + 1) / 2 + 1; let g = "";
  for (let i = 0; i < n; i++) {
    const x = 0.5 + i * s / 2, up = i % 2 === 0;
    const pts = up ? [[x, h + 0.5], [x + s / 2, 0.5], [x + s, h + 0.5]] : [[x, 0.5], [x + s, 0.5], [x + s / 2, h + 0.5]];
    g += `<path d="${polyD(pts)}" fill="${i < fill ? col(color) : "#fff"}" stroke="${INK}" stroke-width=".55" stroke-linejoin="round"/>`;
  }
  return wrap(ctx, W, h + 1, g);
}

// ── the three-column match (p105 নিজে করি ৪): fractions · bars · words, with the book's worked arrows ──
function match3Html(ctx, { fracs, bars, words, arrows = [], bw = 62, rh = 10.5, fsize = 13 }) {
  const fw = 12, gap1 = 17, gap2 = 16, ww = 50, W = fw + gap1 + bw + gap2 + ww, H = bars.length * rh, lab = [];
  let svg = "";
  const xb = fw + gap1, yr = (i) => i * rh + rh / 2;
  bars.forEach(([n, k, c], i) => {
    const pw = bw / n, y = yr(i) - 3.6;
    for (let j = 0; j < n; j++) svg += `<rect x="${f2(xb + j * pw)}" y="${f2(y)}" width="${f2(pw)}" height="7.2" fill="${j < k ? col(c) : "#fff"}" stroke="${INK}" stroke-width=".42"/>`;
  });
  fracs.forEach((t, i) => lab.push([fw / 2, yr(i), t, "c", "", fsize]));
  words.forEach((t, i) => lab.push([xb + bw + gap2, yr(i), t, "l", "c3p091-wd"]));
  for (const [kind, a, z] of arrows) {
    if (kind === "fb") svg += arrowG(fw + 1.5, yr(a), xb - 0.6, yr(z), 0.38, 1.7);
    else svg += arrowG(xb + bw + 0.8, yr(a), xb + bw + gap2 - 1.2, yr(z), 0.38, 1.7);
  }
  return wrap(ctx, W, H, svg, lab, "mid");
}

// ── tables whose cells hold drawings: { head, rows: [[cell…]], w: [mm…], h: row height, tone } (a cell: markup or a block) ──
function tblHtml(ctx, b, page) {
  const cell = (c, tag) => {
    if (c && typeof c === "object") { const { span, ...blk } = c; return `<${tag}${span ? ` colspan="${span}"` : ""}>${Object.keys(blk).length ? ctx.blockHtml(blk, page) : ""}</${tag}>`; }
    return `<${tag}>${c === "…" || c == null ? "" : ctx.md(c)}</${tag}>`;
  };
  const cols = b.w ? `<colgroup>${b.w.map((x) => `<col style="width:${x}mm">`).join("")}</colgroup>` : "";
  return `<table class="grid tone-${b.tone || "blue"} c3p091-tbl${b.small ? " small" : ""}" style="${b.width ? `width:${b.width}mm;margin:0 auto;` : ""}${b.size ? `--fs:${b.size}pt;` : ""}">${cols}${b.head ? `<thead><tr>${b.head.map((h) => cell(h, "th")).join("")}</tr></thead>` : ""}
    <tbody>${b.rows.map((r) => `<tr style="height:${b.h || 9}mm">${r.map((c) => cell(c, "td")).join("")}</tr>`).join("")}</tbody></table>`;
}

module.exports = {
  kinds: {
    /** { items: [shape | { fat: [w, h] } | { block }], groups: [[shape…]…] (each group in a rounded frame), gap, justify } */
    c3p091_shapes: (b, ctx, page) => {
      const style = `gap:${b.gap ?? 5}mm;justify-content:${b.justify || "space-around"}`;
      if (b.groups) return `<div class="c3p091-row" style="${style}">${b.groups.map((g) => `<div class="c3p091-grp" style="gap:${b.igap ?? 3}mm">${g.map((it) => shapeItem(ctx, it, page)).join("")}</div>`).join("")}</div>`;
      return `<div class="c3p091-row" style="${style}">${b.items.map((it) => shapeItem(ctx, it, page)).join("")}</div>`;
    },
    c3p091_fold: (b, ctx) => `<div class="c3p091-row" style="justify-content:${b.justify || "flex-start"}">${foldHtml(ctx, b)}</div>`,
    c3p091_roti: (b, ctx) => rotiHtml(ctx, b),
    c3p091_strips: (b, ctx) => stripsHtml(ctx, b),
    c3p091_cross: (b, ctx) => crossHtml(ctx, b),
    c3p091_match3: (b, ctx) => match3Html(ctx, b),
    c3p091_tbl: (b, ctx, page) => tblHtml(ctx, b, page),
    c3p091_bar: (b, ctx) => barSvg(ctx, b),
    c3p091_trap: (b, ctx) => trapSvg(ctx, b),
    c3p091_fat: (b, ctx) => fatArrow(ctx, b.w, b.h),
    /** A block with others laid over it, as the book overlaps them (p95: তুলি beside the brace): { base, over: [{ block, x, y, w }], h } (mm) */
    c3p091_stack: (b, ctx, page) => `<div class="c3p091-stack" style="${b.h ? `min-height:${b.h}mm` : ""}">${ctx.blockHtml(b.base, page)}${(b.over || []).map((o) => `<div class="c3p091-over" style="left:${o.x}mm;top:${o.y}mm;${o.w ? `width:${o.w}mm` : ""}">${ctx.blockHtml(o.block, page)}</div>`).join("")}</div>`,
    /** A round plate seen from above with n stickers on it (p100's bread slices): { n, sticker, emoji, d, size } — the count is drawn */
    c3p091_plate: (b, ctx) => {
      const d = b.d || 30, n = b.n || 1, s = b.size || 9, img = b.sticker && ctx.sticker(b.sticker), r = d / 2;
      const at = n === 1 ? [[0.5, 0.5]] : n === 2 ? [[0.36, 0.5], [0.64, 0.5]] : n === 3 ? [[0.35, 0.4], [0.65, 0.4], [0.5, 0.64]]
        : Array.from({ length: n }, (_, i) => [0.5 + 0.25 * Math.cos(2 * Math.PI * i / n), 0.5 + 0.25 * Math.sin(2 * Math.PI * i / n)]);
      const plate = `<svg viewBox="0 0 ${d} ${d}" width="${d}mm" height="${d}mm"><circle cx="${r}" cy="${r}" r="${f2(r - 0.4)}" fill="#E0E7FF" stroke="#1E3A8A" stroke-width=".7"/>
        <circle cx="${r}" cy="${r}" r="${f2(r * 0.76)}" fill="#fff" stroke="#A5B4FC" stroke-width=".35"/><ellipse cx="${f2(r * 0.7)}" cy="${f2(r * 0.55)}" rx="${f2(r * 0.18)}" ry="${f2(r * 0.07)}" transform="rotate(-35 ${f2(r * 0.7)} ${f2(r * 0.55)})" fill="#fff" opacity=".8"/></svg>`;
      return `<div class="c3p091-plate" style="width:${d}mm;height:${d}mm">${plate}${at.map(([u, v]) => `<span class="ob" style="left:${f2(u * d)}mm;top:${f2(v * d)}mm;width:${s}mm;height:${s}mm">${img ? `<img src="${img}">` : `<i class="em" style="font-size:${f2(s * 2.25)}pt">${ctx.esc(b.emoji || "●")}</i>`}</span>`).join("")}</div>`;
    },
    /** An exercise's heading line with things beside it: { mark, n, text, side: [blocks] } (use in an ex with text: null) */
    c3p091_head: (b, ctx, page) => `<div class="ext wm c3p091-head">${ctx.exMark(b.mark, b.n)}<div class="c3p091-hrow" style="justify-content:${b.justify || "space-between"}">${b.text != null ? `<span class="c3p091-ht">${ctx.md(b.text)}</span>` : ""}${(b.side || []).map((x) => ctx.blockHtml(x, page)).join("")}</div></div>`,
    /** Items in a grid: { rows: [[markup…]…], w: [mm | 0 (= share)…] or cols, size, indent, gap, cgap } */
    c3p091_grid: (b, ctx) => `<div class="c3p091-grid" style="grid-template-columns:${b.w ? b.w.map((x) => x ? x + "mm" : "1fr").join(" ") : `repeat(${b.cols || 4}, 1fr)`};gap:${b.gap ?? 1.6}mm ${b.cgap ?? 3}mm;font-size:${b.size || 13}pt;${b.indent ? `padding-left:${b.indent}mm;` : ""}">${b.rows.flat().map((c) => `<span>${ctx.md(c)}</span>`).join("")}</div>`,
    /** A line of text where ▭ is a wide answer box (the book's box for "১ + ৩"): { text, size, center, indent } */
    c3p091_tx: (b, ctx) => `<p class="tx c3p091-tx${b.center ? " center" : ""}" style="${b.size ? `font-size:${b.size}pt;` : ""}${b.indent ? `padding-left:${b.indent}mm;` : ""}">${ctx.md(b.text).replace(/▭/g, `<span class="abox c3p091-wide"></span>`)}</p>`,
    /** A box to write or draw in: { h, lines: true (ruled) | grid: true (dotted) } */
    c3p091_box: (b) => `<div class="c3p091-wbox${b.lines ? " lines" : ""}${b.grid ? " dots" : ""}" style="height:${b.h || 30}mm"></div>`,
    /** The book's side card: { big: "{{১/২}}", lines: [markup…] } */
    c3p091_card: (b, ctx) => `<div class="c3p091-card">${b.big ? `<div class="big">${ctx.md(b.big)}</div>` : ""}${(b.lines || []).map((l) => `<div>${ctx.md(l)}</div>`).join("")}</div>`,
    /** p96: ভগ্নাংশ — লব [৩] over হর [৫] */
    c3p091_lh: (b, ctx) => `<div class="c3p091-card c3p091-lh"><div class="t">${ctx.esc(b.title)}</div><div class="g"><span>${ctx.esc(b.lob[0])}</span><b class="n">${ctx.esc(b.lob[1])}</b><span>${ctx.esc(b.hor[0])}</span><b>${ctx.esc(b.hor[1])}</b></div></div>`,
    /** p96 অনুশীলন ৫'s example: the লব in a triangle, the হর in a circle */
    c3p091_tc: (b, ctx) => wrap(ctx, 15, 17.6, `<path d="M7.5 .6L13.4 8.4H1.6Z" fill="#FFF7ED" stroke="#EA580C" stroke-width=".5" stroke-linejoin="round"/><path d="M1.5 9.6H13.5" stroke="${INK}" stroke-width=".45"/><circle cx="7.5" cy="13.4" r="3.8" fill="#EFF6FF" stroke="#2563EB" stroke-width=".5"/>`,
      [[7.5, 5.6, b.n, "c", "", 12], [7.5, 13.6, b.d, "c", "", 12]]),
  },
  css: `
.c3p091-dg { position: relative; flex: none; max-width: 100% } .c3p091-dg.mid { align-self: center }
.c3p091-dg > svg { position: absolute; left: 0; top: 0; display: block; overflow: visible }
.c3p091-lb { position: absolute; white-space: nowrap; font: 700 11.5pt/1.15 'Baloo Da 2'; color: #1E2433 }
.c3p091-lb.a-c { transform: translate(-50%, -50%) } .c3p091-lb.a-l { transform: translateY(-50%) } .c3p091-lb.a-r { transform: translate(-100%, -50%) }
.c3p091-lb.bx { background: #fff; border: .4mm solid #1E2433; border-radius: 1mm; padding: .5mm .3mm .2mm }
.c3p091-lb > .abox { margin: 0 } .c3p091-lb.c3p091-wd { font: 600 12pt/1.2 'Noto Sans Bengali' }
.c3p091-stack { position: relative; display: flex; flex-direction: column; flex: none } .c3p091-over { position: absolute; z-index: 2 }
.c3p091-plate { position: relative; flex: none } .c3p091-plate > svg { position: absolute; left: 0; top: 0 } .c3p091-plate .ob { position: absolute; transform: translate(-50%, -50%) }
.c3p091-row { display: flex; align-items: center; flex-wrap: nowrap }
.c3p091-it { display: flex; flex-direction: column; align-items: center; gap: 1mm; flex: none }
.c3p091-cap { font: 700 11pt 'Baloo Da 2' }
.c3p091-grp { display: flex; align-items: center; padding: 2.4mm 3.4mm; border: .6mm solid var(--c); border-radius: 4mm; background: #fff; box-shadow: 0 1mm 0 var(--s) }
.c3p091-head { align-items: center } .c3p091-hrow { display: flex; align-items: center; gap: 4mm; min-width: 0 } .c3p091-ht { flex: 0 1 auto }
.c3p091-grid { display: grid; align-items: center; font-family: 'Baloo Da 2'; font-weight: 700; line-height: 1.5 } .c3p091-grid > span { white-space: nowrap }
.c3p091-tx { font-family: 'Baloo Da 2'; font-weight: 700 } .frac .abox.c3p091-wide, .abox.c3p091-wide { width: 3.6em }
.c3p091-wbox { border: .6mm solid #CBD5E1; border-radius: 4mm; background: #fff; flex: none }
.c3p091-wbox.lines { background: repeating-linear-gradient(transparent 0 8.6mm, #CBD5E1 8.6mm 8.9mm) 0 3mm / 100% calc(100% - 4mm) no-repeat, #fff }
.c3p091-wbox.dots { background: radial-gradient(circle, #CBD5E1 .35mm, transparent .45mm) 0 0 / 5mm 5mm, #fff }
.c3p091-card { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: .4mm; font: 700 12pt/1.3 'Baloo Da 2'; color: #9A3412;
  background: linear-gradient(160deg, #FEF3C7, #FFFBEB); border: .6mm solid #FCD34D; border-radius: 5mm; padding: 2mm 4mm; box-shadow: 0 .8mm 0 #FDE68A }
.c3p091-card .big { font-size: 17pt; color: var(--d) }
.c3p091-lh { padding: 1.2mm 3.4mm; gap: .2mm } .c3p091-lh .t { font-size: 12pt; color: var(--d) } .c3p091-lh .g { display: grid; grid-template-columns: auto auto; gap: 1.6mm 3mm; align-items: center }
.c3p091-lh .g b { display: inline-block; min-width: 8mm; border: .45mm solid #1E2433; background: #fff; border-radius: 1mm; font: 800 12pt/1.15 'Baloo Da 2'; color: #1E2433; position: relative }
.c3p091-lh .g b.n::after { content: ""; position: absolute; left: -2mm; right: -2mm; bottom: -1.3mm; border-bottom: .45mm solid #1E2433 }
.c3p091-tbl td, .c3p091-tbl th { vertical-align: middle } .grid.c3p091-tbl td { font-size: var(--fs, 12pt); line-height: 1.25; padding: .2mm 1.6mm; height: auto }
.c3p091-tbl .lcol { align-items: flex-start } .grid.c3p091-tbl th { padding: 1mm .6mm .7mm }
`,
};
