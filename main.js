
const wordPromise = fetch('words.txt');
let currentWord = "";
let currentElement;
let correctLetters = 0;
let incorrectTries = 0;
let maxTries = 7;

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


let triesElement = document.getElementById("triesCounter");
triesElement.innerHTML = "Tries" + incorrectTries.toString() + "/" + maxTries.toString();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

async function fetchData() {
    return fetch('words.txt').then(response =>
                response.text().then(text => text.split(/\r\n/)));
}


async function chooseRandomWord(){
  resetAll();
    let wordsArray = [];

  wordsArray = await fetchData().then( arr => arr);
  let randomNum = getRandomInt(wordsArray.length);

  currentWord= wordsArray[randomNum];
  currentWord = currentWord.toUpperCase();
  document.getElementById("alphabet").classList.remove("hide");

for(const element of currentWord){
        let node = document.createElement("LI");
        let textnode = document.createTextNode(element);
        node.appendChild(textnode);
        node.setAttribute("id","wordList");
        document.getElementById("letterList").appendChild(node);
}

}

function checkIfLetterInWord(event){
if(currentWord.indexOf(event.target.innerHTML) == -1){
    hideWord(event.target,false);
    incorrectTries = incorrectTries + 1;
    let triesElement = document.getElementById("triesCounter");
    triesElement.innerHTML = "Tries" + incorrectTries.toString() + "/" + maxTries.toString();
}else{

  hideWord(event.target,true);
  let element = document.getElementById("letterList");
  for(let child=element.firstChild; child!==null; child=child.nextSibling) {
    if(child.innerHTML == event.target.innerHTML){
      child.classList.add("correctLetters");
      correctLetters = correctLetters + 1;
    }
    
}
}
if(incorrectTries == maxTries){
  alert("You Lose, the word was: " + currentWord);
  let playButton = document.getElementById("playAgainButton");
  let alphaElem = document.getElementById("alphabetL");
  for(let child=alphaElem.firstChild; child!==null; child=child.nextSibling) {
    child.onclick = null;
}
  

  playButton.classList.remove("hide");
}
if(correctLetters==currentWord.length){
  alert("You win! The word was: " + currentWord);
  let playButton = document.getElementById("playAgainButton");
  let alphaElem = document.getElementById("alphabetL");
  for(let child=alphaElem.firstChild; child!==null; child=child.nextSibling) {
    child.onclick = null;
}
  playButton.classList.remove("hide");
}
}

function hideWord(element,check){
  if(check){
    element.classList.add("chosenRight");
    element.onclick = null;
  }else{
    element.classList.add("chosenFalse");
    element.onclick = null;
  }

}

function resetAll(){
  incorrectTries = 0;
  correctLetters = 0;
  currentWord="";
  let triesElement = document.getElementById("triesCounter");
  triesElement.innerHTML = "Tries" + incorrectTries.toString() + "/" + maxTries.toString();
  let playButton = document.getElementById("playAgainButton");
  playButton.classList.add("hide");
  let element = document.getElementById("letterList");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  let alphaElem = document.getElementById("alphabetL");
  while(alphaElem.firstChild){
    alphaElem.removeChild(alphaElem.firstChild);
  }
  makeAlphabet();
  
}

function makeAlphabet(){
  for(const letter of alphabet){
    let node = document.createElement("LI");
    let textnode = document.createTextNode(letter);
    node.appendChild(textnode);
    node.setAttribute("onclick","checkIfLetterInWord(event);")
    document.getElementById("alphabetL").appendChild(node);
  }
}