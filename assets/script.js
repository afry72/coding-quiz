//var for dom elements
var startButton = document.getElementById("start");
var timer = document.getElementById("timer");
var quiz = document.getElementById("questions");
var head = document.getElementById("head");
var answer = document.getElementById("answer");
var currentScore = document.getElementById("score");
var currentIndex = 0;
var recentScore = 0;

// timer var
// score variable
var score = 0;
var time = 30;

var questions = [
    {
        header: "Test 1",
        answers: ["A)","B)","C)","D)"],
        correctAnswer: "C)",
    },
    {
        header: "Test 2",
        answers: ["A)","B)","C)","D)"],
        correctAnswer: "a",
    },
    {
        header: "Test 3",
        answers: ["A)","B)","C)","D)"],
        correctAnswer: "d",
    },
    {
        header: "Test 4",
        answers: ["A)","B)","C)","D)"],
        correctAnswer: "b",
    },
    {
        header: "Test 5",
        answers: ["A)","B)","C)","D)"],
        correctAnswer: "a",
    },


];

//setInterval(gameTime, 3000);

function gameTime () {
    var refreshTimer = setInterval(timeIndex, 1000);

    function timeIndex () {
        time = time -1;
        timer.textContent = time;
        console.log(time);
        if (time <= 0) {
            // clearInterval(timeIndex)
            endGame ();
            console.log("end of game");
            clearInterval(refreshTimer);
        }
    }

    /*if (time <= 0) {
        clearInterval(refreshTimer);
    } */

}

//timer score event listener high score
//event listener
function startGame () {
    //hide start button
    generateQuestions ();
    //start timer
    //hideButton ();
    startButton.setAttribute("class", "hide");
    gameTime ();

}

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
       score++;
       currentScore.textContent = score;
    } else {
        time = time-5;
        timer.textContent = time;
    }

    console.log(score)

    //update score function
    currentIndex++;
    if (time > 0){
        generateQuestions(); 
    } else {
        endGame();
    }
}

function endGame () {
    startButton.removeAttribute("class", "none");
    //when game is over calculate score and save to local storage
    //hide question and start button
}

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


startButton.onclick = startGame;