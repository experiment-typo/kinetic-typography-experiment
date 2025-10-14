import { finalQuestions } from '../data/questionnaire.js';

export function renderQuestionnaire(log) {
  const app = document.getElementById('app');
  let responses = [];

  app.innerHTML = `
    <div class="left-align">
      <h2>Final Questionnaire</h2>
      <div id="questionnaireForm"></div>
      <button id="submitBtn">Submit</button>
    </div>
  `;

  const form = document.getElementById('questionnaireForm');

  finalQuestions.forEach((q, idx) => {
    const qDiv = document.createElement('div');
    qDiv.classList.add('question-block');
    qDiv.innerHTML = `<p>${q.text}</p>`;

    // Multiple Choice
    if (q.type === "multiple") {
      q.options.forEach(option => {
        const id = `q${idx}_${option}`;
        qDiv.innerHTML += `
          <label>
            <input type="radio" name="q${idx}" id="${id}" value="${option}"> ${option}
          </label>`;
      });
    }

    // Multiple with Optional Text (e.g. "Other")
    else if (q.type === "multipleWithOptional") {
      q.options.forEach(option => {
        const id = `q${idx}_${option}`;
        qDiv.innerHTML += `
          <label>
            <input type="radio" name="q${idx}" id="${id}" value="${option}"> ${option}
          </label>`;
        if (option === "Other") {
          qDiv.innerHTML += `
            <input type="text" id="q${idx}_otherText" placeholder="${q.optionalPrompt || 'Specify...'}" style="margin-top:5px;width:95%;padding:6px;border-radius:6px;" />`;
        }
      });
    }

    // Short Answer
    else if (q.type === "short") {
      qDiv.innerHTML += `<input type="text" name="q${idx}" id="q${idx}" style="width: 90%; padding: 8px;" />`;
    }

    // Slider with Labels
    else if (q.type === "slider") {
      const labels = q.labels || ["1", "2", "3", "4", "5"];
      qDiv.innerHTML += `
        <div style="display: flex; justify-content: space-between; padding: 0 10px; font-size: 0.9em;">
          ${labels.map(l => `<span>${l}</span>`).join('')}
        </div>
        <input type="range" min="1" max="5" step="1" value="3" id="q${idx}" style="width: 100%; margin: 10px 0;">
      `;
    }

    // Multiple with Video Previews
    else if (q.type === "multipleVideo") {
      q.options.forEach((opt, i) => {
        const id = `q${idx}_${i}`;
        qDiv.innerHTML += `
          <label style="display:block;margin:10px 0;">
            <input type="radio" name="q${idx}" id="${id}" value="${opt.label}">
            ${opt.label}<br>
            <video src="public/videos/${opt.video}" width="300" muted autoplay loop style="margin-top:25px;border-radius:10px;padding:15px;"></video>
          </label>
        `;
      });
    }

    form.appendChild(qDiv);
  });

  async function saveResultsToGoogle(data) {
    try {
      await fetch('https://script.google.com/macros/s/AKfycbwPRtNiWO4xUVpu6fbNj8begQvJtHKXDOUUcBoqSGGxclKV86MAZk2ywASKyJHUNFRo/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      console.log('Data sent to Google Sheets');
    } catch (err) {
      console.error('Error sending data to Google Sheets:', err);
    }
  }

  document.getElementById('submitBtn').addEventListener('click', () => {
    finalQuestions.forEach((q, idx) => {
      let answer = "";

      if (q.type === "multiple" || q.type === "multipleVideo") {
        const selected = document.querySelector(`input[name="q${idx}"]:checked`);
        answer = selected ? selected.value : "";
      }

      else if (q.type === "multipleWithOptional") {
        const selected = document.querySelector(`input[name="q${idx}"]:checked`);
        if (selected?.value === "Other") {
          const otherInput = document.getElementById(`q${idx}_otherText`);
          answer = otherInput?.value || "Other (not specified)";
        } else {
          answer = selected ? selected.value : "";
        }
      }

      else if (q.type === "short" || q.type === "slider") {
        const input = document.getElementById(`q${idx}`);
        answer = input ? input.value : "";
      }

      responses.push({ question: q.text, answer });
    });

    const fullData = {
      timestamp: new Date().toISOString(),
      framework: localStorage.getItem("selectedFramework"),
      trials: log,
      questionnaire: responses
    };

    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `results_${Date.now()}.json`;
    a.click();

    saveResultsToGoogle({
  framework: localStorage.getItem('selectedFramework'),
  participant_id: Date.now(),
  results: fullData // replace with your variable
});

    app.innerHTML = "<h2>Thank you for participating!</h2><p>Your results have been saved.</p>";
  });
}
