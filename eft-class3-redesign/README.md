# English for Today, Class Three: eBidyaloy's interactive edition

*NCTB's textbook (2025 reprint, `~/Downloads/English Text Book Class_3.pdf`, 130 PDF pages) rebuilt page for page, in the colourful style of our Let's Learn English books, with a Bangla guide under every line and a QR code on every page. Started and written 30 Oct 2026. Rights: the book is NCTB's; publishing or selling this edition needs NCTB's permission.*

## 1. What the user decided

1. **eBidyaloy's interactive version.**
2. **The same page numbers:** page for page, at the book's own size (194.6 × 255.5 mm).
3. **Every word as printed**, including the book's own slips, which are noted in the helpers' reports.
4. **All new pictures in one consistent style.** The user makes them in ChatGPT from Claude's prompts.
5. **The Bangla guide, British English:** under every English line, its sound in Bangla letters (the hint) and its meaning. Instructions get the meaning only. The hints follow Let's Learn English's British Bangla edition (dotted letters for sounds Bangla lacks; ক/ট/প puffed to খ/ঠ/প্‌হ by the build).
6. **More colourful, child-friendly,** like Let's Learn English: a colour per unit, speaker cards with faces, coloured skill icons, the "Let's practise" ribbon and yellow exercise cards.
7. **QR codes on every page,** each opening that page's activity on eBidyaloy.
8. **Smaller decisions:**
   - Rahat never has a crutch; Sunil (Unit 2) always walks with his.
   - Sabiha on pp. 17 and 26 is one girl.
   - Unit 4, Lesson 4 marks the long /ɑː/: cart কাːট, cut কাট.
   - Unit 4's "same or different" listening exercises show the meaning only.
   - **Voices are made by the user, later,** with ElevenLabs. Claude makes no voice without being asked.

## 2. The finished files

| File | What it is |
|---|---|
| `eft-class3-book.pdf` | **The whole book, 129 pages, about 47 MB** (Activity Studio takes a book PDF of at most 60 MB). The title page (p2) keeps its printed text, logo and ferns, but its picture is the new Ant and the Grasshopper (`u8-l1-summer`), framed in the page's purple and drawn over the old one by `front.js` (`TITLE_PIC`, with pdf-lib; 31 Oct 2026). The new cover; the book's own pp. 2–5 as printed (title page, credits, preface, the Bangla note for teachers: sharp vector text, contents intact); the new contents; then pp. 1–123. Page 124 is blank in the book and left out. |
| `ACTIVITIES-bn.json` | **The activity file for Activity Studio's "Import activities": 213 activities** (§5). |
| `previews/page-NNN.png` | A picture of every page; `front-1/2.png` for the cover and contents. |

## 3. How it's built

```
node build.js            # the whole book → eft-class3-book.pdf (about a minute); prints the checks
node build.js unit5      # one unit only, to check it quickly → .work/out/eft-class3-unit5.pdf
node activities.js       # → ACTIVITIES-bn.json (+ its import check)
```

`eft-class3-book.pdf` is the only PDF in the folder. The working files go in `.work/out/`: the pages' HTML, the body `eft-class3-pages.pdf` (pp. 1–123), `front.pdf` (cover and contents) and any single-unit PDFs. `node build.js` runs `front.js` itself at the end, so the book is always joined from the pages just built.

**The build checks itself.** It must say `fonts ok · nothing spills`, and every page **"the same"**.
- **The text check:** every English word on our page against the book's page (read with `pdftotext`).
- **Allowed differences:** `allow` on a page or `nocheck` on a part, only where the book splits its own text oddly (a title on two lines, a tracing font, a running head in pieces) or draws numbers into a picture. Each one carries its reason.

**The files:**
- **`content/unitN.js`:** the pages' words, as [english, hint, meaning].
- **`content/unitN.parts.js`:** a unit's own kinds of content, with classes prefixed `uN-`.
- **`content/unitN.words.json`:** every single word's hint.
- **`parts.js`:** the shared kinds (dialogue, lines, text, choices, words, table, match, calendar, pics, cards, count, trace, write, boxes, note, pic).
- **`build.js`:** the page frame, the guide, the puff, the QR codes and the checks.
- **`SPEC.md`:** the rules for writing a unit. Read it before changing any content.

