// Own kinds for printed pages 133–148 (chapter ১২ জ্যামিতি: points, lines and surfaces; angles; quadrilaterals; geometric
// patterns; নিজে করি). Every line, angle, shape, dot paper and pattern is drawn here, with the book's own geometry (corners,
// sides, counts, which dot each line joins). The real-world things that show a surface or a corner (a die, a Rubik's cube,
// a can, a book, a hut, a brick, the folded paper…) are drawn too, so the arrows and the angle marks sit exactly on them.
// Kinds are prefixed c3p133_, classes c3p133-.
const INK = "#1E2433";
const f2 = (n) => Math.round(n * 100) / 100;
let UID = 0;
const uid = () => `c3p133u${++UID}`;
const xy = (p) => `${f2(p[0])} ${f2(p[1])}`;
const pathOf = (P, close = true) => `M${P.map(xy).join("L")}${close ? "Z" : ""}`;
const ln = (a, b, attr) => `<line x1="${f2(a[0])}" y1="${f2(a[1])}" x2="${f2(b[0])}" y2="${f2(b[1])}" ${attr}/>`;
const escx = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rad = (d) => d * Math.PI / 180;
const ang = (V, A) => Math.atan2(A[1] - V[1], A[0] - V[0]);
const at = (V, a, r) => [V[0] + r * Math.cos(a), V[1] + r * Math.sin(a)];
// a point at "maths" angle d (degrees, anticlockwise, y up) and length r from the origin, in SVG coordinates (y down)
const polar = (d, r) => [r * Math.cos(rad(d)), -r * Math.sin(rad(d))];
const PAL = { orange: ["#FDBA74", "#C2410C"], green: ["#BEF264", "#4D7C0F"], blue: ["#93C5FD", "#1D4ED8"], yellow: ["#FEF08A", "#A16207"],
  pink: ["#F9A8D4", "#BE185D"], purple: ["#D8B4FE", "#7E22CE"], teal: ["#99F6E4", "#0F766E"], plain: ["#FFFFFF", INK], sky: ["#E0F2FE", "#0369A1"],
  red: ["#EF4444", "#991B1B"], grass: ["#22C55E", "#166534"], gold: ["#FACC15", "#A16207"], slate: ["#94A3B8", "#334155"] };
const SHADOW = (cx, cy, rx, ry = 3) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity=".08"/>`;

// ── marks on figures ──
/** The arc of an angle at V between the rays to A and B (the inside one), filled or open. */
function wedge(V, A, B, r, { fill = "#FCA5A5", stroke = "#DC2626", sw = 0.6, open = false } = {}) {
  const a1 = ang(V, A); let d = ang(V, B) - a1;
  while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI;
  const p1 = at(V, a1, r), p2 = at(V, a1 + d, r), arc = `A${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${xy(p2)}`;
  return (open ? "" : `<path d="M${xy(V)}L${xy(p1)}${arc}Z" fill="${fill}"/>`) + `<path d="M${xy(p1)}${arc}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
}
/** The right-angle mark (a little square) at V between the rays to A and B. */
function rightMark(V, A, B, s, { stroke = "#DC2626", sw = 0.5 } = {}) {
  const p1 = at(V, ang(V, A), s), p2 = at(V, ang(V, B), s), q = [p1[0] + p2[0] - V[0], p1[1] + p2[1] - V[1]];
  return `<path d="M${xy(p1)}L${xy(q)}L${xy(p2)}" fill="none" stroke="${stroke}" stroke-width="${sw}"/>`;
}
/** A straight arrow from a to b. */
function arrowLine(a, b, { color = INK, sw = 0.45, head = 2.2 } = {}) {
  const t = ang(a, b), h1 = at(b, t + Math.PI - 0.42, head), h2 = at(b, t + Math.PI + 0.42, head), e = at(b, t + Math.PI, head * 0.7);
  return `${ln(a, e, `stroke="${color}" stroke-width="${sw}" stroke-linecap="round"`)}<path d="M${xy(b)}L${xy(h1)}L${xy(h2)}Z" fill="${color}"/>`;
}
/** A curved arrow (a cubic from p0 to p1). */
function curveArrow(p0, c1, c2, p1, { color = INK, sw = 1.2, head = 3.4 } = {}) {
  const t = ang(c2, p1), h1 = at(p1, t + Math.PI - 0.45, head), h2 = at(p1, t + Math.PI + 0.45, head), e = at(p1, t + Math.PI, head * 0.6);
  return `<path d="M${xy(p0)}C${xy(c1)} ${xy(c2)} ${xy(e)}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/><path d="M${xy(p1)}L${xy(h1)}L${xy(h2)}Z" fill="${color}"/>`;
}
/** A label in a pill, drawn in the figure (x, y = its left and its baseline). */
const pill = (x, y, text, fs = 4.2, w) => { w = w ?? fs * 0.62 * [...text].length + 4; return `<rect x="${f2(x)}" y="${f2(y - fs * 1.05)}" width="${f2(w)}" height="${f2(fs * 1.55)}" rx="${f2(fs * 0.7)}" fill="#EDE9FE" stroke="#8B5CF6" stroke-width=".35"/><text x="${f2(x + w / 2)}" y="${f2(y)}" text-anchor="middle" class="c3p133-st" font-size="${fs}">${escx(text)}</text>`; };
const label = (x, y, text, fs = 4.2, anchor = "start") => `<text x="${f2(x)}" y="${f2(y)}" text-anchor="${anchor}" class="c3p133-st" font-size="${fs}">${escx(text)}</text>`;

// ── the folded paper (p137–138): a cloud-shaped sheet, orange in front, grey at the back; symmetric about both folds ──
const BX = 25, BY = 17;
const blobR = (t) => 1 - 0.13 * Math.cos(4 * t) + 0.03 * Math.cos(8 * t);
function blob(t0, t1, centre) {
  const n = 72, P = [];
  for (let i = 0; i <= n; i++) { const t = t0 + (t1 - t0) * i / n, r = blobR(t); P.push([BX * r * Math.cos(t), -BY * r * Math.sin(t)]); }
  if (centre) P.push([0, 0]);
  return pathOf(P);
}
const FULL = blob(0, 2 * Math.PI), RIGHT = blob(-Math.PI / 2, Math.PI / 2), QUARTER = blob(0, Math.PI / 2, true);
const paperDefs = (id) => `<defs><linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4A26B"/><stop offset="1" stop-color="#D97941"/></linearGradient>
  <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E7E5E4"/><stop offset="1" stop-color="#CFCCCA"/></linearGradient></defs>`;
