// অধ্যায় ২ · যোগ ও বিয়োগ: a game for each page of pp.40–72 that had none (3 Nov 2026):
// pp.40, 41, 43, 46, 47, 50, 53, 56, 58, 60, 61, 65, 69. Most of these are the book's worked examples (কীভাবে যোগ /
// বিয়োগ করা যায়?), so their games walk through the page's own example, step by step, and add the page's own sums.
// Every number is typed with ASCII digits as the page prints it; toBn() shows it in Bangla; every answer is computed.
// Every game has at least 10 questions (the user, 3 Nov; a Work It Out game's fresh problems count).
"use strict";

module.exports = (ctx) => {
  const { add, wio, eqPairs, mcq, numQ, numAlts, finishQuestions, patternQ, placeValueText, columnSum, calc, show, toBn, allNums, PLACE } = ctx;

  // the same key as build.js's keyOf (the options' shuffle is seeded by it)
  const keyOf = (page, slug) => `m2-p${String(page).padStart(3, "0")}-${slug}`;
  const sg = (s) => s.replace(/-/g, "−").replace(/\*/g, "×"); // shown signs: minus U+2212, times U+00D7
  const sums = (exprs, layout) => exprs.map((e) => {
    const m = e.replace(/\s+/g, "").match(/^(\d+)([+\-])(\d+)$/);
    if (!m) throw new Error(`sum ${e}`);
    return { kind: "sum", a: Number(m[1]), op: m[2] === "+" ? "+" : "−", b: Number(m[3]), layout };
  });
  const boxes = (texts) => texts.map((t) => ({ kind: "missing", text: sg(t) })); // "□ - 5 = 6"
  const places = (nums, ask) => nums.map((n) => ({ kind: "place", n, ask }));
  // a story and the sum that answers it; every number of the sum must be in the story's text
  const story = (text, sum, unit) => {
    const inText = allNums(text);
    for (const n of allNums(sum)) if (!inText.includes(n)) throw new Error(`story: ${n} isn't in "${text}"`);
    return { kind: "word", text, sum: sg(sum), unit };
  };
  const digitsOf = (n) => String(n).split("").reverse().map(Number); // ones first
  const reversed = (n) => Number(String(n).split("").reverse().join(""));
  const must = (ok, what) => { if (!ok) throw new Error(`p040-072: ${what}`); };
  const T = (n) => Math.floor(n / 10), O = (n) => n % 10; // a two-digit number's tens and ones
  // "which sum tells the story?": the right one, the other sign, and the second number's digits turned round
  const sentenceQ = (prompt, a, op, b, why) => mcq({
    prompt: `${prompt} গাণিতিক বাক্য কোনটি?`, answer: show(`${a}${op}${b}`),
    others: [show(`${a}${op === "+" ? "-" : "+"}${b}`), show(`${a}${op}${reversed(b)}`)], why, v: { product: calc(`${a}${op}${b}`) },
  });

  // ── p.40 যোগ (১): রাফির ৪৩টি ও তুলির ৩২টি কার্ড, in bundles of ১০ ──
  {
    const page = 40, slug = "cards", key = keyOf(page, slug);
    const rafi = 43, tuli = 32, both = rafi + tuli;
    const bundleQ = (who, n) => numQ({
      prompt: `${who} কাছে ১০টি করে কার্ডের ${toBn(T(n))}টি বান্ডেল এবং আরও ${toBn(O(n))}টি কার্ড আছে। ${who} কয়টি কার্ড আছে?`,
      expr: `${T(n)}*10+${O(n)}`, unit: "টি", extra: [reversed(n), T(n) + O(n)],
      why: `${toBn(T(n))}টি বান্ডেলে ${toBn(T(n) * 10)}টি কার্ড, আরও ${toBn(O(n))}টি: ${show(`${T(n) * 10}+${O(n)}`)} = ${toBn(n)}`,
    });
    const ask = `রাফির ${toBn(rafi)}টি কার্ড আছে। তুলির ${toBn(tuli)}টি কার্ড আছে। দুজনের কার্ড একত্র করলে কতগুলো কার্ড হবে?`;
    const full = Math.ceil(rafi / 10); // the bundles rafi's cards fill when the last one is made whole
    const qs = [
      bundleQ("রাফির", rafi), bundleQ("তুলির", tuli),
      sentenceQ(ask, rafi, "+", tuli, `দুজনের কার্ড একত্র করলে যোগ করি: ${show(`${rafi}+${tuli}`)} = □`),
      mcq({ prompt: "দুজনের কার্ড একত্র করলে কি কার্ডের সংখ্যা বেশি হবে?", answer: "হ্যাঁ, বেশি হবে", others: ["না, কম হবে", "না, একই থাকবে"], why: "একত্র করলে যোগ হয়, তাই কার্ডের সংখ্যা বেশি হবে।" }),
      numQ({ prompt: "রাফি ও তুলির কার্ড একত্র করলে ১০টি কার্ডের বান্ডেল কয়টি হয়?", expr: `${T(rafi)}+${T(tuli)}`, unit: "টি", extra: [O(rafi) + O(tuli), T(rafi)], why: `${show(`${T(rafi)}+${T(tuli)}`)} = ${toBn(T(rafi) + T(tuli))}টি বান্ডেল, অর্থাৎ ${toBn((T(rafi) + T(tuli)) * 10)}টি কার্ড` }),
      numQ({ prompt: "রাফি ও তুলির কার্ড একত্র করলে বান্ডেলের বাইরে আলাদা কার্ড কয়টি হয়?", expr: `${O(rafi)}+${O(tuli)}`, unit: "টি", extra: [T(rafi) + T(tuli), O(rafi)], why: `${show(`${O(rafi)}+${O(tuli)}`)} = ${toBn(O(rafi) + O(tuli))}টি কার্ড` }),
      // the picture's two parts of তুলির কার্ড, added one at a time
      numQ({ prompt: `রাফির ${toBn(rafi)}টি কার্ডের সাথে শুধু তুলির ${toBn(T(tuli))}টি বান্ডেল যোগ করলে কয়টি কার্ড হয়?`, expr: `${rafi}+${T(tuli) * 10}`, unit: "টি", extra: [rafi + T(tuli), rafi + T(tuli) * 10 + O(tuli)], why: `${toBn(T(tuli))}টি বান্ডেল = ${toBn(T(tuli) * 10)}টি কার্ড: ${show(`${rafi}+${T(tuli) * 10}`)} = ${toBn(rafi + T(tuli) * 10)}। বান্ডেল বাড়ে, আলাদা কার্ড একই থাকে।` }),
      numQ({ prompt: `রাফির ${toBn(rafi)}টি কার্ডের সাথে শুধু তুলির আলাদা ${toBn(O(tuli))}টি কার্ড যোগ করলে কয়টি কার্ড হয়?`, expr: `${rafi}+${O(tuli)}`, unit: "টি", extra: [rafi + O(tuli) * 10, rafi + O(tuli) + 1], why: `${show(`${rafi}+${O(tuli)}`)} = ${toBn(rafi + O(tuli))}। আলাদা কার্ড বাড়ে, বান্ডেল একই থাকে।` }),
      numQ({ prompt: ask, expr: `${rafi}+${tuli}`, unit: "টি", extra: [reversed(both), both - 10], why: `${toBn(T(both))}টি বান্ডেল ও ${toBn(O(both))}টি কার্ড: ${show(`${rafi}+${tuli}`)} = ${toBn(both)}` }),
      numQ({ prompt: `রাফির ${toBn(rafi)}টি কার্ড। আর কয়টি কার্ড পেলে ১০টি করে ${toBn(full)}টি পূর্ণ বান্ডেল হবে?`, expr: `${full * 10}-${rafi}`, unit: "টি", extra: [O(rafi), full * 10 - rafi + 10], why: `${toBn(full)}টি বান্ডেল = ${toBn(full * 10)}টি কার্ড: ${show(`${rafi}+${full * 10 - rafi}`)} = ${toBn(full * 10)}` }),
    ];
    add({ page, slug, type: "mcq", title: "কার্ড একত্র করি", content: finishQuestions(key, qs), src: "p.40 (রাফির ৪৩টি ও তুলির ৩২টি কার্ড: the bundles of ১০, the page's question and ৪৩ + ৩২ = □; ৪৩ + ৩০ and ৪৩ + ২ from the picture's parts; ৪৩ + ৭ = ৫০ is new)" });
  }

  // ── p.41: স্থানীয় মান দিয়ে যোগ — "যোগ একক স্থান থেকে শুরু করতে হয়" (৪৩ + ৩২, then ৩২ + ১৬) ──
  {
    const [a, b] = [43, 32], A = digitsOf(a), B = digitsOf(b);
    wio({
      page: 41, slug: "place-add", title: "স্থানীয় মান দিয়ে যোগ করি",
      items: [...boxes([`${A[0]} + ${B[0]} = □`, `${A[1]} + ${B[1]} = □`]), ...sums([`${a}+${b}`, "32+16"], "column")],
      fresh: { skill: "add", digits: 2, carry: "no", layout: "column" },
      src: "p.41 (একক এর স্থান ৩ + ২ = ৫, দশক এর স্থান ৪ + ৩ = ৭; ৪৩ + ৩২ and ৩২ + ১৬ in columns)",
    });
  }

  // a column sum's steps (+), the book's way (p.43, p.61): each place from the ones up, with the 1 it passes on
  function addColumns(a, b) {
    const A = digitsOf(a), B = digitsOf(b), cols = [];
    let carry = 0;
    for (let k = 0; k < Math.max(A.length, B.length); k++) {
      const x = A[k] || 0, y = B[k] || 0, v = x + y + carry;
      cols.push({ k, x, y, carryIn: carry, v, digit: v % 10, carryOut: v >= 10 ? 1 : 0 });
      carry = v >= 10 ? 1 : 0;
    }
    must(!carry, `${a} + ${b}: the last place passes a 1 on`);
    must(Number(cols.map((c) => c.digit).reverse().join("")) === a + b, `${a} + ${b}: the columns`);
    return cols;
  }
  // the wrong answers a child gets by forgetting one carry, or every carry
  const carrySlips = (a, b, cols) => [
    ...cols.filter((c) => c.carryOut).map((c) => columnSum(a, "+", b, c.k).value),
    Number(cols.map((c) => (c.x + c.y) % 10).reverse().join("")),
  ];

  // ── p.43: হাতে রেখে যোগ (৩৮ + ২৪): ৮ + ৪ = ১২, ১২ হলো ১ দশ ২, দশকে ৩ + ২ + ১ = ৬ ──
  {
    const page = 43, slug = "carry-steps", key = keyOf(page, slug);
    const a = 38, b = 24, s = show(`${a}+${b}`), [ones, tens] = addColumns(a, b);
    must(ones.carryOut === 1 && tens.carryIn === 1, "p.43 carries");
    const forgot = columnSum(a, "+", b, 0).value;
    const qs = [
      mcq({ prompt: `যোগ করার আগে ${toBn(a)} ও ${toBn(b)} কীভাবে সাজিয়ে নিই?`, answer: "দশকের নিচে দশক, এককের নিচে একক", others: ["বড়ো সংখ্যাটি নিচে, যেকোনো ঘরে", "দশকের নিচে একক, এককের নিচে দশক"], why: "আমরা স্থানীয় মান ব্যবহার করে সংখ্যা দুটি সাজিয়ে নিই: দশকের নিচে দশক, এককের নিচে একক।" }),
      numQ({ prompt: `${s}: একক স্থানের অঙ্ক দুটি যোগ করলে কত হয়?`, expr: `${ones.x}+${ones.y}`, extra: [ones.digit, ones.v - 1], why: `একক স্থানের অঙ্ক দুটি: ${show(`${ones.x}+${ones.y}`)} = ${toBn(ones.v)}` }),
      mcq({ prompt: `${toBn(ones.v)} হলো কয় দশ কয় এক?`, answer: `${toBn(ones.carryOut)} দশ ${toBn(ones.digit)}`, others: [`${toBn(ones.digit)} দশ ${toBn(ones.carryOut)}`, `${toBn(ones.v)} দশ`], why: `${toBn(ones.v)} = ${toBn(10)} + ${toBn(ones.digit)}: ${toBn(ones.v)} হলো ${toBn(ones.carryOut)} দশ ${toBn(ones.digit)}।` }),
      mcq({ prompt: `${s}: একক স্থানের ${toBn(ones.v)} থেকে ${toBn(ones.carryOut)} দশ কোথায় নিয়ে যাই?`, answer: "দশকের স্থানে", others: ["শতকের স্থানে", "একক স্থানেই রেখে দিই"], why: `${toBn(ones.v)} হলো ${toBn(ones.carryOut)} দশ ${toBn(ones.digit)}। ${toBn(ones.carryOut)} দশ দশকের স্থানে নিয়ে যাই, একক স্থানে থাকে ${toBn(ones.digit)}।` }),
      numQ({ prompt: `${s}: একক স্থানে কোন অঙ্ক লিখি?`, expr: `${ones.v}-10`, extra: [ones.v, ones.carryOut], why: `${toBn(ones.v)} হলো ${toBn(ones.carryOut)} দশ ${toBn(ones.digit)}। একক স্থানে ${toBn(ones.digit)} লিখি।` }),
      numQ({ prompt: `${s}: দশকের অঙ্কের সাথে আর কত যোগ করি?`, expr: String(ones.carryOut), extra: [ones.digit, 0], why: `একক স্থানের ${toBn(ones.v)} হলো ${toBn(ones.carryOut)} দশ ${toBn(ones.digit)}, তাই দশকের অঙ্কের সাথে ${toBn(ones.carryOut)} যোগ করি।` }),
      numQ({ prompt: `দশকের অঙ্কের সাথে যোগ করা এই ${toBn(ones.carryOut)} আসলে কয়টি এককের সমান?`, expr: `${ones.carryOut}*10`, extra: [ones.carryOut, ones.v], why: `দশকের স্থানের ${toBn(ones.carryOut)} মানে ${toBn(ones.carryOut)} দশ = ${toBn(ones.carryOut * 10)}টি একক (একক স্থানের ${toBn(ones.carryOut * 10)}টি ব্লক)।` }),
      numQ({ prompt: `${s}: দশকের স্থানে কোন অঙ্ক লিখি?`, expr: `${tens.x}+${tens.y}+${tens.carryIn}`, extra: [tens.x + tens.y, tens.v + 1], why: `দশকের স্থানে ${show(`${tens.x}+${tens.y}+${tens.carryIn}`)} = ${toBn(tens.v)} লিখি।` }),
      numQ({ prompt: `${s} = কত?`, expr: `${a}+${b}`, extra: [...carrySlips(a, b, [ones, tens]), Number(`${tens.x + tens.y}${ones.v}`)], why: `একক স্থানে ${toBn(ones.digit)}, দশকের স্থানে ${toBn(tens.digit)}: ${s} = ${toBn(a + b)}` }),
      numQ({ prompt: `${s}: কেউ দশকের অঙ্কের সাথে ${toBn(ones.carryOut)} যোগ করতে ভুলে গেল। সে কত লিখবে?`, expr: String(forgot), extra: [a + b, forgot + 1], why: `${show(`${tens.x}+${tens.y}`)} = ${toBn(tens.x + tens.y)} লিখলে হয় ${toBn(forgot)}, যা ভুল। ঠিক: ${show(`${tens.x}+${tens.y}+${tens.carryIn}`)} = ${toBn(tens.v)}, ${s} = ${toBn(a + b)}।` }),
    ];
    add({ page, slug, type: "mcq", title: "হাতে রেখে যোগ: ধাপে ধাপে", content: finishQuestions(key, qs), src: "p.43 (৩৮ + ২৪: সাজিয়ে নিই, ৮ + ৪ = ১২, ১২ হলো ১ দশ ২, দশকের স্থানে নিয়ে যাই, ৩ + ২ + ১ = ৬); ১ দশ = ১০ একক and the forgotten ১ (৫২) are new" });
  }

  // ── p.46 বিয়োগ (১): মিনার ৩৬টি কাগজ; "১৩ হচ্ছে ১ দশ ৩ একক। আমি ৩ দশ ৬ থেকে ১ দশ ৩ সরিয়ে নিই।" ──
  {
    const had = 36, gave = 13;
    wio({
      page: 46, slug: "papers", title: "কাগজ সরিয়ে নিই",
      items: [
        ...places([had, gave], "parts"), // ৩৬ = ৩ দশ ৬, ১৩ = ১ দশ ৩
        ...places([had - gave], "number"), // what is left in the picture: ২ দশ ৩
        story(`মিনার ${toBn(had)}টি কাগজ ছিল, সে এর থেকে ${toBn(gave)}টি কাগজ রাজুকে দিল। মিনার কাছে কতটি কাগজ রইল?`, `${had} - ${gave}`, "টি"),
      ],
      fresh: { skill: "sub", digits: 2, carry: "no", layout: "row" },
      src: "p.46 (মিনার ৩৬টি কাগজ: ৩৬ = ৩ দশ ৬, ১৩ = ১ দশ ৩ একক, what is left ২ দশ ৩, and the story)",
    });
  }

  // ── p.47: স্থানীয় মানের সাহায্যে ৩৬ − ১৩ (৬ − ৩ = ৩, ৩ − ১ = ২), and নিজে করি 1 বিয়োগ করি ──
  // the five sums, then their places worked apart as the page does (একক: ৬ − ৩; দশক: ৩ দশ − ১ দশ, written ৩০ − ১০),
  // only those whose answer no other pair has
  {
    const own = ["36-13", "45-23", "56-12", "86-31", "75-23"]; // the example, 1 (1)–(4)
    const parts = [];
    for (const e of own) {
      const [x, y] = e.split("-").map(Number);
      must(O(x) >= O(y) && T(x) >= T(y), `p.47 ${e} borrows`);
      parts.push(`${O(x)}-${O(y)}`, `${T(x) * 10}-${T(y) * 10}`);
    }
    const content = eqPairs([...own, ...parts], 10);
    must(content.pairs.length === 10, `p.47 has ${content.pairs.length} pairs`);
    add({ page: 47, slug: "sub-match", type: "equation_match", title: "স্থানীয় মান দিয়ে বিয়োগ · মিলাও", content, src: `p.47 (৩৬ − ১৩) and 1 (1)–(4), and their একক and দশক worked apart (${content.pairs.slice(own.length).map((q) => q.left).join(", ")})` });
  }

  // ── p.50: দশক থেকে ১ দশ নিয়ে বিয়োগ (রাজুর ৪৫টি রং পেনসিল, ৪৫ − ১৮) ──
  {
    const page = 50, slug = "borrow-steps", key = keyOf(page, slug);
    const a = 45, b = 18, s = show(`${a}-${b}`);
    const [ta, oa] = [T(a), O(a)], [tb, ob] = [T(b), O(b)];
    must(oa < ob, "p.50 needs a borrow");
    const ones = 10 + oa, onesLeft = ones - ob, tensLeft = ta - 1 - tb;
    must(Number(`${tensLeft}${onesLeft}`) === a - b && columnSum(a, "−", b).value === a - b, "p.50 columns");
    const ask = `রাজুর কাছে ${toBn(a)}টি রং পেনসিল ছিল। সে তুলিকে ${toBn(b)}টি রং পেনসিল দিল। রাজুর কাছে কতটি রং পেনসিল রইল?`;
    const qs = [
      mcq({ prompt: `${ask} গাণিতিক বাক্য কোনটি?`, answer: s, others: [show(`${a}+${b}`), show(`${ta}${ob}-${tb}${oa}`)], why: `রং পেনসিল দিয়ে দিলে কমে যায়: ${s} = □`, v: { product: a - b } }),
      mcq({ prompt: `“তুমি কীভাবে আমাকে ${toBn(b)}টি রং পেনসিল দিবে?” ${toBn(b)} = কয় দশ কয় এক?`, answer: `${toBn(tb)} দশ ${toBn(ob)}`, others: [`${toBn(ob)} দশ ${toBn(tb)}`, `${toBn(b)} দশ`], why: `${toBn(b)} = ${toBn(tb * 10)} + ${toBn(ob)}: ${toBn(tb)} দশ ${toBn(ob)}। দশকের স্থানে ${toBn(tb)}, এককের স্থানে ${toBn(ob)}।` }),
      mcq({ prompt: `${s}: একক স্থানের ${toBn(oa)} থেকে ${toBn(ob)} বিয়োগ করতে পারি না। তখন কী করি?`, answer: "দশক থেকে ১ দশ একক স্থানে সরিয়ে নিই", others: [`${toBn(ob)} থেকে ${toBn(oa)} বিয়োগ করি`, "একক স্থানে ০ লিখি"], why: `একক স্থানের অঙ্ক ${toBn(oa)} ছোটো, ${toBn(ob)} বড়ো। তাই দশক এর স্থান থেকে ১ দশ একক স্থানে সরিয়ে নিই।` }),
      numQ({ prompt: `${s}: দশক থেকে ১ দশ এনে এককের ${toBn(oa)} এর সাথে যোগ করলে কত হয়?`, expr: `10+${oa}`, extra: [oa + 1, ones - 1], why: `${show(`10+${oa}`)} = ${toBn(ones)}` }),
      mcq({ prompt: `১ দশ একক স্থানে সরিয়ে নিলে ${toBn(a)} কে কীভাবে দেখি?`, answer: `${toBn(ta - 1)} দশ ${toBn(ones)}`, others: [`${toBn(ta)} দশ ${toBn(ones)}`, `${toBn(ta - 1)} দশ ${toBn(oa)}`], why: `${toBn(ta)} দশ ${toBn(oa)} থেকে ১ দশ এককে নিলে হয় ${toBn(ta - 1)} দশ ${toBn(ones)}; সংখ্যাটি একই: ${toBn((ta - 1) * 10)} + ${toBn(ones)} = ${toBn(a)}।` }),
      numQ({ prompt: `${s}: এককের স্থানে এখন ${toBn(ones)} থেকে ${toBn(ob)} বিয়োগ করি। কত হয়?`, expr: `${ones}-${ob}`, extra: [ob - oa, onesLeft + 1], why: `এককের স্থান: ${show(`${ones}-${ob}`)} = ${toBn(onesLeft)}` }),
      numQ({ prompt: `${s}: ১ দশ সরিয়ে নেওয়ার পর দশকের স্থানে কয় দশ থাকে?`, expr: `${ta}-1`, extra: [ta, ta + 1], why: `${toBn(ta)} দশ থেকে ১ দশ সরিয়ে নিলে থাকে ${toBn(ta - 1)} দশ।` }),
      numQ({ prompt: `${s}: দশকের স্থানে ${toBn(ta - 1)} থেকে ${toBn(tb)} বিয়োগ করলে কত হয়?`, expr: `${ta - 1}-${tb}`, extra: [ta - tb, tensLeft + 2], why: `দশকের স্থান: ${show(`${ta - 1}-${tb}`)} = ${toBn(tensLeft)}` }),
      // the slips: the smaller digit taken from the bigger (৮ − ৫), or the borrowed ten not taken off the tens
      numQ({ prompt: ask, expr: `${a}-${b}`, unit: "টি", extra: [Number(`${ta - tb}${ob - oa}`), columnSum(a, "−", b, 0).value], why: `${s} = ${toBn(a - b)}` }),
      numQ({ prompt: `মিলিয়ে দেখি: রাজুর কাছে রইল ${toBn(a - b)}টি, তুলিকে দিল ${toBn(b)}টি। ${show(`${a - b}+${b}`)} = কত?`, expr: `${a - b}+${b}`, extra: [a - b + b - 10, a - b - b], why: `${show(`${a - b}+${b}`)} = ${toBn(a)}: প্রথমে রাজুর কাছে ${toBn(a)}টিই ছিল, তাই উত্তর ঠিক।` }),
    ];
    add({ page, slug, type: "mcq", title: "দশক থেকে ১ দশ নিয়ে বিয়োগ: ধাপে ধাপে", content: finishQuestions(key, qs), src: "p.50 (রাজুর ৪৫টি রং পেনসিল: ৪৫ − ১৮; ১৮ = ১ দশ ৮, ১০ + ৫ = ১৫ (৪৫ = ৩ দশ ১৫), ১৫ − ৮ = ৭, ৩ − ১ = ২); the check ২৭ + ১৮ is new" });
  }

  // ── p.53 গাণিতিক সম্পর্ক: □ − ৫ = ৬ ⟶ ৬ + ৫ = □ (and the cross: ১১ − ৫ = ৬, ৬ + ৫ = ১১) ──
  {
    const sold = 5, left = 6, first = left + sold;
    wio({
      page: 53, slug: "add-sub", title: "যোগ ও বিয়োগের সম্পর্ক",
      items: [
        story(`একটি ব্যাগে কয়েকটি আম ছিল। ${toBn(sold)}টি আম বিক্রি করা হলো। এখন ব্যাগে ${toBn(left)}টি আম আছে। প্রথমে ব্যাগে কয়টি আম ছিল?`, `${left} + ${sold}`, "টি"),
        ...boxes([`□ - ${sold} = ${left}`, `${left} + ${sold} = □`, `${first} - ${sold} = □`]),
      ],
      fresh: { skill: "missing", digits: 2 },
      src: "p.53 (the story, □ − ৫ = ৬ ⟶ ৬ + ৫ = □, and the cross's ১১ − ৫ = ৬)",
    });
  }

  // ── p.56: দিলীপের ৭৩টি কাগজ, দীপা দিল ৫৪টি — "এখানে দশের দল ১০টির বেশি আছে", "উত্তর ১০০ এর বেশি হবে" ──
  {
    const page = 56, slug = "tens-over-100", key = keyOf(page, slug);
    const a = 73, b = 54, both = a + b;
    const tens = T(a) + T(b), ones = O(a) + O(b);
    must(tens > 10 && ones < 10 && tens * 10 + ones === both, "p.56 groups");
    const ask = `দিলীপের কাছে ${toBn(a)}টি কাগজ ছিল। তার বোন দীপা তাকে আরও ${toBn(b)}টি কাগজ দিল। তার কাছে কতটি কাগজ হলো?`;
    const qs = [
      numQ({ prompt: `দিলীপের কাছে ${toBn(T(a))}টি দশের দল ও ${toBn(O(a))}টি কাগজ আছে। দিলীপের কাছে কতটি কাগজ?`, expr: `${T(a)}*10+${O(a)}`, unit: "টি", extra: [reversed(a), T(a) + O(a)], why: `${toBn(T(a))}টি দশ = ${toBn(T(a) * 10)}, ${show(`${T(a) * 10}+${O(a)}`)} = ${toBn(a)}` }),
      numQ({ prompt: `দীপা দিল ${toBn(T(b))}টি দশের দল ও ${toBn(O(b))}টি কাগজ। দীপা কতটি কাগজ দিল?`, expr: `${T(b)}*10+${O(b)}`, unit: "টি", extra: [reversed(b), T(b) + O(b)], why: `${toBn(T(b))}টি দশ = ${toBn(T(b) * 10)}, ${show(`${T(b) * 10}+${O(b)}`)} = ${toBn(b)}` }),
      sentenceQ(ask, a, "+", b, `আরও কাগজ দিলে কাগজ বেড়ে যায়: ${show(`${a}+${b}`)} = □`),
      numQ({ prompt: "দিলীপ ও দীপার দশের দল একত্র করলে কয়টি দশের দল হয়?", expr: `${T(a)}+${T(b)}`, unit: "টি", extra: [10, tens - 10], why: `${show(`${T(a)}+${T(b)}`)} = ${toBn(tens)}টি দশের দল` }),
      mcq({ prompt: `দিলীপ ও দীপার দশের দল একত্র করলে ${toBn(10)}টির বেশি হয়। যোগফল কেমন হবে?`, answer: `${toBn(100)} এর বেশি`, others: [`${toBn(100)} এর কম`, `ঠিক ${toBn(100)}`], why: `${toBn(10)}টি দশের দল = ${toBn(10 * 10)}। এখানে দশের দল ${toBn(10)}টির বেশি, তাই উত্তর ${toBn(100)} এর বেশি হবে।` }),
      numQ({ prompt: `${toBn(tens)}টি দশের দলে কতটি কাগজ?`, expr: `${tens}*10`, unit: "টি", extra: [tens, Number(`${Math.floor(tens / 10)}0${tens % 10}`)], why: `${toBn(tens)} দশক হলো ${toBn(Math.floor(tens / 10))} শতক ${toBn(tens % 10)} দশক = ${toBn(tens * 10)}` }),
      numQ({ prompt: "দশের দলের বাইরে আলাদা কাগজ একত্র করলে কয়টি হয়?", expr: `${O(a)}+${O(b)}`, unit: "টি", extra: [tens, ones - 1], why: `${show(`${O(a)}+${O(b)}`)} = ${toBn(ones)}টি কাগজ` }),
      numQ({ prompt: ask, expr: `${a}+${b}`, unit: "টি", extra: [both - 100, both - 10], why: `${toBn(tens)}টি দশের দল ও ${toBn(ones)}টি কাগজ: ${show(`${a}+${b}`)} = ${toBn(both)}` }),
      mcq({ prompt: `দিলীপের এখন ${toBn(both)}টি কাগজ। ${toBn(both)} = কয় শতক কয় দশক কয় একক?`, answer: placeValueText(both, true), others: [placeValueText(Number(`${Math.floor(both / 100)}${O(both)}${T(both) % 10}`), true), `${toBn(Math.floor(both / 10))} শতক ${toBn(O(both))} একক`], why: `${toBn(tens)} দশক হলো ${toBn(Math.floor(tens / 10))} শতক ${toBn(tens % 10)} দশক; তাই ${toBn(both)} = ${placeValueText(both, true)}` }),
      numQ({ prompt: `দিলীপের ${toBn(a)}টি কাগজ ছিল। আর কয়টি কাগজ হলে ${toBn(100)}টি হতো?`, expr: `100-${a}`, unit: "টি", extra: [10 - T(a), 100 - a + 10, 100 - a - 10], why: `${toBn(10)}টি দশের দল = ${toBn(100)}: ${show(`${a}+${100 - a}`)} = ${toBn(100)}` }),
    ];
    add({ page, slug, type: "mcq", title: "দশের দল গুনে যোগ করি", content: finishQuestions(key, qs), src: "p.56 (দিলীপের ৭৩টি ও দীপার ৫৪টি কাগজ: দশের দল ১০টির বেশি, উত্তর ১০০ এর বেশি; ১২ দশক = ১ শতক ২ দশক as on p.57); ৭৩ + ২৭ = ১০০ is new" });
  }

  // ── p.58: ২১৬ + ১৪২ place by place (৬ + ২ = ৮, ১ + ৪ = ৫, ২ + ১ = ৩), and রাজু ও মীনার কাগজের ফুল ──
  {
    const [a, b] = [216, 142], cols = addColumns(a, b);
    must(cols.every((c) => !c.carryOut), "p.58 has no carry");
    wio({
      page: 58, slug: "place-add3", title: "স্থানীয় মান দিয়ে তিন অঙ্কের যোগ",
      items: [
        ...boxes(cols.map((c) => `${c.x} + ${c.y} = □`)), // একক, দশক, শতক: the page's three steps
        ...sums([`${a}+${b}`], "column"),
        story(`শ্রেণিকক্ষ সাজানোর জন্য রাজু ${toBn(134)}টি কাগজের ফুল বানালো। মীনা ${toBn(145)}টি ফুল বানালো। তারা কাগজ দিয়ে মোট কতগুলো ফুল বানালো?`, "134 + 145", "টি"),
      ],
      fresh: { skill: "add", digits: 3, carry: "no", layout: "column" },
      src: "p.58 (২১৬ + ১৪২: একক ৬ + ২, দশক ১ + ৪, শতক ২ + ১; রাজু ১৩৪টি ও মীনা ১৪৫টি ফুল)",
    });
  }

  // ── p.60 এসো লুকানো অঙ্কটি বের করি ──
  {
    const page = 60, slug = "hidden", key = keyOf(page, slug);
    // a sum with one digit hidden in each number (each place on its own, no carrying, as the yellow example shows);
    // one question for each hidden digit, both boxes shown
    const hiddenQs = (aT, bT, total) => {
      must((aT.match(/\?/g) || []).length === 1 && (bT.match(/\?/g) || []).length === 1, `p.60 ${aT} + ${bT}`);
      const fits = [];
      for (let x = 0; x <= 9; x++) for (let y = 0; y <= 9; y++) if (Number(aT.replace("?", x)) + Number(bT.replace("?", y)) === total) fits.push([x, y]);
      must(fits.length === 1, `p.60 ${aT} + ${bT} = ${total}: ${fits.length} ways`);
      const [x, y] = fits[0], A = digitsOf(aT.replace("?", x)), B = digitsOf(bT.replace("?", y)), S = digitsOf(total);
      must(A.every((d, k) => d + (B[k] || 0) === S[k]), `p.60 ${aT} + ${bT}: carrying`);
      const shown = `${toBn(aT).replace("?", "☐")} + ${toBn(bT).replace("?", "☐")} = ${toBn(total)}`;
      // the hidden digit of each number (the other one filled in for the check), the ones place first
      const holes = [
        { template: `${aT}+${bT.replace("?", y)}=${total}`, d: x, pos: aT.length - 1 - aT.indexOf("?") },
        { template: `${aT.replace("?", x)}+${bT}=${total}`, d: y, pos: bT.length - 1 - bT.indexOf("?") },
      ].sort((p, q) => p.pos - q.pos);
      must(holes[0].pos !== holes[1].pos, `p.60 ${aT} + ${bT}: two holes in one place`);
      return holes.map(({ template, d, pos }) => mcq({
        prompt: `${shown}। ${PLACE[pos]}ের স্থানের লুকানো অঙ্কটি কত?`,
        answer: toBn(d), others: numAlts(d, [d + 1, d - 1, d + 2], 3).map(toBn),
        why: `${PLACE[pos]}ের স্থানে ${show(`${A[pos]}+${B[pos]}`)} = ${toBn(S[pos])}, তাই লুকানো অঙ্কটি ${toBn(d)}।`,
        v: { missing: template },
      }));
    };
    // 3: three trees, ৬ on top: (২১, ২৭), (৩৩, ৩৯), (৫০, ☐)
    const top = 6, trees = [[21, 27], [33, 39]], last = 50;
    must(trees.every(([l, r]) => l + top === r), "p.60 3");
    const treeText = (pairsShown) => `প্রতিটিতে উপরে ${toBn(top)}, নিচে দুটি সংখ্যা: ${pairsShown.map(([l, r]) => `(${l == null ? "☐" : toBn(l)}, ${r == null ? "☐" : toBn(r)})`).join(", ")}। খালি ঘরে কোন সংখ্যা বসবে?`;
    // 4: the zigzag, ৫ at every bottom point: ১, ৬, ১১, ১৬, ?
    const zig = [1, 6, 11, 16];
    must(zig.slice(1).every((n, i) => n - zig[i] === 5), "p.60 4");
    // 5: crosses [top, left, middle, right, bottom]: the middle is the sum of the four around it
    const crosses = [[3, 7, 17, 2, 5], [3, 2, 15, 4, 6]], ask5 = [3, 7, 5, 4]; // the third: top ৩, left ৭, right ৫, bottom ৪
    must(crosses.every(([t, l, m, r, btm]) => t + l + r + btm === m), "p.60 5");
    const around = (c) => [c[0], c[1], c[3], c[4]].map(toBn).join(", ");
    const sum5 = ask5.reduce((s, n) => s + n, 0);
    const qs = [
      ...hiddenQs("3?5", "12?", 457), // the yellow example (the page works it out: এককের স্থানে ৫ + ২ = ৭, দশকের স্থানে ৩ + ২ = ৫)
      ...hiddenQs("4?5", "21?", 639), // 1
      ...hiddenQs("51?", "3?5", 876), // 2
      numQ({ prompt: treeText([...trees, [last, null]]), expr: `${last}+${top}`, extra: [`${last}-${top}`, last + top + 1, last + 10], why: `${show(`${trees[0][0]}+${top}`)} = ${toBn(trees[0][1])}, ${show(`${trees[1][0]}+${top}`)} = ${toBn(trees[1][1])}। তাই ${show(`${last}+${top}`)} = ${toBn(last + top)}।` }),
      // the same trees read the other way: the left number from the right one
      numQ({ prompt: treeText([trees[0], [null, trees[1][1]]]), expr: `${trees[1][1]}-${top}`, extra: [trees[1][1] + top, trees[1][1] - top + 1, trees[1][1] - top - 10], why: `${show(`${trees[0][0]}+${top}`)} = ${toBn(trees[0][1])}। ☐ + ${toBn(top)} = ${toBn(trees[1][1])}, তাই ${show(`${trees[1][1]}-${top}`)} = ${toBn(trees[1][1] - top)}।` }),
      patternQ(zig),
      numQ({ prompt: `প্রথম ছকে চারপাশে ${around(crosses[0])}, মাঝে ${toBn(crosses[0][2])}। দ্বিতীয় ছকে চারপাশে ${around(crosses[1])}, মাঝে ${toBn(crosses[1][2])}। চারপাশে ${ask5.map(toBn).join(", ")} হলে মাঝে কত?`, expr: ask5.join("+"), extra: [sum5 - 1, sum5 + 1, sum5 - ask5[0]], why: `মাঝের সংখ্যাটি চারপাশের সংখ্যাগুলোর যোগফল: ${show(ask5.join("+"))} = ${toBn(calc(ask5.join("+")))}` }),
    ];
    add({ page, slug, type: "mcq", title: "লুকানো অঙ্ক খুঁজি", content: finishQuestions(key, qs), src: "p.60 3: the yellow example (৩☐৫ + ১২☐ = ৪৫৭), 1–2 (৪☐৫ + ২১☐ = ৬৩৯, ৫১☐ + ৩☐৫ = ৮৭৬: one question a hidden digit), 3 (৬ on top; (☐, ৩৯) is new), 4 (১, ৬, ১১, ১৬, ?), 5 (the crosses)" });
  }

  // ── p.61: দুবার ১ যোগ করে তিন অঙ্কের যোগ (৪৬৮ + ৩৯৪; 1: রাজুর খাতা ২৬৭ + ১৪৫) ──
  {
    const page = 61, slug = "carry-steps-3", key = keyOf(page, slug);
    const stepQs = (a, b) => {
      const cols = addColumns(a, b), s = show(`${a}+${b}`);
      return cols.map((c) => {
        const expr = c.carryIn ? `${c.x}+${c.y}+${c.carryIn}` : `${c.x}+${c.y}`;
        const prompt = c.carryIn ? `${s}: ${PLACE[c.k - 1]} থেকে আসা ${toBn(c.carryIn)} সহ ${PLACE[c.k]} স্থানের অঙ্ক যোগ করলে কত হয়?` : `${s}: ${PLACE[c.k]} স্থানের অঙ্ক দুটি যোগ করলে কত হয়?`;
        const write = c.carryOut ? `${PLACE[c.k]}ের স্থানে ${toBn(c.digit)} লিখি, ${PLACE[c.k + 1]}ের অঙ্কের সাথে ${toBn(c.carryOut)} যোগ করি।` : `${PLACE[c.k]}ের স্থানে ${toBn(c.v)} লিখি।`;
        return numQ({ prompt, expr, extra: c.carryIn ? [`${c.x}+${c.y}`, c.v + 1] : [c.digit, c.v - 1], why: `${show(expr)} = ${toBn(c.v)}। ${write}` });
      });
    };
    const a1 = 468, b1 = 394, a2 = 267, b2 = 145;
    const total = (a, b, prompt, unit = "") => numQ({ prompt, expr: `${a}+${b}`, unit, extra: carrySlips(a, b, addColumns(a, b)), why: `${show(`${a}+${b}`)} = ${toBn(a + b)}` });
    // p.61's box: "১৬ হলো ১ শতক ৬ দশক"
    const t1 = addColumns(a1, b1)[1];
    must(t1.carryOut === 1, "p.61 tens carry");
    const regroupQ = mcq({
      prompt: `${show(`${a1}+${b1}`)}: দশকের স্থানে ${toBn(t1.v)} দশক হলো। ${toBn(t1.v)} দশক হলো কত?`,
      answer: `${toBn(t1.carryOut)} শতক ${toBn(t1.digit)} দশক`, others: [`${toBn(t1.digit)} শতক ${toBn(t1.carryOut)} দশক`, `${toBn(t1.v)} শতক`],
      why: `${toBn(t1.v)} হলো ${toBn(t1.carryOut)} শতক ${toBn(t1.digit)} দশক। দশকের স্থানে ${toBn(t1.digit)} লিখি, শতকের অঙ্কের সাথে ${toBn(t1.carryOut)} যোগ করি।`,
    });
    const ask2 = `রাজুর একটি খাতায় ${toBn(a2)} পৃষ্ঠা কাগজ আছে। আরেকটি খাতায় ${toBn(b2)} পৃষ্ঠা কাগজ আছে। দুটি খাতায় মোট পৃষ্ঠার সংখ্যা কত?`;
    const [s1, s2] = [stepQs(a1, b1), stepQs(a2, b2)];
    const qs = [
      s1[0], s1[1], regroupQ, s1[2], total(a1, b1, `${show(`${a1}+${b1}`)} = কত?`),
      sentenceQ(ask2, a2, "+", b2, `দুটি খাতার পৃষ্ঠা একত্র করি: ${show(`${a2}+${b2}`)} = □`),
      ...s2, total(a2, b2, ask2, " পৃষ্ঠা"),
    ];
    add({ page, slug, type: "mcq", title: "তিন অঙ্কের হাতে রেখে যোগ: ধাপে ধাপে", content: finishQuestions(key, qs), src: "p.61 (৪৬৮ + ৩৯৪: ৮ + ৪ = ১২, ৬ + ৯ + ১ = ১৬ = ১ শতক ৬ দশক, ৪ + ৩ + ১ = ৮) and 1 (রাজুর খাতা ২৬৭ + ১৪৫)" });
  }

  // ── p.65: ১২৫ − ৪৩, শতকের স্থান থেকে ১০ দশক নিয়ে ──
  // (a sequence of the page's six steps until 3 Nov; one worked example has too few steps for 10, so the steps are
  // questions now, slug unchanged)
  {
    const page = 65, slug = "borrow-order", key = keyOf(page, slug);
    const a = 125, b = 43, s = show(`${a}-${b}`);
    const A = digitsOf(a), B = digitsOf(b);
    must(A[0] >= B[0] && A[1] < B[1] && A[2] === 1, "p.65 borrows from the hundreds only");
    const ones = A[0] - B[0], tensNow = 10 + A[1], tens = tensNow - B[1];
    must(Number(`${tens}${ones}`) === a - b && columnSum(a, "−", b).value === a - b, "p.65 columns");
    const qs = [
      mcq({ prompt: `${toBn(a)} এ কয় শতক কয় দশক কয় একক?`, answer: placeValueText(a, true), others: [placeValueText(reversed(a), true), `${toBn(Math.floor(a / 10))} শতক ${toBn(A[0])} একক`], why: `${toBn(a)} = ${placeValueText(a, true)}` }),
      mcq({ prompt: `${s}: সংখ্যা দুটি স্থানীয় মানের সাহায্যে সাজিয়ে নিই। ${toBn(b)} এর ${toBn(B[1])} কোন স্থানে বসে?`, answer: "দশকের স্থানে", others: ["শতকের স্থানে", "এককের স্থানে"], why: `${toBn(b)} = ${toBn(B[1])} দশক ${toBn(B[0])} একক: ${toBn(B[1])} বসে দশকের স্থানে, ${toBn(a)} এর ${toBn(A[1])} এর নিচে।` }),
      numQ({ prompt: `${s}: এককের স্থানে ${toBn(A[0])} থেকে ${toBn(B[0])} বিয়োগ করলে কত হয়?`, expr: `${A[0]}-${B[0]}`, extra: [A[0] + B[0], ones + 1], why: `এককের স্থানে ${show(`${A[0]}-${B[0]}`)} = ${toBn(ones)}` }),
      mcq({ prompt: `${s}: দশকের স্থানে ${toBn(A[1])} থেকে ${toBn(B[1])} বিয়োগ করতে পারি না। তখন কী করি?`, answer: "শতকের স্থান থেকে ১০ দশক দশকের স্থানে আনি", others: [`${toBn(B[1])} থেকে ${toBn(A[1])} বিয়োগ করি`, "দশকের স্থানে ০ লিখি"], why: `দশক স্থানের অঙ্ক ${toBn(A[1])} ছোটো, ${toBn(B[1])} বড়ো। তাই শতকের স্থান থেকে ১০ দশক দশকের স্থানে আনি।` }),
      numQ({ prompt: "১ শতক = কত দশক?", expr: "100", div: 10, unit: " দশক", extra: [100, 1], why: "১ শতক = ১০০ = ১০ দশক" }),
      numQ({ prompt: `${s}: শতক থেকে ১০ দশক এনে দশকের ${toBn(A[1])} এর সাথে যোগ করলে কত দশক হয়?`, expr: `10+${A[1]}`, unit: " দশক", extra: [A[1], tensNow - 1], why: `${show(`10+${A[1]}`)} = ${toBn(tensNow)} দশক` }),
      numQ({ prompt: `${s}: দশকের স্থানে ${toBn(tensNow)} থেকে ${toBn(B[1])} বিয়োগ করলে কত হয়?`, expr: `${tensNow}-${B[1]}`, extra: [B[1] - A[1], tensNow + B[1]], why: `দশকের স্থানে ${show(`${tensNow}-${B[1]}`)} = ${toBn(tens)}` }),
      numQ({ prompt: `${s}: ১ শতক দশকের স্থানে নিয়ে যাওয়ার পর শতকের স্থানে কত থাকে?`, expr: `${A[2]}-1`, extra: [A[2], A[2] + 1], why: "১ শতক দশকের স্থানে নিয়ে গেলে শতকের স্থানে কিছু থাকে না (০)।" }),
      // the slips: the smaller digit taken from the bigger (৪ − ২), or the hundred not taken off
      numQ({ prompt: `${s} = কত?`, expr: `${a}-${b}`, extra: [Number(`${A[2]}${B[1] - A[1]}${ones}`), columnSum(a, "−", b, 1).value], why: `শতকের স্থানে কিছু নেই, দশকের স্থানে ${toBn(tens)}, এককের স্থানে ${toBn(ones)}: ${s} = ${toBn(a - b)}` }),
      numQ({ prompt: `মিলিয়ে দেখি: ${show(`${a - b}+${b}`)} = কত?`, expr: `${a - b}+${b}`, extra: [a - 10, a + 10, a - b - b], why: `${show(`${a - b}+${b}`)} = ${toBn(a)}, প্রথম সংখ্যাটিই; তাই ${s} = ${toBn(a - b)} ঠিক।` }),
    ];
    add({ page, slug, type: "mcq", title: "শতক থেকে দশক নিয়ে বিয়োগ: ধাপে ধাপে", content: finishQuestions(key, qs), src: "p.65 (১২৫ − ৪৩: সাজিয়ে নিই, ৫ − ৩, শতকের স্থান থেকে ১০ দশক, ১০ + ২ = ১২, ১২ − ৪ = ৮, শতকে কিছু থাকে না); the check ৮২ + ৪৩ is new" });
  }

  // ── p.69 যোগ ও বিয়োগ সংক্রান্ত সমস্যা: লোকসংখ্যা ৬৭৩, নতুন এলো ১১৭ জন, চলে গেল ১০৫ জন ──
  {
    const was = 673, came = 117, went = 105, mid = was + came;
    const village = `একটি গ্রামে লোকসংখ্যা ${toBn(was)}।`;
    wio({
      page: 69, slug: "population", title: "লোকসংখ্যা কত?",
      items: [
        { kind: "compare", a: sg(`${was} + ${came}`), b: String(was) }, // "নতুন আসায় লোকসংখ্যা বেশি হবে"
        story(`${village} নতুন এলো ${toBn(came)} জন। এখন লোকসংখ্যা কত হলো?`, `${was} + ${came}`, "জন"), // (ক)
        { kind: "compare", a: sg(`${mid} - ${went}`), b: String(mid) }, // "চলে যাওয়ায় লোকসংখ্যা কম হবে"
        story(`নতুন লোক আসার পর গ্রামে লোকসংখ্যা ${toBn(mid)}। চলে গেল ${toBn(went)} জন। চলে যাওয়ায় লোকসংখ্যা কত হলো?`, `${mid} - ${went}`, "জন"), // (খ)
        story(`${village} নতুন এলো ${toBn(came)} জন এবং চলে গেল ${toBn(went)} জন। এখন লোকসংখ্যা কত?`, `${was} + ${came} - ${went}`, "জন"), // (গ), in two steps
      ],
      // the harder step of (খ), ৭৯০ − ১০৫: three-digit taking away with borrowing, in columns
      fresh: { skill: "sub", digits: 3, carry: "yes", layout: "column" },
      src: "p.69 (ক)–(গ) (লোকসংখ্যা ৬৭৩, নতুন এলো ১১৭ জন, চলে গেল ১০৫ জন; বেশি হবে / কম হবে as ○ items) + fresh three-digit taking away",
    });
  }

  ctx.note("**p.40** the card stacks marked ১০ have no name on the page; the questions call them “১০টি করে কার্ডের … বান্ডেল”, p.42's word for a pack of cards (p.56's paper stacks are the page's own “দশের দল”).");
  ctx.note("**pp.43, 47, 50, 61, 65** (and p.41's boxes) are worked examples; their games walk through the page's own working (p.43 “৮ + ৪ = ১২ … ১ দশ ২ … ৩ + ২ + ১ = ৬”, p.50 “১০ + ৫ = ১৫ … ১৫ − ৮ = ৭ … ৩ − ১ = ২”). The wrong options are the usual slips, worked out in code: a carry or a borrowed ten forgotten, the smaller digit taken from the bigger (৪৫ − ১৮ → ৩৩). p.65's “এককের স্থানে ৫ − ৩ = ২” and “শতকের স্থানে কিছু থাকে না” are read from the picture (৩ of the ৫ cubes crossed out; the last row's empty শতক); the page's text speaks only of the tens.");
  ctx.note("**10 questions a game (3 Nov):** to reach 10, these questions are new, built from the page's worked example: p.40 “আর কয়টি কার্ড পেলে ৫টি পূর্ণ বান্ডেল” (৪৩ + ৭ = ৫০); p.43 the carried ১ = ১০ একক, and the answer with it forgotten (৫২); p.47's last five pairs are its own sums' একক and দশক worked apart (৬ − ৩, ৫ − ৩, ৬ − ২; the দশক written as tens, ৩০ − ১০ and ৫০ − ১০ for the page's “দশকের স্থান ৩ − ১”), only those whose answer no other pair has; p.50 and p.65 “মিলিয়ে দেখি” (২৭ + ১৮ = ৪৫, ৮২ + ৪৩ = ১২৫: p.53's যোগ ও বিয়োগের সম্পর্ক); p.56 ৭৩ থেকে ১০০ (২৭) and ১২৭ in শতক, দশক, একক; p.60 the tree read backwards ((☐, ৩৯) → ৩৩). p.60's yellow example (৩☐৫ + ১২☐ = ৪৫৭), whose answer the page works out, is now in. p.69 has 10 fresh three-digit take-aways with borrowing (its (খ) ৭৯০ − ১০৫ borrows).");
  ctx.note("**p.65 changed type (same slug, same code):** it was a Sequence of the page's six steps, too few for 10 from its one example, so its steps are Multiple Choice questions now.");
  ctx.note("**p.60** the number trees (3), the zigzag (4) and the crosses (5) have no words in the book; the questions say them in words (5: the middle number is the sum of the four around it, ৩ + ৭ + ২ + ৫ = ১৭ and ৩ + ২ + ৪ + ৬ = ১৫, checked in code). The hidden-digit sums are asked one place at a time, with both boxes shown.");
  ctx.note("**p.69** the two ○ items (৬৭৩ + ১১৭ ○ ৬৭৩, ৭৯০ − ১০৫ ○ ৭৯০) are the children's “নতুন আসায় লোকসংখ্যা বেশি হবে” and “চলে যাওয়ায় লোকসংখ্যা কম হবে”; (খ) starts from (ক)'s ৭৯০, as the page does, and (গ) is played in two steps (৬৭৩ + ১১৭ − ১০৫ = ৭৯০ − ১০৫).");
};
