// অধ্যায় ৪ · যোগ ও বিয়োগের সম্পর্ক (pp. 37–41) and the start of অধ্যায় ৫ · গুণ (pp. 42–50): printed pages 37–50
// (PDF pages 43–56), every word and number as printed.
// Own kinds: content/p037-050.parts.js (c3p037_…). Class 2 kinds reused: p040_cs (sums in columns), p088_dots (dot arrays),
// p088_namta (a times-table card with boxes), p088_flower (multiplication flowers), p073_wbox (an empty box to write in),
// p011_money (the ten-taka notes), p056_icon (an arrow).
const BN = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

/** p40's sums in columns: "(১)", the numbers (the last one with its sign), and empty boxes for the answer. The boxes
 *  depend only on the question (one more than the longest number for an addition), so their count can't give the answer away. */
function cs(mk, nums, op) {
  const rows = nums.map((x, i) => (i === nums.length - 1 ? (op === "+" ? "+" : "−") : "") + BN(x));
  const longest = Math.max(...nums.map((x) => String(x).length));
  return { mk: `(${BN(mk)})`, rows, ans: "", width: op === "+" ? longest + 1 : longest };
}

module.exports = {
  pages: [
    // ───────────── অধ্যায় ৪ · যোগ ও বিয়োগের সম্পর্ক ─────────────
    {
      page: 37,
      opener: { title: "যোগ ও বিয়োগের সম্পর্ক" },
      dense: true,
      blocks: [
        { ask: "যোগ ও বিয়োগের মধ্যে কোনো সম্পর্ক আছে কি?" },
        // Class 2's compact speech cards (p011_chat): smaller faces, so the crowded opener fits
        { kind: "p011_chat", gap: 2, lines: [
          { say: "girl", mood: "talk", text: "আমরা দ্বিতীয় শ্রেণিতে শিখেছি, তোমার মনে পড়েছে কি? আমরা নিচের প্রশ্ন সমাধান করি।" },
          { say: "parrot", side: "left", text: "আমাদের কিছু আপেল ছিল। তা থেকে ৬টি বিক্রি করার পর আমাদের এখন ৮টি আপেল আছে। প্রথমে আমাদের কতগুলো আপেল ছিল?" },
          { say: "boy", mood: "talk", side: "right", text: "এটি আমার মনে পড়েছে। আমরা হিসাব করি □ − ৬ = ৮\nকতটি থেকে ৬টি বাদ দিলে ৮টি থাকে?" },
        ] },
        // the book prints "১৪ − ৬ = ৮" twice (the second family member would be ৬ + ৮ = ১৪); kept as printed
        { row: [
          { text: "নিচের মতো বিয়োগ ও যোগ বিপরীত প্রক্রিয়া\n**১৪ − ৬ = ৮, ৮ + ৬ = ১৪** এবং\n**১৪ − ৮ = ৬, ১৪ − ৬ = ৮**" },
          { kind: "c3p037_terms", rows: [["১৪", "বিয়োজন"], ["৬", "বিয়োজ্য"], ["৮", "বিয়োগফল"]] },
        ], w: [null, 66], align: "center" },
        { kind: "c3p037_rel", rows: [
          ["বিয়োজন", "−", "বিয়োজ্য", "=", "বিয়োগফল"],
          ["বিয়োগফল", "+", "বিয়োজ্য", "=", "বিয়োজন"],
          ["বিয়োজন", "−", "বিয়োগফল", "=", "বিয়োজ্য"],
        ] },
        { note: "বিয়োজন, বিয়োজ্য ও বিয়োগফলের মধ্যে একটি নির্দিষ্ট সম্পর্ক রয়েছে।" },
        { ex: "১", mark: "anu", text: "খালিঘর পূরণ করি", body: [
          { sums: ["৪২ − ৯ = □", "৫৫ − □ = ৩০", "□ − ৩২ = ৫৪", "৩৩ + □ = ৪২", "৩০ + ২৫ = □", "৮৬ − ৫৪ = □", "□ − ৩৩ = ৯", "□ − ৩০ = ২৫", "৫৪ + ৩২ = □"], cols: 3, marks: true, size: 12.5 },
        ] },
      ],
    },
    {
      page: 38,
      spread: true,
      blocks: [
        { ex: "১", mark: "kaj", text: null, body: [
          // the boy's question sits beside the picture, under the problem (in the book it is under the picture)
          { row: [
            { col: [
              { kind: "c3p037_mk", mark: "kaj", n: "১", text: "একটি ট্রেনে ১৬৩৭ জন যাত্রী ছিল। একটি স্টেশনে ৮৬৫ জন যাত্রী নেমে গেল এবং ৭৩০ জন নতুন যাত্রী উঠল। এখন ট্রেনটিতে মোট কতজন যাত্রী আছে?" },
              { kind: "p011_chat", lines: [{ say: "boy", mood: "think", text: "‘যাত্রী নেমে যাওয়ায়’ বিয়োগ করতে হবে এবং ‘যাত্রী ওঠায়’ যোগ করতে হবে। আমি কীভাবে হিসাবটি করতে পারি?" }] },
            ], gap: 3 },
            { pic: "p038-train-station", h: 56, w: 80, frame: true },
          ], w: [null, 82], align: "center", gap: 3 },
          { text: "গাণিতিক বাক্য **১৬৩৭ − ৮৬৫ + ৭৩০ =** □" },
          { kind: "c3p037_flow", first: { rows: ["১৬৩৭", "−৮৬৫"], ans: "৭৭২" }, second: { rows: ["৭৭২", "+৭৩০"], ans: "১৫০২" }, size: 15 },
          { text: "এখন ট্রেনটিতে মোট ১৫০২ জন যাত্রী আছে।", center: true },
        ] },
        { ex: "২", mark: "kaj", text: "কোনো বিদ্যালয়ে মোট ৫৩৮ জন শিক্ষার্থী ছিল। ঐ বিদ্যালয়ে ১২৫ জন নতুন শিক্ষার্থী ভর্তি হলো এবং ৯৩ জন শিক্ষার্থী অন্য বিদ্যালয়ে চলে গেল। এখন বিদ্যালয়ে মোট কতজন শিক্ষার্থী আছে?", body: [
          { row: [
            { col: [
              { kind: "c3p037_ledger", rows: [
                { l: "শিক্ষার্থীর সংখ্যা", v: "৫৩৮", u: "জন" },
                { l: "নতুন শিক্ষার্থী ভর্তি", v: "+ ১২৫", u: "জন", rule: true },
                { l: "", v: "□", u: "জন" },
                { l: "শিক্ষার্থী চলে গেল", v: "− ৯৩", u: "জন", rule: true },
                { l: "শিক্ষার্থী আছে", v: "□", u: "জন" },
              ] },
              { text: "বিদ্যালয়ে মোট শিক্ষার্থী □ জন।" },
            ], gap: 2 },
            { say: "girl", mood: "talk", text: "এখানে ‘নতুন শিক্ষার্থী ভর্তি’ যোগ করতে হবে এবং ‘শিক্ষার্থী অন্য বিদ্যালয়ে চলে যাওয়া’ বিয়োগ করতে হবে।" },
          ], w: [74, null], align: "flex-start", gap: 3 },
        ] },
      ],
    },
    {
      page: 39,
      spread: true,
      allow: ["২৪"] /* the answer ২৪ in the yellow circle of the worked row: printed, tesseract misses it (checked by eye) */,
      blocks: [
        { ex: "২", mark: "anu", text: "খালিঘর পূরণ করি", body: [
          "রেজার ৬৫টি মার্বেল ছিল। তার বাবা তাকে আরো ৪৮টি মার্বেল দিলেন। এখন রেজার কাছে মার্বেল হলো □ টি।",
          { kind: "c3p037_bar", parts: ["□", "+", "□", "=", "□"] },
          "বন্ধুদের সঙ্গে খেলতে গিয়ে রেজার ১৭টি মার্বেল হারিয়ে গেল। রেজার কাছে মার্বেল রইল □টি।",
          { kind: "c3p037_bar", parts: ["□", "−", "□", "=", "□"] },
        ] },
        { ex: "৩", mark: "anu", text: "খালিঘরে ঠিকমতো সংখ্যা লিখে দুইটি করে সমস্যা তৈরি করি। একটি করে দেখানো হলো।", body: [
          { kind: "c3p037_maker", k: 0.8, rows: [
            { n: "১", plus: ["১৪", "১০"], minus: ["২৯", "৫"], res: "২৪",
              ka: "লিমুর ১৪টি কলম ছিল। তার মা তাকে আরো ১০টি কলম দিলেন। লিমুর মোট কতটি কলম হলো?",
              kha: "রাজুর ২৯টি বেলুন ছিল। সে তার বোনকে ৫টি বেলুন দিয়ে দিলো। এখন কতটি বেলুন আছে?" },
            { n: "২" }, { n: "৩" }, { n: "৪" },
          ] },
        ] },
      ],
    },
    {
      page: 40,
      dense: true,
      blocks: [
        { practise: "নিজে করি" },
        { ex: "১", mark: "nije", text: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দিই", body: [
          { kind: "c3p037_mcq", items: [
            { n: "(১)", q: "৩০ + □ = ৭৫, খালিঘরে কোন সংখ্যাটি বসবে?", opts: ["(ক) ৩০", "(খ) ৪৫", "(গ) ৭৫", "(ঘ) ১০৫"] },
            { n: "(২)", q: "নিচের কোনটি সঠিক নয়?", cols: 2, opts: ["(ক) বিয়োজন − বিয়োজ্য = বিয়োগফল", "(খ) বিয়োগফল + বিয়োজ্য = বিয়োজন", "(গ) বিয়োজন + বিয়োগফল= বিয়োজ্য", "(ঘ) বিয়োজন − বিয়োগফল= বিয়োজ্য"] },
            { n: "(৩)", q: "৩৮২৯১+১৬২৭০= ৫৪৫□১, খালিঘরে কত বসবে?", opts: ["(ক) ৯", "(খ) ৮", "(গ) ৭", "(ঘ) ৬"] },
          ] },
        ] },
        { ex: "২", mark: "nije", text: "উপরে-নিচে হিসাব করি", body: [
          { kind: "c3p037_box", cls: "cs", body: [{ kind: "p040_cs", cols: 4, size: 12.5, items: [
            cs(1, [194, 704], "+"), cs(2, [7429, 1639], "+"), cs(3, [5893, 284], "+"), cs(4, [6171, 1530, 2048], "+"),
            cs(5, [3471, 1792, 2054, 1907], "+"), cs(6, [63829, 10245, 26391], "+"), cs(7, [81111, 18889], "+"), cs(8, [14537, 32521, 12512, 23524], "+"),
            cs(9, [472, 161], "−"), cs(10, [7309, 548], "−"), cs(11, [8902, 4529], "−"), cs(12, [6249, 630], "−"),
            cs(13, [73650, 7692], "−"), cs(14, [54870, 25481], "−"), cs(15, [100000, 9], "−"), cs(16, [82326, 58889], "−"),
          ] }] },
        ] },
        { ex: "৩", mark: "nije", text: "পাশাপাশি হিসাব করি", body: [
          { sums: ["৫৩৭২ + ১৬৭ + ২৬৮৩ = □", "৩৮২৯১ + ১৬২৭০ + ১০০০০ = □", "৬৪৮৯ − ৩২৮১ = □", "৮৯৪২০ − ৫৩২৮০ = □"], cols: 2, marks: true },
        ] },
      ],
    },
    {
      page: 41,
      dense: true,
      blocks: [
        { ex: "৪", mark: "nije", text: "খালিঘর পূরণ করি", body: [
          { sums: ["৯৮ + □ + ৩৬০৭ + ২৬৫৯ = ৭৪৫৩", "২৬৮৭৪ + □ = ৫৯৩০০", "৩০০৪ − □ = ২৬৫৫", "□ − ৬৪৮৩ = ৩৫১৭"], cols: 2, marks: true },
        ] },
        { ex: "৫", mark: "nije", text: "খালিঘরের সংখ্যা খুঁজে বের করি।", body: [
          { row: [
            { text: "**(১)**" },
            { kind: "c3p037_star", k: 0.8, labels: { tl: "৮", tr: "৭", l: "৪", rr: "৫", bl: "৬", br: "৯" } },
            { text: "**(২)**" },
            { kind: "c3p037_diam", k: 0.95, rows: [["১২", "৯", "৩"], ["২৫", "১৯", "৬"], ["১৩", "", "৭"]] },
          ], w: [10, 60, 10, 62], align: "flex-start", justify: "center", gap: 3 },
        ] },
        { kind: "c3p037_qs", mark: "nije", items: [
          { n: "৬", text: "সিয়াম ১৮০০ টাকা নিয়ে বাজারে গেল। সে ৭২০ টাকার চাল, ৫৮৫ টাকার মাছ এবং ৪২৫ টাকার সবজি কিনল। তার কাছে আর কত টাকা রইল?" },
          { n: "৭", text: "একটি নার্সারিতে ৯৫০টি চারাগাছ ছিল। এর থেকে ৫৩২টি চারা বিক্রি করা হলো। ঐ নার্সারিতে আরও ৪২০টি নতুন চারা আনা হলো। এখন নার্সারিতে কতটি চারা আছে?" },
          { n: "৮", text: "রুমার ৯৪৫ টাকা আছে। রুমার থেকে আশার ২১৫ টাকা কম আছে। তাদের টাকা একত্রে রাখলে ময়নার টাকার সমান হয়। ময়নার কত টাকা আছে?" },
          { n: "৯", text: "তিনটি সংখ্যার যোগফল ৮৯২৪৩। সেগুলোর মধ্যে দুইটি সংখ্যা ২৪৫৭৬ ও ৩২০৮৪ হলে তৃতীয় সংখ্যাটি কত?" },
          { n: "১০", text: "ছেলের বয়স ১৫ বছর এবং মায়ের বয়স ৪৮ বছর। ৫ বছর পর তাদের মোট বয়স কত হবে?" },
          { n: "১১", text: "গীতা অপেক্ষা সীতার ৪৯০ টাকা বেশি আছে। আবির অপেক্ষা গীতার ৫২০ টাকা কম আছে। আবিরের কাছে ৯৬৫ টাকা আছে। গীতা ও সীতার কাছে কত টাকা আছে?" },
          { n: "১২", text: "রাজীবের মায়ের কাছে ৫৫৮০ টাকা ছিল। বাজারে যাওয়ার আগে তিনি রাজীবের বাবার কাছ থেকে আরো ৩৪২০ টাকা নিলেন। কেনাকাটায় তিনি ৭৮৩০ টাকা ব্যয় করলেন। তার কাছে এখন কত টাকা অবশিষ্ট আছে?" },
          { n: "১৩", text: "বার্ষিক ক্রীড়া প্রতিযোগিতার জন্য ১২০০০ টাকার প্রয়োজন। সরকারি অনুদান হিসেবে ৫৫০০ টাকা এবং বিদ্যালয়ের তহবিল থেকে ৩৭০০ টাকা দেওয়া হয়েছে। প্রতিযোগিতাটি করার জন্য আর কত টাকার প্রয়োজন?" },
          { n: "১৪", text: "রতন ৮৫০০০ টাকা দিয়ে একটি মোটরসাইকেল কিনলেন। মোটরসাইকেলটির রেজিস্ট্রেশন বাবদ ২৫০০ টাকা ও মেরামত বাবদ ১২০০ টাকা খরচ হলো। এখন সে যদি মোটরসাইকেলটি ৯৮০০০ টাকায় বিক্রি করে, তাহলে তার কত টাকা লাভ হবে?" },
        ] },
      ],
    },

    // ───────────── অধ্যায় ৫ · গুণ ─────────────
    {
      page: 42,
      opener: { title: "গুণ" },
      spread: true,
      blocks: [
        { ask: "১০ ঘর পর্যন্ত গুণের নামতা মনে করি এবং খালিঘরে উত্তর বসাই।" },
        // the book's 9 empty cells (row × column): 3×7, 4×2, 4×9, 5×6, 6×5, 7×3, 8×6, 9×9, 10×8
        { kind: "c3p037_mtab", n: 10, blanks: [[3, 7], [4, 2], [4, 9], [5, 6], [6, 5], [7, 3], [8, 6], [9, 9], [10, 8]], cw: 13, ch: 8.6, size: 12.5 },
        { say: "parrot", text: "গুণের ক্ষেত্রে প্রথম সংখ্যাটি হলো গুণ্য এবং দ্বিতীয় সংখ্যাটি হলো গুণক।" },
        { row: [
          { say: "girl", mood: "talk", side: "left", text: "আমি ১ম খালিঘরে ৩ আর ৭ গুণ করে ২১ পেয়েছি।" },
          { say: "boy", mood: "talk", side: "right", text: "এখানে ৩ হলো গুণ্য আর ৭ হলো গুণক।" },
        ], gap: 4 },
      ],
    },
    {
      page: 43,
      spread: true,
      blocks: [
        { ex: "১", mark: "kaj", text: "৬ × ৫ এর উত্তর কীভাবে বের করতে হয় তা চিন্তা করি।", body: [
          { kind: "c3p037_rowtab", a: 6, blank: 5, cw: 13 },
          { row: [{ text: "□ করে বাড়ে", center: true }, { text: "□ করে কমে", center: true }] },
          { row: [{ text: "**৬ × ৫ = ৬ × ৪ +** □", center: true }, { text: "**৬ × ৫ = ৬ × ৬ −** □", center: true }] },
          { say: "girl", mood: "think", side: "left", text: "৬ × ৫ এর উত্তর ৬ × ৪\nএর উত্তরের চেয়ে □ বেশি।" },
          { say: "boy", mood: "think", side: "right", text: "৬ × ৫ এর উত্তর ৬ × ৬\nএর উত্তরের চেয়ে □ কম।" },
        ] },
        { note: "গুণক ১ করে বৃদ্ধি পেলে গুণফল গুণ্যের সমান করে বৃদ্ধি পায়। আবার গুণক ১ করে কমে গেলে গুণফল গুণ্যের সমান করে কমে যায়।" },
        { ex: "১", mark: "kaj", text: null, body: [
          { row: [
            { text: "(২) রাফি ছবিতে দেখানো একই গুণফল বিশিষ্ট আরেকটি গুণ করে ৬ × ৫ এর গুণফল বের করেছে। সে কীভাবে হিসাব করেছে তা নিয়ে চিন্তা করি।" },
            { frame: [{ row: [
              { kind: "p088_dots", rows: 6, cols: 5, s: 4.4, cap: "৬ × ৫" },
              { kind: "p056_icon" },
              { kind: "p088_dots", rows: 5, cols: 6, s: 4.4, cap: "□ × □" },
            ], w: [null, 12, null], align: "center", gap: 2 }] },
            { kind: "c3p037_face", who: "boy", mood: "talk", size: 17 },
          ], w: [null, 84, 18], align: "flex-start", gap: 2 },
        ] },
        { note: "গুণের ক্ষেত্রে গুণ্য ও গুণক স্থান বিনিময় করলেও গুণফল একই থাকে।" },
      ],
    },
    {
      page: 44,
      spread: true,
      allow: ["কম"] /* (২) "… চেয়ে □ কম।": printed, tesseract misses the word after the box (checked by eye) */,
      blocks: [
        { ex: "১", mark: "anu", text: "খালিঘর পূরণ করি", body: [
          { sums: ["৪ × ৬ এর উত্তর ৪ × ৫ এর উত্তরের চেয়ে □ বেশি।", "৭ × ৮ এর উত্তর ৭ × ৯ এর উত্তরের চেয়ে □ কম।", "৫ × ৪ = ৫ × ৩ + □", "৮ × ৯ = ৮ × ১০ − □"], cols: 1, marks: true },
        ] },
        { ex: "২", mark: "kaj", text: "গুণ্য বা গুণককে দুইটি সংখ্যায় ভেঙ্গে লিখে ৮ × ৬ এর হিসাব করি।", body: [
          { sub: "গুণ্যকে ভেঙ্গে লিখে হিসাব করি।" },
          { row: [
            { kind: "c3p037_tree", left: "৮ × ৬", top: "৩ × ৬ = □", bottom: "□ × ৬ = □", total: "একত্রে", totalRight: "□" },
            { kind: "c3p037_split", rows: 8, cols: 6, cut: 3, labels: ["৩ × □", "□ × ৬"], s: 4.6 },
          ], w: [null, 66], align: "center", justify: "space-around" },
          { sub: "গুণককে ভেঙ্গে লিখে হিসাব করি।" },
          { kind: "c3p037_tree", left: "৮ × ৬", top: "৮ × □ = □", bottom: "৮ × □ = □", total: "একত্রে", totalRight: "□" },
        ] },
        { note: "গুণ্য বা গুণককে দুইটি সংখ্যায় ভেঙ্গে লিখে গুণ করলেও গুণফল একই থাকে।" },
        { ex: "২", mark: "anu", text: "খালিঘর পূরণ করি", body: [
          { sums: ["৯ × ৫ = ৫ × ৫ + □ × ৫", "৭ × ৪ = ৭ × □ + ৭ × ২"], cols: 2, marks: true },
        ] },
      ],
    },
    {
      page: 45,
      spread: true,
      blocks: [
        { ask: "১৩ × ৫ এর হিসাব কীভাবে করা যায় তা চিন্তা করি।" },
        { row: [
          { say: "boy", mood: "talk", text: "আমি ১৩ কে ৫ বার যোগ করেছি।\n১৩ + ১৩ + ১৩ + ১৩ + ১৩ = □" },
          { say: "parrot", text: "হিসাবটি করার জন্য গুণের নিয়ম ব্যবহার করি।" },
        ], w: [100, null], gap: 3 },
        { row: [
          { col: [
            { kind: "c3p037_say", who: "girl", mood: "talk", side: "left", text: "১৩ × ৫ = ৫ × ১৩। তাহলে,", body: [
              { kind: "c3p037_steps", h: 8.4, rows: [
                { eq: "৫ × ৯ = ৪৫" },
                { eq: "৫ × ১০ = ৫০", note: "৫ করে বৃদ্ধি পায়", mid: true },
                { eq: "৫ × ১১ = □", note: "□ করে বৃদ্ধি পায়" },
                { eq: "৫ × ১২ = □", note: "□ করে বৃদ্ধি পায়" },
                { eq: "৫ × ১৩ = □", note: "□ করে বৃদ্ধি পায়" },
              ] },
            ] },
            { kind: "c3p037_say", who: "boy", mood: "talk", text: "আমি গুণ্যকে দুই ভাগে ভেঙ্গে লিখেছি।", body: [
              { kind: "c3p037_tree", left: "১৩ × ৫", top: "১০ × ৫ = □", bottom: "□ × ৫ = □", total: "", totalRight: "একত্রে □" },
            ] },
          ], gap: 3 },
          { kind: "p088_dots", rows: 13, cols: 5, s: 4.5 },
        ], w: [null, 26], align: "center", gap: 4 },
        { ex: "১", mark: "kaj", text: null, body: [
          { row: [
            { kind: "c3p037_mk", mark: "kaj", n: "১", text: "গুণের নিয়ম ব্যবহার করে ১৪ × ১১ হিসাব করি।" },
            { kind: "p088_dots", rows: 14, cols: 11, s: 3.7 },
          ], w: [null, 44], align: "center", gap: 3 },
        ] },
      ],
    },
    {
      page: 46,
      spread: true,
      blocks: [
        { ask: "১৩ এর গুণের নামতা তৈরি করি" },
        // the book labels the 13 rows with "13" in English digits; kept as printed
        { row: [
          { kind: "c3p037_lgrid", R: 17, C: 10, r: 13, up: 8, old: 6, label: "13", s: 4.5 },
          { kind: "p088_namta", title: "১৩এর গুণের নামতা", tone: "pink", rows: range(10).map((i) => `${BN(13)} × ${BN(i)} = ${i <= 2 ? BN(13 * i) : "□"}`) },
        ], w: [null, 58], align: "center", gap: 4 },
        { ex: "১", mark: "kaj", text: "নিচের ছবি থেকে গুণ করে খালিঘরে লিখি", body: [
          { kind: "p073_wbox", h: 11, w: 86 },
          { kind: "c3p037_two", s: 4.2 },
        ] },
      ],
    },
    {
      page: 47,
      spread: true,
      allow: ["৬০"] /* the given petal ৬০ of the ১২ flower: printed, tesseract misses it (checked by eye) */,
      blocks: [
        { ex: "১", mark: "anu", text: "তাহসিন ১৩টি লাটিম কিনতে চায়। প্রতিটি লাটিমের দাম ৮ টাকা হলে তার কত টাকার প্রয়োজন?" },
        { ex: "২", mark: "anu", text: "দাগ টেনে মিল করি। একটি করে দেখানো হলো।", body: [
          { kind: "c3p037_match", rh: 7.4, left: range(10).map((i) => `১৪ × ${BN(i)}`), right: ["৫৬", "১৪০", "২৮", "১১২", "৮৪", "৯৮", "১৪", "১২৬", "৭০", "৪২"], from: 4, to: 1 },
        ] },
        { ex: "২", mark: "kaj", text: "নিচের ছবিতে গুণ করে খালিঘরে লিখি", body: [
          // the petals clockwise from the top, as printed; the given answers ৬০ (১২ × ৫) and ৩৯ (১৩ × ৩)
          { row: [
            { kind: "p088_flower", c: "১২", ring: ["৫", "২", "৯", "১", "৭", "৬", "৩", "৮", "৪"], out: { 0: "৬০" }, tone: "peach", size: 64 },
            { kind: "p088_flower", c: "১৩", ring: ["৬", "২", "৮", "১", "৭", "৫", "৩", "৯", "৪"], out: { 6: "৩৯" }, tone: "yellow", size: 64 },
          ], justify: "space-around" },
        ] },
      ],
    },
    {
      page: 48,
      spread: true,
      blocks: [
        { ask: "১৫ এর ঘর পর্যন্ত গুণ করে নিচের ছক পূরণ করি।" },
        { say: "parrot", side: "left", text: "১৩ × ৫ বা ১৪ × ১১ এর মতো হিসাব করে গুণের নামতার ঘরে গুণফল লিখি।" },
        { kind: "c3p037_mtab", n: 15, upto: 10, cw: 9.6, ch: 9, size: 11 },
      ],
    },
    {
      page: 49,
      // tesseract reads nothing of the girl's pink bubble and garbles "একটি" in the ? line; each word checked by eye on the page
      allow: ["একটি", "সংখ্যাটিতে", "আছে", "উত্তরটি", "হচ্ছে", "কাজেই", "৮০"],
      blocks: [
        { ask: "একটি আনারসের দাম ২০ টাকা। যদি তুমি ৪টি ক্রয় করো তবে এর দাম কত হবে?" },
        { kind: "c3p037_notes", cards: 4, per: 2, w: 30 },
        { text: "গাণিতিক বাক্য **২০ × ৪ =** □", center: true },
        { row: [
          { kind: "c3p037_x10" },
          { say: "girl", mood: "talk", text: "২০ সংখ্যাটিতে ২টি দশ আছে। উত্তরটি হচ্ছে ৮ দশ। কাজেই ৪টি আনারসের দাম হচ্ছে ৮০ টাকা।" },
        ], w: [66, null], align: "center", gap: 3 },
        { ex: "১", mark: "kaj", text: "৩০ × ৫ কে কীভাবে হিসাব করা যায়?", body: [
          { kind: "c3p037_tens", cards: 5, per: 3 },
          { kind: "c3p037_gbox", rows: [["৩ × ৫ =", "□"], ["", "□"]] },
        ] },
        { ex: "১", mark: "anu", text: "গুণ করি", body: [
          { sums: ["২০ × ৩", "৪০ × ২", "৩০ × ৪", "৫০ × ৬"], cols: 4, marks: true },
        ] },
      ],
    },
    {
      page: 50,
      spread: true,
      blocks: [
        { ask: "রেজা তিন প্যাকেট বিস্কুট কিনতে চায়। এক প্যাকেটের দাম ২৩ টাকা। এজন্য তার কত টাকার প্রয়োজন?" },
        { kind: "c3p037_tape" },
        { kind: "c3p037_weq", top: ["১ প্যাকেটের দাম", "×", "প্যাকেটের সংখ্যা", "=", "মোট মূল্য"], bottom: ["গুণ্য", "×", "গুণক", "=", "গুণফল"] },
        { row: [{ text: "গাণিতিক বাক্য লিখি" }, { kind: "p073_wbox", h: 11, w: 92 }], w: [42, 94], align: "center", justify: "flex-start", gap: 3 },
        { say: "boy", mood: "think", text: "এখন নিচের ছকটি ব্যবহার করে কীভাবে হিসাব করা যায় চিন্তা করি।" },
        { row: [
          { kind: "c3p037_pvc" },
          { kind: "c3p037_tree", left: "২৩ × ৩", top: "২০ × ৩ = ৬০", bottom: "৩ × ৩ = ৯", total: "", totalRight: "মোট = ৬৯" },
        ], w: [100, null], align: "center", gap: 4 },
        { row: [{ text: "**২৩ × ৩ = ৬৯**" }, { text: "____________ টাকার প্রয়োজন।" }], align: "center" },
      ],
    },
  ],
};