**Guide rules in the build:**
- **Names keep their letters (`NO_PUFF`):** a word the book capitalises mid-sentence is a name, so পর্শী, কানিজ় and কাজল are not puffed. Days and months are ordinary words.
- **ː (Unit 4 only)** is drawn in Andika.
- **Agreement:** `.work/hintcheck.js` pairs each English word with its hint across all units. The 808 words in the `words.json` files agree.

**Page codes (`codes.json`):** 214 permanent LS codes, never changed once minted.
- **The book's link is `/b/2KVK93`**: the user created the book in Activity Studio (`6ae4b90874a0846ad93233ba`, "English For Today") before importing, so it got the platform's own link, and an import never changes a book's link. `codes.json` `book` was set to it (the minted `LS4NSYG7` is unused; see `bookNote`), so the cover's QR (a tappable link) opens it.
- `EFT3-P001` … `EFT3-P124` are the pages; `EFT3-Pnnnb` / `c` are the second games (§5).
- Each page's QR opens `https://ebidyaloy.com/a/<code>`; the cover's QR opens `/b/2KVK93`.

## 4. Pictures

**The kit for the user:** `~/Downloads/eft-class3-pictures-2026-10-30/`.
- `PROMPTS.md`: the style text, Unit 1's fixes (done), then Units 2–6.
- `PROMPTS-unit7.md` and `PROMPTS-unit8.md`.
- `references/`: every reference sheet so far (Units 1, 2, 3 and 5).
- `to-fix/unit1-done/`: Unit 1's old pictures, already fixed.

**The fixes folder for the user:** `~/Downloads/eft-class3-picture-fixes-2026-10-30/`: one `PROMPTS.md` (a first message for ChatGPT, then one ready prompt per picture), `to-fix/` (the pictures to edit) and `references/` (only the sheets those prompts name). The source of its prompts is `PICTURE-FIXES-unit5.md` and `PICTURE-FIXES-unit6.md`.

**The source prompts** are `PICTURE-PROMPTS-unitN.md` and `PICTURE-FIXES-unit1.md`. `.work/kit-unit.py N` makes a unit's standalone file for the kit.

**Where pictures go:**
- **`art/new/<name>.png`:** the user's pictures, saved under the exact file names. The build uses a new picture at once.
- **`.work/print/`:** the lighter copies the PDF takes, because Activity Studio takes a book PDF of **at most 60 MB** (with the full PNGs the book was 273 MB). Each copy is a JPEG at quality 80 (a PNG when the picture has see-through parts), just big enough for 200 dpi where the page shows it largest: the build measures every picture on the laid-out pages, keeps the sizes in `.work/print/sizes.json`, and when a size changes it builds once more by itself ("picture copies: N sized to the page; building again"). A copy is made again when its picture changes. The settings are `PRINT_DPI`, `PRINT_MAX` and `PRINT_Q` in `build.js`.
- **`art/stand-in/`:** the old book's pictures (178, only about 100 ppi), shown with a "stand-in" tag until the new one is there.
- **`art/bubbles.json`:** where the speech bubbles sit on a NEW picture, and its crop: `{ name: [{ at: [left%, top%, width%], tail }] }` or `{ bubbles, pos: "50% 0%" }`. Place them for every new picture that has bubbles.
- **`art/faces/<Name>.png`:** speakers' faces, cut from the reference sheets with `sips` (a square around the head, about 230 px on a 1536 × 1024 sheet), shown in the speaker circles.

