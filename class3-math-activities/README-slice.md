# প্রাথমিক গণিত, তৃতীয় শ্রেণি · অধ্যায় ৯ ভগ্নাংশ: Slice It! games (14 Nov 2026)

`ACTIVITIES-bn-update-2026-11-14-slice.json` is an **eBidyaloy Activity Studio activity file** (format `ebidyaloy-activity-import`, version 1). It is an update file with **only the 5 new Slice It! games** («কেটে ভাগ করি», type `fraction_slice`) for the fraction chapter. The chapter's 25 earlier games stay as they are; the new ones sit next to them on the same pages.

The user asked: "create this new activity for those relevant pages".

**Import it into /b/GVB5V3** («প্রাথমিক গণিত - তৃতীয় শ্রেণী») like the other files. It lists the same 13 chapters, and every game comes in as a draft tied to its printed page.

**Only after the deploy:** the live server must know `fraction_slice` first. That means the web change "Slice It!" pushed, then MR enhancement → develop, then deployed. Before that, the import would skip these 5 games.

## How the game plays

The child cuts real food into equal parts by swiping across it (a glowing line, never a knife):
- **Round foods** (orange, roti, cake, watermelon) are cut through the middle, into 2, 4, 6 or 8 parts.
- **The chocolate bar** (3 × 4 squares) and **the tray of eggs** (2 × 6) are cut along their lines, into 2, 3, 4, 6 or 12 parts.

What happens next:
- **Unequal parts** are marked «বড়» and «ছোট», and the child cuts again. After a third miss, a help button shows the even cuts.
- **"eat" rounds:** the food comes already cut; the child taps parts to eat them, then names what is left or what was eaten.
- **"share" rounds:** the child cuts for the friends and gives each friend a part on a plate (drag or tap).

Every round ends by picking the fraction from 3 cards, then a strip: the real food → its drawing → the fraction with its words («চার ভাগের তিন ভাগ»). A round without a miss earns a star.

## Which pages

The foods can't make fifths, sevenths or ninths, so those (pp. 95–96 ১/৫, ৩/৫; p. 100; the 7ths and 9ths on pp. 101–106) stay with Fraction Play.

p. 94 (is ১/২ or ১/৪ bigger?) and pp. 97–99 (equal fractions) wait for Slice It!'s step 2 (the bigger piece, cutting a half again).

## Activities

- **5 activities, 50 rounds**, each game 10 rounds (the user's rule, 3 Nov: at least 10 questions).
- In Bangla with Bangla digits; no voice is needed.

| Page | Type | Title | Code | QR | Content | From |
|---:|---|---|---|---|---|---|
| 91 | Slice It! | রুটি ভাগ করি: সমান দুই ভাগ | `LSH6ADG5` | M3-p91-b | 10 rounds (4 cut, 3 eat, 3 share) | p.91 মূল প্রশ্ন (a roti for রেজা and মিনা: the fair cut and the unfair one) and কাজ ১ (a square and a circle into 2 equal pieces); p.92 অর্ধেক = দুই ভাগের এক ভাগ, 1/2, and অনুশীলন ৩ (two halves make one) |
| 93 | Slice It! | কেটে দেখি: চার ভাগের এক ভাগ | `LSV42BCY` | M3-p93-b | 10 rounds (4 cut, 3 eat, 3 share) | p.93 মূল প্রশ্ন and box (সমান ৪ অংশ, এক চতুর্থাংশ বা চার ভাগের এক ভাগ, 1/4), অনুশীলন ১ (four quarters make one); p.94 অনুশীলন ২ (“1/4 এর দুই টুকরা”, “তিন টুকরা”: 2/4, 3/4) |
| 95 | Slice It! | কেটে দেখি: তিন ভাগের এক ভাগ | `LSWPWVRS` | M3-p95-c | 10 rounds (3 cut, 4 eat, 3 share) | p.95 মূল প্রশ্ন (১ মিটার ফিতা সমান ৩ ভাগ: 1/3, এক তৃতীয়াংশ) and the 2/3 box (৩ টুকরার ২টি: দুই-তৃতীয়াংশ); a chocolate bar (3 rows) and a tray of eggs (2 × 6) are the things that cut into 3 |
| 96 | Slice It! | কেটে দেখি: আট ভাগ | `LSDEGTAW` | M3-p96-b | 10 rounds (4 cut, 6 eat) | p.96 অনুশীলন ৪ (7/8 অংশ রং করি) and the box (লব ও হর: 7/8); p.101 অনুশীলন ৩ and p.104 নিজে করি ১ (৪): a cake in 8ths (5/8, 2/8, 1/4 = 2/8) |
| 102 | Slice It! | খেয়ে ফেললে বাকি কত? (১ − ভগ্নাংশ) | `LSBMWWB8` | M3-p102-b | 10 rounds (10 eat) | the book's ১ − n/d items that the things can show: p.102 কাজ ১ (১ − 3/4 = 1/4, printed), p.103 অনুশীলন ১ (১) ১ − 1/2 and (৮) ১ − 3/8, p.106 নিজে করি ৮ (১) ১ − 1/3 and (৮) ১ − 5/8; then mine with the chapter's other bottoms: 1/4, 2/3, 5/6, 1/8, 2/4. The book's ১ − 1/5, 4/9, 1/7, 7/9 stay with Fraction Play (p.103, p.106) |

The p. 102 game shows each round's sum above the food, for example «১ − ৩/৪ = ? পুরোটা হলো ১। ৪ ভাগের ৩ ভাগ খেয়ে ফেললে বাকি কত থাকে?».

The QR ids continue each page's letters: p. 91 has -a, p. 93 -a, p. 95 -a and -b, p. 96 -a, p. 102 -a.

## Build and checks

- `node build-slice.js` writes the file. Its codes come from a hash of each key, and none is used by any other activity file here or in Class 2.
- `node validate-slice.js` (Node 16) checks the file with the backend's own importer:
  - every round is kept as written;
  - the server's answer equals the one worked out on its own, and matches the book's ১ − n/d;
  - the answer is among the 3 cards;
  - the codes and QR ids are new.
- **Checked 14 Nov 2026:**
  - ALL OK.
  - The 5 codes are free on the live database (read-only).
  - Every round of all 5 games was played headless in the real game page at phone width (API mocked, no database): 10/10 stars each, no page errors.
