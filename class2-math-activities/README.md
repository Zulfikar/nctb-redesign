# প্রাথমিক গণিত, দ্বিতীয় শ্রেণি: Activity Studio file

`ACTIVITIES-bn.json` is an **eBidyaloy Activity Studio activity file** (format `ebidyaloy-activity-import`, version 1) for the NCTB textbook *প্রাথমিক গণিত, দ্বিতীয় শ্রেণি* (2026 edition). Import it into a book in Activity Studio (a book **without** a language course: the file is a Bangla subject book, `book.language: "bn"`, no `teachLanguage`). Every activity comes in as a draft game, tied to the printed page it practises; its code (`LS…`) is permanent and can be printed in a QR.

- **164 activities** (the first file's **85**, and the **22** tools of the [2 Nov 2026 update](#update-2-nov-2026-the-math-tools)), all in Bangla with Bangla digits; no voice or picture is needed (the guide is empty, but for a few notes).
- Per chapter: অধ্যায় ১ · সংখ্যা ও স্থানীয় মান **44** · অধ্যায় ২ · যোগ ও বিয়োগ **48** · অধ্যায় ৩ · গুণ **35** · অধ্যায় ৪ · জ্যামিতিক আকৃতি ও প্যাটার্ন **8** · অধ্যায় ৫ · পরিমাপ **19** · অধ্যায় ৬ · মুদ্রা **7** · অধ্যায় ৭ · উপাত্ত **3**
- Per type: Number Match **8** · Equation Match **13** · Multiple Choice **57** · Rapid Quiz **6** · Categorize **3** · Sequence **4** · Work It Out **49** · Find the Mistake **4** · Make Equal Groups **3** · Number Line **4** · Clock & Time **3** · Taka Shop **4** · Measure It **3** · Shape Patterns **2** · Make a Shape **1**
- Work It Out (chapters ১–৩): অধ্যায় ১ · সংখ্যা ও স্থানীয় মান **9** activities, **82** items · অধ্যায় ২ · যোগ ও বিয়োগ **27** activities, **250** items · অধ্যায় ৩ · গুণ **13** activities, **121** items

**Work It Out** activities copy the pages' own exercises (sums, boxes to fill, place value, number patterns, comparisons and word problems, the stories as printed) for the child to work out on a keypad. They carry **no answers**: the server works every answer out when the file is imported. Where a page drills one skill, `configuration.fresh` adds 10 new problems of that skill after the page's own.

Printed page = PDF page − 9 (printed p.1 is PDF p.10).

## Activities

The first file's 85 (imported 2 Nov 2026); the tools are listed under the update below.

| Page | Type | Title | Code | QR | Content | From |
|---:|---|---|---|---|---|---|
| 1 | Number Match | সংখ্যা ও কথায় (২১–২৮) · মিলাও | `LS2U8ZQF` | M2-p1-a | 8 pairs | pp.1–2 table |
| 2 | Number Match | সংখ্যা ও কথায় (২৯–৩৬) · মিলাও | `LS8WNMC9` | M2-p2-a | 8 pairs | pp.2–3 table |
| 4 | Number Match | সংখ্যা ও কথায় (৩৭–৪৪) · মিলাও | `LSY7BQDF` | M2-p4-a | 8 pairs | pp.4–5 table |
| 5 | Number Match | সংখ্যা ও কথায় (৪৫–৫০) · মিলাও | `LSUV3WJ6` | M2-p5-a | 6 pairs | pp.5–6 table |
| 7 | Number Match | সংখ্যা ও কথায় (৫১–১০০) · মিলাও | `LSWXN5EM` | M2-p7-a | 8 pairs | p.7 নিজে করি 1 (words from the p.6 table) |
| 11 | Work It Out | ব্লক গুনে সংখ্যা লিখি | `LSDCRMUY` | M2-p11-a | 5 items (5 place value) + fresh place | p.10 ব্লকের সংখ্যা অঙ্কে লিখি (২ শত ৩ দশ ৬ এক), p.11 নিজে করি 1, 2 and the table (৬ শত ৫ দশ ৫ এক), p.12 card count (৭ শত ৬ দশ ৫ এক) |
| 13 | Number Match | তিন অঙ্কের সংখ্যা কথায় · মিলাও | `LSW4RMSX` | M2-p13-a | 7 pairs | p.13 পড়ি ও অঙ্কে লিখি + p.10 |
| 16 | Multiple Choice | কোনটি বড়ো? কোনটি ছোটো? | `LSXUHAVH` | M2-p16-a | 10 questions | p.16 নিজে করি 1–2 |
| 16 | Work It Out | তুলনা করি: <, > না = | `LSQFXNCC` | M2-p16-b | 12 items (12 compare) + fresh compare | p.16 নিজে করি 1–2 (all 12) |
| 20 | Number Match | স্থানীয় মান · মিলাও | `LS2MG5HW` | M2-p20-a | 8 pairs | p.20 নিজে করি 1 + p.21 2 |
| 20 | Work It Out | স্থানীয় মান লিখি | `LSEXCYE2` | M2-p20-b | 12 items (12 place value) + fresh place | p.20 নিজে করি 1, p.21 2 |
| 21 | Multiple Choice | কোন অঙ্কের স্থানীয় মান কত? | `LSSTSRQA` | M2-p21-a | 10 questions | p.21 3 |
| 21 | Work It Out | প্রতিটি অঙ্কের স্থানীয় মান | `LS6ZJD5Q` | M2-p21-b | 10 items (10 place value) + fresh place | p.21 3 |
| 23 | Work It Out | তিন অঙ্কের সংখ্যার তুলনা | `LSTSHQVJ` | M2-p23-a | 11 items (11 compare) + fresh compare | p.23 নিজে করি 1–2 |
| 24 | Sequence | ছোটো থেকে বড়ো সাজাও | `LS2678ZA` | M2-p24-a | 9 items | p.24 example + rows (1)–(2) |
| 29 | Categorize | জোড় না বিজোড়? | `LS7GE94B` | M2-p29-a | 2 groups, 12 items | p.29 অনুশীলন 1 (first six) + 2 (first six) |
| 31 | Work It Out | পরবর্তী সংখ্যাগুলো লিখি (১) | `LSQJQDAF` | M2-p31-a | 10 items (10 patterns) + fresh pattern | p.30 (1)–(3), p.31 (4)–(5), p.32 (6)–(7) |
| 33 | Multiple Choice | সংখ্যা প্যাটার্ন: পরের সংখ্যা | `LSTP2AX4` | M2-p33-a | 10 questions | p.30 + p.33 নিজে করি 1, 2, 5 |
| 33 | Work It Out | পরবর্তী সংখ্যাগুলো লিখি (২) | `LSB72PAX` | M2-p33-b | 8 items (8 patterns) + fresh pattern | p.33 নিজে করি 1 (1), (3); 2; 3; 4; 5 |
| 34 | Number Match | ক্রমবাচক সংখ্যা · মিলাও | `LS288V8H` | M2-p34-a | 8 pairs | p.34 table (১–৫), p.37 table (৬–১০) |
| 37 | Multiple Choice | কে কোথায়? ক্রমবাচক সংখ্যা | `LSFAU42F` | M2-p37-a | 10 questions | p.34 1, p.35 2, p.36 3–4, p.37 5 |
| 42 | Equation Match | যোগ করি (১) · মিলাও | `LSSEYDBY` | M2-p42-a | 8 pairs | p.42 1–2 |
| 42 | Work It Out | যোগ করে লিখি (১) | `LSW7UAJP` | M2-p42-b | 11 items (10 sums, 1 stories) + fresh add | p.42 1–2 and the story |
| 44 | Equation Match | যোগ করি (২) · মিলাও | `LSYCDMGK` | M2-p44-a | 8 pairs | p.44 1 (a repeated answer is skipped) |
| 44 | Work It Out | যোগ করে লিখি (২) | `LS8EJF38` | M2-p44-b | 11 items (11 sums) + fresh add | p.44 1–2 (৭৮ + ০৮ written ৭৮ + ৮) |
| 45 | Work It Out | যোগ করে লিখি (৩) | `LS4GVTD8` | M2-p45-a | 12 items (12 sums) + fresh add | p.45 1–2 |
| 48 | Equation Match | বিয়োগ করি (১) · মিলাও | `LS3FKVBG` | M2-p48-a | 8 pairs | p.48 4 |
| 48 | Work It Out | বিয়োগ করে লিখি (১) | `LSM79HNR` | M2-p48-b | 10 items (10 sums) + fresh sub | p.48 4 |
| 49 | Work It Out | বিয়োগ করে লিখি (২) | `LSCH6VJG` | M2-p49-a | 12 items (12 sums) + fresh sub | p.47 1, p.49 2 |
| 51 | Equation Match | বিয়োগ করি (২) · মিলাও | `LSRWQ7QZ` | M2-p51-a | 8 pairs | p.51 1–2 (দশক থেকে ১ দশ নিয়ে, p.50) |
| 51 | Work It Out | বিয়োগ করে লিখি (৩) | `LSFF3FRQ` | M2-p51-b | 12 items (12 sums) + fresh sub | p.49 1, p.51 (৩৪ − ৭, ৩০ − ৬) and 1 |
| 52 | Work It Out | বিয়োগ করে লিখি (৪) | `LSTJXFHK` | M2-p52-a | 12 items (12 sums) + fresh sub | p.51 2, p.52 4 |
| 52 | Work It Out | বিয়োগ করে লিখি (৫) | `LS32NFV6` | M2-p52-b | 8 items (5 sums, 3 stories) | p.52 3 and 5 |
| 54 | Multiple Choice | খালি ঘর ও গল্পের অঙ্ক | `LSZ4MVJM` | M2-p54-a | 10 questions | p.54 1 (1)–(9 of 10), p.52 5 (1)–(2), p.54 3–4 |
| 54 | Work It Out | খালি ঘর পূরণ করি | `LSH2ZCR7` | M2-p54-b | 10 items (10 boxes) + fresh missing | p.54 1 (all 10) |
| 54 | Work It Out | যোগ-বিয়োগের গল্প (১) | `LSCATE5R` | M2-p54-c | 9 items (9 stories) | p.45 3–5, p.46, p.50, p.53, p.54 2–4 |
| 55 | Work It Out | দশকের যোগ করে লিখি | `LSPWVUQD` | M2-p55-a | 11 items (10 sums, 1 stories) | p.55 |
| 57 | Work It Out | তিন অঙ্কের যোগ (১) | `LSPAGHD8` | M2-p57-a | 7 items (7 sums) + fresh add | p.57, p.58 (২১৬ + ১৪২), p.61 (৪৬৮ + ৩৯৪) |
| 59 | Equation Match | তিন অঙ্কের যোগ · মিলাও | `LSTW6JWV` | M2-p59-a | 8 pairs | p.59 1–2 |
| 59 | Work It Out | তিন অঙ্কের যোগ (২) | `LSRKTVKN` | M2-p59-b | 12 items (12 sums) + fresh add | p.59 2, p.62 2 (5)–(8) |
| 62 | Work It Out | তিন অঙ্কের যোগ (৩) | `LS59AWQD` | M2-p62-a | 9 items (9 sums) + fresh add | p.59 1 (without ৫২৩ + ৬১৪), p.62 2 (1)–(4) |
| 63 | Work It Out | যোগের গল্প | `LSZ9YVC4` | M2-p63-a | 11 items (11 stories) | p.56, p.58, p.59, p.61 and p.63 1–7 |
| 64 | Rapid Quiz | দশকের যোগ-বিয়োগ · দ্রুত | `LSHT23G2` | M2-p64-a | 10 questions | p.55 যোগ করি + p.64 বিয়োগ করি |
| 64 | Work It Out | দশকের বিয়োগ করে লিখি | `LSXXSD2K` | M2-p64-b | 12 items (12 sums) | p.64 (all 12) |
| 66 | Equation Match | তিন অঙ্কের বিয়োগ · মিলাও | `LSSRCQRP` | M2-p66-a | 8 pairs | p.66 1–2 |
| 66 | Work It Out | তিন অঙ্কের বিয়োগ (১) | `LSAG922R` | M2-p66-b | 12 items (11 sums, 1 stories) + fresh sub | p.65, p.66 1–2 and ৭৮৫ − ৪২১, p.67's story |
| 67 | Work It Out | তিন অঙ্কের বিয়োগ (২) | `LSRTY3Z6` | M2-p67-a | 12 items (12 sums) + fresh sub | p.67 নিজে করি 1 (1)–(6), p.68 (7)–(12) |
| 68 | Work It Out | বিয়োগের গল্প | `LSGX2W5Q` | M2-p68-a | 11 items (11 stories) | p.68 2–12 |
| 70 | Work It Out | ছবি দেখে হিসাব করি | `LSKCMG5Q` | M2-p70-a | 6 items (6 stories) | p.70 1–3 (খ), (গ); the numbers come from the pictures |
| 71 | Multiple Choice | যোগ ও বিয়োগের সমস্যা | `LSRZE2JJ` | M2-p71-a | 10 questions | p.68 2–4, 10, 12; p.71 1–3; p.72 10, 15 |
| 71 | Work It Out | যোগ-বিয়োগের গল্প (২) | `LS7SY7NN` | M2-p71-b | 9 items (9 stories) | p.71 1–8 (6: its (ক) and its question) |
| 72 | Work It Out | যোগ-বিয়োগের গল্প (৩) | `LSBVQZ7A` | M2-p72-a | 9 items (9 stories) | p.72 9–15 (12 (ক), (গ); 15 (খ), (গ)) |
| 76 | Equation Match | যোগ থেকে গুণ · মিলাও | `LSM5GRXD` | M2-p76-a | 6 pairs | p.73, p.76, p.77, p.80, p.83 |
| 77 | Work It Out | যোগ থেকে গুণ · হিসাব করি | `LSWXWHKP` | M2-p77-a | 10 items (6 boxes, 3 sums, 1 stories) | p.73 (মাছ, আলু), p.74 (আপেল, ৪ ছড়া কলা), p.75 (৬টি থালা), p.76, p.77 (আলু, মাছ, কলা), p.78 (টমেটো) |
| 81 | Work It Out | ৫ ও ২ এর গুণ লিখি | `LSSTXY9D` | M2-p81-a | 11 items (10 sums, 1 stories) + fresh mul 2 | p.79 (৫ × ৩, ৫ × ৪), p.80 story, p.81 (২ × ৩ … ২ × ১০) |
| 83 | Equation Match | ২ ও ৫ এর নামতা · মিলাও | `LSXFFU7W` | M2-p83-a | 8 pairs | p.80 and p.83 tables |
| 84 | Work It Out | ৩ এর গুণ লিখি | `LSAWM27M` | M2-p84-a | 8 items (8 sums) + fresh mul 3 | p.84 1–2 |
| 86 | Work It Out | ৪ এর গুণ লিখি | `LSFJWQH4` | M2-p86-a | 8 items (8 sums) + fresh mul 4 | p.86 1–2 |
| 87 | Rapid Quiz | নামতা ২–৫ · দ্রুত | `LSWGF5C9` | M2-p87-a | 10 questions | pp.80–87 tables of 5, 2, 3, 4 |
| 87 | Work It Out | গুণের গল্প (১) | `LS9V48VE` | M2-p87-b | 10 items (10 stories) | p.83 1–2, p.85 1–3, p.87 1–3, p.89 1 |
| 88 | Work It Out | ৬ এর গুণ লিখি | `LSET3A5J` | M2-p88-a | 8 items (8 sums) + fresh mul 6 | p.88 table |
| 90 | Work It Out | ৭ এর গুণ লিখি | `LS4Z4JQZ` | M2-p90-a | 8 items (8 sums) + fresh mul 7 | p.90 table |
| 93 | Equation Match | ৬, ৭, ৮ ও ৯ এর নামতা · মিলাও | `LSQB7YAV` | M2-p93-a | 8 pairs | pp.89–93 tables |
| 94 | Work It Out | গুণের গল্প (২) | `LSBM7S9P` | M2-p94-a | 8 items (8 stories) | p.91 1, p.92 1–2, p.93 1–2, p.94 1–3 |
| 96 | Work It Out | ১ ও ০ এর গুণ | `LSDNTJ6A` | M2-p96-a | 8 items (2 stories, 6 sums) | p.95 1–2, p.96 |
| 97 | Rapid Quiz | নামতা ৬–১০ · দ্রুত | `LS456XJT` | M2-p97-a | 10 questions | p.97 গুণের নামতা |
| 98 | Multiple Choice | গুণের বিনিময়, ১ ও ০ এর গুণ | `LSQWNZU4` | M2-p98-a | 9 questions | p.98 1–2, p.95, p.96 |
| 99 | Equation Match | দুই অঙ্কের সংখ্যার গুণ · মিলাও | `LSKJNMSW` | M2-p99-a | 7 pairs | p.99 example + 1 |
| 99 | Work It Out | গুণ করি ও গল্পের অঙ্ক | `LSSSTQZM` | M2-p99-b | 12 items (6 sums, 6 stories) | p.99 1–3, p.100 2, p.101 3–5 |
| 101 | Multiple Choice | গুণের সমস্যা | `LSWRABHQ` | M2-p101-a | 10 questions | pp.80, 83, 85, 87, 89, 91, 92, 93, 99, 101 |
| 103 | Categorize | আকৃতি চিনি · সাজাও | `LSZMVGBQ` | M2-p103-a | 3 groups, 12 items | p.102 (ফুটবল, পিরামিড, বই, কয়েন, ম্যাচ বাক্স, মার্বেল), p.103 (আংটি, সমুচা, ইট), p.104 1 (পাউরুটি, রসগোল্লা, মোয়া) |
| 104 | Multiple Choice | কোনটি কোন আকৃতি? | `LSZCF5E9` | M2-p104-a | 9 questions | pp.102–104 |
| 106 | Multiple Choice | প্যাটার্ন: পরেরটি কী? | `LSKXF7YE` | M2-p106-a | 6 questions | p.106 (the first four); the last two use the same shapes |
| 108 | Multiple Choice | দৈর্ঘ্য পরিমাপ | `LS2UGH88` | M2-p108-a | 6 questions | pp.107–109 |
| 112 | Multiple Choice | ওজন পরিমাপ | `LSSZGFN3` | M2-p112-a | 7 questions | pp.111–113 (বাটখারা: p.112, p.113) |
| 116 | Multiple Choice | তরলের আয়তন | `LSQ9ZX77` | M2-p116-a | 5 questions | pp.114–116 |
| 118 | Multiple Choice | কয়টা বাজে? | `LS7RNY7W` | M2-p118-a | 10 questions | p.117, p.118 2–3 |
| 119 | Sequence | সাত দিনের নাম (শনিবার থেকে) · সাজাও | `LSYGHS9K` | M2-p119-a | 7 items | p.119 (the circle; we start at শনিবার) |
| 119 | Sequence | বাংলা মাসের নাম · সাজাও | `LS9YKRC6` | M2-p119-b | 12 items | p.119 |
| 120 | Sequence | ইংরেজি মাসের নাম · সাজাও | `LSBZG7FB` | M2-p120-a | 12 items | p.120 |
| 120 | Multiple Choice | আগের ও পরের দিন, মাস | `LSEZQ5UG` | M2-p120-b | 10 questions | p.119 1–2, p.120 1–3 |
| 122 | Categorize | টাকার বিনিময় · সাজাও | `LSCNMCHE` | M2-p122-a | 3 groups, 9 items | p.122 |
| 123 | Multiple Choice | টাকা দিয়ে দাম দিই | `LS9MUM8F` | M2-p123-a | 6 questions | p.123 example + 1, p.124 table |
| 124 | Multiple Choice | টাকার হিসাব | `LS4JXKD2` | M2-p124-a | 7 questions | p.121, p.122, p.124 2–4 |
| 126 | Multiple Choice | ফলের তালিকা ও ট্যালি চিহ্ন | `LSZM9NKE` | M2-p126-a | 9 questions | p.125 (ট্যালি চিহ্ন), p.126 table |

## Update 2 Nov 2026: the math tools

`ACTIVITIES-bn-update-2026-11-02-tools.json` holds **only the 22 new activities**, made with Activity Studio's eight new math types (Work It Out's tools, each its own type). It has the same format and the same book block as `ACTIVITIES-bn.json`; the full `ACTIVITIES-bn.json` above now holds all 164.

