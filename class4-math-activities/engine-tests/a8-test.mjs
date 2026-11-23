// A8: the Class 4 book's units (litres, weeks/days, ages) and amounts in three units; web = server; Class 3's fresh
// time rounds unchanged (no weeks or days)
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const S = process.env.S;
const web = await import(path.join(S || ".", "web/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 25) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const both = (item, want, what) => { const s = srv.normalizeWorkItem(item); eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(item), want, `web ${what}`); };
// three units (p137, p138, p140, p141)
both({ kind: "units3", unit: "h", terms: [[2, 5, 58], [1, 14, 35]], ops: ["+"], layout: "column" }, [3, 20, 33], "p137 3");
both({ kind: "units3", unit: "h", terms: [[7, 0, 15], [4, 46, 35]], ops: ["−"], layout: "column" }, [2, 13, 40], "p138 (10)");
both({ kind: "units3", unit: "m", terms: [[17, 55, 4], [10, 74, 8]], ops: ["+"], layout: "column" }, [28, 30, 2], "p140 2(3)");
both({ kind: "units3", unit: "h", terms: [[5, 48, 25], [1, 35, 40]], ops: ["−"], layout: "column" }, [4, 12, 45], "p141 3(4)");
both({ kind: "units3", unit: "h", terms: [[6, 25, 0], [2, 10, 35]], ops: ["+"] }, [8, 35, 35], "p138 (7)");
both({ kind: "units3", unit: "m", terms: [[4, 65, 18], [7, 58, 9]], ops: ["+"] }, null, "18 mm is not a part (the book's slip)");
eq(srv.normalizeWorkItem({ kind: "units3", unit: "ঘণ্টা", terms: [[2, 5, 58], [1, 14, 35]], ops: ["+"], layout: "column" }).layout, "column", "units3 by its Bangla name");
// two units: ages, litres, weeks
both({ kind: "units", unit: "yr", terms: [[12, 7], [9, 9]], ops: ["+"] }, [22, 4], "p140 4 ages");
both({ kind: "units", unit: "yr", terms: [[12, 0], [10, 9]], ops: ["−"] }, [1, 3], "p142 10 ages");
both({ kind: "units", unit: "l", terms: [[24, 650], [16, 350]], ops: ["+"], layout: "column" }, [41, 0], "p141 3(3) litres");
both({ kind: "units", unit: "wk", terms: [[3, 5], [1, 4]], ops: ["+"] }, [5, 2], "weeks");
// changing the unit (p136–137, p140–141)
both({ kind: "convert", from: [[4, "day"]], to: "min" }, 5760, "4 দিন = মিনিট");
both({ kind: "convert", from: [[120, "h"]], to: "day" }, 5, "120 ঘণ্টা = দিন");
both({ kind: "convert", from: [[38, "day"]], to: ["wk", "day"] }, [5, 3], "38 দিন (সপ্তাহ, দিন)");
both({ kind: "convert", from: [[8, "wk"], [5, "day"]], to: "h" }, 1464, "8 সপ্তাহ 5 দিন = ঘণ্টা");
both({ kind: "convert", from: [[21, "day"]], to: "wk" }, 3, "21 দিন = সপ্তাহ");
both({ kind: "convert", from: [[1, "l"]], to: "ml" }, 1000, "1 লি = মিলি");
both({ kind: "convert", from: [[1, "l"]], to: "dl" }, 10, "1 লি = ডেলি");
both({ kind: "convert", from: [[1, "wk"]], to: "s" }, 604800, "1 সপ্তাহ = সেকেন্ড");
eq(srv.normalizeWorkItem({ kind: "convert", from: [[4, "দিন"]], to: "মিনিট" }).answer, 5760, "Bangla unit names");
// random: web = server
for (let k = 0; k < 3000; k++) {
  const unit = k % 2 ? "h" : "m", base = unit === "h" ? [60, 60] : [100, 10], R = (x) => Math.floor(Math.random() * x);
  const t = () => [R(20), R(base[0]), R(base[1])];
  const item = { kind: "units3", unit, terms: k % 3 ? [t(), t()] : [t(), t(), t()], ops: k % 3 ? [k % 4 ? "+" : "−"] : ["+", "−"], layout: "column" };
  const s = srv.normalizeWorkItem(item);
  eq(s ? s.answer : null, web.answerOf(item), `units3 ${JSON.stringify(item.terms)}`);
}
// fresh rounds: volume, days, ages askable; and Class 3's time conversions never use weeks or days
for (const unit of ["volume", "days", "age"]) for (const skill of ["units", "convert", "unitmix"]) {
  const fr = web.freshProblems({ skill, count: 10, unit, digits: 2 });
  eq(fr.length > 0, true, `fresh ${skill} ${unit}`);
  for (const f of fr) { const s = srv.normalizeWorkItem(f); eq(s ? s.answer : null, f.answer, `fresh ${skill} ${unit} ${JSON.stringify(f)}`); }
}
const time = web.freshProblems({ skill: "convert", count: 20, unit: "time" });
for (let r = 0; r < 25; r++) for (const f of web.freshProblems({ skill: "convert", count: 20, unit: "time" })) {
  const units = [...f.from.map((x) => x[1]), ...(Array.isArray(f.to) ? f.to : [f.to])];
  if (units.some((u) => u === "wk" || u === "day")) eq(units, "h/min/s only", "Class 3 time conversions");
}
console.log(bad ? `FAILED ${bad} of ${n}` : `ALL OK (${n} checks)`);
