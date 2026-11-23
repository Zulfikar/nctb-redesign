// English for Today, Class Three (NCTB, 2025 reprint): Unit 8, printed pages 109–123 (page 124 is blank), word for word as
// printed, the book's own slips too ("passess", "some corns", "In pair", "write answer", "Phulbiju" beside "Phool Biju",
// "verb(be/do, does)"; listed in the report to Claude). Every English line the child reads, says or writes is
// [english, hint, meaning]: the hint is the British English sound in Bangla letters, as the Let's Learn English books'
// British Bangla edition writes it (dotted letters for sounds Bangla doesn't have; plain ক, ট, প, which the builder puffs at
// the start of a word). An instruction is [english, meaning]; the grammar boxes' rules are [english, "", meaning].
// Names keep their Bangla spelling, dotted where English says the sound (স়াভ়ানা, ফ়ুল বিজু), and get no syllable marks.
// The sentences to punctuate (p113 H, p114 3) have meanings without punctuation marks, so the guide doesn't give the answer.
// Pictures: art/new/<name>.png, else art/stand-in/. The unit's kinds (Unit 5's and Unit 6's under u8 names, and u8choose,
// u8words, u8pic) are in unit8.parts.js; they set the festival names in italics, as the book does.
const T1 = ["The Ant and the Grasshopper", "পিঁপড়া আর ঘাসফড়িং"];
const T2 = ["Enjoying a hill festival", "পাহাড়ি উৎসব উপভোগ"];
const COLS = [["Column A", "", "কলাম A"], ["Column B", "", "কলাম B"]];
const FILL = ["Fill in the gaps with the right words from the box.", "বক্সের ঠিক শব্দগুলো দিয়ে খালি জায়গাগুলো পূরণ করো।"];

