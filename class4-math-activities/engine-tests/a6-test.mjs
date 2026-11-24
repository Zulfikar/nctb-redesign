// A6: mixed numbers (fmixed) and proper/improper (fsort): web = server, the book's own examples (pp ৯৭–৯৮), fresh
// rounds; Fraction Play's own "fraction" mix and old rounds unchanged
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const web = await import(path.join(process.env.S || ".", "web/work-it-out.mjs"));
const old = await import(path.join(process.env.S || ".", "old/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 20) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const both = (it, want, what) => { const s = srv.normalizeWorkItems([it], "fraction_play")[0]; eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(it), want, `web ${what}`); };
// the book: ৭/৪ = ১ ৩/৪ (p৯৮), ২ ১/৪ = (২×৪+১)/৪, the fifths' line to ৩ (p৯৮: ৬/৫ = ১ ১/৫, ১৩/৫ = ২ ৩/৫)
both({ kind: "fmixed", a: "৭/৪", ask: "tomixed" }, [1, 3], "p98 7/4");
both({ kind: "fmixed", a: "২ ১/৪", ask: "toimproper" }, 9, "p98 2 1/4");
both({ kind: "fmixed", n: 13, d: 5, ask: "tomixed", look: "line" }, [2, 3], "p98 13/5 on the line");
both({ kind: "fmixed", a: "1 1/5", ask: "place" }, 6, "p98 1 1/5 placed");
both({ kind: "fsort", want: "improper", fracs: ["৩/৫", "৩/৪", "৫/৫", "৪/৪", "৭/৫", "৫/৪", "৩/২"] }, ["5/5", "4/4", "7/5", "5/4", "3/2"], "p97 the table");
both({ kind: "fsort", want: "proper", fracs: ["3/5", "3/4", "1/2", "7/5", "5/5"] }, ["3/5", "3/4", "1/2"], "p97 proper");
const s1 = srv.normalizeWorkItems([{ kind: "fmixed", a: "2 1/4", ask: "place" }], "fraction_play")[0];
eq(s1 && [s1.n, s1.d, s1.look], [9, 4, "line"], "place is always a line");
// refused: a whole (৮/৪), less than 1, a bottom of 13, 6 wholes, a dense line, a mixed number with a big top, a sort with nothing to ring
for (const [it, what] of [[{ kind: "fmixed", a: "8/4" }, "a whole"], [{ kind: "fmixed", a: "3/4" }, "less than 1"], [{ kind: "fmixed", a: "14/13" }, "d 13"], [{ kind: "fmixed", a: "25/4" }, "6 wholes"],
  [{ kind: "fmixed", a: "50/12", look: "line" }, "a line of 60 marks"], [{ kind: "fmixed", a: "1 5/4" }, "1 5/4"], [{ kind: "fsort", want: "proper", fracs: ["7/5", "5/5", "9/4"] }, "no proper"], [{ kind: "fsort", want: "proper", fracs: ["1/2", "1/2", "3/4"] }, "twice"]]) {
  eq(srv.normalizeWorkItems([it], "fraction_play").length, 0, `srv refuses ${what}`); eq(web.answerOf(it), null, `web refuses ${what}`);
}
// every mixed number up to 5 wholes: the two ways back and forth
for (let d = 2; d <= 12; d++) for (let v = d + 1; v < 6 * d; v++) {
  if (v % d === 0) continue;
  const a = web.answerOf({ kind: "fmixed", n: v, d, ask: "tomixed" }), b = web.answerOf({ kind: "fmixed", a: `${a[0]} ${a[1]}/${d}`, ask: "toimproper" });
  eq(a[0] * d + a[1], v, `tomixed ${v}/${d}`); eq(b, v, `back ${v}/${d}`);
  eq(srv.normalizeWorkItems([{ kind: "fmixed", n: v, d, ask: "tomixed" }], "fraction_play")[0].answer, a, `srv ${v}/${d}`);
}
// a mixed round isn't a Work It Out round, and Fraction Play takes it
eq(srv.normalizeWorkItems([{ kind: "fmixed", a: "7/4" }], "work_it_out").length, 0, "not in work_it_out");
eq(srv.workItOutConfig({ fresh: { skill: "fmixed" } }, "fraction_play").fresh.skill, "fmixed", "config fmixed");
eq(srv.workItOutConfig({ fresh: { skill: "fsort" } }, "fraction_play").fresh.skill, "fsort", "config fsort");
// fresh rounds
for (const sk of ["fmixed", "fsort"]) for (let r = 0; r < 60; r++) {
  const fr = web.freshProblems({ skill: sk, count: 5 });
  eq(fr.length, 5, `fresh ${sk}`);
  for (const it of fr) { const s = srv.normalizeWorkItems([it], "fraction_play")[0]; eq(s ? s.answer : null, it.answer, `fresh srv ${sk}`); }
}
// the "fraction" mix makes only the old rounds; the old rounds' answers unchanged
for (let r = 0; r < 300; r++) for (const it of web.freshProblems({ skill: "fraction", count: 5 })) eq(web.FRACTION_KINDS.includes(it.kind), true, "the mix: old kinds only");
for (const it of [{ kind: "fline", n: 2, d: 5, ask: "read" }, { kind: "fline", n: 3, d: 4, ask: "place" }, { kind: "fname", n: 3, d: 4 }, { kind: "fadd", a: "1/5", op: "+", b: "2/5" }, { kind: "fcompare", a: "1/2", b: "1/3" }])
  eq(web.answerOf(it), old.answerOf(it), `old ${it.kind}`);
console.log(bad ? `FAILED ${bad} of ${n}` : `ALL OK (${n} checks)`);
process.exit(bad ? 1 : 0);
