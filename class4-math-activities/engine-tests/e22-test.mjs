// E22 (24 Nov 2026, «এসো, গণিত শিখি!» Books #01–#02): the tap-the-numbers round counts on in steps (skip), and rings
// even and odd numbers. Web = server; the old rules unchanged; fresh rounds valid.
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const web = await import(path.join(process.env.S || ".", "web/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 20) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const both = (it, want, what) => { const s = srv.normalizeWorkItem(it); eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(it), want, `web ${what}`); };
const span = (a, z, st = 1) => Array.from({ length: Math.floor((z - a) / st) + 1 }, (_, i) => a + i * st);
// the books' pages
both({ kind: "nmark", rule: "skip", n: 10, from: 1, to: 100 }, span(10, 100, 10), "B1 p22 the 10s on the hundred chart");
both({ kind: "nmark", rule: "skip", n: 5, from: 1, to: 100 }, span(5, 100, 5), "B1 p22 the 5s");
both({ kind: "nmark", rule: "skip", n: 2, from: 1, to: 30 }, span(2, 30, 2), "B1 p24 in 2s");
both({ kind: "nmark", rule: "skip", n: 10, start: 3, from: 1, to: 60 }, [3, 13, 23, 33, 43, 53], "10s from 3");
both({ kind: "nmark", rule: "skip", n: 5, start: 15, nums: [5, 10, 15, 20, 22, 25, 30] }, [15, 20, 25, 30], "5s from 15 (before the start: no)");
both({ kind: "nmark", rule: "even", from: 1, to: 20 }, span(2, 20, 2), "B1 p46 even to 20");
both({ kind: "nmark", rule: "odd", from: 1, to: 20 }, span(1, 19, 2), "odd to 20");
both({ kind: "nmark", rule: "even", nums: [13, 26, 31, 48, 57, 60] }, [26, 48, 60], "even in a list");
both({ kind: "nmark", rule: "skip", n: 6, from: 1, to: 60 }, span(6, 60, 6), "B2 p29 the 6s");
// the start is kept on the server; refused: a step of 1 or 51, a start of 0, nothing fits
eq(srv.normalizeWorkItem({ kind: "nmark", rule: "skip", n: 10, start: 3, from: 1, to: 40 }).start, 3, "start kept");
eq(srv.normalizeWorkItem({ kind: "nmark", rule: "skip", n: 5, from: 1, to: 40 }).start, 5, "start = n by default");
for (const [it, what] of [[{ kind: "nmark", rule: "skip", n: 1, from: 1, to: 20 }, "step 1"], [{ kind: "nmark", rule: "skip", n: 51, from: 1, to: 99 }, "step 51"], [{ kind: "nmark", rule: "skip", n: 5, start: 0, from: 1, to: 20 }, "start 0"], [{ kind: "nmark", rule: "odd", nums: [2, 4, 6] }, "no odd"]]) {
  eq(srv.normalizeWorkItem(it), null, `srv refuses ${what}`); eq(web.answerOf(it), null, `web refuses ${what}`);
}
// the old rules unchanged
both({ kind: "nmark", rule: "multiple", n: 4, from: 1, to: 20 }, [4, 8, 12, 16, 20], "multiples");
both({ kind: "nmark", rule: "factor", n: 12, from: 1, to: 12 }, [1, 2, 3, 4, 6, 12], "factors");
both({ kind: "nmark", rule: "prime", from: 1, to: 20 }, [2, 3, 5, 7, 11, 13, 17, 19], "primes");
// fresh rounds from a game's own rules: valid on both sides, the game's step and start kept
for (let i = 0; i < 300; i++) {
  const r = [{ rule: "skip", n: 5 }, { rule: "skip", n: 10, start: 3 }, { rule: "even" }, { rule: "odd" }, { rule: "skip" }][i % 5];
  const [it] = web.freshProblems({ skill: "mark", count: 1, markRules: [r] });
  if (!it) { eq("none", "a round", `fresh ${JSON.stringify(r)}`); continue; }
  const s = srv.normalizeWorkItem(it);
  eq(!!s, true, `fresh valid ${JSON.stringify(it)}`);
  if (s) eq(s.answer, web.answerOf(it), `fresh same ${JSON.stringify(it)}`);
  if (r.n) eq(it.n, r.n, "fresh keeps the step");
  if (r.start) eq(it.start, r.start, "fresh keeps the start");
}
console.log(`${n - bad} / ${n} ok`);
process.exit(bad ? 1 : 0);
