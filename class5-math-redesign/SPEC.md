# How to write pages of the Class 5 math redesign (for the helpers)

The project is NCTB's *প্রাথমিক গণিত, পঞ্চম শ্রেণি* (for 2026), rebuilt page for page in our colourful, child-friendly look. It follows our finished **Class 4** redesign (`../class4-math-redesign`), which followed Classes 2 and 3: the same builder, kinds and look. The plan is `PLAN.md`.

## Look at the models first
- **This book's model pages,** written first: `previews/page-001.png`, `page-002.png`, `page-003.png`, from `content/p001-003.js` and `content/p001-003.parts.js`. Read both files: they show the blocks, the kinds and the helpers we use.
- **The Class 4 book's pages:** `../class4-math-redesign/previews/page-NNN.png` (for example 001, 023, 041, 053, 081, 097, 111, 121, 133, 143, 157, 169). Their content is in `../class4-math-redesign/content/pNNN-NNN.js`. Class 4 has the same page size, the same markers and many of the same kinds of exercise: **look at the Class 4 page on the same topic before you write yours.**
- **Match their look and density.** Your pages should look like they belong to the same series.

## Your job
- **Write your printed pages** in `content/pXXX-YYY.js` (your range, e.g. `p017-030.js`), exporting `{ pages: [...] }`. The file name must be exactly `p` + 3-digit first page + `-` + 3-digit last page + `.js`: a range build reads only the files named for its pages.
- **Your own kinds of content** go in `content/pXXX-YYY.parts.js`, if you need any (see "Kinds").
- **Your pictures for ChatGPT** go in `PICTURE-PROMPTS-pXXX-YYY.md` (see "Pictures").
- **Do not edit** `build.js`, `SPEC.md`, `PLAN.md`, `lib/`, `content/p001-003.*`, or other helpers' files. Other helpers work at the same time on other ranges. If you need something from the core, build it in your parts file and mention it in your report.

## Reading the book
- **The book:** `source/class5-math-nctb-2026.pdf` (190 PDF pages). **Printed page n is PDF page n + 7.**
- **Render a page to read it**, e.g. `pdftoppm -f 24 -l 24 -r 150 -png source/class5-math-nctb-2026.pdf <your scratch folder>/p` for printed page 17. Use your own scratch folder, never the project folder. Look at it with the Read tool. **Zoom** (render at 250–300 dpi, or crop with `-x -y -W -H`) whenever the print is small: digits in tables and drawings, fractions, decimal points, labels.
- **The book's text is drawn as shapes:** there's no text to copy out of the PDF. Read every word from the image. Tesseract garbles fractions and many decimals: **read those by eye, digit by digit**, and check every sum, fraction and decimal you type by working it out.
- **Every word as printed.**
  - Bangla digits (০–৯) as printed, the book's punctuation (। ? : , !) and its dashes (–).
  - Maths signs: + − × ÷ = < > %. Use the real minus sign "−", not a hyphen.
  - A space the book puts before "।" is dropped ("টাকা।").
- **Keep the text NFC.** Write Bangla only with the Write/Edit tools or node, never sed/perl.
- **Leave out the running header** "প্রাথমিক গণিত", the page number and the "২০২৬" printed sideways in the margin; the frame adds its own.

## The book's slips (the user's rule for Class 5)
- **A clear error is fixed:** a sum or a product that doesn't work, a wrong date or day, a wrong count, a number that contradicts the same page. Write our corrected text in the page, and record it in the page's `fixes`:
  ```js
  fixes: [{ book: "১৪৩০ – ১৪৩১ বঙ্গাব্দ", ours: "১৪৩১ – ১৪৩২ বঙ্গাব্দ", why: "2025 is 1431–1432: the page shows ১ বৈশাখ on 14 April" }]
  ```
  The words of `ours` pass the text check by themselves. Be sure before you fix: work it out twice.
- **Anything else is kept as printed and flagged:** the book's own way of teaching, an odd but not wrong wording, a spelling the book uses consistently, an unclear picture. Record it in `flags: ["…"]` (one line each, in English, saying what and why).
- **Answers aren't errors:** an exercise with no answer printed is not a slip. A worked example's printed answer is kept (check it is right).
- The build lists every `fixes` and `flags` entry; they go into `TEACHER-CHECK.md`. Mention each in your report too.

