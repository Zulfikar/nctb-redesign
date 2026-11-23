# Class 3 math, chapters ১–৮ and ১০–১৩: the plan for the activity file (item 7)

*Written 2 Nov 2026, late night, before a compact. `README.md` in this folder is written by `build.js` (the fraction file), so this plan lives here.*

**DONE 3 Nov 2026:** `ACTIVITIES-bn-rest.json` (170 activities) + `README-rest.md`, built by `build-rest.js` from `rest/chNN.js`, checked by `validate-rest.js`. The plan below is kept as written.

**State (2 Nov):** items 1–6 of the user's list are built in the web code (uncommitted, all tested). The new rounds below exist on the server (`work-it-out.helper.js`), on the website (`work-it-out.js`, the player, the editor) and in the importer. The file for chapters ১–৮ and ১০–১৩ is **not written yet**.

**Read first:** `CH01-08-PAGES.md` and `CH10-13-PAGES.md` (every exercise as printed, with the type it needs and its answer).

## How to build it

- Build it like the fraction file: a builder script that writes the activity file and its README, and `validate.js` (the importer's own checks, the server's answers against the book's and the survey's).
- **Recommended:** a separate builder (e.g. `build-rest.js` → `ACTIVITIES-bn-rest.json`) for chapters ১–৮ and ১০–১৩, with the same book block (all 13 chapters). The fraction file (`ACTIVITIES-bn.json`, 24 activities) stays as it is, so the user can import the two files one after the other.
- The page's own exercises first. Add `configuration.fresh` where a page drills one skill: always write the skill out, `{ skill, count: 5, … }`. For the tools' Class 3 rounds, add `more: true`.
- Codes: `LS…`, 8 characters. Check them free on the live DB, read-only.
- Printed page = PDF page − 6.

## Which round for which need

