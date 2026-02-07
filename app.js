(function () {
  const vocabInput = document.getElementById("vocabInput");
  const storyLength = document.getElementById("storyLength");
  const genrePicker = document.getElementById("genrePicker");
  const toneInputs = Array.from(document.querySelectorAll('input[name="storyTone"]'));
  const generateBtn = document.getElementById("generateBtn");
  const clearBtn = document.getElementById("clearBtn");
  const readStoryBtn = document.getElementById("readStoryBtn");
  const pauseReadBtn = document.getElementById("pauseReadBtn");
  const resumeReadBtn = document.getElementById("resumeReadBtn");
  const stopReadBtn = document.getElementById("stopReadBtn");
  const readSpeed = document.getElementById("readSpeed");
  const readVoice = document.getElementById("readVoice");
  const readFromSelectedBtn = document.getElementById("readFromSelectedBtn");
  const resumeLastBtn = document.getElementById("resumeLastBtn");
  const setRepeatStartBtn = document.getElementById("setRepeatStartBtn");
  const setRepeatEndBtn = document.getElementById("setRepeatEndBtn");
  const toggleRepeatBtn = document.getElementById("toggleRepeatBtn");
  const clearRepeatBtn = document.getElementById("clearRepeatBtn");
  const repeatStatus = document.getElementById("repeatStatus");
  const prevSentenceBtn = document.getElementById("prevSentenceBtn");
  const nextSentenceBtn = document.getElementById("nextSentenceBtn");
  const repeatLoopCount = document.getElementById("repeatLoopCount");
  const repeatLoopStatus = document.getElementById("repeatLoopStatus");
  const readProgress = document.getElementById("readProgress");
  const readProgressText = document.getElementById("readProgressText");
  const copyBtn = document.getElementById("copyBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const saveStoryBtn = document.getElementById("saveStoryBtn");
  const storyTitle = document.getElementById("storyTitle");
  const clearShelfBtn = document.getElementById("clearShelfBtn");
  const storyOutput = document.getElementById("storyOutput");
  const coverageSummary = document.getElementById("coverageSummary");
  const coverageList = document.getElementById("coverageList");
  const coverageItemTemplate = document.getElementById("coverageItemTemplate");
  const buildPracticeBtn = document.getElementById("buildPracticeBtn");
  const checkPracticeBtn = document.getElementById("checkPracticeBtn");
  const resetPracticeBtn = document.getElementById("resetPracticeBtn");
  const practiceType = document.getElementById("practiceType");
  const practiceCount = document.getElementById("practiceCount");
  const practiceSummary = document.getElementById("practiceSummary");
  const practiceList = document.getElementById("practiceList");
  const startMemoryBtn = document.getElementById("startMemoryBtn");
  const revealMemoryBtn = document.getElementById("revealMemoryBtn");
  const memoryKnownBtn = document.getElementById("memoryKnownBtn");
  const memoryAgainBtn = document.getElementById("memoryAgainBtn");
  const memorySummary = document.getElementById("memorySummary");
  const memoryCard = document.getElementById("memoryCard");
  const memoryHint = document.getElementById("memoryHint");
  const buildDictationBtn = document.getElementById("buildDictationBtn");
  const playDictationBtn = document.getElementById("playDictationBtn");
  const checkDictationBtn = document.getElementById("checkDictationBtn");
  const showDictationAnswerBtn = document.getElementById("showDictationAnswerBtn");
  const prevDictationBtn = document.getElementById("prevDictationBtn");
  const nextDictationBtn = document.getElementById("nextDictationBtn");
  const dictationSummary = document.getElementById("dictationSummary");
  const dictationPrompt = document.getElementById("dictationPrompt");
  const dictationInput = document.getElementById("dictationInput");
  const dictationResult = document.getElementById("dictationResult");
  const analyzeHoveredSentenceBtn = document.getElementById("analyzeHoveredSentenceBtn");
  const clearSentenceModelBtn = document.getElementById("clearSentenceModelBtn");
  const sentenceModelHint = document.getElementById("sentenceModelHint");
  const sentenceModelOutput = document.getElementById("sentenceModelOutput");
  const seedFlashcardsBtn = document.getElementById("seedFlashcardsBtn");
  const startFlashcardBtn = document.getElementById("startFlashcardBtn");
  const revealFlashcardBtn = document.getElementById("revealFlashcardBtn");
  const rateHardBtn = document.getElementById("rateHardBtn");
  const rateGoodBtn = document.getElementById("rateGoodBtn");
  const rateEasyBtn = document.getElementById("rateEasyBtn");
  const flashcardSummary = document.getElementById("flashcardSummary");
  const flashcardCard = document.getElementById("flashcardCard");
  const flashcardMeaning = document.getElementById("flashcardMeaning");
  const shelfList = document.getElementById("shelfList");
  const shelfHint = document.getElementById("shelfHint");
  const shelfItemTemplate = document.getElementById("shelfItemTemplate");
  const translateBubble = document.getElementById("translateBubble");
  const translateSource = document.getElementById("translateSource");
  const translateResult = document.getElementById("translateResult");

  const SHELF_STORAGE_KEY = "story-builder-shelf-v2";
  const TRANSLATE_CACHE_KEY = "story-builder-translate-cache-v1";
  const READ_SESSION_STORAGE_KEY = "story-builder-read-session-v1";
  const FLASHCARD_STORAGE_KEY = "story-builder-flashcards-v1";

  const lengthToTargetSentences = {
    short: 10,
    medium: 14,
    long: 19,
  };

  const toneConfig = {
    adventure: {
      label: "Phiêu lưu",
      settingOptions: [
        "a foggy coastal trail behind a forgotten lighthouse",
        "a mountain pass where old rail tracks disappear into pine trees",
        "a narrow canyon path above a fast and cold river",
      ],
      goalOptions: [
        "recover a field journal before the tide rises",
        "follow a chain of clues left by a missing explorer",
        "reach a hidden shelter before the storm arrives",
      ],
      openings: [
        "{hero} met {friend} at {setting}, both carrying the same objective: {goal}.",
        "At sunrise, {hero} and {friend} started from {setting} and promised each other they would {goal}.",
        "The map looked unfinished, but {hero} still convinced {friend} to cross {setting} and {goal}.",
      ],
      pressure: [
        "Wind pushed hard against them, so every decision had to be practical.",
        "They moved slower than planned, but rushing would have cost them the only advantage they had.",
        "A wrong turn was now expensive, and both of them could feel the clock getting louder.",
      ],
      turningPoints: [
        "Halfway through, {hero} noticed that every clue pointed to one consistent pattern.",
        "Then a local guide stepped in, checked their notes, and quietly confirmed they were close.",
        "At the hardest section of the path, {friend} finally connected the oldest clue with the newest one.",
      ],
      details: [
        "They wrote each clue inside {object}, then compared lines until the sequence made sense.",
        "Even in silence, they kept updating each other with short and clear observations.",
        "A weathered sign near {setting} reminded them that most people turned back too early.",
      ],
      closings: [
        "By late afternoon, they reached the right place and completed the mission together.",
        "When the sky cleared, their final notes matched perfectly and the route finally closed.",
        "They returned home exhausted, but with a complete story and no unanswered clue.",
      ],
    },
    mystery: {
      label: "Bí ẩn",
      settingOptions: [
        "an old city library that only opens at night",
        "a quiet museum archive with locked document rooms",
        "a narrow apartment block where one floor is always dark",
      ],
      goalOptions: [
        "decode a message hidden across several missing files",
        "identify who moved a key document without permission",
        "reconstruct a timeline before evidence disappears",
      ],
      openings: [
        "{hero} arrived first at {setting}, then called {friend} because the case had become urgent.",
        "As soon as they entered {setting}, {friend} said they had one night to {goal}.",
        "No one else stayed in {setting}, so {hero} and {friend} had to {goal} on their own.",
      ],
      pressure: [
        "Every clue looked harmless alone, but together they formed a troubling picture.",
        "The lights flickered once, and both of them agreed not to waste another minute.",
        "They avoided dramatic guesses and focused only on evidence they could verify.",
      ],
      turningPoints: [
        "Near midnight, the final pattern became visible and changed their strategy immediately.",
        "A short call from {helper} confirmed one missing detail and reopened the whole case.",
        "At the midpoint, {hero} realized the first clue had been interpreted the wrong way.",
      ],
      details: [
        "They split the work: {hero} checked records while {friend} traced timestamps.",
        "A forgotten folder in {setting} held the only clean copy of the original notes.",
        "Step by step, the timeline became less confusing and more defensible.",
      ],
      closings: [
        "By dawn, the final explanation fit every clue without forcing any detail.",
        "They locked the case file, documented each step, and left quietly before sunrise.",
        "The mystery ended with a clear answer, not a lucky guess.",
      ],
    },
    school: {
      label: "Học đường",
      settingOptions: [
        "their school one week before a language showcase",
        "a classroom turned into a temporary project lab",
        "the school hall where teams practiced after classes",
      ],
      goalOptions: [
        "build a presentation that was both creative and accurate",
        "finish a group project before the final deadline",
        "prepare a performance that could represent the whole class",
      ],
      openings: [
        "{hero} and {friend} stayed at {setting} after class because they had to {goal}.",
        "The project board at {setting} was full of edits when {hero} told {friend} they must {goal}.",
        "With only a few days left, {hero} and {friend} used {setting} as their base to {goal}.",
      ],
      pressure: [
        "They had different ideas, so every revision required patient discussion.",
        "A teacher checked in, gave strict feedback, and asked for a stronger draft.",
        "Time was short, but both of them refused to submit something average.",
      ],
      turningPoints: [
        "After one honest argument, they rebuilt the structure and the project started to flow.",
        "A classmate tested the draft and showed them exactly where the weak parts were.",
        "In the middle of rehearsal, {hero} found a simpler way to connect all sections.",
      ],
      details: [
        "They practiced line by line, recording each run to remove awkward pauses.",
        "At {setting}, they rewrote the script until every paragraph sounded natural.",
        "Instead of adding more content, they cut noise and kept only the strongest points.",
      ],
      closings: [
        "On presentation day, their teamwork was visible from the first minute.",
        "The final version felt confident, clear, and genuinely human.",
        "They finished the event proud, with feedback that proved the effort was worth it.",
      ],
    },
    scifi: {
      label: "Khoa học viễn tưởng",
      settingOptions: [
        "an orbital station circling a red planet",
        "a research deck below a glacier on Europa",
        "a long-range vessel traveling beyond the asteroid belt",
      ],
      goalOptions: [
        "restore communication before the next blackout",
        "stabilize a failing system without outside help",
        "repair navigation before the station drifts off course",
      ],
      openings: [
        "On shift rotation, {hero} and {friend} discovered a fault in {setting} and had to {goal}.",
        "Alarms echoed through {setting} while {hero} and {friend} prepared to {goal}.",
        "With the countdown already active, both of them used {setting} as command point to {goal}.",
      ],
      pressure: [
        "They worked with strict checklists because improvisation could trigger a full shutdown.",
        "Each reboot window lasted only seconds, so mistakes were not recoverable.",
        "A delay in one module would ripple through the whole station within minutes.",
      ],
      turningPoints: [
        "A hidden log exposed the real failure source and forced a complete plan change.",
        "At critical threshold, {friend} proposed a risky patch that surprisingly worked.",
        "During the final cycle, {hero} noticed one unstable line in the diagnostics and fixed it.",
      ],
      details: [
        "They synchronized over short radio calls and updated the board every thirty seconds.",
        "Inside {setting}, the emergency lights made every panel look sharper and colder.",
        "They used {object} as a temporary reference and validated each action twice.",
      ],
      closings: [
        "When the systems stabilized, mission control confirmed full recovery.",
        "The station returned to normal operation, and both of them finally exhaled.",
        "Their report became a model for future crews facing the same failure.",
      ],
    },
    fantasy: {
      label: "Giả tưởng",
      settingOptions: [
        "a floating city above crystal forests",
        "an ancient library hidden under a moonlit castle",
        "a border village guarded by old runes",
      ],
      goalOptions: [
        "recover a relic before the eclipse begins",
        "decode a spellbook without triggering its curse",
        "escort a messenger safely through enchanted lands",
      ],
      openings: [
        "{hero} met {friend} at {setting}, and they agreed to {goal}.",
        "At dawn in {setting}, {hero} asked {friend} to help {goal}.",
        "{hero} and {friend} entered {setting} with one clear objective: {goal}.",
      ],
      pressure: [
        "Every symbol they touched could change the rules around them.",
        "The path shifted constantly, so they had to trust each clue.",
        "One wrong word from the spellbook could lock every exit.",
      ],
      turningPoints: [
        "A hidden inscription revealed the real cost of the mission.",
        "{friend} recognized an old rune and rewrote their whole plan.",
        "At the bridge gate, {hero} finally understood the final clue.",
      ],
      details: [
        "They compared fragments inside {object} and mapped each symbol carefully.",
        "A silent guardian in {setting} watched them, then pointed to the safest route.",
        "They moved slowly, because speed was less useful than precision.",
      ],
      closings: [
        "By nightfall, the relic was secured and the route back was clear.",
        "The curse broke, and {hero} and {friend} returned with a complete record.",
        "Their mission ended safely, and the village bells rang until sunrise.",
      ],
    },
    romance: {
      label: "Lãng mạn",
      settingOptions: [
        "a riverside cafe during the first rain of summer",
        "a train station where old letters were exchanged",
        "a small art studio above a crowded street",
      ],
      goalOptions: [
        "speak honestly before a long trip begins",
        "repair a misunderstanding from last winter",
        "finish a shared promise they both postponed",
      ],
      openings: [
        "{hero} saw {friend} at {setting} and knew they had to {goal}.",
        "At {setting}, {hero} asked {friend} for one quiet conversation to {goal}.",
        "{hero} and {friend} met again in {setting}, both ready to {goal}.",
      ],
      pressure: [
        "They chose careful words, because both of them feared another misunderstanding.",
        "The clock kept moving, and the train schedule left little room for silence.",
        "They listened first, then replied with short and direct sentences.",
      ],
      turningPoints: [
        "{friend} revealed one old letter that changed the whole conversation.",
        "{hero} admitted one mistake, and the tension softened immediately.",
        "A sudden phone call forced them to decide what mattered most.",
      ],
      details: [
        "They wrote key thoughts into {object} so nothing important was lost.",
        "Outside {setting}, the rain became heavier but their voices stayed calm.",
        "Instead of blaming each other, they focused on what could be rebuilt.",
      ],
      closings: [
        "Before leaving, they made a clear promise and kept it simple.",
        "The conversation ended with relief, respect, and a realistic plan.",
        "They walked away lighter, with fewer doubts and better direction.",
      ],
    },
    comedy: {
      label: "Hài hước",
      settingOptions: [
        "a chaotic office pantry before Monday briefing",
        "a school corridor during a fire-drill rehearsal",
        "a neighborhood market with too many announcements",
      ],
      goalOptions: [
        "fix a small mistake before everyone notices",
        "deliver the right package to the right person",
        "finish one simple task without creating new trouble",
      ],
      openings: [
        "{hero} and {friend} started at {setting}, expecting an easy day to {goal}.",
        "At {setting}, {hero} promised {friend} they would quietly {goal}.",
        "Everything looked normal in {setting} until {hero} tried to {goal}.",
      ],
      pressure: [
        "Each quick fix created one extra and very unnecessary problem.",
        "People kept giving advice, but none of it matched the real issue.",
        "The plan changed every five minutes and somehow became worse.",
      ],
      turningPoints: [
        "A child pointed at the obvious answer that adults had ignored.",
        "{friend} slipped on a detail, then accidentally solved the main problem.",
        "{hero} opened the wrong door and found the missing item immediately.",
      ],
      details: [
        "They logged each mistake in {object} and laughed before trying again.",
        "A loudspeaker in {setting} made every misunderstanding even more dramatic.",
        "They agreed that calm thinking worked better than panic.",
      ],
      closings: [
        "By the end, they solved the task and collected several funny lessons.",
        "Everyone laughed, and the final result was surprisingly correct.",
        "The day ended messy but successful, with new stories for later.",
      ],
    },
    historical: {
      label: "Lịch sử",
      settingOptions: [
        "a coastal town in the late 19th century",
        "an archive room during post-war reconstruction",
        "a trading post on an old river route",
      ],
      goalOptions: [
        "preserve records before they are damaged",
        "verify a witness account from a major event",
        "deliver important documents to the capital",
      ],
      openings: [
        "{hero} and {friend} began in {setting} with one mission: {goal}.",
        "In {setting}, {hero} invited {friend} to help {goal}.",
        "The town council in {setting} asked {hero} and {friend} to {goal}.",
      ],
      pressure: [
        "Weather and distance made every delay more expensive.",
        "Official stamps were required, but the nearest office was far away.",
        "Rumors spread quickly, so only verified facts were useful.",
      ],
      turningPoints: [
        "An elderly witness corrected one date and saved the timeline.",
        "{friend} found a sealed logbook that resolved several contradictions.",
        "A missing signature changed the legal meaning of the entire file.",
      ],
      details: [
        "They stored copies inside {object} and protected them from moisture.",
        "At {setting}, they compared names carefully to avoid false matches.",
        "They prioritized clarity because later readers would depend on these notes.",
      ],
      closings: [
        "The records reached the capital intact and were accepted officially.",
        "Their report closed the case and supported future research.",
        "The mission ended with a reliable archive and clear public notice.",
      ],
    },
    business: {
      label: "Công sở",
      settingOptions: [
        "a product team war-room before quarterly review",
        "a client office during contract negotiation",
        "a startup workspace preparing a demo day",
      ],
      goalOptions: [
        "deliver a reliable proposal under tight deadline",
        "resolve a risk that could delay launch",
        "align sales and engineering on one execution plan",
      ],
      openings: [
        "{hero} and {friend} met in {setting} and had to {goal}.",
        "At {setting}, leadership asked {hero} and {friend} to {goal}.",
        "{hero} opened the meeting in {setting} with one objective: {goal}.",
      ],
      pressure: [
        "Stakeholders needed evidence, not assumptions.",
        "Each update changed resource allocation across teams.",
        "A small delay in one module could affect the entire release.",
      ],
      turningPoints: [
        "A data check from {helper} exposed the real bottleneck.",
        "{friend} proposed a trimmed scope that the team could actually deliver.",
        "{hero} reframed the timeline and gained immediate alignment.",
      ],
      details: [
        "They tracked decisions in {object} and updated owners after each call.",
        "Inside {setting}, they converted feedback into concrete action items.",
        "They simplified the deck to focus only on outcomes and risks.",
      ],
      closings: [
        "The proposal was approved, with clear milestones and ownership.",
        "The launch stayed on track after one decisive revision.",
        "They closed the review with confidence and a realistic plan.",
      ],
    },
    survival: {
      label: "Sinh tồn",
      settingOptions: [
        "a storm-broken island with limited supplies",
        "a frozen valley far from communication towers",
        "a desert route after vehicle failure",
      ],
      goalOptions: [
        "reach a safe shelter before nightfall",
        "restore a signal for rescue coordination",
        "ration resources until help arrives",
      ],
      openings: [
        "{hero} and {friend} were stranded in {setting} and had to {goal}.",
        "After the accident at {setting}, {hero} told {friend} they must {goal}.",
        "In {setting}, their only priority was to {goal}.",
      ],
      pressure: [
        "Energy and water dropped faster than expected.",
        "Weather shifted quickly, making each route uncertain.",
        "They could not waste one tool or one hour.",
      ],
      turningPoints: [
        "{hero} found a stable path marked by old rescue signs.",
        "{friend} repaired a broken transmitter with spare parts.",
        "A short weather window gave them one chance to move.",
      ],
      details: [
        "They logged supplies in {object} and checked usage every hour.",
        "At {setting}, they built a simple protocol to avoid mistakes.",
        "They chose steady actions over risky shortcuts.",
      ],
      closings: [
        "By dawn, they reached shelter and transmitted their location.",
        "Rescue teams received a clear signal and responded quickly.",
        "They survived the worst stage by planning carefully together.",
      ],
    },
  };

  const wordSentenceTemplates = [
    "{hero} found the word {word} on a damaged label and realized it matched the next clue.",
    "{friend} treated {word} as a practical instruction, not just decoration, and adjusted the plan.",
    "A witness heard them mention {word} and pointed them toward a safer route.",
    "{hero} linked {word} to an earlier note, and the timeline suddenly became consistent.",
    "They used {word} as a code phrase, so one sentence was enough to coordinate the next step.",
    "In the oldest notebook, {word} appeared beside a timestamp that changed everything.",
    "Instead of ignoring {word}, {friend} tested it against the evidence and found a direct match.",
    "{hero} circled {word} three times because it explained why the previous attempt failed.",
    "When the pressure peaked, the idea behind {word} gave them a clear way forward.",
    "A quiet helper heard {word}, nodded once, and handed them the missing item.",
    "They returned to the map, placed {word} in context, and saw the route with new clarity.",
    "The checkpoint log listed {word} in red, which confirmed they were finally on the right track.",
  ];

  const fallbackDictionary = {
    brave: "dũng cảm",
    lantern: "đèn lồng",
    whisper: "thì thầm",
    canyon: "khe núi sâu",
    compass: "la bàn",
    mystery: "bí ẩn",
    clue: "manh mối",
    storm: "bão",
    signal: "tín hiệu",
    orbit: "quỹ đạo",
    library: "thư viện",
    journey: "hành trình",
    courage: "lòng can đảm",
    patience: "sự kiên nhẫn",
    focus: "sự tập trung",
  };

  const COMMON_STOPWORDS = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "been",
    "being",
    "but",
    "by",
    "for",
    "from",
    "had",
    "has",
    "have",
    "he",
    "her",
    "him",
    "his",
    "i",
    "in",
    "into",
    "is",
    "it",
    "its",
    "me",
    "my",
    "of",
    "on",
    "or",
    "our",
    "she",
    "that",
    "the",
    "their",
    "them",
    "there",
    "they",
    "this",
    "to",
    "was",
    "we",
    "were",
    "with",
    "you",
    "your",
  ]);

  const AUXILIARY_WORDS = new Set([
    "am",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "do",
    "does",
    "did",
    "have",
    "has",
    "had",
    "can",
    "could",
    "will",
    "would",
    "shall",
    "should",
    "may",
    "might",
    "must",
  ]);

  const state = {
    plainStory: "",
    words: [],
    tone: "adventure",
    length: "medium",
    shelf: [],
    translateCache: new Map(),
    activeTranslateToken: 0,
    readState: "idle",
    currentUtterance: null,
    speechSupported: false,
    readSentenceQueue: [],
    currentSentenceIndex: -1,
    readToken: 0,
    selectedSentenceIndex: -1,
    availableVoices: [],
    selectedVoiceUri: "",
    lastReadSession: null,
    repeatStartIndex: -1,
    repeatEndIndex: -1,
    repeatEnabled: false,
    repeatLoopTarget: 0,
    repeatLoopCompleted: 0,
    practiceItems: [],
    practiceMode: "fill_blank",
    dictationItems: [],
    dictationIndex: 0,
    dictationToken: 0,
    flashcards: [],
    flashcardQueue: [],
    flashcardCurrentIndex: -1,
    flashcardReveal: false,
    memoryItems: [],
    memoryQueue: [],
    memoryCurrentId: "",
    memoryReveal: false,
    memoryMasteredCount: 0,
    hoverSentenceIndex: -1,
  };

  let hoverTimerId = 0;

  initialize();

  function initialize() {
    toneInputs.forEach((input) => {
      input.addEventListener("change", refreshGenreCards);
    });

    generateBtn.addEventListener("click", handleGenerateStory);
    clearBtn.addEventListener("click", handleClearForm);
    readStoryBtn.addEventListener("click", handleReadStory);
    pauseReadBtn.addEventListener("click", handlePauseReading);
    resumeReadBtn.addEventListener("click", handleResumeReading);
    stopReadBtn.addEventListener("click", () => stopReading({ silent: false }));
    readFromSelectedBtn.addEventListener("click", handleReadFromSelected);
    resumeLastBtn.addEventListener("click", handleResumeLastSession);
    setRepeatStartBtn.addEventListener("click", handleSetRepeatStart);
    setRepeatEndBtn.addEventListener("click", handleSetRepeatEnd);
    toggleRepeatBtn.addEventListener("click", handleToggleRepeat);
    clearRepeatBtn.addEventListener("click", handleClearRepeat);
    prevSentenceBtn.addEventListener("click", () => handleStepSentence(-1));
    nextSentenceBtn.addEventListener("click", () => handleStepSentence(1));
    repeatLoopCount.addEventListener("change", handleRepeatLoopChange);
    readVoice.addEventListener("change", handleVoiceChange);
    readSpeed.addEventListener("change", () => persistReadSession());
    buildPracticeBtn.addEventListener("click", handleBuildPractice);
    checkPracticeBtn.addEventListener("click", handleCheckPractice);
    resetPracticeBtn.addEventListener("click", handleResetPractice);
    startMemoryBtn.addEventListener("click", handleStartMemory);
    revealMemoryBtn.addEventListener("click", handleRevealMemory);
    memoryKnownBtn.addEventListener("click", () => handleMemoryFeedback(true));
    memoryAgainBtn.addEventListener("click", () => handleMemoryFeedback(false));
    buildDictationBtn.addEventListener("click", handleBuildDictation);
    playDictationBtn.addEventListener("click", handlePlayDictation);
    checkDictationBtn.addEventListener("click", handleCheckDictation);
    showDictationAnswerBtn.addEventListener("click", handleShowDictationAnswer);
    prevDictationBtn.addEventListener("click", () => handleDictationStep(-1));
    nextDictationBtn.addEventListener("click", () => handleDictationStep(1));
    analyzeHoveredSentenceBtn.addEventListener("click", handleAnalyzeHoveredSentence);
    clearSentenceModelBtn.addEventListener("click", clearSentenceModelOutput);
    seedFlashcardsBtn.addEventListener("click", handleSeedFlashcards);
    startFlashcardBtn.addEventListener("click", handleStartFlashcardReview);
    revealFlashcardBtn.addEventListener("click", handleRevealFlashcard);
    rateHardBtn.addEventListener("click", () => handleRateFlashcard("hard"));
    rateGoodBtn.addEventListener("click", () => handleRateFlashcard("good"));
    rateEasyBtn.addEventListener("click", () => handleRateFlashcard("easy"));
    copyBtn.addEventListener("click", handleCopyStory);
    downloadBtn.addEventListener("click", handleDownloadCurrentStory);
    saveStoryBtn.addEventListener("click", handleSaveStory);
    clearShelfBtn.addEventListener("click", handleClearShelf);
    shelfList.addEventListener("click", handleShelfAction);

    storyOutput.addEventListener("mouseover", handleWordHover);
    storyOutput.addEventListener("mouseout", handleWordMouseOut);
    storyOutput.addEventListener("mouseover", handleSentenceHoverForModel);
    storyOutput.addEventListener("mouseout", handleSentenceMouseOutForModel);
    storyOutput.addEventListener("mouseup", () => {
      window.setTimeout(handleSelectionTranslation, 10);
    });
    storyOutput.addEventListener("touchend", () => {
      window.setTimeout(handleSelectionTranslation, 10);
    });
    storyOutput.addEventListener("click", handleSentenceSelection);

    document.addEventListener("mousedown", (event) => {
      const insideStory = storyOutput.contains(event.target);
      const insideBubble = translateBubble.contains(event.target);
      if (!insideStory && !insideBubble) {
        hideTranslateBubble();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        hideTranslateBubble();
      }
    });

    document.addEventListener("click", handleHelpToggle);

    loadTranslateCache();
    loadShelfFromStorage();
    loadReadSession();
    loadFlashcards();
    state.speechSupported = supportsSpeech();
    if (!state.speechSupported) {
      readStoryBtn.disabled = true;
      pauseReadBtn.disabled = true;
      resumeReadBtn.disabled = true;
      stopReadBtn.disabled = true;
      readSpeed.disabled = true;
      readVoice.disabled = true;
      readFromSelectedBtn.disabled = true;
      resumeLastBtn.disabled = true;
      setRepeatStartBtn.disabled = true;
      setRepeatEndBtn.disabled = true;
      toggleRepeatBtn.disabled = true;
      clearRepeatBtn.disabled = true;
      prevSentenceBtn.disabled = true;
      nextSentenceBtn.disabled = true;
      repeatLoopCount.disabled = true;
      playDictationBtn.disabled = true;
      readProgress.disabled = true;
      readProgressText.textContent = "Tiến độ đọc: Trình duyệt không hỗ trợ.";
    } else {
      hydrateLastReadSessionIntoUI();
      loadVoices();
      if (typeof window.speechSynthesis.addEventListener === "function") {
        window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
      } else {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
    updatePracticeControls();
    updateMemoryUI();
    updateDictationControls();
    updateFlashcardUI();
    syncRepeatUI();
    syncRepeatLoopUI();
    updateReadControls();
    updateReadProgress({ reset: true });
    clearSentenceModelOutput();
    refreshGenreCards();
    renderShelf();

    window.addEventListener("beforeunload", () => {
      stopReading({ silent: true });
    });
  }

  function handleGenerateStory() {
    const words = parseVocabulary(vocabInput.value);
    if (words.length === 0) {
      renderMessage("Bạn cần nhập ít nhất 1 từ vựng.");
      renderCoverage([], "");
      return;
    }

    const tone = getSelectedTone();
    const length = storyLength.value;
    const story = buildStory(words, tone, length);
    stopReading({ silent: true });

    state.words = words;
    state.tone = tone;
    state.length = length;
    state.plainStory = story;

    storyOutput.classList.remove("empty");
    renderStoryOutput(story, words);
    renderCoverage(words, story);
    clearPracticeState('Tạo truyện xong. Bấm "Tạo bài luyện" để luyện tập.');
    clearMemoryState("Đã tạo truyện mới. Bấm 'Bắt đầu' để nhớ nhanh.");
    clearDictationState("Tạo truyện xong. Bấm 'Tạo bộ nghe chép' để luyện nghe.");
    resetFlashcardReviewSession();
    updateFlashcardUI();
    clearSentenceModelOutput();

    if (!storyTitle.value.trim()) {
      storyTitle.value = suggestTitle(words, tone);
    }
  }

  function handleClearForm() {
    stopReading({ silent: true });
    vocabInput.value = "";
    storyTitle.value = "";
    state.plainStory = "";
    state.words = [];
    state.readSentenceQueue = [];
    state.currentSentenceIndex = -1;
    state.selectedSentenceIndex = -1;
    resetRepeatState();
    storyOutput.classList.add("empty");
    storyOutput.textContent = "Câu chuyện được tạo sẽ xuất hiện ở đây.";
    coverageSummary.textContent = "Chưa tạo truyện.";
    coverageList.innerHTML = "";
    hideTranslateBubble();
    clearPracticeState('Tạo truyện xong rồi bấm "Tạo bài luyện" để luyện từ vựng.');
    clearMemoryState("Chưa bắt đầu Memory.");
    clearDictationState("Chưa tạo bộ nghe chép.");
    resetFlashcardReviewSession();
    updateFlashcardUI();
    clearSentenceModelOutput();
    updateReadControls();
    updateReadProgress({ reset: true });
  }

  async function handleCopyStory() {
    if (!state.plainStory) {
      renderMessage("Tạo truyện trước khi copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(state.plainStory);
      coverageSummary.textContent = "Đã copy vào clipboard.";
    } catch {
      coverageSummary.textContent = "Trình duyệt hiện tại không cho phép clipboard.";
    }
  }

  function handleDownloadCurrentStory() {
    if (!state.plainStory) {
      renderMessage("Tạo truyện trước khi tải file.");
      return;
    }

    const fileName = `${safeFileName(storyTitle.value || "vocabulary-story")}.txt`;
    downloadText(state.plainStory, fileName);
  }

  function handleSaveStory() {
    if (!state.plainStory) {
      renderMessage("Tạo truyện trước khi lưu vào tủ sách.");
      return;
    }

    const title = storyTitle.value.trim() || suggestTitle(state.words, state.tone);
    const entry = {
      id: generateId(),
      title,
      tone: state.tone,
      length: state.length,
      words: [...state.words],
      story: state.plainStory,
      createdAt: new Date().toISOString(),
    };

    state.shelf.unshift(entry);
    state.shelf = state.shelf.slice(0, 60);
    storyTitle.value = title;

    persistShelf();
    renderShelf();
    coverageSummary.textContent = `Đã lưu "${title}" vào tủ sách.`;
  }

  function handleClearShelf() {
    state.shelf = [];
    persistShelf();
    renderShelf();
    coverageSummary.textContent = "Đã xóa toàn bộ tủ sách.";
  }

  function handleShelfAction(event) {
    const itemNode = event.target.closest(".shelf-item");
    if (!itemNode) {
      return;
    }

    const itemId = itemNode.dataset.id;
    if (!itemId) {
      return;
    }

    if (event.target.closest(".shelf-open")) {
      openStoryFromShelf(itemId);
      return;
    }

    if (event.target.closest(".shelf-download")) {
      downloadStoryFromShelf(itemId);
      return;
    }

    if (event.target.closest(".shelf-delete")) {
      deleteStoryFromShelf(itemId);
    }
  }

  function handleWordHover(event) {
    const markedWord = event.target.closest("mark.story-word");
    if (!markedWord || !storyOutput.contains(markedWord)) {
      return;
    }

    const text = markedWord.textContent.trim();
    if (!text) {
      return;
    }

    window.clearTimeout(hoverTimerId);
    hoverTimerId = window.setTimeout(() => {
      const rect = markedWord.getBoundingClientRect();
      requestTranslation(text, { x: rect.left + rect.width / 2, y: rect.bottom + 6 }, "Từ");
    }, 220);
  }

  function handleWordMouseOut(event) {
    const markedWord = event.target.closest("mark.story-word");
    if (!markedWord) {
      return;
    }

    window.clearTimeout(hoverTimerId);
    window.setTimeout(() => {
      if (!translateBubble.matches(":hover")) {
        hideTranslateBubble();
      }
    }, 140);
  }

  function handleSelectionTranslation() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      return;
    }

    const selectedText = selection.toString().replace(/\s+/g, " ").trim();
    if (selectedText.length < 2 || selectedText.length > 280) {
      return;
    }

    const range = selection.getRangeAt(0);
    const commonNode =
      range.commonAncestorContainer.nodeType === 3
        ? range.commonAncestorContainer.parentNode
        : range.commonAncestorContainer;

    if (!commonNode || !storyOutput.contains(commonNode)) {
      return;
    }

    const rect = range.getBoundingClientRect();
    requestTranslation(selectedText, { x: rect.left + rect.width / 2, y: rect.top - 8 }, "Đoạn");
  }

  async function requestTranslation(sourceText, position, modeLabel) {
    const cleanText = sourceText.replace(/\s+/g, " ").trim();
    if (!cleanText) {
      return;
    }

    const token = ++state.activeTranslateToken;
    showTranslateBubble(`EN (${modeLabel}): ${cleanText}`, "Đang dịch...", position);

    const translated = await translateToVietnamese(cleanText);
    if (token !== state.activeTranslateToken) {
      return;
    }

    showTranslateBubble(`EN (${modeLabel}): ${cleanText}`, `VI: ${translated}`, position);
  }

  async function translateToVietnamese(text) {
    const key = normalize(text);
    if (state.translateCache.has(key)) {
      return state.translateCache.get(key);
    }

    let translated = "";
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      const data = await response.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        translated = data[0]
          .map((segment) => (Array.isArray(segment) ? segment[0] : ""))
          .join("")
          .trim();
      }
    } catch {
      translated = "";
    }

    if (!translated) {
      translated = localFallbackTranslation(text);
    }

    state.translateCache.set(key, translated);
    persistTranslateCache();
    return translated;
  }

  function localFallbackTranslation(text) {
    const normalized = normalize(text);
    if (fallbackDictionary[normalized]) {
      return fallbackDictionary[normalized];
    }
    return "Không lấy được bản dịch. Vui lòng kiểm tra kết nối internet.";
  }

  function showTranslateBubble(source, result, position) {
    translateSource.textContent = source;
    translateResult.textContent = result;
    translateBubble.classList.remove("hidden");

    const padding = 10;
    const left = position.x + 12;
    const top = position.y + 12;
    const bubbleWidth = translateBubble.offsetWidth;
    const bubbleHeight = translateBubble.offsetHeight;
    const clampedLeft = Math.min(Math.max(padding, left), window.innerWidth - bubbleWidth - padding);
    const clampedTop = Math.min(Math.max(padding, top), window.innerHeight - bubbleHeight - padding);

    translateBubble.style.left = `${clampedLeft}px`;
    translateBubble.style.top = `${clampedTop}px`;
  }

  function hideTranslateBubble() {
    translateBubble.classList.add("hidden");
  }

  function handleHelpToggle(event) {
    const toggle = event.target.closest(".help-toggle");
    if (!toggle) {
      return;
    }

    const targetId = toggle.dataset.target || "";
    if (!targetId) {
      return;
    }

    const helpPanel = document.getElementById(targetId);
    if (!helpPanel) {
      return;
    }

    const shouldOpen = helpPanel.classList.contains("hidden");
    helpPanel.classList.toggle("hidden", !shouldOpen);
    toggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    toggle.textContent = shouldOpen ? "Ẩn hướng dẫn" : "Hướng dẫn";
  }

  function handleReadStory() {
    if (!state.speechSupported) {
      coverageSummary.textContent = "Trình duyệt hiện tại không hỗ trợ đọc truyện.";
      return;
    }

    if (!state.plainStory) {
      renderMessage("Tạo truyện trước khi đọc.");
      return;
    }

    if (state.readSentenceQueue.length === 0) {
      renderStoryOutput(state.plainStory, state.words);
    }

    if (state.readSentenceQueue.length === 0) {
      coverageSummary.textContent = "Không tìm thấy câu để đọc.";
      return;
    }

    startReadingAt(0, "Đang đọc truyện...");
  }

  function handleReadFromSelected() {
    if (!state.speechSupported) {
      return;
    }
    if (!state.plainStory || state.readSentenceQueue.length === 0) {
      coverageSummary.textContent = "Tạo truyện trước khi đọc từ câu đã chọn.";
      return;
    }

    const selected = normalizeSentenceIndex(state.selectedSentenceIndex);
    if (selected < 0) {
      coverageSummary.textContent = "Hãy click vào 1 câu trước.";
      return;
    }

    startReadingAt(selected, `Đang đọc từ câu ${selected + 1}.`);
  }

  function handleResumeLastSession() {
    if (!state.speechSupported) {
      return;
    }

    if (!state.lastReadSession || !state.lastReadSession.story) {
      coverageSummary.textContent = "Không có phiên đọc trước để tiếp tục.";
      return;
    }

    const session = state.lastReadSession;
    const currentHash = buildStoryHash(state.plainStory || "");
    if (currentHash !== session.storyHash) {
      state.plainStory = session.story;
      state.words = Array.isArray(session.words) ? session.words : [];
      state.tone = session.tone || state.tone;
      state.length = session.length || state.length;
      storyTitle.value = session.title || storyTitle.value;
      vocabInput.value = state.words.join(", ");
      storyLength.value = state.length || "medium";
      setSelectedTone(state.tone);
      storyOutput.classList.remove("empty");
      renderStoryOutput(state.plainStory, state.words);
      renderCoverage(state.words, state.plainStory);
    }

    if (typeof session.speed === "number") {
      readSpeed.value = String(session.speed);
    }
    if (session.voiceUri) {
      state.selectedVoiceUri = session.voiceUri;
      readVoice.value = session.voiceUri;
    }
    state.repeatStartIndex = Number.isInteger(session.repeatStartIndex)
      ? session.repeatStartIndex
      : -1;
    state.repeatEndIndex = Number.isInteger(session.repeatEndIndex) ? session.repeatEndIndex : -1;
    state.repeatEnabled = session.repeatEnabled === true;
    state.repeatLoopTarget =
      Number.isInteger(session.repeatLoopTarget) && session.repeatLoopTarget >= 0
        ? session.repeatLoopTarget
        : 0;
    state.repeatLoopCompleted = 0;
    if (!hasValidRepeatRange()) {
      state.repeatEnabled = false;
    }
    syncRepeatUI();
    syncRepeatLoopUI();

    const index = normalizeSentenceIndex(session.sentenceIndex);
    if (index < 0) {
      coverageSummary.textContent = "Không có vị trí đọc hợp lệ để tiếp tục.";
      return;
    }

    state.selectedSentenceIndex = index;
    setSelectedSentence(index);
    startReadingAt(index, `Tiếp tục lần trước từ câu ${index + 1}.`);
  }

  function handleVoiceChange() {
    state.selectedVoiceUri = readVoice.value || "";
    persistReadSession();
  }

  function handleRepeatLoopChange() {
    const parsed = Number.parseInt(repeatLoopCount.value, 10);
    state.repeatLoopTarget = Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
    state.repeatLoopCompleted = 0;
    syncRepeatLoopUI();
    persistReadSession();
  }

  function handleStepSentence(delta) {
    if (!state.speechSupported || state.readSentenceQueue.length === 0) {
      return;
    }

    const baseIndex =
      state.readState === "playing" || state.readState === "paused"
        ? normalizeSentenceIndex(state.currentSentenceIndex)
        : normalizeSentenceIndex(state.selectedSentenceIndex);
    if (baseIndex < 0) {
      return;
    }

    const nextIndex = Math.min(
      Math.max(baseIndex + delta, 0),
      state.readSentenceQueue.length - 1
    );
    state.selectedSentenceIndex = nextIndex;
    setSelectedSentence(nextIndex);
    updateReadProgress({
      index: nextIndex,
      total: state.readSentenceQueue.length,
      completed: false,
    });

    if (state.readState === "playing") {
      startReadingAt(nextIndex, `Đã chuyển đến câu ${nextIndex + 1}.`);
      return;
    }

    if (state.readState === "paused") {
      state.currentSentenceIndex = nextIndex;
      setActiveSentence(nextIndex);
      updateReadControls();
      persistReadSession();
      coverageSummary.textContent = `Đã đổi vị trí tạm dừng đến câu ${nextIndex + 1}.`;
      return;
    }

    updateReadControls();
    persistReadSession();
    coverageSummary.textContent = `Đã chọn câu ${nextIndex + 1}.`;
  }

  function handleBuildPractice() {
    if (!state.plainStory || state.words.length === 0) {
      practiceSummary.textContent = "Tạo truyện trước khi tạo bài luyện.";
      return;
    }

    const mode = practiceType.value || "fill_blank";
    const questions = buildPracticeQuestions(state.plainStory, state.words, mode);
    state.practiceMode = mode;
    state.practiceItems = questions;
    renderPracticeItems();
    updatePracticeControls();

    if (questions.length === 0) {
      practiceSummary.textContent = "Không tạo được bài luyện từ truyện hiện tại.";
      return;
    }
    const label =
      mode === "multiple_choice"
        ? "trắc nghiệm"
        : mode === "true_false"
          ? "đúng/sai"
          : "điền từ";
    practiceSummary.textContent = `Đã tạo ${questions.length} câu hỏi (${label}).`;
  }

  function handleCheckPractice() {
    if (!Array.isArray(state.practiceItems) || state.practiceItems.length === 0) {
      practiceSummary.textContent = "Hãy bấm Tạo bài luyện trước.";
      return;
    }

    const nodes = Array.from(practiceList.querySelectorAll(".practice-item"));
    let correct = 0;
    nodes.forEach((node) => {
      const questionType = node.dataset.type || "fill_blank";
      const answer = node.dataset.answer || "";
      const answerLabel = node.querySelector(".practice-answer");
      let isCorrect = false;

      if (questionType === "multiple_choice") {
        const checked = node.querySelector('input[type="radio"]:checked');
        const userValue = checked ? checked.value : "";
        isCorrect = normalize(userValue) === normalize(answer);
      } else if (questionType === "true_false") {
        const checked = node.querySelector('input[type="radio"]:checked');
        const userValue = checked ? checked.value : "";
        const expected = answer === "true" ? "true" : "false";
        isCorrect = userValue === expected;
      } else {
        const input = node.querySelector("input");
        const userValue = input ? normalize(input.value || "") : "";
        isCorrect = userValue === normalize(answer);
      }

      node.classList.remove("correct", "wrong");
      node.classList.add(isCorrect ? "correct" : "wrong");
      if (answerLabel) {
        if (questionType === "true_false") {
          answerLabel.textContent = isCorrect
            ? "Đúng."
            : `Sai. Đáp án: ${answer === "true" ? "Đúng" : "Sai"}`;
        } else {
          answerLabel.textContent = isCorrect ? "Đúng." : `Sai. Đáp án: ${answer}`;
        }
      }
      if (isCorrect) {
        correct += 1;
      }
    });

    const total = state.practiceItems.length;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    practiceSummary.textContent = `Kết quả: ${correct}/${total} (${percent}%).`;
  }

  function handleResetPractice() {
    if (!Array.isArray(state.practiceItems) || state.practiceItems.length === 0) {
      return;
    }
    renderPracticeItems();
    practiceSummary.textContent = `Đã reset bài luyện (${state.practiceItems.length} câu).`;
  }

  function handleStartMemory() {
    if (!state.plainStory || state.words.length === 0) {
      memorySummary.textContent = "Tạo truyện trước khi bắt đầu Nhớ Nhanh.";
      return;
    }

    const items = buildMemoryItems(state.plainStory, state.words);
    if (items.length === 0) {
      memorySummary.textContent = "Không tạo được dữ liệu Nhớ Nhanh.";
      updateMemoryUI();
      return;
    }

    state.memoryItems = items;
    state.memoryQueue = shuffle(items.map((item) => item.id));
    state.memoryCurrentId = state.memoryQueue[0];
    state.memoryReveal = false;
    state.memoryMasteredCount = 0;
    updateMemoryUI();
  }

  function handleRevealMemory() {
    if (!state.memoryCurrentId) {
      return;
    }
    state.memoryReveal = true;
    updateMemoryUI();
  }

  function handleMemoryFeedback(known) {
    if (!state.memoryCurrentId || state.memoryQueue.length === 0) {
      return;
    }

    const currentId = state.memoryCurrentId;
    const currentIndex = state.memoryQueue.indexOf(currentId);
    if (currentIndex < 0) {
      return;
    }

    state.memoryQueue.splice(currentIndex, 1);

    if (known) {
      state.memoryMasteredCount += 1;
    } else {
      const insertIndex = Math.min(2, state.memoryQueue.length);
      state.memoryQueue.splice(insertIndex, 0, currentId);
    }

    state.memoryCurrentId = state.memoryQueue[0] || "";
    state.memoryReveal = false;
    updateMemoryUI();
  }

  function handleBuildDictation() {
    if (!state.plainStory || state.readSentenceQueue.length === 0) {
      dictationSummary.textContent = "Tạo truyện trước khi tạo bộ nghe chép.";
      return;
    }

    const source = state.readSentenceQueue.filter(
      (sentence) => sentence && sentence.trim().split(/\s+/).length >= 1
    );
    state.dictationItems = source.map((sentence) => ({
      id: generateId(),
      sentence: sentence.trim(),
    }));
    state.dictationIndex = 0;
    state.dictationToken += 1;
    dictationInput.value = "";
    dictationResult.textContent = "";

    if (state.dictationItems.length === 0) {
      dictationSummary.textContent = "Không đủ câu để tạo bộ nghe chép.";
      updateDictationControls();
      return;
    }

    dictationSummary.textContent = `Đã tạo bộ nghe chép (${state.dictationItems.length} câu).`;
    updateDictationControls();
  }

  function handlePlayDictation() {
    if (!state.speechSupported) {
      dictationSummary.textContent = "Trình duyệt không hỗ trợ đọc nghe chép.";
      return;
    }
    if (!Array.isArray(state.dictationItems) || state.dictationItems.length === 0) {
      dictationSummary.textContent = "Hãy tạo bộ nghe chép trước.";
      return;
    }

    const item = state.dictationItems[state.dictationIndex];
    if (!item || !item.sentence) {
      return;
    }

    if (state.readState === "playing" || state.readState === "paused") {
      stopReading({ silent: true });
    }

    if (typeof window.speechSynthesis.resume === "function") {
      window.speechSynthesis.resume();
    }
    if (state.availableVoices.length === 0) {
      loadVoices();
    }

    state.dictationToken += 1;
    const token = state.dictationToken;
    startDictationUtterance(item.sentence, token, true);
  }

  function startDictationUtterance(sentence, token, allowRetry) {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = "en-US";
    utterance.rate = Number.parseFloat(readSpeed.value) || 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    const selectedVoice = pickCurrentVoice();
    if (selectedVoice && selectedVoice.voiceURI) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang || "en-US";
    } else {
      const anyVoice = window.speechSynthesis.getVoices().find((voice) => voice && voice.voiceURI);
      if (anyVoice) {
        utterance.voice = anyVoice;
        utterance.lang = anyVoice.lang || "en-US";
      }
    }

    utterance.onstart = () => {
      if (token !== state.dictationToken) {
        return;
      }
      dictationSummary.textContent = `Đang phát câu ${state.dictationIndex + 1}/${state.dictationItems.length}.`;
    };

    utterance.onend = () => {
      if (token !== state.dictationToken) {
        return;
      }
      dictationSummary.textContent = `Đã phát xong câu ${state.dictationIndex + 1}.`;
    };

    utterance.onerror = () => {
      if (token !== state.dictationToken) {
        return;
      }
      if (allowRetry) {
        loadVoices();
        if (typeof window.speechSynthesis.resume === "function") {
          window.speechSynthesis.resume();
        }
        window.setTimeout(() => {
          if (token !== state.dictationToken) {
            return;
          }
          startDictationUtterance(sentence, token, false);
        }, 120);
        return;
      }
      dictationSummary.textContent =
        "Không phát được audio cho nghe chép. Hãy thử bấm lại hoặc đổi giọng đọc.";
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function handleCheckDictation() {
    const item = state.dictationItems[state.dictationIndex];
    if (!item || !item.sentence) {
      dictationResult.textContent = "";
      return;
    }

    const userText = dictationInput.value.trim();
    if (!userText) {
      dictationResult.textContent = "Bạn chưa nhập câu trả lời.";
      return;
    }

    const expectedTokens = tokenizeForCompare(item.sentence);
    const userTokens = tokenizeForCompare(userText);
    if (expectedTokens.length === 0) {
      dictationResult.textContent = "Không có dữ liệu chấm điểm.";
      return;
    }

    const distance = levenshteinDistance(expectedTokens, userTokens);
    const maxLen = Math.max(expectedTokens.length, userTokens.length, 1);
    const score = Math.max(0, Math.round((1 - distance / maxLen) * 100));
    const isPerfect = score === 100;
    dictationResult.textContent = isPerfect
      ? "Chính xác 100%."
      : `Độ chính xác ước tính: ${score}%.`;
  }

  function handleShowDictationAnswer() {
    const item = state.dictationItems[state.dictationIndex];
    if (!item || !item.sentence) {
      dictationResult.textContent = "";
      return;
    }
    dictationResult.textContent = `Đáp án: ${item.sentence}`;
  }

  function handleDictationStep(delta) {
    if (!Array.isArray(state.dictationItems) || state.dictationItems.length === 0) {
      return;
    }
    const next = Math.min(
      Math.max(state.dictationIndex + delta, 0),
      state.dictationItems.length - 1
    );
    state.dictationIndex = next;
    dictationInput.value = "";
    dictationResult.textContent = "";
    updateDictationControls();
  }

  function updateDictationControls() {
    const total = state.dictationItems.length;
    const hasItems = total > 0;
    const index = Math.min(Math.max(state.dictationIndex, 0), Math.max(total - 1, 0));
    const current = hasItems ? state.dictationItems[index] : null;
    const wordCount = current ? current.sentence.split(/\s+/).length : 0;

    dictationPrompt.textContent = hasItems
      ? `Câu ${index + 1}/${total} - Độ dài ~ ${wordCount} từ`
      : "Câu 0/0";
    playDictationBtn.disabled = !hasItems || !state.speechSupported;
    checkDictationBtn.disabled = !hasItems;
    showDictationAnswerBtn.disabled = !hasItems;
    prevDictationBtn.disabled = !hasItems || index <= 0;
    nextDictationBtn.disabled = !hasItems || index >= total - 1;
  }

  function clearDictationState(message) {
    state.dictationItems = [];
    state.dictationIndex = 0;
    state.dictationToken += 1;
    if (state.speechSupported && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) {
      window.speechSynthesis.cancel();
    }
    dictationInput.value = "";
    dictationResult.textContent = "";
    dictationSummary.textContent = message || "Chưa tạo bộ nghe chép.";
    updateDictationControls();
  }

  async function handleSeedFlashcards() {
    if (!Array.isArray(state.words) || state.words.length === 0) {
      flashcardSummary.textContent = "Nhập từ vựng hoặc tạo truyện trước khi tạo thẻ.";
      return;
    }

    const incoming = [...new Set(state.words.map((word) => word.trim()).filter(Boolean))];
    let added = 0;
    let refreshed = 0;

    for (const word of incoming) {
      const normalizedWord = normalize(word);
      let card = state.flashcards.find((item) => normalize(item.word) === normalizedWord);
      const meaning = await translateToVietnamese(word);

      if (!card) {
        card = {
          id: generateId(),
          word,
          meaning,
          intervalDays: 0,
          easeFactor: 2.3,
          dueAt: new Date().toISOString(),
          lastReviewedAt: "",
        };
        state.flashcards.push(card);
        added += 1;
      } else if (!card.meaning || card.meaning.startsWith("Không lấy được")) {
        card.meaning = meaning;
        refreshed += 1;
      } else {
        refreshed += 1;
      }
    }

    persistFlashcards();
    updateFlashcardUI();
    flashcardSummary.textContent = `Flashcard: thêm ${added}, cập nhật ${refreshed}.`;
  }

  function handleStartFlashcardReview() {
    if (!Array.isArray(state.flashcards) || state.flashcards.length === 0) {
      flashcardSummary.textContent = "Chưa có thẻ. Bấm Tạo/Cập nhật thẻ trước.";
      updateFlashcardUI();
      return;
    }

    const due = getDueFlashcards();
    if (due.length === 0) {
      const nextDue = getNextDueCardDate();
      flashcardSummary.textContent = nextDue
        ? `Chưa có thẻ đến hạn. Lần tiếp theo: ${nextDue}.`
        : "Chưa có thẻ đến hạn.";
      updateFlashcardUI();
      return;
    }

    state.flashcardQueue = due;
    state.flashcardCurrentIndex = 0;
    state.flashcardReveal = false;
    updateFlashcardUI();
    flashcardSummary.textContent = `Bắt đầu ôn ${due.length} thẻ đến hạn.`;
  }

  async function handleRevealFlashcard() {
    const card = getCurrentFlashcard();
    if (!card) {
      return;
    }

    if (!card.meaning || card.meaning.startsWith("Không lấy được")) {
      card.meaning = await translateToVietnamese(card.word);
      persistFlashcards();
    }

    state.flashcardReveal = true;
    updateFlashcardUI();
  }

  function handleRateFlashcard(level) {
    const card = getCurrentFlashcard();
    if (!card) {
      return;
    }

    const now = new Date();
    const interval = Number.isFinite(card.intervalDays) ? card.intervalDays : 0;
    const ease = Number.isFinite(card.easeFactor) ? card.easeFactor : 2.3;
    let nextInterval = 1;
    let nextEase = ease;

    if (level === "hard") {
      nextInterval = 1;
      nextEase = Math.max(1.3, ease - 0.15);
    } else if (level === "good") {
      nextInterval = interval <= 0 ? 1 : Math.max(1, Math.round(interval * ease));
      nextEase = ease;
    } else {
      nextInterval = interval <= 0 ? 2 : Math.max(2, Math.round(interval * ease * 1.3));
      nextEase = Math.min(3.0, ease + 0.05);
    }

    const nextDueAt = new Date(now.getTime() + nextInterval * 24 * 60 * 60 * 1000);
    card.intervalDays = nextInterval;
    card.easeFactor = nextEase;
    card.lastReviewedAt = now.toISOString();
    card.dueAt = nextDueAt.toISOString();

    state.flashcardCurrentIndex += 1;
    state.flashcardReveal = false;

    persistFlashcards();

    if (state.flashcardCurrentIndex >= state.flashcardQueue.length) {
      state.flashcardQueue = [];
      state.flashcardCurrentIndex = -1;
      updateFlashcardUI();
      flashcardSummary.textContent = "Đã ôn xong loạt thẻ đến hạn.";
      return;
    }

    updateFlashcardUI();
  }

  function handleSetRepeatStart() {
    const selected = normalizeSentenceIndex(state.selectedSentenceIndex);
    if (selected < 0) {
      coverageSummary.textContent = "Hãy chọn 1 câu để đặt điểm A.";
      return;
    }

    state.repeatStartIndex = selected;
    if (state.repeatEndIndex >= 0 && state.repeatEndIndex < state.repeatStartIndex) {
      state.repeatEndIndex = state.repeatStartIndex;
    }
    if (!hasValidRepeatRange()) {
      state.repeatEnabled = false;
    }
    state.repeatLoopCompleted = 0;
    syncRepeatUI();
    syncRepeatLoopUI();
    persistReadSession();
    coverageSummary.textContent = `Đã đặt A tại câu ${selected + 1}.`;
  }

  function handleSetRepeatEnd() {
    const selected = normalizeSentenceIndex(state.selectedSentenceIndex);
    if (selected < 0) {
      coverageSummary.textContent = "Hãy chọn 1 câu để đặt điểm B.";
      return;
    }

    state.repeatEndIndex = selected;
    if (state.repeatStartIndex >= 0 && state.repeatEndIndex < state.repeatStartIndex) {
      const temp = state.repeatStartIndex;
      state.repeatStartIndex = state.repeatEndIndex;
      state.repeatEndIndex = temp;
    }
    if (!hasValidRepeatRange()) {
      state.repeatEnabled = false;
    }
    state.repeatLoopCompleted = 0;
    syncRepeatUI();
    syncRepeatLoopUI();
    persistReadSession();
    coverageSummary.textContent = `Đã đặt B tại câu ${selected + 1}.`;
  }

  function handleToggleRepeat() {
    if (!hasValidRepeatRange()) {
      coverageSummary.textContent = "Đặt đủ A và B trước khi bật AB Repeat.";
      return;
    }

    state.repeatEnabled = !state.repeatEnabled;
    state.repeatLoopCompleted = 0;
    syncRepeatUI();
    syncRepeatLoopUI();
    persistReadSession();

    if (state.repeatEnabled) {
      coverageSummary.textContent = `Đã bật AB Repeat (câu ${state.repeatStartIndex + 1} -> ${state.repeatEndIndex + 1}).`;
    } else {
      coverageSummary.textContent = "Đã tắt AB Repeat.";
    }
  }

  function handleClearRepeat() {
    resetRepeatState();
    persistReadSession();
    coverageSummary.textContent = "Đã xóa AB Repeat.";
  }

  function startReadingAt(index, message) {
    let startIndex = normalizeSentenceIndex(index);
    if (state.repeatEnabled && hasValidRepeatRange()) {
      const range = getRepeatRange();
      if (startIndex < range.start || startIndex > range.end) {
        startIndex = range.start;
      }
    }
    if (startIndex < 0) {
      coverageSummary.textContent = "Không tìm thấy câu để đọc.";
      return;
    }

    if (state.repeatEnabled && hasValidRepeatRange()) {
      state.repeatLoopCompleted = 0;
      syncRepeatLoopUI();
    }

    stopReading({ silent: true, keepHighlight: false, keepPosition: false });
    state.readState = "playing";
    state.currentSentenceIndex = startIndex;
    state.readToken += 1;
    state.selectedSentenceIndex = startIndex;
    setActiveSentence(startIndex);
    setSelectedSentence(startIndex);
    updateReadControls();
    updateReadProgress({ index: startIndex, total: state.readSentenceQueue.length });
    coverageSummary.textContent = message;
    persistReadSession();
    speakSentenceAt(startIndex, state.readToken);
  }

  function handlePauseReading() {
    if (!state.speechSupported || state.readState !== "playing") {
      return;
    }

    const pauseIndex = getPauseResumeIndex();
    state.readToken += 1;
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    state.readState = "paused";
    state.currentUtterance = null;
    state.currentSentenceIndex = pauseIndex;
    setActiveSentence(pauseIndex);
    updateReadControls();
    updateReadProgress({ index: pauseIndex, total: state.readSentenceQueue.length });
    persistReadSession();
    coverageSummary.textContent = "Đã tạm dừng đọc.";
  }

  function handleResumeReading() {
    if (!state.speechSupported || state.readState !== "paused") {
      return;
    }

    const resumeIndex = normalizeSentenceIndex(state.currentSentenceIndex);
    if (resumeIndex < 0) {
      coverageSummary.textContent = "Không tìm thấy câu để tiếp tục.";
      return;
    }

    state.readToken += 1;
    state.readState = "playing";
    state.currentSentenceIndex = resumeIndex;
    setActiveSentence(resumeIndex);
    updateReadControls();
    updateReadProgress({ index: resumeIndex, total: state.readSentenceQueue.length });
    persistReadSession();
    coverageSummary.textContent = "Đã tiếp tục đọc.";
    speakSentenceAt(resumeIndex, state.readToken);
  }

  function stopReading(options) {
    const silent = options?.silent === true;
    const keepHighlight = options?.keepHighlight === true;
    const keepPosition = options?.keepPosition === true;
    if (!state.speechSupported) {
      return;
    }

    state.readToken += 1;
    const readingInProgress = state.readState === "playing" || state.readState === "paused";
    if (readingInProgress || window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }

    state.readState = "idle";
    state.currentUtterance = null;
    state.currentSentenceIndex = keepPosition
      ? normalizeSentenceIndex(state.currentSentenceIndex)
      : -1;
    if (!keepHighlight) {
      setActiveSentence(null);
    }
    updateReadControls();
    updateReadProgress({
      index: state.currentSentenceIndex,
      total: state.readSentenceQueue.length,
      completed: false,
    });
    persistReadSession();

    if (!silent && readingInProgress) {
      coverageSummary.textContent = "Đã dừng đọc.";
    }
  }

  function updateReadControls() {
    if (!state.speechSupported) {
      return;
    }

    const isIdle = state.readState === "idle";
    const isPlaying = state.readState === "playing";
    const isPaused = state.readState === "paused";
    const hasStory = Boolean(state.plainStory && state.readSentenceQueue.length > 0);
    const hasSelectedSentence =
      Number.isInteger(state.selectedSentenceIndex) &&
      state.selectedSentenceIndex >= 0 &&
      state.selectedSentenceIndex < state.readSentenceQueue.length;
    const hasLastSession = Boolean(state.lastReadSession && state.lastReadSession.story);
    const hasRepeatRange = hasValidRepeatRange();

    readStoryBtn.disabled = !hasStory;
    pauseReadBtn.disabled = !isPlaying;
    resumeReadBtn.disabled = !isPaused;
    stopReadBtn.disabled = isIdle;
    readFromSelectedBtn.disabled = !hasStory || !hasSelectedSentence || isPlaying;
    resumeLastBtn.disabled = !hasLastSession || isPlaying;
    readVoice.disabled = state.availableVoices.length === 0;
    setRepeatStartBtn.disabled = !hasStory || !hasSelectedSentence;
    setRepeatEndBtn.disabled = !hasStory || !hasSelectedSentence;
    toggleRepeatBtn.disabled = !hasStory || !hasRepeatRange;
    clearRepeatBtn.disabled = !hasStory || (!hasRepeatRange && !state.repeatEnabled);
    prevSentenceBtn.disabled = !hasStory || isPlaying;
    nextSentenceBtn.disabled = !hasStory || isPlaying;
    repeatLoopCount.disabled = !hasStory || !hasRepeatRange;
  }

  function supportsSpeech() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }

  function normalizeSentenceIndex(index) {
    if (state.readSentenceQueue.length === 0) {
      return -1;
    }

    if (!Number.isInteger(index) || index < 0) {
      return 0;
    }

    if (index >= state.readSentenceQueue.length) {
      return state.readSentenceQueue.length - 1;
    }

    return index;
  }

  function getPauseResumeIndex() {
    return normalizeSentenceIndex(state.currentSentenceIndex);
  }

  function hasValidRepeatRange() {
    const start = state.repeatStartIndex;
    const end = state.repeatEndIndex;
    if (!Number.isInteger(start) || !Number.isInteger(end)) {
      return false;
    }
    if (start < 0 || end < 0) {
      return false;
    }
    if (start >= state.readSentenceQueue.length || end >= state.readSentenceQueue.length) {
      return false;
    }
    return start <= end;
  }

  function getRepeatRange() {
    if (!hasValidRepeatRange()) {
      return null;
    }
    return {
      start: state.repeatStartIndex,
      end: state.repeatEndIndex,
    };
  }

  function resolveNextReadIndex(currentIndex) {
    const defaultNext = currentIndex + 1;
    if (!state.repeatEnabled) {
      return defaultNext;
    }

    const range = getRepeatRange();
    if (!range) {
      return defaultNext;
    }

    if (currentIndex < range.start) {
      return range.start;
    }
    if (currentIndex >= range.end) {
      state.repeatLoopCompleted += 1;
      syncRepeatLoopUI();
      persistReadSession();
      if (
        Number.isInteger(state.repeatLoopTarget) &&
        state.repeatLoopTarget > 0 &&
        state.repeatLoopCompleted >= state.repeatLoopTarget
      ) {
        return -1;
      }
      return range.start;
    }
    return currentIndex + 1;
  }

  function resetRepeatState() {
    state.repeatStartIndex = -1;
    state.repeatEndIndex = -1;
    state.repeatEnabled = false;
    state.repeatLoopCompleted = 0;
    syncRepeatUI();
    syncRepeatLoopUI();
  }

  function syncRepeatUI() {
    if (!repeatStatus || !toggleRepeatBtn) {
      return;
    }

    const hasRange = hasValidRepeatRange();
    const rangeText = hasRange
      ? `A ${state.repeatStartIndex + 1} - B ${state.repeatEndIndex + 1}`
      : "A -, B -";
    const onText = state.repeatEnabled && hasRange ? "Bật" : "Tắt";
    repeatStatus.textContent = `AB Repeat: ${onText} (${rangeText})`;
    repeatStatus.classList.toggle("repeat-on", state.repeatEnabled && hasRange);
    toggleRepeatBtn.textContent = state.repeatEnabled ? "Tắt AB Repeat" : "Bật AB Repeat";
  }

  function syncRepeatLoopUI() {
    if (!repeatLoopStatus || !repeatLoopCount) {
      return;
    }

    if (!Number.isInteger(state.repeatLoopTarget) || state.repeatLoopTarget < 0) {
      state.repeatLoopTarget = 0;
    }
    repeatLoopCount.value = String(state.repeatLoopTarget);
    const targetText =
      state.repeatLoopTarget === 0 ? "vô hạn" : `${state.repeatLoopTarget} vòng`;
    repeatLoopStatus.textContent = `Vòng lặp AB: ${state.repeatLoopCompleted}/${targetText}`;
    const shouldHighlight =
      state.repeatEnabled && hasValidRepeatRange() && state.repeatLoopCompleted > 0;
    repeatLoopStatus.classList.toggle("loop-on", shouldHighlight);
  }

  function speakSentenceAt(index, token) {
    if (token !== state.readToken) {
      return;
    }

    const safeIndex = normalizeSentenceIndex(index);
    if (safeIndex < 0) {
      finishReading("Không tìm thấy câu để đọc.");
      return;
    }

    const sentenceText = state.readSentenceQueue[safeIndex];
    if (typeof sentenceText !== "string") {
      finishReading("Đọc xong.");
      return;
    }

    const cleaned = sentenceText.replace(/\s+/g, " ").trim();
    if (!cleaned) {
      speakSentenceAt(index + 1, token);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = "en-US";
    utterance.rate = Number.parseFloat(readSpeed.value) || 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    const selectedVoice = pickCurrentVoice();
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang || utterance.lang;
    }

    utterance.onstart = () => {
      if (token !== state.readToken) {
        return;
      }
      state.readState = "playing";
      state.currentUtterance = utterance;
      state.currentSentenceIndex = safeIndex;
      state.selectedSentenceIndex = safeIndex;
      setActiveSentence(safeIndex);
      setSelectedSentence(safeIndex);
      updateReadProgress({ index: safeIndex, total: state.readSentenceQueue.length });
      updateReadControls();
      persistReadSession();
    };

    utterance.onend = () => {
      if (token !== state.readToken) {
        return;
      }

      state.currentUtterance = null;
      if (state.readState !== "playing") {
        return;
      }

      const nextIndex = resolveNextReadIndex(safeIndex);
      if (nextIndex < 0 || nextIndex >= state.readSentenceQueue.length) {
        if (nextIndex < 0 && state.repeatEnabled && hasValidRepeatRange()) {
          finishReading(`Hoàn thành ${state.repeatLoopCompleted} vòng AB.`);
          return;
        }
        finishReading("Đọc xong.");
        return;
      }

      state.currentSentenceIndex = nextIndex;
      state.selectedSentenceIndex = nextIndex;
      updateReadProgress({ index: nextIndex, total: state.readSentenceQueue.length });
      persistReadSession();
      speakSentenceAt(nextIndex, token);
    };

    utterance.onerror = () => {
      if (token !== state.readToken) {
        return;
      }
      state.currentUtterance = null;
      finishReading("Không thể đọc truyện trên trình duyệt này.");
    };

    window.speechSynthesis.speak(utterance);
  }

  function finishReading(message) {
    state.readState = "idle";
    state.currentUtterance = null;
    state.currentSentenceIndex = -1;
    setActiveSentence(null);
    const completed = message === "Đọc xong.";
    updateReadProgress({
      index: completed ? state.readSentenceQueue.length - 1 : -1,
      total: state.readSentenceQueue.length,
      completed,
    });
    updateReadControls();
    if (completed) {
      clearReadSession();
    } else {
      persistReadSession();
    }
    coverageSummary.textContent = message;
  }

  function setActiveSentence(index) {
    const oldNode = storyOutput.querySelector(".story-sentence.active-reading");
    if (oldNode) {
      oldNode.classList.remove("active-reading");
    }

    if (!Number.isInteger(index) || index < 0) {
      return;
    }

    const newNode = storyOutput.querySelector(`[data-sentence-id="${index}"]`);
    if (!newNode) {
      return;
    }

    newNode.classList.add("active-reading");
    newNode.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function handleSentenceSelection(event) {
    const sentenceNode = event.target.closest(".story-sentence");
    if (!sentenceNode || !storyOutput.contains(sentenceNode)) {
      return;
    }

    const sentenceId = Number.parseInt(sentenceNode.dataset.sentenceId, 10);
    if (!Number.isInteger(sentenceId)) {
      return;
    }

    state.selectedSentenceIndex = normalizeSentenceIndex(sentenceId);
    state.hoverSentenceIndex = state.selectedSentenceIndex;
    setSelectedSentence(state.selectedSentenceIndex);
    syncSentenceModelSelectionState();

    if (state.readState !== "playing") {
      updateReadProgress({
        index: state.selectedSentenceIndex,
        total: state.readSentenceQueue.length,
        completed: false,
      });
    }
    updateReadControls();
  }

  function setSelectedSentence(index) {
    const oldNode = storyOutput.querySelector(".story-sentence.selected-sentence");
    if (oldNode) {
      oldNode.classList.remove("selected-sentence");
    }

    if (!Number.isInteger(index) || index < 0) {
      return;
    }

    const newNode = storyOutput.querySelector(`[data-sentence-id="${index}"]`);
    if (!newNode) {
      return;
    }

    newNode.classList.add("selected-sentence");
  }

  function handleSentenceHoverForModel(event) {
    const sentenceNode = event.target.closest(".story-sentence");
    if (!sentenceNode || !storyOutput.contains(sentenceNode)) {
      return;
    }

    const sentenceId = Number.parseInt(sentenceNode.dataset.sentenceId, 10);
    if (!Number.isInteger(sentenceId)) {
      return;
    }

    state.hoverSentenceIndex = normalizeSentenceIndex(sentenceId);
    syncSentenceModelSelectionState();
  }

  function handleSentenceMouseOutForModel(event) {
    const sentenceNode = event.target.closest(".story-sentence");
    if (!sentenceNode || !storyOutput.contains(sentenceNode)) {
      return;
    }
    const related = event.relatedTarget;
    if (related && sentenceNode.contains(related)) {
      return;
    }
    state.hoverSentenceIndex = -1;
    syncSentenceModelSelectionState();
  }

  function syncSentenceModelSelectionState() {
    const index = normalizeSentenceIndex(state.hoverSentenceIndex);
    if (index < 0) {
      analyzeHoveredSentenceBtn.disabled = true;
      sentenceModelHint.textContent = "Rê chuột vào 1 câu để bắt đầu phân tích mẫu câu.";
      return;
    }

    analyzeHoveredSentenceBtn.disabled = false;
    sentenceModelHint.textContent = `Đang rê câu ${index + 1}. Bấm "Phân tích câu đang rê" để xem công thức.`;
  }

  function handleAnalyzeHoveredSentence() {
    const index = normalizeSentenceIndex(state.hoverSentenceIndex);
    if (index < 0) {
      sentenceModelHint.textContent = "Bạn chưa rê chuột vào câu nào.";
      return;
    }
    const sentence = state.readSentenceQueue[index] || "";
    if (!sentence) {
      sentenceModelHint.textContent = "Không tìm thấy câu để phân tích.";
      return;
    }

    const model = buildSentenceModel(sentence);
    renderSentenceModelOutput(model, index);
  }

  function clearSentenceModelOutput() {
    state.hoverSentenceIndex = -1;
    sentenceModelOutput.classList.add("empty");
    sentenceModelOutput.innerHTML = "Kết quả phân tích cấu trúc câu sẽ hiển thị ở đây.";
    syncSentenceModelSelectionState();
  }

  function renderSentenceModelOutput(model, index) {
    sentenceModelOutput.classList.remove("empty");
    const stepsHtml = model.replacementSteps
      .map((step) => `<li>${escapeHtml(step)}</li>`)
      .join("");

    sentenceModelOutput.innerHTML = `
      <p><strong>Câu ${index + 1}:</strong> ${escapeHtml(model.originalSentence)}</p>
      <p><strong>Loại câu:</strong> ${escapeHtml(model.typeLabel)}</p>
      <p><strong>Công thức:</strong> ${escapeHtml(model.formula)}</p>
      <p><strong>Khung mẫu:</strong> <code>${escapeHtml(model.scaffold)}</code></p>
      <p><strong>Cách thay từ để tạo câu mới:</strong></p>
      <ol>${stepsHtml}</ol>
      <p><strong>Ví dụ câu mới:</strong> ${escapeHtml(model.newSentenceExample)}</p>
    `;
    sentenceModelHint.textContent = `Đã phân tích câu ${index + 1}.`;
  }

  function updateReadProgress(options) {
    const total = Number.isInteger(options?.total) ? options.total : state.readSentenceQueue.length;
    const index = Number.isInteger(options?.index) ? options.index : state.currentSentenceIndex;
    const completed = options?.completed === true;
    const reset = options?.reset === true;

    if (!state.speechSupported) {
      return;
    }

    if (reset || total <= 0) {
      readProgress.value = 0;
      readProgressText.textContent = "Tiến độ đọc: 0%";
      return;
    }

    const safeIndex = Math.max(0, Math.min(index, total - 1));
    const ratio = completed ? 1 : (safeIndex + 1) / total;
    const percent = Math.round(ratio * 100);
    const abSuffix =
      state.repeatEnabled && hasValidRepeatRange()
        ? ` | AB ${state.repeatStartIndex + 1}-${state.repeatEndIndex + 1}`
        : "";
    readProgress.value = percent;
    readProgressText.textContent = `Tiến độ đọc: ${percent}% (${safeIndex + 1}/${total} câu)${abSuffix}`;
  }

  function buildStoryHash(text) {
    const input = normalize(text || "");
    let hash = 5381;
    for (let i = 0; i < input.length; i += 1) {
      hash = ((hash << 5) + hash + input.charCodeAt(i)) >>> 0;
    }
    return hash.toString(16);
  }

  function clearReadSession() {
    state.lastReadSession = null;
    try {
      localStorage.removeItem(READ_SESSION_STORAGE_KEY);
    } catch {
      // Ignore localStorage remove failure.
    }
    updateReadControls();
  }

  function persistReadSession() {
    if (!state.speechSupported) {
      return;
    }
    if (!state.plainStory || state.readSentenceQueue.length === 0) {
      return;
    }

    const position = normalizeSentenceIndex(
      state.readState === "playing" ? state.currentSentenceIndex : state.selectedSentenceIndex
    );
    if (position < 0) {
      return;
    }

    const session = {
      savedAt: new Date().toISOString(),
      storyHash: buildStoryHash(state.plainStory),
      story: state.plainStory,
      words: [...state.words],
      title: storyTitle.value.trim(),
      tone: state.tone,
      length: state.length,
      sentenceIndex: position,
      speed: Number.parseFloat(readSpeed.value) || 1,
      voiceUri: readVoice.value || state.selectedVoiceUri || "",
      repeatStartIndex: state.repeatStartIndex,
      repeatEndIndex: state.repeatEndIndex,
      repeatEnabled: state.repeatEnabled,
      repeatLoopTarget: state.repeatLoopTarget,
      repeatLoopCompleted: state.repeatLoopCompleted,
    };

    state.lastReadSession = session;
    try {
      localStorage.setItem(READ_SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Ignore localStorage write failure.
    }
    updateReadControls();
  }

  function loadReadSession() {
    try {
      const raw = localStorage.getItem(READ_SESSION_STORAGE_KEY);
      if (!raw) {
        state.lastReadSession = null;
        return;
      }
      const parsed = JSON.parse(raw);
      state.lastReadSession = parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      state.lastReadSession = null;
    }
  }

  function hydrateLastReadSessionIntoUI() {
    if (!state.lastReadSession || !state.lastReadSession.story) {
      return;
    }

    state.plainStory = state.lastReadSession.story;
    state.words = Array.isArray(state.lastReadSession.words) ? state.lastReadSession.words : [];
    state.tone = state.lastReadSession.tone || state.tone;
    state.length = state.lastReadSession.length || state.length;
    state.selectedSentenceIndex = normalizeSentenceIndex(state.lastReadSession.sentenceIndex);

    storyTitle.value = state.lastReadSession.title || storyTitle.value;
    vocabInput.value = state.words.join(", ");
    storyLength.value = state.length || "medium";
    setSelectedTone(state.tone);

    storyOutput.classList.remove("empty");
    renderStoryOutput(state.plainStory, state.words);
    renderCoverage(state.words, state.plainStory);
    state.repeatStartIndex = Number.isInteger(state.lastReadSession.repeatStartIndex)
      ? state.lastReadSession.repeatStartIndex
      : -1;
    state.repeatEndIndex = Number.isInteger(state.lastReadSession.repeatEndIndex)
      ? state.lastReadSession.repeatEndIndex
      : -1;
    state.repeatEnabled = state.lastReadSession.repeatEnabled === true;
    state.repeatLoopTarget =
      Number.isInteger(state.lastReadSession.repeatLoopTarget) &&
      state.lastReadSession.repeatLoopTarget >= 0
        ? state.lastReadSession.repeatLoopTarget
        : 0;
    state.repeatLoopCompleted = 0;
    if (!hasValidRepeatRange()) {
      state.repeatEnabled = false;
    }
    syncRepeatUI();
    syncRepeatLoopUI();
    setSelectedSentence(state.selectedSentenceIndex);
    updateReadProgress({
      index: state.selectedSentenceIndex,
      total: state.readSentenceQueue.length,
      completed: false,
    });
    if (state.selectedSentenceIndex >= 0) {
      coverageSummary.textContent = `Đã khôi phục phiên đọc trước (câu ${state.selectedSentenceIndex + 1}).`;
    } else {
      coverageSummary.textContent = "Đã khôi phục phiên đọc trước.";
    }

    if (typeof state.lastReadSession.speed === "number") {
      readSpeed.value = String(state.lastReadSession.speed);
    }
    if (typeof state.lastReadSession.voiceUri === "string") {
      state.selectedVoiceUri = state.lastReadSession.voiceUri;
    }
  }

  function loadVoices() {
    if (!state.speechSupported) {
      return;
    }

    const allVoices = window.speechSynthesis
      .getVoices()
      .filter((voice) => voice && typeof voice.voiceURI === "string" && voice.voiceURI);
    const englishVoices = allVoices.filter(
      (voice) => voice && voice.lang && /^en(-|$)/i.test(voice.lang)
    );
    const voices = englishVoices.length > 0
      ? [...englishVoices, ...allVoices.filter((voice) => !englishVoices.includes(voice))]
      : allVoices;
    if (voices.length === 0) {
      readVoice.innerHTML = "<option value=\"\">Mặc định trình duyệt</option>";
      state.availableVoices = [];
      state.selectedVoiceUri = "";
      updateReadControls();
      return;
    }

    voices.sort((a, b) => {
      if (a.localService !== b.localService) {
        return a.localService ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    state.availableVoices = voices;
    readVoice.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Mặc định trình duyệt";
    readVoice.appendChild(defaultOption);

    voices.forEach((voice) => {
      const option = document.createElement("option");
      option.value = voice.voiceURI;
      option.textContent = `${voice.name} (${voice.lang})`;
      readVoice.appendChild(option);
    });

    const preferred = state.selectedVoiceUri || state.lastReadSession?.voiceUri || "";
    if (preferred && voices.some((voice) => voice.voiceURI === preferred)) {
      readVoice.value = preferred;
      state.selectedVoiceUri = preferred;
    } else {
      readVoice.value = "";
      state.selectedVoiceUri = "";
    }
    updateReadControls();
  }

  function pickCurrentVoice() {
    if (!state.speechSupported || state.availableVoices.length === 0) {
      return null;
    }

    const selectedUri = readVoice.value || state.selectedVoiceUri;
    if (!selectedUri) {
      return null;
    }

    const found = state.availableVoices.find((voice) => voice.voiceURI === selectedUri);
    return found || null;
  }

  function parseVocabulary(rawInput) {
    const roughWords = rawInput
      .split(/[\n,;]+/)
      .map((word) => word.trim())
      .filter(Boolean)
      .map((word) => word.replace(/^["']+|["']+$/g, ""))
      .map((word) => word.replace(/^\d+[.)-]\s*/, "").trim());

    const uniqueWords = [];
    const seen = new Set();

    for (const word of roughWords) {
      const normalizedWord = normalize(word);
      if (!normalizedWord || seen.has(normalizedWord)) {
        continue;
      }
      seen.add(normalizedWord);
      uniqueWords.push(word);
    }

    return uniqueWords;
  }

  function getSelectedTone() {
    const selectedInput = toneInputs.find((input) => input.checked);
    return selectedInput ? selectedInput.value : "adventure";
  }

  function refreshGenreCards() {
    const selectedTone = getSelectedTone();
    const cards = genrePicker.querySelectorAll(".genre-card");
    cards.forEach((card) => {
      const input = card.querySelector('input[name="storyTone"]');
      const isSelected = input && input.value === selectedTone;
      card.classList.toggle("selected", Boolean(isSelected));
    });
  }

  function setSelectedTone(tone) {
    const matched = toneInputs.find((input) => input.value === tone);
    if (!matched) {
      return;
    }
    matched.checked = true;
    refreshGenreCards();
  }

  function buildStory(words, tone, length) {
    const selectedTone = toneConfig[tone] || toneConfig.adventure;
    const targetSentences = Math.max(
      lengthToTargetSentences[length] || lengthToTargetSentences.medium,
      words.length + 7
    );

    const names = shuffle(["Lena", "Noah", "Maya", "Ethan", "Sofia", "Kai", "Ari", "Mila"]);
    const context = {
      hero: names[0],
      friend: names[1],
      helper: pickRandom(["the librarian", "a station engineer", "a retired teacher", "a local guide"]),
      setting: pickRandom(selectedTone.settingOptions),
      goal: pickRandom(selectedTone.goalOptions),
      object: pickRandom(["a worn notebook", "a cracked tablet", "an old compass", "a sealed envelope"]),
    };

    const sentences = [];
    const wordTemplates = shuffle([...wordSentenceTemplates]);
    const midpoint = Math.max(1, Math.floor(words.length / 2));

    sentences.push(fillTemplate(pickRandom(selectedTone.openings), context));
    sentences.push(fillTemplate(pickRandom(selectedTone.details), context));

    words.forEach((word, index) => {
      if (index > 0 && index % 2 === 0) {
        sentences.push(fillTemplate(pickRandom(selectedTone.pressure), context));
      }

      if (index === midpoint) {
        sentences.push(fillTemplate(pickRandom(selectedTone.turningPoints), context));
      }

      const template = wordTemplates[index % wordTemplates.length];
      sentences.push(fillTemplate(template, { ...context, word }));
    });

    const fillerPool = [...selectedTone.details, ...selectedTone.pressure];
    while (sentences.length < targetSentences - 1) {
      sentences.push(fillTemplate(pickRandom(fillerPool), context));
    }

    sentences.push(fillTemplate(pickRandom(selectedTone.closings), context));

    return toParagraphs(sentences, length);
  }

  function renderCoverage(words, story) {
    coverageList.innerHTML = "";
    if (words.length === 0) {
      coverageSummary.textContent = "Chưa tạo truyện.";
      return;
    }

    const missingWords = [];

    words.forEach((word) => {
      const found = hasWord(story, word);
      if (!found) {
        missingWords.push(word);
      }

      const item = coverageItemTemplate.content.firstElementChild.cloneNode(true);
      item.classList.add(found ? "ok" : "missing");
      item.querySelector(".word-label").textContent = word;
      coverageList.appendChild(item);
    });

    if (missingWords.length === 0) {
      coverageSummary.textContent = `OK: đủ ${words.length}/${words.length} từ.`;
    } else {
      coverageSummary.textContent = `Còn thiếu ${missingWords.length} từ: ${missingWords.join(", ")}`;
    }
  }

  function renderShelf() {
    shelfList.innerHTML = "";

    if (state.shelf.length === 0) {
      shelfHint.textContent = "Chưa có truyện nào được lưu.";
      return;
    }

    shelfHint.textContent = `Đã lưu ${state.shelf.length} truyện.`;
    state.shelf.forEach((entry) => {
      const item = shelfItemTemplate.content.firstElementChild.cloneNode(true);
      item.dataset.id = entry.id;
      item.querySelector(".shelf-title").textContent = entry.title;
      item.querySelector(".shelf-meta").textContent = `${formatDate(entry.createdAt)} - ${toneConfig[entry.tone]?.label || entry.tone} - ${entry.words.length} từ`;
      item.querySelector(".shelf-preview").textContent = truncate(entry.story, 180);
      shelfList.appendChild(item);
    });
  }

  function openStoryFromShelf(id) {
    const entry = state.shelf.find((item) => item.id === id);
    if (!entry) {
      return;
    }
    stopReading({ silent: true });

    state.plainStory = entry.story;
    state.words = [...entry.words];
    state.tone = entry.tone;
    state.length = entry.length;

    storyTitle.value = entry.title;
    vocabInput.value = entry.words.join(", ");
    storyLength.value = entry.length || "medium";
    setSelectedTone(entry.tone);

    storyOutput.classList.remove("empty");
    renderStoryOutput(entry.story, entry.words);
    renderCoverage(entry.words, entry.story);
    coverageSummary.textContent = `Đã mở truyện "${entry.title}" từ tủ sách.`;
    clearPracticeState('Đã mở truyện. Bấm "Tạo bài luyện" để tạo câu hỏi.');
    clearMemoryState("Đã mở truyện. Bấm 'Bắt đầu' để nhớ nhanh.");
    clearDictationState("Đã mở truyện. Bấm 'Tạo bộ nghe chép' để tạo câu nghe.");
    resetFlashcardReviewSession();
    updateFlashcardUI();
    clearSentenceModelOutput();
  }

  function downloadStoryFromShelf(id) {
    const entry = state.shelf.find((item) => item.id === id);
    if (!entry) {
      return;
    }
    downloadText(entry.story, `${safeFileName(entry.title)}.txt`);
  }

  function deleteStoryFromShelf(id) {
    state.shelf = state.shelf.filter((item) => item.id !== id);
    persistShelf();
    renderShelf();
  }

  function renderMessage(message) {
    storyOutput.classList.add("empty");
    storyOutput.textContent = message;
    state.readSentenceQueue = [];
    state.currentSentenceIndex = -1;
    state.selectedSentenceIndex = -1;
    clearPracticeState('Tạo truyện xong rồi bấm "Tạo bài luyện" để luyện từ vựng.');
    clearMemoryState("Chưa bắt đầu Memory.");
    clearDictationState("Chưa tạo bộ nghe chép.");
    resetFlashcardReviewSession();
    updateFlashcardUI();
    clearSentenceModelOutput();
    resetRepeatState();
    updateReadControls();
    updateReadProgress({ reset: true });
  }

  function hasWord(story, word) {
    const pattern = buildWordPattern(word);
    return pattern.test(story);
  }

  function buildPracticeQuestions(story, words, mode) {
    const storySentences = splitStoryIntoSentences(story.replace(/\n+/g, " "));
    if (!Array.isArray(storySentences) || storySentences.length === 0) {
      return [];
    }

    const uniqueWords = [...new Set(words.map((word) => word.trim()).filter(Boolean))];
    const fallbackWordPool = [
      ...new Set(
        storySentences
          .flatMap((sentence) => (sentence.match(/[A-Za-z][A-Za-z'-]*/g) || []).map((word) => word.trim()))
          .filter((word) => word.length > 2)
      ),
    ];
    const selectedQuestions = [];

    storySentences.forEach((sentence) => {
      const targetWord = pickPracticeTargetWord(sentence, uniqueWords, fallbackWordPool);
      if (!targetWord) {
        return;
      }

      const prompt = sentence.replace(buildWordPattern(targetWord), "_____");
      if (prompt === sentence) {
        return;
      }

      if (mode === "multiple_choice") {
        const optionPool = [...new Set([...uniqueWords, ...fallbackWordPool])].filter(
          (candidate) => normalize(candidate) !== normalize(targetWord)
        );
        const distractors = shuffle(optionPool).slice(0, 3);
        selectedQuestions.push({
          id: generateId(),
          type: "multiple_choice",
          answer: targetWord,
          prompt,
          options: shuffle([targetWord, ...distractors]),
        });
        return;
      }

      if (mode === "true_false") {
        const canBuildFalsePool = [...new Set([...uniqueWords, ...fallbackWordPool])].filter(
          (candidate) =>
            normalize(candidate) !== normalize(targetWord) && !buildWordPattern(candidate).test(sentence)
        );
        const shouldBuildFalse = Math.random() < 0.5 && canBuildFalsePool.length > 0;
        if (shouldBuildFalse) {
          const replacement = pickRandom(canBuildFalsePool);
          selectedQuestions.push({
            id: generateId(),
            type: "true_false",
            answer: "false",
            prompt: sentence.replace(buildWordPattern(targetWord), replacement),
          });
        } else {
          selectedQuestions.push({
            id: generateId(),
            type: "true_false",
            answer: "true",
            prompt: sentence,
          });
        }
        return;
      }

      selectedQuestions.push({
        id: generateId(),
        type: "fill_blank",
        answer: targetWord,
        prompt,
      });
    });

    return selectedQuestions;
  }

  function pickPracticeTargetWord(sentence, preferredWords, fallbackWords) {
    const fromPreferred = preferredWords.filter((word) => buildWordPattern(word).test(sentence));
    if (fromPreferred.length > 0) {
      return pickRandom(fromPreferred);
    }

    const sentenceTokens = (sentence.match(/[A-Za-z][A-Za-z'-]*/g) || [])
      .map((word) => word.trim())
      .filter((word) => word.length > 2);
    const candidates = sentenceTokens.filter((token) => !COMMON_STOPWORDS.has(normalize(token)));
    if (candidates.length > 0) {
      return pickRandom(candidates);
    }

    if (fallbackWords.length > 0) {
      return pickRandom(fallbackWords);
    }
    return "";
  }

  function buildSentenceModel(sentence) {
    const originalSentence = sentence.replace(/\s+/g, " ").trim();
    const tokens = originalSentence.match(/[A-Za-z][A-Za-z'-]*/g) || [];
    const lowerTokens = tokens.map((token) => normalize(token));
    const { typeLabel, formula } = inferSentenceFormula(originalSentence, lowerTokens);

    const contentWords = [
      ...new Map(
        tokens
          .filter((token) => token.length > 2 && !COMMON_STOPWORDS.has(normalize(token)))
          .map((token) => [normalize(token), token])
      ).values(),
    ];
    const selectedWords = contentWords.slice(0, 3);

    let scaffold = originalSentence;
    const replacementSteps = [];
    selectedWords.forEach((word, index) => {
      const placeholder = `[X${index + 1}]`;
      scaffold = scaffold.replace(buildWordPattern(word), placeholder);
      replacementSteps.push(describeSentenceReplacementStep(word, index));
    });

    if (replacementSteps.length === 0) {
      replacementSteps.push(
        "Câu này khá ngắn, bạn có thể giữ công thức rồi thay nhân vật, hành động hoặc thời gian để tạo câu mới."
      );
    }

    const newSentenceExample = buildSentenceExample(scaffold, selectedWords.length);
    return {
      originalSentence,
      typeLabel,
      formula,
      scaffold,
      replacementSteps,
      newSentenceExample,
    };
  }

  function inferSentenceFormula(sentence, lowerTokens) {
    const first = lowerTokens[0] || "";
    const hasQuestionMark = /\?\s*$/.test(sentence);
    const whWords = new Set(["what", "why", "when", "where", "who", "whom", "whose", "which", "how"]);
    const modals = new Set(["can", "could", "will", "would", "shall", "should", "may", "might", "must"]);
    const beWords = new Set(["am", "is", "are", "was", "were", "be", "been", "being"]);
    const hasModal = lowerTokens.some((word) => modals.has(word));
    const hasContinuous = lowerTokens.some(
      (word, index) => beWords.has(word) && typeof lowerTokens[index + 1] === "string" && lowerTokens[index + 1].endsWith("ing")
    );
    const hasPerfect = lowerTokens.some(
      (word, index) =>
        ["have", "has", "had"].includes(word) &&
        typeof lowerTokens[index + 1] === "string" &&
        (lowerTokens[index + 1].endsWith("ed") || lowerTokens[index + 1].endsWith("en"))
    );

    if (hasQuestionMark && whWords.has(first)) {
      return {
        typeLabel: "Câu hỏi WH",
        formula: "WH-word + Auxiliary + Subject + Verb (+ Object)?",
      };
    }

    if (hasQuestionMark && AUXILIARY_WORDS.has(first)) {
      return {
        typeLabel: "Câu hỏi Yes/No",
        formula: "Auxiliary + Subject + Verb (+ Object)?",
      };
    }

    if (hasModal) {
      return {
        typeLabel: "Câu có động từ khuyết thiếu",
        formula: "Subject + Modal + Verb(base) + Object (+ Adverbial)",
      };
    }

    if (hasContinuous) {
      return {
        typeLabel: "Câu thì tiếp diễn",
        formula: "Subject + be + Verb-ing + Object (+ Adverbial)",
      };
    }

    if (hasPerfect) {
      return {
        typeLabel: "Câu thì hoàn thành",
        formula: "Subject + have/has/had + Verb(PII) + Object (+ Adverbial)",
      };
    }

    const subjectStarters = new Set([
      "i",
      "you",
      "we",
      "they",
      "he",
      "she",
      "it",
      "this",
      "that",
      "these",
      "those",
      "the",
      "a",
      "an",
      "my",
      "our",
      "your",
      "their",
      "his",
      "her",
    ]);
    if (lowerTokens.length > 0 && !AUXILIARY_WORDS.has(first) && !subjectStarters.has(first)) {
      return {
        typeLabel: "Câu mệnh lệnh/đề nghị",
        formula: "Verb(base) + Object (+ Adverbial)",
      };
    }

    return {
      typeLabel: "Câu trần thuật",
      formula: "Subject + Verb + Object (+ Time/Place/Reason)",
    };
  }

  function describeSentenceReplacementStep(word, index) {
    if (index === 0) {
      return `[X1] đang thay cho "${word}": đổi chủ ngữ/nhân vật để đổi góc nhìn câu.`;
    }
    if (index === 1) {
      return `[X2] đang thay cho "${word}": đổi động từ/hành động để tạo ý mới nhưng giữ khung ngữ pháp.`;
    }
    return `[X${index + 1}] đang thay cho "${word}": đổi đối tượng hoặc bối cảnh để mở rộng ngữ cảnh câu.`;
  }

  function buildSentenceExample(scaffold, slotCount) {
    if (!slotCount || slotCount <= 0) {
      return scaffold;
    }

    const subjects = ["The new student", "Our team", "My close friend", "The project leader"];
    const verbs = ["reviewed", "designed", "improved", "organized", "confirmed"];
    const objects = ["a safer plan", "the final report", "a new schedule", "the key evidence"];
    const extras = ["before lunch", "after class", "during the meeting", "at the station"];

    let sentence = scaffold;
    for (let i = 0; i < slotCount; i += 1) {
      const slot = `[X${i + 1}]`;
      const replacement =
        i === 0 ? pickRandom(subjects) : i === 1 ? pickRandom(verbs) : i === 2 ? pickRandom(objects) : pickRandom(extras);
      sentence = sentence.replace(slot, replacement);
    }
    return sentence;
  }

  function renderPracticeItems() {
    practiceList.innerHTML = "";
    if (!Array.isArray(state.practiceItems) || state.practiceItems.length === 0) {
      updatePracticeControls();
      return;
    }

    state.practiceItems.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "practice-item";
      li.dataset.answer = item.answer;
      li.dataset.type = item.type || "fill_blank";

      const prompt = `<p class="practice-prompt"><strong>Câu ${index + 1}:</strong> ${escapeHtml(item.prompt)}</p>`;
      let content = "";

      if (item.type === "multiple_choice") {
        const optionsHtml = (item.options || [])
          .map(
            (option, optionIndex) => `
              <label class="practice-option">
                <input type="radio" name="practice_${item.id}" value="${escapeHtml(option)}" />
                <span>${String.fromCharCode(65 + optionIndex)}. ${escapeHtml(option)}</span>
              </label>
            `
          )
          .join("");
        content = `<div class="practice-options">${optionsHtml}</div>`;
      } else if (item.type === "true_false") {
        content = `
          <div class="practice-options">
            <label class="practice-option">
              <input type="radio" name="practice_${item.id}" value="true" />
              <span>Đúng</span>
            </label>
            <label class="practice-option">
              <input type="radio" name="practice_${item.id}" value="false" />
              <span>Sai</span>
            </label>
          </div>
        `;
      } else {
        content = `<input type="text" autocomplete="off" placeholder="Nhập từ còn thiếu" />`;
      }

      li.innerHTML = `${prompt}${content}<p class="practice-answer"></p>`;
      practiceList.appendChild(li);
    });
    updatePracticeControls();
  }

  function clearPracticeState(message) {
    state.practiceItems = [];
    practiceList.innerHTML = "";
    if (message) {
      practiceSummary.textContent = message;
    }
    updatePracticeControls();
  }

  function updatePracticeControls() {
    const hasStory = Boolean(state.plainStory && state.words.length > 0);
    const hasPractice = Array.isArray(state.practiceItems) && state.practiceItems.length > 0;
    buildPracticeBtn.disabled = !hasStory;
    checkPracticeBtn.disabled = !hasPractice;
    resetPracticeBtn.disabled = !hasPractice;
    practiceType.disabled = !hasStory;
    practiceCount.disabled = !hasStory;
  }

  function buildMemoryItems(story, words) {
    const storySentences = splitStoryIntoSentences(story.replace(/\n+/g, " "));
    const uniqueWords = [...new Set(words.map((word) => word.trim()).filter(Boolean))];
    const items = [];

    uniqueWords.forEach((word) => {
      const sentence = storySentences.find((item) => buildWordPattern(word).test(item));
      if (!sentence) {
        return;
      }
      const maskedSentence = sentence.replace(buildWordPattern(word), "_____");
      if (maskedSentence === sentence) {
        return;
      }
      items.push({
        id: generateId(),
        word,
        sentence,
        maskedSentence,
      });
    });
    return items;
  }

  function getCurrentMemoryItem() {
    if (!state.memoryCurrentId || !Array.isArray(state.memoryItems)) {
      return null;
    }
    return state.memoryItems.find((item) => item.id === state.memoryCurrentId) || null;
  }

  function clearMemoryState(message) {
    state.memoryItems = [];
    state.memoryQueue = [];
    state.memoryCurrentId = "";
    state.memoryReveal = false;
    state.memoryMasteredCount = 0;
    updateMemoryUI();
    if (message) {
      memorySummary.textContent = message;
    }
  }

  function updateMemoryUI() {
    const hasStory = Boolean(state.plainStory && state.words.length > 0);
    const current = getCurrentMemoryItem();
    const total = state.memoryItems.length;
    const remaining = state.memoryQueue.length;

    startMemoryBtn.disabled = !hasStory;
    revealMemoryBtn.disabled = !current;
    memoryKnownBtn.disabled = !current || !state.memoryReveal;
    memoryAgainBtn.disabled = !current || !state.memoryReveal;

    if (!current) {
      memoryCard.classList.add("empty");
      if (total > 0 && remaining === 0) {
        memoryCard.textContent = "Bạn đã hoàn thành vòng Nhớ Nhanh.";
        memoryHint.textContent = `Mastered: ${state.memoryMasteredCount}/${total}. Bấm Bắt đầu để ôn tiếp.`;
      } else {
        memoryCard.textContent = "Bắt đầu Memory để ôn lại từ vựng.";
        memoryHint.textContent = "";
      }
      return;
    }

    memoryCard.classList.remove("empty");
    if (state.memoryReveal) {
      memoryCard.innerHTML = `
        <p><strong>${escapeHtml(current.word)}</strong></p>
        <p>${escapeHtml(current.sentence)}</p>
      `;
      memoryHint.textContent = "Nhấn Nhớ rồi nếu bạn nhớ được, hoặc Chưa nhớ để lặp lại sớm hơn.";
    } else {
      memoryCard.innerHTML = `
        <p><strong>${escapeHtml(current.word)}</strong></p>
        <p>${escapeHtml(current.maskedSentence)}</p>
      `;
      memoryHint.textContent = "Từ đó có nghĩa gì? Đi vào câu này như thế nào? Bấm Hiện gợi ý để kiểm tra.";
    }

    memorySummary.textContent = `Nhớ nhanh: đã nhớ ${state.memoryMasteredCount}/${total}, còn ${remaining} mục.`;
  }

  function tokenizeForCompare(text) {
    return normalize(text)
      .replace(/[^a-z0-9'\s-]/gi, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean);
  }

  function levenshteinDistance(tokensA, tokensB) {
    const rows = tokensA.length + 1;
    const cols = tokensB.length + 1;
    const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let i = 0; i < rows; i += 1) {
      dp[i][0] = i;
    }
    for (let j = 0; j < cols; j += 1) {
      dp[0][j] = j;
    }

    for (let i = 1; i < rows; i += 1) {
      for (let j = 1; j < cols; j += 1) {
        const cost = tokensA[i - 1] === tokensB[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }

    return dp[rows - 1][cols - 1];
  }

  function loadFlashcards() {
    try {
      const raw = localStorage.getItem(FLASHCARD_STORAGE_KEY);
      if (!raw) {
        state.flashcards = [];
        return;
      }
      const parsed = JSON.parse(raw);
      state.flashcards = Array.isArray(parsed) ? parsed : [];
    } catch {
      state.flashcards = [];
    }
  }

  function persistFlashcards() {
    try {
      localStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(state.flashcards));
    } catch {
      // Ignore localStorage write failure.
    }
  }

  function getDueFlashcards() {
    const now = Date.now();
    return state.flashcards
      .filter((card) => {
        const dueAt = Date.parse(card.dueAt || "");
        if (!Number.isFinite(dueAt)) {
          return true;
        }
        return dueAt <= now;
      })
      .sort((a, b) => Date.parse(a.dueAt || 0) - Date.parse(b.dueAt || 0));
  }

  function getNextDueCardDate() {
    if (!Array.isArray(state.flashcards) || state.flashcards.length === 0) {
      return "";
    }
    const sorted = [...state.flashcards].sort(
      (a, b) => Date.parse(a.dueAt || 0) - Date.parse(b.dueAt || 0)
    );
    const first = sorted.find((card) => Number.isFinite(Date.parse(card.dueAt || "")));
    if (!first) {
      return "";
    }
    return formatDate(first.dueAt);
  }

  function getCurrentFlashcard() {
    if (!Array.isArray(state.flashcardQueue) || state.flashcardQueue.length === 0) {
      return null;
    }
    if (!Number.isInteger(state.flashcardCurrentIndex) || state.flashcardCurrentIndex < 0) {
      return null;
    }
    return state.flashcardQueue[state.flashcardCurrentIndex] || null;
  }

  function resetFlashcardReviewSession() {
    state.flashcardQueue = [];
    state.flashcardCurrentIndex = -1;
    state.flashcardReveal = false;
  }

  function updateFlashcardUI() {
    const hasCards = Array.isArray(state.flashcards) && state.flashcards.length > 0;
    const hasStoryWords = Array.isArray(state.words) && state.words.length > 0;
    const current = getCurrentFlashcard();
    const dueCount = getDueFlashcards().length;
    const queueCount = Array.isArray(state.flashcardQueue) ? state.flashcardQueue.length : 0;
    const reviewMode = queueCount > 0 && state.flashcardCurrentIndex >= 0;

    seedFlashcardsBtn.disabled = !hasStoryWords;
    startFlashcardBtn.disabled = !hasCards;
    revealFlashcardBtn.disabled = !reviewMode;
    rateHardBtn.disabled = !reviewMode || !state.flashcardReveal;
    rateGoodBtn.disabled = !reviewMode || !state.flashcardReveal;
    rateEasyBtn.disabled = !reviewMode || !state.flashcardReveal;

    if (!hasCards) {
      flashcardCard.classList.add("empty");
      flashcardCard.textContent = "Từ sẽ xuất hiện ở đây.";
      flashcardMeaning.textContent = "";
      if (!hasStoryWords) {
        flashcardSummary.textContent = "Tạo truyện và bấm Tạo/Cập nhật thẻ để bắt đầu.";
      }
      return;
    }

    if (!reviewMode || !current) {
      flashcardCard.classList.add("empty");
      flashcardCard.textContent = "Bấm 'Bắt đầu ôn' để học thẻ đến hạn.";
      flashcardMeaning.textContent = "";
      const nextDue = getNextDueCardDate();
      flashcardSummary.textContent =
        dueCount > 0
          ? `Có ${dueCount} thẻ đến hạn.`
          : nextDue
            ? `Chưa đến hạn. Lần tiếp theo: ${nextDue}.`
            : "Chưa đến hạn.";
      return;
    }

    flashcardCard.classList.remove("empty");
    flashcardCard.textContent = current.word || "(no word)";
    const currentPosition = state.flashcardCurrentIndex + 1;
    flashcardSummary.textContent = `Đang ôn thẻ ${currentPosition}/${queueCount}. Đến hạn: ${dueCount}.`;
    flashcardMeaning.textContent = state.flashcardReveal
      ? `Nghĩa: ${current.meaning || "(chưa có nghĩa)"}`
      : "Bấm 'Hiện nghĩa' trước khi chấm mức độ.";
  }

  function renderStoryOutput(story, words) {
    const paragraphs = story
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    const readQueue = [];
    let sentenceId = 0;

    const paragraphHtml = paragraphs.map((paragraph) => {
      const sentences = splitStoryIntoSentences(paragraph);
      return sentences
        .map((sentence) => {
          const cleanSentence = sentence.trim();
          if (!cleanSentence) {
            return "";
          }
          const currentId = sentenceId;
          sentenceId += 1;
          readQueue.push(cleanSentence);
          return `<span class="story-sentence" data-sentence-id="${currentId}">${highlightWordsInText(cleanSentence, words)}</span>`;
        })
        .filter(Boolean)
        .join(" ");
    });

    storyOutput.innerHTML = paragraphHtml.join("<br><br>");
    state.readSentenceQueue = readQueue;
    state.currentSentenceIndex = -1;
    state.selectedSentenceIndex = readQueue.length > 0 ? 0 : -1;
    state.hoverSentenceIndex = -1;
    resetRepeatState();
    setActiveSentence(null);
    setSelectedSentence(state.selectedSentenceIndex);
    syncSentenceModelSelectionState();
    updateReadControls();
    updateReadProgress({
      index: state.selectedSentenceIndex,
      total: state.readSentenceQueue.length,
      completed: false,
    });
  }

  function splitStoryIntoSentences(paragraph) {
    const compact = paragraph.replace(/\s+/g, " ").trim();
    if (!compact) {
      return [];
    }

    const matches = compact.match(/[^.!?]+(?:[.!?]+["')\]]*|$)/g);
    if (!matches || matches.length === 0) {
      return [compact];
    }

    return matches.map((sentence) => sentence.trim()).filter(Boolean);
  }

  function highlightWordsInText(text, words) {
    if (words.length === 0) {
      return escapeHtml(text);
    }

    const regions = [];
    const uniqueWords = [...new Set(words)].sort((a, b) => b.length - a.length);

    uniqueWords.forEach((word) => {
      const pattern = buildWordPattern(word);
      let match;
      while ((match = pattern.exec(text)) !== null) {
        regions.push({ start: match.index, end: match.index + match[0].length });
        if (match.index === pattern.lastIndex) {
          pattern.lastIndex += 1;
        }
      }
    });

    regions.sort((a, b) => {
      if (a.start !== b.start) {
        return a.start - b.start;
      }
      return b.end - a.end;
    });

    const merged = [];
    for (const region of regions) {
      const previous = merged[merged.length - 1];
      if (!previous || region.start >= previous.end) {
        merged.push(region);
      }
    }

    if (merged.length === 0) {
      return escapeHtml(text);
    }

    let html = "";
    let cursor = 0;
    merged.forEach((region) => {
      html += escapeHtml(text.slice(cursor, region.start));
      html += `<mark class="story-word">${escapeHtml(text.slice(region.start, region.end))}</mark>`;
      cursor = region.end;
    });
    html += escapeHtml(text.slice(cursor));
    return html;
  }

  function buildWordPattern(word) {
    const escaped = escapeRegExp(word);
    if (/^[a-zA-Z0-9'-]+$/.test(word)) {
      return new RegExp(`\\b${escaped}\\b`, "gi");
    }
    return new RegExp(escaped, "gi");
  }

  function fillTemplate(template, context) {
    return template
      .replaceAll("{hero}", context.hero || "")
      .replaceAll("{friend}", context.friend || "")
      .replaceAll("{helper}", context.helper || "")
      .replaceAll("{setting}", context.setting || "")
      .replaceAll("{goal}", context.goal || "")
      .replaceAll("{object}", context.object || "")
      .replaceAll("{word}", context.word || "");
  }

  function toParagraphs(sentences, length) {
    const chunks = [];
    let index = 0;

    while (index < sentences.length) {
      const chunkSize =
        length === "long" ? (index % 8 === 0 ? 4 : 3) : length === "short" ? 2 : 3;
      const chunk = sentences.slice(index, index + chunkSize).join(" ");
      chunks.push(chunk);
      index += chunkSize;
    }

    return chunks.join("\n\n");
  }

  function suggestTitle(words, tone) {
    const toneLabel = toneConfig[tone]?.label || "Story";
    const first = words[0] ? capitalize(words[0]) : "Vocabulary";
    const second = words[1] ? ` and ${capitalize(words[1])}` : "";
    return `${toneLabel}: ${first}${second}`;
  }

  function downloadText(content, fileName) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function loadShelfFromStorage() {
    try {
      const raw = localStorage.getItem(SHELF_STORAGE_KEY);
      if (!raw) {
        state.shelf = [];
        return;
      }
      const parsed = JSON.parse(raw);
      state.shelf = Array.isArray(parsed) ? parsed : [];
    } catch {
      state.shelf = [];
    }
  }

  function persistShelf() {
    try {
      localStorage.setItem(SHELF_STORAGE_KEY, JSON.stringify(state.shelf));
    } catch {
      // Ignore localStorage write failure.
    }
  }

  function loadTranslateCache() {
    try {
      const raw = localStorage.getItem(TRANSLATE_CACHE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        Object.entries(parsed).forEach(([key, value]) => {
          if (typeof value === "string") {
            state.translateCache.set(key, value);
          }
        });
      }
    } catch {
      // Ignore cache read failure.
    }
  }

  function persistTranslateCache() {
    try {
      const cacheObject = {};
      state.translateCache.forEach((value, key) => {
        cacheObject[key] = value;
      });
      localStorage.setItem(TRANSLATE_CACHE_KEY, JSON.stringify(cacheObject));
    } catch {
      // Ignore cache write failure.
    }
  }

  function formatDate(isoDate) {
    try {
      return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(isoDate));
    } catch {
      return isoDate;
    }
  }

  function truncate(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength - 1)}...`;
  }

  function generateId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `story-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function safeFileName(value) {
    return (
      value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "vocabulary-story"
    );
  }

  function pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function normalize(value) {
    return value.toLowerCase().replace(/\s+/g, " ").trim();
  }

  function capitalize(value) {
    if (!value) {
      return "";
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();







