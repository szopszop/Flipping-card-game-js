import {initAnimation, animate} from '/animation.js'
// import {setLevel} from "/levels.js";

initAnimation()
animate()

const cards = document.querySelectorAll('.game-card');
const easyButton = document.querySelector('#button-easy')
const mediumButton = document.querySelector('#button-medium')
const hardButton = document.querySelector('#button-hard')
const menu = document.querySelector('#menu')
const score = document.querySelector('#state')
const buttonMenu = document.querySelector('#button-menu')
const easyBoard = document.querySelector('#board-easy')
const mediumBoard = document.querySelector('#board-medium')
const hardBoard = document.querySelector('#board-hard')


let hasFlipped = false;
let blockBoard = false;
let firstCard, secondCard;
let clickSound = new Audio('sound/click.mp3');
let matchSound = new Audio('sound/match.mp3')
let badSound = new Audio('sound/bad.mp3')

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

buttonMenu.addEventListener('click', backToMenu)

function backToMenu () {
    menu.classList.remove("invisible");
    easyBoard.classList.add("invisible")
    mediumBoard.classList.add("invisible")
    hardBoard.classList.add("invisible")
    score.classList.add("invisible")
    buttonMenu.classList.add("invisible")
}

export function setLevel(level) {
    let currentBoard
    if (level === 'easy') {
        menu.classList.add("invisible");
        easyBoard.classList.remove("invisible")
        score.classList.remove("invisible")
        buttonMenu.classList.remove("invisible")
    } else  if (level === 'medium') {
        menu.classList.add("invisible");
        mediumBoard.classList.remove("invisible")
        score.classList.remove("invisible")
        buttonMenu.classList.remove("invisible")
    } else if (level === 'hard'){
        menu.classList.add("invisible");
        hardBoard.classList.remove("invisible")
        score.classList.remove("invisible")
        buttonMenu.classList.remove("invisible")
    }
}

function randomizeCards() {
    cards.forEach(card => {
        let position = Math.floor(Math.random() * 24);
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
}

function matchCheck () {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        freezeCards();
        matchSound.play();
    } else {
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