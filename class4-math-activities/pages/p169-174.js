// Pages ১৬৯–১৭৪ (অধ্যায় ১১ · উপাত্ত সংগ্রহ ও বিন্যস্তকরণ), written by Claude (helper for pp. 143–174), 24 Nov 2026.
// The book: ../class4-math-redesign/content/p169-174.js. p.169: the zoo's animals in a tally table; p.170: three tables of the
// class's own data (favourite animals, the school's furniture, holiday work); p.171: a bar graph (স্তম্ভলেখ) read; p.172:
// drawing one (the fruits) and its steps; p.173: two to draw (absent pupils, five families); p.174: নিজে করি (a quiz's marks
// tallied, books drawn as bars, an over-by-over bar graph read).
"use strict";
module.exports = (L) => {
  const { it, wio, mcq, q, note } = L;
  const T = "tally_chart";
  const rowsOf = (list) => list.map(([name, value, emoji]) => ({ name, ...(emoji ? { emoji } : {}), value }));
  const total = (rows) => rows.reduce((s, r) => s + r.value, 0);
  const tally = (rows, ask = "make") => it({ kind: "tally", rows, ask }, [...rows.map((r) => r.value), total(rows)]);
  // one question on a chart (our answer worked out here, as the server does: most/least/which = the rows' places)
  const ask = (chart, a, extra = {}) => {
    const v = chart.rows.map((r) => r.value), at = (n) => (typeof n === "number" ? n : chart.rows.findIndex((r) => r.name === n));
    const where = (x) => v.map((w, i) => (w === x ? i : -1)).filter((i) => i >= 0);
    const want = {
      make: v, table: v, total: total(chart.rows), most: where(Math.max(...v)), least: where(Math.min(...v)),
      value: v[at(extra.a)], sum: v[at(extra.a)] + v[at(extra.b)], diff: Math.abs(v[at(extra.a)] - v[at(extra.b)]),
      which: where(extra.given), calc: extra.want,
    }[a];
    const { want: _w, ...rest } = extra;
    return it({ kind: "chart", ...chart, ask: a, ...rest }, want);
  };

  // ════════════════════ p.169: চিড়িয়াখানার প্রাণী ════════════════════
  const ZOO = rowsOf([["হাতি", 4, "🐘"], ["জেব্রা", 6, "🦓"], ["বাঘ", 3, "🐅"], ["সিংহ", 5, "🦁"], ["জিরাফ", 2, "🦒"], ["হরিণ", 9, "🦌"]]);
  const ZOO_C = { rows: ZOO, key: 1, symbol: "emoji", dir: "h", unit: "টি প্রাণী" };
  wio({
    page: 169, slug: "zoo-tally", type: T, title: "ট্যালি চিহ্ন দিয়ে চিড়িয়াখানার প্রাণী গুনি",
    items: [
      tally(ZOO),
      ask(ZOO_C, "most", { text: "কোন প্রাণী সবচেয়ে বেশি সংখ্যক ছিল?" }),
      ask(ZOO_C, "least", { text: "কোন প্রাণী সবচেয়ে কম সংখ্যক ছিল?" }),
      ask(ZOO_C, "table"), ask(ZOO_C, "total", { text: "চিড়িয়াখানায় মোট কতটি প্রাণী দেখেছিল?" }),
      ask(ZOO_C, "value", { a: 1 }), ask(ZOO_C, "diff", { a: 5, b: 4 }), ask(ZOO_C, "sum", { a: 2, b: 3 }), ask(ZOO_C, "which", { given: 5 }),
    ],
    fresh: { skill: "tally", count: 5 },
    src: "p.169 কাজ ১ (the table: হাতি ৪ as printed, then জেব্রা, বাঘ, সিংহ, জিরাফ, হরিণ counted in our drawing: ৬, ৩, ৫, ২, ৯) and its questions (১) সবচেয়ে বেশি, (২) সবচেয়ে কম; then the table read back, the total and four questions of ours; 5 fresh tally rounds",
  });
  note("p.169: the NCTB zoo picture can't be counted (only হাতি ৪ is printed in the table); our redesign draws জিরাফ ২, বাঘ ৩, হাতি ৪, সিংহ ৫, জেব্রা ৬, হরিণ ৯, and the game uses those numbers (সবচেয়ে বেশি হরিণ, সবচেয়ে কম জিরাফ).");

  // ════════════════════ p.170: শ্রেণির নিজের উপাত্ত ════════════════════
  const PETS = rowsOf([["হাতি", 7, "🐘"], ["জেব্রা", 5, "🦓"], ["বাঘ", 8, "🐅"], ["সিংহ", 9, "🦁"], ["জিরাফ", 6, "🦒"]]);
  const FURN = rowsOf([["বেঞ্চ", 12], ["টেবিল", 6], ["চেয়ার", 8, "🪑"], ["আলমারি", 2, "🗄️"], ["ব্ল্যাকবোর্ড", 4]]);
  const HOLI = rowsOf([["খেলাধুলা", 9, "⚽"], ["বই পড়া", 6, "📖"], ["ছবি আঁকা", 5, "🎨"], ["বাগান করা", 3, "🌱"], ["ঘর গোছানো", 4, "🧹"], ["বেড়াতে যাওয়া", 7, "🚶"]]);
  const PETS_C = { rows: PETS, key: 1, symbol: "emoji", dir: "h", unit: "জন শিক্ষার্থী" };
  const HOLI_C = { rows: HOLI, key: 1, symbol: "emoji", dir: "h", unit: "জন শিক্ষার্থী" };
  wio({
    page: 170, slug: "class-tallies", type: T, title: "ট্যালি চিহ্ন দিয়ে শ্রেণির সারণি তৈরি করি",
    items: [
      tally(PETS), ask(PETS_C, "most", { text: "নিচের পাঁচটি প্রাণীর মধ্যে বেশি সংখ্যক শিক্ষার্থীর পছন্দের প্রাণী কোনটি?" }), ask(PETS_C, "diff", { a: 3, b: 1 }),
      tally(FURN), tally(FURN, "read"),
      tally(HOLI), ask(HOLI_C, "total"), ask(HOLI_C, "least"),
    ],
    fresh: { skill: "tally", count: 5 },
    src: "p.170 কাজ ২ (শিক্ষার্থীদের পছন্দের প্রাণী: হাতি, জেব্রা, বাঘ, সিংহ, জিরাফ), কাজ ৩ (আসবাবপত্রের তালিকা, with মোট), কাজ ৪ (ছুটির দিনের কাজ, with মোট): the class's own data, so the numbers are ours; 5 fresh tally rounds",
  });
  note("p.170 কাজ ২–৪ and p.173 কাজ ৩: the data are the class's own (a show of hands, the school's furniture, holiday work, five families chosen at random); the games use numbers of ours (e.g. হাতি ৭, জেব্রা ৫, বাঘ ৮, সিংহ ৯, জিরাফ ৬; families of ৫, ৪, ৬, ৩, ৭) and say so.");

  // ════════════════════ p.171: স্তম্ভলেখ পড়ি ════════════════════
  const SPORTS = { rows: rowsOf([["ফুটবল", 12, "⚽"], ["ক্রিকেট", 10, "🏏"], ["ভলিবল", 8, "🏐"], ["ব্যাডমিন্টন", 7, "🏸"], ["সাঁতার", 9, "🏊"]]), key: 1, symbol: "bar", dir: "v", unit: "জন শিক্ষার্থী", title: "শিক্ষার্থীদের পছন্দের খেলা সংখ্যা" };
  wio({
    page: 171, slug: "read-bar-graph", type: T, title: "স্তম্ভলেখ দেখে প্রশ্নের উত্তর দিই",
    items: [
      ask(SPORTS, "table"),
      ask(SPORTS, "most", { text: "শিক্ষার্থীরা সবচেয়ে বেশি পছন্দ করে কোন খেলাটি?" }), ask(SPORTS, "value", { a: 0, text: "কতজন শিক্ষার্থী ফুটবল পছন্দ করে?" }),
      ask(SPORTS, "least", { text: "শিক্ষার্থীরা সবচেয়ে কম পছন্দ করে কোন খেলাটি?" }), ask(SPORTS, "value", { a: 3, text: "কতজন শিক্ষার্থী ব্যাডমিন্টন পছন্দ করে?" }),
      ask(SPORTS, "total"), ask(SPORTS, "diff", { a: 0, b: 3 }), ask(SPORTS, "sum", { a: 1, b: 4 }), ask(SPORTS, "which", { given: 8 }), ask(SPORTS, "value", { a: 4 }),
    ],
    fresh: { skill: "chart", count: 5 },
    src: "p.171 কাজ ১ (the bar graph and the table: ফুটবল ১২, ক্রিকেট ১০, ভলিবল ৮, ব্যাডমিন্টন ৭, সাঁতার ৯) and questions (৩), (৪) (which game, how many pupils), the table read back; then the total, a difference, a sum, which game has ৮, সাঁতার (ours); (১), (২) are in p.172's quiz; 5 fresh bar graphs",
  });

  // ════════════════════ p.172: স্তম্ভলেখ আঁকি ════════════════════
  const FRUITS = { rows: rowsOf([["কলা", 8], ["আম", 11], ["কাঁঠাল", 7], ["লিচু", 10], ["নারিকেল", 4]]), key: 1, symbol: "bar", dir: "v", unit: "জন শিক্ষার্থী", title: "শিক্ষার্থীর প্রিয় ফল" };
  wio({
    page: 172, slug: "draw-bar-graph", type: T, title: "সারণি থেকে স্তম্ভলেখ আঁকি",
    items: [
      ask(FRUITS, "make"), ask(FRUITS, "total"),
      ask(FRUITS, "most"), ask(FRUITS, "least"), ask(FRUITS, "diff", { a: 1, b: 4 }), ask(FRUITS, "value", { a: 3 }), ask(FRUITS, "sum", { a: 0, b: 2 }),
    ],
    fresh: { skill: "chart", count: 5 },
    src: "p.172 কাজ ১ (the table: কলা ৮, আম ১১, কাঁঠাল ৭, লিচু ১০, নারিকেল ৪, মোট ৪০; কলা's bar drawn, the rest to draw; its name ‘শিক্ষার্থীর প্রিয় ফল’), then five questions of ours on it; 5 fresh bar graphs",
  });

  mcq({
    page: 172, slug: "bar-graph-steps", title: "স্তম্ভলেখ পড়ার ও আঁকার নিয়ম জানি",
    questions: [
      q({ prompt: "পৃষ্ঠা 171-এর স্তম্ভলেখটির শিরোনাম কী?", options: ["শিক্ষার্থীদের পছন্দের খেলা সংখ্যা", "শিক্ষার্থীদের সংখ্যা", "খেলার নাম"], answer: "শিক্ষার্থীদের পছন্দের খেলা সংখ্যা", why: "স্তম্ভলেখের উপরে তার শিরোনাম লেখা: শিক্ষার্থীদের পছন্দের খেলা সংখ্যা। বাকি দুইটি দুই রেখার নাম।" }),
      q({ prompt: "পৃষ্ঠা 171-এর স্তম্ভলেখে উলম্ব বরাবর 1 ঘর কতজন শিক্ষার্থী প্রকাশ করে?", options: ["1 জন", "5 জন", "10 জন", "2 জন"], answer: "1 জন", why: "উলম্ব রেখায় ৫ ও ১০ লেখা ঘরের মাঝে ৫টি ঘর: প্রতিটি ঘর ১ জন শিক্ষার্থী।" }),
      q({ prompt: "স্তম্ভলেখ আমাদের কী করতে সাহায্য করে?", options: ["খুব সহজেই পরিমাণ তুলনা করতে", "যোগ করা এড়াতে", "ছবি আঁকা শিখতে"], answer: "খুব সহজেই পরিমাণ তুলনা করতে", why: "স্তম্ভগুলোর উচ্চতা দেখেই বোঝা যায় কোনটি বেশি, কোনটি কম: পরিমাণ সহজেই তুলনা করা যায়।" }),
      q({ prompt: "স্তম্ভলেখ আঁকার জন্য ছক কাগজে আনুভূমিক রেখা বরাবর কোন রেখা আঁকি?", options: ["কখ রেখা", "কগ রেখা", "খগ রেখা"], answer: "কখ রেখা", why: "আনুভূমিক রেখা বরাবর কখ রেখা এবং উলম্ব রেখা বরাবর কগ রেখা আঁকি।" }),
      q({ prompt: "উলম্ব রেখা বরাবর কোন রেখা আঁকি?", options: ["কগ রেখা", "কখ রেখা", "খগ রেখা"], answer: "কগ রেখা", why: "আনুভূমিক রেখা বরাবর কখ রেখা এবং উলম্ব রেখা বরাবর কগ রেখা আঁকি।" }),
      q({ prompt: "আনুভূমিক রেখা বরাবর এক ঘর পরপর কী লিখি?", options: ["ফলের নামগুলো", "শিক্ষার্থীর সংখ্যা", "স্তম্ভলেখের নাম"], answer: "ফলের নামগুলো", why: "আনুভূমিক রেখা বরাবর এক ঘর পরপর ফলের নামগুলো লিখি।" }),
      q({ prompt: "উলম্ব কগ রেখার উপর কী নির্ণয় করি?", options: ["শিক্ষার্থীদের জন্য উপযুক্ত মাপকাঠি", "ফলের নাম", "ফলের দাম"], answer: "শিক্ষার্থীদের জন্য উপযুক্ত মাপকাঠি", why: "উলম্ব রেখা বরাবর কগ রেখার উপর শিক্ষার্থীদের জন্য উপযুক্ত মাপকাঠি নির্ণয় করি।" }),
      q({ prompt: "প্রতিটি ফলের স্তম্ভ কত উঁচু আঁকি?", options: ["যতজন শিক্ষার্থী ফলটি পছন্দ করে ততটুকু", "সবগুলো সমান উঁচু", "ফলটি যত বড়ো ততটুকু"], answer: "যতজন শিক্ষার্থী ফলটি পছন্দ করে ততটুকু", why: "কোন ফল কতজন শিক্ষার্থী পছন্দ করে এই সংখ্যার উপর ভিত্তি করে প্রতিটি ফলের জন্য স্তম্ভ আঁকি।" }),
      q({ prompt: "আনুভূমিক রেখার নিচে কী লিখি?", options: ["‘ফলের নাম’", "‘শিক্ষার্থীর সংখ্যা’", "‘শিক্ষার্থীর প্রিয় ফল’"], answer: "‘ফলের নাম’", why: "আনুভূমিক রেখার নিচে ‘ফলের নাম’ এবং উলম্ব রেখার পাশে ‘শিক্ষার্থীর সংখ্যা’ লিখি।" }),
      q({ prompt: "পৃষ্ঠা 172-এর স্তম্ভলেখটির নাম কী দিই?", options: ["‘শিক্ষার্থীর প্রিয় ফল’", "‘ফলের নাম’", "‘শিক্ষার্থীদের পছন্দের খেলা’"], answer: "‘শিক্ষার্থীর প্রিয় ফল’", why: "চলো, স্তম্ভলেখটির নাম দিই ‘শিক্ষার্থীর প্রিয় ফল’।" }),
    ],
    src: "p.171 (১) শিরোনাম, (২) উলম্ব বরাবর ১ ঘর, the boy (পরিমাণ তুলনা); p.172 the six steps (কখ ও কগ রেখা, ফলের নাম, মাপকাঠি, স্তম্ভ, the axis names, the graph's name) as printed",
  });

  // ════════════════════ p.173: স্তম্ভলেখ অঙ্কন ════════════════════
  const ABSENT = { rows: rowsOf([["রবিবার", 7], ["সোমবার", 5], ["মঙ্গলবার", 3], ["বুধবার", 2], ["বৃহস্পতিবার", 9]]), key: 1, symbol: "bar", dir: "v", unit: "জন শিক্ষার্থী", title: "অনুপস্থিত শিক্ষার্থীর সংখ্যা" };
  wio({
    page: 173, slug: "absent-bars", type: T, title: "অনুপস্থিত শিক্ষার্থীর স্তম্ভলেখ আঁকি",
    items: [
      ask(ABSENT, "make"), ask(ABSENT, "most"), ask(ABSENT, "least"), ask(ABSENT, "total"), ask(ABSENT, "diff", { a: 4, b: 3 }), ask(ABSENT, "value", { a: 2 }),
    ],
    fresh: { skill: "chart", count: 5 },
    src: "p.173 কাজ ২ (the table: রবিবার ৭, সোমবার ৫, মঙ্গলবার ৩, বুধবার ২, বৃহস্পতিবার ৯ drawn as bars), then five questions of ours on it; 5 fresh bar graphs",
  });
  const FAMILY = { rows: rowsOf([["রিয়া", 5], ["তমাল", 4], ["নাবিলা", 6], ["সজীব", 3], ["মিতু", 7]]), key: 1, symbol: "bar", dir: "v", unit: "জন সদস্য", title: "পরিবারের সদস্য সংখ্যা" };
  wio({
    page: 173, slug: "family-bars", type: T, title: "পরিবারের সদস্য সংখ্যার স্তম্ভলেখ আঁকি ও প্রশ্নের উত্তর খুঁজি",
    items: [
      ask(FAMILY, "make"),
      ask(FAMILY, "calc", { text: "সবচেয়ে বড়ো পরিবারের সদস্য সংখ্যা কত?", sum: "#5", want: 7 }),
      ask(FAMILY, "calc", { text: "সবচেয়ে ছোটো পরিবারের সদস্য সংখ্যা কত?", sum: "#4", want: 3 }),
      ask(FAMILY, "total", { text: "পাঁচটি পরিবারের মোট সদস্য সংখ্যা কত?" }),
      ask(FAMILY, "most"), ask(FAMILY, "least"),
    ],
    fresh: { skill: "chart", count: 5 },
    src: "p.173 কাজ ৩ (দৈবচয়নে পাঁচজন শিক্ষার্থীর পরিবারের সদস্য সংখ্যা: the numbers ours, ৫, ৪, ৬, ৩, ৭) and its questions ১) সবচেয়ে বড়ো, ২) সবচেয়ে ছোটো, ৩) মোট, as printed; whose family is the biggest and the smallest; 5 fresh bar graphs",
  });

  // ════════════════════ p.174: নিজে করি ════════════════════
  // ১: the 20 marks (৮ ১ ৩ ৭ ৬ ৫ ৪ ৬ ৪ ২ / ৪ ৯ ৫ ৪ ৭ ৪ ৮ ৩ ৬ ৭) counted for each mark, in two tables (a tally holds 6 rows)
  const MARKS = [8, 1, 3, 7, 6, 5, 4, 6, 4, 2, 4, 9, 5, 4, 7, 4, 8, 3, 6, 7];
  const marksRows = (from, to) => { const r = []; for (let m = from; m <= to; m++) r.push({ name: `${m} নম্বর`, emoji: "📝", value: MARKS.filter((x) => x === m).length }); return r; };
  const BOOKS = { rows: rowsOf([["রূপকথার বই", 12], ["কমিক্স বই", 10], ["ভ্রমণকাহিনি", 11], ["গোয়েন্দা কাহিনি", 8], ["বৈজ্ঞানিক কল্পকাহিনি", 7]]), key: 1, symbol: "bar", dir: "v", unit: "জন শিক্ষার্থী", title: "শিক্ষার্থীদের পছন্দের বই" };
  const RUNS = { rows: rowsOf([["1ম ওভার", 9], ["2য় ওভার", 11], ["3য় ওভার", 5], ["4র্থ ওভার", 15], ["5ম ওভার", 10], ["6ষ্ঠ ওভার", 13]]), key: 2, symbol: "bar", dir: "v", unit: "রান", title: "ওভার প্রতি রান" };
  wio({
    page: 174, slug: "review", type: T, title: "নিজে করি: ট্যালি চিহ্ন ও স্তম্ভলেখ",
    items: [
      tally(marksRows(1, 5)), tally(marksRows(6, 9)), // ১
      ask(BOOKS, "make"), ask(BOOKS, "most"), ask(BOOKS, "least"), ask(BOOKS, "total"), // ২
      ask(RUNS, "most", { text: "কোন ওভারে সবচেয়ে বেশি রান দিয়েছেন?" }), ask(RUNS, "least", { text: "কোন ওভারে সবচেয়ে কম রান দিয়েছেন?" }),
      ask(RUNS, "total", { text: "ছয় ওভারে মোট কত রান দিয়েছেন?" }), ask(RUNS, "table"), // ৩
    ],
    fresh: { skill: "chart", count: 5 },
    src: "p.174 নিজে করি ১ (the 20 marks tallied for each mark: ১ নম্বর ১ জন, ২: ১, ৩: ২, ৪: ৫, ৫: ২ | ৬: ৩, ৭: ৩, ৮: ২, ৯: ১; in two tables), ২ (বই: ১২, ১০, ১১, ৮, ৭ drawn as bars, and three questions of ours), ৩ (ওভার প্রতি রান: ৯, ১১, ৫, ১৫, ১০, ১৩ on a scale of ২s) (১)–(৩) as printed and the bars read back; 5 fresh bar graphs",
  });
  note("p.174 নিজে করি ১: the marks ১–৯ need nine rows, and a tally round holds six, so the game tallies them in two tables (১–৫ নম্বর, ৬–৯ নম্বর).");
};
