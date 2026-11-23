// অধ্যায় ১ · সংখ্যা ও স্থানীয় মান: printed pages 11–24 (PDF pages 20–33), every word as printed.
// p11–13 counting with blocks, notes and cards; p14–16 সংখ্যার তুলনা; p17–21 স্থানীয় মান; p22–24 সংখ্যার তুলনা (স্থানীয় মানের সাহায্যে).
// Own kinds (content/p011-024.parts.js): p011_base, p011_tab, p011_money, p011_cards, p011_pvlines, p011_fill, p011_pairs,
// p011_sub, p011_text, p011_chat, p011_lines. Every count is drawn, and checked against the book.
const base = (o) => ({ kind: "p011_base", ...o });
const say = (who, mood, text) => ({ say: who, mood, text });
const NB = " ".repeat(10); // the book's indent before "= তিনশত ছাপ্পান্ন" (p18)

// p19: a small place-value table: the rods, the ones (stacked), then the places, then the place values
const pvSmall = (tens, ones, r1, r2, s = 2.6) => ({
  kind: "p011_tab", tone: "pink", cols: ["54%", "46%"], small: true,
  rows: [
    { type: "pic", cells: [[base({ rods: tens, s, rc: "blue" })], [base({ ones, stack: true, s })]] },
    { cells: r1 },
    r2.length === 1 ? { cells: [{ c: r2[0], span: 2 }] } : { cells: r2 },
  ],
});
// p20: a place-value diagram, digits on top ("down") and below ("up")
const pvl = (digits, labels, values, dir, inline) => ({ kind: "p011_pvlines", digits, labels, values, dir, inline, w: 74 });

