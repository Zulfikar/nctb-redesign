# প্রাথমিক গণিত, দ্বিতীয় শ্রেণি: eBidyaloy's colourful edition

*NCTB's Class Two maths textbook (2026 edition) rebuilt page for page in the colourful look of our English for Today redesign, with a QR code to its Activity Studio games on every page. Made 2–3 Nov 2026. The sister book is `~/Downloads/class3-math-redesign`; the handover for both is `~/Downloads/math-books-handoff-2026-11-03.md`.*

**Rights:** the book is NCTB's. This edition works as a sample or proposal; publishing or selling it needs NCTB's permission.

---

## 1. Where it stands (3 Nov 2026): finished
**The whole book is built:** `class2-math-book.pdf`, 137 pages, the same count as the original, about 29 MB (Activity Studio takes a book PDF of at most 60 MB).

**Every check passes:**
- all 127 printed pages are "the same" in the text check;
- fonts ok;
- nothing spills.

**The games:** 164 QR codes, and every page from 1 to 127 has at least one game.

**Every picture is in:** 71 ChatGPT pictures, each checked against its prompt.
- the children's reference sheet and the cover;
- 9 scenes;
- 60 stickers (including the rose, the stick bundle and the stick).
- `sticker-mango` and `sticker-papaya` were remade on 3 Nov: the first mango looked like the orange.
- The picture prompts were removed once every picture was made (3 Nov). They're in the Trash, in `math-picture-prompts-2026-11-03`.

**Left for the user:** the Activity Studio steps (section 7).

## 2. The decisions
1. **Page for page, at the book's own size** (194.3 × 253.8 mm), with the same printed page numbers. Printed page n is PDF page n + 9 of the source (`~/Downloads/Class-2, Math_compressed.pdf`).
2. **Every word as printed,** including the book's own slips. They're noted as comments in each `content/pNNN-NNN.js`.
3. **The look:** like English for Today.
   - A colour per chapter, and an opening band on each chapter's first page.
   - "?" question pills and the "নিজে করি" ribbon.
   - Yellow exercise cards and coloured tables.
   - The boy and girl in speech cards with their faces (`think` when they ask or wonder, `talk` when they explain). The book itself names them রাফি and তুলি (p40), like the Class 3 book.
   - **Fonts:** Baloo Da 2 for headings and numbers, Noto Sans Bengali for text.
4. **Anything whose count, length or time matters is drawn by the build:**
   - blocks, sticks and bundles;
   - dot arrays with the L-shaped cover, times tables and multiplication flowers;
   - column sums with carrying and borrowing;
   - rulers (true size: 1 cm = 1 cm), weights, glasses and bottles;
   - clocks (keeping the book's English digits on the faces), money (drawn, not banknote photos);
   - tallies, the bar chart and the shapes.
5. **Counted objects** (an apple, a bus, a coconut…) use one ChatGPT sticker, repeated exactly as many times as the book shows.
   - The stickers' backgrounds are cleared by `prep-art.js`.
   - 15 of them also serve the Class 3 book: its build looks here for a sticker it doesn't have.
6. **Scenes with people:** ChatGPT pictures in the same style, with the two children from `art/new/ref-children.png`.
7. **QR codes:**
   - a page's QR opens its game in the Activity Studio book **/b/GDK2NH** ("প্রাথমিক গণিত - দ্বিতীয় শ্রেণী"), matched by printed page;
   - the codes come from `~/Downloads/class2-math-activities/ACTIVITIES-bn.json`, 164 games:
     - the 85 imported on 2 Nov;
     - the 22 math tools (update of 2 Nov);
     - 57 games made on 3 Nov so that every page has one (update of 3 Nov);
   - a page with two or three games shows a big QR and small ones;
   - the cover's QR opens the book;
   - a game's code comes from a hash of its key, so rebuilding the games never changes a printed QR;
   - an unpublished game shows "not found" until it's published.
8. **A full page that its QR row would push past the footer is scaled down** just enough to fit, at most to 85%.
   - On 3 Nov: p10 93%, p17 95%, p47 97%, and p12, p39, p65 and p100 at 98–99%.
   - A page with a true-size ruler is never scaled; it would be reported as spilling instead.
9. **Front and back:**
   - our new cover;
   - the book's own front pages (PDF pp. 2–9: title page, credits, preface, the symbols' key, contents) as printed;
   - the book's back page as printed.

## 3. Differences from the book, for a teacher to confirm
**Corrected pictures** (the words are unchanged):
- **p91:** the two small arrays are drawn with 5 columns, matching the boy's 4×5 and 3×5. The book draws 4.
- **p93:** the 9×2, 9×3 and 9×4 arrays are drawn 9 rows tall. The book prints 10.

