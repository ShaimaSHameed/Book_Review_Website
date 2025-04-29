// quiz.js

const quizData = {
    authorQuiz: [
        {
            question: "Who wrote 'The Hobbit'?",
            options: ["J.K. Rowling", "J.R.R. Tolkien", "George Orwell", "Mark Twain"],
            answer: "J.R.R. Tolkien"
        },
        {
            question: "Which author created 'Sherlock Holmes'?",
            options: ["Agatha Christie", "Arthur Conan Doyle", "Dan Brown", "Jules Verne"],
            answer: "Arthur Conan Doyle"
        },
        {
            question: "Who wrote 'Pride and Prejudice'?",
            options: ["Emily Bronte", "Jane Austen", "Charles Dickens", "Leo Tolstoy"],
            answer: "Jane Austen"
        }
    ],
    generalGK: [
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
            answer: "Pacific Ocean"
        },
        {
            question: "Who was the first person to walk on the Moon?",
            options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"],
            answer: "Neil Armstrong"
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            options: ["Oxygen", "Gold", "Osmium", "Iron"],
            answer: "Oxygen"
        }
    ],
    bookQuiz: [
        {
            question: "Which book starts with 'Call me Ishmael'?",
            options: ["Moby-Dick", "Great Expectations", "The Catcher in the Rye", "To Kill a Mockingbird"],
            answer: "Moby-Dick"
        },
        {
            question: "In which book does the character 'Atticus Finch' appear?",
            options: ["The Great Gatsby", "To Kill a Mockingbird", "Of Mice and Men", "Little Women"],
            answer: "To Kill a Mockingbird"
        },
        {
            question: "Which series features a school called 'Hogwarts'?",
            options: ["Percy Jackson", "Harry Potter", "The Hunger Games", "Twilight"],
            answer: "Harry Potter"
        }
    ]
};

let currentQuestion = 0;
let score = 0;
let selectedQuiz = "";

// DOM Elements
const quizContainer = document.getElementById("quiz-container");
const quizSelectionContainer = document.getElementById("quiz-selection-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const leaderboardContainer = document.getElementById("leaderboard-container");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const progressEl = document.getElementById("progress");
const finalScoreEl = document.getElementById("final-score");

// Show quiz selection
function showQuizSelection() {
    quizSelectionContainer.style.display = "block";
    quizContainer.style.display = "none";
    leaderboardContainer.style.display = "none";
}

// Start selected quiz
function startQuiz(quizType) {
    selectedQuiz = quizType;
    currentQuestion = 0;
    score = 0;
    quizSelectionContainer.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
}

// Show question
function showQuestion() {
    const quiz = quizData[selectedQuiz];
    const questionData = quiz[currentQuestion];
    questionEl.innerText = questionData.question;
    optionsEl.innerHTML = "";

    progressEl.innerText = `Question ${currentQuestion + 1} of ${quiz.length}`;

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(button, questionData.answer));
        optionsEl.appendChild(button);
    });

    nextBtn.style.display = "none";
}

// Handle answer
function selectAnswer(selectedButton, correctAnswer) {
    const allButtons = optionsEl.querySelectorAll("button");

    allButtons.forEach(button => {
        button.disabled = true;
        if (button.innerText === correctAnswer) {
            button.style.backgroundColor = "#4CAF50"; // Green
        } else {
            button.style.backgroundColor = "#f44336"; // Red
        }
    });

    if (selectedButton.innerText === correctAnswer) {
        score += 10;
    }

    nextBtn.style.display = "inline-block";
}

// Move to next
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    const quiz = quizData[selectedQuiz];
    if (currentQuestion < quiz.length) {
        showQuestion();
    } else {
        showLeaderboard();
    }
});

// Restart
restartBtn.addEventListener("click", () => {
    location.reload();
});

// Show leaderboard
function showLeaderboard() {
    quizContainer.style.display = "none";
    leaderboardContainer.style.display = "block";
    scoreEl.innerText = score;
    finalScoreEl.innerText = score;
}

document.getElementById("author-quiz").addEventListener("click", () => startQuiz("authorQuiz"));
document.getElementById("general-gk").addEventListener("click", () => startQuiz("generalGK"));
document.getElementById("book-quiz").addEventListener("click", () => startQuiz("bookQuiz"));

showQuizSelection();
