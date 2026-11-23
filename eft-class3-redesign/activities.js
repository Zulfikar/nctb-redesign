// The book's activity file for Activity Studio (its "Import activities"): ACTIVITIES-bn.json, one activity per printed page,
// behind that page's QR code (codes.json), made from the checked page content (content/unit*.js) with its Bangla guide
// (British English): every line the child says or reads, with its hint (the roman line, puffed as the pages print it) and
// meaning. A rhyme or a reading text is Read Aloud; any other page is Repeat After Me ("Listen and say"). A page with no
// line of its own (a calendar, a drawing task) takes its lesson's lines. The voices are made in the editor after importing.
// Run: node activities.js  (it checks every activity with Activity Studio's own import cleaning)
const fs = require("fs");
const path = require("path");
const D = __dirname;
const codes = JSON.parse(fs.readFileSync(path.join(D, "codes.json"), "utf8"));
const units = [];
for (let n = 1; n <= 8; n++) units.push(require(path.join(D, "content", `unit${n}.js`)));

const BN = /[ঀ-৿]/, LAT = /[A-Za-z]/;
// the puff and the names, as build.js prints them
const PUFF = { "ক": "খ", "ট": "ঠ", "প": "প্‌হ" };
const PUFF_RE = /(^|[\s“‘"'(\[—–-]|(?<!স়?)·(?=\*))(\*?)([কটপ])(?!়)(?=্য|[^্]|$)/gu;
const bareBn = (t) => String(t).replace(/^[“‘"'(*]+|[”’"'),.?!।:;*…]+$/g, "");
const NO_PUFF = new Set();
const ORDINARY = /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|January|February|March|April|May|June|July|August|September|October|November|December|I|I'm|I'll|I've)$/;
function triples(x, out) {
  if (!Array.isArray(x)) { if (x && typeof x === "object") Object.values(x).forEach((v) => triples(v, out)); return; }
  const s = x.every((v) => typeof v === "string");
  if (s && (x.length === 3 || x.length === 4)) {
    const [e, h, m] = x.length === 3 ? x : x.slice(1);
    if (LAT.test(e) && !BN.test(e) && BN.test(h)) { out.push({ e, h, m, who: x.length === 4 ? x[0] : "" }); return; }
  }
  x.forEach((v) => triples(v, out));
}
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

// a page's lines: what the child says or reads (no blanks to fill, no lone marks or numbers), once each, in page order
const MAX = 16;
function linesOf(pg) {
  const t = []; triples(pg.blocks, t);
  const seen = new Set(), out = [];
  for (const { e, h, m } of t) {
    let text = e.replace(/\n/g, " ").replace(/_([^_\s][^_]*?)_/g, "$1").replace(/^(T|Ss|S\d|A|B):\s*/, "").replace(/\s+/g, " ").trim();
    if (/_{2,}|…{2,}|\.{4,}/.test(text) || /_{2,}/.test(h) || !/[A-Za-z]{2,}/.test(text) || /^\(?[a-z]\)?$/i.test(text)) continue;
    const k = text.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ text, roman: roman(h), meaning: m || "" });
    if (out.length >= MAX) break;
  }
  return out;
}
const isRead = (pg) => /Rhyme/.test(pg.title[0]) || /"(song|u\dsong)|style: "song|"text":|\btext:/.test(JSON.stringify(pg.blocks)) || JSON.stringify(pg.blocks).includes('"song');

// the number pages (31–50, 71–90, 91–100): their numbers are drawn as figures, so the child listens to and says the
// number words (the hints as Unit 4 writes them: নাইন্টি-ওয়ান; the meaning in Bangla words and digits)
const ONES = [null, ["one", "ওয়ান"], ["two", "টূ"], ["three", "থ়্রী"], ["four", "ফ়ো"], ["five", "ফ়াইভ়"], ["six", "স়িক্স"], ["seven", "স়েভ়ান"], ["eight", "এইট"], ["nine", "নাইন"]];
const TENS = { 3: ["thirty", "থ়াটি"], 4: ["forty", "ফ়োটি"], 5: ["fifty", "ফ়িফ়টি"], 6: ["sixty", "স়িক্সটি"], 7: ["seventy", "স়েভ়ানটি"], 8: ["eighty", "এইটি"], 9: ["ninety", "নাইন্টি"] };
const BN_NUM = { 51: "একান্ন", 52: "বাহান্ন", 53: "তিপ্পান্ন", 54: "চুয়ান্ন", 55: "পঞ্চান্ন", 56: "ছাপ্পান্ন", 57: "সাতান্ন", 58: "আটান্ন", 59: "ঊনষাট", 60: "ষাট",
  61: "একষট্টি", 62: "বাষট্টি", 63: "তেষট্টি", 64: "চৌষট্টি", 65: "পঁয়ষট্টি", 66: "ছেষট্টি", 67: "সাতষট্টি", 68: "আটষট্টি", 69: "ঊনসত্তর", 70: "সত্তর",
  31: "একত্রিশ", 32: "বত্রিশ", 33: "তেত্রিশ", 34: "চৌত্রিশ", 35: "পঁয়ত্রিশ", 36: "ছত্রিশ", 37: "সাঁইত্রিশ", 38: "আটত্রিশ", 39: "ঊনচল্লিশ", 40: "চল্লিশ",
  41: "একচল্লিশ", 42: "বিয়াল্লিশ", 43: "তেতাল্লিশ", 44: "চুয়াল্লিশ", 45: "পঁয়তাল্লিশ", 46: "ছেচল্লিশ", 47: "সাতচল্লিশ", 48: "আটচল্লিশ", 49: "ঊনপঞ্চাশ", 50: "পঞ্চাশ",
  71: "একাত্তর", 72: "বাহাত্তর", 73: "তিয়াত্তর", 74: "চুয়াত্তর", 75: "পঁচাত্তর", 76: "ছিয়াত্তর", 77: "সাতাত্তর", 78: "আটাত্তর", 79: "ঊনআশি", 80: "আশি",
  81: "একাশি", 82: "বিরাশি", 83: "তিরাশি", 84: "চুরাশি", 85: "পঁচাশি", 86: "ছিয়াশি", 87: "সাতাশি", 88: "অষ্টাশি", 89: "ঊননব্বই", 90: "নব্বই",
  91: "একানব্বই", 92: "বিরানব্বই", 93: "তিরানব্বই", 94: "চুরানব্বই", 95: "পঁচানব্বই", 96: "ছিয়ানব্বই", 97: "সাতানব্বই", 98: "আটানব্বই", 99: "নিরানব্বই", 100: "একশো" };
const bnDigits = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
function numberLine(n) {
  if (n === 100) return { n, text: "one hundred", roman: roman("ওয়ান হান্ড্রাড"), meaning: `${BN_NUM[n]} (${bnDigits(n)})` };
  const t = Math.floor(n / 10), o = n % 10, [te, th] = TENS[t];
  return o ? { n, text: `${te}-${ONES[o][0]}`, roman: roman(`${th}-${ONES[o][1]}`), meaning: `${BN_NUM[n]} (${bnDigits(n)})` } : { n, text: te, roman: roman(th), meaning: `${BN_NUM[n]} (${bnDigits(n)})` };
}
const NUMBER_PAGES = { 23: [31, 40], 24: [41, 50], 25: [31, 50], 46: [71, 80], 47: [81, 90], 59: [91, 100], 60: [81, 100] };

// ── 40 pages get another game behind their QR (the user, 31 Oct 2026: Repeat After Me "should be maximum 50 and others
// could be converted to different types of activity"). GAME = { page: [game, options] }; options: use (the page's lines to
// take, by their text), nums ([from, to]: the number words), digits (a number's figure: on the card, or in the meaning),
// pictures ({ word: emoji } until the teacher sets the book's pictures from the library), files ({ word: the book's picture }),
// pairs (a dialogue in fixed pairs, A asks and B answers, instead of each line answering the one before). ──
const WORD_NUM = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20 };
const HABITS = { clothes: "👕", playing: "⚽", shoes: "👟", fingernails: "💅", dirt: "🟫", "washing hands": "🚰", germs: "🦠", soap: "🧼", eyes: "👀" };
const HABIT_FILES = { clothes: "u6-w-clothes", shoes: "u6-w-shoes", fingernails: "u6-w-hands", dirt: "u6-w-dirt", germs: "u6-w-germs", soap: "u6-w-soap", eyes: "u6-w-eyes" };
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const GAME = {
  // dialogues: the app says a line, the child answers with the next one
  1: ["respond"], 4: ["respond"], 7: ["respond"], 9: ["respond"], 17: ["respond"], 21: ["respond"], 22: ["respond"], 44: ["respond", { pairs: true }],
  // a rhyme and three reading texts
  3: ["read"], 84: ["read"], 109: ["read"], 115: ["read"],
  // numbers and months
  13: ["memory", { digits: true }], 24: ["memory", { nums: [41, 50], digits: true }], 32: ["memory", { nums: [61, 70], digits: true }], 47: ["memory", { nums: [81, 90], digits: true }],
  19: ["meaning", { digits: true }], 31: ["meaning", { nums: [51, 60] }], 59: ["meaning", { nums: [91, 100] }],
  14: ["hear", { digits: true }], 23: ["hear", { nums: [31, 40] }], 33: ["hear", { nums: [51, 70] }], 46: ["hear", { nums: [71, 80] }], 61: ["hear", { use: MONTHS }],
  // words
  66: ["meaning", { use: ["group name", "week", "area", "classroom", "play ground", "wash block", "garden"] }],
  73: ["meaning", { use: ["get up", "beautiful", "help", "breakfast", "study", "learn", "support", "rise", "pretty", "morning meal"] }],
  74: ["meaning"], 78: ["meaning"],
  102: ["meaning", { use: ["soil", "damages", "life", "harmful", "water"] }],
  114: ["meaning", { use: ["sunny", "carry", "starve", "plenty", "cozy", "grassy", "bear", "comfortable", "bright", "enough"] }],
  75: ["memory", { use: ["get up", "borrow", "proud", "prepare", "breakfast", "school", "Friday", "live"] }],
  79: ["memory", { use: ["cabbage", "cauliflower", "pumpkin", "chilly", "ginger", "cowpea", "turnip", "parble", "bottle gourd", "bean", "turmeric", "lady’s finger"] }],
  87: ["memory", { use: Object.keys(HABITS), pictures: HABITS, files: HABIT_FILES }],
  83: ["picture", { use: Object.keys(HABITS), pictures: HABITS, files: HABIT_FILES }],
  97: ["picture", { use: ["danger", "river", "bathing", "washing clothes", "rubbish", "swimming"],
    pictures: { danger: "⚠️", river: "🏞️", bathing: "🛁", "washing clothes": "🧺", rubbish: "🗑️", swimming: "🏊" },
    files: { danger: "u7-w-danger", river: "u7-w-river", bathing: "u7-w-bathing-river", "washing clothes": "u7-w-washing-clothes", rubbish: "u7-w-rubbish", swimming: "u7-w-swimming" } }],
  93: ["picture", { pictures: { "eating food": "🍛", "touching a wound": "🩹", "using a toilet": "🚽", sneezing: "🤧", "touching garbage": "🗑️" },
    files: { "eating food": "u6-l3-eating-food", "touching a wound": "u6-l3-touching-wound", "using a toilet": "u6-l3-using-toilet", sneezing: "u6-l3-sneezing", "touching garbage": "u6-l3-touching-garbage" } }],
  // instructions and steps: put each sentence's words in order
  36: ["build", { use: ["Keep your head still.", "Face your palms outward.", "Keep your arms forward.", "Keep your arms sideways.", "Keep your arms downward.", "Keep your body straight.", "Keep your heels together."] }],
  42: ["build", { use: ["Shake the thermometer well.", "Put the tip under your armpit.", "Make sure the thermometer is touching skin.", "Press your arm to hold the thermometer.", "Remove the thermometer.", "Hold it at your eye level."] }],
  62: ["build", { use: ["January", "February", "March", "April", "May", "June"].map((m, i) => `${m} is the ${["first", "second", "third", "fourth", "fifth", "sixth"][i]} month of the year.`) }],
  90: ["build", { use: ["Rinse your hands with clean water.", "Rub your hands for at least 20 seconds.", "Put soap on your hands.", "Wipe your hands with a clean towel.", "Rub the back of your hands, between fingers and under the nails."] }],
};
const VOICE = (what) => ({ language: "en", accent: "british", what: `English, British voice: ${what} (Generate all voices in the editor).` });
// the other meanings to choose from: the next ones in the list that differ from this one and from each other
const othersOf = (ls, i, k) => { const out = []; for (let d = 1; out.length < k && d < ls.length; d++) { const m = ls[(i + d) % ls.length].meaning; if (m && m !== ls[i].meaning && !out.includes(m)) out.push(m); } return out; };
// a page's lines with who says them (a dialogue), filtered as linesOf filters them
function spoken(pg) {
  const t = []; triples(pg.blocks, t);
  return t.map(({ e, h, m, who }) => ({ who, text: e.replace(/\n/g, " ").replace(/_([^_\s][^_]*?)_/g, "$1").replace(/^(T|Ss|S\d|A|B):\s*/, "").replace(/\s+/g, " ").trim(), roman: roman(h), meaning: m || "" }))
    .filter((l) => !/_{2,}|…{2,}|\.{4,}/.test(l.text) && /[A-Za-z]{2,}/.test(l.text));
}
function makeGame(pg, lines, [game, o = {}]) {
  if (o.nums) { lines = []; for (let n = o.nums[0]; n <= o.nums[1]; n++) lines.push(numberLine(n)); }
  if (o.use) lines = o.use.map((t) => { const l = lines.find((x) => x.text === t); if (!l) throw new Error(`p${pg.page}: no line "${t}"`); return l; });
  if (o.digits) lines = lines.map((l) => { const n = l.n || WORD_NUM[l.text]; return { ...l, n, meaning: /[০-৯]/.test(l.meaning) ? l.meaning : `${l.meaning} (${bnDigits(n)})` }; });
  const pics = (ls) => (o.files ? ls.filter((l) => o.files[l.text]).map((l) => ({ item: l.text, subject: l.text, emoji: o.pictures[l.text], file: o.files[l.text] })) : []);
  const picNote = o.files ? `Pictures: emoji for now; the book's own pictures (${Object.values(o.files).join(", ")}) can be uploaded to the Activity Picture Library and set with "Set all from library".` : null;
  switch (game) {
    case "respond": {
      const ls = spoken(pg), turns = [];
      for (let i = 1; i < ls.length; i += o.pairs ? 2 : 1) if (ls[i].who && ls[i - 1].who && ls[i].who !== ls[i - 1].who) turns.push([ls[i - 1], ls[i]]);
      return { type: "speak_correct_response", name: "Say the answer", audio: VOICE("each line the app says (the first of each pair)"),
        note: o.pairs ? "The page's requests: the app asks, the child gives the answer." : "The page's dialogue: the app says a line, the child says the next one.",
        content: { lines: turns.map(([a, b]) => ({ prompt: a.text, promptMeaning: a.meaning, promptRoman: a.roman, text: b.text, meaning: b.meaning, roman: b.roman })) } };
    }
    case "read":
      return { type: "read_aloud", name: "Read aloud", audio: VOICE("each line, slowly"), configuration: { listenFirst: true }, note: "The page's rhyme or reading text.",
        content: { lines: lines.map((l) => ({ text: l.text, meaning: l.meaning, roman: l.roman })) } };
    case "memory":
      return { type: "memory_cards", name: o.pictures ? "Memory cards: word and picture" : o.digits ? "Memory cards: word and number" : "Memory cards: word and meaning",
        audio: VOICE("each word (said when its card turns over)"), configuration: { picturesOnRight: !!o.pictures, roundSize: lines.length > 6 ? 6 : 4, wordAudio: true },
        note: o.pictures ? "Find each word's picture." : o.digits ? "Find each number word's figure." : "Find each word's Bangla meaning.", pictures: pics(lines), extra: picNote,
        content: { pairs: lines.map((l) => (o.pictures ? { left: l.text, leftRoman: l.roman, leftMeaning: l.meaning, right: "", emoji: o.pictures[l.text] } : { left: l.text, leftRoman: l.roman, right: o.digits ? String(l.n) : l.meaning })) } };
    case "meaning":
      return { type: "meaning_match", name: "Find the meaning", audio: null, note: "Each word with four meanings to choose from.",
        content: { questions: lines.map((l, i) => { const others = othersOf(lines, i, 3); if (others.length < 3) throw new Error(`p${pg.page}: too few meanings for "${l.text}"`); const at = i % 4; others.splice(at, 0, l.meaning); return { prompt: l.text, options: others, answer: at, roman: l.roman }; }) } };
    case "hear": {
      const rounds = [];
      for (let i = 0; i < lines.length && rounds.length < 6; i += 2) {
        const [a, b, c, d] = [0, 1, 2, 3].map((k) => lines[(i + k) % lines.length]);
        rounds.push({ text: `${a.text}, ${b.text}`, distractors: [c.text, d.text], meaning: `${a.meaning} · ${b.meaning}`, roman: `${a.roman}, ${b.roman}` });
      }
      return { type: "select_words_you_hear", name: "Listen and tap", audio: VOICE("each pair of words"), note: "The app says two words; the child taps them among four.", content: { rounds } };
    }
    case "picture":
      return { type: "word_picture", name: "Listen and find the picture", audio: VOICE("each word"), configuration: { listen: true }, note: "The app says a word; the child taps its picture.",
        pictures: pics(lines), extra: picNote, content: { items: lines.map((l) => ({ label: l.text, emoji: o.pictures[l.text], meaning: l.meaning, roman: l.roman })) } };
    case "build":
      return { type: "sentence_building", name: "Build the sentence", audio: null, note: "The page's sentences: put each one's words in order.",
        content: { mode: "build", sentences: lines.map((l) => ({ text: l.text, roman: l.roman, meaning: l.meaning })) } };
  }
  throw new Error(`p${pg.page}: no game "${game}"`);
}
const ACTS = [], chapters = [];
for (const U of units) {
  const ch = `Unit ${U.unit} · ${U.title[0]}`;
  chapters.push(ch);
  const byLesson = {};
  for (const pg of U.pages) (byLesson[pg.lesson] = byLesson[pg.lesson] || []).push(pg);
  for (const pg of U.pages) {
    let lines = linesOf(pg), borrowed = false;
    if (NUMBER_PAGES[pg.page]) { const [a, b] = NUMBER_PAGES[pg.page]; for (let n = a; n <= b; n++) lines.push(numberLine(n)); }
    if (lines.length < 2 && !NUMBER_PAGES[pg.page]) { // a calendar or drawing page: its lesson's lines
      const pool = byLesson[pg.lesson].filter((p) => p !== pg).flatMap(linesOf);
      const seen = new Set(lines.map((l) => l.text.toLowerCase()));
      for (const l of pool) if (!seen.has(l.text.toLowerCase()) && lines.length < MAX) { seen.add(l.text.toLowerCase()); lines.push(l); }
      borrowed = true;
    }
    if (!lines.length) { console.warn(`p${pg.page}: no lines, no activity`); continue; }
    const key = `EFT3-P${String(pg.page).padStart(3, "0")}`, read = isRead(pg);
    if (GAME[pg.page]) {
      if (read) throw new Error(`p${pg.page} is already Read Aloud: no other game for it`);
      const g = makeGame(pg, lines, GAME[pg.page]);
      ACTS.push({ key, qr: key, code: codes.pages[key], type: g.type, title: `${pg.title[0]} · ${g.name} (page ${pg.page})`, chapter: ch, page: pg.page,
        configuration: g.configuration || {}, content: g.content,
        guide: { audio: g.audio, pictures: g.pictures || [], notes: [g.note, ...(g.extra ? [g.extra] : []), g.audio ? "Each line has its Bangla guide (British English): the hint and the meaning." : "No voice to add: publish it once imported."] } });
      continue;
    }
    const type = read ? "read_aloud" : "repeat_after_me";
    ACTS.push({
      key, qr: key, code: codes.pages[key], type,
      title: `${pg.title[0]} · ${read ? "Read aloud" : "Listen and say"} (page ${pg.page})`,
      chapter: ch, page: pg.page,
      configuration: { listenFirst: true },
      content: { lines: lines.map((l) => ({ text: l.text, ...(l.meaning ? { meaning: l.meaning } : {}), ...(l.roman ? { roman: l.roman } : {}) })) },
      guide: { audio: { language: "en", accent: "british", what: "English, British voice: each line, slowly (Generate all voices in the editor)." }, pictures: [],
        notes: [NUMBER_PAGES[pg.page] ? "The page's numbers as words, to listen to and say." : borrowed ? "This page has few lines of its own, so it also has its lesson's lines." : "The page's own lines, in order.", "Each line has its Bangla guide (British English): the hint and the meaning."] },
    });
  }
}

// the pages' second activities (content/activities-extra.js: { page: [{ type, title, content, configuration?, notes? }] }):
// a game for the page's exercise, keyed EFT3-Pnnnb (then c), each with its own code, minted once into codes.json
const EXTRA_FILE = path.join(D, "content", "activities-extra.js");
if (fs.existsSync(EXTRA_FILE)) {
  const EXTRA = require(EXTRA_FILE), ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const used = new Set([codes.book, ...Object.values(codes.pages)]);
  const mint = () => { for (;;) { const c = "LS" + Array.from(require("crypto").randomBytes(6), (x) => ALPHABET[x % ALPHABET.length]).join(""); if (!used.has(c)) { used.add(c); return c; } } };
  let minted = 0;
  const unitOf = (page) => units.find((U) => U.pages.some((pg) => pg.page === page));
  for (const [pageStr, list] of Object.entries(EXTRA)) {
    const page = +pageStr, U = unitOf(page);
    if (!U) { console.warn(`extra for p${page}: no such page`); continue; }
    list.forEach((x, i) => {
      const key = `EFT3-P${String(page).padStart(3, "0")}${"bcd"[i]}`;
      if (!codes.pages[key]) { codes.pages[key] = mint(); minted++; }
      ACTS.push({ key, qr: key, code: codes.pages[key], type: x.type, title: `${x.title} (page ${page})`, chapter: `Unit ${U.unit} · ${U.title[0]}`, page,
        configuration: x.configuration || {}, content: x.content,
        guide: { audio: x.audio === false ? null : { language: "en", accent: "british", what: x.audio || "English, British voice (Generate all voices in the editor)." }, pictures: [], notes: x.notes || [] } });
    });
  }
  if (minted) fs.writeFileSync(path.join(D, "codes.json"), JSON.stringify(codes, null, 1) + "\n");
  ACTS.sort((a, b) => a.page - b.page || a.key.localeCompare(b.key));
}

// every speaking activity's reading check is Lenient (the user, 31 Oct 2026: "make default option to lenient"), written
// into the file so it holds on a server whose own default is still Normal
const SPEAKING = ["repeat_after_me", "read_aloud", "speak_correct_response", "say_the_word"];
for (const a of ACTS) if (SPEAKING.includes(a.type)) a.configuration = { ...(a.configuration || {}), strictness: "lenient" };

// names at the start of a sentence (Kajal and Kanta are neighbours.): a capitalised English word whose hint word is puffed,
// while the meaning has the same name unpuffed (কাজল), gets its own letters back. Every [text|prompt|left|right] with its
// roman and meaning, in every activity.
const UNPUFF = [["খ", "ক"], ["ঠ", "ট"], ["প্‌হ", "প"]];
let namesFixed = 0;
function fixNames(o) {
  if (Array.isArray(o)) return o.forEach(fixNames);
  if (!o || typeof o !== "object") return;
  for (const [t, r, m] of [["text", "roman", "meaning"], ["prompt", "promptRoman", "promptMeaning"], ["left", "leftRoman", "leftMeaning"], ["right", "rightRoman", "rightMeaning"]]) {
    if (typeof o[t] !== "string" || typeof o[r] !== "string" || typeof o[m] !== "string") continue;
    const toks = o[t].replace(/[’‘]/g, "'").match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || [], hw = o[r].split(/\s+/);
    const bnWords = hw.filter((w) => BN.test(w));
    if (toks.length !== bnWords.length) continue;
    const mw = o[m].split(/[\s,.;:!?।()“”‘’"']+/).filter(Boolean);
    let k = 0;
    o[r] = hw.map((w) => {
      if (!BN.test(w)) return w;
      const tok = toks[k++];
      if (!/^[A-Z][a-z]/.test(tok)) return w;
      for (const [pf, pl] of UNPUFF) if (w.startsWith(pf)) { const back = pl + w.slice(pf.length), core = bareBn(back).replace(/়/g, ""); if (mw.some((y) => y.replace(/়/g, "").startsWith(core))) { namesFixed++; return back; } }
      return w;
    }).join(" ");
  }
  Object.values(o).forEach((v) => { if (v && typeof v === "object") fixNames(v); });
}
ACTS.forEach((a) => fixNames(a.content));

const file = {
  format: "ebidyaloy-activity-import", version: 1,
  madeBy: "eft-class3-redesign/activities.js", madeAt: new Date().toISOString().slice(0, 10),
  book: { title: "English for Today · Class Three", edition: "bn", editionName: "Bangla guide, British English", teachLanguage: "en", helpLanguage: "bn", accent: "british", code: codes.book, chapters, base: true },
  activities: ACTS,
};
fs.writeFileSync(path.join(D, "ACTIVITIES-bn.json"), JSON.stringify(file, null, 1) + "\n");

// Activity Studio's own checks (the server's import cleaning)
const SRC = path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src");
global.ebConstants = require(SRC + "/utils/constants");
global.ebTimezones = require(SRC + "/utils/timezones").GLOBAL_TIMEZONE;
const H = require(SRC + "/v3/helpers/activity-import.helper.js");
const problems = [...H.checkImportFile(file)];
let lines = 0, helpLost = 0;
for (const a of ACTS) {
  const r = H.importContent(a.type, a.content);
  if (r.error) problems.push(`${a.key}: ${r.error}`);
  if (r.content.lines) { lines += r.content.lines.length; helpLost += a.content.lines.filter((l, i) => (l.roman && !(r.content.lines[i] || {}).roman) || (l.meaning && !(r.content.lines[i] || {}).meaning)).length; }
}
const by = ACTS.reduce((m, a) => ((m[a.type] = (m[a.type] || 0) + 1), m), {});
console.log(`ACTIVITIES-bn.json: ${ACTS.length} activities (${Object.entries(by).map(([k, v]) => `${v} ${k}`).join(", ")}), ${lines} lines; help lines dropped by the import: ${helpLost}`);
console.log(`names given back their letters: ${namesFixed}`);
console.log(problems.length ? "PROBLEMS:\n  " + problems.join("\n  ") : "the import check: OK");
process.exit(0);