| Survey need | Type (`activityType`) | Item |
|---|---|---|
| A1 two-unit sums (টাকা পয়সা, কিমি মি, কেজি গ্রাম, ঘণ্টা মিনিট) | `units_amounts` (or `work_it_out`) | `{ kind: "units", unit: "tk"\|"km"\|"kg"\|"m"\|"cm"\|"h"\|"min", terms: [[150, 65], [67, 83]], ops: ["+"], layout: "row"\|"column", text? }`; a two-step story: all its terms and ops in order (200 − 80 − 25.75) |
| N1 unit change | `units_amounts` | `{ kind: "convert", from: [[2, "km"], [26, "m"]], to: "m" }`, or `to: ["kg", "g"]` |
| N2 tally | `tally_chart` | `{ kind: "tally", rows: [{ name, emoji, value }], ask: "make"\|"read" }` (values 1–30, total ≤ 60) |
| N2 pictograph | `tally_chart` | `{ kind: "chart", rows, key, symbol: "dot"\|"flower"\|"star"\|"box"\|"hourglass"\|"emoji", dir: "h"\|"v", unit?, hideKey?, ask, a?, b?, given?, text?, sum? }`, one item per question. Asks: value, most, least, which, total, sum, diff, key, part, more, calc (`sum` with #1 #2…), table, make. Values are the real numbers (symbols × key). |
| MCOL × by a 2-digit number | `work_it_out` | `{ kind: "sum", a: 367, op: "×", b: 25, layout: "column" }` (product < 100000) |
| ADD3 3–4 numbers | `work_it_out` | `{ kind: "sum", terms: [289, 240, 265], op: "+", layout: "column" }` |
| PV5 place value | `work_it_out` | `{ kind: "place", n: 83473, ask: "parts"\|"number" }` (≤ 100000) |
| DIGIT missing digits | `work_it_out` | `{ kind: "mdigit", terms: ["□10", "2□5", "10□"], op: "+", total: "857", layout }` (only one way to fill) |
| FACTROW table grid / flowers | `work_it_out` | `{ kind: "grid", rows: [12], cols: [4, 5, 2, …], shown: ["0,1"] }` (≤ 6 rows, 15 columns, 60 cells: split the 15 × 15 table) |
| LDIV with a remainder | `work_it_out` | `{ kind: "divrem", a: 14, b: 4 }`, a story `{ …, text, qUnit, rUnit }` |
| ARRAY □ = □ × □ + □ | `work_it_out` | `{ kind: "divrem", a: 31, b: 8, ask: "array" }` |
| 2STEP stories | `work_it_out` | `{ kind: "word", text, sum: "20 × 5 + 150", unit }` (played as ধাপ ১, ধাপ ২) |
| ORDER mixed expressions | `work_it_out` | `{ kind: "expr", text: "750 − 185 × 4" }` |
| GROUPS how many plates / leftovers | `equal_groups` | `{ kind: "groups", ask: "plates", total: 12, each: 3 }`; `{ kind: "groups", total: 14, groups: 4 }` (leftover 2) |
| N4 angles | `angles_dots` | `{ kind: "angle", deg: 45, rot? }` (name it); `{ kind: "angle", ask: "make", type }` |
| N3 dot grid | `angles_dots` | `{ kind: "dots", task: "rect"\|"square"\|"angle"\|"complete", w, h, type?, given? }` |
| A2 পয়সা | `taka_shop` | amounts as taka decimals: `{ kind: "money", ask: "count", notes: [500, 0.5, 0.25] }`; change `{ price: 78.25, paid: 100 }` |
| A3 fixed wallet / exchange | `taka_shop` | `{ kind: "money", ask: "pay", price: 52.75, wallet: [20, 20, 10, …, 0.25] }` |
| A4 ruler in mm | `measure_it` | `{ kind: "measure", tool: "ruler", mm: true, value: 43 }` |
| A5 dial / digital scale | `measure_it` | `{ kind: "measure", tool: "scale", value: 3 }`, `{ …, digital: true }` |
| A6 kg weights, fewest, stock | `measure_it` | `{ kind: "measure", tool: "balance", kg: true, weights: [1000, 1000, 1000, 200, 20] }`; `{ tool: "balance", ask: "weigh", value: 1300, fewest: true, stock? }` |
| A7 সকাল … সাড়ে/সোয়া/পৌনে | `clock_time` | `{ kind: "clock", h: 2, m: 45, ask: "words", part: "noon" }` (morning/noon/afternoon/night) |
| A8 digital face | `clock_time` | `{ kind: "clock", h: 7, m: 2, face: "digital" }` (the 24-hour "21:33" item: multiple choice) |
| A9 elapsed time | `clock_time` | `{ kind: "clock", h: 3, m: 20, ask: "after"\|"before", add: 30 }`; `{ h: 10, m: 0, ask: "between", h2: 3, m2: 30 }` |
| A10 big and small shapes | `shape_patterns` | tokens like `"triangle-grey-s"` (small), colour `grey` |
| A12 which one breaks it | `shape_patterns` | `{ kind: "shapes", ask: "odd", seq: [...] }` (every shape shown) |
| A11 growing patterns, "is it a pattern?" | `mcq` (or True/False) | no round for them |
| The rest | `mcq`, `number_match`, `categorize`, `sequence`, `work_it_out` (sum, missing, compare, pattern, word) | as in the surveys' "[as is]" lines |

## The book's misprints: fix before writing them in

- **p19 (৪):** two identical options.
- **p52 অনু ১:** "(২)" is printed twice.
- **p56:** "২ × ৪ = ১২" under the 20 × 40 box.
- **p82 (১):** ক and ঘ are both right. **p82 (২):** খ (8 × 7) equals গ (7 × 8).
- **p86:** the template says "৩০ জনে মোট"; it should be ৪২ জনে.
- **p89 (৫):** ক, খ and ঘ all give 12. **p89 (৬):** খ and গ both give 22.
- **p90 নিজে ১০(ক):** "৩৫০ − ৫০ ÷ ৬" needs brackets: (350 − 50) ÷ 6 = 50. The `expr` round refuses it without them.
- **p130 (4):** two options labelled গ). **p130 (5):** ক, খ and ঘ all make 3 কেজি 220 গ্রাম, and গ uses a "220 গ্রা" weight that doesn't exist.
- **p131 (10):** no option is right (the answer is 24). "ঘরির" should be ঘড়ির.
- **p141 অনু ২:** says 4 figures; 3 are printed.
- **p146 (3):** ambiguous (one right angle, or four unfolded).
- **p147 (8):** চাঁদা (a protractor) is never taught.
- **p147 নিজে ২(3):** the straight angle is drawn in the wrong row.
- **p149–150:** the park picture is too small to count, so choose sensible numbers.
- **p154:** the vehicle chart has no key (⧗ = 2, worked out from 8 গাড়ি).

## Checks before handing it over

- `validate.js` passes (it uses the server's own normalizers, so the new rounds are checked as the importer does).
- Every item's answer equals the survey's.
- The codes are free on the live DB (read-only).
- The first round of each new type is looked at in the real page at phone width.