**Checking a batch** (Claude, each time the user says a unit is done):
- Compare each picture with its prompt and with the reference sheets.
- **Count every person's hands and arms** (one picture had three hands).
- Look for any writing: small signs can be painted out with `sharp`, keeping the original in `.work/originals/` (see `.work/retouch.js`).
- **Check that each file holds its own picture:** twice a picture was saved under its neighbour's name (fixed by swapping the files).
- **Check who is who:** ChatGPT tends to put every child from a sheet into a scene and to swap their clothes or hair (Osman in Ayon's clothes; Porshi instead of Oyshi; Osman's father instead of Oyshi's). It also gave a child a moustache.
- Then place the bubbles, cut the new faces, look at the pages' crops (a crop goes in `bubbles.json` as `pos`) and rebuild.

**Status (30 Oct 2026, late night): ALL PICTURES DONE AND CHECKED.** Every picture is made, the 10 fixes below are in and right (checked against the old versions, hands counted), and no page uses a stand-in any more. The lists below record what was fixed.
- **Unit 1:** all 15 pictures are done and checked, including fixes 4 and 5 (`PICTURE-FIXES-unit1.md`).
- **Units 2, 3 and 4 (65 pictures): all checked and right.**
  - Two pairs had each other's names and were swapped back: `u3-l5-library` / `u3-l5-juice-stall`, and `u4-w-pill` / `u4-w-bean`.
  - New faces cut from `ref-u2-children.png`: Rishat, Sujana, Farzana (the speakers on pp. 21–22) and Sunil. Their colours are in `WHO`.
  - `u4-l6-months` (p62's wide strip) is cropped with `pos: "50% 55%"`.
  - Kept: on p29, the third boy wears Zahid's cap (the text names only Sunil and Rahat); p56's heart has a face and little arms.
- **Unit 5: all 21 made; 14 right, 7 to fix.** The fixes are in `PICTURE-FIXES-unit5.md` (for the user, all 10 fixes are in one folder: `~/Downloads/eft-class3-picture-fixes-2026-10-30/`, with `PROMPTS.md`, `to-fix/` and `references/`):
  - `u5-l1-clean-garden`: a boy with a moustache;
  - `u5-l1-clean-ground`: a girl with Rani's look, walking (Rani uses a wheelchair);
  - `u5-l3-fishing`: Osman in Ayon's red T-shirt (p72 shows him in green beside it);
  - `u5-l4-roof-garden`: Porshi and Osman's father instead of Oyshi and her father;
  - `u5-l4-reading`, `u5-l5-rain-1`, `u5-l5-rain-2`: a girl with Rani's look instead of Oyshi, a boy in Osman's clothes instead of Ayon, and (rain-2) Osman's father again.
- **Unit 6: all 43 made; 40 right, 3 to fix** (`PICTURE-FIXES-unit6.md`; in the same fixes folder):
  - `u6-w-dirt-outline`: a pig in mud instead of mud splashes (make again: the word is "dirt", and a pig is usually left out of a Bangladeshi school book);
  - `u6-l1-friends`: the boy with the crutch has Rishat's hair, grin and wristband (should be Sunil);
  - `u6-l3-playing-outside`: the boy with the crutch wears Zahid's cap (should be Sunil).
  - Right: the eight washing steps match frame to frame, with five fingers on every hand.
- **Units 7 (22) and 8 (13) and their sheets: all checked and right.** p97's bubble moved into the sky (`bubbles.json`: `u7-l1-river` at 45%), so it no longer covers Shihab and Kaniz. Kept: Anika floats her flowers in a woven skirt on p117.

## 5. The activities (`ACTIVITIES-bn.json`)

**What's in the file:**
- **123 page activities,** one behind each page's QR, made by `activities.js` from the checked content:
  - **Repeat After Me, "Listen and say"** (50; at most 50, the user's rule of 31 Oct 2026);
  - **Read Aloud** (37) for rhymes and reading texts;
  - **40 pages have another game** (`GAME` in `activities.js`, 31 Oct 2026):
    - Speak the Correct Response (8: the dialogues on pp. 1, 4, 7, 9, 17, 21, 22, the app says a line and the child the next one; p44's requests in pairs);
    - Read Aloud (4: pp. 3, 84, 109, 115);
    - Memory Cards (7: word and figure on pp. 13, 24, 32, 47; word and meaning on pp. 75, 79; word and picture on p87);
    - Meaning Match (9: pp. 19, 31, 59 numbers; pp. 66, 73, 74, 78, 102, 114 words);
    - Select the Words You Hear (5: pp. 14, 23, 33, 46 numbers; p61 months);
    - Word → Picture, listen mode (3: pp. 83, 93, 97);
    - Sentence Building (4: pp. 36, 42, 62, 90).
  - Pages 2, 6, 8, 11 and 18 stay Listen and say: their dialogues are mostly gaps, or two short exchanges.
  - The picture games show emoji until the teacher sets the book's own pictures (named in each activity's notes) from the Activity Picture Library.
  - Each line has its roman (the hint, puffed, names kept) and its meaning.
  - The number pages (pp. 23–25, 31–33, 46–47, 59–60) get the numbers as words: ninety-one, নাইন্টি-ওয়ান, একানব্বই (৯১).
  - A page with only a line or two also takes its lesson's lines.
- **90 second games on 61 exercise pages,** from `content/activities-extra.js`, with answer keys from the book's own text:

  | Game | How many | From the book's |
  |---|---|---|
  | Group Sort | 18 | True/False, sorting into columns |
  | Speak the Correct Response | 18 | Ask and answer |
  | Word Bank Fill | 16 | Fill the gaps from the box |
  | Match the Pair | 16 | Match column A with B (text both sides) |
  | Select the Missing Word | 9 | Choose the answer |
  | Select the Words You Hear | 8 | Unit 4's sounds, meaning only |
  | Sentence Building | 3 | Rearrange the words |
  | Word Scramble | 2 | Rearrange the letters |

  - **Skipped:** open writing, drawing, projects, punctuation and capital-letter exercises, and a few the book leaves unclear (p72 Q2, p86 "fish", p95 before/after).
- **The checks** (`activities.js` runs Activity Studio's own import cleaning): it must end "the import check: OK" with no help line dropped. A last pass gives names at the start of a sentence their own letters.

**To import:**
1. Create the book in Activity Studio: upload `eft-class3-book.pdf`, and make it an English course with Bangla as the help language and a British accent.
2. Import activities → `ACTIVITIES-bn.json`. Everything comes in as drafts.
3. **The user** makes the voices in the editor, with ElevenLabs and a British voice. Games without voice (word bank, matching, sorting, choosing) can be published at once.

**Every game has its own small QR (30 Oct 2026, late night; the user: "add the small qrs").** Beside the heading of the exercise it is made from sits a 9.5 mm QR in a white chip with a "Play" tab (`.mq` in `build.js`); the page's big "Scan me!" QR stays for its Listen and say. 90 small QRs on 61 pages, so the book has 213 QR links, one per activity in the file.
- **Where each goes:** the game's notes in `content/activities-extra.js` name its exercise ("Practice 2" → the block `n: 2`, "Activity C" or "Activities A and B" → `k: "C"` / `"A"`). A game whose exercise runs on from the page before (p112: Activity C's questions 3–4) gets its QR at the top of the page's first block without a heading. The build prints "games' small QRs: 90 on 61 pages · all placed", or names any it couldn't place.
- **Room:** the chip doesn't make a heading taller (negative margins), but it narrows the title. Pages 100 and 103 became `dense`, and p112's Summer/Winter table lost its tall rows.
- **Checked:** every page's links match the activity file (213 of 213); all 90 small QRs decoded right from the PDF at 300 dpi (scratchpad scan with jsQR; one of them doesn't read at 200 dpi, which is fine for a phone camera at 10–15 cm).

## 6. Next steps

1. The book exists in Activity Studio ("English For Today", /b/2KVK93, 30 Oct). The user: Edit book → Language course (English, Bangla help, British English); Replace PDF with the latest `eft-class3-book.pdf` (its cover QR now opens /b/2KVK93); Import activities → `ACTIVITIES-bn.json`.
4. Import into Activity Studio; the voices; publish. The live database and the voices only on the user's word.
