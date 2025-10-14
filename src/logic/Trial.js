import { renderQuestionnaire } from './Questionnaire.js';

export function runTrial(index, trials, log) {
  const app = document.getElementById('app');

  // End of trials → launch questionnaire
  if (index >= trials.length) {
    renderQuestionnaire(log);
    return;
  }

  // Break screen after every 4 trials
  if (index > 0 && index % 4 === 0) {
    app.innerHTML = `
      <h2>Would you like a break?</h2>
      <button id='breakYes'>Yes</button>
      <button id='breakNo'>No, continue</button>
    `;

    const start = Date.now();

    document.getElementById("breakYes").addEventListener("click", () => {
      app.innerHTML = `
        <h2>Take your time. Click when you're ready to continue.</h2>
        <button id='readyBtn'>I'm Ready</button>
      `;
      document.getElementById("readyBtn").addEventListener("click", () => {
        const breakDuration = (Date.now() - start) / 1000;
        runTrial(index + 1, trials, [...log, {
          trialId: "BREAK",
          breakDuration,
          timestamp: new Date().toISOString()
        }]);
      });
    });

    document.getElementById("breakNo").addEventListener("click", () => {
      runTrial(index + 1, trials, log);
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
      runTrial(index + 1, trials, [...log, {
        trialId: trial.id,
        correctAnswer: trial.correctAnswer,
        userAnswer,
        correct,
        question: trial.questionText,
        timestamp
      }]);
    });
  });
}
