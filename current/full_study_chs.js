// ════════════════════════════════════════════════════════════════════
//  FULL STUDY (CHS jsPsych) -- ONE of three pilots per child
//
//  Each child is randomly assigned to ONE pilot (Pilot 1, 2, or 3).
//    Pilots 1 and 3: the child sees a chain animation and a single-cause ("causal")
//                    animation.
//    Pilot 2:        the child sees ALL FOUR: chain/distal punished, chain/proximal
//                    punished, single cause/distal punished, single cause/proximal
//                    punished, in random order.
//  Every animation is randomly shown in the standard or the reversed (left/right
//  mirrored) version.
//
//  Sequence:
//     [CHS setup + consent + instructions]                    (unchanged)
//     overview video (Next button when it ends) -> warm-up practice video -> warm-up finish video
//     Pilot 2 only: "Please watch these videos" -> 3 single-character warm-ups
//     For each animation (2 in Pilots 1 and 3, 4 in Pilot 2; random order):
//         "Please watch this video" -> ANIMATION (the last frame stays on screen, same size)
//         Pilot 1: then, for each of the 2 questions: question AUDIO ("Who broke the box?",
//                  "Who caused the box to break?") -> 2 s silent pause (gaze is measured) ->
//                  "Please select an answer" audio -> the two buttons -> tap -> buttons vanish
//         Pilot 2: no questions
//         Pilot 3: the same, with the question "Which character should lose a star?"
//     closing video (overall_study_end.mp4) -> [CHS exit survey / consent page] -> final debrief page
//
//  What each pilot is:
//     Pilot 1: no star at all (brown triangle + blue square).
//     Pilot 2: the star turns RED while it shakes, then there is a still pause (the
//              LOOKING WINDOW), then it punishes. The first ("distal") or the second
//              ("proximal") character is punished, depending on the animation.
//     Pilot 3: same scenes as Pilot 2 (teal triangle + red square) but NO star hovering;
//              both characters keep the stars above their heads.
//
//  The questions are AUDIO ONLY (no question text on the screen). The two answer buttons
//  ("the triangle character" / "the square character") are on random sides for each child,
//  but each child keeps the same sides for the whole study.
//
//  Voice-over: every spoken piece of text is an mp3 whose file name matches the text
//  (for example who_broke_the_box.mp3). If an mp3 is missing, the browser's built-in
//  voice reads the text instead.
//
//  GAZE (iCatcher): the webcam is recorded around every animation (start_recording ->
//  bullseye -> animation [+ the questions, in Pilots 1 and 3] -> stop_recording). Each animation trial saves an `event_log`
//  (exact clock times), and `gaze_windows_ms_from_animation_start` (named time windows),
//  plus which side of the screen each character was on. See "GAZE DATA" notes below.
//
//  Paste this whole file into the "jsPsych Experiment Code" box on
//  childrenhelpingscience.com. BASE (below) must point to the folder where all the
//  GIFs, PNGs, videos and mp3s are uploaded.
// ════════════════════════════════════════════════════════════════════

// ── Inject CSS ──
const _style = document.createElement('style');
_style.textContent = `
    .jspsych-content-wrapper {
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 !important;
    }
    .jspsych-content {
        max-width: 98% !important;
        width: 98% !important;
        margin: 0 auto !important;
    }
    .trial-visual {
        display: block;
        width: 100%;
        max-height:70vh;
        margin: 0 auto;
        object-fit: contain;
    }
    .instructions-box {
        max-width: 680px;
        margin: 30px auto;
        font-size: 1.1em;
        line-height: 1.7;
        text-align: left;
    }
    .instructions-box h2 { margin-bottom: 10px; }
    .instructions-box ul  { padding-left: 1.4em; }
    .continue-btn-group {
        position: fixed !important;
        bottom: 24px !important;
        right: 28px !important;
        margin: 0 !important;
        justify-content: flex-end !important;
        z-index: 9999 !important;
    }
    .continue-btn-group .jspsych-btn {
        font-size: 1.3em !important;
        padding: 14px 44px !important;
    }
`;
document.head.appendChild(_style);

// ════════════════════════════════════════════════════════════════════
//  CONFIG
// ════════════════════════════════════════════════════════════════════

const BASE = 'https://raw.githubusercontent.com/SunnyZ-cs/non_verbal_adults/main/non_verbal_full_study_updated/materials/';

// ════════════════════════════════════════════════════════════════════
//  SETTINGS YOU MAY WANT TO CHANGE
// ════════════════════════════════════════════════════════════════════
// For testing: 1, 2, or 3 forces that pilot. null = random (what real children get).
// (A web address ending in ?pilot=2 also forces a pilot, handy for the local test page.)
const FORCE_PILOT = null;
// Pilots 1 and 3: true = the chain and causal animations are shown in random order; false = chain first.
// (Pilot 2 always shows all four versions in random order.)
const RANDOMIZE_CHAIN_CAUSAL_ORDER = true;
// Pilot 2 only: play the 3 single-character "star punishes one character" warm-ups first.
const PILOT2_PUNISHMENT_WARMUPS = true;

// ── Timing (ms); these must match the animation files ──
const pilot1_event_duration = 5040;   // Pilot 1 animation length; its last frame then stays on screen
const pilot3_event_duration = 5360;   // Pilot 3: same length as Pilot 2's part 1; last frame stays on screen
// Pilots 1 and 3, for each question after the animation: question audio -> QUESTION_PAUSE_MS of
// silence (THE GAZE WINDOW) -> "Please select an answer" -> the two buttons.
const QUESTION_PAUSE_MS = 2000;
const part1_duration  = 5360;         // Pilot 2: event, star turns red + shakes + sound
const test_sound_offset_ms = 4840;
const antic_duration  = 3000;         // Pilot 2: still red star = the LOOKING WINDOW
const part2_duration  = 2920;         // Pilot 2: star goes to its target and takes the star
const freeze_duration = 8000;         // Pilot 2: outcome