const front = (d, id, tf = "") => `<path d="${d}" fill="url(#${id}f)" stroke="#B45309" stroke-width=".3"${tf ? ` transform="${tf}"` : ""}/>`;
const back = (d, id, tf = "") => `<path d="${d}" fill="url(#${id}b)" stroke="#A8A29E" stroke-width=".3"${tf ? ` transform="${tf}"` : ""}/>`;
/** A folded quarter: the grey back on top, the orange front peeping out behind it. mirror: on the left of its corner. */
const folded = (id, mirror, s = 1) => { const m = `scale(${mirror ? -s : s} ${s})`; return front(QUARTER, id, `${m} translate(1.3 -1.1)`) + back(QUARTER, id, m); };
const dashed = (a, b, c = INK) => ln(a, b, `stroke="${c}" stroke-width=".45" stroke-dasharray="1.6 1.1"`);
const crease = () => `<path d="M0 ${-BY}V${BY}M${-BX} 0H${BX}" stroke="#9A3412" stroke-width="1.6" opacity=".25"/><path d="M.7 ${-BY}V${BY}M${-BX} .7H${BX}" stroke="#FED7AA" stroke-width=".6" opacity=".6"/>`;
const crossLines = () => `<path d="M0 ${-BY - 1}V${BY + 1}M${-BX + 1} 0H${BX - 1}" stroke="${INK}" stroke-width=".55"/>`;
const PAPER = {
  fold1: (id) => ({ vx: -28, vy: -21, vw: 56, vh: 44, g: `${paperDefs(id)}${front(FULL, id)}${dashed([0, -BY * 1.02], [0, BY * 1.02])}${curveArrow([-17, 10], [-12, 24], [11, 24], [17, 10])}` }),
  fold2: (id) => ({ vx: -4, vy: -21, vw: 38, vh: 42, g: `${paperDefs(id)}${front(RIGHT, id, "translate(1.6 -1.2)")}${back(RIGHT, id)}${dashed([0, 0], [BX * 0.95, 0])}${curveArrow([9, 13], [33, 14], [32, -13], [10, -11])}` }),
  fold3: (id) => ({ vx: -3, vy: -21, vw: 32, vh: 24, g: `${paperDefs(id)}${folded(id)}<rect x=".6" y="-3.8" width="3.2" height="3.2" fill="none" stroke="${INK}" stroke-width=".45"/>` }),
  unfold1: (id) => ({ vx: -4, vy: -21, vw: 32, vh: 40, g: `${paperDefs(id)}${folded(id)}${curveArrow([16, -4], [22, 9], [12, 17], [-1, 15])}` }),
  unfold2: (id) => ({ vx: -25, vy: -21, vw: 54, vh: 42, g: `${paperDefs(id)}${back(RIGHT, id, "translate(-1.4 -1)")}${front(RIGHT, id)}${curveArrow([12, 12], [6, 24], [-12, 22], [-20, 12])}` }),
  creased: (id) => ({ vx: -28, vy: -20, vw: 56, vh: 40, g: `${paperDefs(id)}${front(FULL, id)}${crease()}` }),
  cross: (id) => ({ vx: -28, vy: -20, vw: 56, vh: 40, g: `${paperDefs(id)}${front(FULL, id)}${crease()}${crossLines()}` }),
  crossmark: (id) => ({ vx: -28, vy: -31, vw: 64, vh: 51, g: `${paperDefs(id)}${front(FULL, id)}${crease()}${crossLines()}
    <path d="M.5 -4.3H4.3V-.5" fill="none" stroke="#fff" stroke-width=".7"/>${arrowLine([12, -24.5], [3.6, -5], { sw: 0.5 })}${pill(8, -26, "এক সমকোণ", 4.2, 27)}` }),
  tester: (id) => ({ vx: -10, vy: -26, vw: 52, vh: 34, g: `${paperDefs(id)}<path d="M0 -24V8M-10 0H30" stroke="${INK}" stroke-width=".55"/>${folded(id)}
    <path d="M0 -8H7V0" fill="none" stroke="#DC2626" stroke-width=".7"/>${arrowLine([41.5, -6], [8, -4.6], { sw: 0.5 })}` }),
  tworight: (id) => ({ vx: -32, vy: -22, vw: 64, vh: 24, g: `${paperDefs(id)}${folded(id, true)}<path d="M-32 0H32" stroke="#DC2626" stroke-width=".6"/><path d="M0 0V-21" stroke="${INK}" stroke-width=".5"/>
    <path d="M-5 0V-5H5V0M0 -5" fill="none" stroke="#DC2626" stroke-width=".5"/>` }),
  straight: (id) => ({ vx: -32, vy: -31, vw: 92, vh: 33, g: `${paperDefs(id)}${folded(id, true)}${folded(id)}<path d="M-32 0H32" stroke="#DC2626" stroke-width=".6"/><path d="M0 0V-21" stroke="${INK}" stroke-width=".5"/>
    <path d="M9 0A9 9 0 0 0 -9 0" fill="none" stroke="#DC2626" stroke-width=".6"/><path d="M-5 0V-5H5V0" fill="none" stroke="#DC2626" stroke-width=".5"/>
    ${arrowLine([38, -24], [7, -6.2], { color: "#0EA5E9", sw: 0.5 })}${pill(35, -25.5, "সরল কোণ", 4.2, 23)}` }),
};
/** p138: the folded paper as a right-angle tester on an acute or an obtuse angle; an arrow from the right to the angle's arc. */
function testerFig(deg, id) {
  const B = polar(deg, 46), mid = polar(deg / 2, 7.6), sq = deg < 90 ? `<path d="M0 -2.2H2.2V0" fill="none" stroke="${INK}" stroke-width=".4"/>` : "";
  const vx = deg > 90 ? -24 : -4, vy = deg > 90 ? -45 : -34;
  return { vx, vy, vw: 66 - vx, vh: 3 - vy, g: `${paperDefs(id)}${folded(id, false, 1.15)}<path d="M0 0H52M0 0L${xy(B)}" stroke="${INK}" stroke-width=".5"/>${wedge([0, 0], [10, 0], B, 6.5, { open: true, sw: 0.6 })}${sq}${arrowLine([65, -15], [mid[0] + 1.6, mid[1] - 0.4], { sw: 0.45 })}` };
}

