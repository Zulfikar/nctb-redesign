# প্রাথমিক গণিত, চতুর্থ শ্রেণি: the plan for eBidyaloy's colourful edition

*Version 1, 23 Nov 2026 (the user: "now prepare the plan for the math book of class 4"). **Approved the same day** ("yes" to the Class 3 approach; design first, page QRs later; the games after the book; the pictures from Claude's prompts in ChatGPT). **Started 23 Nov:** the project is set up, pages ১–৩ are written as the model, SPEC.md and PICTURE-PROMPTS-base.md are written, wave 1 is at work. The model is our finished Class 3 redesign (`~/Downloads/class3-math-redesign`, its README and SPEC.md), which followed Class 2. The open questions are in section 9.*

**Where it stands (23 Nov 2026, evening):** all 174 pages are written (Claude: pp ১–৩; 14 helpers in two waves), checked and built: `class4-math-book.pdf`, 182 pages (our cover, the book's 6 front pages, ১–১৭৪, its back page), 45.7 MB; every page "the same" as the book, fonts ok, nothing spills, every number checked (`build.js` `CHECKED`); 11 pages scaled to fit (the least p১২০, 86%), none with a true-size drawing. The book's slips and our deliberate changes are in **`TEACHER-CHECK.md`**. **Pictures (23 Nov, late): all 39 are in** (`art/new/`, checked one by one, `node prep-art.js && node build.js`): no stand-in or emoji left; the book is 50.4 MB; every page still "the same". Changed with them: p১২৪'s picture is cropped lower (`pos`, h 52 mm) so the two red distance arrows run on its bare ground (p১২৪ now fits at 99%); a picture with a white background takes its card's tint (`.pic:not(.framed) img { mix-blend-mode: multiply }`). `p139-shaheed-minar.png` shows two middle frames (the real Minar has one bowing middle frame and two shorter ones on each side; my prompt said "a middle pair", corrected in `PICTURE-PROMPTS-p133-142.md` and the kit for any later remake): **kept as it is** (the user, 23 Nov). **Next:** the games (`~/Downloads/NCTB-Redesigned/class4-math-activities`) and the page QRs once the Activity Studio book exists.

---

## 1. The source book
- **The file:** `~/Downloads/2. Math_G4_Bangla_AY-2026_(in-25)      24.09.25_compressed.pdf`, NCTB's *প্রাথমিক গণিত, চতুর্থ শ্রেণি*, 2026 edition.
- **182 PDF pages:**
  - PDF p1: the cover;
  - PDF pp2–7: the front pages (title page, credits, preface, the characters' and symbols' key, contents, the name/school label page);
  - PDF pp8–181: **printed pages ১–১৭৪** (printed page n = PDF page n − 7);
  - PDF p182: the back cover.
- **Page size:** the covers are 540 × 718 pt = **190.5 × 253.3 mm**, the inside pages 522 × 684 pt = 184.2 × 241.3 mm (found by a helper on 23 Nov; Class 3's were 195.5 × 254.6 mm). **Our pages are the covers' size**, and the book's own front pages and back page are scaled to it when the book is put together, so the PDF has one page size.
- **The text can't be copied.** Every word is drawn as a shape, so each page is read from its picture (Tesseract's Bangla model + our eyes), as with Class 3.
- **The same cast and markers as Class 3** (the key page, PDF p5):
  - রাফি (the boy), তুলি (the girl) and টিয়া (the parrot);
  - মূল প্রশ্ন (the ? bubble);
  - কাজ (pink triangle), অনুশীলন (a square, **orange** here, teal in Class 3), নিজে করি (blue circle).
- **New section heading:** each chapter ends with **দেখি পারি কি না** (a review) and then **নিজে করি**.
- **Rights:** the book is NCTB's. Like Classes 2 and 3, our edition is a sample or proposal; publishing or selling it needs NCTB's permission.

## 2. What we make
**`class4-math-book.pdf`,** page for page, 182 pages:
- our new cover;
- the book's front pages as printed (PDF pp2–7);
- printed pages ১–১৭৪, redesigned;
- the book's back page as printed.

**The decisions are Class 3's** (its README section 2):
1. **Page for page** at the book's own size, with the same printed page numbers.
2. **Every word as printed,** the book's slips included, each noted in the content file and listed for a teacher.
3. **The Class 2/3 look:** a colour per chapter (Class 3's first 11 colours), an opening band on each chapter's first page, the ? pill, coloured tables, the speakers in cards with their faces.
4. **The markers kept as printed,** each card tinted to match its marker.
5. **Anything whose count, length, angle or time matters is drawn by the build,** never by ChatGPT.
6. **Digits:** Bangla in all text; clock faces, rulers and protractors keep whatever the book prints.
7. **Answer boxes never give the answer away.**
8. **QR codes:** the cover's QR opens the book in Activity Studio; each page's QR opens its games.
9. **Size:** Activity Studio takes a book PDF of at most 60 MB. Class 3 was 47 MB for 162 pages, so Class 4 should land near 53 MB; the pictures' print copies can be made smaller if needed.

## 3. The chapters
| Ch. | Chapter | Pages | The lessons (from the book) | New drawings it needs |
|---|---|---|---|---|
| ১ | সংখ্যা ও স্থানীয় মান | ১–২২ (22) | counting large numbers (নিযুত, কোটি); the Bangladeshi and the international place names; commas; comparing numbers; the largest and smallest number from cards; number patterns; দেখি পারি কি না (২০); নিজে করি (২১–২২) | place-value tables up to কোটি, with the international heads; patterns of numbers and shapes |
| ২ | যোগ ও বিয়োগ | ২৩–৪০ (18) | adding and taking away big numbers, word problems; যোগ ও বিয়োগের সম্পর্ক; review (৩৮); নিজে করি (৩৯–৪০) | column sums of up to 7 digits with carries and borrows (Class 3's kind, wider) |
| ৩ | গুণ | ৪১–৪৮ (8) | multiplying by 2- and 3-digit numbers; review (৪৬); নিজে করি (৪৭); an easy way to multiply (৪৮) | column multiplication with partial products |
| ৪ | ভাগ | ৪৯–৬৬ (18) | long division by 1- and 2-digit numbers, remainders, word problems; review (৬৪); নিজে করি (৬৫–৬৬) | long division with a 2-digit divisor |
| ৫ | গাণিতিক বাক্য | ৬৭–৮০ (14) | maths symbols and relation signs; finding the missing number; the order of operations (হিসাবের ধারাবাহিকতা) and brackets; review (৭৯); নিজে করি (৮০) | mostly text; number sentences with boxes |
| ৬ | গুণিতক ও গুণনীয়ক | ৮১–৯৬ (16) | multiples (the ১–১০০ chart); factors; prime and composite numbers; review (৯৫); নিজে করি (৯৬) | the hundred chart with rings and boxes (Class 3's), factor rectangles of squares, a prime sieve |
| ৭ | সাধারণ ভগ্নাংশ | ৯৭–১১০ (14) | proper, improper and mixed fractions; equivalent fractions; comparing; adding and taking away; review (১০৮); নিজে করি (১০৯–১১০) | Class 3's fraction strips, wall and number lines, past 1 (up to 2) |
| ৮ | দশমিক ভগ্নাংশ | ১১১–১২০ (10) | tenths, decimals on a ruler (cm and mm), adding and taking away decimals; review (১১৯); নিজে করি (১২০) | a true-size ruler with mm, tenth strips, decimal place-value tables |
| ৯ | পরিমাপ | ১২১–১৪২ (22) | length; perimeter; weight; liquid volume; area on squared paper (square cm); time and dates (the calendar, days and months); review (১৪০); নিজে করি (১৪১–১৪২) | squared-paper area shapes, calendar months, clocks (Class 3's), scales and jugs (Class 2/3's) |
| ১০ | জ্যামিতি | ১৪৩–১৬৮ (26) | measuring angles with a protractor; perpendicular lines; parallel lines; review (১৫৬); triangles by sides and by angles; rectangles and squares; review (১৬৫); geometric patterns (grilles, tiles); নিজে করি (১৬৮) | **a protractor drawn by code** (true degrees) with angle arms, right-angle marks, set squares, triangles with equal-side ticks, dot and square grids, tiling patterns |
| ১১ | উপাত্ত সংগ্রহ ও বিন্যস্তকরণ | ১৬৯–১৭৪ (6) | collecting data in tables (tallies); bar charts: reading and drawing them; নিজে করি (১৭৪) | **bar charts** on squared paper, empty grids to draw on |

**Pictures for ChatGPT** (scenes and stickers), seen so far:
- **Scenes:** the electric car (১), a phone (২), a bicycle shop (১১), saplings (৩২), sacks of goods (৪০), biscuits (৬০), the National Memorial and the Shaheed Minar (১৩৯), a bridge and a road (১২১–১২৩), the market (১২৭–১২৮), a railway track (১৫২), window grilles and craft patterns (১৬৬–১৬৭), and the children in a few scenes.
- **Stickers:** reused from Class 2 and 3 wherever the object is the same. New ones only where needed.
- **The cover:** a new picture, like Class 3's. রাফি, তুলি and টিয়া keep the Class 3 faces, so the series looks like one.

The full list comes from the helpers' prompt files (section 5), checked by me, then put in one kit for you.

## 4. The project
`~/Downloads/class4-math-redesign`, made from a copy of Class 3's:
- **`build.js`** adapted:
  - the size (190.5 × 253.3 mm);
  - `FRONT = 7`;
  - the 11 chapters and their colours;
  - the orange অনুশীলন square;
  - the new **দেখি পারি কি না** ribbon (like নিজে করি);
  - the front pages PDF pp2–7 and the back page PDF p182 as printed;
  - the QR codes from Class 4's activity files.
- **`lib/`:** Class 2's kinds as they are, plus Class 3's kinds (renamed `c3-*.parts.js`), so the helpers can reuse both.
- **`content/pNNN-NNN.js`** and **`.parts.js`:** the pages and each range's own kinds (prefixed `c4pNNN_`).
- **`SPEC.md`:** Class 3's rules for the helpers, with Class 4's numbers and the new blocks.
- **`prep-art.js`, `art/`:** the pictures. Stickers missing here are looked for in Class 3's art, then Class 2's.
- **The text check:** Tesseract reads each book page (about 15 s a page, cached in `.work/ocr/`), and every word on our page must be found there. `node build.js` must end with `fonts ok`, `nothing spills`, and every page `the same`.

## 5. Who writes which pages
14 helpers, each a range that starts and ends with a lesson, in two waves of 7 (so the Mac isn't asked to read 174 pages at once):

| Wave | Range | Pages | What |
|---|---|---|---|
| – | ০০১–০০৩ | 3 | the model pages, by Claude (done 23 Nov) |
| 1 | ০০৪–০১১ | 8 | ch১: counting, place names, commas, comparing |
| 1 | ০১২–০২২ | 11 | ch১: number cards, patterns, review, নিজে করি |
| 1 | ০২৩–০৩১ | 9 | ch২: যোগ, start of বিয়োগ |
| 1 | ০৩২–০৪০ | 9 | ch২: বিয়োগ, the relation, review, নিজে করি |
| 1 | ০৪১–০৫২ | 12 | ch৩ গুণ, start of ch৪ ভাগ |
| 1 | ০৫৩–০৬৬ | 14 | ch৪ ভাগ |
| 1 | ০৬৭–০৮০ | 14 | ch৫ গাণিতিক বাক্য |
| 2 | ০৮১–০৯৬ | 16 | ch৬ গুণিতক ও গুণনীয়ক |
| 2 | ০৯৭–১১০ | 14 | ch৭ সাধারণ ভগ্নাংশ |
| 2 | ১১১–১২০ + ১৬৯–১৭৪ | 16 | ch৮ দশমিক and ch১১ data (both drawing-heavy, short) |
| 2 | ১২১–১৩২ | 12 | ch৯: length, perimeter, weight, volume, area |
| 2 | ১৩৩–১৪২ | 10 | ch৯: area, time and dates, review, নিজে করি |
| 2 | ১৪৩–১৫৬ | 14 | ch১০: angles and the protractor, perpendicular and parallel lines, review |
| 2 | ১৫৭–১৬৮ | 12 | ch১০: triangles, rectangles and squares, patterns, নিজে করি |

**Before the helpers,** I set up the project and write **printed pages ১–৩ myself** (the chapter opener, a place-value table, a talk page), to check the new size and the new pieces. Those three pages are the model the helpers match.

**After them,** I:
- build the whole book;
- look at every page against the original;
- fix what's off;
- list the book's slips for a teacher;
- make the picture kit.

## 6. The pictures
Done the Class 3 way:
1. **The kit:** I write one prompt file for you (`~/Downloads/class4-math-pictures/PROMPTS.md`): the cover first, then the scenes, then the new stickers. Shared stickers are only named.
2. **You make them** in ChatGPT and save them in `art/new/` under their exact names.
3. **I check each one** against its prompt and its page, and ask for a remake where needed. In Class 3, ChatGPT drew 9 scenes with code (flat shapes, stick figures); those were remade.
4. **The rebuild** puts them in. Until a picture arrives, the old book's picture stands in, with a small "stand-in" tag.

## 7. The games (Activity Studio)
The Class 3 way (`~/Downloads/class3-math-activities`): every page from ১ to ১৭৪ gets at least one game, and every game has at least 10 questions (your rule).
- **Types:** Multiple Choice, Number Match, Work It Out (sums, long division, missing numbers), Fraction Play (chapter ৭), and Categorize where it fits (prime or composite, kinds of triangles).
- **About 230–260 games,** written by helpers per chapter from the pages, checked with Class 3's `validate` scripts, in one import file (plus an update file for any page left without one).
- **The QR codes come from a hash of each game's key,** so rebuilding the games never changes a printed QR.
- **What I need from you:** an Activity Studio book for Class 4 (for example «প্রাথমিক গণিত - ক্লাস ফোর»), shared so it has its /b/ link. You import the file, publish, then Replace PDF.

## 8. The order of work
1. Set up the project, write printed pages ১–৩, and show them to you. *(me)*
2. Wave 1 (pages ১–৮০), then wave 2 (৮১–১৭৪). *(the helpers)*
3. The whole build, every page checked, fixes, the slips list. *(me)*
4. The picture kit. *(me)* The pictures. *(you, in ChatGPT)* Checks and rebuild. *(me)*
5. The games, the import file, and the QR codes in the book. *(helpers + me)* Import, publish, Replace PDF. *(you)*

Steps 4 and 5 can run side by side.

## 9. Decisions for you
1. **The same approach as Class 3** (sections 2 and 5)? *Suggested: yes.*
2. **The Activity Studio book:** does one exist for Class 4? If not, please make it and send its /b/ link. Until then the book builds with no page QRs.
3. **The games:** with the redesign (steps 2 and 5 side by side), or after the book is finished? *Suggested: after step 3, so the games follow the checked pages.*
4. **The cover:** a new picture as for Class 3, with রাফি, তুলি and টিয়া. Anything you'd like on it (for example the protractor and the bar chart, like the original's cover)?
