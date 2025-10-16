import { renderQuestionnaire } from './Questionnaire.js';

/**
 * Run a single trial by index.
 * - trials: array of trial objects [{ id, video, questionText, choices, correctAnswer, ... }]
 * - log: accumulated results
 * - postBreak: internal flag so we only show the break screen once per block
 */
export function runTrial(index, trials, log, postBreak = false) {
  const app = document.getElementById('app');

  // End of trials → launch questionnaire
  if (index >= trials.length) {
    renderQuestionnaire(log);
    return;
  }

  // Break screen BEFORE the next block (every 4 trials), shown only once per block
  if (index > 0 && index % 4 === 0 && !postBreak) {
    app.innerHTML = `
      <h2>Would you like a break?</h2>
      <button id='breakYes'>Yes</button>
      <button id='breakNo'>No, continue</button>
    `;

    const breakStart = Date.now();

    // YES: show ready screen, then continue same index (no skip), and log break
    document.getElementById("breakYes").addEventListener("click", () => {
      app.innerHTML = `
        <h2>Take your time.</h2>
        <p>Click when you're ready to continue.</p>
        <button id='readyBtn'>I'm Ready</button>
      `;
      document.getElementById("readyBtn").addEventListener("click", () => {
        const breakDuration = (Date.now() - breakStart) / 1000;
        const updatedLog = [
          ...log,
          { trialId: "BREAK", breakDuration, timestamp: new Date().toISOString() }
        ];
        // Continue to the same unplayed trial, mark postBreak=true so the break won't reappear
        runTrial(index, trials, updatedLog, true);
      });
    });

    // NO: continue to same index (no skip), still log a minimal break record
    document.getElementById("breakNo").addEventListener("click", () => {
      const breakDuration = (Date.now() - breakStart) / 1000; // tiny duration
      const updatedLog = [
        ...log,
        { trialId: "BREAK_SKIPPED", breakDuration, timestamp: new Date().toISOString() }
      ];
      runTrial(index, trials, updatedLog, true);
    });

    return;
  }

  // Normal trial
  const trial = trials[index];
  if (!trial) {
    // Defensive: if something is undefined, move on
    runTrial(index + 1, trials, log, false);
    return;
  }

  // Render video with autoplay-safe attributes
  app.innerHTML = `
    <video id="stimulusVideo"
           src="public/videos/${trial.video}"
           autoplay
           muted
           playsinline
           style="max-width: 100%; display: block;">
    </video>
  `;

  const video = document.getElementById('stimulusVideo');

  // Ensure autoplay starts in modern browsers
  try { video.muted = true; } catch (_) {}
  try {
    const p = video.play();
    if (p && typeof p.then === 'function') {
      p.catch(() => {
        // If autoplay is blocked, show a tap-to-start overlay
        app.innerHTML = `
          <div>
            <p>Click to start the video</p>
            <button id="tapToStart">Start</button>
          </div>
        `;
        document.getElementById('tapToStart').addEventListener('click', () => {
          runTrial(index, trials, log, postBreak);
        });
      });
    }
  } catch (_) {
    // If play() throws, we’ll rely on fallback timer below
  }

  // Handler to proceed to MCQ (clears fallback)
  let advanced = false;
  const proceed = () => {
    if (advanced) return;
    advanced = true;
    clearTimeout(fallbackTimer);
    showMCQ(trial, index, trials, log);
  };

  // Primary progression
  video.onended = proceed;

  // Fallback progression (in case onended never fires due to load/policy)
  const FALLBACK_MS = 6500; // adjust if your stimuli are longer
  const fallbackTimer = setTimeout(proceed, FALLBACK_MS);

  // If a hard error on video, proceed anyway
  video.onerror = proceed;
}

function showMCQ(trial, index, trials, log) {
  const app = document.getElementById('app');

  app.innerHTML = `
    <h2>${trial.questionText || "What word did you see?"}</h2>
    ${trial.choices.map(choice => `<button class="choiceBtn">${choice}</button>`).join('<br>')}
  `;

  // Bind once per render
  document.querySelectorAll('.choiceBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const userAnswer = btn.innerText;
      const correct = userAnswer === trial.correctAnswer;
      const timestamp = new Date().toISOString();

      const newEntry = {
        trialId: trial.id,
        correctAnswer: trial.correctAnswer,
        userAnswer,
        correct,
        question: trial.questionText,
        timestamp
      };

      // Advance to next trial; reset postBreak to false so the next block break can show
      runTrial(index + 1, trials, [...log, newEntry], false);
    }, { once: true });
  });
}
