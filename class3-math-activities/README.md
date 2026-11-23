# প্রাথমিক গণিত, তৃতীয় শ্রেণি · অধ্যায় ৯ ভগ্নাংশ: Activity Studio file

`ACTIVITIES-bn.json` is an **eBidyaloy Activity Studio activity file** (format `ebidyaloy-activity-import`, version 1) for the fraction chapter of the NCTB textbook *প্রাথমিক গণিত, তৃতীয় শ্রেণি* (2026 edition), printed pp.91–106. Import it into the book **/b/GVB5V3** (“প্রাথমিক গণিত - ক্লাস থ্রি”, 162 pages, id `6ae830fca87df2fa704174bc`; no language course): the file is a Bangla subject book's (`book.language: "bn"`, no `teachLanguage`), like the Class 2 file. Every activity comes in as a draft, tied to the printed page it practises; its code (`LS…`) is permanent and can be printed in a QR.

- **24 activities**, all in chapter “অধ্যায় ৯ · ভগ্নাংশ”, in Bangla with Bangla digits; no voice is needed (two multiple-choice questions ask for a picture in their guide).
- Per type: Fraction Play **19** (173 items) · Multiple Choice **3** (30 questions) · Number Match **2** (20 pairs)
- Fraction Play rounds: fpick **6** · fcut **5** · fshade **9** · fname **18** · fline **7** · fsame **25** · fequiv **16** · fcompare **8** · fadd **79**; 11 activities add 5 fresh rounds each.

**Fraction Play** (`fraction_play`, on the Work It Out engine) copies the pages' own exercises as rounds: cut, shade, pick and name a picture, write a fraction from its লব and হর, the 0–1 number line, compare (<, =, >), equivalent or not (সমতুল / সমতুল নয়), the same amount (n/d = □/d2), and adding or taking away with the same bottom (the stories as printed, with their unit; the child picks + or − first). The rounds carry **no answers**: the server works every one out when the file is imported. Where a page drills one kind of round, `configuration.fresh` adds 5 new rounds of that kind after the book's (`{ skill, count, den }`, the skill always written out).

Printed page = PDF page − 6 (printed p.91 is PDF p.97).

## Activities

