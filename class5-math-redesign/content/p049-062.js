// অধ্যায় ৪ · সাধারণ ভগ্নাংশ: printed pages 49–62 (PDF pages 56–69), every word as printed; fractions are written {{লব/হর}}
// and mixed numbers ২{{১/৩}} in Bangla digits, as the book prints them, each read by eye at 300–600 dpi. Written by a helper,
// 25 Nov 2026.
// Mixed ↔ improper on tapes of quarters, thirds and fifths (pp49–50), equivalent fractions by × and ÷ (p51), the simplest
// form (p52), comparing with a common হর (pp53–55), adding and taking away with different হর (pp56–58), mixed numbers
// (pp59–60), দেখি পারি কি না (p61), নিজে করি (p62).
// Every fraction picture is drawn by code, cut into exactly equal parts (content/p049-062.parts.js): the tapes (c5p049_tape),
// the two conversion diagrams (c5p049_m2i, c5p049_i2m), the ringed হর (c5p049_ring), the bars of water and milk
// (c5p049_jars), the ribbon of fifths (c5p049_ribbon) and the road (c5p049_road). Reused: Class 4's c4p097_arcs, c4p097_sym,
// c4p097_cancel, c4p097_arrow, c4p097_cell; Class 4's c4p053_say, c4p053_tbox, c4p067_x; Class 3's c3p001_saybox,
// c3p001_box, c3p091_tbl, c3p091_grid.
// Every worked sum checked: ২{{১/৪}} = {{৯/৪}}; {{৯/৪}} = ২{{১/৪}}; {{৯/৩৬}} = {{১/৪}}; {{১৫/৪৫}} = {{৫/১৫}} = {{১/৩}};
// {{২/৩}} = {{৮/১২}} < {{৯/১২}} = {{৩/৪}}; {{৩/৫}} = {{৯/১৫}} < {{১০/১৫}} = {{২/৩}}; {{১/২}} + {{১/৩}} = {{৫/৬}};
// {{২/৩}} − {{১/৪}} = {{৫/১২}}; ১{{২/৫}} + {{৪/৫}} = {{১১/৫}} = ২{{১/৫}}; ২{{১/৩}} = {{৭/৩}}, ১{{১/৬}} = {{৭/৬}},
// ৩{{২/৩}} = {{১১/৩}}, ১{{৫/১২}} = {{১৭/১২}}.
// Pictures for ChatGPT (PICTURE-PROMPTS-p049-062.md, stand-ins cut from the book): p053-red-ribbon, p053-blue-ribbon,
// p056-bottles, p062-sobuj-house, p062-school, p062-mitu-house.
// The book's slips: two fixed (p59 রাফির হিসাব "= ১ + ১ + {{১/৫}} = {{১/৫}}"; p62 নিজে করি ২ (৩) {{২/৯}} − {{১২/৫}}, below
// zero), three flagged (p51 "কোন … ঐ"; p62 নিজে করি numbered ১, ২, ৯, ১০, ১১; p62 "কি মি"): see each page's fixes and flags.
// Layout choices: on p49 the box lines of কাজ ২ (and p50's (১)) sit beside their tapes rather than under them, for room;
// p51 অনুশীলন ১'s box is under its line; p52 কাজ ২'s three cells are two rows (the boy and the working, then the girl).
const say =(who, mood, text, side) => ({ say: who, mood, text, ...(side ? { side } : {}) });
const ssay = (who, mood, text, side, tiny) => ({ kind: "c4p053_say", who, mood, text, ...(side ? { side } : {}), ...(tiny ? { tiny } : {}) });
const eqs = (lines, more) => ({ kind: "c5p049_eqs", lines, ...more });
const tape = (o) => ({ kind: "c5p049_tape", ...o });
const BN = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
const wholes = (k) => [...Array(k + 1).keys()];
// p51: fractions joined by arcs from the first one (×২, ×□, ×□ or ÷২, ÷□, ÷□), above and below
const fan = (labels, color, w) => {
  const xs = []; let x = 0.5; w.forEach((v) => { xs.push(x + v / 2); x += v; });
  return ["up", "down"].flatMap((side) => labels.map((label, i) => ({ a: 0, b: 2 * (i + 1), side, color, label, rise: 6.6 + 3.4 * i, lx: xs[2 * (i + 1)] - 7.6 })));
};
const W51 = [11, 11, 11, 11, 11, 11, 12];
// p54: a fraction and nine boxes, all equal
const nine = (f) => `${f} = ${Array(9).fill("{{□/□}}").join(" = ")}`;
// p59–60: the working tables (left the sum, in the middle what each step does)
const STEP = ["সমহরে প্রকাশ", "হিসাব", "লঘিষ্ঠ আকারে প্রকাশ", "ফলাফল"];
const mid = { kind: "c4p097_cell", align: "center", gap: 0, body: [{ text: "মিশ্র ভগ্নাংশ", center: true }, { kind: "c4p097_arrow", w: 5.4, angle: 90 }, { text: "অপ্রকৃত ভগ্নাংশ", center: true }] };
const cellEq = (t, ind = 6) => ({ kind: "c4p097_cell", gap: 0, body: [eqs([[ind, t]], { size: 12.5, tight: true })] });
// p62: a question's four answers
const opts = (list) => ({ kind: "c3p091_grid", cols: 4, size: 12.5, indent: 2, gap: 0, rows: [list.map((t, i) => `(${["ক", "খ", "গ", "ঘ"][i]}) ${t}`)] });

