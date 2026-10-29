// ════════════════════════════════════════════════════════════════════
//  FULL STUDY (CHS jsPsych)
//
//  Sequence (Order A or B is chosen at random for each child; the only
//  difference is the Pilot 1 scene: chain in Order A, single cause in Order B):
//     [CHS setup + consent + instructions]
//     warm-up practice video -> warm-up finish video
//     ["Please watch this video" label]  Pilot 1 (chain or single cause; no star)
//     Question set #1  ("Who broke the box?" then "Who caused the box to break?")
//     ["Please complete the following activity" label]  Distractor 1 (select all the DOGS)
//     ["Please watch these videos" label]  Warm-up characters (single character
//                          punished by the star: left, center, right -- order randomized)
//     ["Please watch this video" label]  Pilot 2 (chain, distal punished, red star)
//     ["Please complete the following activity" label]  Distractor 2 (select all the PIGS)
//     ["Please watch this video" label]  Pilot 3 (same chain scene, NO star hovering; both
//                          characters keep the stars above their heads) -- always last
//     Question set #2  ("Which character should lose a star?")
//     Thank You!
//     [CHS exit survey + debrief]
//
//  Before each animation / activity / warm-up a label screen (just the words,
//  read aloud, plus a Start button) tells the child what is coming.
//  Every piece of on-screen text is also read aloud (the browser's built-in
//  voice). Paste this whole file into the "jsPsych Experiment Code" box on
//  childrenhelpingscience.com. BASE (below) must point to the folder where
//  all the GIFs, PNGs, videos and sounds are uploaded.
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
//  TIMING (ms) -- these must match the animation files
// ════════════════════════════════════════════════════════════════════
// Pilot 1: the event GIF, then the frozen final scene.
const pilot1_event_duration = 5040;
const pilot1_freeze_extra   = 1500;
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

// ── Randomization ──
// Order A: Pilot 1 = chain.  Order B: Pilot 1 = single cause.
// Everything else is identical in both orders. Pilot 2 and Pilot 3 are always
// the chain scene with the distal (first) characters; Pilot 3 is always last.
const study_order    = Math.random() < 0.5 ? 'A' : 'B';
const pilot1_context = study_order === 'A' ? 'chains' : 'single_cause';
const direction  = Math.random() < 0.5 ? 'forward' : 'backward';   // one per child, used for every animation
const is_forward = direction === 'forward';
const rev = is_forward ? '' : 'reverse_';
// Where each character is on the screen (needed to read gaze left/right in iCatcher).
// "first" = the character who starts on the far side / is the distal one; "second" = the other.
const first_character_side  = is_forward ? 'left'  : 'right';
const second_character_side = is_forward ? 'right' : 'left';

// Pilot 1 and Pilot 3: an event GIF + a frozen final picture.
function eventFiles(ctx, cond, pilotNum) {
    const stem = `${ctx}_${rev}${cond}_pilot${pilotNum}`;
    return { event: BASE + stem + '_event.gif', freeze: BASE + stem + '_final_freeze.png' };
}
// Pilot 2: part1 / anticipatory freeze / part2 / outcome freeze.
function pilotStarFiles(ctx, cond) {
    const stem = `${ctx}_${rev}${cond}_pilot2`;
    return {
        full:   BASE + stem + '_full.gif',    // one continuous file: part 1 + still red star + part 2 + outcome
    };
}
const pilot1_files = eventFiles(pilot1_context, 'scene', 1);
const pilot2_obj   = { name: 'distal', tag: 'pilot2', files: pilotStarFiles('chains', 'distal') };
const pilot3_files = eventFiles('chains', 'distal', 3);

// Test-animation durations (ms), from make_pilot_animations.py
const part1_duration  = 5360;    // Pilot 2: event once, star turns red + shakes + sound
const test_sound_offset_ms = 4840;
const antic_duration  = 3000;    // Pilot 2: red star, still: the looking window before punishment
const part2_duration  = 2920;    // Pilot 2: star goes to its target and takes the star
const freeze_duration = 8000;    // Pilot 2: after punishment
// Pilot 3 has the same length as Pilot 2's part 1 + still window (but no star)
const pilot3_event_duration = 5360;
const pilot3_freeze_extra   = 3000;

