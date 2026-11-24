#!/usr/bin/env node
// Prints BRIEF.md's table of every game round: an example item as you write it in a page file, the server's answer for
// it (what it(item, want) must say), and the server's own line about the kind (KIND_LINES, as the AI importer reads it).
// Run: node tools/kinds-table.js > .check/kinds.md (BRIEF.md §4 holds a copy).
"use strict";
require("../engine-tests/globals.cjs");
const fs = require("fs");
const path = require("path");
const SRC = path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js");
const W = require(SRC);
const text = fs.readFileSync(SRC, "utf8");
const LINES = {};
for (const m of text.matchAll(/^  (\w+): '(.*)',$/gm)) LINES[m[1]] = m[2];
const typeOf = (kind) => Object.entries(W.WIO_TYPES).find(([t, d]) => t !== "work_it_out" && d.kinds.includes(kind))?.[0] || "work_it_out";
const EX = [
  { kind: "sum", a: 456789, op: "+", b: 123456, layout: "column" }, { kind: "sum", terms: [12345, 6789, 101, 55, 9], op: "+", layout: "row" }, { kind: "sum", a: 535, op: "×", b: 125, layout: "column" },
  { kind: "missing", text: "□ + 20 = 35" }, { kind: "missing", text: "{48 − (6 + 2)} ÷ □ = 8", story: "a sentence in words, as printed" },
  { kind: "word", text: "রনির কাছে ২৫টি আম আছে। সে আরও ১২টি আম পেল। তার কাছে এখন কতটি আম?", sum: "25 + 12", unit: "টি" },
  { kind: "expr", text: "24 + 12 ÷ 3 × 2" }, { kind: "compare", a: "34567", b: "34657" }, { kind: "compare", a: "27 ÷ 3", b: "9", signs: "eq" }, { kind: "compare", a: "45", b: "54", signs: "not" },
  { kind: "truth", text: "14 × 3 < 35 + 4" }, { kind: "opbox", text: "69 □ 13 = 7 □ 8" },
  { kind: "place", n: 312841, ask: "parts" }, { kind: "place", n: 312841, ask: "number" }, { kind: "place", n: 312841, ask: "value", at: 4 }, { kind: "place", n: 312841, ask: "digit", at: 4 },
  { kind: "place", n: 290516, ask: "words" }, { kind: "place", n: 290516, ask: "words", system: "intl" }, { kind: "place", n: 557362, ask: "figures" }, { kind: "place", n: 3169615, ask: "commas" }, { kind: "place", n: 3169615, ask: "commas", system: "intl" }, { kind: "place", ask: "cards", cards: [4, 0, 7, 2], want: "largest" },
  { kind: "pattern", terms: [100000, 200000, "□", 400000, "□"] }, { kind: "mdigit", terms: ["□10", "2□5", "10□"], op: "+", total: "857", layout: "column" }, { kind: "grid", rows: [12], cols: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { kind: "divrem", a: 27, b: 4 }, { kind: "divrem", a: 27, b: 4, text: "a story", qUnit: "জন", rUnit: "টি" }, { kind: "longdiv", a: 3266, b: 23 }, { kind: "longdiv", a: 941, b: 23, text: "a story as printed" },
  { kind: "mistake", a: 4567, op: "+", b: 1234, shown: 5701 },
  { kind: "dsum", a: "3.7", op: "+", b: "2.8", layout: "row" }, { kind: "dsum", a: "8", op: "−", b: "4.5", layout: "column" }, { kind: "dcompare", a: "7/10", b: "0.9" },
  { kind: "nmark", rule: "multiple", n: 4, nums: [12, 15, 16, 20, 22, 24] }, { kind: "nmark", rule: "factor", n: 16, from: 1, to: 16 }, { kind: "nmark", rule: "prime", from: 1, to: 30 }, { kind: "nmark", rule: "div", n: 5, nums: [125, 130, 142, 155] },
  { kind: "sieve", to: 100 }, { kind: "fpairs", n: 12 }, { kind: "ftree", n: 30, ask: "tree" }, { kind: "ftree", n: 24, ask: "line" },
  { kind: "date", y: 1971, m: 12, d: 16, ask: "write", show: "words" }, { kind: "date", y: 2025, m: 6, d: 30, ask: "write", show: "cal" }, { kind: "date", y: 1971, m: 12, d: 16, ask: "weekday" }, { kind: "date", y: 2025, m: 9, d: 8, ask: "between", d2: 25 }, { kind: "date", y: 2026, m: 1, d: 1, ask: "after", n: 20 },
  { kind: "units", unit: "km", terms: [[3, 450], [2, 780]], ops: ["+"], layout: "column" }, { kind: "units3", unit: "h", terms: [[2, 35, 40], [1, 40, 25]], ops: ["+"], layout: "column" },
  { kind: "convert", from: [[2, "km"], [26, "m"]], to: "m" }, { kind: "convert", from: [[2026, "m"]], to: ["km", "m"] }, { kind: "convert", from: [[650, "g"]], to: "kg" }, { kind: "convert", from: [[7, "cm"], [4, "mm"]], to: "cm" },
  { kind: "clock", h: 4, m: 30, ask: "read" }, { kind: "clock", h: 2, m: 15, ask: "between", h2: 4, m2: 45 }, { kind: "money", ask: "count", notes: [100, 50, 20, 5] },
  { kind: "measure", tool: "ruler", value: 14, ask: "read" }, { kind: "measure", tool: "jug", value: 650, ask: "fill" }, { kind: "numberline", from: 0, to: 2, step: 0.1, target: 1.3, ask: "read" }, { kind: "numberline", from: 0, to: 20, step: 1, target: 7, ask: "place" }, { kind: "groups", total: 17, groups: 5 },
  { kind: "fname", n: 3, d: 4, shape: "circle" }, { kind: "fshade", n: 7, d: 10, shape: "bar" }, { kind: "fequiv", a: "1/2", b: "3/6" }, { kind: "fsame", n: 1, d: 2, d2: 12 }, { kind: "fcompare", a: "3/8", b: "5/8" }, { kind: "fadd", a: "2/7", op: "+", b: "3/7" }, { kind: "fline", n: 3, d: 5, ask: "read" },
  { kind: "fmixed", a: "7/4", ask: "tomixed", look: "pie" }, { kind: "fmixed", a: "2 1/4", ask: "toimproper", look: "bar" }, { kind: "fmixed", a: "13/5", ask: "tomixed", look: "line" }, { kind: "fmixed", a: "1 1/5", ask: "place" }, { kind: "fsort", want: "improper", fracs: ["3/5", "7/5", "5/5", "2/3"] },
  { kind: "angle", deg: 45, ask: "name" }, { kind: "angle", ask: "make", type: "obtuse" }, { kind: "angle", ask: "measure", deg: 50, from: "right" }, { kind: "angle", ask: "draw", deg: 120, from: "left" }, { kind: "angle", ask: "clock", h: 4, m: 30 },
  { kind: "lines", a: 0, b: 90, cross: false }, { kind: "triangle", ask: "sides", sides: [7, 5, 4] }, { kind: "triangle", ask: "angles", angles: [30, 60, 90] },
  { kind: "area", ask: "both", cells: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], unit: "সেমি" }, { kind: "dots", task: "rect", w: 6, h: 5 },
  { kind: "tally", ask: "make", rows: [{ name: "আম", emoji: "🥭", value: 7 }, { name: "কলা", emoji: "🍌", value: 4 }] }, { kind: "chart", symbol: "bar", dir: "v", key: 5, ask: "most", rows: [{ name: "রবি", value: 20 }, { name: "সোম", value: 35 }, { name: "মঙ্গল", value: 15 }] },
];
const out = ["| Type | Item (as written in a page file) | The server's answer: `it(item, want)` |", "|---|---|---|"];
for (const x of EX) {
  const t = typeOf(x.kind), r = W.normalizeWorkItems([x], t)[0];
  out.push(`| ${t} | \`${JSON.stringify(x)}\` | ${r ? `\`${JSON.stringify(r.answer)}\`` : "✗ refused"} |`);
}
out.push("", "### The server's own line for each kind (as the AI importer reads it)", "");
for (const [k, v] of Object.entries(LINES)) out.push(`- **${k}** (${typeOf(k)}): ${v.replace(/\|/g, "/")}`);
console.log(out.join("\n"));
