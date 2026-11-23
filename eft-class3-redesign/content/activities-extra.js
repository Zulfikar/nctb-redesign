// The pages' SECOND activities (activities.js merges them into ACTIVITIES-bn.json, keyed EFT3-Pnnnb, c, d): a game for
// each page's exercise, with the book's own answer key. The lines come from the page content (content/unit*.js), so
// their hints and meanings are the checked ones; a NEW line (an answer the book leaves to the child) has its hint
// written by SPEC.md §3 (British, dotted letters, the units' words.json spellings) and a plain Bangla meaning.
// Every hint gets the puff (ক → খ, ট → ঠ, প → প্‌হ, not in names) and loses its stars, as activities.js prints them.
// The help lines: a gap sentence's meaning keeps its gap (so it doesn't give the answer away) and its hint is the whole
// sentence (shown once answered); a sound game (Unit 4) has meanings only.
// { page: [{ type, title, content, notes, audio: false | "what to record" }] }
const path = require("path");
const fs = require("fs");
const units = [];
for (let n = 1; n <= 8; n++) units.push(require(path.join(__dirname, `unit${n}.js`)));

// ── the book's lines: [english, hint, meaning] wherever they are on a page ──
const BN = /[ঀ-৿]/, LAT = /[A-Za-z]/;
function triples(x, out) {
  if (!Array.isArray(x)) { if (x && typeof x === "object") Object.values(x).forEach((v) => triples(v, out)); return; }
  const s = x.every((v) => typeof v === "string");
  if (s && (x.length === 3 || x.length === 4)) {
    const [e, h, m] = x.length === 3 ? x : x.slice(1);
    if (LAT.test(e) && !BN.test(e) && BN.test(h)) { out.push({ e, h, m }); return; }
  }
  x.forEach((v) => triples(v, out));
}
const key = (e) => String(e).replace(/\n/g, " ").replace(/_([^_\s][^_]*?)_/g, "$1").replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim().toLowerCase();
const LINES = new Map(), TITLE = {};
for (const U of units) for (const pg of U.pages) {
  TITLE[pg.page] = pg.title[0];
  const t = []; triples(pg.blocks, t);
  for (const { e, h, m } of t) if (!LINES.has(key(e))) LINES.set(key(e), [h, m]);
}
const WORDS = {};
for (let n = 1; n <= 8; n++) {
  const f = path.join(__dirname, `unit${n}.words.json`);
  if (fs.existsSync(f)) for (const [w, v] of Object.entries(JSON.parse(fs.readFileSync(f, "utf8")))) if (!WORDS[w.toLowerCase()]) WORDS[w.toLowerCase()] = v;
}
// and each word's hint in the book's lines (where a line's words and its hint's words pair up one to one): the most usual
const TOK = {};
for (const U of units) for (const pg of U.pages) {
  const t = []; triples(pg.blocks, t);
  for (const { e, h } of t) {
    const toks = [...e.replace(/[’‘]/g, "'").matchAll(/[A-Za-z]+(?:'[A-Za-z]+)?/g)].map((x) => x[0].toLowerCase()), hw = h.split(/\s+/).map((w) => w.replace(/^[“‘"'(*]+|[”’"'),.?!।:;*…]+$/g, "")).filter((w) => BN.test(w));
    if (toks.length === hw.length) toks.forEach((tk, k) => { const c = (TOK[tk] = TOK[tk] || {}); c[hw[k]] = (c[hw[k]] || 0) + 1; });
  }
}
const line = (en) => { const t = LINES.get(key(en)); if (!t) throw new Error(`activities-extra.js: the book has no line "${en}"`); return t; };

// ── the puff, as activities.js (and build.js) print it ──
const PUFF = { "ক": "খ", "ট": "ঠ", "প": "প্‌হ" };
const PUFF_RE = /(^|[\s“‘"'(\[—–-]|(?<!স়?)·(?=\*))(\*?)([কটপ])(?!়)(?=্য|[^্]|$)/gu;
const bareBn = (t) => String(t).replace(/^[“‘"'(*]+|[”’"'),.?!।:;*…]+$/g, "");
const NO_PUFF = new Set();
const ORDINARY = /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|January|February|March|April|May|June|July|August|September|October|November|December|I|I'm|I'll|I've)$/;
for (const U of units) for (const pg of U.pages) {
  const t = []; triples(pg.blocks, t);
  for (const { e, h } of t) {
    const toks = [...e.replace(/[’‘]/g, "'").matchAll(/[A-Za-z]+(?:'[A-Za-z]+)?/g)], hw = h.split(/\s+/).map(bareBn).filter((w) => BN.test(w));
    if (toks.length !== hw.length) continue;
    toks.forEach((tk, k) => { const before = e.slice(0, tk.index).replace(/[\s“‘"'(]+$/, ""); if (/^[A-Z][a-z]/.test(tk[0]) && before && !/[.?!:]$/.test(before) && !ORDINARY.test(tk[0])) NO_PUFF.add(hw[k]); });
  }
}
const roman = (h) => String(h).replace(PUFF_RE, (x, b, star, c, off, all) => { const w = (all.slice(off + b.length + star.length).match(/^[ঀ-৿‌]+/) || [""])[0]; return NO_PUFF.has(bareBn(w)) ? x : b + star + (PUFF[c] || c); })
  .replace(/়্(?=র)/g, "়্‌").replace(/\*/g, "");

// ── helpers ──
// a gap, however the book prints it (____, ……, ……….), as Activity Studio's ____
const GAP = /(?:_{2,}|…|\.{3,})+(?:\.(?=\s*[a-z]))?/g;
const gapped = (s) => String(s).replace(GAP, " ____ ").replace(/\s+/g, " ").replace(/ ([.,?!।;:])/g, "$1").replace(/____ -/g, "____-").trim();
// a word in a sentence: its hint without the syllable dots and stars
const plain = (h) => String(h).replace(/[*·]/g, "");
const word = (w) => {
  const c = TOK[w.toLowerCase()], t = LINES.get(key(w)) || WORDS[w.toLowerCase()] || (c && [Object.keys(c).sort((a, b) => c[b] - c[a])[0]]);
  if (!t) throw new Error(`activities-extra.js: no hint for the word "${w}"`);
  return plain(t[0]);
};
const sayAll = (a) => (LINES.has(key(a)) ? plain(LINES.get(key(a))[0]) : a.split(/\s+/).map(word).join(" "));
const tidy = (h) => String(h).replace(/\s+/g, " ").replace(/ ([।?!,.;:])/g, "$1").trim();
const endMark = (h) => (/[।?!]$/.test(tidy(h)) ? tidy(h) : tidy(h) + "।");
// a book line as it is: { text, roman, meaning }
const L = (en) => { const [h, m] = line(en); return { text: gapped(en).replace(/\n/g, " "), roman: roman(h), meaning: m }; };
// a new line: its hint written here
const N = (text, h, meaning) => ({ text, roman: roman(h), meaning });
// a book line whose gap(s) the child fills: the gap stays in the text and the meaning, the hint is the whole sentence
// (`say`: the answers' hints, when the words' own aren't right in the sentence)
function fill(en, answers, distractors, say) {
  const [h, m] = line(en);
  let i = 0;
  const hint = h.replace(/____|……|…/g, () => { const s = say ? say[i] : sayAll(answers[i]); i++; return ` ${s} `; });
  if (i !== answers.length) throw new Error(`activities-extra.js: "${en}" has ${i} gaps in its hint, ${answers.length} answers`);
  return { text: gapped(en), answers, distractors, meaning: gapped(m), roman: roman(endMark(hint)) };
}
// a fill line the book has no hint for (numbers in words): the whole hint and the gapped meaning written here
const fillNew = (text, answers, distractors, h, meaning) => ({ text, answers, distractors, meaning, roman: roman(h) });
// a "choose / tick" question: the book's sentence with its gap (or its "(a/b)" choice), the options, the right one
function choose(en, options, answer, say) {
  const [h, m] = line(en);
  const pick = /\(([^()]*\/[^()]*)\)/;
  if (pick.test(en)) { // "Sabiha is in class (three/four)."
    const hint = h.replace(pick, (x, s) => s.split("/")[answer]);
    return { prompt: en.replace(pick, "____"), options, answer, meaning: m, roman: roman(endMark(hint)) };
  }
  const BLANK = /____|……|…|\.{3,}/;
  const hint = BLANK.test(h) ? h.replace(BLANK, ` ${say || sayAll(options[answer])} `) : h + " " + (say || sayAll(options[answer]));
  const prompt = (GAP.test(en) ? gapped(en) : en.replace(/\s*$/, " ____")).replace(/____$/, "____.");
  GAP.lastIndex = 0;
  const meaning = (GAP.test(m) ? gapped(m) : m + " ____").replace(/____$/, "____।");
  GAP.lastIndex = 0;
  return { prompt, options, answer, meaning, roman: roman(endMark(hint)) };
}
// a new "choose" sentence (the book asks a question; the game needs a sentence with its gap)
const chooseNew = (prompt, options, answer, h, meaning) => ({ prompt, options, answer, meaning, roman: roman(h) });
// a jumbled line put right: the hint's words in the sentence's order, the book's meaning (the right sentence's)
function rearranged(jumbled, text) {
  const [h, m] = line(jumbled), toks = jumbled.toLowerCase().split(/\s+/), hw = h.split(/\s+/);
  if (toks.length !== hw.length) throw new Error(`activities-extra.js: "${jumbled}": words and hint don't pair up`);
  const hint = text.replace(/[.?!]$/, "").split(/\s+/).map((w) => { const k = toks.indexOf(w.toLowerCase()); if (k < 0) throw new Error(`activities-extra.js: "${w}" isn't in "${jumbled}"`); return hw[k]; }).join(" ");
  return { text, roman: roman(hint + "।"), meaning: m };
}
// book lines said one after another, as one answer (without their quotation marks)
const cat = (...xs) => { const q = (t) => t.replace(/[“”]/g, ""); return { text: xs.map((x) => q(x.text)).join(" "), roman: xs.map((x) => q(x.roman)).join(" "), meaning: xs.map((x) => q(x.meaning)).join(" ") }; };
// an "ask and answer" line: the book's question, and its answer (a book line, or a new one)
const ask = (q, a) => { const Q = L(q); return { prompt: Q.text, promptMeaning: Q.meaning, promptRoman: Q.roman, text: a.text, meaning: a.meaning, roman: a.roman }; };
// a True/False statement (the book's line without its answer blank)
// (a sorted word's help lines are at most 60 letters: a longer hint is left out, the meaning stays)
const tf = (en, isTrue) => { const x = L(en); return { text: x.text.replace(/\s*____$/, ""), category: isTrue ? 0 : 1, meaning: x.meaning, ...(x.roman.length <= 60 ? { roman: x.roman } : {}) }; };
// a word to sort, with its own help lines (`only`: "meaning" for the sound games)
const item = (w, category, only) => { const t = LINES.get(key(w)) || WORDS[key(w)]; if (!t) throw new Error(`activities-extra.js: no word "${w}"`); return only === "meaning" ? { text: w, category, meaning: t[1] } : { text: w, category, meaning: t[1], roman: roman(t[0]) }; };
// a pair to match: both sides' help lines (the left's sound shows from the start, its meaning once matched)
const pair = (l, r, opts = {}) => {
  const out = { left: l, right: r };
  if (opts.leftMeaning) out.leftMeaning = opts.leftMeaning; else if (opts.leftMeaning !== false) { const a = L(l); out.leftRoman = a.roman; out.leftMeaning = a.meaning; }
  if (opts.right !== false) { const b = L(r); out.rightRoman = b.roman; out.rightMeaning = b.meaning; }
  if (opts.emoji) out.emoji = opts.emoji;
  return out;
};
// Unit 4's listening rounds: the words (or a phrase) the child hears and taps, among other words of the lesson; the
// meaning (shown once answered) says what they mean, and for a same/different pair the book's answer (S or D)
const meanOf = (w) => { const t = LINES.get(key(w)) || WORDS[w.toLowerCase()]; if (!t) throw new Error(`activities-extra.js: no word "${w}"`); return t[1]; };
const hear = (words, distractors, sd) => ({ text: words.join(", "), distractors,
  meaning: words.map(meanOf).join(" · ") + (sd ? (sd === "S" ? " (মাঝের ধ্বনি একই: S)" : " (মাঝের ধ্বনি আলাদা: D)") : "") });
const hearLine = (en, distractors) => ({ text: en, distractors, meaning: line(en)[1] });
const title = (page, game) => `${TITLE[page]} · ${game}`;
const QUIET = "No voice and no pictures to add: publish it once imported.";
const TF = [{ name: "True" }, { name: "False" }];
const NPV = [{ name: "Noun" }, { name: "Pronoun" }, { name: "Verb" }];

module.exports = {
  // ───────────── Unit 1 ─────────────
  5: [
    { type: "select_missing_word", title: title(5, "Choose the meaning"), audio: false, notes: [QUIET, "Practice 1: tick the right meaning (the book's two choices)."],
      content: { mode: "cloze", questions: [
        choose("Here ‘favourite’ means", ["most liked", "disliked"], 0),
        choose("Here ‘game’ means", ["sport", "reading book"], 0),
      ] } },
    { type: "speak_correct_response", title: title(5, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Practice 2: the questions about the dialogue on page 4; the answers are from it."],
      content: { lines: [
        ask("What is Zahid’s favourite game?", N("Cricket is Zahid’s favourite game.", "ক্রিকিট ইজ় জ়াহিদজ় ফ়েইভ়ারিট গেইম।", "ক্রিকেট জাহিদের প্রিয় খেলা।")),
        ask("What is Sakiba’s favourite subject?", N("English is Sakiba’s favourite subject.", "ইংলিশ ইজ় স়াকিবাজ় ফ়েইভ়ারিট স়াবজিক্ট।", "ইংরেজি সাকিবার প্রিয় বিষয়।")),
        ask("What do Zahid and Sakiba talk about?", N("They talk about their favourite game and subject.", "দ়েই টক আবাউট দ়েয়া ফ়েইভ়ারিট গেইম অ্যান্ড স়াবজিক্ট।", "ওরা ওদের প্রিয় খেলা আর প্রিয় বিষয় নিয়ে কথা বলে।")),
      ] } },
  ],
  11: [
    { type: "word_bank_fill", title: title(11, "Fill the gaps"), audio: false, notes: [QUIET, "Practice 1 and 2: the dialogues of lessons 3 and 4 with their gaps."],
      content: { questions: [
        fill("_______________, Roton.", ["Good evening"], ["Goodbye", "Good night"]),
        fill("Nice to _______ you.", ["meet"], ["Nice", "fine"]),
        fill("_________ meeting you, too.", ["Nice"], ["Okay", "meet"]),
        fill("I’m ____________, ____________. And you?", ["fine", "thanks"], ["Where", "later"]),
        fill("I’m _____________. __________are you going?", ["good", "Where"], ["See", "Nice"]),
        fill("_________, goodbye. _________ you ___________ .", ["Okay", "See", "later"], ["Where", "meet"]),
        fillNew("____!", ["Goodbye"], ["Hello", "Nice"], "গুডবাই!", "____!"),
      ] } },
  ],
  14: [
    { type: "match_pair", title: title(14, "Match A and B"), audio: false, notes: [QUIET, "Practice 1: each number to its word."],
      content: { pairs: [["1", "one", "এক"], ["2", "two", "দুই"], ["3", "three", "তিন"], ["4", "four", "চার"], ["5", "five", "পাঁচ"], ["6", "six", "ছয়"], ["7", "seven", "সাত"], ["8", "eight", "আট"], ["9", "nine", "নয়"]]
        .map(([n, w, bn]) => pair(n, w, { leftMeaning: bn, right: false })) } },
    { type: "word_bank_fill", title: title(14, "Missing number words"), audio: false, notes: [QUIET, "Practice 2: the missing numbers in words (the book's line, in two parts)."],
      content: { questions: [
        fillNew("one, ____, three, ____, ____, six", ["two", "four", "five"], ["seven", "nine"], "ওয়ান, টূ, থ়্রী, ফ়ো, ফ়াইভ়, স়িক্স", "এক, ____, তিন, ____, ____, ছয়"),
        fillNew("six, ____, ____, nine, ____.", ["seven", "eight", "ten"], ["four", "five"], "স়িক্স, স়েভ়ান, এইট, নাইন, টেন।", "ছয়, ____, ____, নয়, ____।"),
      ] } },
  ],
  15: [
    { type: "speak_correct_response", title: title(15, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity B: the questions about Jerin; the answers are from activity A."],
      content: { lines: [
        ask("What is the girl’s name?", L("The girl’s name is Jerin.")),
        ask("How old is she?", N("She is 8 years old.", "শী ইজ় এইট ইয়াজ় ওল্ড।", "ওর বয়স ৮ বছর।")),
        ask("Where does she live?", N("She lives in Mohonpur.", "শী লিভ়জ় ইন মোহনপুর।", "ও মোহনপুরে থাকে।")),
        ask("What class is she in?", N("She is in class 3.", "শী ইজ় ইন ক্লাস় থ়্রী।", "ও তৃতীয় শ্রেণিতে পড়ে।")),
      ] } },
  ],
  16: [
    { type: "word_bank_fill", title: title(16, "Fill the gaps"), audio: false, notes: [QUIET, "Practice 1: the box's words (school, class, family, lives) in the blanks."],
      content: { questions: [
        fill("She is in __________ 3.", ["class"], ["school", "family", "lives"]),
        fill("Her __________ is Mohonpur Government Primary School.", ["school"], ["class", "family", "lives"]),
        fill("She __________ in Mohonpur.", ["lives"], ["school", "class", "family"]),
        fill("She lives with her __________ .", ["family"], ["school", "class", "lives"]),
      ] } },
  ],
  18: [
    { type: "word_bank_fill", title: title(18, "Fill the gaps"), audio: false, notes: [QUIET, "Practice 1: the dialogue of activity A with new names, and its gaps."],
      content: { questions: [
        fill("Hi, Laila! ________ ________ ________?", ["How", "are", "you"], ["meet", "Nice"]),
        fill("Fine, thanks. Sagor, ____________ my friend, Mamun. And Mamun, this is Sagor.", ["meet"], ["Nice", "meeting"]),
        fill("Hello, Mamun! _________ to __________ you.", ["Nice", "meet"], ["meeting", "How"]),
        fill("Nice ____________ you, too.", ["meeting"], ["meet", "How"]),
      ] } },
  ],
  20: [
    { type: "match_pair", title: title(20, "Match A and B"), audio: false, notes: [QUIET, "Practice 1: each number to its word."],
      content: { pairs: [["11", "eleven", "এগারো"], ["12", "twelve", "বারো"], ["15", "fifteen", "পনেরো"], ["18", "eighteen", "আঠারো"], ["20", "twenty", "বিশ"]]
        .map(([n, w, bn]) => pair(n, w, { leftMeaning: bn, right: false })) } },
    { type: "word_bank_fill", title: title(20, "Missing number words"), audio: false, notes: [QUIET, "Practice 3: the missing numbers in words, eleven to twenty."],
      content: { questions: [
        fillNew("____, twelve, thirteen, ____,", ["eleven", "fourteen"], ["sixteen", "nineteen"], "ইলেভ়ান, টুয়েলভ়, থ়াটীন, ফ়োটীন,", "____, বারো, তেরো, ____,"),
        fillNew("fifteen, ____, ____,", ["sixteen", "seventeen"], ["fourteen", "eighteen"], "ফ়িফ়টীন, স়িক্সটীন, স়েভ়ানটীন,", "পনেরো, ____, ____,"),
        fillNew("eighteen, ____, ____.", ["nineteen", "twenty"], ["eleven", "seventeen"], "এইটীন, নাইনটীন, টুয়েন্টি।", "আঠারো, ____, ____।"),
      ] } },
  ],

  // ───────────── Unit 2 ─────────────
  25: [
    { type: "word_bank_fill", title: title(25, "Complete the sentences"), audio: false, notes: [QUIET, "Practice 1: the sentences about the dialogue of lesson 1, activity B (page 22)."],
      content: { questions: [
        fill("Farzana is a new ____________.", ["student"], ["Rajshahi", "Sylhet", "the school"]),
        fill("She is from ____________.", ["Rajshahi"], ["Sylhet", "student", "the school"]),
        fill("Faria is from ____________.", ["Sylhet"], ["Rajshahi", "student", "the school"]),
        fill("Her family lives near ____________.", ["the school"], ["Rajshahi", "Sylhet", "student"]),
      ] } },
  ],
  26: [
    { type: "group_sort", title: title(26, "True or False"), audio: false, notes: [QUIET, "Activity B: True or False, about Sabiha's text in activity A."],
      content: { categories: TF, items: [
        tf("The girl’s name is Samia. _____________", false),
        tf("She is in class three. _______________", true),
        tf("She is a student. _______________", true),
        tf("There are four members in her family. ____________", true),
        tf("Her brother is 3 years old. _____________", false),
      ] } },
    { type: "speak_correct_response", title: title(26, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity C: the questions about Sabiha; the answers are from activity A."],
      content: { lines: [
        ask("What is the girl’s name?", N("The girl’s name is Sabiha.", "দ়া গালজ় নেইম ইজ় স়াবিহা।", "মেয়েটির নাম সাবিহা।")),
        ask("How many members are there in her family?", L("There are four members in her family. ____________")),
        ask("What does her mother do?", N("Her mother is a banker.", "হা মাদ়া ইজ় আ ব্যাংকা।", "ওর মা একজন ব্যাংকার।")),
        ask("What does her father do?", N("Her father is a teacher.", "হা ফ়াদ়া ইজ় আ টীচা।", "ওর বাবা একজন শিক্ষক।")),
        ask("How old is her brother?", N("Her brother is only one year old.", "হা ব্রাদ়া ইজ় ওনলি ওয়ান ইয়া ওল্ড।", "ওর ভাইয়ের বয়স মাত্র এক বছর।")),
      ].map((l) => ({ ...l, text: l.text.replace(/\s*____$/, "") })) } },
  ],
  27: [
    { type: "match_pair", title: title(27, "Match A and B"), audio: false, notes: [QUIET, "Practice 1: the phrases of column A with column B, about Sabiha's family."],
      content: { pairs: [
        pair("Sabiha", "is a student."), pair("Her father", "is a teacher."), pair("Her mother", "works in a bank."), pair("Her brother", "is one year old."),
      ] } },
    { type: "select_missing_word", title: title(27, "Tick the right word"), audio: false, notes: [QUIET, "Practice 2: the right word of the two in brackets."],
      content: { mode: "cloze", questions: [
        choose("Mr. Aminul Islam is a (teacher/banker).", ["teacher", "banker"], 0),
        choose("Sabiha is in class (three/four).", ["three", "four"], 0),
        choose("She has a (brother/sister).", ["brother", "sister"], 0),
        choose("Sabiha’s mother is a (doctor/banker).", ["doctor", "banker"], 1),
        choose("Sabiha’s family has (four/three) members.", ["four", "three"], 0),
      ] } },
  ],
  29: [
    { type: "speak_correct_response", title: title(29, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity B: the questions about Sunil's text in activity A, with its answers."],
      content: { lines: [
        ask("How old is Sunil?", N("Sunil is eight years old.", "স়ুনীল ইজ় এইট ইয়াজ় ওল্ড।", "সুনীলের বয়স আট বছর।")),
        ask("What is his best friend’s name?", N("His best friend’s name is Rahat.", "হিজ় বেস্ট ফ়্রেন্ডজ় নেইম ইজ় রাহাত।", "ওর সবচেয়ে ভালো বন্ধুর নাম রাহাত।")),
        ask("Where does Rahat live?", N("Rahat lives near Sunil’s house.", "রাহাত লিভ়জ় নিয়া স়ুনীলজ় হাউস়।", "রাহাত সুনীলের বাড়ির কাছে থাকে।")),
        ask("What do they do in the afternoon?", N("They play football in the afternoon.", "দ়েই প্লেই ফ়ুটবল ইন দ়ি আফ়টানূন।", "ওরা বিকেলে ফুটবল খেলে।")),
      ] } },
  ],
  30: [
    { type: "select_missing_word", title: title(30, "Tick the right answer"), audio: false, notes: [QUIET, "Practice 1: the right words of the two in brackets, about Sunil's text (page 29)."],
      content: { mode: "cloze", questions: [
        choose("Sunil is (seven years/eight years) old.", ["seven years", "eight years"], 1),
        choose("Rahat is good at (Bangla/English).", ["Bangla", "English"], 1),
        choose("They play (cricket/football).", ["cricket", "football"], 1),
        choose("In the afternoon, they (play/eat).", ["play", "eat"], 0),
      ] } },
    { type: "word_bank_fill", title: title(30, "Complete the sentences"), audio: false, notes: [QUIET, "Practice 2: the sentences about activity A (page 29)."],
      content: { questions: [
        fill("Sunil has many _____________ .", ["friends"], ["football", "near"]),
        fill("Rahat lives _____________ Sunil’s house.", ["near"], ["friends", "football"]),
        fill("They play _____________ in the afternoon.", ["football"], ["friends", "near"]),
      ] } },
  ],
  32: [
    { type: "group_sort", title: title(32, "Even and odd numbers"), audio: false, notes: [QUIET, "Activity E: the numbers in the circles, even or odd."],
      content: { categories: [{ name: "Even numbers" }, { name: "Odd numbers" }],
        items: ["62", "51", "70", "56", "69", "55", "67", "52", "63", "66", "65", "53", "57", "68", "61"].map((n) => ({ text: n, category: +n % 2 ? 1 : 0 })) } },
  ],
  33: [
    { type: "group_sort", title: title(33, "Odd and even numbers"), audio: false, notes: [QUIET, "Practice 2: the odd and even numbers from 51 to 70 (the book gives 51, 52, 61 and 62)."],
      content: { categories: [{ name: "Odd numbers" }, { name: "Even numbers" }],
        items: [53, 54, 55, 56, 57, 58, 59, 60, 63, 64, 65, 66, 67, 68, 69, 70].map((n) => ({ text: String(n), category: n % 2 ? 0 : 1 })) } },
  ],

  // ───────────── Unit 3 ─────────────
  37: [
    { type: "word_bank_fill", title: title(37, "Complete the commands"), audio: false, notes: [QUIET, "Activity E: the commands for exercise 3 (the girl in the picture), with the words of lesson 1's commands."],
      content: { questions: [
        fill("……………. your head upright.", ["Keep"], ["Look", "Breathe"]),
        fill("……………. at the front.", ["Look"], ["Keep", "Breathe"]),
        fill("……………. your back straight.", ["Keep"], ["Look", "Breathe"]),
        fill("……………. your hands on waist.", ["Keep"], ["Look", "Breathe"]),
        fill("……………. your left leg forward.", ["Keep"], ["Look", "Breathe"]),
        fill("……………. your right knee still.", ["Keep"], ["Look", "Breathe"]),
      ] } },
  ],
  41: [
    { type: "speak_correct_response", title: title(41, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity B: each instruction of the rhyme as a question; the child does it and answers."],
      content: { lines: ["Can you clap your hands?", "Can you stamp your feet?", "Can you stretch up high?", "Can you touch your toes?", "Can you turn around?"]
        .map((q) => ask(q, N("Yes, I can.", "ইয়েস়, আই ক্যান।", "হ্যাঁ, পারি।"))) } },
  ],
  43: [
    { type: "group_sort", title: title(43, "Dos and Don’ts"), audio: false, notes: [QUIET, "Activity E: the library card's instructions under ‘Dos’ and ‘Don’ts’."],
      content: { categories: [{ name: "Dos" }, { name: "Don’ts" }], items: [
        ["Use the books with maximum care.", 0], ["Please return the book timely.", 0], ["Don’t fold over the pages.", 1], ["Don’t write inside a book.", 1],
        ["Always keep the book with face up.", 0], ["Don’t lose or damage a book.", 1], ["Pay your library fees regularly.", 0],
      ].map(([en, c]) => ({ ...L(en), category: c })) } },
  ],
  45: [
    { type: "match_pair", title: title(45, "Requests and responses"), audio: false, notes: [QUIET, "Activity C: each request (A) with its response (B)."],
      content: { pairs: [
        pair("Could you please call me this evening?", "Of course. I will call you around 6:00."),
        pair("Can you repeat that, please?", "Sure. I am saying it again."),
        pair("Could I have a look at your newspaper?", "Sorry, but I am reading it now."),
        pair("Can I borrow your pen, please?", "Sorry. I have only one pen."),
        pair("Can we meet at the library?", "Yes, please. I will see you at the library."),
      ] } },
  ],
  47: [
    { type: "sentence_building", title: title(47, "Put the numbers in order"), audio: false, notes: ["No voice and no pictures to add: publish it once imported.", "Activity F: the numbers 71 to 90 in order, five at a time."],
      content: { mode: "build", sentences: [
        N("71 72 73 74 75", "স়েভ়ানটি-ওয়ান, স়েভ়ানটি-টূ, স়েভ়ানটি-থ়্রী, স়েভ়ানটি-ফ়ো, স়েভ়ানটি-ফ়াইভ়", "একাত্তর, বাহাত্তর, তিয়াত্তর, চুয়াত্তর, পঁচাত্তর"),
        N("76 77 78 79 80", "স়েভ়ানটি-স়িক্স, স়েভ়ানটি-স়েভ়ান, স়েভ়ানটি-এইট, স়েভ়ানটি-নাইন, এইটি", "ছিয়াত্তর, সাতাত্তর, আটাত্তর, ঊনআশি, আশি"),
        N("81 82 83 84 85", "এইটি-ওয়ান, এইটি-টূ, এইটি-থ়্রী, এইটি-ফ়ো, এইটি-ফ়াইভ়", "একাশি, বিরাশি, তিরাশি, চুরাশি, পঁচাশি"),
        N("86 87 88 89 90", "এইটি-স়িক্স, এইটি-স়েভ়ান, এইটি-এইট, এইটি-নাইন, নাইন্টি", "ছিয়াশি, সাতাশি, অষ্টাশি, ঊননব্বই, নব্বই"),
      ] } },
  ],

  // ───────────── Unit 4 ─────────────
  // the sound pages: Select the Words You Hear (the voice says two words, or a phrase; the child taps what it heard)
  48: [
    { type: "select_words_you_hear", title: title(48, "Listen and choose"), audio: "English, British voice: each pair of words, slowly, with a short pause between them.", notes: ["Activities A and B: the four words with the middle sound /æ/; the child hears two and taps them among the others."],
      content: { rounds: [hear(["bag", "mat"], ["hat", "cat"]), hear(["hat", "cat"], ["bag", "mat"]), hear(["cat", "bag"], ["mat", "hat"]), hear(["mat", "hat"], ["cat", "bag"])] } },
  ],
  49: [
    { type: "select_words_you_hear", title: title(49, "Listen and choose"), audio: "English, British voice: each phrase or pair of words, slowly.", notes: ["Activities C and D: the phrases with /æ/, then the words with the middle sound /e/."],
      content: { rounds: [
        hearLine("a cat on a mat", ["hat", "bag"]), hearLine("a hat on a cat", ["mat", "bag"]), hearLine("a bag on a mat", ["cat", "hat"]),
        hear(["pen", "hen"], ["red", "net"]), hear(["red", "net"], ["pen", "hen"]),
      ] } },
  ],
  50: [
    { type: "select_words_you_hear", title: title(50, "Same or different?"), audio: "English, British voice: each pair of words, slowly, with a short pause between them.",
      notes: ["Activity G: the voice says each pair; the child taps the two words, then hears whether their middle sounds are the same.", "The book's answers: 1 pen–pan D, 2 man–men D, 3 bag–mat S, 4 pen–ten S, 5 bed–cat D."],
      content: { rounds: [hear(["pen", "pan"], ["ten", "man"], "D"), hear(["man", "men"], ["pan", "pen"], "D"), hear(["bag", "mat"], ["bed", "pet"], "S"), hear(["pen", "ten"], ["pan", "hen"], "S"), hear(["bed", "cat"], ["bad", "pet"], "D")] } },
  ],
  51: [
    { type: "group_sort", title: title(51, "Sort by the middle sound"), audio: false, notes: [QUIET, "Practice 3: the words with the middle sound /æ/ (the book's circle) and /e/ (underline); meanings only, so the sound isn't given away."],
      content: { categories: [{ name: "/æ/ as in bag" }, { name: "/e/ as in pen" }],
        items: [["cat", 0], ["pen", 1], ["man", 0], ["bed", 1], ["pan", 0], ["ten", 1], ["red", 1], ["hen", 1], ["hat", 0], ["cap", 0]].map(([w, c]) => item(w, c, "meaning")) } },
  ],
  52: [
    { type: "select_words_you_hear", title: title(52, "Listen and choose"), audio: "English, British voice: each pair of words, slowly, with a short pause between them.", notes: ["Activities A to D: the words with /ɪ/ (tin) and /i:/ (bean); the child hears two and taps them."],
      content: { rounds: [hear(["tin", "pin"], ["bean", "pill"]), hear(["hill", "pill"], ["tin", "feed"]), hear(["bean", "sheep"], ["pin", "sleep"]), hear(["sleep", "feed"], ["sheep", "hill"])] } },
  ],
  53: [
    { type: "select_words_you_hear", title: title(53, "Same or different?"), audio: "English, British voice: each pair of words, slowly, with a short pause between them.",
      notes: ["Activities F and G: the voice says each pair; the child taps the two words, then hears whether their middle sounds are the same.", "The book's answers: 1 slip–sleep D, 2 still–steel D, 3 bean–bin D, 4 ship–sheep D, 5 hit–heat D, 6 bin–fin S."],
      content: { rounds: [hear(["slip", "sleep"], ["ship", "sheep"], "D"), hear(["still", "steel"], ["fill", "feed"], "D"), hear(["bean", "bin"], ["fin", "feed"], "D"), hear(["ship", "sheep"], ["slip", "sleep"], "D"), hear(["hit", "heat"], ["tin", "bean"], "D"), hear(["bin", "fin"], ["bean", "feed"], "S")] } },
    { type: "group_sort", title: title(53, "Sort by the middle sound"), audio: false, notes: [QUIET, "Practice 1: the words with /i/ (the book's circle) and /i:/ (underline); meanings only, so the sound isn't given away."],
      content: { categories: [{ name: "/i/ as in tin" }, { name: "/i:/ as in bean" }],
        items: [["feed", 1], ["nil", 0], ["fill", 0], ["sheep", 1], ["tin", 0], ["ship", 0], ["slip", 0], ["bean", 1]].map(([w, c]) => item(w, c, "meaning")) } },
  ],
  54: [
    { type: "match_pair", title: title(54, "Match the animals"), audio: false, notes: [QUIET, "Activity A: each animal's name to its picture (emoji pictures; the book's own can be uploaded in the editor)."],
      content: { pairs: [pair("Polar bear", "polar bear", { right: false, emoji: "🐻‍❄️" }), pair("Lion", "lion", { right: false, emoji: "🦁" }), pair("Crocodile", "crocodile", { right: false, emoji: "🐊" })] } },
  ],
  56: [
    { type: "select_words_you_hear", title: title(56, "Listen and choose"), audio: "English, British voice: each pair of words, slowly, with a short pause between them.", notes: ["Activities A and C: the words with the middle sounds /ɑː/ (cart) and /ʌ/ (cut); the child hears two and taps them."],
      content: { rounds: [hear(["cart", "card"], ["heart", "cut"]), hear(["heart", "bard"], ["hut", "bud"]), hear(["cut", "hut"], ["cart", "heart"]), hear(["bud", "hush"], ["bard", "hut"])] } },
  ],
  57: [
    { type: "select_words_you_hear", title: title(57, "Listen and choose"), audio: "English, British voice: each sentence, slowly.", notes: ["Activity E: three of the sentences (the other two have more words than the game shows), then a pair of words."],
      content: { rounds: [hearLine("The bard sings.", ["bud", "card"]), hearLine("The flower is in bud.", ["bard", "hut"]), hearLine("They live in a hut.", ["heart", "cut"]), hear(["bard", "bud"], ["card", "cut"])] } },
  ],
  58: [
    { type: "select_words_you_hear", title: title(58, "Same or different?"), audio: "English, British voice: each pair of words, slowly, with a short pause between them.",
      notes: ["Activity F: the voice says each pair; the child taps the two words, then hears whether their middle sounds are the same.", "The book's answers: 1 heart–hut D, 2 bud–bun S, 3 cut–cart D, 4 mug–jug S, 5 bard–bud D, 6 barn–bun D."],
      content: { rounds: [hear(["heart", "hut"], ["cart", "nut"], "D"), hear(["bud", "bun"], ["bard", "barn"], "S"), hear(["cut", "cart"], ["hut", "heart"], "D"), hear(["mug", "jug"], ["tub", "nut"], "S"), hear(["bard", "bud"], ["card", "cut"], "D"), hear(["barn", "bun"], ["bud", "bard"], "D")] } },
    { type: "group_sort", title: title(58, "Sort by the middle sound"), audio: false, notes: [QUIET, "Practice 1: the words with the middle sound /ɑː/ and /ʌ/; meanings only, so the sound isn't given away."],
      content: { categories: [{ name: "/ɑː/ as in cart" }, { name: "/ʌ/ as in cut" }],
        items: [["start", 0], ["part", 0], ["nut", 1], ["cut", 1], ["shut", 1], ["far", 0], ["mart", 0], ["cart", 0]].map(([w, c]) => item(w, c, "meaning")) } },
  ],
  63: [
    { type: "match_pair", title: title(63, "Which shelf?"), audio: false, notes: [QUIET, "Activity D: each book to its shelf, counted from the bottom (Fable is on the 1st shelf); the child looks at the shelf on the page."],
      content: { pairs: [["Health care", 9], ["Liberation war", 10], ["Travel", 8], ["Poetry", 3], ["Science fiction", 4], ["Novel", 6], ["Art", 7], ["Religion", 5], ["Rhyme", 2], ["Fable", 1]]
        .map(([b, n]) => { const o = ["", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"][n], [h, m] = line(o);
          return { ...pair(b, "", { right: false }), right: `${n}${["", "st", "nd", "rd"][n] || "th"} shelf`, rightRoman: roman(`${plain(h)} শেলফ়`), rightMeaning: `${m} তাক` }; }) } },
  ],
  64: [
    { type: "match_pair", title: title(64, "Months in order"), audio: false, notes: [QUIET, "Practice 1: each ordinal number to its month."],
      content: { pairs: [["1st", "first", "January"], ["2nd", "second", "February"], ["3rd", "third", "March"], ["4th", "fourth", "April"], ["5th", "fifth", "May"], ["6th", "sixth", "June"], ["7th", "seventh", "July"], ["8th", "eighth", "August"], ["9th", "ninth", "September"], ["10th", "tenth", "October"]]
        .map(([n, o, mo]) => { const [h, m] = line(o), M = L(mo); return { left: n, right: mo, leftRoman: roman(h), leftMeaning: m, rightRoman: M.roman, rightMeaning: M.meaning }; }) } },
    { type: "word_bank_fill", title: title(64, "Fill the gaps"), audio: false, notes: [QUIET, "Practice 3: the ordinal numbers of the months."],
      content: { questions: [
        fill("January is the ______________ month of the year.", ["first"], ["third", "fourth"]),
        fill("July is the ______________ month of the year.", ["seventh"], ["ninth", "first"]),
        fill("March is the ______________ month of the year.", ["third"], ["fourth", "seventh"]),
        fill("September is the ______________ month of the year.", ["ninth"], ["seventh", "third"]),
        fill("April is the ______________ month of the year.", ["fourth"], ["first", "ninth"]),
      ] } },
  ],

  // ───────────── Unit 5 ─────────────
  66: [
    { type: "word_bank_fill", title: title(66, "Fill the gaps"), audio: false, notes: [QUIET, "Activity D: the box's words in the blanks (one of them, 2nd, is left over)."],
      content: { questions: [
        fill("Porshi goes to a …………............ school.", ["primary"], ["teacher", "roof", "love"]),
        fill("A ……………… leads a students’ group.", ["teacher"], ["primary", "Jamuna", "roof"]),
        fill("In the ………. week, ……… group cleans the wash block.", ["3rd", "Jamuna"], ["2nd", "primary"], ["থ়াড", "যমুনা"]),
        fill("I like the …………. garden.", ["roof"], ["primary", "love"]),
        fill("Do the students …………. their school?", ["love"], ["roof", "teacher"]),
      ] } },
    { type: "speak_correct_response", title: title(66, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity C: the questions about Porshi's school; the answers are from the text and the table."],
      content: { lines: [
        ask("Where does Porshi live?", L("Porshi lives in Kushtia.")),
        ask("What does Padma group clean in the 1st week?", N("Padma group cleans the classroom in the 1st week.", "পদ্মা গ্রূপ ক্লীনজ় দ়া ক্লাস়রূম ইন দ়া ফ়াস্ট উইক।", "পদ্মা দল প্রথম সপ্তাহে শ্রেণিকক্ষ পরিষ্কার করে।")),
        ask("Who supervises the groups of students?", N("The Headteacher supervises the groups.", "দ়া হেডটীচা স়ূপাভ়াইজ়িজ় দ়া গ্রূপস।", "প্রধান শিক্ষক দলগুলো তদারক করেন।")),
        ask("When does Surma group clean garden?", N("Surma group cleans the garden in the 4th week.", "স়ুরমা গ্রূপ ক্লীনজ় দ়া গাডান ইন দ়া ফ়োথ় উইক।", "সুরমা দল চতুর্থ সপ্তাহে বাগান পরিষ্কার করে।")),
        ask("How many classes are there in a group of students?", N("There are three classes: three, four and five.", "দ়েয়া আ থ়্রী ক্লাস়িজ়: থ়্রী, ফ়ো অ্যান্ড ফ়াইভ়।", "তিনটি শ্রেণি: তৃতীয়, চতুর্থ আর পঞ্চম।")),
      ] } },
  ],
  67: [
    { type: "group_sort", title: title(67, "True or False"), audio: false, notes: [QUIET, "Practice 1: True or False, about Porshi's text (page 65)."],
      content: { categories: TF, items: [
        tf("Porshi lives in Jashore. ______________", false),
        tf("Students assist each other. ______________", true),
        tf("The Head teacher guides the students. ______________", true),
        tf("Students rarely use bin. ______________", false),
        tf("Porshi likes the cleaning activities. ______________", true),
      ] } },
  ],
  69: [
    { type: "speak_correct_response", title: title(69, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity C: the questions about Rani's text (page 68), with its sentences as the answers (question 4 asks the child's own reason, so it isn't here)."],
      content: { lines: [
        ask("Who is a special need student?", L("Rani is a special need student.")),
        ask("How does Rani join lessons outside the classroom?", L("Rani joins these classes in a wheel chair.")),
        ask("Where do the students borrow story books from?", L("Every Thursday, students borrow story books from the school library.")),
      ] } },
  ],
  70: [
    { type: "group_sort", title: title(70, "Nouns, pronouns and verbs"), audio: false, notes: [QUIET, "Activity E: words of the text in B (page 68), by their parts of speech (Rani, she and goes are the book's example)."],
      content: { categories: NPV, items: [
        ["Rani", 0], ["Porshi", 0], ["school", 0], ["chair", 0], ["library", 0], ["friends", 0],
        ["she", 1], ["they", 1], ["her", 1],
        ["goes", 2], ["joins", 2], ["enjoy", 2], ["follow", 2], ["like", 2],
      ].map(([w, c]) => item(w, c)) } },
  ],
  71: [
    { type: "sentence_building", title: title(71, "Make sentences"), audio: false, notes: [QUIET, "Practice 1: the jumbled words as sentences."],
      content: { mode: "build", sentences: [
        rearranged("Sujan child need special a is", "Sujan is a special need child."),
        rearranged("Kajal are neighbours Kanta and", "Kajal and Kanta are neighbours."),
        rearranged("Aurup attentive is class in the", "Aurup is attentive in the class."),
        rearranged("enjoys Arnab classes the", "Arnab enjoys the classes."),
        rearranged("Sunday students their clean school on", "Students clean their school on Sunday."),
      ] } },
    { type: "group_sort", title: title(71, "Nouns, pronouns and verbs"), audio: false, notes: [QUIET, "Practice 2: the table's words: the nouns (circle), the pronouns (underline) and the verbs (tick)."],
      content: { categories: NPV, items: [["chair", 0], ["borrow", 2], ["they", 1], ["these", 1], ["sit", 2], ["Sunday", 0], ["play", 2], ["her", 1], ["library", 0]].map(([w, c]) => item(w, c)) } },
  ],
  72: [
    { type: "select_missing_word", title: title(72, "Choose the answer"), audio: false, notes: [QUIET, "Activity B: questions 1 and 3, from Osman's text in A (question 2, when he brushes his teeth, has no clear answer in the text: \"First, he gets ready for breakfast. Then he brushes his teeth\", so it is left to the teacher)."],
      content: { mode: "cloze", questions: [
        choose("Osman borrows story books from ….", ["the school", "his father", "the village library"], 2),
        choose("Osman studies in the ….", ["afternoon", "free time", "morning and the evening"], 2, "মনিং অ্যান্ড দ়ি ঈভ়নিং"),
      ] } },
  ],
  73: [
    { type: "match_pair", title: title(73, "Words of similar meaning"), audio: false, notes: [QUIET, "Activity C: each word in column A with its word of similar meaning in column B."],
      content: { pairs: [pair("get up", "rise"), pair("beautiful", "pretty"), pair("help", "support"), pair("breakfast", "morning meal"), pair("study", "learn")] } },
  ],
  75: [
    { type: "match_pair", title: title(75, "Match A and B"), audio: false, notes: [QUIET, "Practice 1: each word in column A with its word of similar meaning in column B."],
      content: { pairs: [pair("get up", "wake up"), pair("ready", "prepare"), pair("borrow", "loan"), pair("study", "read"), pair("proud", "boast")] } },
    { type: "group_sort", title: title(75, "Nouns, pronouns and verbs"), audio: false, notes: [QUIET, "Practice 2: the box's words in the right column."],
      content: { categories: NPV, items: [["live", 2], ["he", 1], ["breakfast", 0], ["school", 0], ["his", 1], ["borrow", 2], ["Friday", 0], ["enjoy", 2]].map(([w, c]) => item(w, c)) } },
    { type: "select_missing_word", title: title(75, "Choose the right word"), audio: false, notes: [QUIET, "Practice 3: the right word to complete each sentence, from Osman's text (page 72)."],
      content: { mode: "cloze", questions: [
        choose("Osman lives in a ….", ["town", "village", "slum"], 1),
        choose("Sometimes, he goes fishing in the river with his….", ["brother", "uncle", "father"], 2),
        choose("Every Friday, he borrows storybooks from the village….", ["fair", "library", "market"], 1),
      ] } },
  ],
  77: [
    { type: "select_missing_word", title: title(77, "Choose the answer"), audio: false, notes: [QUIET, "Activity B: the right answers, from Oyshi's text (page 76); question 2 is asked as a sentence to complete."],
      content: { mode: "cloze", questions: [
        choose("Oyshi goes to school with her ….", ["father", "brother", "mother"], 0),
        chooseNew("Oyshi attends the art class ____ in a week.", ["one day", "two days", "three days"], 1, "ঐশী আটেন্ডজ় দ়ি আট ক্লাস় টূ ডেইজ় ইন আ উইক।", "ঐশী সপ্তাহে ____ আর্ট ক্লাসে যায়।"),
        choose("Green city is a city where we find more ….", ["schools", "zebra crossings", "trees"], 2),
      ] } },
    { type: "match_pair", title: title(77, "Words and meanings"), audio: false, notes: [QUIET, "Activity C: each word in column A with its meaning in column B."],
      content: { pairs: [pair("return", "come back"), pair("parents", "mother and father"), pair("borrow", "take something from someone"), pair("academy", "school")] } },
    { type: "sentence_building", title: title(77, "Make sentences"), audio: false, notes: [QUIET, "Activity D: the jumbled words as sentences (the book's example, She borrows a book., isn't here)."],
      content: { mode: "build", sentences: [
        rearranged("he group work the presents", "He presents the group work."),
        rearranged("shirt my is beautiful", "My shirt is beautiful."),
        rearranged("want a city we green", "We want a green city."),
        rearranged("Titu his city clean keeps", "Titu keeps his city clean."),
        rearranged("holiday Friday is a", "Friday is a holiday."),
      ] } },
  ],
  80: [
    { type: "group_sort", title: title(80, "True or False"), audio: false, notes: [QUIET, "Practice 1: True or False, about Oyshi's text (page 76)."],
      content: { categories: TF, items: [
        tf("Oyshi lives in a village. ______________", false),
        tf("She takes care of her roof top garden. ______________", true),
        tf("She attends art class on Friday. ______________", true),
        tf("Oyshi likes to read story books. ______________", true),
        tf("Oyshi’s life in the city is boring. ______________", false),
      ] } },
    { type: "speak_correct_response", title: title(80, "Short answers"), audio: "English, British voice: the question, and the answer.", notes: ["Practice 2: the questions about Oyshi, with the text's sentences as the answers (question e asks the child's own reason, so it isn't here)."],
      content: { lines: [
        ask("Where does Oyshi live?", N("Oyshi lives in a city.", "ঐশী লিভ়জ় ইন আ স়িটি।", "ঐশী একটা শহরে থাকে।")),
        ask("What does she use to cross the road?", N("She uses the zebra crossing and foot overbridge.", "শী ইউজ়িজ় দ়া জ়েব্রা ক্রস়িং অ্যান্ড ফ়ুট ওভ়াব্রিজ।", "সে জেব্রা ক্রসিং আর ফুট ওভারব্রিজ ব্যবহার করে।")),
        ask("How does she help her parents?", L("She waters the plants in their garden.")),
        ask("Where does she love to live in?", L("Oyshi likes to live in a green city.")),
      ] } },
  ],

  // ───────────── Unit 6 ─────────────
  85: [
    { type: "group_sort", title: title(85, "True or False"), audio: false, notes: [QUIET, "Activity E: True or False, about Nusair's text (page 84)."],
      content: { categories: TF, items: [
        tf("Nusair loves to play alone.", false),
        tf("Nusair notices dirt under his fingernails.", false),
        tf("Germs are found in dirt.", true),
        tf("Nusair was aware of washing hands properly.", false),
        tf("Nusair follows what his mother says.", true),
      ] } },
  ],
  86: [
    { type: "speak_correct_response", title: title(86, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity H: the questions about Nusair's text (page 84), with its answers."],
      content: { lines: [
        ask("Who loves to play with friends?", L("Little boy Nusair loves to play with his friends.")),
        ask("How does Nusair look when he comes back home?", L("Sometimes, he comes back home with dirty clothes and shoes.")),
        ask("Who notices dirt under Nusair’s fingernails?", N("Nusair’s mother, Jesmin Akter, notices it.", "নুস়াইরজ় মাদ়া, জেস়মিন আক্তার, নোটিস়িজ় ইট।", "নুসাইরের মা জেসমিন আক্তার সেটা খেয়াল করেন।")),
        ask("What can make us sick?", N("Dirt can make us sick.", "ডাট ক্যান মেইক আস় স়িক।", "ময়লা থেকে আমাদের অসুখ হতে পারে।")),
        ask("Why do we need to wash hands properly?", N("We need to wash hands properly to clean the germs.", "উই নীড টু ওয়শ হ্যান্ডজ় প্রপালি টু ক্লীন দ়া জামজ়।", "জীবাণু পরিষ্কার করতে আমাদের ঠিকমতো হাত ধুতে হয়।")),
        ask("What should we use to wash hands?", N("We should use soap and water.", "উই শুড ইউজ় স়োপ অ্যান্ড ওয়টা।", "আমাদের সাবান আর পানি ব্যবহার করা উচিত।")),
        ask("What advice does Jesmin Akter give to Nusair?", N("Always wash your hands before eating and after playing.", "অলওয়েজ় ওয়শ ইয়ো হ্যান্ডজ় বিফ়ো ঈটিং অ্যান্ড আফ়টা প্লেইং।", "খাওয়ার আগে আর খেলার পরে সবসময় হাত ধোবে।")),
        ask("What habit makes Nusair healthy?", N("Washing hands regularly makes him healthy.", "ওয়শিং হ্যান্ডজ় রেগিউলালি মেইকস হিম হেলথ়ি।", "নিয়মিত হাত ধোয়ার অভ্যাস তাকে সুস্থ রাখে।")),
      ] } },
  ],
  88: [
    { type: "word_scramble", title: title(88, "Make the words"), audio: false, notes: [QUIET, "Practice 1: the jumbled letters as words, each starting with its capital letter (Seho, rDti, Hnad, pSao, eEy, otClh)."],
      content: { items: [["Shoe", "শূ", "জুতা"], ["Dirt", "ডাট", "ময়লা"], ["Hand", "হ্যান্ড", "হাত"], ["Soap", "স়োপ", "সাবান"], ["Eye", "আই", "চোখ"], ["Cloth", "ক্লথ়", "কাপড়"]]
        .map(([w, h, m]) => ({ word: w, meaning: m, roman: roman(h) })) } },
    { type: "match_pair", title: title(88, "Match A and B"), audio: false, notes: [QUIET, "Practice 2: each word in column A with its meaning in column B."],
      content: { pairs: [pair("enjoy", "to like something"), pair("dirty", "not clean"), pair("germ", "virus"), pair("finger", "parts of the body"), pair("wash", "clean with water")] } },
  ],
  90: [
    { type: "word_bank_fill", title: title(90, "Complete the sentences"), audio: false, notes: [QUIET, "Activity D: the box's words (turn, rinse, use, wash, wipe, rub) in the steps of washing hands, one word for each step."],
      content: { questions: [
        fill("…………….your hands for at least 20 seconds.", ["Rub"], ["Turn", "Wipe"]),
        fill("……………. soap on your hands.", ["Use"], ["Rinse", "Turn"]),
        fill("……………. your hands with the soap.", ["Wash"], ["Turn", "Use"]),
        fill("……………. your hands with clean water.", ["Rinse"], ["Turn", "Use"]),
        fill("…………….the tap off.", ["Turn"], ["Rub", "Wipe"]),
        fill("……………. your hands with a clean towel.", ["Wipe"], ["Turn", "Rinse"]),
      ] } },
  ],
  92: [
    { type: "group_sort", title: title(92, "True or False"), audio: false, notes: [QUIET, "Practice 1: True or False, about the steps of washing hands (page 89)."],
      content: { categories: TF, items: [
        tf("Dirt spread germs.", true),
        tf("Washing hands cannot prevent germs.", false),
        tf("Open the tap first to wet your hands.", true),
        tf("Turn the tap off while rubbing your hands.", true),
        tf("Cleaning the back of the hands is not important.", false),
      ] } },
    { type: "speak_correct_response", title: title(92, "Answer the questions"), audio: "English, British voice: the question, and the answer.", notes: ["Practice 3: the questions about washing hands, with answers from page 89."],
      content: { lines: [
        ask("How can we prevent germs?", N("We can prevent germs by washing hands.", "উই ক্যান প্রিভ়েন্ট জামজ় বাই ওয়শিং হ্যান্ডজ়।", "হাত ধুয়ে আমরা জীবাণু ঠেকাতে পারি।")),
        ask("Which things do you need to wash hands?", N("I need water, soap, a tap and a towel.", "আই নীড ওয়টা, স়োপ, আ ট্যাপ অ্যান্ড আ টাউয়াল।", "আমার লাগে পানি, সাবান, একটা কল আর একটা তোয়ালে।")),
        ask("Which parts of your hands do you need to clean?", N("I clean the back of my hands, fingers and under the nails.", "আই ক্লীন দ়া ব্যাক অভ় মাই হ্যান্ডজ়, ফ়িংগাজ় অ্যান্ড আন্ডা দ়া নেইলজ়।", "আমি হাতের পিঠ, আঙুল আর নখের নিচে পরিষ্কার করি।")),
        ask("How do you dry your hands?", N("I wipe my hands with a clean towel.", "আই ওয়াইপ মাই হ্যান্ডজ় উইদ় আ ক্লীন টাউয়াল।", "আমি পরিষ্কার তোয়ালে দিয়ে হাত মুছি।")),
      ] } },
  ],
  93: [
    { type: "match_pair", title: title(93, "Match the pictures"), audio: false, notes: [QUIET, "Activity A: each phrase to its picture (emoji pictures; the book's own can be uploaded in the editor)."],
      content: { pairs: [["eating food", "🍛"], ["touching a wound", "🩹"], ["using a toilet", "🚽"], ["sneezing", "🤧"], ["touching garbage", "🗑️"]].map(([p, e]) => pair(p, p, { right: false, emoji: e })) } },
  ],
  95: [
    { type: "speak_correct_response", title: title(95, "When do we wash our hands?"), audio: "English, British voice: the question with its words (not the picture), and the answer.", notes: ["Activity C: for each picture, say when we should wash our hands (the book's model: We should wash our hands after using toilet.); the answers are from page 94."],
      content: { lines: [
        ["🍛 eating food", "ঈটিং ফ়ূড", "খাবার খাওয়া", "We should wash our hands before and after eating food.", "উই শুড ওয়শ আওয়া হ্যান্ডজ় বিফ়ো অ্যান্ড আফ়টা ঈটিং ফ়ূড।", "খাবার খাওয়ার আগে ও পরে আমাদের হাত ধোয়া উচিত।"],
        ["⚽ playing outside", "প্লেইং আউটস়াইড", "বাইরে খেলা", "We should wash our hands after playing outside.", "উই শুড ওয়শ আওয়া হ্যান্ডজ় আফ়টা প্লেইং আউটস়াইড।", "বাইরে খেলার পরে আমাদের হাত ধোয়া উচিত।"],
        ["🩹 touching a wound", "টাচিং আ ঊন্ড", "ক্ষত ছোঁয়া", "We should wash our hands before and after touching a wound.", "উই শুড ওয়শ আওয়া হ্যান্ডজ় বিফ়ো অ্যান্ড আফ়টা টাচিং আ ঊন্ড।", "ক্ষত ছোঁয়ার আগে ও পরে আমাদের হাত ধোয়া উচিত।"],
        ["🗑️ touching garbage", "টাচিং গাবিজ", "ময়লা-আবর্জনা ছোঁয়া", "We should wash our hands after touching garbage.", "উই শুড ওয়শ আওয়া হ্যান্ডজ় আফ়টা টাচিং গাবিজ।", "ময়লা-আবর্জনা ছোঁয়ার পরে আমাদের হাত ধোয়া উচিত।"],
        ["🐕 touching a pet", "টাচিং আ পেট", "পোষা প্রাণী ছোঁয়া", "We should wash our hands after touching a pet.", "উই শুড ওয়শ আওয়া হ্যান্ডজ় আফ়টা টাচিং আ পেট।", "পোষা প্রাণী ছোঁয়ার পরে আমাদের হাত ধোয়া উচিত।"],
      ].map(([cue, ch, cm, a, ah, am]) => ({ prompt: `When should we wash our hands? ${cue}`, promptRoman: roman(`ওয়েন শুড উই ওয়শ আওয়া হ্যান্ডজ়? ${ch}`), promptMeaning: `কখন আমাদের হাত ধোয়া উচিত? ${cm}`, ...N(a, ah, am) })) } },
  ],
  96: [
    { type: "speak_correct_response", title: title(96, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity E: the questions about the text in B (page 94), with answers from it."],
      content: { lines: [
        ask("How do you wash your hands?", N("I wash my hands with soap and clean water.", "আই ওয়শ মাই হ্যান্ডজ় উইদ় স়োপ অ্যান্ড ক্লীন ওয়টা।", "আমি সাবান আর পরিষ্কার পানি দিয়ে হাত ধুই।")),
        ask("Why should you wash your hands?", N("I should wash my hands to stay healthy.", "আই শুড ওয়শ মাই হ্যান্ডজ় টু স্টেই হেলথ়ি।", "সুস্থ থাকার জন্য আমার হাত ধোয়া উচিত।")),
        ask("When should you wash your hands?", N("I should wash my hands before and after eating food.", "আই শুড ওয়শ মাই হ্যান্ডজ় বিফ়ো অ্যান্ড আফ়টা ঈটিং ফ়ূড।", "খাবার খাওয়ার আগে ও পরে আমার হাত ধোয়া উচিত।")),
      ] } },
    { type: "word_bank_fill", title: title(96, "Fill the gaps"), audio: false, notes: [QUIET, "Practice 1: the box's words (food, animal, habit, healthy, toilet) in the blanks."],
      content: { questions: [
        fill("Washing hands is a good __________________ .", ["habit"], ["food", "toilet"]),
        fill("You should wash hands before and after eating _______________ .", ["food"], ["habit", "animal"]),
        fill("Do not forget to wash your hands after using the _____________.", ["toilet"], ["food", "healthy"]),
        fill("You must wash your hands after touching an _________________.", ["animal"], ["habit", "toilet"]),
        fill("Wash your hands regularly to stay _____________ .", ["healthy"], ["animal", "habit"]),
      ] } },
  ],

  // ───────────── Unit 7 ─────────────
  99: [
    { type: "group_sort", title: title(99, "True or False"), audio: false, notes: [QUIET, "Activity D: True or False, about Shihab and Kaniz's text (page 98)."],
      content: { categories: TF, items: [
        tf("Shihab and Kaniz go to the same school.", true),
        tf("Shihab stops beside the river.", true),
        tf("Kaniz sees people catching fishes in the river.", false),
        tf("Rubbish makes the river water dirty.", true),
        tf("Fishes can swim easily in dirty water.", false),
      ] } },
    { type: "speak_correct_response", title: title(99, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity F: the questions about the text in C (page 98), with answers from it."],
      content: { lines: [
        ask("What do Shihab and Kaniz see in the river?", N("They see some people bathing and washing their clothes in the river.", "দ়েই স়ী স়াম পীপল বেইদ়িং অ্যান্ড ওয়শিং দ়েয়া ক্লোদ়জ় ইন দ়া রিভ়া।", "ওরা দেখে, কিছু মানুষ নদীতে গোসল করছে আর কাপড় ধুচ্ছে।")),
        ask("Why do they feel upset?", N("Because a man throws some rubbish into the river.", "বিকজ় আ ম্যান থ়্রোজ় স়াম রাবিশ ইনটু দ়া রিভ়া।", "কারণ একজন লোক নদীতে কিছু ময়লা ফেলে।")),
        ask("What things do they see floating on the river?", N("They see polythene bags, plastic bottles and some other things.", "দ়েই স়ী পলিথ়ীন ব্যাগজ়, প্ল্যাস্টিক বটলজ় অ্যান্ড স়াম আদ়া থ়িংজ়।", "ওরা পলিথিনের ব্যাগ, প্লাস্টিকের বোতল আর আরও কিছু জিনিস ভাসতে দেখে।")),
        ask("Why is the fish in danger?", N("Because the fish gets caught into polythene bags.", "বিকজ় দ়া ফ়িশ গেটস কট ইনটু পলিথ়ীন ব্যাগজ়।", "কারণ মাছ পলিথিনের ব্যাগে আটকে যায়।")),
        ask("How is the water polluted?", N("Rubbish pollutes the water.", "রাবিশ পালূটস দ়া ওয়টা।", "ময়লা পানি দূষিত করে।")),
        ask("How can you keep the water clean?", N("We should not throw rubbish into the river.", "উই শুড নট থ়্রো রাবিশ ইনটু দ়া রিভ়া।", "নদীতে আমাদের ময়লা ফেলা উচিত নয়।")),
      ] } },
  ],
  100: [
    { type: "match_pair", title: title(100, "Words and meanings"), audio: false, notes: [QUIET, "Practice 1: each word in column A with its meaning in column B."],
      content: { pairs: [pair("danger", "at risk"), pair("upset", "sad"), pair("bath", "washing with water"), pair("rubbish", "garbage"), pair("pollute", "to make something dirty")] } },
    { type: "word_bank_fill", title: title(100, "Fill the gaps"), audio: false, notes: [QUIET, "Practice 2: the box's words (request, dirty, clean, river, rubbish) in the story's blanks."],
      content: { questions: [
        fill("They see some people are bathing in the ___________ .", ["river"], ["rubbish", "clean"]),
        fill("They find a man throwing ___________ into the river and___________ the man not to do that.", ["rubbish", "request"], ["dirty", "river"]),
        fill("The river water becomes ___________ .", ["dirty"], ["request", "river"]),
        fill("We must keep the water ___________ .", ["clean"], ["rubbish", "request"]),
      ] } },
  ],
  102: [
    { type: "word_bank_fill", title: title(102, "Complete the sentences"), audio: false, notes: [QUIET, "Activity C: the box's words (soil, damages, life, harmful, water) in the blanks."],
      content: { questions: [
        fill("Water is a part of our ____________ .", ["life"], ["soil", "water"]),
        fill("Animals need ____________ to live.", ["water"], ["soil", "life"]),
        fill("Plants take water from the ____________ .", ["soil"], ["life", "harmful"]),
        fill("Pollution ____________ the water quality.", ["damages"], ["harmful", "soil"]),
        fill("Polluted water is ____________ for our life.", ["harmful"], ["damages", "water"]),
      ] } },
    { type: "speak_correct_response", title: title(102, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity D: the questions about the text in B (page 101), with its sentences as the answers."],
      content: { lines: [
        ask("What are the main sources of water?", L("Oceans, rivers, rain and ponds are the main sources of water.")),
        ask("What do we do with water in our everyday life?", L("We use water for drinking, cooking, bathing and cleaning.")),
        ask("Why do trees take water from the soil?", L("Plants and trees also take water from the soil for their growth.")),
        ask("How can you save water from pollution?", L("We should not throw any rubbish, plastics, etc. into ponds, rivers and oceans.")),
        ask("Why should you keep all rubbish in a fixed place?", N("We keep rubbish in a fixed place to save water from pollution.", "উই কীপ রাবিশ ইন আ ফ়িক্সট প্লেইস় টু স়েইভ় ওয়টা ফ়্রম পালূশান।", "পানিকে দূষণ থেকে বাঁচাতে আমরা ময়লা নির্দিষ্ট জায়গায় রাখি।")),
      ] } },
  ],
  103: [
    { type: "word_scramble", title: title(103, "Make the words"), audio: false, notes: [QUIET, "Practice 1: the jumbled letters as words, each starting with its capital letter (P a l t n, i n R a, S i o l, C o p r, r m Fa e r)."],
      content: { items: [["Plant", "প্লান্ট", "গাছ"], ["Rain", "রেইন", "বৃষ্টি"], ["Soil", "স়য়েল", "মাটি"], ["Crop", "ক্রপ", "ফসল"], ["Farmer", "ফ়া·মা", "কৃষক"]]
        .map(([w, h, m]) => ({ word: w, meaning: m, roman: roman(h) })) } },
    { type: "group_sort", title: title(103, "True or False"), audio: false, notes: [QUIET, "Practice 2: True or False, about the text on page 101."],
      content: { categories: TF, items: [
        tf("Water is important for our life.", true),
        tf("Trees and crops are the sources of water.", false),
        tf("Plants take water from the soil.", true),
        tf("Pollution increases the water quality.", false),
        tf("We should throw rubbish at any place.", false),
      ] } },
  ],
  105: [
    { type: "select_missing_word", title: title(105, "Tick the best answer"), audio: false, notes: [QUIET, "Activity B: the best answers, from the tips on page 104; question 1 is asked as a sentence to complete."],
      content: { mode: "cloze", questions: [
        chooseNew("When you brush your teeth, you should ____.", ["brush quickly", "turn off the tap", "turn on the tap"], 1, "ওয়েন ইউ ব্রাশ ইয়ো টীথ়, ইউ শুড টান অফ় দ়া ট্যাপ।", "দাঁত মাজার সময় তোমার উচিত ____।"),
        choose("When you use too much soap to wash your hands, you ...", ["save water", "feel better", "misuse water"], 2),
        choose("When you drink all the water of glass, you ...", ["waste water", "help others to drink", "save water"], 2),
      ] } },
    { type: "speak_correct_response", title: title(105, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity C: the questions about the tips on page 104, with answers from them."],
      content: { lines: [
        ask("What should we do while we take bath?", N("We should not use too much water when we take a bath.", "উই শুড নট ইউজ় টূ মাচ ওয়টা ওয়েন উই টেইক আ বাথ়।", "গোসলের সময় আমাদের বেশি পানি ব্যবহার করা উচিত নয়।")),
        ask("Why should we water the plants carefully?", N("We should not misuse water while watering the plants.", "উই শুড নট মিস়ইউজ় ওয়টা ওয়াইল ওয়টারিং দ়া প্লান্টস।", "গাছে পানি দেওয়ার সময় পানির অপচয় করা উচিত নয়।")),
        ask("How should we use water during school time?", L("We must follow these tips when using water.")),
        ask("Why should we follow the tips for using water?", N("Because one day we may not have enough clean water.", "বিকজ় ওয়ান ডেই উই মেই নট হ্যাভ় ইনাফ় ক্লীন ওয়টা।", "কারণ একদিন আমাদের যথেষ্ট পরিষ্কার পানি না-ও থাকতে পারে।")),
      ] } },
  ],

  // ───────────── Unit 8 ─────────────
  111: [
    { type: "select_missing_word", title: title(111, "Tick the correct answer"), audio: false, notes: [QUIET, "Activity C, questions 1 and 2: the sentences to complete under the questions (3 and 4 are on page 112)."],
      content: { mode: "cloze", questions: [
        choose("The grasshopper is ______ .", ["carrying corns", "enjoying the sun", "making fun with the ant"], 1),
        choose("The ant is ______ .", ["playing in the sun", "singing in the field", "carrying an ear of corn"], 2),
      ] } },
  ],
  112: [
    { type: "select_missing_word", title: title(112, "Tick the correct answer"), audio: false, notes: [QUIET, "Activity C, questions 3 and 4 (the book prints “passess”, kept as printed)."],
      content: { mode: "cloze", questions: [
        choose("The grasshopper passess the winter ______ .", ["without food", "singing and dancing", "working hard"], 0),
        choose("The ant passes the winter ______ .", ["happily at her cozy home", "sadly", "in search of food"], 0),
      ] } },
    { type: "speak_correct_response", title: title(112, "Ask and answer"), audio: "English, British voice: the question, and the answer.", notes: ["Activity D: the questions about the story, with the story's sentences as the answers."],
      content: { lines: [
        ask("Where do the ant and the grasshopper live?", L("They live in a grassy field.")),
        ask("What does the ant carry to her house?", L("She is carrying an ear of corn to her house.")),
        ask("What does the grasshopper say to the ant?", cat(L("“Hey Ant! Why do you work hard all the time?"), L("Come and join me. Let’s enjoy the sun.”"))),
        ask("What does the ant say in reply?", cat(N("Oh Grasshopper! Winter is coming.", "ও গ্রাস়হপা! উইনটা ইজ় কামিং।", "ও ঘাসফড়িং! শীত আসছে।"), L("Let’s collect some corns together.”"))),
        ask("What happens to the grasshopper in the winter?", cat(L("The grasshopper finds no food to eat."), L("He starves, and he becomes sad."))),
      ] } },
    { type: "group_sort", title: title(112, "Summer and winter"), audio: false, notes: [QUIET, "Activity E: the words and phrases under Summer and Winter."],
      content: { categories: [{ name: "Summer" }, { name: "Winter" }], items: [["dry leaves", 1], ["sunny", 0], ["enjoying the sun", 0], ["gloomy", 1], ["warm day", 0], ["cold", 1]].map(([w, c]) => item(w, c)) } },
  ],
  114: [
    { type: "match_pair", title: title(114, "Match A and B"), audio: false, notes: [QUIET, "Practice 1: each word in column A with its meaning in column B."],
      content: { pairs: [pair("sunny", "bright"), pair("carry", "bear"), pair("starve", "become weak from lack of food"), pair("plenty", "enough"), pair("cozy", "comfortable"), pair("grassy", "full of grass")] } },
    { type: "word_bank_fill", title: title(114, "Fill the gaps"), audio: false, notes: [QUIET, "Practice 2: the box's words (passing by, starves, sunny, grassy, falling down) in the blanks."],
      content: { questions: [
        fill("The ant and the grasshopper live in a ____________ field.", ["grassy"], ["sunny", "starves"]),
        fill("The summer morning is _______________.", ["sunny"], ["grassy", "falling down"]),
        fill("The ant is _______________ the grasshopper.", ["passing by"], ["falling down", "starves"]),
        fill("The leaves are _______________ everywhere.", ["falling down"], ["passing by", "sunny"]),
        fill("The grasshopper _______________ and becomes sad.", ["starves"], ["passing by", "grassy"]),
      ] } },
  ],
  120: [
    { type: "group_sort", title: title(120, "True or False"), audio: false, notes: [QUIET, "Activity C: True or False, about Anika's story (pages 116–119)."],
      content: { categories: TF, items: [
        tf("The name of the hill girl is Savana.", true),
        tf("Savana welcomes a girl from the hill to her house.", false),
        tf("On the day of Phool Biju hill girls float flowers in the water.", true),
        tf("Spraying water on Mulbiju brings sorrows in life.", false),
        tf("The new year’s day is called Mulbiju.", false),
      ] } },
    { type: "speak_correct_response", title: title(120, "Answer the questions"), audio: "English, British voice: the question, and the answer.", notes: ["Activity D: the questions about Anika's story, with answers from it."],
      content: { lines: [
        ask("Where does Anika live?", N("Anika lives in the plain land.", "আনিকা লিভ়জ় ইন দ়া প্লেইন ল্যান্ড।", "আনিকা সমতলে থাকে।")),
        ask("What is the name of the hill girl?", L("The name of the hill girl is Savana.")),
        ask("How does the hill girl welcome Anika?", N("She welcomes Anika spraying water upon her.", "শী ওয়েলকামজ় আনিকা স্প্রেইইং ওয়টা আপন হা।", "সে আনিকার গায়ে পানি ছিটিয়ে তাকে স্বাগত জানায়।")),
        ask("Why do the hill people float flowers in the water?", N("They float flowers wishing a happy new year.", "দ়েই ফ়্লোট ফ়্লাওয়াজ় উইশিং আ হ্যাপি নিউ ইয়া।", "নতুন বছরের শুভকামনা জানিয়ে তারা ফুল ভাসায়।")),
        ask("What do hill people do on the day of Mulbiju?", L("On this occasion, young boys and girls spray water on each other.")),
      ] } },
  ],
  121: [
    { type: "speak_correct_response", title: title(121, "Say it in the negative"), audio: "English, British voice: the sentence, and its negative.", notes: ["Activity F: each declarative sentence, then its negative form."],
      content: { lines: [
        ask("Anika and Savana are friends.", N("Anika and Savana are not friends.", "আনিকা অ্যান্ড স়াভ়ানা আ নট ফ়্রেন্ডজ়।", "আনিকা আর সাভানা বন্ধু নয়।")),
        ask("Anika lives in the plain land.", N("Anika does not live in the plain land.", "আনিকা ডাজ় নট লিভ় ইন দ়া প্লেইন ল্যান্ড।", "আনিকা সমতলে থাকে না।")),
        ask("Savana is a hill girl.", N("Savana is not a hill girl.", "স়াভ়ানা ইজ় নট আ হিল গাল।", "সাভানা পাহাড়ি মেয়ে নয়।")),
        ask("The hill girl floats flowers in the water.", N("The hill girl does not float flowers in the water.", "দ়া হিল গাল ডাজ় নট ফ়্লোট ফ়্লাওয়াজ় ইন দ়া ওয়টা।", "পাহাড়ি মেয়েটি পানিতে ফুল ভাসায় না।")),
      ] } },
  ],
  122: [
    { type: "match_pair", title: title(122, "Make sentences"), audio: false, notes: [QUIET, "Practice 1: each beginning in column A with its end in column B."],
      content: { pairs: [
        pair("Anika lives", "in the plain land."), pair("I enjoy", "the festival very much."),
        pair("On Phulbiju day", "hill girls float flowers wishing a happy new year."), pair("On Mulbiju day", "young boys and girls spray water on each other."),
        pair("The house is decorated", "with colours and flowers."), pair("Savana welcomes Anika to her house", "spraying water upon her."),
      ] } },
    { type: "word_bank_fill", title: title(122, "Fill the gaps"), audio: false, notes: [QUIET, "Practice 2: the box's words (decorated, entertains, attend, visit, spray) in the blanks."],
      content: { questions: [
        fill("Anika likes to ____________ hill festivals.", ["attend"], ["visit", "spray"]),
        fill("So, she goes to the hills to ____________ a friend, Savana.", ["visit"], ["entertains", "decorated"]),
        fill("The house is ____________ with colours and flowers.", ["decorated"], ["entertains", "attend"]),
        fill("Her friend ____________ her with various food items.", ["entertains"], ["decorated", "spray"]),
        fill("Young boys and girls ____________ water on each other to wash away sorrows of life.", ["spray"], ["visit", "attend"]),
      ] } },
  ],
  123: [
    { type: "match_pair", title: title(123, "Festivals and activities"), audio: false, notes: [QUIET, "Practice 3: each hill festival with what people do on it (pages 117–119)."],
      content: { pairs: [
        ["Phool Biju", "ফ়ুল বিজু", "ফুল বিজু", "Hill girls float flowers in the water.", "হিল গালজ় ফ়্লোট ফ়্লাওয়াজ় ইন দ়া ওয়টা।", "পাহাড়ি মেয়েরা পানিতে ফুল ভাসায়।"],
        ["Mulbiju", "মূলবিজু", "মূল বিজু", "Young boys and girls spray water on each other.", "ইয়াং বয়জ় অ্যান্ড গালজ় স্প্রেই ওয়টা অন ঈচ আদ়া।", "ছেলেমেয়েরা একে অন্যের গায়ে পানি ছিটায়।"],
        ["Gajjya Pajjya", "গজ্যা পজ্যা", "গজ্যা পজ্যা (নববর্ষ)", "Cultural shows and carnivals are arranged.", "কালচারাল শোজ় অ্যান্ড কানিভ়ালজ় আ আরেইঞ্জড।", "সাংস্কৃতিক অনুষ্ঠান আর মেলার আয়োজন হয়।"],
      ].map(([l, lh, lm, r, rh, rm]) => ({ left: l, right: r, leftRoman: roman(lh), leftMeaning: lm, rightRoman: roman(rh), rightMeaning: rm })) } },
  ],
};