// Start downloading the first animations right away.
preloadUrl(withCb(pilot1_files.event));
preloadUrl(withCb(pilot1_files.freeze));

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
    .q-img { max-height: 32vh; max-width: 100%; display: block; margin: 0 auto 10px; }
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
const video_config = {
    type: chsRecord.VideoConfigPlugin
};

const video_consent = {
    type: chsRecord.VideoConsentPlugin,
    PIName:      'Ellen Markman',
    institution: 'The Markman Lab of Stanford University',
    PIContact:   'Ellen Markman at markman@stanford.edu',
    purpose:     'This study is about how children perceive causal chains, single causes, and responsibility.',
    procedures:  'Your child will watch short animated sequences. We will record their eye movements to measure their looking times.',
    risk_statement: 'There are no expected risks to participation.',
    payment:     'After you finish the study, we will email you a $5 Amazon gift card within approximately 3–5 business days.',
    research_rights_statement: 'This research has been reviewed and approved by an Institutional Review Board (“IRB”), a group of people who oversee research involving humans as participants. Information to help you understand research is on-line at https://irb.stanford.edu/. You may talk to a IRB staff member at (650) 723-2480 or irb2-manager@lists.stanford.edu for any of the following: 1) Your questions, concerns, or complaints are not being answered by the research team; 2) you cannot reach the research team; 3) you want to talk to someone besides the research team; 4) you have questions about your rights as a research subject; 5) you want to get information or provide input about this research.',
    include_databrary: true
};

const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div class="instructions-box">
            <h2>Overview</h2>
            <ul>
                <li>The study takes about 5–10 minutes.</li>
                <li>Your child will watch short animated clips, answer a few questions, and play a short game.</li>
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
        if (btn) btn.addEventListener('click', function() { primeCueAudio(); primeSpeech(); }, { once: true });
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
        data: { trial_type: tag + '_bullseye' }
    };
}


// ════════════════════════════════════════════════════════════════════
//  ANIMATION TRIALS
// ════════════════════════════════════════════════════════════════════

// ── Pilot 1 and Pilot 3: bullseye -> event once -> frozen final scene ──
// Each trial also saves an `event_log` of exact clock times (epoch ms), so the
// webcam video can be lined up with what was on screen (for iCatcher gaze coding).
function buildEventTimeline(tag, files, context, event_ms, freeze_ms) {
    const ev = {};
    return [
        start_recording,
        bullseyeTrial(tag),
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() { return `<img id="${tag}-visual" src="${withCb(files.event)}" class="trial-visual">`; },
            choices: "NO_KEYS",
            trial_duration: event_ms + freeze_ms,
            on_load: function() {
                ev.trial_load_epoch_ms = Date.now();
                const el = document.getElementById(tag + '-visual');
                const freeze_url = withCb(files.freeze);
                preloadUrl(freeze_url);
                onImageReady(el, function() {
                    ev.animation_start_epoch_ms = Date.now();
                    setTimeout(function() { ev.freeze_start_epoch_ms = Date.now(); if (el) el.src = freeze_url; }, event_ms);
                });
            },
            on_finish: function(data) { data.event_log = ev; },
            data: {
                trial_type: tag + '_event', context: context, direction: direction,
                first_character_side: first_character_side, second_character_side: second_character_side,
                phase_ms_from_animation_start: { event_ends: event_ms, trial_ends: event_ms + freeze_ms }
            }
        },
        stop_recording
    ];
}

