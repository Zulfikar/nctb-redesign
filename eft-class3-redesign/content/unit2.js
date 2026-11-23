// English for Today, Class Three (NCTB, 2025 reprint): Unit 2, printed pages 21–33, word for word as printed.
// Every English line the child reads or says is [english, hint, meaning]: the hint is the British English sound in Bangla
// letters, as the Let's Learn English books' British Bangla edition writes it (dotted letters for sounds Bangla doesn't
// have; plain ক, ট, প, which the builder puffs at the start of a word: টীচা → ঠীচা). An instruction is [english, meaning].
// A blank is a run of underscores, as printed; a picture is its file name in art/new/ (else art/stand-in/).
// The kinds named u2… are this unit's own (content/unit2.parts.js).
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => String(a + i));

module.exports = {
  unit: 2,
  title: ["My Friends, Family and Numbers", "আমার বন্ধু, পরিবার আর সংখ্যা"],
  pages: [
    {
      page: 21, lesson: 1, opener: true, title: ["Talking with friends", "বন্ধুদের সাথে কথা বলি"],
      // the book sets the unit's title on two lines ("My Friends, Family" / "and Numbers"), so the check can't take it out
      // of the book's words; ours is in the opener's header, above the body the check reads
      allow: { why: "the book's unit title is on two lines, so the check can't remove it; ours is in the opener's header", missing: ["My", "Friends", "Family", "and", "Numbers"] },
      blocks: [
        { k: "A", task: ["Read and say.", "পড়ো আর বলো।"], pic: "u2-l1-rishat-sujana", lines: [
          ["Rishat", "Hello, Sujana! How are you?", "হ্যালো, স়ুজানা! হাউ আ ইউ?", "হ্যালো, সুজানা! তুমি কেমন আছ?"],
          ["Sujana", "Fine, thanks. And you?", "ফ়াইন, থ়্যাংক্স। অ্যান্ড ইউ?", "ভালো আছি, ধন্যবাদ। আর তুমি?"],
          ["Rishat", "I’m fine too. Would you like to play with me?", "আইম ফ়াইন টূ। উড ইউ লাইক টু প্লেই উইদ় মী?", "আমিও ভালো আছি। তুমি কি আমার সাথে খেলবে?"],
          ["Sujana", "Yes, I’d like that, thank you.", "ইয়েস়, আইড লাইক দ়্যাট, থ়্যাংক ইউ।", "হ্যাঁ, খুব ভালো লাগবে, ধন্যবাদ।"],
        ] },
      ],
    },
    {
      page: 22, lesson: 1, title: ["Talking with friends", "বন্ধুদের সাথে কথা বলি"],
      blocks: [
        { k: "B", task: ["Listen and say.", "শোনো আর বলো।"], pic: "u2-l1-faria-farzana", lines: [
          ["Faria", "Hello! I’m Faria.", "হ্যালো! আইম ফ়ারিয়া।", "হ্যালো! আমি ফারিয়া।"],
          ["Farzana", "Hi, I’m Farzana. I’m a new student here.", "হাই, আইম ফ়ারজ়ানা। আইম আ নিউ স্টিউডান্ট হিয়া।", "হাই, আমি ফারজানা। আমি এখানে নতুন শিক্ষার্থী।"],
          ["Faria", "Where are you from, Farzana?", "ওয়েয়া আ ইউ ফ়্রম, ফ়ারজ়ানা?", "ফারজানা, তুমি কোথা থেকে এসেছ?"],
          ["Farzana", "I’m from Rajshahi. And you?", "আইম ফ়্রম রাজশাহী। অ্যান্ড ইউ?", "আমি রাজশাহী থেকে এসেছি। আর তুমি?"],
          ["Faria", "I’m from Sylhet. My family lives near the school.", "আইম ফ়্রম স়িলেট। মাই ফ়্যামিলি লিভ়জ় নিয়া দ়া স্কূল।", "আমি সিলেট থেকে এসেছি। আমার পরিবার স্কুলের কাছেই থাকে।"],
          ["Farzana", "My family also lives here.", "মাই ফ়্যামিলি অলস়ো লিভ়জ় হিয়া।", "আমার পরিবারও এখানে থাকে।"],
        ] },
        { k: "C", task: ["Act out the dialogue in activity A and B with your friend.", "A আর B-এর সংলাপ বন্ধুর সাথে অভিনয় করে দেখাও।"] },
      ],
    },
    {
      page: 23, lesson: 2, title: ["Numbers 31-50", "সংখ্যা ৩১-৫০"],
      blocks: [
        // the book draws A's numbers and B's number shapes as pictures, so they aren't text there
        { k: "A", task: ["Count, listen and say the numbers.", "গোনো, শোনো আর সংখ্যাগুলো বলো।"], parts: [
          { count: [
            { shape: "tri", n: 31, color: "#F59E0B", answer: "31" },
            { shape: "dot", n: 38, color: "#DC2626", answer: "38" },
            { shape: "sq", n: 47, color: "#16A34A", answer: "47" },
          ], nocheck: true },
        ] },
        { k: "B", task: ["Read and say the numbers.", "সংখ্যাগুলো পড়ো আর বলো।"], parts: [
          { cards: range(31, 50).map((n) => ({ n })), cols: 10, shape: "mixed", nocheck: true },
        ] },
        { k: "C", task: ["Game.", "খেলা।"], parts: [
          { lines: [
            ["Pairwork: Every student picks up a number card or wooden or plastic number in figure from 0 to 9. Now, in pairs, show two number cards together to make the numbers from 31 to 50.", "", "জোড়ায় কাজ: প্রত্যেক শিক্ষার্থী ০ থেকে ৯-এর একটি সংখ্যা কার্ড বা কাঠের বা প্লাস্টিকের সংখ্যা তুলে নেয়। এবার জোড়ায় জোড়ায় দুটি সংখ্যা কার্ড পাশাপাশি দেখিয়ে ৩১ থেকে ৫০ পর্যন্ত সংখ্যাগুলো বানাও।"],
            ["Continue……", "", "চালিয়ে যাও……"],
          ] },
        ] },
      ],
    },
    {
      page: 24, lesson: 2, title: ["Numbers 31-50", "সংখ্যা ৩১-৫০"],
      blocks: [
        // the book draws the stones and their two numbers (31, 50) as one picture, so they aren't text there
        { k: "D", task: ["Write the numbers. Two are done for you.", "সংখ্যাগুলো লেখো। দুটি করে দেওয়া আছে।"], parts: [
          { u2stones: { from: 31, to: 50, show: [31, 50], start: "u2-w-frog-green", end: "u2-w-frog-pink", h: 145 }, nocheck: true },
        ] },
        { k: "E", task: ["Write the missing numbers below.", "নিচে বাদ পড়া সংখ্যাগুলো লেখো।"], parts: [
          { lines: [
            ["31, 32, ______, ______, 35, ______, ______, ______, 39, 40,", "", ""],
            ["41, ______, ______, 44, ______, 46, ______, 48, ______, 50.", "", ""],
          ] },
        ] },
      ],
    },
    {
      page: 25, lesson: 2, title: ["Numbers 31-50", "সংখ্যা ৩১-৫০"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Read the dialogue of lesson 1, Activity B and complete the sentences.", "পাঠ ১-এর B কাজের সংলাপটি পড়ো আর বাক্যগুলো পূরণ করো।"], parts: [
          { items: [
            ["a.", "Farzana is a new ____________.", "ফ়ারজ়ানা ইজ় আ নিউ ____।", "ফারজানা একজন নতুন ____।"],
            ["b.", "She is from ____________.", "শী ইজ় ফ়্রম ____।", "সে ____ থেকে এসেছে।"],
            ["c.", "Faria is from ____________.", "ফ়ারিয়া ইজ় ফ়্রম ____।", "ফারিয়া ____ থেকে এসেছে।"],
            ["d.", "Her family lives near ____________.", "হা ফ়্যামিলি লিভ়জ় নিয়া ____।", "তার পরিবার ____-এর কাছে থাকে।"],
          ] },
        ] },
        { n: 2, task: ["Write the next number in the box below.", "নিচের বক্সে পরের সংখ্যাটি লেখো।"], parts: [
          { boxes: ["31 □ 33 □ 35 □ 37 □ 39 □", "41 □ 43 □ 45 □ 47 □ 49 □"], cols: 1 },
        ] },
        { n: 3, task: ["Write the previous and the next numbers.", "আগের আর পরের সংখ্যাগুলো লেখো।"], parts: [
          { boxes: ["□ 33 □", "□ 36 □", "□ 39 □", "□ 44 □", "□ 48 □"], cols: 3 },
        ] },
      ],
    },
    {
      page: 26, lesson: 3, title: ["My family", "আমার পরিবার"], dense: true,
      blocks: [
        { k: "A", task: ["Read and say.", "পড়ো আর বলো।"], parts: [
          { u2beside: { pic: "u2-l3-sabiha-family", side: "left", w: 29, parts: [
            { text: [
              ["I’m Sabiha.", "আইম স়াবিহা।", "আমি সাবিহা।"],
              ["I’m a student.", "আইম আ স্টিউডান্ট।", "আমি একজন শিক্ষার্থী।"],
              ["I’m in class three.", "আইম ইন ক্লাস় থ়্রী।", "আমি তৃতীয় শ্রেণিতে পড়ি।"],
              ["There are four members in my family.", "দ়েয়া আ ফ়ো মেম্বাজ় ইন মাই ফ়্যামিলি।", "আমাদের পরিবারে চারজন সদস্য।"],
              ["My father Mr. Aminul Islam is a teacher.", "মাই ফ়াদ়া মিস্টা আমিনুল ইস়লাম ইজ় আ টীচা।", "আমার বাবা আমিনুল ইসলাম একজন শিক্ষক।"],
              ["My mother Mrs. Afroza Begum is a banker.", "মাই মাদ়া মিস়িজ় আফ়রোজ়া বেগম ইজ় আ ব্যাংকা।", "আমার মা আফরোজা বেগম একজন ব্যাংকার।"],
              ["My brother is only one year old.", "মাই ব্রাদ়া ইজ় ওনলি ওয়ান ইয়া ওল্ড।", "আমার ভাইয়ের বয়স মাত্র এক বছর।"],
            ] },
          ] } },
        ] },
        // B's first sentence names the girl "Samia": it is meant to be false (she is Sabiha), so it is copied as printed
        { k: "B", task: ["Read the sentences. Write T for True and F for False.", "বাক্যগুলো পড়ো। সত্য হলে T, মিথ্যা হলে F লেখো।"], parts: [
          { u2tf: [
            ["1.", "The girl’s name is Samia. _____________", "দ়া গালজ় নেইম ইজ় স়ামিয়া।", "মেয়েটির নাম সামিয়া।"],
            ["2.", "She is in class three. _______________", "শী ইজ় ইন ক্লাস় থ়্রী।", "সে তৃতীয় শ্রেণিতে পড়ে।"],
            ["3.", "She is a student. _______________", "শী ইজ় আ স্টিউডান্ট।", "সে একজন শিক্ষার্থী।"],
            ["4.", "There are four members in her family. ____________", "দ়েয়া আ ফ়ো মেম্বাজ় ইন হা ফ়্যামিলি।", "তার পরিবারে চারজন সদস্য।"],
            ["5.", "Her brother is 3 years old. _____________", "হা ব্রাদ়া ইজ় থ়্রী ইয়াজ় ওল্ড।", "তার ভাইয়ের বয়স ৩ বছর।"],
          ], cols: 2 },
        ] },
        { k: "C", task: ["Pairwork: Ask and answer.", "জোড়ায় কাজ: প্রশ্ন করো আর উত্তর দাও।"], parts: [
          { items: [
            ["1.", "What is the girl’s name?", "ওয়ট ইজ় দ়া গালজ় নেইম?", "মেয়েটির নাম কী?"],
            ["2.", "How many members are there in her family?", "হাউ মেনি মেম্বাজ় আ দ়েয়া ইন হা ফ়্যামিলি?", "তার পরিবারে কতজন সদস্য?"],
            ["3.", "What does her mother do?", "ওয়ট ডাজ় হা মাদ়া ডূ?", "তার মা কী করেন?"],
            ["4.", "What does her father do?", "ওয়ট ডাজ় হা ফ়াদ়া ডূ?", "তার বাবা কী করেন?"],
            ["5.", "How old is her brother?", "হাউ ওল্ড ইজ় হা ব্রাদ়া?", "তার ভাইয়ের বয়স কত?"],
          ], cols: 2 },
        ] },
        { k: "D", task: ["Write three sentences about your family.", "তোমার পরিবার সম্পর্কে তিনটি বাক্য লেখো।"] },
      ],
    },
    {
      page: 27, lesson: 3, title: ["My family", "আমার পরিবার"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Match the phrases of column A with column B. One is done for you.", "A কলামের বাক্যাংশের সাথে B কলামের বাক্যাংশ মেলাও। একটি করে দেওয়া আছে।"], parts: [
          { u2match: { a: ["Column A", "", "কলাম A"], b: ["Column B", "", "কলাম B"],
            left: [["Sabiha", "স়া·*বি*·হা", "সাবিহা"], ["Her father", "হা ফ়াদ়া", "তার বাবা"], ["Her mother", "হা মাদ়া", "তার মা"], ["Her brother", "হা ব্রাদ়া", "তার ভাই"]],
            right: [["is a teacher.", "ইজ় আ টীচা।", "একজন শিক্ষক।"], ["is one year old.", "ইজ় ওয়ান ইয়া ওল্ড।", "এক বছর বয়সী।"], ["works in a bank.", "ওয়াকস ইন আ ব্যাংক।", "ব্যাংকে কাজ করেন।"], ["is a student.", "ইজ় আ স্টিউডান্ট।", "একজন শিক্ষার্থী।"]],
            done: [[0, 3]] } },
        ] },
        { n: 2, task: ["Read the following sentences. Put tick (√) mark to the right answer.", "নিচের বাক্যগুলো পড়ো। সঠিক উত্তরে টিক (√) চিহ্ন দাও।"], parts: [
          { u2tick: [
            ["a.", "Mr. Aminul Islam is a (teacher/banker).", "মিস্টা আমিনুল ইস়লাম ইজ় আ (টীচা/ব্যাংকা)।", "আমিনুল ইসলাম একজন (শিক্ষক/ব্যাংকার)।"],
            ["b.", "Sabiha is in class (three/four).", "স়াবিহা ইজ় ইন ক্লাস় (থ়্রী/ফ়ো)।", "সাবিহা (তৃতীয়/চতুর্থ) শ্রেণিতে পড়ে।"],
            ["c.", "She has a (brother/sister).", "শী হ্যাজ় আ (ব্রাদ়া/স়িস্টা)।", "তার একটি (ভাই/বোন) আছে।"],
            ["d.", "Sabiha’s mother is a (doctor/banker).", "স়াবিহাজ় মাদ়া ইজ় আ (ডক্টা/ব্যাংকা)।", "সাবিহার মা একজন (ডাক্তার/ব্যাংকার)।"],
            ["e.", "Sabiha’s family has (four/three) members.", "স়াবিহাজ় ফ়্যামিলি হ্যাজ় (ফ়ো/থ়্রী) মেম্বাজ়।", "সাবিহার পরিবারে (চার/তিন) জন সদস্য।"],
          ] },
        ] },
      ],
    },
    {
      page: 28, lesson: 4, title: ["Rhyme", "ছড়া"],
      blocks: [
        // "u2-down" (content/unit2.parts.js): the two columns read downwards, lines 1–6 then 7–12. The shared kind prints the
        // title without its guide; the hint and meaning are here for when it does. The rhyme's picture (the book prints the
        // rhyme over it) goes beside the Grammar focus at the foot of the page, where its house shows the words.
        { k: "A", task: ["Listen and read the rhyme below.", "শোনো আর নিচের ছড়াটি পড়ো।"], parts: [
          { lines: [
            ["It’s a house,", "ইটস আ হাউস়,", "এটা একটা বাড়ি,"],
            ["It’s a happy house,", "ইটস আ হ্যাপি হাউস়,", "এটা একটা খুশির বাড়ি,"],
            ["It’s a happy house,", "ইটস আ হ্যাপি হাউস়,", "এটা একটা খুশির বাড়ি,"],
            ["Can you see?", "ক্যান ইউ স়ী?", "দেখতে পাচ্ছ?"],
            ["Here’s a window,", "হিয়াজ় আ উইন্ডো,", "এই যে জানালা,"],
            ["Here’s a door,", "হিয়াজ় আ ডো,", "এই যে দরজা,"],
            ["Here’s a roof,", "হিয়াজ় আ রূফ়,", "এই যে ছাদ,"],
            ["And here’s a floor!", "অ্যান্ড হিয়াজ় আ ফ়্লো!", "আর এই যে মেঝে!"],
            ["It’s a house,", "ইটস আ হাউস়,", "এটা একটা বাড়ি,"],
            ["It’s a happy house,", "ইটস আ হ্যাপি হাউস়,", "এটা একটা খুশির বাড়ি,"],
            ["It’s a happy house,", "ইটস আ হ্যাপি হাউস়,", "এটা একটা খুশির বাড়ি,"],
            ["For you and me!", "ফ়া ইউ অ্যান্ড মী!", "তোমার আর আমার জন্য!"],
          ], style: "song u2-down", cols: 2, title: ["It’s a Happy House", "ইটস আ হ্যাপি হাউস়", "এটা একটা খুশির বাড়ি"] },
        ] },
        { k: "B", task: ["Draw a house in your notebook. Now recite the rhyme again and point to each part of the house when you say that.", "খাতায় একটি বাড়ি আঁকো। এবার ছড়াটি আবার বলো, আর বাড়ির যে অংশের নাম বলবে, তোমার আঁকা বাড়িতে সেই অংশটি আঙুল দিয়ে দেখাও।"] },
        { k: "C", task: ["Make a list of all the parts of a house in the rhyme. Can you add some more parts? Share your list with your friend.", "ছড়ায় বাড়ির যত অংশের নাম আছে, সবগুলোর একটি তালিকা বানাও। আরও কিছু অংশ যোগ করতে পারো? তোমার তালিকাটি বন্ধুকে দেখাও।"] },
        { parts: [
          { u2beside: { pic: "u2-l4-happy-house", side: "right", w: 40, oldPos: "90% 80%", parts: [
            { note: { title: ["Grammar focus:", "ব্যাকরণ"], lines: [
              ["It’s - It is, Here’s - Here is", "ইটস - ইট ইজ়, হিয়াজ় - হিয়া ইজ়", "It’s মানে It is, Here’s মানে Here is"],
              ["Pronoun: you, me, it", "প্রোনাউন: ইউ, মী, ইট", "সর্বনাম: তুমি, আমি, এটা"],
              ["Vocabulary: window, door, roof, floor, house, happy", "ভ়াক্যাবিউলারি: উইন্ডো, ডো, রূফ়, ফ়্লো, হাউস়, হ্যাপি", "শব্দভান্ডার: জানালা, দরজা, ছাদ, মেঝে, বাড়ি, খুশি"],
            ] } },
          ] } },
        ] },
      ],
    },
    {
      page: 29, lesson: 5, title: ["My friend", "আমার বন্ধু"],
      blocks: [
        { k: "A", task: ["Read and say.", "পড়ো আর বলো।"], pic: "u2-l5-football", parts: [
          { text: [
            ["I am Sunil.", "আই অ্যাম স়ুনীল।", "আমি সুনীল।"],
            ["I am eight years old.", "আই অ্যাম এইট ইয়াজ় ওল্ড।", "আমার বয়স আট বছর।"],
            ["I have many friends, and Rahat is my best friend.", "আই হ্যাভ় মেনি ফ়্রেন্ডজ়, অ্যান্ড রাহাত ইজ় মাই বেস্ট ফ়্রেন্ড।", "আমার অনেক বন্ধু আছে, আর রাহাত আমার সবচেয়ে ভালো বন্ধু।"],
            ["He is also eight years old.", "হী ইজ় অলস়ো এইট ইয়াজ় ওল্ড।", "ওর বয়সও আট বছর।"],
            ["He lives near my house and we go to the same school.", "হী লিভ়জ় নিয়া মাই হাউস় অ্যান্ড উই গো টু দ়া স়েইম স্কূল।", "ও আমার বাড়ির কাছে থাকে, আর আমরা একই স্কুলে যাই।"],
            ["Rahat is good at English.", "রাহাত ইজ় গুড অ্যাট ইংলিশ।", "রাহাত ইংরেজিতে ভালো।"],
            ["In the afternoon, we play football.", "ইন দ়ি আফ়টানূন, উই প্লেই ফ়ুটবল।", "বিকেলে আমরা ফুটবল খেলি।"],
          ] },
        ] },
        { k: "B", task: ["Pairwork: Ask and Answer.", "জোড়ায় কাজ: প্রশ্ন করো আর উত্তর দাও।"], parts: [
          { items: [
            ["1.", "How old is Sunil?", "হাউ ওল্ড ইজ় স়ুনীল?", "সুনীলের বয়স কত?"],
            ["2.", "What is his best friend’s name?", "ওয়ট ইজ় হিজ় বেস্ট ফ়্রেন্ডজ় নেইম?", "ওর সবচেয়ে ভালো বন্ধুর নাম কী?"],
            ["3.", "Where does Rahat live?", "ওয়েয়া ডাজ় রাহাত লিভ়?", "রাহাত কোথায় থাকে?"],
            ["4.", "What do they do in the afternoon?", "ওয়ট ডু দ়েই ডূ ইন দ়ি আফ়টানূন?", "বিকেলে ওরা কী করে?"],
          ], cols: 2 },
        ] },
      ],
    },
    {
      page: 30, lesson: 5, title: ["My friend", "আমার বন্ধু"], dense: true,
      blocks: [
        { k: "C", task: ["Answer the questions about your friend. Use complete sentences.", "তোমার বন্ধু সম্পর্কে প্রশ্নগুলোর উত্তর দাও। পূর্ণ বাক্যে লেখো।"], parts: [
          { items: [
            ["1.", "What is your friend’s name?", "ওয়ট ইজ় ইয়ো ফ়্রেন্ডজ় নেইম?", "তোমার বন্ধুর নাম কী?"],
            ["2.", "How old is your friend?", "হাউ ওল্ড ইজ় ইয়ো ফ়্রেন্ড?", "তোমার বন্ধুর বয়স কত?"],
            ["3.", "Do you go to the same school?", "ডু ইউ গো টু দ়া স়েইম স্কূল?", "তোমরা কি একই স্কুলে যাও?"],
            ["4.", "Do you play together?", "ডু ইউ প্লেই টুগেদ়া?", "তোমরা কি একসাথে খেলো?"],
            ["5.", "What game do you play?", "ওয়ট গেইম ডু ইউ প্লেই?", "তোমরা কী খেলা খেলো?"],
          ], answer: "line", cols: 2 },
        ] },
        { k: "D", task: ["Write four sentences about your friend.", "তোমার বন্ধু সম্পর্কে চারটি বাক্য লেখো।"] },
        { practise: true },
        { n: 1, task: ["Put tick (√) mark to the right answer.", "সঠিক উত্তরে টিক (√) চিহ্ন দাও।"], parts: [
          { u2tick: [
            ["a.", "Sunil is (seven years/eight years) old.", "স়ুনীল ইজ় (স়েভ়ান ইয়াজ়/এইট ইয়াজ়) ওল্ড।", "সুনীলের বয়স (সাত বছর/আট বছর)।"],
            ["b.", "Rahat is good at (Bangla/English).", "রাহাত ইজ় গুড অ্যাট (বাংলা/ইংলিশ)।", "রাহাত (বাংলায়/ইংরেজিতে) ভালো।"],
            ["c.", "They play (cricket/football).", "দ়েই প্লেই (ক্রিকিট/ফ়ুটবল)।", "ওরা (ক্রিকেট/ফুটবল) খেলে।"],
            ["d.", "In the afternoon, they (play/eat).", "ইন দ়ি আফ়টানূন, দ়েই (প্লেই/ঈট)।", "বিকেলে ওরা (খেলে/খায়)।"],
          ] },
        ] },
        { n: 2, task: ["Read activity A and complete the sentences.", "A কাজটি পড়ো আর বাক্যগুলো পূরণ করো।"], parts: [
          { items: [
            ["a.", "Sunil has many _____________ .", "স়ুনীল হ্যাজ় মেনি ____।", "সুনীলের অনেক ____ আছে।"],
            ["b.", "Rahat lives _____________ Sunil’s house.", "রাহাত লিভ়জ় ____ স়ুনীলজ় হাউস়।", "রাহাত সুনীলের বাড়ির ____ থাকে।"],
            ["c.", "They play _____________ in the afternoon.", "দ়েই প্লেই ____ ইন দ়ি আফ়টানূন।", "ওরা বিকেলে ____ খেলে।"],
          ] },
        ] },
      ],
    },
    {
      page: 31, lesson: 6, title: ["Numbers 51-70", "সংখ্যা ৫১-৭০"],
      blocks: [
        // the book draws A's numbers and B's number shapes as pictures, so they aren't text there
        { k: "A", task: ["Count, listen and say the numbers.", "গোনো, শোনো আর সংখ্যাগুলো বলো।"], parts: [
          { u2count: [
            { thing: "bug", n: 52, answer: "52" },
            { thing: "tennis", n: 59, answer: "59" },
            { thing: "beach", n: 70, answer: "70" },
          ], nocheck: true },
        ] },
        { k: "B", task: ["Listen, say and read the numbers.", "শোনো, বলো আর সংখ্যাগুলো পড়ো।"], parts: [
          { cards: range(51, 70).map((n) => ({ n })), cols: 10, shape: "mixed", nocheck: true },
        ] },
        { k: "C", task: ["Game.", "খেলা।"], parts: [
          { lines: [
            ["Pairwork: Every student takes a number card or wooden or plastic number in figure from 0 to 9. Every pair makes a number (from 51 to 70) and says the number.", "", "জোড়ায় কাজ: প্রত্যেক শিক্ষার্থী ০ থেকে ৯-এর একটি সংখ্যা কার্ড বা কাঠের বা প্লাস্টিকের সংখ্যা নেয়। প্রতিটি জোড়া মিলে (৫১ থেকে ৭০-এর মধ্যে) একটি সংখ্যা বানায় আর সংখ্যাটি বলে।"],
            ["Continue……", "", "চালিয়ে যাও……"],
          ] },
        ] },
      ],
    },
    {
      page: 32, lesson: 6, title: ["Numbers 51-70", "সংখ্যা ৫১-৭০"],
      // F's "52" (on the turtle's shell) is alone on its line in the book's text, so the check drops it as a page number
      allow: { why: "the book's 52 on the turtle stands alone on a line, which the check takes for a page number", extra: ["52"] },
      blocks: [
        // the book's dotted lines (50 …………..) are the places to write; here they are boxes
        { k: "D", task: ["Write the next numbers.", "পরের সংখ্যাগুলো লেখো।"], parts: [
          { boxes: ["50 □", "58 □", "54 □", "68 □", "62 □", "66 □", "64 □", "60 □", "52 □"], cols: 3 },
        ] },
        { k: "E", task: ["Say the numbers. How many even and odd numbers are there in the circles? Colour the even numbers in the circle.", "সংখ্যাগুলো বলো। বৃত্তগুলোতে কয়টি জোড় আর কয়টি বিজোড় সংখ্যা আছে? বৃত্তের জোড় সংখ্যাগুলোতে রং করো।"], parts: [
          { u2rings: ["62", "51", "70", "56", "69", "55", "67", "52", "63", "66", "65", "53", "57", "68", "61"], cols: 5 },
        ] },
        { k: "F", task: ["Write the even numbers from 51 to 70. One is done for you. Colour the turtle.", "৫১ থেকে ৭০ পর্যন্ত জোড় সংখ্যাগুলো লেখো। একটি করে দেওয়া আছে। কচ্ছপটিতে রং করো।"], parts: [
          { u2beside: { pic: "u2-l6-turtle", outline: true, side: "left", w: 48, parts: [
            { u2shell: ["52", "", "", "", "", "", "", "", "", ""], cols: 5 },
          ] } },
        ] },
      ],
    },
    {
      page: 33, lesson: 6, title: ["Numbers 51-70", "সংখ্যা ৫১-৭০"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Write the missing numbers.", "বাদ পড়া সংখ্যাগুলো লেখো।"], parts: [
          { lines: [
            ["______ 53, ______ 55, ______ 57, ______ 59, ______ 61,", "", ""],
            ["______ 63, ______ 65, ______ 67, ______ 69.", "", ""],
          ] },
        ] },
        { n: 2, task: ["Write even and odd numbers from 51-70. One is done for you.", "৫১-৭০ পর্যন্ত জোড় আর বিজোড় সংখ্যাগুলো লেখো। একটি করে দেওয়া আছে।"], parts: [
          { table: { w: [30, 14, 14, 14, 14, 14], rows: [
            [["Odd number", "অড নাম্বা", "বিজোড় সংখ্যা"], "51", "", "", "", ""],
            [["Even number", "ঈভ়ান নাম্বা", "জোড় সংখ্যা"], "52", "", "", "", ""],
          ] } },
          { gap: 3 },
          { table: { w: [30, 14, 14, 14, 14, 14], rows: [
            [["Odd number", "অড নাম্বা", "বিজোড় সংখ্যা"], "61", "", "", "", ""],
            [["Even number", "ঈভ়ান নাম্বা", "জোড় সংখ্যা"], "62", "", "", "", ""],
          ] } },
        ] },
      ],
    },
  ],
};
