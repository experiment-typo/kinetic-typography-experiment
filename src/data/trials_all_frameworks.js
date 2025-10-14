// ====================
// === TRIAL OBJECTS ===
// ====================
const TRIALS = {
  "1a": {
    id: "1a", label: "Condition 1A", video: "Static 1.mp4", questionText: "Which was the longest word?",
    pseudowords: ['jolmek', 'ruli', 'fan', 'zinu', 'torpline', 'meg', 'wost'],
    correctAnswer: "torpline", choices: ['torpline', 'torpleni', 'torbline', 'terplino']
  },
  "1b": {
    id: "1b", label: "Condition 1B", video: "Static 2.mp4", questionText: "Which was the second-to-last word?",
    pseudowords: ['giv', 'sulix', 'tep', 'yone', 'pir', 'kivaner', 'mud'],
    correctAnswer: "kivaner", choices: ['pir', 'kivonar', 'pit', 'kivaner']
  },
  "1c": {
    id: "1c", label: "Condition 1C", video: "Static 3.mp4", questionText: "Which was the longest word?",
    pseudowords: ['zumper', 'jad', 'vink', 'grotame', 'fex', 'lurz', 'sol'],
    correctAnswer: "grotame", choices: ['grozame', 'gretame', 'grotamo', 'grotame']
  },
  "1d": {
    id: "1d", label: "Condition 1D", video: "Static 4.mp4", questionText: "Which was the last word?",
    pseudowords: ['bok', 'joil', 'pemiko', 'vif', 'tikum', 'zen', 'rals'],
    correctAnswer: "rals", choices: ['zen', 'rals', 'rels', 'zon']
  },
  "2a": {
    id: "2a", label: "Condition 2A", video: "Dynamic RSVP Horizontal.mp4", questionText: "Which was the longest word?",
    pseudowords: ['snurbit', 'pax', 'frem', 'glaxid', 'vim', 'tor', 'zenk'],
    correctAnswer: "snurbit", choices: ['snulker', 'snurpim', 'snurbit', 'snukrit']
  },
  "2b": {
    id: "2b", label: "Condition 2B", video: "Highlight Horizontal.mp4", questionText: "Which was the last word?",
    pseudowords: ['pax', 'kwez', 'qumble', 'torp', 'juk', 'slax', 'frem'],
    correctAnswer: "frem", choices: ['frem', 'slox', 'slak', 'from']
  },
  "2c": {
    id: "2c", label: "Condition 2C", video: "Flicker Horizontal.mp4", questionText: "Which was the longest word?",
    pseudowords: ['rax', 'sert', 'yip', 'tordum', 'blufrad', 'pax', 'zent'],
    correctAnswer: "blufrad", choices: ['blukter', 'blufrad', 'blukrad', 'blofred']
  },
  "2d": {
    id: "2d", label: "Condition 2D", video: "Vibrating Horizontal.mp4", questionText: "Which was the second word?",
    pseudowords: ['nux', 'clorkif', 'vad', 'tepo', 'yox', 'skan', 'bimol'],
    correctAnswer: "clorkif", choices: ['clorkat', 'clonkit', 'clonkar', 'clorkif']
  },
  "3a": {
    id: "3a", label: "Condition 3A", video: "Dynamic RSVP Vertical.mp4", questionText: "Which was the last word?",
    pseudowords: ['naxe', 'rolakis', 'fid', 'vepox', 'zola', 'tun', 'besar'],
    correctAnswer: "besar", choices: ['besar', 'tur', 'beson', 'ton']
  },
  "3b": {
    id: "3b", label: "Condition 3B", video: "Highlight Vertical.mp4", questionText: "Which was the second word?",
    pseudowords: ['tors', 'vupop', 'depi', 'fou', 'kelum', 'rus', 'tolikas'],
    correctAnswer: "vupop", choices: ['vupep', 'dopl', 'depi', 'vupop']
  },
  "3c": {
    id: "3c", label: "Condition 3C", video: "Flicker Vertical.mp4", questionText: "Which was the second-to-last word?",
    pseudowords: ['farpels', 'quim', 'nob', 'dralet', 'zoni', 'kep', 'tort'],
    correctAnswer: "kep", choices: ['zeni', 'kep', 'zoni', 'kop']
  },
  "3d": {
    id: "3d", label: "Condition 3D", video: "Vibrating Vertical.mp4", questionText: "Which was the last word?",
    pseudowords: ['kel', 'grovem', 'tuny', 'jor', 'flup', 'wern', 'dozor'],
    correctAnswer: "dozor", choices: ['duzor', 'werm', 'dozor', 'worn']
  },
  "4a": {
    id: "4a", label: "Condition 4A", video: "RSVP Static.mp4", questionText: "Which was the second word?",
    pseudowords: ['blin', 'zop', 'traf', 'dulzorf', 'merk', 'vife', 'jom'],
    correctAnswer: "zop", choices: ['trof', 'zop', 'zep', 'traf']
  },
  "4b": {
    id: "4b", label: "Condition 4B", video: "RSVP Highlight.mp4", questionText: "Which was the second-to-last word?",
    pseudowords: ['yun', 'selo', 'teldor', 'pikla', 'jog', 'narum', 'blez'],
    correctAnswer: "narum", choices: ['narum', 'blas', 'noram', 'blez']
  },
  "4c": {
    id: "4c", label: "Condition 4C", video: "RSVP Flicker.mp4", questionText: "Which was the second-to-last word?",
    pseudowords: ['drimake', 'jol', 'pezo', 'vartek', 'lun', 'zimols', 'cal'],
    correctAnswer: "zimols", choices: ['lum', 'zinals', 'zimols', 'lun']
  },
  "4d": {
    id: "4d", label: "Condition 4D", video: "Vibrating RSVP.mp4", questionText: "Which was the second word?",
    pseudowords: ['rontep', 'zil', 'tuflo', 'darplex', 'lon', 'meki', 'fub'],
    correctAnswer: "zil", choices: ['turfal', 'zil', 'tuflo', 'zif']
  }
};

