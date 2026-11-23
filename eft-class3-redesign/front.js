// The front of the book: a new cover and a new contents page (made from content/unit*.js, so the lesson titles and pages
// are the checked ones), around the book's own pages 2–5 kept exactly as printed (the title page, the credits, the
// preface and the Bangla note for teachers: vector text, sharp in print). Then the whole book in one PDF:
//   node front.js            → .work/out/front.pdf (cover + contents) and, when .work/out/eft-class3-pages.pdf is there
//                               (node build.js makes it, then runs this), eft-class3-book.pdf
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const HOME = process.env.HOME;
const puppeteer = require(path.join(HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules/puppeteer-core"));
const QR = require(path.join(HOME, "Downloads/Esho-Bhasha-Shikhi/node_modules/qrcode"));
const BOOK_PDF = path.join(__dirname, "source/eft-class3-nctb.pdf"); // NCTB's book (a copy of ~/Downloads/English Text Book Class_3.pdf)
const D = __dirname, OUT = path.join(D, ".work/out");
fs.mkdirSync(OUT, { recursive: true });
// The book's title page (its p2) stays as printed (its text, NCTB's logo, the ferns), but its picture is the new art: the
// Ant and the Grasshopper of Unit 8 (the same scene as the old drawing), framed in the page's own purple, drawn over the old
// picture (343 × 237 pt at 91, 175) a little wider so both friends fit (the user, 31 Oct 2026: "change image of page 2").
const TITLE_PIC = { art: "u8-l1-summer", focus: 0.46, x: 60, y: 175.2, w: 402, h: 237.4, color: "#702890" };
async function newTitlePicture(pagePdf) {
  const B = path.join(HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/node_modules");
  const sharp = require(path.join(B, "sharp")), { PDFDocument } = require(path.join(B, "pdf-lib"));
  const src = path.join(D, "art/new", TITLE_PIC.art + ".png");
  if (!fs.existsSync(src)) return console.warn(`title page: no ${TITLE_PIC.art}.png yet, its old picture stays`);
  // the picture at 300 dpi, cropped to the frame's shape around its focus, with a white border and a purple line
  const W = Math.round((TITLE_PIC.w / 72) * 300), H = Math.round((TITLE_PIC.h / 72) * 300), line = 9, white = 16, r = 60;
  const meta = await sharp(src).metadata(), ratio = (W - 2 * (line + white)) / (H - 2 * (line + white));
  const ch = Math.min(meta.height, Math.round(meta.width / ratio)), cw = Math.round(ch * ratio);
  const left = Math.max(0, Math.min(meta.width - cw, Math.round(meta.width * TITLE_PIC.focus - cw / 2)));
  const iw = W - 2 * (line + white), ih = H - 2 * (line + white), ir = r - line - white / 2;
  const pic = await sharp(src).extract({ left, top: Math.round((meta.height - ch) / 2), width: cw, height: ch }).resize(iw, ih)
    .composite([{ input: Buffer.from(`<svg width="${iw}" height="${ih}"><rect width="${iw}" height="${ih}" rx="${ir}" fill="#fff"/></svg>`), blend: "dest-in" }]).png().toBuffer();
  const frame = Buffer.from(`<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" rx="${r}" fill="${TITLE_PIC.color}"/>` +
    `<rect x="${line}" y="${line}" width="${W - 2 * line}" height="${H - 2 * line}" rx="${r - line}" fill="#fff"/></svg>`);
  const png = await sharp(frame).composite([{ input: pic, left: line + white, top: line + white }]).png({ compressionLevel: 9 }).toBuffer();
  const doc = await PDFDocument.load(fs.readFileSync(pagePdf));
  doc.getPage(0).drawImage(await doc.embedPng(png), { x: TITLE_PIC.x, y: TITLE_PIC.y, width: TITLE_PIC.w, height: TITLE_PIC.h });
  fs.writeFileSync(pagePdf, await doc.save());
}

const COLORS = { 1: "#2563EB", 2: "#16A34A", 3: "#9333EA", 4: "#EA580C", 5: "#DB2777", 6: "#0D9488", 7: "#0284C7", 8: "#DC2626" };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const codes = JSON.parse(fs.readFileSync(path.join(D, "codes.json"), "utf8"));
const BOOK_LINK = `https://ebidyaloy.com/b/${codes.book}`;
function qrSvg(text) {
  const m = QR.create(text, { errorCorrectionLevel: "M" }).modules, n = m.size;
  let d = "";
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (m.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
  return `<svg viewBox="-1 -1 ${n + 2} ${n + 2}" shape-rendering="crispEdges"><rect x="-1" y="-1" width="${n + 2}" height="${n + 2}" fill="#fff"/><path d="${d}" fill="#1E2433"/></svg>`;
}
const art = (n) => { for (const d of ["art/new", "art/stand-in"]) { const f = path.join(D, d, n + ".png"); if (fs.existsSync(f)) return "file://" + f; } return ""; };

// the rhyme lessons' titles as the book's contents page gives them (the pages themselves say only "Rhyme")
const TOC_TITLE = { "2.4": "Rhyme: It’s a Happy House", "3.3": "Rhyme: Hello Hello", "4.3": "Rhyme: Row, Row, Row Your Boat", "5.5": "Rhyme: Rain Rain Go Away", "7.4": "Rhyme: Sing a Rainbow" };
// the units and their lessons, from the content files
const units = [];
for (let n = 1; n <= 8; n++) {
  const f = path.join(D, "content", `unit${n}.js`);
  if (!fs.existsSync(f)) continue;
  const U = require(f), lessons = [];
  for (const pg of U.pages) if (pg.lesson && !lessons.some((l) => l.n === pg.lesson)) lessons.push({ n: pg.lesson, title: TOC_TITLE[`${n}.${pg.lesson}`] ? [TOC_TITLE[`${n}.${pg.lesson}`]] : pg.title, page: pg.page });
  units.push({ n, title: U.title, lessons, color: COLORS[n] });
}

const STAR = (x, y, s, f) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-10 2.9-3.1 10-3.1 4.3 1.2 6.5 8.1 0 3.9-6.5 8.1-4.3 1.2-10-3.1-2.9-3.1Z" fill="${f}"/>`;
const cover = `<section class="page cover">
  <svg class="sky" viewBox="0 0 200 260" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2563EB"/><stop offset=".55" stop-color="#7C3AED"/><stop offset="1" stop-color="#DB2777"/></linearGradient></defs>
    <rect width="200" height="260" fill="url(#g)"/><circle cx="178" cy="22" r="30" fill="#fff" opacity=".08"/><circle cx="20" cy="200" r="40" fill="#fff" opacity=".07"/>
    ${STAR(30, 30, .7, "#FDE047")}${STAR(170, 70, .45, "#fff")}${STAR(16, 120, .35, "#fff")}${STAR(186, 150, .55, "#FDE047")}${STAR(60, 228, .3, "#fff")}</svg>
  <div class="ct">
    <div class="badge">eBidyaloy · interactive edition</div>
    <h1>English <span>for</span> Today</h1>
    <div class="cls">Class Three</div>
    <div class="bn">ইংরেজি পাঠ, বাংলায় উচ্চারণ আর অর্থসহ (ব্রিটিশ ইংরেজি)</div>
  </div>
  <div class="hero"><img src="${art("u1-l5-swing")}"></div>
  <div class="scan"><a class="q" href="${BOOK_LINK}" style="display:block">${qrSvg(BOOK_LINK)}</a><div><b>Scan the QR on every page</b><span>to listen, say and play on eBidyaloy</span><i>প্রতিটি পাতার QR স্ক্যান করো: শোনো, বলো আর খেলো</i></div></div>
  <div class="nctb">National Curriculum and Textbook Board, Bangladesh</div>
</section>`;

const contents = `<section class="page toc">
  <h1>Contents <span>সূচিপত্র</span></h1>
  <div class="cols">${units.map((u) => `<div class="unit" style="--c:${u.color}">
    <div class="uh"><span class="un">Unit ${u.n}</span><b>${esc(u.title[0])}</b><small>${esc(u.title[1])}</small></div>
    ${u.lessons.map((l) => `<div class="ln"><span class="lnum">Lesson ${l.n}</span><span class="lt">${esc(l.title[0])}</span><span class="dots"></span><span class="pg">${l.page}</span></div>`).join("")}
  </div>`).join("")}</div>
  <footer><span class="pn">•</span></footer>
</section>`;

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Baloo+2:wght@600;700;800&family=Noto+Sans+Bengali:wght@500;600;700&display=block');
@page { size: 194.6mm 255.5mm; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: 'Andika', 'Noto Sans Bengali', sans-serif; color: #1E2433 }
.page { width: 194.6mm; height: 255.5mm; position: relative; overflow: hidden; page-break-after: always }
.cover .sky { position: absolute; inset: 0; width: 100%; height: 100% }
.cover > :not(.sky) { position: relative }
.ct { text-align: center; padding-top: 16mm; color: #fff }
.badge { display: inline-block; background: #FDE047; color: #6B21A8; font: 800 11pt 'Baloo 2'; padding: 1mm 5mm .4mm; border-radius: 99px; box-shadow: 0 1mm 0 rgba(0,0,0,.2) }
.cover h1 { font: 800 50pt/1 'Baloo 2'; margin-top: 6mm; text-shadow: 0 1.4mm 0 rgba(0,0,0,.2) }
.cover h1 span { color: #FDE047 }
.cls { display: inline-block; margin-top: 3mm; font: 800 22pt 'Baloo 2'; background: #fff; color: #DB2777; padding: 1mm 8mm .2mm; border-radius: 99px; box-shadow: 0 1.2mm 0 rgba(0,0,0,.2) }
.ct .bn { margin-top: 4mm; font: 600 11.5pt 'Noto Sans Bengali'; color: #FEF9C3 }
.hero { margin: 8mm auto 0; width: 170mm; height: 68mm; border-radius: 8mm; overflow: hidden; border: 1.6mm solid #fff; box-shadow: 0 2.4mm 0 rgba(0,0,0,.2) }
.hero img { width: 100%; height: 100%; object-fit: cover }
.scan { margin: 9mm auto 0; width: 150mm; display: flex; gap: 4mm; align-items: center; background: #fff; border-radius: 5mm; padding: 3mm; border: .8mm solid #FDE047; box-shadow: 0 1.2mm 0 rgba(0,0,0,.2) }
.scan .q { width: 24mm; height: 24mm; flex: none } .scan .q svg { width: 100%; height: 100% }
.scan b { display: block; font: 800 15pt 'Baloo 2'; color: #6B21A8 } .scan span { display: block; font: 700 11pt 'Baloo 2'; color: #EA580C } .scan i { display: block; font: 600 9.5pt 'Noto Sans Bengali'; font-style: normal; color: #1D4ED8; margin-top: .6mm }
.cover .nctb { position: absolute; left: 0; right: 0; bottom: 9mm; text-align: center; color: #fff; font: 700 11pt 'Baloo 2' }
.toc { padding: 8mm 12mm 0; background: radial-gradient(circle, rgba(37,99,235,.08) .9px, transparent 1.3px) 0 0 / 5mm 5mm, #fff }
.toc h1 { font: 800 24pt 'Baloo 2'; color: #2563EB } .toc h1 span { font: 700 14pt 'Noto Sans Bengali'; color: #C2410C; margin-left: 3mm }
.cols { margin-top: 2mm; columns: 2; column-gap: 6mm }
.unit { break-inside: avoid; margin-bottom: 3mm; border: .6mm solid var(--c); border-radius: 4mm; overflow: hidden; background: #fff }
.uh { background: var(--c); color: #fff; padding: 1.2mm 3mm 1mm }
.un { display: inline-block; background: #fff; color: var(--c); font: 800 8.5pt 'Baloo 2'; padding: .3mm 2.4mm 0; border-radius: 99px; margin-right: 1.6mm }
.uh b { font: 800 10.5pt/1.15 'Baloo 2' } .uh small { display: block; font: 600 8pt 'Noto Sans Bengali'; opacity: .95 }
.ln { display: flex; align-items: baseline; gap: 1.4mm; padding: .45mm 3mm; font-size: 8.6pt; line-height: 1.25 }
.ln:nth-child(odd) { background: color-mix(in srgb, var(--c) 7%, #fff) }
.lnum { flex: none; font: 700 7.6pt 'Baloo 2'; color: var(--c) } .lt { font-weight: 700 } .dots { flex: 1; border-bottom: .3mm dotted #CBD5E1 } .pg { font: 800 10pt 'Baloo 2'; color: var(--c) }
.toc footer { position: absolute; left: 0; right: 0; bottom: 6mm; text-align: center; color: #CBD5E1 }
`;

(async () => {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${cover}${contents}</body></html>`;
  const hf = path.join(OUT, "front.html");
  fs.writeFileSync(hf, html);
  const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--allow-file-access-from-files"] });
  const p = await b.newPage();
  await p.goto("file://" + hf, { waitUntil: "networkidle0" });
  await p.evaluate(() => document.fonts.ready);
  const spill = await p.evaluate(() => { const t = document.querySelector(".toc").getBoundingClientRect(); return [...document.querySelectorAll(".toc .unit")].some((u) => { const r = u.getBoundingClientRect(); return r.right > t.right - 30 || r.bottom > t.bottom - 40; }); });
  await p.pdf({ path: path.join(OUT, "front.pdf"), width: "194.6mm", height: "255.5mm", printBackground: true, preferCSSPageSize: true });
  await b.close();
  execFileSync("pdftoppm", ["-r", "70", "-png", path.join(OUT, "front.pdf"), path.join(D, "previews", "front")]);
  console.log(`front.pdf: cover + contents (${units.length} units) · contents ${spill ? "SPILLS" : "fits"}`);
  // the whole book: cover, the book's own pages 2–5, contents, then pages 1–124
  const body = path.join(OUT, "eft-class3-pages.pdf");
  if (fs.existsSync(body)) {
    const t = path.join(D, ".work", "front-parts"); fs.mkdirSync(t, { recursive: true });
    execFileSync("pdfseparate", ["-f", "1", "-l", "2", path.join(OUT, "front.pdf"), path.join(t, "ours-%d.pdf")]);
    execFileSync("pdfseparate", ["-f", "2", "-l", "5", BOOK_PDF, path.join(t, "book-%d.pdf")]);
    await newTitlePicture(path.join(t, "book-2.pdf"));
    const parts = [path.join(t, "ours-1.pdf"), ...[2, 3, 4, 5].map((k) => path.join(t, `book-${k}.pdf`)), path.join(t, "ours-2.pdf"), body];
    execFileSync("pdfunite", [...parts, path.join(D, "eft-class3-book.pdf")]);
    console.log("eft-class3-book.pdf: cover · title page, credits, preface, note for teachers (as printed) · contents · pages 1–124");
  }
})();