// Moments inside the animations (ms from the start of the animation file), measured
// from the frames. Same for both directions.
const LANDMARKS_MS = {
    chains:       { motion_starts: 2720, first_hits_second: 3000, second_starts_moving: 3040,
                    second_reaches_block: 3320, block_breaks: 3360 },
    single_cause: { motion_starts: 3040, first_hits_second: null, second_starts_moving: 3040,
                    second_reaches_block: 3320, block_breaks: 3360 }   // first character stays still
};
// ── Non-directional sound cue (plays at shake onset, both warmup + test) ──
// (6) AUDIO COLD-START FIX (per David: "in the first warmup, the shaking
//     starts before the sound; in the 2nd/3rd they're in sync"): the OLD
//     playCue() created a brand-new `Audio` object from scratch on every
//     call. A browser's very first real audio decode/playback in a page
//     session carries extra one-time latency (codec/output-pipeline init)
//     regardless of how early the file itself was fetched -- so the FIRST
//     ever cue (always warmup trial 1, since it's the first sound played
//     all session) lagged visibly behind the shake, while the 2nd/3rd cues
//     (pipeline already warm) fired instantly and looked in sync. Fix: use
//     ONE persistent, preloaded Audio element for every cue for the rest of
//     the session (cheaper and more consistent than re-instantiating), and
//     "prime" it with a real muted play+pause on the study's first genuine
//     user gesture (the Start button below) -- that happens minutes before
//     warmup 1, giving the decode pipeline plenty of time to fully warm up.
const SOUND_URL = BASE + 'punish_cue.mp3';
const cueAudio = new Audio(SOUND_URL);
cueAudio.preload = 'auto';
cueAudio.load();
let cueAudioPrimed = false;
function primeCueAudio() {
    if (cueAudioPrimed) return;
    cueAudioPrimed = true;
    const prevVolume = cueAudio.volume;
    cueAudio.volume = 0;
    cueAudio.play().then(() => {
        cueAudio.pause();
        cueAudio.currentTime = 0;
        cueAudio.volume = prevVolume;
    }).catch(() => {
        // If priming itself fails (e.g. gesture not recognized), just
        // restore volume -- playCue() will still try to play for real later.
        cueAudio.volume = prevVolume;
    });
}
function playCue() {
    try {
        cueAudio.currentTime = 0;
        cueAudio.volume = 1.0;
        cueAudio.play().catch(err => console.warn('Sound cue playback failed:', err));
    } catch (err) {
        console.warn('Sound cue error:', err);
    }
}

// ── Load-timing helpers ──────────────────────────────────────────────
// One cache-busting value for the WHOLE session (not one per trial). This
// still forces a fresh fetch from GitHub once per session (avoiding a
// stale CDN-cached older build), but critically it means a URL we preload
// ahead of time and the URL actually used at playback time are byte-for-
// byte identical, so the browser can serve the already-downloaded copy
// from cache instantly instead of re-fetching from the network.
const session_cb = Date.now();
function withCb(url) { return url + '?cb=' + session_cb; }

// Fire-and-forget background download into the browser's HTTP cache. Uses
// fetch() (not `new Image()`) so nothing gets decoded/rendered/animated in
// the background -- it only warms the cache so the real, visible <img>
// element can load near-instantly when its trial actually starts.
function preloadUrl(url) {
    fetch(url).catch(err => console.warn('Preload failed:', url, err));
}

// Run `fn` once `imgEl` has actually finished loading (i.e. the browser is
// really about to start animating it), or immediately if it's already
// loaded (e.g. served from a warm cache) -- this is what the sound-cue and
// phase-swap timers are anchored to, INSTEAD OF the moment the trial's DOM
// was inserted. Without this, a slow/cold image fetch could delay the
// visible start of a GIF's animation while the timers (previously started
// at DOM-insertion time) kept counting down regardless, making the sound
// cue and phase swaps land early relative to what the viewer actually sees
// -- exactly the "sound arrives before the wiggle" / "wiggle looks cut
// off" symptom this fixes.
function onImageReady(imgEl, fn) {
    if (imgEl && imgEl.complete && imgEl.naturalWidth !== 0) {
        fn();
    } else if (imgEl) {
        imgEl.addEventListener('load', fn, { once: true });
        imgEl.addEventListener('error', fn, { once: true }); // don't hang forever if it fails
    } else {
        fn();
    }
}

const warmup_positions = ['left', 'center', 'right'];
// Fisher-Yates shuffle; the resulting order is RECORDED in the data
for (let i = warmup_positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [warmup_positions[i], warmup_positions[j]] = [warmup_positions[j], warmup_positions[i]];
}
const warmup_durations = {
    left: 17120,
    center: 17120,
    right: 16680
};
// Offset (ms) into each warmup GIF at which the star's brief angry shake
// begins -- this is when the non-directional sound cue fires.
const warmup_sound_offset_ms = {
    left: 7600,
    center: 7600,
    right: 7160
};
const warmup_gap = 1000;

// warm-up GIF url (red-star version)
function warmupUrl(position) { return withCb(BASE + `warmup_punish_${position}_pilot2.gif`); }

const jsPsych = initJsPsych();

// ════════════════════════════════════════════════════════════════════
//  TEXT-TO-SPEECH + POP-UP TEXT + SHARED STYLES
// ════════════════════════════════════════════════════════════════════
const _style2 = document.createElement('style');
_style2.textContent = `
    .stim-msg { min-height: 90px; display: flex; align-items: center; justify-content: center;
                font-family: Arial, sans-serif; font-weight: 700; font-size: clamp(28px, 5vw, 46px);
                color: #212529; opacity: 0; transform: scale(0.3); text-align: center; }
    .stim-msg.pop { animation: stimPop 0.5s ease-out forwards; }
    .stim-msg.try { color: #c92a2a; }
    .stim-msg.great { color: #2b8a3e; }
    @keyframes stimPop { 0% { opacity: 0; transform: scale(0.3); } 70% { opacity: 1; transform: scale(1.12); } 100% { opacity: 1; transform: scale(1); } }
    .dstr-wrap { width: 100%; max-width: 900px; margin: 0 auto; text-align: center; user-select: none; -webkit-user-select: none; }
    .dstr-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: min(2vh, 14px); margin-top: 8px; }
    .dstr-animal { display: flex; align-items: center; justify-content: center; height: min(17vh, 120px);
                   cursor: pointer; transition: opacity 0.35s ease, transform 0.35s ease; }
    .dstr-animal img { max-width: 100%; max-height: 100%; pointer-events: none; }
    .dstr-emoji { font-size: min(13vh, 90px); line-height: 1; pointer-events: none; }
    .dstr-animal.gone { opacity: 0; transform: scale(0.2); pointer-events: none; }
    .q-wrap { width: 100%; max-width: 900px; margin: 0 auto; text-align: center; user-select: none; -webkit-user-select: none; }
    .q-options { display: flex; justify-content: center; gap: 60px; margin-top: 16px; opacity: 0; pointer-events: none; transition: opacity 0.4s; }
    .q-options.show { opacity: 1; pointer-events: auto; }
    .q-btn { background: #fff; border: 4px solid #ced4da; border-radius: 18px; padding: 14px 26px; cursor: pointer;
             display: flex; flex-direction: column; align-items: center; gap: 8px;
             font-family: Arial, sans-serif; font-weight: 600; font-size: 22px; color: #212529; }
    .q-btn:active { border-color: #4dabf7; }
`;
document.head.appendChild(_style2);

