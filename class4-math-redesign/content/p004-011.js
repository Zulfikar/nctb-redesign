// অধ্যায় ১ · সংখ্যা ও স্থানীয় মান: printed pages 4–11 (PDF pages 11–18), every word as printed.
// p4 কোটি (the primary-school students of 2022, ২১০৪৬০৯১) and the international reading (মিলিয়ন); p5 দেশীয় ও আন্তর্জাতিক
// গণনা রীতির তুলনা and অনুশীলন ৪–৫; p6 অনুশীলন ৬–১০; p7 ‘কমা’-র ব্যবহার; pp8–10 সংখ্যার তুলনা; p11 the bicycles' prices in order.
// Own kinds (content/p004-011.parts.js): c4p004_tab (coloured tables), c4p004_tree (digit tree with answer boxes),
// c4p004_commas (a number in boxes with its commas and arcs), c4p004_groups (the place table in comma groups),
// c4p004_cmpdig (two numbers' digits with arrows into the columns compared), c4p004_nline, c4p004_rule, c4p004_order,
// c4p004_line, c4p004_panels. Reused: this book's c4p001_named; Class 2's p011_tab; Class 3's c3p001_box, c3p001_arrow,
// c3p011_cmp.
// The book's triangles (p4 ৩, p9 ১) are printed pale blue; its key page (PDF p5) makes a triangle কাজ, so they are কাজ here.
// No pictures: the book's only ones on these pages are the speakers' faces (p11 has no picture of the bicycle shop).
// The book's slips, kept as printed: p10's number line starts at a Latin "0" (the other labels are Bangla).
const say = (who, mood, text, side) => ({ say: who, mood, text, ...(side ? { side } : {}) });
const PL8 = ["কোটি", "নিযুত", "লক্ষ", "অযুত", "হাজার", "শতক", "দশক", "একক"];
// a line of words with its answer box on the right (as on p. 3)
const ansRow = (text) => ({ row: [text, { kind: "c3p001_box", w: 52, h: 8 }], w: [0, 54], gap: 3 });
// p. 5 অনুশীলন ৪: a number, then its two readings to write (দেশীয় in yellow, আন্তর্জাতিক in pink)
const readRows = (n) => [
  { h: 8.6, cells: [{ c: n, rs: 2, type: "num" }, "দেশীয় রীতিতে", { c: "", t: "y" }] },
  { h: 8.6, in: true, cells: ["আন্তর্জাতিক রীতিতে", { c: "", t: "p" }] },
];
// p. 5 অনুশীলন ৫: a number, then its eight places to fill (each column tinted, as in the book)
const TINTS = ["rose", "lime", "mint", "blush", "sage", "amber", "salmon", "sky"];
const fillRow = (n) => ({ h: 9.4, cells: [{ c: n, type: "num", align: "right", pad: "1mm 3mm" }, ...TINTS.map((t) => ({ c: "", t }))] });

