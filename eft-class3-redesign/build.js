// English for Today, Class Three (NCTB): eBidyaloy's interactive edition, page for page at the book's own size
// (551.6 × 724.2 pt = 194.6 × 255.5 mm), with the same page numbers. The words are the book's, from content/*.js; every
// English line carries the Bangla guide (British English: its sound in Bangla letters, then its meaning). Each page has a
// QR code to its activity on eBidyaloy (codes.json: LS codes, minted once and never changed).
// Pictures: art/new/<name>.png (the new art); until it's there, art/stand-in/<name>.png (the old book's, 100 ppi) with a
// small "stand-in" tag. Fonts (Google Fonts): Andika (English: single-storey a and g), Baloo 2 (headings), Noto Sans
// Bengali (the guide: its dotted letters print).
// Run: node build.js            → the whole book: eft-class3-book.pdf (front.js adds the cover, pp. 2–5 and the contents)
//      node build.js unit3 …    → only those units, in .work/out/eft-class3-<units>.pdf (to check a unit quickly)
// Both make previews/page-NNN.png and the text check against the book. Working files (HTML, part PDFs) go in .work/out/.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");
const HOME = process.env.HOME;
const puppeteer = require(path.join(HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const QR = require(path.join(HOME, "Downloads/Esho-Bhasha-Shikhi/node_modules/qrcode"));
const BOOK_PDF = path.join(__dirname, "source/eft-class3-nctb.pdf"); // NCTB's book (a copy of ~/Downloads/English Text Book Class_3.pdf)
const FRONT = 6; // the book's printed page 1 is the PDF's page 7

const ALL_UNITS = ["unit1", "unit2", "unit3", "unit4", "unit5", "unit6", "unit7", "unit8"];
const ASKED = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const UNIT_NAMES = ASKED.length ? ASKED : ALL_UNITS, WHOLE = UNIT_NAMES.join() === ALL_UNITS.join();
const OUT_DIR = path.join(__dirname, ".work/out");
const PARTS = UNIT_NAMES.map((n) => require(path.join(__dirname, "content", n + ".js")));
const COLORS = { 1: ["#2563EB", "#DBEAFE", "#1E40AF"], 2: ["#16A34A", "#DCFCE7", "#166534"], 3: ["#9333EA", "#F3E8FF", "#6B21A8"], 4: ["#EA580C", "#FFEDD5", "#9A3412"],
  5: ["#DB2777", "#FCE7F3", "#9D174D"], 6: ["#0D9488", "#CCFBF1", "#115E59"], 7: ["#0284C7", "#E0F2FE", "#075985"], 8: ["#DC2626", "#FEE2E2", "#991B1B"] };
// the children and grown-ups, each with their own colour wherever they speak
const WHO = { Fatiha: "#F97316", Sanjoy: "#0D9488", Faria: "#EC4899", Rahat: "#2563EB", Sakiba: "#9333EA", Zahid: "#D97706", Rita: "#16A34A",
  Ripa: "#E11D48", Rishat: "#DC2626", Sujana: "#CA8A04", Farzana: "#4F46E5", Sunil: "#0F766E", Rana: "#0891B2", Sima: "#DB2777", Sarah: "#7C3AED", Manik: "#059669", Teacher: "#475569", Students: "#64748B", S1: "#2563EB", S2: "#F97316" };
const INK = "#1E2433";

// ── codes: one LS code per page (the platform's own alphabet; an LS code can't clash with the codes it makes) ──
const CODES_FILE = path.join(__dirname, "codes.json");
const codes = fs.existsSync(CODES_FILE) ? JSON.parse(fs.readFileSync(CODES_FILE, "utf8")) : { book: "", pages: {} };
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const used = new Set([codes.book, ...Object.values(codes.pages)].filter(Boolean));
const mint = () => { for (;;) { const c = "LS" + Array.from(crypto.randomBytes(6), (x) => ALPHABET[x % ALPHABET.length]).join(""); if (!used.has(c)) { used.add(c); return c; } } };
if (!codes.book) codes.book = mint();
const pageKey = (n) => `EFT3-P${String(n).padStart(3, "0")}`;
let minted = 0;
for (let n = 1; n <= 124; n++) if (!codes.pages[pageKey(n)]) { codes.pages[pageKey(n)] = mint(); minted++; } // the book's printed pages 1–124
if (minted) fs.writeFileSync(CODES_FILE, JSON.stringify(codes, null, 1) + "\n");
const LINK = (n) => `https://ebidyaloy.com/a/${codes.pages[pageKey(n)]}`;
// the pages' second games (content/activities-extra.js, keyed EFT3-Pnnnb, c, d as activities.js keys them): each gets a small
// QR beside the exercise it is made from, which its notes name ("Practice 2" → the block n: 2, "Activity C" → k: "C"). An
// exercise that runs on from the page before (p112: Activity C's questions 3 and 4) has no heading here: its QR goes at the
// top of the page's first block without one.
const GAMES = {}; // "page:k:C" / "page:n:2" / "page:cont" → [code…]
{
  const PAGE_OF = {}; for (let n = 1; n <= 8; n++) for (const p of require(path.join(__dirname, "content", `unit${n}.js`)).pages) PAGE_OF[p.page] = p;
  const X = require(path.join(__dirname, "content", "activities-extra.js")), REF = /(Practi[cs]e|Activit(?:y|ies)|Exercise)\s+([A-Z0-9]+)/;
  for (const [pg, list] of Object.entries(X)) list.forEach((g, i) => {
    const code = codes.pages[`${pageKey(+pg)}${"bcd"[i]}`], m = (g.notes || []).map((s) => s.match(REF)).find(Boolean);
    if (!code) return console.warn(`p${pg}'s game ${"bcd"[i]} has no code yet: run node activities.js`);
    const kind = m && (/^Activit/.test(m[1]) ? "k" : "n"), P = PAGE_OF[pg];
    const here = m && P && P.blocks.some((b) => String(b[kind]) === m[2]);
    const at = here ? `${pg}:${kind}:${m[2]}` : `${pg}:cont`;
    (GAMES[at] = GAMES[at] || []).push(code);
  });
}
const PLACED = new Set(); // the GAMES keys a page used, to find a game whose exercise wasn't found
const miniQr = (at) => { const gs = GAMES[at]; if (!gs) return ""; PLACED.add(at);
  return gs.map((c) => `<a class="mq" href="https://ebidyaloy.com/a/${c}"><span class="mqc">${qrSvg(`https://ebidyaloy.com/a/${c}`)}</span><b class="mqb">Play</b></a>`).join(""); };

// ── text helpers ──
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// the puff (Let's Learn English's engine/english.js, British Bangla edition): p, t, k at the start of a word puff
const PUFF = { "ক": "খ", "ট": "ঠ", "প": "প্‌হ" };
const PUFF_RE = /(^|[\s“‘"'(\[—–-]|(?<!স়?)·(?=\*))(\*?)([কটপ])(?!়)(?=্য|[^্]|$)/gu;
// names keep their own letters (পর্শী, কানিজ়, কুষ্টিয়া): NO_PUFF holds the hint word of every word the book capitalises in the
// middle of a sentence (filled from the content before the pages are made; days and months are ordinary words)
const NO_PUFF = new Set();
const bareBn = (t) => String(t).replace(/^[“‘"'(*]+|[”’"'),.?!।:;*…]+$/g, "");
const hint = (h, m = "") => {
  return esc(String(h).replace(PUFF_RE, (x, b, star, c, off, all) => { const w = (all.slice(off + b.length + star.length).match(/^[\u0980-\u09FF\u200C]+/) || [""])[0]; return NO_PUFF.has(bareBn(w)) ? x : b + star + (PUFF[c] || c); }).replace(/়্(?=র)/g, "়্‌"))
  .replace(/\*([^*]+)\*/g, "<strong>$1</strong>").replace(/_{2,}/g, "<span class=\"gb\"></span>").replace(/\u02D0/g, "<span class=\"lm\">\u02D0</span>"); }; // ː: the length mark (Unit 4), in Andika, which has it
const mean = (m) => esc(m).replace(/_{2,}/g, "<span class=\"gb\"></span>");
// English as printed: a run of underscores is a box to write in (its width from the run), _word_ is underlined
const en = (s) => esc(s).replace(/_{3,}/g, (m) => `<span class="box" style="width:${Math.min(40, 6 + m.length * 1.4)}mm"></span>`)
  .replace(/_([^_\s][^_]*?)_/g, "<u>$1</u>").replace(/\n/g, "<br>");
// the guide under a line: its hint, then its meaning; a half that is empty is left out (both empty: no guide at all)
const guide = (h, m) => (!h && !m ? "" : `<div class="guide">${h ? `<span class="hint">${hint(h, m)}</span>` : ""}${h && m ? `<span class="sep">·</span>` : ""}${m ? `<span class="mean">${mean(m)}</span>` : ""}</div>`);

function qrSvg(text) {
  const m = QR.create(text, { errorCorrectionLevel: "M" }).modules, n = m.size;
  let d = "";
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (m.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
  return `<svg viewBox="-1 -1 ${n + 2} ${n + 2}" shape-rendering="crispEdges"><rect x="-1" y="-1" width="${n + 2}" height="${n + 2}" fill="#fff"/><path d="${d}" fill="${INK}"/></svg>`;
}
// the skills a task asks for, from its words, each with its own colour
const ICON = {
  listen: [`<path d="M8.5 9a3.5 3.5 0 1 1 7 0c0 2-1.2 2.8-2.1 3.8-.8.9-.9 1.6-.9 2.7a2.5 2.5 0 0 1-4.6 1.3" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`, "#2563EB"],
  look: [`<path d="M2.5 12s3.6-6 9.5-6 9.5 6 9.5 6-3.6 6-9.5 6-9.5-6-9.5-6z" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="12" cy="12" r="2.6" fill="#fff"/>`, "#9333EA"],
  speak: [`<path d="M4.5 5.5h15v9.5H10l-4 3.5v-3.5H4.5z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/>`, "#EA580C"],
  pair: [`<circle cx="8.5" cy="8" r="2.6" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="15.5" cy="8" r="2.6" fill="none" stroke="#fff" stroke-width="2.2"/><path d="M3.5 19c.4-3 2.4-4.6 5-4.6S13 16 13.4 19M10.6 19c.4-3 2.4-4.6 5-4.6s4.6 1.6 5 4.6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`, "#16A34A"],
  write: [`<path d="M5 19.2l3.6-.8L18.8 8.2 15.8 5.2 5.6 15.4z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path d="M13.8 7.2l3 3" stroke="#fff" stroke-width="2.2"/>`, "#DB2777"],
};
const skills = (t) => [/Listen|listen/.test(t) && "listen", /Look|look/.test(t) && "look", /say|Ask|Chain/.test(t) && "speak", /Act out|Pairwork|Chain|Ask and answer/.test(t) && "pair", /Write|\btick\b|write/.test(t) && "write"].filter(Boolean);
const icons = (t) => `<span class="icons">${skills(t).map((k) => `<svg viewBox="0 0 24 24" class="ic" style="background:${ICON[k][1]}">${ICON[k][0]}</svg>`).join("")}</span>`;
// a little star and a cloud, to scatter on the headers
const STAR = (x, y, s, f) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-10 2.9-3.1 10-3.1 4.3 1.2 6.5 8.1 0 3.9-6.5 8.1-4.3 1.2-10-3.1-2.9-3.1Z" fill="${f}"/>`;

/** The PDF takes a lighter copy of each picture (Activity Studio takes a book PDF of at most 60 MB): .work/print/<its own
 *  path>@<px>, a JPEG at quality 80 (a PNG if it has see-through parts), its long side just big enough for PRINT_DPI where the
 *  page shows it largest (.work/print/sizes.json, measured by the build; PRINT_MAX until then). Made again when the picture
 *  changes. The path still has art/new/ in it, which the parts look for. */
const PRINT_DPI = 200, PRINT_MAX = 1500, PRINT_MIN = 300, PRINT_Q = 80, PRINT_DIR = path.join(__dirname, ".work/print");
const SIZES_FILE = path.join(PRINT_DIR, "sizes.json");
const SIZES = fs.existsSync(SIZES_FILE) ? JSON.parse(fs.readFileSync(SIZES_FILE, "utf8")) : {};
const COPY_OF = {}; // a copy's path → its picture (relative), to measure it
function printCopy(f) {
  const rel = path.relative(__dirname, f), px = SIZES[rel] || PRINT_MAX;
  const base = path.join(PRINT_DIR, rel).replace(/\.\w+$/, `@${px}`), t = fs.statSync(f).mtimeMs;
  const done = [".jpg", ".png"].map((ext) => base + ext).find((c) => fs.existsSync(c) && fs.statSync(c).mtimeMs >= t);
  if (done) return (COPY_OF[done] = rel), done;
  const info = execFileSync("sips", ["-g", "hasAlpha", "-g", "pixelWidth", "-g", "pixelHeight", f]).toString();
  const alpha = /hasAlpha: yes/.test(info), big = Math.max(...[...info.matchAll(/pixel(?:Width|Height): (\d+)/g)].map((m) => +m[1])) > px;
  const out = base + (alpha ? ".png" : ".jpg");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execFileSync("sips", [...(big ? ["-Z", String(px)] : []), "-s", "format", alpha ? "png" : "jpeg", ...(alpha ? [] : ["-s", "formatOptions", String(PRINT_Q)]), f, "--out", out], { stdio: "ignore" });
  return (COPY_OF[out] = rel), out;
}
/** A picture's file: art/new/, else art/stand-in/ (the old book's), else a placeholder with its name. */
function art(name) {
  for (const d of ["art/new", "art/stand-in"]) for (const ext of [".png", ".jpg", ".webp"]) { const f = path.join(__dirname, d, name + ext); if (fs.existsSync(f)) return printCopy(f); }
  const ph = path.join(__dirname, "art/.placeholders", name + ".svg");
  if (!fs.existsSync(ph)) { fs.mkdirSync(path.dirname(ph), { recursive: true }); fs.writeFileSync(ph, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="#F1F5F9"/><text x="150" y="104" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#94A3B8">picture: ${name}</text></svg>`); }
  return ph;
}
// where the speech bubbles go on a NEW picture (art/bubbles.json: { name: [{ at, tail }, …] }, one per bubble, in order),
// kept apart from the words, which stay in content/
const BUBBLE_AT = fs.existsSync(path.join(__dirname, "art/bubbles.json")) ? JSON.parse(fs.readFileSync(path.join(__dirname, "art/bubbles.json"), "utf8")) : {};
function picture(name, bubbles = [], h) {
  const file = art(name), old = !file.includes("/art/new/");
  // an entry is the bubbles' places, or { bubbles, pos }: pos is the picture's crop (CSS object-position), "50% 0%" keeps its top
  const BA = !old && BUBBLE_AT[name], at = Array.isArray(BA) ? BA : (BA && BA.bubbles) || [], pos = BA && !Array.isArray(BA) && BA.pos;
  if (at.length) bubbles = bubbles.map((b, i) => (at[i] ? { ...b, ...at[i] } : b));
  const bub = bubbles.map((b) => `<div class="bubble ${b.tail}" style="left:${b.at[0]}%;top:${b.at[1]}%;width:${b.at[2]}%;--w:${WHO[b.who] || INK}">
      <div class="en" data-c>${en(b.line[0])}</div>${guide(b.line[1], b.line[2])}</div>`).join("");
  return `<div class="pic"${h ? ` style="flex:none;height:${h}mm;min-height:0"` : ""}><img src="file://${file}"${pos ? ` style="object-position:${pos}"` : ""}>${old ? `<span class="tag">stand-in: the old picture</span>` : ""}${bub}</div>`;
}
// a speaker: a face (the initial until the reference faces are drawn) with the name under it
const face = (w) => (/^S\d$/.test(w) ? `<div class="av" style="--w:${WHO[w] || INK}"><span class="fc" data-c>${esc(w)}</span></div>`
  : `<div class="av" style="--w:${WHO[w] || INK}">${fs.existsSync(path.join(__dirname, "art/faces", w + ".png")) ? `<img class="fc" src="file://${path.join(__dirname, "art/faces", w + ".png")}">` : `<span class="fc">${esc(w[0])}</span>`}<small data-c>${esc(w)}</small></div>`);
const dialogue = (lines) => `<div class="dlg">${lines.map(([w, e, h, m]) => `<div class="ln" style="--w:${WHO[w] || INK}">${face(w)}<div class="card"><div class="en" data-c>${en(e)}</div>${guide(h, m)}</div></div>`).join("")}</div>`;
let KINDS = {};
// a part with nocheck: its words aren't text in the book (drawn into a picture there), so the text check skips them
const renderParts = (parts) => (parts || []).map((p) => { const k = Object.keys(KINDS).find((x) => x in p); if (!k) throw new Error("unknown part: " + JSON.stringify(p).slice(0, 80)); const v = p[k], q = v && typeof v === "object" && !Array.isArray(v) && k !== "note" ? { ...p, ...v } : p; const h = KINDS[k](q); return p.nocheck ? h.replace(/ data-c/g, " data-x") : h; }).join("");
const taskHead = (k, [t, m], game = "") => `<div class="task"><span class="k" data-c>${k}</span><div class="tt"><div class="t" data-c>${en(t)}</div><div class="tm">${esc(m)}</div></div>${icons(t)}${game}</div>`;

let PAGE = 0, CONT_DONE = false; // the page being made, and whether its run-on exercise's game is placed
function block(b) {
  // a page's first block without a heading, when the page has a game for an exercise run on from the page before
  if (!b.practise && !b.n && !b.k && !CONT_DONE && GAMES[`${PAGE}:cont`]) { CONT_DONE = true; return `<div class="mqrow">${miniQr(`${PAGE}:cont`)}</div>` + block(b); }
  if (b.practise) return `<div class="practise"><span class="rib"><span class="emo">✏️</span><span data-c>Let’s practise</span></span><i>চলো অনুশীলন করি</i></div>`;
  if (b.n) {
    let body = "";
    if (b.items) body = b.items.map((it) => `<div class="item"><span class="mk" data-c>${it.mark}</span>${dialogue(it.lines)}</div>`).join("");
    if (b.choose) body = b.choose.map((c) => `<div class="choose"><div class="q1"><div class="en" data-c>${en(c.q[0])}</div>${guide(c.q[1], c.q[2])}</div>
      <div class="opts">${c.options.map(([mk, e, h, m]) => `<div class="opt"><span class="tick"></span><span class="mk" data-c>${mk}</span><div><div class="en" data-c>${en(e)}</div>${guide(h, m)}</div></div>`).join("")}</div></div>`).join("");
    if (b.questions) body = `<div class="qs">${b.questions.map(([mk, e, h, m]) => `<div class="q"><span class="mk" data-c>${mk}</span><div><div class="en" data-c>${en(e)}</div>${guide(h, m)}</div></div>`).join("")}</div>`;
    return `<div class="ex">${taskHead(b.n + ".", b.task, miniQr(`${PAGE}:n:${b.n}`))}${body}${renderParts(b.parts)}</div>`;
  }
  let out = b.task ? taskHead(b.k ? b.k + "." : "", b.task, b.k ? miniQr(`${PAGE}:k:${b.k}`) : "") : "";
  if (b.pic) out += picture(b.pic, b.bubbles);
  if (b.lines) out += dialogue(b.lines);
  if (b.drill) out += `<div class="drill">${b.drill.map((d) => `<div class="dr" style="--w:${WHO[d.who] || INK}">${face(d.who)}<div class="drl">${d.lines.map(([e, h, m]) => `<div class="card"><div class="en" data-c>${en(e)}</div>${guide(h, m)}</div>`).join("")}</div></div>`).join("")}
    ${b.more ? `<div class="more"><span data-c>${esc(b.more[0])}</span> <i>${esc(b.more[1])}</i></div>` : ""}</div>`;
  out += renderParts(b.parts);
  return `<div class="blk">${out}</div>`;
}

function pageHtml(P, pg) {
  const [c, soft, deep] = COLORS[P.unit];
  const qr = `<a class="qr" href="${LINK(pg.page)}"><div class="qrc">${qrSvg(LINK(pg.page))}</div><div class="qrt"><b>Scan me!</b><span>Listen &amp; play</span><small>${codes.pages[pageKey(pg.page)]}</small></div></a>`;
  const title = `<div class="ttl"><span class="lno">Lesson ${pg.lesson}</span><h1 data-h>${esc(pg.title[0])}</h1><span class="lbn">${esc(pg.title[1])}</span></div>`;
  const strip = `<div class="strip"><span class="brand">English for Today <i>Class Three</i></span><span class="upill">Unit ${P.unit} · ${esc(P.title[0])}</span></div>`;
  const head = pg.opener
    ? `<header class="opener"><svg class="sky" viewBox="0 0 200 60" preserveAspectRatio="none">
          <defs><linearGradient id="og${P.unit}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${deep}"/></linearGradient></defs>
          <path d="M0 0H200V48C170 60 140 54 110 50S50 46 0 56Z" fill="url(#og${P.unit})"/>
          <circle cx="186" cy="8" r="18" fill="#fff" opacity=".10"/><circle cx="150" cy="50" r="6" fill="#fff" opacity=".14"/><circle cx="96" cy="8" r="4" fill="#fff" opacity=".16"/>
          ${STAR(14, 50, .32, "#FDE047")}${STAR(34, 53, .2, "#fff")}${STAR(166, 45, .3, "#FDE047")}${STAR(188, 50, .22, "#fff")}</svg>
        <div class="ubadge"><small>Unit</small><b>${P.unit}</b></div>
        <div class="ut"><span class="utt" data-h>${esc(P.title[0])}</span><span class="ubn">${esc(P.title[1])}</span></div>${qr}</header>
       <header class="top">${title}</header>`
    : `${strip}<header class="top">${title}${qr}</header>`;
  return `<section class="page${pg.opener ? " is-opener" : ""}${pg.dense ? " dense" : ""}" data-page="${pg.page}" style="--c:${c};--s:${soft};--d:${deep}">
    <svg class="deco" viewBox="0 0 100 130" preserveAspectRatio="none"><circle cx="104" cy="70" r="16" fill="${soft}"/><circle cx="-6" cy="104" r="12" fill="${soft}"/></svg>
    ${head}
    <main class="body">${((PAGE = pg.page), (CONT_DONE = false), pg.blocks.map((b) => block(b)).join(""))}</main>
    <footer><span class="fb">English for Today · Class Three</span><span class="pn">${pg.page}</span><span class="fe">eBidyaloy · interactive edition</span></footer>
  </section>`;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Baloo+2:wght@600;700;800&family=Baloo+Da+2:wght@600;700;800&family=Noto+Sans+Bengali:wght@400;500;600;700&family=Noto+Color+Emoji&display=block');
@page { size: 194.6mm 255.5mm; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
body { font-family: 'Andika', 'Noto Sans Bengali', sans-serif; color: ${INK}; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page { width: 194.6mm; height: 255.5mm; position: relative; overflow: hidden; page-break-after: always; display: flex; flex-direction: column;
  padding: 0 11mm; background: radial-gradient(circle, color-mix(in srgb, var(--c) 9%, transparent) .9px, transparent 1.3px) 0 0 / 5mm 5mm, #fff }
.page > * { position: relative; z-index: 1 }
.page > .deco { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0 }
.tm, .lbn, .ubn, .guide, .practise i, .more i { font-family: 'Noto Sans Bengali', sans-serif }
.emo { font-family: 'Noto Color Emoji'; font-weight: 400 }
/* the running strip and the page's title (as Let's Learn English's pages) */
.strip { display: flex; justify-content: space-between; align-items: center; margin: 0 -11mm; padding: 2.6mm 11mm 2.2mm; border-bottom: .8mm solid var(--c);
  background: linear-gradient(90deg, var(--s), #fff 70%) }
.brand { font: 800 10.5pt 'Baloo 2'; color: var(--c) } .brand i { font-style: normal; font-size: 8pt; color: #64748B; margin-left: 1mm }
.upill { font: 700 8pt 'Baloo 2'; color: #fff; background: var(--c); padding: .7mm 3.4mm .4mm; border-radius: 99px; max-width: 110mm; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; box-shadow: 0 .5mm 0 var(--d) }
header.top { display: flex; align-items: center; gap: 3mm; padding: 3mm 0 2.6mm }
.ttl { flex: 1; display: flex; align-items: baseline; flex-wrap: wrap; column-gap: 2.6mm; min-width: 0 }
.lno { font: 800 9pt 'Baloo 2'; color: #fff; background: #F59E0B; padding: .5mm 2.6mm .2mm; border-radius: 99px; box-shadow: 0 .5mm 0 #B45309; transform: translateY(-1.4mm) }
.ttl h1 { font: 800 25pt/1 'Baloo 2'; color: var(--c); letter-spacing: -.2pt }
.lbn { font: 700 12pt 'Baloo Da 2'; color: #C2410C }
.qr { flex: none; display: flex; align-items: center; gap: 1.8mm; text-decoration: none; color: inherit; background: #fff; border: .6mm solid #FBBF24; border-radius: 3.4mm; padding: 1.2mm 2.2mm 1.2mm 1.2mm; box-shadow: 0 .8mm 0 #F59E0B }
.qrc { width: 15mm; height: 15mm } .qrc svg { width: 100%; height: 100% }
.qrt { display: flex; flex-direction: column; line-height: 1.05 }
.qrt b { font: 800 10.5pt 'Baloo 2'; color: var(--c) } .qrt span { font: 800 8pt 'Baloo 2'; color: #EA580C } .qrt small { font: 700 6.5pt 'Andika'; color: #94A3B8; margin-top: .6mm }
/* the unit opener */
header.opener { margin: 0 -11mm; height: 50mm; padding: 7mm 11mm 0; display: flex; align-items: flex-start; gap: 4mm }
.opener .sky { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0 }
.opener > :not(.sky) { position: relative; z-index: 1 }
.ubadge { flex: none; width: 23mm; height: 23mm; border-radius: 50%; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 1.2mm 0 rgba(0,0,0,.18); border: 1mm solid #FDE047 }
.ubadge small { font: 800 8pt/1 'Baloo 2'; color: var(--d) } .ubadge b { font: 800 22pt/1 'Baloo 2'; color: var(--c) }
.ut { flex: 1; display: flex; flex-direction: column; color: #fff; gap: 1mm; padding-top: 1mm }
.utt { font: 800 19.5pt/1.08 'Baloo 2'; text-shadow: 0 .6mm 0 rgba(0,0,0,.15) }
.ubn { font-size: 11pt; font-weight: 600; color: #FEF9C3 }
.opener .qr { border-color: #fff; box-shadow: 0 .8mm 0 rgba(0,0,0,.18) }
.is-opener header.top { padding-top: 0 }
/* the body: a picture takes what's left */
.body { flex: 1; display: flex; flex-direction: column; gap: 2.6mm; min-height: 0 }
.blk { display: flex; flex-direction: column; gap: 2.4mm; min-height: 0; flex: 1 1 auto }
.blk:not(:has(.pic)) { flex: 0 0 auto }
.task { display: flex; align-items: center; gap: 2.2mm }
.k { flex: none; width: 8mm; height: 8mm; border-radius: 50%; background: var(--c); color: #fff; font: 800 12pt/8.6mm 'Baloo 2'; text-align: center; box-shadow: 0 .7mm 0 var(--d) }
.tt { min-width: 0 }
.t { font: 700 13pt/1.2 'Andika'; color: var(--d) }
.tm { font-size: 9pt; font-weight: 600; color: #1D4ED8; line-height: 1.3; margin-top: .7mm }
.icons { display: flex; gap: 1mm; flex: none; margin-left: auto }
/* a page's second game: a small QR beside its exercise, a "Play" tab on its top edge; its negative margins keep the heading's
   height as it was */
.mq { position: relative; flex: none; display: block; padding: .6mm; border-radius: 2mm; background: #fff; border: .5mm solid var(--c);
  box-shadow: 0 .6mm 0 var(--s); margin: -1.2mm 0 -1.2mm 1.6mm; text-decoration: none }
.mqc { width: 9.5mm; height: 9.5mm; display: block } .mqc svg { width: 100%; height: 100%; display: block }
.mqb { position: absolute; left: 50%; top: -2.7mm; transform: translateX(-50%); font: 800 6.2pt/3mm 'Baloo 2'; color: #fff; background: var(--c);
  padding: 0 1.5mm; border-radius: 99px; white-space: nowrap; box-shadow: 0 .4mm 0 var(--d) }
.mqrow { display: flex; justify-content: flex-end; margin-bottom: -1mm }
.ic { width: 7.4mm; height: 7.4mm; border-radius: 2.2mm; padding: 1mm; box-shadow: 0 .6mm 0 rgba(0,0,0,.18) }
.pic { position: relative; flex: 1 1 0; min-height: 52mm; max-height: 104mm; border-radius: 5mm; overflow: hidden; border: 1mm solid #fff;
  box-shadow: 0 0 0 .8mm var(--c), 0 2mm 0 .8mm var(--s) }
.pic img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 28%; display: block }
.tag { position: absolute; right: 2mm; bottom: 2mm; font: 700 6.5pt 'Andika'; color: #fff; background: rgba(0,0,0,.45); padding: .3mm 1.6mm; border-radius: 99px }
.bubble { position: absolute; background: #fff; border: .7mm solid var(--w); border-radius: 4.5mm; padding: 1.6mm 2.6mm 1.4mm; box-shadow: 0 1mm 0 color-mix(in srgb, var(--w) 40%, transparent) }
.bubble .en { font: 700 11.5pt/1.2 'Andika'; color: ${INK} }
.bubble .guide { font-size: 7.6pt; margin-top: .6mm; display: block }
.bubble .guide .sep { display: none } .bubble .guide .mean { display: block }
.bubble::after { content: ""; position: absolute; bottom: -3.4mm; width: 5mm; height: 5mm; background: #fff; border-right: .7mm solid var(--w); border-bottom: .7mm solid var(--w); transform: rotate(45deg) skew(8deg, 8deg) }
.bubble.down-left::after { left: 6mm } .bubble.down-right::after { right: 6mm }
/* a speaker: the face and the line in a card of the speaker's colour */
.dlg { display: flex; flex-direction: column; gap: 1.8mm }
.ln { display: flex; align-items: center; gap: 2.2mm }
.av { flex: none; width: 13mm; display: flex; flex-direction: column; align-items: center; gap: .3mm }
.fc { width: 9mm; height: 9mm; border-radius: 50%; background: var(--w); color: #fff; font: 800 12pt/9.4mm 'Baloo 2'; text-align: center; border: .6mm solid #fff; box-shadow: 0 0 0 .5mm var(--w) }
img.fc { object-fit: cover; background: #fff; padding: 0 }
.av small { font: 700 7.5pt/1 'Andika'; color: var(--w); white-space: nowrap }
.card { flex: 1; background: color-mix(in srgb, var(--w) 9%, #fff); border: .4mm solid color-mix(in srgb, var(--w) 30%, #fff); border-left: 1.4mm solid var(--w); border-radius: 3mm; padding: 1.4mm 3mm 1.4mm }
.en { font: 700 12.5pt/1.28 'Andika'; color: ${INK} }
.guide { font-size: 8.8pt; line-height: 1.38 }
.hint { color: #C2410C; font-weight: 500 } .hint strong { font-weight: 700 }
.lm { font-family: 'Andika'; font-weight: 700; margin: 0 .2mm }
.mean { color: #1D4ED8; font-weight: 600 }
.sep { margin: 0 1.4mm; color: #CBD5E1 }
.gb { display: inline-block; width: 6mm; border-bottom: .3mm solid currentColor; vertical-align: .3mm }
.box { display: inline-block; height: 7.2mm; vertical-align: -2mm; border: .5mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .6mm }
u { text-decoration-color: #EA580C; text-decoration-thickness: .6mm; text-underline-offset: .8mm }
/* practice: a ribbon, then each exercise in a soft yellow card */
.practise { display: flex; align-items: center; gap: 2.4mm; padding-top: .6mm }
.rib { display: inline-flex; align-items: center; gap: 1.6mm; font: 800 14pt/1 'Baloo 2'; color: #fff; background: linear-gradient(90deg, #F97316, #EC4899); padding: 1.6mm 5mm 1.2mm 3mm; border-radius: 99px 3mm 3mm 99px; box-shadow: 0 .8mm 0 #BE185D }
.practise i { font-style: normal; font-size: 10pt; font-weight: 600; color: #BE185D }
.ex { display: flex; flex-direction: column; gap: 1.8mm; background: #FFFBEB; border: .5mm dashed #FBBF24; border-radius: 4mm; padding: 2mm 3mm 2.4mm }
.item { display: grid; grid-template-columns: 7mm 1fr; column-gap: 1mm }
.mk { font: 800 12.5pt/1.3 'Baloo 2'; color: #EA580C }
.item .mk { padding-top: 3mm }
.choose { display: flex; flex-direction: column; gap: .8mm; padding-left: 10mm }
.q1 .en { color: var(--d) }
.opts { display: flex; flex-direction: column; gap: 1.4mm; margin-top: 1mm }
.opt { display: grid; grid-template-columns: 7mm 6mm 1fr; column-gap: 1.6mm; align-items: start; background: #fff; border-radius: 2.6mm; padding: 1.2mm 2mm; border: .4mm solid #FDE68A }
.tick { width: 5.6mm; height: 5.6mm; border: .5mm solid #F59E0B; border-radius: 1.4mm; background: #fff; margin-top: .6mm }
.qs { display: flex; flex-direction: column; gap: 1.6mm; padding-left: 10mm }
.q { display: grid; grid-template-columns: 7mm 1fr; column-gap: 1mm; background: #fff; border-radius: 2.6mm; padding: 1.2mm 2mm; border: .4mm solid #FDE68A }
.drill { display: flex; flex-direction: column; gap: 2.2mm }
.dr { display: flex; gap: 2.2mm; align-items: flex-start }
.drl { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 1.6mm }
.more { padding-left: 15mm; font: 700 12pt 'Andika'; color: var(--d) } .more i { font-style: normal; font-size: 9pt; color: #1D4ED8 }
footer { flex: none; display: flex; align-items: center; justify-content: space-between; height: 13mm; font: 700 7.5pt 'Baloo 2' }
/* a crowded page (pg.dense): a little smaller everywhere */
.dense .en { font-size: 11.2pt } .dense .guide { font-size: 7.8pt } .dense .t { font-size: 12pt } .dense .tm { font-size: 8.4pt; margin-top: 0 }
.dense .body { gap: 1.8mm } .dense .blk, .dense .ex { gap: 1.4mm } .dense .dlg { gap: 1.2mm } .dense header.top { padding: 2mm 0 1.6mm }
.fb { color: var(--c) } .fe { color: #F59E0B }
.pn { width: 10mm; height: 10mm; border-radius: 50%; background: var(--c); color: #fff; font: 800 12pt/10.4mm 'Baloo 2'; text-align: center; border: .7mm solid #fff; box-shadow: 0 0 0 .6mm var(--c) }
`;

/** The book's own words on a page (its printed page n), without the running header and footer. */
function bookWords(n, pg, P) {
  const raw = execFileSync("pdftotext", ["-f", String(n + FRONT), "-l", String(n + FRONT), "-layout", BOOK_PDF, "-"]).toString();
  let t = raw.split("\n").filter((l) => !/^\s*(glish for T|En\s+oday|En|oday|Unit \d+|\d+|2026)\s*$/.test(l)).join("\n");
  t = t.replace(/(^|\s{3,})2026(?=\s{3,}|$)/gm, " "); // the print year in the margin, on a line of its own text
  for (const s of [P.title[0], pg.title[0]]) for (const part of s.split(/,?\s+(?=Introductions)/)) t = t.replace(part, " ");
  t = t.replace(/\bUnit \d+\b/g, " "); // the unit label beside a unit's title
  return words(t);
}
const words = (t) => (String(t).replace(/[’‘]/g, "'").match(/[A-Za-z0-9]+(?:'[A-Za-z]+)?/g) || []).filter((w) => !/^\d+$/.test(w) || w.length > 1);

// the names: a capitalised English word in mid-sentence, paired with its hint word where a line's words and hint words
// match one to one
(function collectNames() {
  const LAT = /[A-Za-z]/, BN = /[\u0980-\u09FF]/;
  const ORDINARY = /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|January|February|March|April|May|June|July|August|September|October|November|December|I|I'm|I'll|I've)$/;
  const visit = (x) => {
    if (!Array.isArray(x)) { if (x && typeof x === "object") Object.values(x).forEach(visit); return; }
    for (let i = 0; i + 1 < x.length; i++) {
      const e = x[i], h = x[i + 1];
      if (typeof e !== "string" || typeof h !== "string" || !LAT.test(e) || BN.test(e) || !BN.test(h)) continue;
      const toks = [...e.replace(/[’‘]/g, "'").matchAll(/[A-Za-z]+(?:'[A-Za-z]+)?/g)], hw = h.split(/\s+/).map(bareBn).filter((t) => BN.test(t));
      if (toks.length !== hw.length) continue;
      toks.forEach((t, k) => {
        const before = e.slice(0, t.index).replace(/[\s“‘"'(]+$/, "");
        if (/^[A-Z][a-z]/.test(t[0]) && before && !/[.?!:]$/.test(before) && !/^[A-Z]{1,2}\d*:?$/.test(before.split(/\s+/).pop()) && !ORDINARY.test(t[0])) NO_PUFF.add(hw[k]);
      });
    }
    x.forEach(visit);
  };
  for (const P of PARTS) for (const pg of P.pages) visit(pg.blocks);
})();
const H = { esc, en, guide, hint, mean, picture, dialogue, WHO, INK, art };
const BASE = require("./parts.js")(H);
KINDS = { ...BASE.kinds };
let EXTRA_CSS = BASE.css, SCRIPTS = [BASE.script];
for (const u of UNIT_NAMES) { const f = path.join(__dirname, "content", u + ".parts.js"); if (fs.existsSync(f)) { const x = require(f)(H); Object.assign(KINDS, x.kinds || {}); EXTRA_CSS += x.css || ""; if (x.script) SCRIPTS.push(x.script); } }

(async () => {
  const pages = PARTS.flatMap((P) => P.pages.map((pg) => ({ P, pg })));
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}${EXTRA_CSS}</style></head><body>${pages.map(({ P, pg }) => pageHtml(P, pg)).join("")}</body></html>`;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const htmlFile = path.join(OUT_DIR, `pages-${WHOLE ? "all" : UNIT_NAMES.join("-")}.html`);
  fs.writeFileSync(htmlFile, html);
  const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--no-sandbox", "--allow-file-access-from-files"] });
  const page = await b.newPage();
  await page.goto("file://" + htmlFile, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  for (const js of SCRIPTS) await page.evaluate(js);
  // each picture's copy: the long side it needs where the page shows it largest (object-fit: cover fills its box)
  const shown = await page.evaluate(() => [...document.images].map((i) => { const r = i.getBoundingClientRect(); return [decodeURI(i.src.replace(/^file:\/\//, "")), r.width, r.height, i.naturalWidth, i.naturalHeight]; }));
  const need = {};
  for (const [src, w, h, nw, nh] of shown) {
    const rel = COPY_OF[src]; if (!rel || !w || !nw) continue;
    const px = Math.max(nw, nh) * Math.max(w / nw, h / nh) * (PRINT_DPI / 96);
    need[rel] = Math.max(need[rel] || 0, Math.min(PRINT_MAX, Math.max(PRINT_MIN, Math.ceil(px / 100) * 100)));
  }
  const resized = Object.keys(need).filter((rel) => need[rel] !== (SIZES[rel] || PRINT_MAX));
  if (resized.length && !process.env.EFT_SIZED) {
    // once more with the right sizes (the copies' file names carry their size, so the page HTML changes too)
    fs.writeFileSync(SIZES_FILE, JSON.stringify({ ...SIZES, ...need }, null, 1) + "\n");
    await b.close();
    console.log(`picture copies: ${resized.length} sized to the page; building again`);
    execFileSync(process.execPath, [__filename, ...process.argv.slice(2)], { stdio: "inherit", env: { ...process.env, EFT_SIZED: "1" } });
    return;
  }
  // nothing may run out of its page or its box
  const spills = await page.evaluate(() => {
    const out = [];
    for (const s of document.querySelectorAll(".page")) {
      const body = s.querySelector(".body"); if (!body) { out.push(`a .page without its body: ${s.className}`); continue; } const r = body.getBoundingClientRect();
      for (const el of body.querySelectorAll("*")) { const e = el.getBoundingClientRect(); if (e.height && e.bottom > r.bottom + 1) { out.push(`p${s.dataset.page} "${(el.innerText || el.className).slice(0, 30)}" runs ${Math.round(e.bottom - r.bottom)} px past the body`); break; } }
      for (const bb of s.querySelectorAll(".bubble")) { const pp = bb.closest(".pic"); if (!pp) continue; const p = pp.getBoundingClientRect(), e = bb.getBoundingClientRect(); if (e.right > p.right + 1 || e.bottom > p.bottom + 1) out.push(`p${s.dataset.page} a bubble leaves its picture`); }
      const pic = [...s.querySelectorAll(".pic")].filter((p) => !p.closest(".tpic") && !p.style.height).map((p) => Math.round(p.getBoundingClientRect().height / 3.78)); // a big picture that takes what's left (not one beside a text or of a set height)
      if (pic.some((h) => h < 52)) out.push(`p${s.dataset.page} picture squeezed to ${pic.join("/")} mm`);
    }
    return out;
  });
  const content = await page.evaluate(() => Object.fromEntries([...document.querySelectorAll(".page")].map((s) => [s.dataset.page, [...s.querySelectorAll(".body [data-c]")].map((e) => e.innerText).join(" ")])));
  const fontsOk = await page.evaluate(() => ["Andika", "Baloo 2", "Noto Sans Bengali"].filter((f) => !document.fonts.check(`${f === "Noto Sans Bengali" ? 500 : 700} 12pt '${f}'`, f === "Noto Sans Bengali" ? "অ" : "a")));
  // the whole book's pages 1–123 are the body front.js joins; a few units are just for checking
  const out = path.join(OUT_DIR, WHOLE ? "eft-class3-pages.pdf" : `eft-class3-${UNIT_NAMES.join("-")}.pdf`);
  await page.pdf({ path: out, width: "194.6mm", height: "255.5mm", printBackground: true, preferCSSPageSize: true });
  await b.close();
  // previews, named by the printed page
  const prefix = path.join(__dirname, "previews", `tmp${process.pid}`);
  execFileSync("pdftoppm", ["-r", "100", "-png", out, prefix]);
  pages.forEach(({ pg }, i) => {
    const from = fs.readdirSync(path.join(__dirname, "previews")).find((f) => new RegExp(`^tmp${process.pid}-0*${i + 1}\\.png$`).test(f));
    if (from) fs.renameSync(path.join(__dirname, "previews", from), path.join(__dirname, "previews", `page-${String(pg.page).padStart(3, "0")}.png`));
  });
  // the text check: the book's English words on each page, the same words on ours (in any order: bubbles move)
  const report = [];
  for (const { P, pg } of pages) {
    const want = bookWords(pg.page, pg, P), have = words(content[pg.page]);
    const count = (ws) => ws.reduce((m, w) => m.set(w, (m.get(w) || 0) + 1), new Map());
    const A = count(want), B = count(have), missing = [], extra = [];
    for (const [w, n] of A) if ((B.get(w) || 0) < n) missing.push(`${w}×${n - (B.get(w) || 0)}`);
    for (const [w, n] of B) if ((A.get(w) || 0) < n) extra.push(`${w}×${n - (A.get(w) || 0)}`);
    // a page's known differences (pg.allow: { missing: [words], extra: [words], why }), each word once per listing
    const allow = pg.allow || {}, drop = (list, ok) => { const left = [...(ok || [])]; return list.filter((x) => { const w = x.replace(/×\d+$/, ""), k = left.indexOf(w); if (k < 0) return true; left.splice(k, 1); return false; }); };
    const M = drop(missing, allow.missing), X = drop(extra, allow.extra);
    report.push(`p${pg.page}: ${want.length} words${M.length || X.length ? ` · MISSING ${M.join(" ") || "-"} · EXTRA ${X.join(" ") || "-"}` : " · the same"}${pg.allow ? ` (allowed: ${pg.allow.why})` : ""}`);
  }
  console.log(`wrote ${out} (${pages.length} pages) · fonts ${fontsOk.length ? "MISSING " + fontsOk.join(", ") : "ok"} · ${spills.length ? "SPILLS:\n  " + spills.join("\n  ") : "nothing spills"}`);
  console.log("text check against the book:\n  " + report.join("\n  "));
  const pagesBuilt = new Set(pages.map(({ pg }) => String(pg.page)));
  const games = Object.keys(GAMES).filter((at) => pagesBuilt.has(at.split(":")[0])), lost = games.filter((at) => !PLACED.has(at));
  console.log(`games' small QRs: ${games.reduce((n, at) => n + GAMES[at].length, 0)} on ${new Set(games.map((at) => at.split(":")[0])).size} pages${lost.length ? ` · NOT PLACED (no such exercise on the page): ${lost.join(", ")}` : " · all placed"}`);
  if (WHOLE) execFileSync(process.execPath, [path.join(__dirname, "front.js")], { stdio: "inherit" });
})();
