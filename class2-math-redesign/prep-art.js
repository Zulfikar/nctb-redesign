// Gets the user's ChatGPT pictures (art/new/) ready for the pages (art/ready/):
// - stickers (sticker-*.png): the white background that touches the edge becomes transparent, then trimmed;
// - ref-children.png: the four close-ups cut into the speech cards' faces (face-boy-think, face-boy-talk, face-girl-think,
//   face-girl-talk) as squares; FACES below holds where each head is on the sheet (measured on the 2 Nov 2026 sheet);
// - cover.png: ChatGPT padded its sides with smeared strips; COVER_CROP keeps the picture inside them.
// - scenes (every other picture): copied as JPEG.
// Everything is made only as big as print needs (stickers at most 520 px, scenes 1600 px), so the book's PDF stays well under
// Activity Studio's 60 MB (with all the pictures at full size it was 57 MB).
// Run: node prep-art.js, then node build.js
const fs = require("fs");
const path = require("path");
const sharp = require(path.join(process.env.HOME, "Downloads/Esho-Bhasha-Shikhi/node_modules/sharp"));
const NEW = path.join(__dirname, "art", "new"), READY = path.join(__dirname, "art", "ready");
fs.mkdirSync(READY, { recursive: true });

// near-white pixels reachable from the border (flood fill) become transparent, with a soft edge
async function clearBackground(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info, light = (i) => Math.min(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
  const bg = new Uint8Array(W * H), q = [];
  const push = (i) => { if (!bg[i] && light(i) >= 236) { bg[i] = 1; q.push(i); } };
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
  while (q.length) { const i = q.pop(), x = i % W, y = (i / W) | 0; if (x > 0) push(i - 1); if (x < W - 1) push(i + 1); if (y > 0) push(i - W); if (y < H - 1) push(i + W); }
  for (let i = 0; i < W * H; i++) {
    if (bg[i]) { data[i * 4 + 3] = 0; continue; }
    const x = i % W, y = (i / W) | 0, near = (x > 0 && bg[i - 1]) || (x < W - 1 && bg[i + 1]) || (y > 0 && bg[i - W]) || (y < H - 1 && bg[i + W]);
    if (near) { const l = light(i); if (l > 200) data[i * 4 + 3] = Math.round(255 * (1 - (l - 200) / 60)); }
  }
  return sharp(data, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
}
const FACES = { "face-boy-think": [40, 650, 280], "face-boy-talk": [362, 650, 280], "face-girl-think": [770, 645, 300], "face-girl-talk": [1170, 640, 300] }; // [left, top, side]
const COVER_CROP = { left: 70, top: 0, width: 884, height: 1536 };

(async () => {
  for (const f of fs.readdirSync(NEW).filter((n) => /^sticker-.*\.png$/.test(n))) {
    const clear = await sharp(await clearBackground(fs.readFileSync(path.join(NEW, f)))).trim({ threshold: 1 }).toBuffer();
    await sharp(clear).resize(520, 520, { fit: "inside", withoutEnlargement: true }).png({ compressionLevel: 9, palette: true, quality: 92 }).toFile(path.join(READY, f));
    console.log("ready", f);
  }
  const sheet = path.join(NEW, "ref-children.png");
  if (fs.existsSync(sheet)) for (const [name, [left, top, side]] of Object.entries(FACES)) {
    await sharp(sheet).extract({ left, top, width: side, height: side }).resize(320, 320).png().toFile(path.join(READY, name + ".png"));
    console.log("ready", name);
  }
  const cover = path.join(NEW, "cover.png");
  if (fs.existsSync(cover)) { fs.rmSync(path.join(READY, "cover.png"), { force: true }); await sharp(cover).extract(COVER_CROP).jpeg({ quality: 90 }).toFile(path.join(READY, "cover.jpg")); console.log("ready cover"); }
  for (const f of fs.readdirSync(NEW).filter((n) => /\.(png|jpg|webp)$/.test(n) && !/^(sticker-|ref-children|cover)/.test(n))) {
    const name = f.replace(/\.\w+$/, "");
    if ((await sharp(path.join(NEW, f)).metadata()).hasAlpha) { console.log("kept as is (it has transparency):", f); continue; }
    await sharp(path.join(NEW, f)).resize(1600, 1600, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: 86 }).toFile(path.join(READY, name + ".jpg"));
    console.log("ready", name);
  }
})();