// ── Font: Klop (friendly rounded) for ALL words, and rounded-rectangle buttons ──
// Klop is a paid font, so it is not included. If you own a WEB license, upload
// Klop.woff2 (and/or Klop.woff / Klop.ttf) to the same folder as the animations and
// it is used automatically. Until then a free rounded font (Fredoka, then Nunito) is
// used so the study still looks friendly.
const _fontLink = document.createElement('link');
_fontLink.rel = 'stylesheet';
_fontLink.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap';
document.head.appendChild(_fontLink);
const _style3 = document.createElement('style');
_style3.textContent = `
    @font-face {
        font-family: 'Klop';
        src: url('${BASE}Klop.woff2') format('woff2'),
             url('${BASE}Klop.woff') format('woff'),
             url('${BASE}Klop.ttf') format('truetype');
        font-display: swap;
    }
    :root { --study-font: 'Klop', 'Fredoka', 'Nunito', 'Arial Rounded MT Bold', 'Varela Round', Arial, sans-serif; }
    body, .jspsych-display-element, .jspsych-display-element *,
    .jspsych-content, .jspsych-content *, button, .jspsych-btn, .q-btn {
        font-family: var(--study-font) !important;
    }
    /* every button: a rectangle with rounded corners */
    button, .jspsych-btn, .q-btn { border-radius: 14px !important; }
    #q-select { min-height: 50px; font-size: clamp(20px, 3.5vw, 32px); color: #495057; }
`;
document.head.appendChild(_style3);

// Read text aloud with the browser's built-in voice, then call done().
// (done is also called after a safety timeout, so the study never gets stuck.)
function speakText(text, done) {
    let finished = false;
    const finish = function() {
        if (finished) return;
        finished = true;
        clearTimeout(safety);
        if (done) done();
    };
    const safety = setTimeout(finish, Math.max(2500, text.length * 130));
    try {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.rate = 0.9;
            u.lang = 'en-US';
            u.onend = finish;
            u.onerror = finish;
            window.speechSynthesis.speak(u);
        } else {
            finish();
        }
    } catch (e) {
        finish();
    }
}
// Browsers only allow sound after a click, so "wake up" speech on the Start button.
function primeSpeech() {
    try {
        if ('speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(' ');
            u.volume = 0;
            window.speechSynthesis.speak(u);
        }
    } catch (e) {}
}
// Make a text element pop up (restarts the animation each time).
function popText(el, text, cls) {
    el.textContent = text;
    el.classList.remove('pop', 'try', 'great');
    void el.offsetWidth;
    el.classList.add('pop');
    if (cls) el.classList.add(cls);
}
function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ════════════════════════════════════════════════════════════════════
//  VOICE-OVER (mp3 files; the browser's voice is only a back-up)
// ════════════════════════════════════════════════════════════════════
const VOICE = {
    watch_this_video:   { file: 'please_watch_this_video.mp3',          text: 'Please watch this video' },
    watch_these_videos: { file: 'please_watch_these_videos.mp3',        text: 'Please watch these videos' },
    select_answer:      { file: 'please_select_an_answer.mp3',          text: 'Please select an answer' },
    triangle:           { file: 'the_triangle_character.mp3',           text: 'the triangle character' },
    square:             { file: 'the_square_character.mp3',             text: 'the square character' },
    who_broke:          { file: 'who_broke_the_box.mp3',                text: 'Who broke the box?' },
    who_caused:         { file: 'who_caused_the_box_to_break.mp3',      text: 'Who caused the box to break?' },
    // No mp3 was provided for this one yet. Upload which_character_should_lose_a_star.mp3
    // to the same folder and it is used automatically; until then the browser voice reads it.
    lose_star:          { file: 'which_character_should_lose_a_star.mp3', text: 'Which character should lose a star?' }
};
Object.keys(VOICE).forEach(function(k) { preloadUrl(BASE + VOICE[k].file); });

// ONE shared audio element for every voice-over. (Phones/iPads only allow sound from an
// element that was started by a tap once; reusing one element means the first tap on
// the Start button unlocks it for the whole study.)
const voiceEl = new Audio();
const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
function primeVoice() {
    try {
        voiceEl.src = SILENT_WAV;
        const p = voiceEl.play();
        if (p && p.catch) p.catch(function() {});
    } catch (e) {}
}
// Every stopVoice() cancels ALL voice-over that is playing or still queued: playVoice() calls
// that were already running see that the "token" changed and quietly do nothing more
// (no leftover timer can start the next clip later).
let voiceToken = 0;
function stopVoice() {
    voiceToken++;
    try { voiceEl.pause(); } catch (e) {}
    voiceEl.onended = null;
    voiceEl.onerror = null;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
}
// Play one voice-over mp3, then call done(). Falls back to the browser's voice if the
// file is missing; never leaves the study stuck (done is also called after a time-out).
// If stopVoice() is called meanwhile (for example the child taps an answer), done is NOT called.
function playVoice(item, done) {
    stopVoice();                      // also cancels any earlier clip still pending
    const myToken = voiceToken;
    let finished = false, fell_back = false;
    const finish = function() {
        if (finished) return;
        finished = true;
        clearTimeout(safety);
        if (myToken !== voiceToken) return;       // cancelled: do nothing
        voiceEl.onended = null;
        voiceEl.onerror = null;
        if (done) done();
    };
    const safety = setTimeout(finish, 12000);
    const useSpeech = function() {
        if (fell_back || finished || myToken !== voiceToken) return;
        fell_back = true;
        voiceEl.onended = null;
        voiceEl.onerror = null;
        speakText(item.text, finish);
    };
    try {
        voiceEl.onended = finish;
        voiceEl.onerror = useSpeech;
        voiceEl.src = BASE + item.file;
        const p = voiceEl.play();
        if (p && p.catch) p.catch(useSpeech);
    } catch (e) {
        useSpeech();
    }
}
function playVoiceSequence(items, done) {
    if (!items.length) { if (done) done(); return; }
    playVoice(items[0], function() { playVoiceSequence(items.slice(1), done); });
}

