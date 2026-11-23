# How to write pages of the Class 2 math redesign (for the helpers)

The project is NCTB's *প্রাথমিক গণিত, দ্বিতীয় শ্রেণি* (2026), rebuilt page for page in a colourful, child-friendly look. Read `README.md` first.

The finished model is printed pages 1–10:
- the content is `content/p001-010.js`;
- the pictures are `previews/page-001.png` … `page-010.png`.

Look at them before you start, and match their look and density.

## Your job
- **Write your printed pages** in `content/pXXX-YYY.js` (your range, e.g. `p040-055.js`), exporting `{ pages: [...] }`.
- **Your own kinds of content** go in `content/pXXX-YYY.parts.js`, if you need any (see "Your own kinds").
- **Your pictures for ChatGPT** go in `PICTURE-PROMPTS-pXXX-YYY.md` (see "Pictures").
- **Do not edit** `build.js`, `SPEC.md`, `README.md` or other helpers' files. Other helpers work at the same time on other page ranges. If you need something from the core, build it in your parts file and mention it in your report.

## Reading the book
- **The book:** `~/Downloads/Class-2, Math_compressed.pdf`. Printed page n is PDF page n + 9.
- **Render a page to read it**, e.g. `pdftoppm -f 49 -l 49 -r 150 -png "<book>" /tmp-scratch/p` for printed page 40. Use your own scratch folder, never the project folder. Look at it with the Read tool. Zoom by cropping when the print is small.
- **Every word as printed.**
  - Use Bangla digits (০–৯) as printed.
  - Use the book's punctuation: । ? : , ! and its dashes (–).
  - Use maths signs: + − × ÷ = < >. Use the real minus sign "−", not a hyphen.
  - If the book has a slip, keep it and list it in your report.
- **Keep the text NFC.** Write Bangla only with the Write/Edit tools or node, never sed/perl.
- **Chapter openers** (the first page of a chapter, e.g. p40 দ্বিতীয় অধ্যায় · যোগ ও বিয়োগ) take `opener: { n: "দ্বিতীয় অধ্যায়", title: "যোগ ও বিয়োগ" }`. A lesson's heading (যোগ (১), গুণের ধারণা …) is the page's `title`.
- **Leave out the running header** "প্রাথমিক গণিত" and the page number; the frame adds its own.

## A page
```js
{ page: 40, opener: {...}?, title: "যোগ (১)"?, dense: true?, spread: true?, allow: ["…"]?, art: [{ pic, x, y, w, h }]?, blocks: [ … ] }
```
- **`dense`:** a crowded page (smaller gaps).
- **`spread`:** a page with room to spare (the blocks spread down the page).
- **`allow`:** words the OCR text check misreads, each checked by eye; add a comment saying why.
- **`art`:** a free picture placed in mm from the page's top-left. Use it rarely.

