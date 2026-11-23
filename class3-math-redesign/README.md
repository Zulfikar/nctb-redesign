# প্রাথমিক গণিত, তৃতীয় শ্রেণি: eBidyaloy's colourful edition

*NCTB's Class Three maths textbook (2026 edition), rebuilt page for page in the look of our Class 2 math redesign (`~/Downloads/class2-math-redesign`), with a QR code to its Activity Studio games on every page. Made 2–3 Nov 2026. The handover for both math books is `~/Downloads/math-books-handoff-2026-11-03.md`.*

**Rights:** the book is NCTB's. This edition works as a sample or proposal; publishing or selling it needs NCTB's permission.

---

## 1. Where it stands (3 Nov 2026): finished
**The whole book is built, with every picture and a QR code on every page:** `class3-math-book.pdf`, 162 pages, the same count as the original, about 47 MB (Activity Studio takes a book PDF of at most 60 MB). It runs:
- our new cover;
- the book's front pages as printed (PDF pp. 2–6: title page, credits, preface, the characters' and symbols' key, contents);
- the printed pages 1–155, redesigned;
- the book's back page as printed.

**Every check passes:**
- all 155 printed pages are "the same" in the text check;
- fonts ok;
- nothing spills.

**Every picture is in (3 Nov),** each checked against its prompt:
- the cover and টিয়া the parrot;
- 17 scenes: nine were remade, because ChatGPT first drew them with code (flat shapes, stick figures); p142 and p149 needed a second try to show what their pages ask;
- 26 stickers;
- 15 more stickers shared with the Class 2 book.

`prep-art.js` makes print-sized copies of them. The picture prompts were removed once every picture was made (3 Nov); they're in the Trash, in `math-picture-prompts-2026-11-03`.

**Left for the user:** the Activity Studio steps (section 7).

## 2. The decisions
1. **Page for page, at the book's own size** (554 × 722 pt = 195.5 × 254.6 mm), with the same printed page numbers. Printed page n is PDF page n + 6 of the source.
2. **Every word as printed,** including the book's slips (section 3). They're noted as comments in each `content/pNNN-NNN.js`.
3. **The look:** the Class 2 book's look.
   - A colour per chapter (13), and an opening band on each chapter's first page.
   - The "?" pill for মূল প্রশ্ন and the "নিজে করি" ribbon.
   - Coloured tables.
4. **The speakers:** রাফি (the boy, blue, left), তুলি (the girl, pink, right) and টিয়া (the parrot, green, right).
   - They speak in cards with their faces.
   - The children are the Class 2 pair from the same reference sheet.
5. **The book's exercise markers are kept,** because its key page (kept as printed) explains them. Each card is tinted to match its marker:
   - a pink triangle for কাজ;
   - a teal square for অনুশীলন;
   - a blue circle for নিজে করি.
6. **Anything whose count, length, angle or time matters is drawn by the build.** That includes:
   - thousand cubes, flats, rods and ones;
   - number cards and ticket cartons;
   - column sums with carries and borrows, and column multiplications;
   - the long division;
   - dot arrays with the L-paper, and times tables;
   - fraction shapes, strips, the fraction wall and number lines;
   - money: notes, taka coins and the paisa coins, each in its own shape;
   - rulers at true size, scales, weights and clocks;
   - lines, angles, shapes and dot grids;
   - tallies and pictographs.
7. **Digits:** clock faces, ruler numbers and scale readings keep the book's English digits, as Class 2 did. All text uses Bangla digits.
8. **Counted objects** (a guava, a biscuit, a rickshaw…) use one ChatGPT sticker, repeated exactly as many times as the book shows.
9. **Answer boxes never give the answer away.** A column addition gets one box more than its longest number; a subtraction gets as many as its longest number.
10. **QR codes:**
    - The cover's QR opens the book **/b/GVB5V3**.
    - The pages' QRs open **all 229 games, and every page from 1 to 155 has at least one** (3 Nov). They come from three files in `~/Downloads/class3-math-activities`, matched by printed page:
      - `ACTIVITIES-bn.json`: the 24 fraction games;
      - `ACTIVITIES-bn-rest.json`: 170 games for chapters ১–৮ and ১০–১৩;
      - `ACTIVITIES-bn-update-2026-11-03-pages.json`: 35 games for the pages the other two left without one.
    - A page with several games shows one big QR and small ones.
    - A full page that its QR row would push past the footer is scaled down just enough to fit, at most to 85%. On 3 Nov that was 73 pages, none below 90%. A page with a true-size ruler is never scaled.

## 3. For a teacher to confirm
**Readings:**
- **The smallest coin** (p107, and the two big coins in p116 box 1) is drawn as **১ পয়সা**; the book never labels it.
- **p123:** the labels of the 5–100 g weights can't be read in the book; they're written like the readable "200 g".
- **p153:** the flower key's partial symbols are drawn as quarters.