module.exports = {
  unit: 8,
  title: ["Facts and Fables", "সত্য ঘটনা আর উপকথা"],
  pages: [
    // ── Lesson 1: The Ant and the Grasshopper ──
    {
      page: 109, lesson: 1, opener: true, title: T1,
      blocks: [
        { k: "A", task: ["Colour the picture. Now discuss in groups what you see in the picture.", "ছবিটিতে রং করো। এবার ছবিতে কী দেখছ, তা নিয়ে দলে আলোচনা করো।"], parts: [
          { pics: [{ name: "u8-l1-colour-ant-grasshopper" }], cols: 1, outline: true, h: 70 },
        ] },
        { k: "B", task: ["Listen to the story, one sentence at a time. Then read it in groups. If necessary, help each other.", "গল্পটি একটি একটি বাক্য করে শোনো। তারপর দলে পড়ো। দরকার হলে একে অন্যকে সাহায্য করো।"], parts: [
          { u8read: [[
            ["An ant and a grasshopper are two good friends.", "অ্যান অ্যান্ট অ্যান্ড আ গ্রাস়হপা আ টূ গুড ফ়্রেন্ডজ়।", "একটি পিঁপড়া আর একটি ঘাসফড়িং দুই ভালো বন্ধু।"],
            ["They live in a grassy field.", "দ়েই লিভ় ইন আ গ্রাস়ি ফ়ীল্ড।", "তারা ঘাসে ভরা একটি মাঠে থাকে।"],
          ], [
            ["It is a sunny summer morning.", "ইট ইজ় আ স়ানি স়ামা মনিং।", "এখন গ্রীষ্মের এক রোদেলা সকাল।"],
            ["The grasshopper is enjoying the sun.", "দ়া গ্রাস়হপা ইজ় ইনজয়িং দ়া স়ান।", "ঘাসফড়িং রোদ উপভোগ করছে।"],
            ["He is dancing and singing happily.", "হী ইজ় ডান্সিং অ্যান্ড স়িঙিং হ্যাপিলি।", "সে মনের আনন্দে নাচছে আর গান গাইছে।"],
            ["He does not usually like to work.", "হী ডাজ় নট ইউজ়ুয়ালি লাইক টু ওয়াক।", "সাধারণত কাজ করতে তার ভালো লাগে না।"],
          ]] },
        ] },
      ],
    },
    {
      page: 110, lesson: 1, dense: true, title: T1,
      blocks: [
        { parts: [
          { u8pic: "u8-l1-summer", h: 46, pos: "50% 48%" },
          { u8wrap: { u8read: [[
            ["Now the ant is passing by the grasshopper.", "নাউ দ়ি অ্যান্ট ইজ় পাস়িং বাই দ়া গ্রাস়হপা।", "এখন পিঁপড়াটি ঘাসফড়িংয়ের পাশ দিয়ে যাচ্ছে।"],
            ["She is carrying an ear of corn to her house.", "শী ইজ় ক্যারিইং অ্যান ইয়া অভ় কন টু হা হাউস়।", "সে একটি ভুট্টার শিষ বয়ে তার বাড়িতে নিয়ে যাচ্ছে।"],
            ["She is storing food for the winter.", "শী ইজ় স্টোরিং ফ়ূড ফ়া দ়া উইনটা।", "সে শীতের জন্য খাবার জমাচ্ছে।"],
            ["The grasshopper laughs at her and says,", "দ়া গ্রাস়হপা লাফ়স অ্যাট হা অ্যান্ড স়েজ়,", "ঘাসফড়িং তাকে দেখে হাসে আর বলে,"],
          ], [
            ["“Hey Ant! Why do you work hard all the time?", "“হেই অ্যান্ট! ওয়াই ডু ইউ ওয়াক হাড অল দ়া টাইম?", "“এই পিঁপড়া! তুমি সারাক্ষণ এত খাটো কেন?"],
            ["Come and join me. Let’s enjoy the sun.”", "কাম অ্যান্ড জয়ন মী। লেটস ইনজয় দ়া স়ান।”", "এসো, আমার সাথে যোগ দাও। চলো, রোদ উপভোগ করি।”"],
          ], [
            ["The ant replies, “Oh Grasshopper! Winter is coming.", "দ়ি অ্যান্ট রিপ্লাইজ়, “ও গ্রাস়হপা! উইনটা ইজ় কামিং।", "পিঁপড়া উত্তর দেয়, “ও ঘাসফড়িং! শীত আসছে।"],
            ["Let’s collect some corns together.”", "লেটস কালেক্ট স়াম কনজ় টুগেদ়া।”", "চলো, দুজনে মিলে কিছু ভুট্টা জমাই।”"],
          ], [
            ["The grasshopper does not listen to her.", "দ়া গ্রাস়হপা ডাজ় নট লিস়ান টু হা।", "ঘাসফড়িং তার কথা শোনে না।"],
            ["So, the ant goes her way and continues her work.", "স়ো, দ়ি অ্যান্ট গোজ় হা ওয়েই অ্যান্ড কান্টিনিউজ় হা ওয়াক।", "তাই পিঁপড়া নিজের পথে চলে যায় আর তার কাজ করে চলে।"],
          ]] }, ulook: "tight flow" },
          { u8beside: { pic: "u8-l1-winter", side: "left", w: 34, h: 38, look: "tight", text: [
            ["After the summer, the winter begins.", "আফ়টা দ়া স়ামা, দ়া উইনটা বিগিনজ়।", "গ্রীষ্মের পরে শীত শুরু হয়।"],
            ["The days become very cold.", "দ়া ডেইজ় বিকাম ভ়েরি কোল্ড।", "দিনগুলো খুব ঠান্ডা হয়ে যায়।"],
            ["The leaves start to fall everywhere.", "দ়া লীভ়জ় স্টাট টু ফ়ল এভ়রিওয়েয়া।", "চারদিকে পাতা ঝরতে শুরু করে।"],
            ["The grasshopper finds no food to eat.", "দ়া গ্রাস়হপা ফ়াইন্ডজ় নো ফ়ূড টু ঈট।", "ঘাসফড়িং খাওয়ার মতো কোনো খাবার পায় না।"],
            ["He starves, and he becomes sad.", "হী স্টাভ়জ়, অ্যান্ড হী বিকামজ় স়্যাড।", "সে না খেয়ে থাকে, আর তার মন খারাপ হয়ে যায়।"],
          ] } },
        ] },
      ],
    },
    {
      page: 111, lesson: 1, title: T1,
      blocks: [
        { parts: [
          { u8beside: { pic: "u8-l1-cozy-home", side: "right", w: 54, h: 84, text: [
            ["On the other hand, the ant has plenty of food.", "অন দ়ি আদ়া হ্যান্ড, দ়ি অ্যান্ট হ্যাজ় প্লেন্টি অভ় ফ়ূড।", "অন্যদিকে, পিঁপড়ার কাছে প্রচুর খাবার আছে।"],
            ["She is passing her time happily at her cozy home.", "শী ইজ় পাস়িং হা টাইম হ্যাপিলি অ্যাট হা কোজ়ি হোম।", "সে তার আরামের ঘরে আনন্দে সময় কাটাচ্ছে।"],
          ] } },
        ] },
        { k: "C", task: ["Read the story individually and tick the correct answer.", "গল্পটি একা একা পড়ো আর সঠিক উত্তরে টিক দাও।"], parts: [
          { u8choose: [
            { q: ["1.", "What is the grasshopper doing in the summer morning?", "ওয়ট ইজ় দ়া গ্রাস়হপা ডূইং ইন দ়া স়ামা মনিং?", "গ্রীষ্মের সকালে ঘাসফড়িং কী করছে?"],
              stem: ["The grasshopper is ______ .", "দ়া গ্রাস়হপা ইজ় ……।", "ঘাসফড়িং ……।"], options: [
                ["a)", "carrying corns", "ক্যারিইং কনজ়", "ভুট্টা বয়ে নিচ্ছে"], ["b)", "enjoying the sun", "ইনজয়িং দ়া স়ান", "রোদ উপভোগ করছে"], ["c)", "making fun with the ant", "মেইকিং ফ়ান উইদ় দ়ি অ্যান্ট", "পিঁপড়াকে নিয়ে মজা করছে"]] },
            { q: ["2.", "What is the ant doing in the summer?", "ওয়ট ইজ় দ়ি অ্যান্ট ডূইং ইন দ়া স়ামা?", "গ্রীষ্মে পিঁপড়া কী করছে?"],
              stem: ["The ant is ______ .", "দ়ি অ্যান্ট ইজ় ……।", "পিঁপড়া ……।"], options: [
                ["a)", "playing in the sun", "প্লেইং ইন দ়া স়ান", "রোদে খেলছে"], ["b)", "singing in the field", "স়িঙিং ইন দ়া ফ়ীল্ড", "মাঠে গান গাইছে"], ["c)", "carrying an ear of corn", "ক্যারিইং অ্যান ইয়া অভ় কন", "একটি ভুট্টার শিষ বয়ে নিচ্ছে"]] },
          ], ulook: "opts3" },
        ] },
      ],
    },
    {
      page: 112, lesson: 1, dense: true, title: T1,
      blocks: [
        { parts: [
          { u8choose: [
            { q: ["3.", "How does the grasshopper pass the winter?", "হাউ ডাজ় দ়া গ্রাস়হপা পাস় দ়া উইনটা?", "ঘাসফড়িং শীতকাল কীভাবে কাটায়?"],
              stem: ["The grasshopper passess the winter ______ .", "দ়া গ্রাস়হপা পাস়িজ় দ়া উইনটা ……।", "ঘাসফড়িং শীতকাল কাটায় ……।"], options: [
                ["a)", "without food", "উইদ়আউট ফ়ূড", "খাবার ছাড়া"], ["b)", "singing and dancing", "স়িঙিং অ্যান্ড ডান্সিং", "গান গেয়ে আর নেচে"], ["c)", "working hard", "ওয়াকিং হাড", "খুব খেটে"]] },
            { q: ["4.", "How does the ant pass the winter?", "হাউ ডাজ় দ়ি অ্যান্ট পাস় দ়া উইনটা?", "পিঁপড়া শীতকাল কীভাবে কাটায়?"],
              stem: ["The ant passes the winter ______ .", "দ়ি অ্যান্ট পাস়িজ় দ়া উইনটা ……।", "পিঁপড়া শীতকাল কাটায় ……।"], options: [
                ["a)", "happily at her cozy home", "হ্যাপিলি অ্যাট হা কোজ়ি হোম", "তার আরামের ঘরে আনন্দে"], ["b)", "sadly", "*স়্যাড*·লি", "দুঃখে"], ["c)", "in search of food", "ইন স়াচ অভ় ফ়ূড", "খাবারের খোঁজে"]] },
          ], ulook: "flow opts3 small" },
        ] },
        { k: "D", task: ["Ask and answer the following questions in pairs.", "জোড়ায় নিচের প্রশ্নগুলো জিজ্ঞেস করো আর উত্তর দাও।"], parts: [
          { u8wrap: { items: [
            ["1.", "Where do the ant and the grasshopper live?", "ওয়েয়া ডু দ়ি অ্যান্ট অ্যান্ড দ়া গ্রাস়হপা লিভ়?", "পিঁপড়া আর ঘাসফড়িং কোথায় থাকে?"],
            ["2.", "What does the ant carry to her house?", "ওয়ট ডাজ় দ়ি অ্যান্ট ক্যারি টু হা হাউস়?", "পিঁপড়া তার বাড়িতে কী বয়ে নিয়ে যায়?"],
            ["3.", "What does the grasshopper say to the ant?", "ওয়ট ডাজ় দ়া গ্রাস়হপা স়েই টু দ়ি অ্যান্ট?", "ঘাসফড়িং পিঁপড়াকে কী বলে?"],
            ["4.", "What does the ant say in reply?", "ওয়ট ডাজ় দ়ি অ্যান্ট স়েই ইন রিপ্লাই?", "উত্তরে পিঁপড়া কী বলে?"],
            ["5.", "What happens to the grasshopper in the winter?", "ওয়ট হ্যাপানজ় টু দ়া গ্রাস়হপা ইন দ়া উইনটা?", "শীতকালে ঘাসফড়িংয়ের কী হয়?"],
          ] }, ulook: "flow small" },
        ] },
        { k: "E", task: ["Write the words Summer and Winter in your exercise book in two columns. Now choose the right words/phrases for the columns and write them.", "তোমার অনুশীলন খাতায় দুটি কলামে Summer (গ্রীষ্মকাল) আর Winter (শীতকাল) শব্দ দুটি লেখো। এবার কোন কলামে কোন শব্দ বা শব্দগুচ্ছ যাবে, বেছে নিয়ে লেখো।"], parts: [
          { u8words: { label: ["Words/phrases:", "শব্দ/শব্দগুচ্ছ:"], words: [
            ["dry leaves", "ড্রাই লীভ়জ়", "শুকনো পাতা"], ["sunny", "*স়া*·নি", "রোদেলা"], ["enjoying the sun", "ইনজয়িং দ়া স়ান", "রোদ উপভোগ করা"],
            ["gloomy", "*গ্লূ*·মি", "মেঘলা, মনমরা"], ["warm day", "ওয়ম ডেই", "গরম দিন"], ["cold", "কোল্ড", "ঠান্ডা"]] } },
          { u8wrap: { u8table: { head: [[["Summer", "*স়া*·মা", "গ্রীষ্মকাল"], 1], [["Winter", "*উইন*·টা", "শীতকাল"], 1]], w: [50, 50], rows: [[" ", " "]] } } }, // normal rows: p112 also carries the small QR for Activity C, run on from p111
        ] },
      ],
    },
    {
      page: 113, lesson: 1, title: T1,
      blocks: [
        { k: "F", task: ["Roleplay: In pair, play the roles of the Ant and the Grasshopper in the class.", "অভিনয়: জোড়ায় জোড়ায় ক্লাসের সামনে পিঁপড়া আর ঘাসফড়িংয়ের ভূমিকায় অভিনয় করো।"], parts: [
          { u8wrap: { note: { title: ["Grammar focus :", "ব্যাকরণের কথা:"], lines: [
            ["Use of punctuation mark", "", "যতিচিহ্নের ব্যবহার"],
            ["For a surprise, an exclamation mark (!) is used. For making a question, a question mark (?) is used; and for a short pause in a sentence, a comma (,) is used.", "", "অবাক হলে বিস্ময়চিহ্ন (!) বসে। প্রশ্ন করতে প্রশ্নচিহ্ন (?) বসে; আর বাক্যের মাঝে একটু থামতে কমা (,) বসে।"],
            ["Example:", "", "উদাহরণ:"],
            ["What a beautiful bird!", "ওয়ট আ বিউটিফ়াল বাড!", "কী সুন্দর পাখি!"],
            ["Who is he?", "হূ ইজ় হী?", "সে কে?"],
            ["I read, write and play.", "আই রীড, রাইট অ্যান্ড প্লেই।", "আমি পড়ি, লিখি আর খেলি।"],
          ] } }, ubold: ["Use of punctuation mark", "Example:"], ulook: "plain" },
        ] },
        { k: "G", task: ["In pairs, read the story in activity B and underline question mark, exclamation mark and comma.", "জোড়ায় B কাজের গল্পটি পড়ো আর প্রশ্নচিহ্ন, বিস্ময়চিহ্ন ও কমার নিচে দাগ দাও।"] },
        { k: "H", task: ["Put punctuation marks in the following passage:", "নিচের অনুচ্ছেদে যতিচিহ্ন বসাও:"], parts: [
          { lines: [
            ["What a bright day The grasshopper is dancing singing and playing in the sun What is the ant doing She is carrying an ear of corn", "ওয়ট আ ব্রাইট ডেই দ়া গ্রাস়হপা ইজ় ডান্সিং স়িঙিং অ্যান্ড প্লেইং ইন দ়া স়ান ওয়ট ইজ় দ়ি অ্যান্ট ডূইং শী ইজ় ক্যারিইং অ্যান ইয়া অভ় কন", "কী উজ্জ্বল দিন ঘাসফড়িং রোদে নাচছে গাইছে আর খেলছে পিঁপড়া কী করছে সে একটি ভুট্টার শিষ বয়ে নিয়ে যাচ্ছে"],
          ], style: "read" },
          { write: 3 },
        ] },
      ],
    },
    {
      page: 114, lesson: 1, dense: true, title: T1,
      blocks: [
        { practise: true },
        { n: 1, task: ["Match column A with column B. One is done for you.", "A কলামের সাথে B কলাম মেলাও। একটি করে দেওয়া আছে।"], parts: [
          { u8match: { a: COLS[0], b: COLS[1], aw: 36,
            left: [["sunny", "*স়া*·নি", "রোদেলা"], ["carry", "*ক্যা*·রি", "বয়ে নেওয়া"], ["starve", "স্টাভ়", "না খেয়ে থাকা"], ["plenty", "*প্লেন*·টি", "প্রচুর"], ["cozy", "*কো*·জ়ি", "আরামের"], ["grassy", "*গ্রা*·স়ি", "ঘাসে ভরা"]],
            right: [["become weak from lack of food", "বিকাম উইক ফ়্রম ল্যাক অভ় ফ়ূড", "খাবারের অভাবে দুর্বল হয়ে পড়া"], ["full of grass", "ফ়ুল অভ় গ্রাস়", "ঘাসে ভরা"], ["bear", "বেয়া", "বহন করা"], ["comfortable", "*কাম্ফ়*·টা·বল", "আরামদায়ক"], ["bright", "ব্রাইট", "উজ্জ্বল"], ["enough", "ই·*নাফ়*", "যথেষ্ট"]],
            done: [[0, 4]] } },
        ] },
        { n: 2, task: FILL, parts: [
          { u8wrap: { words: [["passing by", "পাস়িং বাই", "পাশ দিয়ে যাচ্ছে"], ["starves", "স্টাভ়জ়", "না খেয়ে থাকে"], ["sunny", "*স়া*·নি", "রোদেলা"], ["grassy", "*গ্রা*·স়ি", "ঘাসে ভরা"], ["falling down", "ফ়লিং ডাউন", "ঝরে পড়ছে"]] }, u8look: "words" },
          { u8wrap: { items: [
            ["a.", "The ant and the grasshopper live in a ____________ field.", "দ়ি অ্যান্ট অ্যান্ড দ়া গ্রাস়হপা লিভ় ইন আ …… ফ়ীল্ড।", "পিঁপড়া আর ঘাসফড়িং একটি …… মাঠে থাকে।"],
            ["b.", "The summer morning is _______________.", "দ়া স়ামা মনিং ইজ় ……।", "গ্রীষ্মের সকালটি ……।"],
            ["c.", "The ant is _______________ the grasshopper.", "দ়ি অ্যান্ট ইজ় …… দ়া গ্রাস়হপা।", "পিঁপড়াটি ঘাসফড়িংয়ের ……।"],
            ["d.", "The leaves are _______________ everywhere.", "দ়া লীভ়জ় আ …… এভ়রিওয়েয়া।", "চারদিকে পাতা ……।"],
            ["e.", "The grasshopper _______________ and becomes sad.", "দ়া গ্রাস়হপা …… অ্যান্ড বিকামজ় স়্যাড।", "ঘাসফড়িং …… আর তার মন খারাপ হয়ে যায়।"],
          ] }, ulook: "flow small", u8look: "lowbox" },
        ] },
        { n: 3, task: ["Put punctuation marks.", "যতিচিহ্ন বসাও।"], parts: [
          { u8wrap: { items: [
            ["a.", "I like apple orange and banana", "আই লাইক অ্যাপল অরিঞ্জ অ্যান্ড বানানা", "আমি আপেল কমলা আর কলা পছন্দ করি"],
            ["b.", "Hello How are you", "হ্যালো হাউ আ ইউ", "হ্যালো তুমি কেমন আছ"],
            ["c.", "It is a beautiful day", "ইট ইজ় আ বিউটিফ়াল ডেই", "আজ একটি সুন্দর দিন"],
            ["d.", "What time is it now", "ওয়ট টাইম ইজ় ইট নাউ", "এখন কয়টা বাজে"],
            ["e.", "Bravo You did a great job", "ব্রাভ়ো ইউ ডিড আ গ্রেইট জব", "সাবাশ তুমি দারুণ কাজ করেছ"],
          ], cols: 2 }, ulook: "small" },
        ] },
      ],
    },
    // ── Lesson 2: Enjoying a hill festival ──
    {
      page: 115, lesson: 2, title: T2,
      blocks: [
        { k: "A", task: ["Colour the picture.", "ছবিটিতে রং করো।"], parts: [
          { pics: [{ name: "u8-l2-colour-flowers" }], cols: 1, outline: true, h: 172 },
        ] },
      ],
    },
    {
      page: 116, lesson: 2, title: T2,
      blocks: [
        { k: "B", task: ["Now listen to the story and read each line of the story in groups. Help each other if necessary.", "এবার গল্পটি শোনো আর দলে গল্পের প্রতিটি লাইন পড়ো। দরকার হলে একে অন্যকে সাহায্য করো।"], parts: [
          { u8beside: { pic: "u8-l2-welcome", side: "left", w: 56, h: 84, text: [
            ["Hello! I am Anika.", "হ্যালো! আই অ্যাম আনিকা।", "হ্যালো! আমি আনিকা।"],
            ["I live in the plain land.", "আই লিভ় ইন দ়া প্লেইন ল্যান্ড।", "আমি সমতলে থাকি।"],
            ["I like to attend the hill festivals.", "আই লাইক টু আটেন্ড দ়া হিল ফ়েস্টিভ়ালজ়।", "পাহাড়ের উৎসবে যেতে আমার ভালো লাগে।"],
            ["So I am here in the hills to visit my friend.", "স়ো আই অ্যাম হিয়া ইন দ়া হিলজ় টু ভ়িজ়িট মাই ফ়্রেন্ড।", "তাই বন্ধুর সাথে দেখা করতে আমি এখানে পাহাড়ে এসেছি।"],
          ] } },
          { u8beside: { pic: "u8-l2-water-welcome", side: "right", w: 56, h: 84, text: [
            ["She is Savana.", "শী ইজ় স়াভ়ানা।", "ও সাভানা।"],
            ["She welcomes me to her house, spraying water upon me.", "শী ওয়েলকামজ় মী টু হা হাউস়, স্প্রেইইং ওয়টা আপন মী।", "সে আমার গায়ে পানি ছিটিয়ে তার বাড়িতে আমাকে স্বাগত জানায়।"],
            ["Her parents greet me.", "হা পেয়ারান্টস গ্রীট মী।", "তার মা-বাবা আমাকে শুভেচ্ছা জানান।"],
            ["The house is decorated with colours and flowers.", "দ়া হাউস় ইজ় ডেকারেইটিড উইদ় কালাজ় অ্যান্ড ফ়্লাওয়াজ়।", "বাড়িটি নানা রং আর ফুল দিয়ে সাজানো।"],
          ] } },
        ] },
      ],
    },
    {
      page: 117, lesson: 2, title: T2,
      blocks: [
        { parts: [
          { u8beside: { pic: "u8-l2-food", side: "left", w: 62, h: 90, text: [
            ["They entertain me with various food items.", "দ়েই এন্টাটেইন মী উইদ় ভ়েয়ারিয়াস় ফ়ূড আইটামজ়।", "তারা নানা রকম খাবার দিয়ে আমাকে আপ্যায়ন করে।"],
          ] } },
          { u8beside: { pic: "u8-l2-phool-biju", side: "right", w: 62, h: 90, text: [
            ["Today is Phool Biju.", "টুডেই ইজ় ফ়ুল বিজু।", "আজ ফুল বিজু।"],
            ["On this day, hill girls float flowers wishing a happy new year.", "অন দ়িস় ডেই, হিল গালজ় ফ়্লোট ফ়্লাওয়াজ় উইশিং আ হ্যাপি নিউ ইয়া।", "এই দিনে পাহাড়ি মেয়েরা নতুন বছরের শুভ কামনা করে পানিতে ফুল ভাসায়।"],
          ] } },
        ] },
      ],
    },
    {
      page: 118, lesson: 2, title: T2,
      blocks: [
        { parts: [
          { u8beside: { pic: "u8-l2-mulbiju", side: "left", w: 62, h: 90, text: [
            ["The next day is Mulbiju.", "দ়া নেক্সট ডেই ইজ় মূলবিজু।", "পরের দিন মূল বিজু।"],
            ["On this occasion, young boys and girls spray water on each other.", "অন দ়িস় আকেইজ়ান, ইয়াং বয়জ় অ্যান্ড গালজ় স্প্রেই ওয়টা অন ঈচ আদ়া।", "এই উপলক্ষে ছেলেমেয়েরা একে অন্যের গায়ে পানি ছিটায়।"],
            ["They believe that spraying water washes away sorrows of life.", "দ়েই বিলীভ় দ়্যাট স্প্রেইইং ওয়টা ওয়শিজ় আওয়েই স়রোজ় অভ় লাইফ়।", "তারা বিশ্বাস করে, পানি ছিটালে জীবনের দুঃখ ধুয়ে যায়।"],
          ] } },
          { u8beside: { pic: "u8-l2-new-year", side: "right", w: 62, h: 90, text: [
            ["Then comes the new year’s day.", "দ়েন কামজ় দ়া নিউ ইয়াজ় ডেই।", "তারপর আসে নতুন বছরের দিন।"],
            ["It is called Gajjya Pajjya.", "ইট ইজ় কলড গজ্যা পজ্যা।", "একে বলে গজ্যা পজ্যা।"],
          ] } },
        ] },
      ],
    },
    {
      page: 119, lesson: 2, title: T2,
      blocks: [
        { parts: [
          { u8beside: { pic: "u8-l2-carnival", side: "left", w: 62, h: 90, text: [
            ["Cultural shows and carnivals are arranged to celebrate the day.", "কালচারাল শোজ় অ্যান্ড কানিভ়ালজ় আ আরেইঞ্জড টু স়েলিব্রেইট দ়া ডেই।", "দিনটি উদ্‌যাপন করতে সাংস্কৃতিক অনুষ্ঠান আর আনন্দমেলার আয়োজন করা হয়।"],
          ] } },
          { u8beside: { pic: "u8-l2-goodbye", side: "right", w: 62, h: 90, text: [
            ["I am here almost the whole day with my friend.", "আই অ্যাম হিয়া অলমোস্ট দ়া হোল ডেই উইদ় মাই ফ়্রেন্ড।", "প্রায় সারা দিন আমি এখানে বন্ধুর সাথে থাকি।"],
            ["I enjoy the festival very much.", "আই ইনজয় দ়া ফ়েস্টিভ়াল ভ়েরি মাচ।", "উৎসবটি আমার খুব ভালো লাগে।"],
          ] } },
        ] },
      ],
    },
    {
      page: 120, lesson: 2, dense: true, title: T2,
      blocks: [
        // the book letters this task B again (after page 116's B)
        { k: "B", task: ["Look at the pictures. Discuss the questions in small groups.", "ছবিগুলো দেখো। ছোট ছোট দলে প্রশ্নগুলো নিয়ে আলোচনা করো।"], parts: [
          { u8wrap: { items: [
            ["1.", "Where is the festival taking place?", "ওয়েয়া ইজ় দ়া ফ়েস্টিভ়াল টেইকিং প্লেইস়?", "উৎসবটি কোথায় হচ্ছে?"],
            ["2.", "What are the hill girls doing in the water?", "ওয়ট আ দ়া হিল গালজ় ডূইং ইন দ়া ওয়টা?", "পাহাড়ি মেয়েরা পানিতে কী করছে?"],
            ["3.", "What are the boys and the girls doing?", "ওয়ট আ দ়া বয়জ় অ্যান্ড দ়া গালজ় ডূইং?", "ছেলেমেয়েরা কী করছে?"],
            ["4.", "How are the two girls dancing?", "হাউ আ দ়া টূ গালজ় ডান্সিং?", "মেয়ে দুটি কীভাবে নাচছে?"],
          ] }, ulook: "flow small" },
          { u8wrap: { note: { title: ["Grammar focus :", "ব্যাকরণের কথা:"], lines: [
            ["Continuous tenses : actions or events continuing in the present.", "", "Continuous tense (চলমান কাল): এখন চলছে এমন কাজ বা ঘটনা।"],
            ["Structure: subject + be verb (am/is/are) + verb + ing.", "", "গঠন: কর্তা + be verb (am/is/are) + verb + ing।"],
            ["Example: He is reading. She is writing.", "ইগজ়াম্পল: হী ইজ় রীডিং। শী ইজ় রাইটিং।", "উদাহরণ: সে পড়ছে। সে লিখছে।"],
          ] } }, ubold: ["Continuous tenses :", "Structure:", "Example:"], ulook: "plain small flow" },
        ] },
        { k: "C", task: ["Write True or False for the sentences below. If false write the correct answers.", "নিচের বাক্যগুলোর পাশে True বা False লেখো। False হলে সঠিক উত্তরটি লেখো।"], parts: [
          { u8rows: [
            ["1.", "The name of the hill girl is Savana.", "দ়া নেইম অভ় দ়া হিল গাল ইজ় স়াভ়ানা।", "পাহাড়ি মেয়েটির নাম সাভানা।"],
            ["2.", "Savana welcomes a girl from the hill to her house.", "স়াভ়ানা ওয়েলকামজ় আ গাল ফ়্রম দ়া হিল টু হা হাউস়।", "সাভানা পাহাড়ের একটি মেয়েকে তার বাড়িতে স্বাগত জানায়।"],
            ["3.", "On the day of Phool Biju hill girls float flowers in the water.", "অন দ়া ডেই অভ় ফ়ুল বিজু হিল গালজ় ফ়্লোট ফ়্লাওয়াজ় ইন দ়া ওয়টা।", "ফুল বিজুতে পাহাড়ি মেয়েরা পানিতে ফুল ভাসায়।"],
            ["4.", "Spraying water on Mulbiju brings sorrows in life.", "স্প্রেইইং ওয়টা অন মূলবিজু ব্রিংজ় স়রোজ় ইন লাইফ়।", "মূল বিজুতে পানি ছিটালে জীবনে দুঃখ আসে।"],
            ["5.", "The new year’s day is called Mulbiju.", "দ়া নিউ ইয়াজ় ডেই ইজ় কলড মূলবিজু।", "নতুন বছরের দিনটিকে মূল বিজু বলে।"],
          ], right: "line", rw: 26, tight: true },
        ] },
        { k: "D", task: ["Read the story individually and write answer to each of the following questions.", "গল্পটি একা একা পড়ো আর নিচের প্রতিটি প্রশ্নের উত্তর লেখো।"], parts: [
          { u8wrap: { items: [
            ["1.", "Where does Anika live?", "ওয়েয়া ডাজ় আনিকা লিভ়?", "আনিকা কোথায় থাকে?"],
            ["2.", "What is the name of the hill girl?", "ওয়ট ইজ় দ়া নেইম অভ় দ়া হিল গাল?", "পাহাড়ি মেয়েটির নাম কী?"],
            ["3.", "How does the hill girl welcome Anika?", "হাউ ডাজ় দ়া হিল গাল ওয়েলকাম আনিকা?", "পাহাড়ি মেয়েটি আনিকাকে কীভাবে স্বাগত জানায়?"],
            ["4.", "Why do the hill people float flowers in the water?", "ওয়াই ডু দ়া হিল পীপল ফ়্লোট ফ়্লাওয়াজ় ইন দ়া ওয়টা?", "পাহাড়ের মানুষেরা কেন পানিতে ফুল ভাসায়?"],
            ["5.", "What do hill people do on the day of Mulbiju?", "ওয়ট ডু হিল পীপল ডু অন দ়া ডেই অভ় মূলবিজু?", "মূল বিজুর দিনে পাহাড়ের মানুষেরা কী করে?"],
          ] }, ulook: "flow small" },
        ] },
      ],
    },
    {
      page: 121, lesson: 2, dense: true, title: T2,
      blocks: [
        { k: "E", task: ["Act out in groups the scenes of floating flowers in the water and spraying water on each other.", "দলে দলে পানিতে ফুল ভাসানো আর একে অন্যের গায়ে পানি ছিটানোর দৃশ্যগুলো অভিনয় করে দেখাও।"], parts: [
          { u8wrap: { note: { title: ["Grammar focus :", "ব্যাকরণের কথা:"], lines: [
            ["Verbs: Verbs are words that tell us of actions. They are known as ‘doing words’.", "", "Verb (ক্রিয়া): যে শব্দগুলো আমাদের কাজের কথা বলে, সেগুলো verb। এদের ‘doing words’ (কাজের শব্দ) বলে।"],
            ["Example: go, read, float, spread, dance", "ইগজ়াম্পল: গো, রীড, ফ়্লোট, স্প্রেড, ডান্স", "উদাহরণ: যাওয়া, পড়া, ভাসা, ছড়ানো, নাচা"],
            ["Simple present: For any general statement, and for habits and facts the simple present tense is used.", "", "Simple present (সাধারণ বর্তমান কাল): যেকোনো সাধারণ কথা, অভ্যাস আর সত্য ঘটনা বলতে simple present tense ব্যবহার হয়।"],
            ["Example: He is a good boy. She goes to school every day. The moon shines at night.", "ইগজ়াম্পল: হী ইজ় আ গুড বয়। শী গোজ় টু স্কূল এভ়রি ডেই। দ়া মূন শাইনজ় অ্যাট নাইট।", "উদাহরণ: সে ভালো ছেলে। সে প্রতিদিন স্কুলে যায়। রাতে চাঁদ আলো দেয়।"],
          ] } }, ubold: ["Verbs:", "Example:", "Simple present:"], ulook: "plain" },
          { u8wrap: { note: { title: ["Grammar focus:", "ব্যাকরণের কথা:"], lines: [
            ["Declarative Sentences: Declarative sentences are simple statements.", "", "Declarative sentence (বিবৃতিমূলক বাক্য): বিবৃতিমূলক বাক্য হলো সাধারণ কোনো কথা জানানো।"],
            ["Examples: She goes. He reads a book.", "ইগজ়াম্পলজ়: শী গোজ়। হী রীডজ় আ বুক।", "উদাহরণ: সে যায়। সে একটি বই পড়ে।"],
            ["Negative form of declarative sentences:", "", "বিবৃতিমূলক বাক্যের না-বোধক রূপ:"],
            ["Auxiliary verb(be/do, does) + not + principal verb.", "", "সাহায্যকারী ক্রিয়া (be/do, does) + not + মূল ক্রিয়া।"],
            ["Examples: He does not read. She is not present.", "ইগজ়াম্পলজ়: হী ডাজ় নট রীড। শী ইজ় নট প্রেজ়ান্ট।", "উদাহরণ: সে পড়ে না। সে উপস্থিত নেই।"],
          ] } }, ubold: ["Declarative Sentences:", "Examples:", "Negative form of declarative sentences:"], ulook: "plain" },
        ] },
        { k: "F", task: ["Read the following declarative sentences in groups and make them negative.", "দলে নিচের বিবৃতিমূলক বাক্যগুলো পড়ো আর এগুলোকে না-বোধক বাক্য বানাও।"], parts: [
          { u8wrap: { items: [
            ["1.", "Anika and Savana are friends.", "আনিকা অ্যান্ড স়াভ়ানা আ ফ়্রেন্ডজ়।", "আনিকা আর সাভানা বন্ধু।"],
            ["2.", "Anika lives in the plain land.", "আনিকা লিভ়জ় ইন দ়া প্লেইন ল্যান্ড।", "আনিকা সমতলে থাকে।"],
            ["3.", "Savana is a hill girl.", "স়াভ়ানা ইজ় আ হিল গাল।", "সাভানা পাহাড়ি মেয়ে।"],
            ["4.", "The hill girl floats flowers in the water.", "দ়া হিল গাল ফ়্লোটস ফ়্লাওয়াজ় ইন দ়া ওয়টা।", "পাহাড়ি মেয়েটি পানিতে ফুল ভাসায়।"],
          ] }, ulook: "flow" },
        ] },
      ],
    },
    {
      page: 122, lesson: 2, dense: true, title: T2,
      blocks: [
        // the book gives no frame to draw in: the picture is drawn on paper and put up in the classroom
        { k: "G", task: ["Draw a picture of any festival, colour it and display it in your classroom.", "যেকোনো একটি উৎসবের ছবি আঁকো, রং করো আর তোমার শ্রেণিকক্ষে টানিয়ে দাও।"] },
        { practise: true },
        { n: 1, task: ["Match the words/phrases in column A with column B to make a sentence. One is done for you.", "A কলামের শব্দ বা শব্দগুচ্ছের সাথে B কলাম মিলিয়ে বাক্য বানাও। একটি করে দেওয়া আছে।"], parts: [
          { u8match: { a: COLS[0], b: COLS[1], aw: 34, small: true,
            left: [["Anika lives", "আনিকা লিভ়জ়", "আনিকা থাকে"], ["I enjoy", "আই ইনজয়", "আমার ভালো লাগে"], ["On Phulbiju day", "অন ফ়ুলবিজু ডেই", "ফুল বিজুর দিনে"], ["On Mulbiju day", "অন মূলবিজু ডেই", "মূল বিজুর দিনে"], ["The house is decorated", "দ়া হাউস় ইজ় ডেকারেইটিড", "বাড়িটি সাজানো"], ["Savana welcomes Anika to her house", "স়াভ়ানা ওয়েলকামজ় আনিকা টু হা হাউস়", "সাভানা আনিকাকে তার বাড়িতে স্বাগত জানায়"]],
            right: [["the festival very much.", "দ়া ফ়েস্টিভ়াল ভ়েরি মাচ।", "উৎসবটি খুব।"], ["hill girls float flowers wishing a happy new year.", "হিল গালজ় ফ়্লোট ফ়্লাওয়াজ় উইশিং আ হ্যাপি নিউ ইয়া।", "পাহাড়ি মেয়েরা নতুন বছরের শুভ কামনা করে ফুল ভাসায়।"], ["in the plain land.", "ইন দ়া প্লেইন ল্যান্ড।", "সমতলে।"], ["spraying water upon her.", "স্প্রেইইং ওয়টা আপন হা।", "তার গায়ে পানি ছিটিয়ে।"], ["with colours and flowers.", "উইদ় কালাজ় অ্যান্ড ফ়্লাওয়াজ়।", "নানা রং আর ফুল দিয়ে।"], ["young boys and girls spray water on each other.", "ইয়াং বয়জ় অ্যান্ড গালজ় স্প্রেই ওয়টা অন ঈচ আদ়া।", "ছেলেমেয়েরা একে অন্যের গায়ে পানি ছিটায়।"]],
            done: [[0, 2]] } },
        ] },
        { n: 2, task: FILL, parts: [
          { u8wrap: { words: [["decorated", "*ডে*·কা·রেই·টিড", "সাজানো"], ["entertains", "এন·টা·*টেইনজ়*", "আপ্যায়ন করে"], ["attend", "আ·*টেন্ড*", "যোগ দেওয়া, যাওয়া"], ["visit", "*ভ়ি*·জ়িট", "বেড়াতে যাওয়া"], ["spray", "স্প্রেই", "ছিটানো"]] }, u8look: "words" },
          { u8wrap: { items: [
            ["a.", "Anika likes to ____________ hill festivals.", "আনিকা লাইকস টু …… হিল ফ়েস্টিভ়ালজ়।", "আনিকা পাহাড়ের উৎসবে …… ভালোবাসে।"],
            ["b.", "So, she goes to the hills to ____________ a friend, Savana.", "স়ো, শী গোজ় টু দ়া হিলজ় টু …… আ ফ়্রেন্ড, স়াভ়ানা।", "তাই সে বন্ধু সাভানার কাছে …… পাহাড়ে যায়।"],
            ["c.", "The house is ____________ with colours and flowers.", "দ়া হাউস় ইজ় …… উইদ় কালাজ় অ্যান্ড ফ়্লাওয়াজ়।", "বাড়িটি নানা রং আর ফুল দিয়ে ……।"],
            ["d.", "Her friend ____________ her with various food items.", "হা ফ়্রেন্ড …… হা উইদ় ভ়েয়ারিয়াস় ফ়ূড আইটামজ়।", "তার বন্ধু নানা রকম খাবার দিয়ে তাকে ……।"],
            ["e.", "Young boys and girls ____________ water on each other to wash away sorrows of life.", "ইয়াং বয়জ় অ্যান্ড গালজ় …… ওয়টা অন ঈচ আদ়া টু ওয়শ আওয়েই স়রোজ় অভ় লাইফ়।", "জীবনের দুঃখ ধুয়ে ফেলতে ছেলেমেয়েরা একে অন্যের গায়ে পানি ……।"],
          ] }, ulook: "flow small", u8look: "lowbox" },
        ] },
      ],
    },
    {
      page: 123, lesson: 2, title: T2,
      blocks: [
        { n: 3, task: ["List the hill festivals and the activities you have read about.", "যে পাহাড়ি উৎসব আর কাজগুলোর কথা পড়েছ, সেগুলোর তালিকা করো।"], parts: [
          { u8wrap: { u8table: { head: [[["Festivals", "*ফ়েস*·টি·ভ়ালজ়", "উৎসবগুলো"], 1], [["Activities", "অ্যাক·*টি*·ভ়া·টিজ়", "কাজকর্ম"], 1]], w: [50, 50], rows: [[" ", " "], [" ", " "], [" ", " "]] } }, u8look: "tall" },
        ] },
        { parts: [
          { gap: 30 },
          { u8head: ["The End", "দ়ি এন্ড", "শেষ"] },
        ] },
      ],
    },
  ],
};
