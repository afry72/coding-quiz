//var for dom elements
//vars for main part of quiz
var startButton = document.getElementById("start");
var timer = document.getElementById("timer");
var quiz = document.getElementById("questions");
var head = document.getElementById("head");
var answer = document.getElementById("answer");
var currentScore = document.getElementById("score");
var timeHeader = document.getElementById("timeHeader");
var scoreHeader = document.getElementById("scoreHeader");
var startParagraph = document.getElementById("startParagraph");
var currentIndex = 0;
var recentScore = 0;

//vars for ending the game
var gameEndScreen = document.getElementById("endScreen");
var finalScore = document.getElementById("finalScore");
var submit = document.getElementById("submitButton");

//vars for high score screen
var highScoreScreen = document.getElementById("highScoreScreen");
var scoreList = document.getElementById("scoreList");
var clearScore = document.getElementById("clearScore");
var resetQuiz = document.getElementById("resetQuiz");

// timer var
// score variable
var score = 0;
var time = 75;

//storing scores inside local storage
var storageScore = localStorage.getItem("storageScore");
var storageInitials = localStorage.getItem("storageInitials");
var scoreList = document.getElementById("scoreList");

//Questions array
var questions = [
    {
        header: "Commonly used date types DO NOT include:",
        answers: ["A) Strings","B) Booleans","C) Alerts","D) Numbers"],
        correctAnswer: "C) Alerts",
    },
    {
        header: "The condition in an if / else statement is enclosed within",
        answers: ["A) Quotes","B) Curly Backets","C) Parentheses","D) Square Brackets"],
        correctAnswer: "C) Parentheses",
    },
    {
        header: "Arrays in javascript can be used to store",
        answers: ["A) Numbers and Strings","B) Other arrays","C) Booleans","D) All of the above"],
        correctAnswer: "D) All of the above",
    },
    {
        header: "String values must be enclosed within what when being assigned to variables",
        answers: ["A) Commas","B) Curly Brackets","C) Quotes","D) Parentheses"],
        correctAnswer: "C) Quotes",
    },
    {
        header: "A very useful tool for development and debugging for printing content to the debugger is",
        answers: ["A) JavaScript","B) Terminal/Bash","C) For loops","D) Console Log"],
        correctAnswer: "D) Console Log",
    },


];

//function to create a timer when start button is hit
function gameTime () {
    var refreshTimer = setInterval(timeIndex, 1000);

    function timeIndex () {
        time = time -1;
        timer.textContent = time;
        console.log(time);
        if (time <= 0) {
            endGame ();
            console.log("end of game");
            clearInterval(refreshTimer);
        }
    }

}

//function that sets entire website into motion
function startGame () {
    generateQuestions ();
    timer.textContent = time;
    currentScore.textContent = score;
    startButton.setAttribute("class", "hide");
    startParagraph.setAttribute("class", "hide");
    timeHeader.removeAttribute("class", "none");
    scoreHeader.removeAttribute("class", "none");
    gameTime ();

}

//function to check if the chosen answer is correct and then effects time and score accordingly
function nextQuestion (event) {
    var clickedAnswer = event.target.textContent;
    console.log("click", clickedAnswer);

    //check to see if answer is right
    var rightAnswer = questions[currentIndex].correctAnswer;
    console.log("right", rightAnswer);
    for (var i=0; i<rightAnswer.length; i++) {
        //var answerCheck = 
    }

    if (clickedAnswer == rightAnswer) {
       score = score+20;
       currentScore.textContent = score;
    } else {
        time = time-10;
        timer.textContent = time;
    }

    console.log(score)

    if (currentIndex >= (questions.length-1)) {
        endGame();
    }
    //update score function
    currentIndex++;
    if (time > 0){
        generateQuestions(); 
    } else {
        endGame();
    }


}

//function that ends the game and brings you into the end screen
function endGame () {
    time = 0;
    console.log("entered endgame")
    timeHeader.setAttribute("class", "hide");
    scoreHeader.setAttribute("class", "hide");
    quiz.setAttribute("class", "hide");
    finalScore.textContent = score;
    gameEndScreen.removeAttribute("class", "none");

    
}

//function that provides questions from the questions array for the quiz to use
function generateQuestions () {
    var displayedQuestion = questions[currentIndex];

    answer.innerHTML = "";

    head.textContent = displayedQuestion.header;

    var displayedQuestionAnswers = displayedQuestion.answers;
    for (var i=0; i<displayedQuestionAnswers.length; i++) {
        var current = displayedQuestionAnswers[i];
        var choiceButton = document.createElement("button");
        choiceButton.textContent = current;
        //add a click event to each button press to trigger next question 
        choiceButton.onclick = nextQuestion
        answer.appendChild(choiceButton);

    }

}

//function that takes the provided initials and score and embeds them in local storage
function sendToStorage () {
    console.log("submitted");
    gameEndScreen.setAttribute("class", "hide");
    highScoreScreen.removeAttribute("class", "none");
    var initialsInput = document.getElementById("initialsText").value;
    console.log("info logged", initialsInput);
    //if score is greater than stored score then replace stored score
    var testScoreData = JSON.parse(localStorage.getItem('highScoreStorage'));
    if (testScoreData == null || score > testScoreData.score) {
        var highScoreStorage = {score, initialsInput};
        localStorage.setItem('highScoreStorage', JSON.stringify(highScoreStorage));
    }
   // localStorage.setItem(score, storageScore);
    //localStorage.setItem(initialsInput, storageInitials);
    renderStorage();

}

function renderStorage() {
    var highScoreData = JSON.parse(localStorage.getItem('highScoreStorage'));
    console.log(highScoreData);
    //highScoreData.score
    scoreList.textContent = highScoreData.score+highScoreData.initialsInput;
} 

//function to start quiz over
function refreshQuiz () {
    console.log("refresh quiz");
}

//function that resets score board
function refreshScore () {
    console.log("refreshScore");
    localStorage.removeItem('highScoreStorage');
}

// event listeners that execute the various function
clearScore.onclick = refreshScore;
resetQuiz.onclick = refreshQuiz;
submit.onclick = sendToStorage;
startButton.onclick = startGame;