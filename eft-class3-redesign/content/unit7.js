// English for Today, Class Three (NCTB, 2025 reprint): Unit 7, printed pages 97–108, word for word as printed.
// Every English line the child reads, says or writes is [english, hint, meaning]: the hint is the British English sound
// in Bangla letters (Let's Learn English's British Bangla edition: dotted letters for sounds Bangla doesn't have; plain
// ক, ট, প, which the builder puffs); an instruction is [english, meaning]. Blanks and dots are as printed, and so are the
// book's own slips ("fishes", "the water of glass", "What two things you can do everyday", “Sing a Rainbow“).
// Pictures: art/new/<name>.png, else the old book's in art/stand-in/ (PICTURE-PROMPTS-unit7.md).
// The unit's own kinds (u7rows, u7read, u7match, u7ans, u7jumble, u7wrap, u7head, u7song, u7box) are in
// content/unit7.parts.js; most are Unit 1, 5 and 6's kinds under Unit 7's names.
const READ = ["Read the text.", "লেখাটি পড়ো।"];
const WALKING = ["Shihab and Kaniz are walking to school along the river.", "শিহাব অ্যান্ড কানিজ় আ ওয়কিং টু স্কূল আলং দ়া রিভ়া।", "শিহাব আর কানিজ নদীর পাশ দিয়ে হেঁটে স্কুলে যাচ্ছে।"];
// the rhyme's first and last verse (the same words)
const VERSE = [
  ["Red and yellow and indigo and green", "রেড অ্যান্ড ইয়েলো অ্যান্ড ইন্ডিগো অ্যান্ড গ্রীন", "লাল আর হলুদ আর গাঢ় নীল আর সবুজ"],
  ["Violet and orange and blue", "ভ়াইয়ালাট অ্যান্ড অরিঞ্জ অ্যান্ড ব্লূ", "বেগুনি আর কমলা আর নীল"],
  ["I can sing a rainbow", "আই ক্যান স়িং আ রেইনবো", "আমি রংধনুর গান গাইতে পারি"],
  ["Sing a rainbow", "স়িং আ রেইনবো", "রংধনুর গান গাও"],
  ["Sing a rainbow too.", "স়িং আ রেইনবো টূ।", "তুমিও রংধনুর গান গাও।"],
];
module.exports = {
  unit: 7,
  title: ["Save Our Water", "আমাদের পানি বাঁচাও"],
  pages: [
    // ── Lesson 1: Water pollution ──
    {
      page: 97, lesson: 1, opener: true, title: ["Water pollution", "পানিদূষণ"],
      blocks: [
        { k: "A", task: ["Look and say.", "দেখো আর বলো।"], pic: "u7-l1-river", bubbles: [
          { who: "Shihab", at: [30, 4, 46], tail: "down-left", line: ["Please, don’t throw the rubbish\ninto the river. It pollutes the water.", "প্লীজ়, ডোন্ট থ়্রো দ়া রাবিশ ইনটু দ়া রিভ়া। ইট পালূটস দ়া ওয়টা।", "দয়া করে নদীতে ময়লা ফেলবেন না। এতে পানি দূষিত হয়।"] },
        ] },
        { k: "B", task: ["Read and say.", "পড়ো আর বলো।"], parts: [
          { pics: [
            { name: "u7-w-danger", cap: ["danger", "*ডেইন*·জা", "বিপদ"] },
            { name: "u7-w-river", cap: ["river", "*রি*·ভ়া", "নদী"] },
            { name: "u7-w-bathing-river", cap: ["bathing", "*বেই*·দ়িং", "গোসল করা"] },
            { name: "u7-w-washing-clothes", cap: ["washing clothes", "ওয়শিং ক্লোদ়জ়", "কাপড় ধোয়া"] },
            { name: "u7-w-rubbish", cap: ["rubbish", "*রা*·বিশ", "ময়লা-আবর্জনা"] },
            { name: "u7-w-swimming", cap: ["swimming", "*স়ুই*·মিং", "সাঁতার কাটা"] },
          ], cols: 3, h: 24 },
        ] },
      ],
    },
    {
      page: 98, lesson: 1, title: ["Water pollution", "পানিদূষণ"], dense: true,
      blocks: [
        { k: "C", task: READ, parts: [
          { u7look: { u7read: [[
            WALKING,
            ["At one place, they stop to see something.", "অ্যাট ওয়ান প্লেইস়, দ়েই স্টপ টু স়ী স়ামথ়িং।", "এক জায়গায় তারা কিছু একটা দেখতে থামে।"],
            ["Some people are bathing in the river.", "স়াম পীপল আ বেইদ়িং ইন দ়া রিভ়া।", "কিছু মানুষ নদীতে গোসল করছে।"],
            ["Some are washing their clothes.", "স়াম আ ওয়শিং দ়েয়া ক্লোদ়জ়।", "কেউ কেউ কাপড় ধুচ্ছে।"],
            ["A man throws some rubbish into the river.", "আ ম্যান থ়্রোজ় স়াম রাবিশ ইনটু দ়া রিভ়া।", "একজন লোক নদীতে কিছু ময়লা ছুড়ে ফেলে।"],
            ["Shihab and Kaniz become upset.", "শিহাব অ্যান্ড কানিজ় বিকাম আপস়েট।", "শিহাব আর কানিজের মন খারাপ হয়ে যায়।"],
            ["They request the man, “Please, don’t throw the rubbish into the river.", "দ়েই রিকোয়েস্ট দ়া ম্যান, “প্লীজ়, ডোন্ট থ়্রো দ়া রাবিশ ইনটু দ়া রিভ়া।", "তারা লোকটিকে অনুরোধ করে, “দয়া করে নদীতে ময়লা ফেলবেন না।"],
            ["It pollutes the water.”", "ইট পালূটস দ়া ওয়টা।”", "এতে পানি দূষিত হয়।”"],
          ], [
            ["Shihab and Kaniz also see some polythene bags, plastic bottles and some other things floating on the river.", "শিহাব অ্যান্ড কানিজ় অলস়ো স়ী স়াম পলিথ়ীন ব্যাগজ়, প্ল্যাস্টিক বটলজ় অ্যান্ড স়াম আদ়া থ়িংজ় ফ়্লোটিং অন দ়া রিভ়া।", "শিহাব আর কানিজ আরও দেখে, নদীতে কিছু পলিথিনের ব্যাগ, প্লাস্টিকের বোতল আর অন্য জিনিস ভাসছে।"],
            ["They start talking about it.", "দ়েই স্টাট টকিং আবাউট ইট।", "তারা এটা নিয়ে কথা বলতে শুরু করে।"],
          ]] }, ulook: "flow small" },
          { u7look: { u7dlg: [
            ["Kaniz", "Look, Shihab, the water is so dirty!", "লুক, শিহাব, দ়া ওয়টা ইজ় স়ো ডাটি!", "দেখো শিহাব, পানিটা কী নোংরা!"],
            ["Shihab", "Yes, Kaniz. We can’t bathe in this polluted water.", "ইয়েস়, কানিজ়। উই কান্ট বেইদ় ইন দ়িস় পালূটিড ওয়টা।", "হ্যাঁ কানিজ। এই দূষিত পানিতে আমরা গোসল করতে পারি না।"],
            ["Kaniz", "Fish also can’t swim easily.", "ফ়িশ অলস়ো কান্ট স়ুইম ঈজ়িলি।", "মাছও সহজে সাঁতার কাটতে পারে না।"],
            ["Shihab", "Yes. Sometimes, the fish gets caught into polythene bags. It puts them in danger.", "ইয়েস়। স়ামটাইমজ়, দ়া ফ়িশ গেটস কট ইনটু পলিথ়ীন ব্যাগজ়। ইট পুটস দ়েম ইন ডেইনজা।", "হ্যাঁ। মাঝে মাঝে মাছ পলিথিনের ব্যাগে আটকে যায়। এতে তারা বিপদে পড়ে।"],
            ["Kaniz", "You are right. We should save them.", "ইউ আ রাইট। উই শুড স়েইভ় দ়েম।", "তুমি ঠিক বলেছ। ওদের আমাদের বাঁচানো উচিত।"],
            ["Shihab", "Sure. We must keep the water clean.", "শো। উই মাস্ট কীপ দ়া ওয়টা ক্লীন।", "নিশ্চয়ই। পানি আমাদের পরিষ্কার রাখতেই হবে।"],
          ] }, ulook: "small" },
          { u7look: { text: [
            ["Kaniz and Shihab reach their school and share this story with their friends.", "কানিজ় অ্যান্ড শিহাব রীচ দ়েয়া স্কূল অ্যান্ড শেয়া দ়িস় স্টোরি উইদ় দ়েয়া ফ়্রেন্ডজ়।", "কানিজ আর শিহাব স্কুলে পৌঁছে বন্ধুদের এই ঘটনাটা বলে।"],
            ["They discuss how to keep the water clean and safe.", "দ়েই ডিস্কাস় হাউ টু কীপ দ়া ওয়টা ক্লীন অ্যান্ড স়েইফ়।", "পানি কীভাবে পরিষ্কার আর নিরাপদ রাখা যায়, তা নিয়ে তারা আলোচনা করে।"],
          ] }, ulook: "flow small" },
        ] },
      ],
    },
    {
      page: 99, lesson: 1, title: ["Water pollution", "পানিদূষণ"],
      blocks: [
        { k: "D", task: ["Circle True or False for the sentences below.", "নিচের বাক্যগুলোর জন্য True বা False-এ গোল দাগ দাও।"], parts: [
          { u7rows: [
            ["a)", "Shihab and Kaniz go to the same school.", "শিহাব অ্যান্ড কানিজ় গো টু দ়া স়েইম স্কূল।", "শিহাব আর কানিজ একই স্কুলে যায়।"],
            ["b)", "Shihab stops beside the river.", "শিহাব স্টপস বিস়াইড দ়া রিভ়া।", "শিহাব নদীর পাশে থামে।"],
            ["c)", "Kaniz sees people catching fishes in the river.", "কানিজ় স়ীজ় পীপল ক্যাচিং ফ়িশিজ় ইন দ়া রিভ়া।", "কানিজ দেখে, লোকেরা নদীতে মাছ ধরছে।"],
            ["d)", "Rubbish makes the river water dirty.", "রাবিশ মেইকস দ়া রিভ়া ওয়টা ডাটি।", "ময়লা নদীর পানি নোংরা করে।"],
            ["e)", "Fishes can swim easily in dirty water.", "ফ়িশিজ় ক্যান স়ুইম ঈজ়িলি ইন ডাটি ওয়টা।", "নোংরা পানিতে মাছ সহজে সাঁতার কাটতে পারে।"],
          ], right: "tf" },
        ] },
        { k: "E", task: ["Correct the false sentences from activity D. Write them in your exercise book.", "D-এর মিথ্যা বাক্যগুলো ঠিক করো। সেগুলো তোমার অনুশীলন খাতায় লেখো।"] },
        { k: "F", task: ["Read the text in C again. Ask and answer in pairs.", "C-এর লেখাটি আবার পড়ো। জোড়ায় জোড়ায় প্রশ্ন করো আর উত্তর দাও।"], parts: [
          { items: [
            ["a)", "What do Shihab and Kaniz see in the river?", "ওয়ট ডু শিহাব অ্যান্ড কানিজ় স়ী ইন দ়া রিভ়া?", "শিহাব আর কানিজ নদীতে কী দেখে?"],
            ["b)", "Why do they feel upset?", "ওয়াই ডু দ়েই ফ়ীল আপস়েট?", "তাদের মন খারাপ হয় কেন?"],
            ["c)", "What things do they see floating on the river?", "ওয়ট থ়িংজ় ডু দ়েই স়ী ফ়্লোটিং অন দ়া রিভ়া?", "নদীতে তারা কী কী জিনিস ভাসতে দেখে?"],
            ["d)", "Why is the fish in danger?", "ওয়াই ইজ় দ়া ফ়িশ ইন ডেইনজা?", "মাছ কেন বিপদে আছে?"],
            ["e)", "How is the water polluted?", "হাউ ইজ় দ়া ওয়টা পালূটিড?", "পানি কীভাবে দূষিত হয়?"],
            ["f)", "How can you keep the water clean?", "হাউ ক্যান ইউ কীপ দ়া ওয়টা ক্লীন?", "তুমি কীভাবে পানি পরিষ্কার রাখতে পারো?"],
          ] },
        ] },
        { k: "G", task: ["Write the answers to the questions of activity F in your exercise book.", "F-এর প্রশ্নগুলোর উত্তর তোমার অনুশীলন খাতায় লেখো।"] },
      ],
    },
    {
      page: 100, lesson: 1, dense: true, title: ["Water pollution", "পানিদূষণ"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Match the words of column A with the meaning given in column B.", "A কলামের শব্দগুলোর সাথে B কলামে দেওয়া অর্থ মেলাও।"], parts: [
          { u7match: { under: true, a: ["Column A", "", "কলাম A"], b: ["Column B", "", "কলাম B"],
            left: [["danger", "*ডেইন*·জা", "বিপদ"], ["upset", "আপ·*স়েট*", "মন খারাপ"], ["bath", "বাথ়", "গোসল"], ["rubbish", "*রা*·বিশ", "ময়লা-আবর্জনা"], ["pollute", "পা·*লূট*", "দূষিত করা"]],
            right: [["washing with water", "ওয়শিং উইদ় ওয়টা", "পানি দিয়ে ধোয়া"], ["garbage", "*গা*·বিজ", "আবর্জনা"], ["at risk", "অ্যাট রিস্ক", "বিপদের মুখে"], ["to make something dirty", "টু মেইক স়ামথ়িং ডাটি", "কোনো কিছু নোংরা করা"], ["sad", "স়্যাড", "দুঃখী"]] } },
        ] },
        { n: 2, task: ["Fill in the blanks with the correct words from the box.", "বক্স থেকে ঠিক শব্দগুলো নিয়ে খালি জায়গা পূরণ করো।"], parts: [
          { words: [["request", "রি·*কোয়েস্ট*", "অনুরোধ করা"], ["dirty", "*ডা*·টি", "নোংরা"], ["clean", "ক্লীন", "পরিষ্কার"], ["river", "*রি*·ভ়া", "নদী"], ["rubbish", "*রা*·বিশ", "ময়লা-আবর্জনা"]] },
          { u7look: { text: [
            WALKING,
            ["They see some people are bathing in the ___________ .", "দ়েই স়ী স়াম পীপল আ বেইদ়িং ইন দ়া ____ ।", "তারা দেখে, কিছু মানুষ ____ গোসল করছে।"],
            ["They find a man throwing ___________ into the river and___________ the man not to do that.", "দ়েই ফ়াইন্ড আ ম্যান থ়্রোইং ____ ইনটু দ়া রিভ়া অ্যান্ড ____ দ়া ম্যান নট টু ডু দ়্যাট।", "তারা দেখে, একজন লোক নদীতে ____ ছুড়ে ফেলছে, আর লোকটিকে তা না করতে ____।"],
            ["The river water becomes ___________ .", "দ়া রিভ়া ওয়টা বিকামজ় ____ ।", "নদীর পানি ____ হয়ে যায়।"],
            ["We must keep the water ___________ .", "উই মাস্ট কীপ দ়া ওয়টা ____ ।", "আমাদের পানি ____ রাখতেই হবে।"],
          ] }, ulook: "tight" },
        ] },
      ],
    },
    // ── Lesson 2: Uses of water ──
    {
      page: 101, lesson: 2, title: ["Uses of water", "পানির ব্যবহার"], dense: true,
      blocks: [
        { k: "A", task: ["Look and say.", "দেখো আর বলো।"], parts: [
          { pics: [
            { name: "u7-w-humans", cap: ["humans", "*হিউ*·মানজ়", "মানুষ"] },
            { name: "u7-w-plants", cap: ["plants", "প্লান্টস", "গাছপালা"] },
            { name: "u7-w-rain", cap: ["rain", "রেইন", "বৃষ্টি"] },
            { name: "u7-w-cooking", cap: ["cooking", "*কু*·কিং", "রান্না করা"] },
            { name: "u7-w-bathing", cap: ["bathing", "*বেই*·দ়িং", "গোসল করা"] },
            { name: "u7-w-soil", cap: ["soil", "স়য়েল", "মাটি"] },
            { name: "u7-w-farmer", cap: ["farmer", "*ফ়া*·মা", "কৃষক"] },
            { name: "u7-w-crops", cap: ["crops", "ক্রপস", "ফসল"] },
          ], cols: 8, h: 19 },
        ] },
        { k: "B", task: READ, parts: [
          { u7look: { u7read: [[
            ["Water is called life.", "ওয়টা ইজ় কলড লাইফ়।", "পানিকে বলা হয় জীবন।"],
            ["All humans, animals and plants need water to live.", "অল হিউমানজ়, অ্যানিমালজ় অ্যান্ড প্লান্টস নীড ওয়টা টু লিভ়।", "সব মানুষ, প্রাণী আর গাছপালার বাঁচতে পানি লাগে।"],
            ["Oceans, rivers, rain and ponds are the main sources of water.", "ওশানজ়, রিভ়াজ়, রেইন অ্যান্ড পন্ডজ় আ দ়া মেইন স়স়িজ় অভ় ওয়টা।", "সাগর, নদী, বৃষ্টি আর পুকুর পানির প্রধান উৎস।"],
            ["We need water every day.", "উই নীড ওয়টা এভ়রি ডেই।", "প্রতিদিন আমাদের পানি লাগে।"],
            ["We use water for drinking, cooking, bathing and cleaning.", "উই ইউজ় ওয়টা ফ়া ড্রিংকিং, কুকিং, বেইদ়িং অ্যান্ড ক্লীনিং।", "আমরা পান করা, রান্না, গোসল আর ধোয়ামোছার কাজে পানি ব্যবহার করি।"],
            ["Animals drink water every day.", "অ্যানিমালজ় ড্রিংক ওয়টা এভ়রি ডেই।", "প্রাণীরা প্রতিদিন পানি পান করে।"],
            ["Plants and trees also take water from the soil for their growth.", "প্লান্টস অ্যান্ড ট্রীজ় অলস়ো টেইক ওয়টা ফ়্রম দ়া স়য়েল ফ়া দ়েয়া গ্রোথ়।", "গাছপালাও বেড়ে ওঠার জন্য মাটি থেকে পানি নেয়।"],
            ["The farmers use water to grow crops.", "দ়া ফ়ামাজ় ইউজ় ওয়টা টু গ্রো ক্রপস।", "কৃষকেরা ফসল ফলাতে পানি ব্যবহার করেন।"],
            ["So, we cannot live without water.", "স়ো, উই ক্যানট লিভ় উইদ়াউট ওয়টা।", "তাই পানি ছাড়া আমরা বাঁচতে পারি না।"],
          ], [
            ["Sometimes, we do not get clean water for our everyday use.", "স়ামটাইমজ়, উই ডূ নট গেট ক্লীন ওয়টা ফ়া আওয়া এভ়রিডেই ইউস়।", "মাঝে মাঝে প্রতিদিনের কাজের জন্য আমরা পরিষ্কার পানি পাই না।"],
            ["We pollute the water sources.", "উই পালূট দ়া ওয়টা স়স়িজ়।", "আমরা পানির উৎসগুলো দূষিত করি।"],
            ["It degrades the quality of water.", "ইট ডিগ্রেইডজ় দ়া কুয়লিটি অভ় ওয়টা।", "এতে পানির মান কমে যায়।"],
            ["Polluted water is also dangerous for our life.", "পালূটিড ওয়টা ইজ় অলস়ো ডেইনজারাস় ফ়া আওয়া লাইফ়।", "দূষিত পানি আমাদের জীবনের জন্যও বিপজ্জনক।"],
            ["So, we must save water from pollution.", "স়ো, উই মাস্ট স়েইভ় ওয়টা ফ়্রম পালূশান।", "তাই পানিকে দূষণ থেকে আমাদের বাঁচাতেই হবে।"],
            ["We should not throw any rubbish, plastics, etc. into ponds, rivers and oceans.", "উই শুড নট থ়্রো এনি রাবিশ, প্ল্যাস্টিক্স, এট স়েটরা ইনটু পন্ডজ়, রিভ়াজ় অ্যান্ড ওশানজ়।", "পুকুর, নদী আর সাগরে কোনো ময়লা, প্লাস্টিক ইত্যাদি ফেলা উচিত নয়।"],
            ["We must keep the rubbish in a fixed place.", "উই মাস্ট কীপ দ়া রাবিশ ইন আ ফ়িক্সট প্লেইস়।", "ময়লা আমাদের একটা নির্দিষ্ট জায়গায় রাখতেই হবে।"],
          ]] }, ulook: "flow" },
        ] },
      ],
    },
    {
      page: 102, lesson: 2, title: ["Uses of water", "পানির ব্যবহার"],
      blocks: [
        { k: "C", task: ["Complete the sentences with the right words.", "ঠিক শব্দ দিয়ে বাক্যগুলো পূর্ণ করো।"], parts: [
          { words: [["soil", "স়য়েল", "মাটি"], ["damages", "*ড্যা*·মি·জিজ়", "ক্ষতি করে"], ["life", "লাইফ়", "জীবন"], ["harmful", "*হাম*·ফ়াল", "ক্ষতিকর"], ["water", "*ওয়*·টা", "পানি"]] },
          // the book's blank lines, as boxes to write in
          { items: [
            ["a)", "Water is a part of our ____________ .", "ওয়টা ইজ় আ পাট অভ় আওয়া ____ ।", "পানি আমাদের ____ একটা অংশ।"],
            ["b)", "Animals need ____________ to live.", "অ্যানিমালজ় নীড ____ টু লিভ়।", "প্রাণীদের বাঁচতে ____ লাগে।"],
            ["c)", "Plants take water from the ____________ .", "প্লান্টস টেইক ওয়টা ফ়্রম দ়া ____ ।", "গাছপালা ____ থেকে পানি নেয়।"],
            ["d)", "Pollution ____________ the water quality.", "পালূশান ____ দ়া ওয়টা কুয়লিটি।", "দূষণ পানির মানের ____।"],
            ["e)", "Polluted water is ____________ for our life.", "পালূটিড ওয়টা ইজ় ____ ফ়া আওয়া লাইফ়।", "দূষিত পানি আমাদের জীবনের জন্য ____।"],
          ] },
        ] },
        { k: "D", task: ["Read the text in B again. Ask and answer in pairs.", "B-এর লেখাটি আবার পড়ো। জোড়ায় জোড়ায় প্রশ্ন করো আর উত্তর দাও।"], parts: [
          { items: [
            ["a)", "What are the main sources of water?", "ওয়ট আ দ়া মেইন স়স়িজ় অভ় ওয়টা?", "পানির প্রধান উৎসগুলো কী কী?"],
            ["b)", "What do we do with water in our everyday life?", "ওয়ট ডু উই ডু উইদ় ওয়টা ইন আওয়া এভ়রিডেই লাইফ়?", "প্রতিদিনের জীবনে আমরা পানি দিয়ে কী করি?"],
            ["c)", "Why do trees take water from the soil?", "ওয়াই ডু ট্রীজ় টেইক ওয়টা ফ়্রম দ়া স়য়েল?", "গাছ কেন মাটি থেকে পানি নেয়?"],
            ["d)", "How can you save water from pollution?", "হাউ ক্যান ইউ স়েইভ় ওয়টা ফ়্রম পালূশান?", "তুমি কীভাবে পানিকে দূষণ থেকে বাঁচাতে পারো?"],
            ["e)", "Why should you keep all rubbish in a fixed place?", "ওয়াই শুড ইউ কীপ অল রাবিশ ইন আ ফ়িক্সট প্লেইস়?", "সব ময়লা কেন একটা নির্দিষ্ট জায়গায় রাখা উচিত?"],
          ] },
        ] },
        { k: "E", task: ["Write the answers to the questions of activity D in your exercise book.", "D-এর প্রশ্নগুলোর উত্তর তোমার অনুশীলন খাতায় লেখো।"] },
      ],
    },
    {
      page: 103, lesson: 2, dense: true, title: ["Uses of water", "পানির ব্যবহার"],
      allow: { why: "a stray “L” printed in the book's left margin beside the header, part of no task", missing: ["L"] },
      blocks: [
        { practise: true },
        { n: 1, task: ["Rearrange the letters to make words. Start with the capital letter.", "অক্ষরগুলো সাজিয়ে শব্দ বানাও। বড় হাতের অক্ষর দিয়ে শুরু করো।"], parts: [
          // the letters as printed, a space between them ("Fa" together in the last)
          { u7jumble: [["", "P a l t n"], ["", "i n R a"], ["", "S i o l"], ["", "C o p r"], ["", "r m Fa e r"]] },
        ] },
        { n: 2, task: ["Write True or False for the sentences below:", "নিচের বাক্যগুলোর পাশে True বা False লেখো:"], parts: [
          { u7rows: [
            ["a.", "Water is important for our life.", "ওয়টা ইজ় ইমপটান্ট ফ়া আওয়া লাইফ়।", "পানি আমাদের জীবনের জন্য জরুরি।"],
            ["b.", "Trees and crops are the sources of water.", "ট্রীজ় অ্যান্ড ক্রপস আ দ়া স়স়িজ় অভ় ওয়টা।", "গাছ আর ফসল পানির উৎস।"],
            ["c.", "Plants take water from the soil.", "প্লান্টস টেইক ওয়টা ফ়্রম দ়া স়য়েল।", "গাছপালা মাটি থেকে পানি নেয়।"],
            ["d.", "Pollution increases the water quality.", "পালূশান ইনক্রীস়িজ় দ়া ওয়টা কুয়লিটি।", "দূষণ পানির মান বাড়ায়।"],
            ["e.", "We should throw rubbish at any place.", "উই শুড থ়্রো রাবিশ অ্যাট এনি প্লেইস়।", "আমাদের যেকোনো জায়গায় ময়লা ফেলা উচিত।"],
          ], right: "line", rw: 28, tight: true },
        ] },
        { n: 3, task: ["Make a sentence with each of the following words.", "নিচের প্রতিটি শব্দ দিয়ে একটি করে বাক্য বানাও।"], parts: [
          // the book's long blanks (______), as lines to write a sentence on
          { u7rows: [
            ["a.", "plant", "প্লান্ট", "গাছ; গাছ লাগানো"],
            ["b.", "pond", "পন্ড", "পুকুর"],
            ["c.", "pollution", "পা·*লূ*·শান", "দূষণ"],
            ["d.", "drink", "ড্রিংক", "পান করা"],
            ["e.", "throw", "থ়্রো", "ছুড়ে ফেলা"],
          ], right: "line", rw: 96, inline: true, plain: true },
        ] },
      ],
    },
    // ── Lesson 3: Saving water ──
    {
      page: 104, lesson: 3, title: ["Saving water", "পানি বাঁচানো"], dense: true,
      blocks: [
        { k: "A", task: READ, parts: [
          { text: [
            ["The need for clean water is increasing.", "দ়া নীড ফ়া ক্লীন ওয়টা ইজ় ইনক্রীস়িং।", "পরিষ্কার পানির চাহিদা বাড়ছে।"],
            ["One day, we may not have enough clean water.", "ওয়ান ডেই, উই মেই নট হ্যাভ় ইনাফ় ক্লীন ওয়টা।", "একদিন হয়তো আমাদের যথেষ্ট পরিষ্কার পানি থাকবে না।"],
            ["So, we should start saving water now.", "স়ো, উই শুড স্টাট স়েইভ়িং ওয়টা নাউ।", "তাই এখনই আমাদের পানি বাঁচানো শুরু করা উচিত।"],
            ["Here are some tips to save water in our everyday life.", "হিয়া আ স়াম টিপস টু স়েইভ় ওয়টা ইন আওয়া এভ়রিডেই লাইফ়।", "প্রতিদিনের জীবনে পানি বাঁচানোর কিছু উপায় এখানে দেওয়া হলো।"],
          ] },
          // the six pictures, each with its tip under it (the book lists the tips under the pictures, numbered the same)
          { pics: [
            { name: "u7-l3-brushing", label: "1", cap: ["Turn off the tap when you brush your teeth.", "টান অফ় দ়া ট্যাপ ওয়েন ইউ ব্রাশ ইয়ো টীথ়।", "দাঁত ব্রাশ করার সময় কল বন্ধ রাখো।"] },
            { name: "u7-l3-washing-face", label: "2", cap: ["Turn off the tap after you wash your face.", "টান অফ় দ়া ট্যাপ আফ়টা ইউ ওয়শ ইয়ো ফ়েইস়।", "মুখ ধোয়ার পরে কল বন্ধ করো।"] },
            { name: "u7-l3-soap", label: "3", cap: ["Do not use too much soap to wash your hands.", "ডূ নট ইউজ় টূ মাচ স়োপ টু ওয়শ ইয়ো হ্যান্ডজ়।", "হাত ধুতে বেশি সাবান ব্যবহার কোরো না।"] },
            { name: "u7-l3-bath", label: "4", cap: ["Do not use too much water when you take a bath.", "ডূ নট ইউজ় টূ মাচ ওয়টা ওয়েন ইউ টেইক আ বাথ়।", "গোসলের সময় বেশি পানি খরচ কোরো না।"] },
            { name: "u7-l3-glass", label: "5", cap: ["Drink all the water in the glass.", "ড্রিংক অল দ়া ওয়টা ইন দ়া গ্লাস়।", "গ্লাসের সব পানি খেয়ে নাও।"] },
            { name: "u7-l3-watering", label: "6", cap: ["Do not misuse water while watering the plants in garden.", "ডূ নট মিস়ইউজ় ওয়টা ওয়াইল ওয়টারিং দ়া প্লান্টস ইন গাডান।", "বাগানে গাছে পানি দেওয়ার সময় পানির অপচয় কোরো না।"] },
          ], cols: 3, h: 25 },
          { text: [
            ["We use water in the wash block and toilet at school.", "উই ইউজ় ওয়টা ইন দ়া ওয়শ ব্লক অ্যান্ড টয়লাট অ্যাট স্কূল।", "স্কুলে আমরা হাত-মুখ ধোয়ার জায়গায় আর টয়লেটে পানি ব্যবহার করি।"],
            ["Sometimes, we water the plants in our school garden.", "স়ামটাইমজ়, উই ওয়টা দ়া প্লান্টস ইন আওয়া স্কূল গাডান।", "মাঝে মাঝে আমরা স্কুলের বাগানে গাছে পানি দিই।"],
            ["We must follow these tips when using water.", "উই মাস্ট ফ়লো দ়ীজ় টিপস ওয়েন ইউজ়িং ওয়টা।", "পানি ব্যবহারের সময় এই উপায়গুলো আমাদের মেনে চলতেই হবে।"],
          ] },
        ] },
      ],
    },
    {
      page: 105, lesson: 3, title: ["Saving water", "পানি বাঁচানো"],
      blocks: [
        { k: "B", task: ["Read the text in A again. Tick the best answer.", "A-এর লেখাটি আবার পড়ো। সবচেয়ে ভালো উত্তরে টিক দাও।"], parts: [
          { u7look: { choices: [
            { q: ["1.", "What should you do when you brush your teeth?", "ওয়ট শুড ইউ ডু ওয়েন ইউ ব্রাশ ইয়ো টীথ়?", "দাঁত ব্রাশ করার সময় তোমার কী করা উচিত?"],
              options: [["a)", "brush quickly", "ব্রাশ কুয়িকলি", "তাড়াতাড়ি ব্রাশ করা"], ["b)", "turn off the tap", "টান অফ় দ়া ট্যাপ", "কল বন্ধ করা"], ["c)", "turn on the tap", "টান অন দ়া ট্যাপ", "কল খোলা"]] },
            { q: ["2.", "When you use too much soap to wash your hands, you ...", "ওয়েন ইউ ইউজ় টূ মাচ স়োপ টু ওয়শ ইয়ো হ্যান্ডজ়, ইউ ...", "হাত ধুতে বেশি সাবান ব্যবহার করলে তুমি ..."],
              options: [["a)", "save water", "স়েইভ় ওয়টা", "পানি বাঁচাও"], ["b)", "feel better", "ফ়ীল বেটা", "ভালো বোধ করো"], ["c)", "misuse water", "মিস়ইউজ় ওয়টা", "পানির অপচয় করো"]] },
            { q: ["3.", "When you drink all the water of glass, you ...", "ওয়েন ইউ ড্রিংক অল দ়া ওয়টা অভ় গ্লাস়, ইউ ...", "গ্লাসের সব পানি খেয়ে নিলে তুমি ..."],
              options: [["a)", "waste water", "ওয়েইস্ট ওয়টা", "পানি নষ্ট করো"], ["b)", "help others to drink", "হেল্প আদ়াজ় টু ড্রিংক", "অন্যদের পান করতে সাহায্য করো"], ["c)", "save water", "স়েইভ় ওয়টা", "পানি বাঁচাও"]] },
          ], inline: true }, ulook: "opts3 u7-gap" },
        ] },
        { k: "C", task: ["Read the text in A again. Ask and answer in pairs.", "A-এর লেখাটি আবার পড়ো। জোড়ায় জোড়ায় প্রশ্ন করো আর উত্তর দাও।"], parts: [
          { items: [
            ["a)", "What should we do while we take bath?", "ওয়ট শুড উই ডু ওয়াইল উই টেইক বাথ়?", "গোসল করার সময় আমাদের কী করা উচিত?"],
            ["b)", "Why should we water the plants carefully?", "ওয়াই শুড উই ওয়টা দ়া প্লান্টস কেয়াফ়ালি?", "গাছে কেন সাবধানে পানি দেওয়া উচিত?"],
            ["c)", "How should we use water during school time?", "হাউ শুড উই ইউজ় ওয়টা ডিউয়ারিং স্কূল টাইম?", "স্কুলের সময় আমাদের কীভাবে পানি ব্যবহার করা উচিত?"],
            ["d)", "Why should we follow the tips for using water?", "ওয়াই শুড উই ফ়লো দ়া টিপস ফ়া ইউজ়িং ওয়টা?", "পানি ব্যবহারের উপায়গুলো কেন মেনে চলা উচিত?"],
          ] },
        ] },
        { k: "D", task: ["Write the answers to the questions in activity C in your exercise book.", "C-এর প্রশ্নগুলোর উত্তর তোমার অনুশীলন খাতায় লেখো।"] },
      ],
    },
    {
      page: 106, lesson: 3, title: ["Saving water", "পানি বাঁচানো"],
      blocks: [
        { k: "E", task: ["Write a short paragraph on how you and your family can save water. Use the following questions as clues.", "তুমি আর তোমার পরিবার কীভাবে পানি বাঁচাতে পারো, তা নিয়ে একটি ছোট অনুচ্ছেদ লেখো। নিচের প্রশ্নগুলো সূত্র হিসেবে ব্যবহার করো।"], parts: [
          { items: [
            ["a)", "When do you use water at home?", "ওয়েন ডু ইউ ইউজ় ওয়টা অ্যাট হোম?", "বাড়িতে তুমি কখন পানি ব্যবহার করো?"],
            ["b)", "When do your family members use water?", "ওয়েন ডু ইয়ো ফ়্যামিলি মেম্বাজ় ইউজ় ওয়টা?", "তোমার পরিবারের সদস্যরা কখন পানি ব্যবহার করেন?"],
            ["c)", "What two things you can do everyday to save water?", "ওয়ট টূ থ়িংজ় ইউ ক্যান ডু এভ়রিডেই টু স়েইভ় ওয়টা?", "পানি বাঁচাতে প্রতিদিন তুমি কোন দুটি কাজ করতে পারো?"],
            ["d)", "What would you tell your family members to save water?", "ওয়ট উড ইউ টেল ইয়ো ফ়্যামিলি মেম্বাজ় টু স়েইভ় ওয়টা?", "পানি বাঁচাতে তুমি পরিবারের সদস্যদের কী বলবে?"],
          ] },
          // the book's nine dotted lines to write the paragraph on
          { u7ans: ["", "", "", "", "", "", "", "", ""], h: 15 },
        ] },
      ],
    },
    // ── Lesson 4: Rhyme, "Sing a Rainbow" ──
    {
      page: 107, lesson: 4, title: ["Rhyme", "ছড়া"], dense: true,
      blocks: [
        { parts: [{ u7head: ["Sing a Rainbow", "স়িং আ রেইনবো", "রংধনুর গান গাও"] }] },
        { k: "A", task: ["Look at the picture of rainbow. In pairs, discuss how many colours there are in a rainbow.", "রংধনুর ছবিটি দেখো। জোড়ায় জোড়ায় আলোচনা করো, রংধনুতে কয়টি রং আছে।"] },
        { k: "B", task: ["Now listen to the rhyme below. Underline the name of each colour when you hear it.", "এবার নিচের ছড়াটি শোনো। প্রতিটি রঙের নাম শুনলেই তার নিচে দাগ দাও।"], parts: [
          { u7song: { title: ["Sing a Rainbow", "স়িং আ রেইনবো", "রংধনুর গান গাও"], cols: [
            { stanzas: [
              VERSE,
              [
                ["Listen with your eyes", "লিস়ান উইদ় ইয়ো আইজ়", "চোখ দিয়ে শোনো"],
                ["Listen with your eyes", "লিস়ান উইদ় ইয়ো আইজ়", "চোখ দিয়ে শোনো"],
                ["And sing everything you see", "অ্যান্ড স়িং এভ়রিথ়িং ইউ স়ী", "আর যা কিছু দেখো, সব গানে গাও"],
                ["You can sing a rainbow", "ইউ ক্যান স়িং আ রেইনবো", "তুমি রংধনুর গান গাইতে পারো"],
                ["Sing a rainbow", "স়িং আ রেইনবো", "রংধনুর গান গাও"],
                ["Sing along with me.", "স়িং আলং উইদ় মী।", "আমার সাথে গলা মিলিয়ে গাও।"],
              ],
            ] },
            { stanzas: [VERSE], pic: "u7-l4-rainbow", pos: "50% 60%" },
          ] } },
        ] },
      ],
    },
    {
      page: 108, lesson: 4, title: ["Rhyme", "ছড়া"],
      blocks: [
        { k: "C", task: ["Read aloud the poem first in chorus, then individually.", "কবিতাটি প্রথমে সবাই মিলে একসাথে, তারপর একা একা জোরে পড়ো।"] },
        { k: "D", task: ["Draw a rainbow using all the colours mentioned in the poem.", "কবিতায় যে রংগুলোর নাম আছে, সবগুলো দিয়ে একটি রংধনু আঁকো।"], parts: [
          { u7box: { h: 90 } },
        ] },
        { parts: [
          { u7wrap: { note: { title: ["Grammar focus:", "ব্যাকরণ"], lines: [
            ["“Can” is a modal verb. It is used to express ability.", "“ক্যান” ইজ় আ মোডাল ভ়াব। ইট ইজ় ইউজ়ড টু ইক্সপ্রেস় আবিলিটি।", "“Can” একটি modal verb। কোনো কিছু করতে পারার ক্ষমতা বোঝাতে এটি ব্যবহার হয়।"],
            ["Example: I can sing. I can listen.", "ইগজ়াম্পল: আই ক্যান স়িং। আই ক্যান লিস়ান।", "উদাহরণ: আমি গান গাইতে পারি। আমি শুনতে পারি।"],
            ["Vocabulary:", "ভ়া·*ক্যা*·বিউ·লা·রি", "শব্দভান্ডার"],
            ["red, yellow, indigo, green, violet, orange, blue", "রেড, ইয়েলো, ইন্ডিগো, গ্রীন, ভ়াইয়ালাট, অরিঞ্জ, ব্লূ", "লাল, হলুদ, গাঢ় নীল, সবুজ, বেগুনি, কমলা, নীল"],
          ] } }, ubold: ["Example:", "Vocabulary:"], ulook: "plain" },
          { u7wrap: { lines: [
            ["[Note: “Sing a Rainbow“ is a popular song written by Arthur Hamilton and sung by Peggy Lee in 1955 in the film Pete Kelly’s Blues. Two of the seven colours mentioned in the original song (pink and purple) are not actually colours of the rainbow. In the current version, these two colours are replaced with indigo and violet.]", "", "[টীকা: “Sing a Rainbow” আর্থার হ্যামিলটনের লেখা একটি জনপ্রিয় গান। ১৯৫৫ সালে Pete Kelly’s Blues চলচ্চিত্রে গানটি গেয়েছিলেন পেগি লি। মূল গানের সাতটি রঙের দুটি (গোলাপি আর পার্পল) আসলে রংধনুর রং নয়। এখনকার সংস্করণে এই দুটির বদলে গাঢ় নীল আর বেগুনি দেওয়া হয়েছে।]"],
          ] }, ulook: "plain small" },
        ] },
      ],
    },
  ],
};
