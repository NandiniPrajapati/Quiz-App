window.onload = function() {

const container = document.querySelector('.container');
const questionBox = document.querySelector('.questionBox');
const choicesBox = document.querySelector('.choicesBox');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores questions, choices and answers.
const quiz = [
    {
        question:"Q. Which of the following is not a CSS box model property?",
        choices:["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question:"Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices:["function myFunction(){}", "let myFunction = function(){};", "myFunction: function(){}", "const myFunction =()=>{}"],
        answer: "myFunction: function(){}"
    },
    {
        question:"Q. Which of the following is not a JavaScript data type?",
        choices:["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question:"Q. What is the purpose of the this keyword in JavaScript?",
        choices:["It refers to the current function.", "It refers to the current object.", "It refers to the parent function.", "It is used for comments."],
        answer: "It refers to the current object."
    }
];

// Making Variables.
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow function to Show Questions.
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex]; 
    questionBox.innerHTML = questionDetails.question;
    //questionDetails.innerHTML = quiz[currentQuestionIndex].question;
    //console.log(question.innerHTML);
    
    choicesBox.innerHTML = questionDetails.choices;
    //console.log(choicesBox.innerHTML);
    
    choicesBox.textContent = "";
    for(let i=0; i<questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.innerHTML = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);
        //console.log(choiceDiv.innerHTML);
        
        
        choiceDiv.addEventListener('click', (e)=>{
            // collect all of the selected choices
            let selectedChoices = document.querySelectorAll('.choice.selected');
            // iterate over the collection and remove the class "selected"
            //console.log(selectedChoices);
            for(choice of selectedChoices){
                choice.classList.remove('selected')
            }
            // lastly add the class "selected" to the current clicked choice
            e.target.classList.add('selected')
      
        }); 
         
     /* choiceDiv.addEventListener('click', (e)=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });  */
        
    }
    
    
    if(currentQuestionIndex < quiz.length){
        //currentQuestionIndex++;
        //showQuestions();
        startTimer();
    }
}

// Function to check Answers.
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    //console.log(selectedChoice.textContent);
    
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        //alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        //alert("Wrong Answer!");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer.`);
    }
    
    timeLeft = 15;
    currentQuestionIndex ++;
    if(currentQuestionIndex < 4){
        showQuestions ();
    }
    else{
        showScore();
        stopTimer();
    }
    
}

// Function to show Score.
const showScore = () => {
    
    //questionBox.textContent = "";
    //choicesBox.textContent = "";
    questionBox.style.display = "none";
    choicesBox.style.display = "none";
    scoreCard.textContent = `You have scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed the quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
    
    
}

// Function to show Alerts.
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000); 
}

// Function to Start Timer.
const startTimer = () => {
    clearInterval(timerID); // Check for any existing timers.
    timer.textContent = timeLeft;
    
    const countDown = () => {
        timeLeft --;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again?");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown,1000);
}

// Function to stop Timer.
const stopTimer = () => {
    clearInterval(timerID);
}

// Function to shuffle questions.
const shuffleQuestions = () => {
    
    for(let i=3; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));   
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
    
}

// Function to start quiz.
const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to start button.
startBtn.addEventListener("click", (e) => {
    startBtn.style.display = "none";
    container.style.display = "block";
    //showQuestions();
    startQuiz();
});

nextBtn.addEventListener("click", (e) => {

    //checkAnswer();
    
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        //alert("Select your answer");
        displayAlert("Select your Answer");
        return;
    }
    if(quizOver){
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
           
        questionBox.style.display = "block";
        choicesBox.style.display = "block";
                
        currentQuestionIndex = 0;
        startQuiz();
        quizOver = false;
        score = 0;
    }
    else{
        checkAnswer ();
    }
    
});

} 