// ════════════════════════════════════════════════════════════════════
//  RANDOMIZATION: which pilot, which scenes, which direction, which target
// ════════════════════════════════════════════════════════════════════
const _forced = FORCE_PILOT;   // null in the real study (random pilot)
const study_pilot = [1, 2, 3].includes(_forced) ? _forced : [1, 2, 3][Math.floor(Math.random() * 3)];

function randomDirection() { return Math.random() < 0.5 ? 'forward' : 'backward'; }   // standard vs reversed

// Which side each answer button is on (Pilots 1 and 3): random BETWEEN children, but the SAME
// for a child during the whole study. Listed left to right.
const answer_button_order = Math.random() < 0.5 ? ['triangle', 'square'] : ['square', 'triangle'];

// The list of animations this child will see. Each one is randomly the standard or the
// reversed (left/right mirrored) version.
const animation_plan = [];
function addAnimation(ctx, target) {
    const dir = randomDirection();
    animation_plan.push({
        pilot: study_pilot, context: ctx, direction: dir, target: target,
        // Standard version: first character on the LEFT. Reversed version: on the RIGHT.
        first_character_side:  dir === 'forward' ? 'left'  : 'right',
        second_character_side: dir === 'forward' ? 'right' : 'left'
    });
}
if (study_pilot === 2) {
    // Pilot 2: ALL FOUR versions, in random order:
    //   chain + distal punished, chain + proximal punished,
    //   single cause + distal punished, single cause + proximal punished
    const combos = [];
    ['chains', 'single_cause'].forEach(function(ctx) {
        ['distal', 'proximal'].forEach(function(target) { combos.push({ ctx: ctx, target: target }); });
    });
    shuffleArray(combos).forEach(function(c) { addAnimation(c.ctx, c.target); });
} else {
    // Pilots 1 and 3: the chain and the causal (single cause) animation.
    let _contexts = ['chains', 'single_cause'];
    if (RANDOMIZE_CHAIN_CAUSAL_ORDER) _contexts = shuffleArray(_contexts);
    _contexts.forEach(function(ctx) { addAnimation(ctx, null); });
}
animation_plan.forEach(function(a, i) { a.animation_index = i + 1; });

// File names for one animation
function animationFiles(a) {
    const rv = a.direction === 'forward' ? '' : 'reverse_';
    if (a.pilot === 1) return { event: BASE + `${a.context}_${rv}scene_pilot1_event.gif` };   // last frame is held
    if (a.pilot === 3) return { event: BASE + `${a.context}_${rv}distal_pilot3_event.gif` };  // (uses the "distal" characters)
    return { full: BASE + `${a.context}_${rv}${a.target}_pilot2_full.gif` };   // one continuous file
}
animation_plan.forEach(function(a) { a.files = animationFiles(a); });

// Start downloading the first animation right away.
preloadUrl(withCb(animation_plan[0].files.event || animation_plan[0].files.full));
const video_config = {
    type: chsRecord.VideoConfigPlugin
};

const video_consent = {
    type: chsRecord.VideoConsentPlugin,
    PIName:      'Shaun Nichols',
    institution: 'Cornell University (the Explanation Lab)',
    // This text directly follows the words "please contact" in the consent form.
    PIContact:   'the Explanation Lab at cornell.explanation.lab@gmail.com',
    purpose:     'We are studying how children understand cause and responsibility when one character’s action leads to an outcome. Sometimes one character directly causes something to happen. Other times, one character starts a chain of events that leads another character to produce the final outcome. We want to know whether children think differently about these two kinds of causes. We will compare the answers children give with where they look while watching the scenes.',
    procedures:  'This study is for children ages 2½ to 4½ and takes about 10 minutes. Your child will watch short animated scenes with colorful characters. In some scenes, one character causes another character to break a box. In other scenes, one character directly causes the box to break. Some scenes also include a star character that may take a star away from one of the characters. Sometimes your child will just watch while we record where they look. Other times, your child will answer a simple question by selecting one of the characters on the screen. The questions may ask who broke the box, who caused the box to break, or which character should lose a star. All instructions and questions are read aloud, so your child does not need to be able to read. We will use your webcam to record your child during the study so that we can measure where they look.',
    risk_statement: 'There are no expected risks if you participate in this study.',
    payment:     'You will receive a $5 Amazon gift card (for Amazon.com) for participating in this study. To be eligible, your child must be in the age range for this study (2½ to 4½ years old), your child must be visible in the study video, and you must submit a valid consent statement. Each child can take part in this study and receive a gift card only once. Gift cards will be sent within one week. We can only offer Amazon gift cards to US residents, but we invite everyone to participate. Thank you for your understanding.',
    research_rights_statement: 'You are not waiving any legal claims, rights, or remedies because of your participation in this research study. If you feel you have been treated unfairly, or you have questions about your rights as a research subject, you may contact the Cornell University Institutional Review Board for Human Participants (IRB), East Hill Office Building, Suite 320, 395 Pine Tree Road, Ithaca, NY 14850, at irbhp@cornell.edu or 607-255-5138.',
    // The paragraph about sharing videos on Databrary is OFF. Change to true ONLY if your
    // approved protocol says recordings may be shared there.
    include_databrary: false
};

