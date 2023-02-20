
const wordPromise = fetch('words.txt');
let currentWord = "";
let currentElement;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

async function fetchData() {
    return fetch('words.txt').then(response =>
                response.text().then(text => text.split(/\r\n/)));
}


async function chooseRandomWord(){
    let wordsArray = [];

  wordsArray = await fetchData().then( arr => arr);
  let randomNum = getRandomInt(wordsArray.length);
  console.log(randomNum);

  currentWord= wordsArray[randomNum];
  currentWord = currentWord.toUpperCase();
  document.getElementById("alphabet").classList.remove("hide");
  document.getElementById("displayWord").innerHTML = currentWord;

for(const element of currentWord){
        let node = document.createElement("LI");
        let textnode = document.createTextNode(element);
        node.appendChild(textnode);
        document.getElementById("letterList").appendChild(node);
}

}

function checkIfLetterInWord(letter,event){
  console.log(letter);

console.log(event.target);
console.log(currentWord.indexOf(letter));
if(currentWord.indexOf(letter) == -1){
    console.log("does not exist in word");
    hideWord(event.target,false);
}else{
  console.log("Does exist in word");
  hideWord(event.target,true);
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