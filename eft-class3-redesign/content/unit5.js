// English for Today, Class Three (NCTB, 2025 reprint): Unit 5, printed pages 65–82, word for word as printed (the book's own
// slips too: "litchies", "chilly", "parble", "mommy"; they are listed in the report to Claude). Every English line the child reads, says
// or writes is [english, hint, meaning]: the hint is the British English sound in Bangla letters, as the Let's Learn
// English books' British Bangla edition writes it (dotted letters for sounds Bangla doesn't have; plain ক, ট, প, which the
// builder puffs at the start of a word). An instruction is [english, meaning]; a long one for the class (a project, a
// game, the grammar boxes' rules, the rhyme's note) is [english, "", meaning]. Names keep their Bangla spelling, dotted
// where English says the sound (স়ুরমা, ওস়মান, ফ়ুলবাড়ি), and get no syllable marks.
// A jumbled line's meaning is the meaning of the sentence it makes. Pictures: art/new/<name>.png, else art/stand-in/.
// The unit's own kinds (u5wrap, u5beside, u5tf, u5label, u5circle, u5head) are in unit5.parts.js; u5wrap's looks (flow,
// cells, opts3, small…) set the crowded pages compactly, so every word and its guide fit.
const NOUN_TABLE = (rows) => ({ u5wrap: { table: { head: [["Noun", "নাউন", "বিশেষ্য"], ["Pronoun", "*প্রো*·নাউন", "সর্বনাম"], ["Verb", "ভ়াব", "ক্রিয়া"]], rows, w: [33.3, 33.3, 33.4] } }, ulook: "cells" });
const EMPTY3 = ["", "", ""];

