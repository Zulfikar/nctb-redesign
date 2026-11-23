// A3 (rules only so far): long division, web = server, the book's examples
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const web = await import(path.join(process.env.S || ".", "web/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 20) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const w = web.longDivWork(154, 9);
eq(w.steps.map((s) => [s.partial, s.q, s.p, s.d]), [[15, 1, 9, 6], [64, 7, 63, 1]], "p54 154÷9");
eq(web.longDivWork(941, 23).steps.map((s) => [s.partial, s.q, s.p, s.d]), [[94, 4, 92, 2], [21, 0, 0, 21]], "p59 941÷23 (a 0)");
eq(web.longDivWork(3266, 23).answer, [142, 0], "p59 3266÷23");
for (let k = 0; k < 5000; k++) {
  const b = 2 + Math.floor(Math.random() * 98), a = b + Math.floor(Math.random() * (99999 - b));
  const x = web.longDivWork(a, b);
  eq(x.answer, [Math.floor(a / b), a % b], `answer ${a}÷${b}`);
  const s = srv.normalizeWorkItem({ kind: "longdiv", a, b });
  eq(s ? s.answer : null, x.answer, `srv ${a}÷${b}`);
}
const fr = web.freshProblems({ skill: "longdiv", count: 10, digits: 4 });
eq(fr.length, 10, "fresh longdiv");
console.log(bad ? `FAILED ${bad} of ${n}` : `ALL OK (${n} checks)`);
