export const finalQuestions = [
  {
    type: "multiple",
    text: "What is your age group?",
    options: ["18–24", "25–34", "35–44", "45–54", "55–64", "65+"]
  },
  {
    type: "multipleWithOptional",
    text: "What best describes your vision?",
    options: ["Myopic (nearsighted)", "Normal vision", "Not sure", "Other"],
    optionalPrompt: "Please specify (optional):"
  },
  {
    type: "short",
    text: "If myopic, what is your degree of correction? (e.g. -2.50). If unknown, write 'I don't know'."
  },
  {
    type: "multiple",
    text: "Are you wearing your prescription glasses or lenses?",
    options: ["Yes", "No"]
  },
  {
    type: "multipleVideo",
    text: "In which movement type did you think you perform best?",
    options: [
      { label: "Static Rapid Serial Visual Presentation (RSVP)", video: "Q_RSVP.mp4" },
      { label: "Dynamic Rapid Serial Visual Presentation (RSVP)", video: "Q_Dynamic RSVP.mp4" },
      { label: "Highlight", video: "Q_Highlight.mp4" },
      { label: "Flicker", video: "Q_Flicker.mp4" },
      { label: "Vibration", video: "Q_Vibration.mp4" }
    ]
  },
  {
    type: "multipleVideo",
    text: "In which movement type did you think you perform worst?",
    options: [
      { label: "Static Rapid Serial Visual Presentation (RSVP)", video: "Q_RSVP.mp4" },
      { label: "Dynamic Rapid Serial Visual Presentation (RSVP)", video: "Q_Dynamic RSVP.mp4" },
      { label: "Highlight", video: "Q_Highlight.mp4" },
      { label: "Flicker", video: "Q_Flicker.mp4" },
      { label: "Vibration", video: "Q_Vibration.mp4" }
    ]
  },
  {
    type: "slider",
    text: "Did the task feel easier over time?",
    labels: ["Not at all", "Slightly", "Neutral", "Mostly", "Definitely"]
  },
  {
    type: "slider",
    text: "Compared to static text, how much did you like the movement?",
    labels: ["Disliked it", "Somewhat disliked", "Neutral", "Somewhat liked", "Loved it"]
  },
  {
    type: "slider",
    text: "Compared to static text, did you think that the movement hold your attention better?",
    labels: ["Not at all", "A little", "Neutral", "Quite a bit", "Much more"]
  },
  {
    type: "slider",
    text: "How difficult was the test overall?",
    labels: ["Very easy", "Easy", "Neutral", "Hard", "Very challenging"]
  },
  {
    type: "short",
    text: "Do you have any additional feedback or thoughts?"
  }
];