**To import it:** open the book that already has the first 85 → **Import activity file** → choose `ACTIVITIES-bn-update-2026-11-02-tools.json`. The importer adds these as new drafts with their codes and leaves the 85 as they are. (Importing the full `ACTIVITIES-bn.json` into that book again would do the same: the 85 show as already imported, matched by their codes and keys.) Then publish them from the book's activity list, as with the first file.

Like Work It Out, the items carry **no answers**: the server works each one out (the wrong digit and its fix, the share, the time, the total, the length or weight, the missing shape, the pieces). Where it helps, `configuration.fresh` adds 5 new problems of the same tool after the page's own (clock, money, groups, mistakes, shape patterns).

- Per type: Find the Mistake **4** (32 items) · Make Equal Groups **2** (16 items) · Number Line **4** (30 items) · Clock & Time **3** (14 items) · Taka Shop **3** (24 items) · Measure It **3** (23 items) · Shape Patterns **2** (13 items) · Make a Shape **1** (4 items)
- Per chapter: অধ্যায় ১ · সংখ্যা ও স্থানীয় মান **2** · অধ্যায় ২ · যোগ ও বিয়োগ **4** · অধ্যায় ৩ · গুণ **4** · অধ্যায় ৪ · জ্যামিতিক আকৃতি ও প্যাটার্ন **3** · অধ্যায় ৫ · পরিমাপ **6** · অধ্যায় ৬ · মুদ্রা **3**

