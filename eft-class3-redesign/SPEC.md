# How to write a unit (for the writers of Units 1–6)

*30 Oct 2026. The book is NCTB's **English for Today, Class Three** (`~/Downloads/English Text Book Class_3.pdf`). We are making **eBidyaloy's interactive edition**:
- page for page, with the same page numbers;
- every word as printed;
- new pictures;
- a QR code on every page;
- a **Bangla guide (British English)** under every English line.*

**Read first:**
- `README.md`;
- `content/unit1.js`: pages 1–8 and the model pages 12, 14 and 19;
- `parts.js`: every kind of content, with its options;
- `PICTURE-PROMPTS-unit1.md`;
- the previews `previews/page-001.png` … `page-019.png`.

## 1. The rules

1. **Page for page.** One entry in `pages` per printed page: the same page number, the same lesson, the same tasks in the same order. The book's printed page N is page N+6 of its PDF.
2. **Every word as printed:** spelling, capitals, punctuation, curly quotes (’ ‘), blanks (`____`), dots (`……`), and even the book's own mistakes. Copy from `pdftotext -layout -f <N+6> -l <N+6> ~/Downloads/"English Text Book Class_3.pdf" -` and look at the page itself (`pdftoppm -r 60 -f <N+6> -l <N+6> -png …`) for what the text doesn't show.
3. **Run `node build.js unitN` until it says `nothing spills` and every page says `the same`.** The text check compares every English word on our page with the book's page.
   - **`nocheck: true` on a part:** use it when the book draws those words into a picture, so they aren't text there.
   - **`allow: { why, missing: [], extra: [] }` on a page:** use it when the book's text is split oddly, for example its tracing font prints "t we l ve".
   - Both only for those reasons, and always with the reason. Never use them to hide a real difference.
