# Brief: writing one chapter of the Class 3 activity file (rest/chNN.js)

You write the Activity Studio activities for some chapters of the NCTB Class 3 math book (*প্রাথমিক গণিত, তৃতীয় শ্রেণি*, 2026). The activities are games a child plays from a QR code on the page. The book is in Bangla.

## Read first

1. `~/Downloads/class3-math-activities/PLAN-ITEM7.md`: which game type and item shape fits each kind of exercise, and the book's misprints to fix.
2. The survey section for your chapters (`CH01-08-PAGES.md` or `CH10-13-PAGES.md`, same folder). It has every exercise as printed, with the right answer: **Ans:** (worked out by the surveyor) or **Printed:** (the book shows it). Numbers there are ASCII; Bangla words in quotes are exact.
3. `rest/lib.js`: the helpers you must use. Its header lists each item kind's answer format.
4. For style, look at how `build.js` (the fraction chapter) groups a page's exercises into activities, writes titles, `src` lines and notes. Its file `ACTIVITIES-bn.json` is the result.
5. If an item shape is unclear, read the server's own rules: `~/ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js` (`normalizeWorkItem`, `normalizeUnitItem`, `normalizeChartItem`, `normalizeGeoItem`; the comment block at its top). Read only; never edit any file outside `rest/chNN.js`.

## What to write

One file per chapter, `rest/chNN.js` (ch01 … ch08, ch10 … ch13):

```js
// অধ্যায় ৫ · গুণ (printed pp.42–62): one line on what's here
module.exports = (L) => {
  const { it, mine, wio, q, mcq, match, eq, wordPair, order, sort, note, cant, toBn } = L;
  // ── p.58–60: multiplying by a 2-digit number ──
  wio({
    page: 60, slug: "mul-2digit", title: "উপর-নিচ গুণ করি",
    items: [it({ kind: "sum", a: 21, op: "×", b: 13, layout: "column" }, 273), /* … */],
    fresh: { skill: "mul2", digits: 2 },
    src: "p.58 example 21 × 13 (printed 273), p.60 অনুশীলন ১ (১)–(৬)",
  });
};
```

- **Do not edit `rest/lib.js`, `build-rest.js` or `validate-rest.js`.** Other people write the other chapters at the same time. If you need a helper, write it inside your own file. If the lib seems wrong, say so in your final message.
- Every Work It Out item is `it(item, want)`: `want` is the survey's answer in the server's answer format (lib.js header). Use `mine(item, why)` only when the survey gives no answer (keep it rare; say why).
- **Use the page's own numbers and words.** Don't invent problems. Stories (`text`) are copied as printed (write their numbers in ASCII; the lib turns them into Bangla digits).
- Titles and every text the child reads are Bangla, with Bangla digits (write ASCII digits in prompts/options/pairs/stories, the lib converts them; a title may not contain ASCII digits: write Bangla digits in titles directly).
- `page` is the PRINTED page the activity practises (usually the page of its last or main exercise). `slug`: short, lower-case, hyphens, unique per page. `src`: where on the pages the items come from (marker names and numbers as in the survey, e.g. "p.60 অনুশীলন ১ (১)–(৬), p.61 নিজে করি ৩").

## Grouping

- One activity per exercise group of a page or two: **4–12 items** for Work It Out games (3–20 allowed), **4–10 questions** for multiple choice, **4–8 pairs** for a match. A long exercise list is split into (১), (২) … activities.
- Skip pure demos (answer printed, nothing to do) unless they make a good first item. Skip what can't be played (free drawing, real-world measuring, discussion, "make a story"): list them with `cant("…")`.
- Where a page drills one skill, add fresh problems: `fresh: { skill, … }` (5 are added after the page's items). Work It Out skills: add, sub, add3, mul, mulcol (× a 1-digit number in columns), mul2 (× a 2-digit number), grid, mdigit, divrem, expr, missing, place, compare, pattern, units, convert; with `digits` 1–5, `carry` "yes"/"no"/"any", `table` 0–15, `layout` "row"/"column". Tools: their own skill (money, clock, measure, shapes, groups, numberline, mistake) and `more: true` for the Class 3 rounds (paisa, mm, kg, সাড়ে/সোয়া/পৌনে, elapsed time, odd one out). units_amounts: unitmix | convert | units, with `unit` any|money|length|weight|time. tally_chart: chartmix | tally | chart. angles_dots: geomix | angle | dots. Not for stories or mixed activities.

## Item notes (beyond PLAN-ITEM7.md)

- Unit codes: tk ps km m cm mm kg g h min s (not Bangla words). Clock `part`: morning | noon | afternoon | night. Clock hours 1–12.
- Chart `a`, `b`: the row's place, 0 first. Row names: Bangla words. A chart value must be a whole number of symbols or a quarter/half/three quarters of one (value × 4 divisible by key), at most 12 symbols a row; `make` needs halves at most.
- `word`: `text` (the story as printed), `sum` (the sum that answers it, in ASCII signs: "20 × 5 + 150", 2–3 steps for two-step stories, each step whole and never below 0), `unit` (the answer's unit word, e.g. "টাকা", "জন").
- `missing`: `text` with one □ ("□ × 4 = 28"); exactly one number may fit.
- `place`: n up to 100000; ask "parts" (type each place) or "number" (the places are shown, type the number).
- `compare`: a and b as strings, may be sums ("4 × 7", "30").
- `numberline`: from, to, step (2–20 steps), target, ask read|place.
- Money with paisa: amounts as taka decimals (78.25; a 25-paisa coin is 0.25).
- Multiple choice from the book: `q({ prompt, options, book: "গ", why })` keeps the book's options in ক খ গ ঘ order. Your own questions: `q({ prompt, options, answer, why })` (shuffled). Add `num` when the answer is a number. `why` ≤ 160 characters: one short line of working, in Bangla.
- Number words: `wordPair(n, printed)` with the book's own spelling as `printed` when the book prints the words (the lib checks its spelling against yours; if they differ, use the book's spelling in a plain pair `[toBn(n), "…"]` and say so in your final message). `eq("367*25")` makes an equation pair.

## The misprints

Fix every misprint PLAN-ITEM7.md lists for your pages (change the option, the template, add the brackets…), and record each fix with `note("p.19 নিজে করি ৪ (৪): …")`. Also `note()` any reading you weren't sure of and any choice a teacher should know about (e.g. a picture count you had to choose). Write notes in English, as in build.js's NOTES.

## Check your work

```sh
cd ~/Downloads/class3-math-activities
source ~/.nvm/nvm.sh && nvm use 16
node build-rest.js --only chNN            # or --only ch06,ch07,ch08
node validate-rest.js .check/only-chNN.json
```

Both must pass (validate prints OK). validate compares the SERVER's answer with your `want`: a mismatch means a typing slip, a wrong reading, or an item shape the server reads differently. Fix the cause; never change a `want` just to match the server without checking the survey and the arithmetic. If the survey's answer is itself wrong, use the right answer and `note()` it.

## Your final message

Short: the activities you wrote per chapter (count, types, items), the misprints fixed, anything you couldn't fit, any `mine()` items, anything about lib.js that seemed wrong, and the last validate output's summary lines.
