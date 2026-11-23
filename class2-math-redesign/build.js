// প্রাথমিক গণিত, দ্বিতীয় শ্রেণি (NCTB, 2026 edition): eBidyaloy's colourful edition, page for page at the book's own size
// (550.8 × 719.4 pt = 194.3 × 253.8 mm), with the same printed page numbers, in the look of our English for Today
// redesign (~/Downloads/eft-class3-redesign). The words are the book's, from content/chN.js.
// - The counting pictures (blocks, sticks, flowers) are drawn here, so every count is exact.
// - Pictures of people and scenes: art/new/<name>.png (the user's, from ChatGPT); until then art/stand-in/<name>.png (cut
//   from the old book) with a small "stand-in" tag. Stickers (one rose, one bundle of sticks…) replace the drawn ones
//   when art/new/sticker-<name>.png exists.
// - QR codes: a page's QR opens its activity on /b/GDK2NH (the 107 imported activities, by their printed page).
// - The text check: tesseract (Bengali, .work/tessdata) reads the book's page; every word on our page must be found there.
// - Content: content/pNNN-NNN.js, each { pages: [...] } (see SPEC.md). A file's own kinds of content go in its
//   content/pNNN-NNN.parts.js ({ kinds: { name: (block, ctx, page) => html }, css }), used as { kind: "name", … }.
// Run: node build.js            → the whole book: class2-math-book.pdf (with the cover) + previews + the checks
//      node build.js 11-24 40   → only those printed pages: .work/out/class2-math-p11-40.pdf (quick checks)
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const HOME = process.env.HOME;
const puppeteer = require(path.join(HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const QR = require(path.join(HOME, "Downloads/Esho-Bhasha-Shikhi/node_modules/qrcode"));
const BOOK_PDF = path.join(__dirname, "source/class2-math-nctb.pdf"); // NCTB's book (a copy of ~/Downloads/Class-2, Math_compressed.pdf)
const FRONT = 9; // printed page 1 is the PDF's page 10
const ACTS = require(path.join(__dirname, "..", "class2-math-activities/ACTIVITIES-bn.json"));
const BOOK_LINK = "https://ebidyaloy.com/b/GDK2NH";
const W = 194.3, H = 253.8;

// the chapters: [number, first printed page, name, ordinal]
const CHAPTER_LIST = [[1, 1, "সংখ্যা ও স্থানীয় মান", "প্রথম"], [2, 40, "যোগ ও বিয়োগ", "দ্বিতীয়"], [3, 73, "গুণ", "তৃতীয়"], [4, 102, "জ্যামিতিক আকৃতি ও প্যাটার্ন", "চতুর্থ"],
  [5, 107, "পরিমাপ", "পঞ্চম"], [6, 121, "মুদ্রা", "ষষ্ঠ"], [7, 125, "উপাত্ত", "সপ্তম"]];
const chapterOf = (n) => { const c = CHAPTER_LIST.filter((x) => n >= x[1]).pop(); return { chapter: c[0], name: c[2], ordinal: c[3] }; };
const OUT = path.join(__dirname, ".work/out");
const CONTENT = path.join(__dirname, "content");
const FILES = fs.readdirSync(CONTENT).filter((f) => f.endsWith(".js") && !f.endsWith(".parts.js")).sort();
const ALL = [], SEEN = {};
for (const f of FILES) for (const pg of require(path.join(CONTENT, f)).pages) {
  if (SEEN[pg.page]) throw new Error(`p${pg.page} is in both ${SEEN[pg.page]} and ${f}`);
  SEEN[pg.page] = f; ALL.push({ ...pg, file: f });
}
ALL.sort((a, b) => a.page - b.page);
const ARGS = process.argv.slice(2).filter((a) => !a.startsWith("--")), WHOLE = !ARGS.length;
const wanted = (n) => WHOLE || ARGS.some((a) => { const [x, y] = a.split("-").map(Number); return y ? n >= x && n <= y : n === x; });
fs.mkdirSync(OUT, { recursive: true });

// a colour per chapter: [main, soft, dark]
const COLORS = { 1: ["#2563EB", "#DBEAFE", "#1E40AF"], 2: ["#16A34A", "#DCFCE7", "#166534"], 3: ["#9333EA", "#F3E8FF", "#6B21A8"], 4: ["#EA580C", "#FFEDD5", "#9A3412"],
  5: ["#DB2777", "#FCE7F3", "#9D174D"], 6: ["#0D9488", "#CCFBF1", "#115E59"], 7: ["#DC2626", "#FEE2E2", "#991B1B"] };
// the two children who talk through the book: the boy's lines are blue, the girl's pink (as the book's bubbles)
const WHO = { boy: "#2563EB", girl: "#DB2777" };
const INK = "#1E2433";
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const bn = (n) => String(n).replace(/\d/g, (d) => BN_DIGITS[d]);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const br = (s) => esc(s).replace(/\n/g, "<br>");

// ── QR codes ──
function qrSvg(text) {
  const m = QR.create(text, { errorCorrectionLevel: "M" }).modules, n = m.size;
  let d = "";
  for (let y = 0; y < n; y++) for (let x = 0; x < n; ) { if (!m.get(y, x)) { x++; continue; } let e = x; while (e < n && m.get(y, e)) e++; d += `M${x} ${y}h${e - x}v1h-${e - x}z`; x = e; }
  return `<svg viewBox="-1 -1 ${n + 2} ${n + 2}" shape-rendering="crispEdges"><rect x="-1" y="-1" width="${n + 2}" height="${n + 2}" fill="#fff"/><path d="${d}" fill="#111827"/></svg>`;
}
const ACT_BY_PAGE = {};
for (const a of ACTS.activities) (ACT_BY_PAGE[a.page] = ACT_BY_PAGE[a.page] || []).push(a);
const qrChip = (code, big = true) => `<a class="qr${big ? "" : " small"}" href="https://ebidyaloy.com/a/${code}"><span class="qrc">${qrSvg(`https://ebidyaloy.com/a/${code}`)}</span>
  ${big ? `<span class="qrt"><b>স্ক্যান করো!</b><span>খেলি ও শিখি</span><small>${code}</small></span>` : ""}</a>`;

// ── pictures ──
const ART = path.join(__dirname, "art");
function picFile(name) {
  for (const [dir, old] of [["ready", false], ["new", false], ["stand-in", true]]) for (const ext of ["png", "jpg", "webp"]) {
    const f = path.join(ART, dir, `${name}.${ext}`);
    if (fs.existsSync(f)) return { file: f, old };
  }
  return null;
}
// a sticker made ready by prep-art.js (its white background cleared)
const sticker = (name) => { for (const d of ["ready", "new"]) { const f = path.join(ART, d, `sticker-${name}.png`); if (fs.existsSync(f)) return "file://" + f; } return null; };

// ── the base-ten blocks, drawn (front, top and side faces, so they look solid) ──
const BLOCK = {
  blue: { f: "#7CCBF2", t: "#C3E9FB", s: "#3BA9DD", k: "#1F5F8B" },
  yellow: { f: "#FDE047", t: "#FEF3A0", s: "#E5B80B", k: "#8A6408" },
  pink: { f: "#F9A8D4", t: "#FCD7EA", s: "#E7509A", k: "#9D174D" },
  green: { f: "#86EFAC", t: "#C8F7D8", s: "#34C26B", k: "#166534" },
};
function cube(x, y, s, c) {
  const dx = s * 0.36, dy = s * 0.36;
  return `<path d="M${x} ${y}l${dx} ${-dy}h${s}l${-dx} ${dy}z" fill="${c.t}" stroke="${c.k}" stroke-width="${s * 0.07}" stroke-linejoin="round"/>
    <path d="M${x + s} ${y}l${dx} ${-dy}v${s}l${-dx} ${dy}z" fill="${c.s}" stroke="${c.k}" stroke-width="${s * 0.07}" stroke-linejoin="round"/>
    <rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${c.f}" stroke="${c.k}" stroke-width="${s * 0.07}"/>`;
}
function rod(x, y, s, c) { // ten cubes standing; (x, y) = the front's top-left
  const dx = s * 0.36, dy = s * 0.36, sw = s * 0.07;
  let lines = "";
  for (let i = 1; i < 10; i++) lines += `<path d="M${x} ${y + i * s}h${s}l${dx} ${-dy}" fill="none" stroke="${c.k}" stroke-width="${sw}"/>`;
  return `<path d="M${x} ${y}l${dx} ${-dy}h${s}l${-dx} ${dy}z" fill="${c.t}" stroke="${c.k}" stroke-width="${sw}" stroke-linejoin="round"/>
    <path d="M${x + s} ${y}l${dx} ${-dy}v${10 * s}l${-dx} ${dy}z" fill="${c.s}" stroke="${c.k}" stroke-width="${sw}" stroke-linejoin="round"/>
    <rect x="${x}" y="${y}" width="${s}" height="${10 * s}" fill="${c.f}" stroke="${c.k}" stroke-width="${sw}"/>${lines}`;
}
function flat(x, y, s, c) { // a hundred: 10 × 10 cubes, a thin slab
  const dx = s * 0.5, dy = s * 0.5, sw = s * 0.06;
  let g = "";
  for (let i = 1; i < 10; i++) g += `<path d="M${x + i * s} ${y}v${10 * s}M${x} ${y + i * s}h${10 * s}" stroke="${c.k}" stroke-width="${sw}"/>`;
  let top = "", side = "";
  for (let i = 1; i < 10; i++) { top += `<path d="M${x + i * s} ${y}l${dx} ${-dy}" stroke="${c.k}" stroke-width="${sw}"/>`; side += `<path d="M${x + 10 * s} ${y + i * s}l${dx} ${-dy}" stroke="${c.k}" stroke-width="${sw}"/>`; }
  return `<path d="M${x} ${y}l${dx} ${-dy}h${10 * s}l${-dx} ${dy}z" fill="${c.t}" stroke="${c.k}" stroke-width="${sw}" stroke-linejoin="round"/>${top}
    <path d="M${x + 10 * s} ${y}l${dx} ${-dy}v${10 * s}l${-dx} ${dy}z" fill="${c.s}" stroke="${c.k}" stroke-width="${sw}" stroke-linejoin="round"/>${side}
    <rect x="${x}" y="${y}" width="${10 * s}" height="${10 * s}" fill="${c.f}" stroke="${c.k}" stroke-width="${sw}"/>${g}`;
}
/** Tens rods side by side and the ones beside them in a column (or in a row under them), bottom-aligned. Units: mm. */
function blocksSvg({ tens = 0, ones = 0, s = 4, color = "blue", onesColor, onesBelow = false, onesRow = false, gap }) {
  const c = BLOCK[color], co = BLOCK[onesColor || color], dx = s * 0.36, g = gap ?? s * 0.55;
  const rodsW = tens ? tens * s + (tens - 1) * g + dx : 0;
  let out = "", w, h;
  if (onesBelow) { // the rods in a row, the ones under them, from the left
    const top = dx + 0.3;
    for (let i = 0; i < tens; i++) out += rod(i * (s + g), top, s, c);
    const oy = top + 10 * s + s * 0.9 + dx;
    for (let i = 0; i < ones; i++) out += cube(i * (s * 1.25), oy, s, co);
    w = Math.max(rodsW, ones * s * 1.25 + dx); h = oy + s + 0.4;
  } else if (onesRow) { // the ones in a row on the floor beside the rods
    const top = dx + 0.3, floor = top + 10 * s;
    for (let i = 0; i < tens; i++) out += rod(i * (s + g), top, s, c);
    const ox = tens ? rodsW + g * 1.6 : 0;
    for (let i = 0; i < ones; i++) out += cube(ox + i * (s * 1.3), floor - s, s, co);
    w = ox + (ones ? ones * s * 1.3 + dx : 0); h = floor + 0.4;
  } else { // the ones stacked in a column beside the rods (as the book's tables)
    const top = dx + 0.3, floor = top + 10 * s;
    for (let i = 0; i < tens; i++) out += rod(i * (s + g), top, s, c);
    const ox = tens ? rodsW + g * 0.4 : 0;
    for (let i = 0; i < ones; i++) out += cube(ox, floor - (i + 1) * s, s, co);
    w = ox + (ones ? s + dx : 0); h = floor + 0.4;
  }
  return `<svg class="blocks" width="${w.toFixed(2)}mm" height="${h.toFixed(2)}mm" viewBox="-0.3 -0.3 ${(w + 0.6).toFixed(2)} ${(h + 0.6).toFixed(2)}">${out}</svg>`;
}
function flatsSvg(n, s, color = "blue") {
  const c = BLOCK[color], g = s * 1.6, d = s * 0.5;
  let out = "";
  for (let i = 0; i < n; i++) out += flat(i * (10 * s + g), d + 0.3, s, c);
  const w = n * 10 * s + (n - 1) * g + d, h = d + 10 * s + 0.6;
  return `<svg class="blocks" width="${w.toFixed(2)}mm" height="${h.toFixed(2)}mm" viewBox="-0.3 -0.3 ${(w + 0.6).toFixed(2)} ${(h + 0.6).toFixed(2)}">${out}</svg>`;
}

// ── drawn counting objects (until the sticker is there) ──
const ROSE = `<g><path d="M0 9 C -1 14, 1 19, 0 24" stroke="#3F8F3A" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M0 17 C -5 14, -8 16, -9 19 C -5 20, -2 19, 0 17Z" fill="#4CAF50"/><path d="M0 15 C 5 12, 8 14, 9 17 C 5 18, 2 17, 0 15Z" fill="#43A047"/>
  <circle r="8.6" fill="#D61F3C"/><path d="M-6 -2 C -6 -8, 6 -8, 6 -2 C 6 4, -6 4, -6 -2Z" fill="#E8344F"/>
  <path d="M-3.4 -2.4 C -3 -6, 3.4 -6, 3.4 -2 C 2.6 1.4, -2.6 1.4, -3.4 -2.4Z" fill="#B3122C"/><path d="M-1.6 -2.6 C -1 -4.4, 1.6 -4, 1.4 -2.2" stroke="#7A0A1D" stroke-width=".9" fill="none" stroke-linecap="round"/>
  <path d="M-8.4 1 C -6 6, 6 6, 8.4 1" stroke="#B3122C" stroke-width="1" fill="none"/><circle cx="-3" cy="-5" r="1.3" fill="#fff" opacity=".45"/></g>`;
function bundleSvg() { // ten sticks tied together, tilted
  let st = "";
  for (let i = 0; i < 10; i++) { const x = -6.5 + (i % 5) * 3.2 + (i >= 5 ? 1.6 : 0), y = i >= 5 ? 1.2 : -1.2; st += `<rect x="${x - 1.15}" y="${y - 17}" width="2.3" height="34" rx="1.15" fill="${i % 2 ? "#E7A86B" : "#D9925A"}" stroke="#9A5A2A" stroke-width=".45"/><ellipse cx="${x}" cy="${y - 17}" rx="1.15" ry=".7" fill="#F3C894" stroke="#9A5A2A" stroke-width=".35"/>`; }
  return `<g transform="rotate(28)">${st}<rect x="-9.2" y="-5" width="18.4" height="3.2" rx="1.2" fill="#F5F0E6" stroke="#9C8B6A" stroke-width=".5"/><rect x="-9.2" y="4" width="18.4" height="3.2" rx="1.2" fill="#F5F0E6" stroke="#9C8B6A" stroke-width=".5"/></g>`;
}
const STICK = `<g transform="rotate(38)"><rect x="-1.2" y="-17" width="2.4" height="34" rx="1.2" fill="#E7A86B" stroke="#9A5A2A" stroke-width=".5"/><ellipse cx="0" cy="-17" rx="1.2" ry=".7" fill="#F3C894" stroke="#9A5A2A" stroke-width=".35"/></g>`;

/** A seeded random number generator (the same picture on every build). */
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
/** `total` flowers scattered in a frame, `ring` of them circled with a dotted line (one group of ten). */
function rosesSvg({ total, ring }, wmm, hmm) {
  const VW = 400, VH = Math.round(400 * hmm / wmm), R = 13, rnd = rng(54), pts = [];
  // the ringed group: low in the middle
  const cx = VW * 0.47, cy = VH * 0.66;
  const far = (x, y, d) => pts.every((p) => Math.hypot(p[0] - x, p[1] - y) > d);
  let tries = 0;
  while (pts.length < ring && tries++ < 20000) { const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * 46; const x = cx + Math.cos(a) * r * 1.35, y = cy + Math.sin(a) * r; if (far(x, y, R * 1.55)) pts.push([x, y, 1]); }
  // a smooth loop around them
  const hull = [];
  for (let k = 0; k < 24; k++) { const a = (k / 24) * Math.PI * 2; let best = 0; for (const p of pts) best = Math.max(best, (p[0] - cx) * Math.cos(a) + (p[1] - cy) * Math.sin(a)); const d = best + R + 8; hull.push([cx + Math.cos(a) * d, cy + Math.sin(a) * d]); }
  const loop = hull.map((p, i) => { const n = hull[(i + 1) % hull.length], m = [(p[0] + n[0]) / 2, (p[1] + n[1]) / 2]; return `${i ? "" : `M${m[0].toFixed(1)} ${m[1].toFixed(1)}`}Q${n[0].toFixed(1)} ${n[1].toFixed(1)} ${((n[0] + hull[(i + 2) % hull.length][0]) / 2).toFixed(1)} ${((n[1] + hull[(i + 2) % hull.length][1]) / 2).toFixed(1)}`; }).join("");
  const inLoop = (x, y) => Math.hypot((x - cx) / 1.35, y - cy) < 40 + R * 2.4;
  tries = 0;
  while (pts.length < total && tries++ < 200000) { const x = R + 4 + rnd() * (VW - 2 * R - 8), y = R + 2 + rnd() * (VH - 2 * R - 20); if (!inLoop(x, y) && far(x, y, R * 1.7)) pts.push([x, y, 0]); }
  if (pts.length !== total) throw new Error(`roses: placed ${pts.length} of ${total}`);
  const img = sticker("rose");
  const one = (x, y) => img ? `<image href="${img}" x="${x - 10}" y="${y - 11}" width="20" height="22.5" preserveAspectRatio="xMidYMid meet"/>` : `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(.86)">${ROSE}</g>`;
  return `<svg viewBox="0 0 ${VW} ${VH}" width="100%" style="display:block">${pts.map(([x, y]) => one(x, y)).join("")}
    <path d="${loop}Z" fill="none" stroke="#1E2433" stroke-width="2" stroke-dasharray="3 4" stroke-linecap="round"/></svg>`;
}
function sticksSvg({ bundles, singles, perRow }) {
  const cw = 40, ch = 46, rows = Math.ceil((bundles + singles) / perRow), VW = perRow * cw, VH = rows * ch;
  const bImg = sticker("stick-bundle"), sImg = sticker("stick");
  let out = "";
  for (let i = 0; i < bundles + singles; i++) {
    const x = (i % perRow) * cw + cw / 2, y = Math.floor(i / perRow) * ch + ch / 2, isB = i < bundles;
    out += (isB ? bImg : sImg) ? `<image href="${isB ? bImg : sImg}" x="${x - 19}" y="${y - 22}" width="38" height="44"/>` : `<g transform="translate(${x} ${y})">${isB ? bundleSvg() : STICK}</g>`;
  }
  return `<svg viewBox="0 0 ${VW} ${VH}" width="100%" style="display:block">${out}</svg>`;
}

// ── text markup (SPEC.md): □ an empty answer box, [[৩৭]] a filled one, ___ a writing line, **bold**, a new line ──
function md(s) {
  return esc(s).replace(/\[\[(.*?)\]\]/g, (m, x) => `<span class="ansbox">${x}</span>`).replace(/□/g, `<span class="abox"></span>`)
    .replace(/_{3,}/g, (m) => `<span class="wline" style="width:${Math.min(70, 4 + m.length * 2)}mm"></span>`).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
}
/** A picture: the user's (art/ready, art/new), else the old book's (art/stand-in, tagged), else a placeholder naming the file. */
function picHtml({ pic, h = 50, w, cap, fit = "contain", pos, frame }) {
  const f = picFile(pic);
  const inner = f ? `<img src="file://${f.file}" style="object-fit:${fit};${pos ? `object-position:${pos}` : ""}">${f.old ? `<span class="tag">stand-in</span>` : ""}` : `<div class="ph">ChatGPT: ${esc(pic)}.png</div>`;
  return `<figure class="pic${frame ? " framed" : ""}" style="height:${h}mm;${w ? `width:${w}mm;` : ""}">${inner}${cap ? `<figcaption>${md(cap)}</figcaption>` : ""}</figure>`;
}
/** A free picture placed on the page (pg.art): { pic, x, y, w, h } in mm from the page's top-left, behind nothing. */
function decoHtml({ pic, x, y, w, h }) { const f = picFile(pic); return f ? `<img class="deco" src="file://${f.file}" style="left:${x}mm;top:${y}mm;width:${w}mm;height:${h}mm">` : ""; }
/** n of one object (a ChatGPT sticker, else an emoji): in a grid, in groups (on plates), some crossed out. */
function objsHtml({ sticker: name, emoji = "●", n = 0, perRow = 10, size = 9, groups, cross = 0, plate = false, gap = 1.4, align = "center" }) {
  const img = name && sticker(name);
  const one = (crossed) => `<span class="ob${crossed ? " x" : ""}" style="width:${size}mm;height:${size}mm">${img ? `<img src="${img}">` : `<i class="em" style="font-size:${(size * 2.25).toFixed(1)}pt">${emoji}</i>`}</span>`;
  if (groups) return `<div class="objs groups" style="justify-content:${align}">${groups.map((g) => `<span class="grp${plate ? " plate" : ""}" style="gap:${gap}mm">${Array.from({ length: g }, () => one(false)).join("")}</span>`).join("")}</div>`;
  return `<div class="objs" style="grid-template-columns:repeat(${Math.max(1, Math.min(perRow, n))}, ${size}mm);gap:${gap}mm;justify-content:${align}">${Array.from({ length: n }, (_, i) => one(i >= n - cross)).join("")}</div>`;
}
/** Sums in a row or grid: { sums: ["২৪ + ১৩ = □", …], cols, marks: true for (১) (২) … } */
function sumsHtml({ sums, cols = 3, marks = false, start = 1, size }) {
  return `<div class="sums" style="grid-template-columns:repeat(${cols}, 1fr)${size ? `;font-size:${size}pt` : ""}">${sums.map((x, i) => `<span class="sm">${marks ? `<b class="smk">(${bn(start + i)})</b>` : ""}${md(x)}</span>`).join("")}</div>`;
}
/** Sums written in columns: each { rows: ["২৪", "+১৩"], ans: "□□" | "৩৭", carry: "১ " }, heads: ["দশক", "একক"] over the digits. */
function colsumHtml({ items, heads, cols = 4, size = 15 }) {
  const one = ({ rows, ans = "", carry }) => {
    const parsed = rows.map((r) => { const m = r.trim().match(/^([+\-−×÷]?)\s*(.*)$/); return { op: m[1] === "-" ? "−" : m[1], d: [...m[2].replace(/\s+/g, "")] }; });
    const width = Math.max(...parsed.map((p) => p.d.length), [...ans].length, heads ? heads.length : 0, carry ? carry.length : 0);
    const pad = (arr) => Array(width - arr.length).fill("").concat(arr);
    const cells = (arr, cls = "") => pad(arr).map((d) => `<td class="${cls}">${d === "□" ? `<span class="abox"></span>` : esc(d)}</td>`).join("");
    return `<table class="colsum" style="font-size:${size}pt">${heads ? `<tr class="hd"><td></td>${pad(heads).map((h) => h ? `<td class="h">${esc(h)}</td>` : "<td></td>").join("")}</tr>` : ""}
      ${carry ? `<tr class="cy"><td></td>${cells([...carry].map((c) => c === " " ? "" : c))}</tr>` : ""}
      ${parsed.map((p, i) => `<tr${i === parsed.length - 1 ? ` class="last"` : ""}><td class="op">${esc(p.op)}</td>${cells(p.d)}</tr>`).join("")}
      <tr class="an"><td></td>${cells([...ans])}</tr></table>`;
  };
  return `<div class="colsums" style="grid-template-columns:repeat(${cols}, auto)">${items.map(one).join("")}</div>`;
}
/** A dot array (rows × cols); show: [r, c] lays the book's L-shaped paper over the rest, so only r × c dots are seen. */
function dotsHtml({ rows = 10, cols = 10, show, size = 4.2, color = "#1E2433", mark }) {
  const sp = size, R = sp * 0.34, w = cols * sp, h = rows * sp;
  let d = "";
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) d += `<circle cx="${(c + .5) * sp}" cy="${(r + .5) * sp}" r="${R}" fill="${mark && r < mark[0] && c < mark[1] ? mark[2] || "#E11D48" : color}"/>`;
  const paper = show ? `<path d="M${show[1] * sp} 0H${w + 1.5}V${h + 1.5}H0V${show[0] * sp}H${show[1] * sp}Z" fill="#FFFBEB" fill-opacity=".96" stroke="#D97706" stroke-width=".35"/>` : "";
  return `<svg class="dots" width="${w + 2}mm" height="${h + 2}mm" viewBox="-.5 -.5 ${w + 2} ${h + 2}"><rect x="-.4" y="-.4" width="${w + .8}" height="${h + .8}" rx="1" fill="#fff" stroke="#CBD5E1" stroke-width=".3"/>${d}${paper}</svg>`;
}
/** A number chart: from start, cols per row; mark { n: colour }, blank [n…] (left empty to fill), ring [n…]. */
function chartHtml({ start = 1, end = 100, cols = 10, mark = {}, blank = [], ring = [], size = 8.6 }) {
  let rows = "", n = start;
  while (n <= end) { rows += "<tr>"; for (let c = 0; c < cols && n <= end; c++, n++) rows += `<td style="width:${size}mm;height:${size * .78}mm;${mark[n] ? `background:${mark[n]};` : ""}"${ring.includes(n) ? ` class="ring"` : ""}>${blank.includes(n) ? "" : bn(n)}</td>`; rows += "</tr>"; }
  return `<table class="chart">${rows}</table>`;
}
/** A clock: { h, m } (an analog face with the book's English digits; bangla: true for Bangla ones) or { digital: "১১:১৫" }. */
function clockHtml({ h = 12, m = 0, size = 30, digital, bangla = false }) {
  if (digital) return `<span class="lcd">${esc(digital)}</span>`;
  const ang = (a, len, wdt, col) => { const r = (a - 90) * Math.PI / 180; return `<line x1="50" y1="50" x2="${(50 + Math.cos(r) * len).toFixed(2)}" y2="${(50 + Math.sin(r) * len).toFixed(2)}" stroke="${col}" stroke-width="${wdt}" stroke-linecap="round"/>`; };
  let ticks = "", nums = "";
  for (let i = 0; i < 60; i++) { const r = i * 6 * Math.PI / 180; ticks += `<line x1="${50 + Math.sin(r) * 44}" y1="${50 - Math.cos(r) * 44}" x2="${50 + Math.sin(r) * (i % 5 ? 42 : 39.5)}" y2="${50 - Math.cos(r) * (i % 5 ? 42 : 39.5)}" stroke="#334155" stroke-width="${i % 5 ? .6 : 1.4}"/>`; }
  for (let i = 1; i <= 12; i++) { const r = i * 30 * Math.PI / 180; nums += `<text x="${50 + Math.sin(r) * 31}" y="${50 - Math.cos(r) * 31 + 3.6}" text-anchor="middle" font-family="Baloo Da 2" font-weight="700" font-size="${i > 9 ? 9.5 : 10.5}" fill="#1E2433">${bangla ? bn(i) : i}</text>`; }
  return `<svg class="clock" width="${size}mm" height="${size}mm" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#FEF3C7" stroke="#D97706" stroke-width="3.5"/><circle cx="50" cy="50" r="45" fill="#fff"/>${ticks}${nums}
    ${ang((h % 12) * 30 + m * 0.5, 22, 4.4, "#1E3A8A")}${ang(m * 6, 34, 2.8, "#DC2626")}<circle cx="50" cy="50" r="3.2" fill="#1E2433"/></svg>`;
}
/** Bangladeshi money, drawn: { money: [{ v: 10 }, { v: 2, coin: true }…], size } (the value in Bangla digits). */
const NOTE = { 1: ["#FDE68A", "#854D0E"], 2: ["#86EFAC", "#15803D"], 5: ["#FDBA74", "#9A3412"], 10: ["#F9A8D4", "#9D174D"], 20: ["#BBF7D0", "#166534"], 50: ["#FED7AA", "#9A3412"], 100: ["#93C5FD", "#1E3A8A"], 200: ["#A7F3D0", "#065F46"], 500: ["#C4B5FD", "#4C1D95"], 1000: ["#DDD6FE", "#5B21B6"] };
function moneyHtml({ money, size = 1, label = true }) {
  const tk = label ? "<small>টাকা</small>" : "";
  return `<div class="money">${money.map(({ v, coin }) => coin
    ? `<span class="coin" style="width:${15 * size}mm;height:${15 * size}mm;font-size:${14 * size}pt">${bn(v)}${tk}</span>`
    : `<span class="bnote" style="--n:${(NOTE[v] || NOTE[10])[0]};--k:${(NOTE[v] || NOTE[10])[1]};width:${36 * size}mm;height:${17 * size}mm;font-size:${15 * size}pt"><b>${bn(v)}</b>${tk}<i></i></span>`).join("")}</div>`;
}

