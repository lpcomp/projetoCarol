var mainElem;
var screens = {};

var btQuestion; // to do
var explosionAni;
var gameData, phase;
var stage = 0;

window.onload = function () {

  document.querySelector('#quizLeft video').play();
  
  mainElem = document.getElementsByTagName("main")[0];

  var allScreens = document.getElementsByClassName("screen");
  for (let s of allScreens) {
    screens[s.id] = s;
  }

  btQuestion = document.querySelector('.boxQuestions .btQuestion'); // to do

  explosionAni = document.querySelector("#explosionAni");
  explosionAni.load("./assets/animations/particle-explosion.json"); 

  FastClick.attach(document.body);

  fetch('./js/data.json')
  .then(response => response.json())
  .then(data => {
    gameData = data;
    startQuiz();
    data.forEach(phase => {
      // console.log(phase.conclusion)       
    });
  });
};
