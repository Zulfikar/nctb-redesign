// A1 tests: the website's rules (work-it-out.js) against the server's (work-it-out.helper.js), and the book's own words
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const WEB = path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/frontend/components/management/activity-studio");
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
const web = await import(path.join(process.env.S || ".", "web/work-it-out.mjs"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 30) console.log("DIFF", what, JSON.stringify(a), JSON.stringify(b)); } };
const N = (s) => s.normalize("NFC");
// 1. the book's own readings (pp4–6)
eq(web.numberWords(21046091, "bn"), ["দুই কোটি", "দশ লক্ষ", "ছেচল্লিশ হাজার", "একানব্বই"].map(N), "p4 bn");
eq(web.numberWords(21046091, "intl"), ["একুশ মিলিয়ন", "ছেচল্লিশ হাজার", "একানব্বই"].map(N), "p4 intl");
eq(web.numberWords(5660779, "bn").join(" "), N("ছাপ্পান্ন লক্ষ ষাট হাজার সাতশত উনআশি"), "p6 (1)");
eq(web.numberWords(11213522, "bn").join(" "), N("এক কোটি বারো লক্ষ তেরো হাজার পাঁচশত বাইশ"), "p6 (2)");
eq(web.numberWords(31633999, "bn").join(" "), N("তিন কোটি ষোলো লক্ষ তেত্রিশ হাজার নয়শত নিরানব্বই"), "p6 (3)");
eq(web.numberWords(53055262, "bn").join(" "), N("পাঁচ কোটি ত্রিশ লক্ষ পঞ্চান্ন হাজার দুইশত বাষট্টি"), "p6 (4)");
eq(web.numberWords(43451280, "intl").join(" "), N("তেতাল্লিশ মিলিয়ন চারশত একান্ন হাজার দুইশত আশি"), "intl 43451280");
eq(web.numberWords(400400, "intl"), ["চারশত হাজার", "চারশত"].map(N), "intl 400400");
eq(web.commasOf(21046091, "bn"), [1, 3, 5], "commas bn");  // ২,১০,৪৬,০৯১
eq(web.commasOf(21046091, "intl"), [2, 5], "commas intl"); // 21,046,091
eq(web.commasOf(3206, "bn"), [1], "commas 3206");
eq(web.commasOf(80006, "intl"), [2], "commas 80006");
eq(web.cardsNumber([4, 0, 7, 2], "largest"), 7420, "cards L");
eq(web.cardsNumber([4, 0, 7, 2], "smallest"), 2047, "cards S");
eq(web.cardsNumber([0, 0, 5], "smallest"), 500, "cards 005");
// 2. missing boxes: worked out = the old way of trying every number (small ones), and big ones
const old = (text) => { const t = web.plainMath(text), s = t.split("="); let f = null; for (let x = 0; x <= 20000; x++) { const l = web.evalMath(s[0], x), r = web.evalMath(s[1], x); if (l == null || r == null || l !== r) continue; if (f != null) return null; f = x; } return f; };
const forms = ["□ + {b} = {c}", "{a} + □ = {c}", "{c} − □ = {a}", "□ − {b} = {a}", "□ × {b} = {p}", "{a} × □ = {p}", "□ ÷ {b} = {a}", "{p} ÷ □ = {b}", "(□ + {b}) × 2 = {d}", "{c} − □ × 2 = {e}", "□ × 0 = 0", "5 ÷ □ = 0", "□ + 3 = 2"];
for (let k = 0; k < 400; k++) {
  const a = 1 + Math.floor(Math.random() * 90), b = 1 + Math.floor(Math.random() * 90);
  const v = { a, b, c: a + b, p: a * b, d: (a + b) * 2, e: a + b - 2 * Math.min(a, b) };
  const f = forms[k % forms.length].replace(/\{(\w)\}/g, (_, x) => v[x]);
  eq(web.solveMissing(f), old(f), `missing ${f}`);
  eq(srv.solveMissing(f), web.solveMissing(f), `srv missing ${f}`);
}
eq(web.solveMissing("□ − 48936 = 49877"), 98813, "big missing");
eq(srv.solveMissing("৮২৫৬৭১৩ + □ = ৯৯৯৯৯৯৯"), 1743286, "big missing bn");
// 3. every place ask, web = server, many numbers
const asks = ["parts", "number", "value", "digit", "words", "figures", "commas"];
for (let k = 0; k < 3000; k++) {
  const L = 1 + Math.floor(Math.random() * 8), num = Math.floor(10 ** (L - 1) + Math.random() * (10 ** L - 10 ** (L - 1)));
  const ask = asks[k % asks.length], it = { kind: "place", n: num, ask, at: Math.floor(Math.random() * L), system: k % 2 ? "intl" : "bn" };
  const s = srv.normalizeWorkItem(it), w = web.answerOf(it);
  eq(s ? s.answer : null, w, `place ${JSON.stringify(it)}`);
}
for (let k = 0; k < 500; k++) {
  const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5).slice(0, 2 + (k % 7)), want = k % 2 ? "largest" : "smallest";
  const s = srv.normalizeWorkItem({ kind: "place", ask: "cards", cards, want });
  eq(s ? s.answer : null, web.answerOf({ kind: "place", ask: "cards", cards, want }), `cards ${cards}`);
}
// 4. five numbers added; fresh place rounds are all askable
eq(srv.normalizeWorkItem({ kind: "sum", terms: [258367, 389654, 506734, 625843, 819578], op: "+", layout: "column" }).answer, 2600176, "five terms");
eq(web.answerOf({ kind: "sum", terms: [258367, 389654, 506734, 625843, 819578], op: "+" }), 2600176, "five terms web");
for (const ask of ["parts", "number", "value", "digit", "words", "figures", "commas", "cards"]) {
  const got = web.freshProblems({ skill: "place", count: 10, digits: 8, placeAsks: [ask], system: "mix" });
  eq(got.length, 10, `fresh ${ask}`);
  for (const g of got) { const s = srv.normalizeWorkItem(g); eq(s ? s.answer : null, g.answer, `fresh ${ask} ${JSON.stringify(g)}`); }
}
console.log(bad ? `FAILED ${bad} of ${n}` : `ALL OK (${n} checks)`);
