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

        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            firstCard.removeEventListener('click',flipCard);
            secondCard.removeEventListener('click',flipCard);
            resetBoard();
        } else {
            blockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flip')
                secondCard.classList.remove('flip')
                resetBoard();
            }, 1200)
        }
    }
    function resetBoard() {
        [hasFlipped, blockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

}


cards.forEach(card => card.addEventListener('click', flipCard));



// initGame();
//
// function initGame() {
//
//     Your game can start here, but define separate functions, don't write everything in here :)
//
// }