// ── the kinds of content ──
function tableHtml({ head, rows, tone = "blue", small, width, left }) {
  const cell = (c) => c === "…" ? `<td class="gap"><i></i></td>` : `<td>${md(c)}</td>`;
  return `<table class="grid tone-${tone}${small ? " small" : ""}${left ? " left" : ""}"${width ? ` style="width:${width}mm;margin:0 auto"` : ""}>${head ? `<thead><tr>${head.map((h) => h === "…" ? `<th class="gap"><i></i></th>` : `<th>${md(h)}</th>`).join("")}</tr></thead>` : ""}
    <tbody>${rows.map((r) => `<tr>${r.map(cell).join("")}</tr>`).join("")}</tbody></table>`;
}
function numtableHtml(rows, page) {
  const rowH = rows.length <= 2 ? 38 : rows.length <= 4 ? 37 : 30.5; // mm
  const s = Math.min(3.1, (rowH - 6) / 10.5);
  return `<table class="numt"><thead><tr><th>গণনা করি</th><th>পড়ি (অঙ্কে)</th><th>পড়ি (কথায়)</th><th>কথায় লিখি</th></tr></thead><tbody>
    ${rows.map(([n, w, written]) => `<tr style="height:${rowH}mm"><td class="bk">${blocksSvg({ tens: Math.floor(n / 10), ones: n % 10, s, color: "blue" })}</td>
      <td class="num">${bn(n)}</td><td class="word">${esc(w)}</td><td class="write">${written ? `<span class="hand">${esc(written)}</span>` : ""}<i class="wl"></i></td></tr>`).join("")}
  </tbody></table>`;
}
function words100Html(words) {
  let rows = "";
  for (let r = 0; r < 10; r++) {
    rows += "<tr>";
    for (let c = 0; c < 5; c++) { const n = 51 + c * 10 + r; rows += `<td class="n">${bn(n)}</td><td class="w">${esc(words[n - 51])}</td>`; }
    rows += "</tr>";
  }
  return `<table class="w100">${rows}</table>`;
}
function sayHtml(who, text, mood = "talk") {
  const pic = picFile(`face-${who}-${mood}`) || picFile(`face-${who}`);
  const face = pic ? `<img class="fc" src="file://${pic.file}">` : `<span class="fc"></span>`;
  return `<div class="say ${who}" style="--w:${WHO[who]}">${who === "girl" ? "" : `<span class="av">${face}</span>`}<div class="sb">${md(text)}</div>${who === "girl" ? `<span class="av">${face}</span>` : ""}</div>`;
}
function pvHtml({ h, t, o, tone, rod: rc, labels, heads, digits, answer }) {
  const s = 2.65;
  const pics = `<tr class="pics"><td class="h">${flatsSvg(h, s * 0.86, "blue")}</td><td class="t">${blocksSvg({ tens: t, s: s * 0.95, color: rc, gap: s * 0.5 })}</td><td class="o">${blocksSvg({ ones: o, s: s * 0.95, color: "yellow", onesRow: true })}</td></tr>`;
  const lab = labels ? `<tr class="lab">${labels.map((l) => `<td>${br(l)}</td>`).join("")}</tr>` : "";
  const hd = heads ? `<tr class="hd">${heads.map((l) => `<td>${esc(l)}</td>`).join("")}</tr>` : "";
  const dg = digits ? `<tr class="dg">${digits.map((d) => `<td>${d ? esc(d) : `<i class="wl"></i>`}</td>`).join("")}</tr>` : "";
  const ans = answer ? `<tr class="ans"><td colspan="3">${esc(answer)} <i class="wl long"></i></td></tr>` : "";
  return `<table class="pv tone-${tone}">${pics}${lab}${hd}${dg}${ans}</table>`;
}
const KINDS = {}; let PART_CSS = "";
const CTX = () => ({ esc, br, md, bn, blockHtml, blocksSvg, flatsSvg, cube, rod, flat, BLOCK, tableHtml, picHtml, objsHtml, sumsHtml, colsumHtml, dotsHtml, chartHtml, clockHtml, moneyHtml, picFile, sticker, rng, qrSvg, COLORS, WHO });
function blockHtml(b, page) {
  if (typeof b === "string") return `<p class="tx">${md(b)}</p>`;
  if (!b || typeof b !== "object") throw new Error(`p${page}: a block must be an object: ${JSON.stringify(b)}`);
  if (b.kind) { if (!KINDS[b.kind]) throw new Error(`p${page}: no kind "${b.kind}" (its parts file?)`); return KINDS[b.kind](b, CTX(), page); }
  if (b.ask) return `<div class="ask"><span class="qm">?</span><span class="at">${md(b.ask)}</span></div>`;
  if (b.numtable) return numtableHtml(b.numtable, page);
  if (b.words100) return words100Html(b.words100);
  if (b.practise) return `<div class="practise"><span class="rib">✏️ ${esc(b.practise)}</span></div>`;
  if (b.ex != null) return `<div class="ex">${b.text != null ? `<div class="ext"><span class="mk">${esc(b.ex)}${b.dot === false ? "" : "."}</span><span>${md(b.text)}</span></div>` : ""}${(b.body || []).map((x) => blockHtml(x, page)).join("")}</div>`;
  if (b.nums) return `<div class="nums">${b.nums.map((n) => `<span>${esc(n)}</span>`).join("")}</div>`;
  if (b.table) return tableHtml(b.table);
  if (b.roses) return `<div class="frame">${rosesSvg(b.roses, 166, b.roses.h || 74)}</div>`;
  if (b.blocks) { const svg = blocksSvg({ ...b.blocks, onesRow: !b.blocks.onesBelow }); return b.blocks.frame ? `<div class="frame fit">${svg}</div>` : `<div class="bfree">${svg}</div>`; }
  if (b.sticks) return `<div class="frame sticks">${sticksSvg(b.sticks)}</div>`;
  if (b.say) return sayHtml(b.say, b.text, b.mood);
  if (b.note) return `<div class="note">${md(b.note)}</div>`;
  if (b.pv) return pvHtml(b.pv);
  if (b.sub) return `<div class="sub"><i></i>${md(b.sub)}</div>`;
  if (b.pic) return picHtml(b);
  if (b.row) return `<div class="lrow" style="gap:${b.gap ?? 4}mm;align-items:${b.align || "center"};justify-content:${b.justify || "space-between"}">${b.row.map((x, i) => `<div class="lcell" style="${b.w && b.w[i] ? `flex:0 0 ${b.w[i]}mm;width:${b.w[i]}mm` : "flex:1 1 0"}">${blockHtml(x, page)}</div>`).join("")}</div>`;
  if (b.col) return `<div class="lcol" style="gap:${b.gap ?? 2}mm">${b.col.map((x) => blockHtml(x, page)).join("")}</div>`;
  if (b.frame) return `<div class="frame${b.tone ? " tone-" + b.tone + " toned" : ""}" style="${b.pad != null ? `padding:${b.pad}mm` : ""}">${b.frame.map((x) => blockHtml(x, page)).join("")}</div>`;
  if (b.objs) return objsHtml(b.objs);
  if (b.sums) return sumsHtml(b);
  if (b.colsum) return colsumHtml(b.colsum);
  if (b.dots) return `<div class="lcenter">${dotsHtml(b.dots)}</div>`;
  if (b.chart) return chartHtml(b.chart);
  if (b.clock) return clockHtml(b.clock);
  if (b.money) return moneyHtml(b);
  if (b.flats) return `<div class="lcenter">${flatsSvg(b.flats.n, b.flats.s || 3, b.flats.color)}</div>`;
  if (b.gap != null) return `<div style="height:${b.gap}mm;flex:none"></div>`;
  if (b.text != null) return `<p class="tx${b.big ? " big" : ""}${b.center ? " center" : ""}">${md(b.text)}${b.box ? ` <span class="ansbox">${esc(b.box)}</span>` : ""}</p>`;
  throw new Error(`p${page}: unknown block ${JSON.stringify(b).slice(0, 60)}`);
}

