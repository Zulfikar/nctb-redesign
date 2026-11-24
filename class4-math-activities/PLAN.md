# প্রাথমিক গণিত, চতুর্থ শ্রেণি: the plan for its games

*Version 1, 23 Nov 2026 (the user: "I uploaded the book in activity studio. now you make plan for activity", http://localhost:3000/b/KZT9KF). Plan only: nothing is built yet. The questions for the user are in section 8.*

**The user's answers (23 Nov):** 1 "ok" = (a), part A first, then one complete file and one import; 2 **yes, Android too** (iOS needs nothing: it plays every game in its web view, `ActivityWebVC.swift`); 3 yes, the games use the right maths where the book is wrong; 4 **yes, 5 fresh problems** where a page drills one skill.

## ★ Where it stands (23 Nov 2026, night): paused for a new session (the user: "give a pause at a safe place")
Part A is being built in the eBidyaloy web repo. **What is listed done below is PUSHED 23 Nov night** (the user's "push"): lingo-school `82f6467652`, enhancement `78a2a87162` (deploy to see it live); long division plays as ভাগফল □ ভাগশেষ □ until its own screen comes. New work: commit on `lingo-school`, push `neworigin`, cherry-pick to `enhancement` in a temp worktree. Five files: `source/frontend/components/management/activity-studio/work-it-out.js` (the rules), `work-it-out-player.component.js`, `work-it-out-editor.component.js`, `public-i18n.js` (texts en/bn/ja), and the server's twin `source/backend/src/v3/helpers/work-it-out.helper.js`. Never commit the other session's `source/backend/src/locales/*.json`, the xlsx files or `.DS_Store`.

| | State | What it is (item fields) |
|---|---|---|
| A1 big numbers | **done, tested** (rules, server, player, editor, phone + laptop) | `place` up to 8 digits (BIG = 99,999,999 everywhere); `ask`: parts, number, **value** (`at` 0–7), **digit** (`at`), **words** (tiles, `system` bn/intl; `numberWords`, the book's words, hundreds joined: সাতশত), **figures**, **commas** (`commasOf`), **cards** (`cards`, `want` largest/smallest); 5-number sums; fresh place rounds copy the game's own asks; `solveMissing` now works the box out (no search) |
| A2 | **done, tested** | `sum` × a 3-digit multiplier in columns (no 0 in it, answer < 10 million; three partial rows); fresh skill `mul3`; hint for the hundreds row's two 0s |
| A3 long division | **done, tested (website; NOT committed: after the 23 Nov push)**: rules, server, fresh skill `longdiv`, editor, and now the player in the book's উপর-নিচে layout (divisor ) dividend under a line, the quotient a digit at a time on top, each step's product, a line, the difference; the next digit brought down by itself with a red dashed line; a ০ left before a brought-down digit faded (the book's ০১ = ১); then ভাগফল □ ভাগশেষ □ and ভাজ্য = ভাজক × ভাগফল + ভাগশেষ; the partial lit while worked; a line under the grid says what to do (৯৪-এর মধ্যে ২৩ কতবার আছে?); hints ২৩ × ৪ = ৯২ … ২৩ × ৫ = ১১৫, the ০ in the quotient (p৫৯), the product, the difference; 4–5 steps in a smaller font) | `longdiv` { a, b, text? }: `longDivWork(a, b)` → steps { col, partial, q, p, d, down }, `cells` (each step's q, p, d, then quotient and remainder), answer [q, r]; a 0 in the quotient written like the book (p৫৯) |
| A4 number sentences | **done, tested** | `compare.signs` "eq" (= ≠) / "not" (≮ ≯, drawn: no font has them); `truth` { text } true/false (২৭ ÷ ৪ = ৮ is false); `opbox` { text with □ } + − × ÷ in the boxes (one way only); `{ }` brackets in every sum (evalMath, exprSteps, the box solver); `missing.story` |
| A5 factors and primes | **done, tested 24 Nov (NOT committed)**: rules + server twin, fresh skills `mark` (the game's own rule and n kept, `markRules` inferred by the player), `fpairs`, `ftree` (`treeAsk` inferred), player, editor, texts; `a5-test.mjs` 10,922 checks (the book's pp ৮১–৯৬ examples), `a5-play.cjs` at 390 and 1100 px | `nmark` { rule multiple/div/factor/prime/composite, n?, nums or from/to }: tap to ring, Check, a wrong ring red, hints by division (and by the ones digit for ২, ৫, ১০); `sieve` { to 20–100 }: tap 1 → ring 2 → tap 3 of its multiples and the rest cross by themselves → 3, 5, 7 → the rest ringed → «মৌলিক সংখ্যা কয়টি?»; `fpairs` { n 2–100 }: n = □ × □ rows in any order, then n-এর গুণনীয়ক; `ftree` { n 4–999 composite, ≤ 6 prime factors, ask tree/line }: each step a prime × the rest (turned round if typed the other way), composites ringed as the book, then n = □ × □ × □ in any order |
| A6 mixed numbers | **done, tested 24 Nov (NOT committed)**: Fraction Play's new rounds (`MIXED_KINDS`, in its kinds and skills but NOT in its "fraction" mix, so Class 3's games don't change); rules + server twin, fresh, player, editor, texts; `FracLine` takes `wholes` (a line past 1; the old 0–1 rounds the same); `a6-test.mjs` 3,247 checks, `a6-play.cjs` | `fmixed` { a "7/4" or "1 3/4" (or n, d), ask tomixed / toimproper / place, look pie / bar / line }: d 2–12, up to 5 wholes, a line ≤ 24 marks (place ≤ 20); `fsort` { want proper / improper, fracs (3–12) }: ring them |
| A7 decimals | **done, tested** | `dsum` { a, op, b, layout } in a row ([whole] . [after the point]) or in columns (the points lined up, ৮.০); `dcompare` { a, b } decimals and n/d fractions; `convert` takes decimals in and gives them out (`dp`; ০.০৫ typed "05", checked as written); hints count tenths (p১১৭) |
| A8 units | **done, tested** | units l, dl, ml (volume), wk, day (time), yr, mo (age); pairs l, wk, day, yr; `units3` { unit h | m, terms [[big, mid, small]…], ops, layout } in three columns (borrowing across ০ মিনিট: ৫৯ above it); Class 3's fresh time rounds unchanged |
| A9 dates | **done, tested 24 Nov (NOT committed)**: Work It Out's `date` (rules + server twin, fresh skill `date`, player with a drawn calendar month (শুক্রবার red), editor, texts incl. month/day names en/bn/ja); `a9-test.mjs` 6,582 checks (the book's months; every 1st of 1900–2100 against JavaScript's calendar), `a9-play.cjs` | `date` { y, m, d, ask write / weekday / between / after, show cal / words, sep / . -, d2, n, text? }: write → দিন / মাস / সাল boxes; weekday → 7 day buttons; between → days; after → tap the date |
| A10 protractor | **done, tested 24 Nov (NOT committed)**: the existing `angle` round (Angles & Dot Grid) takes 3 new asks; its name/make rounds and its old fresh rounds unchanged; new fresh skill `protractor`; `ProtractorView` in geometry-tools (both scales, a tick a degree, tap to turn); `a10-test.mjs` 1,694 checks, `a10-play.cjs` | `angle` { ask measure / draw, deg 1–180, from right / left } (measure: type the degrees; draw: turn the arm by tapping the protractor or ±1° ±10°, then Check); { ask clock, h 1–12, m 0 / 30 } (the hands' angle, ≤ 180°) |
| A11 lines and triangles | **done, tested 24 Nov (NOT committed)**: two new Angles & Dot Grid kinds (`GEO_KINDS` + lines, triangle; the "geomix" fresh mix still angles and dots only); rules + server twin, fresh skills `lines` and `triangle`, player (drawn true to the degrees and the sides), editor, texts; `a11-test.mjs` 13,731 checks, `a11-play.cjs` | `lines` { a, b 0–179, cross }: perpendicular (90° apart), parallel (the same), neither; apart = picture them made longer; `triangle` { ask sides, sides [a, b, c] cm 1–20 } → সমবাহু / সমদ্বিবাহু / বিষমবাহু, or { ask angles, angles adding to 180 } → সূক্ষ্মকোণী / সমকোণী / স্থূলকোণী |
| Android | not started (after the website part; then Nahidul builds) | `WorkItOutRules.kt`, `WorkItOutScreen.kt` must learn every new kind and ask (it drops unknown kinds) |

**Tests:** `engine-tests/` here (README): `aN-test.mjs` (website = server, the book's numbers, old behaviour unchanged: "old" = the rules before part A, `82f6467652^`) all pass; `aN-play.cjs` play each in Chrome at 390 px (and 1100) on the test site :3003 with no page errors.

**Part B started 24 Nov:** `lib.js` (from Class 3's rest/lib.js: 11 chapters, keys `m4-pNNN-slug`, QR `M4-pN-a`, codes salted `ebidyaloy-class4-math`, never a Class 2/3 code), `build.js` (`--only pNNN-NNN` → `.check/only-….json`; full → `ACTIVITIES-bn.json` + `README.md`), `validate.js` (the importer's checkImportFile/importContent + the server's answers against ours + codes against every activity file in ~/Downloads), `BRIEF.md` (the helpers' brief), `KINDS.md` (every round's example and the server's answer, made by `tools/kinds-table.js`), the model `pages/p001-003.js` (3 games, 26 rounds: validate OK). **PART B DONE 24 Nov: `ACTIVITIES-bn.json`, 255 games, every page 1–174 has one** (Work It Out 123, multiple choice 44, Angles & Dot Grid 24, Fraction Play 15, Units & Amounts 14, Categorize 8, Number Match 7, Tally & Pictograph 7, Equation Match 3, Sequence 3, Equal Groups 2, Shape Patterns 2, Number Line, Measure It, Clock & Time 1 each); 1,691 game rounds, the server's answer = ours on all; 127 games add 5 fresh problems; `validate.js` OK; every game opened in Chrome at 390 px (`engine-tests/sweep.cjs`, no error); the 255 codes free on the live DB (`tools/codes-live.js`, read-only; /b/KZT9KF still 0 activities). README.md: every game, its source on the page, 123 notes (choices, the book's slips) and what the types can't express; how to import. Written by Claude (pp 1–3) and 8 helpers. **Found on the way:** our redesign's p৫৯ ৩২৬৬ ÷ ২৩ had ৮৬ for ৪৬, and p১৫৯'s acute scalene triangle had a ১০৩° angle: both fixed in the book's content; new NCTB slips noted (p১৩৭ «দিন × ঘণ্টা», p১৪১ «১০ মিমি», p৯৬ option ক ০ ৫ ১০ made ১ ৫ ১০, p৬০ কাজ ১(১) no single answer: ভাগফল ৫ chosen); p১৫৬ ৪(১) ambiguous (210° or 150°: the game asks 180 + 30). Engine limits met: `mdigit` merges □□ and does only + −; a `word` story ≤ 3 steps; `pattern` a fixed step; fractions over 12; no simplest-form round.

**24 Nov: the user: "you keep working and finish it. I will check tomorrow". PART A IS DONE ON THE WEBSITE (A1–A11), NOT COMMITTED for A3's player and A5–A11 (commit/push on the user's word; the 7 web files: work-it-out.js, work-it-out-player.component.js, work-it-out-editor.component.js, public-i18n.js, fraction-play-tools.component.js, geometry-tools.component.js, backend v3/helpers/work-it-out.helper.js).** All 11 rules tests pass; every round played at 390 px. **Next:** part B (the games file), then the user's "push", the Android port (every new kind and ask; Fraction Play and Angles & Dot Grid are native too), the import.

## 1. What we make
- **One Activity Studio file**, `ACTIVITIES-bn.json` (format `ebidyaloy-activity-import`, version 1), made the Class 3 way (`../class3-math-activities`):
  - at least **one game on every page that has something to practise**;
  - at least **10 questions in each game**, with fresh problems counted;
  - the book's own exercises first, then fresh problems where a page drills one skill.
- **Every answer is worked out by the server** when the file is imported, and must equal ours and the book's printed answer wherever the book prints one.
- **Where the book is wrong, the game uses the right maths** (`TEACHER-CHECK.md` §1: p৯৮'s 5/8, p১১৮'s 3.5, …), as the Class 3 games corrected that book's misprints. Every correction is listed in the README.
- **About 230–260 games.** Class 3 had 229 for 162 pages.
- **Then the page QRs:** the book (`class4-math-redesign/build.js`) already reads this file and prints each page's game QR, with a "+N" badge when a page has more than one game. Its `BOOK_LINK` becomes `https://ebidyaloy.com/b/KZT9KF`, which puts the book's QR on the cover.

## 2. The book in Activity Studio (read on the live database, read-only, 23 Nov)
- **/b/KZT9KF** «প্রাথমিক গণিত - চতুর্থ শ্রেণি» (`6b04312d5fcd48cf553725fd`):
  - grade 4, Mathematics, NCTB, 2026;
  - free;
  - our PDF `class4-math-book.pdf`, 182 pages;
  - no chapters yet;
  - no activities yet.
- **Chapters:** the file's book block brings the 11 chapters, named the Class 3 way ("অধ্যায় ১ · সংখ্যা ও স্থানীয় মান" …).
- **Page numbers:** each game's `page` is the printed page, as in Class 3. Printed page n is PDF page n + 7.
- **Codes:** each code comes from a hash of the game's key (`m4-p001-…`), so a rebuild keeps them. The QR names are `M4-p1-a`, `M4-p1-b` …. Before the file goes out, every code is checked against the live DB and against every other activity file in ~/Downloads; the Arabic and AI books once clashed, so the check matters.

## 3. Chapter by chapter: what fits today and what needs new work

| Chapter | Pages | The pages drill | Fits today (Work It Out engine and the quiz types) | Needs new work |
|---|---|---|---|---|
| ১ সংখ্যা ও স্থানীয় মান | 1–22 | place value to **কোটি** (8 digits), the international names (মিলিয়ন), commas in both systems, comparing and ordering, the largest and smallest from cards, patterns | patterns (`pattern`), the cards (MCQ / Number Match) | **A1** big numbers: place value is limited to 100000 and sums and comparisons to 9999999 |
| ২ যোগ ও বিয়োগ | 23–40 | 6–7-digit sums in columns, missing digits, five numbers added, borrowing across zeros, the relation of + and − | columns (`sum`), missing digits (`mdigit`), the box (`missing`), word problems | **A1** (five numbers in one sum; today at most 4) |
| ৩ গুণ | 41–48 | 3-digit × 2- and **3-digit**, the zeros (৪৫০০ × ৭০০), ×৯৯ the easy way | `mul2` (multiplier up to 99), sums in a line | **A2** a 3-digit multiplier in columns |
| ৪ ভাগ | 49–66 | sharing with a remainder, **long division** by 1- and 2-digit numbers (১৬৭৪ ÷ ১৮), a 0 in the quotient, ভাজ্য = ভাজক × ভাগফল + ভাগশেষ, × and ÷ undoing each other | `divrem` (up to 999 ÷ 12, answer only), `equal_groups`, `missing` | **A3** long division step by step |
| ৫ গাণিতিক বাক্য | 67–80 | the signs, = ≠ < > **≮ ≯**, true or false, the unknown in a box, the order of working with **( ) and { }**, word problems | `expr` (with ( ) only), `missing`, True / False, MCQ, Number Match | **A4** ≠ ≮ ≯ and { } |
| ৬ গুণিতক ও গুণনীয়ক | 81–96 | multiples, the ১–১০০ chart, factors and factor pairs, factor trees, primes (the sieve), divisibility by ২, ৫, ১০ | `pattern` (counting in steps), Categorize (prime / not prime, divisible or not), MCQ, Number Match | **A5** factors and a 100 chart to mark (multiples, primes) |
| ৭ সাধারণ ভগ্নাংশ | 97–110 | **mixed numbers ↔ improper fractions**, number lines beyond ১, equivalent fractions, comparing, + and − with the same bottom | Fraction Play: `fshade`, `fname`, `fequiv`, `fsame`, `fcompare`, `fadd` (denominators up to 12, all fine), Slice It! | **A6** mixed numbers |
| ৮ দশমিক ভগ্নাংশ | 111–120 | tenths of a litre, the দশমাংশ place, a ruler in cm and mm, ১.২ কেজি, the number line in tenths, comparing, **+ and − of decimals in columns** | the number line in tenths (E7, 22 Nov), shading tenths (`fshade`, 10 parts), `measure` with mm | **A7** decimals in sums, comparisons and unit changes |
| ৯ পরিমাপ | 121–142 | km/m/cm/mm, kg/g, perimeter, **litre/decilitre/millilitre**, area on squared paper and by formula, the units of time (**days, weeks**), adding times, the time between two clocks, **dates and calendars** | Units & Amounts (`units`, `convert`), area and perimeter (E8), `clock` (between, after/before), `measure_it` | **A8** volume units and days/weeks; **A9** dates and calendars |
| ১০ জ্যামিতি | 143–168 | angles: kinds, **measuring and drawing with a protractor**; **perpendicular and parallel lines**; **triangles by sides and by angles**; rectangles and squares; geometric patterns | Angles & Dot Grid (`angle` kinds, rectangles and squares on dots), `shape_patterns` | **A10** the protractor; **A11** lines and triangles |
| ১১ উপাত্ত | 169–174 | tables and tallies, **bar charts** (reading and drawing) | Tally & Pictograph (`tally`, `chart`, and the bar graphs from E1, 22 Nov) | none |

## 4. The new work in the game engine (part A)
Each item is new rounds of the Work It Out engine, or a new ask of an existing one. Each is built in four places:
- the website's `work-it-out.js` and its player;
- the server's twin `work-it-out.helper.js` (the same answers);
- the editor;
- the Android app's native player (`WorkItOutRules.kt` and `WorkItOutScreen.kt`). This is not compiled on this Mac; Nahidul builds it. Until the app has a round, it skips it (its rules read an unknown kind as nothing), so in the app a game made only of new rounds shows nothing.

Each is tested the way the 22 Nov math games were: every answer the server's equal to the website's, every round played at 390 px and at 1100 px, right and wrong.

| | What | Pages | Size |
|---|---|---|---|
| A1 | **Big numbers:** place value, comparing and ordering to 8 digits (কোটি); the international names; put the commas in (both systems); a number in words ↔ in figures; up to 5 numbers in one sum | 1–29 | small |
| A2 | **A 3-digit multiplier in columns** (three partial products, then their sum) | 42–48 | small |
| A3 | **Long division**, the book's "উপর-নিচে": guess a digit of the quotient, multiply, take away, bring the next digit down; a 0 in the quotient; the remainder; dividends up to 5 digits, divisors up to 2 digits | 51–66 | **large** |
| A4 | **Number sentences:** ≠ ≮ ≯ as answers and as true/false; { } around ( ) in the order of working | 67–80 | small |
| A5 | **Factors and primes:** all factors of a number (tap them), factor pairs, a factor tree down to primes, and a ১–১০০ chart to mark multiples or primes (the sieve) | 81–96 | medium |
| A6 | **Mixed numbers:** improper ↔ mixed, both drawn in wholes and parts; mixed numbers on a number line beyond ১ | 98–102 | medium |
| A7 | **Decimals (tenths):** + and − in columns with the points lined up; comparing (< > =); a fraction ↔ a decimal (৩/১০ = ০.৩); amounts like ১ কেজি ২০০ গ্রাম = ১.২ কেজি | 111–124 | medium |
| A8 | **Units:** litre/decilitre/millilitre (a new family), days and weeks in the time family | 129, 136–137 | small |
| A9 | **Dates:** write a date the usual ways (১৬/১২/১৯৭১, ১৬.১২.১৯৭১); read a calendar month (the day of a date, the days between) | 139–142 | medium |
| A10 | **The protractor:** read an angle's size on a drawn protractor (both scales, as the book teaches), and make an angle of a given size by turning an arm | 143–149 | medium |
| A11 | **Lines and triangles:** which pairs are perpendicular, parallel or neither (drawn by code, true to the degree); name a triangle by its sides (সমবাহু, সমদ্বিবাহু, বিষমবাহু) and by its angles (সূক্ষ্মকোণী, সমকোণী, স্থূলকোণী) | 150–165 | medium |

Without part A, the games written with today's types would cover about two thirds of the pages. Chapters 1, 4, 6 and 10 and parts of 7–9 would be left with multiple-choice questions only.

## 5. The games file (part B)
- **The folder** `class4-math-activities/`, like Class 3's:
  - `build.js` → `ACTIVITIES-bn.json` and `README.md` (every game: its page, type, title, code, QR name, content, and where in the book it comes from);
  - `validate.js`: the importer's own checks, every server answer against ours and the book's, the codes free;
  - the pages in `pages/pNNN-NNN.js`.
- **Who writes it:**
  - Claude writes pages ১–৩ as the model, plus the brief for the helpers (`BRIEF.md`).
  - Helpers write the rest, **3–4 at a time** (wave 2 of the book hit the weekly and the 5-hour limits with 7 at once):
    - wave 1: chapters 1–3 (pp 1–48);
    - wave 2: chapters 4–6 (pp 49–96);
    - wave 3: chapters 7–9 (pp 97–142);
    - wave 4: chapters 10–11 (pp 143–174).
  - Each helper reads its pages' content files: the book's every word and number are already typed there, so no OCR this time.
- **The kinds of game, by page:**
  - a page's exercises become Work It Out rounds (or Fraction Play, Units & Amounts, Angles & Dot Grid, Tally & Pictograph);
  - its questions in words become MCQ, True / False or Number Match;
  - its sorting becomes Categorize;
  - its stories become word problems in Work It Out, with the child choosing + − × ÷ first.
- **No voice and no AI pictures.** Every drawing is made by the game itself; the instructions are text.

## 6. Order of work
1. **A1, A2, A4, A8** (the small ones), then **A3** (long division), then **A5–A7, A9–A11**. Each is tested, then the user's "push" (website + server; Android afterwards, not compiled here).
2. **The model pages ১–৩ and `BRIEF.md`**, then the helpers' four waves. The file is checked after each wave (`validate.js`, every first round seen at 390 px).
3. **The codes:** checked free on the live DB (read-only).
4. **The page QRs:** `BOOK_LINK`, then rebuild the book. A QR row may push a page past its footer; the build then fits it (no lower than 85%), never a page with a true-size ruler. Then check every page again.
5. **The user's steps:**
   - deploy the website and server, so the new rounds play on ebidyaloy.com;
   - import the file into /b/KZT9KF (through the local site, as with Class 3; every game arrives as a draft) and publish;
   - "Replace PDF" with the book that carries the QRs;
   - Nahidul's Android build, so the app plays the new rounds too.

**A later change to an imported game** means an update file, or the in-place update Class 3 used, never a second import: an import skips codes it already has.

## 7. Size of the job
- **Part A:** website + server, about 2–3 sessions' work, with long division the largest piece; the Android port after that.
- **Part B:** four waves of helpers plus Claude's checks, about 2 sessions.
- **Parts A and B can overlap.** The chapters that need no new work (2, 3 apart from A2, 7 apart from A6, 11) can be written while part A is built.

## 8. Questions for the user
1. **The order:**
   - (a) build part A first, then one complete file and one import *(recommended: one import, every page's game at its best)*; or
   - (b) a file now with today's types (about two thirds of the pages; the rest as multiple-choice questions), then an update file when part A is done.
2. **Android:** port part A to the Android app too (not compiled here; Nahidul builds it)? Without the port, the app skips the new rounds.
3. **The book's errors:** the games use the right maths where the book is wrong (`TEACHER-CHECK.md` §1), each listed in the README. OK?
4. **Fresh problems:** where a page drills one skill, 5 fresh problems after the book's own, as in Class 3. OK?
