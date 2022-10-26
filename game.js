import {initAnimation, animate} from '/animation.js'
// import {setLevel} from "/levels.js";

initAnimation()
animate()

const cards = document.querySelectorAll('.game-card');
const easyButton = document.querySelector('#button-easy')
const mediumButton = document.querySelector('#button-medium')
const hardButton = document.querySelector('#button-hard')
const demoButton = document.querySelector('#button-demo')
const menu = document.querySelector('#menu')
const score = document.querySelector('#state')
const buttonMenu = document.querySelector('#button-menu')
const easyBoard = document.querySelector('#board-easy')
const mediumBoard = document.querySelector('#board-medium')
const hardBoard = document.querySelector('#board-hard')
const demoBoard = document.querySelector('#board-demo')
const timer = document.querySelector('#time')
const currentScore = document.querySelector('#score')
const viewScore = document.querySelector('#viewScore')
const playerPoints = document.querySelector('#player-points')
const buttonToMenu = document.querySelector('#button-back-to-menu')
let playerScore = 0;
let hasFlipped = false;
let blockBoard = false;
let firstCard, secondCard;
let clickSound = new Audio('sound/click.mp3');
let matchSound = new Audio('sound/match.mp3')
let badSound = new Audio('sound/bad.mp3')
let time = 0;
let currentBoard;
let flippedCards = 0;
let totalCards;
let myInterval;

randomizeCards();

cards.forEach(card => card.addEventListener('click', flipCard));


easyButton.addEventListener('click', ()=> {
    setLevel('easy')
})

mediumButton.addEventListener('click', ()=> {
    setLevel('medium')
})

hardButton.addEventListener('click', ()=> {
    setLevel('hard')
})

demoButton.addEventListener('click', ()=> {
    setLevel('demo')
})
buttonToMenu.addEventListener('click', gameOver)
buttonMenu.addEventListener('click', backToMenu)


function myTimer() {
    time += 1;
    timer.innerHTML = time;
}

function backToMenu () {
    menu.classList.remove("invisible");
    easyBoard.classList.add("invisible");
    mediumBoard.classList.add("invisible");
    hardBoard.classList.add("invisible");
    demoBoard.classList.add("invisible");
    score.classList.add("invisible");
    buttonMenu.classList.add("invisible");
}

export function setLevel(level) {
    if (level === 'easy') {
        playerScore = 0
        currentBoard = easyBoard;
        totalCards = 18;
    } else  if (level === 'medium') {
        playerScore = 0
        currentBoard = mediumBoard;
        totalCards = 24;
    } else if (level === 'hard'){
        playerScore = 0
        currentBoard = hardBoard;
        totalCards = 30;
    } else if (level === 'demo') {
        playerScore = 0
        currentBoard = demoBoard;
        totalCards = 6;
    }
    menu.classList.add("invisible");
    currentBoard.classList.remove("invisible")
    score.classList.remove("invisible")
    buttonMenu.classList.remove("invisible")
    myInterval = setInterval(myTimer, 1000);
}

function randomizeCards() {
    cards.forEach(card => {
        let position = Math.floor(Math.random() * 36);
        card.style.order = position;
    })
}

function resetBoard() {
    [hasFlipped, blockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

function flipCard() {
    if (blockBoard) return;
    if (this===firstCard) return;

    this.classList.toggle('flip');
    clickSound.play()

    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
    } else {
        secondCard = this;
        matchCheck();
    }
    checkIfGameOver();
}

function matchCheck () {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        playerScore = playerScore +100;
        currentScore.textContent= `Score: ${playerScore}`
        freezeCards();
        matchSound.play();
        flippedCards += 2;
    } else {
        playerScore = playerScore -10;
        currentScore.textContent= `Score: ${playerScore}`
        restoreCards();
    }
}

function freezeCards() {
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    resetBoard();
}

function restoreCards() {
    blockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard();
        }, 1200);
    setTimeout(() =>{
        badSound.play();
    }, 1200);
}

function checkIfGameOver(){
    if (flippedCards != totalCards) {
        return
    } else {
        goodbyeWindow()
    }
}

function gameOver() {
    menu.classList.remove("invisible");
    currentBoard.classList.add("invisible");
    score.classList.add("invisible");
    buttonMenu.classList.add("invisible");
    playerScore = 0;
    clearInterval(myInterval);
    time = 0;
    timer.innerHTML = time;
    flippedCards = 0;
    playerPoints.classList.add('invisible')
    unflipCards();
}

function unflipCards(){
    cards.forEach(card => {
        card.classList.add('flip');
        card.classList.toggle('flip');
        card.addEventListener('click', flipCard);
        resetBoard();
    })
    randomizeCards();
}



async function goodbyeWindow() {
    await new Promise(resolve => setTimeout(resolve, 800));
    playerPoints.classList.remove("invisible")
    currentBoard.classList.add("invisible");
    score.classList.add("invisible");
    viewScore.textContent= `Score: ${playerScore}`

}