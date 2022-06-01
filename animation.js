const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d')  // render area
context.canvas.width = window.innerWidth   // coordinates
context.canvas.height = window.innerHeight // coordinates
let particleArray

const colors = [
    'hsla(303, 69%, 95%, 0.22)',
    'hsla(303, 69%, 90%, 0.19)',
    'hsla(303, 69%, 85%, 0.27)'
]
class Particle {
    constructor(x,y, directionX, directionY, size, color) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
    }
    draw() {
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI *2, false)
        context.fillStyle = this.color
        context.fill()
    }
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
export function initAnimation () {
    particleArray = []
    for(let i=0; i<100; i++) {
        let size = Math.random() * 20
        let x = Math.random() * (innerWidth - size * 2)
        let y = Math.random() * (innerHeight - size * 2)
        let directionX = (Math.random() * 0.4) - 0.2
        let directionY = (Math.random() * 0.4) - 0.2
        let color = colors[Math.floor(Math.random()*colors.length)];

        particleArray.push(new Particle(x,y, directionX,directionY, size, color))
    }
}

// animation loop
export function animate () {
    requestAnimationFrame(animate)
    context.clearRect(0,0, innerWidth, innerHeight)

    for (let i=0; i<particleArray.length; i++) {
        particleArray[i].update()
    }
}