// ── Pilot 2: bullseye -> ONE continuous animation (part 1, red star shakes + sound,
//    still red star = LOOKING WINDOW, part 2 punishment, outcome). Because it is a single
//    file there is no switching between files, so no flicker between the parts. ──
// Gaze for iCatcher: the webcam is recorded from before the bullseye until the end of the
// trial (start_recording / stop_recording). `event_log` + the *_ms_from_animation_start
// fields say exactly when the looking window happens.
function buildTestTimeline(testObj, nextPart1Url) {
    const f = testObj.files;
    const ev = {};
    return [
        start_recording,
        bullseyeTrial(testObj.tag),
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() { return `<img id="test-visual" src="${withCb(f.full)}" class="trial-visual">`; },
            choices: "NO_KEYS",
            trial_duration: part1_duration + antic_duration + part2_duration + freeze_duration,
            on_load: function() {
                ev.trial_load_epoch_ms = Date.now();
                if (nextPart1Url) preloadUrl(nextPart1Url);
                const el = document.getElementById('test-visual');
                onImageReady(el, function() {
                    ev.animation_start_epoch_ms = Date.now();
                    setTimeout(function() { ev.sound_cue_epoch_ms = Date.now(); playCue(); }, test_sound_offset_ms);
                    setTimeout(function() { ev.looking_window_start_epoch_ms = Date.now(); }, part1_duration);
                    setTimeout(function() { ev.looking_window_end_epoch_ms = Date.now(); }, part1_duration + antic_duration);
                    setTimeout(function() { ev.part2_start_epoch_ms = Date.now(); }, part1_duration + antic_duration);
                });
            },
            on_finish: function(data) { data.event_log = ev; },
            data: {
                trial_type: testObj.tag + '_full_test',
                target_punished: testObj.name,
                direction: direction,
                first_character_side: first_character_side,
                second_character_side: second_character_side,
                punished_character_side: first_character_side,   // Pilot 2 always punishes the first (distal) character
                phase_ms_from_animation_start: {
                    sound_cue: test_sound_offset_ms,
                    looking_window_start: part1_duration,
                    looking_window_end: part1_duration + antic_duration,
                    part2_end: part1_duration + antic_duration + part2_duration,
                    trial_ends: part1_duration + antic_duration + part2_duration + freeze_duration
                }
            }
        },
        stop_recording
    ];
}

// ════════════════════════════════════════════════════════════════════
//  QUESTION SLIDES (text pops up + is read aloud, then two picture buttons)
// ════════════════════════════════════════════════════════════════════
const SHAPE_SVG = {
    circle:   c => `<svg width="90" height="90" viewBox="0 0 90 90"><circle cx="45" cy="45" r="38" fill="${c}" stroke="#212529" stroke-width="3"/></svg>`,
    square:   c => `<svg width="90" height="90" viewBox="0 0 90 90"><rect x="8" y="8" width="74" height="74" fill="${c}" stroke="#212529" stroke-width="3"/></svg>`,
    triangle: c => `<svg width="90" height="90" viewBox="0 0 90 90"><polygon points="45,6 85,82 5,82" fill="${c}" stroke="#212529" stroke-width="3"/></svg>`
};
// Character colors match the animations.
const P1_OPTIONS = [
    { key: 'triangle', label: 'the triangle character', svg: SHAPE_SVG.triangle('#8b4513') },
    { key: 'square',   label: 'the square character',   svg: SHAPE_SVG.square('#4dabf7') }
];
const P3_OPTIONS = [
    { key: 'triangle', label: 'the triangle character', svg: SHAPE_SVG.triangle('#20c997') },
    { key: 'square',   label: 'the square character',   svg: SHAPE_SVG.square('#ff6b6b') }
];

function buildChoiceQuestion(tag, question, options, imageUrl) {
    let shown = options.slice();        // the order actually shown (re-randomized each time)
    return {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            shown = shuffleArray(options);   // random order of the two answer choices
            const img = imageUrl ? `<img class="q-img" src="${withCb(imageUrl)}">` : '';
            const btns = shown.map((o, i) =>
                `<div class="q-btn" data-key="${o.key}" data-pos="${i + 1}">${o.svg}<span>${o.label}</span></div>`).join('');
            return `<div class="q-wrap">${img}<div class="stim-msg" id="q-msg"></div><div class="stim-msg" id="q-select"></div><div class="q-options" id="q-options">${btns}</div></div>`;
        },
        choices: "NO_KEYS",
        on_load: function() {
            const msg = document.getElementById('q-msg');
            const sel = document.getElementById('q-select');
            const box = document.getElementById('q-options');
            let answered = false;
            let shown_time = null;
            box.querySelectorAll('.q-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    if (answered) return;
                    answered = true;
                    if (window.speechSynthesis) window.speechSynthesis.cancel();
                    jsPsych.finishTrial({
                        trial_type: tag,
                        question: question,
                        choice: btn.dataset.key,
                        choice_position: Number(btn.dataset.pos),     // 1 = left button, 2 = right button
                        options_shown: shown.map(o => o.key),         // left-to-right order shown
                        rt: Math.round(performance.now() - shown_time)
                    });
                });
            });
            // 1) the question pops up and is read, 2) "Please select an answer" pops up and is
            // read, 3) the two choices appear and are read.
            setTimeout(function() {
                popText(msg, question);
                speakText(question, function() {
                    popText(sel, 'Please select an answer');
                    speakText('Please select an answer', function() {
                        box.classList.add('show');
                        shown_time = performance.now();
                        speakText(shown.map(o => o.label).join(', or '), null);
                    });
                });
            }, 500);
        },
        data: { trial_type: tag }
    };
}

