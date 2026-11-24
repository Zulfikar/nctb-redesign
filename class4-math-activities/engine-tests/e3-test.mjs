// E3 (24 Nov 2026, «এসো, গণিত শিখি!» Book #01 pp.29, 39, Book #02 p.37): number-line hops, where you land (n hops) or
// how many hops (on to an end). Web = server; the line's defaults; refused items; fresh rounds valid and in the game's way.
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const web = await import(path.join(process.env.S || ".", "web/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 20) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const both = (it, want, what) => { const s = srv.normalizeWorkItem(it); eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(it), want, `web ${what}`); };
// the books' pages
both({ kind: "hops", start: 9, n: 4 }, 13, "B1 p29 ৯ + ৪");
both({ kind: "hops", start: 6, n: 5, dir: "+" }, 11, "B1 p29 ৬ + ৫");
both({ kind: "hops", start: 12, n: 3 }, 15, "B1 p29 ১২ + ৩");
both({ kind: "hops", start: 15, n: 6, dir: "-" }, 9, "B1 p39 ১৫ − ৬");
both({ kind: "hops", start: 20, n: 4, dir: "−" }, 16, "B1 p39 ২০ − ৪ (the − sign)");
both({ kind: "hops", start: 9, end: 14 }, 5, "B1 p39 ৯ থেকে ১৪: ৫টি লাফ");
both({ kind: "hops", start: 13, end: 10, dir: "-" }, 3, "back from 13 to 10: 3 hops");
both({ kind: "hops", start: 20, step: 5, dir: "-", end: 0 }, 4, "B2 p37 ২০ থেকে ৫ করে ০: ৪টি");
both({ kind: "hops", start: 0, step: 3, end: 18 }, 6, "0 to 18 in 3s");
both({ kind: "hops", start: 10, step: 2, n: 4 }, 18, "10 + 2 + 2 + 2 + 2");
both({ kind: "hops", start: 45, n: 3, dir: "+", from: 40, to: 60 }, 48, "a line 40–60");
// the line: 0–20 by default, else the tens around the hops
const h1 = srv.normalizeWorkItem({ kind: "hops", start: 9, n: 4 });
eq([h1.from, h1.to, h1.ask, h1.step, h1.dir, h1.n, h1.end], [0, 20, "land", 1, "+", 4, undefined], "server keeps the land round");
const h2 = srv.normalizeWorkItem({ kind: "hops", start: 20, step: 5, dir: "-", end: 0 });
eq([h2.from, h2.to, h2.ask, h2.end, h2.n], [0, 20, "count", 0, undefined], "server keeps the count round");
eq(web.hopsOf({ kind: "hops", start: 34, n: 5 }).from, 30, "34 + 5: the line from 30");
eq(web.hopsOf({ kind: "hops", start: 34, n: 5 }).to, 40, "… to 40");
eq(web.hopsOf({ kind: "hops", start: 9, n: 4 }).points, [9, 10, 11, 12, 13], "the points");
eq(web.hopsOf({ kind: "hops", start: 20, step: 5, dir: "-", end: 0 }).points, [20, 15, 10, 5, 0], "the points back");
// refused: past the line, an end the hops don't reach, a step of 0 or 11, 13 hops, no hops, below 0
for (const [it, what] of [[{ kind: "hops", start: 18, n: 4, from: 0, to: 20 }, "past the line"], [{ kind: "hops", start: 20, step: 3, dir: "-", end: 0 }, "end not reached"],
  [{ kind: "hops", start: 2, step: 0, n: 3 }, "step 0"], [{ kind: "hops", start: 2, step: 11, n: 1 }, "step 11"], [{ kind: "hops", start: 0, n: 13, to: 20 }, "13 hops"],
  [{ kind: "hops", start: 5, n: 0 }, "no hops"], [{ kind: "hops", start: 3, n: 5, dir: "-" }, "below 0"], [{ kind: "hops", start: 9, end: 4 }, "end the wrong way"], [{ kind: "hops", n: 3 }, "no start"]]) {
  eq(srv.normalizeWorkItem(it), null, `srv refuses ${what}`); eq(web.answerOf(it), null, `web refuses ${what}`);
}
// the old kinds unchanged
both({ kind: "round", n: 3472, to: 100 }, 3500, "round still");
both({ kind: "nmark", rule: "skip", n: 5, from: 1, to: 20 }, [5, 10, 15, 20], "nmark still");
eq(srv.normalizeWorkItems([{ kind: "hops", start: 9, n: 4 }], "work_it_out").length, 1, "Work It Out takes hops");
eq(srv.normalizeWorkItems([{ kind: "hops", start: 9, n: 4 }], "number_line").length, 0, "Number Line doesn't");
// fresh rounds in the game's own way: valid on both sides, its way, step, ask and line kept; to 0 kept
const KINDS = [{ dir: "+", step: 1, ask: "land", from: 0, to: 20 }, { dir: "-", step: 1, ask: "land", from: 0, to: 20 }, { dir: "+", step: 1, ask: "count", from: 0, to: 20 },
  { dir: "-", step: 5, ask: "count", from: 0, to: 20, edge: true }, { dir: "+", step: 2, ask: "land", from: 0, to: 30 }, { dir: "-", step: 10, ask: "count", from: 0, to: 100, edge: true }];
for (let i = 0; i < 600; i++) {
  const k = KINDS[i % KINDS.length];
  const [it] = web.freshProblems({ skill: "hops", count: 1, hopKinds: [k] });
  if (!it) { eq("none", "a round", `fresh ${JSON.stringify(k)}`); continue; }
  const s = srv.normalizeWorkItem(it);
  eq(!!s, true, `fresh valid ${JSON.stringify(it)}`);
  if (!s) continue;
  eq(s.answer, web.answerOf(it), `fresh same ${JSON.stringify(it)}`);
  eq([s.dir, s.step, s.ask, s.from, s.to], [k.dir, k.step, k.ask, k.from, k.to], `fresh keeps the way ${JSON.stringify(it)}`);
  if (k.edge) eq(s.end, 0, `fresh to 0 ${JSON.stringify(it)}`);
}
const [g] = web.freshProblems({ skill: "hops", count: 1 });
eq(!!(g && srv.normalizeWorkItem(g)), true, "fresh with no game kinds");
console.log(`${n - bad} / ${n} ok`);
process.exit(bad ? 1 : 0);
