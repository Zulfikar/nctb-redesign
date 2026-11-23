// প্রাথমিক গণিত, তৃতীয় শ্রেণি · a game for every page (3 Nov 2026): printed pp.79, 84, 85, 87, 92, 107, 119, 122, 126,
// which the fraction file and the rest file left without a game. Their exercises are already items in a neighbouring
// page's game (p.80–81, p.86, p.88–89, p.93–95, p.121, p.123, p.125, p.128–131), so each page here practises its own
// content another way: its worked examples step by step as multiple choice (pp.79, 84, 85, 87), its fraction words and
// pictures (p.92), its coin pictures and coin–note table (p.107), its unit boxes as unit changes (pp.119, 126) and its
// scales and কিলোগ্রাম box (p.122).
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

module.exports = (L) => {
  const { it, wio, q, mcq, note, cant } = L;
  const conv = (from, to) => ({ kind: "convert", from, to });

  // ════════════════════════════ অধ্যায় ৭ · গুণ ও ভাগের সম্পর্ক ════════════════════════════
  // ── p.79: কাজ ১ (cont.), কাজ ২, কাজ ৩: ÷ then ×, and × ÷ side by side, left to right ──
  mcq({
    page: 79, slug: "think-steps", title: "ধাপে ধাপে ভাবি: ভাগ, তারপর গুণ",
    questions: [
      // কাজ ১ (the story is on p.78; p.79 works it: the girl ÷, the boy ×)
      q({ prompt: "তাহসিনের 40টি রং পেনসিল ছিল। সে পেনসিলগুলোকে সমান 5 ভাগে ভাগ করল এবং রাতুলকে 2 ভাগ দিলো। রাতুল কয়টি পেনসিল পেল? – প্রথমে কী করতে হবে?", options: ["40 কে 5 দিয়ে ভাগ", "40 কে 5 দিয়ে গুণ", "40 থেকে 5 বিয়োগ", "40 এর সাথে 5 যোগ"], answer: "40 কে 5 দিয়ে ভাগ", why: "সমান 5 ভাগ করার জন্য 40 কে 5 দিয়ে ভাগ করতে হবে: 40 ÷ 5।" }),
      q({ prompt: "40 ÷ 5 = কত? অর্থাৎ প্রতি ভাগে কয়টি পেনসিল?", options: ["8টি", "5টি", "35টি", "45টি"], answer: "8টি", num: 8, why: "40 ÷ 5 = 8, কারণ 5 × 8 = 40। প্রতি ভাগে 8টি পেনসিল।" }),
      q({ prompt: "তাহসিন রাতুলকে 2 ভাগ পেনসিল দিলো। প্রতি ভাগে 8টি হলে এখন কী করতে হবে?", options: ["8 কে 2 দিয়ে গুণ", "8 কে 2 দিয়ে ভাগ", "8 এর সাথে 2 যোগ", "8 থেকে 2 বিয়োগ"], answer: "8 কে 2 দিয়ে গুণ", why: "রাতুলকে 2 ভাগ দিতে হলে যে ভাগফল পেয়েছি (8), সেটিকে 2 দিয়ে গুণ করতে হবে: 8 × 2।" }),
      q({ prompt: "রাতুল কয়টি পেনসিল পেল?", options: ["16টি", "10টি", "20টি", "24টি"], answer: "16টি", num: 16, why: "40 ÷ 5 = 8, তারপর 8 × 2 = 16। রাতুল 16টি পেনসিল পেল।" }),
      // কাজ ২
      q({ prompt: "তৃষা 120 টাকা খরচ করে 20টি কলম আনল। 1টি কলমের দাম কত?", options: ["6 টাকা", "100 টাকা", "140 টাকা", "60 টাকা"], answer: "6 টাকা", num: 6, why: "1টি কলমের দাম বের করতে ভাগ করি: 120 ÷ 20 = 6 টাকা, কারণ 20 × 6 = 120।" }),
      q({ prompt: "শিক্ষক তৃষাকে আরো 5টি কলম কিনতে বললেন। 1টি কলমের দাম 6 টাকা হলে আরো কত টাকা লাগবে?", options: ["30 টাকা", "11 টাকা", "25 টাকা", "125 টাকা"], answer: "30 টাকা", num: 30, why: "আরো 5টি কলমের দাম: 6 × 5 = 30 টাকা।" }),
      q({ prompt: "তৃষাদের বিদ্যালয়ের অনুষ্ঠানের জন্য 120 টাকায় 20টি কলম আনা হলো। আরো 5টি কলমের দাম বের করার গাণিতিক বাক্য কোনটি?", options: ["120 ÷ 20 × 5", "120 × 20 ÷ 5", "120 ÷ 5 × 20", "120 − 20 × 5"], answer: "120 ÷ 20 × 5", why: "প্রথমে 1টি কলমের দাম 120 ÷ 20 = 6, তারপর 5টি কলমের দাম 6 × 5 = 30। তাই 120 ÷ 20 × 5।" }),
      // কাজ ৩
      q({ prompt: "12 ÷ 2 × 6 এই হিসাবটিতে কোন অংশটি আগে করব?", options: ["12 ÷ 2", "2 × 6"], answer: "12 ÷ 2", why: "গুণ ও ভাগের কাজ পাশাপাশি থাকলে বাম থেকে ডান দিকে হিসাব করি, তাই আগে 12 ÷ 2 = 6।" }),
      q({ prompt: "গুণ ও ভাগের কাজ পাশাপাশি থাকলে কোন দিক থেকে হিসাব করতে হয়?", options: ["বাম থেকে ডান দিকে", "ডান থেকে বাম দিকে", "যেকোনো দিক থেকে"], answer: "বাম থেকে ডান দিকে", why: "ছেলেটি বলল: গুণ ও ভাগের কাজ পাশাপাশি থাকলে বাম থেকে ডান দিকে হিসাব করতে হয়।" }),
      q({ prompt: "12 ÷ 2 × 6 = কত?", options: ["36", "1", "6", "72"], answer: "36", num: 36, why: "বাম থেকে ডানে: 12 ÷ 2 = 6, তারপর 6 × 6 = 36। আগে 2 × 6 করলে (12 ÷ 12 = 1) ভুল হয়।" }),
    ],
    src: "p.79 কাজ ১ continued (the girl: 40 ÷ 5 = 8, the boy: 8 × 2 = 16, printed “রাতুল ১৬টি পেনসিল পেল”), কাজ ২ (120 ÷ 20 = 6, 6 × 5 = 30), কাজ ৩ (the boy's rule “বাম থেকে ডান দিকে”, printed 12 ÷ 2 × 6 = 6 × 6 = 36): each worked step as a question, my wrong options",
  });
  note("p.79 (multiple choice, 10): the page's three worked examples are already items in the p.80 expression game (12 ÷ 2 × 6, 40 ÷ 5 × 2, 120 ÷ 20 × 5) and the p.81 story game (কাজ ১, কাজ ২), so p.79's game asks the thinking the page prints, one step at a time: what to do first (the girl's “৪০ কে ৫ দিয়ে ভাগ”), the step's answer, what to do next (the boy's “২ দিয়ে গুণ”), the result; কাজ ২'s two steps and its sentence; কাজ ৩'s rule (“বাম থেকে ডান দিকে”) and its value. The wrong options are mine (e.g. 24 = the 3 parts Tahsin keeps; 1 = 12 ÷ (2 × 6), the right-to-left slip).");

  // ════════════════════════════ অধ্যায় ৮ · যোগ, বিয়োগ, গুণ ও ভাগসংক্রান্ত সমস্যা ════════════════════════════
  // ── p.84: মূল প্রশ্ন (× then +), its two green steps ──
  const PENCILS = "একটি পেনসিলের দাম 20 টাকা ও 1টি ছবি আঁকার খাতার দাম 150 টাকা। 5টি পেনসিল ও 1টি ছবি আঁকার খাতা কিনতে কত টাকা লাগবে?";
  mcq({
    page: 84, slug: "think-steps", title: "ধাপে ধাপে ভাবি: গুণ, তারপর যোগ",
    questions: [
      q({ prompt: `${PENCILS} – মোট খরচ বের করার জন্য প্রথমে কী বের করতে হবে?`, options: ["5টি পেনসিলের দাম", "5টি খাতার দাম", "1টি পেনসিল ও 1টি খাতার দাম", "1টি খাতার দাম"], answer: "5টি পেনসিলের দাম", why: "ছেলেটি বলল: মোট খরচ বের করার জন্য আমাদের প্রথমে 5টি পেনসিলের দাম বের করতে হবে।" }),
      q({ prompt: "5টি পেনসিলের দাম বের করতে প্রথমে কোন কাজটি করতে হবে?", options: ["গুণ", "ভাগ", "যোগ", "বিয়োগ"], answer: "গুণ", why: "5টি পেনসিলের দাম বের করার জন্য 1টি পেনসিলের দামকে 5 দ্বারা গুণ করতে হবে: 20 × 5।" }),
      q({ prompt: "1টি পেনসিলের দাম 20 টাকা হলে 5টি পেনসিলের দাম কত?", options: ["100 টাকা", "25 টাকা", "4 টাকা", "200 টাকা"], answer: "100 টাকা", num: 100, why: "20 × 5 = 100। 5টি পেনসিলের দাম 100 টাকা।" }),
      q({ prompt: "5টি পেনসিলের দাম বের করার পরে কোন কাজটি করতে হবে?", options: ["যোগ", "বিয়োগ", "গুণ", "ভাগ"], answer: "যোগ", why: "মেয়েটি বলল: প্রথমে গুণ করতে হবে এবং পরে যোগ করতে হবে। 5টি পেনসিলের দামের সাথে খাতার দাম যোগ করি।" }),
      q({ prompt: "5টি পেনসিলের দাম 100 টাকার সাথে কত টাকা যোগ করতে হবে?", options: ["150 টাকা", "20 টাকা", "5 টাকা", "250 টাকা"], answer: "150 টাকা", num: 150, why: "1টি ছবি আঁকার খাতার দাম 150 টাকা। তাই 100 + 150।" }),
      q({ prompt: "5টি পেনসিল ও 1টি ছবি আঁকার খাতা কিনতে কত টাকা লাগবে?", options: ["250 টাকা", "170 টাকা", "100 টাকা", "270 টাকা"], answer: "250 টাকা", num: 250, why: "20 × 5 = 100, তারপর 100 + 150 = 250। মোট 250 টাকা লাগবে।" }),
      q({ prompt: "এই সমস্যার গাণিতিক বাক্য কোনটি?", options: ["20 × 5 + 150", "20 + 5 + 150", "150 × 5 + 20", "(20 + 150) × 5"], answer: "20 × 5 + 150", why: "প্রথমে গুণ (20 × 5 = 100), পরে যোগ (100 + 150 = 250): 20 × 5 + 150।" }),
      // three more on the page's two prices (worked out from them)
      q({ prompt: "5টি পেনসিলের দাম আর 1টি ছবি আঁকার খাতার দাম: কোনটি বেশি?", options: ["1টি খাতার দাম", "5টি পেনসিলের দাম", "দুইটি সমান"], answer: "1টি খাতার দাম", why: "5টি পেনসিল 20 × 5 = 100 টাকা, 1টি খাতা 150 টাকা। 150 > 100, তাই খাতার দাম বেশি।" }),
      q({ prompt: "1টি পেনসিল ও 1টি ছবি আঁকার খাতা কিনতে কত টাকা লাগবে?", options: ["170 টাকা", "250 টাকা", "130 টাকা", "3000 টাকা"], answer: "170 টাকা", num: 170, why: "1টি পেনসিল 20 টাকা, 1টি খাতা 150 টাকা: 20 + 150 = 170 টাকা।" }),
      q({ prompt: "1টি ছবি আঁকার খাতার দাম 1টি পেনসিলের দামের চেয়ে কত টাকা বেশি?", options: ["130 টাকা", "170 টাকা", "150 টাকা", "20 টাকা"], answer: "130 টাকা", num: 130, why: "150 − 20 = 130। খাতার দাম 130 টাকা বেশি।" }),
    ],
    src: "p.84 মূল প্রশ্ন: the boy (“প্রথমে ৫টি পেনসিলের দাম বের করতে হবে”), the girl (“প্রথমে … গুণ … পরে যোগ”), the green steps “১।” (20 × 5 = 100 printed) and “২।” (100 + 150 = 250 printed), as questions; then three on the page's two prices (mine)",
  });
  note("p.84 (multiple choice, 10): the মূল প্রশ্ন is a story item in the p.86 game, so p.84's game walks its printed solution: what to find first (the boy), which sign first and next (the girl), the two green steps' answers (100, 250, both printed) and the গাণিতিক বাক্য 20 × 5 + 150. Questions 8–10 are mine, worked out from the page's two prices (5 pencils 100 টাকা vs the খাতা 150 টাকা; 1 pencil + 1 খাতা 170 টাকা; the খাতা 130 টাকা dearer). The wrong options are mine.");

  // ── p.85: কাজ ১ (× then +, the template and the parrot's “আরো উপায়”), কাজ ২ (× then −) ──
  mcq({
    page: 85, slug: "think-steps", title: "ধাপে ধাপে ভাবি: আম ও তরমুজ",
    questions: [
      // কাজ ১, the template's lines
      q({ prompt: "6টি ঝুড়ির প্রতিটিতে 30টি করে আম আছে। 6টি ঝুড়িতে মোট কতটি আম আছে?", options: ["180টি", "36টি", "24টি", "217টি"], answer: "180টি", num: 180, why: "6টি ঝুড়িতে মোট 30 × 6 = 180টি আম আছে।" }),
      q({ prompt: "অন্য একটি ঝুড়িতে 37টি আম আছে। 7টি ঝুড়িতে মোট কতটি আম আছে?", options: ["217টি", "180টি", "210টি", "247টি"], answer: "217টি", num: 217, why: "7টি ঝুড়িতে মোট 180টি + 37টি = 217টি আম আছে।" }),
      q({ prompt: "6টি ঝুড়ির প্রতিটিতে 30টি করে আম এবং অন্য একটি ঝুড়িতে 37টি আম। 7টি ঝুড়ির মোট আমের গাণিতিক বাক্যটি কোনটি?", options: ["30 × 6 + 37", "30 × 7 + 37", "30 + 6 × 37", "37 × 6 + 30"], answer: "30 × 6 + 37", why: "6টি ঝুড়িতে 30 × 6, তার সাথে আরেকটি ঝুড়ির 37: 30 × 6 + 37 = 180 + 37 = 217।" }),
      q({ prompt: "30 × 6 + 37 এ প্রথমে কোন কাজটি করব?", options: ["গুণ: 30 × 6", "যোগ: 6 + 37"], answer: "গুণ: 30 × 6", why: "প্রথমে 6টি ঝুড়ির আম: 30 × 6 = 180, তারপর যোগ: 180 + 37 = 217।" }),
      q({ prompt: "টিয়া পাখি বলল, “সমাধানের আরো উপায় চিন্তা করি।” নিচের কোনটিতেও 7টি ঝুড়ির মোট আম (217টি) পাওয়া যায়?", options: ["30 × 7 + 7", "30 × 7 + 37", "37 × 7", "30 × 6 + 7"], answer: "30 × 7 + 7", why: "7টি ঝুড়িতে 30টি করে 30 × 7 = 210; শেষ ঝুড়িতে আরো 7টি (37 = 30 + 7): 210 + 7 = 217।" }),
      // কাজ ২
      q({ prompt: "রহিম সাহেব 185 টাকা দরে 4টি তরমুজ কিনে দোকানদারকে 750 টাকা দিলেন। ফেরত টাকা বের করতে প্রথমে কোন কাজটি করতে হবে?", options: ["গুণ", "বিয়োগ", "যোগ", "ভাগ"], answer: "গুণ", why: "ছেলেটি বলল: প্রথমে গুণ করতে হবে (4টি তরমুজের দাম) এবং পরে বিয়োগ করতে হবে (ফেরত টাকা)।" }),
      q({ prompt: "185 টাকা দরে 4টি তরমুজের দাম কত?", options: ["740 টাকা", "189 টাকা", "555 টাকা", "750 টাকা"], answer: "740 টাকা", num: 740, why: "185 × 4 = 740। 4টি তরমুজের দাম 740 টাকা।" }),
      q({ prompt: "তরমুজের দাম 740 টাকা, রহিম সাহেব দিলেন 750 টাকা। ফেরত টাকা বের করতে কোনটি করব?", options: ["750 − 740", "750 + 740", "740 − 185", "750 − 185"], answer: "750 − 740", why: "দেওয়া টাকা থেকে দাম বিয়োগ করি: 750 − 740 = 10।" }),
      q({ prompt: "দোকানদার রহিম সাহেবকে কত টাকা ফেরত দেবেন?", options: ["10 টাকা", "565 টাকা", "740 টাকা", "1490 টাকা"], answer: "10 টাকা", num: 10, why: "185 × 4 = 740, তারপর 750 − 740 = 10। দোকানদার 10 টাকা ফেরত দেবেন।" }),
      q({ prompt: "গাণিতিক বাক্য 750 − 185 × 4 এ কোন হিসাবটি আগে করব?", options: ["185 × 4", "750 − 185"], answer: "185 × 4", why: "আগে গুণ: 185 × 4 = 740, তারপর বিয়োগ: 750 − 740 = 10। আগে 750 − 185 করলে ভুল হয়।" }),
    ],
    src: "p.85 কাজ ১ (the template “৬টি ঝুড়িতে মোট □ × □ টি = □ টি … ৭টি ঝুড়িতে মোট □ টি + □ টি = □ টি … গাণিতিক বাক্যটি হবে □ × □ + □”, the parrot “সমাধানের আরো উপায় চিন্তা করি”), কাজ ২ (the boy “প্রথমে গুণ … পরে বিয়োগ”, the printed sentence ৭৫০ − ১৮৫ × ৪ = □; 740 and 10 printed on p.86)",
  });
  note("p.85 (multiple choice, 10): কাজ ১ and কাজ ২ are story items in the p.86 game (and ৭৫০ − ১৮৫ × ৪ is in the p.88 expression game and the p.89 multiple choice, “গাণিতিক বাক্য কোনটি?”), so p.85's game follows the page's own scaffold: the template's lines (6 ঝুড়িতে 180, 7 ঝুড়িতে 217, the sentence 30 × 6 + 37, × first), the parrot's “আরো উপায়” (mine: 30 × 7 + 7 = 217, each basket 30 and the last one 7 more), and কাজ ২'s steps (× first, 740, 750 − 740, 10, and which part of 750 − 185 × 4 comes first). The book uses × before − here without stating it (it states only the left-to-right rule, p.79); the boy's “প্রথমে গুণ … পরে বিয়োগ” is the why. The wrong options are mine.");

  // ── p.87: কাজ ৪ (÷ then +), কাজ ৫ (+ then ÷), কাজ ৬ (× then ÷) ──
  mcq({
    page: 87, slug: "think-steps", title: "ধাপে ধাপে ভাবি: বই, কলম ও লিচু",
    questions: [
      // কাজ ৪
      q({ prompt: "একটি বইয়ের মূল্য 95 টাকা ও 12টি কলমের মূল্য 180 টাকা। 1টি কলম ও 1টি বই কিনতে রেজার কত টাকা লাগবে? – প্রথমে কী বের করতে হবে?", options: ["1টি কলমের মূল্য", "1টি বইয়ের মূল্য", "12টি বইয়ের মূল্য", "12টি কলম ও 1টি বইয়ের মূল্য"], answer: "1টি কলমের মূল্য", why: "ছেলেটি বলল: 1টি বইয়ের মূল্য দেওয়া আছে। আমাদের 1টি কলমের মূল্য বের করতে হবে।" }),
      q({ prompt: "12টি কলমের মূল্য 180 টাকা। 1টি কলমের মূল্য বের করতে 180 টাকাকে কী করতে হবে?", options: ["12 দিয়ে ভাগ", "12 দিয়ে গুণ", "12 যোগ", "12 বিয়োগ"], answer: "12 দিয়ে ভাগ", why: "প্রথমে 12টি কলমের মূল্য 180 টাকাকে 12 দিয়ে ভাগ করতে হবে: 180 ÷ 12।" }),
      q({ prompt: "180 ÷ 12 = কত? অর্থাৎ 1টি কলমের মূল্য কত?", options: ["15 টাকা", "12 টাকা", "168 টাকা", "192 টাকা"], answer: "15 টাকা", num: 15, why: "180 ÷ 12 = 15, কারণ 12 × 15 = 180। 1টি কলমের মূল্য 15 টাকা।" }),
      q({ prompt: "1টি বই (95 টাকা) ও 1টি কলম (15 টাকা) কিনতে রেজার কত টাকা লাগবে?", options: ["110 টাকা", "275 টাকা", "80 টাকা", "100 টাকা"], answer: "110 টাকা", num: 110, why: "1টি বই ও 1টি কলমের দাম যোগ করি: 95 + 15 = 110 টাকা।" }),
      // কাজ ৫, the template's lines
      q({ prompt: "তোমাকে বাবা দিলেন 250 টাকা, মা দিলেন 150 টাকা। মোট টাকা কত হবে?", options: ["400 টাকা", "100 টাকা", "300 টাকা", "500 টাকা"], answer: "400 টাকা", num: 400, why: "মোট টাকা হবে 250 + 150 = 400 টাকা।" }),
      q({ prompt: "এই 400 টাকা দিয়ে শ্রেণির 5 জন বন্ধুর জন্য খাতা ও কলম কিনবে। প্রত্যেকের জন্য কত টাকা, তা বের করতে কোনটি করবে?", options: ["400 ÷ 5", "400 × 5", "400 − 5", "400 + 5"], answer: "400 ÷ 5", why: "প্রত্যেককে সমান টাকা দিতে মোট টাকাকে বন্ধুর সংখ্যা দিয়ে ভাগ করি: 400 ÷ 5।" }),
      q({ prompt: "প্রত্যেক বন্ধুর জন্য তুমি কত টাকা খরচ করতে পারবে?", options: ["80 টাকা", "50 টাকা", "75 টাকা", "2000 টাকা"], answer: "80 টাকা", num: 80, why: "400 ÷ 5 = 80, কারণ 5 × 80 = 400। প্রত্যেককে দেওয়া যাবে 80 টাকা।" }),
      // কাজ ৬
      q({ prompt: "একটি বাগানের 15টি লিচু গাছের প্রতিটি থেকে 60টি করে লিচু পেড়ে 20 জনের মধ্যে সমানভাবে ভাগ করে নিলে প্রত্যেকে কয়টি করে পাবে? – প্রথমে কোন দুইটি সংখ্যা গুণ করব?", options: ["60 × 15", "60 × 20", "15 × 20", "15 × 15"], answer: "60 × 15", why: "প্রথমে 1টি গাছের লিচু 60 কে 15 দ্বারা গুণ করতে হবে: 60 × 15।" }),
      q({ prompt: "15টি গাছের প্রতিটি থেকে 60টি করে লিচু। মোট কতটি লিচু?", options: ["900টি", "75টি", "600টি", "1200টি"], answer: "900টি", num: 900, why: "60 × 15 = 900। মোট 900টি লিচু।" }),
      q({ prompt: "900টি লিচু 20 জনের মধ্যে সমানভাবে ভাগ করে নিলে প্রত্যেকে কয়টি করে পাবে?", options: ["45টি", "40টি", "50টি", "880টি"], answer: "45টি", num: 45, why: "মোট লিচুকে 20 দ্বারা ভাগ করি: 900 ÷ 20 = 45, কারণ 20 × 45 = 900।" }),
      q({ prompt: "লিচুর সমস্যাটির গাণিতিক বাক্য কোনটি?", options: ["60 × 15 ÷ 20", "60 ÷ 15 × 20", "60 × 20 ÷ 15", "60 + 15 ÷ 20"], answer: "60 × 15 ÷ 20", why: "প্রথমে গুণ, পরে ভাগ: 60 × 15 = 900, তারপর 900 ÷ 20 = 45।" }),
    ],
    src: "p.87 কাজ ৪ (the boy “১টি কলমের মূল্য বের করতে হবে”, “১।” 180 ÷ 12 = 15, “২।” 95 + 15 = 110, printed), কাজ ৫ (the template “মোট টাকা হবে □ + □ … প্রত্যেককে দেওয়া যাবে □ টাকা ÷ □ = □”), কাজ ৬ (the girl “প্রথমে গুণ ও পরে ভাগ”, “১।” 60 × 15 = 900, “২।” 900 ÷ 20 = 45, printed), each step as a question",
  });
  note("p.87 (multiple choice, 11): কাজ ৪–৬ are story items in the p.88 game, and the p.89 multiple choice asks কাজ ৬'s first sign (“গুণ”), so p.87's game walks the page's printed steps instead: কাজ ৪ (what to find first, ÷ 12, 15, 110), কাজ ৫'s template (400, 400 ÷ 5, 80), কাজ ৬ (which two numbers first, 900, 45, the sentence 60 × 15 ÷ 20). The wrong options are mine.");

  // ════════════════════════════ অধ্যায় ১০ · বাংলাদেশি মুদ্রা ════════════════════════════
  // ── p.107: মূল প্রশ্ন (the five পয়সা coins), কাজ ১ (ধাতব মুদ্রার সঙ্গে নোটের মিল) ──
  mcq({
    page: 107, slug: "coins", title: "পয়সা চিনি: ধাতব মুদ্রা ও কাগজের নোট",
    questions: [
      q({ prompt: "পৃষ্ঠার ছবির ধাতব মুদ্রাগুলো কীসের ছবি?", options: ["পয়সার", "কাগজের নোটের", "পদকের", "বোতামের"], answer: "পয়সার", why: "মেয়েটি বলল: আমার মনে হয় এগুলো পয়সার ছবি। আমি শুনেছি পয়সা দিয়ে আগে জিনিসপত্র কেনা যেত।", emoji: "🪙" }),
      q({ prompt: "ছবিতে চারকোনা পয়সাটি কত পয়সার?", options: ["5 পয়সা", "10 পয়সা", "25 পয়সা", "50 পয়সা"], answer: "5 পয়সা", num: 5, why: "চারকোনা (কোণাগুলো গোল করা) পয়সাটি 5 পয়সা।", emoji: "🪙" }),
      q({ prompt: "ছবিতে ঢেউ খেলানো কিনারার পয়সাটি কত পয়সার?", options: ["5 পয়সা", "10 পয়সা", "25 পয়সা", "50 পয়সা"], answer: "10 পয়সা", num: 10, why: "ঢেউ খেলানো (ফুলের মতো) কিনারার পয়সাটি 10 পয়সা।", emoji: "🪙" }),
      q({ prompt: "ছবিতে বাঘের মুখ আঁকা গোল পয়সাটি কত পয়সার?", options: ["5 পয়সা", "10 পয়সা", "25 পয়সা", "50 পয়সা"], answer: "25 পয়সা", num: 25, why: "বাঘের মুখ আঁকা গোল পয়সাটি 25 পয়সা।", emoji: "🪙" }),
      q({ prompt: "ছবির সবচেয়ে বড়ো পয়সাটি কত পয়সার?", options: ["5 পয়সা", "10 পয়সা", "25 পয়সা", "50 পয়সা"], answer: "50 পয়সা", num: 50, why: "সবচেয়ে বড়ো গোল পয়সাটি 50 পয়সা। ছবির পয়সাগুলোর মধ্যে এটির মূল্যও সবচেয়ে বেশি।", emoji: "🪙" }),
      q({ prompt: "নিচের কোন পয়সাটি পৃষ্ঠার ছবিতে নেই?", options: ["20 পয়সা", "5 পয়সা", "10 পয়সা", "25 পয়সা"], answer: "20 পয়সা", num: 20, why: "ছবিতে 5, 10, 25 ও 50 পয়সার মুদ্রা আছে; 20 পয়সার মুদ্রা নেই।" }),
      q({ prompt: "ধাতব মুদ্রার সঙ্গে নোটের মিল: 1 টাকার ধাতব মুদ্রার সঙ্গে কোন কাগজের নোটের মিল?", options: ["1 টাকার নোট", "2 টাকার নোট", "5 টাকার নোট", "10 টাকার নোট"], answer: "1 টাকার নোট", num: 1, why: "ছকে 1 টাকার ধাতব মুদ্রার পাশে 1 টাকার কাগজের নোট। দুইটির মূল্য একই: 1 টাকা।" }),
      q({ prompt: "5 টাকার কাগজের নোটের সঙ্গে কোন ধাতব মুদ্রার মিল?", options: ["5 টাকার মুদ্রা", "1 টাকার মুদ্রা", "2 টাকার মুদ্রা", "50 পয়সার মুদ্রা"], answer: "5 টাকার মুদ্রা", num: 5, why: "ছকে 5 টাকার কাগজের নোটের পাশে 5 টাকার ধাতব মুদ্রা। দুইটির মূল্য একই: 5 টাকা।" }),
      q({ prompt: "2 টাকার ধাতব মুদ্রা ও 2 টাকার কাগজের নোট: কোনটির মূল্য বেশি?", options: ["দুইটির মূল্য সমান", "ধাতব মুদ্রার মূল্য বেশি", "কাগজের নোটের মূল্য বেশি"], answer: "দুইটির মূল্য সমান", why: "দুইটিই 2 টাকা। ধাতব মুদ্রা আর কাগজের নোট দেখতে আলাদা, কিন্তু মূল্য সমান।" }),
      q({ prompt: "ছকে কোন টাকাগুলো ধাতব মুদ্রা ও কাগজের নোট দুই রকমই দেখানো হয়েছে?", options: ["1, 2 ও 5 টাকা", "10, 20 ও 50 টাকা", "100, 500 ও 1000 টাকা", "5, 10 ও 25 পয়সা"], answer: "1, 2 ও 5 টাকা", why: "“ধাতব মুদ্রার সঙ্গে নোটের মিল” ছকে আছে 1 টাকা, 2 টাকা ও 5 টাকা: প্রতিটির ধাতব মুদ্রা ও কাগজের নোট।" }),
    ],
    src: "p.107 মূল প্রশ্ন “নিচের ছবিগুলো কীসের?” (the five coins: 1, 10, 5, 25, 50 পয়সা; the girl “এগুলো পয়সার ছবি”), কাজ ১ “নিচের ছবিতে কী কী পয়সা আছে খুঁজে বের করি” and its table “ধাতব মুদ্রার সঙ্গে নোটের মিল” (1, 2, 5 টাকা: coin and note)",
    pictures: [{ item: "প্রশ্ন ২–৬", subject: "পৃষ্ঠা ১০৭ মূল প্রশ্ন: বইয়ের পাঁচটি পয়সার ছবি (১ পয়সা, ঢেউ খেলানো ১০ পয়সা, চারকোনা ৫ পয়সা, বাঘের মুখ আঁকা ২৫ পয়সা, বড়ো গোল ৫০ পয়সা)" }],
  });
  note("p.107 (multiple choice, 10): the page has no sum to do (ch ১০'s README lists its coin pictures and coin–note table as not playable as printed), so its game asks the page's pictures: which coin is which (the square 5 পয়সা, the scalloped 10, the tiger-faced round 25, the biggest 50, as the book's photos show them and as the Taka Shop draws them) and the table's coin ↔ note pairs (equal values). The questions about the coins' looks need the page's photos in view (the guide asks for them); the coins also carry their values. The smallest coin (1 পয়সা, its face shows ১; the survey marks it “?”) is not asked about. The survey also notes that কাজ ১ asks “কী কী পয়সা আছে” while its table shows 1, 2, 5 টাকা: both are asked. The wrong options are mine.");

  // ════════════════════════════ অধ্যায় ১১ · পরিমাপ ════════════════════════════
  // ── p.119: the boxes “দৈর্ঘ্যের একক” (1 মি = 100 সেমি, 1 সেমি = 10 মিমি; 1 কিমি = 1000 মি) ──
  wio({
    page: 119, slug: "length-units", type: "units_amounts", title: "দৈর্ঘ্যের এককের সম্পর্ক",
    items: [
      it(conv([[1, "m"]], "cm"), 100), // box 1 (printed)
      it(conv([[1, "cm"]], "mm"), 10), // box 1 (printed)
      it(conv([[1, "km"]], "m"), 1000), // the girl's box (printed)
      it(conv([[1000, "m"]], "km"), 1), // box 2, read the other way
      it(conv([[100, "cm"]], "m"), 1),
      it(conv([[10, "mm"]], "cm"), 1),
      it(conv([[1, "m"]], "mm"), 1000), // box 2, two steps down the ladder (100 × 10)
    ],
    fresh: { skill: "convert", unit: "length" },
    src: "p.119 the boxes “দৈর্ঘ্যের একক” (1 মিটার = 100 সেন্টিমিটার, 1 সেন্টিমিটার = 10 মিলিমিটার; the girl's 1 কিলোমিটার = 1000 মিটার; the second box with all three), each also read the other way, and 1 মিটার in মিলিমিটার; + 5 fresh",
  });
  note("p.119 (Units & Amounts, 7 + 5 fresh): the page's own exercise (কাজ ১, estimating and measuring a book, a খাতা … to the millimetre) is real-world measuring; the facts of its boxes are asked in the p.121 multiple choice, and its unit changes with the page's own numbers are p.120–121's. p.119's game changes units with the boxes themselves: 1 মি = 100 সেমি, 1 সেমি = 10 মিমি, 1 কিমি = 1000 মি (printed), then each one back (1000 মি = 1 কিমি, 100 সেমি = 1 মি, 10 মিমি = 1 সেমি) and 1 মি = 1000 মিমি (two steps, 100 × 10, like p.121's 1 কিমি = □ সেমি); then 5 fresh length changes.");
  cant("p.119 কাজ ১ (estimate, then measure a বই, খাতা, জ্যামিতি বক্স, টিফিন বক্স to the millimetre and fill the table): real-world measuring. The page's game practises its দৈর্ঘ্যের একক boxes.");

  // ── p.122: মূল প্রশ্ন (the scales: অ্যানালগ and ডিজিটাল মাপনী), the box “ওজনের একক”, কাজ ১ (1 কেজি বালি) ──
  mcq({
    page: 122, slug: "scales-kg", title: "ওজন মাপার মাপনী ও কিলোগ্রাম",
    questions: [
      q({ prompt: "ছবির দাঁড়িপাল্লাটি কোন ধরনের মাপনী?", options: ["অ্যানালগ মাপনী", "ডিজিটাল মাপনী"], answer: "অ্যানালগ মাপনী", why: "বইয়ের ছবিতে দাঁড়িপাল্লা, দুই পাল্লার টেবিল মাপনী ও কাঁটাওয়ালা লাল মাপনী: এগুলো অ্যানালগ মাপনী।", emoji: "⚖️" }),
      q({ prompt: "কাঁটা ঘুরে ওজন দেখায় এমন লাল গোল মাপনীটি কোন ধরনের?", options: ["অ্যানালগ মাপনী", "ডিজিটাল মাপনী"], answer: "অ্যানালগ মাপনী", why: "এটির কাঁটা ঘুরে সংখ্যার ঘরে থামে, পর্দায় সংখ্যা ওঠে না। তাই এটি অ্যানালগ মাপনী।" }),
      q({ prompt: "যে মাপনীর পর্দায় 0.00 এর মতো সংখ্যা দেখা যায়, সেটি কোন ধরনের?", options: ["ডিজিটাল মাপনী", "অ্যানালগ মাপনী"], answer: "ডিজিটাল মাপনী", why: "পর্দায় সংখ্যা দেখায় এমন সমতল মাপনী ও ঝুলন্ত মাপনী ডিজিটাল মাপনী।" }),
      q({ prompt: "নিচের কোনটি ডিজিটাল মাপনী?", options: ["পর্দায় সংখ্যা দেখানো ঝুলন্ত মাপনী", "দাঁড়িপাল্লা", "দুই পাল্লার টেবিল মাপনী", "কাঁটাওয়ালা লাল মাপনী"], answer: "পর্দায় সংখ্যা দেখানো ঝুলন্ত মাপনী", why: "ডিজিটাল মাপনী পর্দায় সংখ্যা দেখায়। দাঁড়িপাল্লা, টেবিল মাপনী ও কাঁটাওয়ালা মাপনী অ্যানালগ।" }),
      q({ prompt: "নিচের কোনটির ওজন মাপতে কিলোগ্রাম ব্যবহার করা সুবিধাজনক?", options: ["একটি তরমুজ", "একটি পেনসিল", "একটি কলম", "একটি পাতা"], answer: "একটি তরমুজ", why: "ভারী কোনো জিনিস ওজন করতে কিলোগ্রাম ব্যবহার করি। তরমুজ খুব বড়ো ও ভারী।", emoji: "🍉" }),
      q({ prompt: "কিলোগ্রামকে সংক্ষেপে কী লেখা হয়?", options: ["কেজি", "কিমি", "গ্রা", "মিমি"], answer: "কেজি", why: "ওজনের একক: 1 কিলোগ্রাম (কেজি) = 1000 গ্রাম। কিমি হলো কিলোমিটার, দৈর্ঘ্যের একক।" }),
      q({ prompt: "1000 গ্রাম = কত কিলোগ্রাম?", options: ["1 কিলোগ্রাম", "10 কিলোগ্রাম", "100 কিলোগ্রাম", "1000 কিলোগ্রাম"], answer: "1 কিলোগ্রাম", num: 1, why: "1 কিলোগ্রাম 1000 গ্রামের সমতুল্য। তাই 1000 গ্রাম = 1 কিলোগ্রাম।" }),
      q({ prompt: "ছেলেটি একটি ব্যাগে বালি ভরল। মাপনীতে রাখলে কাঁটা 1 এর ঘরে থামল। বালির ওজন কত?", options: ["1 কেজি", "1 গ্রাম", "10 কেজি", "100 গ্রাম"], answer: "1 কেজি", why: "মাপনীর সংখ্যাগুলো কেজি নির্দেশ করে। কাঁটা 1 এর ঘরে, তাই বালির ওজন 1 কেজি।" }),
      q({ prompt: "ব্যাগে 1 কেজি বালি আছে। বালির ওজন কত গ্রাম?", options: ["1000 গ্রাম", "100 গ্রাম", "10 গ্রাম", "1 গ্রাম"], answer: "1000 গ্রাম", num: 1000, why: "1 কেজি = 1000 গ্রাম। তাই 1 কেজি বালির ওজন 1000 গ্রাম।" }),
      q({ prompt: "ব্যাগে 1 কেজির কম বালি থাকলে মাপনীর কাঁটা কোথায় থামবে?", options: ["0 ও 1 এর মাঝে", "1 ও 2 এর মাঝে", "2 এর ঘরে"], answer: "0 ও 1 এর মাঝে", why: "কাঁটা 1 এর ঘরে মানে 1 কেজি। 1 কেজির কম হলে কাঁটা 1 পর্যন্ত পৌঁছায় না, 0 ও 1 এর মাঝে থামে।" }),
    ],
    src: "p.122 মূল প্রশ্ন (তরমুজ; the pictures “অ্যানালগ মাপনী”: দাঁড়িপাল্লা, the two-pan table balance, the red dial scale; “ডিজিটাল মাপনী”: the flat and the hanging “0.00” scales), the text and box “ওজনের একক” (ভারী জিনিস → কিলোগ্রাম; 1 কিলোগ্রাম (কেজি) = 1000 গ্রাম), কাজ ১ (1 কেজি বালি, the needle on 1)",
  });
  note("p.122 (multiple choice, 10): the page's facts asked in the p.130 multiple choice (the তরমুজ needs কিলোগ্রাম; দাঁড়িপাল্লা weighs; 1 কিলোগ্রাম = 1000 গ্রাম) and its কাজ ১ reading (the p.123 Measure It game) are not asked again in their form: p.122's game asks the page's two groups of pictures (অ্যানালগ / ডিজিটাল মাপনী: which is which), which thing is weighed in কিলোগ্রাম, the box read the other way (1000 গ্রাম = 1 কিলোগ্রাম, কেজি), and কাজ ১ (needle on 1 → 1 কেজি = 1000 গ্রাম; less than 1 কেজি → between 0 and 1, mine). The wrong options are mine (পেনসিল, কলম, পাতা as light things).");
  cant("p.122 মূল প্রশ্ন (how to weigh a watermelon) and কাজ ১ (filling a bag with 1 কেজি of sand to feel it): hands-on; the page's game asks about its pictured scales and its box.");

  // ── p.126: the box “সময়ের এককের মধ্যে সম্পর্ক” (60 সেকেন্ড = 1 মিনিট, 60 মিনিট = 1 ঘণ্টা) ──
  wio({
    page: 126, slug: "time-units", type: "units_amounts", title: "ঘণ্টা, মিনিট ও সেকেন্ডের সম্পর্ক",
    items: [
      it(conv([[1, "min"]], "s"), 60), // printed: 60 সেকেন্ড = 1 মিনিট
      it(conv([[60, "s"]], "min"), 1),
      it(conv([[1, "h"]], "min"), 60), // printed: 60 মিনিট = 1 ঘণ্টা (and কাজ ১ “1 ঘণ্টা = 60 মিনিট”)
      it(conv([[60, "min"]], "h"), 1),
      it(conv([[1, "h"]], "s"), 3600), // both lines of the box: 60 × 60
    ],
    fresh: { skill: "convert", unit: "time" },
    src: "p.126 মূল প্রশ্ন “ঘণ্টা, মিনিট ও সেকেন্ডের মধ্যে সম্পর্ক কী?” and the box “সময়ের এককের মধ্যে সম্পর্ক” (60 সেকেন্ড = 1 মিনিট, 60 মিনিট = 1 ঘণ্টা; কাজ ১ “1 ঘণ্টা = 60 মিনিট”), each both ways, and 1 ঘণ্টা in সেকেন্ড; + 5 fresh",
  });
  note("p.126 (Units & Amounts, 5 + 5 fresh): the page's clock reading (কাজ ১, 2:33) is in the p.128 clock game and its facts (60 সেকেন্ড = 1 মিনিট, 5টি ঘর, the digital clock's digits, সময় একক, 60 দাগ, 2:33) are in the p.128 and p.131 multiple choices, so p.126's game answers its মূল প্রশ্ন with the box: 1 মিনিট = 60 সেকেন্ড, 60 সেকেন্ড = 1 মিনিট, 1 ঘণ্টা = 60 মিনিট, 60 মিনিট = 1 ঘণ্টা (printed), and 1 ঘণ্টা = 3600 সেকেন্ড (both lines: 60 × 60, mine); then 5 fresh time changes (ঘণ্টা মিনিট, মিনিট সেকেন্ড). The survey notes the book has no ঘণ্টা ↔ মিনিট change item of its own.");
  cant("p.126 মূল প্রশ্ন: the three hands (সবচেয়ে ছোটো ঘণ্টা, মাঝারি মিনিট, সবচেয়ে বড় সেকেন্ড) and the “03:35” watch are pictures to talk about; the hands' lengths are asked in the p.128 multiple choice.");

  // ════════════════════════════ অধ্যায় ৯ · ভগ্নাংশ (p.92) ════════════════════════════
  // rest/lib.js's add() refuses pages 91–106 (it was written for the rest file, chapters ১–৮ and ১০–১৩). So p.92's
  // questions are made with q() and mcq() on p.107 (after p.107's own game, so p.107's QR letter isn't touched), and the
  // activity is then moved to p.92: its page, chapter, key, QR label and code worked out the way lib.js works them out.
  const HALF = "half";
  mcq({
    page: 107, slug: HALF, title: "অর্ধেক বা দুই ভাগের এক ভাগ",
    questions: [
      q({ prompt: "একটি কাগজের ফিতাকে সমান 2 ভাগে ভাগ করলাম। প্রত্যেক ভাগকে কী বলি?", options: ["অর্ধেক", "এক চতুর্থাংশ", "এক তৃতীয়াংশ", "পূর্ণ"], answer: "অর্ধেক", why: "যখন আমরা একটি বস্তুকে সমান 2 অংশে ভাগ করি, তখন প্রত্যেক অংশকে অর্ধেক বা দুই ভাগের এক ভাগ বলি এবং লিখি 1/2।" }),
      q({ prompt: "অর্ধেক বা দুই ভাগের এক ভাগ কীভাবে লিখি?", options: ["1/2", "2/1", "1/4", "2/2"], answer: "1/2", why: "সমান 2 ভাগের 1 ভাগ: নিচে 2, উপরে 1। লিখি 1/2।" }),
      q({ prompt: "1/2 কে কথায় আর কী বলা যায়?", options: ["দুই ভাগের এক ভাগ", "এক ভাগের দুই ভাগ", "দুই ভাগের দুই ভাগ", "চার ভাগের এক ভাগ"], answer: "দুই ভাগের এক ভাগ", why: "1/2 মানে সমান দুই ভাগের এক ভাগ, অর্থাৎ অর্ধেক।" }),
      q({ prompt: "একটি ফিতা কেটে একটি ছোটো ও একটি বড়ো টুকরা করা হলো। বড়ো টুকরাটি কি ফিতার 1/2?", options: ["না, কারণ টুকরা দুইটি সমান নয়", "হ্যাঁ, কারণ ফিতাটি 2 টুকরা হয়েছে", "হ্যাঁ, কারণ বড়ো টুকরাটি বেশি"], answer: "না, কারণ টুকরা দুইটি সমান নয়", why: "1/2 হলো সমান 2 অংশের এক অংশ। টুকরা দুইটি সমান না হলে কোনোটিই 1/2 নয়।" }),
      q({ prompt: "অনুশীলন 1 এর ছবিতে 1 ভাগ লম্বা টুকরাটি 2 ভাগ লম্বা টুকরার কত অংশ?", options: ["1/2", "1/3", "1/4"], answer: "1/2", why: "2 ভাগ লম্বা টুকরাকে সমান 2 ভাগ করলে প্রতি ভাগ 1 ভাগ লম্বা। তাই 1 ভাগ লম্বা টুকরাটি তার 1/2।" }),
      q({ prompt: "একটি বর্গের মাঝ বরাবর দাগ টেনে সমান 2 ভাগ করা হলো। বর্গের 1/2 অংশ রং করতে কয়টি ভাগ রং করব?", options: ["1টি ভাগ", "2টি ভাগ", "কোনো ভাগই না"], answer: "1টি ভাগ", why: "বর্গটি সমান 2 ভাগে ভাগ করা। 2 ভাগের 1 ভাগ রং করলে 1/2 অংশ রং হয়।" }),
      q({ prompt: "একটি বৃত্তের ঠিক মাঝ দিয়ে এক পাশ থেকে অন্য পাশে দাগ টানলে বৃত্তটি কয় ভাগ হয়?", options: ["সমান 2 ভাগ", "সমান 4 ভাগ", "অসমান 2 ভাগ"], answer: "সমান 2 ভাগ", why: "বৃত্তের ঠিক মাঝ দিয়ে দাগ টানলে সমান 2 ভাগ হয়; প্রতিটি ভাগ বৃত্তের 1/2।" }),
      q({ prompt: "একটি আয়তের এক কোণা থেকে বিপরীত কোণা পর্যন্ত দাগ টানলে সমান 2টি ত্রিভুজ হয়। প্রতিটি ত্রিভুজ আয়তের কত অংশ?", options: ["1/2", "1/4", "1/3", "2/2"], answer: "1/2", why: "দাগটি আয়তটিকে সমান 2 ভাগ করে। প্রতিটি ত্রিভুজ 2 ভাগের 1 ভাগ, অর্থাৎ 1/2।" }),
      q({ prompt: "অনুশীলন 2 এর শেষ আকৃতিতে (ঘরের মতো পাঁচ বাহুর আকৃতি) কোনো দাগ টানা নেই। এর 1/2 অংশ রং করতে কীভাবে দাগ টানব?", options: ["এমনভাবে, যেন দুই ভাগ সমান হয়", "যেকোনো জায়গায়, দুই ভাগ হলেই হলো", "একটি কোণার কাছে ছোটো করে"], answer: "এমনভাবে, যেন দুই ভাগ সমান হয়", why: "1/2 মানে সমান 2 ভাগের 1 ভাগ। তাই দাগটি এমনভাবে টানি যেন দুই ভাগ সমান হয়, তারপর এক ভাগ রং করি।" }),
      q({ prompt: "একটি পূর্ণ বৃত্তে কয়টি 1/2 অংশ থাকে?", options: ["2টি", "1টি", "3টি", "4টি"], answer: "2টি", num: 2, why: "বৃত্তকে সমান 2 ভাগ করলে 2টি 1/2 হয়। দুইটি 1/2 একত্রে রাখলে পূর্ণ বৃত্ত তৈরি হয়।" }),
    ],
    src: "p.92 কাজ ২ (a paper strip folded into 2 equal parts), the boxes (“অর্ধেক বা দুই ভাগের এক ভাগ … লিখি 1/2”), অনুশীলন ১ (the strips 4, 3, 2, 1 parts long), অনুশীলন ২ (the square, the circle, the rectangle's diagonal, the house shape with no line), অনুশীলন ৩ (two halves make one), asked another way than p.94's questions",
  });
  moveTo(92, HALF);
  note("p.92 (multiple choice, 10): its exercises are already in the fraction file (কাজ ২ the strip: a cut round on p.91; অনুশীলন ২ the five shapes: shading rounds on p.93; অনুশীলন ১ and ৩: the p.94 multiple choice; ১/২ ↔ অর্ধেক: the p.95 match), so p.92's game asks the page's idea another way: what the part is called and how it is written (অর্ধেক, দুই ভাগের এক ভাগ, ১/২: the box), that the two parts must be equal (an unequal cut, mine), অনুশীলন ১'s picture the other way round (the 1-part strip is ১/২ of the 2-part strip), অনুশীলন ২'s shapes in words (the square's halves, the circle cut through its middle, the rectangle's diagonal, the house shape: draw the line so the parts are equal), and অনুশীলন ৩ the other way round (a whole has two halves). Fractions are written ১/২ as in the fraction file; the wrong options are mine.");

  // ── the move to p.92 (lib.js's add(), keyOf(), the QR label and codeFor(), for a page add() refuses) ──
  function moveTo(page, slug) {
    const a = L.activities[L.activities.length - 1];
    if (!a || a.key !== L.keyOf(107, slug)) throw new Error(`p079-126: moveTo(${page}, ${slug}): the last activity is ${a && a.key}`);
    const key = L.keyOf(page, slug);
    if (L.activities.some((x) => x.key === key)) throw new Error(`p079-126: ${key} twice`);
    a.page = page;
    a.chapter = L.chapterOf(page);
    a.key = key;
    a.qr = `M3-p${page}-${"abcdefghijklmnop"[L.activities.filter((x) => x.page === page).length - 1]}`;
    a.code = freeCode(key, a);
  }
  // lib.js's codeFor(): LS + 6 from a hash of the key, never a code of the fraction, Class 2 or rest file, nor one built
  function freeCode(key, self) {
    const ABC = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    const earlier = ["ACTIVITIES-bn.json", "ACTIVITIES-bn-rest.json"].flatMap((f) => {
      const p = path.join(__dirname, "..", f);
      return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")).activities.map((x) => x.code) : [];
    });
    const taken = new Set([...L.OTHER_CODES, ...earlier, ...L.activities.filter((x) => x !== self).map((x) => x.code)]);
    for (let salt = 0; ; salt++) {
      const h = crypto.createHash("sha256").update(`ebidyaloy-class3-math:${key}:${salt}`).digest();
      let c = "LS";
      for (let i = 0; i < 6; i++) c += ABC[h[i] % ABC.length];
      if (!taken.has(c)) return c;
    }
  }
};
