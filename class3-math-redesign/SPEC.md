# How to write pages of the Class 3 math redesign (for the helpers)

The project is NCTB's *প্রাথমিক গণিত, তৃতীয় শ্রেণি* (2026 edition), rebuilt page for page in a colourful, child-friendly look. It follows our finished **Class 2** redesign (`~/Downloads/class2-math-redesign`), with the same builder, kinds and look.

## Look at the model first
- **The Class 2 book's pages:** `~/Downloads/class2-math-redesign/previews/page-NNN.png` (for example 001, 010, 040, 045, 073, 091, 107, 118). Their content is in `~/Downloads/class2-math-redesign/content/pNNN-NNN.js`.
- **Match their look and density.** Your pages should look like they belong to the same series.

## Your job
- **Write your printed pages** in `content/pXXX-YYY.js` (your range, e.g. `p021-036.js`), exporting `{ pages: [...] }`. The file name must be exactly `p` + 3-digit first page + `-` + 3-digit last page + `.js`: a range build reads only the files named for its pages.
- **Your own kinds of content** go in `content/pXXX-YYY.parts.js`, if you need any (see "Kinds").
- **Your pictures for ChatGPT** go in `PICTURE-PROMPTS-pXXX-YYY.md` (see "Pictures").
- **Do not edit** `build.js`, `SPEC.md`, `lib/`, or other helpers' files. Other helpers work at the same time on other ranges. If you need something from the core, build it in your parts file and mention it in your report.

## Reading the book
- **The book:** `~/Downloads/Class-3, Math BV. combine _compressed.pdf`. **Printed page n is PDF page n + 6.**
- **Render a page to read it**, e.g. `pdftoppm -f 27 -l 27 -r 150 -png "<book>" <your scratch folder>/p` for printed page 21. Use your own scratch folder, never the project folder. Look at it with the Read tool. Zoom by cropping, or render at 250–300 dpi, when the print is small.
- **Surveys (a help, not the source):** the book was already read page by page for its Activity Studio games.
  - `~/Downloads/class3-math-activities/CH01-08-PAGES.md` (pp. 1–90);
  - `FRACTION-PAGES.md` (pp. 91–106);
  - `CH10-13-PAGES.md` (pp. 107–155).

  They list every exercise, its numbers and the book's markers. **They write numbers in ASCII digits; the book prints Bangla digits, and so must you.** Always check the page image itself.
- **Every word as printed.**
  - Bangla digits (০–৯) as printed, the book's punctuation (। ? : , !) and its dashes (–).
  - Maths signs: + − × ÷ = < >. Use the real minus sign "−", not a hyphen.
  - If the book has a slip, keep it and list it in your report.
- **Keep the text NFC.** Write Bangla only with the Write/Edit tools or node, never sed/perl.
- **Leave out the running header** "প্রাথমিক গণিত" and the page number; the frame adds its own.

## The book's marks, and what they become
| In the book | In our page |
|---|---|
| The chapter's title pill at the top of its first page ("সংখ্যা", "যোগ"…) | `opener: { title: "সংখ্যা" }` on that page. The core adds "প্রথম অধ্যায়" and the chapter badge itself |
| A lesson heading under it or on a later page ("গণনা করা, পড়া ও লেখা", "ভাগের হিসাব") | the page's `title` |
| The **?** bubble (মূল প্রশ্ন) with its question | `{ ask: "…" }` |
| A **pink triangle** with a number (কাজ) | `{ ex: "১", mark: "kaj", text, body }` |
| A **teal square** with a number (অনুশীলন) | `{ ex: "১", mark: "anu", text, body }` |
| A **blue circle** with a number (নিজে করি) | `{ ex: "১", mark: "nije", text, body }` |
| The "নিজে করি" heading of a practice section | `{ practise: "নিজে করি" }` |
| রাফি (the boy), তুলি (the girl) or টিয়া (the parrot) speaking | `{ say: "boy" \| "girl" \| "parrot", mood: "think" \| "talk", text }` |
| A fraction (top over bottom) | the markup `{{১/২}}`; a box in it: `{{□/৪}}` |

The markers are explained on the book's own key page (PDF p. 5), which stays in our book as printed, so **always keep each exercise's marker and number exactly as printed.**

## A page
```js
{ page: 21, opener: { title: "যোগ" }?, title: "…"?, dense: true?, spread: true?, allow: ["…"]?, art: [{ pic, x, y, w, h }]?, blocks: [ … ] }
```
- **`dense`:** a crowded page (smaller gaps).
- **`spread`:** a page with room to spare (the blocks spread down the page).
- **`allow`:** words the OCR text check misreads, each checked by eye; add a comment saying why.
- **`art`:** a free picture placed in mm from the page's top-left (the page is 195.5 × 254.6 mm). Use it rarely.

