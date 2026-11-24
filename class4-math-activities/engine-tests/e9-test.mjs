// E9 (24 Nov 2026, «এসো, গণিত শিখি!» Book #02 p.14): rounding to the nearest 10, 100, 1000…, exactly halfway up.
// Web = server; refused items; fresh rounds valid, at the game's own places.
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const web = await import(path.join(process.env.S || ".", "web/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 20) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const both = (it, want, what) => { const s = srv.normalizeWorkItem(it); eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(it), want, `web ${what}`); };
// the book's page (p.14's own, then the halfway rule)
for (const [v, to, want] of [[3472, 100, 3500], [68, 10, 70], [45, 10, 50], [7500, 1000, 8000], [12499, 1000, 12000], [850, 100, 900], [9950, 100, 10000], [61, 10, 60], [25815, 1000, 26000], [44444, 10000, 40000], [150000, 100000, 200000]]) both({ kind: "round", n: v, to }, want, `${v} to ${to}`);
eq(web.roundOf({ n: 347, to: 100 }), { n: 347, to: 100, lo: 300, hi: 400, mid: 350, answer: 300 }, "the line's marks");
// refused: a place not offered, below half the place, too big, not whole
for (const [it, what] of [[{ kind: "round", n: 47, to: 20 }, "to 20"], [{ kind: "round", n: 4, to: 10 }, "4 to 10"], [{ kind: "round", n: 100000000, to: 1000 }, "too big"], [{ kind: "round", n: 4.5, to: 10 }, "4.5"]]) {
  eq(srv.normalizeWorkItem(it), null, `srv refuses ${what}`); eq(web.answerOf(it), null, `web refuses ${what}`);
}
// fresh rounds at the game's own places
for (let i = 0; i < 300; i++) {
  const to = [[10], [100], [1000], [10, 100]][i % 4];
  const [it] = web.freshProblems({ skill: "round", count: 1, roundTo: to });
  const s = it && srv.normalizeWorkItem(it);
  eq(!!s, true, `fresh valid ${JSON.stringify(it)}`);
  if (!s) continue;
  eq(s.answer, web.answerOf(it), `fresh same ${JSON.stringify(it)}`);
  eq(to.includes(it.to), true, "fresh at the game's places");
  eq(it.n % it.to !== 0, true, "fresh not already round");
}
console.log(`${n - bad} / ${n} ok`);
process.exit(bad ? 1 : 0);
