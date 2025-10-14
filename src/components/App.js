import {
  trials_framework_1,
  trials_framework_2,
  trials_framework_3,
  trials_framework_4
} from '../data/trials_all_frameworks.js';

import { runTrial } from '../logic/Trial.js';

const trialSets = {
  "Framework 1": trials_framework_1,
  "Framework 2": trials_framework_2,
  "Framework 3": trials_framework_3,
  "Framework 4": trials_framework_4
};

export function startApp() {
  renderFrameworkSelector();
}

function renderFrameworkSelector() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Select a Framework</h1>
    <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 20px; max-width: 350px; margin: 0 auto;">
      <select id="frameworkSelect" style="width: 100%; padding: 12px; border-radius: 10px; font-size: 1.08em;">
        ${Object.keys(trialSets).map(f => `<option value="${f}">${f}</option>`).join('')}
      </select>
      <button id="nextBtn" style="align-self: flex-start;">Next</button>
    </div>
  `;
  document.getElementById('nextBtn').addEventListener('click', () => {
    const selected = document.getElementById('frameworkSelect').value;
    localStorage.setItem('selectedFramework', selected);
    renderWelcome();
  });
}

function renderWelcome() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Welcome to the Kinetic Typography Experiment</h1>
     <p style="margin-top:12px; margin-bottom:28px;">
      Thank you for participating! In this study, you’ll view short videos with moving words and answer quick questions. 
      Your input will help us better understand how kinetic typography affects word recognition.
    </p>
      <p class="screen-note">
    This experiment is optimized for a 13–15” laptop. On larger monitors, text may appear smaller. Please view in full screen.
  </p>
    <button id="startBtn">Continue</button>
  `;
  document.getElementById('startBtn').addEventListener('click', renderConsent);
}

function renderConsent() {
  const app = document.getElementById('app');
  app.innerHTML = `
  <div class="left-align">
    <h1>Letter of Consent</h1>
    <p>
    From the research group READSEARCH, led by Prof. Bessemans at PXL-MAD School 
    of Arts/University of Hasselt, we are currently conducting a study on how kinetic 
    typography could influence word recognizability of myopic readers.
    </p>
    <p>
    You are kindly invited to participate in this research. During the study, you will 
    be shown short videos of sentences made up of pseudowords, presented in different 
    kinetic typography representations. You will then be asked about to answer a question 
    regarding the sentence. We will then ask you which typography representation you find 
    to be the most comfortable to follow. Your participation is voluntary, and your responses 
    will be treated confidentially and anonymously. 
    </p>
    <p>
    Completing the reading and questions will take approximately 10-15 minutes. You may stop 
    participating in the research at any time. By participating in this study, you declare 
    that you have read and understood this information and voluntarily agree to participate. 
    If you agree, we kindly ask you to By clicking the button below to start the test. 
    </p>
    <p>
    Best regards,<br>
    Monica Hutama 
    </p>
    <p>
    We highly value the protection of everyone's privacy! The data we ask for prior to the 
    test are not contact details and are included in the database for analytical purposes only. 
    If you change your mind at a later time, you can always leave your personal details 
    (ann.bessemans@uhasselt.be, monica.hutama@student.pxl.be) to change your decision. 
    To facilitate the research on the effects of kinetic typography on word recognizability 
    of myopic readers, I declare (if applicable as a parent/guardian) that I give permission to 
    participate in this study. I hereby transfer any copyrights, neighboring rights, and other 
    rights related to this contribution to READSEARCH. This grants READSEARCH the right to store the 
    contribution in the database and use it for reading and comprehension information. This database 
    may be made available to the research community, used for scientific research, and for the development 
    of commercial products (provided the contribution is not identifiable), without me (or my child) 
    claiming any rights. I hereby declare that I (or my child) will not object to the use of the contribution 
    in the aforementioned ways. 
    I hereby confirm that I am aware of the content of the study and grant permission to be part of the research. 
    </p>
    <button id="agreeBtn">I Agree</button>
  </div>
  `;
  document.getElementById('agreeBtn').addEventListener('click', renderInstructions);
}

function renderInstructions() {
  const app = document.getElementById('app');
  app.innerHTML = `
  <div class="left-align">
    <h1>General Instructions</h1>
    <p>
      During this experiment, you will view 16 videos, each approximately 3 seconds long. 
      Each video will display a short sentence composed of pseudowords (words that look and 
      sound like real words but have no meaning). Your task is to focus on these words 
      and try to recognize them. 
    </p>
    <h2>Task Instructions</h2>
    <p>
      <strong>For each video presentation, please follow these steps:</strong>
      <ul>
        <li>Watch the video presentation carefully.</li>
        <li>After each video, you will be asked to answer a multiple-choice question about the words you saw.</li>
        <li>After every few videos, you will be prompted with a break screen. If you wish to take a rest, please do so at that time.</li> 
      </ul>
    </p>
    <p>
      <strong>Getting Started</strong>
      <ul>
        <li>Please make sure you are in full screen.</li>
        <li>At the start of the experiment and during break screens, 
        you will see a prompt to begin when you are ready.</li>
        <li>Press the "Begin" button when you're ready to start.</li>
        <li>After viewing the presentation, you'll be directed to a question.</li>
        <li>Answer the questions about what you recognized.</li>
        <li>Once you answer, the experiment will automatically continue to the next video.</li> 
      </ul>
    </p>
    <button id="beginExperimentBtn">Begin</button>
  </div>
  `;
  document.getElementById('beginExperimentBtn').addEventListener('click', () => {
    const selected = localStorage.getItem('selectedFramework');
    const trials = trialSets[selected];
    runTrial(0, trials, []);
  });
}