## The kinds of content (blocks)
All text goes through the markup:
- `□` is an empty answer box;
- `[[৩৭]]` is a filled answer box (the book's worked example);
- `{{৩/৫}}` is a fraction;
- `___` (3 or more) is a writing line;
- `**x**` is bold;
- `\n` is a new line.

A plain string as a block is a line of text.

| Block | What it is |
|---|---|
| `{ ask: "…" }` | The book's "?" question (মূল প্রশ্ন): a yellow pill with a ? |
| `{ text: "…", big?, center?, box?: "৩৪৫" }` | A line of text; `big` for the book's coloured lead-in lines |
| `{ say: "boy" \| "girl" \| "parrot", mood: "think" \| "talk", side?: "left" \| "right", text }` | Someone speaking, with their face in a circle. The boy is on the left, the girl and the parrot on the right (`side` changes it, to follow the book). `think` = finger on chin (asking, wondering), `talk` = explaining. The parrot has one face |
| `{ note: "…" }` | A highlighted line (the book's tinted boxes of rules: "গুণের ক্ষেত্রে…") |
| `{ sub: "…" }` | A subheading with a dot |
| `{ practise: "নিজে করি" }` | The "নিজে করি" ribbon |
| `{ ex: "১", mark: "kaj" \| "anu" \| "nije", text, body: [blocks] }` | A numbered exercise in a card tinted by its marker; `text: null` for a card without a heading line. Without `mark` the number shows as "১." |
| `{ nums: ["২৪", "৪৭", …] }` | Numbers as chips |
| `{ table: { head, rows, tone: blue\|green\|pink\|yellow, small?, width?, left? } }` | A table; `"…"` is an empty cell to write in; cells take the markup |
| `{ blocks: { tens, ones, s, color, frame?, onesBelow? } }` | Base-ten rods and cubes (s = cube size in mm) |
| `{ flats: { n, s, color } }` | Hundred flats |
| `{ pv: { h, t, o, tone, rod, labels?, heads?, digits?, answer? } }` | Class 2's place-value table with blocks (hundreds, tens, ones). Class 3 needs thousands (hazar) too: build your own kind |
| `{ sticks: { bundles, singles, perRow } }` | Bundles of ten sticks and single sticks |
| `{ objs: { sticker, emoji, n, perRow, size, groups?: [3,3,3], plate?, cross? } }` | n copies of one object: a ChatGPT sticker until then shown as the emoji. `groups` puts them in groups (`plate` on plates); `cross` crosses out the last k |
| `{ sums: ["২৪ + ১৩ = □", …], cols, marks?: true, start? }` | Sums in a grid; `marks` adds (১) (২) … |
| `{ colsum: { items: [{ rows: ["২৪", "+১৩"], ans: "□□" \| "৩৭", carry?: "১ " }], heads?: ["দশক", "একক"], cols, size } }` | Sums written in columns, digit under digit, with the place names above and the carried digits small and red |
| `{ dots: { rows, cols, show?: [r, c], size, mark?: [r, c, colour] } }` | A dot array; `show` lays the L-shaped paper over all but r × c |
| `{ chart: { start, end, cols, mark: { n: colour }, blank: [n…], ring: [n…] } }` | A number chart |
| `{ clock: { h, m, size, bangla? } }` / `{ clock: { digital: "১১:১৫" } }` | An analog clock (English digits on the face; `bangla: true` for Bangla ones, whichever the book prints) / a digital one |
| `{ money: [{ v: 10 }, { v: 2, coin: true }], size, label? }` | Drawn taka notes and coins. Paisa coins (৫, ১০, ২৫, ৫০ পয়সা) need your own kind |
| `{ pic: "name", h, w?, fit?, pos?, cap?, frame? }` | A picture (see Pictures) |
| `{ row: [blocks], w?: [mm…], gap, align, justify }` / `{ col: [blocks], gap }` | Side by side / stacked |
| `{ frame: [blocks], tone?, pad? }` | A bordered box around blocks |
| `{ gap: mm }` | Space |
| `{ kind: "yourName", … }` | One of your own kinds, or one of Class 2's (below) |

The code of each is in `build.js`: search for `function sumsHtml` and its neighbours.

## Kinds
**Class 2's own kinds are loaded for every page** from `lib/c2-pNNN-NNN.parts.js`, under their Class 2 names. Reuse them when they fit; read the code first, and look at the Class 2 page that uses them. Some useful ones:
- column sums and subtractions with carrying/borrowing: `p040_cs`, `p056_col`;
- place-value and number lines: `p040_pv`, `p056_pvt`, `p025_jumps`;
- multiplication: the L-paper dots `p073_ldots`, times tables `p073_namta` and `p088_namta`, `p088_flower`;
- measuring: the ruler `p102_ruler`, scales `p102_scales`, water `p102_water`, glasses and bottles `p115_glasses`, `p115_bottles`;
- time: clocks `p115_clocks`, `p115_lcds`;
- data: tallies `p115_tally`;
- money: `p011_money`, `p115_cash`;
- shapes: `p102_shapes`.

**Your own kinds** go in `content/pXXX-YYY.parts.js`:
```js
module.exports = {
  kinds: { c3p021_tape: (b, ctx, page) => `<div class="c3p021-tape">…</div>` },
  css: `.c3p021-tape { … }`,
};
```
- **Prefix every kind name** with `c3p` + your range's first page (`c3p021_…`), and every CSS class with `c3p021-`, so nothing clashes.
- **`ctx` gives you the core's helpers:** `esc`, `md`, `bn`, `blockHtml`, `exMark`, `sayHtml`, `blocksSvg`, `flatsSvg`, `cube`, `rod`, `flat`, `BLOCK`, `tableHtml`, `picHtml`, `objsHtml`, `sumsHtml`, `colsumHtml`, `dotsHtml`, `chartHtml`, `clockHtml`, `moneyHtml`, `picFile`, `sticker`, `rng`, `COLORS`.
- **Draw maths by code** (SVG) whenever a count, a length, an angle or a time matters:
  - thousand cubes;
  - number lines with jumps;
  - long division;
  - fraction shapes cut into equal parts;
  - rulers (1 cm = 1 cm);
  - balances, clocks;
  - shapes, angles and grids;
  - tallies and bar charts.
- **Colours:** the page's chapter colour is `var(--c)`, its soft tint `var(--s)` and its dark `var(--d)`. The tones are blue, green, pink and yellow, as in `build.js`'s CSS.

## Pictures
**1. A count, a length or a time matters → draw it.** Use blocks, objs, dots, money and the kinds. Counts must be exact; check them against the book.

**2. A counted object (an apple, a pencil, a bus…) → `objs` with a sticker.**
- Name the sticker in plain English, singular: `apple`, `mango`, `pencil`.
- **Reuse a Class 2 sticker name if it's the same thing.** One picture serves both books. The Class 2 names are:
  apple banana-bunch banana boy-arms-out bucket bus candle car clay-bowl coconut crow cucumber earring eggplant elephant fish football frangipani girl-arms-out glass grapes green-apple horse jackfruit kid-boy-beige kid-boy-blue kid-boy-purple kid-girl-blue kid-girl-bow kid-girl-glasses kid-girl-orange koel leaf lychee mango-basket mango mini-car myna notebook orange papaya pencil pigeon pineapple potato pupil-boy pupil-girl rabbit rooster saucepan sock taxi teapot tiger tomato watermelon zebra rose stick-bundle stick
- Their prompts are in `~/Downloads/class2-math-pictures/PROMPTS.md`.
- A Class 2 name needs no prompt from you.
- Give an emoji that fits as the stand-in.
- Put a new sticker's prompt in your prompt file.

**3. A scene, a person or a photo (children playing, a shop, a packet of milk powder…) → `{ pic: "pNNN-what" }` with a ChatGPT prompt.**
- Until the user's picture arrives, cut the old one from the book as a stand-in:
  `node .work/standin.js <printed page> <left%> <top%> <width%> <height%> <pNNN-what>`. The percentages are of the whole page.
- The stand-in shows with a small tag.
- Keep the old picture's place and size on the page.

**4. রাফি, তুলি and টিয়া:**
- When they only speak (a head beside a bubble), use `say`: the faces are ready.
- When they appear in a scene doing something, it's a picture, and its prompt says "attach `references/ref-children.png`".

**Your prompt file `PICTURE-PROMPTS-pXXX-YYY.md`:**
- Follow `PICTURE-PROMPTS-base.md`. Don't repeat its section 1: say "after section 1 of PICTURE-PROMPTS-base.md".
- For each picture, a heading with the file name in backticks (`### \`p021-milk-powder.png\``), then:
  - the page;
  - whether to attach `references/ref-children.png`;
  - a ready prompt in a code block.
- The prompt must say "No text, letters or digits anywhere" and give the shape: landscape 1536 × 1024, portrait 1024 × 1536, or square 1024 × 1024 for stickers.
- Stickers: one object, centred, plain white background, no shadow.
- Never ask ChatGPT for a picture whose count matters (5 apples on a plate): draw the count with `objs` instead.
- A packet or label with writing on it: ask for a plain packet with no writing, and draw the price or label by code.

## Building and checking
```
node build.js 21-36        # your range → .work/out/class3-math-p21-36.pdf + previews/page-NNN.png + the checks
```
- **The build must say** `fonts ok · nothing spills`, and every page `the same`.
- **The text check:** tesseract reads the book's page (cached in `.work/ocr/`), and every word on your page must be found there.
- **When a word is "not found",** first check your typing against the page image. Only if the OCR is wrong, add it to the page's `allow`.
- A message like `(skipped c3pNNN.parts.js …)` is another helper's unfinished file: ignore it.

**Look at every page's preview** (`previews/page-NNN.png`) with the Read tool.
- **Like the model pages:**
  - nothing overlapping;
  - nothing cut off;
  - no big empty areas (use `spread`);
  - no crowding (use `dense`, or smaller sizes).
- **Faithful to the book:** every exercise, number, marker and picture there, in the same order.

Your first build OCRs each page (about 15 s a page); later builds are quick.

## Your report (the final message)
- the pages done, with any doubts (the book's slips, unclear readings);
- your kinds, and the Class 2 kinds you reused;
- the pictures in your prompt file (stickers and scenes), the Class 2 stickers you reused, and the stand-ins you cut;
- anything the core should do better.
