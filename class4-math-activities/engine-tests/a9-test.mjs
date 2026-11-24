// A9: dates (date): web = server, the book's own calendar (p১৩৯), every date of 1900–2100 against JavaScript's own
// calendar, fresh rounds
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const web = await import(path.join(process.env.S || ".", "web/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 20) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const both = (it, want, what) => { const s = srv.normalizeWorkItem(it); eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(it), want, `web ${what}`); };
// the book: its three months (p১৩৯ drawn by code), and the days it names
eq(web.monthOf(2025, 6), { first: 0, days: 30 }, "June 2025 starts on a Sunday");
eq(web.monthOf(2025, 9), { first: 1, days: 30 }, "September 2025 on a Monday");
eq(web.monthOf(2026, 1), { first: 4, days: 31 }, "January 2026 on a Thursday");
eq(web.monthOf(2024, 2).days, 29, "February 2024: 29 days");
eq(web.monthOf(1900, 2).days, 28, "February 1900: 28 days");
both({ kind: "date", y: 1971, m: 12, d: 16 }, [16, 12, 1971], "p139 Victory Day");
both({ kind: "date", y: "১৯৭১", m: "১২", d: "১৬", ask: "weekday" }, 4, "16 Dec 1971 a Thursday");
both({ kind: "date", y: 2025, m: 6, d: 30, ask: "write" }, [30, 6, 2025], "p139 the ringed 30 June");
both({ kind: "date", y: 2025, m: 9, d: 8, ask: "between", d2: 25 }, 17, "8 to 25 Sept");
both({ kind: "date", y: 2026, m: 1, d: 1, ask: "after", n: 20 }, 21, "20 days after 1 Jan");
// refused
for (const [it, what] of [[{ kind: "date", y: 2025, m: 2, d: 29 }, "29 Feb 2025"], [{ kind: "date", y: 2025, m: 13, d: 1 }, "month 13"], [{ kind: "date", y: 1800, m: 1, d: 1 }, "1800"],
  [{ kind: "date", y: 2025, m: 9, d: 8, ask: "between", d2: 8 }, "between the same day"], [{ kind: "date", y: 2025, m: 9, d: 25, ask: "after", n: 10 }, "past the month"]]) {
  eq(srv.normalizeWorkItem(it), null, `srv refuses ${what}`); eq(web.answerOf(it), null, `web refuses ${what}`);
}
// every date's weekday, web = server = JavaScript's own (the 1st of each month 1900–2100, and every day of 2000 and 2026)
for (let y = 1900; y <= 2100; y++) for (let m = 1; m <= 12; m++) {
  const want = new Date(y, m - 1, 1).getDay();
  eq(web.answerOf({ kind: "date", y, m, d: 1, ask: "weekday" }), want, `weekday 1/${m}/${y}`);
  eq(srv.monthOf(y, m), web.monthOf(y, m), `srv month ${m}/${y}`);
}
for (const y of [2000, 2026]) for (let m = 1; m <= 12; m++) for (let d = 1; d <= web.monthOf(y, m).days; d++) eq(srv.normalizeWorkItem({ kind: "date", y, m, d, ask: "weekday" }).answer, new Date(y, m - 1, d).getDay(), `day ${d}/${m}/${y}`);
// the server keeps what the player needs
const s = srv.normalizeWorkItem({ kind: "date", y: 1971, m: 12, d: 16, show: "words", sep: ".", text: "আমাদের মহান বিজয় দিবস কত তারিখে?" });
eq([s.show, s.sep, s.text], ["words", ".", "আমাদের মহান বিজয় দিবস কত তারিখে?"], "show, sep, text kept");
eq(srv.workItOutConfig({ fresh: { skill: "date" } }, "work_it_out").fresh.skill, "date", "config date");
// fresh
for (let r = 0; r < 200; r++) for (const it of web.freshProblems({ skill: "date", count: 5 })) { const x = srv.normalizeWorkItem(it); eq(x ? x.answer : null, it.answer, `fresh ${it.ask}`); }
console.log(bad ? `FAILED ${bad} of ${n}` : `ALL OK (${n} checks)`);
process.exit(bad ? 1 : 0);