module.exports = {
  pages: [
    {
      page: 49,
      opener: { title: "সাধারণ ভগ্নাংশ" },
      dense: true,
      allow: ["১০"], // অনুশীলন ১ (৫) ২{{৭/১০}}: the small হর ১০ tesseract misreads; checked by eye at 300 dpi
      blocks: [
        { ask: "আমরা কীভাবে মিশ্র ভগ্নাংশকে অপ্রকৃত ভগ্নাংশে রূপান্তর করতে পারি?" },
        // ০ to ৩ in quarters, 9 quarters red: the brace under 8 of them is ৪ × ২, under the 9th ১
        tape({ n: 4, len: 12, fill: 9, cw: 8.6, h: 6.2, ext: 0.6, labels: wholes(3), left: "২{{১/৪}}", lw: 13, braces: [{ at: [0, 8], label: "৪ × ২" }, { at: [8, 9], label: "১" }], center: true }),
        { row: [
          { kind: "c3p001_saybox", who: "boy", gap: 0, text: "মিশ্র ভগ্নাংশকে অপ্রকৃত ভগ্নাংশে রূপান্তর করতে হলে হরকে পূর্ণ অংশ দ্বারা গুণ করে লবের সঙ্গে যোগ করি। প্রাপ্ত সংখ্যাটিকে লব হিসেবে বসাই। হর একই থাকবে।", small: true, body: [{ kind: "c5p049_m2i" }] },
          ssay("girl", "talk", "৪র্থ শ্রেণিতে আমরা প্রকৃত, অপ্রকৃত এবং মিশ্র ভগ্নাংশ সম্পর্কে জেনেছি।"),
        ], w: [114, 0], gap: 3 },
        { ex: "১", mark: "kaj", text: "মিশ্র ভগ্নাংশকে অপ্রকৃত ভগ্নাংশে রূপান্তর করি।", body: [
          { sums: ["১{{২/৩}} = {{□×□+□/□}} = {{□/□}}", "৩{{৩/৫}} = {{□×□+□/□}} = {{□/□}}"], cols: 2, marks: true, size: 14 },
        ] },
        { ex: "২", mark: "kaj", text: "রং করি ও খালি ঘর পূরণ করি।", body: [
          { row: [
            tape({ n: 3, len: 9, cw: 8.2, h: 6.2, ext: 1, thick: true, labels: wholes(3), left: "(১) ১{{২/৩}}", lw: 21 }),
            eqs(["১{{২/৩}} = {{□/□}}"], { size: 14 }),
          ], w: [104, 0], gap: 6, align: "flex-end", justify: "flex-start" },
          // the book has each box line under its tape; (২)'s goes beside it here, for room
          { row: [
            tape({ n: 5, len: 20, cw: 5.4, h: 6.2, ext: 1, thick: true, labels: wholes(4), left: "(২) ৩{{৩/৫}}", lw: 21 }),
            eqs(["৩{{৩/৫}} = {{□/□}}"], { size: 14 }),
          ], w: [136, 0], gap: 3, align: "flex-end", justify: "flex-start" },
        ] },
        { ex: "১", mark: "anu", text: "অপ্রকৃত ভগ্নাংশে প্রকাশ করি।", body: [
          { sums: ["৩{{১/২}}", "২{{৫/৬}}", "৪{{৮/৯}}", "৩{{৫/৮}}", "২{{৭/১০}}"], cols: 5, marks: true, size: 14 },
        ] },
      ],
    },
    {
      page: 50,
      dense: true,
      allow: ["১০"], // অনুশীলন ১ (৫) {{৪০/১০}}: the small হর ১০ tesseract misreads; checked by eye at 300 dpi
      spread: true,
      blocks: [
        { ask: "আমরা কীভাবে অপ্রকৃত ভগ্নাংশকে মিশ্র ভগ্নাংশে রূপান্তর করতে পারি?" },
        // the same 9 quarters, the wholes ১ and ২ marked by thick lines, a brace under each 4
        tape({ n: 4, len: 12, fill: 9, cw: 9.4, h: 6.4, ext: 0.6, thick: true, labels: wholes(2), left: "{{৯/৪}}", lw: 13, braces: [{ at: [0, 4] }, { at: [4, 8] }], center: true }),
        { row: [
          { kind: "c3p001_saybox", who: "boy", gap: 0, body: [{ kind: "c5p049_i2m" }] },
          say("girl", "think", "লবের দিকে লক্ষ করি।\n২টি ৪ ও ১ মিলে ৯ হয়।"),
        ], w: [86, 0], gap: 4 },
        { kind: "c5p049_rule", title: "অপ্রকৃত ভগ্নাংশকে মিশ্র ভগ্নাংশে রূপান্তর", lines: ["১. লবকে হর দ্বারা ভাগ করি।", "২. ভাগফলকে পূর্ণসংখ্যা অংশে এবং ভাগশেষকে লব হিসেবে লিখি।", "৩. হর একই থাকবে।"] },
        { ex: "১", mark: "kaj", text: "রং করি ও খালি ঘর পূরণ করি।", body: [
          { row: [
            tape({ n: 3, len: 9, cw: 8.4, h: 6.4, ext: 1, thick: true, labels: wholes(3), left: "(১) {{৭/৩}}", lw: 20 }),
            eqs(["{{৭/৩}} = □{{□/□}}"], { size: 14 }),
          ], w: [108, 0], gap: 4, align: "flex-end", justify: "flex-start" },
          tape({ n: 5, len: 20, cw: 6.1, h: 6.4, ext: 1, thick: true, labels: wholes(4), left: "(২) {{১৬/৫}}", lw: 20 }),
          eqs(["{{১৬/৫}} = □{{□/□}}"], { size: 14, indent: 20 }),
        ] },
        { ex: "১", mark: "anu", text: "অপ্রকৃত ভগ্নাংশকে মিশ্র ভগ্নাংশে প্রকাশ করি।", body: [
          { sums: ["{{৭/৫}}", "{{৮/৪}}", "{{২২/৭}}", "{{৩৫/৮}}", "{{৪০/১০}}"], cols: 5, marks: true, size: 14 },
        ] },
      ],
    },
    {
      page: 51,
      dense: true,
      spread: true,
      flags: ["p51 কাজ ১'s rule: \"কোন ভগ্নাংশের … ঐ ভগ্নাংশের\" (কোন for কোনো, ঐ for ওই), where the same rule above it prints \"কোনো ভগ্নাংশের … ওই ভগ্নাংশের\"; kept as printed"],
      blocks: [
        { ask: "{{১/৩}} এর সমতুল ভগ্নাংশ কীভাবে তৈরি করা যায়?" },
        { row: [
          { frame: [{ kind: "c4p097_arcs", items: ["{{১/৩}}", "", "{{২/৬}}", "", "{{৩/৯}}", "", "{{৪/১২}}"], w: W51, up: 16.5, th: 5.4, size: 15, arcs: fan(["×২", "×□", "×□"], "#E11D2A", W51) }], tone: "blue", pad: 1.2 },
          { frame: [
            { text: "কোনো ভগ্নাংশের হর এবং লবকে একই সংখ্যা দ্বারা গুণ করলে ওই ভগ্নাংশের সমতুল ভগ্নাংশ পাওয়া যায়।" },
            { row: [{ kind: "c4p097_sym", bg: true, terms: [["o", "q"], "=", ["o×t", "q×t"]] }, { kind: "c5p049_face", who: "boy" }], w: [0, 18], gap: 2, justify: "space-between" },
          ], tone: "blue", pad: 2 },
        ], w: [86, 0], gap: 3 },
        { ex: "১", mark: "anu", text: "{{৩/৮}} এর ৪টি সমতুল ভগ্নাংশ লিখি।", body: [{ kind: "c4p053_tbox", h: 17 }] },
        { ex: "১", mark: "kaj", text: "{{৮/২৪}} এর সমতুল {{৪/১২}}, {{২/৬}} ও {{১/৩}} কীভাবে তৈরি করা যায় তা চিন্তা করি।", body: [
          { row: [
            { frame: [{ kind: "c4p097_arcs", items: ["{{৮/২৪}}", "=", "{{৪/১২}}", "=", "{{২/৬}}", "=", "{{১/৩}}"], w: W51, up: 16.5, th: 5.4, size: 15, arcs: fan(["÷২", "÷□", "÷□"], "#2F4AA8", W51) }], tone: "pink", pad: 1.2 },
            { frame: [
              { text: "কোন ভগ্নাংশের হর এবং লবকে একই সংখ্যা দ্বারা ভাগ করেও ঐ ভগ্নাংশের সমতুল ভগ্নাংশ পাওয়া যায়।" },
              { row: [{ kind: "c4p097_sym", bg: true, terms: [["o", "q"], "=", ["o÷t", "q÷t"]] }, { kind: "c5p049_face", who: "girl", mood: "think" }], w: [0, 18], gap: 2, justify: "space-between" },
            ], tone: "pink", pad: 2 },
          ], w: [84, 0], gap: 3 },
        ] },
        { ex: "২", mark: "anu", text: "খালি ঘরের সংখ্যাগুলো নির্ণয় করি।", body: [
          { sums: ["{{৩/৭}} = {{৯/□}}", "{{৫/৯}} = {{□/১৮}}", "{{৭/২১}} = {{১/□}}", "{{৯/৩৬}} = {{□/১২}}"], cols: 4, marks: true, size: 14 },
        ] },
      ],
    },
    {
      page: 52,
      dense: true,
      allow: ["৩০", "৫৬", "৮০"], // অনুশীলন ৩: the হর of {{২৫/৩০}}, {{১৬/৫৬}}, {{২০/৮০}}, which tesseract misreads; checked by eye at 300 dpi
      blocks: [
        { ex: "২", mark: "kaj", text: "লঘিষ্ঠ আকারে প্রকাশ করি।", body: [
          { row: [
            ssay("boy", "talk", "৯ হলো ৯ এবং ৩৬ এর গরিষ্ঠ সাধারণ গুণনীয়ক।"),
            { row: [
              { frame: [{ kind: "c5p049_steps", items: ["{{৯/৩৬}}", "=", "{{১/৪}}"], w: [9, 7, 8], over: { 1: "÷ ৯" }, under: { 1: "÷ ৯" } }], pad: 1 },
              { kind: "c4p097_arrow", w: 8 },
              { frame: [eqs(["{{৯/৩৬}} = {{১/৪}}"], { size: 14 })], pad: 1.6 },
            ], w: [27, 9, 0], gap: 1, justify: "flex-start" },
          ], w: [0, 64], gap: 8 },
          ssay("girl", "think", "ভাগ প্রক্রিয়া ব্যবহার করে সমতুল করার মাধ্যমে কোনো ভগ্নাংশকে লঘিষ্ঠ আকারে প্রকাশ করা যায়।"),
        ] },
        { note: "কোনো ভগ্নাংশকে লঘিষ্ঠ ভগ্নাংশে রূপান্তর করতে ওই ভগ্নাংশের লব এবং হরকে গরিষ্ঠ সাধারণ গুণনীয়ক দ্বারা ভাগ করা হয়।" },
        { ex: "৩", mark: "kaj", text: "{{১৫/৪৫}} কে লঘিষ্ঠ আকারে প্রকাশ করি।", body: [
          { row: [
            { kind: "c5p049_steps", items: ["{{১৫/৪৫}}", "=", "{{৫/১৫}}", "=", "{{১/৩}}"], w: [10, 9, 10, 9, 9], over: { 1: "÷ ৩", 3: "÷ ৫" }, under: { 1: "÷ ৩", 3: "÷ ৫" }, arcs: [{ a: 1, b: 3, side: "up" }, { a: 1, b: 3, side: "down" }] },
            { col: [
              { row: [{ kind: "c4p097_arrow", w: 13, angle: -22 }, { frame: [{ kind: "c4p097_cancel", up: ["১", "~৫", "~১৫"], down: ["~৪৫", "~১৫", "৩"], eq: "{{১/৩}}" }], pad: 1.4 }], w: [16, 30], gap: 2, justify: "flex-start" },
              { row: [{ kind: "c4p097_arrow", w: 13, angle: 32 }, { frame: [{ kind: "c4p097_cancel", up: ["১", "~১৫"], down: ["~৪৫", "৩"], eq: "{{১/৩}}" }], pad: 1.4 }], w: [16, 30], gap: 2, justify: "flex-start" },
            ], gap: 3 },
          ], w: [58, 50], gap: 10, justify: "center" },
        ] },
        say("boy", "talk", "এখানে প্রথমে ৩ ও পরে ৫ দিয়ে ভাগ করা এবং একবারে ১৫ দিয়ে ভাগ করা একই কথা।\n১৫ এবং ৪৫ এর গসাগু হলো ১৫।\nহর এবং লবকে গসাগু দ্বারা ভাগ করে খুব সহজেই ভগ্নাংশের লঘিষ্ঠ আকার পেতে পারি।"),
        { ex: "৩", mark: "anu", text: "নিচের ভগ্নাংশগুলোকে লঘিষ্ঠ আকারে প্রকাশ করি।", body: [
          { sums: ["{{৬/১২}}", "{{১৪/২১}}", "{{২৫/৩০}}", "{{১৬/৫৬}}", "{{৩৫/৪২}}", "{{২০/৮০}}"], cols: 6, marks: true, size: 14 },
        ] },
      ],
    },
    {
      page: 53,
      dense: true,
      allow: ["২০"], // কাজ ১: {{১২/২০}} and the multiples ৫, ১০, ১৫, ২০…, tesseract misreads the small ২০; checked by eye at 300 dpi
      blocks: [
        { ask: "রিমার কাছে লাল ও নীল রঙের দুইটি ফিতা আছে। লাল ফিতাটির দৈর্ঘ্য {{২/৩}} মিটার এবং নীল ফিতাটির দৈর্ঘ্য {{৩/৪}} মিটার। কোনটি বড়ো?" },
        { row: [{ pic: "p053-red-ribbon", h: 19, w: 42 }, { pic: "p053-blue-ribbon", h: 15, w: 42 }], gap: 20, justify: "center" },
        ssay("boy", "talk", "এখানে হরগুলো সমান নয়। সমান হর বা সমহর হলে সহজেই তুলনা করতে পারতাম।"),
        ssay("girl", "think", "চলো আমরা সমতুল ভগ্নাংশের ধারণা ব্যবহার করি।"),
        { kind: "c3p091_tbl", tone: "blue", w: [80, 86], rows: [[
          { kind: "c4p097_cell", gap: 1.4, body: [
            ssay("boy", "talk", "হ্যাঁ, তাহলে এই ভগ্নাংশগুলোকে একই হর বা সমহর বা সাধারণ হরবিশিষ্ট করতে পারব।", null, true),
            eqs(["{{২/৩}} = {{৪/৬}} = {{৬/৯}} = {{৮/১২}}", "{{৩/৪}} = {{৬/৮}} = {{৯/১২}}"], { size: 14, indent: 16 }),
          ] },
          { kind: "c4p097_cell", gap: 1.6, body: [
            ssay("girl", "think", "যখন হরগুলো একই হয়, তখন যে ভগ্নাংশের লব বড়ো সেই ভগ্নাংশটি বড়ো হয়।\nএখানে ৯ > ৮, সুতরাং {{৯/১২}} > {{৮/১২}} হবে।", null, true),
            "অর্থাৎ, {{৩/৪}} > {{২/৩}} তাহলে, নীল ফিতাটি বড়ো।",
          ] },
        ]] },
        ssay("boy", "talk", "কয়েকটি ভগ্নাংশের হর ভিন্ন হলে সেগুলোকে আমরা অসমহরবিশিষ্ট ভগ্নাংশ বলি। এগুলোর মধ্যে তুলনা করতে হলে প্রতিটি ভগ্নাংশকে সমহরে পরিণত করতে হয়।"),
        { ex: "১", mark: "kaj", text: "{{৩/৫}} এবং {{২/৩}} ভগ্নাংশ দুইটিকে সমহরবিশিষ্ট ভগ্নাংশে রূপান্তর করে তুলনা করি।", body: [
          { kind: "c3p091_tbl", tone: "blue", w: [122, 38], rows: [[
            { kind: "c5p049_ring" },
            eqs(["{{৩/৫}} → {{৯/১৫}}", "{{২/৩}} → {{১০/১৫}}"], { size: 14, gap: 5, center: true }),
          ]] },
          "এখানে ৯ < ১০, সুতরাং {{৯/১৫}} < {{১০/১৫}} হবে। অর্থাৎ, {{৩/৫}} < {{২/৩}}",
        ] },
      ],
    },
    {
      page: 54,
      dense: true,
      spread: true,
      blocks: [
        { ex: "২", mark: "kaj", text: "নিচের ভগ্নাংশগুলোকে সমহরবিশিষ্ট ভগ্নাংশে রূপান্তর করে তুলনা করি।", body: [
          { kind: "c3p091_tbl", tone: "blue", w: [24, 136], size: 14, rows: [
            ["{{১/৩}}, {{১/৫}}", eqs([nine("{{১/৩}}"), nine("{{১/৫}}")], { size: 13.5, gap: 2.4 })],
            ["{{১/৩}}, {{১/৫}}", eqs(["→ {{□/□}} □ {{□/□}} → {{□/□}} □ {{□/□}}"], { size: 13.5 })],
          ] },
        ] },
        { frame: [eqs(["এখানে ▭ , ▭ হলো ৩ ও ৫ এর সাধারণ গুণিতক।", "আবার, ৩ ও ৫ এর লঘিষ্ঠ সাধারণ গুণিতক (লসাগু) হলো ▭"], { size: 13 })], tone: "blue", pad: 2.2 },
        say("parrot", "talk", "ভগ্নাংশসমূহের সাধারণ হর সহজে নির্ণয় করার জন্য হরগুলোর লঘিষ্ঠ সাধারণ গুণিতক (লসাগু) ব্যবহার করতে হয়।"),
        { ex: "৩", mark: "kaj", text: "{{৫/৬}}, {{১/৯}} ভগ্নাংশগুলোকে সমহরবিশিষ্ট ভগ্নাংশে রূপান্তর করে তুলনা করি।", body: [
          eqs(["এখানে, ভগ্নাংশগুলোর হর ৬ ও ৯। আর ৬ ও ৯ এর লসাগু ▭।"], { size: 13 }),
          { row: [eqs(["১৮ ÷ ৬ = ৩, {{৫ × ৩/৬ × ৩}} = {{□/□}}"], { size: 13.5 }), eqs(["১৮ ÷ ৯ = ২, {{১ × ২/৯ × ২}} = {{□/□}}"], { size: 13.5 })], gap: 6, justify: "space-around" },
          eqs(["সমহরবিশিষ্ট ভগ্নাংশ দুইটি {{□/□}} ও {{□/□}}। যেহেতু ▭ > ▭ অতএব {{□/□}} > {{□/□}}"], { size: 13 }),
        ] },
        { ex: "৪", mark: "kaj", text: "{{৩/৮}}, {{১/২৪}} ভগ্নাংশগুলোকে সমহরবিশিষ্ট ভগ্নাংশে রূপান্তর করে তুলনা করি।", body: [
          eqs(["ভগ্নাংশগুলোর হর ▭ ও ▭ এর লসাগু ▭"], { size: 13 }),
          { row: [eqs(["□ ÷ ৮ = □, {{৩ × □/৮ × □}} = {{□/□}}"], { size: 13.5 }), eqs(["□ ÷ ২৪ = □, {{১ × □/২৪ × □}} = {{□/□}}"], { size: 13.5 })], gap: 6, justify: "space-around" },
          eqs(["সমহরবিশিষ্ট ভগ্নাংশ {{□/□}} ও {{□/□}}। যেহেতু, □ > □ অতএব {{□/□}} > {{□/□}}"], { size: 13 }),
        ] },
      ],
    },
    {
      page: 55,
      dense: true,
      spread: true,
      blocks: [
        { ex: "১", mark: "anu", text: "নিচের ভগ্নাংশগুলোকে সমহরবিশিষ্ট ভগ্নাংশে রূপান্তর করে তুলনা করি।", body: [
          { sums: ["১) {{৩/৪}}, {{৩/৫}}", "২) {{৫/৭}}, {{৩/৪}}"], cols: 2, size: 14 },
        ] },
        { ex: "২", mark: "anu", text: "নিচের ভগ্নাংশগুলোকে সমহরবিশিষ্ট ভগ্নাংশে রূপান্তর করি এবং ‘<’, ‘>’ বা ‘=’ ব্যবহার করে তুলনা করি।", body: [
          { sums: ["১) {{৭/৯}} □ {{৫/১২}}", "২) {{৩/৪}} □ {{৫/৭}}", "৩) {{২/৩}} □ {{৬/৯}}", "৪) {{১১/১৬}} □ {{১৭/২৪}}"], cols: 4, size: 14 },
        ] },
        { ex: "৫", mark: "kaj", text: "{{১/৩}}, {{১/৫}} এবং {{৫/৬}} ভগ্নাংশগুলোকে সমহরবিশিষ্ট ভগ্নাংশে রূপান্তর করি এবং ‘<’, ‘>’ বা ‘=’ ব্যবহার করে তুলনা করি।", body: [
          eqs(["ভগ্নাংশগুলোর হর □, □ ও □ এর লসাগু □।"], { size: 13.5 }),
          eqs(["□ ÷ □ = □, {{□ × □/□ × □}} = {{□/□}}", "□ ÷ □ = □, {{□ × □/□ × □}} = {{□/□}}", "□ ÷ □ = □, {{□ × □/□ × □}} = {{□/□}}",
            "সমহরবিশিষ্ট ভগ্নাংশ {{□/□}}, {{□/□}} ও {{□/□}}", [20, "অতএব {{□/□}} □ {{□/□}} □ {{□/□}}"]], { size: 13.5, indent: 18, gap: 3.4 }),
        ] },
        { ex: "৩", mark: "anu", text: "সমহরবিশিষ্ট ভগ্নাংশে রূপান্তর করি এবং ‘<’, ‘>’ বা ‘=’ ব্যবহার করে তুলনা করি।", body: [
          { sums: ["{{১/৩}}, {{১/৪}}, {{১/৬}}", "{{৩/৪}}, {{৯/১২}}, {{১৫/২০}}", "{{৩/৫}}, {{৩/৪}}, {{৭/১০}}"], cols: 3, marks: true, size: 14 },
        ] },
      ],
    },
    {
      page: 56,
      dense: true,
      spread: true,
      blocks: [
        { ask: "ক বোতলে {{১/২}} লিটার এবং খ বোতলে {{১/৩}} লিটার পানি রয়েছে। বোতল দুইটিতে মোট কত লিটার পানি রয়েছে?" },
        { row: [
          { pic: "p056-bottles", h: 36, w: 32 },
          { kind: "c4p067_x", b: say("boy", "talk", "দুইটি বোতলের মোট পানির পরিমাণ বের করার জন্য ▭ করব।", "right") },
        ], w: [40, 0], gap: 6 },
        { row: [
          // {{১/২}} and {{১/৩}} of a litre, then the same as {{৩/৬}} and {{২/৬}}
          { kind: "c5p049_jars", color: "#8ED6F0", rows: [[{ n: 2, k: 1, label: "{{১/২}}" }, { n: 3, k: 1, label: "{{১/৩}}" }], [{ n: 6, k: 3, label: "{{৩/৬}}" }, { n: 6, k: 2, label: "{{২/৬}}" }]] },
          eqs(["গাণিতিক বাক্য", [2, "{{১/২}} + {{১/৩}} = ▭"], "হিসাবটি নিম্নরূপ", [2, "{{১/২}} + {{১/৩}} = {{৩/৬}} + {{২/৬}}"], [24, "= {{৩ + ২/৬}}"], [24, "= {{৫/৬}} লিটার"]], { size: 13.5, gap: 1.2 }),
        ], w: [84, 0], gap: 8, align: "center" },
        ssay("girl", "think", "ভিন্ন হরবিশিষ্ট ভগ্নাংশসমূহকে যোগ করার ক্ষেত্রে প্রথমে ভগ্নাংশগুলোকে সমহরবিশিষ্ট ভগ্নাংশে রূপান্তর করে তারপর যোগ করতে হবে।"),
        ssay("boy", "talk", "বাহ! ভগ্নাংশকে সাধারণ হরবিশিষ্ট ভগ্নাংশে রূপান্তর করলে শুধু ভগ্নাংশের তুলনা করা যায় তাই নয়, ভগ্নাংশের যোগও করা যায়।"),
        { ex: "১", mark: "kaj", text: "সমহরবিশিষ্ট করে যোগ করি।", body: [
          eqs(["(১) {{১/৪}} + {{১/৩}} = {{□/□}} + {{□/□}} = {{□ + □/□}} = {{□/□}}"], { size: 14, indent: 4 }),
        ] },
        { ex: "১", mark: "anu", text: "যোগ করি।", body: [
          { sums: ["{{১/৪}} + {{২/৫}}", "{{১/৬}} + {{২/৯}}", "{{১/৮}} + {{৫/৬}}"], cols: 3, marks: true, size: 14 },
        ] },
      ],
    },
    {
      page: 57,
      dense: true,
      spread: true,
      blocks: [
        { ask: "তোমার কাছে {{২/৩}} লিটার দুধ রয়েছে যা থেকে তুমি {{১/৪}} লিটার দুধ পান করেছ। আর কত লিটার দুধ অবশিষ্ট রয়েছে?" },
        { kind: "c4p067_x", b: ssay("boy", "talk", "এই সমস্যাটি অবশিষ্ট থাকা সংক্রান্ত। আর তাই এখানে প্রক্রিয়াটি হলো ▭") },
        { row: [
          // {{২/৩}} and {{১/৪}} of a litre, then the same as {{৮/১২}} and {{৩/১২}} (dotted lines, as printed)
          { kind: "c5p049_jars", color: "#55B84A", dotted: true, rows: [[{ n: 3, k: 2, label: "{{২/৩}}" }, { n: 4, k: 1, label: "{{১/৪}}" }], [{ n: 12, k: 8, label: "{{৮/১২}}" }, { n: 12, k: 3, label: "{{৩/১২}}" }]] },
          eqs(["গাণিতিক বাক্য {{২/৩}} − {{১/৪}} = ▭", "হিসাবটি নিম্নরূপ", [2, "{{২/৩}} − {{১/৪}} = {{৮/১২}} − {{৩/১২}}"], [24, "= {{৮ − ৩/১২}}"], [24, "= {{৫/১২}} লিটার"]], { size: 13.5, gap: 1.6 }),
        ], w: [84, 0], gap: 8, align: "center" },
        ssay("girl", "think", "ভিন্ন হরবিশিষ্ট ভগ্নাংশসমূহকে বিয়োগ করার ক্ষেত্রে প্রথমে ভগ্নাংশগুলোকে সমহরবিশিষ্ট ভগ্নাংশে রূপান্তর করে তারপর হিসাব করতে হবে।"),
        { ex: "১", mark: "kaj", text: "সমহরবিশিষ্ট করে বিয়োগ করি।", body: [
          eqs(["(১) {{১/২}} − {{১/৩}} = {{□/□}} − {{□/□}} = {{□ − □/□}} = {{□/□}}", "(২) {{১/৪}} − {{১/৫}} = {{□/□}} − {{□/□}} = {{□ − □/□}} = {{□/□}}", "(৩) {{২/৩}} − {{২/৫}} = {{□/□}} − {{□/□}} = {{□ − □/□}} = {{□/□}}"], { size: 14, indent: 4, gap: 2.4 }),
        ] },
        { ex: "১", mark: "anu", text: "বিয়োগ করি।", body: [
          { sums: ["{{৩/৮}} − {{১/৪}}", "{{৫/৬}} − {{৩/৮}}", "{{৭/১০}} − {{৪/১৫}}"], cols: 3, marks: true, size: 14 },
        ] },
      ],
    },
    {
      page: 58,
      dense: true,
      allow: ["১৪"], // অনুশীলন ২ (৫) {{১১/১৪}}: the small হর tesseract misreads; checked by eye at 300 dpi
      blocks: [
        { ex: "২", mark: "kaj", text: "হিসাব করি।", body: [
          eqs(["(১) {{১/৩}} + {{১/৬}} ⟶ {{১/৩}} + {{১/৬}} = {{□/□}} + {{□/□}} = {{□ + □/□}} = {{□/□}}", "(২) {{১/২}} − {{১/৬}} ⟶ {{১/২}} − {{১/৬}} = {{□/□}} − {{□/□}} = {{□ − □/□}} = {{□/□}}"], { size: 13.5, indent: 2, gap: 2, tight: true }),
        ] },
        { note: "যদি সম্ভব হয় তবে ভগ্নাংশকে এর লঘিষ্ঠ আকারে প্রকাশ করতে হবে।" },
        { ex: "২", mark: "anu", text: "যোগ এবং বিয়োগ করি।", body: [
          { sums: ["{{১/৪}} + {{৩/২০}}", "{{৩/৮}} + {{১/২৪}}", "{{৪/১৫}} + {{১/১২}}", "{{৮/১৫}} + {{৩/১০}}", "{{১১/১৪}} − {{২/৭}}", "{{৫/৬}} − {{৭/১৮}}", "{{১১/১২}} − {{৪/১৫}}", "{{১৩/১৫}} − {{৯/২০}}"], cols: 4, marks: true, size: 13.5 },
        ] },
        { ex: "৩", mark: "kaj", text: "তিনটি ভগ্নাংশ নিয়ে হিসাব করি।", body: [
          eqs(["(১) {{১/৬}} + {{১/৩}} + {{১/৪}} ⟶ {{১/৬}} + {{১/৩}} + {{১/৪}} = {{□/□}} + {{□/□}} + {{□/□}} = {{□ + □ + □/□}} = {{□/□}}",
            "(২) ১ − {{১/২}} − {{১/৪}} ⟶ ১ − {{১/২}} − {{১/৪}} = {{□/□}} − {{□/□}} − {{□/□}} = {{□ − □ − □/□}} = {{□/□}}"], { size: 12.5, gap: 2, aw: 10, tight: true }),
        ] },
        { ex: "৪", mark: "kaj", text: "{{৭/৫}} মিটার ও {{৪/৫}} মিটার দৈর্ঘ্যের দুইটি ফিতা একত্রে কত মিটার?", body: [
          { kind: "c3p001_box", label: "গাণিতিক বাক্য", w: 104, h: 9 },
          { kind: "c5p049_ribbon", cw: 10.6 },
          eqs(["হিসাব, {{৭/৫}} + {{৪/৫}} = {{□ + □/□}} = {{□/□}} = □{{□/৫}} মিটার"], { size: 13.5, indent: 8, tight: true }),
        ] },
        { ex: "৩", mark: "anu", text: "হিসাব করি।", body: [
          { sums: ["{{৬/৫}} + {{৮/৫}}", "{{১০/৭}} + {{১২/৭}}", "{{৯/৭}} − {{৬/৭}}", "{{১৭/৮}} − {{৯/৮}}"], cols: 4, marks: true, size: 14 },
        ] },
      ],
    },
    {
      page: 59,
      dense: true,
      fixes: [{ book: "= ১ + ১ + {{১/৫}} = {{১/৫}}", ours: "= ১ + ১ + {{১/৫}} = ২ + {{১/৫}}", why: "রাফির হিসাব: 1 + 1 + 1/5 is not 1/5; the next line gives ২{{১/৫}}, so the step is 2 + 1/5" }],
      blocks: [
        { ask: "১{{২/৫}} মিটার ও {{৪/৫}} মিটার দৈর্ঘ্যের দুইটি ফিতা একত্রে কত মিটার?" },
        { kind: "c3p001_box", label: "গাণিতিক বাক্য", w: 116, h: 8 },
        { kind: "c3p091_tbl", tone: "blue", w: [84, 82], head: ["রাফির হিসাব", "তুলির হিসাব"], rows: [[
          { kind: "c4p097_cell", gap: 1, body: [
            ssay("boy", "talk", "১{{২/৫}} কে ১ + {{২/৫}} ভেবে সমাধান করি।", null, true),
            eqs(["১{{২/৫}} + {{৪/৫}} = ১ + {{২/৫}} + {{৪/৫}}", [18.4, "= ১ + {{□/৫}}"], [18.4, "= ১ + ১ + {{১/৫}} = ২ + {{১/৫}}"], [18.4, "= ২{{১/৫}} মিটার"]], { size: 13, gap: 0.4, indent: 4, tight: true }),
          ] },
          { kind: "c4p097_cell", gap: 1, body: [
            ssay("girl", "think", "আমি মিশ্র ভগ্নাংশকে অপ্রকৃত ভগ্নাংশে পরিণত করে সমাধান করি।", null, true),
            eqs(["১{{২/৫}} + {{৪/৫}} = {{□/৫}} + {{৪/৫}}", [17.2, "= {{□/৫}}"], [17.2, "= {{১১/৫}} = ২{{১/৫}} মিটার"]], { size: 13, gap: 0.4, indent: 4, tight: true }),
          ] },
        ]] },
        { text: "অতএব দুইটি ফিতার দৈর্ঘ্য একত্রে ২{{১/৫}} মিটার।", center: true },
        { ex: "১", mark: "anu", text: "হিসাব করি।", body: [
          { sums: ["১) ১{{২/৫}} + {{১/৫}}", "২) ১{{২/৩}} + {{২/৩}}", "৩) ১{{৪/৬}} + {{৩/৬}}", "৪) {{২/৯}} + ১{{৭/৯}}", "৫) ১{{৩/৫}} − {{২/৫}}", "৬) ১{{১/৩}} − {{২/৩}}", "৭) ১{{৩/৭}} − {{৪/৭}}", "৮) ২{{৪/৯}} − {{৫/৯}}"], cols: 4, size: 13.5 },
        ] },
        { ex: "১", mark: "kaj", text: "হিসাব করি ও ব্যাখ্যা করি।", body: [
          { sums: ["১) ২{{১/৩}} + ১{{১/৬}}", "২) ৩{{২/৩}} − ১{{৫/১২}}"], cols: 3, size: 14 },
          { kind: "c3p091_tbl", tone: "blue", w: [62, 42, 62], size: 12.5, h: 9, rows: [
            [cellEq("১) ২{{১/৩}} + ১{{১/৬}} = {{৭/৩}} + {{৭/৬}}", 1), mid, cellEq("২) ৩{{২/৩}} − ১{{৫/১২}} = {{১১/৩}} − {{১৭/১২}}", 1)],
            [cellEq("= {{□/□}} + {{□/□}}", 10), { text: STEP[0], center: true }, cellEq("= {{□/□}} − {{□/□}}", 10)],
            [cellEq("= {{▭/□}}", 10), { text: STEP[1], center: true }, cellEq("= {{▭/□}}", 10)],
            [cellEq("= {{□/□}}", 10), { text: STEP[2], center: true }, cellEq("= {{□/□}}", 10)],
            [cellEq("= {{□/□}}", 10), { text: STEP[3], center: true }, cellEq("= {{□/□}}", 10)],
          ] },
        ] },
      ],
    },
    {
      page: 60,
      dense: true,
      blocks: [
        { ex: "২", mark: "kaj", text: "১{{২/৩}} + {{৫/৮}} − ১{{১/৬}} কীভাবে হিসাব করব তা চিন্তা করি।", body: [
          { kind: "c3p091_tbl", tone: "blue", w: [104, 52], size: 12.5, h: 11, rows: [
            [cellEq("১) ১{{২/৩}} + {{৫/৮}} − ১{{১/৬}} = {{□/□}} + {{□/□}} − {{□/□}}", 2), mid],
            [cellEq("= {{□/□}} + {{□/□}} − {{□/□}}", 14), { text: STEP[0], center: true }],
            [cellEq("= {{▭/□}}", 14), { text: STEP[1], center: true }],
            [cellEq("= {{□/□}}", 14), { text: STEP[2], center: true }],
            [cellEq("= {{□/□}}", 14), { text: STEP[3], center: true }],
          ] },
        ] },
        { ex: "২", mark: "anu", text: "হিসাব করি।", body: [
          { sums: ["{{১/৩}} + ১{{২/৯}} + {{১/৬}}", "২{{১/২}} − {{১/৬}} − {{১/৯}}", "১{{৭/৮}} − {{৩/৮}} + {{১/১০}}"], cols: 3, marks: true, size: 14 },
        ] },
        { ex: "৩", mark: "kaj", text: "{{২/৬}} + {{১/৩}} = ? এর জন্য একটি গল্প তৈরি করি।", body: [
          { row: [
            ssay("boy", "talk", "আমার গল্পটি হলো\nএকটি তরমুজের {{২/৬}} অংশ আমার বোন এবং {{১/৩}} অংশ আমি খেয়েছি। আমরা দুইজন মোট কত অংশ খেয়েছি?"),
            ssay("girl", "think", "আমার গল্পটি হলো\n_______________________\n_______________________\n_______________________"),
          ], w: [88, 0], gap: 3, align: "stretch" },
        ] },
        { ex: "৩", mark: "anu", text: "{{১/৬}} − {{১/৯}} = ? এর জন্য গল্প তৈরি করি।", body: [{ kind: "c4p053_tbox", h: 36 }] },
      ],
    },
    {
      page: 61,
      dense: true,
      spread: true,
      allow: ["২৭", "২৬", "৭৬", "৪২", "৪৮"], // ১'s fractions {{২৭/২৬}}, {{৭৬/৭৬}}, {{৪২/৪৮}}: small stacked digits tesseract misreads; checked by eye at 600 dpi
      blocks: [
        { review: "দেখি পারি কি না" },
        { ex: "১।", dot: false, text: "ডানের ঘর থেকে কোনগুলো প্রকৃত ভগ্নাংশ এবং কোন ভগ্নাংশগুলোর মান ১ এর সমান তা খুঁজে বের করি।", body: [
          { kind: "c3p091_tbl", tone: "blue", w: [96, 64], rows: [[
            { kind: "c4p097_cell", gap: 2, body: [
              "(১) প্রকৃত ভগ্নাংশগুলো হলো", { kind: "c4p053_tbox", h: 15 },
              "(২) ১ এর সমান ভগ্নাংশগুলো হলো", { kind: "c4p053_tbox", h: 15 },
            ] },
            { kind: "c4p097_cell", gap: 26, align: "center", body: [
              eqs(["{{২/৩}}, {{৪/৪}}, {{৫/৮}}, {{৮/৫}}, {{৩/৯}}, {{১৩/১২}}"], { size: 14 }),
              eqs(["{{২৭/২৬}}, {{১/১}}, {{৭৬/৭৬}}, {{৪২/৪৮}}, {{২/১৫}}, {{৩/৩}}"], { size: 14 }),
            ] },
          ]] },
        ] },
        { ex: "২।", dot: false, text: "শ্রেণিকক্ষের মোট শিক্ষার্থীর তুলনায় ছাত্র ও ছাত্রীদের সংখ্যাকে ভগ্নাংশে প্রকাশ করি এবং প্রাপ্ত ভগ্নাংশ দুইটি লঘিষ্ঠ আকারে প্রকাশ করি।", body: [
          { kind: "c4p053_tbox", h: 32 },
        ] },
        { ex: "৩।", dot: false, text: "খালি ঘরের সংখ্যাগুলো নির্ণয় করি।", body: [
          { sums: ["{{৩/৭}} = {{□/২৮}}", "{{৩/৪}} = {{□/৩৬}}", "{{৩/৬}} = {{□/২}}", "{{১২/২০}} = {{□/৫}}"], cols: 2, marks: true, size: 14 },
        ] },
        { ex: "৪।", dot: false, text: "হিসাব করি।", body: [
          { sums: ["{{৪/১৫}} + {{২/৫}}", "{{২/৩}} − {{৭/১৫}}"], cols: 2, marks: true, size: 14 },
        ] },
      ],
    },
    {
      page: 62,
      dense: true,
      allow: ["১৭", "২৮", "৫৬", "১০", "১৩", "কি"], // {{১৭/৫}}, {{২৮/৫৬}}, {{১৪/২৮}}, ২{{১/১০}}, {{১৩/৮}}: small stacked digits tesseract misreads; ১১'s "কি মি" is printed with a space (OCR reads কিমি); all checked by eye at 300 dpi
      fixes: [{ book: "(৩) {{২/৯}} − {{১২/৫}}", ours: "(৩) {{১২/৫}} − {{২/৯}}", why: "নিজে করি ২: 2/9 − 12/5 is less than 0 (−98/45), which Class 5 cannot do; the two fractions swapped, as in (১) {{২/৯}} + {{১২/৫}}" }],
      flags: [
        "p62 নিজে করি: the exercises are numbered ১, ২, then ৯, ১০, ১১ (no ৩–৮); kept as printed so the numbers match the children's books",
        "p62 নিজে করি ১১: \"{{৫/১২}} কি মি\" (with a space) where the same exercise and its picture print \"কিমি\"; kept as printed",
      ],
      blocks: [
        { practise: "নিজে করি" },
        { ex: "১", mark: "nije", text: "সঠিক উত্তরের পাশে টিক (√) চিহ্ন দেই।", body: [{ kind: "c4p097_cell", gap: 0, body: [
          "(১) {{১৭/৫}} এর মিশ্র ভগ্নাংশ কোনটি?",
          opts(["১{{৭/৫}}", "২{{২/৫}}", "৩{{২/৫}}", "২{{৩/৫}}"]),
          "(২) নিচের কোনটি সবচেয়ে বড়ো?",
          opts(["{{৩/৪}}", "{{৩/৫}}", "{{৩/৭}}", "{{৩/৮}}"]),
          "(৩) {{২৮/৫৬}} এর লঘিষ্ঠ আকার নিচের কোনটি?",
          opts(["{{১৪/২৮}}", "{{৭/১৪}}", "{{৪/৮}}", "{{১/২}}"]),
        ] }] },
        { ex: "২", mark: "nije", text: "হিসাব করি।", body: [
          { sums: ["{{২/৯}} + {{১২/৫}}", "৩{{১/৩}} + ২{{৪/৯}}", "{{১২/৫}} − {{২/৯}}", "৩{{১/৬}} − ২{{১/১০}}", "{{৩/৪}} + {{৭/৮}} − {{১১/১২}}", "১{{১/৩}} + ৩{{১/৪}} − ২{{৫/৬}} − {{৩/৪}}"], cols: 3, marks: true, size: 13.5 },
        ] },
        { ex: "৯", mark: "nije", text: "৩{{৩/৪}} মিটার ও ২{{১/৩}} মিটার দৈর্ঘ্যের দুইটি ফিতা একত্রে কত মিটার?" },
        { ex: "১০", mark: "nije", text: "গীতার কাছে ১{{৫/৬}} লিটার ও মামুনের কাছে {{১৩/৮}} লিটার জুস আছে। কার জুসের পরিমাণ বেশি এবং কত বেশি?" },
        { ex: "১১", mark: "nije", text: "সবুজের বাড়ি বিদ্যালয় থেকে {{৩/৮}} কিমি পশ্চিমে অবস্থিত। মিতুর বাড়ি বিদ্যালয় থেকে {{৫/১২}} কি মি পূর্বে অবস্থিত।", body: [
          { kind: "c5p049_road", w: 150, ly: 30.5, pics: [{ pic: "p062-sobuj-house", w: 36, h: 18 }, { pic: "p062-school", w: 32, h: 22 }, { pic: "p062-mitu-house", w: 30, h: 24 }],
            caps: ["সবুজের বাড়ি", "বিদ্যালয়", "মিতুর বাড়ি"], dists: ["{{৩/৮}} কিমি", "{{৫/১২}} কিমি"] },
          "(ক) সবুজের বাড়ি থেকে মিতুর বাড়ির দূরত্ব কত কিমি?",
          "(খ) বিদ্যালয় থেকে কার বাড়ি নিকটবর্তী? সবুজ ও মিতুর বাড়ি থেকে বিদ্যালয়ের দূরত্বের পার্থক্য কত?",
        ] },
      ],
    },
  ],
};