const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div class="instructions-box">
            <h2>Overview</h2>
            <ul>
                <li>The study takes about 10 minutes.</li>
                <li>Your child will watch short animated clips and may answer a question about them.</li>
                <li>Please make sure the sound is on.</li>
                <li><strong>IMPORTANT:</strong> Please position your child's head so that they face the center of the screen directly.</li>
            </ul>
            <p><strong>For parents:</strong> Please help keep your child's attention on the screen.</p>
        </div>`,
    choices: ['Start ▶'],
    on_load: function() {
        // First real user gesture in the study -- use it to prime the sound
        // cue's audio pipeline (see cueAudio/primeCueAudio above) well ahead
        // of warmup trial 1, the first trial that actually needs to play it.
        const group = document.getElementById('jspsych-html-button-response-btngroup');
        const btn = group && group.querySelector('button');
        if (btn) btn.addEventListener('click', function() { primeCueAudio(); primeSpeech(); primeVoice(); }, { once: true });
    },
    data: { trial_type: 'instructions' }
};

// The clock time (epoch ms) when each webcam recording starts is saved with the data,
// so video frames can be lined up with the events logged in each animation trial.
const start_recording = {
    type: chsRecord.StartRecordPlugin,
    on_finish: function(data) { data.recording_started_epoch_ms = Date.now(); }
};
const stop_recording  = { type: chsRecord.StopRecordPlugin  };

// Helper function to build video trials that auto-advance
function buildVideoTrial(filename, trial_name) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<video id="${trial_name}-vid" class="trial-visual" autoplay><source src="${BASE}${filename}" type="video/mp4"></video>`,
        choices: "NO_KEYS",
        on_load: function() {
            const vid = document.getElementById(`${trial_name}-vid`);
            if (vid) {
                vid.onended = function() { jsPsych.finishTrial(); };
                vid.onerror = function() { jsPsych.finishTrial(); };
            } else {
                setTimeout(jsPsych.finishTrial, 5000);
            }
        },
        data: { trial_type: trial_name }
    };
}

// Helper function to build video trials that require a 'Next' button click
function buildVideoTrialWithNext(filename, trial_name) {
    return {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<video id="${trial_name}-vid" class="trial-visual" src="${BASE}${filename}" autoplay playsinline></video>`,
        choices: ['Next'],
        on_load: function() {
            const group = document.getElementById('jspsych-html-button-response-btngroup');
            if (group) group.classList.add('continue-btn-group');
            const btn = group && group.querySelector('button');
            if (btn) {
                btn.disabled = true;
                const vid = document.getElementById(`${trial_name}-vid`);
                if (vid) {
                    vid.addEventListener('ended', () => { btn.disabled = false; });
                    vid.addEventListener('error', () => { btn.disabled = false; });
                }
            }
        },
        data: { trial_type: trial_name }
    };
}

const warmup_practice = buildVideoTrial('warmup_practice.mp4', 'warmup_practice');
const warmup_finish = buildVideoTrialWithNext('warmup_finish.mp4', 'warmup_finish');
// Overview video (a Next button appears when it ends) and closing video (moves on by itself when it ends)
const intro_video = buildVideoTrialWithNext('overall_study_intro.mp4', 'overall_study_intro');
const outro_video = buildVideoTrial('overall_study_end.mp4', 'overall_study_end');

// ── Warmup punishment trial (single character, one of 3 positions) ──
// The GIF plays once (loop=1 encoded in the file) then holds its last frame.
function buildWarmupPunishTrial(position, index) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            return `<img id="warmup-visual-${index}" src="${warmupUrl(position)}" class="trial-visual">`;
        },
        choices: "NO_KEYS",
        trial_duration: warmup_durations[position],
        post_trial_gap: 0,
        on_load: function() {
            const el = document.getElementById(`warmup-visual-${index}`);
            // Anchor the sound-cue timer to when the GIF is ACTUALLY ready
            // to animate (usually instant, since it was preloaded well in
            // advance), not to when this trial's DOM was inserted.
            onImageReady(el, function() {
                setTimeout(playCue, warmup_sound_offset_ms[position]);
            });
        },
        data: { trial_type: 'warmup_punish', warmup_position: position, warmup_index: index }
    };
}

// ── Bullseye (attention refixation, 3 s) ──
function bullseyeTrial(tag) {
    let t0 = null;
    return {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <div style="display:flex; justify-content:center; align-items:center; height:70vh;">
            <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <style>
                @keyframes pulse-svg {
                  0% { transform: scale(0.8); opacity: 0.8; }
                  50% { transform: scale(1.1); opacity: 1; }
                  100% { transform: scale(0.8); opacity: 0.8; }
                }
                .bullseye-group {
                  animation: pulse-svg 1s infinite ease-in-out;
                  transform-origin: center;
                }
              </style>
              <g class="bullseye-group">
                <circle cx="100" cy="100" r="90" fill="#000000"/>
                <circle cx="100" cy="100" r="70" fill="#ffffff"/>
                <circle cx="100" cy="100" r="50" fill="#000000"/>
                <circle cx="100" cy="100" r="30" fill="#ffffff"/>
                <circle cx="100" cy="100" r="10" fill="#000000"/>
              </g>
            </svg>
        </div>`,
        choices: "NO_KEYS",
        trial_duration: 3000,
        on_load: function() { t0 = Date.now(); },
        on_finish: function(data) { data.bullseye_start_epoch_ms = t0; data.bullseye_end_epoch_ms = Date.now(); },
        data: { trial_type: tag + '_bullseye', gaze_use: 'calibration_looking_at_center' }
    };
}