| Page | Type | Title | Code | QR | Content | From |
|---:|---|---|---|---|---|---|
| 30 | Number Line | সংখ্যারেখায় প্যাটার্ন (১) | `LS7Q93YG` | M2-p30-a | 6 items (3 place, 3 read) | p.30 (1) ২, ৪, ৬, ৮ …; (2) ১৫, ২০, ২৫ …; (3) ২১, ১৯, ১৭, ১৫ … |
| 32 | Number Line | সংখ্যারেখায় প্যাটার্ন (২) | `LSXNDHMU` | M2-p32-a | 8 items (3 place, 5 read) | p.31 (4) (1)–(2), (5); p.32 (6), (7) (2)–(3) |
| 44 | Find the Mistake | ভুলটি খুঁজি: হাতে রেখে যোগ | `LS2FSRSN` | M2-p44-c | 8 items (8 add) + 5 fresh | p.44 1 (২৩ + ১৮, ৪৫ + ২৭, ২৬ + ৩৭), p.44 2 (৪৭ + ১৮, ৪২ + ২৯), p.45 1–2 (৫৬ + ১৪, ৩৬ + ১৭, ৭৫ + ১৫) |
| 52 | Find the Mistake | ভুলটি খুঁজি: দশক থেকে ১ দশ নিয়ে বিয়োগ | `LSNRGPPD` | M2-p52-c | 8 items (8 sub) + 5 fresh | p.51 1 (৯৭ − ৫৯, ৭১ − ৪৪, ৭০ − ২২), p.51 2 / p.52 4 (৩২ − ১৫, ৮৫ − ৪৭, ৬৪ − ২৭, ৯২ − ২৩, ৫০ − ৩) |
| 62 | Find the Mistake | ভুলটি খুঁজি: তিন অঙ্কের যোগ | `LSHTRTRA` | M2-p62-b | 8 items (8 add) + 5 fresh | p.61 (৪৬৮ + ৩৯৪), p.62 2 (1)–(4), (5), (6), (8) (৫৬৮ + ৪৩২ = ১০০০ left out) |
| 67 | Find the Mistake | ভুলটি খুঁজি: তিন অঙ্কের বিয়োগ | `LS2YG8B6` | M2-p67-b | 8 items (8 sub) + 5 fresh | p.67 নিজে করি 1 (1)–(2), (4), (6), p.68 (7), (9), (10), (11) |
| 77 | Make Equal Groups | সমান ভাগে ভাগ করি (১) | `LSFAXRTP` | M2-p77-b | 8 items + 5 fresh | p.73 (আপেল, আলু, মাছ: ৫টি থালা), p.74 (৪ ছড়া কলা, ৪টি করে), p.75 (৬টি থালা), p.77 (৩টি থালায় মাছ), p.78 2 (1) (ফুটবল) and the ৪টি থালায় ৫টি করে টমেটো |
| 81 | Number Line | সংখ্যারেখায় লাফ: ৫ ও ২ এর গুণ | `LS2K7UQX` | M2-p81-b | 8 items (4 read, 4 place) | p.79–80 (৫ × ৩, ৫ × ৬ লিচু, the ৫ table), p.81 (২ × ৩, ২ × ৪, ২ × ৭, ২ × ৯) |
| 86 | Make Equal Groups | সমান ভাগে ভাগ করি (২) | `LSQD4NFU` | M2-p86-b | 8 items + 5 fresh | p.79 1–2 (টমেটো, ৫টি করে), p.80 (৬টি থালায় ৫টি করে লিচু), p.84 1–2 (ট্রেতে ৩টি করে বল), p.86 1–2 (থালায় ৪টি করে আপেল) |
| 86 | Number Line | সংখ্যারেখায় লাফ: ৩ ও ৪ এর গুণ | `LSHBJFZC` | M2-p86-c | 8 items (4 read, 4 place) | p.84 1–2 (৩ এর গুণ), p.86 1–2 (৪ এর গুণ) |
| 104 | Make a Shape | আকৃতি বানাই | `LS693QZ8` | M2-p104-b | 4 items | pp.102–104 (ত্রিভুজ, চতুর্ভুজ, গোলাকার; p.104 2's picture made of triangles and four-sided shapes) |
| 106 | Shape Patterns | আকৃতির প্যাটার্ন (১) | `LSM3V994` | M2-p106-b | 7 items + 5 fresh | p.106 (○□□□○□□□ and △□□□△□□□, the gap in different places); ○□, △○ and ○○△ are new, with the same shapes |
| 106 | Shape Patterns | আকৃতির প্যাটার্ন (২) | `LSJ7BRXP` | M2-p106-c | 6 items + 5 fresh | new patterns like p.105–106's (two to four shapes, in colours; p.105 জেব্রা ক্রসিং's stripes as the last-but-one) |
| 109 | Measure It | স্কেল দিয়ে মাপি | `LSAN93GH` | M2-p109-a | 8 items (8 ruler) | p.109 (পেনসিল ৮, ১২ ও ৯ সে.মি.), p.110 (গ্লাস ৩, মোমবাতি ৫ সে.মি.); 🖍️ ৭, 🥕 ১৪, 🍌 ১৮ are new |
| 113 | Measure It | দাঁড়িপাল্লায় ওজন মাপি | `LSKTHP3H` | M2-p113-a | 9 items (9 balance) | p.112 (২৫ গ্রাম: ১০ + ১০ + ৫, ২০ + ৫), p.113 (৫০ গ্রাম ও ১০০ গ্রাম, দুইভাবে করে); ১৭০, ২৫০ and ১০০০ গ্রাম are new, with p.112's weights |
| 116 | Measure It | জগে পানি মাপি (মিলিলিটার) | `LSHPCEZ2` | M2-p116-b | 6 items (3 read, 3 fill) | p.116 (১ লিটারের বোতল); beyond the page: ১ লিটার = ১০০০ মিলি, আধা লিটার = ৫০০ মিলি |
| 117 | Clock & Time | ঘড়ি দেখি | `LSE54CWV` | M2-p117-a | 5 items (5 read) + 5 fresh | p.117 1 (৯টা, ১টা, ৪টা) and its ৩টা; p.118 2's ৮টা |
| 118 | Clock & Time | ঘড়ির কাঁটা বসাই | `LSUJYF9Z` | M2-p118-b | 4 items (4 set) + 5 fresh | p.118 2 (৮টা, ২টা, ১০টা, ৩টা বাজে) |
| 118 | Clock & Time | ঘণ্টা ও মিনিট | `LS9ZCHN8` | M2-p118-c | 5 items (3 read, 2 set) + 5 fresh | p.118 3 (ডিজিটাল ঘড়ি: ১১:১৫, ১১:৩৫, ০৮:২০, ০৬:২৫, ০৭:৪৫) |
| 123 | Taka Shop | টাকা গুনি | `LSZT9G8P` | M2-p123-b | 8 items (8 count) + 5 fresh | p.122 (২০০: ২টি ১০০, ১টি ১০০ ও ২টি ৫০, ২টি ৫০ ও ৫টি ২০; ৫০০: ৫টি ১০০; ১০০০: ২টি ৫০০), p.123 (মিরাজের ৩০ টাকা: ২টি ১, ৪টি ২, ২টি ৫, ১টি ১০; 1: ৫০ টাকা), p.124 (কলা: ৫০ + ১০) |
| 124 | Taka Shop | দোকানে কেনাকাটা | `LSTKSA5Q` | M2-p124-b | 8 items (8 pay) + 5 fresh | p.124 table (পেঁপে ১৮৮, কলা ৬০, আপেল ১২০, তরমুজ ৫৫০, কাঁঠাল ২৫০ টাকা), p.124 2 (ডিম ৪০ + বিস্কুট ৬৫), 3 (খাতা ও কলম ১০৫), p.123 (মিরাজের ৩০ টাকার কলম) |
| 124 | Taka Shop | ফেরত টাকা হিসাব করি | `LSR5AJZA` | M2-p124-c | 8 items (8 change) + 5 fresh | p.124 4 (মেহেরুল: ১০০ + ৫০ টাকা, জ্যামিতি বক্স ১২০ টাকা); the others are new: p.124's prices paid with the next bigger note |

## Update 3 Nov 2026: a game for every page

`ACTIVITIES-bn-update-2026-11-03-pages.json` holds **only the 57 new activities**, so that every page with something to practise has at least one game (the user: “all the pages should have at least one activity if there are some relevant contents in the page”). Import it into /b/GDK2NH the same way as the tools update; the full `ACTIVITIES-bn.json` above holds all 164.

