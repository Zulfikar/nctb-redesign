// অধ্যায় ১২ · জ্যামিতি: printed pages 133–148 (PDF pages 139–154), every word as printed. Points, lines, surfaces (pp. 133–135),
// angles (pp. 136–138), quadrilaterals (pp. 139–141), geometric patterns (pp. 142–145) and নিজে করি (pp. 146–148).
// Every line, angle, shape, dot paper, square grid and pattern is drawn by content/p133-148.parts.js with the book's geometry
// (which dots a line joins, how many squares, which way a triangle turns); so are the things that show a surface or a corner
// (the die, the Rubik's cube, the can, the book, the hut, the brick, the folded paper…), so that every arrow and angle mark
// sits exactly where the book puts it. Four scenes are ChatGPT pictures (stand-ins cut from the book until then).
const sticks = (a0, deg, extra = {}) => ({ d: "angle", style: "stick", a0, deg, L: 18, ...extra });
const arrow = { kind: "c3p133_arrow" };

module.exports = {
  pages: [
    {
      page: 133,
      opener: { title: "জ্যামিতি" },
      title: "বিন্দু, রেখা ও তল",
      spread: true,
      blocks: [
        { ask: "বিন্দু, রেখা ও তল কী?" },
        { row: [
          { say: "boy", mood: "think", text: "রাতের পরিষ্কার আকাশে তারাগুলোকে মনে হয় অনেকগুলো ছোটো ছোটো ফোঁটা। এরকম ফোঁটা আমরা আর কোথায় দেখতে পাই?" },
          { pic: "p133-night-sky", h: 36, w: 56, fit: "cover", frame: true },
        ], w: [null, 58], gap: 4 },
        { row: [
          { kind: "c3p133_figs", items: [{ d: "die", h: 17 }, { clock: { digital: "10:20" } }], gap: 4, align: "center" },
          { say: "girl", mood: "talk", text: "লুডু খেলার ছক্কাতে ছোটো ছোটো ফোঁটা রয়েছে। ডিজিটাল ঘড়ির সময়ের মাঝেও ফোঁটা দেখেছি।" },
        ], w: [58], gap: 3 },
        "আমরা পেনসিলের চোখা মাথা দিয়ে সহজেই ফোঁটা আঁকতে পারি।",
        { row: [
          { frame: [{ kind: "c3p133_figs", items: [{ d: "dots2", h: 13 }] }], pad: 1.2 },
          arrow,
          { kind: "c3p133_note", text: "আমরা এই ফোঁটাগুলোকে **বিন্দু** বলি।" },
        ], w: [36, 12], gap: 3, justify: "flex-start" },
        { say: "parrot", mood: "talk", text: "বিন্দুর দৈর্ঘ্য, প্রস্থ বা উচ্চতা নেই, কেবল অবস্থান রয়েছে।" },
        { ex: "১", mark: "kaj", text: "ইচ্ছেমতো কিছু বিন্দু আঁকি এবং বিন্দুগুলো যোগ করে পছন্দমতো চিত্র আঁকি।", body: [
          { row: [
            { say: "boy", mood: "talk", text: "আমি ৫টি বিন্দু এঁকেছি এবং এগুলো যোগ করে একটি তারা এঁকেছি।" },
            { kind: "c3p133_figs", items: [{ d: "dots5", h: 24 }, { d: "dots5", star: true, fill: true, h: 24 }], gap: 8, align: "center" },
          ], w: [null, 68], gap: 4 },
        ] },
      ],
    },
    {
      page: 134,
      spread: true,
      blocks: [
        { gap: 1 },
        "দুই বিন্দুর উপর স্কেল রেখে পেনসিল দিয়ে সোজা দাগ টানলে নিচের চিত্রটি পাওয়া যায়।",
        { row: [
          { frame: [{ kind: "c3p133_figs", items: [{ d: "ruler", h: 13 }] }], pad: 1.4 },
          arrow,
          { frame: [{ kind: "c3p133_figs", items: [{ d: "line2", h: 13 }] }], pad: 1.4 },
          arrow,
          { kind: "c3p133_note", text: "আমরা একে **রেখা** বলি।" },
        ], w: [50, 10, 50, 10], gap: 2 },
        { say: "boy", mood: "think", text: "এই রকম রেখা আমরা কোথায় দেখতে পাই?" },
        { row: [
          { pic: "p134-sports-field", h: 44, w: 70, fit: "cover", frame: true },
          { pic: "p134-highway", h: 44, w: 56, fit: "cover", frame: true },
        ], w: [72, 58], gap: 8, justify: "center" },
        { say: "girl", mood: "talk", text: "খেলার মাঠে, বড়ো রাস্তায় আমি এ রকম রেখা দেখেছি।" },
        { say: "boy", mood: "think", text: "একটি ইটের বাইরের অংশকে আমরা কী বলি?" },
        { row: [
          { kind: "c3p133_figs", items: [{ d: "brick", h: 32 }] },
          arrow,
          { kind: "c3p133_note", text: "আমরা একে **তল** বলি। বিশেষভাবে এক্ষেত্রে আমরা একে **সমতল** বলি।" },
        ], w: [90, 12], gap: 3 },
        { say: "girl", mood: "talk", text: "একটি ইটের সকল তল সমতল।" },
      ],
    },
    {
      page: 135,
      spread: true,
      blocks: [
        { gap: 1 },
        { row: [
          { say: "boy", mood: "think", text: "একটি বলের তল কেমন?" },
          { kind: "p102_objs", items: [{ d: "football", h: 27 }], justify: "center" },
        ], w: [null, 40], gap: 4 },
        { say: "girl", mood: "talk", text: "এটি সমতল নয়। এ তলটি বাঁকা।" },
        { kind: "c3p133_note", text: "আমরা একে **বক্রতল** বলি।", center: true },
        { ex: "২", mark: "kaj", text: "চলো, একটি খাতার পাতা নিয়ে বিন্দু, রেখা ও তল খুঁজে বের করি।", body: [
          { row: [
            { kind: "c3p133_figs", items: [{ d: "sheet", h: 15 }] },
            { kind: "c3p133_say", who: "girl", small: true, text: "কাগজটির তল হলো সমতল। কাগজের পার্শ্ব হচ্ছে একটি রেখা। যে স্থানে দুই পার্শ্ব মিলিত (শীর্ষবিন্দু) হয়েছে তা একটি বিন্দু।" },
          ], w: [54], gap: 3 },
        ] },
        { ex: "৩", mark: "kaj", text: "চলো, নিচের জিনিসগুলোর তল খুঁজে বের করি এবং পৃথকভাবে সাজাই।", body: [
          { kind: "c3p133_figs", items: [{ d: "rubik", h: 15 }, { d: "die", h: 13 }, { d: "icecream", h: 19 }, { d: "ball", h: 8 }, { d: "orange", h: 13 }, { d: "book", h: 11 }, { d: "can", h: 19 }, { d: "banana", h: 11 }], justify: "space-between", gap: 2 },
          { row: [
            { kind: "c3p133_sort", head: ["সমতল", "বক্রতল", "উভয় তল"], h: 20 },
            { kind: "c3p133_say", who: "parrot", small: true, inner: [
              { kind: "c3p133_iline", d: "rubik", h: 8, text: "এর সব তল সমতল।" },
              { kind: "c3p133_iline", d: "ball", h: 7, text: "এর তল বক্রতল।" },
              { kind: "c3p133_iline", d: "orange", h: 8, text: "এর সমতল ও বক্রতল উভয় তলই রয়েছে।" },
            ] },
          ], w: [80], gap: 4 },
        ] },
        { ex: "১", mark: "anu", text: "দুইজন বন্ধুর সঙ্গে আলোচনা করে চারপাশের জিনিস (যেমন: পেনসিল, বই, টেবিল ইত্যাদি) থেকে বিন্দু, রেখা, সমতল ও বক্রতল খুঁজে বের করি।" },
      ],
    },
    {
      page: 136,
      title: "কোণ",
      dense: true,
      blocks: [
        { ask: "কোণ কী এবং বিভিন্ন প্রকার কোণ কীভাবে বের করব?" },
        { kind: "c3p133_figs", items: [{ d: "melon", h: 22 }, { clock: { h: 10, m: 10, size: 24 } }, { d: "scissors", h: 24 }], justify: "center", gap: 14, align: "center" },
        { say: "boy", mood: "think", text: "ছবিগুলোর মধ্যে কোথায় যেন একটা মিল আছে। কিন্তু আমি ঠিক তা ধরতে পারছি না।" },
        { say: "girl", mood: "talk", text: "প্রতিটি ছবিতেই **কোণ** রয়েছে।" },
        { row: [
          { kind: "c3p133_note", text: "দুইটি রেখার মিলিত বিন্দুতে (শীর্ষ বিন্দু) যে আকৃতি তৈরি হয়, তাকে **কোণ** বলে।" },
          { kind: "c3p133_figs", items: [{ d: "angdef", h: 33 }] },
        ], w: [null, 84], gap: 4 },
        { ex: "১", mark: "kaj", text: null, body: [
          { row: [
            { kind: "c3p133_exh", mark: "kaj", n: "১", text: "চলো, পাশের ছবিতে কোনো কোণ আছে কি না, আমরা তা খুঁজে বের করি।" },
            { kind: "c3p133_figs", items: [{ d: "hut", h: 22 }] },
          ], w: [null, 44], gap: 4, align: "flex-start" },
          { row: [
            { say: "boy", mood: "talk", text: "আমি এই কোণগুলো খুঁজে পেয়েছি।" },
            { kind: "c3p133_figs", items: [{ d: "hut", arcs: "wall", h: 22 }] },
          ], w: [null, 44], gap: 4 },
          { row: [
            { kind: "c3p133_figs", items: [{ d: "hut", arcs: "roof", h: 22 }] },
            { say: "girl", mood: "talk", text: "আমি এই কোণগুলো খুঁজে পেয়েছি।" },
          ], w: [44], gap: 4 },
          { kind: "c3p133_say", who: "parrot", small: true, text: "আমরা আর কোথায় কোথায় কোণ খুঁজে পাই?" },
        ] },
      ],
    },
    {
      page: 137,
      blocks: [
        { gap: 1 },
        { ex: "২", mark: "kaj", text: "চলো, আমরা বিভিন্ন ধরনের কোণ নিয়ে চিন্তা করি।", body: [
          "যেকোনো আকৃতির একটি কাগজ নিয়ে মাঝ বরাবর ভাঁজ করি। ভাঁজ করা কাগজটি পুনরায় আড়াআড়ি ভাঁজ করি (নিচের চিত্রের মতো)।",
          { kind: "c3p133_figs", items: [{ d: "fold1", h: 29 }, arrow, { d: "fold2", h: 29 }, arrow, { d: "fold3", h: 16.5, label: "এক সমকোণ" }], justify: "space-around", align: "center" },
          "ভাঁজ শেষে কোনায় যে কোণটি তৈরি হলো, সেটিই হলো **এক সমকোণ**।\nএবার ভাঁজটি খুলে ফেলি।",
          { kind: "c3p133_figs", items: [{ d: "unfold1", h: 25 }, arrow, { d: "unfold2", h: 26 }, arrow, { d: "creased", h: 25 }], justify: "space-around", align: "center" },
          "মাঝ বরাবর ভাঁজ হওয়া অংশে রেখা টানি। রেখা দুটির মিলিত বিন্দুতে ৪টি কোণ তৈরি হবে। এগুলোর প্রতিটি এক **সমকোণ**।",
          { row: [
            { kind: "c3p133_figs", items: [{ d: "cross", h: 25 }, { d: "crossmark", h: 31.8 }, { d: "tester", h: 21 }], gap: 3, align: "flex-end" },
            { kind: "c3p133_note", text: "সমকোণের জন্য আমরা এই চিহ্ন ব্যবহার করব।" },
          ], w: [null, 40], gap: 2, align: "flex-end" },
          "ভাঁজ করে তৈরি দুইটি সমকোণ পাশাপাশি রাখি (নিচের চিত্রের মতো)।",
          { kind: "c3p133_figs", items: [{ d: "tworight", h: 16 }], justify: "center" },
          "দুইটি সমকোণ একত্রে মিলে যে কোণ তৈরি করল, সেটি হলো সরল কোণ।",
          { kind: "c3p133_figs", items: [{ d: "straight", h: 21 }], justify: "center" },
        ] },
      ],
    },
    {
      page: 138,
      dense: true,
      blocks: [
        { gap: 1 },
        { row: [
          { kind: "c3p133_figs", items: [{ d: "angtest", deg: 42, h: 30 }] },
          { kind: "c3p133_note", text: "যদি কোণটি এক সমকোণের চেয়ে ছোটো হয়, তবে তাকে আমরা **সূক্ষ্মকোণ** বলি।" },
        ], w: [72], gap: 2 },
        { row: [
          { kind: "c3p133_figs", items: [{ d: "angtest", deg: 118, h: 36 }] },
          { kind: "c3p133_note", text: "যদি কোণটি এক সমকোণের চেয়ে বড়ো হয়, তবে তাকে আমরা **স্থূলকোণ** বলি।" },
        ], w: [72], gap: 2 },
        { ex: "৩", mark: "kaj", text: "চলো, আমরা দুইটি কাঠি দিয়ে কোণ তৈরি করি ও শ্রেণিতে প্রদর্শন করি।", body: [
          { row: [
            { say: "boy", mood: "talk", text: "আমি সূক্ষ্মকোণ ও স্থূলকোণ তৈরি করেছি।" },
            { kind: "c3p133_figs", items: [sticks(115, 62), sticks(-21, 139)], gap: 10, align: "center" },
          ], w: [null, 68], gap: 3 },
          { row: [
            { kind: "c3p133_figs", items: [sticks(-13, 26), sticks(0, 90), sticks(0, 180, { dot: true, L: 16 })], gap: 5, align: "flex-end" },
            { say: "girl", mood: "talk", text: "আমি সূক্ষ্মকোণ, সমকোণ ও সরলকোণ তৈরি করেছি।" },
          ], w: [98], gap: 3 },
        ] },
        { ex: "৪", mark: "kaj", text: "নিচের ডট কাগজে বিভিন্ন প্রকার কোণ আঁকি এবং সেগুলোর নাম বলি। যেমন: সূক্ষ্মকোণ, স্থূলকোণ, সরল কোণ ইত্যাদি।", body: [
          { kind: "c3p133_dots", cols: 10, rows: 4, sp: 8.4, segs: [[2, 2, 5, 2], [2, 2, 4, 0]] },
        ] },
        { ex: "১", mark: "anu", text: "পেনসিল ও স্কেলের সাহায্যে সমকোণ, সূক্ষ্মকোণ, স্থূলকোণ ও সরল কোণ আঁকি।" },
      ],
    },
    {
      page: 139,
      title: "চতুর্ভুজ",
      spread: true,
      blocks: [
        { row: [
          { ask: "আমরা এই চিত্রগুলোর মধ্যে কী কী মিল ও অমিল খুঁজে পাই?" },
          { kind: "c3p133_figs", items: [{ s: "rect", w: 12.4, h: 12.4, c: "blue" }, { s: "rect", w: 9.3, h: 12.9, rot: 14, c: "green" }, { s: "poly", pts: [[0, 0], [12.7, 4.1], [12.7, 13.3], [0, 13.3]], c: "orange" }], gap: 5, align: "center" },
        ], w: [null, 54], gap: 3 },
        { say: "boy", mood: "talk", text: "আমরা দ্বিতীয় শ্রেণিতে চতুর্ভুজাকৃতি সম্পর্কে শিখেছি। আমার মনে হচ্ছে তিনটি চিত্রই চতুর্ভুজাকৃতির।" },
        { say: "girl", mood: "talk", text: "চিত্র তিনটিরই ৪টি বাহু ও ৪টি কোণ রয়েছে।" },
        { say: "parrot", mood: "talk", side: "left", text: "একটি আকৃতি যা ৪টি সরল রেখা দ্বারা আবদ্ধ, তাকে চতুর্ভুজ বলে।" },
        { ex: "১", mark: "kaj", text: "পাশের চতুর্ভুজ দুইটির মধ্যে পার্থক্য কী?", body: [
          { row: [
            { kind: "c3p133_figs", items: [{ s: "poly", pts: [[7, 0], [19.4, 5.1], [23.5, 18], [0, 18]], c: "pink" }, { s: "rect", w: 15, h: 23.4, c: "teal" }], gap: 8, align: "flex-end" },
            { say: "girl", mood: "think", text: "এগুলোর কোণগুলো লক্ষ করি।" },
          ], w: [62], gap: 3 },
        ] },
        { kind: "c3p133_note", text: "যে চতুর্ভুজের ৪টি কোণই সমকোণ, তাকে আয়ত বলে।", center: true },
        "আয়তটিকে নিচের চিত্রের মতো করে বিভিন্ন উপায়ে ভাঁজ করে বাহুগুলোর দৈর্ঘ্য লক্ষ করি।",
        { kind: "c3p133_figs", items: [{ s: "rect", w: 20, h: 24, c: "plain", dash: ["v"] }, { s: "arrow", w: 10 }, { s: "folded", w: 20, h: 24, dir: "v" }, { s: "rect", w: 20, h: 24, c: "plain", dash: ["h"] }, { s: "arrow", w: 10 }, { s: "folded", w: 20, h: 24, dir: "h" }], gap: 6, justify: "center", align: "center" },
        { kind: "c3p133_note", text: "একটি আয়তের বিপরীত বাহুগুলোর দৈর্ঘ্য একই।", center: true },
      ],
    },
    {
      page: 140,
      spread: true,
      blocks: [
        { gap: 1 },
        { ex: "২", mark: "kaj", text: null, body: [
          { row: [
            { kind: "c3p133_exh", mark: "kaj", n: "২", text: "পাশের চতুর্ভুজ দুইটির মধ্যে কী কী মিল ও অমিল আছে তা খুঁজে বের করি।" },
            { kind: "c3p133_figs", items: [{ s: "rect", w: 27, h: 10, c: "sky" }, { s: "rect", w: 16, h: 16, c: "sky" }], gap: 7, align: "center" },
          ], w: [null, 58], gap: 3 },
          { say: "boy", mood: "talk", text: "আমি কিছু মিল খুঁজে পেয়েছি। চতুর্ভুজ দুইটির কোণগুলো সমকোণ এবং বিপরীত বাহুগুলোর দৈর্ঘ্য সমান। দুইটি চিত্রই **আয়ত**।" },
          "দ্বিতীয় চতুর্ভুজটিকে নিচের চিত্রের মতো করে ভাঁজ করে বাহুগুলোর দৈর্ঘ্য লক্ষ করি।",
          { row: [
            { kind: "c3p133_figs", items: [{ s: "rect", w: 20, h: 20, c: "sky", dash: ["h"] }, { s: "rect", w: 20, h: 20, c: "sky", dash: ["v"] }, { s: "rect", w: 20, h: 20, c: "sky", dash: ["d"] }], gap: 6, align: "center" },
            { say: "girl", mood: "talk", text: "প্রতিটি বাহুর দৈর্ঘ্যই সমান।" },
          ], w: [80], gap: 3 },
        ] },
        { row: [
          { kind: "c3p133_note", text: "যে আয়তের ৪ বাহুর দৈর্ঘ্য একই, তাকে বর্গ বলে।" },
          { kind: "c3p133_say", who: "parrot", small: true, text: "সকল বর্গই আয়ত।" },
        ], w: [106], gap: 4 },
        { ex: "৩", mark: "kaj", text: "সহপাঠীদের সঙ্গে আলোচনা করে যে বস্তুগুলোর তল আয়তাকার বা বর্গাকার, তা বের করি এবং কারণ ব্যাখ্যা করি।", body: [
          { kind: "c3p133_figs", items: [{ d: "popcorn", h: 17 }, { d: "wheel", h: 17 }, { d: "chocolate", h: 13 }, { kind: "p102_objs", items: [{ d: "football", h: 17 }] }, { d: "rubik", h: 16 }, { d: "book", h: 12 }, { d: "carrom", h: 17 }, { d: "bucket", h: 17 }], justify: "space-between", gap: 2 },
        ] },
        { ex: "৪", mark: "kaj", text: "আয়তগুলোতে গোল দাগ দিই।", body: [
          { kind: "c3p133_figs", items: [
            { s: "rect", w: 8.5, h: 16, c: "plain", ring: true }, { s: "rect", w: 24, h: 10, c: "plain" }, { s: "tri", w: 15.6, h: 12.7, c: "plain" },
            { s: "poly", pts: [[0, 0], [12.5, 12.3], [0, 12.3]], c: "plain" }, { s: "poly", pts: [[3, 0], [20.3, 6.1], [22.5, 14.4], [0, 14.4]], c: "plain" },
            { s: "rect", w: 28, h: 9.6, rot: 35, c: "plain" }, { s: "rect", w: 16.8, h: 16.8, c: "plain" },
          ], justify: "space-between", gap: 2, align: "center" },
        ] },
      ],
    },
    {
      page: 141,
      dense: true,
      blocks: [
        { gap: 1 },
        { ex: "৫", mark: "kaj", text: "যে চিত্রটি চতুর্ভুজ তার বাম পাশে ✓ দিই। যদি এগুলো আয়ত বা বর্গ হয়, তবে চিত্রের ডান পাশে নাম লিখি।", body: [
          { kind: "c3p133_ticks", h: 17, rows: [
            [{ s: "poly", pts: [[0, 2.8], [12.2, 0], [12.2, 13.6], [0, 13.8]], c: "plain" }, { s: "rect", w: 14, h: 14, c: "plain" }],
            [{ s: "ellipse", rx: 8.1, ry: 5.1, c: "plain" }, { s: "rect", w: 28.8, h: 7.1, c: "plain" }],
            [{ s: "rect", w: 17.4, h: 11, c: "plain" }, { s: "hex", r: 7.3, c: "plain" }],
            [{ s: "poly", pts: [[0, 0], [19.4, 0.25], [14.9, 10.2], [5.1, 10.2]], c: "plain" }, { s: "rect", w: 5.8, h: 12.1, c: "plain" }],
          ] },
        ] },
        { ex: "৬", mark: "kaj", text: "স্কেল ব্যবহার করে নিচের ডট কাগজে আয়ত ও বর্গ আঁকি।", body: [
          { kind: "c3p133_dots", cols: 21, rows: 6, sp: 6.4, segs: [[2, 1, 5, 1], [5, 1, 5, 3], [5, 3, 2, 3], [2, 3, 2, 1], [10, 3, 12, 3], [12, 3, 12, 5], [12, 5, 10, 5], [10, 5, 10, 3]] },
        ] },
        { ex: "১", mark: "anu", text: "বন্ধুর সঙ্গে আলোচনা করে শ্রেণিকক্ষের চারপাশের জিনিস (যেমন: বই, টেবিল, বোর্ড ইত্যাদি) থেকে আয়ত ও বর্গ খুঁজে বের করি।" },
        { ex: "২", mark: "anu", text: "নিচের ৪টি চিত্রের প্রতিটিতে বর্গের কিছু অংশ দেওয়া আছে। বর্গগুলো সম্পূর্ণ করি।", body: [
          { kind: "c3p133_sqgrid", items: [
            { sp: 10, w: 3.72, h: 3.18, ox: 0.4, oy: 0, v: [0, 1, 2, 3], hz: [1, 2], segs: [[1, 0, 3, 1], [1, 0, 0, 2], [0, 2, 2, 3]] },
            { sp: 10, w: 2.77, h: 2.96, ox: 0.4, oy: 0.5, v: [0, 1, 2], hz: [0, 1, 2], segs: [[0, 1, 1, 0], [1, 0, 2, 1]] },
            { sp: 7.9, w: 3.97, h: 3.79, ox: 0.41, oy: 0.45, v: [0, 1, 2, 3], hz: [0, 1, 2, 3], segs: [[0, 2, 2, 3]] },
          ] },
        ] },
      ],
    },
    {
      page: 142,
      title: "জ্যামিতিক প্যাটার্ন",
      spread: true,
      blocks: [
        { ask: "আমরা কীভাবে প্যাটার্ন খুঁজব?" },
        "২য় শ্রেণিতে আমরা প্যাটার্ন সম্পর্কে জেনেছি। প্যাটার্নের ক্ষেত্রে নির্দিষ্ট নিয়মে কোন কিছু (যেমন: সংখ্যা, নকশা বা জ্যামিতিক আকৃতি ইত্যাদি) সাজানো থাকে। আমাদের চারপাশে তাকালে আমরা বিভিন্ন ধরনের প্যাটার্ন দেখতে পাই। মৌমাছির চাকে খুব চমৎকার জ্যামিতিক আকৃতির প্যাটার্ন আছে।",
        { row: [
          { pic: "p142-beehive", h: 40, w: 72, fit: "cover", frame: true },
          arrow,
          { kind: "c3p133_figs", items: [{ d: "honeycomb", h: 40 }] },
        ], w: [74, 12, 42], gap: 6, justify: "center" },
        { say: "boy", mood: "talk", text: "আমাদের বিদ্যালয়ের দেয়ালে আমি চতুর্ভুজাকৃতির প্যাটার্ন দেখেছি।" },
        { kind: "c3p133_figs", items: [{ d: "wall", h: 25 }, { d: "carpet", h: 25 }], justify: "center", gap: 12 },
        { say: "girl", mood: "talk", text: "আমার বাসায় বসার ঘরের কার্পেটের নকশা বর্গাকৃতির প্যাটার্নে সাজানো।" },
        { ex: "১", mark: "kaj", text: "চলো, নিচের চিত্রগুলোতে কোনো প্যাটার্ন আছে কি না, তা খুঁজে বের করি।", body: [
          { kind: "c3p133_pat", label: "(১)", p: ["sq", "tri", "sq", "tri", "sq", "tri"], size: 15, gap: 6 },
        ] },
      ],
    },
    {
      page: 143,
      spread: true,
      blocks: [
        { gap: 1 },
        { ex: "১", mark: "kaj", text: null, body: [
          { row: [{ text: "**(২)**" }, { kind: "c3p133_figs", items: [{ d: "flower", h: 60 }], justify: "center" }], w: [13], gap: 2, align: "flex-start" },
          { kind: "c3p133_pat", label: "(৩)", p: ["dn", "rt", "dn", "rt", "dn", "rt", "rt"], size: 10, gap: 1.6, band: "#E0F2FE" },
        ] },
        { say: "boy", mood: "talk", text: "১ নম্বর চিত্রে আমি প্যাটার্ন খুঁজে পেয়েছি। একটি বর্গের পরে একটি ত্রিভুজ এবং এর পুনরাবৃত্তি ঘটেছে।" },
        { say: "girl", mood: "talk", text: "২নম্বর চিত্রে আমি প্যাটার্ন খুঁজে পেয়েছি। নীল পাপড়ির ফুলের উপর আকারে একটু ছোটো লাল পাপড়ির ফুল, তার উপর আরও ছোটো হলুদ পাপড়ির ফুল এবং এর পুনরাবৃত্তি ঘটেছে।" },
        { say: "boy", mood: "think", text: "৩ নম্বর চিত্রটিতে প্যাটার্ন আছে কি না, তা আমি বুঝতে পারছিনা।" },
        { frame: [
          "৩ নম্বর চিত্রটি প্যাটার্ন তৈরি করেনি। প্যাটার্নে সাজাতে হলে",
          { row: [
            { kind: "c3p133_pat", p: ["dn", "rt", "dn", "rt", "dn", "rt", "rt"], size: 10, gap: 1.6, band: "#E0F2FE", ring: 6 },
            "চিত্রের পরিবর্তে",
            { kind: "c3p133_pat", p: ["dn"], size: 10 },
          ], w: [94, 32, 12], gap: 3, justify: "flex-start" },
          "চিত্র থাকতে হবে।",
        ], tone: "blue", pad: 3 },
      ],
    },
    {
      page: 144,
      spread: true,
      blocks: [
        { gap: 1 },
        { ex: "২", mark: "kaj", text: "নিচের চিত্রগুলো লক্ষ করি এবং প্যাটার্ন সম্পূর্ণ করি।", body: [
          { kind: "c3p133_pat", label: "(১)", p: ["ds0", "ds1", "ds2", "ds3", "ds", "ds", "ds", "ds"], size: 16, gap: 2.6 },
          { row: [{ text: "**(২)**" }, { kind: "c3p133_strip", h: 24, s: 8.6, w: [24, 24, 34, 66], cells: [{ sq: [1, 2] }, { sq: [2, 2] }, { sq: [3, 2] }, {}] }], w: [13], gap: 0, align: "flex-start", justify: "flex-start" },
          { row: [{ text: "**(৩)**" }, { kind: "c3p133_strip", h: 20, s: 2.9, w: [36, 36, 36, 36], cells: [{ stars: [4, 3] }, { stars: [3, 2] }, { stars: [2, 1] }, {}] }], w: [13], gap: 0, align: "flex-start", justify: "flex-start" },
        ] },
        { ex: "৩", mark: "kaj", text: "নিচের জ্যামিতিক আকৃতিগুলো ব্যবহার করে পছন্দমতো প্যাটার্ন তৈরি করি।", body: [
          { kind: "c3p133_scatter", w: 120, h: 19, size: 9, items: [["circ", 0, 9], ["circ", 9.5, 1.5], ["circ", 19, 10], ["circ", 28, 1], ["tri", 41, 3], ["tri", 49, 10], ["tri", 58, 1.5], ["tri", 68, 9], ["rect", 83, 10], ["rect", 89, 0.5], ["rect", 101, 10], ["rect", 106, 0.5]] },
          { kind: "c3p133_say", who: "boy", maxw: 150, text: "আমি এই প্যাটার্নটি তৈরি করেছি।", inner: [{ kind: "c3p133_pat", p: ["circ", "tri", "rect", "circ", "tri", "rect", "circ", "tri", "rect", "circ", "tri", "rect"], size: 8.6, gap: 1.2 }] },
          { kind: "c3p133_say", who: "girl", maxw: 150, text: "আমি এই প্যাটার্নটি তৈরি করেছি।", inner: [{ kind: "c3p133_pat", p: ["circ", "circ", "tri", "tri", "rect", "rect", "circ", "circ", "tri", "tri", "rect", "rect"], size: 8.6, gap: 1.2 }] },
          { kind: "c3p133_say", who: "parrot", small: true, text: "আমরা আরও কী কী নতুন প্যাটার্ন তৈরি করতে পারি?" },
        ] },
      ],
    },
    {
      page: 145,
      spread: true,
      blocks: [
        { gap: 1 },
        { ex: "১", mark: "anu", text: "আয়ত ও বর্গ ব্যবহার করে ইচ্ছেমতো দুইটি ভিন্ন প্যাটার্ন তৈরি করি।", body: [
          { kind: "c3p133_dots", cols: 18, rows: 7, sp: 7.6 },
        ] },
        { ex: "২", mark: "anu", text: "নিচের আকৃতিগুলো বিভিন্নভাবে ব্যবহার করে পছন্দমতো প্যাটার্ন তৈরি করি।", body: [
          { kind: "c3p133_figs", items: [{ s: "star", r: 11.5, c: "yellow" }, { s: "circle", r: 9.5, c: "pink" }, { s: "hex", r: 10, c: "teal" }], justify: "center", gap: 12, align: "center" },
        ] },
        { ex: "৩", mark: "anu", text: "বিদ্যালয়ে বৈশাখী উৎসব উপলক্ষ্যে একটি অনুষ্ঠানের আয়োজন করা হবে। সেজন্য শ্রেণিকক্ষের দেয়াল সাজাতে রঙিন কাগজ কেটে পছন্দের প্যাটার্নের নকশা তৈরি করি। (প্রজেক্ট ওয়ার্ক) একটি নমুনা দেখানো হলো।", body: [
          "নিচের চিত্রের মতো ৩টি ভিন্ন বর্ণ ও আকারের বর্গ নিয়ে একটির উপর আরেকটি (বড়ো থেকে ছোটো) ক্রমান্বয়ে সাজিয়ে প্যাটার্ন তৈরি করা হয়েছে।",
          { kind: "c3p133_figs", items: [{ s: "rect", w: 22, h: 22, c: "red" }, { s: "rect", w: 15, h: 15, c: "grass" }, { s: "rect", w: 11, h: 11, c: "gold" }], justify: "center", gap: 10, align: "flex-end" },
          { text: "**প্যাটার্নের নকশা**" },
          { kind: "c3p133_tiles", n: 4, s: 15 },
        ] },
      ],
    },
    {
      page: 146,
      dense: true,
      allow: ["আঁকাবাঁকা", "বাঁক"], // tesseract drops the chandrabindu: (১) গ) "আঁকাবাঁকা রাস্তা", (৬) "বাঁক ঘুরবে"; checked by eye
      blocks: [
        { practise: "নিজে করি" },
        { ex: "১", mark: "nije", text: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দিই", body: [
          { kind: "c3p133_mcq", n: "(১)", q: "নিচের কোনটিকে সরলরেখার উদাহরণ হিসেবে ব্যবহার করা যায়?", opts: ["ক) একটি গোলকের পৃষ্ঠ", "খ) একটি টেবিলের প্রান্ত", "গ) একটি আঁকাবাঁকা রাস্তা", "ঘ) একটি বলের পৃষ্ঠ"] },
          { gap: 2.6 },
          { kind: "c3p133_mcq", n: "(২)", q: "একটি সরলকোণ গঠিত হয়–", opts: ["ক) দুটি সমকোণ দিয়ে", "খ) দুটি সূক্ষ্মকোণ দিয়ে", "গ) দুটি স্থূলকোণ দিয়ে", "ঘ) একটি সমকোণ এবং একটি স্থূলকোণ দিয়ে"] },
          { gap: 2.6 },
          { kind: "c3p133_mcq", n: "(৩)", q: "যদি একটি কাগজ আড়াআড়িভাবে দুবার ভাঁজ করা হয় তাহলে নিচের কোনটি পাওয়া যায়?", opts: ["ক) এক সমকোণ", "খ) দুটি সূক্ষ্মকোণ", "গ) চার সমকোণ", "ঘ) এক স্থূলকোণ"], cols: 4 },
          { gap: 2.6 },
          { kind: "c3p133_mcq", n: "(৪)", q: "দুটি সরলরেখা পরস্পরকে সমকোণে অতিক্রম করলে কী হয়?", opts: ["ক) একটি স্থূলকোণ গঠিত হয়", "খ) একটি সরলরেখা তৈরি হয়", "গ) চারটি সমকোণ গঠিত হয়", "ঘ) দুটি সূক্ষ্মকোণ গঠিত হয়"] },
          { gap: 2.6 },
          { kind: "c3p133_mcq", n: "(৫)", q: "আয়তের ক্ষেত্রে নিচের কোন শর্তটি আবশ্যিক?", opts: ["ক) চারটি সমান বাহু", "খ) চারটি কোণ সমকোণ", "গ) বিভিন্ন দৈর্ঘ্যের চারটি বাহু", "ঘ) শুধু একটি কোণ সমকোণ"] },
          { gap: 2.6 },
          { kind: "c3p133_mcq", n: "(৬)", q: "তোমার একটি রোবট আছে যেটি শুধুমাত্র সমকোণে ঘুরতে পারে। তুমি যদি এটিকে একটি আয়তক্ষেত্রের চারপাশ বরাবর হাঁটতে বলো, তাহলে এটি শুরুর অবস্থানে ফিরতে কতটি বাঁক ঘুরবে?", opts: ["ক) ২টি", "খ) ৩টি", "গ) ৪টি", "ঘ) ৫টি"], cols: 4 },
          { gap: 2.6 },
          { kind: "c3p133_mcq", n: "(৭)", q: "নিচের কোনটি প্যাটার্ন নয়?", opts: ["ক) মৌচাকের গঠন", "খ) বর্গাকার টাইলসের দেয়াল", "গ) এলোমেলো বিন্দু", "ঘ) একটি দাবার ছক"] },
        ] },
      ],
    },
    {
      page: 147,
      spread: true,
      allow: ["চাঁদা"], // tesseract drops the chandrabindu: (৮) খ) "একটি চাঁদা দিয়ে"; checked by eye
      blocks: [
        { gap: 1 },
        { ex: "১", mark: "nije", text: null, body: [
          { kind: "c3p133_mcq", n: "(৮)", tpl: "auto auto", size: 11.5, q: "একটি ত্রিভুজের একটি কোণ সমকোণ কিনা তা কীভাবে বের করা যায়?", opts: ["ক) ত্রিভুজটিকে আড়াআড়ি ভাঁজ করে", "খ) একটি চাঁদা দিয়ে পরিমাপ করে", "গ) ত্রিভুজটির উপর দিয়ে আরেকটি রেখা অংকন করে", "ঘ) আকৃতির উপর ভিত্তি করে অনুমান করে"] },
          { kind: "c3p133_mcq", n: "(৯)", q: "নিচের কোন বাক্যটি সঠিক নয়, তা শনাক্ত করি?", opts: ["(ক) সূক্ষ্মকোণ এক সমকোণ অপেক্ষা ছোটো।", "(খ) সরলকোণ দুই সমকোণের সমান।", "(গ) স্থূলকোণ দুই সমকোণ অপেক্ষা বড়ো।", "(ঘ) সকল বর্গই আয়ত।"], cols: 1 },
        ] },
        { ex: "২", mark: "nije", text: "সংক্ষিপ্ত প্রশ্ন", body: [
          { kind: "c3p133_mcq", n: "(১)", q: "ইমা তার বইগুলিকে একটি শেলফে V-আকৃতিতে সাজিয়েছে। বই দ্বারা গঠিত কোণ ৯০ ডিগ্রির কম হলে, ইমা কোন ধরনের কোণ তৈরি করেছে?" },
          { kind: "c3p133_mcq", n: "(২)", q: "তুমি একটি আয়তাকার কাগজ দুটি সমান অর্ধেকে ভাঁজ করলে এবং তারপর আবার চতুর্থাংশে ভাঁজ করলে। মূল আয়তটির দৈর্ঘ্য ১২ সেমি এবং প্রস্থ ৮ সেমি হলে, দ্বিতীয় ভাঁজের পরে ভাঁজ করা আয়তটির দৈর্ঘ্য ও প্রস্থ কত হবে?" },
          { kind: "c3p133_mcq", n: "(৩)", q: "নিচের কোণগুলোর নাম লিখি ও কারণ ব্যাখ্যা করি।" },
          // the book draws the straight angle (3rd column) in the নাম row, not the কোণ row: kept as printed
          { kind: "c3p133_angtab", h: [28, 18, 24], cols: [
            [{ a0: 0, deg: 90, L: 18, arc: "arc", r: 3.4 }],
            [{ a0: 0, deg: 100, L: 18, arc: "arc", r: 3.4 }],
            [null, { a0: 0, deg: 180, L: 12, arc: "semi", r: 3.4, h: 6 }],
            [{ a0: 0, deg: 72, L: 18, arc: "arc", r: 3.4 }],
          ] },
        ] },
      ],
    },
    {
      page: 148,
      spread: true,
      blocks: [
        { gap: 1 },
        { ex: "৩", mark: "nije", text: "মিল করি", body: [
          { kind: "c3p133_match", rows: [
            [{ d: "can", arrow: true, h: 17 }, "বিন্দু"],
            [{ d: "book", arrow: true, h: 14 }, "রেখা"],
            [{ d: "palette", arrow: true, h: 16 }, "সমতল"],
            [{ d: "track", arrow: true, h: 15 }, "বক্রতল"],
          ] },
        ] },
        { ex: "৪", mark: "nije", text: "একটি চতুর্ভুজকে কখন বর্গ বলতে পারি?" },
        { ex: "৫", mark: "nije", text: "খালিস্থানে সঠিক আকৃতি বসিয়ে নিচের প্যাটার্নগুলো সম্পূর্ণ করি।", body: [
          { kind: "c3p133_pat", label: "(ক)", p: ["T", "t", "t", "T", "_", "t", "_", "_", "t"], size: 14, gap: 2.4 },
          { kind: "c3p133_pat", label: "(খ)", p: ["A", "O", "A", "O", "O", "A", "_", "_", "_", "_"], size: 11, gap: 2.4 },
        ] },
        { ex: "৬", mark: "nije", text: "নিচের চিত্রগুলো প্যাটার্ন হবে কি না, তা খুঁজে বের করি। সঠিক উত্তরের উপরে টিক (✓) চিহ্ন দিই এবং কারণ বলি।", body: [
          { kind: "c3p133_pat", label: "(ক)", p: ["chr", "chu", "chl", "chr", "chu", "chl"], size: 10, gap: 2, after: "হ্যাঁ / না" },
          { kind: "c3p133_pat", label: "(খ)", p: ["plus", "oval", "bdn", "plus", "oval", "bup", "plus", "oval", "bdn"], size: 10, gap: 2, after: "হ্যাঁ / না" },
        ] },
      ],
    },
  ],
};
