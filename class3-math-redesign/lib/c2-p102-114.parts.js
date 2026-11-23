// Own kinds for printed pages 102–114 (chapter 4 shapes and patterns, chapter 5 measuring). Everything whose shape,
// length, height, weight or water level matters is drawn here, so it is exact: the shapes, the solids, the colouring
// design and the shape robot (p104), the rulers (true size where they fit: 1 cm = 10 mm on the printed page), the glass
// and the candle (p110), the gram weights, the balance and the digital scale, the bottles and glasses (p114).
// Kinds are prefixed p102_, classes p102-.
const INK = "#1E2433";
let UID = 0;
const uid = () => `p102u${++UID}`;
const f2 = (n) => Math.round(n * 100) / 100;
const escx = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ── flat shapes (fill, dark outline) ──
const PAL = { orange: ["#FDBA74", "#C2410C"], green: ["#BEF264", "#4D7C0F"], blue: ["#93C5FD", "#1D4ED8"], yellow: ["#FEF08A", "#A16207"],
  pink: ["#F9A8D4", "#BE185D"], rust: ["#F4A07A", "#9A3412"], teal: ["#99F6E4", "#0F766E"], purple: ["#D8B4FE", "#7E22CE"] };
function shapeSvg({ s, c = "orange", w = 24, h, outline, sw = 0.55 }) {
  h = h ?? w;
  const [fill, stroke] = outline ? ["#fff", INK] : PAL[c];
  const i = sw / 2 + 0.15, W = w - i, Hh = h - i;
  let d;
  if (s === "circle") d = `<ellipse cx="${w / 2}" cy="${h / 2}" rx="${f2(w / 2 - i)}" ry="${f2(h / 2 - i)}"/>`;
  else if (s === "tri") d = `<path d="M${w / 2} ${i}L${W} ${Hh}H${i}Z"/>`;
  else if (s === "tri-down") d = `<path d="M${i} ${i}H${W}L${w / 2} ${Hh}Z"/>`;
  else if (s === "rect" || s === "square") d = `<rect x="${i}" y="${i}" width="${f2(w - 2 * i)}" height="${f2(h - 2 * i)}"/>`;
  else if (s === "para") d = `<path d="M${f2(w * 0.25)} ${i}H${W}L${f2(w * 0.75)} ${Hh}H${i}Z"/>`;
  else if (s === "cylinder") { // standing
    const rx = w / 2 - i, ry = h * 0.13;
    d = `<path d="M${i} ${f2(ry + i)}V${f2(h - ry - i)}A${f2(rx)} ${f2(ry)} 0 0 0 ${f2(W)} ${f2(h - ry - i)}V${f2(ry + i)}A${f2(rx)} ${f2(ry)} 0 0 0 ${i} ${f2(ry + i)}Z"/>
      <ellipse cx="${w / 2}" cy="${f2(ry + i)}" rx="${f2(rx)}" ry="${f2(ry)}" style="fill:#fff;fill-opacity:.5"/>`;
  } else if (s === "capsule") { // a cylinder lying down, its round end towards us on the right
    const rx = h * 0.27, ry = h / 2 - i;
    d = `<path d="M${f2(rx + i)} ${i}H${f2(w - rx - i)}A${f2(rx)} ${f2(ry)} 0 0 1 ${f2(w - rx - i)} ${f2(Hh)}H${f2(rx + i)}A${f2(rx)} ${f2(ry)} 0 0 1 ${f2(rx + i)} ${i}Z"/>
      <ellipse cx="${f2(w - rx - i)}" cy="${h / 2}" rx="${f2(rx)}" ry="${f2(ry)}" style="fill:#fff;fill-opacity:.35"/>`;
  } else throw new Error("p102 shape? " + s);
  return `<svg class="p102-shape" width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}"><g fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round">${d}</g></svg>`;
}