// ════════════════════════════════════════════════════════════════════
//  GAZE DATA (iCatcher): what is recorded, and the windows to analyze
//  -----------------------------------------------------------------
//  For every animation the timeline is:
//     label screen (NOT recorded) -> start_recording -> bullseye (3 s, look at the centre:
//     use for calibration) -> ANIMATION -> [Pilots 1 and 3: the questions, same recording]
//     -> stop_recording
//  Each animation trial saves:
//     event_log                            exact clock times (epoch ms) of animation start,
//                                          sound, window starts/ends
//     gaze_windows_ms_from_animation_start named windows: [start_ms, end_ms] from animation start
//     first_/second_character_side         which side of the screen each character is on
//     direction, context, pilot, target    which version this was
//  Pilots 1 and 3 also save `questions` (one entry per question) with exact clock times:
//     question_audio_start / question_audio_end, pause_start / pause_end  <-- the 2 s GAZE
//     WINDOW (silence, nothing on the buttons), select_prompt_start, buttons_shown, click,
//     the choice, which side it was on, and the left-to-right button order.
//  start_recording also saves recording_started_epoch_ms; the bullseye saves its own
//  start/end times. In Pilot 2 the key window is ANTICIPATORY_LOOKING_WINDOW (the still red
//  star, before it punishes).
// ════════════════════════════════════════════════════════════════════
function gazeWindows(pilot, context) {
    const L = LANDMARKS_MS[context];
    const w = { pre_event_scene: [0, L.motion_starts], causal_event: [L.motion_starts, L.block_breaks] };
    if (pilot === 2) {
        const t1 = part1_duration, t2 = t1 + antic_duration, t3 = t2 + part2_duration;
        w.after_break = [L.block_breaks, test_sound_offset_ms];
        w.star_turns_red_and_shakes = [test_sound_offset_ms, t1];
        w.ANTICIPATORY_LOOKING_WINDOW = [t1, t2];
        w.punishment = [t2, t3];
        w.outcome = [t3, t3 + freeze_duration];
    } else {
        // Pilots 1 and 3: the question phase starts when the animation ends (question_phase_starts_ms);
        // its exact timing depends on the audio, so it is saved per question in `questions`.
        const ev = pilot === 1 ? pilot1_event_duration : pilot3_event_duration;
        w.after_break = [L.block_breaks, ev];
    }
    return w;
}
function animationData(a, trial_type, total_ms) {
    return {
        trial_type: trial_type,
        pilot: a.pilot, context: a.context, direction: a.direction, target_punished: a.target,
        animation_index: a.animation_index,
        first_character_side: a.first_character_side, second_character_side: a.second_character_side,
        punished_character_side: a.target === 'distal' ? a.first_character_side
                               : a.target === 'proximal' ? a.second_character_side : null,
        landmarks_ms_from_animation_start: LANDMARKS_MS[a.context],
        gaze_windows_ms_from_animation_start: gazeWindows(a.pilot, a.context),
        animation_trial_ms: total_ms,
        question_phase_starts_ms_from_animation_start: a.pilot === 2 ? null : (a.pilot === 1 ? pilot1_event_duration : pilot3_event_duration),
        question_pause_ms: a.pilot === 2 ? null : QUESTION_PAUSE_MS
    };
}

// ════════════════════════════════════════════════════════════════════
//  ANIMATION TRIALS
// ════════════════════════════════════════════════════════════════════
// ── Pilots 1 and 3: bullseye -> animation -> questions, all in ONE trial ──
// The animation stays on screen at the SAME size the whole time (its last frame is held), so
// nothing shrinks, reloads, or flickers when the questions start. For each question:
//     question AUDIO (no text) -> 2 s silent pause (THE GAZE WINDOW) -> "Please select an answer"
//     audio -> the two buttons appear (names are read) -> the child taps -> the buttons
//     disappear -> the next question's audio plays.
const _style4 = document.createElement('style');
_style4.textContent = `
    /* answer buttons float over the bottom of the screen, so the animation never moves or resizes */
    .qa-options { position: fixed; left: 0; right: 0; bottom: 12px; display: flex; justify-content: center; gap: 40px;
                  opacity: 0; pointer-events: none; transition: opacity 0.25s; z-index: 50; }
    .qa-options.show { opacity: 1; pointer-events: auto; }
    .qa-options .q-btn { padding: 8px 22px; font-size: 18px; background: #fff; }
    .qa-options .q-btn svg { width: 60px; height: 60px; }
`;
document.head.appendChild(_style4);

const QUESTIONS = {
    1: [ { tag: 'q1_who_broke',  voice: VOICE.who_broke  },
         { tag: 'q2_who_caused', voice: VOICE.who_caused } ],
    3: [ { tag: 'q_lose_star',   voice: VOICE.lose_star  } ]
};

