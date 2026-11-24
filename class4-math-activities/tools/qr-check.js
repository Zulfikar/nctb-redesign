// Reads every QR printed on the book's page previews (../class4-math-redesign/previews) and compares it with the games
// file: each page's QRs = its games' codes, the cover's = the book's link. Uses the film's qr-read.swift (Vision).
"use strict";
const path = require("path"), { execFileSync } = require("child_process");
const f = require("../ACTIVITIES-bn.json");
const PREV = path.join(__dirname, "..", "..", "class4-math-redesign", "previews");
const read = (png) => execFileSync("swift", [path.join(process.env.HOME, "Downloads/activity-studio-film/_build/qr-read.swift"), path.join(PREV, png)], { encoding: "utf8" });
let bad = 0, n = 0;
if (!read("cover.png").includes("https://ebidyaloy.com/b/KZT9KF")) { bad++; console.log("cover: not the book's link"); }
for (let p = 1; p <= 174; p++) {
  const want = f.activities.filter((a) => a.page === p).map((a) => a.code).sort();
  const got = [...read(`page-${String(p).padStart(3, "0")}.png`).matchAll(/ebidyaloy\.com\/a\/(LS[A-Z0-9]{6})/g)].map((m) => m[1]).sort();
  n++;
  if (JSON.stringify(got) !== JSON.stringify(want)) { bad++; console.log(`p${p}: printed ${got.join(" ") || "none"} · file ${want.join(" ")}`); }
}
console.log(`${n - (bad && 1) * 0 - bad} of ${n} pages: every printed QR = the file's games; cover ${bad ? "see above" : "ok"}`);
process.exit(bad ? 1 : 0);
