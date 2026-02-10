const test = require("node:test");
const assert = require("node:assert/strict");

const {
  analyzeCoverage,
  createBackupEnvelope,
  splitIntoSentences,
  validateAndMigrateBackup,
} = require("../core-utils.js");

test("coverage report returns N/K/M with occurrences and sentence indexes", () => {
  const words = ["apple", "work", "robot"];
  const sentences = [
    "Apple trees were near the station.",
    "I work every day, and work at night.",
    "No machine appeared here.",
  ];
  const report = analyzeCoverage({ words, sentences, mode: "exact" });

  assert.equal(report.totalWords, 3);
  assert.equal(report.coveredWords, 2);
  assert.equal(report.missingWordsCount, 1);
  assert.deepEqual(report.missingWords, ["robot"]);

  const apple = report.items.find((item) => item.word === "apple");
  const work = report.items.find((item) => item.word === "work");
  const robot = report.items.find((item) => item.word === "robot");

  assert.equal(apple.count, 1);
  assert.deepEqual(apple.sentenceIndexes, [0]);
  assert.equal(work.count, 2);
  assert.deepEqual(work.sentenceIndexes, [1]);
  assert.equal(robot.count, 0);
  assert.deepEqual(robot.sentenceIndexes, []);
});

test("EXACT mode is strict on boundaries and inflections", () => {
  const report = analyzeCoverage({
    words: ["work"],
    sentences: ["Work hard.", "He worked.", "This is homework."],
    mode: "exact",
  });

  assert.equal(report.totalWords, 1);
  assert.equal(report.coveredWords, 1);
  assert.equal(report.items[0].count, 1);
});

test("FLEX mode matches plural and verb variants but not homework", () => {
  const report = analyzeCoverage({
    words: ["work", "apple"],
    sentences: ["He worked yesterday and is working today.", "Two apples are here.", "homework remains."],
    mode: "flex",
  });

  const work = report.items.find((item) => item.word === "work");
  const apple = report.items.find((item) => item.word === "apple");

  assert.equal(work.count, 2);
  assert.equal(apple.count, 1);
  assert.equal(report.missingWordsCount, 0);
});

test("sentence tokenizer remains deterministic", () => {
  const sentences = splitIntoSentences(`Hello world.  "How are you?"  I am fine!`);
  assert.deepEqual(sentences, ["Hello world.", "\"How are you?\"", "I am fine!"]);
});

test("backup export envelope has version, createdAt and payload", () => {
  const envelope = createBackupEnvelope({ shelf: [] }, { version: "1.1.0" });
  assert.equal(envelope.version, "1.1.0");
  assert.equal(typeof envelope.createdAt, "string");
  assert.deepEqual(envelope.payload, { shelf: [] });
});

test("backup import migrates legacy v1 format to current minor", () => {
  const legacy = {
    version: 1,
    exportedAt: "2026-02-01T10:00:00.000Z",
    shelf: [{ id: "s1" }],
    flashcards: [],
    progress: {},
    goals: {},
  };
  const migrated = validateAndMigrateBackup(legacy, {
    currentVersion: "1.1.0",
  });
  assert.equal(migrated.version, "1.1.0");
  assert.equal(migrated.payload.shelf.length, 1);
  assert.ok(Array.isArray(migrated.payload.errorBank));
});

test("backup import rejects incompatible major version", () => {
  const futureMajor = {
    version: "2.0.0",
    createdAt: "2026-02-01T10:00:00.000Z",
    payload: {},
  };
  assert.throws(
    () => validateAndMigrateBackup(futureMajor, { currentVersion: "1.1.0" }),
    /major version không tương thích/i
  );
});