function buildAnimationWithQuestions(a, tag, event_ms, nextUrl) {
    const ev = {};
    const f = a.files;
    const questions = QUESTIONS[a.pilot];
    const options = a.pilot === 1 ? P1_OPTIONS : P3_OPTIONS;
    const by_key = {};
    options.forEach(function(o) { by_key[o.key] = o; });
    const ordered = answer_button_order.map(function(k) { return by_key[k]; });   // left to right; same all study
    return [
        start_recording,
        bullseyeTrial(tag),
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
                const btns = ordered.map((o, i) =>
                    `<div class="q-btn" data-key="${o.key}" data-pos="${i + 1}">${o.svg}<span>${o.label}</span></div>`).join('');
                return `<img id="${tag}-visual" src="${withCb(f.event)}" class="trial-visual">
                        <div class="qa-options" id="${tag}-options">${btns}</div>`;
            },
            choices: "NO_KEYS",
            on_load: function() {
                ev.trial_load_epoch_ms = Date.now();
                if (nextUrl) preloadUrl(nextUrl);
                const el = document.getElementById(tag + '-visual');
                const box = document.getElementById(tag + '-options');
                const results = [];
                let current = null;       // the question being asked right now
                let accepting = false;    // taps only count while the buttons are visible

                box.querySelectorAll('.q-btn').forEach(function(btn) {
                    btn.addEventListener('click', function() {
                        if (!accepting || !current) return;
                        accepting = false;
                        stopVoice();                       // also cancels any button names still being read
                        box.classList.remove('show');      // the buttons disappear
                        current.click_epoch_ms = Date.now();
                        current.choice = btn.dataset.key;
                        current.choice_position = Number(btn.dataset.pos);       // 1 = left button, 2 = right button
                        current.rt = Math.round(performance.now() - current.shown_perf);
                        delete current.shown_perf;
                        results.push(current);
                        current = null;
                        setTimeout(function() { askQuestion(results.length); }, 400);   // then the next question's audio
                    });
                });

                function askQuestion(i) {
                    if (i >= questions.length) { finishAll(); return; }
                    const q = questions[i];
                    const rec = { question_number: i + 1, question_tag: q.tag, question: q.voice.text,
                                  button_order_left_to_right: ordered.map(function(o) { return o.key; }) };
                    rec.question_audio_start_epoch_ms = Date.now();
                    playVoice(q.voice, function() {
                        rec.question_audio_end_epoch_ms = Date.now();
                        rec.pause_start_epoch_ms = Date.now();               // ── 2 s of silence: GAZE IS MEASURED ──
                        setTimeout(function() {
                            rec.pause_end_epoch_ms = Date.now();
                            rec.select_prompt_start_epoch_ms = Date.now();
                            playVoice(VOICE.select_answer, function() {
                                rec.buttons_shown_epoch_ms = Date.now();
                                rec.shown_perf = performance.now();
                                current = rec;
                                accepting = true;
                                box.classList.add('show');                   // the two buttons appear
                                playVoiceSequence(ordered.map(function(o) { return o.voice; }), null);
                            });
                        }, QUESTION_PAUSE_MS);
                    });
                }

                function finishAll() {
                    stopVoice();
                    const flat = {};
                    results.forEach(function(r, k) {
                        flat[`q${k + 1}_choice`] = r.choice;
                        flat[`q${k + 1}_choice_position`] = r.choice_position;
                        flat[`q${k + 1}_rt`] = r.rt;
                    });
                    jsPsych.finishTrial(Object.assign({ questions: results, event_log: ev }, flat));
                }

                // The animation plays; when it ends the last frame stays on screen and the first question starts.
                onImageReady(el, function() {
                    ev.animation_start_epoch_ms = Date.now();
                    setTimeout(function() { ev.question_phase_start_epoch_ms = Date.now(); askQuestion(0); }, event_ms);
                });
            },
            data: animationData(a, 'pilot' + a.pilot + '_animation', null)
        },
        stop_recording
    ];
}

// ── Pilot 2: bullseye -> ONE continuous animation (event, red star shakes + sound,
//    still red star = LOOKING WINDOW, punishment, outcome). One file, so no flicker. ──
function buildPilot2Timeline(a, tag, nextUrl) {
    const ev = {};
    const f = a.files;
    const total = part1_duration + antic_duration + part2_duration + freeze_duration;
    return [
        start_recording,
        bullseyeTrial(tag),
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() { return `<img id="${tag}-visual" src="${withCb(f.full)}" class="trial-visual">`; },
            choices: "NO_KEYS",
            trial_duration: total,
            on_load: function() {
                ev.trial_load_epoch_ms = Date.now();
                if (nextUrl) preloadUrl(nextUrl);
                const el = document.getElementById(tag + '-visual');
                onImageReady(el, function() {
                    ev.animation_start_epoch_ms = Date.now();
                    setTimeout(function() { ev.sound_cue_epoch_ms = Date.now(); playCue(); }, test_sound_offset_ms);
                    setTimeout(function() { ev.looking_window_start_epoch_ms = Date.now(); }, part1_duration);
                    setTimeout(function() { ev.looking_window_end_epoch_ms = Date.now(); }, part1_duration + antic_duration);
                });
            },
            on_finish: function(data) { data.event_log = ev; },
            data: animationData(a, 'pilot2_animation', total)
        },
        stop_recording
    ];
}

// ════════════════════════════════════════════════════════════════════
//  ANSWER BUTTONS (pictures of the two characters; the names are read aloud from mp3s)
// ════════════════════════════════════════════════════════════════════
const SHAPE_SVG = {
    square:   c => `<svg width="90" height="90" viewBox="0 0 90 90"><rect x="8" y="8" width="74" height="74" fill="${c}" stroke="#212529" stroke-width="3"/></svg>`,
    triangle: c => `<svg width="90" height="90" viewBox="0 0 90 90"><polygon points="45,6 85,82 5,82" fill="${c}" stroke="#212529" stroke-width="3"/></svg>`
};
// Character colors match the animations: Pilot 1 = brown triangle + blue square; Pilot 3 = teal triangle + red square.
const P1_OPTIONS = [
    { key: 'triangle', voice: VOICE.triangle, label: 'the triangle character', svg: SHAPE_SVG.triangle('#8b4513') },
    { key: 'square',   voice: VOICE.square,   label: 'the square character',   svg: SHAPE_SVG.square('#4dabf7') }
];
const P3_OPTIONS = [
    { key: 'triangle', voice: VOICE.triangle, label: 'the triangle character', svg: SHAPE_SVG.triangle('#20c997') },
    { key: 'square',   voice: VOICE.square,   label: 'the square character',   svg: SHAPE_SVG.square('#ff6b6b') }
];

