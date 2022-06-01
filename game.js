import {initAnimation, animate} from '/animation.js'
// import {setLevel} from "/levels.js";

initAnimation()
animate()

const cards = document.querySelectorAll('.game-card');

let hasFlipped = false;
let blockBoard = false;
let firstCard, secondCard;


function flipCard() {
    if (blockBoard) return;
    if (this===firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
    } else {
        secondCard = this;
        matchCheck();
    }
    function resetBoard() {
        [hasFlipped, blockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
}

function matchCheck () {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        freezeCards();
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
        }, 1200)
}

function resetBoard() {
    [hasFlipped, blockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function randomizeCards() {
    cards.forEach(card => {
        let position = Math.floor(Math.random() * 24);
        card.style.order = position;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));

const easyButton = document.querySelector('#button-easy')
const mediumButton = document.querySelector('#button-medium')
const hardButton = document.querySelector('#button-hard')
const menu = document.querySelector('#menu')
const gameBoard = document.querySelector('#game-board')

const easyBoard = document.querySelector('#board-easy')
const mediumBoard = document.querySelector('#board-medium')
const hardBoard = document.querySelector('#board-hard')


export function setLevel(level) {
    let currentBoard
    if (level === 'easy') {
        menu.classList.add("invisible");
        easyBoard.classList.remove("invisible")

    } else  if (level === 'medium') {
        menu.classList.add("invisible");

        mediumBoard.classList.remove("invisible")
        hardBoard.classList.add("invisible");
    } else if (level === 'hard'){
        menu.classList.add("invisible");
        easyBoard.classList.add("invisible");
        mediumBoard.classList.add("invisible");
        hardBoard.classList.remove("invisible")

    }
}

easyButton.addEventListener('click', ()=> {
    setLevel('easy')
})
mediumButton.addEventListener('click', ()=> {
    setLevel('medium')
})
hardButton.addEventListener('click', ()=> {
    setLevel('hard')
})