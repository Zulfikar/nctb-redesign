// A2: the column multiplication by a 2- or 3-digit number: 2-digit = exactly the old rows; 3-digit = the book's p42
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const S = process.env.S;
const web = await import(path.join(S || ".", "web/work-it-out.mjs")), old = await import(path.join(S || ".", "old/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 20) console.log("DIFF", what, JSON.stringify(a).slice(0, 300), "\n   vs", JSON.stringify(b).slice(0, 300)); } };
// 1. two-digit multipliers: the cells (without the new ds field) and the numbers as before
for (let k = 0; k < 3000; k++) {
  const a = 10 + Math.floor(Math.random() * 9990), b = 10 + Math.floor(Math.random() * 90);
  const w = web.longMulWork(a, b), o = old.longMulWork(a, b);
  eq(w.cells.map(({ ds, ...c }) => c), o.cells, `cells ${a}×${b}`);
  eq([w.o, w.t, w.p1, w.p2, w.answer, w.width], [o.o, o.t, o.p1, o.p2, o.answer, o.width], `nums ${a}×${b}`);
}
// 2. the book's ৫৩৫ × ১২৫: rows 2675, 10700, 53500 → 66875; every row's digits and the answer's
const w = web.longMulWork(535, 125);
const rowNum = (r) => Number(w.cells.filter((c) => c.row === r).sort((p, q) => q.col - p.col).map((c) => c.digit).join(""));
eq([rowNum(0), rowNum(1), rowNum(2), rowNum(3), w.rows, w.width], [2675, 10700, 53500, 66875, 3, 5], "p42");
for (let k = 0; k < 3000; k++) {
  const a = 10 + Math.floor(Math.random() * 9990), b = Number(`${1 + Math.floor(Math.random() * 9)}${1 + Math.floor(Math.random() * 9)}${1 + Math.floor(Math.random() * 9)}`);
  const x = web.longMulWork(a, b), r = (q) => Number(x.cells.filter((c) => c.row === q).sort((p, s) => s.col - p.col).map((c) => c.digit).join(""));
  eq([r(0), r(1), r(2), r(3)], [a * (b % 10), a * (Math.floor(b / 10) % 10) * 10, a * Math.floor(b / 100) * 100, a * b], `rows ${a}×${b}`);
}
// 3. the server keeps such a sum in columns (3-digit multiplier, no 0, answer under 10 million), else in a row
eq(srv.normalizeWorkItem({ kind: "sum", a: 535, op: "×", b: 125, layout: "column" }).layout, "column", "srv column");
eq(srv.normalizeWorkItem({ kind: "sum", a: 535, op: "×", b: 105, layout: "column" }).layout, "row", "srv 0 in b");
eq(srv.normalizeWorkItem({ kind: "sum", a: 12345, op: "×", b: 999, layout: "column" }).layout, "row", "srv too big");
const fr = web.freshProblems({ skill: "mul3", count: 10, digits: 3 });
eq(fr.length, 10, "fresh mul3");
for (const f of fr) eq(srv.normalizeWorkItem(f).layout, "column", `fresh ${f.a}×${f.b}`);
console.log(bad ? `FAILED ${bad} of ${n}` : `ALL OK (${n} checks)`);