// =============================
// === FRAMEWORKS IN ORDER ====
// =============================

export const trials_framework_1 = [
  TRIALS["1a"], TRIALS["2b"], TRIALS["3c"], TRIALS["4d"],
  TRIALS["2a"], TRIALS["3b"], TRIALS["4c"], TRIALS["1d"],
  TRIALS["3a"], TRIALS["4b"], TRIALS["1c"], TRIALS["2d"],
  TRIALS["4a"], TRIALS["1b"], TRIALS["2c"], TRIALS["3d"]
];

export const trials_framework_2 = [
  TRIALS["2a"], TRIALS["3b"], TRIALS["4c"], TRIALS["1d"],
  TRIALS["3a"], TRIALS["4b"], TRIALS["1c"], TRIALS["2d"],
  TRIALS["4a"], TRIALS["1b"], TRIALS["2c"], TRIALS["3d"],
  TRIALS["1a"], TRIALS["2b"], TRIALS["3c"], TRIALS["4d"]
];

export const trials_framework_3 = [
  TRIALS["3a"], TRIALS["4b"], TRIALS["1c"], TRIALS["2d"],
  TRIALS["4a"], TRIALS["1b"], TRIALS["2c"], TRIALS["3d"],
  TRIALS["1a"], TRIALS["2b"], TRIALS["3c"], TRIALS["4d"],
  TRIALS["2a"], TRIALS["3b"], TRIALS["4c"], TRIALS["1d"]
];

export const trials_framework_4 = [
  TRIALS["4a"], TRIALS["1b"], TRIALS["2c"], TRIALS["3d"],
  TRIALS["1a"], TRIALS["2b"], TRIALS["3c"], TRIALS["4d"],
  TRIALS["2a"], TRIALS["3b"], TRIALS["4c"], TRIALS["1d"],
  TRIALS["3a"], TRIALS["4b"], TRIALS["1c"], TRIALS["2d"]
];
