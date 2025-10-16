import { renderQuestionnaire } from './Questionnaire.js';

export function runTrial(index, trials, log) {
  const app = document.getElementById('app');

  // End of trials → launch questionnaire
  if (index >= trials.length) {
    renderQuestionnaire(log);
    return;
  }

  // Break screen after every 4 trials (before the next one starts)
  if (index > 0 && index % 4 === 0) {
    app.innerHTML = `
      <h2>Would you like a break?</h2>
      <button id='breakYes'>Yes</button>
      <button id='breakNo'>No, continue</button>
    `;

    const breakStart = Date.now();

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
        runTrial(index, trials, updatedLog); // Continue to the next *unplayed* trial
      });
    });

    document.getElementById("breakNo").addEventListener("click", () => {
      const breakDuration = (Date.now() - breakStart) / 1000;
      const updatedLog = [
        ...log,
        { trialId: "BREAK_SKIPPED", breakDuration, timestamp: new Date().toISOString() }
      ];
      runTrial(index, trials, updatedLog);
    });

    return;
  }

  // Normal trial: Get trial directly
  const trial = trials[index];
  if (!trial) {
    runTrial(index + 1, trials, log);
    return;
  }

  app.innerHTML = `<video id="stimulusVideo" src="public/videos/${trial.video}" autoplay></video>`;
  const video = document.getElementById('stimulusVideo');
  video.onended = () => showMCQ(trial, index, trials, log);
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

      runTrial(index + 1, trials, [...log, newEntry]);
    });
  });
}