// ── drawn objects ──
/** A glass: rim centre at y, its foot touches y + h (so h is its height). level, mark: fractions of h from the foot. */
function glassG(x, y, w, h, { level = 0, mark } = {}) {
  const tw = w / 2, bw = w * 0.36, cx = x + w / 2, ry = w * 0.085, ryb = ry * bw / tw, yb = y + h - ryb, sw = w * 0.04;
  const half = (yy) => tw - (tw - bw) * (yy - y) / (yb - y);
  const body = `M${f2(x)} ${f2(y)}L${f2(cx - bw)} ${f2(yb)}A${f2(bw)} ${f2(ryb)} 0 0 0 ${f2(cx + bw)} ${f2(yb)}L${f2(x + w)} ${f2(y)}Z`;
  let water = "", mk = "";
  if (level > 0) {
    const yl = y + h - h * level, hw = half(yl);
    water = `<path d="M${f2(cx - hw)} ${f2(yl)}L${f2(cx - bw)} ${f2(yb)}A${f2(bw)} ${f2(ryb)} 0 0 0 ${f2(cx + bw)} ${f2(yb)}L${f2(cx + hw)} ${f2(yl)}Z" fill="#38BDF8" fill-opacity=".55"/>
      <ellipse cx="${f2(cx)}" cy="${f2(yl)}" rx="${f2(hw)}" ry="${f2(ry * hw / tw)}" fill="#BAE6FD"/>`;
  }
  if (mark != null) { const ym = y + h - h * mark, hw = half(ym); mk = `<path d="M${f2(cx - hw + sw)} ${f2(ym)}H${f2(cx - hw * 0.35)}" stroke="#DC2626" stroke-width="${f2(w * 0.06)}" stroke-linecap="round"/>`; }
  return `<path d="${body}" fill="#F0F9FF" fill-opacity=".92"/>${water}
    <path d="${body}" fill="none" stroke="#0369A1" stroke-width="${f2(sw)}" stroke-linejoin="round"/>
    <ellipse cx="${f2(cx)}" cy="${f2(y)}" rx="${f2(tw)}" ry="${f2(ry)}" fill="#E0F2FE" fill-opacity=".7" stroke="#0369A1" stroke-width="${f2(sw)}"/>${mk}
    <path d="M${f2(x + w * 0.17)} ${f2(y + h * 0.14)}L${f2(cx - bw * 0.72)} ${f2(yb - h * 0.12)}" stroke="#fff" stroke-width="${f2(w * 0.06)}" stroke-linecap="round" opacity=".85"/>`;
}
/** A candle: flat foot at y + h, top of the wax at y (so h is its height); the flame stands above y. */
function candleG(x, y, w, h) {
  const id = uid(), cx = x + w / 2, ry = w * 0.16, yb = y + h;
  return `<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#FDE7C2"/><stop offset=".55" stop-color="#FBBF77"/><stop offset="1" stop-color="#E08A3C"/></linearGradient>
    <radialGradient id="${id}f" cx=".5" cy=".72" r=".62"><stop offset="0" stop-color="#FFFBEB"/><stop offset=".55" stop-color="#FDE047"/><stop offset="1" stop-color="#F97316"/></radialGradient></defs>
    <path d="M${x} ${y}V${f2(yb - 0.8)}Q${x} ${yb} ${x + 0.8} ${yb}H${f2(x + w - 0.8)}Q${x + w} ${yb} ${x + w} ${f2(yb - 0.8)}V${y}Z" fill="url(#${id})" stroke="#9A3412" stroke-width=".4"/>
    <ellipse cx="${f2(cx)}" cy="${y}" rx="${w / 2}" ry="${f2(ry)}" fill="#FEF3C7" stroke="#9A3412" stroke-width=".4"/>
    <path d="M${f2(x + w * 0.22)} ${f2(y + ry * 0.7)}v${f2(h * 0.14)}a${f2(w * 0.07)} ${f2(w * 0.07)} 0 0 0 ${f2(w * 0.14)} 0v${f2(-h * 0.08)}" fill="#FEF3C7" stroke="#C2410C" stroke-width=".3"/>
    <path d="M${f2(cx)} ${y}v-2.4" stroke="${INK}" stroke-width=".55" stroke-linecap="round"/>
    <path d="M${f2(cx)} ${f2(y - 14)}C${f2(cx + 3.6)} ${f2(y - 7.5)} ${f2(cx + 3.2)} ${f2(y - 2.2)} ${f2(cx)} ${f2(y - 1.9)}C${f2(cx - 3.2)} ${f2(y - 2.2)} ${f2(cx - 3.6)} ${f2(y - 7.5)} ${f2(cx)} ${f2(y - 14)}Z" fill="url(#${id}f)" stroke="#EA580C" stroke-width=".3"/>`;
}
/** A pencil lying left to right: the eraser's end at x0, the lead's tip at x0 + L (so L is its length). */
function pencilG(x0, cy, L, t, c = "yellow") {
  const C = { yellow: ["#FDE68A", "#F59E0B"], blue: ["#BFDBFE", "#3B82F6"], green: ["#BBF7D0", "#22C55E"], red: ["#FECACA", "#EF4444"] }[c];
  const e = t, fe = t * 0.9, cone = t * 2.3, tip = cone * 0.36, y0 = cy - t / 2, y1 = cy + t / 2, xf = x0 + e, xb = xf + fe, xc = x0 + L - cone, xt = x0 + L - tip, k = t * 0.18;
  return `<g stroke="#78350F" stroke-width="${f2(t * 0.08)}" stroke-linejoin="round">
    <path d="M${f2(xf)} ${f2(y0)}H${f2(x0 + t * 0.35)}Q${f2(x0)} ${f2(y0)} ${f2(x0)} ${f2(cy)}Q${f2(x0)} ${f2(y1)} ${f2(x0 + t * 0.35)} ${f2(y1)}H${f2(xf)}Z" fill="#F9A8D4"/>
    <rect x="${f2(xf)}" y="${f2(y0)}" width="${f2(fe)}" height="${f2(t)}" fill="#CBD5E1"/><path d="M${f2(xf + fe * 0.35)} ${f2(y0)}V${f2(y1)}M${f2(xf + fe * 0.7)} ${f2(y0)}V${f2(y1)}" stroke-width="${f2(t * 0.05)}"/>
    <rect x="${f2(xb)}" y="${f2(y0)}" width="${f2(xc - xb)}" height="${f2(t)}" fill="${C[1]}"/><rect x="${f2(xb + 0.2)}" y="${f2(y0 + t * 0.12)}" width="${f2(xc - xb - 0.4)}" height="${f2(t * 0.26)}" fill="${C[0]}" stroke="none"/>
    <path d="M${f2(xc)} ${f2(y0)}L${f2(xt)} ${f2(cy - k)}V${f2(cy + k)}L${f2(xc)} ${f2(y1)}Z" fill="#F5D0A1"/>
    <path d="M${f2(xt)} ${f2(cy - k)}L${f2(x0 + L)} ${f2(cy)}L${f2(xt)} ${f2(cy + k)}Z" fill="#334155"/></g>`;
}
/** An eraser: its front face from x0 to x0 + L, a bevelled top inside that length. */
function eraserG(x0, y, L, h) {
  const t = h * 0.38;
  return `<g stroke="#475569" stroke-width=".35" stroke-linejoin="round"><path d="M${f2(x0 + 0.5)} ${f2(y + t)}L${f2(x0 + 2.4)} ${y}H${f2(x0 + L - 2.4)}L${f2(x0 + L - 0.5)} ${f2(y + t)}Z" fill="#F8FAFC"/>
    <path d="M${f2(x0 + 4)} ${f2(y + t * 0.75)}L${f2(x0 + 5)} ${f2(y + t * 0.25)}H${f2(x0 + L - 5)}L${f2(x0 + L - 4)} ${f2(y + t * 0.75)}Z" fill="#E2E8F0" stroke-width=".25"/>
    <rect x="${x0}" y="${f2(y + t)}" width="${L}" height="${f2(h - t)}" fill="#F1F5F9"/><rect x="${f2(x0 + L * 0.55)}" y="${f2(y + t)}" width="${f2(L * 0.45)}" height="${f2(h - t)}" fill="#60A5FA"/></g>`;
}
/** A plastic bottle centred at (cx, cy), turned rot degrees; the water's surface stays level at world height wy. */
function bottleG(cx, cy, w, h, { rot = 0, wy, cap = true, vb = [999, 999] } = {}) {
  const id = uid(), n = w * 0.18, b = w / 2, y0 = -h / 2, capH = h * 0.075, nb = y0 + h * 0.17, sh = y0 + h * 0.31, yb = h / 2, r = w * 0.14;
  // the water: a level rectangle cut to the bottle's shape, kept inside the picture (so nothing pokes out of the svg)
  const R = 0.56 * Math.hypot(w, h), wx0 = Math.max(0, cx - R), wx1 = Math.min(vb[0], cx + R), wy0 = Math.max(0, wy ?? 0), wy1 = Math.min(vb[1], cy + R);
  const body = `M${f2(-n)} ${f2(y0 + capH)}H${f2(n)}V${f2(nb)}C${f2(n)} ${f2(nb + h * 0.07)} ${f2(b)} ${f2(sh - h * 0.07)} ${f2(b)} ${f2(sh)}V${f2(yb - r)}Q${f2(b)} ${f2(yb)} ${f2(b - r)} ${f2(yb)}H${f2(-b + r)}Q${f2(-b)} ${f2(yb)} ${f2(-b)} ${f2(yb - r)}V${f2(sh)}C${f2(-b)} ${f2(sh - h * 0.07)} ${f2(-n)} ${f2(nb + h * 0.07)} ${f2(-n)} ${f2(nb)}Z`;
  const T = `translate(${f2(cx)} ${f2(cy)}) rotate(${rot})`;
  const water = wy == null ? "" : `<rect x="${f2(wx0)}" y="${f2(wy0)}" width="${f2(wx1 - wx0)}" height="${f2(Math.max(0, wy1 - wy0))}" fill="#3B82F6" fill-opacity=".55" clip-path="url(#${id})"/>`;
  return `<defs><clipPath id="${id}"><path d="${body}" transform="${T}"/></clipPath></defs>
    <path d="${body}" transform="${T}" fill="#DBEAFE" fill-opacity=".9"/>${water}
    <g transform="${T}"><rect x="${f2(-b)}" y="${f2(y0 + h * 0.47)}" width="${f2(w)}" height="${f2(h * 0.2)}" fill="#fff" fill-opacity=".8"/>
      <path d="${body}" fill="none" stroke="#1D4ED8" stroke-width="${f2(w * 0.035)}" stroke-linejoin="round"/>
      <path d="M${f2(-b + w * 0.16)} ${f2(sh + h * 0.04)}V${f2(y0 + h * 0.45)}M${f2(-b + w * 0.16)} ${f2(y0 + h * 0.7)}V${f2(yb - h * 0.08)}" stroke="#fff" stroke-width="${f2(w * 0.07)}" stroke-linecap="round" opacity=".8"/>
      ${cap ? `<rect x="${f2(-n - w * 0.03)}" y="${f2(y0)}" width="${f2(2 * n + w * 0.06)}" height="${f2(capH + 0.3)}" rx="${f2(w * 0.04)}" fill="#1D4ED8"/>` : ""}</g>`;
}
/** Where a bottle's mouth is, after turning. */
function mouth(cx, cy, h, rot) { const a = rot * Math.PI / 180, y = -h / 2; return [cx - y * Math.sin(a), cy + y * Math.cos(a)]; }
const stream = (m, tx, ty) => `<path d="M${f2(m[0])} ${f2(m[1])}C${f2(m[0] + (tx - m[0]) * 0.6)} ${f2(m[1] + 0.6)} ${f2(tx)} ${f2(m[1] + (ty - m[1]) * 0.3)} ${f2(tx)} ${f2(ty)}" fill="none" stroke="#38BDF8" stroke-width="1.3" stroke-linecap="round"/>`;
/** A gram weight (বাটখারা): bigger for heavier ones; its value written on its top face. */
function weightSvg(v, top) {
  const w = 12 + 3.2 * Math.log(v / 5), t = w * 0.26 + 1.6, f = w * 0.3 + 2, ins = w * 0.09, sw = 0.42;
  const len = [...String(top)].length, fs = f2(Math.min(t * 0.66, (w - 2 * ins - 1.5) / (len * 0.5)));
  return `<svg class="p102-wt" width="${f2(w + 1)}mm" height="${f2(t + f + 1)}mm" viewBox="-.5 -.5 ${f2(w + 1)} ${f2(t + f + 1)}">
    <path d="M${f2(ins)} 0H${f2(w - ins)}L${f2(w)} ${f2(t)}H0Z" fill="#F6A770"/>
    <path d="M${f2(ins * 1.9)} ${f2(t * 0.16)}H${f2(w - ins * 1.9)}L${f2(w - ins * 1.1)} ${f2(t * 0.86)}H${f2(ins * 1.1)}Z" fill="#E07B45" stroke="#7C2D12" stroke-width="${f2(sw * 0.7)}"/>
    <rect x="0" y="${f2(t)}" width="${f2(w)}" height="${f2(f)}" fill="#D9672E"/><rect x=".4" y="${f2(t + 0.5)}" width="${f2(w - 0.8)}" height="${f2(f * 0.22)}" fill="#E8834C"/>
    <path d="M${f2(ins)} 0H${f2(w - ins)}L${f2(w)} ${f2(t)}V${f2(t + f)}H0V${f2(t)}ZM0 ${f2(t)}H${f2(w)}" fill="none" stroke="#7C2D12" stroke-width="${sw}" stroke-linejoin="round"/>
    <text x="${f2(w / 2)}" y="${f2(t * 0.52 + fs * 0.36)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="${fs}" fill="#fff">${escx(top)}</text></svg>`;
}
const appleG = (cx, cy, s) => `<g transform="translate(${f2(cx - s / 2)} ${f2(cy - s / 2)}) scale(${f2(s / 40)})">
  <path d="M20 12C12 4 2 10 4 22C6 34 14 39 20 36C26 39 34 34 36 22C38 10 28 4 20 12Z" fill="#EF4444" stroke="#991B1B" stroke-width="1.4"/>
  <path d="M20 12C20 8 21 5 23 3" stroke="#78350F" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M22 7C25 2 31 2 33 4C30 8 25 9 22 7Z" fill="#22C55E" stroke="#166534" stroke-width=".9"/>
  <ellipse cx="11" cy="17" rx="3" ry="5" fill="#fff" opacity=".55" transform="rotate(20 11 17)"/></g>`;