## The kinds of content (blocks)
All text goes through the markup:
- `□` is an empty answer box;
- `[[৩৭]]` is a filled answer box (the book's worked example);
- `___` (3 or more) is a writing line;
- `**x**` is bold;
- `\n` is a new line.

| Block | What it is |
|---|---|
| `{ ask: "…" }` | The book's "?" question bubble (a yellow pill with a ?) |
| `{ text: "…", big?, center?, box?: "৩৪৫" }` | A line of text; `big` for the book's coloured lead-in lines ("ফুলের পরিবর্তে…") |
| `{ say: "boy" \| "girl", mood: "think" \| "talk", text }` | One of the two children speaking (the book's bubbles with the boy or girl). Boy on the left, girl on the right. `think` = finger on chin (asking, wondering), `talk` = explaining |
| `{ note: "…" }` | A highlighted line (the book's tinted "চলো আমরা…" boxes) |
| `{ sub: "…" }` | A subheading with a blue dot (the book's ● headings) |
| `{ practise: "নিজে করি" }` | The "নিজে করি" ribbon (also for অনুশীলন if the book has it) |
| `{ ex: "১", text, body: [blocks], dot?: false }` | A numbered exercise in a yellow card; `text: null` for a card without a heading |
| `{ nums: ["২৪", "৪৭", …] }` | Numbers as chips |
| `{ table: { head, rows, tone: blue\|green\|pink\|yellow, small?, width?, left? } }` | A table; `"…"` is an empty cell to write in; cells take the markup |
| `{ numtable: [[21, "একুশ", "একুশ"?], …] }` | pp. 1–6's number tables (blocks, digits, word, write) |
| `{ blocks: { tens, ones, s, color, frame?, onesBelow? } }` | Base-ten rods and cubes (s = cube size in mm) |
| `{ flats: { n, s, color } }` | Hundred flats |
| `{ pv: { h, t, o, tone, rod, labels?, heads?, digits?, answer? } }` | p10's place-value table with blocks |
| `{ sticks: { bundles, singles, perRow } }` | Bundles of ten sticks and single sticks |
| `{ objs: { sticker, emoji, n, perRow, size, groups?: [3,3,3], plate?, cross? } }` | n copies of one object, a ChatGPT sticker (`art/ready/sticker-<name>.png`), until then the emoji. `groups` puts them in groups (`plate` on plates); `cross` crosses out the last k |
| `{ sums: ["২৪ + ১৩ = □", …], cols, marks?: true, start? }` | Sums in a grid; `marks` adds (১) (২) … |
| `{ colsum: { items: [{ rows: ["২৪", "+১৩"], ans: "□□" \| "৩৭", carry?: "১ " }], heads?: ["দশক", "একক"], cols, size } }` | Sums written in columns, digit under digit, with the place names above and the carried digits small and red |
| `{ dots: { rows, cols, show?: [r, c], size, mark?: [r, c, colour] } }` | A dot array; `show` lays the book's L-shaped paper over all but r × c |
| `{ chart: { start, end, cols, mark: { n: colour }, blank: [n…], ring: [n…] } }` | A number chart (the 100 chart) |
| `{ clock: { h, m, size } }` / `{ clock: { digital: "১১:১৫" } }` | An analog clock with Bangla numerals / a digital one |
| `{ money: [{ v: 10 }, { v: 2, coin: true }], size }` | Drawn taka notes and coins |
| `{ pic: "name", h, w?, fit?, pos?, cap?, frame? }` | A picture (see Pictures) |
| `{ row: [blocks], w?: [mm…], gap, align, justify }` / `{ col: [blocks], gap }` | Side by side / stacked |
| `{ frame: [blocks], tone?, pad? }` | A bordered box around blocks (the book's framed pictures) |
| `{ gap: mm }` | Space |
| `{ kind: "yourName", … }` | One of your own kinds (below) |

The code of each is in `build.js`: search for `function sumsHtml` and its neighbours.

## Your own kinds
`content/pXXX-YYY.parts.js`:
```js
module.exports = {
  kinds: { p040_tape: (b, ctx, page) => `<div class="p040-tape">…</div>` },
  css: `.p040-tape { … }`,
};
```
- **Prefix every kind name** with your range (`p040_…`) and every CSS class (`p040-…`), so nothing clashes.
- **`ctx` gives you the core's helpers:** `esc`, `md`, `bn`, `blockHtml`, `blocksSvg`, `flatsSvg`, `cube`, `rod`, `flat`, `BLOCK`, `tableHtml`, `picHtml`, `objsHtml`, `sumsHtml`, `colsumHtml`, `dotsHtml`, `chartHtml`, `clockHtml`, `moneyHtml`, `picFile`, `sticker`, `rng`, `COLORS`.
- **Draw maths by code** (SVG) whenever a count, a length or a time matters: rulers, balances, tallies, bar charts, number lines with jumps, shapes, multiplication flowers, ordinal lines.
- **Colours:** the page's chapter colour is `var(--c)`, its soft tint `var(--s)` and its dark `var(--d)`. The tones are blue, green, pink and yellow, as in `build.js`'s CSS.

## Pictures
**1. A count, a length or a time matters → draw it.** Use the blocks, objs, dots, money and your own kinds. Counts must be exact; check them against the book.

**2. A counted object (an apple, a leaf, a shoe, a bus…) → `objs` with a sticker.**
- Name the sticker in plain English, singular: `apple`, `mango`, `leaf`, `shoe`, `bus`.
- Reuse a name if it's the same thing; `rose`, `stick-bundle` and `stick` exist.
- Give an emoji that fits, as the stand-in.
- Put the sticker's prompt in your prompt file.

**3. A scene or a person (children playing, a shop, a classroom…) → `{ pic: "pNNN-what" }` with a ChatGPT prompt.**
- Until the user's picture arrives, cut the old one from the book as a stand-in:
  `node .work/standin.js <printed page> <left%> <top%> <width%> <height%> <name>`. The percentages are of the whole page.
- The stand-in shows with a small tag.
- Keep the old picture's place and size on the page.

**4. The boy and the girl:**
- When the book's boy or girl only speaks (a head beside a bubble), use `say`: the faces are ready.
- When they appear in a scene doing something, it's a picture, and its prompt says "attach `ref-children.png`".

**Your prompt file `PICTURE-PROMPTS-pXXX-YYY.md`:**
- Follow `PICTURE-PROMPTS-ch1.md`. Don't repeat its section 1: say "after section 1 of PICTURE-PROMPTS-ch1.md".
- For each picture:
  - the file name;
  - the page;
  - whether to attach `ref-children.png`;
  - a ready prompt in a code block.
- The prompt must say "No text, letters or digits anywhere" and give the shape: landscape 1536 × 1024, portrait 1024 × 1536, or square 1024 × 1024 for stickers.
- Stickers: one object, centred, plain white background, no shadow.
- Never ask ChatGPT for a picture whose count matters (5 apples on a plate): draw the count with `objs` instead.

## Building and checking
```
node build.js 40-55        # your range → .work/out/class2-math-p40-55.pdf + previews/page-NNN.png + the checks
```
The build must say `fonts ok · nothing spills`, and every page `the same`.
- **The text check:** tesseract reads the book's page (cached in `.work/ocr/`), and every word on your page must be found there.
- **When a word is "not found",** first check your typing against the page image. Only if the OCR is wrong, add it to the page's `allow`.

**Look at every page's preview** (`previews/page-NNN.png`) with the Read tool.
- **Like the model pages:**
  - nothing overlapping;
  - nothing cut off;
  - no big empty areas (use `spread`);
  - no crowding (use `dense`, or smaller sizes).
- **Faithful to the book:** every exercise, number and picture there; the same order.

Your first build OCRs each page (about 15 s a page); later builds are quick.

## Your report (the final message)
- the pages done, with any doubts (the book's slips, unclear readings);
- your kinds;
- the pictures in your prompt file (stickers and scenes), and the stand-ins you cut;
- anything the core should do better.