// ── Label screens: the words pop up, their mp3 plays, then a Start button appears ──
function buildLabelScreen(voiceItem, tag) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<div style="height:60vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:40px;">
                     <div class="stim-msg" id="label-msg" style="font-size:clamp(28px,5vw,54px); max-width:900px; padding:0 20px;"></div>
                     <div class="q-options" id="label-options" style="margin-top:0;">
                       <div class="q-btn" id="label-continue" style="font-size:28px; padding:16px 48px;">Start</div>
                     </div>
                   </div>`,
        choices: "NO_KEYS",
        on_load: function() {
            const msg = document.getElementById('label-msg');
            const box = document.getElementById('label-options');
            const btn = document.getElementById('label-continue');
            let clicked = false, shown_time = null;
            btn.addEventListener('click', function() {
                if (clicked) return;
                clicked = true;
                stopVoice();
                jsPsych.finishTrial({ trial_type: tag, label: voiceItem.text,
                                      rt: Math.round(performance.now() - shown_time) });
            });
            setTimeout(function() {
                popText(msg, voiceItem.text);
                shown_time = performance.now();
                playVoice(voiceItem, function() { box.classList.add('show'); });
            }, 400);
        },
        data: { trial_type: tag }
    };
}

// ── Put the whole study together ──
function buildAnimationBlock(a, i) {
    const tag = `pilot${a.pilot}_a${a.animation_index}`;
    const next = animation_plan[i + 1];
    const nextUrl = next ? withCb(next.files.event || next.files.full) : null;
    let anim;
    if (a.pilot === 2) anim = buildPilot2Timeline(a, tag, nextUrl);
    else               anim = buildAnimationWithQuestions(a, tag, a.pilot === 1 ? pilot1_event_duration : pilot3_event_duration, nextUrl);
    return [buildLabelScreen(VOICE.watch_this_video, 'label_' + tag + '_video'), ...anim];
}
const debrief_page = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div class="instructions-box" style="max-width: 800px; margin: 40px auto; text-align: left; line-height: 1.7;">
            <h1 style="text-align: center; margin-bottom: 30px; font-size: 2.2em; font-weight: normal; color: #333;">Thank you!</h1>

            <p style="margin-bottom: 1.5em; font-size: 1.05em; color: #444;">Thank you for taking part in this study with the Explanation Lab at Cornell University. Your child’s participation helps us understand how young children think about cause and responsibility.</p>

            <p style="margin-bottom: 1.5em; font-size: 1.05em; color: #444;"><strong>What we are studying:</strong> When something goes wrong, who is responsible? Sometimes one character directly causes an outcome, like a character who breaks a box by hitting it. Other times, one character starts a chain of events, like bumping a second character who then breaks the box. We want to know whether children think about these two kinds of causes differently. Depending on the version your child saw, they watched scenes like these and may have been asked who broke the box, who caused the box to break, or which character should lose a star.</p>

            <p style="margin-bottom: 1.5em; font-size: 1.05em; color: #444;"><strong>Why we record where your child looks:</strong> Young children do not always say or show everything they understand when they answer a question. Where they look can sometimes tell us more. We will compare the answers children give with where they look while watching the scenes. In the scenes with a star character, we are also interested in where children look just before the star takes a star away, because that may show whether they expect one character to be punished more than the other.</p>

            <p style="margin-bottom: 1.5em; font-size: 1.05em; color: #444;"><strong>A note on your child’s behavior:</strong> There are many reasons a child might look at one character more than another, such as liking a color or shape, or simply looking around. That is completely normal! There are no right or wrong answers, and we are not evaluating your child. We look for patterns across many children rather than at any single child’s responses.</p>

            <p style="margin-bottom: 1.5em; font-size: 1.05em; color: #444;"><strong>Compensation:</strong> As a reminder, you will receive a $5 Amazon gift card within one week. To be eligible, your child must be in the age range for this study and visible in the study video, and you must have submitted a valid consent statement. Gift cards can only be sent to US residents, and each child can receive one only once.</p>

            <p style="margin-bottom: 2em; font-size: 1.05em; color: #444;">If you have any questions about this study, please contact Shaun Nichols and the Explanation Lab at <a href="mailto:cornell.explanation.lab@gmail.com" style="color: #337ab7; text-decoration: none;">cornell.explanation.lab@gmail.com</a>. You can also find more of our studies on our lab page on Children Helping Science. Thank you again for your participation!</p>

            <div style="text-align: center; margin-top: 30px; margin-bottom: 20px;">
                <button id="exit-btn" class="jspsych-btn" style="background-color: #5cb85c; color: white; border: none; padding: 12px 24px; font-size: 1.1em; cursor: pointer; font-weight: bold;">Exit</button>
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    on_load: function() {
        const exitBtn = document.getElementById('exit-btn');
        if (exitBtn) {
            exitBtn.addEventListener('click', function() {
                window.location.href = "https://childrenhelpingscience.com/studies/history/";
            });
        }
    },
    data: { trial_type: 'debrief' }
};


// ════════════════════════════════════════════════════════════════════
//  RUN THE EXPERIMENT
// ════════════════════════════════════════════════════════════════════
const pilot2_warmups = (study_pilot === 2 && PILOT2_PUNISHMENT_WARMUPS) ? [
    buildLabelScreen(VOICE.watch_these_videos, 'label_warmup_characters'),
    bullseyeTrial('warmup_0'), buildWarmupPunishTrial(warmup_positions[0], 0),
    bullseyeTrial('warmup_1'), buildWarmupPunishTrial(warmup_positions[1], 1),
    bullseyeTrial('warmup_2'), buildWarmupPunishTrial(warmup_positions[2], 2)
] : [];

const animation_blocks = [];
animation_plan.forEach(function(a, i) { animation_blocks.push(...buildAnimationBlock(a, i)); });

jsPsych.run([
    // ── CHS setup (unchanged) ──
    { type: jsPsychFullscreen, fullscreen_mode: true },
    video_config,
    video_consent,
    instructions,

    // ── Introduction: overview video (Next button after it ends), then the warm-up videos ──
    intro_video,
    warmup_practice,
    warmup_finish,

    // ── Record what this child was assigned (pilot, scenes, directions, targets) ──
    {
        type: jsPsychHtmlButtonResponse,
        stimulus: '',
        choices: [],
        trial_duration: 0,
        data: {
            trial_type: 'randomization_info',
            study_pilot: study_pilot,
            answer_button_order_left_to_right: answer_button_order,   // Pilots 1 and 3; same all study
            animation_plan: animation_plan.map(a => ({
                animation_index: a.animation_index, pilot: a.pilot, context: a.context,
                direction: a.direction, target_punished: a.target,
                first_character_side: a.first_character_side, second_character_side: a.second_character_side,
                files: a.files
            })),
            warmup_order: (study_pilot === 2 && PILOT2_PUNISHMENT_WARMUPS) ? warmup_positions.slice() : null
        }
    },

    // ── Pilot 2 only: single-character warm-ups ──
    ...pilot2_warmups,

    // ── The ONE pilot this child was assigned: chain + causal, each with its questions ──
    ...animation_blocks,

    // ── Ending: closing video (replaces the old "Thank You!" screen), then consent / exit survey, final page ──
    outro_video,
    { type: jsPsychFullscreen, fullscreen_mode: false, delay_after: 0 },
    { type: chsSurvey.ExitSurveyPlugin },
    debrief_page
]);