const DRAW = {
  football: { vw: 100, vh: 100, g: (id) => {
    const P = (cx, cy, r, a0) => Array.from({ length: 5 }, (_, k) => { const a = (a0 + 72 * k) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    const poly = (pts) => `M${pts.map((p) => `${f2(p[0])} ${f2(p[1])}`).join("L")}Z`, line = (a, b) => `M${f2(a[0])} ${f2(a[1])}L${f2(b[0])} ${f2(b[1])}`;
    const C = P(50, 50, 13, -90), O = [];
    let pent = poly(C), seams = "";
    for (let k = 0; k < 5; k++) { const a = -90 + 72 * k, r = a * Math.PI / 180, Q = P(50 + 40 * Math.cos(r), 50 + 40 * Math.sin(r), 13, a + 180); O.push(Q); pent += poly(Q); seams += line(C[k], Q[0]); }
    for (let k = 0; k < 5; k++) seams += line(O[k][4], O[(k + 1) % 5][1]);
    return `<defs><clipPath id="${id}"><circle cx="50" cy="48" r="45"/></clipPath><radialGradient id="${id}g" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#CBD5E1"/></radialGradient></defs>
      <ellipse cx="52" cy="95" rx="32" ry="3.6" fill="#000" opacity=".08"/><circle cx="50" cy="48" r="45" fill="url(#${id}g)"/>
      <g clip-path="url(#${id})" transform="translate(0 -2)"><path d="${seams}" stroke="${INK}" stroke-width="1.6" fill="none"/><path d="${pent}" fill="${INK}"/></g>
      <circle cx="50" cy="48" r="45" fill="none" stroke="${INK}" stroke-width="2.2"/><ellipse cx="33" cy="25" rx="9" ry="4.5" fill="#fff" opacity=".55" transform="rotate(-32 33 25)"/>`; } },
  pyramid: { vw: 100, vh: 92, g: () => `<ellipse cx="54" cy="84" rx="44" ry="5" fill="#000" opacity=".08"/>
    <path d="M46 4L6 72L62 86Z" fill="#7DD3FC"/><path d="M46 4L62 86L96 64Z" fill="#0EA5E9"/>
    <path d="M46 4L6 72L62 86L96 64ZM46 4L62 86" fill="none" stroke="#0C4A6E" stroke-width="1.8" stroke-linejoin="round"/>` },
  book: { vw: 124, vh: 60, g: () => { let pg = ""; for (let i = 1; i < 6; i++) pg += `<path d="M90 ${26 + i * 3.2}L116 ${8 + i * 3.2}" stroke="#E7C98F" stroke-width=".7"/>`;
    return `<ellipse cx="64" cy="54" rx="56" ry="4" fill="#000" opacity=".08"/>
      <path d="M90 26L116 8V28L90 46Z" fill="#FEF3C7"/>${pg}<path d="M90 26L116 8V10.5L90 28.5ZM90 43.5L116 25.5V28L90 46Z" fill="#B91C1C"/>
      <path d="M8 26L34 8H116L90 26Z" fill="#DC2626"/><path d="M20 22.5L38 11H104L86 22.5Z" fill="none" stroke="#FBBF24" stroke-width="1.2"/>
      <path d="M8 26H90V46H8Q3 36 8 26Z" fill="#B91C1C"/><path d="M20 27V45M78 27V45" stroke="#FBBF24" stroke-width="2"/>
      <path d="M8 26L34 8H116V28L90 46H8Q3 36 8 26ZM8 26H90L116 8M90 26V46" fill="none" stroke="#7F1D1D" stroke-width="1.6" stroke-linejoin="round"/>`; } },
  matchbox: { vw: 122, vh: 56, g: () => { let m = "";
    for (let k = 0; k < 4; k++) { const y = 24.6 - k * 2.6, dx = k * 3; m += `<path d="M${12 + dx} ${y}H${52 + dx}" stroke="#F3D9A4" stroke-width="1.7" stroke-linecap="round"/><ellipse cx="${11 + dx}" cy="${y}" rx="2.5" ry="1.5" fill="#DC2626" stroke="#7F1D1D" stroke-width=".5"/>`; }
    return `<ellipse cx="64" cy="50" rx="58" ry="3.6" fill="#000" opacity=".08"/><path d="M6 27L20 15H60L46 27Z" fill="#7C4A21"/>${m}
      <rect x="6" y="27" width="40" height="15" fill="#F5D7A1" stroke="#7C2D12" stroke-width="1.3"/><path d="M6 27L20 15H60" fill="none" stroke="#7C2D12" stroke-width="1.3"/>
      <path d="M40 27L54 15H118L104 27Z" fill="#FB923C"/><path d="M104 27L118 15V31L104 43Z" fill="#C2410C"/><rect x="40" y="27" width="64" height="16" fill="#EA580C"/>
      <path d="M62 24.5L68.5 17.5H101L94.5 24.5Z" fill="#FEF08A"/><path d="M81 23.4C77.6 22.4 78 19.6 80.6 17.6C80.4 19.6 82.6 19.6 83 21.4C83.2 22.6 82.2 23.6 81 23.4Z" fill="#DC2626"/>
      <path d="M44 31H100" stroke="#FDBA74" stroke-width="1.2"/>
      <g fill="none" stroke="#7C2D12" stroke-width="1.5" stroke-linejoin="round"><path d="M40 27L54 15H118L104 27ZM104 27L118 15V31L104 43"/><rect x="40" y="27" width="64" height="16"/></g>`; } },
  glass: { vw: 50, vh: 74, g: () => `<ellipse cx="26" cy="70" rx="20" ry="2.6" fill="#000" opacity=".08"/>${glassG(4, 6, 42, 64, { level: 0 })}` },
  marble: { vw: 64, vh: 64, g: (id) => `<defs><radialGradient id="${id}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#F0F9FF"/><stop offset="1" stop-color="#7DD3FC"/></radialGradient></defs>
    <ellipse cx="34" cy="60" rx="22" ry="3" fill="#000" opacity=".08"/><circle cx="32" cy="31" r="27" fill="url(#${id})" stroke="#0369A1" stroke-width="1.6"/>
    <path d="M13 36C17 19 34 13 47 22C36 22 24 27 13 36Z" fill="#EF4444"/><path d="M14 31C24 45 41 48 51 33C40 41 27 40 14 31Z" fill="#22C55E"/><path d="M21 32C30 26 41 28 47 30C38 34 30 35 21 32Z" fill="#FACC15"/>
    <ellipse cx="22" cy="17" rx="8" ry="4.5" fill="#fff" opacity=".85" transform="rotate(-30 22 17)"/>` },
  dice: { vw: 100, vh: 98, g: () => { const pip = (x, y) => `<circle cx="${x}" cy="${y}" r="5.2"/>`;
    return `<ellipse cx="54" cy="93" rx="40" ry="4" fill="#000" opacity=".08"/>
      <path d="M8 34L32 12H90L66 34Z" fill="#F87171"/><path d="M66 34L90 12V68L66 90Z" fill="#B91C1C"/><rect x="8" y="34" width="58" height="56" fill="#EF4444"/>
      <g fill="#fff">${pip(22, 48)}${pip(52, 48)}${pip(37, 62)}${pip(22, 76)}${pip(52, 76)}<ellipse cx="49" cy="23" rx="6.6" ry="3.4"/><ellipse cx="72.5" cy="64" rx="3" ry="5.2" transform="rotate(20 72.5 64)"/><ellipse cx="83.5" cy="36" rx="3" ry="5.2" transform="rotate(20 83.5 36)"/></g>
      <g fill="none" stroke="#7F1D1D" stroke-width="1.8" stroke-linejoin="round"><path d="M8 34L32 12H90L66 34ZM66 34L90 12V68L66 90"/><rect x="8" y="34" width="58" height="56"/></g>`; } },
  brick: { vw: 120, vh: 62, g: () => `<ellipse cx="62" cy="57" rx="56" ry="4" fill="#000" opacity=".08"/>
    <path d="M4 24L24 10H116L96 24Z" fill="#EA7A4C"/><path d="M96 24L116 10V40L96 54Z" fill="#9A3412"/><rect x="4" y="24" width="92" height="30" fill="#C2410C"/>
    <path d="M27.4 20.5H82.6L91.6 14.2H36.4Z" fill="#B4461F" stroke="#7C2D12" stroke-width="1.2" stroke-linejoin="round"/>
    <g fill="none" stroke="#7C2D12" stroke-width="1.8" stroke-linejoin="round"><path d="M4 24L24 10H116L96 24ZM96 24L116 10V40L96 54"/><rect x="4" y="24" width="92" height="30"/></g>` },
  cone: { vw: 80, vh: 92, g: (id) => `<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#ECFCCB"/><stop offset=".45" stop-color="#A3E635"/><stop offset="1" stop-color="#4D7C0F"/></linearGradient></defs>
    <ellipse cx="44" cy="86" rx="36" ry="4.5" fill="#000" opacity=".08"/><path d="M40 4L7 76A33 10 0 0 0 73 76Z" fill="url(#${id})" stroke="#365314" stroke-width="1.8" stroke-linejoin="round"/>` },
  ring: { vw: 80, vh: 86, g: (id) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FEF08A"/><stop offset=".5" stop-color="#F59E0B"/><stop offset="1" stop-color="#B45309"/></linearGradient></defs>
    <ellipse cx="42" cy="82" rx="26" ry="3" fill="#000" opacity=".08"/>
    <path d="M10 52A30 28 0 1 0 70 52A30 28 0 1 0 10 52ZM18 52A22 20 0 1 1 62 52A22 20 0 1 1 18 52Z" fill="url(#${id})" fill-rule="evenodd" stroke="#92400E" stroke-width="1.5"/>
    <path d="M33 24H47L45 30H35Z" fill="#F59E0B" stroke="#92400E" stroke-width="1.2"/>
    <path d="M27 16L33 7H47L53 16L40 29Z" fill="#E0F2FE" stroke="#0369A1" stroke-width="1.3" stroke-linejoin="round"/><path d="M27 16H53M33 7L37 16L40 29M47 7L43 16L40 29" fill="none" stroke="#0369A1" stroke-width=".9"/>
    <path d="M58 6l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4z" fill="#FDE047"/>` },
  samosa: { vw: 96, vh: 72, g: (id) => { let crimp = ""; for (let i = 0; i < 11; i++) crimp += `<path d="M${16 + i * 6.2} 61.6q3.1 3.4 6.2 0" fill="none" stroke="#B45309" stroke-width="1.1"/>`;
    return `<defs><linearGradient id="${id}" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#FDE68A"/><stop offset="1" stop-color="#D97706"/></linearGradient></defs>
      <ellipse cx="50" cy="68" rx="40" ry="3.5" fill="#000" opacity=".08"/>
      <path d="M47 6C51 5.6 54 8 56 11L87 54C90 59 87 63 81 63H15C9 63 6.5 58.5 10 54L39 12C41 9 43.6 6.3 47 6Z" fill="url(#${id})" stroke="#92400E" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M47 9C40 26 36 44 34 61" fill="none" stroke="#B45309" stroke-width="1.2" opacity=".6"/>${crimp}
      <g fill="#B45309" opacity=".5"><circle cx="56" cy="36" r="1.3"/><circle cx="64" cy="48" r="1.1"/><circle cx="26" cy="50" r="1.2"/><circle cx="48" cy="52" r="1"/><circle cx="72" cy="56" r="1"/></g>`; } },
  geobox: { vw: 124, vh: 64, g: (id) => `<defs><clipPath id="${id}"><path d="M10 34L28 8H118L100 34Z"/></clipPath></defs>
    <ellipse cx="64" cy="58" rx="58" ry="4" fill="#000" opacity=".08"/>
    <path d="M10 34H100V48H10Z" fill="#38BDF8"/><path d="M100 34L118 8V22L100 48Z" fill="#0284C7"/><path d="M10 34L28 8H118L100 34Z" fill="#1E293B"/>
    <g clip-path="url(#${id})"><path d="M10 34L28 8H44L30 34Z" fill="#EF4444"/><path d="M52 8L64 34H44Z" fill="#FACC15"/><path d="M66 8H86L72 30Z" fill="#14B8A6"/><path d="M86 34L98 14L108 34Z" fill="#F472B6"/><path d="M90 8H118L112 17Z" fill="#FACC15"/><path d="M30 34L40 20L52 34Z" fill="#fff"/></g>
    <g fill="none" stroke="#0F172A" stroke-width="1.5" stroke-linejoin="round"><path d="M10 34L28 8H118L100 34ZM100 34L118 8V22L100 48H10V34H100V48"/></g>` },
};
function objSvg(name, h, o = {}) {
  const D = DRAW[name];
  if (!D) throw new Error("p102 object? " + name);
  return `<svg class="p102-obj" width="${f2(h * D.vw / D.vh)}mm" height="${h}mm" viewBox="0 0 ${D.vw} ${D.vh}">${D.g(uid(), o)}</svg>`;
}

// ── p104: the colouring design and the shape robot, drawn from the book's lines ──
function designSvg(w) {
  const L = (pts) => `M${pts.map((p) => p.join(" ")).join("L")}`;
  const C = [718.5, 312.75], T = [718.5, 144], UR = [882, 230], LR = [882, 395.5], B = [718.5, 481.5], LL = [556, 395.5], UL = [556, 230];
  const d = [
    "M45 19H882V606.5H45Z", "M185 19V606.5",
    // left strip: two quarter curves, two slants, the diamond and its stalks
    "M45 19A140 103.5 0 0 1 185 122.5", "M185 502.5A140 103.5 0 0 1 45 606.5", L([[45, 216], [185, 122.5]]), L([[45, 409.5], [185, 502.5]]),
    L([[115, 169.5], [115, 243.5]]), L([[115, 382], [115, 455.5]]), L([[115, 243.5], [185, 312.75], [115, 382], [45, 312.75], [115, 243.5]]),
    // the middle: fans and the bar
    L([[185, 122.5], [464, 19]]), L([[185, 502.5], [464, 606.5]]), L([[185, 122.5], UL]), L([[185, 502.5], LL]),
    L([[185, 277.5], [457, 201]]), L([[185, 348], [457, 424.5]]),
    "M464 19A127 127 0 0 1 457 201", "M457 201A50 50 0 0 1 464 277.5", "M464 348A50 50 0 0 1 457 424.5", "M457 424.5A127 127 0 0 1 464 606.5",
    L([[185, 277.5], [556, 277.5]]), L([[185, 348], [556, 348]]),
    // the right: the hexagon with its spokes and pinwheel, the corner curves
    L([[464, 19], T]), L([[464, 606.5], B]), L([T, UR, LR, B, LL, UL, T]), L([T, B]), L([UL, C, LR]), L([LL, C, UR]),
    L([T, [788.5, 210], C]), L([UR, [856, 315], C]), L([LR, [786, 422], C]), L([B, [649.5, 420], C]), L([LL, [582.5, 312], C]), L([UL, [652.5, 207.5], C]),
    L([T, [882, 19]]), L([B, [882, 606.5]]), "M718.5 144A163.5 125 0 0 1 882 19", "M718.5 144A163.5 86 0 0 1 882 230", "M882 395.5A163.5 86 0 0 1 718.5 481.5", "M718.5 481.5A163.5 125 0 0 0 882 606.5",
  ].join("");
  const h = w * 597.5 / 847;
  return `<svg class="p102-design" width="${w}mm" height="${f2(h)}mm" viewBox="40 14 847 597.5"><rect x="45" y="19" width="837" height="587.5" fill="#fff"/>
    <path d="${d}" fill="none" stroke="#334155" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M45 19H882V606.5H45Z" fill="none" stroke="${INK}" stroke-width="4.5"/></svg>`;
}
function robotSvg(h) {
  const w = h * 682 / 444, s = `style="fill:var(--s)"`;
  return `<svg class="p102-robot" width="${f2(w)}mm" height="${h}mm" viewBox="232 182 682 444"><g stroke="${INK}" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
    <path d="M463 297L240 420H463Z" ${s}/><path d="M683 297L905 420H683Z" ${s}/>
    <path d="M463 441H573L463 618Z" ${s}/><path d="M683 441H573L683 618Z" ${s}/><path d="M573 441L463 618M573 441L683 618" fill="none"/>
    <path d="M395 618L463 575V618Z" ${s}/><path d="M683 575L752 618H683Z" ${s}/>
    <rect x="463" y="297" width="220" height="144" ${s}/><rect x="540" y="256" width="66" height="41" ${s}/>
    <ellipse cx="573" cy="222" rx="66" ry="34" ${s}/><circle cx="551" cy="212" r="5" fill="#fff"/><circle cx="595" cy="212" r="5" fill="#fff"/><path d="M540 238Q573 250 607 238" fill="none"/></g></svg>`;
}

// ── rulers ──
function rulerHtml(b, ctx) {
  const mm = b.mm || 10, cm = b.cm || 10, padL = 9, padR = b.padR ?? 6, rh = b.rh || 12.5, laneH = 8.4, top0 = rh + 3, items = b.items || [];
  const X = (v) => padL + v * mm, H = top0 + items.length * laneH + 1.5, W = padL + cm * mm + padR;
  let s = `<rect x="${padL - 4}" y=".4" width="${cm * mm + 8}" height="${rh}" rx="1.6" fill="#FEF9C3" stroke="#CA8A04" stroke-width=".45"/>`;
  const step = b.ticks === "half" ? 0.5 : 0.1;
  for (let i = 0; i <= Math.round(cm / step); i++) {
    const v = i * step, isCm = Math.abs(v - Math.round(v)) < 1e-6, isHalf = Math.abs(v * 2 - Math.round(v * 2)) < 1e-6;
    s += `<path d="M${f2(X(v))} ${f2(rh + 0.4)}v${isCm ? -4.4 : isHalf ? -3 : -1.7}" stroke="${INK}" stroke-width="${isCm ? 0.34 : 0.2}"/>`;
    if (isCm) s += `<text x="${f2(X(v))}" y="${f2(rh - 5.6)}" text-anchor="middle" class="p102-rn" font-size="${b.fs || 3.5}">${b.latin ? Math.round(v) : ctx.bn(Math.round(v))}</text>`;
  }
  const guides = {};
  items.forEach((it, i) => { for (const v of [it.from, it.to]) guides[v] = Math.max(guides[v] || 0, top0 + (i + 1) * laneH); });
  for (const [v, yb] of Object.entries(guides)) s += `<path d="M${f2(X(+v))} ${f2(rh + 0.6)}V${f2(yb)}" stroke="#DC2626" stroke-width=".32" stroke-dasharray="1.1 .8"/>`;
  items.forEach((it, i) => {
    const cy = top0 + i * laneH + laneH / 2, x0 = X(it.from), x1 = X(it.to);
    if (it.obj === "eraser") s += eraserG(x0, cy - 3.3, x1 - x0, 6.6); else s += pencilG(x0, cy, x1 - x0, it.t || 4.3, it.color);
    if (it.arrow) { const x = it.arrow === "start" ? x0 - 0.6 : x1 + 0.6; s += `<path d="M0 0L3.4 -2.4V-1H8V1H3.4V2.4Z" transform="translate(${f2(x)} ${f2(cy + 1)}) rotate(${it.arrow === "start" ? 135 : 45})" fill="#FBBF24" stroke="#B45309" stroke-width=".3" stroke-linejoin="round"/>`; }
    if (it.label) s += `<text x="${f2(x1 + 2.6)}" y="${f2(cy + 1.4)}" class="p102-lb" font-size="4">${escx(it.label)}</text>`;
    if (it.box) s += `<rect x="${f2(x1 + 2.6)}" y="${f2(cy - 3.2)}" width="10.5" height="6.4" rx="1.3" fill="#FFFBEB" stroke="#F59E0B" stroke-width=".55"/><text x="${f2(x1 + 15)}" y="${f2(cy + 1.4)}" class="p102-lb" font-size="4">সে.মি.</text>`;
  });
  const co = b.callout ? `<div class="p102-callout" style="left:${f2(X(b.callout.at))}mm;transform:translateX(${b.callout.align === "end" ? -100 : b.callout.align === "center" ? -50 : -12}%)">${ctx.md(b.callout.text)}</div>` : "";
  return `<div class="p102-ruler${co ? " has-co" : ""}" style="width:${f2(W)}mm"><svg width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">${s}</svg>${co}</div>`;
}

module.exports = {
  kinds: {
    /** An exercise with the book's own marks: a green square (activities) or a pink triangle (exercises). */
    p102_ex: (b, ctx, page) => `<div class="ex p102-ex"><div class="ext p102-ext"><span class="p102-mk ${b.mark || "tri"}"><b>${ctx.esc(b.n || "")}</b></span><span>${ctx.md(b.text)}</span></div>${(b.body || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>`,
    /** A child speaking, with drawn things inside the bubble (inner), or nobody's face (who: "none"). */
    p102_say: (b, ctx, page) => {
      const who = b.who || "boy", col = who === "none" ? "#0D9488" : ctx.WHO[who];
      const pic = who === "none" ? null : (ctx.picFile(`face-${who}-${b.mood || "talk"}`) || ctx.picFile(`face-${who}`));
      const face = pic ? `<span class="av"><img class="fc" src="file://${pic.file}"></span>` : "";
      const right = who === "girl";
      return `<div class="say ${right ? "girl" : "boy"} p102-say${b.small ? " p102-sm" : ""}${who === "none" ? " p102-none" : ""}" style="--w:${col}">${right ? "" : face}<div class="sb">${ctx.md(b.text)}${(b.inner || []).map((x) => ctx.blockHtml(x, page)).join("")}</div>${right ? face : ""}</div>`;
    },
    /** Flat shapes in a row: items [{ s: circle|tri|tri-down|rect|square|para|cylinder|capsule, c, w, h, label, outline }]. */
    p102_shapes: (b, ctx) => `<div class="p102-row" style="gap:${b.gap ?? 6}mm;justify-content:${b.justify || "space-around"}">${b.items.map((it) => `<figure class="p102-fig">${shapeSvg(it)}${it.label ? `<figcaption>${ctx.md(it.label)}</figcaption>` : ""}</figure>`).join("")}</div>`,
    /** Drawn objects in a row: items [{ d: football|pyramid|book|matchbox|glass|marble|dice|brick|cone|ring|samosa|geobox, h, label }] or any block. */
    p102_objs: (b, ctx, page) => `<div class="p102-row" style="gap:${b.gap ?? 3}mm;justify-content:${b.justify || "space-between"};align-items:${b.align || "flex-end"}">${b.items.map((it) => `<figure class="p102-fig">${it.d ? objSvg(it.d, it.h || 20) : ctx.blockHtml(it, page)}${it.label ? `<figcaption>${ctx.md(it.label)}</figcaption>` : ""}</figure>`).join("")}</div>`,
    /** A table whose cells hold blocks: rows [[block | [blocks], …], …]. */
    p102_grid: (b, ctx, page) => `<table class="grid tone-${b.tone || "yellow"} p102-grid">${b.rows.map((r, i) => `<tr style="${b.h && b.h[i] ? `height:${b.h[i]}mm` : ""}">${r.map((c) => `<td>${(Array.isArray(c) ? c : [c]).map((x) => ctx.blockHtml(x, page)).join("")}</td>`).join("")}</tr>`).join("")}</table>`,
    /** p103: join each object to its shape: rows [[{ d, h, word }, { s, c, w, h }], …]. */
    p102_match: (b, ctx) => `<div class="p102-match">${b.rows.map(([L, R]) => `<div class="p102-ml">${objSvg(L.d, L.h || 18)}<b>${ctx.md(L.word)}</b><i class="p102-dot"></i></div><span></span><div class="p102-mr"><i class="p102-dot"></i>${shapeSvg(R)}</div>`).join("")}</div>`,
    p102_design: (b) => `<div class="p102-center">${designSvg(b.w || 120)}</div>`,
    /** p104: the robot and the count line under it (△ ……টি ▭ ……টি ◯ ……টি). */
    p102_robot: (b, ctx) => `<div class="p102-center">${robotSvg(b.h || 56)}</div><div class="p102-legend">${[{ s: "tri", w: 9, h: 8 }, { s: "rect", w: 11, h: 7 }, { s: "circle", w: 8.5, h: 8.5 }].map((x) => `<span>${shapeSvg({ ...x, outline: true })}<i class="p102-dl"></i>টি</span>`).join("")}</div>`,
    /** Empty boxes to draw a pattern in. */
    p102_slots: (b) => `<div class="p102-slots" style="grid-template-columns:repeat(${b.n || 10}, ${b.size || 13}mm);grid-auto-rows:${b.size || 13}mm">${"<i></i>".repeat((b.n || 10) * (b.rows || 1))}</div>`,
    /** p107: two pencils standing in two frames, long and short (len in mm). */
    p102_pencils: (b) => `<div class="p102-pencils">${b.items.map((it) => { const H = (b.h || 56), t = 4.6;
      return `<div><svg width="14mm" height="${H}mm" viewBox="0 0 14 ${H}"><g transform="rotate(-90 7 ${H - 3})">${pencilG(7, H - 3, it.len, t, it.color)}</g></svg></div>`; }).join("")}</div>`,
    /** A ruler with things laid along it: { cm, mm (per cm), ticks: mm|half, latin, items: [{ obj: pencil|eraser, from, to, arrow, label, box }], callout }. */
    p102_ruler: (b, ctx) => `<div class="p102-center">${rulerHtml(b, ctx)}</div>`,
    /** p110: a standing ruler, a glass and a candle (their heights in cm), dashed lines from the ruler to their tops. */
    p102_heights: (b, ctx) => {
      const mm = b.mm || 9, cm = b.cm || 6, F = 16 + cm * mm, rx = 3, rw = 15, W = b.w || 150;
      let s = `<rect x="${rx}" y="${f2(F - (cm + 0.45) * mm)}" width="${rw}" height="${f2((cm + 0.45) * mm + 2.6)}" rx="1.4" fill="#FEF9C3" stroke="#CA8A04" stroke-width=".45"/>`;
      for (let i = 0; i <= cm * 2; i++) { const y = F - i * mm / 2, isCm = i % 2 === 0; s += `<path d="M${rx + rw} ${f2(y)}h${isCm ? -5.2 : -3.2}" stroke="${INK}" stroke-width="${isCm ? 0.4 : 0.26}"/>`;
        if (isCm) s += `<text x="${rx + 5}" y="${f2(y + 1.35)}" text-anchor="middle" class="p102-rn" font-size="3.9">${b.latin ? i / 2 : ctx.bn(i / 2)}</text>`; }
      s += `<path d="M${rx + rw} ${F}H${W - 2}" stroke="#CBD5E1" stroke-width=".5"/>`;
      for (const it of b.items) {
        const top = F - it.h * mm;
        s += `<path d="M${rx + rw} ${f2(top)}H${f2(it.x + (it.obj === "glass" ? 0.6 : 0))}" stroke="#DC2626" stroke-width=".35" stroke-dasharray="1.2 .9"/>`;
        s += it.obj === "glass" ? glassG(it.x, top, it.w, it.h * mm) : candleG(it.x, top, it.w, it.h * mm);
        s += `<rect x="${it.box}" y="${F - 8}" width="11" height="6.6" rx="1.3" fill="#FFFBEB" stroke="#F59E0B" stroke-width=".55"/><text x="${it.box + 13.2}" y="${F - 3}" class="p102-lb" font-size="4.2">সে.মি.</text>`;
      }
      return `<div class="p102-center"><svg width="${W}mm" height="${F + 3}mm" viewBox="0 0 ${W} ${F + 3}">${s}</svg></div>`;
    },
    /** A label card with a tab (p108, p111): { head, body }. */
    p102_unit: (b, ctx) => `<div class="p102-unit"><div class="p102-uh">${ctx.md(b.head)}</div><div class="p102-ub">${ctx.md(b.body)}</div></div>`,
    /** Numbered rules in a box (p109): items [[mark, text], …]. */
    p102_rules: (b, ctx) => `<div class="p102-rules">${b.items.map(([m, t]) => `<b>${ctx.esc(m)}</b><span>${ctx.md(t)}</span>`).join("")}</div>`,
    /** The gram weights in a grid (p112): items [{ v, top, label }]. */
    p102_wgrid: (b, ctx) => `<div class="p102-wgrid tone-${b.tone || "pink"}" style="grid-template-columns:repeat(${b.cols || 4}, 1fr)">${b.items.map((it) => `<figure>${weightSvg(it.v, it.top ?? ctx.bn(it.v))}<figcaption>${ctx.md(it.label ?? `${ctx.bn(it.v)} গ্রাম`)}</figcaption></figure>`).join("")}</div>`,
    /** One weight (left) made of smaller ones (right, one way per row): { left: { v, top, label, foot }, rows: [[v | { v, top, label }, …], …] }. */
    p102_wsplit: (b, ctx) => {
      const one = (x) => { const it = typeof x === "number" ? { v: x } : x; return `<figure>${weightSvg(it.v, it.top ?? ctx.bn(it.v))}<figcaption>${ctx.md(it.label ?? `${ctx.bn(it.v)} গ্রাম`)}</figcaption></figure>`; };
      return `<div class="p102-wsplit tone-${b.tone || "pink"}"><div class="p102-wl">${one(b.left)}${b.left.foot ? `<p>${ctx.md(b.left.foot)}</p>` : ""}<span class="p102-eq">=</span></div>
        <div class="p102-wr">${b.rows.map((r) => `<div>${r.map(one).join("")}</div>`).join("")}</div></div>`;
    },
    /** p113: an apple weighed on a balance (against 100 g) and on a digital scale (১০০ গ্রাম): the same both ways. */
    p102_scales: (b, ctx) => {
      const wt = (x, yb) => { const w = 12 + 3.2 * Math.log(20), t = w * 0.26 + 1.6, f = w * 0.3 + 2, ins = w * 0.09, X = x - w / 2, Y = yb - t - f;
        return `<g stroke="#7C2D12" stroke-width=".4" stroke-linejoin="round"><path d="M${f2(X + ins)} ${f2(Y)}H${f2(X + w - ins)}L${f2(X + w)} ${f2(Y + t)}H${f2(X)}Z" fill="#F6A770"/><rect x="${f2(X)}" y="${f2(Y + t)}" width="${f2(w)}" height="${f2(f)}" fill="#D9672E"/></g>
          <text x="${f2(x)}" y="${f2(Y + t * 0.52 + 1.4)}" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="3.9" fill="#fff">${ctx.bn(100)}</text>`; };
      const pan = (cx) => `<path d="M${cx} 15.5L${cx - 14} 45M${cx} 15.5L${cx + 14} 45" stroke="#64748B" stroke-width=".45"/><path d="M${cx - 16} 45H${cx + 16}Q${cx + 12} 52 ${cx} 52Q${cx - 12} 52 ${cx - 16} 45Z" fill="#CBD5E1" stroke="#475569" stroke-width=".6" stroke-linejoin="round"/>`;
      const balance = `<svg width="98mm" height="62mm" viewBox="0 0 98 62"><ellipse cx="49" cy="59.5" rx="22" ry="2" fill="#000" opacity=".08"/>
        <path d="M37 59H61L57 53H41Z" fill="#64748B" stroke="#334155" stroke-width=".5" stroke-linejoin="round"/><rect x="47.4" y="15" width="3.2" height="38.5" fill="#94A3B8" stroke="#334155" stroke-width=".5"/>
        ${pan(17)}${pan(81)}<rect x="13" y="12.8" width="72" height="3.4" rx="1.7" fill="#475569"/><path d="M49 13L47.4 5H50.6Z" fill="#DC2626"/><circle cx="49" cy="14.5" r="2.6" fill="#F59E0B" stroke="#92400E" stroke-width=".5"/>
        ${appleG(17, 38, 15)}${wt(81, 45.4)}</svg>`;
      const digital = `<svg width="62mm" height="46mm" viewBox="0 0 62 46"><ellipse cx="31" cy="43" rx="28" ry="2" fill="#000" opacity=".08"/>
        <path d="M5 25H57L60 41H2Z" fill="#E2E8F0" stroke="#475569" stroke-width=".6" stroke-linejoin="round"/><rect x="7" y="21.6" width="48" height="4" rx="1.4" fill="#CBD5E1" stroke="#475569" stroke-width=".6"/>
        <rect x="18" y="29" width="26" height="9" rx="1.2" fill="#1E293B"/><text x="28.6" y="36" text-anchor="middle" font-family="Baloo Da 2" font-weight="800" font-size="6.6" fill="#FDE047">${ctx.bn(100)}</text><text x="40.4" y="35.8" text-anchor="middle" font-family="Noto Sans Bengali" font-weight="600" font-size="2.5" fill="#FDE047">গ্রাম</text>
        <circle cx="49" cy="33.5" r="1.6" fill="#22C55E"/><circle cx="12.5" cy="33.5" r="1.6" fill="#EF4444"/>${appleG(31, 13.6, 16)}</svg>`;
      return `<div class="p102-row" style="justify-content:space-around;align-items:flex-end">${balance}${digital}</div>`;
    },
    /** p114's water pictures, drawn: scene ask | pour | mark | two. */
    p102_water: (b) => {
      let vw, vh, s = "";
      if (b.scene === "ask") { vw = 48; vh = 42; s = bottleG(12.5, 21.5, 14, 36, { wy: 10, vb: [vw, vh] }) + bottleG(35, 21, 22, 37, { wy: 10, vb: [vw, vh] }); }
      if (b.scene === "pour") { vw = 50; vh = 44; const m = mouth(15, 12, 26, 115);
        s = bottleG(38, 30, 15, 26, { wy: 33, cap: false, vb: [vw, vh] }) + stream(m, 38, 33) + bottleG(15, 12, 11, 26, { rot: 115, wy: 13, cap: false, vb: [vw, vh] })
          + `<circle cx="${f2(m[0] + 3)}" cy="${f2(m[1] + 3.2)}" r=".7" fill="#38BDF8"/><circle cx="${f2(m[0] + 5)}" cy="${f2(m[1] + 6)}" r=".55" fill="#38BDF8"/>`; }
      if (b.scene === "mark" || b.scene === "two") {
        // a small bottle pours into the first glass, a big one into the second; the bottles are tipped -118°, so the
        // mouth is 11.5 (small) or 13.2 (big) left of the bottle's centre: right above the glass
        const mark = b.scene === "mark", gw = 18, gt = 25, gh = 22, c1 = mark ? 17 : 12, c2 = mark ? 66 : 51, by = 14.5;
        vw = mark ? 97 : 83; vh = 48;
        const m1 = mouth(c1 + 11.5, by, 26, -118), m2 = mouth(c2 + 13.2, by, 30, -118);
        s = stream(m1, c1, gt + gh * 0.6) + glassG(c1 - gw / 2, gt, gw, gh, { level: 0.42, mark: mark ? 0.42 : null }) + bottleG(c1 + 11.5, by, 11, 26, { rot: -118, wy: by - 1, cap: false, vb: [vw, vh] })
          + stream(m2, c2, gt + gh * 0.32) + glassG(c2 - gw / 2, gt, gw, gh, { level: 0.72, mark: mark ? 0.42 : null }) + bottleG(c2 + 13.2, by, 15, 30, { rot: -118, wy: by - 1, cap: false, vb: [vw, vh] });
        if (mark) s += `<path d="M35 37h7.6v-2.6l5 4.1-5 4.1v-2.6H35Z" fill="#fff" stroke="${INK}" stroke-width=".5" stroke-linejoin="round"/>
          <g transform="translate(${f2(c1 - gw / 2 + 1.6)} ${f2(gt + gh * 0.58)}) rotate(-140)"><rect x="0" y="-1.1" width="11" height="2.2" rx=".8" fill="#DC2626" stroke="#7F1D1D" stroke-width=".3"/><rect x="7.4" y="-1.25" width="3.8" height="2.5" rx=".6" fill="#F8FAFC" stroke="#7F1D1D" stroke-width=".3"/><path d="M0 -1.1L-1.6 0L0 1.1Z" fill="#7F1D1D"/></g>`;
      }
      return `<svg class="p102-water" width="${b.w || vw}mm" height="${f2((b.w || vw) * vh / vw)}mm" viewBox="0 0 ${vw} ${vh}">${s}</svg>`;
    },
  },
  css: `
.p102-row { display: flex; flex-wrap: nowrap; align-items: flex-end }
.p102-fig { display: flex; flex-direction: column; align-items: center; gap: 1.2mm; margin: 0 } .p102-fig figcaption { font: 700 12pt/1.2 'Baloo Da 2'; color: ${INK}; text-align: center }
.p102-shape, .p102-obj, .p102-wt { display: block; overflow: visible }
.p102-center { display: flex; justify-content: center }
.p102-ext { grid-template-columns: 9.5mm 1fr; align-items: start }
.p102-mk { display: inline-flex; align-items: center; justify-content: center; width: 7mm; height: 7mm; margin-top: .9mm; color: #fff; font: 800 10pt/1 'Baloo Da 2' }
.p102-mk.sq { background: #84CC16; border-radius: 1.6mm; box-shadow: 0 .6mm 0 #4D7C0F }
.p102-mk.tri { background: linear-gradient(#F472B6, #DB2777); clip-path: polygon(50% 0, 100% 100%, 0 100%) } .p102-mk.tri b { margin-top: 2.4mm; font-size: 8.6pt }
.p102-say .sb { display: flex; flex-direction: column; gap: 1.6mm }
.p102-sm .fc { width: 14.5mm; height: 14.5mm } .p102-sm .sb { font-size: 11.5pt; line-height: 1.4; padding: 1.8mm 4mm 1.6mm }
.p102-grid td { vertical-align: bottom; padding: 2.4mm 2mm 1.8mm; background: #fff }
.p102-grid td > * { margin: 0 auto }
.p102-match { display: grid; grid-template-columns: 1fr 30mm 1fr; row-gap: 2.6mm }
.p102-ml, .p102-mr { position: relative; display: flex; align-items: center; height: 24mm; background: #fff; border: .6mm solid var(--c); border-radius: 3.4mm; box-shadow: 0 1mm 0 var(--s) }
.p102-ml { gap: 6mm; padding: 0 9mm 0 7mm } .p102-ml b { font: 800 15pt 'Baloo Da 2'; color: var(--d) } .p102-mr { justify-content: center }
.p102-dot { position: absolute; top: 50%; width: 3.6mm; height: 3.6mm; margin-top: -1.8mm; border-radius: 50%; background: var(--c); border: .6mm solid #fff; box-shadow: 0 0 0 .4mm var(--c) }
.p102-ml .p102-dot { right: -2.2mm } .p102-mr .p102-dot { left: -2.2mm }
.p102-design { display: block; border-radius: 2mm }
.p102-legend { display: flex; justify-content: center; gap: 9mm; font: 700 13pt 'Baloo Da 2' } .p102-legend span { display: inline-flex; align-items: flex-end; gap: 1.4mm }
.p102-dl { display: inline-block; width: 17mm; border-bottom: .7mm dotted ${INK}; margin-bottom: 1.6mm }
.p102-slots { display: grid; gap: 2.2mm; justify-content: center } .p102-slots i { border: .5mm dashed #F59E0B; border-radius: 2.4mm; background: #fff }
.p102-pencils { display: flex; align-self: center; border: .7mm solid var(--c); border-radius: 4mm; overflow: hidden; background: #fff; box-shadow: 0 1.2mm 0 var(--s) }
.p102-pencils > div { width: 42mm; display: flex; justify-content: center; padding: 3mm 0 2mm; background: linear-gradient(#fff, #FDF2F8) } .p102-pencils > div + div { border-left: .5mm solid var(--s) }
.p102-ruler { position: relative } .p102-ruler svg { display: block } .p102-ruler.has-co { padding-bottom: 10.5mm }
.p102-rn { font-family: 'Baloo Da 2'; font-weight: 700; fill: ${INK} } .p102-lb { font-family: 'Noto Sans Bengali'; font-weight: 600; fill: ${INK} }
.p102-callout { position: absolute; bottom: 0; white-space: nowrap; font: 700 12pt/1 'Baloo Da 2'; color: #9A3412; background: #FFFBEB; border: .6mm solid #F59E0B; border-radius: 2.4mm; padding: 1.6mm 3.4mm 1.2mm }
.p102-unit { position: relative; padding-top: 7.5mm; align-self: center; width: 100% }
.p102-uh { position: absolute; top: 0; left: 50%; transform: translateX(-50%); white-space: nowrap; background: #BAE6FD; border: .6mm solid #0284C7; border-radius: 4mm; padding: 2mm 5mm 1.6mm; font: 800 12.5pt 'Baloo Da 2'; color: #0C4A6E; box-shadow: 0 .8mm 0 #7DD3FC; z-index: 1 }
.p102-ub { background: #ECFCCB; border: .6mm solid #65A30D; border-radius: 5mm; padding: 10mm 4mm 4mm; text-align: center; font: 700 12.5pt/1.5 'Baloo Da 2'; color: #365314; box-shadow: 0 1mm 0 #BEF264 }
.p102-rules { display: grid; grid-template-columns: 8mm 1fr; row-gap: 1.2mm; background: #F0F9FF; border: .6mm solid #0EA5E9; border-left-width: 2mm; border-radius: 2mm 4mm 4mm 2mm; padding: 2.4mm 4mm 2.4mm 3mm; font: 500 12.5pt/1.45 'Noto Sans Bengali' }
.p102-rules b { font: 800 12.5pt/1.45 'Baloo Da 2'; color: #0369A1 }
.p102-wgrid { display: grid; border: .6mm solid var(--tc); border-radius: 3.4mm; overflow: hidden; background: #fff; box-shadow: 0 1.2mm 0 var(--tl) }
.p102-wgrid figure, .p102-wsplit figure { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 1mm; margin: 0 }
.p102-wgrid figure { padding: 2.6mm 1mm 2mm; border-right: .3mm solid var(--tl); border-bottom: .3mm solid var(--tl); background: linear-gradient(#fff 55%, var(--tb)) }
.p102-wgrid figcaption, .p102-wsplit figcaption { font: 700 11.5pt/1.2 'Baloo Da 2'; color: ${INK}; text-align: center; white-space: pre-line }
.p102-wsplit { display: grid; grid-template-columns: 38mm 1fr; border: .6mm solid var(--tc); border-radius: 3.4mm; background: #fff; box-shadow: 0 1.2mm 0 var(--tl) }
.p102-wl { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.6mm; padding: 3mm 2mm; background: var(--tb); border-right: .5mm solid var(--tc); border-radius: 3mm 0 0 3mm }
.p102-wl p { font: 800 13pt 'Baloo Da 2'; color: var(--tc) }
.p102-eq { position: absolute; right: -4.2mm; top: 50%; margin-top: -3.6mm; width: 7.4mm; height: 7.4mm; border-radius: 50%; background: var(--tc); color: #fff; font: 800 15pt/7.6mm 'Baloo Da 2'; text-align: center; z-index: 1 }
.p102-wr > div { display: flex; align-items: flex-end; justify-content: center; gap: 5mm; padding: 2.6mm 3mm 2mm } .p102-wr > div + div { border-top: .4mm dashed var(--tl) }
.p102-water { display: block }
`,
};
