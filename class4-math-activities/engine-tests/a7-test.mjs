// A7: decimals (the Class 4 book's ch8, and ch9's changes of unit): sums in a row and in columns, comparing with
// fractions, decimal amounts in and out of a change of unit; web = server; whole-number conversions as before
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const S = process.env.S;
const web = await import(path.join(S || ".", "web/work-it-out.mjs")), old = await import(path.join(S || ".", "old/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 25) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const both = (item, want, what) => { const s = srv.normalizeWorkItem(item); eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(item), want, `web ${what}`); };
// p117–p120: sums
const sums = [["০.৭", "+", "০.৯", [1, 6]], ["১.৮", "+", "১.২", [3, 0]], ["২.৫", "+", "১.৭", [4, 2]], ["৩", "+", "৪.৬", [7, 6]], ["০.৯", "−", "০.৪", [0, 5]], ["২", "−", "০.৬", [1, 4]],
  ["৫", "−", "৩.৮", [1, 2]], ["৭.৬", "−", "২.৬", [5, 0]], ["৮", "+", "৪.৫", [12, 5]], ["৬", "−", "০.২", [5, 8]], ["৩.৬", "−", "২.৮", [0, 8]], ["৩.১", "+", "২", [5, 1]], ["৩", "+", "৪", null], ["০.৩", "−", "০.৫", null]];
for (const [a, op, b, want] of sums) both({ kind: "dsum", a, op, b }, want, `${a} ${op} ${b}`);
const cols = [["3.7", "+", "2.8", [6, 5]], ["0.5", "+", "0.3", [0, 8]], ["6", "−", "0.2", [5, 8]], ["8", "+", "4.5", [1, 2, 5]], ["1.4", "+", "2.6", [4, 0]], ["3.6", "−", "2.8", [0, 8]]];
for (const [a, op, b, want] of cols) { const w = web.dcolWork({ a, op, b }); eq(w.digits, want, `columns ${a} ${op} ${b}`); eq(w.cols.length, w.width, `cols ${a} ${op} ${b}`); }
eq(srv.normalizeWorkItem({ kind: "dsum", a: "৩.৭", op: "+", b: "২.৮", layout: "column" }).layout, "column", "dsum kept in columns");
// p116, p119, p120: comparing
const cmp = [["7/10", "0.9", "<"], ["০.৫", "৫/১০", "="], ["0.2", "6/10", "<"], ["10/10", "0.8", ">"], ["0.1", "0", ">"], ["11", "1.1", ">"], ["2.1", "2", ">"], ["1/10", "0.3", "<"], ["2.4", "1.8", ">"], ["3", "4.8", "<"], ["5", "7", null]];
for (const [a, b, want] of cmp) both({ kind: "dcompare", a, b }, want, `${a} ? ${b}`);
// p113–114, p140–141: changes of unit with decimals
const conv = [[[[650, "g"]], "kg", [0, 65], 2], [[["1.40", "l"]], "ml", 1400], [[["1.40", "l"]], "dl", 14], [[["2.7", "km"]], "m", 2700], [[[9, "mm"]], "cm", [0, 9], 1],
  [[["5.3", "km"]], "m", 5300], [[["2.65", "l"]], "ml", 2650], [[[7, "cm"], [4, "mm"]], "cm", [7, 4], 1], [[[1, "kg"], [500, "g"]], "kg", [1, 5], 1], [[[5, "ml"]], "dl", [0, 5], 2], [[["0.75", "m"]], "cm", 75]];
for (const [from, to, want, dp] of conv) {
  both({ kind: "convert", from, to }, want, `${JSON.stringify(from)} → ${to}`);
  if (dp) eq(srv.normalizeWorkItem({ kind: "convert", from, to }).dp, dp, `dp ${JSON.stringify(from)}`);
}
// whole-number conversions: exactly as before (random)
const U = Object.keys(old.UNITS);
for (let k = 0; k < 5000; k++) {
  const u1 = U[k % U.length], fam = old.UNITS[u1].fam, others = U.filter((u) => old.UNITS[u].fam === fam);
  const u2 = others[Math.floor(Math.random() * others.length)];
  const it = { kind: "convert", from: [[1 + Math.floor(Math.random() * 5000), u1]], to: u2 };
  const was = old.answerOf(it);
  if (was != null) eq(web.answerOf(it), was, `convert as before ${JSON.stringify(it)}`);
}
// random decimal sums and comparisons: web = server
for (let k = 0; k < 3000; k++) {
  const d = (dp) => (Math.random() * 100).toFixed(dp), a = d(1 + (k % 2)), b = d(1), op = k % 3 ? "+" : "−";
  const s1 = srv.normalizeWorkItem({ kind: "dsum", a, op, b }); eq(s1 ? s1.answer : null, web.answerOf({ kind: "dsum", a, op, b }), `dsum ${a}${op}${b}`);
  const fa = `${Math.floor(Math.random() * 12)}/10`;
  eq(srv.dcompareOf(fa, b), web.dcompareOf(fa, b), `dcompare ${fa} ${b}`);
}
console.log(bad ? `FAILED ${bad} of ${n}` : `ALL OK (${n} checks)`);