function pageHtml(pg) {
  const P = chapterOf(pg.page), [c, s, d] = COLORS[P.chapter], acts = ACT_BY_PAGE[pg.page] || [];
  const qrs = acts.length ? `${qrChip(acts[0].code)}${acts.slice(1).map((a) => qrChip(a.code, false)).join("")}` : "";
  const opener = pg.opener ? `<header class="opener"><div class="ubadge"><small>অধ্যায়</small><b>${bn(P.chapter)}</b></div>
      <div class="ut"><span class="un">${esc(pg.opener.n)}</span><span class="utt">${esc(pg.opener.title)}</span></div>${qrs ? `<div class="qrs">${qrs}</div>` : ""}</header>` : "";
  const top = pg.title || (!pg.opener && qrs) ? `<header class="top">${pg.title ? `<h1>${esc(pg.title)}</h1>` : `<span class="flex"></span>`}${pg.opener ? "" : `<div class="qrs">${qrs}</div>`}</header>` : "";
  return `<section class="page${pg.opener ? " is-opener" : ""}${pg.dense ? " dense" : ""}${pg.spread ? " spread" : ""}" data-page="${pg.page}" style="--c:${c};--s:${s};--d:${d}">
  <div class="strip"><span class="brand">প্রাথমিক গণিত <i>দ্বিতীয় শ্রেণি</i></span><span class="upill">অধ্যায় ${bn(P.chapter)} · ${esc(P.name)}</span></div>
  ${opener}${top}
  <div class="body">${pg.blocks.map((b) => blockHtml(b, pg.page)).join("\n")}</div>${pg.art ? pg.art.map((a) => decoHtml(a)).join("") : ""}
  <footer><span class="fb">প্রাথমিক গণিত · দ্বিতীয় শ্রেণি</span><span class="pn">${bn(pg.page)}</span><span class="fe">eBidyaloy · ইন্টারঅ্যাকটিভ সংস্করণ</span></footer>
</section>`;
}