// Question set #1: after Pilot 1 (the frozen final scene stays on screen)
const question_set_1 = [
    buildChoiceQuestion('pilot1_q1_who_broke', 'Who broke the box?', P1_OPTIONS, pilot1_files.freeze),
    buildChoiceQuestion('pilot1_q2_who_caused', 'Who caused the box to break?', P1_OPTIONS, pilot1_files.freeze)
];
// Question set #2: after Pilot 3 (the frozen final scene stays on screen; both characters still have stars)
const question_set_2 = buildChoiceQuestion('pilot3_q_lose_star', 'Which character should lose a star?', P3_OPTIONS, pilot3_files.freeze);

// ════════════════════════════════════════════════════════════════════
//  DISTRACTORS (find all the DOGS / find all the PIGS)
// ════════════════════════════════════════════════════════════════════
// Pictures are emoji by default (work on every device, no files needed).
// To use your own pictures, put an image address in `image`, e.g.
//   dog: { emoji: '🐶', image: BASE + 'dog1.png' }
const distractor_animals = {
    dog: { emoji: '🐶', image: null, plural: 'dogs' },
    cat: { emoji: '🐱', image: null, plural: 'cats' },
    cow: { emoji: '🐮', image: null, plural: 'cows' },
    pig: { emoji: '🐷', image: null, plural: 'pigs' }
};
const DISTRACTOR_COPIES = 3;

function buildDistractor(targetKind, tag) {
    const plural = distractor_animals[targetKind].plural;
    const prompt_display = `Please select all the ${plural.toUpperCase()}`;
    const prompt_speech  = `Please select all the ${plural}`;
    return {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            let items = [];
            Object.keys(distractor_animals).forEach(k => { for (let c = 0; c < DISTRACTOR_COPIES; c++) items.push(k); });
            items = shuffleArray(items);
            const cells = items.map((kind, i) => {
                const a = distractor_animals[kind];
                const pic = a.image ? `<img src="${a.image}" alt="${kind}" draggable="false">` : `<span class="dstr-emoji">${a.emoji}</span>`;
                return `<div class="dstr-animal" data-kind="${kind}" data-index="${i}">${pic}</div>`;
            }).join('');
            return `<div class="dstr-wrap"><div class="stim-msg" id="dstr-msg"></div><div class="dstr-grid">${cells}</div></div>`;
        },
        choices: "NO_KEYS",
        on_load: function() {
            const msg = document.getElementById('dstr-msg');
            const animals = Array.from(document.querySelectorAll('.dstr-animal'));
            let left = animals.filter(el => el.dataset.kind === targetKind).length;
            let ready = false, ended = false, last_try_time = -99999, prompt_time = null;
            const clicks = [];
            let wrong = 0;

            animals.forEach(el => {
                el.addEventListener('click', function() {
                    if (!ready || ended) return;
                    const kind = el.dataset.kind;
                    clicks.push({ kind: kind, index: Number(el.dataset.index),
                                  ms_since_prompt: Math.round(performance.now() - prompt_time) });
                    if (kind === targetKind) {
                        if (el.classList.contains('gone')) return;
                        el.classList.add('gone');
                        left--;
                        if (left === 0) {
                            ready = false;
                            setTimeout(function() {
                                popText(msg, 'Great job!', 'great');
                                speakText('Great job!', function() {
                                    setTimeout(function() {
                                        ended = true;
                                        if (window.speechSynthesis) window.speechSynthesis.cancel();
                                        jsPsych.finishTrial({ trial_type: tag, target: targetKind, clicks: clicks,
                                            wrong_clicks: wrong, total_ms: Math.round(performance.now() - prompt_time) });
                                    }, 1000);
                                });
                            }, 500);
                        }
                    } else {
                        wrong++;
                        const now = performance.now();
                        if (now - last_try_time < 1500) return;   // don't repeat "Try again" on rapid taps
                        last_try_time = now;
                        popText(msg, 'Try again', 'try');
                        speakText('Try again', null);
                        setTimeout(function() {                    // put the instruction back
                            if (!ended && left > 0) popText(msg, prompt_display);
                        }, 1500);
                    }
                });
            });

            setTimeout(function() {
                popText(msg, prompt_display);
                prompt_time = performance.now();
                ready = true;
                speakText(prompt_speech, null);
            }, 600);
        },
        data: { trial_type: tag }
    };
}
const distractor_1 = buildDistractor('dog', 'distractor1_dogs');
const distractor_2 = buildDistractor('pig', 'distractor2_pigs');

