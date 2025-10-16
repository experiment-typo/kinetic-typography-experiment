import { renderQuestionnaire } from './Questionnaire.js';

export function runTrial(index, trials, log) {
  const app = document.getElementById('app');

  // If we’ve shown all trials, go to questionnaire
  if (index >= trials.length) {
    renderQuestionnaire(log);
    return;
  }

  const trial = trials[index];
  if (!trial) {
    // Defensive: if undefined, advance
    runTrial(index + 1, trials, log);
    return;
  }

  // Render the stimulus video (autoplay-safe)
  app.innerHTML = `
    <video id="stimulusVideo"
           src="public/videos/${trial.video}"
           autoplay
           muted
           playsinline
           style="max-width:100%;display:block;border-radius:12px;">
    </video>
  `;

  const video = document.getElementById('stimulusVideo');

  // Try to ensure playback in modern browsers
  try { video.muted = true; } catch(_) {}
  try {
    const p = video.play();
    if (p && typeof p.then === 'function') {
      p.catch(() => {
        // Autoplay blocked → ask for tap then retry this same trial
        app.innerHTML = `
          <h2>Tap to start the video</h2>
          <button id="tapToStart">Start</button>
        `;
        document.getElementById('tapToStart').addEventListener('click', () => {
          runTrial(index, trials, log);
        });
      });
    }
  } catch(_) {
    // If play() threw, proceed to fallback timer below
  }

  let advanced = false;
  const proceed = () => {
    if (advanced) return;
    advanced = true;
    clearTimeout(fallbackTimer);
    showMCQ(trial, index, trials, log);
  };

  // Primary progression
  video.onended = proceed;

  // Fallback progression if onended never fires (network/policy)
  const FALLBACK_MS = 6500; // adjust if your stimuli are longer
  const fallbackTimer = setTimeout(proceed, FALLBACK_MS);

  // Also don’t get stuck on error
  video.onerror = proceed;
}

function showMCQ(trial, index, trials, log) {
  const app = document.getElementById('app');

  app.innerHTML = `
    <h2>${trial.questionText || "What word did you see?"}</h2>
    ${trial.choices.map(choice => `<button class="choiceBtn">${choice}</button>`).join('<br>')}
  `;

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

      const nextIndex = index + 1;
      const newLog = [...log, newEntry];

      // ✅ Show a break AFTER every 4th trial (i.e., after trials 4, 8, 12),
      // as long as there are more trials ahead.
      const completedCount = nextIndex; // number of trials completed so far
      const shouldShowBreak = (completedCount % 4 === 0) && (nextIndex < trials.length);

      if (shouldShowBreak) {
        renderBreakScreen(nextIndex, trials, newLog);
      } else {
        runTrial(nextIndex, trials, newLog);
      }
    }, { once: true });
  });
}

function renderBreakScreen(nextIndex, trials, log) {
  const app = document.getElementById('app');

  app.innerHTML = `
    <h2>Would you like a break?</h2>
    <button id='breakYes'>Yes</button>
    <button id='breakNo'>No, continue</button>
  `;

  const breakStart = Date.now();

  // YES → show ready screen → log BREAK → continue to nextIndex
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
      runTrial(nextIndex, trials, updatedLog);
    }, { once: true });
  }, { once: true });

  // NO → log BREAK_SKIPPED (tiny duration) → continue to nextIndex
  document.getElementById("breakNo").addEventListener("click", () => {
    const breakDuration = (Date.now() - breakStart) / 1000;
    const updatedLog = [
      ...log,
      { trialId: "BREAK_SKIPPED", breakDuration, timestamp: new Date().toISOString() }
    ];
    runTrial(nextIndex, trials, updatedLog);
  }, { once: true });
}
