(function (globalScope, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  globalScope.StoryCore = api;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const TOKEN_BOUNDARY_CLASS = "A-Za-z0-9'";
  const DEFAULT_BACKUP_VERSION = "1.1.0";

  function normalizeApostrophes(value) {
    return String(value || "").replace(/[’`]/g, "'");
  }

  function normalizeWord(value) {
    return normalizeApostrophes(value).toLowerCase().replace(/\s+/g, " ").trim();
  }

  function escapeRegExp(value) {
    return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function splitIntoSentences(text) {
    const compact = String(text || "").replace(/\s+/g, " ").trim();
    if (!compact) {
      return [];
    }

    const matches = compact.match(/[^.!?]+(?:[.!?]+["')\]]*|$)/g);
    if (!matches || matches.length === 0) {
      return [compact];
    }
    return matches.map((sentence) => sentence.trim()).filter(Boolean);
  }

  function dedupeWords(words) {
    const list = Array.isArray(words) ? words : [];
    const out = [];
    const seen = new Set();
    list.forEach((item) => {
      const normalized = normalizeWord(item);
      if (!normalized || seen.has(normalized)) {
        return;
      }
      seen.add(normalized);
      out.push(String(item || "").trim());
    });
    return out;
  }

  function normalizeCoverageMode(mode) {
    return String(mode || "").toLowerCase() === "flex" ? "flex" : "exact";
  }

  function isLikelyConsonant(char) {
    return /^[b-df-hj-np-tv-z]$/i.test(char || "");
  }

  function buildFlexVariants(word) {
    const base = normalizeWord(word);
    if (!base) {
      return [];
    }

    const variants = new Set([base]);
    variants.add(base + "'s");
    variants.add(base + "s'");

    if (/(s|x|z|ch|sh)$/i.test(base)) {
      variants.add(base + "es");
    } else if (/[^\W\d_]y$/i.test(base) && base.length > 1 && isLikelyConsonant(base[base.length - 2])) {
      variants.add(base.slice(0, -1) + "ies");
    } else {
      variants.add(base + "s");
    }

    if (base.endsWith("ie")) {
      variants.add(base.slice(0, -2) + "ying");
    } else if (base.endsWith("e")) {
      variants.add(base + "d");
      variants.add(base.slice(0, -1) + "ing");
    } else {
      variants.add(base + "ed");
      variants.add(base + "ing");
      if (
        /^[a-z]{3,}$/i.test(base) &&
        isLikelyConsonant(base[base.length - 1]) &&
        !/[wxy]/i.test(base[base.length - 1]) &&
        /[aeiou]/i.test(base[base.length - 2]) &&
        isLikelyConsonant(base[base.length - 3])
      ) {
        variants.add(base + base[base.length - 1] + "ed");
        variants.add(base + base[base.length - 1] + "ing");
      }
      if (/[^\W\d_]y$/i.test(base) && base.length > 1 && isLikelyConsonant(base[base.length - 2])) {
        variants.add(base.slice(0, -1) + "ied");
      }
    }

    return [...variants];
  }

  function buildMatchRegex(variants) {
    const terms = (Array.isArray(variants) ? variants : [])
      .map((item) => normalizeWord(item))
      .filter(Boolean)
      .sort((a, b) => b.length - a.length);
    if (terms.length === 0) {
      return null;
    }
    const alternation = terms.map((term) => escapeRegExp(term)).join("|");
    const prefix = `(^|[^${TOKEN_BOUNDARY_CLASS}])`;
    const suffix = `(?=$|[^${TOKEN_BOUNDARY_CLASS}])`;
    return new RegExp(`${prefix}(${alternation})${suffix}`, "gi");
  }

  function countMatchesInSentence(sentence, matcher) {
    if (!matcher) {
      return 0;
    }
    const text = normalizeApostrophes(sentence);
    matcher.lastIndex = 0;
    let count = 0;
    let match;
    while ((match = matcher.exec(text)) !== null) {
      count += 1;
      if (matcher.lastIndex === match.index) {
        matcher.lastIndex += 1;
      }
    }
    return count;
  }

  function analyzeCoverage(input) {
    const words = dedupeWords(input && input.words);
    const sentences = Array.isArray(input && input.sentences) ? input.sentences : [];
    const mode = normalizeCoverageMode(input && input.mode);

    const items = words.map((word) => {
      const normalizedWord = normalizeWord(word);
      const variants = mode === "flex" ? buildFlexVariants(normalizedWord) : [normalizedWord];
      const matcher = buildMatchRegex(variants);
      let count = 0;
      const sentenceIndexes = [];

      sentences.forEach((sentence, sentenceIndex) => {
        const sentenceCount = countMatchesInSentence(sentence, matcher);
        if (sentenceCount > 0) {
          count += sentenceCount;
          sentenceIndexes.push(sentenceIndex);
        }
      });

      return {
        word,
        normalizedWord,
        covered: count > 0,
        count,
        sentenceIndexes,
      };
    });

    const coveredWords = items.filter((item) => item.covered).length;
    const missingWords = items.filter((item) => !item.covered).map((item) => item.word);

    return {
      mode,
      totalWords: words.length,
      coveredWords,
      missingWordsCount: missingWords.length,
      missingWords,
      items,
    };
  }

  function parseVersion(value) {
    const text = String(value || "").trim();
    const match = text.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!match) {
      return null;
    }
    return {
      major: Number.parseInt(match[1], 10),
      minor: Number.parseInt(match[2], 10),
      patch: Number.parseInt(match[3], 10),
    };
  }

  function createBackupEnvelope(payload, options) {
    const version = String(options && options.version ? options.version : DEFAULT_BACKUP_VERSION);
    const createdAt = String(
      options && options.createdAt ? options.createdAt : new Date().toISOString()
    );
    return {
      version,
      createdAt,
      payload: payload && typeof payload === "object" ? payload : {},
    };
  }

  function isLegacyV1Envelope(data) {
    return (
      data &&
      typeof data === "object" &&
      Number.isInteger(data.version) &&
      typeof data.exportedAt === "string"
    );
  }

  function normalizeLegacyPayload(data) {
    return {
      shelf: Array.isArray(data.shelf) ? data.shelf : [],
      flashcards: Array.isArray(data.flashcards) ? data.flashcards : [],
      translateCache:
        data.translateCache && typeof data.translateCache === "object" ? data.translateCache : {},
      progress: data.progress && typeof data.progress === "object" ? data.progress : {},
      goals: data.goals && typeof data.goals === "object" ? data.goals : {},
      errorBank: [],
      wordMastery: {},
      backupMeta: {},
    };
  }

  function migratePayload(payload, fromVersion, toVersion) {
    const from = parseVersion(fromVersion);
    const to = parseVersion(toVersion);
    if (!from || !to) {
      throw new Error("Không đọc được phiên bản backup để migrate.");
    }
    if (from.major !== to.major) {
      throw new Error("Không thể migrate khác major version.");
    }

    const next = payload && typeof payload === "object" ? { ...payload } : {};
    if (from.minor < 1) {
      if (!Array.isArray(next.errorBank)) {
        next.errorBank = [];
      }
      if (!next.wordMastery || typeof next.wordMastery !== "object") {
        next.wordMastery = {};
      }
      if (!next.backupMeta || typeof next.backupMeta !== "object") {
        next.backupMeta = {};
      }
    }
    return next;
  }

  function validateAndMigrateBackup(data, options) {
    const currentVersion = String(
      options && options.currentVersion ? options.currentVersion : DEFAULT_BACKUP_VERSION
    );
    const currentParsed = parseVersion(currentVersion);
    if (!currentParsed) {
      throw new Error("Phiên bản backup hiện tại không hợp lệ.");
    }

    let envelope = null;
    let migratedFrom = "";
    if (isLegacyV1Envelope(data)) {
      const legacyVersion = `${data.version}.0.0`;
      envelope = createBackupEnvelope(normalizeLegacyPayload(data), {
        version: legacyVersion,
        createdAt: data.exportedAt,
      });
      migratedFrom = legacyVersion;
    } else if (
      data &&
      typeof data === "object" &&
      typeof data.version === "string" &&
      typeof data.createdAt === "string" &&
      data.payload &&
      typeof data.payload === "object"
    ) {
      envelope = {
        version: data.version,
        createdAt: data.createdAt,
        payload: data.payload,
      };
    } else {
      throw new Error("Backup không đúng định dạng {version, createdAt, payload}.");
    }

    const incomingParsed = parseVersion(envelope.version);
    if (!incomingParsed) {
      throw new Error("Backup có version không hợp lệ.");
    }

    if (incomingParsed.major !== currentParsed.major) {
      throw new Error(
        `Backup major version không tương thích (nhận ${incomingParsed.major}, cần ${currentParsed.major}).`
      );
    }

    if (incomingParsed.minor > currentParsed.minor) {
      throw new Error(
        `Backup thuộc minor version mới hơn (${envelope.version}), ứng dụng hiện tại chưa hỗ trợ.`
      );
    }

    if (incomingParsed.minor < currentParsed.minor) {
      const migratedPayload = migratePayload(
        envelope.payload,
        envelope.version,
        currentVersion
      );
      return {
        version: currentVersion,
        createdAt: envelope.createdAt,
        payload: migratedPayload,
        migratedFrom: envelope.version,
      };
    }

    return {
      version: envelope.version,
      createdAt: envelope.createdAt,
      payload: envelope.payload,
      migratedFrom,
    };
  }

  return {
    DEFAULT_BACKUP_VERSION,
    splitIntoSentences,
    dedupeWords,
    normalizeCoverageMode,
    buildFlexVariants,
    analyzeCoverage,
    createBackupEnvelope,
    validateAndMigrateBackup,
    parseVersion,
  };
});
