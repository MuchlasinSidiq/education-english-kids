function speakWord(word) {
  const speech = new SpeechSynthesisUtterance(word);
  speech.lang = "en-US";
  speech.rate = 0.85;
  speech.pitch = 1.1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

/* =========================
   LISTENING PRACTICE
========================= */

const listeningQuestions = [
  {
    word: "Apple",
    options: ["Dog", "Apple", "Cat", "Book"],
    answer: "Apple"
  },
  {
    word: "Dog",
    options: ["Elephant", "Dog", "Banana", "Blue"],
    answer: "Dog"
  },
  {
    word: "Book",
    options: ["Cat", "Red", "Book", "Apple"],
    answer: "Book"
  },
  {
    word: "Elephant",
    options: ["Dog", "Blue", "Elephant", "Banana"],
    answer: "Elephant"
  },
  {
    word: "Blue",
    options: ["Blue", "Red", "Book", "Cat"],
    answer: "Blue"
  }
];

let currentListening = 0;
let listeningScore = 0;

function loadListeningQuestion() {
  const questionBox = document.getElementById("listeningQuestion");
  const optionsBox = document.getElementById("listeningOptions");
  const feedback = document.getElementById("listeningFeedback");

  if (!questionBox || !optionsBox) return;

  const q = listeningQuestions[currentListening];

  feedback.textContent = "";

  questionBox.innerHTML = `
    <h2>Question ${currentListening + 1} of ${listeningQuestions.length}</h2>
    <p>Listen carefully and select the correct answer.</p>
    <button class="btn primary" onclick="speakWord('${q.word}')">▶ Play Audio</button>
  `;

  optionsBox.innerHTML = q.options.map(option => `
    <button class="option-btn" onclick="checkListening('${option}')">${option}</button>
  `).join("");
}

function checkListening(answer) {
  const feedback = document.getElementById("listeningFeedback");
  const correct = listeningQuestions[currentListening].answer;

  if (answer === correct) {
    listeningScore++;
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "#46a302";
    speakWord("Correct");
  } else {
    feedback.textContent = "❌ Incorrect!";
    feedback.style.color = "#e03131";
    speakWord("Try again");
  }

  currentListening++;

  setTimeout(() => {
    if (currentListening < listeningQuestions.length) {
      loadListeningQuestion();
    } else {
      showListeningResult();
    }
  }, 1000);
}

function showListeningResult() {
  const percentage = Math.round((listeningScore / listeningQuestions.length) * 100);

  document.getElementById("listeningQuestion").innerHTML = `
    <h2>🎉 Listening Practice Completed!</h2>
    <p>Your listening score is ${listeningScore}/${listeningQuestions.length}</p>
  `;

  document.getElementById("listeningOptions").innerHTML = "";

  document.getElementById("listeningFeedback").innerHTML = `
    🎯 Percentage: ${percentage}%<br>
    ${percentage >= 75 ? "Excellent listening!" : "Good try, keep practicing!"}
    <br><br>
    <button class="btn primary" onclick="restartListening()">Restart Listening</button>
  `;
}

function restartListening() {
  currentListening = 0;
  listeningScore = 0;
  loadListeningQuestion();
}

/* =========================
   QUIZ
========================= */

const quizData = [
  {
    emoji: "🐱",
    question: "What animal is this?",
    options: ["Dog", "Cat", "Elephant", "Lion"],
    answer: "Cat"
  },
  {
    emoji: "🐶",
    question: "What animal is this?",
    options: ["Dog", "Cat", "Book", "Apple"],
    answer: "Dog"
  },
  {
    emoji: "🐘",
    question: "What animal is this?",
    options: ["Elephant", "Dog", "Lion", "Cat"],
    answer: "Elephant"
  },
  {
    emoji: "🍎",
    question: "What fruit is this?",
    options: ["Banana", "Apple", "Orange", "Book"],
    answer: "Apple"
  },
  {
    emoji: "🍌",
    question: "What fruit is this?",
    options: ["Apple", "Dog", "Banana", "Cat"],
    answer: "Banana"
  },
  {
    emoji: "🔴",
    question: "What color is this?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answer: "Red"
  },
  {
    emoji: "🔵",
    question: "What color is this?",
    options: ["Red", "Blue", "Black", "White"],
    answer: "Blue"
  },
  {
    emoji: "📚",
    question: "What object is this?",
    options: ["Pencil", "Chair", "Book", "Table"],
    answer: "Book"
  },
  {
    emoji: "✏️",
    question: "What object is this?",
    options: ["Book", "Pencil", "Apple", "Dog"],
    answer: "Pencil"
  },
  {
    emoji: "🦁",
    question: "What animal is this?",
    options: ["Elephant", "Lion", "Dog", "Cat"],
    answer: "Lion"
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
  const questionBox = document.getElementById("quizQuestion");
  const optionsBox = document.getElementById("quizOptions");

  if (!questionBox || !optionsBox) return;

  const q = quizData[currentQuestion];

  questionBox.innerHTML = `
    <h2>${q.question}</h2>
    <div class="quiz-emoji">${q.emoji}</div>
    <p>Question ${currentQuestion + 1} of ${quizData.length}</p>
  `;

  optionsBox.innerHTML = q.options.map(option => `
    <button class="option-btn" onclick="checkAnswer('${option}')">${option}</button>
  `).join("");
}

function checkAnswer(selected) {
  const correct = quizData[currentQuestion].answer;

  if (selected === correct) {
    score++;
    speakWord("Correct");
  } else {
    speakWord("Wrong answer");
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
}

function showResult() {
  const percentage = Math.round((score / quizData.length) * 100);

  document.getElementById("quizQuestion").innerHTML = `
    <h2>Quiz Completed!</h2>
    <div class="quiz-emoji">🏆</div>
  `;

  document.getElementById("quizOptions").innerHTML = "";

  document.getElementById("quizResult").innerHTML = `
    ⭐ Score: ${score}/${quizData.length}<br>
    🎯 Percentage: ${percentage}%<br>
    ${percentage >= 75 ? "Excellent Job!" : "Good Try!"}
    <br><br>
    <button class="btn primary" onclick="restartQuiz()">Restart Quiz</button>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quizResult").innerHTML = "";
  loadQuiz();
}

/* =========================
   PAGE LOADER
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadQuiz();
  loadListeningQuestion();
});