## The book's marks, and what they become
| In the book | In our page |
|---|---|
| The chapter's tab with "অধ্যায় N" and the chapter's title, on its first page | `opener: { title: "গুণ ও ভাগ" }` on that page. The core adds "প্রথম অধ্যায়" and the chapter badge itself |
| A lesson heading ("গুণ", "ভাগ", "ঐকিক নিয়ম", "হিসাবের ধারাবাহিকতা") | the page's `title` |
| The **?** bubble (মূল প্রশ্ন) with its question | `{ ask: "…" }` |
| A **triangle** with a number (কাজ). The book prints it in several colours; its key page makes every triangle কাজ | `{ ex: "১", mark: "kaj", text, body }` |
| An **orange square** with a number (অনুশীলন) | `{ ex: "১", mark: "anu", text, body }` |
| A **blue circle** with a number (নিজে করি) | `{ ex: "১", mark: "nije", text, body }` |
| A number without a marker ("১.", "(১)") | `{ ex: "১", text, body }` (no `mark`), or the number in the text |
| The **দেখি পারি কি না** heading (each chapter's review) | `{ review: "দেখি পারি কি না" }` |
| The **নিজে করি** heading of the practice section | `{ practise: "নিজে করি" }` |
| রাফি (the boy), তুলি (the girl) or টিয়া (the parrot) speaking | `{ say: "boy" \| "girl" \| "parrot", mood: "think" \| "talk", text }` |
| Another child speaking | `{ say: "kid", face: "<sticker name>", color: "#0D9488", side?: "right", text }` |
| A fraction (top over bottom) | the markup `{{১/২}}`; a box in it: `{{□/৪}}`; a mixed number `২{{১/৩}}` |

The markers are explained on the book's own key page (PDF p. 5), which stays in our book as printed, so **always keep each exercise's marker and number exactly as printed.**

## A page
```js
{ page: 23, opener: { title: "…" }?, title: "…"?, dense: true?, spread: true?, allow: ["…"]?, fixes: [...]?, flags: [...]?, fitMin: 0.8?, art: [{ pic, x, y, w, h }]?, blocks: [ … ] }
```
- **`dense`:** a crowded page (smaller gaps). **`spread`:** a page with room to spare (the blocks spread down the page). Both together is fine.
- **`allow`:** words or numbers the OCR text check misreads, each checked by eye; add a comment saying why.
- **`fitMin`:** a full page the build may scale down further than 85% to fit (use rarely; never below 0.75).
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
| `{ say: "boy" \| "girl" \| "parrot", mood: "think" \| "talk", side?: "left" \| "right", text }` | Someone speaking, with their face in a circle. The boy is on the left, the girl and the parrot on the right (`side` changes it, to follow the book). `think` = finger on chin (asking, wondering), `talk` = explaining |
| `{ note: "…" }` | A highlighted line (the book's tinted boxes of rules) |
| `{ sub: "…" }` | A subheading with a dot |
| `{ review: "দেখি পারি কি না" }` / `{ practise: "নিজে করি" }` | The section ribbons |
| `{ ex: "১", mark: "kaj" \| "anu" \| "nije", text, body: [blocks] }` | A numbered exercise in a card tinted by its marker; `text: null` for a card without a heading line |
| `{ nums: ["২৪", "৪৭", …] }` | Numbers as chips |
| `{ table: { head, rows, tone: blue\|green\|pink\|yellow, small?, width?, left? } }` | A simple table; `"…"` is an empty cell to write in; cells take the markup |
| `{ kind: "p011_tab", tone, small?, cols?, rows: [{ type: "hd"\|"num"\|"pic", cells, h? }] }` | Class 2's table: **merged cells** (`{ c: "বারো হাজার", span: 2 }`, `rs` for rows), cells that hold blocks, row heights |
| `{ objs: { sticker, emoji, n, perRow, size, groups?, plate?, cross? } }` | n copies of one object: a ChatGPT sticker, until then shown as the emoji |
| `{ sums: ["২৪ + ১৩ = □", …], cols, marks?: true, start? }` | Sums or items in a grid; `marks` adds (১) (২) … |
| `{ colsum: { items: [{ rows: ["২৪", "+১৩"], ans: "□□" \| "৩৭", carry?: "১ " }], heads?, cols, size } }` | Sums written in columns |
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
**Four libraries are loaded for every page.** Reuse them when they fit; **read the kind's code and header comment first, and look at the page that used it** (Class 4's are in `../class4-math-redesign/content/` and `previews/`).
- **Class 2's** `lib/c2-pNNN-NNN.parts.js` (names `pNNN_…`): column sums `p040_cs`, `p056_col`; place value `p040_pv`, `p056_pvt`; the table with merged cells `p011_tab`; smaller speech cards `p011_chat`; number lines `p025_jumps`; the ruler `p102_ruler`, scales `p102_scales`, water `p102_water`, glasses and bottles `p115_glasses`, `p115_bottles`; clocks `p115_clocks`; tallies `p115_tally`; money `p011_money`; shapes `p102_shapes`.
- **Class 3's** `lib/c3-pNNN-NNN.parts.js` (names `c3pNNN_…`): `c3p001_saybox` (a speech card holding blocks), `c3p001_box` (an answer box, with or without a label), `c3p001_nline`; column sums `c3p021_col`; `c3p051_mul`; `c3p063_ldiv`; fractions `c3p091_strips` (strips, tapes, bars, braces, number lines); pictographs `c3p107_picto`; measuring and time `c3p118_ruler`, `c3p118_scales`, `c3p118_clocks`; geometry `c3p133_figs`, `c3p133_sqgrid`, `c3p133_dots`, `c3p133_tiles`, `c3p133_pat`; `…_mcq` kinds (multiple choice with tick boxes).
- **Class 4's** `lib/c4-pNNN-NNN.parts.js` (names `c4pNNN_…`) and `lib/c4-shared.parts.js`. The most useful:
  - multiplying and dividing: `c4p041_col` (column multiplication: labels, boxes, rings, arrows), `c4p041_mex` (multiplications to do, `room: false` = the book's way), `c4p041_work` (working line under line, wide boxes), `c4p053_ldiv` (**long division**: the one to use for any division; extend it in your parts file for 3-digit divisors or decimal points if it can't), `c4p041_dq` (divisions to do), `c4p053_tbox` (an explanation box, or a ruled box to write in);
  - number sentences: `c4p067_x` (wrap a block in it, `{ kind: "c4p067_x", b: block }`, to draw ≮ ≯ ∴ and the wide answer boxes ▭ ▬), `c4p067_eq`, `c4p067_trial`, `c4p032_steps` (worked steps with captions);
  - multiples and factors: `c4p081_chart` (the ১–১০০ chart), `c4p081_trees` (factor trees), `c4p081_pairs`, `c4p081_tab`, `c4p081_mcq`;
  - fractions: `c4p097_cells`, `c4p097_pie`, `c4p097_nl` (number lines), `c4p097_tape`, `c4p097_vbar`, `c4p097_cancel`;
  - decimals: `c4p111_pvdec` (decimal place value), `c4p111_ruler`, `c4p111_nline`, `c4p111_dgrid` (tenths and hundredths grids), `c4p111_dsum`, `c4p111_bars`, `c4p111_mugs`;
  - measuring: `c4p121_units` (unit ladders), `c4p121_ucol`, `c4p121_ruler`, `c4p121_beaker`, `c4p121_grid` (area on squared paper), `c4p133_sq`, `c4p133_rect`, `c4p133_hms` (time), `c4p133_cal` (a calendar month), `c4p133_clock`;
  - geometry: `c4_protractor`, `c4p143_fig`, `c4p143_grid`, `c4p143_rail`, `c4p157_geo`;
  - the full list is in each file's header comment.
- **This book's** `content/p001-003.parts.js`: `c5p001_mul` (a multiplication in columns as the book prints it: empty boxes, digits printed in boxes, the book's ruled squares, labels with arrows on either side).