module.exports = {
  unit: 5,
  title: ["Their Days", "ওদের দিনগুলো"],
  pages: [
    // ── Lesson 1: Joyful school time 1 ──
    {
      page: 65, lesson: 1, opener: true, dense: true, title: ["Joyful school time 1", "আনন্দের স্কুলবেলা ১"],
      blocks: [
        { k: "A", task: ["Look at the pictures. What are they doing?", "ছবিগুলো দেখো। ওরা কী করছে?"], parts: [
          { pics: [
            { name: "u5-l1-clean-ground", label: "a" },
            { name: "u5-l1-clean-garden", label: "b" },
            { name: "u5-l1-wash-block", label: "c" },
            { name: "u5-l1-clean-classroom", label: "d" },
          ], cols: 4, h: 29 },
        ] },
        { k: "B", task: ["Read the following text.", "নিচের লেখাটি পড়ো।"], parts: [
          { u5wrap: { text: [
            ["Porshi lives in Kushtia.", "পর্শী লিভ়জ় ইন কুষ্টিয়া।", "পর্শী কুষ্টিয়ায় থাকে।"],
            ["She goes to Chechua Government Primary School.", "শী গোজ় টু চেচুয়া গাভ়ানমান্ট প্রাইমারি স্কূল।", "সে চেচুয়া সরকারি প্রাথমিক বিদ্যালয়ে পড়ে।"],
            ["She is in class three.", "শী ইজ় ইন ক্লাস় থ়্রী।", "সে তৃতীয় শ্রেণিতে পড়ে।"],
            ["There are some student groups in the school.", "দ়েয়া আ স়াম স্টিউডান্ট গ্রূপস ইন দ়া স্কূল।", "স্কুলে শিক্ষার্থীদের কয়েকটি দল আছে।"],
            ["Every group includes students of classes three, four and five.", "এভ়রি গ্রূপ ইনক্লূডজ় স্টিউডান্টস অভ় ক্লাস়িজ় থ়্রী, ফ়ো অ্যান্ড ফ়াইভ়।", "প্রতিটি দলে তৃতীয়, চতুর্থ আর পঞ্চম শ্রেণির শিক্ষার্থীরা থাকে।"],
            ["A teacher leads a group.", "আ টীচা লীডজ় আ গ্রূপ।", "একজন শিক্ষক একটি দল চালান।"],
            ["The Headteacher also leads a group and supervises others.", "দ়া হেডটীচা অলস়ো লীডজ় আ গ্রূপ অ্যান্ড স়ূপাভ়াইজ়িজ় আদ়াজ়।", "প্রধান শিক্ষকও একটি দল চালান আর অন্য দলগুলোর দেখাশোনা করেন।"],
            ["Every Thursday, the groups clean the school by turns.", "এভ়রি থ়াজ়ডেই, দ়া গ্রূপস ক্লীন দ়া স্কূল বাই টানজ়।", "প্রতি বৃহস্পতিবার দলগুলো পালা করে স্কুল পরিষ্কার করে।"],
            ["They clean the play ground, wash block, classrooms, the garden, etc.", "দ়েই ক্লীন দ়া প্লেই গ্রাউন্ড, ওয়শ ব্লক, ক্লাস়রূমজ়, দ়া গাডান, এট স়েটরা।", "তারা খেলার মাঠ, হাত-মুখ ধোয়ার ঘর, শ্রেণিকক্ষ, বাগান ইত্যাদি পরিষ্কার করে।"],
            ["They always use bins.", "দ়েই অলওয়েজ় ইউজ় বিনজ়।", "তারা সবসময় ময়লার ঝুড়ি ব্যবহার করে।"],
            ["Students help each other.", "স্টিউডান্টস হেল্প ঈচ আদ়া।", "শিক্ষার্থীরা একে অন্যকে সাহায্য করে।"],
            ["Porshi joins one of the groups and enjoys the cleaning activities.", "পর্শী জয়নজ় ওয়ান অভ় দ়া গ্রূপস অ্যান্ড ইনজয়জ় দ়া ক্লীনিং অ্যাকটিভ়াটিজ়।", "পর্শী একটি দলে যোগ দেয় আর পরিষ্কারের কাজগুলো উপভোগ করে।"],
          ], caps: true }, ulook: "tight" },
        ] },
      ],
    },
    {
      page: 66, lesson: 1, dense: true, title: ["Joyful school time 1", "আনন্দের স্কুলবেলা ১"],
      blocks: [
        // the book colours the groups' capitals, and the capitals of the grammar box's examples
        { parts: [
          { u5wrap: { table: {
            head: [["group name", "গ্রূপ নেইম", "দলের নাম"], ["week", "উইক", "সপ্তাহ"], ["area", "*এয়া*·রি·য়া", "জায়গা"]],
            rows: [
              [["Padma", "পদ্মা", "পদ্মা"], ["1st", "ফ়াস্ট", "প্রথম"], ["classroom", "*ক্লাস়*·রূম", "শ্রেণিকক্ষ"]],
              [["Meghna", "মেঘনা", "মেঘনা"], ["2nd", "*স়ে*·কান্ড", "দ্বিতীয়"], ["play ground", "প্লেই গ্রাউন্ড", "খেলার মাঠ"]],
              [["Jamuna", "যমুনা", "যমুনা"], ["3rd", "থ়াড", "তৃতীয়"], ["wash block", "ওয়শ ব্লক", "হাত-মুখ ধোয়ার ঘর"]],
              [["Surma", "স়ুরমা", "সুরমা"], ["4th", "ফ়োথ়", "চতুর্থ"], ["garden", "*গা*·ডান", "বাগান"]],
            ], w: [34, 30, 36] } }, ucaps: ["Padma", "Meghna", "Jamuna", "Surma"], ulook: "cells small" },
          { u5wrap: { note: { title: ["Grammar focus:", "ব্যাকরণের কথা:"], lines: [
            ["We use capital letter for the first letter in the names of the persons, places and things. We also use capital letter for the first letter of the first word in a sentence and also the name of the days.", "", "মানুষ, জায়গা আর জিনিসের নামের প্রথম অক্ষর আমরা বড় হাতের অক্ষরে (capital letter) লিখি। বাক্যের প্রথম শব্দের প্রথম অক্ষর আর দিনের নামের প্রথম অক্ষরও বড় হাতের অক্ষরে লিখি।"],
            ["Example: Porshi lives in Kushtia. She loves her school.", "ইগজ়াম্পল: পর্শী লিভ়জ় ইন কুষ্টিয়া। শী লাভ়জ় হা স্কূল।", "উদাহরণ: পর্শী কুষ্টিয়ায় থাকে। সে তার স্কুলকে ভালোবাসে।"],
            ["Every Thursday they clean the school.", "এভ়রি থ়াজ়ডেই দ়েই ক্লীন দ়া স্কূল।", "প্রতি বৃহস্পতিবার তারা স্কুল পরিষ্কার করে।"],
          ] } }, ucaps: ["Porshi", "Kushtia", "She", "Every", "Thursday"], ubold: ["Example:"], ulook: "plain small flow" },
        ] },
        { k: "C", task: ["Ask and answer the following questions.", "নিচের প্রশ্নগুলো জিজ্ঞেস করো আর উত্তর দাও।"], parts: [
          { u5wrap: { items: [
            ["1.", "Where does Porshi live?", "ওয়েয়া ডাজ় পর্শী লিভ়?", "পর্শী কোথায় থাকে?"],
            ["2.", "What does Padma group clean in the 1st week?", "ওয়ট ডাজ় পদ্মা গ্রূপ ক্লীন ইন দ়া ফ়াস্ট উইক?", "প্রথম সপ্তাহে পদ্মা দল কী পরিষ্কার করে?"],
            ["3.", "Who supervises the groups of students?", "হূ স়ূপাভ়াইজ়িজ় দ়া গ্রূপস অভ় স্টিউডান্টস?", "শিক্ষার্থীদের দলগুলোর দেখাশোনা কে করেন?"],
            ["4.", "When does Surma group clean garden?", "ওয়েন ডাজ় স়ুরমা গ্রূপ ক্লীন গাডান?", "সুরমা দল কখন বাগান পরিষ্কার করে?"],
            ["5.", "How many classes are there in a group of students?", "হাউ মেনি ক্লাস়িজ় আ দ়েয়া ইন আ গ্রূপ অভ় স্টিউডান্টস?", "শিক্ষার্থীদের একটি দলে কয়টি শ্রেণি থাকে?"],
          ] }, ulook: "flow small" },
        ] },
        { k: "D", task: ["Fill in the blanks with the words from the boxes.", "বক্সের শব্দগুলো দিয়ে খালি জায়গাগুলো পূরণ করো।"], parts: [
          { u5wrap: { words: [["love", "লাভ়", "ভালোবাসা"], ["teacher", "*টী*·চা", "শিক্ষক"], ["roof", "রূফ়", "ছাদ"], ["3rd", "থ়াড", "তৃতীয়"], ["primary", "*প্রাই*·মা·রি", "প্রাথমিক"], ["Jamuna", "যমুনা", "যমুনা"], ["2nd", "*স়ে*·কান্ড", "দ্বিতীয়"]] }, ulook: "chips small" },
          { u5wrap: { items: [
            ["1.", "Porshi goes to a …………............ school.", "পর্শী গোজ় টু আ …… স্কূল।", "পর্শী একটি …… বিদ্যালয়ে যায়।"],
            ["2.", "A ……………… leads a students’ group.", "আ …… লীডজ় আ স্টিউডান্টস গ্রূপ।", "একজন …… শিক্ষার্থীদের একটি দল চালান।"],
            ["3.", "In the ………. week, ……… group cleans the wash block.", "ইন দ়া …… উইক, …… গ্রূপ ক্লীনজ় দ়া ওয়শ ব্লক।", "…… সপ্তাহে …… দল হাত-মুখ ধোয়ার ঘর পরিষ্কার করে।"],
            ["4.", "I like the …………. garden.", "আই লাইক দ়া …… গাডান।", "আমার …… বাগানটি ভালো লাগে।"],
            ["5.", "Do the students …………. their school?", "ডু দ়া স্টিউডান্টস …… দ়েয়া স্কূল?", "শিক্ষার্থীরা কি তাদের স্কুলকে ……?"],
          ] }, ulook: "flow small" },
        ] },
      ],
    },
    {
      page: 67, lesson: 1, dense: true, title: ["Joyful school time 1", "আনন্দের স্কুলবেলা ১"],
      blocks: [
        { k: "E", task: ["Project work: Make a cleanliness plan for yourself and share with others. One is done for you.", "প্রজেক্টের কাজ: নিজের জন্য পরিষ্কার-পরিচ্ছন্নতার একটি পরিকল্পনা বানাও আর অন্যদের সাথে ভাগ করে নাও। একটি করে দেওয়া আছে।"], parts: [
          { u5wrap: { table: {
            head: [["week", "উইক", "সপ্তাহ"], ["day", "ডেই", "দিন"], ["clean", "ক্লীন", "পরিষ্কার করব"]],
            rows: [[["1st", "ফ়াস্ট", "প্রথম"], ["Friday", "*ফ়্রাই*·ডেই", "শুক্রবার"], ["dress", "ড্রেস়", "জামা"]], EMPTY3, EMPTY3, EMPTY3],
            w: [33.3, 33.3, 33.4] } }, ulook: "cells" },
        ] },
        { practise: true },
        { n: 1, task: ["Read the sentences. Write True or False.", "বাক্যগুলো পড়ো। ঠিক হলে True, ভুল হলে False লেখো।"], parts: [
          { u5tf: [
            ["a.", "Porshi lives in Jashore. ______________", "পর্শী লিভ়জ় ইন যশোর।", "পর্শী যশোরে থাকে।"],
            ["b.", "Students assist each other. ______________", "স্টিউডান্টস আস়িস্ট ঈচ আদ়া।", "শিক্ষার্থীরা একে অন্যকে সাহায্য করে।"],
            ["c.", "The Head teacher guides the students. ______________", "দ়া হেড টীচা গাইডজ় দ়া স্টিউডান্টস।", "প্রধান শিক্ষক শিক্ষার্থীদের পথ দেখান।"],
            ["d.", "Students rarely use bin. ______________", "স্টিউডান্টস রেয়ালি ইউজ় বিন।", "শিক্ষার্থীরা খুব কমই ময়লার ঝুড়ি ব্যবহার করে।"],
            ["e.", "Porshi likes the cleaning activities. ______________", "পর্শী লাইকস দ়া ক্লীনিং অ্যাকটিভ়াটিজ়।", "পর্শী পরিষ্কারের কাজগুলো পছন্দ করে।"],
          ] },
        ] },
        { n: 2, task: ["Use capital letters where necessary.", "যেখানে দরকার, সেখানে বড় হাতের অক্ষর (capital letter) ব্যবহার করো।"], parts: [
          { u5wrap: { text: [
            ["kamal is jamal’s elder brother.", "কামাল ইজ় জামালজ় এলডা ব্রাদ়া।", "কামাল জামালের বড় ভাই।"],
            ["they live in dinajpur.", "দ়েই লিভ় ইন দিনাজপুর।", "তারা দিনাজপুরে থাকে।"],
            ["the litchies of dinajpur are famous in bangladesh.", "দ়া লীচিজ় অভ় দিনাজপুর আ ফ়েইমাস় ইন ব্যাংলাডেশ।", "দিনাজপুরের লিচু বাংলাদেশে বিখ্যাত।"],
          ] }, ulook: "tight" },
          { write: 2 },
        ] },
      ],
    },
    // ── Lesson 2: Joyful school time 2 ──
    {
      page: 68, lesson: 2, dense: true, title: ["Joyful school time 2", "আনন্দের স্কুলবেলা ২"],
      blocks: [
        { k: "A", task: ["Look at the pictures. What are they doing?", "ছবিগুলো দেখো। ওরা কী করছে?"], parts: [
          { pics: [
            { name: "u5-l2-garden-lesson", label: "a" },
            { name: "u5-l2-video-lesson", label: "b" },
            { name: "u5-l2-playing", label: "c" },
            { name: "u5-l2-library", label: "d" },
          ], cols: 4, h: 31 },
        ] },
        // the book colours only the capitals of the two days
        { k: "B", task: ["Read the following text.", "নিচের লেখাটি পড়ো।"], parts: [
          { u5wrap: { text: [
            ["Rani and Porshi are neighbours.", "রানী অ্যান্ড পর্শী আ নেইবাজ়।", "রানী আর পর্শী প্রতিবেশী।"],
            ["Rani is a special need student.", "রানী ইজ় আ স্পেশাল নীড স্টিউডান্ট।", "রানী একজন বিশেষ চাহিদাসম্পন্ন শিক্ষার্থী।"],
            ["Every day, she goes to school with Porshi.", "এভ়রি ডেই, শী গোজ় টু স্কূল উইদ় পর্শী।", "প্রতিদিন সে পর্শীর সাথে স্কুলে যায়।"],
            ["They are attentive in the class.", "দ়েই আ আটেনটিভ় ইন দ়া ক্লাস়।", "ক্লাসে তারা মনোযোগী।"],
            ["Every Sunday, students change their seats.", "এভ়রি স়ান্ডেই, স্টিউডান্টস চেইঞ্জ দ়েয়া স়ীটস।", "প্রতি রবিবার শিক্ষার্থীরা বসার জায়গা বদলায়।"],
            ["But Rani always sits in the same chair.", "বাট রানী অলওয়েজ় স়িটস ইন দ়া স়েইম চেয়া।", "কিন্তু রানী সবসময় একই চেয়ারে বসে।"],
            ["The students follow the sitting plan in the class.", "দ়া স্টিউডান্টস ফ়লো দ়া স়িটিং প্ল্যান ইন দ়া ক্লাস়।", "ক্লাসে শিক্ষার্থীরা বসার নিয়ম মেনে চলে।"],
            ["Rani and her friends enjoy their classes.", "রানী অ্যান্ড হা ফ়্রেন্ডজ় ইনজয় দ়েয়া ক্লাস়িজ়।", "রানী আর তার বন্ধুরা ক্লাসগুলো উপভোগ করে।"],
            ["They like group work, pairwork, roleplay, project work, etc. in the classes.", "দ়েই লাইক গ্রূপ ওয়াক, পেয়াওয়াক, রোলপ্লেই, প্রজেক্ট ওয়াক, এট স়েটরা ইন দ়া ক্লাস়িজ়।", "ক্লাসে দলের কাজ, জোড়ায় কাজ, অভিনয়, প্রজেক্টের কাজ ইত্যাদি তাদের ভালো লাগে।"],
            ["Sometimes, teachers give lessons outside the classroom.", "স়ামটাইমজ়, টীচাজ় গিভ় লেস়ানজ় আউটস়াইড দ়া ক্লাস়রূম।", "মাঝে মাঝে শিক্ষকেরা শ্রেণিকক্ষের বাইরে পাঠ দেন।"],
            ["Rani joins these classes in a wheel chair.", "রানী জয়নজ় দ়ীজ় ক্লাস়িজ় ইন আ উইল চেয়া।", "রানী হুইলচেয়ারে করে এই ক্লাসগুলোতে যোগ দেয়।"],
            ["Rani and her friends enjoy these classes very much.", "রানী অ্যান্ড হা ফ়্রেন্ডজ় ইনজয় দ়ীজ় ক্লাস়িজ় ভ়েরি মাচ।", "রানী আর তার বন্ধুরা এই ক্লাসগুলো খুব উপভোগ করে।"],
            ["They also like audio and video clips which are used in the classes.", "দ়েই অলস়ো লাইক অডিও অ্যান্ড ভ়িডিও ক্লিপস উইচ আ ইউজ়ড ইন দ়া ক্লাস়িজ়।", "ক্লাসে যে অডিও আর ভিডিও ক্লিপ দেখানো হয়, সেগুলোও তাদের ভালো লাগে।"],
            ["Every Thursday, students borrow story books from the school library.", "এভ়রি থ়াজ়ডেই, স্টিউডান্টস বরো স্টোরি বুকস ফ়্রম দ়া স্কূল লাইব্রেরি।", "প্রতি বৃহস্পতিবার শিক্ষার্থীরা স্কুলের লাইব্রেরি থেকে গল্পের বই ধার নেয়।"],
          ] }, ucaps: ["Sunday", "Thursday"], ulook: "tight" },
        ] },
      ],
    },
    {
      page: 69, lesson: 2, dense: true, title: ["Joyful school time 2", "আনন্দের স্কুলবেলা ২"],
      blocks: [
        { k: "C", task: ["Read the text in activity B again. Ask and answer the following questions. Now write the answers.", "B কাজের লেখাটি আবার পড়ো। নিচের প্রশ্নগুলো জিজ্ঞেস করো আর উত্তর দাও। এবার উত্তরগুলো লেখো।"], parts: [
          { u5wrap: { items: [
            ["1.", "Who is a special need student?", "হূ ইজ় আ স্পেশাল নীড স্টিউডান্ট?", "বিশেষ চাহিদাসম্পন্ন শিক্ষার্থী কে?"],
            ["2.", "How does Rani join lessons outside the classroom?", "হাউ ডাজ় রানী জয়ন লেস়ানজ় আউটস়াইড দ়া ক্লাস়রূম?", "রানী কীভাবে শ্রেণিকক্ষের বাইরের পাঠে যোগ দেয়?"],
            ["3.", "Where do the students borrow story books from?", "ওয়েয়া ডু দ়া স্টিউডান্টস বরো স্টোরি বুকস ফ়্রম?", "শিক্ষার্থীরা কোথা থেকে গল্পের বই ধার নেয়?"],
            ["4.", "Why do you read story books?", "ওয়াই ডু ইউ রীড স্টোরি বুকস?", "তুমি কেন গল্পের বই পড়ো?"],
          ] }, ulook: "flow" },
        ] },
        { parts: [
          { u5wrap: { note: { title: ["Grammar focus:", "ব্যাকরণের কথা:"], lines: [
            ["Noun: A noun is a word that represents a person, place, thing etc.", "", "Noun (বিশেষ্য): যে শব্দ কোনো মানুষ, জায়গা, জিনিস ইত্যাদির নাম বোঝায়, তা-ই noun।"],
            ["Example: Porshi, Kushtia, Padma, Book, etc.", "ইগজ়াম্পল: পর্শী, কুষ্টিয়া, পদ্মা, বুক, এট স়েটরা।", "উদাহরণ: পর্শী, কুষ্টিয়া, পদ্মা, বই ইত্যাদি।"],
            ["Pronoun: A pronoun is a word that is used to replace or refer to a noun in a sentence.", "", "Pronoun (সর্বনাম): বাক্যে কোনো noun-এর বদলে যে শব্দ বসে বা noun-টিকে বোঝায়, তা-ই pronoun।"],
            ["Example: He, She, They, It, etc.", "ইগজ়াম্পল: হী, শী, দ়েই, ইট, এট স়েটরা।", "উদাহরণ: সে (ছেলে), সে (মেয়ে), তারা, এটি ইত্যাদি।"],
            ["Verb: A verb is a word that expresses an action.", "", "Verb (ক্রিয়া): যে শব্দ কোনো কাজ বোঝায়, তা-ই verb।"],
            ["Example: Go, Clean, Give, Enjoy, etc.", "ইগজ়াম্পল: গো, ক্লীন, গিভ়, ইনজয়, এট স়েটরা।", "উদাহরণ: যাওয়া, পরিষ্কার করা, দেওয়া, উপভোগ করা ইত্যাদি।"],
            ["Noun, pronoun and verb are called parts of speech.", "", "Noun, pronoun আর verb-কে বলে parts of speech (পদ)।"],
          ] } }, ubold: ["Noun:", "Pronoun:", "Verb:", "Example:", "Noun, pronoun and verb are called parts of speech."], ulook: "plain" },
        ] },
        { k: "D", task: ["Correct the sentences using capital letters.", "বড় হাতের অক্ষর ব্যবহার করে বাক্যগুলো ঠিক করে লেখো।"], parts: [
          { u5wrap: { text: [
            ["porshi and rani go to school.", "পর্শী অ্যান্ড রানী গো টু স্কূল।", "পর্শী আর রানী স্কুলে যায়।"],
            ["moloy is their friend.", "মলয় ইজ় দ়েয়া ফ়্রেন্ড।", "মলয় তাদের বন্ধু।"],
            ["his village is fulbari.", "হিজ় ভ়িলিজ ইজ় ফ়ুলবাড়ি।", "তার গ্রামের নাম ফুলবাড়ি।"],
            ["the river padma flows by his village.", "দ়া রিভ়া পদ্মা ফ়্লোজ় বাই হিজ় ভ়িলিজ।", "পদ্মা নদী তার গ্রামের পাশ দিয়ে বয়ে যায়।"],
            ["friday and saturday are their holidays.", "ফ়্রাইডেই অ্যান্ড স়্যাটাডেই আ দ়েয়া হলাডেইজ়।", "শুক্রবার আর শনিবার তাদের ছুটির দিন।"],
          ] }, ulook: "flow" },
          { write: 2 },
        ] },
      ],
    },
    {
      page: 70, lesson: 2, title: ["Joyful school time 2", "আনন্দের স্কুলবেলা ২"],
      blocks: [
        { k: "E", task: ["Pairwork: Read the text in section B. Find out the parts of speech. One is done for you.", "জোড়ায় কাজ: B অংশের লেখাটি পড়ো। parts of speech (পদ) খুঁজে বের করো। একটি করে দেওয়া আছে।"], parts: [
          NOUN_TABLE([[["Rani", "রানী", "রানী"], ["she", "শী", "সে (মেয়ে)"], ["goes", "গোজ়", "যায়"]], EMPTY3, EMPTY3]),
        ] },
        { k: "F", task: ["Game: Let’s make sentences with the words from the circle. You can use a word more than once. Finally, write the sentences in your notebook. One is done for you.", "খেলা: চলো, বৃত্তের শব্দগুলো দিয়ে বাক্য বানাই। একটি শব্দ একাধিকবার ব্যবহার করতে পারো। শেষে বাক্যগুলো খাতায় লেখো। একটি করে দেওয়া আছে।"], parts: [
          { u5circle: {
            rows: [
              [["the", "দ়া", "ওই, -টা"], ["school", "স্কূল", "স্কুল"], ["are", "আ", "হয়, আছে"]],
              [["Rani", "রানী", "রানী"], ["Porshi", "পর্শী", "পর্শী"], ["time", "টাইম", "সময়"]],
              [["They", "দ়েই", "তারা, ওরা"], ["neighbours", "*নেই*·বাজ়", "প্রতিবেশীরা"], ["goes", "গোজ়", "যায়"]],
              [["and", "অ্যান্ড", "আর"], ["she", "শী", "সে (মেয়ে)"], ["nature", "*নেই*·চা", "প্রকৃতি"], ["to", "টু", "-তে, দিকে"]],
              [["is", "ইজ়", "হয়, আছে"], ["helpful", "*হেল্প*·ফ়াল", "উপকারী"], ["enjoys", "ইন·*জয়জ়*", "উপভোগ করে"]],
            ],
            done: [["Rani", "", ""], ["enjoys", "", ""], ["the", "", ""], ["school", "", ""], ["time", "", ""]],
            line: ["রানী ইনজয়জ় দ়া স্কূল টাইম।", "রানী স্কুলের সময়টা উপভোগ করে।"],
          } },
        ] },
      ],
    },
    {
      page: 71, lesson: 2, title: ["Joyful school time 2", "আনন্দের স্কুলবেলা ২"],
      blocks: [
        { practise: true },
        // a jumbled line's meaning is the meaning of the sentence it makes
        { n: 1, task: ["Rearrange the jumbled words to make a sentence.", "এলোমেলো শব্দগুলো সাজিয়ে একটি বাক্য বানাও।"], parts: [
          { items: [
            ["a.", "Sujan child need special a is", "স়ুজন চাইল্ড নীড স্পেশাল আ ইজ়", "সুজন একজন বিশেষ চাহিদাসম্পন্ন শিশু।"],
            ["b.", "Kajal are neighbours Kanta and", "কাজল আ নেইবাজ় কান্তা অ্যান্ড", "কাজল আর কান্তা প্রতিবেশী।"],
            ["c.", "Aurup attentive is class in the", "অরূপ আটেনটিভ় ইজ় ক্লাস় ইন দ়া", "অরূপ ক্লাসে মনোযোগী।"],
            ["d.", "enjoys Arnab classes the", "ইনজয়জ় অর্ণব ক্লাস়িজ় দ়া", "অর্ণব ক্লাসগুলো উপভোগ করে।"],
            ["e.", "Sunday students their clean school on", "স়ান্ডেই স্টিউডান্টস দ়েয়া ক্লীন স্কূল অন", "রবিবারে শিক্ষার্থীরা তাদের স্কুল পরিষ্কার করে।"],
          ], answer: "line" },
        ] },
        { n: 2, task: ["Circle the nouns, underline the pronouns and tick the verbs below:", "নিচের noun-গুলোতে গোল দাগ দাও, pronoun-গুলোর নিচে দাগ টানো আর verb-গুলোতে টিক দাও:"], parts: [
          { table: { rows: [
            [["chair", "চেয়া", "চেয়ার"], ["borrow", "*ব*·রো", "ধার নেওয়া"], ["they", "দ়েই", "তারা, ওরা"]],
            [["these", "দ়ীজ়", "এগুলো"], ["sit", "স়িট", "বসা"], ["Sunday", "*স়ান*·ডেই", "রবিবার"]],
            [["play", "প্লেই", "খেলা"], ["her", "হা", "তার, তাকে (মেয়েটির)"], ["library", "*লাই*·ব্রে·রি", "লাইব্রেরি"]],
          ], w: [33.3, 33.3, 33.4] } },
        ] },
      ],
    },
    // ── Lesson 3: Osman's village life ──
    {
      page: 72, lesson: 3, dense: true, title: ["Osman’s village life", "ওসমানের গ্রামের জীবন"],
      blocks: [
        { k: "A", task: ["Look and read the following text.", "দেখো আর নিচের লেখাটি পড়ো।"], parts: [
          { u5beside: { pic: "u5-l3-fishing", side: "left", w: 25, h: 40, look: "tight", text: [
            ["Osman lives in a village.", "ওস়মান লিভ়জ় ইন আ ভ়িলিজ।", "ওসমান একটি গ্রামে থাকে।"],
            ["He gets up early in the morning.", "হী গেটস আপ আলি ইন দ়া মনিং।", "সে সকালে তাড়াতাড়ি ঘুম থেকে ওঠে।"],
            ["First, he gets ready for breakfast.", "ফ়াস্ট, হী গেটস রেডি ফ়া ব্রেকফ়াস্ট।", "প্রথমে সে নাশতার জন্য তৈরি হয়।"],
            ["Then he brushes his teeth and studies for some time.", "দ়েন হী ব্রাশিজ় হিজ় টীথ় অ্যান্ড স্টাডিজ় ফ়া স়াম টাইম।", "তারপর সে দাঁত মাজে আর কিছুক্ষণ পড়াশোনা করে।"],
            ["After study, he prepares for school.", "আফ়টা স্টাডি, হী প্রিপেয়াজ় ফ়া স্কূল।", "পড়া শেষে সে স্কুলের জন্য তৈরি হয়।"],
            ["Osman returns home in the afternoon.", "ওস়মান রিটানজ় হোম ইন দ়ি আফ়টানূন।", "বিকেলে ওসমান বাড়ি ফেরে।"],
            ["Again, he studies in the evening.", "আগেন, হী স্টাডিজ় ইন দ়ি ঈভ়নিং।", "সন্ধ্যায় সে আবার পড়াশোনা করে।"],
          ] } },
          { u5beside: { pic: "u5-l3-village-library", side: "right", w: 25, h: 40, look: "tight", text: [
            ["In the afternoon, Osman plays with his friends.", "ইন দ়ি আফ়টানূন, ওস়মান প্লেইজ় উইদ় হিজ় ফ়্রেন্ডজ়।", "বিকেলে ওসমান বন্ধুদের সাথে খেলে।"],
            ["Sometimes, he goes fishing in the river with his father.", "স়ামটাইমজ়, হী গোজ় ফ়িশিং ইন দ়া রিভ়া উইদ় হিজ় ফ়াদ়া।", "মাঝে মাঝে সে বাবার সাথে নদীতে মাছ ধরতে যায়।"],
            ["Every Friday, he borrows story books from the village library.", "এভ়রি ফ়্রাইডেই, হী বরোজ় স্টোরি বুকস ফ়্রম দ়া ভ়িলিজ লাইব্রেরি।", "প্রতি শুক্রবার সে গ্রামের লাইব্রেরি থেকে গল্পের বই ধার নেয়।"],
            ["In the free time, Osman goes around the village to see birds, trees, paddy fields, etc.", "ইন দ়া ফ়্রী টাইম, ওস়মান গোজ় আরাউন্ড দ়া ভ়িলিজ টু স়ী বাডজ়, ট্রীজ়, প্যাডি ফ়ীল্ডজ়, এট স়েটরা।", "অবসরে ওসমান পাখি, গাছ, ধানখেত ইত্যাদি দেখতে গ্রাম ঘুরে বেড়ায়।"],
            ["Osman is proud of his village.", "ওস়মান ইজ় প্রাউড অভ় হিজ় ভ়িলিজ।", "ওসমান তার গ্রাম নিয়ে গর্বিত।"],
          ] } },
        ] },
        { k: "B", task: ["Read the text in the section A. Choose the correct answer.", "A অংশের লেখাটি পড়ো। সঠিক উত্তরটি বেছে নাও।"], parts: [
          { u5wrap: { choices: [
            { q: ["1.", "Osman borrows story books from ….", "ওস়মান বরোজ় স্টোরি বুকস ফ়্রম ……", "ওসমান গল্পের বই ধার নেয় …… থেকে।"], options: [
              ["a.", "the school", "দ়া স্কূল", "স্কুল"], ["b.", "his father", "হিজ় ফ়াদ়া", "তার বাবা"], ["c.", "the village library", "দ়া ভ়িলিজ লাইব্রেরি", "গ্রামের লাইব্রেরি"]] },
            { q: ["2.", "Osman brushes his teeth ….", "ওস়মান ব্রাশিজ় হিজ় টীথ় ……", "ওসমান দাঁত মাজে ……"], options: [
              ["a.", "after breakfast", "আফ়টা ব্রেকফ়াস্ট", "নাশতার পরে"], ["b.", "before breakfast", "বিফ়ো ব্রেকফ়াস্ট", "নাশতার আগে"], ["c.", "early in the morning", "আলি ইন দ়া মনিং", "খুব সকালে"]] },
            { q: ["3.", "Osman studies in the ….", "ওস়মান স্টাডিজ় ইন দ়া ……", "ওসমান পড়াশোনা করে ……"], options: [
              ["a.", "afternoon", "আফ়·টা·*নূন*", "বিকেলে"], ["b.", "free time", "ফ়্রী টাইম", "অবসরে"], ["c.", "morning and the evening", "মনিং অ্যান্ড দ়ি ঈভ়নিং", "সকালে আর সন্ধ্যায়"]] },
          ], inline: true }, ulook: "flow opts3 small" },
        ] },
      ],
    },
    {
      page: 73, lesson: 3, title: ["Osman’s village life", "ওসমানের গ্রামের জীবন"],
      blocks: [
        { k: "C", task: ["Match the words in column A with the words of similar meaning in column B. One is done for you.", "A কলামের শব্দগুলোর সাথে B কলামের একই রকম অর্থের শব্দগুলো মেলাও। একটি করে দেওয়া আছে।"], parts: [
          { match: { a: "A", b: "B",
            left: [["get up", "গেট আপ", "ঘুম থেকে ওঠা"], ["beautiful", "*বিউ*·টি·ফ়াল", "সুন্দর"], ["help", "হেল্প", "সাহায্য করা"], ["breakfast", "*ব্রেক*·ফ়াস্ট", "সকালের নাশতা"], ["study", "*স্টা*·ডি", "পড়াশোনা করা"]],
            right: [["learn", "লান", "শেখা"], ["support", "স়া·*পট*", "সাহায্য করা"], ["rise", "রাইজ়", "ওঠা"], ["pretty", "*প্রি*·টি", "সুন্দর"], ["morning meal", "মনিং মীল", "সকালের খাবার"]],
            done: [[0, 2]] } },
        ] },
        { k: "D", task: ["Pairwork: Let’s read the text in section A again. List the nouns, pronouns and verbs in the following table.", "জোড়ায় কাজ: চলো, A অংশের লেখাটি আবার পড়ি। নিচের ছকে noun, pronoun আর verb-গুলোর তালিকা করো।"], parts: [
          NOUN_TABLE([EMPTY3, EMPTY3, EMPTY3]),
        ] },
        { k: "E", task: ["Write a short paragraph on “My village life” by answering the following questions.", "নিচের প্রশ্নগুলোর উত্তর দিয়ে “My village life” (আমার গ্রামের জীবন) নিয়ে একটি ছোট অনুচ্ছেদ লেখো।"], parts: [
          { items: [
            ["1.", "What is the name of your village?", "ওয়ট ইজ় দ়া নেইম অভ় ইয়ো ভ়িলিজ?", "তোমার গ্রামের নাম কী?"],
            ["2.", "Where is your village?", "ওয়েয়া ইজ় ইয়ো ভ়িলিজ?", "তোমার গ্রাম কোথায়?"],
            ["3.", "How does your village look?", "হাউ ডাজ় ইয়ো ভ়িলিজ লুক?", "তোমার গ্রামটি দেখতে কেমন?"],
            ["4.", "How do you spend your time in the village?", "হাউ ডু ইউ স্পেন্ড ইয়ো টাইম ইন দ়া ভ়িলিজ?", "গ্রামে তুমি কীভাবে সময় কাটাও?"],
            ["5.", "How do you feel about your village?", "হাউ ডু ইউ ফ়ীল আবাউট ইয়ো ভ়িলিজ?", "তোমার গ্রাম নিয়ে তোমার কেমন লাগে?"],
          ] },
        ] },
      ],
    },
    {
      page: 74, lesson: 3, title: ["Osman’s village life", "ওসমানের গ্রামের জীবন"],
      blocks: [
        { k: "F", task: ["Let’s go outside the classroom with your teacher. Observe a tree and write the names of the different parts of that tree. You can use the following words from the box.", "চলো, শিক্ষকের সাথে শ্রেণিকক্ষের বাইরে যাই। একটি গাছ ভালো করে দেখো আর গাছটির বিভিন্ন অংশের নাম লেখো। বক্সের শব্দগুলো ব্যবহার করতে পারো।"], parts: [
          { words: [["root", "রূট", "শিকড়"], ["leaf", "লীফ়", "পাতা"], ["branch", "ব্রানচ", "ডাল"], ["trunk", "ট্রাংক", "কাণ্ড"], ["twig", "টুইগ", "ছোট ডাল"]] },
          // where each label line starts on the picture (x%, y%), and where its box sits (y%): twig, leaf, branch, trunk, root
          { u5label: { pic: "u5-l3-tree", h: 100, at: [[70, 12, 6], [73, 16, 22], [57, 32, 38], [41, 73, 70], [77, 94, 92]] } },
        ] },
        { k: "G", task: ["Project work: Let’s look at a cat and write the names of its 5 different parts.", "প্রজেক্টের কাজ: চলো, একটি বিড়াল দেখি আর তার ৫টি আলাদা অংশের নাম লিখি।"], parts: [
          { write: 5 },
        ] },
      ],
    },
    {
      page: 75, lesson: 3, dense: true, title: ["Osman’s village life", "ওসমানের গ্রামের জীবন"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Match column A with column B. One is done for you.", "A কলামের সাথে B কলাম মেলাও। একটি করে দেওয়া আছে।"], parts: [
          { u5wrap: { match: { a: ["Column A", "", "কলাম A"], b: ["Column B", "", "কলাম B"],
            left: [["get up", "গেট আপ", "ঘুম থেকে ওঠা"], ["ready", "*রে*·ডি", "তৈরি"], ["borrow", "*ব*·রো", "ধার নেওয়া"], ["study", "*স্টা*·ডি", "পড়াশোনা করা"], ["proud", "প্রাউড", "গর্বিত"]],
            right: [["prepare", "প্রি·*পেয়া*", "তৈরি করা"], ["read", "রীড", "পড়া"], ["boast", "বোস্ট", "গর্ব করা"], ["loan", "লোন", "ধার"], ["wake up", "ওয়েইক আপ", "ঘুম থেকে জাগা"]],
            done: [[0, 4]] } }, ulook: "small" },
        ] },
        { n: 2, task: ["Put the words in the right column.", "শব্দগুলো ঠিক কলামে বসাও।"], parts: [
          { u5wrap: { words: [["live", "লিভ়", "থাকা"], ["he", "হী", "সে (ছেলে)"], ["breakfast", "*ব্রেক*·ফ়াস্ট", "সকালের নাশতা"], ["school", "স্কূল", "স্কুল"], ["his", "হিজ়", "তার (ছেলেটির)"], ["borrow", "*ব*·রো", "ধার নেওয়া"], ["Friday", "*ফ়্রাই*·ডেই", "শুক্রবার"], ["enjoy", "ইন·*জয়*", "উপভোগ করা"]] }, ulook: "chips small" },
          NOUN_TABLE([EMPTY3, EMPTY3]),
        ] },
        { n: 3, task: ["Choose the right word to complete the sentence.", "বাক্যটি পূর্ণ করতে ঠিক শব্দটি বেছে নাও।"], parts: [
          { u5wrap: { choices: [
            { q: ["a.", "Osman lives in a ….", "ওস়মান লিভ়জ় ইন আ ……", "ওসমান একটি …… থাকে।"], options: [
              ["(i)", "town", "টাউন", "শহর"], ["(ii)", "village", "*ভ়ি*·লিজ", "গ্রাম"], ["(iii)", "slum", "স়্লাম", "বস্তি"]] },
            { q: ["b.", "Sometimes, he goes fishing in the river with his….", "স়ামটাইমজ়, হী গোজ় ফ়িশিং ইন দ়া রিভ়া উইদ় হিজ়……", "মাঝে মাঝে সে তার …… সাথে নদীতে মাছ ধরতে যায়।"], options: [
              ["(i)", "brother", "*ব্রা*·দ়া", "ভাই"], ["(ii)", "uncle", "*আং*·কাল", "চাচা, মামা"], ["(iii)", "father", "*ফ়া*·দ়া", "বাবা"]] },
            { q: ["c.", "Every Friday, he borrows storybooks from the village….", "এভ়রি ফ়্রাইডেই, হী বরোজ় স্টোরিবুকস ফ়্রম দ়া ভ়িলিজ……", "প্রতি শুক্রবার সে গ্রামের …… থেকে গল্পের বই ধার নেয়।"], options: [
              ["(i)", "fair", "ফ়েয়া", "মেলা"], ["(ii)", "library", "*লাই*·ব্রে·রি", "লাইব্রেরি"], ["(iii)", "market", "*মা*·কিট", "বাজার"]] },
          ], inline: true }, ulook: "flow opts3 flowopts" },
        ] },
      ],
    },
    // ── Lesson 4: Oyshi's city life ──
    {
      page: 76, lesson: 4, dense: true, title: ["Oyshi’s city life", "ঐশীর শহরের জীবন"],
      blocks: [
        { k: "A", task: ["Look and read the following text.", "দেখো আর নিচের লেখাটি পড়ো।"], parts: [
          { u5beside: { pic: "u5-l4-crossing", side: "left", w: 36, h: 44, look: "tight", text: [
            ["Oyshi and her family live in a city.", "ঐশী অ্যান্ড হা ফ়্যামিলি লিভ় ইন আ স়িটি।", "ঐশী আর তার পরিবার একটি শহরে থাকে।"],
            ["Oyshi goes to school with her father.", "ঐশী গোজ় টু স্কূল উইদ় হা ফ়াদ়া।", "ঐশী বাবার সাথে স্কুলে যায়।"],
            ["After school, she returns home with her mother.", "আফ়টা স্কূল, শী রিটানজ় হোম উইদ় হা মাদ়া।", "স্কুল ছুটির পরে সে মায়ের সাথে বাড়ি ফেরে।"],
            ["They always use the zebra crossing and foot overbridge.", "দ়েই অলওয়েজ় ইউজ় দ়া জ়েব্রা ক্রস়িং অ্যান্ড ফ়ুট ওভ়াব্রিজ।", "তারা সবসময় জেব্রা ক্রসিং আর ফুটওভারব্রিজ ব্যবহার করে।"],
            ["Oyshi plays with her brother in the afternoon.", "ঐশী প্লেইজ় উইদ় হা ব্রাদ়া ইন দ়ি আফ়টানূন।", "বিকেলে ঐশী তার ভাইয়ের সাথে খেলে।"],
          ] } },
          { u5beside: { pic: "u5-l4-roof-garden", side: "right", w: 36, h: 44, look: "tight", text: [
            ["They have a beautiful roof top garden.", "দ়েই হ্যাভ় আ বিউটিফ়াল রূফ় টপ গাডান।", "তাদের একটি সুন্দর ছাদবাগান আছে।"],
            ["Oyshi helps her parents with gardening.", "ঐশী হেল্পস হা পেয়ারান্টস উইদ় গাডনিং।", "বাগানের কাজে ঐশী মা-বাবাকে সাহায্য করে।"],
            ["She waters the plants in their garden.", "শী ওয়টাজ় দ়া প্লান্টস ইন দ়েয়া গাডান।", "সে তাদের বাগানের গাছে পানি দেয়।"],
            ["Oyshi likes to live in a green city.", "ঐশী লাইকস টু লিভ় ইন আ গ্রীন স়িটি।", "ঐশী সবুজ শহরে থাকতে ভালোবাসে।"],
            ["Every Friday and Saturday, Oyshi attends an art class at ‘Bangladesh Shishu Academy’.", "এভ়রি ফ়্রাইডেই অ্যান্ড স়্যাটাডেই, ঐশী আটেন্ডজ় অ্যান আট ক্লাস় অ্যাট ‘ব্যাংলাডেশ শিশু আক্যাডামি’।", "প্রতি শুক্রবার আর শনিবার ঐশী ‘বাংলাদেশ শিশু একাডেমি’তে ছবি আঁকার ক্লাসে যায়।"],
          ] } },
          { u5beside: { pic: "u5-l4-library-van", side: "left", w: 36, h: 36, look: "tight", text: [
            ["She borrows story books from the ‘Mobile Library of Bishwo Shahitto Kendro’ on Wednesday.", "শী বরোজ় স্টোরি বুকস ফ়্রম দ়া ‘মোবাইল লাইব্রেরি অভ় বিশ্বসাহিত্য কেন্দ্র’ অন ওয়েন্জ়ডেই।", "বুধবারে সে ‘বিশ্বসাহিত্য কেন্দ্রের ভ্রাম্যমাণ লাইব্রেরি’ থেকে গল্পের বই ধার নেয়।"],
            ["Oyshi loves her city very much.", "ঐশী লাভ়জ় হা স়িটি ভ়েরি মাচ।", "ঐশী তার শহরকে খুব ভালোবাসে।"],
          ] } },
        ] },
      ],
    },
    {
      page: 77, lesson: 4, dense: true, title: ["Oyshi’s city life", "ঐশীর শহরের জীবন"],
      blocks: [
        { k: "B", task: ["Read the text in section A. Choose the correct answer.", "A অংশের লেখাটি পড়ো। সঠিক উত্তরটি বেছে নাও।"], parts: [
          { u5wrap: { choices: [
            { q: ["1.", "Oyshi goes to school with her ….", "ঐশী গোজ় টু স্কূল উইদ় হা ……", "ঐশী তার …… সাথে স্কুলে যায়।"], options: [
              ["a.", "father", "*ফ়া*·দ়া", "বাবা"], ["b.", "brother", "*ব্রা*·দ়া", "ভাই"], ["c.", "mother", "*মা*·দ়া", "মা"]] },
            { q: ["2.", "How many days does Oyshi attend the art class in a week?", "হাউ মেনি ডেইজ় ডাজ় ঐশী আটেন্ড দ়ি আট ক্লাস় ইন আ উইক?", "সপ্তাহে কয় দিন ঐশী ছবি আঁকার ক্লাসে যায়?"], options: [
              ["a.", "one day", "ওয়ান ডেই", "এক দিন"], ["b.", "two days", "টূ ডেইজ়", "দুই দিন"], ["c.", "three days", "থ়্রী ডেইজ়", "তিন দিন"]] },
            { q: ["3.", "Green city is a city where we find more ….", "গ্রীন স়িটি ইজ় আ স়িটি ওয়েয়া উই ফ়াইন্ড মো ……", "সবুজ শহর হলো এমন শহর, যেখানে আমরা বেশি …… দেখি।"], options: [
              ["a.", "schools", "স্কূলজ়", "স্কুল"], ["b.", "zebra crossings", "জ়েব্রা ক্রস়িংজ়", "জেব্রা ক্রসিং"], ["c.", "trees", "ট্রীজ়", "গাছ"]] },
          ], inline: true }, ulook: "flow opts3" },
        ] },
        { k: "C", task: ["Match the words in column A with their meanings in column B.", "A কলামের শব্দগুলোর সাথে B কলামে তাদের অর্থ মেলাও।"], parts: [
          { match: { a: "A", b: "B",
            left: [["return", "রি·*টান*", "ফিরে আসা"], ["parents", "*পেয়া*·রান্টস", "মা-বাবা"], ["borrow", "*ব*·রো", "ধার নেওয়া"], ["academy", "আ·*ক্যা*·ডা·মি", "একাডেমি"]],
            right: [["take something from someone", "টেইক স়ামথ়িং ফ়্রম স়ামওয়ান", "কারও কাছ থেকে কিছু নেওয়া"], ["school", "স্কূল", "বিদ্যালয়"], ["come back", "কাম ব্যাক", "ফিরে আসা"], ["mother and father", "মাদ়া অ্যান্ড ফ়াদ়া", "মা আর বাবা"]] } },
        ] },
        { k: "D", task: ["Rearrange the words to make complete sentences. One is done for you.", "শব্দগুলো সাজিয়ে পূর্ণ বাক্য বানাও। একটি করে দেওয়া আছে।"], parts: [
          { u5wrap: { table: { rows: [
            [["book a she borrows", "বুক আ শী বরোজ়", "সে একটি বই ধার নেয়।"], ["She borrows a book.", "শী বরোজ় আ বুক।", "সে একটি বই ধার নেয়।"]],
            [["he group work the presents", "হী গ্রূপ ওয়াক দ়া প্রিজ়েন্টস", "সে দলের কাজটি উপস্থাপন করে।"], ""],
            [["shirt my is beautiful", "শাট মাই ইজ় বিউটিফ়াল", "আমার শার্টটি সুন্দর।"], ""],
            [["want a city we green", "ওয়ন্ট আ স়িটি উই গ্রীন", "আমরা একটি সবুজ শহর চাই।"], ""],
            [["Titu his city clean keeps", "টিটু হিজ় স়িটি ক্লীন কীপস", "টিটু তার শহর পরিষ্কার রাখে।"], ""],
            [["holiday Friday is a", "হলাডেই ফ়্রাইডেই ইজ় আ", "শুক্রবার ছুটির দিন।"], ""],
          ], w: [55, 45] } }, ulook: "cells small" },
        ] },
      ],
    },
    {
      page: 78, lesson: 4, dense: true, title: ["Oyshi’s city life", "ঐশীর শহরের জীবন"],
      blocks: [
        { k: "E", task: ["Write a sentence about each picture.", "প্রতিটি ছবি নিয়ে একটি করে বাক্য লেখো।"], parts: [
          { pics: [
            { name: "u5-l4-zebra", label: "a", cap: ["…………………….......", "", ""] },
            { name: "u5-l4-overbridge", label: "b", cap: ["…………………….......", "", ""] },
            { name: "u5-l4-school", label: "c", cap: ["…………………….......", "", ""] },
            { name: "u5-l4-reading", label: "d", cap: ["…………………….......", "", ""] },
          ], cols: 2, h: 36 },
        ] },
        { k: "F", task: ["Write a short paragraph on “My city life” using the following clues.", "নিচের সূত্রগুলো ব্যবহার করে “My city life” (আমার শহরের জীবন) নিয়ে একটি ছোট অনুচ্ছেদ লেখো।"], parts: [
          { words: [["school name", "স্কূল নেইম", "স্কুলের নাম"], ["garden", "*গা*·ডান", "বাগান"], ["zebra crossing", "জ়েব্রা ক্রস়িং", "জেব্রা ক্রসিং"], ["shopping", "*শ*·পিং", "কেনাকাটা"]] },
        ] },
        { k: "G", task: ["Make a list of the things and activities you like in your village or city. One is done for you.", "তোমার গ্রামে বা শহরে যেসব জিনিস আর কাজ তোমার ভালো লাগে, তার একটি তালিকা বানাও। একটি করে দেওয়া আছে।"], parts: [
          { table: { head: [["Village", "*ভ়ি*·লিজ", "গ্রাম"], ["City", "*স়ি*·টি", "শহর"]],
            rows: [[["Fishing", "*ফ়ি*·শিং", "মাছ ধরা"], ["Gardening", "*গাড*·নিং", "বাগান করা"]], ["", ""], ["", ""]], w: [50, 50] } },
        ] },
      ],
    },
    {
      page: 79, lesson: 4, title: ["Oyshi’s city life", "ঐশীর শহরের জীবন"],
      blocks: [
        { k: "H", task: ["Project work: Let’s go to the vegetable shop with your mother. Which vegetables of the following box you have seen in the market? Make list and share your list with others in the next class.", "প্রজেক্টের কাজ: চলো, মায়ের সাথে সবজির দোকানে যাই। নিচের বক্সের কোন কোন সবজি তুমি বাজারে দেখেছ? তালিকা বানাও আর পরের ক্লাসে অন্যদের সাথে তোমার তালিকাটি ভাগ করে নাও।"], parts: [
          { words: [["cabbage", "*ক্যা*·বিজ", "বাঁধাকপি"], ["cauliflower", "*ক*·লি·ফ়্লাও·য়া", "ফুলকপি"], ["pumpkin", "*পাম্প*·কিন", "মিষ্টিকুমড়া"], ["chilly", "*চি*·লি", "মরিচ"], ["ginger", "*জিন*·জা", "আদা"], ["gourd", "গুয়াড", "লাউ-কুমড়া জাতের সবজি"], ["cowpea", "*কাউ*·পী", "বরবটি"],
            ["turnip", "*টা*·নিপ", "শালগম"], ["parble", "*পা*·বল", "পটল"], ["bottle gourd", "বটল গুয়াড", "লাউ"], ["bean", "বীন", "শিম"], ["turmeric", "*টা*·মা·রিক", "হলুদ"], ["lady’s finger", "লেইডিজ় ফ়িংগা", "ঢেঁড়স"]] },
          { pic: "u5-l4-vegetable-shop", h: 120 },
        ] },
      ],
    },
    {
      page: 80, lesson: 4, title: ["Oyshi’s city life", "ঐশীর শহরের জীবন"],
      blocks: [
        { practise: true },
        { n: 1, task: ["Read the following sentences. Write True or False.", "নিচের বাক্যগুলো পড়ো। ঠিক হলে True, ভুল হলে False লেখো।"], parts: [
          { u5tf: [
            ["a.", "Oyshi lives in a village. ______________", "ঐশী লিভ়জ় ইন আ ভ়িলিজ।", "ঐশী একটি গ্রামে থাকে।"],
            ["b.", "She takes care of her roof top garden. ______________", "শী টেইকস কেয়া অভ় হা রূফ় টপ গাডান।", "সে তার ছাদবাগানের যত্ন নেয়।"],
            ["c.", "She attends art class on Friday. ______________", "শী আটেন্ডজ় আট ক্লাস় অন ফ়্রাইডেই।", "সে শুক্রবারে ছবি আঁকার ক্লাসে যায়।"],
            ["d.", "Oyshi likes to read story books. ______________", "ঐশী লাইকস টু রীড স্টোরি বুকস।", "ঐশী গল্পের বই পড়তে ভালোবাসে।"],
            ["e.", "Oyshi’s life in the city is boring. ______________", "ঐশীজ় লাইফ় ইন দ়া স়িটি ইজ় বোরিং।", "শহরে ঐশীর জীবন একঘেয়ে।"],
          ] },
        ] },
        { n: 2, task: ["Write short answers to the following questions.", "নিচের প্রশ্নগুলোর ছোট উত্তর লেখো।"], parts: [
          { items: [
            ["a.", "Where does Oyshi live?", "ওয়েয়া ডাজ় ঐশী লিভ়?", "ঐশী কোথায় থাকে?"],
            ["b.", "What does she use to cross the road?", "ওয়ট ডাজ় শী ইউজ় টু ক্রস় দ়া রোড?", "রাস্তা পার হতে সে কী ব্যবহার করে?"],
            ["c.", "How does she help her parents?", "হাউ ডাজ় শী হেল্প হা পেয়ারান্টস?", "সে কীভাবে মা-বাবাকে সাহায্য করে?"],
            ["d.", "Where does she love to live in?", "ওয়েয়া ডাজ় শী লাভ় টু লিভ় ইন?", "সে কোথায় থাকতে ভালোবাসে?"],
            ["e.", "Does Oyshi enjoy her city life? Why?", "ডাজ় ঐশী ইনজয় হা স়িটি লাইফ়? ওয়াই?", "ঐশী কি তার শহরের জীবন উপভোগ করে? কেন?"],
          ], answer: "line" },
        ] },
      ],
    },
    // ── Lesson 5: Rhyme ──
    {
      page: 81, lesson: 5, dense: true, title: ["Rhyme", "ছড়া"],
      blocks: [
        { parts: [{ u5head: ["Rain Rain Go Away", "রেইন রেইন গো আওয়েই", "বৃষ্টি, বৃষ্টি, চলে যাও"] }] },
        { k: "A", task: ["Make a list of all the members in your family. Then share your list with a partner in pair.", "তোমার পরিবারের সব সদস্যের একটি তালিকা বানাও। তারপর জোড়ায় একজন সঙ্গীর সাথে তালিকাটি ভাগ করে নাও।"] },
        { k: "B", task: ["Listen to the rhyme. Clap every time you hear of a family member.", "ছড়াটি শোনো। পরিবারের কোনো সদস্যের নাম শুনলেই হাততালি দাও।"] },
        { k: "C", task: ["Read the rhyme aloud, first individually, then in pairs.", "ছড়াটি জোরে জোরে পড়ো: প্রথমে একা একা, তারপর জোড়ায়।"], parts: [
          { u5beside: { pic: "u5-l5-rain-1", side: "left", w: 42, h: 60, pos: "18% 50%", part: { lines: [
            ["Rain, rain, go away", "রেইন, রেইন, গো আওয়েই", "বৃষ্টি, বৃষ্টি, চলে যাও"],
            ["Come again another day.", "কাম আগেন আনাদ়া ডেই।", "আবার এসো অন্য কোনো দিন।"],
            ["Our daddy wants to play", "আওয়া ড্যাডি ওয়ন্টস টু প্লেই", "আমাদের বাবা খেলতে চায়"],
            ["Rain, rain, go away.", "রেইন, রেইন, গো আওয়েই।", "বৃষ্টি, বৃষ্টি, চলে যাও।"],
            ["Rain, rain, go away", "রেইন, রেইন, গো আওয়েই", "বৃষ্টি, বৃষ্টি, চলে যাও"],
            ["Come again another day.", "কাম আগেন আনাদ়া ডেই।", "আবার এসো অন্য কোনো দিন।"],
            ["Sweet mommy wants to play", "স়ুইট মমি ওয়ন্টস টু প্লেই", "মিষ্টি মা খেলতে চায়"],
            ["Rain, rain, go away.", "রেইন, রেইন, গো আওয়েই।", "বৃষ্টি, বৃষ্টি, চলে যাও।"],
            ["Rain, rain, go away", "রেইন, রেইন, গো আওয়েই", "বৃষ্টি, বৃষ্টি, চলে যাও"],
            ["Come again another day.", "কাম আগেন আনাদ়া ডেই।", "আবার এসো অন্য কোনো দিন।"],
            ["Dear brother wants to play", "ডিয়া ব্রাদ়া ওয়ন্টস টু প্লেই", "প্রিয় ভাইয়া খেলতে চায়"],
            ["Rain, rain, go away.", "রেইন, রেইন, গো আওয়েই।", "বৃষ্টি, বৃষ্টি, চলে যাও।"],
          ], style: "song", title: ["Rain Rain Go Away", "রেইন রেইন গো আওয়েই", "বৃষ্টি, বৃষ্টি, চলে যাও"] } } },
        ] },
      ],
    },
    {
      page: 82, lesson: 5, title: ["Rhyme", "ছড়া"],
      blocks: [
        { parts: [
          { u5beside: { pic: "u5-l5-rain-2", side: "right", w: 42, h: 60, pos: "14% 50%", part: { lines: [
            ["Rain, rain, go away", "রেইন, রেইন, গো আওয়েই", "বৃষ্টি, বৃষ্টি, চলে যাও"],
            ["Come again another day.", "কাম আগেন আনাদ়া ডেই।", "আবার এসো অন্য কোনো দিন।"],
            ["Lovely sister wants to play", "লাভ়লি স়িস্টা ওয়ন্টস টু প্লেই", "আদরের বোন খেলতে চায়"],
            ["Rain, rain, go away.", "রেইন, রেইন, গো আওয়েই।", "বৃষ্টি, বৃষ্টি, চলে যাও।"],
            ["Rain, rain, go away", "রেইন, রেইন, গো আওয়েই", "বৃষ্টি, বৃষ্টি, চলে যাও"],
            ["Come again another day.", "কাম আগেন আনাদ়া ডেই।", "আবার এসো অন্য কোনো দিন।"],
            ["Little baby wants to play", "লিটল বেইবি ওয়ন্টস টু প্লেই", "ছোট্ট সোনামণি খেলতে চায়"],
            ["Rain, rain, go away.", "রেইন, রেইন, গো আওয়েই।", "বৃষ্টি, বৃষ্টি, চলে যাও।"],
            ["Rain, rain, go away", "রেইন, রেইন, গো আওয়েই", "বৃষ্টি, বৃষ্টি, চলে যাও"],
            ["Come again another day.", "কাম আগেন আনাদ়া ডেই।", "আবার এসো অন্য কোনো দিন।"],
            ["All the family wants to play", "অল দ়া ফ়্যামিলি ওয়ন্টস টু প্লেই", "পুরো পরিবার খেলতে চায়"],
            ["Rain, rain, go away.", "রেইন, রেইন, গো আওয়েই।", "বৃষ্টি, বৃষ্টি, চলে যাও।"],
          ], style: "song" } } },
          { u5wrap: { lines: [
            ["[Note: “Rain Rain Go Away” is a popular English language nursery rhyme that was published in the 17th century or earlier. Since then, a wide variety of alternatives have been recorded.]", "", "[টীকা: “Rain Rain Go Away” ইংরেজি ভাষার একটি জনপ্রিয় শিশুতোষ ছড়া। এটি ১৭শ শতকে বা তারও আগে প্রকাশিত হয়েছিল। তখন থেকে এর নানা রকম রূপ পাওয়া গেছে।]"],
          ] }, ulook: "plain small" },
        ] },
      ],
    },
  ],
};
