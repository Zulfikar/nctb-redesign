# NCTB-Redesigned

eBidyaloy's colourful, interactive editions of NCTB textbooks: each book rebuilt page for page, every word as printed, with QR codes to its games in Activity Studio. Gathered here on 23 Nov 2026 (they used to be separate folders in `~/Downloads`; a link with each old name still points here).

**Rights:** the books are NCTB's. These editions are samples and proposals; publishing or selling them needs NCTB's permission. Keep this repository private.

| Folder | What | Activity Studio | State |
|---|---|---|---|
| `class2-math-redesign` | প্রাথমিক গণিত, দ্বিতীয় শ্রেণি | /b/GDK2NH | finished (all pictures, 164 games) |
| `class2-math-activities` | its games (`ACTIVITIES-bn*.json`, the builder and checks) | | finished |
| `class3-math-redesign` | প্রাথমিক গণিত, তৃতীয় শ্রেণি | /b/GVB5V3 | finished (all pictures, 229 games) |
| `class3-math-activities` | its games | | finished |
| `class4-math-redesign` | প্রাথমিক গণিত, চতুর্থ শ্রেণি (2026) | not yet | all 174 pages designed and checked (23 Nov); 39 pictures to make (`~/Downloads/class4-math-pictures/PROMPTS.md`); games and page QRs next (`PLAN.md`, `TEACHER-CHECK.md`) |
| `eft-class3-redesign` | English for Today, Class 3 | /b/2KVK93 | finished |

Each project's own `README.md` (Class 4: `PLAN.md` and `SPEC.md`) has the details. The NCTB book each one is built from is in its `source/` folder.

## Building
```
cd class3-math-redesign
node prep-art.js     # after adding or replacing pictures in art/new/
node build.js        # the whole book → class3-math-book.pdf + previews/ + the checks
node build.js 21-36  # only those printed pages (a quick check)
```
The builders use Node, Google Chrome, `pdftoppm` (poppler) and `tesseract`, and load `puppeteer-core`, `sharp`, `qrcode` and `pdf-lib` from the eBidyaloy web repo and the books repo (`~/ebidyaloy-web/ebidyaloy_web_client`, `~/Downloads/Esho-Bhasha-Shikhi`).

## What is stored here, and what isn't
- **Stored:** the code, the pages' content, the docs, the games files, the user's pictures (`art/new/`, `art/stand-in/`), the NCTB source books (`source/`) and the OCR models (`.work/tessdata/`). Pictures and PDFs go through **Git LFS**.
- **Not stored, because the builds make them** (`.gitignore`): `previews/`, the rest of `.work/`, `art/ready/` and the finished `*-book.pdf`.
