# Brief for a helper: write the Class 4 math games for some pages

You write the Activity Studio games for a range of pages of the NCTB book **প্রাথমিক গণিত, চতুর্থ শ্রেণি** (2026), our
redesign. The games go into one import file for the book /b/KZT9KF. The model is `pages/p001-003.js` (pages ১–৩): read it
first, then this brief, then `lib.js`'s header and `KINDS.md`.

## 1. What to make
- **At least one game on every printed page of your range that has something to practise.** A page with nothing to
  practise (a picture only, a page of instructions) gets `L.skipPage(page, "why")`. Most pages have something.
- **At least 10 questions in every game.** Fresh problems count (a game's `fresh: { skill, count: 5, … }` adds 5 new
  problems after the book's). A game may gather exercises from neighbouring pages; put it on the page where most of it
  is. Two or three games on a busy page is good (each page's QR shows the first; "+N" the others).
- **The book's own exercises first**, as printed: every number, every story (in its words), every unit. Then, where a
  page drills one skill, `fresh` with that skill (5). Don't make up exercises when the book has enough; when a page has
  too few, add similar ones of ours and say so in `src`.
- **Every round carries our answer**: `it(item, want)`. Work it out yourself (or take the book's printed answer); the
  checker compares it with the server's. Never copy the server's answer blindly: if they differ, find out who is wrong.
  `mine(item, why)` only when we truly can't give one (rare).
- **Where the book is wrong, the game is right**, with an `L.note("p.N: what the book prints, what the game uses")`. The
  known ones (`../class4-math-redesign/TEACHER-CHECK.md` §1): p৯৮ কাজ ৩ a strip of 5 quarters labelled ৫/৮ (it is ৫/৪);
  p১১৮ কাজ ৩(২) ৮.০ + ৪.৫ shown as ৩.৫ (it is ১২.৫); p১৩০–১৩১ shape ক said to be bigger but খ is drawn bigger; p১০৭
  "রাফির অংশ" (the story's child is রকি); p৩১ step 2 strikes the wrong ৯; p৪৩ the "১০০০ বার" arrow. Tell us any other.
- **No voice, no pictures.** Every drawing is made by the game itself. Titles and texts in Bangla (Bangla digits come by
  themselves from ASCII in the texts); the title says what the child does («স্থানীয় মানের ছকে সংখ্যা বসাই»), ≤ 80
  characters, no digits in it.

## 2. Which game for what
- **Sums, boxes, place value, patterns, long division, number sentences, factors/primes, decimals, dates** → Work It
  Out rounds (`wio({ type: "work_it_out" })`). Its kinds and their tools' types are in `KINDS.md` (the Type column):
  - Fraction Play (`fraction_play`): fractions, mixed numbers (`fmixed`), proper/improper (`fsort`);
  - Units & Amounts (`units_amounts`): `convert`, `units` (two units in columns), `units3` (three: ঘণ্টা মিনিট সেকেন্ড, মি সেমি মিমি);
  - Angles & Dot Grid (`angles_dots`): `angle` (name, make, **measure / draw on a protractor**, **clock hands**), `lines`
    (perpendicular / parallel / neither), `triangle` (by sides / by angles), `area` (squared paper), `dots`, …;
  - Tally & Pictograph (`tally_chart`): tallies, pictographs and **bar graphs** (`chart` with `symbol: "bar"`);
  - Clock & Time (`clock_time`), Taka Shop (`taka_shop`), Measure It (`measure_it`), Number Line (`number_line`), Make
    Equal Groups (`equal_groups`), Find the Mistake (`find_mistake`).
  - One game holds one type; Work It Out holds every `work_it_out` kind mixed.
- **A word problem** → `word` (`text` the story as printed, `sum` the working, `unit`); the child picks + − × ÷ first.
  Several steps: `sum` with them all ("1250 − 375 + 120"), worked a step at a time. Long division story: `longdiv` with `text`.
- **Questions in words** (which is bigger, which is true, what is it called) → `mcq` with `q()` (2–4 options, the right
  one by text or by the book's letter). **Matching** (a number and its words, a sum and its answer) → `match`
  (`number_match` / `equation_match`). **Putting in order** (smallest to largest) → `order`. **Sorting** into 2–5 groups →
  `sort` (Categorize); for numbers prefer `nmark` (tap the multiples / factors / primes / divisible).
- Rough shares in Class 3: about 60% Work It Out engine games, the rest quizzes and matches. Prefer a game where the
  child DOES the maths (types the answer, builds it) over a multiple-choice question about it.

## 3. The new rounds (part A, built for this book; they work on the website, tested)
`place` up to 8 digits (value / digit / words / figures / commas / cards); sums of 5 numbers; × a 3-digit number in
columns; `longdiv` (long division in the book's layout); `compare` with `signs: "eq"` (= ≠) or `"not"` (≮ ≯); `truth`;
`opbox`; `{ }` brackets in `expr` and `missing`; `missing.story`; `nmark`, `sieve`, `fpairs`, `ftree`; `fmixed`, `fsort`;
`dsum`, `dcompare`, decimal `convert` (৭ সেমি ৪ মিমি = ৭.৪ সেমি); litres/decilitres/millilitres, weeks/days, years/months
in `units` and `convert`; `units3`; `date`; `angle` measure / draw / clock; `lines`; `triangle`. Examples of every one,
with the answer the server gives, in `KINDS.md`.

## 4. Fresh problems
`fresh: { skill, count: 5, … }`, the skill written out. Work It Out's skills: add, sub, add3, mul, mulcol, mul2, mul3,
grid, mdigit, divrem, longdiv, mark, fpairs, ftree, date, expr, missing, place, compare, pattern, units, convert; with
`digits` (1–8), `carry` ("yes" / "no" / "any"), `table` (2–15: the times table, or long division's divisor), `layout`
("row" / "column"). A game's own `place` asks (words, commas…) and `nmark` rules, and its `ftree` way, are copied by the
fresh rounds by themselves. Fraction Play: fraction (a mix of the old kinds) or one kind (fmixed, fsort, fadd…), `den`
(2–12). Units & Amounts: unitmix, convert, units, with `unit` (any, money, length, weight, time, volume, days, age).
Angles & Dot Grid: geomix, angle, dots, area, mirror, coord, cubes, lines, triangle, protractor. Tally & Pictograph:
chartmix, tally, chart, spin. Only add fresh where a page drills ONE skill that the fresh skill really makes.

## 5. How to read the book
The book's every word and number is typed in `../class4-math-redesign/content/pNNN-NNN.js` (the `pages: [{ page, blocks }]`
list; `page` is the printed page). `ex` + `mark` are the exercises: `kaj` কাজ (worked in class), `anu` অনুশীলন (practice),
`nije` নিজে করি (review); `ask` the page's main question; `sums`, `text`, `rows` the exercises' contents; `say(…)` the
children's speech (often the method). The `.parts.js` files draw the special figures (long division, number trees,
calendars): read them when a block's numbers aren't clear. `previews/page-NNN.png` there is each page as built (PDF page
= printed + 7) if you need to look.

## 6. Your file, the commands, done
- Write ONLY `pages/pNNN-NNN.js` for your range (e.g. `pages/p023-048.js`); you may split it into two files of
  consecutive pages. Don't edit lib.js, build.js, validate.js, KINDS.md, other ranges' files, the book or the website. No git.
- Keys: `slug` (lower-case, digits, hyphens) unique on its page. QR names and codes are made by the build.
- Check as you go:
  ```sh
  cd ~/Downloads/NCTB-Redesigned/class4-math-activities
  node build.js --only p023-048                                   # every activity checked; pages without a game listed
  node validate.js .check/only-p023-048.json                    # the importer and the server: must say OK (no -r flag)
  ```
- **Done** when the build prints no `(?)` page (every page has a game or a skipPage) and validate says `OK` with
  `0 items without our answer` unless you used `mine()`.
- Then report back, briefly: games per page (page: titles), the book's errors you met (and your `note()`s), what the
  game types couldn't express (`L.cant()`), and anything you weren't sure of. Keep it short; the file holds the rest.
