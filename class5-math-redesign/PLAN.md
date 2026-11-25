# প্রাথমিক গণিত, পঞ্চম শ্রেণি: the plan for eBidyaloy's colourful edition

*Version 1, 25 Nov 2026. **Started the same day** (the user: "yes"; the Activity Studio book after the design; "you prepare the prompt for all image needed, I will generate them by chatGPT"): the project is set up, pages ১–৩ are written as the model, SPEC.md is written, wave 1 is at work.*

> **25 Nov 2026, evening: ALL 182 PAGES DESIGNED.** Claude wrote pp. ১–৩ and the core; 14 helpers wrote the rest in two waves (wave 2 paused once at the 5-hour limit and resumed on the user's "resume"). `node build.js` → `class5-math-book.pdf`: 190 pages (our cover, the book's front pages PDF 2–7, ১–১৮২, its back page), 60.8 MB, **fonts ok · nothing spills · every page the same**; 47 pages scaled to fit (the least 87%). The book's slips: **16 fixed (6 marked judgement), 53 flagged**, in `TEACHER-CHECK.md` (made from `.work/teacher-check.txt`). The core gained: `fixes`/`flags` on a page, and no block shrinks on a full page (`.body > * { flex-shrink: 0 }`). **The pictures:** the kit is `~/Downloads/class5-math-pictures/PROMPTS.md`: **60 pictures** (the cover, 37 scenes, 22 stickers; `refs/` holds ref-children, face-parrot and three style pictures; the user saves finished ones in `done/`). Already in: p019's egg tray (Class 3's) and p031's lychees (Class 4's); p117's map uses the series' house, village-house and hospital icons, with four new map stickers. Until a picture arrives, the old book's picture stands in, tagged. **When `p119-truck.png` arrives:** move p119's two word overlays («সমগ্র বাংলাদেশ», «৫ টন») onto its plain band and set the picture's height to keep its shape. **Next:** the user's pictures (Claude checks each, `node prep-art.js && node build.js`), then the Activity Studio book (the user, after the design) and the games (`../class5-math-activities`).

**The user's decisions (25 Nov 2026), after Claude's analysis of the book:**
1. "same as class 4": page for page, the Class 2–4 look, design first, page QRs later, the games after the book, the pictures from Claude's prompts in ChatGPT.
2. The book's slips: "go as your recommendation". **A clear error is fixed and listed for a teacher** (`TEACHER-CHECK.md`); the book's own teaching choices are kept and flagged.
3. The project lives here, `~/Downloads/NCTB-Redesigned/class5-math-redesign`; its games will go in `../class5-math-activities`.

**The model** is our Class 4 redesign (`../class4-math-redesign`: its `PLAN.md`, `SPEC.md`, `build.js`, `lib/`). Class 5 has the same page size, the same front-page layout and the same cast and markers, so its builder is reused almost as it is. The open questions are in section 9.

---

## 1. The source book
- **The file:** `source/class5-math-nctb-2026.pdf`, a copy of `~/Downloads/7. Math_G5, BV- 30.09.25_compressed.pdf`. It is NCTB's *প্রাথমিক গণিত, পঞ্চম শ্রেণি* for the 2026 school year ("জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড কর্তৃক ২০২৬ শিক্ষাবর্ষ থেকে পঞ্চম শ্রেণির পাঠ্যপুস্তকরূপে নির্ধারিত"; first printed September 2025).
- **190 PDF pages:**
  - PDF p1: the cover.
  - PDF pp2–7: the front pages:
    - title page;
    - credits;
    - preface;
    - «চরিত্র ও প্রতীকের ব্যাখ্যা» (the characters and the markers);
    - contents;
    - the name/school label page.
  - PDF pp8–189: **printed pages ১–১৮২** (printed page n = PDF page n − 7, as in Class 4).
  - PDF p190: the back cover.
- **Page size, the same as Class 4:**
  - inside pages 522 × 684 pt, which is 184.2 × 241.3 mm;
  - covers 540 × 718–722 pt, which is about 190.5 × 253.3 mm.

  **Our pages are the covers' size**, and the book's front pages and back page are scaled to it, as in Class 4.
- **The text can't be copied:** every word is drawn as a shape. Tesseract's Bangla model reads most pages well.
  - It garbles stacked fractions and many decimals. So chapters ৪–৬ (pp ৪৯–১০৪) must be read by eye, word by word.
  - A first reading of every page (25 Nov) is in Claude's scratchpad. The build reads the pages again for its own text check.
- **The same cast and markers as Classes 3–4** (the key page, PDF p5):
  - রাফি (the boy), তুলি (the girl) and টিয়া (the parrot);
  - মূল প্রশ্ন (the ? bubble);
  - কাজ (the triangle), অনুশীলন (the orange square), নিজে করি (the blue circle).
- **Review pages:** each chapter ends with **দেখি পারি কি না**, then **নিজে করি**, sometimes with a further practice page after it (pp ১৬, ৩০, ৪৮, ৯০, ১০৪, ১৮২).
  - Chapter ৮ has three parts, each with its own review and নিজে করি:
    - length, weight and volume: review ১২২, নিজে করি ১২৩;
    - area: review ১৩২, নিজে করি ১৩৩;
    - time: review ১৪৬–১৪৭, নিজে করি ১৪৮.
- **Rights:** the book is NCTB's. As with Classes 2–4, our edition is a sample or proposal; publishing or selling it needs NCTB's permission.

## 2. What we make
**`class5-math-book.pdf`,** page for page, 190 pages:
- our new cover;
- the book's front pages as printed (PDF pp2–7);
- printed pages ১–১৮২, redesigned;
- the book's back page as printed.

**The decisions are Class 4's** (its PLAN section 2), with one change, the slips (rule 2):
1. **Page for page** at the book's own size, with the same printed page numbers.
2. **Every word as printed, except a clear error.**
   - A wrong date, a wrong count or a sum that doesn't work is fixed.
   - Each fix is noted in the content file and listed in `TEACHER-CHECK.md` with the book's original.
   - Anything that is the book's own way of teaching is kept and flagged for a teacher. An example is p১৩৮'s "add one extra day" when working out an age.
3. **The Class 2–4 look:**
   - a colour per chapter (Class 4's first 10 colours);
   - an opening band on each chapter's first page;
   - the ? pill and coloured tables;
   - the speakers in cards with their faces;
   - the দেখি পারি কি না and নিজে করি ribbons.
4. **The markers kept as printed,** each card tinted to match its marker.
5. **Anything whose count, length, angle, date or share matters is drawn by the build,** never by ChatGPT. This covers grids, rulers, calendars, clocks, charts and pie slices.
6. **Digits:** Bangla in all text; clock faces, rulers and calendars keep what the book prints. The 2025 calendar has English dates with Bangla dates under them.
7. **Answer boxes never give the answer away.**
8. **QR codes:** the cover's QR opens the book in Activity Studio, and each page's QR opens its games. They are added after the games, as in Class 4.
9. **Size:** Class 4 came to 64.6 MB for 182 pages with its QR codes, so Class 5 should land near 68 MB. Activity Studio now takes a book PDF of up to 100 MB.

## 3. The chapters
| Ch. | Chapter | Pages | The lessons (from the book) | New drawings it needs |
|---|---|---|---|---|
| ১ | গুণ ও ভাগ | ১–১৬ (16) | multiplying by 3- and 4-digit numbers (partial products); easy ways with 0s and with ৯৯, ৯৯৯, ৯৯৯৯; long division by 2- and 3-digit divisors; dividend = divisor × quotient + remainder; word problems; review (১৪); নিজে করি (১৫–১৬) | wide column multiplication grids (p২'s ৮৫৩৬ × ৯৭২), long division with 3-digit divisors and step arrows |
| ২ | গাণিতিক বাক্য | ১৭–৩০ (14) | number sentences; the order of operations (হিসাবের ধারাবাহিকতা) and brackets; word problems; tape diagrams (ages, prices); **ঐকিক নিয়ম** (unitary method, ২৫–২৭); review (২৮); নিজে করি (২৯–৩০) | tape diagrams, unitary-method tables, price tags (p২৩'s furniture) |
| ৩ | গুণিতক ও গুণনীয়ক | ৩১–৪৮ (18) | multiples, common multiples, **লসাগু**; prime factors (factor trees); divisibility by ৩ and ৪; factors, common factors, **গসাগু**; word problems (buses, ribbons, gifts); review (৪৬); নিজে করি (৪৭–৪৮) | multiple rows and number lines, overlapping circles (Venn) of multiples and factors, factor trees, the division ladder (২ \| ২৮, ৪২, ৫৬), factor pair tables |
| ৪ | সাধারণ ভগ্নাংশ | ৪৯–৬২ (14) | mixed ↔ improper; equivalent fractions; simplest form; comparing with a common denominator; adding and taking away with different denominators; mixed numbers; review (৬১); নিজে করি (৬২) | Class 4's fraction strips and number lines (to 3), fraction circles, bottles and jugs |
| ৫ | দশমিক ভগ্নাংশ | ৬৩–৯০ (28) | thousandths; place value; number lines to ০.০০১; litres; decimal ↔ fraction; comparing; + −; **× by a whole number, by 10 and 100, by a decimal; ÷ by a whole number, by 10 and 100, by a decimal**; review (৮৭–৮৮); নিজে করি (৮৯–৯০) | place-value tables to thousandths, 10 × 10 grids and the 1000 cube, number lines in ০.০০১ steps, measuring cylinders with a close-up, column × and long ÷ with decimal points, the ×10/×100 shift arrows |
| ৬ | শতকরা | ৯১–১০৪ (14) | **all new:** percent as hundredths; % of a number; percent bars; profit and loss %; finding the cost price; **মুনাফা** (interest) and its rate; review (১০২); নিজে করি (১০৩–১০৪) | **10 × 10 percent grids**, dot arrays, **percent bars with a 0–100 scale**, tape diagrams for profit |
| ৭ | গড় | ১০৫–১১৪ (10) | **all new:** the average; levelling (marbles, glasses); tables of ages, heights and walking; a group activity measuring heights; review (১১৩); নিজে করি (১১৪) | levelling bar diagrams, tables to fill |
| ৮ | পরিমাপ | ১১৫–১৪৮ (34) | **length** (km … mm, ডেকামি, হেমি), a map of distances; **weight** (টন); **volume**; review (১২২), নিজে করি (১২৩); **area** of rectangles and squares, dot paper, হেক্টর and এয়র, L-shapes, **parallelograms and triangles** (right, acute, obtuse, between parallel lines); review (১৩২), নিজে করি (১৩৩); **time**: converting units, ages and dates, the Liberation War, Bangla and English calendars, **24-hour time and a train timetable**, **leap years, decade, যুগ and century**; review (১৪৬–১৪৭, a full 2025 calendar), নিজে করি (১৪৮) | unit ladders, the distance map, scales and jugs (Class 2–4's), **area on 1 cm squared and dot paper**, parallelogram cut-and-move, triangles in rectangles, **24-hour clock faces**, the train timetable, **the 2025 calendar (6 months, English and Bangla dates)** |
| ৯ | জ্যামিতি | ১৪৯–১৭০ (22) | **trapezium and parallelogram**, sorting by parallel sides, making quadrilaterals from rectangles and folded paper, **diagonals**, a table of properties; **the circle** (centre, radius, diameter, circumference, compass designs); review (১৬৩); tiling patterns, dot paper; **solids** (cube, cuboid, cylinder, cone, sphere; faces and edges; patterns); নিজে করি (১৬৯–১৭০) | quadrilaterals on squared and dot grids, diagonals, **circles drawn by code** (radius and diameter marked), circle designs, tilings, **simple 3D solids** drawn by code |
| ১০ | উপাত্ত বিন্যস্তকরণ | ১৭১–১৮২ (12) | collecting data; **tallies with class intervals**; bar charts and the **histogram** (আয়তলেখ); the **line graph** (রেখাচিত্র); the **pie chart** (পাই চার্ট) with %; review (১৮০); নিজে করি (১৮১–১৮২) | tally tables, **histograms**, **line graphs** on squared paper, **pie charts with true angles**, empty grids to draw on |

**What Class 4 already has** (its `lib/`, from Classes 2 and 3):
- column sums and long division;
- fraction strips and number lines;
- rulers, scales and jugs;
- squared and dot paper;
- calendars and clocks;
- bar charts;
- the opening band, the speech cards and the review ribbons.

**New kinds for Class 5:**
- the pie chart, the histogram and the line graph;
- the 10 × 10 percent grid and the percent bar;
- the factor tree and the division ladder;
- the Venn circles;
- the circle with its parts;
- the trapezium and the diagonals;
- the 3D solids;
- the 24-hour clock;
- the timetable;
- the full-year calendar.

They are written once in `lib/c5-*.parts.js` (by Claude, before or with wave 1) so every helper uses the same ones.

**Pictures for ChatGPT, seen so far:**
- **Scenes:**
  - the bridge and bus (১), a phone shop (২), blanket distribution (৭);
  - furniture prices (২৩), the bus terminal (৩৬), guests and sweets (৪০);
  - bottles of water (৫৬), a reading table (৬৩), a gallery of spectators (১০২);
  - marbles and children (১০৫), a walking father (১০৭), glasses of juice (১০৮);
  - a truck (১১৯), the market and a petrol pump (১২১), a village trip (১৩৪);
  - the train (১৪৩), objects shaped like solids (১৬৬), the classroom (১৭১);
  - and the children in a few scenes.
- **Stickers:** reused from Classes 2–4 wherever the object is the same.
- **About 45–55 in all**, counted exactly from the helpers' prompt files.
- **The cover:** a new picture, as for Classes 3–4. রাফি, তুলি and টিয়া keep their faces, so the series looks like one.

**Slips found in the analysis (25 Nov):**
- **p১৪৭ (the 2025 calendar):**
  - the heading says «১৪৩০ – ১৪৩১ বঙ্গাব্দ», and 2025 is **১৪৩১–১৪৩২** (the page itself shows ১ বৈশাখ on 14 April 2025);
  - April is printed with a **31st** day.

  Both will be fixed. The weekdays, the Bangla dates and the page's five questions are right.
- **p১৩৮:** Mary's age is worked out by adding one extra day: born 25/02/2009, on 26/06/2024 she is «১৫ বছর ০৪ মাস ০২ দিন», where the usual answer is 15 years 4 months 1 day. This is the book's stated method, so it is kept and flagged for a teacher.

## 4. The project
`~/Downloads/NCTB-Redesigned/class5-math-redesign`, made from a copy of Class 4's:
- **`build.js`** adapted:
  - the same size;
  - `FRONT = 7`;
  - the 10 chapters and their colours;
  - the front pages PDF pp2–7 and the back page PDF p190 as printed;
  - the QR codes from Class 5's activity file, once it exists.
- **`lib/`:**
  - Class 4's kinds as they are (Class 2's, Class 3's `c3-*`, Class 4's `c4-*`);
  - Class 5's new ones (`c5-*`, section 3).
- **`content/pNNN-NNN.js`** and **`.parts.js`:** the pages and each range's own kinds (prefixed `c5pNNN_`).
- **`SPEC.md`:** Class 4's rules for the helpers, with:
  - Class 5's numbers;
  - the new kinds;
  - **the slip rule (section 2, rule 2)**: a helper fixes a clear error, comments it in the content file and reports it, and keeps and reports anything else.
- **`prep-art.js`, `art/`:** the pictures. A sticker missing here is looked for in Class 4's art, then Class 3's, then Class 2's.
- **The text check:** Tesseract reads each book page (cached in `.work/ocr/`), and every word on our page must be found there; a fixed slip is listed as an expected difference. `node build.js` must end with `fonts ok`, `nothing spills`, and every page `the same`.
- **`TEACHER-CHECK.md`:** every fix (the book's text and ours), every flag, and every place we made a choice.

## 5. Who writes which pages
14 helpers, each a range that starts and ends with a lesson, in two waves (6, then 8). *(25 Nov: chapter ৩ went to one helper, not two: both halves share its factor trees, ladders and Venn circles.)*

| Wave | Range | Pages | What |
|---|---|---|---|
| – | ০০১–০০৩ | 3 | the model pages, by Claude: the chapter opener (the bridge, the talk), the wide multiplication grid, the grid exercises |
| 1 | ০০৪–০১৬ | 13 | ch১: easy ways to multiply, long division, review, নিজে করি |
| 1 | ০১৭–০৩০ | 14 | ch২ গাণিতিক বাক্য, ঐকিক নিয়ম |
| 1 | ০৩১–০৪৮ | 18 | ch৩ গুণিতক ও গুণনীয়ক: multiples, লসাগু, prime factors, divisibility, factors, গসাগু, review, নিজে করি |
| 1 | ০৪৯–০৬২ | 14 | ch৪ সাধারণ ভগ্নাংশ (read by eye) |
| 1 | ০৬৩–০৭৩ | 11 | ch৫: thousandths, place value, number lines, converting, comparing, + − (read by eye) |
| 1 | ০৭৪–০৯০ | 17 | ch৫: × and ÷ of decimals, review, নিজে করি (read by eye) |
| 2 | ০৯১–১০৪ | 14 | ch৬ শতকরা |
| 2 | ১০৫–১১৪ | 10 | ch৭ গড় |
| 2 | ১১৫–১২৩ | 9 | ch৮: length, weight, volume, review, নিজে করি |
| 2 | ১২৪–১৩৩ | 10 | ch৮: area, review, নিজে করি |
| 2 | ১৩৪–১৪৮ | 15 | ch৮: time, the calendars, 24-hour time, review (with the 2025 calendar), নিজে করি |
| 2 | ১৪৯–১৫৮ | 10 | ch৯: trapezium, parallelogram, diagonals |
| 2 | ১৫৯–১৭০ | 12 | ch৯: the circle, patterns, solids, নিজে করি |
| 2 | ১৭১–১৮২ | 12 | ch১০: tallies, histogram, line graph, pie chart, review, নিজে করি |

**Before the helpers,** I:
- set up the project;
- write the new kinds that several ranges share (section 3);
- write **printed pages ১–৩ myself**, as the model the helpers match.

**After them,** I:
- build the whole book;
- look at every page against the original;
- fix what's off;
- write `TEACHER-CHECK.md`;
- make the picture kit.

## 6. The pictures
Done the Class 4 way:
1. **The prompts:** each helper writes the prompts for its pages (`PICTURE-PROMPTS-pXXX-YYY.md`, with `PICTURE-PROMPTS-base.md` for the shared rules and the cast). I check them and give you one kit: the cover first, then the scenes, then the new stickers. Shared stickers are only named.
2. **You make them** in ChatGPT and save them in `art/new/` under their exact names.
3. **I check each one** against its prompt and its page, and ask for a remake where needed.
4. **The rebuild** puts them in. Until a picture arrives, the old book's picture stands in, with a small "stand-in" tag.

## 7. The games (Activity Studio)
After the book, the Class 4 way (`../class4-math-activities`): every page from ১ to ১৮২ gets at least one game, and every game has at least 10 questions (your rule).
- **Types:**
  - Multiple Choice and Number Match;
  - Work It Out (sums, long division, missing numbers, decimals);
  - Fraction Play (chapter ৪);
  - Categorize where it fits (multiples or factors, trapezium or parallelogram, solids);
  - the math series' newer games where they suit a page (number-line hops, arrays).
- **About 260–290 games,** in one import file, checked with the activity checks before you import.
- **The QR codes come from a hash of each game's key,** so rebuilding the games never changes a printed QR.
- **What I need from you:** an Activity Studio book for Class 5 (for example «প্রাথমিক গণিত - ক্লাস ফাইভ»), shared so it has its /b/ link. You import the file, publish, then Replace PDF.

## 8. The order of work
1. Set up the project, write the shared new kinds and printed pages ১–৩, and show them to you. *(me)*
2. Wave 1 (pages ৪–৯০), then wave 2 (৯১–১৮২). *(the helpers)*
3. The whole build, every page checked, fixes, `TEACHER-CHECK.md`. *(me)*
4. The picture kit. *(me)* The pictures. *(you, in ChatGPT)* Checks and rebuild. *(me)*
5. The games, the import file, and the QR codes in the book. *(helpers + me)* Import, publish, Replace PDF. *(you)*

Steps 4 and 5 can run side by side.

## 9. Open questions for you
1. **The Activity Studio book:** please make one for Class 5 when convenient and send its /b/ link. Until then the book builds with no QR codes (as Class 4 did until its games).
2. **The cover:** a new picture with রাফি, তুলি and টিয়া. *Suggested:* the class 5 ideas around them: a pie chart, a percent grid, a compass drawing a circle and a few solids (the original's cover shows children measuring with a balance and a measuring cylinder). Anything you'd like on it?
3. **Start:** step 1 now, then the two waves? *(Class 4 took one long day for steps 1–3.)*
