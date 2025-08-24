const questions = [
  { q: "2 + 2 = ?", options: ["3", "4", "5", "6"], answerIndex: 1 },
  {
    q: "Sun rises in the ...",
    options: ["North", "South", "East", "West"],
    answerIndex: 2,
  },
  {
    q: "Color of the sky on a clear day?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answerIndex: 0,
  },
  {
    q: "HTML stands for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "High Text Markup Language",
    ],
    answerIndex: 1,
  },
  {
    q: "Which HTML tag shows an image?",
    options: ["&lt;img&gt;", "&lt;image&gt;", "&lt;pic&gt;", "&lt;photo&gt;"],
    answerIndex: 0,
  },
  {
    q: "CSS property to change text color?",
    options: ["font-size", "color", "background", "display"],
    answerIndex: 1,
  },
  {
    q: "JS: Add item at end of array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answerIndex: 0,
  },
  {
    q: "JS: Strict equality operator?",
    options: ["==", "=", "===", "!=="],
    answerIndex: 2,
  },
  {
    q: "Which one is a web browser?",
    options: ["Linux", "Chrome", "Node.js", "Python"],
    answerIndex: 1,
  },
  {
    q: "Full form of URL?",
    options: [
      "Uniform Resource Locator",
      "Universal Resource Link",
      "Unified Resource Locator",
      "Uniform Resource Link",
    ],
    answerIndex: 0,
  },
  {
    q: "HTTP status for OK?",
    options: ["200", "301", "404", "500"],
    answerIndex: 0,
  },
  {
    q: "Refresh page (Windows) shortcut?",
    options: ["Ctrl + R", "Ctrl + S", "Ctrl + C", "Ctrl + V"],
    answerIndex: 0,
  },
];

const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const submitBtn = document.querySelector("#submitBtn");
const restartBtn = document.querySelector("#restartBtn");

let question = 0;
let score = 0;
let timerBadge = 60;

// display questions
function showQuestions() {
  const questionText = document.querySelector("#questionText");
  questionText.textContent = `Question: ${questions[question].q}`;
}

// Function of if ANSWER is CORRECT or WRONG
function showAnswer(val) {
  const reviewList = document.querySelector("#reviewList");
  if (val === questions[question].answerIndex) {
    const li = document.createElement("li");
    li.textContent = questions[question].options[val];
    reviewList.appendChild(li);
    score++;
  }

  const inputs = document.querySelectorAll("#optionsForm input");
  inputs.forEach((input) => {
    input.setAttribute("disabled", "disabled");
  });
}

// display options
function showOptions() {
  const optionsForm = document.querySelector("#optionsForm");
  optionsForm.innerHTML = "";

  for (let i = 0; i < questions[question].options.length; i++) {
    let option = document.createElement("div");
    option.innerHTML = `
      <label class="option">
        <input type="radio" name="answer" value="${i} " />
        <span class="text">${questions[question].options[i]}</span>
      </label>
    `;
    optionsForm.appendChild(option);

    option.querySelector("input").addEventListener("click", (e) => {
      showAnswer(Number(e.target.value));
    });
  }
}

showOptions();
showQuestions();

// Next button to show Next questions and answers
nextBtn.addEventListener("click", () => {
  question++;
  timerBadge = 60;

  if (question === questions.length) question = 0;

  if (question === 0) {
    prevBtn.setAttribute("disabled", "disabled");
    submitBtn.setAttribute("disabled", "disabled");
    restartBtn.setAttribute("hidden", "hidden");
  } else {
    prevBtn.removeAttribute("disabled", "disabled");
    submitBtn.removeAttribute("disabled", "disabled");

    restartBtn.removeAttribute("hidden", "hidden");
  }

  showQuestions();
  showOptions();
});

// display previous questions and answers
function prevQuestion() {
  question--;
  if (question === 0) {
    prevBtn.setAttribute("disabled", "disabled");
    submitBtn.setAttribute("disabled", "disabled");
    restartBtn.setAttribute("hidden", "hidden");
  }
  showQuestions();
  showOptions();
}

//Previous button to show previous questions and answers
prevBtn.addEventListener("click", prevQuestion);

function showResult() {
  const scoreBadge = document.querySelector("#scoreBadge");
  const resultSummary = document.querySelector("#resultSummary");

  const card = document.querySelector(".hidden");
  card.style.display = "block";
  scoreBadge.textContent = `Score :${score}`;
  resultSummary.textContent = `You scored ${score}/${questions.length}`;
}

submitBtn.addEventListener("click", showResult);

function hideResult() {
  const card = document.querySelector(".hidden");
  card.style.display = "none";
  scoreBadge.textContent = `Score :${score}`;
  resultSummary.textContent = `You scored ${score}/${questions.length}`;
}

function restartQuiz() {
  if (question > 0 || score > 0) {
    question = 0;
    score = 0;
    timerBadge = 60;
    showQuestions();
    showOptions();
    hideResult();

    prevBtn.setAttribute("disabled", "disabled");
    submitBtn.setAttribute("disabled", "disabled");
    restartBtn.setAttribute("hidden", "hidden");
  }
}

restartBtn.addEventListener("click", restartQuiz);

const timerElement = document.querySelector("#timerBadge");

function setTimer() {
  const int = setInterval(() => {
    timerElement.textContent = `Timer: ${timerBadge}`;

    if (timerBadge === 0) {
      question++;

      if (question >= questions.length) {
        clearInterval(int);
        question = 0;
      }

      showQuestions();
      showOptions();
      timerBadge = 60;
    }

    timerBadge--;
  }, 1000);
}

setTimer();
