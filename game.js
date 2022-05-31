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

const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d')  // render area
context.canvas.width = window.innerWidth   // coordinates
context.canvas.height = window.innerHeight // coordinates
let particleArray

// create constructor function
function Particle (x,y, directionX, directionY, size, color) {
    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.size = size
    this.color = color
}

// Add draw method to particle prototype
Particle.prototype.draw = function () {
    context.beginPath()
    //             X      Y        SIZE      DIRECTION
    context.arc(this.x, this.y, this.size, 0, Math.PI *2, false)
    context.fillStyle = this.color
    context.fill()
}
// Add update method to particle prototype
Particle.prototype.update = function () {
    // if particle reaches end of screen it starts moving backwards
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = - this.directionX
    }
    if (this.y + this.size > canvas.height || this.y - this.size <0) {
        this.directionY = - this.directionY
    }
    this.x += this.directionX
    this.y += this.directionY

    this.draw()
}
// create particle array
function init () {
    particleArray = []
    for(let i=0; i<100; i++) {
        let size = Math.random() * 20
        let x = Math.random() * (innerWidth - size * 2)
        let y = Math.random() * (innerHeight - size * 2)
        let directionX = (Math.random() * 0.4) - 0.2
        let directionY = (Math.random() * 0.4) - 0.2
        let color = 'white'

        particleArray.push(new Particle(x,y, directionX,directionY, size, color))
    }
}

// animation loop
function animate () {
    requestAnimationFrame(animate)
    context.clearRect(0,0, innerWidth, innerHeight)

    for (let i=0; i<particleArray.length; i++) {
        particleArray[i].update()
    }
}

init()
animate()