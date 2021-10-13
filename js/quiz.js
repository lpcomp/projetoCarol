var pickedOption = {
    number: 0,
    element: 'html element'
};
var picked = false;

function startQuiz() {
    phase = gameData[0];

    buildQuiz();
}

function buildQuiz() {
    document.querySelector("#quizLeft .boxTextLeft span").textContent = 'Etapa '+(Number(phase.stages[stage].stage)+1);
    document.querySelector("#quizRight .titleQuestion").textContent = phase.stages[stage].title;

    var allOptionsLength = phase.stages[stage].options.length;

    var elementOption = '';
    for (let index = 0; index < allOptionsLength; index++) {
        const option = phase.stages[stage].options[index];
        elementOption += '<div order="'+index+'" class="option" onclick="pickOption(this, '+option.nextStage+')">';
            elementOption += '<span class="textOption">'+option.title+'</span>';
        elementOption += '</div>';
    }

    document.querySelector('.boxOptionsQuestion').innerHTML = elementOption;
}

function pickOption(ele, number) {

    cleanQuiz();

    ele.style.backgroundColor = '#663c79';

    pickedOption.number = number;
    pickedOption.element = ele;

    btQuestion.style.pointerEvents = 'all';
    btQuestion.style.opacity = 1;
    
}

var pickedElementOptions = [];
function confirmPick() {
    if(picked) return;
    picked = true;
    
    var numberOrder = pickedOption.element.getAttribute('order');
    msgAlert(phase.stages[stage].options[numberOrder].feedback, function(){
           
        if (pickedOption.number === stage){
            //continue nesse stage

            pickedElementOptions.push(pickedOption.element);
            removeOption();

            if (pickedElementOptions.length === phase.stages[stage].options.length) {
                goToNextStage();
            }
        } else {
            //vá para o próximo
            // stage === phase.stages.lenght?  stage = 0 : stage += 1;
            goToNextStage();              
        }

    }); 

}

function correctAnimation(callback, waitingTime) {

    var animationExplose = document.querySelector('.boxPoints');

    goUp('.boxQuestions');
    setTimeout(function(){
        animationExplose.style.opacity = 1;

        explosionAni.stop();
        explosionAni.play();
        explosionAni.addEventListener("complete", function(){
            animationExplose.style.opacity = 0;
        });

        setTimeout(callback, waitingTime);
        // callback();
    }, 200);    
    
}

function removeOption() {
    
    pickedElementOptions.forEach(option => {
        option.style.pointerEvents = 'none';
        option.style.backgroundColor = '#401b50';
        option.firstElementChild.style.textDecoration = 'line-through';
    });
}

function goToNextStage() {
    stage += 1;
    pickedElementOptions = [];
    

        if (phase.stages[stage] === undefined) {
            //acabou o caso inteiro
            correctAnimation(function(){
                finalAnswer();
            }, 800);
            return;
        }

        correctAnimation(function(){
            cleanQuiz();
            buildQuiz();
        }, 0);
}

function cleanQuiz() {
    
    var allOptions = document.querySelectorAll('.option');

    allOptions.forEach(element => {
        element.style.backgroundColor = '#9f61bb';
    });

    btQuestion.style.pointerEvents = 'none';
    btQuestion.style.opacity = 0.3;

    picked = false;
}

function finalAnswer() {
    document.querySelector('.boxFinalAnswer').style.opacity = 1;
    document.querySelector('.boxFinalAnswer').style.pointerEvents = 'all';
}