// ── angles: lines or ice-cream sticks; a0 = the first arm's direction, deg = the angle (anticlockwise) ──
function angleFig({ a0 = 0, deg = 60, L = 30, L2, arc, r = 5, style = "line", dot = false, sw = 0.5 }) {
  L2 = L2 ?? L;
  const A = polar(a0, L), B = polar(a0 + deg, L2), V = [0, 0];
  let g = "";
  if (style === "stick") {
    const stick = (P) => { const u = Math.hypot(P[0], P[1]), s = [-1.4 * P[0] / u, -1.4 * P[1] / u]; return ln(s, P,`stroke="#B07B3E" stroke-width="3.8" stroke-linecap="round"`) + ln(s, P, `stroke="#EDCF9C" stroke-width="2.8" stroke-linecap="round"`); };
    g = stick(A) + stick(B) + (dot ? `<circle r="1.1" fill="${INK}"/>` : "");
  } else g = `<path d="M${xy(A)}L0 0L${xy(B)}" fill="none" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  if (arc === "semi") g += `<path d="M${r} 0A${r} ${r} 0 0 0 ${-r} 0" fill="none" stroke="${INK}" stroke-width="${sw * 0.9}"/>`;
  else if (arc === "right") g += rightMark(V, A, B, r, { stroke: INK, sw: sw * 0.9 });
  else if (arc) g += wedge(V, A, B, r, { open: true, stroke: arc === "red" ? "#DC2626" : INK, sw: sw * 0.9 });
  const pad = style === "stick" ? 2.6 : 1.2, xs = [0, A[0], B[0]], ys = [0, A[1], B[1]];
  if (arc === "semi") ys.push(-r);
  const vx = Math.min(...xs) - pad, vy = Math.min(...ys) - pad;
  return { vx, vy, vw: Math.max(...xs) + pad - vx, vh: Math.max(...ys) + pad - vy, g };
}

// ── things from around us, drawn ──
function quadCells(P0, U, V, n, cols, gap = 0.08) {
  let s = "";
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const a = (i + gap) / n, b = (i + 1 - gap) / n, c = (j + gap) / n, d = (j + 1 - gap) / n;
    const p = (u, v) => [P0[0] + u * U[0] + v * V[0], P0[1] + u * U[1] + v * V[1]];
    s += `<path d="${pathOf([p(a, c), p(b, c), p(b, d), p(a, d)])}" fill="${cols[(i * 3 + j * 5 + n) % cols.length]}"/>`;
  }
  return s;
}
const DRAW = {
  /** a white ludo die: 5 in front, 1 on top, 3 at the side */
  die: () => { const pip = (x, y) => `<circle cx="${x}" cy="${y}" r="5.2"/>`, sp = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="2.7" ry="4.6" transform="rotate(25 ${x} ${y})"/>`;
    return { vw: 100, vh: 98, g: `${SHADOW(54, 93, 40, 4)}<path d="M8 34L32 12H90L66 34Z" fill="#F1F5F9"/><path d="M66 34L90 12V68L66 90Z" fill="#CBD5E1"/><rect x="8" y="34" width="58" height="56" fill="#fff"/>
      <g fill="${INK}">${pip(22, 48)}${pip(52, 48)}${pip(37, 62)}${pip(22, 76)}${pip(52, 76)}<ellipse cx="49" cy="23" rx="6.6" ry="3.4"/>${sp(72, 70.5)}${sp(78, 51)}${sp(84, 31.5)}</g>
      <g fill="none" stroke="${INK}" stroke-width="2" stroke-linejoin="round"><path d="M8 34L32 12H90L66 34ZM66 34L90 12V68L66 90"/><rect x="8" y="34" width="58" height="56"/></g>` }; },
  /** a Rubik's cube */
  rubik: () => { const C = ["#EF4444", "#FACC15", "#22C55E", "#3B82F6", "#F97316", "#FFFFFF"];
    return { vw: 100, vh: 98, g: `${SHADOW(54, 93, 40, 4)}<path d="M8 34L32 12H90L66 34ZM66 34L90 12V68L66 90ZM8 34H66V90H8Z" fill="#111827"/>
      ${quadCells([8, 34], [58, 0], [0, 56], 3, C)}${quadCells([8, 34], [24, -22], [58, 0], 3, C.slice(2).concat(C.slice(0, 2)))}${quadCells([66, 34], [24, -22], [0, 56], 3, C.slice(4).concat(C.slice(0, 4)))}
      <g fill="none" stroke="#111827" stroke-width="2" stroke-linejoin="round"><path d="M8 34L32 12H90L66 34ZM66 34L90 12V68L66 90"/><rect x="8" y="34" width="58" height="56"/></g>` }; },
  /** a small white ball */
  ball: (o, id) => ({ vw: 40, vh: 40, g: `<defs><radialGradient id="${id}" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#CBD5E1"/></radialGradient></defs>
    ${SHADOW(21, 37, 13, 2)}<circle cx="20" cy="19" r="16" fill="url(#${id})" stroke="#94A3B8" stroke-width="1.2"/><ellipse cx="14" cy="12" rx="5" ry="3" fill="#fff" opacity=".9" transform="rotate(-30 14 12)"/>` }),
  /** half an orange: the flat cut face and the round skin */
  orange: () => { let seg = ""; for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5; seg += ln([32, 18], [32 + 23 * Math.cos(a), 18 + 8.6 * Math.sin(a)], `stroke="#FED7AA" stroke-width="1.1"`); }
    return { vw: 64, vh: 48, g: `${SHADOW(33, 44, 26, 3)}<path d="M4 18A28 24 0 0 0 60 18Z" fill="#F97316" stroke="#9A3412" stroke-width="1.4"/><path d="M12 30Q20 38 32 39" stroke="#FDBA74" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="32" cy="18" rx="28" ry="11" fill="#FEF3C7" stroke="#9A3412" stroke-width="1.4"/><ellipse cx="32" cy="18" rx="24.5" ry="9.2" fill="#FB923C"/>${seg}<circle cx="32" cy="18" r="2" fill="#FED7AA"/>` }; },
  /** an ice-cream cone */
  icecream: (o, id) => { let w = ""; for (let k = -3; k <= 3; k++) w += `<path d="M${22 + k * 6} 26l14 22M${22 + k * 6} 26l-14 22" stroke="#B7791F" stroke-width=".9"/>`;
    return { vw: 44, vh: 70, g: `<defs><clipPath id="${id}"><path d="M8 27H36L22 67Z"/></clipPath></defs><path d="M8 27H36L22 67Z" fill="#F2C27B"/><g clip-path="url(#${id})">${w}</g><path d="M8 27H36L22 67Z" fill="none" stroke="#92400E" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M7 27C3 20 8 6 22 5C36 6 41 20 37 27C34 31 31 26 28 30C25 33 22 27 19 31C16 33 13 27 10 30C9 30 8 29 7 27Z" fill="#F9A8D4" stroke="#BE185D" stroke-width="1.3"/>
      <g stroke-width="1.6" stroke-linecap="round"><path d="M15 13l2 1.4" stroke="#22C55E"/><path d="M26 11l2.2-.8" stroke="#3B82F6"/><path d="M30 19l1.5 1.8" stroke="#FACC15"/><path d="M19 21l-2 .8" stroke="#EF4444"/></g>
      <ellipse cx="15" cy="12" rx="3" ry="2" fill="#fff" opacity=".6"/>` }; },
  /** a banana */
  banana: () => ({ vw: 72, vh: 36, g: `${SHADOW(38, 33, 26, 2)}<path d="M9 9C15 29 49 35 66 15C67 13 65 11.6 63 12.6C49 25 23 24 13 7Z" fill="#FDE047" stroke="#A16207" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M17 15C25 24 44 27 57 21" fill="none" stroke="#FACC15" stroke-width="2.2" stroke-linecap="round"/><path d="M9 9L4.5 4.6L7 2.6L12.4 7.4Z" fill="#78350F"/><circle cx="65" cy="13.6" r="1.6" fill="#422006"/>` }),
  /** a red can, no writing; arrow: to its round side */
  can: (o, id) => ({ vw: o.arrow ? 60 : 36, vh: 70, g: `<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#991B1B"/><stop offset=".35" stop-color="#EF4444"/><stop offset=".7" stop-color="#DC2626"/><stop offset="1" stop-color="#7F1D1D"/></linearGradient></defs>
    ${SHADOW(18, 66, 15, 2.5)}<path d="M4 9V60A14 4.5 0 0 0 32 60V9Z" fill="url(#${id})" stroke="#7F1D1D" stroke-width="1"/>
    <path d="M4 32C12 26 22 40 32 30V36C22 46 12 32 4 38Z" fill="#fff" opacity=".9"/><path d="M8 14V56" stroke="#fff" stroke-width="2" opacity=".35" stroke-linecap="round"/>
    <ellipse cx="18" cy="9" rx="14" ry="4.5" fill="#E2E8F0" stroke="#64748B" stroke-width="1"/><ellipse cx="18" cy="9" rx="10" ry="3" fill="none" stroke="#94A3B8" stroke-width=".8"/><path d="M14 8.4h6" stroke="#64748B" stroke-width="1.4" stroke-linecap="round"/>
    ${o.arrow ? arrowLine([58, 40], [33.5, 40], { sw: 1, head: 4.4 }) : ""}` }),
  /** a closed book lying flat; arrow: to its top (a flat surface) */
  book: (o) => { let pg = ""; for (let i = 1; i < 5; i++) pg += `<path d="M90 ${26 + i * 3.2}L114 ${10 + i * 3.2}" stroke="#E7C98F" stroke-width=".7"/>`;
    return { vw: 122, vh: 52, vy: o.arrow ? -6 : 0, g: `${SHADOW(62, 48, 56, 3.5)}<path d="M90 26L114 10V26L90 42Z" fill="#FEF3C7"/>${pg}
      <path d="M8 26L32 10H114L90 26Z" fill="#FACC15"/><path d="M20 22.5L37 13H102L86 22.5Z" fill="none" stroke="#FEF08A" stroke-width="1.4"/>
      <path d="M8 26H90V42H8Q3 34 8 26Z" fill="#CA8A04"/><path d="M8 26L32 10H114V26L90 42H8Q3 34 8 26ZM8 26H90L114 10M90 26V42" fill="none" stroke="#854D0E" stroke-width="1.5" stroke-linejoin="round"/>
      ${o.arrow ? arrowLine([46, -4], [58, 16], { sw: 1, head: 4.2 }) : ""}` }; },
  /** a paint box of colour dots; arrow: to one dot (a point) */
  palette: (o) => { const C = ["#EF4444", "#F97316", "#FACC15", "#22C55E", "#3B82F6", "#8B5CF6", "#EC4899", "#14B8A6", "#A16207", "#1E293B", "#84CC16", "#0EA5E9"]; let d = "";
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) d += `<circle cx="${14 + c * 11}" cy="${22 + r * 9}" r="3" fill="${C[(r * 7 + c * 5) % C.length]}"/>`;
    return { vw: 92, vh: 66, vy: -4, g: `${SHADOW(46, 60, 40, 2.5)}<rect x="4" y="10" width="78" height="48" rx="4" fill="#FDF4E3" stroke="#A16207" stroke-width="1.3"/><rect x="7.5" y="14" width="71" height="40" rx="2.5" fill="#fff" stroke="#E7C98F" stroke-width=".8"/>${d}
      ${o.arrow ? arrowLine([82, -2], [62, 18], { sw: 1, head: 4.2 }) : ""}` }; },
  /** a running track (its white lines are lines) */
  track: (o, id) => ({ vw: 124, vh: 56, g: `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9725A"/><stop offset="1" stop-color="#B9472F"/></linearGradient></defs>
    <rect x="2" y="6" width="120" height="48" rx="2" fill="url(#${id})"/><g stroke="#fff" stroke-width="1.3" opacity=".95"><path d="M10 54L42 6M38 54L66 6M66 54L90 6M94 54L114 6"/><path d="M2 30H122" opacity=".55"/></g>
    ${o.arrow ? arrowLine([104, 0], [82, 22], { sw: 1, head: 4.2 }) : ""}` }),
  /** a watermelon slice */
  melon: () => ({ vw: 64, vh: 58, g: `${SHADOW(32, 55, 26, 2.5)}<path d="M32 4L4 44Q32 60 60 44Z" fill="#16A34A" stroke="#14532D" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M32 7L8 42Q32 54 56 42Z" fill="#DCFCE7"/><path d="M32 8L10 40Q32 50 54 40Z" fill="#F43F5E"/>
    <g fill="#1F2937">${[[27, 24], [37, 25], [22, 33], [32, 33], [42, 33], [32, 17]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.2" ry="2" transform="rotate(-15 ${x} ${y})"/>`).join("")}</g>` }),
  /** open scissors */
  scissors: () => { const part = (rot, ring) => `<g transform="translate(30 28) rotate(${rot})"><path d="M0 -2.6L-30 -.4L-30.6 .6L0 3Z" fill="#CBD5E1" stroke="#475569" stroke-width=".9" stroke-linejoin="round"/>
      <path d="M0 -2L10 -2.4L12 -1V1.6L10 2.4L0 2.6Z" fill="${ring}" stroke="#9F1239" stroke-width=".8"/><ellipse cx="20" cy="0" rx="9" ry="6.4" fill="none" stroke="${ring}" stroke-width="3.6"/><ellipse cx="20" cy="0" rx="9" ry="6.4" fill="none" stroke="#9F1239" stroke-width=".5" transform="scale(1)"/></g>`;
    return { vw: 64, vh: 58, g: `${part(-50 + 16, "#F43F5E")}${part(-50 - 16, "#E11D48")}<circle cx="30" cy="28" r="1.6" fill="#475569"/>` }; },
  /** a popcorn box (sides slanting: not a rectangle) */
  popcorn: (o, id) => { let st = ""; for (let k = 0; k < 4; k++) st += `<path d="M${6 + k * 9} 16H${10.5 + k * 9}L${10.6 + k * 6.6} 58H${7.3 + k * 6.6}Z" fill="#EF4444"/>`;
    return { vw: 46, vh: 62, g: `<defs><clipPath id="${id}"><path d="M4 16H42L36 58H10Z"/></clipPath></defs>${SHADOW(23, 59, 15, 2)}
      <g fill="#FEF9C3" stroke="#CA8A04" stroke-width=".8">${[[10, 13], [16, 9], [23, 11], [30, 8], [36, 12], [20, 5], [27, 4], [13, 6], [33, 5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.6"/>`).join("")}</g>
      <path d="M4 16H42L36 58H10Z" fill="#fff"/><g clip-path="url(#${id})">${st}</g><path d="M4 16H42L36 58H10Z" fill="none" stroke="#991B1B" stroke-width="1.2" stroke-linejoin="round"/>` }; },
  /** a wooden cart wheel */
  wheel: () => { let sp = ""; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; sp += `<path d="M${f2(30 + 6 * Math.cos(a))} ${f2(30 + 6 * Math.sin(a))}L${f2(30 + 21 * Math.cos(a))} ${f2(30 + 21 * Math.sin(a))}" stroke="#92400E" stroke-width="3.2" stroke-linecap="round"/>`; }
    return { vw: 60, vh: 62, g: `${SHADOW(31, 59, 20, 2)}<circle cx="30" cy="30" r="25" fill="none" stroke="#B45309" stroke-width="7"/><circle cx="30" cy="30" r="28.3" fill="none" stroke="#78350F" stroke-width="1"/><circle cx="30" cy="30" r="21.7" fill="none" stroke="#78350F" stroke-width="1"/>
      ${sp}<circle cx="30" cy="30" r="6.5" fill="#D97706" stroke="#78350F" stroke-width="1.2"/><circle cx="30" cy="30" r="2.2" fill="#78350F"/>` }; },
  /** a chocolate bar (a rectangle cut into rectangles) */
  chocolate: () => { let c = ""; for (let r = 0; r < 2; r++) for (let k = 0; k < 4; k++) c += `<rect x="${7 + k * 14.5}" y="${11 + r * 13.5}" width="12" height="11" rx="1.2" fill="#7C4A2D" stroke="#4A2511" stroke-width=".8"/><path d="M${8.5 + k * 14.5} ${12.5 + r * 13.5}h8" stroke="#A86B45" stroke-width="1.2" stroke-linecap="round"/>`;
    return { vw: 72, vh: 44, g: `${SHADOW(36, 41, 30, 2.4)}<g transform="rotate(-8 36 22)"><rect x="4" y="8" width="62" height="30" rx="2" fill="#5B3420" stroke="#3B1F10" stroke-width="1.3"/>${c}</g>` }; },
  /** a carrom board (a square) */
  carrom: () => ({ vw: 60, vh: 60, g: `<rect x="2" y="2" width="56" height="56" rx="2" fill="#92400E" stroke="#451A03" stroke-width="1"/><rect x="7" y="7" width="46" height="46" fill="#FDE7B0" stroke="#78350F" stroke-width=".8"/>
    ${[[9.5, 9.5], [50.5, 9.5], [9.5, 50.5], [50.5, 50.5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.8" fill="#1F2937"/>`).join("")}
    <path d="M15 13H45M15 47H45M13 15V45M47 15V45" stroke="#78350F" stroke-width=".7"/><circle cx="30" cy="30" r="8" fill="none" stroke="#B91C1C" stroke-width=".8"/><circle cx="30" cy="30" r="2.6" fill="#DC2626"/>
    <path d="M15 15l7 7M45 15l-7 7M15 45l7-7M45 45l-7-7" stroke="#78350F" stroke-width=".6"/>` }),
  /** a bucket */
  bucket: () => ({ vw: 60, vh: 58, g: `${SHADOW(30, 55, 20, 2.4)}<path d="M7 18Q30 -6 53 18" fill="none" stroke="#475569" stroke-width="1.6"/>
    <path d="M6 18L13 52A17 4.2 0 0 0 47 52L54 18Z" fill="#EF4444" stroke="#991B1B" stroke-width="1.2" stroke-linejoin="round"/><path d="M9.5 30H50.5" stroke="#B91C1C" stroke-width="1.4"/>
    <ellipse cx="30" cy="18" rx="24" ry="5.4" fill="#991B1B" stroke="#7F1D1D" stroke-width="1.2"/><ellipse cx="30" cy="18.8" rx="21" ry="4" fill="#7F1D1D"/><path d="M12 22L17 49" stroke="#FCA5A5" stroke-width="2" stroke-linecap="round" opacity=".7"/>` }),
  /** p134: a brick, and its top surface lifted off it */
  brick: () => ({ vw: 124, vh: 46, g: `${SHADOW(26, 42, 24, 2.5)}<path d="M4 22L16 12H50L38 22Z" fill="#EA7A4C"/><path d="M38 22L50 12V30L38 40Z" fill="#9A3412"/><rect x="4" y="22" width="34" height="18" fill="#C2410C"/>
    <g fill="none" stroke="#7C2D12" stroke-width="1.2" stroke-linejoin="round"><path d="M4 22L16 12H50L38 22ZM38 22L50 12V30L38 40"/><rect x="4" y="22" width="34" height="18"/></g>
    <path d="M74 40L90 20H120L104 40Z" fill="#EA7A4C" stroke="#7C2D12" stroke-width="1.2" stroke-linejoin="round"/><path d="M80 37.5L92.5 22.5H115L102.5 37.5Z" fill="none" stroke="#F8B48F" stroke-width=".8"/>
    ${curveArrow([27, 15], [38, -4], [86, -6], [96, 22], { color: "#475569", sw: 2.6, head: 5.6 })}` }),
  /** p134: a ruler lying on two dots, along the line drawn through them */
  ruler: () => { let t = ""; for (let i = 0; i <= 26; i++) t += `<path d="M${8 + i * 3} 0v${i % 5 ? -1.6 : -2.8}" stroke="#78350F" stroke-width=".35"/>`;
    return { vw: 100, vh: 30, g: `<g transform="rotate(-6 50 17)"><rect x="4" y="5.4" width="90" height="10" rx="1" fill="#FDE047" stroke="#A16207" stroke-width=".6"/><g transform="translate(0 15.4)">${t}</g>
      <path d="M2 17.3H98" stroke="${INK}" stroke-width=".6"/><circle cx="22" cy="17.3" r="1.3" fill="${INK}"/><circle cx="76" cy="17.3" r="1.3" fill="${INK}"/></g>` }; },
  /** p134: the line through the two dots */
  line2: () => ({ vw: 100, vh: 30, g: `<g transform="rotate(-6 50 17)"><path d="M6 17.3H94" stroke="${INK}" stroke-width=".6"/><circle cx="22" cy="17.3" r="1.3" fill="${INK}"/><circle cx="76" cy="17.3" r="1.3" fill="${INK}"/></g>` }),
  /** p133: two dots */
  dots2: () => ({ vw: 50, vh: 24, g: `<circle cx="34" cy="7" r="1.2" fill="${INK}"/><circle cx="14" cy="17" r="1.2" fill="${INK}"/>` }),
  /** p133: five dots, then the star drawn through them */
  dots5: (o) => { const P = Array.from({ length: 5 }, (_, k) => polar(90 + 72 * k, 15).map((v, i) => v + (i ? 17 : 17)));
    return { vw: 34, vh: 34, g: `${o.star ? `<path d="${pathOf([0, 2, 4, 1, 3].map((k) => P[k]))}" fill="${o.fill ? "#FEF08A" : "none"}" stroke="${INK}" stroke-width=".6" stroke-linejoin="round"/>` : ""}${P.map((p) => `<circle cx="${f2(p[0])}" cy="${f2(p[1])}" r="1.15" fill="${INK}"/>`).join("")}` }; },
  /** p135 কাজ ২: a sheet of paper (a plane) */
  sheet: () => ({ vw: 104, vh: 30, g: `<path d="M3 27L23 3H101L81 27Z" fill="#F8FAFC" stroke="${INK}" stroke-width=".7" stroke-linejoin="round"/>` }),
  /** p136: the angle and its parts */
  angdef: () => { const V = [40, 32], A = [106, 6], B = [106, 41];
    return { vw: 112, vh: 46, g: `<path d="M${xy(A)}L${xy(V)}L${xy(B)}" fill="none" stroke="${INK}" stroke-width=".6"/><circle cx="${V[0]}" cy="${V[1]}" r=".9" fill="${INK}"/>${wedge(V, A, B, 13, { open: true, sw: 0.7 })}
      ${label(1, 15, "শীর্ষ বিন্দু")}${arrowLine([21, 18], [38.5, 30.6])}${label(56, 18, "পার্শ্ব")}${label(57, 44, "পার্শ্ব")}${label(94, 28.5, "কোণ")}${arrowLine([93, 27], [55.5, 29.5])}` }; },
  /** p136: a hut; arcs: "wall" (the boy's 3 corners) or "roof" (the girl's 4) */
  hut: (o) => {
    const T = [27, 9], L = [9, 30], R = [45, 30], BL = [9, 55], BR = [45, 55], RT = [80, 9], RE = [98, 30];
    const bush = (x, y, s) => `<path d="M${x} ${y}c${-4 * s} 0 ${-5 * s} ${-5 * s} ${-2 * s} ${-6 * s}c${-1 * s} ${-4 * s} ${4 * s} ${-6 * s} ${6 * s} ${-3 * s}c${2 * s} ${-4 * s} ${8 * s} ${-3 * s} ${7 * s} ${2 * s}c${4 * s} 0 ${5 * s} ${5 * s} ${1 * s} ${7 * s}Z" fill="#4ADE80" stroke="#15803D" stroke-width=".7"/>`;
    let arcs = "";
    const solid = { fill: "#EF4444", stroke: "#B91C1C", sw: 0.6 }, open = { open: true, stroke: "#DC2626", sw: 1.8 };
    if (o.arcs === "wall") arcs = wedge(T, L, R, 8.5, solid) + wedge(BL, L, BR, 8.5, solid) + wedge(BR, R, BL, 8.5, solid);
    if (o.arcs === "roof") arcs = wedge(T, RT, R, 8, open) + wedge(RT, T, RE, 8, open) + wedge(R, T, RE, 8, open) + wedge(RE, RT, R, 8, open);
    return { vw: 112, vh: 62, g: `${bush(9, 58, 1.1)}${bush(104, 58, 1)}<path d="M5 55H101L99 59H7Z" fill="#7C2D12"/>
      <path d="M45 30H96V55H45Z" fill="#FDBA74" stroke="#9A3412" stroke-width=".7"/><rect x="65" y="36" width="10" height="19" fill="#93C5FD" stroke="#1E40AF" stroke-width=".6"/><path d="M70 36V55" stroke="#1E40AF" stroke-width=".5"/>
      <path d="${pathOf([T, R, BR, BL, L])}" fill="#F9A8D4" stroke="#9D174D" stroke-width=".7" stroke-linejoin="round"/><rect x="16" y="35" width="8" height="9" fill="#92400E" stroke="#451A03" stroke-width=".5"/><path d="M18.7 35V44M21.3 35V44" stroke="#451A03" stroke-width=".5"/>
      <path d="${pathOf([T, RT, RE, R])}" fill="#FDE047" stroke="#A16207" stroke-width=".8" stroke-linejoin="round"/><path d="M5 31.5L27 6.5L29 8.6L8.5 32Z" fill="#FACC15" stroke="#A16207" stroke-width=".6" stroke-linejoin="round"/>
      <path d="M36 14H86M41 20H91M46 26H95" stroke="#EAB308" stroke-width=".5"/>${arcs}` };
  },
  /** p142: a honeycomb seen close up */
  honeycomb: (o, id) => { let h = ""; const r = 8.2, w = r * Math.sqrt(3);
    for (let row = -1; row < 6; row++) for (let col = -1; col < 6; col++) { const cx = col * w + (row % 2 ? w / 2 : 0) + 2, cy = row * r * 1.5 + 4;
      h += `<path d="${pathOf(Array.from({ length: 6 }, (_, k) => [cx + r * Math.cos(rad(30 + 60 * k)), cy + r * Math.sin(rad(30 + 60 * k))]))}" fill="url(#${id}g)" stroke="#3B2508" stroke-width="1.6"/>`; }
    return { vw: 64, vh: 64, g: `<defs><clipPath id="${id}"><circle cx="32" cy="32" r="30"/></clipPath><radialGradient id="${id}g" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#FDE68A"/><stop offset="1" stop-color="#F59E0B"/></radialGradient></defs>
      <g clip-path="url(#${id})"><rect width="64" height="64" fill="#3B2508"/>${h}</g><circle cx="32" cy="32" r="30" fill="none" stroke="#B45309" stroke-width="1.2"/>` }; },
  /** p142: a brick wall */
  wall: () => { let b = ""; const bw = 14, bh = 6;
    for (let r = 0; r < 8; r++) for (let c = -1; c < 9; c++) { const x = c * bw + (r % 2 ? bw / 2 : 0) + 1, y = r * bh + 1; b += `<rect x="${x}" y="${y}" width="${bw - 1}" height="${bh - 1}" rx=".4" fill="${["#C2410C", "#B45309", "#D9622B", "#C0502A"][(r * 3 + c * 7 + 8) % 4]}"/>`; }
    return { vw: 112, vh: 49, g: `<defs><clipPath id="c3p133wall"><rect width="112" height="49" rx="1.5"/></clipPath></defs><g clip-path="url(#c3p133wall)"><rect width="112" height="49" fill="#E7D3B5"/>${b}</g>` }; },
  /** p142: a carpet in squares */
  carpet: () => { let s = "", fr = ""; const n = 6, m = 13, q = 6.4;
    for (let r = 0; r < n; r++) for (let c = 0; c < m; c++) s += `<rect x="${15 + c * q}" y="${7 + r * q}" width="${q}" height="${q}" fill="${(r + c) % 2 ? "#FACC15" : "#DC2626"}"/>`;
    for (let k = 0; k < 13; k++) fr += `<path d="M5 ${5 + k * 3.4}h6M101 ${5 + k * 3.4}h6" stroke="#E5E7EB" stroke-width="1.1" stroke-linecap="round"/>`;
    return { vw: 112, vh: 52, g: `${fr}<rect x="10" y="2" width="92" height="48" rx="1" fill="#B91C1C"/><rect x="13" y="5" width="86" height="42" fill="none" stroke="#FDE68A" stroke-width=".8"/>${s}<rect x="15" y="7" width="${m * q}" height="${n * q}" fill="none" stroke="#7F1D1D" stroke-width=".6"/>` }; },
  /** p143: a flower of petals in rings: blue, red, yellow, again and again, each smaller */
  flower: () => { let g = ""; const C = ["#3B4EB8", "#EF2B2B", "#FBE21D"];
    for (let k = 0; k < 9; k++) { const R = 46 * (1 - k * 0.105), P = [];
      for (let i = 0; i <= 240; i++) { const t = i / 240 * 2 * Math.PI, r = R * (0.66 + 0.34 * Math.pow(Math.abs(Math.cos(4 * t + Math.PI / 2 * 0)), 0.55)); P.push([50 + r * Math.cos(t + rad(11)), 50 + r * Math.sin(t + rad(11))]); }
      g += `<path d="${pathOf(P)}" fill="${C[k % 3]}"/>`; }
    return { vw: 100, vh: 100, g };
  },
};

// ── flat shapes at true size (mm): rectangles (turned or not), triangles, any polygon, circles and ellipses, hexagons, stars ──
function shapeFig(it) {
  const [fill, stroke] = PAL[it.c || "plain"], sw = it.sw ?? 0.45;
  let P, el = "";
  const rot = (pts, d) => { if (!d) return pts; const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length, c = Math.cos(rad(d)), s = Math.sin(rad(d)); return pts.map(([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]); };
  if (it.s === "rect") P = rot([[0, 0], [it.w, 0], [it.w, it.h], [0, it.h]], it.rot);
  else if (it.s === "tri") P = rot([[it.w / 2, 0], [it.w, it.h], [0, it.h]], it.rot);
  else if (it.s === "poly") P = it.pts;
  else if (it.s === "hex") P = Array.from({ length: 6 }, (_, k) => [it.r * Math.cos(rad(60 * k)), it.r * Math.sin(rad(60 * k))]);
  else if (it.s === "star") P = Array.from({ length: 10 }, (_, k) => polar(90 + 36 * k, k % 2 ? it.r * 0.42 : it.r));
  else if (it.s === "ellipse" || it.s === "circle") { const rx = it.rx ?? it.r, ry = it.ry ?? it.r; P = [[-rx, -ry], [rx, ry]]; el = `<ellipse cx="0" cy="0" rx="${rx}" ry="${ry}"/>`; }
  else throw new Error("c3p133 shape? " + it.s);
  const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
  let x0 = Math.min(...xs), y0 = Math.min(...ys), x1 = Math.max(...xs), y1 = Math.max(...ys);
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  let extra = "";
  if (it.dash) for (const d of it.dash) { const [a, b] = d === "v" ? [[cx, y0], [cx, y1]] : d === "h" ? [[x0, cy], [x1, cy]] : [[x0, y0], [x1, y1]]; extra += dashed(a, b, stroke); }
  if (it.ring) { const R = Math.hypot(x1 - x0, y1 - y0) / 2 + 1.6; extra += `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(R)}" fill="none" stroke="#DC2626" stroke-width=".7"/>`; x0 = Math.min(x0, cx - R); x1 = Math.max(x1, cx + R); y0 = Math.min(y0, cy - R); y1 = Math.max(y1, cy + R); }
  const pad = sw + 0.4;
  const body = el || `<path d="${pathOf(P)}"/>`;
  return `<svg class="c3p133-svg" width="${f2(x1 - x0 + 2 * pad)}mm" height="${f2(y1 - y0 + 2 * pad)}mm" viewBox="${f2(x0 - pad)} ${f2(y0 - pad)} ${f2(x1 - x0 + 2 * pad)} ${f2(y1 - y0 + 2 * pad)}">
    <g fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round">${body}</g>${extra}</svg>`;
}
/** p139: a rectangle folded in half, the two layers a little apart: dir "v" (left onto right) or "h" (top onto bottom). */
function foldedRect({ w, h, dir = "v" }) {
  const W = dir === "v" ? w / 2 : w, H = dir === "v" ? h : h / 2, o = 1.4;
  return `<svg class="c3p133-svg" width="${f2(W + o + 1)}mm" height="${f2(H + o + 1)}mm" viewBox="-.5 ${-o - 0.5} ${f2(W + o + 1)} ${f2(H + o + 1)}">
    <path d="M${o} ${-o}H${W + o}V${H - o}H${o}Z" fill="#E5E7EB" stroke="${INK}" stroke-width=".4"/><path d="M0 0H${W}V${H}H0Z" fill="#F3F4F6" stroke="${INK}" stroke-width=".45"/></svg>`;
}
const smallArrow = (w = 10, color = INK) => `<svg class="c3p133-svg" width="${w}mm" height="4mm" viewBox="0 -2 ${w} 4">${arrowLine([0, 0], [w - 0.2, 0], { color, sw: 0.45, head: 1.8 })}</svg>`;

// ── the pattern pieces, each in a box of side s (mm) ──
function piece(code, s, i) {
  const svg = (w, h, g, cls = "") => `<svg class="c3p133-svg${cls}" width="${f2(w)}mm" height="${f2(h)}mm" viewBox="0 0 ${f2(w)} ${f2(h)}">${g}</svg>`;
  const sw = 0.45, k = s;
  const blockArrow = (dir, fill, stroke) => { const P = [[0.32, 0], [0.68, 0], [0.68, 0.55], [0.92, 0.55], [0.5, 1], [0.08, 0.55], [0.32, 0.55]];
    const rotp = ([x, y]) => dir === "dn" ? [x, y] : dir === "up" ? [x, 1 - y] : dir === "rt" ? [y, x] : [1 - y, x];
    return svg(k, k, `<path d="${pathOf(P.map((p) => rotp(p).map((v) => 0.4 + v * (k - 0.8))))}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`); };
  const chevron = (dir) => { const P = [[0.1, 0.02], [0.45, 0.02], [0.9, 0.5], [0.45, 0.98], [0.1, 0.98], [0.55, 0.5]];
    const rotp = ([x, y]) => dir === "r" ? [x, y] : dir === "l" ? [1 - x, y] : [y, 1 - x];
    return svg(k, k, `<path d="${pathOf(P.map((p) => rotp(p).map((v) => 0.4 + v * (k - 0.8))))}" fill="#FCE7F3" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="miter"/>`); };
  switch (code) {
    case "sq": return svg(k, k, `<rect x=".3" y=".3" width="${k - 0.6}" height="${k - 0.6}" fill="${PAL.blue[0]}" stroke="${PAL.blue[1]}" stroke-width="${sw}"/>`);
    case "tri": return svg(k * 1.05, k, `<path d="M${k * 0.525} .4L${k * 1.05 - 0.4} ${k - 0.3}H.4Z" fill="${PAL.green[0]}" stroke="${PAL.green[1]}" stroke-width="${sw}" stroke-linejoin="round"/>`);
    case "circ": return svg(k, k, `<circle cx="${k / 2}" cy="${k / 2}" r="${k / 2 - 0.4}" fill="${PAL.orange[0]}" stroke="${PAL.orange[1]}" stroke-width="${sw}"/>`);
    case "rect": return svg(k * 1.25, k * 0.82, `<rect x=".3" y=".3" width="${k * 1.25 - 0.6}" height="${k * 0.82 - 0.6}" fill="${PAL.blue[0]}" stroke="${PAL.blue[1]}" stroke-width="${sw}"/>`);
    case "T": case "t": { const f = code === "T" ? 1 : 0.64, w = k * 0.9 * f, h = k * f; return svg(w, k, `<path d="M${w / 2} ${k - h + 0.3}L${w - 0.3} ${k - 0.3}H.3Z" fill="#A78BFA" stroke="#5B21B6" stroke-width="${sw}" stroke-linejoin="round"/>`); }
    case "A": return svg(k * 0.9, k, `<path d="M${k * 0.45} .3L${k * 0.9 - 0.3} ${k - 0.3}H.3Z" fill="#5EEAD4" stroke="#0F766E" stroke-width="${sw}" stroke-linejoin="round"/>`);
    case "O": return svg(k * 0.86, k, `<circle cx="${k * 0.43}" cy="${k * 0.55}" r="${k * 0.43 - 0.3}" fill="${PAL.orange[0]}" stroke="${PAL.orange[1]}" stroke-width="${sw}"/>`);
    case "_": return `<span class="c3p133-blank" style="width:${f2(k)}mm"></span>`;
    case "dn": case "rt": return blockArrow(code, "#A3D93F", "#3F6212");
    case "bdn": return blockArrow("dn", "#1D7FC4", "#0C4A6E");
    case "bup": return blockArrow("up", "#1D7FC4", "#0C4A6E");
    case "chr": return chevron("r"); case "chl": return chevron("l"); case "chu": return chevron("u");
    case "plus": { const a = k * 0.32, b = k * 0.68; return svg(k, k, `<path d="M${a} .6H${b}V${a}H${k - 0.6}V${b}H${b}V${k - 0.6}H${a}V${b}H.6V${a}H${a}Z" fill="#EF2B2B" stroke="#7F1D1D" stroke-width="${sw}"/>`); }
    case "oval": return svg(k * 0.7, k, `<ellipse cx="${k * 0.35}" cy="${k / 2}" rx="${k * 0.3}" ry="${k * 0.42}" fill="#16A34A" stroke="#14532D" stroke-width="${sw}"/>`);
    case "ds": case "ds0": case "ds1": case "ds2": case "ds3": { const n = code.length > 2 ? +code[2] : -1, c = k / 2, q = 0.3, e = k - 0.3;
      const tri = [[[q, q], [e, q], [c, c]], [[e, q], [e, e], [c, c]], [[e, e], [q, e], [c, c]], [[q, e], [q, q], [c, c]]][n];
      return svg(k, k, `<rect x="${q}" y="${q}" width="${k - 0.6}" height="${k - 0.6}" fill="#fff" stroke="${INK}" stroke-width="${sw}"/>${tri ? `<path d="${pathOf(tri)}" fill="${INK}"/>` : ""}<path d="M${q} ${q}L${e} ${e}M${e} ${q}L${q} ${e}" stroke="${INK}" stroke-width=".35"/>`); }
    default: throw new Error("c3p133 piece? " + code);
  }
}

// ── speech, notes, headings ──
function sayBlock(b, ctx, page) {
  const who = b.who || "boy", side = b.side || (who === "boy" ? "left" : "right"), right = side === "right";
  const pic = ctx.picFile(`face-${who}-${b.mood || "talk"}`) || ctx.picFile(`face-${who}`);
  const face = `<span class="av">${pic ? `<img class="fc" src="file://${pic.file}">` : `<span class="fc"></span>`}</span>`;
  return `<div class="say ${who} ${right ? "r" : "l"} c3p133-say${b.small ? " c3p133-sm" : ""}" style="--w:${ctx.WHO[who]}">${right ? "" : face}<div class="sb"${b.maxw ? ` style="max-width:${b.maxw}mm"` : ""}>${b.text ? `<div>${ctx.md(b.text)}</div>` : ""}${(b.inner || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>${right ? face : ""}</div>`;
}
function drawSvg(name, h, o = {}) {
  const fn = DRAW[name] || (PAPER[name] && ((oo, id) => PAPER[name](id)));
  if (name === "angtest" && fn) throw new Error("c3p133: angtest is taken");
  let R;
  if (fn) R = fn(o, uid());
  else if (name === "angle") R = angleFig(o);
  else if (name === "angtest") R = testerFig(o.deg, uid());
  else throw new Error("c3p133 drawing? " + name);
  const { vw, vh, vx = 0, vy = 0, g } = R, H = h ?? vh, W = o.w ?? H * vw / vh;
  return `<svg class="c3p133-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="${f2(vx)} ${f2(vy)} ${f2(vw)} ${f2(vh)}">${g}</svg>`;
}
function figOf(it, ctx, page) {
  if (it.d) return drawSvg(it.d, it.h, it);
  if (it.s === "folded") return foldedRect(it);
  if (it.s === "arrow") return smallArrow(it.w, it.color);
  if (it.s) return shapeFig(it);
  if (it.p) return `<span class="c3p133-pat" style="gap:${it.gap ?? 1.4}mm">${it.p.map((c) => piece(c, it.size || 8)).join("")}</span>`;
  return ctx.blockHtml(it, page);
}

module.exports = {
  kinds: {
    /** Drawings and shapes in a row: items [{ d: drawing, h, …options } | { s: rect|tri|poly|hex|star|circle|ellipse|folded|arrow, … } | { p: [pieces], size } | any block], each with an optional label. */
    c3p133_figs: (b, ctx, page) => `<div class="c3p133-row" style="gap:${b.gap ?? 4}mm;justify-content:${b.justify || "space-around"};align-items:${b.align || "flex-end"}">${b.items.map((it) => `<figure class="c3p133-fig"${it.mt ? ` style="margin-top:${it.mt}mm"` : ""}>${figOf(it, ctx, page)}${it.label ? `<figcaption>${ctx.md(it.label)}</figcaption>` : ""}</figure>`).join("")}</div>`,
    /** Someone speaking, with things inside the bubble too (inner blocks); who: boy | girl | parrot; side; small; maxw. */
    c3p133_say: sayBlock,
    /** One line in a bubble: a small drawing, then words. */
    c3p133_iline: (b, ctx) => `<div class="c3p133-il"><span class="c3p133-ico">${drawSvg(b.d, b.h || 8)}</span><span>${ctx.md(b.text)}</span></div>`,
    /** The book's tinted box of a rule (a definition), centred or not. */
    c3p133_note: (b, ctx) => `<div class="note c3p133-note"${b.center ? ` style="align-self:center;text-align:center"` : ""}>${ctx.md(b.text)}</div>`,
    /** The book's blue arrow between two pictures. */
    c3p133_arrow: (b) => `<svg class="c3p133-svg" width="${b.w || 11}mm" height="${b.h || 6}mm" viewBox="0 0 22 12"><path d="M0 3.6H13V0L22 6L13 12V8.4H0Z" fill="#38BDF8"/></svg>`,
    /** An exercise heading by itself (to put a picture beside it): { mark, n, text }. */
    c3p133_exh: (b, ctx) => `<div class="ext wm">${ctx.exMark(b.mark, b.n)}<span>${ctx.md(b.text)}</span></div>`,
    /** A pattern: pieces in a row: { p: ["sq", "tri", "_", …], size, gap, band, ring: index circled in red, label }. */
    c3p133_pat: (b, ctx) => `<div class="c3p133-patrow">${b.label ? `<b class="c3p133-pl">${ctx.esc(b.label)}</b>` : ""}<span class="c3p133-pat${b.band ? " band" : ""}" style="gap:${b.gap ?? 1.6}mm${b.band ? `;background:${b.band}` : ""}">${b.p.map((c, i) => b.ring === i ? `<span class="c3p133-ring">${piece(c, b.size || 9)}</span>` : piece(c, b.size || 9)).join("")}</span>${b.after ? `<span class="c3p133-after">${ctx.md(b.after)}</span>` : ""}</div>`,
    /** Dot paper: { cols, rows, sp (mm), segs: [[c1, r1, c2, r2], …] drawn through the dots }. */
    c3p133_dots: (b) => {
      const { cols, rows, sp = 7, r = 0.72, color = "#E11D48", segs = [] } = b, pad = sp * 0.55, W = (cols - 1) * sp + 2 * pad, H = (rows - 1) * sp + 2 * pad;
      let d = "";
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) d += `<circle cx="${f2(pad + x * sp)}" cy="${f2(pad + y * sp)}" r="${r}" fill="${color}"/>`;
      const s = segs.map(([c1, r1, c2, r2]) => ln([pad + c1 * sp, pad + r1 * sp], [pad + c2 * sp, pad + r2 * sp], `stroke="${INK}" stroke-width=".5" stroke-linecap="round"`)).join("");
      return `<div class="c3p133-center"><svg class="c3p133-dotp" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}"><rect x=".2" y=".2" width="${f2(W - 0.4)}" height="${f2(H - 0.4)}" rx="1.6" fill="#fff" stroke="#CBD5E1" stroke-width=".4"/>${d}${s}</svg></div>`;
    },
    /** p141: dashed square grids, each with a part of a square: items [{ sp (mm), w, h (in squares), ox, oy, v: [x…], hz: [y…], segs: [[x1, y1, x2, y2]…] }]. */
    c3p133_sqgrid: (b) => `<div class="c3p133-row" style="justify-content:space-around;align-items:flex-start">${b.items.map((it) => {
      const s = it.sp, W = it.w * s, H = it.h * s, X = (x) => f2((it.ox + x) * s), Y = (y) => f2((it.oy + y) * s);
      const v = it.v.map((x) => `M${X(x)} 0V${f2(H)}`).join(""), hz = it.hz.map((y) => `M0 ${Y(y)}H${f2(W)}`).join("");
      return `<svg class="c3p133-svg" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}"><rect width="${f2(W)}" height="${f2(H)}" rx="1" fill="#EDE9FE"/>
        <path d="${v}${hz}" stroke="#EF4444" stroke-width=".45" stroke-dasharray="1.6 1"/>${it.segs.map(([a, c, d, e]) => `<path d="M${X(a)} ${Y(c)}L${X(d)} ${Y(e)}" stroke="${INK}" stroke-width=".5" stroke-linecap="round"/>`).join("")}</svg>`;
    }).join("")}</div>`,
    /** p144: figures in a strip of cells: cells [{ sq: [cols, rows] } | { stars: [n, m] } | { empty: true }], w: [mm per cell], h, s. */
    c3p133_strip: (b) => `<div class="c3p133-strip" style="height:${b.h}mm">${b.cells.map((c, i) => {
      let inner = "";
      if (c.sq) { const [n, m] = c.sq, s = b.s || 7.6; let r = ""; for (let y = 0; y < m; y++) for (let x = 0; x < n; x++) r += `<rect x="${f2(x * s + 0.3)}" y="${f2(y * s + 0.3)}" width="${s}" height="${s}" fill="${PAL.sky[0]}" stroke="${INK}" stroke-width=".45"/>`;
        inner = `<svg class="c3p133-svg" width="${f2(n * s + 0.6)}mm" height="${f2(m * s + 0.6)}mm" viewBox="0 0 ${f2(n * s + 0.6)} ${f2(m * s + 0.6)}">${r}</svg>`; }
      if (c.stars) inner = c.stars.map((n) => `<span class="c3p133-stars">${shapeFig({ s: "star", r: b.s || 3.4, c: "yellow", sw: 0.4 }).repeat(n)}</span>`).join("");
      return `<div class="c3p133-cell" style="width:${b.w[i]}mm">${inner}</div>`;
    }).join("")}</div>`,
    /** p144 কাজ ৩: the shapes to use, scattered: items [[piece, x, y], …] in mm, in a box w × h. */
    c3p133_scatter: (b) => `<div class="c3p133-scatter" style="width:${b.w}mm;height:${b.h}mm">${b.items.map(([c, x, y]) => `<span style="left:${x}mm;top:${y}mm">${piece(c, b.size || 9)}</span>`).join("")}</div>`,
    /** p145: the nested-squares tiles (red, green, yellow), n in a row, in a rounded frame. */
    c3p133_tiles: (b) => { const s = b.s || 15, one = `<svg class="c3p133-svg" width="${s}mm" height="${s}mm" viewBox="0 0 30 30"><rect x=".5" y=".5" width="29" height="29" fill="#EF4444" stroke="#7F1D1D" stroke-width=".6"/><rect x="5" y="5" width="20" height="20" fill="#22C55E" stroke="#14532D" stroke-width=".6"/><rect x="9.5" y="9.5" width="11" height="11" fill="#FACC15" stroke="#854D0E" stroke-width=".6"/></svg>`;
      return `<div class="c3p133-tiles">${one.repeat(b.n || 4)}</div>`; },
    /** p135: a sorting table, its heads over one tall empty row: { head: [...], h (mm) }. */
    c3p133_sort: (b, ctx) => `<table class="grid tone-${b.tone || "green"}"${b.width ? ` style="width:${b.width}mm"` : ""}><thead><tr>${b.head.map((h) => `<th>${ctx.md(h)}</th>`).join("")}</tr></thead><tbody><tr>${b.head.map(() => `<td style="height:${b.h || 20}mm;background:#fff"></td>`).join("")}</tr></tbody></table>`,
    /** A multiple-choice question: { n: "(১)", q, opts: ["ক) …", …], cols }. */
    c3p133_mcq: (b, ctx) => `<div class="c3p133-mcq"${b.size ? ` style="font-size:${b.size}pt"` : ""}><div class="c3p133-q"><b>${ctx.esc(b.n)}</b><span>${ctx.md(b.q)}</span></div>${b.opts ? `<div class="c3p133-opts" style="grid-template-columns:${b.tpl || `repeat(${b.cols || 2}, 1fr)`}">${b.opts.map((o) => `<span>${ctx.md(o)}</span>`).join("")}</div>` : ""}</div>`,
    /** p141 কাজ ৫: the ✓ | shape | নাম table, two shapes a row: rows [[shape, shape], …], h (mm a row). */
    c3p133_ticks: (b) => `<table class="grid tone-green c3p133-ticks"><thead><tr><th>✓</th><th></th><th>নাম</th><th>✓</th><th></th><th>নাম</th></tr></thead>
      <tbody>${b.rows.map((r) => `<tr style="height:${b.h || 17}mm">${r.map((s) => `<td></td><td class="c3p133-tshape">${shapeFig(s)}</td><td></td>`).join("")}</tr>`).join("")}</tbody></table>`,
    /** p147 নিজে ২ (৩): the angles table (কোণ, নাম, কারণ): cols [[angle in the কোণ row | null, angle in the নাম row | null], …]. */
    c3p133_angtab: (b) => `<table class="grid tone-blue c3p133-angtab">${[["কোণ", 0], ["নাম", 1], ["কারণ", 2]].map(([h, k]) => `<tr class="r${k}"${b.h ? ` style="height:${b.h[k]}mm"` : ""}><th>${h}</th>${b.cols.map((c) => `<td>${c[k] ? drawSvg("angle", c[k].h || 17, c[k]) : ""}</td>`).join("")}</tr>`).join("")}</table>`,
    /** p148 নিজে ৩: match a picture to a word: rows [[{ d, h }, word], …] (a gap between the two columns to draw the lines in). */
    c3p133_match: (b, ctx) => `<div class="c3p133-match">${b.rows.map(([L, word]) => `<div class="c3p133-ml">${drawSvg(L.d, L.h || 16, L)}<i class="c3p133-dot"></i></div><span></span><div class="c3p133-mr"><i class="c3p133-dot"></i><b>${ctx.esc(word)}</b></div>`).join("")}</div>`,
  },
  css: `
.c3p133-row { display: flex; flex-wrap: nowrap; align-items: flex-end }
.c3p133-fig { display: flex; flex-direction: column; align-items: center; gap: 1mm; margin: 0; flex: none } .c3p133-fig figcaption { font: 700 11.5pt/1.2 'Baloo Da 2'; color: ${INK}; text-align: center }
.c3p133-svg { display: block; overflow: visible; flex: none }
.c3p133-st { font-family: 'Noto Sans Bengali'; font-weight: 600; fill: ${INK} }
.c3p133-center { display: flex; justify-content: center }
.c3p133-say .sb { display: flex; flex-direction: column; gap: 1.6mm }
.c3p133-sm .fc { width: 14.5mm; height: 14.5mm } .c3p133-sm .sb { font-size: 11.5pt; line-height: 1.4; padding: 1.8mm 4mm 1.6mm }
.c3p133-il { display: flex; align-items: center; gap: 2.4mm } .c3p133-ico { flex: none; width: 12mm; display: flex; justify-content: center }
.c3p133-note { font-size: 12.5pt }
.c3p133-pat { display: inline-flex; align-items: flex-end; flex-wrap: nowrap } .c3p133-pat.band { padding: 1.4mm 2.4mm; border-radius: 2mm; border: .4mm solid #7DD3FC }
.c3p133-patrow { display: flex; align-items: center; gap: 4mm; flex-wrap: nowrap } .c3p133-pl { font: 800 12.5pt 'Baloo Da 2'; color: var(--d); width: 9mm; flex: none }
.c3p133-after { font: 600 12.5pt/1.4 'Noto Sans Bengali'; margin-left: 6mm }
.c3p133-blank { display: inline-block; height: 0; border-bottom: .5mm solid ${INK}; margin-bottom: .3mm }
.c3p133-ring { display: inline-flex; padding: 1mm; border: .6mm solid #DC2626; border-radius: 50%; margin: -1.6mm -.6mm }
.c3p133-dotp { display: block }
.c3p133-strip { display: flex; align-self: flex-start; border: .5mm solid ${INK}; background: #fff; border-radius: 1mm; overflow: hidden }
.c3p133-cell { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.2mm; border-right: .4mm solid ${INK} } .c3p133-cell:last-child { border-right: 0 }
.c3p133-stars { display: flex; gap: 1.6mm }
.c3p133-scatter { position: relative; flex: none } .c3p133-scatter > span { position: absolute }
.c3p133-tiles { display: inline-flex; gap: 2.4mm; padding: 2.6mm 4mm; border: .6mm solid ${INK}; border-radius: 5mm; background: #fff; align-self: flex-start }
.c3p133-mcq { display: flex; flex-direction: column; gap: .8mm; font: 500 12pt/1.4 'Noto Sans Bengali' }
.c3p133-q { display: grid; grid-template-columns: 8.5mm 1fr } .c3p133-q b { font: 800 12pt/1.45 'Baloo Da 2'; color: #EA580C }
.c3p133-opts { display: grid; gap: .6mm 4mm; padding-left: 12mm; justify-content: start }
.c3p133-ticks td { padding: .6mm } .c3p133-ticks td.c3p133-tshape { width: 34%; background: #fff } .c3p133-ticks td.c3p133-tshape > svg { margin: 0 auto }
.c3p133-ticks th { font-size: 12pt } .c3p133-ticks th:nth-child(3n+1) { width: 7% } .c3p133-ticks td:nth-child(3n+1) { background: #fff }
.c3p133-angtab th { width: 13%; text-align: left; padding-left: 2.4mm; font-size: 12pt; vertical-align: top; padding-top: 1.6mm; background: var(--tc) } .c3p133-angtab td { background: #fff; vertical-align: middle }
.c3p133-angtab td > svg { margin: 0 auto } .c3p133-angtab tr.r0 td { height: 23mm } .c3p133-angtab tr.r1 td { height: 15mm } .c3p133-angtab tr.r2 td { height: 15mm }
.c3p133-match { display: grid; grid-template-columns: 62mm 26mm 40mm; row-gap: 2.2mm; justify-content: center }
.c3p133-ml, .c3p133-mr { position: relative; display: flex; align-items: center; height: 20mm; background: #fff; border: .6mm solid var(--c); border-radius: 3.4mm; box-shadow: 0 1mm 0 var(--s) }
.c3p133-ml { justify-content: center } .c3p133-mr { justify-content: center } .c3p133-mr b { font: 800 15pt 'Baloo Da 2'; color: var(--d) }
.c3p133-dot { position: absolute; top: 50%; width: 3.6mm; height: 3.6mm; margin-top: -1.8mm; border-radius: 50%; background: var(--c); border: .6mm solid #fff; box-shadow: 0 0 0 .4mm var(--c) }
.c3p133-ml .c3p133-dot { right: -2.2mm } .c3p133-mr .c3p133-dot { left: -2.2mm }
`,
};
