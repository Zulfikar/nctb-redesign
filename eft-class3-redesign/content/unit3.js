// English for Today, Class Three (NCTB, 2025 reprint): Unit 3, printed pages 34–47, word for word as printed.
// Every English line the child reads or says is [english, hint, meaning]: the hint is the British English sound in Bangla
// letters, as the Let's Learn English books' British Bangla edition writes it (dotted letters for sounds Bangla doesn't
// have; plain ক, ট, প, which the builder puffs at the start of a word). An instruction is [english, meaning]; a long one
// for the class (a game, a project) is [english, "", meaning]. A line of only blanks or numbers has no guide.
// The book's dots (……………) and blanks (____) are as printed; in a guide, ____ marks the gap.
// The kinds u3sub, u3fig and u3grid are Unit 3's own (content/unit3.parts.js).
module.exports = {
  unit: 3,
  title: ["Commands, Instructions, Requests and Numbers", "আদেশ, নির্দেশ, অনুরোধ আর সংখ্যা"],
  pages: [
    {
      page: 34, lesson: 1, opener: true, title: ["Simple commands", "সহজ আদেশ"],
      // the book prints the unit's title on two lines ("Commands, Instructions," / "Requests and Numbers"), so the check
      // can't take it out of the page's words; we print it in the opener's header, outside the checked body
      allow: { why: "the book's unit title runs over two lines, so the check can't strip it; ours is in the opener's header", missing: ["Commands", "Instructions", "Requests", "and", "Numbers"] },
      blocks: [
        { k: "A", task: ["Game: Do this. Do that.", "খেলা: এটা করো। ওটা করো।"], parts: [
          { lines: [["Follow your teacher’s instructions and play the game “Do this. Do that”.", "", "শিক্ষকের নির্দেশ মেনে “Do this. Do that” (এটা করো। ওটা করো।) খেলাটি খেলো।"]] },
          { pic: "u3-l1-do-this" },
        ] },
        { k: "B", task: ["In pairs, make a list of the commands you hear in your drill class.", "জোড়ায় জোড়ায়, ড্রিল ক্লাসে যেসব আদেশ শোনো তার একটি তালিকা বানাও।"], parts: [
          { write: 5 },
        ] },
      ],
    },
    {
      page: 35, lesson: 1, title: ["Simple commands", "সহজ আদেশ"], dense: true,
      blocks: [
        { k: "C", task: ["Look at the picture below. It shows a student in ‘attention’ position.", "নিচের ছবিটি দেখো। এতে একজন শিক্ষার্থী ‘সাবধান’ ভঙ্গিতে দাঁড়িয়ে আছে।"], parts: [
          { u3sub: ["Listen and repeat the commands given below.", "নিচের আদেশগুলো শোনো আর আবার বলো।"], mk: "1." },
          { u3grid: [
            { u3fig: "u3-l1-attention", h: 82 },
            { lines: [
              ["Keep your head upright.", "কীপ ইয়ো হেড আপরাইট।", "মাথা সোজা উঁচু করে রাখো।"],
              ["Look to the front.", "লুক টু দ়া ফ়্রান্ট।", "সামনের দিকে তাকাও।"],
              ["Keep your body straight.", "কীপ ইয়ো বডি স্ট্রেইট।", "শরীর সোজা রাখো।"],
              ["Keep your arms down.", "কীপ ইয়ো আমজ় ডাউন।", "হাত দুটো নিচে নামিয়ে রাখো।"],
              ["Keep your palms facing in.", "কীপ ইয়ো পামজ় ফ়েইস়িং ইন।", "হাতের তালু ভেতরের দিকে রাখো।"],
              ["Keep your hands and fingers straight.", "কীপ ইয়ো হ্যান্ডজ় অ্যান্ড ফ়িংগাজ় স্ট্রেইট।", "হাত আর আঙুলগুলো সোজা রাখো।"],
              ["Keep your knees straight.", "কীপ ইয়ো নীজ় স্ট্রেইট।", "হাঁটু সোজা রাখো।"],
              ["Keep your heels together.", "কীপ ইয়ো হীলজ় টুগেদ়া।", "গোড়ালি দুটো একসাথে রাখো।"],
            ], style: "read" },
          ], cols: ["50mm", "1fr"], mid: true },
          { u3sub: ["Breathing exercise commands:", "ব্রীদ়িং এক্সাস়াইজ় কামান্ডজ়:", "শ্বাসের ব্যায়ামের আদেশ:"], mk: "2." },
          { u3grid: [
            { lines: [
              ["Keep your mouth closed.", "কীপ ইয়ো মাউথ় ক্লোজ়ড।", "মুখ বন্ধ রাখো।"],
              ["Place your hands on lower chest.", "প্লেইস় ইয়ো হ্যান্ডজ় অন লোয়া চেস্ট।", "হাত দুটো বুকের নিচের দিকে রাখো।"],
              ["Breathe in .", "ব্রীদ় ইন।", "শ্বাস নাও।"],
              ["Breathe out.", "ব্রীদ় আউট।", "শ্বাস ছাড়ো।"],
              ["Keep your heels together.", "কীপ ইয়ো হীলজ় টুগেদ়া।", "গোড়ালি দুটো একসাথে রাখো।"],
            ], style: "read" },
            { u3fig: "u3-l1-breathing", h: 58 },
          ], cols: ["1fr", "40mm"], mid: true },
        ] },
      ],
    },
    {
      page: 36, lesson: 1, title: ["Simple commands", "সহজ আদেশ"], dense: true,
      blocks: [
        { k: "D", task: ["What other commands may your drill teacher give you? In pairs, take turns to give and follow the commands below.", "তোমার ড্রিল শিক্ষক আর কী কী আদেশ দিতে পারেন? জোড়ায় জোড়ায় পালা করে নিচের আদেশগুলো দাও আর মেনে চলো।"], parts: [
          { u3sub: ["Exercise 1", "এক্সাস়াইজ় ওয়ান", "ব্যায়াম ১"] },
          { u3grid: [
            { u3fig: "u3-l1-exercise-1", h: 62 },
            { lines: [
              ["Keep your head still.", "কীপ ইয়ো হেড স্টিল।", "মাথা স্থির রাখো।"],
              ["Face your palms outward.", "ফ়েইস় ইয়ো পামজ় আউটওয়াড।", "হাতের তালু বাইরের দিকে ফেরাও।"],
              ["Keep your arms forward.", "কীপ ইয়ো আমজ় ফ়োওয়াড।", "হাত দুটো সামনের দিকে রাখো।"],
              ["Keep your arms sideways.", "কীপ ইয়ো আমজ় স়াইডওয়েইজ়।", "হাত দুটো দুই পাশে ছড়িয়ে রাখো।"],
              ["Keep your arms downward.", "কীপ ইয়ো আমজ় ডাউনওয়াড।", "হাত দুটো নিচের দিকে রাখো।"],
              ["Keep your body straight.", "কীপ ইয়ো বডি স্ট্রেইট।", "শরীর সোজা রাখো।"],
              ["Keep your heels together.", "কীপ ইয়ো হীলজ় টুগেদ়া।", "গোড়ালি দুটো একসাথে রাখো।"],
            ], style: "read" },
          ], cols: ["56mm", "1fr"], mid: true },
          { u3sub: ["Exercise 2", "এক্সাস়াইজ় টূ", "ব্যায়াম ২"] },
          { u3grid: [
            { u3fig: "u3-l1-exercise-2", h: 70 },
            { lines: [
              ["Keep your head still.", "কীপ ইয়ো হেড স্টিল।", "মাথা স্থির রাখো।"],
              ["Face your palms outward.", "ফ়েইস় ইয়ো পামজ় আউটওয়াড।", "হাতের তালু বাইরের দিকে ফেরাও।"],
              ["Keep your arms upward.", "কীপ ইয়ো আমজ় আপওয়াড।", "হাত দুটো ওপরের দিকে রাখো।"],
              ["Keep your arms sideways.", "কীপ ইয়ো আমজ় স়াইডওয়েইজ়।", "হাত দুটো দুই পাশে ছড়িয়ে রাখো।"],
              ["Keep your arms downward.", "কীপ ইয়ো আমজ় ডাউনওয়াড।", "হাত দুটো নিচের দিকে রাখো।"],
              ["Keep your feet apart.", "কীপ ইয়ো ফ়ীট আপাট।", "পা দুটো ফাঁক করে রাখো।"],
            ], style: "read" },
          ], cols: ["56mm", "1fr"], mid: true },
        ] },
      ],
    },
    {
      page: 37, lesson: 1, title: ["Simple commands", "সহজ আদেশ"],
      blocks: [
        { k: "E", task: ["Now, complete the commands for the exercises shown in the picture. Then, in pairs, give and follow the commands.", "এবার, ছবিতে দেখানো ব্যায়ামের আদেশগুলো পূর্ণ করো। তারপর জোড়ায় জোড়ায় আদেশগুলো দাও আর মেনে চলো।"], parts: [
          { u3sub: ["Exercise 3", "এক্সাস়াইজ় থ়্রী", "ব্যায়াম ৩"] },
          { u3grid: [
            { u3fig: "u3-l1-exercise-3", h: 118 },
            { lines: [
              ["……………. your head upright.", "____ ইয়ো হেড আপরাইট।", "মাথা সোজা উঁচু করে ____।"],
              ["……………. at the front.", "____ অ্যাট দ়া ফ়্রান্ট।", "সামনের দিকে ____।"],
              ["……………. your back straight.", "____ ইয়ো ব্যাক স্ট্রেইট।", "পিঠ সোজা ____।"],
              ["……………. your hands on waist.", "____ ইয়ো হ্যান্ডজ় অন ওয়েইস্ট।", "হাত দুটো কোমরে ____।"],
              ["……………. your left leg forward.", "____ ইয়ো লেফ়্ট লেগ ফ়োওয়াড।", "বাঁ পা সামনের দিকে ____।"],
              ["……………. your right knee still.", "____ ইয়ো রাইট নী স্টিল।", "ডান হাঁটু স্থির ____।"],
            ], style: "read" },
          ], cols: ["80mm", "1fr"], mid: true },
        ] },
      ],
    },
    {
      page: 38, lesson: 2, title: ["Following and giving instructions", "নির্দেশ মানি আর নির্দেশ দিই"], dense: true,
      // the book's running head "English for Today" breaks into three lines on this page (En / glish for T / oday), so the
      // check's filter for it misses "En" and "oday"
      allow: { why: "the book's running head breaks oddly on this page (En / glish for T / oday)", missing: ["En", "oday"] },
      blocks: [
        { k: "A", task: ["Follow your teacher’s demonstration of how to make a simple kite. In your notebook take a brief note of the major steps shown by your teacher.", "শিক্ষক দেখাবেন কীভাবে একটি সহজ ঘুড়ি বানাতে হয়; তুমি তা দেখে দেখে করো। শিক্ষকের দেখানো প্রধান ধাপগুলো খাতায় সংক্ষেপে লিখে রাখো।"] },
        { k: "B", task: ["Read the instructions on how to make a simple kite. In small groups, one reads out the instructions and the others follow them to make the kite.", "সহজ ঘুড়ি বানানোর নির্দেশনাগুলো পড়ো। ছোট ছোট দলে একজন নির্দেশনাগুলো জোরে পড়বে, আর অন্যরা সেগুলো মেনে ঘুড়িটা বানাবে।"], parts: [
          { u3sub: ["Instructions for making a simple kite", "ইনস্ট্রাকশানজ় ফ়া মেইকিং আ স়িম্পল কাইট", "সহজ ঘুড়ি বানানোর নির্দেশনা"] },
          { u3grid: [
            { u3fig: "u3-l2-kite-step-1", h: 30, fit: "cover" },
            { lines: [
              ["1)", "Fold your A4 paper in half (like you are folding a card).", "ফ়োল্ড ইয়ো এই ফ়ো পেইপা ইন হাফ় (লাইক ইউ আ ফ়োল্ডিং আ কাড)।", "তোমার A4 কাগজটা মাঝখান দিয়ে অর্ধেক করে ভাঁজ করো (যেভাবে কার্ড ভাঁজ করো)।"],
              ["2)", "Take the top corner and place it on the opposite side.", "টেইক দ়া টপ কনা অ্যান্ড প্লেইস় ইট অন দ়ি অপাজ়িট স়াইড।", "ওপরের কোণটা নিয়ে উল্টো পাশে রাখো।"],
              ["3)", "Do the same on the other side.", "ডূ দ়া স়েইম অন দ়ি আদ়া স়াইড।", "অন্য পাশেও একই কাজ করো।"],
            ], marks: true },
            { u3fig: "u3-l2-kite-step-2", h: 30, fit: "cover" },
            { lines: [
              ["4)", "Staple them in place.", "স্টেইপল দ়েম ইন প্লেইস়।", "স্ট্যাপলার দিয়ে ওগুলো জায়গামতো আটকে দাও।"],
              ["5)", "Make a tail for your kite.", "মেইক আ টেইল ফ়া ইয়ো কাইট।", "তোমার ঘুড়ির জন্য একটা লেজ বানাও।"],
            ], marks: true },
            { u3fig: "u3-l2-kite-step-3", h: 30, fit: "cover" },
            { lines: [
              ["6)", "Put a hole punch around 1-2 cm from the staple and press to make a hole.", "পুট আ হোল পাঞ্চ আরাউন্ড ওয়ান টু টূ স়েন্টিমীটাজ় ফ়্রম দ়া স্টেইপল অ্যান্ড প্রেস় টু মেইক আ হোল।", "স্ট্যাপলের পিন থেকে ১-২ সেন্টিমিটার দূরে হোল পাঞ্চ বসাও আর চাপ দিয়ে একটা ছিদ্র করো।"],
              ["7)", "Thread the string through the hole and tie in place.", "থ়্রেড দ়া স্ট্রিং থ়্রূ দ়া হোল অ্যান্ড টাই ইন প্লেইস়।", "ছিদ্রের ভেতর দিয়ে সুতাটা ঢুকিয়ে জায়গামতো বেঁধে দাও।"],
            ], marks: true },
            { u3fig: "u3-l2-kite-step-4", h: 30, fit: "cover" },
            { lines: [
              ["8)", "Hold the end of the string and wave it around to fly it!", "হোল্ড দ়ি এন্ড অভ় দ়া স্ট্রিং অ্যান্ড ওয়েইভ় ইট আরাউন্ড টু ফ়্লাই ইট!", "সুতার মাথাটা ধরে চারদিকে দোলাও, আর ঘুড়িটা ওড়াও!"],
            ], marks: true },
          ], cols: ["36mm", "1fr"], mid: true },
        ] },
      ],
    },
    {
      page: 39, lesson: 2, title: ["Following and giving instructions", "নির্দেশ মানি আর নির্দেশ দিই"],
      blocks: [
        { k: "C", task: ["Project: Make your own kite at home following the instructions given earlier. You may decorate your kite with coloured papers, stickers and paint. You may also use one of the following samples for decorating your kite.", "প্রকল্প: আগের নির্দেশনা মেনে বাড়িতে নিজের একটা ঘুড়ি বানাও। রঙিন কাগজ, স্টিকার আর রং দিয়ে ঘুড়িটা সাজাতে পারো। ঘুড়ি সাজাতে নিচের নমুনাগুলোর যেকোনো একটাও ব্যবহার করতে পারো।"], parts: [
          { lines: [
            ["Bring your kite to the class on the day fixed by your teacher.", "", "শিক্ষক যেদিন ঠিক করে দেবেন, সেদিন তোমার ঘুড়িটা ক্লাসে নিয়ে এসো।"],
            ["Your school/class may organise a “Kite Festival” with all the kites made by you.", "", "তোমাদের বানানো সব ঘুড়ি নিয়ে তোমাদের স্কুল/ক্লাস একটা “ঘুড়ি উৎসব” করতে পারে।"],
          ] },
          { u3grid: [
            { u3fig: "u3-l2-kite-sample-1", h: 62, frame: false },
            { u3fig: "u3-l2-kite-sample-2", h: 62, frame: false },
          ], cols: ["1fr", "1fr"] },
          { u3fig: "u3-l2-kite-sample-3", h: 62, w: "80mm", center: true, frame: false },
        ] },
      ],
    },
    {
      page: 40, lesson: 3, title: ["Rhyme", "ছড়া"],
      blocks: [
        { k: "A", task: ["Listen to the rhyme and repeat after your teacher.", "ছড়াটি শোনো আর শিক্ষকের পরে পরে বলো।"], parts: [
          { u3sub: ["Hello Hello", "হ্যালো হ্যালো", "হ্যালো হ্যালো"], center: true },
          { u3grid: [
            [
              { lines: [
                ["Hello, hello.", "হ্যালো, হ্যালো।", "হ্যালো, হ্যালো।"],
                ["Can you clap your hands?", "ক্যান ইউ ক্ল্যাপ ইয়ো হ্যান্ডজ়?", "তুমি কি হাততালি দিতে পারো?"],
                ["Hello, hello.", "হ্যালো, হ্যালো।", "হ্যালো, হ্যালো।"],
                ["Can you clap your hands?", "ক্যান ইউ ক্ল্যাপ ইয়ো হ্যান্ডজ়?", "তুমি কি হাততালি দিতে পারো?"],
              ], style: "song" },
              { lines: [
                ["Can you stretch up high?", "ক্যান ইউ স্ট্রেচ আপ হাই?", "তুমি কি হাত টানটান করে ওপরে তুলতে পারো?"],
                ["Can you touch your toes?", "ক্যান ইউ টাচ ইয়ো টোজ়?", "তুমি কি পায়ের আঙুল ছুঁতে পারো?"],
                ["Can you turn around?", "ক্যান ইউ টান আরাউন্ড?", "তুমি কি এক পাক ঘুরতে পারো?"],
                ["Can you say, “ Hello”?", "ক্যান ইউ স়েই, “হ্যালো”?", "তুমি কি “হ্যালো” বলতে পারো?"],
              ], style: "song" },
              { lines: [
                ["Hello, hello.", "হ্যালো, হ্যালো।", "হ্যালো, হ্যালো।"],
                ["Can you stamp your feet?", "ক্যান ইউ স্ট্যাম্প ইয়ো ফ়ীট?", "তুমি কি পা ঠুকতে পারো?"],
                ["Hello, hello.", "হ্যালো, হ্যালো।", "হ্যালো, হ্যালো।"],
                ["Can you stamp your feet?", "ক্যান ইউ স্ট্যাম্প ইয়ো ফ়ীট?", "তুমি কি পা ঠুকতে পারো?"],
              ], style: "song" },
            ],
            [
              { lines: [
                ["Can you stretch up high?", "ক্যান ইউ স্ট্রেচ আপ হাই?", "তুমি কি হাত টানটান করে ওপরে তুলতে পারো?"],
                ["Can you touch your toes?", "ক্যান ইউ টাচ ইয়ো টোজ়?", "তুমি কি পায়ের আঙুল ছুঁতে পারো?"],
                ["Can you turn around?", "ক্যান ইউ টান আরাউন্ড?", "তুমি কি এক পাক ঘুরতে পারো?"],
                ["Can you say, “ Hello”?", "ক্যান ইউ স়েই, “হ্যালো”?", "তুমি কি “হ্যালো” বলতে পারো?"],
              ], style: "song" },
              { lines: [
                ["Hello, hello.", "হ্যালো, হ্যালো।", "হ্যালো, হ্যালো।"],
                ["Can you clap your hands?", "ক্যান ইউ ক্ল্যাপ ইয়ো হ্যান্ডজ়?", "তুমি কি হাততালি দিতে পারো?"],
                ["Hello, hello.", "হ্যালো, হ্যালো।", "হ্যালো, হ্যালো।"],
                ["Can you stamp your feet?", "ক্যান ইউ স্ট্যাম্প ইয়ো ফ়ীট?", "তুমি কি পা ঠুকতে পারো?"],
              ], style: "song" },
              { pic: "u3-l3-hello-hello" },
            ],
          ], cols: ["1fr", "1fr"] },
        ] },
      ],
    },
    {
      page: 41, lesson: 3, title: ["Rhyme", "ছড়া"],
      blocks: [
        { k: "B", task: ["Listen to each instruction given in the rhyme. In pairs, ask and answer the following question.", "ছড়ার প্রতিটি নির্দেশ শোনো। জোড়ায় জোড়ায় নিচের প্রশ্নটি জিজ্ঞেস করো আর উত্তর দাও।"], parts: [
          { lines: [
            ["A:", "Can you clap your hand?", "ক্যান ইউ ক্ল্যাপ ইয়ো হ্যান্ড?", "তুমি কি হাততালি দিতে পারো?"],
            ["B:", "(Claps) Yes, I can.", "(ক্ল্যাপস) ইয়েস়, আই ক্যান।", "(হাততালি দেয়) হ্যাঁ, পারি।"],
          ], marks: true, style: "read" },
          { note: {
            title: ["Grammar focus:", "ব্যাকরণ"],
            lines: [
              ["You may request someone to do something using the following structure-", "ইউ মেই রিকোয়েস্ট স়ামওয়ান টু ডূ স়ামথ়িং ইউজ়িং দ়া ফ়লোইং স্ট্রাকচা-", "কাউকে কিছু করতে অনুরোধ করতে চাইলে নিচের গঠনটি ব্যবহার করতে পারো-"],
              ["•", "Can you + verb (action word) + ……… + please ?", "ক্যান ইউ + ভ়াব (অ্যাকশান ওয়াড) + ____ + প্লীজ়?", "Can you + ক্রিয়া (কাজের শব্দ) + ____ + please?"],
              ["Examples:", "ইগজ়াম্পলজ়:", "উদাহরণ:"],
              ["•", "Can you open the door, please?", "ক্যান ইউ ওপান দ়া ডো, প্লীজ়?", "দরজাটা একটু খুলে দেবে, প্লিজ?"],
              ["•", "Can you move your seat, please?", "ক্যান ইউ মূভ় ইয়ো স়ীট, প্লীজ়?", "তোমার আসনটা একটু সরাবে, প্লিজ?"],
            ],
          } },
          // a spot picture for the foot of the page (PICTURE-PROMPTS-unit3.md section 4): the two children of activity B
          { u3fig: "u3-l3-spot", h: 62, w: "120mm", center: true, frame: false },
        ] },
      ],
    },
    {
      page: 42, lesson: 4, title: ["Following and giving instructions", "নির্দেশ মানি আর নির্দেশ দিই"], dense: true,
      blocks: [
        { k: "A", task: ["Follow your teacher as she/he shows you how to use a simple thermometer. Take note of all the important steps shown by your teacher.", "শিক্ষক দেখাবেন কীভাবে একটি সাধারণ থার্মোমিটার ব্যবহার করতে হয়; তুমি তা দেখে দেখে করো। শিক্ষকের দেখানো সব গুরুত্বপূর্ণ ধাপ লিখে রাখো।"] },
        { k: "B", task: ["Now, listen and read the instructions for using a simple thermometer.", "এবার, সাধারণ থার্মোমিটার ব্যবহারের নির্দেশনাগুলো শোনো আর পড়ো।"], parts: [
          { lines: [
            ["1)", "Shake the thermometer well.", "শেইক দ়া থ়ামমিটা ওয়েল।", "থার্মোমিটারটা ভালো করে ঝাঁকাও।"],
            ["2)", "Put the tip under your armpit.", "পুট দ়া টিপ আন্ডা ইয়ো আমপিট।", "থার্মোমিটারের মাথাটা বগলের নিচে রাখো।"],
            ["3)", "Make sure the thermometer is touching skin.", "মেইক শো দ়া থ়ামমিটা ইজ় টাচিং স্কিন।", "খেয়াল রাখো, থার্মোমিটারটা যেন চামড়া ছুঁয়ে থাকে।"],
            ["4)", "Press your arm to hold the thermometer.", "প্রেস় ইয়ো আম টু হোল্ড দ়া থ়ামমিটা।", "হাত চেপে থার্মোমিটারটা ধরে রাখো।"],
            ["5)", "Leave it there for 2 to 3 minutes.", "লীভ় ইট দ়েয়া ফ়া টূ টু থ়্রী মিনিটস।", "২ থেকে ৩ মিনিট ওভাবেই রেখে দাও।"],
            ["6)", "Remove the thermometer.", "রিমূভ় দ়া থ়ামমিটা।", "থার্মোমিটারটা বের করে নাও।"],
            ["7)", "Hold it at your eye level.", "হোল্ড ইট অ্যাট ইয়ো আই লেভ়াল।", "এটা চোখের সোজাসুজি ধরো।"],
            ["8)", "Follow mercury line that shows your temperature.", "ফ়লো মাকিউরি লাইন দ়্যাট শোজ় ইয়ো টেমপ্রাচা।", "পারদের যে দাগ তোমার তাপমাত্রা দেখায়, সেটা দেখো।"],
            ["9)", "Record the temperature and wash the thermometer.", "রিকড দ়া টেমপ্রাচা অ্যান্ড ওয়শ দ়া থ়ামমিটা।", "তাপমাত্রাটা লিখে রাখো আর থার্মোমিটারটা ধুয়ে ফেলো।"],
          ], marks: true },
          { u3fig: "u3-l4-thermometer", h: 30, w: "100mm", center: true, frame: false },
        ] },
        { k: "C", task: ["In pairs, tell your partner the steps for taking someone’s temperature using a simple thermometer.", "জোড়ায় জোড়ায়, সাধারণ থার্মোমিটার দিয়ে কারও তাপমাত্রা মাপার ধাপগুলো তোমার সঙ্গীকে বলো।"] },
      ],
    },
    {
      page: 43, lesson: 4, title: ["Following and giving instructions", "নির্দেশ মানি আর নির্দেশ দিই"], dense: true,
      blocks: [
        { k: "D", task: ["These are the instructions on a school library card. Some of the instructions are ‘Don’ts’ and others are ‘Dos’. Listen to the instructions and repeat after teacher.", "এগুলো স্কুল লাইব্রেরি কার্ডের নির্দেশনা। কিছু নির্দেশনা ‘যা করবে না’ (Don’ts), আর বাকিগুলো ‘যা করবে’ (Dos)। নির্দেশনাগুলো শোনো আর শিক্ষকের পরে পরে বলো।"], parts: [
          { lines: [
            ["1)", "Use the books with maximum care.", "ইউজ় দ়া বুকস উইদ় ম্যাকস়িমাম কেয়া।", "বইগুলো খুব যত্ন করে ব্যবহার করো।"],
            ["2)", "Please return the book timely.", "প্লীজ় রিটান দ়া বুক টাইমলি।", "দয়া করে সময়মতো বইটা ফেরত দাও।"],
            ["3)", "Don’t fold over the pages.", "ডোন্ট ফ়োল্ড ওভ়া দ়া পেইজিজ়।", "পাতাগুলো ভাঁজ করবে না।"],
            ["4)", "Don’t write inside a book.", "ডোন্ট রাইট ইনস়াইড আ বুক।", "বইয়ের ভেতরে কিছু লিখবে না।"],
            ["5)", "Always keep the book with face up.", "অলওয়েজ় কীপ দ়া বুক উইদ় ফ়েইস় আপ।", "সবসময় বইটা মলাট ওপরের দিকে রেখে রাখো।"],
            ["6)", "Don’t lose or damage a book.", "ডোন্ট লূজ় অ ড্যামিজ আ বুক।", "বই হারাবে না, নষ্টও করবে না।"],
            ["7)", "Pay your library fees regularly.", "পেই ইয়ো লাইব্রেরি ফ়ীজ় রেগিউলালি।", "লাইব্রেরির ফি নিয়মিত দাও।"],
          ], marks: true },
        ] },
        { k: "E", task: ["In pairs, use the table given below and list the above instructions under the headings ‘Dos’ and ‘Don’ts’.", "জোড়ায় জোড়ায় নিচের ছকটি ব্যবহার করো, আর ওপরের নির্দেশনাগুলো ‘Dos’ (যা করবে) আর ‘Don’ts’ (যা করবে না) শিরোনামের নিচে লেখো।"], parts: [
          { table: { head: [["Dos", "ডূজ়", "যা করবে"], ["Don’ts", "ডোন্টস", "যা করবে না"]], rows: [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]], w: [50, 50] } },
        ] },
      ],
    },
    {
      page: 44, lesson: 5, title: ["Making requests and responding properly", "অনুরোধ করি আর ঠিকভাবে উত্তর দিই"], dense: true,
      // the book prints the lesson's title on two lines ("Making requests and" / "responding properly"), so the check can't strip it
      allow: { why: "the book's lesson title runs over two lines, so the check can't strip it from the page's words", missing: ["Making", "requests", "and", "responding", "properly"] },
      blocks: [
        { k: "A", task: ["Look at the pictures and match each of them with a request given in the box.", "ছবিগুলো দেখো, আর প্রতিটি ছবিকে বক্সে দেওয়া একটি অনুরোধের সাথে মেলাও।"], parts: [
          // the book's own order: the pictures and the requests don't match row by row (that is the task)
          { u3grid: [
            { u3fig: "u3-l5-library", h: 33, fit: "cover" },
            { lines: [
              ["A:", "Hi! Can I have an orange juice, please?", "হাই! ক্যান আই হ্যাভ় অ্যান অরিঞ্জ জূস়, প্লীজ়?", "হাই! আমাকে একটা কমলার জুস দেবে, প্লিজ?"],
              ["B:", "Of course. I will make you one.", "অভ় কস। আই উইল মেইক ইউ ওয়ান।", "অবশ্যই। আমি তোমাকে একটা বানিয়ে দিচ্ছি।"],
            ], marks: true },
            { u3fig: "u3-l5-juice-stall", h: 33, fit: "cover" },
            { lines: [
              ["A:", "Hello, can I borrow your pencil, please?", "হ্যালো, ক্যান আই বরো ইয়ো পেনস়িল, প্লীজ়?", "হ্যালো, তোমার পেনসিলটা একটু ধার নিতে পারি, প্লিজ?"],
              ["B:", "Sure.", "শো।", "নিশ্চয়ই।"],
            ], marks: true },
            { u3fig: "u3-l5-asking-way", h: 33, fit: "cover" },
            { lines: [
              ["A:", "Excuse me. Can I borrow this book, please?", "ইকস্কিউজ় মী। ক্যান আই বরো দ়িস় বুক, প্লীজ়?", "শুনুন, এই বইটা কি ধার নিতে পারি, প্লিজ?"],
              ["B:", "Sorry, this book is not for borrowing.", "স়রি, দ়িস় বুক ইজ় নট ফ়া বরোইং।", "দুঃখিত, এই বইটা ধার দেওয়া হয় না।"],
            ], marks: true },
            { u3fig: "u3-l5-two-friends", h: 33, fit: "cover" },
            { lines: [
              ["A:", "Excuse me. Can you tell me the way to the Zainul Park, please?", "ইকস্কিউজ় মী। ক্যান ইউ টেল মী দ়া ওয়েই টু দ়া জ়য়নুল পাক, প্লীজ়?", "শুনুন, জয়নুল পার্কে যাওয়ার পথটা একটু বলবেন, প্লিজ?"],
              ["B:", "It’s on Kachari road, next to the big playground.", "ইটস অন কাচারি রোড, নেক্সট টু দ়া বিগ প্লেইগ্রাউন্ড।", "এটা কাচারি রোডে, বড় খেলার মাঠটার পাশে।"],
            ], marks: true },
          ], cols: ["50mm", "1fr"], rule: true, pair: true },
        ] },
        { k: "B", task: ["Now, in pairs, practise the dialogues given in activity A.", "এবার, জোড়ায় জোড়ায় A-এর সংলাপগুলো অনুশীলন করো।"] },
      ],
    },
    {
      page: 45, lesson: 5, title: ["Making requests and responding properly", "অনুরোধ করি আর ঠিকভাবে উত্তর দিই"], dense: true,
      allow: { why: "the book's lesson title runs over two lines, so the check can't strip it from the page's words", missing: ["Making", "requests", "and", "responding", "properly"] },
      blocks: [
        { k: "C", task: ["Match the requests (A) with suitable responses (B). Write the responses under the requests. One is done for you.", "অনুরোধগুলোর (A) সাথে মানানসই উত্তর (B) মেলাও। উত্তরগুলো অনুরোধের নিচে লেখো। একটি করে দেওয়া আছে।"], parts: [
          { u3grid: [
            { lines: [
              ["1. A:", "Could you please call me this evening?", "কুড ইউ প্লীজ় কল মী দ়িস় ঈভ়নিং?", "আজ সন্ধ্যায় আমাকে একটু ফোন করবে, প্লিজ?"],
              ["B:", "_Of course. I will call you around 6:00._", "অভ় কস। আই উইল কল ইউ আরাউন্ড স়িক্স আক্লক।", "অবশ্যই। আমি তোমাকে ৬টার দিকে ফোন করব।"],
            ], marks: true },
            { lines: [["Sorry. I have only one pen.", "স়রি। আই হ্যাভ় ওনলি ওয়ান পেন।", "দুঃখিত। আমার কাছে একটাই কলম আছে।"]] },
            { lines: [
              ["2. A:", "Can you repeat that, please?", "ক্যান ইউ রিপীট দ়্যাট, প্লীজ়?", "কথাটা আরেকবার বলবে, প্লিজ?"],
              ["B:", "_________________________________ .", "", ""],
            ], marks: true },
            { lines: [["Yes, please. I will see you at the library.", "ইয়েস়, প্লীজ়। আই উইল স়ী ইউ অ্যাট দ়া লাইব্রেরি।", "হ্যাঁ, অবশ্যই। লাইব্রেরিতে তোমার সাথে দেখা হবে।"]] },
            { lines: [
              ["3. A:", "Could I have a look at your newspaper?", "কুড আই হ্যাভ় আ লুক অ্যাট ইয়ো নিউজ়পেইপা?", "তোমার খবরের কাগজটা একটু দেখতে পারি?"],
              ["B:", "_________________________________ .", "", ""],
            ], marks: true },
            { lines: [["Sure. I am saying it again.", "শো। আই অ্যাম স়েইং ইট আগেন।", "নিশ্চয়ই। আমি আবার বলছি।"]] },
            { lines: [
              ["4. A:", "Can I borrow your pen, please?", "ক্যান আই বরো ইয়ো পেন, প্লীজ়?", "তোমার কলমটা একটু ধার নিতে পারি, প্লিজ?"],
              ["B:", "_________________________________ .", "", ""],
            ], marks: true },
            { lines: [["Sorry, but I am reading it now.", "স়রি, বাট আই অ্যাম রীডিং ইট নাউ।", "দুঃখিত, কিন্তু আমি এখন এটা পড়ছি।"]] },
            { lines: [
              ["5. A:", "Can we meet at the library?", "ক্যান উই মীট অ্যাট দ়া লাইব্রেরি?", "আমরা কি লাইব্রেরিতে দেখা করতে পারি?"],
              ["B:", "_________________________________ .", "", ""],
            ], marks: true },
            { lines: [["Of course. I will call you around 6:00.", "অভ় কস। আই উইল কল ইউ আরাউন্ড স়িক্স আক্লক।", "অবশ্যই। আমি তোমাকে ৬টার দিকে ফোন করব।"]] },
          ], cols: ["58fr", "42fr"], rule: true, mkw: 11, small: true,
          head: [["Requests (A)", "রিকোয়েস্টস (এই)", "অনুরোধ (A)"], ["Responses (B)", "রিস্পনস়িজ় (বী)", "উত্তর (B)"]] },
        ] },
        { k: "D", task: ["Guessing game", "অনুমানের খেলা"], parts: [
          { lines: [
            ["Play the game in pairs. Partner A will request B for something. She/he will use gestures/mime to make the request and must not speak out. Partner B will guess and follow the request. A and B take turns and continue.", "", "জোড়ায় জোড়ায় খেলাটি খেলো। সঙ্গী A, B-কে কিছু একটা করতে অনুরোধ করবে। সে মুখে কিছু বলবে না, অঙ্গভঙ্গি বা মূকাভিনয় করে অনুরোধ করবে। সঙ্গী B অনুমান করে অনুরোধটা মানবে। A আর B পালা করে খেলা চালিয়ে যাবে।"],
            ["Example: A may request B (through gestures/mimes) for borrowing his/her pen/book/khata (copy) etc. B will try to guess the request and act to follow it.", "", "উদাহরণ: A (অঙ্গভঙ্গি বা মূকাভিনয় করে) B-এর কাছে তার কলম/বই/খাতা ধার চাইতে পারে। B অনুরোধটা অনুমান করে সেটা মানার চেষ্টা করবে।"],
          ] },
        ] },
      ],
    },
    {
      page: 46, lesson: 6, title: ["Numbers 71-90", "সংখ্যা ৭১-৯০"],
      blocks: [
        { k: "A", task: ["Count, listen and say the numbers.", "গোনো, শোনো আর সংখ্যাগুলো বলো।"], parts: [
          // the book draws the pens, pencils and crayons and their numbers into its picture, so they aren't text there
          { u3count: [
            { thing: "pen", n: 75, answer: "75" },
            { thing: "pencil", n: 83, answer: "83" },
            { thing: "crayon", n: 90, answer: "90" },
          ], nocheck: true },
        ] },
        { k: "B", task: ["Read and say the numbers.", "সংখ্যাগুলো পড়ো আর বলো।"], parts: [
          // the book's number shapes are a picture
          { cards: Array.from({ length: 20 }, (_, i) => ({ n: String(71 + i) })), cols: 10, shape: "mixed", nocheck: true },
        ] },
        { k: "C", task: ["Game.", "খেলা।"], parts: [
          { lines: [
            ["Pairwork: Every student takes a number card or wooden or plastic number in figure from 0 to 9. Every pair makes a number (from 71 to 90) and say the number.", "", "জোড়ায় কাজ: প্রত্যেক শিক্ষার্থী ০ থেকে ৯-এর একটি সংখ্যা কার্ড, বা কাঠের বা প্লাস্টিকের একটি সংখ্যা নেয়। প্রতিটি জোড়া মিলে (৭১ থেকে ৯০-এর মধ্যে) একটি সংখ্যা বানায় আর সংখ্যাটি বলে।"],
            ["Continue……", "", "চালিয়ে যাও……"],
          ] },
        ] },
      ],
    },
    {
      page: 47, lesson: 6, title: ["Numbers 71-90", "সংখ্যা ৭১-৯০"],
      blocks: [
        { k: "D", task: ["Write the missing numbers.", "বাদ পড়া সংখ্যাগুলো লেখো।"], parts: [
          { boxes: ["□ 72 □", "□ 80 □", "□ 89 □", "□ 83 □", "□ 77 □", "□ 86 □"], cols: 3 },
        ] },
        { k: "E", task: ["Game: Pick up a number card from the basket and say the number.", "খেলা: ঝুড়ি থেকে একটি সংখ্যা কার্ড তুলে নাও আর সংখ্যাটি বলো।"], parts: [
          { u3fig: "u3-l6-number-basket", h: 50, w: "64mm", center: true, frame: false },
        ] },
        { k: "F", task: ["Rearrange the numbers.", "সংখ্যাগুলো ক্রম অনুযায়ী আবার সাজাও।"], parts: [
          // the book's number cards are a picture; its four columns, row by row
          { u3grid: [
            { cards: [71, 74, 86, 78, 77, 81, 75, 80, 83, 73, 82, 84, 90, 88, 89, 79, 72, 76, 87, 85].map((n) => ({ n: String(n) })), cols: 4, shape: "tag", nocheck: true },
          ], cols: ["120mm"], center: true },
          { lines: [["Continue (up to 90) …………", "", "এভাবে (৯০ পর্যন্ত) চালিয়ে যাও…………"]] },
        ] },
      ],
    },
  ],
};