| Page | Type | Title | Code | QR | Content | From |
|---:|---|---|---|---|---|---|
| 3 | Multiple Choice | ব্লক গুনি ও কথায় লিখি (৩১–৩৬) | `LS5P5HN9` | M2-p3-a | 10 questions | p.3 table (৩১–৩৬): blocks → number (৩১, ৩৩, ৩৫, ৩৬), number → words (৩১, ৩২, ৩৪, ৩৬), words → number (৩৩, ৩৫) |
| 6 | Rapid Quiz | কথায় লিখি (৫১–১০০) · দ্রুত | `LS3D8SEC` | M2-p6-a | 10 questions | p.6 table (৫৩, ৫৮, ৬২, ৬৪, ৬৮, ৭১, ৭৩, ৭৯, ৮২, ৯৬: none of them in p.7's game) |
| 8 | Multiple Choice | ১০ এর দল করে ফুল গুনি | `LSSJZEAT` | M2-p8-a | 10 questions | p.8 (ছবিতে কতগুলো ফুল আছে? ১০ এর দল গঠন করে গণনা); the count ৫৪ = ৫টি দশ ও ৪টি এক is p.9's; then the same with p.7 নিজে করি 1's ২৪, ৮৭, ৭৫, ৯৩, ১০০ |
| 9 | Multiple Choice | ব্লক ও কাঠি দিয়ে গুনি | `LST5QKDX` | M2-p9-a | 10 questions | p.9 (১০ এর ব্লক ৫টি ও ১ এর ব্লক ৪টি = চুয়ান্ন, ৫৪; ৩১টি বান্ডিল ও ৫টি খোলা কাঠি = ৩১টি ১০ এর ব্লক ও ৫টি ১ এর ব্লক); then bundles with p.7 নিজে করি 1's ৪৭ and ৩২ |
| 10 | Multiple Choice | শত, দশ ও এক এর দল গুনি | `LSRRQ8SP` | M2-p10-a | 10 questions | p.10 (তিনশত, চল্লিশ, পাঁচ → ৩৪৫, তিনশত পঁয়তাল্লিশ, and back; ব্লকের সংখ্যা অঙ্কে লিখি: ২ শত ৩ দশ ৬ এক); then blocks for p.13's ৩০৪, ৭৫০, ১৩৪ |
| 12 | Multiple Choice | কার্ড ও টাকা গুনে অঙ্কে লিখি | `LSUUM8F8` | M2-p12-a | 10 questions | p.12 নিজে করি 1 (the cards: ৭টি ১০০, ৬টি ১০, ৫টি ১) and 2 (the notes: ৫টি ১০০, ৫টি ১০, ৪টি ১ টাকা; and the amount in words); p.11 নিজে করি 3's notes (৪টি ১০০, ৫টি ১০, ২টি ১ টাকা) |
| 14 | Multiple Choice | দশ এর দল দিয়ে তুলনা করি | `LSGS96EH` | M2-p14-a | 10 questions | p.14 (৬২ ও ৪৫: দশ এর দল ৬টি ও ৪টি); the other pairs are p.7 নিজে করি 1's numbers |
| 15 | Multiple Choice | শত এর দল দিয়ে তুলনা করি | `LSAQUB5E` | M2-p15-a | 10 questions | p.15 (৪৩৪ ও ২৫৩: শত এর দল ৪টি ও ২টি); the other pairs are p.13's numbers |
| 17 | Work It Out | স্থানীয় মানে লিখি: দশক ও একক | `LSCMHNSB` | M2-p17-a | 4 items (4 place value) + fresh place | p.17 (১৪টি কাঠি: ১ দশক ও ৪ একক; ২৩টি ব্লক: ২ দশক ও ৩ একক), both ways |
| 18 | Multiple Choice | হাজার, শত, দশ ও এক গুনি | `LS9Q2DSJ` | M2-p18-a | 10 questions | p.18 (the jumbled blocks: ৩ শত ৫ দশ ৬ এক = ৩৫৬; the cards: ২টি ১০০০, ৪টি ১০০, ৪টি ১০, ২টি ১ = ২৪৪২, the number p.19 starts with) |
| 19 | Multiple Choice | ছবি দেখে স্থানীয় মান লিখি | `LSEMBNEH` | M2-p19-a | 10 questions | p.19 (২৪৪২: ২ হাজার ৪ শতক ৪ দশক ২ একক; ৪ শতক = ৪০০), 1 (৪ দশক ৬ একক: ৪০ ও ৬), 2 (২৬, ৪০, ৫৩) |
| 22 | Multiple Choice | স্থানীয় মানের সাহায্যে তুলনা | `LS9RJ5WC` | M2-p22-a | 10 questions | p.22 (৪৬০ ও ৬৩০; ৫৬২ ও ৫৪৮); more pairs from p.13 (৩৩৩, ৩৮২; ৯৯৮, ৯২৫; ৫৯০, ৫০৫) and p.24 (২৩২, ২৩৯; row (4) ৭২৯, ৭২৬; row (3) ৪০৭, ৩৩০) |
| 25 | Make Equal Groups | ২টি করে দল: নারিকেল ভাগ করি | `LSW7UZFY` | M2-p25-a | 5 items + 5 fresh | p.25 (১২টি নারিকেল: ৬টি থালায় ২টি করে; ৬: the ▲ picture's lower row); ৪, ৮, ১০ are new |
| 25 | Multiple Choice | ২টি করে দল: কয়টি দল, কয়টি বাকি? | `LSP5G2AY` | M2-p25-b | 10 questions | p.25 (১২টি নারিকেল, ৭ + ৫) and its ▲ (১৩টি, ৭ + ৬); the dialogue (২ এর দল) |
| 26 | Multiple Choice | কয় জোড়া? জোড় ও বিজোড় | `LS8NS57D` | M2-p26-a | 10 questions | p.26 table (কানের দুল ২, ৩; কবুতর ২, ৪; নারিকেল ৫; মোজা ৬; ব্লক ২, ৭) |
| 27 | Multiple Choice | জোড়া দিয়ে সংখ্যা তৈরি করি | `LSEE44HQ` | M2-p27-a | 10 questions | p.27 (৩–৬টি ব্লক জোড়ায় ভাগ), its ■ (আর কোন কোন সংখ্যা: ৭–১০) and its table (২, ৪, ৬, ৮, … / ১, ৩, ৫, ৭, ৯, …) |
| 28 | Multiple Choice | শেষের অঙ্ক দেখে জোড়-বিজোড় চিনি | `LSU6TRFD` | M2-p28-a | 10 questions | p.28 (the ১–৫০ chart, its rings, and the rule: শেষে ২, ৪, ৬, ৮ বা ০ / ১, ৩, ৫, ৭ বা ৯) |
| 35 | Multiple Choice | বাম থেকে, ডান থেকে: কততম? | `LS45K7FF` | M2-p35-a | 10 questions | p.35 ■২ (ফল), ▲২ (বাম থেকে চার জন / চতুর্থ জন), ■৩ (আলী) |
| 36 | Multiple Choice | সামনে, পিছনে ও মোট কতজন? | `LSNGCWCT` | M2-p36-a | 10 questions | p.36 ▲৩ (সবিতা), ▲৪ (রাজু), ■৪ (তামিম) |
| 38 | Multiple Choice | সাতজন না সপ্তম জন? | `LS2R89Z4` | M2-p38-a | 10 questions | p.38 ▲৬ (ডানদিক থেকে সাত জন / সপ্তম জন); the names are p.37's line |
| 39 | Work It Out | লাইনে কতজন? হিসাব করি | `LSH5TPES` | M2-p39-a | 10 items (10 stories) | p.36 ▲৩, ▲৪, ■৪ and p.39 ▲৭, ■৫ (its “চিত্র একে সমাধান করি” left out); p.39's two asked again (behind মিল্টন, in front of রাজু); মিনা, তুলি, আলী are new |
| 40 | Multiple Choice | কার্ড একত্র করি | `LSXPSJJN` | M2-p40-a | 10 questions | p.40 (রাফির ৪৩টি ও তুলির ৩২টি কার্ড: the bundles of ১০, the page's question and ৪৩ + ৩২ = □; ৪৩ + ৩০ and ৪৩ + ২ from the picture's parts; ৪৩ + ৭ = ৫০ is new) |
| 41 | Work It Out | স্থানীয় মান দিয়ে যোগ করি | `LSF2GH7F` | M2-p41-a | 4 items (2 boxes, 2 sums) + fresh add | p.41 (একক এর স্থান ৩ + ২ = ৫, দশক এর স্থান ৪ + ৩ = ৭; ৪৩ + ৩২ and ৩২ + ১৬ in columns) |
| 43 | Multiple Choice | হাতে রেখে যোগ: ধাপে ধাপে | `LSJVCRTN` | M2-p43-a | 10 questions | p.43 (৩৮ + ২৪: সাজিয়ে নিই, ৮ + ৪ = ১২, ১২ হলো ১ দশ ২, দশকের স্থানে নিয়ে যাই, ৩ + ২ + ১ = ৬); ১ দশ = ১০ একক and the forgotten ১ (৫২) are new |
| 46 | Work It Out | কাগজ সরিয়ে নিই | `LSJAVMJW` | M2-p46-a | 4 items (3 place value, 1 stories) + fresh sub | p.46 (মিনার ৩৬টি কাগজ: ৩৬ = ৩ দশ ৬, ১৩ = ১ দশ ৩ একক, what is left ২ দশ ৩, and the story) |
| 47 | Equation Match | স্থানীয় মান দিয়ে বিয়োগ · মিলাও | `LSDFQSQE` | M2-p47-a | 10 pairs | p.47 (৩৬ − ১৩) and 1 (1)–(4), and their একক and দশক worked apart (৬ − ৩, ৩০ − ১০, ৫ − ৩, ৬ − ২, ৫০ − ১০) |
| 50 | Multiple Choice | দশক থেকে ১ দশ নিয়ে বিয়োগ: ধাপে ধাপে | `LSBW3HMN` | M2-p50-a | 10 questions | p.50 (রাজুর ৪৫টি রং পেনসিল: ৪৫ − ১৮; ১৮ = ১ দশ ৮, ১০ + ৫ = ১৫ (৪৫ = ৩ দশ ১৫), ১৫ − ৮ = ৭, ৩ − ১ = ২); the check ২৭ + ১৮ is new |
| 53 | Work It Out | যোগ ও বিয়োগের সম্পর্ক | `LSBS4HWF` | M2-p53-a | 4 items (1 stories, 3 boxes) + fresh missing | p.53 (the story, □ − ৫ = ৬ ⟶ ৬ + ৫ = □, and the cross's ১১ − ৫ = ৬) |
| 56 | Multiple Choice | দশের দল গুনে যোগ করি | `LS4HVCA7` | M2-p56-a | 10 questions | p.56 (দিলীপের ৭৩টি ও দীপার ৫৪টি কাগজ: দশের দল ১০টির বেশি, উত্তর ১০০ এর বেশি; ১২ দশক = ১ শতক ২ দশক as on p.57); ৭৩ + ২৭ = ১০০ is new |
| 58 | Work It Out | স্থানীয় মান দিয়ে তিন অঙ্কের যোগ | `LSK4QNNJ` | M2-p58-a | 5 items (3 boxes, 1 sums, 1 stories) + fresh add | p.58 (২১৬ + ১৪২: একক ৬ + ২, দশক ১ + ৪, শতক ২ + ১; রাজু ১৩৪টি ও মীনা ১৪৫টি ফুল) |
| 60 | Multiple Choice | লুকানো অঙ্ক খুঁজি | `LS2YCHHX` | M2-p60-a | 10 questions | p.60 3: the yellow example (৩☐৫ + ১২☐ = ৪৫৭), 1–2 (৪☐৫ + ২১☐ = ৬৩৯, ৫১☐ + ৩☐৫ = ৮৭৬: one question a hidden digit), 3 (৬ on top; (☐, ৩৯) is new), 4 (১, ৬, ১১, ১৬, ?), 5 (the crosses) |
| 61 | Multiple Choice | তিন অঙ্কের হাতে রেখে যোগ: ধাপে ধাপে | `LSKUA327` | M2-p61-a | 10 questions | p.61 (৪৬৮ + ৩৯৪: ৮ + ৪ = ১২, ৬ + ৯ + ১ = ১৬ = ১ শতক ৬ দশক, ৪ + ৩ + ১ = ৮) and 1 (রাজুর খাতা ২৬৭ + ১৪৫) |
| 65 | Multiple Choice | শতক থেকে দশক নিয়ে বিয়োগ: ধাপে ধাপে | `LSGNC54B` | M2-p65-a | 10 questions | p.65 (১২৫ − ৪৩: সাজিয়ে নিই, ৫ − ৩, শতকের স্থান থেকে ১০ দশক, ১০ + ২ = ১২, ১২ − ৪ = ৮, শতকে কিছু থাকে না); the check ৮২ + ৪৩ is new |
| 69 | Work It Out | লোকসংখ্যা কত? | `LSB56D6G` | M2-p69-a | 5 items (2 compare, 3 stories) + fresh sub | p.69 (ক)–(গ) (লোকসংখ্যা ৬৭৩, নতুন এলো ১১৭ জন, চলে গেল ১০৫ জন; বেশি হবে / কম হবে as ○ items) + fresh three-digit taking away |
| 73 | Multiple Choice | কয়টি থালায় কয়টি করে? গাণিতিক বাক্য | `LSA4XE33` | M2-p73-a | 10 questions | p.73 (মাছ ও আলু কয়টি থালায় কয়টি করে আছে?: ৫টি থালায় ৪টি করে মাছ, ৩টি করে আলু; ৪ + ৪ + ৪ + ৪ + ৪, ৩ + ৩ + ৩ + ৩ + ৩; the picture's ২টি করে আপেল and ৪টি করে কলা) |
| 74 | Rapid Quiz | থালা দেখে গুনি · দ্রুত | `LSWAFB4Y` | M2-p74-a | 10 questions | p.74 (৫টি থালায় ২টি করে আপেল, ৪ ছড়ায় ৪টি করে কলা), p.75 (৬টি থালা); ৩, ৭ and ৯ plates of apples, ২, ৩, ৫ and ৬ bunches of bananas are new |
| 75 | Multiple Choice | আরও ১টি থালা যুক্ত করি | `LSK5MRCH` | M2-p75-a | 10 questions | p.75 (কলা গণনার গাণিতিক বাক্য ও ___টি কলা; ২: ৫টি থালায় ২টি করে আপেল, আরও ১টি থালা), the same question for কলা and p.73's আলু and মাছ; আরও ২টি থালা and ১টি থালা সরিয়ে নিলে are new |
| 78 | Multiple Choice | ছবি দেখে গুণের গাণিতিক বাক্য | `LSSUYDVU` | M2-p78-a | 10 questions | p.78 ২ (১) ৫টি ট্রেতে ৩টি করে বল, (২) ৫টি থালায় ৪টি করে আপেল, (৩) ৪টি গোছায় ৪টি করে ফুল (read at 300–400 dpi), and ৫ এর গুণ: ৪টি থালায় ৫টি করে টমেটো; what ৩ and ৫ stand for, in p.76's words (new) |
| 79 | Multiple Choice | থালা বাড়লে টমেটো কীভাবে বাড়ে? | `LSG9DCFY` | M2-p79-a | 10 questions | p.79 ১–২ (৫ × ১ … ৫ × ৪: ৩টি বা ৪টি থালায়; যে কোনো ৫টি থালা) and the children's question: থালা বাড়লে টমেটো কীভাবে বাড়ে?; ৫ × ৬ and থালা ১টি কমলে are new |
| 80 | Work It Out | ৫ এর গুণ লিখি | `LSXJ6RE9` | M2-p80-a | 8 items (8 sums) + fresh mul 5 | p.80 ৫ এর গুণের নামতা (৫ × ৩ … ৫ × ১০; the L paper's ৫ × ৩ and ৫ × ৮) |
| 82 | Rapid Quiz | গুণের কার্ড খেলা · দ্রুত | `LS3CNFJ3` | M2-p82-a | 10 questions | p.82 ২ গুণের কার্ড (২ × ৪ → ৮, ৫ × ৩ → ১৫, ১৮ → ২ × ৯) and খেলা–১, ২ with the ৫ and ২ sets |
| 85 | Equation Match | ৩ এর নামতা · মিলাও | `LS9KRDNS` | M2-p85-a | 10 pairs | p.85 ৩ এর গুণের নামতা, all ten rows (the L paper's ৩ × ৫ and ৩ × ৮ first) |
| 89 | Work It Out | ৬ এর গুণকে ২ ও ৪ এর গুণে সাজাই | `LSNQ736F` | M2-p89-a | 10 items (10 boxes) | p.89 (৬ × ৩ = ২ × ৩ + ৪ × ৩ = ৬ + ১২ = ১৮; ৬ × ৫ = ৩০, যা ২ এর গুণ ও ৪ এর গুণের যোগফল) and the rest of the ৬ table split the same way |
| 91 | Equation Match | ৭ এর গুণ ভেঙ্গে দেখি · মিলাও | `LSMGR7BV` | M2-p91-a | 10 pairs | p.91 (৭ × ৫ = ৩৫: ৪ × ৫ = ২০, ৩ × ৫ = ১৫) and the rest of the ৭ table (৭ × ১ … ৭ × ১০) split the same way |
| 92 | Multiple Choice | ৮ এর গুণ ভেঙ্গে দেখি | `LSC5FRCZ` | M2-p92-a | 10 questions | p.92 (৪৮ = ৮ × ৬ = ৩ × ৬ + ৫ × ৬ = ১৮ + ৩০; the L paper from ৬ to ৭ columns; 1 চকলেট, 2 শিক্ষার্থী); ৮ × ৪, ৮ × ৮ and ৮ × ৯ split the same way; ৮, ১৬, ২৪, ৩২, … is new |
| 95 | Multiple Choice | ১ এর গুণ | `LS7NE336` | M2-p95-a | 10 questions | p.95 (পুরস্কার: ২টি পেনসিল ও ১টি খাতা, ৫টি শ্রেণি: ২ × □ ও □ × □; ১ এর গুণের নামতা; ১ × ৩ ও ১ × ৭ এর যোগফল ১ × ১০; 1–2); ১ × □ = ৬ is new |
| 100 | Work It Out | গুণের ফুল: খালি জায়গা পূরণ করি | `LSB75J5Y` | M2-p100-a | 12 items (12 sums) + fresh mul | p.100 ১ (the flowers ৩, ৪, ৬, ৭, ৮ and ৯: two empty outer petals of each) |
| 102 | Multiple Choice | কোনটি গোল, তিনকোনা, চারকোনা? | `LS94KQ6Q` | M2-p102-a | 10 questions | p.102 (ফুটবল, পিরামিড, বই; ১ টাকার কয়েন, ম্যাচ বাক্স, মার্বেল, ছক্কা, ইট); the glass and the cone are left out; the corner questions are new |
| 105 | Multiple Choice | রঙের প্যাটার্ন: পরেরটি কী? | `LSHM8QB8` | M2-p105-a | 10 questions | p.105 (জেব্রা ক্রসিং, জেব্রার সাদাকালো ডোরা, ট্রাফিক বাতি); questions 7–8 use new patterns with the same colours; 9–10 ask which row keeps the pattern |
| 107 | Multiple Choice | লম্বায় তুলনা করি: পেনসিল দিয়ে মাপি | `LSZ4J89E` | M2-p107-a | 10 questions | p.107 (মেয়েটির ও ছেলেটির পেনসিল; 1: পাঠ্যপুস্তক ও জ্যামিতি বাক্স পেনসিল দিয়ে মাপা); the pencil counts are mine; questions 7–10 are new |
| 110 | Multiple Choice | কত সে.মি. উঁচু? দৈর্ঘ্য ও প্রস্থ | `LS8R72MR` | M2-p110-a | 10 questions | p.110 (গ্লাস ৩ সে.মি., মোমবাতি ৫ সে.মি.; 1: দৈর্ঘ্য ও প্রস্থের ছক); রাফির খাতা ২৫ × ১৮ সে.মি. and জ্যামিতি বক্স ১৭ সে.মি. are mine |
| 111 | Multiple Choice | কোনটি ভারী? কেজি ও গ্রাম | `LSP7KXGK` | M2-p111-a | 10 questions | p.111 (ডাস্টার না কলম; কলম ও বেলুন; ১ কেজি = ১০০০ গ্রাম; the seller's দাঁড়িপাল্লা and the ডিজিটাল মাপনী) |
| 114 | Multiple Choice | কোন বোতলে বেশি পানি ধরে? | `LS9R42RR` | M2-p114-a | 10 questions | p.114 (১) রেজার, (২) তুলির, (৩) রাফির পদ্ধতি; what each one sees is mine |
| 115 | Multiple Choice | কয় গ্লাস পানি ধরে? | `LSXAFXF4` | M2-p115-a | 10 questions | p.115 1 (ছোটো বোতল ৪ গ্লাস, বড়ো বোতল ৪ গ্লাস ও প্রায় আধা), 2 (দুটি গ্লাস), 3 (কেতলি ৭, সসপ্যান ৫ ও প্রায় আধা, বালতি ৮ গ্লাস) |
| 121 | Taka Shop | কয়েন ও নোট গুনি | `LSBERVGX` | M2-p121-a | 10 items (10 count) | p.121 (কয়েন: ১, ২ ও ৫ টাকা; নোট: ২০০, ৫০০ ও ১০০০ টাকা); the mixes are mine |
| 125 | Multiple Choice | দাগ টেনে গুনি: ট্যালি চিহ্ন | `LSWFPFHT` | M2-p125-a | 10 questions | p.125 (the picture: ৬ কলা, ৭ আম, ৮ লিচু, ৫ আপেল; ট্যালি চিহ্ন ১–৬ and the five-group text) |
| 127 | Multiple Choice | প্রিয় পাখির ট্যালি ও সারণি | `LSM88E59` | M2-p127-a | 10 questions | p.127 3 (খ) কাক, কোকিল, কবুতর ও শালিক, (ক) বাংলা, ইংরেজি ও গণিত, (গ) লাল, নীল, সবুজ, হলুদ ও বেগুনি; the tally counts are an example of mine |

**Every page has a game.**

### The every-page update: what I wasn't sure of

- **p.8** has one picture (৫৪টি ফুল, counted on p.9). Its game asks the ১০ এর দল idea five ways for ৫৪, then five more times with p.7 নিজে করি 1's numbers (২৪, ৮৭, ৭৫, ৯৩, ১০০) as flowers: the number of flowers in those five is mine.
- **p.9** asks “নিচে কতগুলো কাঠি আছে?” without printing the answer: 9 + 9 + 9 + 4 = ৩১টি বান্ডিল and ৫টি খোলা কাঠি (counted at 300 dpi; the blocks below are ৩১টি ১০ এর ব্লক ও ৫টি ১ এর ব্লক). The game works out ৩১৫ (= ৩ শত ১ দশ ৫ এক) with p.10's idea (১০টি ১০ = ১০০), one page before the book teaches it.
- **p.10** has two numbers (৩৪৫, ২৩৬); its game adds blocks for three of p.13's numbers (৩০৪, ৭৫০, ১৩৪: two with an empty place, written ০), as on p.10 but not on it. **p.9** likewise adds sticks for p.7's ৪৭ and ৩২. **p.12** adds p.11 নিজে করি 3's notes (৪টি ১০০, ৫টি ১০, ২টি ১ টাকা = ৪৫২), which p.11's own game doesn't use, and ৫৫৪ টাকা in words; its wrong options say চারশত পঞ্চান্ন, a word the book doesn't print (made like its তিনশত, পাঁচশত).
- **p.12** exercise 2's notes are read at 300 dpi as ১ টাকা (the yellow note with deer), ১০ টাকা (pink) and ১০০ টাকা (blue): ৪টি ১, ৫টি ১০, ৫টি ১০০ = ৫৫৪ টাকা (the redesign's comment in content/p011-024.js says ৫৪৫, a slip). They are ১৪ notes, more than Taka Shop's ১২, so the game asks them as multiple choice, with the notes written out in the book's order (৫৪৫ is one of the wrong options).
- **pp.14–15** each compare one pair (৬২ ও ৪৫; ৪৩৪ ও ২৫৩). Their games add seven pairs each made of the book's own numbers (p.7 নিজে করি 1's two-digit numbers; p.13's three-digit numbers), paired by me so that only the tens (p.14) or the hundreds (p.15) decide, as those pages teach; the explanations copy the pages' sentences (“৬২ এ দশ এর দল ৬টি ও ৪৫ এ দশ এর দল ৪টি। তাই ৬২ বড়ো।”).
- **p.17** has only two numbers (১৪ কাঠি, ২৩ ব্লক), so its Work It Out asks each both ways (১৪ = □ দশক □ একক, then ১ দশক ৪ একক = □) and adds 10 fresh two-digit problems.
- **p.19** exercises 1–2's blocks (README: “hard to count in the scan”) read clearly at 300 dpi: ৩ দশক ৫ একক (done on the page), ৪ দশক ৬ একক; ২ দশক ৬ একক, ৪ দশক ০ একক, ৫ দশক ৩ একক. The game says each picture in words (“ছবিতে দশের দল ৪টি ও এক ৬টি”).
- **p.22** works two pairs (৪৬০ ও ৬৩০; ৫৬২ ও ৫৪৮); its game adds six pairs of the book's numbers (p.13's list; p.24's example ২৩২, ২৩৯ and rows (3)–(4), which p.24's sort leaves out), paired by me so that the hundreds, the tens or the ones decide.
- **p.25:** Make Equal Groups shares the coconuts on plates, so “২টি করে দল” is asked as “১২টি জিনিস ৬টি থালায়” (২ on each); a share with one left over (the ▲'s ১৩টি নারিকেল: ৬টি দল, ১টি বাকি) can't pass build.js and validate.js (both want equal shares), so ১৩ is only in the multiple choice. ১২ and ৬ are the page's (the first picture, the ▲ picture's lower row); ৪, ৮ and ১০ are mine. 🥥 stands for the green coconuts.
- **p.27:** the matching writes each number the way the page's blocks are split into pairs (৫ = ২ + ২ + ১); ৭–১০ go beyond the page's ১–৬, as its ■ asks (“এভাবে আর কোন কোন সংখ্যা”). The ■ table itself (numbers that make pairs / don't) is a sort, which p.29's “জোড় না বিজোড়?” already is, so it isn't made again.
- **p.28:** the “কোনটি জোড়/বিজোড়?” options come from the ১–৫০ chart and share their tens digit, so only the last digit (the page's rule) decides.
- **p.36 / p.39:** the book's “□ + □ = □” for ▲৪ (রাজু সামনে থেকে তৃতীয়, পিছন থেকে পঞ্চম) can be ২ + ৫ or ৩ + ৪; the p.36 game asks it as ২ + ১ + ৪ (in front, রাজু, behind), and the p.39 Work It Out as ৩ + ৫ − ১ (worked in two steps, like the p.37 game's “৩ + ৫ − ১ = ৭”); ■৪ (তামিম) and p.39 ■৫ the same way (৩ + ৪ − ১, ৬ + ৩ − ১). p.37's game already asks ▲৩ and ▲৪'s totals, so p.36's game asks who is in front and behind and how to count, not the totals again.
- **At least 10 questions (the user, 3 Nov):** p.25's Make Equal Groups takes 5 fresh problems (the player's own sharing, not only twos); p.25's multiple choice adds the pictures' rows taken alone (৭: ১টি বাকি; ৫: ২টি দল; ৬: ৩টি দল). p.27 was a match, which holds at most 8 pairs, so it is now multiple choice (same slug and code): which split is ৩–৬ blocks (the page's pictures), ৭ and ৮ from their pairs, ৯'s left-over and ১০'s pairs (the ■ “আর কোন কোন সংখ্যা”, beyond the page's ৬), and each table row's next number (১০, ১১). p.36 adds “৩ + ৪ = ৭ করলে কাকে দুবার গোনা হয়?” (তামিম). p.38 adds the seventh as the last of the seven, and the seventh from the left (ডেভিড). p.39's Work It Out adds its two stories asked again (মিল্টনের পিছনে, রাজুর সামনে) and three new line stories in the book's words with the book's মিনা, তুলি and আলী (৪র্থ + ৬ = ১০, ৫ম and ৪র্থ from both ends = ৮, ৯ম + ২ = ১১).
- **p.38:** the page's ten children have no names; they are p.37's line (the same pictures, পিছন on the left), so two questions use p.37's names; the page's ringed seventh from the right is আব্দুল করিম (checked in the code).
- **p.40** the card stacks marked ১০ have no name on the page; the questions call them “১০টি করে কার্ডের … বান্ডেল”, p.42's word for a pack of cards (p.56's paper stacks are the page's own “দশের দল”).
- **pp.43, 47, 50, 61, 65** (and p.41's boxes) are worked examples; their games walk through the page's own working (p.43 “৮ + ৪ = ১২ … ১ দশ ২ … ৩ + ২ + ১ = ৬”, p.50 “১০ + ৫ = ১৫ … ১৫ − ৮ = ৭ … ৩ − ১ = ২”). The wrong options are the usual slips, worked out in code: a carry or a borrowed ten forgotten, the smaller digit taken from the bigger (৪৫ − ১৮ → ৩৩). p.65's “এককের স্থানে ৫ − ৩ = ২” and “শতকের স্থানে কিছু থাকে না” are read from the picture (৩ of the ৫ cubes crossed out; the last row's empty শতক); the page's text speaks only of the tens.
- **10 questions a game (3 Nov):** to reach 10, these questions are new, built from the page's worked example: p.40 “আর কয়টি কার্ড পেলে ৫টি পূর্ণ বান্ডেল” (৪৩ + ৭ = ৫০); p.43 the carried ১ = ১০ একক, and the answer with it forgotten (৫২); p.47's last five pairs are its own sums' একক and দশক worked apart (৬ − ৩, ৫ − ৩, ৬ − ২; the দশক written as tens, ৩০ − ১০ and ৫০ − ১০ for the page's “দশকের স্থান ৩ − ১”), only those whose answer no other pair has; p.50 and p.65 “মিলিয়ে দেখি” (২৭ + ১৮ = ৪৫, ৮২ + ৪৩ = ১২৫: p.53's যোগ ও বিয়োগের সম্পর্ক); p.56 ৭৩ থেকে ১০০ (২৭) and ১২৭ in শতক, দশক, একক; p.60 the tree read backwards ((☐, ৩৯) → ৩৩). p.60's yellow example (৩☐৫ + ১২☐ = ৪৫৭), whose answer the page works out, is now in. p.69 has 10 fresh three-digit take-aways with borrowing (its (খ) ৭৯০ − ১০৫ borrows).
- **p.65 changed type (same slug, same code):** it was a Sequence of the page's six steps, too few for 10 from its one example, so its steps are Multiple Choice questions now.
- **p.60** the number trees (3), the zigzag (4) and the crosses (5) have no words in the book; the questions say them in words (5: the middle number is the sum of the four around it, ৩ + ৭ + ২ + ৫ = ১৭ and ৩ + ২ + ৪ + ৬ = ১৫, checked in code). The hidden-digit sums are asked one place at a time, with both boxes shown.
- **p.69** the two ○ items (৬৭৩ + ১১৭ ○ ৬৭৩, ৭৯০ − ১০৫ ○ ৭৯০) are the children's “নতুন আসায় লোকসংখ্যা বেশি হবে” and “চলে যাওয়ায় লোকসংখ্যা কম হবে”; (খ) starts from (ক)'s ৭৯০, as the page does, and (গ) is played in two steps (৬৭৩ + ১১৭ − ১০৫ = ৭৯০ − ১০৫).
- **p.73–78 pictures:** the multiple-choice and quick-count questions draw each plate (tray, bunch) as emoji in brackets, e.g. (🐟🐟🐟🐟) for one plate of ৪টি মাছ. In p.74's quick count only ৫টি থালায় ২টি করে আপেল, ৪ ছড়ায় ৪টি করে কলা and p.75's ৬টি থালা are printed; ৩ and ৭ plates of apples and ২ and ৫ bunches of bananas are new. p.75 asks “আরও ১টি থালা” for the apples only; the same question for কলা (১ ছড়া) and p.73's আলু and মাছ is new.
- **p.78** exercise 2 (2)–(3), unclear at 150 dpi, read at 300–400 dpi: ৫টি থালায় ৪টি করে (the fruit looks like an apple; the page doesn't name it, the file says আপেল) and ৪টি গোছায় ৪টি করে ফুল (frangipani: 🌼; “গোছা” is mine). (1) is ৫টি ট্রেতে ৩টি করে বল (“ট্রে” as p.84 says).
- **p.79** stops at ৫টি থালা; “৫ × ৫ = ২৫ হলে ৫ × ৬ = কত?” goes one plate further, to the table on p.80, and “৫ × ৩ = ১৫ হলে ৫ × ২ = কত?” (one plate fewer) is new.
- **At least 10 questions (3 Nov):** to reach ten, the games first took the page's other exercises and pictures (p.73's apples and bananas, p.75's “___টি কলা”, p.79's ৩টি বা ৪টি থালা, p.85's whole ৩ table, p.92's problem 2 and “কোন কোন সংখ্যায় ভেঙ্গে দেখানো যায়?”, p.95's ২ × □ পেনসিল); the rest are new, in the same style: p.74 ৯ plates of apples and ৩ and ৬ bunches of bananas; p.75 আরও ২টি থালা and ১টি থালা সরিয়ে নিলে; p.78 what ৩ and ৫ stand for in ৩ × ৫ and ৪ × ৫, in p.76's words (প্রত্যেক দলে বস্তুর সংখ্যা, দলের সংখ্যা, মোট বস্তুর সংখ্যা); p.79 the gap ৫, ১০, ☐, ২০; p.91 ৭ × ১ (৪ + ৩) and ৭ × ১০ (৪০ + ৩০) split like ৭ × ৫; p.92 ৮, ১৬, ২৪, ৩২, …; p.95 ১ × ☐ = ৬.
- **p.82** describes card games for one and for two; the rapid quiz plays খেলা–১ (গুণ → উত্তর) and খেলা–২ (উত্তর → গুণ) alone, with the page's three cards (২ × ৪, ৫ × ৩, ১৮) and others from the ২ and ৫ sets. A খেলা–২ card's wrong options are its neighbours in the same table, so no two options make the same product.
- **p.89, p.91, p.92 splits:** each page splits one or two products (৬ × ৩ and ৬ × ৫ into the ২ and ৪ tables; ৭ × ৫ into ৪ and ৩; ৮ × ৬ into ৩ and ৫); the games split other rows of the same table the same way. p.91's match puts ৭ × ৫ on the left and ২০ + ১৫ (৪ × ৫ + ৩ × ৫) on the right, as the boy's sum does; a guide note says so.
- **p.95** asks “কতটি পুরস্কার” for ৫টি শ্রেণি (২টি পেনসিল ও ১টি খাতা each), which could be read as ৫ prizes or ১৫ things; the game asks the pencils (২ × ৫) and the খাতা (১ × ৫) apart, as the page's two boxes do.
- **p.100** flowers: the inner rings of ৩, ৬, ৭ and ৮ have one or two empty pieces with nothing to multiply; the game uses only printed inner numbers, two empty outer petals of each flower, and leaves out the petals the page fills in (২৭, ২১, ২০, ২৮, ৪২, ৪৯, ৫৬, ৬৪, ৩৬, ৪৫). Its fresh problems are mixed tables (২–১০).
- **p.102:** the game gives the page's shape word (গোল / তিনকোনা / চারকোনা আকৃতি) and asks which thing has it (p.104 asks the other way round). ছক্কা (the die) counts as চারকোনা (its faces); the glass and the cone are left out (round at the top, but four- or three-cornered seen from the side). The last two questions (তিনকোনা আকৃতির ৩টি কোনা, গোল আকৃতির কোনো কোনা নেই) are new, built from the page's shape names, to reach 10.
- **p.105** has no exercise; its game asks the colour patterns in its pictures: the জেব্রা ক্রসিং (⬜ ⬛: white stripes on the dark road), the zebra's সাদাকালো stripes and the traffic lights (🔴 🟡 🟢, the order the poles show top to bottom, not the lights' timing). Two patterns (⬜⬜⬛, 🟢🟢🔴) are new, and the last two questions (which row keeps the ⬜⬛ or 🔴🟡🟢 pattern; the wrong rows have one colour changed) are new, added to reach 10.
- **p.107** prints no lengths: its pencils are compared by the children's words (“তোমার পেনসিল বড়ো। আমার পেনসিল ছোটো।”), and exercise 1's measuring with a pencil uses counts of mine (পাঠ্যপুস্তক ৩, জ্যামিতি বাক্স ২ পেনসিল; the same book ৪ পেনসিল with তুলির পেনসিল, ৩ with রাফির). Questions 7–10 are new, from the page's idea, to reach 10: the comparison turned round, the two things end to end (৩ + ২), a স্কেল as long as the geometry box (২ পেনসিল), and the shortest of three (with a বেঞ্চ of ১০ পেনসিল).
- **p.110:** the glass (৩ সে.মি.) and the candle (৫ সে.মি.) are also items in p.109's ruler game; this page's game asks them as heights on its standing ruler and compares them. Exercise 1's table is empty in the book, so the table questions use Rafi's measures of mine (খাতা দৈর্ঘ্য ২৫, প্রস্থ ১৮ সে.মি.; জ্যামিতি বক্স ১৭ সে.মি.). Questions 8–10 are new, added to reach 10: two glasses one on the other (৩ + ৩), a tape for the ব্ল্যাকবোর্ড, and খাতা − জ্যামিতি বক্স.
- **p.111:** the children only guess the weights (“আমার মনে হয় ডাস্টারের ওজন বেশি হবে”, “কলমের ওজন বেশি হবে বলে মনে হয়”); the game takes ডাস্টার > কলম > বেলুন from those words. Its units questions compare ১ কেজি with gram amounts; p.112's game already asks the page's unit facts (কেজি, গ্রাম, দাঁড়িপাল্লা). Questions 8–10 are new, added to reach 10: the seller's balance level with a ১ কেজি weight (the page's picture), ৯০০ গ্রাম vs ১ কেজি, and the ডিজিটাল মাপনী showing the weight as a number.
- **p.114** shows three ways to compare two bottles but no result; each question gives one way with an outcome of mine (the second bottle overflows, doesn't fill or fills exactly; the water passes the mark or not; one glass is fuller) and asks which bottle holds more. Questions 8–10 were added to reach 10: Reza's third outcome (exactly full: the same) and two that match a method to its child, in the page's words.
- **p.115:** the pots in exercise 3 aren't named on the page; the file calls them চায়ের কেতলি, সসপ্যান and বালতি. The part-filled glass (exercise 1's big bottle, exercise 3's সসপ্যান) is read as “প্রায় আধা গ্লাস” (it is a little over half full at 300 dpi). Questions 8–10 are new, with the page's numbers, to reach 10: the pot in the middle, two kettles (৭ + ৭), and the সসপ্যান against the big bottle (৫ − ৪, the halves cancel).
- **p.125:** the picture's fruits (৬ কলা, ৭ আম, ৮ লিচু, ৫ আপেল, as p.126's table) are shown in one shuffled line of emoji, 🍒 standing in for লিচু (as on p.80); the child counts three kinds from it (the আম question was added to reach 10, with one on the page's five-group text: ৪টি খাড়া ও ১টি আড়াআড়ি দাগ). The other questions read and write ট্যালি চিহ্ন (৮, ১১, ১০).
- **p.127** only gives class work (ask the class, collect leaves) with no numbers. Its game takes exercise 3's three surveys with an example class of ২৬ of mine: (খ) কাক ৪, কোকিল ৯, কবুতর ৭, শালিক ৬; (ক) বাংলা ৮, ইংরেজি ৬, গণিত ১২; (গ) লাল ৮, নীল ৬, সবুজ ৫, হলুদ ৪, বেগুনি ৩ (the (ক) and (গ) questions were added to reach 10). Drop it if only the book's own numbers should be used.


## Rebuild

```sh
cd ~/Downloads/class2-math-activities
source ~/.nvm/nvm.sh && nvm use 16
node build.js      # writes ACTIVITIES-bn.json, the two update files (2 Nov tools, 3 Nov every-page) and this README; --only=pNNN-NNN checks one range of pages/
node validate.js   # the importer's own checks on both files, its answers against ours, and the 85 against ACTIVITIES-bn-before-tools.json
```

`build.js` holds every number as the page prints it (ASCII digits) and computes all answers; before writing it parses every pair, answer, order and group back from the Bangla text and checks it again, and it stops on any mistake. The codes come from a hash of each activity's key, so a rebuild keeps them (a new activity gets a new code; renaming a key changes its code). The tools are made after the first 85, so those keep their codes and QR letters; `ACTIVITIES-bn-before-tools.json` is the full file as it was before the tools, kept for that comparison.

## What I wasn't sure of

- **p.44** exercise 1 (4) prints “৭৮ + ০৮” in columns; the file writes it “৭৮ + ৮”.
- **p.59** exercise 1 (3) “৫২৩ + ৬১৪” makes ১১৩৭, beyond this book's ১০০০ (probably a misprint), so it is left out.
- **Ch.3 reading of ×:** the book (p.76) reads ৩ × ৪ as “৩ করে ৪ বার” (প্রত্যেক দলে বস্তুর সংখ্যা × দলের সংখ্যা), so the file matches ৩ + ৩ + ৩ + ৩ ↔ ৩ × ৪ (and ৪ + ৪ + ৪ would be ৪ × ৩, not ৩ × ৪). Pairs whose products are equal (৩ × ৪ and ৪ × ৩) are not put in one game.
- **p.96** prints “০টি ট্রে: ০ × ০” (probably meant ৩ × ০, since a tray holds ৩টি বল). The multiple-choice ০/১ questions use the page's rule text; the Work It Out item writes it ৩ × ০.
- **pp.34–35:** the animals and fruits are pictures without names; the file names them হাতি, ঘোড়া, বাঘ, খরগোশ, মোরগ (left → right) and আনারস, আপেল, আঙুর, কলা, তরমুজ (left → right).
- **p.104** asks the shapes of six foods without answers; the file uses পাউরুটি → চতুর্ভুজাকার, রসগোল্লা/মোয়া → গোলাকার, সমুচা → ত্রিভুজাকার, and leaves out বিস্কুট and ছানার সন্দেশ (they can be round or square). ইট → চতুর্ভুজাকার follows the matching on p.103.
- **p.103 sort:** there is no pyramid or samosa emoji; 🔺 and 🥟 stand in. The ত্রিভুজাকার group has two things (সমুচা, পিরামিড): the pages show no more.
- **p.106 patterns:** the first four questions use the book's ○□□□ and △□□□; the last two (△○, ○○△) are new patterns made with the same shapes.
- **Coins vs notes:** p.121 lists ১, ২, ৫ টাকা as coins, but p.123 shows ১, ২, ৫ টাকার নোট too, so a coin/note sort would be ambiguous. The money sort (p.122) groups ways to make ২০০ / ৫০০ / ১০০০ টাকা instead: all three ২০০ ways and the first ৫০০ and ১০০০ ways are the book's; the other ৫০০/১০০০ ways are new (the page invites “অনুরূপ ভিন্ন ভিন্নভাবে”).
- **p.123 / p.124:** the কলা row (৫০ + ১০) is the book's; the আপেল, তরমুজ and কাঁঠাল note counts are the file's own answers to the empty table.
- **p.116:** the pot in picture (3) isn't named on the page; the file calls it “মাটির পাত্র”.
- **p.118:** the digital clocks print Latin digits (11:35); the file writes them in Bangla digits (১১:৩৫).
- **p.119:** the days circle has no first day; the sequence starts at শনিবার (said in its title).
- **Work It Out:** p.33 1 (2) “২, ৩, ৫, ৮, ১২” is left out (its step isn't fixed, which the player needs). p.33 3 and 4 say the step in words (“৪৭ দিয়ে শুরু … ২ করে কমছে”), so their second number (৪৫, ২৮) is shown. p.32 (7) is written as first and last number with boxes between (৪৮, □, □, □, □, ৩৮). The p.40 and p.49 “কীভাবে” examples whose answers the page shows are left out; p.51's ৩৪ − ৭ and ৩০ − ৬ (empty boxes) are in.
- **Work It Out, pictures:** p.70's numbers are in its pictures (bars, jars, baskets), so each question carries them in words; p.72 12's price table is written out in the question. p.77's bananas use p.74's “প্রত্যেক ছড়ায় ৪টি করে কলা”. p.10–12 block and card counts (২৩৬, ১৪৭, ৫০৪, ৬৫৫, ৭৬৫) were counted from the pictures. p.19 (blocks to count) is not used: the small cubes are hard to count in the scan.
- **Not used (unclear in the pictures):** p.78 tomatoes and flowers per plate (exercise 2); p.109 eraser and pencil lengths (in the first file; the tools update reads them at 300 dpi); p.126 vehicles (no printed counts); p.104 cartoon shape counts.
- **Spellings** are the book's, read at 150–250 dpi: ঊনত্রিশ, ঊনচল্লিশ, ঊনপঞ্চাশ, ঊনষাট, ঊনসত্তর, ঊনআশি, ঊননব্বই (all with ঊ); বড়ো, ছোটো; জ্যৈষ্ঠ, আষাঢ়, অগ্রহায়ণ, ফাল্গুন. The book's title in the file is “প্রাথমিক গণিত - দ্বিতীয় শ্রেণী” as asked (the cover prints শ্রেণি).

### The tools update

- **Fresh problems:** each tool activity with fresh problems writes its skill out (`"fresh": { "skill": "clock", "count": 5 }`, not only the count): the importer saves a file's configuration as it is, and the player reads a fresh block without a skill as `add` (it would add sums to a clock game).
- **Find the Mistake:** the sums are the book's; the slip is worked out in code, the book's own column method with one carry (+) or one borrowed ten (−) not passed on to the next column, chosen among those that leave exactly one digit wrong and the answer as long as the right one; every third item instead has a fact slip in the ones column (৩ + ৮ = ১২: the ones digit one off), so the wrong digit isn't always the tens (a two-digit sum has only one carry). The book's sums where every such slip changes the answer's length can't be used: p.51–52 ৬০ − ৫৩, ৭৪ − ৬৮, ৪০ − ৩৪; p.57 ৮৬ + ৪৩, ৬৮ + ৩৫, ৭৪ + ৬৫, ৫৫ + ৪৫, ৯৩ + ৯ (two digits making three); p.62 ৫৬৮ + ৪৩২ (= ১০০০); p.67 ৩২০ − ২৮০. The other carrying and borrowing sums are left out only because eight a game is enough.
- **Make Equal Groups:** the book multiplies the plates (p.73 “৫টি থালায় ৪টি করে মাছ” = ৪ × ৫); the tool shares the whole lot back onto the plates, the same groups the other way round. Only pictures with 2–6 plates and at most ৩০ things fit (p.85's ৭টি থালা of পেয়ারা, p.87's ৮টি বিড়াল and the like don't). No lychee emoji: 🍒 stands in for p.80's লিচু; 🍏 for p.86's green apples; p.78 2 (2)–(3) is still not used (the counts per plate are unclear).
- **Number Line:** the targets are the book's pattern numbers (pp.30–32) and table products (pp.79–86); where each line starts and ends is mine. The player prints every number on a line of up to ১০ steps (every second one on ১১–২০), so every “place” item uses ১১–২০ steps with its number on a tick that isn't printed (build.js checks it); “read” items hide the number under the arrow. p.32 (7) (4) (৫০ থেকে ৪০, ৫ করে) is only two steps and is left out.
- **Clock & Time:** p.117's middle clock (exercise 1) reads ১টা at 250 dpi. p.118 3 shows its times (১১:১৫, ১১:৩৫, ০৮:২০, ০৬:২৫, ০৭:৪৫) on digital clocks only, and pp.117–118 teach the hour hand only (মিনিটের কাঁটা ১২ এর ঘরে); “ঘণ্টা ও মিনিট” puts these times on a dial (read and set), a step beyond the pages.
- **Taka Shop:** p.124's পেঁপে costs ১৮৮ টাকা (read at 300 dpi), exactly one each of ১০০, ৫০, ২০, ১০, ৫, ২ and ১ টাকা. There is no papaya or jackfruit emoji: 🍈 stands for পেঁপে, and কাঁঠাল has none (the player shows 🛍️). খাতা ৯০ টাকা is worked out from p.124 3 (১০৫ − ১৫). The count items are the book's ways (p.122, p.123 মিরাজ, p.124 কলা) and one ৫০ টাকা way of mine for p.123 1; p.123's rows (3)–(4) (১০টি ১ টাকা …) have more than ১২ coins, the most a count item shows. In “ফেরত টাকা” only মেহেরুল's (p.124 4: ১০০ + ৫০ টাকা for a ১২০ টাকার জ্যামিতি বক্স) is the book's; the others pay p.124's prices with the next bigger note.
- **Measure It:** p.109–110's lengths, read at 300 dpi: পেনসিল ৮, ১২ and ৯ সে.মি., রাবার ৫ (left out: no eraser emoji), গ্লাস ৩, মোমবাতি ৫; 🖍️ ৭, 🥕 ১৪ and 🍌 ১৮ are mine. The balance's six weight sets are the book's (p.112–113); the things on the pan (🍫 🥚 🍅 🍌 🍆 🍍) and the ১৭০, ২৫০ and ১০০০ গ্রাম sets are mine. The jug works in millilitres, which the book doesn't use (it measures liquids in litres and glasses, pp.114–116): ১ লিটার = ১০০০ মিলি and আধা লিটার = ৫০০ মিলি are said in that activity's guide note. No fresh problems here: a fresh “measure” problem can be any of the three tools.
- **Shape Patterns:** the book's patterns (p.106) are outlines; the file colours them as p.102 does (গোল orange, তিনকোনা green, চারকোনা blue). The second activity's six patterns are new.
- **Make a Shape:** pp.102–104 don't join pieces into shapes; the activity asks the tool's four (two triangles → a square, two squares → a rectangle, two half circles → a circle, four squares → a big square), next to p.104 2's picture made of triangles and four-sided shapes. It has no fresh problems (there are only these four).
