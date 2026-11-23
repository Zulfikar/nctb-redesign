// English for Today, Class Three (NCTB, 2025 reprint): Unit 6, printed pages 83–96, word for word as printed.
// Every English line the child reads, says or writes is [english, hint, meaning]: the hint is the British English sound
// in Bangla letters (Let's Learn English's British Bangla edition: dotted letters for sounds Bangla doesn't have; plain
// ক, ট, প, which the builder puffs); an instruction is [english, meaning]. Blanks and dots are as printed.
// Pictures: art/new/<name>.png, else the old book's in art/stand-in/ (PICTURE-PROMPTS-unit6.md).
// The unit's own kinds (u6rows, u6ans, u6draw, u6table, u6poster) are in content/unit6.parts.js.
module.exports = {
  unit: 6,
  title: ["Cleanliness", "পরিচ্ছন্নতা"],
  pages: [
    // ── Lesson 1: Good habits ──
    {
      page: 83, lesson: 1, opener: true, title: ["Good habits", "ভালো অভ্যাস"],
      blocks: [
        { k: "A", task: ["Look and say.", "দেখো আর বলো।"], parts: [
          { pics: [
            { name: "u6-l1-friends", label: "a" },
            { name: "u6-l1-football", label: "b" },
            { name: "u6-l1-dirty", label: "c" },
            { name: "u6-l1-washing", label: "d" },
          ], h: 37 },
        ] },
        { k: "B", task: ["Read and colour.", "পড়ো আর রং করো।"], parts: [
          { pics: [
            { name: "u6-w-clothes-outline", cap: ["clothes", "ক্লোদ়জ়", "জামাকাপড়"] },
            { name: "u6-w-playing-outline", cap: ["playing", "*প্লেই*·ইং", "খেলা"] },
            { name: "u6-w-shoes-outline", cap: ["shoes", "শূজ়", "জুতা (দুটো)"] },
            { name: "u6-w-fingernails-outline", cap: ["fingernails", "*ফ়িং*·গা·নেইলজ়", "হাতের নখ"] },
            { name: "u6-w-dirt-outline", cap: ["dirt", "ডাট", "ময়লা"] },
            { name: "u6-w-washing-hands-outline", cap: ["washing hands", "ওয়শিং হ্যান্ডজ়", "হাত ধোয়া"] },
            { name: "u6-w-germs-outline", cap: ["germs", "জামজ়", "জীবাণু"] },
            { name: "u6-w-soap-outline", cap: ["soap", "স়োপ", "সাবান"] },
            { name: "u6-w-eyes-outline", cap: ["eyes", "আইজ়", "চোখ (দুটো)"] },
          ], cols: 3, h: 25, outline: true },
        ] },
      ],
    },
    {
      page: 84, lesson: 1, title: ["Good habits", "ভালো অভ্যাস"], dense: true,
      blocks: [
        { k: "C", task: ["Read the text.", "লেখাটি পড়ো।"], parts: [
          { u6read: [[
            ["Little boy Nusair loves to play with his friends.", "লিটল বয় নুস়াইর লাভ়জ় টু প্লেই উইদ় হিজ় ফ়্রেন্ডজ়।", "ছোট্ট ছেলে নুসাইর বন্ধুদের সাথে খেলতে খুব ভালোবাসে।"],
            ["He enjoys playing in the field.", "হী ইনজয়জ় প্লেইং ইন দ়া ফ়ীল্ড।", "মাঠে খেলতে তার খুব মজা লাগে।"],
            ["Sometimes, he comes back home with dirty clothes and shoes.", "স়ামটাইমজ়, হী কামজ় ব্যাক হোম উইদ় ডাটি ক্লোদ়জ় অ্যান্ড শূজ়।", "মাঝে মাঝে সে নোংরা জামাকাপড় আর জুতা নিয়ে বাড়ি ফেরে।"],
          ], [
            ["Nusair’s mother is Jesmin Akter.", "নুস়াইরজ় মাদ়া ইজ় জেস়মিন আক্তার।", "নুসাইরের মায়ের নাম জেসমিন আক্তার।"],
            ["One day she notices some dirt under Nusair’s fingernails.", "ওয়ান ডেই শী নোটিস়িজ় স়াম ডাট আন্ডা নুস়াইরজ় ফ়িংগানেইলজ়।", "একদিন তিনি দেখেন, নুসাইরের নখের নিচে ময়লা।"],
            ["She tells him, “There are germs in the dirt.", "শী টেলজ় হিম, “দ়েয়া আ জামজ় ইন দ়া ডাট।", "তিনি তাকে বলেন, “ময়লার মধ্যে জীবাণু থাকে।"],
            ["Don’t touch your mouth, nose or eyes with dirty hands.", "ডোন্ট টাচ ইয়ো মাউথ়, নোজ় অ আইজ় উইদ় ডাটি হ্যান্ডজ়।", "নোংরা হাতে মুখ, নাক বা চোখ ছুঁয়ো না।"],
            ["Dirt can make you sick.", "ডাট ক্যান মেইক ইউ স়িক।", "ময়লা থেকে অসুখ হতে পারে।"],
            ["So, wash your hands properly to clean the germs.”", "স়ো, ওয়শ ইয়ো হ্যান্ডজ় প্রপালি টু ক্লীন দ়া জামজ়।”", "তাই জীবাণু দূর করতে ভালো করে হাত ধোও।”"],
          ], [
            ["Nusair does not know how to wash his hands properly.", "নুস়াইর ডাজ় নট নো হাউ টু ওয়শ হিজ় হ্যান্ডজ় প্রপালি।", "নুসাইর জানে না, ঠিকমতো হাত কীভাবে ধুতে হয়।"],
            ["His mother shows him how to clean hands with soap and water.", "হিজ় মাদ়া শোজ় হিম হাউ টু ক্লীন হ্যান্ডজ় উইদ় স়োপ অ্যান্ড ওয়টা।", "মা তাকে দেখিয়ে দেন, সাবান আর পানি দিয়ে কীভাবে হাত পরিষ্কার করতে হয়।"],
            ["She then tells Nusair, “Always wash your hands before eating and after playing.”", "শী দ়েন টেলজ় নুস়াইর, “অলওয়েজ় ওয়শ ইয়ো হ্যান্ডজ় বিফ়ো ঈটিং অ্যান্ড আফ়টা প্লেইং।”", "তারপর তিনি নুসাইরকে বলেন, “খাওয়ার আগে আর খেলার পরে সবসময় হাত ধোবে।”"],
            ["From that day Nusair never forgets to wash his hands regularly.", "ফ়্রম দ়্যাট ডেই নুস়াইর নেভ়া ফ়াগেটস টু ওয়শ হিজ় হ্যান্ডজ় রেগিউলালি।", "সেদিন থেকে নুসাইর নিয়মিত হাত ধুতে কখনো ভোলে না।"],
            ["This good habit makes him healthy.", "দ়িস় গুড হ্যাবিট মেইকস হিম হেলথ়ি।", "এই ভালো অভ্যাস তাকে সুস্থ রাখে।"],
          ]] },
        ] },
        { k: "D", task: ["Write the word under each picture.", "প্রতিটি ছবির নিচে শব্দটি লেখো।"], parts: [
          // the book's blank lines under the pictures, as boxes to write in
          { pics: [
            { name: "u6-w-clothes", label: "a", cap: ["____________", "", ""] },
            { name: "u6-w-soap", label: "b", cap: ["____________", "", ""] },
            { name: "u6-w-shoes", label: "c", cap: ["____________", "", ""] },
            { name: "u6-w-hands", label: "d", cap: ["____________", "", ""] },
            { name: "u6-w-dirt", label: "e", cap: ["____________", "", ""] },
            { name: "u6-w-germs", label: "f", cap: ["____________", "", ""] },
          ], cols: 6, h: 17 },
        ] },
      ],
    },
    {
      page: 85, lesson: 1, title: ["Good habits", "ভালো অভ্যাস"], dense: true,
      blocks: [
        { k: "E", task: ["Circle True or False for the sentences below.", "নিচের বাক্যগুলোর জন্য True বা False-এ গোল দাগ দাও।"], parts: [
          { u6rows: [
            ["a)", "Nusair loves to play alone.", "নুস়াইর লাভ়জ় টু প্লেই আলোন।", "নুসাইর একা খেলতে ভালোবাসে।"],
            ["b)", "Nusair notices dirt under his fingernails.", "নুস়াইর নোটিস়িজ় ডাট আন্ডা হিজ় ফ়িংগানেইলজ়।", "নুসাইর তার নখের নিচে ময়লা দেখতে পায়।"],
            ["c)", "Germs are found in dirt.", "জামজ় আ ফ়াউন্ড ইন ডাট।", "ময়লায় জীবাণু পাওয়া যায়।"],
            ["d)", "Nusair was aware of washing hands properly.", "নুস়াইর ওয়জ় আওয়েয়া অভ় ওয়শিং হ্যান্ডজ় প্রপালি।", "নুসাইর ঠিকমতো হাত ধোয়ার নিয়ম জানত।"],
            ["e)", "Nusair follows what his mother says.", "নুস়াইর ফ়লোজ় ওয়ট হিজ় মাদ়া স়েজ়।", "নুসাইর মায়ের কথা মেনে চলে।"],
          ], right: "tf" },
        ] },
        { k: "F", task: ["Look and read.", "দেখো আর পড়ো।"], parts: [
          { u6table: {
            head: [[["Singular", "*স়িং*·গিউ·লা", "একবচন"], 2], [["Plural", "*প্লুয়া*·রাল", "বহুবচন"], 2]],
            w: [25, 25, 25, 25], ph: 13,
            rows: [
              [["cloth", "ক্লথ়", "কাপড় (একটা)"], { pic: "u6-w-cloth" }, ["clothes", "ক্লোদ়জ়", "জামাকাপড়"], { pic: "u6-w-clothes" }],
              [["shoe", "শূ", "জুতা (একটা)"], { pic: "u6-w-shoe" }, ["shoes", "শূজ়", "জুতা (দুটো)"], { pic: "u6-w-shoes" }],
              [["eye", "আই", "চোখ (একটা)"], { pic: "u6-w-eye" }, ["eyes", "আইজ়", "চোখ (দুটো)"], { pic: "u6-w-eyes" }],
              [["hand", "হ্যান্ড", "হাত (একটা)"], { pic: "u6-w-hand" }, ["hands", "হ্যান্ডজ়", "হাত (দুটো)"], { pic: "u6-w-hands" }],
            ] } },
          // the book prints the letters in red; here they are underlined
          { note: { title: ["Grammar focus:", "ব্যাকরণ"], lines: [
            ["To make plurals, we usually add _s_ to the end of a word.", "টু মেইক প্লুয়ারালজ়, উই ইউজ়ুয়ালি অ্যাড এস় টু দ়ি এন্ড অভ় আ ওয়াড।", "বহুবচন বানাতে সাধারণত শব্দের শেষে s যোগ করি।"],
            ["For words ending in _ch_, _sh_, _x_ or _z_, add _es_.", "ফ়া ওয়াডজ় এন্ডিং ইন স়ী-এইচ, এস়-এইচ, এক্স অ জ়েড, অ্যাড ঈ-এস়।", "শব্দের শেষে ch, sh, x বা z থাকলে es যোগ করো।"],
            ["For words ending in _y_, change the _y_ to _i_ and add _es_.", "ফ়া ওয়াডজ় এন্ডিং ইন ওয়াই, চেইঞ্জ দ়া ওয়াই টু আই অ্যান্ড অ্যাড ঈ-এস়।", "শব্দের শেষে y থাকলে y বদলে i করো, তারপর es যোগ করো।"],
          ] } },
        ] },
      ],
    },
    {
      page: 86, lesson: 1, title: ["Good habits", "ভালো অভ্যাস"],
      blocks: [
        { k: "G", task: ["Write and say the plural forms for each word.", "প্রতিটি শব্দের বহুবচন লেখো আর বলো।"], parts: [
          { lines: [
            ["apple …………..", "*অ্যা*·পল", "আপেল"],
            ["door …………….", "ডো", "দরজা"],
            ["book …………..", "বুক", "বই"],
            ["baby …………….", "*বেই*·বি", "শিশু"],
            ["box …………….", "বক্স", "বাক্স"],
            ["fish ……………..", "ফ়িশ", "মাছ"],
            ["bench ………….", "বেঞ্চ", "বেঞ্চ"],
            ["plate ………….", "প্লেইট", "প্লেট"],
          ], cols: 2 },
        ] },
        { k: "H", task: ["Read the text in activity C again. Ask and answer in pairs.", "C-এর লেখাটি আবার পড়ো। জোড়ায় জোড়ায় প্রশ্ন করো আর উত্তর দাও।"], parts: [
          { items: [
            ["a)", "Who loves to play with friends?", "হূ লাভ়জ় টু প্লেই উইদ় ফ়্রেন্ডজ়?", "কে বন্ধুদের সাথে খেলতে ভালোবাসে?"],
            ["b)", "How does Nusair look when he comes back home?", "হাউ ডাজ় নুস়াইর লুক ওয়েন হী কামজ় ব্যাক হোম?", "বাড়ি ফেরার সময় নুসাইরকে কেমন দেখায়?"],
            ["c)", "Who notices dirt under Nusair’s fingernails?", "হূ নোটিস়িজ় ডাট আন্ডা নুস়াইরজ় ফ়িংগানেইলজ়?", "নুসাইরের নখের নিচে ময়লা কে দেখেন?"],
            ["d)", "What can make us sick?", "ওয়ট ক্যান মেইক আস় স়িক?", "কিসে আমাদের অসুখ হতে পারে?"],
            ["e)", "Why do we need to wash hands properly?", "ওয়াই ডু উই নীড টু ওয়শ হ্যান্ডজ় প্রপালি?", "ঠিকমতো হাত ধোয়া কেন দরকার?"],
            ["f)", "What should we use to wash hands?", "ওয়ট শুড উই ইউজ় টু ওয়শ হ্যান্ডজ়?", "হাত ধুতে আমাদের কী ব্যবহার করা উচিত?"],
            ["g)", "What advice does Jesmin Akter give to Nusair?", "ওয়ট আডভ়াইস় ডাজ় জেস়মিন আক্তার গিভ় টু নুস়াইর?", "জেসমিন আক্তার নুসাইরকে কী উপদেশ দেন?"],
            ["h)", "What habit makes Nusair healthy?", "ওয়ট হ্যাবিট মেইকস নুস়াইর হেলথ়ি?", "কোন অভ্যাস নুসাইরকে সুস্থ রাখে?"],
          ] },
        ] },
      ],
    },
    {
      page: 87, lesson: 1, title: ["Good habits", "ভালো অভ্যাস"],
      blocks: [
        { k: "I", task: ["Write the answers to the questions given in activity H.", "H-এর প্রশ্নগুলোর উত্তর লেখো।"], parts: [
          { u6ans: ["a)", "b)", "c)", "d)", "e)", "f)", "g)", "h)"], h: 21 },
        ] },
      ],
    },
    {
      page: 88, lesson: 1, title: ["Good habits", "ভালো অভ্যাস"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Rearrange the letters to make meaningful words. Start with the capital letter.", "অক্ষরগুলো সাজিয়ে অর্থপূর্ণ শব্দ বানাও। বড় হাতের অক্ষর দিয়ে শুরু করো।"], parts: [
          { u6rows: [["", "Seho"], ["", "rDti"], ["", "Hnad"], ["", "pSao"], ["", "eEy"], ["", "otClh"]], right: "line", spaced: true },
        ] },
        { n: 2, task: ["Match column A with column B.", "A কলামের সাথে B কলাম মেলাও।"], parts: [
          { u6match: { under: true, a: ["Column A", "", "কলাম A"], b: ["Column B", "", "কলাম B"],
            left: [["enjoy", "ইন·*জয়*", "উপভোগ করা"], ["dirty", "*ডা*·টি", "নোংরা"], ["germ", "জাম", "জীবাণু"], ["finger", "*ফ়িং*·গা", "আঙুল"], ["wash", "ওয়শ", "ধোয়া"]],
            right: [["not clean", "নট ক্লীন", "পরিষ্কার নয়"], ["clean with water", "ক্লীন উইদ় ওয়টা", "পানি দিয়ে পরিষ্কার করা"], ["to like something", "টু লাইক স়ামথ়িং", "কোনো কিছু ভালো লাগা"], ["virus", "*ভ়াই*·রাস়", "ভাইরাস"], ["parts of the body", "পাটস অভ় দ়া বডি", "শরীরের অংশ"]] } },
        ] },
      ],
    },
    // ── Lesson 2: Steps of washing hands ──
    {
      page: 89, lesson: 2, title: ["Steps of washing hands", "হাত ধোয়ার ধাপ"], dense: true,
      blocks: [
        { k: "A", task: ["Look and say.", "দেখো আর বলো।"], parts: [
          { pics: [
            { name: "u6-w-water", cap: ["water", "*ওয়*·টা", "পানি"] },
            { name: "u6-w-soap", cap: ["soap", "স়োপ", "সাবান"] },
            { name: "u6-w-tap", cap: ["tap", "ট্যাপ", "কল"] },
            { name: "u6-w-towel", cap: ["towel", "*টাউ*·য়াল", "তোয়ালে"] },
          ], h: 19 },
        ] },
        { k: "B", task: ["Read and say.", "পড়ো আর বলো।"], parts: [
          { text: [
            ["Dirty hands can spread germs.", "ডাটি হ্যান্ডজ় ক্যান স্প্রেড জামজ়।", "নোংরা হাত জীবাণু ছড়াতে পারে।"],
            ["So, washing hands is important.", "স়ো, ওয়শিং হ্যান্ডজ় ইজ় ইমপটান্ট।", "তাই হাত ধোয়া জরুরি।"],
            ["It is the best way to prevent germs.", "ইট ইজ় দ়া বেস্ট ওয়েই টু প্রিভ়েন্ট জামজ়।", "জীবাণু ঠেকানোর এটাই সবচেয়ে ভালো উপায়।"],
          ] },
          { lines: [["Follow the steps to wash your hands properly.", "ফ়লো দ়া স্টেপস টু ওয়শ ইয়ো হ্যান্ডজ় প্রপালি।", "ঠিকমতো হাত ধুতে ধাপগুলো মেনে চলো।"]] },
          // the eight steps, each with its picture (the step's number on the picture)
          { pics: [
            { name: "u6-l2-step1", label: "1", cap: ["Open the tap. Wet your hands with clean water.", "ওপান দ়া ট্যাপ। ওয়েট ইয়ো হ্যান্ডজ় উইদ় ক্লীন ওয়টা।", "কল খোলো। পরিষ্কার পানি দিয়ে হাত ভেজাও।"] },
            { name: "u6-l2-step2", label: "2", cap: ["Turn the tap off.", "টান দ়া ট্যাপ অফ়।", "কল বন্ধ করো।"] },
            { name: "u6-l2-step3", label: "3", cap: ["Apply soap on your hands.", "আপ্লাই স়োপ অন ইয়ো হ্যান্ডজ়।", "হাতে সাবান লাগাও।"] },
            { name: "u6-l2-step4", label: "4", cap: ["Rub your hands for at least 20 seconds.", "রাব ইয়ো হ্যান্ডজ় ফ়া অ্যাট লীস্ট টুয়েন্টি স়েকান্ডজ়।", "অন্তত ২০ সেকেন্ড ধরে হাত ঘষো।"] },
            { name: "u6-l2-step5", label: "5", cap: ["Clean the back of your hands, fingers and under the nails.", "ক্লীন দ়া ব্যাক অভ় ইয়ো হ্যান্ডজ়, ফ়িংগাজ় অ্যান্ড আন্ডা দ়া নেইলজ়।", "হাতের পিঠ, আঙুল আর নখের নিচ পরিষ্কার করো।"] },
            { name: "u6-l2-step6", label: "6", cap: ["Open the tap. Rinse your hands well with clean water.", "ওপান দ়া ট্যাপ। রিন্স ইয়ো হ্যান্ডজ় ওয়েল উইদ় ক্লীন ওয়টা।", "কল খোলো। পরিষ্কার পানি দিয়ে হাত ভালো করে ধুয়ে ফেলো।"] },
            { name: "u6-l2-step7", label: "7", cap: ["Turn the tap off again.", "টান দ়া ট্যাপ অফ় আগেন।", "আবার কল বন্ধ করো।"] },
            { name: "u6-l2-step8", label: "8", cap: ["Wipe your hands with a clean towel.", "ওয়াইপ ইয়ো হ্যান্ডজ় উইদ় আ ক্লীন টাউয়াল।", "পরিষ্কার তোয়ালে দিয়ে হাত মোছো।"] },
          ], cols: 4, h: 18 },
        ] },
      ],
    },
    {
      page: 90, lesson: 2, title: ["Steps of washing hands", "হাত ধোয়ার ধাপ"], dense: true,
      blocks: [
        { k: "C", task: ["Look at the steps of washing hands. Put the steps in order. Number them from 1 to 6.", "হাত ধোয়ার ধাপগুলো দেখো। ধাপগুলো ঠিক ক্রমে সাজাও। ১ থেকে ৬ পর্যন্ত নম্বর দাও।"], parts: [
          { table: { w: [12, 88], rows: [
            ["_", ["Rinse your hands with clean water.", "রিন্স ইয়ো হ্যান্ডজ় উইদ় ক্লীন ওয়টা।", "পরিষ্কার পানি দিয়ে হাত ধুয়ে ফেলো।"]],
            ["_", ["Rub your hands for at least 20 seconds.", "রাব ইয়ো হ্যান্ডজ় ফ়া অ্যাট লীস্ট টুয়েন্টি স়েকান্ডজ়।", "অন্তত ২০ সেকেন্ড ধরে হাত ঘষো।"]],
            ["_", ["Put soap on your hands.", "পুট স়োপ অন ইয়ো হ্যান্ডজ়।", "হাতে সাবান লাগাও।"]],
            ["_", ["Open the tap. Wet your hands with clean water. Turn the tap off.", "ওপান দ়া ট্যাপ। ওয়েট ইয়ো হ্যান্ডজ় উইদ় ক্লীন ওয়টা। টান দ়া ট্যাপ অফ়।", "কল খোলো। পরিষ্কার পানি দিয়ে হাত ভেজাও। কল বন্ধ করো।"]],
            ["_", ["Wipe your hands with a clean towel.", "ওয়াইপ ইয়ো হ্যান্ডজ় উইদ় আ ক্লীন টাউয়াল।", "পরিষ্কার তোয়ালে দিয়ে হাত মোছো।"]],
            ["_", ["Rub the back of your hands, between fingers and under the nails.", "রাব দ়া ব্যাক অভ় ইয়ো হ্যান্ডজ়, বিটুঈন ফ়িংগাজ় অ্যান্ড আন্ডা দ়া নেইলজ়।", "হাতের পিঠ, আঙুলের ফাঁক আর নখের নিচ ঘষো।"]],
          ] } },
        ] },
        { k: "D", task: ["Complete the sentences. Use the right words from the box.", "বাক্যগুলো পূর্ণ করো। বক্স থেকে ঠিক শব্দগুলো বেছে নাও।"], parts: [
          { words: [["turn", "টান", "ঘোরানো"], ["rinse", "রিন্স", "ধুয়ে ফেলা"], ["use", "ইউজ়", "ব্যবহার করা"], ["wash", "ওয়শ", "ধোয়া"], ["wipe", "ওয়াইপ", "মোছা"], ["rub", "রাব", "ঘষা"]] },
          { items: [
            ["a)", "…………….your hands for at least 20 seconds.", "____ ইয়ো হ্যান্ডজ় ফ়া অ্যাট লীস্ট টুয়েন্টি স়েকান্ডজ়।", "অন্তত ২০ সেকেন্ড ধরে হাত ____।"],
            ["b)", "……………. soap on your hands.", "____ স়োপ অন ইয়ো হ্যান্ডজ়।", "হাতে সাবান ____।"],
            ["c)", "……………. your hands with the soap.", "____ ইয়ো হ্যান্ডজ় উইদ় দ়া স়োপ।", "সাবান দিয়ে হাত ____।"],
            ["d)", "……………. your hands with clean water.", "____ ইয়ো হ্যান্ডজ় উইদ় ক্লীন ওয়টা।", "পরিষ্কার পানি দিয়ে হাত ____।"],
            ["e)", "…………….the tap off.", "____ দ়া ট্যাপ অফ়।", "কলটা ____ বন্ধ করো।"],
            ["f)", "……………. your hands with a clean towel.", "____ ইয়ো হ্যান্ডজ় উইদ় আ ক্লীন টাউয়াল।", "পরিষ্কার তোয়ালে দিয়ে হাত ____।"],
          ] },
        ] },
      ],
    },
    {
      page: 91, lesson: 2, title: ["Steps of washing hands", "হাত ধোয়ার ধাপ"],
      blocks: [
        { k: "E", task: ["Draw and write.", "আঁকো আর লেখো।"], parts: [
          { lines: [
            ["Washing hands helps you to be healthy.", "ওয়শিং হ্যান্ডজ় হেল্পস ইউ টু বী হেলথ়ি।", "হাত ধোয়া তোমাকে সুস্থ থাকতে সাহায্য করে।"],
            ["What other things can you do to be healthy?", "ওয়ট আদ়া থ়িংজ় ক্যান ইউ ডু টু বী হেলথ়ি?", "সুস্থ থাকতে তুমি আর কী কী করতে পারো?"],
            ["Draw a picture and write about them.", "ড্র আ পিকচা অ্যান্ড রাইট আবাউট দ়েম।", "একটা ছবি আঁকো আর সেগুলো নিয়ে লেখো।"],
            ["Example: Physical exercise.", "ইগজ়াম্পল: ফ়িজ়িকাল এক্সাস়াইজ়।", "উদাহরণ: শরীরচর্চা।"],
          ] },
          { u6draw: { side: 7, below: 5 } },
        ] },
        { k: "F", task: ["Let’s wash our hands in the wash block following the steps given in activity B.", "চলো, B-এর ধাপগুলো মেনে স্কুলের হাত ধোয়ার জায়গায় গিয়ে হাত ধুই।"] },
      ],
    },
    {
      page: 92, lesson: 2, title: ["Steps of washing hands", "হাত ধোয়ার ধাপ"], dense: true,
      blocks: [
        { practise: true },
        { n: 1, task: ["Write True or False for the sentences below.", "নিচের বাক্যগুলোর পাশে True বা False লেখো।"], parts: [
          { u6rows: [
            ["a.", "Dirt spread germs.", "ডাট স্প্রেড জামজ়।", "ময়লা জীবাণু ছড়ায়।"],
            ["b.", "Washing hands cannot prevent germs.", "ওয়শিং হ্যান্ডজ় ক্যানট প্রিভ়েন্ট জামজ়।", "হাত ধুলে জীবাণু ঠেকানো যায় না।"],
            ["c.", "Open the tap first to wet your hands.", "ওপান দ়া ট্যাপ ফ়াস্ট টু ওয়েট ইয়ো হ্যান্ডজ়।", "হাত ভেজাতে আগে কল খোলো।"],
            ["d.", "Turn the tap off while rubbing your hands.", "টান দ়া ট্যাপ অফ় ওয়াইল রাবিং ইয়ো হ্যান্ডজ়।", "হাত ঘষার সময় কল বন্ধ রাখো।"],
            ["e.", "Cleaning the back of the hands is not important.", "ক্লীনিং দ়া ব্যাক অভ় দ়া হ্যান্ডজ় ইজ় নট ইমপটান্ট।", "হাতের পিঠ পরিষ্কার করা জরুরি নয়।"],
          ], right: "line", rw: 28, tight: true },
        ] },
        { n: 2, task: ["Make a sentence with each of the following words.", "নিচের প্রতিটি শব্দ দিয়ে একটি করে বাক্য বানাও।"], parts: [
          // the book's long blanks (______), as lines to write a sentence on
          { u6rows: [
            ["a.", "water", "*ওয়*·টা", "পানি"],
            ["b.", "soap", "স়োপ", "সাবান"],
            ["c.", "tap", "ট্যাপ", "কল"],
            ["d.", "towel", "*টাউ*·য়াল", "তোয়ালে"],
            ["e.", "dry", "ড্রাই", "শুকনো; শুকানো"],
          ], right: "line", rw: 112, inline: true, plain: true },
        ] },
        { n: 3, task: ["Answer the following questions.", "নিচের প্রশ্নগুলোর উত্তর দাও।"], parts: [
          { items: [
            ["a.", "How can we prevent germs?", "হাউ ক্যান উই প্রিভ়েন্ট জামজ়?", "আমরা কীভাবে জীবাণু ঠেকাতে পারি?"],
            ["b.", "Which things do you need to wash hands?", "উইচ থ়িংজ় ডু ইউ নীড টু ওয়শ হ্যান্ডজ়?", "হাত ধুতে তোমার কী কী জিনিস লাগে?"],
            ["c.", "Which parts of your hands do you need to clean?", "উইচ পাটস অভ় ইয়ো হ্যান্ডজ় ডু ইউ নীড টু ক্লীন?", "হাতের কোন কোন অংশ পরিষ্কার করতে হয়?"],
            ["d.", "How do you dry your hands?", "হাউ ডু ইউ ড্রাই ইয়ো হ্যান্ডজ়?", "তুমি কীভাবে হাত শুকাও?"],
          ] },
        ] },
      ],
    },
    // ── Lesson 3: When to wash our hands ──
    {
      page: 93, lesson: 3, title: ["When to wash our hands", "কখন হাত ধোব"],
      blocks: [
        { k: "A", task: ["Look at the pictures. Match them with the phrases. One is done for you.", "ছবিগুলো দেখো। কথাগুলোর সাথে মেলাও। একটি করে দেওয়া আছে।"], parts: [
          { u6match: { under: true, ph: 30,
            left: [{ pic: "u6-l3-using-toilet" }, { pic: "u6-l3-touching-garbage" }, { pic: "u6-l3-eating-food" }, { pic: "u6-l3-touching-wound" }, { pic: "u6-l3-sneezing" }],
            right: [["eating food", "ঈটিং ফ়ূড", "খাবার খাওয়া"], ["touching a wound", "টাচিং আ ঊন্ড", "ক্ষত ছোঁয়া"], ["using a toilet", "ইউজ়িং আ টয়লাট", "টয়লেট ব্যবহার করা"], ["sneezing", "*স্নী*·জ়িং", "হাঁচি দেওয়া"], ["touching garbage", "টাচিং গাবিজ", "ময়লা-আবর্জনা ছোঁয়া"]],
            done: [[0, 2]] } },
        ] },
      ],
    },
    {
      page: 94, lesson: 3, title: ["When to wash our hands", "কখন হাত ধোব"],
      blocks: [
        { k: "B", task: ["Read and say.", "পড়ো আর বলো।"], parts: [
          { text: [
            ["Washing hands is a good habit.", "ওয়শিং হ্যান্ডজ় ইজ় আ গুড হ্যাবিট।", "হাত ধোয়া একটা ভালো অভ্যাস।"],
            ["Read about when we should wash hands:", "রীড আবাউট ওয়েন উই শুড ওয়শ হ্যান্ডজ়:", "কখন হাত ধোয়া উচিত, পড়ো:"],
          ] },
          { pics: [
            { name: "u6-l3-eating-food", cap: ["• before and after eating food", "বিফ়ো অ্যান্ড আফ়টা ঈটিং ফ়ূড", "খাবার খাওয়ার আগে ও পরে"] },
            { name: "u6-l3-touching-face", cap: ["• before and after touching the nose, the mouth and the eyes", "বিফ়ো অ্যান্ড আফ়টা টাচিং দ়া নোজ়, দ়া মাউথ় অ্যান্ড দ়ি আইজ়", "নাক, মুখ আর চোখ ছোঁয়ার আগে ও পরে"] },
            { name: "u6-l3-touching-wound", cap: ["• before and after touching a wound", "বিফ়ো অ্যান্ড আফ়টা টাচিং আ ঊন্ড", "ক্ষত ছোঁয়ার আগে ও পরে"] },
            { name: "u6-l3-using-toilet", cap: ["• after using the toilet", "আফ়টা ইউজ়িং দ়া টয়লাট", "টয়লেট ব্যবহারের পরে"] },
            { name: "u6-l3-sneezing", cap: ["• after coughing or sneezing", "আফ়টা কফ়িং অ স্নীজ়িং", "কাশি বা হাঁচি দেওয়ার পরে"] },
            { name: "u6-l3-touching-pet", cap: ["• after touching a pet or an animal", "আফ়টা টাচিং আ পেট অ অ্যান অ্যানিমাল", "পোষা প্রাণী বা অন্য প্রাণী ছোঁয়ার পরে"] },
            { name: "u6-l3-playing-outside", cap: ["• after playing outside", "আফ়টা প্লেইং আউটস়াইড", "বাইরে খেলার পরে"] },
            { name: "u6-l3-touching-garbage", cap: ["• after touching garbage", "আফ়টা টাচিং গাবিজ", "ময়লা-আবর্জনা ছোঁয়ার পরে"] },
          ], cols: 4, h: 30 },
          { lines: [["Wash your hands during these times to stay healthy.", "ওয়শ ইয়ো হ্যান্ডজ় ডিউয়ারিং দ়ীজ় টাইমজ় টু স্টেই হেলথ়ি।", "সুস্থ থাকতে এই সময়গুলোতে হাত ধোও।"]], style: "read" },
        ] },
      ],
    },
    {
      page: 95, lesson: 3, title: ["When to wash our hands", "কখন হাত ধোব"],
      blocks: [
        { k: "C", task: ["Pairwork: Look at the pictures. Say when you should wash your hands. One is done for you.", "জোড়ায় কাজ: ছবিগুলো দেখো। কখন হাত ধোয়া উচিত, বলো। একটি করে দেওয়া আছে।"], parts: [
          // the book's two blank lines under each picture, as two boxes to write in
          { pics: [
            { name: "u6-l3-using-toilet", cap: ["We should wash our hands after using toilet.", "উই শুড ওয়শ আওয়া হ্যান্ডজ় আফ়টা ইউজ়িং টয়লাট।", "টয়লেট ব্যবহারের পরে আমাদের হাত ধোয়া উচিত।"] },
            { name: "u6-l3-eating-food", cap: ["_______________________\n_______________________", "", ""] },
            { name: "u6-l3-playing-outside", cap: ["_______________________\n_______________________", "", ""] },
            { name: "u6-l3-touching-wound", cap: ["_______________________\n_______________________", "", ""] },
            { name: "u6-l3-touching-garbage", cap: ["_______________________\n_______________________", "", ""] },
            { name: "u6-l3-touching-pet", cap: ["_______________________\n_______________________", "", ""] },
          ], cols: 3, h: 28 },
        ] },
        { k: "D", task: ["Now, list the activities in the right column. One is done for you.", "এবার কাজগুলো ঠিক কলামে লেখো। একটি করে দেওয়া আছে।"], parts: [
          { u6table: {
            title: ["Washing hands", "ওয়শিং হ্যান্ডজ়", "হাত ধোয়া"],
            head: [[["Before", "বি·*ফ়ো*", "আগে"], 1], [["After", "*আফ়*·টা", "পরে"], 1]],
            w: [50, 50],
            rows: [[["• eating food", "ঈটিং ফ়ূড", "খাবার খাওয়া"], " "], [" ", " "], [" ", " "], [" ", " "]] } },
        ] },
      ],
    },
    {
      page: 96, lesson: 3, title: ["When to wash our hands", "কখন হাত ধোব"], dense: true,
      blocks: [
        { k: "E", task: ["Read the text in B again. Ask and answer in pairs.", "B-এর লেখাটি আবার পড়ো। জোড়ায় জোড়ায় প্রশ্ন করো আর উত্তর দাও।"], parts: [
          { items: [
            ["1.", "How do you wash your hands?", "হাউ ডু ইউ ওয়শ ইয়ো হ্যান্ডজ়?", "তুমি কীভাবে হাত ধোও?"],
            ["2.", "Why should you wash your hands?", "ওয়াই শুড ইউ ওয়শ ইয়ো হ্যান্ডজ়?", "তোমার কেন হাত ধোয়া উচিত?"],
            ["3.", "When should you wash your hands?", "ওয়েন শুড ইউ ওয়শ ইয়ো হ্যান্ডজ়?", "তোমার কখন হাত ধোয়া উচিত?"],
          ] },
        ] },
        { k: "F", task: ["Make a poster to instruct others about washing hands properly. Use the following clues to write about it.", "ঠিকমতো হাত ধোয়ার নিয়ম সবাইকে জানাতে একটা পোস্টার বানাও। নিচের সূত্রগুলো ধরে লেখো।"], parts: [
          { u6poster: [
            ["•", "Use clean water and …", "ইউজ় ক্লীন ওয়টা অ্যান্ড …", "পরিষ্কার পানি আর … ব্যবহার করো"],
            ["•", "Rub your hands …", "রাব ইয়ো হ্যান্ডজ় …", "হাত ঘষো …"],
            ["•", "Wipe your hands …", "ওয়াইপ ইয়ো হ্যান্ডজ় …", "হাত মোছো …"],
            ["•", "Wash hands before …", "ওয়শ হ্যান্ডজ় বিফ়ো …", "… আগে হাত ধোও"],
            ["•", "Wash hands after …", "ওয়শ হ্যান্ডজ় আফ়টা …", "… পরে হাত ধোও"],
          ], cols: 2 },
        ] },
        { practise: true },
        { n: 1, task: ["Fill in the blanks with the correct word from the box.", "বক্স থেকে ঠিক শব্দটি নিয়ে খালি জায়গা পূরণ করো।"], parts: [
          { words: [["food", "ফ়ূড", "খাবার"], ["animal", "*অ্যা*·নি·মাল", "প্রাণী"], ["habit", "*হ্যা*·বিট", "অভ্যাস"], ["healthy", "*হেল*·থ়ি", "সুস্থ"], ["toilet", "*টয়*·লাট", "টয়লেট"]] },
          { text: [
            ["Washing hands is a good __________________ .", "ওয়শিং হ্যান্ডজ় ইজ় আ গুড ____ ।", "হাত ধোয়া একটা ভালো ____ ।"],
            ["You should wash hands before and after eating _______________ .", "ইউ শুড ওয়শ হ্যান্ডজ় বিফ়ো অ্যান্ড আফ়টা ঈটিং ____ ।", "____ খাওয়ার আগে ও পরে হাত ধোয়া উচিত।"],
            ["Do not forget to wash your hands after using the _____________.", "ডূ নট ফ়াগেট টু ওয়শ ইয়ো হ্যান্ডজ় আফ়টা ইউজ়িং দ়া ____।", "____ ব্যবহারের পরে হাত ধুতে ভুলো না।"],
            ["You must wash your hands after touching an _________________.", "ইউ মাস্ট ওয়শ ইয়ো হ্যান্ডজ় আফ়টা টাচিং অ্যান ____।", "কোনো ____ ছোঁয়ার পরে অবশ্যই হাত ধোবে।"],
            ["Wash your hands regularly to stay _____________ .", "ওয়শ ইয়ো হ্যান্ডজ় রেগিউলালি টু স্টেই ____ ।", "____ থাকতে নিয়মিত হাত ধোও।"],
          ] },
        ] },
      ],
    },
  ],
};