4. **Look at every page you build** (`previews/page-NNN.png`, open it with Read): nothing overlaps, nothing is cut off, and the page looks good.
5. **Only touch your own files:**
   - `content/unitN.js` (Unit 1's writer adds pages to `content/unit1.js`, keeping the page order and leaving pages 1–8, 12, 14 and 19 as they are);
   - optionally `content/unitN.parts.js`;
   - `PICTURE-PROMPTS-unitN.md`;
   - `content/unitN.words.json`;
   - your stand-in pictures in `art/stand-in/`;
   - your work folder `.work/unitN/`.

   **Never edit** `build.js`, `parts.js`, `codes.json`, or another unit's files. If you need something they can't do, add a kind in `content/unitN.parts.js` (section 4). Tell Claude about anything that ought to be shared.

## 2. A unit file

```js
module.exports = {
  unit: 2,
  title: ["My Friends, Family and Numbers", "আমার বন্ধু, পরিবার আর সংখ্যা"],   // [English as printed, Bangla meaning]
  pages: [
    { page: 21, lesson: 1, opener: true, title: ["Talking with friends", "বন্ধুদের সাথে কথা বলি"],  // opener: the unit's first page
      blocks: [ … ] },
    { page: 22, lesson: 1, title: [ … ], dense: true, blocks: [ … ] },              // dense: a crowded page, a little smaller
  ],
};
```

A **block** is one task of the page, in order:

```js
{ k: "A", task: ["Listen and say.", "শোনো আর বলো।"], pic: "u2-l1-friends", bubbles: [ … ], lines: [ … ], parts: [ … ] }
{ practise: true }                                     // the "Let's practise" ribbon
{ n: 1, task: ["Match column A with column B.", "…"], parts: [ … ] }   // a numbered exercise (in a yellow card)
```

- `pic`: a big picture.
- `bubbles`: speech bubbles on it, `{ who, at: [left%, top%, width%], tail: "down-left" | "down-right", line: [en, hint, meaning] }`. Use `\n` for the book's line breaks inside a bubble.
- `lines`: a dialogue, `[[who, en, hint, meaning], …]`.
- `parts`: everything else, in order. Every kind is in `parts.js`:
  - `dlg`, `lines` (style `plain` / `song` / `read`, `cols: 2`, `marks`), `items`, `text` (a reading text: sentences, `caps`, a picture beside it), `choices`;
  - `words` (a word box), `table`, `match`, `calendar`, `pics` (a row or grid of pictures with labels or captions, `outline` for line art to colour), `cards`;
  - `count`, `trace`, `write`, `boxes`, `note` (Grammar focus), `pic`, `gap`.
- **Where a part's options go:**
  - **object kinds** (`match`, `calendar`, `table`) may keep their options inside: `{ match: { a, b, left, right, done } }`;
  - **list kinds** keep the list under the kind's name and the options beside it: `{ cards: [ … ], cols: 5 }`.
- The model pages in `content/unit1.js` show most of them.

## 3. The Bangla guide (British English)

**What gets a guide:**
- **Everything the child reads, says or writes** (dialogue, bubbles, rhymes, reading texts, questions, sentences, words, table words): `[english, hint, meaning]`.
- **A task's instruction:** `[english, meaning]`, the meaning only.
- **Long instructions for the teacher or the class** (games, projects): `[english, "", meaning]`, the meaning only.
- **A line that is only blanks or numbers:** `["…", "", ""]`, no guide.

**The meaning** is natural, simple Bangla for an 8-year-old: what the line means, not word for word. Names in meanings use their usual Bangla spelling (সাকিবা, জাহিদ).

**The hint** is the British English sound in Bangla letters. It follows *Let's Learn English*'s British Bangla edition exactly (`~/Downloads/Esho-Bhasha-Shikhi/English/README.md` section 7):
- **Dotted letters for sounds Bangla doesn't have:**

  | Sound | Hint |
  |---|---|
  | f | ফ় |
  | v | ভ় |
  | z | জ় |
  | th (thin) | থ় |
  | th (this) | দ় |
  | s | স় |

- **Unchanged:** sh is শ, w is ওয় (no dot), and short a is অ্যা.
- **Write plain ক, ট, প.** The build adds the puff itself (টীচা prints as ঠীচা).
- **British:** no r at the end of a syllable (colour কালা, teacher টীচা, star স্টা, are আ, your ইয়ো, sport স্পট, morning মনিং).
- **A single word of two or more syllables:** syllables with `·` and the stressed one in stars, `ই·*লে*·ভ়ান`. **A sentence:** no dots and no stars.
- **Names:** dotted where English says the sound, as in Unit 1: স়াকিবা, জ়াহিদ, ফ়ারিয়া, স়ঞ্জয়. Otherwise plain: রাহাত, রীতা.
- **Use the hints that already exist:**
  - **Before writing a word, look it up** and copy its hint exactly:
    - in `content/unit1.js` and the other units' `content/unitN.words.json`;
    - in *Let's Learn English*'s British packs: `~/Downloads/Esho-Bhasha-Shikhi/English/book01/guides/bn.js` and `book02/guides/bn.js` (`t` for lines, `words` for single words). Book 2's spelling wins where they differ: মনিং, ফ়েইভ়ারিট, টক আবাউট.
  - Examples:

    | English | Hint |
    |---|---|
    | What's your name? | ওয়টস ইয়ো নেইম? |
    | How are you? | হাউ আ ইউ? |
    | thank you | থ়্যাংক ইউ |
    | friend | ফ়্রেন্ড |
    | family | ফ়্যামিলি |
    | school | স্কূল |
    | one / two / three | ওয়ান / টূ / থ়্রী |
    | seven | *স়ে*·ভ়ান |
    | eleven | ই·*লে*·ভ়ান |
    | twenty | *টুয়েন*·টি |

- **`content/unitN.words.json`:** write every single word you hint as `{ "word": ["hint", "meaning"] }`, so all six units can be checked for agreement.

## 4. A unit's own kinds (only if `parts.js` can't do it)

```js
// content/unitN.parts.js
module.exports = (H) => ({
  kinds: { u3steps: (p) => `<div class="u3-steps">…${H.en(…)}…${H.guide(hint, meaning)}…</div>` },
  css: `.u3-steps { … }`,
});
```

- **The helpers in `H`:** `esc`, `en` (the book's English: `____` becomes a box, `_word_` is underlined), `guide(hint, meaning)`, `hint`, `mean`, `picture(name, bubbles, h)`, `dialogue`, `art(name)` (a picture's file), `WHO`, `INK`.
- **Mark the book's English with `data-c`** so the text check reads it.
- **Prefix your CSS classes with `uN-`.** Never reuse a class build.js or parts.js uses: `.bubble`, `.tag`, `.pic`, `.card`, `.page`, `.k`, `.t`, `.en`, `.guide`, `.box`, `.wbox`, `.lines`, `.read`, `.note`, `.cal`, `.cards`, `.match`. Two clashes already broke a page.

## 5. Pictures

**Names:**
- scenes: `u<unit>-l<lesson>-<what>`;
- small word pictures: `u<unit>-w-<word>`.

**The stand-in:** cut the book's own picture out of the PDF into `art/stand-in/<name>.png`:
```
pdfimages -f <N+6> -l <N+6> -png -p ~/Downloads/"English Text Book Class_3.pdf" .work/unitN/i
```
Then copy the right file. The build shows it, tagged "stand-in", until the user's new picture is in `art/new/`.

**`PICTURE-PROMPTS-unitN.md`**, like `PICTURE-PROMPTS-unit1.md`:
- **Section 1:** copied word for word from Unit 1's file.
- **Section 2:** the reference sheets for the unit's new people.
  - Reuse Unit 1's (`ref-children-1.png`, `ref-children-2.png`, `ref-teachers.png`) when the same person appears.
  - New sheets are named `ref-u<unit>-….png`.
- **Section 3:** one entry per scene: the file name, the page and its words, which sheets to upload, what the picture shows (the book's picture is the guide to its meaning), and **where to leave calm space for speech bubbles**.
- **Small word pictures:** one subject on plain white, the style of a picture dictionary.
- **"Read and colour" pictures:** black outline drawings on white, for colouring.
- **Never ask for writing in a picture.**

## 6. When you're done

Report to Claude:
- every page's line from the text check, and "nothing spills";
- the pictures: how many, which reference sheets are new;
- any new kinds in `unitN.parts.js`;
- every `allow` and `nocheck`, with why;
- anything you weren't sure of: a hint, a meaning, or a mistake in the book (copied as printed, but noted here).
