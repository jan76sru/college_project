let questions = [];
let currentQuestion = 0;
let score = 0;
let startTime;
let timerInterval;

function startQuiz() {
    const numQuestions = parseInt(document.getElementById("numQuestions").value);
    const numRange = parseInt(document.getElementById("numRange").value);
    const operation = document.getElementById("operations").value;
    const timer = parseInt(document.getElementById("timer").value);

    questions = generateQuestions(numQuestions, numRange, operation);
    currentQuestion = 0;
    score = 0;
    document.getElementById("settings").style.display = "none";
    document.getElementById("questionnaire").style.display = "block";
    startTime = Date.now();
    
    timerInterval = setInterval(() => {
        const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
        if (timeElapsed >= timer) {
            alert("Time's up!");
            endQuiz();
        }
    }, 1000);
    
    displayQuestion();
}

function generateQuestions(numQuestions, numRange, operation) {
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
        const num1 = Math.floor(Math.random() * numRange) + 1;
        const num2 = Math.floor(Math.random() * numRange) + 1;
        let question, answer;
        switch (operation) {
            case "add":
                question = `${num1} + ${num2}`;
                answer = num1 + num2;
                break;
            case "subtract":
                question = `${num1} - ${num2}`;
                answer = num1 - num2;
                break;
            case "multiply":
                question = `${num1} * ${num2}`;
                answer = num1 * num2;
                break;
            case "divide":
                question = `${num1} / ${num2}`;
                answer = (num1 / num2).toFixed(2);
                break;
        }
        questions.push({ question, answer });
    }
    return questions;
}

function displayQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("questionText").innerText = questions[currentQuestion].question;
    } else {
        endQuiz();
    }
}

function submitAnswer() {
    const userAnswer = parseFloat(document.getElementById("answerInput").value);
    const correctAnswer = questions[currentQuestion].answer;
    if (userAnswer === correctAnswer) {
        score++;
    }
    currentQuestion++;
    document.getElementById("answerInput").value = "";
    displayQuestion();
}

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("questionnaire").style.display = "none";
    document.getElementById("result").style.display = "block";
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("scoreText").innerText = `Your score: ${score}/${questions.length}`;
    document.getElementById("timeText").innerText = `Time taken: ${timeElapsed} seconds`;
}
