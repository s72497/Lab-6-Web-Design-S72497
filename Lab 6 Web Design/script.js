// Questions Array
const questions = [
    {
        question: "Who is the CEO of our System Analysis Design Trip?",
        options: ["Wafiy", "Amin", "Razin", "Raziq"],
        correct: 0,
        userAnswer: null
    },
    {
        question: "What is the total amount that each student should pay for the System Analysis Design Trip?",
        options: ["RM 100.00", "RM 20.00", "RM 50.00", "RM 10.00"],
        correct: 1,
        userAnswer: null
    },
    {
        question: "Who is one of the 'AJK Penginapan' for this System Analysis Design Trip?",
        options: ["Syahmi", "Nadhir", "Rafiq", "Aqil"],
        correct: 2,
        userAnswer: null
    },
    {
        question: "Is the System Analysis Design Trip allow student to switch slot with other person?",
        options: ["No", "Yes", "Maybe", "Probably "],
        correct: 0,
        userAnswer: null
    },
    {
        question: "When the System Analysis Design Trip will be depart?",
        options: ["Friday", "Saturday", "Wednesday", "Thursday"],
        correct: 3,
        userAnswer: null
    }
];

// Shuffle questions
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// Start timer
let timer = 60;
let intervalId;
function startTimer() {
    intervalId = setInterval(() => {
        timer--;
        document.getElementById("timer").innerHTML = `Time remaining: ${timer} seconds`;
        if (timer === 0) {
            clearInterval(intervalId);
            nextQuestion();
        }
    }, 1000);
}

// Display question
let currentQuestion = 0;
function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    questionElement.innerHTML = questions[currentQuestion].question;
    optionsElement.innerHTML = "";
    for (let i = 0; i < questions[currentQuestion].options.length; i++) {
        const optionElement = document.createElement("li");
        const inputElement = document.createElement("input");
        inputElement.type = "radio";
        inputElement.name = "option";
        inputElement.value = i;
        const labelElement = document.createElement("label");
        labelElement.innerHTML = questions[currentQuestion].options[i];
        optionElement.appendChild(inputElement);
        optionElement.appendChild(labelElement);
        optionsElement.appendChild(optionElement);
    }
}

// Function to check answer
function checkAnswer() {
    const userAnswer = document.querySelector("input[name='option']:checked");
    if (userAnswer) {
        const correctAnswer = questions[currentQuestion].correct;
        const feedbackElement = document.getElementById("feedback");
        if (userAnswer.value == correctAnswer) {
            feedbackElement.innerHTML = "Correct!";
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.innerHTML = `Incorrect. The correct answer is ${correctAnswer}.`;
            feedbackElement.style.color = "red";
        }
        questions[currentQuestion].userAnswer = userAnswer.value;
        updateScore();
        return true;
    } else {
        alert("Please select an answer.");
        return false;
    }
}

// Function to update score
function updateScore() {
    const scoreElement = document.getElementById("score");
    let score = 0;
    for (let i = 0; i <= currentQuestion; i++) {
        if (questions[i].correct == questions[i].userAnswer) {
            score++;
        }
    }
    scoreElement.innerHTML = `Your current score is ${score} out of ${currentQuestion + 1}`;
    scoreElement.style.display = "block";
}

// Next question
function nextQuestion() {
    clearInterval(intervalId);
    timer = 60;
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        startTimer();
    } else {
        // Display score
        const scoreElement = document.getElementById("score");
        let score = 0;
        let scoreHtml = "";
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].correct == questions[i].userAnswer) {
                score++;
                scoreHtml += `Question ${i + 1}: Correct<br>`;
            } else {
                scoreHtml += `Question ${i + 1}: Incorrect<br>`;
            }
        }
        scoreHtml += `Your final score is ${score} out of ${questions.length}`;
        scoreElement.innerHTML = scoreHtml;
        // Hide question section
        document.getElementById("question-section").style.display = "none";
        // Show score section
        document.getElementById("score-section").style.display = "block";
    }
}

// Start quiz
function startQuiz() {
    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Event listeners
document.getElementById("submit-btn").addEventListener("click", () => {
    if (checkAnswer()) {
        questions[currentQuestion].userAnswer = document.querySelector("input[name='option']:checked").value;
    }
    nextQuestion();
});

// Start quiz
startQuiz();