**The book's slips, kept as printed:**
- **p7/p8:** the picture adds up to 83703, but p8 answers ৮৩৪৭৩.
- **p19 নিজে করি ৪ (৪):** options ক and গ are identical.
- **p37:** repeats "১৪ − ৬ = ৮" where "৬ + ৮ = ১৪" belongs.
- **p52:** a sum is numbered "(২)" twice. **p56:** prints "২ × ৪ = ১২".
- **p86:** says "৩০ জনে" where the story has ৪২ students. **p90 ১০(ক):** "৩৫০ − ৫০ ÷ ৬" isn't whole without brackets.
- **pp. 82 and 89:** some multiple-choice questions have more than one right answer.
- **p104 (৭):** "এবং এবং".
- **p130:** two options are both labelled "গ)". **p131 (১০):** "ঘরির", and none of its options is right.
- **p141:** says "৪টি চিত্র" but prints 3.
- **p147:** the straight angle sits in the নাম row.

**Additions in the book's blank space** (no words added):
- tick boxes beside multiple-choice options;
- dashed answer lines and ruled writing lines;
- answer boxes in column exercises;
- three ৫০০ টাকা notes drawn for p83 নিজে করি ৫;
- an answer box in p90's wheel.

## 4. The files
| File or folder | What it is |
|---|---|
| `class3-math-book.pdf` | The whole book (the only PDF here) |
| `previews/` | A picture of every page: `cover.png`, `page-001.png` … `page-155.png` |
| `content/pNNN-NNN.js` | The pages' words and blocks, one file per range: 001-010, 011-020, 021-036, 037-050, 051-062, 063-077, 078-090, 091-106, 107-117, 118-132, 133-148, 149-155 |
| `content/pNNN-NNN.parts.js` | Each range's own kinds of drawing, prefixed `c3pNNN_` (the 149-155 pages use `c3p107_`) |
| `lib/c2-*.parts.js` | The Class 2 book's kinds (`p040_cs`, `p115_tally`…), loaded for every page. Don't edit; they're copies |
| `build.js` | The page frame, the shared kinds, the markup, the QR codes (from the three activity files), the fit, the cover, the front and back pages, and the checks |
| `SPEC.md` | The rules the eleven helpers wrote their pages by. Read it before changing any content (its picture-prompt part is history now) |
| `prep-art.js` | Makes the user's pictures ready in `art/ready/`, all print-sized: clears the stickers' white backgrounds (at most 520 px), squares the parrot's face, makes the cover and the scenes JPEGs (`COVER_CROP` if ChatGPT smears the cover's sides) |
| `art/new/` | **The user's pictures,** under their exact names (`ref-children.png` is the Class 2 sheet) |
| `art/ready/` | Made by `prep-art.js`; the build uses these first. A sticker missing here is looked for in the Class 2 book's art (the 15 shared ones) |
| `art/stand-in/` | The old book's pictures, used until the new ones arrived; no longer used (`node .work/standin.js <page> <left%> <top%> <width%> <height%> <name>` cuts one) |
| `.work/tessdata/`, `.work/ocr/` | Tesseract's Bengali model and the cached readings of each book page |

## 5. Building
```
node prep-art.js        # after a picture is added or replaced in art/new/
node build.js           # the whole book → class3-math-book.pdf (a few minutes) + previews + the checks
node build.js 91-106    # only those printed pages → .work/out/class3-math-p91-106.pdf (quick checks)
```
**The build must say:**
- `fonts ok`;
- `nothing spills`;
- `the same` for every page.

It also lists the pages it scaled to fit (`fitted …`). A range build reads only the content files named for its pages.

**The markup** is Class 2's plus fractions:
- `□` is an empty box;
- `[[৩৭]]` is a filled box;
- `{{১/২}}` is a fraction;
- `___` is a writing line;
- `**bold**`;
- `\n` is a new line.

**The blocks** are in `SPEC.md`. Class 3 adds:
- `say: "parrot"`;
- `side` on `say`;
- `mark: "kaj" | "anu" | "nije"` on `ex`.

## 6. Changing a picture
1. Save the new picture over the old one in `art/new/`, under the same name. A shared sticker goes in `~/Downloads/class2-math-redesign/art/new/`.
2. Run `node prep-art.js` (and the Class 2 book's for a shared sticker), then `node build.js`.
3. Look at the pages that use it.

The prompts are gone, so a new picture needs a new prompt in the same style: a bright, friendly 2D children's book illustration with clean dark outlines, soft shading, warm colours, and no text or digits. রাফি and তুলি must match `art/new/ref-children.png`; টিয়া is `art/new/face-parrot.png`.

**A tip from 3 Nov:** when ChatGPT hits its image limit it may draw a picture with code, in flat shapes with stick figures. Ask it to make the picture with its image generator.

## 7. Open, on the user's word
1. **The readings and additions** (section 3).
2. **Activity Studio** (the user's steps, live database writes): import into /b/GVB5V3 whichever of the three activity files aren't in yet (`ACTIVITIES-bn.json`, `ACTIVITIES-bn-rest.json`, `ACTIVITIES-bn-update-2026-11-03-pages.json`), publish the games so their QR codes open, then "Replace PDF" with `class3-math-book.pdf`.
3. **More games later:** `build.js` reads the three activity files, so a rebuild adds the QR codes of any new games. A full page that gains a QR row is scaled to fit automatically.
