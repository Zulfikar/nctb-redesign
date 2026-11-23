# How to write pages of the Class 4 math redesign (for the helpers)

The project is NCTB's *প্রাথমিক গণিত, চতুর্থ শ্রেণি* (2026 edition), rebuilt page for page in our colourful, child-friendly look. It follows our finished **Class 3** redesign (`~/Downloads/class3-math-redesign`), which followed Class 2: the same builder, kinds and look. The plan is `PLAN.md`.

## Look at the models first
- **This book's model pages,** written first: `previews/page-001.png`, `page-002.png`, `page-003.png`, from `content/p001-003.js` and `content/p001-003.parts.js`. Read both files: they show the blocks, the kinds and the helpers we use.
- **The Class 3 book's pages:** `~/Downloads/class3-math-redesign/previews/page-NNN.png` (for example 001, 011, 021, 051, 063, 091, 118, 133, 149). Their content is in `~/Downloads/class3-math-redesign/content/pNNN-NNN.js`.
- **Match their look and density.** Your pages should look like they belong to the same series.

## Your job
- **Write your printed pages** in `content/pXXX-YYY.js` (your range, e.g. `p023-031.js`), exporting `{ pages: [...] }`. The file name must be exactly `p` + 3-digit first page + `-` + 3-digit last page + `.js`: a range build reads only the files named for its pages.
- **Your own kinds of content** go in `content/pXXX-YYY.parts.js`, if you need any (see "Kinds").
- **Your pictures for ChatGPT** go in `PICTURE-PROMPTS-pXXX-YYY.md` (see "Pictures").
- **Do not edit** `build.js`, `SPEC.md`, `PLAN.md`, `lib/`, `content/p001-003.*`, or other helpers' files. Other helpers work at the same time on other ranges. If you need something from the core, build it in your parts file and mention it in your report.

## Reading the book
- **The book:** `source/class4-math-nctb-2026.pdf` (182 PDF pages). **Printed page n is PDF page n + 7.**
- **Render a page to read it**, e.g. `pdftoppm -f 30 -l 30 -r 150 -png source/class4-math-nctb-2026.pdf <your scratch folder>/p` for printed page 23. Use your own scratch folder, never the project folder. Look at it with the Read tool. Zoom by cropping, or render at 250–300 dpi, when the print is small (exponents, small digits in tables, labels on drawings).
- **The book's text is drawn as shapes:** there's no text to copy out of the PDF. Read every word from the image.
- **Every word as printed.**
  - Bangla digits (০–৯) as printed, the book's punctuation (। ? : , !) and its dashes (–).
  - Maths signs: + − × ÷ = < >. Use the real minus sign "−", not a hyphen.
  - A space the book puts before "।" is dropped ("টাকা।").
  - If the book has a slip, keep it and list it in your report.
- **Keep the text NFC.** Write Bangla only with the Write/Edit tools or node, never sed/perl.
- **Leave out the running header** "প্রাথমিক গণিত", the page number and the "২০২৬" printed sideways in the margin; the frame adds its own.

