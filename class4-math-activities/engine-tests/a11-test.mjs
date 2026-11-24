// A11: lines (perpendicular, parallel, neither) and triangles (by sides, by angles): web = server, the book's own
// (pp ১৫০–১৬৫), fresh rounds; the old geometry rounds and the "geomix" fresh mix unchanged
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
both({ kind: "lines", a: 0, b: 90 }, "perp", "the roads at a right angle");
both({ kind: "lines", a: 0, b: 90, cross: false }, "perp", "p151 apart: perpendicular when made longer");
both({ kind: "lines", a: 30, b: 120 }, "perp", "turned");
both({ kind: "lines", a: 45, b: 45 }, "par", "parallel");
both({ kind: "lines", a: 0, b: 60 }, "neither", "neither");
both({ kind: "lines", a: 10, b: 170 }, "neither", "160° apart");
eq(norm({ kind: "lines", a: 0, b: 90, cross: false }).cross, false, "apart kept");
both({ kind: "triangle", sides: [7, 5, 4] }, "scalene", "p158 7, 5, 4 cm");
both({ kind: "triangle", sides: [5, 5, 5] }, "equilateral", "p159 5 cm all");
both({ kind: "triangle", ask: "sides", sides: ["৫", "৫", "৩"] }, "isosceles", "5, 5, 3");
both({ kind: "triangle", ask: "angles", angles: [60, 60, 60] }, "acute", "60s");
both({ kind: "triangle", ask: "angles", angles: [30, 60, 90] }, "right", "the set square");
both({ kind: "triangle", ask: "angles", angles: [120, 30, 30] }, "obtuse", "120");
for (const [it, what] of [[{ kind: "lines", a: 0, b: 180 }, "180°"], [{ kind: "triangle", sides: [1, 2, 3] }, "flat"], [{ kind: "triangle", sides: [2, 2, 25] }, "25 cm"], [{ kind: "triangle", ask: "angles", angles: [60, 60, 70] }, "190°"], [{ kind: "triangle", ask: "angles", angles: [0, 90, 90] }, "0°"]]) {
  eq(norm(it), null, `srv refuses ${what}`); eq(web.answerOf(it), null, `web refuses ${what}`);
}
for (let a = 0; a < 180; a++) for (let b = 0; b < 180; b += 7) { const w = web.answerOf({ kind: "lines", a, b }); eq(norm({ kind: "lines", a, b }).answer, w, `lines ${a} ${b}`); eq(w, Math.abs(a - b) === 90 ? "perp" : a === b ? "par" : "neither", `lines by hand ${a} ${b}`); }
for (let a = 1; a <= 12; a++) for (let b = 1; b <= 12; b++) for (let c = 1; c <= 12; c++) { const s = norm({ kind: "triangle", sides: [a, b, c] }); eq(s ? s.answer : null, web.answerOf({ kind: "triangle", sides: [a, b, c] }), `sides ${a} ${b} ${c}`); }
// the old rounds and mixes
for (const it of [{ kind: "angle", deg: 45 }, { kind: "dots", task: "rect", w: 6, h: 5 }, { kind: "coord", x: 2, y: 3 }, { kind: "cubes", l: 3, w: 2, h: 2 }]) eq(web.answerOf(it), old.answerOf(it), `old ${it.kind}`);
for (let r = 0; r < 200; r++) for (const it of web.freshProblems({ skill: "geomix", count: 3 })) eq(["angle", "dots"].includes(it.kind), true, "geomix: angles and dots only");
for (const sk of ["lines", "triangle"]) {
  eq(srv.workItOutConfig({ fresh: { skill: sk } }, "angles_dots").fresh.skill, sk, `config ${sk}`);
  const seen = new Set();
  for (let r = 0; r < 200; r++) for (const it of web.freshProblems({ skill: sk, count: 5 })) { const s = norm(it); eq(s ? s.answer : null, it.answer, `fresh ${sk}`); seen.add(it.answer); }
  eq(seen.size, sk === "lines" ? 3 : 6, `fresh ${sk}: every answer comes`);
}
console.log(bad ? `FAILED ${bad} of ${n}` : `ALL OK (${n} checks)`);
process.exit(bad ? 1 : 0);
