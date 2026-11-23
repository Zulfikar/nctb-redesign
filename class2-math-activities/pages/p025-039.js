// pp.25–28 (জোড় ও বিজোড়) and pp.35–39 (ক্রমবাচক সংখ্যা): a game for each of these pages, which had none (3 Nov 2026).
// Every number is typed as the page prints it (ASCII digits); every answer is worked out below. Before build.js checks
// the activities its own way, each question here is checked once more: its right option is the only one that fits.
"use strict";

module.exports = (ctx) => {
  const { add, tool, wio, mcq, numQ, finishQuestions, pairs, groupsOf, toBn, show, calc, numIn, allNums, range, ORD, rng, shuffled, note } = ctx;
  const keyOf = (page, slug) => `m2-p${String(page).padStart(3, "0")}-${slug}`; // as build.js makes keys (the shuffle seed)
  const check = (ok, what) => { if (!ok) throw new Error(`pages/p025-039.js: ${what}`); };
  const sumBn = (parts) => show(parts.join("+")); // [2, 2, 1] → "২ + ২ + ১"
  // the right option fits, and no other one does
  const onlyOne = (q, fits, what) => {
    const ok = q.options.map((o) => !!fits(o));
    check(ok[q.answer] && ok.filter(Boolean).length === 1, `${what}: ${q.prompt}`);
    return q;
  };

  // ═════════════ p.25 ২টি করে নিয়ে গোল দাগ দিই: ১২টি নারিকেল (৭ + ৫), and the ▲'s ১৩টি (৭ + ৬) ═════════════
  const COCONUT_ROWS = [[7, 5], [7, 6]]; // the two pictures, their rows as printed
  // the tool shares the coconuts on plates; with half as many plates as coconuts each plate holds a ২ এর দল
  // (১২ is the first picture, ৬ the second picture's lower row; ৪, ৮ and ১০ are mine)
  tool({
    page: 25, slug: "groups-of-two", type: "equal_groups", title: "২টি করে দল: নারিকেল ভাগ করি",
    items: groupsOf([2, 3, 4, 5, 6].map((plates) => ["🥥", 2, plates])), fresh: {},
    notes: ["প্রতিটি থালায় ২টি করে নারিকেল হবে: ২টি করে নিয়ে তৈরি করা দল, ২ এর দল।"],
    src: "p.25 (১২টি নারিকেল: ৬টি থালায় ২টি করে; ৬: the ▲ picture's lower row); ৪, ৮, ১০ are new",
  });
  // one row of a picture taken alone (the rows as printed: ৭ and ৫, ৭ and ৬): how many groups, or how many left over
  const rowQ = (pic, where, m, ask) => {
    const g = Math.floor(m / 2), left = m % 2;
    const why = `${sumBn(Array(g).fill(2))} = ${toBn(2 * g)}: ${toBn(g)}টি দল${left ? `, ${toBn(left)}টি বাকি` : ", কোনোটি বাকি নেই"}।`;
    const prompt = `${pic} ${where} সারির ${toBn(m)}টি নারিকেল থেকে ২টি করে নিয়ে গোল দাগ দিলে`;
    return ask === "left"
      ? numQ({ prompt: `${prompt} কয়টি নারিকেল বাকি থাকে?`, expr: `${m}-${2 * g}`, unit: "টি", extra: [1 - left, 2], count: 2, why })
      : numQ({ prompt: `${prompt} কয়টি দল হয়?`, expr: String(2 * g), div: 2, unit: "টি দল", extra: [g - 1, g + 1], count: 2, why });
  };
  {
    const key = keyOf(25, "groups-left");
    const qs = [];
    // the rows alone (added to reach 10): the first picture's ৭ (left over) and ৫ (groups), the second picture's ৬ (groups)
    const ROW_QS = [[rowQ("প্রথম ছবির", "উপরের", COCONUT_ROWS[0][0], "left"), rowQ("প্রথম ছবির", "নিচের", COCONUT_ROWS[0][1], "groups")], [rowQ("দ্বিতীয় ছবির", "নিচের", COCONUT_ROWS[1][1], "groups")]];
    for (const [pi, rows] of COCONUT_ROWS.entries()) {
      const n = rows.reduce((s, x) => s + x, 0), g = Math.floor(n / 2), left = n % 2;
      qs.push(numQ({ prompt: `ছবিতে উপরের সারিতে ${toBn(rows[0])}টি ও নিচের সারিতে ${toBn(rows[1])}টি নারিকেল আছে। মোট কয়টি নারিকেল?`, expr: rows.join("+"), unit: "টি", extra: [n - 1, n + 1], count: 2 }));
      qs.push(numQ({
        prompt: `${toBn(n)}টি নারিকেল থেকে ২টি করে নিয়ে গোল দাগ দিলে কয়টি দল হয়?`, expr: String(2 * g), div: 2, unit: "টি দল", extra: [g - 1, g + 1], count: 2,
        why: `${sumBn(Array(g).fill(2))} = ${toBn(2 * g)}: ২টি করে ${toBn(g)}টি দল${left ? `, আর ${toBn(left)}টি বাকি` : ""}।`,
      }));
      // can every coconut go into a ২ এর দল? (the options: 0, 1 or 2 left over)
      const opts = ["হ্যাঁ, কোনোটি বাকি থাকে না", "না, ১টি বাকি থাকে", "না, ২টি বাকি থাকে"];
      const q = mcq({
        prompt: `${toBn(n)}টি নারিকেলের সবগুলো কি ২টি করে দলে রাখা যায়?`, answer: opts[left], others: opts.filter((_, i) => i !== left),
        why: `${toBn(n)}টি নারিকেলে ২টি করে ${toBn(g)}টি দল হয়, ${left ? `${toBn(left)}টি বাকি থাকে` : "কোনোটি বাকি থাকে না"}।`,
      });
      qs.push(onlyOne(q, (o) => (o.startsWith("হ্যাঁ") ? 0 : numIn(o)) === n - 2 * g, "p.25 left over"));
      qs.push(...ROW_QS[pi]);
    }
    qs.push(mcq({ prompt: "২টি করে নিয়ে তৈরি করা দলকে কী বলে?", answer: "২ এর দল", others: ["৩ এর দল", "১০ এর দল"], why: "২টি করে নিয়ে তৈরি করা দলকে ২ এর দল বলা যায়।" }));
    add({ page: 25, slug: "groups-left", type: "mcq", title: "২টি করে দল: কয়টি দল, কয়টি বাকি?", content: finishQuestions(key, qs), src: "p.25 (১২টি নারিকেল, ৭ + ৫) and its ▲ (১৩টি, ৭ + ৬); the dialogue (২ এর দল)" });
  }

  // ═════════════ p.26 জোড় ও বিজোড় এর ধারণা: the table, its “কয়টি” column checked against our wording ═════════════
  const pairsText = (n, thing) => `${toBn(Math.floor(n / 2))} জোড়া${n % 2 ? ` ও ${toBn(n % 2)}টি` : ""} ${thing}`;
  const kindOf = (n) => (n % 2 ? "বিজোড়" : "জোড়");
  const PAIR_TABLE = [ // [thing, how many, the “কয়টি” column, the last column], as printed (blue table, then pink)
    ["কানের দুল", 2, "১ জোড়া কানের দুল", "জোড়"], ["কবুতর", 2, "১ জোড়া কবুতর", "জোড়"], ["নারিকেল", 2, "১ জোড়া নারিকেল", "জোড়"],
    ["মোজা", 2, "১ জোড়া মোজা", "জোড়"], ["ব্লক", 2, "১ জোড়া ব্লক", "জোড়"],
    ["কানের দুল", 3, "১ জোড়া ও ১টি কানের দুল", "বিজোড়"], ["কবুতর", 4, "২ জোড়া কবুতর", "জোড়"], ["নারিকেল", 5, "২ জোড়া ও ১টি নারিকেল", "বিজোড়"],
    ["মোজা", 6, "৩ জোড়া মোজা", "জোড়"], ["ব্লক", 7, "৩ জোড়া ও ১টি ব্লক", "বিজোড়"],
  ];
  for (const [thing, n, printed, label] of PAIR_TABLE) check(pairsText(n, thing) === printed.normalize("NFC") && kindOf(n) === label.normalize("NFC"), `p.26 table ${n} ${thing}`);
  const inTable = (n, thing) => PAIR_TABLE.some((r) => r[0] === thing && r[1] === n);
  const pairWhy = (n, thing) => `${toBn(n)}টি ${thing} = ${pairsText(n, thing)}: ${n % 2 ? "১টি বাকি থাকে, তাই বিজোড়" : "কোনোটি বাকি থাকে না, তাই জোড়"}।`;
  {
    const key = keyOf(26, "how-many-pairs");
    // কয় জোড়া? (the wrong options: one fewer or one more thing, said the same way)
    const pairQ = (thing, n) => {
      check(inTable(n, thing), `p.26 ${n} ${thing} isn't in the table`);
      const near = [n - 1, n + 1, n + 2].filter((m) => m >= 2).slice(0, 2);
      const q = mcq({ prompt: `${toBn(n)}টি ${thing} থেকে কয় জোড়া হয়?`, answer: pairsText(n, thing), others: near.map((m) => pairsText(m, thing)), why: pairWhy(n, thing) });
      return onlyOne(q, (o) => { const [p, l = 0] = allNums(o); return 2 * p + l === n; }, "p.26 pairs");
    };
    // কোনটি জোড়? / কোনটি বিজোড়? (three rows of the table)
    const kindQ = (want, list) => {
      list.forEach(([n, thing]) => check(inTable(n, thing), `p.26 ${n} ${thing} isn't in the table`));
      const right = list.filter(([n]) => kindOf(n) === want);
      check(right.length === 1 && new Set(list.map(([n]) => n)).size === list.length, `p.26 কোনটি ${want}`);
      const [n, thing] = right[0];
      return mcq({ prompt: `কোনটি ${want}?`, answer: `${toBn(n)}টি ${thing}`, others: list.filter((x) => x !== right[0]).map(([m, t]) => `${toBn(m)}টি ${t}`), why: pairWhy(n, thing), v: { expr: String(n), div: 1 } });
    };
    const qs = [
      pairQ("কবুতর", 2), pairQ("কানের দুল", 3), pairQ("কবুতর", 4), pairQ("নারিকেল", 5), pairQ("মোজা", 6), pairQ("ব্লক", 7),
      kindQ("বিজোড়", [[3, "কানের দুল"], [4, "কবুতর"], [6, "মোজা"]]), kindQ("জোড়", [[5, "নারিকেল"], [4, "কবুতর"], [7, "ব্লক"]]),
      kindQ("বিজোড়", [[2, "ব্লক"], [7, "ব্লক"], [6, "মোজা"]]), kindQ("জোড়", [[6, "মোজা"], [3, "কানের দুল"], [5, "নারিকেল"]]),
    ];
    add({ page: 26, slug: "how-many-pairs", type: "mcq", title: "কয় জোড়া? জোড় ও বিজোড়", content: finishQuestions(key, qs), src: "p.26 table (কানের দুল ২, ৩; কবুতর ২, ৪; নারিকেল ৫; মোজা ৬; ব্লক ২, ৭)" });
  }

  // ═════════════ p.27 জোড় ও বিজোড় সংখ্যা শনাক্ত করি: each number's blocks split into pairs (৫ → ২ + ২ + ১) ═════════════
  // (a match holds at most 8 pairs, under the 10 questions every game needs, so the splits ৩–১০ are asked as multiple choice)
  const asPairs = (n) => [...Array(Math.floor(n / 2)).fill(2), ...(n % 2 ? [1] : [])];
  {
    const key = keyOf(27, "pairs-make");
    const pairWord = (n) => `${toBn(Math.floor(n / 2))} জোড়া${n % 2 ? ` ও ${toBn(n % 2)}টি` : ""}`;
    const splitWhy = (n) => `${toBn(n)} = ${sumBn(asPairs(n))}: ${pairWord(n)}, ${n % 2 ? "১টি বাকি থাকে" : "কোনোটি বাকি থাকে না"}।`;
    // the page's pictures (৩–৬ blocks): which split is it? (the others: the splits of the numbers beside it)
    const splitQ = (n) => {
      const near = [n - 1, n + 1, n + 2].filter((m) => m >= 3).slice(0, 2);
      return mcq({ prompt: `${toBn(n)}টি ব্লক জোড়ায় জোড়ায় ভাগ করলে কোনটি হয়?`, answer: sumBn(asPairs(n)), others: near.map((m) => sumBn(asPairs(m))), why: splitWhy(n), v: { product: n } });
    };
    // its ■ “এভাবে আর কোন কোন সংখ্যা তৈরি করা যায়?” (৭–১০), and the table's two rows, one number further
    const blocksOf = (n) => numQ({ prompt: `${pairWord(n)} ব্লক মিলে কয়টি ব্লক?`, expr: asPairs(n).join("+"), unit: "টি", extra: [n - 1, n + 1], count: 2 });
    const EVEN_ROW = [2, 4, 6, 8], ODD_ROW = [1, 3, 5, 7, 9]; // the table, as printed
    const rowNext = (label, row) => {
      const step = row[1] - row[0], last = row[row.length - 1];
      check(row.every((x, i) => !i || x - row[i - 1] === step) && row.every((x) => x % 2 === row[0] % 2), `p.27 row ${row}`);
      return numQ({ prompt: `${label}: ${row.map(toBn).join(", ")}, ☐। খালি ঘরে কোন সংখ্যা বসবে?`, expr: `${last}+${step}`, extra: [last + 1, last + 3], count: 2, why: `প্রতিবার ২ করে বাড়ছে: ${toBn(last)} + ২ = ${toBn(last + step)}` });
    };
    const qs = [
      splitQ(3), splitQ(4), splitQ(5), splitQ(6),
      blocksOf(7), blocksOf(8),
      numQ({ prompt: "৯টি ব্লক জোড়ায় জোড়ায় সাজালে কয়টি ব্লক বাকি থাকে?", expr: `9-${2 * Math.floor(9 / 2)}`, unit: "টি", extra: [0, 2], count: 2, why: splitWhy(9) }),
      numQ({ prompt: "১০টি ব্লক দিয়ে কয় জোড়া হয়?", expr: "10", div: 2, unit: " জোড়া", extra: [4, 6], count: 2, why: splitWhy(10) }),
      rowNext("যেসব সংখ্যা জোড়া তৈরি করে", EVEN_ROW), rowNext("যেসব সংখ্যা জোড়া তৈরি করে না", ODD_ROW),
    ];
    add({
      page: 27, slug: "pairs-make", type: "mcq", title: "জোড়া দিয়ে সংখ্যা তৈরি করি", content: finishQuestions(key, qs),
      notes: ["প্রতিটি ২ একটি জোড়া। জোড়া তৈরির পরে ১টি বাকি থাকলে (+ ১) সংখ্যাটি বিজোড়; কিছু বাকি না থাকলে জোড়।"],
      src: "p.27 (৩–৬টি ব্লক জোড়ায় ভাগ), its ■ (আর কোন কোন সংখ্যা: ৭–১০) and its table (২, ৪, ৬, ৮, … / ১, ৩, ৫, ৭, ৯, …)",
    });
  }

  // ═════════════ p.28 ১ থেকে ৫০: জোড় সংখ্যার শেষে ২, ৪, ৬, ৮ বা ০; বিজোড় সংখ্যার শেষে ১, ৩, ৫, ৭ বা ৯ ═════════════
  {
    const key = keyOf(28, "last-digit");
    const EVEN_ENDS = [2, 4, 6, 8, 0], ODD_ENDS = [1, 3, 5, 7, 9]; // as the page says them
    check(range(1, 50).every((n) => EVEN_ENDS.includes(n % 10) === (n % 2 === 0) && ODD_ENDS.includes(n % 10) === (n % 2 === 1)), "p.28 rule");
    const ends = (list) => `${list.slice(0, -1).map(toBn).join(", ")} বা ${toBn(list[list.length - 1])}`;
    const ANY = "যেকোনো অঙ্ক";
    // which one is even (want 0) or odd (want 1)? the options share their tens, so only the last digit decides
    const parityQ = (want, nums, ring) => {
      const right = nums.filter((n) => n % 2 === want);
      check(right.length === 1 && nums.every((n) => n >= 1 && n <= 50) && new Set(nums.map((n) => Math.floor(n / 10))).size === 1, `p.28 ${nums}`);
      const n = right[0], kind = want ? "বিজোড়" : "জোড়";
      const prompt = ring == null ? `কোনটি ${kind} সংখ্যা?` : `১ থেকে ৫০ এর ছকে কোন সংখ্যায় গোল দাগ ${ring ? "আছে" : "নেই"}?`;
      if (ring != null) check(ring === !want, "p.28 ring");
      const tail = ring == null ? "" : ring ? ", তাই গোল দাগ আছে" : ", তাই গোল দাগ নেই";
      return mcq({ prompt, answer: toBn(n), others: nums.filter((m) => m !== n).map(toBn), why: `${toBn(n)} এর শেষে ${toBn(n % 10)} আছে: ${toBn(n)} ${kind} সংখ্যা${tail}।`, v: { expr: String(n), div: 1 } });
    };
    const evens10 = range(1, 10).filter((n) => n % 2 === 0);
    const qs = [
      mcq({ prompt: "জোড় সংখ্যার শেষে কোন অঙ্কগুলো থাকে?", answer: ends(EVEN_ENDS), others: [ends(ODD_ENDS), ANY], why: `জোড় সংখ্যার শেষে ${ends(EVEN_ENDS)} আছে।` }),
      mcq({ prompt: "বিজোড় সংখ্যার শেষে কোন অঙ্কগুলো থাকে?", answer: ends(ODD_ENDS), others: [ends(EVEN_ENDS), ANY], why: `বিজোড় সংখ্যার শেষে ${ends(ODD_ENDS)} আছে।` }),
      numQ({ prompt: "১ থেকে ১০ পর্যন্ত কয়টি জোড় সংখ্যা আছে?", expr: String(evens10.length), unit: "টি", extra: [evens10.length - 1, evens10.length + 1], count: 2, why: `${evens10.map(toBn).join(", ")}: ${toBn(evens10.length)}টি জোড় সংখ্যা।` }),
      parityQ(0, [34, 35, 37]), parityQ(1, [26, 29, 20]), parityQ(0, [41, 43, 48]), parityQ(1, [12, 14, 17]), parityQ(0, [30, 33, 39]),
      parityQ(0, [21, 22, 25], true), parityQ(1, [44, 45, 46], false),
    ];
    add({ page: 28, slug: "last-digit", type: "mcq", title: "শেষের অঙ্ক দেখে জোড়-বিজোড় চিনি", content: finishQuestions(key, qs), src: "p.28 (the ১–৫০ chart, its rings, and the rule: শেষে ২, ৪, ৬, ৮ বা ০ / ১, ৩, ৫, ৭ বা ৯)" });
  }

  // ═════════════ ক্রমবাচক সংখ্যা (pp.35–39) ═════════════
  // a line's n-th from one side; who is where (options: others of the line) and where is who (options: the ordinals beside)
  const posQ = (intro, line, side, fromEnd, nth, r, who = "কে") => {
    const seq = fromEnd ? line.slice().reverse() : line;
    const ans = seq[nth - 1];
    const q = mcq({ prompt: `${intro} ${side} থেকে ${who} ${ORD[nth - 1]}?`, answer: ans, others: shuffled(line.filter((x) => x !== ans), r).slice(0, 3), why: `${side} থেকে গুনলে ${ORD[nth - 1]} হলো ${ans}।` });
    return onlyOne(q, (o) => seq.indexOf(o) === nth - 1, "posQ");
  };
  const ordQ = (prompt, i, size, why) => { // the answer ORD[i] (0-based) in a line of size; the others are its neighbours
    const others = [i - 1, i + 1, i - 2, i + 2].filter((j) => j >= 0 && j < size).slice(0, 2).map((j) => ORD[j]);
    return mcq({ prompt, answer: ORD[i], others, why });
  };
  const placeQ = (intro, line, who, side, fromEnd) => {
    const seq = fromEnd ? line.slice().reverse() : line;
    const i = seq.indexOf(who);
    check(i >= 0, `placeQ ${who}`);
    return ordQ(`${intro} ${side} থেকে ${who} কততম?`, i, line.length, `${side} থেকে গুনলে ${who} ${ORD[i]}।`);
  };
  const CARDINAL = { 4: "চার", 7: "সাত" }; // the pages' words: “চার জন” (p.35), “সাত জন” (p.38)

  // ── p.35 ■২ the fruits (left → right, named as in the p.37 game), ▲২ five holding hands, ■৩ আলী ──
  {
    const key = keyOf(35, "left-right");
    const r = rng(`${key}#others`);
    const FRUITS = ["আনারস", "আপেল", "আঙুর", "কলা", "তরমুজ"];
    const fIntro = `বাম থেকে ডানে আছে: ${FRUITS.join(", ")}।`;
    const HANDS = 5, FOUR = 4; // ▲২: পাঁচজন শিক্ষার্থী; “বাম থেকে চার জন” and “বাম থেকে চতুর্থ জন”
    const hIntro = "পাঁচজন শিক্ষার্থী হাতে হাত ধরে আছে।";
    const KIDS = 5, ALI_RIGHT = 3; // ■৩: ৫ জন শিশু; আলীর ডানদিকে ৩ জন
    const aliFromLeft = KIDS - ALI_RIGHT, aliFromRight = ALI_RIGHT + 1;
    check(aliFromLeft === 2, "p.35 আলী দ্বিতীয় আসনে (the page's first clue)");
    const aIntro = `${toBn(KIDS)} জন শিশু পাশাপাশি বসে আছে। আলীর ডানদিকে ${toBn(ALI_RIGHT)} জন শিশু আছে।`;
    const qs = [
      posQ(fIntro, FRUITS, "বাম", false, 3, r, "কোনটি"), posQ(fIntro, FRUITS, "ডান", true, 2, r, "কোনটি"),
      placeQ(fIntro, FRUITS, "আপেল", "বাম", false), placeQ(fIntro, FRUITS, "আনারস", "ডান", true), placeQ(fIntro, FRUITS, "তরমুজ", "ডান", true),
      numQ({ prompt: `${hIntro} বাম থেকে ${CARDINAL[FOUR]} জনকে গোল দাগের মধ্যে রাখলে দাগের মধ্যে কতজন থাকে?`, expr: String(FOUR), unit: " জন", extra: [1, HANDS], count: 2, why: `${CARDINAL[FOUR]} জন মানে ${toBn(FOUR)} জন: বাম থেকে ${range(0, FOUR - 1).map((i) => ORD[i]).join(", ")} জন।` }),
      numQ({ prompt: `${hIntro} বাম থেকে ${ORD[FOUR - 1]} জনকে গোল দাগের মধ্যে রাখলে দাগের মধ্যে কতজন থাকে?`, expr: "1", unit: " জন", extra: [FOUR, FOUR - 1], count: 2, why: `${ORD[FOUR - 1]} জন মানে একজন: বাম থেকে গুনলে ${toBn(FOUR)} নম্বর জন।` }),
      ordQ(`${hIntro} বাম থেকে ${ORD[FOUR - 1]} জন ডান থেকে কততম?`, HANDS - FOUR, HANDS, `${toBn(HANDS)} জনের মধ্যে তার ডানদিকে ${toBn(HANDS - FOUR)} জন: ডান থেকে ${ORD[HANDS - FOUR]}।`),
      ordQ(`${aIntro} আলী বাম থেকে কততম আসনে বসেছে?`, aliFromLeft - 1, KIDS, `${toBn(KIDS)} − ${toBn(ALI_RIGHT)} = ${toBn(aliFromLeft)}: আলী বাম থেকে ${ORD[aliFromLeft - 1]}।`),
      ordQ(`${aIntro} আলী ডান থেকে কততম?`, aliFromRight - 1, KIDS, `ডানদিকে ${toBn(ALI_RIGHT)} জন, তারপর আলী: ${toBn(ALI_RIGHT)} + ১ = ${toBn(aliFromRight)}, তাই ডান থেকে ${ORD[aliFromRight - 1]}।`),
    ];
    add({ page: 35, slug: "left-right", type: "mcq", title: "বাম থেকে, ডান থেকে: কততম?", content: finishQuestions(key, qs), src: "p.35 ■২ (ফল), ▲২ (বাম থেকে চার জন / চতুর্থ জন), ■৩ (আলী)" });
  }

  // ── pp.36 and 39: the line stories, as printed (the numbers in them are the ordinal words and the counts) ──
  const STORY = {
    sabita: { text: "কয়েকজন শিশু লাইনে দাঁড়িয়ে আছে। সবিতা সামনে থেকে দ্বিতীয় এবং তার পিছনে আরও ৫ জন শিশু আছে।", ask: "লাইনে কতজন শিশু আছে?", ord: [2], count: 5 }, // p.36 ▲৩
    raju: { text: "কয়েকজন শিশু লাইনে দাঁড়িয়ে আছে। রাজু সামনে থেকে তৃতীয় এবং পিছন থেকে পঞ্চম।", ask: "লাইনে কতজন শিশু আছে?", ord: [3, 5] }, // p.36 ▲৪
    tamim: { text: "তামিম তার পরিবারে বয়সে ছোটো থেকে তৃতীয় এবং বড়ো থেকে চতুর্থ সদস্য।", ask: "তার পরিবারের সদস্য সংখ্যা কত?", ord: [3, 4] }, // p.36 ■৪
    milton: { text: "একটি লাইনে মিল্টন হচ্ছে পিছন থেকে অষ্টম এবং মিল্টনের সামনে আরও ৫ জন শিক্ষার্থী আছে।", ask: "লাইনে কতজন শিক্ষার্থী আছে?", ord: [8], count: 5 }, // p.39 ▲৭
    raju2: { text: "একটি লাইনে রাজু হচ্ছে সামনে থেকে ষষ্ঠ এবং পিছন থেকে তৃতীয়।", ask: "সেখানে কতজন শিশু আছে?", ord: [6, 3] }, // p.39 ■৫ (its “চিত্র একে সমাধান করি” left out)
    // new, in the same words (added to reach 10): the book's মিনা, তুলি and আলী, with new places
    mina: { text: "কয়েকজন শিশু লাইনে দাঁড়িয়ে আছে। মিনা সামনে থেকে চতুর্থ এবং তার পিছনে আরও ৬ জন শিশু আছে।", ask: "লাইনে কতজন শিশু আছে?", ord: [4], count: 6 },
    tuli: { text: "একটি লাইনে তুলি হচ্ছে সামনে থেকে পঞ্চম এবং পিছন থেকে চতুর্থ।", ask: "লাইনে কতজন শিশু আছে?", ord: [5, 4] },
    ali: { text: "একটি লাইনে আলী হচ্ছে পিছন থেকে নবম এবং আলীর সামনে আরও ২ জন শিক্ষার্থী আছে।", ask: "লাইনে কতজন শিক্ষার্থী আছে?", ord: [9], count: 2 },
  };
  for (const [k, s] of Object.entries(STORY)) {
    // each ordinal is in the text, in that order; the count is the only number printed
    const at = s.ord.map((n) => s.text.indexOf(ORD[n - 1]));
    check(at.every((i) => i >= 0) && at.every((i, j) => !j || i > at[j - 1]), `story ${k}: ordinals`);
    check(JSON.stringify(allNums(s.text)) === JSON.stringify(s.count == null ? [] : [s.count]), `story ${k}: count`);
  }
  // the whole line: one ordinal and so many more (a + b), or the same one counted from both ends (a + b − 1)
  const lineSum = (s) => (s.count != null ? `${s.ord[0]} + ${s.count}` : `${s.ord[0]} + ${s.ord[1]} − 1`);

  // ── p.36 ▲৩ সবিতা, ▲৪ রাজু, ■৪ তামিম: who is in front and behind, and how the whole line is counted ──
  {
    const key = keyOf(36, "in-front-behind");
    const S = STORY.sabita, R = STORY.raju, T = STORY.tamim;
    const sTotal = calc(lineSum(S)), rTotal = calc(lineSum(R)), tTotal = calc(lineSum(T));
    const eqOpt = (expr) => `${show(expr)} = ${toBn(calc(expr))}`; // a true sum, “২ + ৫ = ৭”
    const howQ = (intro, total, right, wrong, why) => onlyOne(
      mcq({ prompt: `${intro} শিশুর সংখ্যা কীভাবে হিসাব করবে?`, answer: eqOpt(right), others: wrong.map(eqOpt), why }),
      (o) => calc(o.split("=")[1]) === total, "p.36 how",
    );
    const [rFront, rBack] = R.ord, [tYoung, tOld] = T.ord;
    const rAhead = rFront - 1, rBehind = rBack - 1, tYounger = tYoung - 1, tOlder = tOld - 1;
    check(rAhead + 1 + rBehind === rTotal && tYounger + 1 + tOlder === tTotal, "p.36 totals");
    const qs = [
      numQ({ prompt: `${S.text} সবিতার সামনে কতজন শিশু আছে?`, expr: `${S.ord[0]}-1`, unit: " জন", extra: [S.ord[0], S.count], count: 2, why: `সবিতা সামনে থেকে ${ORD[S.ord[0] - 1]}: তার সামনে ${toBn(S.ord[0])} − ১ = ${toBn(S.ord[0] - 1)} জন।` }),
      ordQ(`${S.text} সবিতা পিছন থেকে কততম?`, S.count, sTotal,`সবিতার পিছনে ${toBn(S.count)} জন, তারপর সবিতা: ${toBn(S.count)} + ১ = ${toBn(S.count + 1)}, তাই পিছন থেকে ${ORD[S.count]}।`),
      howQ(S.text, sTotal, `${S.ord[0]}+${S.count}`, [`${S.ord[0] - 1}+${S.count}`, `${S.count}-${S.ord[0]}`], `সামনে থেকে সবিতা পর্যন্ত ${toBn(S.ord[0])} জন, তার পিছনে আরও ${toBn(S.count)} জন: ${eqOpt(`${S.ord[0]}+${S.count}`)} জন।`),
      numQ({ prompt: `${R.text} রাজুর সামনে কতজন শিশু আছে?`, expr: `${rFront}-1`, unit: " জন", extra: [rFront, rBehind], count: 2, why: `রাজু সামনে থেকে ${ORD[rFront - 1]}: তার সামনে ${toBn(rFront)} − ১ = ${toBn(rAhead)} জন।` }),
      numQ({ prompt: `${R.text} রাজুর পিছনে কতজন শিশু আছে?`, expr: `${rBack}-1`, unit: " জন", extra: [rBack, rAhead], count: 2, why: `রাজু পিছন থেকে ${ORD[rBack - 1]}: তার পিছনে ${toBn(rBack)} − ১ = ${toBn(rBehind)} জন।` }),
      howQ(R.text, rTotal, `${rAhead}+1+${rBehind}`, [`${rFront}+${rBack}`, `${rAhead}+${rBehind}`], `রাজুর সামনে ${toBn(rAhead)} জন, রাজু ১ জন, পিছনে ${toBn(rBehind)} জন: ${eqOpt(`${rAhead}+1+${rBehind}`)}। ${show(`${rFront}+${rBack}`)} করলে রাজুকে দুবার গোনা হয়।`),
      numQ({ prompt: `${T.text} তামিমের চেয়ে বয়সে ছোটো কতজন?`, expr: `${tYoung}-1`, unit: " জন", extra: [tYoung, tOlder + 1], count: 2, why: `তামিম ছোটো থেকে ${ORD[tYoung - 1]}: তার চেয়ে ছোটো ${toBn(tYoung)} − ১ = ${toBn(tYounger)} জন।` }),
      numQ({ prompt: `${T.text} তামিমের চেয়ে বয়সে বড়ো কতজন?`, expr: `${tOld}-1`, unit: " জন", extra: [tOld, tYounger], count: 2, why: `তামিম বড়ো থেকে ${ORD[tOld - 1]}: তার চেয়ে বড়ো ${toBn(tOld)} − ১ = ${toBn(tOlder)} জন।` }),
      // (added to reach 10) the page's point: counted from both ends, the one in the middle is counted twice
      mcq({ prompt: `${T.text} ${show(`${tYoung}+${tOld}`)} = ${toBn(tYoung + tOld)} করলে কাকে দুবার গোনা হয়?`, answer: "তামিমকে", others: ["সবচেয়ে ছোটো সদস্যকে", "সবচেয়ে বড়ো সদস্যকে"], why: `ছোটো থেকে ${ORD[tYoung - 1]} গুনতেও তামিম, বড়ো থেকে ${ORD[tOld - 1]} গুনতেও তামিম: তাই ${show(`${tYoung}+${tOld}-1`)} = ${toBn(tTotal)}।` }),
      numQ({ prompt: `${T.text} ${T.ask}`, expr: `${tYoung}+${tOld}-1`, unit: " জন", extra: [`${tYoung}+${tOld}`, tTotal - 1], count: 2, why: `ছোটো ${toBn(tYounger)} জন, তামিম ১ জন, বড়ো ${toBn(tOlder)} জন: ${eqOpt(`${tYounger}+1+${tOlder}`)} জন।` }),
    ];
    add({ page: 36, slug: "in-front-behind", type: "mcq", title: "সামনে, পিছনে ও মোট কতজন?", content: finishQuestions(key, qs), src: "p.36 ▲৩ (সবিতা), ▲৪ (রাজু), ■৪ (তামিম)" });
  }

  // ── p.38 ▲৬ ডানদিক থেকে সাত জন / সপ্তম জন: the ten children are p.37's line (the same pictures), পিছন on the left ──
  {
    const key = keyOf(38, "seven-seventh");
    const FRONT_TO_BACK = ["নাসিমা", "আলী", "সবিতা", "ডেভিড", "তামিম", "আব্দুর রহিম", "আব্দুল করিম", "আলেয়া", "রতন", "জারিয়া"]; // p.37 (as in the p.37 game)
    const FROM_RIGHT = FRONT_TO_BACK, LEFT_TO_RIGHT = FRONT_TO_BACK.slice().reverse(); // p.38: সামনে (নাসিমা) is on the right
    const N = FROM_RIGHT.length, K = 7;
    const intro = `লাইনে ${toBn(N)} জন শিশু দাঁড়িয়ে আছে।`;
    const nIntro = `বাম থেকে ডানে আছে: ${LEFT_TO_RIGHT.join(", ")}।`;
    const seventh = FROM_RIGHT[K - 1], inside = FROM_RIGHT.slice(0, K), outside = FROM_RIGHT.slice(K);
    const r = rng(`${key}#others`);
    const DIFF = ["না: সাতজন হলো ৭ জন, সপ্তম জন হলো ১ জন", "হ্যাঁ, দুটি একই", "না: সাতজন হলো ১ জন, সপ্তম জন হলো ৭ জন"];
    const qs = [
      numQ({ prompt: `${intro} ডানদিক থেকে ${CARDINAL[K]} জনকে গোল দাগের মধ্যে রাখলে দাগের মধ্যে কতজন থাকে?`, expr: String(K), unit: " জন", extra: [1, N - K], count: 2, why: `${CARDINAL[K]} জন মানে ${toBn(K)} জন: ডানদিক থেকে প্রথম থেকে ${ORD[K - 1]} পর্যন্ত সবাই।` }),
      numQ({ prompt: `${intro} ডানদিক থেকে ${ORD[K - 1]} জনকে গোল দাগের মধ্যে রাখলে দাগের মধ্যে কতজন থাকে?`, expr: "1", unit: " জন", extra: [K, K - 1], count: 2, why: `${ORD[K - 1]} জন মানে একজন: ডানদিক থেকে গুনলে ${toBn(K)} নম্বর জন।` }),
      numQ({ prompt: `${intro} ডানদিক থেকে ${CARDINAL[K]} জনকে গোল দাগের মধ্যে রাখলে দাগের বাইরে কতজন থাকে?`, expr: `${N}-${K}`, unit: " জন", extra: [K, N - K + 1], count: 2, why: `${show(`${N}-${K}`)} = ${toBn(N - K)} জন দাগের বাইরে থাকে।` }),
      // (the tempting wrong answer: সপ্তম again)
      mcq({ prompt: `${intro} ডানদিক থেকে ${ORD[K - 1]} জন বামদিক থেকে কততম?`, answer: ORD[N - K], others: [ORD[N - K - 1], ORD[K - 1]], why: `তার বামদিকে ${toBn(N)} − ${toBn(K)} = ${toBn(N - K)} জন, তারপর সে: বামদিক থেকে ${ORD[N - K]}।` }),
      numQ({ prompt: `${intro} ডানদিক থেকে ${ORD[K - 1]} জনের ডানদিকে কতজন শিশু আছে?`, expr: `${K}-1`, unit: " জন", extra: [K, N - K], count: 2, why: `${ORD[K - 1]} জনকে বাদ দিয়ে তার ডানদিকে আছে ${toBn(K)} − ১ = ${toBn(K - 1)} জন।` }),
      // (added to reach 10) the seventh is the last one of the seven
      mcq({ prompt: `${intro} ডানদিক থেকে ${CARDINAL[K]} জনকে গোল দাগের মধ্যে রাখলে দাগের মধ্যে সবচেয়ে বামের জন ডানদিক থেকে কততম?`, answer: ORD[K - 1], others: [ORD[K - 2], ORD[K]], why: `${CARDINAL[K]} জনের শেষ জনই ডানদিক থেকে ${ORD[K - 1]} জন।` }),
      mcq({ prompt: "সাতজন এবং সপ্তম জন কি একই?", answer: DIFF[0], others: DIFF.slice(1), why: "মনে রাখবে, সাতজন এবং সপ্তম জন হচ্ছে ভিন্ন।" }),
      onlyOne(mcq({ prompt: `${nIntro} ডানদিক থেকে ${ORD[K - 1]} জন কে?`, answer: seventh, others: [LEFT_TO_RIGHT[K - 1], FROM_RIGHT[K - 2], FROM_RIGHT[K]], why: `ডানদিক থেকে গুনি: ${inside.join(", ")}। ${ORD[K - 1]} জন ${seventh}।` }), (o) => FROM_RIGHT.indexOf(o) === K - 1, "p.38 seventh"),
      // (added to reach 10) the same count from the other side gives another child
      onlyOne(mcq({ prompt: `${nIntro} বামদিক থেকে ${ORD[K - 1]} জন কে?`, answer: LEFT_TO_RIGHT[K - 1], others: [seventh, LEFT_TO_RIGHT[K - 2], LEFT_TO_RIGHT[K]], why: `বামদিক থেকে গুনি: ${LEFT_TO_RIGHT.slice(0, K).join(", ")}। ${ORD[K - 1]} জন ${LEFT_TO_RIGHT[K - 1]}।` }), (o) => LEFT_TO_RIGHT.indexOf(o) === K - 1, "p.38 seventh from the left"),
      onlyOne(mcq({ prompt: `${nIntro} ডানদিক থেকে ${CARDINAL[K]} জনকে গোল দাগের মধ্যে রাখলে কে দাগের বাইরে থাকে?`, answer: outside[0], others: [seventh, shuffled(inside.slice(0, K - 1), r)[0]], why: `ডানদিক থেকে ${CARDINAL[K]} জন: ${inside.join(", ")}। ${outside[0]} তাদের পরে, দাগের বাইরে।` }), (o) => outside.includes(o), "p.38 outside"),
    ];
    // the book's ring (p.38): the beige-shirted boy, the 4th from the left
    check(LEFT_TO_RIGHT.indexOf(seventh) === 3 && seventh === "আব্দুল করিম", "p.38 the ringed child");
    add({
      page: 38, slug: "seven-seventh", type: "mcq", title: "সাতজন না সপ্তম জন?", content: finishQuestions(key, qs), src: "p.38 ▲৬ (ডানদিক থেকে সাত জন / সপ্তম জন); the names are p.37's line",
      notes: ["পৃষ্ঠা ৩৮ এর ১০ জন শিশু পৃষ্ঠা ৩৭ এর লাইনের শিশু: বাম দিকে পিছনের জারিয়া, ডান দিকে সামনের নাসিমা।"],
    });
  }

  // ── p.39 লাইনে কতজন? the chapter's line stories (p.36 ▲৩, ▲৪, ■৪; p.39 ▲৭, ■৫), worked out on the keypad ──
  wio({
    page: 39, slug: "line-count", title: "লাইনে কতজন? হিসাব করি",
    items: [
      ...["sabita", "raju", "tamim", "milton", "raju2"].map((k) => ({ kind: "word", text: `${STORY[k].text} ${STORY[k].ask}`, sum: lineSum(STORY[k]), unit: "জন" })),
      // p.39's two stories asked once more: who is behind মিল্টন, who is in front of রাজু (the one himself not counted)
      { kind: "word", text: `${STORY.milton.text} মিল্টনের পিছনে কতজন শিক্ষার্থী আছে?`, sum: `${STORY.milton.ord[0]} − 1`, unit: "জন" },
      { kind: "word", text: `${STORY.raju2.text} রাজুর সামনে কতজন শিশু আছে?`, sum: `${STORY.raju2.ord[0]} − 1`, unit: "জন" },
      ...["mina", "tuli", "ali"].map((k) => ({ kind: "word", text: `${STORY[k].text} ${STORY[k].ask}`, sum: lineSum(STORY[k]), unit: "জন" })),
    ],
    src: "p.36 ▲৩, ▲৪, ■৪ and p.39 ▲৭, ■৫ (its “চিত্র একে সমাধান করি” left out); p.39's two asked again (behind মিল্টন, in front of রাজু); মিনা, তুলি, আলী are new",
  });
  check(calc(lineSum(STORY.milton)) === 13 && calc(lineSum(STORY.raju2)) === 8, "p.39 totals"); // ▲৭'s answer box has two digits (□□)

  // ── what I wasn't sure of ──
  note("**p.25:** Make Equal Groups shares the coconuts on plates, so “২টি করে দল” is asked as “১২টি জিনিস ৬টি থালায়” (২ on each); a share with one left over (the ▲'s ১৩টি নারিকেল: ৬টি দল, ১টি বাকি) can't pass build.js and validate.js (both want equal shares), so ১৩ is only in the multiple choice. ১২ and ৬ are the page's (the first picture, the ▲ picture's lower row); ৪, ৮ and ১০ are mine. 🥥 stands for the green coconuts.");
  note("**p.27:** the matching writes each number the way the page's blocks are split into pairs (৫ = ২ + ২ + ১); ৭–১০ go beyond the page's ১–৬, as its ■ asks (“এভাবে আর কোন কোন সংখ্যা”). The ■ table itself (numbers that make pairs / don't) is a sort, which p.29's “জোড় না বিজোড়?” already is, so it isn't made again.");
  note("**p.28:** the “কোনটি জোড়/বিজোড়?” options come from the ১–৫০ chart and share their tens digit, so only the last digit (the page's rule) decides.");
  note("**p.36 / p.39:** the book's “□ + □ = □” for ▲৪ (রাজু সামনে থেকে তৃতীয়, পিছন থেকে পঞ্চম) can be ২ + ৫ or ৩ + ৪; the p.36 game asks it as ২ + ১ + ৪ (in front, রাজু, behind), and the p.39 Work It Out as ৩ + ৫ − ১ (worked in two steps, like the p.37 game's “৩ + ৫ − ১ = ৭”); ■৪ (তামিম) and p.39 ■৫ the same way (৩ + ৪ − ১, ৬ + ৩ − ১). p.37's game already asks ▲৩ and ▲৪'s totals, so p.36's game asks who is in front and behind and how to count, not the totals again.");
  note("**At least 10 questions (the user, 3 Nov):** p.25's Make Equal Groups takes 5 fresh problems (the player's own sharing, not only twos); p.25's multiple choice adds the pictures' rows taken alone (৭: ১টি বাকি; ৫: ২টি দল; ৬: ৩টি দল). p.27 was a match, which holds at most 8 pairs, so it is now multiple choice (same slug and code): which split is ৩–৬ blocks (the page's pictures), ৭ and ৮ from their pairs, ৯'s left-over and ১০'s pairs (the ■ “আর কোন কোন সংখ্যা”, beyond the page's ৬), and each table row's next number (১০, ১১). p.36 adds “৩ + ৪ = ৭ করলে কাকে দুবার গোনা হয়?” (তামিম). p.38 adds the seventh as the last of the seven, and the seventh from the left (ডেভিড). p.39's Work It Out adds its two stories asked again (মিল্টনের পিছনে, রাজুর সামনে) and three new line stories in the book's words with the book's মিনা, তুলি and আলী (৪র্থ + ৬ = ১০, ৫ম and ৪র্থ from both ends = ৮, ৯ম + ২ = ১১).");
  note("**p.38:** the page's ten children have no names; they are p.37's line (the same pictures, পিছন on the left), so two questions use p.37's names; the page's ringed seventh from the right is আব্দুল করিম (checked in the code).");
};
