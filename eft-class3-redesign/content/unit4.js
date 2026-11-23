// English for Today, Class Three (NCTB, 2025 reprint): Unit 4, printed pages 48–64, word for word as printed.
// Every English line the child reads or says is [english, hint, meaning] (the hint: British English in Bangla letters, as
// Let's Learn English's British Bangla edition writes it); an instruction is [english, meaning]. This unit is about the
// middle sounds, so a word's hint shows its vowel: /æ/ অ্যা (bag ব্যাগ), /e/ এ (bed বেড), /ɪ/ ই (ship শিপ), /iː/ ঈ (sheep
// শীপ), and /ɑː/ and /ʌ/ both আ, as the series writes them (car কা, duck ডাক), except in Lesson 4 (pp. 56–58), where the long
// /ɑː/ carries a length mark so the pairs differ: cart কাːট, cut কাট (the user's choice, 30 Oct 2026).
// Unit 4's own kinds (u4drill, u4pairs, u4row, u4song …) are in unit4.parts.js.

// ── the words: one hint and one meaning each, wherever they are (unit4.words.json is made from this) ──
const W = {
  // Lesson 1: /æ/ and /e/
  bag: ["ব্যাগ", "ব্যাগ"], mat: ["ম্যাট", "মাদুর, পাপোশ"], hat: ["হ্যাট", "টুপি"], cat: ["ক্যাট", "বিড়াল"],
  pen: ["পেন", "কলম"], hen: ["হেন", "মুরগি"], red: ["রেড", "লাল"], net: ["নেট", "জাল"],
  den: ["ডেন", "গুহা, (পশুর) গর্ত"], ten: ["টেন", "দশ"], men: ["মেন", "লোকেরা"], man: ["ম্যান", "লোক"], pan: ["প্যান", "প্যান, কড়াই"],
  bed: ["বেড", "বিছানা"], fan: ["ফ়্যান", "পাখা"], can: ["ক্যান", "পারে; কৌটা"], happy: ["*হ্যা*·পি", "খুশি"], bad: ["ব্যাড", "খারাপ"],
  pet: ["পেট", "পোষা প্রাণী"], leg: ["লেগ", "পা"], cap: ["ক্যাপ", "টুপি (ক্যাপ)"], fat: ["ফ়্যাট", "মোটা"], tiger: ["*টাই*·গা", "বাঘ"],
  // Lesson 2: /ɪ/ and /iː/
  tin: ["টিন", "টিন"], pin: ["পিন", "আলপিন"], hill: ["হিল", "পাহাড়"], pill: ["পিল", "ওষুধের বড়ি"],
  bean: ["বীন", "শিম"], sleep: ["স্লীপ", "ঘুমানো"], sheep: ["শীপ", "ভেড়া"], feed: ["ফ়ীড", "খাওয়ানো"],
  slip: ["স্লিপ", "পিছলে যাওয়া"], still: ["স্টিল", "স্থির; এখনো"], steel: ["স্টীল", "ইস্পাত"], ship: ["শিপ", "জাহাজ"],
  hit: ["হিট", "আঘাত করা"], heat: ["হীট", "তাপ, গরম"], bin: ["বিন", "ময়লার ঝুড়ি"], fin: ["ফ়িন", "মাছের পাখনা"],
  nil: ["নিল", "শূন্য"], fill: ["ফ়িল", "ভরা"],
  // Lesson 3: the rhyme
  row: ["রো", "(নৌকা) বাওয়া"], boat: ["বোট", "নৌকা"], gently: ["*জেন্ট*·লি", "আলতো করে"], stream: ["স্ট্রীম", "স্রোতধারা, ছোট নদী"],
  merrily: ["*মে*·রা·লি", "আনন্দে"], life: ["লাইফ়", "জীবন"], dream: ["ড্রীম", "স্বপ্ন"], creek: ["ক্রীক", "খাঁড়ি"],
  crocodile: ["*ক্র*·কা·ডাইল", "কুমির"], shriek: ["শ্রীক", "চিৎকার করা"], river: ["*রি*·ভ়া", "নদী"], "polar bear": ["পোলা বেয়া", "মেরু ভালুক"],
  shiver: ["*শি*·ভ়া", "কাঁপা"], shore: ["শো", "তীর"], lion: ["*লাই*·আন", "সিংহ"], roar: ["রো", "গর্জন করা"],
  happily: ["*হ্যা*·পি·লি", "খুশিমনে"], bay: ["বেই", "উপসাগর"], vocabulary: ["ভ়া·*ক্যা*·বিউ·লা·রি", "শব্দভান্ডার"],
  // Lesson 4: /ɑː/ and /ʌ/ (both আ in the series' hints)
  cart: ["কাːট", "ঠেলাগাড়ি"], heart: ["হাːট", "হৃৎপিণ্ড, হৃদয়"], bard: ["বাːড", "চারণকবি"], card: ["কাːড", "কার্ড"], hard: ["হাড", "কঠিন"],
  cut: ["কাট", "কাটা দাগ, ক্ষত"], hut: ["হাট", "কুঁড়েঘর"], bud: ["বাড", "কুঁড়ি"], hush: ["হাশ", "চুপ!"],
  bun: ["বান", "বনরুটি"], mug: ["মাগ", "মগ"], jug: ["জাগ", "জগ"], barn: ["বাːন", "গোলাঘর"], tub: ["টাব", "গামলা"], nut: ["নাট", "বাদাম"],
  start: ["স্টাːট", "শুরু করা"], part: ["পাːট", "অংশ"], shut: ["শাট", "বন্ধ করা"], far: ["ফ়াː", "দূরে"], mart: ["মাːট", "বাজার, দোকান"],
  // Lesson 5: numbers
  thirteen: ["থ়া·*টীন*", "তেরো"], thirty: ["*থ়া*·টি", "ত্রিশ"], fourteen: ["ফ়ো·*টীন*", "চোদ্দ"], forty: ["*ফ়ো*·টি", "চল্লিশ"],
  fifteen: ["ফ়িফ়·*টীন*", "পনেরো"], fifty: ["*ফ়িফ়*·টি", "পঞ্চাশ"], sixteen: ["স়িক্স·*টীন*", "ষোলো"], sixty: ["*স়িক্স*·টি", "ষাট"],
  seventeen: ["স়ে·ভ়ান·*টীন*", "সতেরো"], seventy: ["*স়ে*·ভ়ান·টি", "সত্তর"], eighteen: ["এই·*টীন*", "আঠারো"], eighty: ["*এই*·টি", "আশি"],
  nineteen: ["নাইন·*টীন*", "উনিশ"], ninety: ["*নাইন*·টি", "নব্বই"], hundred: ["*হান*·ড্রাড", "শত, একশো"],
  // Lesson 6: the months, the numbers and their ordinals
  january: ["*জ্যা*·নিউ·য়া·রি", "জানুয়ারি"], february: ["*ফ়ে*·বিউ·য়া·রি", "ফেব্রুয়ারি"], march: ["মাচ", "মার্চ"], april: ["*এই*·প্রিল", "এপ্রিল"],
  may: ["মেই", "মে"], june: ["জূন", "জুন"], july: ["জু·*লাই*", "জুলাই"], august: ["*অ*·গাস্ট", "আগস্ট"], september: ["স়েপ·*টেম*·বা", "সেপ্টেম্বর"],
  october: ["অক·*টো*·বা", "অক্টোবর"], november: ["নো·*ভ়েম*·বা", "নভেম্বর"], december: ["ডি·*স়েম*·বা", "ডিসেম্বর"],
  one: ["ওয়ান", "এক"], two: ["টূ", "দুই"], three: ["থ়্রী", "তিন"], four: ["ফ়ো", "চার"], five: ["ফ়াইভ়", "পাঁচ"],
  six: ["স়িক্স", "ছয়"], seven: ["*স়ে*·ভ়ান", "সাত"], eight: ["এইট", "আট"], nine: ["নাইন", "নয়"],
  first: ["ফ়াস্ট", "প্রথম"], second: ["*স়ে*·কান্ড", "দ্বিতীয়"], third: ["থ়াড", "তৃতীয়"], fourth: ["ফ়োথ়", "চতুর্থ"], fifth: ["ফ়িফ়থ়", "পঞ্চম"],
  sixth: ["স়িক্সথ়", "ষষ্ঠ"], seventh: ["*স়ে*·ভ়ান্থ়", "সপ্তম"], eighth: ["এইটথ়", "অষ্টম"], ninth: ["নাইন্থ়", "নবম"], tenth: ["টেন্থ়", "দশম"],
  eleventh: ["ই·*লে*·ভ়ান্থ়", "একাদশ"], twelfth: ["টুয়েলফ়থ়", "দ্বাদশ"],
  calendar: ["*ক্যা*·লিন·ডা", "ক্যালেন্ডার"], month: ["মান্থ়", "মাস"], year: ["ইয়া", "বছর"],
  "cardinal number": ["কাডিনল নাম্বা", "গণনাবাচক সংখ্যা"], "ordinal number": ["অডিনল নাম্বা", "ক্রমবাচক সংখ্যা"],
  "book name": ["বুক নেইম", "বইয়ের নাম"], "shelf no.": ["শেলফ় নাম্বা", "তাক নম্বর"], "name of the month": ["নেইম অভ় দ়া মান্থ়", "মাসের নাম"],
  "health care": ["হেলথ় কেয়া", "স্বাস্থ্যসেবা"], "liberation war": ["লিবারেইশান ওয়", "মুক্তিযুদ্ধ"], travel: ["*ট্র্যা*·ভ়ল", "ভ্রমণ"],
  poetry: ["*পো*·আ·ট্রি", "কবিতা"], "science fiction": ["স়াইআন্স ফ়িকশান", "বিজ্ঞান কল্পকাহিনি"], novel: ["*ন*·ভ়ল", "উপন্যাস"],
  art: ["আট", "শিল্পকলা"], religion: ["রি·*লি*·জান", "ধর্ম"], rhyme: ["রাইম", "ছড়া"], fable: ["*ফ়েই*·বল", "উপকথা"],
};
// a word as the book prints it (its case, a comma after it), with its hint and meaning
const w = (word, shown) => { const e = W[word.toLowerCase()]; if (!e) throw new Error("no hint for " + word); return [shown || word, e[0], e[1]]; };
// a word with its meaning only: in the exercises where the child must hear the middle sound (same or different, circle
// and underline, clap), the hint would give the answer away (the user's choice, 30 Oct 2026)
const q = (word, shown) => { const [e, , m] = w(word, shown); return [e, "", m]; };
// a drill line: [speaker and word as printed, hint, meaning]
const T = (e, h, m) => [e, h, m];
const S1 = (e) => [e, "", ""]; // a student's turn left to fill (dots only)
// the months as the year goes, and a list in two columns read down (the build's grid reads across)
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const down = (list, cols) => { const per = Math.ceil(list.length / cols), out = []; for (let i = 0; i < per; i++) for (let c = 0; c < cols; c++) if (list[c * per + i]) out.push(list[c * per + i]); return out; };
const NUM91 = [["91", "নাইন্টি-ওয়ান", "একানব্বই"], ["92", "নাইন্টি-টূ", "বিরানব্বই"], ["93", "নাইন্টি-থ়্রী", "তিরানব্বই"], ["94", "নাইন্টি-ফ়ো", "চুরানব্বই"], ["95", "নাইন্টি-ফ়াইভ়", "পঁচানব্বই"],
  ["96", "নাইন্টি-স়িক্স", "ছিয়ানব্বই"], ["97", "নাইন্টি-স়েভ়ান", "সাতানব্বই"], ["98", "নাইন্টি-এইট", "আটানব্বই"], ["99", "নাইন্টি-নাইন", "নিরানব্বই"], ["100", "ওয়ান হান্ড্রাড", "একশো"]];

