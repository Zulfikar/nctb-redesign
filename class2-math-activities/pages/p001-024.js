// 3 Nov 2026 · a game for every page: printed pages 1–24 (অধ্যায় ১ · সংখ্যা ও স্থানীয় মান).
// Pages without a game before: 3, 6, 8, 9, 10, 12, 14, 15, 17, 18, 19, 22. Every number is typed as the page prints it
// (ASCII digits; toBn() shows Bangla), every answer is computed, and each game is checked here before build.js's own
// checkShape() and verify(). Printed page = PDF page − 9.
"use strict";
module.exports = (ctx) => {
  const { add, wio, mcq, numQ, finishQuestions, cmpQ, compareWhy, placeValueText, fromPlaceValue, toBn, inWords, PLACE, ORD } = ctx;
  const keyOf = (page, slug) => `m2-p${String(page).padStart(3, "0")}-${slug}`; // as build.js makes the key
  const nfc = (s) => String(s).normalize("NFC");
  const must = (ok, msg) => { if (!ok) throw new Error(`p001-024: ${msg}`); };
  const digitsOf = (n) => String(n).split("").map(Number);
  const reversed = (n) => Number(String(n).split("").reverse().join(""));
  const countIn = (list, v) => list.filter((x) => x === v).length;
  // the ones in words (class 1), for wrong options only; checked against the book's hundreds (একশত, তিনশত, পাঁচশত …)
  const ONES = ["", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়"];
  for (const h of [1, 3, 5, 6, 8, 9]) must(nfc(`${ONES[h]}শত`) === nfc(inWords(h * 100)), `ONES[${h}]`);
  // a count question: "কয়টি …?" → "৪টি", with the counts next to it as wrong options
  const countQ = (prompt, n, why) => numQ({ prompt, expr: String(n), unit: "টি", extra: [n - 1, n + 1, n + 2, n + 3].filter((x) => x > 0), why });
  // a three-digit number in words: the book's (inWords: একশত, তিনশত, পাঁচশত, ছয়শত, আটশত, নয়শত) or, for দুইশত, চারশত and
  // সাতশত (not printed in the book), made the same way from the ones (তিন + শত = তিনশত)
  const wordsOf = (n) => {
    if (n <= 100 || [1, 3, 5, 6, 8, 9].includes(Math.floor(n / 100))) return inWords(n);
    const h = Math.floor(n / 100), r = n % 100;
    return r ? `${ONES[h]}শত ${inWords(r)}` : `${ONES[h]}শত`;
  };

  // ── p.3: the table 31–36 (গণনা করি · পড়ি (অঙ্কে) · পড়ি (কথায়) · কথায় লিখি). p.2's game already matches 29–36 with
  // their words; this one counts the blocks (৩টি ১০ এর ব্লক and the ones) and picks each number's word among the words
  // that sound alike (the same ones in the tens either side, and the digits the other way round). ──
  {
    const key = keyOf(3, "blocks-words");
    const blockQ = (n) => {
      const [t, o] = digitsOf(n);
      return numQ({
        prompt: `১০ এর ব্লক আছে ${toBn(t)}টি ও ১ এর ব্লক আছে ${toBn(o)}টি। সংখ্যাটি অঙ্কে কত?`, expr: `${t}*10+${o}`, extra: [reversed(n), t + o],
        why: `১০ এর ব্লক ${toBn(t)}টি = ${toBn(t * 10)}, ১ এর ব্লক ${toBn(o)}টি = ${toBn(o)}। সংখ্যাটি ${toBn(n)} (${inWords(n)})।`,
      });
    };
    const wordQ = (n) => mcq({
      prompt: `${toBn(n)} কথায় কী লিখি?`, answer: inWords(n), others: [n - 10, n + 10, reversed(n)].filter((x) => x !== n && x >= 21 && x <= 100).map(inWords),
      why: `${toBn(n)} পড়ি ও লিখি: ${inWords(n)}।`,
    });
    // পড়ি (কথায়) → পড়ি (অঙ্কে): the word, and the number among those whose words sound alike
    const readQ = (n) => numQ({ prompt: `${inWords(n)} অঙ্কে কত?`, expr: String(n), extra: [n - 10, n + 10, reversed(n)].filter((x) => x !== n), why: `${inWords(n)} = ${toBn(n)} (১০ এর ব্লক ${toBn(Math.floor(n / 10))}টি ও ১ এর ব্লক ${toBn(n % 10)}টি)।` });
    // row by row: each row's blocks, its number and its word (the six rows, every column asked at least once)
    const qs = [blockQ(31), wordQ(31), wordQ(32), blockQ(33), readQ(33), wordQ(34), blockQ(35), readQ(35), wordQ(36), blockQ(36)];
    add({ page: 3, slug: "blocks-words", type: "mcq", title: "ব্লক গুনি ও কথায় লিখি (৩১–৩৬)", content: finishQuestions(key, qs), src: "p.3 table (৩১–৩৬): blocks → number (৩১, ৩৩, ৩৫, ৩৬), number → words (৩১, ৩২, ৩৪, ৩৬), words → number (৩৩, ৩৫)" });
  }

  // ── p.6: the table ৫১–১০০ পড়ি ও কথায় লিখি. p.7's game matches ৫৯, ৮৭, ৭৫, ৯৩, ৮৯, ৮৬, ৯৯, ১০০; this one is a quick
  // round on ten other numbers of the table, each word against the words with the same ones in the tens either side. ──
  {
    const key = keyOf(6, "words-rapid");
    const nums = [53, 58, 62, 64, 68, 71, 73, 79, 82, 96]; // one or two from every column of the p.6 table
    const qs = nums.map((n) => {
      const others = [n - 10, n + 10, n - 20].filter((x) => x >= 21 && x <= 100).slice(0, 2);
      return mcq({ prompt: `${toBn(n)} কথায় কী?`, answer: inWords(n), others: others.map(inWords), why: `${toBn(n)} = ${inWords(n)}` });
    });
    add({ page: 6, slug: "words-rapid", type: "rapid_quiz", title: "কথায় লিখি (৫১–১০০) · দ্রুত", content: finishQuestions(key, qs), src: "p.6 table (৫৩, ৫৮, ৬২, ৬৪, ৬৮, ৭১, ৭৩, ৭৯, ৮২, ৯৬: none of them in p.7's game)" });
  }

  // ── p.8: ছবিতে কতগুলো ফুল আছে? চলো আমরা ১০ এর দল গঠন করে গণনা করি। (p.9 counts them: ১০ এর ব্লক ৫টি ও ১ এর ব্লক ৪টি) ──
  {
    const key = keyOf(8, "roses-tens");
    const tens = 5, ones = 4, total = tens * 10 + ones; // the roses, as p.9 counts them
    const intro = `ছবির ফুলগুলো ১০টি করে দলে সাজালাম: ${toBn(tens)}টি দল হলো, আর ${toBn(ones)}টি ফুল বাকি রইল।`;
    const byTens = Array.from({ length: tens }, (_, i) => toBn((i + 1) * 10)).join(", ");
    const qs = [
      numQ({ prompt: `${intro} একটি দলে কয়টি ফুল?`, expr: "10", unit: "টি", extra: [tens, ones, 1], why: "চলো আমরা ১০ এর দল গঠন করে গণনা করি: প্রতিটি দলে ১০টি ফুল।" }),
      numQ({ prompt: `${intro} ${toBn(tens)}টি দলে কয়টি ফুল?`, expr: `10*${tens}`, unit: "টি", extra: [10 + tens, tens, tens * 10 + tens], why: `১০ করে গুনি: ${byTens}। ${toBn(tens)}টি দলে ${toBn(tens * 10)}টি ফুল।` }),
      numQ({ prompt: `${intro} মোট কতগুলো ফুল?`, expr: `10*${tens}+${ones}`, unit: "টি", extra: [reversed(total), tens + ones, tens * 10], why: `${toBn(tens)}টি দলে ${toBn(tens * 10)}টি, আর ${toBn(ones)}টি: মোট ${toBn(total)}টি ফুল (${inWords(total)})।` }),
      numQ({ prompt: `${toBn(total)}টি ফুল ১০টি করে দলে সাজালে কয়টি দল হবে?`, expr: String(Math.floor(total / 10)), unit: "টি", extra: [tens - 1, tens + 1, total], why: `${toBn(total)} এর মধ্যে ${toBn(tens * 10)}টি ফুলে ১০টি করে ${toBn(tens)}টি দল।` }),
      numQ({ prompt: `${toBn(total)}টি ফুল ১০টি করে দলে সাজালে কয়টি ফুল বাকি থাকবে?`, expr: String(total % 10), unit: "টি", extra: [tens, 10 + ones, ones - 1], why: `${toBn(tens)}টি দলে ${toBn(tens * 10)}টি ফুল; ${toBn(total)} থেকে ${toBn(tens * 10)} বাদে ${toBn(ones)}টি ফুল বাকি।` }),
    ];
    // the same counting with p.7 নিজে করি 1's numbers (২৪, ৮৭, ৭৫, ৯৩, ১০০): the total from the groups, or the groups and
    // the flowers left from the total
    const totalQ = (n) => {
      const g = Math.floor(n / 10), r = n % 10;
      return numQ({ prompt: `ফুলগুলো ১০টি করে দলে সাজালাম: ${toBn(g)}টি দল হলো, আর ${toBn(r)}টি ফুল বাকি রইল। মোট কতগুলো ফুল?`, expr: `10*${g}+${r}`, unit: "টি", extra: [reversed(n), g + r, g * 10], why: `${toBn(g)}টি দলে ${toBn(g * 10)}টি, আর ${toBn(r)}টি: মোট ${toBn(n)}টি ফুল (${inWords(n)})।` });
    };
    const groupsQ = (n) => {
      const g = Math.floor(n / 10), r = n % 10;
      return numQ({ prompt: `${toBn(n)}টি ফুল ১০টি করে দলে সাজালে কয়টি দল হবে?`, expr: String(g), unit: "টি", extra: [r || 1, g - 1, g + 1, n].filter((x) => x !== g && x > 0), why: r ? `${toBn(n)} এর মধ্যে ${toBn(g * 10)}টি ফুলে ১০টি করে ${toBn(g)}টি দল, আর ${toBn(r)}টি বাকি।` : `১০ করে গুনি: ১০, ২০, … ${toBn(n)}। ${toBn(g)}টি দল, কোনো ফুল বাকি থাকে না।` });
    };
    const leftQ = (n) => {
      const g = Math.floor(n / 10), r = n % 10;
      return numQ({ prompt: `${toBn(n)}টি ফুল ১০টি করে দলে সাজালে কয়টি ফুল বাকি থাকবে?`, expr: String(r), unit: "টি", extra: [g, 10 + r, r + 1], why: `${toBn(g)}টি দলে ${toBn(g * 10)}টি ফুল; ${toBn(n)} থেকে ${toBn(g * 10)} বাদে ${toBn(r)}টি ফুল বাকি।` });
    };
    qs.push(totalQ(24), groupsQ(87), leftQ(75), totalQ(93), groupsQ(100));
    ctx.note("**p.8** has one picture (৫৪টি ফুল, counted on p.9). Its game asks the ১০ এর দল idea five ways for ৫৪, then five more times with p.7 নিজে করি 1's numbers (২৪, ৮৭, ৭৫, ৯৩, ১০০) as flowers: the number of flowers in those five is mine.");
    add({ page: 8, slug: "roses-tens", type: "mcq", title: "১০ এর দল করে ফুল গুনি", content: finishQuestions(key, qs), src: "p.8 (ছবিতে কতগুলো ফুল আছে? ১০ এর দল গঠন করে গণনা); the count ৫৪ = ৫টি দশ ও ৪টি এক is p.9's; then the same with p.7 নিজে করি 1's ২৪, ৮৭, ৭৫, ৯৩, ১০০" });
  }

  // ── p.9: ফুলের পরিবর্তে ব্লক (১০ এর ব্লক ৫টি ও ১ এর ব্লক ৪টি: চুয়ান্ন, ৫৪); নিচে কতগুলো কাঠি আছে? (৩১টি বান্ডিল ও ৫টি
  // খোলা কাঠি, counted at 300 dpi; 9 + 9 + 9 + 4 bundles), and the same in blocks (৩১টি ১০ এর ব্লক ও ৫টি ১ এর ব্লক) ──
  {
    const key = keyOf(9, "blocks-sticks");
    const n54 = 5 * 10 + 4;
    const bundles = 9 + 9 + 9 + 4, loose = 5, sticks = bundles * 10 + loose;
    const hundredGroups = Math.floor(bundles / 10), tensLeft = bundles % 10;
    const blk = (t, o) => (o ? `${toBn(t)}টি ১০ এর ব্লক ও ${toBn(o)}টি ১ এর ব্লক` : `${toBn(t)}টি ১ এর ব্লক`);
    const hto = (h, t, o) => `${toBn(h)} শত ${toBn(t)} দশ ${toBn(o)} এক`;
    const bdl = (b, l) => `${toBn(b)}টি বান্ডিল ও ${toBn(l)}টি খোলা কাঠি`;
    // the page's idea with p.7 নিজে করি 1's numbers: sticks in bundles of ১০ (৪৭), and bundling ৩২ sticks
    const n47 = [4, 7], n32 = 32, b32 = Math.floor(n32 / 10), l32 = n32 % 10;
    const qs = [
      mcq({ prompt: "১০ এর ব্লক আছে ৫টি ও ১ এর ব্লক আছে ৪টি। সংখ্যাটি কথায় কী?", answer: inWords(n54), others: [n54 - 10, reversed(n54), n54 + 10].map(inWords), why: `৫টি ১০ এর ব্লক ও ৪টি ১ এর ব্লক: সংখ্যাটি হলো ${inWords(n54)}, অঙ্কে ${toBn(n54)}।` }),
      numQ({ prompt: "১০ এর ব্লক আছে ৫টি ও ১ এর ব্লক আছে ৪টি। সংখ্যাটি অঙ্কে কত?", expr: "5*10+4", extra: [reversed(n54), 5 + 4, n54 + 1], why: `১০ এর ব্লক ৫টি = ৫০, ১ এর ব্লক ৪টি = ৪: অঙ্কে লিখতে পারি ${toBn(n54)}।` }),
      mcq({
        prompt: `কাঠির ${toBn(bundles)}টি বান্ডিল ও ${toBn(loose)}টি খোলা কাঠি আছে। কাঠির পরিবর্তে কোন ব্লকগুলো নিই?`,
        answer: blk(bundles, loose), others: [blk(loose, bundles), blk(bundles + loose, 0), blk(hundredGroups, 10 + loose)],
        why: `একটি বান্ডিলে ১০টি কাঠি, তাই প্রতিটি বান্ডিলের পরিবর্তে একটি ১০ এর ব্লক: ${blk(bundles, loose)}।`,
      }),
      numQ({ prompt: "১০টি ১০ এর ব্লক মিলে কত?", expr: "10*10", extra: [20, 110, 90], why: "১০ করে গুনি: ১০, ২০, ৩০, ৪০, ৫০, ৬০, ৭০, ৮০, ৯০, ১০০। ১০টি ১০ এর ব্লক মিলে ১০০।" }),
      numQ({ prompt: `কাঠির ${toBn(bundles)}টি বান্ডিলে (প্রতিটিতে ১০টি কাঠি) কতগুলো কাঠি?`, expr: `${bundles}*10`, unit: "টি", extra: [bundles, bundles * 10 + 10, hundredGroups * 100 + tensLeft], why: `${toBn(hundredGroups * 10)}টি বান্ডিলে ${toBn(hundredGroups * 100)}টি, আর ${toBn(tensLeft)}টি বান্ডিলে ${toBn(tensLeft * 10)}টি: ${toBn(bundles * 10)}টি কাঠি।` }),
      numQ({ prompt: `${toBn(bundles)}টি ১০ এর ব্লক থেকে কয়টি ১০০ এর দল বানানো যায়?`, expr: String(hundredGroups), unit: "টি", extra: [tensLeft, bundles, hundredGroups + 1], why: `${toBn(hundredGroups * 10)}টি ১০ এর ব্লকে ${toBn(hundredGroups)}টি ১০০ এর দল হয়, আর ${toBn(tensLeft)}টি ১০ এর ব্লক বাকি থাকে।` }),
      mcq({
        prompt: `${blk(bundles, loose)}: কয় শত, কয় দশ ও কয় এক?`, answer: hto(hundredGroups, tensLeft, loose),
        others: [hto(tensLeft, hundredGroups, loose), hto(hundredGroups, loose, tensLeft), hto(loose, tensLeft, hundredGroups)],
        why: `${toBn(hundredGroups * 10)}টি ১০ এর ব্লকে ${toBn(hundredGroups)} শত, বাকি ${toBn(tensLeft)}টি ১০ এর ব্লক ${toBn(tensLeft)} দশ, আর ${toBn(loose)}টি ১ এর ব্লক ${toBn(loose)} এক।`,
      }),
      numQ({
        prompt: `কাঠির ${toBn(bundles)}টি বান্ডিল (প্রতিটিতে ১০টি কাঠি) ও ${toBn(loose)}টি খোলা কাঠি আছে। মোট কতগুলো কাঠি?`, expr: `${bundles}*10+${loose}`, unit: "টি",
        extra: [bundles + loose, reversed(sticks), sticks + 10],
        why: `${toBn(hundredGroups * 10)}টি বান্ডিলে ${toBn(hundredGroups * 100)}টি, ${toBn(tensLeft)}টি বান্ডিলে ${toBn(tensLeft * 10)}টি, আর ${toBn(loose)}টি খোলা কাঠি: মোট ${toBn(sticks)}টি।`,
      }),
      numQ({ prompt: `কাঠির ${toBn(n47[0])}টি বান্ডিল (প্রতিটিতে ১০টি কাঠি) ও ${toBn(n47[1])}টি খোলা কাঠি আছে। মোট কতগুলো কাঠি?`, expr: `${n47[0]}*10+${n47[1]}`, unit: "টি", extra: [n47[1] * 10 + n47[0], n47[0] + n47[1], n47[0] * 10 + n47[1] + 10], why: `${toBn(n47[0])}টি বান্ডিলে ${toBn(n47[0] * 10)}টি, আর ${toBn(n47[1])}টি খোলা কাঠি: মোট ${toBn(n47[0] * 10 + n47[1])}টি।` }),
      mcq({ prompt: `${toBn(n32)}টি কাঠি থেকে ১০টি করে কাঠি গণনা করে বান্ডিল তৈরি করি। কী হবে?`, answer: bdl(b32, l32), others: [bdl(l32, b32), bdl(b32, l32 + 1), bdl(b32 + 1, l32)], why: `১০, ২০, ৩০: ${toBn(b32)}টি বান্ডিলে ${toBn(b32 * 10)}টি কাঠি; ${toBn(n32)} থেকে ${toBn(b32 * 10)} বাদে ${toBn(l32)}টি খোলা কাঠি।` }),
    ];
    add({ page: 9, slug: "blocks-sticks", type: "mcq", title: "ব্লক ও কাঠি দিয়ে গুনি", content: finishQuestions(key, qs), src: "p.9 (১০ এর ব্লক ৫টি ও ১ এর ব্লক ৪টি = চুয়ান্ন, ৫৪; ৩১টি বান্ডিল ও ৫টি খোলা কাঠি = ৩১টি ১০ এর ব্লক ও ৫টি ১ এর ব্লক); then bundles with p.7 নিজে করি 1's ৪৭ and ৩২" });
    ctx.note("**p.9** asks “নিচে কতগুলো কাঠি আছে?” without printing the answer: 9 + 9 + 9 + 4 = ৩১টি বান্ডিল and ৫টি খোলা কাঠি (counted at 300 dpi; the blocks below are ৩১টি ১০ এর ব্লক ও ৫টি ১ এর ব্লক). The game works out ৩১৫ (= ৩ শত ১ দশ ৫ এক) with p.10's idea (১০টি ১০ = ১০০), one page before the book teaches it.");
  }

  // ── p.10: ব্লকের মাধ্যমে ১০০ ও ১০ এর দল তৈরি করে গণনা করি (তিনটি একশত এর দল তিনশত · চারটি দশ এর দল চল্লিশ · একটি করে
  // পাঁচটি ব্লক পাঁচ → ৩৪৫, তিনশত পঁয়তাল্লিশ) and ব্লকের সংখ্যা অঙ্কে লিখি (২ শত, ৩ দশ, ৬ এক) ──
  {
    const key = keyOf(10, "hundreds");
    const [h, t, o] = digitsOf(345);
    const n = h * 100 + t * 10 + o;
    must(n === 345 && nfc(inWords(n)) === nfc("তিনশত পঁয়তাল্লিশ"), "p.10 345");
    const ex = [2, 3, 6], exN = ex[0] * 100 + ex[1] * 10 + ex[2]; // ব্লকের সংখ্যা অঙ্কে লিখি
    const qs = [
      mcq({ prompt: "তিনটি একশত এর দল মিলে কত?", answer: inWords(h * 100), others: [inWords(h * 10), ONES[h]], why: `তিনটি একশত এর দল: ${inWords(h * 100)} (${toBn(h * 100)})।` }),
      mcq({ prompt: "চারটি দশ এর দল মিলে কত?", answer: inWords(t * 10), others: [ONES[t], `${ONES[t]}শত`], why: `চারটি দশ এর দল: ${inWords(t * 10)} (${toBn(t * 10)})।` }),
      mcq({ prompt: "একটি করে পাঁচটি ব্লক মিলে কত?", answer: ONES[o], others: [inWords(o * 10), inWords(o * 100)], why: `একটি করে পাঁচটি ব্লক: ${ONES[o]} (${toBn(o)})।` }),
      numQ({ prompt: `শত এর দল ${toBn(h)}টি, দশ এর দল ${toBn(t)}টি ও এক ${toBn(o)}টি। মোট ব্লকের সংখ্যা অঙ্কে কত?`, expr: `${h}*100+${t}*10+${o}`, extra: [reversed(n), h * 100 + o * 10 + t, h + t + o], why: `শত ${toBn(h)}, দশ ${toBn(t)}, এক ${toBn(o)}: ${toBn(n)}।` }),
      mcq({ prompt: `${toBn(n)} কথায় কী?`, answer: inWords(n), others: [h * 100 + o * 10 + t, reversed(n), o * 100 + h * 10 + t].map(inWords), why: `${toBn(n)} = ${inWords(n)} (শত ${toBn(h)}, দশ ${toBn(t)}, এক ${toBn(o)})।` }),
      numQ({ prompt: `ব্লকের সংখ্যা অঙ্কে লিখি: শত এর দল ${toBn(ex[0])}টি, দশ এর দল ${toBn(ex[1])}টি ও এক ${toBn(ex[2])}টি। সংখ্যাটি কত?`, expr: `${ex[0]}*100+${ex[1]}*10+${ex[2]}`, extra: [reversed(exN), ex[1] * 100 + ex[0] * 10 + ex[2], ex[0] + ex[1] + ex[2]], why: `শত ${toBn(ex[0])}, দশ ${toBn(ex[1])}, এক ${toBn(ex[2])}: ${toBn(exN)}।` }),
    ];
    // the table the other way: a number → its শত, দশ, এক (৩৪৫, the page's)
    const parts = (a, b, c) => `শত ${toBn(a)}, দশ ${toBn(b)}, এক ${toBn(c)}`;
    qs.push(mcq({ prompt: `${toBn(n)} এ শত, দশ ও এক কয়টি করে?`, answer: parts(h, t, o), others: [parts(o, t, h), parts(h, o, t), parts(t, h, o)], why: `${toBn(n)}: শত এর দল ${toBn(h)}টি, দশ এর দল ${toBn(t)}টি, আর এক ${toBn(o)}টি।` }));
    // more blocks to count, with p.13's numbers (৩০৪, ৭৫০, ১৩৪): a place with no blocks is written ০
    const groupsText = (a, b, c) => [`শত এর দল ${toBn(a)}টি`, b ? `দশ এর দল ${toBn(b)}টি` : "দশ এর দল নেই", c ? `এক ${toBn(c)}টি` : "এক নেই"].join(", ");
    const blocksQ = (m) => {
      const [a, b, c] = digitsOf(m);
      return numQ({ prompt: `ব্লকের সংখ্যা অঙ্কে লিখি: ${groupsText(a, b, c)}। সংখ্যাটি কত?`, expr: `${a}*100+${b}*10+${c}`, extra: [Number(String(m).replace(/0/g, "")), reversed(m), a * 100 + c * 10 + b].filter((x) => x !== m), why: `শত ${toBn(a)}, দশ ${toBn(b)}, এক ${toBn(c)}: ${toBn(m)}${b && c ? "" : " (যে ঘরে ব্লক নেই, সেখানে ০)"}।` });
    };
    qs.push(blocksQ(304), blocksQ(750), blocksQ(134));
    ctx.note("**p.10** has two numbers (৩৪৫, ২৩৬); its game adds blocks for three of p.13's numbers (৩০৪, ৭৫০, ১৩৪: two with an empty place, written ০), as on p.10 but not on it. **p.9** likewise adds sticks for p.7's ৪৭ and ৩২. **p.12** adds p.11 নিজে করি 3's notes (৪টি ১০০, ৫টি ১০, ২টি ১ টাকা = ৪৫২), which p.11's own game doesn't use, and ৫৫৪ টাকা in words; its wrong options say চারশত পঞ্চান্ন, a word the book doesn't print (made like its তিনশত, পাঁচশত).");
    add({ page: 10, slug: "hundreds", type: "mcq", title: "শত, দশ ও এক এর দল গুনি", content: finishQuestions(key, qs), src: "p.10 (তিনশত, চল্লিশ, পাঁচ → ৩৪৫, তিনশত পঁয়তাল্লিশ, and back; ব্লকের সংখ্যা অঙ্কে লিখি: ২ শত ৩ দশ ৬ এক); then blocks for p.13's ৩০৪, ৭৫০, ১৩৪" });
  }

  // ── p.12 নিজে করি: 1 কতটি ১০০, ১০ ও ১ এর কার্ড আছে তা গণনা করি (the cards in the book's order), সংখ্যা কার্ডগুলো সাজাই ও
  // অঙ্কে লিখি; 2 the notes (১ টাকা with the deer, ১০ টাকা pink, ১০০ টাকা blue; read at 300 dpi), কত টাকা হলো তা অঙ্কে লিখি ──
  {
    const key = keyOf(12, "cards-money");
    const CARDS = [100, 10, 1, 100, 10, /**/ 10, 1, 100, 10, 100, /**/ 100, 10, 1, 100, /**/ 100, 1, 10, 1];
    const NOTES = [1, 1, 1, 10, 10, 10, /**/ 10, 100, 100, 1, 100, /**/ 100, 100, 10];
    const cards = `কার্ডগুলো: ${CARDS.map(toBn).join(", ")}।`;
    const notes = `টাকার নোটগুলো: ${NOTES.map(toBn).join(", ")} টাকা।`;
    const [c100, c10, c1] = [100, 10, 1].map((v) => countIn(CARDS, v));
    const [n100, n10, n1] = [100, 10, 1].map((v) => countIn(NOTES, v));
    must(c100 + c10 + c1 === CARDS.length && n100 + n10 + n1 === NOTES.length, "p.12 only 100, 10, 1");
    const cardN = c100 * 100 + c10 * 10 + c1, money = n100 * 100 + n10 * 10 + n1;
    const qs = [
      countQ(`${cards} কতটি ১০০ এর কার্ড আছে?`, c100, `১০০ এর কার্ড গুনি: ${toBn(c100)}টি।`),
      countQ(`${cards} কতটি ১০ এর কার্ড আছে?`, c10, `১০ এর কার্ড গুনি: ${toBn(c10)}টি।`),
      countQ(`${cards} কতটি ১ এর কার্ড আছে?`, c1, `১ এর কার্ড গুনি: ${toBn(c1)}টি।`),
      numQ({ prompt: `সংখ্যা কার্ডগুলো সাজাই: ১০০ এর কার্ড ${toBn(c100)}টি, ১০ এর কার্ড ${toBn(c10)}টি ও ১ এর কার্ড ${toBn(c1)}টি। সংখ্যাটি অঙ্কে কত?`, expr: `${c100}*100+${c10}*10+${c1}`, extra: [reversed(cardN), c100 * 100 + c1 * 10 + c10, CARDS.length], why: `শত ${toBn(c100)}, দশ ${toBn(c10)}, এক ${toBn(c1)}: ${toBn(cardN)}।` }),
      countQ(`${notes} কয়টি ১০০ টাকার নোট আছে?`, n100, `১০০ টাকার নোট গুনি: ${toBn(n100)}টি।`),
      countQ(`${notes} কয়টি ১০ টাকার নোট আছে?`, n10, `১০ টাকার নোট গুনি: ${toBn(n10)}টি।`),
      countQ(`${notes} কয়টি ১ টাকার নোট আছে?`, n1, `১ টাকার নোট গুনি: ${toBn(n1)}টি।`),
      numQ({ prompt: `${notes} কত টাকা হলো?`, expr: `${n100}*100+${n10}*10+${n1}`, unit: " টাকা", extra: [n1 * 100 + n10 * 10 + n100, n100 * 100 + n1 * 10 + n10, NOTES.length], why: `১০০ টাকার নোট ${toBn(n100)}টি, ১০ টাকার ${toBn(n10)}টি, ১ টাকার ${toBn(n1)}টি: ${toBn(money)} টাকা।` }),
      mcq({ prompt: `${toBn(money)} টাকা কথায় কী?`, answer: `${wordsOf(money)} টাকা`, others: [n100 * 100 + n1 * 10 + n10, n1 * 100 + n10 * 10 + n100, n100 * 100 + n10 * 10 + n1 - 10].map((m) => `${wordsOf(m)} টাকা`), why: `${toBn(money)} = ${wordsOf(money)} (শত ${toBn(n100)}, দশ ${toBn(n10)}, এক ${toBn(n1)})।` }),
    ];
    // p.11 নিজে করি 3's notes (৪টি ১০০, ৫টি ১০, ২টি ১ টাকা), which p.11's own game doesn't ask: the same task with other numbers
    const P11 = [4, 5, 2], p11 = P11[0] * 100 + P11[1] * 10 + P11[2];
    qs.push(numQ({ prompt: `১০০ টাকার নোট ${toBn(P11[0])}টি, ১০ টাকার নোট ${toBn(P11[1])}টি ও ১ টাকার নোট ${toBn(P11[2])}টি। কত টাকা হলো?`, expr: `${P11[0]}*100+${P11[1]}*10+${P11[2]}`, unit: " টাকা", extra: [reversed(p11), P11[0] * 100 + P11[2] * 10 + P11[1], P11[0] + P11[1] + P11[2]], why: `শত ${toBn(P11[0])}, দশ ${toBn(P11[1])}, এক ${toBn(P11[2])}: ${toBn(p11)} টাকা।` }));
    add({ page: 12, slug: "cards-money", type: "mcq", title: "কার্ড ও টাকা গুনে অঙ্কে লিখি", content: finishQuestions(key, qs), src: "p.12 নিজে করি 1 (the cards: ৭টি ১০০, ৬টি ১০, ৫টি ১) and 2 (the notes: ৫টি ১০০, ৫টি ১০, ৪টি ১ টাকা; and the amount in words); p.11 নিজে করি 3's notes (৪টি ১০০, ৫টি ১০, ২টি ১ টাকা)" });
    ctx.note(`**p.12** exercise 2's notes are read at 300 dpi as ১ টাকা (the yellow note with deer), ১০ টাকা (pink) and ১০০ টাকা (blue): ${toBn(n1)}টি ১, ${toBn(n10)}টি ১০, ${toBn(n100)}টি ১০০ = ${toBn(money)} টাকা (the redesign's comment in content/p011-024.js says ৫৪৫, a slip). They are ${toBn(NOTES.length)} notes, more than Taka Shop's ১২, so the game asks them as multiple choice, with the notes written out in the book's order (৫৪৫ is one of the wrong options).`);
  }

  // the tens or hundreds of a two- or three-digit number, and a comparison explained as pp.14–15 do it
  // ("৬২ এ দশ এর দল ৬টি ও ৪৫ এ দশ এর দল ৪টি। তাই ৬২ বড়ো।")
  const groupCmpQ = (a, b, want, unitPos, groupName) => {
    const ga = Math.floor(a / Math.pow(10, unitPos)), gb = Math.floor(b / Math.pow(10, unitPos));
    must(String(a).length === String(b).length && String(a).length === unitPos + 1 && ga !== gb, `compare ${a}, ${b}`);
    const win = want === "max" ? Math.max(a, b) : Math.min(a, b);
    return mcq({
      prompt: `কোনটি ${want === "max" ? "বড়ো" : "ছোটো"}: ${toBn(a)} না ${toBn(b)}?`, answer: toBn(win), fixed: [toBn(a), toBn(b), "দুটি সমান"],
      why: `${toBn(a)} এ ${groupName} এর দল ${toBn(ga)}টি ও ${toBn(b)} এ ${groupName} এর দল ${toBn(gb)}টি। তাই ${toBn(win)} ${want === "max" ? "বড়ো" : "ছোটো"}।`, v: { cmp: want },
    });
  };
  const groupCountQ = (n, unitPos, groupName) => {
    const g = Math.floor(n / Math.pow(10, unitPos));
    return countQ(`${toBn(n)} এ ${groupName} এর দল কয়টি?`, g, `${toBn(n)} = ${toBn(g)}টি ${groupName} এর দল ও আরও ${toBn(n - g * Math.pow(10, unitPos))}: ${groupName} এর দল ${toBn(g)}টি।`);
  };

  // ── p.14: ৬২ ও ৪৫ এর মধ্যে কোন সংখ্যাটি বড়ো? (দশ এর দলের তুলনা). More pairs: the numbers of p.7 নিজে করি 1
  // (২৪, ৪৭, ৩২, ৫৯, ৮৭, ৭৫, ৯৩, ৮৯, ৮৬, ৯৯), paired so that the tens decide (mostly with the bigger number's ones digit
  // the smaller) ──
  {
    const key = keyOf(14, "compare-tens");
    const qs = [
      groupCountQ(62, 1, "দশ"), groupCountQ(45, 1, "দশ"), groupCmpQ(62, 45, "max", 1, "দশ"),
      groupCmpQ(32, 24, "min", 1, "দশ"), groupCmpQ(59, 87, "max", 1, "দশ"), groupCmpQ(93, 75, "min", 1, "দশ"), groupCmpQ(89, 93, "max", 1, "দশ"), groupCmpQ(47, 86, "min", 1, "দশ"),
      groupCmpQ(75, 59, "max", 1, "দশ"), groupCmpQ(99, 86, "min", 1, "দশ"),
    ];
    add({ page: 14, slug: "compare-tens", type: "mcq", title: "দশ এর দল দিয়ে তুলনা করি", content: finishQuestions(key, qs), src: "p.14 (৬২ ও ৪৫: দশ এর দল ৬টি ও ৪টি); the other pairs are p.7 নিজে করি 1's numbers" });
  }

  // ── p.15: ৪৩৪ ও ২৫৩ সংখ্যা দুটির মধ্যে কোন সংখ্যাটি ছোটো? (শত এর দলের তুলনা). More pairs: the numbers of p.13
  // (৮৯৮, ৩০৪, ৫০৫, ৭১২, ৯২৫, ১৩৪, ৩৮২, ৫৯০, ৬০০, ৩৩৩, ৪৪৪, ৭৫০), paired so that the hundreds decide (mostly with the
  // tens pointing the wrong way) ──
  {
    const key = keyOf(15, "compare-hundreds");
    const qs = [
      groupCountQ(434, 2, "শত"), groupCountQ(253, 2, "শত"), groupCmpQ(434, 253, "min", 2, "শত"),
      groupCmpQ(382, 444, "min", 2, "শত"), groupCmpQ(590, 600, "max", 2, "শত"), groupCmpQ(925, 898, "max", 2, "শত"), groupCmpQ(304, 134, "min", 2, "শত"), groupCmpQ(333, 505, "max", 2, "শত"),
      groupCmpQ(712, 590, "max", 2, "শত"), groupCmpQ(898, 750, "min", 2, "শত"),
    ];
    add({ page: 15, slug: "compare-hundreds", type: "mcq", title: "শত এর দল দিয়ে তুলনা করি", content: finishQuestions(key, qs), src: "p.15 (৪৩৪ ও ২৫৩: শত এর দল ৪টি ও ২টি); the other pairs are p.13's numbers" });
    ctx.note("**pp.14–15** each compare one pair (৬২ ও ৪৫; ৪৩৪ ও ২৫৩). Their games add seven pairs each made of the book's own numbers (p.7 নিজে করি 1's two-digit numbers; p.13's three-digit numbers), paired by me so that only the tens (p.14) or the hundreds (p.15) decide, as those pages teach; the explanations copy the pages' sentences (“৬২ এ দশ এর দল ৬টি ও ৪৫ এ দশ এর দল ৪টি। তাই ৬২ বড়ো।”).");
  }

  // ── p.17 স্থানীয় মান: ১৪টি কাঠি = ১ দশ ৪ (স্থানীয় মানে লিখি: ১ দশক ও ৪ একক); ২৩টি ব্লক = ২ দশ ৩ (২ দশক ও ৩ একক).
  // Both ways (number → দশক, একক; দশক, একক → number), then fresh two-digit ones. ──
  wio({
    page: 17, slug: "tens-ones", title: "স্থানীয় মানে লিখি: দশক ও একক",
    items: [{ kind: "place", n: 14, ask: "parts" }, { kind: "place", n: 23, ask: "parts" }, { kind: "place", n: 14, ask: "number" }, { kind: "place", n: 23, ask: "number" }],
    fresh: { skill: "place", digits: 2 }, src: "p.17 (১৪টি কাঠি: ১ দশক ও ৪ একক; ২৩টি ব্লক: ২ দশক ও ৩ একক), both ways",
  });
  ctx.note("**p.17** has only two numbers (১৪ কাঠি, ২৩ ব্লক), so its Work It Out asks each both ways (১৪ = □ দশক □ একক, then ১ দশক ৪ একক = □) and adds 10 fresh two-digit problems.");

  // ── p.18: ছবিতে কতগুলো শত, দশের দল ও এক আছে? (the blocks in the book's jumbled order: ৩ শত, ৫ দশ, ৬ এক = ৩৫৬,
  // তিনশত ছাপ্পান্ন) and নিচে কতগুলো হাজার, শত, দশ ও এক আছে? (the cards in the book's order) ──
  {
    const key = keyOf(18, "thousands");
    const JUMBLE = "FRCFRRFCCRCRCC"; // flat, rod, one … as the picture shows them, left to right
    const NAME = { F: "শত", R: "দশ", C: "এক" };
    const [h, t, o] = ["F", "R", "C"].map((c) => JUMBLE.split("").filter((x) => x === c).length);
    const n = h * 100 + t * 10 + o;
    must(n === 356 && nfc(inWords(n)) === nfc("তিনশত ছাপ্পান্ন"), "p.18 356");
    const CARDS = [1000, 100, 100, /**/ 1000, 100, 100, /**/ 10, 10, 1, 1, /**/ 10, 10];
    const cards = `কার্ডগুলো: ${CARDS.map(toBn).join(", ")}।`;
    const [k1000, k100, k10, k1] = [1000, 100, 10, 1].map((v) => countIn(CARDS, v));
    const cardN = k1000 * 1000 + k100 * 100 + k10 * 10 + k1;
    const jumble = `ছবিতে ব্লকগুলো এলোমেলো: ${JUMBLE.split("").map((c) => NAME[c]).join(", ")}।`;
    const qs = [
      // ছবিতে কতগুলো শত, দশের দল ও এক আছে? (the page's question, one place at a time)
      countQ(`${jumble} কতগুলো শত আছে?`, h, `শত গুনি: ${toBn(h)}টি। ${toBn(h)} শত = ${toBn(h)} শতক।`),
      countQ(`${jumble} কতগুলো দশের দল আছে?`, t, `দশের দল গুনি: ${toBn(t)}টি। ${toBn(t)} দশ = ${toBn(t)} দশক।`),
      countQ(`${jumble} কতগুলো এক আছে?`, o, `এক গুনি: ${toBn(o)}টি। ${toBn(o)} এক = ${toBn(o)} একক।`),
      numQ({ prompt: `ছবিতে ব্লকগুলো এলোমেলো: ${JUMBLE.split("").map((c) => NAME[c]).join(", ")}। সংখ্যাটি অঙ্কে কত?`, expr: `${h}*100+${t}*10+${o}`, extra: [reversed(n), t * 100 + h * 10 + o, JUMBLE.length], why: `শত ${toBn(h)}টি, দশের দল ${toBn(t)}টি, এক ${toBn(o)}টি: ${toBn(h)} শতক ${toBn(t)} দশক ${toBn(o)} একক = ${toBn(n)}।` }),
      mcq({ prompt: `${toBn(h)} শতক ${toBn(t)} দশক ${toBn(o)} একক = ${toBn(h)} শত ${toBn(t)} দশ ${toBn(o)}। কথায় কী?`, answer: inWords(n), others: [h * 100 + o * 10 + t, o * 100 + t * 10 + h, t * 100 + h * 10 + o].map(inWords), why: `${toBn(h)} শত ${toBn(t)} দশ ${toBn(o)} = ${inWords(n)}, অঙ্কে ${toBn(n)}।` }),
      countQ(`${cards} কতগুলো হাজার আছে?`, k1000, `১০০০ এর কার্ড গুনি: ${toBn(k1000)}টি, তাই ${toBn(k1000)} হাজার।`),
      countQ(`${cards} কতগুলো শত আছে?`, k100, `১০০ এর কার্ড গুনি: ${toBn(k100)}টি, তাই ${toBn(k100)} শত।`),
      countQ(`${cards} কতগুলো দশ আছে?`, k10, `১০ এর কার্ড গুনি: ${toBn(k10)}টি, তাই ${toBn(k10)} দশ।`),
      countQ(`${cards} কতগুলো এক আছে?`, k1, `১ এর কার্ড গুনি: ${toBn(k1)}টি, তাই ${toBn(k1)} এক।`),
      numQ({ prompt: `${toBn(k1000)} হাজার ${toBn(k100)} শত ${toBn(k10)} দশ ${toBn(k1)} এক। সংখ্যাটি কত?`, expr: `${k1000}*1000+${k100}*100+${k10}*10+${k1}`, extra: [k1000 * 1000 + k100 * 100 + k1 * 10 + k10, k100 * 1000 + k1000 * 100 + k1 * 10 + k10, CARDS.length], why: `হাজার ${toBn(k1000)}, শত ${toBn(k100)}, দশ ${toBn(k10)}, এক ${toBn(k1)}: সংখ্যাটি ${toBn(cardN)}।` }),
    ];
    add({ page: 18, slug: "thousands", type: "mcq", title: "হাজার, শত, দশ ও এক গুনি", content: finishQuestions(key, qs), src: "p.18 (the jumbled blocks: ৩ শত ৫ দশ ৬ এক = ৩৫৬; the cards: ২টি ১০০০, ৪টি ১০০, ৪টি ১০, ২টি ১ = ২৪৪২, the number p.19 starts with)" });
  }

  // ── p.19: ২৪৪২ এর প্রত্যেকটি অঙ্কের স্থানীয় মান (the two ৪s and the two ২s stand in different places); 1 ছবি দেখে স্থানীয়
  // মান লিখি (৪ দশক ৬ একক: ৪০ and ৬; ৩ দশক ৫ একক is done on the page); 2 ছবি দেখে স্থানীয় মান অঙ্কে ও সংখ্যায় লিখি (২
  // দশের দল ও ৬ এক, ৪ দশের দল, ৫ দশের দল ও ৩ এক; counted at 300 dpi) ──
  {
    const key = keyOf(19, "place-values");
    const big = 2442, B = String(big);
    const digitQ = (i) => {
      const d = Number(B[i]), pos = B.length - 1 - i;
      const answer = `${toBn(d)} ${PLACE[pos]}`;
      must(fromPlaceValue(answer) === d * Math.pow(10, pos), "p.19 place");
      return mcq({
        prompt: `${toBn(big)} সংখ্যায় বাম দিক থেকে ${ORD[i]} অঙ্কটি ${toBn(d)}। এর স্থানীয় মান কী?`, answer,
        others: PLACE.slice(0, B.length).filter((_, p) => p !== pos).map((p) => `${toBn(d)} ${p}`),
        why: `${toBn(big)} = ${placeValueText(big, true)}। বাম দিক থেকে ${ORD[i]} অঙ্কটি ${PLACE[pos]}ের ঘরে।`,
      });
    };
    const pic = (t, o) => (o ? `ছবিতে দশের দল ${toBn(t)}টি ও এক ${toBn(o)}টি।` : `ছবিতে দশের দল ${toBn(t)}টি, এক নেই।`);
    const valueQ = (t, o, which) => {
      const val = which === "দশক" ? t * 10 : o, d = which === "দশক" ? t : o;
      return numQ({ prompt: `${pic(t, o)} ${which}ের স্থানীয় মান কত?`, expr: String(val), extra: which === "দশক" ? [d, d * 100, t * 10 + o] : [d * 10, d * 100, t * 10 + o], why: `${toBn(t)} দশক ${toBn(o)} একক: ${toBn(d)} ${which}ের স্থানীয় মান ${toBn(val)} (যেমন ৩ দশক = ৩০, ৫ একক = ৫)।` });
    };
    const numberQ = (t, o) => numQ({ prompt: `${pic(t, o)} সংখ্যাটি কত?`, expr: `${t}*10+${o}`, extra: o ? [o * 10 + t, t + o, t * 100 + o] : [t, t * 100, 10 + t], why: `${toBn(t)} দশক ${toBn(o)} একক = ${toBn(t * 10 + o)}${o ? "" : " (এককের ঘরে ০)"}।` });
    // ২৪৪২'s শতক ৪ as a number (৪ শতক = ৪০০), as exercise 1 writes ৩ দশক as ৩০
    const h4 = Number(B[1]), h4pos = B.length - 2;
    const hundredValueQ = numQ({ prompt: `${toBn(big)} সংখ্যায় শতক স্থানের অঙ্কটি ${toBn(h4)}। এর স্থানীয় মান অঙ্কে কত?`, expr: `${h4}*100`, extra: [h4 * 10, h4, h4 * 1000], why: `${toBn(h4)} ${PLACE[h4pos]} = ${toBn(h4 * 100)} (যেমন ৩ দশক = ৩০)।` });
    const qs = [digitQ(1), digitQ(2), digitQ(0), digitQ(3), hundredValueQ, valueQ(4, 6, "দশক"), valueQ(4, 6, "একক"), numberQ(2, 6), numberQ(4, 0), numberQ(5, 3)];
    add({ page: 19, slug: "place-values", type: "mcq", title: "ছবি দেখে স্থানীয় মান লিখি", content: finishQuestions(key, qs), src: "p.19 (২৪৪২: ২ হাজার ৪ শতক ৪ দশক ২ একক; ৪ শতক = ৪০০), 1 (৪ দশক ৬ একক: ৪০ ও ৬), 2 (২৬, ৪০, ৫৩)" });
    ctx.note("**p.19** exercises 1–2's blocks (README: “hard to count in the scan”) read clearly at 300 dpi: ৩ দশক ৫ একক (done on the page), ৪ দশক ৬ একক; ২ দশক ৬ একক, ৪ দশক ০ একক, ৫ দশক ৩ একক. The game says each picture in words (“ছবিতে দশের দল ৪টি ও এক ৬টি”).");
  }

  // ── p.22 সংখ্যার তুলনা (স্থানীয় মানের সাহায্যে): ৪৬০ ও ৬৩০ (শতক স্থানের ৪ থেকে ৬ বড়ো), ৫৬২ ও ৫৪৮ (শতক সমান, দশক
  // স্থানের ৪ থেকে ৬ বড়ো): which place decides, and which number is bigger or smaller. More pairs: p.13's numbers (৩৩৩, ৩৮২;
  // ৯৯৮, ৯২৫; ৫৯০, ৫০৫) and p.24's ২৩২ ও ২৩৯ (শতক ও দশক সমান: the ones decide). ──
  {
    const key = keyOf(22, "compare-place");
    const OPTS = ["শতক", "দশক", "একক"].map((p) => `${p} স্থানের অঙ্ক`);
    const placeQ = (a, b) => {
      const sa = String(a), sb = String(b);
      must(sa.length === 3 && sb.length === 3 && a !== b, `p.22 ${a}, ${b}`);
      const i = [...sa].findIndex((d, k) => d !== sb[k]);
      return mcq({ prompt: `${toBn(a)} ও ${toBn(b)} এর তুলনায় কোন স্থানের অঙ্ক দেখে বুঝি কোনটি বড়ো?`, answer: OPTS[i], fixed: OPTS, why: compareWhy(a, b, "max") });
    };
    const qs = [
      placeQ(460, 630), cmpQ(460, 630, "max"), placeQ(562, 548), cmpQ(562, 548, "min"),
      placeQ(333, 382), cmpQ(998, 925, "min"), placeQ(232, 239), cmpQ(590, 505, "max"),
      placeQ(729, 726), cmpQ(407, 330, "max"), // p.24 rows (4) and (3), which p.24's own game doesn't use
    ];
    add({ page: 22, slug: "compare-place", type: "mcq", title: "স্থানীয় মানের সাহায্যে তুলনা", content: finishQuestions(key, qs), src: "p.22 (৪৬০ ও ৬৩০; ৫৬২ ও ৫৪৮); more pairs from p.13 (৩৩৩, ৩৮২; ৯৯৮, ৯২৫; ৫৯০, ৫০৫) and p.24 (২৩২, ২৩৯; row (4) ৭২৯, ৭২৬; row (3) ৪০৭, ৩৩০)" });
    ctx.note("**p.22** works two pairs (৪৬০ ও ৬৩০; ৫৬২ ও ৫৪৮); its game adds six pairs of the book's numbers (p.13's list; p.24's example ২৩২, ২৩৯ and rows (3)–(4), which p.24's sort leaves out), paired by me so that the hundreds, the tens or the ones decide.");
  }
};
