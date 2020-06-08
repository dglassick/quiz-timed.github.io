var startButton = document.getElementById("startButton");
var startScreen = document.getElementById('loadPage')
var startScreenEl = document.getElementById("startScreen");
var timerEl = document.getElementById("time");
var quizQuestion = document.getElementById("quiz-question");
var quizAnswers = document.getElementById("quiz-answers");
var finalScore = document.getElementById('finalScore');
var quizBody = document.getElementById('quiz-body');
var questionTitle = document.getElementById("question-title");
var answerCheck = document.getElementById('answers-check');
var finalScorePage = document.getElementById('finalScorePage')
var submitInitials = document.getElementById('submitInitials')
var highscoreStorage = document.getElementById('highscoreStorage')
var timeCounter = 180
var timeCountdown = -1
var count = 0

function beginQuiz(){
    quizAnswers.innerHTML = "";
    answerCheck.innerHTML = "";

    quizQuestion.textContent = questionArray[count].title;

    for(var i = 0; i< questionArray[count].options.length; i++){
        var list = document.createElement('button')
        list.textContent = questionArray[count].options[i];
        list.setAttribute('class', 'btn btn-primary')
        list.setAttribute('data', questionArray[count].options[i]);
        list.setAttribute('answer', questionArray[count].answer);
        quizAnswers.appendChild(list)
    }


}

quizAnswers.addEventListener('click', function(){
    event.preventDefault();

    if(event.target.getAttribute('data') === event.target.getAttribute('answer')){
        console.log(event.target.getAttribute('data'))
        console.log(event.target.getAttribute('answer'));
        answerCheck.textContent = "You're right!";
        checkQuestionsRemaining()
    }else{
        timeCounter = timeCounter - 20;
        answerCheck.textContent = "You're wrong!"
        checkQuestionsRemaining()
    }
})

function checkQuestionsRemaining(){

    count++;
    if(count === questionArray.length){
    clearInterval(timeCountdown)
    showScore();
    } else{
        setTimeout( () => { beginQuiz ()}, 350)
    }
}


function showHighscores(){
    var scores = localStorage.getItem('score')
    var initials = localStorage.getItem('initials')
}

function showScore(){

    quizBody.style.display = 'none';
    finalScorePage.style.display = 'block';

    if(timeCounter<0){
        timeCounter=0
    }
    document.getElementById('userScore').textContent = 'Your score is' + timeCounter;
    document.getElementById('time').textContent = timeCounter;

    submitInitials.addEventListener('click', function(result){
        result.preventDefault();

        var scores = timeCounter
        var userInitials = document.getElementById('userInitials').value;

        localStorage.setItem('score', scores)
        localStorage.setItem('initials', userInitials)

        showHighscores()

        finalScorePage.style.display='none';
        highscoreStorage.style.display='block';
        highscoreStorage.style.display='45px';

        var allHighscores = document.getElementById('allHighscores');

        allHighscores.textContent = userInitials.toUpperCase() + ' - ' + scores;

        console.log(allHighscores)

        document.getElementById('clearHighscores').addEventListener('click', function(){
            allHighscores.innerHTML = '<h4>All highscores deleted</h4>';
            document.getElementById('clearHighScores').style.display='none'
            localStorage.clear()
            var upper = document.getElementById('upper')
            upper.setAttribute('class', 'displayNone');
            upper.style.margin='100px'
        })


        

    })
    
}

startButton.addEventListener('click', function(){

    startScreen.style.display = "none";
    quizBody.style.display = "block"

    if(timeCountdown === -1){
        timeCountdown = setInterval(function(){
            timeCounter--;
            time.textContent=timeCounter;
            if(timeCounter === 0){
                clearInterval(timeCountdown)
                showScore()
            }
        }, 1000)
    }
    beginQuiz()
})