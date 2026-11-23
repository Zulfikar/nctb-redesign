#!/usr/bin/env node
// Checks ACTIVITIES-bn-update-2026-11-14-slice.json with the importer's own code (the backend's activity-import.helper.js
// and fraction-slice.helper.js), the way importBookActivities does it: the file (checkImportFile), every activity's
// content (importContent: every round kept as written), and each round's answer from the server's rules (sliceAnswer)
// against the one worked out here on its own (one part = 1/d; eaten: k/d; left: (d − k)/d), and, for the "১ − n/d"
// rounds, against the book's ১ − n/d. The codes: LS + 6, none twice, none of the other activity files'. Nothing is
// written anywhere. Run with the backend's node_modules at hand:  node validate-slice.js
"use strict";
const fs = require("fs");
const path = require("path");

const BACKEND = process.env.EB_BACKEND || path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend");
global.ebConstants = require(path.join(BACKEND, "src/utils/constants"));
global.ebTimezones = require(path.join(BACKEND, "src/utils/timezones")).GLOBAL_TIMEZONE;
const H = require(path.join(BACKEND, "src/v3/helpers/activity-import.helper.js"));
const S = require(path.join(BACKEND, "src/v3/helpers/fraction-slice.helper.js"));

const FILE = path.join(__dirname, "ACTIVITIES-bn-update-2026-11-14-slice.json");
const file = JSON.parse(fs.readFileSync(FILE, "utf8"));
const problems = [];
const bad = (at, msg) => problems.push(`${at}: ${msg}`);
const BN = "০১২৩৪৫৬৭৮৯";
const asc = (s) => String(s).replace(/[০-৯]/g, (d) => String(BN.indexOf(d)));

H.checkImportFile(file).forEach((m) => bad("file", m));
if (H.IMPORT_TYPES.fraction_slice == null) bad("importer", "doesn't know fraction_slice (the backend needs the Slice It! change)");
const others = ["ACTIVITIES-bn.json", "ACTIVITIES-bn-rest.json", "ACTIVITIES-bn-update-2026-11-03-pages.json"].map((f) => path.join(__dirname, f))
  .concat(["ACTIVITIES-bn.json", "ACTIVITIES-bn-update-2026-11-02-tools.json", "ACTIVITIES-bn-update-2026-11-03-pages.json"].map((f) => path.join(__dirname, "..", "class2-math-activities", f)));
const otherCodes = new Set(), otherQr = new Set();
others.forEach((f) => { if (fs.existsSync(f)) JSON.parse(fs.readFileSync(f, "utf8")).activities.forEach((a) => { otherCodes.add(a.code); if (f.includes("class3")) otherQr.add(a.qr); }); });
const codes = new Set();
let rounds = 0;
for (const a of file.activities) {
  const at = `${a.qr} ${a.title}`;
  if (!/^LS[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/.test(a.code) || codes.has(a.code) || otherCodes.has(a.code)) bad(at, `code ${a.code}`);
  codes.add(a.code);
  if (otherQr.has(a.qr)) bad(at, "this QR id is already used in the book");
  if (a.type !== "fraction_slice" || a.chapter !== file.book.chapters[8] || !(a.page >= 91 && a.page <= 106)) bad(at, "type, chapter or page");
  const { content, error } = H.importContent(a.type, a.content);
  if (error) bad(at, `importer: ${error}`);
  if (JSON.stringify(content.rounds) !== JSON.stringify(a.content.rounds)) bad(at, "the importer changed a round");
  if (content.rounds.length < 10) bad(at, `${content.rounds.length} rounds (at least 10)`);
  content.rounds.forEach((r, i) => {
    rounds += 1;
    const server = S.sliceAnswer(r);
    const mine = r.kind !== "eat" ? [1, r.d] : r.ask === "ate" ? [r.eat, r.d] : [r.d - r.eat, r.d];
    if (JSON.stringify(server) !== JSON.stringify(mine)) bad(`${at} round ${i + 1}`, `server ${server} ≠ ${mine}`);
    if (!S.sliceOptions(r).some((o) => o[0] === server[0] && o[1] === server[1])) bad(`${at} round ${i + 1}`, "the answer isn't among the options");
    if (S.sliceOptions(r).length !== 3) bad(`${at} round ${i + 1}`, "not 3 options");
    const m = /১ − ([০-৯]+)\/([০-৯]+) = \?/.exec(r.text || "");
    if (m) {
      const [k, d] = [+asc(m[1]), +asc(m[2])];
      if (d !== r.d || k !== r.eat || r.ask !== "left" || server[0] !== d - k) bad(`${at} round ${i + 1}`, `“১ − ${k}/${d}” doesn't match the round`);
    }
  });
}
console.log(`${path.basename(FILE)}: ${file.activities.length} activities, ${rounds} rounds`);
console.log(problems.length ? `PROBLEMS:\n${problems.join("\n")}` : "ALL OK (importer, answers, codes, QR ids)");
process.exit(problems.length ? 1 : 0);