module.exports = {
  pages: [
    {
      page: 4,
      spread: true,
      blocks: [
        { ex: "৩", mark: "kaj", text: "২০২২ সালের হিসাব অনুযায়ী বাংলাদেশের প্রাথমিক বিদ্যালয়গুলোতে ২১০৪৬০৯১ জন শিক্ষার্থী ছিল। সংখ্যাটি কীভাবে পড়ব ও লিখব?", body: [
          { row: [
            say("boy", "think", "অনেক শিক্ষার্থী! আমার মনে হচ্ছে, সংখ্যাটি লিখতে আরেকটি স্থানের প্রয়োজন।"),
            say("girl", "think", "এই নতুন স্থানটির নাম কী?"),
          ], w: [94, 0], gap: 3 },
          say("parrot", "talk", "এই নতুন স্থানের নাম ‘কোটি’।\n১ কোটি হলো ১০ নিযুত এবং লেখা হয় ১০০০০০০০"),
        ] },
        { kind: "c4p001_named", label: "স্থানের নাম", w: 34, body: { kind: "p011_tab", tone: "blue", rows: [
          { type: "hd", cells: PL8 },
          { type: "num", cells: ["২", "১", "০", "৪", "৬", "০", "৯", "১"] },
          { cells: ["দুই কোটি", { c: "দশ লক্ষ", span: 2 }, { c: "ছেচল্লিশ হাজার", span: 2 }, "–", { c: "একানব্বই", span: 2 }] },
        ] } },
        say("parrot", "talk", "আন্তর্জাতিক গণনা রীতিতে\n১ নিযুত বা ১০ লক্ষকে ‘এক মিলিয়ন’ বলে।"),
        say("boy", "talk", "আমরা ‘২১০৪৬০৯১’ সংখ্যাটি পড়ি\n‘দুই কোটি দশ লক্ষ ছেচল্লিশ হাজার একানব্বই’।"),
        // the book's colours: কোটি and লক্ষ blue, হাজার orange, শতক green, দশক pink, একক yellow
        { kind: "c4p004_tab", rows: [
          { type: "hd", h: 9, cells: [{ c: "কোটি", t: "bH" }, { c: "লক্ষ", span: 2, t: "bH" }, { c: "হাজার", span: 2, t: "oH" }, { c: "শতক", t: "gH" }, { c: "দশক", t: "pH" }, { c: "একক", t: "yH" }] },
          { type: "num", h: 10.5, cells: [{ c: "২", t: "b" }, { c: "১", t: "b" }, { c: "০", t: "b" }, { c: "৪", t: "o" }, { c: "৬", t: "o" }, { c: "০", t: "g" }, { c: "৯", t: "p" }, { c: "১", t: "y" }] },
        ] },
        { text: "আন্তর্জাতিক গণনা রীতিতে সংখ্যাটি পড়ি\n‘একুশ মিলিয়ন ছেচল্লিশ হাজার একানব্বই’।", center: true },
        { kind: "c4p004_tab", rows: [
          { type: "hd", h: 9, cells: [{ c: "মিলিয়ন", span: 3, t: "bH" }, { c: "হাজার", span: 3, t: "oH" }, { c: "শতক", t: "gH" }, { c: "দশক", t: "pH" }, { c: "একক", t: "yH" }] },
          { type: "num", h: 10.5, cells: [{ c: "", t: "b" }, { c: "২", t: "b" }, { c: "১", t: "b" }, { c: "০", t: "o" }, { c: "৪", t: "o" }, { c: "৬", t: "o" }, { c: "০", t: "g" }, { c: "৯", t: "p" }, { c: "১", t: "y" }] },
        ] },
      ],
    },
    {
      page: 5,
      title: "দেশীয় ও আন্তর্জাতিক গণনা রীতির তুলনা",
      spread: true,
      blocks: [
        // the book's table: the domestic places (two header rows), the number, the international groups under them
        { kind: "c4p004_tab", cols: ["17%", ...Array(9).fill("9.22%")], rows: [
          { type: "hd", h: 8, cells: [{ c: "দেশীয়", rs: 2, t: "pH" }, { c: "কোটি", span: 2, t: "p" }, { c: "লক্ষ", span: 2, t: "p" }, { c: "হাজার", span: 2, t: "p" },
            { c: "শতক", rs: 2, t: "p" }, { c: "দশক", rs: 2, t: "p" }, { c: "একক", rs: 2, t: "p" }] },
          { type: "hd", h: 8, in: true, cells: ["", "কোটি", "নিযুত", "লক্ষ", "অযুত", "হাজার"].map((c) => ({ c, t: "p" })) },
          { type: "num", h: 9.5, cells: [{ c: "সংখ্যা", t: "cH", type: "hd" }, ...["", "২", "১", "০", "৪", "৬", "০", "৯", "১"].map((c) => ({ c, t: "c" }))] },
          { type: "hd", h: 8.5, cells: [{ c: "আন্তর্জাতিক", t: "oH" }, { c: "মিলিয়ন", span: 3, t: "o" }, { c: "হাজার", span: 3, t: "o" }, { c: "", t: "o" }, { c: "", t: "o" }, { c: "", t: "o" }] },
        ] },
        { ex: "৪", mark: "anu", text: "কথায় লিখি।", body: [
          { kind: "c4p004_tab", cols: ["24%", "26%", "50%"], rows: [
            { type: "hd", h: 8, cells: [{ c: "সংখ্যা", t: "bH" }, { c: "", t: "bH" }, { c: "", t: "bH" }] },
            ...readRows("১৩২০৫৬২৮"), ...readRows("৪৩৪৫১২৮০"), ...readRows("৭৬২০৬২৪"), ...readRows("৪২৯৮১০৫৬"),
          ] },
        ] },
        { ex: "৫", mark: "anu", text: "খালিঘর পূরণ করি।", body: [
          { kind: "c4p004_tab", cols: ["19%", ...Array(8).fill("10.125%")], rows: [
            { type: "hd", h: 8.5, cells: ["সংখ্যা", ...PL8].map((c) => ({ c, t: "bH" })) },
            fillRow("৪২৭৮০৫"), fillRow("৫১২৮৭৬৯৫"), fillRow("৭২৪৮৫৯২"), fillRow("৫৪৯০১০৬৭"),
          ] },
        ] },
      ],
    },
    {
      page: 6,
      spread: true,
      blocks: [
        { ex: "৬", mark: "anu", text: "(১) ১৬৫২৩৯১২ সংখ্যাটিতে ৬ ও ৩ এর স্থানীয় মান কত? কোটি স্থানের অঙ্কটি কত?\n(২) ২৪৫৫৭৮১ নিযুত স্থানের অঙ্কটি কত? ৪ এর স্থানীয় মান কত?" },
        { ex: "৭", mark: "anu", text: "২০২২ সালের আদমশুমারি অনুযায়ী বাংলাদেশের মোট জনসংখ্যার মধ্যে ৮১৭১২৮২৪ জন পুরুষ ও ৮৩৩৪৭২০৬ জন নারী। সংখ্যা দুইটি উচ্চ স্বরে পড়ি, কথায় লিখি এবং অঙ্কগুলোর স্থানীয় মান নির্ণয় করি।" },
        { ex: "৮", mark: "anu", text: "সংখ্যাটির অঙ্কগুলোর স্থানীয় মান লিখি।", body: [
          { kind: "c4p004_tree", digits: "৪৬১২৭৮৫৯", labels: ["একক", "দশক", "শতক", "হাজার", "অযুত", "লক্ষ", "নিযুত", "কোটি"], w: 150, rh: 7.4 },
        ] },
        { ex: "৯", mark: "anu", text: "কথায় লিখি।", body: [
          { sums: ["(১) ২৬৭১৩৯৫", "(২) ৩৮৯৫৪১২৯", "(৩) ৪৪৪৪৪৪৪৪", "(৪) ২০৪৫২৩৭৮"], cols: 4 },
        ] },
        { ex: "১০", mark: "anu", text: "অঙ্কে লিখি।", body: [
          ansRow("(১) ছাপ্পান্ন লক্ষ ষাট হাজার সাতশত উনআশি"),
          ansRow("(২) এক কোটি বারো লক্ষ তেরো হাজার পাঁচশত বাইশ"),
          ansRow("(৩) তিন কোটি ষোলো লক্ষ তেত্রিশ হাজার নয়শত নিরানব্বই"),
          ansRow("(৪) পাঁচ কোটি ত্রিশ লক্ষ পঞ্চান্ন হাজার দুইশত বাষট্টি"),
        ] },
      ],
    },
    {
      page: 7,
      title: "‘কমা’-র ব্যবহার",
      spread: true,
      blocks: [
        { ask: "আমরা সহজে বড়ো সংখ্যা কীভাবে গণনা করতে পারি?" },
        { row: [
          say("boy", "talk", "বড়ো কোনো সংখ্যা গণনা করতে আমরা প্রায়ই সমস্যার সম্মুখীন হই।"),
          say("girl", "talk", "এই সমস্যা সমাধানে সংখ্যাটি সহজে পড়ার জন্য ‘কমা’ ব্যবহার করি।"),
        ], gap: 3 },
        { text: "কীভাবে কমা ব্যবহার করতে হয়, তা একটি উদাহরণে দেখি।\nযেমন: বাংলাদেশে প্রাথমিক বিদ্যালয়ের মোট শিক্ষার্থী প্রায় ২১০৪৬০৯১ জন।", center: true },
        { kind: "c4p004_panels", panels: [
          { tone: "yellow", body: [
            { sub: "দেশীয় রীতিতে কমার ব্যবহার" },
            { kind: "c4p004_commas", digits: "২১০৪৬০৯১", commas: [0, 2, 4], arcs: [[3, 1, "২ অঙ্ক"], [5, 3, "২ অঙ্ক"], [8, 5, "৩ অঙ্ক"]] },
            { text: "দেশীয় রীতিতে সংখ্যায় ডান দিকের ৩টি অঙ্ক পর প্রথম কমা, তারপর ২টি অঙ্ক পরপর কমা দিতে হয়।", center: true },
          ] },
          { tone: "pink", body: [
            { sub: "আন্তর্জাতিক রীতিতে কমার ব্যবহার" },
            { kind: "c4p004_commas", digits: "২১০৪৬০৯১", commas: [1, 4], arcs: [[5, 2, "৩ অঙ্ক"], [8, 5, "৩ অঙ্ক"]] },
            { text: "আন্তর্জাতিক রীতিতে সংখ্যায় ডান দিক থেকে ৩টি অঙ্ক পরপর কমা দিতে হয়।", center: true },
          ] },
        ] },
        { kind: "c4p004_groups", caption: "কোটি, লক্ষ ও হাজার প্রতি স্থানের পর একটি করে কমা দিতে হয়।", groups: [
          { small: true, flex: 1.3, rows: [{ type: "hd", t: "vH", h: 7.4, cells: ["কোটি"] }, { type: "num", t: "v", h: 8, cells: ["২"] }, { t: "v", h: 7.4, cells: ["দুই কোটি"] }] },
          { small: true, flex: 2, rows: [{ type: "hd", t: "bH", h: 7.4, cells: ["নিযুত", "লক্ষ"] }, { type: "num", t: "b", h: 8, cells: ["১", "০"] }, { t: "b", h: 7.4, cells: [{ c: "দশ লক্ষ", span: 2 }] }] },
          { small: true, flex: 2, rows: [{ type: "hd", t: "oH", h: 7.4, cells: ["অযুত", "হাজার"] }, { type: "num", t: "o", h: 8, cells: ["৪", "৬"] }, { t: "o", h: 7.4, cells: [{ c: "ছেচল্লিশ হাজার", span: 2 }] }] },
          { small: true, flex: 3, rows: [{ type: "hd", t: "gH", h: 7.4, cells: ["শতক", "দশক", "একক"] }, { type: "num", t: "g", h: 8, cells: ["০", "৯", "১"] }, { t: "g", h: 7.4, cells: ["–", { c: "একানব্বই", span: 2 }] }] },
        ] },
        say("girl", "talk", "কমা ব্যবহার করে সংখ্যা সহজে পড়তে পারি।"),
        { ex: "১", mark: "anu", text: "দেশীয় ও আন্তর্জাতিক রীতিতে সংখ্যার মাঝে সঠিক জায়গায় কমা বসাই এবং পড়ি।", body: [
          { sums: ["(১) ৩২০৬", "(২) ৫২১৫৭২৩", "(৩) ৪৮৬৪১৭৮৫", "(৪) ৮০০০৬"], cols: 4 },
        ] },
      ],
    },
    {
      page: 8,
      title: "সংখ্যার তুলনা",
      spread: true,
      blocks: [
        { ask: "কোন সংখ্যাটি বড়ো?" },
        { text: "৪৮৫০০০ ও ৪২৮০০০-এর মধ্যে কোনটি বড়ো?", big: true },
        { row: [
          say("boy", "talk", "আমরা ৩য় শ্রেণিতে পাঁচ অঙ্কের সংখ্যার তুলনা করতে শিখেছিলাম।"),
          say("girl", "talk", "মনে পড়েছে। আমরা এক এক করে বড়ো স্থান থেকে ছোটো স্থান তুলনা করব।"),
        ], gap: 3 },
        { kind: "c4p004_cmpdig", rows: ["৪৮৫০০০", "৪২৮০০০"], tint: { 0: "#DCFCE7", 1: "#FFEDD5" },
          arrows: [{ col: 0, text: "লক্ষ স্থানের অঙ্ক দুইটি সমান" }, { col: 1, text: "অযুতের স্থানে ২ অপেক্ষা ৮ বড়ো" }] },
        { text: "তাই বলা যায় যে, ৪২৮০০০ থেকে ৪৮৫০০০ বড়ো।" },
        { text: "৪৮৫০০০ > ৪২৮০০০", big: true, center: true },
        { ex: "১", mark: "anu", text: "নিচের সংখ্যা দুইটি তুলনা করি।", body: [{ text: "৫৬২৯০৭১ এবং ৫৬২৪৩২৯", big: true, center: true }] },
        { col: [
          say("boy", "talk", "আমরা একে একে বড়ো স্থানীয় মান থেকে ছোটো স্থানীয় মান তুলনা করব। প্রথমে নিযুতের স্থান, এরপর লক্ষের স্থান, এরপর অযুতের স্থান, এরপর হাজারের স্থান, এরপর শতকের স্থান, এরপর দশকের স্থান এবং সবশেষে এককের স্থান।"),
          say("girl", "talk", "নিযুত, লক্ষ এবং অযুতের স্থানের অঙ্ক একই। ৫, ৬ ও ২"),
        ], gap: 3 },
      ],
    },
    {
      page: 9,
      spread: true,
      blocks: [
        { col: [
          say("boy", "talk", "এবার হাজার স্থানের অঙ্ক তুলনা করি। ৪ থেকে ৯ বড়ো।"),
          say("girl", "talk", "তাহলে বলতে পারি, ৫৬২৪৩২৯ থেকে ৫৬২৯০৭১ বড়ো।"),
        ], gap: 4 },
        { ex: "২", mark: "anu", text: "নিচের সংখ্যাগুলো তুলনা করি এবং খালি ঘরে ‘<’ বা ‘>’ চিহ্ন বসাই।", body: [
          { kind: "c3p011_cmp", items: [["৭৬৪০০", "৮৬৪০০"], ["৭৬৫৩১১", "৭৬৯৩১১"], ["৪৫৭২৩১০", "৪৫৭২৩৬৪"], ["২৭৪৮৯৭১৪", "২৮৪৮৯৭১৪"], ["৬৫৫৫২১২", "৬৫৫৫২১৯"], ["৩৪০৫২১৮৮", "৬৮০১২৩৭৫"]] },
        ] },
        { ex: "১", mark: "kaj", text: "৩৯০০০ ও ৩৭১০২০ এর মধ্যে কোনটি বড়ো?", body: [
          { col: [
            say("boy", "think", "আমার মনে হচ্ছে ৩৯০০০ সংখ্যাটি ৩৭১০২০ থেকে বড়ো।\nকারণ ৭ থেকে ৯ বড়ো।"),
            say("girl", "think", "অপেক্ষা করো! আমরা মাঝে মাঝে বড়ো সংখ্যা ভুল পড়ি।\nচলো, সংখ্যাগুলো সঠিক স্থানে বসাই অথবা কমা দিই।"),
          ], gap: 3 },
          { row: [
            { kind: "p011_tab", tone: "blue", rows: [
              { type: "num", h: 12, cells: ["", "৩", "৯", "০", "০", "০"] },
              { type: "num", h: 12, cells: ["৩", "৭", "১", "০", "২", "০"] },
            ] },
            { frame: [{ kind: "c4p004_line", items: ["৩৯,০০০", "৩,৭১,০২০"], gap: 14, size: 15 }] },
          ], w: [76, 0], gap: 6 },
        ] },
      ],
    },
    {
      page: 10,
      spread: true,
      blocks: [
        say("boy", "talk", "বাহ! তাই তো! এখানে অঙ্ক সংখ্যা ভিন্ন।\nস্পষ্টই বোঝা যাচ্ছে ৩৭১০২০ সংখ্যাটি ৩৯০০০ থেকে বড়ো।"),
        { text: "৩৭১০২০ > ৩৯০০০", big: true, center: true },
        { col: [
          "চলো, সংখ্যারেখায় সংখ্যা দুটি চিহ্নিত করি এবং তুলনা করি।",
          // a tick every 10000 from 0 to 440000, as printed; the arrows at ৩৯০০০ and ৩৭১০২০, their boxes empty
          { kind: "c4p004_nline", from: 0, to: 440000, minor: 10000, mid: 50000, major: 100000, w: 166,
            labels: { 0: "0", 100000: "১০০০০০", 200000: "২০০০০০", 300000: "৩০০০০০", 400000: "৪০০০০০" }, arrows: [39000, 371020] },
        ], gap: 3 },
        { kind: "c4p004_rule", head: "দুইটি সংখ্যা তুলনার পদ্ধতি", items: [
          ["১.", "যে সংখ্যায় অঙ্কের সংখ্যা বেশি সেটি বৃহত্তর।"],
          ["২.", "অঙ্কের সংখ্যা যখন সমান থাকে তখন–"],
          ["(ক)", "যে সংখ্যায় বৃহত্তম স্থানের অঙ্কটি বড়ো সেই সংখ্যাটি বড়ো।", true],
          ["(খ)", "যদি বৃহত্তম স্থানের অঙ্ক সমান হয়, তবে পরবর্তী স্থানের অঙ্ক দুইটি তুলনা করতে হবে যতক্ষণ পর্যন্ত না সংখ্যা দুইটির মধ্যে একটি বড়ো অঙ্ক পাওয়া যায়।", true],
          ["(গ)", "যদি সংখ্যা দুইটির সবগুলো অঙ্ক অবস্থান অনুযায়ী সমান হয়, তবে সংখ্যা দুইটি সমান।", true],
        ] },
        { ex: "৩", mark: "anu", text: "নিচের সংখ্যাগুলো তুলনা করে খালি ঘরে ‘<’ বা ‘>’ চিহ্ন বসাই।", body: [
          { kind: "c3p011_cmp", items: [["৯৮৩৭০", "২১৪১৩০"], ["৫৫৫৫৫৫", "৯৯৯৯৯"], ["১০০৪৫৬", "১০০০৪৫৬"], ["১৬২৯৫২০৫", "৯৫৯৮৪১০"]] },
        ] },
      ],
    },
    {
      page: 11,
      spread: true,
      blocks: [
        { ask: "রতন তার বাবার সঙ্গে সাইকেল কিনতে দোকানে গেল। তারা বিভিন্ন দোকানে যাচাই করে দেখল সাইকেলের দাম ৫৬৪৮ টাকা, ৭৪২৫ টাকা, ৮৬০০ টাকা, ৬৫৯৯ টাকা ও ৭৪৫০ টাকা। কোন দামের সাইকেলটি সবচেয়ে সস্তা এবং কোনটি সবচেয়ে দামি?" },
        { col: [
          say("boy", "think", "বেশ, সবগুলো সংখ্যাই চার অঙ্কের। স্থানগুলো স্পষ্ট করার জন্য কমা বসালে কেমন হয়?"),
          say("girl", "talk", "সংখ্যাগুলো তুলনা করার জন্য উপর-নিচে সাজাই।"),
        ], gap: 3 },
        { row: [
          { frame: [
            { kind: "c4p004_line", items: ["৫,৬৪৮", "৭,৪২৫", "৮,৬০০"], gap: 12 },
            { kind: "c4p004_line", items: ["৬,৫৯৯", "৭,৪৫০"], gap: 12 },
          ], pad: 4 },
          { kind: "c3p001_arrow", dir: "right" },
          { kind: "p011_tab", tone: "yellow", small: true, rows: [["৫", "৬", "৪", "৮"], ["৭", "৪", "২", "৫"], ["৮", "৬", "০", "০"], ["৬", "৫", "৯", "৯"], ["৭", "৪", "৫", "০"]].map((cells) => ({ type: "num", cells })) },
        ], w: [76, 12, 0], gap: 4, justify: "center" },
        "সংখ্যাগুলোর স্থানীয় মান পর্যবেক্ষণ করে আমরা পাই",
        { kind: "c4p004_order", items: ["৫৬৪৮", "৬৫৯৯", "৭৪২৫", "৭৪৫০", "৮৬০০"], sign: "<", marks: { 0: "ক্ষুদ্রতম", 4: "বৃহত্তম" } },
        "সবচেয়ে সস্তা সাইকেলটির মূল্য ৫৬৪৮ টাকা।\nসবচেয়ে দামি সাইকেলটির মূল্য ৮৬০০ টাকা।",
        say("boy", "talk", "আমরা সংখ্যাগুলোকে বৃহত্তর থেকে ক্ষুদ্রতর ক্রমেও সাজাতে পারি।\n৮৬০০ > ৭৪৫০ > ৭৪২৫ > ৬৫৯৯ > ৫৬৪৮"),
      ],
    },
  ],
};