**Additions in the book's blank space** (each is a line in the content file, easy to remove):
- **p106:** empty boxes to arrange the leaves and roses in.
- **p113:** a drawn balance (an apple against 100 g) and a digital scale.
- **pp. 112–113:** "=" badges between each weight and the ways to make it.
- **p127:** the picture `p127-leaves-box`, before "– সমাপ্ত –". It's in `content/p115-127.js` and marked there.

**Small spacing changes:** p103–104 drop the book's spaces before commas. p112 adds a space in "২০০ গ্রাম" and the like.

## 4. The files
| File or folder | What it is |
|---|---|
| `class2-math-book.pdf` | The whole book (the only PDF here) |
| `previews/` | A picture of every page: `cover.png`, `page-001.png` … `page-127.png` |
| `content/pNNN-NNN.js` | The pages' words and blocks, one file per range: 001-010 (the sample), 011-024, 025-039, 040-055, 056-072, 073-087, 088-101, 102-114, 115-127 |
| `content/pNNN-NNN.parts.js` | Each range's own kinds of drawing, prefixed by its range (`p040_cs`, `p073_ldots`…). Every parts file loads for every page, so later ranges reuse earlier kinds (chapter 2 uses `p040_*`, chapter 3 uses `p073_*`) |
| `build.js` | The page frame, the shared kinds, the markup, the QR codes, the fit, the cover, the front and back pages, and the checks |
| `SPEC.md` | The rules the eight helpers wrote their pages by: the blocks, the markup, pictures, checks. Read it before changing any content (its picture-prompt part is history now) |
| `prep-art.js` | Makes the user's pictures ready in `art/ready/`, all print-sized (with full-size pictures the PDF was 57 MB): clears the stickers' white backgrounds (at most 520 px), cuts the four faces from `ref-children.png`, crops the cover's smeared sides and makes the scenes 1600 px JPEGs |
| `art/new/` | **The user's pictures,** under their exact names |
| `art/ready/` | Made by `prep-art.js`; the build uses these first |
| `art/stand-in/` | The old book's pictures, used until the new ones arrived; no longer used (`node .work/standin.js <page> <left%> <top%> <width%> <height%> <name>` cuts one) |
| `.work/tessdata/` | Tesseract's Bengali model (`ben.traineddata`, from tessdata_best), for the text check |
| `.work/ocr/` | The OCR reading of each book page (cached) |
| `.work/out/` | Range builds and the HTML |

## 5. Building
```
node prep-art.js        # after a picture is added or replaced in art/new/
node build.js           # the whole book → class2-math-book.pdf (a few minutes) + previews + the checks
node build.js 40-55 88  # only those printed pages → .work/out/class2-math-p40-88.pdf (quick checks)
```
**The build must say:**
- `fonts ok`;
- `nothing spills`: the page edge, the footer, and inside frames, exercise cards and tables;
- `the same` for every page.

It also lists the pages it scaled to fit (`fitted …`).

**The text check:** tesseract reads the book's page, and every Bangla word and number on our page must be found there.
- It is tolerant of the OCR's usual slips: ঊ read as উ, ন্ন, digits run together in times tables.
- A page's `allow` lists the words the OCR can't read, each checked by eye with a comment.

### The blocks and the markup
The full list is in `SPEC.md`.
- **Core blocks:** ask, text, say (who + mood), note, sub, practise, ex, nums, table, numtable, words100, blocks, flats, pv, sticks, roses, objs (stickers, groups, plates, crossed out), sums, colsum, dots, chart, clock, money, pic, row/col/frame, gap, and `kind` for a range's own kinds.
- **The markup:**
  - `□` is an empty answer box;
  - `[[৩৭]]` is a filled box;
  - `___` is a writing line;
  - `**bold**`;
  - `\n` is a new line.

## 6. Changing a picture
1. Save the new picture over the old one in `art/new/`, under the same name.
2. Run `node prep-art.js`, then `node build.js`.
3. Look at the pages that use it.

The prompts are gone, so a new picture needs a new prompt in the same style: a bright, friendly 2D children's book illustration with clean dark outlines, soft shading, warm colours, and no text or digits. The children must match `art/new/ref-children.png`.

## 7. Open, on the user's word
1. **Activity Studio, /b/GDK2NH** (the user's steps, live database writes):
   1. Import `~/Downloads/class2-math-activities/ACTIVITIES-bn-update-2026-11-02-tools.json` (22) if it isn't in yet.
   2. Import `ACTIVITIES-bn-update-2026-11-03-pages.json` (57).
   3. Publish the games, so the QR codes open them.
   4. Use "Replace PDF" with `class2-math-book.pdf`.
2. **The differences** (section 3): keep or remove.
3. **Not done:** the book's original front pictures (PDF pp. 5, 7, 9: children playing, crossing the road, a flower) are kept as printed, not redrawn.
