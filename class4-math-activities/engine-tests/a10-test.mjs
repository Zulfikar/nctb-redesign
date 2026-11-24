// A10: the protractor and clock hands (angle measure / draw / clock): web = server, the book's own (pp ১৪৩–১৪৯), the
// old angle rounds unchanged, fresh rounds
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const web = await import(path.join(process.env.S || ".", "web/work-it-out.mjs"));
const old = await import(path.join(process.env.S || ".", "old/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 20) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const norm = (it) => srv.normalizeWorkItems([it], "angles_dots")[0] || null;
const both = (it, want, what) => { const s = norm(it); eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(it), want, `web ${what}`); };
// the book: ∠ক measured (p১৪৪), a 50° angle drawn (p১৪৬), the set squares (30°, 45°, 60°, 90°), the clocks (p১৪৯)
both({ kind: "angle", ask: "measure", deg: 50 }, 50, "measure 50");
both({ kind: "angle", ask: "measure", deg: "১২০", from: "left" }, 120, "measure 120 from the left");
both({ kind: "angle", ask: "draw", deg: 50 }, 50, "p146 draw 50");
for (const d of [30, 45, 60, 90]) both({ kind: "angle", ask: "measure", deg: d }, d, `set square ${d}`);
for (const [h, m, want] of [[3, 0, 90], [2, 0, 60], [6, 0, 180], [4, 30, 45], [12, 30, 165], [9, 0, 90], [1, 30, 135]]) both({ kind: "angle", ask: "clock", h, m }, want, `clock ${h}:${m}`);
eq(norm({ kind: "angle", ask: "measure", deg: 70, from: "left" }).from, "left", "from kept");
// refused: 0°, 181°, 12:00, 4:15
for (const [it, what] of [[{ kind: "angle", ask: "measure", deg: 0 }, "0°"], [{ kind: "angle", ask: "draw", deg: 181 }, "181°"], [{ kind: "angle", ask: "clock", h: 12, m: 0 }, "12:00"], [{ kind: "angle", ask: "clock", h: 4, m: 15 }, "4:15"]]) {
  eq(norm(it), null, `srv refuses ${what}`); eq(web.answerOf(it), null, `web refuses ${what}`);
}
// every clock: web = server = the hands' angle worked another way (the hour hand moves half a degree a minute)
for (let h = 1; h <= 12; h++) for (const m of [0, 30]) {
  const hh = ((h % 12) * 60 + m) * 0.5, mm = m * 6, a = Math.abs(hh - mm), want = Math.min(a, 360 - a) || null;
  eq(web.clockAngle(h, m), want, `clock ${h}:${m}`); eq(srv.clockAngle(h, m), want, `srv clock ${h}:${m}`);
}
// the old angle rounds (name, make) unchanged
for (const it of [{ kind: "angle", deg: 45 }, { kind: "angle", deg: 90, rot: 30 }, { kind: "angle", ask: "make", type: "obtuse" }, { kind: "angle", deg: 180 }]) {
  eq(web.answerOf(it), old.answerOf(it), `old ${JSON.stringify(it)}`);
  const s = norm(it); eq(s && s.ask, it.ask === "make" ? "make" : "name", "old ask kept");
}
for (let r = 0; r < 200; r++) for (const it of web.freshProblems({ skill: "angle", count: 3 })) eq(["name", "make", undefined].includes(it.ask), true, "the old fresh angles: name or make only");
// fresh protractor rounds
eq(srv.workItOutConfig({ fresh: { skill: "protractor" } }, "angles_dots").fresh.skill, "protractor", "config protractor");
for (let r = 0; r < 200; r++) for (const it of web.freshProblems({ skill: "protractor", count: 5 })) { const s = norm(it); eq(s ? s.answer : null, it.answer, `fresh ${it.ask}`); }
console.log(bad ? `FAILED ${bad} of ${n}` : `ALL OK (${n} checks)`);
process.exit(bad ? 1 : 0);
