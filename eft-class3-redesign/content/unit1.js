// English for Today, Class Three (NCTB, 2025 reprint): Unit 1, printed pages 1–8, word for word as printed.
// Every English line the child reads or says is [english, hint, meaning]: the hint is the British English sound in Bangla
// letters, as the Let's Learn English books' British Bangla edition writes it (dotted letters for sounds Bangla doesn't
// have; plain ক, ট, প, which the builder puffs at the start of a word: টীচা → ঠীচা). An instruction is [english, meaning].
// A blank is a run of underscores, as printed; a picture is its file name in art/new/ (else art/stand-in/).
module.exports = {
  unit: 1,
  title: ["Greetings, Farewells, Introductions and Numbers", "শুভেচ্ছা, বিদায়, পরিচয় আর সংখ্যা"],
  pages: [
    {
      page: 1, lesson: 1, opener: true, title: ["Hello", "হ্যালো"],
      blocks: [
        { k: "A", task: ["Listen and say.", "শোনো আর বলো।"], pic: "u1-l1-hello", lines: [
          ["Fatiha", "Good morning. What’s your name?", "গুড মনিং। ওয়টস ইয়ো নেইম?", "শুভ সকাল। তোমার নাম কী?"],
          ["Sanjoy", "Good morning. My name’s Sanjoy.", "গুড মনিং। মাই নেইমজ় স়ঞ্জয়।", "শুভ সকাল। আমার নাম সঞ্জয়।"],
          ["Fatiha", "How are you?", "হাউ আ ইউ?", "তুমি কেমন আছ?"],
          ["Sanjoy", "I’m good, thanks. And you?", "আইম গুড, থ়্যাংক্স। অ্যান্ড ইউ?", "আমি ভালো আছি, ধন্যবাদ। আর তুমি?"],
          ["Fatiha", "I’m also good.", "আইম অলস়ো গুড।", "আমিও ভালো আছি।"],
        ] },
      ],
    },
    {
      page: 2, lesson: 1, title: ["Hello", "হ্যালো"],
      blocks: [
        { k: "B", task: ["Listen and say.", "শোনো আর বলো।"], pic: "u1-l1-faria-rahat", bubbles: [
          { who: "Faria", at: [4, 4, 40], tail: "down-right", line: ["Hello, Rahat.\nHow are you?", "হ্যালো, রাহাত। হাউ আ ইউ?", "হ্যালো, রাহাত। তুমি কেমন আছ?"] },
          { who: "Rahat", at: [54, 4, 42], tail: "down-left", line: ["Hi, Faria.\nI’m fine. Thank you.", "হাই, ফ়ারিয়া। আইম ফ়াইন। থ়্যাংক ইউ।", "হাই, ফারিয়া। আমি ভালো আছি। ধন্যবাদ।"] },
        ] },
        { k: "C", task: ["Pairwork: Act out the dialogue in activity B with your friend.", "জোড়ায় কাজ: B-এর সংলাপটি বন্ধুর সাথে অভিনয় করে দেখাও।"] },
        { practise: true },
        { n: 1, task: ["Look at activity A. Write the correct word in the box.", "A কাজটি দেখো। বক্সে সঠিক শব্দটি লেখো।"], items: [
          { mark: "a)", lines: [
            ["Rana", "Good morning. What’s your name?", "গুড মনিং। ওয়টস ইয়ো নেইম?", "শুভ সকাল। তোমার নাম কী?"],
            ["Sima", "_______________, My name’s ___________.", "____, মাই নেইমজ় ____।", "____, আমার নাম ____।"],
          ] },
          { mark: "b)", lines: [
            ["Sarah", "_______________, What’s your name?", "____, ওয়টস ইয়ো নেইম?", "____, তোমার নাম কী?"],
            ["Manik", "________________, My name’s ________.", "____, মাই নেইমজ় ____।", "____, আমার নাম ____।"],
          ] },
        ] },
      ],
    },
    {
      page: 3, lesson: 2, title: ["Talking about myself", "নিজের কথা বলি"],
      blocks: [
        { k: "A", task: ["Chain drill.", "শিকল অনুশীলন: একজনের পর একজন বলো।"], pic: "u1-l2-chain-drill", drill: [
          { who: "S1", lines: [
            ["_Alex_ is my name.", "অ্যালিক্স ইজ় মাই নেইম।", "আমার নাম অ্যালেক্স।"],
            ["_Football_ is my game.", "ফ়ুটবল ইজ় মাই গেইম।", "ফুটবল আমার খেলা।"],
            ["_Red_ is my colour.", "রেড ইজ় মাই কালা।", "লাল আমার রং।"],
            ["_Rose_ is my flower.", "রোজ় ইজ় মাই ফ়্লাওয়া।", "গোলাপ আমার ফুল।"],
          ] },
          { who: "S2", lines: [
            ["_(Name)_ is my name.", "(নেইম) ইজ় মাই নেইম।", "(তোমার নাম) আমার নাম।"],
            ["_____ is my game.", "____ ইজ় মাই গেইম।", "____ আমার খেলা।"],
            ["_____ is my colour.", "____ ইজ় মাই কালা।", "____ আমার রং।"],
            ["______ is my flower.", "____ ইজ় মাই ফ়্লাওয়া।", "____ আমার ফুল।"],
          ] },
        ], more: ["Continue.................", "এভাবে চালিয়ে যাও…"] },
      ],
    },
    {
      page: 4, lesson: 2, title: ["Talking about myself", "নিজের কথা বলি"],
      blocks: [
        { k: "B", task: ["Listen and say.", "শোনো আর বলো।"], pic: "u1-l2-sakiba-zahid", lines: [
          ["Sakiba", "Hello, Zahid. What’s your favourite game?", "হ্যালো, জ়াহিদ। ওয়টস ইয়ো ফ়েইভ়ারিট গেইম?", "হ্যালো, জাহিদ। তোমার প্রিয় খেলা কী?"],
          ["Zahid", "Hi, Sakiba! Cricket is my favourite game. And yours?", "হাই, স়াকিবা! ক্রিকিট ইজ় মাই ফ়েইভ়ারিট গেইম। অ্যান্ড ইয়োজ়?", "হাই, সাকিবা! ক্রিকেট আমার প্রিয় খেলা। আর তোমার?"],
          ["Sakiba", "I like to play football.", "আই লাইক টু প্লেই ফ়ুটবল।", "আমি ফুটবল খেলতে ভালোবাসি।"],
          ["Zahid", "What’s your favourite subject, Sakiba?", "ওয়টস ইয়ো ফ়েইভ়ারিট স়াবজিক্ট, স়াকিবা?", "সাকিবা, তোমার প্রিয় বিষয় কী?"],
          ["Sakiba", "English is my favourite subject.", "ইংলিশ ইজ় মাই ফ়েইভ়ারিট স়াবজিক্ট।", "ইংরেজি আমার প্রিয় বিষয়।"],
          ["Zahid", "Oh, I like English, too.", "ও, আই লাইক ইংলিশ, টূ।", "ও, আমারও ইংরেজি ভালো লাগে।"],
        ] },
        { k: "C", task: ["Act out the dialogue in activity B with your friend.", "B-এর সংলাপটি বন্ধুর সাথে অভিনয় করে দেখাও।"] },
      ],
    },
    {
      page: 5, lesson: 2, title: ["Talking about myself", "নিজের কথা বলি"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Put tick (√) mark to the correct answer.", "সঠিক উত্তরে টিক (√) চিহ্ন দাও।"], choose: [
          { q: ["Here ‘favourite’ means", "হিয়া ‘ফ়েইভ়ারিট’ মীনজ়", "এখানে ‘favourite’ মানে"], options: [
            ["a)", "most liked", "মোস্ট লাইক্ট", "সবচেয়ে পছন্দের"],
            ["b)", "disliked", "ডিস়লাইক্ট", "অপছন্দের"],
          ] },
          { q: ["Here ‘game’ means", "হিয়া ‘গেইম’ মীনজ়", "এখানে ‘game’ মানে"], options: [
            ["a)", "sport", "স্পট", "খেলাধুলা"],
            ["b)", "reading book", "রীডিং বুক", "পড়ার বই"],
          ] },
        ] },
        { n: 2, task: ["Ask and answer the following questions.", "নিচের প্রশ্নগুলো জিজ্ঞেস করো আর উত্তর দাও।"], questions: [
          ["a)", "What is Zahid’s favourite game?", "ওয়ট ইজ় জ়াহিদজ় ফ়েইভ়ারিট গেইম?", "জাহিদের প্রিয় খেলা কী?"],
          ["b)", "What is Sakiba’s favourite subject?", "ওয়ট ইজ় স়াকিবাজ় ফ়েইভ়ারিট স়াবজিক্ট?", "সাকিবার প্রিয় বিষয় কী?"],
          ["c)", "What do Zahid and Sakiba talk about?", "ওয়ট ডু জ়াহিদ অ্যান্ড স়াকিবা টক আবাউট?", "জাহিদ আর সাকিবা কী নিয়ে কথা বলে?"],
        ] },
        // the optional spot (PICTURE-PROMPTS-unit1.md section 4): a cut-out on white, shown whole, unframed (unit1.parts.js)
        { parts: [{ u1spot: { name: "u1-l2-spot", h: 34 } }] },
      ],
    },
    {
      page: 6, lesson: 3, title: ["Greetings", "শুভেচ্ছা জানাই"],
      blocks: [
        { k: "A", task: ["Listen and say.", "শোনো আর বলো।"], pic: "u1-l3-morning", bubbles: [
          { who: "Teacher", at: [55, 4, 41], tail: "down-left", line: ["Good morning, students.", "গুড মনিং, স্টিউডান্টস।", "শুভ সকাল, শিক্ষার্থীরা।"] },
          { who: "Students", at: [3, 30, 34], tail: "down-left", line: ["Good morning,\nteacher.", "গুড মনিং, টীচা।", "শুভ সকাল, শিক্ষিকা।"] },
        ] },
        { k: "B", task: ["Listen and say.", "শোনো আর বলো।"], pic: "u1-l3-afternoon", bubbles: [
          { who: "Teacher", at: [52, 4, 42], tail: "down-left", line: ["Hello students,\nGood afternoon.", "হ্যালো স্টিউডান্টস, গুড আফ়টানূন।", "হ্যালো শিক্ষার্থীরা, শুভ অপরাহ্ন।"] },
          { who: "Students", at: [3, 22, 34], tail: "down-left", line: ["Good afternoon,\nteacher.", "গুড আফ়টানূন, টীচা।", "শুভ অপরাহ্ন, শিক্ষিকা।"] },
        ] },
      ],
    },
    {
      page: 7, lesson: 3, title: ["Greetings", "শুভেচ্ছা জানাই"],
      blocks: [
        { k: "C", task: ["Look, listen and say.", "দেখো, শোনো আর বলো।"], pic: "u1-l3-evening", lines: [
          ["Rahat", "Good evening, Faria.", "গুড ঈভ়নিং, ফ়ারিয়া।", "শুভ সন্ধ্যা, ফারিয়া।"],
          ["Faria", "Good evening, Rahat.", "গুড ঈভ়নিং, রাহাত।", "শুভ সন্ধ্যা, রাহাত।"],
          ["Rahat", "Who is she?", "হূ ইজ় শী?", "ও কে?"],
          ["Faria", "She is my cousin, Rita. And Rita, he is my friend, Rahat.", "শী ইজ় মাই কাজ়ান, রীতা। অ্যান্ড রীতা, হী ইজ় মাই ফ়্রেন্ড, রাহাত।", "ও আমার কাজিন, রীতা। আর রীতা, ও আমার বন্ধু, রাহাত।"],
          ["Rita", "Nice to meet you.", "নাইস় টু মীট ইউ।", "তোমার সাথে দেখা হয়ে ভালো লাগল।"],
          ["Rahat", "Nice meeting you, too.", "নাইস় মীটিং ইউ, টূ।", "তোমার সাথে দেখা হয়েও ভালো লাগল।"],
        ] },
      ],
    },
    {
      page: 8, lesson: 4, title: ["Goodbye 1", "বিদায় ১"],
      blocks: [
        { k: "A", task: ["Look, listen and say.", "দেখো, শোনো আর বলো।"], pic: "u1-l4-goodbye-class", bubbles: [
          { who: "Teacher", at: [26, 3, 38], tail: "down-left", line: ["Goodbye, students.\nIt’s time to go.", "গুডবাই, স্টিউডান্টস। ইটস টাইম টু গো।", "বিদায়, শিক্ষার্থীরা। এখন যাওয়ার সময়।"] },
          { who: "Students", at: [62, 18, 35], tail: "down-left", line: ["Goodbye, teacher.", "গুডবাই, টীচা।", "বিদায়, শিক্ষক।"] },
        ] },
        { k: "B", task: ["Listen and say.", "শোনো আর বলো।"], pic: "u1-l4-goodbye-ripa", bubbles: [
          { who: "Teacher", at: [52, 4, 32], tail: "down-right", line: ["Goodbye, Ripa.", "গুডবাই, রিপা।", "বিদায়, রিপা।"] },
          { who: "Ripa", at: [6, 26, 34], tail: "down-left", line: ["Goodbye, teacher.", "গুডবাই, টীচা।", "বিদায়, শিক্ষক।"] },
        ] },
      ],
    },
    {
      page: 9, lesson: 4, title: ["Goodbye 1", "বিদায় ১"],
      blocks: [
        // the book prints the dialogue above its picture
        { k: "C", task: ["Listen and say.", "শোনো আর বলো।"], parts: [
          { dlg: [
            ["Rahat", "Hello Namira, how are you?", "হ্যালো নামিরা, হাউ আ ইউ?", "হ্যালো নামিরা, কেমন আছ?"],
            ["Namira", "I’m fine, thanks. And you?", "আইম ফ়াইন, থ়্যাংক্স। অ্যান্ড ইউ?", "আমি ভালো আছি, ধন্যবাদ। আর তুমি?"],
            ["Rahat", "I’m good. Where are you going?", "আইম গুড। ওয়েয়া আ ইউ গোইং?", "আমি ভালো আছি। তুমি কোথায় যাচ্ছ?"],
            ["Namira", "I’m going to buy some medicines.", "আইম গোইং টু বাই স়াম মেডিস়ানজ়।", "আমি কিছু ওষুধ কিনতে যাচ্ছি।"],
            ["Rahat", "Okay, goodbye. See you later.", "ওকেই, গুডবাই। স়ী ইউ লেইটা।", "ঠিক আছে, বিদায়। পরে দেখা হবে।"],
            ["Namira", "Goodbye!", "গুডবাই!", "বিদায়!"],
          ] },
          { pic: "u1-l4-rahat-namira" },
        ] },
        { k: "D", task: ["Act out the dialogue in activity C with your friend.", "C-এর সংলাপটি বন্ধুর সাথে অভিনয় করে দেখাও।"] },
      ],
    },
    {
      page: 10, lesson: 5, title: ["Goodbye 2", "বিদায় ২"],
      blocks: [
        // the book doesn't name the two boys; the new picture draws Sanjoy and Rahat (PICTURE-PROMPTS-unit1.md section 5)
        { k: "A", task: ["Listen and say.", "শোনো আর বলো।"], pic: "u1-l5-good-night", bubbles: [
          { who: "Sanjoy", at: [3, 4, 38], tail: "down-left", line: ["Good night, see you tomorrow.", "গুড নাইট, স়ী ইউ টুমরো।", "শুভ রাত্রি, কাল দেখা হবে।"] },
          { who: "Rahat", at: [57, 4, 40], tail: "down-right", line: ["Good night,\nsee you in the morning.", "গুড নাইট, স়ী ইউ ইন দ়া মনিং।", "শুভ রাত্রি, সকালে দেখা হবে।"] },
        ] },
        { k: "B", task: ["Listen and sing.", "শোনো আর গাও।"], parts: [
          { u1song: { cols: [
            { stanzas: [
              [
                ["It’s time to go home,", "ইটস টাইম টু গো হোম,", "বাড়ি যাওয়ার সময় হলো,"],
                ["It’s time to go home,", "ইটস টাইম টু গো হোম,", "বাড়ি যাওয়ার সময় হলো,"],
                ["It’s time to go home,", "ইটস টাইম টু গো হোম,", "বাড়ি যাওয়ার সময় হলো,"],
                ["It’s time to say goodbye.", "ইটস টাইম টু স়েই গুডবাই।", "বিদায় বলার সময় হলো।"],
              ],
              [
                ["I had so much fun,", "আই হ্যাড স়ো মাচ ফ়ান,", "আমার খুব মজা হয়েছে,"],
                ["And you had so much fun,", "অ্যান্ড ইউ হ্যাড স়ো মাচ ফ়ান,", "আর তোমারও খুব মজা হয়েছে,"],
                ["We all had so much fun,", "উই অল হ্যাড স়ো মাচ ফ়ান,", "আমাদের সবার খুব মজা হয়েছে,"],
                ["And now we say goodbye.", "অ্যান্ড নাউ উই স়েই গুডবাই।", "আর এখন আমরা বিদায় বলি।"],
              ],
            ] },
            { stanzas: [
              [
                ["Goodbye,", "গুডবাই,", "বিদায়,"],
                ["Goodbye,", "গুডবাই,", "বিদায়,"],
                ["See you again.", "স়ী ইউ আগেন।", "আবার দেখা হবে।"],
                ["Goodbye,", "গুডবাই,", "বিদায়,"],
                ["Goodbye,", "গুডবাই,", "বিদায়,"],
                ["See you again.", "স়ী ইউ আগেন।", "আবার দেখা হবে।"],
              ],
            ], pic: "u1-l5-swing", pos: "50% 72%" },
          ] } },
        ] },
        { k: "C", task: ["Group work. Sing the song in groups.", "দলে কাজ: দলে দলে গানটি গাও।"] },
      ],
    },
    {
      page: 11, lesson: 5, title: ["Goodbye 2", "বিদায় ২"], dense: true,
      blocks: [
        { practise: true },
        { n: 1, task: ["Look at activity C of lesson 3. Write the correct word in the box.", "৩ নম্বর পাঠের C কাজটি দেখো। বক্সে সঠিক শব্দটি লেখো।"], parts: [
          { tight: true, u1dlg: [
            ["Roton", "Good evening, Salma.", "গুড ঈভ়নিং, স়ালমা।", "শুভ সন্ধ্যা, সালমা।"],
            ["Salma", "_______________, Roton.", "____, রতন।", "____, রতন।"],
            ["Roton", "Meet my friend, Tanim. And Tanim, she is my friend, Salma.", "মীট মাই ফ়্রেন্ড, তানিম। অ্যান্ড তানিম, শী ইজ় মাই ফ়্রেন্ড, স়ালমা।", "আমার বন্ধু তানিমের সাথে পরিচিত হও। আর তানিম, ও আমার বন্ধু, সালমা।"],
            ["Tanim", "Nice to _______ you.", "নাইস় টু ____ ইউ।", "তোমার সাথে ____ হয়ে ভালো লাগল।"],
            ["Salma", "_________ meeting you, too.", "____ মীটিং ইউ, টূ।", "তোমার সাথে দেখা হয়েও ____ লাগল।"],
          ] },
        ] },
        { n: 2, task: ["Look at activity C of lesson 4. Write the correct word/words in the box.", "৪ নম্বর পাঠের C কাজটি দেখো। বক্সে সঠিক শব্দ বা শব্দগুলো লেখো।"], parts: [
          { u1dlg: [
            ["Asif", "Hello Rina, how are you?", "হ্যালো রিনা, হাউ আ ইউ?", "হ্যালো রিনা, কেমন আছ?"],
            ["Rina", "I’m ____________, ____________. And you?", "আইম ____, ____। অ্যান্ড ইউ?", "আমি ____, ____। আর তুমি?"],
            ["Asif", "I’m _____________. __________are you going?", "আইম ____। ____ আ ইউ গোইং?", "আমি ____। তুমি ____ যাচ্ছ?"],
            ["Rina", "I’m going to the nearby shop.", "আইম গোইং টু দ়া নিয়াবাই শপ।", "আমি কাছের দোকানে যাচ্ছি।"],
            ["Asif", "_________, goodbye. _________ you ___________ .", "____, গুডবাই। ____ ইউ ____।", "____, বিদায়। ____ তোমার সাথে ____।"],
            ["Rina", "________________ !", "", ""],
          ], tight: true },
        ] },
      ],
    },
    // ── the model pages for the other kinds of content (SPEC.md) ──
    {
      page: 12, lesson: 6, title: ["Numbers 1-30", "সংখ্যা ১-৩০"],
      blocks: [
        { k: "A", task: ["Look at the calendar page. Read the numbers.", "ক্যালেন্ডারের পাতাটি দেখো। সংখ্যাগুলো পড়ো।"], parts: [
          { calendar: { title: "September- 2026", start: 2, days: 30, show: "all" } },
        ] },
        { k: "B", task: ["Read and write the numbers in words.", "সংখ্যাগুলো পড়ো আর কথায় লেখো।"], parts: [
          // the book prints these numbers inside its pictures, so they aren't text there
          { cards: [1, 6, 10, 7, 2, 8, 3, 4, 5, 9].map((n) => ({ n: String(n), w: "" })), cols: 5, shape: "tag", nocheck: true },
        ] },
      ],
    },
    {
      page: 13, lesson: 6, title: ["Numbers 1-30", "সংখ্যা ১-৩০"],
      blocks: [
        // 1 June 2026 is a Monday, as the book shows; only the 1 is written in ("One is done for you")
        { k: "C", task: ["Write the numbers in the calendar page for the month of June. One is done for you.", "জুন মাসের ক্যালেন্ডারের পাতায় সংখ্যাগুলো লেখো। একটি করে দেওয়া আছে।"], parts: [
          { u1cal: { title: "June-2026", start: 1, days: 30, show: [1], h: 22 } },
        ] },
      ],
    },
    {
      page: 14, lesson: 6, title: ["Numbers 1-30", "সংখ্যা ১-৩০"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Match column A with column B. One is done for you.", "A কলামের সাথে B কলাম মেলাও। একটি করে দেওয়া আছে।"], parts: [
          { match: { a: ["Cardinal Numbers (A)", "", "সংখ্যা (A)"], b: ["Number in words (B)", "", "কথায় সংখ্যা (B)"],
            left: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            right: [["four", "ফ়ো", "চার"], ["one", "ওয়ান", "এক"], ["eight", "এইট", "আট"], ["five", "ফ়াইভ়", "পাঁচ"], ["seven", "*স়ে*·ভ়ান", "সাত"], ["two", "টূ", "দুই"], ["six", "স়িক্স", "ছয়"], ["nine", "নাইন", "নয়"], ["three", "থ়্রী", "তিন"]],
            done: [[0, 1]] } },
        ] },
        { n: 2, task: ["Write the missing number in words in the blanks.", "খালি জায়গায় বাদ পড়া সংখ্যাটি কথায় লেখো।"], parts: [
          { lines: [["one, ______________, three, ____________, ______________, six, ______________, ______________, nine, ______________.", "", ""]] },
        ] },
        { n: 3, task: ["Write the previous number in the box.", "বক্সে আগের সংখ্যাটি লেখো।"], parts: [
          { boxes: ["□ 9", "□ 14", "□ 17", "□ 23", "□ 26", "□ 28"], cols: 6 },
        ] },
        { n: 4, task: ["Write the next number in the box.", "বক্সে পরের সংখ্যাটি লেখো।"], parts: [
          { boxes: ["12 □", "15 □", "18 □", "23 □", "27 □", "29 □"], cols: 6 },
        ] },
      ],
    },
    {
      page: 15, lesson: 7, title: ["Introducing myself", "নিজের পরিচয় দিই"], dense: true,
      blocks: [
        { k: "A", task: ["Read the text.", "লেখাটি পড়ো।"], parts: [
          { u1beside: { pic: "u1-l7-jerin", side: "left", w: 44, text: [
            ["Hello!", "হ্যালো!", "হ্যালো!"],
            ["I’m Jerin.", "আইম জেরিন।", "আমি জেরিন।"],
            ["I’m 8 years old.", "আইম এইট ইয়িয়াজ় ওল্ড।", "আমার বয়স ৮ বছর।"],
            ["I’m in class 3 at Mohonpur Government Primary School.", "আইম ইন ক্লাস় থ়্রী অ্যাট মোহনপুর গাভ়ানমান্ট প্রাইমারি স্কূল।", "আমি মোহনপুর সরকারি প্রাথমিক বিদ্যালয়ে ৩য় শ্রেণিতে পড়ি।"],
            ["I live with my family in Mohonpur.", "আই লিভ় উইদ় মাই ফ়্যামিলি ইন মোহনপুর।", "আমি আমার পরিবারের সাথে মোহনপুরে থাকি।"],
          ] } },
        ] },
        { k: "B", task: ["Pairwork: Ask and answer the questions. Look at the information in activity A.", "জোড়ায় কাজ: প্রশ্নগুলো জিজ্ঞেস করো আর উত্তর দাও। A কাজের তথ্যগুলো দেখো।"], parts: [
          { items: [
            ["1.", "What is the girl’s name?", "ওয়ট ইজ় দ়া গালজ় নেইম?", "মেয়েটির নাম কী?"],
            ["2.", "How old is she?", "হাউ ওল্ড ইজ় শী?", "ওর বয়স কত?"],
            ["3.", "Where does she live?", "ওয়েয়া ডাজ় শী লিভ়?", "ও কোথায় থাকে?"],
            ["4.", "What class is she in?", "ওয়ট ক্লাস় ইজ় শী ইন?", "ও কোন শ্রেণিতে পড়ে?"],
          ] },
        ] },
        { k: "C", task: ["Complete the table with the information of Jerin from activity A.", "A কাজ থেকে জেরিনের তথ্য দিয়ে ছকটি পূরণ করো।"], parts: [
          { table: { w: [34, 66], rows: [
            [["Name", "নেইম", "নাম"], ""],
            [["Age", "এইজ", "বয়স"], ""],
            [["Class", "ক্লাস়", "শ্রেণি"], ""],
            [["School’s name", "স্কূলজ় নেইম", "বিদ্যালয়ের নাম"], ""],
          ] } },
        ] },
      ],
    },
    {
      page: 16, lesson: 7, title: ["Introducing myself", "নিজের পরিচয় দিই"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Choose the correct words from the box and fill in the blanks.", "বক্স থেকে সঠিক শব্দ বেছে নিয়ে খালি জায়গা পূরণ করো।"], parts: [
          // the book prints the box as one line: "school, class, family, lives"
          { words: [["school", "স্কূল", "বিদ্যালয়"], ["class", "ক্লাস়", "শ্রেণি"], ["family", "*ফ়্যা*·মি·লি", "পরিবার"], ["lives", "লিভ়জ়", "থাকে"]] },
          { text: [
            ["The girl’s name is Jerin.", "দ়া গালজ় নেইম ইজ় জেরিন।", "মেয়েটির নাম জেরিন।"],
            ["She is in __________ 3.", "শী ইজ় ইন ____ থ়্রী।", "ও ____ ৩-এ পড়ে।"],
            ["Her __________ is Mohonpur Government Primary School.", "হা ____ ইজ় মোহনপুর গাভ়ানমান্ট প্রাইমারি স্কূল।", "ওর ____ মোহনপুর সরকারি প্রাথমিক বিদ্যালয়।"],
            ["She __________ in Mohonpur.", "শী ____ ইন মোহনপুর।", "ও মোহনপুরে ____।"],
            ["She lives with her __________ .", "শী লিভ়জ় উইদ় হা ____।", "ও ওর ____-এর সাথে থাকে।"],
          ] },
        ] },
        { n: 2, task: ["Complete the table with your information.", "তোমার নিজের তথ্য দিয়ে ছকটি পূরণ করো।"], parts: [
          { table: { w: [34, 66], rows: [
            [["Name", "নেইম", "নাম"], ""],
            [["Age", "এইজ", "বয়স"], ""],
            [["Class", "ক্লাস়", "শ্রেণি"], ""],
            [["School’s name", "স্কূলজ় নেইম", "বিদ্যালয়ের নাম"], ""],
          ] } },
        ] },
      ],
    },
    {
      page: 17, lesson: 8, title: ["Introducing someone", "অন্যকে পরিচয় করিয়ে দিই"],
      blocks: [
        { k: "A", task: ["Listen, say and read.", "শোনো, বলো আর পড়ো।"], pic: "u1-l8-meet-my-friend", lines: [
          ["Zabed", "Hello, Sabiha!", "হ্যালো, স়াবিহা!", "হ্যালো, সাবিহা!"],
          ["Sabiha", "Hi, Zabed! How are you?", "হাই, জ়াবেদ! হাউ আ ইউ?", "হাই, জাবেদ! কেমন আছ?"],
          ["Zabed", "Fine, thanks. Sabiha, meet my friend, Mahmud Hasan. And Mahmud, this is Sabiha.", "ফ়াইন, থ়্যাংক্স। স়াবিহা, মীট মাই ফ়্রেন্ড, মাহমুদ হাস়ান। অ্যান্ড মাহমুদ, দ়িস় ইজ় স়াবিহা।", "ভালো, ধন্যবাদ। সাবিহা, আমার বন্ধু মাহমুদ হাসানের সাথে পরিচিত হও। আর মাহমুদ, এ হলো সাবিহা।"],
          ["Sabiha", "Hello, Mahmud! Nice to meet you.", "হ্যালো, মাহমুদ! নাইস় টু মীট ইউ।", "হ্যালো, মাহমুদ! তোমার সাথে দেখা হয়ে ভালো লাগল।"],
          ["Mahmud", "Nice meeting you, too.", "নাইস় মীটিং ইউ, টূ।", "তোমার সাথে দেখা হয়েও ভালো লাগল।"],
        ] },
        { k: "B", task: ["Introduce a friend.", "একজন বন্ধুকে পরিচয় করিয়ে দাও।"] },
      ],
    },
    {
      page: 18, lesson: 8, title: ["Introducing someone", "অন্যকে পরিচয় করিয়ে দিই"],
      blocks: [
        { practise: true },
        // the book gives the last line to Laila, though it is Mamun's answer (as Mahmud's on page 17): copied as printed
        { n: 1, task: ["Look at activity A. Write the correct word/words in the blanks.", "A কাজটি দেখো। খালি জায়গায় সঠিক শব্দ বা শব্দগুলো লেখো।"], parts: [
          { dlg: [
            ["Laila", "Hello, Sagor!", "হ্যালো, স়াগর!", "হ্যালো, সাগর!"],
            ["Sagor", "Hi, Laila! ________ ________ ________?", "হাই, লাইলা! ____ ____ ____?", "হাই, লাইলা! ____ ____ ____?"],
            ["Laila", "Fine, thanks. Sagor, ____________ my friend, Mamun. And Mamun, this is Sagor.", "ফ়াইন, থ়্যাংক্স। স়াগর, ____ মাই ফ়্রেন্ড, মামুন। অ্যান্ড মামুন, দ়িস় ইজ় স়াগর।", "ভালো, ধন্যবাদ। সাগর, আমার বন্ধু মামুনের সাথে ____। আর মামুন, এ হলো সাগর।"],
            ["Sagor", "Hello, Mamun! _________ to __________ you.", "হ্যালো, মামুন! ____ টু ____ ইউ।", "হ্যালো, মামুন! তোমার সাথে ____ হয়ে ____ লাগল।"],
            ["Laila", "Nice ____________ you, too.", "নাইস় ____ ইউ, টূ।", "তোমার সাথে ____ হয়েও ভালো লাগল।"],
          ] },
        ] },
      ],
    },
    {
      page: 19, lesson: 9, title: ["Numbers 11-20 in words", "কথায় ১১-২০"],
      // the book draws A's numbers and words into its pictures, and prints B's words in a tracing font that splits the letters
      allow: { why: "the book's tracing font splits B's words into letters (t we l ve)", missing: ["t", "we", "l", "ve", "t", "hirte", "e", "n", "fou", "rte", "e", "n", "fi", "fteen", "s", "i", "xte", "e", "n", "se", "ve", "nte", "e", "n", "ei", "ghteen", "n", "i", "n", "ete", "en", "twe", "nty"], extra: ["twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"] },
      blocks: [
        { k: "A", task: ["Read and say.", "পড়ো আর বলো।"], parts: [
          { cards: [
            { n: "11", w: ["eleven", "ই·*লে*·ভ়ান", "এগারো"] },
            { n: "12", w: ["twelve", "টুয়েলভ়", "বারো"] },
            { n: "13", w: ["thirteen", "থ়া·*টীন*", "তেরো"] },
            { n: "14", w: ["fourteen", "ফ়ো·*টীন*", "চোদ্দ"] },
            { n: "15", w: ["fifteen", "ফ়িফ়·*টীন*", "পনেরো"] },
            { n: "16", w: ["sixteen", "স়িক্স·*টীন*", "ষোলো"] },
            { n: "17", w: ["seventeen", "স়ে·ভ়ান·*টীন*", "সতেরো"] },
            { n: "18", w: ["eighteen", "এই·*টীন*", "আঠারো"] },
            { n: "19", w: ["nineteen", "নাইন·*টীন*", "উনিশ"] },
            { n: "20", w: ["twenty", "*টুয়েন*·টি", "বিশ"] }
          ], cols: 5, nocheck: true },
        ] },
        { k: "B", task: ["Write the numbers in words.", "সংখ্যাগুলো কথায় লেখো।"], parts: [
          { trace: ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"], per: 4 },
        ] },
        { k: "C", task: ["Game.", "খেলা।"], parts: [
          { lines: [
            ["Group 1: Every student picks a number card or wooden or plastic number in figure from 11 to 20. They show their numbers and then make a line in an order from 11 to 20.", "", "দল ১: প্রত্যেক শিক্ষার্থী ১১ থেকে ২০-এর একটি সংখ্যা কার্ড বা কাঠের বা প্লাস্টিকের সংখ্যা তুলে নেয়। তারা সংখ্যাগুলো দেখায়, তারপর ১১ থেকে ২০ পর্যন্ত ক্রম অনুযায়ী লাইনে দাঁড়ায়।"],
            ["Group 2: Every student picks a number card in words. They show their cards and make a line from eleven to twenty. Finally, group-2 members choose their respective numbers from group-1 and make pairs. Continue……", "", "দল ২: প্রত্যেক শিক্ষার্থী কথায় লেখা একটি সংখ্যা কার্ড তুলে নেয়। তারা কার্ড দেখায় আর এগারো থেকে বিশ পর্যন্ত লাইনে দাঁড়ায়। শেষে দল ২-এর সদস্যরা দল ১ থেকে নিজের নিজের সংখ্যা খুঁজে জোড়া বাঁধে। চালিয়ে যাও……"],
          ] },
        ] },
      ],
    },
    {
      page: 20, lesson: 9, title: ["Numbers 11-20 in words", "কথায় ১১-২০"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Match column A with column B. One is done for you.", "A কলামের সাথে B কলাম মেলাও। একটি করে দেওয়া আছে।"], parts: [
          { match: { a: ["Numbers (A)", "", "সংখ্যা (A)"], b: ["Numbers in words (B)", "", "কথায় সংখ্যা (B)"],
            left: ["11", "12", "15", "18", "20"],
            right: [["eighteen", "এই·*টীন*", "আঠারো"], ["fifteen", "ফ়িফ়·*টীন*", "পনেরো"], ["twelve", "টুয়েলভ়", "বারো"], ["twenty", "*টুয়েন*·টি", "বিশ"], ["eleven", "ই·*লে*·ভ়ান", "এগারো"]],
            done: [[0, 4]] } },
        ] },
        // the book sets the six in two columns (12, 13, 14 | 15, 18, 20); a two-column grid fills row by row
        { n: 2, task: ["Write the number in words.", "সংখ্যাটি কথায় লেখো।"], parts: [
          { lines: [
            ["12 _______________", "", ""], ["15 _______________", "", ""],
            ["13 _______________", "", ""], ["18 _______________", "", ""],
            ["14 _______________", "", ""], ["20 _______________", "", ""],
          ], cols: 2 },
        ] },
        // as printed: " ,twelve," and "eighteen ____" without its comma
        { n: 3, task: ["Write the missing number in words in the blanks.", "খালি জায়গায় বাদ পড়া সংখ্যাটি কথায় লেখো।"], parts: [
          { lines: [
            ["__________________ ,twelve, thirteen, ____________________,", "", ""],
            ["fifteen, ______________________, _________________________,", "", ""],
            ["eighteen ____________________, _________________________,", "", ""],
          ] },
        ] },
      ],
    },
  ],
};
