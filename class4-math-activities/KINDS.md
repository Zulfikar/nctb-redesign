# Every game round: an example and the server's answer

Made by `node tools/kinds-table.js` from the server's own code (`work-it-out.helper.js`). The answer column is what `it(item, want)`'s `want` must be for that item. Write numbers in numeric fields as ASCII; the build turns the texts a child reads into Bangla digits.

| Type | Item (as written in a page file) | The server's answer: `it(item, want)` |
|---|---|---|
| work_it_out | `{"kind":"sum","a":456789,"op":"+","b":123456,"layout":"column"}` | `580245` |
| work_it_out | `{"kind":"sum","terms":[12345,6789,101,55,9],"op":"+","layout":"row"}` | `19299` |
| work_it_out | `{"kind":"sum","a":535,"op":"×","b":125,"layout":"column"}` | `66875` |
| work_it_out | `{"kind":"missing","text":"□ + 20 = 35"}` | `15` |
| work_it_out | `{"kind":"missing","text":"{48 − (6 + 2)} ÷ □ = 8","story":"a sentence in words, as printed"}` | `5` |
| work_it_out | `{"kind":"word","text":"রনির কাছে ২৫টি আম আছে। সে আরও ১২টি আম পেল। তার কাছে এখন কতটি আম?","sum":"25 + 12","unit":"টি"}` | `37` |
| work_it_out | `{"kind":"expr","text":"24 + 12 ÷ 3 × 2"}` | `32` |
| work_it_out | `{"kind":"compare","a":"34567","b":"34657"}` | `"<"` |
| work_it_out | `{"kind":"compare","a":"27 ÷ 3","b":"9","signs":"eq"}` | `"="` |
| work_it_out | `{"kind":"compare","a":"45","b":"54","signs":"not"}` | `"≯"` |
| work_it_out | `{"kind":"truth","text":"14 × 3 < 35 + 4"}` | `"false"` |
| work_it_out | `{"kind":"opbox","text":"69 □ 13 = 7 □ 8"}` | `["−","×"]` |
| work_it_out | `{"kind":"place","n":312841,"ask":"parts"}` | `[3,1,2,8,4,1]` |
| work_it_out | `{"kind":"place","n":312841,"ask":"number"}` | `312841` |
| work_it_out | `{"kind":"place","n":312841,"ask":"value","at":4}` | `10000` |
| work_it_out | `{"kind":"place","n":312841,"ask":"digit","at":4}` | `1` |
| work_it_out | `{"kind":"place","n":290516,"ask":"words"}` | `["দুই লক্ষ","নব্বই হাজার","পাঁচশত","ষোলো"]` |
| work_it_out | `{"kind":"place","n":290516,"ask":"words","system":"intl"}` | `["দুইশত","নব্বই হাজার","পাঁচশত","ষোলো"]` |
| work_it_out | `{"kind":"place","n":557362,"ask":"figures"}` | `557362` |
| work_it_out | `{"kind":"place","n":3169615,"ask":"commas"}` | `[2,4]` |
| work_it_out | `{"kind":"place","n":3169615,"ask":"commas","system":"intl"}` | `[1,4]` |
| work_it_out | `{"kind":"place","ask":"cards","cards":[4,0,7,2],"want":"largest"}` | `7420` |
| work_it_out | `{"kind":"pattern","terms":[100000,200000,"□",400000,"□"]}` | `[300000,500000]` |
| work_it_out | `{"kind":"mdigit","terms":["□10","2□5","10□"],"op":"+","total":"857","layout":"column"}` | `[5,4,2]` |
| work_it_out | `{"kind":"grid","rows":[12],"cols":[1,2,3,4,5,6,7,8,9,10]}` | `[12,24,36,48,60,72,84,96,108,120]` |
| work_it_out | `{"kind":"divrem","a":27,"b":4}` | `[6,3]` |
| work_it_out | `{"kind":"divrem","a":27,"b":4,"text":"a story","qUnit":"জন","rUnit":"টি"}` | `[6,3]` |
| work_it_out | `{"kind":"longdiv","a":3266,"b":23}` | `[142,0]` |
| work_it_out | `{"kind":"longdiv","a":941,"b":23,"text":"a story as printed"}` | `[40,21]` |
| find_mistake | `{"kind":"mistake","a":4567,"op":"+","b":1234,"shown":5701}` | `{"pos":1,"digit":8}` |
| work_it_out | `{"kind":"dsum","a":"3.7","op":"+","b":"2.8","layout":"row"}` | `[6,5]` |
| work_it_out | `{"kind":"dsum","a":"8","op":"−","b":"4.5","layout":"column"}` | `[3,5]` |
| work_it_out | `{"kind":"dcompare","a":"7/10","b":"0.9"}` | `"<"` |
| work_it_out | `{"kind":"nmark","rule":"multiple","n":4,"nums":[12,15,16,20,22,24]}` | `[12,16,20,24]` |
| work_it_out | `{"kind":"nmark","rule":"factor","n":16,"from":1,"to":16}` | `[1,2,4,8,16]` |
| work_it_out | `{"kind":"nmark","rule":"prime","from":1,"to":30}` | `[2,3,5,7,11,13,17,19,23,29]` |
| work_it_out | `{"kind":"nmark","rule":"div","n":5,"nums":[125,130,142,155]}` | `[125,130,155]` |
| work_it_out | `{"kind":"sieve","to":100}` | `[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]` |
| work_it_out | `{"kind":"fpairs","n":12}` | `[[1,12],[2,6],[3,4]]` |
| work_it_out | `{"kind":"ftree","n":30,"ask":"tree"}` | `[2,3,5]` |
| work_it_out | `{"kind":"ftree","n":24,"ask":"line"}` | `[2,2,2,3]` |
| work_it_out | `{"kind":"date","y":1971,"m":12,"d":16,"ask":"write","show":"words"}` | `[16,12,1971]` |
| work_it_out | `{"kind":"date","y":2025,"m":6,"d":30,"ask":"write","show":"cal"}` | `[30,6,2025]` |
| work_it_out | `{"kind":"date","y":1971,"m":12,"d":16,"ask":"weekday"}` | `4` |
| work_it_out | `{"kind":"date","y":2025,"m":9,"d":8,"ask":"between","d2":25}` | `17` |
| work_it_out | `{"kind":"date","y":2026,"m":1,"d":1,"ask":"after","n":20}` | `21` |
| units_amounts | `{"kind":"units","unit":"km","terms":[[3,450],[2,780]],"ops":["+"],"layout":"column"}` | `[6,230]` |
| units_amounts | `{"kind":"units3","unit":"h","terms":[[2,35,40],[1,40,25]],"ops":["+"],"layout":"column"}` | `[4,16,5]` |
| units_amounts | `{"kind":"convert","from":[[2,"km"],[26,"m"]],"to":"m"}` | `2026` |
| units_amounts | `{"kind":"convert","from":[[2026,"m"]],"to":["km","m"]}` | `[2,26]` |
| units_amounts | `{"kind":"convert","from":[[650,"g"]],"to":"kg"}` | `[0,65]` |
| units_amounts | `{"kind":"convert","from":[[7,"cm"],[4,"mm"]],"to":"cm"}` | `[7,4]` |
| clock_time | `{"kind":"clock","h":4,"m":30,"ask":"read"}` | `[4,30]` |
| clock_time | `{"kind":"clock","h":2,"m":15,"ask":"between","h2":4,"m2":45}` | `[2,30]` |
| taka_shop | `{"kind":"money","ask":"count","notes":[100,50,20,5]}` | `175` |
| measure_it | `{"kind":"measure","tool":"ruler","value":14,"ask":"read"}` | `14` |
| measure_it | `{"kind":"measure","tool":"jug","value":650,"ask":"fill"}` | `650` |
| number_line | `{"kind":"numberline","from":0,"to":2,"step":0.1,"target":1.3,"ask":"read"}` | `[1,3]` |
| number_line | `{"kind":"numberline","from":0,"to":20,"step":1,"target":7,"ask":"place"}` | `7` |
| equal_groups | `{"kind":"groups","total":17,"groups":5}` | `[3,2]` |
| fraction_play | `{"kind":"fname","n":3,"d":4,"shape":"circle"}` | `[3,4]` |
| fraction_play | `{"kind":"fshade","n":7,"d":10,"shape":"bar"}` | `7` |
| fraction_play | `{"kind":"fequiv","a":"1/2","b":"3/6"}` | `"yes"` |
| fraction_play | `{"kind":"fsame","n":1,"d":2,"d2":12}` | `6` |
| fraction_play | `{"kind":"fcompare","a":"3/8","b":"5/8"}` | `"<"` |
| fraction_play | `{"kind":"fadd","a":"2/7","op":"+","b":"3/7"}` | `[5,7]` |
| fraction_play | `{"kind":"fline","n":3,"d":5,"ask":"read"}` | `[3,5]` |
| fraction_play | `{"kind":"fmixed","a":"7/4","ask":"tomixed","look":"pie"}` | `[1,3]` |
| fraction_play | `{"kind":"fmixed","a":"2 1/4","ask":"toimproper","look":"bar"}` | `9` |
| fraction_play | `{"kind":"fmixed","a":"13/5","ask":"tomixed","look":"line"}` | `[2,3]` |
| fraction_play | `{"kind":"fmixed","a":"1 1/5","ask":"place"}` | `6` |
| fraction_play | `{"kind":"fsort","want":"improper","fracs":["3/5","7/5","5/5","2/3"]}` | `["7/5","5/5"]` |
| angles_dots | `{"kind":"angle","deg":45,"ask":"name"}` | `"acute"` |
| angles_dots | `{"kind":"angle","ask":"make","type":"obtuse"}` | `"obtuse"` |
| angles_dots | `{"kind":"angle","ask":"measure","deg":50,"from":"right"}` | `50` |
| angles_dots | `{"kind":"angle","ask":"draw","deg":120,"from":"left"}` | `120` |
| angles_dots | `{"kind":"angle","ask":"clock","h":4,"m":30}` | `45` |
| angles_dots | `{"kind":"lines","a":0,"b":90,"cross":false}` | `"perp"` |
| angles_dots | `{"kind":"triangle","ask":"sides","sides":[7,5,4]}` | `"scalene"` |
| angles_dots | `{"kind":"triangle","ask":"angles","angles":[30,60,90]}` | `"right"` |
| angles_dots | `{"kind":"area","ask":"both","cells":[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]],"unit":"সেমি"}` | `[6,10]` |
| angles_dots | `{"kind":"dots","task":"rect","w":6,"h":5}` | `"rect"` |
| tally_chart | `{"kind":"tally","ask":"make","rows":[{"name":"আম","emoji":"🥭","value":7},{"name":"কলা","emoji":"🍌","value":4}]}` | `[7,4,11]` |
| tally_chart | `{"kind":"chart","symbol":"bar","dir":"v","key":5,"ask":"most","rows":[{"name":"রবি","value":20},{"name":"সোম","value":35},{"name":"মঙ্গল","value":15}]}` | `[1]` |

