// A4: number sentences (the Class 4 book's ch5): = ≠, ≮ ≯, true/false, signs in boxes, { } brackets; web = server;
// expressions with ( ) only work exactly as before
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const S = process.env.S;
const web = await import(path.join(S || ".", "web/work-it-out.mjs")), old = await import(path.join(S || ".", "old/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 25) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const both = (item, want, what) => { const s = srv.normalizeWorkItem(item); eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(item), want, `web ${what}`); };
// the book's own (p69, p71, p72, p79, p80)
const cmp = [["৪ × ৫", "২০", "eq", "="], ["৩৬ ÷ ১২", "৪", "eq", "≠"], ["১৪ × ৩", "৩৯ + ২", "eq", "≠"], ["৫৭ ÷ ৩", "২৩ − ২", "eq", "≠"],
  ["৬৫", "৫৬ + ৭", "not", "≮"], ["৩২ + ৮", "৫০", "not", "≯"], ["১৫ × ৫", "৮৫", "not", "≯"], ["৯৪ ÷ ২", "৪৫", "not", "≮"],
  ["৭ + ৩ × ৬", "(৭ + ৩) × ৬", undefined, "<"], ["৫২ − ১৫ + ১৩", "৫২ − (১৫ − ১৩)", undefined, "="], ["৫", "৫", "not", null]];
for (const [a, b, signs, want] of cmp) both({ kind: "compare", a, b, signs }, want, `${a} ? ${b} (${signs})`);
const truth = [["১৮ + ৯ = ২৭", "true"], ["২৭ ÷ ৪ = ৮", "false"], ["১৪ × ৩ < ৩৫ + ৪", "false"], ["৫৬ − ৭ = ৫০", "false"], ["৭২ ÷ ৯ ≯ ১০", "true"],
  ["১২ × ৭ ≠ ১৬৮ ÷ ২", "false"], ["৪৫ + ১৫ < ৬৫", "true"], ["৫৬ − ২৪ + ২০ = ৫৬ − (২৪ − ২০)", "true"], ["২০০ − ২৫ × ৪ ≠ (২০০ − ২৫) × ৪", "true"],
  ["৩২ ÷ ৪ ÷ ২ < ৩২ ÷ (৪ ÷ ২)", "true"], ["৪ × ৬ + ৩ × ৫ = ৪ × (৬ + ৩) × ৫", "false"], ["২৭ ÷ ৪ ≠ ৮", "true"], ["২৭ ÷ ৪ < ৮", null], ["৩ < ৯ < ১২", null]];
for (const [text, want] of truth) both({ kind: "truth", text }, want, text);
const ops = [["৬৯ □ ১৩ = ৭ □ ৮", ["−", "×"]], ["৫৮ □ ২৯ = ৯৬ □ ৯", ["+", "−"]], ["৯ □ ৭ = ১২৬০ □ ২০", ["×", "÷"]], ["৮৭ □ ৩৮ = ৭ □ ৭", ["−", "×"]], ["২ □ ২ = ৪", null]];
for (const [text, want] of ops) both({ kind: "opbox", text }, want, text);
both({ kind: "missing", text: "৪৯ ÷ □ = ৫৬ ÷ ৮" }, 7, "p80 4(1)");
both({ kind: "missing", text: "৫ + ৮ × □ = ৫৩" }, 6, "p80 4(2)");
both({ kind: "missing", text: "{□ − (৮০০ × ৪)} ÷ ২ = ২৫০০" }, 8200, "braces missing");
const st = (x) => (web.exprSteps(x) || []).map((s) => `${s.a}${s.op}${s.b}=${s.v}`).join(" ");
eq(st("{৩০০০ − (৪৮০ × ৩)} ÷ ৪"), "480×3=1440 3000−1440=1560 1560÷4=390", "p80 8 steps");
eq(st("{(১৮৫ × ২৫০) + ১০০০০} ÷ ৩০"), "185×250=46250 46250+10000=56250 56250÷30=1875", "p78 7 steps");
both({ kind: "expr", text: "{৮২০০ − (৮০০ × ৪)} ÷ ২" }, 2500, "p79 4");
both({ kind: "expr", text: "{(৩ + ৪) × ২)" }, null, "mismatched brackets");
eq(srv.normalizeWorkItem({ kind: "missing", text: "□ + ১২ = ১৮০", story: "একটি সংখ্যার সাথে ১২ যোগ করলে যোগফল ১৮০ হয়।" }).story, "একটি সংখ্যার সাথে ১২ যোগ করলে যোগফল ১৮০ হয়।", "story kept");
// expressions with ( ) only: the same steps as before; and random true/false + boxes: web = server
const R = (k) => 1 + Math.floor(Math.random() * k), O = ["+", "−", "×", "÷"];
for (let k = 0; k < 4000; k++) {
  const a = R(99), b = R(20), c = R(20), d = R(9), o1 = O[k % 4], o2 = O[(k >> 2) % 4], o3 = O[(k >> 4) % 4];
  const forms = [`${a} ${o1} ${b} ${o2} ${c}`, `(${a} ${o1} ${b}) ${o2} ${c}`, `${a} ${o1} (${b} ${o2} ${c}) ${o3} ${d}`, `(${a} ${o1} ${b}) ${o2} (${c} ${o3} ${d})`];
  const x = forms[k % 4];
  eq(JSON.stringify(web.exprSteps(x)), JSON.stringify(old.exprSteps(x)), `steps ${x}`);
  eq(web.evalMath(x), old.evalMath(x), `eval ${x}`);
  const sign = ["=", "≠", "<", ">", "≮", "≯"][k % 6], tx = `${x} ${sign} ${R(200)}`;
  eq(srv.truthOf(tx), web.truthOf(tx), `truth ${tx}`);
  const bx = `${a} □ ${b} = ${c} □ ${d}`;
  eq(srv.opsFor(bx), web.opsFor(bx), `opbox ${bx}`);
}
console.log(bad ? `FAILED ${bad} of ${n}` : `ALL OK (${n} checks)`);