// ── Label screens: shown before every step. The label pops up, is read aloud,
//    and a Start button moves on (the button works once the voice finishes). ──
const LABEL_VIDEO    = 'Please watch this video';                 // before each animation (Pilots 1, 2, 3)
const LABEL_VIDEOS   = 'Please watch these videos';               // before the warm-up characters
const LABEL_ACTIVITY = 'Please complete the following activity';  // before each distractor
// (No label screen before the question sets.)

function buildLabelScreen(label, tag) {
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
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                jsPsych.finishTrial({ trial_type: tag, label: label,
                                      rt: Math.round(performance.now() - shown_time) });
            });
            setTimeout(function() {
                popText(msg, label);
                shown_time = performance.now();
                speakText(label, function() { box.classList.add('show'); });
            }, 400);
        },
        data: { trial_type: tag }
    };
}

// ── Concluding screen ──
const thank_you_screen = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="height:60vh; display:flex; align-items:center; justify-content:center;"><div class="stim-msg great" id="ty-msg" style="font-size:clamp(40px,8vw,80px);"></div></div>',
    choices: "NO_KEYS",
    on_load: function() {
        const el = document.getElementById('ty-msg');
        setTimeout(function() {
            popText(el, 'Thank You!', 'great');
            speakText('Thank you!', function() {
                setTimeout(function() { jsPsych.finishTrial(); }, 1500);
            });
        }, 500);
    },
    data: { trial_type: 'thank_you' }
};
const debrief_page = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div class="instructions-box" style="max-width: 800px; margin: 40px auto; text-align: left; line-height: 1.7; font-family: Arial, sans-serif;">
            <h1 style="text-align: center; margin-bottom: 30px; font-size: 2.2em; font-weight: normal; color: #333;">Thank you!</h1>

            <p style="margin-bottom: 1.5em; font-size: 1.05em; color: #444;">This study is a follow-up to our previous research examining how children trace fault and responsibility. In this combined study, we examine and compare children's judgments in two different scenarios: causal chains (where a distal cause shape initiates an action that propagates through a proximal cause shape to break a cube) and single causes (where only the proximal cause shape directly breaks the cube while the distal cause shape remains inactive).</p>

            <p style="margin-bottom: 1.5em; font-size: 1.05em; color: #444;">In our previous work, we found that younger children tend to focus on the direct, proximal cause (the agent that physically contacts the object), while older children can trace responsibility back to the initial, distal cause (the agent that started the chain reaction).</p>

            <p style="margin-bottom: 1.5em; font-size: 1.05em; color: #444;">With this design, we use a non-verbal eye-tracking method. By measuring where children look on the screen while watching shapes interact — especially during the moment just before the star authority chooses which shape to punish — we are testing whether younger children can represent these causal structures implicitly, even when they struggle to express these relationships verbally.</p>

            <p style="margin-bottom: 1.5em; font-size: 1.05em; color: #444;"><strong>A note on child behavior:</strong> Please note that there are many reasons a child might look more or less at a particular shape on any given trial (such as a preference for a certain color or shape, or simply looking around), and that is completely normal and okay! That is why we average looking times over many children to find general patterns rather than looking at individual responses.</p>

            <p style="margin-bottom: 1.5em; font-size: 1.05em; color: #444;"><strong>Compensation:</strong> As a reminder, you will receive a $5 Amazon.com gift card via email within approximately a week of completing the study.</p>

            <p style="margin-bottom: 2em; font-size: 1.05em; color: #444;">If you are interested in learning more about this topic, please visit our lab website: <a href="https://markmanlab.stanford.edu" target="_blank" style="color: #337ab7; text-decoration: none;">markmanlab.stanford.edu</a>, or check out this paper:
            <a href="https://davdrose.github.io/assets/pdf/cause_fault_cog_sci.pdf" target="_blank" style="color: #337ab7; text-decoration: none;">https://davdrose.github.io/assets/pdf/cause_fault_cog_sci.pdf</a>. Thank you again for your participation!</p>

            <div style="text-align: center; margin-top: 30px; margin-bottom: 20px;">
                <button id="fb-share-btn" class="jspsych-btn" style="background-color: #3b5998; color: white; border: none; padding: 12px 24px; font-size: 1.1em; border-radius: 4px; cursor: pointer; margin-right: 15px; font-weight: bold;">Share this study on Facebook!</button>
                <button id="exit-btn" class="jspsych-btn" style="background-color: #5cb85c; color: white; border: none; padding: 12px 24px; font-size: 1.1em; border-radius: 4px; cursor: pointer; font-weight: bold;">Exit</button>
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    on_load: function() {
        const fbBtn = document.getElementById('fb-share-btn');
        if (fbBtn) {
            fbBtn.addEventListener('click', function() {
                const studyUrl = window.location.href;
                const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(studyUrl)}`;
                window.open(fbShareUrl, '_blank');
            });
        }
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
jsPsych.run([
    // ── CHS setup ──
    { type: jsPsychFullscreen, fullscreen_mode: true },
    video_config,
    video_consent,
    instructions,

    // ── Warm-up videos ──
    warmup_practice,
    warmup_finish,

    // ── Record which order / scene type / direction / warm-up order this child got ──
    {
        type: jsPsychHtmlButtonResponse,
        stimulus: '',
        choices: [],
        trial_duration: 0,
        data: {
            trial_type: 'randomization_info',
            study_order: study_order,
            pilot1_context: pilot1_context,
            pilot2: 'chains_distal',
            pilot3: 'chains_distal_no_star',
            direction: direction,
            first_character_side: first_character_side,
            second_character_side: second_character_side,
            warmup_order: warmup_positions.slice(),
            phase_durations: { pilot1_event: pilot1_event_duration, part1: part1_duration,
                               anticipatory_freeze: antic_duration, part2: part2_duration,
                               outcome_freeze: freeze_duration, pilot3_event: pilot3_event_duration }
        }
    },

    // ── 1. Pilot 1, Question set #1, Distractor 1 ──
    buildLabelScreen(LABEL_VIDEO, 'label_pilot1_video'),
    ...buildEventTimeline('pilot1', pilot1_files, pilot1_context, pilot1_event_duration, pilot1_freeze_extra),
    ...question_set_1,
    buildLabelScreen(LABEL_ACTIVITY, 'label_distractor_1'),
    distractor_1,

    // ── 2. Warm-up characters (3 single-character punishments, random order), Pilot 2, Distractor 2 ──
    buildLabelScreen(LABEL_VIDEOS, 'label_warmup_characters'),
    bullseyeTrial('warmup_0'), buildWarmupPunishTrial(warmup_positions[0], 0),
    bullseyeTrial('warmup_1'), buildWarmupPunishTrial(warmup_positions[1], 1),
    bullseyeTrial('warmup_2'), buildWarmupPunishTrial(warmup_positions[2], 2),
    buildLabelScreen(LABEL_VIDEO, 'label_pilot2_video'),
    ...buildTestTimeline(pilot2_obj, withCb(pilot3_files.event)),
    buildLabelScreen(LABEL_ACTIVITY, 'label_distractor_2'),
    distractor_2,

    // ── 3. Pilot 3 (always last), then Question set #2 ──
    buildLabelScreen(LABEL_VIDEO, 'label_pilot3_video'),
    ...buildEventTimeline('pilot3', pilot3_files, 'chains', pilot3_event_duration, pilot3_freeze_extra),
    question_set_2,

    // ── Concluding screen ──
    thank_you_screen,

    // ── CHS wrap-up ──
    { type: jsPsychFullscreen, fullscreen_mode: false, delay_after: 0 },
    { type: chsSurvey.ExitSurveyPlugin },
    debrief_page
]);