module.exports = {
  unit: 4,
  title: ["Let’s Play with Sounds and Numbers", "চলো ধ্বনি আর সংখ্যা নিয়ে খেলি"],
  words: W,
  pages: [
    {
      page: 48, lesson: 1, opener: true, title: ["Say the middle sounds /æ/ and /e/", "মাঝের ধ্বনি /æ/ আর /e/ বলি"],
      // the book's unit title runs over two lines, so the build can't take it out of the book's text; our opener prints it
      allow: { why: "the book's unit title runs over two lines (Let’s Play with Sounds / and Numbers), so the build can't strip it; our opener header prints it", missing: ["Let's", "Play", "with", "Sounds", "and", "Numbers"] },
      blocks: [
        { k: "A", task: ["Look, listen and say the words.", "দেখো, শোনো আর শব্দগুলো বলো।"], parts: [
          { pics: ["bag", "mat", "hat", "cat"].map((x) => ({ name: "u4-w-" + x, cap: w(x) })), cols: 4, h: 26 },
        ] },
        { k: "B", task: ["Look and listen. Say the word and its middle sounds/æ/. Finally, say the word again. For example:", "দেখো আর শোনো। শব্দটা আর তার মাঝের ধ্বনি /æ/ বলো। শেষে শব্দটা আবার বলো। যেমন:"], parts: [
          { u4drill: [
            { pic: "u4-w-bag", lines: [
              [T("T: bag", "ব্যাগ", "শিক্ষক: ব্যাগ"), T("Ss: bag", "ব্যাগ", "সবাই: ব্যাগ")],
              [T("T: a (/æ/)", "অ্যা", "শিক্ষক: মাঝের ধ্বনি"), T("Ss: a (/æ/)", "অ্যা", "সবাই: মাঝের ধ্বনি")],
              [T("T: a (/æ/)", "অ্যা", "শিক্ষক: মাঝের ধ্বনি"), T("S1: a (/æ/)", "অ্যা", "একজন শিক্ষার্থী: মাঝের ধ্বনি")],
              [T("T: bag", "ব্যাগ", "শিক্ষক: ব্যাগ"), T("S2: bag", "ব্যাগ", "আরেকজন শিক্ষার্থী: ব্যাগ")],
            ], more: ["Continue …….", "", "এভাবে চালিয়ে যাও……"] },
            { pic: "u4-w-mat", more: ["Continue as above", "", "ওপরের মতো করে চালিয়ে যাও"] },
            { pic: "u4-w-hat", more: ["Continue as above", "", "ওপরের মতো করে চালিয়ে যাও"] },
            { pic: "u4-w-cat", more: ["Continue as above", "", "ওপরের মতো করে চালিয়ে যাও"] },
          ] },
        ] },
      ],
    },
    {
      page: 49, lesson: 1, title: ["Say the middle sounds /æ/ and /e/", "মাঝের ধ্বনি /æ/ আর /e/ বলি"],
      blocks: [
        { k: "C", task: ["Look, listen and say.", "দেখো, শোনো আর বলো।"], parts: [
          { u4phr: [
            [["a cat on a mat", "আ ক্যাট অন আ ম্যাট", "মাদুরের ওপর একটা বিড়াল"], "u4-w-cat-on-mat"],
            [["a hat on a cat", "আ হ্যাট অন আ ক্যাট", "বিড়ালের মাথায় একটা টুপি"], "u4-w-hat-on-cat"],
            [["a bag on a mat", "আ ব্যাগ অন আ ম্যাট", "মাদুরের ওপর একটা ব্যাগ"], "u4-w-bag-on-mat"],
          ] },
        ] },
        { k: "D", task: ["Look, listen and say the words.", "দেখো, শোনো আর শব্দগুলো বলো।"], parts: [
          { pics: ["pen", "hen", "red", "net"].map((x) => ({ name: "u4-w-" + x, cap: w(x) })), cols: 4, h: 26 },
        ] },
        { k: "E", task: ["Look and listen. Say the words and their middle sound /e/, and then say the words again, for example:", "দেখো আর শোনো। শব্দগুলো আর তাদের মাঝের ধ্বনি /e/ বলো, তারপর শব্দগুলো আবার বলো। যেমন:"], parts: [
          { u4drill: [{ lines: [
            [T("T: pen", "পেন", "শিক্ষক: কলম"), T("Ss: pen", "পেন", "সবাই: কলম")],
            [T("T: ‘e’", "এ", "শিক্ষক: মাঝের ধ্বনি"), T("Ss: ‘e’", "এ", "সবাই: মাঝের ধ্বনি")],
            [T("T: pen", "পেন", "শিক্ষক: কলম"), T("Ss: pen", "পেন", "সবাই: কলম")],
          ], more: ["Continue …..", "", "এভাবে চালিয়ে যাও….."] }] },
        ] },
      ],
    },
    {
      page: 50, lesson: 1, title: ["Say the middle sounds /æ/ and /e/", "মাঝের ধ্বনি /æ/ আর /e/ বলি"], dense: true,
      blocks: [
        { k: "F", task: ["Look, listen and say.", "দেখো, শোনো আর বলো।"], parts: [
          { u4song: { side: "u4-l1-den", w: 46, verses: [[
            ["A den and a hen", "আ ডেন অ্যান্ড আ হেন", "একটা গুহা আর একটা মুরগি"],
            ["Ten men look into", "টেন মেন লুক ইনটু", "দশজন লোক উঁকি দেয়"],
            ["A tiger’s den.", "আ টাইগাজ় ডেন।", "বাঘের গুহায়।"],
            ["They see no tiger,", "দ়েই স়ী নো টাইগা,", "তারা কোনো বাঘ দেখে না,"],
            ["But a fat red hen.", "বাট আ ফ়্যাট রেড হেন।", "দেখে একটা মোটা লাল মুরগি।"],
          ]] } },
        ] },
        { k: "G", task: ["Listen to each of the following pairs of words. Write S (same) if the middle sounds of a pair are the same. Write D (different) if the middle sounds of a pair are different. One is done for you.", "নিচের প্রতিটি শব্দজোড়া শোনো। জোড়ার দুটি শব্দের মাঝের ধ্বনি একই হলে S (same, একই) লেখো, আলাদা হলে D (different, আলাদা) লেখো। একটি করে দেওয়া আছে।"], parts: [
          { u4pairs: { box: true, rows: [
            { mk: "1.", a: q("pen"), b: q("pan"), ans: "D" },
            { mk: "2.", a: q("man"), b: q("men") },
            { mk: "3.", a: q("bag"), b: q("mat") },
            { mk: "4.", a: q("pen"), b: q("ten") },
            { mk: "5.", a: q("bed"), b: q("cat") },
          ] } },
        ] },
        { k: "H", task: ["Listen and say.", "শোনো আর বলো।"], parts: [
          { u4drill: [{ lines: [
            [T("T : (writes on board) pen", "পেন", "শিক্ষক বোর্ডে লেখেন: কলম"), T("T : fan", "ফ়্যান", "শিক্ষক: পাখা")],
            [S1("S1: …………."), S1("S2: …………")],
          ] }] },
        ] },
      ],
    },
    {
      page: 51, lesson: 1, title: ["Say the middle sounds /æ/ and /e/", "মাঝের ধ্বনি /æ/ আর /e/ বলি"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Say the following words and their middle sounds /æ/", "নিচের শব্দগুলো আর তাদের মাঝের ধ্বনি /æ/ বলো।"], parts: [
          { u4row: [[w("can"), w("man"), w("happy"), w("bad")]], grid: true },
        ] },
        { n: 2, task: ["Say the following words and their middle sounds /e/", "নিচের শব্দগুলো আর তাদের মাঝের ধ্বনি /e/ বলো।"], parts: [
          { u4row: [[w("den"), w("bed"), w("pet"), w("leg")]], grid: true },
        ] },
        { n: 3, task: ["Circle the words that have middle /æ/ sound and underline the words with middle /e/ sound.", "যে শব্দগুলোর মাঝে /æ/ ধ্বনি আছে সেগুলোয় গোল দাগ দাও, আর যেগুলোর মাঝে /e/ ধ্বনি আছে সেগুলোর নিচে দাগ দাও।"], parts: [
          { u4row: [[q("cat"), q("pen"), q("man"), q("bed")], [q("pan"), q("ten")], [q("red"), q("hen"), q("hat"), q("cap")]], oval: true },
        ] },
      ],
    },
    {
      page: 52, lesson: 2, title: ["Say the middle sounds /ɪ/ and /i:/", "মাঝের ধ্বনি /ɪ/ আর /i:/ বলি"],
      blocks: [
        { k: "A", task: ["Look, listen and say.", "দেখো, শোনো আর বলো।"], parts: [
          { pics: ["tin", "pin", "hill", "pill"].map((x) => ({ name: "u4-w-" + x, cap: w(x) })), cols: 4, h: 25 },
        ] },
        { k: "B", task: ["Look, listen and say each word. Then say the middle sound. Finally, say the word again, for example:", "দেখো, শোনো আর প্রতিটি শব্দ বলো। তারপর মাঝের ধ্বনিটা বলো। শেষে শব্দটা আবার বলো। যেমন:"], parts: [
          { u4drill: [{ lines: [
            [T("T: tin", "টিন", "শিক্ষক: টিন"), T("Ss: tin", "টিন", "সবাই: টিন")],
            [T("T: ‘i’", "ই", "শিক্ষক: মাঝের ধ্বনি"), T("Ss: ‘i’", "ই", "সবাই: মাঝের ধ্বনি")],
            [T("T: tin", "টিন", "শিক্ষক: টিন"), T("tin", "টিন", "(সবাই:) টিন")],
          ], more: ["Continue …..", "", "এভাবে চালিয়ে যাও….."] }] },
        ] },
        { k: "C", task: ["Listen to a word and say its middle sound, for example:", "একটা শব্দ শোনো আর তার মাঝের ধ্বনিটা বলো। যেমন:"], parts: [
          { u4drill: [{ lines: [
            [T("T: pin", "পিন", "শিক্ষক: আলপিন"), T("Ss: ‘i’", "ই", "সবাই: মাঝের ধ্বনি")],
            [T("T: hill", "হিল", "শিক্ষক: পাহাড়"), T("Ss: ‘i’", "ই", "সবাই: মাঝের ধ্বনি")],
          ], more: ["Continue ……", "", "এভাবে চালিয়ে যাও……"] }] },
        ] },
        { k: "D", task: ["Look, listen and say the words.", "দেখো, শোনো আর শব্দগুলো বলো।"], parts: [
          { pics: ["bean", "sleep", "sheep", "feed"].map((x) => ({ name: "u4-w-" + x, cap: w(x) })), cols: 4, h: 25 },
        ] },
      ],
    },
    {
      // the book prints this page's title without its sounds
      page: 53, lesson: 2, title: ["Say the middle sounds", "মাঝের ধ্বনি বলি"], dense: true,
      blocks: [
        { k: "E", task: ["Look, listen and say the words in D above. Then say their middle sounds. Finally say the words again. For example:", "দেখো, শোনো আর ওপরের D-এর শব্দগুলো বলো। তারপর তাদের মাঝের ধ্বনি বলো। শেষে শব্দগুলো আবার বলো। যেমন:"], parts: [
          { u4drill: [{ lines: [
            [T("T: bean", "বীন", "শিক্ষক: শিম"), T("Ss: bean", "বীন", "সবাই: শিম")],
            [T("T: ea (/i:/ )", "ঈ", "শিক্ষক: মাঝের ধ্বনি"), T("Ss: ea (/i:/ )", "ঈ", "সবাই: মাঝের ধ্বনি")],
            [T("T: bean", "বীন", "শিক্ষক: শিম"), T("Ss: bean", "বীন", "সবাই: শিম")],
          ], more: ["Continue…….", "", "এভাবে চালিয়ে যাও……."] }] },
        ] },
        { k: "F", task: ["Listen and say the following pairs of words. Now read the pairs aloud.", "নিচের শব্দজোড়াগুলো শোনো আর বলো। এবার জোড়াগুলো জোরে পড়ো।"], parts: [
          // the book's goldfish (for fin) stands beside pair 6
          { u4pairs: { cols: 2, rows: [
            { mk: "1.", a: w("slip"), b: w("sleep") }, { mk: "2.", a: w("still"), b: w("steel") }, { mk: "3.", a: w("bean"), b: w("bin") },
            { mk: "4.", a: w("ship"), b: w("sheep") }, { mk: "5.", a: w("hit"), b: w("heat") }, { mk: "6.", a: w("bin"), b: w("fin"), pb: "u4-w-fin" },
          ] } },
        ] },
        { k: "G", task: ["Listen to each of the pairs of words in F above. Write S (same) if the middle sounds of a pair are the same. Write D (different) if the middle sounds of a pair are different.", "ওপরের F-এর প্রতিটি শব্দজোড়া শোনো। জোড়ার দুটি শব্দের মাঝের ধ্বনি একই হলে S (same, একই) লেখো, আলাদা হলে D (different, আলাদা) লেখো।"], parts: [
          // the boxes to write S or D in (the book leaves the children to write beside F's pairs)
          { boxes: ["1. □", "2. □", "3. □", "4. □", "5. □", "6. □"], cols: 6 },
        ] },
        { practise: true },
        { n: 1, task: ["Circle the words that have /i/ sound and underline the words with /i:/ sound.", "যে শব্দগুলোতে /i/ ধ্বনি আছে সেগুলোয় গোল দাগ দাও, আর যেগুলোতে /i:/ ধ্বনি আছে সেগুলোর নিচে দাগ দাও।"], parts: [
          { u4row: [[q("feed", "feed ,"), q("nil", "nil,"), q("fill", "fill,"), q("sheep", "sheep,"), q("tin", "tin,")], [q("ship", "ship,"), q("slip", "slip,"), q("bean")]], oval: true },
        ] },
      ],
    },
    {
      page: 54, lesson: 3, title: ["Rhyme", "ছড়া"],
      blocks: [
        { parts: [{ u4head: ["Row, Row, Row Your Boat", "রো, রো, রো ইয়ো বোট", "বাও, বাও, বাও তোমার নৌকা"] }] },
        { k: "A", task: ["Match the pictures with the names of the animals.", "ছবিগুলোর সাথে প্রাণীদের নাম মেলাও।"], parts: [
          { u4match: { left: [w("polar bear", "Polar bear"), w("lion", "Lion"), w("crocodile", "Crocodile")],
            right: [{ pic: "u4-w-crocodile" }, { pic: "u4-w-polar-bear" }, { pic: "u4-w-lion" }] } },
        ] },
        { k: "B", task: ["Listen to the rhyme. When you listen to the name of an animal clap for three times.", "ছড়াটা শোনো। কোনো প্রাণীর নাম শুনলেই তিনবার হাততালি দাও।"] },
      ],
    },
    {
      page: 55, lesson: 3, title: ["Rhyme", "ছড়া"], dense: true,
      blocks: [
        { k: "C", task: ["Now, read aloud the rhyme below.", "এবার নিচের ছড়াটা জোরে পড়ো।"], parts: [
          { u4song: { title: ["Row, Row, Row Your Boat", "রো, রো, রো ইয়ো বোট", "বাও, বাও, বাও তোমার নৌকা"], side: "u4-l3-boat", w: 24, cols: 2, verses: [
            [["Row, row, row your boat", "রো, রো, রো ইয়ো বোট", "বাও, বাও, বাও তোমার নৌকা"],
              ["Gently down the stream", "জেন্টলি ডাউন দ়া স্ট্রীম", "আলতো করে স্রোতের টানে"],
              ["Merrily, merrily, merrily, merrily", "মেরালি, মেরালি, মেরালি, মেরালি", "আনন্দে, আনন্দে, আনন্দে, আনন্দে"],
              ["Life is but a dream.", "লাইফ় ইজ় বাট আ ড্রীম।", "জীবন তো একটা স্বপ্ন।"]],
            [["Row, row, row your boat", "রো, রো, রো ইয়ো বোট", "বাও, বাও, বাও তোমার নৌকা"],
              ["Gently up the creek.", "জেন্টলি আপ দ়া ক্রীক।", "আলতো করে খাঁড়ি বেয়ে ওপরে।"],
              ["If you see a crocodile", "ইফ় ইউ স়ী আ ক্রকাডাইল", "যদি একটা কুমির দেখো"],
              ["Don’t forget to shriek!", "ডোন্ট ফ়াগেট টু শ্রীক!", "চিৎকার করতে ভুলো না!"]],
            [["Row, row, row your boat", "রো, রো, রো ইয়ো বোট", "বাও, বাও, বাও তোমার নৌকা"],
              ["Gently down the river.", "জেন্টলি ডাউন দ়া রিভ়া।", "আলতো করে নদী বেয়ে নিচে।"],
              ["If you see a polar bear", "ইফ় ইউ স়ী আ পোলা বেয়া", "যদি একটা মেরু ভালুক দেখো"],
              ["Don’t forget to shiver!", "ডোন্ট ফ়াগেট টু শিভ়া!", "কাঁপতে ভুলো না!"]],
            [["Row, row, row your boat", "রো, রো, রো ইয়ো বোট", "বাও, বাও, বাও তোমার নৌকা"],
              ["Gently to the shore", "জেন্টলি টু দ়া শো", "আলতো করে তীরের দিকে"],
              ["If you see a lion there", "ইফ় ইউ স়ী আ লাইআন দ়েয়া", "যদি সেখানে একটা সিংহ দেখো"],
              ["Don’t forget to roar!", "ডোন্ট ফ়াগেট টু রো!", "গর্জন করতে ভুলো না!"]],
          ] } },
        ] },
        { k: "D", task: ["Do you have a similar rhyme in your own language? If so, please share it with the whole class.", "তোমার নিজের ভাষায় কি এমন কোনো ছড়া আছে? থাকলে পুরো ক্লাসকে শোনাও।"], parts: [
          { u4vocab: { title: w("vocabulary", "Vocabulary"), rows: [
            [["stream - small river", "স্ট্রীম - স্মল রিভ়া", "স্রোতধারা: ছোট নদী"], ["shiver - to shake in cold", "শিভ়া - টু শেইক ইন কোল্ড", "কাঁপা: ঠান্ডায় কাঁপা"]],
            [["merrily - happily", "মেরালি - হ্যাপিলি", "আনন্দে: খুশিমনে"], ["shriek - a loud high shout", "শ্রীক - আ লাউড হাই শাউট", "চিৎকার করা: জোরে, তীক্ষ্ণ গলায় চেঁচানো"]],
            [["creek - bay", "ক্রীক - বেই", "খাঁড়ি: উপসাগর"], ["shore - land bordering sea/river", "শো - ল্যান্ড বোডারিং স়ী/রিভ়া", "তীর: সাগর বা নদীর পাশের মাটি"]],
          ] } },
        ] },
      ],
    },
    {
      page: 56, lesson: 4, title: ["Say the middle sounds /ɑː/ and /ʌ/", "মাঝের ধ্বনি /ɑː/ আর /ʌ/ বলি"],
      blocks: [
        { k: "A", task: ["Look, listen and say the words.", "দেখো, শোনো আর শব্দগুলো বলো।"], parts: [
          { pics: ["cart", "heart", "bard", "card"].map((x) => ({ name: "u4-w-" + x, cap: w(x) })), cols: 4, h: 26 },
          // the length mark (Lesson 4 only): our guide's own note, no English of the book
          { note: { title: ["ː", "এই চিহ্নটা মানে আওয়াজটা লম্বা করে বলো: cart কাːট (লম্বা আ), কিন্তু cut কাট (ছোট আ)।"] } },
        ] },
        { k: "B", task: ["Listen and say the words in A above and their middle sounds. Finally, say the words again, for example:", "ওপরের A-এর শব্দগুলো আর তাদের মাঝের ধ্বনি শোনো আর বলো। শেষে শব্দগুলো আবার বলো। যেমন:"], parts: [
          { u4drill: [{ lines: [
            [T("T: cart", "কাːট", "শিক্ষক: ঠেলাগাড়ি"), T("Ss: cart", "কাːট", "সবাই: ঠেলাগাড়ি")],
            [T("T: a (/ɑː/)", "আː", "শিক্ষক: মাঝের ধ্বনি (লম্বা)"), T("Ss: a (/ɑː/)", "আː", "সবাই: মাঝের ধ্বনি (লম্বা)")],
            [T("T: cart", "কাːট", "শিক্ষক: ঠেলাগাড়ি"), T("Ss: cart", "কাːট", "সবাই: ঠেলাগাড়ি")],
            [T("T: Say the middle sound in hard.", "স়েই দ়া মিডল স়াউন্ড ইন হাːড।", "শিক্ষক: hard (কঠিন) শব্দের মাঝের ধ্বনিটা বলো।"), S1("S1: …….")],
          ], more: ["Continue ……", "", "এভাবে চালিয়ে যাও……"] }] },
        ] },
        { k: "C", task: ["Look, listen and say the words.", "দেখো, শোনো আর শব্দগুলো বলো।"], parts: [
          { pics: ["cut", "hut", "bud", "hush"].map((x) => ({ name: "u4-w-" + x, cap: w(x) })), cols: 4, h: 26 },
        ] },
      ],
    },
    {
      page: 57, lesson: 4, title: ["Say the middle sounds /ɑː/ and /ʌ/", "মাঝের ধ্বনি /ɑː/ আর /ʌ/ বলি"],
      blocks: [
        { k: "D", task: ["Listen and say the words with their middle sound /ʌ/ (short).", "শব্দগুলো আর তাদের মাঝের ধ্বনি /ʌ/ (ছোট) শোনো আর বলো।"], parts: [
          { u4drill: [{ lines: [
            [T("T: bud", "বাড", "শিক্ষক: কুঁড়ি"), T("Ss: bud", "বাড", "সবাই: কুঁড়ি")],
            [T("T: u (/ʌ/)", "আ", "শিক্ষক: মাঝের ধ্বনি (ছোট)"), T("Ss: u (/ʌ/)", "আ", "সবাই: মাঝের ধ্বনি (ছোট)")],
            [T("T: bud", "বাড", "শিক্ষক: কুঁড়ি"), T("Ss: bud", "বাড", "সবাই: কুঁড়ি")],
            [T("T: cut", "কাট", "শিক্ষক: কাটা দাগ"), T("S1: cut / u (/ʌ/)", "কাট / আ", "একজন শিক্ষার্থী: কাটা দাগ / মাঝের ধ্বনি")],
          ], more: ["Continue …..", "", "এভাবে চালিয়ে যাও….."] }] },
        ] },
        { k: "E", task: ["Look, listen and say.", "দেখো, শোনো আর বলো।"], parts: [
          { pics: [
            { name: "u4-w-bard", cap: ["The bard sings.", "দ়া বাːড স়িংজ়।", "চারণকবি গান গায়।"] },
            { name: "u4-w-bud", cap: ["The flower is in bud.", "দ়া ফ়্লাওয়া ইজ় ইন বাড।", "ফুলটা এখনো কুঁড়ি।"] },
            { name: "u4-w-cut", cap: ["The cut in his finger is bad.", "দ়া কাট ইন হিজ় ফ়িংগা ইজ় ব্যাড।", "তার আঙুলের কাটাটা খারাপ।"] },
          ], cols: 3, h: 36 },
          { pics: [
            { name: "u4-w-hut", cap: ["They live in a hut.", "দ়েই লিভ় ইন আ হাট।", "তারা একটা কুঁড়েঘরে থাকে।"] },
            { name: "u4-w-card", cap: ["Show me your ID card.", "শো মী ইয়ো আই ডী কাːড।", "তোমার আইডি কার্ড দেখাও।"] },
          ], cols: 2, h: 36 },
        ] },
      ],
    },
    {
      page: 58, lesson: 4, title: ["Say the middle sounds /ɑː/ and /ʌ/", "মাঝের ধ্বনি /ɑː/ আর /ʌ/ বলি"], dense: true,
      blocks: [
        { k: "F", task: ["Listen to each of the following pairs of words. Write S (same) if the middle sounds of a pair are the same. Write D (different) if the middle sounds of a pair are different.", "নিচের প্রতিটি শব্দজোড়া শোনো। জোড়ার দুটি শব্দের মাঝের ধ্বনি একই হলে S (same, একই) লেখো, আলাদা হলে D (different, আলাদা) লেখো।"], parts: [
          { u4pairs: { box: true, rows: [
            { mk: "1.", a: q("heart"), b: q("hut") }, { mk: "2.", a: q("bud"), b: q("bun") }, { mk: "3.", a: q("cut"), b: q("cart") },
            { mk: "4.", a: q("mug"), b: q("jug") }, { mk: "5.", a: q("bard"), b: q("bud") },
            { mk: "6.", a: q("barn"), b: q("bun"), pa: "u4-w-barn", pb: "u4-w-bun" },
          ] } },
        ] },
        { k: "G", task: ["Listen. Then write the word you hear. Finally, say the words you have written.", "শোনো। তারপর যে শব্দটা শুনলে সেটা লেখো। শেষে যে শব্দগুলো লিখেছ সেগুলো বলো।"], parts: [
          { u4row: [[w("hut", "hut,"), w("cart", "cart,"), w("jug", "jug,"), w("bard", "bard,"), w("tub", "tub,"), w("heart", "heart,"), w("nut")]] },
        ] },
        { practise: true },
        { n: 1, task: ["Listen and clap your hands for the word that has the middle sound /ɑː/ and /ʌ/", "শোনো, আর যে শব্দের মাঝে /ɑː/ বা /ʌ/ ধ্বনি আছে সেটা শুনলে হাততালি দাও।"], parts: [
          { u4row: [[q("start"), q("part"), q("nut"), q("cut")], [q("shut"), q("far"), q("mart"), q("cart")]], grid: true },
        ] },
      ],
    },
    {
      page: 59, lesson: 5, title: ["Numbers 91-100", "সংখ্যা ৯১-১০০"],
      blocks: [
        { k: "A", task: ["Count, listen and say the numbers.", "গোনো, শোনো আর সংখ্যাগুলো বলো।"], parts: [
          // the book draws 91, 96 and 100 into its picture
          { u4count: [{ n: 91, color: "#EF4444", answer: "91" }, { n: 96, color: "#F97316", answer: "96" }, { n: 100, color: "#84CC16", answer: "100" }], nocheck: true },
        ] },
        { k: "B", task: ["Listen, say and read the numbers.", "শোনো, বলো আর সংখ্যাগুলো পড়ো।"], parts: [
          { cards: NUM91.map(([n, h, m]) => ({ n, w: ["", h, m] })), cols: 5 },
        ] },
        { k: "C", task: ["Game.", "খেলা।"], parts: [
          { lines: [
            ["Pairwork: Every student takes a number card or wooden or plastic number in figure from 0 to 9. The pair that makes a number (from 91 to 100) will come forward and say the number.", "", "জোড়ায় কাজ: প্রত্যেক শিক্ষার্থী ০ থেকে ৯-এর একটি সংখ্যা কার্ড, বা কাঠের বা প্লাস্টিকের একটি অঙ্ক নেয়। যে জোড়া মিলে (৯১ থেকে ১০০-এর মধ্যে) একটি সংখ্যা বানাতে পারে, তারা সামনে এসে সংখ্যাটি বলবে।"],
            ["Continue……", "", "চালিয়ে যাও……"],
          ] },
        ] },
      ],
    },
    {
      page: 60, lesson: 5, title: ["Numbers 91-100", "সংখ্যা ৯১-১০০"],
      // this page's running header comes out of the PDF in pieces ("En" and "oday" on lines of their own)
      allow: { why: "the book's running header comes out of its PDF in pieces here (En / glish for T / oday on three lines), so the build keeps two of them", missing: ["En", "oday"] },
      blocks: [
        { k: "D", task: ["Let’s write the numbers from 81 to 100 and say. Two are done for you.", "চলো ৮১ থেকে ১০০ পর্যন্ত সংখ্যাগুলো লিখি আর বলি। দুটি করে দেওয়া আছে।"], parts: [
          // the book draws 81 and 100 into its picture of the pond
          { u4pond: { from: 81, to: 100, given: [81, 100], cols: 4, h: 92, frogs: [[50, 24], [28, 58], [72, 41], [50, 76], [94, 58]] }, nocheck: true },
        ] },
        { k: "E", task: ["Pick up a number card from the basket and say the numbers 13, 30, 14, 40, 15, 50, 16, 60, 17, 70, 18, 80, 19 and 90.", "ঝুড়ি থেকে একটা সংখ্যা কার্ড তোলো আর সংখ্যাগুলো বলো: ১৩, ৩০, ১৪, ৪০, ১৫, ৫০, ১৬, ৬০, ১৭, ৭০, ১৮, ৮০, ১৯ আর ৯০।"], parts: [
          // the book draws its number cards into the basket picture (the numbers are in the instruction)
          { u4basket: { cols: 7, cards: [["13", "thirteen"], ["14", "fourteen"], ["15", "fifteen"], ["16", "sixteen"], ["17", "seventeen"], ["18", "eighteen"], ["19", "nineteen"],
            ["30", "thirty"], ["40", "forty"], ["50", "fifty"], ["60", "sixty"], ["70", "seventy"], ["80", "eighty"], ["90", "ninety"]].map(([n, x]) => ({ n, w: ["", W[x][0], W[x][1]] })) }, nocheck: true },
        ] },
        { k: "F", task: ["Say and write the numbers from 1 to 100.", "১ থেকে ১০০ পর্যন্ত সংখ্যাগুলো বলো আর লেখো।"] },
      ],
    },
    {
      page: 61, lesson: 6, title: ["Ordinal numbers", "ক্রমবাচক সংখ্যা"],
      blocks: [
        { k: "A", task: ["Look. Read the names of the months.", "দেখো। মাসগুলোর নাম পড়ো।"], parts: [
          { u4year: { title: ["Calendar - 2026", "ক্যালিনডা - টুয়েন্টি টুয়েন্টি-স়িক্স", "ক্যালেন্ডার - ২০২৬"], year: 2026, months: MONTHS.map((m) => w(m)) } },
          { gap: 2 },
          { u4note: { title: ["Grammar focus:", "ব্যাকরণের কথা:"], caps: ["February", "March", "December"], lines: [
            ["We use capital letter for the first letter in the names of the months.", "উই ইউজ় ক্যাপিটল লেটা ফ়া দ়া ফ়াস্ট লেটা ইন দ়া নেইমজ় অভ় দ়া মান্থ়স।", "মাসের নামের প্রথম অক্ষরটি আমরা বড় হাতের অক্ষরে (ক্যাপিটাল লেটারে) লিখি।"],
            ["Example: February, March, December, etc.", "ইগজ়াম্পল: ফ়েবিউয়ারি, মাচ, ডিস়েম্বা, এট স়েটরা।", "যেমন: ফেব্রুয়ারি, মার্চ, ডিসেম্বর ইত্যাদি।"],
          ] } },
        ] },
      ],
    },
    {
      page: 62, lesson: 6, title: ["Ordinal numbers", "ক্রমবাচক সংখ্যা"], dense: true,
      blocks: [
        { k: "B", task: ["Read and say as the months come one after another.", "পড়ো আর বলো, যেভাবে মাসগুলো একটার পর একটা আসে।"], parts: [
          { pics: [{ name: "u4-l6-months" }], cols: 1, h: 38 },
          { lines: down([
            ["January is the _first_ month of the year.", "জ্যানিউয়ারি ইজ় দ়া ফ়াস্ট মান্থ় অভ় দ়া ইয়া।", "জানুয়ারি বছরের প্রথম মাস।"],
            ["February is the _second_ month of the year.", "ফ়েবিউয়ারি ইজ় দ়া স়েকান্ড মান্থ় অভ় দ়া ইয়া।", "ফেব্রুয়ারি বছরের দ্বিতীয় মাস।"],
            ["March is the _third_ month of the year.", "মাচ ইজ় দ়া থ়াড মান্থ় অভ় দ়া ইয়া।", "মার্চ বছরের তৃতীয় মাস।"],
            ["April is the _fourth_ month of the year.", "এইপ্রিল ইজ় দ়া ফ়োথ় মান্থ় অভ় দ়া ইয়া।", "এপ্রিল বছরের চতুর্থ মাস।"],
            ["May is the _fifth_ month of the year.", "মেই ইজ় দ়া ফ়িফ়থ় মান্থ় অভ় দ়া ইয়া।", "মে বছরের পঞ্চম মাস।"],
            ["June is the _sixth_ month of the year.", "জূন ইজ় দ়া স়িক্সথ় মান্থ় অভ় দ়া ইয়া।", "জুন বছরের ষষ্ঠ মাস।"],
            ["July is the _seventh_ month of the year.", "জুলাই ইজ় দ়া স়েভ়ান্থ় মান্থ় অভ় দ়া ইয়া।", "জুলাই বছরের সপ্তম মাস।"],
            ["August is the _eighth_ month of the year.", "অগাস্ট ইজ় দ়ি এইটথ় মান্থ় অভ় দ়া ইয়া।", "আগস্ট বছরের অষ্টম মাস।"],
            ["September is the _ninth_ month of the year.", "স়েপ্টেম্বা ইজ় দ়া নাইন্থ় মান্থ় অভ় দ়া ইয়া।", "সেপ্টেম্বর বছরের নবম মাস।"],
            ["October is the _tenth_ month of the year.", "অক্টোবা ইজ় দ়া টেন্থ় মান্থ় অভ় দ়া ইয়া।", "অক্টোবর বছরের দশম মাস।"],
            ["November is the _eleventh_ month of the year.", "নোভ়েম্বা ইজ় দ়ি ইলেভ়ান্থ় মান্থ় অভ় দ়া ইয়া।", "নভেম্বর বছরের একাদশ মাস।"],
            ["December is the _twelfth_ month of the year", "ডিস়েম্বা ইজ় দ়া টুয়েলফ়থ় মান্থ় অভ় দ়া ইয়া", "ডিসেম্বর বছরের দ্বাদশ মাস"],
          ], 2), cols: 2, style: "read" },
        ] },
        { k: "C", task: ["Read and then write the ordinal numbers.", "পড়ো, তারপর ক্রমবাচক সংখ্যাগুলো লেখো।"], parts: [
          { u4ord: { head: [w("cardinal number"), w("ordinal number")], split: 5, rows: [
            ["1", "one", "first", "1st"], ["2", "two", "second", "2nd"], ["3", "three", "third", "3rd"], ["4", "four", "fourth", "4th"], ["5", "five", "fifth", "5th"],
            ["6", "six", "sixth", "6th"], ["7", "seven", "seventh", "7th"], ["8", "eight", "eighth", "8th"], ["9", "nine", "ninth", "9th"], ["10", "ten", "tenth", "10th"],
          ].map(([n, c, o, s]) => [n, w(c), w(o), s]) } },
        ] },
      ],
    },
    {
      page: 63, lesson: 6, title: ["Ordinal numbers", "ক্রমবাচক সংখ্যা"],
      blocks: [
        { k: "D", task: ["Look at the book shelf. Fill in the blanks below with the ordinal number following the book shelf. One is done for you.", "বইয়ের তাকটা দেখো। তাক দেখে নিচের খালি ঘরে ক্রমবাচক সংখ্যা লেখো। একটি করে দেওয়া আছে।"], parts: [
          // the bookshelf as the book draws it, top to bottom; its labels are part of the book's picture ("Religious" there,
          // "Religion" in the table, as printed)
          { u4shelf: { shelves: ["Liberation war", "Health care", "Travel", "Art", "Novel", "Religious", "Science fiction", "Poetry", "Rhyme", "Fable"] } },
          { gap: 1 },
          { table: { w: [31, 19, 31, 19], head: [w("book name", "Book name"), w("shelf no.", "Shelf no."), w("book name", "Book name"), w("shelf no.", "Shelf no.")], rows: [
            [w("health care", "Health care"), "_", w("novel", "Novel"), "_"],
            [w("liberation war", "Liberation war"), "_", w("art", "Art"), "_"],
            [w("travel", "Travel"), "_", w("religion", "Religion"), "_"],
            [w("poetry", "Poetry"), "_", w("rhyme", "Rhyme"), "_"],
            [w("science fiction", "Science fiction"), "_", w("fable", "Fable"), ["(1st shelf )", "(ফ়াস্ট শেলফ়)", "(প্রথম তাক)"]],
          ] } },
        ] },
      ],
    },
    {
      page: 64, lesson: 6, title: ["Ordinal numbers", "ক্রমবাচক সংখ্যা"], dense: true,
      blocks: [
        { k: "E", task: ["Project work.", "প্রকল্পের কাজ।"], parts: [
          { u4para: ["Every student will create a home library. They will consider the availability of book shelf, suitable space, sufficient light, comfortable seating, numbering (ordinal) of the shelves. The student will invite the teachers and friends to visit the home library.", "", "প্রত্যেক শিক্ষার্থী বাড়িতে একটি ছোট লাইব্রেরি বানাবে। তারা ভেবে দেখবে বইয়ের তাক আছে কি না, উপযুক্ত জায়গা, যথেষ্ট আলো, আরাম করে বসার ব্যবস্থা, আর তাকগুলোর (ক্রমবাচক) নম্বর। তারপর শিক্ষক আর বন্ধুদের বাড়ির লাইব্রেরি দেখতে আসতে বলবে।"] },
        ] },
        { practise: true },
        { n: 1, task: ["Complete the name of the months. Use ordinal number in the left column. One is done for you.", "মাসগুলোর নাম পূর্ণ করো। বাঁ দিকের ঘরে ক্রমবাচক সংখ্যা লেখো। একটি করে দেওয়া আছে।"], parts: [
          { u4tbl: { w: [16, 34, 16, 34], head: [["Ordinal number", "অডিনল নাম্বা", "ক্রমবাচক সংখ্যা"], w("name of the month", "Name of the month"), ["Ordinal number", "অডিনল নাম্বা", "ক্রমবাচক সংখ্যা"], w("name of the month", "Name of the month")], rows: [
            ["1st", w("january", "_J_ anuary"), "_", w("june", "___une")],
            ["_", w("february", "___ebruary"), "_", w("july", "___uly")],
            ["_", w("march", "___arch"), "_", w("august", "___ugust")],
            ["_", w("april", "___pril"), "_", w("september", "___eptember")],
            ["_", w("may", "___ay"), "_", w("october", "___ctober")],
          ] } },
        ] },
        { n: 2, task: ["Write the short form of the ordinal number.", "ক্রমবাচক সংখ্যার সংক্ষিপ্ত রূপ লেখো।"], parts: [
          { u4row: [[["a.", ...w("second", "Second")], ["b.", ...w("third")], ["c.", ...w("eighth", "Eighth")]]], marks: true, box: true },
        ] },
        { n: 3, task: ["Complete the sentences with ordinal numbers.", "ক্রমবাচক সংখ্যা দিয়ে বাক্যগুলো পূর্ণ করো।"], parts: [
          { u4items: down([
            ["a.", "January is the ______________ month of the year.", "জ্যানিউয়ারি ইজ় দ়া ____ মান্থ় অভ় দ়া ইয়া।", "জানুয়ারি বছরের ____ মাস।"],
            ["b.", "March is the ______________ month of the year.", "মাচ ইজ় দ়া ____ মান্থ় অভ় দ়া ইয়া।", "মার্চ বছরের ____ মাস।"],
            ["c.", "April is the ______________ month of the year.", "এইপ্রিল ইজ় দ়া ____ মান্থ় অভ় দ়া ইয়া।", "এপ্রিল বছরের ____ মাস।"],
            ["d.", "July is the ______________ month of the year.", "জুলাই ইজ় দ়া ____ মান্থ় অভ় দ়া ইয়া।", "জুলাই বছরের ____ মাস।"],
            ["e.", "September is the ______________ month of the year.", "স়েপ্টেম্বা ইজ় দ়া ____ মান্থ় অভ় দ়া ইয়া।", "সেপ্টেম্বর বছরের ____ মাস।"],
          ], 2), cols: 2 },
        ] },
      ],
    },
  ],
};
