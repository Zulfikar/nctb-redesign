// Read-only: are the file's codes free on the live database (activities' and books' public codes)? And the book
// /b/KZT9KF: its activities and chapters now. Writes are blocked; nothing is printed from .env.
"use strict";
const path = require("path");
const BE = path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend");
const SRC = path.join(BE, "src");
const bereq = (m) => require(path.join(BE, "node_modules", m));
const mongodb = bereq("mongodb");
for (const w of ["insertOne", "insertMany", "updateOne", "updateMany", "replaceOne", "deleteOne", "deleteMany", "findOneAndUpdate", "findOneAndReplace", "findOneAndDelete", "bulkWrite", "createIndex", "createIndexes", "drop"]) mongodb.Collection.prototype[w] = function () { throw new Error("READ ONLY"); };
(async () => {
  bereq("dotenv").config({ path: path.join(SRC, ".env") });
  const constants = require(path.join(SRC, "utils/constants"));
  const mongoose = bereq("mongoose");
  mongoose.set("autoIndex", false); mongoose.set("autoCreate", false); mongoose.set("strictQuery", false);
  await mongoose.connect(constants.MONGODB_URI, { autoIndex: false, autoCreate: false });
  const db = mongoose.connection.db;
  const file = require(path.join(__dirname, "..", "ACTIVITIES-bn.json"));
  const codes = file.activities.map((a) => a.code);
  const acts = await db.collection("activities").find({ publicCode: { $in: codes } }, { projection: { publicCode: 1, title: 1, bookId: 1 } }).toArray();
  let books = [];
  for (const c of ["activitybooks", "activity_books"]) { try { books = books.concat(await db.collection(c).find({ publicCode: { $in: codes } }, { projection: { publicCode: 1, title: 1 } }).toArray()); } catch (e) { /* no such collection */ } }
  console.log(`${codes.length} codes: ${acts.length} taken by activities, ${books.length} by books`);
  for (const a of [...acts, ...books]) console.log(`  taken: ${a.publicCode} ${String(a.title || "").slice(0, 60)}`);
  let book = null;
  for (const c of ["activitybooks", "activity_books"]) { try { book = book || (await db.collection(c).findOne({ publicCode: "KZT9KF" })); } catch (e) { /* */ } }
  if (book) {
    const n = await db.collection("activities").countDocuments({ bookId: book._id });
    console.log(`book KZT9KF: "${book.title}", ${n} activities, chapters ${JSON.stringify(book.chapters || [])}`);
  } else console.log("book KZT9KF: not found");
  await mongoose.disconnect();
  process.exit(0);
})().catch((e) => { console.error(String(e.message || e).replace(/mongodb(\+srv)?:\/\/\S+/g, "<uri>")); process.exit(1); });
