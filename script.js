const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    },
    // {
    //     question: "Which HTML tag is used for creating a hyperlink?",
    //     choices: ["<link>", "<a>", "<href>", "<p>"],
    //     answer: "<a>"
    //   },
    //   {
    //     question: "In JavaScript, what is the purpose of the 'typeof' operator?",
    //     choices: ["To check if a variable is defined", "To check the data type of a variable", "To assign a variable a specific type", "To declare a new variable"],
    //     answer: "To check the data type of a variable"
    //   },
    //   {
    //     question: "What is the purpose of the 'onmouseover' event in HTML?",
    //     choices: ["To detect when the mouse is clicked", "To detect when the mouse moves over an element", "To detect when a key is pressed", "To detect when the page is loaded"],
    //     answer: "To detect when the mouse moves over an element"
    //   },
    //   {
    //     question: "Which of the following is NOT a valid way to declare a variable in JavaScript?",
    //     choices: ["let", "const", "var", "variable"],
    //     answer: "variable"
    //   },
    //   {
    //     question: "What does CSS stand for?",
    //     choices: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet", "Colorful Style Sheet"],
    //     answer: "Cascading Style Sheet"
    //   },
    //   {
    //     question: "Which CSS property is used to change the color of text?",
    //     choices: ["color", "text-color", "font-color", "background-color"],
    //     answer: "color"
    //   },
    //   {
    //     question: "In JavaScript, what does the 'JSON' acronym stand for?",
    //     choices: ["JavaScript Object Notation", "JavaScript Object Naming", "JavaScript Orderly Notation", "JavaScript Object Node"],
    //     answer: "JavaScript Object Notation"
    //   },
    //   {
    //     question: "What is the purpose of the 'appendChild' method in JavaScript?",
    //     choices: ["To remove an element from the DOM", "To add a new child element to an existing element", "To change the text content of an element", "To create a new element"],
    //     answer: "To add a new child element to an existing element"
    //   },
    //   {
    //     question: "Which of the following is a correct way to comment out a line in JavaScript?",
    //     choices: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */", "(* This is a comment *)"],
    //     answer: "// This is a comment"
    //   },
    //   {
    //     question: "What is the purpose of the 'localStorage' object in JavaScript?",
    //     choices: ["To store session data on the server", "To store data locally on the client's browser", "To create a local variable", "To connect to a database"],
    //     answer: "To store data locally on the client's browser"
    //   }
];

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

const playBeepSound = () => {
    const audio = new Audio('beep-08b.mp3');
    audio.play();
};

const stopBeepSound = () => {
    
};

const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft <= 3) {
            playBeepSound();
        }

        if (timeLeft === 0) {
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if (confirmUser) {
                timeLeft = 15;
                startQuiz();
            } else {
                startBtn.style.display = "block";
                container.style.display = "none";
                stopBeepSound();
                return;
            }
        }
    };

    timerID = setInterval(countDown, 1000);
};

const stopTimer = () => {
    clearInterval(timerID);
};

const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            } else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
};

const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        displayAlert("Correct Answer!");
        score++;
    } else {
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
};

const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
};

const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
};

const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
};

const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
};

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    } else {
        checkAnswer();
    }
});