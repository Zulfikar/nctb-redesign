// অধ্যায় ৩ · গুণ, the pages that had no game yet: printed pp. 73, 74, 75, 78, 79, 80, 82, 85, 89, 91, 92, 95, 100.
// Every number is typed as the page prints it (ASCII digits; toBn shows Bangla) and every answer is computed. The book
// reads ৩ × ৪ as "৩ করে ৪ বার" (p.76): in each group × the groups, so ৫টি থালায় ৪টি করে = ৪ + ৪ + ৪ + ৪ + ৪ = ৪ × ৫.
"use strict";

module.exports = (ctx) => {
  const { add, wio, pairs, eqPairs, mcq, numQ, mulQ, finishQuestions, patternQ, gapQ, missingQ, range, calc, show, toBn, numIn, allNums, note } = ctx;
  const keyOf = (page, slug) => `m2-p${String(page).padStart(3, "0")}-${slug}`; // as build.js makes the keys
  const check = (ok, msg) => { if (!ok) throw new Error(`pages/p073-101.js: ${msg}`); };
  // build.js's Work It Out item makers (not in ctx), the same shapes
  const OPS = { "+": "+", "-": "−", "*": "×" };
  const sumsOf = (exprs, layout) => exprs.map((e) => {
    const m = e.replace(/\s+/g, "").match(/^(\d+)([+\-*])(\d+)$/);
    check(m, `sum ${e}`);
    return { kind: "sum", a: Number(m[1]), op: OPS[m[2]], b: Number(m[3]), layout };
  });
  const missingOf = (texts) => texts.map((t) => ({ kind: "missing", text: t.replace(/-/g, "−").replace(/\*/g, "×") }));
  const table = (n, from = 3) => range(from, 10).map((k) => `${n}*${k}`);
  // a Work It Out activity with guide notes (ctx.wio takes none): the same key, slug and fresh block as build.js's wio()
  const wioNotes = ({ page, slug, title, items, fresh, src, notes }) =>
    add({ page, slug: `wio-${slug}`, type: "work_it_out", title, content: { items }, configuration: fresh ? { fresh: { count: 10, ...fresh } } : {}, src, notes });

  // the plates, trays and bunches drawn as emoji: (🐟🐟🐟🐟) is one plate of ৪টি মাছ
  const pic = (emoji, each, n) => Array.from({ length: n }, () => `(${emoji.repeat(each)})`).join(" ");
  const rep = (each, n) => Array(n).fill(each).join("+"); // "4+4+4+4+4": each, n times (ASCII; show() writes it)

  // ── p.73 গুণের ধারণা: কয়টি থালায় কয়টি করে? and the গাণিতিক বাক্য (৪ + ৪ + ৪ + ৪ + ৪ = □) ──
  {
    const page = 73, slug = "plates-sentence", key = keyOf(page, slug);
    const FISH = { emoji: "🐟", name: "মাছ", each: 4, plates: 5 }, POTATO = { emoji: "🥔", name: "আলু", each: 3, plates: 5 }, APPLE = { emoji: "🍎", name: "আপেল", each: 2, plates: 5 };
    const say = (plates, each) => `${toBn(plates)}টি থালায় ${toBn(each)}টি করে`;
    const platesQ = (t) => {
      const q = mcq({
        prompt: `${pic(t.emoji, t.each, t.plates)} ${t.name} কয়টি থালায় কয়টি করে আছে?`,
        answer: say(t.plates, t.each), others: [say(t.each, t.plates), say(t.plates, t.each + 1)],
        why: `${toBn(t.plates)}টি থালা, প্রতিটি থালায় ${toBn(t.each)}টি ${t.name}: ${say(t.plates, t.each)} ${t.name} আছে।`,
      });
      const [p, e] = allNums(q.options[q.answer]);
      check(p === t.plates && e === t.each && (q.prompt.match(/\(/g) || []).length === t.plates, `p.73 ${t.name}`);
      return q;
    };
    const sentenceQ = (t) => mcq({
      prompt: `${say(t.plates, t.each)} ${t.name} আছে। ${t.name} গণনার গাণিতিক বাক্য কোনটি?`,
      answer: show(rep(t.each, t.plates)), others: [show(rep(t.each, t.plates - 1)), show(`${t.each}+${t.plates}`)],
      why: `${toBn(t.each)} কে ${toBn(t.plates)} বার যোগ করি: ${show(rep(t.each, t.plates))} = ${toBn(t.each * t.plates)}`,
      v: { product: t.each * t.plates },
    });
    const totalQ = (t) => numQ({ prompt: `${t.name}: ${show(rep(t.each, t.plates))} = কতটি ${t.name}?`, expr: rep(t.each, t.plates), unit: "টি", extra: [rep(t.each, t.plates - 1), rep(t.each, t.plates + 1)] });
    const BANANA = { emoji: "🍌", name: "কলা", each: 4, plates: 5 }; // the picture's fourth box
    const qs = [platesQ(FISH), platesQ(POTATO), sentenceQ(FISH), totalQ(FISH), sentenceQ(POTATO), totalQ(POTATO), platesQ(APPLE),
      sentenceQ(APPLE), totalQ(APPLE), platesQ(BANANA)];
    add({ page, slug, type: "mcq", title: "কয়টি থালায় কয়টি করে? গাণিতিক বাক্য", content: finishQuestions(key, qs), src: "p.73 (মাছ ও আলু কয়টি থালায় কয়টি করে আছে?: ৫টি থালায় ৪টি করে মাছ, ৩টি করে আলু; ৪ + ৪ + ৪ + ৪ + ৪, ৩ + ৩ + ৩ + ৩ + ৩; the picture's ২টি করে আপেল and ৪টি করে কলা)" });
  }

  // ── p.74 আপেল ও কলা কতগুলো আছে? (৫টি থালায় ২টি করে আপেল, ৪ ছড়ায় ৪টি করে কলা, a dot card under each): count by groups ──
  {
    const page = 74, slug = "count-plates-rapid", key = keyOf(page, slug);
    const APPLE = { emoji: "🍎", name: "আপেল", each: 2, plates: (n) => `${toBn(n)}টি থালায়` };
    const BANANA = { emoji: "🍌", name: "কলা", each: 4, plates: (n) => `${toBn(n)} ছড়ায়` };
    // the page's two pictures first, then p.75's ৬টি থালা; the other counts are new, with the same things
    const list = [[APPLE, 5], [BANANA, 4], [APPLE, 6], [APPLE, 3], [BANANA, 2], [APPLE, 7], [BANANA, 5], [APPLE, 9], [BANANA, 3], [BANANA, 6]];
    const qs = list.map(([t, n]) => {
      const ans = t.each * n;
      return mcq({
        prompt: `কতগুলো ${t.name}? ${pic(t.emoji, t.each, n)}`, answer: toBn(ans), others: [ans - t.each, ans + t.each].map(toBn),
        why: `${t.plates(n)} ${toBn(t.each)}টি করে: ${show(rep(t.each, n))} = ${toBn(ans)}`, v: { expr: rep(t.each, n), div: 1 },
      });
    });
    add({ page, slug, type: "rapid_quiz", title: "থালা দেখে গুনি · দ্রুত", content: finishQuestions(key, qs), src: "p.74 (৫টি থালায় ২টি করে আপেল, ৪ ছড়ায় ৪টি করে কলা), p.75 (৬টি থালা); ৩, ৭ and ৯ plates of apples, ২, ৩, ৫ and ৬ bunches of bananas are new" });
  }

  // ── p.75 কলা গণনার গাণিতিক বাক্য, and ২ যদি আমরা আরও ১টি থালা যুক্ত করি, তাহলে সেখানে কতগুলো আপেল হবে? ──
  {
    const page = 75, slug = "one-more-plate", key = keyOf(page, slug);
    // [thing, in each, plates, "৫টি থালার প্রত্যেকটিতে", "আরও ১টি থালা", "৬টি থালায়"]
    const onPlates = (name, each, n) => ({ name, each, n, where: `${toBn(n)}টি থালার প্রত্যেকটিতে`, more: "আরও ১টি থালা", after: `${toBn(n + 1)}টি থালায়` });
    const APPLE = onPlates("আপেল", 2, 5), POTATO = onPlates("আলু", 3, 5), FISH = onPlates("মাছ", 4, 5);
    const BANANA = { name: "কলা", each: 4, n: 4, where: `${toBn(4)} ছড়া কলার প্রত্যেক ছড়ায়`, more: "আরও ১ ছড়া কলা", after: `${toBn(4 + 1)} ছড়ায়` };
    const moreQ = (t, book) => numQ({
      prompt: book || `${t.where} ${toBn(t.each)}টি করে ${t.name} আছে। ${t.more} যুক্ত করলে কতগুলো ${t.name} হবে?`,
      expr: rep(t.each, t.n + 1), unit: "টি", extra: [rep(t.each, t.n), `${rep(t.each, t.n)}+1`],
      why: `${t.after} ${toBn(t.each)}টি করে: ${show(rep(t.each, t.n + 1))} = ${toBn(t.each * (t.n + 1))}`,
    });
    const sentenceQ = (prompt, each, n, wrong) => mcq({
      prompt, answer: show(rep(each, n)), others: wrong.map(show),
      why: `${toBn(each)} কে ${toBn(n)} বার যোগ করি: ${show(rep(each, n))} = ${toBn(each * n)}`, v: { product: each * n },
    });
    const qs = [
      moreQ(APPLE, `${APPLE.where} ${toBn(APPLE.each)}টি করে আপেল আছে। যদি আমরা আরও ১টি থালা যুক্ত করি, তাহলে সেখানে কতগুলো আপেল হবে?`),
      sentenceQ("আরও ১টি থালা যুক্ত করলে আপেল গণনার গাণিতিক বাক্য কোনটি?", APPLE.each, APPLE.n + 1, [rep(APPLE.each, APPLE.n), `${rep(APPLE.each, APPLE.n)}+1`]),
      sentenceQ(`${BANANA.where} ${toBn(BANANA.each)}টি করে কলা আছে। কলা গণনার গাণিতিক বাক্য কোনটি?`, BANANA.each, BANANA.n, [rep(BANANA.each, BANANA.n - 1), rep(BANANA.each, BANANA.n + 1)]),
      moreQ(BANANA),
      numQ({
        prompt: `${toBn(APPLE.n)}টি থালায় ${toBn(APPLE.each)}টি করে আপেল = ${toBn(APPLE.each * APPLE.n)}টি আপেল। আরও ১টি থালা যুক্ত করলে আপেল কয়টি বাড়বে?`,
        expr: `${APPLE.each * (APPLE.n + 1)}-${APPLE.each * APPLE.n}`, unit: "টি", extra: [1, APPLE.each * (APPLE.n + 1)],
        why: `প্রতিটি থালায় ${toBn(APPLE.each)}টি আপেল: ${toBn(APPLE.each * (APPLE.n + 1))} − ${toBn(APPLE.each * APPLE.n)} = ${toBn(APPLE.each)}`,
      }),
      moreQ(POTATO), moreQ(FISH),
      // the page's "______টি কলা"; then two more and one fewer plate of apples (new)
      numQ({ prompt: `কলা: ${show(rep(BANANA.each, BANANA.n))} = কতটি কলা?`, expr: rep(BANANA.each, BANANA.n), unit: "টি", extra: [rep(BANANA.each, BANANA.n - 1), rep(BANANA.each, BANANA.n + 1)] }),
      numQ({
        prompt: `${APPLE.where} ${toBn(APPLE.each)}টি করে আপেল আছে। আরও ২টি থালা যুক্ত করলে কতগুলো আপেল হবে?`, expr: rep(APPLE.each, APPLE.n + 2), unit: "টি", extra: [rep(APPLE.each, APPLE.n + 1), rep(APPLE.each, APPLE.n + 3), rep(APPLE.each, APPLE.n)],
        why: `${toBn(APPLE.n + 2)}টি থালায় ${toBn(APPLE.each)}টি করে: ${show(rep(APPLE.each, APPLE.n + 2))} = ${toBn(APPLE.each * (APPLE.n + 2))}`,
      }),
      numQ({
        prompt: `${APPLE.where} ${toBn(APPLE.each)}টি করে আপেল আছে। ১টি থালা সরিয়ে নিলে কতগুলো আপেল থাকবে?`, expr: rep(APPLE.each, APPLE.n - 1), unit: "টি", extra: [`${rep(APPLE.each, APPLE.n)}-1`, rep(APPLE.each, APPLE.n)],
        why: `${toBn(APPLE.n - 1)}টি থালায় ${toBn(APPLE.each)}টি করে: ${show(rep(APPLE.each, APPLE.n - 1))} = ${toBn(APPLE.each * (APPLE.n - 1))}`,
      }),
    ];
    add({ page, slug, type: "mcq", title: "আরও ১টি থালা যুক্ত করি", content: finishQuestions(key, qs), src: "p.75 (কলা গণনার গাণিতিক বাক্য ও ___টি কলা; ২: ৫টি থালায় ২টি করে আপেল, আরও ১টি থালা), the same question for কলা and p.73's আলু and মাছ; আরও ২টি থালা and ১টি থালা সরিয়ে নিলে are new" });
  }

  // ── p.78 ২ নিচের প্রত্যেক বস্তুর জন্য গুণের গাণিতিক বাক্য লিখি এবং গুণ করে উত্তর লিখি; ৫ এর গুণ: the টমেটো ──
  {
    const page = 78, slug = "mul-sentence", key = keyOf(page, slug);
    // (1) ৫টি ট্রেতে ৩টি করে বল; (2) ৫টি থালায় ৪টি করে আপেল; (3) ৪টি গোছায় ৪টি করে ফুল (read at 300–400 dpi); the টমেটো ask
    const P = [
      { emoji: "⚽", name: "বল", gen: "বলের", each: 3, n: 5, on: "ট্রের" },
      { emoji: "🍎", name: "আপেল", gen: "আপেলের", each: 4, n: 5, on: "থালার" },
      { emoji: "🌼", name: "ফুল", gen: "ফুলের", each: 4, n: 4, on: "গোছার" },
      { emoji: "🍅", name: "টমেটো", gen: "টমেটোর", each: 5, n: 4, on: "থালার", book: "ছবিতে ৪টি থালার প্রত্যেকটিতে ৫টি করে টমেটো আছে। একত্রে কতগুলো টমেটো আছে?" },
    ];
    const qs = [];
    for (const t of P) {
      const where = `${toBn(t.n)}টি ${t.on} প্রত্যেকটিতে ${toBn(t.each)}টি করে ${t.name}`;
      qs.push(mcq({
        prompt: `${pic(t.emoji, t.each, t.n)} ${t.gen} জন্য গুণের গাণিতিক বাক্য কোনটি?`,
        answer: show(`${t.each}*${t.n}`), others: [show(`${t.each}+${t.n}`), show(`${t.each}*${t.n - 1}`)],
        why: `${where}: ${toBn(t.each)} কে ${toBn(t.n)} বার যোগ করি, ${show(`${t.each}*${t.n}`)}`, v: { product: t.each * t.n },
      }));
      if (t.book) check(allNums(t.book).join() === [t.n, t.each].join(), "p.78 টমেটো");
      qs.push(mulQ(t.book || `${where} আছে। গুণ করে উত্তর লিখি: মোট কতগুলো ${t.name}?`, t.each, t.n, "টি"));
    }
    // what each number of the sentence stands for, in p.76's words (প্রত্যেক দলে বস্তুর সংখ্যা × দলের সংখ্যা = মোট বস্তুর সংখ্যা)
    const PARTS = ["প্রত্যেক দলে বস্তুর সংখ্যা", "দলের সংখ্যা", "মোট বস্তুর সংখ্যা"];
    const partQ = (t, which) => {
      const nums = [t.each, t.n, t.each * t.n], asked = nums[which];
      check(nums.filter((x) => x === asked).length === 1, `p.78 part ${asked}`);
      const sentence = `${show(`${t.each}*${t.n}`)} = ${toBn(t.each * t.n)}`;
      return mcq({
        prompt: `${toBn(t.n)}টি ${t.on} প্রত্যেকটিতে ${toBn(t.each)}টি করে ${t.name}: ${sentence}। এখানে ${toBn(asked)} কী বোঝায়?`,
        answer: PARTS[which], fixed: PARTS, why: `${sentence}: ${toBn(t.each)} প্রত্যেক দলে বস্তুর সংখ্যা, ${toBn(t.n)} দলের সংখ্যা, ${toBn(t.each * t.n)} মোট বস্তুর সংখ্যা।`,
      });
    };
    qs.push(partQ(P[0], 0), partQ(P[1], 1));
    add({ page, slug, type: "mcq", title: "ছবি দেখে গুণের গাণিতিক বাক্য", content: finishQuestions(key, qs), src: "p.78 ২ (১) ৫টি ট্রেতে ৩টি করে বল, (২) ৫টি থালায় ৪টি করে আপেল, (৩) ৪টি গোছায় ৪টি করে ফুল (read at 300–400 dpi), and ৫ এর গুণ: ৪টি থালায় ৫টি করে টমেটো; what ৩ and ৫ stand for, in p.76's words (new)" });
  }

  // ── p.79 ৫টি করে টমেটো: ৫ × ৩ = □, ৫ × ৪ = □; ২ যে কোনো ৫টি থালায়; থালা বাড়লে টমেটো কীভাবে বাড়ে? ──
  {
    const page = 79, slug = "plates-grow", key = keyOf(page, slug);
    const each = 5;
    const nextQ = (n) => numQ({
      prompt: `${show(`${each}*${n}`)} = ${toBn(each * n)} হলে ${show(`${each}*${n + 1}`)} = কত?`, expr: `${each * n}+${each}`, extra: [each * n + 1, each * n + 10],
      why: `থালা ১টি বাড়লে টমেটো ${toBn(each)}টি বাড়ে: ${toBn(each * n)} + ${toBn(each)} = ${toBn(each * (n + 1))}`,
    });
    const growth = mcq({
      prompt: "থালার সংখ্যা ১ করে বাড়লে টমেটোর সংখ্যা কীভাবে বাড়ে?",
      answer: `${toBn(each)} করে বাড়ে`, others: [1, each * 2].map((x) => `${toBn(x)} করে বাড়ে`),
      why: `প্রতিটি থালায় ${toBn(each)}টি টমেটো, তাই থালা ১টি বাড়লে টমেটো ${toBn(each)}টি বাড়ে।`,
    });
    check(numIn(growth.options[growth.answer]) === each * 6 - each * 5, "p.79 growth");
    const qs = [
      mulQ(`প্রতিটি থালায় ${toBn(each)}টি করে টমেটো আছে। যে কোনো ৫টি থালায় কতগুলো টমেটো আছে?`, each, 5, "টি"),
      numQ({ prompt: `${show(`${each}*2`)} = ${toBn(each * 2)}। আরও ১টি থালা দিলে কতগুলো টমেটো হবে?`, expr: `${each}*2+${each}`, unit: "টি", extra: [each * 2 + 1, each * 2 + 2], why: `৩টি থালা: ${show(`${each}*3`)} = ${show(`${each}*2+${each}`)} = ${toBn(each * 2)} + ${toBn(each)} = ${toBn(each * 3)}` }),
      nextQ(3), nextQ(5), growth, patternQ([5, 10, 15, 20]),
      // the page's own boxes (৫ × ৩ = □, ৫ × ৪ = □: ৩টি বা ৪টি থালায়), the table's gap, and one plate fewer (new)
      mulQ(`প্রতিটি থালায় ${toBn(each)}টি করে টমেটো আছে। ৩টি থালায় কতগুলো টমেটো আছে?`, each, 3, "টি"),
      mulQ(`প্রতিটি থালায় ${toBn(each)}টি করে টমেটো আছে। ৪টি থালায় কতগুলো টমেটো আছে?`, each, 4, "টি"),
      gapQ([each * 1, each * 2], [each * 4]),
      numQ({
        prompt: `${show(`${each}*3`)} = ${toBn(each * 3)} হলে ${show(`${each}*2`)} = কত?`, expr: `${each * 3}-${each}`, extra: [each * 3 - 1, each * 3 + each, each],
        why: `থালা ১টি কমলে টমেটো ${toBn(each)}টি কমে: ${toBn(each * 3)} − ${toBn(each)} = ${toBn(each * 2)}`,
      }),
    ];
    add({ page, slug, type: "mcq", title: "থালা বাড়লে টমেটো কীভাবে বাড়ে?", content: finishQuestions(key, qs), src: "p.79 ১–২ (৫ × ১ … ৫ × ৪: ৩টি বা ৪টি থালায়; যে কোনো ৫টি থালা) and the children's question: থালা বাড়লে টমেটো কীভাবে বাড়ে?; ৫ × ৬ and থালা ১টি কমলে are new" });
  }

  // ── p.80 ৫ এর গুণের নামতা শিখি (the L paper on the 100-dot sheet: ৫ × ৩ = ১৫, ৫ × ৮ = ৪০) ──
  wio({ page: 80, slug: "table-5", title: "৫ এর গুণ লিখি", items: sumsOf(table(5), "row"), fresh: { skill: "mul", table: 5 }, src: "p.80 ৫ এর গুণের নামতা (৫ × ৩ … ৫ × ১০; the L paper's ৫ × ৩ and ৫ × ৮)" });

  // ── p.82 ২ গুণের কার্ড দিয়ে খেলা করি: সামনে গুণ, পিছনে উত্তর; খেলা–১ (গুণ → উত্তর) and খেলা–২ (উত্তর → গুণ) ──
  {
    const page = 82, slug = "cards-rapid", key = keyOf(page, slug);
    const front = (a, b) => mcq({
      prompt: `সামনে গুণ: ${show(`${a}*${b}`)}। পিছনে উত্তর কত?`, answer: toBn(a * b), others: [a * (b - 1), a * (b + 1)].map(toBn),
      why: `${show(`${a}*${b}`)} = ${toBn(a * b)}`, v: { expr: `${a}*${b}`, div: 1 },
    });
    const back = (a, b) => mcq({ // the wrong cards are the neighbours in the same table: no two show the same product
      prompt: `পিছনে উত্তর: ${toBn(a * b)} (${toBn(a)} এর গুণের কার্ড)। সামনে কোন গুণ?`, answer: show(`${a}*${b}`), others: [b - 1, b + 1].map((k) => show(`${a}*${k}`)),
      why: `${show(`${a}*${b}`)} = ${toBn(a * b)}`, v: { product: a * b },
    });
    // the page's cards (২ × ৪ → ৮, ৫ × ৩ → ১৫, ১৮ → ২ × ৯) first; the others from the ৫ and ২ sets
    const qs = [front(2, 4), back(2, 9), front(5, 3), back(5, 8), front(5, 7), back(2, 7), front(2, 6), back(5, 5), front(5, 9), back(2, 8)];
    add({ page, slug, type: "rapid_quiz", title: "গুণের কার্ড খেলা · দ্রুত", content: finishQuestions(key, qs), src: "p.82 ২ গুণের কার্ড (২ × ৪ → ৮, ৫ × ৩ → ১৫, ১৮ → ২ × ৯) and খেলা–১, ২ with the ৫ and ২ sets" });
  }

  // ── p.85 ৩ এর গুণের নামতা শিখি (the L paper: ৩ × ৫ = ১৫, ৩ × ৮ = ২৪): the whole table, ten rows ──
  {
    const rows = ["3*5", "3*8", "3*2", "3*4", "3*6", "3*7", "3*9", "3*10", "3*1", "3*3"]; // the L paper's two first; the last two added for ten
    const content = eqPairs(rows, rows.length);
    check(content.pairs.length === rows.length, "p.85: a row was skipped");
    add({ page: 85, slug: "table-3", type: "equation_match", title: "৩ এর নামতা · মিলাও", content, src: "p.85 ৩ এর গুণের নামতা, all ten rows (the L paper's ৩ × ৫ and ৩ × ৮ first)" });
  }

  // ── p.89 ৬ এর গুণকে ২ এর ও ৪ এর গুণে সাজাতে পারি: ৬ × ৩ = ২ × ৩ + ৪ × ৩ = ৬ + ১২ = ১৮; ৬ × ৫ = ৩০ ──
  {
    // 6 × k = 2 × k + 4 × k with one number boxed; [k, which one is boxed]
    const FORM = {
      sum: (k) => [`2 * ${k} + 4 * ${k} = □`, 6 * k], whole: (k) => [`□ = 2 * ${k} + 4 * ${k}`, 6 * k],
      four: (k) => [`6 * ${k} = 2 * ${k} + □`, 4 * k], two: (k) => [`6 * ${k} = □ + 4 * ${k}`, 2 * k], k: (k) => [`6 * ${k} = 2 * ${k} + 4 * □`, k],
    };
    const asks = [[3, "sum"], [3, "four"], [5, "four"], [5, "two"], [4, "k"], [6, "four"], [7, "two"], [8, "k"], [9, "whole"], [10, "four"]]; // the page's ৬ × ৩ and ৬ × ৫ first
    const items = missingOf(asks.map(([k, f]) => FORM[f](k)[0]));
    items.forEach((it, i) => { // the box's one number is the one meant
      const [l, r] = it.text.split("=");
      const fits = range(0, 100).filter((x) => calc(l.replace("□", String(x))) === calc(r.replace("□", String(x))));
      check(fits.length === 1 && fits[0] === FORM[asks[i][1]](asks[i][0])[1], `p.89 ${it.text}`);
    });
    wioNotes({
      page: 89, slug: "split-6", title: "৬ এর গুণকে ২ ও ৪ এর গুণে সাজাই", items,
      src: "p.89 (৬ × ৩ = ২ × ৩ + ৪ × ৩ = ৬ + ১২ = ১৮; ৬ × ৫ = ৩০, যা ২ এর গুণ ও ৪ এর গুণের যোগফল) and the rest of the ৬ table split the same way",
      notes: [`৬ এর গুণকে ২ এর ও ৪ এর গুণে সাজাতে পারি: ${show("6*3")} = ${show("2*3+4*3")} = ${toBn(2 * 3)} + ${toBn(4 * 3)} = ${toBn(6 * 3)}।`],
    });
  }

  // ── p.91 ৭ এর গুণকে ৪ এর ও ৩ এর গুণে ভেঙ্গে দেখানো যায়: ৪ × ৫ = ২০, ৩ × ৫ = ১৫, ৩৫ ──
  {
    const ks = [5, 2, 3, 4, 6, 7, 8, 9, 1, 10]; // the page's ৭ × ৫ first; ৭ × ১ and ৭ × ১০ added for ten
    const rows = ks.map((k) => ({ left: show(`7*${k}`), right: show(`${4 * k}+${3 * k}`), _v: { kind: "eq" } }));
    check(new Set(ks.map((k) => 7 * k)).size === ks.length, "p.91: two pairs with the same product");
    add({
      page: 91, slug: "split-7", type: "equation_match", title: "৭ এর গুণ ভেঙ্গে দেখি · মিলাও", content: pairs(rows),
      src: "p.91 (৭ × ৫ = ৩৫: ৪ × ৫ = ২০, ৩ × ৫ = ১৫) and the rest of the ৭ table (৭ × ১ … ৭ × ১০) split the same way",
      notes: [`ডানে ৪ এর গুণ ও ৩ এর গুণের যোগফল: ${show("7*5")} = ${show("4*5+3*5")} = ${toBn(4 * 5)} + ${toBn(3 * 5)} = ${toBn(7 * 5)}।`],
    });
  }

  // ── p.92 ৮ এর গুণ: ৪৮ = ৮ × ৬ কে ৩ এর গুণ ও ৫ এর গুণে ভেঙ্গে দেখানো হলো: ৩ × ৬ = ১৮, ৫ × ৬ = ৩০, ১৮ + ৩০ = ৪৮ ──
  {
    const page = 92, slug = "split-8", key = keyOf(page, slug);
    const splitQ = (k) => mcq({
      prompt: `${show(`8*${k}`)} কে ৩ এর গুণ ও ৫ এর গুণে ভেঙ্গে লিখলে কোনটি হয়?`,
      answer: show(`3*${k}+5*${k}`), others: [`3*${k}+5*${k - 1}`, `3*${k - 1}+5*${k}`, `3*${k}+5`].map(show),
      why: `${show(`8*${k}`)} = ${show(`3*${k}+5*${k}`)} = ${toBn(3 * k)} + ${toBn(5 * k)} = ${toBn(8 * k)}`, v: { product: 8 * k },
    });
    const sumQ = (k) => numQ({
      prompt: `${show(`3*${k}`)} = ${toBn(3 * k)} এবং ${show(`5*${k}`)} = ${toBn(5 * k)}। তাহলে ${show(`8*${k}`)} = কত?`,
      expr: `${3 * k}+${5 * k}`, extra: [8 * k - 8, 8 * k + 8], why: `${show(`8*${k}`)} = ${show(`3*${k}+5*${k}`)} = ${toBn(3 * k)} + ${toBn(5 * k)} = ${toBn(8 * k)}`,
    });
    const qs = [
      splitQ(6), sumQ(6),
      numQ({ prompt: `${show("8*6")} = ${toBn(8 * 6)}। L কাগজ ১ কলাম ডানে সরালে ${show("8*7")} হয়। ${show("8*7")} = কত?`, expr: "8*6+8", extra: [8 * 6 + 1, 8 * 6 + 10], why: `১ কলামে ৮টি ডট বাড়ে: ${toBn(8 * 6)} + ৮ = ${toBn(8 * 7)}` }),
      splitQ(9), sumQ(8), sumQ(4),
      mulQ("৫টি বাক্সের প্রতিটিতে ৮টি করে চকলেট আছে। সেখানে কতগুলো চকলেট আছে?", 8, 5, "টি"),
      mulQ("একটি শ্রেণিকক্ষে প্রতিটি দলে ৮ জন করে শিক্ষার্থী আছে। যদি ৯টি দল থাকে, তবে সেখানে কতজন শিক্ষার্থী থাকবে?", 8, 9, " জন"),
    ];
    // "৪৮ = ৮ × ৬ এই গুণকে কোন কোন সংখ্যায় ভেঙ্গে দেখানো যায়?": only the page's pair (৩ ও ৫) makes ৮ among the options
    const twoTables = [[3, 5], [2, 4], [3, 4]], tablesText = ([a, b]) => `${toBn(a)} এর গুণ ও ${toBn(b)} এর গুণ`;
    check(twoTables.filter(([a, b]) => a + b === 8).length === 1 && twoTables[0][0] + twoTables[0][1] === 8, "p.92 two tables");
    qs.push(mcq({ prompt: `${toBn(8 * 6)} = ${show("8*6")} এই গুণকে কোন দুটি গুণে ভেঙ্গে দেখানো হলো?`, answer: tablesText(twoTables[0]), others: twoTables.slice(1).map(tablesText), why: `৩ + ৫ = ৮: ${show("8*6")} = ${show("3*6+5*6")} = ${toBn(3 * 6)} + ${toBn(5 * 6)} = ${toBn(8 * 6)}` }));
    qs.push(patternQ([8, 16, 24, 32])); // the ৮ table counted on: new
    add({ page, slug, type: "mcq", title: "৮ এর গুণ ভেঙ্গে দেখি", content: finishQuestions(key, qs), src: "p.92 (৪৮ = ৮ × ৬ = ৩ × ৬ + ৫ × ৬ = ১৮ + ৩০; the L paper from ৬ to ৭ columns; 1 চকলেট, 2 শিক্ষার্থী); ৮ × ৪, ৮ × ৮ and ৮ × ৯ split the same way; ৮, ১৬, ২৪, ৩২, … is new" });
  }

  // ── p.95 ১ এর গুণ: ২টি পেনসিল ও ১টি খাতা পুরস্কার, ৫টি শ্রেণি; ১ × ৩ ও ১ × ৭ এর যোগফল ১ × ১০; 1–2 ──
  {
    const page = 95, slug = "times-1", key = keyOf(page, slug);
    const prize = "প্রতি শ্রেণির বার্ষিক পরীক্ষায় প্রথম হওয়া শিক্ষার্থীকে";
    const benches = [5, 6, 8]; // 2: প্রথম, দ্বিতীয় ও তৃতীয় বেঞ্চে
    const all = benches.reduce((s, x) => s + x, 0);
    const qs = [
      mulQ(`${prize} ২টি পেনসিল পুরস্কার দেওয়া হবে। ৫টি শ্রেণির জন্য কতটি পেনসিল প্রয়োজন হবে?`, 2, 5, "টি পেনসিল"),
      mulQ(`${prize} ১টি খাতা পুরস্কার দেওয়া হবে। ৫টি শ্রেণির জন্য কতটি খাতা প্রয়োজন হবে?`, 1, 5, "টি খাতা"),
      mcq({ prompt: "৫টি শ্রেণির প্রতিটিতে ১টি করে খাতা। খাতার জন্য গুণের গাণিতিক বাক্য কোনটি?", answer: show("1*5"), others: ["5*5", "1+5"].map(show), why: `১ কে ৫ বার যোগ করি: ${show("1*5")} = ${toBn(1 * 5)}`, v: { product: 1 * 5 } }),
      numQ({ prompt: `${show("1*3+1*7")} = কত?`, expr: "1*3+1*7", extra: ["1*3", "1*7", 21] }),
      mcq({ prompt: `${show("1*3")} ও ${show("1*7")} এর যোগফল কোন গুণের সমান?`, answer: show("1*10"), others: ["1*4", "3*7"].map(show), why: `${show("1*3+1*7")} = ${toBn(1 * 3 + 1 * 7)} = ${show("1*10")}`, v: { product: 1 * 10 } }),
      numQ({ prompt: `${show("1*9")} = কত?`, expr: "1*9", extra: ["1+9", 1] }),
      mulQ("যদি আমরা প্রতিদিন ১ টাকা করে জমা করি, তবে ৮ দিনে কত টাকা জমা করতে পারব?", 1, 8, " টাকা"),
      numQ({
        prompt: "একটি শ্রেণির প্রথম বেঞ্চে ৫ জন, দ্বিতীয় বেঞ্চে ৬ জন এবং তৃতীয় বেঞ্চে ৮ জন ছাত্র আছে। প্রত্যেক ছাত্রকে ১ টাকা করে প্রদান করলে কত টাকা প্রয়োজন হবে?",
        expr: benches.map((b) => `1*${b}`).join("+"), unit: " টাকা", extra: [`${benches[0]}+${benches[1]}`, `${benches[1]}+${benches[2]}`],
        why: `${toBn(benches.join(" + "))} = ${toBn(all)} জন ছাত্র, প্রত্যেকে ১ টাকা: ${show(`1*${all}`)} = ${toBn(all)} টাকা`,
      }),
    ];
    check(allNums(qs[qs.length - 1].prompt).join() === [...benches, 1].join(), "p.95 2"); // ৫, ৬, ৮ জন and ১ টাকা
    // the page's other box (২ × □ = ___টি পেনসিল), and a box in the ১ table (new)
    qs.push(mcq({ prompt: "৫টি শ্রেণির প্রতিটিতে ২টি করে পেনসিল। পেনসিলের জন্য গুণের গাণিতিক বাক্য কোনটি?", answer: show("2*5"), others: ["5*5", "2+5"].map(show), why: `২ কে ৫ বার যোগ করি: ${show("2*5")} = ${toBn(2 * 5)}`, v: { product: 2 * 5 } }));
    qs.push(missingQ("1*?=6"));
    add({ page, slug, type: "mcq", title: "১ এর গুণ", content: finishQuestions(key, qs), src: "p.95 (পুরস্কার: ২টি পেনসিল ও ১টি খাতা, ৫টি শ্রেণি: ২ × □ ও □ × □; ১ এর গুণের নামতা; ১ × ৩ ও ১ × ৭ এর যোগফল ১ × ১০; 1–2); ১ × □ = ৬ is new" });
  }

  // ── p.100 নিজে করি ১ গুণের নামতার সাহায্যে খালি জায়গা পূরণ করি: the flowers (centre × inner petal = outer petal) ──
  {
    // [centre, the inner petals printed, two of them whose outer petal is empty]
    const FLOWERS = [
      [3, [4, 2, 5, 7, 6, 8, 3, 9], [8, 6]], // ৩ × ৯ = ২৭ and ৩ × ৭ = ২১ are filled in (the children's sums)
      [4, [5, 4, 8, 1, 3, 7, 6, 9, 2], [8, 9]], // ২০ and ২৮ filled
      [6, [2, 7, 3, 6, 1, 4, 8], [8, 6]], // ৪২ filled
      [7, [2, 9, 7, 3, 5, 4, 8, 6], [9, 6]], // ৪৯, ৫৬ filled
      [8, [7, 5, 2, 9, 6, 8, 1], [7, 9]], // ৬৪ filled
      [9, [3, 8, 4, 6, 9, 2, 5, 1, 7], [6, 9]], // ৩৬, ৪৫ filled
    ];
    const FILLED = { 3: [9, 7], 4: [5, 7], 6: [7], 7: [7, 8], 8: [8], 9: [4, 5] };
    const exprs = [];
    for (const [c, inner, asked] of FLOWERS) for (const k of asked) {
      check(inner.includes(k) && !FILLED[c].includes(k), `p.100 flower ${c}: ${k}`);
      exprs.push(`${c}*${k}`);
    }
    wioNotes({
      page: 100, slug: "flowers", title: "গুণের ফুল: খালি জায়গা পূরণ করি", items: sumsOf(exprs, "row"), fresh: { skill: "mul" },
      src: "p.100 ১ (the flowers ৩, ৪, ৬, ৭, ৮ and ৯: two empty outer petals of each)",
      notes: [`ফুলের মাঝের সংখ্যা দিয়ে ভিতরের পাপড়ির সংখ্যা গুণ করে বাইরের পাপড়িতে লিখি: ${show("3*9")} = ${toBn(3 * 9)}, ${show("3*7")} = ${toBn(3 * 7)}।`],
    });
  }

  // ── doubts for the README ──
  note("**p.73–78 pictures:** the multiple-choice and quick-count questions draw each plate (tray, bunch) as emoji in brackets, e.g. (🐟🐟🐟🐟) for one plate of ৪টি মাছ. In p.74's quick count only ৫টি থালায় ২টি করে আপেল, ৪ ছড়ায় ৪টি করে কলা and p.75's ৬টি থালা are printed; ৩ and ৭ plates of apples and ২ and ৫ bunches of bananas are new. p.75 asks “আরও ১টি থালা” for the apples only; the same question for কলা (১ ছড়া) and p.73's আলু and মাছ is new.");
  note("**p.78** exercise 2 (2)–(3), unclear at 150 dpi, read at 300–400 dpi: ৫টি থালায় ৪টি করে (the fruit looks like an apple; the page doesn't name it, the file says আপেল) and ৪টি গোছায় ৪টি করে ফুল (frangipani: 🌼; “গোছা” is mine). (1) is ৫টি ট্রেতে ৩টি করে বল (“ট্রে” as p.84 says).");
  note("**p.79** stops at ৫টি থালা; “৫ × ৫ = ২৫ হলে ৫ × ৬ = কত?” goes one plate further, to the table on p.80, and “৫ × ৩ = ১৫ হলে ৫ × ২ = কত?” (one plate fewer) is new.");
  note("**At least 10 questions (3 Nov):** to reach ten, the games first took the page's other exercises and pictures (p.73's apples and bananas, p.75's “___টি কলা”, p.79's ৩টি বা ৪টি থালা, p.85's whole ৩ table, p.92's problem 2 and “কোন কোন সংখ্যায় ভেঙ্গে দেখানো যায়?”, p.95's ২ × □ পেনসিল); the rest are new, in the same style: p.74 ৯ plates of apples and ৩ and ৬ bunches of bananas; p.75 আরও ২টি থালা and ১টি থালা সরিয়ে নিলে; p.78 what ৩ and ৫ stand for in ৩ × ৫ and ৪ × ৫, in p.76's words (প্রত্যেক দলে বস্তুর সংখ্যা, দলের সংখ্যা, মোট বস্তুর সংখ্যা); p.79 the gap ৫, ১০, ☐, ২০; p.91 ৭ × ১ (৪ + ৩) and ৭ × ১০ (৪০ + ৩০) split like ৭ × ৫; p.92 ৮, ১৬, ২৪, ৩২, …; p.95 ১ × ☐ = ৬.");
  note("**p.82** describes card games for one and for two; the rapid quiz plays খেলা–১ (গুণ → উত্তর) and খেলা–২ (উত্তর → গুণ) alone, with the page's three cards (২ × ৪, ৫ × ৩, ১৮) and others from the ২ and ৫ sets. A খেলা–২ card's wrong options are its neighbours in the same table, so no two options make the same product.");
  note("**p.89, p.91, p.92 splits:** each page splits one or two products (৬ × ৩ and ৬ × ৫ into the ২ and ৪ tables; ৭ × ৫ into ৪ and ৩; ৮ × ৬ into ৩ and ৫); the games split other rows of the same table the same way. p.91's match puts ৭ × ৫ on the left and ২০ + ১৫ (৪ × ৫ + ৩ × ৫) on the right, as the boy's sum does; a guide note says so.");
  note("**p.95** asks “কতটি পুরস্কার” for ৫টি শ্রেণি (২টি পেনসিল ও ১টি খাতা each), which could be read as ৫ prizes or ১৫ things; the game asks the pencils (২ × ৫) and the খাতা (১ × ৫) apart, as the page's two boxes do.");
  note("**p.100** flowers: the inner rings of ৩, ৬, ৭ and ৮ have one or two empty pieces with nothing to multiply; the game uses only printed inner numbers, two empty outer petals of each flower, and leaves out the petals the page fills in (২৭, ২১, ২০, ২৮, ৪২, ৪৯, ৫৬, ৬৪, ৩৬, ৪৫). Its fresh problems are mixed tables (২–১০).");
};
