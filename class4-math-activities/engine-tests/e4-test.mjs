// E4 (24 Nov 2026, «এসো, গণিত শিখি!» Book #01 pp.49–50, Book #02 p.28): arrays, counted (rows, each row, in all) or
// made into equal rows on a dot grid. Web = server; refused items; fresh rounds valid and in the game's way.
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const web = await import(path.join(process.env.S || ".", "web/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 20) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const both = (it, want, what) => { const s = srv.normalizeWorkItem(it); eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(it), want, `web ${what}`); };
// the books' pages
both({ kind: "array", rows: 3, cols: 4, emoji: "🍓" }, [3, 4, 12], "B1 p49 3 rows of 4");
both({ kind: "array", rows: 4, cols: 3, emoji: "🍓" }, [4, 3, 12], "B1 p49 4 rows of 3");
both({ kind: "array", rows: 6, cols: 6, emoji: "🌱" }, [6, 6, 36], "B1 p50 dice 6 and 6");
both({ kind: "array", rows: 2, cols: 6, sign: "×", emoji: "⭐" }, [2, 6, 12], "B2 p28 2 × 6");
both({ kind: "array", ask: "build", total: 12, rows: 2 }, 12, "B1 p49 12 in 2 rows");
both({ kind: "array", ask: "build", total: 12 }, 12, "12 in any rows");
both({ kind: "array", ask: "build", total: 7 }, 7, "7: one row");
both({ kind: "array", ask: "build", total: 60, rows: 6 }, 60, "60 in 6 rows of 10");
// the server keeps what the player needs
const s1 = srv.normalizeWorkItem({ kind: "array", rows: 3, cols: 4, emoji: " 🍓 " });
eq([s1.ask, s1.rows, s1.cols, s1.sign, s1.emoji, s1.total], ["count", 3, 4, "+", "🍓", undefined], "count kept");
const s2 = srv.normalizeWorkItem({ kind: "array", ask: "build", total: 12, sign: "×" });
eq([s2.ask, s2.total, s2.rows, s2.sign, s2.emoji, s2.cols], ["build", 12, undefined, "×", undefined, undefined], "build kept (no rows)");
eq(srv.normalizeWorkItem({ kind: "array", ask: "build", total: 12, rows: 3 }).rows, 3, "build rows kept");
// refused: a prime above 10 (no rows fit on the grid), rows that don't divide, more than 6 rows or 10 across, too big, 11 rows
for (const [it, what] of [[{ kind: "array", ask: "build", total: 13 }, "13 doesn't fit"], [{ kind: "array", ask: "build", total: 12, rows: 5 }, "12 in 5 rows"],
  [{ kind: "array", ask: "build", total: 14, rows: 7 }, "7 rows"], [{ kind: "array", ask: "build", total: 22, rows: 2 }, "11 across"], [{ kind: "array", ask: "build", total: 61 }, "61"],
  [{ kind: "array", ask: "build", total: 1 }, "1"], [{ kind: "array", rows: 11, cols: 2 }, "11 rows"], [{ kind: "array", rows: 3 }, "no cols"], [{ kind: "array", rows: 0, cols: 4 }, "0 rows"]]) {
  eq(srv.normalizeWorkItem(it), null, `srv refuses ${what}`); eq(web.answerOf(it), null, `web refuses ${what}`);
}
// the old kinds unchanged; Work It Out takes it
both({ kind: "hops", start: 9, n: 4 }, 13, "hops still");
both({ kind: "round", n: 3472, to: 100 }, 3500, "round still");
eq(srv.normalizeWorkItems([{ kind: "array", rows: 3, cols: 4 }], "work_it_out").length, 1, "Work It Out takes arrays");
// fresh rounds in the game's own way
const KINDS = [{ ask: "count", sign: "+", emoji: "🍓", rows: false }, { ask: "count", sign: "×", emoji: "", rows: false }, { ask: "build", sign: "+", emoji: "🌱", rows: true }, { ask: "build", sign: "+", emoji: "", rows: false }];
for (let i = 0; i < 400; i++) {
  const k = KINDS[i % KINDS.length];
  const [it] = web.freshProblems({ skill: "array", count: 1, arrayKinds: [k] });
  if (!it) { eq("none", "a round", `fresh ${JSON.stringify(k)}`); continue; }
  const s = srv.normalizeWorkItem(it);
  eq(!!s, true, `fresh valid ${JSON.stringify(it)}`);
  if (!s) continue;
  eq(s.answer, web.answerOf(it), `fresh same ${JSON.stringify(it)}`);
  eq([s.ask, s.sign, s.rows != null], [k.ask, k.sign, k.ask === "count" || k.rows], `fresh keeps the way ${JSON.stringify(it)}`);
  if (k.emoji) eq(s.emoji, k.emoji, "fresh keeps the thing");
}
console.log(`${n - bad} / ${n} ok`);
process.exit(bad ? 1 : 0);
