const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"],
        answer: 1
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheet", "Creative Style System", "Colorful Style Script"],
        answer: 0
    },
    {
        question: "What is the full form of JS?",
        options: ["Java Source", "Java Style", "JavaScript", "JustScript"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

// Elements
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const questionCount = document.getElementById("question-count");
const nextBtn = document.querySelector(".next-btn");
const timerText = document.getElementById("time");

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    timerText.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft;
        if (timeLeft === 0) nextQuestion();
    }, 1000);

    questionText.textContent = questions[currentQuestion].question;
    optionsList.innerHTML = "";
    questions[currentQuestion].options.forEach((option, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option;
        div.addEventListener("click", () => checkAnswer(index));
        optionsList.appendChild(div);
    });

    questionCount.textContent = `${currentQuestion + 1} of ${questions.length} Questions`;
}

function checkAnswer(index) {
    if (index === questions[currentQuestion].answer) score++;
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        window.location.href = "result.html";
        localStorage.setItem("quizScore", score);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("result.html")) {
        document.getElementById("score-text").textContent = `You got ${localStorage.getItem("quizScore")} out of ${questions.length}`;
    } else {
        loadQuestion();
    }
});