module.exports = {
  pages: [
    {
      page: 11,
      dense: true,
      allow: ["অঙ্কে"], // tesseract reads the book's "অঙ্কে" as "অভেক"; checked by eye
      blocks: [
        { practise: "নিজে করি" },
        { text: "ব্লকের সংখ্যা গণনা করি এবং অঙ্কে লিখি", big: true },
        { kind: "p011_tab", tone: "yellow", num: "১.", cols: ["33%", "34%", "33%"], rows: [ // 1 flat, 4 rods, 7 ones = 147
          { type: "pic", cells: [[base({ flats: 1, s: 1.6, oc: "green" })], [base({ rods: 4, s: 1.6 })], [base({ ones: 7, s: 1.6, oc: "green" })]] },
          { type: "hd", cells: ["শত", "দশ", "এক"] },
          { type: "ans", cells: [{ c: "সংখ্যাটি হলো: ______________________", span: 3 }] },
        ] },
        { kind: "p011_tab", tone: "green", num: "২.", cols: ["66%", "17%", "17%"], rows: [ // 5 flats, 0 rods, 4 ones = 504
          { type: "pic", cells: [[base({ flats: 5, s: 1.6 })], "", [base({ ones: 4, s: 1.6, oc: "green" })]] },
          { type: "hd", cells: ["শত", "দশ", "এক"] },
          { type: "ans", cells: [{ c: "সংখ্যাটি হলো: ______________________", span: 3 }] },
        ] },
        { kind: "p011_tab", tone: "pink", num: "৩.", cols: ["38%", "40%", "22%"], rows: [ // 4 × ১০০, 5 × ১০, 2 × ১ টাকা = 452
          { type: "pic", cells: [[{ kind: "p011_money", rows: [[100, 100], [100, 100]], w: 19 }], [{ kind: "p011_money", rows: [[10, 10, 10], [10, 10]], w: 17 }], [{ kind: "p011_money", rows: [[1], [1]], w: 17 }]] },
          { type: "hd", cells: ["শত", "দশ", "এক"] },
          { type: "ans", cells: [{ c: "সংখ্যাটি হলো: ______________________", span: 3 }] },
        ] },
        { sub: "সংখ্যাটি কত?" },
        { kind: "p011_tab", tone: "blue", small: true, rows: [
          { type: "hd", cells: ["কতগুলো (শত)", "কতগুলো (দশ)", "কতগুলো (এক)"] },
          ...Array.from({ length: 5 }, () => ({ cells: ["১০০", "১০", "১"] })),
          { cells: ["১০০", "", ""] },
          { type: "pl", cells: ["শত", "দশ", "এক"] },
          { type: "ans", cells: [{ c: "সংখ্যাটি হলো: ______________________", span: 3 }] },
        ] },
      ],
    },
    {
      page: 12,
      spread: true,
      blocks: [
        { practise: "নিজে করি" },
        { ex: "১", text: "কতটি ১০০, ১০ ও ১ এর কার্ড আছে তা গণনা করি।", body: [ // 7 × ১০০, 6 × ১০, 5 × ১
          { frame: [{ kind: "p011_cards", cols: 5, rows: [["১০০", "১০", "১", "১০০", "১০"], ["১০", "১", "১০০", "১০", "১০০"], ["১০০", "১০", "১", "১০০"], ["১০০", "১", "১০", "১"]] }], tone: "pink" },
          { text: "সংখ্যা কার্ডগুলো সাজাই ও অঙ্কে লিখি", big: true },
          { frame: [{ kind: "p011_cards", sorted: [{ v: "১০০", cols: [5, 2] }, { v: "১০", cols: [5, 1] }, { v: "১", cols: [5] }] }], tone: "pink" },
        ] },
        { ex: "২", text: "অঙ্কে লিখি: ________________", body: [ // 4 × ১ টাকা, 5 × ১০, 5 × ১০০ = 554, in the book's order
          { frame: [{ kind: "p011_money", rows: [[1, 1, 1, 10, 10, 10], [10, 100, 100, 1, 100], [100, 100, 10]], w: 22.5, gap: 2 }] },
          { kind: "p011_text", text: "কত টাকা হলো তা অঙ্কে লিখি: ⬜" },
        ] },
      ],
    },
    {
      page: 13,
      spread: true,
      allow: ["৪৪৪"], // tesseract reads the book's ৪৪৪ as "888"; checked by eye
      blocks: [
        { text: "নিচের সংখ্যাগুলো পড়ি। ১০১ থেকে ৫০০ পর্যন্ত এবং ৫০১ থেকে ১০০০ পর্যন্ত সংখ্যাগুলো আলাদাভাবে লিখি।", big: true },
        { frame: [{ nums: ["১১২", "৮৯৮", "৩০৪", "৫০৫", "৭১২", "৯২৫", "১৩৪", "৯৯৮", "১০০০", "৪৪৪", "৩৮২", "৭৫০", "৬০০", "৩৩৩", "১০১", "৫৯০"] }], tone: "blue" },
        { frame: [{ text: "১০১ থেকে ৫০০ পর্যন্ত সংখ্যা:" }, { kind: "p011_lines", n: 2, h: 9 }], tone: "yellow" },
        { frame: [{ text: "৫০১ থেকে ১০০০ পর্যন্ত সংখ্যা:" }, { kind: "p011_lines", n: 2, h: 9 }], tone: "pink" },
        { text: "পড়ি ও অঙ্কে লিখি:", big: true },
        { table: { head: ["পড়ি", "অঙ্কে লিখি"], tone: "yellow", left: true, rows: [
          ["(১) একশত দশ", "…"], ["(২) তিনশত ঊনপঞ্চাশ", "…"], ["(৩) পাঁচশত পঁচাশি", "…"],
          ["(৪) ছয়শত বাহাত্তর", "…"], ["(৫) আটশত পঞ্চাশ", "…"], ["(৬) নয়শত আট", "…"],
        ] } },
      ],
    },
    {
      page: 14,
      title: "সংখ্যার তুলনা",
      spread: true,
      allow: ["৪"], // the book's "৪টি" is read as "8টি"; checked by eye
      blocks: [
        { ask: "৬২ ও ৪৫ এর মধ্যে কোন সংখ্যাটি বড়ো?" },
        { col: [
          { text: "সংখ্যা দুটিকে দশ ও এক এর দল করে সাজাই।" },
          { kind: "p011_tab", tone: "blue", cols: ["50%", "50%"], rows: [
            { type: "pic", cells: [[base({ rods: 6, ones: 2, s: 5.4 })], [base({ rods: 4, ones: 5, s: 5.4 })]] },
            { type: "num", cells: ["৬২", "৪৫"] },
          ] },
        ], gap: 2.4 },
        { col: [
          say("boy", "talk", "চলো, আমরা আগে দশ এর দলের তুলনা করি।"),
          say("girl", "talk", "৬২ এ দশ এর দল ৬টি ও ৪৫ এ দশ এর দল ৪টি। তাই ৬২ বড়ো।"),
        ], gap: 7 },
      ],
    },
    {
      page: 15,
      spread: true,
      blocks: [
        { ask: "৪৩৪ ও ২৫৩ সংখ্যা দুটির মধ্যে কোন সংখ্যাটি ছোটো?" },
        { col: [
          { text: "সংখ্যা দুটিকে শত, দশ ও এক এর দল করে সাজাই।" },
          { kind: "p011_tab", tone: "pink", rows: [
            { type: "pic", cells: [[base({ flats: 4, rods: 3, ones: 4, s: 2.8 })]] },
            { type: "num", cells: ["৪৩৪"] },
          ] },
          { gap: 2 },
          { kind: "p011_tab", tone: "pink", rows: [
            { type: "pic", cells: [[base({ flats: 2, rods: 5, ones: 3, s: 2.8 })]] },
            { type: "num", cells: ["২৫৩"] },
          ] },
        ], gap: 2.4 },
        { col: [
          say("boy", "talk", "চলো আমরা আগে শত এর দলের তুলনা করি।"),
          say("girl", "talk", "৪৩৪ এ শত এর দল ৪টি ও ২৫৩ এ শত এর দল ২টি। তাই ২৫৩ ছোটো।"),
        ], gap: 6 },
      ],
    },
    {
      page: 16,
      dense: true,
      blocks: [
        { ask: "৩৫৪ ও ৩২৫ সংখ্যা দুটির মধ্যে কোন সংখ্যাটি বড়ো তা জানি" },
        { text: "সংখ্যা দুটিকে শত, দশ ও এক এর দল করে সাজাই।" },
        { kind: "p011_tab", tone: "pink", cols: ["50%", "50%"], rows: [
          { type: "pic", cells: [[base({ flats: 3, rods: 5, ones: 4, onesBelow: true, s: 1.75 })], [base({ flats: 3, rods: 2, ones: 5, onesBelow: true, s: 1.75 })]] },
          { type: "num", cells: ["৩৫৪", "৩২৫"] },
        ] },
        { kind: "p011_chat", size: "s", gap: 2, lines: [
          { row: [say("boy", "talk", "যদি শত এর দল একই হয়, তবে আমরা দশ এর দলের তুলনা করি।"), say("girl", "talk", "আবার যদি দশ এর দল একই হয়, তবে আমরা এক এর দলের তুলনা করি।")], gap: 4 },
          { row: [say("boy", "talk", "এখানে শত এর দল একই হওয়ায় আমরা দশ এর দলের তুলনা করি। ৩৫৪ ও ৩২৫ এর মধ্যে ৩৫৪ এ ৩টি দশ এর দল বেশি আছে।"), say("girl", "talk", "তাই বড়ো সংখ্যাটি: ৩৫৪")], gap: 4 },
        ] },
        { practise: "নিজে করি" },
        { ex: "১", text: "বড়ো সংখ্যাটিতে গোল দাগ দিই", body: [{ kind: "p011_pairs", pairs: [["৮৫", "৫৭"], ["৫২৪", "৩৪৮"], ["৬৩৪", "৬৭০"], ["৪২৩", "৪২৮"], ["৮২৩", "৫৪০"], ["৯০১", "৯৭২"]] }] },
        { ex: "২", text: "ছোটো সংখ্যাটিতে গোল দাগ দিই", body: [{ kind: "p011_pairs", pairs: [["৭৫", "৬৫"], ["৪২৩", "৩৩৭"], ["৫৫৭", "৬৪২"], ["৮৭৬", "৭০৬"], ["৬৭৮", "৯৪৮"], ["৭৮৫", "৬৩৯"]] }] },
      ],
    },
    {
      page: 17,
      title: "স্থানীয় মান",
      spread: true,
      blocks: [
        { ask: "ছবিতে কতগুলো কাঠি আছে?" },
        { sticks: { bundles: 0, singles: 14, perRow: 14 } },
        { text: "১০টি করে কাঠি গণনা করে বান্ডিল তৈরি করি।" },
        { kind: "p011_tab", tone: "yellow", cols: ["50%", "50%"], rows: [
          { type: "pic", cells: [
            [{ row: [{ text: "বান্ডিল", big: true }, { objs: { sticker: "stick-bundle", emoji: "🥢", n: 1, size: 25 } }], justify: "center", gap: 4, w: [22, 28] }],
            [{ row: [{ objs: { sticker: "stick", emoji: "🥢", n: 4, perRow: 4, size: 13.5, gap: 0 } }, { text: "খোলা কাঠি", big: true }], justify: "center", gap: 2, w: [54, 24] }],
          ] },
          { type: "num", cells: ["১ দশ", "৪"] },
        ] },
        { text: "স্থানীয় মানে লিখি", box: "১ দশক ও ৪ একক" },
        { sub: "ছবিতে কতগুলো ব্লক আছে?" },
        { frame: [base({ rows: [4, 9, 10], s: 3.8 })], tone: "pink" }, // 23 ones
        { kind: "p011_tab", tone: "blue", cols: ["50%", "50%"], rows: [
          { type: "pic", cells: [[base({ rods: 2, s: 3.8 })], [base({ ones: 3, s: 3.8 })]] },
          { type: "num", cells: ["২ দশ", "৩"] },
        ] },
        { text: "২ দশ ৩", big: true, center: true },
        { text: "স্থানীয় মানে লিখি", box: "২ দশক ও ৩ একক" },
      ],
    },
    {
      page: 18,
      spread: true,
      blocks: [
        { ask: "ছবিতে কতগুলো শত, দশের দল ও এক আছে?" },
        // the book's jumble: flat, rod, one, flat, rod, rod, flat, one, one, rod, one, rod, one, one = 3 শত, 5 দশ, 6 এক
        { frame: [base({ seq: "FRCFRRFCCRCRCC", s: 2.6, fc: "green", rc: "green", oc: "green" })], tone: "pink" },
        { kind: "p011_tab", tone: "green", cols: ["41%", "27%", "32%"], rows: [
          { type: "pic", cells: [[base({ flats: 3, s: 2 })], [base({ rods: 5, s: 2 })], [base({ ones: 6, s: 2 })]] },
          { type: "pl", cells: ["৩ শত = ৩ শতক", "৫ দশ = ৫ দশক", "৬ এক = ৬ একক"] },
          { type: "ans", cells: [{ c: `সংখ্যাটি: ৩ শতক ৫ দশক ৬ একক = ৩ শত ৫ দশ ৬\n${NB}= তিনশত ছাপ্পান্ন\nসংখ্যাটি অঙ্কে: ৩৫৬`, span: 3 }] },
        ] },
        { sub: "নিচে কতগুলো হাজার, শত, দশ ও এক আছে?" },
        { frame: [{ kind: "p011_cards", cols: 4, w: 22, rows: [["১০০০", "১০০", "১০০"], ["১০০০", "১০০", "১০০"], ["১০", "১০", "১", "১"], ["১০", "১০"]] }], tone: "yellow" },
        { kind: "p011_text", text: "□ হাজার □ শত □ দশ □ এক", center: true },
        { kind: "p011_text", text: "সংখ্যাটি: ⬜", center: true },
      ],
    },
    {
      page: 19,
      spread: true,
      blocks: [
        { ask: "২৪৪২ এর প্রত্যেকটি অঙ্কের স্থানীয় মান বের করি" },
        { kind: "p011_tab", tone: "blue", cols: ["50%", "50%"], rows: [
          { type: "pv", cells: [
            [pvl(["২", "৪", "৪", "২"], ["২ হাজার", "৪ শতক", "৪ দশক", "২ একক"], null, "down")],
            [pvl(["২", "৪", "৪", "২"], ["২ হাজার", "৪ শতক", "৪ দশক", "২ একক"], null, "up")],
          ] },
          { cells: [{ c: "২ হাজার ৪ শতক ৪ দশক ২ একক\n= ২ হাজার ৪ শত ৪২", align: "left" }, { c: "২ হাজার ৪ শতক ৪ দশক ২ একক\n= ২ হাজার ৪ শত ৪২", align: "left" }] },
        ] },
        { ex: "১", text: "ছবি দেখে স্থানীয় মান লিখি", body: [
          { row: [ // 3 tens 5 ones (done); 4 tens 6 ones
            pvSmall(3, 5, ["৩ দশক", "৫ একক"], ["স্থানীয় মান\n৩০", "স্থানীয় মান\n৫"], 2.8),
            pvSmall(4, 6, ["□ দশক", "□ একক"], ["স্থানীয় মান\n_______", "স্থানীয় মান\n_______"], 2.8),
          ], gap: 10, justify: "center", w: [62, 62] },
        ] },
        { ex: "২", text: "ছবি দেখে স্থানীয় মান অঙ্কে ও সংখ্যায় লিখি", body: [
          { row: [ // 26, 40, 53
            pvSmall(2, 6, ["□ দশক", "□ একক"], ["সংখ্যা ___ ___"], 2.8),
            pvSmall(4, 0, ["□ দশক", "□ একক"], ["সংখ্যা _______"], 2.8),
            pvSmall(5, 3, ["□ দশক", "□ একক"], ["সংখ্যা _______"], 2.8),
          ], gap: 4 },
        ] },
      ],
    },
    {
      page: 20,
      dense: true,
      blocks: [
        { ex: "৩", text: "৪৭, ৩৫২ ও ১০০০ সংখ্যাগুলোর প্রত্যেকটি অঙ্কের স্থানীয় মান লিখি", body: [
          { kind: "p011_tab", tone: "blue", cols: ["50%", "50%"], rows: [
            { type: "pv", cells: [[pvl(["৪", "৭"], ["৪ দশক =", "৭ একক ="], ["৪০", "৭"], "down", true)], [pvl(["৪", "৭"], ["৪ দশক =", "৭ একক ="], ["৪০", "৭"], "up", true)]] },
            { type: "pv", cells: [[pvl(["৩", "৫", "২"], ["৩ শতক =", "৫ দশক =", "২ একক ="], ["৩০০", "৫০", "২"], "down", true)], [pvl(["৩", "৫", "২"], ["৩ শতক =", "৫ দশক =", "২ একক ="], ["৩০০", "৫০", "২"], "up")]] },
            { type: "pv", cells: [[pvl(["১", "০", "০", "০"], ["১ হাজার =", "০ শতক =", "০ দশক =", "০ একক ="], ["১০০০", "০০০", "০০", "০"], "down")], [pvl(["১", "০", "০", "০"], ["১ হাজার =", "০ শতক =", "০ দশক =", "০ একক ="], ["১০০০", "০০০", "০০", "০"], "up")]] },
          ] },
        ] },
        { practise: "নিজে করি" },
        { ex: "১।", dot: false, text: "খালিঘর পূরণ করি", body: [{ kind: "p011_fill", lines: [
          "(১)|{৫৬}|=|[[৫]]|দশক|[[৬]]|একক",
          "(২)|{৮৩}|=|□|দশক|□|একক",
          "(৩)|{১২০}|=|□|শতক|□|দশক|□|একক",
          "(৪)|{৪৬৭}|=|□|শতক|□|দশক|□|একক",
          "(৫)|{৯৭৬}|=|□|শতক|□|দশক|□|একক",
          "(৬)|{১০০০}|=|□|হাজার|□|শতক|□|দশক|□|একক",
        ] }] },
      ],
    },
    {
      page: 21,
      spread: true,
      blocks: [
        { ex: "২।", dot: false, text: "খালিঘর পূরণ করি", body: [{ kind: "p011_fill", wide: true, lines: [
          "(১)|{২ দশক ৮ একক}|=|[[২৮]]",
          "(২)|{৭ দশক ৪ একক}|=|□",
          "(৩)|{১ শতক ৮ একক}|=|□",
          "(৪)|{২ শতক ৩ দশক}|=|□",
          "(৫)|{৭ শতক ৮ দশক ২ একক}|=|□",
          "(৬)|{১ হাজার}|=|□",
        ] }] },
        { ex: "৩", text: "নিচের সংখ্যাগুলোর প্রতিটি অঙ্কের স্থানীয় মান লিখি।", body: [
          { nums: ["২৪", "৫৬", "৭৩", "৯৮", "১০৫", "৩২৮", "৬৩৯", "৮৪০", "৯৫৭", "১০০০"] },
          { kind: "p011_lines", n: 4, h: 9 },
        ] },
      ],
    },
    {
      page: 22,
      title: "সংখ্যার তুলনা (স্থানীয় মানের সাহায্যে)",
      spread: true,
      blocks: [
        { text: "দুটি সংখ্যার তুলনা", big: true, center: true },
        { ask: "কোনটি বড়ো, ৪৬০ অথবা ৬৩০?" },
        { kind: "p011_chat", lines: [
          say("boy", "think", "আমরা কীভাবে তুলনা করতে পারি?"),
          say("girl", "talk", "পূর্বে আমরা উপকরণের সাহায্যে শত বা দশ–এর দল করে তুলনা করা শিখেছি। এবার আমরা স্থানীয় মানের সাহায্যে তুলনা করব।"),
          say("boy", "talk", "এক্ষেত্রে সংখ্যা দুটির শতকের স্থানীয় মান তুলনা করব।"),
        ] },
        { kind: "p011_sub", n: "১", text: "নিচের দুটি সংখ্যার তুলনা করি", box: "^৪৬০ এবং ^৬৩০" },
        { kind: "p011_chat", lines: [
          say("girl", "talk", "এক্ষেত্রে শতক স্থানের ৪ থেকে ৬ বড়ো। কাজেই আমরা বলতে পারি ৪৬০ থেকে ৬৩০ বড়ো।"),
          say("boy", "talk", "তাহলে ৪৬০ ছোটো এবং ৬৩০ বড়ো।"),
        ] },
        { kind: "p011_sub", text: "নিচের দুটি সংখ্যার তুলনা করি", box: "^৫৬২ এবং ^৫৪৮" },
        { kind: "p011_chat", lines: [
          say("boy", "talk", "এখানে আমরা প্রথমে শতকের, তারপর দশকের ও সবশেষে এককের অঙ্কের স্থানীয় মান তুলনা করব।"),
          say("girl", "talk", "সংখ্যা দুটির শতক স্থানের অঙ্ক দুটি একই (৫ এবং ৫)।"),
        ] },
      ],
    },
    {
      page: 23,
      spread: true,
      blocks: [
        { col: [
          say("boy", "talk", "দশক স্থানের অঙ্ক তুলনা করি। ৪ থেকে ৬ বড়ো।"),
          say("girl", "talk", "কাজেই আমরা বলতে পারি ৫৪৮ থেকে ৫৬২ বড়ো।"),
          say("boy", "talk", "তাহলে ৫৬২ বড়ো এবং ৫৪৮ ছোটো।"),
        ], gap: 2.4 },
        { practise: "নিজে করি" },
        { ex: "১", text: "নিচের সংখ্যাগুলো ছোটো-বড়ো তুলনা করি।", body: [
          { sums: ["১২৮, ২৩৫", "২৪৮, ২২৬", "৪৯৬, ৪৬৯", "৬৯২, ৫৯৪", "৮৭২, ৮৫৮", "১০০০, ৯৯৮"], cols: 3, marks: true },
        ] },
        { ex: "২", text: "নিচের সংখ্যাগুলো তুলনা করি এবং ছোটো থেকে বড়ো ও বড়ো থেকে ছোটো সাজিয়ে লিখি।", body: [
          { table: { head: ["সংখ্যা", "ছোটো থেকে বড়ো", "বড়ো থেকে ছোটো"], tone: "yellow", rows: [
            ["(১) ৪৩০, ৪২৮", "…", "…"], ["(২) ৬৭৮, ৬৭৫", "…", "…"], ["(৩) ৮২৭, ৯৪৮", "…", "…"], ["(৪) ৯৮৫, ৯৫০", "…", "…"], ["(৫) ৭৪৪, ৭২২", "…", "…"],
          ] } },
        ] },
      ],
    },
    {
      page: 24,
      spread: true,
      blocks: [
        { col: [{ sub: "নিচের সংখ্যাগুলো ছোটো থেকে বড়ো ক্রমানুসারে সাজাই।" }, { nums: ["২৩২", "২২৩", "২৩৯"] }], gap: 2.4 },
        { frame: [{ col: [
          { text: "প্রথমে, শতক স্থানের অঙ্ক তুলনা করি। শতক স্থানের সব অঙ্কই সমান।" },
          { text: "এবার, দশক স্থানের অঙ্ক তুলনা করি।" },
          { text: "২৩২ ও ২৩৯ দুটি সংখ্যারই দশক স্থানের অঙ্ক দুটি সমান।" },
          { text: "২২৩ এর দশক স্থানের অঙ্ক ২। তাহলে অপর দুটি সংখ্যা ২৩২, ২৩৯ এর চেয়ে ২২৩ ছোটো। সুতরাং ২২৩ সবচেয়ে ছোটো।" },
          { text: "এখন, ২৩২ ও ২৩৯ তুলনা করি।" },
          { text: "এক্ষেত্রে ২৩৯ এর একক স্থানের অঙ্ক ৯, যা ২৩২ এর একক স্থানের অঙ্ক ২ থেকে বড়।" }, // the book's "বড়" (elsewhere বড়ো)
          { text: "সুতরাং ২৩৯ সংখ্যাটি সবচেয়ে বড়ো।" },
          { text: "তাহলে ছোটো থেকে বড়ো: ২২৩, ২৩২, ২৩৯।", big: true },
        ], gap: 1.2 }], tone: "blue", pad: 3.4 },
        { col: [
          { sub: "নিচের সংখ্যাগুলো তুলনা করি এবং ছোটো থেকে বড়ো ও বড়ো থেকে ছোটো ক্রমানুসারে সাজাই।" },
          { table: { head: ["সংখ্যা", "ছোটো থেকে বড়ো", "বড়ো থেকে ছোটো"], tone: "pink", rows: [
            ["(১) ৪৩২, ৩২৮, ৫৪০", "…", "…"], ["(২) ৫২৯, ৫১৭, ৫৪৯", "…", "…"], ["(৩) ৪০৭, ৬০৩, ৩৩০", "…", "…"], ["(৪) ৭২৯, ৭২০, ৭২৬", "…", "…"], ["(৫) ১০০০, ৭৮০, ৯৪৯", "…", "…"],
          ] } },
        ], gap: 3 },
      ],
    },
  ],
};
