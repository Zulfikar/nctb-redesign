// Cuts an old picture from the book as a stand-in until the user's new one arrives:
//   node .work/standin.js <printed page> <left%> <top%> <width%> <height%> <name>
// The percentages are of the whole page (printed page n is PDF page n + 7). → art/stand-in/<name>.png
const path = require("path"), fs = require("fs"), { execFileSync } = require("child_process");
const sharp = require(path.join(process.env.HOME, "Downloads/Esho-Bhasha-Shikhi/node_modules/sharp"));
const [page, l, t, w, h, name] = process.argv.slice(2);
if (!name) { console.log("usage: node .work/standin.js <page> <left%> <top%> <width%> <height%> <name>"); process.exit(1); }
const tmp = path.join(__dirname, `standin-${process.pid}`);
execFileSync("pdftoppm", ["-f", String(+page + 7), "-l", String(+page + 7), "-r", "200", "-singlefile", "-png", path.join(__dirname, "..", "source", "class4-math-nctb-2026.pdf"), tmp]);
(async () => {
  const { width: W, height: H } = await sharp(tmp + ".png").metadata();
  const box = { left: Math.round(W * l / 100), top: Math.round(H * t / 100), width: Math.round(W * w / 100), height: Math.round(H * h / 100) };
  const out = path.join(__dirname, "..", "art", "stand-in", name + ".png");
  await sharp(tmp + ".png").extract(box).png().toFile(out);
  fs.rmSync(tmp + ".png");
  console.log("stand-in:", out, box);
})();
