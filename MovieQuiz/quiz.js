//select all elements 
const start = document.getElementById("start")
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

//create our questions 
let questions = [
    {
        question : "Who directed Titanic, Avatar and The Terminator?",
        imgSrc : "images/titanic.jpg",
        choiceA : "James Cameron",
        choiceB : "Steve Spielberg",
        choiceC : "Martin Scorsese",
        correct : "A"
    },
    {
        question : "What year was the first Toy Story film released in cinemas?",
        imgSrc : "images/toystory.jpg",
        choiceA : "2000",
        choiceB : "1998",
        choiceC : "1995",
        correct : "C"
    },
    {
        question : "Meryl Streep won a Best Actress BAFTA for which 2011 political drama?",
        imgSrc : "images/MerylStreep.jpg",
        choiceA : "The Bridges of Madison County",
        choiceB : "The Iron Lady",
        choiceC : "Out of Africa Karen",
        correct : "B"
    },
    {
        question : "For which film did Sandra Bullock win her Oscar?",
        imgSrc : "images/SandraBullock.jpg",
        choiceA : "The Blind Side",
        choiceB : "Bird Box",
        choiceC : "The Heat",
        correct : "A"
    },
    {
        question : "What does Tom Hanks compare life to in Forest Gump?",
        imgSrc : "images/forestgump.jpg",
        choiceA : "The roses of life",
        choiceB : "A box of candies",
        choiceC : "A box of chocolates",
        correct : "C"
    }
];

// create some variables 
const lastQuestion = questions.length - 1;  
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10s 
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

//start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); //1000ms =1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; 
    qIndex++){
        progress.innerHTML += "<div class='prog' id="+
        qIndex +"></div>";
    }
}

// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit +
        "px";
        count++
    }else{
        count = 0;
        // change progress color to red 
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score 
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green 
        answerIsCorrect();
    }else{
        // answer is wrong 
        // change progress color to red 
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
    }else{
        // end the quiz and show the score 
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct 
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is wrong 
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calcuate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * 
        score/questions.length);

    // choose the image based on the scorePerCent 
    let img = (scorePerCent >= 80) ? "images/bigsmile.png" : 
              (scorePerCent >= 60) ? "images/smile.png" : 
              (scorePerCent >= 40) ? "images/neutral.png" : 
              (scorePerCent >= 20) ? "images/sad.png" : 
              "images/crysad.png";
    
    scoreDiv.innerHTML = "<img src=" + img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";      
}