| Page | Type | Title | Code | QR | Content | From |
|---:|---|---|---|---|---|---|
| 91 | Fraction Play | সমান ভাগে ভাগ করি | `LSTRU8EU` | M3-p91-a | 6 items (1 pick, 5 cut) + 5 fresh fcut (den 4) | p.91 মূল প্রশ্ন (রুটি) and কাজ ১ (square, circle), p.92 কাজ ২ (ফিতা), p.93 মূল প্রশ্ন (৪ ভাগ), p.95 মূল প্রশ্ন (১ মিটার, ৩ ভাগ) |
| 93 | Fraction Play | ১/২ ও ১/৪ অংশ রং করি | `LSCUC74P` | M3-p93-a | 6 items (6 shade) + 5 fresh fshade (den 4) | p.92 অনুশীলন ২ (1/2: square, circle; the triangle, the rectangle and the pentagon as one bar), p.93 কাজ ১ (1/4: square, ellipse as a circle, the two rectangles as one bar); p.94 অনুশীলন ৪ (draw and shade 1/2 and 1/4) is the same |
| 94 | Multiple Choice | অর্ধেক ও এক চতুর্থাংশ | `LS8Y8GY4` | M3-p94-a | 10 questions | p.92 অনুশীলন ১ (which strip is 1/2 of ক) and ৩, p.93 অনুশীলন ১, p.94 অনুশীলন ২ (বড়ো/সমান/ছোটো) and ৩ (মিনা) |
| 95 | Number Match | ভগ্নাংশে প্রকাশ করি · মিলাও | `LS89BNUD` | M3-p95-a | 10 pairs | p.92, p.93 and p.95 boxes (অর্ধেক, এক চতুর্থাংশ, এক তৃতীয়াংশ, দুই-তৃতীয়াংশ; with and without মিটার), p.96 (3/3 মিটার = ১ মিটার), p.97 অনুশীলন ৯ and p.105 নিজে করি ২ (d) (4/4 = ১) |
| 95 | Fraction Play | রং করা অংশ কত লম্বা? · রং করি | `LS85V89X` | M3-p95-b | 10 items (7 name, 3 shade) | p.95 অনুশীলন ১–২ and the 2/3 মিটার strip, p.96 অনুশীলন ৩ (২) and ৪; p.92 কাজ ২ (1/2), p.95 মূল প্রশ্ন (1/3 মিটার), p.96 (3/3 মিটার) |
| 96 | Multiple Choice | লব ও হর চিনি | `LSGRCRRS` | M3-p96-a | 10 questions | p.96 box (৩ ও ৭ লব, ৫ ও ৮ হর) and অনুশীলন ৫ (১)–(৪): 4/5, 1/7, 5/8, 7/9; also 3/5, 7/8 (the box), 5/9 (অনুশীলন ৬), 7/13 (p.105 নিজে করি ৩) |
| 97 | Fraction Play | খালিঘরে ভগ্নাংশ লিখি | `LSF6B67J` | M3-p97-a | 7 items (7 number line) + 5 fresh fline (den 10) | p.96–97 অনুশীলন ৭ (১)–(২) (০ থেকে ১ মিটার, ৫ ভাগ), p.97 অনুশীলন ৮ (০ থেকে ১, ৭ ভাগ) |
| 98 | Fraction Play | সমতুল ভগ্নাংশ নির্ণয় করি | `LSHFZABE` | M3-p98-a | 9 items (9 same amount) + 5 fresh fsame (den 12) | p.97 কাজ ১ (the fraction wall) and অনুশীলন ৯, p.98 কাজ ২ ((1×3)/(2×3) …), p.99 অনুশীলন ১১ (1/3 → 6, 9, 12; 1/4 → 8, 12) |
| 99 | Fraction Play | সমতুল বা সমতুল নয় (১) | `LSUCP76Z` | M3-p99-a | 8 items (8 equivalent?) + 5 fresh fequiv (den 12) | p.99 অনুশীলন ১০ (৪ জোড়া) and কাজ ৪ (৪ জোড়া; 3/4, 9/12 printed ✓) |
| 99 | Fraction Play | ভগ্নাংশ তুলনা করি | `LSHAMWME` | M3-p99-b | 7 items (7 compare) + 5 fresh fcompare (den 9) | p.97 অনুশীলন ৭ (৩) and ৯, p.99 অনুশীলন ১২ (ক)–(ঘ) |
| 99 | Fraction Play | খালিঘরে সমতুল ভগ্নাংশ লিখি | `LSBZAF3N` | M3-p99-c | 7 items (7 same amount) + 5 fresh fsame (den 12) | p.99 কাজ ৩ (2/3 → 6, 9, 12; 3/4 → 8, 12; 3/5 → 10; 1/6 → 12) |
| 100 | Fraction Play | ভগ্নাংশের যোগ | `LSX9CFJN` | M3-p100-a | 10 items (6 stories, 4 add) | p.100 মূল প্রশ্ন and কাজ ১ (2/5 + 3/5 = 5/5 = ১ printed), p.101 কাজ ২, কাজ ৩, অনুশীলন ২–৪, অনুশীলন ১ (২), (৩), (৭) |
| 101 | Fraction Play | যোগ করি (১) | `LS647VUW` | M3-p101-a | 12 items (12 add) | p.101 অনুশীলন ১ (১)–(১২) |
| 102 | Fraction Play | ভগ্নাংশের বিয়োগ | `LSPXHSZM` | M3-p102-a | 10 items (5 stories, 5 take away) | p.102 মূল প্রশ্ন and কাজ ১ (১ − 3/4 = 1/4 printed), p.103 কাজ ২, কাজ ৩ and অনুশীলন ২–৪ (কাজ ৩ and অনুশীলন ৪: only “কত বেশি”), অনুশীলন ১ (২), (৪), (৬) |
| 103 | Fraction Play | বিয়োগ করি (১) | `LSNVJGEP` | M3-p103-a | 12 items (12 take away) | p.103 অনুশীলন ১ (১)–(১২) |
| 104 | Multiple Choice | সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দিই | `LSRNQZNJ` | M3-p104-a | 10 questions | p.104 নিজে করি ১ (১)–(৮), the book's options in its order ((৭): “এবং এবং” written once); two more in their style (3/7 ও 5/7; 1/3 = 2/6, p.99 অনুশীলন ১১) |
| 105 | Fraction Play | দাগ টেনে মিল করি | `LS3GMRH8` | M3-p105-a | 10 items (1 name, 1 add, 2 equivalent?, 1 compare, 5 pick) | p.105 নিজে করি ২ (3/5, 6/5, সমতুল ভগ্নাংশ, ১; and p.97's 1/2 ও 2/4) and নিজে করি ৪ (3/4, 1/5, 2/3, 1/6, 3/5 → their bars; the words are the next match) |
| 105 | Number Match | ভগ্নাংশ ও কথায় · মিলাও | `LS8UGU8Q` | M3-p105-b | 10 pairs | p.105 নিজে করি ৪ (তিন ভাগের দুই ভাগ … চার ভাগের তিন ভাগ), p.92 (দুই ভাগের এক ভাগ), p.93 (চার ভাগের এক ভাগ), and 1/3 (p.95), 2/5 (p.99 কাজ ৪), 5/6 (p.105 নিজে করি ৫) the same way |
| 105 | Fraction Play | লব ও হর দেওয়া হলো, ভগ্নাংশ লিখি | `LSQ4JXNE` | M3-p105-c | 10 items (10 name (লব/হর in words)) | p.96 অনুশীলন ৬ (হর ৯, লব ৫), p.105 নিজে করি ৩ (লব ৭ হর ১৩; হর ১১ লব ৭; লব ৯ হর ১৭; হর ১২ লব ৫); p.96 box and অনুশীলন ৫ (3/5, 4/5, 1/7, 5/8, 7/9) |
| 105 | Fraction Play | ৩টি করে সমতুল ভগ্নাংশ লিখি | `LSNQJR9M` | M3-p105-d | 9 items (9 same amount) + 5 fresh fsame (den 12) | p.105 নিজে করি ৫ (1/2 → 4, 6, 8; 3/4 → 8, 12; 2/3 → 6, 9, 12; 5/6 → 12) |
| 106 | Fraction Play | সমতুল বা সমতুল নয় (২) | `LS9JVE96` | M3-p106-a | 6 items (6 equivalent?) + 5 fresh fequiv (den 12) | p.106 নিজে করি ৬ (৬ জোড়া) |
| 106 | Fraction Play | যোগ করি (২) | `LSFVYQ78` | M3-p106-b | 12 items (12 add) + 5 fresh fadd (den 9) | p.106 নিজে করি ৭ (১)–(১২) |
| 106 | Fraction Play | বিয়োগ করি (২) | `LSC8XEJ4` | M3-p106-c | 12 items (12 take away) + 5 fresh fadd (den 9) | p.106 নিজে করি ৮ (১)–(১২) |
| 106 | Fraction Play | নিজে করি: যোগ-বিয়োগের গল্প | `LSJKUJN2` | M3-p106-d | 10 items (10 stories) | p.104 নিজে করি ১ (৭)–(৮) (the multiple-choice stories, worked out here), p.106 নিজে করি ৯, ১০ (only “কত বেশি”) and ১১; the stories of p.100 কাজ ১, p.101 অনুশীলন ২–৩, p.102 মূল প্রশ্ন, p.103 অনুশীলন ৩ again |

## Rebuild and check

```sh
cd ~/Downloads/class3-math-activities
source ~/.nvm/nvm.sh && nvm use 16
node build.js      # writes ACTIVITIES-bn.json and this README
node validate.js   # the importer's own checks, the server's answers against ours, the book's and the survey's
```

`build.js` holds every fraction as the page prints it (ASCII digits) and computes every answer; before writing it parses each right option and each pair back from its Bangla text and checks it again, and it stops on any mistake. The codes come from a hash of each activity's key, so a rebuild keeps them (a new activity gets a new code; renaming a key changes its code); none is a code of the Class 2 file. `validate.js` runs the backend's `checkImportFile` and `importContent`, then `normalizeWorkItems(items, "fraction_play")` on every Fraction Play activity (every round kept with all its fields, the server's answer equal to ours, to the book's where it prints one and to the survey's; a round that is in neither list fails, but for four listed there: p.91's roti as a pick round and three open cells whose bottoms are mine, so a typing slip can't pass), `workItOutConfig` on every fresh block, and checks the codes against the Class 2 file and the other activity files in ~/Downloads. Nothing is written anywhere.

Source: `FRACTION-PAGES.md` (the page-by-page survey), checked against the PDF (pp.91–106 at 100 dpi, p.97 অনুশীলন ৮ at 200 dpi) and the সূচিপত্র (PDF p.6).

## What I wasn't sure of, and choices made

- **Chapters:** the book block lists all 13 chapters of the সূচিপত্র (PDF p.6), named as the Class 2 file names them (“অধ্যায় ৯ · ভগ্নাংশ”). Every activity is in chapter ৯. The importer adds the file's chapter list to the book (it has none yet) and that list is the book's reading order, so a later chapter's file keeps its place; a chapter without activities isn't shown on the book page. Set `ALL_CHAPTERS = false` in build.js to give the book only chapter ৯.
- **Shapes:** the rounds draw a circle, a bar or a square, always cut into equal parts. p.92 অনুশীলন ২'s five shapes (square, circle, triangle, a rectangle cut on its diagonal, a house-shaped pentagon with no line drawn) are three rounds: square, circle and bar (the triangle, the rectangle and the pentagon). p.93 কাজ ১'s ellipse is a circle; its two rectangles cut into one half and two quarters (a diagonal plus a half-diagonal; a triangle inside a rectangle) are one bar in 4. p.105 নিজে করি ২ (a)'s row of 5 triangles (3 yellow, read at 500 dpi by the survey) is a bar in 5. p.99 অনুশীলন ১২ has no pictures: the circle/bar for each pair is mine.
- **p.92 অনুশীলন ৩, p.93 অনুশীলন ১** (“দুইটি 1/2 একত্রে রাখলে □ তৈরি হয়”): the box is read as ১ (a whole); the book doesn't say which word it expects.
- **Two-part stories** (“কে বেশি … এবং কত বেশি”) ask only the amount. p.103 কাজ ৩: the story's third sentence is the book's own printed working (“… সিফাত বেশি অংশে ফুলের চারা লাগিয়েছে।”), then “কত অংশ বেশি লাগিয়েছে?”. p.103 অনুশীলন ৪ ends “যে বেশি ফিতা নিল, সে কত অংশ বেশি নিল?” and p.106 নিজে করি ১০ “বিদ্যালয় থেকে যার বাড়ির দূরত্ব বেশি, তার বাড়ির দূরত্ব কত কিলোমিটার বেশি?” (my wording). Both activities say so in their guide note.
- **p.104 নিজে করি ১ (৭)** prints “পশ্চিমে এবং এবং মিলির বাড়ি”; the file writes “এবং” once (in the multiple choice and in the story round on p.106).
- **p.104 নিজে করি ১ (১)** asks about the picture beside it (a square cut by its two midlines and two diagonals into 8 triangles, 2 coloured). The question says it in words (“চিত্রে একটি আকৃতিকে সমান ৮ ভাগে ভাগ করা হয়েছে; এর ২ ভাগ রং করা।”) and the guide asks for the picture. The other seven are as printed, with the book's options in its ক–ঘ order (answers গ, ক, খ, গ, খ, ঘ, ঘ, ঘ).
- **p.94 অনুশীলন ৩** prints “ছোট” (অনুশীলন ২ and the rest of the chapter: ছোটো); the question keeps “ছোট”. “ডান পাশের চিত্রের” is left out (no picture), and “কেন?” is answered by the options (“না, কারণ 1/4 থেকে 1/2 বড়ো”).
- **Equivalents (same amount):** a bottom can be at most ১২. Open-ended ones, my bottoms: p.99 অনুশীলন ১১ 1/3 → □/6, □/9, □/12 and 1/4 → □/8, □/12. p.99 কাজ ৩ (seven cells a row) keeps the cells with a bottom up to 12: 2/3 → 6 (4/6 printed), 9 (6/9 printed), 12; 3/4 → 8, 12; 3/5 → 10; 1/6 → 12. p.105 নিজে করি ৫ (“৩টি করে”): 1/2 → 4, 6, 8; 2/3 → 6, 9, 12; 3/4 → 8, 12 (only two); 5/6 → 12 (only one).
- **p.97 অনুশীলন ৭ (২)** “1/5 এর ৫ টুকরা কোথায়?” is a *read* round (the coloured part reaches ১ মিটার: 5/5 মিটার), not a *place* round: the player lets a child tap only the inner marks of the line, never 0 or 1 (the server would accept n = d for “place”, but it can't be answered). Its guide note says so.
- **p.97 অনুশীলন ৮:** the line has 7 equal parts (8 marks; checked at 200 dpi): orange 2/7, green 5/7.
- **p.91 মূল প্রশ্ন** (the roti cut fairly or not) is a *pick* round (1/2 of a circle): the player's wrong pictures include unequal parts. p.91 কাজ ১ folds the square three ways and the circle two ways; each is one *cut* round.
- **p.96 অনুশীলন ৩ (১)** (a metre in 5, 1 green) is the same picture as p.95 অনুশীলন ১ (২), so it is one round. The p.95 2/3 মিটার strip (the box prints the answer) is a round too.
- **p.105 নিজে করি ২ (d)** (a bar in 4, all shaded; the book's answer ১) is a compare round, 4/4 ○ ১ (=); (b) “দুইটি একত্রে” is 3/5 + 3/5 = 6/5, more than one whole.
- **Fresh rounds:** each activity that drills one kind of round adds 5 of that kind after the book's, with its skill written out and `den` the largest bottom (cut/shade ৪, number line ১০, compare ৯, equivalents ১২, add/take away ৯). Fresh *add/take away* rounds mix + and − (and ১ − n/d), so “যোগ করি (১)” (p.101: subtraction comes on p.102) and “বিয়োগ করি (১)” (p.103) have none; only the p.106 review drills get them. The story and mixed activities have none.
- **p.104 নিজে করি ১ (৭)–(৮)** are stories with four choices; the p.106 story activity asks them again to be worked out (typed), with নিজে করি ৯–১১.
- **Digits:** the questions, matches and stories are in Bangla digits; the rounds' numbers (n, d, "3/5") are ASCII, as the importer reads them (the player shows them in Bangla). The book never reduces a fraction (2/4, 6/8, 5/5) and neither do the rounds: 2/5 + 3/5 asks 5/5 (the book: 5/5 = ১).

## What the types can't express

- p.91 কাজ ১: folding the same square three ways (vertical, horizontal, diagonal) and the circle two ways; a cut round cuts each whole once, in equal parts of its own drawing.
- p.92 অনুশীলন ২ (3)–(5) and p.93 কাজ ১ (3)–(4): triangles, the pentagon (with no halving line drawn), and wholes cut into unequal-looking parts (1/2 + 1/4 + 1/4) where the child must find the quarter.
- p.92 অনুশীলন ১ (which strip is half of ক), p.92–93 “… একত্রে রাখলে □ তৈরি হয়”, p.94 অনুশীলন ২ (the words বড়ো/সমান/ছোটো), অনুশীলন ৩ (true or not, and why) and p.96 অনুশীলন ৫ (mark the লব △ and the হর ○): no round asks these, so they are multiple choice (pp.94, 96).
- p.94 অনুশীলন ৪ (draw two shapes, shade 1/2 and 1/4): the p.93 shading rounds stand for it.
- p.97 অনুশীলন ৭ (২): placing 5/5 at the end of the line (see above).
- p.98 কাজ ২ (1×□)/(2×□) = 4/8 (find the multiplier) and the cross-multiplication boxes of p.98–99 (অনুশীলন ১০: “৪ × ৩ = ১২, ২ × ৬ = ১২”): an equivalent round only asks সমতুল or not; a same-amount round asks the top.
- p.99 কাজ ৩'s cells with a bottom over 12 (2/3 → 10/15, 12/18, 14/21, 16/24; 3/4 → 12/16 …; 3/5 → 9/15 …; 1/6 → 3/18 …) and p.105 নিজে করি ৫'s 12/16, 15/18, 20/24.
- The scaffolds “রং করেছি 1/7 অংশ + 3/7 অংশ = (□ + □)/□” (p.101 কাজ ৩) and “গাণিতিক বাক্য □/□ − □/□ = (□ − □)/□ = □/□” (p.103 কাজ ৩): a round asks only the answer (and + or − first, for a story).
- Two answers to one story (“কে বেশি … এবং কত বেশি”: a name and an amount), p.103 কাজ ৩, অনুশীলন ৪, p.106 নিজে করি ১০.
- p.105 নিজে করি ৪'s three columns (fraction ↔ bar ↔ words) are two activities (pick rounds and a match); নিজে করি ২'s four rows are four rounds of different kinds, not lines drawn between columns.
- Pictures in multiple choice: p.104 নিজে করি ১ (১) is in words (the guide asks for the picture). The p.100 bread slices and the p.94 rhombuses aren't drawn.
