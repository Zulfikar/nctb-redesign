// A5: factors and primes (nmark, sieve, fpairs, ftree): web = server, the book's own examples (pp ৮১–৯৬), fresh rounds
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const web = await import(path.join(process.env.S || ".", "web/work-it-out.mjs"));
const old = await import(path.join(process.env.S || ".", "old/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 20) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const both = (it, want, what) => { const s = srv.normalizeWorkItem(it); eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(it), want, `web ${what}`); };
// the book
both({ kind: "nmark", rule: "multiple", n: 2, from: 1, to: 20 }, [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], "p81 multiples of 2");
both({ kind: "nmark", rule: "multiple", n: 3, from: 1, to: 20 }, [3, 6, 9, 12, 15, 18], "p81 multiples of 3");
both({ kind: "nmark", rule: "factor", n: 4, from: 1, to: 4 }, [1, 2, 4], "p84 factors of 4");
both({ kind: "nmark", rule: "factor", n: 16, nums: ["৪", "৫", "৬", "৭", "৮", "৯", "১২", "১৬"] }, [4, 8, 16], "p86 factors of 16");
both({ kind: "nmark", rule: "factor", n: 18, nums: [3, 4, 6, 8, 9, 12, 15, 18] }, [3, 6, 9, 18], "p86 factors of 18");
both({ kind: "nmark", rule: "factor", n: 24, nums: [3, 4, 6, 8, 9, 12, 15, 24] }, [3, 4, 6, 8, 12, 24], "p86 factors of 24");
both({ kind: "nmark", rule: "div", n: 10, nums: [28, 40, 110, 115, 138, 150, 185, 190, 225, 230, 360, 400, 425] }, [40, 110, 150, 190, 230, 360, 400], "p94 by 10");
both({ kind: "nmark", rule: "prime", from: 1, to: 15 }, [2, 3, 5, 7, 11, 13], "p90 primes to 15");
both({ kind: "nmark", rule: "composite", from: 1, to: 15 }, [4, 6, 8, 9, 10, 12, 14, 15], "p90 composites to 15 (1 is neither)");
both({ kind: "sieve" }, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97], "p88 sieve");
eq(web.sieveOf({}).sievers, [2, 3, 5, 7], "sieve: 2, 3, 5, 7 cross out");
eq(web.sieveOf({ to: 48 }).sievers, [2, 3, 5], "sieve to 48: 7² > 48");
both({ kind: "fpairs", n: 8 }, [[1, 8], [2, 4]], "p86 pairs of 8");
both({ kind: "fpairs", n: 12 }, [[1, 12], [2, 6], [3, 4]], "p86 pairs of 12");
both({ kind: "fpairs", n: 11 }, [[1, 11]], "p86 pairs of 11");
both({ kind: "fpairs", n: 36 }, [[1, 36], [2, 18], [3, 12], [4, 9], [6, 6]], "pairs of 36 (6 × 6 once)");
for (const [x, f] of [[30, [2, 3, 5]], [12, [2, 2, 3]], [18, [2, 3, 3]], [9, [3, 3]], [70, [2, 5, 7]], [24, [2, 2, 2, 3]], [10, [2, 5]], [20, [2, 2, 5]]]) both({ kind: "ftree", n: x }, f, `p89–91 ${x}`);
// refused: a prime tree, a chart too long, a rule without n, nothing fits, 0 in a list
for (const [it, what] of [[{ kind: "ftree", n: 13 }, "prime tree"], [{ kind: "ftree", n: 512 }, "9 prime factors"], [{ kind: "nmark", rule: "multiple", from: 1, to: 20 }, "no n"],
  [{ kind: "nmark", rule: "prime", nums: [4, 6, 8] }, "no prime"], [{ kind: "nmark", rule: "prime", from: 1, to: 200 }, "chart of 200"], [{ kind: "nmark", rule: "prime", nums: [0, 2, 3] }, "a 0"],
  [{ kind: "fpairs", n: 101 }, "pairs of 101"], [{ kind: "sieve", to: 10 }, "a sieve to 10"]]) {
  eq(srv.normalizeWorkItem(it), null, `srv refuses ${what}`); eq(web.answerOf(it), null, `web refuses ${what}`);
}
// the rules against plain arithmetic
for (let v = 1; v <= 300; v++) {
  let f = 0; for (let d = 1; d <= v; d++) if (v % d === 0) f++;
  eq(web.isPrime(v), f === 2, `prime ${v}`); eq(srv.isPrime(v), f === 2, `srv prime ${v}`);
  eq(web.factorsOf(v).length, f, `factors ${v}`);
  eq(web.primeFactors(v).reduce((a, b) => a * b, 1), v, `prime factors multiply back ${v}`);
  eq(web.primeFactors(v).every((p) => web.isPrime(p)), true, `prime factors are prime ${v}`);
  eq(srv.primeFactors(v), web.primeFactors(v), `srv prime factors ${v}`);
  eq(srv.factorPairs(v), web.factorPairs(v), `srv pairs ${v}`);
}
// a random list: web = server, as stored
for (let k = 0; k < 2000; k++) {
  const rule = web.MARK_RULES[k % 5], nums = [...new Set(Array.from({ length: 3 + (k % 20) }, () => 1 + Math.floor(Math.random() * 200)))];
  const it = { kind: "nmark", rule, n: 2 + (k % 30), nums };
  const s = srv.normalizeWorkItem(it), w = web.answerOf(it);
  eq(s ? s.answer : null, w, `random ${rule} ${it.n}`);
  if (s) eq(s.answer, nums.filter((v) => rule === "multiple" || rule === "div" ? v % it.n === 0 : rule === "factor" ? it.n % v === 0 : rule === "prime" ? web.isPrime(v) : v > 1 && !web.isPrime(v)), `random by hand ${rule}`);
}
// fresh rounds: each one the server keeps, the same answer; a game's own rule kept
for (const f of [{ skill: "mark" }, { skill: "mark", markRules: [{ rule: "multiple", n: 7 }] }, { skill: "mark", markRules: [{ rule: "div", n: 5 }] }, { skill: "mark", markRules: [{ rule: "factor", n: 24 }] }, { skill: "mark", markRules: [{ rule: "prime" }] }, { skill: "mark", markRules: [{ rule: "composite" }] }, { skill: "fpairs" }, { skill: "ftree" }, { skill: "ftree", treeAsk: "line" }]) {
  for (let r = 0; r < 40; r++) {
    const fr = web.freshProblems({ ...f, count: 5 });
    eq(fr.length, 5, `fresh ${JSON.stringify(f)} count`);
    for (const it of fr) {
      const s = srv.normalizeWorkItem(it);
      eq(s ? s.answer : null, it.answer, `fresh srv ${it.kind}`);
      if (f.markRules) eq(it.rule, f.markRules[0].rule, "fresh keeps the rule");
      if (f.markRules && f.markRules[0].n && f.markRules[0].rule !== "factor") eq(it.n, f.markRules[0].n, "fresh keeps n");
      if (it.kind === "nmark" && it.nums) eq(it.nums, it.nums.slice().sort((a, b) => a - b), "fresh list smallest first");
      if (it.kind === "ftree") { eq(it.ask, f.treeAsk === "line" ? "line" : "tree", "fresh tree ask"); eq(it.answer.length >= 2 && it.answer.length <= 4, true, "fresh tree 2–4 primes"); }
    }
  }
}
// the server takes the new skills; old rules unchanged for the old kinds
for (const sk of ["mark", "fpairs", "ftree"]) eq(srv.workItOutConfig({ fresh: { skill: sk } }, "work_it_out").fresh.skill, sk, `config ${sk}`);
for (const it of [{ kind: "sum", a: 25, op: "+", b: 37 }, { kind: "missing", text: "□ × 3 = 18" }, { kind: "divrem", a: 27, b: 4 }]) eq(web.answerOf(it), old.answerOf(it), `old ${it.kind}`);
console.log(bad ? `FAILED ${bad} of ${n}` : `ALL OK (${n} checks)`);
process.exit(bad ? 1 : 0);
