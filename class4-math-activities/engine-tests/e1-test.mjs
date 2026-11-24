// E1 (24 Nov 2026, «এসো, গণিত শিখি!» Book #01 pp.11, 17, 19, 28, 30, Book #02 pp.9, 18): the tens board (ten-frames,
// bundles and sticks, blocks): read, make, add. Web = server; boards; refused items; fresh rounds valid, in the game's way.
import { createRequire } from "module";
import path from "path";
const require = createRequire(import.meta.url);
const web = await import(path.join(process.env.S || ".", "web/work-it-out.mjs"));
const srv = require(path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/work-it-out.helper.js"));
let bad = 0, n = 0;
const eq = (a, b, what) => { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { bad++; if (bad < 20) console.log("DIFF", what, JSON.stringify(a), "vs", JSON.stringify(b)); } };
const both = (it, want, what) => { const s = srv.normalizeWorkItem(it); eq(s ? s.answer : null, want, `srv ${what}`); eq(web.answerOf(it), want, `web ${what}`); };
// the books' pages
both({ kind: "tens", look: "frame", n: 12 }, 12, "B1 p11 ten and 2");
both({ kind: "tens", look: "frame", ask: "make", n: 14 }, 14, "B1 p11 make 14");
both({ kind: "tens", look: "sticks", n: 47, parts: true }, [4, 7, 47], "B1 p17 4 bundles 7 pencils");
both({ kind: "tens", look: "sticks", ask: "make", n: 28 }, 28, "B1 p19 make 28");
both({ kind: "tens", look: "frame", ask: "add", a: 4, b: 3 }, 7, "B1 p28 4 + 3 in a frame");
both({ kind: "tens", look: "sticks", ask: "add", a: 21, b: 15 }, 36, "B1 p30 21 + 15");
both({ kind: "tens", look: "blocks", n: 2351 }, 2351, "B2 p9 blocks 2,351");
both({ kind: "tens", look: "blocks", board: { h: 3, t: 12, o: 4 } }, 424, "B2 p9 a board to trade");
both({ kind: "tens", look: "blocks", ask: "add", a: 247, b: 185 }, 432, "B2 p18 247 + 185");
both({ kind: "tens", look: "sticks", board: { t: 2, o: 14 } }, 34, "sticks: 2 bundles 14 loose");
both({ kind: "tens", n: 35 }, 35, "the default look: sticks, read");
// the boards the player starts with
eq(web.tensOf({ kind: "tens", look: "blocks", ask: "add", a: 247, b: 185 }).board, { th: 0, h: 3, t: 12, o: 12 }, "247 + 185 joined");
eq(web.tensOf({ kind: "tens", look: "sticks", ask: "make", n: 28 }).board, { t: 0, o: 0 }, "make starts empty");
eq(web.tensOf({ kind: "tens", look: "blocks", n: 5090 }).board, { th: 5, h: 0, t: 9, o: 0 }, "5,090 a digit a place");
// the server keeps what the player needs
const s1 = srv.normalizeWorkItem({ kind: "tens", look: "blocks", board: { h: 3, t: 12, o: 4 } });
eq([s1.look, s1.ask, s1.board, s1.n], ["blocks", "read", { th: 0, h: 3, t: 12, o: 4 }, undefined], "a board kept");
const s2 = srv.normalizeWorkItem({ kind: "tens", look: "frame", ask: "add", a: 4, b: 3 });
eq([s2.a, s2.b, s2.n], [4, 3, undefined], "add keeps a and b");
eq(srv.normalizeWorkItem({ kind: "tens", look: "sticks", n: 47, parts: true }).parts, true, "parts kept");
eq(srv.normalizeWorkItem({ kind: "tens", look: "blocks", n: 47, parts: true }).parts, undefined, "parts only with sticks");
// refused
for (const [it, what] of [[{ kind: "tens", look: "frame", n: 21 }, "a frame over 20"], [{ kind: "tens", look: "sticks", n: 100 }, "sticks over 99"], [{ kind: "tens", look: "blocks", n: 10000 }, "blocks over 9999"],
  [{ kind: "tens", look: "frame", ask: "add", a: 15, b: 6 }, "frame sum over 20"], [{ kind: "tens", look: "sticks", ask: "add", a: 60, b: 45 }, "sticks sum over 99"], [{ kind: "tens", look: "blocks", board: { h: 3, t: 20 } }, "20 of a place"],
  [{ kind: "tens", look: "sticks", board: { h: 1, t: 2 } }, "a place the look hasn't"], [{ kind: "tens", look: "sticks", n: 0 }, "0"], [{ kind: "tens", look: "blocks", ask: "add", a: 5 }, "no b"]]) {
  eq(srv.normalizeWorkItem(it), null, `srv refuses ${what}`); eq(web.answerOf(it), null, `web refuses ${what}`);
}
// the old kinds unchanged; Work It Out takes it
both({ kind: "array", rows: 3, cols: 4 }, [3, 4, 12], "array still");
both({ kind: "place", n: 345 }, [3, 4, 5], "place still");
eq(srv.normalizeWorkItems([{ kind: "tens", n: 34 }], "work_it_out").length, 1, "Work It Out takes the tens board");
// fresh rounds in the game's own way
const KINDS = [{ look: "frame", ask: "read", top: 20 }, { look: "frame", ask: "make", top: 16 }, { look: "frame", ask: "add", top: 10 }, { look: "sticks", ask: "read", parts: true, top: 94 },
  { look: "sticks", ask: "make", top: 50 }, { look: "sticks", ask: "add", top: 89 }, { look: "blocks", ask: "read", trade: true, top: 5090 }, { look: "blocks", ask: "add", top: 657 }, { look: "blocks", ask: "read", top: 9999 }];
for (let i = 0; i < 900; i++) {
  const k = KINDS[i % KINDS.length];
  const [it] = web.freshProblems({ skill: "tens", count: 1, tensKinds: [k] });
  if (!it) { eq("none", "a round", `fresh ${JSON.stringify(k)}`); continue; }
  const s = srv.normalizeWorkItem(it);
  eq(!!s, true, `fresh valid ${JSON.stringify(it)}`);
  if (!s) continue;
  eq(s.answer, web.answerOf(it), `fresh same ${JSON.stringify(it)}`);
  const v = web.tensOf(it);
  eq([v.look, v.ask, !!v.parts], [k.look, k.ask, !!k.parts], `fresh keeps the way ${JSON.stringify(it)}`);
  eq(v.n <= k.top, true, `fresh up to the top ${JSON.stringify(it)}`);
}
console.log(`${n - bad} / ${n} ok`);
process.exit(bad ? 1 : 0);
