// Pages ১৫৭–১৬৮ (অধ্যায় ১০ · জ্যামিতি, its second half), written by Claude (helper for pp. 143–174), 24 Nov 2026.
// The book: ../class4-math-redesign/content/p157-168.js (+ .parts.js: every triangle drawn from its sides or its angles).
// p.157: ত্রিভুজ (what is alike in the drawn triangles; six to sort by their sides); p.158: বাহুভেদে ত্রিভুজ (the tables, কাজ ১:
// the angles of each kind); pp.159–160: কোণভেদে ত্রিভুজ (the tables, the sorting tables), কাজ ২ the ৭–৫–৪ triangle; p.161: drawing
// it with a cardboard strip; p.162: অনুশীলন ১, কাজ ৩ an equilateral triangle with a protractor, অনুশীলন ২ (৪০°, ৮০°), ৩;
// pp.163–164: আয়ত ও বর্গ (squared paper, definitions, drawing a ৫ × ৩ rectangle); p.165: দেখি পারি কি না; pp.166–167: জ্যামিতিক
// প্যাটার্ন (pictures, shape rows, match sticks, dot paper); p.168: নিজে করি.
// The book prints no lengths on the drawn triangles of pp.157–160 and 165 (the child measures them with a ruler): each is given
// here in whole সেমি in the proportions of our drawing (measured), so the game draws the same shape and labels its sides.
"use strict";
module.exports = (L) => {
  const { it, wio, mcq, q, sort, note, cant } = L;
  const G = "angles_dots";
  // a triangle named by its sides (whole সেমি: [BC, CA, AB], AB the base) or by its angles (adding to 180)
  const bySides = (sides) => {
    const [a, b, c] = sides;
    return it({ kind: "triangle", ask: "sides", sides }, a === b && b === c ? "equilateral" : a === b || b === c || a === c ? "isosceles" : "scalene");
  };
  const byAngles = (angles) => {
    if (angles[0] + angles[1] + angles[2] !== 180) throw new Error(`angles ${angles}`);
    return it({ kind: "triangle", ask: "angles", angles }, angles.includes(90) ? "right" : angles.some((v) => v > 90) ? "obtuse" : "acute");
  };
  const draw = (deg, from = "right") => it({ kind: "angle", ask: "draw", deg, from }, deg);
  const name = (deg, rot = 0) => it({ kind: "angle", deg, rot, ask: "name" }, deg < 90 ? "acute" : deg === 90 ? "right" : deg < 180 ? "obtuse" : "straight");
  const lines = (a, b, cross = true) => { const d = Math.abs(a - b); return it({ kind: "lines", a, b, ...(cross ? {} : { cross: false }) }, d === 90 ? "perp" : d === 0 ? "par" : "neither"); };
  // squares on squared paper: a w × h rectangle from (x0, y0); its area and perimeter
  const cells = (w, h, x0 = 1, y0 = 1) => { const c = []; for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) c.push([x, y]); return c; };
  const both = (w, h) => it({ kind: "area", ask: "both", cells: cells(w, h) }, [w * h, 2 * (w + h)]);
  // a w × h rectangle to shade (its perimeter fixes the sides), the question in words
  const shade = (w, h, text, pw = 10, ph = 6) => it({ kind: "area", ask: "make", squares: w * h, rect: true, perimeter: 2 * (w + h), w: pw, h: ph, unit: "সেমি", text }, "made");
  // a repeating row of shapes with one gap: our answer is the shape a whole unit before or after the gap
  const period = (seq) => { for (let p = 2; p <= 4; p++) if (seq.every((t, k) => t == null || seq.every((u, j) => u == null || j % p !== k % p || u === t))) return p; throw new Error(`no period: ${seq}`); };
  const shapes = (seq) => { const i = seq.indexOf(null), p = period(seq); return it({ kind: "shapes", seq }, seq.find((t, k) => t && k % p === i % p)); };
  const pat = (terms, want) => it({ kind: "pattern", terms }, want);
  const story = (text, sum, unit, want) => it({ kind: "word", text, sum, unit }, want);

  // ════════════════════ p.157: ত্রিভুজ ════════════════════
  mcq({
    page: 157, slug: "what-is-a-triangle", title: "ত্রিভুজ চিনি: মিল ও অমিল খুঁজি",
    questions: [
      q({ prompt: "তিনটি রেখা দ্বারা আবদ্ধ আকৃতিকে কী বলে?", options: ["ত্রিভুজ", "চতুর্ভুজ", "বৃত্ত", "কোণ"], answer: "ত্রিভুজ", why: "একটি আকৃতি যা তিনটি রেখা দ্বারা আবদ্ধ, তাকে ত্রিভুজ বলে।" }),
      q({ prompt: "একটি ত্রিভুজের কয়টি বাহু থাকে?", options: ["2টি", "3টি", "4টি"], answer: "3টি", why: "প্রতিটি ত্রিভুজে ৩টি করে বাহু রয়েছে।" }),
      q({ prompt: "একটি ত্রিভুজের কয়টি কোণ থাকে?", options: ["2টি", "3টি", "4টি"], answer: "3টি", why: "প্রতিটি ত্রিভুজে তিনটি করে কোণ রয়েছে।" }),
      q({ prompt: "ক, খ ও গ চিত্র তিনটির মধ্যে মিল কী?", options: ["প্রতিটিতে 3টি বাহু ও 3টি কোণ", "প্রতিটির তিনটি বাহু সমান", "প্রতিটির একটি কোণ সমকোণ"], answer: "প্রতিটিতে 3টি বাহু ও 3টি কোণ", why: "চিত্র তিনটি ত্রিভুজাকৃতির: প্রতিটিতে ৩টি করে বাহু এবং তিনটি করে কোণ রয়েছে।" }),
      q({ prompt: "চিত্রের ত্রিভুজগুলোর মধ্যে অমিল কোথায়?", options: ["বাহুগুলোর দৈর্ঘ্য ও কোণগুলোর আকারে", "বাহুর সংখ্যায়", "কোণের সংখ্যায়"], answer: "বাহুগুলোর দৈর্ঘ্য ও কোণগুলোর আকারে", why: "সবগুলোরই ৩টি বাহু ও ৩টি কোণ; কিন্তু বাহুগুলোর দৈর্ঘ্য ও কোণগুলোর আকার ভিন্ন।" }),
      q({ prompt: "ত্রিভুজের বাহুগুলোর দৈর্ঘ্য কী দিয়ে পরিমাপ করি?", options: ["স্কেল", "চাঁদা", "ঘড়ি", "দাঁড়িপাল্লা"], answer: "স্কেল", why: "স্কেলের সাহায্যে ত্রিভুজের বাহুগুলোর দৈর্ঘ্য পরিমাপ করি।" }),
      q({ prompt: "ত্রিভুজের কোণগুলো কী দিয়ে পরিমাপ করি?", options: ["চাঁদা", "স্কেল", "ঘড়ি", "দাঁড়িপাল্লা"], answer: "চাঁদা", why: "চাঁদা ব্যবহার করে ত্রিভুজগুলোর কোণ পরিমাপ করি।" }),
      q({ prompt: "‘ত্রিভুজ’ শব্দের ‘ভুজ’ মানে কী?", options: ["বাহু", "কোণ", "বিন্দু"], answer: "বাহু", why: "ভুজ মানে বাহু: তিনটি বাহু (ভুজ) দ্বারা গঠিত আকৃতি ত্রিভুজ।" }),
      q({ prompt: "নিচের কোনটি ত্রিভুজ নয়?", options: ["চারটি রেখা দ্বারা আবদ্ধ আকৃতি", "তিনটি সমান বাহুর আকৃতি", "তিনটি অসমান বাহুর আকৃতি"], answer: "চারটি রেখা দ্বারা আবদ্ধ আকৃতি", why: "ত্রিভুজ তিনটি রেখা দ্বারা আবদ্ধ; চারটি রেখা দ্বারা আবদ্ধ আকৃতি চতুর্ভুজ।" }),
      q({ prompt: "ত্রিভুজের দুইটি বাহু যে বিন্দুতে মিলিত হয় তাকে কী বলে?", options: ["শীর্ষবিন্দু", "কেন্দ্রবিন্দু", "মধ্যবিন্দু"], answer: "শীর্ষবিন্দু", why: "দুইটি বাহু যে বিন্দুতে মিলে কোণ তৈরি করে, সেটি শীর্ষবিন্দু; ত্রিভুজের ৩টি শীর্ষবিন্দু।" }),
    ],
    src: "p.157 মূল প্রশ্ন (মিল ও অমিল of ক, খ, গ), the boy (৩টি বাহু, তিনটি কোণ), the parrot (তিনটি রেখা দ্বারা আবদ্ধ: ত্রিভুজ), the girl (স্কেল), p.158 (বাহু (ভুজ), চাঁদা), p.146's শীর্ষবিন্দু",
  });

  // ════════════════════ p.158: বাহুভেদে ত্রিভুজ ════════════════════
  wio({
    page: 158, slug: "by-sides", type: G, title: "বাহুর দৈর্ঘ্য দেখে ত্রিভুজের নাম বলি",
    items: [
      // p.157's six (ক–চ)
      bySides([7, 6, 7]), bySides([5, 5, 7]), bySides([6, 6, 9]), bySides([3, 7, 8]), bySides([8, 8, 15]), bySides([8, 11, 8]),
      // p.158's table
      bySides([4, 4, 4]), bySides([5, 5, 5]), bySides([6, 8, 6]), bySides([5, 5, 4]), bySides([6, 3, 7]), bySides([4, 5, 3]),
      // p.158 কাজ ১'s table
      bySides([6, 6, 6]), bySides([7, 7, 7]), bySides([6, 6, 5]), bySides([7, 7, 11]), bySides([9, 5, 6]), bySides([5, 6, 4]),
    ],
    src: "p.157 (চলো, ত্রিভুজগুলো বাহুর দৈর্ঘ্য অনুসারে বাছাই করি: ক–চ), p.158 the table (দুইটি করে সমবাহু, সমদ্বিবাহু, বিষমবাহু ত্রিভুজ) and কাজ ১'s table (two of each); every triangle's sides in whole সেমি in our drawing's proportions (measured), labelled in the game",
  });
  note("pp.157–160, 165 (the drawn triangles): the book prints no lengths (the child measures with a ruler); the games give each triangle whole সেমি in the proportions of our drawing (e.g. p.157 ঘ ৩, ৭, ৮ সেমি; ঙ ৮, ৮, ১৫ সেমি) and its angles to the nearest degree, so every one keeps its kind.");

  mcq({
    page: 158, slug: "sides-and-angles", title: "সমবাহু, সমদ্বিবাহু ও বিষমবাহু ত্রিভুজের বৈশিষ্ট্য",
    questions: [
      q({ prompt: "সমবাহু ত্রিভুজের তিনটি বাহুই সমান এবং তিনটি কোণই ___।", options: ["সমান", "অসমান", "সমকোণ"], answer: "সমান", why: "চাঁদা দিয়ে মাপলে দেখি, সমবাহু ত্রিভুজের তিনটি কোণই সমান।" }),
      q({ prompt: "সমদ্বিবাহু ত্রিভুজের দুইটি ___ কোণ রয়েছে।", options: ["সমান", "সমকোণী", "স্থূল"], answer: "সমান", why: "সমদ্বিবাহু ত্রিভুজের দুইটি বাহু সমান, আর দুইটি কোণও সমান।" }),
      q({ prompt: "বিষমবাহু ত্রিভুজের ___ কোণই অসমান।", options: ["তিনটি", "দুইটি", "একটি"], answer: "তিনটি", why: "বিষমবাহু ত্রিভুজের তিনটি বাহুই অসমান, আর তিনটি কোণই অসমান।" }),
      q({ prompt: "যে ত্রিভুজ তিনটি সমান বাহু দ্বারা গঠিত তাকে কী বলে?", options: ["সমবাহু ত্রিভুজ", "সমদ্বিবাহু ত্রিভুজ", "বিষমবাহু ত্রিভুজ"], answer: "সমবাহু ত্রিভুজ", why: "তিনটি সমান বাহু (ভুজ) দ্বারা গঠিত ত্রিভুজ সমবাহু ত্রিভুজ।" }),
      q({ prompt: "যে ত্রিভুজ দুইটি সমান বাহু দ্বারা গঠিত তাকে কী বলে?", options: ["সমদ্বিবাহু ত্রিভুজ", "সমবাহু ত্রিভুজ", "বিষমবাহু ত্রিভুজ"], answer: "সমদ্বিবাহু ত্রিভুজ", why: "দুইটি সমান বাহু (ভুজ) দ্বারা গঠিত ত্রিভুজ সমদ্বিবাহু ত্রিভুজ।" }),
      q({ prompt: "যে ত্রিভুজ তিনটি অসমান বাহু দ্বারা গঠিত তাকে কী বলে?", options: ["বিষমবাহু ত্রিভুজ", "সমবাহু ত্রিভুজ", "সমদ্বিবাহু ত্রিভুজ"], answer: "বিষমবাহু ত্রিভুজ", why: "তিনটি অসমান বাহু (ভুজ) দ্বারা গঠিত ত্রিভুজ বিষমবাহু ত্রিভুজ।" }),
      q({ prompt: "সমবাহু ত্রিভুজের প্রতিটি কোণ কত ডিগ্রি?", options: ["60°", "90°", "45°", "30°"], answer: "60°", why: "সমবাহু ত্রিভুজের ৩টি ৬০° কোণ রয়েছে।" }),
      q({ prompt: "একটি ত্রিভুজের দুইটি কোণ 70° ও 70°। বাহুভেদে এটি কোন ত্রিভুজ?", options: ["সমদ্বিবাহু ত্রিভুজ", "বিষমবাহু ত্রিভুজ", "সমবাহু ত্রিভুজ"], answer: "সমদ্বিবাহু ত্রিভুজ", why: "দুইটি কোণ সমান হলে দুইটি বাহুও সমান: এটি সমদ্বিবাহু (তৃতীয় কোণ ৪০°, তাই সমবাহু নয়)।" }),
      q({ prompt: "ত্রিভুজের বাহুর উপরে আঁকা ছোটো লাল দাগগুলো কী বোঝায়?", options: ["দাগ দেওয়া বাহুগুলো সমান", "বাহুগুলো সমান্তরাল", "কোণটি সমকোণ"], answer: "দাগ দেওয়া বাহুগুলো সমান", why: "একই রকম দাগ দেওয়া বাহুগুলোর দৈর্ঘ্য সমান: সমবাহুর তিনটিতে, সমদ্বিবাহুর দুইটিতে দাগ।" }),
      q({ prompt: "একটি ত্রিভুজের বাহু 4 সেমি, 6 সেমি ও 7 সেমি। এর কোণগুলো কেমন?", options: ["তিনটিই অসমান", "তিনটিই সমান", "দুইটি সমান"], answer: "তিনটিই অসমান", why: "তিনটি বাহুই অসমান, তাই এটি বিষমবাহু: তিনটি কোণই অসমান।" }),
    ],
    src: "p.158 the table (দুইটি ত্রিভুজই তিনটি সমান / দুইটি সমান / তিনটি অসমান বাহু (ভুজ) দ্বারা গঠিত), কাজ ১ (ফাঁকা ঘর পূরণ করি: the three blanks), the tick marks; p.162 the girl (সমবাহু ত্রিভুজের ৩টি ৬০° কোণ); two of ours (৭০°, ৭০°; ৪, ৬, ৭ সেমি)",
  });

  // ════════════════════ p.159–160: কোণভেদে ত্রিভুজ ════════════════════
  wio({
    page: 159, slug: "by-angles", type: G, title: "কোণ দেখে ত্রিভুজের নাম বলি",
    items: [
      byAngles([42, 69, 69]), byAngles([33, 90, 57]), byAngles([30, 105, 45]), // the first table
      byAngles([60, 60, 60]), byAngles([73, 73, 34]), byAngles([54, 40, 86]), // the sorting table: সূক্ষ্মকোণী
      byAngles([32, 116, 32]), byAngles([38, 122, 20]), // স্থূলকোণী
      byAngles([62, 90, 28]), byAngles([90, 45, 45]), // সমকোণী
    ],
    fresh: { skill: "triangle", count: 5 },
    src: "p.159 the table (সূক্ষ্মকোণী: ক, খ, গ < ৯০°; সমকোণী: ঘ = ৯০°; স্থূলকোণী: ঙ > ৯০°) and the sorting table (সূক্ষ্মকোণী সমবাহু, সমদ্বিবাহু, বিষমবাহু; স্থূলকোণী সমদ্বিবাহু, বিষমবাহু; সমকোণী বিষমবাহু, সমদ্বিবাহু), each drawing's angles to the nearest degree; 5 fresh rounds",
  });
  note("p.159 (our redesign): the সূক্ষ্মকোণী row's বিষমবাহু triangle was drawn with sides ৩৭, ২৬, ২১ mm (a ১০৩° angle, not acute; the NCTB page's is acute). Fixed in ../class4-math-redesign/content/p157-168.js on 24 Nov (৩৪, ২৮, ২২); the game's acute scalene triangle is its own (৫৪°, ৪০°, ৮৬°).");

  wio({
    page: 160, slug: "sides-then-angles", type: G, title: "বাহুভেদে ও কোণভেদে ত্রিভুজের নাম বলি",
    items: [
      bySides([5, 5, 5]), byAngles([60, 60, 60]), // সমবাহু: সূক্ষ্মকোণী
      bySides([6, 10, 6]), byAngles([32, 32, 116]), // সমদ্বিবাহু: স্থূলকোণী
      bySides([5, 3, 5]), byAngles([73, 34, 73]), // সমদ্বিবাহু: সূক্ষ্মকোণী
      bySides([3, 6, 4]), byAngles([26, 36, 118]), // বিষমবাহু: স্থূলকোণী
      bySides([6, 4, 5]), byAngles([40, 86, 54]), // বিষমবাহু: সূক্ষ্মকোণী
      bySides([4, 5, 7]), // কাজ ২: ৭ সেমি, ৫ সেমি ও ৪ সেমি
    ],
    fresh: { skill: "triangle", count: 5 },
    src: "p.160 the table (বাহুভেদে সাজাই: সমবাহু সূক্ষ্মকোণী; সমদ্বিবাহু স্থূলকোণী, সূক্ষ্মকোণী; বিষমবাহু স্থূলকোণী, সূক্ষ্মকোণী: each triangle named by its sides, then by its angles) and কাজ ২ (৭ সেমি, ৫ সেমি ও ৪ সেমি বাহুবিশিষ্ট ত্রিভুজ); 5 fresh rounds",
  });

  // ════════════════════ p.161: কার্ডবোর্ড দিয়ে ত্রিভুজ আঁকি ════════════════════
  mcq({
    page: 161, slug: "cardboard-triangle", title: "কার্ডবোর্ডের টুকরো দিয়ে ত্রিভুজ আঁকার ধাপ",
    questions: [
      q({ prompt: "৭ সেমি, ৫ সেমি ও ৪ সেমি বাহুবিশিষ্ট ত্রিভুজ আঁকতে প্রথমে কোন বাহু আঁকি?", options: ["7 সেমি বাহু (ভূমি)", "5 সেমি বাহু", "4 সেমি বাহু"], answer: "7 সেমি বাহু (ভূমি)", why: "(১) বাহু আঁকি: ত্রিভুজের ভূমি ৭ সেমি।" }),
      q({ prompt: "ভূমির বাম প্রান্ত থেকে কত দৈর্ঘ্যের রেখা আঁকি?", options: ["5 সেমি", "4 সেমি", "7 সেমি"], answer: "5 সেমি", why: "(২) ভূমির বাম প্রান্ত থেকে ৫ সেমি দৈর্ঘ্য আঁকি।" }),
      q({ prompt: "ভূমির ডান প্রান্ত থেকে কত দৈর্ঘ্যের রেখা আঁকি?", options: ["4 সেমি", "5 সেমি", "7 সেমি"], answer: "4 সেমি", why: "(৩) ভূমির ডান প্রান্ত থেকে ৪ সেমি দৈর্ঘ্য আঁকি।" }),
      q({ prompt: "এক প্রান্ত থেকে 5 সেমি দৈর্ঘ্যের অনেকগুলো রেখা আঁকলে এদের শেষ বিন্দুগুলো কী তৈরি করে?", options: ["একটি বৃত্তের অংশ", "একটি সরলরেখা", "একটি বর্গ"], answer: "একটি বৃত্তের অংশ", why: "সবগুলো শেষ বিন্দু প্রান্ত থেকে ৫ সেমি দূরে: এরা একটি বৃত্তের অংশের উপর থাকে।" }),
      q({ prompt: "বৃত্তের অংশ আঁকতে বোর্ড পিন ও সুতার বদলে কী ব্যবহার করতে পারি?", options: ["ছোটো ছোটো ছিদ্রযুক্ত আয়তাকার কার্ডবোর্ডের টুকরো", "চাঁদা", "ত্রিকোণী সেট"], answer: "ছোটো ছোটো ছিদ্রযুক্ত আয়তাকার কার্ডবোর্ডের টুকরো", why: "বোর্ড পিন ও সুতা ব্যবহার না করে ছিদ্রযুক্ত আয়তাকার কার্ডবোর্ডের টুকরো ব্যবহার করতে পারি।" }),
      q({ prompt: "কার্ডবোর্ড দিয়ে 5 সেমি দূরে দাগ দিতে পেনসিল কোন ছিদ্রে রাখি?", options: ["৫ লেখা ছিদ্রে", "৪ লেখা ছিদ্রে", "৭ লেখা ছিদ্রে"], answer: "৫ লেখা ছিদ্রে", why: "কার্ডবোর্ডের ছিদ্রগুলো ১ সেমি পরপর: ৫ লেখা ছিদ্রটি প্রান্ত থেকে ৫ সেমি দূরে।" }),
      q({ prompt: "৫ সেমি ও ৪ সেমি দৈর্ঘ্যের দাগ দুইটি যে বিন্দুতে মিলিত হয় সেটি কী?", options: ["ত্রিভুজের তৃতীয় শীর্ষবিন্দু", "ভূমির মধ্যবিন্দু", "বৃত্তের কেন্দ্র"], answer: "ত্রিভুজের তৃতীয় শীর্ষবিন্দু", why: "বিন্দুটি বাম প্রান্ত থেকে ৫ সেমি ও ডান প্রান্ত থেকে ৪ সেমি দূরে: এটিই তৃতীয় শীর্ষবিন্দু।" }),
      q({ prompt: "প্রাপ্ত বিন্দুটি পাওয়ার পরে কী করি?", options: ["ভূমির দুই প্রান্তের সঙ্গে যোগ করে বাকি দুই বাহু আঁকি", "আরেকটি ভূমি আঁকি", "চাঁদা দিয়ে কোণ মাপি"], answer: "ভূমির দুই প্রান্তের সঙ্গে যোগ করে বাকি দুই বাহু আঁকি", why: "(৪) প্রাপ্ত বিন্দুটি ব্যবহার করে ত্রিভুজের বাকি দুই বাহু আঁকি।" }),
      q({ prompt: "৭ সেমি, ৫ সেমি ও ৪ সেমি বাহুর ত্রিভুজটি বাহুভেদে কোন ত্রিভুজ?", options: ["বিষমবাহু ত্রিভুজ", "সমবাহু ত্রিভুজ", "সমদ্বিবাহু ত্রিভুজ"], answer: "বিষমবাহু ত্রিভুজ", why: "তিনটি বাহুর দৈর্ঘ্যই আলাদা, তাই এটি বিষমবাহু ত্রিভুজ।" }),
      q({ prompt: "৭ সেমি, ৫ সেমি ও ৪ সেমি বাহুর ত্রিভুজটির পরিসীমা কত?", options: ["16 সেমি", "12 সেমি", "11 সেমি", "35 সেমি"], answer: "16 সেমি", why: "পরিসীমা = বাহুগুলোর মোট দৈর্ঘ্য = ৭ + ৫ + ৪ = ১৬ সেমি।" }),
    ],
    src: "p.160 কাজ ২ (the girl: ৭ সেমি বাহু; ৫ সেমি ও ৪ সেমি দৈর্ঘ্যের অনেকগুলো বাহু), p.161 (the ruler on pins, the circle with a thread, the cardboard strip with holes; steps (১)–(৪)); the kind and the perimeter (p.125) of the ৭–৫–৪ triangle",
  });

  // ════════════════════ p.162: কোণ এঁকে ত্রিভুজ ════════════════════
  wio({
    page: 162, slug: "draw-triangles", type: G, title: "চাঁদা দিয়ে কোণ এঁকে ত্রিভুজ আঁকি",
    items: [
      draw(60), draw(60, "left"), // কাজ ৩ (২) ক বিন্দুতে ৬০°, (৩) খ বিন্দু থেকে ৬০°
      draw(40), draw(80, "left"), // অনুশীলন ২: ৪০° at the base's left end, ৮০° at its right end
      bySides([6, 6, 6]), bySides([5, 6, 5]), bySides([5, 5, 5]), // অনুশীলন ১ (১), (২); কাজ ৩
      byAngles([60, 60, 60]), byAngles([40, 80, 60]), // কাজ ৩ (the girl's ৬০° angles); অনুশীলন ২
      byAngles([50, 60, 70]), byAngles([30, 90, 60]), byAngles([30, 30, 120]), // অনুশীলন ৩
    ],
    src: "p.162 অনুশীলন ১ ((১) ৬ সেমি বাহুর সমবাহু, (২) ৫, ৫, ৬ সেমি সমদ্বিবাহু), কাজ ৩ (৫ সেমি বাহুর সমবাহু ত্রিভুজ: ক বিন্দুতে ৬০°, খ বিন্দু থেকে ৬০°; the girl: ৩টি ৬০° কোণ), অনুশীলন ২ (৫ সেমি ভূমি, ৪০° ও ৮০°), অনুশীলন ৩ (একটি সূক্ষ্মকোণী, একটি স্থূলকোণী ও একটি সমকোণী ত্রিভুজ: the angles ours)",
  });

  // ════════════════════ p.163–164: আয়ত ও বর্গ ════════════════════
  sort({
    page: 163, slug: "squares-rectangles", title: "আকৃতিগুলোকে দুই দলে ভাগ করি: বর্গ ও আয়ত",
    categories: ["১ম দল: বর্গ", "২য় দল: বর্গ নয় এমন আয়ত"],
    items: [
      ["ক: 4 ঘর × 1 ঘর", 1], ["খ: 6 ঘর × 3 ঘর", 1], ["গ: 3 ঘর × 3 ঘর", 0], ["ঘ: 1 ঘর × 1 ঘর", 0], ["ঙ: 2 ঘর × 2 ঘর", 0], ["চ: 2 ঘর × 4 ঘর", 1],
      ["5 ঘর × 2 ঘর", 1], ["4 ঘর × 4 ঘর", 0], ["7 ঘর × 3 ঘর", 1], ["6 ঘর × 6 ঘর", 0], ["3 ঘর × 8 ঘর", 1], ["5 ঘর × 5 ঘর", 0],
    ],
    src: "p.163 কাজ ১ (the six shapes on squared paper, ক–চ, and the two groups: ১ম দল গ, ঘ, ঙ; ২য় দল ক, খ, চ), p.164's two shapes (৫ × ২, ২ × ২ … as 5 ঘর × 2 ঘর) and five of ours",
  });

  wio({
    page: 163, slug: "squared-paper", type: G, title: "ছক কাগজে বর্গ ও আয়তের ক্ষেত্রফল ও পরিসীমা",
    items: [
      both(4, 1), both(3, 3), both(6, 3), both(1, 1), both(2, 2), both(2, 4), // ক, গ, খ, ঘ, ঙ, চ
      it({ kind: "dots", task: "square", w: 8, h: 5 }, "square"), it({ kind: "dots", task: "rect", w: 8, h: 5 }, "rect"),
    ],
    fresh: { skill: "area", count: 5 },
    src: "p.163 কাজ ১ (ক ৪ × ১, গ ৩ × ৩, খ ৬ × ৩, ঘ ১ × ১, ঙ ২ × ২, চ ২ × ৪ ঘর: each one's ক্ষেত্রফল and পরিসীমা in ঘর, as p.125 and pp.130–132 taught), then a square and a rectangle drawn on dots; 5 fresh area rounds",
  });
  cant("p.163 কাজ ২ (discuss with classmates and fill the table of মিল ও অমিল) and p.164 অনুশীলন ১ (write where we see square and rectangular areas around us): talk and the child's own lists; the quizzes on p.164 and p.165 ask the likenesses and the differences.");

  wio({
    page: 164, slug: "draw-rectangles", type: G, title: "ছক কাগজে আয়ত ও বর্গ আঁকি",
    items: [
      shade(5, 3, "প্রতিটি ঘর 1 সেমি। দৈর্ঘ্য 5 সেমি ও প্রস্থ 3 সেমি একটি আয়ত আঁকি।"),
      shade(6, 3, "প্রতিটি ঘর 1 সেমি। দৈর্ঘ্য 6 সেমি, প্রস্থ 3 সেমি একটি আয়ত আঁকি।"),
      shade(8, 4, "প্রতিটি ঘর 1 সেমি। দৈর্ঘ্য 8 সেমি, প্রস্থ 4 সেমি একটি আয়ত আঁকি।"),
      shade(6, 6, "প্রতিটি ঘর 1 সেমি। প্রতিটি বাহুর দৈর্ঘ্য 6 সেমি এমন একটি বর্গ আঁকি।", 10, 7),
      both(5, 2), both(2, 2),
    ],
    fresh: { skill: "area", count: 5 },
    src: "p.164 কাজ ৩ (৫ সেমি রেখা, দুইটি লম্ব, ৩ সেমি: a ৫ × ৩ rectangle) and অনুশীলন ২ (১) ৬ × ৩, (২) ৮ × ৪, (৩) ৬ সেমি বাহুর বর্গ, shaded on squared paper of ১ সেমি squares (the perimeter fixes the sides); the top grid's ৫ × ২ rectangle and ২ × ২ square measured; 5 fresh area rounds",
  });

  mcq({
    page: 164, slug: "quadrilaterals", title: "চতুর্ভুজ, আয়ত ও বর্গ চিনি",
    questions: [
      q({ prompt: "চারটি সরলরেখা দ্বারা সীমাবদ্ধ আকৃতিকে কী বলে?", options: ["চতুর্ভুজ", "ত্রিভুজ", "বৃত্ত"], answer: "চতুর্ভুজ", why: "চারটি সরলরেখা দ্বারা সীমাবদ্ধ আকৃতিকে চতুর্ভুজ বলে।" }),
      q({ prompt: "যে চতুর্ভুজের চারটি কোণই সমকোণ তাকে কী বলে?", options: ["আয়ত", "ত্রিভুজ", "সরলকোণ"], answer: "আয়ত", why: "যে চতুর্ভুজের চারটি কোণই সমকোণ তাকে আয়ত বলে।" }),
      q({ prompt: "যে আয়তের চারটি বাহু সমান তাকে কী বলে?", options: ["বর্গ", "ত্রিভুজ", "সমবাহু ত্রিভুজ"], answer: "বর্গ", why: "যে আয়তের চারটি বাহু সমান তাকে বর্গ বলে।" }),
      q({ prompt: "আয়তের বিপরীত বাহুগুলো কেমন?", options: ["পরস্পর সমান ও সমান্তরাল", "পরস্পর লম্ব", "সবসময় অসমান"], answer: "পরস্পর সমান ও সমান্তরাল", why: "আয়তের বিপরীত বাহুগুলো পরস্পর সমান ও সমান্তরাল।" }),
      q({ prompt: "সকল বর্গই কি আয়ত?", options: ["হ্যাঁ", "না"], answer: "হ্যাঁ", why: "বর্গের চারটি কোণই সমকোণ, তাই বর্গও একটি আয়ত (যার চারটি বাহু সমান)।" }),
      q({ prompt: "আয়ত আঁকার [১] ধাপে কী করি?", options: ["স্কেলের সাহায্যে 5 সেমি দৈর্ঘ্যের একটি রেখা আঁকি", "দুইটি বিন্দু যোগ করি", "দুইটি লম্ব আঁকি"], answer: "স্কেলের সাহায্যে 5 সেমি দৈর্ঘ্যের একটি রেখা আঁকি", why: "[১] একটি স্কেলের সাহায্যে ৫ সেমি দৈর্ঘ্যের একটি রেখা আঁকি।" }),
      q({ prompt: "আয়ত আঁকার [২] ধাপে রেখাটির উপর দুইটি লম্ব কী দিয়ে আঁকি?", options: ["ত্রিকোণী সেট", "কার্ডবোর্ডের টুকরো", "সুতা"], answer: "ত্রিকোণী সেট", why: "[২] জ্যামিতি বক্সের ত্রিকোণী সেট ব্যবহার করে দুইটি লম্ব আঁকি।" }),
      q({ prompt: "আয়ত আঁকার [৩] ধাপে লম্ব দুইটির উপর কত দূরে বিন্দু চিহ্নিত করি?", options: ["3 সেমি", "5 সেমি", "8 সেমি"], answer: "3 সেমি", why: "[৩] লম্ব দুইটি থেকে ৩ সেমি দৈর্ঘ্যের দুইটি বিন্দু চিহ্নিত করি।" }),
      q({ prompt: "আয়ত আঁকার শেষ ধাপে কী করি?", options: ["চিহ্নিত বিন্দু দুইটি যোগ করি", "আরও একটি লম্ব আঁকি", "চাঁদা দিয়ে কোণ মাপি"], answer: "চিহ্নিত বিন্দু দুইটি যোগ করি", why: "[৪] আয়তটি আঁকার জন্য চিহ্নিত বিন্দুদ্বয় যোগ করি।" }),
      q({ prompt: "নিচের কোনটির ক্ষেত্র সাধারণত বর্গাকার?", options: ["দাবার বোর্ড", "দরজা", "ব্ল্যাকবোর্ড", "খাতার পাতা"], answer: "দাবার বোর্ড", why: "দাবার বোর্ডের চারটি বাহু সমান ও চারটি কোণ সমকোণ: এটি বর্গাকার।" }),
      q({ prompt: "নিচের কোনটির ক্ষেত্র সাধারণত আয়তাকার কিন্তু বর্গাকার নয়?", options: ["দরজা", "দাবার বোর্ড", "লুডু বোর্ড"], answer: "দরজা", why: "দরজার কোণগুলো সমকোণ, কিন্তু লম্বা দুই বাহু ছোটো দুই বাহুর চেয়ে বড়ো: এটি আয়তাকার।" }),
    ],
    src: "p.164 the three definitions (চতুর্ভুজ, আয়ত, বর্গ), the parrot (বিপরীত বাহু সমান ও সমান্তরাল), কাজ ৩ [১]–[৪] (drawing a ৫ × ৩ rectangle), অনুশীলন ১ (বর্গাকার ও আয়তাকার ক্ষেত্র around us: a chessboard, a door, of ours)",
  });

  // ════════════════════ p.165: দেখি পারি কি না ════════════════════
  wio({
    page: 165, slug: "review", type: G, title: "দেখি পারি কি না: ত্রিভুজ ও চতুর্ভুজের নাম বলি",
    items: [
      bySides([7, 9, 4]), bySides([5, 5, 5]), bySides([7, 4, 7]), // ১
      byAngles([90, 42, 48]), byAngles([71, 48, 61]), byAngles([51, 104, 25]), // ২
      bySides([4, 5, 6]), // ৩
      shade(5, 4, "প্রতিটি ঘর 1 সেমি। 4 সেমি ও 5 সেমি বাহুবিশিষ্ট একটি চতুর্ভুজ (আয়ত) আঁকি।"), // ৫
    ],
    fresh: { skill: "triangle", count: 5 },
    src: "p.165 ১ (বাহুভেদে: বিষমবাহু, সমবাহু, সমদ্বিবাহু, in our drawing's proportions), ২ (কোণভেদে: সমকোণী, সূক্ষ্মকোণী, স্থূলকোণী, to the nearest degree), ৩ (৪, ৫ ও ৬ সেমি), ৫ (৪ সেমি ও ৫ সেমি বাহুর চতুর্ভুজ: an আয়ত shaded); ৪ is in the sort; 5 fresh triangle rounds",
  });

  sort({
    page: 165, slug: "rect-or-square", title: "বৈশিষ্ট্য দেখে আয়ত ও বর্গ চিনি",
    categories: ["বর্গ", "আয়ত (বর্গ নয়)", "আয়ত বা বর্গ কোনোটিই নয়"],
    items: [
      ["ক: চারটি কোণ সমকোণ, চারটি বাহু সমান", 0],
      ["খ: চারটি কোণ সমকোণ, লম্বা দুই বাহু ছোটো দুই বাহুর চেয়ে অনেক বড়ো", 1],
      ["গ: চারটি কোণ সমকোণ, চারটি বাহুই সমান মাপের", 0],
      ["ঘ: চারটি কোণ সমকোণ, পাশাপাশি দুই বাহু অসমান", 1],
      ["দৈর্ঘ্য 6 সেমি, প্রস্থ 3 সেমি, চারটি কোণ সমকোণ", 1],
      ["দৈর্ঘ্য 8 সেমি, প্রস্থ 4 সেমি, চারটি কোণ সমকোণ", 1],
      ["প্রতিটি বাহু 6 সেমি, চারটি কোণ সমকোণ", 0],
      ["4 সেমি ও 5 সেমি বাহু, চারটি কোণ সমকোণ", 1],
      ["প্রতিটি বাহু 4 সেমি, চারটি কোণ সমকোণ", 0],
      ["চারটি বাহু সমান, কিন্তু কোণগুলো সমকোণ নয়", 2],
      ["বিপরীত বাহুগুলো সমান, কিন্তু কোণগুলো সমকোণ নয়", 2],
      ["তিনটি বাহু ও তিনটি কোণ", 2],
    ],
    src: "p.165 ৪ (ক and গ বর্গ, খ and ঘ আয়ত: each by its বৈশিষ্ট্য) and ৫, p.164 অনুশীলন ২ (৬ × ৩, ৮ × ৪, ৬ সেমি বর্গ), p.168 নিজে করি ১ (৪)'s parallelogram and rhombus, ৫ and ৬, and a triangle",
  });

  // ════════════════════ p.166–167: জ্যামিতিক প্যাটার্ন ════════════════════
  const P3 = ["rect-orange", "circle-red", "square-green", "star-yellow"];
  const row3 = (gap) => [...P3, ...P3, ...P3].map((t, k) => (k === gap ? null : t));
  wio({
    page: 166, slug: "shape-patterns", type: "shape_patterns", title: "প্যাটার্ন লক্ষ করি এবং সম্পূর্ণ করি",
    items: [
      shapes(row3(8)), shapes(row3(9)), shapes(row3(10)), // অনুশীলন ১ (৩)'s four shapes
      shapes(["square-grey", "square-yellow", "square-grey", "square-yellow", "square-grey", "square-yellow", null, "square-yellow"]), // the chessboard
    ],
    fresh: { skill: "shapes", count: 6 },
    src: "p.166 অনুশীলন ১ (৩) (সিলিন্ডার, বৃত্ত, ঘনক, তারা again and again: as আয়ত, বৃত্ত, বর্গ, তারা, its three blanks one at a time), the chessboard's dark and light squares; (১) and (২) grow and are in the quiz; 6 fresh rounds",
  });
  cant("p.166 অনুশীলন ১ (১), (২) (growing patterns: ★ one more each time; ● ⊕ ⊗ two, then three of each) and (৩)'s colours (red, then green): Shape Patterns plays only a repeating unit of 2–4 shapes, so (১) and (২) are in the quiz, and (৩) is played by its four shapes (each its own colour).");

  mcq({
    page: 166, slug: "patterns-quiz", title: "পরিবেশে ও ছবিতে জ্যামিতিক প্যাটার্ন খুঁজি",
    questions: [
      q({ prompt: "(১) ● ★ ● ★★ ● ★★★ ● ___ ● : ফাঁকা ঘরে কয়টি ★ বসবে?", options: ["4টি", "3টি", "5টি"], answer: "4টি", why: "প্রতিবার ★ একটি করে বাড়ে: ১টি, ২টি, ৩টি, তারপর ৪টি।" }),
      q({ prompt: "(১) এর শেষ ● এর পরে কয়টি ★ আসবে?", options: ["5টি", "4টি", "1টি"], answer: "5টি", why: "১, ২, ৩, ৪ এর পরে ★ হবে ৫টি।" }),
      q({ prompt: "(২) ● ⊕ ⊗ ●● ⊕⊕ ⊗⊗ ●●● ⊕ ___ ● : ফাঁকা ৫টি ঘরে কী বসবে?", options: ["⊕ ⊕ ⊗ ⊗ ⊗", "⊗ ⊗ ⊕ ⊕ ⊕", "⊕ ⊕ ⊕ ⊗ ⊗"], answer: "⊕ ⊕ ⊗ ⊗ ⊗", why: "তৃতীয় দলে প্রতিটি ৩টি করে: ●●● ⊕⊕⊕ ⊗⊗⊗; একটি ⊕ দেওয়া আছে, বাকি ⊕⊕ ও ⊗⊗⊗।" }),
      q({ prompt: "(২) এর পরের দলে কয়টি ● থাকবে?", options: ["4টি", "3টি", "5টি"], answer: "4টি", why: "দলগুলোতে প্রতিটি আকৃতি ১টি, ২টি, ৩টি করে; পরের দলে ৪টি করে।" }),
      q({ prompt: "(৩) লাল সিলিন্ডার, বৃত্ত, ঘনক, তারা; সবুজ সিলিন্ডার, বৃত্ত, ঘনক, তারা; ___ ___ ___ লাল তারা …: ফাঁকা ঘরে কী বসবে?", options: ["লাল সিলিন্ডার, লাল বৃত্ত, লাল ঘনক", "সবুজ সিলিন্ডার, সবুজ বৃত্ত, সবুজ ঘনক", "লাল তারা, লাল বৃত্ত, লাল ঘনক"], answer: "লাল সিলিন্ডার, লাল বৃত্ত, লাল ঘনক", why: "চারটি আকৃতি একই ক্রমে আসে, রং একবার লাল একবার সবুজ: তৃতীয় দল লাল।" }),
      q({ prompt: "শাড়ির পাড়, দাবার বোর্ড, মেঝের টাইলস: এগুলোকে প্যাটার্ন বলি কেন?", options: ["একই নকশা নির্দিষ্ট নিয়মে বারবার এসেছে", "সবকিছু এলোমেলোভাবে আছে", "সবগুলো একই রঙের"], answer: "একই নকশা নির্দিষ্ট নিয়মে বারবার এসেছে", why: "প্যাটার্নে একই আকৃতি বা নকশা একটি নির্দিষ্ট নিয়মে বারবার আসে।" }),
      q({ prompt: "দাবার বোর্ডে কালো ও সাদা ঘর কীভাবে সাজানো?", options: ["একটির পর একটি, পর্যায়ক্রমে", "সব কালো ঘর এক পাশে", "এলোমেলোভাবে"], answer: "একটির পর একটি, পর্যায়ক্রমে", why: "প্রতিটি সারিতে কালো ও সাদা ঘর একটির পর একটি আসে: এটি একটি প্যাটার্ন।" }),
      q({ prompt: "নিচের কোনটিতে প্যাটার্ন নেই?", options: ["মাটিতে এলোমেলো ছড়ানো পাতা", "শাড়ির পাড়", "জানালার গ্রিল", "দাবার বোর্ড"], answer: "মাটিতে এলোমেলো ছড়ানো পাতা", why: "এলোমেলো ছড়ানো পাতায় কোনো নিয়ম নেই; বাকিগুলোতে একই নকশা বারবার আসে।" }),
      q({ prompt: "মসজিদের দেয়ালে কী বারবার দেখা যায়?", options: ["একই আকারের খিলান", "আলাদা আলাদা ছবি", "কিছুই না"], answer: "একই আকারের খিলান", why: "মসজিদের দেয়ালে একই আকারের খিলান পাশাপাশি বারবার আসে: এটি প্যাটার্ন।" }),
      q({ prompt: "আর কোথায় প্যাটার্ন লক্ষ করা যায়?", options: ["কার্পেটে", "একটি সাদা কাগজে", "পরিষ্কার আকাশে"], answer: "কার্পেটে", why: "কার্পেটের নকশায় একই আকৃতি বারবার আসে: এটি প্যাটার্ন।" }),
    ],
    src: "p.166 মূল প্রশ্ন (শাড়ির পাড়, আনারস, মসজিদের দেয়াল, গ্রিল, মেঝে, দাবার বোর্ড), কাজ ১ (কেন এগুলো প্যাটার্ন; the boy: আর কোথায়; কার্পেট), অনুশীলন ১ (১), (২), (৩) as printed",
  });

  wio({
    page: 167, slug: "stick-patterns", title: "কাঠি দিয়ে জ্যামিতিক ও গাণিতিক প্যাটার্ন তৈরি করি",
    items: [
      pat([3, 6, 9, null], [12]), pat([4, 7, 10, null], [13]), pat([12, null, 22, null], [17, 27]), // কাজ ২ (১), (২), (৩)
      pat([3, 6, 9, 12, null, null], [15, 18]), pat([4, 7, 10, 13, null, null], [16, 19]), pat([12, 17, 22, 27, null], [32]),
      story("কাঠি দিয়ে আলাদা আলাদা ত্রিভুজ বানাই; প্রতিটি ত্রিভুজে 3টি কাঠি লাগে। 10টি ত্রিভুজ বানাতে কয়টি কাঠি লাগবে?", "3 × 10", "টি", 30),
      story("পাশাপাশি লাগানো বর্গ বানাই: প্রথম বর্গে 4টি কাঠি, পরের প্রতিটি বর্গে আরও 3টি করে কাঠি লাগে। 8টি বর্গ বানাতে কয়টি কাঠি লাগবে?", "4 + 3 × 7", "টি", 25),
      story("দুই সারির ছকে প্রতিবার একটি করে কলাম বাড়ালে আরও 5টি কাঠি লাগে। 22টি কাঠির ছকে আরও দুইটি কলাম বাড়াতে মোট কয়টি কাঠি লাগবে?", "22 + 5 × 2", "টি", 32),
    ],
    fresh: { skill: "pattern", count: 5 },
    src: "p.167 কাজ ২ (১) ত্রিভুজ ৩, ৬, ৯, ? (২) বর্গ ৪, ৭, ১০, ? (৩) ছক ১২, ?, ২২, ? (the 2-row grids of 2, 3, 4, 5 columns: ১২, ১৭, ২২, ২৭), each carried two steps further, and three stories of ours on the same sticks; 5 fresh number patterns",
  });
  cant("p.167 কাজ ৩ (make your own patterns on dot paper with squares, rectangles, parallelograms, rhombuses and trapeziums): the child's free design; the dot-grid rounds (p.163) draw squares and rectangles.");

  // ════════════════════ p.168: নিজে করি ════════════════════
  wio({
    page: 168, slug: "review", type: G, title: "নিজে করি: কোণ, রেখা, ত্রিভুজ, আয়ত ও বর্গ",
    items: [
      draw(25), draw(75), draw(90), draw(120), // ২ আঁকি
      name(25, 10), name(75), name(90, 20), name(120), // ২ নাম লিখি
      lines(0, 90), lines(0, 0, false), // ৩
      bySides([6, 6, 4]), byAngles([60, 60, 60]), byAngles([30, 90, 60]), // ৪ (১), (২), (৩)
      shade(4, 3, "প্রতিটি ঘর 1 সেমি। 3 সেমি ও 4 সেমি বাহুবিশিষ্ট একটি আয়ত আঁকি।"), // ৫
      shade(4, 4, "প্রতিটি ঘর 1 সেমি। 4 সেমি বাহুবিশিষ্ট একটি বর্গ আঁকি।"), // ৬
    ],
    src: "p.168 নিজে করি ২ (২৫°, ৭৫°, ৯০°, ১২০° চাঁদার সাহায্যে আঁকি এবং নাম লিখি), ৩ (লম্ব ও সমান্তরাল রেখা), ৪ ((১) ৬, ৬, ৪ সেমি; (২) ৬০° ও ৬০°, ৫ সেমি; (৩) a right angle, ৭ and ৪ সেমি: its other angles ৩০° and ৬০° to the nearest degree), ৫ (৩ × ৪ আয়ত), ৬ (৪ সেমি বর্গ)",
  });
  note("p.168 নিজে করি ৪ (২): the book labels the angles ৬০° and ৬০ (no ° on the second; a stray ° above the apex) and draws them about ৪৯° and ৬৪°; with ৬০° and ৬০° the triangle is equilateral (all three ৬০°), which the game uses. (৩): the right triangle with sides ৭ and ৪ সেমি has angles ২৯.৭° and ৬০.৩°: the game names it from ৯০°, ৩০°, ৬০°.");

  mcq({
    page: 168, slug: "tick-answers", title: "নিজে করি: সঠিক উত্তরটিতে টিক চিহ্ন দিই",
    questions: [
      q({ prompt: "সরল কোণের উদাহরণ কোনটি?", options: ["খোলা কাঁচির দুই ফলা", "দিগন্তরেখার উপর উদীয়মান সূর্য", "ইংরেজি বর্ণ Z", "ইংরেজি বর্ণ F"], book: "খ", why: "দিগন্তরেখাটি একটি সরলরেখা: সূর্যের নিচে এর দুই পাশ মিলে ১৮০°, একটি সরল কোণ।" }),
      q({ prompt: "বিকাল 3টার সময় ঘড়ির ঘণ্টা ও মিনিটের কাঁটা কত ডিগ্রি কোণ উৎপন্ন করে?", options: ["45°", "60°", "75°", "90°"], book: "ঘ", why: "৩টার সময় মিনিটের কাঁটা ১২-তে, ঘণ্টার কাঁটা ৩-এ: এরা একটি সমকোণ, ৯০° তৈরি করে।" }),
      q({ prompt: "কোন ত্রিভুজের সবগুলো কোণ সমান?", options: ["সমকোণী ত্রিভুজ", "সূক্ষ্মকোণী ত্রিভুজ", "সমবাহু ত্রিভুজ", "সমদ্বিবাহু ত্রিভুজ"], book: "গ", why: "সমবাহু ত্রিভুজের তিনটি কোণই সমান, প্রতিটি ৬০°।" }),
      q({ prompt: "নিচের কোনটি বর্গ?", options: ["লম্বা ও সরু একটি আয়ত", "একটি হেলানো চতুর্ভুজ", "চার বাহু সমান, চার কোণ সমকোণ", "চার বাহু সমান, কোণ সমকোণ নয়"], book: "গ", why: "যে আয়তের চারটি বাহু সমান তাকে বর্গ বলে: চারটি কোণ সমকোণ, চারটি বাহু সমান।" }),
      q({ prompt: "ত্রিকোণী সেট ব্যবহার করে নিচের কোনটি আঁকা যায়?", options: ["বৃত্ত", "অর্ধবৃত্ত", "বক্ররেখা", "সমান্তরাল রেখা"], book: "ঘ", why: "ত্রিকোণী সেট ব্যবহার করে সহজেই লম্ব ও সমান্তরাল রেখা আঁকা যায়।" }),
      q({ prompt: "দুইটি রেখা পরস্পরকে সমকোণে ছেদ করলে তাদের কী বলে?", options: ["লম্ব রেখা", "সমান্তরাল রেখা", "বক্ররেখা"], answer: "লম্ব রেখা", why: "একটি রেখা অপর একটি রেখার উপর লম্ব হবে যখন এরা একে অপরকে সমকোণে ছেদ করে বা মিলিত হয়।" }),
      q({ prompt: "যে দুইটি রেখা সব সময় সমান দূরত্বে থাকে এবং কখনো মিলিত হয় না, তাদের কী বলে?", options: ["সমান্তরাল রেখা", "লম্ব রেখা", "তির্যক রেখা"], answer: "সমান্তরাল রেখা", why: "দুইটি সমান্তরাল রেখা সব সময় সমান দূরত্বে থাকে, এরা কখনোই মিলিত হয় না।" }),
      q({ prompt: "যে ত্রিভুজের একটি কোণ 90° তাকে কী বলে?", options: ["সমকোণী ত্রিভুজ", "সূক্ষ্মকোণী ত্রিভুজ", "স্থূলকোণী ত্রিভুজ"], answer: "সমকোণী ত্রিভুজ", why: "সমকোণী ত্রিভুজের একটি কোণ সমকোণ বা ৯০°।" }),
      q({ prompt: "3 সেমি ও 4 সেমি বাহুবিশিষ্ট আয়তের পরিসীমা কত?", options: ["14 সেমি", "7 সেমি", "12 সেমি", "16 সেমি"], answer: "14 সেমি", why: "আয়তের বিপরীত বাহু সমান: ৩ + ৪ + ৩ + ৪ = ১৪ সেমি।" }),
      q({ prompt: "4 সেমি বাহুবিশিষ্ট বর্গের পরিসীমা কত?", options: ["16 সেমি", "8 সেমি", "12 সেমি", "4 সেমি"], answer: "16 সেমি", why: "বর্গের চারটি বাহু সমান: ৪ × ৪ = ১৬ সেমি।" }),
    ],
    src: "p.168 নিজে করি ১ (১)–(৫) (the book's options in its ক–ঘ order; the pictures of (১) and (৪) in words), ৩ (লম্ব ও সমান্তরাল রেখা কী, in words), ৪ (৩) (সমকোণী), ৫ and ৬ (the rectangle's and the square's perimeters, p.125)",
  });

  wio({
    page: 168, slug: "make-patterns", type: "shape_patterns", title: "আকৃতিগুলো ব্যবহার করে প্যাটার্ন তৈরি করি",
    items: [
      shapes(["triangle-green", "circle-yellow", "triangle-green", "circle-yellow", "triangle-green", "circle-yellow", "triangle-green", null]),
      shapes(["square-blue", "rect-purple", "rect-purple", "square-blue", "rect-purple", "rect-purple", "square-blue", null, "rect-purple"]),
      shapes(["circle-yellow", "square-blue", "triangle-green", "circle-yellow", "square-blue", null, "circle-yellow", "square-blue"]),
      shapes(["triangle-red", "triangle-green", "circle-yellow", "square-blue", "triangle-red", null, "circle-yellow", "square-blue"]),
    ],
    fresh: { skill: "shapes", count: 6 },
    src: "p.168 নিজে করি ৭ (the five shapes: a right triangle, a triangle, a circle, a square, a rectangle, in their colours): four patterns of ours made of them; 6 fresh rounds",
  });
};