// ── the cover: the title, the new cover picture, the book's QR ──
function coverHtml() {
  const pic = picFile("cover");
  const deco = `<svg class="cdeco" viewBox="0 0 194 254" preserveAspectRatio="none">${[[18, 30, 9, "#FDE047"], [176, 52, 6, "#F9A8D4"], [160, 196, 11, "#86EFAC"], [22, 214, 7, "#7DD3FC"], [96, 18, 4, "#FDBA74"]].map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".55"/>`).join("")}</svg>`;
  const chips = ["১", "২", "৩", "+", "−", "×", "৫", "৭", "=", "১০"].map((d, i) => `<span class="dg" style="left:${[8, 84, 12, 80, 6, 86, 11, 82, 22, 70][i]}%;top:${[32, 30, 46, 44, 60, 58, 74, 72, 18, 17][i]}%;background:${["#F97316", "#2563EB", "#16A34A", "#DB2777", "#9333EA", "#0D9488", "#EAB308", "#DC2626", "#0EA5E9", "#EA580C"][i]};transform:rotate(${[-12, 10, 8, -9, 14, -6, -10, 12, 6, -8][i]}deg)">${d}</span>`).join("");
  return `<section class="page cover" data-page="0" style="--c:#2563EB;--s:#DBEAFE;--d:#1E40AF">${deco}${chips}
  <div class="ctop"><span class="cbadge">eBidyaloy · ইন্টারঅ্যাকটিভ সংস্করণ</span>
    <h1>প্রাথমিক গণিত</h1><span class="cclass">দ্বিতীয় শ্রেণি</span></div>
  <div class="cpic">${pic ? `<img src="file://${pic.file}">${pic.old ? `<span class="tag">stand-in</span>` : ""}` : `<div class="cph">ChatGPT: cover.png</div>`}</div>
  <div class="cfoot"><span class="cpub">জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড, বাংলাদেশ</span>
    <a class="qr" href="${BOOK_LINK}"><span class="qrc">${qrSvg(BOOK_LINK)}</span><span class="qrt"><b>স্ক্যান করো!</b><span>খেলে খেলে শিখি</span><small>eBidyaloy · ইন্টারঅ্যাকটিভ সংস্করণ</small></span></a></div>
</section>`;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@500;600;700;800&family=Noto+Sans+Bengali:wght@400;500;600;700&family=Noto+Color+Emoji&display=block');
@page { size: ${W}mm ${H}mm; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
body { font-family: 'Noto Sans Bengali', sans-serif; color: ${INK}; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page > .strip, .page > header, .page > .body, .page > footer { position: relative; z-index: 1 }
.page { width: ${W}mm; height: ${H}mm; position: relative; overflow: hidden; page-break-after: always; display: flex; flex-direction: column;
  padding: 0 11mm; background: radial-gradient(circle, color-mix(in srgb, var(--c) 9%, transparent) .9px, transparent 1.3px) 0 0 / 5mm 5mm, #fff }
.strip { display: flex; justify-content: space-between; align-items: center; margin: 0 -11mm; padding: 2.4mm 11mm 2mm; border-bottom: .8mm solid var(--c); background: linear-gradient(90deg, var(--s), #fff 70%) }
.brand { font: 800 11pt 'Baloo Da 2'; color: var(--c) } .brand i { font-style: normal; font-size: 8.5pt; color: #64748B; margin-left: 1mm }
.upill { font: 700 8.5pt 'Baloo Da 2'; color: #fff; background: var(--c); padding: .6mm 3.4mm .3mm; border-radius: 99px; box-shadow: 0 .5mm 0 var(--d) }
/* the chapter's opening band */
header.opener { margin: 0 -11mm 2mm; padding: 6mm 11mm 6mm; display: flex; align-items: center; gap: 4mm; color: #fff; position: relative;
  background: radial-gradient(circle at 88% 20%, rgba(255,255,255,.22) 0 9mm, transparent 9.2mm), radial-gradient(circle at 70% 120%, rgba(255,255,255,.14) 0 14mm, transparent 14.2mm), linear-gradient(120deg, var(--c), var(--d)); border-radius: 0 0 9mm 9mm }
.ubadge { flex: none; width: 22mm; height: 22mm; border-radius: 50%; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1mm solid #FDE047; box-shadow: 0 1.2mm 0 rgba(0,0,0,.18) }
.ubadge small { font: 700 8pt/1 'Baloo Da 2'; color: var(--d) } .ubadge b { font: 800 23pt/1 'Baloo Da 2'; color: var(--c); margin-top: .6mm }
.ut { flex: 1; display: flex; flex-direction: column; gap: .6mm } .un { font: 700 11pt 'Baloo Da 2'; color: #FEF9C3 } .utt { font: 800 22pt/1.1 'Baloo Da 2'; text-shadow: 0 .6mm 0 rgba(0,0,0,.15) }
header.top { display: flex; align-items: center; gap: 3mm; padding: 2.6mm 0 2.2mm } header.top h1 { flex: 1; font: 800 19pt/1.15 'Baloo Da 2'; color: var(--c) } .flex { flex: 1 }
.qrs { display: flex; align-items: center; gap: 2mm; flex: none }
.qr { display: flex; align-items: center; gap: 1.8mm; text-decoration: none; color: inherit; background: #fff; border: .6mm solid #FBBF24; border-radius: 3.4mm; padding: 1.1mm 2.4mm 1.1mm 1.1mm; box-shadow: 0 .8mm 0 #F59E0B }
.qr.small { padding: 1mm } .qrc { width: 14mm; height: 14mm } .qr.small .qrc { width: 10mm; height: 10mm } .qrc svg { width: 100%; height: 100%; display: block }
.qrt { display: flex; flex-direction: column; line-height: 1.1 } .qrt b { font: 800 10.5pt 'Baloo Da 2'; color: var(--c) } .qrt span { font: 700 8.5pt 'Baloo Da 2'; color: #EA580C } .qrt small { font: 600 6.3pt 'Noto Sans Bengali'; color: #94A3B8 }
.opener .qr { border-color: #fff; box-shadow: 0 .8mm 0 rgba(0,0,0,.2) }
.body { flex: 1; display: flex; flex-direction: column; gap: 3mm; min-height: 0 }
footer { flex: none; display: flex; align-items: center; justify-content: space-between; height: 13mm; font: 700 8pt 'Baloo Da 2' }
.fb { color: var(--c) } .fe { color: #F59E0B }
.pn { width: 10.5mm; height: 10.5mm; border-radius: 50%; background: var(--c); color: #fff; font: 800 13pt/11mm 'Baloo Da 2'; text-align: center; border: .7mm solid #fff; box-shadow: 0 0 0 .6mm var(--c) }
/* a question to think about (the book's "?" bubble) */
.ask { display: flex; align-items: center; gap: 2.6mm; align-self: flex-start; max-width: 100%; background: #FFFBEB; border: .6mm solid #F59E0B; border-radius: 99px; padding: 1.2mm 5mm 1.2mm 1.2mm; box-shadow: 0 .8mm 0 #FCD34D }
.qm { flex: none; width: 9mm; height: 9mm; border-radius: 50%; background: linear-gradient(135deg, #38BDF8, var(--c)); color: #fff; font: 800 15pt/9.6mm 'Baloo Da 2'; text-align: center; border: .6mm solid #fff; box-shadow: 0 0 0 .5mm var(--c) }
.at { font: 700 13pt/1.25 'Baloo Da 2'; color: ${INK} }
.tx { font: 500 12.5pt/1.45 'Noto Sans Bengali' } .tx.big { font: 700 13.5pt/1.35 'Baloo Da 2'; color: var(--d) }
.ansbox { display: inline-block; min-width: 18mm; padding: .2mm 3mm; border: .6mm solid #F59E0B; background: #FFFBEB; border-radius: 2mm; font: 800 13pt 'Baloo Da 2'; color: #C2410C; text-align: center }
/* the number tables (pp. 1–6) */
table { border-collapse: separate; border-spacing: 0 }
.numt { width: 100%; border: .7mm solid var(--c); border-radius: 4mm; overflow: hidden; background: #fff; box-shadow: 0 1.2mm 0 var(--s) }
.numt th { background: var(--c); color: #fff; font: 700 11.5pt/1.2 'Baloo Da 2'; padding: 1.6mm 1mm 1.2mm; border-right: .4mm solid rgba(255,255,255,.5) } .numt th:last-child { border-right: 0 }
.numt td { border-top: .4mm solid var(--s); border-right: .4mm solid var(--s); text-align: center; vertical-align: middle; padding: 1mm } .numt td:last-child { border-right: 0 }
.numt tr:nth-child(odd) td { background: #FFFDF2 } .numt tr:nth-child(even) td { background: #F4F9FF }
.numt td.bk { width: 27% } .numt td.num { width: 20%; font: 800 23pt 'Baloo Da 2'; color: var(--c) } .numt td.word { width: 26%; font: 700 17pt 'Baloo Da 2'; color: ${INK} }
.numt td.write { position: relative; width: 27% } .wl { display: block; height: 0; border-bottom: .5mm dashed #94A3B8; margin: 0 2mm } .write .wl { position: absolute; left: 3mm; right: 3mm; bottom: 30% }
.hand { position: relative; font: 600 16pt 'Baloo Da 2'; color: #EA580C; top: -1.4mm }
svg.blocks { display: inline-block; vertical-align: middle; overflow: visible }
.w100 { width: 100%; border: .7mm solid var(--c); border-radius: 4mm; overflow: hidden; box-shadow: 0 1.2mm 0 var(--s) }
.w100 td { padding: 1.35mm 1.4mm 1.05mm; border-top: .3mm solid var(--s) } .w100 tr:first-child td { border-top: 0 }
.w100 td.n { font: 800 12pt 'Baloo Da 2'; color: #fff; background: var(--c); text-align: center; width: 8.5mm; border-top-color: rgba(255,255,255,.35) }
.w100 td.w { font: 600 11.5pt 'Noto Sans Bengali'; background: #FFFDF2 } .w100 tr:nth-child(even) td.w { background: #F4F9FF }
/* practice */
.practise { display: flex; align-items: center; padding-top: .5mm }
.rib { display: inline-flex; align-items: center; gap: 1.6mm; font: 800 15pt/1 'Baloo Da 2'; color: #fff; background: linear-gradient(90deg, #F97316, #EC4899); padding: 2mm 6mm 1.4mm 3.4mm; border-radius: 99px 3mm 3mm 99px; box-shadow: 0 .8mm 0 #BE185D }
.ex { display: flex; flex-direction: column; gap: 2.4mm; background: #FFFBEB; border: .5mm dashed #FBBF24; border-radius: 4mm; padding: 2.4mm 3.2mm 3mm }
.ext { display: grid; grid-template-columns: 7mm 1fr; font: 500 12.5pt/1.45 'Noto Sans Bengali' } .mk { font: 800 13pt/1.45 'Baloo Da 2'; color: #EA580C }
.nums { display: flex; flex-wrap: wrap; gap: 2mm; padding-left: 7mm } .nums span { font: 800 13pt 'Baloo Da 2'; color: var(--c); background: #fff; border: .5mm solid var(--s); border-radius: 2.4mm; padding: .4mm 3mm .1mm; box-shadow: 0 .6mm 0 var(--s) }
.grid { width: 100%; border-radius: 3mm; overflow: hidden; border: .6mm solid var(--tc); background: #fff }
.grid th { background: var(--tc); color: #fff; font: 700 11pt/1.25 'Baloo Da 2'; padding: 1.4mm 1mm 1mm; border-right: .3mm solid rgba(255,255,255,.5) } .grid th:last-child, .grid td:last-child { border-right: 0 }
.grid td { text-align: center; font: 700 12pt 'Baloo Da 2'; padding: 1.4mm 1mm; height: 9mm; border-top: .3mm solid var(--tl); border-right: .3mm solid var(--tl); background: var(--tb) }
.grid .gap i { display: block; border-bottom: .5mm dashed var(--tc); opacity: .55; margin: 3.6mm 2mm 0 } .grid th.gap i { border-color: #fff; margin-top: 2.6mm }
.grid.small th { font-size: 9.6pt; padding: 1.4mm .6mm 1mm }
.tone-blue { --tc: #0EA5E9; --tl: #BAE6FD; --tb: #F0F9FF } .tone-green { --tc: #16A34A; --tl: #BBF7D0; --tb: #F0FDF4 } .tone-pink { --tc: #DB2777; --tl: #FBCFE8; --tb: #FDF2F8 } .tone-yellow { --tc: #D97706; --tl: #FDE68A; --tb: #FFFBEB }
.spread .body { justify-content: space-evenly; padding-bottom: 2mm }
/* a crowded page (pg.dense) */
.dense .body { gap: 2.2mm } .dense .ex { gap: 1.8mm; padding: 1.8mm 3mm 2.2mm } .dense .grid td { height: 7.6mm; padding: 1mm }
/* pictures */
.frame { border: .7mm solid var(--c); border-radius: 4mm; background: #fff; padding: 2mm 3mm; box-shadow: 0 1.2mm 0 var(--s) }
.frame.fit { align-self: center; padding: 3mm 5mm 2mm; background: linear-gradient(#F8FBFF, #EEF5FF) }
.frame.sticks { padding: 1.4mm 6mm } .bfree { padding: 1mm 0 0 2mm }
/* the children talk */
.say { display: flex; align-items: center; gap: 3mm }
.say.girl { justify-content: flex-end }
.av { flex: none } .fc { display: block; width: 19mm; height: 19mm; border-radius: 50%; object-fit: cover; background: #fff; border: .8mm solid #fff; box-shadow: 0 0 0 .7mm var(--w), 0 1mm 0 .7mm color-mix(in srgb, var(--w) 35%, transparent) }
.sb { position: relative; max-width: 130mm; background: color-mix(in srgb, var(--w) 10%, #fff); border: .6mm solid var(--w); border-radius: 5mm; padding: 2.6mm 5mm 2.2mm; font: 600 13pt/1.45 'Noto Sans Bengali'; box-shadow: 0 1mm 0 color-mix(in srgb, var(--w) 30%, transparent) }
.sb::before { content: ""; position: absolute; top: 50%; width: 4mm; height: 4mm; background: inherit; border: .6mm solid var(--w); transform: translateY(-50%) rotate(45deg) }
.say.boy .sb::before { left: -2.5mm; border-right: 0; border-top: 0 } .say.girl .sb::before { right: -2.5mm; border-left: 0; border-bottom: 0 }
.note { align-self: flex-start; font: 700 13.5pt/1.3 'Baloo Da 2'; color: #9A3412; background: linear-gradient(90deg, #FEF3C7, #FFFBEB); border-left: 2mm solid #F59E0B; border-radius: 2mm 4mm 4mm 2mm; padding: 2mm 5mm 1.6mm 4mm; box-shadow: 0 .8mm 0 #FDE68A }
.sub { display: flex; align-items: center; gap: 2mm; font: 800 13.5pt 'Baloo Da 2'; color: var(--d) } .sub i { width: 5mm; height: 5mm; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #7DD3FC, var(--c)) }
/* place value tables (p10) */
.pv { width: 100%; border: .6mm solid var(--tc); border-radius: 3.4mm; overflow: hidden; background: var(--tb) }
.pv td { border-top: .3mm solid var(--tl); border-right: .3mm solid var(--tl); text-align: center; vertical-align: middle; padding: 1.2mm } .pv td:last-child { border-right: 0 } .pv tr:first-child td { border-top: 0 }
.pv tr.pics td { background: #fff; vertical-align: bottom; padding: 2mm 1.4mm 1.6mm } .pv td.h { width: 60% } .pv td.t { width: 20% }
.pv tr.lab td { font: 600 11pt/1.4 'Noto Sans Bengali' } .pv tr.hd td { font: 800 12.5pt 'Baloo Da 2'; color: #fff; background: var(--tc) } .pv tr.dg td { font: 800 14pt 'Baloo Da 2'; color: var(--tc); height: 8.5mm }
.pv tr.dg .wl { margin: 3.4mm 6mm 0 } .pv tr.ans td { text-align: left; font: 600 12pt 'Noto Sans Bengali'; padding: 2mm 3mm } .pv .wl.long { display: inline-block; width: 70mm; vertical-align: -.6mm }
/* markup, layout and the shared math kinds */
.abox { display: inline-block; width: 11mm; height: 7.6mm; vertical-align: -2.2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
.wline { display: inline-block; height: 0; border-bottom: .5mm dashed #94A3B8; vertical-align: -.6mm; margin: 0 1mm }
.tx.center { text-align: center } .tx b { color: var(--d) }
.lrow { display: flex } .lcell { min-width: 0; display: flex; flex-direction: column; gap: 2mm } .lcol { display: flex; flex-direction: column } .lcenter { display: flex; justify-content: center }
.frame.toned { border-color: var(--tc); background: var(--tb); box-shadow: 0 1.2mm 0 var(--tl) }
.pic { position: relative; align-self: center; margin: 0; border-radius: 4mm; overflow: hidden; flex: none; max-width: 100% } .pic.framed { border: .9mm solid #fff; box-shadow: 0 0 0 .7mm var(--c), 0 1.6mm 0 .7mm var(--s) }
.pic img { width: 100%; height: 100%; display: block } .pic figcaption { position: absolute; left: 0; right: 0; bottom: 0; text-align: center; font: 700 10pt 'Baloo Da 2'; background: rgba(255,255,255,.85) }
.ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; text-align: center; background: repeating-linear-gradient(45deg, #F8FAFC 0 5mm, #EEF2FF 5mm 10mm); font: 700 9pt 'Baloo Da 2'; color: #6366F1; border: .4mm dashed #A5B4FC; border-radius: 4mm }
img.deco { position: absolute; object-fit: contain; z-index: 0 }
.objs { display: grid; align-content: center } .objs.groups { display: flex; flex-wrap: wrap; gap: 3mm } .grp { display: inline-flex; flex-wrap: wrap; align-items: center; justify-content: center; padding: 1.4mm 2mm; border: .5mm dashed #94A3B8; border-radius: 4mm; max-width: 60mm } .grp.plate { border: 0; background: radial-gradient(ellipse at 50% 60%, #fff 0 55%, #E2E8F0 56%, #F1F5F9 70%, transparent 71%); padding: 3mm 4mm }
.ob { display: inline-flex; align-items: center; justify-content: center; position: relative } .ob img { max-width: 100%; max-height: 100%; object-fit: contain } .ob .em { font-family: 'Noto Color Emoji'; font-style: normal; line-height: 1 }
.ob.x::after { content: ""; position: absolute; inset: 8%; background: linear-gradient(45deg, transparent 46%, #DC2626 46% 54%, transparent 54%), linear-gradient(-45deg, transparent 46%, #DC2626 46% 54%, transparent 54%) }
.sums { display: grid; gap: 2.4mm 4mm; font: 700 13pt/1.6 'Baloo Da 2' } .sm { white-space: nowrap } .smk { color: #EA580C; margin-right: 1.6mm; font-weight: 800 }
.colsums { display: grid; gap: 3mm 6mm; justify-content: space-around } .colsum { font-family: 'Baloo Da 2'; font-weight: 800; border-collapse: collapse; background: #fff; border-radius: 3mm; box-shadow: 0 0 0 .4mm #E2E8F0 }
.colsum td { width: 1.15em; height: 1.4em; text-align: center; padding: 0 .1em; line-height: 1.4 } .colsum td.op { color: #DC2626; width: .9em } .colsum tr.last td { border-bottom: .6mm solid #1E2433 } .colsum tr.last td.op { border-bottom: 0 }
.colsum tr.hd td { font-size: .55em; font-weight: 700; line-height: 1.6 } .colsum tr.hd td.h { color: #fff; background: var(--c) } .colsum tr.cy td { font-size: .6em; color: #DC2626; height: 1em; line-height: 1 } .colsum tr.an td { color: #C2410C } .colsum .abox { width: .95em; height: 1.2em; margin: 0; vertical-align: middle }
svg.dots { display: block } .chart { border-collapse: collapse; margin: 0 auto } .chart td { border: .35mm solid #94A3B8; text-align: center; font: 700 11pt 'Baloo Da 2'; background: #fff } .chart td.ring { box-shadow: inset 0 0 0 .6mm #DC2626; border-radius: 50% }
svg.clock { display: block } .lcd { display: inline-block; width: fit-content; align-self: center; font: 800 18pt 'Baloo Da 2'; color: #FDE047; background: #1E293B; border: 1mm solid #F59E0B; border-radius: 3mm; padding: .6mm 4mm 0; letter-spacing: 1pt }
.money { display: flex; flex-wrap: wrap; gap: 3mm; align-items: center }
.bnote { position: relative; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--n), #fff 140%); border: .6mm solid var(--k); border-radius: 2mm; color: var(--k); box-shadow: 0 .8mm 0 rgba(0,0,0,.12) } .bnote b { font: 800 1em/1 'Baloo Da 2' } .bnote small { font: 700 .5em 'Noto Sans Bengali' } .bnote i { position: absolute; left: 2mm; top: 2mm; width: 4mm; height: 4mm; border-radius: 50%; border: .5mm solid var(--k); opacity: .5 }
.coin { display: inline-flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #FEF9C3, #EAB308 70%, #A16207); border: .6mm solid #854D0E; color: #422006; font-weight: 800; font-family: 'Baloo Da 2'; line-height: 1 } .coin small { font: 700 .45em 'Noto Sans Bengali' }
.grid.left td { text-align: left }
/* the cover */
.cover { padding: 0; background: radial-gradient(circle at 50% 0%, #FFF7D6 0 60mm, transparent 61mm), linear-gradient(170deg, #E0F2FE, #FDF2F8 60%, #FEF9C3); align-items: center }
.cdeco { position: absolute; inset: 0; width: 100%; height: 100% }
.cover .dg { position: absolute; width: 13mm; height: 13mm; border-radius: 3.6mm; color: #fff; font: 800 19pt/13.6mm 'Baloo Da 2'; text-align: center; box-shadow: 0 1mm 0 rgba(0,0,0,.18); border: .7mm solid #fff }
.ctop { position: relative; text-align: center; padding-top: 12mm; display: flex; flex-direction: column; align-items: center; gap: 1mm }
.cbadge { font: 600 8pt 'Noto Sans Bengali'; color: #475569; background: rgba(255,255,255,.75); padding: .8mm 3.4mm; border-radius: 99px }
.cover h1 { font: 800 46pt/1.1 'Baloo Da 2'; color: #DC2626; text-shadow: 0 1.2mm 0 #FDE68A, 0 2mm 0 rgba(0,0,0,.08); margin-top: 3mm }
.cclass { font: 800 20pt 'Baloo Da 2'; color: #fff; background: linear-gradient(90deg, #2563EB, #9333EA); padding: 1mm 9mm .4mm; border-radius: 99px; box-shadow: 0 1mm 0 #1E3A8A }
.cpic { position: relative; width: 104mm; height: 150mm; margin-top: 7mm; border-radius: 9mm; overflow: hidden; border: 1.6mm solid #fff; box-shadow: 0 0 0 .9mm #2563EB, 0 2.4mm 0 .9mm #BFDBFE }
.cpic img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 45%; display: block }
.cph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: repeating-linear-gradient(45deg, #F8FAFC 0 6mm, #EEF2FF 6mm 12mm); font: 700 12pt 'Baloo Da 2'; color: #6366F1 }
.cfoot { position: absolute; left: 0; right: 0; bottom: 9mm; display: flex; align-items: center; justify-content: space-between; padding: 0 14mm }
.cpub { font: 700 11pt 'Baloo Da 2'; color: #1E3A8A; max-width: 95mm }
.tag { position: absolute; right: 1mm; bottom: -1mm; font: 600 5.5pt 'Noto Sans Bengali'; color: #fff; background: rgba(0,0,0,.45); padding: .2mm 1.2mm; border-radius: 99px }
`;

// ── the text check: the book's words (tesseract, Bengali) against ours ──
const OCR_DIR = path.join(__dirname, ".work/ocr");
function bookText(n) {
  fs.mkdirSync(OCR_DIR, { recursive: true });
  const f = path.join(OCR_DIR, `p${String(n).padStart(3, "0")}.txt`);
  if (!fs.existsSync(f)) {
    const png = path.join(OCR_DIR, `page-${n}`);
    execFileSync("pdftoppm", ["-f", String(n + FRONT), "-l", String(n + FRONT), "-r", "300", "-gray", "-singlefile", "-png", BOOK_PDF, png]);
    const t = ["11", "3", "6"].map((psm) => execFileSync("tesseract", [png + ".png", "-", "--tessdata-dir", path.join(__dirname, ".work/tessdata"), "-l", "ben", "--psm", psm], { stdio: ["ignore", "pipe", "ignore"] }).toString()).join("\n");
    fs.writeFileSync(f, t); fs.rmSync(png + ".png", { force: true });
  }
  return fs.readFileSync(f, "utf8");
}
const norm = (s) => s.normalize("NFC").replace(/[‌‍]/g, "");
const tokens = (s) => (norm(s).match(/[ঀ-৥ৰ-৿]+|[০-৯]+/g) || []).filter((w) => w.length > 1 || /[০-৯]/.test(w));
function near(a, b) { // edit distance ≤ 1
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, e = 0;
  while (i < a.length && j < b.length) { if (a[i] === b[j]) { i++; j++; continue; } if (++e > 1) return false; if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; } }
  return e + (a.length - i) + (b.length - j) <= 1;
}
// tesseract's usual slips in this book: ঊ read as উ, ন্ন as ন or নু, ট্ট as ট; compare those loosely
const loose = (w) => w.replace(/ঊ/g, "উ").replace(/(.)্\1/g, "$1").replace(/্/g, "").replace(/ু(?=,|$)/g, "");
function dist(a, b) { const d = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; }
function textCheck(n, ours) {
  const book = tokens(bookText(n)), set = new Set(book), mine = tokens(ours), lb = book.map(loose);
  const ok = (w) => set.has(w) || (/^[০-৯]+$/.test(w) && book.some((b) => b.includes(w))) || (w.length >= 3 && book.some((b) => near(w, b) || (b.includes(w)))) || (w.length >= 4 && lb.some((b) => dist(loose(w), b) <= (w.length >= 6 ? 2 : 1)));
  const missing = [...new Set(mine)].filter((w) => !ok(w));
  return { missing, found: mine.length - mine.filter((w) => missing.includes(w)).length, total: mine.length };
}

(async () => {
  const pages = ALL.filter((pg) => wanted(pg.page));
  if (!pages.length) throw new Error("no pages: " + ARGS.join(" "));
  for (const f of FILES) {
    const pf = path.join(CONTENT, f.replace(/\.js$/, ".parts.js"));
    if (!fs.existsSync(pf)) continue;
    const P = require(pf);
    for (const [k, fn] of Object.entries(P.kinds || {})) { if (KINDS[k]) throw new Error(`kind "${k}" is in two parts files`); KINDS[k] = fn; }
    PART_CSS += (P.css || "") + "\n";
  }
  const withCover = WHOLE || wanted(1);
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}${PART_CSS}</style></head><body>${withCover ? coverHtml() : ""}${pages.map((pg) => pageHtml(pg)).join("\n")}</body></html>`;
  const name = WHOLE ? "class2-math-book" : `class2-math-p${pages[0].page}-${pages[pages.length - 1].page}`, htmlFile = path.join(OUT, name + ".html");
  fs.writeFileSync(htmlFile, html);
  const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--no-sandbox", "--allow-file-access-from-files"] });
  const page = await browser.newPage();
  await page.goto("file://" + htmlFile, { waitUntil: "networkidle0", timeout: 180000 });
  await page.evaluate(() => document.fonts.ready);
  const fontsOk = await page.evaluate(() => { const f = [...document.fonts]; return ["Baloo Da 2", "Noto Sans Bengali"].every((n) => f.some((x) => x.family.replace(/"/g, "") === n && x.status === "loaded")) && !f.some((x) => x.status === "error"); });
  // a page whose content runs past the footer (most often because a QR row was added above a full page) is scaled down
  // just enough to fit, at most to 85%; a page with a true-size ruler is never scaled (it is reported as spilling instead)
  const fitted = await page.evaluate(() => [...document.querySelectorAll(".page:not(.cover)")].map((p) => {
    if (p.querySelector('[class*="ruler"]')) return null;
    const body = p.querySelector(".body"), foot = p.querySelector("footer");
    const over = () => { const fb = foot.getBoundingClientRect().top, r = p.getBoundingClientRect().right; let m = 0; for (const e of body.querySelectorAll("*")) { const q = e.getBoundingClientRect(); if (q.width) m = Math.max(m, q.bottom - fb, q.right - (r - 8)); } return m; };
    let z = 1;
    while (over() > 0.5 && z > 0.855) { z = Math.round((z - 0.01) * 100) / 100; body.style.zoom = z; }
    return z < 1 ? `p${p.dataset.page} ${Math.round(z * 100)}%` : null;
  }).filter(Boolean));
  if (fitted.length) console.log(`fitted (content scaled to fit): ${fitted.join(", ")}`);
  // nothing may spill out of a page or over the footer
  const spills = await page.evaluate(() => [...document.querySelectorAll(".page:not(.cover)")].map((p) => {
    const r = p.getBoundingClientRect(), foot = p.querySelector("footer").getBoundingClientRect(), body = p.querySelector(".body");
    const bad = [...body.querySelectorAll("*")].filter((e) => { const q = e.getBoundingClientRect(); return q.width && (q.bottom > foot.top + 0.5 || q.right > r.right - 8); });
    const boxes = [...body.querySelectorAll(".frame, .ex, .pic, .grid")], out = [];
    for (const bx of boxes) { const q = bx.getBoundingClientRect(); for (const e of bx.querySelectorAll("*:not(.tag)")) { const r2 = e.getBoundingClientRect(); if (r2.width && (r2.right > q.right + 1.5 || r2.bottom > q.bottom + 1.5 || r2.left < q.left - 1.5)) { out.push(e); break; } } }
    return bad.length || out.length ? `p${p.dataset.page}: ${bad.length ? bad.length + " past the edge" : ""}${out.length ? `${bad.length ? ", " : ""}${out.length} spilling out of a box` : ""}` : "";
  }).filter(Boolean));
  const texts = await page.evaluate(() => [...document.querySelectorAll(".page:not(.cover)")].map((p) => {
    const c = p.cloneNode(true); c.querySelectorAll(".strip, footer, .qrs, .ubadge").forEach((e) => e.remove());
    const w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT), out = []; while (w.nextNode()) out.push(w.currentNode.nodeValue); return [p.dataset.page, out.join(" ")];
  }));
  await page.pdf({ path: path.join(WHOLE ? __dirname : OUT, name + ".pdf"), width: `${W}mm`, height: `${H}mm`, printBackground: true, preferCSSPageSize: true });
  if (WHOLE) { // the book's own front pages (title page, credits, preface, the symbols' key, contents: PDF pages 2–9) after our cover, and its back page, as printed
    const { PDFDocument } = require(path.join(HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/pdf-lib"));
    const ours = await PDFDocument.load(fs.readFileSync(path.join(__dirname, name + ".pdf"))), book = await PDFDocument.load(fs.readFileSync(BOOK_PDF));
    const front = await ours.copyPages(book, [1, 2, 3, 4, 5, 6, 7, 8]), back = await ours.copyPages(book, [book.getPageCount() - 1]);
    front.forEach((pg, i) => ours.insertPage(1 + i, pg)); ours.addPage(back[0]);
    fs.writeFileSync(path.join(__dirname, name + ".pdf"), await ours.save());
  }
  fs.mkdirSync(path.join(__dirname, "previews"), { recursive: true });
  await page.setViewport({ width: Math.round(W / 25.4 * 96), height: Math.round(H / 25.4 * 96), deviceScaleFactor: 2.2 });
  for (const el of await page.$$(".page")) {
    const n = await el.evaluate((e) => e.dataset.page);
    await el.screenshot({ path: path.join(__dirname, "previews", n === "0" ? "cover.png" : `page-${String(n).padStart(3, "0")}.png`) });
  }
  await browser.close();
  console.log(`${name}.pdf · ${pages.length} pages · fonts ${fontsOk ? "ok" : "MISSING"} · ${spills.length ? "SPILLS: " + spills.join("; ") : "nothing spills"}`);
  const ALLOW = Object.fromEntries(pages.map((pg) => [pg.page, pg.allow || []]));
  for (const [n, t] of texts) {
    const r = textCheck(+n, t); r.missing = r.missing.filter((w) => !ALLOW[n].includes(w));
    console.log(`p${n}: ${r.missing.length ? `${r.found}/${r.total} words found in the book · not found: ${r.missing.join(" ")}` : `the same (${r.total} words)`}`);
  }
})();