### The server's own line for each kind (as the AI importer reads it)

- **sum** (work_it_out): { "kind": "sum", "a": 34, "op": "+", "b": 25, "layout": "row" / "column" } — a sum (op one of + − × ÷); "column" when the page writes it in columns (one number under the other: adding or taking away with carrying or borrowing, or multiplying by a one- or two-digit number). Three to five numbers added: { "kind": "sum", "terms": [289, 240, 265], "op": "+", "layout": "row" / "column" }.
- **missing** (work_it_out): { "kind": "missing", "text": "□ + 20 = 35", "story": "the sentence as printed, only when the page tells it in words" } — an equation with exactly ONE box (□) to fill (brackets ( ) and { } as printed).
- **date** (work_it_out): { "kind": "date", "y": 1971, "m": 12, "d": 16, "ask": "write" / "weekday" / "between" / "after", "show": "cal" / "words", "d2": 25, "n": 10, "text": "the sentence as printed (optional)" } — DATES (তারিখ): "write" = write the date the usual way দিন/মাস/সাল (১৬/১২/১৯৭১) from a calendar month with it ringed ("cal") or from words ("words"); "weekday" = which day of the week is it, read off the calendar; "between" = how many days from d to d2 (same month); "after" = tap the date n days after d (same month).
- **fmixed** (fraction_play): { "kind": "fmixed", "a": "7/4" / "1 3/4", "ask": "tomixed" / "toimproper" / "place", "look": "pie" / "bar" / "line" } — MIXED NUMBERS (মিশ্র ভগ্নাংশ): an improper fraction more than 1 and not a whole (d 2–12, up to 5 wholes), drawn as wholes and a part or on a number line from 0; "tomixed" writes ৭/৪ as ১ ৩/৪, "toimproper" writes ১ ৩/৪ as ?/৪, "place" taps the point on the line (only "line").
- **fsort** (fraction_play): { "kind": "fsort", "want": "proper" / "improper", "fracs": ["3/5", "7/5", "5/5", "2/3"] } — ring the PROPER (প্রকৃত: লব < হর) or the IMPROPER (অপ্রকৃত: লব ≥ হর) fractions among 3–12.
- **nmark** (work_it_out): { "kind": "nmark", "rule": "multiple" / "div" / "factor" / "prime" / "composite", "n": 4, "nums": [12, 15, 16, 20] } or { …, "from": 1, "to": 100 } — the child TAPS the numbers that fit: multiples of n (গুণিতক), divisible by n (বিভাজ্য: 2, 5, 10), factors of n (গুণনীয়ক), primes (মৌলিক), composites (যৌগিক); "nums" the list as printed (3–100 numbers, 1–9999), or a number chart "from"…"to" (up to 100 numbers). No "n" for prime and composite. One rule per item (a page marking the multiples of 5 and of 7: two items).
- **sieve** (work_it_out): { "kind": "sieve", "to": 100 } — the game of finding the primes up to 100 (or 20–100) on a number chart: cross out 1, ring 2 and cross out its multiples, then 3, 5, 7.
- **fpairs** (work_it_out): { "kind": "fpairs", "n": 12 } — write n as all its FACTOR PAIRS (১২ = ১ × ১২ = ২ × ৬ = ৩ × ৪), n 2–100.
- **ftree** (work_it_out): { "kind": "ftree", "n": 30, "ask": "tree" / "line" } — PRIME FACTORS (মৌলিক গুণনীয়ক/উৎপাদক) of a composite n (4–999): "tree" builds a factor tree (৩০ = ২ × ১৫, ১৫ = ৩ × ৫) then writes ৩০ = ২ × ৩ × ৫; "line" only fills ৩০ = □ × □ × □.
- **longdiv** (work_it_out): { "kind": "longdiv", "a": 3266, "b": 23, "text": "the story as printed (optional)" } — LONG DIVISION worked step by step as the book does (উপর-নিচে: a quotient digit, the product, the difference, the next digit brought down): b 2–99, a up to 99999.
- **dsum** (work_it_out): { "kind": "dsum", "a": "3.7", "op": "+" / "−", "b": "2.8", "layout": "row" / "column" } — adding or taking away DECIMALS (দশমিক, up to two places, at least one number with a point; a whole number as "8"); "column" when the page writes them one under the other.
- **dcompare** (work_it_out): { "kind": "dcompare", "a": "7/10", "b": "0.9" } — put <, > or = between two numbers when one is a decimal or a fraction ("n/d").
- **truth** (work_it_out): { "kind": "truth", "text": "14 × 3 < 35 + 4" } — a number sentence with ONE of = ≠ < > ≮ ≯: is it true (সঠিক) or false (ভুল)?
- **opbox** (work_it_out): { "kind": "opbox", "text": "69 □ 13 = 7 □ 8" } — put + − × ÷ in each box (1–3 boxes) so that the sentence is true.
- **place** (work_it_out): { "kind": "place", "n": 345, "ask": "parts" / "number" / "value" / "digit" / "words" / "figures" / "commas", "at": 2, "system": "bn" / "intl" } — place value (n up to 99999999, 8 digits: কোটি, নিযুত, লক্ষ, অযুত, হাজার, শতক, দশক, একক): "parts" = write the digit of each place; "number" = write the number from its parts; "value" = the place value (স্থানীয় মান) of the digit in place "at" (0 = ones … 7 = কোটি); "digit" = which digit is in place "at"; "words" = write the number in words (কথায় লিখি); "figures" = the number is given in words, write it in digits (অঙ্কে লিখি); "commas" = put in the commas; "system" (words, figures, commas only): "bn" = the Bangladeshi way (কোটি, লক্ষ, হাজার), "intl" = the international way (মিলিয়ন). Or { "kind": "place", "ask": "cards", "cards": [4, 0, 7, 2], "want": "largest" / "smallest" } — make the largest or the smallest number with all the digit cards.
- **mdigit** (work_it_out): { "kind": "mdigit", "terms": ["□10", "2□5", "10□"], "op": "+", "total": "857", "layout": "row" / "column" } — a sum with DIGITS left out: each □ stands for ONE digit inside a number ("3□12"); "total" the answer as printed, with its own □ if it has one.
- **grid** (work_it_out): { "kind": "grid", "rows": [11, 12], "cols": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "shown": ["0,4"] } — a multiplication table (গুণের নামতা) or a multiplication flower to fill: each cell = row × column; "shown" lists the cells the page already prints ("row,col", counted from 0). At most 6 rows, 15 columns and 60 cells: split a bigger table into several items.
- **pattern** (work_it_out): { "kind": "pattern", "terms": [2, 4, 6, null, null] } — a number pattern; null for each box to fill.
- **word** (work_it_out): { "kind": "word", "text": "the word problem exactly as printed, in the page\'s language", "sum": "45 + 32", "unit": "টাকা" } — "sum" = the arithmetic that answers it; a two- or three-step problem in ONE sum, in the order the steps are done, with brackets where needed ("20 × 5 + 150", "(74 + 70) ÷ 8", "750 − 185 × 4").
- **compare** (work_it_out): { "kind": "compare", "a": "47", "b": "74", "signs": "lt" / "eq" / "not" } — put a sign between two numbers (or two short sums, brackets as printed): "lt" (the default) <, > or =; "eq" when the page asks ‘=’ or ‘≠’; "not" when it asks ‘≮’ or ‘≯’ (never two equal sides).
- **mistake** (find_mistake): { "kind": "mistake", "a": 38, "op": "+", "b": 24, "shown": 52 } — a column sum (+ or −) worked out WITH ONE WRONG DIGIT in "shown" (a forgotten carry, a wrong borrow, a slip); the child finds and fixes it. "shown" must have as many digits as the right answer and differ in exactly one digit.
- **clock** (clock_time): { "kind": "clock", "h": 3, "m": 30, "ask": "read" / "set" } — a clock time (h 1–12, m 0–59; "set": minutes in fives): "read" = the child reads the clock; "set" = the child turns the hands.
- **money** (taka_shop): { "kind": "money", "ask": "pay" / "count" / "change", "price": 65, "items": [ { "name": "পেঁপে", "emoji": "🍈", "price": 40 } ], "paid": 100, "notes": [50, 20, 5] } — Bangladeshi taka: "pay" = make the price with coins and notes (items optional: their prices add up to the price); "count" = add up the notes and coins in "notes" (each one of 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000); "change" = the change from "paid".
- **groups** (equal_groups): { "kind": "groups", "total": 12, "groups": 3, "emoji": "🍎" } — share total things equally into 2–6 groups (total at most 30; what can\'t be shared equally is left over). Or { "kind": "groups", "ask": "plates", "total": 12, "each": 3, "emoji": "🍪" } — so many on each plate (2–10): how many plates (and how many left over)?
- **divrem** (work_it_out): { "kind": "divrem", "a": 14, "b": 4, "ask": "row" / "array", "text": "the story exactly as printed", "qUnit": "টুকরা", "rUnit": "সেমি" } — division with a remainder (ভাগশেষ): a ÷ b = □, ভাগশেষ □ (b 2–12); "array" when the page shows rows of b things with a short last row and asks □ = □ × □ + □; "text" (with qUnit and rUnit) only for a story asking how many and how much is left.
- **expr** (work_it_out): { "kind": "expr", "text": "750 − 185 × 4" } — a mixed expression to work out (2–4 signs, brackets as printed): the child works it step by step (brackets, then × ÷, then + −, from the left).
- **numberline** (number_line): { "kind": "numberline", "from": 0, "to": 20, "step": 1, "target": 7, "ask": "place" / "read" } — a number line with 2–20 steps: "place" = tap where target goes; "read" = an arrow points at target. Decimals to two places work too (দশমিক): { "from": 0, "to": 2, "step": 0.1, "target": 1.3 }.
- **measure** (measure_it): { "kind": "measure", "tool": "ruler" / "jug" / "balance", "value": 14, "ask": "read" / "fill", "weights": [100, 50], "emoji": "✏️" } — read a length on a ruler (1–30 cm), the water in a measuring jug (50–1000 ml in 50s; "fill" = pour to the amount), or a weight on a balance (its gram weights, or "value" in grams).
- **shapes** (shape_patterns): { "kind": "shapes", "seq": ["circle-red", "square-blue", "circle-red", "square-blue", null, "square-blue"] } — a repeating pattern of shapes with ONE null for the missing one; each shape "<circle/square/triangle/star/heart/rect>-<red/blue/green/yellow/purple/orange>".
- **compose** (make_shapes): { "kind": "compose", "target": "square" / "rectangle" / "circle" / "big-square" } — which pieces make the shape (two triangles make a square; two squares a rectangle; two half circles a circle; four squares a big square).
- **fshade** (fraction_play): { "kind": "fshade", "n": 3, "d": 4, "shape": "circle" / "bar" / "square" } — shade (colour) n of the d equal parts (d 2–12); "bar" for a strip or chocolate, "circle" for a roti, pizza or cake, "square" for a square.
- **fpick** (fraction_play): { "kind": "fpick", "n": 2, "d": 3, "shape": "circle" } — pick the picture that shows n/d.
- **fname** (fraction_play): { "kind": "fname", "n": 1, "d": 4, "shape": "bar", "unit": "মিটার" } — a picture with n of d equal parts shaded: write the fraction (the top and the bottom number); "unit" only when the page asks a length or an amount. Or { "kind": "fname", "n": 7, "d": 13, "ask": "words", "first": "n" / "d" } — the page gives the top (লব) and the bottom (হর) in words: write the fraction ("first": which the page names first).
- **fline** (fraction_play): { "kind": "fline", "n": 2, "d": 5, "ask": "read" / "place", "unit": "মিটার" } — a number line from 0 to 1 cut into d equal parts: "read" = write the fraction at a mark; "place" = tap where n/d goes.
- **fequiv** (fraction_play): { "kind": "fequiv", "a": "3/4", "b": "9/12" } — are the two fractions equivalent (সমতুল) or not?
- **fcut** (fraction_play): { "kind": "fcut", "n": 1, "d": 4, "shape": "circle" } — cut the whole into d equal parts, then take (shade) n.
- **fwhole** (fraction_play): { "kind": "fwhole", "n": 1, "d": 4, "shape": "circle" } — n/d is shaded (n < d): how much more makes one whole?
- **fcompare** (fraction_play): { "kind": "fcompare", "a": "1/4", "b": "3/4", "shape": "bar" } — put <, > or = between two fractions ("1" for one whole).
- **fsame** (fraction_play): { "kind": "fsame", "n": 1, "d": 2, "d2": 4, "ask": "shade" / "type" } — the same amount: n/d = □/d2 (shade it on a whole cut into d2 parts, or type the top).
- **fadd** (fraction_play): { "kind": "fadd", "a": "1/5", "op": "+" / "−", "b": "2/5", "text": "the story exactly as printed", "unit": "মিটার" } — add or take away two fractions with the SAME bottom number ("a": "1" for "১ − 3/8"); "text" and "unit" only for a story problem.
- **fgroup** (fraction_play): { "kind": "fgroup", "n": 1, "d": 2, "total": 12, "emoji": "🥭" } — n/d of a group of total things (total at most 30, an exact share).
- **units** (units_amounts): { "kind": "units", "unit": "tk", "terms": [[150, 65], [67, 83]], "ops": ["+"], "layout": "row" / "column", "text": "the story exactly as printed" } — amounts written in TWO units, added or taken away: "unit" = "tk" (টাকা and পয়সা), "km" (কিলোমিটার and মিটার), "kg" (কিলোগ্রাম and গ্রাম), "m" (মিটার and সেন্টিমিটার), "cm" (সেন্টিমিটার and মিলিমিটার), "h" (ঘণ্টা and মিনিট), "min" (মিনিট and সেকেন্ড), "l" (লিটার and মিলিলিটার), "wk" (সপ্তাহ and দিন), "day" (দিন and ঘণ্টা) or "yr" (বছর and মাস, an age); each term [big, small] ("3 টাকা" = [3, 0], "25 পয়সা" = [0, 25]); 2–5 terms worked left to right with "ops" (+ or −, one fewer than the terms); "column" when the page writes two amounts one under the other; "text" only for a word problem (a two-step story: all its terms and ops in order, e.g. 200 − 80 − 25 টাকা 75 পয়সা).
- **units3** (units_amounts): { "kind": "units3", "unit": "h" / "m", "terms": [[2, 5, 58], [1, 14, 35]], "ops": ["+"], "layout": "row" / "column", "text": "the story as printed" } — amounts in THREE units: "h" = ঘণ্টা মিনিট সেকেন্ড, "m" = মিটার সেন্টিমিটার মিলিমিটার; each term [big, middle, small] (0 for a unit not written: "৬ ঘণ্টা ২৫ মিনিট" = [6, 25, 0]); 2–3 terms; "column" when the page writes two amounts one under the other.
- **convert** (units_amounts): { "kind": "convert", "from": [[2, "km"], [26, "m"]], "to": "m" } — change the unit ("2 কিলোমিটার 26 মিটার = □ মিটার"): "from" = one to three parts [number, unit], the biggest unit first; "to" = one unit, or two units ["kg", "g"] when the page asks "= □ কেজি □ গ্রাম". Units: "km" "m" "cm" "mm" (length), "kg" "g" (weight), "l" "dl" "ml" (লিটার, ডেসিলিটার, মিলিলিটার), "wk" "day" "h" "min" "s" (time), "yr" "mo" (an age: বছর, মাস), "tk" "ps" (টাকা, পয়সা).
- **lines** (angles_dots): { "kind": "lines", "a": 0, "b": 90, "cross": true } — two lines drawn (their directions in degrees, 0–179; "cross": false draws them apart, to picture them extended): the child says perpendicular (লম্ব), parallel (সমান্তরাল) or neither.
- **triangle** (angles_dots): { "kind": "triangle", "ask": "sides", "sides": [5, 5, 3] } or { "kind": "triangle", "ask": "angles", "angles": [60, 30, 90] } — a TRIANGLE drawn true to its sides (cm) or its angles (adding to 180): the child names it by its sides (সমবাহু, সমদ্বিবাহু, বিষমবাহু) or by its angles (সূক্ষ্মকোণী, সমকোণী, স্থূলকোণী).
- **angle** (angles_dots): { "kind": "angle", "deg": 45, "rot": 0, "ask": "name" } — an angle drawn (deg 5–180 in fives; rot turns the drawing): the child names it সূক্ষ্মকোণ, সমকোণ, স্থূলকোণ or সরল কোণ. Or { "kind": "angle", "ask": "make", "type": "acute" / "right" / "obtuse" / "straight" } — the child turns an arm to make that kind of angle. With a PROTRACTOR (চাঁদা): { "kind": "angle", "ask": "measure" / "draw", "deg": 50, "from": "right" / "left" } — read the size of the angle off a drawn protractor, or turn an arm to draw an angle of that size (whole degrees; "from": the side the first arm lies on along the base). The angle between the hands of a CLOCK: { "kind": "angle", "ask": "clock", "h": 4, "m": 30 } (m 0 or 30).
- **dots** (angles_dots): { "kind": "dots", "task": "rect" / "square" / "angle" / "complete", "w": 8, "h": 5, "type": "obtuse", "given": [[1, 0, 3, 1]] } — draw on a dot grid of w × h dots (w 3–10, h 3–7): a rectangle, a square, an angle of "type", or "complete" a square from the sides "given" (each [x1, y1, x2, y2], dots counted from the top left, from 0).
- **area** (angles_dots): { "kind": "area", "ask": "area" / "perimeter" / "both", "cells": [[1, 1], [2, 1], [1, 2]], "unit": "সেমি", "text": "the question as printed" } — a shape drawn on squared paper (ছক কাগজ): "cells" are its squares, each [across, down] counted from the top left square (0, 0), joined side to side, no hole, 1–48 squares; "area" = how many squares (ক্ষেত্রফল), "perimeter" = how many square sides all the way round it (পরিসীমা), "both" = the two. Or { "kind": "area", "ask": "make", "squares": 12, "rect": true, "perimeter": 14, "w": 10, "h": 6 } — the child shades a rectangle of that many squares (with that perimeter, only when the page asks one) on paper w × h squares (w 3–12, h 3–9); "rect": false for any shape of joined squares. "unit" only when the page says each square is 1 সেমি (or 1 মি).
- **mirror** (angles_dots): { "kind": "mirror", "line": "v" / "h", "w": 8, "h": 5, "cells": [[3, 0], [2, 1], [3, 1]] } — symmetry (প্রতিসাম্য, আয়নার খেলা): half a picture on squared paper w × h; "v" = the mirror line down the middle (w even, the half\'s squares in the left half), "h" = across the middle (h even, the half in the top half); the child shades the mirror image on the other side. "cells" = the given half\'s squares, [across, down] from the top left (0, 0).
- **coord** (angles_dots): { "kind": "coord", "ask": "read" / "plot", "x": 3, "y": 4, "size": 8, "emoji": "💎" } — a coordinate grid, the first quadrant from 0 to size (4–10; স্থানাঙ্ক, ক্রমজোড়): "read" = a point is marked, the child writes its ordered pair (x, y); "plot" = the child taps the point (x, y).
- **cubes** (angles_dots): { "kind": "cubes", "ask": "count", "l": 3, "w": 2, "h": 2, "unit": "সেমি" } — a box built of unit cubes (একক ঘনক; length l, width w, height h, 1–6 each): the child writes how many cubes (its volume, আয়তন); "unit" only when each cube is 1 সেমি (ঘনসেমি). Or { "kind": "cubes", "ask": "build", "volume": 24 } — the child builds a box of that many cubes by setting its length, width and height.
- **tally** (tally_chart): { "kind": "tally", "rows": [ { "name": "লাল", "emoji": "🔴", "value": 7 } ], "ask": "make" / "read" } — a tally table (ট্যালি চিহ্ন) of 2–6 rows (each 1–30, 60 in all): "make" = the child tallies cards one by one, then writes the numbers and the total; "read" = the tally marks are drawn, the child writes the numbers and the total. When the page\'s picture is too small to count, choose sensible numbers ("made": true).
- **spin** (tally_chart): { "kind": "spin", "parts": [1, 3], "spins": 20 } — probability (সম্ভাবনা) with a spinner of equal parts: "parts" = how many parts each colour has, in the order red, blue, green, yellow (2–4 colours, 1–6 parts each, 8 at most); the child spins it "spins" times (10–200) and writes each colour\'s expected count (spins × its parts ÷ all the parts, a whole number).
- **chart** (tally_chart): { "kind": "chart", "rows": [ { "name": "দৌড়", "emoji": "🏃", "value": 50 } ], "key": 10, "symbol": "dot" / "flower" / "star" / "box" / "hourglass" / "emoji" / "bar","dir": "h" / "v", "unit": "জন শিক্ষার্থী", "hideKey": false, "ask": "value" / "most" / "least" / "which" / "total" / "sum" / "diff" / "key" / "part" / "more" / "calc" / "table" / "make", "a": "row name", "b": "row name", "given": 30, "text": "the question exactly as printed", "sum": "#1 − 9" } — a pictograph (চিত্রলেখ) and ONE question about it (make one item per question, repeating the chart): "rows" 2–6, each "value" the row\'s REAL number, NEVER the count of its symbols: symbols × key (a half symbol = half the key, a 3-leaf flower of 4 = three quarters; when the page prints no key, work it out from the question that tells one row\'s real number: 8 cars drawn as 4 symbols → key 2, so a row of 7 symbols is 14); "key" = what one symbol stands for ("প্রতিটি ● = 10": 10; 1 when each symbol is one thing); "symbol": dot ●, flower ✿, star ★ ☆, box ▱, hourglass ⧗, or emoji (each row\'s own picture); "dir" "v" when the columns grow upward; "hideKey": true when the page gives no key. A BAR GRAPH (স্তম্ভলেখ: bars against a scale from 0) is the same item with "symbol": "bar": "key" is then the scale\'s step (what each line on the scale adds: 1, 2, 5, 10…), every value on a line or exactly halfway between two, at most 12 lines; not with "key", "part" or "more". Questions: "value" (row a), "most", "least", "which" (the row whose value is given), "total", "sum" (a + b), "diff" (a and b), "key" (the key hidden; the text tells row a\'s real count), "part" (what row a\'s part symbol stands for), "more" (row a becomes given: how many more symbols), "calc" (any other question: "text" and the "sum" that answers it with #1, #2… for the rows\' values in order), "table" (write every row\'s number), "make" (draw the pictograph from the numbers). "text" = the question as printed, its blanks (___ or □) left blank: NEVER write the answer into it.
- **path** (code_path): { "kind": "path", "w": 5, "h": 5, "start": [0, 4], "goal": [4, 0], "walls": [[1, 3, "tree"], [2, 2, "cow"]], "items": [[3, 1]], "ask": "build" / "fix" / "predict", "cmds": ["repeat", "pick", "if"], "code": "→ → ↑ 3(→ ↑)", "maxBlocks": 6, "goalIcon": "flag" / "school" / "home" / "star" } — a grid puzzle for the robot বিট্টু (Bittu): w × h squares (3–8 each), counted from the top left from 0 as [x, y]; "walls" the things in the way ([x, y] or [x, y, "tree" / "cow" / "water" / "rock" / "wall" / "house"]); "items" the mangoes (🥭) to pick up, at most 5. "build" = the child writes the code that takes Bittu to the goal; "fix" = "code" has a bug (a wrong card) to fix; "predict" = where does Bittu stop when "code" runs (no goal). "code" with ↑ ↓ ← →, P (pick a mango), ? (if a mango is here, pick it) and n(…) for repeat n times (one level). "cmds" = the cards beyond the arrows that the page uses (repeat, pick, if); "maxBlocks" only when the page limits the cards.
