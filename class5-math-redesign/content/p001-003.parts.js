// Printed pages 1–3's own kinds (prefixed c5p001_), written by Claude as the model for the helpers (25 Nov 2026). Units: mm.
//   c5p001_mul  a multiplication in columns, digit under digit, as the book prints it (pp. 1–3):
//               { rows, cell?: 8.6, size?: 15, grid?: false, left?: [label | null, …], right?: [label | null, …], lw?: 30, frame?: false }
//               rows: "৮৫৩৬" · "×৯৭২" (a sign, then one cell per digit) · "-" a rule under the row before · "=" a double rule.
//               In a row: "□" an empty answer box, "[৭]" a digit printed in a box, "_" an empty cell. Cells line up from the right
//               (the ones). grid: true draws the working rows (between the first rule and the last) as the book's ruled squares,
//               and the answer row too; an empty square there is "□".
//               left: one label per row (null for none), in a box with an arrow pointing right at the row (p. 1);
//               right: an arrow pointing left at the row, then the label (p. 2). Labels take the markup, plus "▭" a wide box.
//               lw: the labels' column width.
const INK = "#1E2433", ARROW = "#7C6FCB";
const parse = (r) => {
  const m = r.match(/^([×+−-]?)(.*)$/), cells = [];
  for (const t of m[2].match(/\[[^\]]\]|□|_|[^\s]/g) || []) cells.push(t);
  return { op: m[1] === "-" ? "−" : m[1], cells };
};
function mulHtml(b, ctx) {
  const { esc, md } = ctx, cell = b.cell || 8.6, size = b.size || 15;
  const lines = [];
  for (const r of b.rows) {
    if (r === "-" || r === "=") { if (lines.length) lines[lines.length - 1].rule = r; continue; }
    lines.push({ ...parse(r), label: null });
  }
  // the labels belong to the rows as written (rules don't count)
  lines.forEach((l, i) => { l.left = b.left ? b.left[i] : null; l.right = b.right ? b.right[i] : null; });
  // the sign sits in the cell just left of its row's first digit, as the book prints it
  const n = Math.max(...lines.map((l) => l.cells.length + (l.op ? 1 : 0)));
  const firstRule = lines.findIndex((l) => l.rule), lastRule = lines.map((l) => !!l.rule).lastIndexOf(true);
  const lab = (s) => md(s).replace(/▭/g, `<span class="c5p001-wb"></span>`);
  const arrow = (dir) => `<svg class="c5p001-ar" viewBox="0 0 30 10" width="${(cell * 1.15).toFixed(1)}mm" height="${(cell * 0.42).toFixed(1)}mm">${dir === "r"
    ? `<path d="M0 3.4H20V0L30 5 20 10V6.6H0Z" fill="${ARROW}"/>` : `<path d="M30 3.4H10V0L0 5 10 10V6.6H30Z" fill="${ARROW}"/>`}</svg>`;
  const rows = lines.map((l, i) => {
    const pad = Array(n - l.cells.length - (l.op ? 1 : 0)).fill(null).concat(l.op ? [{ op: l.op }] : [], l.cells), work = b.grid && i > firstRule;
    const tds = pad.map((c) => {
      if (c === null) return `<td></td>`;
      if (c.op) return `<td class="op">${esc(c.op)}</td>`;
      const g = work ? " g" : "";
      if (c === "□") return work ? `<td class="g"></td>` : `<td><span class="c5p001-bx"></span></td>`;
      if (c === "_") return `<td class="${g.trim()}"></td>`;
      if (c[0] === "[") return `<td class="${g.trim()}"><span class="c5p001-fb">${esc(c[1])}</span></td>`;
      return `<td class="${g.trim()}">${esc(c)}</td>`;
    }).join("");
    const cls = [l.rule === "-" ? "r1" : l.rule === "=" ? "r2" : "", i > lastRule && lastRule >= 0 ? "ans" : ""].filter(Boolean).join(" ");
    const left = b.left ? `<td class="c5p001-l">${l.left ? `<span class="c5p001-lb">${lab(l.left)}</span>${arrow("r")}` : ""}</td>` : "";
    const right = b.right ? `<td class="c5p001-r">${l.right ? `${arrow("l")}<span class="c5p001-rl">${lab(l.right)}</span>` : ""}</td>` : "";
    return `<tr class="${cls}">${left}${tds}${right}</tr>`;
  }).join("");
  const t = `<table class="c5p001-mul${b.grid ? " c5p001-grid" : ""}" style="font-size:${size}pt;--cw:${cell}mm;--lw:${b.lw || 30}mm">${rows}</table>`;
  return b.frame ? `<div class="c5p001-fr">${t}</div>` : t;
}

module.exports = {
  kinds: { c5p001_mul: mulHtml },
  css: `
.c5p001-mul { border-collapse: collapse; font-family: 'Baloo Da 2'; font-weight: 700; color: ${INK}; margin: 0 auto }
.c5p001-mul td { width: var(--cw); height: calc(var(--cw) * .92); text-align: center; vertical-align: middle; padding: 0; line-height: 1 }
.c5p001-mul td.op { color: #DC2626; width: calc(var(--cw) * .8) }
.c5p001-mul tr.r1 td:not(.c5p001-l):not(.c5p001-r) { border-bottom: .55mm solid ${INK} }
.c5p001-mul tr.r2 td:not(.c5p001-l):not(.c5p001-r) { border-bottom: 1.3mm double ${INK} }
.c5p001-mul tr.ans td:not(.op) { color: #C2410C }
.c5p001-mul td.g { border: .4mm solid ${INK}; background: #fff }
.c5p001-mul.c5p001-grid tr.ans td.g { border-color: ${INK} }
.c5p001-bx { display: inline-block; width: calc(var(--cw) * .86); height: calc(var(--cw) * .8); border: .5mm solid #F59E0B; background: #FFFBEB; border-radius: 1.4mm; vertical-align: middle }
.c5p001-fb { display: inline-flex; align-items: center; justify-content: center; width: calc(var(--cw) * .86); height: calc(var(--cw) * .8); border: .45mm solid ${INK}; background: #fff; border-radius: .8mm; padding-top: .5mm; box-sizing: border-box }
.c5p001-l { width: var(--lw); text-align: right !important; white-space: nowrap; padding-right: 1mm !important }
.c5p001-lb { display: inline-block; font: 700 .68em/1.3 'Baloo Da 2'; border: .45mm solid ${INK}; background: #fff; padding: .4mm 2mm .1mm; vertical-align: middle; margin-right: .8mm }
.c5p001-r { width: var(--lw); text-align: left !important; white-space: nowrap; padding-left: 2mm !important }
.c5p001-rl { font: 700 .8em 'Baloo Da 2'; vertical-align: middle; margin-left: 1.4mm }
.c5p001-rl .abox { width: 12mm; height: 7mm }
.c5p001-wb { display: inline-block; width: 24mm; height: 7mm; vertical-align: -2mm; border: .55mm solid #F59E0B; background: #FFFBEB; border-radius: 1.8mm; margin: 0 .8mm }
.c5p001-ar { display: inline-block; vertical-align: middle }
.c5p001-fr { align-self: center; border: .7mm solid var(--c); border-radius: 4mm; background: #fff; padding: 2mm 4mm; box-shadow: 0 1.2mm 0 var(--s) }
`,
};