## The book's marks, and what they become
| In the book | In our page |
|---|---|
| The chapter's orange tab with "অধ্যায় N" and the chapter's title, on its first page | `opener: { title: "সংখ্যা ও স্থানীয় মান" }` on that page. The core adds "প্রথম অধ্যায়" and the chapter badge itself |
| A lesson heading ("সংখ্যা গণনা", "সংখ্যার তুলনা", "কোণ পরিমাপ") | the page's `title` |
| The **?** bubble (মূল প্রশ্ন) with its question | `{ ask: "…" }` |
| A **triangle** with a number (কাজ). The book often prints it pale blue; its key page makes every triangle কাজ | `{ ex: "১", mark: "kaj", text, body }` |
| An **orange square** with a number (অনুশীলন) | `{ ex: "১", mark: "anu", text, body }` |
| A **blue circle** with a number (নিজে করি) | `{ ex: "১", mark: "nije", text, body }` |
| A number without a marker ("১.", "(১)") | `{ ex: "১", text, body }` (no `mark`), or the number in the text |
| The **দেখি পারি কি না** heading (each chapter's review) | `{ review: "দেখি পারি কি না" }` |
| The **নিজে করি** heading of the practice section | `{ practise: "নিজে করি" }` |
| রাফি (the boy), তুলি (the girl) or টিয়া (the parrot) speaking | `{ say: "boy" \| "girl" \| "parrot", mood: "think" \| "talk", text }` |
| A fraction (top over bottom) | the markup `{{১/২}}`; a box in it: `{{□/৪}}`; a mixed number `২{{১/৩}}` |

The markers are explained on the book's own key page (PDF p. 5), which stays in our book as printed, so **always keep each exercise's marker and number exactly as printed.**

## A page
```js
{ page: 23, opener: { title: "যোগ ও বিয়োগ" }?, title: "…"?, dense: true?, spread: true?, allow: ["…"]?, art: [{ pic, x, y, w, h }]?, blocks: [ … ] }
```
- **`dense`:** a crowded page (smaller gaps). **`spread`:** a page with room to spare (the blocks spread down the page).
- **`allow`:** words the OCR text check misreads, each checked by eye; add a comment saying why.
- **`art`:** a free picture placed in mm from the page's top-left (the page is **190.5 × 253.3 mm**). Use it rarely.

## The kinds of content (blocks)
All text goes through the markup:
- `□` is an empty answer box; `[[৩৭]]` is a filled answer box (the book's worked example);
- `{{৩/৫}}` is a fraction;
- `___` (3 or more) is a writing line;
- `**x**` is bold;
- `\n` is a new line.

A plain string as a block is a line of text.

| Block | What it is |
|---|---|
| `{ ask: "…" }` | The book's "?" question (মূল প্রশ্ন): a yellow pill with a ? |
| `{ text: "…", big?, center?, box?: "৩৪৫" }` | A line of text; `big` for the book's coloured lead-in lines |
| `{ say: "boy" \| "girl" \| "parrot", mood: "think" \| "talk", side?: "left" \| "right", text }` | Someone speaking, with their face in a circle. The boy is on the left, the girl and the parrot on the right (`side` changes it, to follow the book). `think` = finger on chin (asking, wondering, "অপেক্ষা করো!"), `talk` = explaining |
| `{ note: "…" }` | A highlighted line (the book's tinted boxes of rules) |
| `{ sub: "…" }` | A subheading with a dot |
| `{ review: "দেখি পারি কি না" }` / `{ practise: "নিজে করি" }` | The section ribbons |
| `{ ex: "১", mark: "kaj" \| "anu" \| "nije", text, body: [blocks] }` | A numbered exercise in a card tinted by its marker; `text: null` for a card without a heading line |
| `{ nums: ["২৪", "৪৭", …] }` | Numbers as chips |
| `{ table: { head, rows, tone: blue\|green\|pink\|yellow, small?, width?, left? } }` | A simple table; `"…"` is an empty cell to write in; cells take the markup |
| `{ kind: "p011_tab", tone, small?, cols?, rows: [{ type: "hd"\|"num"\|"pic", cells, h? }] }` | Class 2's table: **merged cells** (`{ c: "বারো হাজার", span: 2 }`, `rs` for rows), cells that hold blocks, row heights. Used on pp. 1–3 |
| `{ objs: { sticker, emoji, n, perRow, size, groups?, plate?, cross? } }` | n copies of one object: a ChatGPT sticker until then shown as the emoji |
| `{ sums: ["২৪ + ১৩ = □", …], cols, marks?: true, start? }` | Sums or items in a grid; `marks` adds (১) (২) … |
| `{ colsum: { items: [{ rows: ["২৪", "+১৩"], ans: "□□" \| "৩৭", carry?: "১ " }], heads?, cols, size } }` | Sums written in columns, digit under digit, place names above, carried digits small and red |
| `{ dots: … }`, `{ chart: { start, end, cols, mark, blank, ring } }` | A dot array; a number chart (the ১–১০০ chart, with rings and marks) |
| `{ clock: { h, m, size, bangla? } }` / `{ clock: { digital: "১১:১৫" } }` | An analog or digital clock |
| `{ money: [{ v: 10 }, { v: 2, coin: true }], size, label? }` | Drawn taka notes and coins |
| `{ pic: "name", h, w?, fit?, pos?, cap?, frame? }` | A picture (see Pictures) |
| `{ row: [blocks], w?: [mm…], gap, align, justify }` / `{ col: [blocks], gap }` | Side by side (a `w` of 0 = flexible) / stacked |
| `{ frame: [blocks], tone?, pad? }` | A bordered box around blocks |
| `{ gap: mm }` | Space |
| `{ kind: "yourName", … }` | One of your own kinds, or one of the libraries' (below) |

The code of each is in `build.js`: search for `function sumsHtml` and its neighbours.

## Kinds
**Three libraries are loaded for every page.** Reuse them when they fit; read the code first, and look at the page that uses them.
- **Class 2's** `lib/c2-pNNN-NNN.parts.js` (names `pNNN_…`): column sums `p040_cs`, `p056_col`; place value `p040_pv`, `p056_pvt`; the table with merged cells `p011_tab`; smaller speech cards `p011_chat`; number lines `p025_jumps`; dots `p073_ldots`; times tables `p073_namta`, `p088_namta`; the ruler `p102_ruler`, scales `p102_scales`, water `p102_water`, glasses and bottles `p115_glasses`, `p115_bottles`; clocks `p115_clocks`; tallies `p115_tally`; money `p011_money`; shapes `p102_shapes`.
- **Class 3's** `lib/c3-pNNN-NNN.parts.js` (names `c3pNNN_…`; the page that uses each is in `~/Downloads/class3-math-redesign/content/`):
  - numbers: `c3p001_pvlines` (digit tree, one bracket), `c3p001_cards`, `c3p001_saybox` (a speech card holding blocks), `c3p001_box` (an answer box, with or without a label), `c3p001_nline`, `c3p011_cmp`, `c3p011_pat` (patterns);
  - sums: `c3p021_col`, `c3p021_cols` (column sums), `c3p051_mul` (column multiplication), `c3p063_ldiv` (long division);
  - fractions: `c3p091_strips` (strips, tapes, bars, braces, number lines);
  - money, pictographs: `c3p107_cash`, `c3p107_picto`, `c3p107_vpicto`;
  - measuring and time: `c3p118_ruler`, `c3p118_scales`, `c3p118_clocks`, `c3p118_hands`;
  - geometry: `c3p133_figs`, `c3p133_sqgrid`, `c3p133_angtab`, `c3p133_dots`, `c3p133_tiles`, `c3p133_pat`;
  - `…_mcq` kinds (multiple choice with tick boxes) in several files.
- **This book's** `content/p001-003.parts.js`: `c4p001_pvlines` (the digit tree with any number of brackets: pp. 1, 3), `c4p001_named` (the "স্থানের নাম" arrow pointing at a table), `c4p001_chip` (a digit on an orange square).

**Your own kinds** go in `content/pXXX-YYY.parts.js`:
```js
module.exports = {
  kinds: { c4p023_tape: (b, ctx, page) => `<div class="c4p023-tape">…</div>` },
  css: `.c4p023-tape { … }`,
};
```
- **Prefix every kind name** with `c4p` + your range's first page (`c4p023_…`), and every CSS class with `c4p023-`, so nothing clashes.
- **`ctx` gives you the core's helpers:** `esc`, `br`, `md`, `bn`, `blockHtml`, `exMark`, `sayHtml`, `blocksSvg`, `flatsSvg`, `cube`, `rod`, `flat`, `BLOCK`, `tableHtml`, `picHtml`, `objsHtml`, `sumsHtml`, `colsumHtml`, `dotsHtml`, `chartHtml`, `clockHtml`, `moneyHtml`, `picFile`, `sticker`, `rng`, `qrSvg`, `COLORS`, `WHO`.
- **Draw maths by code** (SVG) whenever a count, a length, an angle or a time matters:
  - place-value tables, number cards, digit trees;
  - column sums, column multiplication, long division (with a 2-digit divisor);
  - fraction strips, walls and number lines; decimal tenths;
  - rulers (1 cm = 1 cm, with mm), balances, jugs, clocks, calendar months;
  - **protractors** (true degree marks; the book's two scales) with the angle's arms; right-angle marks; set squares;
  - lines, angles, triangles (with equal-side ticks), rectangles, squares, dot and squared paper, tiling patterns;
  - tallies, tables and **bar charts** (on squared paper, with the book's axis numbers).
- **Colours:** the page's chapter colour is `var(--c)`, its soft tint `var(--s)` and its dark `var(--d)`. The tones are blue, green, pink and yellow, as in `build.js`'s CSS.

## Since wave 1 (pages 1–80 are done: reuse what they made)
**All parts files are loaded for every page**, so wave 1's kinds are yours to reuse. Look at the page that uses one (`previews/page-NNN.png` and its `content/pNNN-NNN.js`) before you do:
- `c4_protractor` (`lib/c4-shared.parts.js`, written for chapter ১০): a protractor true to the degree, both scales, with an angle's arms, arc and label. Read its header for the options.
- `c4p004_tab` (a table whose cells each take a colour), `c4p004_nline` (a number line), `c4p012_cards` (number cards), `c4p012_pat` and `c4p012_strip` (patterns), `c4p012_ctab` (a colour per column).
- `c4p023_places` (the coloured স্থান table with carries), `c4p032_steps` (worked steps with caption bubbles), `c4p032_vbox` (empty column sums of boxes).
- `c4p041_col` (column multiplication), `c4p053_ldiv` (long division by 1- or 2-digit numbers: the one to use for any division), `c4p053_tbox` (an explanation box, or a ruled box to write in), `c4p053_arrow`.
- `c4p067_x`: wrap blocks in it to draw ≮ ≯ ∴ properly (the fonts lack them) and to get wider answer boxes (▭ ▬).

**New in the core:**
- **Another child speaking** (not রাফি, তুলি or টিয়া): `{ say: "kid", face: "<sticker name>", color: "#0D9488", side?: "right", text }`. Use a child sticker as the face (`kid-girl-bow`, `pupil-boy`…).
- **The number check:** after the words, the build lists `numbers to check by eye (not found exactly on the book's page)`: every number of two or more digits that isn't exactly one of the page's numbers (the word check lets a misread ৪/৮ inside a longer number pass). Check each one against the page image at 300 dpi or more. If yours is right and the OCR is wrong, add it to the page's `allow`; if yours is wrong, fix it.
- **Signs aren't checked** by the text check (+ − × ÷ = < > and brackets): check them by eye.
- `dense` and `spread` can be used together.

**Lessons:**
- **Prefix every CSS class**, even the small ones. The core has short classes (`.sub`, `.tx`, `.ex`, `.say`, `.note`, `.frame`…); a parts file that uses one of them by accident picks up its style.
- **PLAN.md's picture list was a guess** from a quick reading. Go by the page: draw what the book shows, and make a picture only where it has one.

## Pictures
**1. A count, a length, an angle or a time matters → draw it** (rule above). Counts must be exact; check them against the book.

**2. A counted object (an apple, a pencil, a bus…) → `objs` with a sticker.**
- Name the sticker in plain English, singular: `apple`, `mango`, `pencil`.
- **Reuse an existing sticker if it's the same thing.** One picture serves all three books. The build finds them in this book's art, then Class 3's, then Class 2's.
  - Class 2: apple banana-bunch banana boy-arms-out bucket bus candle car clay-bowl coconut crow cucumber earring eggplant elephant fish football frangipani girl-arms-out glass grapes green-apple horse jackfruit kid-boy-beige kid-boy-blue kid-boy-purple kid-girl-blue kid-girl-bow kid-girl-glasses kid-girl-orange koel leaf lychee mango-basket mango mini-car myna notebook orange papaya pencil pigeon pineapple potato pupil-boy pupil-girl rabbit rooster rose saucepan sock stick-bundle stick taxi teapot tiger tomato watermelon zebra
  - Class 3: ant-outline bicycle biscuit bread-slice candy-blue candy-red colour-pencils cricket-bat double-decker-bus flower-vase guava hospital house motorcycle pencil-box playground post-office rickshaw school-bag school shirt sneakers tiffin-box toy-car tree village-house
- An existing name needs no prompt from you. Give an emoji that fits as the stand-in.
- Put a new sticker's prompt in your prompt file.

**3. A scene, a person or a photo (children playing, a shop, a monument, a packet of milk powder…) → `{ pic: "pNNN-what" }` with a ChatGPT prompt.**
- Until the user's picture arrives, cut the old one from the book as a stand-in:
  `node .work/standin.js <printed page> <left%> <top%> <width%> <height%> <pNNN-what>`. The percentages are of the whole page. Look at the cut and re-cut until it holds only the picture (page 1's car: `node .work/standin.js 1 69.5 21 21.5 13.5 p001-eco-car`).
- Keep the old picture's place and size on the page.

**4. রাফি, তুলি and টিয়া:** when they only speak, use `say` (the faces are ready). When they appear in a scene doing something, it's a picture, and its prompt says "attach `ref-children.png`".

**Your prompt file `PICTURE-PROMPTS-pXXX-YYY.md`:**
- Follow `PICTURE-PROMPTS-base.md`. Don't repeat its section 1: say "after section 1 of PICTURE-PROMPTS-base.md".
- For each picture, a heading with the file name in backticks (`### \`p023-city-crowd.png\``), then the page, whether to attach `ref-children.png`, and a ready prompt in a code block.
- The prompt must say "No text, letters or digits anywhere" and give the shape: landscape 1536 × 1024, portrait 1024 × 1536, or square 1024 × 1024 for stickers.
- Stickers: one object, centred, plain white background, no shadow.
- Never ask ChatGPT for a picture whose count matters (5 apples on a plate): draw the count with `objs` instead.
- A packet, sign or label with writing on it: ask for it plain, with no writing, and draw the words or numbers by code.

## Building and checking
```
node build.js 23-31        # your range → .work/out/class4-math-p23-31.pdf + previews/page-NNN.png + the checks
```
- **The build must say** `fonts ok · nothing spills`, and every page `the same`.
- **The text check:** tesseract reads the book's page (cached in `.work/ocr/`), and every word on your page must be found there.
- **When a word is "not found",** first check your typing against the page image. Only if the OCR is wrong, add it to the page's `allow`.
- A message like `(skipped c4pNNN.parts.js …)` is another helper's unfinished file: ignore it.
- Your first build reads each book page (about 15 s a page); later builds are quick. Several helpers build at once, so a build can take a little longer.

**Look at every page's preview** (`previews/page-NNN.png`) with the Read tool.
- **Like the model pages:** nothing overlapping, nothing cut off, no big empty areas (use `spread`), no crowding (use `dense`, or smaller sizes).
- **Faithful to the book:** every exercise, number, marker and picture there, in the same order. Compare it with the book's page side by side.

## Your report (the final message)
- the pages done, with any doubts (the book's slips, unclear readings);
- your kinds, and the library kinds you reused;
- the pictures in your prompt file (stickers and scenes), the existing stickers you reused, and the stand-ins you cut;
- anything the core should do better.
