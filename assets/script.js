//var for dom elements
var startButton = document.getElementById("start")
var timer = document.getElementById("timer")
var quiz = document.getElementById("questions")
var head = document.getElementById("head")
var answer = document.getElementById("answer")
var currentIndex = 0

// timer var
// score variable
var score = 0
var time = 300

var questions = [
    {
        header: "what is todays date",
        answers: ["a","b","c","d"],
        correctAnswer: "c",
    },
    {
        header: "what is todays date2",
        answers: ["a","b","c","d"],
        correctAnswer: "c",
    },
    {
        header: "what is todays dat3e",
        answers: ["a","b","c","d"],
        correctAnswer: "c",
    },
    {
        header: "what is todays dat4e",
        answers: ["a","b","c","d"],
        correctAnswer: "c",
    },
    {
        header: "what is todays dat5e",
        answers: ["a","b","c","d"],
        correctAnswer: "c",
    },


];

//timer score event listener high score
//event listener
function startGame () {
    //hide start button
    //generate questions
    //generate answers
    generateQuestions ();
    //start timer

}

function nextQuestion (event) {
    var clickedAnswer = event.target;
    console.log(clickedAnswer);
    //check to see if answer is right
    //update score function
    currentIndex++;
    if (time > 0){
        generateQuestions(); 
    } else {
        endGame();
    }
}

function endGame () {
    //when game is over calculate score and save to local storage
}

function generateQuestions () {
    var displayedQuestion = questions[currentIndex];
    console.log(displayedQuestion);
    console.log(head);
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