### Since wave 1 (pages 1–90 are done: reuse what they made)
**All parts files are loaded for every page**, so wave 1's kinds are yours to reuse. Read the header comment of the file and look at the page that uses one (`previews/page-NNN.png` and its `content/pNNN-NNN.js`) before you do:
- **`c5p063_grid`** (`content/p063-073.parts.js`): a grid of cells, every cell drawn: the 10 × 10 hundredths grid, tenths strips, any shading (the first n cells by column or row, blocks, single cells), labels and a caption. **Chapter ৬ (শতকরা) uses it for every percent grid.**
- **Working and boxes:** `c5p004_eqs`, `c5p017_eqs`, `c5p049_eqs` (lines of working with ▭ wide boxes and arrows), `c5p031_form` (a label column with its boxes), `c5p004_wbox` (a ruled box with a label), `c5p004_tab` / `c5p031_steps` / `c5p049_rule` / `c5p017_rules` (a box with a title tab), `c5p031_rule` (the book's tinted rule boxes), `c5p017_x` and `c5p074_x` (wrappers that draw ∴ ✓ ✗ ≤ ▭ ▬ → ⇨ inside any block), `c5p017_tab` / `c5p074_grid` (tables whose cells hold blocks).
- **Numbers:** `c5p001_mul`, `c5p074_mul` (column multiplication; decimal points between cells), `c5p004_ld`, `c5p074_ld` (long division: 2- and 3-digit divisors, decimal points, bring-down arrows, step frames), `c5p063_dcol` (decimals in columns, points aligned), `c5p031_tree`, `c5p031_ladder`, `c5p031_venn`.
- **Lines and bars:** `c5p063_nline`, `c5p074_nl`, `c5p031_nline` (number lines), `c5p049_tape`, `c5p017_tape`, `c5p074_tape` (tapes and bar models), `c5p074_dline` (a double number line), `c5p031_sq` (squared paper), `c5p031_floor` (a floor to scale).
- **Measuring:** `c5p063_cyl` (measuring beakers and magnifier lenses), `c5p074_scale`, `c5p074_rod`.
- **Pictures:** `c5p017_cards` (pictures each over a caption strip), `c5p063_stk` (one sticker at a set width and height: `objs` always draws square boxes).

**Lessons from wave 1:**
- **In SVG, quote the font's name:** `font-family="'Baloo Da 2'"`. Unquoted (`font-family="Baloo Da 2"`), it is invalid because of the "2", and the text falls back to Noto Sans Bengali. Many older library kinds have this slip; don't copy it.
- **A block no longer shrinks to fit a full page** (fixed in the core, 25 Nov): a page too full is scaled down by the fit step (to 85%, or the page's `fitMin`), or reported as spilling.
- **Prefix every class** (`.grid`, `.pn`, `.sub`… are the core's: two wave-1 helpers picked one up by accident).
- **An exercise card whose marker stands beside a drawing** with no heading line: `c5p017_mex`.

**Your own kinds** go in `content/pXXX-YYY.parts.js`:
```js
module.exports = {
  kinds: { c5p017_tape: (b, ctx, page) => `<div class="c5p017-tape">…</div>` },
  css: `.c5p017-tape { … }`,
};
```
- **Prefix every kind name** with `c5p` + your range's first page (`c5p017_…`), and **every CSS class** with `c5p017-`, even the small ones. The core has short classes (`.grid`, `.sub`, `.tx`, `.ex`, `.say`, `.note`, `.frame`, `.pic`, `.qr`…); a parts file that uses one of them by accident picks up its style (the model page's first try did exactly that with `.grid`).
- **`ctx` gives you the core's helpers:** `esc`, `br`, `md`, `bn`, `blockHtml`, `exMark`, `sayHtml`, `blocksSvg`, `flatsSvg`, `cube`, `rod`, `flat`, `BLOCK`, `tableHtml`, `picHtml`, `objsHtml`, `sumsHtml`, `colsumHtml`, `dotsHtml`, `chartHtml`, `clockHtml`, `moneyHtml`, `picFile`, `sticker`, `rng`, `qrSvg`, `COLORS`, `WHO`.
- **Draw maths by code** (SVG) whenever a count, a length, an angle, a share or a time matters:
  - column multiplication and long division (3-digit divisors, decimal points);
  - factor trees, the লসাগু/গসাগু division ladder, Venn circles of multiples and factors;
  - fraction strips, circles and number lines; decimal grids (10 × 10, the 1000 cube), number lines in ০.০০১ steps;
  - **percent:** 10 × 10 grids with the cells shaded, percent bars with a 0–100 scale;
  - rulers (1 cm = 1 cm, with mm), scales, jugs and measuring cylinders, clocks and **24-hour time**, calendars;
  - **area:** squared and dot paper, parallelograms and triangles with their base and height;
  - **geometry:** trapeziums, parallelograms, diagonals, **circles** (centre, radius, diameter), tilings, **simple 3D solids** (cube, cuboid, cylinder, cone, sphere);
  - **data:** tallies, frequency tables, bar charts, **histograms**, **line graphs** and **pie charts** (true angles from the data), on squared paper with the book's axis numbers.
- **Colours:** the page's chapter colour is `var(--c)`, its soft tint `var(--s)` and its dark `var(--d)`. The tones are blue, green, pink and yellow, as in `build.js`'s CSS.

## Pictures
**1. A count, a length, an angle, a share or a time matters → draw it** (rule above). Counts must be exact; check them against the book.

**2. A counted object (an apple, a pencil, a bus…) → `objs` with a sticker.**
- Name the sticker in plain English, singular: `apple`, `mango`, `pencil`.
- **Reuse an existing sticker if it's the same thing.** One picture serves all four books. The build finds them in this book's art, then Class 4's, Class 3's, then Class 2's.
  - Class 2: apple banana-bunch banana boy-arms-out bucket bus candle car clay-bowl coconut crow cucumber earring eggplant elephant fish football frangipani girl-arms-out glass grapes green-apple horse jackfruit kid-boy-beige kid-boy-blue kid-boy-purple kid-girl-blue kid-girl-bow kid-girl-glasses kid-girl-orange koel leaf lychee mango-basket mango mini-car myna notebook orange papaya pencil pigeon pineapple potato pupil-boy pupil-girl rabbit rooster rose saucepan sock stick-bundle stick taxi teapot tiger tomato watermelon zebra
  - Class 3: ant-outline bicycle biscuit bread-slice candy-blue candy-red colour-pencils cricket-bat double-decker-bus flower-vase guava hospital house motorcycle pencil-box playground post-office rickshaw school-bag school shirt sneakers tiffin-box toy-car tree village-house
  - Class 4: deer giraffe hand-press lion marble scooter
- An existing name needs no prompt from you. Give an emoji that fits as the stand-in.
- Put a new sticker's prompt in your prompt file.

**3. A scene, a person or a photo-like picture (children at work, a shop, a bridge, a train…) → `{ pic: "pNNN-what" }` with a ChatGPT prompt.**
- **Name it by its printed page**, three digits: `p023-furniture`.
- Until the user's picture arrives, cut the old one from the book as a stand-in:
  `node .work/standin.js <printed page> <left%> <top%> <width%> <height%> <pNNN-what>`. The percentages are of the whole page. Look at the cut and re-cut until it holds only the picture (page 1's bridge: `node .work/standin.js 1 42.3 19.6 47.4 23.2 p001-bridge`).
- Keep the old picture's place and size on the page.
- **Draw what the book shows, and make a picture only where it has one.** PLAN.md's list was a guess from a quick reading.

**4. রাফি, তুলি and টিয়া:** when they only speak, use `say` (the faces are ready). When they appear in a scene doing something, it's a picture, and its prompt says "attach `ref-children.png`".

**Your prompt file `PICTURE-PROMPTS-pXXX-YYY.md`:**
- Follow `PICTURE-PROMPTS-base.md`. Don't repeat its section 1: say "after section 1 of PICTURE-PROMPTS-base.md".
- For each picture, a heading with the file name in backticks (`### \`p023-furniture.png\``), then the page, whether to attach `ref-children.png`, and a ready prompt in a code block.
- The prompt must say "No text, letters or digits anywhere" and give the shape: landscape 1536 × 1024, portrait 1024 × 1536, or square 1024 × 1024 for stickers.
- Stickers: one object, centred, plain white background, no shadow.
- Never ask ChatGPT for a picture whose count matters (5 apples on a plate): draw the count with `objs` instead.
- A packet, sign, price tag or label with writing on it: ask for it plain, with no writing, and draw the words or numbers by code.

## Building and checking
```
node build.js 17-30        # your range → .work/out/class5-math-p17-30.pdf + previews/page-NNN.png + the checks
```
- **The build must say** `fonts ok · nothing spills`, and every page `the same`.
- **The text check:** Tesseract reads the book's page (cached in `.work/ocr/`), and every word on your page must be found there. When a word is "not found", first check your typing against the page image. Only if the OCR is wrong, add it to the page's `allow`.
- **The number check:** after the words, the build lists `numbers to check by eye (not found exactly on the book's page)`. Check each one against the page image at 300 dpi. If yours is right and the OCR is wrong, add it to the page's `allow`; if yours is wrong, fix it.
- **Signs aren't checked** (+ − × ÷ = < > % and brackets), nor fractions' tops and bottoms: check them by eye.
- A message like `(skipped c5pNNN.parts.js …)` is another helper's unfinished file: ignore it.
- Your first build reads each book page (about 15 s a page); later builds are quick. Several helpers build at once, so a build can take a little longer.

**Look at every page's preview** (`previews/page-NNN.png`) with the Read tool.
- **Like the model pages:** nothing overlapping, nothing cut off, no big empty areas (use `spread`), no crowding (use `dense`, or smaller sizes).
- **Faithful to the book:** every exercise, number, marker and picture there, in the same order. Compare it with the book's page side by side.

## Your report (the final message)
- the pages done, with any doubts (unclear readings);
- **the book's slips**: each fix (book → ours, why) and each flag;
- your kinds, and the library kinds you reused;
- the pictures in your prompt file (stickers and scenes), the existing stickers you reused, and the stand-ins you cut;
- anything the core should do better.
